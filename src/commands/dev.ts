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
import { ElectronEsbuildConfigItem } from '../config/types'
import { configByEnv } from '../config/utils'
import { Logger } from '../console'

process.env.NODE_ENV = 'development'

const isWindows = process.platform === 'win32'
const electronBin = isWindows ? 'electron.cmd' : 'electron'

const logger = new Logger('Commands/Dev')

export class Dev extends Cli {
  private readonly worker: ElectronEsbuildWorker
  private readonly mainConfig: ElectronEsbuildConfigItem
  private readonly rendererConfig: ElectronEsbuildConfigItem
  private electronProcess: ChildProcessWithoutNullStreams | undefined
  private readonly mainBuilder: Builder
  private readonly rendererBuilder: Builder

  constructor(cli: CliResult) {
    super(cli)
    logger.debug('Creating worker')

    this.worker = new ElectronEsbuildWorker(CONFIG_FILE_NAME)

    logger.debug('Created worker')

    const { mainConfig, rendererConfig } = this.worker.parse(
      configByEnv(true, this.worker.mainConfig.type),
      configByEnv(true, this.worker.rendererConfig.type),
    )

    logger.debug('Parsed config')

    this.mainConfig = mainConfig
    this.rendererConfig = rendererConfig

    const [mainBuilder, rendererBuilder] = createBuilders(this.mainConfig, this.rendererConfig)

    logger.debug('Created builders')

    this.mainBuilder = mainBuilder
    this.rendererBuilder = rendererBuilder
  }

  async init(): Promise<void> {
    logger.debug('Start')

    const start = () => this.startApp()

    logger.debug('Starting dev builders')
    this.mainBuilder.dev(start)
    this.rendererBuilder.dev(start)
    logger.debug('Started dev builders')
    logger.debug('Starting initial builds')

    await Promise.all([this.mainBuilder.build(), this.rendererBuilder.build()])

    logger.debug('Initial builds finished')

    await this.startApp()
  }

  private startApp() {
    if (this.electronProcess) {
      logger.log('Kill latest main')

      try {
        this.kill()
      } catch (e) {
        logger.error('Error occured while killing latest main', e)
      }

      this.electronProcess = undefined
    }

    logger.log('Start application')
    this.electronProcess = spawn(path.resolve(path.resolve(`node_modules/.bin/${electronBin}`)), ['dist/main/main.js'])

    this.electronProcess.stdout.on('data', (data) => {
      logger.log(data.toString().trim())
    })
    this.electronProcess.stderr.on('data', (data) => {
      logger.log('STDERR', data.toString().trim())
    })

    this.electronProcess.on('close', (code, signal) => {
      if (signal !== null) {
        process.exit(code || 0)
      }
    })
  }

  private kill() {
    if (this.electronProcess) {
      if (isWindows) {
        spawn('taskkill', ['/pid', `${this.electronProcess.pid}`, '/f', '/t'])
      } else {
        process.kill(this.electronProcess.pid)
      }
    }
  }
}
