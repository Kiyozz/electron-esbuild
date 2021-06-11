/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import Joi from 'joi'

import { Logger } from '../console'
import { EnvConfig } from './config'
import { TypeConfig } from './enums'
import { Yaml, YamlSkeleton } from './yaml'

const _logger = new Logger('Config/Validation')
const _schema = Joi.object<YamlSkeleton>({
  mainConfig: Joi.object({
    type: Joi.string().valid(TypeConfig.esbuild).required(),
    path: Joi.string().required(),
    src: Joi.string().required(),
    output: Joi.string().required(),
  }).required(),
  rendererConfig: Joi.object({
    type: Joi.string()
      .valid(TypeConfig.esbuild, TypeConfig.webpack, TypeConfig.vite)
      .required(),
    path: Joi.string().required(),
    src: Joi.string().required(),
    output: Joi.string().required(),
    html: Joi.string().optional(),
  })
    .optional()
    .allow(null),
})

export class ConfigFile {
  constructor(public readonly config: YamlSkeleton) {
    if (this.config.rendererConfig === undefined) {
      this.config.rendererConfig = null
    }
  }

  ensureValid(): true | never {
    const result = _schema.validate(this.config)

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
