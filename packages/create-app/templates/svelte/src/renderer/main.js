import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
  props: {
    name: 'toto',
  },
})

export default app
