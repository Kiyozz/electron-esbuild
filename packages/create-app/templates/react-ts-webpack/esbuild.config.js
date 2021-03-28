const path = require('path')

/**
 * @var {Partial<import('esbuild').BuildOptions>}
 */
module.exports = {
  platform: 'node',
  entryPoints: [path.resolve('src/main/main.ts')],
  bundle: true,
  target: 'node14.16.0', // electron version target
  loader: {
    '.ts': 'ts',
  },
}
