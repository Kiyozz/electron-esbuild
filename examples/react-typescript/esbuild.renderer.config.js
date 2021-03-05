const path = require('path')

/**
 * @param {Partial<import('esbuild').BuildOptions>} merge
 *
 * @return {import('esbuild').BuildOptions}
 */
module.exports = (merge) => ({
  platform: 'browser',
  entryPoints: [path.resolve('src/renderer/index.tsx')],
  bundle: true,
  target: 'chrome89', // electron version target
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.css': 'css',
  },
  ...merge,
})
