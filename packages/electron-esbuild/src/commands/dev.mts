/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { ChildProcess, spawn } from 'child_process'
import path from 'node:path'

import { Builder } from '../builder.mjs'
import { Cli, CliResult } from '../cli.mjs'
import { CONFIG_FILE_NAME } from '../config/constants.mjs'
import { Logger } from '../console.mjs'
import { Worker } from '../worker.mjs'

const _isWindows = process.platform === 'win32'
const _electronBin = _isWindows ? 'electron.cmd' : 'electron'
const _defaultMainDebugPort = 9223
const _defaultRendererDebugPort = 9222
const _mainDebugPortFlag = '--inspect'
const _rendererDebugPortFlag = '--remote-debugging-port'
const _regMainDebugPort = new RegExp(`^${_mainDebugPortFlag}=(\\d+)$`)
const _regRendererDebugPort = new RegExp(`^${_rendererDebugPortFlag}=(\\d+)$`)

const _logger = new Logger('Commands/Dev')

class _ApplicationStarter {
  private _electronProcess: ChildProcess | undefined
  private readonly _args: readonly string[]
  private readonly _mainDebugPort: number
  private readonly _rendererDebugPort: number

  constructor(unknownInputs: string[]) {
    this._cleanupProcess()

    const getPort = (
      arg: string,
      reg: RegExp,
      flag: string,
    ): number | undefined => {
      const matches = reg.exec(arg)

      if (matches) {
        const [, port] = matches
        const portInt = parseInt(port)

        if (Number.isNaN(portInt)) {
          throw new Error(`${flag} is not a number`)
        }

        return portInt
      }
    }

    const inspectFlag = unknownInputs.find((input) =>
      input.includes(_mainDebugPortFlag),
    )
    const remoteFlag = unknownInputs.find((input) =>
      input.includes(_rendererDebugPortFlag),
    )
    let mainPort = _defaultMainDebugPort
    let rendererPort = _defaultRendererDebugPort

    const args = ['dist/main/main.js']

    if (!inspectFlag) {
      args.push(`${_mainDebugPortFlag}=${_defaultMainDebugPort}`)
    } else {
      const port = getPort(inspectFlag, _regMainDebugPort, _mainDebugPortFlag)

      if (port) {
        mainPort = port
      }
    }

    if (!remoteFlag) {
      args.push(`${_rendererDebugPortFlag}=${_defaultRendererDebugPort}`)
    } else {
      const port = getPort(
        remoteFlag,
        _regRendererDebugPort,
        _rendererDebugPortFlag,
      )

      if (port) {
        rendererPort = port
      }
    }

    this._args = [...args, ...unknownInputs]
    this._mainDebugPort = mainPort
    this._rendererDebugPort = rendererPort
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
    _logger.log(`Debugger listening on ${this._mainDebugPort}`)
    _logger.log(`Remote debugger listening on ${this._rendererDebugPort}`)

    this._electronProcess = spawn(
      path.resolve(`node_modules/.bin/${_electronBin}`),
      this._args,
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
    // eslint-disable-next-line no-undef
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
  private readonly _mainBuilder: Builder
  private readonly _rendererBuilder: Builder | null
  private readonly _applicationStarter: _ApplicationStarter

  static async create(cli: CliResult, unknownInputs: string[]): Promise<Dev> {
    process.env.NODE_ENV = 'development'

    _logger.debug('Creating worker')

    const worker = Worker.fromFile({
      file: CONFIG_FILE_NAME,
      env: 'development',
    })

    _logger.debug('Created worker')

    const config = await worker.toConfigAsync()

    _logger.debug('Parsed config')

    const [mainBuilder, rendererBuilder] = await config.toBuildersAsync()

    _logger.debug('Created builders')

    return new Dev(cli, {
      mainBuilder,
      rendererBuilder,
      unknownInputs,
    })
  }

  constructor(
    cli: CliResult,
    {
      mainBuilder,
      rendererBuilder,
      unknownInputs,
    }: {
      mainBuilder: Builder
      rendererBuilder: Builder | null
      unknownInputs: string[]
    },
  ) {
    super(cli)

    this._applicationStarter = new _ApplicationStarter(unknownInputs)
    this._mainBuilder = mainBuilder
    this._rendererBuilder = rendererBuilder
  }

  async init(): Promise<void> {
    _logger.debug('Start')

    const start = () => this._applicationStarter.start()

    _logger.debug('Starting dev builders')
    await this._mainBuilder.dev(start)
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
