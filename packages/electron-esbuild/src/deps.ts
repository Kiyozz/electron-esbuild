/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

import depsTree from 'dependency-tree'
import path from 'node:path'

export function getDeps(file: string): string[] {
  return depsTree.toList({
    filename: file,
    directory: path.dirname(file),
    filter: (filePath) => filePath.indexOf('node_modules') === -1,
  })
}
