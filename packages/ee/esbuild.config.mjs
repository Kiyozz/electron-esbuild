/*
 * Copyright (c) 2022 Kiyozz.
 *
 * All rights reserved.
 */

import { build } from 'esbuild'
import * as path from 'node:path'
import { rimraf } from 'rimraf'

/**
 * @param {string} path
 * @returns {Promise<void>}
 */
const clean = async (path) => {
  return rimraf(path)
}

const outDir = path.resolve('dist')

await clean(outDir)

await build({
  entryPoints: [path.resolve('src/index.mts'), path.resolve('src/build.mts')],
  outdir: outDir,
  platform: 'node',
  sourcemap: true,
  format: 'esm',
  target: 'node19',
  outExtension: {
    '.js': '.mjs',
  },
  logLevel: 'info',
})
