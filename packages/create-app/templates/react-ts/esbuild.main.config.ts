import { BuildOptions } from 'esbuild'
import * as path from 'node:path'

const config: BuildOptions = {
  platform: 'node',
  entryPoints: [
    path.resolve('src/main/main.ts'),
    path.resolve('src/main/preload.ts'),
  ],
  bundle: true,
  format: 'esm',
  target: 'node20.11.1', // electron version target
}

export default config
