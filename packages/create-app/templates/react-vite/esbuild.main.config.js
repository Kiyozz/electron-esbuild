import * as path from 'node:path'

/** @var {Partial<import('esbuild').BuildOptions>} */
export default {
  platform: 'node',
  entryPoints: [
    path.resolve('src/main/main.js'),
    path.resolve('src/main/preload.js'),
  ],
  bundle: true,
  format: 'esm',
  target: 'node20.11.1', // electron version target
}
