#!/usr/bin/env node

/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import meow from 'meow'

import { Cli, CliFlags } from './cli.mjs'
import { commands } from './commands/index.mjs'

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
    version: '3.0.1',
    flags: {
      clean: {
        type: 'boolean',
        default: true,
      },
    },
    importMeta: import.meta,
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
  const action: Cli = await commands[_command].create(_cli)

  action.init().then(() => {
    // process.exit(0)
  })
}
