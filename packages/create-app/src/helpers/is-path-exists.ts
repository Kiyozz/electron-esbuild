/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

import * as fs from 'node:fs/promises'

export const isPathExists = (fileOrFolder: string): Promise<boolean> => {
  return fs
    .access(fileOrFolder)
    .then(() => true)
    .catch(() => false)
}
