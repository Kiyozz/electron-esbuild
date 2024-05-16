/*
 * Copyright (c) 2024 Kiyozz.
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
