#!/usr/bin/env node
var __create = Object.create
var __defProp = Object.defineProperty
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __getOwnPropNames = Object.getOwnPropertyNames
var __getProtoOf = Object.getPrototypeOf
var __hasOwnProp = Object.prototype.hasOwnProperty
var __markAsModule = (target) =>
  __defProp(target, '__esModule', { value: true })
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    )
  }
var __reExport = (target, module2, copyDefault, desc) => {
  if (
    (module2 && typeof module2 === 'object') ||
    typeof module2 === 'function'
  ) {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== 'default'))
        __defProp(target, key, {
          get: () => module2[key],
          enumerable:
            !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable,
        })
  }
  return target
}
var __toESM = (module2, isNodeMode) => {
  return __reExport(
    __markAsModule(
      __defProp(
        module2 != null ? __create(__getProtoOf(module2)) : {},
        'default',
        !isNodeMode && module2 && module2.__esModule
          ? { get: () => module2.default, enumerable: true }
          : { value: module2, enumerable: true },
      ),
    ),
    module2,
  )
}

// ../../node_modules/.pnpm/minimist@1.2.5/node_modules/minimist/index.js
var require_minimist = __commonJS({
  '../../node_modules/.pnpm/minimist@1.2.5/node_modules/minimist/index.js'(
    exports,
    module2,
  ) {
    module2.exports = function (args, opts) {
      if (!opts) opts = {}
      var flags = { bools: {}, strings: {}, unknownFn: null }
      if (typeof opts['unknown'] === 'function') {
        flags.unknownFn = opts['unknown']
      }
      if (typeof opts['boolean'] === 'boolean' && opts['boolean']) {
        flags.allBools = true
      } else {
        ;[]
          .concat(opts['boolean'])
          .filter(Boolean)
          .forEach(function (key2) {
            flags.bools[key2] = true
          })
      }
      var aliases = {}
      Object.keys(opts.alias || {}).forEach(function (key2) {
        aliases[key2] = [].concat(opts.alias[key2])
        aliases[key2].forEach(function (x) {
          aliases[x] = [key2].concat(
            aliases[key2].filter(function (y) {
              return x !== y
            }),
          )
        })
      })
      ;[]
        .concat(opts.string)
        .filter(Boolean)
        .forEach(function (key2) {
          flags.strings[key2] = true
          if (aliases[key2]) {
            flags.strings[aliases[key2]] = true
          }
        })
      var defaults = opts['default'] || {}
      var argv2 = { _: [] }
      Object.keys(flags.bools).forEach(function (key2) {
        setArg(key2, defaults[key2] === void 0 ? false : defaults[key2])
      })
      var notFlags = []
      if (args.indexOf('--') !== -1) {
        notFlags = args.slice(args.indexOf('--') + 1)
        args = args.slice(0, args.indexOf('--'))
      }
      function argDefined(key2, arg2) {
        return (
          (flags.allBools && /^--[^=]+$/.test(arg2)) ||
          flags.strings[key2] ||
          flags.bools[key2] ||
          aliases[key2]
        )
      }
      function setArg(key2, val, arg2) {
        if (arg2 && flags.unknownFn && !argDefined(key2, arg2)) {
          if (flags.unknownFn(arg2) === false) return
        }
        var value2 = !flags.strings[key2] && isNumber(val) ? Number(val) : val
        setKey(argv2, key2.split('.'), value2)
        ;(aliases[key2] || []).forEach(function (x) {
          setKey(argv2, x.split('.'), value2)
        })
      }
      function setKey(obj, keys, value2) {
        var o = obj
        for (var i2 = 0; i2 < keys.length - 1; i2++) {
          var key2 = keys[i2]
          if (key2 === '__proto__') return
          if (o[key2] === void 0) o[key2] = {}
          if (
            o[key2] === Object.prototype ||
            o[key2] === Number.prototype ||
            o[key2] === String.prototype
          )
            o[key2] = {}
          if (o[key2] === Array.prototype) o[key2] = []
          o = o[key2]
        }
        var key2 = keys[keys.length - 1]
        if (key2 === '__proto__') return
        if (
          o === Object.prototype ||
          o === Number.prototype ||
          o === String.prototype
        )
          o = {}
        if (o === Array.prototype) o = []
        if (
          o[key2] === void 0 ||
          flags.bools[key2] ||
          typeof o[key2] === 'boolean'
        ) {
          o[key2] = value2
        } else if (Array.isArray(o[key2])) {
          o[key2].push(value2)
        } else {
          o[key2] = [o[key2], value2]
        }
      }
      function aliasIsBoolean(key2) {
        return aliases[key2].some(function (x) {
          return flags.bools[x]
        })
      }
      for (var i = 0; i < args.length; i++) {
        var arg = args[i]
        if (/^--.+=/.test(arg)) {
          var m = arg.match(/^--([^=]+)=([\s\S]*)$/)
          var key = m[1]
          var value = m[2]
          if (flags.bools[key]) {
            value = value !== 'false'
          }
          setArg(key, value, arg)
        } else if (/^--no-.+/.test(arg)) {
          var key = arg.match(/^--no-(.+)/)[1]
          setArg(key, false, arg)
        } else if (/^--.+/.test(arg)) {
          var key = arg.match(/^--(.+)/)[1]
          var next = args[i + 1]
          if (
            next !== void 0 &&
            !/^-/.test(next) &&
            !flags.bools[key] &&
            !flags.allBools &&
            (aliases[key] ? !aliasIsBoolean(key) : true)
          ) {
            setArg(key, next, arg)
            i++
          } else if (/^(true|false)$/.test(next)) {
            setArg(key, next === 'true', arg)
            i++
          } else {
            setArg(key, flags.strings[key] ? '' : true, arg)
          }
        } else if (/^-[^-]+/.test(arg)) {
          var letters = arg.slice(1, -1).split('')
          var broken = false
          for (var j = 0; j < letters.length; j++) {
            var next = arg.slice(j + 2)
            if (next === '-') {
              setArg(letters[j], next, arg)
              continue
            }
            if (/[A-Za-z]/.test(letters[j]) && /=/.test(next)) {
              setArg(letters[j], next.split('=')[1], arg)
              broken = true
              break
            }
            if (
              /[A-Za-z]/.test(letters[j]) &&
              /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)
            ) {
              setArg(letters[j], next, arg)
              broken = true
              break
            }
            if (letters[j + 1] && letters[j + 1].match(/\W/)) {
              setArg(letters[j], arg.slice(j + 2), arg)
              broken = true
              break
            } else {
              setArg(letters[j], flags.strings[letters[j]] ? '' : true, arg)
            }
          }
          var key = arg.slice(-1)[0]
          if (!broken && key !== '-') {
            if (
              args[i + 1] &&
              !/^(-|--)[^-]/.test(args[i + 1]) &&
              !flags.bools[key] &&
              (aliases[key] ? !aliasIsBoolean(key) : true)
            ) {
              setArg(key, args[i + 1], arg)
              i++
            } else if (args[i + 1] && /^(true|false)$/.test(args[i + 1])) {
              setArg(key, args[i + 1] === 'true', arg)
              i++
            } else {
              setArg(key, flags.strings[key] ? '' : true, arg)
            }
          }
        } else {
          if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
            argv2._.push(
              flags.strings['_'] || !isNumber(arg) ? arg : Number(arg),
            )
          }
          if (opts.stopEarly) {
            argv2._.push.apply(argv2._, args.slice(i + 1))
            break
          }
        }
      }
      Object.keys(defaults).forEach(function (key2) {
        if (!hasKey(argv2, key2.split('.'))) {
          setKey(argv2, key2.split('.'), defaults[key2])
          ;(aliases[key2] || []).forEach(function (x) {
            setKey(argv2, x.split('.'), defaults[key2])
          })
        }
      })
      if (opts['--']) {
        argv2['--'] = new Array()
        notFlags.forEach(function (key2) {
          argv2['--'].push(key2)
        })
      } else {
        notFlags.forEach(function (key2) {
          argv2._.push(key2)
        })
      }
      return argv2
    }
    function hasKey(obj, keys) {
      var o = obj
      keys.slice(0, -1).forEach(function (key2) {
        o = o[key2] || {}
      })
      var key = keys[keys.length - 1]
      return key in o
    }
    function isNumber(x) {
      if (typeof x === 'number') return true
      if (/^0x[0-9a-f]+$/i.test(x)) return true
      return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x)
    }
  },
})

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js
var require_windows = __commonJS({
  '../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js'(
    exports,
    module2,
  ) {
    module2.exports = isexe
    isexe.sync = sync
    var fs2 = require('fs')
    function checkPathExt(path3, options3) {
      var pathext =
        options3.pathExt !== void 0 ? options3.pathExt : process.env.PATHEXT
      if (!pathext) {
        return true
      }
      pathext = pathext.split(';')
      if (pathext.indexOf('') !== -1) {
        return true
      }
      for (var i = 0; i < pathext.length; i++) {
        var p = pathext[i].toLowerCase()
        if (p && path3.substr(-p.length).toLowerCase() === p) {
          return true
        }
      }
      return false
    }
    function checkStat(stat, path3, options3) {
      if (!stat.isSymbolicLink() && !stat.isFile()) {
        return false
      }
      return checkPathExt(path3, options3)
    }
    function isexe(path3, options3, cb) {
      fs2.stat(path3, function (er, stat) {
        cb(er, er ? false : checkStat(stat, path3, options3))
      })
    }
    function sync(path3, options3) {
      return checkStat(fs2.statSync(path3), path3, options3)
    }
  },
})

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js
var require_mode = __commonJS({
  '../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js'(
    exports,
    module2,
  ) {
    module2.exports = isexe
    isexe.sync = sync
    var fs2 = require('fs')
    function isexe(path3, options3, cb) {
      fs2.stat(path3, function (er, stat) {
        cb(er, er ? false : checkStat(stat, options3))
      })
    }
    function sync(path3, options3) {
      return checkStat(fs2.statSync(path3), options3)
    }
    function checkStat(stat, options3) {
      return stat.isFile() && checkMode(stat, options3)
    }
    function checkMode(stat, options3) {
      var mod = stat.mode
      var uid = stat.uid
      var gid = stat.gid
      var myUid =
        options3.uid !== void 0
          ? options3.uid
          : process.getuid && process.getuid()
      var myGid =
        options3.gid !== void 0
          ? options3.gid
          : process.getgid && process.getgid()
      var u = parseInt('100', 8)
      var g = parseInt('010', 8)
      var o = parseInt('001', 8)
      var ug = u | g
      var ret =
        mod & o ||
        (mod & g && gid === myGid) ||
        (mod & u && uid === myUid) ||
        (mod & ug && myUid === 0)
      return ret
    }
  },
})

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js
var require_isexe = __commonJS({
  '../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js'(
    exports,
    module2,
  ) {
    var fs2 = require('fs')
    var core
    if (process.platform === 'win32' || global.TESTING_WINDOWS) {
      core = require_windows()
    } else {
      core = require_mode()
    }
    module2.exports = isexe
    isexe.sync = sync
    function isexe(path3, options3, cb) {
      if (typeof options3 === 'function') {
        cb = options3
        options3 = {}
      }
      if (!cb) {
        if (typeof Promise !== 'function') {
          throw new TypeError('callback not provided')
        }
        return new Promise(function (resolve, reject) {
          isexe(path3, options3 || {}, function (er, is) {
            if (er) {
              reject(er)
            } else {
              resolve(is)
            }
          })
        })
      }
      core(path3, options3 || {}, function (er, is) {
        if (er) {
          if (er.code === 'EACCES' || (options3 && options3.ignoreErrors)) {
            er = null
            is = false
          }
        }
        cb(er, is)
      })
    }
    function sync(path3, options3) {
      try {
        return core.sync(path3, options3 || {})
      } catch (er) {
        if ((options3 && options3.ignoreErrors) || er.code === 'EACCES') {
          return false
        } else {
          throw er
        }
      }
    }
  },
})

// ../../node_modules/.pnpm/which@2.0.2/node_modules/which/which.js
var require_which = __commonJS({
  '../../node_modules/.pnpm/which@2.0.2/node_modules/which/which.js'(
    exports,
    module2,
  ) {
    var isWindows =
      process.platform === 'win32' ||
      process.env.OSTYPE === 'cygwin' ||
      process.env.OSTYPE === 'msys'
    var path3 = require('path')
    var COLON = isWindows ? ';' : ':'
    var isexe = require_isexe()
    var getNotFoundError = (cmd) =>
      Object.assign(new Error(`not found: ${cmd}`), { code: 'ENOENT' })
    var getPathInfo = (cmd, opt) => {
      const colon = opt.colon || COLON
      const pathEnv =
        cmd.match(/\//) || (isWindows && cmd.match(/\\/))
          ? ['']
          : [
              ...(isWindows ? [process.cwd()] : []),
              ...(opt.path || process.env.PATH || '').split(colon),
            ]
      const pathExtExe = isWindows
        ? opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM'
        : ''
      const pathExt = isWindows ? pathExtExe.split(colon) : ['']
      if (isWindows) {
        if (cmd.indexOf('.') !== -1 && pathExt[0] !== '') pathExt.unshift('')
      }
      return {
        pathEnv,
        pathExt,
        pathExtExe,
      }
    }
    var which = (cmd, opt, cb) => {
      if (typeof opt === 'function') {
        cb = opt
        opt = {}
      }
      if (!opt) opt = {}
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt)
      const found = []
      const step = (i) =>
        new Promise((resolve, reject) => {
          if (i === pathEnv.length)
            return opt.all && found.length
              ? resolve(found)
              : reject(getNotFoundError(cmd))
          const ppRaw = pathEnv[i]
          const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw
          const pCmd = path3.join(pathPart, cmd)
          const p =
            !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd
          resolve(subStep(p, i, 0))
        })
      const subStep = (p, i, ii) =>
        new Promise((resolve, reject) => {
          if (ii === pathExt.length) return resolve(step(i + 1))
          const ext = pathExt[ii]
          isexe(p + ext, { pathExt: pathExtExe }, (er, is) => {
            if (!er && is) {
              if (opt.all) found.push(p + ext)
              else return resolve(p + ext)
            }
            return resolve(subStep(p, i, ii + 1))
          })
        })
      return cb ? step(0).then((res) => cb(null, res), cb) : step(0)
    }
    var whichSync = (cmd, opt) => {
      opt = opt || {}
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt)
      const found = []
      for (let i = 0; i < pathEnv.length; i++) {
        const ppRaw = pathEnv[i]
        const pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw
        const pCmd = path3.join(pathPart, cmd)
        const p =
          !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd
        for (let j = 0; j < pathExt.length; j++) {
          const cur = p + pathExt[j]
          try {
            const is = isexe.sync(cur, { pathExt: pathExtExe })
            if (is) {
              if (opt.all) found.push(cur)
              else return cur
            }
          } catch (ex) {}
        }
      }
      if (opt.all && found.length) return found
      if (opt.nothrow) return null
      throw getNotFoundError(cmd)
    }
    module2.exports = which
    which.sync = whichSync
  },
})

// ../../node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js
var require_path_key = __commonJS({
  '../../node_modules/.pnpm/path-key@3.1.1/node_modules/path-key/index.js'(
    exports,
    module2,
  ) {
    'use strict'
    var pathKey = (options3 = {}) => {
      const environment = options3.env || process.env
      const platform2 = options3.platform || process.platform
      if (platform2 !== 'win32') {
        return 'PATH'
      }
      return (
        Object.keys(environment)
          .reverse()
          .find((key) => key.toUpperCase() === 'PATH') || 'Path'
      )
    }
    module2.exports = pathKey
    module2.exports.default = pathKey
  },
})

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = __commonJS({
  '../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/resolveCommand.js'(
    exports,
    module2,
  ) {
    'use strict'
    var path3 = require('path')
    var which = require_which()
    var getPathKey = require_path_key()
    function resolveCommandAttempt(parsed, withoutPathExt) {
      const env = parsed.options.env || process.env
      const cwd = process.cwd()
      const hasCustomCwd = parsed.options.cwd != null
      const shouldSwitchCwd =
        hasCustomCwd && process.chdir !== void 0 && !process.chdir.disabled
      if (shouldSwitchCwd) {
        try {
          process.chdir(parsed.options.cwd)
        } catch (err) {}
      }
      let resolved
      try {
        resolved = which.sync(parsed.command, {
          path: env[getPathKey({ env })],
          pathExt: withoutPathExt ? path3.delimiter : void 0,
        })
      } catch (e) {
      } finally {
        if (shouldSwitchCwd) {
          process.chdir(cwd)
        }
      }
      if (resolved) {
        resolved = path3.resolve(
          hasCustomCwd ? parsed.options.cwd : '',
          resolved,
        )
      }
      return resolved
    }
    function resolveCommand(parsed) {
      return (
        resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true)
      )
    }
    module2.exports = resolveCommand
  },
})

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/escape.js
var require_escape = __commonJS({
  '../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/escape.js'(
    exports,
    module2,
  ) {
    'use strict'
    var metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g
    function escapeCommand(arg) {
      arg = arg.replace(metaCharsRegExp, '^$1')
      return arg
    }
    function escapeArgument(arg, doubleEscapeMetaChars) {
      arg = `${arg}`
      arg = arg.replace(/(\\*)"/g, '$1$1\\"')
      arg = arg.replace(/(\\*)$/, '$1$1')
      arg = `"${arg}"`
      arg = arg.replace(metaCharsRegExp, '^$1')
      if (doubleEscapeMetaChars) {
        arg = arg.replace(metaCharsRegExp, '^$1')
      }
      return arg
    }
    module2.exports.command = escapeCommand
    module2.exports.argument = escapeArgument
  },
})

// ../../node_modules/.pnpm/shebang-regex@3.0.0/node_modules/shebang-regex/index.js
var require_shebang_regex = __commonJS({
  '../../node_modules/.pnpm/shebang-regex@3.0.0/node_modules/shebang-regex/index.js'(
    exports,
    module2,
  ) {
    'use strict'
    module2.exports = /^#!(.*)/
  },
})

// ../../node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js
var require_shebang_command = __commonJS({
  '../../node_modules/.pnpm/shebang-command@2.0.0/node_modules/shebang-command/index.js'(
    exports,
    module2,
  ) {
    'use strict'
    var shebangRegex = require_shebang_regex()
    module2.exports = (string = '') => {
      const match = string.match(shebangRegex)
      if (!match) {
        return null
      }
      const [path3, argument] = match[0].replace(/#! ?/, '').split(' ')
      const binary = path3.split('/').pop()
      if (binary === 'env') {
        return argument
      }
      return argument ? `${binary} ${argument}` : binary
    }
  },
})

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = __commonJS({
  '../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/util/readShebang.js'(
    exports,
    module2,
  ) {
    'use strict'
    var fs2 = require('fs')
    var shebangCommand = require_shebang_command()
    function readShebang(command) {
      const size = 150
      const buffer = Buffer.alloc(size)
      let fd
      try {
        fd = fs2.openSync(command, 'r')
        fs2.readSync(fd, buffer, 0, size, 0)
        fs2.closeSync(fd)
      } catch (e) {}
      return shebangCommand(buffer.toString())
    }
    module2.exports = readShebang
  },
})

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/parse.js
var require_parse = __commonJS({
  '../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/parse.js'(
    exports,
    module2,
  ) {
    'use strict'
    var path3 = require('path')
    var resolveCommand = require_resolveCommand()
    var escape = require_escape()
    var readShebang = require_readShebang()
    var isWin = process.platform === 'win32'
    var isExecutableRegExp = /\.(?:com|exe)$/i
    var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i
    function detectShebang(parsed) {
      parsed.file = resolveCommand(parsed)
      const shebang = parsed.file && readShebang(parsed.file)
      if (shebang) {
        parsed.args.unshift(parsed.file)
        parsed.command = shebang
        return resolveCommand(parsed)
      }
      return parsed.file
    }
    function parseNonShell(parsed) {
      if (!isWin) {
        return parsed
      }
      const commandFile = detectShebang(parsed)
      const needsShell = !isExecutableRegExp.test(commandFile)
      if (parsed.options.forceShell || needsShell) {
        const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile)
        parsed.command = path3.normalize(parsed.command)
        parsed.command = escape.command(parsed.command)
        parsed.args = parsed.args.map((arg) =>
          escape.argument(arg, needsDoubleEscapeMetaChars),
        )
        const shellCommand = [parsed.command].concat(parsed.args).join(' ')
        parsed.args = ['/d', '/s', '/c', `"${shellCommand}"`]
        parsed.command = process.env.comspec || 'cmd.exe'
        parsed.options.windowsVerbatimArguments = true
      }
      return parsed
    }
    function parse(command, args, options3) {
      if (args && !Array.isArray(args)) {
        options3 = args
        args = null
      }
      args = args ? args.slice(0) : []
      options3 = Object.assign({}, options3)
      const parsed = {
        command,
        args,
        options: options3,
        file: void 0,
        original: {
          command,
          args,
        },
      }
      return options3.shell ? parsed : parseNonShell(parsed)
    }
    module2.exports = parse
  },
})

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/enoent.js
var require_enoent = __commonJS({
  '../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/lib/enoent.js'(
    exports,
    module2,
  ) {
    'use strict'
    var isWin = process.platform === 'win32'
    function notFoundError(original, syscall) {
      return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: 'ENOENT',
        errno: 'ENOENT',
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args,
      })
    }
    function hookChildProcess(cp, parsed) {
      if (!isWin) {
        return
      }
      const originalEmit = cp.emit
      cp.emit = function (name, arg1) {
        if (name === 'exit') {
          const err = verifyENOENT(arg1, parsed, 'spawn')
          if (err) {
            return originalEmit.call(cp, 'error', err)
          }
        }
        return originalEmit.apply(cp, arguments)
      }
    }
    function verifyENOENT(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, 'spawn')
      }
      return null
    }
    function verifyENOENTSync(status, parsed) {
      if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, 'spawnSync')
      }
      return null
    }
    module2.exports = {
      hookChildProcess,
      verifyENOENT,
      verifyENOENTSync,
      notFoundError,
    }
  },
})

