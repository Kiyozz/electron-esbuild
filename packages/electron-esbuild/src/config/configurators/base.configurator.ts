/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

import type { EnvConfig } from '../config.js'
import { Target, TypeConfig } from '../enums.js'
import { ConfigMapping, ExtractArray } from '../types.js'

export interface Configurator<P extends TypeConfig> {
  readonly type: TypeConfig
  readonly config: EnvConfig

  toBuilderConfig(
    partial: Partial<ExtractArray<ConfigMapping[P]>>,
    config: ConfigMapping[P],
    target: Target,
  ): ConfigMapping[P]
}
