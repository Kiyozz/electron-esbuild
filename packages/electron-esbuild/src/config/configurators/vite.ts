/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import nodeModule from 'module'
import { InlineConfig } from 'vite'

import type { EnvConfig } from '../config'
import { TypeConfig } from '../enums'
import type { Configurator } from './base'

export class ViteConfigurator implements Configurator<TypeConfig.vite> {
  public readonly type = TypeConfig.vite

  constructor(public readonly config: EnvConfig) {}

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
      server: {
        fs: {
          allow: ['../..'],
        },
      },
    }
  }
}