// ../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/index.js
var require_cross_spawn = __commonJS({
  '../../node_modules/.pnpm/cross-spawn@7.0.3/node_modules/cross-spawn/index.js'(
    exports,
    module2,
  ) {
    'use strict'
    var cp = require('child_process')
    var parse = require_parse()
    var enoent = require_enoent()
    function spawn2(command, args, options3) {
      const parsed = parse(command, args, options3)
      const spawned = cp.spawn(parsed.command, parsed.args, parsed.options)
      enoent.hookChildProcess(spawned, parsed)
      return spawned
    }
    function spawnSync(command, args, options3) {
      const parsed = parse(command, args, options3)
      const result = cp.spawnSync(parsed.command, parsed.args, parsed.options)
      result.error =
        result.error || enoent.verifyENOENTSync(result.status, parsed)
      return result
    }
    module2.exports = spawn2
    module2.exports.spawn = spawn2
    module2.exports.sync = spawnSync
    module2.exports._parse = parse
    module2.exports._enoent = enoent
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/utils/array.js
var require_array = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/utils/array.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.splitWhen = exports.flatten = void 0
    function flatten(items) {
      return items.reduce((collection, item) => [].concat(collection, item), [])
    }
    exports.flatten = flatten
    function splitWhen(items, predicate) {
      const result = [[]]
      let groupIndex = 0
      for (const item of items) {
        if (predicate(item)) {
          groupIndex++
          result[groupIndex] = []
        } else {
          result[groupIndex].push(item)
        }
      }
      return result
    }
    exports.splitWhen = splitWhen
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/utils/errno.js
var require_errno = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/utils/errno.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.isEnoentCodeError = void 0
    function isEnoentCodeError(error) {
      return error.code === 'ENOENT'
    }
    exports.isEnoentCodeError = isEnoentCodeError
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/utils/fs.js
var require_fs = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/utils/fs.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.createDirentFromStats = void 0
    var DirentFromStats = class {
      constructor(name, stats) {
        this.name = name
        this.isBlockDevice = stats.isBlockDevice.bind(stats)
        this.isCharacterDevice = stats.isCharacterDevice.bind(stats)
        this.isDirectory = stats.isDirectory.bind(stats)
        this.isFIFO = stats.isFIFO.bind(stats)
        this.isFile = stats.isFile.bind(stats)
        this.isSocket = stats.isSocket.bind(stats)
        this.isSymbolicLink = stats.isSymbolicLink.bind(stats)
      }
    }
    function createDirentFromStats(name, stats) {
      return new DirentFromStats(name, stats)
    }
    exports.createDirentFromStats = createDirentFromStats
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/utils/path.js
var require_path = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/utils/path.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.removeLeadingDotSegment =
      exports.escape =
      exports.makeAbsolute =
      exports.unixify =
        void 0
    var path3 = require('path')
    var LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2
    var UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\())/g
    function unixify(filepath) {
      return filepath.replace(/\\/g, '/')
    }
    exports.unixify = unixify
    function makeAbsolute(cwd, filepath) {
      return path3.resolve(cwd, filepath)
    }
    exports.makeAbsolute = makeAbsolute
    function escape(pattern) {
      return pattern.replace(UNESCAPED_GLOB_SYMBOLS_RE, '\\$2')
    }
    exports.escape = escape
    function removeLeadingDotSegment(entry) {
      if (entry.charAt(0) === '.') {
        const secondCharactery = entry.charAt(1)
        if (secondCharactery === '/' || secondCharactery === '\\') {
          return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT)
        }
      }
      return entry
    }
    exports.removeLeadingDotSegment = removeLeadingDotSegment
  },
})

// ../../node_modules/.pnpm/is-extglob@2.1.1/node_modules/is-extglob/index.js
var require_is_extglob = __commonJS({
  '../../node_modules/.pnpm/is-extglob@2.1.1/node_modules/is-extglob/index.js'(
    exports,
    module2,
  ) {
    module2.exports = function isExtglob(str) {
      if (typeof str !== 'string' || str === '') {
        return false
      }
      var match
      while ((match = /(\\).|([@?!+*]\(.*\))/g.exec(str))) {
        if (match[2]) return true
        str = str.slice(match.index + match[0].length)
      }
      return false
    }
  },
})

// ../../node_modules/.pnpm/is-glob@4.0.3/node_modules/is-glob/index.js
var require_is_glob = __commonJS({
  '../../node_modules/.pnpm/is-glob@4.0.3/node_modules/is-glob/index.js'(
    exports,
    module2,
  ) {
    var isExtglob = require_is_extglob()
    var chars = { '{': '}', '(': ')', '[': ']' }
    var strictCheck = function (str) {
      if (str[0] === '!') {
        return true
      }
      var index = 0
      var pipeIndex = -2
      var closeSquareIndex = -2
      var closeCurlyIndex = -2
      var closeParenIndex = -2
      var backSlashIndex = -2
      while (index < str.length) {
        if (str[index] === '*') {
          return true
        }
        if (str[index + 1] === '?' && /[\].+)]/.test(str[index])) {
          return true
        }
        if (
          closeSquareIndex !== -1 &&
          str[index] === '[' &&
          str[index + 1] !== ']'
        ) {
          if (closeSquareIndex < index) {
            closeSquareIndex = str.indexOf(']', index)
          }
          if (closeSquareIndex > index) {
            if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
              return true
            }
            backSlashIndex = str.indexOf('\\', index)
            if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
              return true
            }
          }
        }
        if (
          closeCurlyIndex !== -1 &&
          str[index] === '{' &&
          str[index + 1] !== '}'
        ) {
          closeCurlyIndex = str.indexOf('}', index)
          if (closeCurlyIndex > index) {
            backSlashIndex = str.indexOf('\\', index)
            if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
              return true
            }
          }
        }
        if (
          closeParenIndex !== -1 &&
          str[index] === '(' &&
          str[index + 1] === '?' &&
          /[:!=]/.test(str[index + 2]) &&
          str[index + 3] !== ')'
        ) {
          closeParenIndex = str.indexOf(')', index)
          if (closeParenIndex > index) {
            backSlashIndex = str.indexOf('\\', index)
            if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
              return true
            }
          }
        }
        if (pipeIndex !== -1 && str[index] === '(' && str[index + 1] !== '|') {
          if (pipeIndex < index) {
            pipeIndex = str.indexOf('|', index)
          }
          if (pipeIndex !== -1 && str[pipeIndex + 1] !== ')') {
            closeParenIndex = str.indexOf(')', pipeIndex)
            if (closeParenIndex > pipeIndex) {
              backSlashIndex = str.indexOf('\\', pipeIndex)
              if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
                return true
              }
            }
          }
        }
        if (str[index] === '\\') {
          var open = str[index + 1]
          index += 2
          var close = chars[open]
          if (close) {
            var n = str.indexOf(close, index)
            if (n !== -1) {
              index = n + 1
            }
          }
          if (str[index] === '!') {
            return true
          }
        } else {
          index++
        }
      }
      return false
    }
    var relaxedCheck = function (str) {
      if (str[0] === '!') {
        return true
      }
      var index = 0
      while (index < str.length) {
        if (/[*?{}()[\]]/.test(str[index])) {
          return true
        }
        if (str[index] === '\\') {
          var open = str[index + 1]
          index += 2
          var close = chars[open]
          if (close) {
            var n = str.indexOf(close, index)
            if (n !== -1) {
              index = n + 1
            }
          }
          if (str[index] === '!') {
            return true
          }
        } else {
          index++
        }
      }
      return false
    }
    module2.exports = function isGlob(str, options3) {
      if (typeof str !== 'string' || str === '') {
        return false
      }
      if (isExtglob(str)) {
        return true
      }
      var check = strictCheck
      if (options3 && options3.strict === false) {
        check = relaxedCheck
      }
      return check(str)
    }
  },
})

// ../../node_modules/.pnpm/glob-parent@5.1.2/node_modules/glob-parent/index.js
var require_glob_parent = __commonJS({
  '../../node_modules/.pnpm/glob-parent@5.1.2/node_modules/glob-parent/index.js'(
    exports,
    module2,
  ) {
    'use strict'
    var isGlob = require_is_glob()
    var pathPosixDirname = require('path').posix.dirname
    var isWin32 = require('os').platform() === 'win32'
    var slash = '/'
    var backslash = /\\/g
    var enclosure = /[\{\[].*[\}\]]$/
    var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/
    var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g
    module2.exports = function globParent(str, opts) {
      var options3 = Object.assign({ flipBackslashes: true }, opts)
      if (options3.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
        str = str.replace(backslash, slash)
      }
      if (enclosure.test(str)) {
        str += slash
      }
      str += 'a'
      do {
        str = pathPosixDirname(str)
      } while (isGlob(str) || globby.test(str))
      return str.replace(escaped, '$1')
    }
  },
})

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/utils.js
var require_utils = __commonJS({
  '../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/utils.js'(
    exports,
  ) {
    'use strict'
    exports.isInteger = (num) => {
      if (typeof num === 'number') {
        return Number.isInteger(num)
      }
      if (typeof num === 'string' && num.trim() !== '') {
        return Number.isInteger(Number(num))
      }
      return false
    }
    exports.find = (node, type) =>
      node.nodes.find((node2) => node2.type === type)
    exports.exceedsLimit = (min, max, step = 1, limit) => {
      if (limit === false) return false
      if (!exports.isInteger(min) || !exports.isInteger(max)) return false
      return (Number(max) - Number(min)) / Number(step) >= limit
    }
    exports.escapeNode = (block, n = 0, type) => {
      let node = block.nodes[n]
      if (!node) return
      if (
        (type && node.type === type) ||
        node.type === 'open' ||
        node.type === 'close'
      ) {
        if (node.escaped !== true) {
          node.value = '\\' + node.value
          node.escaped = true
        }
      }
    }
    exports.encloseBrace = (node) => {
      if (node.type !== 'brace') return false
      if ((node.commas >> (0 + node.ranges)) >> 0 === 0) {
        node.invalid = true
        return true
      }
      return false
    }
    exports.isInvalidBrace = (block) => {
      if (block.type !== 'brace') return false
      if (block.invalid === true || block.dollar) return true
      if ((block.commas >> (0 + block.ranges)) >> 0 === 0) {
        block.invalid = true
        return true
      }
      if (block.open !== true || block.close !== true) {
        block.invalid = true
        return true
      }
      return false
    }
    exports.isOpenOrClose = (node) => {
      if (node.type === 'open' || node.type === 'close') {
        return true
      }
      return node.open === true || node.close === true
    }
    exports.reduce = (nodes) =>
      nodes.reduce((acc, node) => {
        if (node.type === 'text') acc.push(node.value)
        if (node.type === 'range') node.type = 'text'
        return acc
      }, [])
    exports.flatten = (...args) => {
      const result = []
      const flat = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          let ele = arr[i]
          Array.isArray(ele)
            ? flat(ele, result)
            : ele !== void 0 && result.push(ele)
        }
        return result
      }
      flat(args)
      return result
    }
  },
})

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/stringify.js
var require_stringify = __commonJS({
  '../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/stringify.js'(
    exports,
    module2,
  ) {
    'use strict'
    var utils = require_utils()
    module2.exports = (ast, options3 = {}) => {
      let stringify = (node, parent = {}) => {
        let invalidBlock =
          options3.escapeInvalid && utils.isInvalidBrace(parent)
        let invalidNode =
          node.invalid === true && options3.escapeInvalid === true
        let output = ''
        if (node.value) {
          if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
            return '\\' + node.value
          }
          return node.value
        }
        if (node.value) {
          return node.value
        }
        if (node.nodes) {
          for (let child of node.nodes) {
            output += stringify(child)
          }
        }
        return output
      }
      return stringify(ast)
    }
  },
})

// ../../node_modules/.pnpm/is-number@7.0.0/node_modules/is-number/index.js
var require_is_number = __commonJS({
  '../../node_modules/.pnpm/is-number@7.0.0/node_modules/is-number/index.js'(
    exports,
    module2,
  ) {
    'use strict'
    module2.exports = function (num) {
      if (typeof num === 'number') {
        return num - num === 0
      }
      if (typeof num === 'string' && num.trim() !== '') {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num)
      }
      return false
    }
  },
})

// ../../node_modules/.pnpm/to-regex-range@5.0.1/node_modules/to-regex-range/index.js
var require_to_regex_range = __commonJS({
  '../../node_modules/.pnpm/to-regex-range@5.0.1/node_modules/to-regex-range/index.js'(
    exports,
    module2,
  ) {
    'use strict'
    var isNumber = require_is_number()
    var toRegexRange = (min, max, options3) => {
      if (isNumber(min) === false) {
        throw new TypeError(
          'toRegexRange: expected the first argument to be a number',
        )
      }
      if (max === void 0 || min === max) {
        return String(min)
      }
      if (isNumber(max) === false) {
        throw new TypeError(
          'toRegexRange: expected the second argument to be a number.',
        )
      }
      let opts = { relaxZeros: true, ...options3 }
      if (typeof opts.strictZeros === 'boolean') {
        opts.relaxZeros = opts.strictZeros === false
      }
      let relax = String(opts.relaxZeros)
      let shorthand = String(opts.shorthand)
      let capture = String(opts.capture)
      let wrap = String(opts.wrap)
      let cacheKey = min + ':' + max + '=' + relax + shorthand + capture + wrap
      if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
        return toRegexRange.cache[cacheKey].result
      }
      let a = Math.min(min, max)
      let b = Math.max(min, max)
      if (Math.abs(a - b) === 1) {
        let result = min + '|' + max
        if (opts.capture) {
          return `(${result})`
        }
        if (opts.wrap === false) {
          return result
        }
        return `(?:${result})`
      }
      let isPadded = hasPadding(min) || hasPadding(max)
      let state = { min, max, a, b }
      let positives = []
      let negatives = []
      if (isPadded) {
        state.isPadded = isPadded
        state.maxLen = String(state.max).length
      }
      if (a < 0) {
        let newMin = b < 0 ? Math.abs(b) : 1
        negatives = splitToPatterns(newMin, Math.abs(a), state, opts)
        a = state.a = 0
      }
      if (b >= 0) {
        positives = splitToPatterns(a, b, state, opts)
      }
      state.negatives = negatives
      state.positives = positives
      state.result = collatePatterns(negatives, positives, opts)
      if (opts.capture === true) {
        state.result = `(${state.result})`
      } else if (
        opts.wrap !== false &&
        positives.length + negatives.length > 1
      ) {
        state.result = `(?:${state.result})`
      }
      toRegexRange.cache[cacheKey] = state
      return state.result
    }
    function collatePatterns(neg, pos, options3) {
      let onlyNegative = filterPatterns(neg, pos, '-', false, options3) || []
      let onlyPositive = filterPatterns(pos, neg, '', false, options3) || []
      let intersected = filterPatterns(neg, pos, '-?', true, options3) || []
      let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive)
      return subpatterns.join('|')
    }
    function splitToRanges(min, max) {
      let nines = 1
      let zeros = 1
      let stop = countNines(min, nines)
      let stops = /* @__PURE__ */ new Set([max])
      while (min <= stop && stop <= max) {
        stops.add(stop)
        nines += 1
        stop = countNines(min, nines)
      }
      stop = countZeros(max + 1, zeros) - 1
      while (min < stop && stop <= max) {
        stops.add(stop)
        zeros += 1
        stop = countZeros(max + 1, zeros) - 1
      }
      stops = [...stops]
      stops.sort(compare)
      return stops
    }
    function rangeToPattern(start, stop, options3) {
      if (start === stop) {
        return { pattern: start, count: [], digits: 0 }
      }
      let zipped = zip(start, stop)
      let digits = zipped.length
      let pattern = ''
      let count = 0
      for (let i = 0; i < digits; i++) {
        let [startDigit, stopDigit] = zipped[i]
        if (startDigit === stopDigit) {
          pattern += startDigit
        } else if (startDigit !== '0' || stopDigit !== '9') {
          pattern += toCharacterClass(startDigit, stopDigit, options3)
        } else {
          count++
        }
      }
      if (count) {
        pattern += options3.shorthand === true ? '\\d' : '[0-9]'
      }
      return { pattern, count: [count], digits }
    }
    function splitToPatterns(min, max, tok, options3) {
      let ranges = splitToRanges(min, max)
      let tokens = []
      let start = min
      let prev
      for (let i = 0; i < ranges.length; i++) {
        let max2 = ranges[i]
        let obj = rangeToPattern(String(start), String(max2), options3)
        let zeros = ''
        if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
          if (prev.count.length > 1) {
            prev.count.pop()
          }
          prev.count.push(obj.count[0])
          prev.string = prev.pattern + toQuantifier(prev.count)
          start = max2 + 1
          continue
        }
        if (tok.isPadded) {
          zeros = padZeros(max2, tok, options3)
        }
        obj.string = zeros + obj.pattern + toQuantifier(obj.count)
        tokens.push(obj)
        start = max2 + 1
        prev = obj
      }
      return tokens
    }
    function filterPatterns(arr, comparison, prefix, intersection, options3) {
      let result = []
      for (let ele of arr) {
        let { string } = ele
        if (!intersection && !contains(comparison, 'string', string)) {
          result.push(prefix + string)
        }
        if (intersection && contains(comparison, 'string', string)) {
          result.push(prefix + string)
        }
      }
      return result
    }
    function zip(a, b) {
      let arr = []
      for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]])
      return arr
    }
    function compare(a, b) {
      return a > b ? 1 : b > a ? -1 : 0
    }
    function contains(arr, key, val) {
      return arr.some((ele) => ele[key] === val)
    }
    function countNines(min, len) {
      return Number(String(min).slice(0, -len) + '9'.repeat(len))
    }
    function countZeros(integer, zeros) {
      return integer - (integer % Math.pow(10, zeros))
    }
    function toQuantifier(digits) {
      let [start = 0, stop = ''] = digits
      if (stop || start > 1) {
        return `{${start + (stop ? ',' + stop : '')}}`
      }
      return ''
    }
    function toCharacterClass(a, b, options3) {
      return `[${a}${b - a === 1 ? '' : '-'}${b}]`
    }
    function hasPadding(str) {
      return /^-?(0+)\d/.test(str)
    }
    function padZeros(value, tok, options3) {
      if (!tok.isPadded) {
        return value
      }
      let diff = Math.abs(tok.maxLen - String(value).length)
      let relax = options3.relaxZeros !== false
      switch (diff) {
        case 0:
          return ''
        case 1:
          return relax ? '0?' : '0'
        case 2:
          return relax ? '0{0,2}' : '00'
        default: {
          return relax ? `0{0,${diff}}` : `0{${diff}}`
        }
      }
    }
    toRegexRange.cache = {}
    toRegexRange.clearCache = () => (toRegexRange.cache = {})
    module2.exports = toRegexRange
  },
})

