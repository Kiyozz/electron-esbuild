/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

const esbuild = require('esbuild')

const getConfig = require('./helpers/get-config.js')

async function start() {
  const config = await getConfig()

  await esbuild.build({
    ...config,
    minify: false,
  })
}

start()
