/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import type { Compiler, Configuration } from 'webpack'
import type WebpackDevServer from 'webpack-dev-server'

import type { Item } from '../config/config.mjs'
import { Logger } from '../console.mjs'
import { BaseBuilder } from './base.builder.mjs'

const _logger = new Logger('Builder/Webpack')

export class WebpackBuilder extends BaseBuilder<Configuration> {
  readonly hasInitialBuild = false

  private readonly _rendererServer: WebpackDevServer
  private readonly _compiler!: Compiler

  static async create(config: Item<Configuration>): Promise<WebpackBuilder> {
    try {
      const webpack = (await import('webpack')).default
      const WebpackDevServer = (await import('webpack-dev-server')).default // check that user can use webpack-dev-server
      const compiler = webpack(config.config)
      const rendererServer = new WebpackDevServer(
        {
          port: 9080,
          hot: true,
          client: {
            overlay: true,
          },
        },
        compiler,
      )

      return new WebpackBuilder(config, { compiler, rendererServer })
    } catch (err) {
      if (err instanceof Error) {
        if (
          err.message?.includes('Invalid configuration object') &&
          err.message?.includes('ValidationError')
        ) {
          _logger.end(
            'Your webpack configuration is invalid. Message from webpack',
            err.message,
          )
        }

        if (err.message?.includes('MODULE_NOT_FOUND')) {
          _logger.end(
            "It looks like you're trying to use webpack but it's not installed, try running `npm i -D webpack webpack-dev-server`",
          )
        }
      }

      _logger.end(
        'An unknown error occurred while trying to configure webpack',
        err,
      )
      process.exit(1)
    }
  }

  constructor(
    protected readonly _config: Item<Configuration>,
    {
      compiler,
      rendererServer,
    }: { compiler: Compiler; rendererServer: WebpackDevServer },
  ) {
    super(_config)

    this._compiler = compiler
    this._rendererServer = rendererServer
  }

  build(): Promise<void> {
    _logger.log('Building', this.env.toLowerCase())

    return new Promise<void>((resolve, reject) => {
      if ((this._compiler as unknown as { running: boolean }).running) {
        resolve()
        return
      }

      this._compiler.run((err) => {
        if (err) {
          _logger.error(this.env, 'error', err)
          reject(err)
        } else {
          _logger.log(this.env, 'built')
          resolve()
        }
      })
    })
  }

  async dev(): Promise<void> {
    if (this._config.isMain) {
      // TODO: webpack main watch
    } else {
      try {
        await this._rendererServer.start()
      } catch (e) {
        if (e instanceof Error) {
          _logger.end(this.env, 'WDS error', e)
        } else {
          _logger.log(this.env, 'WDS starting')
        }
      }
    }
  }
}