// ../../node_modules/.pnpm/fill-range@7.0.1/node_modules/fill-range/index.js
var require_fill_range = __commonJS({
  '../../node_modules/.pnpm/fill-range@7.0.1/node_modules/fill-range/index.js'(
    exports,
    module2,
  ) {
    'use strict'
    var util = require('util')
    var toRegexRange = require_to_regex_range()
    var isObject = (val) =>
      val !== null && typeof val === 'object' && !Array.isArray(val)
    var transform = (toNumber) => {
      return (value) => (toNumber === true ? Number(value) : String(value))
    }
    var isValidValue = (value) => {
      return (
        typeof value === 'number' || (typeof value === 'string' && value !== '')
      )
    }
    var isNumber = (num) => Number.isInteger(+num)
    var zeros = (input) => {
      let value = `${input}`
      let index = -1
      if (value[0] === '-') value = value.slice(1)
      if (value === '0') return false
      while (value[++index] === '0');
      return index > 0
    }
    var stringify = (start, end, options3) => {
      if (typeof start === 'string' || typeof end === 'string') {
        return true
      }
      return options3.stringify === true
    }
    var pad = (input, maxLength, toNumber) => {
      if (maxLength > 0) {
        let dash = input[0] === '-' ? '-' : ''
        if (dash) input = input.slice(1)
        input = dash + input.padStart(dash ? maxLength - 1 : maxLength, '0')
      }
      if (toNumber === false) {
        return String(input)
      }
      return input
    }
    var toMaxLen = (input, maxLength) => {
      let negative = input[0] === '-' ? '-' : ''
      if (negative) {
        input = input.slice(1)
        maxLength--
      }
      while (input.length < maxLength) input = '0' + input
      return negative ? '-' + input : input
    }
    var toSequence = (parts, options3) => {
      parts.negatives.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
      parts.positives.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
      let prefix = options3.capture ? '' : '?:'
      let positives = ''
      let negatives = ''
      let result
      if (parts.positives.length) {
        positives = parts.positives.join('|')
      }
      if (parts.negatives.length) {
        negatives = `-(${prefix}${parts.negatives.join('|')})`
      }
      if (positives && negatives) {
        result = `${positives}|${negatives}`
      } else {
        result = positives || negatives
      }
      if (options3.wrap) {
        return `(${prefix}${result})`
      }
      return result
    }
    var toRange = (a, b, isNumbers, options3) => {
      if (isNumbers) {
        return toRegexRange(a, b, { wrap: false, ...options3 })
      }
      let start = String.fromCharCode(a)
      if (a === b) return start
      let stop = String.fromCharCode(b)
      return `[${start}-${stop}]`
    }
    var toRegex = (start, end, options3) => {
      if (Array.isArray(start)) {
        let wrap = options3.wrap === true
        let prefix = options3.capture ? '' : '?:'
        return wrap ? `(${prefix}${start.join('|')})` : start.join('|')
      }
      return toRegexRange(start, end, options3)
    }
    var rangeError = (...args) => {
      return new RangeError('Invalid range arguments: ' + util.inspect(...args))
    }
    var invalidRange = (start, end, options3) => {
      if (options3.strictRanges === true) throw rangeError([start, end])
      return []
    }
    var invalidStep = (step, options3) => {
      if (options3.strictRanges === true) {
        throw new TypeError(`Expected step "${step}" to be a number`)
      }
      return []
    }
    var fillNumbers = (start, end, step = 1, options3 = {}) => {
      let a = Number(start)
      let b = Number(end)
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        if (options3.strictRanges === true) throw rangeError([start, end])
        return []
      }
      if (a === 0) a = 0
      if (b === 0) b = 0
      let descending = a > b
      let startString = String(start)
      let endString = String(end)
      let stepString = String(step)
      step = Math.max(Math.abs(step), 1)
      let padded = zeros(startString) || zeros(endString) || zeros(stepString)
      let maxLen = padded
        ? Math.max(startString.length, endString.length, stepString.length)
        : 0
      let toNumber =
        padded === false && stringify(start, end, options3) === false
      let format2 = options3.transform || transform(toNumber)
      if (options3.toRegex && step === 1) {
        return toRange(
          toMaxLen(start, maxLen),
          toMaxLen(end, maxLen),
          true,
          options3,
        )
      }
      let parts = { negatives: [], positives: [] }
      let push = (num) =>
        parts[num < 0 ? 'negatives' : 'positives'].push(Math.abs(num))
      let range = []
      let index = 0
      while (descending ? a >= b : a <= b) {
        if (options3.toRegex === true && step > 1) {
          push(a)
        } else {
          range.push(pad(format2(a, index), maxLen, toNumber))
        }
        a = descending ? a - step : a + step
        index++
      }
      if (options3.toRegex === true) {
        return step > 1
          ? toSequence(parts, options3)
          : toRegex(range, null, { wrap: false, ...options3 })
      }
      return range
    }
    var fillLetters = (start, end, step = 1, options3 = {}) => {
      if (
        (!isNumber(start) && start.length > 1) ||
        (!isNumber(end) && end.length > 1)
      ) {
        return invalidRange(start, end, options3)
      }
      let format2 = options3.transform || ((val) => String.fromCharCode(val))
      let a = `${start}`.charCodeAt(0)
      let b = `${end}`.charCodeAt(0)
      let descending = a > b
      let min = Math.min(a, b)
      let max = Math.max(a, b)
      if (options3.toRegex && step === 1) {
        return toRange(min, max, false, options3)
      }
      let range = []
      let index = 0
      while (descending ? a >= b : a <= b) {
        range.push(format2(a, index))
        a = descending ? a - step : a + step
        index++
      }
      if (options3.toRegex === true) {
        return toRegex(range, null, { wrap: false, options: options3 })
      }
      return range
    }
    var fill = (start, end, step, options3 = {}) => {
      if (end == null && isValidValue(start)) {
        return [start]
      }
      if (!isValidValue(start) || !isValidValue(end)) {
        return invalidRange(start, end, options3)
      }
      if (typeof step === 'function') {
        return fill(start, end, 1, { transform: step })
      }
      if (isObject(step)) {
        return fill(start, end, 0, step)
      }
      let opts = { ...options3 }
      if (opts.capture === true) opts.wrap = true
      step = step || opts.step || 1
      if (!isNumber(step)) {
        if (step != null && !isObject(step)) return invalidStep(step, opts)
        return fill(start, end, 1, step)
      }
      if (isNumber(start) && isNumber(end)) {
        return fillNumbers(start, end, step, opts)
      }
      return fillLetters(start, end, Math.max(Math.abs(step), 1), opts)
    }
    module2.exports = fill
  },
})

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/compile.js
var require_compile = __commonJS({
  '../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/compile.js'(
    exports,
    module2,
  ) {
    'use strict'
    var fill = require_fill_range()
    var utils = require_utils()
    var compile = (ast, options3 = {}) => {
      let walk = (node, parent = {}) => {
        let invalidBlock = utils.isInvalidBrace(parent)
        let invalidNode =
          node.invalid === true && options3.escapeInvalid === true
        let invalid = invalidBlock === true || invalidNode === true
        let prefix = options3.escapeInvalid === true ? '\\' : ''
        let output = ''
        if (node.isOpen === true) {
          return prefix + node.value
        }
        if (node.isClose === true) {
          return prefix + node.value
        }
        if (node.type === 'open') {
          return invalid ? prefix + node.value : '('
        }
        if (node.type === 'close') {
          return invalid ? prefix + node.value : ')'
        }
        if (node.type === 'comma') {
          return node.prev.type === 'comma' ? '' : invalid ? node.value : '|'
        }
        if (node.value) {
          return node.value
        }
        if (node.nodes && node.ranges > 0) {
          let args = utils.reduce(node.nodes)
          let range = fill(...args, { ...options3, wrap: false, toRegex: true })
          if (range.length !== 0) {
            return args.length > 1 && range.length > 1 ? `(${range})` : range
          }
        }
        if (node.nodes) {
          for (let child of node.nodes) {
            output += walk(child, node)
          }
        }
        return output
      }
      return walk(ast)
    }
    module2.exports = compile
  },
})

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/expand.js
var require_expand = __commonJS({
  '../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/expand.js'(
    exports,
    module2,
  ) {
    'use strict'
    var fill = require_fill_range()
    var stringify = require_stringify()
    var utils = require_utils()
    var append = (queue = '', stash = '', enclose = false) => {
      let result = []
      queue = [].concat(queue)
      stash = [].concat(stash)
      if (!stash.length) return queue
      if (!queue.length) {
        return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash
      }
      for (let item of queue) {
        if (Array.isArray(item)) {
          for (let value of item) {
            result.push(append(value, stash, enclose))
          }
        } else {
          for (let ele of stash) {
            if (enclose === true && typeof ele === 'string') ele = `{${ele}}`
            result.push(
              Array.isArray(ele) ? append(item, ele, enclose) : item + ele,
            )
          }
        }
      }
      return utils.flatten(result)
    }
    var expand = (ast, options3 = {}) => {
      let rangeLimit =
        options3.rangeLimit === void 0 ? 1e3 : options3.rangeLimit
      let walk = (node, parent = {}) => {
        node.queue = []
        let p = parent
        let q = parent.queue
        while (p.type !== 'brace' && p.type !== 'root' && p.parent) {
          p = p.parent
          q = p.queue
        }
        if (node.invalid || node.dollar) {
          q.push(append(q.pop(), stringify(node, options3)))
          return
        }
        if (
          node.type === 'brace' &&
          node.invalid !== true &&
          node.nodes.length === 2
        ) {
          q.push(append(q.pop(), ['{}']))
          return
        }
        if (node.nodes && node.ranges > 0) {
          let args = utils.reduce(node.nodes)
          if (utils.exceedsLimit(...args, options3.step, rangeLimit)) {
            throw new RangeError(
              'expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.',
            )
          }
          let range = fill(...args, options3)
          if (range.length === 0) {
            range = stringify(node, options3)
          }
          q.push(append(q.pop(), range))
          node.nodes = []
          return
        }
        let enclose = utils.encloseBrace(node)
        let queue = node.queue
        let block = node
        while (
          block.type !== 'brace' &&
          block.type !== 'root' &&
          block.parent
        ) {
          block = block.parent
          queue = block.queue
        }
        for (let i = 0; i < node.nodes.length; i++) {
          let child = node.nodes[i]
          if (child.type === 'comma' && node.type === 'brace') {
            if (i === 1) queue.push('')
            queue.push('')
            continue
          }
          if (child.type === 'close') {
            q.push(append(q.pop(), queue, enclose))
            continue
          }
          if (child.value && child.type !== 'open') {
            queue.push(append(queue.pop(), child.value))
            continue
          }
          if (child.nodes) {
            walk(child, node)
          }
        }
        return queue
      }
      return utils.flatten(walk(ast))
    }
    module2.exports = expand
  },
})

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/constants.js
var require_constants = __commonJS({
  '../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/constants.js'(
    exports,
    module2,
  ) {
    'use strict'
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      CHAR_0: '0',
      CHAR_9: '9',
      CHAR_UPPERCASE_A: 'A',
      CHAR_LOWERCASE_A: 'a',
      CHAR_UPPERCASE_Z: 'Z',
      CHAR_LOWERCASE_Z: 'z',
      CHAR_LEFT_PARENTHESES: '(',
      CHAR_RIGHT_PARENTHESES: ')',
      CHAR_ASTERISK: '*',
      CHAR_AMPERSAND: '&',
      CHAR_AT: '@',
      CHAR_BACKSLASH: '\\',
      CHAR_BACKTICK: '`',
      CHAR_CARRIAGE_RETURN: '\r',
      CHAR_CIRCUMFLEX_ACCENT: '^',
      CHAR_COLON: ':',
      CHAR_COMMA: ',',
      CHAR_DOLLAR: '$',
      CHAR_DOT: '.',
      CHAR_DOUBLE_QUOTE: '"',
      CHAR_EQUAL: '=',
      CHAR_EXCLAMATION_MARK: '!',
      CHAR_FORM_FEED: '\f',
      CHAR_FORWARD_SLASH: '/',
      CHAR_HASH: '#',
      CHAR_HYPHEN_MINUS: '-',
      CHAR_LEFT_ANGLE_BRACKET: '<',
      CHAR_LEFT_CURLY_BRACE: '{',
      CHAR_LEFT_SQUARE_BRACKET: '[',
      CHAR_LINE_FEED: '\n',
      CHAR_NO_BREAK_SPACE: '\xA0',
      CHAR_PERCENT: '%',
      CHAR_PLUS: '+',
      CHAR_QUESTION_MARK: '?',
      CHAR_RIGHT_ANGLE_BRACKET: '>',
      CHAR_RIGHT_CURLY_BRACE: '}',
      CHAR_RIGHT_SQUARE_BRACKET: ']',
      CHAR_SEMICOLON: ';',
      CHAR_SINGLE_QUOTE: "'",
      CHAR_SPACE: ' ',
      CHAR_TAB: '	',
      CHAR_UNDERSCORE: '_',
      CHAR_VERTICAL_LINE: '|',
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: '\uFEFF',
    }
  },
})

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/parse.js
var require_parse2 = __commonJS({
  '../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/parse.js'(
    exports,
    module2,
  ) {
    'use strict'
    var stringify = require_stringify()
    var {
      MAX_LENGTH,
      CHAR_BACKSLASH,
      CHAR_BACKTICK,
      CHAR_COMMA,
      CHAR_DOT,
      CHAR_LEFT_PARENTHESES,
      CHAR_RIGHT_PARENTHESES,
      CHAR_LEFT_CURLY_BRACE,
      CHAR_RIGHT_CURLY_BRACE,
      CHAR_LEFT_SQUARE_BRACKET,
      CHAR_RIGHT_SQUARE_BRACKET,
      CHAR_DOUBLE_QUOTE,
      CHAR_SINGLE_QUOTE,
      CHAR_NO_BREAK_SPACE,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE,
    } = require_constants()
    var parse = (input, options3 = {}) => {
      if (typeof input !== 'string') {
        throw new TypeError('Expected a string')
      }
      let opts = options3 || {}
      let max =
        typeof opts.maxLength === 'number'
          ? Math.min(MAX_LENGTH, opts.maxLength)
          : MAX_LENGTH
      if (input.length > max) {
        throw new SyntaxError(
          `Input length (${input.length}), exceeds max characters (${max})`,
        )
      }
      let ast = { type: 'root', input, nodes: [] }
      let stack = [ast]
      let block = ast
      let prev = ast
      let brackets = 0
      let length = input.length
      let index = 0
      let depth = 0
      let value
      let memo = {}
      const advance = () => input[index++]
      const push = (node) => {
        if (node.type === 'text' && prev.type === 'dot') {
          prev.type = 'text'
        }
        if (prev && prev.type === 'text' && node.type === 'text') {
          prev.value += node.value
          return
        }
        block.nodes.push(node)
        node.parent = block
        node.prev = prev
        prev = node
        return node
      }
      push({ type: 'bos' })
      while (index < length) {
        block = stack[stack.length - 1]
        value = advance()
        if (
          value === CHAR_ZERO_WIDTH_NOBREAK_SPACE ||
          value === CHAR_NO_BREAK_SPACE
        ) {
          continue
        }
        if (value === CHAR_BACKSLASH) {
          push({
            type: 'text',
            value: (options3.keepEscaping ? value : '') + advance(),
          })
          continue
        }
        if (value === CHAR_RIGHT_SQUARE_BRACKET) {
          push({ type: 'text', value: '\\' + value })
          continue
        }
        if (value === CHAR_LEFT_SQUARE_BRACKET) {
          brackets++
          let closed = true
          let next
          while (index < length && (next = advance())) {
            value += next
            if (next === CHAR_LEFT_SQUARE_BRACKET) {
              brackets++
              continue
            }
            if (next === CHAR_BACKSLASH) {
              value += advance()
              continue
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              brackets--
              if (brackets === 0) {
                break
              }
            }
          }
          push({ type: 'text', value })
          continue
        }
        if (value === CHAR_LEFT_PARENTHESES) {
          block = push({ type: 'paren', nodes: [] })
          stack.push(block)
          push({ type: 'text', value })
          continue
        }
        if (value === CHAR_RIGHT_PARENTHESES) {
          if (block.type !== 'paren') {
            push({ type: 'text', value })
            continue
          }
          block = stack.pop()
          push({ type: 'text', value })
          block = stack[stack.length - 1]
          continue
        }
        if (
          value === CHAR_DOUBLE_QUOTE ||
          value === CHAR_SINGLE_QUOTE ||
          value === CHAR_BACKTICK
        ) {
          let open = value
          let next
          if (options3.keepQuotes !== true) {
            value = ''
          }
          while (index < length && (next = advance())) {
            if (next === CHAR_BACKSLASH) {
              value += next + advance()
              continue
            }
            if (next === open) {
              if (options3.keepQuotes === true) value += next
              break
            }
            value += next
          }
          push({ type: 'text', value })
          continue
        }
        if (value === CHAR_LEFT_CURLY_BRACE) {
          depth++
          let dollar =
            (prev.value && prev.value.slice(-1) === '$') ||
            block.dollar === true
          let brace = {
            type: 'brace',
            open: true,
            close: false,
            dollar,
            depth,
            commas: 0,
            ranges: 0,
            nodes: [],
          }
          block = push(brace)
          stack.push(block)
          push({ type: 'open', value })
          continue
        }
        if (value === CHAR_RIGHT_CURLY_BRACE) {
          if (block.type !== 'brace') {
            push({ type: 'text', value })
            continue
          }
          let type = 'close'
          block = stack.pop()
          block.close = true
          push({ type, value })
          depth--
          block = stack[stack.length - 1]
          continue
        }
        if (value === CHAR_COMMA && depth > 0) {
          if (block.ranges > 0) {
            block.ranges = 0
            let open = block.nodes.shift()
            block.nodes = [open, { type: 'text', value: stringify(block) }]
          }
          push({ type: 'comma', value })
          block.commas++
          continue
        }
        if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
          let siblings = block.nodes
          if (depth === 0 || siblings.length === 0) {
            push({ type: 'text', value })
            continue
          }
          if (prev.type === 'dot') {
            block.range = []
            prev.value += value
            prev.type = 'range'
            if (block.nodes.length !== 3 && block.nodes.length !== 5) {
              block.invalid = true
              block.ranges = 0
              prev.type = 'text'
              continue
            }
            block.ranges++
            block.args = []
            continue
          }
          if (prev.type === 'range') {
            siblings.pop()
            let before = siblings[siblings.length - 1]
            before.value += prev.value + value
            prev = before
            block.ranges--
            continue
          }
          push({ type: 'dot', value })
          continue
        }
        push({ type: 'text', value })
      }
      do {
        block = stack.pop()
        if (block.type !== 'root') {
          block.nodes.forEach((node) => {
            if (!node.nodes) {
              if (node.type === 'open') node.isOpen = true
              if (node.type === 'close') node.isClose = true
              if (!node.nodes) node.type = 'text'
              node.invalid = true
            }
          })
          let parent = stack[stack.length - 1]
          let index2 = parent.nodes.indexOf(block)
          parent.nodes.splice(index2, 1, ...block.nodes)
        }
      } while (stack.length > 0)
      push({ type: 'eos' })
      return ast
    }
    module2.exports = parse
  },
})

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/index.js
var require_braces = __commonJS({
  '../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/index.js'(
    exports,
    module2,
  ) {
    'use strict'
    var stringify = require_stringify()
    var compile = require_compile()
    var expand = require_expand()
    var parse = require_parse2()
    var braces = (input, options3 = {}) => {
      let output = []
      if (Array.isArray(input)) {
        for (let pattern of input) {
          let result = braces.create(pattern, options3)
          if (Array.isArray(result)) {
            output.push(...result)
          } else {
            output.push(result)
          }
        }
      } else {
        output = [].concat(braces.create(input, options3))
      }
      if (options3 && options3.expand === true && options3.nodupes === true) {
        output = [...new Set(output)]
      }
      return output
    }
    braces.parse = (input, options3 = {}) => parse(input, options3)
    braces.stringify = (input, options3 = {}) => {
      if (typeof input === 'string') {
        return stringify(braces.parse(input, options3), options3)
      }
      return stringify(input, options3)
    }
    braces.compile = (input, options3 = {}) => {
      if (typeof input === 'string') {
        input = braces.parse(input, options3)
      }
      return compile(input, options3)
    }
    braces.expand = (input, options3 = {}) => {
      if (typeof input === 'string') {
        input = braces.parse(input, options3)
      }
      let result = expand(input, options3)
      if (options3.noempty === true) {
        result = result.filter(Boolean)
      }
      if (options3.nodupes === true) {
        result = [...new Set(result)]
      }
      return result
    }
    braces.create = (input, options3 = {}) => {
      if (input === '' || input.length < 3) {
        return [input]
      }
      return options3.expand !== true
        ? braces.compile(input, options3)
        : braces.expand(input, options3)
    }
    module2.exports = braces
  },
})

// ../../node_modules/.pnpm/picomatch@2.3.0/node_modules/picomatch/lib/constants.js
var require_constants2 = __commonJS({
  '../../node_modules/.pnpm/picomatch@2.3.0/node_modules/picomatch/lib/constants.js'(
    exports,
    module2,
  ) {
    'use strict'
    var path3 = require('path')
    var WIN_SLASH = '\\\\/'
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`
    var DOT_LITERAL = '\\.'
    var PLUS_LITERAL = '\\+'
    var QMARK_LITERAL = '\\?'
    var SLASH_LITERAL = '\\/'
    var ONE_CHAR = '(?=.)'
    var QMARK = '[^/]'
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`
    var NO_DOT = `(?!${DOT_LITERAL})`
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`
    var STAR = `${QMARK}*?`
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR,
    }
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`,
    }
    var POSIX_REGEX_SOURCE = {
      alnum: 'a-zA-Z0-9',
      alpha: 'a-zA-Z',
      ascii: '\\x00-\\x7F',
      blank: ' \\t',
      cntrl: '\\x00-\\x1F\\x7F',
      digit: '0-9',
      graph: '\\x21-\\x7E',
      lower: 'a-z',
      print: '\\x20-\\x7E ',
      punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
      space: ' \\t\\r\\n\\v\\f',
      upper: 'A-Z',
      word: 'A-Za-z0-9_',
      xdigit: 'A-Fa-f0-9',
    }
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      REPLACEMENTS: {
        '***': '*',
        '**/**': '**',
        '**/**/**': '**',
      },
      CHAR_0: 48,
      CHAR_9: 57,
      CHAR_UPPERCASE_A: 65,
      CHAR_LOWERCASE_A: 97,
      CHAR_UPPERCASE_Z: 90,
      CHAR_LOWERCASE_Z: 122,
      CHAR_LEFT_PARENTHESES: 40,
      CHAR_RIGHT_PARENTHESES: 41,
      CHAR_ASTERISK: 42,
      CHAR_AMPERSAND: 38,
      CHAR_AT: 64,
      CHAR_BACKWARD_SLASH: 92,
      CHAR_CARRIAGE_RETURN: 13,
      CHAR_CIRCUMFLEX_ACCENT: 94,
      CHAR_COLON: 58,
      CHAR_COMMA: 44,
      CHAR_DOT: 46,
      CHAR_DOUBLE_QUOTE: 34,
      CHAR_EQUAL: 61,
      CHAR_EXCLAMATION_MARK: 33,
      CHAR_FORM_FEED: 12,
      CHAR_FORWARD_SLASH: 47,
      CHAR_GRAVE_ACCENT: 96,
      CHAR_HASH: 35,
      CHAR_HYPHEN_MINUS: 45,
      CHAR_LEFT_ANGLE_BRACKET: 60,
      CHAR_LEFT_CURLY_BRACE: 123,
      CHAR_LEFT_SQUARE_BRACKET: 91,
      CHAR_LINE_FEED: 10,
      CHAR_NO_BREAK_SPACE: 160,
      CHAR_PERCENT: 37,
      CHAR_PLUS: 43,
      CHAR_QUESTION_MARK: 63,
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      CHAR_RIGHT_CURLY_BRACE: 125,
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      CHAR_SEMICOLON: 59,
      CHAR_SINGLE_QUOTE: 39,
      CHAR_SPACE: 32,
      CHAR_TAB: 9,
      CHAR_UNDERSCORE: 95,
      CHAR_VERTICAL_LINE: 124,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      SEP: path3.sep,
      extglobChars(chars) {
        return {
          '!': { type: 'negate', open: '(?:(?!(?:', close: `))${chars.STAR})` },
          '?': { type: 'qmark', open: '(?:', close: ')?' },
          '+': { type: 'plus', open: '(?:', close: ')+' },
          '*': { type: 'star', open: '(?:', close: ')*' },
          '@': { type: 'at', open: '(?:', close: ')' },
        }
      },
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS
      },
    }
  },
})

