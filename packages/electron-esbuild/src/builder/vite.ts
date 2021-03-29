/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import path from 'path'
import type { build, createServer, InlineConfig } from 'vite'

import { ElectronEsbuildConfigItem } from '../config/types'
import { isMain, isRenderer } from '../config/utils'
import { Logger, unsupportedType } from '../console'
import { BaseBuilder } from './base'

const logger = new Logger('Builder/Vite')

export class ViteBuilder extends BaseBuilder<InlineConfig> {
  private readonly inlineConfig: InlineConfig
  private readonly viteBuild: typeof build
  private readonly viteCreateServer: typeof createServer

  constructor(protected config: ElectronEsbuildConfigItem<InlineConfig>) {
    super(config)

    if (!this.config.fileConfig) {
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

    this.viteBuild = vBuild
    this.viteCreateServer = vCreateServer
    this.inlineConfig = {
      configFile: path.resolve(process.cwd(), this.config.fileConfig.path),
      root: path.resolve(process.cwd(), path.dirname(this.config.fileConfig.src)),
      base: '',
      build: {
        outDir: path.resolve(process.cwd(), this.config.fileConfig?.output),
      },
    }
  }

  async build(): Promise<void> {
    if (!this.config.fileConfig) {
      logger.end('No file config')
      return
    }

    if (isMain(this.config)) {
      logger.debug('Vite cannot be used in the main process')
      unsupportedType(this.config.fileConfig.type, 'main')
    }

    logger.log('Building', this.env.toLowerCase())

    await this.viteBuild(this.inlineConfig)

    logger.log(this.env, 'built')
  }

  async dev(): Promise<void> {
    if (!this.config.fileConfig) {
      logger.end('No file config')
      return
    }

    if (isMain(this.config)) {
      logger.debug('Vite cannot be used in the main process')
      unsupportedType(this.config.fileConfig.type, 'main')
    }

    if (isRenderer(this.config)) {
      logger.log('Start vite dev server')

      const server = await this.viteCreateServer({
        ...this.inlineConfig,
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
