# Create Electron Esbuild App

[![create-electron-esbuild-app version](https://img.shields.io/npm/v/create-electron-esbuild-app.svg?label=%20)](./CHANGELOG.md)

The easiest way to get started with Esbuild/Webpack in Electron by using `create-electron-esbuild-app`. This simple CLI tool enables you to quickly start building a new Electron application.

    npx create-electron-esbuild-app --name my-app

## Options

`create-electron-esbuild-app` comes with the following options:

- --name [name] - Name of your application (required)
- --template [main-only-javascript,main-only-typescript,react-typescript,react-javascript,react-typescript-webpack] - An name of template to use
- --package-manager [npm,yarn,pnpm] - Package manager to use when installing dependencies
- --no-install - Do not install dependencies, You'll have to manually set version of dependencies
