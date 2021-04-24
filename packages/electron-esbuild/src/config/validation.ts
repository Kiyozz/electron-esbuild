/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import Joi from 'joi'

import { Logger } from '../console'
import { TypeConfig } from './enums'
import { YamlSkeleton } from './yaml'

const _logger = new Logger('Config/Validation')

const _schema = Joi.object<YamlSkeleton>({
  mainConfig: Joi.object({
    type: Joi.string().valid(TypeConfig.Esbuild).required(),
    path: Joi.string().required(),
    src: Joi.string().required(),
    output: Joi.string().required(),
  }).required(),
  rendererConfig: Joi.object({
    type: Joi.string()
      .valid(TypeConfig.Esbuild, TypeConfig.Webpack, TypeConfig.Vite)
      .required(),
    path: Joi.string().required(),
    src: Joi.string().required(),
    output: Joi.string().required(),
    html: Joi.string().optional(),
  }).optional(),
})

export function validate(config: unknown): true | never {
  const result = _schema.validate(config)

  if (result.error) {
    return _logger.end(
      'Configuration file contains errors',
      result.error.details.map((item) => item.message).join('; '),
    )
  }

  return true
}
