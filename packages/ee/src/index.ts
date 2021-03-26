#!/usr/bin/env node
/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { Format } from 'esbuild'
import fs from 'fs'
import minimist from 'minimist'
import path from 'path'

import build from './build'

const argv = minimist(process.argv.slice(2))

if (argv.version) {
  console.log(JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')).toString('utf8')).version)
  process.exit(0)
}

const entries = argv._
const { _, '--': ex, 'check-types': checkTypes, format, ...options } = argv

const formats: Format[] = typeof format === 'string' ? [format] : format

build({
  entries,
  checkTypes,
  formats,
  options,
})
