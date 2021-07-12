#!/usr/bin/env node

/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import meow from 'meow'

import { Cli, CliFlags } from './cli'
import { commands } from './commands'

const _cli = meow<CliFlags>(
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
    version: '1.6.0-rc.1',
    flags: {
      clean: {
        type: 'boolean',
        default: true,
      },
    },
  },
)

type Commands = keyof typeof commands

const _command = _cli.input[0] ?? null
const _availableCommands = ['dev', 'build']

function isValidAction(command: string): command is Commands {
  if (command === null || !_availableCommands.includes(command)) {
    _cli.showHelp(0)
  }

  return true
}

if (isValidAction(_command)) {
  const action: Cli = new commands[_command](_cli)

  action.init().then(() => {
    // process.exit(0)
  })
}
