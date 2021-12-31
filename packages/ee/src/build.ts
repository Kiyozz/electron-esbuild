import spawn from 'cross-spawn'
import { build as esbuildBuild } from 'esbuild'
import { BuildOptions as EsbuildBuildOptions, Format } from 'esbuild'
import glob from 'fast-glob'
import { bgCyan, bgGreen, black, cyan, green } from 'kolorist'
import { platform } from 'os'
import path from 'path'

async function getEntries(paths: string[]): Promise<string[]> {
  const base = process.cwd()

  const result = await Promise.all(
    paths.map((p): Promise<string[]> => {
      let absP = path.resolve(base, p)

      if (absP.includes("'")) {
        absP = absP.replace(/'/g, '')
      }

      if (platform() === 'win32') {
        absP = absP.replace(/\\/g, '/')
      }

      return glob(absP)
    }),
  )

  return result.flat()
}

interface BuildOptions {
  entries: string[]
  tsProject: string
  checkTypes?: boolean
  options?: EsbuildBuildOptions
  formats?: Format[]
}

function humanizeDuration(duration: number): string {
  if (duration > 1000) {
    return `${duration / 1000}s`
  }

  return `${duration}ms`
}

function task(label: string): { end: () => void } {
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
  }
}

export async function build({
  entries,
  tsProject,
  checkTypes = false,
  formats = ['cjs'],
  options,
}: BuildOptions): Promise<void> {
  const entryPoints = await getEntries(entries)

  if (checkTypes) {
    const cTask = task('CHECKING TYPES')
    spawn.sync(`tsc -p ${tsProject}`, { cwd: process.cwd(), stdio: 'inherit' })
    cTask.end()
  }

  const bTask = task('BUILDING')

  await Promise.all(
    formats.map((format) =>
      esbuildBuild({
        entryPoints,
        outdir: 'dist',
        platform: 'node',
        format,
        target: 'node10',
        logLevel: 'info',
        outExtension: {
          '.js': format === 'cjs' || format === 'iife' ? '.js' : '.esm.js',
        },
        ...options,
      }),
    ),
  )

  bTask.end()
}
