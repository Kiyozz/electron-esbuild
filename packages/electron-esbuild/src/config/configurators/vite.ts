/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import nodeModule from 'module'
import { InlineConfig } from 'vite'

import type { ItemConfig } from '../config'
import { TypeConfig } from '../enums'
import type { Configurator } from './base'

export class ViteConfigurator implements Configurator<TypeConfig.Vite> {
  public readonly type = TypeConfig.Vite

  constructor(public readonly config: ItemConfig) {}

  toBuilderConfig(partial: Partial<InlineConfig>): InlineConfig {
    let external = partial?.build?.rollupOptions?.external

    if (!Array.isArray(external)) {
      external = [external as string]
    }

    return {
      build: {
        emptyOutDir: true,
        rollupOptions: {
          external: [
            ...(external ?? []),
            'electron',
            ...nodeModule.builtinModules,
          ],
        },
      },
    }
  }
}
