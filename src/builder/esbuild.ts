/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import compression from 'compression'
import connect from 'connect'
import crypto from 'crypto'
import esbuild, { BuildResult } from 'esbuild'
import { BuildOptions } from 'esbuild'
import { promises as fs } from 'fs'
import { createServer, ServerResponse } from 'http'
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
  private clients: Record<string, ServerResponse> = {}

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
          onRebuild: (error: unknown) => {
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

      const htmlPath = path.resolve(process.cwd(), this.config.fileConfig.html)

      const html = (await fs.readFile(htmlPath))
        .toString()
        .replace(
          '</body>',
          '<script>new EventSource("/events").onmessage = () => window.location.reload();</script></body>',
        )

      const handler = connect()

      // handler.use(compression() as never)

      let publicPath = ''

      if (this.config.config.outdir !== undefined && this.config.config.outfile === undefined) {
        publicPath = this.config.config.outdir
      } else if (this.config.config.outdir === undefined && this.config.config.outfile !== undefined) {
        publicPath = path.dirname(this.config.config.outfile)
      } else {
        logger.end('Missing outdir/outfile in esbuild configuration. This is maybe an error from electron-esbuild.')
      }

      handler.use(serveStatic(publicPath, { index: false }))
      handler.use((req, res) => {
        if (req.url === '/' || req.url === '') {
          res.setHeader('Content-Type', 'text/html')
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
          res.writeHead(200)
          res.end(html)
        } else if (req.url === '/events') {
          res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
          })

          const key = crypto.randomBytes(8).toString('hex')

          logger.log('Client connected', key)

          this.clients[key] = res

          req.on('close', () => {
            logger.log('Client disconnected', key)

            delete this.clients[key]
          })
        }
      })

      const keepaliveInterval = setInterval(() => {
        for (const [key, client] of Object.entries(this.clients)) {
          logger.log('Pinging client', key)

          client.write(`:\n\n`)
        }
      }, 10000)

      const server = createServer(handler)

      process.on('exit', async () => {
        clearInterval(keepaliveInterval)

        for (const [key, client] of Object.entries(this.clients)) {
          logger.log('Ending client', key)

          client.end()
        }

        server.close()
        this.builder?.stop?.()
      })

      server.listen(9080)

      this.builder = await esbuild.build({
        ...this.config.config,
        watch: {
          onRebuild: (error: unknown) => {
            if (error) {
              logger.error('Rebuild', this.env.toLowerCase(), 'failed', error)
            } else {
              logger.log('Rebuild', this.env.toLowerCase())

              for (const [key, client] of Object.entries(this.clients)) {
                logger.log('Reloading client', key)

                client.write('data: reload\n\n')
              }
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
