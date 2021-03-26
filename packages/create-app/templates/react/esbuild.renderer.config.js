const path = require('path')

/**
 * @var {Partial<import('esbuild').BuildOptions>}
 */
module.exports = {
  platform: 'browser',
  entryPoints: [path.resolve('src/renderer/index.jsx')],
  bundle: true,
  target: 'chrome89', // electron version target
  loader: {
    '.js': 'js',
    '.jsx': 'jsx',
    '.css': 'css',
  },
}
