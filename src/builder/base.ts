/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { Builder } from '../builder'
import { ElectronEsbuildConfigItem } from '../config/types'
import { isMain, isRenderer } from '../config/utils'

export abstract class BaseBuilder<T> implements Builder {
  public env: string

  protected constructor(protected config: ElectronEsbuildConfigItem<T>) {
    this.env = isMain(this.config) ? 'Main' : isRenderer(this.config) ? 'Renderer' : 'Unknown env'
  }

  abstract build(): Promise<void>

  abstract dev(start: () => void): void
}
