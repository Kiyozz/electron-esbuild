import { BuildOptions } from 'esbuild'
import path from 'path'

const config: BuildOptions = {
  platform: 'node',
  entryPoints: [
    path.resolve('src/main/main.ts'),
    path.resolve('src/main/preload.ts'),
  ],
  bundle: true,
  target: 'node16.9.1', // electron version target
}

export default config
