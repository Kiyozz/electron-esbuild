/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import type { Builder } from '../builder'
import type { ConfigItem } from '../config/config'

export abstract class BaseBuilder<T> implements Builder {
  readonly env: string

  abstract readonly hasInitialBuild: boolean

  protected constructor(protected readonly _config: ConfigItem<T>) {
    this.env = this._config.isMain
      ? 'Main'
      : this._config.isRenderer
      ? 'Renderer'
      : 'Unknown env'
  }

  abstract build(): Promise<void>

  abstract dev(start: () => void): void
}
