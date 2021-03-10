/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

const glob = require('fast-glob')
const path = require('path')

module.exports = function getSources() {
  return glob(`${path.resolve(process.cwd(), 'src')}/**`)
}
