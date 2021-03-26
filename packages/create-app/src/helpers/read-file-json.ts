/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { promises as fs } from 'fs'

export default async function readFileJson<T = unknown>(file: string): Promise<T> {
  return JSON.parse((await fs.readFile(file)).toString())
}
