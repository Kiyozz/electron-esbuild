/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import nodeModule from 'node:module'
import { InlineConfig } from 'vite'

import type { EnvConfig } from '../config.mjs'
import { TypeConfig } from '../enums.mjs'
import type { Configurator } from './base.configurator.mjs'

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
