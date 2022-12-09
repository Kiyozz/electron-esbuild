import { BuildOptions } from 'esbuild'
import * as path from 'path'

const config: BuildOptions = {
  platform: 'browser',
  entryPoints: [
    path.resolve('src/renderer/index.tsx'),
    path.resolve('src/renderer/index.css'),
  ],
  bundle: true,
  target: 'chrome108', // electron version target
}

export default config
