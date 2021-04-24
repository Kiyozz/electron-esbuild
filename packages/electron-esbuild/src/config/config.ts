import { BuildOptions } from 'esbuild'
import { InlineConfig } from 'vite'
import { Configuration } from 'webpack'

import { Builder } from '../builder'
import { EsbuildBuilder } from '../builder/esbuild'
import { ViteBuilder } from '../builder/vite'
import { WebpackBuilder } from '../builder/webpack'
import { unsupportedType } from '../console'
import { Configurator } from './configurators/base'
import { EsbuildConfigurator } from './configurators/esbuild'
import { ViteConfigurator } from './configurators/vite'
import { WebpackConfigurator } from './configurators/webpack'
import { Target, TypeConfig } from './enums'
import { YamlItem } from './yaml'

export class ItemConfig {
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

  toConfigurator(): Configurator<TypeConfig> {
    switch (this.type) {
      case TypeConfig.Esbuild:
        return new EsbuildConfigurator(this)
      case TypeConfig.Webpack:
        return new WebpackConfigurator(this)
      case TypeConfig.Vite:
        return new ViteConfigurator(this)
      default:
        unsupportedType(this.type)
    }
  }

  static fromYaml(yaml: YamlItem): ItemConfig {
    return new ItemConfig({
      type: yaml.type,
      path: yaml.path,
      src: yaml.src,
      output: yaml.output,
      html: yaml.html,
    })
  }
}

export type PossibleConfiguration = Configuration | BuildOptions | InlineConfig

export class ConfigItem<
  T extends PossibleConfiguration | null = PossibleConfiguration,
  F extends ItemConfig | null = ItemConfig | null
> {
  config: T
  fileConfig: F
  target: Target

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

  toBuilder(): Builder | null {
    if (this.isEsbuild) {
      return new EsbuildBuilder(this as ConfigItem<BuildOptions>)
    } else if (this.isWebpack) {
      return new WebpackBuilder(this as ConfigItem<Configuration>)
    } else if (this.isVite) {
      return new ViteBuilder(this as ConfigItem<InlineConfig>)
    }

    if (this.fileConfig !== null) {
      unsupportedType(this.fileConfig.type, this.isMain ? 'main' : 'renderer')
    }

    return null
  }
}

export class Config<M = PossibleConfiguration, R = PossibleConfiguration> {
  readonly main: ConfigItem<M, ItemConfig>
  readonly renderer: ConfigItem<R | null>

  constructor({
    main,
    renderer,
  }: {
    main: ConfigItem<M, ItemConfig>
    renderer: ConfigItem<R | null>
  }) {
    this.main = main
    this.renderer = renderer
  }

  toBuilders(): readonly [Builder, Builder | null] {
    return [this.main.toBuilder() as Builder, this.renderer.toBuilder()]
  }
}
