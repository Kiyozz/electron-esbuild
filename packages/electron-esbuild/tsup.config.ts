import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    clean: true,
    entry: ['src'],
    dts: options.dts,
    splitting: true,
    sourcemap: true,
    bundle: false,
  }
})
