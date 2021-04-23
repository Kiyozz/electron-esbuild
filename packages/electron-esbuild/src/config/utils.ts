/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { BuildOptions } from 'esbuild'
import { Configuration } from 'webpack'

import { TypeConfig } from './enums'
import { PossibleConfiguration } from './types'

export function configByEnv(dev: boolean, type: TypeConfig | null): PossibleConfiguration {
  if (type === null) {
    return {}
  }

  if (dev) {
    switch (type) {
      case TypeConfig.Esbuild:
        return {
          incremental: true,
          sourcemap: 'inline',
          define: {
            'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
          },
        } as BuildOptions
      case TypeConfig.Webpack:
        return { mode: 'development', devtool: 'eval' } as Configuration
      case TypeConfig.Vite:
        return {}
    }
  }

  switch (type) {
    case TypeConfig.Esbuild:
      return {
        sourcemap: false,
        minify: true,
        define: {
          'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
        },
      } as BuildOptions
    case TypeConfig.Webpack:
      return { mode: 'production', devtool: false } as Configuration
    case TypeConfig.Vite:
      return {}
  }
}
