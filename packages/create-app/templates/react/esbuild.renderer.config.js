import * as path from 'path'

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
  target: 'chrome104', // electron version target
}
