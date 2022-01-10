# electron-esbuild

[![electron-esbuild version](https://img.shields.io/npm/v/electron-esbuild.svg?label=%20)](./CHANGELOG.md)

## Getting Started

With npm:

    npm init @electron-esbuild/app

With yarn:

    yarn create @electron-esbuild/app

**All configurations are already setup for you.**

Start a development build

```shell
npm run dev
```

You can pass through extra arguments to the electron process.

i.e. use a custom debug port

```shell
npx electron-esbuild dev -- --inspect=xxxx
```

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
