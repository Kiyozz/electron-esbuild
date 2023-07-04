import * as path from 'path'

/** @var {Partial<import('esbuild').BuildOptions>} */
export default {
  platform: 'node',
  entryPoints: [
    path.resolve('src/main/main.js'),
    path.resolve('src/main/preload.js'),
  ],
  bundle: true,
  target: 'node18.15.0', // electron version target
}
