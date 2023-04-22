/*
 * Copyright (c) 2022 Kiyozz.
 *
 * All rights reserved.
 */

import path from 'node:path'
import { rimraf } from 'rimraf'

import { Cli, CliResult } from '../cli.mjs'
import { CONFIG_FILE_NAME } from '../config/constants.mjs'
import { Logger } from '../console.mjs'
import { Worker } from '../worker.mjs'

const _logger = new Logger('Commands/Build')

async function clean(): Promise<void> {
  _logger.log('Cleaning')
  await rimraf(path.resolve('dist'))
}

export class Build extends Cli {
  constructor(cli: CliResult) {
    super(cli)
  }

  static async create(cli: CliResult): Promise<Build> {
    return new Build(cli)
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

    const config = await worker.toConfigAsync()

    _logger.debug('Parsed config')

    const [main, renderer] = await config.toBuildersAsync()

    _logger.debug('Created builders')
    _logger.log('Creating production build...')

    await Promise.all([
      main.build(),
      renderer?.build() ?? (await Promise.resolve()),
    ])
  }
}
