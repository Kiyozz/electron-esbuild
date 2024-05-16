/*
 * Copyright (c) 2024 Kiyozz.
 *
 * All rights reserved.
 */

type PackageManager = {
  install: string
  add: string
  run: string
  flags: {
    exact: string
    dev: string
  }
}

const getName = (pm: string): PackageManagerNames => {
  switch (pm) {
    case 'npm':
    case 'yarn':
    case 'pnpm':
      return pm
    default:
      return 'unknown'
  }
}

export type PackageManagerNames = 'npm' | 'yarn' | 'pnpm' | 'unknown'

export const getPackageManager = (pm: string): PackageManager => {
  const packageManagers: Record<PackageManagerNames, PackageManager> = {
    npm: {
      install: 'i',
      add: 'i',
      run: 'run',
      flags: {
        exact: '-E',
        dev: '--save-dev',
      },
    },
    pnpm: {
      install: 'i',
      add: 'add',
      run: '',
      flags: {
        exact: '-E',
        dev: '-D',
      },
    },
    yarn: {
      install: '',
      add: 'add',
      run: '',
      flags: {
        exact: '--exact',
        dev: '--dev',
      },
    },
    unknown: {
      install: 'i',
      add: 'i',
      run: 'run',
      flags: {
        exact: '-E',
        dev: '-D',
      },
    },
  }

  const name = getName(pm)

  return packageManagers[name]
}
