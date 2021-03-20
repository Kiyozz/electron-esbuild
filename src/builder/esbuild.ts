/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import compression from 'compression'
import connect from 'connect'
import esbuild from 'esbuild'
import { BuildIncremental, BuildOptions } from 'esbuild'
import { promises as fs } from 'fs'
import { createServer } from 'http'
import httpProxy from 'http-proxy'
import livereload from 'livereload'
import path from 'path'

import { ElectronEsbuildConfigItem } from '../config/types'
import { isMain, isRenderer } from '../config/utils'
import { Logger } from '../console'
import { BaseBuilder } from './base'

const logger = new Logger('Builder/Esbuild')

export class EsbuildBuilder extends BaseBuilder<BuildOptions> {
  private builder: BuildIncremental | undefined
  private lrServer: ReturnType<typeof livereload.createServer> | undefined

  constructor(protected config: ElectronEsbuildConfigItem<BuildOptions>) {
    super(config)
  }

  async build(): Promise<void> {
    logger.log('Building', this.env.toLowerCase())

    if (this.builder) {
      await this.builder.rebuild()
    } else {
      this.builder = (await esbuild.build({
        ...this.config.config,
        watch: {
          onRebuild: (error) => {
            if (error) {
              logger.error('Refresh failed', error)
            } else {
              logger.log('Refresh', this.env.toLowerCase())

              this.lrServer?.refresh('index.html')
            }
          },
        },
      })) as BuildIncremental
      await this.copyHtml()
    }

    logger.log(this.env, 'built')
  }

  dev(): void {
    if (isMain(this.config)) {
      // TODO?
    } else if (isRenderer(this.config)) {
      if (typeof this.config.fileConfig.html === 'undefined') {
        logger.end('Cannot use esbuild in renderer without specifying a html file in `rendererConfig.html`')
      }

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
          this.lrServer = livereload.createServer({ port: livereloadPort })

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

          process.on('exit', async () => {
            server.close()
            this.lrServer?.close()
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
