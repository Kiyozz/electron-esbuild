/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { BuildOptions } from 'esbuild'
import { InlineConfig } from 'vite'
import { Configuration } from 'webpack'

import { Target, TypeConfig } from './enums'

export interface ItemConfig {
  type: TypeConfig
  path: string
  src: string
  output: string
  html?: string
}

export type PossibleConfiguration = Configuration | BuildOptions | InlineConfig

export interface ElectronEsbuildConfigItem<T = PossibleConfiguration, F = ItemConfig | null> {
  config: T
  fileConfig: F
  target: Target
}

export interface ElectronEsbuildConfig<M = PossibleConfiguration, R = PossibleConfiguration> {
  mainConfig: ElectronEsbuildConfigItem<M, ItemConfig>
  rendererConfig: ElectronEsbuildConfigItem<R | null>
}

export interface ElectronEsbuildConfigYaml {
  mainConfig: ItemConfig
  rendererConfig: ItemConfig | null
}

export interface ConfigMapping {
  [TypeConfig.Esbuild]: BuildOptions
  [TypeConfig.Webpack]: Configuration
  [TypeConfig.Vite]: InlineConfig
}
