/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

import chokidar from 'chokidar'
import compression from 'compression'
import connect from 'connect'
import debounce from 'debounce-fn'
import esbuild, { BuildContext, BuildOptions } from 'esbuild'
import httpProxy from 'http-proxy'
import livereload from 'livereload'
import fs from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'

import { BaseBuilder } from './base.builder.js'
import type { ConfigItem } from '../config/config.js'
import { Logger } from '../console.js'
import { getDeps } from '../deps.js'

const _logger = new Logger('Builder/Esbuild')

export class EsbuildBuilder extends BaseBuilder<BuildOptions[]> {
  readonly hasInitialBuild = true

  private _builders: BuildContext[] = []

  constructor(protected readonly _config: ConfigItem<BuildOptions[]>) {
    super(_config)
  }

  async build(): Promise<void> {
    _logger.log('Building', this.env.toLowerCase())

    if (this._builders.length > 0) {
      await Promise.all(this._builders.map((builder) => builder.rebuild()))
    } else {
      this._builders = await Promise.all(
        this._config.config.map((config) => esbuild.context(config)),
      )
      await Promise.all(this._builders.map((builder) => builder.rebuild()))
      await this._copyHtml()
    }

    _logger.log(this.env, 'built')
  }

  async dev(start: () => void): Promise<void> {
    if (this._config.fileConfig === null) {
      return
    }

    if (this._config.isMain) {
      //region isMain
      const sources = path.join(
        path.resolve(path.dirname(this._config.fileConfig.src)),
        '**',
        '*.{js,ts,tsx}',
      )
      const watcher = chokidar.watch([
        sources,
        ...getDeps(path.resolve(this._config.fileConfig.src)),
      ])

      watcher.on('ready', () => {
        watcher.on(
          'all',
          debounce(
            async () => {
              await this._cancelBuilders()

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
      //endregion
    } else if (this._config.isRenderer) {
      //region isRenderer
      if (typeof this._config.fileConfig.html === 'undefined') {
        _logger.end(
          'Cannot use esbuild in renderer without specifying a html file in `rendererConfig.html`',
        )
      }

      const srcDir = path.resolve(
        process.cwd(),
        path.dirname(this._config.fileConfig.src),
      )
      const host = '127.0.0.1'
      const port = 9081
      const livereloadPort = 35729
      const ctx = await esbuild.context(this._config.config)

      ctx
        .serve({
          host,
          port,
        })
        .then(async (builder) => {
          if (typeof this._config.fileConfig?.html === 'undefined') {
            _logger.end(
              'Cannot use esbuild in renderer without specifying a html file in `rendererConfig.html`',
            )
            return
          }

          const htmlPath = path.resolve(
            process.cwd(),
            this._config.fileConfig.html,
          )
          const html = (await fs.readFile(htmlPath))
            .toString()
            .replace(
              '</body>',
              `<script src='/livereload.js?snipver=1'></script></body>`,
            )

          const proxy = httpProxy.createProxy({
            target: `http://${host}:${port}`,
          })
          const proxyLr = httpProxy.createProxy({
            target: `http://${host}:${livereloadPort}`,
          })
          const lrServer = livereload.createServer({ port: livereloadPort })

          const handler = connect()

          handler.use(compression() as never)
          handler.use((req, res) => {
            if (req.url === '/' || req.url === '') {
              res.setHeader('Content-Type', 'text/html')
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
              _logger.log('Refresh', this.env.toLowerCase())
              lrServer.refresh(file)
            })
          })

          process.on('exit', async () => {
            server.close()
            lrServer.close()
            await watcher.close()

            await this._cancelBuilders()
            await ctx.dispose()
          })

          server.listen(9080)
        })
      //endregion
    }
  }

  private async _copyHtml() {
    if (this._config.fileConfig?.html) {
      const out = path.resolve(
        process.cwd(),
        this._config.fileConfig.output.dir,
      )
      const html = path.resolve(process.cwd(), this._config.fileConfig.html)

      await fs.copyFile(html, path.join(out, path.basename(html)))
    }
  }

  private async _cancelBuilders() {
    await Promise.all(this._builders.map((builder) => builder.cancel()))
  }
}
