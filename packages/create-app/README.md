# @electron-esbuild/create-app

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Kiyozz/electron-esbuild/blob/HEAD/LICENSE)
[![@electron-esbuild/create-app version](https://img.shields.io/npm/v/@electron-esbuild/create-app.svg)](./CHANGELOG.md)

The easiest way to get started with Esbuild/Vite in Electron by using `@electron-esbuild/create-app`. This simple CLI tool enables you to quickly start building a new Electron application.

With pnpm:

    pnpm create @electron-esbuild/app

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
- `react-vite`
- `react-vite-ts`
- `svelte`
- `svelte-ts`
