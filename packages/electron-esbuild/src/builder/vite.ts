/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import path from 'path'
import type { build, createServer, InlineConfig } from 'vite'

import { ElectronEsbuildConfigItem } from '../config/types'
import { Logger, unsupportedType } from '../console'
import { BaseBuilder } from './base'

const logger = new Logger('Builder/Vite')

export class ViteBuilder extends BaseBuilder<InlineConfig> {
  hasInitialBuild = false

  private readonly _inlineConfig: InlineConfig
  private readonly _viteBuild: typeof build
  private readonly _viteCreateServer: typeof createServer

  constructor(_config: ElectronEsbuildConfigItem<InlineConfig>) {
    super(_config)

    if (!this._config.fileConfig) {
      logger.end('No file config')
      process.exit(0)
    }

    try {
      require('vite')
    } catch (e) {
      if (e.message.includes('MODULE_NOT_FOUND')) {
        logger.end("It looks like you're trying to use vite but it's not installed, try running `npm i -D vite`")
      }
    }

    const { build: vBuild, createServer: vCreateServer } = require('vite')

    this._viteBuild = vBuild
    this._viteCreateServer = vCreateServer
    this._inlineConfig = {
      configFile: path.resolve(process.cwd(), this._config.fileConfig.path),
      root: path.resolve(process.cwd(), path.dirname(this._config.fileConfig.src)),
      base: '',
      build: {
        outDir: path.resolve(process.cwd(), this._config.fileConfig?.output),
      },
    }
  }

  async build(): Promise<void> {
    if (!this._config.fileConfig) {
      logger.end('No file config')
      return
    }

    if (this._config.isMain) {
      logger.debug('Vite cannot be used in the main process')
      unsupportedType(this._config.fileConfig.type, 'main')
    }

    logger.log('Building', this.env.toLowerCase())

    await this._viteBuild(this._inlineConfig)

    logger.log(this.env, 'built')
  }

  async dev(): Promise<void> {
    if (!this._config.fileConfig) {
      logger.end('No file config')
      return
    }

    if (this._config.isMain) {
      logger.debug('Vite cannot be used in the main process')
      unsupportedType(this._config.fileConfig.type, 'main')
    }

    if (this._config.isRenderer) {
      logger.log('Start vite dev server')

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
