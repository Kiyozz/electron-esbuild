/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import * as chokidar from 'chokidar'
import * as compression from 'compression'
import * as connect from 'connect'
import * as debounce from 'debounce-fn'
import * as esbuild from 'esbuild'
import { BuildIncremental, BuildOptions } from 'esbuild'
import { promises as fs } from 'fs'
import { createServer } from 'http'
import * as httpProxy from 'http-proxy'
import * as livereload from 'livereload'
import * as path from 'path'

import { ElectronEsbuildConfigItem } from '../config/types'
import { isMain, isRenderer } from '../config/utils'
import Logger from '../console'
import getDeps from '../deps'
import BaseBuilder from './base'

const logger = new Logger('Builder/Esbuild')

export default class EsbuildBuilder extends BaseBuilder<BuildOptions> {
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
          if (typeof this.config.fileConfig.html === 'undefined') {
            logger.end('Cannot use esbuild in renderer without specifying a html file in `rendererConfig.html`')
            return
          }

          const livereloadPort = 35729
          const htmlPath = path.resolve(process.cwd(), this.config.fileConfig.html)
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

  private async copyHtml() {
    if (this.config.fileConfig.html) {
      const out = path.resolve(process.cwd(), this.config.fileConfig.output)
      const html = path.resolve(process.cwd(), this.config.fileConfig.html)

      await fs.copyFile(html, path.join(out, path.basename(html)))
    }
  }
}
