/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

import { buildSync } from 'esbuild'
import has from 'has'
import yaml from 'js-yaml'
import fs from 'node:fs'
import fsAsync from 'node:fs/promises'
import path from 'node:path'

import { Config, ConfigItem, EnvConfig } from './config/config.js'
import { Configurator } from './config/configurators/base.configurator.js'
import { Target, TypeConfig } from './config/enums.js'
import {
  ExtractArray,
  MainPossibleConfiguration,
  PossibleConfiguration,
  RendererPossibleConfiguration,
} from './config/types.js'
import { configByEnv } from './config/utils.js'
import { ConfigFile } from './config/validation.js'
import { Yaml, YamlSkeleton } from './config/yaml.js'
import { Logger } from './console.js'
import { Env } from './env.js'

const _outMain = 'out_main.mjs'
const _outRenderer = 'out_renderer.mjs'
const _logger = new Logger('Config')
const _cwd = process.cwd()
const _resolve = (...paths: string[]): string => path.resolve(_cwd, ...paths)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _require = async (module: string): Promise<any> => {
  return await import(`file://${module}`)
}
const _silentRemove = async (file: string) => {
  try {
    await fsAsync.unlink(file)
  } catch {
    // Silent error
  }
}
const _buildUserConfig = async <C extends PossibleConfiguration>(
  configPath: string,
  target: Target,
): Promise<C> => {
  const outName = target === Target.main ? _outMain : _outRenderer
  const out = _resolve(outName)

  buildSync({
    target: 'node20',
    outfile: out,
    entryPoints: [configPath],
    platform: 'node',
    format: 'esm',
  })

  try {
    let userConfig = await _require(out)

    if (has(userConfig, 'default')) {
      userConfig = userConfig.default
    }

    await _silentRemove(out)

    if (target === Target.main && !Array.isArray(userConfig)) {
      _logger.end(
        'starting with electron-esbuild 9.0.0 you need to export an array for your esbuild config',
      )
    }

    return userConfig as C
  } catch (e) {
    await _silentRemove(out)

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
  M extends MainPossibleConfiguration,
  R extends RendererPossibleConfiguration,
> {
  private readonly _file: string
  private readonly _main: Partial<ExtractArray<M>>
  private readonly _renderer: Partial<ExtractArray<R>>

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
    main: Partial<ExtractArray<M>>
    renderer: Partial<ExtractArray<R>>
  }) {
    this._file = file
    this.env = env
    this._main = main
    this._renderer = renderer
    this.configurator = configurator
  }

  static fromFile<
    M extends MainPossibleConfiguration,
    R extends RendererPossibleConfiguration,
  >({ file, env }: { file: string; env: Env }): Worker<M, R> {
    const yaml = _loadYaml(file)
    const configurator = _WorkerConfigurator.fromYaml(yaml)
    const main = configByEnv({
      dev: env === 'development',
      type: configurator.main.type,
    }) as Partial<ExtractArray<M>>
    const renderer = configByEnv({
      dev: env === 'development',
      type: configurator.renderer?.type ?? null,
    }) as Partial<ExtractArray<R>>

    return new this({
      file,
      env,
      configurator,
      main,
      renderer,
    })
  }

  async toConfigAsync(): Promise<Config<M, R>> {
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
    const mainConfigPath = _resolve(mainConfig.path)
    const rendererConfigPath =
      rendererConfig !== null ? _resolve(rendererConfig.path) : null

    const userMainConfig = await _buildUserConfig<M>(
      mainConfigPath,
      Target.main,
    )

    const userRendererConfig = rendererConfigPath
      ? await _buildUserConfig<R>(rendererConfigPath, Target.renderer)
      : null

    const mainConfigFinal = this.configurator.main.toBuilderConfig(
      this._main,
      userMainConfig,
      Target.main,
    ) as M

    const rendererConfigFinal =
      userRendererConfig !== null
        ? this.configurator.renderer
          ? (this.configurator.renderer.toBuilderConfig(
              this._renderer,
              userRendererConfig,
              Target.renderer,
            ) as R | null)
          : null
        : null

    return new Config<M, R>({
      main: new ConfigItem<M, EnvConfig>({
        config: mainConfigFinal,
        fileConfig: mainConfig,
        target: Target.main,
      }),
      renderer: new ConfigItem<R | null>({
        config: rendererConfigFinal,
        fileConfig: rendererConfig,
        target: Target.renderer,
      }),
    })
  }
}
