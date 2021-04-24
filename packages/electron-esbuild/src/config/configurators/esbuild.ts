/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import deepMerge from 'deepmerge'
import { BuildOptions } from 'esbuild'
import nodeModule from 'module'
import path from 'path'

import type { ItemConfig } from '../config'
import { Target, TypeConfig } from '../enums'
import type { Configurator } from './base'

export class EsbuildConfigurator implements Configurator<TypeConfig.Esbuild> {
  public readonly type = TypeConfig.Esbuild

  constructor(public readonly config: ItemConfig) {}

  load(
    partial: Partial<BuildOptions>,
    userConfig: BuildOptions,
    target: Target,
  ): BuildOptions {
    const additional: Partial<BuildOptions> = {}
    const out = path.resolve(
      process.cwd(),
      this.config.output,
      target === Target.Main ? 'main.js' : 'index.js',
    )

    if (userConfig.entryPoints?.length ?? 1 > 1) {
      additional.outdir = path.dirname(out)
    } else {
      additional.outfile = out
    }

    return deepMerge(
      deepMerge(
        partial,
        {
          external: [
            ...(partial.external ?? []),
            'electron',
            ...nodeModule.builtinModules,
          ],
        },
        { clone: false },
      ),
      additional,
      { clone: false },
    )
  }
}
