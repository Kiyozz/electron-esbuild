/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { BuildOptions } from 'esbuild'
import { Configuration } from 'webpack'

import { Target, TypeConfig } from './enums'
import { ElectronEsbuildConfigItem, PossibleConfiguration } from './types'

export function configByEnv(dev: boolean, type: TypeConfig): PossibleConfiguration {
  if (dev) {
    switch (type) {
      case TypeConfig.Esbuild:
        return {
          incremental: true,
          sourcemap: 'inline',
          define: {
            'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
          },
        } as BuildOptions
      case TypeConfig.Webpack:
        return { mode: 'development', devtool: 'eval' } as Configuration
    }
  }

  switch (type) {
    case TypeConfig.Esbuild:
      return {
        sourcemap: false,
        minify: true,
        define: {
          'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
        },
      } as BuildOptions
    case TypeConfig.Webpack:
      return { mode: 'production', devtool: false } as Configuration
  }
}

export function isEsbuild(
  configItem: ElectronEsbuildConfigItem,
): configItem is ElectronEsbuildConfigItem<BuildOptions> {
  return configItem.fileConfig.type === TypeConfig.Esbuild
}

export function isWebpack(
  configItem: ElectronEsbuildConfigItem,
): configItem is ElectronEsbuildConfigItem<Configuration> {
  return configItem.fileConfig.type === TypeConfig.Webpack
}

export function isMain(configItem: ElectronEsbuildConfigItem | Target): boolean {
  const target = typeof configItem === 'object' ? configItem.target : configItem

  return target === Target.Main
}

export function isRenderer(configItem: ElectronEsbuildConfigItem | Target): boolean {
  const target = typeof configItem === 'object' ? configItem.target : configItem

  return target === Target.Renderer
}
