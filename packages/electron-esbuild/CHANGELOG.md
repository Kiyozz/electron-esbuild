## Unreleased

### Features

- Expose main process debug port at 9223 (--inspect)
- Expose renderer process debug port at 9222 (--remote-debugging-port)

### Bug fixes

- Remove COEP headers in esbuild development server (@josteph), closed by #17

## v1.4.1

### Bug fixes

- The Electron process should now be killed when an error appears when starting the application

## v1.4.0

### Features

- Use vite in the renderer!

  Vite is available in the `svelte`, `svelte-ts`, `react-vite`, `react-vite-ts` templates when using `npm init @electron-esbuild/app`.

## v1.3.1

### Dependencies

- bump esbuild peerDependencies from ^0.10.0 to 0.x

## v1.3.0

### Features

- Add ability to use electron-esbuild without a renderer

## v1.2.5

### Dependencies

- Upgrade to esbuild v0.10.0

## v1.2.4

### Bug fixes

- Fix `cannot find module 'webpack'`

## v1.2.3

### Bug fixes

- v1.2.2 fix was incomplete

## v1.2.2

### Bug fixes

- Using webpack, plugins/minimizer classes instance was discarded and cause webpack to fail

## v1.2.1

### Features

- If you're using webpack for the renderer, and your configuration file was invalid, the error was silenced.

## v1.2.0

### Bug fixes

- NODE_ENV was not set in the user configuration

### Breaking changes

**Users configuration file is no longer a function**

You need to export an object from your esbuild configuration or your webpack configuration

From

```javascript
module.exports = (merge) => ({
  ...yourConfig,
  ...merge,
})
```

To

```javascript
module.exports = {
  ...yourConfig,
}
```

## v1.1.6

### Bug fixes

- NODE_ENV was not set to `production` during a build
