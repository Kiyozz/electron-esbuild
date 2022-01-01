/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import * as path from 'node:path'

import { filename } from './filename.mjs'

export const getTemplateDir = (template: string): string => {
  return path.resolve(filename(import.meta), '../../templates', template)
}
