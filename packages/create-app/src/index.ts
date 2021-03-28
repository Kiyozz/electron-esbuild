#!/usr/bin/env node

/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { prompt } from 'enquirer'
import { cyan, stripColors, bgLightYellow, black, bgLightGreen } from 'kolorist'
import minimist from 'minimist'
import path from 'path'

import createApp from './create-app'
import { Template } from './enums/template'
import ensureFolderEmpty from './helpers/ensure-folder-empty'
import { emptyDir, isDirEmpty } from './helpers/fs'
import isTemplateValid, { TEMPLATES } from './helpers/is-template-valid'
import { warn } from './helpers/log'

const argv = minimist(process.argv.slice(2))
const VERSION = '1.4.1'

if (argv.help) {
  console.log(
    `
create-app <app-name> [options]

${bgLightGreen(black(' ARGS '))}
${cyan('app-name')}               name of your app

${bgLightYellow(black(' OPTIONS '))}
${cyan('-t, --template')}         use this template
${cyan('-p, --package-manager')}  use this package manager [npm, pnpm, yarn]
${cyan('-o, --override')}         remove existing output folder
${cyan('--version')}              prints version
${cyan('--help')}                 show this help
  `.trim(),
  )

  process.exit(0)
}

if (argv.version) {
  console.log(VERSION)

  process.exit(0)
}

let [projectName] = argv._ ?? []

async function start() {
  if (projectName === undefined) {
    const { name } = await prompt<{ name: string }>({
      type: 'input',
      name: 'name',
      message: 'Project name:',
      initial: 'electron-esbuild-project',
    })

    projectName = name
  }

  const out = path.resolve(process.cwd(), projectName)
  const override = (argv.o || argv.override) ?? false

  if (override) {
    if (!isDirEmpty(out)) {
      console.warn(warn(), `removing existing folder ${out}`)
      emptyDir(out)
    }
  } else {
    await ensureFolderEmpty(out)
  }

  let packageManager = argv.p || argv['package-manager']

  if (packageManager && !['pnpm', 'npm', 'yarn'].includes(packageManager)) {
    console.warn(warn(), `${packageManager} is not a known package manager.`)
  }

  let template: Template | undefined = argv.t || argv.template
  let templateMessage = 'Select a template:'

  if (template !== undefined) {
    if (!isTemplateValid(template)) {
      templateMessage = `${template} isn't a valid template. Please choose from below:`
      template = undefined
    }
  }

  if (template === undefined) {
    const { t } = await prompt<{ t: Template }>({
      type: 'select',
      name: 't',
      message: templateMessage,
      choices: TEMPLATES,
    })

    template = stripColors(t) as Template
  }

  packageManager = packageManager || /yarn/.test(process.env.npm_execpath ?? '') ? 'yarn' : 'npm'

  createApp({ name: projectName, packageManager, template, out })
}

start().catch((e) => console.error(e))
