/*
 * Copyright (c) 2022 Kiyozz.
 *
 * All rights reserved.
 */

import { BuildOptions } from 'esbuild'
import { InlineConfig } from 'vite'

import { TypeConfig } from './enums.mjs'

export type PossibleConfiguration = BuildOptions | InlineConfig

export interface ConfigMapping {
  [TypeConfig.esbuild]: BuildOptions
  [TypeConfig.vite]: InlineConfig
}
