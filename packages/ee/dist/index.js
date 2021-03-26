#!/usr/bin/env node
var __create = Object.create
var __defProp = Object.defineProperty
var __getProtoOf = Object.getPrototypeOf
var __hasOwnProp = Object.prototype.hasOwnProperty
var __getOwnPropNames = Object.getOwnPropertyNames
var __getOwnPropDesc = Object.getOwnPropertyDescriptor
var __markAsModule = (target) => __defProp(target, '__esModule', { value: true })
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports)
var __exportStar = (target, module2, desc) => {
  if ((module2 && typeof module2 === 'object') || typeof module2 === 'function') {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== 'default')
        __defProp(target, key, {
          get: () => module2[key],
          enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable,
        })
  }
  return target
}
var __toModule = (module2) => {
  return __exportStar(
    __markAsModule(
      __defProp(
        module2 != null ? __create(__getProtoOf(module2)) : {},
        'default',
        module2 && module2.__esModule && 'default' in module2
          ? { get: () => module2.default, enumerable: true }
          : { value: module2, enumerable: true },
      ),
    ),
    module2,
  )
}

// ../../node_modules/.pnpm/minimist@1.2.5/node_modules/minimist/index.js
var require_minimist = __commonJS((exports2, module2) => {
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
      return (flags.allBools && /^--[^=]+$/.test(arg2)) || flags.strings[key2] || flags.bools[key2] || aliases[key2]
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
        if (o[key2] === Object.prototype || o[key2] === Number.prototype || o[key2] === String.prototype) o[key2] = {}
        if (o[key2] === Array.prototype) o[key2] = []
        o = o[key2]
      }
      var key2 = keys[keys.length - 1]
      if (key2 === '__proto__') return
      if (o === Object.prototype || o === Number.prototype || o === String.prototype) o = {}
      if (o === Array.prototype) o = []
      if (o[key2] === void 0 || flags.bools[key2] || typeof o[key2] === 'boolean') {
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
          if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
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
          argv2._.push(flags.strings['_'] || !isNumber(arg) ? arg : Number(arg))
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
})

