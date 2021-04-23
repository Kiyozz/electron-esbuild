/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { BuildOptions } from 'esbuild'
import { InlineConfig } from 'vite'
import { Configuration } from 'webpack'

import { EsbuildBuilder } from './builder/esbuild'
import { ViteBuilder } from './builder/vite'
import { WebpackBuilder } from './builder/webpack'
import { ElectronEsbuildConfigItem, ItemConfig, PossibleConfiguration } from './config/types'
import { unsupportedType } from './console'

export interface Builder {
  env: string
  hasInitialBuild: boolean

  build(): Promise<void>
  dev(start: () => void): void
}

export function createBuilders(
  mainConfig: ElectronEsbuildConfigItem<PossibleConfiguration, ItemConfig>,
  rendererConfig: ElectronEsbuildConfigItem<PossibleConfiguration | null>,
): [Builder, Builder | null] {
  let mainBuilder: Builder
  let rendererBuilder: Builder

  if (mainConfig.isEsbuild) {
    mainBuilder = new EsbuildBuilder(mainConfig as ElectronEsbuildConfigItem<BuildOptions>)
  } else if (mainConfig.isWebpack) {
    mainBuilder = new WebpackBuilder(mainConfig as ElectronEsbuildConfigItem<Configuration>)
  } else if (mainConfig.isVite) {
    mainBuilder = new ViteBuilder(mainConfig as ElectronEsbuildConfigItem<InlineConfig>)
  } else {
    unsupportedType(mainConfig.fileConfig.type, 'main')
  }

  if (rendererConfig === null || rendererConfig.fileConfig === null) {
    return [mainBuilder, null]
  } else if (rendererConfig.isEsbuild) {
    rendererBuilder = new EsbuildBuilder(rendererConfig as ElectronEsbuildConfigItem<BuildOptions>)
  } else if (rendererConfig.isWebpack) {
    rendererBuilder = new WebpackBuilder(rendererConfig as ElectronEsbuildConfigItem<Configuration>)
  } else if (rendererConfig.isVite) {
    rendererBuilder = new ViteBuilder(rendererConfig as ElectronEsbuildConfigItem<InlineConfig>)
  } else {
    unsupportedType(rendererConfig.fileConfig.type, 'renderer')
  }

  return [mainBuilder, rendererBuilder]
}
