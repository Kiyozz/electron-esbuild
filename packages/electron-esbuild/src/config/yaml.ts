import type { ItemConfig } from './config'
import { TypeConfig } from './enums'

export interface YamlItem {
  type: TypeConfig
  path: string
  src: string
  output: string
  html?: string
}

export interface YamlSkeleton {
  mainConfig: YamlItem
  rendererConfig: YamlItem | null
}

export class Yaml {
  readonly main: ItemConfig
  readonly renderer: ItemConfig | null

  constructor({
    main,
    renderer,
  }: {
    main: ItemConfig
    renderer: ItemConfig | null
  }) {
    this.main = main
    this.renderer = renderer
  }
}
