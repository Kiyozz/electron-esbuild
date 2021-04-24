/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import path from 'path'
import rimraf from 'rimraf'

import { Cli, CliResult } from '../cli'
import { Worker } from '../config'
import { CONFIG_FILE_NAME } from '../config/constants'
import { Logger } from '../console'

const _logger = new Logger('Commands/Build')

function clean(): void {
  _logger.log('Cleaning')
  rimraf.sync(path.resolve('dist'))
}

export class Build extends Cli {
  constructor(cli: CliResult) {
    super(cli)
  }

  async init(): Promise<void> {
    process.env.NODE_ENV = 'production'
    _logger.debug('Start')

    if (this.cli.flags.clean) {
      clean()
    }

    _logger.debug('Creating worker')

    const worker = new Worker({
      file: CONFIG_FILE_NAME,
      env: 'production',
    })

    _logger.debug('Created worker')

    const config = worker.toConfig()

    _logger.debug('Parsed config')

    const [main, renderer] = config.toBuilders()

    _logger.debug('Created builders')
    _logger.log('Creating production build...')

    await Promise.all([main.build(), renderer?.build() ?? Promise.resolve()])
  }
}
