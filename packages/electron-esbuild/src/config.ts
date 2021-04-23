/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import deepMerge from 'deepmerge'
import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'

import { Configurator } from './config/configurators/base'
import { EsbuildConfigurator } from './config/configurators/esbuild'
import { ViteConfigurator } from './config/configurators/vite'
import { WebpackConfigurator } from './config/configurators/webpack'
import { Target, TypeConfig } from './config/enums'
import {
  ElectronEsbuildConfig,
  ElectronEsbuildConfigYaml,
  PossibleConfiguration,
  ItemConfig,
  ElectronEsbuildConfigItem,
} from './config/types'
import { validate } from './config/validation'
import { Logger, unsupportedType } from './console'
import { Env } from './env'

const logger = new Logger('Config')

class ElectronEsbuildConfigurator {
  constructor(public main: Configurator<TypeConfig>, public renderer: Configurator<TypeConfig> | null) {}

  static fromYaml(yaml: ElectronEsbuildConfigYaml): ElectronEsbuildConfigurator {
    const main = this._fromItemConfig(yaml.mainConfig) as Configurator<TypeConfig>
    const renderer = yaml.rendererConfig ? this._fromItemConfig(yaml.rendererConfig) : null

    return new ElectronEsbuildConfigurator(main, renderer)
  }

  private static _fromItemConfig(config: ItemConfig): Configurator<TypeConfig> {
    switch (config.type) {
      case TypeConfig.Esbuild:
        return new EsbuildConfigurator(config)
      case TypeConfig.Webpack:
        return new WebpackConfigurator(config)
      case TypeConfig.Vite:
        return new ViteConfigurator(config)
      default:
        unsupportedType(config.type)
    }
  }
}

export class ElectronEsbuildWorker<M = PossibleConfiguration, R = PossibleConfiguration> {
  configurator: ElectronEsbuildConfigurator

  constructor(private _electronEsbuildConfigFile: string, public env: Env) {
    const yaml = this._loadYaml()

    this.configurator = ElectronEsbuildConfigurator.fromYaml(yaml)
  }

  parse(mainPartial: Partial<M>, rendererPartial: Partial<R>): ElectronEsbuildConfig<M, R> {
    const mainConfig = this.configurator.main.config
    const rendererConfig = this.configurator.renderer?.config ?? null

    if (!fs.existsSync(mainConfig.path)) {
      logger.end(`Main config file '${mainConfig.path}' not found. Check your ${this._electronEsbuildConfigFile}`)
    }

    if (rendererConfig !== null && !fs.existsSync(rendererConfig.path)) {
      logger.end(
        `Renderer config file '${rendererConfig.path}' not found. Check your ${this._electronEsbuildConfigFile}`,
      )
    }

    process.env.NODE_ENV = this.env

    const userMainConfig = require(path.resolve(process.cwd(), mainConfig.path))
    const userRendererConfig =
      rendererConfig !== null ? require(path.resolve(process.cwd(), rendererConfig.path)) : null

    if (typeof userMainConfig === 'function' || typeof userRendererConfig === 'function') {
      const configFileThatIsWrong = []

      if (typeof userMainConfig === 'function') {
        configFileThatIsWrong.push('main')
      }

      if (typeof userRendererConfig === 'function') {
        configFileThatIsWrong.push('renderer')
      }

      const plural = configFileThatIsWrong.length > 1 ? 's' : ''

      logger.end(
        'Starting electron-esbuild v1.2.0, you need to export an object from your esbuild/webpack configuration file',
        `Check your ${configFileThatIsWrong.join(', ')} configuration file${plural}`,
      )
    }

    let mainConfigFinal: M = deepMerge(userMainConfig, mainPartial, { clone: false })
    let rendererConfigFinal: R | null =
      rendererConfig !== null ? deepMerge(userRendererConfig, rendererPartial, { clone: false }) : null

    mainConfigFinal = deepMerge(
      mainConfigFinal,
      this.configurator.main.load(mainPartial, mainConfigFinal, Target.Main) as Partial<M>,
      { clone: false },
    )

    rendererConfigFinal =
      rendererConfigFinal !== null
        ? this.configurator.renderer
          ? deepMerge(
              rendererConfigFinal,
              this.configurator.renderer.load(rendererPartial, rendererConfigFinal, Target.Renderer) as Partial<R>,
              { clone: false },
            )
          : null
        : null

    return new ElectronEsbuildConfig<M, R>({
      main: new ElectronEsbuildConfigItem({
        config: mainConfigFinal,
        fileConfig: mainConfig,
        target: Target.Main,
      }),
      renderer: new ElectronEsbuildConfigItem({
        config: rendererConfigFinal,
        fileConfig: rendererConfig,
        target: Target.Renderer,
      }),
    })
  }

  private _loadYaml(): ElectronEsbuildConfigYaml {
    let fileContent = ''

    try {
      fileContent = fs.readFileSync(path.resolve(this._electronEsbuildConfigFile)).toString()
    } catch (e) {
      logger.end('Cannot find file', this._electronEsbuildConfigFile)
    }

    const electronEsbuildConfig = (yaml.load(fileContent) as unknown) as ElectronEsbuildConfigYaml

    validate(electronEsbuildConfig)

    if (electronEsbuildConfig.rendererConfig === undefined) {
      electronEsbuildConfig.rendererConfig = null
    }

    return electronEsbuildConfig
  }
}
