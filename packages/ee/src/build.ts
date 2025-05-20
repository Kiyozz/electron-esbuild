/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

import { build as esbuildBuild } from 'esbuild'
import { BuildOptions as EsbuildBuildOptions, Format } from 'esbuild'
import glob from 'fast-glob'
import { bgCyan, bgGreen, bgRed, black, cyan, green, red } from 'kolorist'
import * as childProcess from 'node:child_process'
import * as os from 'node:os'
import * as path from 'node:path'
import * as process from 'node:process'
import { rimraf } from 'rimraf'

type BuildOptions = {
  module: boolean
  entries: string[]
  tsProject: string
  target?: string | string[]
  outdir?: string
  cleanOutDir?: boolean
  checkTypes?: boolean
  options?: EsbuildBuildOptions
  formats?: Format[]
}

const clean = async (path: string): Promise<void> => {
  await rimraf(path)
}

const getEntries = async (paths: string[]): Promise<string[]> => {
  const base = process.cwd()

  const result = await Promise.all(
    paths.map((p): Promise<string[]> => {
      let absP = path.resolve(base, p)

      if (absP.includes("'")) {
        absP = absP.replace(/'/g, '')
      }

      if (os.platform() === 'win32') {
        absP = absP.replace(/\\/g, '/')
      }

      return glob(absP)
    }),
  )

  return result.flat()
}

const humanizeDuration = (duration: number): string => {
  if (duration > 1000) {
    return `${duration / 1000}s`
  }

  return `${duration}ms`
}

const task = (label: string) => {
  console.log(`${bgCyan(black(' TASK '))} ${cyan(label)}`)
  const now = Date.now()

  return {
    end() {
      const duration = Date.now() - now
      console.log(
        `${bgGreen(black(' DONE '))} ${green(
          `${label} - ${humanizeDuration(duration)}`,
        )}`,
      )
    },
    error() {
      const duration = Date.now() - now

      console.error(
        `${bgRed(black(' ERROR '))} ${red(
          `${label} - ${humanizeDuration(duration)}`,
        )}`,
      )
    },
  }
}

export const build = async ({
  module: buildAsModule,
  entries,
  tsProject,
  target = 'node14',
  outdir = 'dist',
  cleanOutDir = false,
  checkTypes = false,
  formats = ['esm'],
  options,
}: BuildOptions): Promise<void> => {
  if (cleanOutDir) {
    await clean(outdir)
  }

  const entryPoints = await getEntries(entries)

  if (checkTypes) {
    const cTask = task('CHECKING TYPES')
    const tscResult = childProcess.spawnSync('tsc', ['-p', tsProject], {
      cwd: process.cwd(),
      stdio: 'inherit',
      shell: true,
    })

    if (tscResult.error || tscResult.status !== 0) {
      cTask.error()

      if (tscResult.error) {
        throw tscResult.error
      }

      throw new Error('error occurred during check-types')
    }

    cTask.end()
  }

  const bTask = task('BUILDING')

  await Promise.all(
    formats.map((format) => {
      return esbuildBuild({
        entryPoints,
        outdir,
        platform: 'node',
        format,
        target,
        logLevel: 'info',
        outExtension: {
          '.js':
            buildAsModule || format === 'cjs' || format === 'iife'
              ? '.js'
              : '.mjs',
        },
        ...options,
      })
    }),
  )

  bTask.end()
}
