/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

import chokidar from 'chokidar'
import debounce from 'debounce-fn'
import esbuild, { BuildContext, BuildOptions } from 'esbuild'
import path from 'node:path'

import { BaseBuilder } from './base.builder.js'
import type { ConfigItem } from '../config/config.js'
import { Logger } from '../console.js'
import { getDeps } from '../deps.js'

const _logger = new Logger('Builder/Esbuild')

export class EsbuildBuilder extends BaseBuilder<BuildOptions[]> {
  readonly hasInitialBuild = true

  private _builders: BuildContext[] = []

  constructor(protected readonly _config: ConfigItem<BuildOptions[]>) {
    super(_config)
  }

  async build(): Promise<void> {
    _logger.log('Building', this.env.toLowerCase())

    if (this._builders.length > 0) {
      await Promise.all(this._builders.map((builder) => builder.rebuild()))
    } else {
      this._builders = await Promise.all(
        this._config.config.map((config) => esbuild.context(config)),
      )
      await Promise.all(this._builders.map((builder) => builder.rebuild()))
    }

    _logger.log(this.env, 'built')
  }

  async dev(start: () => void): Promise<void> {
    if (this._config.fileConfig === null) {
      return
    }

    if (this._config.isMain) {
      //region isMain
      const sources = path.join(
        path.resolve(path.dirname(this._config.fileConfig.src)),
        '**',
        '*.{js,ts,tsx}',
      )
      const watcher = chokidar.watch([
        sources,
        ...getDeps(path.resolve(this._config.fileConfig.src)),
      ])

      watcher.on('ready', () => {
        watcher.on(
          'all',
          debounce(
            async () => {
              await this._cancelBuilders()

              await this.build()

              start()

              await watcher.close()
              this.dev(start)
            },
            { wait: 200 },
          ),
        )
      })

      process.on('exit', async () => {
        await watcher.close()
      })
      //endregion
    } else if (this._config.isRenderer) {
      //region isRenderer
      _logger.end(
        'esbuild has been removed for the renderer, use `vite` instead. Check out the documentation for more information about vite in the renderer.',
      )
      //endregion
    }
  }

  private async _cancelBuilders() {
    await Promise.all(this._builders.map((builder) => builder.cancel()))
  }
}
