/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

import { BuildOptions } from 'esbuild'
import { InlineConfig } from 'vite'

import { TypeConfig } from './enums.js'

export type ExtractArray<T> = T extends Array<infer U> ? U : T

export type MainPossibleConfiguration = BuildOptions[]

export type RendererPossibleConfiguration = BuildOptions[] | InlineConfig

export type PossibleConfiguration =
  | MainPossibleConfiguration
  | RendererPossibleConfiguration

export interface ConfigMapping {
  [TypeConfig.esbuild]: MainPossibleConfiguration
  [TypeConfig.vite]: RendererPossibleConfiguration
}
