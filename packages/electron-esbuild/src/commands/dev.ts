/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import path from 'path'

import { Builder } from '../builder'
import { Cli, CliResult } from '../cli'
import { Worker } from '../config'
import { CONFIG_FILE_NAME } from '../config/constants'
import { Logger } from '../console'

const _isWindows = process.platform === 'win32'
const _electronBin = _isWindows ? 'electron.cmd' : 'electron'

const _logger = new Logger('Commands/Dev')

class _ApplicationStarter {
  private _electronProcess: ChildProcessWithoutNullStreams | undefined

  constructor() {
    process.on('exit', () => {
      _logger.log('Exiting...')
      _logger.log('Killing main process...')

      this._kill()
    })
  }

  start(): void {
    if (this._electronProcess) {
      _logger.log('Kill latest main')

      try {
        this._kill()
      } catch (e) {
        _logger.error('Error occured while killing latest main', e)
      }

      this._electronProcess = undefined
    }

    _logger.log('Start application')
    this._electronProcess = spawn(
      path.resolve(path.resolve(`node_modules/.bin/${_electronBin}`)),
      ['dist/main/main.js'],
    )

    this._electronProcess.stdout.on('data', (data) => {
      _logger.log(data.toString().trim())
    })
    this._electronProcess.stderr.on('data', (data) => {
      _logger.log('STDERR', data.toString().trim())
    })

    this._electronProcess.on('close', (code, signal) => {
      if (signal !== null) {
        process.exit(code || 0)
      }
    })
  }

  private _kill(): void {
    if (this._electronProcess) {
      if (_isWindows) {
        spawn('taskkill', ['/pid', `${this._electronProcess.pid}`, '/f', '/t'])
      } else {
        process.kill(this._electronProcess.pid)
      }
    }
  }
}

export class Dev extends Cli {
  private readonly _worker: Worker
  private readonly _mainBuilder: Builder
  private readonly _rendererBuilder: Builder | null
  private readonly _applicationStarter: _ApplicationStarter = new _ApplicationStarter()

  constructor(cli: CliResult) {
    super(cli)

    process.env.NODE_ENV = 'development'

    _logger.debug('Creating worker')

    this._worker = new Worker({ file: CONFIG_FILE_NAME, env: 'development' })

    _logger.debug('Created worker')

    const config = this._worker.toConfig()

    _logger.debug('Parsed config')

    const [mainBuilder, rendererBuilder] = config.toBuilders()

    _logger.debug('Created builders')

    this._mainBuilder = mainBuilder
    this._rendererBuilder = rendererBuilder
  }

  async init(): Promise<void> {
    _logger.debug('Start')

    const start = () => this._applicationStarter.start()

    _logger.debug('Starting dev builders')
    this._mainBuilder.dev(start)
    this._rendererBuilder?.dev(start)
    _logger.debug('Started dev builders')
    _logger.debug('Starting initial builds')

    await Promise.all([
      this._mainBuilder.hasInitialBuild
        ? this._mainBuilder.build()
        : Promise.resolve(),
      this._rendererBuilder?.hasInitialBuild
        ? this._rendererBuilder.build()
        : Promise.resolve(),
    ])

    _logger.debug('Initial builds finished')

    this._applicationStarter.start()
  }
}
