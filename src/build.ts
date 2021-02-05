/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import * as path from 'path'
import * as rimraf from 'rimraf'
import * as esbuild from 'esbuild'
import * as webpack from 'webpack'
import { track } from './track'
import { parseConfig } from './config'

process.env.NODE_ENV = 'production'

function clean(): void {
  rimraf.sync(path.resolve('dist'))
}

async function build(): Promise<void> {
  console.info(track(), 'Start')
  clean()

  const { esbuildMainConfig, webpackRendererConfig } = parseConfig(
    'electron-esbuild.config.yaml',
    { sourcemap: false },
    { mode: 'production', devtool: false },
  )

  const rendererCompiler = webpack(webpackRendererConfig)

  console.info(track(), 'Creating production build...')

  await Promise.all([
    esbuild.build(esbuildMainConfig).then(() => console.info(track(), 'Main built')),
    await new Promise<void>((resolve, reject) => {
      rendererCompiler.run((err) => {
        if (err) {
          console.error(track(), 'Error when building renderer')
          return reject(err)
        }

        resolve()
      })
    }).then(() => console.info(track(), 'Renderer built')),
  ])

  process.exit(0)
}

build()
