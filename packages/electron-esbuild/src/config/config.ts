/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { BuildOptions } from 'esbuild'
import { InlineConfig } from 'vite'
import { Configuration } from 'webpack'

import { Builder } from '../builder'
import { EsbuildBuilder } from '../builder/esbuild.builder'
import { ViteBuilder } from '../builder/vite.builder'
import { WebpackBuilder } from '../builder/webpack.builder'
import { unsupportedType } from '../console'
import { Configurator } from './configurators/base.configurator'
import { EsbuildConfigurator } from './configurators/esbuild.configurator'
import { ViteConfigurator } from './configurators/vite.configurator'
import { WebpackConfigurator } from './configurators/webpack.configurator'
import { Target, TypeConfig } from './enums'
import { PossibleConfiguration } from './types'
import { YamlItem } from './yaml'

export class EnvConfig {
  readonly type: TypeConfig
  readonly path: string
  readonly src: string
  readonly output: string
  readonly html?: string

  constructor({
    type,
    path,
    src,
    output,
    html,
  }: {
    type: TypeConfig
    path: string
    src: string
    output: string
    html?: string
  }) {
    this.type = type
    this.path = path
    this.src = src
    this.output = output
    this.html = html
  }

  static fromYaml(yaml: YamlItem): EnvConfig {
    return new this({
      type: yaml.type,
      path: yaml.path,
      src: yaml.src,
      output: yaml.output,
      html: yaml.html,
    })
  }

  toConfigurator(): Configurator<TypeConfig> {
    switch (this.type) {
      case TypeConfig.esbuild:
        return new EsbuildConfigurator(this)
      case TypeConfig.webpack:
        return new WebpackConfigurator(this)
      case TypeConfig.vite:
        return new ViteConfigurator(this)
      default:
        unsupportedType(this.type)
    }
  }
}

export class Item<
  T extends PossibleConfiguration | null = PossibleConfiguration,
  F extends EnvConfig | null = EnvConfig | null,
> {
  readonly config: T
  readonly fileConfig: F
  readonly target: Target
  readonly isVite: boolean
  readonly isWebpack: boolean
  readonly isEsbuild: boolean
  readonly isMain: boolean
  readonly isRenderer: boolean

  constructor({
    config,
    fileConfig,
    target,
  }: {
    config: T
    fileConfig: F
    target: Target
  }) {
    this.config = config
    this.fileConfig = fileConfig
    this.target = target
    this.isVite = this.fileConfig?.type === TypeConfig.vite
    this.isWebpack = this.fileConfig?.type === TypeConfig.webpack
    this.isEsbuild = this.fileConfig?.type === TypeConfig.esbuild
    this.isMain = this.target === Target.main
    this.isRenderer = this.target === Target.renderer
  }

  toBuilder(): Builder | null {
    if (this.isEsbuild) {
      return new EsbuildBuilder(this as Item<BuildOptions>)
    } else if (this.isWebpack) {
      return new WebpackBuilder(this as Item<Configuration>)
    } else if (this.isVite) {
      return new ViteBuilder(this as Item<InlineConfig>)
    }

    if (this.fileConfig !== null) {
      unsupportedType(this.fileConfig.type, this.isMain ? 'main' : 'renderer')
    }

    return null
  }
}

export class Config<
  M extends PossibleConfiguration,
  R extends PossibleConfiguration,
> {
  readonly main: Item<M, EnvConfig>
  readonly renderer: Item<R | null>

  constructor({
    main,
    renderer,
  }: {
    main: Item<M, EnvConfig>
    renderer: Item<R | null>
  }) {
    this.main = main
    this.renderer = renderer
  }

  toBuilders(): readonly [Builder, Builder | null] {
    return [this.main.toBuilder() as Builder, this.renderer.toBuilder()]
  }
}
