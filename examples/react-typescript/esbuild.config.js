/*
 * Copyright (c) 2020 Kiyozz.
 *
 * All rights reserved.
 */

const path = require('path')

/**
 * @param {Partial<import('esbuild').BuildOptions>} merge
 *
 * @return {import('esbuild').BuildOptions}
 */
module.exports = (merge) => {
  const isProduction = process.env.NODE_ENV === 'production'

  return {
    platform: 'node',
    entryPoints: [path.resolve('src/main/main.ts')],
    bundle: true,
    target: 'node12.18.4', // electron version target
    loader: {
      '.ts': 'ts',
    },
    minify: isProduction,
    sourcemap: false,
    define: {
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    },
    ...merge,
  }
}
