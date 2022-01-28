/*
 * Copyright (c) 2022 Kiyozz.
 *
 * All rights reserved.
 */

let _startedAt: number | undefined

function zeros(value: number, fixed: number): string {
  const fixedValue = value.toFixed(fixed)

  if (value < 10) {
    return `00${fixedValue}`
  }

  if (value < 100) {
    return `0${fixedValue}`
  }

  return fixedValue
}

export function track(): string {
  if (typeof _startedAt === 'undefined') {
    _startedAt = Date.now()
  }

  const value = (Date.now() - _startedAt) / 1000

  return `[${zeros(value, 2)}]`
}
