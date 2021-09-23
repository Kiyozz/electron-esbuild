import path from 'path'

/** @var {Partial<import('esbuild').BuildOptions>} */
export default {
  platform: 'node',
  entryPoints: [path.resolve('src/main/main.js')],
  bundle: true,
  target: 'node16.5.0', // electron version target
}
