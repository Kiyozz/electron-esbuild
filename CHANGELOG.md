## Unreleased

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
