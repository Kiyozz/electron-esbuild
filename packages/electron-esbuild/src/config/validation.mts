/*
 * Copyright (c) 2022 Kiyozz.
 *
 * All rights reserved.
 */

import Joi from 'joi'
import yaml from 'js-yaml'
import path from 'node:path'

import { EnvConfig } from './config.mjs'
import { Target, TypeConfig } from './enums.mjs'
import { Yaml, YamlItem, YamlSkeleton } from './yaml.mjs'
import { Logger } from '../console.mjs'

const _logger = new Logger('Config/Validation')
const buildSchema = (yaml: YamlSkeleton) => {
  return Joi.object<YamlSkeleton>({
    mainConfig: Joi.object({
      type: Joi.string().valid(TypeConfig.esbuild).required(),
      path: Joi.string().required(),
      src: Joi.string().required(),
      output: Joi.object({
        dir: Joi.string().required(),
        filename: Joi.string().required(),
      }).required(),
    }).required(),
    rendererConfig: Joi.object({
      type: Joi.string().valid(TypeConfig.esbuild, TypeConfig.vite).required(),
      path: Joi.string().required(),
      src: Joi.string().required(),
      output:
        yaml.rendererConfig?.type === 'vite'
          ? Joi.object({
              dir: Joi.string().required(),
              filename: Joi.forbidden(),
            }).required()
          : Joi.object({
              dir: Joi.string().required(),
              filename: Joi.string().required(),
            }).required(),
      html: Joi.string().optional(),
    })
      .optional()
      .allow(null),
  })
}

export class ConfigFile {
  constructor(public readonly config: YamlSkeleton) {
    if (this.config.rendererConfig === undefined) {
      this.config.rendererConfig = null
    }
  }

  private _dumpYaml(config: YamlItem, isMain: boolean) {
    return yaml.dump({
      [isMain ? 'mainConfig' : 'rendererConfig']: {
        ...config,
        output: {
          dir: config.output as unknown as string,
          filename: path.basename(config.src).replace(/\.[tj]sx?$/, '.js'),
        },
      },
    })
  }

  ensureValid(): true | never {
    // checks configuration file before 6.0.0: output is no longer a string, but now an object
    if (
      (typeof this.config.mainConfig.output as unknown) === 'string' ||
      typeof (this.config.rendererConfig?.output as unknown) === 'string'
    ) {
      const processType =
        (typeof this.config.mainConfig.output as unknown) === 'string'
          ? Target.main
          : typeof (this.config.rendererConfig?.output as unknown) === 'string'
          ? Target.renderer
          : undefined
      const processName: keyof YamlSkeleton | undefined =
        processType === Target.main
          ? 'mainConfig'
          : processType === Target.renderer
          ? 'rendererConfig'
          : undefined
      const dump =
        processType === Target.main
          ? this._dumpYaml(this.config.mainConfig, true)
          : this.config.rendererConfig !== null &&
            processType === Target.renderer
          ? this._dumpYaml(this.config.rendererConfig, false)
          : undefined

      if (dump) {
        _logger.end(`starting from electron-esbuild@6.0.0, \`output\` is an object. Please update ** ${
          processName ?? ''
        } ** ⬇

# electron-esbuild.config.yaml

${dump}`)
      }
    }

    const schema = buildSchema(this.config)

    const result = schema.validate(this.config)

    if (result.error) {
      return _logger.end(
        'Configuration file contains errors,',
        result.error.details.map((item) => item.message).join('; '),
      )
    }

    return true
  }

  toYaml(): Yaml {
    return new Yaml({
      main: EnvConfig.fromYaml(this.config.mainConfig),
      renderer:
        this.config.rendererConfig !== null
          ? EnvConfig.fromYaml(this.config.rendererConfig)
          : null,
    })
  }
}