// ../../node_modules/.pnpm/picomatch@2.3.0/node_modules/picomatch/lib/utils.js
var require_utils2 = __commonJS({
  '../../node_modules/.pnpm/picomatch@2.3.0/node_modules/picomatch/lib/utils.js'(
    exports,
  ) {
    'use strict'
    var path3 = require('path')
    var win32 = process.platform === 'win32'
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL,
    } = require_constants2()
    exports.isObject = (val) =>
      val !== null && typeof val === 'object' && !Array.isArray(val)
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str)
    exports.isRegexChar = (str) =>
      str.length === 1 && exports.hasRegexChars(str)
    exports.escapeRegex = (str) =>
      str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1')
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, '/')
    exports.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === '\\' ? '' : match
      })
    }
    exports.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split('.').map(Number)
      if (
        (segs.length === 3 && segs[0] >= 9) ||
        (segs[0] === 8 && segs[1] >= 10)
      ) {
        return true
      }
      return false
    }
    exports.isWindows = (options3) => {
      if (options3 && typeof options3.windows === 'boolean') {
        return options3.windows
      }
      return win32 === true || path3.sep === '\\'
    }
    exports.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx)
      if (idx === -1) return input
      if (input[idx - 1] === '\\')
        return exports.escapeLast(input, char, idx - 1)
      return `${input.slice(0, idx)}\\${input.slice(idx)}`
    }
    exports.removePrefix = (input, state = {}) => {
      let output = input
      if (output.startsWith('./')) {
        output = output.slice(2)
        state.prefix = './'
      }
      return output
    }
    exports.wrapOutput = (input, state = {}, options3 = {}) => {
      const prepend = options3.contains ? '' : '^'
      const append = options3.contains ? '' : '$'
      let output = `${prepend}(?:${input})${append}`
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`
      }
      return output
    }
  },
})

// ../../node_modules/.pnpm/picomatch@2.3.0/node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  '../../node_modules/.pnpm/picomatch@2.3.0/node_modules/picomatch/lib/scan.js'(
    exports,
    module2,
  ) {
    'use strict'
    var utils = require_utils2()
    var {
      CHAR_ASTERISK,
      CHAR_AT,
      CHAR_BACKWARD_SLASH,
      CHAR_COMMA,
      CHAR_DOT,
      CHAR_EXCLAMATION_MARK,
      CHAR_FORWARD_SLASH,
      CHAR_LEFT_CURLY_BRACE,
      CHAR_LEFT_PARENTHESES,
      CHAR_LEFT_SQUARE_BRACKET,
      CHAR_PLUS,
      CHAR_QUESTION_MARK,
      CHAR_RIGHT_CURLY_BRACE,
      CHAR_RIGHT_PARENTHESES,
      CHAR_RIGHT_SQUARE_BRACKET,
    } = require_constants2()
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH
    }
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1
      }
    }
    var scan = (input, options3) => {
      const opts = options3 || {}
      const length = input.length - 1
      const scanToEnd = opts.parts === true || opts.scanToEnd === true
      const slashes = []
      const tokens = []
      const parts = []
      let str = input
      let index = -1
      let start = 0
      let lastIndex = 0
      let isBrace = false
      let isBracket = false
      let isGlob = false
      let isExtglob = false
      let isGlobstar = false
      let braceEscaped = false
      let backslashes = false
      let negated = false
      let negatedExtglob = false
      let finished = false
      let braces = 0
      let prev
      let code
      let token = { value: '', depth: 0, isGlob: false }
      const eos = () => index >= length
      const peek = () => str.charCodeAt(index + 1)
      const advance = () => {
        prev = code
        return str.charCodeAt(++index)
      }
      while (index < length) {
        code = advance()
        let next
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true
          code = advance()
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true
          }
          continue
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true
              advance()
              continue
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++
              continue
            }
            if (
              braceEscaped !== true &&
              code === CHAR_DOT &&
              (code = advance()) === CHAR_DOT
            ) {
              isBrace = token.isBrace = true
              isGlob = token.isGlob = true
              finished = true
              if (scanToEnd === true) {
                continue
              }
              break
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true
              isGlob = token.isGlob = true
              finished = true
              if (scanToEnd === true) {
                continue
              }
              break
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--
              if (braces === 0) {
                braceEscaped = false
                isBrace = token.isBrace = true
                finished = true
                break
              }
            }
          }
          if (scanToEnd === true) {
            continue
          }
          break
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index)
          tokens.push(token)
          token = { value: '', depth: 0, isGlob: false }
          if (finished === true) continue
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2
            continue
          }
          lastIndex = index + 1
          continue
        }
        if (opts.noext !== true) {
          const isExtglobChar =
            code === CHAR_PLUS ||
            code === CHAR_AT ||
            code === CHAR_ASTERISK ||
            code === CHAR_QUESTION_MARK ||
            code === CHAR_EXCLAMATION_MARK
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true
            isExtglob = token.isExtglob = true
            finished = true
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true
                  code = advance()
                  continue
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true
                  finished = true
                  break
                }
              }
              continue
            }
            break
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true
          isGlob = token.isGlob = true
          finished = true
          if (scanToEnd === true) {
            continue
          }
          break
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true
          finished = true
          if (scanToEnd === true) {
            continue
          }
          break
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true
              advance()
              continue
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true
              isGlob = token.isGlob = true
              finished = true
              break
            }
          }
          if (scanToEnd === true) {
            continue
          }
          break
        }
        if (
          opts.nonegate !== true &&
          code === CHAR_EXCLAMATION_MARK &&
          index === start
        ) {
          negated = token.negated = true
          start++
          continue
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true
                code = advance()
                continue
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true
                break
              }
            }
            continue
          }
          break
        }
        if (isGlob === true) {
          finished = true
          if (scanToEnd === true) {
            continue
          }
          break
        }
      }
      if (opts.noext === true) {
        isExtglob = false
        isGlob = false
      }
      let base = str
      let prefix = ''
      let glob2 = ''
      if (start > 0) {
        prefix = str.slice(0, start)
        str = str.slice(start)
        lastIndex -= start
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex)
        glob2 = str.slice(lastIndex)
      } else if (isGlob === true) {
        base = ''
        glob2 = str
      } else {
        base = str
      }
      if (base && base !== '' && base !== '/' && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1)
        }
      }
      if (opts.unescape === true) {
        if (glob2) glob2 = utils.removeBackslashes(glob2)
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base)
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob: glob2,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob,
      }
      if (opts.tokens === true) {
        state.maxDepth = 0
        if (!isPathSeparator(code)) {
          tokens.push(token)
        }
        state.tokens = tokens
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start
          const i = slashes[idx]
          const value = input.slice(n, i)
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true
              tokens[idx].value = prefix
            } else {
              tokens[idx].value = value
            }
            depth(tokens[idx])
            state.maxDepth += tokens[idx].depth
          }
          if (idx !== 0 || value !== '') {
            parts.push(value)
          }
          prevIndex = i
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1)
          parts.push(value)
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value
            depth(tokens[tokens.length - 1])
            state.maxDepth += tokens[tokens.length - 1].depth
          }
        }
        state.slashes = slashes
        state.parts = parts
      }
      return state
    }
    module2.exports = scan
  },
})

// ../../node_modules/.pnpm/picomatch@2.3.0/node_modules/picomatch/lib/parse.js
var require_parse3 = __commonJS({
  '../../node_modules/.pnpm/picomatch@2.3.0/node_modules/picomatch/lib/parse.js'(
    exports,
    module2,
  ) {
    'use strict'
    var constants = require_constants2()
    var utils = require_utils2()
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS,
    } = constants
    var expandRange = (args, options3) => {
      if (typeof options3.expandRange === 'function') {
        return options3.expandRange(...args, options3)
      }
      args.sort()
      const value = `[${args.join('-')}]`
      try {
        new RegExp(value)
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join('..')
      }
      return value
    }
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`
    }
    var parse = (input, options3) => {
      if (typeof input !== 'string') {
        throw new TypeError('Expected a string')
      }
      input = REPLACEMENTS[input] || input
      const opts = { ...options3 }
      const max =
        typeof opts.maxLength === 'number'
          ? Math.min(MAX_LENGTH, opts.maxLength)
          : MAX_LENGTH
      let len = input.length
      if (len > max) {
        throw new SyntaxError(
          `Input length: ${len}, exceeds maximum allowed length: ${max}`,
        )
      }
      const bos = { type: 'bos', value: '', output: opts.prepend || '' }
      const tokens = [bos]
      const capture = opts.capture ? '' : '?:'
      const win32 = utils.isWindows(options3)
      const PLATFORM_CHARS = constants.globChars(win32)
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS)
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR,
      } = PLATFORM_CHARS
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${
          opts2.dot ? DOTS_SLASH : DOT_LITERAL
        }).)*?)`
      }
      const nodot = opts.dot ? '' : NO_DOT
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT
      let star = opts.bash === true ? globstar(opts) : STAR
      if (opts.capture) {
        star = `(${star})`
      }
      if (typeof opts.noext === 'boolean') {
        opts.noextglob = opts.noext
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: '',
        output: '',
        prefix: '',
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens,
      }
      input = utils.removePrefix(input, state)
      len = input.length
      const extglobs = []
      const braces = []
      const stack = []
      let prev = bos
      let value
      const eos = () => state.index === len - 1
      const peek = (state.peek = (n = 1) => input[state.index + n])
      const advance = (state.advance = () => input[++state.index] || '')
      const remaining = () => input.slice(state.index + 1)
      const consume = (value2 = '', num = 0) => {
        state.consumed += value2
        state.index += num
      }
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value
        consume(token.value)
      }
      const negate = () => {
        let count = 1
        while (peek() === '!' && (peek(2) !== '(' || peek(3) === '?')) {
          advance()
          state.start++
          count++
        }
        if (count % 2 === 0) {
          return false
        }
        state.negated = true
        state.start++
        return true
      }
      const increment = (type) => {
        state[type]++
        stack.push(type)
      }
      const decrement = (type) => {
        state[type]--
        stack.pop()
      }
      const push = (tok) => {
        if (prev.type === 'globstar') {
          const isBrace =
            state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace')
          const isExtglob =
            tok.extglob === true ||
            (extglobs.length && (tok.type === 'pipe' || tok.type === 'paren'))
          if (
            tok.type !== 'slash' &&
            tok.type !== 'paren' &&
            !isBrace &&
            !isExtglob
          ) {
            state.output = state.output.slice(0, -prev.output.length)
            prev.type = 'star'
            prev.value = '*'
            prev.output = star
            state.output += prev.output
          }
        }
        if (extglobs.length && tok.type !== 'paren') {
          extglobs[extglobs.length - 1].inner += tok.value
        }
        if (tok.value || tok.output) append(tok)
        if (prev && prev.type === 'text' && tok.type === 'text') {
          prev.value += tok.value
          prev.output = (prev.output || '') + tok.value
          return
        }
        tok.prev = prev
        tokens.push(tok)
        prev = tok
      }
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: '' }
        token.prev = prev
        token.parens = state.parens
        token.output = state.output
        const output = (opts.capture ? '(' : '') + token.open
        increment('parens')
        push({ type, value: value2, output: state.output ? '' : ONE_CHAR })
        push({ type: 'paren', extglob: true, value: advance(), output })
        extglobs.push(token)
      }
      const extglobClose = (token) => {
        let output = token.close + (opts.capture ? ')' : '')
        let rest
        if (token.type === 'negate') {
          let extglobStar = star
          if (
            token.inner &&
            token.inner.length > 1 &&
            token.inner.includes('/')
          ) {
            extglobStar = globstar(opts)
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`
          }
          if (
            token.inner.includes('*') &&
            (rest = remaining()) &&
            /^\.[^\\/.]+$/.test(rest)
          ) {
            output = token.close = `)${rest})${extglobStar})`
          }
          if (token.prev.type === 'bos') {
            state.negatedExtglob = true
          }
        }
        push({ type: 'paren', extglob: true, value, output })
        decrement('parens')
      }
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false
        let output = input.replace(
          REGEX_SPECIAL_CHARS_BACKREF,
          (m, esc, chars, first, rest, index) => {
            if (first === '\\') {
              backslashes = true
              return m
            }
            if (first === '?') {
              if (esc) {
                return esc + first + (rest ? QMARK.repeat(rest.length) : '')
              }
              if (index === 0) {
                return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '')
              }
              return QMARK.repeat(chars.length)
            }
            if (first === '.') {
              return DOT_LITERAL.repeat(chars.length)
            }
            if (first === '*') {
              if (esc) {
                return esc + first + (rest ? star : '')
              }
              return star
            }
            return esc ? m : `\\${m}`
          },
        )
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, '')
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? '\\\\' : m ? '\\' : ''
            })
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input
          return state
        }
        state.output = utils.wrapOutput(output, state, options3)
        return state
      }
      while (!eos()) {
        value = advance()
        if (value === '\0') {
          continue
        }
        if (value === '\\') {
          const next = peek()
          if (next === '/' && opts.bash !== true) {
            continue
          }
          if (next === '.' || next === ';') {
            continue
          }
          if (!next) {
            value += '\\'
            push({ type: 'text', value })
            continue
          }
          const match = /^\\+/.exec(remaining())
          let slashes = 0
          if (match && match[0].length > 2) {
            slashes = match[0].length
            state.index += slashes
            if (slashes % 2 !== 0) {
              value += '\\'
            }
          }
          if (opts.unescape === true) {
            value = advance()
          } else {
            value += advance()
          }
          if (state.brackets === 0) {
            push({ type: 'text', value })
            continue
          }
        }
        if (
          state.brackets > 0 &&
          (value !== ']' || prev.value === '[' || prev.value === '[^')
        ) {
          if (opts.posix !== false && value === ':') {
            const inner = prev.value.slice(1)
            if (inner.includes('[')) {
              prev.posix = true
              if (inner.includes(':')) {
                const idx = prev.value.lastIndexOf('[')
                const pre = prev.value.slice(0, idx)
                const rest2 = prev.value.slice(idx + 2)
                const posix = POSIX_REGEX_SOURCE[rest2]
                if (posix) {
                  prev.value = pre + posix
                  state.backtrack = true
                  advance()
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR
                  }
                  continue
                }
              }
            }
          }
          if (
            (value === '[' && peek() !== ':') ||
            (value === '-' && peek() === ']')
          ) {
            value = `\\${value}`
          }
          if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
            value = `\\${value}`
          }
          if (opts.posix === true && value === '!' && prev.value === '[') {
            value = '^'
          }
          prev.value += value
          append({ value })
          continue
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value)
          prev.value += value
          append({ value })
          continue
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1
          if (opts.keepQuotes === true) {
            push({ type: 'text', value })
          }
          continue
        }
        if (value === '(') {
          increment('parens')
          push({ type: 'paren', value })
          continue
        }
        if (value === ')') {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError('opening', '('))
          }
          const extglob = extglobs[extglobs.length - 1]
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop())
            continue
          }
          push({ type: 'paren', value, output: state.parens ? ')' : '\\)' })
          decrement('parens')
          continue
        }
        if (value === '[') {
          if (opts.nobracket === true || !remaining().includes(']')) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError('closing', ']'))
            }
            value = `\\${value}`
          } else {
            increment('brackets')
          }
          push({ type: 'bracket', value })
          continue
        }
        if (value === ']') {
          if (
            opts.nobracket === true ||
            (prev && prev.type === 'bracket' && prev.value.length === 1)
          ) {
            push({ type: 'text', value, output: `\\${value}` })
            continue
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError('opening', '['))
            }
            push({ type: 'text', value, output: `\\${value}` })
            continue
          }
          decrement('brackets')
          const prevValue = prev.value.slice(1)
          if (
            prev.posix !== true &&
            prevValue[0] === '^' &&
            !prevValue.includes('/')
          ) {
            value = `/${value}`
          }
          prev.value += value
          append({ value })
          if (
            opts.literalBrackets === false ||
            utils.hasRegexChars(prevValue)
          ) {
            continue
          }
          const escaped = utils.escapeRegex(prev.value)
          state.output = state.output.slice(0, -prev.value.length)
          if (opts.literalBrackets === true) {
            state.output += escaped
            prev.value = escaped
            continue
          }
          prev.value = `(${capture}${escaped}|${prev.value})`
          state.output += prev.value
          continue
        }
        if (value === '{' && opts.nobrace !== true) {
          increment('braces')
          const open = {
            type: 'brace',
            value,
            output: '(',
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length,
          }
          braces.push(open)
          push(open)
          continue
        }
        if (value === '}') {
          const brace = braces[braces.length - 1]
          if (opts.nobrace === true || !brace) {
            push({ type: 'text', value, output: value })
            continue
          }
          let output = ')'
          if (brace.dots === true) {
            const arr = tokens.slice()
            const range = []
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop()
              if (arr[i].type === 'brace') {
                break
              }
              if (arr[i].type !== 'dots') {
                range.unshift(arr[i].value)
              }
            }
            output = expandRange(range, opts)
            state.backtrack = true
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex)
            const toks = state.tokens.slice(brace.tokensIndex)
            brace.value = brace.output = '\\{'
            value = output = '\\}'
            state.output = out
            for (const t of toks) {
              state.output += t.output || t.value
            }
          }
          push({ type: 'brace', value, output })
          decrement('braces')
          braces.pop()
          continue
        }
        if (value === '|') {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++
          }
          push({ type: 'text', value })
          continue
        }
        if (value === ',') {
          let output = value
          const brace = braces[braces.length - 1]
          if (brace && stack[stack.length - 1] === 'braces') {
            brace.comma = true
            output = '|'
          }
          push({ type: 'comma', value, output })
          continue
        }
        if (value === '/') {
          if (prev.type === 'dot' && state.index === state.start + 1) {
            state.start = state.index + 1
            state.consumed = ''
            state.output = ''
            tokens.pop()
            prev = bos
            continue
          }
          push({ type: 'slash', value, output: SLASH_LITERAL })
          continue
        }
        if (value === '.') {
          if (state.braces > 0 && prev.type === 'dot') {
            if (prev.value === '.') prev.output = DOT_LITERAL
            const brace = braces[braces.length - 1]
            prev.type = 'dots'
            prev.output += value
            prev.value += value
            brace.dots = true
            continue
          }
          if (
            state.braces + state.parens === 0 &&
            prev.type !== 'bos' &&
            prev.type !== 'slash'
          ) {
            push({ type: 'text', value, output: DOT_LITERAL })
            continue
          }
          push({ type: 'dot', value, output: DOT_LITERAL })
          continue
        }
        if (value === '?') {
          const isGroup = prev && prev.value === '('
          if (
            !isGroup &&
            opts.noextglob !== true &&
            peek() === '(' &&
            peek(2) !== '?'
          ) {
            extglobOpen('qmark', value)
            continue
          }
          if (prev && prev.type === 'paren') {
            const next = peek()
            let output = value
            if (next === '<' && !utils.supportsLookbehinds()) {
              throw new Error(
                'Node.js v10 or higher is required for regex lookbehinds',
              )
            }
            if (
              (prev.value === '(' && !/[!=<:]/.test(next)) ||
              (next === '<' && !/<([!=]|\w+>)/.test(remaining()))
            ) {
              output = `\\${value}`
            }
            push({ type: 'text', value, output })
            continue
          }
          if (
            opts.dot !== true &&
            (prev.type === 'slash' || prev.type === 'bos')
          ) {
            push({ type: 'qmark', value, output: QMARK_NO_DOT })
            continue
          }
          push({ type: 'qmark', value, output: QMARK })
          continue
        }
        if (value === '!') {
          if (opts.noextglob !== true && peek() === '(') {
            if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
              extglobOpen('negate', value)
              continue
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate()
            continue
          }
        }
        if (value === '+') {
          if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
            extglobOpen('plus', value)
            continue
          }
          if ((prev && prev.value === '(') || opts.regex === false) {
            push({ type: 'plus', value, output: PLUS_LITERAL })
            continue
          }
          if (
            (prev &&
              (prev.type === 'bracket' ||
                prev.type === 'paren' ||
                prev.type === 'brace')) ||
            state.parens > 0
          ) {
            push({ type: 'plus', value })
            continue
          }
          push({ type: 'plus', value: PLUS_LITERAL })
          continue
        }
        if (value === '@') {
          if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
            push({ type: 'at', extglob: true, value, output: '' })
            continue
          }
          push({ type: 'text', value })
          continue
        }
        if (value !== '*') {
          if (value === '$' || value === '^') {
            value = `\\${value}`
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining())
          if (match) {
            value += match[0]
            state.index += match[0].length
          }
          push({ type: 'text', value })
          continue
        }
        if (prev && (prev.type === 'globstar' || prev.star === true)) {
          prev.type = 'star'
          prev.star = true
          prev.value += value
          prev.output = star
          state.backtrack = true
          state.globstar = true
          consume(value)
          continue
        }
        let rest = remaining()
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen('star', value)
          continue
        }
        if (prev.type === 'star') {
          if (opts.noglobstar === true) {
            consume(value)
            continue
          }
          const prior = prev.prev
          const before = prior.prev
          const isStart = prior.type === 'slash' || prior.type === 'bos'
          const afterStar =
            before && (before.type === 'star' || before.type === 'globstar')
          if (
            opts.bash === true &&
            (!isStart || (rest[0] && rest[0] !== '/'))
          ) {
            push({ type: 'star', value, output: '' })
            continue
          }
          const isBrace =
            state.braces > 0 &&
            (prior.type === 'comma' || prior.type === 'brace')
          const isExtglob =
            extglobs.length && (prior.type === 'pipe' || prior.type === 'paren')
          if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
            push({ type: 'star', value, output: '' })
            continue
          }
          while (rest.slice(0, 3) === '/**') {
            const after = input[state.index + 4]
            if (after && after !== '/') {
              break
            }
            rest = rest.slice(3)
            consume('/**', 3)
          }
          if (prior.type === 'bos' && eos()) {
            prev.type = 'globstar'
            prev.value += value
            prev.output = globstar(opts)
            state.output = prev.output
            state.globstar = true
            consume(value)
            continue
          }
          if (
            prior.type === 'slash' &&
            prior.prev.type !== 'bos' &&
            !afterStar &&
            eos()
          ) {
            state.output = state.output.slice(
              0,
              -(prior.output + prev.output).length,
            )
            prior.output = `(?:${prior.output}`
            prev.type = 'globstar'
            prev.output = globstar(opts) + (opts.strictSlashes ? ')' : '|$)')
            prev.value += value
            state.globstar = true
            state.output += prior.output + prev.output
            consume(value)
            continue
          }
          if (
            prior.type === 'slash' &&
            prior.prev.type !== 'bos' &&
            rest[0] === '/'
          ) {
            const end = rest[1] !== void 0 ? '|$' : ''
            state.output = state.output.slice(
              0,
              -(prior.output + prev.output).length,
            )
            prior.output = `(?:${prior.output}`
            prev.type = 'globstar'
            prev.output = `${globstar(
              opts,
            )}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`
            prev.value += value
            state.output += prior.output + prev.output
            state.globstar = true
            consume(value + advance())
            push({ type: 'slash', value: '/', output: '' })
            continue
          }
          if (prior.type === 'bos' && rest[0] === '/') {
            prev.type = 'globstar'
            prev.value += value
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(
              opts,
            )}${SLASH_LITERAL})`
            state.output = prev.output
            state.globstar = true
            consume(value + advance())
            push({ type: 'slash', value: '/', output: '' })
            continue
          }
          state.output = state.output.slice(0, -prev.output.length)
          prev.type = 'globstar'
          prev.output = globstar(opts)
          prev.value += value
          state.output += prev.output
          state.globstar = true
          consume(value)
          continue
        }
        const token = { type: 'star', value, output: star }
        if (opts.bash === true) {
          token.output = '.*?'
          if (prev.type === 'bos' || prev.type === 'slash') {
            token.output = nodot + token.output
          }
          push(token)
          continue
        }
        if (
          prev &&
          (prev.type === 'bracket' || prev.type === 'paren') &&
          opts.regex === true
        ) {
          token.output = value
          push(token)
          continue
        }
        if (
          state.index === state.start ||
          prev.type === 'slash' ||
          prev.type === 'dot'
        ) {
          if (prev.type === 'dot') {
            state.output += NO_DOT_SLASH
            prev.output += NO_DOT_SLASH
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH
            prev.output += NO_DOTS_SLASH
          } else {
            state.output += nodot
            prev.output += nodot
          }
          if (peek() !== '*') {
            state.output += ONE_CHAR
            prev.output += ONE_CHAR
          }
        }
        push(token)
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError('closing', ']'))
        state.output = utils.escapeLast(state.output, '[')
        decrement('brackets')
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError('closing', ')'))
        state.output = utils.escapeLast(state.output, '(')
        decrement('parens')
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError('closing', '}'))
        state.output = utils.escapeLast(state.output, '{')
        decrement('braces')
      }
      if (
        opts.strictSlashes !== true &&
        (prev.type === 'star' || prev.type === 'bracket')
      ) {
        push({ type: 'maybe_slash', value: '', output: `${SLASH_LITERAL}?` })
      }
      if (state.backtrack === true) {
        state.output = ''
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value
          if (token.suffix) {
            state.output += token.suffix
          }
        }
      }
      return state
    }
    parse.fastpaths = (input, options3) => {
      const opts = { ...options3 }
      const max =
        typeof opts.maxLength === 'number'
          ? Math.min(MAX_LENGTH, opts.maxLength)
          : MAX_LENGTH
      const len = input.length
      if (len > max) {
        throw new SyntaxError(
          `Input length: ${len}, exceeds maximum allowed length: ${max}`,
        )
      }
      input = REPLACEMENTS[input] || input
      const win32 = utils.isWindows(options3)
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR,
      } = constants.globChars(win32)
      const nodot = opts.dot ? NO_DOTS : NO_DOT
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT
      const capture = opts.capture ? '' : '?:'
      const state = { negated: false, prefix: '' }
      let star = opts.bash === true ? '.*?' : STAR
      if (opts.capture) {
        star = `(${star})`
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true) return star
        return `(${capture}(?:(?!${START_ANCHOR}${
          opts2.dot ? DOTS_SLASH : DOT_LITERAL
        }).)*?)`
      }
      const create = (str) => {
        switch (str) {
          case '*':
            return `${nodot}${ONE_CHAR}${star}`
          case '.*':
            return `${DOT_LITERAL}${ONE_CHAR}${star}`
          case '*.*':
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`
          case '*/*':
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`
          case '**':
            return nodot + globstar(opts)
          case '**/*':
            return `(?:${nodot}${globstar(
              opts,
            )}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`
          case '**/*.*':
            return `(?:${nodot}${globstar(
              opts,
            )}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`
          case '**/.*':
            return `(?:${nodot}${globstar(
              opts,
            )}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str)
            if (!match) return
            const source2 = create(match[1])
            if (!source2) return
            return source2 + DOT_LITERAL + match[2]
          }
        }
      }
      const output = utils.removePrefix(input, state)
      let source = create(output)
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`
      }
      return source
    }
    module2.exports = parse
  },
})

// ../../node_modules/.pnpm/picomatch@2.3.0/node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  '../../node_modules/.pnpm/picomatch@2.3.0/node_modules/picomatch/lib/picomatch.js'(
    exports,
    module2,
  ) {
    'use strict'
    var path3 = require('path')
    var scan = require_scan()
    var parse = require_parse3()
    var utils = require_utils2()
    var constants = require_constants2()
    var isObject = (val) =>
      val && typeof val === 'object' && !Array.isArray(val)
    var picomatch = (glob2, options3, returnState = false) => {
      if (Array.isArray(glob2)) {
        const fns = glob2.map((input) =>
          picomatch(input, options3, returnState),
        )
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str)
            if (state2) return state2
          }
          return false
        }
        return arrayMatcher
      }
      const isState = isObject(glob2) && glob2.tokens && glob2.input
      if (glob2 === '' || (typeof glob2 !== 'string' && !isState)) {
        throw new TypeError('Expected pattern to be a non-empty string')
      }
      const opts = options3 || {}
      const posix = utils.isWindows(options3)
      const regex = isState
        ? picomatch.compileRe(glob2, options3)
        : picomatch.makeRe(glob2, options3, false, true)
      const state = regex.state
      delete regex.state
      let isIgnored = () => false
      if (opts.ignore) {
        const ignoreOpts = {
          ...options3,
          ignore: null,
          onMatch: null,
          onResult: null,
        }
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState)
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch.test(
          input,
          regex,
          options3,
          { glob: glob2, posix },
        )
        const result = {
          glob: glob2,
          state,
          regex,
          posix,
          input,
          output,
          match,
          isMatch,
        }
        if (typeof opts.onResult === 'function') {
          opts.onResult(result)
        }
        if (isMatch === false) {
          result.isMatch = false
          return returnObject ? result : false
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === 'function') {
            opts.onIgnore(result)
          }
          result.isMatch = false
          return returnObject ? result : false
        }
        if (typeof opts.onMatch === 'function') {
          opts.onMatch(result)
        }
        return returnObject ? result : true
      }
      if (returnState) {
        matcher.state = state
      }
      return matcher
    }
    picomatch.test = (input, regex, options3, { glob: glob2, posix } = {}) => {
      if (typeof input !== 'string') {
        throw new TypeError('Expected input to be a string')
      }
      if (input === '') {
        return { isMatch: false, output: '' }
      }
      const opts = options3 || {}
      const format2 = opts.format || (posix ? utils.toPosixSlashes : null)
      let match = input === glob2
      let output = match && format2 ? format2(input) : input
      if (match === false) {
        output = format2 ? format2(input) : input
        match = output === glob2
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch.matchBase(input, regex, options3, posix)
        } else {
          match = regex.exec(output)
        }
      }
      return { isMatch: Boolean(match), match, output }
    }
    picomatch.matchBase = (
      input,
      glob2,
      options3,
      posix = utils.isWindows(options3),
    ) => {
      const regex =
        glob2 instanceof RegExp ? glob2 : picomatch.makeRe(glob2, options3)
      return regex.test(path3.basename(input))
    }
    picomatch.isMatch = (str, patterns, options3) =>
      picomatch(patterns, options3)(str)
    picomatch.parse = (pattern, options3) => {
      if (Array.isArray(pattern))
        return pattern.map((p) => picomatch.parse(p, options3))
      return parse(pattern, { ...options3, fastpaths: false })
    }
    picomatch.scan = (input, options3) => scan(input, options3)
    picomatch.compileRe = (
      state,
      options3,
      returnOutput = false,
      returnState = false,
    ) => {
      if (returnOutput === true) {
        return state.output
      }
      const opts = options3 || {}
      const prepend = opts.contains ? '' : '^'
      const append = opts.contains ? '' : '$'
      let source = `${prepend}(?:${state.output})${append}`
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`
      }
      const regex = picomatch.toRegex(source, options3)
      if (returnState === true) {
        regex.state = state
      }
      return regex
    }
    picomatch.makeRe = (
      input,
      options3 = {},
      returnOutput = false,
      returnState = false,
    ) => {
      if (!input || typeof input !== 'string') {
        throw new TypeError('Expected a non-empty string')
      }
      let parsed = { negated: false, fastpaths: true }
      if (
        options3.fastpaths !== false &&
        (input[0] === '.' || input[0] === '*')
      ) {
        parsed.output = parse.fastpaths(input, options3)
      }
      if (!parsed.output) {
        parsed = parse(input, options3)
      }
      return picomatch.compileRe(parsed, options3, returnOutput, returnState)
    }
    picomatch.toRegex = (source, options3) => {
      try {
        const opts = options3 || {}
        return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''))
      } catch (err) {
        if (options3 && options3.debug === true) throw err
        return /$^/
      }
    }
    picomatch.constants = constants
    module2.exports = picomatch
  },
})

