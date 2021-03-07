/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { BuildOptions } from 'esbuild'
import { Configuration } from 'webpack'

import { Target, TypeConfig } from './enums'

export interface ItemConfig {
  type: TypeConfig
  path: string
  src: string
  output: string
  html?: string
}

export type PossibleConfiguration = Configuration | BuildOptions

export interface ElectronEsbuildConfigItem<T = PossibleConfiguration> {
  config: T
  fileConfig: ItemConfig
  target: Target
}

export interface ElectronEsbuildConfig<M = PossibleConfiguration, R = PossibleConfiguration> {
  mainConfig: ElectronEsbuildConfigItem<M>
  rendererConfig: ElectronEsbuildConfigItem<R>
}

export interface ElectronEsbuildConfigYaml {
  mainConfig: ItemConfig
  rendererConfig: ItemConfig
}

export interface ConfigMapping {
  [TypeConfig.Esbuild]: BuildOptions
  [TypeConfig.Webpack]: Configuration
}
