import * as path from 'node:path'
import * as url from 'node:url'

export const filename = (meta: ImportMeta): string => {
  return url.fileURLToPath(meta.url)
}

export const dirname = (meta: ImportMeta): string => {
  return path.resolve(path.dirname(filename(meta)), '..')
}