// ../../node_modules/.pnpm/picomatch@2.3.0/node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  '../../node_modules/.pnpm/picomatch@2.3.0/node_modules/picomatch/index.js'(
    exports,
    module2,
  ) {
    'use strict'
    module2.exports = require_picomatch()
  },
})

// ../../node_modules/.pnpm/micromatch@4.0.4/node_modules/micromatch/index.js
var require_micromatch = __commonJS({
  '../../node_modules/.pnpm/micromatch@4.0.4/node_modules/micromatch/index.js'(
    exports,
    module2,
  ) {
    'use strict'
    var util = require('util')
    var braces = require_braces()
    var picomatch = require_picomatch2()
    var utils = require_utils2()
    var isEmptyString = (val) => val === '' || val === './'
    var micromatch = (list, patterns, options3) => {
      patterns = [].concat(patterns)
      list = [].concat(list)
      let omit = /* @__PURE__ */ new Set()
      let keep = /* @__PURE__ */ new Set()
      let items = /* @__PURE__ */ new Set()
      let negatives = 0
      let onResult = (state) => {
        items.add(state.output)
        if (options3 && options3.onResult) {
          options3.onResult(state)
        }
      }
      for (let i = 0; i < patterns.length; i++) {
        let isMatch = picomatch(
          String(patterns[i]),
          { ...options3, onResult },
          true,
        )
        let negated = isMatch.state.negated || isMatch.state.negatedExtglob
        if (negated) negatives++
        for (let item of list) {
          let matched = isMatch(item, true)
          let match = negated ? !matched.isMatch : matched.isMatch
          if (!match) continue
          if (negated) {
            omit.add(matched.output)
          } else {
            omit.delete(matched.output)
            keep.add(matched.output)
          }
        }
      }
      let result = negatives === patterns.length ? [...items] : [...keep]
      let matches = result.filter((item) => !omit.has(item))
      if (options3 && matches.length === 0) {
        if (options3.failglob === true) {
          throw new Error(`No matches found for "${patterns.join(', ')}"`)
        }
        if (options3.nonull === true || options3.nullglob === true) {
          return options3.unescape
            ? patterns.map((p) => p.replace(/\\/g, ''))
            : patterns
        }
      }
      return matches
    }
    micromatch.match = micromatch
    micromatch.matcher = (pattern, options3) => picomatch(pattern, options3)
    micromatch.isMatch = (str, patterns, options3) =>
      picomatch(patterns, options3)(str)
    micromatch.any = micromatch.isMatch
    micromatch.not = (list, patterns, options3 = {}) => {
      patterns = [].concat(patterns).map(String)
      let result = /* @__PURE__ */ new Set()
      let items = []
      let onResult = (state) => {
        if (options3.onResult) options3.onResult(state)
        items.push(state.output)
      }
      let matches = micromatch(list, patterns, { ...options3, onResult })
      for (let item of items) {
        if (!matches.includes(item)) {
          result.add(item)
        }
      }
      return [...result]
    }
    micromatch.contains = (str, pattern, options3) => {
      if (typeof str !== 'string') {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`)
      }
      if (Array.isArray(pattern)) {
        return pattern.some((p) => micromatch.contains(str, p, options3))
      }
      if (typeof pattern === 'string') {
        if (isEmptyString(str) || isEmptyString(pattern)) {
          return false
        }
        if (
          str.includes(pattern) ||
          (str.startsWith('./') && str.slice(2).includes(pattern))
        ) {
          return true
        }
      }
      return micromatch.isMatch(str, pattern, { ...options3, contains: true })
    }
    micromatch.matchKeys = (obj, patterns, options3) => {
      if (!utils.isObject(obj)) {
        throw new TypeError('Expected the first argument to be an object')
      }
      let keys = micromatch(Object.keys(obj), patterns, options3)
      let res = {}
      for (let key of keys) res[key] = obj[key]
      return res
    }
    micromatch.some = (list, patterns, options3) => {
      let items = [].concat(list)
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options3)
        if (items.some((item) => isMatch(item))) {
          return true
        }
      }
      return false
    }
    micromatch.every = (list, patterns, options3) => {
      let items = [].concat(list)
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options3)
        if (!items.every((item) => isMatch(item))) {
          return false
        }
      }
      return true
    }
    micromatch.all = (str, patterns, options3) => {
      if (typeof str !== 'string') {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`)
      }
      return [].concat(patterns).every((p) => picomatch(p, options3)(str))
    }
    micromatch.capture = (glob2, input, options3) => {
      let posix = utils.isWindows(options3)
      let regex = picomatch.makeRe(String(glob2), {
        ...options3,
        capture: true,
      })
      let match = regex.exec(posix ? utils.toPosixSlashes(input) : input)
      if (match) {
        return match.slice(1).map((v) => (v === void 0 ? '' : v))
      }
    }
    micromatch.makeRe = (...args) => picomatch.makeRe(...args)
    micromatch.scan = (...args) => picomatch.scan(...args)
    micromatch.parse = (patterns, options3) => {
      let res = []
      for (let pattern of [].concat(patterns || [])) {
        for (let str of braces(String(pattern), options3)) {
          res.push(picomatch.parse(str, options3))
        }
      }
      return res
    }
    micromatch.braces = (pattern, options3) => {
      if (typeof pattern !== 'string') throw new TypeError('Expected a string')
      if ((options3 && options3.nobrace === true) || !/\{.*\}/.test(pattern)) {
        return [pattern]
      }
      return braces(pattern, options3)
    }
    micromatch.braceExpand = (pattern, options3) => {
      if (typeof pattern !== 'string') throw new TypeError('Expected a string')
      return micromatch.braces(pattern, { ...options3, expand: true })
    }
    module2.exports = micromatch
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/utils/pattern.js
var require_pattern = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/utils/pattern.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.matchAny =
      exports.convertPatternsToRe =
      exports.makeRe =
      exports.getPatternParts =
      exports.expandBraceExpansion =
      exports.expandPatternsWithBraceExpansion =
      exports.isAffectDepthOfReadingPattern =
      exports.endsWithSlashGlobStar =
      exports.hasGlobStar =
      exports.getBaseDirectory =
      exports.isPatternRelatedToParentDirectory =
      exports.getPatternsOutsideCurrentDirectory =
      exports.getPatternsInsideCurrentDirectory =
      exports.getPositivePatterns =
      exports.getNegativePatterns =
      exports.isPositivePattern =
      exports.isNegativePattern =
      exports.convertToNegativePattern =
      exports.convertToPositivePattern =
      exports.isDynamicPattern =
      exports.isStaticPattern =
        void 0
    var path3 = require('path')
    var globParent = require_glob_parent()
    var micromatch = require_micromatch()
    var GLOBSTAR = '**'
    var ESCAPE_SYMBOL = '\\'
    var COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/
    var REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[.*]/
    var REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\(.*\|.*\)/
    var GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\(.*\)/
    var BRACE_EXPANSIONS_SYMBOLS_RE = /{.*(?:,|\.\.).*}/
    function isStaticPattern(pattern, options3 = {}) {
      return !isDynamicPattern(pattern, options3)
    }
    exports.isStaticPattern = isStaticPattern
    function isDynamicPattern(pattern, options3 = {}) {
      if (pattern === '') {
        return false
      }
      if (
        options3.caseSensitiveMatch === false ||
        pattern.includes(ESCAPE_SYMBOL)
      ) {
        return true
      }
      if (
        COMMON_GLOB_SYMBOLS_RE.test(pattern) ||
        REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) ||
        REGEX_GROUP_SYMBOLS_RE.test(pattern)
      ) {
        return true
      }
      if (
        options3.extglob !== false &&
        GLOB_EXTENSION_SYMBOLS_RE.test(pattern)
      ) {
        return true
      }
      if (
        options3.braceExpansion !== false &&
        BRACE_EXPANSIONS_SYMBOLS_RE.test(pattern)
      ) {
        return true
      }
      return false
    }
    exports.isDynamicPattern = isDynamicPattern
    function convertToPositivePattern(pattern) {
      return isNegativePattern(pattern) ? pattern.slice(1) : pattern
    }
    exports.convertToPositivePattern = convertToPositivePattern
    function convertToNegativePattern(pattern) {
      return '!' + pattern
    }
    exports.convertToNegativePattern = convertToNegativePattern
    function isNegativePattern(pattern) {
      return pattern.startsWith('!') && pattern[1] !== '('
    }
    exports.isNegativePattern = isNegativePattern
    function isPositivePattern(pattern) {
      return !isNegativePattern(pattern)
    }
    exports.isPositivePattern = isPositivePattern
    function getNegativePatterns(patterns) {
      return patterns.filter(isNegativePattern)
    }
    exports.getNegativePatterns = getNegativePatterns
    function getPositivePatterns(patterns) {
      return patterns.filter(isPositivePattern)
    }
    exports.getPositivePatterns = getPositivePatterns
    function getPatternsInsideCurrentDirectory(patterns) {
      return patterns.filter(
        (pattern) => !isPatternRelatedToParentDirectory(pattern),
      )
    }
    exports.getPatternsInsideCurrentDirectory =
      getPatternsInsideCurrentDirectory
    function getPatternsOutsideCurrentDirectory(patterns) {
      return patterns.filter(isPatternRelatedToParentDirectory)
    }
    exports.getPatternsOutsideCurrentDirectory =
      getPatternsOutsideCurrentDirectory
    function isPatternRelatedToParentDirectory(pattern) {
      return pattern.startsWith('..') || pattern.startsWith('./..')
    }
    exports.isPatternRelatedToParentDirectory =
      isPatternRelatedToParentDirectory
    function getBaseDirectory(pattern) {
      return globParent(pattern, { flipBackslashes: false })
    }
    exports.getBaseDirectory = getBaseDirectory
    function hasGlobStar(pattern) {
      return pattern.includes(GLOBSTAR)
    }
    exports.hasGlobStar = hasGlobStar
    function endsWithSlashGlobStar(pattern) {
      return pattern.endsWith('/' + GLOBSTAR)
    }
    exports.endsWithSlashGlobStar = endsWithSlashGlobStar
    function isAffectDepthOfReadingPattern(pattern) {
      const basename = path3.basename(pattern)
      return endsWithSlashGlobStar(pattern) || isStaticPattern(basename)
    }
    exports.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern
    function expandPatternsWithBraceExpansion(patterns) {
      return patterns.reduce((collection, pattern) => {
        return collection.concat(expandBraceExpansion(pattern))
      }, [])
    }
    exports.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion
    function expandBraceExpansion(pattern) {
      return micromatch.braces(pattern, {
        expand: true,
        nodupes: true,
      })
    }
    exports.expandBraceExpansion = expandBraceExpansion
    function getPatternParts(pattern, options3) {
      let { parts } = micromatch.scan(
        pattern,
        Object.assign(Object.assign({}, options3), { parts: true }),
      )
      if (parts.length === 0) {
        parts = [pattern]
      }
      if (parts[0].startsWith('/')) {
        parts[0] = parts[0].slice(1)
        parts.unshift('')
      }
      return parts
    }
    exports.getPatternParts = getPatternParts
    function makeRe(pattern, options3) {
      return micromatch.makeRe(pattern, options3)
    }
    exports.makeRe = makeRe
    function convertPatternsToRe(patterns, options3) {
      return patterns.map((pattern) => makeRe(pattern, options3))
    }
    exports.convertPatternsToRe = convertPatternsToRe
    function matchAny(entry, patternsRe) {
      return patternsRe.some((patternRe) => patternRe.test(entry))
    }
    exports.matchAny = matchAny
  },
})

