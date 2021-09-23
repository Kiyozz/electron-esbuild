/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { Compiler, Configuration } from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import type { Item } from '../config/config'
import { Logger } from '../console'
import { BaseBuilder } from './base'

const _logger = new Logger('Builder/Webpack')

export class WebpackBuilder extends BaseBuilder<Configuration> {
  readonly hasInitialBuild = false

  private readonly _rendererServer: WebpackDevServer
  private readonly _compiler!: Compiler

  constructor(readonly _config: Item<Configuration>) {
    super(_config)

    try {
      const webpack = require('webpack')
      const WebpackDevServer = require('webpack-dev-server') // check that user can use webpack-dev-server
      this._compiler = webpack(this._config.config)
      this._rendererServer = new WebpackDevServer(
        {
          port: 9080,
          hot: true,
          client: {
            overlay: true,
          },
        },
        this._compiler,
      )
    } catch (e) {
      if (e instanceof Error) {
        if (
          e.message?.includes('Invalid configuration object') &&
          e.message?.includes('ValidationError')
        ) {
          _logger.end(
            'Your webpack configuration is invalid. Message from webpack',
            e.message,
          )
        }

        if (e.message?.includes('MODULE_NOT_FOUND')) {
          _logger.end(
            "It looks like you're trying to use webpack but it's not installed, try running `npm i -D webpack webpack-dev-server`",
          )
        }
      }

      _logger.end(
        'An unknown error occurred while trying to configure webpack',
        e,
      )
    }
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
