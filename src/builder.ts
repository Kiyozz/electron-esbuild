/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { EsbuildBuilder } from './builder/esbuild'
import { WebpackBuilder } from './builder/webpack'
import { ElectronEsbuildConfigItem } from './config/types'
import { isEsbuild, isWebpack } from './config/utils'
import { unsupportedType } from './console'

export interface Builder {
  env: string

  build(): void | Promise<void>
  dev(start: () => void): void | Promise<void>
}

export function createBuilders(
  mainConfig: ElectronEsbuildConfigItem,
  rendererConfig: ElectronEsbuildConfigItem,
): [Builder, Builder] {
  let mainBuilder: Builder
  let rendererBuilder: Builder

  if (isEsbuild(mainConfig)) {
    mainBuilder = new EsbuildBuilder(mainConfig)
  } else if (isWebpack(mainConfig)) {
    mainBuilder = new WebpackBuilder(mainConfig)
  } else {
    unsupportedType(mainConfig.fileConfig.type, 'main')
  }

  if (isEsbuild(rendererConfig)) {
    rendererBuilder = new EsbuildBuilder(rendererConfig)
  } else if (isWebpack(rendererConfig)) {
    rendererBuilder = new WebpackBuilder(rendererConfig)
  } else {
    unsupportedType(rendererConfig.fileConfig.type, 'renderer')
  }

  return [mainBuilder, rendererBuilder]
}
