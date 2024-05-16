/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

import { BuildOptions } from 'esbuild'
import { InlineConfig } from 'vite'

import { TypeConfig } from './enums.js'

export type MainPossibleConfiguration = BuildOptions[]

export type RendererPossibleConfiguration =
  | Omit<BuildOptions, 'logLevel'>
  | InlineConfig

export type PossibleConfiguration =
  | MainPossibleConfiguration
  | RendererPossibleConfiguration

export interface ConfigMapping {
  [TypeConfig.esbuild]: MainPossibleConfiguration
  [TypeConfig.vite]: RendererPossibleConfiguration
}
