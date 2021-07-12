import { BuildOptions } from 'esbuild'
import path from 'path'

/**
 * @var {Partial<import('esbuild').BuildOptions>}
 */
export default {
  platform: 'browser',
  entryPoints: [path.resolve('src/renderer/index.tsx')],
  bundle: true,
  target: 'chrome89', // electron version target
} as BuildOptions
