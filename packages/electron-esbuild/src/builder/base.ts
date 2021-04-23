/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import type { Builder } from '../builder'
import { ElectronEsbuildConfigItem } from '../config/types'

export abstract class BaseBuilder<T> implements Builder {
  env: string

  abstract hasInitialBuild: boolean

  protected constructor(protected _config: ElectronEsbuildConfigItem<T>) {
    this.env = this._config.isMain ? 'Main' : this._config.isRenderer ? 'Renderer' : 'Unknown env'
  }

  abstract build(): Promise<void>

  abstract dev(start: () => void): void
}
