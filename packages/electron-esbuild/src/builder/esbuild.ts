/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import chokidar from 'chokidar'
import compression from 'compression'
import connect from 'connect'
import debounce from 'debounce-fn'
import esbuild from 'esbuild'
import { BuildIncremental, BuildOptions } from 'esbuild'
import { promises as fs } from 'fs'
import { createServer } from 'http'
import httpProxy from 'http-proxy'
import livereload from 'livereload'
import path from 'path'

import { ElectronEsbuildConfigItem } from '../config/types'
import { Logger } from '../console'
import { getDeps } from '../deps'
import { BaseBuilder } from './base'

const logger = new Logger('Builder/Esbuild')

export class EsbuildBuilder extends BaseBuilder<BuildOptions> {
  hasInitialBuild = true

  private _builder: BuildIncremental | undefined

  constructor(protected _config: ElectronEsbuildConfigItem<BuildOptions>) {
    super(_config)
  }

  async build(): Promise<void> {
    logger.log('Building', this.env.toLowerCase())

    if (this._builder) {
      await this._builder.rebuild()
    } else {
      this._builder = (await esbuild.build(this._config.config)) as BuildIncremental
      await this._copyHtml()
    }

    logger.log(this.env, 'built')
  }

  dev(start: () => void): void {
    if (this._config.fileConfig === null) {
      return
    }

    if (this._config.isMain) {
      const sources = path.join(path.resolve(path.dirname(this._config.fileConfig.src)), '**', '*.{js,ts,tsx}')
      const watcher = chokidar.watch([sources, ...getDeps(path.resolve(this._config.fileConfig.src))])

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

      process.on('exit', async () => {
        await watcher.close()
      })
    } else if (this._config.isRenderer) {
      if (typeof this._config.fileConfig.html === 'undefined') {
        logger.end('Cannot use esbuild in renderer without specifying a html file in `rendererConfig.html`')
      }

      const srcDir = path.resolve(process.cwd(), path.dirname(this._config.fileConfig.src))

      esbuild
        .serve(
          {
            host: 'localhost',
            port: 9081,
          },
          this._config.config,
        )
        .then(async (builder) => {
          if (typeof this._config.fileConfig?.html === 'undefined') {
            logger.end('Cannot use esbuild in renderer without specifying a html file in `rendererConfig.html`')
            return
          }

          const livereloadPort = 35729
          const htmlPath = path.resolve(process.cwd(), this._config.fileConfig.html)
          const html = (await fs.readFile(htmlPath))
            .toString()
            .replace('</body>', `<script src="/livereload.js?snipver=1"></script></body>`)

          const proxy = httpProxy.createProxy({ target: 'http://localhost:9081' })
          const proxyLr = httpProxy.createProxy({ target: `http://localhost:${livereloadPort}` })
          const lrServer = livereload.createServer({ port: livereloadPort })

          const handler = connect()

          handler.use(compression() as never)
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

  private async _copyHtml() {
    if (this._config.fileConfig?.html) {
      const out = path.resolve(process.cwd(), this._config.fileConfig.output)
      const html = path.resolve(process.cwd(), this._config.fileConfig.html)

      await fs.copyFile(html, path.join(out, path.basename(html)))
    }
  }
}
