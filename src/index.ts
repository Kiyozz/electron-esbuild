const [, , action = null] = process.argv

const actions = ['dev', 'build']

if (action === null || !actions.includes(action)) {
  if (action === null) {
    console.log('no actions provided. `dev`, `build` available')
  } else {
    console.log(`action '${action}' provided but only ${actions.map((a) => `"${a}"`).join(', ')} are available`)
  }

  process.exit(1)
}

require(`./commands/${action}.js`)
