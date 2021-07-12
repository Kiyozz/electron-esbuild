import { BuildOptions } from 'esbuild'
import path from 'path'

/** @var {Partial<import('esbuild').BuildOptions>} */
export default {
  platform: 'node',
  entryPoints: [path.resolve('src/main/main.ts')],
  bundle: true,
  target: 'node14.16.0', // electron version target
}
