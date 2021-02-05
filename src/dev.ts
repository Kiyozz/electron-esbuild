/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import * as path from 'path'
import { ChildProcessWithoutNullStreams, spawn } from 'child_process'
import * as chokidar from 'chokidar'
import * as webpack from 'webpack'
import * as esbuild from 'esbuild'
import { BuildIncremental, BuildOptions } from 'esbuild'
import * as WebpackDevServer from 'webpack-dev-server'
import * as debounce from 'debounce-fn'
import * as depsTree from 'dependency-tree'
import { track } from './track'
import { parseConfig } from './config'

process.env.NODE_ENV = 'development'

let electronProcess: ChildProcessWithoutNullStreams | undefined
const isWindows = process.platform === 'win32'
const electronBin = isWindows ? 'electron.cmd' : 'electron'

function killProcess(pid: number): void {
  if (isWindows) {
    spawn('taskkill', ['/pid', `${pid}`, '/f', '/t'])
  } else {
    process.kill(pid)
  }
}

function getDeps(file: string): string[] {
  return depsTree.toList({
    filename: file,
    directory: path.dirname(file),
    filter: (filePath) => filePath.indexOf('node_modules') === -1,
  })
}

function startMain(): void {
  if (electronProcess) {
    console.info(track(), 'Kill latest main')

    try {
      killProcess(electronProcess.pid)
    } catch (e) {
      console.error('Error occured while killing latest main', e)
    }

    electronProcess = undefined
  }

  console.info(track(), 'Start main')
  electronProcess = spawn(path.resolve(path.resolve(`node_modules/.bin/${electronBin}`)), ['dist/main/main.js'])

  electronProcess.stdout.on('data', (data) => {
    console.log(track(), data.toString().trim())
  })
  electronProcess.stderr.on('data', (data) => {
    console.log(track(), 'STDERR', data.toString().trim())
  })

  electronProcess.on('close', (code, signal) => {
    if (signal !== null) {
      process.exit(code || 0)
    }
  })
}

let mainBuilder: BuildIncremental

async function mainBuild(esbuildMainConfig: BuildOptions): Promise<void> {
  console.info(track(), 'Building main')

  if (mainBuilder) {
    await mainBuilder.rebuild()

    console.info(track(), 'Main built')

    return
  }

  mainBuilder = (await esbuild.build(esbuildMainConfig)) as BuildIncremental

  console.info(track(), 'Main built')
}

function watchMain(esbuildMainConfig: BuildOptions): void {
  const mainSources = path.join(path.resolve('src/main'), '**', '*.ts')
  const mainWatcher = chokidar.watch([mainSources, ...getDeps(path.resolve('src/main/main.ts'))])

  mainWatcher.on('ready', () => {
    mainWatcher.on(
      'all',
      debounce(
        async () => {
          await mainBuild(esbuildMainConfig)
          startMain()
          await mainWatcher.close()
          watchMain(esbuildMainConfig)
        },
        { wait: 200 },
      ),
    )
  })
}

async function dev(): Promise<void> {
  console.info(track(), 'Start')
  const { esbuildMainConfig, webpackRendererConfig } = parseConfig(
    'electron-esbuild.config.yaml',
    { incremental: true },
    { mode: 'development', devtool: 'eval' },
  )
  const rendererCompiler = webpack(webpackRendererConfig)
  const rendererServer = new WebpackDevServer(rendererCompiler, {
    hot: true,
    overlay: true,
  })

  watchMain(esbuildMainConfig)
  rendererServer.listen(9080, 'localhost', () => {
    console.info(track(), 'Building renderer')
  })

  await Promise.all([
    mainBuild(esbuildMainConfig),
    new Promise<void>((resolve) => {
      rendererCompiler.hooks.done.tap('Hook', () => {
        console.info(track(), 'Renderer built')
        resolve()
      })
    }),
  ])

  await startMain()
}

dev()
