/*
 * Copyright (c) 2022 Kiyozz.
 *
 * All rights reserved.
 */

import { bgLightRed, bgWhite, bgYellow, black } from 'kolorist'

export const log = (): string => bgWhite(black(' LOG '))

export const warn = (): string => bgYellow(black(' WARN '))

export const error = (): string => bgLightRed(black(' ERROR '))