// ../../node_modules/.pnpm/merge2@1.4.1/node_modules/merge2/index.js
var require_merge2 = __commonJS({
  '../../node_modules/.pnpm/merge2@1.4.1/node_modules/merge2/index.js'(
    exports,
    module2,
  ) {
    'use strict'
    var Stream = require('stream')
    var PassThrough = Stream.PassThrough
    var slice = Array.prototype.slice
    module2.exports = merge2
    function merge2() {
      const streamsQueue = []
      const args = slice.call(arguments)
      let merging = false
      let options3 = args[args.length - 1]
      if (options3 && !Array.isArray(options3) && options3.pipe == null) {
        args.pop()
      } else {
        options3 = {}
      }
      const doEnd = options3.end !== false
      const doPipeError = options3.pipeError === true
      if (options3.objectMode == null) {
        options3.objectMode = true
      }
      if (options3.highWaterMark == null) {
        options3.highWaterMark = 64 * 1024
      }
      const mergedStream = PassThrough(options3)
      function addStream() {
        for (let i = 0, len = arguments.length; i < len; i++) {
          streamsQueue.push(pauseStreams(arguments[i], options3))
        }
        mergeStream()
        return this
      }
      function mergeStream() {
        if (merging) {
          return
        }
        merging = true
        let streams = streamsQueue.shift()
        if (!streams) {
          process.nextTick(endStream)
          return
        }
        if (!Array.isArray(streams)) {
          streams = [streams]
        }
        let pipesCount = streams.length + 1
        function next() {
          if (--pipesCount > 0) {
            return
          }
          merging = false
          mergeStream()
        }
        function pipe(stream) {
          function onend() {
            stream.removeListener('merge2UnpipeEnd', onend)
            stream.removeListener('end', onend)
            if (doPipeError) {
              stream.removeListener('error', onerror)
            }
            next()
          }
          function onerror(err) {
            mergedStream.emit('error', err)
          }
          if (stream._readableState.endEmitted) {
            return next()
          }
          stream.on('merge2UnpipeEnd', onend)
          stream.on('end', onend)
          if (doPipeError) {
            stream.on('error', onerror)
          }
          stream.pipe(mergedStream, { end: false })
          stream.resume()
        }
        for (let i = 0; i < streams.length; i++) {
          pipe(streams[i])
        }
        next()
      }
      function endStream() {
        merging = false
        mergedStream.emit('queueDrain')
        if (doEnd) {
          mergedStream.end()
        }
      }
      mergedStream.setMaxListeners(0)
      mergedStream.add = addStream
      mergedStream.on('unpipe', function (stream) {
        stream.emit('merge2UnpipeEnd')
      })
      if (args.length) {
        addStream.apply(null, args)
      }
      return mergedStream
    }
    function pauseStreams(streams, options3) {
      if (!Array.isArray(streams)) {
        if (!streams._readableState && streams.pipe) {
          streams = streams.pipe(PassThrough(options3))
        }
        if (!streams._readableState || !streams.pause || !streams.pipe) {
          throw new Error('Only readable stream can be merged.')
        }
        streams.pause()
      } else {
        for (let i = 0, len = streams.length; i < len; i++) {
          streams[i] = pauseStreams(streams[i], options3)
        }
      }
      return streams
    }
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/utils/stream.js
var require_stream = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/utils/stream.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.merge = void 0
    var merge2 = require_merge2()
    function merge(streams) {
      const mergedStream = merge2(streams)
      streams.forEach((stream) => {
        stream.once('error', (error) => mergedStream.emit('error', error))
      })
      mergedStream.once('close', () => propagateCloseEventToSources(streams))
      mergedStream.once('end', () => propagateCloseEventToSources(streams))
      return mergedStream
    }
    exports.merge = merge
    function propagateCloseEventToSources(streams) {
      streams.forEach((stream) => stream.emit('close'))
    }
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/utils/string.js
var require_string = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/utils/string.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.isEmpty = exports.isString = void 0
    function isString(input) {
      return typeof input === 'string'
    }
    exports.isString = isString
    function isEmpty(input) {
      return input === ''
    }
    exports.isEmpty = isEmpty
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/utils/index.js
var require_utils3 = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/utils/index.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.string =
      exports.stream =
      exports.pattern =
      exports.path =
      exports.fs =
      exports.errno =
      exports.array =
        void 0
    var array = require_array()
    exports.array = array
    var errno = require_errno()
    exports.errno = errno
    var fs2 = require_fs()
    exports.fs = fs2
    var path3 = require_path()
    exports.path = path3
    var pattern = require_pattern()
    exports.pattern = pattern
    var stream = require_stream()
    exports.stream = stream
    var string = require_string()
    exports.string = string
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/managers/tasks.js
var require_tasks = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/managers/tasks.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.convertPatternGroupToTask =
      exports.convertPatternGroupsToTasks =
      exports.groupPatternsByBaseDirectory =
      exports.getNegativePatternsAsPositive =
      exports.getPositivePatterns =
      exports.convertPatternsToTasks =
      exports.generate =
        void 0
    var utils = require_utils3()
    function generate(patterns, settings) {
      const positivePatterns = getPositivePatterns(patterns)
      const negativePatterns = getNegativePatternsAsPositive(
        patterns,
        settings.ignore,
      )
      const staticPatterns = positivePatterns.filter((pattern) =>
        utils.pattern.isStaticPattern(pattern, settings),
      )
      const dynamicPatterns = positivePatterns.filter((pattern) =>
        utils.pattern.isDynamicPattern(pattern, settings),
      )
      const staticTasks = convertPatternsToTasks(
        staticPatterns,
        negativePatterns,
        false,
      )
      const dynamicTasks = convertPatternsToTasks(
        dynamicPatterns,
        negativePatterns,
        true,
      )
      return staticTasks.concat(dynamicTasks)
    }
    exports.generate = generate
    function convertPatternsToTasks(positive, negative, dynamic) {
      const tasks = []
      const patternsOutsideCurrentDirectory =
        utils.pattern.getPatternsOutsideCurrentDirectory(positive)
      const patternsInsideCurrentDirectory =
        utils.pattern.getPatternsInsideCurrentDirectory(positive)
      const outsideCurrentDirectoryGroup = groupPatternsByBaseDirectory(
        patternsOutsideCurrentDirectory,
      )
      const insideCurrentDirectoryGroup = groupPatternsByBaseDirectory(
        patternsInsideCurrentDirectory,
      )
      tasks.push(
        ...convertPatternGroupsToTasks(
          outsideCurrentDirectoryGroup,
          negative,
          dynamic,
        ),
      )
      if ('.' in insideCurrentDirectoryGroup) {
        tasks.push(
          convertPatternGroupToTask(
            '.',
            patternsInsideCurrentDirectory,
            negative,
            dynamic,
          ),
        )
      } else {
        tasks.push(
          ...convertPatternGroupsToTasks(
            insideCurrentDirectoryGroup,
            negative,
            dynamic,
          ),
        )
      }
      return tasks
    }
    exports.convertPatternsToTasks = convertPatternsToTasks
    function getPositivePatterns(patterns) {
      return utils.pattern.getPositivePatterns(patterns)
    }
    exports.getPositivePatterns = getPositivePatterns
    function getNegativePatternsAsPositive(patterns, ignore) {
      const negative = utils.pattern
        .getNegativePatterns(patterns)
        .concat(ignore)
      const positive = negative.map(utils.pattern.convertToPositivePattern)
      return positive
    }
    exports.getNegativePatternsAsPositive = getNegativePatternsAsPositive
    function groupPatternsByBaseDirectory(patterns) {
      const group = {}
      return patterns.reduce((collection, pattern) => {
        const base = utils.pattern.getBaseDirectory(pattern)
        if (base in collection) {
          collection[base].push(pattern)
        } else {
          collection[base] = [pattern]
        }
        return collection
      }, group)
    }
    exports.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory
    function convertPatternGroupsToTasks(positive, negative, dynamic) {
      return Object.keys(positive).map((base) => {
        return convertPatternGroupToTask(
          base,
          positive[base],
          negative,
          dynamic,
        )
      })
    }
    exports.convertPatternGroupsToTasks = convertPatternGroupsToTasks
    function convertPatternGroupToTask(base, positive, negative, dynamic) {
      return {
        dynamic,
        positive,
        negative,
        base,
        patterns: [].concat(
          positive,
          negative.map(utils.pattern.convertToNegativePattern),
        ),
      }
    }
    exports.convertPatternGroupToTask = convertPatternGroupToTask
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/providers/async.js
var require_async = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/providers/async.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.read = void 0
    function read(path3, settings, callback) {
      settings.fs.lstat(path3, (lstatError, lstat) => {
        if (lstatError !== null) {
          callFailureCallback(callback, lstatError)
          return
        }
        if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
          callSuccessCallback(callback, lstat)
          return
        }
        settings.fs.stat(path3, (statError, stat) => {
          if (statError !== null) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              callFailureCallback(callback, statError)
              return
            }
            callSuccessCallback(callback, lstat)
            return
          }
          if (settings.markSymbolicLink) {
            stat.isSymbolicLink = () => true
          }
          callSuccessCallback(callback, stat)
        })
      })
    }
    exports.read = read
    function callFailureCallback(callback, error) {
      callback(error)
    }
    function callSuccessCallback(callback, result) {
      callback(null, result)
    }
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/providers/sync.js
var require_sync = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/providers/sync.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.read = void 0
    function read(path3, settings) {
      const lstat = settings.fs.lstatSync(path3)
      if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
        return lstat
      }
      try {
        const stat = settings.fs.statSync(path3)
        if (settings.markSymbolicLink) {
          stat.isSymbolicLink = () => true
        }
        return stat
      } catch (error) {
        if (!settings.throwErrorOnBrokenSymbolicLink) {
          return lstat
        }
        throw error
      }
    }
    exports.read = read
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/adapters/fs.js
var require_fs2 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/adapters/fs.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0
    var fs2 = require('fs')
    exports.FILE_SYSTEM_ADAPTER = {
      lstat: fs2.lstat,
      stat: fs2.stat,
      lstatSync: fs2.lstatSync,
      statSync: fs2.statSync,
    }
    function createFileSystemAdapter(fsMethods) {
      if (fsMethods === void 0) {
        return exports.FILE_SYSTEM_ADAPTER
      }
      return Object.assign(
        Object.assign({}, exports.FILE_SYSTEM_ADAPTER),
        fsMethods,
      )
    }
    exports.createFileSystemAdapter = createFileSystemAdapter
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/settings.js
var require_settings = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/settings.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var fs2 = require_fs2()
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options
        this.followSymbolicLink = this._getValue(
          this._options.followSymbolicLink,
          true,
        )
        this.fs = fs2.createFileSystemAdapter(this._options.fs)
        this.markSymbolicLink = this._getValue(
          this._options.markSymbolicLink,
          false,
        )
        this.throwErrorOnBrokenSymbolicLink = this._getValue(
          this._options.throwErrorOnBrokenSymbolicLink,
          true,
        )
      }
      _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value
      }
    }
    exports.default = Settings
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/index.js
var require_out = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.stat@2.0.5/node_modules/@nodelib/fs.stat/out/index.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.statSync = exports.stat = exports.Settings = void 0
    var async = require_async()
    var sync = require_sync()
    var settings_1 = require_settings()
    exports.Settings = settings_1.default
    function stat(path3, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback === 'function') {
        async.read(path3, getSettings(), optionsOrSettingsOrCallback)
        return
      }
      async.read(path3, getSettings(optionsOrSettingsOrCallback), callback)
    }
    exports.stat = stat
    function statSync(path3, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings)
      return sync.read(path3, settings)
    }
    exports.statSync = statSync
    function getSettings(settingsOrOptions = {}) {
      if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions
      }
      return new settings_1.default(settingsOrOptions)
    }
  },
})

// ../../node_modules/.pnpm/queue-microtask@1.2.3/node_modules/queue-microtask/index.js
var require_queue_microtask = __commonJS({
  '../../node_modules/.pnpm/queue-microtask@1.2.3/node_modules/queue-microtask/index.js'(
    exports,
    module2,
  ) {
    var promise
    module2.exports =
      typeof queueMicrotask === 'function'
        ? queueMicrotask.bind(typeof window !== 'undefined' ? window : global)
        : (cb) =>
            (promise || (promise = Promise.resolve())).then(cb).catch((err) =>
              setTimeout(() => {
                throw err
              }, 0),
            )
  },
})

// ../../node_modules/.pnpm/run-parallel@1.2.0/node_modules/run-parallel/index.js
var require_run_parallel = __commonJS({
  '../../node_modules/.pnpm/run-parallel@1.2.0/node_modules/run-parallel/index.js'(
    exports,
    module2,
  ) {
    module2.exports = runParallel
    var queueMicrotask2 = require_queue_microtask()
    function runParallel(tasks, cb) {
      let results, pending, keys
      let isSync = true
      if (Array.isArray(tasks)) {
        results = []
        pending = tasks.length
      } else {
        keys = Object.keys(tasks)
        results = {}
        pending = keys.length
      }
      function done(err) {
        function end() {
          if (cb) cb(err, results)
          cb = null
        }
        if (isSync) queueMicrotask2(end)
        else end()
      }
      function each(i, err, result) {
        results[i] = result
        if (--pending === 0 || err) {
          done(err)
        }
      }
      if (!pending) {
        done(null)
      } else if (keys) {
        keys.forEach(function (key) {
          tasks[key](function (err, result) {
            each(key, err, result)
          })
        })
      } else {
        tasks.forEach(function (task2, i) {
          task2(function (err, result) {
            each(i, err, result)
          })
        })
      }
      isSync = false
    }
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/constants.js
var require_constants3 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/constants.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0
    var NODE_PROCESS_VERSION_PARTS = process.versions.node.split('.')
    if (
      NODE_PROCESS_VERSION_PARTS[0] === void 0 ||
      NODE_PROCESS_VERSION_PARTS[1] === void 0
    ) {
      throw new Error(
        `Unexpected behavior. The 'process.versions.node' variable has invalid value: ${process.versions.node}`,
      )
    }
    var MAJOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[0], 10)
    var MINOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[1], 10)
    var SUPPORTED_MAJOR_VERSION = 10
    var SUPPORTED_MINOR_VERSION = 10
    var IS_MATCHED_BY_MAJOR = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION
    var IS_MATCHED_BY_MAJOR_AND_MINOR =
      MAJOR_VERSION === SUPPORTED_MAJOR_VERSION &&
      MINOR_VERSION >= SUPPORTED_MINOR_VERSION
    exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES =
      IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/utils/fs.js
var require_fs3 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/utils/fs.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.createDirentFromStats = void 0
    var DirentFromStats = class {
      constructor(name, stats) {
        this.name = name
        this.isBlockDevice = stats.isBlockDevice.bind(stats)
        this.isCharacterDevice = stats.isCharacterDevice.bind(stats)
        this.isDirectory = stats.isDirectory.bind(stats)
        this.isFIFO = stats.isFIFO.bind(stats)
        this.isFile = stats.isFile.bind(stats)
        this.isSocket = stats.isSocket.bind(stats)
        this.isSymbolicLink = stats.isSymbolicLink.bind(stats)
      }
    }
    function createDirentFromStats(name, stats) {
      return new DirentFromStats(name, stats)
    }
    exports.createDirentFromStats = createDirentFromStats
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/utils/index.js
var require_utils4 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/utils/index.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.fs = void 0
    var fs2 = require_fs3()
    exports.fs = fs2
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/providers/common.js
var require_common = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/providers/common.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.joinPathSegments = void 0
    function joinPathSegments(a, b, separator) {
      if (a.endsWith(separator)) {
        return a + b
      }
      return a + separator + b
    }
    exports.joinPathSegments = joinPathSegments
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/providers/async.js
var require_async2 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/providers/async.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.readdir = exports.readdirWithFileTypes = exports.read = void 0
    var fsStat = require_out()
    var rpl = require_run_parallel()
    var constants_1 = require_constants3()
    var utils = require_utils4()
    var common = require_common()
    function read(directory, settings, callback) {
      if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        readdirWithFileTypes(directory, settings, callback)
        return
      }
      readdir(directory, settings, callback)
    }
    exports.read = read
    function readdirWithFileTypes(directory, settings, callback) {
      settings.fs.readdir(
        directory,
        { withFileTypes: true },
        (readdirError, dirents) => {
          if (readdirError !== null) {
            callFailureCallback(callback, readdirError)
            return
          }
          const entries2 = dirents.map((dirent) => ({
            dirent,
            name: dirent.name,
            path: common.joinPathSegments(
              directory,
              dirent.name,
              settings.pathSegmentSeparator,
            ),
          }))
          if (!settings.followSymbolicLinks) {
            callSuccessCallback(callback, entries2)
            return
          }
          const tasks = entries2.map((entry) =>
            makeRplTaskEntry(entry, settings),
          )
          rpl(tasks, (rplError, rplEntries) => {
            if (rplError !== null) {
              callFailureCallback(callback, rplError)
              return
            }
            callSuccessCallback(callback, rplEntries)
          })
        },
      )
    }
    exports.readdirWithFileTypes = readdirWithFileTypes
    function makeRplTaskEntry(entry, settings) {
      return (done) => {
        if (!entry.dirent.isSymbolicLink()) {
          done(null, entry)
          return
        }
        settings.fs.stat(entry.path, (statError, stats) => {
          if (statError !== null) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              done(statError)
              return
            }
            done(null, entry)
            return
          }
          entry.dirent = utils.fs.createDirentFromStats(entry.name, stats)
          done(null, entry)
        })
      }
    }
    function readdir(directory, settings, callback) {
      settings.fs.readdir(directory, (readdirError, names) => {
        if (readdirError !== null) {
          callFailureCallback(callback, readdirError)
          return
        }
        const tasks = names.map((name) => {
          const path3 = common.joinPathSegments(
            directory,
            name,
            settings.pathSegmentSeparator,
          )
          return (done) => {
            fsStat.stat(path3, settings.fsStatSettings, (error, stats) => {
              if (error !== null) {
                done(error)
                return
              }
              const entry = {
                name,
                path: path3,
                dirent: utils.fs.createDirentFromStats(name, stats),
              }
              if (settings.stats) {
                entry.stats = stats
              }
              done(null, entry)
            })
          }
        })
        rpl(tasks, (rplError, entries2) => {
          if (rplError !== null) {
            callFailureCallback(callback, rplError)
            return
          }
          callSuccessCallback(callback, entries2)
        })
      })
    }
    exports.readdir = readdir
    function callFailureCallback(callback, error) {
      callback(error)
    }
    function callSuccessCallback(callback, result) {
      callback(null, result)
    }
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/providers/sync.js
var require_sync2 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/providers/sync.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.readdir = exports.readdirWithFileTypes = exports.read = void 0
    var fsStat = require_out()
    var constants_1 = require_constants3()
    var utils = require_utils4()
    var common = require_common()
    function read(directory, settings) {
      if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        return readdirWithFileTypes(directory, settings)
      }
      return readdir(directory, settings)
    }
    exports.read = read
    function readdirWithFileTypes(directory, settings) {
      const dirents = settings.fs.readdirSync(directory, {
        withFileTypes: true,
      })
      return dirents.map((dirent) => {
        const entry = {
          dirent,
          name: dirent.name,
          path: common.joinPathSegments(
            directory,
            dirent.name,
            settings.pathSegmentSeparator,
          ),
        }
        if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks) {
          try {
            const stats = settings.fs.statSync(entry.path)
            entry.dirent = utils.fs.createDirentFromStats(entry.name, stats)
          } catch (error) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              throw error
            }
          }
        }
        return entry
      })
    }
    exports.readdirWithFileTypes = readdirWithFileTypes
    function readdir(directory, settings) {
      const names = settings.fs.readdirSync(directory)
      return names.map((name) => {
        const entryPath = common.joinPathSegments(
          directory,
          name,
          settings.pathSegmentSeparator,
        )
        const stats = fsStat.statSync(entryPath, settings.fsStatSettings)
        const entry = {
          name,
          path: entryPath,
          dirent: utils.fs.createDirentFromStats(name, stats),
        }
        if (settings.stats) {
          entry.stats = stats
        }
        return entry
      })
    }
    exports.readdir = readdir
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/adapters/fs.js
var require_fs4 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/adapters/fs.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0
    var fs2 = require('fs')
    exports.FILE_SYSTEM_ADAPTER = {
      lstat: fs2.lstat,
      stat: fs2.stat,
      lstatSync: fs2.lstatSync,
      statSync: fs2.statSync,
      readdir: fs2.readdir,
      readdirSync: fs2.readdirSync,
    }
    function createFileSystemAdapter(fsMethods) {
      if (fsMethods === void 0) {
        return exports.FILE_SYSTEM_ADAPTER
      }
      return Object.assign(
        Object.assign({}, exports.FILE_SYSTEM_ADAPTER),
        fsMethods,
      )
    }
    exports.createFileSystemAdapter = createFileSystemAdapter
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/settings.js
var require_settings2 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/settings.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var path3 = require('path')
    var fsStat = require_out()
    var fs2 = require_fs4()
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options
        this.followSymbolicLinks = this._getValue(
          this._options.followSymbolicLinks,
          false,
        )
        this.fs = fs2.createFileSystemAdapter(this._options.fs)
        this.pathSegmentSeparator = this._getValue(
          this._options.pathSegmentSeparator,
          path3.sep,
        )
        this.stats = this._getValue(this._options.stats, false)
        this.throwErrorOnBrokenSymbolicLink = this._getValue(
          this._options.throwErrorOnBrokenSymbolicLink,
          true,
        )
        this.fsStatSettings = new fsStat.Settings({
          followSymbolicLink: this.followSymbolicLinks,
          fs: this.fs,
          throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink,
        })
      }
      _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value
      }
    }
    exports.default = Settings
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/index.js
var require_out2 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.scandir@2.1.5/node_modules/@nodelib/fs.scandir/out/index.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.Settings = exports.scandirSync = exports.scandir = void 0
    var async = require_async2()
    var sync = require_sync2()
    var settings_1 = require_settings2()
    exports.Settings = settings_1.default
    function scandir(path3, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback === 'function') {
        async.read(path3, getSettings(), optionsOrSettingsOrCallback)
        return
      }
      async.read(path3, getSettings(optionsOrSettingsOrCallback), callback)
    }
    exports.scandir = scandir
    function scandirSync(path3, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings)
      return sync.read(path3, settings)
    }
    exports.scandirSync = scandirSync
    function getSettings(settingsOrOptions = {}) {
      if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions
      }
      return new settings_1.default(settingsOrOptions)
    }
  },
})

