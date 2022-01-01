#!/usr/bin/env node
/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { Format } from 'esbuild'
import * as fs from 'fs/promises'
import minimist from 'minimist'
import * as path from 'path'

import { build } from './build.mjs'

type Args = {
  'check-types'?: boolean
  'ts-project'?: string
  format?: Format | Format[]
  external?: string | string[]
  'clean-outdir'?: boolean
  outdir?: string
  target?: string
}

const argv = minimist<Args>(process.argv.slice(2))

if (argv.version) {
  console.log(
    JSON.parse(
      (await fs.readFile(path.resolve(__dirname, '../package.json'))).toString(
        'utf-8',
      ),
    ).version,
  )
  process.exit(0)
}

const toArray = <T extends string>(value?: T | T[]): T[] => {
  return value ? (typeof value === 'string' ? [value] : value) : []
}

const entries = argv._
const {
  _,
  '--': __,
  'check-types': checkTypes,
  'ts-project': tsProject = 'tsconfig.json',
  format,
  external,
  'clean-outdir': cleanOutDir,
  outdir,
  target,
  ...options
} = argv

const formats = toArray(format)
const externals = toArray(external)

await build({
  entries,
  tsProject,
  outdir,
  cleanOutDir,
  checkTypes,
  formats,
  target,
  options: {
    ...options,
    external: externals,
  },
})
