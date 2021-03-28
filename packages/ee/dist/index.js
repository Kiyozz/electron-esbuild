#!/usr/bin/env node
var aa = Object.create,
  Et = Object.defineProperty,
  ua = Object.getPrototypeOf,
  ca = Object.prototype.hasOwnProperty,
  la = Object.getOwnPropertyNames,
  fa = Object.getOwnPropertyDescriptor
var pa = (e) => Et(e, '__esModule', { value: !0 })
var S = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports)
var ha = (e, t, r) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let n of la(t))
        !ca.call(e, n) && n !== 'default' && Et(e, n, { get: () => t[n], enumerable: !(r = fa(t, n)) || r.enumerable })
    return e
  },
  he = (e) =>
    ha(
      pa(
        Et(
          e != null ? aa(ua(e)) : {},
          'default',
          e && e.__esModule && 'default' in e ? { get: () => e.default, enumerable: !0 } : { value: e, enumerable: !0 },
        ),
      ),
      e,
    )
var Br = S((ip, Fr) => {
  Fr.exports = function (e, t) {
    t || (t = {})
    var r = { bools: {}, strings: {}, unknownFn: null }
    typeof t.unknown == 'function' && (r.unknownFn = t.unknown),
      typeof t.boolean == 'boolean' && t.boolean
        ? (r.allBools = !0)
        : []
            .concat(t.boolean)
            .filter(Boolean)
            .forEach(function (R) {
              r.bools[R] = !0
            })
    var n = {}
    Object.keys(t.alias || {}).forEach(function (R) {
      ;(n[R] = [].concat(t.alias[R])),
        n[R].forEach(function (w) {
          n[w] = [R].concat(
            n[R].filter(function (H) {
              return w !== H
            }),
          )
        })
    }),
      []
        .concat(t.string)
        .filter(Boolean)
        .forEach(function (R) {
          ;(r.strings[R] = !0), n[R] && (r.strings[n[R]] = !0)
        })
    var s = t.default || {},
      i = { _: [] }
    Object.keys(r.bools).forEach(function (R) {
      u(R, s[R] === void 0 ? !1 : s[R])
    })
    var o = []
    e.indexOf('--') !== -1 && ((o = e.slice(e.indexOf('--') + 1)), (e = e.slice(0, e.indexOf('--'))))
    function a(R, w) {
      return (r.allBools && /^--[^=]+$/.test(w)) || r.strings[R] || r.bools[R] || n[R]
    }
    function u(R, w, H) {
      if (!(H && r.unknownFn && !a(R, H) && r.unknownFn(H) === !1)) {
        var g = !r.strings[R] && Ir(w) ? Number(w) : w
        _(i, R.split('.'), g),
          (n[R] || []).forEach(function (O) {
            _(i, O.split('.'), g)
          })
      }
    }
    function _(R, w, H) {
      for (var g = R, O = 0; O < w.length - 1; O++) {
        var N = w[O]
        if (N === '__proto__') return
        g[N] === void 0 && (g[N] = {}),
          (g[N] === Object.prototype || g[N] === Number.prototype || g[N] === String.prototype) && (g[N] = {}),
          g[N] === Array.prototype && (g[N] = []),
          (g = g[N])
      }
      var N = w[w.length - 1]
      N !== '__proto__' &&
        ((g === Object.prototype || g === Number.prototype || g === String.prototype) && (g = {}),
        g === Array.prototype && (g = []),
        g[N] === void 0 || r.bools[N] || typeof g[N] == 'boolean'
          ? (g[N] = H)
          : Array.isArray(g[N])
          ? g[N].push(H)
          : (g[N] = [g[N], H]))
    }
    function l(R) {
      return n[R].some(function (w) {
        return r.bools[w]
      })
    }
    for (var d = 0; d < e.length; d++) {
      var c = e[d]
      if (/^--.+=/.test(c)) {
        var C = c.match(/^--([^=]+)=([\s\S]*)$/),
          m = C[1],
          A = C[2]
        r.bools[m] && (A = A !== 'false'), u(m, A, c)
      } else if (/^--no-.+/.test(c)) {
        var m = c.match(/^--no-(.+)/)[1]
        u(m, !1, c)
      } else if (/^--.+/.test(c)) {
        var m = c.match(/^--(.+)/)[1],
          v = e[d + 1]
        v !== void 0 && !/^-/.test(v) && !r.bools[m] && !r.allBools && (n[m] ? !l(m) : !0)
          ? (u(m, v, c), d++)
          : /^(true|false)$/.test(v)
          ? (u(m, v === 'true', c), d++)
          : u(m, r.strings[m] ? '' : !0, c)
      } else if (/^-[^-]+/.test(c)) {
        for (var x = c.slice(1, -1).split(''), M = !1, T = 0; T < x.length; T++) {
          var v = c.slice(T + 2)
          if (v === '-') {
            u(x[T], v, c)
            continue
          }
          if (/[A-Za-z]/.test(x[T]) && /=/.test(v)) {
            u(x[T], v.split('=')[1], c), (M = !0)
            break
          }
          if (/[A-Za-z]/.test(x[T]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(v)) {
            u(x[T], v, c), (M = !0)
            break
          }
          if (x[T + 1] && x[T + 1].match(/\W/)) {
            u(x[T], c.slice(T + 2), c), (M = !0)
            break
          } else u(x[T], r.strings[x[T]] ? '' : !0, c)
        }
        var m = c.slice(-1)[0]
        !M &&
          m !== '-' &&
          (e[d + 1] && !/^(-|--)[^-]/.test(e[d + 1]) && !r.bools[m] && (n[m] ? !l(m) : !0)
            ? (u(m, e[d + 1], c), d++)
            : e[d + 1] && /^(true|false)$/.test(e[d + 1])
            ? (u(m, e[d + 1] === 'true', c), d++)
            : u(m, r.strings[m] ? '' : !0, c))
      } else if (
        ((!r.unknownFn || r.unknownFn(c) !== !1) && i._.push(r.strings._ || !Ir(c) ? c : Number(c)), t.stopEarly)
      ) {
        i._.push.apply(i._, e.slice(d + 1))
        break
      }
    }
    return (
      Object.keys(s).forEach(function (R) {
        da(i, R.split('.')) ||
          (_(i, R.split('.'), s[R]),
          (n[R] || []).forEach(function (w) {
            _(i, w.split('.'), s[R])
          }))
      }),
      t['--']
        ? ((i['--'] = new Array()),
          o.forEach(function (R) {
            i['--'].push(R)
          }))
        : o.forEach(function (R) {
            i._.push(R)
          }),
      i
    )
  }
  function da(e, t) {
    var r = e
    t.slice(0, -1).forEach(function (s) {
      r = r[s] || {}
    })
    var n = t[t.length - 1]
    return n in r
  }
  function Ir(e) {
    return typeof e == 'number' || /^0x[0-9a-f]+$/i.test(e) ? !0 : /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e)
  }
})
var Kr = S((op, jr) => {
  jr.exports = Gr
  Gr.sync = _a
  var Ur = require('fs')
  function ga(e, t) {
    var r = t.pathExt !== void 0 ? t.pathExt : process.env.PATHEXT
    if (!r || ((r = r.split(';')), r.indexOf('') !== -1)) return !0
    for (var n = 0; n < r.length; n++) {
      var s = r[n].toLowerCase()
      if (s && e.substr(-s.length).toLowerCase() === s) return !0
    }
    return !1
  }
  function Wr(e, t, r) {
    return !e.isSymbolicLink() && !e.isFile() ? !1 : ga(t, r)
  }
  function Gr(e, t, r) {
    Ur.stat(e, function (n, s) {
      r(n, n ? !1 : Wr(s, e, t))
    })
  }
  function _a(e, t) {
    return Wr(Ur.statSync(e), e, t)
  }
})
var Zr = S((ap, Vr) => {
  Vr.exports = Yr
  Yr.sync = ya
  var Qr = require('fs')
  function Yr(e, t, r) {
    Qr.stat(e, function (n, s) {
      r(n, n ? !1 : Xr(s, t))
    })
  }
  function ya(e, t) {
    return Xr(Qr.statSync(e), t)
  }
  function Xr(e, t) {
    return e.isFile() && ma(e, t)
  }
  function ma(e, t) {
    var r = e.mode,
      n = e.uid,
      s = e.gid,
      i = t.uid !== void 0 ? t.uid : process.getuid && process.getuid(),
      o = t.gid !== void 0 ? t.gid : process.getgid && process.getgid(),
      a = parseInt('100', 8),
      u = parseInt('010', 8),
      _ = parseInt('001', 8),
      l = a | u,
      d = r & _ || (r & u && s === o) || (r & a && n === i) || (r & l && i === 0)
    return d
  }
})
var Jr = S((cp, zr) => {
  var up = require('fs'),
    We
  process.platform === 'win32' || global.TESTING_WINDOWS ? (We = Kr()) : (We = Zr())
  zr.exports = bt
  bt.sync = Sa
  function bt(e, t, r) {
    if ((typeof t == 'function' && ((r = t), (t = {})), !r)) {
      if (typeof Promise != 'function') throw new TypeError('callback not provided')
      return new Promise(function (n, s) {
        bt(e, t || {}, function (i, o) {
          i ? s(i) : n(o)
        })
      })
    }
    We(e, t || {}, function (n, s) {
      n && (n.code === 'EACCES' || (t && t.ignoreErrors)) && ((n = null), (s = !1)), r(n, s)
    })
  }
  function Sa(e, t) {
    try {
      return We.sync(e, t || {})
    } catch (r) {
      if ((t && t.ignoreErrors) || r.code === 'EACCES') return !1
      throw r
    }
  }
})
var an = S((lp, en) => {
  en.exports = tn
  tn.sync = Ea
  var At = process.platform === 'win32' || process.env.OSTYPE === 'cygwin' || process.env.OSTYPE === 'msys',
    rn = require('path'),
    ba = At ? ';' : ':',
    nn = Jr()
  function sn(e) {
    var t = new Error('not found: ' + e)
    return (t.code = 'ENOENT'), t
  }
  function on(e, t) {
    var r = t.colon || ba,
      n = t.path || process.env.PATH || '',
      s = ['']
    n = n.split(r)
    var i = ''
    return (
      At &&
        (n.unshift(process.cwd()),
        (i = t.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM'),
        (s = i.split(r)),
        e.indexOf('.') !== -1 && s[0] !== '' && s.unshift('')),
      (e.match(/\//) || (At && e.match(/\\/))) && (n = ['']),
      { env: n, ext: s, extExe: i }
    )
  }
  function tn(e, t, r) {
    typeof t == 'function' && ((r = t), (t = {}))
    var n = on(e, t),
      s = n.env,
      i = n.ext,
      o = n.extExe,
      a = []
    ;(function u(_, l) {
      if (_ === l) return t.all && a.length ? r(null, a) : r(sn(e))
      var d = s[_]
      d.charAt(0) === '"' && d.slice(-1) === '"' && (d = d.slice(1, -1))
      var c = rn.join(d, e)
      !d && /^\.[\\\/]/.test(e) && (c = e.slice(0, 2) + c),
        (function C(m, A) {
          if (m === A) return u(_ + 1, l)
          var v = i[m]
          nn(c + v, { pathExt: o }, function (x, M) {
            if (!x && M)
              if (t.all) a.push(c + v)
              else return r(null, c + v)
            return C(m + 1, A)
          })
        })(0, i.length)
    })(0, s.length)
  }
  function Ea(e, t) {
    t = t || {}
    for (var r = on(e, t), n = r.env, s = r.ext, i = r.extExe, o = [], a = 0, u = n.length; a < u; a++) {
      var _ = n[a]
      _.charAt(0) === '"' && _.slice(-1) === '"' && (_ = _.slice(1, -1))
      var l = rn.join(_, e)
      !_ && /^\.[\\\/]/.test(e) && (l = e.slice(0, 2) + l)
      for (var d = 0, c = s.length; d < c; d++) {
        var C = l + s[d],
          m
        try {
          if (((m = nn.sync(C, { pathExt: i })), m))
            if (t.all) o.push(C)
            else return C
        } catch (A) {}
      }
    }
    if (t.all && o.length) return o
    if (t.nothrow) return null
    throw sn(e)
  }
})
var cn = S((fp, un) => {
  'use strict'
  un.exports = (e) => {
    e = e || {}
    let t = e.env || process.env
    return (e.platform || process.platform) !== 'win32'
      ? 'PATH'
      : Object.keys(t).find((n) => n.toUpperCase() === 'PATH') || 'Path'
  }
})
var hn = S((pp, ln) => {
  'use strict'
  var fn = require('path'),
    Aa = an(),
    va = cn()
  function pn(e, t) {
    let r = e.options.env || process.env,
      n = process.cwd(),
      s = e.options.cwd != null,
      i = s && process.chdir !== void 0 && !process.chdir.disabled
    if (i)
      try {
        process.chdir(e.options.cwd)
      } catch (a) {}
    let o
    try {
      o = Aa.sync(e.command, { path: r[va({ env: r })], pathExt: t ? fn.delimiter : void 0 })
    } catch (a) {
    } finally {
      i && process.chdir(n)
    }
    return o && (o = fn.resolve(s ? e.options.cwd : '', o)), o
  }
  function Ra(e) {
    return pn(e) || pn(e, !0)
  }
  ln.exports = Ra
})
var dn = S((hp, vt) => {
  'use strict'
  var Rt = /([()\][%!^"`<>&|;, *?])/g
  function xa(e) {
    return (e = e.replace(Rt, '^$1')), e
  }
  function wa(e, t) {
    return (
      (e = `${e}`),
      (e = e.replace(/(\\*)"/g, '$1$1\\"')),
      (e = e.replace(/(\\*)$/, '$1$1')),
      (e = `"${e}"`),
      (e = e.replace(Rt, '^$1')),
      t && (e = e.replace(Rt, '^$1')),
      e
    )
  }
  vt.exports.command = xa
  vt.exports.argument = wa
})
var gn = S((dp, _n) => {
  'use strict'
  _n.exports = /^#!.*/
})
var mn = S((_p, yn) => {
  'use strict'
  var Ca = gn()
  yn.exports = function (e) {
    var t = e.match(Ca)
    if (!t) return null
    var r = t[0].replace(/#! ?/, '').split(' '),
      n = r[0].split('/').pop(),
      s = r[1]
    return n === 'env' ? s : n + (s ? ' ' + s : '')
  }
})
var En = S((gp, Sn) => {
  'use strict'
  var xt = require('fs'),
    Pa = mn()
  function Ta(e) {
    let t = 150,
      r = Buffer.alloc(t),
      n
    try {
      ;(n = xt.openSync(e, 'r')), xt.readSync(n, r, 0, t, 0), xt.closeSync(n)
    } catch (s) {}
    return Pa(r.toString())
  }
  Sn.exports = Ta
})
var Rn = S((yp, bn) => {
  'use strict'
  var Oa = require('path'),
    An = hn(),
    vn = dn(),
    La = En(),
    ka = process.platform === 'win32',
    Ha = /\.(?:com|exe)$/i,
    $a = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i
  function Ma(e) {
    e.file = An(e)
    let t = e.file && La(e.file)
    return t ? (e.args.unshift(e.file), (e.command = t), An(e)) : e.file
  }
  function Na(e) {
    if (!ka) return e
    let t = Ma(e),
      r = !Ha.test(t)
    if (e.options.forceShell || r) {
      let n = $a.test(t)
      ;(e.command = Oa.normalize(e.command)),
        (e.command = vn.command(e.command)),
        (e.args = e.args.map((i) => vn.argument(i, n)))
      let s = [e.command].concat(e.args).join(' ')
      ;(e.args = ['/d', '/s', '/c', `"${s}"`]),
        (e.command = process.env.comspec || 'cmd.exe'),
        (e.options.windowsVerbatimArguments = !0)
    }
    return e
  }
  function Da(e, t, r) {
    t && !Array.isArray(t) && ((r = t), (t = null)), (t = t ? t.slice(0) : []), (r = Object.assign({}, r))
    let n = { command: e, args: t, options: r, file: void 0, original: { command: e, args: t } }
    return r.shell ? n : Na(n)
  }
  bn.exports = Da
})
var Cn = S((mp, xn) => {
  'use strict'
  var wt = process.platform === 'win32'
  function Ct(e, t) {
    return Object.assign(new Error(`${t} ${e.command} ENOENT`), {
      code: 'ENOENT',
      errno: 'ENOENT',
      syscall: `${t} ${e.command}`,
      path: e.command,
      spawnargs: e.args,
    })
  }
  function qa(e, t) {
    if (!wt) return
    let r = e.emit
    e.emit = function (n, s) {
      if (n === 'exit') {
        let i = wn(s, t, 'spawn')
        if (i) return r.call(e, 'error', i)
      }
      return r.apply(e, arguments)
    }
  }
  function wn(e, t) {
    return wt && e === 1 && !t.file ? Ct(t.original, 'spawn') : null
  }
  function Fa(e, t) {
    return wt && e === 1 && !t.file ? Ct(t.original, 'spawnSync') : null
  }
  xn.exports = { hookChildProcess: qa, verifyENOENT: wn, verifyENOENTSync: Fa, notFoundError: Ct }
})
var On = S((Sp, we) => {
  'use strict'
  var Pn = require('child_process'),
    Pt = Rn(),
    Tt = Cn()
  function Tn(e, t, r) {
    let n = Pt(e, t, r),
      s = Pn.spawn(n.command, n.args, n.options)
    return Tt.hookChildProcess(s, n), s
  }
  function Ia(e, t, r) {
    let n = Pt(e, t, r),
      s = Pn.spawnSync(n.command, n.args, n.options)
    return (s.error = s.error || Tt.verifyENOENTSync(s.status, n)), s
  }
  we.exports = Tn
  we.exports.spawn = Tn
  we.exports.sync = Ia
  we.exports._parse = Pt
  we.exports._enoent = Tt
})
var Ln = S((Ce) => {
  'use strict'
  Object.defineProperty(Ce, '__esModule', { value: !0 })
  Ce.splitWhen = Ce.flatten = void 0
  function Ba(e) {
    return e.reduce((t, r) => [].concat(t, r), [])
  }
  Ce.flatten = Ba
  function ja(e, t) {
    let r = [[]],
      n = 0
    for (let s of e) t(s) ? (n++, (r[n] = [])) : r[n].push(s)
    return r
  }
  Ce.splitWhen = ja
})
var kn = S((Ke) => {
  'use strict'
  Object.defineProperty(Ke, '__esModule', { value: !0 })
  Ke.isEnoentCodeError = void 0
  function Ga(e) {
    return e.code === 'ENOENT'
  }
  Ke.isEnoentCodeError = Ga
})
var $n = S((Ve) => {
  'use strict'
  Object.defineProperty(Ve, '__esModule', { value: !0 })
  Ve.createDirentFromStats = void 0
  var Hn = class {
    constructor(t, r) {
      ;(this.name = t),
        (this.isBlockDevice = r.isBlockDevice.bind(r)),
        (this.isCharacterDevice = r.isCharacterDevice.bind(r)),
        (this.isDirectory = r.isDirectory.bind(r)),
        (this.isFIFO = r.isFIFO.bind(r)),
        (this.isFile = r.isFile.bind(r)),
        (this.isSocket = r.isSocket.bind(r)),
        (this.isSymbolicLink = r.isSymbolicLink.bind(r))
    }
  }
  function Ua(e, t) {
    return new Hn(e, t)
  }
  Ve.createDirentFromStats = Ua
})
var Mn = S((se) => {
  'use strict'
  Object.defineProperty(se, '__esModule', { value: !0 })
  se.removeLeadingDotSegment = se.escape = se.makeAbsolute = se.unixify = void 0
  var Wa = require('path'),
    Ka = 2,
    Va = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\())/g
  function Ya(e) {
    return e.replace(/\\/g, '/')
  }
  se.unixify = Ya
  function Qa(e, t) {
    return Wa.resolve(e, t)
  }
  se.makeAbsolute = Qa
  function Xa(e) {
    return e.replace(Va, '\\$2')
  }
  se.escape = Xa
  function Za(e) {
    if (e.charAt(0) === '.') {
      let t = e.charAt(1)
      if (t === '/' || t === '\\') return e.slice(Ka)
    }
    return e
  }
  se.removeLeadingDotSegment = Za
})
var Dn = S((Rp, Nn) => {
  Nn.exports = function (t) {
    if (typeof t != 'string' || t === '') return !1
    for (var r; (r = /(\\).|([@?!+*]\(.*\))/g.exec(t)); ) {
      if (r[2]) return !0
      t = t.slice(r.index + r[0].length)
    }
    return !1
  }
})
var Fn = S((xp, qn) => {
  var za = Dn(),
    Ja = { '{': '}', '(': ')', '[': ']' },
    eu = /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/,
    tu = /\\(.)|(^!|[*?{}()[\]]|\(\?)/
  qn.exports = function (t, r) {
    if (typeof t != 'string' || t === '') return !1
    if (za(t)) return !0
    var n = eu,
      s
    for (r && r.strict === !1 && (n = tu); (s = n.exec(t)); ) {
      if (s[2]) return !0
      var i = s.index + s[0].length,
        o = s[1],
        a = o ? Ja[o] : null
      if (o && a) {
        var u = t.indexOf(a, i)
        u !== -1 && (i = u + 1)
      }
      t = t.slice(i)
    }
    return !1
  }
})
var Bn = S((wp, In) => {
  'use strict'
  var ru = Fn(),
    nu = require('path').posix.dirname,
    su = require('os').platform() === 'win32',
    Ot = '/',
    iu = /\\/g,
    ou = /[\{\[].*[\}\]]$/,
    au = /(^|[^\\])([\{\[]|\([^\)]+$)/,
    uu = /\\([\!\*\?\|\[\]\(\)\{\}])/g
  In.exports = function (t, r) {
    var n = Object.assign({ flipBackslashes: !0 }, r)
    n.flipBackslashes && su && t.indexOf(Ot) < 0 && (t = t.replace(iu, Ot)), ou.test(t) && (t += Ot), (t += 'a')
    do t = nu(t)
    while (ru(t) || au.test(t))
    return t.replace(uu, '$1')
  }
})
var Ye = S((J) => {
  'use strict'
  J.isInteger = (e) =>
    typeof e == 'number'
      ? Number.isInteger(e)
      : typeof e == 'string' && e.trim() !== ''
      ? Number.isInteger(Number(e))
      : !1
  J.find = (e, t) => e.nodes.find((r) => r.type === t)
  J.exceedsLimit = (e, t, r = 1, n) =>
    n === !1 || !J.isInteger(e) || !J.isInteger(t) ? !1 : (Number(t) - Number(e)) / Number(r) >= n
  J.escapeNode = (e, t = 0, r) => {
    let n = e.nodes[t]
    !n ||
      (((r && n.type === r) || n.type === 'open' || n.type === 'close') &&
        n.escaped !== !0 &&
        ((n.value = '\\' + n.value), (n.escaped = !0)))
  }
  J.encloseBrace = (e) =>
    e.type !== 'brace' ? !1 : (e.commas >> (0 + e.ranges)) >> 0 == 0 ? ((e.invalid = !0), !0) : !1
  J.isInvalidBrace = (e) =>
    e.type !== 'brace'
      ? !1
      : e.invalid === !0 || e.dollar
      ? !0
      : (e.commas >> (0 + e.ranges)) >> 0 == 0 || e.open !== !0 || e.close !== !0
      ? ((e.invalid = !0), !0)
      : !1
  J.isOpenOrClose = (e) => (e.type === 'open' || e.type === 'close' ? !0 : e.open === !0 || e.close === !0)
  J.reduce = (e) =>
    e.reduce((t, r) => (r.type === 'text' && t.push(r.value), r.type === 'range' && (r.type = 'text'), t), [])
  J.flatten = (...e) => {
    let t = [],
      r = (n) => {
        for (let s = 0; s < n.length; s++) {
          let i = n[s]
          Array.isArray(i) ? r(i, t) : i !== void 0 && t.push(i)
        }
        return t
      }
    return r(e), t
  }
})
var Qe = S((Pp, jn) => {
  'use strict'
  var Gn = Ye()
  jn.exports = (e, t = {}) => {
    let r = (n, s = {}) => {
      let i = t.escapeInvalid && Gn.isInvalidBrace(s),
        o = n.invalid === !0 && t.escapeInvalid === !0,
        a = ''
      if (n.value) return (i || o) && Gn.isOpenOrClose(n) ? '\\' + n.value : n.value
      if (n.value) return n.value
      if (n.nodes) for (let u of n.nodes) a += r(u)
      return a
    }
    return r(e)
  }
})
var Kn = S((Tp, Un) => {
  var cu = Object.prototype.toString
  Un.exports = function (t) {
    if (t === void 0) return 'undefined'
    if (t === null) return 'null'
    var r = typeof t
    if (r === 'boolean') return 'boolean'
    if (r === 'string') return 'string'
    if (r === 'number') return 'number'
    if (r === 'symbol') return 'symbol'
    if (r === 'function') return du(t) ? 'generatorfunction' : 'function'
    if (lu(t)) return 'array'
    if (yu(t)) return 'buffer'
    if (gu(t)) return 'arguments'
    if (pu(t)) return 'date'
    if (fu(t)) return 'error'
    if (hu(t)) return 'regexp'
    switch (Wn(t)) {
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
    if (_u(t)) return 'generator'
    switch (((r = cu.call(t)), r)) {
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
    return r.slice(8, -1).toLowerCase().replace(/\s/g, '')
  }
  function Wn(e) {
    return typeof e.constructor == 'function' ? e.constructor.name : null
  }
  function lu(e) {
    return Array.isArray ? Array.isArray(e) : e instanceof Array
  }
  function fu(e) {
    return (
      e instanceof Error ||
      (typeof e.message == 'string' && e.constructor && typeof e.constructor.stackTraceLimit == 'number')
    )
  }
  function pu(e) {
    return e instanceof Date
      ? !0
      : typeof e.toDateString == 'function' && typeof e.getDate == 'function' && typeof e.setDate == 'function'
  }
  function hu(e) {
    return e instanceof RegExp
      ? !0
      : typeof e.flags == 'string' &&
          typeof e.ignoreCase == 'boolean' &&
          typeof e.multiline == 'boolean' &&
          typeof e.global == 'boolean'
  }
  function du(e, t) {
    return Wn(e) === 'GeneratorFunction'
  }
  function _u(e) {
    return typeof e.throw == 'function' && typeof e.return == 'function' && typeof e.next == 'function'
  }
  function gu(e) {
    try {
      if (typeof e.length == 'number' && typeof e.callee == 'function') return !0
    } catch (t) {
      if (t.message.indexOf('callee') !== -1) return !0
    }
    return !1
  }
  function yu(e) {
    return e.constructor && typeof e.constructor.isBuffer == 'function' ? e.constructor.isBuffer(e) : !1
  }
})
var Yn = S((Op, Vn) => {
  'use strict'
  var mu = Kn()
  Vn.exports = function (t) {
    var r = mu(t)
    if (r === 'string') {
      if (!t.trim()) return !1
    } else if (r !== 'number') return !1
    return t - t + 1 >= 0
  }
})
var ns = S((Lp, Qn) => {
  'use strict'
  var Xn = Yn(),
    be = (e, t, r) => {
      if (Xn(e) === !1) throw new TypeError('toRegexRange: expected the first argument to be a number')
      if (t === void 0 || e === t) return String(e)
      if (Xn(t) === !1) throw new TypeError('toRegexRange: expected the second argument to be a number.')
      let n = { relaxZeros: !0, ...r }
      typeof n.strictZeros == 'boolean' && (n.relaxZeros = n.strictZeros === !1)
      let s = String(n.relaxZeros),
        i = String(n.shorthand),
        o = String(n.capture),
        a = String(n.wrap),
        u = e + ':' + t + '=' + s + i + o + a
      if (be.cache.hasOwnProperty(u)) return be.cache[u].result
      let _ = Math.min(e, t),
        l = Math.max(e, t)
      if (Math.abs(_ - l) === 1) {
        let A = e + '|' + t
        return n.capture ? `(${A})` : n.wrap === !1 ? A : `(?:${A})`
      }
      let d = zn(e) || zn(t),
        c = { min: e, max: t, a: _, b: l },
        C = [],
        m = []
      if ((d && ((c.isPadded = d), (c.maxLen = String(c.max).length)), _ < 0)) {
        let A = l < 0 ? Math.abs(l) : 1
        ;(m = Zn(A, Math.abs(_), c, n)), (_ = c.a = 0)
      }
      return (
        l >= 0 && (C = Zn(_, l, c, n)),
        (c.negatives = m),
        (c.positives = C),
        (c.result = Su(m, C, n)),
        n.capture === !0
          ? (c.result = `(${c.result})`)
          : n.wrap !== !1 && C.length + m.length > 1 && (c.result = `(?:${c.result})`),
        (be.cache[u] = c),
        c.result
      )
    }
  function Su(e, t, r) {
    let n = Lt(e, t, '-', !1, r) || [],
      s = Lt(t, e, '', !1, r) || [],
      i = Lt(e, t, '-?', !0, r) || []
    return n.concat(i).concat(s).join('|')
  }
  function bu(e, t) {
    let r = 1,
      n = 1,
      s = Jn(e, r),
      i = new Set([t])
    for (; e <= s && s <= t; ) i.add(s), (r += 1), (s = Jn(e, r))
    for (s = es(t + 1, n) - 1; e < s && s <= t; ) i.add(s), (n += 1), (s = es(t + 1, n) - 1)
    return (i = [...i]), i.sort(Eu), i
  }
  function Ru(e, t, r) {
    if (e === t) return { pattern: e, count: [], digits: 0 }
    let n = Au(e, t),
      s = n.length,
      i = '',
      o = 0
    for (let a = 0; a < s; a++) {
      let [u, _] = n[a]
      u === _ ? (i += u) : u !== '0' || _ !== '9' ? (i += vu(u, _, r)) : o++
    }
    return o && (i += r.shorthand === !0 ? '\\d' : '[0-9]'), { pattern: i, count: [o], digits: s }
  }
  function Zn(e, t, r, n) {
    let s = bu(e, t),
      i = [],
      o = e,
      a
    for (let u = 0; u < s.length; u++) {
      let _ = s[u],
        l = Ru(String(o), String(_), n),
        d = ''
      if (!r.isPadded && a && a.pattern === l.pattern) {
        a.count.length > 1 && a.count.pop(), a.count.push(l.count[0]), (a.string = a.pattern + ts(a.count)), (o = _ + 1)
        continue
      }
      r.isPadded && (d = xu(_, r, n)), (l.string = d + l.pattern + ts(l.count)), i.push(l), (o = _ + 1), (a = l)
    }
    return i
  }
  function Lt(e, t, r, n, s) {
    let i = []
    for (let o of e) {
      let { string: a } = o
      !n && !rs(t, 'string', a) && i.push(r + a), n && rs(t, 'string', a) && i.push(r + a)
    }
    return i
  }
  function Au(e, t) {
    let r = []
    for (let n = 0; n < e.length; n++) r.push([e[n], t[n]])
    return r
  }
  function Eu(e, t) {
    return e > t ? 1 : t > e ? -1 : 0
  }
  function rs(e, t, r) {
    return e.some((n) => n[t] === r)
  }
  function Jn(e, t) {
    return Number(String(e).slice(0, -t) + '9'.repeat(t))
  }
  function es(e, t) {
    return e - (e % Math.pow(10, t))
  }
  function ts(e) {
    let [t = 0, r = ''] = e
    return r || t > 1 ? `{${t + (r ? ',' + r : '')}}` : ''
  }
  function vu(e, t, r) {
    return `[${e}${t - e == 1 ? '' : '-'}${t}]`
  }
  function zn(e) {
    return /^-?(0+)\d/.test(e)
  }
  function xu(e, t, r) {
    if (!t.isPadded) return e
    let n = Math.abs(t.maxLen - String(e).length),
      s = r.relaxZeros !== !1
    switch (n) {
      case 0:
        return ''
      case 1:
        return s ? '0?' : '0'
      case 2:
        return s ? '0{0,2}' : '00'
      default:
        return s ? `0{0,${n}}` : `0{${n}}`
    }
  }
  be.cache = {}
  be.clearCache = () => (be.cache = {})
  Qn.exports = be
})
var $t = S((kp, ss) => {
  'use strict'
  var wu = require('util'),
    is = ns(),
    os = (e) => e !== null && typeof e == 'object' && !Array.isArray(e),
    Cu = (e) => (t) => (e === !0 ? Number(t) : String(t)),
    kt = (e) => typeof e == 'number' || (typeof e == 'string' && e !== ''),
    De = (e) => Number.isInteger(+e),
    Ht = (e) => {
      let t = `${e}`,
        r = -1
      if ((t[0] === '-' && (t = t.slice(1)), t === '0')) return !1
      for (; t[++r] === '0'; );
      return r > 0
    },
    Pu = (e, t, r) => (typeof e == 'string' || typeof t == 'string' ? !0 : r.stringify === !0),
    Tu = (e, t, r) => {
      if (t > 0) {
        let n = e[0] === '-' ? '-' : ''
        n && (e = e.slice(1)), (e = n + e.padStart(n ? t - 1 : t, '0'))
      }
      return r === !1 ? String(e) : e
    },
    as = (e, t) => {
      let r = e[0] === '-' ? '-' : ''
      for (r && ((e = e.slice(1)), t--); e.length < t; ) e = '0' + e
      return r ? '-' + e : e
    },
    Ou = (e, t) => {
      e.negatives.sort((o, a) => (o < a ? -1 : o > a ? 1 : 0)), e.positives.sort((o, a) => (o < a ? -1 : o > a ? 1 : 0))
      let r = t.capture ? '' : '?:',
        n = '',
        s = '',
        i
      return (
        e.positives.length && (n = e.positives.join('|')),
        e.negatives.length && (s = `-(${r}${e.negatives.join('|')})`),
        n && s ? (i = `${n}|${s}`) : (i = n || s),
        t.wrap ? `(${r}${i})` : i
      )
    },
    us = (e, t, r, n) => {
      if (r) return is(e, t, { wrap: !1, ...n })
      let s = String.fromCharCode(e)
      if (e === t) return s
      let i = String.fromCharCode(t)
      return `[${s}-${i}]`
    },
    cs = (e, t, r) => {
      if (Array.isArray(e)) {
        let n = r.wrap === !0,
          s = r.capture ? '' : '?:'
        return n ? `(${s}${e.join('|')})` : e.join('|')
      }
      return is(e, t, r)
    },
    ls = (...e) => new RangeError('Invalid range arguments: ' + wu.inspect(...e)),
    fs = (e, t, r) => {
      if (r.strictRanges === !0) throw ls([e, t])
      return []
    },
    Lu = (e, t) => {
      if (t.strictRanges === !0) throw new TypeError(`Expected step "${e}" to be a number`)
      return []
    },
    ku = (e, t, r = 1, n = {}) => {
      let s = Number(e),
        i = Number(t)
      if (!Number.isInteger(s) || !Number.isInteger(i)) {
        if (n.strictRanges === !0) throw ls([e, t])
        return []
      }
      s === 0 && (s = 0), i === 0 && (i = 0)
      let o = s > i,
        a = String(e),
        u = String(t),
        _ = String(r)
      r = Math.max(Math.abs(r), 1)
      let l = Ht(a) || Ht(u) || Ht(_),
        d = l ? Math.max(a.length, u.length, _.length) : 0,
        c = l === !1 && Pu(e, t, n) === !1,
        C = n.transform || Cu(c)
      if (n.toRegex && r === 1) return us(as(e, d), as(t, d), !0, n)
      let m = { negatives: [], positives: [] },
        A = (M) => m[M < 0 ? 'negatives' : 'positives'].push(Math.abs(M)),
        v = [],
        x = 0
      for (; o ? s >= i : s <= i; )
        n.toRegex === !0 && r > 1 ? A(s) : v.push(Tu(C(s, x), d, c)), (s = o ? s - r : s + r), x++
      return n.toRegex === !0 ? (r > 1 ? Ou(m, n) : cs(v, null, { wrap: !1, ...n })) : v
    },
    Hu = (e, t, r = 1, n = {}) => {
      if ((!De(e) && e.length > 1) || (!De(t) && t.length > 1)) return fs(e, t, n)
      let s = n.transform || ((c) => String.fromCharCode(c)),
        i = `${e}`.charCodeAt(0),
        o = `${t}`.charCodeAt(0),
        a = i > o,
        u = Math.min(i, o),
        _ = Math.max(i, o)
      if (n.toRegex && r === 1) return us(u, _, !1, n)
      let l = [],
        d = 0
      for (; a ? i >= o : i <= o; ) l.push(s(i, d)), (i = a ? i - r : i + r), d++
      return n.toRegex === !0 ? cs(l, null, { wrap: !1, options: n }) : l
    },
    Xe = (e, t, r, n = {}) => {
      if (t == null && kt(e)) return [e]
      if (!kt(e) || !kt(t)) return fs(e, t, n)
      if (typeof r == 'function') return Xe(e, t, 1, { transform: r })
      if (os(r)) return Xe(e, t, 0, r)
      let s = { ...n }
      return (
        s.capture === !0 && (s.wrap = !0),
        (r = r || s.step || 1),
        De(r)
          ? De(e) && De(t)
            ? ku(e, t, r, s)
            : Hu(e, t, Math.max(Math.abs(r), 1), s)
          : r != null && !os(r)
          ? Lu(r, s)
          : Xe(e, t, 1, r)
      )
    }
  ss.exports = Xe
})
var ds = S((Hp, ps) => {
  'use strict'
  var $u = $t(),
    hs = Ye(),
    Mu = (e, t = {}) => {
      let r = (n, s = {}) => {
        let i = hs.isInvalidBrace(s),
          o = n.invalid === !0 && t.escapeInvalid === !0,
          a = i === !0 || o === !0,
          u = t.escapeInvalid === !0 ? '\\' : '',
          _ = ''
        if (n.isOpen === !0 || n.isClose === !0) return u + n.value
        if (n.type === 'open') return a ? u + n.value : '('
        if (n.type === 'close') return a ? u + n.value : ')'
        if (n.type === 'comma') return n.prev.type === 'comma' ? '' : a ? n.value : '|'
        if (n.value) return n.value
        if (n.nodes && n.ranges > 0) {
          let l = hs.reduce(n.nodes),
            d = $u(...l, { ...t, wrap: !1, toRegex: !0 })
          if (d.length !== 0) return l.length > 1 && d.length > 1 ? `(${d})` : d
        }
        if (n.nodes) for (let l of n.nodes) _ += r(l, n)
        return _
      }
      return r(e)
    }
  ps.exports = Mu
})
var ys = S(($p, _s) => {
  'use strict'
  var Nu = $t(),
    gs = Qe(),
    Pe = Ye(),
    Ae = (e = '', t = '', r = !1) => {
      let n = []
      if (((e = [].concat(e)), (t = [].concat(t)), !t.length)) return e
      if (!e.length) return r ? Pe.flatten(t).map((s) => `{${s}}`) : t
      for (let s of e)
        if (Array.isArray(s)) for (let i of s) n.push(Ae(i, t, r))
        else
          for (let i of t)
            r === !0 && typeof i == 'string' && (i = `{${i}}`), n.push(Array.isArray(i) ? Ae(s, i, r) : s + i)
      return Pe.flatten(n)
    },
    Du = (e, t = {}) => {
      let r = t.rangeLimit === void 0 ? 1e3 : t.rangeLimit,
        n = (s, i = {}) => {
          s.queue = []
          let o = i,
            a = i.queue
          for (; o.type !== 'brace' && o.type !== 'root' && o.parent; ) (o = o.parent), (a = o.queue)
          if (s.invalid || s.dollar) {
            a.push(Ae(a.pop(), gs(s, t)))
            return
          }
          if (s.type === 'brace' && s.invalid !== !0 && s.nodes.length === 2) {
            a.push(Ae(a.pop(), ['{}']))
            return
          }
          if (s.nodes && s.ranges > 0) {
            let d = Pe.reduce(s.nodes)
            if (Pe.exceedsLimit(...d, t.step, r))
              throw new RangeError(
                'expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.',
              )
            let c = Nu(...d, t)
            c.length === 0 && (c = gs(s, t)), a.push(Ae(a.pop(), c)), (s.nodes = [])
            return
          }
          let u = Pe.encloseBrace(s),
            _ = s.queue,
            l = s
          for (; l.type !== 'brace' && l.type !== 'root' && l.parent; ) (l = l.parent), (_ = l.queue)
          for (let d = 0; d < s.nodes.length; d++) {
            let c = s.nodes[d]
            if (c.type === 'comma' && s.type === 'brace') {
              d === 1 && _.push(''), _.push('')
              continue
            }
            if (c.type === 'close') {
              a.push(Ae(a.pop(), _, u))
              continue
            }
            if (c.value && c.type !== 'open') {
              _.push(Ae(_.pop(), c.value))
              continue
            }
            c.nodes && n(c, s)
          }
          return _
        }
      return Pe.flatten(n(e))
    }
  _s.exports = Du
})
var Ss = S((Mp, ms) => {
  'use strict'
  ms.exports = {
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
    CHAR_LINE_FEED: `
`,
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
var Rs = S((Np, Es) => {
  'use strict'
  var qu = Qe(),
    {
      MAX_LENGTH: bs,
      CHAR_BACKSLASH: Mt,
      CHAR_BACKTICK: Fu,
      CHAR_COMMA: Iu,
      CHAR_DOT: Bu,
      CHAR_LEFT_PARENTHESES: ju,
      CHAR_RIGHT_PARENTHESES: Gu,
      CHAR_LEFT_CURLY_BRACE: Uu,
      CHAR_RIGHT_CURLY_BRACE: Wu,
      CHAR_LEFT_SQUARE_BRACKET: As,
      CHAR_RIGHT_SQUARE_BRACKET: vs,
      CHAR_DOUBLE_QUOTE: Ku,
      CHAR_SINGLE_QUOTE: Vu,
      CHAR_NO_BREAK_SPACE: Yu,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: Qu,
    } = Ss(),
    Xu = (e, t = {}) => {
      if (typeof e != 'string') throw new TypeError('Expected a string')
      let r = t || {},
        n = typeof r.maxLength == 'number' ? Math.min(bs, r.maxLength) : bs
      if (e.length > n) throw new SyntaxError(`Input length (${e.length}), exceeds max characters (${n})`)
      let s = { type: 'root', input: e, nodes: [] },
        i = [s],
        o = s,
        a = s,
        u = 0,
        _ = e.length,
        l = 0,
        d = 0,
        c,
        C = {},
        m = () => e[l++],
        A = (v) => {
          if (
            (v.type === 'text' && a.type === 'dot' && (a.type = 'text'), a && a.type === 'text' && v.type === 'text')
          ) {
            a.value += v.value
            return
          }
          return o.nodes.push(v), (v.parent = o), (v.prev = a), (a = v), v
        }
      for (A({ type: 'bos' }); l < _; )
        if (((o = i[i.length - 1]), (c = m()), !(c === Qu || c === Yu))) {
          if (c === Mt) {
            A({ type: 'text', value: (t.keepEscaping ? c : '') + m() })
            continue
          }
          if (c === vs) {
            A({ type: 'text', value: '\\' + c })
            continue
          }
          if (c === As) {
            u++
            let v = !0,
              x
            for (; l < _ && (x = m()); ) {
              if (((c += x), x === As)) {
                u++
                continue
              }
              if (x === Mt) {
                c += m()
                continue
              }
              if (x === vs && (u--, u === 0)) break
            }
            A({ type: 'text', value: c })
            continue
          }
          if (c === ju) {
            ;(o = A({ type: 'paren', nodes: [] })), i.push(o), A({ type: 'text', value: c })
            continue
          }
          if (c === Gu) {
            if (o.type !== 'paren') {
              A({ type: 'text', value: c })
              continue
            }
            ;(o = i.pop()), A({ type: 'text', value: c }), (o = i[i.length - 1])
            continue
          }
          if (c === Ku || c === Vu || c === Fu) {
            let v = c,
              x
            for (t.keepQuotes !== !0 && (c = ''); l < _ && (x = m()); ) {
              if (x === Mt) {
                c += x + m()
                continue
              }
              if (x === v) {
                t.keepQuotes === !0 && (c += x)
                break
              }
              c += x
            }
            A({ type: 'text', value: c })
            continue
          }
          if (c === Uu) {
            d++
            let v = (a.value && a.value.slice(-1) === '$') || o.dollar === !0
            ;(o = A({ type: 'brace', open: !0, close: !1, dollar: v, depth: d, commas: 0, ranges: 0, nodes: [] })),
              i.push(o),
              A({ type: 'open', value: c })
            continue
          }
          if (c === Wu) {
            if (o.type !== 'brace') {
              A({ type: 'text', value: c })
              continue
            }
            let v = 'close'
            ;(o = i.pop()), (o.close = !0), A({ type: v, value: c }), d--, (o = i[i.length - 1])
            continue
          }
          if (c === Iu && d > 0) {
            if (o.ranges > 0) {
              o.ranges = 0
              let v = o.nodes.shift()
              o.nodes = [v, { type: 'text', value: qu(o) }]
            }
            A({ type: 'comma', value: c }), o.commas++
            continue
          }
          if (c === Bu && d > 0 && o.commas === 0) {
            let v = o.nodes
            if (d === 0 || v.length === 0) {
              A({ type: 'text', value: c })
              continue
            }
            if (a.type === 'dot') {
              if (((o.range = []), (a.value += c), (a.type = 'range'), o.nodes.length !== 3 && o.nodes.length !== 5)) {
                ;(o.invalid = !0), (o.ranges = 0), (a.type = 'text')
                continue
              }
              o.ranges++, (o.args = [])
              continue
            }
            if (a.type === 'range') {
              v.pop()
              let x = v[v.length - 1]
              ;(x.value += a.value + c), (a = x), o.ranges--
              continue
            }
            A({ type: 'dot', value: c })
            continue
          }
          A({ type: 'text', value: c })
        }
      do
        if (((o = i.pop()), o.type !== 'root')) {
          o.nodes.forEach((M) => {
            M.nodes ||
              (M.type === 'open' && (M.isOpen = !0),
              M.type === 'close' && (M.isClose = !0),
              M.nodes || (M.type = 'text'),
              (M.invalid = !0))
          })
          let v = i[i.length - 1],
            x = v.nodes.indexOf(o)
          v.nodes.splice(x, 1, ...o.nodes)
        }
      while (i.length > 0)
      return A({ type: 'eos' }), s
    }
  Es.exports = Xu
})
var Cs = S((Dp, xs) => {
  'use strict'
  var ws = Qe(),
    Zu = ds(),
    zu = ys(),
    Ju = Rs(),
    X = (e, t = {}) => {
      let r = []
      if (Array.isArray(e))
        for (let n of e) {
          let s = X.create(n, t)
          Array.isArray(s) ? r.push(...s) : r.push(s)
        }
      else r = [].concat(X.create(e, t))
      return t && t.expand === !0 && t.nodupes === !0 && (r = [...new Set(r)]), r
    }
  X.parse = (e, t = {}) => Ju(e, t)
  X.stringify = (e, t = {}) => (typeof e == 'string' ? ws(X.parse(e, t), t) : ws(e, t))
  X.compile = (e, t = {}) => (typeof e == 'string' && (e = X.parse(e, t)), Zu(e, t))
  X.expand = (e, t = {}) => {
    typeof e == 'string' && (e = X.parse(e, t))
    let r = zu(e, t)
    return t.noempty === !0 && (r = r.filter(Boolean)), t.nodupes === !0 && (r = [...new Set(r)]), r
  }
  X.create = (e, t = {}) => (e === '' || e.length < 3 ? [e] : t.expand !== !0 ? X.compile(e, t) : X.expand(e, t))
  xs.exports = X
})
var qe = S((qp, Ps) => {
  'use strict'
  var ec = require('path'),
    ie = '\\\\/',
    Ts = `[^${ie}]`,
    fe = '\\.',
    tc = '\\+',
    rc = '\\?',
    Ze = '\\/',
    nc = '(?=.)',
    Os = '[^/]',
    Nt = `(?:${Ze}|$)`,
    Ls = `(?:^|${Ze})`,
    Dt = `${fe}{1,2}${Nt}`,
    sc = `(?!${fe})`,
    ic = `(?!${Ls}${Dt})`,
    oc = `(?!${fe}{0,1}${Nt})`,
    ac = `(?!${Dt})`,
    uc = `[^.${Ze}]`,
    cc = `${Os}*?`,
    ks = {
      DOT_LITERAL: fe,
      PLUS_LITERAL: tc,
      QMARK_LITERAL: rc,
      SLASH_LITERAL: Ze,
      ONE_CHAR: nc,
      QMARK: Os,
      END_ANCHOR: Nt,
      DOTS_SLASH: Dt,
      NO_DOT: sc,
      NO_DOTS: ic,
      NO_DOT_SLASH: oc,
      NO_DOTS_SLASH: ac,
      QMARK_NO_DOT: uc,
      STAR: cc,
      START_ANCHOR: Ls,
    },
    lc = {
      ...ks,
      SLASH_LITERAL: `[${ie}]`,
      QMARK: Ts,
      STAR: `${Ts}*?`,
      DOTS_SLASH: `${fe}{1,2}(?:[${ie}]|$)`,
      NO_DOT: `(?!${fe})`,
      NO_DOTS: `(?!(?:^|[${ie}])${fe}{1,2}(?:[${ie}]|$))`,
      NO_DOT_SLASH: `(?!${fe}{0,1}(?:[${ie}]|$))`,
      NO_DOTS_SLASH: `(?!${fe}{1,2}(?:[${ie}]|$))`,
      QMARK_NO_DOT: `[^.${ie}]`,
      START_ANCHOR: `(?:^|[${ie}])`,
      END_ANCHOR: `(?:[${ie}]|$)`,
    },
    fc = {
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
  Ps.exports = {
    MAX_LENGTH: 1024 * 64,
    POSIX_REGEX_SOURCE: fc,
    REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
    REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
    REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
    REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
    REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
    REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
    REPLACEMENTS: { '***': '*', '**/**': '**', '**/**/**': '**' },
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
    SEP: ec.sep,
    extglobChars(e) {
      return {
        '!': { type: 'negate', open: '(?:(?!(?:', close: `))${e.STAR})` },
        '?': { type: 'qmark', open: '(?:', close: ')?' },
        '+': { type: 'plus', open: '(?:', close: ')+' },
        '*': { type: 'star', open: '(?:', close: ')*' },
        '@': { type: 'at', open: '(?:', close: ')' },
      }
    },
    globChars(e) {
      return e === !0 ? lc : ks
    },
  }
})
var Fe = S((Q) => {
  'use strict'
  var pc = require('path'),
    hc = process.platform === 'win32',
    { REGEX_BACKSLASH: dc, REGEX_REMOVE_BACKSLASH: _c, REGEX_SPECIAL_CHARS: gc, REGEX_SPECIAL_CHARS_GLOBAL: yc } = qe()
  Q.isObject = (e) => e !== null && typeof e == 'object' && !Array.isArray(e)
  Q.hasRegexChars = (e) => gc.test(e)
  Q.isRegexChar = (e) => e.length === 1 && Q.hasRegexChars(e)
  Q.escapeRegex = (e) => e.replace(yc, '\\$1')
  Q.toPosixSlashes = (e) => e.replace(dc, '/')
  Q.removeBackslashes = (e) => e.replace(_c, (t) => (t === '\\' ? '' : t))
  Q.supportsLookbehinds = () => {
    let e = process.version.slice(1).split('.').map(Number)
    return (e.length === 3 && e[0] >= 9) || (e[0] === 8 && e[1] >= 10)
  }
  Q.isWindows = (e) => (e && typeof e.windows == 'boolean' ? e.windows : hc === !0 || pc.sep === '\\')
  Q.escapeLast = (e, t, r) => {
    let n = e.lastIndexOf(t, r)
    return n === -1 ? e : e[n - 1] === '\\' ? Q.escapeLast(e, t, n - 1) : `${e.slice(0, n)}\\${e.slice(n)}`
  }
  Q.removePrefix = (e, t = {}) => {
    let r = e
    return r.startsWith('./') && ((r = r.slice(2)), (t.prefix = './')), r
  }
  Q.wrapOutput = (e, t = {}, r = {}) => {
    let n = r.contains ? '' : '^',
      s = r.contains ? '' : '$',
      i = `${n}(?:${e})${s}`
    return t.negated === !0 && (i = `(?:^(?!${i}).*$)`), i
  }
})
var Bs = S((Ip, Hs) => {
  'use strict'
  var $s = Fe(),
    {
      CHAR_ASTERISK: qt,
      CHAR_AT: mc,
      CHAR_BACKWARD_SLASH: Ie,
      CHAR_COMMA: Sc,
      CHAR_DOT: Ft,
      CHAR_EXCLAMATION_MARK: Ms,
      CHAR_FORWARD_SLASH: Ns,
      CHAR_LEFT_CURLY_BRACE: It,
      CHAR_LEFT_PARENTHESES: Bt,
      CHAR_LEFT_SQUARE_BRACKET: Ec,
      CHAR_PLUS: bc,
      CHAR_QUESTION_MARK: Ds,
      CHAR_RIGHT_CURLY_BRACE: Ac,
      CHAR_RIGHT_PARENTHESES: qs,
      CHAR_RIGHT_SQUARE_BRACKET: vc,
    } = qe(),
    Fs = (e) => e === Ns || e === Ie,
    Is = (e) => {
      e.isPrefix !== !0 && (e.depth = e.isGlobstar ? Infinity : 1)
    },
    Rc = (e, t) => {
      let r = t || {},
        n = e.length - 1,
        s = r.parts === !0 || r.scanToEnd === !0,
        i = [],
        o = [],
        a = [],
        u = e,
        _ = -1,
        l = 0,
        d = 0,
        c = !1,
        C = !1,
        m = !1,
        A = !1,
        v = !1,
        x = !1,
        M = !1,
        T = !1,
        R = !1,
        w = 0,
        H,
        g,
        O = { value: '', depth: 0, isGlob: !1 },
        N = () => _ >= n,
        Y = () => u.charCodeAt(_ + 1),
        h = () => ((H = g), u.charCodeAt(++_))
      for (; _ < n; ) {
        g = h()
        let f
        if (g === Ie) {
          ;(M = O.backslashes = !0), (g = h()), g === It && (x = !0)
          continue
        }
        if (x === !0 || g === It) {
          for (w++; N() !== !0 && (g = h()); ) {
            if (g === Ie) {
              ;(M = O.backslashes = !0), h()
              continue
            }
            if (g === It) {
              w++
              continue
            }
            if (x !== !0 && g === Ft && (g = h()) === Ft) {
              if (((c = O.isBrace = !0), (m = O.isGlob = !0), (R = !0), s === !0)) continue
              break
            }
            if (x !== !0 && g === Sc) {
              if (((c = O.isBrace = !0), (m = O.isGlob = !0), (R = !0), s === !0)) continue
              break
            }
            if (g === Ac && (w--, w === 0)) {
              ;(x = !1), (c = O.isBrace = !0), (R = !0)
              break
            }
          }
          if (s === !0) continue
          break
        }
        if (g === Ns) {
          if ((i.push(_), o.push(O), (O = { value: '', depth: 0, isGlob: !1 }), R === !0)) continue
          if (H === Ft && _ === l + 1) {
            l += 2
            continue
          }
          d = _ + 1
          continue
        }
        if (r.noext !== !0 && (g === bc || g === mc || g === qt || g === Ds || g === Ms) === !0 && Y() === Bt) {
          if (((m = O.isGlob = !0), (A = O.isExtglob = !0), (R = !0), s === !0)) {
            for (; N() !== !0 && (g = h()); ) {
              if (g === Ie) {
                ;(M = O.backslashes = !0), (g = h())
                continue
              }
              if (g === qs) {
                ;(m = O.isGlob = !0), (R = !0)
                break
              }
            }
            continue
          }
          break
        }
        if (g === qt) {
          if ((H === qt && (v = O.isGlobstar = !0), (m = O.isGlob = !0), (R = !0), s === !0)) continue
          break
        }
        if (g === Ds) {
          if (((m = O.isGlob = !0), (R = !0), s === !0)) continue
          break
        }
        if (g === Ec)
          for (; N() !== !0 && (f = h()); ) {
            if (f === Ie) {
              ;(M = O.backslashes = !0), h()
              continue
            }
            if (f === vc) {
              if (((C = O.isBracket = !0), (m = O.isGlob = !0), (R = !0), s === !0)) continue
              break
            }
          }
        if (r.nonegate !== !0 && g === Ms && _ === l) {
          ;(T = O.negated = !0), l++
          continue
        }
        if (r.noparen !== !0 && g === Bt) {
          if (((m = O.isGlob = !0), s === !0)) {
            for (; N() !== !0 && (g = h()); ) {
              if (g === Bt) {
                ;(M = O.backslashes = !0), (g = h())
                continue
              }
              if (g === qs) {
                R = !0
                break
              }
            }
            continue
          }
          break
        }
        if (m === !0) {
          if (((R = !0), s === !0)) continue
          break
        }
      }
      r.noext === !0 && ((A = !1), (m = !1))
      let D = u,
        z = '',
        ee = ''
      l > 0 && ((z = u.slice(0, l)), (u = u.slice(l)), (d -= l)),
        D && m === !0 && d > 0 ? ((D = u.slice(0, d)), (ee = u.slice(d))) : m === !0 ? ((D = ''), (ee = u)) : (D = u),
        D && D !== '' && D !== '/' && D !== u && Fs(D.charCodeAt(D.length - 1)) && (D = D.slice(0, -1)),
        r.unescape === !0 && (ee && (ee = $s.removeBackslashes(ee)), D && M === !0 && (D = $s.removeBackslashes(D)))
      let p = {
        prefix: z,
        input: e,
        start: l,
        base: D,
        glob: ee,
        isBrace: c,
        isBracket: C,
        isGlob: m,
        isExtglob: A,
        isGlobstar: v,
        negated: T,
      }
      if (
        (r.tokens === !0 && ((p.maxDepth = 0), Fs(g) || o.push(O), (p.tokens = o)), r.parts === !0 || r.tokens === !0)
      ) {
        let f
        for (let j = 0; j < i.length; j++) {
          let G = f ? f + 1 : l,
            te = i[j],
            ne = e.slice(G, te)
          r.tokens &&
            (j === 0 && l !== 0 ? ((o[j].isPrefix = !0), (o[j].value = z)) : (o[j].value = ne),
            Is(o[j]),
            (p.maxDepth += o[j].depth)),
            (j !== 0 || ne !== '') && a.push(ne),
            (f = te)
        }
        if (f && f + 1 < e.length) {
          let j = e.slice(f + 1)
          a.push(j),
            r.tokens && ((o[o.length - 1].value = j), Is(o[o.length - 1]), (p.maxDepth += o[o.length - 1].depth))
        }
        ;(p.slashes = i), (p.parts = a)
      }
      return p
    }
  Hs.exports = Rc
})
var Ws = S((Bp, js) => {
  'use strict'
  var ze = qe(),
    Z = Fe(),
    {
      MAX_LENGTH: Je,
      POSIX_REGEX_SOURCE: xc,
      REGEX_NON_SPECIAL_CHARS: wc,
      REGEX_SPECIAL_CHARS_BACKREF: Cc,
      REPLACEMENTS: Gs,
    } = ze,
    Pc = (e, t) => {
      if (typeof t.expandRange == 'function') return t.expandRange(...e, t)
      e.sort()
      let r = `[${e.join('-')}]`
      try {
        new RegExp(r)
      } catch (n) {
        return e.map((s) => Z.escapeRegex(s)).join('..')
      }
      return r
    },
    Te = (e, t) => `Missing ${e}: "${t}" - use "\\\\${t}" to match literal characters`,
    Us = (e, t) => {
      if (typeof e != 'string') throw new TypeError('Expected a string')
      e = Gs[e] || e
      let r = { ...t },
        n = typeof r.maxLength == 'number' ? Math.min(Je, r.maxLength) : Je,
        s = e.length
      if (s > n) throw new SyntaxError(`Input length: ${s}, exceeds maximum allowed length: ${n}`)
      let i = { type: 'bos', value: '', output: r.prepend || '' },
        o = [i],
        a = r.capture ? '' : '?:',
        u = Z.isWindows(t),
        _ = ze.globChars(u),
        l = ze.extglobChars(_),
        {
          DOT_LITERAL: d,
          PLUS_LITERAL: c,
          SLASH_LITERAL: C,
          ONE_CHAR: m,
          DOTS_SLASH: A,
          NO_DOT: v,
          NO_DOT_SLASH: x,
          NO_DOTS_SLASH: M,
          QMARK: T,
          QMARK_NO_DOT: R,
          STAR: w,
          START_ANCHOR: H,
        } = _,
        g = (b) => `(${a}(?:(?!${H}${b.dot ? A : d}).)*?)`,
        O = r.dot ? '' : v,
        N = r.dot ? T : R,
        Y = r.bash === !0 ? g(r) : w
      r.capture && (Y = `(${Y})`), typeof r.noext == 'boolean' && (r.noextglob = r.noext)
      let h = {
        input: e,
        index: -1,
        start: 0,
        dot: r.dot === !0,
        consumed: '',
        output: '',
        prefix: '',
        backtrack: !1,
        negated: !1,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: !1,
        tokens: o,
      }
      ;(e = Z.removePrefix(e, h)), (s = e.length)
      let D = [],
        z = [],
        ee = [],
        p = i,
        f,
        j = () => h.index === s - 1,
        G = (h.peek = (b = 1) => e[h.index + b]),
        te = (h.advance = () => e[++h.index]),
        ne = () => e.slice(h.index + 1),
        le = (b = '', q = 0) => {
          ;(h.consumed += b), (h.index += q)
        },
        Be = (b) => {
          ;(h.output += b.output != null ? b.output : b.value), le(b.value)
        },
        ia = () => {
          let b = 1
          for (; G() === '!' && (G(2) !== '(' || G(3) === '?'); ) te(), h.start++, b++
          return b % 2 == 0 ? !1 : ((h.negated = !0), h.start++, !0)
        },
        je = (b) => {
          h[b]++, ee.push(b)
        },
        Ee = (b) => {
          h[b]--, ee.pop()
        },
        k = (b) => {
          if (p.type === 'globstar') {
            let q = h.braces > 0 && (b.type === 'comma' || b.type === 'brace'),
              E = b.extglob === !0 || (D.length && (b.type === 'pipe' || b.type === 'paren'))
            b.type !== 'slash' &&
              b.type !== 'paren' &&
              !q &&
              !E &&
              ((h.output = h.output.slice(0, -p.output.length)),
              (p.type = 'star'),
              (p.value = '*'),
              (p.output = Y),
              (h.output += p.output))
          }
          if (
            (D.length && b.type !== 'paren' && !l[b.value] && (D[D.length - 1].inner += b.value),
            (b.value || b.output) && Be(b),
            p && p.type === 'text' && b.type === 'text')
          ) {
            ;(p.value += b.value), (p.output = (p.output || '') + b.value)
            return
          }
          ;(b.prev = p), o.push(b), (p = b)
        },
        Ge = (b, q) => {
          let E = { ...l[q], conditions: 1, inner: '' }
          ;(E.prev = p), (E.parens = h.parens), (E.output = h.output)
          let $ = (r.capture ? '(' : '') + E.open
          je('parens'),
            k({ type: b, value: q, output: h.output ? '' : m }),
            k({ type: 'paren', extglob: !0, value: te(), output: $ }),
            D.push(E)
        },
        oa = (b) => {
          let q = b.close + (r.capture ? ')' : '')
          if (b.type === 'negate') {
            let E = Y
            b.inner && b.inner.length > 1 && b.inner.includes('/') && (E = g(r)),
              (E !== Y || j() || /^\)+$/.test(ne())) && (q = b.close = `)$))${E}`),
              b.prev.type === 'bos' && j() && (h.negatedExtglob = !0)
          }
          k({ type: 'paren', extglob: !0, value: f, output: q }), Ee('parens')
        }
      if (r.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(e)) {
        let b = !1,
          q = e.replace(Cc, (E, $, I, V, U, St) =>
            V === '\\'
              ? ((b = !0), E)
              : V === '?'
              ? $
                ? $ + V + (U ? T.repeat(U.length) : '')
                : St === 0
                ? N + (U ? T.repeat(U.length) : '')
                : T.repeat(I.length)
              : V === '.'
              ? d.repeat(I.length)
              : V === '*'
              ? $
                ? $ + V + (U ? Y : '')
                : Y
              : $
              ? E
              : `\\${E}`,
          )
        return (
          b === !0 &&
            (r.unescape === !0
              ? (q = q.replace(/\\/g, ''))
              : (q = q.replace(/\\+/g, (E) => (E.length % 2 == 0 ? '\\\\' : E ? '\\' : '')))),
          q === e && r.contains === !0 ? ((h.output = e), h) : ((h.output = Z.wrapOutput(q, h, t)), h)
        )
      }
      for (; !j(); ) {
        if (((f = te()), f === '\0')) continue
        if (f === '\\') {
          let E = G()
          if ((E === '/' && r.bash !== !0) || E === '.' || E === ';') continue
          if (!E) {
            ;(f += '\\'), k({ type: 'text', value: f })
            continue
          }
          let $ = /^\\+/.exec(ne()),
            I = 0
          if (
            ($ && $[0].length > 2 && ((I = $[0].length), (h.index += I), I % 2 != 0 && (f += '\\')),
            r.unescape === !0 ? (f = te() || '') : (f += te() || ''),
            h.brackets === 0)
          ) {
            k({ type: 'text', value: f })
            continue
          }
        }
        if (h.brackets > 0 && (f !== ']' || p.value === '[' || p.value === '[^')) {
          if (r.posix !== !1 && f === ':') {
            let E = p.value.slice(1)
            if (E.includes('[') && ((p.posix = !0), E.includes(':'))) {
              let $ = p.value.lastIndexOf('['),
                I = p.value.slice(0, $),
                V = p.value.slice($ + 2),
                U = xc[V]
              if (U) {
                ;(p.value = I + U), (h.backtrack = !0), te(), !i.output && o.indexOf(p) === 1 && (i.output = m)
                continue
              }
            }
          }
          ;((f === '[' && G() !== ':') || (f === '-' && G() === ']')) && (f = `\\${f}`),
            f === ']' && (p.value === '[' || p.value === '[^') && (f = `\\${f}`),
            r.posix === !0 && f === '!' && p.value === '[' && (f = '^'),
            (p.value += f),
            Be({ value: f })
          continue
        }
        if (h.quotes === 1 && f !== '"') {
          ;(f = Z.escapeRegex(f)), (p.value += f), Be({ value: f })
          continue
        }
        if (f === '"') {
          ;(h.quotes = h.quotes === 1 ? 0 : 1), r.keepQuotes === !0 && k({ type: 'text', value: f })
          continue
        }
        if (f === '(') {
          je('parens'), k({ type: 'paren', value: f })
          continue
        }
        if (f === ')') {
          if (h.parens === 0 && r.strictBrackets === !0) throw new SyntaxError(Te('opening', '('))
          let E = D[D.length - 1]
          if (E && h.parens === E.parens + 1) {
            oa(D.pop())
            continue
          }
          k({ type: 'paren', value: f, output: h.parens ? ')' : '\\)' }), Ee('parens')
          continue
        }
        if (f === '[') {
          if (r.nobracket === !0 || !ne().includes(']')) {
            if (r.nobracket !== !0 && r.strictBrackets === !0) throw new SyntaxError(Te('closing', ']'))
            f = `\\${f}`
          } else je('brackets')
          k({ type: 'bracket', value: f })
          continue
        }
        if (f === ']') {
          if (r.nobracket === !0 || (p && p.type === 'bracket' && p.value.length === 1)) {
            k({ type: 'text', value: f, output: `\\${f}` })
            continue
          }
          if (h.brackets === 0) {
            if (r.strictBrackets === !0) throw new SyntaxError(Te('opening', '['))
            k({ type: 'text', value: f, output: `\\${f}` })
            continue
          }
          Ee('brackets')
          let E = p.value.slice(1)
          if (
            (p.posix !== !0 && E[0] === '^' && !E.includes('/') && (f = `/${f}`),
            (p.value += f),
            Be({ value: f }),
            r.literalBrackets === !1 || Z.hasRegexChars(E))
          )
            continue
          let $ = Z.escapeRegex(p.value)
          if (((h.output = h.output.slice(0, -p.value.length)), r.literalBrackets === !0)) {
            ;(h.output += $), (p.value = $)
            continue
          }
          ;(p.value = `(${a}${$}|${p.value})`), (h.output += p.value)
          continue
        }
        if (f === '{' && r.nobrace !== !0) {
          je('braces')
          let E = { type: 'brace', value: f, output: '(', outputIndex: h.output.length, tokensIndex: h.tokens.length }
          z.push(E), k(E)
          continue
        }
        if (f === '}') {
          let E = z[z.length - 1]
          if (r.nobrace === !0 || !E) {
            k({ type: 'text', value: f, output: f })
            continue
          }
          let $ = ')'
          if (E.dots === !0) {
            let I = o.slice(),
              V = []
            for (let U = I.length - 1; U >= 0 && (o.pop(), I[U].type !== 'brace'); U--)
              I[U].type !== 'dots' && V.unshift(I[U].value)
            ;($ = Pc(V, r)), (h.backtrack = !0)
          }
          if (E.comma !== !0 && E.dots !== !0) {
            let I = h.output.slice(0, E.outputIndex),
              V = h.tokens.slice(E.tokensIndex)
            ;(E.value = E.output = '\\{'), (f = $ = '\\}'), (h.output = I)
            for (let U of V) h.output += U.output || U.value
          }
          k({ type: 'brace', value: f, output: $ }), Ee('braces'), z.pop()
          continue
        }
        if (f === '|') {
          D.length > 0 && D[D.length - 1].conditions++, k({ type: 'text', value: f })
          continue
        }
        if (f === ',') {
          let E = f,
            $ = z[z.length - 1]
          $ && ee[ee.length - 1] === 'braces' && (($.comma = !0), (E = '|')), k({ type: 'comma', value: f, output: E })
          continue
        }
        if (f === '/') {
          if (p.type === 'dot' && h.index === h.start + 1) {
            ;(h.start = h.index + 1), (h.consumed = ''), (h.output = ''), o.pop(), (p = i)
            continue
          }
          k({ type: 'slash', value: f, output: C })
          continue
        }
        if (f === '.') {
          if (h.braces > 0 && p.type === 'dot') {
            p.value === '.' && (p.output = d)
            let E = z[z.length - 1]
            ;(p.type = 'dots'), (p.output += f), (p.value += f), (E.dots = !0)
            continue
          }
          if (h.braces + h.parens === 0 && p.type !== 'bos' && p.type !== 'slash') {
            k({ type: 'text', value: f, output: d })
            continue
          }
          k({ type: 'dot', value: f, output: d })
          continue
        }
        if (f === '?') {
          if (!(p && p.value === '(') && r.noextglob !== !0 && G() === '(' && G(2) !== '?') {
            Ge('qmark', f)
            continue
          }
          if (p && p.type === 'paren') {
            let $ = G(),
              I = f
            if ($ === '<' && !Z.supportsLookbehinds())
              throw new Error('Node.js v10 or higher is required for regex lookbehinds')
            ;((p.value === '(' && !/[!=<:]/.test($)) || ($ === '<' && !/<([!=]|\w+>)/.test(ne()))) && (I = `\\${f}`),
              k({ type: 'text', value: f, output: I })
            continue
          }
          if (r.dot !== !0 && (p.type === 'slash' || p.type === 'bos')) {
            k({ type: 'qmark', value: f, output: R })
            continue
          }
          k({ type: 'qmark', value: f, output: T })
          continue
        }
        if (f === '!') {
          if (r.noextglob !== !0 && G() === '(' && (G(2) !== '?' || !/[!=<:]/.test(G(3)))) {
            Ge('negate', f)
            continue
          }
          if (r.nonegate !== !0 && h.index === 0) {
            ia()
            continue
          }
        }
        if (f === '+') {
          if (r.noextglob !== !0 && G() === '(' && G(2) !== '?') {
            Ge('plus', f)
            continue
          }
          if ((p && p.value === '(') || r.regex === !1) {
            k({ type: 'plus', value: f, output: c })
            continue
          }
          if ((p && (p.type === 'bracket' || p.type === 'paren' || p.type === 'brace')) || h.parens > 0) {
            k({ type: 'plus', value: f })
            continue
          }
          k({ type: 'plus', value: c })
          continue
        }
        if (f === '@') {
          if (r.noextglob !== !0 && G() === '(' && G(2) !== '?') {
            k({ type: 'at', extglob: !0, value: f, output: '' })
            continue
          }
          k({ type: 'text', value: f })
          continue
        }
        if (f !== '*') {
          ;(f === '$' || f === '^') && (f = `\\${f}`)
          let E = wc.exec(ne())
          E && ((f += E[0]), (h.index += E[0].length)), k({ type: 'text', value: f })
          continue
        }
        if (p && (p.type === 'globstar' || p.star === !0)) {
          ;(p.type = 'star'),
            (p.star = !0),
            (p.value += f),
            (p.output = Y),
            (h.backtrack = !0),
            (h.globstar = !0),
            le(f)
          continue
        }
        let b = ne()
        if (r.noextglob !== !0 && /^\([^?]/.test(b)) {
          Ge('star', f)
          continue
        }
        if (p.type === 'star') {
          if (r.noglobstar === !0) {
            le(f)
            continue
          }
          let E = p.prev,
            $ = E.prev,
            I = E.type === 'slash' || E.type === 'bos',
            V = $ && ($.type === 'star' || $.type === 'globstar')
          if (r.bash === !0 && (!I || (b[0] && b[0] !== '/'))) {
            k({ type: 'star', value: f, output: '' })
            continue
          }
          let U = h.braces > 0 && (E.type === 'comma' || E.type === 'brace'),
            St = D.length && (E.type === 'pipe' || E.type === 'paren')
          if (!I && E.type !== 'paren' && !U && !St) {
            k({ type: 'star', value: f, output: '' })
            continue
          }
          for (; b.slice(0, 3) === '/**'; ) {
            let Ue = e[h.index + 4]
            if (Ue && Ue !== '/') break
            ;(b = b.slice(3)), le('/**', 3)
          }
          if (E.type === 'bos' && j()) {
            ;(p.type = 'globstar'), (p.value += f), (p.output = g(r)), (h.output = p.output), (h.globstar = !0), le(f)
            continue
          }
          if (E.type === 'slash' && E.prev.type !== 'bos' && !V && j()) {
            ;(h.output = h.output.slice(0, -(E.output + p.output).length)),
              (E.output = `(?:${E.output}`),
              (p.type = 'globstar'),
              (p.output = g(r) + (r.strictSlashes ? ')' : '|$)')),
              (p.value += f),
              (h.globstar = !0),
              (h.output += E.output + p.output),
              le(f)
            continue
          }
          if (E.type === 'slash' && E.prev.type !== 'bos' && b[0] === '/') {
            let Ue = b[1] !== void 0 ? '|$' : ''
            ;(h.output = h.output.slice(0, -(E.output + p.output).length)),
              (E.output = `(?:${E.output}`),
              (p.type = 'globstar'),
              (p.output = `${g(r)}${C}|${C}${Ue})`),
              (p.value += f),
              (h.output += E.output + p.output),
              (h.globstar = !0),
              le(f + te()),
              k({ type: 'slash', value: '/', output: '' })
            continue
          }
          if (E.type === 'bos' && b[0] === '/') {
            ;(p.type = 'globstar'),
              (p.value += f),
              (p.output = `(?:^|${C}|${g(r)}${C})`),
              (h.output = p.output),
              (h.globstar = !0),
              le(f + te()),
              k({ type: 'slash', value: '/', output: '' })
            continue
          }
          ;(h.output = h.output.slice(0, -p.output.length)),
            (p.type = 'globstar'),
            (p.output = g(r)),
            (p.value += f),
            (h.output += p.output),
            (h.globstar = !0),
            le(f)
          continue
        }
        let q = { type: 'star', value: f, output: Y }
        if (r.bash === !0) {
          ;(q.output = '.*?'), (p.type === 'bos' || p.type === 'slash') && (q.output = O + q.output), k(q)
          continue
        }
        if (p && (p.type === 'bracket' || p.type === 'paren') && r.regex === !0) {
          ;(q.output = f), k(q)
          continue
        }
        ;(h.index === h.start || p.type === 'slash' || p.type === 'dot') &&
          (p.type === 'dot'
            ? ((h.output += x), (p.output += x))
            : r.dot === !0
            ? ((h.output += M), (p.output += M))
            : ((h.output += O), (p.output += O)),
          G() !== '*' && ((h.output += m), (p.output += m))),
          k(q)
      }
      for (; h.brackets > 0; ) {
        if (r.strictBrackets === !0) throw new SyntaxError(Te('closing', ']'))
        ;(h.output = Z.escapeLast(h.output, '[')), Ee('brackets')
      }
      for (; h.parens > 0; ) {
        if (r.strictBrackets === !0) throw new SyntaxError(Te('closing', ')'))
        ;(h.output = Z.escapeLast(h.output, '(')), Ee('parens')
      }
      for (; h.braces > 0; ) {
        if (r.strictBrackets === !0) throw new SyntaxError(Te('closing', '}'))
        ;(h.output = Z.escapeLast(h.output, '{')), Ee('braces')
      }
      if (
        (r.strictSlashes !== !0 &&
          (p.type === 'star' || p.type === 'bracket') &&
          k({ type: 'maybe_slash', value: '', output: `${C}?` }),
        h.backtrack === !0)
      ) {
        h.output = ''
        for (let b of h.tokens) (h.output += b.output != null ? b.output : b.value), b.suffix && (h.output += b.suffix)
      }
      return h
    }
  Us.fastpaths = (e, t) => {
    let r = { ...t },
      n = typeof r.maxLength == 'number' ? Math.min(Je, r.maxLength) : Je,
      s = e.length
    if (s > n) throw new SyntaxError(`Input length: ${s}, exceeds maximum allowed length: ${n}`)
    e = Gs[e] || e
    let i = Z.isWindows(t),
      {
        DOT_LITERAL: o,
        SLASH_LITERAL: a,
        ONE_CHAR: u,
        DOTS_SLASH: _,
        NO_DOT: l,
        NO_DOTS: d,
        NO_DOTS_SLASH: c,
        STAR: C,
        START_ANCHOR: m,
      } = ze.globChars(i),
      A = r.dot ? d : l,
      v = r.dot ? c : l,
      x = r.capture ? '' : '?:',
      M = { negated: !1, prefix: '' },
      T = r.bash === !0 ? '.*?' : C
    r.capture && (T = `(${T})`)
    let R = (O) => (O.noglobstar === !0 ? T : `(${x}(?:(?!${m}${O.dot ? _ : o}).)*?)`),
      w = (O) => {
        switch (O) {
          case '*':
            return `${A}${u}${T}`
          case '.*':
            return `${o}${u}${T}`
          case '*.*':
            return `${A}${T}${o}${u}${T}`
          case '*/*':
            return `${A}${T}${a}${u}${v}${T}`
          case '**':
            return A + R(r)
          case '**/*':
            return `(?:${A}${R(r)}${a})?${v}${u}${T}`
          case '**/*.*':
            return `(?:${A}${R(r)}${a})?${v}${T}${o}${u}${T}`
          case '**/.*':
            return `(?:${A}${R(r)}${a})?${o}${u}${T}`
          default: {
            let N = /^(.*?)\.(\w+)$/.exec(O)
            if (!N) return
            let Y = w(N[1])
            return Y ? Y + o + N[2] : void 0
          }
        }
      },
      H = Z.removePrefix(e, M),
      g = w(H)
    return g && r.strictSlashes !== !0 && (g += `${a}?`), g
  }
  js.exports = Us
})
var Vs = S((jp, Ks) => {
  'use strict'
  var Tc = require('path'),
    Oc = Bs(),
    jt = Ws(),
    Gt = Fe(),
    Lc = qe(),
    kc = (e) => e && typeof e == 'object' && !Array.isArray(e),
    B = (e, t, r = !1) => {
      if (Array.isArray(e)) {
        let l = e.map((c) => B(c, t, r))
        return (c) => {
          for (let C of l) {
            let m = C(c)
            if (m) return m
          }
          return !1
        }
      }
      let n = kc(e) && e.tokens && e.input
      if (e === '' || (typeof e != 'string' && !n)) throw new TypeError('Expected pattern to be a non-empty string')
      let s = t || {},
        i = Gt.isWindows(t),
        o = n ? B.compileRe(e, t) : B.makeRe(e, t, !1, !0),
        a = o.state
      delete o.state
      let u = () => !1
      if (s.ignore) {
        let l = { ...t, ignore: null, onMatch: null, onResult: null }
        u = B(s.ignore, l, r)
      }
      let _ = (l, d = !1) => {
        let { isMatch: c, match: C, output: m } = B.test(l, o, t, { glob: e, posix: i }),
          A = { glob: e, state: a, regex: o, posix: i, input: l, output: m, match: C, isMatch: c }
        return (
          typeof s.onResult == 'function' && s.onResult(A),
          c === !1
            ? ((A.isMatch = !1), d ? A : !1)
            : u(l)
            ? (typeof s.onIgnore == 'function' && s.onIgnore(A), (A.isMatch = !1), d ? A : !1)
            : (typeof s.onMatch == 'function' && s.onMatch(A), d ? A : !0)
        )
      }
      return r && (_.state = a), _
    }
  B.test = (e, t, r, { glob: n, posix: s } = {}) => {
    if (typeof e != 'string') throw new TypeError('Expected input to be a string')
    if (e === '') return { isMatch: !1, output: '' }
    let i = r || {},
      o = i.format || (s ? Gt.toPosixSlashes : null),
      a = e === n,
      u = a && o ? o(e) : e
    return (
      a === !1 && ((u = o ? o(e) : e), (a = u === n)),
      (a === !1 || i.capture === !0) &&
        (i.matchBase === !0 || i.basename === !0 ? (a = B.matchBase(e, t, r, s)) : (a = t.exec(u))),
      { isMatch: Boolean(a), match: a, output: u }
    )
  }
  B.matchBase = (e, t, r, n = Gt.isWindows(r)) => (t instanceof RegExp ? t : B.makeRe(t, r)).test(Tc.basename(e))
  B.isMatch = (e, t, r) => B(t, r)(e)
  B.parse = (e, t) => (Array.isArray(e) ? e.map((r) => B.parse(r, t)) : jt(e, { ...t, fastpaths: !1 }))
  B.scan = (e, t) => Oc(e, t)
  B.compileRe = (e, t, r = !1, n = !1) => {
    if (r === !0) return e.output
    let s = t || {},
      i = s.contains ? '' : '^',
      o = s.contains ? '' : '$',
      a = `${i}(?:${e.output})${o}`
    e && e.negated === !0 && (a = `^(?!${a}).*$`)
    let u = B.toRegex(a, t)
    return n === !0 && (u.state = e), u
  }
  B.makeRe = (e, t, r = !1, n = !1) => {
    if (!e || typeof e != 'string') throw new TypeError('Expected a non-empty string')
    let s = t || {},
      i = { negated: !1, fastpaths: !0 },
      o = '',
      a
    return (
      e.startsWith('./') && ((e = e.slice(2)), (o = i.prefix = './')),
      s.fastpaths !== !1 && (e[0] === '.' || e[0] === '*') && (a = jt.fastpaths(e, t)),
      a === void 0 ? ((i = jt(e, t)), (i.prefix = o + (i.prefix || ''))) : (i.output = a),
      B.compileRe(i, t, r, n)
    )
  }
  B.toRegex = (e, t) => {
    try {
      let r = t || {}
      return new RegExp(e, r.flags || (r.nocase ? 'i' : ''))
    } catch (r) {
      if (t && t.debug === !0) throw r
      return /$^/
    }
  }
  B.constants = Lc
  Ks.exports = B
})
var Ut = S((Gp, Ys) => {
  'use strict'
  Ys.exports = Vs()
})
var Js = S((Up, Qs) => {
  'use strict'
  var Xs = require('util'),
    Zs = Cs(),
    oe = Ut(),
    Wt = Fe(),
    zs = (e) => typeof e == 'string' && (e === '' || e === './'),
    F = (e, t, r) => {
      ;(t = [].concat(t)), (e = [].concat(e))
      let n = new Set(),
        s = new Set(),
        i = new Set(),
        o = 0,
        a = (l) => {
          i.add(l.output), r && r.onResult && r.onResult(l)
        }
      for (let l = 0; l < t.length; l++) {
        let d = oe(String(t[l]), { ...r, onResult: a }, !0),
          c = d.state.negated || d.state.negatedExtglob
        c && o++
        for (let C of e) {
          let m = d(C, !0)
          !(c ? !m.isMatch : m.isMatch) || (c ? n.add(m.output) : (n.delete(m.output), s.add(m.output)))
        }
      }
      let _ = (o === t.length ? [...i] : [...s]).filter((l) => !n.has(l))
      if (r && _.length === 0) {
        if (r.failglob === !0) throw new Error(`No matches found for "${t.join(', ')}"`)
        if (r.nonull === !0 || r.nullglob === !0) return r.unescape ? t.map((l) => l.replace(/\\/g, '')) : t
      }
      return _
    }
  F.match = F
  F.matcher = (e, t) => oe(e, t)
  F.isMatch = (e, t, r) => oe(t, r)(e)
  F.any = F.isMatch
  F.not = (e, t, r = {}) => {
    t = [].concat(t).map(String)
    let n = new Set(),
      s = [],
      o = F(e, t, {
        ...r,
        onResult: (a) => {
          r.onResult && r.onResult(a), s.push(a.output)
        },
      })
    for (let a of s) o.includes(a) || n.add(a)
    return [...n]
  }
  F.contains = (e, t, r) => {
    if (typeof e != 'string') throw new TypeError(`Expected a string: "${Xs.inspect(e)}"`)
    if (Array.isArray(t)) return t.some((n) => F.contains(e, n, r))
    if (typeof t == 'string') {
      if (zs(e) || zs(t)) return !1
      if (e.includes(t) || (e.startsWith('./') && e.slice(2).includes(t))) return !0
    }
    return F.isMatch(e, t, { ...r, contains: !0 })
  }
  F.matchKeys = (e, t, r) => {
    if (!Wt.isObject(e)) throw new TypeError('Expected the first argument to be an object')
    let n = F(Object.keys(e), t, r),
      s = {}
    for (let i of n) s[i] = e[i]
    return s
  }
  F.some = (e, t, r) => {
    let n = [].concat(e)
    for (let s of [].concat(t)) {
      let i = oe(String(s), r)
      if (n.some((o) => i(o))) return !0
    }
    return !1
  }
  F.every = (e, t, r) => {
    let n = [].concat(e)
    for (let s of [].concat(t)) {
      let i = oe(String(s), r)
      if (!n.every((o) => i(o))) return !1
    }
    return !0
  }
  F.all = (e, t, r) => {
    if (typeof e != 'string') throw new TypeError(`Expected a string: "${Xs.inspect(e)}"`)
    return [].concat(t).every((n) => oe(n, r)(e))
  }
  F.capture = (e, t, r) => {
    let n = Wt.isWindows(r),
      i = oe.makeRe(String(e), { ...r, capture: !0 }).exec(n ? Wt.toPosixSlashes(t) : t)
    if (i) return i.slice(1).map((o) => (o === void 0 ? '' : o))
  }
  F.makeRe = (...e) => oe.makeRe(...e)
  F.scan = (...e) => oe.scan(...e)
  F.parse = (e, t) => {
    let r = []
    for (let n of [].concat(e || [])) for (let s of Zs(String(n), t)) r.push(oe.parse(s, t))
    return r
  }
  F.braces = (e, t) => {
    if (typeof e != 'string') throw new TypeError('Expected a string')
    return (t && t.nobrace === !0) || !/\{.*\}/.test(e) ? [e] : Zs(e, t)
  }
  F.braceExpand = (e, t) => {
    if (typeof e != 'string') throw new TypeError('Expected a string')
    return F.braces(e, { ...t, expand: !0 })
  }
  Qs.exports = F
})
var ui = S((L) => {
  'use strict'
  Object.defineProperty(L, '__esModule', { value: !0 })
  L.matchAny = L.convertPatternsToRe = L.makeRe = L.getPatternParts = L.expandBraceExpansion = L.expandPatternsWithBraceExpansion = L.isAffectDepthOfReadingPattern = L.endsWithSlashGlobStar = L.hasGlobStar = L.getBaseDirectory = L.getPositivePatterns = L.getNegativePatterns = L.isPositivePattern = L.isNegativePattern = L.convertToNegativePattern = L.convertToPositivePattern = L.isDynamicPattern = L.isStaticPattern = void 0
  var Hc = require('path'),
    $c = Bn(),
    ei = Js(),
    Mc = Ut(),
    ti = '**',
    Nc = '\\',
    Dc = /[*?]|^!/,
    qc = /\[.*]/,
    Fc = /(?:^|[^!*+?@])\(.*\|.*\)/,
    Ic = /[!*+?@]\(.*\)/,
    Bc = /{.*(?:,|\.\.).*}/
  function ni(e, t = {}) {
    return !ri(e, t)
  }
  L.isStaticPattern = ni
  function ri(e, t = {}) {
    return e === ''
      ? !1
      : !!(
          t.caseSensitiveMatch === !1 ||
          e.includes(Nc) ||
          Dc.test(e) ||
          qc.test(e) ||
          Fc.test(e) ||
          (t.extglob !== !1 && Ic.test(e)) ||
          (t.braceExpansion !== !1 && Bc.test(e))
        )
  }
  L.isDynamicPattern = ri
  function jc(e) {
    return et(e) ? e.slice(1) : e
  }
  L.convertToPositivePattern = jc
  function Gc(e) {
    return '!' + e
  }
  L.convertToNegativePattern = Gc
  function et(e) {
    return e.startsWith('!') && e[1] !== '('
  }
  L.isNegativePattern = et
  function si(e) {
    return !et(e)
  }
  L.isPositivePattern = si
  function Uc(e) {
    return e.filter(et)
  }
  L.getNegativePatterns = Uc
  function Wc(e) {
    return e.filter(si)
  }
  L.getPositivePatterns = Wc
  function Kc(e) {
    return $c(e, { flipBackslashes: !1 })
  }
  L.getBaseDirectory = Kc
  function Vc(e) {
    return e.includes(ti)
  }
  L.hasGlobStar = Vc
  function ii(e) {
    return e.endsWith('/' + ti)
  }
  L.endsWithSlashGlobStar = ii
  function Yc(e) {
    let t = Hc.basename(e)
    return ii(e) || ni(t)
  }
  L.isAffectDepthOfReadingPattern = Yc
  function Qc(e) {
    return e.reduce((t, r) => t.concat(oi(r)), [])
  }
  L.expandPatternsWithBraceExpansion = Qc
  function oi(e) {
    return ei.braces(e, { expand: !0, nodupes: !0 })
  }
  L.expandBraceExpansion = oi
  function Xc(e, t) {
    let { parts: r } = Mc.scan(e, Object.assign(Object.assign({}, t), { parts: !0 }))
    return r.length === 0 && (r = [e]), r[0].startsWith('/') && ((r[0] = r[0].slice(1)), r.unshift('')), r
  }
  L.getPatternParts = Xc
  function ai(e, t) {
    return ei.makeRe(e, t)
  }
  L.makeRe = ai
  function Zc(e, t) {
    return e.map((r) => ai(r, t))
  }
  L.convertPatternsToRe = Zc
  function zc(e, t) {
    return t.some((r) => r.test(e))
  }
  L.matchAny = zc
})
var pi = S((Kp, ci) => {
  'use strict'
  var Jc = require('stream'),
    li = Jc.PassThrough,
    el = Array.prototype.slice
  ci.exports = tl
  function tl() {
    let e = [],
      t = el.call(arguments),
      r = !1,
      n = t[t.length - 1]
    n && !Array.isArray(n) && n.pipe == null ? t.pop() : (n = {})
    let s = n.end !== !1,
      i = n.pipeError === !0
    n.objectMode == null && (n.objectMode = !0), n.highWaterMark == null && (n.highWaterMark = 64 * 1024)
    let o = li(n)
    function a() {
      for (let l = 0, d = arguments.length; l < d; l++) e.push(fi(arguments[l], n))
      return u(), this
    }
    function u() {
      if (r) return
      r = !0
      let l = e.shift()
      if (!l) {
        process.nextTick(_)
        return
      }
      Array.isArray(l) || (l = [l])
      let d = l.length + 1
      function c() {
        --d > 0 || ((r = !1), u())
      }
      function C(m) {
        function A() {
          m.removeListener('merge2UnpipeEnd', A), m.removeListener('end', A), i && m.removeListener('error', v), c()
        }
        function v(x) {
          o.emit('error', x)
        }
        if (m._readableState.endEmitted) return c()
        m.on('merge2UnpipeEnd', A), m.on('end', A), i && m.on('error', v), m.pipe(o, { end: !1 }), m.resume()
      }
      for (let m = 0; m < l.length; m++) C(l[m])
      c()
    }
    function _() {
      ;(r = !1), o.emit('queueDrain'), s && o.end()
    }
    return (
      o.setMaxListeners(0),
      (o.add = a),
      o.on('unpipe', function (l) {
        l.emit('merge2UnpipeEnd')
      }),
      t.length && a.apply(null, t),
      o
    )
  }
  function fi(e, t) {
    if (Array.isArray(e)) for (let r = 0, n = e.length; r < n; r++) e[r] = fi(e[r], t)
    else {
      if ((!e._readableState && e.pipe && (e = e.pipe(li(t))), !e._readableState || !e.pause || !e.pipe))
        throw new Error('Only readable stream can be merged.')
      e.pause()
    }
    return e
  }
})
var di = S((tt) => {
  'use strict'
  Object.defineProperty(tt, '__esModule', { value: !0 })
  tt.merge = void 0
  var rl = pi()
  function nl(e) {
    let t = rl(e)
    return (
      e.forEach((r) => {
        r.once('error', (n) => t.emit('error', n))
      }),
      t.once('close', () => hi(e)),
      t.once('end', () => hi(e)),
      t
    )
  }
  tt.merge = nl
  function hi(e) {
    e.forEach((t) => t.emit('close'))
  }
})
var _i = S((Oe) => {
  'use strict'
  Object.defineProperty(Oe, '__esModule', { value: !0 })
  Oe.isEmpty = Oe.isString = void 0
  function sl(e) {
    return typeof e == 'string'
  }
  Oe.isString = sl
  function il(e) {
    return e === ''
  }
  Oe.isEmpty = il
})
var pe = S((W) => {
  'use strict'
  Object.defineProperty(W, '__esModule', { value: !0 })
  W.string = W.stream = W.pattern = W.path = W.fs = W.errno = W.array = void 0
  var ol = Ln()
  W.array = ol
  var al = kn()
  W.errno = al
  var ul = $n()
  W.fs = ul
  var cl = Mn()
  W.path = cl
  var ll = ui()
  W.pattern = ll
  var fl = di()
  W.stream = fl
  var pl = _i()
  W.string = pl
})
var Ei = S((K) => {
  'use strict'
  Object.defineProperty(K, '__esModule', { value: !0 })
  K.convertPatternGroupToTask = K.convertPatternGroupsToTasks = K.groupPatternsByBaseDirectory = K.getNegativePatternsAsPositive = K.getPositivePatterns = K.convertPatternsToTasks = K.generate = void 0
  var ve = pe()
  function hl(e, t) {
    let r = gi(e),
      n = yi(e, t.ignore),
      s = r.filter((u) => ve.pattern.isStaticPattern(u, t)),
      i = r.filter((u) => ve.pattern.isDynamicPattern(u, t)),
      o = Kt(s, n, !1),
      a = Kt(i, n, !0)
    return o.concat(a)
  }
  K.generate = hl
  function Kt(e, t, r) {
    let n = mi(e)
    return '.' in n ? [Vt('.', e, t, r)] : Si(n, t, r)
  }
  K.convertPatternsToTasks = Kt
  function gi(e) {
    return ve.pattern.getPositivePatterns(e)
  }
  K.getPositivePatterns = gi
  function yi(e, t) {
    return ve.pattern.getNegativePatterns(e).concat(t).map(ve.pattern.convertToPositivePattern)
  }
  K.getNegativePatternsAsPositive = yi
  function mi(e) {
    let t = {}
    return e.reduce((r, n) => {
      let s = ve.pattern.getBaseDirectory(n)
      return s in r ? r[s].push(n) : (r[s] = [n]), r
    }, t)
  }
  K.groupPatternsByBaseDirectory = mi
  function Si(e, t, r) {
    return Object.keys(e).map((n) => Vt(n, e[n], t, r))
  }
  K.convertPatternGroupsToTasks = Si
  function Vt(e, t, r, n) {
    return {
      dynamic: n,
      positive: t,
      negative: r,
      base: e,
      patterns: [].concat(t, r.map(ve.pattern.convertToNegativePattern)),
    }
  }
  K.convertPatternGroupToTask = Vt
})
var Ai = S((rt) => {
  'use strict'
  Object.defineProperty(rt, '__esModule', { value: !0 })
  rt.read = void 0
  function dl(e, t, r) {
    t.fs.lstat(e, (n, s) => {
      if (n !== null) return bi(r, n)
      if (!s.isSymbolicLink() || !t.followSymbolicLink) return Yt(r, s)
      t.fs.stat(e, (i, o) => {
        if (i !== null) return t.throwErrorOnBrokenSymbolicLink ? bi(r, i) : Yt(r, s)
        t.markSymbolicLink && (o.isSymbolicLink = () => !0), Yt(r, o)
      })
    })
  }
  rt.read = dl
  function bi(e, t) {
    e(t)
  }
  function Yt(e, t) {
    e(null, t)
  }
})
var vi = S((nt) => {
  'use strict'
  Object.defineProperty(nt, '__esModule', { value: !0 })
  nt.read = void 0
  function _l(e, t) {
    let r = t.fs.lstatSync(e)
    if (!r.isSymbolicLink() || !t.followSymbolicLink) return r
    try {
      let n = t.fs.statSync(e)
      return t.markSymbolicLink && (n.isSymbolicLink = () => !0), n
    } catch (n) {
      if (!t.throwErrorOnBrokenSymbolicLink) return r
      throw n
    }
  }
  nt.read = _l
})
var Ri = S((de) => {
  'use strict'
  Object.defineProperty(de, '__esModule', { value: !0 })
  de.createFileSystemAdapter = de.FILE_SYSTEM_ADAPTER = void 0
  var st = require('fs')
  de.FILE_SYSTEM_ADAPTER = { lstat: st.lstat, stat: st.stat, lstatSync: st.lstatSync, statSync: st.statSync }
  function gl(e) {
    return e === void 0 ? de.FILE_SYSTEM_ADAPTER : Object.assign(Object.assign({}, de.FILE_SYSTEM_ADAPTER), e)
  }
  de.createFileSystemAdapter = gl
})
var wi = S((Qt) => {
  'use strict'
  Object.defineProperty(Qt, '__esModule', { value: !0 })
  var yl = Ri(),
    xi = class {
      constructor(t = {}) {
        ;(this._options = t),
          (this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, !0)),
          (this.fs = yl.createFileSystemAdapter(this._options.fs)),
          (this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, !1)),
          (this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, !0))
      }
      _getValue(t, r) {
        return t ?? r
      }
    }
  Qt.default = xi
})
var Re = S((_e) => {
  'use strict'
  Object.defineProperty(_e, '__esModule', { value: !0 })
  _e.statSync = _e.stat = _e.Settings = void 0
  var Ci = Ai(),
    ml = vi(),
    Xt = wi()
  _e.Settings = Xt.default
  function Sl(e, t, r) {
    if (typeof t == 'function') return Ci.read(e, Zt(), t)
    Ci.read(e, Zt(t), r)
  }
  _e.stat = Sl
  function El(e, t) {
    let r = Zt(t)
    return ml.read(e, r)
  }
  _e.statSync = El
  function Zt(e = {}) {
    return e instanceof Xt.default ? e : new Xt.default(e)
  }
})
var Oi = S((rh, Pi) => {
  var Ti
  Pi.exports =
    typeof queueMicrotask == 'function'
      ? queueMicrotask.bind(typeof window != 'undefined' ? window : global)
      : (e) =>
          (Ti || (Ti = Promise.resolve())).then(e).catch((t) =>
            setTimeout(() => {
              throw t
            }, 0),
          )
})
var ki = S((nh, Li) => {
  Li.exports = bl
  var Al = Oi()
  function bl(e, t) {
    let r,
      n,
      s,
      i = !0
    Array.isArray(e) ? ((r = []), (n = e.length)) : ((s = Object.keys(e)), (r = {}), (n = s.length))
    function o(u) {
      function _() {
        t && t(u, r), (t = null)
      }
      i ? Al(_) : _()
    }
    function a(u, _, l) {
      ;(r[u] = l), (--n == 0 || _) && o(_)
    }
    n
      ? s
        ? s.forEach(function (u) {
            e[u](function (_, l) {
              a(u, _, l)
            })
          })
        : e.forEach(function (u, _) {
            u(function (l, d) {
              a(_, l, d)
            })
          })
      : o(null),
      (i = !1)
  }
})
var zt = S((it) => {
  'use strict'
  Object.defineProperty(it, '__esModule', { value: !0 })
  it.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0
  var Hi = process.versions.node.split('.'),
    $i = parseInt(Hi[0], 10),
    vl = parseInt(Hi[1], 10),
    Mi = 10,
    Rl = 10,
    xl = $i > Mi,
    wl = $i === Mi && vl >= Rl
  it.IS_SUPPORT_READDIR_WITH_FILE_TYPES = xl || wl
})
var Di = S((ot) => {
  'use strict'
  Object.defineProperty(ot, '__esModule', { value: !0 })
  ot.createDirentFromStats = void 0
  var Ni = class {
    constructor(t, r) {
      ;(this.name = t),
        (this.isBlockDevice = r.isBlockDevice.bind(r)),
        (this.isCharacterDevice = r.isCharacterDevice.bind(r)),
        (this.isDirectory = r.isDirectory.bind(r)),
        (this.isFIFO = r.isFIFO.bind(r)),
        (this.isFile = r.isFile.bind(r)),
        (this.isSocket = r.isSocket.bind(r)),
        (this.isSymbolicLink = r.isSymbolicLink.bind(r))
    }
  }
  function Cl(e, t) {
    return new Ni(e, t)
  }
  ot.createDirentFromStats = Cl
})
var Jt = S((at) => {
  'use strict'
  Object.defineProperty(at, '__esModule', { value: !0 })
  at.fs = void 0
  var Pl = Di()
  at.fs = Pl
})
var er = S((ut) => {
  'use strict'
  Object.defineProperty(ut, '__esModule', { value: !0 })
  ut.joinPathSegments = void 0
  function Tl(e, t, r) {
    return e.endsWith(r) ? e + t : e + r + t
  }
  ut.joinPathSegments = Tl
})
var Gi = S((ge) => {
  'use strict'
  Object.defineProperty(ge, '__esModule', { value: !0 })
  ge.readdir = ge.readdirWithFileTypes = ge.read = void 0
  var Ol = Re(),
    qi = ki(),
    Ll = zt(),
    Fi = Jt(),
    Ii = er()
  function kl(e, t, r) {
    return !t.stats && Ll.IS_SUPPORT_READDIR_WITH_FILE_TYPES ? Bi(e, t, r) : ji(e, t, r)
  }
  ge.read = kl
  function Bi(e, t, r) {
    t.fs.readdir(e, { withFileTypes: !0 }, (n, s) => {
      if (n !== null) return ct(r, n)
      let i = s.map((a) => ({ dirent: a, name: a.name, path: Ii.joinPathSegments(e, a.name, t.pathSegmentSeparator) }))
      if (!t.followSymbolicLinks) return tr(r, i)
      let o = i.map((a) => Hl(a, t))
      qi(o, (a, u) => {
        if (a !== null) return ct(r, a)
        tr(r, u)
      })
    })
  }
  ge.readdirWithFileTypes = Bi
  function Hl(e, t) {
    return (r) => {
      if (!e.dirent.isSymbolicLink()) return r(null, e)
      t.fs.stat(e.path, (n, s) =>
        n !== null
          ? t.throwErrorOnBrokenSymbolicLink
            ? r(n)
            : r(null, e)
          : ((e.dirent = Fi.fs.createDirentFromStats(e.name, s)), r(null, e)),
      )
    }
  }
  function ji(e, t, r) {
    t.fs.readdir(e, (n, s) => {
      if (n !== null) return ct(r, n)
      let i = s.map((a) => Ii.joinPathSegments(e, a, t.pathSegmentSeparator)),
        o = i.map((a) => (u) => Ol.stat(a, t.fsStatSettings, u))
      qi(o, (a, u) => {
        if (a !== null) return ct(r, a)
        let _ = []
        s.forEach((l, d) => {
          let c = u[d],
            C = { name: l, path: i[d], dirent: Fi.fs.createDirentFromStats(l, c) }
          t.stats && (C.stats = c), _.push(C)
        }),
          tr(r, _)
      })
    })
  }
  ge.readdir = ji
  function ct(e, t) {
    e(t)
  }
  function tr(e, t) {
    e(null, t)
  }
})
var Yi = S((ye) => {
  'use strict'
  Object.defineProperty(ye, '__esModule', { value: !0 })
  ye.readdir = ye.readdirWithFileTypes = ye.read = void 0
  var $l = Re(),
    Ml = zt(),
    Ui = Jt(),
    Wi = er()
  function Nl(e, t) {
    return !t.stats && Ml.IS_SUPPORT_READDIR_WITH_FILE_TYPES ? Ki(e, t) : Vi(e, t)
  }
  ye.read = Nl
  function Ki(e, t) {
    return t.fs.readdirSync(e, { withFileTypes: !0 }).map((n) => {
      let s = { dirent: n, name: n.name, path: Wi.joinPathSegments(e, n.name, t.pathSegmentSeparator) }
      if (s.dirent.isSymbolicLink() && t.followSymbolicLinks)
        try {
          let i = t.fs.statSync(s.path)
          s.dirent = Ui.fs.createDirentFromStats(s.name, i)
        } catch (i) {
          if (t.throwErrorOnBrokenSymbolicLink) throw i
        }
      return s
    })
  }
  ye.readdirWithFileTypes = Ki
  function Vi(e, t) {
    return t.fs.readdirSync(e).map((n) => {
      let s = Wi.joinPathSegments(e, n, t.pathSegmentSeparator),
        i = $l.statSync(s, t.fsStatSettings),
        o = { name: n, path: s, dirent: Ui.fs.createDirentFromStats(n, i) }
      return t.stats && (o.stats = i), o
    })
  }
  ye.readdir = Vi
})
var Qi = S((me) => {
  'use strict'
  Object.defineProperty(me, '__esModule', { value: !0 })
  me.createFileSystemAdapter = me.FILE_SYSTEM_ADAPTER = void 0
  var Le = require('fs')
  me.FILE_SYSTEM_ADAPTER = {
    lstat: Le.lstat,
    stat: Le.stat,
    lstatSync: Le.lstatSync,
    statSync: Le.statSync,
    readdir: Le.readdir,
    readdirSync: Le.readdirSync,
  }
  function Dl(e) {
    return e === void 0 ? me.FILE_SYSTEM_ADAPTER : Object.assign(Object.assign({}, me.FILE_SYSTEM_ADAPTER), e)
  }
  me.createFileSystemAdapter = Dl
})
var Zi = S((rr) => {
  'use strict'
  Object.defineProperty(rr, '__esModule', { value: !0 })
  var ql = require('path'),
    Fl = Re(),
    Il = Qi(),
    Xi = class {
      constructor(t = {}) {
        ;(this._options = t),
          (this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, !1)),
          (this.fs = Il.createFileSystemAdapter(this._options.fs)),
          (this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, ql.sep)),
          (this.stats = this._getValue(this._options.stats, !1)),
          (this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, !0)),
          (this.fsStatSettings = new Fl.Settings({
            followSymbolicLink: this.followSymbolicLinks,
            fs: this.fs,
            throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink,
          }))
      }
      _getValue(t, r) {
        return t ?? r
      }
    }
  rr.default = Xi
})
var lt = S((Se) => {
  'use strict'
  Object.defineProperty(Se, '__esModule', { value: !0 })
  Se.Settings = Se.scandirSync = Se.scandir = void 0
  var zi = Gi(),
    Bl = Yi(),
    nr = Zi()
  Se.Settings = nr.default
  function jl(e, t, r) {
    if (typeof t == 'function') return zi.read(e, sr(), t)
    zi.read(e, sr(t), r)
  }
  Se.scandir = jl
  function Gl(e, t) {
    let r = sr(t)
    return Bl.read(e, r)
  }
  Se.scandirSync = Gl
  function sr(e = {}) {
    return e instanceof nr.default ? e : new nr.default(e)
  }
})
var eo = S((hh, Ji) => {
  'use strict'
  function Ul(e) {
    var t = new e(),
      r = t
    function n() {
      var i = t
      return i.next ? (t = i.next) : ((t = new e()), (r = t)), (i.next = null), i
    }
    function s(i) {
      ;(r.next = i), (r = i)
    }
    return { get: n, release: s }
  }
  Ji.exports = Ul
})
var ro = S((dh, ir) => {
  'use strict'
  var Wl = eo()
  function to(e, t, r) {
    if ((typeof e == 'function' && ((r = t), (t = e), (e = null)), r < 1))
      throw new Error('fastqueue concurrency must be greater than 1')
    var n = Wl(Kl),
      s = null,
      i = null,
      o = 0,
      a = null,
      u = {
        push: A,
        drain: ae,
        saturated: ae,
        pause: l,
        paused: !1,
        concurrency: r,
        running: _,
        resume: C,
        idle: m,
        length: d,
        getQueue: c,
        unshift: v,
        empty: ae,
        kill: M,
        killAndDrain: T,
        error: R,
      }
    return u
    function _() {
      return o
    }
    function l() {
      u.paused = !0
    }
    function d() {
      for (var w = s, H = 0; w; ) (w = w.next), H++
      return H
    }
    function c() {
      for (var w = s, H = []; w; ) H.push(w.value), (w = w.next)
      return H
    }
    function C() {
      if (!!u.paused) {
        u.paused = !1
        for (var w = 0; w < u.concurrency; w++) o++, x()
      }
    }
    function m() {
      return o === 0 && u.length() === 0
    }
    function A(w, H) {
      var g = n.get()
      ;(g.context = e),
        (g.release = x),
        (g.value = w),
        (g.callback = H || ae),
        (g.errorHandler = a),
        o === u.concurrency || u.paused
          ? i
            ? ((i.next = g), (i = g))
            : ((s = g), (i = g), u.saturated())
          : (o++, t.call(e, g.value, g.worked))
    }
    function v(w, H) {
      var g = n.get()
      ;(g.context = e),
        (g.release = x),
        (g.value = w),
        (g.callback = H || ae),
        o === u.concurrency || u.paused
          ? s
            ? ((g.next = s), (s = g))
            : ((s = g), (i = g), u.saturated())
          : (o++, t.call(e, g.value, g.worked))
    }
    function x(w) {
      w && n.release(w)
      var H = s
      H
        ? u.paused
          ? o--
          : (i === s && (i = null),
            (s = H.next),
            (H.next = null),
            t.call(e, H.value, H.worked),
            i === null && u.empty())
        : --o == 0 && u.drain()
    }
    function M() {
      ;(s = null), (i = null), (u.drain = ae)
    }
    function T() {
      ;(s = null), (i = null), u.drain(), (u.drain = ae)
    }
    function R(w) {
      a = w
    }
  }
  function ae() {}
  function Kl() {
    ;(this.value = null),
      (this.callback = ae),
      (this.next = null),
      (this.release = ae),
      (this.context = null),
      (this.errorHandler = null)
    var e = this
    this.worked = function (r, n) {
      var s = e.callback,
        i = e.errorHandler,
        o = e.value
      ;(e.value = null), (e.callback = ae), e.errorHandler && i(r, o), s.call(e.context, r, n), e.release(e)
    }
  }
  function Vl(e, t, r) {
    typeof e == 'function' && ((r = t), (t = e), (e = null))
    function n(_, l) {
      t.call(this, _).then(function (d) {
        l(null, d)
      }, l)
    }
    var s = to(e, n, r),
      i = s.push,
      o = s.unshift
    return (s.push = a), (s.unshift = u), s
    function a(_) {
      return new Promise(function (l, d) {
        i(_, function (c, C) {
          if (c) {
            d(c)
            return
          }
          l(C)
        })
      })
    }
    function u(_) {
      return new Promise(function (l, d) {
        o(_, function (c, C) {
          if (c) {
            d(c)
            return
          }
          l(C)
        })
      })
    }
  }
  ir.exports = to
  ir.exports.promise = Vl
})
var ft = S((ue) => {
  'use strict'
  Object.defineProperty(ue, '__esModule', { value: !0 })
  ue.joinPathSegments = ue.replacePathSegmentSeparator = ue.isAppliedFilter = ue.isFatalError = void 0
  function Yl(e, t) {
    return e.errorFilter === null ? !0 : !e.errorFilter(t)
  }
  ue.isFatalError = Yl
  function Ql(e, t) {
    return e === null || e(t)
  }
  ue.isAppliedFilter = Ql
  function Xl(e, t) {
    return e.split(/[/\\]/).join(t)
  }
  ue.replacePathSegmentSeparator = Xl
  function Zl(e, t, r) {
    return e === '' ? t : e.endsWith(r) ? e + t : e + r + t
  }
  ue.joinPathSegments = Zl
})
var ar = S((or) => {
  'use strict'
  Object.defineProperty(or, '__esModule', { value: !0 })
  var zl = ft(),
    no = class {
      constructor(t, r) {
        ;(this._root = t),
          (this._settings = r),
          (this._root = zl.replacePathSegmentSeparator(t, r.pathSegmentSeparator))
      }
    }
  or.default = no
})
var cr = S((ur) => {
  'use strict'
  Object.defineProperty(ur, '__esModule', { value: !0 })
  var Jl = require('events'),
    ef = lt(),
    tf = ro(),
    pt = ft(),
    rf = ar(),
    so = class extends rf.default {
      constructor(t, r) {
        super(t, r)
        ;(this._settings = r),
          (this._scandir = ef.scandir),
          (this._emitter = new Jl.EventEmitter()),
          (this._queue = tf(this._worker.bind(this), this._settings.concurrency)),
          (this._isFatalError = !1),
          (this._isDestroyed = !1),
          (this._queue.drain = () => {
            this._isFatalError || this._emitter.emit('end')
          })
      }
      read() {
        return (
          (this._isFatalError = !1),
          (this._isDestroyed = !1),
          setImmediate(() => {
            this._pushToQueue(this._root, this._settings.basePath)
          }),
          this._emitter
        )
      }
      get isDestroyed() {
        return this._isDestroyed
      }
      destroy() {
        if (this._isDestroyed) throw new Error('The reader is already destroyed')
        ;(this._isDestroyed = !0), this._queue.killAndDrain()
      }
      onEntry(t) {
        this._emitter.on('entry', t)
      }
      onError(t) {
        this._emitter.once('error', t)
      }
      onEnd(t) {
        this._emitter.once('end', t)
      }
      _pushToQueue(t, r) {
        let n = { directory: t, base: r }
        this._queue.push(n, (s) => {
          s !== null && this._handleError(s)
        })
      }
      _worker(t, r) {
        this._scandir(t.directory, this._settings.fsScandirSettings, (n, s) => {
          if (n !== null) return r(n, void 0)
          for (let i of s) this._handleEntry(i, t.base)
          r(null, void 0)
        })
      }
      _handleError(t) {
        this._isDestroyed ||
          !pt.isFatalError(this._settings, t) ||
          ((this._isFatalError = !0), (this._isDestroyed = !0), this._emitter.emit('error', t))
      }
      _handleEntry(t, r) {
        if (this._isDestroyed || this._isFatalError) return
        let n = t.path
        r !== void 0 && (t.path = pt.joinPathSegments(r, t.name, this._settings.pathSegmentSeparator)),
          pt.isAppliedFilter(this._settings.entryFilter, t) && this._emitEntry(t),
          t.dirent.isDirectory() && pt.isAppliedFilter(this._settings.deepFilter, t) && this._pushToQueue(n, t.path)
      }
      _emitEntry(t) {
        this._emitter.emit('entry', t)
      }
    }
  ur.default = so
})
var oo = S((lr) => {
  'use strict'
  Object.defineProperty(lr, '__esModule', { value: !0 })
  var nf = cr(),
    io = class {
      constructor(t, r) {
        ;(this._root = t),
          (this._settings = r),
          (this._reader = new nf.default(this._root, this._settings)),
          (this._storage = new Set())
      }
      read(t) {
        this._reader.onError((r) => {
          sf(t, r)
        }),
          this._reader.onEntry((r) => {
            this._storage.add(r)
          }),
          this._reader.onEnd(() => {
            of(t, [...this._storage])
          }),
          this._reader.read()
      }
    }
  lr.default = io
  function sf(e, t) {
    e(t)
  }
  function of(e, t) {
    e(null, t)
  }
})
var uo = S((fr) => {
  'use strict'
  Object.defineProperty(fr, '__esModule', { value: !0 })
  var af = require('stream'),
    uf = cr(),
    ao = class {
      constructor(t, r) {
        ;(this._root = t),
          (this._settings = r),
          (this._reader = new uf.default(this._root, this._settings)),
          (this._stream = new af.Readable({
            objectMode: !0,
            read: () => {},
            destroy: () => {
              this._reader.isDestroyed || this._reader.destroy()
            },
          }))
      }
      read() {
        return (
          this._reader.onError((t) => {
            this._stream.emit('error', t)
          }),
          this._reader.onEntry((t) => {
            this._stream.push(t)
          }),
          this._reader.onEnd(() => {
            this._stream.push(null)
          }),
          this._reader.read(),
          this._stream
        )
      }
    }
  fr.default = ao
})
var lo = S((pr) => {
  'use strict'
  Object.defineProperty(pr, '__esModule', { value: !0 })
  var cf = lt(),
    ht = ft(),
    lf = ar(),
    co = class extends lf.default {
      constructor() {
        super(...arguments)
        ;(this._scandir = cf.scandirSync), (this._storage = new Set()), (this._queue = new Set())
      }
      read() {
        return this._pushToQueue(this._root, this._settings.basePath), this._handleQueue(), [...this._storage]
      }
      _pushToQueue(t, r) {
        this._queue.add({ directory: t, base: r })
      }
      _handleQueue() {
        for (let t of this._queue.values()) this._handleDirectory(t.directory, t.base)
      }
      _handleDirectory(t, r) {
        try {
          let n = this._scandir(t, this._settings.fsScandirSettings)
          for (let s of n) this._handleEntry(s, r)
        } catch (n) {
          this._handleError(n)
        }
      }
      _handleError(t) {
        if (!!ht.isFatalError(this._settings, t)) throw t
      }
      _handleEntry(t, r) {
        let n = t.path
        r !== void 0 && (t.path = ht.joinPathSegments(r, t.name, this._settings.pathSegmentSeparator)),
          ht.isAppliedFilter(this._settings.entryFilter, t) && this._pushToStorage(t),
          t.dirent.isDirectory() && ht.isAppliedFilter(this._settings.deepFilter, t) && this._pushToQueue(n, t.path)
      }
      _pushToStorage(t) {
        this._storage.add(t)
      }
    }
  pr.default = co
})
var po = S((hr) => {
  'use strict'
  Object.defineProperty(hr, '__esModule', { value: !0 })
  var ff = lo(),
    fo = class {
      constructor(t, r) {
        ;(this._root = t), (this._settings = r), (this._reader = new ff.default(this._root, this._settings))
      }
      read() {
        return this._reader.read()
      }
    }
  hr.default = fo
})
var _o = S((dr) => {
  'use strict'
  Object.defineProperty(dr, '__esModule', { value: !0 })
  var pf = require('path'),
    hf = lt(),
    ho = class {
      constructor(t = {}) {
        ;(this._options = t),
          (this.basePath = this._getValue(this._options.basePath, void 0)),
          (this.concurrency = this._getValue(this._options.concurrency, Infinity)),
          (this.deepFilter = this._getValue(this._options.deepFilter, null)),
          (this.entryFilter = this._getValue(this._options.entryFilter, null)),
          (this.errorFilter = this._getValue(this._options.errorFilter, null)),
          (this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, pf.sep)),
          (this.fsScandirSettings = new hf.Settings({
            followSymbolicLinks: this._options.followSymbolicLinks,
            fs: this._options.fs,
            pathSegmentSeparator: this._options.pathSegmentSeparator,
            stats: this._options.stats,
            throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink,
          }))
      }
      _getValue(t, r) {
        return t ?? r
      }
    }
  dr.default = ho
})
var gr = S((ce) => {
  'use strict'
  Object.defineProperty(ce, '__esModule', { value: !0 })
  ce.Settings = ce.walkStream = ce.walkSync = ce.walk = void 0
  var go = oo(),
    df = uo(),
    _f = po(),
    _r = _o()
  ce.Settings = _r.default
  function gf(e, t, r) {
    if (typeof t == 'function') return new go.default(e, dt()).read(t)
    new go.default(e, dt(t)).read(r)
  }
  ce.walk = gf
  function yf(e, t) {
    let r = dt(t)
    return new _f.default(e, r).read()
  }
  ce.walkSync = yf
  function mf(e, t) {
    let r = dt(t)
    return new df.default(e, r).read()
  }
  ce.walkStream = mf
  function dt(e = {}) {
    return e instanceof _r.default ? e : new _r.default(e)
  }
})
var mr = S((yr) => {
  'use strict'
  Object.defineProperty(yr, '__esModule', { value: !0 })
  var Sf = require('path'),
    Ef = Re(),
    yo = pe(),
    mo = class {
      constructor(t) {
        ;(this._settings = t),
          (this._fsStatSettings = new Ef.Settings({
            followSymbolicLink: this._settings.followSymbolicLinks,
            fs: this._settings.fs,
            throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks,
          }))
      }
      _getFullEntryPath(t) {
        return Sf.resolve(this._settings.cwd, t)
      }
      _makeEntry(t, r) {
        let n = { name: r, path: r, dirent: yo.fs.createDirentFromStats(r, t) }
        return this._settings.stats && (n.stats = t), n
      }
      _isFatalError(t) {
        return !yo.errno.isEnoentCodeError(t) && !this._settings.suppressErrors
      }
    }
  yr.default = mo
})
var Er = S((Sr) => {
  'use strict'
  Object.defineProperty(Sr, '__esModule', { value: !0 })
  var bf = require('stream'),
    Af = Re(),
    vf = gr(),
    Rf = mr(),
    So = class extends Rf.default {
      constructor() {
        super(...arguments)
        ;(this._walkStream = vf.walkStream), (this._stat = Af.stat)
      }
      dynamic(t, r) {
        return this._walkStream(t, r)
      }
      static(t, r) {
        let n = t.map(this._getFullEntryPath, this),
          s = new bf.PassThrough({ objectMode: !0 })
        s._write = (i, o, a) =>
          this._getEntry(n[i], t[i], r)
            .then((u) => {
              u !== null && r.entryFilter(u) && s.push(u), i === n.length - 1 && s.end(), a()
            })
            .catch(a)
        for (let i = 0; i < n.length; i++) s.write(i)
        return s
      }
      _getEntry(t, r, n) {
        return this._getStat(t)
          .then((s) => this._makeEntry(s, r))
          .catch((s) => {
            if (n.errorFilter(s)) return null
            throw s
          })
      }
      _getStat(t) {
        return new Promise((r, n) => {
          this._stat(t, this._fsStatSettings, (s, i) => (s === null ? r(i) : n(s)))
        })
      }
    }
  Sr.default = So
})
var bo = S((br) => {
  'use strict'
  Object.defineProperty(br, '__esModule', { value: !0 })
  var ke = pe(),
    Eo = class {
      constructor(t, r, n) {
        ;(this._patterns = t),
          (this._settings = r),
          (this._micromatchOptions = n),
          (this._storage = []),
          this._fillStorage()
      }
      _fillStorage() {
        let t = ke.pattern.expandPatternsWithBraceExpansion(this._patterns)
        for (let r of t) {
          let n = this._getPatternSegments(r),
            s = this._splitSegmentsIntoSections(n)
          this._storage.push({ complete: s.length <= 1, pattern: r, segments: n, sections: s })
        }
      }
      _getPatternSegments(t) {
        return ke.pattern
          .getPatternParts(t, this._micromatchOptions)
          .map((n) =>
            ke.pattern.isDynamicPattern(n, this._settings)
              ? { dynamic: !0, pattern: n, patternRe: ke.pattern.makeRe(n, this._micromatchOptions) }
              : { dynamic: !1, pattern: n },
          )
      }
      _splitSegmentsIntoSections(t) {
        return ke.array.splitWhen(t, (r) => r.dynamic && ke.pattern.hasGlobStar(r.pattern))
      }
    }
  br.default = Eo
})
var vo = S((Ar) => {
  'use strict'
  Object.defineProperty(Ar, '__esModule', { value: !0 })
  var xf = bo(),
    Ao = class extends xf.default {
      match(t) {
        let r = t.split('/'),
          n = r.length,
          s = this._storage.filter((i) => !i.complete || i.segments.length > n)
        for (let i of s) {
          let o = i.sections[0]
          if (
            (!i.complete && n > o.length) ||
            r.every((u, _) => {
              let l = i.segments[_]
              return !!((l.dynamic && l.patternRe.test(u)) || (!l.dynamic && l.pattern === u))
            })
          )
            return !0
        }
        return !1
      }
    }
  Ar.default = Ao
})
var xo = S((vr) => {
  'use strict'
  Object.defineProperty(vr, '__esModule', { value: !0 })
  var _t = pe(),
    wf = vo(),
    Ro = class {
      constructor(t, r) {
        ;(this._settings = t), (this._micromatchOptions = r)
      }
      getFilter(t, r, n) {
        let s = this._getMatcher(r),
          i = this._getNegativePatternsRe(n)
        return (o) => this._filter(t, o, s, i)
      }
      _getMatcher(t) {
        return new wf.default(t, this._settings, this._micromatchOptions)
      }
      _getNegativePatternsRe(t) {
        let r = t.filter(_t.pattern.isAffectDepthOfReadingPattern)
        return _t.pattern.convertPatternsToRe(r, this._micromatchOptions)
      }
      _filter(t, r, n, s) {
        if (this._isSkippedByDeep(t, r.path) || this._isSkippedSymbolicLink(r)) return !1
        let i = _t.path.removeLeadingDotSegment(r.path)
        return this._isSkippedByPositivePatterns(i, n) ? !1 : this._isSkippedByNegativePatterns(i, s)
      }
      _isSkippedByDeep(t, r) {
        return this._settings.deep === Infinity ? !1 : this._getEntryLevel(t, r) >= this._settings.deep
      }
      _getEntryLevel(t, r) {
        let n = r.split('/').length
        if (t === '') return n
        let s = t.split('/').length
        return n - s
      }
      _isSkippedSymbolicLink(t) {
        return !this._settings.followSymbolicLinks && t.dirent.isSymbolicLink()
      }
      _isSkippedByPositivePatterns(t, r) {
        return !this._settings.baseNameMatch && !r.match(t)
      }
      _isSkippedByNegativePatterns(t, r) {
        return !_t.pattern.matchAny(t, r)
      }
    }
  vr.default = Ro
})
var Co = S((Rr) => {
  'use strict'
  Object.defineProperty(Rr, '__esModule', { value: !0 })
  var He = pe(),
    wo = class {
      constructor(t, r) {
        ;(this._settings = t), (this._micromatchOptions = r), (this.index = new Map())
      }
      getFilter(t, r) {
        let n = He.pattern.convertPatternsToRe(t, this._micromatchOptions),
          s = He.pattern.convertPatternsToRe(r, this._micromatchOptions)
        return (i) => this._filter(i, n, s)
      }
      _filter(t, r, n) {
        if (
          (this._settings.unique && this._isDuplicateEntry(t)) ||
          this._onlyFileFilter(t) ||
          this._onlyDirectoryFilter(t) ||
          this._isSkippedByAbsoluteNegativePatterns(t.path, n)
        )
          return !1
        let s = this._settings.baseNameMatch ? t.name : t.path,
          i = this._isMatchToPatterns(s, r) && !this._isMatchToPatterns(t.path, n)
        return this._settings.unique && i && this._createIndexRecord(t), i
      }
      _isDuplicateEntry(t) {
        return this.index.has(t.path)
      }
      _createIndexRecord(t) {
        this.index.set(t.path, void 0)
      }
      _onlyFileFilter(t) {
        return this._settings.onlyFiles && !t.dirent.isFile()
      }
      _onlyDirectoryFilter(t) {
        return this._settings.onlyDirectories && !t.dirent.isDirectory()
      }
      _isSkippedByAbsoluteNegativePatterns(t, r) {
        if (!this._settings.absolute) return !1
        let n = He.path.makeAbsolute(this._settings.cwd, t)
        return He.pattern.matchAny(n, r)
      }
      _isMatchToPatterns(t, r) {
        let n = He.path.removeLeadingDotSegment(t)
        return He.pattern.matchAny(n, r)
      }
    }
  Rr.default = wo
})
var To = S((xr) => {
  'use strict'
  Object.defineProperty(xr, '__esModule', { value: !0 })
  var Cf = pe(),
    Po = class {
      constructor(t) {
        this._settings = t
      }
      getFilter() {
        return (t) => this._isNonFatalError(t)
      }
      _isNonFatalError(t) {
        return Cf.errno.isEnoentCodeError(t) || this._settings.suppressErrors
      }
    }
  xr.default = Po
})
var ko = S((wr) => {
  'use strict'
  Object.defineProperty(wr, '__esModule', { value: !0 })
  var Oo = pe(),
    Lo = class {
      constructor(t) {
        this._settings = t
      }
      getTransformer() {
        return (t) => this._transform(t)
      }
      _transform(t) {
        let r = t.path
        return (
          this._settings.absolute && ((r = Oo.path.makeAbsolute(this._settings.cwd, r)), (r = Oo.path.unixify(r))),
          this._settings.markDirectories && t.dirent.isDirectory() && (r += '/'),
          this._settings.objectMode ? Object.assign(Object.assign({}, t), { path: r }) : r
        )
      }
    }
  wr.default = Lo
})
var gt = S((Cr) => {
  'use strict'
  Object.defineProperty(Cr, '__esModule', { value: !0 })
  var Pf = require('path'),
    Tf = xo(),
    Of = Co(),
    Lf = To(),
    kf = ko(),
    Ho = class {
      constructor(t) {
        ;(this._settings = t),
          (this.errorFilter = new Lf.default(this._settings)),
          (this.entryFilter = new Of.default(this._settings, this._getMicromatchOptions())),
          (this.deepFilter = new Tf.default(this._settings, this._getMicromatchOptions())),
          (this.entryTransformer = new kf.default(this._settings))
      }
      _getRootDirectory(t) {
        return Pf.resolve(this._settings.cwd, t.base)
      }
      _getReaderOptions(t) {
        let r = t.base === '.' ? '' : t.base
        return {
          basePath: r,
          pathSegmentSeparator: '/',
          concurrency: this._settings.concurrency,
          deepFilter: this.deepFilter.getFilter(r, t.positive, t.negative),
          entryFilter: this.entryFilter.getFilter(t.positive, t.negative),
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
          posix: !0,
          strictSlashes: !1,
        }
      }
    }
  Cr.default = Ho
})
var Mo = S((Pr) => {
  'use strict'
  Object.defineProperty(Pr, '__esModule', { value: !0 })
  var Hf = Er(),
    $f = gt(),
    $o = class extends $f.default {
      constructor() {
        super(...arguments)
        this._reader = new Hf.default(this._settings)
      }
      read(t) {
        let r = this._getRootDirectory(t),
          n = this._getReaderOptions(t),
          s = []
        return new Promise((i, o) => {
          let a = this.api(r, t, n)
          a.once('error', o), a.on('data', (u) => s.push(n.transform(u))), a.once('end', () => i(s))
        })
      }
      api(t, r, n) {
        return r.dynamic ? this._reader.dynamic(t, n) : this._reader.static(r.patterns, n)
      }
    }
  Pr.default = $o
})
var Do = S((Tr) => {
  'use strict'
  Object.defineProperty(Tr, '__esModule', { value: !0 })
  var Mf = require('stream'),
    Nf = Er(),
    Df = gt(),
    No = class extends Df.default {
      constructor() {
        super(...arguments)
        this._reader = new Nf.default(this._settings)
      }
      read(t) {
        let r = this._getRootDirectory(t),
          n = this._getReaderOptions(t),
          s = this.api(r, t, n),
          i = new Mf.Readable({ objectMode: !0, read: () => {} })
        return (
          s
            .once('error', (o) => i.emit('error', o))
            .on('data', (o) => i.emit('data', n.transform(o)))
            .once('end', () => i.emit('end')),
          i.once('close', () => s.destroy()),
          i
        )
      }
      api(t, r, n) {
        return r.dynamic ? this._reader.dynamic(t, n) : this._reader.static(r.patterns, n)
      }
    }
  Tr.default = No
})
var Fo = S((Or) => {
  'use strict'
  Object.defineProperty(Or, '__esModule', { value: !0 })
  var qf = Re(),
    Ff = gr(),
    If = mr(),
    qo = class extends If.default {
      constructor() {
        super(...arguments)
        ;(this._walkSync = Ff.walkSync), (this._statSync = qf.statSync)
      }
      dynamic(t, r) {
        return this._walkSync(t, r)
      }
      static(t, r) {
        let n = []
        for (let s of t) {
          let i = this._getFullEntryPath(s),
            o = this._getEntry(i, s, r)
          o === null || !r.entryFilter(o) || n.push(o)
        }
        return n
      }
      _getEntry(t, r, n) {
        try {
          let s = this._getStat(t)
          return this._makeEntry(s, r)
        } catch (s) {
          if (n.errorFilter(s)) return null
          throw s
        }
      }
      _getStat(t) {
        return this._statSync(t, this._fsStatSettings)
      }
    }
  Or.default = qo
})
var Bo = S((Lr) => {
  'use strict'
  Object.defineProperty(Lr, '__esModule', { value: !0 })
  var Bf = Fo(),
    jf = gt(),
    Io = class extends jf.default {
      constructor() {
        super(...arguments)
        this._reader = new Bf.default(this._settings)
      }
      read(t) {
        let r = this._getRootDirectory(t),
          n = this._getReaderOptions(t)
        return this.api(r, t, n).map(n.transform)
      }
      api(t, r, n) {
        return r.dynamic ? this._reader.dynamic(t, n) : this._reader.static(r.patterns, n)
      }
    }
  Lr.default = Io
})
var Go = S(($e) => {
  'use strict'
  Object.defineProperty($e, '__esModule', { value: !0 })
  $e.DEFAULT_FILE_SYSTEM_ADAPTER = void 0
  var Me = require('fs'),
    Gf = require('os'),
    Uf = Math.max(Gf.cpus().length, 1)
  $e.DEFAULT_FILE_SYSTEM_ADAPTER = {
    lstat: Me.lstat,
    lstatSync: Me.lstatSync,
    stat: Me.stat,
    statSync: Me.statSync,
    readdir: Me.readdir,
    readdirSync: Me.readdirSync,
  }
  var jo = class {
    constructor(t = {}) {
      ;(this._options = t),
        (this.absolute = this._getValue(this._options.absolute, !1)),
        (this.baseNameMatch = this._getValue(this._options.baseNameMatch, !1)),
        (this.braceExpansion = this._getValue(this._options.braceExpansion, !0)),
        (this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, !0)),
        (this.concurrency = this._getValue(this._options.concurrency, Uf)),
        (this.cwd = this._getValue(this._options.cwd, process.cwd())),
        (this.deep = this._getValue(this._options.deep, Infinity)),
        (this.dot = this._getValue(this._options.dot, !1)),
        (this.extglob = this._getValue(this._options.extglob, !0)),
        (this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, !0)),
        (this.fs = this._getFileSystemMethods(this._options.fs)),
        (this.globstar = this._getValue(this._options.globstar, !0)),
        (this.ignore = this._getValue(this._options.ignore, [])),
        (this.markDirectories = this._getValue(this._options.markDirectories, !1)),
        (this.objectMode = this._getValue(this._options.objectMode, !1)),
        (this.onlyDirectories = this._getValue(this._options.onlyDirectories, !1)),
        (this.onlyFiles = this._getValue(this._options.onlyFiles, !0)),
        (this.stats = this._getValue(this._options.stats, !1)),
        (this.suppressErrors = this._getValue(this._options.suppressErrors, !1)),
        (this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, !1)),
        (this.unique = this._getValue(this._options.unique, !0)),
        this.onlyDirectories && (this.onlyFiles = !1),
        this.stats && (this.objectMode = !0)
    }
    _getValue(t, r) {
      return t === void 0 ? r : t
    }
    _getFileSystemMethods(t = {}) {
      return Object.assign(Object.assign({}, $e.DEFAULT_FILE_SYSTEM_ADAPTER), t)
    }
  }
  $e.default = jo
})
var Ko = S((qh, Uo) => {
  'use strict'
  var Wo = Ei(),
    Wf = Mo(),
    Kf = Do(),
    Vf = Bo(),
    kr = Go(),
    xe = pe()
  async function $r(e, t) {
    Ne(e)
    let r = Hr(e, Wf.default, t),
      n = await Promise.all(r)
    return xe.array.flatten(n)
  }
  ;(function (e) {
    function t(o, a) {
      Ne(o)
      let u = Hr(o, Vf.default, a)
      return xe.array.flatten(u)
    }
    e.sync = t
    function r(o, a) {
      Ne(o)
      let u = Hr(o, Kf.default, a)
      return xe.stream.merge(u)
    }
    e.stream = r
    function n(o, a) {
      Ne(o)
      let u = [].concat(o),
        _ = new kr.default(a)
      return Wo.generate(u, _)
    }
    e.generateTasks = n
    function s(o, a) {
      Ne(o)
      let u = new kr.default(a)
      return xe.pattern.isDynamicPattern(o, u)
    }
    e.isDynamicPattern = s
    function i(o) {
      return Ne(o), xe.path.escape(o)
    }
    e.escapePath = i
  })($r || ($r = {}))
  function Hr(e, t, r) {
    let n = [].concat(e),
      s = new kr.default(r),
      i = Wo.generate(n, s),
      o = new t(s)
    return i.map(o.read, o)
  }
  function Ne(e) {
    if (![].concat(e).every((n) => xe.string.isString(n) && !xe.string.isEmpty(n)))
      throw new TypeError('Patterns must be a string (non empty) or an array of strings')
  }
  Uo.exports = $r
})
var Xo = S((y) => {
  'use strict'
  Object.defineProperty(y, '__esModule', { value: !0 })
  y.link = y.ansi256Bg = y.ansi256 = y.bgLightGray = y.bgLightCyan = y.bgLightMagenta = y.bgLightBlue = y.bgLightYellow = y.bgLightGreen = y.bgLightRed = y.bgGray = y.bgWhite = y.bgCyan = y.bgMagenta = y.bgBlue = y.bgYellow = y.bgGreen = y.bgRed = y.bgBlack = y.lightCyan = y.lightMagenta = y.lightBlue = y.lightYellow = y.lightGreen = y.lightRed = y.lightGray = y.gray = y.white = y.cyan = y.magenta = y.blue = y.yellow = y.green = y.red = y.black = y.strikethrough = y.hidden = y.inverse = y.underline = y.italic = y.dim = y.bold = y.reset = y.stripColors = y.options = void 0
  var Mr = !0,
    yt =
      typeof self != 'undefined'
        ? self
        : typeof window != 'undefined'
        ? window
        : typeof global != 'undefined'
        ? global
        : {},
    Vo = 0
  if (yt.process && yt.process.env && yt.process.stdout) {
    let { FORCE_COLOR: e, NODE_DISABLE_COLORS: t, TERM: r } = yt.process.env
    ;(Mr = !t && r !== 'dumb' && e !== '0' && process.stdout.isTTY), Mr && (Vo = r && r.endsWith('-256color') ? 2 : 1)
  }
  y.options = { enabled: Mr, supportLevel: Vo }
  function P(e, t, r = 1) {
    let n = `[${e}m`,
      s = `[${t}m`,
      i = new RegExp(`\\x1b\\[${t}m`, 'g')
    return (o) => (y.options.enabled && y.options.supportLevel >= r ? n + ('' + o).replace(i, n) + s : '' + o)
  }
  function Yf(e) {
    return ('' + e).replace(/\x1b\[[0-9;]+m/g, '').replace(/\x1b\]8;;.*?\x07(.*?)\x1b\]8;;\x07/g, (t, r) => r)
  }
  y.stripColors = Yf
  y.reset = P(0, 0)
  y.bold = P(1, 22)
  y.dim = P(2, 22)
  y.italic = P(3, 23)
  y.underline = P(4, 24)
  y.inverse = P(7, 27)
  y.hidden = P(8, 28)
  y.strikethrough = P(9, 29)
  y.black = P(30, 39)
  y.red = P(31, 39)
  y.green = P(32, 39)
  y.yellow = P(33, 39)
  y.blue = P(34, 39)
  y.magenta = P(35, 39)
  y.cyan = P(36, 39)
  y.white = P(97, 39)
  y.gray = P(90, 39)
  y.lightGray = P(37, 39)
  y.lightRed = P(91, 39)
  y.lightGreen = P(92, 39)
  y.lightYellow = P(93, 39)
  y.lightBlue = P(94, 39)
  y.lightMagenta = P(95, 39)
  y.lightCyan = P(96, 39)
  y.bgBlack = P(40, 49)
  y.bgRed = P(41, 49)
  y.bgGreen = P(42, 49)
  y.bgYellow = P(43, 49)
  y.bgBlue = P(44, 49)
  y.bgMagenta = P(45, 49)
  y.bgCyan = P(46, 49)
  y.bgWhite = P(107, 49)
  y.bgGray = P(100, 49)
  y.bgLightRed = P(101, 49)
  y.bgLightGreen = P(102, 49)
  y.bgLightYellow = P(103, 49)
  y.bgLightBlue = P(104, 49)
  y.bgLightMagenta = P(105, 49)
  y.bgLightCyan = P(106, 49)
  y.bgLightGray = P(47, 49)
  var Qf = (e) => P('38;5;' + e, 0, 2)
  y.ansi256 = Qf
  var Xf = (e) => P('48;5;' + e, 0, 2)
  y.ansi256Bg = Xf
  var Yo = ']',
    Qo = '\x07',
    mt = ';'
  function Zf(e, t) {
    return y.options.enabled ? Yo + '8' + mt + mt + t + Qo + e + Yo + '8' + mt + mt + Qo : `${e} (\u200B${t}\u200B)`
  }
  y.link = Zf
})
var ra = he(require('fs')),
  na = he(Br()),
  sa = he(require('path'))
var Zo = he(On()),
  zo = he(require('esbuild')),
  Jo = he(Ko()),
  re = he(Xo()),
  ea = he(require('path'))
async function zf(e) {
  let t = process.cwd()
  return (
    await Promise.all(
      e.map((n) => {
        let s = ea.default.resolve(t, n)
        return (0, Jo.default)(s)
      }),
    )
  ).flat()
}
function Jf(e) {
  return e > 1e3 ? `${e / 1e3}s` : `${e}ms`
}
function ta(e) {
  console.log(`${(0, re.bgCyan)((0, re.black)(' TASK '))} ${(0, re.cyan)(e)}`)
  let t = Date.now()
  return {
    end() {
      let r = Date.now() - t
      console.log(`${(0, re.bgGreen)((0, re.black)(' DONE '))} ${(0, re.green)(`${e} - ${Jf(r)}`)}`)
    },
  }
}
async function Nr({ entries: e, checkTypes: t = !1, formats: r = ['cjs'], options: n }) {
  let s = await zf(e)
  if (t) {
    let o = ta('CHECKING TYPES')
    Zo.default.sync('tsc', { cwd: process.cwd(), stdio: 'inherit' }), o.end()
  }
  let i = ta('BUILDING')
  await Promise.all(
    r.map((o) =>
      zo.default.build({
        entryPoints: s,
        outdir: 'dist',
        platform: 'node',
        format: o,
        target: 'node10',
        logLevel: 'info',
        outExtension: { '.js': o === 'cjs' || o === 'iife' ? '.js' : '.esm.js' },
        ...n,
      }),
    ),
  ),
    i.end()
}
var Dr = (0, na.default)(process.argv.slice(2))
Dr.version &&
  (console.log(
    JSON.parse(ra.default.readFileSync(sa.default.resolve(__dirname, '../package.json')).toString('utf8')).version,
  ),
  process.exit(0))
var ep = Dr._,
  { _: jh, '--': Gh, 'check-types': tp, format: qr, ...rp } = Dr,
  np = typeof qr == 'string' ? [qr] : qr
Nr({ entries: ep, checkTypes: tp, formats: np, options: rp })
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
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
