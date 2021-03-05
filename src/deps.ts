import * as depsTree from 'dependency-tree-81'
import * as path from 'path'

export function getDeps(file: string): string[] {
  return depsTree.toList({
    filename: file,
    directory: path.dirname(file),
    filter: (filePath) => filePath.indexOf('node_modules') === -1,
  })
}
