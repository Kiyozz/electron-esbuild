/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

import * as fs from 'node:fs/promises'

export async function readJsonFromFile<T = unknown>(file: string): Promise<T> {
  return JSON.parse((await fs.readFile(file)).toString())
}
