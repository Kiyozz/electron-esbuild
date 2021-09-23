import { BuildOptions } from 'esbuild'
import path from 'path'

/**
 * @var {Partial<import('esbuild').BuildOptions>}
 */
const config: BuildOptions = {
  platform: 'node',
  entryPoints: [path.resolve('src/main/main.ts')],
  bundle: true,
  target: 'node16.5.0', // electron version target
}

export default config
