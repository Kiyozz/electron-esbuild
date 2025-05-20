/*
 * Copyright (c) 2024 Kiyozz.
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
  await rimraf(path)
}

const outDir = path.resolve('dist')

await clean(outDir)

await build({
  entryPoints: [path.resolve('src/index.ts'), path.resolve('src/build.ts')],
  outdir: outDir,
  platform: 'node',
  sourcemap: true,
  format: 'esm',
  target: 'node20',
  logLevel: 'info',
})
