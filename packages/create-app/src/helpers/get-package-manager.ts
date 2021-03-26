/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

interface PackageManager {
  install: string
  add: string
  run: string
  flags: {
    exact: string
    dev: string
  }
}

function getName(pm: string): PackageManagerNames {
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

export default function getPackageManager(pm: string): PackageManager {
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
      install: '',
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
