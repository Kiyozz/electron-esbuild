import path from 'path'

/**
 * @var {Partial<import('esbuild').BuildOptions>}
 */
export default {
  platform: 'browser',
  entryPoints: [path.resolve('src/renderer/index.jsx')],
  bundle: true,
  target: 'chrome96', // electron version target
}
