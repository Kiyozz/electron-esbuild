/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import deepMerge from 'deepmerge'
import { buildSync } from 'esbuild'
import fs from 'fs'
import has from 'has'
import yaml from 'js-yaml'
import path from 'path'

import { Config, Item } from './config/config'
import { Configurator } from './config/configurators/base.configurator'
import { Target, TypeConfig } from './config/enums'
import { PossibleConfiguration } from './config/types'
import { configByEnv } from './config/utils'
import { ConfigFile } from './config/validation'
import { Yaml, YamlSkeleton } from './config/yaml'
import { Logger } from './console'
import { Env } from './env'

const _logger = new Logger('Config')
const _cwd = process.cwd()
const _resolve = (...paths: string[]): string => path.resolve(_cwd, ...paths)
const _requireUncached = (module: string) => {
  delete require.cache[require.resolve(module)]

  return require(module)
}
const _silentRemove = (file: string) => {
  try {
    fs.unlinkSync(file)
  } catch {
    // Silent error
  }
}
const _buildUserConfig = <C extends PossibleConfiguration>(
  configPath: string,
): C => {
  const out = _resolve('out.js')

  buildSync({
    target: 'node14',
    outfile: out,
    entryPoints: [configPath],
    platform: 'node',
    format: 'cjs',
  })

  try {
    let userConfig = _requireUncached(out)

    if (has(userConfig, 'default')) {
      userConfig = userConfig.default
    }

    _silentRemove(out)

    return userConfig as C
  } catch (e) {
    _silentRemove(out)

    _logger.error('electron-esbuild could not load file', configPath)
    _logger.error('below stack:')
    _logger.end(e)
    process.exit(1)
  }
}
const _loadYaml = (file: string): Yaml => {
  let fileContent = ''

  try {
    fileContent = fs.readFileSync(path.resolve(file)).toString()
  } catch (e) {
    _logger.end('Unable to find electron-esbuild config file at:', file)
  }

  const configFile = new ConfigFile(
    yaml.load(fileContent) as unknown as YamlSkeleton,
  )

  configFile.ensureValid()

  return configFile.toYaml()
}

class _WorkerConfigurator {
  readonly main: Configurator<TypeConfig>
  readonly renderer: Configurator<TypeConfig> | null

  constructor({
    main,
    renderer,
  }: {
    main: Configurator<TypeConfig>
    renderer: Configurator<TypeConfig> | null
  }) {
    this.main = main
    this.renderer = renderer
  }

  static fromYaml(yaml: Yaml): _WorkerConfigurator {
    const main = yaml.main.toConfigurator()
    const renderer = yaml.renderer ? yaml.renderer.toConfigurator() : null

    return new this({ main, renderer })
  }
}

export class Worker<
  M extends PossibleConfiguration,
  R extends PossibleConfiguration,
> {
  private readonly _file: string
  private readonly _main: Partial<M>
  private readonly _renderer: Partial<R>

  readonly env: Env
  readonly configurator: _WorkerConfigurator

  constructor({
    file,
    env,
    main,
    renderer,
    configurator,
  }: {
    file: string
    env: Env
    configurator: _WorkerConfigurator
    main: Partial<M>
    renderer: Partial<R>
  }) {
    this._file = file
    this.env = env
    this._main = main
    this._renderer = renderer
    this.configurator = configurator
  }

  static fromFile<
    M extends PossibleConfiguration,
    R extends PossibleConfiguration,
  >({ file, env }: { file: string; env: Env }): Worker<M, R> {
    const yaml = _loadYaml(file)
    const configurator = _WorkerConfigurator.fromYaml(yaml)
    const main = configByEnv({
      dev: env === 'development',
      type: configurator.main.type,
    }) as Partial<M>
    const renderer = configByEnv({
      dev: env === 'development',
      type: configurator.renderer?.type ?? null,
    }) as Partial<R>

    return new this({
      file,
      env,
      configurator,
      main,
      renderer,
    })
  }

  toConfig(): Config<M, R> {
    const mainConfig = this.configurator.main.config
    const rendererConfig = this.configurator.renderer?.config ?? null

    if (!fs.existsSync(mainConfig.path)) {
      _logger.end(
        `Main config file '${mainConfig.path}' not found. Check your ${this._file} file`,
      )
    }

    if (rendererConfig !== null && !fs.existsSync(rendererConfig.path)) {
      _logger.end(
        `Renderer config file '${rendererConfig.path}' not found. Check your ${this._file} file`,
      )
    }

    process.env.NODE_ENV = this.env

    const userMainConfig = _buildUserConfig<M>(_resolve(mainConfig.path))

    const userRendererConfig =
      rendererConfig !== null
        ? _buildUserConfig<R>(_resolve(rendererConfig.path))
        : null

    if (
      typeof userMainConfig === 'function' ||
      typeof userRendererConfig === 'function'
    ) {
      const configFileThatIsWrong: string[] = []

      if (typeof userMainConfig === 'function') {
        configFileThatIsWrong.push('main')
      }

      if (typeof userRendererConfig === 'function') {
        configFileThatIsWrong.push('renderer')
      }

      const plural = configFileThatIsWrong.length > 1 ? 's' : ''

      _logger.end(
        'Starting electron-esbuild v1.2.0, you need to export an object from your esbuild/webpack configuration file',
        `Check your ${configFileThatIsWrong.join(
          ', ',
        )} configuration file${plural}`,
      )
    }

    let mainConfigFinal: M = deepMerge(this._main, userMainConfig, {
      clone: false,
    })
    let rendererConfigFinal: R | null =
      rendererConfig !== null && userRendererConfig !== null
        ? deepMerge(this._renderer, userRendererConfig, { clone: false })
        : null

    mainConfigFinal = deepMerge(
      this.configurator.main.toBuilderConfig(
        this._main,
        mainConfigFinal,
        Target.main,
      ) as Partial<M>,
      mainConfigFinal,
      { clone: false },
    )

    rendererConfigFinal =
      rendererConfigFinal !== null
        ? this.configurator.renderer
          ? deepMerge(
              this.configurator.renderer.toBuilderConfig(
                this._renderer,
                rendererConfigFinal,
                Target.renderer,
              ) as Partial<R>,
              rendererConfigFinal,
              { clone: false },
            )
          : null
        : null

    return new Config<M, R>({
      main: new Item({
        config: mainConfigFinal,
        fileConfig: mainConfig,
        target: Target.main,
      }),
      renderer: new Item({
        config: rendererConfigFinal,
        fileConfig: rendererConfig,
        target: Target.renderer,
      }),
    })
  }
}
