/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import depsTree from 'dependency-tree-81'
import path from 'node:path'

export function getDeps(file: string): string[] {
  return depsTree.toList({
    filename: file,
    directory: path.dirname(file),
    filter: (filePath) => filePath.indexOf('node_modules') === -1,
  })
}
