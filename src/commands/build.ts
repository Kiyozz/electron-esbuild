/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import * as path from 'path'
import * as rimraf from 'rimraf'
import { configByEnv, ElectronEsbuildWorker, FILE, isEsbuild } from '../config'
import { Logger, unsupportedType } from '../console'
import { createBuilders } from '../builder'

process.env.NODE_ENV = 'production'

const logger = new Logger('Build')

function clean(): void {
  rimraf.sync(path.resolve('dist'))
}

async function build(): Promise<void> {
  logger.log('Start')

  if (!process.argv.join(' ').includes('--no-clean')) {
    clean()
  }

  const worker = new ElectronEsbuildWorker(FILE)

  const { mainConfig, rendererConfig } = worker.parse(
    configByEnv(false, worker.mainConfig.type),
    configByEnv(false, worker.rendererConfig.type),
  )

  const [main, renderer] = createBuilders(mainConfig, rendererConfig)

  if (!isEsbuild(mainConfig)) {
    unsupportedType(mainConfig.fileConfig.type, 'main')
  }

  logger.log('Creating production build...')

  await Promise.all([main.build(), renderer.build()])

  process.exit(0)
}

build()