// ../../node_modules/.pnpm/nice-try@1.0.5/node_modules/nice-try/src/index.js
var require_src = __commonJS((exports2, module2) => {
  'use strict'
  module2.exports = function (fn) {
    try {
      return fn()
    } catch (e) {}
  }
})

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/windows.js
var require_windows = __commonJS((exports2, module2) => {
  module2.exports = isexe
  isexe.sync = sync
  var fs2 = require('fs')
  function checkPathExt(path3, options2) {
    var pathext = options2.pathExt !== void 0 ? options2.pathExt : process.env.PATHEXT
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
  function checkStat(stat, path3, options2) {
    if (!stat.isSymbolicLink() && !stat.isFile()) {
      return false
    }
    return checkPathExt(path3, options2)
  }
  function isexe(path3, options2, cb) {
    fs2.stat(path3, function (er, stat) {
      cb(er, er ? false : checkStat(stat, path3, options2))
    })
  }
  function sync(path3, options2) {
    return checkStat(fs2.statSync(path3), path3, options2)
  }
})

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/mode.js
var require_mode = __commonJS((exports2, module2) => {
  module2.exports = isexe
  isexe.sync = sync
  var fs2 = require('fs')
  function isexe(path3, options2, cb) {
    fs2.stat(path3, function (er, stat) {
      cb(er, er ? false : checkStat(stat, options2))
    })
  }
  function sync(path3, options2) {
    return checkStat(fs2.statSync(path3), options2)
  }
  function checkStat(stat, options2) {
    return stat.isFile() && checkMode(stat, options2)
  }
  function checkMode(stat, options2) {
    var mod = stat.mode
    var uid = stat.uid
    var gid = stat.gid
    var myUid = options2.uid !== void 0 ? options2.uid : process.getuid && process.getuid()
    var myGid = options2.gid !== void 0 ? options2.gid : process.getgid && process.getgid()
    var u = parseInt('100', 8)
    var g = parseInt('010', 8)
    var o = parseInt('001', 8)
    var ug = u | g
    var ret = mod & o || (mod & g && gid === myGid) || (mod & u && uid === myUid) || (mod & ug && myUid === 0)
    return ret
  }
})

// ../../node_modules/.pnpm/isexe@2.0.0/node_modules/isexe/index.js
var require_isexe = __commonJS((exports2, module2) => {
  var fs2 = require('fs')
  var core
  if (process.platform === 'win32' || global.TESTING_WINDOWS) {
    core = require_windows()
  } else {
    core = require_mode()
  }
  module2.exports = isexe
  isexe.sync = sync
  function isexe(path3, options2, cb) {
    if (typeof options2 === 'function') {
      cb = options2
      options2 = {}
    }
    if (!cb) {
      if (typeof Promise !== 'function') {
        throw new TypeError('callback not provided')
      }
      return new Promise(function (resolve, reject) {
        isexe(path3, options2 || {}, function (er, is) {
          if (er) {
            reject(er)
          } else {
            resolve(is)
          }
        })
      })
    }
    core(path3, options2 || {}, function (er, is) {
      if (er) {
        if (er.code === 'EACCES' || (options2 && options2.ignoreErrors)) {
          er = null
          is = false
        }
      }
      cb(er, is)
    })
  }
  function sync(path3, options2) {
    try {
      return core.sync(path3, options2 || {})
    } catch (er) {
      if ((options2 && options2.ignoreErrors) || er.code === 'EACCES') {
        return false
      } else {
        throw er
      }
    }
  }
})

// ../../node_modules/.pnpm/which@1.3.1/node_modules/which/which.js
var require_which = __commonJS((exports2, module2) => {
  module2.exports = which
  which.sync = whichSync
  var isWindows = process.platform === 'win32' || process.env.OSTYPE === 'cygwin' || process.env.OSTYPE === 'msys'
  var path3 = require('path')
  var COLON = isWindows ? ';' : ':'
  var isexe = require_isexe()
  function getNotFoundError(cmd) {
    var er = new Error('not found: ' + cmd)
    er.code = 'ENOENT'
    return er
  }
  function getPathInfo(cmd, opt) {
    var colon = opt.colon || COLON
    var pathEnv = opt.path || process.env.PATH || ''
    var pathExt = ['']
    pathEnv = pathEnv.split(colon)
    var pathExtExe = ''
    if (isWindows) {
      pathEnv.unshift(process.cwd())
      pathExtExe = opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM'
      pathExt = pathExtExe.split(colon)
      if (cmd.indexOf('.') !== -1 && pathExt[0] !== '') pathExt.unshift('')
    }
    if (cmd.match(/\//) || (isWindows && cmd.match(/\\/))) pathEnv = ['']
    return {
      env: pathEnv,
      ext: pathExt,
      extExe: pathExtExe,
    }
  }
  function which(cmd, opt, cb) {
    if (typeof opt === 'function') {
      cb = opt
      opt = {}
    }
    var info = getPathInfo(cmd, opt)
    var pathEnv = info.env
    var pathExt = info.ext
    var pathExtExe = info.extExe
    var found = []
    ;(function F(i, l) {
      if (i === l) {
        if (opt.all && found.length) return cb(null, found)
        else return cb(getNotFoundError(cmd))
      }
      var pathPart = pathEnv[i]
      if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"') pathPart = pathPart.slice(1, -1)
      var p = path3.join(pathPart, cmd)
      if (!pathPart && /^\.[\\\/]/.test(cmd)) {
        p = cmd.slice(0, 2) + p
      }
      ;(function E(ii, ll) {
        if (ii === ll) return F(i + 1, l)
        var ext = pathExt[ii]
        isexe(p + ext, { pathExt: pathExtExe }, function (er, is) {
          if (!er && is) {
            if (opt.all) found.push(p + ext)
            else return cb(null, p + ext)
          }
          return E(ii + 1, ll)
        })
      })(0, pathExt.length)
    })(0, pathEnv.length)
  }
  function whichSync(cmd, opt) {
    opt = opt || {}
    var info = getPathInfo(cmd, opt)
    var pathEnv = info.env
    var pathExt = info.ext
    var pathExtExe = info.extExe
    var found = []
    for (var i = 0, l = pathEnv.length; i < l; i++) {
      var pathPart = pathEnv[i]
      if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"') pathPart = pathPart.slice(1, -1)
      var p = path3.join(pathPart, cmd)
      if (!pathPart && /^\.[\\\/]/.test(cmd)) {
        p = cmd.slice(0, 2) + p
      }
      for (var j = 0, ll = pathExt.length; j < ll; j++) {
        var cur = p + pathExt[j]
        var is
        try {
          is = isexe.sync(cur, { pathExt: pathExtExe })
          if (is) {
            if (opt.all) found.push(cur)
            else return cur
          }
        } catch (ex2) {}
      }
    }
    if (opt.all && found.length) return found
    if (opt.nothrow) return null
    throw getNotFoundError(cmd)
  }
})

// ../../node_modules/.pnpm/path-key@2.0.1/node_modules/path-key/index.js
var require_path_key = __commonJS((exports2, module2) => {
  'use strict'
  module2.exports = (opts) => {
    opts = opts || {}
    const env = opts.env || process.env
    const platform = opts.platform || process.platform
    if (platform !== 'win32') {
      return 'PATH'
    }
    return Object.keys(env).find((x) => x.toUpperCase() === 'PATH') || 'Path'
  }
})

// ../../node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/lib/util/resolveCommand.js
var require_resolveCommand = __commonJS((exports2, module2) => {
  'use strict'
  var path3 = require('path')
  var which = require_which()
  var pathKey = require_path_key()()
  function resolveCommandAttempt(parsed, withoutPathExt) {
    const cwd = process.cwd()
    const hasCustomCwd = parsed.options.cwd != null
    if (hasCustomCwd) {
      try {
        process.chdir(parsed.options.cwd)
      } catch (err) {}
    }
    let resolved
    try {
      resolved = which.sync(parsed.command, {
        path: (parsed.options.env || process.env)[pathKey],
        pathExt: withoutPathExt ? path3.delimiter : void 0,
      })
    } catch (e) {
    } finally {
      process.chdir(cwd)
    }
    if (resolved) {
      resolved = path3.resolve(hasCustomCwd ? parsed.options.cwd : '', resolved)
    }
    return resolved
  }
  function resolveCommand(parsed) {
    return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true)
  }
  module2.exports = resolveCommand
})

// ../../node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/lib/util/escape.js
var require_escape = __commonJS((exports2, module2) => {
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
})

// ../../node_modules/.pnpm/shebang-regex@1.0.0/node_modules/shebang-regex/index.js
var require_shebang_regex = __commonJS((exports2, module2) => {
  'use strict'
  module2.exports = /^#!.*/
})

// ../../node_modules/.pnpm/shebang-command@1.2.0/node_modules/shebang-command/index.js
var require_shebang_command = __commonJS((exports2, module2) => {
  'use strict'
  var shebangRegex = require_shebang_regex()
  module2.exports = function (str) {
    var match = str.match(shebangRegex)
    if (!match) {
      return null
    }
    var arr = match[0].replace(/#! ?/, '').split(' ')
    var bin = arr[0].split('/').pop()
    var arg = arr[1]
    return bin === 'env' ? arg : bin + (arg ? ' ' + arg : '')
  }
})

// ../../node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/lib/util/readShebang.js
var require_readShebang = __commonJS((exports2, module2) => {
  'use strict'
  var fs2 = require('fs')
  var shebangCommand = require_shebang_command()
  function readShebang(command) {
    const size = 150
    let buffer
    if (Buffer.alloc) {
      buffer = Buffer.alloc(size)
    } else {
      buffer = new Buffer(size)
      buffer.fill(0)
    }
    let fd
    try {
      fd = fs2.openSync(command, 'r')
      fs2.readSync(fd, buffer, 0, size, 0)
      fs2.closeSync(fd)
    } catch (e) {}
    return shebangCommand(buffer.toString())
  }
  module2.exports = readShebang
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/internal/constants.js
var require_constants = __commonJS((exports2, module2) => {
  var SEMVER_SPEC_VERSION = '2.0.0'
  var MAX_LENGTH = 256
  var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991
  var MAX_SAFE_COMPONENT_LENGTH = 16
  module2.exports = {
    SEMVER_SPEC_VERSION,
    MAX_LENGTH,
    MAX_SAFE_INTEGER,
    MAX_SAFE_COMPONENT_LENGTH,
  }
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/internal/debug.js
var require_debug = __commonJS((exports2, module2) => {
  var debug =
    typeof process === 'object' && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)
      ? (...args) => console.error('SEMVER', ...args)
      : () => {}
  module2.exports = debug
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/internal/re.js
var require_re = __commonJS((exports2, module2) => {
  var { MAX_SAFE_COMPONENT_LENGTH } = require_constants()
  var debug = require_debug()
  exports2 = module2.exports = {}
  var re = (exports2.re = [])
  var src = (exports2.src = [])
  var t = (exports2.t = {})
  var R = 0
  var createToken = (name, value, isGlobal) => {
    const index = R++
    debug(index, value)
    t[name] = index
    src[index] = value
    re[index] = new RegExp(value, isGlobal ? 'g' : void 0)
  }
  createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*')
  createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+')
  createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*')
  createToken(
    'MAINVERSION',
    `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`,
  )
  createToken(
    'MAINVERSIONLOOSE',
    `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`,
  )
  createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`)
  createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`)
  createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`)
  createToken(
    'PRERELEASELOOSE',
    `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`,
  )
  createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+')
  createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`)
  createToken('FULLPLAIN', `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`)
  createToken('FULL', `^${src[t.FULLPLAIN]}$`)
  createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`)
  createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`)
  createToken('GTLT', '((?:<|>)?=?)')
  createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`)
  createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`)
  createToken(
    'XRANGEPLAIN',
    `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${
      src[t.PRERELEASE]
    })?${src[t.BUILD]}?)?)?`,
  )
  createToken(
    'XRANGEPLAINLOOSE',
    `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${
      src[t.XRANGEIDENTIFIERLOOSE]
    })(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`,
  )
  createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`)
  createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`)
  createToken(
    'COERCE',
    `${'(^|[^\\d])(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:$|[^\\d])`,
  )
  createToken('COERCERTL', src[t.COERCE], true)
  createToken('LONETILDE', '(?:~>?)')
  createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true)
  exports2.tildeTrimReplace = '$1~'
  createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`)
  createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`)
  createToken('LONECARET', '(?:\\^)')
  createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true)
  exports2.caretTrimReplace = '$1^'
  createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`)
  createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`)
  createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`)
  createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`)
  createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true)
  exports2.comparatorTrimReplace = '$1$2$3'
  createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`)
  createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`)
  createToken('STAR', '(<|>)?=?\\s*\\*')
  createToken('GTE0', '^\\s*>=\\s*0.0.0\\s*$')
  createToken('GTE0PRE', '^\\s*>=\\s*0.0.0-0\\s*$')
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS((exports2, module2) => {
  var opts = ['includePrerelease', 'loose', 'rtl']
  var parseOptions = (options2) =>
    !options2
      ? {}
      : typeof options2 !== 'object'
      ? { loose: true }
      : opts
          .filter((k) => options2[k])
          .reduce((options3, k) => {
            options3[k] = true
            return options3
          }, {})
  module2.exports = parseOptions
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS((exports2, module2) => {
  var numeric = /^[0-9]+$/
  var compareIdentifiers = (a, b) => {
    const anum = numeric.test(a)
    const bnum = numeric.test(b)
    if (anum && bnum) {
      a = +a
      b = +b
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1
  }
  var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a)
  module2.exports = {
    compareIdentifiers,
    rcompareIdentifiers,
  }
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/classes/semver.js
var require_semver = __commonJS((exports2, module2) => {
  var debug = require_debug()
  var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants()
  var { re, t } = require_re()
  var parseOptions = require_parse_options()
  var { compareIdentifiers } = require_identifiers()
  var SemVer = class {
    constructor(version, options2) {
      options2 = parseOptions(options2)
      if (version instanceof SemVer) {
        if (version.loose === !!options2.loose && version.includePrerelease === !!options2.includePrerelease) {
          return version
        } else {
          version = version.version
        }
      } else if (typeof version !== 'string') {
        throw new TypeError(`Invalid Version: ${version}`)
      }
      if (version.length > MAX_LENGTH) {
        throw new TypeError(`version is longer than ${MAX_LENGTH} characters`)
      }
      debug('SemVer', version, options2)
      this.options = options2
      this.loose = !!options2.loose
      this.includePrerelease = !!options2.includePrerelease
      const m = version.trim().match(options2.loose ? re[t.LOOSE] : re[t.FULL])
      if (!m) {
        throw new TypeError(`Invalid Version: ${version}`)
      }
      this.raw = version
      this.major = +m[1]
      this.minor = +m[2]
      this.patch = +m[3]
      if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
        throw new TypeError('Invalid major version')
      }
      if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
        throw new TypeError('Invalid minor version')
      }
      if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
        throw new TypeError('Invalid patch version')
      }
      if (!m[4]) {
        this.prerelease = []
      } else {
        this.prerelease = m[4].split('.').map((id) => {
          if (/^[0-9]+$/.test(id)) {
            const num = +id
            if (num >= 0 && num < MAX_SAFE_INTEGER) {
              return num
            }
          }
          return id
        })
      }
      this.build = m[5] ? m[5].split('.') : []
      this.format()
    }
    format() {
      this.version = `${this.major}.${this.minor}.${this.patch}`
      if (this.prerelease.length) {
        this.version += `-${this.prerelease.join('.')}`
      }
      return this.version
    }
    toString() {
      return this.version
    }
    compare(other) {
      debug('SemVer.compare', this.version, this.options, other)
      if (!(other instanceof SemVer)) {
        if (typeof other === 'string' && other === this.version) {
          return 0
        }
        other = new SemVer(other, this.options)
      }
      if (other.version === this.version) {
        return 0
      }
      return this.compareMain(other) || this.comparePre(other)
    }
    compareMain(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options)
      }
      return (
        compareIdentifiers(this.major, other.major) ||
        compareIdentifiers(this.minor, other.minor) ||
        compareIdentifiers(this.patch, other.patch)
      )
    }
    comparePre(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options)
      }
      if (this.prerelease.length && !other.prerelease.length) {
        return -1
      } else if (!this.prerelease.length && other.prerelease.length) {
        return 1
      } else if (!this.prerelease.length && !other.prerelease.length) {
        return 0
      }
      let i = 0
      do {
        const a = this.prerelease[i]
        const b = other.prerelease[i]
        debug('prerelease compare', i, a, b)
        if (a === void 0 && b === void 0) {
          return 0
        } else if (b === void 0) {
          return 1
        } else if (a === void 0) {
          return -1
        } else if (a === b) {
          continue
        } else {
          return compareIdentifiers(a, b)
        }
      } while (++i)
    }
    compareBuild(other) {
      if (!(other instanceof SemVer)) {
        other = new SemVer(other, this.options)
      }
      let i = 0
      do {
        const a = this.build[i]
        const b = other.build[i]
        debug('prerelease compare', i, a, b)
        if (a === void 0 && b === void 0) {
          return 0
        } else if (b === void 0) {
          return 1
        } else if (a === void 0) {
          return -1
        } else if (a === b) {
          continue
        } else {
          return compareIdentifiers(a, b)
        }
      } while (++i)
    }
    inc(release, identifier) {
      switch (release) {
        case 'premajor':
          this.prerelease.length = 0
          this.patch = 0
          this.minor = 0
          this.major++
          this.inc('pre', identifier)
          break
        case 'preminor':
          this.prerelease.length = 0
          this.patch = 0
          this.minor++
          this.inc('pre', identifier)
          break
        case 'prepatch':
          this.prerelease.length = 0
          this.inc('patch', identifier)
          this.inc('pre', identifier)
          break
        case 'prerelease':
          if (this.prerelease.length === 0) {
            this.inc('patch', identifier)
          }
          this.inc('pre', identifier)
          break
        case 'major':
          if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
            this.major++
          }
          this.minor = 0
          this.patch = 0
          this.prerelease = []
          break
        case 'minor':
          if (this.patch !== 0 || this.prerelease.length === 0) {
            this.minor++
          }
          this.patch = 0
          this.prerelease = []
          break
        case 'patch':
          if (this.prerelease.length === 0) {
            this.patch++
          }
          this.prerelease = []
          break
        case 'pre':
          if (this.prerelease.length === 0) {
            this.prerelease = [0]
          } else {
            let i = this.prerelease.length
            while (--i >= 0) {
              if (typeof this.prerelease[i] === 'number') {
                this.prerelease[i]++
                i = -2
              }
            }
            if (i === -1) {
              this.prerelease.push(0)
            }
          }
          if (identifier) {
            if (this.prerelease[0] === identifier) {
              if (isNaN(this.prerelease[1])) {
                this.prerelease = [identifier, 0]
              }
            } else {
              this.prerelease = [identifier, 0]
            }
          }
          break
        default:
          throw new Error(`invalid increment argument: ${release}`)
      }
      this.format()
      this.raw = this.version
      return this
    }
  }
  module2.exports = SemVer
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/parse.js
var require_parse = __commonJS((exports2, module2) => {
  var { MAX_LENGTH } = require_constants()
  var { re, t } = require_re()
  var SemVer = require_semver()
  var parseOptions = require_parse_options()
  var parse = (version, options2) => {
    options2 = parseOptions(options2)
    if (version instanceof SemVer) {
      return version
    }
    if (typeof version !== 'string') {
      return null
    }
    if (version.length > MAX_LENGTH) {
      return null
    }
    const r = options2.loose ? re[t.LOOSE] : re[t.FULL]
    if (!r.test(version)) {
      return null
    }
    try {
      return new SemVer(version, options2)
    } catch (er) {
      return null
    }
  }
  module2.exports = parse
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/valid.js
var require_valid = __commonJS((exports2, module2) => {
  var parse = require_parse()
  var valid = (version, options2) => {
    const v = parse(version, options2)
    return v ? v.version : null
  }
  module2.exports = valid
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/clean.js
var require_clean = __commonJS((exports2, module2) => {
  var parse = require_parse()
  var clean = (version, options2) => {
    const s = parse(version.trim().replace(/^[=v]+/, ''), options2)
    return s ? s.version : null
  }
  module2.exports = clean
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/inc.js
var require_inc = __commonJS((exports2, module2) => {
  var SemVer = require_semver()
  var inc = (version, release, options2, identifier) => {
    if (typeof options2 === 'string') {
      identifier = options2
      options2 = void 0
    }
    try {
      return new SemVer(version, options2).inc(release, identifier).version
    } catch (er) {
      return null
    }
  }
  module2.exports = inc
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/compare.js
var require_compare = __commonJS((exports2, module2) => {
  var SemVer = require_semver()
  var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose))
  module2.exports = compare
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/eq.js
var require_eq = __commonJS((exports2, module2) => {
  var compare = require_compare()
  var eq = (a, b, loose) => compare(a, b, loose) === 0
  module2.exports = eq
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/diff.js
var require_diff = __commonJS((exports2, module2) => {
  var parse = require_parse()
  var eq = require_eq()
  var diff = (version1, version2) => {
    if (eq(version1, version2)) {
      return null
    } else {
      const v1 = parse(version1)
      const v2 = parse(version2)
      const hasPre = v1.prerelease.length || v2.prerelease.length
      const prefix = hasPre ? 'pre' : ''
      const defaultResult = hasPre ? 'prerelease' : ''
      for (const key in v1) {
        if (key === 'major' || key === 'minor' || key === 'patch') {
          if (v1[key] !== v2[key]) {
            return prefix + key
          }
        }
      }
      return defaultResult
    }
  }
  module2.exports = diff
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/major.js
var require_major = __commonJS((exports2, module2) => {
  var SemVer = require_semver()
  var major = (a, loose) => new SemVer(a, loose).major
  module2.exports = major
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/minor.js
var require_minor = __commonJS((exports2, module2) => {
  var SemVer = require_semver()
  var minor = (a, loose) => new SemVer(a, loose).minor
  module2.exports = minor
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/patch.js
var require_patch = __commonJS((exports2, module2) => {
  var SemVer = require_semver()
  var patch = (a, loose) => new SemVer(a, loose).patch
  module2.exports = patch
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/prerelease.js
var require_prerelease = __commonJS((exports2, module2) => {
  var parse = require_parse()
  var prerelease = (version, options2) => {
    const parsed = parse(version, options2)
    return parsed && parsed.prerelease.length ? parsed.prerelease : null
  }
  module2.exports = prerelease
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/rcompare.js
var require_rcompare = __commonJS((exports2, module2) => {
  var compare = require_compare()
  var rcompare = (a, b, loose) => compare(b, a, loose)
  module2.exports = rcompare
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/compare-loose.js
var require_compare_loose = __commonJS((exports2, module2) => {
  var compare = require_compare()
  var compareLoose = (a, b) => compare(a, b, true)
  module2.exports = compareLoose
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/compare-build.js
var require_compare_build = __commonJS((exports2, module2) => {
  var SemVer = require_semver()
  var compareBuild = (a, b, loose) => {
    const versionA = new SemVer(a, loose)
    const versionB = new SemVer(b, loose)
    return versionA.compare(versionB) || versionA.compareBuild(versionB)
  }
  module2.exports = compareBuild
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/sort.js
var require_sort = __commonJS((exports2, module2) => {
  var compareBuild = require_compare_build()
  var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose))
  module2.exports = sort
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/rsort.js
var require_rsort = __commonJS((exports2, module2) => {
  var compareBuild = require_compare_build()
  var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose))
  module2.exports = rsort
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/gt.js
var require_gt = __commonJS((exports2, module2) => {
  var compare = require_compare()
  var gt = (a, b, loose) => compare(a, b, loose) > 0
  module2.exports = gt
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/lt.js
var require_lt = __commonJS((exports2, module2) => {
  var compare = require_compare()
  var lt = (a, b, loose) => compare(a, b, loose) < 0
  module2.exports = lt
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/neq.js
var require_neq = __commonJS((exports2, module2) => {
  var compare = require_compare()
  var neq = (a, b, loose) => compare(a, b, loose) !== 0
  module2.exports = neq
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/gte.js
var require_gte = __commonJS((exports2, module2) => {
  var compare = require_compare()
  var gte = (a, b, loose) => compare(a, b, loose) >= 0
  module2.exports = gte
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/lte.js
var require_lte = __commonJS((exports2, module2) => {
  var compare = require_compare()
  var lte = (a, b, loose) => compare(a, b, loose) <= 0
  module2.exports = lte
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/cmp.js
var require_cmp = __commonJS((exports2, module2) => {
  var eq = require_eq()
  var neq = require_neq()
  var gt = require_gt()
  var gte = require_gte()
  var lt = require_lt()
  var lte = require_lte()
  var cmp = (a, op, b, loose) => {
    switch (op) {
      case '===':
        if (typeof a === 'object') a = a.version
        if (typeof b === 'object') b = b.version
        return a === b
      case '!==':
        if (typeof a === 'object') a = a.version
        if (typeof b === 'object') b = b.version
        return a !== b
      case '':
      case '=':
      case '==':
        return eq(a, b, loose)
      case '!=':
        return neq(a, b, loose)
      case '>':
        return gt(a, b, loose)
      case '>=':
        return gte(a, b, loose)
      case '<':
        return lt(a, b, loose)
      case '<=':
        return lte(a, b, loose)
      default:
        throw new TypeError(`Invalid operator: ${op}`)
    }
  }
  module2.exports = cmp
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/coerce.js
var require_coerce = __commonJS((exports2, module2) => {
  var SemVer = require_semver()
  var parse = require_parse()
  var { re, t } = require_re()
  var coerce = (version, options2) => {
    if (version instanceof SemVer) {
      return version
    }
    if (typeof version === 'number') {
      version = String(version)
    }
    if (typeof version !== 'string') {
      return null
    }
    options2 = options2 || {}
    let match = null
    if (!options2.rtl) {
      match = version.match(re[t.COERCE])
    } else {
      let next
      while ((next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
        if (!match || next.index + next[0].length !== match.index + match[0].length) {
          match = next
        }
        re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length
      }
      re[t.COERCERTL].lastIndex = -1
    }
    if (match === null) return null
    return parse(`${match[2]}.${match[3] || '0'}.${match[4] || '0'}`, options2)
  }
  module2.exports = coerce
})

// ../../node_modules/.pnpm/yallist@4.0.0/node_modules/yallist/iterator.js
var require_iterator = __commonJS((exports2, module2) => {
  'use strict'
  module2.exports = function (Yallist) {
    Yallist.prototype[Symbol.iterator] = function* () {
      for (let walker = this.head; walker; walker = walker.next) {
        yield walker.value
      }
    }
  }
})

// ../../node_modules/.pnpm/yallist@4.0.0/node_modules/yallist/yallist.js
var require_yallist = __commonJS((exports2, module2) => {
  'use strict'
  module2.exports = Yallist
  Yallist.Node = Node
  Yallist.create = Yallist
  function Yallist(list) {
    var self2 = this
    if (!(self2 instanceof Yallist)) {
      self2 = new Yallist()
    }
    self2.tail = null
    self2.head = null
    self2.length = 0
    if (list && typeof list.forEach === 'function') {
      list.forEach(function (item) {
        self2.push(item)
      })
    } else if (arguments.length > 0) {
      for (var i = 0, l = arguments.length; i < l; i++) {
        self2.push(arguments[i])
      }
    }
    return self2
  }
  Yallist.prototype.removeNode = function (node) {
    if (node.list !== this) {
      throw new Error('removing node which does not belong to this list')
    }
    var next = node.next
    var prev = node.prev
    if (next) {
      next.prev = prev
    }
    if (prev) {
      prev.next = next
    }
    if (node === this.head) {
      this.head = next
    }
    if (node === this.tail) {
      this.tail = prev
    }
    node.list.length--
    node.next = null
    node.prev = null
    node.list = null
    return next
  }
  Yallist.prototype.unshiftNode = function (node) {
    if (node === this.head) {
      return
    }
    if (node.list) {
      node.list.removeNode(node)
    }
    var head = this.head
    node.list = this
    node.next = head
    if (head) {
      head.prev = node
    }
    this.head = node
    if (!this.tail) {
      this.tail = node
    }
    this.length++
  }
  Yallist.prototype.pushNode = function (node) {
    if (node === this.tail) {
      return
    }
    if (node.list) {
      node.list.removeNode(node)
    }
    var tail = this.tail
    node.list = this
    node.prev = tail
    if (tail) {
      tail.next = node
    }
    this.tail = node
    if (!this.head) {
      this.head = node
    }
    this.length++
  }
  Yallist.prototype.push = function () {
    for (var i = 0, l = arguments.length; i < l; i++) {
      push(this, arguments[i])
    }
    return this.length
  }
  Yallist.prototype.unshift = function () {
    for (var i = 0, l = arguments.length; i < l; i++) {
      unshift(this, arguments[i])
    }
    return this.length
  }
  Yallist.prototype.pop = function () {
    if (!this.tail) {
      return void 0
    }
    var res = this.tail.value
    this.tail = this.tail.prev
    if (this.tail) {
      this.tail.next = null
    } else {
      this.head = null
    }
    this.length--
    return res
  }
  Yallist.prototype.shift = function () {
    if (!this.head) {
      return void 0
    }
    var res = this.head.value
    this.head = this.head.next
    if (this.head) {
      this.head.prev = null
    } else {
      this.tail = null
    }
    this.length--
    return res
  }
  Yallist.prototype.forEach = function (fn, thisp) {
    thisp = thisp || this
    for (var walker = this.head, i = 0; walker !== null; i++) {
      fn.call(thisp, walker.value, i, this)
      walker = walker.next
    }
  }
  Yallist.prototype.forEachReverse = function (fn, thisp) {
    thisp = thisp || this
    for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
      fn.call(thisp, walker.value, i, this)
      walker = walker.prev
    }
  }
  Yallist.prototype.get = function (n) {
    for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
      walker = walker.next
    }
    if (i === n && walker !== null) {
      return walker.value
    }
  }
  Yallist.prototype.getReverse = function (n) {
    for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
      walker = walker.prev
    }
    if (i === n && walker !== null) {
      return walker.value
    }
  }
  Yallist.prototype.map = function (fn, thisp) {
    thisp = thisp || this
    var res = new Yallist()
    for (var walker = this.head; walker !== null; ) {
      res.push(fn.call(thisp, walker.value, this))
      walker = walker.next
    }
    return res
  }
  Yallist.prototype.mapReverse = function (fn, thisp) {
    thisp = thisp || this
    var res = new Yallist()
    for (var walker = this.tail; walker !== null; ) {
      res.push(fn.call(thisp, walker.value, this))
      walker = walker.prev
    }
    return res
  }
  Yallist.prototype.reduce = function (fn, initial) {
    var acc
    var walker = this.head
    if (arguments.length > 1) {
      acc = initial
    } else if (this.head) {
      walker = this.head.next
      acc = this.head.value
    } else {
      throw new TypeError('Reduce of empty list with no initial value')
    }
    for (var i = 0; walker !== null; i++) {
      acc = fn(acc, walker.value, i)
      walker = walker.next
    }
    return acc
  }
  Yallist.prototype.reduceReverse = function (fn, initial) {
    var acc
    var walker = this.tail
    if (arguments.length > 1) {
      acc = initial
    } else if (this.tail) {
      walker = this.tail.prev
      acc = this.tail.value
    } else {
      throw new TypeError('Reduce of empty list with no initial value')
    }
    for (var i = this.length - 1; walker !== null; i--) {
      acc = fn(acc, walker.value, i)
      walker = walker.prev
    }
    return acc
  }
  Yallist.prototype.toArray = function () {
    var arr = new Array(this.length)
    for (var i = 0, walker = this.head; walker !== null; i++) {
      arr[i] = walker.value
      walker = walker.next
    }
    return arr
  }
  Yallist.prototype.toArrayReverse = function () {
    var arr = new Array(this.length)
    for (var i = 0, walker = this.tail; walker !== null; i++) {
      arr[i] = walker.value
      walker = walker.prev
    }
    return arr
  }
  Yallist.prototype.slice = function (from, to) {
    to = to || this.length
    if (to < 0) {
      to += this.length
    }
    from = from || 0
    if (from < 0) {
      from += this.length
    }
    var ret = new Yallist()
    if (to < from || to < 0) {
      return ret
    }
    if (from < 0) {
      from = 0
    }
    if (to > this.length) {
      to = this.length
    }
    for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
      walker = walker.next
    }
    for (; walker !== null && i < to; i++, walker = walker.next) {
      ret.push(walker.value)
    }
    return ret
  }
  Yallist.prototype.sliceReverse = function (from, to) {
    to = to || this.length
    if (to < 0) {
      to += this.length
    }
    from = from || 0
    if (from < 0) {
      from += this.length
    }
    var ret = new Yallist()
    if (to < from || to < 0) {
      return ret
    }
    if (from < 0) {
      from = 0
    }
    if (to > this.length) {
      to = this.length
    }
    for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
      walker = walker.prev
    }
    for (; walker !== null && i > from; i--, walker = walker.prev) {
      ret.push(walker.value)
    }
    return ret
  }
  Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
    if (start > this.length) {
      start = this.length - 1
    }
    if (start < 0) {
      start = this.length + start
    }
    for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
      walker = walker.next
    }
    var ret = []
    for (var i = 0; walker && i < deleteCount; i++) {
      ret.push(walker.value)
      walker = this.removeNode(walker)
    }
    if (walker === null) {
      walker = this.tail
    }
    if (walker !== this.head && walker !== this.tail) {
      walker = walker.prev
    }
    for (var i = 0; i < nodes.length; i++) {
      walker = insert(this, walker, nodes[i])
    }
    return ret
  }
  Yallist.prototype.reverse = function () {
    var head = this.head
    var tail = this.tail
    for (var walker = head; walker !== null; walker = walker.prev) {
      var p = walker.prev
      walker.prev = walker.next
      walker.next = p
    }
    this.head = tail
    this.tail = head
    return this
  }
  function insert(self2, node, value) {
    var inserted = node === self2.head ? new Node(value, null, node, self2) : new Node(value, node, node.next, self2)
    if (inserted.next === null) {
      self2.tail = inserted
    }
    if (inserted.prev === null) {
      self2.head = inserted
    }
    self2.length++
    return inserted
  }
  function push(self2, item) {
    self2.tail = new Node(item, self2.tail, null, self2)
    if (!self2.head) {
      self2.head = self2.tail
    }
    self2.length++
  }
  function unshift(self2, item) {
    self2.head = new Node(item, null, self2.head, self2)
    if (!self2.tail) {
      self2.tail = self2.head
    }
    self2.length++
  }
  function Node(value, prev, next, list) {
    if (!(this instanceof Node)) {
      return new Node(value, prev, next, list)
    }
    this.list = list
    this.value = value
    if (prev) {
      prev.next = this
      this.prev = prev
    } else {
      this.prev = null
    }
    if (next) {
      next.prev = this
      this.next = next
    } else {
      this.next = null
    }
  }
  try {
    require_iterator()(Yallist)
  } catch (er) {}
})

// ../../node_modules/.pnpm/lru-cache@6.0.0/node_modules/lru-cache/index.js
var require_lru_cache = __commonJS((exports2, module2) => {
  'use strict'
  var Yallist = require_yallist()
  var MAX = Symbol('max')
  var LENGTH = Symbol('length')
  var LENGTH_CALCULATOR = Symbol('lengthCalculator')
  var ALLOW_STALE = Symbol('allowStale')
  var MAX_AGE = Symbol('maxAge')
  var DISPOSE = Symbol('dispose')
  var NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet')
  var LRU_LIST = Symbol('lruList')
  var CACHE = Symbol('cache')
  var UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet')
  var naiveLength = () => 1
  var LRUCache = class {
    constructor(options2) {
      if (typeof options2 === 'number') options2 = { max: options2 }
      if (!options2) options2 = {}
      if (options2.max && (typeof options2.max !== 'number' || options2.max < 0))
        throw new TypeError('max must be a non-negative number')
      const max = (this[MAX] = options2.max || Infinity)
      const lc = options2.length || naiveLength
      this[LENGTH_CALCULATOR] = typeof lc !== 'function' ? naiveLength : lc
      this[ALLOW_STALE] = options2.stale || false
      if (options2.maxAge && typeof options2.maxAge !== 'number') throw new TypeError('maxAge must be a number')
      this[MAX_AGE] = options2.maxAge || 0
      this[DISPOSE] = options2.dispose
      this[NO_DISPOSE_ON_SET] = options2.noDisposeOnSet || false
      this[UPDATE_AGE_ON_GET] = options2.updateAgeOnGet || false
      this.reset()
    }
    set max(mL) {
      if (typeof mL !== 'number' || mL < 0) throw new TypeError('max must be a non-negative number')
      this[MAX] = mL || Infinity
      trim(this)
    }
    get max() {
      return this[MAX]
    }
    set allowStale(allowStale) {
      this[ALLOW_STALE] = !!allowStale
    }
    get allowStale() {
      return this[ALLOW_STALE]
    }
    set maxAge(mA) {
      if (typeof mA !== 'number') throw new TypeError('maxAge must be a non-negative number')
      this[MAX_AGE] = mA
      trim(this)
    }
    get maxAge() {
      return this[MAX_AGE]
    }
    set lengthCalculator(lC) {
      if (typeof lC !== 'function') lC = naiveLength
      if (lC !== this[LENGTH_CALCULATOR]) {
        this[LENGTH_CALCULATOR] = lC
        this[LENGTH] = 0
        this[LRU_LIST].forEach((hit) => {
          hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key)
          this[LENGTH] += hit.length
        })
      }
      trim(this)
    }
    get lengthCalculator() {
      return this[LENGTH_CALCULATOR]
    }
    get length() {
      return this[LENGTH]
    }
    get itemCount() {
      return this[LRU_LIST].length
    }
    rforEach(fn, thisp) {
      thisp = thisp || this
      for (let walker = this[LRU_LIST].tail; walker !== null; ) {
        const prev = walker.prev
        forEachStep(this, fn, walker, thisp)
        walker = prev
      }
    }
    forEach(fn, thisp) {
      thisp = thisp || this
      for (let walker = this[LRU_LIST].head; walker !== null; ) {
        const next = walker.next
        forEachStep(this, fn, walker, thisp)
        walker = next
      }
    }
    keys() {
      return this[LRU_LIST].toArray().map((k) => k.key)
    }
    values() {
      return this[LRU_LIST].toArray().map((k) => k.value)
    }
    reset() {
      if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
        this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value))
      }
      this[CACHE] = new Map()
      this[LRU_LIST] = new Yallist()
      this[LENGTH] = 0
    }
    dump() {
      return this[LRU_LIST].map((hit) =>
        isStale(this, hit)
          ? false
          : {
              k: hit.key,
              v: hit.value,
              e: hit.now + (hit.maxAge || 0),
            },
      )
        .toArray()
        .filter((h) => h)
    }
    dumpLru() {
      return this[LRU_LIST]
    }
    set(key, value, maxAge) {
      maxAge = maxAge || this[MAX_AGE]
      if (maxAge && typeof maxAge !== 'number') throw new TypeError('maxAge must be a number')
      const now = maxAge ? Date.now() : 0
      const len = this[LENGTH_CALCULATOR](value, key)
      if (this[CACHE].has(key)) {
        if (len > this[MAX]) {
          del(this, this[CACHE].get(key))
          return false
        }
        const node = this[CACHE].get(key)
        const item = node.value
        if (this[DISPOSE]) {
          if (!this[NO_DISPOSE_ON_SET]) this[DISPOSE](key, item.value)
        }
        item.now = now
        item.maxAge = maxAge
        item.value = value
        this[LENGTH] += len - item.length
        item.length = len
        this.get(key)
        trim(this)
        return true
      }
      const hit = new Entry(key, value, len, now, maxAge)
      if (hit.length > this[MAX]) {
        if (this[DISPOSE]) this[DISPOSE](key, value)
        return false
      }
      this[LENGTH] += hit.length
      this[LRU_LIST].unshift(hit)
      this[CACHE].set(key, this[LRU_LIST].head)
      trim(this)
      return true
    }
    has(key) {
      if (!this[CACHE].has(key)) return false
      const hit = this[CACHE].get(key).value
      return !isStale(this, hit)
    }
    get(key) {
      return get(this, key, true)
    }
    peek(key) {
      return get(this, key, false)
    }
    pop() {
      const node = this[LRU_LIST].tail
      if (!node) return null
      del(this, node)
      return node.value
    }
    del(key) {
      del(this, this[CACHE].get(key))
    }
    load(arr) {
      this.reset()
      const now = Date.now()
      for (let l = arr.length - 1; l >= 0; l--) {
        const hit = arr[l]
        const expiresAt = hit.e || 0
        if (expiresAt === 0) this.set(hit.k, hit.v)
        else {
          const maxAge = expiresAt - now
          if (maxAge > 0) {
            this.set(hit.k, hit.v, maxAge)
          }
        }
      }
    }
    prune() {
      this[CACHE].forEach((value, key) => get(this, key, false))
    }
  }
  var get = (self2, key, doUse) => {
    const node = self2[CACHE].get(key)
    if (node) {
      const hit = node.value
      if (isStale(self2, hit)) {
        del(self2, node)
        if (!self2[ALLOW_STALE]) return void 0
      } else {
        if (doUse) {
          if (self2[UPDATE_AGE_ON_GET]) node.value.now = Date.now()
          self2[LRU_LIST].unshiftNode(node)
        }
      }
      return hit.value
    }
  }
  var isStale = (self2, hit) => {
    if (!hit || (!hit.maxAge && !self2[MAX_AGE])) return false
    const diff = Date.now() - hit.now
    return hit.maxAge ? diff > hit.maxAge : self2[MAX_AGE] && diff > self2[MAX_AGE]
  }
  var trim = (self2) => {
    if (self2[LENGTH] > self2[MAX]) {
      for (let walker = self2[LRU_LIST].tail; self2[LENGTH] > self2[MAX] && walker !== null; ) {
        const prev = walker.prev
        del(self2, walker)
        walker = prev
      }
    }
  }
  var del = (self2, node) => {
    if (node) {
      const hit = node.value
      if (self2[DISPOSE]) self2[DISPOSE](hit.key, hit.value)
      self2[LENGTH] -= hit.length
      self2[CACHE].delete(hit.key)
      self2[LRU_LIST].removeNode(node)
    }
  }
  var Entry = class {
    constructor(key, value, length, now, maxAge) {
      this.key = key
      this.value = value
      this.length = length
      this.now = now
      this.maxAge = maxAge || 0
    }
  }
  var forEachStep = (self2, fn, node, thisp) => {
    let hit = node.value
    if (isStale(self2, hit)) {
      del(self2, node)
      if (!self2[ALLOW_STALE]) hit = void 0
    }
    if (hit) fn.call(thisp, hit.value, hit.key, self2)
  }
  module2.exports = LRUCache
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/classes/range.js
var require_range = __commonJS((exports2, module2) => {
  var Range = class {
    constructor(range, options2) {
      options2 = parseOptions(options2)
      if (range instanceof Range) {
        if (range.loose === !!options2.loose && range.includePrerelease === !!options2.includePrerelease) {
          return range
        } else {
          return new Range(range.raw, options2)
        }
      }
      if (range instanceof Comparator) {
        this.raw = range.value
        this.set = [[range]]
        this.format()
        return this
      }
      this.options = options2
      this.loose = !!options2.loose
      this.includePrerelease = !!options2.includePrerelease
      this.raw = range
      this.set = range
        .split(/\s*\|\|\s*/)
        .map((range2) => this.parseRange(range2.trim()))
        .filter((c) => c.length)
      if (!this.set.length) {
        throw new TypeError(`Invalid SemVer Range: ${range}`)
      }
      if (this.set.length > 1) {
        const first = this.set[0]
        this.set = this.set.filter((c) => !isNullSet(c[0]))
        if (this.set.length === 0) this.set = [first]
        else if (this.set.length > 1) {
          for (const c of this.set) {
            if (c.length === 1 && isAny(c[0])) {
              this.set = [c]
              break
            }
          }
        }
      }
      this.format()
    }
    format() {
      this.range = this.set
        .map((comps) => {
          return comps.join(' ').trim()
        })
        .join('||')
        .trim()
      return this.range
    }
    toString() {
      return this.range
    }
    parseRange(range) {
      range = range.trim()
      const memoOpts = Object.keys(this.options).join(',')
      const memoKey = `parseRange:${memoOpts}:${range}`
      const cached = cache.get(memoKey)
      if (cached) return cached
      const loose = this.options.loose
      const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE]
      range = range.replace(hr, hyphenReplace(this.options.includePrerelease))
      debug('hyphen replace', range)
      range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace)
      debug('comparator trim', range, re[t.COMPARATORTRIM])
      range = range.replace(re[t.TILDETRIM], tildeTrimReplace)
      range = range.replace(re[t.CARETTRIM], caretTrimReplace)
      range = range.split(/\s+/).join(' ')
      const compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
      const rangeList = range
        .split(' ')
        .map((comp) => parseComparator(comp, this.options))
        .join(' ')
        .split(/\s+/)
        .map((comp) => replaceGTE0(comp, this.options))
        .filter(this.options.loose ? (comp) => !!comp.match(compRe) : () => true)
        .map((comp) => new Comparator(comp, this.options))
      const l = rangeList.length
      const rangeMap = new Map()
      for (const comp of rangeList) {
        if (isNullSet(comp)) return [comp]
        rangeMap.set(comp.value, comp)
      }
      if (rangeMap.size > 1 && rangeMap.has('')) rangeMap.delete('')
      const result = [...rangeMap.values()]
      cache.set(memoKey, result)
      return result
    }
    intersects(range, options2) {
      if (!(range instanceof Range)) {
        throw new TypeError('a Range is required')
      }
      return this.set.some((thisComparators) => {
        return (
          isSatisfiable(thisComparators, options2) &&
          range.set.some((rangeComparators) => {
            return (
              isSatisfiable(rangeComparators, options2) &&
              thisComparators.every((thisComparator) => {
                return rangeComparators.every((rangeComparator) => {
                  return thisComparator.intersects(rangeComparator, options2)
                })
              })
            )
          })
        )
      })
    }
    test(version) {
      if (!version) {
        return false
      }
      if (typeof version === 'string') {
        try {
          version = new SemVer(version, this.options)
        } catch (er) {
          return false
        }
      }
      for (let i = 0; i < this.set.length; i++) {
        if (testSet(this.set[i], version, this.options)) {
          return true
        }
      }
      return false
    }
  }
  module2.exports = Range
  var LRU = require_lru_cache()
  var cache = new LRU({ max: 1e3 })
  var parseOptions = require_parse_options()
  var Comparator = require_comparator()
  var debug = require_debug()
  var SemVer = require_semver()
  var { re, t, comparatorTrimReplace, tildeTrimReplace, caretTrimReplace } = require_re()
  var isNullSet = (c) => c.value === '<0.0.0-0'
  var isAny = (c) => c.value === ''
  var isSatisfiable = (comparators, options2) => {
    let result = true
    const remainingComparators = comparators.slice()
    let testComparator = remainingComparators.pop()
    while (result && remainingComparators.length) {
      result = remainingComparators.every((otherComparator) => {
        return testComparator.intersects(otherComparator, options2)
      })
      testComparator = remainingComparators.pop()
    }
    return result
  }
  var parseComparator = (comp, options2) => {
    debug('comp', comp, options2)
    comp = replaceCarets(comp, options2)
    debug('caret', comp)
    comp = replaceTildes(comp, options2)
    debug('tildes', comp)
    comp = replaceXRanges(comp, options2)
    debug('xrange', comp)
    comp = replaceStars(comp, options2)
    debug('stars', comp)
    return comp
  }
  var isX = (id) => !id || id.toLowerCase() === 'x' || id === '*'
  var replaceTildes = (comp, options2) =>
    comp
      .trim()
      .split(/\s+/)
      .map((comp2) => {
        return replaceTilde(comp2, options2)
      })
      .join(' ')
  var replaceTilde = (comp, options2) => {
    const r = options2.loose ? re[t.TILDELOOSE] : re[t.TILDE]
    return comp.replace(r, (_2, M, m, p, pr) => {
      debug('tilde', comp, _2, M, m, p, pr)
      let ret
      if (isX(M)) {
        ret = ''
      } else if (isX(m)) {
        ret = `>=${M}.0.0 <${+M + 1}.0.0-0`
      } else if (isX(p)) {
        ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`
      } else if (pr) {
        debug('replaceTilde pr', pr)
        ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`
      } else {
        ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`
      }
      debug('tilde return', ret)
      return ret
    })
  }
  var replaceCarets = (comp, options2) =>
    comp
      .trim()
      .split(/\s+/)
      .map((comp2) => {
        return replaceCaret(comp2, options2)
      })
      .join(' ')
  var replaceCaret = (comp, options2) => {
    debug('caret', comp, options2)
    const r = options2.loose ? re[t.CARETLOOSE] : re[t.CARET]
    const z = options2.includePrerelease ? '-0' : ''
    return comp.replace(r, (_2, M, m, p, pr) => {
      debug('caret', comp, _2, M, m, p, pr)
      let ret
      if (isX(M)) {
        ret = ''
      } else if (isX(m)) {
        ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`
      } else if (isX(p)) {
        if (M === '0') {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`
        } else {
          ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`
        }
      } else if (pr) {
        debug('replaceCaret pr', pr)
        if (M === '0') {
          if (m === '0') {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`
          }
        } else {
          ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`
        }
      } else {
        debug('no pr')
        if (M === '0') {
          if (m === '0') {
            ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`
          } else {
            ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`
          }
        } else {
          ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`
        }
      }
      debug('caret return', ret)
      return ret
    })
  }
  var replaceXRanges = (comp, options2) => {
    debug('replaceXRanges', comp, options2)
    return comp
      .split(/\s+/)
      .map((comp2) => {
        return replaceXRange(comp2, options2)
      })
      .join(' ')
  }
  var replaceXRange = (comp, options2) => {
    comp = comp.trim()
    const r = options2.loose ? re[t.XRANGELOOSE] : re[t.XRANGE]
    return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
      debug('xRange', comp, ret, gtlt, M, m, p, pr)
      const xM = isX(M)
      const xm = xM || isX(m)
      const xp = xm || isX(p)
      const anyX = xp
      if (gtlt === '=' && anyX) {
        gtlt = ''
      }
      pr = options2.includePrerelease ? '-0' : ''
      if (xM) {
        if (gtlt === '>' || gtlt === '<') {
          ret = '<0.0.0-0'
        } else {
          ret = '*'
        }
      } else if (gtlt && anyX) {
        if (xm) {
          m = 0
        }
        p = 0
        if (gtlt === '>') {
          gtlt = '>='
          if (xm) {
            M = +M + 1
            m = 0
            p = 0
          } else {
            m = +m + 1
            p = 0
          }
        } else if (gtlt === '<=') {
          gtlt = '<'
          if (xm) {
            M = +M + 1
          } else {
            m = +m + 1
          }
        }
        if (gtlt === '<') pr = '-0'
        ret = `${gtlt + M}.${m}.${p}${pr}`
      } else if (xm) {
        ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`
      } else if (xp) {
        ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`
      }
      debug('xRange return', ret)
      return ret
    })
  }
  var replaceStars = (comp, options2) => {
    debug('replaceStars', comp, options2)
    return comp.trim().replace(re[t.STAR], '')
  }
  var replaceGTE0 = (comp, options2) => {
    debug('replaceGTE0', comp, options2)
    return comp.trim().replace(re[options2.includePrerelease ? t.GTE0PRE : t.GTE0], '')
  }
  var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
    if (isX(fM)) {
      from = ''
    } else if (isX(fm)) {
      from = `>=${fM}.0.0${incPr ? '-0' : ''}`
    } else if (isX(fp)) {
      from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`
    } else if (fpr) {
      from = `>=${from}`
    } else {
      from = `>=${from}${incPr ? '-0' : ''}`
    }
    if (isX(tM)) {
      to = ''
    } else if (isX(tm)) {
      to = `<${+tM + 1}.0.0-0`
    } else if (isX(tp)) {
      to = `<${tM}.${+tm + 1}.0-0`
    } else if (tpr) {
      to = `<=${tM}.${tm}.${tp}-${tpr}`
    } else if (incPr) {
      to = `<${tM}.${tm}.${+tp + 1}-0`
    } else {
      to = `<=${to}`
    }
    return `${from} ${to}`.trim()
  }
  var testSet = (set, version, options2) => {
    for (let i = 0; i < set.length; i++) {
      if (!set[i].test(version)) {
        return false
      }
    }
    if (version.prerelease.length && !options2.includePrerelease) {
      for (let i = 0; i < set.length; i++) {
        debug(set[i].semver)
        if (set[i].semver === Comparator.ANY) {
          continue
        }
        if (set[i].semver.prerelease.length > 0) {
          const allowed = set[i].semver
          if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
            return true
          }
        }
      }
      return false
    }
    return true
  }
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/classes/comparator.js
var require_comparator = __commonJS((exports2, module2) => {
  var ANY = Symbol('SemVer ANY')
  var Comparator = class {
    static get ANY() {
      return ANY
    }
    constructor(comp, options2) {
      options2 = parseOptions(options2)
      if (comp instanceof Comparator) {
        if (comp.loose === !!options2.loose) {
          return comp
        } else {
          comp = comp.value
        }
      }
      debug('comparator', comp, options2)
      this.options = options2
      this.loose = !!options2.loose
      this.parse(comp)
      if (this.semver === ANY) {
        this.value = ''
      } else {
        this.value = this.operator + this.semver.version
      }
      debug('comp', this)
    }
    parse(comp) {
      const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
      const m = comp.match(r)
      if (!m) {
        throw new TypeError(`Invalid comparator: ${comp}`)
      }
      this.operator = m[1] !== void 0 ? m[1] : ''
      if (this.operator === '=') {
        this.operator = ''
      }
      if (!m[2]) {
        this.semver = ANY
      } else {
        this.semver = new SemVer(m[2], this.options.loose)
      }
    }
    toString() {
      return this.value
    }
    test(version) {
      debug('Comparator.test', version, this.options.loose)
      if (this.semver === ANY || version === ANY) {
        return true
      }
      if (typeof version === 'string') {
        try {
          version = new SemVer(version, this.options)
        } catch (er) {
          return false
        }
      }
      return cmp(version, this.operator, this.semver, this.options)
    }
    intersects(comp, options2) {
      if (!(comp instanceof Comparator)) {
        throw new TypeError('a Comparator is required')
      }
      if (!options2 || typeof options2 !== 'object') {
        options2 = {
          loose: !!options2,
          includePrerelease: false,
        }
      }
      if (this.operator === '') {
        if (this.value === '') {
          return true
        }
        return new Range(comp.value, options2).test(this.value)
      } else if (comp.operator === '') {
        if (comp.value === '') {
          return true
        }
        return new Range(this.value, options2).test(comp.semver)
      }
      const sameDirectionIncreasing =
        (this.operator === '>=' || this.operator === '>') && (comp.operator === '>=' || comp.operator === '>')
      const sameDirectionDecreasing =
        (this.operator === '<=' || this.operator === '<') && (comp.operator === '<=' || comp.operator === '<')
      const sameSemVer = this.semver.version === comp.semver.version
      const differentDirectionsInclusive =
        (this.operator === '>=' || this.operator === '<=') && (comp.operator === '>=' || comp.operator === '<=')
      const oppositeDirectionsLessThan =
        cmp(this.semver, '<', comp.semver, options2) &&
        (this.operator === '>=' || this.operator === '>') &&
        (comp.operator === '<=' || comp.operator === '<')
      const oppositeDirectionsGreaterThan =
        cmp(this.semver, '>', comp.semver, options2) &&
        (this.operator === '<=' || this.operator === '<') &&
        (comp.operator === '>=' || comp.operator === '>')
      return (
        sameDirectionIncreasing ||
        sameDirectionDecreasing ||
        (sameSemVer && differentDirectionsInclusive) ||
        oppositeDirectionsLessThan ||
        oppositeDirectionsGreaterThan
      )
    }
  }
  module2.exports = Comparator
  var parseOptions = require_parse_options()
  var { re, t } = require_re()
  var cmp = require_cmp()
  var debug = require_debug()
  var SemVer = require_semver()
  var Range = require_range()
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS((exports2, module2) => {
  var Range = require_range()
  var satisfies = (version, range, options2) => {
    try {
      range = new Range(range, options2)
    } catch (er) {
      return false
    }
    return range.test(version)
  }
  module2.exports = satisfies
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/to-comparators.js
var require_to_comparators = __commonJS((exports2, module2) => {
  var Range = require_range()
  var toComparators = (range, options2) =>
    new Range(range, options2).set.map((comp) =>
      comp
        .map((c) => c.value)
        .join(' ')
        .trim()
        .split(' '),
    )
  module2.exports = toComparators
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS((exports2, module2) => {
  var SemVer = require_semver()
  var Range = require_range()
  var maxSatisfying = (versions, range, options2) => {
    let max = null
    let maxSV = null
    let rangeObj = null
    try {
      rangeObj = new Range(range, options2)
    } catch (er) {
      return null
    }
    versions.forEach((v) => {
      if (rangeObj.test(v)) {
        if (!max || maxSV.compare(v) === -1) {
          max = v
          maxSV = new SemVer(max, options2)
        }
      }
    })
    return max
  }
  module2.exports = maxSatisfying
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = __commonJS((exports2, module2) => {
  var SemVer = require_semver()
  var Range = require_range()
  var minSatisfying = (versions, range, options2) => {
    let min = null
    let minSV = null
    let rangeObj = null
    try {
      rangeObj = new Range(range, options2)
    } catch (er) {
      return null
    }
    versions.forEach((v) => {
      if (rangeObj.test(v)) {
        if (!min || minSV.compare(v) === 1) {
          min = v
          minSV = new SemVer(min, options2)
        }
      }
    })
    return min
  }
  module2.exports = minSatisfying
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/min-version.js
var require_min_version = __commonJS((exports2, module2) => {
  var SemVer = require_semver()
  var Range = require_range()
  var gt = require_gt()
  var minVersion = (range, loose) => {
    range = new Range(range, loose)
    let minver = new SemVer('0.0.0')
    if (range.test(minver)) {
      return minver
    }
    minver = new SemVer('0.0.0-0')
    if (range.test(minver)) {
      return minver
    }
    minver = null
    for (let i = 0; i < range.set.length; ++i) {
      const comparators = range.set[i]
      let setMin = null
      comparators.forEach((comparator) => {
        const compver = new SemVer(comparator.semver.version)
        switch (comparator.operator) {
          case '>':
            if (compver.prerelease.length === 0) {
              compver.patch++
            } else {
              compver.prerelease.push(0)
            }
            compver.raw = compver.format()
          case '':
          case '>=':
            if (!setMin || gt(compver, setMin)) {
              setMin = compver
            }
            break
          case '<':
          case '<=':
            break
          default:
            throw new Error(`Unexpected operation: ${comparator.operator}`)
        }
      })
      if (setMin && (!minver || gt(minver, setMin))) minver = setMin
    }
    if (minver && range.test(minver)) {
      return minver
    }
    return null
  }
  module2.exports = minVersion
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/valid.js
var require_valid2 = __commonJS((exports2, module2) => {
  var Range = require_range()
  var validRange = (range, options2) => {
    try {
      return new Range(range, options2).range || '*'
    } catch (er) {
      return null
    }
  }
  module2.exports = validRange
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/outside.js
var require_outside = __commonJS((exports2, module2) => {
  var SemVer = require_semver()
  var Comparator = require_comparator()
  var { ANY } = Comparator
  var Range = require_range()
  var satisfies = require_satisfies()
  var gt = require_gt()
  var lt = require_lt()
  var lte = require_lte()
  var gte = require_gte()
  var outside = (version, range, hilo, options2) => {
    version = new SemVer(version, options2)
    range = new Range(range, options2)
    let gtfn, ltefn, ltfn, comp, ecomp
    switch (hilo) {
      case '>':
        gtfn = gt
        ltefn = lte
        ltfn = lt
        comp = '>'
        ecomp = '>='
        break
      case '<':
        gtfn = lt
        ltefn = gte
        ltfn = gt
        comp = '<'
        ecomp = '<='
        break
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"')
    }
    if (satisfies(version, range, options2)) {
      return false
    }
    for (let i = 0; i < range.set.length; ++i) {
      const comparators = range.set[i]
      let high = null
      let low = null
      comparators.forEach((comparator) => {
        if (comparator.semver === ANY) {
          comparator = new Comparator('>=0.0.0')
        }
        high = high || comparator
        low = low || comparator
        if (gtfn(comparator.semver, high.semver, options2)) {
          high = comparator
        } else if (ltfn(comparator.semver, low.semver, options2)) {
          low = comparator
        }
      })
      if (high.operator === comp || high.operator === ecomp) {
        return false
      }
      if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
        return false
      } else if (low.operator === ecomp && ltfn(version, low.semver)) {
        return false
      }
    }
    return true
  }
  module2.exports = outside
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/gtr.js
var require_gtr = __commonJS((exports2, module2) => {
  var outside = require_outside()
  var gtr = (version, range, options2) => outside(version, range, '>', options2)
  module2.exports = gtr
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/ltr.js
var require_ltr = __commonJS((exports2, module2) => {
  var outside = require_outside()
  var ltr = (version, range, options2) => outside(version, range, '<', options2)
  module2.exports = ltr
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/intersects.js
var require_intersects = __commonJS((exports2, module2) => {
  var Range = require_range()
  var intersects = (r1, r2, options2) => {
    r1 = new Range(r1, options2)
    r2 = new Range(r2, options2)
    return r1.intersects(r2)
  }
  module2.exports = intersects
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/simplify.js
var require_simplify = __commonJS((exports2, module2) => {
  var satisfies = require_satisfies()
  var compare = require_compare()
  module2.exports = (versions, range, options2) => {
    const set = []
    let min = null
    let prev = null
    const v = versions.sort((a, b) => compare(a, b, options2))
    for (const version of v) {
      const included = satisfies(version, range, options2)
      if (included) {
        prev = version
        if (!min) min = version
      } else {
        if (prev) {
          set.push([min, prev])
        }
        prev = null
        min = null
      }
    }
    if (min) set.push([min, null])
    const ranges = []
    for (const [min2, max] of set) {
      if (min2 === max) ranges.push(min2)
      else if (!max && min2 === v[0]) ranges.push('*')
      else if (!max) ranges.push(`>=${min2}`)
      else if (min2 === v[0]) ranges.push(`<=${max}`)
      else ranges.push(`${min2} - ${max}`)
    }
    const simplified = ranges.join(' || ')
    const original = typeof range.raw === 'string' ? range.raw : String(range)
    return simplified.length < original.length ? simplified : range
  }
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/ranges/subset.js
var require_subset = __commonJS((exports2, module2) => {
  var Range = require_range()
  var Comparator = require_comparator()
  var { ANY } = Comparator
  var satisfies = require_satisfies()
  var compare = require_compare()
  var subset = (sub, dom, options2 = {}) => {
    if (sub === dom) return true
    sub = new Range(sub, options2)
    dom = new Range(dom, options2)
    let sawNonNull = false
    OUTER: for (const simpleSub of sub.set) {
      for (const simpleDom of dom.set) {
        const isSub = simpleSubset(simpleSub, simpleDom, options2)
        sawNonNull = sawNonNull || isSub !== null
        if (isSub) continue OUTER
      }
      if (sawNonNull) return false
    }
    return true
  }
  var simpleSubset = (sub, dom, options2) => {
    if (sub === dom) return true
    if (sub.length === 1 && sub[0].semver === ANY) {
      if (dom.length === 1 && dom[0].semver === ANY) return true
      else if (options2.includePrerelease) sub = [new Comparator('>=0.0.0-0')]
      else sub = [new Comparator('>=0.0.0')]
    }
    if (dom.length === 1 && dom[0].semver === ANY) {
      if (options2.includePrerelease) return true
      else dom = [new Comparator('>=0.0.0')]
    }
    const eqSet = new Set()
    let gt, lt
    for (const c of sub) {
      if (c.operator === '>' || c.operator === '>=') gt = higherGT(gt, c, options2)
      else if (c.operator === '<' || c.operator === '<=') lt = lowerLT(lt, c, options2)
      else eqSet.add(c.semver)
    }
    if (eqSet.size > 1) return null
    let gtltComp
    if (gt && lt) {
      gtltComp = compare(gt.semver, lt.semver, options2)
      if (gtltComp > 0) return null
      else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) return null
    }
    for (const eq of eqSet) {
      if (gt && !satisfies(eq, String(gt), options2)) return null
      if (lt && !satisfies(eq, String(lt), options2)) return null
      for (const c of dom) {
        if (!satisfies(eq, String(c), options2)) return false
      }
      return true
    }
    let higher, lower
    let hasDomLT, hasDomGT
    let needDomLTPre = lt && !options2.includePrerelease && lt.semver.prerelease.length ? lt.semver : false
    let needDomGTPre = gt && !options2.includePrerelease && gt.semver.prerelease.length ? gt.semver : false
    if (
      needDomLTPre &&
      needDomLTPre.prerelease.length === 1 &&
      lt.operator === '<' &&
      needDomLTPre.prerelease[0] === 0
    ) {
      needDomLTPre = false
    }
    for (const c of dom) {
      hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>='
      hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<='
      if (gt) {
        if (needDomGTPre) {
          if (
            c.semver.prerelease &&
            c.semver.prerelease.length &&
            c.semver.major === needDomGTPre.major &&
            c.semver.minor === needDomGTPre.minor &&
            c.semver.patch === needDomGTPre.patch
          ) {
            needDomGTPre = false
          }
        }
        if (c.operator === '>' || c.operator === '>=') {
          higher = higherGT(gt, c, options2)
          if (higher === c && higher !== gt) return false
        } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options2)) return false
      }
      if (lt) {
        if (needDomLTPre) {
          if (
            c.semver.prerelease &&
            c.semver.prerelease.length &&
            c.semver.major === needDomLTPre.major &&
            c.semver.minor === needDomLTPre.minor &&
            c.semver.patch === needDomLTPre.patch
          ) {
            needDomLTPre = false
          }
        }
        if (c.operator === '<' || c.operator === '<=') {
          lower = lowerLT(lt, c, options2)
          if (lower === c && lower !== lt) return false
        } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options2)) return false
      }
      if (!c.operator && (lt || gt) && gtltComp !== 0) return false
    }
    if (gt && hasDomLT && !lt && gtltComp !== 0) return false
    if (lt && hasDomGT && !gt && gtltComp !== 0) return false
    if (needDomGTPre || needDomLTPre) return false
    return true
  }
  var higherGT = (a, b, options2) => {
    if (!a) return b
    const comp = compare(a.semver, b.semver, options2)
    return comp > 0 ? a : comp < 0 ? b : b.operator === '>' && a.operator === '>=' ? b : a
  }
  var lowerLT = (a, b, options2) => {
    if (!a) return b
    const comp = compare(a.semver, b.semver, options2)
    return comp < 0 ? a : comp > 0 ? b : b.operator === '<' && a.operator === '<=' ? b : a
  }
  module2.exports = subset
})

// ../../node_modules/.pnpm/semver@7.3.5/node_modules/semver/index.js
var require_semver2 = __commonJS((exports2, module2) => {
  var internalRe = require_re()
  module2.exports = {
    re: internalRe.re,
    src: internalRe.src,
    tokens: internalRe.t,
    SEMVER_SPEC_VERSION: require_constants().SEMVER_SPEC_VERSION,
    SemVer: require_semver(),
    compareIdentifiers: require_identifiers().compareIdentifiers,
    rcompareIdentifiers: require_identifiers().rcompareIdentifiers,
    parse: require_parse(),
    valid: require_valid(),
    clean: require_clean(),
    inc: require_inc(),
    diff: require_diff(),
    major: require_major(),
    minor: require_minor(),
    patch: require_patch(),
    prerelease: require_prerelease(),
    compare: require_compare(),
    rcompare: require_rcompare(),
    compareLoose: require_compare_loose(),
    compareBuild: require_compare_build(),
    sort: require_sort(),
    rsort: require_rsort(),
    gt: require_gt(),
    lt: require_lt(),
    eq: require_eq(),
    neq: require_neq(),
    gte: require_gte(),
    lte: require_lte(),
    cmp: require_cmp(),
    coerce: require_coerce(),
    Comparator: require_comparator(),
    Range: require_range(),
    satisfies: require_satisfies(),
    toComparators: require_to_comparators(),
    maxSatisfying: require_max_satisfying(),
    minSatisfying: require_min_satisfying(),
    minVersion: require_min_version(),
    validRange: require_valid2(),
    outside: require_outside(),
    gtr: require_gtr(),
    ltr: require_ltr(),
    intersects: require_intersects(),
    simplifyRange: require_simplify(),
    subset: require_subset(),
  }
})

// ../../node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/lib/parse.js
var require_parse2 = __commonJS((exports2, module2) => {
  'use strict'
  var path3 = require('path')
  var niceTry = require_src()
  var resolveCommand = require_resolveCommand()
  var escape = require_escape()
  var readShebang = require_readShebang()
  var semver = require_semver2()
  var isWin = process.platform === 'win32'
  var isExecutableRegExp = /\.(?:com|exe)$/i
  var isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i
  var supportsShellOption =
    niceTry(() => semver.satisfies(process.version, '^4.8.0 || ^5.7.0 || >= 6.0.0', true)) || false
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
      parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars))
      const shellCommand = [parsed.command].concat(parsed.args).join(' ')
      parsed.args = ['/d', '/s', '/c', `"${shellCommand}"`]
      parsed.command = process.env.comspec || 'cmd.exe'
      parsed.options.windowsVerbatimArguments = true
    }
    return parsed
  }
  function parseShell(parsed) {
    if (supportsShellOption) {
      return parsed
    }
    const shellCommand = [parsed.command].concat(parsed.args).join(' ')
    if (isWin) {
      parsed.command =
        typeof parsed.options.shell === 'string' ? parsed.options.shell : process.env.comspec || 'cmd.exe'
      parsed.args = ['/d', '/s', '/c', `"${shellCommand}"`]
      parsed.options.windowsVerbatimArguments = true
    } else {
      if (typeof parsed.options.shell === 'string') {
        parsed.command = parsed.options.shell
      } else if (process.platform === 'android') {
        parsed.command = '/system/bin/sh'
      } else {
        parsed.command = '/bin/sh'
      }
      parsed.args = ['-c', shellCommand]
    }
    return parsed
  }
  function parse(command, args, options2) {
    if (args && !Array.isArray(args)) {
      options2 = args
      args = null
    }
    args = args ? args.slice(0) : []
    options2 = Object.assign({}, options2)
    const parsed = {
      command,
      args,
      options: options2,
      file: void 0,
      original: {
        command,
        args,
      },
    }
    return options2.shell ? parseShell(parsed) : parseNonShell(parsed)
  }
  module2.exports = parse
})

// ../../node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/lib/enoent.js
var require_enoent = __commonJS((exports2, module2) => {
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
})

// ../../node_modules/.pnpm/cross-spawn@6.0.5/node_modules/cross-spawn/index.js
var require_cross_spawn = __commonJS((exports2, module2) => {
  'use strict'
  var cp = require('child_process')
  var parse = require_parse2()
  var enoent = require_enoent()
  function spawn2(command, args, options2) {
    const parsed = parse(command, args, options2)
    const spawned = cp.spawn(parsed.command, parsed.args, parsed.options)
    enoent.hookChildProcess(spawned, parsed)
    return spawned
  }
  function spawnSync(command, args, options2) {
    const parsed = parse(command, args, options2)
    const result = cp.spawnSync(parsed.command, parsed.args, parsed.options)
    result.error = result.error || enoent.verifyENOENTSync(result.status, parsed)
    return result
  }
  module2.exports = spawn2
  module2.exports.spawn = spawn2
  module2.exports.sync = spawnSync
  module2.exports._parse = parse
  module2.exports._enoent = enoent
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/utils/array.js
var require_array = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.splitWhen = exports2.flatten = void 0
  function flatten(items) {
    return items.reduce((collection, item) => [].concat(collection, item), [])
  }
  exports2.flatten = flatten
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
  exports2.splitWhen = splitWhen
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/utils/errno.js
var require_errno = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.isEnoentCodeError = void 0
  function isEnoentCodeError(error) {
    return error.code === 'ENOENT'
  }
  exports2.isEnoentCodeError = isEnoentCodeError
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/utils/fs.js
var require_fs = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.createDirentFromStats = void 0
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
  exports2.createDirentFromStats = createDirentFromStats
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/utils/path.js
var require_path = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.removeLeadingDotSegment = exports2.escape = exports2.makeAbsolute = exports2.unixify = void 0
  var path3 = require('path')
  var LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2
  var UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\())/g
  function unixify(filepath) {
    return filepath.replace(/\\/g, '/')
  }
  exports2.unixify = unixify
  function makeAbsolute(cwd, filepath) {
    return path3.resolve(cwd, filepath)
  }
  exports2.makeAbsolute = makeAbsolute
  function escape(pattern) {
    return pattern.replace(UNESCAPED_GLOB_SYMBOLS_RE, '\\$2')
  }
  exports2.escape = escape
  function removeLeadingDotSegment(entry) {
    if (entry.charAt(0) === '.') {
      const secondCharactery = entry.charAt(1)
      if (secondCharactery === '/' || secondCharactery === '\\') {
        return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT)
      }
    }
    return entry
  }
  exports2.removeLeadingDotSegment = removeLeadingDotSegment
})

// ../../node_modules/.pnpm/is-extglob@2.1.1/node_modules/is-extglob/index.js
var require_is_extglob = __commonJS((exports2, module2) => {
  /*!
   * is-extglob <https://github.com/jonschlinkert/is-extglob>
   *
   * Copyright (c) 2014-2016, Jon Schlinkert.
   * Licensed under the MIT License.
   */
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
})

// ../../node_modules/.pnpm/is-glob@4.0.1/node_modules/is-glob/index.js
var require_is_glob = __commonJS((exports2, module2) => {
  /*!
   * is-glob <https://github.com/jonschlinkert/is-glob>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   */
  var isExtglob = require_is_extglob()
  var chars = { '{': '}', '(': ')', '[': ']' }
  var strictRegex = /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/
  var relaxedRegex = /\\(.)|(^!|[*?{}()[\]]|\(\?)/
  module2.exports = function isGlob(str, options2) {
    if (typeof str !== 'string' || str === '') {
      return false
    }
    if (isExtglob(str)) {
      return true
    }
    var regex = strictRegex
    var match
    if (options2 && options2.strict === false) {
      regex = relaxedRegex
    }
    while ((match = regex.exec(str))) {
      if (match[2]) return true
      var idx = match.index + match[0].length
      var open = match[1]
      var close = open ? chars[open] : null
      if (open && close) {
        var n = str.indexOf(close, idx)
        if (n !== -1) {
          idx = n + 1
        }
      }
      str = str.slice(idx)
    }
    return false
  }
})

// ../../node_modules/.pnpm/glob-parent@5.1.2/node_modules/glob-parent/index.js
var require_glob_parent = __commonJS((exports2, module2) => {
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
    var options2 = Object.assign({ flipBackslashes: true }, opts)
    if (options2.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
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
})

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/utils.js
var require_utils = __commonJS((exports2) => {
  'use strict'
  exports2.isInteger = (num) => {
    if (typeof num === 'number') {
      return Number.isInteger(num)
    }
    if (typeof num === 'string' && num.trim() !== '') {
      return Number.isInteger(Number(num))
    }
    return false
  }
  exports2.find = (node, type) => node.nodes.find((node2) => node2.type === type)
  exports2.exceedsLimit = (min, max, step = 1, limit) => {
    if (limit === false) return false
    if (!exports2.isInteger(min) || !exports2.isInteger(max)) return false
    return (Number(max) - Number(min)) / Number(step) >= limit
  }
  exports2.escapeNode = (block, n = 0, type) => {
    let node = block.nodes[n]
    if (!node) return
    if ((type && node.type === type) || node.type === 'open' || node.type === 'close') {
      if (node.escaped !== true) {
        node.value = '\\' + node.value
        node.escaped = true
      }
    }
  }
  exports2.encloseBrace = (node) => {
    if (node.type !== 'brace') return false
    if ((node.commas >> (0 + node.ranges)) >> 0 === 0) {
      node.invalid = true
      return true
    }
    return false
  }
  exports2.isInvalidBrace = (block) => {
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
  exports2.isOpenOrClose = (node) => {
    if (node.type === 'open' || node.type === 'close') {
      return true
    }
    return node.open === true || node.close === true
  }
  exports2.reduce = (nodes) =>
    nodes.reduce((acc, node) => {
      if (node.type === 'text') acc.push(node.value)
      if (node.type === 'range') node.type = 'text'
      return acc
    }, [])
  exports2.flatten = (...args) => {
    const result = []
    const flat = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        let ele = arr[i]
        Array.isArray(ele) ? flat(ele, result) : ele !== void 0 && result.push(ele)
      }
      return result
    }
    flat(args)
    return result
  }
})

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/stringify.js
var require_stringify = __commonJS((exports2, module2) => {
  'use strict'
  var utils = require_utils()
  module2.exports = (ast, options2 = {}) => {
    let stringify = (node, parent = {}) => {
      let invalidBlock = options2.escapeInvalid && utils.isInvalidBrace(parent)
      let invalidNode = node.invalid === true && options2.escapeInvalid === true
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
})

// ../../node_modules/.pnpm/kind-of@6.0.3/node_modules/kind-of/index.js
var require_kind_of = __commonJS((exports2, module2) => {
  var toString = Object.prototype.toString
  module2.exports = function kindOf(val) {
    if (val === void 0) return 'undefined'
    if (val === null) return 'null'
    var type = typeof val
    if (type === 'boolean') return 'boolean'
    if (type === 'string') return 'string'
    if (type === 'number') return 'number'
    if (type === 'symbol') return 'symbol'
    if (type === 'function') {
      return isGeneratorFn(val) ? 'generatorfunction' : 'function'
    }
    if (isArray(val)) return 'array'
    if (isBuffer(val)) return 'buffer'
    if (isArguments(val)) return 'arguments'
    if (isDate(val)) return 'date'
    if (isError(val)) return 'error'
    if (isRegexp(val)) return 'regexp'
    switch (ctorName(val)) {
      case 'Symbol':
        return 'symbol'
      case 'Promise':
        return 'promise'
      case 'WeakMap':
        return 'weakmap'
      case 'WeakSet':
        return 'weakset'
      case 'Map':
        return 'map'
      case 'Set':
        return 'set'
      case 'Int8Array':
        return 'int8array'
      case 'Uint8Array':
        return 'uint8array'
      case 'Uint8ClampedArray':
        return 'uint8clampedarray'
      case 'Int16Array':
        return 'int16array'
      case 'Uint16Array':
        return 'uint16array'
      case 'Int32Array':
        return 'int32array'
      case 'Uint32Array':
        return 'uint32array'
      case 'Float32Array':
        return 'float32array'
      case 'Float64Array':
        return 'float64array'
    }
    if (isGeneratorObj(val)) {
      return 'generator'
    }
    type = toString.call(val)
    switch (type) {
      case '[object Object]':
        return 'object'
      case '[object Map Iterator]':
        return 'mapiterator'
      case '[object Set Iterator]':
        return 'setiterator'
      case '[object String Iterator]':
        return 'stringiterator'
      case '[object Array Iterator]':
        return 'arrayiterator'
    }
    return type.slice(8, -1).toLowerCase().replace(/\s/g, '')
  }
  function ctorName(val) {
    return typeof val.constructor === 'function' ? val.constructor.name : null
  }
  function isArray(val) {
    if (Array.isArray) return Array.isArray(val)
    return val instanceof Array
  }
  function isError(val) {
    return (
      val instanceof Error ||
      (typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number')
    )
  }
  function isDate(val) {
    if (val instanceof Date) return true
    return (
      typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function'
    )
  }
  function isRegexp(val) {
    if (val instanceof RegExp) return true
    return (
      typeof val.flags === 'string' &&
      typeof val.ignoreCase === 'boolean' &&
      typeof val.multiline === 'boolean' &&
      typeof val.global === 'boolean'
    )
  }
  function isGeneratorFn(name, val) {
    return ctorName(name) === 'GeneratorFunction'
  }
  function isGeneratorObj(val) {
    return typeof val.throw === 'function' && typeof val.return === 'function' && typeof val.next === 'function'
  }
  function isArguments(val) {
    try {
      if (typeof val.length === 'number' && typeof val.callee === 'function') {
        return true
      }
    } catch (err) {
      if (err.message.indexOf('callee') !== -1) {
        return true
      }
    }
    return false
  }
  function isBuffer(val) {
    if (val.constructor && typeof val.constructor.isBuffer === 'function') {
      return val.constructor.isBuffer(val)
    }
    return false
  }
})

// ../../node_modules/.pnpm/is-number@3.0.0/node_modules/is-number/index.js
var require_is_number = __commonJS((exports2, module2) => {
  /*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-2015, Jon Schlinkert.
   * Licensed under the MIT License.
   */
  'use strict'
  var typeOf = require_kind_of()
  module2.exports = function isNumber(num) {
    var type = typeOf(num)
    if (type === 'string') {
      if (!num.trim()) return false
    } else if (type !== 'number') {
      return false
    }
    return num - num + 1 >= 0
  }
})

// ../../node_modules/.pnpm/to-regex-range@5.0.1/node_modules/to-regex-range/index.js
var require_to_regex_range = __commonJS((exports2, module2) => {
  /*!
   * to-regex-range <https://github.com/micromatch/to-regex-range>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Released under the MIT License.
   */
  'use strict'
  var isNumber = require_is_number()
  var toRegexRange = (min, max, options2) => {
    if (isNumber(min) === false) {
      throw new TypeError('toRegexRange: expected the first argument to be a number')
    }
    if (max === void 0 || min === max) {
      return String(min)
    }
    if (isNumber(max) === false) {
      throw new TypeError('toRegexRange: expected the second argument to be a number.')
    }
    let opts = { relaxZeros: true, ...options2 }
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
    } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
      state.result = `(?:${state.result})`
    }
    toRegexRange.cache[cacheKey] = state
    return state.result
  }
  function collatePatterns(neg, pos, options2) {
    let onlyNegative = filterPatterns(neg, pos, '-', false, options2) || []
    let onlyPositive = filterPatterns(pos, neg, '', false, options2) || []
    let intersected = filterPatterns(neg, pos, '-?', true, options2) || []
    let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive)
    return subpatterns.join('|')
  }
  function splitToRanges(min, max) {
    let nines = 1
    let zeros = 1
    let stop = countNines(min, nines)
    let stops = new Set([max])
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
  function rangeToPattern(start, stop, options2) {
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
        pattern += toCharacterClass(startDigit, stopDigit, options2)
      } else {
        count++
      }
    }
    if (count) {
      pattern += options2.shorthand === true ? '\\d' : '[0-9]'
    }
    return { pattern, count: [count], digits }
  }
  function splitToPatterns(min, max, tok, options2) {
    let ranges = splitToRanges(min, max)
    let tokens = []
    let start = min
    let prev
    for (let i = 0; i < ranges.length; i++) {
      let max2 = ranges[i]
      let obj = rangeToPattern(String(start), String(max2), options2)
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
        zeros = padZeros(max2, tok, options2)
      }
      obj.string = zeros + obj.pattern + toQuantifier(obj.count)
      tokens.push(obj)
      start = max2 + 1
      prev = obj
    }
    return tokens
  }
  function filterPatterns(arr, comparison, prefix, intersection, options2) {
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
  function toCharacterClass(a, b, options2) {
    return `[${a}${b - a === 1 ? '' : '-'}${b}]`
  }
  function hasPadding(str) {
    return /^-?(0+)\d/.test(str)
  }
  function padZeros(value, tok, options2) {
    if (!tok.isPadded) {
      return value
    }
    let diff = Math.abs(tok.maxLen - String(value).length)
    let relax = options2.relaxZeros !== false
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
})

// ../../node_modules/.pnpm/fill-range@7.0.1/node_modules/fill-range/index.js
var require_fill_range = __commonJS((exports2, module2) => {
  /*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Licensed under the MIT License.
   */
  'use strict'
  var util = require('util')
  var toRegexRange = require_to_regex_range()
  var isObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val)
  var transform = (toNumber) => {
    return (value) => (toNumber === true ? Number(value) : String(value))
  }
  var isValidValue = (value) => {
    return typeof value === 'number' || (typeof value === 'string' && value !== '')
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
  var stringify = (start, end, options2) => {
    if (typeof start === 'string' || typeof end === 'string') {
      return true
    }
    return options2.stringify === true
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
  var toSequence = (parts, options2) => {
    parts.negatives.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
    parts.positives.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
    let prefix = options2.capture ? '' : '?:'
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
    if (options2.wrap) {
      return `(${prefix}${result})`
    }
    return result
  }
  var toRange = (a, b, isNumbers, options2) => {
    if (isNumbers) {
      return toRegexRange(a, b, { wrap: false, ...options2 })
    }
    let start = String.fromCharCode(a)
    if (a === b) return start
    let stop = String.fromCharCode(b)
    return `[${start}-${stop}]`
  }
  var toRegex = (start, end, options2) => {
    if (Array.isArray(start)) {
      let wrap = options2.wrap === true
      let prefix = options2.capture ? '' : '?:'
      return wrap ? `(${prefix}${start.join('|')})` : start.join('|')
    }
    return toRegexRange(start, end, options2)
  }
  var rangeError = (...args) => {
    return new RangeError('Invalid range arguments: ' + util.inspect(...args))
  }
  var invalidRange = (start, end, options2) => {
    if (options2.strictRanges === true) throw rangeError([start, end])
    return []
  }
  var invalidStep = (step, options2) => {
    if (options2.strictRanges === true) {
      throw new TypeError(`Expected step "${step}" to be a number`)
    }
    return []
  }
  var fillNumbers = (start, end, step = 1, options2 = {}) => {
    let a = Number(start)
    let b = Number(end)
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
      if (options2.strictRanges === true) throw rangeError([start, end])
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
    let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0
    let toNumber = padded === false && stringify(start, end, options2) === false
    let format2 = options2.transform || transform(toNumber)
    if (options2.toRegex && step === 1) {
      return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options2)
    }
    let parts = { negatives: [], positives: [] }
    let push = (num) => parts[num < 0 ? 'negatives' : 'positives'].push(Math.abs(num))
    let range = []
    let index = 0
    while (descending ? a >= b : a <= b) {
      if (options2.toRegex === true && step > 1) {
        push(a)
      } else {
        range.push(pad(format2(a, index), maxLen, toNumber))
      }
      a = descending ? a - step : a + step
      index++
    }
    if (options2.toRegex === true) {
      return step > 1 ? toSequence(parts, options2) : toRegex(range, null, { wrap: false, ...options2 })
    }
    return range
  }
  var fillLetters = (start, end, step = 1, options2 = {}) => {
    if ((!isNumber(start) && start.length > 1) || (!isNumber(end) && end.length > 1)) {
      return invalidRange(start, end, options2)
    }
    let format2 = options2.transform || ((val) => String.fromCharCode(val))
    let a = `${start}`.charCodeAt(0)
    let b = `${end}`.charCodeAt(0)
    let descending = a > b
    let min = Math.min(a, b)
    let max = Math.max(a, b)
    if (options2.toRegex && step === 1) {
      return toRange(min, max, false, options2)
    }
    let range = []
    let index = 0
    while (descending ? a >= b : a <= b) {
      range.push(format2(a, index))
      a = descending ? a - step : a + step
      index++
    }
    if (options2.toRegex === true) {
      return toRegex(range, null, { wrap: false, options: options2 })
    }
    return range
  }
  var fill = (start, end, step, options2 = {}) => {
    if (end == null && isValidValue(start)) {
      return [start]
    }
    if (!isValidValue(start) || !isValidValue(end)) {
      return invalidRange(start, end, options2)
    }
    if (typeof step === 'function') {
      return fill(start, end, 1, { transform: step })
    }
    if (isObject(step)) {
      return fill(start, end, 0, step)
    }
    let opts = { ...options2 }
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
})

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/compile.js
var require_compile = __commonJS((exports2, module2) => {
  'use strict'
  var fill = require_fill_range()
  var utils = require_utils()
  var compile = (ast, options2 = {}) => {
    let walk = (node, parent = {}) => {
      let invalidBlock = utils.isInvalidBrace(parent)
      let invalidNode = node.invalid === true && options2.escapeInvalid === true
      let invalid = invalidBlock === true || invalidNode === true
      let prefix = options2.escapeInvalid === true ? '\\' : ''
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
        let range = fill(...args, { ...options2, wrap: false, toRegex: true })
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
})

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/expand.js
var require_expand = __commonJS((exports2, module2) => {
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
          result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele)
        }
      }
    }
    return utils.flatten(result)
  }
  var expand = (ast, options2 = {}) => {
    let rangeLimit = options2.rangeLimit === void 0 ? 1e3 : options2.rangeLimit
    let walk = (node, parent = {}) => {
      node.queue = []
      let p = parent
      let q = parent.queue
      while (p.type !== 'brace' && p.type !== 'root' && p.parent) {
        p = p.parent
        q = p.queue
      }
      if (node.invalid || node.dollar) {
        q.push(append(q.pop(), stringify(node, options2)))
        return
      }
      if (node.type === 'brace' && node.invalid !== true && node.nodes.length === 2) {
        q.push(append(q.pop(), ['{}']))
        return
      }
      if (node.nodes && node.ranges > 0) {
        let args = utils.reduce(node.nodes)
        if (utils.exceedsLimit(...args, options2.step, rangeLimit)) {
          throw new RangeError(
            'expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.',
          )
        }
        let range = fill(...args, options2)
        if (range.length === 0) {
          range = stringify(node, options2)
        }
        q.push(append(q.pop(), range))
        node.nodes = []
        return
      }
      let enclose = utils.encloseBrace(node)
      let queue = node.queue
      let block = node
      while (block.type !== 'brace' && block.type !== 'root' && block.parent) {
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
})

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/constants.js
var require_constants2 = __commonJS((exports2, module2) => {
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
})

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/lib/parse.js
var require_parse3 = __commonJS((exports2, module2) => {
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
  } = require_constants2()
  var parse = (input, options2 = {}) => {
    if (typeof input !== 'string') {
      throw new TypeError('Expected a string')
    }
    let opts = options2 || {}
    let max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH
    if (input.length > max) {
      throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`)
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
      if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
        continue
      }
      if (value === CHAR_BACKSLASH) {
        push({ type: 'text', value: (options2.keepEscaping ? value : '') + advance() })
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
      if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
        let open = value
        let next
        if (options2.keepQuotes !== true) {
          value = ''
        }
        while (index < length && (next = advance())) {
          if (next === CHAR_BACKSLASH) {
            value += next + advance()
            continue
          }
          if (next === open) {
            if (options2.keepQuotes === true) value += next
            break
          }
          value += next
        }
        push({ type: 'text', value })
        continue
      }
      if (value === CHAR_LEFT_CURLY_BRACE) {
        depth++
        let dollar = (prev.value && prev.value.slice(-1) === '$') || block.dollar === true
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
})

// ../../node_modules/.pnpm/braces@3.0.2/node_modules/braces/index.js
var require_braces = __commonJS((exports2, module2) => {
  'use strict'
  var stringify = require_stringify()
  var compile = require_compile()
  var expand = require_expand()
  var parse = require_parse3()
  var braces = (input, options2 = {}) => {
    let output = []
    if (Array.isArray(input)) {
      for (let pattern of input) {
        let result = braces.create(pattern, options2)
        if (Array.isArray(result)) {
          output.push(...result)
        } else {
          output.push(result)
        }
      }
    } else {
      output = [].concat(braces.create(input, options2))
    }
    if (options2 && options2.expand === true && options2.nodupes === true) {
      output = [...new Set(output)]
    }
    return output
  }
  braces.parse = (input, options2 = {}) => parse(input, options2)
  braces.stringify = (input, options2 = {}) => {
    if (typeof input === 'string') {
      return stringify(braces.parse(input, options2), options2)
    }
    return stringify(input, options2)
  }
  braces.compile = (input, options2 = {}) => {
    if (typeof input === 'string') {
      input = braces.parse(input, options2)
    }
    return compile(input, options2)
  }
  braces.expand = (input, options2 = {}) => {
    if (typeof input === 'string') {
      input = braces.parse(input, options2)
    }
    let result = expand(input, options2)
    if (options2.noempty === true) {
      result = result.filter(Boolean)
    }
    if (options2.nodupes === true) {
      result = [...new Set(result)]
    }
    return result
  }
  braces.create = (input, options2 = {}) => {
    if (input === '' || input.length < 3) {
      return [input]
    }
    return options2.expand !== true ? braces.compile(input, options2) : braces.expand(input, options2)
  }
  module2.exports = braces
})

// ../../node_modules/.pnpm/picomatch@2.2.2/node_modules/picomatch/lib/constants.js
var require_constants3 = __commonJS((exports2, module2) => {
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
})

// ../../node_modules/.pnpm/picomatch@2.2.2/node_modules/picomatch/lib/utils.js
var require_utils2 = __commonJS((exports2) => {
  'use strict'
  var path3 = require('path')
  var win32 = process.platform === 'win32'
  var {
    REGEX_BACKSLASH,
    REGEX_REMOVE_BACKSLASH,
    REGEX_SPECIAL_CHARS,
    REGEX_SPECIAL_CHARS_GLOBAL,
  } = require_constants3()
  exports2.isObject = (val) => val !== null && typeof val === 'object' && !Array.isArray(val)
  exports2.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str)
  exports2.isRegexChar = (str) => str.length === 1 && exports2.hasRegexChars(str)
  exports2.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1')
  exports2.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, '/')
  exports2.removeBackslashes = (str) => {
    return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
      return match === '\\' ? '' : match
    })
  }
  exports2.supportsLookbehinds = () => {
    const segs = process.version.slice(1).split('.').map(Number)
    if ((segs.length === 3 && segs[0] >= 9) || (segs[0] === 8 && segs[1] >= 10)) {
      return true
    }
    return false
  }
  exports2.isWindows = (options2) => {
    if (options2 && typeof options2.windows === 'boolean') {
      return options2.windows
    }
    return win32 === true || path3.sep === '\\'
  }
  exports2.escapeLast = (input, char, lastIdx) => {
    const idx = input.lastIndexOf(char, lastIdx)
    if (idx === -1) return input
    if (input[idx - 1] === '\\') return exports2.escapeLast(input, char, idx - 1)
    return `${input.slice(0, idx)}\\${input.slice(idx)}`
  }
  exports2.removePrefix = (input, state = {}) => {
    let output = input
    if (output.startsWith('./')) {
      output = output.slice(2)
      state.prefix = './'
    }
    return output
  }
  exports2.wrapOutput = (input, state = {}, options2 = {}) => {
    const prepend = options2.contains ? '' : '^'
    const append = options2.contains ? '' : '$'
    let output = `${prepend}(?:${input})${append}`
    if (state.negated === true) {
      output = `(?:^(?!${output}).*$)`
    }
    return output
  }
})

// ../../node_modules/.pnpm/picomatch@2.2.2/node_modules/picomatch/lib/scan.js
var require_scan = __commonJS((exports2, module2) => {
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
  } = require_constants3()
  var isPathSeparator = (code) => {
    return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH
  }
  var depth = (token) => {
    if (token.isPrefix !== true) {
      token.depth = token.isGlobstar ? Infinity : 1
    }
  }
  var scan = (input, options2) => {
    const opts = options2 || {}
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
          if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
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
            if (scanToEnd === true) {
              continue
            }
            break
          }
        }
      }
      if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
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
})

// ../../node_modules/.pnpm/picomatch@2.2.2/node_modules/picomatch/lib/parse.js
var require_parse4 = __commonJS((exports2, module2) => {
  'use strict'
  var constants = require_constants3()
  var utils = require_utils2()
  var { MAX_LENGTH, POSIX_REGEX_SOURCE, REGEX_NON_SPECIAL_CHARS, REGEX_SPECIAL_CHARS_BACKREF, REPLACEMENTS } = constants
  var expandRange = (args, options2) => {
    if (typeof options2.expandRange === 'function') {
      return options2.expandRange(...args, options2)
    }
    args.sort()
    const value = `[${args.join('-')}]`
    try {
      new RegExp(value)
    } catch (ex2) {
      return args.map((v) => utils.escapeRegex(v)).join('..')
    }
    return value
  }
  var syntaxError = (type, char) => {
    return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`
  }
  var parse = (input, options2) => {
    if (typeof input !== 'string') {
      throw new TypeError('Expected a string')
    }
    input = REPLACEMENTS[input] || input
    const opts = { ...options2 }
    const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH
    let len = input.length
    if (len > max) {
      throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`)
    }
    const bos = { type: 'bos', value: '', output: opts.prepend || '' }
    const tokens = [bos]
    const capture = opts.capture ? '' : '?:'
    const win32 = utils.isWindows(options2)
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
      return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`
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
    const advance = (state.advance = () => input[++state.index])
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
        const isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace')
        const isExtglob = tok.extglob === true || (extglobs.length && (tok.type === 'pipe' || tok.type === 'paren'))
        if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
          state.output = state.output.slice(0, -prev.output.length)
          prev.type = 'star'
          prev.value = '*'
          prev.output = star
          state.output += prev.output
        }
      }
      if (extglobs.length && tok.type !== 'paren' && !EXTGLOB_CHARS[tok.value]) {
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
      if (token.type === 'negate') {
        let extglobStar = star
        if (token.inner && token.inner.length > 1 && token.inner.includes('/')) {
          extglobStar = globstar(opts)
        }
        if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
          output = token.close = `)$))${extglobStar}`
        }
        if (token.prev.type === 'bos' && eos()) {
          state.negatedExtglob = true
        }
      }
      push({ type: 'paren', extglob: true, value, output })
      decrement('parens')
    }
    if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
      let backslashes = false
      let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
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
      })
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
      state.output = utils.wrapOutput(output, state, options2)
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
          value = advance() || ''
        } else {
          value += advance() || ''
        }
        if (state.brackets === 0) {
          push({ type: 'text', value })
          continue
        }
      }
      if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
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
        if ((value === '[' && peek() !== ':') || (value === '-' && peek() === ']')) {
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
        if (opts.nobracket === true || (prev && prev.type === 'bracket' && prev.value.length === 1)) {
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
        if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
          value = `/${value}`
        }
        prev.value += value
        append({ value })
        if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
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
        if (state.braces + state.parens === 0 && prev.type !== 'bos' && prev.type !== 'slash') {
          push({ type: 'text', value, output: DOT_LITERAL })
          continue
        }
        push({ type: 'dot', value, output: DOT_LITERAL })
        continue
      }
      if (value === '?') {
        const isGroup = prev && prev.value === '('
        if (!isGroup && opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
          extglobOpen('qmark', value)
          continue
        }
        if (prev && prev.type === 'paren') {
          const next = peek()
          let output = value
          if (next === '<' && !utils.supportsLookbehinds()) {
            throw new Error('Node.js v10 or higher is required for regex lookbehinds')
          }
          if ((prev.value === '(' && !/[!=<:]/.test(next)) || (next === '<' && !/<([!=]|\w+>)/.test(remaining()))) {
            output = `\\${value}`
          }
          push({ type: 'text', value, output })
          continue
        }
        if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
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
        if ((prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) || state.parens > 0) {
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
        const afterStar = before && (before.type === 'star' || before.type === 'globstar')
        if (opts.bash === true && (!isStart || (rest[0] && rest[0] !== '/'))) {
          push({ type: 'star', value, output: '' })
          continue
        }
        const isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace')
        const isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren')
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
        if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
          state.output = state.output.slice(0, -(prior.output + prev.output).length)
          prior.output = `(?:${prior.output}`
          prev.type = 'globstar'
          prev.output = globstar(opts) + (opts.strictSlashes ? ')' : '|$)')
          prev.value += value
          state.globstar = true
          state.output += prior.output + prev.output
          consume(value)
          continue
        }
        if (prior.type === 'slash' && prior.prev.type !== 'bos' && rest[0] === '/') {
          const end = rest[1] !== void 0 ? '|$' : ''
          state.output = state.output.slice(0, -(prior.output + prev.output).length)
          prior.output = `(?:${prior.output}`
          prev.type = 'globstar'
          prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`
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
          prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`
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
      if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
        token.output = value
        push(token)
        continue
      }
      if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
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
      if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ']'))
      state.output = utils.escapeLast(state.output, '[')
      decrement('brackets')
    }
    while (state.parens > 0) {
      if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', ')'))
      state.output = utils.escapeLast(state.output, '(')
      decrement('parens')
    }
    while (state.braces > 0) {
      if (opts.strictBrackets === true) throw new SyntaxError(syntaxError('closing', '}'))
      state.output = utils.escapeLast(state.output, '{')
      decrement('braces')
    }
    if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
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
  parse.fastpaths = (input, options2) => {
    const opts = { ...options2 }
    const max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH
    const len = input.length
    if (len > max) {
      throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`)
    }
    input = REPLACEMENTS[input] || input
    const win32 = utils.isWindows(options2)
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
      return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`
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
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`
        case '**/*.*':
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`
        case '**/.*':
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`
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
})

// ../../node_modules/.pnpm/picomatch@2.2.2/node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS((exports2, module2) => {
  'use strict'
  var path3 = require('path')
  var scan = require_scan()
  var parse = require_parse4()
  var utils = require_utils2()
  var constants = require_constants3()
  var isObject = (val) => val && typeof val === 'object' && !Array.isArray(val)
  var picomatch = (glob2, options2, returnState = false) => {
    if (Array.isArray(glob2)) {
      const fns = glob2.map((input) => picomatch(input, options2, returnState))
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
    const opts = options2 || {}
    const posix = utils.isWindows(options2)
    const regex = isState ? picomatch.compileRe(glob2, options2) : picomatch.makeRe(glob2, options2, false, true)
    const state = regex.state
    delete regex.state
    let isIgnored = () => false
    if (opts.ignore) {
      const ignoreOpts = { ...options2, ignore: null, onMatch: null, onResult: null }
      isIgnored = picomatch(opts.ignore, ignoreOpts, returnState)
    }
    const matcher = (input, returnObject = false) => {
      const { isMatch, match, output } = picomatch.test(input, regex, options2, { glob: glob2, posix })
      const result = { glob: glob2, state, regex, posix, input, output, match, isMatch }
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
  picomatch.test = (input, regex, options2, { glob: glob2, posix } = {}) => {
    if (typeof input !== 'string') {
      throw new TypeError('Expected input to be a string')
    }
    if (input === '') {
      return { isMatch: false, output: '' }
    }
    const opts = options2 || {}
    const format2 = opts.format || (posix ? utils.toPosixSlashes : null)
    let match = input === glob2
    let output = match && format2 ? format2(input) : input
    if (match === false) {
      output = format2 ? format2(input) : input
      match = output === glob2
    }
    if (match === false || opts.capture === true) {
      if (opts.matchBase === true || opts.basename === true) {
        match = picomatch.matchBase(input, regex, options2, posix)
      } else {
        match = regex.exec(output)
      }
    }
    return { isMatch: Boolean(match), match, output }
  }
  picomatch.matchBase = (input, glob2, options2, posix = utils.isWindows(options2)) => {
    const regex = glob2 instanceof RegExp ? glob2 : picomatch.makeRe(glob2, options2)
    return regex.test(path3.basename(input))
  }
  picomatch.isMatch = (str, patterns, options2) => picomatch(patterns, options2)(str)
  picomatch.parse = (pattern, options2) => {
    if (Array.isArray(pattern)) return pattern.map((p) => picomatch.parse(p, options2))
    return parse(pattern, { ...options2, fastpaths: false })
  }
  picomatch.scan = (input, options2) => scan(input, options2)
  picomatch.compileRe = (parsed, options2, returnOutput = false, returnState = false) => {
    if (returnOutput === true) {
      return parsed.output
    }
    const opts = options2 || {}
    const prepend = opts.contains ? '' : '^'
    const append = opts.contains ? '' : '$'
    let source = `${prepend}(?:${parsed.output})${append}`
    if (parsed && parsed.negated === true) {
      source = `^(?!${source}).*$`
    }
    const regex = picomatch.toRegex(source, options2)
    if (returnState === true) {
      regex.state = parsed
    }
    return regex
  }
  picomatch.makeRe = (input, options2, returnOutput = false, returnState = false) => {
    if (!input || typeof input !== 'string') {
      throw new TypeError('Expected a non-empty string')
    }
    const opts = options2 || {}
    let parsed = { negated: false, fastpaths: true }
    let prefix = ''
    let output
    if (input.startsWith('./')) {
      input = input.slice(2)
      prefix = parsed.prefix = './'
    }
    if (opts.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
      output = parse.fastpaths(input, options2)
    }
    if (output === void 0) {
      parsed = parse(input, options2)
      parsed.prefix = prefix + (parsed.prefix || '')
    } else {
      parsed.output = output
    }
    return picomatch.compileRe(parsed, options2, returnOutput, returnState)
  }
  picomatch.toRegex = (source, options2) => {
    try {
      const opts = options2 || {}
      return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''))
    } catch (err) {
      if (options2 && options2.debug === true) throw err
      return /$^/
    }
  }
  picomatch.constants = constants
  module2.exports = picomatch
})

// ../../node_modules/.pnpm/picomatch@2.2.2/node_modules/picomatch/index.js
var require_picomatch2 = __commonJS((exports2, module2) => {
  'use strict'
  module2.exports = require_picomatch()
})

// ../../node_modules/.pnpm/micromatch@4.0.2/node_modules/micromatch/index.js
var require_micromatch = __commonJS((exports2, module2) => {
  'use strict'
  var util = require('util')
  var braces = require_braces()
  var picomatch = require_picomatch2()
  var utils = require_utils2()
  var isEmptyString = (val) => typeof val === 'string' && (val === '' || val === './')
  var micromatch = (list, patterns, options2) => {
    patterns = [].concat(patterns)
    list = [].concat(list)
    let omit = new Set()
    let keep = new Set()
    let items = new Set()
    let negatives = 0
    let onResult = (state) => {
      items.add(state.output)
      if (options2 && options2.onResult) {
        options2.onResult(state)
      }
    }
    for (let i = 0; i < patterns.length; i++) {
      let isMatch = picomatch(String(patterns[i]), { ...options2, onResult }, true)
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
    if (options2 && matches.length === 0) {
      if (options2.failglob === true) {
        throw new Error(`No matches found for "${patterns.join(', ')}"`)
      }
      if (options2.nonull === true || options2.nullglob === true) {
        return options2.unescape ? patterns.map((p) => p.replace(/\\/g, '')) : patterns
      }
    }
    return matches
  }
  micromatch.match = micromatch
  micromatch.matcher = (pattern, options2) => picomatch(pattern, options2)
  micromatch.isMatch = (str, patterns, options2) => picomatch(patterns, options2)(str)
  micromatch.any = micromatch.isMatch
  micromatch.not = (list, patterns, options2 = {}) => {
    patterns = [].concat(patterns).map(String)
    let result = new Set()
    let items = []
    let onResult = (state) => {
      if (options2.onResult) options2.onResult(state)
      items.push(state.output)
    }
    let matches = micromatch(list, patterns, { ...options2, onResult })
    for (let item of items) {
      if (!matches.includes(item)) {
        result.add(item)
      }
    }
    return [...result]
  }
  micromatch.contains = (str, pattern, options2) => {
    if (typeof str !== 'string') {
      throw new TypeError(`Expected a string: "${util.inspect(str)}"`)
    }
    if (Array.isArray(pattern)) {
      return pattern.some((p) => micromatch.contains(str, p, options2))
    }
    if (typeof pattern === 'string') {
      if (isEmptyString(str) || isEmptyString(pattern)) {
        return false
      }
      if (str.includes(pattern) || (str.startsWith('./') && str.slice(2).includes(pattern))) {
        return true
      }
    }
    return micromatch.isMatch(str, pattern, { ...options2, contains: true })
  }
  micromatch.matchKeys = (obj, patterns, options2) => {
    if (!utils.isObject(obj)) {
      throw new TypeError('Expected the first argument to be an object')
    }
    let keys = micromatch(Object.keys(obj), patterns, options2)
    let res = {}
    for (let key of keys) res[key] = obj[key]
    return res
  }
  micromatch.some = (list, patterns, options2) => {
    let items = [].concat(list)
    for (let pattern of [].concat(patterns)) {
      let isMatch = picomatch(String(pattern), options2)
      if (items.some((item) => isMatch(item))) {
        return true
      }
    }
    return false
  }
  micromatch.every = (list, patterns, options2) => {
    let items = [].concat(list)
    for (let pattern of [].concat(patterns)) {
      let isMatch = picomatch(String(pattern), options2)
      if (!items.every((item) => isMatch(item))) {
        return false
      }
    }
    return true
  }
  micromatch.all = (str, patterns, options2) => {
    if (typeof str !== 'string') {
      throw new TypeError(`Expected a string: "${util.inspect(str)}"`)
    }
    return [].concat(patterns).every((p) => picomatch(p, options2)(str))
  }
  micromatch.capture = (glob2, input, options2) => {
    let posix = utils.isWindows(options2)
    let regex = picomatch.makeRe(String(glob2), { ...options2, capture: true })
    let match = regex.exec(posix ? utils.toPosixSlashes(input) : input)
    if (match) {
      return match.slice(1).map((v) => (v === void 0 ? '' : v))
    }
  }
  micromatch.makeRe = (...args) => picomatch.makeRe(...args)
  micromatch.scan = (...args) => picomatch.scan(...args)
  micromatch.parse = (patterns, options2) => {
    let res = []
    for (let pattern of [].concat(patterns || [])) {
      for (let str of braces(String(pattern), options2)) {
        res.push(picomatch.parse(str, options2))
      }
    }
    return res
  }
  micromatch.braces = (pattern, options2) => {
    if (typeof pattern !== 'string') throw new TypeError('Expected a string')
    if ((options2 && options2.nobrace === true) || !/\{.*\}/.test(pattern)) {
      return [pattern]
    }
    return braces(pattern, options2)
  }
  micromatch.braceExpand = (pattern, options2) => {
    if (typeof pattern !== 'string') throw new TypeError('Expected a string')
    return micromatch.braces(pattern, { ...options2, expand: true })
  }
  module2.exports = micromatch
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/utils/pattern.js
var require_pattern = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.matchAny = exports2.convertPatternsToRe = exports2.makeRe = exports2.getPatternParts = exports2.expandBraceExpansion = exports2.expandPatternsWithBraceExpansion = exports2.isAffectDepthOfReadingPattern = exports2.endsWithSlashGlobStar = exports2.hasGlobStar = exports2.getBaseDirectory = exports2.getPositivePatterns = exports2.getNegativePatterns = exports2.isPositivePattern = exports2.isNegativePattern = exports2.convertToNegativePattern = exports2.convertToPositivePattern = exports2.isDynamicPattern = exports2.isStaticPattern = void 0
  var path3 = require('path')
  var globParent = require_glob_parent()
  var micromatch = require_micromatch()
  var picomatch = require_picomatch2()
  var GLOBSTAR = '**'
  var ESCAPE_SYMBOL = '\\'
  var COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/
  var REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[.*]/
  var REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\(.*\|.*\)/
  var GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\(.*\)/
  var BRACE_EXPANSIONS_SYMBOLS_RE = /{.*(?:,|\.\.).*}/
  function isStaticPattern(pattern, options2 = {}) {
    return !isDynamicPattern(pattern, options2)
  }
  exports2.isStaticPattern = isStaticPattern
  function isDynamicPattern(pattern, options2 = {}) {
    if (pattern === '') {
      return false
    }
    if (options2.caseSensitiveMatch === false || pattern.includes(ESCAPE_SYMBOL)) {
      return true
    }
    if (
      COMMON_GLOB_SYMBOLS_RE.test(pattern) ||
      REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) ||
      REGEX_GROUP_SYMBOLS_RE.test(pattern)
    ) {
      return true
    }
    if (options2.extglob !== false && GLOB_EXTENSION_SYMBOLS_RE.test(pattern)) {
      return true
    }
    if (options2.braceExpansion !== false && BRACE_EXPANSIONS_SYMBOLS_RE.test(pattern)) {
      return true
    }
    return false
  }
  exports2.isDynamicPattern = isDynamicPattern
  function convertToPositivePattern(pattern) {
    return isNegativePattern(pattern) ? pattern.slice(1) : pattern
  }
  exports2.convertToPositivePattern = convertToPositivePattern
  function convertToNegativePattern(pattern) {
    return '!' + pattern
  }
  exports2.convertToNegativePattern = convertToNegativePattern
  function isNegativePattern(pattern) {
    return pattern.startsWith('!') && pattern[1] !== '('
  }
  exports2.isNegativePattern = isNegativePattern
  function isPositivePattern(pattern) {
    return !isNegativePattern(pattern)
  }
  exports2.isPositivePattern = isPositivePattern
  function getNegativePatterns(patterns) {
    return patterns.filter(isNegativePattern)
  }
  exports2.getNegativePatterns = getNegativePatterns
  function getPositivePatterns(patterns) {
    return patterns.filter(isPositivePattern)
  }
  exports2.getPositivePatterns = getPositivePatterns
  function getBaseDirectory(pattern) {
    return globParent(pattern, { flipBackslashes: false })
  }
  exports2.getBaseDirectory = getBaseDirectory
  function hasGlobStar(pattern) {
    return pattern.includes(GLOBSTAR)
  }
  exports2.hasGlobStar = hasGlobStar
  function endsWithSlashGlobStar(pattern) {
    return pattern.endsWith('/' + GLOBSTAR)
  }
  exports2.endsWithSlashGlobStar = endsWithSlashGlobStar
  function isAffectDepthOfReadingPattern(pattern) {
    const basename = path3.basename(pattern)
    return endsWithSlashGlobStar(pattern) || isStaticPattern(basename)
  }
  exports2.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern
  function expandPatternsWithBraceExpansion(patterns) {
    return patterns.reduce((collection, pattern) => {
      return collection.concat(expandBraceExpansion(pattern))
    }, [])
  }
  exports2.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion
  function expandBraceExpansion(pattern) {
    return micromatch.braces(pattern, {
      expand: true,
      nodupes: true,
    })
  }
  exports2.expandBraceExpansion = expandBraceExpansion
  function getPatternParts(pattern, options2) {
    let { parts } = picomatch.scan(pattern, Object.assign(Object.assign({}, options2), { parts: true }))
    if (parts.length === 0) {
      parts = [pattern]
    }
    if (parts[0].startsWith('/')) {
      parts[0] = parts[0].slice(1)
      parts.unshift('')
    }
    return parts
  }
  exports2.getPatternParts = getPatternParts
  function makeRe(pattern, options2) {
    return micromatch.makeRe(pattern, options2)
  }
  exports2.makeRe = makeRe
  function convertPatternsToRe(patterns, options2) {
    return patterns.map((pattern) => makeRe(pattern, options2))
  }
  exports2.convertPatternsToRe = convertPatternsToRe
  function matchAny(entry, patternsRe) {
    return patternsRe.some((patternRe) => patternRe.test(entry))
  }
  exports2.matchAny = matchAny
})

// ../../node_modules/.pnpm/merge2@1.4.1/node_modules/merge2/index.js
var require_merge2 = __commonJS((exports2, module2) => {
  'use strict'
  var Stream = require('stream')
  var PassThrough = Stream.PassThrough
  var slice = Array.prototype.slice
  module2.exports = merge2
  function merge2() {
    const streamsQueue = []
    const args = slice.call(arguments)
    let merging = false
    let options2 = args[args.length - 1]
    if (options2 && !Array.isArray(options2) && options2.pipe == null) {
      args.pop()
    } else {
      options2 = {}
    }
    const doEnd = options2.end !== false
    const doPipeError = options2.pipeError === true
    if (options2.objectMode == null) {
      options2.objectMode = true
    }
    if (options2.highWaterMark == null) {
      options2.highWaterMark = 64 * 1024
    }
    const mergedStream = PassThrough(options2)
    function addStream() {
      for (let i = 0, len = arguments.length; i < len; i++) {
        streamsQueue.push(pauseStreams(arguments[i], options2))
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
  function pauseStreams(streams, options2) {
    if (!Array.isArray(streams)) {
      if (!streams._readableState && streams.pipe) {
        streams = streams.pipe(PassThrough(options2))
      }
      if (!streams._readableState || !streams.pause || !streams.pipe) {
        throw new Error('Only readable stream can be merged.')
      }
      streams.pause()
    } else {
      for (let i = 0, len = streams.length; i < len; i++) {
        streams[i] = pauseStreams(streams[i], options2)
      }
    }
    return streams
  }
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/utils/stream.js
var require_stream = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.merge = void 0
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
  exports2.merge = merge
  function propagateCloseEventToSources(streams) {
    streams.forEach((stream) => stream.emit('close'))
  }
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/utils/string.js
var require_string = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.isEmpty = exports2.isString = void 0
  function isString(input) {
    return typeof input === 'string'
  }
  exports2.isString = isString
  function isEmpty(input) {
    return input === ''
  }
  exports2.isEmpty = isEmpty
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/utils/index.js
var require_utils3 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.string = exports2.stream = exports2.pattern = exports2.path = exports2.fs = exports2.errno = exports2.array = void 0
  var array = require_array()
  exports2.array = array
  var errno = require_errno()
  exports2.errno = errno
  var fs2 = require_fs()
  exports2.fs = fs2
  var path3 = require_path()
  exports2.path = path3
  var pattern = require_pattern()
  exports2.pattern = pattern
  var stream = require_stream()
  exports2.stream = stream
  var string = require_string()
  exports2.string = string
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/managers/tasks.js
var require_tasks = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.convertPatternGroupToTask = exports2.convertPatternGroupsToTasks = exports2.groupPatternsByBaseDirectory = exports2.getNegativePatternsAsPositive = exports2.getPositivePatterns = exports2.convertPatternsToTasks = exports2.generate = void 0
  var utils = require_utils3()
  function generate(patterns, settings) {
    const positivePatterns = getPositivePatterns(patterns)
    const negativePatterns = getNegativePatternsAsPositive(patterns, settings.ignore)
    const staticPatterns = positivePatterns.filter((pattern) => utils.pattern.isStaticPattern(pattern, settings))
    const dynamicPatterns = positivePatterns.filter((pattern) => utils.pattern.isDynamicPattern(pattern, settings))
    const staticTasks = convertPatternsToTasks(staticPatterns, negativePatterns, false)
    const dynamicTasks = convertPatternsToTasks(dynamicPatterns, negativePatterns, true)
    return staticTasks.concat(dynamicTasks)
  }
  exports2.generate = generate
  function convertPatternsToTasks(positive, negative, dynamic) {
    const positivePatternsGroup = groupPatternsByBaseDirectory(positive)
    if ('.' in positivePatternsGroup) {
      const task2 = convertPatternGroupToTask('.', positive, negative, dynamic)
      return [task2]
    }
    return convertPatternGroupsToTasks(positivePatternsGroup, negative, dynamic)
  }
  exports2.convertPatternsToTasks = convertPatternsToTasks
  function getPositivePatterns(patterns) {
    return utils.pattern.getPositivePatterns(patterns)
  }
  exports2.getPositivePatterns = getPositivePatterns
  function getNegativePatternsAsPositive(patterns, ignore) {
    const negative = utils.pattern.getNegativePatterns(patterns).concat(ignore)
    const positive = negative.map(utils.pattern.convertToPositivePattern)
    return positive
  }
  exports2.getNegativePatternsAsPositive = getNegativePatternsAsPositive
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
  exports2.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory
  function convertPatternGroupsToTasks(positive, negative, dynamic) {
    return Object.keys(positive).map((base) => {
      return convertPatternGroupToTask(base, positive[base], negative, dynamic)
    })
  }
  exports2.convertPatternGroupsToTasks = convertPatternGroupsToTasks
  function convertPatternGroupToTask(base, positive, negative, dynamic) {
    return {
      dynamic,
      positive,
      negative,
      base,
      patterns: [].concat(positive, negative.map(utils.pattern.convertToNegativePattern)),
    }
  }
  exports2.convertPatternGroupToTask = convertPatternGroupToTask
})

// ../../node_modules/.pnpm/@nodelib/fs.stat@2.0.4/node_modules/@nodelib/fs.stat/out/providers/async.js
var require_async = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.read = void 0
  function read(path3, settings, callback) {
    settings.fs.lstat(path3, (lstatError, lstat) => {
      if (lstatError !== null) {
        return callFailureCallback(callback, lstatError)
      }
      if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
        return callSuccessCallback(callback, lstat)
      }
      settings.fs.stat(path3, (statError, stat) => {
        if (statError !== null) {
          if (settings.throwErrorOnBrokenSymbolicLink) {
            return callFailureCallback(callback, statError)
          }
          return callSuccessCallback(callback, lstat)
        }
        if (settings.markSymbolicLink) {
          stat.isSymbolicLink = () => true
        }
        callSuccessCallback(callback, stat)
      })
    })
  }
  exports2.read = read
  function callFailureCallback(callback, error) {
    callback(error)
  }
  function callSuccessCallback(callback, result) {
    callback(null, result)
  }
})

// ../../node_modules/.pnpm/@nodelib/fs.stat@2.0.4/node_modules/@nodelib/fs.stat/out/providers/sync.js
var require_sync = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.read = void 0
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
  exports2.read = read
})

// ../../node_modules/.pnpm/@nodelib/fs.stat@2.0.4/node_modules/@nodelib/fs.stat/out/adapters/fs.js
var require_fs2 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.createFileSystemAdapter = exports2.FILE_SYSTEM_ADAPTER = void 0
  var fs2 = require('fs')
  exports2.FILE_SYSTEM_ADAPTER = {
    lstat: fs2.lstat,
    stat: fs2.stat,
    lstatSync: fs2.lstatSync,
    statSync: fs2.statSync,
  }
  function createFileSystemAdapter(fsMethods) {
    if (fsMethods === void 0) {
      return exports2.FILE_SYSTEM_ADAPTER
    }
    return Object.assign(Object.assign({}, exports2.FILE_SYSTEM_ADAPTER), fsMethods)
  }
  exports2.createFileSystemAdapter = createFileSystemAdapter
})

// ../../node_modules/.pnpm/@nodelib/fs.stat@2.0.4/node_modules/@nodelib/fs.stat/out/settings.js
var require_settings = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  var fs2 = require_fs2()
  var Settings = class {
    constructor(_options = {}) {
      this._options = _options
      this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, true)
      this.fs = fs2.createFileSystemAdapter(this._options.fs)
      this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, false)
      this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true)
    }
    _getValue(option, value) {
      return option !== null && option !== void 0 ? option : value
    }
  }
  exports2.default = Settings
})

// ../../node_modules/.pnpm/@nodelib/fs.stat@2.0.4/node_modules/@nodelib/fs.stat/out/index.js
var require_out = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.statSync = exports2.stat = exports2.Settings = void 0
  var async = require_async()
  var sync = require_sync()
  var settings_1 = require_settings()
  exports2.Settings = settings_1.default
  function stat(path3, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === 'function') {
      return async.read(path3, getSettings(), optionsOrSettingsOrCallback)
    }
    async.read(path3, getSettings(optionsOrSettingsOrCallback), callback)
  }
  exports2.stat = stat
  function statSync(path3, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings)
    return sync.read(path3, settings)
  }
  exports2.statSync = statSync
  function getSettings(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1.default) {
      return settingsOrOptions
    }
    return new settings_1.default(settingsOrOptions)
  }
})

// ../../node_modules/.pnpm/queue-microtask@1.2.3/node_modules/queue-microtask/index.js
var require_queue_microtask = __commonJS((exports2, module2) => {
  /*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
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
})

// ../../node_modules/.pnpm/run-parallel@1.2.0/node_modules/run-parallel/index.js
var require_run_parallel = __commonJS((exports2, module2) => {
  /*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
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
})

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/constants.js
var require_constants4 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0
  var NODE_PROCESS_VERSION_PARTS = process.versions.node.split('.')
  var MAJOR_VERSION = parseInt(NODE_PROCESS_VERSION_PARTS[0], 10)
  var MINOR_VERSION = parseInt(NODE_PROCESS_VERSION_PARTS[1], 10)
  var SUPPORTED_MAJOR_VERSION = 10
  var SUPPORTED_MINOR_VERSION = 10
  var IS_MATCHED_BY_MAJOR = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION
  var IS_MATCHED_BY_MAJOR_AND_MINOR =
    MAJOR_VERSION === SUPPORTED_MAJOR_VERSION && MINOR_VERSION >= SUPPORTED_MINOR_VERSION
  exports2.IS_SUPPORT_READDIR_WITH_FILE_TYPES = IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR
})

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/utils/fs.js
var require_fs3 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.createDirentFromStats = void 0
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
  exports2.createDirentFromStats = createDirentFromStats
})

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/utils/index.js
var require_utils4 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.fs = void 0
  var fs2 = require_fs3()
  exports2.fs = fs2
})

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/providers/common.js
var require_common = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.joinPathSegments = void 0
  function joinPathSegments(a, b, separator) {
    if (a.endsWith(separator)) {
      return a + b
    }
    return a + separator + b
  }
  exports2.joinPathSegments = joinPathSegments
})

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/providers/async.js
var require_async2 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.readdir = exports2.readdirWithFileTypes = exports2.read = void 0
  var fsStat = require_out()
  var rpl = require_run_parallel()
  var constants_1 = require_constants4()
  var utils = require_utils4()
  var common = require_common()
  function read(directory, settings, callback) {
    if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
      return readdirWithFileTypes(directory, settings, callback)
    }
    return readdir(directory, settings, callback)
  }
  exports2.read = read
  function readdirWithFileTypes(directory, settings, callback) {
    settings.fs.readdir(directory, { withFileTypes: true }, (readdirError, dirents) => {
      if (readdirError !== null) {
        return callFailureCallback(callback, readdirError)
      }
      const entries2 = dirents.map((dirent) => ({
        dirent,
        name: dirent.name,
        path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator),
      }))
      if (!settings.followSymbolicLinks) {
        return callSuccessCallback(callback, entries2)
      }
      const tasks = entries2.map((entry) => makeRplTaskEntry(entry, settings))
      rpl(tasks, (rplError, rplEntries) => {
        if (rplError !== null) {
          return callFailureCallback(callback, rplError)
        }
        callSuccessCallback(callback, rplEntries)
      })
    })
  }
  exports2.readdirWithFileTypes = readdirWithFileTypes
  function makeRplTaskEntry(entry, settings) {
    return (done) => {
      if (!entry.dirent.isSymbolicLink()) {
        return done(null, entry)
      }
      settings.fs.stat(entry.path, (statError, stats) => {
        if (statError !== null) {
          if (settings.throwErrorOnBrokenSymbolicLink) {
            return done(statError)
          }
          return done(null, entry)
        }
        entry.dirent = utils.fs.createDirentFromStats(entry.name, stats)
        return done(null, entry)
      })
    }
  }
  function readdir(directory, settings, callback) {
    settings.fs.readdir(directory, (readdirError, names) => {
      if (readdirError !== null) {
        return callFailureCallback(callback, readdirError)
      }
      const filepaths = names.map((name) => common.joinPathSegments(directory, name, settings.pathSegmentSeparator))
      const tasks = filepaths.map((filepath) => {
        return (done) => fsStat.stat(filepath, settings.fsStatSettings, done)
      })
      rpl(tasks, (rplError, results) => {
        if (rplError !== null) {
          return callFailureCallback(callback, rplError)
        }
        const entries2 = []
        names.forEach((name, index) => {
          const stats = results[index]
          const entry = {
            name,
            path: filepaths[index],
            dirent: utils.fs.createDirentFromStats(name, stats),
          }
          if (settings.stats) {
            entry.stats = stats
          }
          entries2.push(entry)
        })
        callSuccessCallback(callback, entries2)
      })
    })
  }
  exports2.readdir = readdir
  function callFailureCallback(callback, error) {
    callback(error)
  }
  function callSuccessCallback(callback, result) {
    callback(null, result)
  }
})

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/providers/sync.js
var require_sync2 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.readdir = exports2.readdirWithFileTypes = exports2.read = void 0
  var fsStat = require_out()
  var constants_1 = require_constants4()
  var utils = require_utils4()
  var common = require_common()
  function read(directory, settings) {
    if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
      return readdirWithFileTypes(directory, settings)
    }
    return readdir(directory, settings)
  }
  exports2.read = read
  function readdirWithFileTypes(directory, settings) {
    const dirents = settings.fs.readdirSync(directory, { withFileTypes: true })
    return dirents.map((dirent) => {
      const entry = {
        dirent,
        name: dirent.name,
        path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator),
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
  exports2.readdirWithFileTypes = readdirWithFileTypes
  function readdir(directory, settings) {
    const names = settings.fs.readdirSync(directory)
    return names.map((name) => {
      const entryPath = common.joinPathSegments(directory, name, settings.pathSegmentSeparator)
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
  exports2.readdir = readdir
})

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/adapters/fs.js
var require_fs4 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.createFileSystemAdapter = exports2.FILE_SYSTEM_ADAPTER = void 0
  var fs2 = require('fs')
  exports2.FILE_SYSTEM_ADAPTER = {
    lstat: fs2.lstat,
    stat: fs2.stat,
    lstatSync: fs2.lstatSync,
    statSync: fs2.statSync,
    readdir: fs2.readdir,
    readdirSync: fs2.readdirSync,
  }
  function createFileSystemAdapter(fsMethods) {
    if (fsMethods === void 0) {
      return exports2.FILE_SYSTEM_ADAPTER
    }
    return Object.assign(Object.assign({}, exports2.FILE_SYSTEM_ADAPTER), fsMethods)
  }
  exports2.createFileSystemAdapter = createFileSystemAdapter
})

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/settings.js
var require_settings2 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  var path3 = require('path')
  var fsStat = require_out()
  var fs2 = require_fs4()
  var Settings = class {
    constructor(_options = {}) {
      this._options = _options
      this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, false)
      this.fs = fs2.createFileSystemAdapter(this._options.fs)
      this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path3.sep)
      this.stats = this._getValue(this._options.stats, false)
      this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true)
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
  exports2.default = Settings
})

// ../../node_modules/.pnpm/@nodelib/fs.scandir@2.1.4/node_modules/@nodelib/fs.scandir/out/index.js
var require_out2 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.Settings = exports2.scandirSync = exports2.scandir = void 0
  var async = require_async2()
  var sync = require_sync2()
  var settings_1 = require_settings2()
  exports2.Settings = settings_1.default
  function scandir(path3, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === 'function') {
      return async.read(path3, getSettings(), optionsOrSettingsOrCallback)
    }
    async.read(path3, getSettings(optionsOrSettingsOrCallback), callback)
  }
  exports2.scandir = scandir
  function scandirSync(path3, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings)
    return sync.read(path3, settings)
  }
  exports2.scandirSync = scandirSync
  function getSettings(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1.default) {
      return settingsOrOptions
    }
    return new settings_1.default(settingsOrOptions)
  }
})

// ../../node_modules/.pnpm/reusify@1.0.4/node_modules/reusify/reusify.js
var require_reusify = __commonJS((exports2, module2) => {
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
})

// ../../node_modules/.pnpm/fastq@1.11.0/node_modules/fastq/queue.js
var require_queue = __commonJS((exports2, module2) => {
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
    return queue
    function push(value) {
      return new Promise(function (resolve, reject) {
        pushCb(value, function (err, result) {
          if (err) {
            reject(err)
            return
          }
          resolve(result)
        })
      })
    }
    function unshift(value) {
      return new Promise(function (resolve, reject) {
        unshiftCb(value, function (err, result) {
          if (err) {
            reject(err)
            return
          }
          resolve(result)
        })
      })
    }
  }
  module2.exports = fastqueue
  module2.exports.promise = queueAsPromised
})

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/readers/common.js
var require_common2 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.joinPathSegments = exports2.replacePathSegmentSeparator = exports2.isAppliedFilter = exports2.isFatalError = void 0
  function isFatalError(settings, error) {
    if (settings.errorFilter === null) {
      return true
    }
    return !settings.errorFilter(error)
  }
  exports2.isFatalError = isFatalError
  function isAppliedFilter(filter, value) {
    return filter === null || filter(value)
  }
  exports2.isAppliedFilter = isAppliedFilter
  function replacePathSegmentSeparator(filepath, separator) {
    return filepath.split(/[/\\]/).join(separator)
  }
  exports2.replacePathSegmentSeparator = replacePathSegmentSeparator
  function joinPathSegments(a, b, separator) {
    if (a === '') {
      return b
    }
    if (a.endsWith(separator)) {
      return a + b
    }
    return a + separator + b
  }
  exports2.joinPathSegments = joinPathSegments
})

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/readers/reader.js
var require_reader = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  var common = require_common2()
  var Reader = class {
    constructor(_root, _settings) {
      this._root = _root
      this._settings = _settings
      this._root = common.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator)
    }
  }
  exports2.default = Reader
})

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/readers/async.js
var require_async3 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
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
      this._scandir(item.directory, this._settings.fsScandirSettings, (error, entries2) => {
        if (error !== null) {
          return done(error, void 0)
        }
        for (const entry of entries2) {
          this._handleEntry(entry, item.base)
        }
        done(null, void 0)
      })
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
        entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator)
      }
      if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
        this._emitEntry(entry)
      }
      if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
        this._pushToQueue(fullpath, entry.path)
      }
    }
    _emitEntry(entry) {
      this._emitter.emit('entry', entry)
    }
  }
  exports2.default = AsyncReader
})

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/providers/async.js
var require_async4 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  var async_1 = require_async3()
  var AsyncProvider = class {
    constructor(_root, _settings) {
      this._root = _root
      this._settings = _settings
      this._reader = new async_1.default(this._root, this._settings)
      this._storage = new Set()
    }
    read(callback) {
      this._reader.onError((error) => {
        callFailureCallback(callback, error)
      })
      this._reader.onEntry((entry) => {
        this._storage.add(entry)
      })
      this._reader.onEnd(() => {
        callSuccessCallback(callback, [...this._storage])
      })
      this._reader.read()
    }
  }
  exports2.default = AsyncProvider
  function callFailureCallback(callback, error) {
    callback(error)
  }
  function callSuccessCallback(callback, entries2) {
    callback(null, entries2)
  }
})

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/providers/stream.js
var require_stream2 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
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
  exports2.default = StreamProvider
})

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/readers/sync.js
var require_sync3 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  var fsScandir = require_out2()
  var common = require_common2()
  var reader_1 = require_reader()
  var SyncReader = class extends reader_1.default {
    constructor() {
      super(...arguments)
      this._scandir = fsScandir.scandirSync
      this._storage = new Set()
      this._queue = new Set()
    }
    read() {
      this._pushToQueue(this._root, this._settings.basePath)
      this._handleQueue()
      return [...this._storage]
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
        const entries2 = this._scandir(directory, this._settings.fsScandirSettings)
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
        entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator)
      }
      if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
        this._pushToStorage(entry)
      }
      if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
        this._pushToQueue(fullpath, entry.path)
      }
    }
    _pushToStorage(entry) {
      this._storage.add(entry)
    }
  }
  exports2.default = SyncReader
})

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/providers/sync.js
var require_sync4 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
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
  exports2.default = SyncProvider
})

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/settings.js
var require_settings3 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  var path3 = require('path')
  var fsScandir = require_out2()
  var Settings = class {
    constructor(_options = {}) {
      this._options = _options
      this.basePath = this._getValue(this._options.basePath, void 0)
      this.concurrency = this._getValue(this._options.concurrency, Infinity)
      this.deepFilter = this._getValue(this._options.deepFilter, null)
      this.entryFilter = this._getValue(this._options.entryFilter, null)
      this.errorFilter = this._getValue(this._options.errorFilter, null)
      this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path3.sep)
      this.fsScandirSettings = new fsScandir.Settings({
        followSymbolicLinks: this._options.followSymbolicLinks,
        fs: this._options.fs,
        pathSegmentSeparator: this._options.pathSegmentSeparator,
        stats: this._options.stats,
        throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink,
      })
    }
    _getValue(option, value) {
      return option !== null && option !== void 0 ? option : value
    }
  }
  exports2.default = Settings
})

// ../../node_modules/.pnpm/@nodelib/fs.walk@1.2.6/node_modules/@nodelib/fs.walk/out/index.js
var require_out3 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.Settings = exports2.walkStream = exports2.walkSync = exports2.walk = void 0
  var async_1 = require_async4()
  var stream_1 = require_stream2()
  var sync_1 = require_sync4()
  var settings_1 = require_settings3()
  exports2.Settings = settings_1.default
  function walk(directory, optionsOrSettingsOrCallback, callback) {
    if (typeof optionsOrSettingsOrCallback === 'function') {
      return new async_1.default(directory, getSettings()).read(optionsOrSettingsOrCallback)
    }
    new async_1.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback)
  }
  exports2.walk = walk
  function walkSync(directory, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings)
    const provider = new sync_1.default(directory, settings)
    return provider.read()
  }
  exports2.walkSync = walkSync
  function walkStream(directory, optionsOrSettings) {
    const settings = getSettings(optionsOrSettings)
    const provider = new stream_1.default(directory, settings)
    return provider.read()
  }
  exports2.walkStream = walkStream
  function getSettings(settingsOrOptions = {}) {
    if (settingsOrOptions instanceof settings_1.default) {
      return settingsOrOptions
    }
    return new settings_1.default(settingsOrOptions)
  }
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/readers/reader.js
var require_reader2 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
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
      return !utils.errno.isEnoentCodeError(error) && !this._settings.suppressErrors
    }
  }
  exports2.default = Reader
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/readers/stream.js
var require_stream3 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
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
    dynamic(root, options2) {
      return this._walkStream(root, options2)
    }
    static(patterns, options2) {
      const filepaths = patterns.map(this._getFullEntryPath, this)
      const stream = new stream_1.PassThrough({ objectMode: true })
      stream._write = (index, _enc, done) => {
        return this._getEntry(filepaths[index], patterns[index], options2)
          .then((entry) => {
            if (entry !== null && options2.entryFilter(entry)) {
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
    _getEntry(filepath, pattern, options2) {
      return this._getStat(filepath)
        .then((stats) => this._makeEntry(stats, pattern))
        .catch((error) => {
          if (options2.errorFilter(error)) {
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
  exports2.default = ReaderStream
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/matchers/matcher.js
var require_matcher = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
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
      const patterns = utils.pattern.expandPatternsWithBraceExpansion(this._patterns)
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
      const parts = utils.pattern.getPatternParts(pattern, this._micromatchOptions)
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
      return utils.array.splitWhen(segments, (segment) => segment.dynamic && utils.pattern.hasGlobStar(segment.pattern))
    }
  }
  exports2.default = Matcher
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/matchers/partial.js
var require_partial = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  var matcher_1 = require_matcher()
  var PartialMatcher = class extends matcher_1.default {
    match(filepath) {
      const parts = filepath.split('/')
      const levels = parts.length
      const patterns = this._storage.filter((info) => !info.complete || info.segments.length > levels)
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
  exports2.default = PartialMatcher
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/filters/deep.js
var require_deep = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
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
      return new partial_1.default(patterns, this._settings, this._micromatchOptions)
    }
    _getNegativePatternsRe(patterns) {
      const affectDepthOfReadingPatterns = patterns.filter(utils.pattern.isAffectDepthOfReadingPattern)
      return utils.pattern.convertPatternsToRe(affectDepthOfReadingPatterns, this._micromatchOptions)
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
      return !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink()
    }
    _isSkippedByPositivePatterns(entryPath, matcher) {
      return !this._settings.baseNameMatch && !matcher.match(entryPath)
    }
    _isSkippedByNegativePatterns(entryPath, patternsRe) {
      return !utils.pattern.matchAny(entryPath, patternsRe)
    }
  }
  exports2.default = DeepFilter
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/filters/entry.js
var require_entry = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  var utils = require_utils3()
  var EntryFilter = class {
    constructor(_settings, _micromatchOptions) {
      this._settings = _settings
      this._micromatchOptions = _micromatchOptions
      this.index = new Map()
    }
    getFilter(positive, negative) {
      const positiveRe = utils.pattern.convertPatternsToRe(positive, this._micromatchOptions)
      const negativeRe = utils.pattern.convertPatternsToRe(negative, this._micromatchOptions)
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
        this._isMatchToPatterns(filepath, positiveRe) && !this._isMatchToPatterns(entry.path, negativeRe)
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
  exports2.default = EntryFilter
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/filters/error.js
var require_error = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  var utils = require_utils3()
  var ErrorFilter = class {
    constructor(_settings) {
      this._settings = _settings
    }
    getFilter() {
      return (error) => this._isNonFatalError(error)
    }
    _isNonFatalError(error) {
      return utils.errno.isEnoentCodeError(error) || this._settings.suppressErrors
    }
  }
  exports2.default = ErrorFilter
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/transformers/entry.js
var require_entry2 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
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
  exports2.default = EntryTransformer
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/provider.js
var require_provider = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  var path3 = require('path')
  var deep_1 = require_deep()
  var entry_1 = require_entry()
  var error_1 = require_error()
  var entry_2 = require_entry2()
  var Provider = class {
    constructor(_settings) {
      this._settings = _settings
      this.errorFilter = new error_1.default(this._settings)
      this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions())
      this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions())
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
        deepFilter: this.deepFilter.getFilter(basePath, task2.positive, task2.negative),
        entryFilter: this.entryFilter.getFilter(task2.positive, task2.negative),
        errorFilter: this.errorFilter.getFilter(),
        followSymbolicLinks: this._settings.followSymbolicLinks,
        fs: this._settings.fs,
        stats: this._settings.stats,
        throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
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
  exports2.default = Provider
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/async.js
var require_async5 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  var stream_1 = require_stream3()
  var provider_1 = require_provider()
  var ProviderAsync = class extends provider_1.default {
    constructor() {
      super(...arguments)
      this._reader = new stream_1.default(this._settings)
    }
    read(task2) {
      const root = this._getRootDirectory(task2)
      const options2 = this._getReaderOptions(task2)
      const entries2 = []
      return new Promise((resolve, reject) => {
        const stream = this.api(root, task2, options2)
        stream.once('error', reject)
        stream.on('data', (entry) => entries2.push(options2.transform(entry)))
        stream.once('end', () => resolve(entries2))
      })
    }
    api(root, task2, options2) {
      if (task2.dynamic) {
        return this._reader.dynamic(root, options2)
      }
      return this._reader.static(task2.patterns, options2)
    }
  }
  exports2.default = ProviderAsync
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/stream.js
var require_stream4 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
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
      const options2 = this._getReaderOptions(task2)
      const source = this.api(root, task2, options2)
      const destination = new stream_1.Readable({ objectMode: true, read: () => {} })
      source
        .once('error', (error) => destination.emit('error', error))
        .on('data', (entry) => destination.emit('data', options2.transform(entry)))
        .once('end', () => destination.emit('end'))
      destination.once('close', () => source.destroy())
      return destination
    }
    api(root, task2, options2) {
      if (task2.dynamic) {
        return this._reader.dynamic(root, options2)
      }
      return this._reader.static(task2.patterns, options2)
    }
  }
  exports2.default = ProviderStream
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/readers/sync.js
var require_sync5 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  var fsStat = require_out()
  var fsWalk = require_out3()
  var reader_1 = require_reader2()
  var ReaderSync = class extends reader_1.default {
    constructor() {
      super(...arguments)
      this._walkSync = fsWalk.walkSync
      this._statSync = fsStat.statSync
    }
    dynamic(root, options2) {
      return this._walkSync(root, options2)
    }
    static(patterns, options2) {
      const entries2 = []
      for (const pattern of patterns) {
        const filepath = this._getFullEntryPath(pattern)
        const entry = this._getEntry(filepath, pattern, options2)
        if (entry === null || !options2.entryFilter(entry)) {
          continue
        }
        entries2.push(entry)
      }
      return entries2
    }
    _getEntry(filepath, pattern, options2) {
      try {
        const stats = this._getStat(filepath)
        return this._makeEntry(stats, pattern)
      } catch (error) {
        if (options2.errorFilter(error)) {
          return null
        }
        throw error
      }
    }
    _getStat(filepath) {
      return this._statSync(filepath, this._fsStatSettings)
    }
  }
  exports2.default = ReaderSync
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/providers/sync.js
var require_sync6 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  var sync_1 = require_sync5()
  var provider_1 = require_provider()
  var ProviderSync = class extends provider_1.default {
    constructor() {
      super(...arguments)
      this._reader = new sync_1.default(this._settings)
    }
    read(task2) {
      const root = this._getRootDirectory(task2)
      const options2 = this._getReaderOptions(task2)
      const entries2 = this.api(root, task2, options2)
      return entries2.map(options2.transform)
    }
    api(root, task2, options2) {
      if (task2.dynamic) {
        return this._reader.dynamic(root, options2)
      }
      return this._reader.static(task2.patterns, options2)
    }
  }
  exports2.default = ProviderSync
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/settings.js
var require_settings4 = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.DEFAULT_FILE_SYSTEM_ADAPTER = void 0
  var fs2 = require('fs')
  var os = require('os')
  var CPU_COUNT = Math.max(os.cpus().length, 1)
  exports2.DEFAULT_FILE_SYSTEM_ADAPTER = {
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
      this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, true)
      this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT)
      this.cwd = this._getValue(this._options.cwd, process.cwd())
      this.deep = this._getValue(this._options.deep, Infinity)
      this.dot = this._getValue(this._options.dot, false)
      this.extglob = this._getValue(this._options.extglob, true)
      this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, true)
      this.fs = this._getFileSystemMethods(this._options.fs)
      this.globstar = this._getValue(this._options.globstar, true)
      this.ignore = this._getValue(this._options.ignore, [])
      this.markDirectories = this._getValue(this._options.markDirectories, false)
      this.objectMode = this._getValue(this._options.objectMode, false)
      this.onlyDirectories = this._getValue(this._options.onlyDirectories, false)
      this.onlyFiles = this._getValue(this._options.onlyFiles, true)
      this.stats = this._getValue(this._options.stats, false)
      this.suppressErrors = this._getValue(this._options.suppressErrors, false)
      this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, false)
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
      return Object.assign(Object.assign({}, exports2.DEFAULT_FILE_SYSTEM_ADAPTER), methods)
    }
  }
  exports2.default = Settings
})

// ../../node_modules/.pnpm/fast-glob@3.2.5/node_modules/fast-glob/out/index.js
var require_out4 = __commonJS((exports2, module2) => {
  'use strict'
  var taskManager = require_tasks()
  var async_1 = require_async5()
  var stream_1 = require_stream4()
  var sync_1 = require_sync6()
  var settings_1 = require_settings4()
  var utils = require_utils3()
  async function FastGlob(source, options2) {
    assertPatternsInput(source)
    const works = getWorks(source, async_1.default, options2)
    const result = await Promise.all(works)
    return utils.array.flatten(result)
  }
  ;(function (FastGlob2) {
    function sync(source, options2) {
      assertPatternsInput(source)
      const works = getWorks(source, sync_1.default, options2)
      return utils.array.flatten(works)
    }
    FastGlob2.sync = sync
    function stream(source, options2) {
      assertPatternsInput(source)
      const works = getWorks(source, stream_1.default, options2)
      return utils.stream.merge(works)
    }
    FastGlob2.stream = stream
    function generateTasks(source, options2) {
      assertPatternsInput(source)
      const patterns = [].concat(source)
      const settings = new settings_1.default(options2)
      return taskManager.generate(patterns, settings)
    }
    FastGlob2.generateTasks = generateTasks
    function isDynamicPattern(source, options2) {
      assertPatternsInput(source)
      const settings = new settings_1.default(options2)
      return utils.pattern.isDynamicPattern(source, settings)
    }
    FastGlob2.isDynamicPattern = isDynamicPattern
    function escapePath(source) {
      assertPatternsInput(source)
      return utils.path.escape(source)
    }
    FastGlob2.escapePath = escapePath
  })(FastGlob || (FastGlob = {}))
  function getWorks(source, _Provider, options2) {
    const patterns = [].concat(source)
    const settings = new settings_1.default(options2)
    const tasks = taskManager.generate(patterns, settings)
    const provider = new _Provider(settings)
    return tasks.map(provider.read, provider)
  }
  function assertPatternsInput(input) {
    const source = [].concat(input)
    const isValidSource = source.every((item) => utils.string.isString(item) && !utils.string.isEmpty(item))
    if (!isValidSource) {
      throw new TypeError('Patterns must be a string (non empty) or an array of strings')
    }
  }
  module2.exports = FastGlob
})

// ../../node_modules/.pnpm/kolorist@1.3.2/node_modules/kolorist/dist/cjs/index.js
var require_cjs = __commonJS((exports2) => {
  'use strict'
  Object.defineProperty(exports2, '__esModule', { value: true })
  exports2.link = exports2.ansi256Bg = exports2.ansi256 = exports2.bgLightGray = exports2.bgLightCyan = exports2.bgLightMagenta = exports2.bgLightBlue = exports2.bgLightYellow = exports2.bgLightGreen = exports2.bgLightRed = exports2.bgGray = exports2.bgWhite = exports2.bgCyan = exports2.bgMagenta = exports2.bgBlue = exports2.bgYellow = exports2.bgGreen = exports2.bgRed = exports2.bgBlack = exports2.lightCyan = exports2.lightMagenta = exports2.lightBlue = exports2.lightYellow = exports2.lightGreen = exports2.lightRed = exports2.lightGray = exports2.gray = exports2.white = exports2.cyan = exports2.magenta = exports2.blue = exports2.yellow = exports2.green = exports2.red = exports2.black = exports2.strikethrough = exports2.hidden = exports2.inverse = exports2.underline = exports2.italic = exports2.dim = exports2.bold = exports2.reset = exports2.stripColors = exports2.options = void 0
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
    enabled = !NODE_DISABLE_COLORS && TERM !== 'dumb' && FORCE_COLOR !== '0' && process.stdout.isTTY
    if (enabled) {
      supportLevel = TERM && TERM.endsWith('-256color') ? 2 : 1
    }
  }
  exports2.options = {
    enabled,
    supportLevel,
  }
  function kolorist(start, end, level = 1) {
    const open = `[${start}m`
    const close = `[${end}m`
    const regex = new RegExp(`\\x1b\\[${end}m`, 'g')
    return (str) => {
      return exports2.options.enabled && exports2.options.supportLevel >= level
        ? open + ('' + str).replace(regex, open) + close
        : '' + str
    }
  }
  function stripColors(str) {
    return ('' + str)
      .replace(/\x1b\[[0-9;]+m/g, '')
      .replace(/\x1b\]8;;.*?\x07(.*?)\x1b\]8;;\x07/g, (_2, group) => group)
  }
  exports2.stripColors = stripColors
  exports2.reset = kolorist(0, 0)
  exports2.bold = kolorist(1, 22)
  exports2.dim = kolorist(2, 22)
  exports2.italic = kolorist(3, 23)
  exports2.underline = kolorist(4, 24)
  exports2.inverse = kolorist(7, 27)
  exports2.hidden = kolorist(8, 28)
  exports2.strikethrough = kolorist(9, 29)
  exports2.black = kolorist(30, 39)
  exports2.red = kolorist(31, 39)
  exports2.green = kolorist(32, 39)
  exports2.yellow = kolorist(33, 39)
  exports2.blue = kolorist(34, 39)
  exports2.magenta = kolorist(35, 39)
  exports2.cyan = kolorist(36, 39)
  exports2.white = kolorist(97, 39)
  exports2.gray = kolorist(90, 39)
  exports2.lightGray = kolorist(37, 39)
  exports2.lightRed = kolorist(91, 39)
  exports2.lightGreen = kolorist(92, 39)
  exports2.lightYellow = kolorist(93, 39)
  exports2.lightBlue = kolorist(94, 39)
  exports2.lightMagenta = kolorist(95, 39)
  exports2.lightCyan = kolorist(96, 39)
  exports2.bgBlack = kolorist(40, 49)
  exports2.bgRed = kolorist(41, 49)
  exports2.bgGreen = kolorist(42, 49)
  exports2.bgYellow = kolorist(43, 49)
  exports2.bgBlue = kolorist(44, 49)
  exports2.bgMagenta = kolorist(45, 49)
  exports2.bgCyan = kolorist(46, 49)
  exports2.bgWhite = kolorist(107, 49)
  exports2.bgGray = kolorist(100, 49)
  exports2.bgLightRed = kolorist(101, 49)
  exports2.bgLightGreen = kolorist(102, 49)
  exports2.bgLightYellow = kolorist(103, 49)
  exports2.bgLightBlue = kolorist(104, 49)
  exports2.bgLightMagenta = kolorist(105, 49)
  exports2.bgLightCyan = kolorist(106, 49)
  exports2.bgLightGray = kolorist(47, 49)
  var ansi256 = (n) => kolorist('38;5;' + n, 0, 2)
  exports2.ansi256 = ansi256
  var ansi256Bg = (n) => kolorist('48;5;' + n, 0, 2)
  exports2.ansi256Bg = ansi256Bg
  var OSC = ']'
  var BEL = '\x07'
  var SEP = ';'
  function link(text, url) {
    return exports2.options.enabled
      ? OSC + '8' + SEP + SEP + url + BEL + text + OSC + '8' + SEP + SEP + BEL
      : `${text} (\u200B${url}\u200B)`
  }
  exports2.link = link
})

// src/index.ts
var import_fs = __toModule(require('fs'))
var import_minimist = __toModule(require_minimist())
var import_path2 = __toModule(require('path'))

// src/build.ts
var import_cross_spawn = __toModule(require_cross_spawn())
var import_esbuild = __toModule(require('esbuild'))
var import_fast_glob = __toModule(require_out4())
var import_kolorist = __toModule(require_cjs())
var import_path = __toModule(require('path'))
async function getEntries(paths) {
  const base = process.cwd()
  const result = await Promise.all(
    paths.map((p) => {
      const absP = import_path.default.resolve(base, p)
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
  console.log(
    `${(0, import_kolorist.bgCyan)((0, import_kolorist.black)(' TASK '))} ${(0, import_kolorist.cyan)(label)}`,
  )
  const now = Date.now()
  return {
    end() {
      const duration = Date.now() - now
      console.log(
        `${(0, import_kolorist.bgGreen)((0, import_kolorist.black)(' DONE '))} ${(0, import_kolorist.green)(
          `${label} - ${humanizeDuration(duration)}`,
        )}`,
      )
    },
  }
}
async function build({
  entries: entries2,
  checkTypes: checkTypes2 = false,
  formats: formats2 = ['cjs'],
  options: options2,
}) {
  const entryPoints = await getEntries(entries2)
  if (checkTypes2) {
    const cTask = task('CHECKING TYPES')
    import_cross_spawn.default.sync('tsc', { cwd: process.cwd(), stdio: 'inherit' })
    cTask.end()
  }
  const bTask = task('BUILDING')
  await Promise.all(
    formats2.map((format2) =>
      import_esbuild.default.build({
        entryPoints,
        outdir: 'dist',
        platform: 'node',
        format: format2,
        target: 'node10',
        logLevel: 'info',
        outExtension: {
          '.js': format2 === 'cjs' || format2 === 'iife' ? '.js' : '.esm.js',
        },
        ...options2,
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
      import_fs.default.readFileSync(import_path2.default.resolve(__dirname, '../package.json')).toString('utf8'),
    ).version,
  )
  process.exit(0)
}
var entries = argv._
var { _, '--': ex, 'check-types': checkTypes, format, ...options } = argv
var formats = typeof format === 'string' ? [format] : format
build({
  entries,
  checkTypes,
  formats,
  options,
})
