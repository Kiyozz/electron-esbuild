/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { Compiler, Configuration } from 'webpack'

import { ElectronEsbuildConfigItem } from '../config/types'
import { isMain } from '../config/utils'
import { Logger } from '../console'
import { BaseBuilder } from './base'

const logger = new Logger('Builder/Webpack')

export class WebpackBuilder extends BaseBuilder<Configuration> {
  private readonly compiler!: Compiler

  constructor(protected config: ElectronEsbuildConfigItem<Configuration>) {
    super(config)

    try {
      const webpack = require('webpack')
      require('webpack-dev-server') // check that user can use webpack-dev-server
      this.compiler = webpack(this.config.config)
    } catch (e) {
      if (e.message?.includes('Invalid configuration object')) {
        logger.end('Your webpack configuration is invalid. Message from webpack', e.message)
      }

      logger.end(
        "It looks like you're trying to use webpack but it's not installed, try running `npm i -D webpack webpack-dev-server`",
      )
    }
  }

  build(): Promise<void> {
    logger.log('Building', this.env.toLowerCase())

    return new Promise<void>((resolve, reject) => {
      if (((this.compiler as unknown) as { running: boolean }).running) {
        resolve()
        return
      }

      this.compiler.run((err) => {
        if (err) {
          logger.error(this.env, 'error', err)
          reject(err)
        } else {
          logger.log(this.env, 'built')
          resolve()
        }
      })
    })
  }

  dev(): void {
    if (isMain(this.config)) {
      // TODO: webpack main watch
    } else {
      const WebpackDevServer = require('webpack-dev-server')
      const rendererServer = new WebpackDevServer(this.compiler, {
        hot: true,
        overlay: true,
      })

      rendererServer.listen(9080, 'localhost', (err: Error | undefined) => {
        if (err) {
          logger.error(this.env, 'error', err)
        } else {
          logger.log(this.env, ': starting webpack dev server')
        }
      })
    }
  }
}
