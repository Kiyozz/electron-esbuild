/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

import type { Builder } from '../builder.js'
import type { ConfigItem } from '../config/config.js'
import { PossibleConfiguration } from '../config/types.js'

export abstract class BaseBuilder<T extends PossibleConfiguration | null>
  implements Builder
{
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

  abstract dev(start: () => void): void | Promise<void>
}
