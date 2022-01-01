/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import type { EnvConfig } from '../config.mjs'
import { Target, TypeConfig } from '../enums.mjs'
import { ConfigMapping } from '../types.mjs'

export interface Configurator<P extends TypeConfig> {
  readonly type: TypeConfig
  readonly config: EnvConfig

  toBuilderConfig(
    partial: Partial<ConfigMapping[P]>,
    config: ConfigMapping[P],
    target: Target,
  ): ConfigMapping[P]
}
