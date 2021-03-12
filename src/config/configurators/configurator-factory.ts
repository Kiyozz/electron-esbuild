/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { unsupportedType } from '../../console'
import { TypeConfig } from '../enums'
import { ItemConfig } from '../types'
import { Configurator } from './base'
import { EsbuildConfigurator } from './esbuild'
import { WebpackConfigurator } from './webpack'

export class ConfiguratorFactory {
  create(config: ItemConfig): Configurator<TypeConfig> {
    switch (config.type) {
      case TypeConfig.Esbuild:
        return new EsbuildConfigurator(config)
      case TypeConfig.Webpack:
        return new WebpackConfigurator(config)
      default:
        unsupportedType(config.type)
    }
  }
}
