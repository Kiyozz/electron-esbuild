const getSources = require('./get-sources.js')

/**
 *
 * @return {Promise<import('esbuild').BuildOptions>}
 */
module.exports = async function getConfig() {
  const files = await getSources()

  return {
    entryPoints: files,
    outdir: 'dist',
    platform: 'node',
    format: 'cjs',
    target: 'node10',
  }
}