// ../../node_modules/.pnpm/reusify@1.0.4/node_modules/reusify/reusify.js
var require_reusify = __commonJS({
  '../../node_modules/.pnpm/reusify@1.0.4/node_modules/reusify/reusify.js'(
    exports,
    module2,
  ) {
    'use strict'
    function reusify(Constructor) {
      var head = new Constructor()
      var tail = head
      function get() {
        var current = head
        if (current.next) {
          head = current.next
        } else {
          head = new Constructor()
          tail = head
        }
        current.next = null
        return current
      }
      function release(obj) {
        tail.next = obj
        tail = obj
      }
      return {
        get,
        release,
      }
    }
    module2.exports = reusify
  },
})

// ../../node_modules/.pnpm/fastq@1.13.0/node_modules/fastq/queue.js
var require_queue = __commonJS({
  '../../node_modules/.pnpm/fastq@1.13.0/node_modules/fastq/queue.js'(
    exports,
    module2,
  ) {
    'use strict'
    var reusify = require_reusify()
    function fastqueue(context, worker, concurrency) {
      if (typeof context === 'function') {
        concurrency = worker
        worker = context
        context = null
      }
      if (concurrency < 1) {
        throw new Error('fastqueue concurrency must be greater than 1')
      }
      var cache = reusify(Task)
      var queueHead = null
      var queueTail = null
      var _running = 0
      var errorHandler = null
      var self2 = {
        push,
        drain: noop,
        saturated: noop,
        pause,
        paused: false,
        concurrency,
        running,
        resume,
        idle,
        length,
        getQueue,
        unshift,
        empty: noop,
        kill,
        killAndDrain,
        error,
      }
      return self2
      function running() {
        return _running
      }
      function pause() {
        self2.paused = true
      }
      function length() {
        var current = queueHead
        var counter = 0
        while (current) {
          current = current.next
          counter++
        }
        return counter
      }
      function getQueue() {
        var current = queueHead
        var tasks = []
        while (current) {
          tasks.push(current.value)
          current = current.next
        }
        return tasks
      }
      function resume() {
        if (!self2.paused) return
        self2.paused = false
        for (var i = 0; i < self2.concurrency; i++) {
          _running++
          release()
        }
      }
      function idle() {
        return _running === 0 && self2.length() === 0
      }
      function push(value, done) {
        var current = cache.get()
        current.context = context
        current.release = release
        current.value = value
        current.callback = done || noop
        current.errorHandler = errorHandler
        if (_running === self2.concurrency || self2.paused) {
          if (queueTail) {
            queueTail.next = current
            queueTail = current
          } else {
            queueHead = current
            queueTail = current
            self2.saturated()
          }
        } else {
          _running++
          worker.call(context, current.value, current.worked)
        }
      }
      function unshift(value, done) {
        var current = cache.get()
        current.context = context
        current.release = release
        current.value = value
        current.callback = done || noop
        if (_running === self2.concurrency || self2.paused) {
          if (queueHead) {
            current.next = queueHead
            queueHead = current
          } else {
            queueHead = current
            queueTail = current
            self2.saturated()
          }
        } else {
          _running++
          worker.call(context, current.value, current.worked)
        }
      }
      function release(holder) {
        if (holder) {
          cache.release(holder)
        }
        var next = queueHead
        if (next) {
          if (!self2.paused) {
            if (queueTail === queueHead) {
              queueTail = null
            }
            queueHead = next.next
            next.next = null
            worker.call(context, next.value, next.worked)
            if (queueTail === null) {
              self2.empty()
            }
          } else {
            _running--
          }
        } else if (--_running === 0) {
          self2.drain()
        }
      }
      function kill() {
        queueHead = null
        queueTail = null
        self2.drain = noop
      }
      function killAndDrain() {
        queueHead = null
        queueTail = null
        self2.drain()
        self2.drain = noop
      }
      function error(handler) {
        errorHandler = handler
      }
    }
    function noop() {}
    function Task() {
      this.value = null
      this.callback = noop
      this.next = null
      this.release = noop
      this.context = null
      this.errorHandler = null
      var self2 = this
      this.worked = function worked(err, result) {
        var callback = self2.callback
        var errorHandler = self2.errorHandler
        var val = self2.value
        self2.value = null
        self2.callback = noop
        if (self2.errorHandler) {
          errorHandler(err, val)
        }
        callback.call(self2.context, err, result)
        self2.release(self2)
      }
    }
    function queueAsPromised(context, worker, concurrency) {
      if (typeof context === 'function') {
        concurrency = worker
        worker = context
        context = null
      }
      function asyncWrapper(arg, cb) {
        worker.call(this, arg).then(function (res) {
          cb(null, res)
        }, cb)
      }
      var queue = fastqueue(context, asyncWrapper, concurrency)
      var pushCb = queue.push
      var unshiftCb = queue.unshift
      queue.push = push
      queue.unshift = unshift
      queue.drained = drained
      return queue
      function push(value) {
        var p = new Promise(function (resolve, reject) {
          pushCb(value, function (err, result) {
            if (err) {
              reject(err)
              return
            }
            resolve(result)
          })
        })
        p.catch(noop)
        return p
      }
      function unshift(value) {
        var p = new Promise(function (resolve, reject) {
          unshiftCb(value, function (err, result) {
            if (err) {
              reject(err)
              return
            }
            resolve(result)
          })
        })
        p.catch(noop)
        return p
      }
      function drained() {
        var previousDrain = queue.drain
        var p = new Promise(function (resolve) {
          queue.drain = function () {
            previousDrain()
            resolve()
          }
        })
        return p
      }
    }
    module2.exports = fastqueue
    module2.exports.promise = queueAsPromised
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/readers/common.js
var require_common2 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/readers/common.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.joinPathSegments =
      exports.replacePathSegmentSeparator =
      exports.isAppliedFilter =
      exports.isFatalError =
        void 0
    function isFatalError(settings, error) {
      if (settings.errorFilter === null) {
        return true
      }
      return !settings.errorFilter(error)
    }
    exports.isFatalError = isFatalError
    function isAppliedFilter(filter, value) {
      return filter === null || filter(value)
    }
    exports.isAppliedFilter = isAppliedFilter
    function replacePathSegmentSeparator(filepath, separator) {
      return filepath.split(/[/\\]/).join(separator)
    }
    exports.replacePathSegmentSeparator = replacePathSegmentSeparator
    function joinPathSegments(a, b, separator) {
      if (a === '') {
        return b
      }
      if (a.endsWith(separator)) {
        return a + b
      }
      return a + separator + b
    }
    exports.joinPathSegments = joinPathSegments
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/readers/reader.js
var require_reader = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/readers/reader.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var common = require_common2()
    var Reader = class {
      constructor(_root, _settings) {
        this._root = _root
        this._settings = _settings
        this._root = common.replacePathSegmentSeparator(
          _root,
          _settings.pathSegmentSeparator,
        )
      }
    }
    exports.default = Reader
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/readers/async.js
var require_async3 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/readers/async.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var events_1 = require('events')
    var fsScandir = require_out2()
    var fastq = require_queue()
    var common = require_common2()
    var reader_1 = require_reader()
    var AsyncReader = class extends reader_1.default {
      constructor(_root, _settings) {
        super(_root, _settings)
        this._settings = _settings
        this._scandir = fsScandir.scandir
        this._emitter = new events_1.EventEmitter()
        this._queue = fastq(this._worker.bind(this), this._settings.concurrency)
        this._isFatalError = false
        this._isDestroyed = false
        this._queue.drain = () => {
          if (!this._isFatalError) {
            this._emitter.emit('end')
          }
        }
      }
      read() {
        this._isFatalError = false
        this._isDestroyed = false
        setImmediate(() => {
          this._pushToQueue(this._root, this._settings.basePath)
        })
        return this._emitter
      }
      get isDestroyed() {
        return this._isDestroyed
      }
      destroy() {
        if (this._isDestroyed) {
          throw new Error('The reader is already destroyed')
        }
        this._isDestroyed = true
        this._queue.killAndDrain()
      }
      onEntry(callback) {
        this._emitter.on('entry', callback)
      }
      onError(callback) {
        this._emitter.once('error', callback)
      }
      onEnd(callback) {
        this._emitter.once('end', callback)
      }
      _pushToQueue(directory, base) {
        const queueItem = { directory, base }
        this._queue.push(queueItem, (error) => {
          if (error !== null) {
            this._handleError(error)
          }
        })
      }
      _worker(item, done) {
        this._scandir(
          item.directory,
          this._settings.fsScandirSettings,
          (error, entries2) => {
            if (error !== null) {
              done(error, void 0)
              return
            }
            for (const entry of entries2) {
              this._handleEntry(entry, item.base)
            }
            done(null, void 0)
          },
        )
      }
      _handleError(error) {
        if (this._isDestroyed || !common.isFatalError(this._settings, error)) {
          return
        }
        this._isFatalError = true
        this._isDestroyed = true
        this._emitter.emit('error', error)
      }
      _handleEntry(entry, base) {
        if (this._isDestroyed || this._isFatalError) {
          return
        }
        const fullpath = entry.path
        if (base !== void 0) {
          entry.path = common.joinPathSegments(
            base,
            entry.name,
            this._settings.pathSegmentSeparator,
          )
        }
        if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
          this._emitEntry(entry)
        }
        if (
          entry.dirent.isDirectory() &&
          common.isAppliedFilter(this._settings.deepFilter, entry)
        ) {
          this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path)
        }
      }
      _emitEntry(entry) {
        this._emitter.emit('entry', entry)
      }
    }
    exports.default = AsyncReader
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/providers/async.js
var require_async4 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/providers/async.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var async_1 = require_async3()
    var AsyncProvider = class {
      constructor(_root, _settings) {
        this._root = _root
        this._settings = _settings
        this._reader = new async_1.default(this._root, this._settings)
        this._storage = []
      }
      read(callback) {
        this._reader.onError((error) => {
          callFailureCallback(callback, error)
        })
        this._reader.onEntry((entry) => {
          this._storage.push(entry)
        })
        this._reader.onEnd(() => {
          callSuccessCallback(callback, this._storage)
        })
        this._reader.read()
      }
    }
    exports.default = AsyncProvider
    function callFailureCallback(callback, error) {
      callback(error)
    }
    function callSuccessCallback(callback, entries2) {
      callback(null, entries2)
    }
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/providers/stream.js
var require_stream2 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/providers/stream.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var stream_1 = require('stream')
    var async_1 = require_async3()
    var StreamProvider = class {
      constructor(_root, _settings) {
        this._root = _root
        this._settings = _settings
        this._reader = new async_1.default(this._root, this._settings)
        this._stream = new stream_1.Readable({
          objectMode: true,
          read: () => {},
          destroy: () => {
            if (!this._reader.isDestroyed) {
              this._reader.destroy()
            }
          },
        })
      }
      read() {
        this._reader.onError((error) => {
          this._stream.emit('error', error)
        })
        this._reader.onEntry((entry) => {
          this._stream.push(entry)
        })
        this._reader.onEnd(() => {
          this._stream.push(null)
        })
        this._reader.read()
        return this._stream
      }
    }
    exports.default = StreamProvider
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/readers/sync.js
var require_sync3 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/readers/sync.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var fsScandir = require_out2()
    var common = require_common2()
    var reader_1 = require_reader()
    var SyncReader = class extends reader_1.default {
      constructor() {
        super(...arguments)
        this._scandir = fsScandir.scandirSync
        this._storage = []
        this._queue = /* @__PURE__ */ new Set()
      }
      read() {
        this._pushToQueue(this._root, this._settings.basePath)
        this._handleQueue()
        return this._storage
      }
      _pushToQueue(directory, base) {
        this._queue.add({ directory, base })
      }
      _handleQueue() {
        for (const item of this._queue.values()) {
          this._handleDirectory(item.directory, item.base)
        }
      }
      _handleDirectory(directory, base) {
        try {
          const entries2 = this._scandir(
            directory,
            this._settings.fsScandirSettings,
          )
          for (const entry of entries2) {
            this._handleEntry(entry, base)
          }
        } catch (error) {
          this._handleError(error)
        }
      }
      _handleError(error) {
        if (!common.isFatalError(this._settings, error)) {
          return
        }
        throw error
      }
      _handleEntry(entry, base) {
        const fullpath = entry.path
        if (base !== void 0) {
          entry.path = common.joinPathSegments(
            base,
            entry.name,
            this._settings.pathSegmentSeparator,
          )
        }
        if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
          this._pushToStorage(entry)
        }
        if (
          entry.dirent.isDirectory() &&
          common.isAppliedFilter(this._settings.deepFilter, entry)
        ) {
          this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path)
        }
      }
      _pushToStorage(entry) {
        this._storage.push(entry)
      }
    }
    exports.default = SyncReader
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/providers/sync.js
var require_sync4 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/providers/sync.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var sync_1 = require_sync3()
    var SyncProvider = class {
      constructor(_root, _settings) {
        this._root = _root
        this._settings = _settings
        this._reader = new sync_1.default(this._root, this._settings)
      }
      read() {
        return this._reader.read()
      }
    }
    exports.default = SyncProvider
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/settings.js
var require_settings3 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/settings.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var path3 = require('path')
    var fsScandir = require_out2()
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options
        this.basePath = this._getValue(this._options.basePath, void 0)
        this.concurrency = this._getValue(
          this._options.concurrency,
          Number.POSITIVE_INFINITY,
        )
        this.deepFilter = this._getValue(this._options.deepFilter, null)
        this.entryFilter = this._getValue(this._options.entryFilter, null)
        this.errorFilter = this._getValue(this._options.errorFilter, null)
        this.pathSegmentSeparator = this._getValue(
          this._options.pathSegmentSeparator,
          path3.sep,
        )
        this.fsScandirSettings = new fsScandir.Settings({
          followSymbolicLinks: this._options.followSymbolicLinks,
          fs: this._options.fs,
          pathSegmentSeparator: this._options.pathSegmentSeparator,
          stats: this._options.stats,
          throwErrorOnBrokenSymbolicLink:
            this._options.throwErrorOnBrokenSymbolicLink,
        })
      }
      _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value
      }
    }
    exports.default = Settings
  },
})

