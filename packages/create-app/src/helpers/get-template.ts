/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

import path from 'path'

export default function getTemplate(template: string): string {
  return path.resolve(__dirname, '../templates', template)
}
