/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import deepMerge from 'deepmerge'
import path from 'path'
import { Configuration } from 'webpack'

import type { ItemConfig } from '../config'
import { Target, TypeConfig } from '../enums'
import type { Configurator } from './base'

export class WebpackConfigurator implements Configurator<TypeConfig.Webpack> {
  public readonly type = TypeConfig.Webpack

  constructor(public readonly config: ItemConfig) {}

  load(
    partial: Partial<Configuration>,
    _: Configuration,
    target: Target,
  ): Configuration {
    return deepMerge(
      partial,
      {
        output: {
          filename: target === Target.Main ? 'main.js' : 'index.js',
          path: path.resolve(process.cwd(), this.config.output),
        },
      },
      { clone: false },
    )
  }
}
