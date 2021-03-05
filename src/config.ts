/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { BuildOptions } from 'esbuild'
import * as yaml from 'js-yaml'
import * as fs from 'fs'
import * as path from 'path'
import * as nodeModule from 'module'
import { Configuration } from 'webpack'
import { Logger, unsupportedType } from './console'

export const FILE = 'electron-esbuild.config.yaml'

export enum TypeConfig {
  Esbuild = 'esbuild',
  Webpack = 'webpack',
}

export enum Target {
  Main,
  Renderer,
}

interface ItemConfig {
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

interface ConfigMapping {
  [TypeConfig.Esbuild]: BuildOptions
  [TypeConfig.Webpack]: Configuration
}

const logger = new Logger('Config')

abstract class Config<P extends TypeConfig> {
  public abstract type: TypeConfig

  abstract load(partial: Partial<ConfigMapping[P]>, config: ConfigMapping[P], target: Target): ConfigMapping[P]

  static getConfig(config: ItemConfig): Config<TypeConfig> {
    switch (config.type) {
      case TypeConfig.Esbuild:
        return new EsbuildConfig(config)
      case TypeConfig.Webpack:
        return new WebpackConfig(config)
      default:
        unsupportedType(config.type)
    }
  }
}

export class EsbuildConfig extends Config<TypeConfig.Esbuild> {
  public type = TypeConfig.Esbuild

  constructor(private config: ItemConfig) {
    super()
  }

  load(partial: Partial<BuildOptions>, userConfig: BuildOptions, target: Target): BuildOptions {
    const additional: Partial<BuildOptions> = {}

    const out = path.resolve(process.cwd(), this.config.output, isMain(target) ? 'main.js' : 'index.js')

    if (userConfig.entryPoints?.length ?? 1 > 1) {
      additional.outdir = path.dirname(out)
    } else {
      additional.outfile = out
    }

    return {
      ...partial,
      external: [...(partial.external ?? []), 'electron', ...nodeModule.builtinModules],
      ...additional,
    }
  }
}

export class WebpackConfig extends Config<TypeConfig.Webpack> {
  public type = TypeConfig.Webpack

  constructor(private config: ItemConfig) {
    super()
  }

  load(partial: Partial<Configuration>, userConfig: Configuration, target: Target): Configuration {
    return {
      ...partial,
      output: {
        filename: isMain(target) ? 'main.js' : 'index.js',
        path: path.resolve(process.cwd(), this.config.output),
      },
    }
  }
}

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
      default:
        unsupportedType(type)
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
    default:
      unsupportedType(type)
  }
}

export class ElectronEsbuildWorker<M = PossibleConfiguration, R = PossibleConfiguration> {
  public readonly yaml: ElectronEsbuildConfigYaml

  public readonly mainConfig: Config<TypeConfig>
  public readonly rendererConfig: Config<TypeConfig>

  constructor(private electronEsbuildConfigFile: string) {
    this.yaml = this.loadYaml()
    this.mainConfig = Config.getConfig(this.yaml.mainConfig)
    this.rendererConfig = Config.getConfig(this.yaml.rendererConfig)

    if (this.mainConfig.type !== TypeConfig.Esbuild) {
      unsupportedType(this.mainConfig.type, 'main')
    }
  }

  parse(mainPartial: Partial<M>, rendererPartial: Partial<R>): ElectronEsbuildConfig<M, R> {
    const { mainConfig, rendererConfig } = this.yaml

    if (!fs.existsSync(mainConfig.path)) {
      logger.end(`Main config file '${mainConfig.path}' not found. Check your ${this.electronEsbuildConfigFile}`)
    }

    if (!fs.existsSync(rendererConfig.path)) {
      logger.end(
        `Renderer config file '${rendererConfig.path}' not found. Check your ${this.electronEsbuildConfigFile}`,
      )
    }

    let mainConfigFinal: M = require(path.resolve(process.cwd(), mainConfig.path))({
      ...mainPartial,
    })

    let rendererConfigFinal: R = require(path.resolve(process.cwd(), rendererConfig.path))({
      ...rendererPartial,
    })

    mainConfigFinal = {
      ...mainConfigFinal,
      ...this.mainConfig.load(mainPartial, mainConfigFinal, Target.Main),
    }

    rendererConfigFinal = {
      ...rendererConfigFinal,
      ...this.rendererConfig.load(rendererPartial, rendererConfigFinal, Target.Renderer),
    }

    return {
      mainConfig: {
        config: mainConfigFinal,
        fileConfig: mainConfig,
        target: Target.Main,
      },
      rendererConfig: {
        config: rendererConfigFinal,
        fileConfig: rendererConfig,
        target: Target.Renderer,
      },
    }
  }

  private loadYaml(): ElectronEsbuildConfigYaml {
    let fileContent: string = ''

    try {
      fileContent = fs.readFileSync(path.resolve(this.electronEsbuildConfigFile)).toString()
    } catch (e) {
      logger.end('Cannot find file', this.electronEsbuildConfigFile)
    }

    const electronEsbuildConfig = yaml.load(fileContent) as unknown

    if (
      typeof electronEsbuildConfig !== 'object' ||
      !electronEsbuildConfig?.hasOwnProperty('mainConfig') ||
      !electronEsbuildConfig?.hasOwnProperty('rendererConfig')
    ) {
      logger.end(this.electronEsbuildConfigFile, 'is an invalid configuration')
    }

    return electronEsbuildConfig as ElectronEsbuildConfigYaml
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
