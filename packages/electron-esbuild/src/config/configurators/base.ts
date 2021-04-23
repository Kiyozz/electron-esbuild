/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { Target, TypeConfig } from '../enums'
import { ConfigMapping, ItemConfig } from '../types'

export interface Configurator<P extends TypeConfig> {
  type: TypeConfig
  config: ItemConfig

  load(partial: Partial<ConfigMapping[P]>, config: ConfigMapping[P], target: Target): ConfigMapping[P]
}
