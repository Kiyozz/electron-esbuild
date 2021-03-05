# electron-esbuild

Easily integrate esbuild for your Electron environment.

## Features

- Use of `esbuild` for main source code building
- Use of `esbuild` or `webpack` for renderer source code building
- HMR for `renderer` and `main` processes
- Full control of your esbuild configuration
- Full control of your webpack configuration
- Use electron-builder for final package

## Use

```shell
npm i -D electron-esbuild
```

Start a development build ([example](examples/react-typescript))
```shell
npx electron-esbuild dev
```

Create a build ([example](examples/react-typescript))
```shell
npx electron-esbuild build
```

```shell
npx electron-esbuild build --no-clean # do not clean output before build
```

Package the app ([example](examples/react-typescript))
```shell
npx electron-builder
```

## Quick start

You can use this [example](examples/react-typescript-webpack) for a starter React with TypeScript

## Configuration

Create a electron-esbuild configuration [electron-esbuild.config.yaml](examples/react-typescript/electron-esbuild.config.yaml)

```yaml
mainConfig:
  type: esbuild # currently, only esbuild is supported for mainConfig
  path: esbuild.main.config.js
  src: src/main/main.ts
  output: dist/main
rendererConfig:
  type: esbuild # 'webpack' for using webpack in renderer, see examples/react-typescript-webpack
  path: esbuild.renderer.config.js
  html: src/renderer/index.html
  src: src/renderer/index.tsx
  output: dist/renderer
```

### Main esbuild config

See [example](examples/react-typescript/esbuild.main.config.js)

```js
const path = require('path')

/**
 * @param {Partial<import('esbuild').BuildOptions>} merge
 *
 * @return {import('esbuild').BuildOptions}
 */
module.exports = (merge) => ({
  platform: 'node',
  entryPoints: [path.resolve('src/main/main.ts')],
  bundle: true,
  target: 'node14.16.0', // electron version target
  loader: {
    '.ts': 'ts',
  },
  ...merge,
})
```

### Renderer esbuild configuration

See [example](examples/react-typescript/esbuild.renderer.config.js)

```js
const path = require('path')

/**
 * @param {Partial<import('esbuild').BuildOptions>} merge
 *
 * @return {import('esbuild').BuildOptions}
 */
module.exports = (merge) => ({
  platform: 'browser',
  entryPoints: [path.resolve('src/renderer/index.tsx')],
  bundle: true,
  target: 'chrome89', // electron version target
  loader: {
    '.ts': 'ts',
    '.tsx': 'tsx',
    '.css': 'css',
  },
  ...merge,
})
```
