/*
 * Copyright (c) 2021 Kiyozz.
 *
 * All rights reserved.
 */

const [, , action = null] = process.argv

const actions = ['dev', 'build']
const actionsString = actions.map((a) => `"${a}"`).join(', ')

if (action === null || !actions.includes(action)) {
  if (action === null) {
    console.log(`no actions provided. ${actionsString} available`)
  } else {
    console.log(`action '${action}' provided but only ${actionsString} are available`)
  }

  process.exit(1)
}

require(`./commands/${action}.js`)
