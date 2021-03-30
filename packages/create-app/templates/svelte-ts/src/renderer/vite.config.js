const svelte = require('@sveltejs/vite-plugin-svelte')
const { defineConfig } = require('vite')
const sveltePreprocess = require('svelte-preprocess')

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [svelte({ preprocess: sveltePreprocess() })],
  build: {
    target: 'chrome89',
  },
})
