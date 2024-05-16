/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

import type { EnvConfig } from './config.js'
import { TypeConfig } from './enums.js'

export type YamlOutput = {
  dir: string
  filename: string
}

export type YamlItem = {
  type: TypeConfig
  path: string
  src: string
  output: YamlOutput
  html?: string
}

export type YamlSkeleton = {
  mainConfig: YamlItem
  rendererConfig: YamlItem | null
}

export class Yaml {
  readonly main: EnvConfig
  readonly renderer: EnvConfig | null

  constructor({
    main,
    renderer,
  }: {
    main: EnvConfig
    renderer: EnvConfig | null
  }) {
    this.main = main
    this.renderer = renderer
  }
}
