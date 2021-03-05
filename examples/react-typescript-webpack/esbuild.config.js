const path = require('path')

/**
 * @param {Partial<import('esbuild').BuildOptions>} merge
 *
 * @return {import('esbuild').BuildOptions}
 */
module.exports = (merge) => {
  return {
    platform: 'node',
    entryPoints: [path.resolve('src/main/main.ts')],
    bundle: true,
    target: 'node14.16.0', // electron version target
    loader: {
      '.ts': 'ts',
    },
    ...merge,
  }
}
