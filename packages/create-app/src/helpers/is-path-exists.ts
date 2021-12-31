/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { promises as fs } from 'fs'

export function isPathExists(fileOrFolder: string): Promise<boolean> {
  return fs
    .access(fileOrFolder)
    .then(() => true)
    .catch(() => false)
}
