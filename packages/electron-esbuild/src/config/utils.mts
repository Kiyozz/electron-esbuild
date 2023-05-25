/*
 * Copyright (c) 2022 Kiyozz.
 *
 * All rights reserved.
 */

import { BuildOptions } from 'esbuild'

import { TypeConfig } from './enums.mjs'
import { PossibleConfiguration } from './types.mjs'

export function configByEnv({
  dev,
  type,
}: {
  dev: boolean
  type: TypeConfig | null
}): Partial<PossibleConfiguration> {
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
        } as BuildOptions
      case TypeConfig.vite:
        return {}
    }
  }

  switch (type) {
    case TypeConfig.esbuild:
      return {
        sourcemap: 'external',
        minify: true,
        define: {
          'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
        },
      } as BuildOptions
    case TypeConfig.vite:
      return {}
  }
}
