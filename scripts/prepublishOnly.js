/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

const spawn = require('cross-spawn')
const esbuild = require('esbuild')

const getConfig = require('./helpers/get-config.js')

async function start() {
  const config = await getConfig()

  spawn.sync('tsc', { cwd: process.cwd(), stdio: 'inherit' })

  await esbuild.build({
    ...config,
    minify: true,
  })
}

start()
