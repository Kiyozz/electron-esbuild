import { BuildOptions } from 'esbuild'
import * as yaml from 'js-yaml'
import * as fs from 'fs'
import * as path from 'path'
import * as nodeModule from 'module'
import { Configuration } from 'webpack'

export interface ElectronEsbuildConfig {
  esbuildMainConfig: BuildOptions
  webpackRendererConfig: Configuration
}

export interface ElectronEsbuildConfigRaw {
  esbuildMainConfig: string
  webpackRendererConfig: string
}

export function parseConfig(
  file: string,
  esbuildPartial: Partial<BuildOptions>,
  webpackPartial: Partial<Configuration>,
): ElectronEsbuildConfig {
  let fileContent: string

  try {
    fileContent = fs.readFileSync(path.resolve(file)).toString()
  } catch (e) {
    console.error('Cannot find file', file)
    process.exit(1)
  }

  const electronEsbuildConfig = yaml.load(fileContent) as unknown

  if (
    typeof electronEsbuildConfig !== 'object' ||
    !electronEsbuildConfig?.hasOwnProperty('esbuildMainConfig') ||
    !electronEsbuildConfig?.hasOwnProperty('webpackRendererConfig')
  ) {
    console.error(`${file} is an invalid configuration`)
    process.exit(1)
  }

  const { esbuildMainConfig, webpackRendererConfig } = electronEsbuildConfig as ElectronEsbuildConfigRaw

  if (!fs.existsSync(esbuildMainConfig)) {
    console.error(`Esbuild main config file '${esbuildMainConfig}' not found. Check your ${file}`)
    process.exit(1)
  }

  if (!fs.existsSync(webpackRendererConfig)) {
    console.error(`Webpack renderer config file '${webpackRendererConfig}' not found. Check your ${file}`)
    process.exit(1)
  }

  const rendererOutput = path.resolve(process.cwd(), 'dist', 'renderer')

  return {
    esbuildMainConfig: require(path.resolve(process.cwd(), esbuildMainConfig))({
      ...esbuildPartial,
      external: [...(esbuildPartial.external ?? []), 'electron', ...nodeModule.builtinModules],
      outfile: path.resolve(process.cwd(), 'dist/main/main.js'),
    }),
    webpackRendererConfig: require(path.resolve(process.cwd(), webpackRendererConfig))({
      ...webpackPartial,
      output: {
        filename: 'index.js',
        path: rendererOutput,
      },
    }),
  }
}
