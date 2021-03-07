/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import * as path from 'path'
import * as rimraf from 'rimraf'

import { createBuilders } from '../builder'
import { ElectronEsbuildWorker } from '../config'
import { FILE } from '../config/constants'
import { configByEnv } from '../config/utils'
import { Logger } from '../console'

process.env.NODE_ENV = 'production'

const logger = new Logger('Commands/Build')

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

  logger.log('Creating production build...')

  await Promise.all([main.build(), renderer.build()])

  process.exit(0)
}

build()
