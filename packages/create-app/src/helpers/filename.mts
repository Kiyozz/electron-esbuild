import * as path from 'node:path'
import * as url from 'node:url'

export const filename = (meta: ImportMeta) => {
  return path.dirname(url.fileURLToPath(meta.url))
}
