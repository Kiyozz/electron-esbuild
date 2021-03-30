# @electron-esbuild/create-app

[![@electron-esbuild/create-app version](https://img.shields.io/npm/v/@electron-esbuild/create-app.svg)](./CHANGELOG.md)

The easiest way to get started with Esbuild/Webpack/Vite in Electron by using `@electron-esbuild/create-app`. This simple CLI tool enables you to quickly start building a new Electron application.

With npm:

    npm init @electron-esbuild/app

With yarn:

    yarn create @electron-esbuild/app

## Options

`@electron-esbuild/create-app` comes with the following options:

- -t, --template use template
- -p, --package-manager use this package manager [npm, pnpm, yarn]
- -o, --override remove existing output folder
- --version prints version
- --help show help

## Supported templates

- `main`
- `main-ts`
- `react`
- `react-ts`
- `react-ts-webpack`
- `react-vite`
- `react-vite-ts`
- `svelte`
- `svelte-ts`
