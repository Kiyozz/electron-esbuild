/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import type { EnvConfig } from './config.mjs'
import { TypeConfig } from './enums.mjs'

export type YamlItem = {
  type: TypeConfig
  path: string
  src: string
  output: string
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
