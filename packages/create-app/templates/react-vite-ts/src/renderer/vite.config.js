const { defineConfig } = require('vite')
const reactRefresh = require('@vitejs/plugin-react-refresh')

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [reactRefresh()],
  build: {
    target: 'chrome89',
  },
})
