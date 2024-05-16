/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

import { dim, cyan, bgLightGreen, black } from 'kolorist'
import * as fs from 'node:fs/promises'
import * as os from 'node:os'
import * as path from 'node:path'

import { Template } from './enums/template.js'
import { makeDir, write } from './helpers/fs.js'
import {
  getPackageManager,
  PackageManagerNames,
} from './helpers/get-package-manager.js'
import { getTemplateDir } from './helpers/get-template-dir.js'
import { initializeGit } from './helpers/git.js'
import { isPathExists } from './helpers/is-path-exists.js'
import { error } from './helpers/log.js'
import { readJsonFromFile } from './helpers/read-json-from-file.js'
import { Package } from './types/package.js'

type CreateOptions = {
  name: string
  template: Template
  packageManager: PackageManagerNames
  // user's final app destination
  out: string
}

export const createApp = async ({
  name,
  out,
  template,
  packageManager,
}: CreateOptions): Promise<void> => {
  try {
    await makeDir(out)

    // user's app name (if name is var/app-name, then appName is app-name
    const appName = path.basename(name)
    // user's package manager
    const pm = getPackageManager(packageManager)
    // path to the chosen template
    const templateDir = getTemplateDir(template)

    // #copy template files to out
    const templateFiles = await fs.readdir(templateDir)

    for (const file of templateFiles) {
      await write({ file, out, templateDir })
    }
    // #end copy

    const outPackageJson = path.resolve(out, 'package.json')
    const packageJson = await readJsonFromFile<Package>(outPackageJson)
    const finalJson: Package = {
      ...packageJson,
      name: appName,
      build: {
        ...packageJson.build,
        productName: appName,
        extraMetadata: {
          ...packageJson.build.extraMetadata,
          name: appName,
        },
      },
    }

    await fs.writeFile(
      outPackageJson,
      JSON.stringify(finalJson, null, 2) + os.EOL,
    )

    const gitRes = initializeGit(out)

    if (gitRes.status === 0) {
      console.log(dim('\nInitialized a git repository\n'))
    }

    console.log(
      `${bgLightGreen(black(' SUCCESS! '))} Created ${appName} at ${out}.`,
    )
    console.log(
      `\n  ${cyan(`${packageManager}${pm.run ? ` ${pm.run}` : ''} dev`)}`,
    )
    console.log('    Starts the development application.\n')
    console.log(
      `  ${cyan(`${packageManager}${pm.run ? ` ${pm.run}` : ''} build`)}`,
    )
    console.log('    Builds the application for production.\n')
    console.log(
      `  ${cyan(`${packageManager}${pm.run ? ` ${pm.run}` : ''} package`)}`,
    )
    console.log('    Packages the application using electron-builder.\n')
    console.log('We suggest that you begin by typing:\n')
    console.log(`  ${cyan('cd')} ${name}`)
    console.log(`  ${cyan(`${packageManager} ${pm.install}`)}`)
    console.log(
      `  ${cyan(`${packageManager}${pm.run ? ` ${pm.run}` : ''} dev`)}`,
    )
  } catch (e) {
    console.error('\n' + error(), '\n')
    console.error('An error occurred during project initialization\n')
    console.error(e)

    if (await isPathExists(out)) {
      await fs.rmdir(out)
    }
  }
}
