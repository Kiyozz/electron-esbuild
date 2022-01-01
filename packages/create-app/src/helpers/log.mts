/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import { bgLightRed, bgWhite, bgYellow, black } from 'kolorist'

export const log = (): string => bgWhite(black(' LOG '))

export const warn = (): string => bgYellow(black(' WARN '))

export const error = (): string => bgLightRed(black(' ERROR '))
