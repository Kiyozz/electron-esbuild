/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

export interface Builder {
  env: string
  hasInitialBuild: boolean

  build(): Promise<void>
  dev(start: () => void): void
}
