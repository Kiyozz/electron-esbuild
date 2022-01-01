/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { sync as spawnSync } from 'cross-spawn'
import { SpawnSyncReturns } from 'node:child_process'

export const initializeGit = (folder: string): SpawnSyncReturns<Buffer> => {
  return spawnSync('git', ['init'], { cwd: folder })
}
