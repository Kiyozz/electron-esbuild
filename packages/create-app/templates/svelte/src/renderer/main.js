import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
  props: {
    name: 'World',
  },
})

export default app
