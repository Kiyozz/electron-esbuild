/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import path from 'path'
import rimraf from 'rimraf'

import { Cli, CliResult } from '../cli'
import { CONFIG_FILE_NAME } from '../config/constants'
import { Logger } from '../console'
import { Worker } from '../worker'

const _logger = new Logger('Commands/Build')

function clean(): Promise<void> {
  _logger.log('Cleaning')

  return new Promise((resolve, reject) => {
    rimraf(path.resolve('dist'), (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

export class Build extends Cli {
  constructor(cli: CliResult) {
    super(cli)
  }

  async init(): Promise<void> {
    process.env.NODE_ENV = 'production'
    _logger.debug('Start')

    if (this.cli.flags.clean) {
      await clean()
    }

    _logger.debug('Creating worker')

    const worker = Worker.fromFile({
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
