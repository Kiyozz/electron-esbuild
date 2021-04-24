/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import type { ItemConfig } from '../config'
import { Target, TypeConfig } from '../enums'
import { ConfigMapping } from '../types'

export interface Configurator<P extends TypeConfig> {
  readonly type: TypeConfig
  readonly config: ItemConfig

  load(
    partial: Partial<ConfigMapping[P]>,
    config: ConfigMapping[P],
    target: Target,
  ): ConfigMapping[P]
}
