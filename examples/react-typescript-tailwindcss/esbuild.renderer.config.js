const path = require('path')
const postCss = require('esbuild-plugin-postcss2').default
const autoprefixer = require('autoprefixer')
const tailwindcss = require('tailwindcss')

/** @var {Partial<import('esbuild').BuildOptions>} */
module.exports = {
  platform: 'browser',
  entryPoints: [path.resolve('src/renderer/index.tsx')],
  bundle: true,
  target: 'chrome89', // electron version target
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.css': 'css',
  },
  plugins: [
    postCss({
      plugins: [autoprefixer, tailwindcss],
    }),
  ]
}
