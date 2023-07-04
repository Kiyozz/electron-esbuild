## 8.0.0

### Breaking Changes

- require node@18.15.0 to be synchronized with electron@25.0.0
- support for esbuild@0.18 ([#53](https://github.com/Kiyozz/electron-esbuild/pull/53), thanks to [@jonluca](https://github.com/jonluca))

## v4.0.1

### Breaking Changes

- templates updated for vite@4

### Bug fixes

- Fixed templates with the latest version of electron-esbuild

## v3.0.0

**react-ts-webpack** template removed.

## v2.0.3

**react-ts-webpack** template deprecated. Will be removed in v3.

### Changes

- Update templates

## v2.0.2

### Bug fixes

- Fix react, react-ts template with css files (#35)

## v2.0.1

### Bug fixes

- Fix: dirname

## v2.0.0

### Breaking changes

- Require Node.js 14
- This package is now pure ESM (because @electron-esbuild/create-app is mainly a cli, this should work out of the box).
  Please [read this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

### Changes

- Update templates

## v1.8.1

### Bug fixes

- Fix react-ts-webpack template.

## v1.8.0

### Features

- Update dependencies
- Update templates

## v1.7.0

### Features

- Updated dependencies
- Updated templates to reflect new version of electron-esbuild

## v1.6.1

### Bug fixes

- Invalid esbuild loader for `svelte-ts` template

## v1.6.0

### Features

- New template `svelte-ts` using [vite](https://github.com/vitejs/vite)
- New template `react-vite` using [vite](https://github.com/vitejs/vite)
- New template `react-vite-ts` using [vite](https://github.com/vitejs/vite)

## v1.5.0

### Features

- New template `svelte` using [vite](https://github.com/vitejs/vite)

## v1.4.2

### Bug fixes

- Fix -p flag

## v1.4.1

### Features

- Cli is now interactive
- Dependencies are now longer preinstalled

## v1.3.1

### Bug fixes

- Fixes electron-builder config in main-only-typescript, main-only-javascript templates

## v1.3.0

### Features

- Add main-only-typescript template
- Add main-only-javascript template

### Bug fixes

- react-typescript-webpack template was missing webpack-dev-server

## v1.2.1

### Bug fixes

- Missing esbuild in devDependencies

## v1.2.0

### Bug fixes

- Update for new esbuild config format
