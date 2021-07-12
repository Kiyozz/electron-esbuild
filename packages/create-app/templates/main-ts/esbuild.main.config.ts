import { BuildOptions } from 'esbuild'
import path from 'path'

export default {
  platform: 'node',
  entryPoints: [
    path.resolve('src/main/main.ts'),
    path.resolve('src/main/preload.ts'),
  ],
  bundle: true,
  target: 'node14.16.0', // electron version target
} as BuildOptions
