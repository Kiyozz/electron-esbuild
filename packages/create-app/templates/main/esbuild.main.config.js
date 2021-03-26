const path = require('path')

/** @var {Partial<import('esbuild').BuildOptions>} */
module.exports = {
  platform: 'node',
  entryPoints: [path.resolve('src/main/main.js'), path.resolve('src/main/preload.js')],
  bundle: true,
  target: 'node14.16.0', // electron version target
  loader: {
    '.js': 'js',
  },
}
