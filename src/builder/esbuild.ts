/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import compression from 'compression'
import connect from 'connect'
import esbuild, { BuildResult } from 'esbuild'
import { BuildOptions } from 'esbuild'
import { promises as fs } from 'fs'
import { createServer } from 'http'
import httpProxy from 'http-proxy'
import livereload from 'livereload'
import path from 'path'
import serveStatic from 'serve-static'

import { ElectronEsbuildConfigItem } from '../config/types'
import { isMain, isRenderer } from '../config/utils'
import { Logger } from '../console'
import { BaseBuilder } from './base'

const logger = new Logger('Builder/Esbuild')

type StartCallback = () => void

export class EsbuildBuilder extends BaseBuilder<BuildOptions> {
  private builder: BuildResult | undefined

  constructor(protected config: ElectronEsbuildConfigItem<BuildOptions>) {
    super(config)
  }

  async build(): Promise<void> {
    logger.log('Building', this.env.toLowerCase())

    this.builder = await esbuild.build(this.config.config)
    await this.copyHtml()

    logger.log(this.env, 'built')
  }

  async dev(start: StartCallback): Promise<void> {
    if (isMain(this.config)) {
      this.builder = (await esbuild.build({
        ...this.config.config,
        watch: {
          onRebuild: (error) => {
            if (error) {
              logger.error('Refresh', this.env.toLowerCase(), 'failed', error)
            } else {
              logger.log('Refresh', this.env.toLowerCase())
              start()
            }
          },
        },
      })) as BuildResult

      start()
    } else if (isRenderer(this.config)) {
      if (typeof this.config.fileConfig.html === 'undefined') {
        logger.end('Cannot use esbuild in renderer without specifying a html file in `rendererConfig.html`')
        return
      }

      const livereloadPort = 35729
      const htmlPath = path.resolve(process.cwd(), this.config.fileConfig.html)

      const html = (await fs.readFile(htmlPath))
        .toString()
        .replace('</body>', `<script src="/livereload.js?snipver=1"></script></body>`)

      const proxyLr = httpProxy.createProxy({ target: `http://localhost:${livereloadPort}` })
      const lrServer = livereload.createServer({ port: livereloadPort })

      const handler = connect()

      handler.use(compression() as never)

      let publicPath = ''

      if (this.config.config.outdir !== undefined && this.config.config.outfile === undefined) {
        publicPath = this.config.config.outdir
      } else if (this.config.config.outdir === undefined && this.config.config.outfile !== undefined) {
        publicPath = path.dirname(this.config.config.outfile)
      } else {
        logger.end('Missing outdir/outfile in esbuild configuration. This is maybe an error from electron-esbuild.')
      }

      lrServer.watch(publicPath)

      handler.use(serveStatic(publicPath, { index: false }))
      handler.use((req, res) => {
        if (req.url === '/' || req.url === '') {
          res.setHeader('Content-Type', 'text/html')
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
          res.writeHead(200)
          res.end(html)
        } else if (req.url?.includes('livereload.js')) {
          proxyLr.web(req, res)
        }
      })

      const server = createServer(handler)

      server.on('upgrade', (req, socket, head) => {
        proxyLr.ws(req, socket, head)
      })

      process.on('exit', async () => {
        server.close()
        lrServer.close()
        this.builder?.stop?.()
      })

      server.listen(9080)

      this.builder = await esbuild.build({
        ...this.config.config,
        watch: {
          onRebuild: async (error) => {
            if (error) {
              logger.error('Refresh', this.env.toLowerCase(), 'failed', error)
            } else {
              logger.log('Refresh', this.env.toLowerCase())
            }
          },
        },
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
