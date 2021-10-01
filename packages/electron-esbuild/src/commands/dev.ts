/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { ChildProcess, spawn } from 'child_process'
import { EventEmitter } from 'events'
import path from 'path'

import { Builder } from '../builder'
import { Cli, CliResult } from '../cli'
import { Worker } from '../config'
import { CONFIG_FILE_NAME } from '../config/constants'
import { Logger } from '../console'

const _isWindows = process.platform === 'win32'
const _electronBin = _isWindows ? 'electron.cmd' : 'electron'
const _mainDebugPort = 9223
const _rendererDebugPort = 9222

const _logger = new Logger('Commands/Dev')

class _ApplicationStarter {
  private _electronProcess: ChildProcess | undefined

  constructor() {
    this._cleanupProcess()
  }

  start(): void {
    if (this._electronProcess) {
      try {
        this._kill()
      } catch (e) {
        _logger.end('Error occurred while killing latest main', e)
      }

      this._electronProcess = undefined
    }

    _logger.log('Start application')
    _logger.log(`Debugger listening on ${_mainDebugPort}`)
    _logger.log(`Remote debugger listening on ${_rendererDebugPort}`)
    this._electronProcess = spawn(
      path.resolve(`node_modules/.bin/${_electronBin}`),
      [
        'dist/main/main.js',
        `--inspect=${_mainDebugPort}`,
        `--remote-debugging-port=${_rendererDebugPort}`,
      ],
      {
        stdio: 'inherit',
      },
    )

    this._cleanupElectronProcess()
  }

  private _kill(): void {
    if (this._electronProcess) {
      this._electronProcess.removeAllListeners('close')

      if (_isWindows) {
        _logger.debug('kill electron process on windows')

        spawn('taskkill', ['/pid', `${this._electronProcess.pid}`, '/f', '/t'])
      } else {
        _logger.debug('kill electron process on macOS/linux')
        const pid = this._electronProcess.pid
        const killed = this._electronProcess.killed
        this._electronProcess = undefined

        if (pid !== undefined && !killed) {
          process.kill(pid)
        }
      }
    }
  }

  private _cleanupElectronProcess() {
    this._electronProcess?.on('close', (code, signal) => {
      if (code === null) {
        _logger.error('Main Process exited with signal', signal)
        process.exit(1)
      }

      process.exit(code)
    })
  }

  private _cleanupProcess() {
    const clean = (signal: NodeJS.Signals) => {
      process.on(signal, () => {
        _logger.log('Cleanup before exit...')
        _logger.debug('Signal', signal)

        if (!this._electronProcess?.killed ?? false) {
          this._kill()
        }

        process.exit(0)
      })
    }

    clean('SIGINT')
    clean('SIGTERM')
  }
}

export class Dev extends Cli {
  private readonly _worker: Worker
  private readonly _mainBuilder: Builder
  private readonly _rendererBuilder: Builder | null
  private readonly _applicationStarter: _ApplicationStarter =
    new _ApplicationStarter()

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
