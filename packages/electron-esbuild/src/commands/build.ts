/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import path from 'path'
import rimraf from 'rimraf'

import { createBuilders } from '../builder'
import { Cli, CliResult } from '../cli'
import { ElectronEsbuildWorker } from '../config'
import { CONFIG_FILE_NAME } from '../config/constants'
import { configByEnv } from '../config/utils'
import { Logger } from '../console'

const logger = new Logger('Commands/Build')

function clean(): void {
  logger.log('Cleaning')
  rimraf.sync(path.resolve('dist'))
}

export class Build extends Cli {
  constructor(cli: CliResult) {
    super(cli)
  }

  async init(): Promise<void> {
    process.env.NODE_ENV = 'production'
    logger.debug('Start')

    if (this.cli.flags.clean) {
      clean()
    }

    logger.debug('Creating worker')

    const worker = new ElectronEsbuildWorker(CONFIG_FILE_NAME, 'production')

    logger.debug('Created worker')

    const config = worker.parse(
      configByEnv(false, worker.configurator.main.type),
      configByEnv(false, worker.configurator.renderer?.type ?? null),
    )

    logger.debug('Parsed config')

    const [main, renderer] = createBuilders(config.main, config.renderer)

    logger.debug('Created builders')
    logger.log('Creating production build...')

    await Promise.all([main.build(), renderer?.build() ?? Promise.resolve()])
  }
}
