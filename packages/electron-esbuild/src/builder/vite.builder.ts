/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import path from 'path'
import type { build, createServer, InlineConfig } from 'vite'

import type { Item } from '../config/config'
import { Logger, unsupportedType } from '../console'
import { BaseBuilder } from './base.builder'

const _logger = new Logger('Builder/Vite')

type Builder = typeof build
type ServerFactory = typeof createServer

export class ViteBuilder extends BaseBuilder<InlineConfig> {
  readonly hasInitialBuild = false

  private readonly _inlineConfig: InlineConfig
  private readonly _viteBuild: Builder
  private readonly _viteCreateServer: ServerFactory

  constructor(protected readonly _config: Item<InlineConfig>) {
    super(_config)

    if (!_config.fileConfig) {
      _logger.end('No file config')
      process.exit(0)
    }

    try {
      require('vite')
    } catch (e) {
      if (e instanceof Error && e.message.includes('MODULE_NOT_FOUND')) {
        _logger.end(
          "It looks like you're trying to use vite but it's not installed, try running `npm i -D vite`",
        )
      }
    }

    const { build: vBuild, createServer: vCreateServer } = require('vite')

    this._viteBuild = vBuild
    this._viteCreateServer = vCreateServer
    this._inlineConfig = {
      configFile: path.resolve(process.cwd(), _config.fileConfig.path),
      root: path.resolve(process.cwd(), path.dirname(_config.fileConfig.src)),
      base: '',
      build: {
        outDir: path.resolve(process.cwd(), _config.fileConfig?.output),
      },
    }
  }

  async build(): Promise<void> {
    if (!this._config.fileConfig) {
      _logger.end('No file config')
      return
    }

    if (this._config.isMain) {
      _logger.debug('Vite cannot be used in the main process')
      unsupportedType(this._config.fileConfig.type, 'main')
    }

    _logger.log('Building', this.env.toLowerCase())

    await this._viteBuild(this._inlineConfig)

    _logger.log(this.env, 'built')
  }

  async dev(): Promise<void> {
    if (!this._config.fileConfig) {
      _logger.end('No file config')
      return
    }

    if (this._config.isMain) {
      _logger.debug('Vite cannot be used in the main process')
      unsupportedType(this._config.fileConfig.type, 'main')
    }

    if (this._config.isRenderer) {
      _logger.log('Start vite dev server')

      const server = await this._viteCreateServer({
        ...this._inlineConfig,
        server: {
          port: 9080,
        },
      })

      await server.listen()

      process.on('exit', async () => {
        await server.close()
      })
    }
  }
}
