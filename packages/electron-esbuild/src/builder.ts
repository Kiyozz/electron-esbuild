/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { EsbuildBuilder } from './builder/esbuild'
import { ViteBuilder } from './builder/vite'
import { WebpackBuilder } from './builder/webpack'
import { ElectronEsbuildConfigItem, ItemConfig, PossibleConfiguration } from './config/types'
import { isEsbuild, isVite, isWebpack } from './config/utils'
import { unsupportedType } from './console'

export interface Builder {
  env: string

  build(): Promise<void>
  dev(start: () => void): void
}

export function createBuilders(
  mainConfig: ElectronEsbuildConfigItem<PossibleConfiguration, ItemConfig>,
  rendererConfig: ElectronEsbuildConfigItem<PossibleConfiguration | null>,
): [Builder, Builder | null] {
  let mainBuilder: Builder
  let rendererBuilder: Builder

  if (isEsbuild(mainConfig)) {
    mainBuilder = new EsbuildBuilder(mainConfig)
  } else if (isWebpack(mainConfig)) {
    mainBuilder = new WebpackBuilder(mainConfig)
  } else if (isVite(mainConfig)) {
    mainBuilder = new ViteBuilder(mainConfig)
  } else {
    unsupportedType(mainConfig.fileConfig.type, 'main')
  }

  if (rendererConfig === null || rendererConfig.fileConfig === null) {
    return [mainBuilder, null]
  } else if (isEsbuild(rendererConfig)) {
    rendererBuilder = new EsbuildBuilder(rendererConfig)
  } else if (isWebpack(rendererConfig)) {
    rendererBuilder = new WebpackBuilder(rendererConfig)
  } else if (isVite(rendererConfig)) {
    rendererBuilder = new ViteBuilder(rendererConfig)
  } else {
    unsupportedType(rendererConfig.fileConfig.type, 'renderer')
  }

  return [mainBuilder, rendererBuilder]
}
