# electron-esbuild

Easily integrate esbuild for your Electron environment.

## Features

- Use of `esbuild` for main source code building
- Use of `webpack` for renderer source code building
- HMR for `renderer` and `main` processes
- Full control of your webpack configuration
- Full control of your esbuild configuration
- Use electron-builder for final package

## Use

```shell
npm i -D electron-esbuild
```

Start a development build ([example](examples/react-typescript-webpack))
```shell
npx electron-esbuild dev
```

Create a build ([example](examples/react-typescript-webpack))
```shell
npx electron-esbuild build
```

```shell
npx electron-esbuild build --no-clean # do not clean output before build
```

Package the app ([example](examples/react-typescript-webpack))
```shell
npx electron-builder -p=never
```

## Quick start

You can use this [example](examples/react-typescript-webpack) for a starter React with TypeScript

## Configuration

Create a electron-esbuild configuration [electron-esbuild.config.yaml](examples/react-typescript-webpack/electron-esbuild.config.yaml)

```yaml
# paths relative to current working directory

esbuildMainConfig: esbuild.config.js # path to your esbuild configuration
webpackRendererConfig: webpack.config.js # path to your webpack configuration
```

### Main esbuild config

See [example](examples/react-typescript-webpack/esbuild.config.js)

```js
// esbuild.config.js
const path = require('path')

/**
 * @param {Partial<import('esbuild').BuildOptions>} merge configuration added by electron-esbuild
 *
 * @return {import('esbuild').BuildOptions}
 */
module.exports = (merge) => { // electron-esbuild expects a function from esbuild configuration
  // merge object contains production/development configuration added by electron-esbuild
  // electron-esbuild overrides NODE_ENV when using `dev` or `build` command
  const isProduction = process.env.NODE_ENV === 'production'

  return {
    platform: 'node',
    entryPoints: [path.resolve('src/main/main.ts')], // Path to your main file
    bundle: true,
    target: 'node12.18.4', // electron version target
    loader: {
      '.ts': 'ts', // Default loader for TypeScript project
    },
    sourcemap: false,
    define: {
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    },
    ...merge,
  }
}
```

### Renderer webpack configuration

See [example](examples/react-typescript-webpack/webpack.config.js)

This example use HMR/Hot reload in the renderer process in development!
