import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'chrome124', // electron version target
  },
  server: {
    port: 9080,
  },
})
