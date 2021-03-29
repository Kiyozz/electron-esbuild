/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import nodeModule from 'module'
import { InlineConfig } from 'vite'

import { TypeConfig } from '../enums'
import { Configurator } from './base'

export class ViteConfigurator extends Configurator<TypeConfig.Vite> {
  public type = TypeConfig.Vite

  constructor() {
    super()
  }

  load(partial: Partial<InlineConfig>): InlineConfig {
    let external = partial?.build?.rollupOptions?.external

    if (!Array.isArray(external)) {
      external = [external as string]
    }

    return {
      build: {
        emptyOutDir: true,
        rollupOptions: {
          external: [...(external ?? []), 'electron', ...nodeModule.builtinModules],
        },
      },
    }
  }
}
