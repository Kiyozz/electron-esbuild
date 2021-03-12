/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import Joi from 'joi'

import { Logger } from '../console'
import { TypeConfig } from './enums'
import { ElectronEsbuildConfigYaml } from './types'

const logger = new Logger('Config/Validation')

const schema = Joi.object<ElectronEsbuildConfigYaml>({
  mainConfig: Joi.object({
    type: Joi.string().valid(TypeConfig.Esbuild).required(),
    path: Joi.string().required(),
    src: Joi.string().required(),
    output: Joi.string().required(),
  }).required(),
  rendererConfig: Joi.object({
    type: Joi.string().valid(TypeConfig.Esbuild, TypeConfig.Webpack).required(),
    path: Joi.string().required(),
    src: Joi.string().required(),
    output: Joi.string().required(),
    html: Joi.string().optional(),
  }).required(),
})

export function validate(config: unknown): true | never {
  const result = schema.validate(config)

  if (result.error) {
    logger.end('Configuration file contains errors', result.error.details.map((item) => item.message).join('; '))
  }

  return true
}