// ../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/index.js
var require_out3 = __commonJS({
  '../../node_modules/.pnpm/@nodelib+fs.walk@1.2.8/node_modules/@nodelib/fs.walk/out/index.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.Settings =
      exports.walkStream =
      exports.walkSync =
      exports.walk =
        void 0
    var async_1 = require_async4()
    var stream_1 = require_stream2()
    var sync_1 = require_sync4()
    var settings_1 = require_settings3()
    exports.Settings = settings_1.default
    function walk(directory, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback === 'function') {
        new async_1.default(directory, getSettings()).read(
          optionsOrSettingsOrCallback,
        )
        return
      }
      new async_1.default(
        directory,
        getSettings(optionsOrSettingsOrCallback),
      ).read(callback)
    }
    exports.walk = walk
    function walkSync(directory, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings)
      const provider = new sync_1.default(directory, settings)
      return provider.read()
    }
    exports.walkSync = walkSync
    function walkStream(directory, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings)
      const provider = new stream_1.default(directory, settings)
      return provider.read()
    }
    exports.walkStream = walkStream
    function getSettings(settingsOrOptions = {}) {
      if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions
      }
      return new settings_1.default(settingsOrOptions)
    }
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/readers/reader.js
var require_reader2 = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/readers/reader.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var path3 = require('path')
    var fsStat = require_out()
    var utils = require_utils3()
    var Reader = class {
      constructor(_settings) {
        this._settings = _settings
        this._fsStatSettings = new fsStat.Settings({
          followSymbolicLink: this._settings.followSymbolicLinks,
          fs: this._settings.fs,
          throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks,
        })
      }
      _getFullEntryPath(filepath) {
        return path3.resolve(this._settings.cwd, filepath)
      }
      _makeEntry(stats, pattern) {
        const entry = {
          name: pattern,
          path: pattern,
          dirent: utils.fs.createDirentFromStats(pattern, stats),
        }
        if (this._settings.stats) {
          entry.stats = stats
        }
        return entry
      }
      _isFatalError(error) {
        return (
          !utils.errno.isEnoentCodeError(error) &&
          !this._settings.suppressErrors
        )
      }
    }
    exports.default = Reader
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/readers/stream.js
var require_stream3 = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/readers/stream.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var stream_1 = require('stream')
    var fsStat = require_out()
    var fsWalk = require_out3()
    var reader_1 = require_reader2()
    var ReaderStream = class extends reader_1.default {
      constructor() {
        super(...arguments)
        this._walkStream = fsWalk.walkStream
        this._stat = fsStat.stat
      }
      dynamic(root, options3) {
        return this._walkStream(root, options3)
      }
      static(patterns, options3) {
        const filepaths = patterns.map(this._getFullEntryPath, this)
        const stream = new stream_1.PassThrough({ objectMode: true })
        stream._write = (index, _enc, done) => {
          return this._getEntry(filepaths[index], patterns[index], options3)
            .then((entry) => {
              if (entry !== null && options3.entryFilter(entry)) {
                stream.push(entry)
              }
              if (index === filepaths.length - 1) {
                stream.end()
              }
              done()
            })
            .catch(done)
        }
        for (let i = 0; i < filepaths.length; i++) {
          stream.write(i)
        }
        return stream
      }
      _getEntry(filepath, pattern, options3) {
        return this._getStat(filepath)
          .then((stats) => this._makeEntry(stats, pattern))
          .catch((error) => {
            if (options3.errorFilter(error)) {
              return null
            }
            throw error
          })
      }
      _getStat(filepath) {
        return new Promise((resolve, reject) => {
          this._stat(filepath, this._fsStatSettings, (error, stats) => {
            return error === null ? resolve(stats) : reject(error)
          })
        })
      }
    }
    exports.default = ReaderStream
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/matchers/matcher.js
var require_matcher = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/matchers/matcher.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var utils = require_utils3()
    var Matcher = class {
      constructor(_patterns, _settings, _micromatchOptions) {
        this._patterns = _patterns
        this._settings = _settings
        this._micromatchOptions = _micromatchOptions
        this._storage = []
        this._fillStorage()
      }
      _fillStorage() {
        const patterns = utils.pattern.expandPatternsWithBraceExpansion(
          this._patterns,
        )
        for (const pattern of patterns) {
          const segments = this._getPatternSegments(pattern)
          const sections = this._splitSegmentsIntoSections(segments)
          this._storage.push({
            complete: sections.length <= 1,
            pattern,
            segments,
            sections,
          })
        }
      }
      _getPatternSegments(pattern) {
        const parts = utils.pattern.getPatternParts(
          pattern,
          this._micromatchOptions,
        )
        return parts.map((part) => {
          const dynamic = utils.pattern.isDynamicPattern(part, this._settings)
          if (!dynamic) {
            return {
              dynamic: false,
              pattern: part,
            }
          }
          return {
            dynamic: true,
            pattern: part,
            patternRe: utils.pattern.makeRe(part, this._micromatchOptions),
          }
        })
      }
      _splitSegmentsIntoSections(segments) {
        return utils.array.splitWhen(
          segments,
          (segment) =>
            segment.dynamic && utils.pattern.hasGlobStar(segment.pattern),
        )
      }
    }
    exports.default = Matcher
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/matchers/partial.js
var require_partial = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/matchers/partial.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var matcher_1 = require_matcher()
    var PartialMatcher = class extends matcher_1.default {
      match(filepath) {
        const parts = filepath.split('/')
        const levels = parts.length
        const patterns = this._storage.filter(
          (info) => !info.complete || info.segments.length > levels,
        )
        for (const pattern of patterns) {
          const section = pattern.sections[0]
          if (!pattern.complete && levels > section.length) {
            return true
          }
          const match = parts.every((part, index) => {
            const segment = pattern.segments[index]
            if (segment.dynamic && segment.patternRe.test(part)) {
              return true
            }
            if (!segment.dynamic && segment.pattern === part) {
              return true
            }
            return false
          })
          if (match) {
            return true
          }
        }
        return false
      }
    }
    exports.default = PartialMatcher
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/filters/deep.js
var require_deep = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/filters/deep.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var utils = require_utils3()
    var partial_1 = require_partial()
    var DeepFilter = class {
      constructor(_settings, _micromatchOptions) {
        this._settings = _settings
        this._micromatchOptions = _micromatchOptions
      }
      getFilter(basePath, positive, negative) {
        const matcher = this._getMatcher(positive)
        const negativeRe = this._getNegativePatternsRe(negative)
        return (entry) => this._filter(basePath, entry, matcher, negativeRe)
      }
      _getMatcher(patterns) {
        return new partial_1.default(
          patterns,
          this._settings,
          this._micromatchOptions,
        )
      }
      _getNegativePatternsRe(patterns) {
        const affectDepthOfReadingPatterns = patterns.filter(
          utils.pattern.isAffectDepthOfReadingPattern,
        )
        return utils.pattern.convertPatternsToRe(
          affectDepthOfReadingPatterns,
          this._micromatchOptions,
        )
      }
      _filter(basePath, entry, matcher, negativeRe) {
        if (this._isSkippedByDeep(basePath, entry.path)) {
          return false
        }
        if (this._isSkippedSymbolicLink(entry)) {
          return false
        }
        const filepath = utils.path.removeLeadingDotSegment(entry.path)
        if (this._isSkippedByPositivePatterns(filepath, matcher)) {
          return false
        }
        return this._isSkippedByNegativePatterns(filepath, negativeRe)
      }
      _isSkippedByDeep(basePath, entryPath) {
        if (this._settings.deep === Infinity) {
          return false
        }
        return this._getEntryLevel(basePath, entryPath) >= this._settings.deep
      }
      _getEntryLevel(basePath, entryPath) {
        const entryPathDepth = entryPath.split('/').length
        if (basePath === '') {
          return entryPathDepth
        }
        const basePathDepth = basePath.split('/').length
        return entryPathDepth - basePathDepth
      }
      _isSkippedSymbolicLink(entry) {
        return (
          !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink()
        )
      }
      _isSkippedByPositivePatterns(entryPath, matcher) {
        return !this._settings.baseNameMatch && !matcher.match(entryPath)
      }
      _isSkippedByNegativePatterns(entryPath, patternsRe) {
        return !utils.pattern.matchAny(entryPath, patternsRe)
      }
    }
    exports.default = DeepFilter
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/filters/entry.js
var require_entry = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/filters/entry.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var utils = require_utils3()
    var EntryFilter = class {
      constructor(_settings, _micromatchOptions) {
        this._settings = _settings
        this._micromatchOptions = _micromatchOptions
        this.index = /* @__PURE__ */ new Map()
      }
      getFilter(positive, negative) {
        const positiveRe = utils.pattern.convertPatternsToRe(
          positive,
          this._micromatchOptions,
        )
        const negativeRe = utils.pattern.convertPatternsToRe(
          negative,
          this._micromatchOptions,
        )
        return (entry) => this._filter(entry, positiveRe, negativeRe)
      }
      _filter(entry, positiveRe, negativeRe) {
        if (this._settings.unique && this._isDuplicateEntry(entry)) {
          return false
        }
        if (this._onlyFileFilter(entry) || this._onlyDirectoryFilter(entry)) {
          return false
        }
        if (this._isSkippedByAbsoluteNegativePatterns(entry.path, negativeRe)) {
          return false
        }
        const filepath = this._settings.baseNameMatch ? entry.name : entry.path
        const isMatched =
          this._isMatchToPatterns(filepath, positiveRe) &&
          !this._isMatchToPatterns(entry.path, negativeRe)
        if (this._settings.unique && isMatched) {
          this._createIndexRecord(entry)
        }
        return isMatched
      }
      _isDuplicateEntry(entry) {
        return this.index.has(entry.path)
      }
      _createIndexRecord(entry) {
        this.index.set(entry.path, void 0)
      }
      _onlyFileFilter(entry) {
        return this._settings.onlyFiles && !entry.dirent.isFile()
      }
      _onlyDirectoryFilter(entry) {
        return this._settings.onlyDirectories && !entry.dirent.isDirectory()
      }
      _isSkippedByAbsoluteNegativePatterns(entryPath, patternsRe) {
        if (!this._settings.absolute) {
          return false
        }
        const fullpath = utils.path.makeAbsolute(this._settings.cwd, entryPath)
        return utils.pattern.matchAny(fullpath, patternsRe)
      }
      _isMatchToPatterns(entryPath, patternsRe) {
        const filepath = utils.path.removeLeadingDotSegment(entryPath)
        return utils.pattern.matchAny(filepath, patternsRe)
      }
    }
    exports.default = EntryFilter
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/filters/error.js
var require_error = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/filters/error.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var utils = require_utils3()
    var ErrorFilter = class {
      constructor(_settings) {
        this._settings = _settings
      }
      getFilter() {
        return (error) => this._isNonFatalError(error)
      }
      _isNonFatalError(error) {
        return (
          utils.errno.isEnoentCodeError(error) || this._settings.suppressErrors
        )
      }
    }
    exports.default = ErrorFilter
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/transformers/entry.js
var require_entry2 = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/transformers/entry.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var utils = require_utils3()
    var EntryTransformer = class {
      constructor(_settings) {
        this._settings = _settings
      }
      getTransformer() {
        return (entry) => this._transform(entry)
      }
      _transform(entry) {
        let filepath = entry.path
        if (this._settings.absolute) {
          filepath = utils.path.makeAbsolute(this._settings.cwd, filepath)
          filepath = utils.path.unixify(filepath)
        }
        if (this._settings.markDirectories && entry.dirent.isDirectory()) {
          filepath += '/'
        }
        if (!this._settings.objectMode) {
          return filepath
        }
        return Object.assign(Object.assign({}, entry), { path: filepath })
      }
    }
    exports.default = EntryTransformer
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/provider.js
var require_provider = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/provider.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var path3 = require('path')
    var deep_1 = require_deep()
    var entry_1 = require_entry()
    var error_1 = require_error()
    var entry_2 = require_entry2()
    var Provider = class {
      constructor(_settings) {
        this._settings = _settings
        this.errorFilter = new error_1.default(this._settings)
        this.entryFilter = new entry_1.default(
          this._settings,
          this._getMicromatchOptions(),
        )
        this.deepFilter = new deep_1.default(
          this._settings,
          this._getMicromatchOptions(),
        )
        this.entryTransformer = new entry_2.default(this._settings)
      }
      _getRootDirectory(task2) {
        return path3.resolve(this._settings.cwd, task2.base)
      }
      _getReaderOptions(task2) {
        const basePath = task2.base === '.' ? '' : task2.base
        return {
          basePath,
          pathSegmentSeparator: '/',
          concurrency: this._settings.concurrency,
          deepFilter: this.deepFilter.getFilter(
            basePath,
            task2.positive,
            task2.negative,
          ),
          entryFilter: this.entryFilter.getFilter(
            task2.positive,
            task2.negative,
          ),
          errorFilter: this.errorFilter.getFilter(),
          followSymbolicLinks: this._settings.followSymbolicLinks,
          fs: this._settings.fs,
          stats: this._settings.stats,
          throwErrorOnBrokenSymbolicLink:
            this._settings.throwErrorOnBrokenSymbolicLink,
          transform: this.entryTransformer.getTransformer(),
        }
      }
      _getMicromatchOptions() {
        return {
          dot: this._settings.dot,
          matchBase: this._settings.baseNameMatch,
          nobrace: !this._settings.braceExpansion,
          nocase: !this._settings.caseSensitiveMatch,
          noext: !this._settings.extglob,
          noglobstar: !this._settings.globstar,
          posix: true,
          strictSlashes: false,
        }
      }
    }
    exports.default = Provider
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/async.js
var require_async5 = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/async.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var stream_1 = require_stream3()
    var provider_1 = require_provider()
    var ProviderAsync = class extends provider_1.default {
      constructor() {
        super(...arguments)
        this._reader = new stream_1.default(this._settings)
      }
      read(task2) {
        const root = this._getRootDirectory(task2)
        const options3 = this._getReaderOptions(task2)
        const entries2 = []
        return new Promise((resolve, reject) => {
          const stream = this.api(root, task2, options3)
          stream.once('error', reject)
          stream.on('data', (entry) => entries2.push(options3.transform(entry)))
          stream.once('end', () => resolve(entries2))
        })
      }
      api(root, task2, options3) {
        if (task2.dynamic) {
          return this._reader.dynamic(root, options3)
        }
        return this._reader.static(task2.patterns, options3)
      }
    }
    exports.default = ProviderAsync
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/stream.js
var require_stream4 = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/stream.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var stream_1 = require('stream')
    var stream_2 = require_stream3()
    var provider_1 = require_provider()
    var ProviderStream = class extends provider_1.default {
      constructor() {
        super(...arguments)
        this._reader = new stream_2.default(this._settings)
      }
      read(task2) {
        const root = this._getRootDirectory(task2)
        const options3 = this._getReaderOptions(task2)
        const source = this.api(root, task2, options3)
        const destination = new stream_1.Readable({
          objectMode: true,
          read: () => {},
        })
        source
          .once('error', (error) => destination.emit('error', error))
          .on('data', (entry) =>
            destination.emit('data', options3.transform(entry)),
          )
          .once('end', () => destination.emit('end'))
        destination.once('close', () => source.destroy())
        return destination
      }
      api(root, task2, options3) {
        if (task2.dynamic) {
          return this._reader.dynamic(root, options3)
        }
        return this._reader.static(task2.patterns, options3)
      }
    }
    exports.default = ProviderStream
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/readers/sync.js
var require_sync5 = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/readers/sync.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var fsStat = require_out()
    var fsWalk = require_out3()
    var reader_1 = require_reader2()
    var ReaderSync = class extends reader_1.default {
      constructor() {
        super(...arguments)
        this._walkSync = fsWalk.walkSync
        this._statSync = fsStat.statSync
      }
      dynamic(root, options3) {
        return this._walkSync(root, options3)
      }
      static(patterns, options3) {
        const entries2 = []
        for (const pattern of patterns) {
          const filepath = this._getFullEntryPath(pattern)
          const entry = this._getEntry(filepath, pattern, options3)
          if (entry === null || !options3.entryFilter(entry)) {
            continue
          }
          entries2.push(entry)
        }
        return entries2
      }
      _getEntry(filepath, pattern, options3) {
        try {
          const stats = this._getStat(filepath)
          return this._makeEntry(stats, pattern)
        } catch (error) {
          if (options3.errorFilter(error)) {
            return null
          }
          throw error
        }
      }
      _getStat(filepath) {
        return this._statSync(filepath, this._fsStatSettings)
      }
    }
    exports.default = ReaderSync
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/sync.js
var require_sync6 = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/providers/sync.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    var sync_1 = require_sync5()
    var provider_1 = require_provider()
    var ProviderSync = class extends provider_1.default {
      constructor() {
        super(...arguments)
        this._reader = new sync_1.default(this._settings)
      }
      read(task2) {
        const root = this._getRootDirectory(task2)
        const options3 = this._getReaderOptions(task2)
        const entries2 = this.api(root, task2, options3)
        return entries2.map(options3.transform)
      }
      api(root, task2, options3) {
        if (task2.dynamic) {
          return this._reader.dynamic(root, options3)
        }
        return this._reader.static(task2.patterns, options3)
      }
    }
    exports.default = ProviderSync
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/settings.js
var require_settings4 = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/settings.js'(
    exports,
  ) {
    'use strict'
    Object.defineProperty(exports, '__esModule', { value: true })
    exports.DEFAULT_FILE_SYSTEM_ADAPTER = void 0
    var fs2 = require('fs')
    var os = require('os')
    var CPU_COUNT = Math.max(os.cpus().length, 1)
    exports.DEFAULT_FILE_SYSTEM_ADAPTER = {
      lstat: fs2.lstat,
      lstatSync: fs2.lstatSync,
      stat: fs2.stat,
      statSync: fs2.statSync,
      readdir: fs2.readdir,
      readdirSync: fs2.readdirSync,
    }
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options
        this.absolute = this._getValue(this._options.absolute, false)
        this.baseNameMatch = this._getValue(this._options.baseNameMatch, false)
        this.braceExpansion = this._getValue(this._options.braceExpansion, true)
        this.caseSensitiveMatch = this._getValue(
          this._options.caseSensitiveMatch,
          true,
        )
        this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT)
        this.cwd = this._getValue(this._options.cwd, process.cwd())
        this.deep = this._getValue(this._options.deep, Infinity)
        this.dot = this._getValue(this._options.dot, false)
        this.extglob = this._getValue(this._options.extglob, true)
        this.followSymbolicLinks = this._getValue(
          this._options.followSymbolicLinks,
          true,
        )
        this.fs = this._getFileSystemMethods(this._options.fs)
        this.globstar = this._getValue(this._options.globstar, true)
        this.ignore = this._getValue(this._options.ignore, [])
        this.markDirectories = this._getValue(
          this._options.markDirectories,
          false,
        )
        this.objectMode = this._getValue(this._options.objectMode, false)
        this.onlyDirectories = this._getValue(
          this._options.onlyDirectories,
          false,
        )
        this.onlyFiles = this._getValue(this._options.onlyFiles, true)
        this.stats = this._getValue(this._options.stats, false)
        this.suppressErrors = this._getValue(
          this._options.suppressErrors,
          false,
        )
        this.throwErrorOnBrokenSymbolicLink = this._getValue(
          this._options.throwErrorOnBrokenSymbolicLink,
          false,
        )
        this.unique = this._getValue(this._options.unique, true)
        if (this.onlyDirectories) {
          this.onlyFiles = false
        }
        if (this.stats) {
          this.objectMode = true
        }
      }
      _getValue(option, value) {
        return option === void 0 ? value : option
      }
      _getFileSystemMethods(methods = {}) {
        return Object.assign(
          Object.assign({}, exports.DEFAULT_FILE_SYSTEM_ADAPTER),
          methods,
        )
      }
    }
    exports.default = Settings
  },
})

// ../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/index.js
var require_out4 = __commonJS({
  '../../node_modules/.pnpm/fast-glob@3.2.7/node_modules/fast-glob/out/index.js'(
    exports,
    module2,
  ) {
    'use strict'
    var taskManager = require_tasks()
    var async_1 = require_async5()
    var stream_1 = require_stream4()
    var sync_1 = require_sync6()
    var settings_1 = require_settings4()
    var utils = require_utils3()
    async function FastGlob(source, options3) {
      assertPatternsInput(source)
      const works = getWorks(source, async_1.default, options3)
      const result = await Promise.all(works)
      return utils.array.flatten(result)
    }
    ;(function (FastGlob2) {
      function sync(source, options3) {
        assertPatternsInput(source)
        const works = getWorks(source, sync_1.default, options3)
        return utils.array.flatten(works)
      }
      FastGlob2.sync = sync
      function stream(source, options3) {
        assertPatternsInput(source)
        const works = getWorks(source, stream_1.default, options3)
        return utils.stream.merge(works)
      }
      FastGlob2.stream = stream
      function generateTasks(source, options3) {
        assertPatternsInput(source)
        const patterns = [].concat(source)
        const settings = new settings_1.default(options3)
        return taskManager.generate(patterns, settings)
      }
      FastGlob2.generateTasks = generateTasks
      function isDynamicPattern(source, options3) {
        assertPatternsInput(source)
        const settings = new settings_1.default(options3)
        return utils.pattern.isDynamicPattern(source, settings)
      }
      FastGlob2.isDynamicPattern = isDynamicPattern
      function escapePath(source) {
        assertPatternsInput(source)
        return utils.path.escape(source)
      }
      FastGlob2.escapePath = escapePath
    })(FastGlob || (FastGlob = {}))
    function getWorks(source, _Provider, options3) {
      const patterns = [].concat(source)
      const settings = new settings_1.default(options3)
      const tasks = taskManager.generate(patterns, settings)
      const provider = new _Provider(settings)
      return tasks.map(provider.read, provider)
    }
    function assertPatternsInput(input) {
      const source = [].concat(input)
      const isValidSource = source.every(
        (item) => utils.string.isString(item) && !utils.string.isEmpty(item),
      )
      if (!isValidSource) {
        throw new TypeError(
          'Patterns must be a string (non empty) or an array of strings',
        )
      }
    }
    module2.exports = FastGlob
  },
})

// src/index.ts
var import_fs = __toESM(require('fs'))
var import_minimist = __toESM(require_minimist())
var import_path2 = __toESM(require('path'))

// src/build.ts
var import_cross_spawn = __toESM(require_cross_spawn())
var import_esbuild = require('esbuild')
var import_fast_glob = __toESM(require_out4())

// ../../node_modules/.pnpm/kolorist@1.5.0/node_modules/kolorist/dist/esm/index.mjs
var enabled = true
var globalVar =
  typeof self !== 'undefined'
    ? self
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : {}
var supportLevel = 0
if (globalVar.process && globalVar.process.env && globalVar.process.stdout) {
  const { FORCE_COLOR, NODE_DISABLE_COLORS, TERM } = globalVar.process.env
  if (NODE_DISABLE_COLORS || FORCE_COLOR === '0') {
    enabled = false
  } else if (FORCE_COLOR === '1') {
    enabled = true
  } else if (TERM === 'dumb') {
    enabled = false
  } else if (
    'CI' in globalVar.process.env &&
    [
      'TRAVIS',
      'CIRCLECI',
      'APPVEYOR',
      'GITLAB_CI',
      'GITHUB_ACTIONS',
      'BUILDKITE',
      'DRONE',
    ].some((vendor) => vendor in globalVar.process.env)
  ) {
    enabled = true
  } else {
    enabled = process.stdout.isTTY
  }
  if (enabled) {
    supportLevel = TERM && TERM.endsWith('-256color') ? 2 : 1
  }
}
var options = {
  enabled,
  supportLevel,
}
function kolorist(start, end, level = 1) {
  const open = `[${start}m`
  const close = `[${end}m`
  const regex = new RegExp(`\\x1b\\[${end}m`, 'g')
  return (str) => {
    return options.enabled && options.supportLevel >= level
      ? open + ('' + str).replace(regex, open) + close
      : '' + str
  }
}
var reset = kolorist(0, 0)
var bold = kolorist(1, 22)
var dim = kolorist(2, 22)
var italic = kolorist(3, 23)
var underline = kolorist(4, 24)
var inverse = kolorist(7, 27)
var hidden = kolorist(8, 28)
var strikethrough = kolorist(9, 29)
var black = kolorist(30, 39)
var red = kolorist(31, 39)
var green = kolorist(32, 39)
var yellow = kolorist(33, 39)
var blue = kolorist(34, 39)
var magenta = kolorist(35, 39)
var cyan = kolorist(36, 39)
var white = kolorist(97, 39)
var gray = kolorist(90, 39)
var lightGray = kolorist(37, 39)
var lightRed = kolorist(91, 39)
var lightGreen = kolorist(92, 39)
var lightYellow = kolorist(93, 39)
var lightBlue = kolorist(94, 39)
var lightMagenta = kolorist(95, 39)
var lightCyan = kolorist(96, 39)
var bgBlack = kolorist(40, 49)
var bgRed = kolorist(41, 49)
var bgGreen = kolorist(42, 49)
var bgYellow = kolorist(43, 49)
var bgBlue = kolorist(44, 49)
var bgMagenta = kolorist(45, 49)
var bgCyan = kolorist(46, 49)
var bgWhite = kolorist(107, 49)
var bgGray = kolorist(100, 49)
var bgLightRed = kolorist(101, 49)
var bgLightGreen = kolorist(102, 49)
var bgLightYellow = kolorist(103, 49)
var bgLightBlue = kolorist(104, 49)
var bgLightMagenta = kolorist(105, 49)
var bgLightCyan = kolorist(106, 49)
var bgLightGray = kolorist(47, 49)

// src/build.ts
var import_os = require('os')
var import_path = __toESM(require('path'))
async function getEntries(paths) {
  const base = process.cwd()
  const result = await Promise.all(
    paths.map((p) => {
      let absP = import_path.default.resolve(base, p)
      if (absP.includes("'")) {
        absP = absP.replace(/'/g, '')
      }
      if ((0, import_os.platform)() === 'win32') {
        absP = absP.replace(/\\/g, '/')
      }
      return (0, import_fast_glob.default)(absP)
    }),
  )
  return result.flat()
}
function humanizeDuration(duration) {
  if (duration > 1e3) {
    return `${duration / 1e3}s`
  }
  return `${duration}ms`
}
function task(label) {
  console.log(`${bgCyan(black(' TASK '))} ${cyan(label)}`)
  const now = Date.now()
  return {
    end() {
      const duration = Date.now() - now
      console.log(
        `${bgGreen(black(' DONE '))} ${green(
          `${label} - ${humanizeDuration(duration)}`,
        )}`,
      )
    },
  }
}
async function build({
  entries: entries2,
  tsProject: tsProject2,
  checkTypes: checkTypes2 = false,
  formats: formats2 = ['cjs'],
  options: options3,
}) {
  const entryPoints = await getEntries(entries2)
  if (checkTypes2) {
    const cTask = task('CHECKING TYPES')
    import_cross_spawn.default.sync(`tsc -p ${tsProject2}`, {
      cwd: process.cwd(),
      stdio: 'inherit',
    })
    cTask.end()
  }
  const bTask = task('BUILDING')
  await Promise.all(
    formats2.map((format2) =>
      (0, import_esbuild.build)({
        entryPoints,
        outdir: 'dist',
        platform: 'node',
        format: format2,
        target: 'node10',
        logLevel: 'info',
        outExtension: {
          '.js': format2 === 'cjs' || format2 === 'iife' ? '.js' : '.esm.js',
        },
        ...options3,
      }),
    ),
  )
  bTask.end()
}

// src/index.ts
var argv = (0, import_minimist.default)(process.argv.slice(2))
if (argv.version) {
  console.log(
    JSON.parse(
      import_fs.default
        .readFileSync(
          import_path2.default.resolve(__dirname, '../package.json'),
        )
        .toString('utf8'),
    ).version,
  )
  process.exit(0)
}
var entries = argv._
var {
  _,
  '--': __,
  'check-types': checkTypes,
  'ts-project': tsProject = 'tsconfig.json',
  format,
  external,
  ...options2
} = argv
var formats = typeof format === 'string' ? [format] : format
var externals = typeof external === 'string' ? [external] : external
build({
  entries,
  tsProject,
  checkTypes,
  formats,
  options: {
    ...options2,
    external: externals,
  },
})
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
//# sourceMappingURL=index.js.map
