/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import * as path from 'path'
import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import { configByEnv, ElectronEsbuildConfigItem, ElectronEsbuildWorker, FILE } from '../config'
import { Logger } from '../console'
import { Builder, createBuilders } from '../builder'

process.env.NODE_ENV = 'development'

const isWindows = process.platform === 'win32'
const electronBin = isWindows ? 'electron.cmd' : 'electron'

const logger = new Logger('Dev')

class Dev {
  private readonly worker = new ElectronEsbuildWorker(FILE)
  private readonly mainConfig: ElectronEsbuildConfigItem
  private readonly rendererConfig: ElectronEsbuildConfigItem
  private electronProcess: ChildProcessWithoutNullStreams | undefined
  private readonly mainBuilder: Builder
  private readonly rendererBuilder: Builder

  constructor() {
    const { mainConfig, rendererConfig } = this.worker.parse(
      configByEnv(true, this.worker.mainConfig.type),
      configByEnv(true, this.worker.rendererConfig.type),
    )

    this.mainConfig = mainConfig
    this.rendererConfig = rendererConfig

    const [mainBuilder, rendererBuilder] = createBuilders(this.mainConfig, this.rendererConfig)

    this.mainBuilder = mainBuilder
    this.rendererBuilder = rendererBuilder
  }

  async init(): Promise<void> {
    const start = () => this.startApp()

    this.mainBuilder.watch(start)
    this.rendererBuilder.watch(start)

    await Promise.all([this.mainBuilder.build(), this.rendererBuilder.build()])

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

async function dev(): Promise<void> {
  logger.log('Start')

  const dev = new Dev()

  await dev.init()
}

dev()
