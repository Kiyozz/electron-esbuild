/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

import { isObject } from '@sindresorhus/is'
import deepMerge from 'deepmerge'
import { BuildOptions } from 'esbuild'
import nodeModule from 'node:module'
import path from 'node:path'
import * as process from 'node:process'

import type { Configurator } from './base.configurator.js'
import type { EnvConfig } from '../config.js'
import { TypeConfig } from '../enums.js'

export class EsbuildConfigurator implements Configurator<TypeConfig.esbuild> {
  public readonly type = TypeConfig.esbuild

  constructor(public readonly config: EnvConfig) {}

  toBuilderConfig(
    partial: Partial<BuildOptions>,
    userConfig: BuildOptions[] | BuildOptions,
  ): BuildOptions[] {
    const additional: Partial<BuildOptions> = {}
    const out = path.resolve(
      process.cwd(),
      this.config.output.dir,
      this.config.output.filename,
    )

    if (!Array.isArray(userConfig)) {
      userConfig = [userConfig]
    }

    return userConfig.map((config) => {
      if (
        (isObject(config.entryPoints) &&
          Object.keys(config.entryPoints).length > 0) ||
        (config.entryPoints?.length ?? 1 > 1)
      ) {
        additional.outdir = path.dirname(out)
      } else {
        additional.outfile = out
      }

      return deepMerge(
        deepMerge(
          deepMerge(config, partial, { clone: false }),
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
    })
  }
}
