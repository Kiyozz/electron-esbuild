/*
 * Copyright (c) 2022 Kiyozz.
 *
 * All rights reserved.
 */

import { build } from 'esbuild'
import * as path from 'node:path'
import rimraf from 'rimraf'

/**
 * @param {string} path
 * @returns {Promise<void>}
 */
const clean = async (path) => {
  return new Promise((resolve, reject) => {
    rimraf(path, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })
}

const outDir = path.resolve('dist')

await clean(outDir)

await build({
  entryPoints: [path.resolve('src/index.mts'), path.resolve('src/build.mts')],
  outdir: outDir,
  platform: 'node',
  sourcemap: true,
  format: 'esm',
  target: 'node16',
  outExtension: {
    '.js': '.mjs',
  },
  logLevel: 'info',
})
