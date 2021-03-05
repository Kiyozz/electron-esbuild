/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { BuildIncremental, BuildOptions } from 'esbuild'
import { ElectronEsbuildConfigItem, isEsbuild, isMain, isRenderer, isWebpack } from './config'
import * as esbuild from 'esbuild'
import * as path from 'path'
import * as chokidar from 'chokidar'
import * as debounce from 'debounce-fn'
import { Compiler, Configuration } from 'webpack'
import * as webpack from 'webpack'
import * as WebpackDevServer from 'webpack-dev-server'
import { Logger, unsupportedType } from './console'
import { getDeps } from './deps'
import { createServer } from 'http'
import * as fs from 'fs/promises'
import * as livereload from 'livereload'
import httpProxy = require('http-proxy')
import connect = require('connect')
import compression = require('compression')

export interface Builder {
  env: string

  build(): Promise<void>
  dev(start: () => void): void
}

export abstract class BaseBuilder<T> implements Builder {
  public env: string

  protected constructor(protected config: ElectronEsbuildConfigItem<T>) {
    this.env = isMain(this.config) ? 'Main' : isRenderer(this.config) ? 'Renderer' : 'Unknown env'
  }

  abstract build(): Promise<void>

  abstract dev(start: () => void): void
}

const logger = new Logger('Builder')

class EsbuildBuilder extends BaseBuilder<BuildOptions> {
  private builder: BuildIncremental | undefined

  constructor(protected config: ElectronEsbuildConfigItem<BuildOptions>) {
    super(config)
  }

  async build(): Promise<void> {
    logger.log('Building', this.env.toLowerCase())

    if (this.builder) {
      await this.builder.rebuild()
    } else {
      this.builder = (await esbuild.build(this.config.config)) as BuildIncremental
      await this.copyHtml()
    }

    logger.log(this.env, 'built')
  }

  dev(start: () => void): void {
    if (isMain(this.config)) {
      const sources = path.join(path.resolve(path.dirname(this.config.fileConfig.src)), '**', '*.{js,ts,tsx}')
      const watcher = chokidar.watch([sources, ...getDeps(path.resolve(this.config.fileConfig.src))])

      watcher.on('ready', () => {
        watcher.on(
          'all',
          debounce(
            async () => {
              await this.build()

              start()

              await watcher.close()
              this.dev(start)
            },
            { wait: 200 },
          ),
        )
      })
    } else if (isRenderer(this.config)) {
      if (typeof this.config.fileConfig.html === 'undefined') {
        logger.end('Cannot use esbuild in renderer without specifying a html file in `rendererConfig.html`')
      }

      const srcDir = path.resolve(process.cwd(), path.dirname(this.config.fileConfig.src))

      esbuild
        .serve(
          {
            host: 'localhost',
            port: 9081,
          },
          this.config.config,
        )
        .then(async (builder) => {
          const livereloadPort = 35729
          const htmlPath = path.resolve(process.cwd(), this.config.fileConfig.html!)
          const html = (await fs.readFile(htmlPath))
            .toString()
            .replace('</body>', `<script src="/livereload.js?snipver=1"></script></body>`)

          const proxy = httpProxy.createProxy({ target: 'http://localhost:9081' })
          const proxyLr = httpProxy.createProxy({ target: `http://localhost:${livereloadPort}` })
          const lrServer = livereload.createServer({ port: livereloadPort })

          const handler = connect()

          handler.use(compression() as any)
          handler.use((req, res) => {
            if (req.url === '/' || req.url === '') {
              res.setHeader('Content-Type', 'text/html')
              res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
              res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
              res.writeHead(200)
              res.end(html)
            } else if (req.url?.includes('livereload.js')) {
              proxyLr.web(req, res)
            } else {
              proxy.web(req, res)
            }
          })

          const server = createServer(handler)

          server.on('upgrade', (req, socket, head) => {
            proxyLr.ws(req, socket, head)
          })

          const sources = `${srcDir}/**/*.{js,jsx,ts,tsx,css,scss}`
          const watcher = chokidar.watch(sources, { disableGlobbing: false })

          watcher.on('ready', () => {
            watcher.on('all', async (eventName, file) => {
              logger.log('Refresh', this.env.toLowerCase())
              lrServer.refresh(file)
            })
          })

          process.on('exit', async () => {
            server.close()
            lrServer.close()
            await watcher.close()
            builder.stop()
          })

          server.listen(9080)
        })
    }
  }

  private async copyHtml() {
    if (this.config.fileConfig.html) {
      const out = path.resolve(process.cwd(), this.config.fileConfig.output)
      const html = path.resolve(process.cwd(), this.config.fileConfig.html)

      await fs.copyFile(html, path.join(out, path.basename(html)))
    }
  }
}

class WebpackBuilder extends BaseBuilder<Configuration> {
  private compiler: Compiler

  constructor(protected config: ElectronEsbuildConfigItem<Configuration>) {
    super(config)
    this.compiler = webpack(this.config.config)
  }

  build(): Promise<void> {
    logger.log('Building', this.env.toLowerCase())

    return new Promise<void>((resolve, reject) => {
      this.compiler.run((err) => {
        if (err) {
          logger.error(this.env, 'error', err)
          reject(err)
        } else {
          logger.log(this.env, 'built')
          resolve()
        }
      })
    })
  }

  dev(start: () => void) {
    if (isMain(this.config)) {
      // TODO: webpack main watch
    } else {
      const rendererCompiler = webpack(this.config.config)
      const rendererServer = new WebpackDevServer(rendererCompiler, {
        hot: true,
        overlay: true,
      })

      rendererServer.listen(9080, 'localhost', (err) => {
        if (err) {
          logger.error(this.env, 'error', err)
        } else {
          logger.log('Building', this.env.toLowerCase())
        }
      })
    }
  }
}

export function createBuilders(
  mainConfig: ElectronEsbuildConfigItem,
  rendererConfig: ElectronEsbuildConfigItem,
): [Builder, Builder] {
  let mainBuilder: Builder
  let rendererBuilder: Builder

  if (isEsbuild(mainConfig)) {
    mainBuilder = new EsbuildBuilder(mainConfig)
  } else if (isWebpack(mainConfig)) {
    mainBuilder = new WebpackBuilder(mainConfig)
  } else {
    unsupportedType(mainConfig.fileConfig.type, 'main')
  }

  if (isEsbuild(rendererConfig)) {
    rendererBuilder = new EsbuildBuilder(rendererConfig)
  } else if (isWebpack(rendererConfig)) {
    rendererBuilder = new WebpackBuilder(rendererConfig)
  } else {
    unsupportedType(rendererConfig.fileConfig.type, 'renderer')
  }

  return [mainBuilder, rendererBuilder]
}
