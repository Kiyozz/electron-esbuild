/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

const startedAt = Date.now()

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
  const value = (Date.now() - startedAt) / 1000

  return `[${zeros(value, 2)}]`
}
