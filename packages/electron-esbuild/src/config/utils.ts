/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

import { BuildOptions } from 'esbuild'

import { TypeConfig } from './enums.js'
import { ExtractArray, PossibleConfiguration } from './types.js'

export function configByEnv({
  dev,
  type,
}: {
  dev: boolean
  type: TypeConfig | null
}): Partial<ExtractArray<PossibleConfiguration>> {
  if (type === null) {
    return {}
  }

  if (dev) {
    switch (type) {
      case TypeConfig.esbuild:
        return {
          sourcemap: 'inline',
          define: {
            'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
          },
        } satisfies BuildOptions
      case TypeConfig.vite:
        return {}
    }
  }

  switch (type) {
    case TypeConfig.esbuild:
      return {
        sourcemap: 'external',
        define: {
          'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
        },
      } satisfies BuildOptions
    case TypeConfig.vite:
      return {}
  }
}
