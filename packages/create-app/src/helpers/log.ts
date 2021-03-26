/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { bgLightRed, bgWhite, bgYellow, black } from 'kolorist'

export function log(): string {
  return bgWhite(black(' LOG '))
}

export function warn(): string {
  return bgYellow(black(' WARN '))
}

export function error(): string {
  return bgLightRed(black(' ERROR '))
}
