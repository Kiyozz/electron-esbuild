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

export class ElectronEsbuildConfigItem<
  T extends PossibleConfiguration | null = PossibleConfiguration,
  F extends ItemConfig | null = ItemConfig | null
> {
  config: T
  fileConfig: F
  target: Target

  constructor({ config, fileConfig, target }: { config: T; fileConfig: F; target: Target }) {
    this.config = config
    this.fileConfig = fileConfig
    this.target = target
  }

  get isVite(): boolean {
    return this.fileConfig?.type === TypeConfig.Vite
  }

  get isWebpack(): boolean {
    return this.fileConfig?.type === TypeConfig.Webpack
  }

  get isEsbuild(): boolean {
    return this.fileConfig?.type === TypeConfig.Esbuild
  }

  get isMain(): boolean {
    return this.target === Target.Main
  }

  get isRenderer(): boolean {
    return this.target === Target.Renderer
  }
}

export class ElectronEsbuildConfig<M = PossibleConfiguration, R = PossibleConfiguration> {
  main: ElectronEsbuildConfigItem<M, ItemConfig>
  renderer: ElectronEsbuildConfigItem<R | null>

  constructor({
    main,
    renderer,
  }: {
    main: ElectronEsbuildConfigItem<M, ItemConfig>
    renderer: ElectronEsbuildConfigItem<R | null>
  }) {
    this.main = main
    this.renderer = renderer
  }
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
