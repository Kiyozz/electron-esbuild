/*
 * Copyright (c) 2022 Kiyozz.
 *
 * All rights reserved.
 */

export type Package = {
  name: string
  build: {
    productName: string
    extraMetadata: Record<string, unknown>
  }
}
