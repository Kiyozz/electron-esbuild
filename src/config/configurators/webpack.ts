/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import * as path from 'path'
import { Configuration } from 'webpack'

import { Target, TypeConfig } from '../enums'
import { ItemConfig } from '../types'
import { isMain } from '../utils'
import { Configurator } from './base'

export class WebpackConfigurator extends Configurator<TypeConfig.Webpack> {
  public type = TypeConfig.Webpack

  constructor(private config: ItemConfig) {
    super()
  }

  load(partial: Partial<Configuration>, userConfig: Configuration, target: Target): Configuration {
    return {
      ...partial,
      output: {
        filename: isMain(target) ? 'main.js' : 'index.js',
        path: path.resolve(process.cwd(), this.config.output),
      },
    }
  }
}
