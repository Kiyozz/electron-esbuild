# electron-esbuild

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Kiyozz/electron-esbuild/blob/HEAD/LICENSE)
[![electron-esbuild version](https://img.shields.io/npm/v/electron-esbuild.svg?label=%20)](./CHANGELOG.md)

## Getting Started

With pnpm:

    pnpm init @electron-esbuild/app

With npm:

    npm init @electron-esbuild/app

With yarn:

    yarn create @electron-esbuild/app

**All configurations are already setup for you.**

Start a development build

```shell
npm run dev
```

All arguments after `--` will be pass through the electron process.

```shell
electron-esbuild dev -- --remote-debugging-port
```

- `--remote-debugging-port=9229` will start the devtools to the port 9229
- `--remote-debugging-port` will start the devtools to a free port
- `--inspect=9230` will start the inspector to the port 9230
- `--inspect` will start the inspector to a free port

Create a build

```shell
npm run build
```

```shell
npm run build -- --no-clean # do not clean output before build
```

Package the app

```shell
npm run package
```

## Development

Refer to [README](../../README.md)
