#!/usr/bin/env node
var aa = Object.create
var Et = Object.defineProperty
var ua = Object.getOwnPropertyDescriptor
var ca = Object.getOwnPropertyNames
var la = Object.getPrototypeOf,
  fa = Object.prototype.hasOwnProperty
var pa = (e) => Et(e, '__esModule', { value: !0 })
var y = (e, t) => () => t || e((t = { exports: {} }).exports, t), t.exports
var ha = (e, t, r) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let n of ca(t))
        !fa.call(e, n) &&
          n !== 'default' &&
          Et(e, n, {
            get: () => t[n],
            enumerable: !(r = ua(t, n)) || r.enumerable,
          })
    return e
  },
  Se = (e) =>
    ha(
      pa(
        Et(
          e != null ? aa(la(e)) : {},
          'default',
          e && e.__esModule && 'default' in e
            ? { get: () => e.default, enumerable: !0 }
            : { value: e, enumerable: !0 },
        ),
      ),
      e,
    )
var Kr = y((Vf, Wr) => {
  Wr.exports = function (e, t) {
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
        n[R].forEach(function (A) {
          n[A] = [R].concat(
            n[R].filter(function ($) {
              return A !== $
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
    e.indexOf('--') !== -1 &&
      ((o = e.slice(e.indexOf('--') + 1)), (e = e.slice(0, e.indexOf('--'))))
    function a(R, A) {
      return (
        (r.allBools && /^--[^=]+$/.test(A)) ||
        r.strings[R] ||
        r.bools[R] ||
        n[R]
      )
    }
    function u(R, A, $) {
      if (!($ && r.unknownFn && !a(R, $) && r.unknownFn($) === !1)) {
        var b = !r.strings[R] && Ur(A) ? Number(A) : A
        _(i, R.split('.'), b),
          (n[R] || []).forEach(function (P) {
            _(i, P.split('.'), b)
          })
      }
    }
    function _(R, A, $) {
      for (var b = R, P = 0; P < A.length - 1; P++) {
        var C = A[P]
        if (C === '__proto__') return
        b[C] === void 0 && (b[C] = {}),
          (b[C] === Object.prototype ||
            b[C] === Number.prototype ||
            b[C] === String.prototype) &&
            (b[C] = {}),
          b[C] === Array.prototype && (b[C] = []),
          (b = b[C])
      }
      var C = A[A.length - 1]
      C !== '__proto__' &&
        ((b === Object.prototype ||
          b === Number.prototype ||
          b === String.prototype) &&
          (b = {}),
        b === Array.prototype && (b = []),
        b[C] === void 0 || r.bools[C] || typeof b[C] == 'boolean'
          ? (b[C] = $)
          : Array.isArray(b[C])
          ? b[C].push($)
          : (b[C] = [b[C], $]))
    }
    function l(R) {
      return n[R].some(function (A) {
        return r.bools[A]
      })
    }
    for (var h = 0; h < e.length; h++) {
      var c = e[h]
      if (/^--.+=/.test(c)) {
        var T = c.match(/^--([^=]+)=([\s\S]*)$/),
          g = T[1],
          S = T[2]
        r.bools[g] && (S = S !== 'false'), u(g, S, c)
      } else if (/^--no-.+/.test(c)) {
        var g = c.match(/^--no-(.+)/)[1]
        u(g, !1, c)
      } else if (/^--.+/.test(c)) {
        var g = c.match(/^--(.+)/)[1],
          v = e[h + 1]
        v !== void 0 &&
        !/^-/.test(v) &&
        !r.bools[g] &&
        !r.allBools &&
        (n[g] ? !l(g) : !0)
          ? (u(g, v, c), h++)
          : /^(true|false)$/.test(v)
          ? (u(g, v === 'true', c), h++)
          : u(g, r.strings[g] ? '' : !0, c)
      } else if (/^-[^-]+/.test(c)) {
        for (
          var x = c.slice(1, -1).split(''), N = !1, L = 0;
          L < x.length;
          L++
        ) {
          var v = c.slice(L + 2)
          if (v === '-') {
            u(x[L], v, c)
            continue
          }
          if (/[A-Za-z]/.test(x[L]) && /=/.test(v)) {
            u(x[L], v.split('=')[1], c), (N = !0)
            break
          }
          if (/[A-Za-z]/.test(x[L]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(v)) {
            u(x[L], v, c), (N = !0)
            break
          }
          if (x[L + 1] && x[L + 1].match(/\W/)) {
            u(x[L], c.slice(L + 2), c), (N = !0)
            break
          } else u(x[L], r.strings[x[L]] ? '' : !0, c)
        }
        var g = c.slice(-1)[0]
        !N &&
          g !== '-' &&
          (e[h + 1] &&
          !/^(-|--)[^-]/.test(e[h + 1]) &&
          !r.bools[g] &&
          (n[g] ? !l(g) : !0)
            ? (u(g, e[h + 1], c), h++)
            : e[h + 1] && /^(true|false)$/.test(e[h + 1])
            ? (u(g, e[h + 1] === 'true', c), h++)
            : u(g, r.strings[g] ? '' : !0, c))
      } else if (
        ((!r.unknownFn || r.unknownFn(c) !== !1) &&
          i._.push(r.strings._ || !Ur(c) ? c : Number(c)),
        t.stopEarly)
      ) {
        i._.push.apply(i._, e.slice(h + 1))
        break
      }
    }
    return (
      Object.keys(s).forEach(function (R) {
        da(i, R.split('.')) ||
          (_(i, R.split('.'), s[R]),
          (n[R] || []).forEach(function (A) {
            _(i, A.split('.'), s[R])
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
  function Ur(e) {
    return typeof e == 'number' || /^0x[0-9a-f]+$/i.test(e)
      ? !0
      : /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(e)
  }
})
var Zr = y((Yf, Xr) => {
  Xr.exports = Qr
  Qr.sync = ga
  var Vr = require('fs')
  function _a(e, t) {
    var r = t.pathExt !== void 0 ? t.pathExt : process.env.PATHEXT
    if (!r || ((r = r.split(';')), r.indexOf('') !== -1)) return !0
    for (var n = 0; n < r.length; n++) {
      var s = r[n].toLowerCase()
      if (s && e.substr(-s.length).toLowerCase() === s) return !0
    }
    return !1
  }
  function Yr(e, t, r) {
    return !e.isSymbolicLink() && !e.isFile() ? !1 : _a(t, r)
  }
  function Qr(e, t, r) {
    Vr.stat(e, function (n, s) {
      r(n, n ? !1 : Yr(s, e, t))
    })
  }
  function ga(e, t) {
    return Yr(Vr.statSync(e), e, t)
  }
})
var rn = y((Qf, tn) => {
  tn.exports = Jr
  Jr.sync = ya
  var zr = require('fs')
  function Jr(e, t, r) {
    zr.stat(e, function (n, s) {
      r(n, n ? !1 : en(s, t))
    })
  }
  function ya(e, t) {
    return en(zr.statSync(e), t)
  }
  function en(e, t) {
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
      h =
        r & _ || (r & u && s === o) || (r & a && n === i) || (r & l && i === 0)
    return h
  }
})
var sn = y((Zf, nn) => {
  var Xf = require('fs'),
    Ke
  process.platform === 'win32' || global.TESTING_WINDOWS
    ? (Ke = Zr())
    : (Ke = rn())
  nn.exports = bt
  bt.sync = Sa
  function bt(e, t, r) {
    if ((typeof t == 'function' && ((r = t), (t = {})), !r)) {
      if (typeof Promise != 'function')
        throw new TypeError('callback not provided')
      return new Promise(function (n, s) {
        bt(e, t || {}, function (i, o) {
          i ? s(i) : n(o)
        })
      })
    }
    Ke(e, t || {}, function (n, s) {
      n &&
        (n.code === 'EACCES' || (t && t.ignoreErrors)) &&
        ((n = null), (s = !1)),
        r(n, s)
    })
  }
  function Sa(e, t) {
    try {
      return Ke.sync(e, t || {})
    } catch (r) {
      if ((t && t.ignoreErrors) || r.code === 'EACCES') return !1
      throw r
    }
  }
})
var pn = y((zf, fn) => {
  var xe =
      process.platform === 'win32' ||
      process.env.OSTYPE === 'cygwin' ||
      process.env.OSTYPE === 'msys',
    on = require('path'),
    Ea = xe ? ';' : ':',
    an = sn(),
    un = (e) => Object.assign(new Error(`not found: ${e}`), { code: 'ENOENT' }),
    cn = (e, t) => {
      let r = t.colon || Ea,
        n =
          e.match(/\//) || (xe && e.match(/\\/))
            ? ['']
            : [
                ...(xe ? [process.cwd()] : []),
                ...(t.path || process.env.PATH || '').split(r),
              ],
        s = xe ? t.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM' : '',
        i = xe ? s.split(r) : ['']
      return (
        xe && e.indexOf('.') !== -1 && i[0] !== '' && i.unshift(''),
        { pathEnv: n, pathExt: i, pathExtExe: s }
      )
    },
    ln = (e, t, r) => {
      typeof t == 'function' && ((r = t), (t = {})), t || (t = {})
      let { pathEnv: n, pathExt: s, pathExtExe: i } = cn(e, t),
        o = [],
        a = (_) =>
          new Promise((l, h) => {
            if (_ === n.length) return t.all && o.length ? l(o) : h(un(e))
            let c = n[_],
              T = /^".*"$/.test(c) ? c.slice(1, -1) : c,
              g = on.join(T, e),
              S = !T && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + g : g
            l(u(S, _, 0))
          }),
        u = (_, l, h) =>
          new Promise((c, T) => {
            if (h === s.length) return c(a(l + 1))
            let g = s[h]
            an(_ + g, { pathExt: i }, (S, v) => {
              if (!S && v)
                if (t.all) o.push(_ + g)
                else return c(_ + g)
              return c(u(_, l, h + 1))
            })
          })
      return r ? a(0).then((_) => r(null, _), r) : a(0)
    },
    ba = (e, t) => {
      t = t || {}
      let { pathEnv: r, pathExt: n, pathExtExe: s } = cn(e, t),
        i = []
      for (let o = 0; o < r.length; o++) {
        let a = r[o],
          u = /^".*"$/.test(a) ? a.slice(1, -1) : a,
          _ = on.join(u, e),
          l = !u && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + _ : _
        for (let h = 0; h < n.length; h++) {
          let c = l + n[h]
          try {
            if (an.sync(c, { pathExt: s }))
              if (t.all) i.push(c)
              else return c
          } catch (T) {}
        }
      }
      if (t.all && i.length) return i
      if (t.nothrow) return null
      throw un(e)
    }
  fn.exports = ln
  ln.sync = ba
})
var dn = y((Jf, vt) => {
  'use strict'
  var hn = (e = {}) => {
    let t = e.env || process.env
    return (e.platform || process.platform) !== 'win32'
      ? 'PATH'
      : Object.keys(t)
          .reverse()
          .find((n) => n.toUpperCase() === 'PATH') || 'Path'
  }
  vt.exports = hn
  vt.exports.default = hn
})
var mn = y((ep, yn) => {
  'use strict'
  var _n = require('path'),
    va = pn(),
    Aa = dn()
  function gn(e, t) {
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
      o = va.sync(e.command, {
        path: r[Aa({ env: r })],
        pathExt: t ? _n.delimiter : void 0,
      })
    } catch (a) {
    } finally {
      i && process.chdir(n)
    }
    return o && (o = _n.resolve(s ? e.options.cwd : '', o)), o
  }
  function Ra(e) {
    return gn(e) || gn(e, !0)
  }
  yn.exports = Ra
})
var Sn = y((tp, Rt) => {
  'use strict'
  var At = /([()\][%!^"`<>&|;, *?])/g
  function xa(e) {
    return (e = e.replace(At, '^$1')), e
  }
  function Pa(e, t) {
    return (
      (e = `${e}`),
      (e = e.replace(/(\\*)"/g, '$1$1\\"')),
      (e = e.replace(/(\\*)$/, '$1$1')),
      (e = `"${e}"`),
      (e = e.replace(At, '^$1')),
      t && (e = e.replace(At, '^$1')),
      e
    )
  }
  Rt.exports.command = xa
  Rt.exports.argument = Pa
})
var bn = y((rp, En) => {
  'use strict'
  En.exports = /^#!(.*)/
})
var An = y((np, vn) => {
  'use strict'
  var Ca = bn()
  vn.exports = (e = '') => {
    let t = e.match(Ca)
    if (!t) return null
    let [r, n] = t[0].replace(/#! ?/, '').split(' '),
      s = r.split('/').pop()
    return s === 'env' ? n : n ? `${s} ${n}` : s
  }
})
var xn = y((sp, Rn) => {
  'use strict'
  var xt = require('fs'),
    wa = An()
  function Ta(e) {
    let t = 150,
      r = Buffer.alloc(t),
      n
    try {
      ;(n = xt.openSync(e, 'r')), xt.readSync(n, r, 0, t, 0), xt.closeSync(n)
    } catch (s) {}
    return wa(r.toString())
  }
  Rn.exports = Ta
})
var Tn = y((ip, wn) => {
  'use strict'
  var Oa = require('path'),
    Pn = mn(),
    Cn = Sn(),
    La = xn(),
    ka = process.platform === 'win32',
    Ha = /\.(?:com|exe)$/i,
    $a = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i
  function Da(e) {
    e.file = Pn(e)
    let t = e.file && La(e.file)
    return t ? (e.args.unshift(e.file), (e.command = t), Pn(e)) : e.file
  }
  function Na(e) {
    if (!ka) return e
    let t = Da(e),
      r = !Ha.test(t)
    if (e.options.forceShell || r) {
      let n = $a.test(t)
      ;(e.command = Oa.normalize(e.command)),
        (e.command = Cn.command(e.command)),
        (e.args = e.args.map((i) => Cn.argument(i, n)))
      let s = [e.command].concat(e.args).join(' ')
      ;(e.args = ['/d', '/s', '/c', `"${s}"`]),
        (e.command = process.env.comspec || 'cmd.exe'),
        (e.options.windowsVerbatimArguments = !0)
    }
    return e
  }
  function Ma(e, t, r) {
    t && !Array.isArray(t) && ((r = t), (t = null)),
      (t = t ? t.slice(0) : []),
      (r = Object.assign({}, r))
    let n = {
      command: e,
      args: t,
      options: r,
      file: void 0,
      original: { command: e, args: t },
    }
    return r.shell ? n : Na(n)
  }
  wn.exports = Ma
})
var kn = y((op, Ln) => {
  'use strict'
  var Pt = process.platform === 'win32'
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
    if (!Pt) return
    let r = e.emit
    e.emit = function (n, s) {
      if (n === 'exit') {
        let i = On(s, t, 'spawn')
        if (i) return r.call(e, 'error', i)
      }
      return r.apply(e, arguments)
    }
  }
  function On(e, t) {
    return Pt && e === 1 && !t.file ? Ct(t.original, 'spawn') : null
  }
  function Ia(e, t) {
    return Pt && e === 1 && !t.file ? Ct(t.original, 'spawnSync') : null
  }
  Ln.exports = {
    hookChildProcess: qa,
    verifyENOENT: On,
    verifyENOENTSync: Ia,
    notFoundError: Ct,
  }
})
var Dn = y((ap, Pe) => {
  'use strict'
  var Hn = require('child_process'),
    wt = Tn(),
    Tt = kn()
  function $n(e, t, r) {
    let n = wt(e, t, r),
      s = Hn.spawn(n.command, n.args, n.options)
    return Tt.hookChildProcess(s, n), s
  }
  function Fa(e, t, r) {
    let n = wt(e, t, r),
      s = Hn.spawnSync(n.command, n.args, n.options)
    return (s.error = s.error || Tt.verifyENOENTSync(s.status, n)), s
  }
  Pe.exports = $n
  Pe.exports.spawn = $n
  Pe.exports.sync = Fa
  Pe.exports._parse = wt
  Pe.exports._enoent = Tt
})
var Nn = y((Ce) => {
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
var Mn = y((Ve) => {
  'use strict'
  Object.defineProperty(Ve, '__esModule', { value: !0 })
  Ve.isEnoentCodeError = void 0
  function Ga(e) {
    return e.code === 'ENOENT'
  }
  Ve.isEnoentCodeError = Ga
})
var In = y((Ye) => {
  'use strict'
  Object.defineProperty(Ye, '__esModule', { value: !0 })
  Ye.createDirentFromStats = void 0
  var qn = class {
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
    return new qn(e, t)
  }
  Ye.createDirentFromStats = Ua
})
var Fn = y((ne) => {
  'use strict'
  Object.defineProperty(ne, '__esModule', { value: !0 })
  ne.removeLeadingDotSegment = ne.escape = ne.makeAbsolute = ne.unixify = void 0
  var Wa = require('path'),
    Ka = 2,
    Va = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\())/g
  function Ya(e) {
    return e.replace(/\\/g, '/')
  }
  ne.unixify = Ya
  function Qa(e, t) {
    return Wa.resolve(e, t)
  }
  ne.makeAbsolute = Qa
  function Xa(e) {
    return e.replace(Va, '\\$2')
  }
  ne.escape = Xa
  function Za(e) {
    if (e.charAt(0) === '.') {
      let t = e.charAt(1)
      if (t === '/' || t === '\\') return e.slice(Ka)
    }
    return e
  }
  ne.removeLeadingDotSegment = Za
})
var jn = y((pp, Bn) => {
  Bn.exports = function (t) {
    if (typeof t != 'string' || t === '') return !1
    for (var r; (r = /(\\).|([@?!+*]\(.*\))/g.exec(t)); ) {
      if (r[2]) return !0
      t = t.slice(r.index + r[0].length)
    }
    return !1
  }
})
var Un = y((hp, Gn) => {
  var za = jn(),
    Ja = { '{': '}', '(': ')', '[': ']' },
    eu =
      /\\(.)|(^!|\*|[\].+)]\?|\[[^\\\]]+\]|\{[^\\}]+\}|\(\?[:!=][^\\)]+\)|\([^|]+\|[^\\)]+\))/,
    tu = /\\(.)|(^!|[*?{}()[\]]|\(\?)/
  Gn.exports = function (t, r) {
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
var Kn = y((dp, Wn) => {
  'use strict'
  var ru = Un(),
    nu = require('path').posix.dirname,
    su = require('os').platform() === 'win32',
    Ot = '/',
    iu = /\\/g,
    ou = /[\{\[].*[\}\]]$/,
    au = /(^|[^\\])([\{\[]|\([^\)]+$)/,
    uu = /\\([\!\*\?\|\[\]\(\)\{\}])/g
  Wn.exports = function (t, r) {
    var n = Object.assign({ flipBackslashes: !0 }, r)
    n.flipBackslashes && su && t.indexOf(Ot) < 0 && (t = t.replace(iu, Ot)),
      ou.test(t) && (t += Ot),
      (t += 'a')
    do t = nu(t)
    while (ru(t) || au.test(t))
    return t.replace(uu, '$1')
  }
})
var Qe = y((J) => {
  'use strict'
  J.isInteger = (e) =>
    typeof e == 'number'
      ? Number.isInteger(e)
      : typeof e == 'string' && e.trim() !== ''
      ? Number.isInteger(Number(e))
      : !1
  J.find = (e, t) => e.nodes.find((r) => r.type === t)
  J.exceedsLimit = (e, t, r = 1, n) =>
    n === !1 || !J.isInteger(e) || !J.isInteger(t)
      ? !1
      : (Number(t) - Number(e)) / Number(r) >= n
  J.escapeNode = (e, t = 0, r) => {
    let n = e.nodes[t]
    !n ||
      (((r && n.type === r) || n.type === 'open' || n.type === 'close') &&
        n.escaped !== !0 &&
        ((n.value = '\\' + n.value), (n.escaped = !0)))
  }
  J.encloseBrace = (e) =>
    e.type !== 'brace'
      ? !1
      : (e.commas >> (0 + e.ranges)) >> 0 == 0
      ? ((e.invalid = !0), !0)
      : !1
  J.isInvalidBrace = (e) =>
    e.type !== 'brace'
      ? !1
      : e.invalid === !0 || e.dollar
      ? !0
      : (e.commas >> (0 + e.ranges)) >> 0 == 0 ||
        e.open !== !0 ||
        e.close !== !0
      ? ((e.invalid = !0), !0)
      : !1
  J.isOpenOrClose = (e) =>
    e.type === 'open' || e.type === 'close'
      ? !0
      : e.open === !0 || e.close === !0
  J.reduce = (e) =>
    e.reduce(
      (t, r) => (
        r.type === 'text' && t.push(r.value),
        r.type === 'range' && (r.type = 'text'),
        t
      ),
      [],
    )
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
var Xe = y((gp, Yn) => {
  'use strict'
  var Vn = Qe()
  Yn.exports = (e, t = {}) => {
    let r = (n, s = {}) => {
      let i = t.escapeInvalid && Vn.isInvalidBrace(s),
        o = n.invalid === !0 && t.escapeInvalid === !0,
        a = ''
      if (n.value)
        return (i || o) && Vn.isOpenOrClose(n) ? '\\' + n.value : n.value
      if (n.value) return n.value
      if (n.nodes) for (let u of n.nodes) a += r(u)
      return a
    }
    return r(e)
  }
})
var Xn = y((yp, Qn) => {
  'use strict'
  Qn.exports = function (e) {
    return typeof e == 'number'
      ? e - e == 0
      : typeof e == 'string' && e.trim() !== ''
      ? Number.isFinite
        ? Number.isFinite(+e)
        : isFinite(+e)
      : !1
  }
})
var is = y((mp, ss) => {
  'use strict'
  var Zn = Xn(),
    Ee = (e, t, r) => {
      if (Zn(e) === !1)
        throw new TypeError(
          'toRegexRange: expected the first argument to be a number',
        )
      if (t === void 0 || e === t) return String(e)
      if (Zn(t) === !1)
        throw new TypeError(
          'toRegexRange: expected the second argument to be a number.',
        )
      let n = { relaxZeros: !0, ...r }
      typeof n.strictZeros == 'boolean' && (n.relaxZeros = n.strictZeros === !1)
      let s = String(n.relaxZeros),
        i = String(n.shorthand),
        o = String(n.capture),
        a = String(n.wrap),
        u = e + ':' + t + '=' + s + i + o + a
      if (Ee.cache.hasOwnProperty(u)) return Ee.cache[u].result
      let _ = Math.min(e, t),
        l = Math.max(e, t)
      if (Math.abs(_ - l) === 1) {
        let S = e + '|' + t
        return n.capture ? `(${S})` : n.wrap === !1 ? S : `(?:${S})`
      }
      let h = ns(e) || ns(t),
        c = { min: e, max: t, a: _, b: l },
        T = [],
        g = []
      if ((h && ((c.isPadded = h), (c.maxLen = String(c.max).length)), _ < 0)) {
        let S = l < 0 ? Math.abs(l) : 1
        ;(g = zn(S, Math.abs(_), c, n)), (_ = c.a = 0)
      }
      return (
        l >= 0 && (T = zn(_, l, c, n)),
        (c.negatives = g),
        (c.positives = T),
        (c.result = cu(g, T, n)),
        n.capture === !0
          ? (c.result = `(${c.result})`)
          : n.wrap !== !1 &&
            T.length + g.length > 1 &&
            (c.result = `(?:${c.result})`),
        (Ee.cache[u] = c),
        c.result
      )
    }
  function cu(e, t, r) {
    let n = Lt(e, t, '-', !1, r) || [],
      s = Lt(t, e, '', !1, r) || [],
      i = Lt(e, t, '-?', !0, r) || []
    return n.concat(i).concat(s).join('|')
  }
  function lu(e, t) {
    let r = 1,
      n = 1,
      s = es(e, r),
      i = new Set([t])
    for (; e <= s && s <= t; ) i.add(s), (r += 1), (s = es(e, r))
    for (s = ts(t + 1, n) - 1; e < s && s <= t; )
      i.add(s), (n += 1), (s = ts(t + 1, n) - 1)
    return (i = [...i]), i.sort(hu), i
  }
  function fu(e, t, r) {
    if (e === t) return { pattern: e, count: [], digits: 0 }
    let n = pu(e, t),
      s = n.length,
      i = '',
      o = 0
    for (let a = 0; a < s; a++) {
      let [u, _] = n[a]
      u === _ ? (i += u) : u !== '0' || _ !== '9' ? (i += du(u, _, r)) : o++
    }
    return (
      o && (i += r.shorthand === !0 ? '\\d' : '[0-9]'),
      { pattern: i, count: [o], digits: s }
    )
  }
  function zn(e, t, r, n) {
    let s = lu(e, t),
      i = [],
      o = e,
      a
    for (let u = 0; u < s.length; u++) {
      let _ = s[u],
        l = fu(String(o), String(_), n),
        h = ''
      if (!r.isPadded && a && a.pattern === l.pattern) {
        a.count.length > 1 && a.count.pop(),
          a.count.push(l.count[0]),
          (a.string = a.pattern + rs(a.count)),
          (o = _ + 1)
        continue
      }
      r.isPadded && (h = _u(_, r, n)),
        (l.string = h + l.pattern + rs(l.count)),
        i.push(l),
        (o = _ + 1),
        (a = l)
    }
    return i
  }
  function Lt(e, t, r, n, s) {
    let i = []
    for (let o of e) {
      let { string: a } = o
      !n && !Jn(t, 'string', a) && i.push(r + a),
        n && Jn(t, 'string', a) && i.push(r + a)
    }
    return i
  }
  function pu(e, t) {
    let r = []
    for (let n = 0; n < e.length; n++) r.push([e[n], t[n]])
    return r
  }
  function hu(e, t) {
    return e > t ? 1 : t > e ? -1 : 0
  }
  function Jn(e, t, r) {
    return e.some((n) => n[t] === r)
  }
  function es(e, t) {
    return Number(String(e).slice(0, -t) + '9'.repeat(t))
  }
  function ts(e, t) {
    return e - (e % Math.pow(10, t))
  }
  function rs(e) {
    let [t = 0, r = ''] = e
    return r || t > 1 ? `{${t + (r ? ',' + r : '')}}` : ''
  }
  function du(e, t, r) {
    return `[${e}${t - e == 1 ? '' : '-'}${t}]`
  }
  function ns(e) {
    return /^-?(0+)\d/.test(e)
  }
  function _u(e, t, r) {
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
  Ee.cache = {}
  Ee.clearCache = () => (Ee.cache = {})
  ss.exports = Ee
})
var $t = y((Sp, hs) => {
  'use strict'
  var gu = require('util'),
    os = is(),
    as = (e) => e !== null && typeof e == 'object' && !Array.isArray(e),
    yu = (e) => (t) => e === !0 ? Number(t) : String(t),
    kt = (e) => typeof e == 'number' || (typeof e == 'string' && e !== ''),
    qe = (e) => Number.isInteger(+e),
    Ht = (e) => {
      let t = `${e}`,
        r = -1
      if ((t[0] === '-' && (t = t.slice(1)), t === '0')) return !1
      for (; t[++r] === '0'; );
      return r > 0
    },
    mu = (e, t, r) =>
      typeof e == 'string' || typeof t == 'string' ? !0 : r.stringify === !0,
    Su = (e, t, r) => {
      if (t > 0) {
        let n = e[0] === '-' ? '-' : ''
        n && (e = e.slice(1)), (e = n + e.padStart(n ? t - 1 : t, '0'))
      }
      return r === !1 ? String(e) : e
    },
    us = (e, t) => {
      let r = e[0] === '-' ? '-' : ''
      for (r && ((e = e.slice(1)), t--); e.length < t; ) e = '0' + e
      return r ? '-' + e : e
    },
    Eu = (e, t) => {
      e.negatives.sort((o, a) => (o < a ? -1 : o > a ? 1 : 0)),
        e.positives.sort((o, a) => (o < a ? -1 : o > a ? 1 : 0))
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
    cs = (e, t, r, n) => {
      if (r) return os(e, t, { wrap: !1, ...n })
      let s = String.fromCharCode(e)
      if (e === t) return s
      let i = String.fromCharCode(t)
      return `[${s}-${i}]`
    },
    ls = (e, t, r) => {
      if (Array.isArray(e)) {
        let n = r.wrap === !0,
          s = r.capture ? '' : '?:'
        return n ? `(${s}${e.join('|')})` : e.join('|')
      }
      return os(e, t, r)
    },
    fs = (...e) =>
      new RangeError('Invalid range arguments: ' + gu.inspect(...e)),
    ps = (e, t, r) => {
      if (r.strictRanges === !0) throw fs([e, t])
      return []
    },
    bu = (e, t) => {
      if (t.strictRanges === !0)
        throw new TypeError(`Expected step "${e}" to be a number`)
      return []
    },
    vu = (e, t, r = 1, n = {}) => {
      let s = Number(e),
        i = Number(t)
      if (!Number.isInteger(s) || !Number.isInteger(i)) {
        if (n.strictRanges === !0) throw fs([e, t])
        return []
      }
      s === 0 && (s = 0), i === 0 && (i = 0)
      let o = s > i,
        a = String(e),
        u = String(t),
        _ = String(r)
      r = Math.max(Math.abs(r), 1)
      let l = Ht(a) || Ht(u) || Ht(_),
        h = l ? Math.max(a.length, u.length, _.length) : 0,
        c = l === !1 && mu(e, t, n) === !1,
        T = n.transform || yu(c)
      if (n.toRegex && r === 1) return cs(us(e, h), us(t, h), !0, n)
      let g = { negatives: [], positives: [] },
        S = (N) => g[N < 0 ? 'negatives' : 'positives'].push(Math.abs(N)),
        v = [],
        x = 0
      for (; o ? s >= i : s <= i; )
        n.toRegex === !0 && r > 1 ? S(s) : v.push(Su(T(s, x), h, c)),
          (s = o ? s - r : s + r),
          x++
      return n.toRegex === !0
        ? r > 1
          ? Eu(g, n)
          : ls(v, null, { wrap: !1, ...n })
        : v
    },
    Au = (e, t, r = 1, n = {}) => {
      if ((!qe(e) && e.length > 1) || (!qe(t) && t.length > 1))
        return ps(e, t, n)
      let s = n.transform || ((c) => String.fromCharCode(c)),
        i = `${e}`.charCodeAt(0),
        o = `${t}`.charCodeAt(0),
        a = i > o,
        u = Math.min(i, o),
        _ = Math.max(i, o)
      if (n.toRegex && r === 1) return cs(u, _, !1, n)
      let l = [],
        h = 0
      for (; a ? i >= o : i <= o; )
        l.push(s(i, h)), (i = a ? i - r : i + r), h++
      return n.toRegex === !0 ? ls(l, null, { wrap: !1, options: n }) : l
    },
    Ze = (e, t, r, n = {}) => {
      if (t == null && kt(e)) return [e]
      if (!kt(e) || !kt(t)) return ps(e, t, n)
      if (typeof r == 'function') return Ze(e, t, 1, { transform: r })
      if (as(r)) return Ze(e, t, 0, r)
      let s = { ...n }
      return (
        s.capture === !0 && (s.wrap = !0),
        (r = r || s.step || 1),
        qe(r)
          ? qe(e) && qe(t)
            ? vu(e, t, r, s)
            : Au(e, t, Math.max(Math.abs(r), 1), s)
          : r != null && !as(r)
          ? bu(r, s)
          : Ze(e, t, 1, r)
      )
    }
  hs.exports = Ze
})
var gs = y((Ep, _s) => {
  'use strict'
  var Ru = $t(),
    ds = Qe(),
    xu = (e, t = {}) => {
      let r = (n, s = {}) => {
        let i = ds.isInvalidBrace(s),
          o = n.invalid === !0 && t.escapeInvalid === !0,
          a = i === !0 || o === !0,
          u = t.escapeInvalid === !0 ? '\\' : '',
          _ = ''
        if (n.isOpen === !0 || n.isClose === !0) return u + n.value
        if (n.type === 'open') return a ? u + n.value : '('
        if (n.type === 'close') return a ? u + n.value : ')'
        if (n.type === 'comma')
          return n.prev.type === 'comma' ? '' : a ? n.value : '|'
        if (n.value) return n.value
        if (n.nodes && n.ranges > 0) {
          let l = ds.reduce(n.nodes),
            h = Ru(...l, { ...t, wrap: !1, toRegex: !0 })
          if (h.length !== 0) return l.length > 1 && h.length > 1 ? `(${h})` : h
        }
        if (n.nodes) for (let l of n.nodes) _ += r(l, n)
        return _
      }
      return r(e)
    }
  _s.exports = xu
})
var Ss = y((bp, ms) => {
  'use strict'
  var Pu = $t(),
    ys = Xe(),
    we = Qe(),
    be = (e = '', t = '', r = !1) => {
      let n = []
      if (((e = [].concat(e)), (t = [].concat(t)), !t.length)) return e
      if (!e.length) return r ? we.flatten(t).map((s) => `{${s}}`) : t
      for (let s of e)
        if (Array.isArray(s)) for (let i of s) n.push(be(i, t, r))
        else
          for (let i of t)
            r === !0 && typeof i == 'string' && (i = `{${i}}`),
              n.push(Array.isArray(i) ? be(s, i, r) : s + i)
      return we.flatten(n)
    },
    Cu = (e, t = {}) => {
      let r = t.rangeLimit === void 0 ? 1e3 : t.rangeLimit,
        n = (s, i = {}) => {
          s.queue = []
          let o = i,
            a = i.queue
          for (; o.type !== 'brace' && o.type !== 'root' && o.parent; )
            (o = o.parent), (a = o.queue)
          if (s.invalid || s.dollar) {
            a.push(be(a.pop(), ys(s, t)))
            return
          }
          if (s.type === 'brace' && s.invalid !== !0 && s.nodes.length === 2) {
            a.push(be(a.pop(), ['{}']))
            return
          }
          if (s.nodes && s.ranges > 0) {
            let h = we.reduce(s.nodes)
            if (we.exceedsLimit(...h, t.step, r))
              throw new RangeError(
                'expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.',
              )
            let c = Pu(...h, t)
            c.length === 0 && (c = ys(s, t)),
              a.push(be(a.pop(), c)),
              (s.nodes = [])
            return
          }
          let u = we.encloseBrace(s),
            _ = s.queue,
            l = s
          for (; l.type !== 'brace' && l.type !== 'root' && l.parent; )
            (l = l.parent), (_ = l.queue)
          for (let h = 0; h < s.nodes.length; h++) {
            let c = s.nodes[h]
            if (c.type === 'comma' && s.type === 'brace') {
              h === 1 && _.push(''), _.push('')
              continue
            }
            if (c.type === 'close') {
              a.push(be(a.pop(), _, u))
              continue
            }
            if (c.value && c.type !== 'open') {
              _.push(be(_.pop(), c.value))
              continue
            }
            c.nodes && n(c, s)
          }
          return _
        }
      return we.flatten(n(e))
    }
  ms.exports = Cu
})
var bs = y((vp, Es) => {
  'use strict'
  Es.exports = {
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
var Ps = y((Ap, xs) => {
  'use strict'
  var wu = Xe(),
    {
      MAX_LENGTH: vs,
      CHAR_BACKSLASH: Dt,
      CHAR_BACKTICK: Tu,
      CHAR_COMMA: Ou,
      CHAR_DOT: Lu,
      CHAR_LEFT_PARENTHESES: ku,
      CHAR_RIGHT_PARENTHESES: Hu,
      CHAR_LEFT_CURLY_BRACE: $u,
      CHAR_RIGHT_CURLY_BRACE: Du,
      CHAR_LEFT_SQUARE_BRACKET: As,
      CHAR_RIGHT_SQUARE_BRACKET: Rs,
      CHAR_DOUBLE_QUOTE: Nu,
      CHAR_SINGLE_QUOTE: Mu,
      CHAR_NO_BREAK_SPACE: qu,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: Iu,
    } = bs(),
    Fu = (e, t = {}) => {
      if (typeof e != 'string') throw new TypeError('Expected a string')
      let r = t || {},
        n = typeof r.maxLength == 'number' ? Math.min(vs, r.maxLength) : vs
      if (e.length > n)
        throw new SyntaxError(
          `Input length (${e.length}), exceeds max characters (${n})`,
        )
      let s = { type: 'root', input: e, nodes: [] },
        i = [s],
        o = s,
        a = s,
        u = 0,
        _ = e.length,
        l = 0,
        h = 0,
        c,
        T = {},
        g = () => e[l++],
        S = (v) => {
          if (
            (v.type === 'text' && a.type === 'dot' && (a.type = 'text'),
            a && a.type === 'text' && v.type === 'text')
          ) {
            a.value += v.value
            return
          }
          return o.nodes.push(v), (v.parent = o), (v.prev = a), (a = v), v
        }
      for (S({ type: 'bos' }); l < _; )
        if (((o = i[i.length - 1]), (c = g()), !(c === Iu || c === qu))) {
          if (c === Dt) {
            S({ type: 'text', value: (t.keepEscaping ? c : '') + g() })
            continue
          }
          if (c === Rs) {
            S({ type: 'text', value: '\\' + c })
            continue
          }
          if (c === As) {
            u++
            let v = !0,
              x
            for (; l < _ && (x = g()); ) {
              if (((c += x), x === As)) {
                u++
                continue
              }
              if (x === Dt) {
                c += g()
                continue
              }
              if (x === Rs && (u--, u === 0)) break
            }
            S({ type: 'text', value: c })
            continue
          }
          if (c === ku) {
            ;(o = S({ type: 'paren', nodes: [] })),
              i.push(o),
              S({ type: 'text', value: c })
            continue
          }
          if (c === Hu) {
            if (o.type !== 'paren') {
              S({ type: 'text', value: c })
              continue
            }
            ;(o = i.pop()), S({ type: 'text', value: c }), (o = i[i.length - 1])
            continue
          }
          if (c === Nu || c === Mu || c === Tu) {
            let v = c,
              x
            for (t.keepQuotes !== !0 && (c = ''); l < _ && (x = g()); ) {
              if (x === Dt) {
                c += x + g()
                continue
              }
              if (x === v) {
                t.keepQuotes === !0 && (c += x)
                break
              }
              c += x
            }
            S({ type: 'text', value: c })
            continue
          }
          if (c === $u) {
            h++
            let v = (a.value && a.value.slice(-1) === '$') || o.dollar === !0
            ;(o = S({
              type: 'brace',
              open: !0,
              close: !1,
              dollar: v,
              depth: h,
              commas: 0,
              ranges: 0,
              nodes: [],
            })),
              i.push(o),
              S({ type: 'open', value: c })
            continue
          }
          if (c === Du) {
            if (o.type !== 'brace') {
              S({ type: 'text', value: c })
              continue
            }
            let v = 'close'
            ;(o = i.pop()),
              (o.close = !0),
              S({ type: v, value: c }),
              h--,
              (o = i[i.length - 1])
            continue
          }
          if (c === Ou && h > 0) {
            if (o.ranges > 0) {
              o.ranges = 0
              let v = o.nodes.shift()
              o.nodes = [v, { type: 'text', value: wu(o) }]
            }
            S({ type: 'comma', value: c }), o.commas++
            continue
          }
          if (c === Lu && h > 0 && o.commas === 0) {
            let v = o.nodes
            if (h === 0 || v.length === 0) {
              S({ type: 'text', value: c })
              continue
            }
            if (a.type === 'dot') {
              if (
                ((o.range = []),
                (a.value += c),
                (a.type = 'range'),
                o.nodes.length !== 3 && o.nodes.length !== 5)
              ) {
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
            S({ type: 'dot', value: c })
            continue
          }
          S({ type: 'text', value: c })
        }
      do
        if (((o = i.pop()), o.type !== 'root')) {
          o.nodes.forEach((N) => {
            N.nodes ||
              (N.type === 'open' && (N.isOpen = !0),
              N.type === 'close' && (N.isClose = !0),
              N.nodes || (N.type = 'text'),
              (N.invalid = !0))
          })
          let v = i[i.length - 1],
            x = v.nodes.indexOf(o)
          v.nodes.splice(x, 1, ...o.nodes)
        }
      while (i.length > 0)
      return S({ type: 'eos' }), s
    }
  xs.exports = Fu
})
var Ts = y((Rp, ws) => {
  'use strict'
  var Cs = Xe(),
    Bu = gs(),
    ju = Ss(),
    Gu = Ps(),
    Z = (e, t = {}) => {
      let r = []
      if (Array.isArray(e))
        for (let n of e) {
          let s = Z.create(n, t)
          Array.isArray(s) ? r.push(...s) : r.push(s)
        }
      else r = [].concat(Z.create(e, t))
      return (
        t && t.expand === !0 && t.nodupes === !0 && (r = [...new Set(r)]), r
      )
    }
  Z.parse = (e, t = {}) => Gu(e, t)
  Z.stringify = (e, t = {}) => Cs(typeof e == 'string' ? Z.parse(e, t) : e, t)
  Z.compile = (e, t = {}) => (
    typeof e == 'string' && (e = Z.parse(e, t)), Bu(e, t)
  )
  Z.expand = (e, t = {}) => {
    typeof e == 'string' && (e = Z.parse(e, t))
    let r = ju(e, t)
    return (
      t.noempty === !0 && (r = r.filter(Boolean)),
      t.nodupes === !0 && (r = [...new Set(r)]),
      r
    )
  }
  Z.create = (e, t = {}) =>
    e === '' || e.length < 3
      ? [e]
      : t.expand !== !0
      ? Z.compile(e, t)
      : Z.expand(e, t)
  ws.exports = Z
})
var Ie = y((xp, $s) => {
  'use strict'
  var Uu = require('path'),
    se = '\\\\/',
    Os = `[^${se}]`,
    ue = '\\.',
    Wu = '\\+',
    Ku = '\\?',
    ze = '\\/',
    Vu = '(?=.)',
    Ls = '[^/]',
    Nt = `(?:${ze}|$)`,
    ks = `(?:^|${ze})`,
    Mt = `${ue}{1,2}${Nt}`,
    Yu = `(?!${ue})`,
    Qu = `(?!${ks}${Mt})`,
    Xu = `(?!${ue}{0,1}${Nt})`,
    Zu = `(?!${Mt})`,
    zu = `[^.${ze}]`,
    Ju = `${Ls}*?`,
    Hs = {
      DOT_LITERAL: ue,
      PLUS_LITERAL: Wu,
      QMARK_LITERAL: Ku,
      SLASH_LITERAL: ze,
      ONE_CHAR: Vu,
      QMARK: Ls,
      END_ANCHOR: Nt,
      DOTS_SLASH: Mt,
      NO_DOT: Yu,
      NO_DOTS: Qu,
      NO_DOT_SLASH: Xu,
      NO_DOTS_SLASH: Zu,
      QMARK_NO_DOT: zu,
      STAR: Ju,
      START_ANCHOR: ks,
    },
    ec = {
      ...Hs,
      SLASH_LITERAL: `[${se}]`,
      QMARK: Os,
      STAR: `${Os}*?`,
      DOTS_SLASH: `${ue}{1,2}(?:[${se}]|$)`,
      NO_DOT: `(?!${ue})`,
      NO_DOTS: `(?!(?:^|[${se}])${ue}{1,2}(?:[${se}]|$))`,
      NO_DOT_SLASH: `(?!${ue}{0,1}(?:[${se}]|$))`,
      NO_DOTS_SLASH: `(?!${ue}{1,2}(?:[${se}]|$))`,
      QMARK_NO_DOT: `[^.${se}]`,
      START_ANCHOR: `(?:^|[${se}])`,
      END_ANCHOR: `(?:[${se}]|$)`,
    },
    tc = {
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
  $s.exports = {
    MAX_LENGTH: 1024 * 64,
    POSIX_REGEX_SOURCE: tc,
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
    SEP: Uu.sep,
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
      return e === !0 ? ec : Hs
    },
  }
})
var Fe = y((Q) => {
  'use strict'
  var rc = require('path'),
    nc = process.platform === 'win32',
    {
      REGEX_BACKSLASH: sc,
      REGEX_REMOVE_BACKSLASH: ic,
      REGEX_SPECIAL_CHARS: oc,
      REGEX_SPECIAL_CHARS_GLOBAL: ac,
    } = Ie()
  Q.isObject = (e) => e !== null && typeof e == 'object' && !Array.isArray(e)
  Q.hasRegexChars = (e) => oc.test(e)
  Q.isRegexChar = (e) => e.length === 1 && Q.hasRegexChars(e)
  Q.escapeRegex = (e) => e.replace(ac, '\\$1')
  Q.toPosixSlashes = (e) => e.replace(sc, '/')
  Q.removeBackslashes = (e) => e.replace(ic, (t) => (t === '\\' ? '' : t))
  Q.supportsLookbehinds = () => {
    let e = process.version.slice(1).split('.').map(Number)
    return (e.length === 3 && e[0] >= 9) || (e[0] === 8 && e[1] >= 10)
  }
  Q.isWindows = (e) =>
    e && typeof e.windows == 'boolean'
      ? e.windows
      : nc === !0 || rc.sep === '\\'
  Q.escapeLast = (e, t, r) => {
    let n = e.lastIndexOf(t, r)
    return n === -1
      ? e
      : e[n - 1] === '\\'
      ? Q.escapeLast(e, t, n - 1)
      : `${e.slice(0, n)}\\${e.slice(n)}`
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
var js = y((Cp, Bs) => {
  'use strict'
  var Ds = Fe(),
    {
      CHAR_ASTERISK: qt,
      CHAR_AT: uc,
      CHAR_BACKWARD_SLASH: Be,
      CHAR_COMMA: cc,
      CHAR_DOT: It,
      CHAR_EXCLAMATION_MARK: Ft,
      CHAR_FORWARD_SLASH: Ns,
      CHAR_LEFT_CURLY_BRACE: Bt,
      CHAR_LEFT_PARENTHESES: jt,
      CHAR_LEFT_SQUARE_BRACKET: lc,
      CHAR_PLUS: fc,
      CHAR_QUESTION_MARK: Ms,
      CHAR_RIGHT_CURLY_BRACE: pc,
      CHAR_RIGHT_PARENTHESES: qs,
      CHAR_RIGHT_SQUARE_BRACKET: hc,
    } = Ie(),
    Is = (e) => e === Ns || e === Be,
    Fs = (e) => {
      e.isPrefix !== !0 && (e.depth = e.isGlobstar ? 1 / 0 : 1)
    },
    dc = (e, t) => {
      let r = t || {},
        n = e.length - 1,
        s = r.parts === !0 || r.scanToEnd === !0,
        i = [],
        o = [],
        a = [],
        u = e,
        _ = -1,
        l = 0,
        h = 0,
        c = !1,
        T = !1,
        g = !1,
        S = !1,
        v = !1,
        x = !1,
        N = !1,
        L = !1,
        R = !1,
        A = !1,
        $ = 0,
        b,
        P,
        C = { value: '', depth: 0, isGlob: !1 },
        U = () => _ >= n,
        d = () => u.charCodeAt(_ + 1),
        I = () => ((b = P), u.charCodeAt(++_))
      for (; _ < n; ) {
        P = I()
        let V
        if (P === Be) {
          ;(N = C.backslashes = !0), (P = I()), P === Bt && (x = !0)
          continue
        }
        if (x === !0 || P === Bt) {
          for ($++; U() !== !0 && (P = I()); ) {
            if (P === Be) {
              ;(N = C.backslashes = !0), I()
              continue
            }
            if (P === Bt) {
              $++
              continue
            }
            if (x !== !0 && P === It && (P = I()) === It) {
              if (
                ((c = C.isBrace = !0), (g = C.isGlob = !0), (A = !0), s === !0)
              )
                continue
              break
            }
            if (x !== !0 && P === cc) {
              if (
                ((c = C.isBrace = !0), (g = C.isGlob = !0), (A = !0), s === !0)
              )
                continue
              break
            }
            if (P === pc && ($--, $ === 0)) {
              ;(x = !1), (c = C.isBrace = !0), (A = !0)
              break
            }
          }
          if (s === !0) continue
          break
        }
        if (P === Ns) {
          if (
            (i.push(_),
            o.push(C),
            (C = { value: '', depth: 0, isGlob: !1 }),
            A === !0)
          )
            continue
          if (b === It && _ === l + 1) {
            l += 2
            continue
          }
          h = _ + 1
          continue
        }
        if (
          r.noext !== !0 &&
          (P === fc || P === uc || P === qt || P === Ms || P === Ft) === !0 &&
          d() === jt
        ) {
          if (
            ((g = C.isGlob = !0),
            (S = C.isExtglob = !0),
            (A = !0),
            P === Ft && _ === l && (R = !0),
            s === !0)
          ) {
            for (; U() !== !0 && (P = I()); ) {
              if (P === Be) {
                ;(N = C.backslashes = !0), (P = I())
                continue
              }
              if (P === qs) {
                ;(g = C.isGlob = !0), (A = !0)
                break
              }
            }
            continue
          }
          break
        }
        if (P === qt) {
          if (
            (b === qt && (v = C.isGlobstar = !0),
            (g = C.isGlob = !0),
            (A = !0),
            s === !0)
          )
            continue
          break
        }
        if (P === Ms) {
          if (((g = C.isGlob = !0), (A = !0), s === !0)) continue
          break
        }
        if (P === lc) {
          for (; U() !== !0 && (V = I()); ) {
            if (V === Be) {
              ;(N = C.backslashes = !0), I()
              continue
            }
            if (V === hc) {
              ;(T = C.isBracket = !0), (g = C.isGlob = !0), (A = !0)
              break
            }
          }
          if (s === !0) continue
          break
        }
        if (r.nonegate !== !0 && P === Ft && _ === l) {
          ;(L = C.negated = !0), l++
          continue
        }
        if (r.noparen !== !0 && P === jt) {
          if (((g = C.isGlob = !0), s === !0)) {
            for (; U() !== !0 && (P = I()); ) {
              if (P === jt) {
                ;(N = C.backslashes = !0), (P = I())
                continue
              }
              if (P === qs) {
                A = !0
                break
              }
            }
            continue
          }
          break
        }
        if (g === !0) {
          if (((A = !0), s === !0)) continue
          break
        }
      }
      r.noext === !0 && ((S = !1), (g = !1))
      let M = u,
        fe = '',
        f = ''
      l > 0 && ((fe = u.slice(0, l)), (u = u.slice(l)), (h -= l)),
        M && g === !0 && h > 0
          ? ((M = u.slice(0, h)), (f = u.slice(h)))
          : g === !0
          ? ((M = ''), (f = u))
          : (M = u),
        M &&
          M !== '' &&
          M !== '/' &&
          M !== u &&
          Is(M.charCodeAt(M.length - 1)) &&
          (M = M.slice(0, -1)),
        r.unescape === !0 &&
          (f && (f = Ds.removeBackslashes(f)),
          M && N === !0 && (M = Ds.removeBackslashes(M)))
      let p = {
        prefix: fe,
        input: e,
        start: l,
        base: M,
        glob: f,
        isBrace: c,
        isBracket: T,
        isGlob: g,
        isExtglob: S,
        isGlobstar: v,
        negated: L,
        negatedExtglob: R,
      }
      if (
        (r.tokens === !0 &&
          ((p.maxDepth = 0), Is(P) || o.push(C), (p.tokens = o)),
        r.parts === !0 || r.tokens === !0)
      ) {
        let V
        for (let D = 0; D < i.length; D++) {
          let te = V ? V + 1 : l,
            re = i[D],
            X = e.slice(te, re)
          r.tokens &&
            (D === 0 && l !== 0
              ? ((o[D].isPrefix = !0), (o[D].value = fe))
              : (o[D].value = X),
            Fs(o[D]),
            (p.maxDepth += o[D].depth)),
            (D !== 0 || X !== '') && a.push(X),
            (V = re)
        }
        if (V && V + 1 < e.length) {
          let D = e.slice(V + 1)
          a.push(D),
            r.tokens &&
              ((o[o.length - 1].value = D),
              Fs(o[o.length - 1]),
              (p.maxDepth += o[o.length - 1].depth))
        }
        ;(p.slashes = i), (p.parts = a)
      }
      return p
    }
  Bs.exports = dc
})
var Ks = y((wp, Ws) => {
  'use strict'
  var Je = Ie(),
    z = Fe(),
    {
      MAX_LENGTH: et,
      POSIX_REGEX_SOURCE: _c,
      REGEX_NON_SPECIAL_CHARS: gc,
      REGEX_SPECIAL_CHARS_BACKREF: yc,
      REPLACEMENTS: Gs,
    } = Je,
    mc = (e, t) => {
      if (typeof t.expandRange == 'function') return t.expandRange(...e, t)
      e.sort()
      let r = `[${e.join('-')}]`
      try {
        new RegExp(r)
      } catch (n) {
        return e.map((s) => z.escapeRegex(s)).join('..')
      }
      return r
    },
    Te = (e, t) =>
      `Missing ${e}: "${t}" - use "\\\\${t}" to match literal characters`,
    Us = (e, t) => {
      if (typeof e != 'string') throw new TypeError('Expected a string')
      e = Gs[e] || e
      let r = { ...t },
        n = typeof r.maxLength == 'number' ? Math.min(et, r.maxLength) : et,
        s = e.length
      if (s > n)
        throw new SyntaxError(
          `Input length: ${s}, exceeds maximum allowed length: ${n}`,
        )
      let i = { type: 'bos', value: '', output: r.prepend || '' },
        o = [i],
        a = r.capture ? '' : '?:',
        u = z.isWindows(t),
        _ = Je.globChars(u),
        l = Je.extglobChars(_),
        {
          DOT_LITERAL: h,
          PLUS_LITERAL: c,
          SLASH_LITERAL: T,
          ONE_CHAR: g,
          DOTS_SLASH: S,
          NO_DOT: v,
          NO_DOT_SLASH: x,
          NO_DOTS_SLASH: N,
          QMARK: L,
          QMARK_NO_DOT: R,
          STAR: A,
          START_ANCHOR: $,
        } = _,
        b = (E) => `(${a}(?:(?!${$}${E.dot ? S : h}).)*?)`,
        P = r.dot ? '' : v,
        C = r.dot ? L : R,
        U = r.bash === !0 ? b(r) : A
      r.capture && (U = `(${U})`),
        typeof r.noext == 'boolean' && (r.noextglob = r.noext)
      let d = {
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
      ;(e = z.removePrefix(e, d)), (s = e.length)
      let I = [],
        M = [],
        fe = [],
        f = i,
        p,
        V = () => d.index === s - 1,
        D = (d.peek = (E = 1) => e[d.index + E]),
        te = (d.advance = () => e[++d.index] || ''),
        re = () => e.slice(d.index + 1),
        X = (E = '', q = 0) => {
          ;(d.consumed += E), (d.index += q)
        },
        je = (E) => {
          ;(d.output += E.output != null ? E.output : E.value), X(E.value)
        },
        ia = () => {
          let E = 1
          for (; D() === '!' && (D(2) !== '(' || D(3) === '?'); )
            te(), d.start++, E++
          return E % 2 == 0 ? !1 : ((d.negated = !0), d.start++, !0)
        },
        Ge = (E) => {
          d[E]++, fe.push(E)
        },
        me = (E) => {
          d[E]--, fe.pop()
        },
        H = (E) => {
          if (f.type === 'globstar') {
            let q = d.braces > 0 && (E.type === 'comma' || E.type === 'brace'),
              m =
                E.extglob === !0 ||
                (I.length && (E.type === 'pipe' || E.type === 'paren'))
            E.type !== 'slash' &&
              E.type !== 'paren' &&
              !q &&
              !m &&
              ((d.output = d.output.slice(0, -f.output.length)),
              (f.type = 'star'),
              (f.value = '*'),
              (f.output = U),
              (d.output += f.output))
          }
          if (
            (I.length &&
              E.type !== 'paren' &&
              (I[I.length - 1].inner += E.value),
            (E.value || E.output) && je(E),
            f && f.type === 'text' && E.type === 'text')
          ) {
            ;(f.value += E.value), (f.output = (f.output || '') + E.value)
            return
          }
          ;(E.prev = f), o.push(E), (f = E)
        },
        Ue = (E, q) => {
          let m = { ...l[q], conditions: 1, inner: '' }
          ;(m.prev = f), (m.parens = d.parens), (m.output = d.output)
          let k = (r.capture ? '(' : '') + m.open
          Ge('parens'),
            H({ type: E, value: q, output: d.output ? '' : g }),
            H({ type: 'paren', extglob: !0, value: te(), output: k }),
            I.push(m)
        },
        oa = (E) => {
          let q = E.close + (r.capture ? ')' : ''),
            m
          if (E.type === 'negate') {
            let k = U
            E.inner &&
              E.inner.length > 1 &&
              E.inner.includes('/') &&
              (k = b(r)),
              (k !== U || V() || /^\)+$/.test(re())) &&
                (q = E.close = `)$))${k}`),
              E.inner.includes('*') &&
                (m = re()) &&
                /^\.[^\\/.]+$/.test(m) &&
                (q = E.close = `)${m})${k})`),
              E.prev.type === 'bos' && (d.negatedExtglob = !0)
          }
          H({ type: 'paren', extglob: !0, value: p, output: q }), me('parens')
        }
      if (r.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(e)) {
        let E = !1,
          q = e.replace(yc, (m, k, B, Y, G, St) =>
            Y === '\\'
              ? ((E = !0), m)
              : Y === '?'
              ? k
                ? k + Y + (G ? L.repeat(G.length) : '')
                : St === 0
                ? C + (G ? L.repeat(G.length) : '')
                : L.repeat(B.length)
              : Y === '.'
              ? h.repeat(B.length)
              : Y === '*'
              ? k
                ? k + Y + (G ? U : '')
                : U
              : k
              ? m
              : `\\${m}`,
          )
        return (
          E === !0 &&
            (r.unescape === !0
              ? (q = q.replace(/\\/g, ''))
              : (q = q.replace(/\\+/g, (m) =>
                  m.length % 2 == 0 ? '\\\\' : m ? '\\' : '',
                ))),
          q === e && r.contains === !0
            ? ((d.output = e), d)
            : ((d.output = z.wrapOutput(q, d, t)), d)
        )
      }
      for (; !V(); ) {
        if (((p = te()), p === '\0')) continue
        if (p === '\\') {
          let m = D()
          if ((m === '/' && r.bash !== !0) || m === '.' || m === ';') continue
          if (!m) {
            ;(p += '\\'), H({ type: 'text', value: p })
            continue
          }
          let k = /^\\+/.exec(re()),
            B = 0
          if (
            (k &&
              k[0].length > 2 &&
              ((B = k[0].length), (d.index += B), B % 2 != 0 && (p += '\\')),
            r.unescape === !0 ? (p = te()) : (p += te()),
            d.brackets === 0)
          ) {
            H({ type: 'text', value: p })
            continue
          }
        }
        if (
          d.brackets > 0 &&
          (p !== ']' || f.value === '[' || f.value === '[^')
        ) {
          if (r.posix !== !1 && p === ':') {
            let m = f.value.slice(1)
            if (m.includes('[') && ((f.posix = !0), m.includes(':'))) {
              let k = f.value.lastIndexOf('['),
                B = f.value.slice(0, k),
                Y = f.value.slice(k + 2),
                G = _c[Y]
              if (G) {
                ;(f.value = B + G),
                  (d.backtrack = !0),
                  te(),
                  !i.output && o.indexOf(f) === 1 && (i.output = g)
                continue
              }
            }
          }
          ;((p === '[' && D() !== ':') || (p === '-' && D() === ']')) &&
            (p = `\\${p}`),
            p === ']' &&
              (f.value === '[' || f.value === '[^') &&
              (p = `\\${p}`),
            r.posix === !0 && p === '!' && f.value === '[' && (p = '^'),
            (f.value += p),
            je({ value: p })
          continue
        }
        if (d.quotes === 1 && p !== '"') {
          ;(p = z.escapeRegex(p)), (f.value += p), je({ value: p })
          continue
        }
        if (p === '"') {
          ;(d.quotes = d.quotes === 1 ? 0 : 1),
            r.keepQuotes === !0 && H({ type: 'text', value: p })
          continue
        }
        if (p === '(') {
          Ge('parens'), H({ type: 'paren', value: p })
          continue
        }
        if (p === ')') {
          if (d.parens === 0 && r.strictBrackets === !0)
            throw new SyntaxError(Te('opening', '('))
          let m = I[I.length - 1]
          if (m && d.parens === m.parens + 1) {
            oa(I.pop())
            continue
          }
          H({ type: 'paren', value: p, output: d.parens ? ')' : '\\)' }),
            me('parens')
          continue
        }
        if (p === '[') {
          if (r.nobracket === !0 || !re().includes(']')) {
            if (r.nobracket !== !0 && r.strictBrackets === !0)
              throw new SyntaxError(Te('closing', ']'))
            p = `\\${p}`
          } else Ge('brackets')
          H({ type: 'bracket', value: p })
          continue
        }
        if (p === ']') {
          if (
            r.nobracket === !0 ||
            (f && f.type === 'bracket' && f.value.length === 1)
          ) {
            H({ type: 'text', value: p, output: `\\${p}` })
            continue
          }
          if (d.brackets === 0) {
            if (r.strictBrackets === !0)
              throw new SyntaxError(Te('opening', '['))
            H({ type: 'text', value: p, output: `\\${p}` })
            continue
          }
          me('brackets')
          let m = f.value.slice(1)
          if (
            (f.posix !== !0 &&
              m[0] === '^' &&
              !m.includes('/') &&
              (p = `/${p}`),
            (f.value += p),
            je({ value: p }),
            r.literalBrackets === !1 || z.hasRegexChars(m))
          )
            continue
          let k = z.escapeRegex(f.value)
          if (
            ((d.output = d.output.slice(0, -f.value.length)),
            r.literalBrackets === !0)
          ) {
            ;(d.output += k), (f.value = k)
            continue
          }
          ;(f.value = `(${a}${k}|${f.value})`), (d.output += f.value)
          continue
        }
        if (p === '{' && r.nobrace !== !0) {
          Ge('braces')
          let m = {
            type: 'brace',
            value: p,
            output: '(',
            outputIndex: d.output.length,
            tokensIndex: d.tokens.length,
          }
          M.push(m), H(m)
          continue
        }
        if (p === '}') {
          let m = M[M.length - 1]
          if (r.nobrace === !0 || !m) {
            H({ type: 'text', value: p, output: p })
            continue
          }
          let k = ')'
          if (m.dots === !0) {
            let B = o.slice(),
              Y = []
            for (
              let G = B.length - 1;
              G >= 0 && (o.pop(), B[G].type !== 'brace');
              G--
            )
              B[G].type !== 'dots' && Y.unshift(B[G].value)
            ;(k = mc(Y, r)), (d.backtrack = !0)
          }
          if (m.comma !== !0 && m.dots !== !0) {
            let B = d.output.slice(0, m.outputIndex),
              Y = d.tokens.slice(m.tokensIndex)
            ;(m.value = m.output = '\\{'), (p = k = '\\}'), (d.output = B)
            for (let G of Y) d.output += G.output || G.value
          }
          H({ type: 'brace', value: p, output: k }), me('braces'), M.pop()
          continue
        }
        if (p === '|') {
          I.length > 0 && I[I.length - 1].conditions++,
            H({ type: 'text', value: p })
          continue
        }
        if (p === ',') {
          let m = p,
            k = M[M.length - 1]
          k && fe[fe.length - 1] === 'braces' && ((k.comma = !0), (m = '|')),
            H({ type: 'comma', value: p, output: m })
          continue
        }
        if (p === '/') {
          if (f.type === 'dot' && d.index === d.start + 1) {
            ;(d.start = d.index + 1),
              (d.consumed = ''),
              (d.output = ''),
              o.pop(),
              (f = i)
            continue
          }
          H({ type: 'slash', value: p, output: T })
          continue
        }
        if (p === '.') {
          if (d.braces > 0 && f.type === 'dot') {
            f.value === '.' && (f.output = h)
            let m = M[M.length - 1]
            ;(f.type = 'dots'), (f.output += p), (f.value += p), (m.dots = !0)
            continue
          }
          if (
            d.braces + d.parens === 0 &&
            f.type !== 'bos' &&
            f.type !== 'slash'
          ) {
            H({ type: 'text', value: p, output: h })
            continue
          }
          H({ type: 'dot', value: p, output: h })
          continue
        }
        if (p === '?') {
          if (
            !(f && f.value === '(') &&
            r.noextglob !== !0 &&
            D() === '(' &&
            D(2) !== '?'
          ) {
            Ue('qmark', p)
            continue
          }
          if (f && f.type === 'paren') {
            let k = D(),
              B = p
            if (k === '<' && !z.supportsLookbehinds())
              throw new Error(
                'Node.js v10 or higher is required for regex lookbehinds',
              )
            ;((f.value === '(' && !/[!=<:]/.test(k)) ||
              (k === '<' && !/<([!=]|\w+>)/.test(re()))) &&
              (B = `\\${p}`),
              H({ type: 'text', value: p, output: B })
            continue
          }
          if (r.dot !== !0 && (f.type === 'slash' || f.type === 'bos')) {
            H({ type: 'qmark', value: p, output: R })
            continue
          }
          H({ type: 'qmark', value: p, output: L })
          continue
        }
        if (p === '!') {
          if (
            r.noextglob !== !0 &&
            D() === '(' &&
            (D(2) !== '?' || !/[!=<:]/.test(D(3)))
          ) {
            Ue('negate', p)
            continue
          }
          if (r.nonegate !== !0 && d.index === 0) {
            ia()
            continue
          }
        }
        if (p === '+') {
          if (r.noextglob !== !0 && D() === '(' && D(2) !== '?') {
            Ue('plus', p)
            continue
          }
          if ((f && f.value === '(') || r.regex === !1) {
            H({ type: 'plus', value: p, output: c })
            continue
          }
          if (
            (f &&
              (f.type === 'bracket' ||
                f.type === 'paren' ||
                f.type === 'brace')) ||
            d.parens > 0
          ) {
            H({ type: 'plus', value: p })
            continue
          }
          H({ type: 'plus', value: c })
          continue
        }
        if (p === '@') {
          if (r.noextglob !== !0 && D() === '(' && D(2) !== '?') {
            H({ type: 'at', extglob: !0, value: p, output: '' })
            continue
          }
          H({ type: 'text', value: p })
          continue
        }
        if (p !== '*') {
          ;(p === '$' || p === '^') && (p = `\\${p}`)
          let m = gc.exec(re())
          m && ((p += m[0]), (d.index += m[0].length)),
            H({ type: 'text', value: p })
          continue
        }
        if (f && (f.type === 'globstar' || f.star === !0)) {
          ;(f.type = 'star'),
            (f.star = !0),
            (f.value += p),
            (f.output = U),
            (d.backtrack = !0),
            (d.globstar = !0),
            X(p)
          continue
        }
        let E = re()
        if (r.noextglob !== !0 && /^\([^?]/.test(E)) {
          Ue('star', p)
          continue
        }
        if (f.type === 'star') {
          if (r.noglobstar === !0) {
            X(p)
            continue
          }
          let m = f.prev,
            k = m.prev,
            B = m.type === 'slash' || m.type === 'bos',
            Y = k && (k.type === 'star' || k.type === 'globstar')
          if (r.bash === !0 && (!B || (E[0] && E[0] !== '/'))) {
            H({ type: 'star', value: p, output: '' })
            continue
          }
          let G = d.braces > 0 && (m.type === 'comma' || m.type === 'brace'),
            St = I.length && (m.type === 'pipe' || m.type === 'paren')
          if (!B && m.type !== 'paren' && !G && !St) {
            H({ type: 'star', value: p, output: '' })
            continue
          }
          for (; E.slice(0, 3) === '/**'; ) {
            let We = e[d.index + 4]
            if (We && We !== '/') break
            ;(E = E.slice(3)), X('/**', 3)
          }
          if (m.type === 'bos' && V()) {
            ;(f.type = 'globstar'),
              (f.value += p),
              (f.output = b(r)),
              (d.output = f.output),
              (d.globstar = !0),
              X(p)
            continue
          }
          if (m.type === 'slash' && m.prev.type !== 'bos' && !Y && V()) {
            ;(d.output = d.output.slice(0, -(m.output + f.output).length)),
              (m.output = `(?:${m.output}`),
              (f.type = 'globstar'),
              (f.output = b(r) + (r.strictSlashes ? ')' : '|$)')),
              (f.value += p),
              (d.globstar = !0),
              (d.output += m.output + f.output),
              X(p)
            continue
          }
          if (m.type === 'slash' && m.prev.type !== 'bos' && E[0] === '/') {
            let We = E[1] !== void 0 ? '|$' : ''
            ;(d.output = d.output.slice(0, -(m.output + f.output).length)),
              (m.output = `(?:${m.output}`),
              (f.type = 'globstar'),
              (f.output = `${b(r)}${T}|${T}${We})`),
              (f.value += p),
              (d.output += m.output + f.output),
              (d.globstar = !0),
              X(p + te()),
              H({ type: 'slash', value: '/', output: '' })
            continue
          }
          if (m.type === 'bos' && E[0] === '/') {
            ;(f.type = 'globstar'),
              (f.value += p),
              (f.output = `(?:^|${T}|${b(r)}${T})`),
              (d.output = f.output),
              (d.globstar = !0),
              X(p + te()),
              H({ type: 'slash', value: '/', output: '' })
            continue
          }
          ;(d.output = d.output.slice(0, -f.output.length)),
            (f.type = 'globstar'),
            (f.output = b(r)),
            (f.value += p),
            (d.output += f.output),
            (d.globstar = !0),
            X(p)
          continue
        }
        let q = { type: 'star', value: p, output: U }
        if (r.bash === !0) {
          ;(q.output = '.*?'),
            (f.type === 'bos' || f.type === 'slash') &&
              (q.output = P + q.output),
            H(q)
          continue
        }
        if (
          f &&
          (f.type === 'bracket' || f.type === 'paren') &&
          r.regex === !0
        ) {
          ;(q.output = p), H(q)
          continue
        }
        ;(d.index === d.start || f.type === 'slash' || f.type === 'dot') &&
          (f.type === 'dot'
            ? ((d.output += x), (f.output += x))
            : r.dot === !0
            ? ((d.output += N), (f.output += N))
            : ((d.output += P), (f.output += P)),
          D() !== '*' && ((d.output += g), (f.output += g))),
          H(q)
      }
      for (; d.brackets > 0; ) {
        if (r.strictBrackets === !0) throw new SyntaxError(Te('closing', ']'))
        ;(d.output = z.escapeLast(d.output, '[')), me('brackets')
      }
      for (; d.parens > 0; ) {
        if (r.strictBrackets === !0) throw new SyntaxError(Te('closing', ')'))
        ;(d.output = z.escapeLast(d.output, '(')), me('parens')
      }
      for (; d.braces > 0; ) {
        if (r.strictBrackets === !0) throw new SyntaxError(Te('closing', '}'))
        ;(d.output = z.escapeLast(d.output, '{')), me('braces')
      }
      if (
        (r.strictSlashes !== !0 &&
          (f.type === 'star' || f.type === 'bracket') &&
          H({ type: 'maybe_slash', value: '', output: `${T}?` }),
        d.backtrack === !0)
      ) {
        d.output = ''
        for (let E of d.tokens)
          (d.output += E.output != null ? E.output : E.value),
            E.suffix && (d.output += E.suffix)
      }
      return d
    }
  Us.fastpaths = (e, t) => {
    let r = { ...t },
      n = typeof r.maxLength == 'number' ? Math.min(et, r.maxLength) : et,
      s = e.length
    if (s > n)
      throw new SyntaxError(
        `Input length: ${s}, exceeds maximum allowed length: ${n}`,
      )
    e = Gs[e] || e
    let i = z.isWindows(t),
      {
        DOT_LITERAL: o,
        SLASH_LITERAL: a,
        ONE_CHAR: u,
        DOTS_SLASH: _,
        NO_DOT: l,
        NO_DOTS: h,
        NO_DOTS_SLASH: c,
        STAR: T,
        START_ANCHOR: g,
      } = Je.globChars(i),
      S = r.dot ? h : l,
      v = r.dot ? c : l,
      x = r.capture ? '' : '?:',
      N = { negated: !1, prefix: '' },
      L = r.bash === !0 ? '.*?' : T
    r.capture && (L = `(${L})`)
    let R = (P) =>
        P.noglobstar === !0 ? L : `(${x}(?:(?!${g}${P.dot ? _ : o}).)*?)`,
      A = (P) => {
        switch (P) {
          case '*':
            return `${S}${u}${L}`
          case '.*':
            return `${o}${u}${L}`
          case '*.*':
            return `${S}${L}${o}${u}${L}`
          case '*/*':
            return `${S}${L}${a}${u}${v}${L}`
          case '**':
            return S + R(r)
          case '**/*':
            return `(?:${S}${R(r)}${a})?${v}${u}${L}`
          case '**/*.*':
            return `(?:${S}${R(r)}${a})?${v}${L}${o}${u}${L}`
          case '**/.*':
            return `(?:${S}${R(r)}${a})?${o}${u}${L}`
          default: {
            let C = /^(.*?)\.(\w+)$/.exec(P)
            if (!C) return
            let U = A(C[1])
            return U ? U + o + C[2] : void 0
          }
        }
      },
      $ = z.removePrefix(e, N),
      b = A($)
    return b && r.strictSlashes !== !0 && (b += `${a}?`), b
  }
  Ws.exports = Us
})
var Ys = y((Tp, Vs) => {
  'use strict'
  var Sc = require('path'),
    Ec = js(),
    Gt = Ks(),
    Ut = Fe(),
    bc = Ie(),
    vc = (e) => e && typeof e == 'object' && !Array.isArray(e),
    j = (e, t, r = !1) => {
      if (Array.isArray(e)) {
        let l = e.map((c) => j(c, t, r))
        return (c) => {
          for (let T of l) {
            let g = T(c)
            if (g) return g
          }
          return !1
        }
      }
      let n = vc(e) && e.tokens && e.input
      if (e === '' || (typeof e != 'string' && !n))
        throw new TypeError('Expected pattern to be a non-empty string')
      let s = t || {},
        i = Ut.isWindows(t),
        o = n ? j.compileRe(e, t) : j.makeRe(e, t, !1, !0),
        a = o.state
      delete o.state
      let u = () => !1
      if (s.ignore) {
        let l = { ...t, ignore: null, onMatch: null, onResult: null }
        u = j(s.ignore, l, r)
      }
      let _ = (l, h = !1) => {
        let {
            isMatch: c,
            match: T,
            output: g,
          } = j.test(l, o, t, { glob: e, posix: i }),
          S = {
            glob: e,
            state: a,
            regex: o,
            posix: i,
            input: l,
            output: g,
            match: T,
            isMatch: c,
          }
        return (
          typeof s.onResult == 'function' && s.onResult(S),
          c === !1
            ? ((S.isMatch = !1), h ? S : !1)
            : u(l)
            ? (typeof s.onIgnore == 'function' && s.onIgnore(S),
              (S.isMatch = !1),
              h ? S : !1)
            : (typeof s.onMatch == 'function' && s.onMatch(S), h ? S : !0)
        )
      }
      return r && (_.state = a), _
    }
  j.test = (e, t, r, { glob: n, posix: s } = {}) => {
    if (typeof e != 'string')
      throw new TypeError('Expected input to be a string')
    if (e === '') return { isMatch: !1, output: '' }
    let i = r || {},
      o = i.format || (s ? Ut.toPosixSlashes : null),
      a = e === n,
      u = a && o ? o(e) : e
    return (
      a === !1 && ((u = o ? o(e) : e), (a = u === n)),
      (a === !1 || i.capture === !0) &&
        (i.matchBase === !0 || i.basename === !0
          ? (a = j.matchBase(e, t, r, s))
          : (a = t.exec(u))),
      { isMatch: Boolean(a), match: a, output: u }
    )
  }
  j.matchBase = (e, t, r, n = Ut.isWindows(r)) =>
    (t instanceof RegExp ? t : j.makeRe(t, r)).test(Sc.basename(e))
  j.isMatch = (e, t, r) => j(t, r)(e)
  j.parse = (e, t) =>
    Array.isArray(e)
      ? e.map((r) => j.parse(r, t))
      : Gt(e, { ...t, fastpaths: !1 })
  j.scan = (e, t) => Ec(e, t)
  j.compileRe = (e, t, r = !1, n = !1) => {
    if (r === !0) return e.output
    let s = t || {},
      i = s.contains ? '' : '^',
      o = s.contains ? '' : '$',
      a = `${i}(?:${e.output})${o}`
    e && e.negated === !0 && (a = `^(?!${a}).*$`)
    let u = j.toRegex(a, t)
    return n === !0 && (u.state = e), u
  }
  j.makeRe = (e, t = {}, r = !1, n = !1) => {
    if (!e || typeof e != 'string')
      throw new TypeError('Expected a non-empty string')
    let s = { negated: !1, fastpaths: !0 }
    return (
      t.fastpaths !== !1 &&
        (e[0] === '.' || e[0] === '*') &&
        (s.output = Gt.fastpaths(e, t)),
      s.output || (s = Gt(e, t)),
      j.compileRe(s, t, r, n)
    )
  }
  j.toRegex = (e, t) => {
    try {
      let r = t || {}
      return new RegExp(e, r.flags || (r.nocase ? 'i' : ''))
    } catch (r) {
      if (t && t.debug === !0) throw r
      return /$^/
    }
  }
  j.constants = bc
  Vs.exports = j
})
var Xs = y((Op, Qs) => {
  'use strict'
  Qs.exports = Ys()
})
var ti = y((Lp, ei) => {
  'use strict'
  var Zs = require('util'),
    zs = Ts(),
    ie = Xs(),
    Wt = Fe(),
    Js = (e) => e === '' || e === './',
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
        let h = ie(String(t[l]), { ...r, onResult: a }, !0),
          c = h.state.negated || h.state.negatedExtglob
        c && o++
        for (let T of e) {
          let g = h(T, !0)
          !(c ? !g.isMatch : g.isMatch) ||
            (c ? n.add(g.output) : (n.delete(g.output), s.add(g.output)))
        }
      }
      let _ = (o === t.length ? [...i] : [...s]).filter((l) => !n.has(l))
      if (r && _.length === 0) {
        if (r.failglob === !0)
          throw new Error(`No matches found for "${t.join(', ')}"`)
        if (r.nonull === !0 || r.nullglob === !0)
          return r.unescape ? t.map((l) => l.replace(/\\/g, '')) : t
      }
      return _
    }
  F.match = F
  F.matcher = (e, t) => ie(e, t)
  F.isMatch = (e, t, r) => ie(t, r)(e)
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
    if (typeof e != 'string')
      throw new TypeError(`Expected a string: "${Zs.inspect(e)}"`)
    if (Array.isArray(t)) return t.some((n) => F.contains(e, n, r))
    if (typeof t == 'string') {
      if (Js(e) || Js(t)) return !1
      if (e.includes(t) || (e.startsWith('./') && e.slice(2).includes(t)))
        return !0
    }
    return F.isMatch(e, t, { ...r, contains: !0 })
  }
  F.matchKeys = (e, t, r) => {
    if (!Wt.isObject(e))
      throw new TypeError('Expected the first argument to be an object')
    let n = F(Object.keys(e), t, r),
      s = {}
    for (let i of n) s[i] = e[i]
    return s
  }
  F.some = (e, t, r) => {
    let n = [].concat(e)
    for (let s of [].concat(t)) {
      let i = ie(String(s), r)
      if (n.some((o) => i(o))) return !0
    }
    return !1
  }
  F.every = (e, t, r) => {
    let n = [].concat(e)
    for (let s of [].concat(t)) {
      let i = ie(String(s), r)
      if (!n.every((o) => i(o))) return !1
    }
    return !0
  }
  F.all = (e, t, r) => {
    if (typeof e != 'string')
      throw new TypeError(`Expected a string: "${Zs.inspect(e)}"`)
    return [].concat(t).every((n) => ie(n, r)(e))
  }
  F.capture = (e, t, r) => {
    let n = Wt.isWindows(r),
      i = ie
        .makeRe(String(e), { ...r, capture: !0 })
        .exec(n ? Wt.toPosixSlashes(t) : t)
    if (i) return i.slice(1).map((o) => (o === void 0 ? '' : o))
  }
  F.makeRe = (...e) => ie.makeRe(...e)
  F.scan = (...e) => ie.scan(...e)
  F.parse = (e, t) => {
    let r = []
    for (let n of [].concat(e || []))
      for (let s of zs(String(n), t)) r.push(ie.parse(s, t))
    return r
  }
  F.braces = (e, t) => {
    if (typeof e != 'string') throw new TypeError('Expected a string')
    return (t && t.nobrace === !0) || !/\{.*\}/.test(e) ? [e] : zs(e, t)
  }
  F.braceExpand = (e, t) => {
    if (typeof e != 'string') throw new TypeError('Expected a string')
    return F.braces(e, { ...t, expand: !0 })
  }
  ei.exports = F
})
var ci = y((w) => {
  'use strict'
  Object.defineProperty(w, '__esModule', { value: !0 })
  w.matchAny =
    w.convertPatternsToRe =
    w.makeRe =
    w.getPatternParts =
    w.expandBraceExpansion =
    w.expandPatternsWithBraceExpansion =
    w.isAffectDepthOfReadingPattern =
    w.endsWithSlashGlobStar =
    w.hasGlobStar =
    w.getBaseDirectory =
    w.isPatternRelatedToParentDirectory =
    w.getPatternsOutsideCurrentDirectory =
    w.getPatternsInsideCurrentDirectory =
    w.getPositivePatterns =
    w.getNegativePatterns =
    w.isPositivePattern =
    w.isNegativePattern =
    w.convertToNegativePattern =
    w.convertToPositivePattern =
    w.isDynamicPattern =
    w.isStaticPattern =
      void 0
  var Ac = require('path'),
    Rc = Kn(),
    Kt = ti(),
    ri = '**',
    xc = '\\',
    Pc = /[*?]|^!/,
    Cc = /\[.*]/,
    wc = /(?:^|[^!*+?@])\(.*\|.*\)/,
    Tc = /[!*+?@]\(.*\)/,
    Oc = /{.*(?:,|\.\.).*}/
  function ni(e, t = {}) {
    return !si(e, t)
  }
  w.isStaticPattern = ni
  function si(e, t = {}) {
    return e === ''
      ? !1
      : !!(
          t.caseSensitiveMatch === !1 ||
          e.includes(xc) ||
          Pc.test(e) ||
          Cc.test(e) ||
          wc.test(e) ||
          (t.extglob !== !1 && Tc.test(e)) ||
          (t.braceExpansion !== !1 && Oc.test(e))
        )
  }
  w.isDynamicPattern = si
  function Lc(e) {
    return tt(e) ? e.slice(1) : e
  }
  w.convertToPositivePattern = Lc
  function kc(e) {
    return '!' + e
  }
  w.convertToNegativePattern = kc
  function tt(e) {
    return e.startsWith('!') && e[1] !== '('
  }
  w.isNegativePattern = tt
  function ii(e) {
    return !tt(e)
  }
  w.isPositivePattern = ii
  function Hc(e) {
    return e.filter(tt)
  }
  w.getNegativePatterns = Hc
  function $c(e) {
    return e.filter(ii)
  }
  w.getPositivePatterns = $c
  function Dc(e) {
    return e.filter((t) => !Vt(t))
  }
  w.getPatternsInsideCurrentDirectory = Dc
  function Nc(e) {
    return e.filter(Vt)
  }
  w.getPatternsOutsideCurrentDirectory = Nc
  function Vt(e) {
    return e.startsWith('..') || e.startsWith('./..')
  }
  w.isPatternRelatedToParentDirectory = Vt
  function Mc(e) {
    return Rc(e, { flipBackslashes: !1 })
  }
  w.getBaseDirectory = Mc
  function qc(e) {
    return e.includes(ri)
  }
  w.hasGlobStar = qc
  function oi(e) {
    return e.endsWith('/' + ri)
  }
  w.endsWithSlashGlobStar = oi
  function Ic(e) {
    let t = Ac.basename(e)
    return oi(e) || ni(t)
  }
  w.isAffectDepthOfReadingPattern = Ic
  function Fc(e) {
    return e.reduce((t, r) => t.concat(ai(r)), [])
  }
  w.expandPatternsWithBraceExpansion = Fc
  function ai(e) {
    return Kt.braces(e, { expand: !0, nodupes: !0 })
  }
  w.expandBraceExpansion = ai
  function Bc(e, t) {
    let { parts: r } = Kt.scan(
      e,
      Object.assign(Object.assign({}, t), { parts: !0 }),
    )
    return (
      r.length === 0 && (r = [e]),
      r[0].startsWith('/') && ((r[0] = r[0].slice(1)), r.unshift('')),
      r
    )
  }
  w.getPatternParts = Bc
  function ui(e, t) {
    return Kt.makeRe(e, t)
  }
  w.makeRe = ui
  function jc(e, t) {
    return e.map((r) => ui(r, t))
  }
  w.convertPatternsToRe = jc
  function Gc(e, t) {
    return t.some((r) => r.test(e))
  }
  w.matchAny = Gc
})
var hi = y((Hp, pi) => {
  'use strict'
  var Uc = require('stream'),
    li = Uc.PassThrough,
    Wc = Array.prototype.slice
  pi.exports = Kc
  function Kc() {
    let e = [],
      t = Wc.call(arguments),
      r = !1,
      n = t[t.length - 1]
    n && !Array.isArray(n) && n.pipe == null ? t.pop() : (n = {})
    let s = n.end !== !1,
      i = n.pipeError === !0
    n.objectMode == null && (n.objectMode = !0),
      n.highWaterMark == null && (n.highWaterMark = 64 * 1024)
    let o = li(n)
    function a() {
      for (let l = 0, h = arguments.length; l < h; l++)
        e.push(fi(arguments[l], n))
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
      let h = l.length + 1
      function c() {
        --h > 0 || ((r = !1), u())
      }
      function T(g) {
        function S() {
          g.removeListener('merge2UnpipeEnd', S),
            g.removeListener('end', S),
            i && g.removeListener('error', v),
            c()
        }
        function v(x) {
          o.emit('error', x)
        }
        if (g._readableState.endEmitted) return c()
        g.on('merge2UnpipeEnd', S),
          g.on('end', S),
          i && g.on('error', v),
          g.pipe(o, { end: !1 }),
          g.resume()
      }
      for (let g = 0; g < l.length; g++) T(l[g])
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
    if (Array.isArray(e))
      for (let r = 0, n = e.length; r < n; r++) e[r] = fi(e[r], t)
    else {
      if (
        (!e._readableState && e.pipe && (e = e.pipe(li(t))),
        !e._readableState || !e.pause || !e.pipe)
      )
        throw new Error('Only readable stream can be merged.')
      e.pause()
    }
    return e
  }
})
var _i = y((rt) => {
  'use strict'
  Object.defineProperty(rt, '__esModule', { value: !0 })
  rt.merge = void 0
  var Vc = hi()
  function Yc(e) {
    let t = Vc(e)
    return (
      e.forEach((r) => {
        r.once('error', (n) => t.emit('error', n))
      }),
      t.once('close', () => di(e)),
      t.once('end', () => di(e)),
      t
    )
  }
  rt.merge = Yc
  function di(e) {
    e.forEach((t) => t.emit('close'))
  }
})
var gi = y((Oe) => {
  'use strict'
  Object.defineProperty(Oe, '__esModule', { value: !0 })
  Oe.isEmpty = Oe.isString = void 0
  function Qc(e) {
    return typeof e == 'string'
  }
  Oe.isString = Qc
  function Xc(e) {
    return e === ''
  }
  Oe.isEmpty = Xc
})
var ce = y((W) => {
  'use strict'
  Object.defineProperty(W, '__esModule', { value: !0 })
  W.string = W.stream = W.pattern = W.path = W.fs = W.errno = W.array = void 0
  var Zc = Nn()
  W.array = Zc
  var zc = Mn()
  W.errno = zc
  var Jc = In()
  W.fs = Jc
  var el = Fn()
  W.path = el
  var tl = ci()
  W.pattern = tl
  var rl = _i()
  W.stream = rl
  var nl = gi()
  W.string = nl
})
var Si = y((K) => {
  'use strict'
  Object.defineProperty(K, '__esModule', { value: !0 })
  K.convertPatternGroupToTask =
    K.convertPatternGroupsToTasks =
    K.groupPatternsByBaseDirectory =
    K.getNegativePatternsAsPositive =
    K.getPositivePatterns =
    K.convertPatternsToTasks =
    K.generate =
      void 0
  var le = ce()
  function sl(e, t) {
    let r = yi(e),
      n = mi(e, t.ignore),
      s = r.filter((u) => le.pattern.isStaticPattern(u, t)),
      i = r.filter((u) => le.pattern.isDynamicPattern(u, t)),
      o = Yt(s, n, !1),
      a = Yt(i, n, !0)
    return o.concat(a)
  }
  K.generate = sl
  function Yt(e, t, r) {
    let n = [],
      s = le.pattern.getPatternsOutsideCurrentDirectory(e),
      i = le.pattern.getPatternsInsideCurrentDirectory(e),
      o = Qt(s),
      a = Qt(i)
    return (
      n.push(...Xt(o, t, r)),
      '.' in a ? n.push(Zt('.', i, t, r)) : n.push(...Xt(a, t, r)),
      n
    )
  }
  K.convertPatternsToTasks = Yt
  function yi(e) {
    return le.pattern.getPositivePatterns(e)
  }
  K.getPositivePatterns = yi
  function mi(e, t) {
    return le.pattern
      .getNegativePatterns(e)
      .concat(t)
      .map(le.pattern.convertToPositivePattern)
  }
  K.getNegativePatternsAsPositive = mi
  function Qt(e) {
    let t = {}
    return e.reduce((r, n) => {
      let s = le.pattern.getBaseDirectory(n)
      return s in r ? r[s].push(n) : (r[s] = [n]), r
    }, t)
  }
  K.groupPatternsByBaseDirectory = Qt
  function Xt(e, t, r) {
    return Object.keys(e).map((n) => Zt(n, e[n], t, r))
  }
  K.convertPatternGroupsToTasks = Xt
  function Zt(e, t, r, n) {
    return {
      dynamic: n,
      positive: t,
      negative: r,
      base: e,
      patterns: [].concat(t, r.map(le.pattern.convertToNegativePattern)),
    }
  }
  K.convertPatternGroupToTask = Zt
})
var bi = y((nt) => {
  'use strict'
  Object.defineProperty(nt, '__esModule', { value: !0 })
  nt.read = void 0
  function il(e, t, r) {
    t.fs.lstat(e, (n, s) => {
      if (n !== null) {
        Ei(r, n)
        return
      }
      if (!s.isSymbolicLink() || !t.followSymbolicLink) {
        zt(r, s)
        return
      }
      t.fs.stat(e, (i, o) => {
        if (i !== null) {
          if (t.throwErrorOnBrokenSymbolicLink) {
            Ei(r, i)
            return
          }
          zt(r, s)
          return
        }
        t.markSymbolicLink && (o.isSymbolicLink = () => !0), zt(r, o)
      })
    })
  }
  nt.read = il
  function Ei(e, t) {
    e(t)
  }
  function zt(e, t) {
    e(null, t)
  }
})
var vi = y((st) => {
  'use strict'
  Object.defineProperty(st, '__esModule', { value: !0 })
  st.read = void 0
  function ol(e, t) {
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
  st.read = ol
})
var Ai = y((pe) => {
  'use strict'
  Object.defineProperty(pe, '__esModule', { value: !0 })
  pe.createFileSystemAdapter = pe.FILE_SYSTEM_ADAPTER = void 0
  var it = require('fs')
  pe.FILE_SYSTEM_ADAPTER = {
    lstat: it.lstat,
    stat: it.stat,
    lstatSync: it.lstatSync,
    statSync: it.statSync,
  }
  function al(e) {
    return e === void 0
      ? pe.FILE_SYSTEM_ADAPTER
      : Object.assign(Object.assign({}, pe.FILE_SYSTEM_ADAPTER), e)
  }
  pe.createFileSystemAdapter = al
})
var xi = y((Jt) => {
  'use strict'
  Object.defineProperty(Jt, '__esModule', { value: !0 })
  var ul = Ai(),
    Ri = class {
      constructor(t = {}) {
        ;(this._options = t),
          (this.followSymbolicLink = this._getValue(
            this._options.followSymbolicLink,
            !0,
          )),
          (this.fs = ul.createFileSystemAdapter(this._options.fs)),
          (this.markSymbolicLink = this._getValue(
            this._options.markSymbolicLink,
            !1,
          )),
          (this.throwErrorOnBrokenSymbolicLink = this._getValue(
            this._options.throwErrorOnBrokenSymbolicLink,
            !0,
          ))
      }
      _getValue(t, r) {
        return t ?? r
      }
    }
  Jt.default = Ri
})
var ve = y((he) => {
  'use strict'
  Object.defineProperty(he, '__esModule', { value: !0 })
  he.statSync = he.stat = he.Settings = void 0
  var Pi = bi(),
    cl = vi(),
    er = xi()
  he.Settings = er.default
  function ll(e, t, r) {
    if (typeof t == 'function') {
      Pi.read(e, tr(), t)
      return
    }
    Pi.read(e, tr(t), r)
  }
  he.stat = ll
  function fl(e, t) {
    let r = tr(t)
    return cl.read(e, r)
  }
  he.statSync = fl
  function tr(e = {}) {
    return e instanceof er.default ? e : new er.default(e)
  }
})
var Ti = y((Gp, wi) => {
  var Ci
  wi.exports =
    typeof queueMicrotask == 'function'
      ? queueMicrotask.bind(typeof window != 'undefined' ? window : global)
      : (e) =>
          (Ci || (Ci = Promise.resolve())).then(e).catch((t) =>
            setTimeout(() => {
              throw t
            }, 0),
          )
})
var Li = y((Up, Oi) => {
  Oi.exports = hl
  var pl = Ti()
  function hl(e, t) {
    let r,
      n,
      s,
      i = !0
    Array.isArray(e)
      ? ((r = []), (n = e.length))
      : ((s = Object.keys(e)), (r = {}), (n = s.length))
    function o(u) {
      function _() {
        t && t(u, r), (t = null)
      }
      i ? pl(_) : _()
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
            u(function (l, h) {
              a(_, l, h)
            })
          })
      : o(null),
      (i = !1)
  }
})
var rr = y((at) => {
  'use strict'
  Object.defineProperty(at, '__esModule', { value: !0 })
  at.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0
  var ot = process.versions.node.split('.')
  if (ot[0] === void 0 || ot[1] === void 0)
    throw new Error(
      `Unexpected behavior. The 'process.versions.node' variable has invalid value: ${process.versions.node}`,
    )
  var ki = Number.parseInt(ot[0], 10),
    dl = Number.parseInt(ot[1], 10),
    Hi = 10,
    _l = 10,
    gl = ki > Hi,
    yl = ki === Hi && dl >= _l
  at.IS_SUPPORT_READDIR_WITH_FILE_TYPES = gl || yl
})
var Di = y((ut) => {
  'use strict'
  Object.defineProperty(ut, '__esModule', { value: !0 })
  ut.createDirentFromStats = void 0
  var $i = class {
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
  function ml(e, t) {
    return new $i(e, t)
  }
  ut.createDirentFromStats = ml
})
var nr = y((ct) => {
  'use strict'
  Object.defineProperty(ct, '__esModule', { value: !0 })
  ct.fs = void 0
  var Sl = Di()
  ct.fs = Sl
})
var sr = y((lt) => {
  'use strict'
  Object.defineProperty(lt, '__esModule', { value: !0 })
  lt.joinPathSegments = void 0
  function El(e, t, r) {
    return e.endsWith(r) ? e + t : e + r + t
  }
  lt.joinPathSegments = El
})
var Bi = y((de) => {
  'use strict'
  Object.defineProperty(de, '__esModule', { value: !0 })
  de.readdir = de.readdirWithFileTypes = de.read = void 0
  var bl = ve(),
    Ni = Li(),
    vl = rr(),
    Mi = nr(),
    qi = sr()
  function Al(e, t, r) {
    if (!t.stats && vl.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
      Ii(e, t, r)
      return
    }
    Fi(e, t, r)
  }
  de.read = Al
  function Ii(e, t, r) {
    t.fs.readdir(e, { withFileTypes: !0 }, (n, s) => {
      if (n !== null) {
        ft(r, n)
        return
      }
      let i = s.map((a) => ({
        dirent: a,
        name: a.name,
        path: qi.joinPathSegments(e, a.name, t.pathSegmentSeparator),
      }))
      if (!t.followSymbolicLinks) {
        ir(r, i)
        return
      }
      let o = i.map((a) => Rl(a, t))
      Ni(o, (a, u) => {
        if (a !== null) {
          ft(r, a)
          return
        }
        ir(r, u)
      })
    })
  }
  de.readdirWithFileTypes = Ii
  function Rl(e, t) {
    return (r) => {
      if (!e.dirent.isSymbolicLink()) {
        r(null, e)
        return
      }
      t.fs.stat(e.path, (n, s) => {
        if (n !== null) {
          if (t.throwErrorOnBrokenSymbolicLink) {
            r(n)
            return
          }
          r(null, e)
          return
        }
        ;(e.dirent = Mi.fs.createDirentFromStats(e.name, s)), r(null, e)
      })
    }
  }
  function Fi(e, t, r) {
    t.fs.readdir(e, (n, s) => {
      if (n !== null) {
        ft(r, n)
        return
      }
      let i = s.map((o) => {
        let a = qi.joinPathSegments(e, o, t.pathSegmentSeparator)
        return (u) => {
          bl.stat(a, t.fsStatSettings, (_, l) => {
            if (_ !== null) {
              u(_)
              return
            }
            let h = {
              name: o,
              path: a,
              dirent: Mi.fs.createDirentFromStats(o, l),
            }
            t.stats && (h.stats = l), u(null, h)
          })
        }
      })
      Ni(i, (o, a) => {
        if (o !== null) {
          ft(r, o)
          return
        }
        ir(r, a)
      })
    })
  }
  de.readdir = Fi
  function ft(e, t) {
    e(t)
  }
  function ir(e, t) {
    e(null, t)
  }
})
var Ki = y((_e) => {
  'use strict'
  Object.defineProperty(_e, '__esModule', { value: !0 })
  _e.readdir = _e.readdirWithFileTypes = _e.read = void 0
  var xl = ve(),
    Pl = rr(),
    ji = nr(),
    Gi = sr()
  function Cl(e, t) {
    return !t.stats && Pl.IS_SUPPORT_READDIR_WITH_FILE_TYPES
      ? Ui(e, t)
      : Wi(e, t)
  }
  _e.read = Cl
  function Ui(e, t) {
    return t.fs.readdirSync(e, { withFileTypes: !0 }).map((n) => {
      let s = {
        dirent: n,
        name: n.name,
        path: Gi.joinPathSegments(e, n.name, t.pathSegmentSeparator),
      }
      if (s.dirent.isSymbolicLink() && t.followSymbolicLinks)
        try {
          let i = t.fs.statSync(s.path)
          s.dirent = ji.fs.createDirentFromStats(s.name, i)
        } catch (i) {
          if (t.throwErrorOnBrokenSymbolicLink) throw i
        }
      return s
    })
  }
  _e.readdirWithFileTypes = Ui
  function Wi(e, t) {
    return t.fs.readdirSync(e).map((n) => {
      let s = Gi.joinPathSegments(e, n, t.pathSegmentSeparator),
        i = xl.statSync(s, t.fsStatSettings),
        o = { name: n, path: s, dirent: ji.fs.createDirentFromStats(n, i) }
      return t.stats && (o.stats = i), o
    })
  }
  _e.readdir = Wi
})
var Vi = y((ge) => {
  'use strict'
  Object.defineProperty(ge, '__esModule', { value: !0 })
  ge.createFileSystemAdapter = ge.FILE_SYSTEM_ADAPTER = void 0
  var Le = require('fs')
  ge.FILE_SYSTEM_ADAPTER = {
    lstat: Le.lstat,
    stat: Le.stat,
    lstatSync: Le.lstatSync,
    statSync: Le.statSync,
    readdir: Le.readdir,
    readdirSync: Le.readdirSync,
  }
  function wl(e) {
    return e === void 0
      ? ge.FILE_SYSTEM_ADAPTER
      : Object.assign(Object.assign({}, ge.FILE_SYSTEM_ADAPTER), e)
  }
  ge.createFileSystemAdapter = wl
})
var Qi = y((or) => {
  'use strict'
  Object.defineProperty(or, '__esModule', { value: !0 })
  var Tl = require('path'),
    Ol = ve(),
    Ll = Vi(),
    Yi = class {
      constructor(t = {}) {
        ;(this._options = t),
          (this.followSymbolicLinks = this._getValue(
            this._options.followSymbolicLinks,
            !1,
          )),
          (this.fs = Ll.createFileSystemAdapter(this._options.fs)),
          (this.pathSegmentSeparator = this._getValue(
            this._options.pathSegmentSeparator,
            Tl.sep,
          )),
          (this.stats = this._getValue(this._options.stats, !1)),
          (this.throwErrorOnBrokenSymbolicLink = this._getValue(
            this._options.throwErrorOnBrokenSymbolicLink,
            !0,
          )),
          (this.fsStatSettings = new Ol.Settings({
            followSymbolicLink: this.followSymbolicLinks,
            fs: this.fs,
            throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink,
          }))
      }
      _getValue(t, r) {
        return t ?? r
      }
    }
  or.default = Yi
})
var pt = y((ye) => {
  'use strict'
  Object.defineProperty(ye, '__esModule', { value: !0 })
  ye.Settings = ye.scandirSync = ye.scandir = void 0
  var Xi = Bi(),
    kl = Ki(),
    ar = Qi()
  ye.Settings = ar.default
  function Hl(e, t, r) {
    if (typeof t == 'function') {
      Xi.read(e, ur(), t)
      return
    }
    Xi.read(e, ur(t), r)
  }
  ye.scandir = Hl
  function $l(e, t) {
    let r = ur(t)
    return kl.read(e, r)
  }
  ye.scandirSync = $l
  function ur(e = {}) {
    return e instanceof ar.default ? e : new ar.default(e)
  }
})
var zi = y((eh, Zi) => {
  'use strict'
  function Dl(e) {
    var t = new e(),
      r = t
    function n() {
      var i = t
      return (
        i.next ? (t = i.next) : ((t = new e()), (r = t)), (i.next = null), i
      )
    }
    function s(i) {
      ;(r.next = i), (r = i)
    }
    return { get: n, release: s }
  }
  Zi.exports = Dl
})
var eo = y((th, cr) => {
  'use strict'
  var Nl = zi()
  function Ji(e, t, r) {
    if ((typeof e == 'function' && ((r = t), (t = e), (e = null)), r < 1))
      throw new Error('fastqueue concurrency must be greater than 1')
    var n = Nl(Ml),
      s = null,
      i = null,
      o = 0,
      a = null,
      u = {
        push: S,
        drain: ee,
        saturated: ee,
        pause: l,
        paused: !1,
        concurrency: r,
        running: _,
        resume: T,
        idle: g,
        length: h,
        getQueue: c,
        unshift: v,
        empty: ee,
        kill: N,
        killAndDrain: L,
        error: R,
      }
    return u
    function _() {
      return o
    }
    function l() {
      u.paused = !0
    }
    function h() {
      for (var A = s, $ = 0; A; ) (A = A.next), $++
      return $
    }
    function c() {
      for (var A = s, $ = []; A; ) $.push(A.value), (A = A.next)
      return $
    }
    function T() {
      if (!!u.paused) {
        u.paused = !1
        for (var A = 0; A < u.concurrency; A++) o++, x()
      }
    }
    function g() {
      return o === 0 && u.length() === 0
    }
    function S(A, $) {
      var b = n.get()
      ;(b.context = e),
        (b.release = x),
        (b.value = A),
        (b.callback = $ || ee),
        (b.errorHandler = a),
        o === u.concurrency || u.paused
          ? i
            ? ((i.next = b), (i = b))
            : ((s = b), (i = b), u.saturated())
          : (o++, t.call(e, b.value, b.worked))
    }
    function v(A, $) {
      var b = n.get()
      ;(b.context = e),
        (b.release = x),
        (b.value = A),
        (b.callback = $ || ee),
        o === u.concurrency || u.paused
          ? s
            ? ((b.next = s), (s = b))
            : ((s = b), (i = b), u.saturated())
          : (o++, t.call(e, b.value, b.worked))
    }
    function x(A) {
      A && n.release(A)
      var $ = s
      $
        ? u.paused
          ? o--
          : (i === s && (i = null),
            (s = $.next),
            ($.next = null),
            t.call(e, $.value, $.worked),
            i === null && u.empty())
        : --o == 0 && u.drain()
    }
    function N() {
      ;(s = null), (i = null), (u.drain = ee)
    }
    function L() {
      ;(s = null), (i = null), u.drain(), (u.drain = ee)
    }
    function R(A) {
      a = A
    }
  }
  function ee() {}
  function Ml() {
    ;(this.value = null),
      (this.callback = ee),
      (this.next = null),
      (this.release = ee),
      (this.context = null),
      (this.errorHandler = null)
    var e = this
    this.worked = function (r, n) {
      var s = e.callback,
        i = e.errorHandler,
        o = e.value
      ;(e.value = null),
        (e.callback = ee),
        e.errorHandler && i(r, o),
        s.call(e.context, r, n),
        e.release(e)
    }
  }
  function ql(e, t, r) {
    typeof e == 'function' && ((r = t), (t = e), (e = null))
    function n(l, h) {
      t.call(this, l).then(function (c) {
        h(null, c)
      }, h)
    }
    var s = Ji(e, n, r),
      i = s.push,
      o = s.unshift
    return (s.push = a), (s.unshift = u), (s.drained = _), s
    function a(l) {
      var h = new Promise(function (c, T) {
        i(l, function (g, S) {
          if (g) {
            T(g)
            return
          }
          c(S)
        })
      })
      return h.catch(ee), h
    }
    function u(l) {
      var h = new Promise(function (c, T) {
        o(l, function (g, S) {
          if (g) {
            T(g)
            return
          }
          c(S)
        })
      })
      return h.catch(ee), h
    }
    function _() {
      var l = s.drain,
        h = new Promise(function (c) {
          s.drain = function () {
            l(), c()
          }
        })
      return h
    }
  }
  cr.exports = Ji
  cr.exports.promise = ql
})
var ht = y((oe) => {
  'use strict'
  Object.defineProperty(oe, '__esModule', { value: !0 })
  oe.joinPathSegments =
    oe.replacePathSegmentSeparator =
    oe.isAppliedFilter =
    oe.isFatalError =
      void 0
  function Il(e, t) {
    return e.errorFilter === null ? !0 : !e.errorFilter(t)
  }
  oe.isFatalError = Il
  function Fl(e, t) {
    return e === null || e(t)
  }
  oe.isAppliedFilter = Fl
  function Bl(e, t) {
    return e.split(/[/\\]/).join(t)
  }
  oe.replacePathSegmentSeparator = Bl
  function jl(e, t, r) {
    return e === '' ? t : e.endsWith(r) ? e + t : e + r + t
  }
  oe.joinPathSegments = jl
})
var fr = y((lr) => {
  'use strict'
  Object.defineProperty(lr, '__esModule', { value: !0 })
  var Gl = ht(),
    to = class {
      constructor(t, r) {
        ;(this._root = t),
          (this._settings = r),
          (this._root = Gl.replacePathSegmentSeparator(
            t,
            r.pathSegmentSeparator,
          ))
      }
    }
  lr.default = to
})
var hr = y((pr) => {
  'use strict'
  Object.defineProperty(pr, '__esModule', { value: !0 })
  var Ul = require('events'),
    Wl = pt(),
    Kl = eo(),
    dt = ht(),
    Vl = fr(),
    ro = class extends Vl.default {
      constructor(t, r) {
        super(t, r)
        ;(this._settings = r),
          (this._scandir = Wl.scandir),
          (this._emitter = new Ul.EventEmitter()),
          (this._queue = Kl(
            this._worker.bind(this),
            this._settings.concurrency,
          )),
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
        if (this._isDestroyed)
          throw new Error('The reader is already destroyed')
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
          if (n !== null) {
            r(n, void 0)
            return
          }
          for (let i of s) this._handleEntry(i, t.base)
          r(null, void 0)
        })
      }
      _handleError(t) {
        this._isDestroyed ||
          !dt.isFatalError(this._settings, t) ||
          ((this._isFatalError = !0),
          (this._isDestroyed = !0),
          this._emitter.emit('error', t))
      }
      _handleEntry(t, r) {
        if (this._isDestroyed || this._isFatalError) return
        let n = t.path
        r !== void 0 &&
          (t.path = dt.joinPathSegments(
            r,
            t.name,
            this._settings.pathSegmentSeparator,
          )),
          dt.isAppliedFilter(this._settings.entryFilter, t) &&
            this._emitEntry(t),
          t.dirent.isDirectory() &&
            dt.isAppliedFilter(this._settings.deepFilter, t) &&
            this._pushToQueue(n, r === void 0 ? void 0 : t.path)
      }
      _emitEntry(t) {
        this._emitter.emit('entry', t)
      }
    }
  pr.default = ro
})
var so = y((dr) => {
  'use strict'
  Object.defineProperty(dr, '__esModule', { value: !0 })
  var Yl = hr(),
    no = class {
      constructor(t, r) {
        ;(this._root = t),
          (this._settings = r),
          (this._reader = new Yl.default(this._root, this._settings)),
          (this._storage = [])
      }
      read(t) {
        this._reader.onError((r) => {
          Ql(t, r)
        }),
          this._reader.onEntry((r) => {
            this._storage.push(r)
          }),
          this._reader.onEnd(() => {
            Xl(t, this._storage)
          }),
          this._reader.read()
      }
    }
  dr.default = no
  function Ql(e, t) {
    e(t)
  }
  function Xl(e, t) {
    e(null, t)
  }
})
var oo = y((_r) => {
  'use strict'
  Object.defineProperty(_r, '__esModule', { value: !0 })
  var Zl = require('stream'),
    zl = hr(),
    io = class {
      constructor(t, r) {
        ;(this._root = t),
          (this._settings = r),
          (this._reader = new zl.default(this._root, this._settings)),
          (this._stream = new Zl.Readable({
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
  _r.default = io
})
var uo = y((gr) => {
  'use strict'
  Object.defineProperty(gr, '__esModule', { value: !0 })
  var Jl = pt(),
    _t = ht(),
    ef = fr(),
    ao = class extends ef.default {
      constructor() {
        super(...arguments)
        ;(this._scandir = Jl.scandirSync),
          (this._storage = []),
          (this._queue = new Set())
      }
      read() {
        return (
          this._pushToQueue(this._root, this._settings.basePath),
          this._handleQueue(),
          this._storage
        )
      }
      _pushToQueue(t, r) {
        this._queue.add({ directory: t, base: r })
      }
      _handleQueue() {
        for (let t of this._queue.values())
          this._handleDirectory(t.directory, t.base)
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
        if (!!_t.isFatalError(this._settings, t)) throw t
      }
      _handleEntry(t, r) {
        let n = t.path
        r !== void 0 &&
          (t.path = _t.joinPathSegments(
            r,
            t.name,
            this._settings.pathSegmentSeparator,
          )),
          _t.isAppliedFilter(this._settings.entryFilter, t) &&
            this._pushToStorage(t),
          t.dirent.isDirectory() &&
            _t.isAppliedFilter(this._settings.deepFilter, t) &&
            this._pushToQueue(n, r === void 0 ? void 0 : t.path)
      }
      _pushToStorage(t) {
        this._storage.push(t)
      }
    }
  gr.default = ao
})
var lo = y((yr) => {
  'use strict'
  Object.defineProperty(yr, '__esModule', { value: !0 })
  var tf = uo(),
    co = class {
      constructor(t, r) {
        ;(this._root = t),
          (this._settings = r),
          (this._reader = new tf.default(this._root, this._settings))
      }
      read() {
        return this._reader.read()
      }
    }
  yr.default = co
})
var po = y((mr) => {
  'use strict'
  Object.defineProperty(mr, '__esModule', { value: !0 })
  var rf = require('path'),
    nf = pt(),
    fo = class {
      constructor(t = {}) {
        ;(this._options = t),
          (this.basePath = this._getValue(this._options.basePath, void 0)),
          (this.concurrency = this._getValue(
            this._options.concurrency,
            Number.POSITIVE_INFINITY,
          )),
          (this.deepFilter = this._getValue(this._options.deepFilter, null)),
          (this.entryFilter = this._getValue(this._options.entryFilter, null)),
          (this.errorFilter = this._getValue(this._options.errorFilter, null)),
          (this.pathSegmentSeparator = this._getValue(
            this._options.pathSegmentSeparator,
            rf.sep,
          )),
          (this.fsScandirSettings = new nf.Settings({
            followSymbolicLinks: this._options.followSymbolicLinks,
            fs: this._options.fs,
            pathSegmentSeparator: this._options.pathSegmentSeparator,
            stats: this._options.stats,
            throwErrorOnBrokenSymbolicLink:
              this._options.throwErrorOnBrokenSymbolicLink,
          }))
      }
      _getValue(t, r) {
        return t ?? r
      }
    }
  mr.default = fo
})
var Er = y((ae) => {
  'use strict'
  Object.defineProperty(ae, '__esModule', { value: !0 })
  ae.Settings = ae.walkStream = ae.walkSync = ae.walk = void 0
  var ho = so(),
    sf = oo(),
    of = lo(),
    Sr = po()
  ae.Settings = Sr.default
  function af(e, t, r) {
    if (typeof t == 'function') {
      new ho.default(e, gt()).read(t)
      return
    }
    new ho.default(e, gt(t)).read(r)
  }
  ae.walk = af
  function uf(e, t) {
    let r = gt(t)
    return new of.default(e, r).read()
  }
  ae.walkSync = uf
  function cf(e, t) {
    let r = gt(t)
    return new sf.default(e, r).read()
  }
  ae.walkStream = cf
  function gt(e = {}) {
    return e instanceof Sr.default ? e : new Sr.default(e)
  }
})
var vr = y((br) => {
  'use strict'
  Object.defineProperty(br, '__esModule', { value: !0 })
  var lf = require('path'),
    ff = ve(),
    _o = ce(),
    go = class {
      constructor(t) {
        ;(this._settings = t),
          (this._fsStatSettings = new ff.Settings({
            followSymbolicLink: this._settings.followSymbolicLinks,
            fs: this._settings.fs,
            throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks,
          }))
      }
      _getFullEntryPath(t) {
        return lf.resolve(this._settings.cwd, t)
      }
      _makeEntry(t, r) {
        let n = { name: r, path: r, dirent: _o.fs.createDirentFromStats(r, t) }
        return this._settings.stats && (n.stats = t), n
      }
      _isFatalError(t) {
        return !_o.errno.isEnoentCodeError(t) && !this._settings.suppressErrors
      }
    }
  br.default = go
})
var Rr = y((Ar) => {
  'use strict'
  Object.defineProperty(Ar, '__esModule', { value: !0 })
  var pf = require('stream'),
    hf = ve(),
    df = Er(),
    _f = vr(),
    yo = class extends _f.default {
      constructor() {
        super(...arguments)
        ;(this._walkStream = df.walkStream), (this._stat = hf.stat)
      }
      dynamic(t, r) {
        return this._walkStream(t, r)
      }
      static(t, r) {
        let n = t.map(this._getFullEntryPath, this),
          s = new pf.PassThrough({ objectMode: !0 })
        s._write = (i, o, a) =>
          this._getEntry(n[i], t[i], r)
            .then((u) => {
              u !== null && r.entryFilter(u) && s.push(u),
                i === n.length - 1 && s.end(),
                a()
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
          this._stat(t, this._fsStatSettings, (s, i) =>
            s === null ? r(i) : n(s),
          )
        })
      }
    }
  Ar.default = yo
})
var So = y((xr) => {
  'use strict'
  Object.defineProperty(xr, '__esModule', { value: !0 })
  var ke = ce(),
    mo = class {
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
          this._storage.push({
            complete: s.length <= 1,
            pattern: r,
            segments: n,
            sections: s,
          })
        }
      }
      _getPatternSegments(t) {
        return ke.pattern
          .getPatternParts(t, this._micromatchOptions)
          .map((n) =>
            ke.pattern.isDynamicPattern(n, this._settings)
              ? {
                  dynamic: !0,
                  pattern: n,
                  patternRe: ke.pattern.makeRe(n, this._micromatchOptions),
                }
              : { dynamic: !1, pattern: n },
          )
      }
      _splitSegmentsIntoSections(t) {
        return ke.array.splitWhen(
          t,
          (r) => r.dynamic && ke.pattern.hasGlobStar(r.pattern),
        )
      }
    }
  xr.default = mo
})
var bo = y((Pr) => {
  'use strict'
  Object.defineProperty(Pr, '__esModule', { value: !0 })
  var gf = So(),
    Eo = class extends gf.default {
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
              return !!(
                (l.dynamic && l.patternRe.test(u)) ||
                (!l.dynamic && l.pattern === u)
              )
            })
          )
            return !0
        }
        return !1
      }
    }
  Pr.default = Eo
})
var Ao = y((Cr) => {
  'use strict'
  Object.defineProperty(Cr, '__esModule', { value: !0 })
  var yt = ce(),
    yf = bo(),
    vo = class {
      constructor(t, r) {
        ;(this._settings = t), (this._micromatchOptions = r)
      }
      getFilter(t, r, n) {
        let s = this._getMatcher(r),
          i = this._getNegativePatternsRe(n)
        return (o) => this._filter(t, o, s, i)
      }
      _getMatcher(t) {
        return new yf.default(t, this._settings, this._micromatchOptions)
      }
      _getNegativePatternsRe(t) {
        let r = t.filter(yt.pattern.isAffectDepthOfReadingPattern)
        return yt.pattern.convertPatternsToRe(r, this._micromatchOptions)
      }
      _filter(t, r, n, s) {
        if (this._isSkippedByDeep(t, r.path) || this._isSkippedSymbolicLink(r))
          return !1
        let i = yt.path.removeLeadingDotSegment(r.path)
        return this._isSkippedByPositivePatterns(i, n)
          ? !1
          : this._isSkippedByNegativePatterns(i, s)
      }
      _isSkippedByDeep(t, r) {
        return this._settings.deep === 1 / 0
          ? !1
          : this._getEntryLevel(t, r) >= this._settings.deep
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
        return !yt.pattern.matchAny(t, r)
      }
    }
  Cr.default = vo
})
var xo = y((wr) => {
  'use strict'
  Object.defineProperty(wr, '__esModule', { value: !0 })
  var He = ce(),
    Ro = class {
      constructor(t, r) {
        ;(this._settings = t),
          (this._micromatchOptions = r),
          (this.index = new Map())
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
          i =
            this._isMatchToPatterns(s, r) && !this._isMatchToPatterns(t.path, n)
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
  wr.default = Ro
})
var Co = y((Tr) => {
  'use strict'
  Object.defineProperty(Tr, '__esModule', { value: !0 })
  var mf = ce(),
    Po = class {
      constructor(t) {
        this._settings = t
      }
      getFilter() {
        return (t) => this._isNonFatalError(t)
      }
      _isNonFatalError(t) {
        return mf.errno.isEnoentCodeError(t) || this._settings.suppressErrors
      }
    }
  Tr.default = Po
})
var Oo = y((Or) => {
  'use strict'
  Object.defineProperty(Or, '__esModule', { value: !0 })
  var wo = ce(),
    To = class {
      constructor(t) {
        this._settings = t
      }
      getTransformer() {
        return (t) => this._transform(t)
      }
      _transform(t) {
        let r = t.path
        return (
          this._settings.absolute &&
            ((r = wo.path.makeAbsolute(this._settings.cwd, r)),
            (r = wo.path.unixify(r))),
          this._settings.markDirectories &&
            t.dirent.isDirectory() &&
            (r += '/'),
          this._settings.objectMode
            ? Object.assign(Object.assign({}, t), { path: r })
            : r
        )
      }
    }
  Or.default = To
})
var mt = y((Lr) => {
  'use strict'
  Object.defineProperty(Lr, '__esModule', { value: !0 })
  var Sf = require('path'),
    Ef = Ao(),
    bf = xo(),
    vf = Co(),
    Af = Oo(),
    Lo = class {
      constructor(t) {
        ;(this._settings = t),
          (this.errorFilter = new vf.default(this._settings)),
          (this.entryFilter = new bf.default(
            this._settings,
            this._getMicromatchOptions(),
          )),
          (this.deepFilter = new Ef.default(
            this._settings,
            this._getMicromatchOptions(),
          )),
          (this.entryTransformer = new Af.default(this._settings))
      }
      _getRootDirectory(t) {
        return Sf.resolve(this._settings.cwd, t.base)
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
          posix: !0,
          strictSlashes: !1,
        }
      }
    }
  Lr.default = Lo
})
var Ho = y((kr) => {
  'use strict'
  Object.defineProperty(kr, '__esModule', { value: !0 })
  var Rf = Rr(),
    xf = mt(),
    ko = class extends xf.default {
      constructor() {
        super(...arguments)
        this._reader = new Rf.default(this._settings)
      }
      read(t) {
        let r = this._getRootDirectory(t),
          n = this._getReaderOptions(t),
          s = []
        return new Promise((i, o) => {
          let a = this.api(r, t, n)
          a.once('error', o),
            a.on('data', (u) => s.push(n.transform(u))),
            a.once('end', () => i(s))
        })
      }
      api(t, r, n) {
        return r.dynamic
          ? this._reader.dynamic(t, n)
          : this._reader.static(r.patterns, n)
      }
    }
  kr.default = ko
})
var Do = y((Hr) => {
  'use strict'
  Object.defineProperty(Hr, '__esModule', { value: !0 })
  var Pf = require('stream'),
    Cf = Rr(),
    wf = mt(),
    $o = class extends wf.default {
      constructor() {
        super(...arguments)
        this._reader = new Cf.default(this._settings)
      }
      read(t) {
        let r = this._getRootDirectory(t),
          n = this._getReaderOptions(t),
          s = this.api(r, t, n),
          i = new Pf.Readable({ objectMode: !0, read: () => {} })
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
        return r.dynamic
          ? this._reader.dynamic(t, n)
          : this._reader.static(r.patterns, n)
      }
    }
  Hr.default = $o
})
var Mo = y(($r) => {
  'use strict'
  Object.defineProperty($r, '__esModule', { value: !0 })
  var Tf = ve(),
    Of = Er(),
    Lf = vr(),
    No = class extends Lf.default {
      constructor() {
        super(...arguments)
        ;(this._walkSync = Of.walkSync), (this._statSync = Tf.statSync)
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
  $r.default = No
})
var Io = y((Dr) => {
  'use strict'
  Object.defineProperty(Dr, '__esModule', { value: !0 })
  var kf = Mo(),
    Hf = mt(),
    qo = class extends Hf.default {
      constructor() {
        super(...arguments)
        this._reader = new kf.default(this._settings)
      }
      read(t) {
        let r = this._getRootDirectory(t),
          n = this._getReaderOptions(t)
        return this.api(r, t, n).map(n.transform)
      }
      api(t, r, n) {
        return r.dynamic
          ? this._reader.dynamic(t, n)
          : this._reader.static(r.patterns, n)
      }
    }
  Dr.default = qo
})
var Bo = y((De) => {
  'use strict'
  Object.defineProperty(De, '__esModule', { value: !0 })
  De.DEFAULT_FILE_SYSTEM_ADAPTER = void 0
  var $e = require('fs'),
    $f = require('os'),
    Df = Math.max($f.cpus().length, 1)
  De.DEFAULT_FILE_SYSTEM_ADAPTER = {
    lstat: $e.lstat,
    lstatSync: $e.lstatSync,
    stat: $e.stat,
    statSync: $e.statSync,
    readdir: $e.readdir,
    readdirSync: $e.readdirSync,
  }
  var Fo = class {
    constructor(t = {}) {
      ;(this._options = t),
        (this.absolute = this._getValue(this._options.absolute, !1)),
        (this.baseNameMatch = this._getValue(this._options.baseNameMatch, !1)),
        (this.braceExpansion = this._getValue(
          this._options.braceExpansion,
          !0,
        )),
        (this.caseSensitiveMatch = this._getValue(
          this._options.caseSensitiveMatch,
          !0,
        )),
        (this.concurrency = this._getValue(this._options.concurrency, Df)),
        (this.cwd = this._getValue(this._options.cwd, process.cwd())),
        (this.deep = this._getValue(this._options.deep, 1 / 0)),
        (this.dot = this._getValue(this._options.dot, !1)),
        (this.extglob = this._getValue(this._options.extglob, !0)),
        (this.followSymbolicLinks = this._getValue(
          this._options.followSymbolicLinks,
          !0,
        )),
        (this.fs = this._getFileSystemMethods(this._options.fs)),
        (this.globstar = this._getValue(this._options.globstar, !0)),
        (this.ignore = this._getValue(this._options.ignore, [])),
        (this.markDirectories = this._getValue(
          this._options.markDirectories,
          !1,
        )),
        (this.objectMode = this._getValue(this._options.objectMode, !1)),
        (this.onlyDirectories = this._getValue(
          this._options.onlyDirectories,
          !1,
        )),
        (this.onlyFiles = this._getValue(this._options.onlyFiles, !0)),
        (this.stats = this._getValue(this._options.stats, !1)),
        (this.suppressErrors = this._getValue(
          this._options.suppressErrors,
          !1,
        )),
        (this.throwErrorOnBrokenSymbolicLink = this._getValue(
          this._options.throwErrorOnBrokenSymbolicLink,
          !1,
        )),
        (this.unique = this._getValue(this._options.unique, !0)),
        this.onlyDirectories && (this.onlyFiles = !1),
        this.stats && (this.objectMode = !0)
    }
    _getValue(t, r) {
      return t === void 0 ? r : t
    }
    _getFileSystemMethods(t = {}) {
      return Object.assign(Object.assign({}, De.DEFAULT_FILE_SYSTEM_ADAPTER), t)
    }
  }
  De.default = Fo
})
var Uo = y((xh, Go) => {
  'use strict'
  var jo = Si(),
    Nf = Ho(),
    Mf = Do(),
    qf = Io(),
    Nr = Bo(),
    Ae = ce()
  async function Mr(e, t) {
    Ne(e)
    let r = qr(e, Nf.default, t),
      n = await Promise.all(r)
    return Ae.array.flatten(n)
  }
  ;(function (e) {
    function t(o, a) {
      Ne(o)
      let u = qr(o, qf.default, a)
      return Ae.array.flatten(u)
    }
    e.sync = t
    function r(o, a) {
      Ne(o)
      let u = qr(o, Mf.default, a)
      return Ae.stream.merge(u)
    }
    e.stream = r
    function n(o, a) {
      Ne(o)
      let u = [].concat(o),
        _ = new Nr.default(a)
      return jo.generate(u, _)
    }
    e.generateTasks = n
    function s(o, a) {
      Ne(o)
      let u = new Nr.default(a)
      return Ae.pattern.isDynamicPattern(o, u)
    }
    e.isDynamicPattern = s
    function i(o) {
      return Ne(o), Ae.path.escape(o)
    }
    e.escapePath = i
  })(Mr || (Mr = {}))
  function qr(e, t, r) {
    let n = [].concat(e),
      s = new Nr.default(r),
      i = jo.generate(n, s),
      o = new t(s)
    return i.map(o.read, o)
  }
  function Ne(e) {
    if (
      ![].concat(e).every((n) => Ae.string.isString(n) && !Ae.string.isEmpty(n))
    )
      throw new TypeError(
        'Patterns must be a string (non empty) or an array of strings',
      )
  }
  Go.exports = Mr
})
var ra = Se(require('fs')),
  na = Se(Kr()),
  sa = Se(require('path'))
var Zo = Se(Dn()),
  zo = Se(require('esbuild')),
  Jo = Se(Uo())
var Re = !0,
  Me =
    typeof self != 'undefined'
      ? self
      : typeof window != 'undefined'
      ? window
      : typeof global != 'undefined'
      ? global
      : {},
  Wo = 0
if (Me.process && Me.process.env && Me.process.stdout) {
  let { FORCE_COLOR: e, NODE_DISABLE_COLORS: t, TERM: r } = Me.process.env
  t || e === '0'
    ? (Re = !1)
    : e === '1'
    ? (Re = !0)
    : r === 'dumb'
    ? (Re = !1)
    : 'CI' in Me.process.env &&
      [
        'TRAVIS',
        'CIRCLECI',
        'APPVEYOR',
        'GITLAB_CI',
        'GITHUB_ACTIONS',
        'BUILDKITE',
        'DRONE',
      ].some((n) => n in Me.process.env)
    ? (Re = !0)
    : (Re = process.stdout.isTTY),
    Re && (Wo = r && r.endsWith('-256color') ? 2 : 1)
}
var Ko = { enabled: Re, supportLevel: Wo }
function O(e, t, r = 1) {
  let n = `[${e}m`,
    s = `[${t}m`,
    i = new RegExp(`\\x1b\\[${t}m`, 'g')
  return (o) =>
    Ko.enabled && Ko.supportLevel >= r ? n + ('' + o).replace(i, n) + s : '' + o
}
var Ph = O(0, 0),
  Ch = O(1, 22),
  wh = O(2, 22),
  Th = O(3, 23),
  Oh = O(4, 24),
  Lh = O(7, 27),
  kh = O(8, 28),
  Hh = O(9, 29),
  Ir = O(30, 39),
  $h = O(31, 39),
  Vo = O(32, 39),
  Dh = O(33, 39),
  Nh = O(34, 39),
  Mh = O(35, 39),
  Yo = O(36, 39),
  qh = O(97, 39),
  Ih = O(90, 39),
  Fh = O(37, 39),
  Bh = O(91, 39),
  jh = O(92, 39),
  Gh = O(93, 39),
  Uh = O(94, 39),
  Wh = O(95, 39),
  Kh = O(96, 39),
  Vh = O(40, 49),
  Yh = O(41, 49),
  Qo = O(42, 49),
  Qh = O(43, 49),
  Xh = O(44, 49),
  Zh = O(45, 49),
  Xo = O(46, 49),
  zh = O(107, 49),
  Jh = O(100, 49),
  ed = O(101, 49),
  td = O(102, 49),
  rd = O(103, 49),
  nd = O(104, 49),
  sd = O(105, 49),
  id = O(106, 49),
  od = O(47, 49)
var ea = Se(require('path'))
async function If(e) {
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
function Ff(e) {
  return e > 1e3 ? `${e / 1e3}s` : `${e}ms`
}
function ta(e) {
  console.log(`${Xo(Ir(' TASK '))} ${Yo(e)}`)
  let t = Date.now()
  return {
    end() {
      let r = Date.now() - t
      console.log(`${Qo(Ir(' DONE '))} ${Vo(`${e} - ${Ff(r)}`)}`)
    },
  }
}
async function Fr({
  entries: e,
  checkTypes: t = !1,
  formats: r = ['cjs'],
  options: n,
}) {
  let s = await If(e)
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
        outExtension: {
          '.js': o === 'cjs' || o === 'iife' ? '.js' : '.esm.js',
        },
        ...n,
      }),
    ),
  ),
    i.end()
}
var Br = (0, na.default)(process.argv.slice(2))
Br.version &&
  (console.log(
    JSON.parse(
      ra.default
        .readFileSync(sa.default.resolve(__dirname, '../package.json'))
        .toString('utf8'),
    ).version,
  ),
  process.exit(0))
var Bf = Br._,
  { _: fd, '--': pd, 'check-types': jf, format: jr, external: Gr, ...Gf } = Br,
  Uf = typeof jr == 'string' ? [jr] : jr,
  Wf = typeof Gr == 'string' ? [Gr] : Gr
Fr({
  entries: Bf,
  checkTypes: jf,
  formats: Uf,
  options: { ...Gf, external: Wf },
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
