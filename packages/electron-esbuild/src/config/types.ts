/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { BuildOptions } from 'esbuild'
import { InlineConfig } from 'vite'
import { Configuration } from 'webpack'

import { TypeConfig } from './enums'

export type PossibleConfiguration = Configuration | BuildOptions | InlineConfig

export interface ConfigMapping {
  [TypeConfig.Esbuild]: BuildOptions
  [TypeConfig.Webpack]: Configuration
  [TypeConfig.Vite]: InlineConfig
}
