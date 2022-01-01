/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import * as path from 'node:path'

import { dirname } from './filename.mjs'

export const getTemplateDir = (template: string): string => {
  return path.resolve(dirname(import.meta), '../../templates', template)
}
