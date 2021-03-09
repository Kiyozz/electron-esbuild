/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { Result } from 'meow'

export type CliFlags = {
  clean: {
    type: 'boolean'
    default: true
  }
}

export type CliResult = Result<CliFlags>

export default abstract class Cli {
  protected constructor(protected cli: CliResult) {}

  abstract init(): Promise<number | void>
}
