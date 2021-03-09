/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { Target, TypeConfig } from '../enums'
import { ConfigMapping } from '../types'

export default abstract class Configurator<P extends TypeConfig> {
  public abstract type: TypeConfig

  abstract load(partial: Partial<ConfigMapping[P]>, config: ConfigMapping[P], target: Target): ConfigMapping[P]
}
