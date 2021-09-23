import reactRefresh from '@vitejs/plugin-react-refresh'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    target: 'chrome94', // electron version target
  },
})
