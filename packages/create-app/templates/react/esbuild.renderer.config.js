import * as path from 'node:path'

/**
 * @var {Partial<import('esbuild').BuildOptions>}
 */
export default {
  platform: 'browser',
  entryPoints: [
    path.resolve('src/renderer/index.jsx'),
    path.resolve('src/renderer/index.css'),
  ],
  bundle: true,
  target: 'chrome124', // electron version target
}
