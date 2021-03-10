#!/usr/bin/env node
/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import meow from 'meow'

import Cli, { CliFlags } from './cli'
import commands from './commands'

const cli = meow<CliFlags>(
  `Usage
  $ electron-esbuild [command]

Commands
  dev
    Runs a development environment
  build
    Builds your application preparing for packaging

Examples
  $ electron-esbuild dev
  $ electron-esbuild build`,
  {
    version: '1.1.3',
    flags: {
      clean: {
        type: 'boolean',
        default: true,
      },
    },
  },
)

type Commands = keyof typeof commands

const command = cli.input[0] ?? null
const availableCommands = ['dev', 'build']

function isValidAction(command: string): command is Commands {
  if (command === null || !availableCommands.includes(command)) {
    cli.showHelp(0)
  }

  return true
}

if (isValidAction(command)) {
  const action: Cli = new commands[command](cli)

  action.init().then((code) => {
    if (typeof code !== 'undefined') {
      process.exit(code)
    }
  })
}
