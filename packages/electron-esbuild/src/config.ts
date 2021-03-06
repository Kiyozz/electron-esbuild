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

import { Config, PossibleConfiguration, Item } from './config/config'
import { Configurator } from './config/configurators/base'
import { Target, TypeConfig } from './config/enums'
import { configByEnv } from './config/utils'
import { ConfigFile } from './config/validation'
import { Yaml, YamlSkeleton } from './config/yaml'
import { Logger } from './console'
import { Env } from './env'

const _logger = new Logger('Config')

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

    return new _WorkerConfigurator({ main, renderer })
  }
}

export class Worker<M = PossibleConfiguration, R = PossibleConfiguration> {
  private readonly _file: string
  private readonly _main: Partial<M>
  private readonly _renderer: Partial<R>

  private readonly _cwd = process.cwd()

  env: Env
  configurator: _WorkerConfigurator

  constructor({ file, env }: { file: string; env: Env }) {
    this._file = file
    this.env = env

    const yaml = this._loadYaml()

    this.configurator = _WorkerConfigurator.fromYaml(yaml)

    this._main = configByEnv({
      dev: this.env === 'development',
      type: this.configurator.main.type,
    }) as Partial<M>
    this._renderer = configByEnv({
      dev: this.env === 'development',
      type: this.configurator.renderer?.type ?? null,
    }) as Partial<R>
  }

  private static _requireUncached(module: string) {
    delete require.cache[require.resolve(module)]

    return require(module)
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

    const userMainConfig = this._buildUserConfig<M>(
      this._resolve(mainConfig.path),
    )

    const userRendererConfig =
      rendererConfig !== null
        ? this._buildUserConfig<R>(this._resolve(rendererConfig.path))
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

    let mainConfigFinal: M = deepMerge(userMainConfig, this._main, {
      clone: false,
    })
    let rendererConfigFinal: R | null =
      rendererConfig !== null && userRendererConfig !== null
        ? deepMerge(userRendererConfig, this._renderer, { clone: false })
        : null

    mainConfigFinal = deepMerge(
      mainConfigFinal,
      this.configurator.main.toBuilderConfig(
        this._main,
        mainConfigFinal,
        Target.main,
      ) as Partial<M>,
      { clone: false },
    )

    rendererConfigFinal =
      rendererConfigFinal !== null
        ? this.configurator.renderer
          ? deepMerge(
              rendererConfigFinal,
              this.configurator.renderer.toBuilderConfig(
                this._renderer,
                rendererConfigFinal,
                Target.renderer,
              ) as Partial<R>,
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

  private _resolve(...paths: string[]): string {
    return path.resolve(this._cwd, ...paths)
  }

  private _buildUserConfig<C = PossibleConfiguration>(configPath: string): C {
    const out = this._resolve('out.js')

    buildSync({
      target: 'node14',
      outfile: out,
      entryPoints: [configPath],
      platform: 'node',
      format: 'cjs',
    })

    const removeOut = () => {
      try {
        fs.unlinkSync(out)
      } catch {
        // Silent error
      }
    }

    try {
      let userConfig = Worker._requireUncached(out)

      if (has(userConfig, 'default')) {
        userConfig = userConfig.default
      }

      removeOut()

      return userConfig as C
    } catch (e) {
      removeOut()

      _logger.error('electron-esbuild could not load file', configPath)
      _logger.error('below stack:')
      _logger.end(e)
      process.exit(1)
    }
  }

  private _loadYaml(): Yaml {
    let fileContent = ''

    try {
      fileContent = fs.readFileSync(path.resolve(this._file)).toString()
    } catch (e) {
      _logger.end('Unable to find electron-esbuild config file at:', this._file)
    }

    const configFile = new ConfigFile(
      yaml.load(fileContent) as unknown as YamlSkeleton,
    )

    configFile.ensureValid()

    return configFile.toYaml()
  }
}
