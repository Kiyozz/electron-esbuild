/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import path from 'path'

import { createBuilders, Builder } from '../builder'
import { Cli, CliResult } from '../cli'
import { ElectronEsbuildWorker } from '../config'
import { CONFIG_FILE_NAME } from '../config/constants'
import { configByEnv } from '../config/utils'
import { Logger } from '../console'

const isWindows = process.platform === 'win32'
const electronBin = isWindows ? 'electron.cmd' : 'electron'

const logger = new Logger('Commands/Dev')

class ApplicationStarter {
  private _electronProcess: ChildProcessWithoutNullStreams | undefined

  constructor() {
    process.on('exit', () => {
      logger.log('Exiting...')
      logger.log('Killing main process...')

      this._kill()
    })
  }

  start(): void {
    if (this._electronProcess) {
      logger.log('Kill latest main')

      try {
        this._kill()
      } catch (e) {
        logger.error('Error occured while killing latest main', e)
      }

      this._electronProcess = undefined
    }

    logger.log('Start application')
    this._electronProcess = spawn(path.resolve(path.resolve(`node_modules/.bin/${electronBin}`)), ['dist/main/main.js'])

    this._electronProcess.stdout.on('data', (data) => {
      logger.log(data.toString().trim())
    })
    this._electronProcess.stderr.on('data', (data) => {
      logger.log('STDERR', data.toString().trim())
    })

    this._electronProcess.on('close', (code, signal) => {
      if (signal !== null) {
        process.exit(code || 0)
      }
    })
  }

  private _kill(): void {
    if (this._electronProcess) {
      if (isWindows) {
        spawn('taskkill', ['/pid', `${this._electronProcess.pid}`, '/f', '/t'])
      } else {
        process.kill(this._electronProcess.pid)
      }
    }
  }
}

export class Dev extends Cli {
  private readonly _worker: ElectronEsbuildWorker
  private readonly _mainBuilder: Builder
  private readonly _rendererBuilder: Builder | null
  private readonly _applicationStarter: ApplicationStarter = new ApplicationStarter()

  constructor(cli: CliResult) {
    super(cli)

    process.env.NODE_ENV = 'development'

    logger.debug('Creating worker')

    this._worker = new ElectronEsbuildWorker(CONFIG_FILE_NAME, 'development')

    logger.debug('Created worker')

    const config = this._worker.parse(
      configByEnv(true, this._worker.configurator.main.type),
      configByEnv(true, this._worker.configurator.renderer?.type ?? null),
    )

    logger.debug('Parsed config')

    const [mainBuilder, rendererBuilder] = createBuilders(config.main, config.renderer)

    logger.debug('Created builders')

    this._mainBuilder = mainBuilder
    this._rendererBuilder = rendererBuilder
  }

  async init(): Promise<void> {
    logger.debug('Start')

    const start = () => this._applicationStarter.start()

    logger.debug('Starting dev builders')
    this._mainBuilder.dev(start)
    this._rendererBuilder?.dev(start)
    logger.debug('Started dev builders')
    logger.debug('Starting initial builds')

    await Promise.all([
      this._mainBuilder.hasInitialBuild ? this._mainBuilder.build() : Promise.resolve(),
      this._rendererBuilder?.hasInitialBuild ? this._rendererBuilder.build() : Promise.resolve(),
    ])

    logger.debug('Initial builds finished')

    this._applicationStarter.start()
  }
}
