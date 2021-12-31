/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { SpawnSyncReturns } from 'child_process'
import spawn from 'cross-spawn'

export function initializeGit(folder: string): SpawnSyncReturns<Buffer> {
  return spawn.sync('git', ['init'], { cwd: folder })
}
