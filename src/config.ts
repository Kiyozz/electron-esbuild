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
import { ConfiguratorFactory } from './config/configurators/configurator-factory'
import { Target, TypeConfig } from './config/enums'
import { ElectronEsbuildConfig, ElectronEsbuildConfigYaml, PossibleConfiguration } from './config/types'
import { validate } from './config/validation'
import { Logger } from './console'
import { Env } from './env'

const logger = new Logger('Config')

export class ElectronEsbuildWorker<M = PossibleConfiguration, R = PossibleConfiguration> {
  public readonly yaml: ElectronEsbuildConfigYaml
  public readonly mainConfig: Configurator<TypeConfig>
  public readonly rendererConfig: Configurator<TypeConfig>

  constructor(private electronEsbuildConfigFile: string, private env: Env) {
    this.yaml = this.loadYaml()
    const configuratorFactory = new ConfiguratorFactory()
    this.mainConfig = configuratorFactory.create(this.yaml.mainConfig)
    this.rendererConfig = configuratorFactory.create(this.yaml.rendererConfig)
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

    process.env.NODE_ENV = this.env

    const userMainConfig = require(path.resolve(process.cwd(), mainConfig.path))
    const userRendererConfig = require(path.resolve(process.cwd(), rendererConfig.path))

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
    let rendererConfigFinal: R = deepMerge(userRendererConfig, rendererPartial, { clone: false })

    mainConfigFinal = deepMerge(
      mainConfigFinal,
      this.mainConfig.load(mainPartial, mainConfigFinal, Target.Main) as Partial<M>,
    )

    rendererConfigFinal = deepMerge(
      rendererConfigFinal,
      this.rendererConfig.load(rendererPartial, rendererConfigFinal, Target.Renderer) as Partial<R>,
    )

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
    let fileContent = ''

    try {
      fileContent = fs.readFileSync(path.resolve(this.electronEsbuildConfigFile)).toString()
    } catch (e) {
      logger.end('Cannot find file', this.electronEsbuildConfigFile)
    }

    const electronEsbuildConfig = yaml.load(fileContent) as unknown

    validate(electronEsbuildConfig)

    return electronEsbuildConfig as ElectronEsbuildConfigYaml
  }
}
