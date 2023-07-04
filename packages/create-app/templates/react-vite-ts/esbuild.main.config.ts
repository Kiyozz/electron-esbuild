import { BuildOptions } from 'esbuild'
import * as path from 'path'

const config: BuildOptions = {
  platform: 'node',
  entryPoints: [
    path.resolve('src/main/main.ts'),
    path.resolve('src/main/preload.ts'),
  ],
  bundle: true,
  target: 'node18.15.0', // electron version target
}

export default config
