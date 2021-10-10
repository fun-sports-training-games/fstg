/*! Terms: https://developers.google.com/terms */
(function () {
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    var k;
    function aa(a) {
        var b = 0;
        return function () {
            return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
        };
    }
    var ba =
        'function' == typeof Object.defineProperties
            ? Object.defineProperty
            : function (a, b, c) {
                  if (a == Array.prototype || a == Object.prototype) return a;
                  a[b] = c.value;
                  return a;
              };
    function ca(a) {
        a = [
            'object' == typeof globalThis && globalThis,
            a,
            'object' == typeof window && window,
            'object' == typeof self && self,
            'object' == typeof global && global
        ];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math) return c;
        }
        throw Error('Cannot find global object');
    }
    var da = ca(this);
    function ea(a, b) {
        if (b)
            a: {
                var c = da;
                a = a.split('.');
                for (var d = 0; d < a.length - 1; d++) {
                    var e = a[d];
                    if (!(e in c)) break a;
                    c = c[e];
                }
                a = a[a.length - 1];
                d = c[a];
                b = b(d);
                b != d && null != b && ba(c, a, { configurable: !0, writable: !0, value: b });
            }
    }
    ea('Symbol', function (a) {
        function b(f) {
            if (this instanceof b) throw new TypeError('Symbol is not a constructor');
            return new c(d + (f || '') + '_' + e++, f);
        }
        function c(f, g) {
            this.Mf = f;
            ba(this, 'description', { configurable: !0, writable: !0, value: g });
        }
        if (a) return a;
        c.prototype.toString = function () {
            return this.Mf;
        };
        var d = 'jscomp_symbol_' + ((1e9 * Math.random()) >>> 0) + '_',
            e = 0;
        return b;
    });
    ea('Symbol.iterator', function (a) {
        if (a) return a;
        a = Symbol('Symbol.iterator');
        for (
            var b =
                    'Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array'.split(
                        ' '
                    ),
                c = 0;
            c < b.length;
            c++
        ) {
            var d = da[b[c]];
            'function' === typeof d &&
                'function' != typeof d.prototype[a] &&
                ba(d.prototype, a, {
                    configurable: !0,
                    writable: !0,
                    value: function () {
                        return fa(aa(this));
                    }
                });
        }
        return a;
    });
    function fa(a) {
        a = { next: a };
        a[Symbol.iterator] = function () {
            return this;
        };
        return a;
    }
    var ia =
            'function' == typeof Object.create
                ? Object.create
                : function (a) {
                      function b() {}
                      b.prototype = a;
                      return new b();
                  },
        ja;
    if ('function' == typeof Object.setPrototypeOf) ja = Object.setPrototypeOf;
    else {
        var ka;
        a: {
            var la = { a: !0 },
                ma = {};
            try {
                ma.__proto__ = la;
                ka = ma.a;
                break a;
            } catch (a) {}
            ka = !1;
        }
        ja = ka
            ? function (a, b) {
                  a.__proto__ = b;
                  if (a.__proto__ !== b) throw new TypeError(a + ' is not extensible');
                  return a;
              }
            : null;
    }
    var oa = ja;
    function l(a, b) {
        a.prototype = ia(b.prototype);
        a.prototype.constructor = a;
        if (oa) oa(a, b);
        else
            for (var c in b)
                if ('prototype' != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d);
                    } else a[c] = b[c];
        a.Z = b.prototype;
    }
    function pa(a, b) {
        a instanceof String && (a += '');
        var c = 0,
            d = !1,
            e = {
                next: function () {
                    if (!d && c < a.length) {
                        var f = c++;
                        return { value: b(f, a[f]), done: !1 };
                    }
                    d = !0;
                    return { done: !0, value: void 0 };
                }
            };
        e[Symbol.iterator] = function () {
            return e;
        };
        return e;
    }
    ea('Array.prototype.keys', function (a) {
        return a
            ? a
            : function () {
                  return pa(this, function (b) {
                      return b;
                  });
              };
    });
    ea('Array.from', function (a) {
        return a
            ? a
            : function (b, c, d) {
                  c =
                      null != c
                          ? c
                          : function (h) {
                                return h;
                            };
                  var e = [],
                      f = 'undefined' != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
                  if ('function' == typeof f) {
                      b = f.call(b);
                      for (var g = 0; !(f = b.next()).done; ) e.push(c.call(d, f.value, g++));
                  } else for (f = b.length, g = 0; g < f; g++) e.push(c.call(d, b[g], g));
                  return e;
              };
    });
    ea('Array.prototype.values', function (a) {
        return a
            ? a
            : function () {
                  return pa(this, function (b, c) {
                      return c;
                  });
              };
    });
    var qa =
        'function' == typeof Object.assign
            ? Object.assign
            : function (a, b) {
                  for (var c = 1; c < arguments.length; c++) {
                      var d = arguments[c];
                      if (d) for (var e in d) Object.prototype.hasOwnProperty.call(d, e) && (a[e] = d[e]);
                  }
                  return a;
              };
    ea('Object.assign', function (a) {
        return a || qa;
    });
    ea('Object.is', function (a) {
        return a
            ? a
            : function (b, c) {
                  return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
              };
    });
    ea('Array.prototype.includes', function (a) {
        return a
            ? a
            : function (b, c) {
                  var d = this;
                  d instanceof String && (d = String(d));
                  var e = d.length;
                  c = c || 0;
                  for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                      var f = d[c];
                      if (f === b || Object.is(f, b)) return !0;
                  }
                  return !1;
              };
    });
    ea('String.prototype.includes', function (a) {
        return a
            ? a
            : function (b, c) {
                  if (null == this)
                      throw new TypeError(
                          "The 'this' value for String.prototype.includes must not be null or undefined"
                      );
                  if (b instanceof RegExp)
                      throw new TypeError(
                          'First argument to String.prototype.includes must not be a regular expression'
                      );
                  return -1 !== (this + '').indexOf(b, c || 0);
              };
    });
    ea('Array.prototype.entries', function (a) {
        return a
            ? a
            : function () {
                  return pa(this, function (b, c) {
                      return [b, c];
                  });
              };
    });
    var r = this || self;
    function ra() {}
    function sa(a) {
        a.Ra = void 0;
        a.Ed = function () {
            return a.Ra ? a.Ra : (a.Ra = new a());
        };
    }
    function ta(a) {
        var b = typeof a;
        return 'object' != b ? b : a ? (Array.isArray(a) ? 'array' : b) : 'null';
    }
    function ua(a) {
        var b = ta(a);
        return 'array' == b || ('object' == b && 'number' == typeof a.length);
    }
    function t(a) {
        var b = typeof a;
        return ('object' == b && null != a) || 'function' == b;
    }
    function va(a, b, c) {
        return a.call.apply(a.bind, arguments);
    }
    function wa(a, b, c) {
        if (!a) throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e);
            };
        }
        return function () {
            return a.apply(b, arguments);
        };
    }
    function u(a, b, c) {
        u = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf('native code') ? va : wa;
        return u.apply(null, arguments);
    }
    function xa(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var d = c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d);
        };
    }
    function v(a, b) {
        a = a.split('.');
        var c = r;
        a[0] in c || 'undefined' == typeof c.execScript || c.execScript('var ' + a[0]);
        for (var d; a.length && (d = a.shift()); )
            a.length || void 0 === b ? (c = c[d] && c[d] !== Object.prototype[d] ? c[d] : (c[d] = {})) : (c[d] = b);
    }
    function w(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.Z = b.prototype;
        a.prototype = new c();
        a.prototype.constructor = a;
        a.hi = function (d, e, f) {
            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++) g[h - 2] = arguments[h];
            return b.prototype[e].apply(d, g);
        };
    }
    function ya(a) {
        return a;
    }
    function za(a) {
        if (Error.captureStackTrace) Error.captureStackTrace(this, za);
        else {
            var b = Error().stack;
            b && (this.stack = b);
        }
        a && (this.message = String(a));
    }
    w(za, Error);
    za.prototype.name = 'CustomError';
    var Aa;
    function Ba(a, b) {
        a = a.split('%s');
        for (var c = '', d = a.length - 1, e = 0; e < d; e++) c += a[e] + (e < b.length ? b[e] : '%s');
        za.call(this, c + a[d]);
    }
    w(Ba, za);
    Ba.prototype.name = 'AssertionError';
    function Ca(a, b) {
        throw new Ba('Failure' + (a ? ': ' + a : ''), Array.prototype.slice.call(arguments, 1));
    }
    var Da = Array.prototype.indexOf
            ? function (a, b) {
                  return Array.prototype.indexOf.call(a, b, void 0);
              }
            : function (a, b) {
                  if ('string' === typeof a) return 'string' !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);
                  for (var c = 0; c < a.length; c++) if (c in a && a[c] === b) return c;
                  return -1;
              },
        Ea = Array.prototype.forEach
            ? function (a, b) {
                  Array.prototype.forEach.call(a, b, void 0);
              }
            : function (a, b) {
                  for (var c = a.length, d = 'string' === typeof a ? a.split('') : a, e = 0; e < c; e++)
                      e in d && b.call(void 0, d[e], e, a);
              };
    function Fa(a, b) {
        for (var c = 'string' === typeof a ? a.split('') : a, d = a.length - 1; 0 <= d; --d)
            d in c && b.call(void 0, c[d], d, a);
    }
    var Ga = Array.prototype.some
        ? function (a, b) {
              return Array.prototype.some.call(a, b, void 0);
          }
        : function (a, b) {
              for (var c = a.length, d = 'string' === typeof a ? a.split('') : a, e = 0; e < c; e++)
                  if (e in d && b.call(void 0, d[e], e, a)) return !0;
              return !1;
          };
    function Ha(a, b) {
        return 0 <= Da(a, b);
    }
    function Ia(a, b) {
        b = Da(a, b);
        var c;
        (c = 0 <= b) && Ja(a, b);
        return c;
    }
    function Ja(a, b) {
        return 1 == Array.prototype.splice.call(a, b, 1).length;
    }
    function Ka(a, b) {
        a: {
            for (var c = a.length, d = 'string' === typeof a ? a.split('') : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) {
                    b = e;
                    break a;
                }
            b = -1;
        }
        0 <= b && Ja(a, b);
    }
    function La(a, b) {
        var c = 0;
        Fa(a, function (d, e) {
            b.call(void 0, d, e, a) && Ja(a, e) && c++;
        });
    }
    function Ma(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
            return c;
        }
        return [];
    }
    function Na(a, b, c) {
        for (var d in a) b.call(c, a[d], d, a);
    }
    function Oa(a, b) {
        for (var c in a) if (b.call(void 0, a[c], c, a)) return !0;
        return !1;
    }
    function Pa(a) {
        var b = {},
            c;
        for (c in a) b[c] = a[c];
        return b;
    }
    var Qa = 'constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf'.split(' ');
    function Ra(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d) a[c] = d[c];
            for (var f = 0; f < Qa.length; f++)
                (c = Qa[f]), Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
        }
    }
    var Sa;
    function Ta() {
        if (void 0 === Sa) {
            var a = null,
                b = r.trustedTypes;
            if (b && b.createPolicy)
                try {
                    a = b.createPolicy('goog#html', { createHTML: ya, createScript: ya, createScriptURL: ya });
                } catch (c) {
                    r.console && r.console.error(c.message);
                }
            Sa = a;
        }
        return Sa;
    }
    function Ua(a, b) {
        this.ie = (a === Va && b) || '';
        this.ag = Xa;
    }
    Ua.prototype.Va = !0;
    Ua.prototype.Qa = function () {
        return this.ie;
    };
    Ua.prototype.toString = function () {
        return 'Const{' + this.ie + '}';
    };
    function Ya(a) {
        if (a instanceof Ua && a.constructor === Ua && a.ag === Xa) return a.ie;
        Ca("expected object of type Const, got '" + a + "'");
        return 'type_error:Const';
    }
    var Xa = {},
        Va = {};
    function Za(a, b) {
        this.Zd = b === $a ? a : '';
    }
    k = Za.prototype;
    k.Va = !0;
    k.Qa = function () {
        return this.Zd.toString();
    };
    k.Md = !0;
    k.Fc = function () {
        return 1;
    };
    k.toString = function () {
        return this.Zd + '';
    };
    function ab(a) {
        if (a instanceof Za && a.constructor === Za) return a.Zd;
        Ca("expected object of type TrustedResourceUrl, got '" + a + "' of type " + ta(a));
        return 'type_error:TrustedResourceUrl';
    }
    function bb() {
        var a = Ya(cb),
            b = Ta();
        a = b ? b.createScriptURL(a) : a;
        return new Za(a, $a);
    }
    var $a = {};
    var db = String.prototype.trim
        ? function (a) {
              return a.trim();
          }
        : function (a) {
              return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
          };
    function eb(a, b) {
        if (b)
            a = a
                .replace(fb, '&amp;')
                .replace(gb, '&lt;')
                .replace(hb, '&gt;')
                .replace(ib, '&quot;')
                .replace(jb, '&#39;')
                .replace(kb, '&#0;');
        else {
            if (!lb.test(a)) return a;
            -1 != a.indexOf('&') && (a = a.replace(fb, '&amp;'));
            -1 != a.indexOf('<') && (a = a.replace(gb, '&lt;'));
            -1 != a.indexOf('>') && (a = a.replace(hb, '&gt;'));
            -1 != a.indexOf('"') && (a = a.replace(ib, '&quot;'));
            -1 != a.indexOf("'") && (a = a.replace(jb, '&#39;'));
            -1 != a.indexOf('\x00') && (a = a.replace(kb, '&#0;'));
        }
        return a;
    }
    var fb = /&/g,
        gb = /</g,
        hb = />/g,
        ib = /"/g,
        jb = /'/g,
        kb = /\x00/g,
        lb = /[\x00&<>"']/;
    function mb(a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    }
    function nb(a, b) {
        this.Yd = b === ob ? a : '';
    }
    k = nb.prototype;
    k.Va = !0;
    k.Qa = function () {
        return this.Yd.toString();
    };
    k.Md = !0;
    k.Fc = function () {
        return 1;
    };
    k.toString = function () {
        return this.Yd.toString();
    };
    function pb(a) {
        if (a instanceof nb && a.constructor === nb) return a.Yd;
        Ca("expected object of type SafeUrl, got '" + a + "' of type " + ta(a));
        return 'type_error:SafeUrl';
    }
    var qb = RegExp(
            '^(?:audio/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|font/\\w+|image/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|video/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))(?:;\\w+=(?:\\w+|"[\\w;,= ]+"))*$',
            'i'
        ),
        rb = /^data:(.*);base64,[a-z0-9+\/]+=*$/i,
        sb = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
    function tb(a) {
        if (a instanceof nb) return a;
        a = 'object' == typeof a && a.Va ? a.Qa() : String(a);
        if (sb.test(a)) a = ub(a);
        else {
            a = String(a);
            a = a.replace(/(%0A|%0D)/g, '');
            var b = a.match(rb);
            a = b && qb.test(b[1]) ? ub(a) : null;
        }
        return a;
    }
    function vb(a) {
        if (a instanceof nb) return a;
        a = 'object' == typeof a && a.Va ? a.Qa() : String(a);
        sb.test(a) || (a = 'about:invalid#zClosurez');
        return ub(a);
    }
    var ob = {};
    function ub(a) {
        return new nb(a, ob);
    }
    var wb = ub('about:invalid#zClosurez');
    var xb = {};
    function yb(a, b) {
        this.Xd = b === xb ? a : '';
        this.Va = !0;
    }
    yb.prototype.Qa = function () {
        return this.Xd;
    };
    yb.prototype.toString = function () {
        return this.Xd.toString();
    };
    var zb = {};
    function Bb(a, b) {
        this.Wd = b === zb ? a : '';
        this.Va = !0;
    }
    Bb.prototype.Qa = function () {
        return this.Wd;
    };
    Bb.prototype.toString = function () {
        return this.Wd.toString();
    };
    var Cb;
    a: {
        var Db = r.navigator;
        if (Db) {
            var Eb = Db.userAgent;
            if (Eb) {
                Cb = Eb;
                break a;
            }
        }
        Cb = '';
    }
    function x(a) {
        return -1 != Cb.indexOf(a);
    }
    function Fb() {
        return (x('Chrome') || x('CriOS')) && !x('Edge');
    }
    var Gb = {};
    function Hb(a, b, c) {
        this.Vd = c === Gb ? a : '';
        this.zg = b;
        this.Va = this.Md = !0;
    }
    Hb.prototype.Fc = function () {
        return this.zg;
    };
    Hb.prototype.Qa = function () {
        return this.Vd.toString();
    };
    Hb.prototype.toString = function () {
        return this.Vd.toString();
    };
    function Ib(a) {
        if (a instanceof Hb && a.constructor === Hb) return a.Vd;
        Ca("expected object of type SafeHtml, got '" + a + "' of type " + ta(a));
        return 'type_error:SafeHtml';
    }
    function Jb(a) {
        if (a instanceof Hb) return a;
        var b = 'object' == typeof a,
            c = null;
        b && a.Md && (c = a.Fc());
        return Kb(eb(b && a.Va ? a.Qa() : String(a)), c);
    }
    function Kb(a, b) {
        var c = Ta();
        a = c ? c.createHTML(a) : a;
        return new Hb(a, b, Gb);
    }
    var Lb = new Hb((r.trustedTypes && r.trustedTypes.emptyHTML) || '', 0, Gb);
    function Mb(a, b) {
        var c = Nb(a);
        c &&
            'undefined' != typeof c[b] &&
            ((a && (a instanceof c[b] || !(a instanceof c.Location || a instanceof c.Element))) ||
                Ca('Argument is not a %s (or a non-Element, non-Location mock); got: %s', b, Ob(a)));
    }
    function Ob(a) {
        if (t(a))
            try {
                return a.constructor.displayName || a.constructor.name || Object.prototype.toString.call(a);
            } catch (b) {
                return '<object could not be stringified>';
            }
        else return void 0 === a ? 'undefined' : null === a ? 'null' : typeof a;
    }
    function Nb(a) {
        try {
            var b = a && a.ownerDocument,
                c = b && (b.defaultView || b.parentWindow);
            c = c || r;
            if (c.Element && c.Location) return c;
        } catch (d) {}
        return null;
    }
    var Pb = (function (a) {
        var b = !1,
            c;
        return function () {
            b || ((c = a()), (b = !0));
            return c;
        };
    })(function () {
        if ('undefined' === typeof document) return !1;
        var a = document.createElement('div'),
            b = document.createElement('div');
        b.appendChild(document.createElement('div'));
        a.appendChild(b);
        if (!a.firstChild) return !1;
        b = a.firstChild.firstChild;
        a.innerHTML = Ib(Lb);
        return !b.parentElement;
    });
    function Qb(a, b) {
        Mb(a, 'HTMLScriptElement');
        a.src = ab(b);
        a: {
            b = ((a.ownerDocument && a.ownerDocument.defaultView) || r).document;
            if (
                b.querySelector &&
                (b = b.querySelector('script[nonce]')) &&
                (b = b.nonce || b.getAttribute('nonce')) &&
                Rb.test(b)
            )
                break a;
            b = '';
        }
        b && a.setAttribute('nonce', b);
    }
    function Sb(a, b) {
        var c = Nb(a);
        c &&
            (!a || (!(a instanceof c.Location) && a instanceof c.Element)) &&
            Ca('Argument is not a Location (or a non-Element mock); got: %s', Ob(a));
        b = b instanceof nb ? b : vb(b);
        a.assign(pb(b));
    }
    function Tb(a, b, c, d) {
        a = a instanceof nb ? a : vb(a);
        b = b || r;
        c = c instanceof Ua ? Ya(c) : c || '';
        return void 0 !== d ? b.open(pb(a), c, d) : b.open(pb(a), c);
    }
    var Rb = /^[\w+/_-]+[=]{0,2}$/;
    function Ub(a) {
        return (a = eb(a, void 0));
    }
    function Vb(a, b) {
        this.qg = a[r.Symbol.iterator]();
        this.dh = b;
        this.ih = 0;
    }
    Vb.prototype[Symbol.iterator] = function () {
        return this;
    };
    Vb.prototype.next = function () {
        var a = this.qg.next();
        return { value: a.done ? void 0 : this.dh.call(void 0, a.value, this.ih++), done: a.done };
    };
    function Wb(a, b) {
        return new Vb(a, b);
    }
    var Xb = 'StopIteration' in r ? r.StopIteration : { message: 'StopIteration', stack: '' };
    function Yb() {}
    Yb.prototype.next = function () {
        return Yb.prototype.ya.call(this);
    };
    Yb.prototype.ya = function () {
        throw Xb;
    };
    Yb.prototype.La = function () {
        return this;
    };
    function Zb(a) {
        if (a instanceof $b || a instanceof ac || a instanceof bc) return a;
        if ('function' == typeof a.next)
            return new $b(function () {
                return cc(a);
            });
        if ('function' == typeof a[Symbol.iterator])
            return new $b(function () {
                return a[Symbol.iterator]();
            });
        if ('function' == typeof a.La)
            return new $b(function () {
                return cc(a.La());
            });
        throw Error('Not an iterator or iterable.');
    }
    function cc(a) {
        if (!(a instanceof Yb)) return a;
        var b = !1;
        return {
            next: function () {
                for (var c; !b; )
                    try {
                        c = a.ya();
                        break;
                    } catch (d) {
                        if (d !== Xb) throw d;
                        b = !0;
                    }
                return { value: c, done: b };
            }
        };
    }
    function $b(a) {
        this.Dd = a;
    }
    $b.prototype.La = function () {
        return new ac(this.Dd());
    };
    $b.prototype[Symbol.iterator] = function () {
        return new bc(this.Dd());
    };
    $b.prototype.dd = function () {
        return new bc(this.Dd());
    };
    function ac(a) {
        this.bc = a;
    }
    l(ac, Yb);
    ac.prototype.ya = function () {
        var a = this.bc.next();
        if (a.done) throw Xb;
        return a.value;
    };
    ac.prototype.next = function () {
        return ac.prototype.ya.call(this);
    };
    ac.prototype[Symbol.iterator] = function () {
        return new bc(this.bc);
    };
    ac.prototype.dd = function () {
        return new bc(this.bc);
    };
    function bc(a) {
        $b.call(this, function () {
            return a;
        });
        this.bc = a;
    }
    l(bc, $b);
    bc.prototype.next = function () {
        return this.bc.next();
    };
    function dc(a, b) {
        this.Ga = {};
        this.K = [];
        this.tc = this.size = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2) throw Error('Uneven number of arguments');
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
        } else a && this.addAll(a);
    }
    k = dc.prototype;
    k.wa = function () {
        ec(this);
        for (var a = [], b = 0; b < this.K.length; b++) a.push(this.Ga[this.K[b]]);
        return a;
    };
    k.Oa = function () {
        ec(this);
        return this.K.concat();
    };
    k.bb = function (a) {
        return this.has(a);
    };
    k.has = function (a) {
        return fc(this.Ga, a);
    };
    k.Fb = function () {
        return 0 == this.size;
    };
    k.clear = function () {
        this.Ga = {};
        this.tc = this.size = this.K.length = 0;
    };
    k.remove = function (a) {
        return this.delete(a);
    };
    k.delete = function (a) {
        return fc(this.Ga, a)
            ? (delete this.Ga[a], --this.size, this.tc++, this.K.length > 2 * this.size && ec(this), !0)
            : !1;
    };
    function ec(a) {
        if (a.size != a.K.length) {
            for (var b = 0, c = 0; b < a.K.length; ) {
                var d = a.K[b];
                fc(a.Ga, d) && (a.K[c++] = d);
                b++;
            }
            a.K.length = c;
        }
        if (a.size != a.K.length) {
            var e = {};
            for (c = b = 0; b < a.K.length; ) (d = a.K[b]), fc(e, d) || ((a.K[c++] = d), (e[d] = 1)), b++;
            a.K.length = c;
        }
    }
    k.get = function (a, b) {
        return fc(this.Ga, a) ? this.Ga[a] : b;
    };
    k.set = function (a, b) {
        fc(this.Ga, a) || ((this.size += 1), this.K.push(a), this.tc++);
        this.Ga[a] = b;
    };
    k.addAll = function (a) {
        if (a instanceof dc) for (var b = a.Oa(), c = 0; c < b.length; c++) this.set(b[c], a.get(b[c]));
        else for (b in a) this.set(b, a[b]);
    };
    k.forEach = function (a, b) {
        for (var c = this.Oa(), d = 0; d < c.length; d++) {
            var e = c[d],
                f = this.get(e);
            a.call(b, f, e, this);
        }
    };
    k.clone = function () {
        return new dc(this);
    };
    k.keys = function () {
        return Zb(this.La(!0)).dd();
    };
    k.values = function () {
        return Zb(this.La(!1)).dd();
    };
    k.entries = function () {
        var a = this;
        return Wb(this.keys(), function (b) {
            return [b, a.get(b)];
        });
    };
    k.La = function (a) {
        ec(this);
        var b = 0,
            c = this.tc,
            d = this,
            e = new Yb();
        e.ya = function () {
            if (c != d.tc) throw Error('The map has changed since the iterator was created');
            if (b >= d.K.length) throw Xb;
            var f = d.K[b++];
            return a ? f : d.Ga[f];
        };
        e.next = e.ya.bind(e);
        return e;
    };
    function fc(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }
    function gc(a) {
        if (a.wa && 'function' == typeof a.wa) return a.wa();
        if (('undefined' !== typeof Map && a instanceof Map) || ('undefined' !== typeof Set && a instanceof Set))
            return Array.from(a.values());
        if ('string' === typeof a) return a.split('');
        if (ua(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
            return b;
        }
        b = [];
        c = 0;
        for (d in a) b[c++] = a[d];
        return b;
    }
    function hc(a) {
        if (a.Oa && 'function' == typeof a.Oa) return a.Oa();
        if (!a.wa || 'function' != typeof a.wa) {
            if ('undefined' !== typeof Map && a instanceof Map) return Array.from(a.keys());
            if (!('undefined' !== typeof Set && a instanceof Set)) {
                if (ua(a) || 'string' === typeof a) {
                    var b = [];
                    a = a.length;
                    for (var c = 0; c < a; c++) b.push(c);
                    return b;
                }
                b = [];
                c = 0;
                for (var d in a) b[c++] = d;
                return b;
            }
        }
    }
    function ic(a, b, c) {
        if (a.forEach && 'function' == typeof a.forEach) a.forEach(b, c);
        else if (ua(a) || 'string' === typeof a) Array.prototype.forEach.call(a, b, c);
        else for (var d = hc(a), e = gc(a), f = e.length, g = 0; g < f; g++) b.call(c, e[g], d && d[g], a);
    }
    var jc = RegExp(
        '^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$'
    );
    function kc(a, b) {
        if (a) {
            a = a.split('&');
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf('='),
                    e = null;
                if (0 <= d) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1);
                } else f = a[c];
                b(f, e ? decodeURIComponent(e.replace(/\+/g, ' ')) : '');
            }
        }
    }
    function lc(a, b, c, d) {
        for (var e = c.length; 0 <= (b = a.indexOf(c, b)) && b < d; ) {
            var f = a.charCodeAt(b - 1);
            if (38 == f || 63 == f) if (((f = a.charCodeAt(b + e)), !f || 61 == f || 38 == f || 35 == f)) return b;
            b += e + 1;
        }
        return -1;
    }
    var mc = /#|$/;
    function nc(a, b) {
        var c = a.search(mc),
            d = lc(a, 0, b, c);
        if (0 > d) return null;
        var e = a.indexOf('&', d);
        if (0 > e || e > c) e = c;
        d += b.length + 1;
        return decodeURIComponent(a.substr(d, e - d).replace(/\+/g, ' '));
    }
    var oc = /[?&]($|#)/;
    function pc(a, b) {
        this.ua = this.vb = this.ib = '';
        this.Jb = null;
        this.mb = this.qa = '';
        this.xa = this.Xg = !1;
        if (a instanceof pc) {
            this.xa = void 0 !== b ? b : a.xa;
            qc(this, a.ib);
            var c = a.vb;
            rc(this);
            this.vb = c;
            c = a.ua;
            rc(this);
            this.ua = c;
            sc(this, a.Jb);
            c = a.qa;
            rc(this);
            this.qa = c;
            tc(this, a.X.clone());
            a = a.mb;
            rc(this);
            this.mb = a;
        } else
            a && (c = String(a).match(jc))
                ? ((this.xa = !!b),
                  qc(this, c[1] || '', !0),
                  (a = c[2] || ''),
                  rc(this),
                  (this.vb = uc(a)),
                  (a = c[3] || ''),
                  rc(this),
                  (this.ua = uc(a, !0)),
                  sc(this, c[4]),
                  (a = c[5] || ''),
                  rc(this),
                  (this.qa = uc(a, !0)),
                  tc(this, c[6] || '', !0),
                  (a = c[7] || ''),
                  rc(this),
                  (this.mb = uc(a)))
                : ((this.xa = !!b), (this.X = new vc(null, this.xa)));
    }
    k = pc.prototype;
    k.toString = function () {
        var a = [],
            b = this.ib;
        b && a.push(wc(b, xc, !0), ':');
        var c = this.ua;
        if (c || 'file' == b)
            a.push('//'),
                (b = this.vb) && a.push(wc(b, xc, !0), '@'),
                a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, '%$1')),
                (c = this.Jb),
                null != c && a.push(':', String(c));
        if ((c = this.qa))
            this.ua && '/' != c.charAt(0) && a.push('/'), a.push(wc(c, '/' == c.charAt(0) ? yc : zc, !0));
        (c = this.X.toString()) && a.push('?', c);
        (c = this.mb) && a.push('#', wc(c, Ac));
        return a.join('');
    };
    k.resolve = function (a) {
        var b = this.clone(),
            c = !!a.ib;
        c ? qc(b, a.ib) : (c = !!a.vb);
        if (c) {
            var d = a.vb;
            rc(b);
            b.vb = d;
        } else c = !!a.ua;
        c ? ((d = a.ua), rc(b), (b.ua = d)) : (c = null != a.Jb);
        d = a.qa;
        if (c) sc(b, a.Jb);
        else if ((c = !!a.qa)) {
            if ('/' != d.charAt(0))
                if (this.ua && !this.qa) d = '/' + d;
                else {
                    var e = b.qa.lastIndexOf('/');
                    -1 != e && (d = b.qa.substr(0, e + 1) + d);
                }
            e = d;
            if ('..' == e || '.' == e) d = '';
            else if (-1 != e.indexOf('./') || -1 != e.indexOf('/.')) {
                d = 0 == e.lastIndexOf('/', 0);
                e = e.split('/');
                for (var f = [], g = 0; g < e.length; ) {
                    var h = e[g++];
                    '.' == h
                        ? d && g == e.length && f.push('')
                        : '..' == h
                        ? ((1 < f.length || (1 == f.length && '' != f[0])) && f.pop(), d && g == e.length && f.push(''))
                        : (f.push(h), (d = !0));
                }
                d = f.join('/');
            } else d = e;
        }
        c ? (rc(b), (b.qa = d)) : (c = '' !== a.X.toString());
        c ? tc(b, a.X.clone()) : (c = !!a.mb);
        c && ((a = a.mb), rc(b), (b.mb = a));
        return b;
    };
    k.clone = function () {
        return new pc(this);
    };
    function qc(a, b, c) {
        rc(a);
        a.ib = c ? uc(b, !0) : b;
        a.ib && (a.ib = a.ib.replace(/:$/, ''));
    }
    function sc(a, b) {
        rc(a);
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b) throw Error('Bad port number ' + b);
            a.Jb = b;
        } else a.Jb = null;
    }
    function tc(a, b, c) {
        rc(a);
        b instanceof vc ? ((a.X = b), a.X.de(a.xa)) : (c || (b = wc(b, Bc)), (a.X = new vc(b, a.xa)));
    }
    k.getQuery = function () {
        return this.X.toString();
    };
    function Cc(a, b, c) {
        rc(a);
        a.X.set(b, c);
    }
    k.removeParameter = function (a) {
        rc(this);
        this.X.remove(a);
        return this;
    };
    function rc(a) {
        if (a.Xg) throw Error('Tried to modify a read-only Uri');
    }
    k.de = function (a) {
        this.xa = a;
        this.X && this.X.de(a);
    };
    function Dc(a) {
        return a instanceof pc ? a.clone() : new pc(a, void 0);
    }
    function uc(a, b) {
        return a ? (b ? decodeURI(a.replace(/%25/g, '%2525')) : decodeURIComponent(a)) : '';
    }
    function wc(a, b, c) {
        return 'string' === typeof a
            ? ((a = encodeURI(a).replace(b, Ec)), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, '%$1')), a)
            : null;
    }
    function Ec(a) {
        a = a.charCodeAt(0);
        return '%' + ((a >> 4) & 15).toString(16) + (a & 15).toString(16);
    }
    var xc = /[#\/\?@]/g,
        zc = /[#\?:]/g,
        yc = /[#\?]/g,
        Bc = /[#\?@]/g,
        Ac = /#/g;
    function vc(a, b) {
        this.ea = this.S = null;
        this.pa = a || null;
        this.xa = !!b;
    }
    function Fc(a) {
        a.S ||
            ((a.S = new dc()),
            (a.ea = 0),
            a.pa &&
                kc(a.pa, function (b, c) {
                    a.add(decodeURIComponent(b.replace(/\+/g, ' ')), c);
                }));
    }
    k = vc.prototype;
    k.add = function (a, b) {
        Fc(this);
        this.pa = null;
        a = Gc(this, a);
        var c = this.S.get(a);
        c || this.S.set(a, (c = []));
        c.push(b);
        this.ea += 1;
        return this;
    };
    k.remove = function (a) {
        Fc(this);
        a = Gc(this, a);
        return this.S.bb(a) ? ((this.pa = null), (this.ea -= this.S.get(a).length), this.S.remove(a)) : !1;
    };
    k.clear = function () {
        this.S = this.pa = null;
        this.ea = 0;
    };
    k.Fb = function () {
        Fc(this);
        return 0 == this.ea;
    };
    k.bb = function (a) {
        Fc(this);
        a = Gc(this, a);
        return this.S.bb(a);
    };
    k.forEach = function (a, b) {
        Fc(this);
        this.S.forEach(function (c, d) {
            c.forEach(function (e) {
                a.call(b, e, d, this);
            }, this);
        }, this);
    };
    k.Oa = function () {
        Fc(this);
        for (var a = this.S.wa(), b = this.S.Oa(), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++) c.push(b[d]);
        return c;
    };
    k.wa = function (a) {
        Fc(this);
        var b = [];
        if ('string' === typeof a) this.bb(a) && (b = b.concat(this.S.get(Gc(this, a))));
        else {
            a = this.S.wa();
            for (var c = 0; c < a.length; c++) b = b.concat(a[c]);
        }
        return b;
    };
    k.set = function (a, b) {
        Fc(this);
        this.pa = null;
        a = Gc(this, a);
        this.bb(a) && (this.ea -= this.S.get(a).length);
        this.S.set(a, [b]);
        this.ea += 1;
        return this;
    };
    k.get = function (a, b) {
        if (!a) return b;
        a = this.wa(a);
        return 0 < a.length ? String(a[0]) : b;
    };
    k.toString = function () {
        if (this.pa) return this.pa;
        if (!this.S) return '';
        for (var a = [], b = this.S.Oa(), c = 0; c < b.length; c++) {
            var d = b[c],
                e = encodeURIComponent(String(d));
            d = this.wa(d);
            for (var f = 0; f < d.length; f++) {
                var g = e;
                '' !== d[f] && (g += '=' + encodeURIComponent(String(d[f])));
                a.push(g);
            }
        }
        return (this.pa = a.join('&'));
    };
    k.clone = function () {
        var a = new vc();
        a.pa = this.pa;
        this.S && ((a.S = this.S.clone()), (a.ea = this.ea));
        return a;
    };
    function Gc(a, b) {
        b = String(b);
        a.xa && (b = b.toLowerCase());
        return b;
    }
    k.de = function (a) {
        a &&
            !this.xa &&
            (Fc(this),
            (this.pa = null),
            this.S.forEach(function (b, c) {
                var d = c.toLowerCase();
                c != d &&
                    (this.remove(c),
                    this.remove(d),
                    0 < b.length && ((this.pa = null), this.S.set(Gc(this, d), Ma(b)), (this.ea += b.length)));
            }, this));
        this.xa = a;
    };
    k.extend = function (a) {
        for (var b = 0; b < arguments.length; b++)
            ic(
                arguments[b],
                function (c, d) {
                    this.add(d, c);
                },
                this
            );
    };
    var Hc = { ui: !0 },
        Ic = { wi: !0 },
        Jc = { vi: !0 },
        Kc = { ti: !0 };
    function Lc() {
        throw Error('Do not instantiate directly');
    }
    Lc.prototype.Sb = null;
    Lc.prototype.toString = function () {
        return this.content;
    };
    function Mc() {
        Lc.call(this);
    }
    w(Mc, Lc);
    Mc.prototype.xd = Hc;
    function Nc() {
        Lc.call(this);
    }
    w(Nc, Lc);
    Nc.prototype.xd = Ic;
    Nc.prototype.Sb = 1;
    function Oc(a, b) {
        return null != a && a.xd === b;
    }
    var Pc =
        Object.freeze ||
        function (a) {
            return a;
        };
    function Qc(a) {
        Qc[' '](a);
        return a;
    }
    Qc[' '] = ra;
    function Rc(a, b) {
        var c = Sc;
        return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : (c[a] = b(a));
    }
    var Tc = x('Opera'),
        y = x('Trident') || x('MSIE'),
        Uc = x('Edge'),
        Vc = Uc || y,
        Wc =
            x('Gecko') &&
            !(-1 != Cb.toLowerCase().indexOf('webkit') && !x('Edge')) &&
            !(x('Trident') || x('MSIE')) &&
            !x('Edge'),
        Xc = -1 != Cb.toLowerCase().indexOf('webkit') && !x('Edge'),
        Yc = Xc && x('Mobile'),
        Zc = x('Macintosh');
    function $c() {
        var a = r.document;
        return a ? a.documentMode : void 0;
    }
    var ad;
    a: {
        var bd = '',
            cd = (function () {
                var a = Cb;
                if (Wc) return /rv:([^\);]+)(\)|;)/.exec(a);
                if (Uc) return /Edge\/([\d\.]+)/.exec(a);
                if (y) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
                if (Xc) return /WebKit\/(\S+)/.exec(a);
                if (Tc) return /(?:Version)[ \/]?(\S+)/.exec(a);
            })();
        cd && (bd = cd ? cd[1] : '');
        if (y) {
            var dd = $c();
            if (null != dd && dd > parseFloat(bd)) {
                ad = String(dd);
                break a;
            }
        }
        ad = bd;
    }
    var ed = ad,
        Sc = {};
    function fd(a) {
        return Rc(a, function () {
            for (
                var b = 0,
                    c = db(String(ed)).split('.'),
                    d = db(String(a)).split('.'),
                    e = Math.max(c.length, d.length),
                    f = 0;
                0 == b && f < e;
                f++
            ) {
                var g = c[f] || '',
                    h = d[f] || '';
                do {
                    g = /(\d*)(\D*)(.*)/.exec(g) || ['', '', '', ''];
                    h = /(\d*)(\D*)(.*)/.exec(h) || ['', '', '', ''];
                    if (0 == g[0].length && 0 == h[0].length) break;
                    b =
                        mb(0 == g[1].length ? 0 : parseInt(g[1], 10), 0 == h[1].length ? 0 : parseInt(h[1], 10)) ||
                        mb(0 == g[2].length, 0 == h[2].length) ||
                        mb(g[2], h[2]);
                    g = g[3];
                    h = h[3];
                } while (0 == b);
            }
            return 0 <= b;
        });
    }
    var gd;
    if (r.document && y) {
        var hd = $c();
        gd = hd ? hd : parseInt(ed, 10) || void 0;
    } else gd = void 0;
    var id = gd;
    function jd(a) {
        if (null != a)
            switch (a.Sb) {
                case 1:
                    return 1;
                case -1:
                    return -1;
                case 0:
                    return 0;
            }
        return null;
    }
    function z(a) {
        return Oc(a, Hc)
            ? a
            : a instanceof Hb
            ? B(Ib(a).toString(), a.Fc())
            : B(String(String(a)).replace(kd, ld), jd(a));
    }
    var B = (function (a) {
            function b(c) {
                this.content = c;
            }
            b.prototype = a.prototype;
            return function (c, d) {
                c = new b(String(c));
                void 0 !== d && (c.Sb = d);
                return c;
            };
        })(Mc),
        md = (function (a) {
            function b(c) {
                this.content = c;
            }
            b.prototype = a.prototype;
            return function (c) {
                return new b(String(c));
            };
        })(Nc),
        C = {};
    function nd(a) {
        return a instanceof Lc ? !!a.content : !!a;
    }
    var od = (function (a) {
        function b(c) {
            this.content = c;
        }
        b.prototype = a.prototype;
        return function (c, d) {
            c = String(c);
            if (!c) return '';
            c = new b(c);
            void 0 !== d && (c.Sb = d);
            return c;
        };
    })(Mc);
    function pd(a) {
        return a.replace(/<\//g, '<\\/').replace(/\]\]>/g, ']]\\>');
    }
    function qd(a) {
        if (Oc(a, Hc)) {
            var b = String;
            a = String(a.content).replace(rd, '').replace(sd, '&lt;');
            b = b(a).replace(td, ld);
        } else b = String(a).replace(kd, ld);
        return b;
    }
    function ud(a) {
        Oc(a, Ic) || Oc(a, Jc)
            ? (a = vd(a))
            : a instanceof nb
            ? (a = vd(pb(a)))
            : a instanceof Za
            ? (a = vd(ab(a).toString()))
            : ((a = String(a)),
              wd.test(a)
                  ? (a = a.replace(xd, yd))
                  : (Ca('Bad value `%s` for |filterNormalizeUri', [a]), (a = 'about:invalid#zSoyz')));
        return a;
    }
    function zd(a) {
        Oc(a, Ic) || Oc(a, Jc)
            ? (a = vd(a))
            : a instanceof nb
            ? (a = vd(pb(a)))
            : a instanceof Za
            ? (a = vd(ab(a).toString()))
            : ((a = String(a)),
              Ad.test(a)
                  ? (a = a.replace(xd, yd))
                  : (Ca('Bad value `%s` for |filterNormalizeMediaUri', [a]), (a = 'about:invalid#zSoyz')));
        return a;
    }
    function Bd(a) {
        Oc(a, Kc)
            ? (a = pd(a.content))
            : null == a
            ? (a = '')
            : a instanceof yb
            ? (a instanceof yb && a.constructor === yb
                  ? (a = a.Xd)
                  : (Ca("expected object of type SafeStyle, got '" + a + "' of type " + ta(a)),
                    (a = 'type_error:SafeStyle')),
              (a = pd(a)))
            : a instanceof Bb
            ? (a instanceof Bb && a.constructor === Bb
                  ? (a = a.Wd)
                  : (Ca("expected object of type SafeStyleSheet, got '" + a + "' of type " + ta(a)),
                    (a = 'type_error:SafeStyleSheet')),
              (a = pd(a)))
            : ((a = String(a)), Cd.test(a) || (Ca('Bad value `%s` for |filterCssValue', [a]), (a = 'zSoyz')));
        return a;
    }
    function D(a, b, c, d) {
        a ||
            ((a =
                c instanceof Function
                    ? c.displayName || c.name || 'unknown type name'
                    : c instanceof Object
                    ? c.constructor.displayName || c.constructor.name || Object.prototype.toString.call(c)
                    : null === c
                    ? 'null'
                    : typeof c),
            Ca('expected @param ' + b + ' of type ' + d + (', but got ' + a) + '.'));
        return c;
    }
    var Dd = {
        '\x00': '&#0;',
        '\t': '&#9;',
        '\n': '&#10;',
        '\x0B': '&#11;',
        '\f': '&#12;',
        '\r': '&#13;',
        ' ': '&#32;',
        '"': '&quot;',
        '&': '&amp;',
        "'": '&#39;',
        '-': '&#45;',
        '/': '&#47;',
        '<': '&lt;',
        '=': '&#61;',
        '>': '&gt;',
        '`': '&#96;',
        '\u0085': '&#133;',
        '\u00a0': '&#160;',
        '\u2028': '&#8232;',
        '\u2029': '&#8233;'
    };
    function ld(a) {
        return Dd[a];
    }
    var Ed = {
        '\x00': '%00',
        '\u0001': '%01',
        '\u0002': '%02',
        '\u0003': '%03',
        '\u0004': '%04',
        '\u0005': '%05',
        '\u0006': '%06',
        '\u0007': '%07',
        '\b': '%08',
        '\t': '%09',
        '\n': '%0A',
        '\x0B': '%0B',
        '\f': '%0C',
        '\r': '%0D',
        '\u000e': '%0E',
        '\u000f': '%0F',
        '\u0010': '%10',
        '\u0011': '%11',
        '\u0012': '%12',
        '\u0013': '%13',
        '\u0014': '%14',
        '\u0015': '%15',
        '\u0016': '%16',
        '\u0017': '%17',
        '\u0018': '%18',
        '\u0019': '%19',
        '\u001a': '%1A',
        '\u001b': '%1B',
        '\u001c': '%1C',
        '\u001d': '%1D',
        '\u001e': '%1E',
        '\u001f': '%1F',
        ' ': '%20',
        '"': '%22',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '<': '%3C',
        '>': '%3E',
        '\\': '%5C',
        '{': '%7B',
        '}': '%7D',
        '\u007f': '%7F',
        '\u0085': '%C2%85',
        '\u00a0': '%C2%A0',
        '\u2028': '%E2%80%A8',
        '\u2029': '%E2%80%A9',
        '\uff01': '%EF%BC%81',
        '\uff03': '%EF%BC%83',
        '\uff04': '%EF%BC%84',
        '\uff06': '%EF%BC%86',
        '\uff07': '%EF%BC%87',
        '\uff08': '%EF%BC%88',
        '\uff09': '%EF%BC%89',
        '\uff0a': '%EF%BC%8A',
        '\uff0b': '%EF%BC%8B',
        '\uff0c': '%EF%BC%8C',
        '\uff0f': '%EF%BC%8F',
        '\uff1a': '%EF%BC%9A',
        '\uff1b': '%EF%BC%9B',
        '\uff1d': '%EF%BC%9D',
        '\uff1f': '%EF%BC%9F',
        '\uff20': '%EF%BC%A0',
        '\uff3b': '%EF%BC%BB',
        '\uff3d': '%EF%BC%BD'
    };
    function yd(a) {
        return Ed[a];
    }
    var kd = /[\x00\x22\x26\x27\x3c\x3e]/g,
        td = /[\x00\x22\x27\x3c\x3e]/g,
        xd =
            /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,
        Cd =
            /^(?!-*(?:expression|(?:moz-)?binding))(?:(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|(?:rgb|hsl)a?\([0-9.%,\u0020]+\)|[-+]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:e-?[0-9]+)?(?:[a-z]{1,4}|%)?|!important)(?:\s*[,\u0020]\s*|$))*$/i,
        wd = /^(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i,
        Ad = /^[^&:\/?#]*(?:[\/?#]|$)|^https?:|^data:image\/[a-z0-9+]+;base64,[a-z0-9+\/]+=*$|^blob:/i;
    function vd(a) {
        return String(a).replace(xd, yd);
    }
    var rd = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g,
        sd = /</g;
    function Fd(a) {
        this.oa = void 0;
        this.$ = {};
        if (a) {
            var b = hc(a);
            a = gc(a);
            for (var c = 0; c < b.length; c++) this.set(b[c], a[c]);
        }
    }
    k = Fd.prototype;
    k.set = function (a, b) {
        Gd(this, a, b, !1);
    };
    k.add = function (a, b) {
        Gd(this, a, b, !0);
    };
    function Gd(a, b, c, d) {
        for (var e = 0; e < b.length; e++) {
            var f = b.charAt(e);
            a.$[f] || (a.$[f] = new Fd());
            a = a.$[f];
        }
        if (d && void 0 !== a.oa) throw Error('The collection already contains the key "' + b + '"');
        a.oa = c;
    }
    k.get = function (a) {
        a: {
            for (var b = this, c = 0; c < a.length; c++)
                if (((b = b.$[a.charAt(c)]), !b)) {
                    a = void 0;
                    break a;
                }
            a = b;
        }
        return a ? a.oa : void 0;
    };
    k.wa = function () {
        var a = [];
        Hd(this, a);
        return a;
    };
    function Hd(a, b) {
        void 0 !== a.oa && b.push(a.oa);
        for (var c in a.$) Hd(a.$[c], b);
    }
    k.Oa = function (a) {
        var b = [];
        if (a) {
            for (var c = this, d = 0; d < a.length; d++) {
                var e = a.charAt(d);
                if (!c.$[e]) return [];
                c = c.$[e];
            }
            Id(c, a, b);
        } else Id(this, '', b);
        return b;
    };
    function Id(a, b, c) {
        void 0 !== a.oa && c.push(b);
        for (var d in a.$) Id(a.$[d], b + d, c);
    }
    k.bb = function (a) {
        return void 0 !== this.get(a);
    };
    k.clear = function () {
        this.$ = {};
        this.oa = void 0;
    };
    k.remove = function (a) {
        for (var b = this, c = [], d = 0; d < a.length; d++) {
            var e = a.charAt(d);
            if (!b.$[e]) throw Error('The collection does not have the key "' + a + '"');
            c.push([b, e]);
            b = b.$[e];
        }
        a = b.oa;
        for (delete b.oa; 0 < c.length; )
            if (((e = c.pop()), (b = e[0]), (e = e[1]), b.$[e].Fb())) delete b.$[e];
            else break;
        return a;
    };
    k.clone = function () {
        return new Fd(this);
    };
    k.Fb = function () {
        var a;
        if ((a = void 0 === this.oa))
            a: {
                for (var b in this.$) {
                    a = !1;
                    break a;
                }
                a = !0;
            }
        return a;
    };
    function Jd(a) {
        this.Ua = a;
        this.je = new Fd();
        for (a = 0; a < this.Ua.length; a++) {
            var b = this.je.get('+' + this.Ua[a].g);
            b ? b.push(this.Ua[a]) : this.je.add('+' + this.Ua[a].g, [this.Ua[a]]);
        }
    }
    Jd.prototype.search = function (a) {
        var b = this.je,
            c = {},
            d = 0;
        void 0 !== b.oa && (c[d] = b.oa);
        for (; d < a.length; d++) {
            var e = a.charAt(d);
            if (!(e in b.$)) break;
            b = b.$[e];
            void 0 !== b.oa && (c[d] = b.oa);
        }
        for (var f in c) if (c.hasOwnProperty(f)) return c[f];
        return [];
    };
    function Kd(a) {
        for (var b = 0; b < Ld.length; b++) if (Ld[b].h === a) return Ld[b];
        return null;
    }
    function Md(a) {
        a = a.toUpperCase();
        for (var b = [], c = 0; c < Ld.length; c++) Ld[c].i === a && b.push(Ld[c]);
        return b;
    }
    function Nd(a) {
        if (0 < a.length && '+' == a.charAt(0)) {
            a = a.substring(1);
            for (var b = [], c = 0; c < Ld.length; c++) Ld[c].g == a && b.push(Ld[c]);
            a = b;
        } else a = Md(a);
        return a;
    }
    function Od(a) {
        a.sort(function (b, c) {
            return b.name.localeCompare(c.name, 'fr');
        });
    }
    var Ld = [
        { name: 'Afghanistan', h: '93-AF-0', g: '93', i: 'AF' },
        { name: '\u00c5land (\u00celes)', h: '358-AX-0', g: '358', i: 'AX' },
        { name: 'Albanie', h: '355-AL-0', g: '355', i: 'AL' },
        { name: 'Alg\u00e9rie', h: '213-DZ-0', g: '213', i: 'DZ' },
        { name: 'Samoa am\u00e9ricaines', h: '1-AS-0', g: '1', i: 'AS' },
        { name: 'Andorre', h: '376-AD-0', g: '376', i: 'AD' },
        { name: 'Angola', h: '244-AO-0', g: '244', i: 'AO' },
        { name: 'Anguilla', h: '1-AI-0', g: '1', i: 'AI' },
        { name: 'Antigua-et-Barbuda', h: '1-AG-0', g: '1', i: 'AG' },
        { name: 'Argentine', h: '54-AR-0', g: '54', i: 'AR' },
        { name: 'Arm\u00e9nie', h: '374-AM-0', g: '374', i: 'AM' },
        { name: 'Aruba', h: '297-AW-0', g: '297', i: 'AW' },
        { name: 'Ascension (\u00cele)', h: '247-AC-0', g: '247', i: 'AC' },
        { name: 'Australie', h: '61-AU-0', g: '61', i: 'AU' },
        { name: 'Autriche', h: '43-AT-0', g: '43', i: 'AT' },
        { name: 'Azerba\u00efdjan', h: '994-AZ-0', g: '994', i: 'AZ' },
        { name: 'Bahamas', h: '1-BS-0', g: '1', i: 'BS' },
        { name: 'Bahre\u00efn', h: '973-BH-0', g: '973', i: 'BH' },
        { name: 'Bangladesh', h: '880-BD-0', g: '880', i: 'BD' },
        { name: 'Barbade', h: '1-BB-0', g: '1', i: 'BB' },
        { name: 'Bi\u00e9lorussie', h: '375-BY-0', g: '375', i: 'BY' },
        { name: 'Belgique', h: '32-BE-0', g: '32', i: 'BE' },
        { name: 'Belize', h: '501-BZ-0', g: '501', i: 'BZ' },
        { name: 'B\u00e9nin', h: '229-BJ-0', g: '229', i: 'BJ' },
        { name: 'Bermudes', h: '1-BM-0', g: '1', i: 'BM' },
        { name: 'Bhoutan', h: '975-BT-0', g: '975', i: 'BT' },
        { name: 'Bolivie', h: '591-BO-0', g: '591', i: 'BO' },
        { name: 'Bosnie-Herz\u00e9govine', h: '387-BA-0', g: '387', i: 'BA' },
        { name: 'Botswana', h: '267-BW-0', g: '267', i: 'BW' },
        { name: 'Br\u00e9sil', h: '55-BR-0', g: '55', i: 'BR' },
        { name: "Territoire britannique de l'oc\u00e9an Indien", h: '246-IO-0', g: '246', i: 'IO' },
        { name: '\u00celes Vierges britanniques', h: '1-VG-0', g: '1', i: 'VG' },
        { name: 'Brunei', h: '673-BN-0', g: '673', i: 'BN' },
        { name: 'Bulgarie', h: '359-BG-0', g: '359', i: 'BG' },
        { name: 'Burkina Faso', h: '226-BF-0', g: '226', i: 'BF' },
        { name: 'Burundi', h: '257-BI-0', g: '257', i: 'BI' },
        { name: 'Cambodge', h: '855-KH-0', g: '855', i: 'KH' },
        { name: 'Cameroun', h: '237-CM-0', g: '237', i: 'CM' },
        { name: 'Canada', h: '1-CA-0', g: '1', i: 'CA' },
        { name: 'Cap-Vert', h: '238-CV-0', g: '238', i: 'CV' },
        { name: 'Antilles n\u00e9erlandaises', h: '599-BQ-0', g: '599', i: 'BQ' },
        { name: 'Ca\u00efmans (\u00celes)', h: '1-KY-0', g: '1', i: 'KY' },
        { name: 'R\u00e9publique centrafricaine', h: '236-CF-0', g: '236', i: 'CF' },
        { name: 'Tchad', h: '235-TD-0', g: '235', i: 'TD' },
        { name: 'Chili', h: '56-CL-0', g: '56', i: 'CL' },
        { name: 'Chine', h: '86-CN-0', g: '86', i: 'CN' },
        { name: 'Christmas (\u00cele)', h: '61-CX-0', g: '61', i: 'CX' },
        { name: 'Cocos (\u00celes) (Keeling)', h: '61-CC-0', g: '61', i: 'CC' },
        { name: 'Colombie', h: '57-CO-0', g: '57', i: 'CO' },
        { name: 'Comores', h: '269-KM-0', g: '269', i: 'KM' },
        { name: 'R\u00e9publique d\u00e9mocratique du Congo', h: '243-CD-0', g: '243', i: 'CD' },
        { name: 'R\u00e9publique du Congo', h: '242-CG-0', g: '242', i: 'CG' },
        { name: 'Cook (\u00celes)', h: '682-CK-0', g: '682', i: 'CK' },
        { name: 'Costa Rica', h: '506-CR-0', g: '506', i: 'CR' },
        { name: "C\u00f4te d'Ivoire", h: '225-CI-0', g: '225', i: 'CI' },
        { name: 'Croatie', h: '385-HR-0', g: '385', i: 'HR' },
        { name: 'Cuba', h: '53-CU-0', g: '53', i: 'CU' },
        { name: 'Cura\u00e7ao', h: '599-CW-0', g: '599', i: 'CW' },
        { name: 'Chypre', h: '357-CY-0', g: '357', i: 'CY' },
        { name: 'R\u00e9publique tch\u00e8que', h: '420-CZ-0', g: '420', i: 'CZ' },
        { name: 'Danemark', h: '45-DK-0', g: '45', i: 'DK' },
        { name: 'Djibouti', h: '253-DJ-0', g: '253', i: 'DJ' },
        { name: 'Dominique', h: '1-DM-0', g: '1', i: 'DM' },
        { name: 'R\u00e9publique dominicaine', h: '1-DO-0', g: '1', i: 'DO' },
        { name: 'Timor Oriental', h: '670-TL-0', g: '670', i: 'TL' },
        { name: '\u00c9quateur', h: '593-EC-0', g: '593', i: 'EC' },
        { name: '\u00c9gypte', h: '20-EG-0', g: '20', i: 'EG' },
        { name: 'Salvador', h: '503-SV-0', g: '503', i: 'SV' },
        { name: 'Guin\u00e9e \u00e9quatoriale', h: '240-GQ-0', g: '240', i: 'GQ' },
        { name: '\u00c9rythr\u00e9e', h: '291-ER-0', g: '291', i: 'ER' },
        { name: 'Estonie', h: '372-EE-0', g: '372', i: 'EE' },
        { name: '\u00c9thiopie', h: '251-ET-0', g: '251', i: 'ET' },
        { name: 'Falkland (\u00celes Malouines)', h: '500-FK-0', g: '500', i: 'FK' },
        { name: 'F\u00e9ro\u00e9 (\u00celes)', h: '298-FO-0', g: '298', i: 'FO' },
        { name: 'Fidji', h: '679-FJ-0', g: '679', i: 'FJ' },
        { name: 'Finlande', h: '358-FI-0', g: '358', i: 'FI' },
        { name: 'France', h: '33-FR-0', g: '33', i: 'FR' },
        { name: 'Guyane fran\u00e7aise', h: '594-GF-0', g: '594', i: 'GF' },
        { name: 'Polyn\u00e9sie fran\u00e7aise', h: '689-PF-0', g: '689', i: 'PF' },
        { name: 'Gabon', h: '241-GA-0', g: '241', i: 'GA' },
        { name: 'Gambie', h: '220-GM-0', g: '220', i: 'GM' },
        { name: 'G\u00e9orgie', h: '995-GE-0', g: '995', i: 'GE' },
        { name: 'Allemagne', h: '49-DE-0', g: '49', i: 'DE' },
        { name: 'Ghana', h: '233-GH-0', g: '233', i: 'GH' },
        { name: 'Gibraltar', h: '350-GI-0', g: '350', i: 'GI' },
        { name: 'Gr\u00e8ce', h: '30-GR-0', g: '30', i: 'GR' },
        { name: 'Groenland', h: '299-GL-0', g: '299', i: 'GL' },
        { name: 'Grenade', h: '1-GD-0', g: '1', i: 'GD' },
        { name: 'Guadeloupe', h: '590-GP-0', g: '590', i: 'GP' },
        { name: 'Guam', h: '1-GU-0', g: '1', i: 'GU' },
        { name: 'Guatemala', h: '502-GT-0', g: '502', i: 'GT' },
        { name: 'Guernesey', h: '44-GG-0', g: '44', i: 'GG' },
        { name: 'Guin\u00e9e', h: '224-GN-0', g: '224', i: 'GN' },
        { name: 'Guin\u00e9e-Bissau', h: '245-GW-0', g: '245', i: 'GW' },
        { name: 'Guyane', h: '592-GY-0', g: '592', i: 'GY' },
        { name: 'Ha\u00efti', h: '509-HT-0', g: '509', i: 'HT' },
        { name: 'Heard et McDonald (\u00celes)', h: '672-HM-0', g: '672', i: 'HM' },
        { name: 'Honduras', h: '504-HN-0', g: '504', i: 'HN' },
        { name: 'Hong\u00a0Kong', h: '852-HK-0', g: '852', i: 'HK' },
        { name: 'Hongrie', h: '36-HU-0', g: '36', i: 'HU' },
        { name: 'Islande', h: '354-IS-0', g: '354', i: 'IS' },
        { name: 'Inde', h: '91-IN-0', g: '91', i: 'IN' },
        { name: 'Indon\u00e9sie', h: '62-ID-0', g: '62', i: 'ID' },
        { name: 'Iran', h: '98-IR-0', g: '98', i: 'IR' },
        { name: 'Iraq', h: '964-IQ-0', g: '964', i: 'IQ' },
        { name: 'Irlande', h: '353-IE-0', g: '353', i: 'IE' },
        { name: 'Man (\u00cele)', h: '44-IM-0', g: '44', i: 'IM' },
        { name: 'Isra\u00ebl', h: '972-IL-0', g: '972', i: 'IL' },
        { name: 'Italie', h: '39-IT-0', g: '39', i: 'IT' },
        { name: 'Jama\u00efque', h: '1-JM-0', g: '1', i: 'JM' },
        { name: 'Japon', h: '81-JP-0', g: '81', i: 'JP' },
        { name: 'Jersey', h: '44-JE-0', g: '44', i: 'JE' },
        { name: 'Jordanie', h: '962-JO-0', g: '962', i: 'JO' },
        { name: 'Kazakhstan', h: '7-KZ-0', g: '7', i: 'KZ' },
        { name: 'Kenya', h: '254-KE-0', g: '254', i: 'KE' },
        { name: 'Kiribati', h: '686-KI-0', g: '686', i: 'KI' },
        { name: 'Kosovo', h: '377-XK-0', g: '377', i: 'XK' },
        { name: 'Kosovo', h: '381-XK-0', g: '381', i: 'XK' },
        { name: 'Kosovo', h: '386-XK-0', g: '386', i: 'XK' },
        { name: 'Kowe\u00eft', h: '965-KW-0', g: '965', i: 'KW' },
        { name: 'Kirghizstan', h: '996-KG-0', g: '996', i: 'KG' },
        { name: 'Laos', h: '856-LA-0', g: '856', i: 'LA' },
        { name: 'Lettonie', h: '371-LV-0', g: '371', i: 'LV' },
        { name: 'Liban', h: '961-LB-0', g: '961', i: 'LB' },
        { name: 'Lesotho', h: '266-LS-0', g: '266', i: 'LS' },
        { name: 'Lib\u00e9ria', h: '231-LR-0', g: '231', i: 'LR' },
        { name: 'Libye', h: '218-LY-0', g: '218', i: 'LY' },
        { name: 'Liechtenstein', h: '423-LI-0', g: '423', i: 'LI' },
        { name: 'Lituanie', h: '370-LT-0', g: '370', i: 'LT' },
        { name: 'Luxembourg', h: '352-LU-0', g: '352', i: 'LU' },
        { name: 'Macao', h: '853-MO-0', g: '853', i: 'MO' },
        { name: 'Mac\u00e9doine', h: '389-MK-0', g: '389', i: 'MK' },
        { name: 'Madagascar', h: '261-MG-0', g: '261', i: 'MG' },
        { name: 'Malawi', h: '265-MW-0', g: '265', i: 'MW' },
        { name: 'Malaisie', h: '60-MY-0', g: '60', i: 'MY' },
        { name: 'Maldives', h: '960-MV-0', g: '960', i: 'MV' },
        { name: 'Mali', h: '223-ML-0', g: '223', i: 'ML' },
        { name: 'Malte', h: '356-MT-0', g: '356', i: 'MT' },
        { name: 'Marshall (\u00celes)', h: '692-MH-0', g: '692', i: 'MH' },
        { name: 'Martinique', h: '596-MQ-0', g: '596', i: 'MQ' },
        { name: 'Mauritanie', h: '222-MR-0', g: '222', i: 'MR' },
        { name: 'Maurice (\u00cele)', h: '230-MU-0', g: '230', i: 'MU' },
        { name: 'Mayotte', h: '262-YT-0', g: '262', i: 'YT' },
        { name: 'Mexique', h: '52-MX-0', g: '52', i: 'MX' },
        { name: 'Micron\u00e9sie', h: '691-FM-0', g: '691', i: 'FM' },
        { name: 'Moldavie', h: '373-MD-0', g: '373', i: 'MD' },
        { name: 'Monaco', h: '377-MC-0', g: '377', i: 'MC' },
        { name: 'Mongolie', h: '976-MN-0', g: '976', i: 'MN' },
        { name: 'Mont\u00e9n\u00e9gro', h: '382-ME-0', g: '382', i: 'ME' },
        { name: 'Montserrat', h: '1-MS-0', g: '1', i: 'MS' },
        { name: 'Maroc', h: '212-MA-0', g: '212', i: 'MA' },
        { name: 'Mozambique', h: '258-MZ-0', g: '258', i: 'MZ' },
        { name: 'Myanmar (Birmanie)', h: '95-MM-0', g: '95', i: 'MM' },
        { name: 'Namibie', h: '264-NA-0', g: '264', i: 'NA' },
        { name: 'Nauru', h: '674-NR-0', g: '674', i: 'NR' },
        { name: 'N\u00e9pal', h: '977-NP-0', g: '977', i: 'NP' },
        { name: 'Pays-Bas', h: '31-NL-0', g: '31', i: 'NL' },
        { name: 'Nouvelle-Cal\u00e9donie', h: '687-NC-0', g: '687', i: 'NC' },
        { name: 'Nouvelle-Z\u00e9lande', h: '64-NZ-0', g: '64', i: 'NZ' },
        { name: 'Nicaragua', h: '505-NI-0', g: '505', i: 'NI' },
        { name: 'Niger', h: '227-NE-0', g: '227', i: 'NE' },
        { name: 'Nig\u00e9ria', h: '234-NG-0', g: '234', i: 'NG' },
        { name: 'Niu\u00e9', h: '683-NU-0', g: '683', i: 'NU' },
        { name: 'Norfolk (\u00cele)', h: '672-NF-0', g: '672', i: 'NF' },
        { name: 'Cor\u00e9e du Nord', h: '850-KP-0', g: '850', i: 'KP' },
        { name: 'Mariannes du Nord (\u00celes)', h: '1-MP-0', g: '1', i: 'MP' },
        { name: 'Norv\u00e8ge', h: '47-NO-0', g: '47', i: 'NO' },
        { name: 'Oman', h: '968-OM-0', g: '968', i: 'OM' },
        { name: 'Pakistan', h: '92-PK-0', g: '92', i: 'PK' },
        { name: 'Palaos', h: '680-PW-0', g: '680', i: 'PW' },
        { name: 'Territoires palestiniens', h: '970-PS-0', g: '970', i: 'PS' },
        { name: 'Panama', h: '507-PA-0', g: '507', i: 'PA' },
        { name: 'Papouasie - Nouvelle-Guin\u00e9e', h: '675-PG-0', g: '675', i: 'PG' },
        { name: 'Paraguay', h: '595-PY-0', g: '595', i: 'PY' },
        { name: 'P\u00e9rou', h: '51-PE-0', g: '51', i: 'PE' },
        { name: 'Philippines', h: '63-PH-0', g: '63', i: 'PH' },
        { name: 'Pologne', h: '48-PL-0', g: '48', i: 'PL' },
        { name: 'Portugal', h: '351-PT-0', g: '351', i: 'PT' },
        { name: 'Porto Rico', h: '1-PR-0', g: '1', i: 'PR' },
        { name: 'Qatar', h: '974-QA-0', g: '974', i: 'QA' },
        { name: 'La R\u00e9union', h: '262-RE-0', g: '262', i: 'RE' },
        { name: 'Roumanie', h: '40-RO-0', g: '40', i: 'RO' },
        { name: 'Russie', h: '7-RU-0', g: '7', i: 'RU' },
        { name: 'Rwanda', h: '250-RW-0', g: '250', i: 'RW' },
        { name: 'Saint-Barth\u00e9lemy', h: '590-BL-0', g: '590', i: 'BL' },
        { name: 'Sainte-H\u00e9l\u00e8ne', h: '290-SH-0', g: '290', i: 'SH' },
        { name: 'Saint-Kitts', h: '1-KN-0', g: '1', i: 'KN' },
        { name: 'Sainte-Lucie', h: '1-LC-0', g: '1', i: 'LC' },
        { name: 'Saint-Martin', h: '590-MF-0', g: '590', i: 'MF' },
        { name: 'Saint-Pierre-et-Miquelon', h: '508-PM-0', g: '508', i: 'PM' },
        { name: 'Saint-Vincent', h: '1-VC-0', g: '1', i: 'VC' },
        { name: 'Samoa', h: '685-WS-0', g: '685', i: 'WS' },
        { name: 'Saint-Marin', h: '378-SM-0', g: '378', i: 'SM' },
        { name: 'Sao Tom\u00e9-et-Principe', h: '239-ST-0', g: '239', i: 'ST' },
        { name: 'Arabie saoudite', h: '966-SA-0', g: '966', i: 'SA' },
        { name: 'S\u00e9n\u00e9gal', h: '221-SN-0', g: '221', i: 'SN' },
        { name: 'Serbie', h: '381-RS-0', g: '381', i: 'RS' },
        { name: 'Seychelles', h: '248-SC-0', g: '248', i: 'SC' },
        { name: 'Sierra Leone', h: '232-SL-0', g: '232', i: 'SL' },
        { name: 'Singapour', h: '65-SG-0', g: '65', i: 'SG' },
        { name: 'Saint-Martin', h: '1-SX-0', g: '1', i: 'SX' },
        { name: 'Slovaquie', h: '421-SK-0', g: '421', i: 'SK' },
        { name: 'Slov\u00e9nie', h: '386-SI-0', g: '386', i: 'SI' },
        { name: 'Salomon (\u00celes)', h: '677-SB-0', g: '677', i: 'SB' },
        { name: 'Somalie', h: '252-SO-0', g: '252', i: 'SO' },
        { name: 'Afrique du Sud', h: '27-ZA-0', g: '27', i: 'ZA' },
        { name: 'G\u00e9orgie du Sud et Sandwich du Sud (\u00celes)', h: '500-GS-0', g: '500', i: 'GS' },
        { name: 'Cor\u00e9e du Sud', h: '82-KR-0', g: '82', i: 'KR' },
        { name: 'Soudan du Sud', h: '211-SS-0', g: '211', i: 'SS' },
        { name: 'Espagne', h: '34-ES-0', g: '34', i: 'ES' },
        { name: 'Sri Lanka', h: '94-LK-0', g: '94', i: 'LK' },
        { name: 'Soudan', h: '249-SD-0', g: '249', i: 'SD' },
        { name: 'Surinam', h: '597-SR-0', g: '597', i: 'SR' },
        { name: 'Svalbard et Jan Mayen', h: '47-SJ-0', g: '47', i: 'SJ' },
        { name: 'Swaziland', h: '268-SZ-0', g: '268', i: 'SZ' },
        { name: 'Su\u00e8de', h: '46-SE-0', g: '46', i: 'SE' },
        { name: 'Suisse', h: '41-CH-0', g: '41', i: 'CH' },
        { name: 'Syrie', h: '963-SY-0', g: '963', i: 'SY' },
        { name: 'Ta\u00efwan', h: '886-TW-0', g: '886', i: 'TW' },
        { name: 'Tadjikistan', h: '992-TJ-0', g: '992', i: 'TJ' },
        { name: 'Tanzanie', h: '255-TZ-0', g: '255', i: 'TZ' },
        { name: 'Tha\u00eflande', h: '66-TH-0', g: '66', i: 'TH' },
        { name: 'Togo', h: '228-TG-0', g: '228', i: 'TG' },
        { name: 'Tok\u00e9laou', h: '690-TK-0', g: '690', i: 'TK' },
        { name: 'Tonga', h: '676-TO-0', g: '676', i: 'TO' },
        { name: 'Trinit\u00e9-et-Tobago', h: '1-TT-0', g: '1', i: 'TT' },
        { name: 'Tunisie', h: '216-TN-0', g: '216', i: 'TN' },
        { name: 'Turquie', h: '90-TR-0', g: '90', i: 'TR' },
        { name: 'Turkm\u00e9nistan', h: '993-TM-0', g: '993', i: 'TM' },
        { name: 'Turks-et-Ca\u00efcos (\u00celes)', h: '1-TC-0', g: '1', i: 'TC' },
        { name: 'Tuvalu', h: '688-TV-0', g: '688', i: 'TV' },
        { name: '\u00celes Vierges am\u00e9ricaines', h: '1-VI-0', g: '1', i: 'VI' },
        { name: 'Ouganda', h: '256-UG-0', g: '256', i: 'UG' },
        { name: 'Ukrainien', h: '380-UA-0', g: '380', i: 'UA' },
        { name: '\u00c9mirats arabes unis', h: '971-AE-0', g: '971', i: 'AE' },
        { name: 'Royaume-Uni', h: '44-GB-0', g: '44', i: 'GB' },
        { name: '\u00c9tats-Unis', h: '1-US-0', g: '1', i: 'US' },
        { name: 'Uruguay', h: '598-UY-0', g: '598', i: 'UY' },
        { name: 'Ouzb\u00e9kistan', h: '998-UZ-0', g: '998', i: 'UZ' },
        { name: 'Vanuatu', h: '678-VU-0', g: '678', i: 'VU' },
        { name: 'Cit\u00e9 du Vatican', h: '379-VA-0', g: '379', i: 'VA' },
        { name: 'Venezuela', h: '58-VE-0', g: '58', i: 'VE' },
        { name: 'Vi\u00eat Nam', h: '84-VN-0', g: '84', i: 'VN' },
        { name: 'Wallis-et-Futuna', h: '681-WF-0', g: '681', i: 'WF' },
        { name: 'Sahara occidental', h: '212-EH-0', g: '212', i: 'EH' },
        { name: 'Y\u00e9men', h: '967-YE-0', g: '967', i: 'YE' },
        { name: 'Zambie', h: '260-ZM-0', g: '260', i: 'ZM' },
        { name: 'Zimbabwe', h: '263-ZW-0', g: '263', i: 'ZW' }
    ];
    Od(Ld);
    var Pd = new Jd(Ld);
    function Qd(a) {
        return 'string' == typeof a.className ? a.className : (a.getAttribute && a.getAttribute('class')) || '';
    }
    function Rd(a, b) {
        'string' == typeof a.className ? (a.className = b) : a.setAttribute && a.setAttribute('class', b);
    }
    function Sd(a, b) {
        return a.classList ? a.classList.contains(b) : Ha(a.classList ? a.classList : Qd(a).match(/\S+/g) || [], b);
    }
    function Td(a, b) {
        if (a.classList) a.classList.add(b);
        else if (!Sd(a, b)) {
            var c = Qd(a);
            Rd(a, c + (0 < c.length ? ' ' + b : b));
        }
    }
    function Ud(a, b) {
        a.classList
            ? a.classList.remove(b)
            : Sd(a, b) &&
              Rd(
                  a,
                  Array.prototype.filter
                      .call(a.classList ? a.classList : Qd(a).match(/\S+/g) || [], function (c) {
                          return c != b;
                      })
                      .join(' ')
              );
    }
    try {
        new self.OffscreenCanvas(0, 0).getContext('2d');
    } catch (a) {}
    function Vd(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0;
    }
    k = Vd.prototype;
    k.clone = function () {
        return new Vd(this.x, this.y);
    };
    k.toString = function () {
        return '(' + this.x + ', ' + this.y + ')';
    };
    k.ceil = function () {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    };
    k.floor = function () {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    };
    k.round = function () {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    };
    k.translate = function (a, b) {
        a instanceof Vd
            ? ((this.x += a.x), (this.y += a.y))
            : ((this.x += Number(a)), 'number' === typeof b && (this.y += b));
        return this;
    };
    k.scale = function (a, b) {
        this.x *= a;
        this.y *= 'number' === typeof b ? b : a;
        return this;
    };
    function Wd(a, b) {
        this.width = a;
        this.height = b;
    }
    k = Wd.prototype;
    k.clone = function () {
        return new Wd(this.width, this.height);
    };
    k.toString = function () {
        return '(' + this.width + ' x ' + this.height + ')';
    };
    k.aspectRatio = function () {
        return this.width / this.height;
    };
    k.Fb = function () {
        return !(this.width * this.height);
    };
    k.ceil = function () {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this;
    };
    k.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this;
    };
    k.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this;
    };
    k.scale = function (a, b) {
        this.width *= a;
        this.height *= 'number' === typeof b ? b : a;
        return this;
    };
    function Xd(a) {
        return a ? new Yd(Zd(a)) : Aa || (Aa = new Yd());
    }
    function $d(a, b) {
        var c = b || document;
        return c.querySelectorAll && c.querySelector ? c.querySelectorAll('.' + a) : ae(document, a, b);
    }
    function be(a, b) {
        var c = b || document;
        if (c.getElementsByClassName) a = c.getElementsByClassName(a)[0];
        else {
            c = document;
            var d = b || c;
            a = d.querySelectorAll && d.querySelector && a ? d.querySelector(a ? '.' + a : '') : ae(c, a, b)[0] || null;
        }
        return a || null;
    }
    function ae(a, b, c) {
        var d;
        a = c || a;
        if (a.querySelectorAll && a.querySelector && b) return a.querySelectorAll(b ? '.' + b : '');
        if (b && a.getElementsByClassName) {
            var e = a.getElementsByClassName(b);
            return e;
        }
        e = a.getElementsByTagName('*');
        if (b) {
            var f = {};
            for (c = d = 0; (a = e[c]); c++) {
                var g = a.className;
                'function' == typeof g.split && Ha(g.split(/\s+/), b) && (f[d++] = a);
            }
            f.length = d;
            return f;
        }
        return e;
    }
    function ce(a, b) {
        Na(b, function (c, d) {
            c && 'object' == typeof c && c.Va && (c = c.Qa());
            'style' == d
                ? (a.style.cssText = c)
                : 'class' == d
                ? (a.className = c)
                : 'for' == d
                ? (a.htmlFor = c)
                : de.hasOwnProperty(d)
                ? a.setAttribute(de[d], c)
                : 0 == d.lastIndexOf('aria-', 0) || 0 == d.lastIndexOf('data-', 0)
                ? a.setAttribute(d, c)
                : (a[d] = c);
        });
    }
    var de = {
        cellpadding: 'cellPadding',
        cellspacing: 'cellSpacing',
        colspan: 'colSpan',
        frameborder: 'frameBorder',
        height: 'height',
        maxlength: 'maxLength',
        nonce: 'nonce',
        role: 'role',
        rowspan: 'rowSpan',
        type: 'type',
        usemap: 'useMap',
        valign: 'vAlign',
        width: 'width'
    };
    function ee(a) {
        return a.scrollingElement
            ? a.scrollingElement
            : Xc || 'CSS1Compat' != a.compatMode
            ? a.body || a.documentElement
            : a.documentElement;
    }
    function fe(a, b, c, d) {
        function e(h) {
            h && b.appendChild('string' === typeof h ? a.createTextNode(h) : h);
        }
        for (; d < c.length; d++) {
            var f = c[d];
            if (!ua(f) || (t(f) && 0 < f.nodeType)) e(f);
            else {
                a: {
                    if (f && 'number' == typeof f.length) {
                        if (t(f)) {
                            var g = 'function' == typeof f.item || 'string' == typeof f.item;
                            break a;
                        }
                        if ('function' === typeof f) {
                            g = 'function' == typeof f.item;
                            break a;
                        }
                    }
                    g = !1;
                }
                Ea(g ? Ma(f) : f, e);
            }
        }
    }
    function ge(a, b) {
        b = String(b);
        'application/xhtml+xml' === a.contentType && (b = b.toLowerCase());
        return a.createElement(b);
    }
    function he(a) {
        return a && a.parentNode ? a.parentNode.removeChild(a) : null;
    }
    function Zd(a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document;
    }
    function ie(a, b) {
        if ('textContent' in a) a.textContent = b;
        else if (3 == a.nodeType) a.data = String(b);
        else if (a.firstChild && 3 == a.firstChild.nodeType) {
            for (; a.lastChild != a.firstChild; ) a.removeChild(a.lastChild);
            a.firstChild.data = String(b);
        } else {
            for (var c; (c = a.firstChild); ) a.removeChild(c);
            a.appendChild(Zd(a).createTextNode(String(b)));
        }
    }
    function je(a, b) {
        return b
            ? ke(a, function (c) {
                  return !b || ('string' === typeof c.className && Ha(c.className.split(/\s+/), b));
              })
            : null;
    }
    function ke(a, b) {
        for (var c = 0; a; ) {
            if (b(a)) return a;
            a = a.parentNode;
            c++;
        }
        return null;
    }
    function Yd(a) {
        this.ha = a || r.document || document;
    }
    k = Yd.prototype;
    k.Cb = Xd;
    k.ia = function () {};
    k.getElementsByTagName = function (a, b) {
        return (b || this.ha).getElementsByTagName(String(a));
    };
    k.Gc = function (a, b) {
        return $d(a, b || this.ha);
    };
    k.A = function (a, b) {
        return be(a, b || this.ha);
    };
    k.yd = function (a, b, c) {
        var d = this.ha,
            e = arguments,
            f = e[1],
            g = ge(d, String(e[0]));
        f && ('string' === typeof f ? (g.className = f) : Array.isArray(f) ? (g.className = f.join(' ')) : ce(g, f));
        2 < e.length && fe(d, g, e, 2);
    };
    k.createElement = function (a) {
        return ge(this.ha, a);
    };
    k.createTextNode = function (a) {
        return this.ha.createTextNode(String(a));
    };
    k.getWindow = function () {
        var a = this.ha;
        return a.parentWindow || a.defaultView;
    };
    k.appendChild = function (a, b) {
        a.appendChild(b);
    };
    k.append = function (a, b) {
        fe(Zd(a), a, arguments, 1);
    };
    k.canHaveChildren = function (a) {
        if (1 != a.nodeType) return !1;
        switch (a.tagName) {
            case 'APPLET':
            case 'AREA':
            case 'BASE':
            case 'BR':
            case 'COL':
            case 'COMMAND':
            case 'EMBED':
            case 'FRAME':
            case 'HR':
            case 'IMG':
            case 'INPUT':
            case 'IFRAME':
            case 'ISINDEX':
            case 'KEYGEN':
            case 'LINK':
            case 'NOFRAMES':
            case 'NOSCRIPT':
            case 'META':
            case 'OBJECT':
            case 'PARAM':
            case 'SCRIPT':
            case 'SOURCE':
            case 'STYLE':
            case 'TRACK':
            case 'WBR':
                return !1;
        }
        return !0;
    };
    k.removeNode = he;
    k.contains = function (a, b) {
        if (!a || !b) return !1;
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if ('undefined' != typeof a.compareDocumentPosition) return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b; ) b = b.parentNode;
        return b == a;
    };
    function le(a, b, c) {
        b || (b = {});
        c = c || window;
        var d = a instanceof nb ? a : tb('undefined' != typeof a.href ? a.href : String(a)) || wb;
        a = b.target || a.target;
        var e = [];
        for (f in b)
            switch (f) {
                case 'width':
                case 'height':
                case 'top':
                case 'left':
                    e.push(f + '=' + b[f]);
                    break;
                case 'target':
                case 'noopener':
                case 'noreferrer':
                    break;
                default:
                    e.push(f + '=' + (b[f] ? 1 : 0));
            }
        var f = e.join(',');
        ((x('iPhone') && !x('iPod') && !x('iPad')) || x('iPad') || x('iPod')) &&
        c.navigator &&
        c.navigator.standalone &&
        a &&
        '_self' != a
            ? ((f = ge(document, 'A')),
              Mb(f, 'HTMLAnchorElement'),
              (d = d instanceof nb ? d : vb(d)),
              (f.href = pb(d)),
              f.setAttribute('target', a),
              b.noreferrer && f.setAttribute('rel', 'noreferrer'),
              (b = document.createEvent('MouseEvent')),
              b.initMouseEvent('click', !0, !0, c, 1),
              f.dispatchEvent(b),
              (c = {}))
            : b.noreferrer
            ? ((c = Tb('', c, a, f)),
              (b = pb(d)),
              c &&
                  (Vc && -1 != b.indexOf(';') && (b = "'" + b.replace(/'/g, '%27') + "'"),
                  (c.opener = null),
                  (b =
                      '<meta name="referrer" content="no-referrer"><meta http-equiv="refresh" content="0; url=' +
                      Ub(b) +
                      '">'),
                  (b = Kb(b, null)),
                  (d = c.document) && d.write && (d.write(Ib(b)), d.close())))
            : (c = Tb(d, c, a, f)) && b.noopener && (c.opener = null);
        return c;
    }
    function E(a) {
        var b = a.type;
        if ('string' === typeof b)
            switch (b.toLowerCase()) {
                case 'checkbox':
                case 'radio':
                    return a.checked ? a.value : null;
                case 'select-one':
                    return (b = a.selectedIndex), 0 <= b ? a.options[b].value : null;
                case 'select-multiple':
                    b = [];
                    for (var c, d = 0; (c = a.options[d]); d++) c.selected && b.push(c.value);
                    return b.length ? b : null;
            }
        return null != a.value ? a.value : null;
    }
    function me(a, b) {
        var c = a.type;
        switch ('string' === typeof c && c.toLowerCase()) {
            case 'checkbox':
            case 'radio':
                a.checked = b;
                break;
            case 'select-one':
                a.selectedIndex = -1;
                if ('string' === typeof b)
                    for (var d = 0; (c = a.options[d]); d++)
                        if (c.value == b) {
                            c.selected = !0;
                            break;
                        }
                break;
            case 'select-multiple':
                'string' === typeof b && (b = [b]);
                for (d = 0; (c = a.options[d]); d++)
                    if (((c.selected = !1), b)) for (var e, f = 0; (e = b[f]); f++) c.value == e && (c.selected = !0);
                break;
            default:
                a.value = null != b ? b : '';
        }
    }
    function ne(a) {
        a && 'function' == typeof a.l && a.l();
    }
    function oe() {
        this.Ab = this.Ab;
        this.sb = this.sb;
    }
    oe.prototype.Ab = !1;
    oe.prototype.isDisposed = function () {
        return this.Ab;
    };
    oe.prototype.l = function () {
        this.Ab || ((this.Ab = !0), this.m());
    };
    function pe(a, b) {
        a.Ab ? b() : (a.sb || (a.sb = []), a.sb.push(b));
    }
    oe.prototype.m = function () {
        if (this.sb) for (; this.sb.length; ) this.sb.shift()();
    };
    function qe(a, b) {
        this.type = a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.nc = !1;
    }
    qe.prototype.stopPropagation = function () {
        this.nc = !0;
    };
    qe.prototype.preventDefault = function () {
        this.defaultPrevented = !0;
    };
    var re = (function () {
        if (!r.addEventListener || !Object.defineProperty) return !1;
        var a = !1,
            b = Object.defineProperty({}, 'passive', {
                get: function () {
                    a = !0;
                }
            });
        try {
            r.addEventListener('test', ra, b), r.removeEventListener('test', ra, b);
        } catch (c) {}
        return a;
    })();
    function se(a, b) {
        qe.call(this, a ? a.type : '');
        this.relatedTarget = this.currentTarget = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
        this.key = '';
        this.charCode = this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.pointerId = 0;
        this.pointerType = '';
        this.Na = null;
        a && this.init(a, b);
    }
    w(se, qe);
    var te = Pc({ 2: 'touch', 3: 'pen', 4: 'mouse' });
    se.prototype.init = function (a, b) {
        var c = (this.type = a.type),
            d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        if ((b = a.relatedTarget)) {
            if (Wc) {
                a: {
                    try {
                        Qc(b.nodeName);
                        var e = !0;
                        break a;
                    } catch (f) {}
                    e = !1;
                }
                e || (b = null);
            }
        } else 'mouseover' == c ? (b = a.fromElement) : 'mouseout' == c && (b = a.toElement);
        this.relatedTarget = b;
        d
            ? ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX),
              (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY),
              (this.screenX = d.screenX || 0),
              (this.screenY = d.screenY || 0))
            : ((this.offsetX = Xc || void 0 !== a.offsetX ? a.offsetX : a.layerX),
              (this.offsetY = Xc || void 0 !== a.offsetY ? a.offsetY : a.layerY),
              (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
              (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
              (this.screenX = a.screenX || 0),
              (this.screenY = a.screenY || 0));
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.key = a.key || '';
        this.charCode = a.charCode || ('keypress' == c ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.pointerId = a.pointerId || 0;
        this.pointerType = 'string' === typeof a.pointerType ? a.pointerType : te[a.pointerType] || '';
        this.state = a.state;
        this.Na = a;
        a.defaultPrevented && se.Z.preventDefault.call(this);
    };
    se.prototype.stopPropagation = function () {
        se.Z.stopPropagation.call(this);
        this.Na.stopPropagation ? this.Na.stopPropagation() : (this.Na.cancelBubble = !0);
    };
    se.prototype.preventDefault = function () {
        se.Z.preventDefault.call(this);
        var a = this.Na;
        a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
    };
    var ue = 'closure_listenable_' + ((1e6 * Math.random()) | 0);
    function ve(a) {
        return !(!a || !a[ue]);
    }
    var we = 0;
    function xe(a, b, c, d, e) {
        this.listener = a;
        this.Yc = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.Nc = e;
        this.key = ++we;
        this.pc = this.yc = !1;
    }
    function ye(a) {
        a.pc = !0;
        a.listener = null;
        a.Yc = null;
        a.src = null;
        a.Nc = null;
    }
    function ze(a) {
        this.src = a;
        this.ka = {};
        this.sc = 0;
    }
    k = ze.prototype;
    k.add = function (a, b, c, d, e) {
        var f = a.toString();
        a = this.ka[f];
        a || ((a = this.ka[f] = []), this.sc++);
        var g = Ae(a, b, d, e);
        -1 < g ? ((b = a[g]), c || (b.yc = !1)) : ((b = new xe(b, this.src, f, !!d, e)), (b.yc = c), a.push(b));
        return b;
    };
    k.remove = function (a, b, c, d) {
        a = a.toString();
        if (!(a in this.ka)) return !1;
        var e = this.ka[a];
        b = Ae(e, b, c, d);
        return -1 < b ? (ye(e[b]), Ja(e, b), 0 == e.length && (delete this.ka[a], this.sc--), !0) : !1;
    };
    function Be(a, b) {
        var c = b.type;
        c in a.ka && Ia(a.ka[c], b) && (ye(b), 0 == a.ka[c].length && (delete a.ka[c], a.sc--));
    }
    k.Zc = function (a) {
        a = a && a.toString();
        var b = 0,
            c;
        for (c in this.ka)
            if (!a || c == a) {
                for (var d = this.ka[c], e = 0; e < d.length; e++) ++b, ye(d[e]);
                delete this.ka[c];
                this.sc--;
            }
    };
    k.Vb = function (a, b, c, d) {
        a = this.ka[a.toString()];
        var e = -1;
        a && (e = Ae(a, b, c, d));
        return -1 < e ? a[e] : null;
    };
    k.hasListener = function (a, b) {
        var c = void 0 !== a,
            d = c ? a.toString() : '',
            e = void 0 !== b;
        return Oa(this.ka, function (f) {
            for (var g = 0; g < f.length; ++g) if (!((c && f[g].type != d) || (e && f[g].capture != b))) return !0;
            return !1;
        });
    };
    function Ae(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.pc && f.listener == b && f.capture == !!c && f.Nc == d) return e;
        }
        return -1;
    }
    var Ce = 'closure_lm_' + ((1e6 * Math.random()) | 0),
        De = {},
        Ee = 0;
    function Fe(a, b, c, d, e) {
        if (d && d.once) return Ge(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) Fe(a, b[f], c, d, e);
            return null;
        }
        c = He(c);
        return ve(a) ? a.listen(b, c, t(d) ? !!d.capture : !!d, e) : Ie(a, b, c, !1, d, e);
    }
    function Ie(a, b, c, d, e, f) {
        if (!b) throw Error('Invalid event type');
        var g = t(e) ? !!e.capture : !!e,
            h = Je(a);
        h || (a[Ce] = h = new ze(a));
        c = h.add(b, c, d, g, f);
        if (c.Yc) return c;
        d = Ke();
        c.Yc = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener) re || (e = g), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent) a.attachEvent(Le(b.toString()), d);
        else if (a.addListener && a.removeListener) a.addListener(d);
        else throw Error('addEventListener and attachEvent are unavailable.');
        Ee++;
        return c;
    }
    function Ke() {
        function a(c) {
            return b.call(a.src, a.listener, c);
        }
        var b = Me;
        return a;
    }
    function Ge(a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++) Ge(a, b[f], c, d, e);
            return null;
        }
        c = He(c);
        return ve(a) ? a.df(b, c, t(d) ? !!d.capture : !!d, e) : Ie(a, b, c, !0, d, e);
    }
    function Ne(a, b, c, d, e) {
        if (Array.isArray(b)) for (var f = 0; f < b.length; f++) Ne(a, b[f], c, d, e);
        else
            (d = t(d) ? !!d.capture : !!d),
                (c = He(c)),
                ve(a) ? a.ke(b, c, d, e) : a && (a = Je(a)) && (b = a.Vb(b, c, d, e)) && Pe(b);
    }
    function Pe(a) {
        if ('number' !== typeof a && a && !a.pc) {
            var b = a.src;
            if (ve(b)) Be(b.Ma, a);
            else {
                var c = a.type,
                    d = a.Yc;
                b.removeEventListener
                    ? b.removeEventListener(c, d, a.capture)
                    : b.detachEvent
                    ? b.detachEvent(Le(c), d)
                    : b.addListener && b.removeListener && b.removeListener(d);
                Ee--;
                (c = Je(b)) ? (Be(c, a), 0 == c.sc && ((c.src = null), (b[Ce] = null))) : ye(a);
            }
        }
    }
    function Le(a) {
        return a in De ? De[a] : (De[a] = 'on' + a);
    }
    function Me(a, b) {
        if (a.pc) a = !0;
        else {
            b = new se(b, this);
            var c = a.listener,
                d = a.Nc || a.src;
            a.yc && Pe(a);
            a = c.call(d, b);
        }
        return a;
    }
    function Je(a) {
        a = a[Ce];
        return a instanceof ze ? a : null;
    }
    var Qe = '__closure_events_fn_' + ((1e9 * Math.random()) >>> 0);
    function He(a) {
        if ('function' === typeof a) return a;
        a[Qe] ||
            (a[Qe] = function (b) {
                return a.handleEvent(b);
            });
        return a[Qe];
    }
    function Re() {
        oe.call(this);
        this.Ma = new ze(this);
        this.bg = this;
        this.Xc = null;
    }
    w(Re, oe);
    Re.prototype[ue] = !0;
    k = Re.prototype;
    k.fe = function (a) {
        this.Xc = a;
    };
    k.addEventListener = function (a, b, c, d) {
        Fe(this, a, b, c, d);
    };
    k.removeEventListener = function (a, b, c, d) {
        Ne(this, a, b, c, d);
    };
    k.dispatchEvent = function (a) {
        var b,
            c = this.Xc;
        if (c) for (b = []; c; c = c.Xc) b.push(c);
        c = this.bg;
        var d = a.type || a;
        if ('string' === typeof a) a = new qe(a, c);
        else if (a instanceof qe) a.target = a.target || c;
        else {
            var e = a;
            a = new qe(d, c);
            Ra(a, e);
        }
        e = !0;
        if (b)
            for (var f = b.length - 1; !a.nc && 0 <= f; f--) {
                var g = (a.currentTarget = b[f]);
                e = Se(g, d, !0, a) && e;
            }
        a.nc || ((g = a.currentTarget = c), (e = Se(g, d, !0, a) && e), a.nc || (e = Se(g, d, !1, a) && e));
        if (b) for (f = 0; !a.nc && f < b.length; f++) (g = a.currentTarget = b[f]), (e = Se(g, d, !1, a) && e);
        return e;
    };
    k.m = function () {
        Re.Z.m.call(this);
        this.Ma && this.Ma.Zc(void 0);
        this.Xc = null;
    };
    k.listen = function (a, b, c, d) {
        return this.Ma.add(String(a), b, !1, c, d);
    };
    k.df = function (a, b, c, d) {
        return this.Ma.add(String(a), b, !0, c, d);
    };
    k.ke = function (a, b, c, d) {
        this.Ma.remove(String(a), b, c, d);
    };
    function Se(a, b, c, d) {
        b = a.Ma.ka[String(b)];
        if (!b) return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.pc && g.capture == c) {
                var h = g.listener,
                    n = g.Nc || g.src;
                g.yc && Be(a.Ma, g);
                e = !1 !== h.call(n, d) && e;
            }
        }
        return e && !d.defaultPrevented;
    }
    k.Vb = function (a, b, c, d) {
        return this.Ma.Vb(String(a), b, c, d);
    };
    k.hasListener = function (a, b) {
        return this.Ma.hasListener(void 0 !== a ? String(a) : void 0, b);
    };
    function Te(a) {
        if ((a.altKey && !a.ctrlKey) || a.metaKey || (112 <= a.keyCode && 123 >= a.keyCode)) return !1;
        if (Ue(a.keyCode)) return !0;
        switch (a.keyCode) {
            case 18:
            case 20:
            case 93:
            case 17:
            case 40:
            case 35:
            case 27:
            case 36:
            case 45:
            case 37:
            case 224:
            case 91:
            case 144:
            case 12:
            case 34:
            case 33:
            case 19:
            case 255:
            case 44:
            case 39:
            case 145:
            case 16:
            case 38:
            case 252:
            case 224:
            case 92:
                return !1;
            case 0:
                return !Wc;
            default:
                return 166 > a.keyCode || 183 < a.keyCode;
        }
    }
    function Ve(a, b, c, d, e, f) {
        if (Zc && e) return Ue(a);
        if (e && !d) return !1;
        if (!Wc) {
            'number' === typeof b && (b = We(b));
            var g = 17 == b || 18 == b || (Zc && 91 == b);
            if (((!c || Zc) && g) || (Zc && 16 == b && (d || f))) return !1;
        }
        if ((Xc || Uc) && d && c)
            switch (a) {
                case 220:
                case 219:
                case 221:
                case 192:
                case 186:
                case 189:
                case 187:
                case 188:
                case 190:
                case 191:
                case 192:
                case 222:
                    return !1;
            }
        if (y && d && b == a) return !1;
        switch (a) {
            case 13:
                return Wc ? (f || e ? !1 : !(c && d)) : !0;
            case 27:
                return !(Xc || Uc || Wc);
        }
        return Wc && (d || e || f) ? !1 : Ue(a);
    }
    function Ue(a) {
        if ((48 <= a && 57 >= a) || (96 <= a && 106 >= a) || (65 <= a && 90 >= a) || ((Xc || Uc) && 0 == a)) return !0;
        switch (a) {
            case 32:
            case 43:
            case 63:
            case 64:
            case 107:
            case 109:
            case 110:
            case 111:
            case 186:
            case 59:
            case 189:
            case 187:
            case 61:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
            case 219:
            case 220:
            case 221:
            case 163:
            case 58:
                return !0;
            case 173:
                return Wc;
            default:
                return !1;
        }
    }
    function We(a) {
        if (Wc) a = Xe(a);
        else if (Zc && Xc)
            switch (a) {
                case 93:
                    a = 91;
            }
        return a;
    }
    function Xe(a) {
        switch (a) {
            case 61:
                return 187;
            case 59:
                return 186;
            case 173:
                return 189;
            case 224:
                return 91;
            case 0:
                return 224;
            default:
                return a;
        }
    }
    function Ye(a) {
        Re.call(this);
        this.j = a;
        Fe(a, 'keydown', this.Kc, !1, this);
        Fe(a, 'click', this.Ue, !1, this);
    }
    w(Ye, Re);
    Ye.prototype.Kc = function (a) {
        (13 == a.keyCode || (Xc && 3 == a.keyCode)) && Ze(this, a);
    };
    Ye.prototype.Ue = function (a) {
        Ze(this, a);
    };
    function Ze(a, b) {
        var c = new $e(b);
        if (a.dispatchEvent(c)) {
            c = new af(b);
            try {
                a.dispatchEvent(c);
            } finally {
                b.stopPropagation();
            }
        }
    }
    Ye.prototype.m = function () {
        Ye.Z.m.call(this);
        Ne(this.j, 'keydown', this.Kc, !1, this);
        Ne(this.j, 'click', this.Ue, !1, this);
        delete this.j;
    };
    function af(a) {
        se.call(this, a.Na);
        this.type = 'action';
    }
    w(af, se);
    function $e(a) {
        se.call(this, a.Na);
        this.type = 'beforeaction';
    }
    w($e, se);
    function bf(a) {
        Re.call(this);
        this.j = a;
        a = y ? 'focusout' : 'blur';
        this.Zg = Fe(this.j, y ? 'focusin' : 'focus', this, !y);
        this.$g = Fe(this.j, a, this, !y);
    }
    w(bf, Re);
    bf.prototype.handleEvent = function (a) {
        var b = new se(a.Na);
        b.type = 'focusin' == a.type || 'focus' == a.type ? 'focusin' : 'focusout';
        this.dispatchEvent(b);
    };
    bf.prototype.m = function () {
        bf.Z.m.call(this);
        Pe(this.Zg);
        Pe(this.$g);
        delete this.j;
    };
    function cf(a) {
        oe.call(this);
        this.Ld = a;
        this.K = {};
    }
    w(cf, oe);
    var df = [];
    k = cf.prototype;
    k.listen = function (a, b, c, d) {
        Array.isArray(b) || (b && (df[0] = b.toString()), (b = df));
        for (var e = 0; e < b.length; e++) {
            var f = Fe(a, b[e], c || this.handleEvent, d || !1, this.Ld || this);
            if (!f) break;
            this.K[f.key] = f;
        }
        return this;
    };
    k.df = function (a, b, c, d) {
        return ef(this, a, b, c, d);
    };
    function ef(a, b, c, d, e, f) {
        if (Array.isArray(c)) for (var g = 0; g < c.length; g++) ef(a, b, c[g], d, e, f);
        else {
            b = Ge(b, c, d || a.handleEvent, e, f || a.Ld || a);
            if (!b) return a;
            a.K[b.key] = b;
        }
        return a;
    }
    k.ke = function (a, b, c, d, e) {
        if (Array.isArray(b)) for (var f = 0; f < b.length; f++) this.ke(a, b[f], c, d, e);
        else
            (c = c || this.handleEvent),
                (d = t(d) ? !!d.capture : !!d),
                (e = e || this.Ld || this),
                (c = He(c)),
                (d = !!d),
                (b = ve(a) ? a.Vb(b, c, d, e) : a ? ((a = Je(a)) ? a.Vb(b, c, d, e) : null) : null),
                b && (Pe(b), delete this.K[b.key]);
    };
    k.Zc = function () {
        Na(
            this.K,
            function (a, b) {
                this.K.hasOwnProperty(b) && Pe(a);
            },
            this
        );
        this.K = {};
    };
    k.m = function () {
        cf.Z.m.call(this);
        this.Zc();
    };
    k.handleEvent = function () {
        throw Error('EventHandler.handleEvent not implemented');
    };
    function ff(a, b) {
        this.Yg = 100;
        this.vg = a;
        this.uh = b;
        this.Uc = 0;
        this.Oc = null;
    }
    ff.prototype.get = function () {
        if (0 < this.Uc) {
            this.Uc--;
            var a = this.Oc;
            this.Oc = a.next;
            a.next = null;
        } else a = this.vg();
        return a;
    };
    ff.prototype.put = function (a) {
        this.uh(a);
        this.Uc < this.Yg && (this.Uc++, (a.next = this.Oc), (this.Oc = a));
    };
    var gf;
    function hf() {
        var a = r.MessageChannel;
        'undefined' === typeof a &&
            'undefined' !== typeof window &&
            window.postMessage &&
            window.addEventListener &&
            !x('Presto') &&
            (a = function () {
                var e = ge(document, 'IFRAME');
                e.style.display = 'none';
                document.documentElement.appendChild(e);
                var f = e.contentWindow;
                e = f.document;
                e.open();
                e.close();
                var g = 'callImmediate' + Math.random(),
                    h = 'file:' == f.location.protocol ? '*' : f.location.protocol + '//' + f.location.host;
                e = u(function (n) {
                    if (('*' == h || n.origin == h) && n.data == g) this.port1.onmessage();
                }, this);
                f.addEventListener('message', e, !1);
                this.port1 = {};
                this.port2 = {
                    postMessage: function () {
                        f.postMessage(g, h);
                    }
                };
            });
        if ('undefined' !== typeof a && !x('Trident') && !x('MSIE')) {
            var b = new a(),
                c = {},
                d = c;
            b.port1.onmessage = function () {
                if (void 0 !== c.next) {
                    c = c.next;
                    var e = c.Ce;
                    c.Ce = null;
                    e();
                }
            };
            return function (e) {
                d.next = { Ce: e };
                d = d.next;
                b.port2.postMessage(0);
            };
        }
        return function (e) {
            r.setTimeout(e, 0);
        };
    }
    function jf(a) {
        r.setTimeout(function () {
            throw a;
        }, 0);
    }
    function kf() {
        this.gd = this.Pb = null;
    }
    kf.prototype.add = function (a, b) {
        var c = lf.get();
        c.set(a, b);
        this.gd ? (this.gd.next = c) : (this.Pb = c);
        this.gd = c;
    };
    kf.prototype.remove = function () {
        var a = null;
        this.Pb && ((a = this.Pb), (this.Pb = this.Pb.next), this.Pb || (this.gd = null), (a.next = null));
        return a;
    };
    var lf = new ff(
        function () {
            return new mf();
        },
        function (a) {
            return a.reset();
        }
    );
    function mf() {
        this.next = this.scope = this.Cd = null;
    }
    mf.prototype.set = function (a, b) {
        this.Cd = a;
        this.scope = b;
        this.next = null;
    };
    mf.prototype.reset = function () {
        this.next = this.scope = this.Cd = null;
    };
    function nf(a, b) {
        of || pf();
        qf || (of(), (qf = !0));
        rf.add(a, b);
    }
    var of;
    function pf() {
        if (r.Promise && r.Promise.resolve) {
            var a = r.Promise.resolve(void 0);
            of = function () {
                a.then(sf);
            };
        } else
            of = function () {
                var b = sf;
                'function' !== typeof r.setImmediate ||
                (r.Window && r.Window.prototype && !x('Edge') && r.Window.prototype.setImmediate == r.setImmediate)
                    ? (gf || (gf = hf()), gf(b))
                    : r.setImmediate(b);
            };
    }
    var qf = !1,
        rf = new kf();
    function sf() {
        for (var a; (a = rf.remove()); ) {
            try {
                a.Cd.call(a.scope);
            } catch (b) {
                jf(b);
            }
            lf.put(a);
        }
        qf = !1;
    }
    function tf(a) {
        if (!a) return !1;
        try {
            return !!a.$goog_Thenable;
        } catch (b) {
            return !1;
        }
    }
    function F(a) {
        this.P = 0;
        this.Ya = void 0;
        this.xb = this.ab = this.V = null;
        this.Ic = this.Bd = !1;
        if (a != ra)
            try {
                var b = this;
                a.call(
                    void 0,
                    function (c) {
                        uf(b, 2, c);
                    },
                    function (c) {
                        if (!(c instanceof vf))
                            try {
                                if (c instanceof Error) throw c;
                                throw Error('Promise rejected.');
                            } catch (d) {}
                        uf(b, 3, c);
                    }
                );
            } catch (c) {
                uf(this, 3, c);
            }
    }
    function wf() {
        this.next = this.context = this.Ib = this.hc = this.child = null;
        this.Qb = !1;
    }
    wf.prototype.reset = function () {
        this.context = this.Ib = this.hc = this.child = null;
        this.Qb = !1;
    };
    var xf = new ff(
        function () {
            return new wf();
        },
        function (a) {
            a.reset();
        }
    );
    function yf(a, b, c) {
        var d = xf.get();
        d.hc = a;
        d.Ib = b;
        d.context = c;
        return d;
    }
    function G(a) {
        if (a instanceof F) return a;
        var b = new F(ra);
        uf(b, 2, a);
        return b;
    }
    function zf(a) {
        return new F(function (b, c) {
            c(a);
        });
    }
    F.prototype.then = function (a, b, c) {
        return Af(this, 'function' === typeof a ? a : null, 'function' === typeof b ? b : null, c);
    };
    F.prototype.$goog_Thenable = !0;
    k = F.prototype;
    k.Oh = function (a, b) {
        a = yf(a, a, b);
        a.Qb = !0;
        Bf(this, a);
        return this;
    };
    k.qc = function (a, b) {
        return Af(this, null, a, b);
    };
    k.cancel = function (a) {
        if (0 == this.P) {
            var b = new vf(a);
            nf(function () {
                Cf(this, b);
            }, this);
        }
    };
    function Cf(a, b) {
        if (0 == a.P)
            if (a.V) {
                var c = a.V;
                if (c.ab) {
                    for (
                        var d = 0, e = null, f = null, g = c.ab;
                        g && (g.Qb || (d++, g.child == a && (e = g), !(e && 1 < d)));
                        g = g.next
                    )
                        e || (f = g);
                    e &&
                        (0 == c.P && 1 == d
                            ? Cf(c, b)
                            : (f ? ((d = f), d.next == c.xb && (c.xb = d), (d.next = d.next.next)) : Df(c),
                              Ef(c, e, 3, b)));
                }
                a.V = null;
            } else uf(a, 3, b);
    }
    function Bf(a, b) {
        a.ab || (2 != a.P && 3 != a.P) || Ff(a);
        a.xb ? (a.xb.next = b) : (a.ab = b);
        a.xb = b;
    }
    function Af(a, b, c, d) {
        var e = yf(null, null, null);
        e.child = new F(function (f, g) {
            e.hc = b
                ? function (h) {
                      try {
                          var n = b.call(d, h);
                          f(n);
                      } catch (p) {
                          g(p);
                      }
                  }
                : f;
            e.Ib = c
                ? function (h) {
                      try {
                          var n = c.call(d, h);
                          void 0 === n && h instanceof vf ? g(h) : f(n);
                      } catch (p) {
                          g(p);
                      }
                  }
                : g;
        });
        e.child.V = a;
        Bf(a, e);
        return e.child;
    }
    k.Rh = function (a) {
        this.P = 0;
        uf(this, 2, a);
    };
    k.Sh = function (a) {
        this.P = 0;
        uf(this, 3, a);
    };
    function uf(a, b, c) {
        if (0 == a.P) {
            a === c && ((b = 3), (c = new TypeError('Promise cannot resolve to itself')));
            a.P = 1;
            a: {
                var d = c,
                    e = a.Rh,
                    f = a.Sh;
                if (d instanceof F) {
                    Bf(d, yf(e || ra, f || null, a));
                    var g = !0;
                } else if (tf(d)) d.then(e, f, a), (g = !0);
                else {
                    if (t(d))
                        try {
                            var h = d.then;
                            if ('function' === typeof h) {
                                Gf(d, h, e, f, a);
                                g = !0;
                                break a;
                            }
                        } catch (n) {
                            f.call(a, n);
                            g = !0;
                            break a;
                        }
                    g = !1;
                }
            }
            g || ((a.Ya = c), (a.P = b), (a.V = null), Ff(a), 3 != b || c instanceof vf || Hf(a, c));
        }
    }
    function Gf(a, b, c, d, e) {
        function f(n) {
            h || ((h = !0), d.call(e, n));
        }
        function g(n) {
            h || ((h = !0), c.call(e, n));
        }
        var h = !1;
        try {
            b.call(a, g, f);
        } catch (n) {
            f(n);
        }
    }
    function Ff(a) {
        a.Bd || ((a.Bd = !0), nf(a.Fg, a));
    }
    function Df(a) {
        var b = null;
        a.ab && ((b = a.ab), (a.ab = b.next), (b.next = null));
        a.ab || (a.xb = null);
        return b;
    }
    k.Fg = function () {
        for (var a; (a = Df(this)); ) Ef(this, a, this.P, this.Ya);
        this.Bd = !1;
    };
    function Ef(a, b, c, d) {
        if (3 == c && b.Ib && !b.Qb) for (; a && a.Ic; a = a.V) a.Ic = !1;
        if (b.child) (b.child.V = null), If(b, c, d);
        else
            try {
                b.Qb ? b.hc.call(b.context) : If(b, c, d);
            } catch (e) {
                Jf.call(null, e);
            }
        xf.put(b);
    }
    function If(a, b, c) {
        2 == b ? a.hc.call(a.context, c) : a.Ib && a.Ib.call(a.context, c);
    }
    function Hf(a, b) {
        a.Ic = !0;
        nf(function () {
            a.Ic && Jf.call(null, b);
        });
    }
    var Jf = jf;
    function vf(a) {
        za.call(this, a);
    }
    w(vf, za);
    vf.prototype.name = 'cancel';
    function Kf(a, b) {
        Re.call(this);
        this.Qc = a || 1;
        this.rc = b || r;
        this.ze = u(this.Qh, this);
        this.bf = Date.now();
    }
    w(Kf, Re);
    k = Kf.prototype;
    k.enabled = !1;
    k.ca = null;
    k.setInterval = function (a) {
        this.Qc = a;
        this.ca && this.enabled ? (this.stop(), this.start()) : this.ca && this.stop();
    };
    k.Qh = function () {
        if (this.enabled) {
            var a = Date.now() - this.bf;
            0 < a && a < 0.8 * this.Qc
                ? (this.ca = this.rc.setTimeout(this.ze, this.Qc - a))
                : (this.ca && (this.rc.clearTimeout(this.ca), (this.ca = null)),
                  this.dispatchEvent('tick'),
                  this.enabled && (this.stop(), this.start()));
        }
    };
    k.start = function () {
        this.enabled = !0;
        this.ca || ((this.ca = this.rc.setTimeout(this.ze, this.Qc)), (this.bf = Date.now()));
    };
    k.stop = function () {
        this.enabled = !1;
        this.ca && (this.rc.clearTimeout(this.ca), (this.ca = null));
    };
    k.m = function () {
        Kf.Z.m.call(this);
        this.stop();
        delete this.rc;
    };
    function Lf(a, b) {
        if ('function' === typeof a) b && (a = u(a, b));
        else if (a && 'function' == typeof a.handleEvent) a = u(a.handleEvent, a);
        else throw Error('Invalid listener argument');
        return 2147483647 < Number(0) ? -1 : r.setTimeout(a, 0);
    }
    function Mf(a) {
        Re.call(this);
        this.ca = null;
        this.j = a;
        a = y || Uc;
        this.Pe = new cf(this);
        this.Pe.listen(this.j, a ? ['keydown', 'paste', 'cut', 'drop', 'input'] : 'input', this);
    }
    w(Mf, Re);
    Mf.prototype.handleEvent = function (a) {
        if ('input' == a.type)
            (y && fd(10) && 0 == a.keyCode && 0 == a.charCode) || (Nf(this), this.dispatchEvent(Of(a)));
        else if ('keydown' != a.type || Te(a)) {
            var b = 'keydown' == a.type ? this.j.value : null;
            y && 229 == a.keyCode && (b = null);
            var c = Of(a);
            Nf(this);
            this.ca = Lf(function () {
                this.ca = null;
                this.j.value != b && this.dispatchEvent(c);
            }, this);
        }
    };
    function Nf(a) {
        null != a.ca && (r.clearTimeout(a.ca), (a.ca = null));
    }
    function Of(a) {
        a = new se(a.Na);
        a.type = 'input';
        return a;
    }
    Mf.prototype.m = function () {
        Mf.Z.m.call(this);
        this.Pe.l();
        Nf(this);
        delete this.j;
    };
    function Pf(a, b, c, d) {
        se.call(this, d);
        this.type = 'key';
        this.keyCode = a;
        this.charCode = b;
        this.repeat = c;
    }
    w(Pf, se);
    function Qf(a, b) {
        Re.call(this);
        a &&
            (this.Sc && this.detach(),
            (this.j = a),
            (this.Rc = Fe(this.j, 'keypress', this, b)),
            (this.Qd = Fe(this.j, 'keydown', this.Kc, b, this)),
            (this.Sc = Fe(this.j, 'keyup', this.Og, b, this)));
    }
    w(Qf, Re);
    k = Qf.prototype;
    k.j = null;
    k.Rc = null;
    k.Qd = null;
    k.Sc = null;
    k.ma = -1;
    k.Wa = -1;
    k.pd = !1;
    var Rf = {
            3: 13,
            12: 144,
            63232: 38,
            63233: 40,
            63234: 37,
            63235: 39,
            63236: 112,
            63237: 113,
            63238: 114,
            63239: 115,
            63240: 116,
            63241: 117,
            63242: 118,
            63243: 119,
            63244: 120,
            63245: 121,
            63246: 122,
            63247: 123,
            63248: 44,
            63272: 46,
            63273: 36,
            63275: 35,
            63276: 33,
            63277: 34,
            63289: 144,
            63302: 45
        },
        Sf = {
            Up: 38,
            Down: 40,
            Left: 37,
            Right: 39,
            Enter: 13,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            'U+007F': 46,
            Home: 36,
            End: 35,
            PageUp: 33,
            PageDown: 34,
            Insert: 45
        },
        Tf = Zc && Wc;
    k = Qf.prototype;
    k.Kc = function (a) {
        if (Xc || Uc)
            if ((17 == this.ma && !a.ctrlKey) || (18 == this.ma && !a.altKey) || (Zc && 91 == this.ma && !a.metaKey))
                this.Wa = this.ma = -1;
        -1 == this.ma &&
            (a.ctrlKey && 17 != a.keyCode
                ? (this.ma = 17)
                : a.altKey && 18 != a.keyCode
                ? (this.ma = 18)
                : a.metaKey && 91 != a.keyCode && (this.ma = 91));
        Ve(a.keyCode, this.ma, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey)
            ? ((this.Wa = We(a.keyCode)), Tf && (this.pd = a.altKey))
            : this.handleEvent(a);
    };
    k.Og = function (a) {
        this.Wa = this.ma = -1;
        this.pd = a.altKey;
    };
    k.handleEvent = function (a) {
        var b = a.Na,
            c = b.altKey;
        if (y && 'keypress' == a.type) {
            var d = this.Wa;
            var e = 13 != d && 27 != d ? b.keyCode : 0;
        } else
            (Xc || Uc) && 'keypress' == a.type
                ? ((d = this.Wa), (e = 0 <= b.charCode && 63232 > b.charCode && Ue(d) ? b.charCode : 0))
                : ('keypress' == a.type
                      ? (Tf && (c = this.pd),
                        b.keyCode == b.charCode
                            ? 32 > b.keyCode
                                ? ((d = b.keyCode), (e = 0))
                                : ((d = this.Wa), (e = b.charCode))
                            : ((d = b.keyCode || this.Wa), (e = b.charCode || 0)))
                      : ((d = b.keyCode || this.Wa), (e = b.charCode || 0)),
                  Zc && 63 == e && 224 == d && (d = 191));
        var f = (d = We(d));
        d
            ? 63232 <= d && d in Rf
                ? (f = Rf[d])
                : 25 == d && a.shiftKey && (f = 9)
            : b.keyIdentifier && b.keyIdentifier in Sf && (f = Sf[b.keyIdentifier]);
        if (!Wc || 'keypress' != a.type || Ve(f, this.ma, a.shiftKey, a.ctrlKey, c, a.metaKey))
            (a = f == this.ma), (this.ma = f), (b = new Pf(f, e, a, b)), (b.altKey = c), this.dispatchEvent(b);
    };
    k.ia = function () {
        return this.j;
    };
    k.detach = function () {
        this.Rc && (Pe(this.Rc), Pe(this.Qd), Pe(this.Sc), (this.Sc = this.Qd = this.Rc = null));
        this.j = null;
        this.Wa = this.ma = -1;
    };
    k.m = function () {
        Qf.Z.m.call(this);
        this.detach();
    };
    function Uf(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d;
    }
    k = Uf.prototype;
    k.clone = function () {
        return new Uf(this.top, this.right, this.bottom, this.left);
    };
    k.toString = function () {
        return '(' + this.top + 't, ' + this.right + 'r, ' + this.bottom + 'b, ' + this.left + 'l)';
    };
    k.contains = function (a) {
        return this && a
            ? a instanceof Uf
                ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom
                : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom
            : !1;
    };
    k.expand = function (a, b, c, d) {
        t(a)
            ? ((this.top -= a.top), (this.right += a.right), (this.bottom += a.bottom), (this.left -= a.left))
            : ((this.top -= a), (this.right += Number(b)), (this.bottom += Number(c)), (this.left -= Number(d)));
        return this;
    };
    k.ceil = function () {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this;
    };
    k.floor = function () {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this;
    };
    k.round = function () {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this;
    };
    k.translate = function (a, b) {
        a instanceof Vd
            ? ((this.left += a.x), (this.right += a.x), (this.top += a.y), (this.bottom += a.y))
            : ((this.left += a), (this.right += a), 'number' === typeof b && ((this.top += b), (this.bottom += b)));
        return this;
    };
    k.scale = function (a, b) {
        b = 'number' === typeof b ? b : a;
        this.left *= a;
        this.right *= a;
        this.top *= b;
        this.bottom *= b;
        return this;
    };
    function Vf(a, b) {
        var c = Zd(a);
        return c.defaultView && c.defaultView.getComputedStyle && (a = c.defaultView.getComputedStyle(a, null))
            ? a[b] || a.getPropertyValue(b) || ''
            : '';
    }
    function Wf(a) {
        try {
            return a.getBoundingClientRect();
        } catch (b) {
            return { left: 0, top: 0, right: 0, bottom: 0 };
        }
    }
    function Xf(a, b) {
        b = b || ee(document);
        var c = b || ee(document);
        var d = Yf(a),
            e = Yf(c);
        if (!y || 9 <= Number(id)) {
            g = Vf(c, 'borderLeftWidth');
            var f = Vf(c, 'borderRightWidth');
            h = Vf(c, 'borderTopWidth');
            n = Vf(c, 'borderBottomWidth');
            f = new Uf(parseFloat(h), parseFloat(f), parseFloat(n), parseFloat(g));
        } else {
            var g = Zf(c, 'borderLeft');
            f = Zf(c, 'borderRight');
            var h = Zf(c, 'borderTop'),
                n = Zf(c, 'borderBottom');
            f = new Uf(h, f, n, g);
        }
        c == ee(document)
            ? ((g = d.x - c.scrollLeft),
              (d = d.y - c.scrollTop),
              !y || 10 <= Number(id) || ((g += f.left), (d += f.top)))
            : ((g = d.x - e.x - f.left), (d = d.y - e.y - f.top));
        e = a.offsetWidth;
        f = a.offsetHeight;
        h = Xc && !e && !f;
        (void 0 === e || h) && a.getBoundingClientRect
            ? ((a = Wf(a)), (a = new Wd(a.right - a.left, a.bottom - a.top)))
            : (a = new Wd(e, f));
        e = c.clientHeight - a.height;
        f = c.scrollLeft;
        h = c.scrollTop;
        f += Math.min(g, Math.max(g - (c.clientWidth - a.width), 0));
        h += Math.min(d, Math.max(d - e, 0));
        c = new Vd(f, h);
        b.scrollLeft = c.x;
        b.scrollTop = c.y;
    }
    function Yf(a) {
        var b = Zd(a),
            c = new Vd(0, 0);
        var d = b ? Zd(b) : document;
        d = !y || 9 <= Number(id) || 'CSS1Compat' == Xd(d).ha.compatMode ? d.documentElement : d.body;
        if (a == d) return c;
        a = Wf(a);
        d = Xd(b).ha;
        b = ee(d);
        d = d.parentWindow || d.defaultView;
        b =
            y && fd('10') && d.pageYOffset != b.scrollTop
                ? new Vd(b.scrollLeft, b.scrollTop)
                : new Vd(d.pageXOffset || b.scrollLeft, d.pageYOffset || b.scrollTop);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c;
    }
    var $f = { thin: 2, medium: 4, thick: 6 };
    function Zf(a, b) {
        if ('none' == (a.currentStyle ? a.currentStyle[b + 'Style'] : null)) return 0;
        var c = a.currentStyle ? a.currentStyle[b + 'Width'] : null;
        if (c in $f) a = $f[c];
        else if (/^\d+px?$/.test(c)) a = parseInt(c, 10);
        else {
            b = a.style.left;
            var d = a.runtimeStyle.left;
            a.runtimeStyle.left = a.currentStyle.left;
            a.style.left = c;
            c = a.style.pixelLeft;
            a.style.left = b;
            a.runtimeStyle.left = d;
            a = +c;
        }
        return a;
    }
    function ag() {}
    sa(ag);
    ag.prototype.hh = 0;
    ag.prototype.Rg = '';
    function bg(a) {
        Re.call(this);
        this.Tb = a || Xd();
        this.pb = null;
        this.qb = !1;
        this.j = null;
        this.fb = void 0;
        this.Ac = this.yb = this.V = null;
        this.Vh = !1;
    }
    w(bg, Re);
    k = bg.prototype;
    k.Qg = ag.Ed();
    k.getId = function () {
        var a;
        (a = this.pb) || ((a = this.Qg), (a = this.pb = a.Rg + ':' + (a.hh++).toString(36)));
        return a;
    };
    k.ia = function () {
        return this.j;
    };
    k.Gc = function (a) {
        return this.j ? this.Tb.Gc(a, this.j) : [];
    };
    k.A = function (a) {
        return this.j ? this.Tb.A(a, this.j) : null;
    };
    function cg(a) {
        a.fb || (a.fb = new cf(a));
        return a.fb;
    }
    k.getParent = function () {
        return this.V;
    };
    k.fe = function (a) {
        if (this.V && this.V != a) throw Error('Method not supported');
        bg.Z.fe.call(this, a);
    };
    k.Cb = function () {
        return this.Tb;
    };
    k.yd = function () {
        this.j = this.Tb.createElement('DIV');
    };
    k.render = function (a) {
        if (this.qb) throw Error('Component already rendered');
        this.j || this.yd();
        a ? a.insertBefore(this.j, null) : this.Tb.ha.body.appendChild(this.j);
        (this.V && !this.V.qb) || this.s();
    };
    k.s = function () {
        this.qb = !0;
        dg(this, function (a) {
            !a.qb && a.ia() && a.s();
        });
    };
    k.Ub = function () {
        dg(this, function (a) {
            a.qb && a.Ub();
        });
        this.fb && this.fb.Zc();
        this.qb = !1;
    };
    k.m = function () {
        this.qb && this.Ub();
        this.fb && (this.fb.l(), delete this.fb);
        dg(this, function (a) {
            a.l();
        });
        !this.Vh && this.j && he(this.j);
        this.V = this.j = this.Ac = this.yb = null;
        bg.Z.m.call(this);
    };
    k.hasChildren = function () {
        return !!this.yb && 0 != this.yb.length;
    };
    function dg(a, b) {
        a.yb && a.yb.forEach(b, void 0);
    }
    k.removeChild = function (a, b) {
        if (a) {
            var c = 'string' === typeof a ? a : a.getId();
            this.Ac && c ? ((a = this.Ac), (a = (null !== a && c in a ? a[c] : void 0) || null)) : (a = null);
            if (c && a) {
                var d = this.Ac;
                c in d && delete d[c];
                Ia(this.yb, a);
                b && (a.Ub(), a.j && he(a.j));
                b = a;
                if (null == b) throw Error('Unable to set parent component');
                b.V = null;
                bg.Z.fe.call(b, null);
            }
        }
        if (!a) throw Error('Child is not in parent component');
        return a;
    };
    function H(a, b) {
        var c = je(a, 'firebaseui-textfield');
        b
            ? (Ud(a, 'firebaseui-input-invalid'), Td(a, 'firebaseui-input'), c && Ud(c, 'firebaseui-textfield-invalid'))
            : (Ud(a, 'firebaseui-input'),
              Td(a, 'firebaseui-input-invalid'),
              c && Td(c, 'firebaseui-textfield-invalid'));
    }
    function eg(a, b, c) {
        b = new Mf(b);
        pe(a, xa(ne, b));
        cg(a).listen(b, 'input', c);
    }
    function fg(a, b, c) {
        b = new Qf(b);
        pe(a, xa(ne, b));
        cg(a).listen(b, 'key', function (d) {
            13 == d.keyCode && (d.stopPropagation(), d.preventDefault(), c(d));
        });
    }
    function gg(a, b, c) {
        b = new bf(b);
        pe(a, xa(ne, b));
        cg(a).listen(b, 'focusin', c);
    }
    function hg(a, b, c) {
        b = new bf(b);
        pe(a, xa(ne, b));
        cg(a).listen(b, 'focusout', c);
    }
    function I(a, b, c) {
        b = new Ye(b);
        pe(a, xa(ne, b));
        cg(a).listen(b, 'action', function (d) {
            d.stopPropagation();
            d.preventDefault();
            c(d);
        });
    }
    function ig(a) {
        Td(a, 'firebaseui-hidden');
    }
    function jg(a, b) {
        b && ie(a, b);
        Ud(a, 'firebaseui-hidden');
    }
    function kg(a) {
        return !Sd(a, 'firebaseui-hidden') && 'none' != a.style.display;
    }
    function lg(a) {
        mg(a, 'upgradeElement');
    }
    function ng(a) {
        mg(a, 'downgradeElements');
    }
    var og = ['mdl-js-textfield', 'mdl-js-progress', 'mdl-js-spinner', 'mdl-js-button'];
    function mg(a, b) {
        a &&
            window.componentHandler &&
            window.componentHandler[b] &&
            og.forEach(function (c) {
                if (Sd(a, c)) window.componentHandler[b](a);
                Ea($d(c, a), function (d) {
                    window.componentHandler[b](d);
                });
            });
    }
    function pg(a, b, c) {
        qg.call(this);
        document.body.appendChild(a);
        a.showModal || window.dialogPolyfill.registerDialog(a);
        a.showModal();
        lg(a);
        b &&
            I(this, a, function (f) {
                var g = a.getBoundingClientRect();
                (f.clientX < g.left ||
                    g.left + g.width < f.clientX ||
                    f.clientY < g.top ||
                    g.top + g.height < f.clientY) &&
                    qg.call(this);
            });
        if (!c) {
            var d = this.ia().parentElement || this.ia().parentNode;
            if (d) {
                var e = this;
                this.oc = function () {
                    if (a.open) {
                        var f = a.getBoundingClientRect().height,
                            g = d.getBoundingClientRect().height,
                            h = d.getBoundingClientRect().top - document.body.getBoundingClientRect().top,
                            n = d.getBoundingClientRect().left - document.body.getBoundingClientRect().left,
                            p = a.getBoundingClientRect().width,
                            m = d.getBoundingClientRect().width;
                        a.style.top = (h + (g - f) / 2).toString() + 'px';
                        f = n + (m - p) / 2;
                        a.style.left = f.toString() + 'px';
                        a.style.right = (document.body.getBoundingClientRect().width - f - p).toString() + 'px';
                    } else window.removeEventListener('resize', e.oc);
                };
                this.oc();
                window.addEventListener('resize', this.oc, !1);
            }
        }
    }
    function qg() {
        var a = rg.call(this);
        a && (ng(a), a.open && a.close(), he(a), this.oc && window.removeEventListener('resize', this.oc));
    }
    function rg() {
        return be('firebaseui-id-dialog');
    }
    function sg(a, b, c, d) {
        a = a(b || tg, c);
        d = (d || Xd()).createElement('DIV');
        if (t(a))
            if (a instanceof Lc) {
                if (a.xd !== Hc) throw Error('Sanitized content was not of kind HTML.');
                a = Kb(a.toString(), a.Sb || null);
            } else Ca('Soy template output is unsafe for use as HTML: ' + a), (a = Jb('zSoyz'));
        else a = Jb(String(a));
        a.Qa().match(ug);
        if (Pb()) for (; d.lastChild; ) d.removeChild(d.lastChild);
        d.innerHTML = Ib(a);
        1 == d.childNodes.length && ((a = d.firstChild), 1 == a.nodeType && (d = a));
        return d;
    }
    var ug = /^<(body|caption|col|colgroup|head|html|tr|td|th|tbody|thead|tfoot)>/i,
        tg = {};
    function vg() {
        return C['firebaseui.auth.soy2.strings.dialogVerifyingPhoneNumber']
            ? C['firebaseui.auth.soy2.strings.dialogVerifyingPhoneNumber'](void 0, void 0)
            : 'Validation\u2026';
    }
    function wg(a, b) {
        return C['firebaseui.auth.soy2.strings.errorInvalidPhoneNumber']
            ? C['firebaseui.auth.soy2.strings.errorInvalidPhoneNumber'](a, b)
            : 'Saisissez un num\u00e9ro de t\u00e9l\u00e9phone valide';
    }
    function xg(a, b) {
        return C['firebaseui.auth.soy2.strings.errorInvalidConfirmationCode']
            ? C['firebaseui.auth.soy2.strings.errorInvalidConfirmationCode'](a, b)
            : 'Code erron\u00e9. Veuillez r\u00e9essayer.';
    }
    function yg() {
        return C['firebaseui.auth.soy2.strings.errorMissingPassword']
            ? C['firebaseui.auth.soy2.strings.errorMissingPassword'](void 0, void 0)
            : 'Saisissez votre mot de passe';
    }
    function zg() {
        return C['firebaseui.auth.soy2.strings.errorSendPasswordReset']
            ? C['firebaseui.auth.soy2.strings.errorSendPasswordReset'](void 0, void 0)
            : "Impossible d'envoyer le code de r\u00e9initialisation du mot de passe \u00e0 l'adresse e-mail indiqu\u00e9e";
    }
    function Ag(a, b) {
        return C['firebaseui.auth.soy2.strings.internalError']
            ? C['firebaseui.auth.soy2.strings.internalError'](a, b)
            : "Une erreur s'est produite. Veuillez r\u00e9essayer.";
    }
    function Bg() {
        return C['firebaseui.auth.soy2.strings.errorAnonymousEmailBlockingSignIn']
            ? C['firebaseui.auth.soy2.strings.errorAnonymousEmailBlockingSignIn'](void 0, void 0)
            : 'Cette adresse e-mail existe, mais ne propose aucun mode de connexion. Veuillez r\u00e9initialiser le mot de passe pour r\u00e9cup\u00e9rer le compte.';
    }
    function Cg(a) {
        a = a || {};
        a = a.code;
        if (C['firebaseui.auth.soy2.strings.errorCIAP'])
            a = C['firebaseui.auth.soy2.strings.errorCIAP']({ code: a }, void 0);
        else {
            D(null == a || 'string' === typeof a, 'code', a, 'null|string|undefined');
            var b = '';
            switch (t(a) ? a.toString() : a) {
                case 'invalid-argument':
                    b += 'Le client a sp\u00e9cifi\u00e9 un argument incorrect.';
                    break;
                case 'invalid-configuration':
                    b += "La configuration de projet sp\u00e9cifi\u00e9e par le client n'est pas valide.";
                    break;
                case 'failed-precondition':
                    b +=
                        "La requ\u00eate ne peut pas \u00eatre ex\u00e9cut\u00e9e dans l'\u00e9tat actuel du syst\u00e8me.";
                    break;
                case 'out-of-range':
                    b += 'Le client a sp\u00e9cifi\u00e9 une plage non valide.';
                    break;
                case 'unauthenticated':
                    b +=
                        "La requ\u00eate n'a pas \u00e9t\u00e9 authentifi\u00e9e en raison d'un jeton OAuth manquant, non valide ou ayant expir\u00e9.";
                    break;
                case 'permission-denied':
                    b += "Le client ne dispose pas d'une autorisation suffisante.";
                    break;
                case 'not-found':
                    b += 'Ressource indiqu\u00e9e introuvable.';
                    break;
                case 'aborted':
                    b +=
                        "Un conflit de simultan\u00e9it\u00e9 existe, tel qu'un conflit lecture-modification-\u00e9criture.";
                    break;
                case 'already-exists':
                    b += "La ressource qu'un client a essay\u00e9 de cr\u00e9er existe d\u00e9j\u00e0.";
                    break;
                case 'resource-exhausted':
                    b += 'Le quota de ressources est d\u00e9pass\u00e9 ou la limite du d\u00e9bit est atteinte.';
                    break;
                case 'cancelled':
                    b += 'La demande a \u00e9t\u00e9 annul\u00e9e par le client.';
                    break;
                case 'data-loss':
                    b += 'Perte de donn\u00e9es irr\u00e9cup\u00e9rable ou corruption de donn\u00e9es.';
                    break;
                case 'unknown':
                    b += 'Erreur du serveur inconnue.';
                    break;
                case 'internal':
                    b += 'Erreur interne du serveur.';
                    break;
                case 'not-implemented':
                    b += "M\u00e9thode d'API non mise en \u0153uvre par le serveur.";
                    break;
                case 'unavailable':
                    b += 'Service indisponible.';
                    break;
                case 'deadline-exceeded':
                    b += 'D\u00e9lai de requ\u00eate d\u00e9pass\u00e9.';
                    break;
                case 'auth/user-disabled':
                    b += 'Le compte utilisateur a \u00e9t\u00e9 d\u00e9sactiv\u00e9 par un administrateur.';
                    break;
                case 'auth/timeout':
                    b += "L'op\u00e9ration a d\u00e9pass\u00e9 le d\u00e9lai.";
                    break;
                case 'auth/too-many-requests':
                    b +=
                        'Nous avons bloqu\u00e9 toutes les requ\u00eates provenant de cet appareil, car nous avons d\u00e9tect\u00e9 une activit\u00e9 inhabituelle. R\u00e9essayez plus tard.';
                    break;
                case 'auth/quota-exceeded':
                    b +=
                        'Le quota pour cette op\u00e9ration a \u00e9t\u00e9 d\u00e9pass\u00e9. R\u00e9essayez plus tard.';
                    break;
                case 'auth/network-request-failed':
                    b += "Une erreur r\u00e9seau s'est produite R\u00e9essayez plus tard.";
                    break;
                case 'restart-process':
                    b +=
                        "Une erreur s'est produite lors de l'authentification de votre requ\u00eate. Veuillez retourner sur la page qui vous a redirig\u00e9 ici pour relancer le processus d'authentification.";
                    break;
                case 'no-matching-tenant-for-email':
                    b +=
                        "Veuillez essayer avec une autre adresse e-mail, car il n'y a pas de m\u00e9thode de connexion disponible pour celle-ci.";
            }
            a = b;
        }
        return a;
    }
    function Dg() {
        return C['firebaseui.auth.soy2.strings.errorLoginAgain_']
            ? C['firebaseui.auth.soy2.strings.errorLoginAgain_'](null, void 0)
            : 'Veuillez vous reconnecter pour effectuer cette op\u00e9ration';
    }
    var Eg = RegExp("^[+a-zA-Z0-9_.!#$%&'*\\/=?^`{|}~-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z0-9]{2,63}$");
    function Fg() {
        return this.A('firebaseui-id-email');
    }
    function Gg() {
        return this.A('firebaseui-id-email-error');
    }
    function Hg(a) {
        var b = Fg.call(this),
            c = Gg.call(this);
        eg(this, b, function () {
            kg(c) && (H(b, !0), ig(c));
        });
        a &&
            fg(this, b, function () {
                a();
            });
    }
    function Jg() {
        return db(E(Fg.call(this)) || '');
    }
    function Kg() {
        var a = Fg.call(this);
        var b = Gg.call(this);
        var c = E(a) || '';
        c
            ? Eg.test(c)
                ? (H(a, !0), ig(b), (b = !0))
                : (H(a, !1),
                  jg(
                      b,
                      (C['firebaseui.auth.soy2.strings.errorInvalidEmail']
                          ? C['firebaseui.auth.soy2.strings.errorInvalidEmail'](void 0, void 0)
                          : "Cette adresse e-mail n'est pas valide"
                      ).toString()
                  ),
                  (b = !1))
            : (H(a, !1),
              jg(
                  b,
                  (C['firebaseui.auth.soy2.strings.errorMissingEmail']
                      ? C['firebaseui.auth.soy2.strings.errorMissingEmail'](void 0, void 0)
                      : 'Saisissez votre adresse e-mail pour continuer'
                  ).toString()
              ),
              (b = !1));
        return b ? db(E(a)) : null;
    }
    function J() {
        return this.A('firebaseui-id-submit');
    }
    function K() {
        return this.A('firebaseui-id-secondary-link');
    }
    function Lg(a, b) {
        I(this, J.call(this), function (d) {
            a(d);
        });
        var c = K.call(this);
        c &&
            b &&
            I(this, c, function (d) {
                b(d);
            });
    }
    var Mg =
        !y &&
        !(
            x('Safari') &&
            !(
                Fb() ||
                x('Coast') ||
                x('Opera') ||
                x('Edge') ||
                x('Edg/') ||
                x('OPR') ||
                x('Firefox') ||
                x('FxiOS') ||
                x('Silk') ||
                x('Android')
            )
        );
    function Ng(a, b) {
        if (/-[a-z]/.test(b)) return null;
        if (Mg && a.dataset) {
            if (!(!x('Android') || Fb() || x('Firefox') || x('FxiOS') || x('Opera') || x('Silk') || b in a.dataset))
                return null;
            a = a.dataset[b];
            return void 0 === a ? null : a;
        }
        return a.getAttribute(
            'data-' +
                String(b)
                    .replace(/([A-Z])/g, '-$1')
                    .toLowerCase()
        );
    }
    function Og(a, b) {
        a = a || {};
        return Pg(b, a.email, a.disabled, a.ng);
    }
    function Pg(a, b, c, d) {
        if (C['firebaseui.auth.soy2.element.email'])
            return C['firebaseui.auth.soy2.element.email']({ email: b, disabled: c, ng: d }, a);
        D(null == b || 'string' === typeof b, 'email', b, 'null|string|undefined');
        D(null == c || 'boolean' === typeof c, 'disabled', c, 'boolean|null|undefined');
        D(null == d || 'boolean' === typeof d, 'changeEmail', d, 'boolean|null|undefined');
        a =
            '<div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="email">';
        a =
            (d ? a + 'Saisissez une nouvelle adresse e-mail' : a + 'E-mail') +
            ('</label><input type="email" name="email" autocomplete="username" class="mdl-textfield__input firebaseui-input firebaseui-id-email" value="' +
                qd(null != b ? b : '') +
                '"' +
                (c ? ' disabled' : '') +
                '></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-email-error"></p></div>');
        return B(a);
    }
    function Qg(a, b) {
        if (C['firebaseui.auth.soy2.element.submitButton'])
            return C['firebaseui.auth.soy2.element.submitButton']({ label: b }, a);
        D(null == b || 'string' === typeof b, 'label', b, 'null|string|undefined');
        a =
            '<button type="submit" class="firebaseui-id-submit firebaseui-button mdl-button mdl-js-button mdl-button--raised mdl-button--colored">';
        a = b ? a + z(b) : a + 'Suivant';
        return B(a + '</button>');
    }
    function Rg(a) {
        if (C['firebaseui.auth.soy2.element.signInButton'])
            return C['firebaseui.auth.soy2.element.signInButton'](null, a);
        a = '' + Qg(a, 'Se connecter');
        return B(a);
    }
    function Sg(a) {
        if (C['firebaseui.auth.soy2.element.saveButton']) return C['firebaseui.auth.soy2.element.saveButton'](null, a);
        a = '' + Qg(a, 'Enregistrer');
        return B(a);
    }
    function Tg(a) {
        if (C['firebaseui.auth.soy2.element.continueButton'])
            return C['firebaseui.auth.soy2.element.continueButton'](null, a);
        a = '' + Qg(a, 'Continuer');
        return B(a);
    }
    function Ug(a, b) {
        if (C['firebaseui.auth.soy2.element.newPassword'])
            return C['firebaseui.auth.soy2.element.newPassword']({ label: b }, a);
        D(null == b || 'string' === typeof b, 'label', b, 'null|string|undefined');
        a =
            '<div class="firebaseui-new-password-component"><div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="newPassword">';
        a = b ? a + z(b) : a + 'Choisissez un mot de passe';
        return B(
            a +
                '</label><input type="password" name="newPassword" autocomplete="new-password" class="mdl-textfield__input firebaseui-input firebaseui-id-new-password"></div><a href="javascript:void(0)" class="firebaseui-input-floating-button firebaseui-id-password-toggle firebaseui-input-toggle-on firebaseui-input-toggle-blur"></a><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-new-password-error"></p></div></div>'
        );
    }
    function Vg(a) {
        if (C['firebaseui.auth.soy2.element.password'])
            return C['firebaseui.auth.soy2.element.password']({ current: void 0 }, a);
        D(!0, 'current', void 0, 'boolean|null|undefined');
        return B(
            '<div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="password">Mot de passe</label><input type="password" name="password" autocomplete="current-password" class="mdl-textfield__input firebaseui-input firebaseui-id-password"></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-password-error"></p></div>'
        );
    }
    function Wg(a) {
        return C['firebaseui.auth.soy2.element.passwordRecoveryButton']
            ? C['firebaseui.auth.soy2.element.passwordRecoveryButton'](null, a)
            : B(
                  '<a class="firebaseui-link firebaseui-id-secondary-link" href="javascript:void(0)">Vous ne parvenez pas \u00e0 vous connecter\u00a0?</a>'
              );
    }
    function Xg(a, b) {
        if (C['firebaseui.auth.soy2.element.cancelButton'])
            return C['firebaseui.auth.soy2.element.cancelButton']({ label: b }, a);
        D(null == b || 'string' === typeof b, 'label', b, 'null|string|undefined');
        a =
            '<button class="firebaseui-id-secondary-link firebaseui-button mdl-button mdl-js-button mdl-button--primary">';
        a = b ? a + z(b) : a + 'Annuler';
        return B(a + '</button>');
    }
    function Yg(a, b) {
        if (C['firebaseui.auth.soy2.element.tosPpLink']) return C['firebaseui.auth.soy2.element.tosPpLink'](a, b);
        a = b.O;
        var c = '';
        nd(b.R) &&
            nd(a) &&
            (c +=
                '<ul class="firebaseui-tos-list firebaseui-tos"><li class="firebaseui-inline-list-item"><a href="javascript:void(0)" class="firebaseui-link firebaseui-tos-link" target="_blank">Conditions d\'utilisation</a></li><li class="firebaseui-inline-list-item"><a href="javascript:void(0)" class="firebaseui-link firebaseui-pp-link" target="_blank">R\u00e8gles de confidentialit\u00e9</a></li></ul>');
        return B(c);
    }
    function Zg(a, b) {
        if (C['firebaseui.auth.soy2.element.fullMessageTosPp'])
            return C['firebaseui.auth.soy2.element.fullMessageTosPp'](a, b);
        a = b.O;
        var c = '';
        nd(b.R) &&
            nd(a) &&
            (c +=
                '<p class="firebaseui-tos firebaseui-tospp-full-message">En continuant, vous acceptez les <a href="javascript:void(0)" class="firebaseui-link firebaseui-tos-link" target="_blank">Conditions d\'utilisation</a> et les <a href="javascript:void(0)" class="firebaseui-link firebaseui-pp-link" target="_blank">R\u00e8gles de confidentialit\u00e9</a>.</p>');
        return B(c);
    }
    function $g(a, b) {
        a = a.message;
        C['firebaseui.auth.soy2.element.infoBar']
            ? (b = C['firebaseui.auth.soy2.element.infoBar']({ message: a }, b))
            : (D('string' === typeof a, 'message', a, 'string'),
              (b =
                  '<div class="firebaseui-info-bar firebaseui-id-info-bar"><p class="firebaseui-info-bar-message">' +
                  z(a) +
                  '&nbsp;&nbsp;<a href="javascript:void(0)" class="firebaseui-link firebaseui-id-dismiss-info-bar">'),
              (b = B(b + 'Ignorer</a></p></div>')));
        return b;
    }
    function ah(a, b, c) {
        if (C['firebaseui.auth.soy2.element.dialog'])
            return C['firebaseui.auth.soy2.element.dialog']({ content: b, ii: c }, a);
        D(
            'string' === typeof b || b instanceof Mc || b instanceof Hb,
            'content',
            b,
            '!goog.html.SafeHtml|!goog.soy.data.SanitizedHtml|!soy.$$EMPTY_STRING_|string'
        );
        D(null == c || 'string' === typeof c, 'classes', c, 'null|string|undefined');
        return B(
            '<dialog class="mdl-dialog firebaseui-dialog firebaseui-id-dialog' +
                (c ? ' ' + qd(c) : '') +
                '">' +
                z(b) +
                '</dialog>'
        );
    }
    function bh(a, b) {
        var c = a.Zb;
        a = a.message;
        C['firebaseui.auth.soy2.element.progressDialog']
            ? (b = C['firebaseui.auth.soy2.element.progressDialog']({ Zb: c, message: a }, b))
            : (D('string' === typeof c, 'iconClass', c, 'string'),
              D('string' === typeof a, 'message', a, 'string'),
              (b = B(
                  ah(
                      b,
                      od(
                          '<div class="firebaseui-dialog-icon-wrapper"><div class="' +
                              qd(c) +
                              ' firebaseui-dialog-icon"></div></div><div class="firebaseui-progress-dialog-message">' +
                              z(a) +
                              '</div>'
                      )
                  )
              )));
        return b;
    }
    function ch(a, b) {
        a = a.items;
        if (C['firebaseui.auth.soy2.element.listBoxDialog'])
            b = C['firebaseui.auth.soy2.element.listBoxDialog']({ items: a }, b);
        else {
            D(Array.isArray(a), 'items', a, '!Array<{id: string, iconClass: string, label: string,}>');
            for (var c = '<div class="firebaseui-list-box-actions">', d = a.length, e = 0; e < d; e++) {
                var f = a[e];
                c +=
                    '<button type="button" data-listboxid="' +
                    qd(f.id) +
                    '" class="mdl-button firebaseui-id-list-box-dialog-button firebaseui-list-box-dialog-button">' +
                    (f.Zb
                        ? '<div class="firebaseui-list-box-icon-wrapper"><div class="firebaseui-list-box-icon ' +
                          qd(f.Zb) +
                          '"></div></div>'
                        : '') +
                    '<div class="firebaseui-list-box-label-wrapper">' +
                    z(f.label) +
                    '</div></button>';
            }
            b = '' + ah(b, od(c + '</div>'), 'firebaseui-list-box-dialog');
            b = B(b);
        }
        return b;
    }
    function dh(a, b) {
        a = a || {};
        return eh(b, a.If);
    }
    function eh(a, b) {
        if (C['firebaseui.auth.soy2.element.busyIndicator'])
            return C['firebaseui.auth.soy2.element.busyIndicator']({ If: b }, a);
        D(null == b || 'boolean' === typeof b, 'useSpinner', b, 'boolean|null|undefined');
        return B(
            b
                ? '<div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active firebaseui-busy-indicator firebaseui-id-busy-indicator"></div>'
                : '<div class="mdl-progress mdl-js-progress mdl-progress__indeterminate firebaseui-busy-indicator firebaseui-id-busy-indicator"></div>'
        );
    }
    function fh(a, b) {
        a = a || {};
        a = a.T;
        C['firebaseui.auth.soy2.element.idpName']
            ? (b = C['firebaseui.auth.soy2.element.idpName']({ T: a }, b))
            : (D(
                  null == a || t(a),
                  'providerConfig',
                  a,
                  'null|undefined|{providerId: (null|string|undefined), providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}'
              ),
              (b = b.yg),
              (b = a.na
                  ? '' + a.na
                  : b[a.providerId]
                  ? '' + b[a.providerId]
                  : nd(a.providerId) && 0 == ('' + a.providerId).indexOf('saml.')
                  ? '' + ('' + a.providerId).substring(5)
                  : nd(a.providerId) && 0 == ('' + a.providerId).indexOf('oidc.')
                  ? '' + ('' + a.providerId).substring(5)
                  : '' + a.providerId));
        return b;
    }
    function gh() {
        he(hh.call(this));
    }
    function hh() {
        return this.A('firebaseui-id-info-bar');
    }
    function ih() {
        return this.A('firebaseui-id-dismiss-info-bar');
    }
    function jh(a, b, c) {
        var d = this;
        a = sg(ch, { items: a }, null, this.Cb());
        pg.call(this, a, !0, !0);
        c && (c = kh(a, c)) && (c.focus(), Xf(c, a));
        I(this, a, function (e) {
            if ((e = (e = je(e.target, 'firebaseui-id-list-box-dialog-button')) && Ng(e, 'listboxid')))
                qg.call(d), b(e);
        });
    }
    function kh(a, b) {
        a = (a || document).getElementsByTagName('BUTTON');
        for (var c = 0; c < a.length; c++) if (Ng(a[c], 'listboxid') === b) return a[c];
        return null;
    }
    function lh() {
        return this.A('firebaseui-id-name');
    }
    function mh() {
        return this.A('firebaseui-id-name-error');
    }
    function nh() {
        return this.A('firebaseui-id-new-password');
    }
    function oh() {
        return this.A('firebaseui-id-password-toggle');
    }
    function ph() {
        this.Pd = !this.Pd;
        var a = oh.call(this),
            b = nh.call(this);
        this.Pd
            ? ((b.type = 'text'), Td(a, 'firebaseui-input-toggle-off'), Ud(a, 'firebaseui-input-toggle-on'))
            : ((b.type = 'password'), Td(a, 'firebaseui-input-toggle-on'), Ud(a, 'firebaseui-input-toggle-off'));
        b.focus();
    }
    function qh() {
        return this.A('firebaseui-id-new-password-error');
    }
    function rh() {
        this.Pd = !1;
        var a = nh.call(this);
        a.type = 'password';
        var b = qh.call(this);
        eg(this, a, function () {
            kg(b) && (H(a, !0), ig(b));
        });
        var c = oh.call(this);
        Td(c, 'firebaseui-input-toggle-on');
        Ud(c, 'firebaseui-input-toggle-off');
        gg(this, a, function () {
            Td(c, 'firebaseui-input-toggle-focus');
            Ud(c, 'firebaseui-input-toggle-blur');
        });
        hg(this, a, function () {
            Td(c, 'firebaseui-input-toggle-blur');
            Ud(c, 'firebaseui-input-toggle-focus');
        });
        I(this, c, u(ph, this));
    }
    function sh() {
        var a = nh.call(this);
        var b = qh.call(this);
        E(a) ? (H(a, !0), ig(b), (b = !0)) : (H(a, !1), jg(b, yg().toString()), (b = !1));
        return b ? E(a) : null;
    }
    function th() {
        return this.A('firebaseui-id-password');
    }
    function uh() {
        return this.A('firebaseui-id-password-error');
    }
    function vh() {
        var a = th.call(this),
            b = uh.call(this);
        eg(this, a, function () {
            kg(b) && (H(a, !0), ig(b));
        });
    }
    function wh() {
        var a = th.call(this);
        var b = uh.call(this);
        E(a) ? (H(a, !0), ig(b), (b = !0)) : (H(a, !1), jg(b, yg().toString()), (b = !1));
        return b ? E(a) : null;
    }
    function xh() {
        return this.A('firebaseui-id-phone-confirmation-code');
    }
    function yh() {
        return this.A('firebaseui-id-phone-confirmation-code-error');
    }
    function zh(a, b) {
        this.Bc = a;
        this.Xa = b;
    }
    function Ah(a) {
        a = db(a);
        var b = Pd.search(a);
        return 0 < b.length ? new zh('1' == b[0].g ? '1-US-0' : b[0].h, db(a.substr(b[0].g.length + 1))) : null;
    }
    function Bh(a) {
        var b = Kd(a.Bc);
        if (!b) throw Error('Country ID ' + a.Bc + ' not found.');
        return '+' + b.g + a.Xa;
    }
    function Ch() {
        return this.A('firebaseui-id-phone-number');
    }
    function Dh() {
        return this.A('firebaseui-id-country-selector');
    }
    function Eh() {
        return this.A('firebaseui-id-phone-number-error');
    }
    function Fh(a, b) {
        var c = a.Ua,
            d = Gh('1-US-0', c);
        b = b && Gh(b, c) ? b : d ? '1-US-0' : 0 < c.length ? c[0].h : null;
        if (!b) throw Error('No available default country');
        Hh.call(this, b, a);
    }
    function Gh(a, b) {
        a = Kd(a);
        return !(!a || !Ha(b, a));
    }
    function Ih(a) {
        return a.map(function (b) {
            return { id: b.h, Zb: 'firebaseui-flag ' + Jh(b), label: b.name + ' \u200e+' + b.g };
        });
    }
    function Jh(a) {
        return 'firebaseui-flag-' + a.i;
    }
    function Kh(a) {
        var b = this;
        jh.call(
            this,
            Ih(a.Ua),
            function (c) {
                Hh.call(b, c, a, !0);
                b.nb().focus();
            },
            this.mc
        );
    }
    function Hh(a, b, c) {
        var d = Kd(a);
        d &&
            (c &&
                ((c = db(E(Ch.call(this)) || '')),
                (b = b.search(c)),
                b.length && b[0].g != d.g && ((c = '+' + d.g + c.substr(b[0].g.length + 1)), me(Ch.call(this), c))),
            (b = Kd(this.mc)),
            (this.mc = a),
            (a = this.A('firebaseui-id-country-selector-flag')),
            b && Ud(a, Jh(b)),
            Td(a, Jh(d)),
            ie(this.A('firebaseui-id-country-selector-code'), '\u200e+' + d.g));
    }
    function Lh() {
        return this.A('firebaseui-id-resend-countdown');
    }
    var Mh = {},
        Nh = 0;
    function Oh(a, b) {
        if (!a) throw Error('Event target element must be provided!');
        a = Ph(a);
        if (Mh[a] && Mh[a].length) for (var c = 0; c < Mh[a].length; c++) Mh[a][c].dispatchEvent(b);
    }
    function Qh(a) {
        var b = Ph(a.ia());
        Mh[b] &&
            Mh[b].length &&
            (Ka(Mh[b], function (c) {
                return c == a;
            }),
            Mh[b].length || delete Mh[b]);
    }
    function Ph(a) {
        'undefined' === typeof a.Le && ((a.Le = Nh), Nh++);
        return a.Le;
    }
    function Rh(a) {
        if (!a) throw Error('Event target element must be provided!');
        Re.call(this);
        this.Bg = a;
    }
    l(Rh, Re);
    Rh.prototype.ia = function () {
        return this.Bg;
    };
    Rh.prototype.register = function () {
        var a = Ph(this.ia());
        Mh[a] ? Ha(Mh[a], this) || Mh[a].push(this) : (Mh[a] = [this]);
    };
    Rh.prototype.unregister = function () {
        Qh(this);
    };
    var Sh = {
        xg: {
            'google.com': 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg',
            'github.com': 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/github.svg',
            'facebook.com': 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg',
            'twitter.com': 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/twitter.svg',
            password: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg',
            phone: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/phone.svg',
            anonymous: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/anonymous.png',
            'microsoft.com': 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/microsoft.svg',
            'yahoo.com': 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/yahoo.svg',
            'apple.com': 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/apple.png',
            saml: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/saml.svg',
            oidc: 'https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/oidc.svg'
        },
        wg: {
            'google.com': '#ffffff',
            'github.com': '#333333',
            'facebook.com': '#3b5998',
            'twitter.com': '#55acee',
            password: '#db4437',
            phone: '#02bd7e',
            anonymous: '#f4b400',
            'microsoft.com': '#2F2F2F',
            'yahoo.com': '#720E9E',
            'apple.com': '#000000',
            saml: '#007bff',
            oidc: '#007bff'
        },
        yg: {
            'google.com': 'Google',
            'github.com': 'GitHub',
            'facebook.com': 'Facebook',
            'twitter.com': 'Twitter',
            password: 'Password',
            phone: 'Phone',
            anonymous: 'Guest',
            'microsoft.com': 'Microsoft',
            'yahoo.com': 'Yahoo',
            'apple.com': 'Apple'
        }
    };
    function Th(a, b, c) {
        qe.call(this, a, b);
        for (var d in c) this[d] = c[d];
    }
    w(Th, qe);
    function L(a, b, c, d, e) {
        bg.call(this, c);
        this.xf = a;
        this.wf = b;
        this.Pc = !1;
        this.Wc = d || null;
        this.Ta = this.Ia = null;
        this.Eb = Pa(Sh);
        Ra(this.Eb, e || {});
    }
    w(L, bg);
    k = L.prototype;
    k.yd = function () {
        var a = sg(this.xf, this.wf, this.Eb, this.Cb());
        lg(a);
        this.j = a;
    };
    k.s = function () {
        L.Z.s.call(this);
        Oh(M(this), new Th('pageEnter', M(this), { pageId: this.Wc }));
        if (this.Te() && this.Eb.R) {
            var a = this.Eb.R;
            I(this, this.Te(), function () {
                a();
            });
        }
        if (this.Se() && this.Eb.O) {
            var b = this.Eb.O;
            I(this, this.Se(), function () {
                b();
            });
        }
    };
    k.Ub = function () {
        Oh(M(this), new Th('pageExit', M(this), { pageId: this.Wc }));
        L.Z.Ub.call(this);
    };
    k.m = function () {
        window.clearTimeout(this.Ia);
        this.wf = this.xf = this.Ia = null;
        this.Pc = !1;
        this.Ta = null;
        ng(this.ia());
        L.Z.m.call(this);
    };
    function Uh(a) {
        a.Pc = !0;
        var b = Sd(a.ia(), 'firebaseui-use-spinner');
        a.Ia = window.setTimeout(function () {
            a.ia() && null === a.Ta && ((a.Ta = sg(dh, { If: b }, null, a.Cb())), a.ia().appendChild(a.Ta), lg(a.Ta));
        }, 500);
    }
    k.aa = function (a, b, c, d) {
        function e() {
            if (f.isDisposed()) return null;
            f.Pc = !1;
            window.clearTimeout(f.Ia);
            f.Ia = null;
            f.Ta && (ng(f.Ta), he(f.Ta), (f.Ta = null));
        }
        var f = this;
        if (f.Pc) return null;
        Uh(f);
        return a.apply(null, b).then(c, d).then(e, e);
    };
    function M(a) {
        return a.ia().parentElement || a.ia().parentNode;
    }
    function Vh(a, b, c) {
        fg(a, b, function () {
            c.focus();
        });
    }
    function Wh(a, b, c) {
        fg(a, b, function () {
            c();
        });
    }
    Object.assign(L.prototype, {
        I: function (a) {
            gh.call(this);
            var b = sg($g, { message: a }, null, this.Cb());
            this.ia().appendChild(b);
            I(this, ih.call(this), function () {
                he(b);
            });
        },
        ki: gh,
        ni: hh,
        mi: ih,
        Lb: function (a, b) {
            a = sg(bh, { Zb: a, message: b }, null, this.Cb());
            pg.call(this, a);
        },
        fa: qg,
        Ig: rg,
        pi: function () {
            return this.A('firebaseui-tos');
        },
        Te: function () {
            return this.A('firebaseui-tos-link');
        },
        Se: function () {
            return this.A('firebaseui-pp-link');
        },
        ri: function () {
            return this.A('firebaseui-tos-list');
        }
    });
    function Xh(a, b) {
        if (C['firebaseui.auth.soy2.page.signIn']) return C['firebaseui.auth.soy2.page.signIn'](a, b);
        a = a || {};
        D(null == a.email || 'string' === typeof a.email, 'email', a.email, 'null|string|undefined');
        var c = D(null == a.lb || 'boolean' === typeof a.lb, 'displayCancelButton', a.lb, 'boolean|null|undefined'),
            d = D(null == a.ga || 'boolean' === typeof a.ga, 'displayFullTosPpMessage', a.ga, 'boolean|null|undefined');
        a =
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-sign-in"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter avec une adresse e-mail</h1></div><div class="firebaseui-card-content"><div class="firebaseui-relative-wrapper">' +
            (Og(a, b) +
                '</div></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
                (c ? Xg(b) : '') +
                Qg(b) +
                '</div></div><div class="firebaseui-card-footer">' +
                (d ? Zg(a, b) : Yg(a, b)) +
                '</div></form></div>');
        return B(a);
    }
    function Yh(a, b) {
        if (C['firebaseui.auth.soy2.page.passwordSignIn']) return C['firebaseui.auth.soy2.page.passwordSignIn'](a, b);
        a = a || {};
        D(null == a.email || 'string' === typeof a.email, 'email', a.email, 'null|string|undefined');
        var c = D(null == a.ga || 'boolean' === typeof a.ga, 'displayFullTosPpMessage', a.ga, 'boolean|null|undefined');
        a =
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-sign-in"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter' +
            ('</h1></div><div class="firebaseui-card-content">' +
                Og(a, b) +
                Vg(b) +
                '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">' +
                Wg(b) +
                '</div><div class="firebaseui-form-actions">' +
                Rg(b) +
                '</div></div><div class="firebaseui-card-footer">' +
                (c ? Zg(a, b) : Yg(a, b)) +
                '</div></form></div>');
        return B(a);
    }
    function Zh(a, b) {
        if (C['firebaseui.auth.soy2.page.passwordSignUp']) return C['firebaseui.auth.soy2.page.passwordSignUp'](a, b);
        a = a || {};
        D(null == a.email || 'string' === typeof a.email, 'email', a.email, 'null|string|undefined');
        var c = D(null == a.$d || 'boolean' === typeof a.$d, 'requireDisplayName', a.$d, 'boolean|null|undefined');
        D(null == a.name || 'string' === typeof a.name, 'name', a.name, 'null|string|undefined');
        var d = D(null == a.jb || 'boolean' === typeof a.jb, 'allowCancel', a.jb, 'boolean|null|undefined'),
            e = D(null == a.ga || 'boolean' === typeof a.ga, 'displayFullTosPpMessage', a.ga, 'boolean|null|undefined'),
            f =
                '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-sign-up"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Cr\u00e9er un compte',
            g = '</h1></div><div class="firebaseui-card-content">' + Og(a, b);
        c
            ? ((c = a || {}),
              (c = c.name),
              C['firebaseui.auth.soy2.element.name']
                  ? (c = C['firebaseui.auth.soy2.element.name']({ name: c }, b))
                  : (D(null == c || 'string' === typeof c, 'name', c, 'null|string|undefined'),
                    (c =
                        '<div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="name">Nom et pr\u00e9nom</label><input type="text" name="name" autocomplete="name" class="mdl-textfield__input firebaseui-input firebaseui-id-name" value="' +
                        (qd(null != c ? c : '') +
                            '"></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-name-error"></p></div>')),
                    (c = B(c))))
            : (c = '');
        a =
            f +
            (g +
                c +
                Ug(b) +
                '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
                (d ? Xg(b) : '') +
                Sg(b) +
                '</div></div><div class="firebaseui-card-footer">' +
                (e ? Zg(a, b) : Yg(a, b)) +
                '</div></form></div>');
        return B(a);
    }
    function $h(a, b) {
        if (C['firebaseui.auth.soy2.page.passwordRecovery'])
            return C['firebaseui.auth.soy2.page.passwordRecovery'](a, b);
        a = a || {};
        D(null == a.email || 'string' === typeof a.email, 'email', a.email, 'null|string|undefined');
        var c = D(null == a.jb || 'boolean' === typeof a.jb, 'allowCancel', a.jb, 'boolean|null|undefined');
        c =
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-recovery"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">R\u00e9cup\u00e9rer votre mot de passe</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Les instructions relatives \u00e0 la r\u00e9initialisation de votre mot de passe seront envoy\u00e9es \u00e0 cette adresse e-mail</p>' +
            (Og(a, b) +
                '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
                (c ? Xg(b) : ''));
        c += Qg(b, 'Envoyer');
        c += '</div></div><div class="firebaseui-card-footer">' + Yg(a, b) + '</div></form></div>';
        return B(c);
    }
    function ai(a, b) {
        if (C['firebaseui.auth.soy2.page.passwordRecoveryEmailSent'])
            return C['firebaseui.auth.soy2.page.passwordRecoveryEmailSent'](a, b);
        var c = D('string' === typeof a.email, 'email', a.email, 'string'),
            d = D(null == a.C || 'boolean' === typeof a.C, 'allowContinue', a.C, 'boolean|null|undefined');
        var e =
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-recovery-email-sent"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Consultez votre bo\u00eete de r\u00e9ception</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
        c =
            "Suivez les instructions envoy\u00e9es \u00e0 l'adresse <strong>" +
            z(c) +
            '</strong> pour r\u00e9cup\u00e9rer votre mot de passe';
        e = e + c + '</p></div><div class="firebaseui-card-actions">';
        d && ((e = e + '<div class="firebaseui-form-actions">' + Qg(b, 'OK')), (e += '</div>'));
        e += '</div><div class="firebaseui-card-footer">' + Yg(a, b) + '</div></div>';
        return B(e);
    }
    function bi(a, b) {
        return C['firebaseui.auth.soy2.page.callback']
            ? C['firebaseui.auth.soy2.page.callback'](a, b)
            : B(
                  '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-callback"><div class="firebaseui-callback-indicator-container">' +
                      eh(b) +
                      '</div></div>'
              );
    }
    function ci(a, b) {
        return C['firebaseui.auth.soy2.page.spinner']
            ? C['firebaseui.auth.soy2.page.spinner'](a, b)
            : B('<div class="firebaseui-container firebaseui-id-page-spinner">' + eh(b, !0) + '</div>');
    }
    function di(a, b) {
        return C['firebaseui.auth.soy2.page.blank']
            ? C['firebaseui.auth.soy2.page.blank'](a, b)
            : B('<div class="firebaseui-container firebaseui-id-page-blank firebaseui-use-spinner"></div>');
    }
    function ei(a, b) {
        if (C['firebaseui.auth.soy2.page.emailLinkSignInSent'])
            return C['firebaseui.auth.soy2.page.emailLinkSignInSent'](a, b);
        var c = D('string' === typeof a.email, 'email', a.email, 'string');
        var d =
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-sent"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">E-mail de connexion envoy\u00e9</h1></div><div class="firebaseui-card-content"><div class="firebaseui-email-sent"></div><p class="firebaseui-text">';
        c =
            'Un e-mail de connexion avec des instructions suppl\u00e9mentaires a \u00e9t\u00e9 envoy\u00e9 \u00e0 <strong>' +
            z(c) +
            '</strong>. Consultez cet e-mail pour vous connecter.';
        d += c;
        c = C['firebaseui.auth.soy2.element.troubleGettingEmailButton']
            ? C['firebaseui.auth.soy2.element.troubleGettingEmailButton'](null, b)
            : B(
                  '<a class="firebaseui-link firebaseui-id-trouble-getting-email-link" href="javascript:void(0)">Vous n\'avez pas re\u00e7u l\'e-mail\u00a0?</a>'
              );
        d =
            d +
            ('</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">' +
                c +
                '</div><div class="firebaseui-form-actions">') +
            Xg(b, 'Retour');
        d += '</div></div><div class="firebaseui-card-footer">' + Yg(a, b) + '</div></form></div>';
        return B(d);
    }
    function fi(a, b) {
        if (C['firebaseui.auth.soy2.page.emailNotReceived'])
            return C['firebaseui.auth.soy2.page.emailNotReceived'](a, b);
        a = a || {};
        var c =
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-not-received"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Vous n\'avez pas re\u00e7u l\'e-mail\u00a0?</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Essayez les solutions courantes suivantes\u00a0:<ul><li>V\u00e9rifiez que l\'e-mail n\'a ni \u00e9t\u00e9 marqu\u00e9 comme spam ni \u00e9t\u00e9 filtr\u00e9.</li><li>V\u00e9rifiez votre connexion Internet.</li><li>V\u00e9rifiez que votre adresse e-mail est correcte.</li><li>V\u00e9rifiez que votre bo\u00eete de r\u00e9ception n\'est pas pleine et que les param\u00e8tres sont correctement d\u00e9finis.</li></ul></p><p class="firebaseui-text">Si les \u00e9tapes d\u00e9crites plus haut n\'ont pas r\u00e9solu le probl\u00e8me, vous pouvez renvoyer l\'e-mail. Sachez que le lien du premier e-mail sera alors d\u00e9sactiv\u00e9.';
        var d = C['firebaseui.auth.soy2.element.resendEmailLinkButton']
            ? C['firebaseui.auth.soy2.element.resendEmailLinkButton'](null, b)
            : B('<a class="firebaseui-link firebaseui-id-resend-email-link" href="javascript:void(0)">Renvoyer</a>');
        c =
            c +
            ('</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">' +
                d +
                '</div><div class="firebaseui-form-actions">') +
            Xg(b, 'Retour');
        c += '</div></div><div class="firebaseui-card-footer">' + Yg(a, b) + '</div></form></div>';
        return B(c);
    }
    function gi(a, b) {
        if (C['firebaseui.auth.soy2.page.emailLinkSignInConfirmation'])
            return C['firebaseui.auth.soy2.page.emailLinkSignInConfirmation'](a, b);
        a = a || {};
        D(null == a.email || 'string' === typeof a.email, 'email', a.email, 'null|string|undefined');
        a =
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-confirmation"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Confirmer l\'e-mail</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Confirmez votre adresse e-mail pour vous connecter.</p><div class="firebaseui-relative-wrapper">' +
            (Og(a, b) +
                '</div></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
                Xg(b) +
                Qg(b) +
                '</div></div><div class="firebaseui-card-footer">' +
                Yg(a, b) +
                '</div></form></div>');
        return B(a);
    }
    function hi(a, b) {
        if (C['firebaseui.auth.soy2.page.differentDeviceError'])
            return C['firebaseui.auth.soy2.page.differentDeviceError'](a, b);
        a =
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-different-device-error"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Nouveau navigateur ou appareil d\u00e9tect\u00e9</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Essayez d\'ouvrir le lien en utilisant le m\u00eame appareil ou navigateur que celui sur lequel vous avez commenc\u00e9 le processus de connexion.</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
            Xg(b, 'Ignorer');
        return B(a + '</div></div></div>');
    }
    function ii(a, b) {
        if (C['firebaseui.auth.soy2.page.anonymousUserMismatch'])
            return C['firebaseui.auth.soy2.page.anonymousUserMismatch'](a, b);
        a =
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-anonymous-user-mismatch"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Session termin\u00e9e</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">La session associ\u00e9e \u00e0 cette demande de connexion a expir\u00e9 ou a \u00e9t\u00e9 effac\u00e9e.</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
            Xg(b, 'Ignorer');
        return B(a + '</div></div></div>');
    }
    function ji(a, b) {
        if (C['firebaseui.auth.soy2.page.passwordLinking']) return C['firebaseui.auth.soy2.page.passwordLinking'](a, b);
        var c = D('string' === typeof a.email, 'email', a.email, 'string');
        var d =
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-linking"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter</h1></div><div class="firebaseui-card-content"><h2 class="firebaseui-subtitle">Vous avez d\u00e9j\u00e0 un compte</h2><p class="firebaseui-text">';
        c =
            "Vous avez d\u00e9j\u00e0 utilis\u00e9 l'adresse <strong>" +
            z(c) +
            '</strong> pour vous connecter. Saisissez le mot de passe pour ce compte.';
        d =
            d +
            c +
            ('</p>' +
                Vg(b) +
                '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">' +
                Wg(b) +
                '</div><div class="firebaseui-form-actions">' +
                Rg(b) +
                '</div></div><div class="firebaseui-card-footer">' +
                Yg(a, b) +
                '</div></form></div>');
        return B(d);
    }
    function ki(a, b) {
        if (C['firebaseui.auth.soy2.page.emailLinkSignInLinking'])
            return C['firebaseui.auth.soy2.page.emailLinkSignInLinking'](a, b);
        var c = D('string' === typeof a.email, 'email', a.email, 'string');
        D(
            null == a.T || t(a.T),
            'providerConfig',
            a.T,
            'null|undefined|{providerId: (null|string|undefined), providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}'
        );
        var d = '',
            e = '' + fh(a, b);
        d +=
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-linking"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter</h1></div><div class="firebaseui-card-content"><h2 class="firebaseui-subtitle">Vous avez d\u00e9j\u00e0 un compte</h2><p class="firebaseui-text firebaseui-text-justify">';
        c =
            'Vous avez d\u00e9j\u00e0 utilis\u00e9 <strong>' +
            z(c) +
            '</strong>. Vous pouvez associer votre compte <strong>' +
            z(e) +
            '</strong> \u00e0 <strong>' +
            z(c) +
            '</strong> en vous connectant via le lien envoy\u00e9 par e-mail ci-dessous.';
        d = d + c + '<p class="firebaseui-text firebaseui-text-justify">';
        e =
            'Pour associer votre compte ' +
            z(e) +
            ' \u00e0 cette adresse e-mail, vous devez ouvrir le lien sur le m\u00eame appareil ou dans le m\u00eame navigateur.';
        d =
            d +
            e +
            ('</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
                Rg(b) +
                '</div></div><div class="firebaseui-card-footer">' +
                Yg(a, b) +
                '</div></form></div>');
        return B(d);
    }
    function li(a, b) {
        if (C['firebaseui.auth.soy2.page.emailLinkSignInLinkingDifferentDevice'])
            return C['firebaseui.auth.soy2.page.emailLinkSignInLinkingDifferentDevice'](a, b);
        a = a || {};
        D(
            null == a.T || t(a.T),
            'providerConfig',
            a.T,
            'null|undefined|{providerId: (null|string|undefined), providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}'
        );
        var c = '',
            d = '' + fh(a, b);
        c +=
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-link-sign-in-linking-different-device"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text firebaseui-text-justify">';
        var e =
            "Vous aviez d\u00e9cid\u00e9 d'associer votre compte <strong>" +
            z(d) +
            '</strong> \u00e0 votre adresse e-mail, mais vous avez ouvert le lien sur un appareil diff\u00e9rent de celui avec lequel vous vous \u00eates connect\u00e9.';
        c = c + e + '</p><p class="firebaseui-text firebaseui-text-justify">';
        d =
            'Si vous souhaitez toujours associer votre compte <strong>' +
            z(d) +
            '</strong>, ouvrez le lien sur l\'appareil avec lequel vous avez commenc\u00e9 \u00e0 vous connecter. Sinon, appuyez sur "Continuer" pour vous connecter depuis un autre appareil.';
        c =
            c +
            d +
            ('</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
                Tg(b) +
                '</div></div><div class="firebaseui-card-footer">' +
                Yg(a, b) +
                '</div></form></div>');
        return B(c);
    }
    function mi(a, b) {
        if (C['firebaseui.auth.soy2.page.federatedLinking'])
            return C['firebaseui.auth.soy2.page.federatedLinking'](a, b);
        var c = D('string' === typeof a.email, 'email', a.email, 'string');
        D(
            null == a.T || t(a.T),
            'providerConfig',
            a.T,
            'null|undefined|{providerId: (null|string|undefined), providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}'
        );
        var d = '',
            e = '' + fh(a, b);
        d +=
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-federated-linking"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter</h1></div><div class="firebaseui-card-content"><h2 class="firebaseui-subtitle">Vous avez d\u00e9j\u00e0 un compte</h2><p class="firebaseui-text">';
        c =
            "Vous avez d\u00e9j\u00e0 utilis\u00e9 l'adresse <strong>" +
            z(c) +
            '</strong>. Connectez-vous avec ' +
            z(e) +
            ' pour continuer.';
        d =
            d +
            c +
            '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
            Qg(b, 'Se connecter avec ' + e);
        d += '</div></div><div class="firebaseui-card-footer">' + Yg(a, b) + '</div></form></div>';
        return B(d);
    }
    function ni(a, b) {
        if (C['firebaseui.auth.soy2.page.unauthorizedUser'])
            return C['firebaseui.auth.soy2.page.unauthorizedUser'](a, b);
        a = a || {};
        var c = D(null == a.me || 'string' === typeof a.me, 'userIdentifier', a.me, 'null|string|undefined'),
            d = D(null == a.od || 'string' === typeof a.od, 'adminEmail', a.od, 'null|string|undefined'),
            e = D(null == a.zd || 'boolean' === typeof a.zd, 'displayHelpLink', a.zd, 'boolean|null|undefined');
        var f =
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-unauthorized-user"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Non autoris\u00e9</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
        c
            ? ((c = '<strong>' + z(c) + "</strong> n'est pas autoris\u00e9 \u00e0 voir la page demand\u00e9e."),
              (f += c))
            : (f += 'User is not authorized to view the requested page.');
        f += '</p>';
        d &&
            ((f += '<p class="firebaseui-text firebaseui-id-unauthorized-user-admin-email">'),
            (d = 'Veuillez contacter <strong>' + z(d) + "</strong> pour obtenir l'autorisation."),
            (f = f + d + '</p>'));
        f += '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-links">';
        e &&
            (f +=
                '<a class="firebaseui-link firebaseui-id-unauthorized-user-help-link" href="javascript:void(0)" target="_blank">En savoir plus</a>');
        f = f + '</div><div class="firebaseui-form-actions">' + Xg(b, 'Retour');
        f += '</div></div><div class="firebaseui-card-footer">' + Yg(a, b) + '</div></form></div>';
        return B(f);
    }
    function oi(a, b) {
        if (C['firebaseui.auth.soy2.page.unsupportedProvider'])
            return C['firebaseui.auth.soy2.page.unsupportedProvider'](a, b);
        var c = D('string' === typeof a.email, 'email', a.email, 'string');
        var d =
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-unsupported-provider"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
        c =
            "Pour vous connecter avec l'adresse e-mail <strong>" +
            z(c) +
            '</strong> sur cet appareil, vous devez r\u00e9cup\u00e9rer votre mot de passe.';
        d = d + c + ('</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + Xg(b));
        d += Qg(b, 'R\u00e9cup\u00e9rer votre mot de passe');
        d += '</div></div><div class="firebaseui-card-footer">' + Yg(a, b) + '</div></form></div>';
        return B(d);
    }
    function pi(a, b) {
        if (C['firebaseui.auth.soy2.page.passwordReset']) return C['firebaseui.auth.soy2.page.passwordReset'](a, b);
        var c = D('string' === typeof a.email, 'email', a.email, 'string');
        var d =
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-reset"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">R\u00e9initialiser votre mot de passe</h1></div><div class="firebaseui-card-content">';
        c = '<p class="firebaseui-text">pour <strong>' + z(c) + '</strong></p>';
        d += c;
        c = { label: 'Nouveau mot de passe' };
        for (var e in a) e in c || (c[e] = a[e]);
        a = c || {};
        a = Ug(b, a.label);
        d =
            d +
            a +
            ('</div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
                Sg(b) +
                '</div></div></form></div>');
        return B(d);
    }
    function qi(a, b) {
        a = a || {};
        a = a.C;
        C['firebaseui.auth.soy2.page.passwordResetSuccess']
            ? (b = C['firebaseui.auth.soy2.page.passwordResetSuccess']({ C: a }, b))
            : (D(null == a || 'boolean' === typeof a, 'allowContinue', a, 'boolean|null|undefined'),
              (b =
                  '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-reset-success"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Le mot de passe a bien \u00e9t\u00e9 modifi\u00e9</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Vous pouvez maintenant vous connecter avec votre nouveau mot de passe</p></div><div class="firebaseui-card-actions">' +
                  ((a ? '<div class="firebaseui-form-actions">' + Tg(b) + '</div>' : '') + '</div></div>')),
              (b = B(b)));
        return b;
    }
    function ri(a, b) {
        a = a || {};
        a = a.C;
        C['firebaseui.auth.soy2.page.passwordResetFailure']
            ? (b = C['firebaseui.auth.soy2.page.passwordResetFailure']({ C: a }, b))
            : (D(null == a || 'boolean' === typeof a, 'allowContinue', a, 'boolean|null|undefined'),
              (b =
                  '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-password-reset-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Essayez de r\u00e9initialiser votre mot de passe</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Votre demande de r\u00e9initialisation du mot de passe a expir\u00e9 ou ce lien a d\u00e9j\u00e0 \u00e9t\u00e9 utilis\u00e9</p></div><div class="firebaseui-card-actions">' +
                  ((a ? '<div class="firebaseui-form-actions">' + Tg(b) + '</div>' : '') + '</div></div>')),
              (b = B(b)));
        return b;
    }
    function si(a, b) {
        var c = a.email;
        a = a.C;
        if (C['firebaseui.auth.soy2.page.emailChangeRevokeSuccess'])
            b = C['firebaseui.auth.soy2.page.emailChangeRevokeSuccess']({ email: c, C: a }, b);
        else {
            D('string' === typeof c, 'email', c, 'string');
            D(null == a || 'boolean' === typeof a, 'allowContinue', a, 'boolean|null|undefined');
            var d =
                '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-change-revoke-success"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">L\'adresse e-mail a bien \u00e9t\u00e9 mise \u00e0 jour</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
            c = 'Votre adresse e-mail de connexion est de nouveau la suivante\u00a0: <strong>' + z(c) + '</strong>.';
            d =
                d +
                c +
                '</p><p class="firebaseui-text">Si vous n\'avez pas demand\u00e9 \u00e0 modifier l\'adresse de connexion, il se peut que quelqu\'un tente d\'acc\u00e9der \u00e0 votre compte. Vous devriez <a class="firebaseui-link firebaseui-id-reset-password-link" href="javascript:void(0)">modifier imm\u00e9diatement votre mot de passe</a>.';
            d +=
                '</p></div><div class="firebaseui-card-actions">' +
                (a ? '<div class="firebaseui-form-actions">' + Tg(b) + '</div>' : '') +
                '</div></form></div>';
            b = B(d);
        }
        return b;
    }
    function ti(a, b) {
        a = a || {};
        a = a.C;
        C['firebaseui.auth.soy2.page.emailChangeRevokeFailure']
            ? (b = C['firebaseui.auth.soy2.page.emailChangeRevokeFailure']({ C: a }, b))
            : (D(null == a || 'boolean' === typeof a, 'allowContinue', a, 'boolean|null|undefined'),
              (b =
                  '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-change-revoke-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Impossible de mettre \u00e0 jour votre adresse e-mail</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Un probl\u00e8me est survenu lors du r\u00e9tablissement de votre adresse e-mail de connexion.</p><p class="firebaseui-text">Si l\'op\u00e9ration \u00e9choue \u00e0 nouveau lors de votre prochaine tentative, contactez votre administrateur.</p></div><div class="firebaseui-card-actions">' +
                  ((a ? '<div class="firebaseui-form-actions">' + Tg(b) + '</div>' : '') + '</div></div>')),
              (b = B(b)));
        return b;
    }
    function ui(a, b) {
        a = a || {};
        a = a.C;
        C['firebaseui.auth.soy2.page.emailVerificationSuccess']
            ? (b = C['firebaseui.auth.soy2.page.emailVerificationSuccess']({ C: a }, b))
            : (D(null == a || 'boolean' === typeof a, 'allowContinue', a, 'boolean|null|undefined'),
              (b =
                  '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-verification-success"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Votre adresse e-mail a bien \u00e9t\u00e9 valid\u00e9e</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Vous pouvez maintenant vous connecter avec votre nouveau compte</p></div><div class="firebaseui-card-actions">' +
                  ((a ? '<div class="firebaseui-form-actions">' + Tg(b) + '</div>' : '') + '</div></div>')),
              (b = B(b)));
        return b;
    }
    function vi(a, b) {
        a = a || {};
        a = a.C;
        C['firebaseui.auth.soy2.page.emailVerificationFailure']
            ? (b = C['firebaseui.auth.soy2.page.emailVerificationFailure']({ C: a }, b))
            : (D(null == a || 'boolean' === typeof a, 'allowContinue', a, 'boolean|null|undefined'),
              (b =
                  '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-verification-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Essayez de valider \u00e0 nouveau votre adresse e-mail</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Votre demande de validation de l\'adresse e-mail a expir\u00e9, ou ce lien a d\u00e9j\u00e0 \u00e9t\u00e9 utilis\u00e9</p></div><div class="firebaseui-card-actions">' +
                  ((a ? '<div class="firebaseui-form-actions">' + Tg(b) + '</div>' : '') + '</div></div>')),
              (b = B(b)));
        return b;
    }
    function wi(a, b) {
        var c = a.email;
        a = a.C;
        if (C['firebaseui.auth.soy2.page.verifyAndChangeEmailSuccess'])
            b = C['firebaseui.auth.soy2.page.verifyAndChangeEmailSuccess']({ email: c, C: a }, b);
        else {
            D('string' === typeof c, 'email', c, 'string');
            D(null == a || 'boolean' === typeof a, 'allowContinue', a, 'boolean|null|undefined');
            var d =
                '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-verify-and-change-email-success"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Votre adresse e-mail a \u00e9t\u00e9 valid\u00e9e et modifi\u00e9e</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
            c =
                'Vous pouvez maintenant vous connecter avec votre nouvelle adresse e-mail\u00a0: <strong>' +
                z(c) +
                '</strong>.';
            d =
                d +
                c +
                ('</p></div><div class="firebaseui-card-actions">' +
                    (a ? '<div class="firebaseui-form-actions">' + Tg(b) + '</div>' : '') +
                    '</div></div>');
            b = B(d);
        }
        return b;
    }
    function xi(a, b) {
        a = a || {};
        a = a.C;
        C['firebaseui.auth.soy2.page.verifyAndChangeEmailFailure']
            ? (b = C['firebaseui.auth.soy2.page.verifyAndChangeEmailFailure']({ C: a }, b))
            : (D(null == a || 'boolean' === typeof a, 'allowContinue', a, 'boolean|null|undefined'),
              (b =
                  '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-verify-and-change-email-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Essayez de modifier \u00e0 nouveau votre adresse e-mail</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Votre demande de validation et de modification de l\'adresse e-mail a expir\u00e9, ou ce lien a d\u00e9j\u00e0 \u00e9t\u00e9 utilis\u00e9.</p></div><div class="firebaseui-card-actions">' +
                  ((a ? '<div class="firebaseui-form-actions">' + Tg(b) + '</div>' : '') + '</div></div>')),
              (b = B(b)));
        return b;
    }
    function yi(a, b) {
        var c = a.factorId,
            d = a.phoneNumber;
        a = a.C;
        if (C['firebaseui.auth.soy2.page.revertSecondFactorAdditionSuccess'])
            b = C['firebaseui.auth.soy2.page.revertSecondFactorAdditionSuccess'](
                { factorId: c, phoneNumber: d, C: a },
                b
            );
        else {
            D('string' === typeof c, 'factorId', c, 'string');
            D(null == d || 'string' === typeof d, 'phoneNumber', d, 'null|string|undefined');
            D(null == a || 'boolean' === typeof a, 'allowContinue', a, 'boolean|null|undefined');
            var e =
                '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-revert-second-factor-addition-success"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Deuxi\u00e8me facteur supprim\u00e9</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
            switch (t(c) ? c.toString() : c) {
                case 'phone':
                    c =
                        "Le facteur suivant de la deuxi\u00e8me \u00e9tape d'authentification a \u00e9t\u00e9 supprim\u00e9\u00a0: <strong>" +
                        z(c) +
                        ' ' +
                        z(d) +
                        '</strong>.';
                    e += c;
                    break;
                default:
                    e +=
                        "L'application ou l'appareil qui servait de deuxi\u00e8me \u00e9tape d'authentification a \u00e9t\u00e9 supprim\u00e9.";
            }
            e =
                e +
                '</p><p class="firebaseui-text">Si vous ne reconnaissez pas cet appareil, cela signifie peut-\u00eatre que quelqu\'un essaie d\'acc\u00e9der \u00e0 votre compte. Envisagez de <a class="firebaseui-link firebaseui-id-reset-password-link" href="javascript:void(0)">modifier votre mot de passe tout de suite</a>.</p></div><div class="firebaseui-card-actions">' +
                ((a ? '<div class="firebaseui-form-actions">' + Tg(b) + '</div>' : '') + '</div></form></div>');
            b = B(e);
        }
        return b;
    }
    function zi(a, b) {
        a = a || {};
        a = a.C;
        C['firebaseui.auth.soy2.page.revertSecondFactorAdditionFailure']
            ? (b = C['firebaseui.auth.soy2.page.revertSecondFactorAdditionFailure']({ C: a }, b))
            : (D(null == a || 'boolean' === typeof a, 'allowContinue', a, 'boolean|null|undefined'),
              (b =
                  '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-revert-second-factor-addition-failure"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Impossible de supprimer votre deuxi\u00e8me facteur</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Une erreur s\'est produite lors de la suppression du deuxi\u00e8me facteur.</p><p class="firebaseui-text">Veuillez r\u00e9essayer. Si le probl\u00e8me persiste, contactez l\'assistance.</p></div><div class="firebaseui-card-actions">' +
                  ((a ? '<div class="firebaseui-form-actions">' + Tg(b) + '</div>' : '') + '</div></div>')),
              (b = B(b)));
        return b;
    }
    function Ai(a, b) {
        var c = a.errorMessage;
        a = a.te;
        C['firebaseui.auth.soy2.page.recoverableError']
            ? (b = C['firebaseui.auth.soy2.page.recoverableError']({ errorMessage: c, te: a }, b))
            : (D('string' === typeof c, 'errorMessage', c, 'string'),
              D(null == a || 'boolean' === typeof a, 'allowRetry', a, 'boolean|null|undefined'),
              (c =
                  '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-recoverable-error"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Une erreur s\'est produite</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' +
                  (z(c) + '</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">')),
              a && (c += Qg(b, 'R\u00e9essayer')),
              (b = B(c + '</div></div></div>')));
        return b;
    }
    function Bi(a, b) {
        a = a.errorMessage;
        C['firebaseui.auth.soy2.page.unrecoverableError']
            ? (b = C['firebaseui.auth.soy2.page.unrecoverableError']({ errorMessage: a }, b))
            : (D('string' === typeof a, 'errorMessage', a, 'string'),
              (b =
                  '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-unrecoverable-error"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Une erreur s\'est produite</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">' +
                  (z(a) + '</p></div></div>')),
              (b = B(b)));
        return b;
    }
    function Ci(a, b) {
        if (C['firebaseui.auth.soy2.page.emailMismatch']) return C['firebaseui.auth.soy2.page.emailMismatch'](a, b);
        var c = D('string' === typeof a.Jf, 'userEmail', a.Jf, 'string'),
            d = D('string' === typeof a.nf, 'pendingEmail', a.nf, 'string');
        var e =
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-email-mismatch"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter</h1></div><div class="firebaseui-card-content"><h2 class="firebaseui-subtitle">';
        c = "Souhaitez-vous continuer avec l'adresse " + z(c) + '\u00a0?';
        e = e + c + '</h2><p class="firebaseui-text">';
        d = "Initialement, vous souhaitiez vous connecter avec l'adresse " + z(d);
        e = e + d + ('</p></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + Xg(b));
        e += Qg(b, 'Continuer');
        e += '</div></div><div class="firebaseui-card-footer">' + Yg(a, b) + '</div></form></div>';
        return B(e);
    }
    function Di(a, b) {
        if (C['firebaseui.auth.soy2.page.providerSignIn']) return C['firebaseui.auth.soy2.page.providerSignIn'](a, b);
        for (
            var c = D(
                    Array.isArray(a.qf),
                    'providerConfigs',
                    a.qf,
                    '!Array<{providerId: string, providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}>'
                ),
                d =
                    '<div class="firebaseui-container firebaseui-page-provider-sign-in firebaseui-id-page-provider-sign-in firebaseui-use-spinner"><div class="firebaseui-card-content"><form onsubmit="return false;"><ul class="firebaseui-idp-list">',
                e = c.length,
                f = 0;
            f < e;
            f++
        ) {
            var g = { T: c[f] },
                h = b;
            if (C['firebaseui.auth.soy2.element.idpButton']) var n = C['firebaseui.auth.soy2.element.idpButton'](g, h);
            else {
                g = g || {};
                n = D(
                    null == g.T || t(g.T),
                    'providerConfig',
                    g.T,
                    'null|undefined|{providerId: string, providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}'
                );
                var p = (p = g) || {};
                var m = p.T;
                if (C['firebaseui.auth.soy2.element.idpClass_'])
                    p = C['firebaseui.auth.soy2.element.idpClass_']({ T: m }, h);
                else
                    switch (
                        (D(
                            null == m || t(m),
                            'providerConfig',
                            m,
                            'null|undefined|{providerId: string, providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}'
                        ),
                        (p = ''),
                        (m = m.providerId),
                        t(m) ? m.toString() : m)
                    ) {
                        case 'google.com':
                            p += 'firebaseui-idp-google';
                            break;
                        case 'github.com':
                            p += 'firebaseui-idp-github';
                            break;
                        case 'facebook.com':
                            p += 'firebaseui-idp-facebook';
                            break;
                        case 'twitter.com':
                            p += 'firebaseui-idp-twitter';
                            break;
                        case 'phone':
                            p += 'firebaseui-idp-phone';
                            break;
                        case 'anonymous':
                            p += 'firebaseui-idp-anonymous';
                            break;
                        case 'password':
                            p += 'firebaseui-idp-password';
                            break;
                        default:
                            p += 'firebaseui-idp-generic';
                    }
                p =
                    '<button class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised ' +
                    qd(p) +
                    ' firebaseui-id-idp-button" data-provider-id="' +
                    qd(n.providerId) +
                    '" style="background-color:';
                var q = g;
                m = h;
                q = q || {};
                q = q.T;
                C['firebaseui.auth.soy2.element.idpColor_']
                    ? (m = C['firebaseui.auth.soy2.element.idpColor_']({ T: q }, m))
                    : (D(
                          null == q || t(q),
                          'providerConfig',
                          q,
                          'null|undefined|{providerId: string, providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}'
                      ),
                      (m = m.wg),
                      (m = q.Rb
                          ? '' + q.Rb
                          : m[q.providerId]
                          ? '' + m[q.providerId]
                          : 0 == ('' + q.providerId).indexOf('saml.')
                          ? '' + m.saml
                          : 0 == ('' + q.providerId).indexOf('oidc.')
                          ? '' + m.oidc
                          : '' + m.password));
                p =
                    p +
                    qd(Bd(m)) +
                    '"><span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="';
                q = g;
                m = h;
                q = q || {};
                q = q.T;
                C['firebaseui.auth.soy2.element.idpLogo_']
                    ? (m = C['firebaseui.auth.soy2.element.idpLogo_']({ T: q }, m))
                    : (D(
                          null == q || t(q),
                          'providerConfig',
                          q,
                          'null|undefined|{providerId: string, providerName: (null|string|undefined), fullLabel: (null|string|undefined), buttonColor: (null|string|undefined), iconUrl: (null|string|undefined),}'
                      ),
                      (m = m.xg),
                      (m = q.$b
                          ? ud(q.$b)
                          : m[q.providerId]
                          ? ud(m[q.providerId])
                          : 0 == ('' + q.providerId).indexOf('saml.')
                          ? ud(m.saml)
                          : 0 == ('' + q.providerId).indexOf('oidc.')
                          ? ud(m.oidc)
                          : ud(m.password)),
                      (m = md(m)));
                p = p + qd(zd(m)) + '"></span>';
                'password' == n.providerId
                    ? ((p += '<span class="firebaseui-idp-text firebaseui-idp-text-long">'),
                      n.va
                          ? (p += z(n.va))
                          : n.na
                          ? ((g = 'Se connecter avec ' + z(fh(g, h))), (p += g))
                          : (p += 'Se connecter avec une adresse e-mail'),
                      (p += '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">'),
                      (p = n.na ? p + z(n.na) : p + 'E-mail'),
                      (p += '</span>'))
                    : 'phone' == n.providerId
                    ? ((p += '<span class="firebaseui-idp-text firebaseui-idp-text-long">'),
                      n.va
                          ? (p += z(n.va))
                          : n.na
                          ? ((g = 'Se connecter avec ' + z(fh(g, h))), (p += g))
                          : (p += 'Se connecter avec un t\u00e9l\u00e9phone'),
                      (p += '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">'),
                      (p = n.na ? p + z(n.na) : p + 'T\u00e9l\u00e9phone'),
                      (p += '</span>'))
                    : 'anonymous' == n.providerId
                    ? ((p += '<span class="firebaseui-idp-text firebaseui-idp-text-long">'),
                      n.va
                          ? (p += z(n.va))
                          : n.na
                          ? ((g = 'Se connecter avec ' + z(fh(g, h))), (p += g))
                          : (p += "Continuer en tant qu'invit\u00e9"),
                      (p += '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">'),
                      (p = n.na ? p + z(n.na) : p + 'Invit\u00e9'),
                      (p += '</span>'))
                    : ((p += '<span class="firebaseui-idp-text firebaseui-idp-text-long">'),
                      n.va ? (p += z(n.va)) : ((m = 'Se connecter avec ' + z(fh(g, h))), (p += m)),
                      (p +=
                          '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">' +
                          (n.na ? z(n.na) : z(fh(g, h))) +
                          '</span>'));
                n = B(p + '</button>');
            }
            d += '<li class="firebaseui-list-item">' + n + '</li>';
        }
        d +=
            '</ul></form></div><div class="firebaseui-card-footer firebaseui-provider-sign-in-footer">' +
            Zg(a, b) +
            '</div></div>';
        return B(d);
    }
    function Ei(a, b) {
        if (C['firebaseui.auth.soy2.page.phoneSignInStart'])
            return C['firebaseui.auth.soy2.page.phoneSignInStart'](a, b);
        a = a || {};
        D(null == a.Xa || 'string' === typeof a.Xa, 'nationalNumber', a.Xa, 'null|string|undefined');
        var c = D(null == a.Ad || 'boolean' === typeof a.Ad, 'enableVisibleRecaptcha', a.Ad, 'boolean|null|undefined'),
            d = D(null == a.lb || 'boolean' === typeof a.lb, 'displayCancelButton', a.lb, 'boolean|null|undefined'),
            e = D(null == a.ga || 'boolean' === typeof a.ga, 'displayFullTosPpMessage', a.ga, 'boolean|null|undefined'),
            f =
                '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-start"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Saisissez votre num\u00e9ro de t\u00e9l\u00e9phone';
        var g = a || {};
        g = g.Xa;
        C['firebaseui.auth.soy2.element.phoneNumber']
            ? (g = C['firebaseui.auth.soy2.element.phoneNumber']({ Xa: g }, b))
            : (D(null == g || 'string' === typeof g, 'nationalNumber', g, 'null|string|undefined'),
              (g =
                  '<div class="firebaseui-phone-number"><button class="firebaseui-id-country-selector firebaseui-country-selector mdl-button mdl-js-button"><span class="firebaseui-flag firebaseui-country-selector-flag firebaseui-id-country-selector-flag"></span><span class="firebaseui-id-country-selector-code"></span></button><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label firebaseui-textfield firebaseui-phone-input-wrapper"><label class="mdl-textfield__label firebaseui-label" for="phoneNumber">Num\u00e9ro de t\u00e9l\u00e9phone</label><input type="tel" name="phoneNumber" class="mdl-textfield__input firebaseui-input firebaseui-id-phone-number" value="' +
                  (qd(null != g ? g : '') +
                      '"></div></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-phone-number-error firebaseui-id-phone-number-error"></p></div>')),
              (g = B(g)));
        g = '</h1></div><div class="firebaseui-card-content"><div class="firebaseui-relative-wrapper">' + g;
        c = c
            ? C['firebaseui.auth.soy2.element.recaptcha']
                ? C['firebaseui.auth.soy2.element.recaptcha'](null, b)
                : B(
                      '<div class="firebaseui-recaptcha-wrapper"><div class="firebaseui-recaptcha-container"></div><div class="firebaseui-error-wrapper firebaseui-recaptcha-error-wrapper"><p class="firebaseui-error firebaseui-hidden firebaseui-id-recaptcha-error"></p></div></div>'
                  )
            : '';
        d =
            f +
            (g +
                c +
                '</div></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
                (d ? Xg(b) : ''));
        d += Qg(b, 'Valider');
        e
            ? C['firebaseui.auth.soy2.element.phoneTosPp']
                ? (b = C['firebaseui.auth.soy2.element.phoneTosPp'](a, b))
                : ((a = b.O),
                  (e = '<p class="firebaseui-tos firebaseui-phone-tos">'),
                  (e =
                      nd(b.R) && nd(a)
                          ? e +
                            'En appuyant sur "Valider", vous acceptez les <a href="javascript:void(0)" class="firebaseui-link firebaseui-tos-link" target="_blank">Conditions d\'utilisation</a> et les <a href="javascript:void(0)" class="firebaseui-link firebaseui-pp-link" target="_blank">R\u00e8gles de confidentialit\u00e9</a>. Vous d\u00e9clencherez peut-\u00eatre l\'envoi d\'un SMS. Des frais de messages et de donn\u00e9es peuvent \u00eatre factur\u00e9s.'
                          : e +
                            'En appuyant sur "Valider", vous d\u00e9clencherez peut-\u00eatre l\'envoi d\'un SMS. Des frais de messages et de donn\u00e9es peuvent \u00eatre factur\u00e9s.'),
                  (b = B(e + '</p>')))
            : ((e = C['firebaseui.auth.soy2.element.phoneAuthSmsNotice']
                  ? C['firebaseui.auth.soy2.element.phoneAuthSmsNotice'](null, b)
                  : B(
                        '<p class="firebaseui-tos firebaseui-phone-sms-notice">En appuyant sur "Valider", vous d\u00e9clencherez peut-\u00eatre l\'envoi d\'un SMS. Des frais de messages et de donn\u00e9es peuvent \u00eatre factur\u00e9s.</p>'
                    )),
              (b = e + Yg(a, b)));
        return B(d + ('</div></div><div class="firebaseui-card-footer">' + b + '</div></form></div>'));
    }
    function Fi(a, b) {
        if (C['firebaseui.auth.soy2.page.phoneSignInFinish'])
            return C['firebaseui.auth.soy2.page.phoneSignInFinish'](a, b);
        a = a || {};
        var c = D(
            null == a.phoneNumber || 'string' === typeof a.phoneNumber,
            'phoneNumber',
            a.phoneNumber,
            'null|string|undefined'
        );
        var d =
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-phone-sign-in-finish"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Validez votre num\u00e9ro de t\u00e9l\u00e9phone</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">';
        var e =
            'Saisissez le code \u00e0 six\u00a0chiffres envoy\u00e9 au <a class="firebaseui-link firebaseui-change-phone-number-link firebaseui-id-change-phone-number-link" href="javascript:void(0)">&lrm;' +
            z(c) +
            '</a>';
        z(c);
        c = d + e;
        d = C['firebaseui.auth.soy2.element.phoneConfirmationCode']
            ? C['firebaseui.auth.soy2.element.phoneConfirmationCode'](null, b)
            : B(
                  '<div class="firebaseui-textfield mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><label class="mdl-textfield__label firebaseui-label" for="phoneConfirmationCode">Code \u00e0 six\u00a0chiffres</label><input type="number" name="phoneConfirmationCode" class="mdl-textfield__input firebaseui-input firebaseui-id-phone-confirmation-code"></div><div class="firebaseui-error-wrapper"><p class="firebaseui-error firebaseui-text-input-error firebaseui-hidden firebaseui-id-phone-confirmation-code-error"></p></div>'
              );
        d =
            c +
            ('</p>' + d + '</div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' + Xg(b));
        c = d += Qg(b, 'Continuer');
        a = '</div></div><div class="firebaseui-card-footer">' + Yg(a, b) + '</div></form>';
        b = C['firebaseui.auth.soy2.element.resend']
            ? C['firebaseui.auth.soy2.element.resend'](null, b)
            : B(
                  '<div class="firebaseui-resend-container"><span class="firebaseui-id-resend-countdown"></span><a href="javascript:void(0)" class="firebaseui-id-resend-link firebaseui-hidden firebaseui-link">Renvoyer</a></div>'
              );
        return B(c + (a + b + '</div>'));
    }
    function Gi(a, b) {
        return C['firebaseui.auth.soy2.page.signOut']
            ? C['firebaseui.auth.soy2.page.signOut'](a, b)
            : B(
                  '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-sign-out"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se d\u00e9connecter</h1></div><div class="firebaseui-card-content"><p class="firebaseui-text">Vous avez bien \u00e9t\u00e9 d\u00e9connect\u00e9.</p></div></div>'
              );
    }
    function Hi(a, b) {
        if (C['firebaseui.auth.soy2.page.selectTenant']) return C['firebaseui.auth.soy2.page.selectTenant'](a, b);
        for (
            var c = D(
                    Array.isArray(a.yf),
                    'tenantConfigs',
                    a.yf,
                    '!Array<{tenantId: (null|string|undefined), fullLabel: (null|string|undefined), displayName: string, buttonColor: string, iconUrl: string,}>'
                ),
                d =
                    '<div class="firebaseui-container firebaseui-page-select-tenant firebaseui-id-page-select-tenant"><div class="firebaseui-card-content"><form onsubmit="return false;"><ul class="firebaseui-tenant-list">',
                e = c.length,
                f = 0;
            f < e;
            f++
        ) {
            var g = c[f];
            if (C['firebaseui.auth.soy2.element.tenantSelectionButton'])
                var h = C['firebaseui.auth.soy2.element.tenantSelectionButton']({ xi: g }, b);
            else {
                D(
                    t(g),
                    'tenantConfig',
                    g,
                    '{tenantId: (null|string|undefined), fullLabel: (null|string|undefined), displayName: string, buttonColor: string, iconUrl: string,}'
                );
                h =
                    '<button class="firebaseui-tenant-button mdl-button mdl-js-button mdl-button--raised firebaseui-tenant-selection-' +
                    qd(g.tenantId ? '' + g.tenantId : 'top-level-project') +
                    ' firebaseui-id-tenant-selection-button"' +
                    (g.tenantId ? ' data-tenant-id="' + qd(g.tenantId) + '"' : '') +
                    ' style="background-color:' +
                    qd(Bd(g.Rb)) +
                    '"><span class="firebaseui-idp-icon-wrapper"><img class="firebaseui-idp-icon" alt="" src="' +
                    qd(zd(g.$b)) +
                    '"></span><span class="firebaseui-idp-text firebaseui-idp-text-long">';
                if (g.va) h += z(g.va);
                else {
                    var n = 'Se connecter \u00e0 ' + z(g.displayName);
                    h += n;
                }
                h += '</span><span class="firebaseui-idp-text firebaseui-idp-text-short">';
                g = z(g.displayName);
                h = h + g + '</span></button>';
                h = B(h);
            }
            d += '<li class="firebaseui-list-item">' + h + '</li>';
        }
        d +=
            '</ul></form></div><div class="firebaseui-card-footer firebaseui-provider-sign-in-footer">' +
            Zg(a, b) +
            '</div></div>';
        return B(d);
    }
    function Ii(a, b) {
        if (C['firebaseui.auth.soy2.page.providerMatchByEmail'])
            return C['firebaseui.auth.soy2.page.providerMatchByEmail'](a, b);
        a = a || {};
        a =
            '<div class="mdl-card mdl-shadow--2dp firebaseui-container firebaseui-id-page-provider-match-by-email"><form onsubmit="return false;"><div class="firebaseui-card-header"><h1 class="firebaseui-title">Se connecter</h1></div><div class="firebaseui-card-content"><div class="firebaseui-relative-wrapper">' +
            (Pg(b) +
                '</div></div><div class="firebaseui-card-actions"><div class="firebaseui-form-actions">' +
                Qg(b) +
                '</div></div><div class="firebaseui-card-footer">' +
                Zg(a, b) +
                '</div></form></div>');
        return B(a);
    }
    function Ji(a, b) {
        L.call(this, ii, void 0, b, 'anonymousUserMismatch');
        this.fc = a;
    }
    l(Ji, L);
    Ji.prototype.s = function () {
        var a = this;
        I(this, this.J(), function () {
            a.fc();
        });
        this.J().focus();
        L.prototype.s.call(this);
    };
    Ji.prototype.m = function () {
        this.fc = null;
        L.prototype.m.call(this);
    };
    Object.assign(Ji.prototype, { J: K });
    function Ki(a) {
        L.call(this, di, void 0, a, 'blank');
    }
    l(Ki, L);
    function Li(a) {
        L.call(this, bi, void 0, a, 'callback');
    }
    l(Li, L);
    Li.prototype.aa = function (a, b, c, d) {
        return a.apply(null, b).then(c, d);
    };
    function Mi(a, b) {
        L.call(this, hi, void 0, b, 'differentDeviceError');
        this.fc = a;
    }
    l(Mi, L);
    Mi.prototype.s = function () {
        var a = this;
        I(this, this.J(), function () {
            a.fc();
        });
        this.J().focus();
        L.prototype.s.call(this);
    };
    Mi.prototype.m = function () {
        this.fc = null;
        L.prototype.m.call(this);
    };
    Object.assign(Mi.prototype, { J: K });
    function Ni(a, b, c, d) {
        L.call(this, si, { email: a, C: !!c }, d, 'emailChangeRevoke');
        this.jc = b;
        this.da = c || null;
    }
    l(Ni, L);
    Ni.prototype.s = function () {
        var a = this;
        I(this, Oi(this), function () {
            a.jc();
        });
        this.da && (this.B(this.da), this.H().focus());
        L.prototype.s.call(this);
    };
    Ni.prototype.m = function () {
        this.jc = this.da = null;
        L.prototype.m.call(this);
    };
    function Oi(a) {
        return a.A('firebaseui-id-reset-password-link');
    }
    Object.assign(Ni.prototype, { H: J, J: K, B: Lg });
    function Pi(a, b) {
        try {
            var c = 'number' == typeof a.selectionStart;
        } catch (d) {
            c = !1;
        }
        c && ((a.selectionStart = b), (a.selectionEnd = b));
    }
    function Qi(a, b, c, d, e, f) {
        L.call(this, gi, { email: c }, f, 'emailLinkSignInConfirmation', { R: d, O: e });
        this.Ha = a;
        this.F = b;
    }
    l(Qi, L);
    Qi.prototype.s = function () {
        this.Fa(this.Ha);
        this.B(this.Ha, this.F);
        this.sa();
        L.prototype.s.call(this);
    };
    Qi.prototype.m = function () {
        this.F = this.Ha = null;
        L.prototype.m.call(this);
    };
    Qi.prototype.sa = function () {
        this.D().focus();
        Pi(this.D(), (this.D().value || '').length);
    };
    Object.assign(Qi.prototype, { D: Fg, eb: Gg, Fa: Hg, getEmail: Jg, ta: Kg, H: J, J: K, B: Lg });
    function Ri(a, b, c, d, e, f) {
        L.call(this, ki, { email: a, T: b }, f, 'emailLinkSignInLinking', { R: d, O: e });
        this.v = c;
    }
    l(Ri, L);
    Ri.prototype.s = function () {
        this.B(this.v);
        this.H().focus();
        L.prototype.s.call(this);
    };
    Ri.prototype.m = function () {
        this.v = null;
        L.prototype.m.call(this);
    };
    Object.assign(Ri.prototype, { H: J, B: Lg });
    function Si(a, b, c, d, e) {
        L.call(this, li, { T: a }, e, 'emailLinkSignInLinkingDifferentDevice', { R: c, O: d });
        this.da = b;
    }
    l(Si, L);
    Si.prototype.s = function () {
        this.B(this.da);
        this.H().focus();
        L.prototype.s.call(this);
    };
    Si.prototype.m = function () {
        this.da = null;
        L.prototype.m.call(this);
    };
    Object.assign(Si.prototype, { H: J, B: Lg });
    function Ti(a, b, c, d, e, f) {
        L.call(this, ei, { email: a }, f, 'emailLinkSignInSent', { R: d, O: e });
        this.lf = b;
        this.F = c;
    }
    l(Ti, L);
    Ti.prototype.s = function () {
        var a = this;
        I(this, this.J(), function () {
            a.F();
        });
        I(this, this.A('firebaseui-id-trouble-getting-email-link'), function () {
            a.lf();
        });
        this.J().focus();
        L.prototype.s.call(this);
    };
    Ti.prototype.m = function () {
        this.F = this.lf = null;
        L.prototype.m.call(this);
    };
    Object.assign(Ti.prototype, { J: K });
    function Ui(a, b, c, d, e, f, g) {
        L.call(this, Ci, { Jf: a, nf: b }, g, 'emailMismatch', { R: e, O: f });
        this.da = c;
        this.F = d;
    }
    l(Ui, L);
    Ui.prototype.s = function () {
        this.B(this.da, this.F);
        this.H().focus();
        L.prototype.s.call(this);
    };
    Ui.prototype.m = function () {
        this.F = this.v = null;
        L.prototype.m.call(this);
    };
    Object.assign(Ui.prototype, { H: J, J: K, B: Lg });
    function Vi(a, b, c, d, e) {
        L.call(this, fi, void 0, e, 'emailNotReceived', { R: c, O: d });
        this.ic = a;
        this.F = b;
    }
    l(Vi, L);
    Vi.prototype.s = function () {
        var a = this;
        I(this, this.J(), function () {
            a.F();
        });
        I(this, this.Hc(), function () {
            a.ic();
        });
        this.J().focus();
        L.prototype.s.call(this);
    };
    Vi.prototype.Hc = function () {
        return this.A('firebaseui-id-resend-email-link');
    };
    Vi.prototype.m = function () {
        this.F = this.ic = null;
        L.prototype.m.call(this);
    };
    Object.assign(Vi.prototype, { J: K });
    function Wi(a, b, c, d, e, f) {
        L.call(this, mi, { email: a, T: b }, f, 'federatedLinking', { R: d, O: e });
        this.v = c;
    }
    l(Wi, L);
    Wi.prototype.s = function () {
        this.B(this.v);
        this.H().focus();
        L.prototype.s.call(this);
    };
    Wi.prototype.m = function () {
        this.v = null;
        L.prototype.m.call(this);
    };
    Object.assign(Wi.prototype, { H: J, B: Lg });
    function N(a, b, c, d, e, f) {
        L.call(this, a, b, d, e || 'notice', f);
        this.da = c || null;
    }
    w(N, L);
    N.prototype.s = function () {
        this.da && (this.B(this.da), this.H().focus());
        N.Z.s.call(this);
    };
    N.prototype.m = function () {
        this.da = null;
        N.Z.m.call(this);
    };
    Object.assign(N.prototype, { H: J, J: K, B: Lg });
    function Xi(a, b, c, d, e) {
        N.call(this, ai, { email: a, C: !!b }, b, e, 'passwordRecoveryEmailSent', { R: c, O: d });
    }
    w(Xi, N);
    function Yi(a, b) {
        N.call(this, ui, { C: !!a }, a, b, 'emailVerificationSuccess');
    }
    w(Yi, N);
    function Zi(a, b) {
        N.call(this, vi, { C: !!a }, a, b, 'emailVerificationFailure');
    }
    w(Zi, N);
    function $i(a, b, c) {
        N.call(this, wi, { email: a, C: !!b }, b, c, 'verifyAndChangeEmailSuccess');
    }
    w($i, N);
    function aj(a, b) {
        N.call(this, xi, { C: !!a }, a, b, 'verifyAndChangeEmailFailure');
    }
    w(aj, N);
    function bj(a, b) {
        N.call(this, zi, { C: !!a }, a, b, 'revertSecondFactorAdditionFailure');
    }
    w(bj, N);
    function cj(a) {
        N.call(this, Gi, void 0, void 0, a, 'signOut');
    }
    w(cj, N);
    function dj(a, b) {
        N.call(this, qi, { C: !!a }, a, b, 'passwordResetSuccess');
    }
    w(dj, N);
    function ej(a, b) {
        N.call(this, ri, { C: !!a }, a, b, 'passwordResetFailure');
    }
    w(ej, N);
    function fj(a, b) {
        N.call(this, ti, { C: !!a }, a, b, 'emailChangeRevokeFailure');
    }
    w(fj, N);
    function gj(a, b, c) {
        N.call(this, Ai, { errorMessage: a, te: !!b }, b, c, 'recoverableError');
    }
    w(gj, N);
    function hj(a, b) {
        N.call(this, Bi, { errorMessage: a }, void 0, b, 'unrecoverableError');
    }
    w(hj, N);
    function ij(a, b, c, d, e, f) {
        L.call(this, ji, { email: a }, f, 'passwordLinking', { R: d, O: e });
        this.v = b;
        this.Vc = c;
    }
    l(ij, L);
    ij.prototype.s = function () {
        this.Od();
        this.B(this.v, this.Vc);
        Wh(this, this.Pa(), this.v);
        this.Pa().focus();
        L.prototype.s.call(this);
    };
    ij.prototype.m = function () {
        this.v = null;
        L.prototype.m.call(this);
    };
    ij.prototype.ta = function () {
        return E(this.A('firebaseui-id-email'));
    };
    Object.assign(ij.prototype, { Pa: th, Gd: uh, Od: vh, vd: wh, H: J, J: K, B: Lg });
    function jj(a, b, c, d, e, f) {
        L.call(this, $h, { email: c, jb: !!b }, f, 'passwordRecovery', { R: d, O: e });
        this.v = a;
        this.F = b;
    }
    l(jj, L);
    jj.prototype.s = function () {
        this.Fa();
        this.B(this.v, this.F);
        E(this.D()) || this.D().focus();
        Wh(this, this.D(), this.v);
        L.prototype.s.call(this);
    };
    jj.prototype.m = function () {
        this.F = this.v = null;
        L.prototype.m.call(this);
    };
    Object.assign(jj.prototype, { D: Fg, eb: Gg, Fa: Hg, getEmail: Jg, ta: Kg, H: J, J: K, B: Lg });
    function kj(a, b, c) {
        L.call(this, pi, { email: a }, c, 'passwordReset');
        this.v = b;
    }
    l(kj, L);
    kj.prototype.s = function () {
        this.Nd();
        this.B(this.v);
        Wh(this, this.Ea(), this.v);
        this.Ea().focus();
        L.prototype.s.call(this);
    };
    kj.prototype.m = function () {
        this.v = null;
        L.prototype.m.call(this);
    };
    Object.assign(kj.prototype, { Ea: nh, Fd: qh, Jg: oh, Nd: rh, ud: sh, H: J, J: K, B: Lg });
    function lj(a, b, c, d, e, f, g) {
        L.call(this, Yh, { email: c, ga: !!f }, g, 'passwordSignIn', { R: d, O: e });
        this.v = a;
        this.Vc = b;
    }
    l(lj, L);
    lj.prototype.s = function () {
        this.Fa();
        this.Od();
        this.B(this.v, this.Vc);
        Vh(this, this.D(), this.Pa());
        Wh(this, this.Pa(), this.v);
        E(this.D()) ? this.Pa().focus() : this.D().focus();
        L.prototype.s.call(this);
    };
    lj.prototype.m = function () {
        this.Vc = this.v = null;
        L.prototype.m.call(this);
    };
    Object.assign(lj.prototype, {
        D: Fg,
        eb: Gg,
        Fa: Hg,
        getEmail: Jg,
        ta: Kg,
        Pa: th,
        Gd: uh,
        Od: vh,
        vd: wh,
        H: J,
        J: K,
        B: Lg
    });
    function mj(a, b, c, d, e, f, g, h, n) {
        L.call(this, Zh, { email: d, $d: a, name: e, jb: !!c, ga: !!h }, n, 'passwordSignUp', { R: f, O: g });
        this.v = b;
        this.F = c;
        this.ae = a;
    }
    l(mj, L);
    mj.prototype.s = function () {
        this.Fa();
        this.ae && this.Tg();
        this.Nd();
        this.B(this.v, this.F);
        this.sa();
        L.prototype.s.call(this);
    };
    mj.prototype.m = function () {
        this.F = this.v = null;
        L.prototype.m.call(this);
    };
    mj.prototype.sa = function () {
        this.ae ? (Vh(this, this.D(), this.Wb()), Vh(this, this.Wb(), this.Ea())) : Vh(this, this.D(), this.Ea());
        this.v && Wh(this, this.Ea(), this.v);
        E(this.D()) ? (this.ae && !E(this.Wb()) ? this.Wb().focus() : this.Ea().focus()) : this.D().focus();
    };
    Object.assign(mj.prototype, {
        D: Fg,
        eb: Gg,
        Fa: Hg,
        getEmail: Jg,
        ta: Kg,
        Wb: lh,
        oi: mh,
        Tg: function () {
            var a = lh.call(this),
                b = mh.call(this);
            eg(this, a, function () {
                kg(b) && (H(a, !0), ig(b));
            });
        },
        og: function () {
            var a = lh.call(this);
            var b = mh.call(this);
            var c = E(a);
            c = !/^[\s\xa0]*$/.test(null == c ? '' : String(c));
            H(a, c);
            c
                ? (ig(b), (b = !0))
                : (jg(
                      b,
                      (C['firebaseui.auth.soy2.strings.errorMissingName']
                          ? C['firebaseui.auth.soy2.strings.errorMissingName'](void 0, void 0)
                          : 'Saisissez le nom de votre compte'
                      ).toString()
                  ),
                  (b = !1));
            return b ? db(E(a)) : null;
        },
        Ea: nh,
        Fd: qh,
        Jg: oh,
        Nd: rh,
        ud: sh,
        H: J,
        J: K,
        B: Lg
    });
    function nj(a, b, c, d, e, f, g, h, n) {
        L.call(this, Fi, { phoneNumber: e }, n, 'phoneSignInFinish', { R: g, O: h });
        this.th = f;
        this.tb = new Kf(1e3);
        this.ce = f;
        this.hf = a;
        this.v = b;
        this.F = c;
        this.ic = d;
    }
    l(nj, L);
    nj.prototype.s = function () {
        var a = this;
        this.Df(this.th);
        Fe(this.tb, 'tick', this.Kd, !1, this);
        this.tb.start();
        I(this, this.A('firebaseui-id-change-phone-number-link'), function () {
            a.hf();
        });
        I(this, this.Hc(), function () {
            a.ic();
        });
        this.Ug(this.v);
        this.B(this.v, this.F);
        this.sa();
        L.prototype.s.call(this);
    };
    nj.prototype.m = function () {
        this.ic = this.F = this.v = this.hf = null;
        this.tb.stop();
        Ne(this.tb, 'tick', this.Kd);
        this.tb = null;
        L.prototype.m.call(this);
    };
    nj.prototype.Kd = function () {
        --this.ce;
        0 < this.ce ? this.Df(this.ce) : (this.tb.stop(), Ne(this.tb, 'tick', this.Kd), this.Pg(), this.Dh());
    };
    nj.prototype.sa = function () {
        this.Hd().focus();
    };
    Object.assign(nj.prototype, {
        Hd: xh,
        Kg: yh,
        Ug: function (a) {
            var b = xh.call(this),
                c = yh.call(this);
            eg(this, b, function () {
                kg(c) && (H(b, !0), ig(c));
            });
            a &&
                fg(this, b, function () {
                    a();
                });
        },
        pg: function () {
            var a = db(E(xh.call(this)) || '');
            return /^\d{6}$/.test(a) ? a : null;
        },
        Ng: Lh,
        Df: function (a) {
            var b = Lh.call(this);
            a = (9 < a ? '0:' : '0:0') + a;
            C['firebaseui.auth.soy2.strings.resendCountdown']
                ? (a = C['firebaseui.auth.soy2.strings.resendCountdown']({ timeRemaining: a }, void 0))
                : (D('string' === typeof a, 'timeRemaining', a, 'string'), (a = 'Renvoyer le code dans\u00a0' + a));
            ie(b, a.toString());
        },
        Pg: function () {
            ig(this.Ng());
        },
        Hc: function () {
            return this.A('firebaseui-id-resend-link');
        },
        Dh: function () {
            jg(this.Hc());
        },
        H: J,
        J: K,
        B: Lg
    });
    function oj(a, b, c, d, e, f, g, h, n, p) {
        L.call(this, Ei, { Ad: b, Xa: n || null, lb: !!c, ga: !!f }, p, 'phoneSignInStart', { R: d, O: e });
        this.ug = h || null;
        this.Cg = b;
        this.v = a;
        this.F = c || null;
        this.bh = g || null;
    }
    l(oj, L);
    oj.prototype.s = function () {
        this.Vg(this.bh, this.ug);
        this.B(this.v, this.F || void 0);
        this.sa();
        L.prototype.s.call(this);
    };
    oj.prototype.m = function () {
        this.F = this.v = null;
        L.prototype.m.call(this);
    };
    oj.prototype.sa = function () {
        this.Cg || Vh(this, this.nb(), this.H());
        Wh(this, this.H(), this.v);
        this.nb().focus();
        Pi(this.nb(), (this.nb().value || '').length);
    };
    Object.assign(oj.prototype, {
        Ig: rg,
        nb: Ch,
        Re: Eh,
        Vg: function (a, b, c) {
            var d = this,
                e = Ch.call(this),
                f = Dh.call(this),
                g = Eh.call(this),
                h = a || Pd,
                n = h.Ua;
            if (0 == n.length) throw Error('No available countries provided.');
            Fh.call(d, h, b);
            I(this, f, function () {
                Kh.call(d, h);
            });
            eg(this, e, function () {
                kg(g) && (H(e, !0), ig(g));
                var p = db(E(e) || ''),
                    m = Kd(this.mc),
                    q = h.search(p);
                p = Gh('1-US-0', n);
                q.length && q[0].g != m.g && ((m = q[0]), Hh.call(d, '1' == m.g && p ? '1-US-0' : m.h, h));
            });
            c &&
                fg(this, e, function () {
                    c();
                });
        },
        Lg: function (a) {
            var b = db(E(Ch.call(this)) || '');
            a = a || Pd;
            var c = a.Ua,
                d = Pd.search(b);
            if (d.length && !Ha(c, d[0]))
                throw (
                    (me(Ch.call(this)),
                    Ch.call(this).focus(),
                    (b = Eh.call(this)),
                    (a = C['firebaseui.auth.soy2.strings.errorUnsupportedCountryCode']
                        ? C['firebaseui.auth.soy2.strings.errorUnsupportedCountryCode'](void 0, void 0)
                        : "Le code pays indiqu\u00e9 n'est pas accept\u00e9."),
                    jg(b, a.toString()),
                    Error('The country code provided is not supported.'))
                );
            c = Kd(this.mc);
            d.length && d[0].g != c.g && Hh.call(this, d[0].h, a);
            d.length && (b = b.substr(d[0].g.length + 1));
            return b ? new zh(this.mc, b) : null;
        },
        li: Dh,
        Mg: function () {
            return this.A('firebaseui-recaptcha-container');
        },
        Id: function () {
            return this.A('firebaseui-id-recaptcha-error');
        },
        H: J,
        J: K,
        B: Lg
    });
    function pj(a, b, c, d) {
        L.call(this, Ii, void 0, d, 'providerMatchByEmail', { R: b, O: c });
        this.Ha = a;
    }
    l(pj, L);
    pj.prototype.s = function () {
        this.Fa(this.Ha);
        this.B(this.Ha);
        this.sa();
        L.prototype.s.call(this);
    };
    pj.prototype.m = function () {
        this.Ha = null;
        L.prototype.m.call(this);
    };
    pj.prototype.sa = function () {
        this.D().focus();
        Pi(this.D(), (this.D().value || '').length);
    };
    Object.assign(pj.prototype, { D: Fg, eb: Gg, Fa: Hg, getEmail: Jg, ta: Kg, H: J, B: Lg });
    function qj(a, b, c, d, e) {
        L.call(this, Di, { qf: b }, e, 'providerSignIn', { R: c, O: d });
        this.jf = a;
    }
    l(qj, L);
    qj.prototype.s = function () {
        this.Sg(this.jf);
        L.prototype.s.call(this);
    };
    qj.prototype.m = function () {
        this.jf = null;
        L.prototype.m.call(this);
    };
    Object.assign(qj.prototype, {
        Sg: function (a) {
            function b(g) {
                a(g);
            }
            for (var c = this.Gc('firebaseui-id-idp-button'), d = 0; d < c.length; d++) {
                var e = c[d],
                    f = Ng(e, 'providerId');
                I(this, e, xa(b, f));
            }
        }
    });
    function rj(a, b, c, d, e) {
        L.call(this, yi, { factorId: a, phoneNumber: c || null, C: !!d }, e, 'revertSecondFactorAdditionSuccess');
        this.jc = b;
        this.da = d || null;
    }
    l(rj, L);
    rj.prototype.s = function () {
        var a = this;
        I(this, Oi(this), function () {
            a.jc();
        });
        this.da && (this.B(this.da), this.H().focus());
        L.prototype.s.call(this);
    };
    rj.prototype.m = function () {
        this.jc = this.da = null;
        L.prototype.m.call(this);
    };
    Object.assign(rj.prototype, { H: J, J: K, B: Lg });
    function sj(a, b, c, d, e) {
        L.call(this, Hi, { yf: b }, e, 'selectTenant', { R: c, O: d });
        this.kf = a;
    }
    l(sj, L);
    sj.prototype.s = function () {
        tj(this, this.kf);
        L.prototype.s.call(this);
    };
    sj.prototype.m = function () {
        this.kf = null;
        L.prototype.m.call(this);
    };
    function tj(a, b) {
        function c(h) {
            b(h);
        }
        for (var d = a.Gc('firebaseui-id-tenant-selection-button'), e = 0; e < d.length; e++) {
            var f = d[e],
                g = Ng(f, 'tenantId');
            I(a, f, xa(c, g));
        }
    }
    function uj(a, b, c, d, e, f, g) {
        L.call(this, Xh, { email: c, lb: !!b, ga: !!f }, g, 'signIn', { R: d, O: e });
        this.Ha = a;
        this.F = b;
    }
    l(uj, L);
    uj.prototype.s = function () {
        this.Fa(this.Ha);
        this.B(this.Ha, this.F || void 0);
        this.sa();
        L.prototype.s.call(this);
    };
    uj.prototype.m = function () {
        this.F = this.Ha = null;
        L.prototype.m.call(this);
    };
    uj.prototype.sa = function () {
        this.D().focus();
        Pi(this.D(), (this.D().value || '').length);
    };
    Object.assign(uj.prototype, { D: Fg, eb: Gg, Fa: Hg, getEmail: Jg, ta: Kg, H: J, J: K, B: Lg });
    function vj(a) {
        L.call(this, ci, void 0, a, 'spinner');
    }
    l(vj, L);
    function wj(a, b, c, d, e, f, g) {
        L.call(this, ni, { me: a, od: c, zd: !!d }, g, 'unauthorizedUser', { R: e, O: f });
        this.F = b;
        this.Td = d;
    }
    l(wj, L);
    wj.prototype.s = function () {
        var a = this,
            b = this.A('firebaseui-id-unauthorized-user-help-link');
        this.Td &&
            b &&
            I(this, b, function () {
                a.Td();
            });
        I(this, this.J(), function () {
            a.F();
        });
        this.sa();
        L.prototype.s.call(this);
    };
    wj.prototype.m = function () {
        this.Td = this.F = null;
        L.prototype.m.call(this);
    };
    wj.prototype.sa = function () {
        this.J().focus();
    };
    Object.assign(wj.prototype, { J: K });
    function xj(a, b, c, d, e, f) {
        L.call(this, oi, { email: a }, f, 'unsupportedProvider', { R: d, O: e });
        this.v = b;
        this.F = c;
    }
    l(xj, L);
    xj.prototype.s = function () {
        this.B(this.v, this.F);
        this.H().focus();
        L.prototype.s.call(this);
    };
    xj.prototype.m = function () {
        this.F = this.v = null;
        L.prototype.m.call(this);
    };
    Object.assign(xj.prototype, { H: J, J: K, B: Lg });
    function yj(a) {
        this.Y = Dc(a);
    }
    function zj(a, b) {
        b ? Cc(a.Y, O.md, b) : a.Y.removeParameter(O.md);
    }
    yj.prototype.ge = function (a) {
        a ? Cc(this.Y, O.nd, a) : this.Y.removeParameter(O.nd);
    };
    yj.prototype.Xb = function () {
        return this.Y.X.get(O.nd) || null;
    };
    function Aj(a, b) {
        null !== b ? Cc(a.Y, O.kd, b ? '1' : '0') : a.Y.removeParameter(O.kd);
    }
    function Bj(a) {
        return a.Y.X.get(O.jd) || null;
    }
    function Cj(a, b) {
        b ? Cc(a.Y, O.PROVIDER_ID, b) : a.Y.removeParameter(O.PROVIDER_ID);
    }
    yj.prototype.toString = function () {
        return this.Y.toString();
    };
    var O = {
        jd: 'ui_auid',
        Xh: 'apiKey',
        kd: 'ui_sd',
        Xf: 'mode',
        se: 'oobCode',
        PROVIDER_ID: 'ui_pid',
        md: 'ui_sid',
        nd: 'tenantId'
    };
    function Dj() {
        this.Ra = {};
    }
    Dj.prototype.define = function (a, b) {
        if (a.toLowerCase() in this.Ra) throw Error('Configuration ' + a + ' has already been defined.');
        this.Ra[a.toLowerCase()] = b;
    };
    Dj.prototype.update = function (a, b) {
        if (!(a.toLowerCase() in this.Ra)) throw Error('Configuration ' + a + ' is not defined.');
        this.Ra[a.toLowerCase()] = b;
    };
    Dj.prototype.get = function (a) {
        if (!(a.toLowerCase() in this.Ra)) throw Error('Configuration ' + a + ' is not defined.');
        return this.Ra[a.toLowerCase()];
    };
    function Ej(a, b) {
        a = a.get(b);
        if (!a) throw Error('Configuration ' + b + ' is required.');
        return a;
    }
    function Fj() {
        this.ha = ('undefined' == typeof document ? null : document) || { cookie: '' };
    }
    k = Fj.prototype;
    k.isEnabled = function () {
        if (!r.navigator.cookieEnabled) return !1;
        if (!this.Fb()) return !0;
        this.set('TESTCOOKIESENABLED', '1', { Sd: 60 });
        if ('1' !== this.get('TESTCOOKIESENABLED')) return !1;
        this.remove('TESTCOOKIESENABLED');
        return !0;
    };
    k.set = function (a, b, c) {
        var d = !1;
        if ('object' === typeof c) {
            var e = c.si;
            d = c.vh || !1;
            var f = c.domain || void 0;
            var g = c.path || void 0;
            var h = c.Sd;
        }
        if (/[;=\s]/.test(a)) throw Error('Invalid cookie name "' + a + '"');
        if (/[;\r\n]/.test(b)) throw Error('Invalid cookie value "' + b + '"');
        void 0 === h && (h = -1);
        this.ha.cookie =
            a +
            '=' +
            b +
            (f ? ';domain=' + f : '') +
            (g ? ';path=' + g : '') +
            (0 > h
                ? ''
                : 0 == h
                ? ';expires=' + new Date(1970, 1, 1).toUTCString()
                : ';expires=' + new Date(Date.now() + 1e3 * h).toUTCString()) +
            (d ? ';secure' : '') +
            (null != e ? ';samesite=' + e : '');
    };
    k.get = function (a, b) {
        for (var c = a + '=', d = (this.ha.cookie || '').split(';'), e = 0, f; e < d.length; e++) {
            f = db(d[e]);
            if (0 == f.lastIndexOf(c, 0)) return f.substr(c.length);
            if (f == a) return '';
        }
        return b;
    };
    k.remove = function (a, b, c) {
        var d = this.bb(a);
        this.set(a, '', { Sd: 0, path: b, domain: c });
        return d;
    };
    k.Oa = function () {
        return Gj(this).keys;
    };
    k.wa = function () {
        return Gj(this).values;
    };
    k.Fb = function () {
        return !this.ha.cookie;
    };
    k.bb = function (a) {
        return void 0 !== this.get(a);
    };
    k.clear = function () {
        for (var a = Gj(this).keys, b = a.length - 1; 0 <= b; b--) this.remove(a[b]);
    };
    function Gj(a) {
        a = (a.ha.cookie || '').split(';');
        for (var b = [], c = [], d, e, f = 0; f < a.length; f++)
            (e = db(a[f])),
                (d = e.indexOf('=')),
                -1 == d ? (b.push(''), c.push(e)) : (b.push(e.substring(0, d)), c.push(e.substring(d + 1)));
        return { keys: b, values: c };
    }
    var Hj = new Fj();
    function Ij() {}
    function Jj(a, b, c, d) {
        this.eh = 'undefined' !== typeof a && null !== a ? a : -1;
        this.qa = b || null;
        this.ua = c || null;
        this.wh = !!d;
    }
    l(Jj, Ij);
    Jj.prototype.set = function (a, b) {
        Hj.set(a, b, { Sd: this.eh, path: this.qa, domain: this.ua, vh: this.wh });
    };
    Jj.prototype.get = function (a) {
        return Hj.get(a) || null;
    };
    Jj.prototype.remove = function (a) {
        Hj.remove(a, this.qa, this.ua);
    };
    function Kj(a) {
        this.cc = a;
        this.la = this.cc.length / 4;
        this.rb = this.la + 6;
        this.P = [[], [], [], []];
        this.Mb = [[], [], [], []];
        this.ja = Array(Lj * (this.rb + 1));
        for (a = 0; a < this.la; a++)
            this.ja[a] = [this.cc[4 * a], this.cc[4 * a + 1], this.cc[4 * a + 2], this.cc[4 * a + 3]];
        var b = Array(4);
        for (a = this.la; a < Lj * (this.rb + 1); a++) {
            b[0] = this.ja[a - 1][0];
            b[1] = this.ja[a - 1][1];
            b[2] = this.ja[a - 1][2];
            b[3] = this.ja[a - 1][3];
            if (0 == a % this.la) {
                var c = b,
                    d = c[0];
                c[0] = c[1];
                c[1] = c[2];
                c[2] = c[3];
                c[3] = d;
                Mj(b);
                b[0] ^= Nj[a / this.la][0];
                b[1] ^= Nj[a / this.la][1];
                b[2] ^= Nj[a / this.la][2];
                b[3] ^= Nj[a / this.la][3];
            } else 6 < this.la && 4 == a % this.la && Mj(b);
            this.ja[a] = Array(4);
            this.ja[a][0] = this.ja[a - this.la][0] ^ b[0];
            this.ja[a][1] = this.ja[a - this.la][1] ^ b[1];
            this.ja[a][2] = this.ja[a - this.la][2] ^ b[2];
            this.ja[a][3] = this.ja[a - this.la][3] ^ b[3];
        }
    }
    Kj.prototype.Nf = 16;
    var Lj = Kj.prototype.Nf / 4;
    Kj.prototype.encrypt = function (a) {
        Oj(this, a);
        Pj(this, 0);
        for (a = 1; a < this.rb; ++a) {
            Qj(this, Rj);
            Sj(this);
            for (var b = this.P, c = this.Mb[0], d = 0; 4 > d; d++)
                (c[0] = b[0][d]),
                    (c[1] = b[1][d]),
                    (c[2] = b[2][d]),
                    (c[3] = b[3][d]),
                    (b[0][d] = Tj[c[0]] ^ Uj[c[1]] ^ c[2] ^ c[3]),
                    (b[1][d] = c[0] ^ Tj[c[1]] ^ Uj[c[2]] ^ c[3]),
                    (b[2][d] = c[0] ^ c[1] ^ Tj[c[2]] ^ Uj[c[3]]),
                    (b[3][d] = Uj[c[0]] ^ c[1] ^ c[2] ^ Tj[c[3]]);
            Pj(this, a);
        }
        Qj(this, Rj);
        Sj(this);
        Pj(this, this.rb);
        return Vj(this);
    };
    Kj.prototype.decrypt = function (a) {
        Oj(this, a);
        Pj(this, this.rb);
        for (a = 1; a < this.rb; ++a) {
            Wj(this);
            Qj(this, Xj);
            Pj(this, this.rb - a);
            for (var b = this.P, c = this.Mb[0], d = 0; 4 > d; d++)
                (c[0] = b[0][d]),
                    (c[1] = b[1][d]),
                    (c[2] = b[2][d]),
                    (c[3] = b[3][d]),
                    (b[0][d] = Yj[c[0]] ^ Zj[c[1]] ^ ak[c[2]] ^ bk[c[3]]),
                    (b[1][d] = bk[c[0]] ^ Yj[c[1]] ^ Zj[c[2]] ^ ak[c[3]]),
                    (b[2][d] = ak[c[0]] ^ bk[c[1]] ^ Yj[c[2]] ^ Zj[c[3]]),
                    (b[3][d] = Zj[c[0]] ^ ak[c[1]] ^ bk[c[2]] ^ Yj[c[3]]);
        }
        Wj(this);
        Qj(this, Xj);
        Pj(this, 0);
        return Vj(this);
    };
    function Oj(a, b) {
        for (var c, d = 0; d < Lj; d++) for (var e = 0; 4 > e; e++) (c = 4 * e + d), (c = b[c]), (a.P[d][e] = c);
    }
    function Vj(a) {
        for (var b = [], c = 0; c < Lj; c++) for (var d = 0; 4 > d; d++) b[4 * d + c] = a.P[c][d];
        return b;
    }
    function Pj(a, b) {
        for (var c = 0; 4 > c; c++) for (var d = 0; 4 > d; d++) a.P[c][d] ^= a.ja[4 * b + d][c];
    }
    function Qj(a, b) {
        for (var c = 0; 4 > c; c++) for (var d = 0; 4 > d; d++) a.P[c][d] = b[a.P[c][d]];
    }
    function Sj(a) {
        for (var b = 1; 4 > b; b++) for (var c = 0; 4 > c; c++) a.Mb[b][c] = a.P[b][c];
        for (b = 1; 4 > b; b++) for (c = 0; 4 > c; c++) a.P[b][c] = a.Mb[b][(c + b) % Lj];
    }
    function Wj(a) {
        for (var b = 1; 4 > b; b++) for (var c = 0; 4 > c; c++) a.Mb[b][(c + b) % Lj] = a.P[b][c];
        for (b = 1; 4 > b; b++) for (c = 0; 4 > c; c++) a.P[b][c] = a.Mb[b][c];
    }
    function Mj(a) {
        a[0] = Rj[a[0]];
        a[1] = Rj[a[1]];
        a[2] = Rj[a[2]];
        a[3] = Rj[a[3]];
    }
    var Rj = [
            99, 124, 119, 123, 242, 107, 111, 197, 48, 1, 103, 43, 254, 215, 171, 118, 202, 130, 201, 125, 250, 89, 71,
            240, 173, 212, 162, 175, 156, 164, 114, 192, 183, 253, 147, 38, 54, 63, 247, 204, 52, 165, 229, 241, 113,
            216, 49, 21, 4, 199, 35, 195, 24, 150, 5, 154, 7, 18, 128, 226, 235, 39, 178, 117, 9, 131, 44, 26, 27, 110,
            90, 160, 82, 59, 214, 179, 41, 227, 47, 132, 83, 209, 0, 237, 32, 252, 177, 91, 106, 203, 190, 57, 74, 76,
            88, 207, 208, 239, 170, 251, 67, 77, 51, 133, 69, 249, 2, 127, 80, 60, 159, 168, 81, 163, 64, 143, 146, 157,
            56, 245, 188, 182, 218, 33, 16, 255, 243, 210, 205, 12, 19, 236, 95, 151, 68, 23, 196, 167, 126, 61, 100,
            93, 25, 115, 96, 129, 79, 220, 34, 42, 144, 136, 70, 238, 184, 20, 222, 94, 11, 219, 224, 50, 58, 10, 73, 6,
            36, 92, 194, 211, 172, 98, 145, 149, 228, 121, 231, 200, 55, 109, 141, 213, 78, 169, 108, 86, 244, 234, 101,
            122, 174, 8, 186, 120, 37, 46, 28, 166, 180, 198, 232, 221, 116, 31, 75, 189, 139, 138, 112, 62, 181, 102,
            72, 3, 246, 14, 97, 53, 87, 185, 134, 193, 29, 158, 225, 248, 152, 17, 105, 217, 142, 148, 155, 30, 135,
            233, 206, 85, 40, 223, 140, 161, 137, 13, 191, 230, 66, 104, 65, 153, 45, 15, 176, 84, 187, 22
        ],
        Xj = [
            82, 9, 106, 213, 48, 54, 165, 56, 191, 64, 163, 158, 129, 243, 215, 251, 124, 227, 57, 130, 155, 47, 255,
            135, 52, 142, 67, 68, 196, 222, 233, 203, 84, 123, 148, 50, 166, 194, 35, 61, 238, 76, 149, 11, 66, 250,
            195, 78, 8, 46, 161, 102, 40, 217, 36, 178, 118, 91, 162, 73, 109, 139, 209, 37, 114, 248, 246, 100, 134,
            104, 152, 22, 212, 164, 92, 204, 93, 101, 182, 146, 108, 112, 72, 80, 253, 237, 185, 218, 94, 21, 70, 87,
            167, 141, 157, 132, 144, 216, 171, 0, 140, 188, 211, 10, 247, 228, 88, 5, 184, 179, 69, 6, 208, 44, 30, 143,
            202, 63, 15, 2, 193, 175, 189, 3, 1, 19, 138, 107, 58, 145, 17, 65, 79, 103, 220, 234, 151, 242, 207, 206,
            240, 180, 230, 115, 150, 172, 116, 34, 231, 173, 53, 133, 226, 249, 55, 232, 28, 117, 223, 110, 71, 241, 26,
            113, 29, 41, 197, 137, 111, 183, 98, 14, 170, 24, 190, 27, 252, 86, 62, 75, 198, 210, 121, 32, 154, 219,
            192, 254, 120, 205, 90, 244, 31, 221, 168, 51, 136, 7, 199, 49, 177, 18, 16, 89, 39, 128, 236, 95, 96, 81,
            127, 169, 25, 181, 74, 13, 45, 229, 122, 159, 147, 201, 156, 239, 160, 224, 59, 77, 174, 42, 245, 176, 200,
            235, 187, 60, 131, 83, 153, 97, 23, 43, 4, 126, 186, 119, 214, 38, 225, 105, 20, 99, 85, 33, 12, 125
        ],
        Nj = [
            [0, 0, 0, 0],
            [1, 0, 0, 0],
            [2, 0, 0, 0],
            [4, 0, 0, 0],
            [8, 0, 0, 0],
            [16, 0, 0, 0],
            [32, 0, 0, 0],
            [64, 0, 0, 0],
            [128, 0, 0, 0],
            [27, 0, 0, 0],
            [54, 0, 0, 0]
        ],
        Tj = [
            0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54,
            56, 58, 60, 62, 64, 66, 68, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106,
            108, 110, 112, 114, 116, 118, 120, 122, 124, 126, 128, 130, 132, 134, 136, 138, 140, 142, 144, 146, 148,
            150, 152, 154, 156, 158, 160, 162, 164, 166, 168, 170, 172, 174, 176, 178, 180, 182, 184, 186, 188, 190,
            192, 194, 196, 198, 200, 202, 204, 206, 208, 210, 212, 214, 216, 218, 220, 222, 224, 226, 228, 230, 232,
            234, 236, 238, 240, 242, 244, 246, 248, 250, 252, 254, 27, 25, 31, 29, 19, 17, 23, 21, 11, 9, 15, 13, 3, 1,
            7, 5, 59, 57, 63, 61, 51, 49, 55, 53, 43, 41, 47, 45, 35, 33, 39, 37, 91, 89, 95, 93, 83, 81, 87, 85, 75,
            73, 79, 77, 67, 65, 71, 69, 123, 121, 127, 125, 115, 113, 119, 117, 107, 105, 111, 109, 99, 97, 103, 101,
            155, 153, 159, 157, 147, 145, 151, 149, 139, 137, 143, 141, 131, 129, 135, 133, 187, 185, 191, 189, 179,
            177, 183, 181, 171, 169, 175, 173, 163, 161, 167, 165, 219, 217, 223, 221, 211, 209, 215, 213, 203, 201,
            207, 205, 195, 193, 199, 197, 251, 249, 255, 253, 243, 241, 247, 245, 235, 233, 239, 237, 227, 225, 231, 229
        ],
        Uj = [
            0, 3, 6, 5, 12, 15, 10, 9, 24, 27, 30, 29, 20, 23, 18, 17, 48, 51, 54, 53, 60, 63, 58, 57, 40, 43, 46, 45,
            36, 39, 34, 33, 96, 99, 102, 101, 108, 111, 106, 105, 120, 123, 126, 125, 116, 119, 114, 113, 80, 83, 86,
            85, 92, 95, 90, 89, 72, 75, 78, 77, 68, 71, 66, 65, 192, 195, 198, 197, 204, 207, 202, 201, 216, 219, 222,
            221, 212, 215, 210, 209, 240, 243, 246, 245, 252, 255, 250, 249, 232, 235, 238, 237, 228, 231, 226, 225,
            160, 163, 166, 165, 172, 175, 170, 169, 184, 187, 190, 189, 180, 183, 178, 177, 144, 147, 150, 149, 156,
            159, 154, 153, 136, 139, 142, 141, 132, 135, 130, 129, 155, 152, 157, 158, 151, 148, 145, 146, 131, 128,
            133, 134, 143, 140, 137, 138, 171, 168, 173, 174, 167, 164, 161, 162, 179, 176, 181, 182, 191, 188, 185,
            186, 251, 248, 253, 254, 247, 244, 241, 242, 227, 224, 229, 230, 239, 236, 233, 234, 203, 200, 205, 206,
            199, 196, 193, 194, 211, 208, 213, 214, 223, 220, 217, 218, 91, 88, 93, 94, 87, 84, 81, 82, 67, 64, 69, 70,
            79, 76, 73, 74, 107, 104, 109, 110, 103, 100, 97, 98, 115, 112, 117, 118, 127, 124, 121, 122, 59, 56, 61,
            62, 55, 52, 49, 50, 35, 32, 37, 38, 47, 44, 41, 42, 11, 8, 13, 14, 7, 4, 1, 2, 19, 16, 21, 22, 31, 28, 25,
            26
        ],
        bk = [
            0, 9, 18, 27, 36, 45, 54, 63, 72, 65, 90, 83, 108, 101, 126, 119, 144, 153, 130, 139, 180, 189, 166, 175,
            216, 209, 202, 195, 252, 245, 238, 231, 59, 50, 41, 32, 31, 22, 13, 4, 115, 122, 97, 104, 87, 94, 69, 76,
            171, 162, 185, 176, 143, 134, 157, 148, 227, 234, 241, 248, 199, 206, 213, 220, 118, 127, 100, 109, 82, 91,
            64, 73, 62, 55, 44, 37, 26, 19, 8, 1, 230, 239, 244, 253, 194, 203, 208, 217, 174, 167, 188, 181, 138, 131,
            152, 145, 77, 68, 95, 86, 105, 96, 123, 114, 5, 12, 23, 30, 33, 40, 51, 58, 221, 212, 207, 198, 249, 240,
            235, 226, 149, 156, 135, 142, 177, 184, 163, 170, 236, 229, 254, 247, 200, 193, 218, 211, 164, 173, 182,
            191, 128, 137, 146, 155, 124, 117, 110, 103, 88, 81, 74, 67, 52, 61, 38, 47, 16, 25, 2, 11, 215, 222, 197,
            204, 243, 250, 225, 232, 159, 150, 141, 132, 187, 178, 169, 160, 71, 78, 85, 92, 99, 106, 113, 120, 15, 6,
            29, 20, 43, 34, 57, 48, 154, 147, 136, 129, 190, 183, 172, 165, 210, 219, 192, 201, 246, 255, 228, 237, 10,
            3, 24, 17, 46, 39, 60, 53, 66, 75, 80, 89, 102, 111, 116, 125, 161, 168, 179, 186, 133, 140, 151, 158, 233,
            224, 251, 242, 205, 196, 223, 214, 49, 56, 35, 42, 21, 28, 7, 14, 121, 112, 107, 98, 93, 84, 79, 70
        ],
        Zj = [
            0, 11, 22, 29, 44, 39, 58, 49, 88, 83, 78, 69, 116, 127, 98, 105, 176, 187, 166, 173, 156, 151, 138, 129,
            232, 227, 254, 245, 196, 207, 210, 217, 123, 112, 109, 102, 87, 92, 65, 74, 35, 40, 53, 62, 15, 4, 25, 18,
            203, 192, 221, 214, 231, 236, 241, 250, 147, 152, 133, 142, 191, 180, 169, 162, 246, 253, 224, 235, 218,
            209, 204, 199, 174, 165, 184, 179, 130, 137, 148, 159, 70, 77, 80, 91, 106, 97, 124, 119, 30, 21, 8, 3, 50,
            57, 36, 47, 141, 134, 155, 144, 161, 170, 183, 188, 213, 222, 195, 200, 249, 242, 239, 228, 61, 54, 43, 32,
            17, 26, 7, 12, 101, 110, 115, 120, 73, 66, 95, 84, 247, 252, 225, 234, 219, 208, 205, 198, 175, 164, 185,
            178, 131, 136, 149, 158, 71, 76, 81, 90, 107, 96, 125, 118, 31, 20, 9, 2, 51, 56, 37, 46, 140, 135, 154,
            145, 160, 171, 182, 189, 212, 223, 194, 201, 248, 243, 238, 229, 60, 55, 42, 33, 16, 27, 6, 13, 100, 111,
            114, 121, 72, 67, 94, 85, 1, 10, 23, 28, 45, 38, 59, 48, 89, 82, 79, 68, 117, 126, 99, 104, 177, 186, 167,
            172, 157, 150, 139, 128, 233, 226, 255, 244, 197, 206, 211, 216, 122, 113, 108, 103, 86, 93, 64, 75, 34, 41,
            52, 63, 14, 5, 24, 19, 202, 193, 220, 215, 230, 237, 240, 251, 146, 153, 132, 143, 190, 181, 168, 163
        ],
        ak = [
            0, 13, 26, 23, 52, 57, 46, 35, 104, 101, 114, 127, 92, 81, 70, 75, 208, 221, 202, 199, 228, 233, 254, 243,
            184, 181, 162, 175, 140, 129, 150, 155, 187, 182, 161, 172, 143, 130, 149, 152, 211, 222, 201, 196, 231,
            234, 253, 240, 107, 102, 113, 124, 95, 82, 69, 72, 3, 14, 25, 20, 55, 58, 45, 32, 109, 96, 119, 122, 89, 84,
            67, 78, 5, 8, 31, 18, 49, 60, 43, 38, 189, 176, 167, 170, 137, 132, 147, 158, 213, 216, 207, 194, 225, 236,
            251, 246, 214, 219, 204, 193, 226, 239, 248, 245, 190, 179, 164, 169, 138, 135, 144, 157, 6, 11, 28, 17, 50,
            63, 40, 37, 110, 99, 116, 121, 90, 87, 64, 77, 218, 215, 192, 205, 238, 227, 244, 249, 178, 191, 168, 165,
            134, 139, 156, 145, 10, 7, 16, 29, 62, 51, 36, 41, 98, 111, 120, 117, 86, 91, 76, 65, 97, 108, 123, 118, 85,
            88, 79, 66, 9, 4, 19, 30, 61, 48, 39, 42, 177, 188, 171, 166, 133, 136, 159, 146, 217, 212, 195, 206, 237,
            224, 247, 250, 183, 186, 173, 160, 131, 142, 153, 148, 223, 210, 197, 200, 235, 230, 241, 252, 103, 106,
            125, 112, 83, 94, 73, 68, 15, 2, 21, 24, 59, 54, 33, 44, 12, 1, 22, 27, 56, 53, 34, 47, 100, 105, 126, 115,
            80, 93, 74, 71, 220, 209, 198, 203, 232, 229, 242, 255, 180, 185, 174, 163, 128, 141, 154, 151
        ],
        Yj = [
            0, 14, 28, 18, 56, 54, 36, 42, 112, 126, 108, 98, 72, 70, 84, 90, 224, 238, 252, 242, 216, 214, 196, 202,
            144, 158, 140, 130, 168, 166, 180, 186, 219, 213, 199, 201, 227, 237, 255, 241, 171, 165, 183, 185, 147,
            157, 143, 129, 59, 53, 39, 41, 3, 13, 31, 17, 75, 69, 87, 89, 115, 125, 111, 97, 173, 163, 177, 191, 149,
            155, 137, 135, 221, 211, 193, 207, 229, 235, 249, 247, 77, 67, 81, 95, 117, 123, 105, 103, 61, 51, 33, 47,
            5, 11, 25, 23, 118, 120, 106, 100, 78, 64, 82, 92, 6, 8, 26, 20, 62, 48, 34, 44, 150, 152, 138, 132, 174,
            160, 178, 188, 230, 232, 250, 244, 222, 208, 194, 204, 65, 79, 93, 83, 121, 119, 101, 107, 49, 63, 45, 35,
            9, 7, 21, 27, 161, 175, 189, 179, 153, 151, 133, 139, 209, 223, 205, 195, 233, 231, 245, 251, 154, 148, 134,
            136, 162, 172, 190, 176, 234, 228, 246, 248, 210, 220, 206, 192, 122, 116, 102, 104, 66, 76, 94, 80, 10, 4,
            22, 24, 50, 60, 46, 32, 236, 226, 240, 254, 212, 218, 200, 198, 156, 146, 128, 142, 164, 170, 184, 182, 12,
            2, 16, 30, 52, 58, 40, 38, 124, 114, 96, 110, 68, 74, 88, 86, 55, 57, 43, 37, 15, 1, 19, 29, 71, 73, 91, 85,
            127, 113, 99, 109, 215, 217, 203, 197, 239, 225, 243, 253, 167, 169, 187, 181, 159, 145, 131, 141
        ];
    function ck(a) {
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            255 < e && ((b[c++] = e & 255), (e >>= 8));
            b[c++] = e;
        }
        return b;
    }
    function dk(a) {
        return Array.prototype.map
            .call(a, function (b) {
                b = b.toString(16);
                return 1 < b.length ? b : '0' + b;
            })
            .join('');
    }
    function ek(a, b) {
        a = new Kj(fk(a));
        b = ck(b);
        for (var c = b.splice(0, 16), d = '', e; c.length; ) {
            e = 16 - c.length;
            for (var f = 0; f < e; f++) c.push(0);
            d += dk(a.encrypt(c));
            c = b.splice(0, 16);
        }
        return d;
    }
    function gk(a, b) {
        a = new Kj(fk(a));
        for (var c = [], d = 0; d < b.length; d += 2) c.push(parseInt(b.substring(d, d + 2), 16));
        d = c.splice(0, 16);
        for (b = ''; d.length; ) {
            d = a.decrypt(d);
            if (8192 >= d.length) d = String.fromCharCode.apply(null, d);
            else {
                for (var e = '', f = 0; f < d.length; f += 8192)
                    e += String.fromCharCode.apply(null, Array.prototype.slice.call(d, f, f + 8192));
                d = e;
            }
            b += d;
            d = c.splice(0, 16);
        }
        return b.replace(/(\x00)+$/, '');
    }
    function fk(a) {
        a = ck(a.substring(0, 32));
        for (var b = 32 - a.length, c = 0; c < b; c++) a.push(0);
        return a;
    }
    function hk() {
        try {
            return !(
                !window.opener ||
                !window.opener.location ||
                window.opener.location.hostname !== window.location.hostname ||
                window.opener.location.protocol !== window.location.protocol
            );
        } catch (a) {}
        return !1;
    }
    function ik(a) {
        le(a, { target: window.cordova && window.cordova.InAppBrowser ? '_system' : '_blank' }, void 0);
    }
    function jk(a, b) {
        a = t(a) && 1 == a.nodeType ? a : document.querySelector(String(a));
        if (null == a) throw Error(b || 'Cannot find element.');
        return a;
    }
    function kk() {
        return window.location.href;
    }
    function lk() {
        var a = null;
        return new F(function (b) {
            'complete' == r.document.readyState
                ? b()
                : ((a = function () {
                      b();
                  }),
                  Ge(window, 'load', a));
        }).qc(function (b) {
            Ne(window, 'load', a);
            throw b;
        });
    }
    function mk() {
        for (var a = 32, b = []; 0 < a; )
            b.push(
                '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(62 * Math.random()))
            ),
                a--;
        return b.join('');
    }
    function nk(a, b, c) {
        c = void 0 === c ? {} : c;
        return Object.keys(a)
            .filter(function (d) {
                return b.includes(d);
            })
            .reduce(function (d, e) {
                d[e] = a[e];
                return d;
            }, c);
    } /*

 Copyright 2005, 2007 Bob Ippolito. All Rights Reserved.
 Copyright The Closure Library Authors.
 SPDX-License-Identifier: MIT
*/
    function ok(a) {
        var b = pk;
        this.bd = [];
        this.gf = b;
        this.Ie = a || null;
        this.Yb = this.Bb = !1;
        this.Ya = void 0;
        this.he = this.fg = this.qd = !1;
        this.ed = 0;
        this.V = null;
        this.rd = 0;
    }
    ok.prototype.cancel = function (a) {
        if (this.Bb) this.Ya instanceof ok && this.Ya.cancel();
        else {
            if (this.V) {
                var b = this.V;
                delete this.V;
                a ? b.cancel(a) : (b.rd--, 0 >= b.rd && b.cancel());
            }
            this.gf ? this.gf.call(this.Ie, this) : (this.he = !0);
            this.Bb || ((a = new qk(this)), rk(this), sk(this, !1, a));
        }
    };
    ok.prototype.Fe = function (a, b) {
        this.qd = !1;
        sk(this, a, b);
    };
    function sk(a, b, c) {
        a.Bb = !0;
        a.Ya = c;
        a.Yb = !b;
        tk(a);
    }
    function rk(a) {
        if (a.Bb) {
            if (!a.he) throw new uk(a);
            a.he = !1;
        }
    }
    ok.prototype.callback = function (a) {
        rk(this);
        sk(this, !0, a);
    };
    function vk(a, b, c) {
        a.bd.push([b, c, void 0]);
        a.Bb && tk(a);
    }
    ok.prototype.then = function (a, b, c) {
        var d,
            e,
            f = new F(function (g, h) {
                e = g;
                d = h;
            });
        vk(this, e, function (g) {
            g instanceof qk ? f.cancel() : d(g);
        });
        return f.then(a, b, c);
    };
    ok.prototype.$goog_Thenable = !0;
    function wk(a) {
        return Ga(a.bd, function (b) {
            return 'function' === typeof b[1];
        });
    }
    function tk(a) {
        if (a.ed && a.Bb && wk(a)) {
            var b = a.ed,
                c = xk[b];
            c && (r.clearTimeout(c.pb), delete xk[b]);
            a.ed = 0;
        }
        a.V && (a.V.rd--, delete a.V);
        b = a.Ya;
        for (var d = (c = !1); a.bd.length && !a.qd; ) {
            var e = a.bd.shift(),
                f = e[0],
                g = e[1];
            e = e[2];
            if ((f = a.Yb ? g : f))
                try {
                    var h = f.call(e || a.Ie, b);
                    void 0 !== h && ((a.Yb = a.Yb && (h == b || h instanceof Error)), (a.Ya = b = h));
                    if (tf(b) || ('function' === typeof r.Promise && b instanceof r.Promise)) (d = !0), (a.qd = !0);
                } catch (n) {
                    (b = n), (a.Yb = !0), wk(a) || (c = !0);
                }
        }
        a.Ya = b;
        d && ((h = u(a.Fe, a, !0)), (d = u(a.Fe, a, !1)), b instanceof ok ? (vk(b, h, d), (b.fg = !0)) : b.then(h, d));
        c && ((b = new yk(b)), (xk[b.pb] = b), (a.ed = b.pb));
    }
    function uk() {
        za.call(this);
    }
    w(uk, za);
    uk.prototype.message = 'Deferred has already fired';
    uk.prototype.name = 'AlreadyCalledError';
    function qk() {
        za.call(this);
    }
    w(qk, za);
    qk.prototype.message = 'Deferred was canceled';
    qk.prototype.name = 'CanceledError';
    function yk(a) {
        this.pb = r.setTimeout(u(this.Ph, this), 0);
        this.Eg = a;
    }
    yk.prototype.Ph = function () {
        delete xk[this.pb];
        throw this.Eg;
    };
    var xk = {};
    function zk(a) {
        var b = {},
            c = b.document || document,
            d = ab(a).toString(),
            e = new Yd(c).createElement('SCRIPT'),
            f = { tf: e, Bf: void 0 },
            g = new ok(f),
            h = null,
            n = null != b.timeout ? b.timeout : 5e3;
        0 < n &&
            ((h = window.setTimeout(function () {
                Ak(e, !0);
                var p = new Bk(1, 'Timeout reached for loading script ' + d);
                rk(g);
                sk(g, !1, p);
            }, n)),
            (f.Bf = h));
        e.onload = e.onreadystatechange = function () {
            (e.readyState && 'loaded' != e.readyState && 'complete' != e.readyState) ||
                (Ak(e, b.ji || !1, h), g.callback(null));
        };
        e.onerror = function () {
            Ak(e, !0, h);
            var p = new Bk(0, 'Error while loading script ' + d);
            rk(g);
            sk(g, !1, p);
        };
        f = b.attributes || {};
        Ra(f, { type: 'text/javascript', charset: 'UTF-8' });
        ce(e, f);
        Qb(e, a);
        Ck(c).appendChild(e);
        return g;
    }
    function Ck(a) {
        var b = (a || document).getElementsByTagName('HEAD');
        return b && 0 !== b.length ? b[0] : a.documentElement;
    }
    function pk() {
        if (this && this.tf) {
            var a = this.tf;
            a && 'SCRIPT' == a.tagName && Ak(a, !0, this.Bf);
        }
    }
    function Ak(a, b, c) {
        null != c && r.clearTimeout(c);
        a.onload = ra;
        a.onerror = ra;
        a.onreadystatechange = ra;
        b &&
            window.setTimeout(function () {
                he(a);
            }, 0);
    }
    function Bk(a, b) {
        var c = 'Jsloader error (code #' + a + ')';
        b && (c += ': ' + b);
        za.call(this, c);
        this.code = a;
    }
    w(Bk, za);
    function Dk() {
        return (r.google && r.google.accounts && r.google.accounts.id) || null;
    }
    function Ek(a) {
        this.Db = a || Dk();
        this.Xe = !1;
        this.sd = null;
    }
    Ek.prototype.cancel = function () {
        this.Db && this.Xe && (this.sd && this.sd(null), this.Db.cancel());
    };
    Ek.prototype.show = function (a, b) {
        var c = this;
        if (this.Db && a)
            return (function () {
                c.Xe = !0;
                return new F(function (e) {
                    c.sd = e;
                    c.Db.initialize({ client_id: a, callback: e, auto_select: !b });
                    c.Db.prompt();
                });
            })();
        if (a) {
            var d = Fk.Ed()
                .load()
                .then(function () {
                    c.Db = Dk();
                    return c.show(a, b);
                })
                .qc(function () {
                    return null;
                });
            return G(d);
        }
        return G(null);
    };
    sa(Ek);
    var cb = new Ua(Va, 'https://accounts.google.com/gsi/client');
    function Fk() {
        this.Gb = null;
    }
    Fk.prototype.load = function () {
        var a = this;
        if (this.Gb) return this.Gb;
        var b = bb();
        return Dk()
            ? G()
            : (this.Gb = lk().then(function () {
                  if (!Dk())
                      return new F(function (c, d) {
                          var e = setTimeout(function () {
                              a.Gb = null;
                              d(Error('Network error!'));
                          }, 1e4);
                          r.onGoogleLibraryLoad = function () {
                              clearTimeout(e);
                              c();
                          };
                          G(zk(b))
                              .then(function () {
                                  Dk() && c();
                              })
                              .qc(function (f) {
                                  clearTimeout(e);
                                  a.Gb = null;
                                  d(f);
                              });
                      });
              }));
    };
    sa(Fk);
    function Gk(a, b) {
        for (var c = 0; c < a.length; c++)
            if (!Ha(Hk, a[c]) && ((null !== Ik && a[c] in Ik) || Ha(b, a[c]))) return a[c];
        return null;
    }
    var Hk = ['emailLink', 'password', 'phone'],
        Ik = {
            'facebook.com': 'FacebookAuthProvider',
            'github.com': 'GithubAuthProvider',
            'google.com': 'GoogleAuthProvider',
            password: 'EmailAuthProvider',
            'twitter.com': 'TwitterAuthProvider',
            phone: 'PhoneAuthProvider'
        };
    function Jk() {
        this.sf = Date.now();
    }
    var Kk = null;
    Jk.prototype.set = function (a) {
        this.sf = a;
    };
    Jk.prototype.reset = function () {
        this.set(Date.now());
    };
    Jk.prototype.get = function () {
        return this.sf;
    };
    function Lk(a, b) {
        this.name = a;
        this.value = b;
    }
    Lk.prototype.toString = function () {
        return this.name;
    };
    var Mk = new Lk('OFF', Infinity),
        Nk = new Lk('SEVERE', 1e3),
        Ok = new Lk('WARNING', 900),
        Pk = new Lk('CONFIG', 700);
    function Qk() {
        this.zc = 0;
        this.clear();
    }
    var Rk;
    Qk.prototype.clear = function () {
        this.Ae = Array(this.zc);
        this.He = -1;
        this.Ze = !1;
    };
    function Sk(a, b, c) {
        this.Dc = null;
        this.reset(a || Mk, b, c, void 0, void 0);
    }
    Sk.prototype.reset = function (a, b, c, d) {
        this.Af = d || Date.now();
        this.cf = a;
        this.fh = b;
        this.ff = c;
        this.Dc = null;
    };
    function Tk(a, b) {
        this.level = null;
        this.Ve = [];
        this.parent = (void 0 === b ? null : b) || null;
        this.children = [];
        this.ef = {
            getName: function () {
                return a;
            }
        };
    }
    function Uk(a) {
        if (a.level) return a.level;
        if (a.parent) return Uk(a.parent);
        Ca('Root logger has no level set.');
        return Mk;
    }
    function Vk(a, b) {
        for (; a; )
            a.Ve.forEach(function (c) {
                c(b);
            }),
                (a = a.parent);
    }
    function Wk() {
        this.entries = {};
        var a = new Tk('');
        a.level = Pk;
        this.entries[''] = a;
    }
    var Xk;
    function Yk(a, b, c) {
        var d = a.entries[b];
        if (d) return void 0 !== c && (d.level = c), d;
        d = Yk(a, b.substr(0, b.lastIndexOf('.')));
        var e = new Tk(b, d);
        a.entries[b] = e;
        d.children.push(e);
        void 0 !== c && (e.level = c);
        return e;
    }
    function Zk() {
        Xk || (Xk = new Wk());
        return Xk;
    }
    function $k(a, b, c, d) {
        var e;
        if ((e = a))
            if ((e = a && b)) {
                e = b.value;
                var f = a ? Uk(Yk(Zk(), a.getName())) : Mk;
                e = e >= f.value;
            }
        if (e) {
            b = b || Mk;
            e = Yk(Zk(), a.getName());
            'function' === typeof c && (c = c());
            Rk || (Rk = new Qk());
            f = Rk;
            a = a.getName();
            if (0 < f.zc) {
                var g = (f.He + 1) % f.zc;
                f.He = g;
                f.Ze
                    ? ((f = f.Ae[g]), f.reset(b, c, a), (a = f))
                    : ((f.Ze = g == f.zc - 1), (a = f.Ae[g] = new Sk(b, c, a)));
            } else a = new Sk(b, c, a);
            d && (a.Dc = d);
            Vk(e, a);
        }
    }
    function al(a, b) {
        var c = bl;
        c && $k(c, Nk, a, b);
    }
    function cl(a) {
        this.hb = a || '';
        Kk || (Kk = new Jk());
        this.Nh = Kk;
    }
    k = cl.prototype;
    k.ue = !0;
    k.uf = !0;
    k.Ch = !0;
    k.Ah = !0;
    k.vf = !1;
    k.Eh = !1;
    function dl(a) {
        return 10 > a ? '0' + a : String(a);
    }
    function el(a) {
        cl.call(this, a);
    }
    w(el, cl);
    function fl(a, b) {
        var c = [];
        c.push(a.hb, ' ');
        if (a.uf) {
            var d = new Date(b.Af);
            c.push(
                '[',
                dl(d.getFullYear() - 2e3) +
                    dl(d.getMonth() + 1) +
                    dl(d.getDate()) +
                    ' ' +
                    dl(d.getHours()) +
                    ':' +
                    dl(d.getMinutes()) +
                    ':' +
                    dl(d.getSeconds()) +
                    '.' +
                    dl(Math.floor(d.getMilliseconds() / 10)),
                '] '
            );
        }
        if (a.Ch) {
            d = c.push;
            var e = a.Nh.get();
            e = (b.Af - e) / 1e3;
            var f = e.toFixed(3),
                g = 0;
            if (1 > e) g = 2;
            else for (; 100 > e; ) g++, (e *= 10);
            for (; 0 < g--; ) f = ' ' + f;
            d.call(c, '[', f, 's] ');
        }
        a.Ah && c.push('[', b.ff, '] ');
        a.Eh && c.push('[', b.cf.name, '] ');
        c.push(b.fh);
        a.vf && (b = b.Dc) && c.push('\n', b instanceof Error ? b.message : b.toString());
        a.ue && c.push('\n');
        return c.join('');
    }
    function gl() {
        this.oh = u(this.cg, this);
        this.Ec = new el();
        this.Ec.uf = !1;
        this.Ec.vf = !1;
        this.Ye = this.Ec.ue = !1;
        this.Gg = {};
    }
    gl.prototype.cg = function (a) {
        function b(f) {
            if (f) {
                if (f.value >= Nk.value) return 'error';
                if (f.value >= Ok.value) return 'warn';
                if (f.value >= Pk.value) return 'log';
            }
            return 'debug';
        }
        if (!this.Gg[a.ff]) {
            var c = fl(this.Ec, a),
                d = hl;
            if (d) {
                var e = b(a.cf);
                il(d, e, c, a.Dc);
            }
        }
    };
    var hl = r.console;
    function il(a, b, c, d) {
        if (a[b]) a[b](c, d || '');
        else a.log(c, d || '');
    }
    var bl = Yk(Zk(), 'firebaseui', void 0).ef,
        jl = new gl();
    if (1 != jl.Ye) {
        var kl = Yk(Zk(), '').ef,
            ll = jl.oh;
        kl && Yk(Zk(), kl.getName()).Ve.push(ll);
        jl.Ye = !0;
    }
    function ml(a) {
        var b = bl;
        b && $k(b, Ok, a, void 0);
    }
    function nl(a, b) {
        this.Oe = a;
        this.Ca = b || null;
    }
    nl.prototype.getEmail = function () {
        return this.Oe;
    };
    nl.prototype.Nb = function () {
        return { email: this.Oe, credential: this.Ca && this.Ca.toJSON() };
    };
    function ol(a) {
        if (a && a.email) {
            var b = a.credential && firebase.auth.AuthCredential.fromJSON(a.credential);
            return new nl(a.email, b);
        }
        return null;
    }
    function pl(a, b) {
        this.tg = a;
        this.Dg =
            b ||
            function (c) {
                throw c;
            };
        this.verificationId = a.verificationId;
    }
    pl.prototype.confirm = function (a) {
        return G(this.tg.confirm(a)).qc(this.Dg);
    };
    function ql(a) {
        this.zf = a || null;
    }
    ql.prototype.Xb = function () {
        return this.zf;
    };
    ql.prototype.Nb = function () {
        return { tenantId: this.zf };
    };
    function rl() {}
    w(rl, Ij);
    rl.prototype[Symbol.iterator] = function () {
        return Zb(this.La(!0)).dd();
    };
    rl.prototype.clear = function () {
        var a = Array.from(this),
            b = 'undefined' != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        a = b ? b.call(a) : { next: aa(a) };
        for (b = a.next(); !b.done; b = a.next()) this.remove(b.value);
    };
    function sl(a) {
        this.Aa = a;
    }
    w(sl, rl);
    function tl(a) {
        if (!a.Aa) return !1;
        try {
            return a.Aa.setItem('__sak', '1'), a.Aa.removeItem('__sak'), !0;
        } catch (b) {
            return !1;
        }
    }
    k = sl.prototype;
    k.set = function (a, b) {
        try {
            this.Aa.setItem(a, b);
        } catch (c) {
            if (0 == this.Aa.length) throw 'Storage mechanism: Storage disabled';
            throw 'Storage mechanism: Quota exceeded';
        }
    };
    k.get = function (a) {
        a = this.Aa.getItem(a);
        if ('string' !== typeof a && null !== a) throw 'Storage mechanism: Invalid value was encountered';
        return a;
    };
    k.remove = function (a) {
        this.Aa.removeItem(a);
    };
    k.La = function (a) {
        var b = 0,
            c = this.Aa,
            d = new Yb();
        d.ya = function () {
            if (b >= c.length) throw Xb;
            var e = c.key(b++);
            if (a) return e;
            e = c.getItem(e);
            if ('string' !== typeof e) throw 'Storage mechanism: Invalid value was encountered';
            return e;
        };
        d.next = d.ya.bind(d);
        return d;
    };
    k.clear = function () {
        this.Aa.clear();
    };
    k.key = function (a) {
        return this.Aa.key(a);
    };
    function ul() {
        var a = null;
        try {
            a = window.localStorage || null;
        } catch (b) {}
        this.Aa = a;
    }
    w(ul, sl);
    function vl() {
        var a = null;
        try {
            a = window.sessionStorage || null;
        } catch (b) {}
        this.Aa = a;
    }
    w(vl, sl);
    function wl(a, b) {
        this.ec = a;
        this.hb = b + '::';
    }
    w(wl, rl);
    wl.prototype.set = function (a, b) {
        this.ec.set(this.hb + a, b);
    };
    wl.prototype.get = function (a) {
        return this.ec.get(this.hb + a);
    };
    wl.prototype.remove = function (a) {
        this.ec.remove(this.hb + a);
    };
    wl.prototype.La = function (a) {
        var b = this.ec.La(!0),
            c = this,
            d = new Yb();
        d.ya = function () {
            for (var e = b.ya(); e.substr(0, c.hb.length) != c.hb; ) e = b.ya();
            return a ? e.substr(c.hb.length) : c.ec.get(e);
        };
        d.next = d.ya.bind(d);
        return d;
    };
    function xl(a) {
        var b = [];
        yl(new zl(), a, b);
        return b.join('');
    }
    function zl() {
        this.ad = void 0;
    }
    function yl(a, b, c) {
        if (null == b) c.push('null');
        else {
            if ('object' == typeof b) {
                if (Array.isArray(b)) {
                    var d = b;
                    b = d.length;
                    c.push('[');
                    for (var e = '', f = 0; f < b; f++)
                        c.push(e), (e = d[f]), yl(a, a.ad ? a.ad.call(d, String(f), e) : e, c), (e = ',');
                    c.push(']');
                    return;
                }
                if (b instanceof String || b instanceof Number || b instanceof Boolean) b = b.valueOf();
                else {
                    c.push('{');
                    f = '';
                    for (d in b)
                        Object.prototype.hasOwnProperty.call(b, d) &&
                            ((e = b[d]),
                            'function' != typeof e &&
                                (c.push(f), Al(d, c), c.push(':'), yl(a, a.ad ? a.ad.call(b, d, e) : e, c), (f = ',')));
                    c.push('}');
                    return;
                }
            }
            switch (typeof b) {
                case 'string':
                    Al(b, c);
                    break;
                case 'number':
                    c.push(isFinite(b) && !isNaN(b) ? String(b) : 'null');
                    break;
                case 'boolean':
                    c.push(String(b));
                    break;
                case 'function':
                    c.push('null');
                    break;
                default:
                    throw Error('Unknown type: ' + typeof b);
            }
        }
    }
    var Bl = {
            '"': '\\"',
            '\\': '\\\\',
            '/': '\\/',
            '\b': '\\b',
            '\f': '\\f',
            '\n': '\\n',
            '\r': '\\r',
            '\t': '\\t',
            '\x0B': '\\u000b'
        },
        Cl = /\uffff/.test('\uffff') ? /[\\"\x00-\x1f\x7f-\uffff]/g : /[\\"\x00-\x1f\x7f-\xff]/g;
    function Al(a, b) {
        b.push(
            '"',
            a.replace(Cl, function (c) {
                var d = Bl[c];
                d || ((d = '\\u' + (c.charCodeAt(0) | 65536).toString(16).substr(1)), (Bl[c] = d));
                return d;
            }),
            '"'
        );
    }
    function Dl(a) {
        this.Tc = a;
    }
    Dl.prototype.set = function (a, b) {
        void 0 === b ? this.Tc.remove(a) : this.Tc.set(a, xl(b));
    };
    Dl.prototype.get = function (a) {
        try {
            var b = this.Tc.get(a);
        } catch (c) {
            return;
        }
        if (null !== b)
            try {
                return JSON.parse(b);
            } catch (c) {
                throw 'Storage: Invalid value was encountered';
            }
    };
    Dl.prototype.remove = function (a) {
        this.Tc.remove(a);
    };
    tl(new ul());
    var El,
        Fl = new vl();
    El = tl(Fl) ? new wl(Fl, 'firebaseui') : null;
    var Gl = new Dl(El),
        Hl = { name: 'pendingEmailCredential', storage: Gl },
        Il = { name: 'redirectStatus', storage: Gl },
        Jl = { name: 'redirectUrl', storage: Gl },
        Kl = { name: 'emailForSignIn', storage: new Dl(new Jj(3600, '/')) },
        Ll = { name: 'pendingEncryptedCredential', storage: new Dl(new Jj(3600, '/')) };
    function Ml(a, b) {
        return a.storage.get(b ? a.name + ':' + b : a.name);
    }
    function Nl(a, b) {
        a.storage.remove(b ? a.name + ':' + b : a.name);
    }
    function Ol(a, b, c) {
        a.storage.set(c ? a.name + ':' + c : a.name, b);
    }
    function Pl(a) {
        return Ml(Jl, a) || null;
    }
    function Ql(a) {
        a = Ml(Hl, a) || null;
        return ol(a);
    }
    function Rl(a) {
        Nl(Hl, a);
    }
    function Sl(a, b) {
        Ol(Hl, a.Nb(), b);
    }
    function Tl(a) {
        return (a = Ml(Il, a) || null) && 'undefined' !== typeof a.tenantId ? new ql(a.tenantId) : null;
    }
    function Ul(a, b) {
        Ol(Il, a.Nb(), b);
    }
    function Vl(a, b) {
        b = Ml(Kl, b);
        var c = null;
        if (b)
            try {
                var d = gk(a, b),
                    e = JSON.parse(d);
                c = (e && e.email) || null;
            } catch (f) {}
        return c;
    }
    function Wl(a, b) {
        b = Ml(Ll, b);
        var c = null;
        if (b)
            try {
                var d = gk(a, b);
                c = JSON.parse(d);
            } catch (e) {}
        return ol(c || null);
    }
    function Xl(a, b, c) {
        Ol(Ll, ek(a, JSON.stringify(b.Nb())), c);
    }
    function Yl(a, b, c) {
        var d = Error.call(this);
        this.message = d.message;
        'stack' in d && (this.stack = d.stack);
        this.code = 'firebaseui/' + a;
        if (!(a = b)) {
            a = this.code;
            if (C['firebaseui.auth.soy2.strings.errorAuthUI'])
                a = C['firebaseui.auth.soy2.strings.errorAuthUI']({ code: a }, void 0);
            else {
                D('string' === typeof a, 'code', a, 'string');
                b = '';
                switch (t(a) ? a.toString() : a) {
                    case 'firebaseui/merge-conflict':
                        b +=
                            "\u00c9chec de la mise \u00e0 jour de l'utilisateur anonyme actuel. Les identifiants non anonymes sont d\u00e9j\u00e0 associ\u00e9s \u00e0 un autre compte utilisateur.";
                        break;
                    default:
                        b += Ag(null, void 0);
                }
                a = b;
            }
            a = a.toString();
        }
        this.message = a || '';
        this.credential = c || null;
    }
    l(Yl, Error);
    Yl.prototype.Nb = function () {
        return { code: this.code, message: this.message };
    };
    Yl.prototype.toJSON = function () {
        return this.Nb();
    };
    function Zl() {
        this.o = new Dj();
        this.o.define('autoUpgradeAnonymousUsers');
        this.o.define('callbacks');
        this.o.define('credentialHelper', 'none');
        this.o.define('immediateFederatedRedirect', !1);
        this.o.define('popupMode', !1);
        this.o.define('privacyPolicyUrl');
        this.o.define('queryParameterForSignInSuccessUrl', 'signInSuccessUrl');
        this.o.define('queryParameterForWidgetMode', 'mode');
        this.o.define('signInFlow');
        this.o.define('signInOptions');
        this.o.define('signInSuccessUrl');
        this.o.define('siteName');
        this.o.define('tosUrl');
        this.o.define('widgetUrl');
        this.o.define('adminRestrictedOperation');
    }
    function $l(a) {
        var b = !!a.o.get('autoUpgradeAnonymousUsers');
        b &&
            !am(a) &&
            al(
                'Missing "signInFailure" callback: "signInFailure" callback needs to be provided when "autoUpgradeAnonymousUsers" is set to true.',
                void 0
            );
        return b;
    }
    function bm(a) {
        a = a.o.get('signInOptions') || [];
        for (var b = [], c = 0; c < a.length; c++) {
            var d = a[c];
            d = t(d) ? d : { provider: d };
            d.provider && b.push(d);
        }
        return b;
    }
    function cm(a, b) {
        a = bm(a);
        for (var c = 0; c < a.length; c++) if (a[c].provider === b) return a[c];
        return null;
    }
    function dm(a) {
        return bm(a).map(function (b) {
            return b.provider;
        });
    }
    function em(a, b) {
        a = fm(a);
        for (var c = 0; c < a.length; c++) if (a[c].providerId === b) return a[c];
        return null;
    }
    function fm(a) {
        return bm(a).map(function (b) {
            if (Ik[b.provider] || Ha(gm, b.provider)) {
                b = {
                    providerId: b.provider,
                    na: b.providerName || null,
                    va: b.fullLabel || null,
                    Rb: b.buttonColor || null,
                    $b: b.iconUrl ? pb(tb(b.iconUrl) || wb) : null
                };
                for (var c in b) null === b[c] && delete b[c];
                return b;
            }
            return {
                providerId: b.provider,
                na: b.providerName || null,
                va: b.fullLabel || null,
                Rb: b.buttonColor || null,
                $b: b.iconUrl ? pb(tb(b.iconUrl) || wb) : null,
                ah: b.loginHintKey || null
            };
        });
    }
    function hm(a) {
        var b = cm(a, firebase.auth.GoogleAuthProvider.PROVIDER_ID),
            c;
        if ((c = b && b.clientId)) {
            a: {
                if (
                    'http:' === (window.location && window.location.protocol) ||
                    'https:' === (window.location && window.location.protocol)
                )
                    for (d in ((a = a.o.get('credentialHelper')), im))
                        if (im[d] === a) {
                            var d = im[d];
                            break a;
                        }
                d = 'none';
            }
            c = 'googleyolo' === d;
        }
        return c ? b.clientId || null : null;
    }
    function jm(a) {
        a = cm(a, firebase.auth.EmailAuthProvider.PROVIDER_ID);
        return !!(a && a.disableSignUp && a.disableSignUp.status);
    }
    function km(a) {
        a = a.o.get('adminRestrictedOperation') || null;
        return !(!a || !a.status);
    }
    function lm(a) {
        var b = null;
        bm(a).forEach(function (d) {
            d.provider == firebase.auth.PhoneAuthProvider.PROVIDER_ID &&
                t(d.recaptchaParameters) &&
                !Array.isArray(d.recaptchaParameters) &&
                (b = Pa(d.recaptchaParameters));
        });
        if (b) {
            var c = [];
            mm.forEach(function (d) {
                'undefined' !== typeof b[d] && (c.push(d), delete b[d]);
            });
            c.length && ml('The following provided "recaptchaParameters" keys are not allowed: ' + c.join(', '));
        }
        return b;
    }
    function nm(a) {
        return (a = a.o.get('adminRestrictedOperation')) && a.adminEmail ? a.adminEmail : null;
    }
    function om(a) {
        if ((a = a.o.get('adminRestrictedOperation') || null)) {
            var b = a.helpLink || null;
            if (b && 'string' === typeof b)
                return function () {
                    ik(b);
                };
        }
        return null;
    }
    function pm(a) {
        return (
            ((a = cm(a, firebase.auth.EmailAuthProvider.PROVIDER_ID)) &&
                a.disableSignUp &&
                a.disableSignUp.adminEmail) ||
            null
        );
    }
    function qm(a) {
        if ((a = cm(a, firebase.auth.EmailAuthProvider.PROVIDER_ID)) && a.disableSignUp) {
            var b = a.disableSignUp.helpLink || null;
            if (b && 'string' === typeof b)
                return function () {
                    ik(b);
                };
        }
        return null;
    }
    function rm(a, b) {
        a = (a = cm(a, b)) && a.scopes;
        return Array.isArray(a) ? a : [];
    }
    function sm(a, b) {
        a = (a = cm(a, b)) && a.customParameters;
        return t(a)
            ? ((a = Pa(a)),
              b === firebase.auth.GoogleAuthProvider.PROVIDER_ID && delete a.login_hint,
              b === firebase.auth.GithubAuthProvider.PROVIDER_ID && delete a.login,
              a)
            : null;
    }
    function tm(a) {
        a = cm(a, firebase.auth.PhoneAuthProvider.PROVIDER_ID);
        var b = null;
        a && 'string' === typeof a.loginHint && (b = Ah(a.loginHint));
        return (a && a.defaultNationalNumber) || (b && b.Xa) || null;
    }
    function um(a) {
        var b = ((a = cm(a, firebase.auth.PhoneAuthProvider.PROVIDER_ID)) && a.defaultCountry) || null;
        b = b && Md(b);
        var c = null;
        a && 'string' === typeof a.loginHint && (c = Ah(a.loginHint));
        return (b && b[0]) || (c && Kd(c.Bc)) || null;
    }
    function vm(a) {
        a = cm(a, firebase.auth.PhoneAuthProvider.PROVIDER_ID);
        if (!a) return null;
        var b = a.whitelistedCountries,
            c = a.blacklistedCountries;
        if ('undefined' !== typeof b && (!Array.isArray(b) || 0 == b.length))
            throw Error('WhitelistedCountries must be a non-empty array.');
        if ('undefined' !== typeof c && !Array.isArray(c)) throw Error('BlacklistedCountries must be an array.');
        if (b && c) throw Error('Both whitelistedCountries and blacklistedCountries are provided.');
        if (!b && !c) return Ld;
        a = [];
        if (b) {
            c = {};
            for (var d = 0; d < b.length; d++) {
                var e = Nd(b[d]);
                for (var f = 0; f < e.length; f++) c[e[f].h] = e[f];
            }
            for (var g in c) c.hasOwnProperty(g) && a.push(c[g]);
        } else {
            g = {};
            for (b = 0; b < c.length; b++) for (e = Nd(c[b]), d = 0; d < e.length; d++) g[e[d].h] = e[d];
            for (e = 0; e < Ld.length; e++) (null !== g && Ld[e].h in g) || a.push(Ld[e]);
        }
        return a;
    }
    function wm(a) {
        return Ej(a.o, 'queryParameterForWidgetMode');
    }
    Zl.prototype.N = function () {
        var a = this.o.get('tosUrl') || null,
            b = this.o.get('privacyPolicyUrl') || null;
        a && !b && ml('Privacy Policy URL is missing, the link will not be displayed.');
        if (a && b) {
            if ('function' === typeof a) return a;
            if ('string' === typeof a)
                return function () {
                    ik(a);
                };
        }
        return null;
    };
    Zl.prototype.M = function () {
        var a = this.o.get('tosUrl') || null,
            b = this.o.get('privacyPolicyUrl') || null;
        b && !a && ml('Term of Service URL is missing, the link will not be displayed.');
        if (a && b) {
            if ('function' === typeof b) return b;
            if ('string' === typeof b)
                return function () {
                    ik(b);
                };
        }
        return null;
    };
    function xm(a) {
        return (a = cm(a, firebase.auth.EmailAuthProvider.PROVIDER_ID)) && 'undefined' !== typeof a.requireDisplayName
            ? !!a.requireDisplayName
            : !0;
    }
    function ym(a) {
        a = cm(a, firebase.auth.EmailAuthProvider.PROVIDER_ID);
        return !(!a || a.signInMethod !== firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD);
    }
    function zm(a) {
        a = cm(a, firebase.auth.EmailAuthProvider.PROVIDER_ID);
        return !(!a || !a.forceSameDevice);
    }
    function Am(a) {
        if (ym(a)) {
            var b = { url: kk(), handleCodeInApp: !0 };
            (a = cm(a, firebase.auth.EmailAuthProvider.PROVIDER_ID)) &&
                'function' === typeof a.emailLinkSignIn &&
                Ra(b, a.emailLinkSignIn());
            a = b.url;
            var c = kk();
            c instanceof pc || (c = Dc(c));
            a instanceof pc || (a = Dc(a));
            a = c.resolve(a);
            b.url = a.toString();
            return b;
        }
        return null;
    }
    function Bm(a) {
        var b = !!a.o.get('immediateFederatedRedirect'),
            c = dm(a);
        a = Cm(a);
        return b && 1 == c.length && !Ha(Hk, c[0]) && 'redirect' == a;
    }
    function Cm(a) {
        a = a.o.get('signInFlow');
        for (var b in Dm) if (Dm[b] == a) return Dm[b];
        return 'redirect';
    }
    function Em(a) {
        return Fm(a).signInSuccess || null;
    }
    function Gm(a) {
        return Fm(a).signInSuccessWithAuthResult || null;
    }
    function am(a) {
        return Fm(a).signInFailure || null;
    }
    function Fm(a) {
        return a.o.get('callbacks') || {};
    }
    Zl.prototype.Kb = function (a) {
        for (var b in a)
            try {
                this.o.update(b, a[b]);
            } catch (c) {
                al('Invalid config: "' + b + '"', void 0);
            }
        Yc && this.o.update('popupMode', !1);
        vm(this);
    };
    Zl.prototype.update = function (a, b) {
        this.o.update(a, b);
        vm(this);
    };
    var im = { Zh: 'googleyolo', NONE: 'none' },
        Dm = { ci: 'popup', di: 'redirect' },
        Hm = {
            Yh: 'callback',
            RECOVER_EMAIL: 'recoverEmail',
            ei: 'resetPassword',
            REVERT_SECOND_FACTOR_ADDITION: 'revertSecondFactorAddition',
            fi: 'select',
            gi: 'signIn',
            VERIFY_AND_CHANGE_EMAIL: 'verifyAndChangeEmail',
            VERIFY_EMAIL: 'verifyEmail'
        },
        gm = ['anonymous'],
        mm = ['sitekey', 'tabindex', 'callback', 'expired-callback'];
    var Im,
        Jm,
        Km,
        Lm,
        P = {};
    function R(a, b, c, d) {
        P[a].apply(null, Array.prototype.slice.call(arguments, 1));
    }
    function Mm(a) {
        if ('auth/invalid-credential' === a.code && a.message && -1 !== a.message.indexOf('error=consent_required'))
            return { code: 'auth/user-cancelled' };
        if (a.message && -1 !== a.message.indexOf('HTTP Cloud Function returned an error:')) {
            var b = JSON.parse(a.message.substring(a.message.indexOf('{'), a.message.lastIndexOf('}') + 1));
            return { code: a.code, message: (b && b.error && b.error.message) || a.message };
        }
        return a;
    }
    function Nm(a, b, c, d) {
        function e(g) {
            if (!g.name || 'cancel' != g.name) {
                a: {
                    var h = g.message;
                    try {
                        var n = ((JSON.parse(h).error || {}).message || '')
                            .toLowerCase()
                            .match(RegExp('invalid.+(access|id)_token'));
                        if (n && n.length) {
                            var p = !0;
                            break a;
                        }
                    } catch (m) {}
                    p = !1;
                }
                if (p)
                    (g = M(b)),
                        b.l(),
                        (p = C['firebaseui.auth.soy2.strings.errorExpiredCredential']
                            ? C['firebaseui.auth.soy2.strings.errorExpiredCredential'](void 0, void 0)
                            : 'Votre session de connexion a expir\u00e9. Veuillez r\u00e9essayer.'),
                        S(a, g, void 0, p.toString());
                else {
                    p = (g && g.message) || '';
                    if (g.code) {
                        if ('auth/email-already-in-use' == g.code || 'auth/credential-already-in-use' == g.code) return;
                        p = T(g);
                    }
                    b.I(p);
                }
            }
        }
        Om(a);
        if (d) return Pm(a, c), G();
        if (!c.credential) throw Error('No credential found!');
        if (!a.u().currentUser && !c.user) throw Error('User not logged in.');
        try {
            var f = Qm(a, c);
        } catch (g) {
            return al(g.code || g.message, g), b.I(g.code || g.message), G();
        }
        c = f
            .then(function (g) {
                Pm(a, g);
            }, e)
            .then(void 0, e);
        U(a, f);
        return G(c);
    }
    function Pm(a, b) {
        if (!b.user) throw Error('No user found');
        var c = Gm(V(a));
        Em(V(a)) &&
            c &&
            ml(
                'Both signInSuccess and signInSuccessWithAuthResult callbacks are provided. Only signInSuccessWithAuthResult callback will be invoked.'
            );
        if (c) {
            c = Gm(V(a));
            var d = Pl(W(a)) || void 0;
            Nl(Jl, W(a));
            var e = !1;
            if (hk()) {
                if (!c || c(b, d)) (e = !0), Sb(window.opener.location, Rm(a, d));
                c || window.close();
            } else if (!c || c(b, d)) (e = !0), Sb(window.location, Rm(a, d));
            e || a.reset();
        } else {
            c = b.user;
            b = b.credential;
            d = Em(V(a));
            e = Pl(W(a)) || void 0;
            Nl(Jl, W(a));
            var f = !1;
            if (hk()) {
                if (!d || d(c, b, e)) (f = !0), Sb(window.opener.location, Rm(a, e));
                d || window.close();
            } else if (!d || d(c, b, e)) (f = !0), Sb(window.location, Rm(a, e));
            f || a.reset();
        }
    }
    function Rm(a, b) {
        a = b || V(a).o.get('signInSuccessUrl');
        if (!a)
            throw Error(
                'No redirect URL has been found. You must either specify a signInSuccessUrl in the configuration, pass in a redirect URL to the widget URL, or return false from the callback.'
            );
        return a;
    }
    function T(a) {
        var b = (b = { code: a.code });
        b = b.code;
        if (C['firebaseui.auth.soy2.strings.error']) b = C['firebaseui.auth.soy2.strings.error']({ code: b }, void 0);
        else {
            D(null == b || 'string' === typeof b, 'code', b, 'null|string|undefined');
            var c = '';
            switch (t(b) ? b.toString() : b) {
                case 'auth/email-already-in-use':
                    c += "L'adresse e-mail est d\u00e9j\u00e0 utilis\u00e9e par un autre compte";
                    break;
                case 'auth/requires-recent-login':
                    c += Dg();
                    break;
                case 'auth/too-many-requests':
                    c +=
                        'Vous avez saisi un mot de passe incorrect un trop grand nombre de fois. Veuillez r\u00e9essayer dans quelques minutes.';
                    break;
                case 'auth/user-cancelled':
                    c +=
                        "Veuillez accorder les autorisations n\u00e9cessaires pour vous connecter \u00e0 l'application";
                    break;
                case 'auth/user-not-found':
                    c += 'Cette adresse e-mail ne correspond \u00e0 aucun compte existant';
                    break;
                case 'auth/user-token-expired':
                    c += Dg();
                    break;
                case 'auth/weak-password':
                    c += 'Le mot de passe doit comporter au moins 6\u00a0caract\u00e8res.';
                    break;
                case 'auth/wrong-password':
                    c += "L'adresse e-mail et le mot de passe saisis ne correspondent pas";
                    break;
                case 'auth/network-request-failed':
                    c += "Une erreur r\u00e9seau s'est produite";
                    break;
                case 'auth/invalid-phone-number':
                    c += wg(null, void 0);
                    break;
                case 'auth/invalid-verification-code':
                    c += xg(null, void 0);
                    break;
                case 'auth/code-expired':
                    c += "Ce code n'est plus valide";
                    break;
                case 'auth/expired-action-code':
                    c += 'Ce code a expir\u00e9.';
                    break;
                case 'auth/invalid-action-code':
                    c +=
                        "Le code d'action n'est pas valide. Ce probl\u00e8me peut survenir si le code est incorrect, s'il est arriv\u00e9 \u00e0 expiration ou s'il a d\u00e9j\u00e0 \u00e9t\u00e9 utilis\u00e9.";
            }
            b = c;
        }
        if ((b = b.toString())) return b;
        try {
            return JSON.parse(a.message), al('Internal error: ' + a.message, void 0), Ag().toString();
        } catch (d) {
            return a.message;
        }
    }
    function Sm(a, b, c) {
        var d =
            Ik[b] && firebase.auth[Ik[b]]
                ? new firebase.auth[Ik[b]]()
                : 0 == b.indexOf('saml.')
                ? new firebase.auth.SAMLAuthProvider(b)
                : new firebase.auth.OAuthProvider(b);
        if (!d) throw Error('Invalid Firebase Auth provider!');
        var e = rm(V(a), b);
        if (d.addScope) for (var f = 0; f < e.length; f++) d.addScope(e[f]);
        e = sm(V(a), b) || {};
        c &&
            ((a =
                b == firebase.auth.GoogleAuthProvider.PROVIDER_ID
                    ? 'login_hint'
                    : b == firebase.auth.GithubAuthProvider.PROVIDER_ID
                    ? 'login'
                    : (a = em(V(a), b)) && a.ah),
            a && (e[a] = c));
        d.setCustomParameters && d.setCustomParameters(e);
        return d;
    }
    function Tm(a, b, c, d) {
        function e() {
            var p = new ql(a.Xb());
            Ul(p, W(a));
            U(
                a,
                b.aa(
                    u(a.Mh, a),
                    [n],
                    function () {
                        if ('file:' === (window.location && window.location.protocol))
                            return U(
                                a,
                                a.getRedirectResult().then(function (m) {
                                    b.l();
                                    Nl(Il, W(a));
                                    R('callback', a, h, G(m));
                                }, f)
                            );
                    },
                    g
                )
            );
        }
        function f(p) {
            Nl(Il, W(a));
            if (!p.name || 'cancel' != p.name)
                switch (((p = Mm(p)), p.code)) {
                    case 'auth/popup-blocked':
                        e();
                        break;
                    case 'auth/popup-closed-by-user':
                    case 'auth/cancelled-popup-request':
                        break;
                    case 'auth/credential-already-in-use':
                        break;
                    case 'auth/network-request-failed':
                    case 'auth/too-many-requests':
                    case 'auth/user-cancelled':
                        b.I(T(p));
                        break;
                    case 'auth/admin-restricted-operation':
                        b.l();
                        km(V(a)) ? R('handleUnauthorizedUser', a, h, null, c) : R('callback', a, h, zf(p));
                        break;
                    default:
                        b.l(), R('callback', a, h, zf(p));
                }
        }
        function g(p) {
            Nl(Il, W(a));
            (p.name && 'cancel' == p.name) ||
                (al('signInWithRedirect: ' + p.code, void 0),
                (p = T(p)),
                'blank' == b.Wc && Bm(V(a)) ? (b.l(), R('providerSignIn', a, h, p)) : b.I(p));
        }
        var h = M(b),
            n = Sm(a, c, d);
        'redirect' == Cm(V(a))
            ? e()
            : U(
                  a,
                  Um(a, n).then(function (p) {
                      b.l();
                      R('callback', a, h, G(p));
                  }, f)
              );
    }
    function Vm(a, b) {
        U(
            a,
            b.aa(
                u(a.Ih, a),
                [],
                function (c) {
                    b.l();
                    return Nm(a, b, c, !0);
                },
                function (c) {
                    (c.name && 'cancel' == c.name) || (al('ContinueAsGuest: ' + c.code, void 0), (c = T(c)), b.I(c));
                }
            )
        );
    }
    function Wm(a, b, c) {
        function d(f) {
            var g = !1;
            f = b.aa(
                u(a.Jh, a),
                [f],
                function (h) {
                    var n = M(b);
                    b.l();
                    R('callback', a, n, G(h));
                    g = !0;
                },
                function (h) {
                    if (!h.name || 'cancel' != h.name)
                        if (!h || 'auth/credential-already-in-use' != h.code)
                            if (h && 'auth/email-already-in-use' == h.code && h.email && h.credential) {
                                var n = M(b);
                                b.l();
                                R('callback', a, n, zf(h));
                            } else
                                h && 'auth/admin-restricted-operation' == h.code && km(V(a))
                                    ? ((h = M(b)),
                                      b.l(),
                                      R(
                                          'handleUnauthorizedUser',
                                          a,
                                          h,
                                          null,
                                          firebase.auth.GoogleAuthProvider.PROVIDER_ID
                                      ))
                                    : ((h = T(h)), b.I(h));
                }
            );
            U(a, f);
            return f.then(
                function () {
                    return g;
                },
                function () {
                    return !1;
                }
            );
        }
        if (c && c.credential && c.clientId === hm(V(a))) {
            if (rm(V(a), firebase.auth.GoogleAuthProvider.PROVIDER_ID).length) {
                try {
                    var e = JSON.parse(atob(c.credential.split('.')[1])).email;
                } catch (f) {}
                Tm(a, b, firebase.auth.GoogleAuthProvider.PROVIDER_ID, e);
                return G(!0);
            }
            return d(firebase.auth.GoogleAuthProvider.credential(c.credential));
        }
        c &&
            b.I(
                (C['firebaseui.auth.soy2.strings.errorUnsupportedCredential']
                    ? C['firebaseui.auth.soy2.strings.errorUnsupportedCredential'](void 0, void 0)
                    : "Les identifiants s\u00e9lectionn\u00e9s pour le fournisseur d'authentification ne sont pas compatibles."
                ).toString()
            );
        return G(!1);
    }
    function Xm(a, b) {
        var c = b.ta(),
            d = b.vd();
        if (c)
            if (d) {
                var e = firebase.auth.EmailAuthProvider.credential(c, d);
                U(
                    a,
                    b.aa(
                        u(a.Kh, a),
                        [c, d],
                        function (f) {
                            return Nm(a, b, {
                                user: f.user,
                                credential: e,
                                operationType: f.operationType,
                                additionalUserInfo: f.additionalUserInfo
                            });
                        },
                        function (f) {
                            if (!f.name || 'cancel' != f.name)
                                switch (f.code) {
                                    case 'auth/email-already-in-use':
                                        break;
                                    case 'auth/email-exists':
                                        H(b.D(), !1);
                                        jg(b.eb(), T(f));
                                        break;
                                    case 'auth/too-many-requests':
                                    case 'auth/wrong-password':
                                        H(b.Pa(), !1);
                                        jg(b.Gd(), T(f));
                                        break;
                                    default:
                                        al('verifyPassword: ' + f.message, void 0), b.I(T(f));
                                }
                        }
                    )
                );
            } else b.Pa().focus();
        else b.D().focus();
    }
    function Ym(a) {
        a = dm(V(a));
        return 1 == a.length && a[0] == firebase.auth.EmailAuthProvider.PROVIDER_ID;
    }
    function Zm(a) {
        a = dm(V(a));
        return 1 == a.length && a[0] == firebase.auth.PhoneAuthProvider.PROVIDER_ID;
    }
    function S(a, b, c, d) {
        Ym(a)
            ? d
                ? R('signIn', a, b, c, d)
                : $m(a, b, c)
            : a && Zm(a) && !d
            ? R('phoneSignInStart', a, b)
            : a && Bm(V(a)) && !d
            ? R('federatedRedirect', a, b, c)
            : R('providerSignIn', a, b, d, c);
    }
    function an(a, b, c, d) {
        var e = M(b);
        U(
            a,
            b.aa(
                u(a.u().fetchSignInMethodsForEmail, a.u()),
                [c],
                function (f) {
                    b.l();
                    bn(a, e, f, c, d);
                },
                function (f) {
                    f = T(f);
                    b.I(f);
                }
            )
        );
    }
    function bn(a, b, c, d, e, f) {
        c.length || (ym(V(a)) && !ym(V(a)))
            ? Ha(c, firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)
                ? R('passwordSignIn', a, b, d, f)
                : 1 == c.length && c[0] === firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
                ? ym(V(a))
                    ? R('sendEmailLinkForSignIn', a, b, d, function () {
                          R('signIn', a, b);
                      })
                    : R('unsupportedProvider', a, b, d)
                : (c = Gk(c, dm(V(a))))
                ? (Sl(new nl(d), W(a)), R('federatedSignIn', a, b, d, c, e))
                : R('unsupportedProvider', a, b, d)
            : jm(V(a))
            ? R('handleUnauthorizedUser', a, b, d, firebase.auth.EmailAuthProvider.PROVIDER_ID)
            : ym(V(a))
            ? R('sendEmailLinkForSignIn', a, b, d, function () {
                  R('signIn', a, b);
              })
            : R('passwordSignUp', a, b, d, void 0, void 0, f);
    }
    function cn(a, b, c, d, e, f) {
        var g = M(b);
        U(
            a,
            b.aa(
                u(a.sendSignInLinkToEmail, a),
                [c, f],
                function () {
                    b.l();
                    R('emailLinkSignInSent', a, g, c, d, f);
                },
                e
            )
        );
    }
    function $m(a, b, c) {
        c ? R('prefilledEmailSignIn', a, b, c) : R('signIn', a, b);
    }
    function dn() {
        return nc(kk(), 'oobCode');
    }
    function en() {
        var a = nc(kk(), 'continueUrl');
        return a
            ? function () {
                  Sb(window.location, a);
              }
            : null;
    }
    function fn(a, b, c, d, e) {
        var f = c.ud();
        f &&
            U(
                a,
                c.aa(
                    u(a.u().confirmPasswordReset, a.u()),
                    [d, f],
                    function () {
                        c.l();
                        var g = new dj(e);
                        g.render(b);
                        X(a, g);
                    },
                    function (g) {
                        gn(a, b, c, g);
                    }
                )
            );
    }
    function gn(a, b, c, d) {
        'auth/weak-password' == (d && d.code)
            ? ((a = T(d)), H(c.Ea(), !1), jg(c.Fd(), a), c.Ea().focus())
            : (c && c.l(), (c = new ej()), c.render(b), X(a, c));
    }
    function hn(a, b, c) {
        var d = new Ni(c, function () {
            U(
                a,
                d.aa(
                    u(a.u().sendPasswordResetEmail, a.u()),
                    [c],
                    function () {
                        d.l();
                        d = new Xi(c, void 0, V(a).N(), V(a).M());
                        d.render(b);
                        X(a, d);
                    },
                    function () {
                        d.I(zg().toString());
                    }
                )
            );
        });
        d.render(b);
        X(a, d);
    }
    function jn(a, b, c, d) {
        var e = new rj(
            d.factorId,
            function () {
                e.aa(
                    u(a.u().sendPasswordResetEmail, a.u()),
                    [c],
                    function () {
                        e.l();
                        e = new Xi(c, void 0, V(a).N(), V(a).M());
                        e.render(b);
                        X(a, e);
                    },
                    function () {
                        e.I(zg().toString());
                    }
                );
            },
            d.phoneNumber
        );
        e.render(b);
        X(a, e);
    }
    P.passwordReset = function (a, b, c, d) {
        U(
            a,
            a
                .u()
                .verifyPasswordResetCode(c)
                .then(
                    function (e) {
                        var f = new kj(e, function () {
                            fn(a, b, f, c, d);
                        });
                        f.render(b);
                        X(a, f);
                    },
                    function () {
                        gn(a, b);
                    }
                )
        );
    };
    P.emailChangeRevocation = function (a, b, c) {
        var d = null;
        U(
            a,
            a
                .u()
                .checkActionCode(c)
                .then(function (e) {
                    d = e.data.email;
                    return a.u().applyActionCode(c);
                })
                .then(
                    function () {
                        hn(a, b, d);
                    },
                    function () {
                        var e = new fj();
                        e.render(b);
                        X(a, e);
                    }
                )
        );
    };
    P.emailVerification = function (a, b, c, d) {
        U(
            a,
            a
                .u()
                .applyActionCode(c)
                .then(
                    function () {
                        var e = new Yi(d);
                        e.render(b);
                        X(a, e);
                    },
                    function () {
                        var e = new Zi();
                        e.render(b);
                        X(a, e);
                    }
                )
        );
    };
    P.revertSecondFactorAddition = function (a, b, c) {
        var d = null,
            e = null;
        U(
            a,
            a
                .u()
                .checkActionCode(c)
                .then(function (f) {
                    d = f.data.email;
                    e = f.data.multiFactorInfo;
                    return a.u().applyActionCode(c);
                })
                .then(
                    function () {
                        jn(a, b, d, e);
                    },
                    function () {
                        var f = new bj();
                        f.render(b);
                        X(a, f);
                    }
                )
        );
    };
    P.verifyAndChangeEmail = function (a, b, c, d) {
        var e = null;
        U(
            a,
            a
                .u()
                .checkActionCode(c)
                .then(function (f) {
                    e = f.data.email;
                    return a.u().applyActionCode(c);
                })
                .then(
                    function () {
                        var f = new $i(e, d);
                        f.render(b);
                        X(a, f);
                    },
                    function () {
                        var f = new aj();
                        f.render(b);
                        X(a, f);
                    }
                )
        );
    };
    P.anonymousUserMismatch = function (a, b) {
        var c = new Ji(function () {
            c.l();
            S(a, b);
        });
        c.render(b);
        X(a, c);
    };
    function kn(a, b, c) {
        if (c.user) {
            var d = {
                    user: c.user,
                    credential: c.credential,
                    operationType: c.operationType,
                    additionalUserInfo: c.additionalUserInfo
                },
                e = Ql(W(a)),
                f = e && e.getEmail();
            if (f && !ln(c.user, f)) mn(a, b, d);
            else {
                var g = e && e.Ca;
                g
                    ? U(
                          a,
                          c.user.linkWithCredential(g).then(
                              function (h) {
                                  d = {
                                      user: h.user,
                                      credential: g,
                                      operationType: h.operationType,
                                      additionalUserInfo: h.additionalUserInfo
                                  };
                                  nn(a, b, d);
                              },
                              function (h) {
                                  on(a, b, h);
                              }
                          )
                      )
                    : nn(a, b, d);
            }
        } else (c = M(b)), b.l(), Rl(W(a)), S(a, c);
    }
    function nn(a, b, c) {
        Rl(W(a));
        Nm(a, b, c);
    }
    function on(a, b, c) {
        var d = M(b);
        Rl(W(a));
        c = T(c);
        b.l();
        S(a, d, void 0, c);
    }
    function pn(a, b, c, d) {
        var e = M(b);
        U(
            a,
            a
                .u()
                .fetchSignInMethodsForEmail(c)
                .then(
                    function (f) {
                        b.l();
                        f.length
                            ? Ha(f, firebase.auth.EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)
                                ? R('passwordLinking', a, e, c)
                                : 1 == f.length && f[0] === firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
                                ? R('emailLinkSignInLinking', a, e, c)
                                : (f = Gk(f, dm(V(a))))
                                ? R('federatedLinking', a, e, c, f, d)
                                : (Rl(W(a)), R('unsupportedProvider', a, e, c))
                            : (Rl(W(a)), R('passwordRecovery', a, e, c, !1, Bg().toString()));
                    },
                    function (f) {
                        on(a, b, f);
                    }
                )
        );
    }
    function mn(a, b, c) {
        var d = M(b);
        U(
            a,
            qn(a).then(
                function () {
                    b.l();
                    R('emailMismatch', a, d, c);
                },
                function (e) {
                    (e.name && 'cancel' == e.name) || ((e = T(e.code)), b.I(e));
                }
            )
        );
    }
    function ln(a, b) {
        if (b == a.email) return !0;
        if (a.providerData) for (var c = 0; c < a.providerData.length; c++) if (b == a.providerData[c].email) return !0;
        return !1;
    }
    P.callback = function (a, b, c) {
        var d = new Li();
        d.render(b);
        X(a, d);
        c = c || a.getRedirectResult();
        U(
            a,
            c.then(
                function (e) {
                    kn(a, d, e);
                },
                function (e) {
                    if (
                        (e = Mm(e)) &&
                        ('auth/account-exists-with-different-credential' == e.code ||
                            'auth/email-already-in-use' == e.code) &&
                        e.email &&
                        e.credential
                    )
                        Sl(new nl(e.email, e.credential), W(a)), pn(a, d, e.email);
                    else if (e && 'auth/user-cancelled' == e.code) {
                        var f = Ql(W(a)),
                            g = T(e);
                        f && f.Ca ? pn(a, d, f.getEmail(), g) : f ? an(a, d, f.getEmail(), g) : on(a, d, e);
                    } else
                        (e && 'auth/credential-already-in-use' == e.code) ||
                            (e && 'auth/operation-not-supported-in-this-environment' == e.code && Ym(a)
                                ? kn(a, d, { user: null, credential: null })
                                : e && 'auth/admin-restricted-operation' == e.code && km(V(a))
                                ? (d.l(), Rl(W(a)), R('handleUnauthorizedUser', a, b, null, null))
                                : on(a, d, e));
                }
            )
        );
    };
    P.differentDeviceError = function (a, b) {
        var c = new Mi(function () {
            c.l();
            S(a, b);
        });
        c.render(b);
        X(a, c);
    };
    P.emailLinkConfirmation = function (a, b, c, d, e, f) {
        var g = new Qi(
            function () {
                var h = g.ta();
                h ? (g.l(), d(a, b, h, c)) : g.D().focus();
            },
            function () {
                g.l();
                S(a, b, e || void 0);
            },
            e || void 0,
            V(a).N(),
            V(a).M()
        );
        g.render(b);
        X(a, g);
        f && g.I(f);
    };
    P.emailLinkNewDeviceLinking = function (a, b, c, d) {
        var e = new yj(c);
        c = e.Y.X.get(O.PROVIDER_ID) || null;
        Cj(e, null);
        if (c) {
            var f = new Si(
                em(V(a), c),
                function () {
                    f.l();
                    d(a, b, e.toString());
                },
                V(a).N(),
                V(a).M()
            );
            f.render(b);
            X(a, f);
        } else S(a, b);
    };
    function rn(a, b, c, d, e) {
        var f = new Ki(),
            g = new yj(c),
            h = g.Y.X.get(O.se) || '',
            n = g.Y.X.get(O.md) || '',
            p = '1' === g.Y.X.get(O.kd),
            m = Bj(g),
            q = g.Y.X.get(O.PROVIDER_ID) || null;
        g = g.Xb();
        a.ge(g);
        var A = !Ml(Kl, W(a)),
            Q = d || Vl(n, W(a)),
            Wa = (d = Wl(n, W(a))) && d.Ca;
        q && Wa && Wa.providerId !== q && (Wa = null);
        f.render(b);
        X(a, f);
        U(
            a,
            f.aa(
                function () {
                    var na = G(null);
                    na =
                        (m && A) || (A && p)
                            ? zf(Error('anonymous-user-not-found'))
                            : sn(a, c).then(function (Ab) {
                                  if (q && !Wa) throw Error('pending-credential-not-found');
                                  return Ab;
                              });
                    var ha = null;
                    return na
                        .then(function (Ab) {
                            ha = Ab;
                            return e ? null : a.u().checkActionCode(h);
                        })
                        .then(function () {
                            return ha;
                        });
                },
                [],
                function (na) {
                    Q
                        ? tn(a, f, Q, c, Wa, na)
                        : p
                        ? (f.l(), R('differentDeviceError', a, b))
                        : (f.l(), R('emailLinkConfirmation', a, b, c, un));
                },
                function (na) {
                    var ha = void 0;
                    if (!na || !na.name || 'cancel' != na.name)
                        switch ((f.l(), na && na.message)) {
                            case 'anonymous-user-not-found':
                                R('differentDeviceError', a, b);
                                break;
                            case 'anonymous-user-mismatch':
                                R('anonymousUserMismatch', a, b);
                                break;
                            case 'pending-credential-not-found':
                                R('emailLinkNewDeviceLinking', a, b, c, vn);
                                break;
                            default:
                                na && (ha = T(na)), S(a, b, void 0, ha);
                        }
                }
            )
        );
    }
    function un(a, b, c, d) {
        rn(a, b, d, c, !0);
    }
    function vn(a, b, c) {
        rn(a, b, c);
    }
    function tn(a, b, c, d, e, f) {
        var g = M(b);
        b.Lb(
            'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active firebaseui-progress-dialog-loading-icon',
            (C['firebaseui.auth.soy2.strings.dialogEmailLinkProcessing']
                ? C['firebaseui.auth.soy2.strings.dialogEmailLinkProcessing'](void 0, void 0)
                : 'Connexion\u2026'
            ).toString()
        );
        var h = null;
        e = (f ? wn(a, f, c, d, e) : a.signInWithEmailLink(c, d, e)).then(
            function (n) {
                Nl(Ll, W(a));
                Nl(Kl, W(a));
                b.fa();
                b.Lb(
                    'firebaseui-icon-done',
                    (C['firebaseui.auth.soy2.strings.dialogEmailLinkVerified']
                        ? C['firebaseui.auth.soy2.strings.dialogEmailLinkVerified'](void 0, void 0)
                        : 'Connect\u00e9'
                    ).toString()
                );
                h = setTimeout(function () {
                    b.fa();
                    Nm(a, b, n, !0);
                }, 1e3);
                U(a, function () {
                    b && (b.fa(), b.l());
                    clearTimeout(h);
                });
            },
            function (n) {
                b.fa();
                b.l();
                if (!n.name || 'cancel' != n.name) {
                    n = Mm(n);
                    var p = T(n);
                    'auth/email-already-in-use' == n.code || 'auth/credential-already-in-use' == n.code
                        ? (Nl(Ll, W(a)), Nl(Kl, W(a)))
                        : 'auth/invalid-email' == n.code
                        ? ((p = (
                              C['firebaseui.auth.soy2.strings.errorMismatchingEmail']
                                  ? C['firebaseui.auth.soy2.strings.errorMismatchingEmail'](void 0, void 0)
                                  : "L'adresse e-mail fournie ne correspond pas \u00e0 celle utilis\u00e9e pour la session de connexion en cours."
                          ).toString()),
                          R('emailLinkConfirmation', a, g, d, un, null, p))
                        : S(a, g, c, p);
                }
            }
        );
        U(a, e);
    }
    P.emailLinkSignInCallback = rn;
    function xn(a, b, c, d) {
        var e = M(b);
        cn(
            a,
            b,
            c,
            function () {
                S(a, e, c);
            },
            function (f) {
                if (!f.name || 'cancel' != f.name) {
                    var g = T(f);
                    f && 'auth/network-request-failed' == f.code ? b.I(g) : (b.l(), S(a, e, c, g));
                }
            },
            d
        );
    }
    P.emailLinkSignInLinking = function (a, b, c) {
        var d = Ql(W(a));
        Rl(W(a));
        if (d) {
            var e = d.Ca.providerId,
                f = new Ri(
                    c,
                    em(V(a), e),
                    function () {
                        xn(a, f, c, d);
                    },
                    V(a).N(),
                    V(a).M()
                );
            f.render(b);
            X(a, f);
        } else S(a, b);
    };
    P.emailLinkSignInSent = function (a, b, c, d, e) {
        var f = new Ti(
            c,
            function () {
                f.l();
                R('emailNotReceived', a, b, c, d, e);
            },
            function () {
                f.l();
                d();
            },
            V(a).N(),
            V(a).M()
        );
        f.render(b);
        X(a, f);
    };
    P.emailMismatch = function (a, b, c) {
        var d = Ql(W(a));
        if (d) {
            var e = new Ui(
                c.user.email,
                d.getEmail(),
                function () {
                    var f = e;
                    Rl(W(a));
                    Nm(a, f, c);
                },
                function () {
                    var f = e,
                        g = c.credential.providerId,
                        h = M(f);
                    f.l();
                    d.Ca ? R('federatedLinking', a, h, d.getEmail(), g) : R('federatedSignIn', a, h, d.getEmail(), g);
                },
                V(a).N(),
                V(a).M()
            );
            e.render(b);
            X(a, e);
        } else S(a, b);
    };
    P.emailNotReceived = function (a, b, c, d, e) {
        var f = new Vi(
            function () {
                cn(
                    a,
                    f,
                    c,
                    d,
                    function (g) {
                        g = T(g);
                        f.I(g);
                    },
                    e
                );
            },
            function () {
                f.l();
                S(a, b, c);
            },
            V(a).N(),
            V(a).M()
        );
        f.render(b);
        X(a, f);
    };
    P.federatedLinking = function (a, b, c, d, e) {
        var f = Ql(W(a));
        if (f && f.Ca) {
            var g = new Wi(
                c,
                em(V(a), d),
                function () {
                    Tm(a, g, d, c);
                },
                V(a).N(),
                V(a).M()
            );
            g.render(b);
            X(a, g);
            e && g.I(e);
        } else S(a, b);
    };
    P.federatedRedirect = function (a, b, c) {
        var d = new Ki();
        d.render(b);
        X(a, d);
        b = dm(V(a))[0];
        Tm(a, d, b, c);
    };
    P.federatedSignIn = function (a, b, c, d, e) {
        var f = new Wi(
            c,
            em(V(a), d),
            function () {
                Tm(a, f, d, c);
            },
            V(a).N(),
            V(a).M()
        );
        f.render(b);
        X(a, f);
        e && f.I(e);
    };
    function yn(a, b, c, d) {
        var e = b.vd();
        e
            ? U(
                  a,
                  b.aa(
                      u(a.Fh, a),
                      [c, e],
                      function (f) {
                          f = f.user.linkWithCredential(d).then(function (g) {
                              return Nm(a, b, {
                                  user: g.user,
                                  credential: d,
                                  operationType: g.operationType,
                                  additionalUserInfo: g.additionalUserInfo
                              });
                          });
                          U(a, f);
                          return f;
                      },
                      function (f) {
                          if (!f.name || 'cancel' != f.name)
                              switch (f.code) {
                                  case 'auth/wrong-password':
                                      H(b.Pa(), !1);
                                      jg(b.Gd(), T(f));
                                      break;
                                  case 'auth/too-many-requests':
                                      b.I(T(f));
                                      break;
                                  default:
                                      al('signInWithEmailAndPassword: ' + f.message, void 0), b.I(T(f));
                              }
                      }
                  )
              )
            : b.Pa().focus();
    }
    P.passwordLinking = function (a, b, c) {
        var d = Ql(W(a));
        Rl(W(a));
        var e = d && d.Ca;
        if (e) {
            var f = new ij(
                c,
                function () {
                    yn(a, f, c, e);
                },
                function () {
                    f.l();
                    R('passwordRecovery', a, b, c);
                },
                V(a).N(),
                V(a).M()
            );
            f.render(b);
            X(a, f);
        } else S(a, b);
    };
    function zn(a, b) {
        var c = b.ta();
        if (c) {
            var d = M(b);
            U(
                a,
                b.aa(
                    u(a.u().sendPasswordResetEmail, a.u()),
                    [c],
                    function () {
                        b.l();
                        var e = new Xi(
                            c,
                            function () {
                                e.l();
                                S(a, d);
                            },
                            V(a).N(),
                            V(a).M()
                        );
                        e.render(d);
                        X(a, e);
                    },
                    function (e) {
                        H(b.D(), !1);
                        jg(b.eb(), T(e));
                    }
                )
            );
        } else b.D().focus();
    }
    P.passwordRecovery = function (a, b, c, d, e) {
        var f = new jj(
            function () {
                zn(a, f);
            },
            d
                ? void 0
                : function () {
                      f.l();
                      S(a, b);
                  },
            c,
            V(a).N(),
            V(a).M()
        );
        f.render(b);
        X(a, f);
        e && f.I(e);
    };
    P.passwordSignIn = function (a, b, c, d) {
        var e = new lj(
            function () {
                Xm(a, e);
            },
            function () {
                var f = e.getEmail();
                e.l();
                R('passwordRecovery', a, b, f);
            },
            c,
            V(a).N(),
            V(a).M(),
            d
        );
        e.render(b);
        X(a, e);
    };
    function An(a, b) {
        var c = xm(V(a)),
            d = b.ta(),
            e = null;
        c && (e = b.og());
        var f = b.ud();
        if (d) {
            if (c)
                if (e) e = Ub(e);
                else {
                    b.Wb().focus();
                    return;
                }
            if (f) {
                var g = firebase.auth.EmailAuthProvider.credential(d, f);
                U(
                    a,
                    b.aa(
                        u(a.Gh, a),
                        [d, f],
                        function (h) {
                            var n = {
                                user: h.user,
                                credential: g,
                                operationType: h.operationType,
                                additionalUserInfo: h.additionalUserInfo
                            };
                            return c
                                ? ((h = h.user.updateProfile({ displayName: e }).then(function () {
                                      return Nm(a, b, n);
                                  })),
                                  U(a, h),
                                  h)
                                : Nm(a, b, n);
                        },
                        function (h) {
                            if (!h.name || 'cancel' != h.name) {
                                var n = Mm(h);
                                h = T(n);
                                switch (n.code) {
                                    case 'auth/email-already-in-use':
                                        return Bn(a, b, d, n);
                                    case 'auth/too-many-requests':
                                        h = (
                                            C['firebaseui.auth.soy2.strings.errorTooManyRequestsCreateAccount']
                                                ? C['firebaseui.auth.soy2.strings.errorTooManyRequestsCreateAccount'](
                                                      void 0,
                                                      void 0
                                                  )
                                                : 'De trop nombreuses demandes de compte proviennent de votre adresse\u00a0IP. Veuillez r\u00e9essayer dans quelques minutes.'
                                        ).toString();
                                    case 'auth/operation-not-allowed':
                                    case 'auth/weak-password':
                                        H(b.Ea(), !1);
                                        jg(b.Fd(), h);
                                        break;
                                    case 'auth/admin-restricted-operation':
                                        km(V(a))
                                            ? ((h = M(b)),
                                              b.l(),
                                              R(
                                                  'handleUnauthorizedUser',
                                                  a,
                                                  h,
                                                  d,
                                                  firebase.auth.EmailAuthProvider.PROVIDER_ID
                                              ))
                                            : b.I(h);
                                        break;
                                    default:
                                        (n = 'setAccountInfo: ' + xl(n)), al(n, void 0), b.I(h);
                                }
                            }
                        }
                    )
                );
            } else b.Ea().focus();
        } else b.D().focus();
    }
    function Bn(a, b, c, d) {
        function e() {
            var g = T(d);
            H(b.D(), !1);
            jg(b.eb(), g);
            b.D().focus();
        }
        var f = a
            .u()
            .fetchSignInMethodsForEmail(c)
            .then(
                function (g) {
                    g.length ? e() : ((g = M(b)), b.l(), R('passwordRecovery', a, g, c, !1, Bg().toString()));
                },
                function () {
                    e();
                }
            );
        U(a, f);
        return f;
    }
    P.passwordSignUp = function (a, b, c, d, e, f) {
        function g() {
            h.l();
            S(a, b);
        }
        var h = new mj(
            xm(V(a)),
            function () {
                An(a, h);
            },
            e ? void 0 : g,
            c,
            d,
            V(a).N(),
            V(a).M(),
            f
        );
        h.render(b);
        X(a, h);
    };
    function Cn(a, b, c, d) {
        function e(g) {
            b.Hd().focus();
            H(b.Hd(), !1);
            jg(b.Kg(), g);
        }
        var f = b.pg();
        f
            ? (b.Lb(
                  'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active firebaseui-progress-dialog-loading-icon',
                  vg().toString()
              ),
              U(
                  a,
                  b.aa(
                      u(d.confirm, d),
                      [f],
                      function (g) {
                          b.fa();
                          b.Lb(
                              'firebaseui-icon-done',
                              (C['firebaseui.auth.soy2.strings.dialogCodeVerified']
                                  ? C['firebaseui.auth.soy2.strings.dialogCodeVerified'](void 0, void 0)
                                  : 'Le code a bien \u00e9t\u00e9 valid\u00e9.'
                              ).toString()
                          );
                          var h = setTimeout(function () {
                              b.fa();
                              b.l();
                              var n = {
                                  user: Dn(a).currentUser,
                                  credential: null,
                                  operationType: g.operationType,
                                  additionalUserInfo: g.additionalUserInfo
                              };
                              Nm(a, b, n, !0);
                          }, 1e3);
                          U(a, function () {
                              b && b.fa();
                              clearTimeout(h);
                          });
                      },
                      function (g) {
                          if (g.name && 'cancel' == g.name) b.fa();
                          else {
                              var h = Mm(g);
                              g = T(h);
                              switch (h.code) {
                                  case 'auth/credential-already-in-use':
                                      b.fa();
                                      break;
                                  case 'auth/code-expired':
                                      h = M(b);
                                      b.fa();
                                      b.l();
                                      R('phoneSignInStart', a, h, c, g);
                                      break;
                                  case 'auth/missing-verification-code':
                                  case 'auth/invalid-verification-code':
                                      b.fa();
                                      e(g);
                                      break;
                                  default:
                                      b.fa(), b.I(g);
                              }
                          }
                      }
                  )
              ))
            : e(xg().toString());
    }
    P.phoneSignInFinish = function (a, b, c, d, e, f) {
        var g = new nj(
            function () {
                g.l();
                R('phoneSignInStart', a, b, c);
            },
            function () {
                Cn(a, g, c, e);
            },
            function () {
                g.l();
                S(a, b);
            },
            function () {
                g.l();
                R('phoneSignInStart', a, b, c);
            },
            Bh(c),
            d,
            V(a).N(),
            V(a).M()
        );
        g.render(b);
        X(a, g);
        f && g.I(f);
    };
    function En(a, b, c, d) {
        try {
            var e = b.Lg(Km);
        } catch (f) {
            return;
        }
        e
            ? Im
                ? (b.Lb(
                      'mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active firebaseui-progress-dialog-loading-icon',
                      vg().toString()
                  ),
                  U(
                      a,
                      b.aa(
                          u(a.Lh, a),
                          [Bh(e), c],
                          function (f) {
                              var g = M(b);
                              b.Lb(
                                  'firebaseui-icon-done',
                                  (C['firebaseui.auth.soy2.strings.dialogCodeSent']
                                      ? C['firebaseui.auth.soy2.strings.dialogCodeSent'](void 0, void 0)
                                      : 'Le code a bien \u00e9t\u00e9 envoy\u00e9.'
                                  ).toString()
                              );
                              var h = setTimeout(function () {
                                  b.fa();
                                  b.l();
                                  R('phoneSignInFinish', a, g, e, 15, f);
                              }, 1e3);
                              U(a, function () {
                                  b && b.fa();
                                  clearTimeout(h);
                              });
                          },
                          function (f) {
                              b.fa();
                              if (!f.name || 'cancel' != f.name) {
                                  grecaptcha.reset(Lm);
                                  Im = null;
                                  var g = (f && f.message) || '';
                                  if (f.code)
                                      switch (f.code) {
                                          case 'auth/too-many-requests':
                                              g = (
                                                  C['firebaseui.auth.soy2.strings.errorTooManyRequestsPhoneNumber']
                                                      ? C[
                                                            'firebaseui.auth.soy2.strings.errorTooManyRequestsPhoneNumber'
                                                        ](void 0, void 0)
                                                      : 'Ce num\u00e9ro de t\u00e9l\u00e9phone a \u00e9t\u00e9 utilis\u00e9 un trop grand nombre de fois'
                                              ).toString();
                                              break;
                                          case 'auth/invalid-phone-number':
                                          case 'auth/missing-phone-number':
                                              b.nb().focus();
                                              jg(b.Re(), wg().toString());
                                              return;
                                          case 'auth/admin-restricted-operation':
                                              if (km(V(a))) {
                                                  f = M(b);
                                                  b.l();
                                                  R(
                                                      'handleUnauthorizedUser',
                                                      a,
                                                      f,
                                                      Bh(e),
                                                      firebase.auth.PhoneAuthProvider.PROVIDER_ID
                                                  );
                                                  return;
                                              }
                                              g = T(f);
                                              break;
                                          default:
                                              g = T(f);
                                      }
                                  b.I(g);
                              }
                          }
                      )
                  ))
                : Jm
                ? jg(
                      b.Id(),
                      (C['firebaseui.auth.soy2.strings.errorMissingRecaptchaResponse']
                          ? C['firebaseui.auth.soy2.strings.errorMissingRecaptchaResponse'](void 0, void 0)
                          : 'R\u00e9soudre le reCAPTCHA'
                      ).toString()
                  )
                : !Jm && d && b.H().click()
            : (b.nb().focus(), jg(b.Re(), wg().toString()));
    }
    P.phoneSignInStart = function (a, b, c, d) {
        var e = lm(V(a)) || {};
        Im = null;
        Jm = !(e && 'invisible' === e.size);
        var f = Zm(a),
            g = um(V(a)),
            h = f ? tm(V(a)) : null;
        g = (c && c.Bc) || (g && g.h) || null;
        c = (c && c.Xa) || h;
        (h = vm(V(a))) && Od(h);
        Km = h ? new Jd(vm(V(a))) : Pd;
        var n = new oj(
            function (m) {
                En(a, n, p, !(!m || !m.keyCode));
            },
            Jm,
            f
                ? null
                : function () {
                      p.clear();
                      n.l();
                      S(a, b);
                  },
            V(a).N(),
            V(a).M(),
            f,
            Km,
            g,
            c
        );
        n.render(b);
        X(a, n);
        d && n.I(d);
        e.callback = function (m) {
            n.Id() && ig(n.Id());
            Im = m;
            Jm || En(a, n, p);
        };
        e['expired-callback'] = function () {
            Im = null;
        };
        var p = new firebase.auth.RecaptchaVerifier(Jm ? n.Mg() : n.H(), e, Dn(a).app);
        U(
            a,
            n.aa(
                u(p.render, p),
                [],
                function (m) {
                    Lm = m;
                },
                function (m) {
                    (m.name && 'cancel' == m.name) || ((m = T(m)), n.l(), S(a, b, void 0, m));
                }
            )
        );
    };
    P.prefilledEmailSignIn = function (a, b, c) {
        var d = new Ki();
        d.render(b);
        X(a, d);
        U(
            a,
            d.aa(
                u(a.u().fetchSignInMethodsForEmail, a.u()),
                [c],
                function (e) {
                    d.l();
                    var f = !(!Ym(a) || !Fn(a));
                    bn(a, b, e, c, void 0, f);
                },
                function (e) {
                    e = T(e);
                    d.l();
                    R('signIn', a, b, c, e);
                }
            )
        );
    };
    P.providerSignIn = function (a, b, c, d) {
        var e = new qj(
            function (f) {
                f == firebase.auth.EmailAuthProvider.PROVIDER_ID
                    ? (e.l(), $m(a, b, d))
                    : f == firebase.auth.PhoneAuthProvider.PROVIDER_ID
                    ? (e.l(), R('phoneSignInStart', a, b))
                    : 'anonymous' == f
                    ? Vm(a, e)
                    : Tm(a, e, f, d);
                Y(a);
                a.Jd.cancel();
            },
            fm(V(a)),
            V(a).N(),
            V(a).M()
        );
        e.render(b);
        X(a, e);
        c && e.I(c);
        Gn(a);
    };
    P.sendEmailLinkForSignIn = function (a, b, c, d) {
        var e = new Li();
        e.render(b);
        X(a, e);
        cn(a, e, c, d, function (f) {
            e.l();
            f && 'auth/admin-restricted-operation' == f.code && km(V(a))
                ? R('handleUnauthorizedUser', a, b, c, firebase.auth.EmailAuthProvider.PROVIDER_ID)
                : ((f = T(f)), R('signIn', a, b, c, f));
        });
    };
    P.signIn = function (a, b, c, d) {
        var e = Ym(a),
            f = new uj(
                function () {
                    var g = f,
                        h = g.ta() || '';
                    h && an(a, g, h);
                },
                e
                    ? null
                    : function () {
                          f.l();
                          S(a, b, c);
                      },
                c,
                V(a).N(),
                V(a).M(),
                e
            );
        f.render(b);
        X(a, f);
        d && f.I(d);
    };
    P.handleUnauthorizedUser = function (a, b, c, d) {
        function e() {
            S(a, b);
        }
        d === firebase.auth.EmailAuthProvider.PROVIDER_ID
            ? (e = function () {
                  $m(a, b);
              })
            : d === firebase.auth.PhoneAuthProvider.PROVIDER_ID &&
              (e = function () {
                  R('phoneSignInStart', a, b);
              });
        var f = null,
            g = null;
        d === firebase.auth.EmailAuthProvider.PROVIDER_ID && jm(V(a))
            ? ((f = pm(V(a))), (g = qm(V(a))))
            : km(V(a)) && ((f = nm(V(a))), (g = om(V(a))));
        var h = new wj(
            c,
            function () {
                h.l();
                e();
            },
            f,
            g,
            V(a).N(),
            V(a).M()
        );
        h.render(b);
        X(a, h);
    };
    P.unsupportedProvider = function (a, b, c) {
        var d = new xj(
            c,
            function () {
                d.l();
                R('passwordRecovery', a, b, c);
            },
            function () {
                d.l();
                S(a, b, c);
            },
            V(a).N(),
            V(a).M()
        );
        d.render(b);
        X(a, d);
    };
    function Hn(a, b) {
        this.Je = !1;
        var c = In(b);
        if (Jn[c]) throw Error('An AuthUI instance already exists for the key "' + c + '"');
        Jn[c] = this;
        this.Ba = a;
        this.mf = null;
        this.Rd = !1;
        Kn(this.Ba);
        this.Ja = firebase
            .initializeApp(
                { apiKey: a.app.options.apiKey, authDomain: a.app.options.authDomain },
                a.app.name + '-firebaseui-temp'
            )
            .auth();
        if ((a = a.emulatorConfig))
            (c = a.port), this.Ja.useEmulator(a.protocol + '://' + a.host + (null === c ? '' : ':' + c), a.options);
        Kn(this.Ja);
        this.Ja.setPersistence && this.Ja.setPersistence(firebase.auth.Auth.Persistence.SESSION);
        this.dg = b;
        this.o = new Zl();
        this.L = this.fd = this.ob = this.uc = this.cd = null;
        this.gb = [];
        this.ve = !1;
        this.Jd = Ek.Ed();
        this.cb = this.lc = null;
        this.Kf = this.ac = !1;
    }
    function Kn(a) {
        a && a.INTERNAL && a.INTERNAL.logFramework && a.INTERNAL.logFramework('FirebaseUI-web');
    }
    var Jn = {};
    function In(a) {
        return a || '[DEFAULT]';
    }
    Hn.prototype.getRedirectResult = function () {
        Y(this);
        if (!this.ob) {
            var a = this;
            this.ob = Ln(this, function (b) {
                return b && !Ql(W(a))
                    ? G(
                          Dn(a)
                              .getRedirectResult()
                              .then(
                                  function (c) {
                                      return c;
                                  },
                                  function (c) {
                                      if (c && 'auth/email-already-in-use' == c.code && c.email && c.credential)
                                          throw c;
                                      return Mn(a, c);
                                  }
                              )
                      )
                    : G(
                          a
                              .u()
                              .getRedirectResult()
                              .then(function (c) {
                                  return $l(V(a)) && !c.user && a.cb && !a.cb.isAnonymous
                                      ? Dn(a).getRedirectResult()
                                      : c;
                              })
                      );
            });
        }
        return this.ob;
    };
    function X(a, b) {
        Y(a);
        a.L = b;
    }
    var Nn = null;
    k = Hn.prototype;
    k.u = function () {
        Y(this);
        return this.Ja;
    };
    function Dn(a) {
        Y(a);
        return a.Ba;
    }
    function W(a) {
        Y(a);
        return a.dg;
    }
    function Fn(a) {
        Y(a);
        return a.cd ? a.cd.emailHint : void 0;
    }
    k.$e = function () {
        Y(this);
        return !!Tl(W(this)) || On(kk());
    };
    function On(a) {
        a = new yj(a);
        return 'signIn' === (a.Y.X.get(O.Xf) || null) && !!a.Y.X.get(O.se);
    }
    k.start = function (a, b) {
        Pn(this, a, b);
    };
    function Pn(a, b, c, d) {
        Y(a);
        'undefined' !== typeof a.Ba.languageCode && (a.mf = a.Ba.languageCode);
        var e = 'fr'.replace(/_/g, '-');
        a.Ba.languageCode = e;
        a.Ja.languageCode = e;
        a.Rd = !0;
        'undefined' !== typeof a.Ba.tenantId && (a.Ja.tenantId = a.Ba.tenantId);
        a.Kb(c);
        a.cd = d || null;
        var f = r.document;
        a.lc
            ? a.lc.then(function () {
                  'complete' == f.readyState
                      ? Qn(a, b)
                      : Ge(window, 'load', function () {
                            Qn(a, b);
                        });
              })
            : 'complete' == f.readyState
            ? Qn(a, b)
            : Ge(window, 'load', function () {
                  Qn(a, b);
              });
    }
    function Qn(a, b) {
        var c = jk(b, 'Could not find the FirebaseUI widget element on the page.');
        c.setAttribute('lang', 'fr'.replace(/_/g, '-'));
        if (Nn) {
            var d = Nn;
            Y(d);
            Ql(W(d)) &&
                ml(
                    'UI Widget is already rendered on the page and is pending some user interaction. Only one widget instance can be rendered per page. The previous instance has been automatically reset.'
                );
            Nn.reset();
        }
        Nn = a;
        a.fd = c;
        Rn(a, c);
        if (tl(new ul()) && tl(new vl())) {
            b = jk(b, 'Could not find the FirebaseUI widget element on the page.');
            c = kk();
            d = Ej(V(a).o, 'queryParameterForSignInSuccessUrl');
            c = (c = nc(c, d)) ? pb(tb(c) || wb) : null;
            a: {
                d = kk();
                var e = wm(V(a));
                d = nc(d, e) || '';
                for (f in Hm)
                    if (Hm[f].toLowerCase() == d.toLowerCase()) {
                        var f = Hm[f];
                        break a;
                    }
                f = 'callback';
            }
            switch (f) {
                case 'callback':
                    c && ((f = W(a)), Ol(Jl, c, f));
                    a.$e() ? R('callback', a, b) : S(a, b, Fn(a));
                    break;
                case 'resetPassword':
                    R('passwordReset', a, b, dn(), en());
                    break;
                case 'recoverEmail':
                    R('emailChangeRevocation', a, b, dn());
                    break;
                case 'revertSecondFactorAddition':
                    R('revertSecondFactorAddition', a, b, dn());
                    break;
                case 'verifyEmail':
                    R('emailVerification', a, b, dn(), en());
                    break;
                case 'verifyAndChangeEmail':
                    R('verifyAndChangeEmail', a, b, dn(), en());
                    break;
                case 'signIn':
                    R('emailLinkSignInCallback', a, b, kk());
                    Sn();
                    break;
                case 'select':
                    c && ((f = W(a)), Ol(Jl, c, f));
                    S(a, b);
                    break;
                default:
                    throw Error('Unhandled widget operation.');
            }
            b = V(a);
            (b = Fm(b).uiShown || null) && b();
        } else
            (b = jk(b, 'Could not find the FirebaseUI widget element on the page.')),
                (f = (
                    C['firebaseui.auth.soy2.strings.errorNoWebStorage']
                        ? C['firebaseui.auth.soy2.strings.errorNoWebStorage'](void 0, void 0)
                        : "Le navigateur que vous utilisez n'est pas compatible avec le stockage Web. Veuillez r\u00e9essayer dans un navigateur diff\u00e9rent."
                ).toString()),
                (f = new hj(f)),
                f.render(b),
                X(a, f);
        b = a.L && 'blank' == a.L.Wc && Bm(V(a));
        Tl(W(a)) && !b && ((b = Tl(W(a))), a.ge(b.Xb()), Nl(Il, W(a)));
    }
    function Ln(a, b) {
        if (a.ac) return b(Tn(a));
        U(a, function () {
            a.ac = !1;
        });
        if ($l(V(a))) {
            var c = new F(function (d) {
                U(
                    a,
                    a.Ba.onAuthStateChanged(function (e) {
                        a.cb = e;
                        a.ac || ((a.ac = !0), d(b(Tn(a))));
                    })
                );
            });
            U(a, c);
            return c;
        }
        a.ac = !0;
        return b(null);
    }
    function Tn(a) {
        Y(a);
        return $l(V(a)) && a.cb && a.cb.isAnonymous ? a.cb : null;
    }
    function U(a, b) {
        Y(a);
        if (b) {
            a.gb.push(b);
            var c = function () {
                La(a.gb, function (d) {
                    return d == b;
                });
            };
            'function' != typeof b && b.then(c, c);
        }
    }
    k.Ag = function () {
        Y(this);
        this.ve = !0;
    };
    function Un(a) {
        Y(a);
        var b;
        (b = a.ve) ||
            ((a = V(a)),
            (a = sm(a, firebase.auth.GoogleAuthProvider.PROVIDER_ID)),
            (b = !(!a || 'select_account' !== a.prompt)));
        return b;
    }
    function Om(a) {
        'undefined' !== typeof a.Ba.languageCode && a.Rd && ((a.Rd = !1), (a.Ba.languageCode = a.mf));
    }
    k.ge = function (a) {
        this.Ba.tenantId = a;
        this.Ja.tenantId = a;
    };
    k.Xb = function () {
        return this.Ja.tenantId || null;
    };
    k.reset = function () {
        Y(this);
        var a = this;
        this.fd && this.fd.removeAttribute('lang');
        this.uc && this.uc.unregister();
        Om(this);
        this.cd = null;
        Sn();
        Nl(Il, W(this));
        Y(this);
        this.Jd.cancel();
        this.ob = G({ user: null, credential: null });
        Nn == this && (Nn = null);
        this.fd = null;
        for (var b = 0; b < this.gb.length; b++)
            if ('function' == typeof this.gb[b]) this.gb[b]();
            else this.gb[b].cancel && this.gb[b].cancel();
        this.gb = [];
        Rl(W(this));
        this.L && (this.L.l(), (this.L = null));
        this.Cc = null;
        this.Ja &&
            (this.lc = qn(this).then(
                function () {
                    a.lc = null;
                },
                function () {
                    a.lc = null;
                }
            ));
    };
    function Rn(a, b) {
        a.Cc = null;
        a.uc = new Rh(b);
        a.uc.register();
        Fe(a.uc, 'pageEnter', function (c) {
            c = c && c.pageId;
            if (a.Cc != c) {
                var d = V(a);
                (d = Fm(d).uiChanged || null) && d(a.Cc, c);
                a.Cc = c;
            }
        });
    }
    k.Kb = function (a) {
        Y(this);
        this.o.Kb(a);
        !this.Kf &&
            Em(V(this)) &&
            (ml('signInSuccess callback is deprecated. Please use signInSuccessWithAuthResult callback instead.'),
            (this.Kf = !0));
    };
    function V(a) {
        Y(a);
        return a.o;
    }
    k.signIn = function () {
        Y(this);
        var a = V(this),
            b = Ej(a.o, 'widgetUrl');
        a = wm(a);
        var c = b.search(mc);
        for (var d = 0, e, f = []; 0 <= (e = lc(b, d, a, c)); )
            f.push(b.substring(d, e)), (d = Math.min(b.indexOf('&', e) + 1 || c, c));
        f.push(b.substr(d));
        b = f.join('').replace(oc, '$1');
        c = '=' + encodeURIComponent('select');
        (a += c)
            ? ((c = b.indexOf('#')),
              0 > c && (c = b.length),
              (d = b.indexOf('?')),
              0 > d || d > c ? ((d = c), (e = '')) : (e = b.substring(d + 1, c)),
              (b = [b.substr(0, d), e, b.substr(c)]),
              (c = b[1]),
              (b[1] = a ? (c ? c + '&' + a : a) : c),
              (c = b[0] + (b[1] ? '?' + b[1] : '') + b[2]))
            : (c = b);
        V(this).o.get('popupMode')
            ? ((a = (window.screen.availHeight - 600) / 2),
              (b = (window.screen.availWidth - 500) / 2),
              (c = c || 'about:blank'),
              (a = {
                  width: 500,
                  height: 600,
                  top: 0 < a ? a : 0,
                  left: 0 < b ? b : 0,
                  location: !0,
                  resizable: !0,
                  statusbar: !0,
                  toolbar: !1
              }),
              (a.target = a.target || c.target || 'google_popup'),
              (a.width = a.width || 690),
              (a.height = a.height || 500),
              (a = le(c, a)) && a.focus())
            : Sb(window.location, c);
    };
    function Y(a) {
        if (a.Je) throw Error('AuthUI instance is deleted!');
    }
    k.delete = function () {
        var a = this;
        Y(this);
        return this.Ja.app.delete().then(function () {
            var b = In(W(a));
            delete Jn[b];
            a.reset();
            a.Je = !0;
        });
    };
    function Gn(a) {
        Y(a);
        try {
            a.Jd.show(hm(V(a)), Un(a)).then(function (b) {
                return a.L ? Wm(a, a.L, b) : !1;
            });
        } catch (b) {}
    }
    k.sendSignInLinkToEmail = function (a, b) {
        Y(this);
        var c = this,
            d = mk();
        if (!ym(V(this))) return zf(Error('Email link sign-in should be enabled to trigger email sending.'));
        var e = Am(V(this)),
            f = new yj(e.url);
        zj(f, d);
        b && b.Ca && (Xl(d, b, W(this)), Cj(f, b.Ca.providerId));
        Aj(f, zm(V(this)));
        return Ln(this, function (g) {
            g && ((g = g.uid) ? Cc(f.Y, O.jd, g) : f.Y.removeParameter(O.jd));
            e.url = f.toString();
            return c.u().sendSignInLinkToEmail(a, e);
        }).then(
            function () {
                var g = W(c),
                    h = {};
                h.email = a;
                Ol(Kl, ek(d, JSON.stringify(h)), g);
            },
            function (g) {
                Nl(Ll, W(c));
                Nl(Kl, W(c));
                throw g;
            }
        );
    };
    function sn(a, b) {
        var c = Bj(new yj(b));
        if (!c) return G(null);
        b = new F(function (d, e) {
            var f = Dn(a).onAuthStateChanged(function (g) {
                f();
                g && g.isAnonymous && g.uid === c
                    ? d(g)
                    : g && g.isAnonymous && g.uid !== c
                    ? e(Error('anonymous-user-mismatch'))
                    : e(Error('anonymous-user-not-found'));
            });
            U(a, f);
        });
        U(a, b);
        return b;
    }
    function wn(a, b, c, d, e) {
        Y(a);
        var f = e || null,
            g = firebase.auth.EmailAuthProvider.credentialWithLink(c, d);
        c = f
            ? a
                  .u()
                  .signInWithEmailLink(c, d)
                  .then(function (h) {
                      return h.user.linkWithCredential(f);
                  })
                  .then(function () {
                      return qn(a);
                  })
                  .then(function () {
                      return Mn(a, { code: 'auth/email-already-in-use' }, f);
                  })
            : a
                  .u()
                  .fetchSignInMethodsForEmail(c)
                  .then(function (h) {
                      return h.length ? Mn(a, { code: 'auth/email-already-in-use' }, g) : b.linkWithCredential(g);
                  });
        U(a, c);
        return c;
    }
    k.signInWithEmailLink = function (a, b, c) {
        Y(this);
        var d = c || null,
            e,
            f = this;
        a = this.u()
            .signInWithEmailLink(a, b)
            .then(function (g) {
                e = {
                    user: g.user,
                    credential: null,
                    operationType: g.operationType,
                    additionalUserInfo: g.additionalUserInfo
                };
                if (d)
                    return g.user.linkWithCredential(d).then(function (h) {
                        e = {
                            user: h.user,
                            credential: d,
                            operationType: e.operationType,
                            additionalUserInfo: h.additionalUserInfo
                        };
                    });
            })
            .then(function () {
                qn(f);
            })
            .then(function () {
                return Dn(f).updateCurrentUser(e.user);
            })
            .then(function () {
                e.user = Dn(f).currentUser;
                return e;
            });
        U(this, a);
        return a;
    };
    function Sn() {
        var a = kk();
        if (On(a)) {
            a = new yj(a);
            for (var b in O) O.hasOwnProperty(b) && a.Y.removeParameter(O[b]);
            b = { state: 'signIn', mode: 'emailLink', operation: 'clear' };
            var c = r.document.title;
            r.history && r.history.replaceState && r.history.replaceState(b, c, a.toString());
        }
    }
    k.Kh = function (a, b) {
        Y(this);
        var c = this;
        return this.u()
            .signInWithEmailAndPassword(a, b)
            .then(function (d) {
                return Ln(c, function (e) {
                    return e
                        ? qn(c).then(function () {
                              return Mn(
                                  c,
                                  { code: 'auth/email-already-in-use' },
                                  firebase.auth.EmailAuthProvider.credential(a, b)
                              );
                          })
                        : d;
                });
            });
    };
    k.Gh = function (a, b) {
        Y(this);
        var c = this;
        return Ln(this, function (d) {
            if (d) {
                var e = firebase.auth.EmailAuthProvider.credential(a, b);
                return d.linkWithCredential(e);
            }
            return c.u().createUserWithEmailAndPassword(a, b);
        });
    };
    k.Jh = function (a) {
        Y(this);
        var b = this;
        return Ln(this, function (c) {
            return c
                ? c.linkWithCredential(a).then(
                      function (d) {
                          return d;
                      },
                      function (d) {
                          if (d && 'auth/email-already-in-use' == d.code && d.email && d.credential) throw d;
                          return Mn(b, d, a);
                      }
                  )
                : b.u().signInWithCredential(a);
        });
    };
    function Um(a, b) {
        Y(a);
        return Ln(a, function (c) {
            return c && !Ql(W(a))
                ? c.linkWithPopup(b).then(
                      function (d) {
                          return d;
                      },
                      function (d) {
                          if (d && 'auth/email-already-in-use' == d.code && d.email && d.credential) throw d;
                          return Mn(a, d);
                      }
                  )
                : a.u().signInWithPopup(b);
        });
    }
    k.Mh = function (a) {
        Y(this);
        var b = this,
            c = this.ob;
        this.ob = null;
        return Ln(this, function (d) {
            return d && !Ql(W(b)) ? d.linkWithRedirect(a) : b.u().signInWithRedirect(a);
        }).then(
            function () {},
            function (d) {
                b.ob = c;
                throw d;
            }
        );
    };
    k.Lh = function (a, b) {
        Y(this);
        var c = this;
        return Ln(this, function (d) {
            return d
                ? d.linkWithPhoneNumber(a, b).then(function (e) {
                      return new pl(e, function (f) {
                          if ('auth/credential-already-in-use' == f.code) return Mn(c, f);
                          throw f;
                      });
                  })
                : Dn(c)
                      .signInWithPhoneNumber(a, b)
                      .then(function (e) {
                          return new pl(e);
                      });
        });
    };
    k.Ih = function () {
        Y(this);
        return Dn(this).signInAnonymously();
    };
    function Qm(a, b) {
        Y(a);
        return Ln(a, function (c) {
            if (a.cb && !a.cb.isAnonymous && $l(V(a)) && !a.u().currentUser)
                return qn(a).then(function () {
                    'password' == b.credential.providerId && (b.credential = null);
                    return b;
                });
            if (c)
                return qn(a)
                    .then(function () {
                        return c.linkWithCredential(b.credential);
                    })
                    .then(
                        function (d) {
                            b.user = d.user;
                            b.credential = d.credential;
                            b.operationType = d.operationType;
                            b.additionalUserInfo = d.additionalUserInfo;
                            return b;
                        },
                        function (d) {
                            if (d && 'auth/email-already-in-use' == d.code && d.email && d.credential) throw d;
                            return Mn(a, d, b.credential);
                        }
                    );
            if (!b.user)
                throw Error('Internal error: An incompatible or outdated version of "firebase.js" may be used.');
            return qn(a)
                .then(function () {
                    return Dn(a).updateCurrentUser(b.user);
                })
                .then(function () {
                    b.user = Dn(a).currentUser;
                    b.operationType = 'signIn';
                    b.credential &&
                        b.credential.providerId &&
                        'password' == b.credential.providerId &&
                        (b.credential = null);
                    return b;
                });
        });
    }
    k.Fh = function (a, b) {
        Y(this);
        return this.u().signInWithEmailAndPassword(a, b);
    };
    function qn(a) {
        Y(a);
        return a.u().signOut();
    }
    function Mn(a, b, c) {
        Y(a);
        if (b && b.code && ('auth/email-already-in-use' == b.code || 'auth/credential-already-in-use' == b.code)) {
            var d = am(V(a));
            return G()
                .then(function () {
                    return d(new Yl('anonymous-upgrade-merge-conflict', null, c || b.credential));
                })
                .then(function () {
                    a.L && (a.L.l(), (a.L = null));
                    throw b;
                });
        }
        return zf(b);
    }
    function Vn(a) {
        this.o = new Dj();
        this.o.define('authDomain');
        this.o.define('displayMode', 'optionFirst');
        this.o.define('tenants');
        this.o.define('callbacks');
        this.o.define('tosUrl');
        this.o.define('privacyPolicyUrl');
        this.Kb(a);
    }
    Vn.prototype.Kb = function (a) {
        for (var b in a)
            if (a.hasOwnProperty(b))
                try {
                    this.o.update(b, a[b]);
                } catch (c) {
                    al('Invalid config: "' + b + '"', void 0);
                }
    };
    function Wn(a) {
        a = a.o.get('displayMode');
        for (var b in Xn) if (Xn[b] === a) return Xn[b];
        return 'optionFirst';
    }
    Vn.prototype.N = function () {
        var a = this.o.get('tosUrl') || null,
            b = this.o.get('privacyPolicyUrl') || null;
        a && !b && ml('Privacy Policy URL is missing, the link will not be displayed.');
        if (a && b) {
            if ('function' === typeof a) return a;
            if ('string' === typeof a)
                return function () {
                    ik(a);
                };
        }
        return null;
    };
    Vn.prototype.M = function () {
        var a = this.o.get('tosUrl') || null,
            b = this.o.get('privacyPolicyUrl') || null;
        b && !a && ml('Terms of Service URL is missing, the link will not be displayed.');
        if (a && b) {
            if ('function' === typeof b) return b;
            if ('string' === typeof b)
                return function () {
                    ik(b);
                };
        }
        return null;
    };
    function Yn(a, b) {
        a = a.o.get('tenants');
        if (!a || (!a.hasOwnProperty(b) && !a.hasOwnProperty('*'))) throw Error('Invalid tenant configuration!');
    }
    function Zn(a, b, c) {
        a = a.o.get('tenants');
        if (!a) throw Error('Invalid tenant configuration!');
        var d = [];
        a = a[b] || a['*'];
        if (!a) return al('Invalid tenant configuration: ' + (b + ' is not configured!'), void 0), d;
        b = a.signInOptions;
        if (!b) throw Error('Invalid tenant configuration: signInOptions are invalid!');
        b.forEach(function (e) {
            if ('string' === typeof e) d.push(e);
            else if ('string' === typeof e.provider) {
                var f = e.hd;
                f && c
                    ? (f instanceof RegExp ? f : new RegExp('@' + f.replace('.', '\\.') + '$')).test(c) &&
                      d.push(e.provider)
                    : d.push(e.provider);
            } else
                (e = 'Invalid tenant configuration: signInOption ' + (JSON.stringify(e) + ' is invalid!')),
                    al(e, void 0);
        });
        return d;
    }
    function $n(a, b, c) {
        a = ao(a, b);
        (b = a.signInOptions) &&
            c &&
            ((b = b.filter(function (d) {
                return 'string' === typeof d ? c.includes(d) : c.includes(d.provider);
            })),
            (a.signInOptions = b));
        return a;
    }
    function ao(a, b) {
        var c = bo;
        var d = void 0 === d ? {} : d;
        Yn(a, b);
        a = a.o.get('tenants');
        return nk(a[b] || a['*'], c, d);
    }
    var bo = ['immediateFederatedRedirect', 'privacyPolicyUrl', 'signInFlow', 'signInOptions', 'tosUrl'],
        Xn = { bi: 'optionFirst', $h: 'identifierFirst' };
    function co(a, b) {
        var c = this;
        this.kb = jk(a);
        this.W = {};
        Object.keys(b).forEach(function (d) {
            c.W[d] = new Vn(b[d]);
        });
        this.af = this.L = this.Ia = this.za = this.ub = this.Za = null;
        Object.defineProperty(this, 'languageCode', {
            get: function () {
                return this.af;
            },
            set: function (d) {
                this.af = d || null;
            },
            enumerable: !1
        });
    }
    k = co.prototype;
    k.xh = function (a, b) {
        var c = this;
        eo(this);
        var d = a.apiKey;
        return new F(function (e, f) {
            if (c.W.hasOwnProperty(d)) {
                var g = Fm(c.W[d]).selectTenantUiHidden || null;
                if ('optionFirst' === Wn(c.W[d])) {
                    var h = [];
                    b.forEach(function (m) {
                        m = m || '_';
                        var q = c.W[d].o.get('tenants');
                        if (!q) throw Error('Invalid tenant configuration!');
                        (q = q[m] || q['*'])
                            ? (m = {
                                  tenantId: '_' !== m ? m : null,
                                  va: q.fullLabel || null,
                                  displayName: q.displayName,
                                  $b: q.iconUrl,
                                  Rb: q.buttonColor
                              })
                            : (al('Invalid tenant configuration: ' + (m + ' is not configured!'), void 0), (m = null));
                        m && h.push(m);
                    });
                    var n = function (m) {
                        m = { tenantId: m, providerIds: Zn(c.W[d], m || '_') };
                        e(m);
                    };
                    if (1 === h.length) {
                        n(h[0].tenantId);
                        return;
                    }
                    c.L = new sj(
                        function (m) {
                            eo(c);
                            g && g();
                            n(m);
                        },
                        h,
                        c.W[d].N(),
                        c.W[d].M()
                    );
                } else
                    c.L = new pj(
                        function () {
                            var m = c.L.ta();
                            if (m) {
                                for (var q = 0; q < b.length; q++) {
                                    var A = Zn(c.W[d], b[q] || '_', m);
                                    if (0 !== A.length) {
                                        m = { tenantId: b[q], providerIds: A, email: m };
                                        eo(c);
                                        g && g();
                                        e(m);
                                        return;
                                    }
                                }
                                c.L.I(Cg({ code: 'no-matching-tenant-for-email' }).toString());
                            }
                        },
                        c.W[d].N(),
                        c.W[d].M()
                    );
                c.L.render(c.kb);
                (f = Fm(c.W[d]).selectTenantUiShown || null) && f();
            } else {
                var p = Error('Invalid project configuration: API key is invalid!');
                p.code = 'invalid-configuration';
                c.handleError(p);
                f(p);
            }
        });
    };
    k.u = function (a, b) {
        if (!this.W.hasOwnProperty(a)) throw Error('Invalid project configuration: API key is invalid!');
        var c = b || void 0;
        Yn(this.W[a], b || '_');
        try {
            this.ub = firebase.app(c).auth();
        } catch (e) {
            var d = this.W[a].o.get('authDomain');
            if (!d) throw Error('Invalid project configuration: authDomain is required!');
            a = firebase.initializeApp({ apiKey: a, authDomain: d }, c);
            a.auth().tenantId = b;
            this.ub = a.auth();
        }
        return this.ub;
    };
    k.Hh = function (a, b) {
        var c = this;
        return new F(function (d, e) {
            function f(q, A) {
                c.Za = new Hn(a);
                Pn(c.Za, c.kb, q, A);
            }
            var g = a.app.options.apiKey;
            c.W.hasOwnProperty(g) || e(Error('Invalid project configuration: API key is invalid!'));
            var h = $n(c.W[g], a.tenantId || '_', b && b.providerIds);
            eo(c);
            e = {
                signInSuccessWithAuthResult: function (q) {
                    d(q);
                    return !1;
                }
            };
            var n = Fm(c.W[g]).signInUiShown || null,
                p = !1;
            e.uiChanged = function (q, A) {
                null === q && 'callback' === A
                    ? ((q = be('firebaseui-id-page-callback', c.kb)) && ig(q), (c.za = new vj()), c.za.render(c.kb))
                    : p ||
                      (null === q && 'spinner' === A) ||
                      'blank' === A ||
                      (c.za && (c.za.l(), (c.za = null)), (p = !0), n && n(a.tenantId));
            };
            h.callbacks = e;
            h.credentialHelper = 'none';
            var m;
            b && b.email && (m = { emailHint: b.email });
            c.Za
                ? c.Za.delete().then(function () {
                      f(h, m);
                  })
                : f(h, m);
        });
    };
    k.reset = function () {
        var a = this;
        return G()
            .then(function () {
                a.Za && a.Za.delete();
            })
            .then(function () {
                a.Za = null;
                eo(a);
            });
    };
    k.Bh = function () {
        var a = this;
        this.za ||
            this.Ia ||
            (this.Ia = window.setTimeout(function () {
                eo(a);
                a.za = new vj();
                a.L = a.za;
                a.za.render(a.kb);
                a.Ia = null;
            }, 500));
    };
    k.We = function () {
        window.clearTimeout(this.Ia);
        this.Ia = null;
        this.za && (this.za.l(), (this.za = null));
    };
    k.sg = function () {
        eo(this);
        this.L = new cj();
        this.L.render(this.kb);
        return G();
    };
    function eo(a) {
        a.Za && a.Za.reset();
        a.We();
        a.L && a.L.l();
    }
    k.handleError = function (a) {
        var b = this,
            c = Cg({ code: a.code }).toString() || a.message;
        eo(this);
        var d;
        a.retry &&
            'function' === typeof a.retry &&
            (d = function () {
                b.reset();
                a.retry();
            });
        this.L = new gj(c, d);
        this.L.render(this.kb);
    };
    k.nh = function (a) {
        var b = this;
        return G()
            .then(function () {
                var c = b.ub && b.ub.app.options.apiKey;
                if (!b.W.hasOwnProperty(c)) throw Error('Invalid project configuration: API key is invalid!');
                Yn(b.W[c], a.tenantId || '_');
                if (!b.ub.currentUser || b.ub.currentUser.uid !== a.uid)
                    throw Error('The user being processed does not match the signed in user!');
                return (c = Fm(b.W[c]).beforeSignInSuccess || null) ? c(a) : a;
            })
            .then(function (c) {
                if (c.uid !== a.uid) throw Error('User with mismatching UID returned.');
                return c;
            });
    };
    v('firebaseui.auth.FirebaseUiHandler', co);
    v('firebaseui.auth.FirebaseUiHandler.prototype.selectTenant', co.prototype.xh);
    v('firebaseui.auth.FirebaseUiHandler.prototype.getAuth', co.prototype.u);
    v('firebaseui.auth.FirebaseUiHandler.prototype.startSignIn', co.prototype.Hh);
    v('firebaseui.auth.FirebaseUiHandler.prototype.reset', co.prototype.reset);
    v('firebaseui.auth.FirebaseUiHandler.prototype.showProgressBar', co.prototype.Bh);
    v('firebaseui.auth.FirebaseUiHandler.prototype.hideProgressBar', co.prototype.We);
    v('firebaseui.auth.FirebaseUiHandler.prototype.completeSignOut', co.prototype.sg);
    v('firebaseui.auth.FirebaseUiHandler.prototype.handleError', co.prototype.handleError);
    v('firebaseui.auth.FirebaseUiHandler.prototype.processUser', co.prototype.nh);
    v('firebaseui.auth.AuthUI', Hn);
    v('firebaseui.auth.AuthUI.getInstance', function (a) {
        a = In(a);
        return Jn[a] ? Jn[a] : null;
    });
    v('firebaseui.auth.AuthUI.prototype.disableAutoSignIn', Hn.prototype.Ag);
    v('firebaseui.auth.AuthUI.prototype.start', Hn.prototype.start);
    v('firebaseui.auth.AuthUI.prototype.setConfig', Hn.prototype.Kb);
    v('firebaseui.auth.AuthUI.prototype.signIn', Hn.prototype.signIn);
    v('firebaseui.auth.AuthUI.prototype.reset', Hn.prototype.reset);
    v('firebaseui.auth.AuthUI.prototype.delete', Hn.prototype.delete);
    v('firebaseui.auth.AuthUI.prototype.isPendingRedirect', Hn.prototype.$e);
    v('firebaseui.auth.AuthUIError', Yl);
    v('firebaseui.auth.AuthUIError.prototype.toJSON', Yl.prototype.toJSON);
    v('firebaseui.auth.CredentialHelper.GOOGLE_YOLO', 'googleyolo');
    v('firebaseui.auth.CredentialHelper.NONE', 'none');
    v('firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID', 'anonymous');
    F.prototype['catch'] = F.prototype.qc;
    F.prototype['finally'] = F.prototype.Oh; /*

 Copyright 2015 Google Inc. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
    var Z = {
        Ff: function () {},
        Gf: function () {},
        Hf: function () {},
        le: function () {},
        rf: function () {},
        register: function () {},
        Ne: function () {}
    };
    Z = (function () {
        function a(m, q) {
            for (var A = 0; A < n.length; A++)
                if (n[A].className === m) return 'undefined' !== typeof q && (n[A] = q), n[A];
            return !1;
        }
        function b(m) {
            m = m.getAttribute('data-upgraded');
            return null === m ? [''] : m.split(',');
        }
        function c(m, q) {
            return -1 !== b(m).indexOf(q);
        }
        function d(m, q, A) {
            if ('CustomEvent' in window && 'function' === typeof window.CustomEvent)
                return new CustomEvent(m, { bubbles: q, cancelable: A });
            var Q = document.createEvent('Events');
            Q.initEvent(m, q, A);
            return Q;
        }
        function e(m, q) {
            if ('undefined' === typeof m && 'undefined' === typeof q)
                for (m = 0; m < n.length; m++) e(n[m].className, n[m].Da);
            else {
                if ('undefined' === typeof q) {
                    var A = a(m);
                    A && (q = A.Da);
                }
                q = document.querySelectorAll('.' + q);
                for (A = 0; A < q.length; A++) f(q[A], m);
            }
        }
        function f(m, q) {
            if (!('object' === typeof m && m instanceof Element))
                throw Error('Invalid argument provided to upgrade MDL element.');
            var A = d('mdl-componentupgrading', !0, !0);
            m.dispatchEvent(A);
            if (!A.defaultPrevented) {
                A = b(m);
                var Q = [];
                if (q) c(m, q) || Q.push(a(q));
                else {
                    var Wa = m.classList;
                    n.forEach(function (Oe) {
                        Wa.contains(Oe.Da) && -1 === Q.indexOf(Oe) && !c(m, Oe.className) && Q.push(Oe);
                    });
                }
                q = 0;
                for (var na = Q.length, ha; q < na; q++) {
                    if ((ha = Q[q])) {
                        A.push(ha.className);
                        m.setAttribute('data-upgraded', A.join(','));
                        var Ab = new ha.rg(m);
                        Ab.mdlComponentConfigInternal_ = ha;
                        p.push(Ab);
                        for (var Ig = 0, fo = ha.td.length; Ig < fo; Ig++) ha.td[Ig](m);
                        ha.wb && (m[ha.className] = Ab);
                    } else throw Error('Unable to find a registered component for the given class.');
                    ha = d('mdl-componentupgraded', !0, !1);
                    m.dispatchEvent(ha);
                }
            }
        }
        function g(m) {
            Array.isArray(m) || (m = m instanceof Element ? [m] : Array.prototype.slice.call(m));
            for (var q = 0, A = m.length, Q; q < A; q++)
                (Q = m[q]), Q instanceof HTMLElement && (f(Q), 0 < Q.children.length && g(Q.children));
        }
        function h(m) {
            if (m) {
                p.splice(p.indexOf(m), 1);
                var q = m.j.getAttribute('data-upgraded').split(',');
                q.splice(q.indexOf(m.mdlComponentConfigInternal_.zb), 1);
                m.j.setAttribute('data-upgraded', q.join(','));
                q = d('mdl-componentdowngraded', !0, !1);
                m.j.dispatchEvent(q);
            }
        }
        var n = [],
            p = [];
        return {
            Ff: e,
            Gf: f,
            Hf: g,
            le: function () {
                for (var m = 0; m < n.length; m++) e(n[m].className);
            },
            rf: function (m, q) {
                (m = a(m)) && m.td.push(q);
            },
            register: function (m) {
                var q = !0;
                if ('undefined' !== typeof m.wb || 'undefined' !== typeof m.widget) q = m.wb || m.widget;
                var A = {
                    rg: m.constructor || m.constructor,
                    className: m.zb || m.classAsString,
                    Da: m.Da || m.cssClass,
                    wb: q,
                    td: []
                };
                n.forEach(function (Q) {
                    if (Q.Da === A.Da) throw Error('The provided cssClass has already been registered: ' + Q.Da);
                    if (Q.className === A.className) throw Error('The provided className has already been registered');
                });
                if (m.constructor.prototype.hasOwnProperty('mdlComponentConfigInternal_'))
                    throw Error(
                        'MDL component classes must not have mdlComponentConfigInternal_ defined as a property.'
                    );
                a(m.zb, A) || n.push(A);
            },
            Ne: function (m) {
                function q(Q) {
                    p.filter(function (Wa) {
                        return Wa.j === Q;
                    }).forEach(h);
                }
                if (m instanceof Array || m instanceof NodeList) for (var A = 0; A < m.length; A++) q(m[A]);
                else if (m instanceof Node) q(m);
                else throw Error('Invalid argument provided to downgrade MDL nodes.');
            }
        };
    })();
    Z.upgradeDom = Z.Ff;
    Z.upgradeElement = Z.Gf;
    Z.upgradeElements = Z.Hf;
    Z.upgradeAllRegistered = Z.le;
    Z.registerUpgradedCallback = Z.rf;
    Z.register = Z.register;
    Z.downgradeElements = Z.Ne;
    window.componentHandler = Z;
    window.addEventListener('load', function () {
        'classList' in document.createElement('div') &&
            'querySelector' in document &&
            'addEventListener' in window &&
            Array.prototype.forEach &&
            (document.documentElement.classList.add('mdl-js'), Z.le());
    });
    (function () {
        function a(b) {
            this.j = b;
            this.init();
        }
        window.MaterialButton = a;
        a.prototype.Sa = {};
        a.prototype.G = { $f: 'mdl-js-ripple-effect', Zf: 'mdl-button__ripple-container', Yf: 'mdl-ripple' };
        a.prototype.xe = function (b) {
            b && this.j.blur();
        };
        a.prototype.disable = function () {
            this.j.disabled = !0;
        };
        a.prototype.disable = a.prototype.disable;
        a.prototype.enable = function () {
            this.j.disabled = !1;
        };
        a.prototype.enable = a.prototype.enable;
        a.prototype.init = function () {
            if (this.j) {
                if (this.j.classList.contains(this.G.$f)) {
                    var b = document.createElement('span');
                    b.classList.add(this.G.Zf);
                    this.be = document.createElement('span');
                    this.be.classList.add(this.G.Yf);
                    b.appendChild(this.be);
                    this.kg = this.xe.bind(this);
                    this.be.addEventListener('mouseup', this.kg);
                    this.j.appendChild(b);
                }
                this.ye = this.xe.bind(this);
                this.j.addEventListener('mouseup', this.ye);
                this.j.addEventListener('mouseleave', this.ye);
            }
        };
        Z.register({ constructor: a, zb: 'MaterialButton', Da: 'mdl-js-button', wb: !0 });
    })();
    (function () {
        function a(b) {
            this.j = b;
            this.init();
        }
        window.MaterialProgress = a;
        a.prototype.Sa = {};
        a.prototype.G = { Pf: 'mdl-progress__indeterminate' };
        a.prototype.zh = function (b) {
            this.j.classList.contains(this.G.Pf) || (this.pf.style.width = b + '%');
        };
        a.prototype.setProgress = a.prototype.zh;
        a.prototype.yh = function (b) {
            this.Be.style.width = b + '%';
            this.we.style.width = 100 - b + '%';
        };
        a.prototype.setBuffer = a.prototype.yh;
        a.prototype.init = function () {
            if (this.j) {
                var b = document.createElement('div');
                b.className = 'progressbar bar bar1';
                this.j.appendChild(b);
                this.pf = b;
                b = document.createElement('div');
                b.className = 'bufferbar bar bar2';
                this.j.appendChild(b);
                this.Be = b;
                b = document.createElement('div');
                b.className = 'auxbar bar bar3';
                this.j.appendChild(b);
                this.we = b;
                this.pf.style.width = '0%';
                this.Be.style.width = '100%';
                this.we.style.width = '0%';
                this.j.classList.add('is-upgraded');
            }
        };
        Z.register({ constructor: a, zb: 'MaterialProgress', Da: 'mdl-js-progress', wb: !0 });
    })();
    (function () {
        function a(b) {
            this.j = b;
            this.init();
        }
        window.MaterialSpinner = a;
        a.prototype.Sa = { Uf: 4 };
        a.prototype.G = {
            re: 'mdl-spinner__layer',
            qe: 'mdl-spinner__circle-clipper',
            Sf: 'mdl-spinner__circle',
            Tf: 'mdl-spinner__gap-patch',
            Vf: 'mdl-spinner__left',
            Wf: 'mdl-spinner__right'
        };
        a.prototype.Ge = function (b) {
            var c = document.createElement('div');
            c.classList.add(this.G.re);
            c.classList.add(this.G.re + '-' + b);
            b = document.createElement('div');
            b.classList.add(this.G.qe);
            b.classList.add(this.G.Vf);
            var d = document.createElement('div');
            d.classList.add(this.G.Tf);
            var e = document.createElement('div');
            e.classList.add(this.G.qe);
            e.classList.add(this.G.Wf);
            for (var f = [b, d, e], g = 0; g < f.length; g++) {
                var h = document.createElement('div');
                h.classList.add(this.G.Sf);
                f[g].appendChild(h);
            }
            c.appendChild(b);
            c.appendChild(d);
            c.appendChild(e);
            this.j.appendChild(c);
        };
        a.prototype.createLayer = a.prototype.Ge;
        a.prototype.stop = function () {
            this.j.classList.remove('is-active');
        };
        a.prototype.stop = a.prototype.stop;
        a.prototype.start = function () {
            this.j.classList.add('is-active');
        };
        a.prototype.start = a.prototype.start;
        a.prototype.init = function () {
            if (this.j) {
                for (var b = 1; b <= this.Sa.Uf; b++) this.Ge(b);
                this.j.classList.add('is-upgraded');
            }
        };
        Z.register({ constructor: a, zb: 'MaterialSpinner', Da: 'mdl-js-spinner', wb: !0 });
    })();
    (function () {
        function a(b) {
            this.j = b;
            this.dc = this.Sa.ld;
            this.init();
        }
        window.MaterialTextfield = a;
        a.prototype.Sa = { ld: -1, pe: 'maxrows' };
        a.prototype.G = {
            ai: 'mdl-textfield__label',
            Qf: 'mdl-textfield__input',
            ne: 'is-dirty',
            vc: 'is-focused',
            oe: 'is-disabled',
            wc: 'is-invalid',
            Rf: 'is-upgraded',
            Of: 'has-placeholder'
        };
        a.prototype.lh = function (b) {
            var c = b.target.value.split('\n').length;
            13 === b.keyCode && c >= this.dc && b.preventDefault();
        };
        a.prototype.kh = function () {
            this.j.classList.add(this.G.vc);
        };
        a.prototype.jh = function () {
            this.j.classList.remove(this.G.vc);
        };
        a.prototype.mh = function () {
            this.Ob();
        };
        a.prototype.Ob = function () {
            this.Ee();
            this.checkValidity();
            this.De();
            this.wd();
        };
        a.prototype.Ee = function () {
            this.ba.disabled ? this.j.classList.add(this.G.oe) : this.j.classList.remove(this.G.oe);
        };
        a.prototype.checkDisabled = a.prototype.Ee;
        a.prototype.wd = function () {
            this.j.querySelector(':focus') ? this.j.classList.add(this.G.vc) : this.j.classList.remove(this.G.vc);
        };
        a.prototype.checkFocus = a.prototype.wd;
        a.prototype.checkValidity = function () {
            this.ba.validity &&
                (this.ba.validity.valid ? this.j.classList.remove(this.G.wc) : this.j.classList.add(this.G.wc));
        };
        a.prototype.checkValidity = a.prototype.checkValidity;
        a.prototype.De = function () {
            this.ba.value && 0 < this.ba.value.length
                ? this.j.classList.add(this.G.ne)
                : this.j.classList.remove(this.G.ne);
        };
        a.prototype.checkDirty = a.prototype.De;
        a.prototype.disable = function () {
            this.ba.disabled = !0;
            this.Ob();
        };
        a.prototype.disable = a.prototype.disable;
        a.prototype.enable = function () {
            this.ba.disabled = !1;
            this.Ob();
        };
        a.prototype.enable = a.prototype.enable;
        a.prototype.mg = function (b) {
            this.ba.value = b || '';
            this.Ob();
        };
        a.prototype.change = a.prototype.mg;
        a.prototype.init = function () {
            if (this.j && (this.ba = this.j.querySelector('.' + this.G.Qf))) {
                this.ba.hasAttribute(this.Sa.pe) &&
                    ((this.dc = parseInt(this.ba.getAttribute(this.Sa.pe), 10)),
                    isNaN(this.dc) && (this.dc = this.Sa.ld));
                this.ba.hasAttribute('placeholder') && this.j.classList.add(this.G.Of);
                this.lg = this.Ob.bind(this);
                this.hg = this.kh.bind(this);
                this.gg = this.jh.bind(this);
                this.jg = this.mh.bind(this);
                this.ba.addEventListener('input', this.lg);
                this.ba.addEventListener('focus', this.hg);
                this.ba.addEventListener('blur', this.gg);
                this.ba.addEventListener('reset', this.jg);
                this.dc !== this.Sa.ld &&
                    ((this.ig = this.lh.bind(this)), this.ba.addEventListener('keydown', this.ig));
                var b = this.j.classList.contains(this.G.wc);
                this.Ob();
                this.j.classList.add(this.G.Rf);
                b && this.j.classList.add(this.G.wc);
                this.ba.hasAttribute('autofocus') && (this.j.focus(), this.wd());
            }
        };
        Z.register({ constructor: a, zb: 'MaterialTextfield', Da: 'mdl-js-textfield', wb: !0 });
    })(); /*

 Copyright (c) 2013 The Chromium Authors. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are
 met:

    * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above
 copyright notice, this list of conditions and the following disclaimer
 in the documentation and/or other materials provided with the
 distribution.
    * Neither the name of Google Inc. nor the names of its
 contributors may be used to endorse or promote products derived from
 this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
    (function () {
        function a(f) {
            for (; f; ) {
                if ('DIALOG' == f.nodeName.toUpperCase()) return f;
                f = f.parentElement;
            }
            return null;
        }
        function b(f) {
            f && f.blur && f != document.body && f.blur();
        }
        function c(f) {
            this.U = f;
            this.Ud = this.$c = !1;
            f.hasAttribute('role') || f.setAttribute('role', 'dialog');
            f.show = this.show.bind(this);
            f.showModal = this.showModal.bind(this);
            f.close = this.close.bind(this);
            'returnValue' in f || (f.returnValue = '');
            this.Hb = this.Hb.bind(this);
            'MutationObserver' in window
                ? new MutationObserver(this.Hb).observe(f, { attributes: !0, attributeFilter: ['open'] })
                : f.addEventListener('DOMAttrModified', this.Hb);
            Object.defineProperty(f, 'open', { set: this.ee.bind(this), get: f.hasAttribute.bind(f, 'open') });
            this.$a = document.createElement('div');
            this.$a.className = 'backdrop';
            this.xc = this.xc.bind(this);
        }
        var d = window.CustomEvent;
        (d && 'object' != typeof d) ||
            ((d = function (f, g) {
                g = g || {};
                var h = document.createEvent('CustomEvent');
                h.initCustomEvent(f, !!g.bubbles, !!g.cancelable, g.detail || null);
                return h;
            }),
            (d.prototype = window.Event.prototype));
        c.prototype = {
            get Ke() {
                return this.U;
            },
            Hb: function () {
                !this.Ud ||
                    (this.U.hasAttribute('open') && document.body.contains(this.U)) ||
                    ((this.Ud = !1),
                    (this.U.style.zIndex = ''),
                    this.$c && ((this.U.style.top = ''), (this.$c = !1)),
                    this.$a.removeEventListener('click', this.xc),
                    this.$a.parentElement && this.$a.parentElement.removeChild(this.$a),
                    e.Me.rh(this));
            },
            ee: function (f) {
                f
                    ? this.U.hasAttribute('open') || this.U.setAttribute('open', '')
                    : (this.U.removeAttribute('open'), this.Hb());
            },
            xc: function (f) {
                var g = document.createEvent('MouseEvents');
                g.initMouseEvent(
                    f.type,
                    f.bubbles,
                    f.cancelable,
                    window,
                    f.detail,
                    f.screenX,
                    f.screenY,
                    f.clientX,
                    f.clientY,
                    f.ctrlKey,
                    f.altKey,
                    f.shiftKey,
                    f.metaKey,
                    f.button,
                    f.relatedTarget
                );
                this.U.dispatchEvent(g);
                f.stopPropagation();
            },
            Hg: function () {
                var f = this.U.querySelector('[autofocus]:not([disabled])');
                f ||
                    ((f = ['button', 'input', 'keygen', 'select', 'textarea'].map(function (g) {
                        return g + ':not([disabled])';
                    })),
                    f.push('[tabindex]:not([disabled]):not([tabindex=""])'),
                    (f = this.U.querySelector(f.join(', '))));
                b(document.activeElement);
                f && f.focus();
            },
            Uh: function (f, g) {
                this.$a.style.zIndex = f;
                this.U.style.zIndex = g;
            },
            show: function () {
                this.U.open || (this.ee(!0), this.Hg());
            },
            showModal: function () {
                if (this.U.hasAttribute('open'))
                    throw Error(
                        "Failed to execute 'showModal' on dialog: The element is already open, and therefore cannot be opened modally."
                    );
                if (!document.body.contains(this.U))
                    throw Error("Failed to execute 'showModal' on dialog: The element is not in a Document.");
                if (!e.Me.ph(this))
                    throw Error("Failed to execute 'showModal' on dialog: There are too many open modal dialogs.");
                this.show();
                this.Ud = !0;
                e.gh(this.U) ? (e.sh(this.U), (this.$c = !0)) : (this.$c = !1);
                this.$a.addEventListener('click', this.xc);
                this.U.parentNode.insertBefore(this.$a, this.U.nextSibling);
            },
            close: function (f) {
                if (!this.U.hasAttribute('open'))
                    throw Error(
                        "Failed to execute 'close' on dialog: The element does not have an 'open' attribute, and therefore cannot be closed."
                    );
                this.ee(!1);
                void 0 !== f && (this.U.returnValue = f);
                f = new d('close', { bubbles: !1, cancelable: !1 });
                this.U.dispatchEvent(f);
            }
        };
        var e = {
            sh: function (f) {
                var g = document.body.scrollTop || document.documentElement.scrollTop;
                f.style.top = Math.max(g, g + (window.innerHeight - f.offsetHeight) / 2) + 'px';
            },
            Wg: function (f) {
                for (var g = 0; g < document.styleSheets.length; ++g) {
                    var h = document.styleSheets[g],
                        n = null;
                    try {
                        n = h.cssRules;
                    } catch (A) {}
                    if (n)
                        for (h = 0; h < n.length; ++h) {
                            var p = n[h],
                                m = null;
                            try {
                                m = document.querySelectorAll(p.selectorText);
                            } catch (A) {}
                            var q;
                            if ((q = m))
                                a: {
                                    for (q = 0; q < m.length; ++q)
                                        if (m[q] == f) {
                                            q = !0;
                                            break a;
                                        }
                                    q = !1;
                                }
                            if (
                                q &&
                                ((m = p.style.getPropertyValue('top')),
                                (p = p.style.getPropertyValue('bottom')),
                                (m && 'auto' != m) || (p && 'auto' != p))
                            )
                                return !0;
                        }
                }
                return !1;
            },
            gh: function (f) {
                return 'absolute' != window.getComputedStyle(f).position ||
                    ('auto' != f.style.top && '' != f.style.top) ||
                    ('auto' != f.style.bottom && '' != f.style.bottom)
                    ? !1
                    : !e.Wg(f);
            },
            Qe: function (f) {
                f.showModal &&
                    console.warn('This browser already supports <dialog>, the polyfill may not work correctly', f);
                if ('DIALOG' != f.nodeName.toUpperCase())
                    throw Error('Failed to register dialog: The element is not a dialog.');
                new c(f);
            },
            qh: function (f) {
                f.showModal || e.Qe(f);
            },
            Ka: function () {
                this.ra = [];
                this.kc = document.createElement('div');
                this.kc.className = '_dialog_overlay';
                this.kc.addEventListener('click', function (f) {
                    f.stopPropagation();
                });
                this.Lc = this.Lc.bind(this);
                this.Jc = this.Jc.bind(this);
                this.Mc = this.Mc.bind(this);
                this.Lf = 1e5;
                this.Wh = 100150;
            }
        };
        e.Ka.prototype.Cf = function () {
            return this.ra.length ? this.ra[this.ra.length - 1].Ke : null;
        };
        e.Ka.prototype.eg = function () {
            document.body.appendChild(this.kc);
            document.body.addEventListener('focus', this.Jc, !0);
            document.addEventListener('keydown', this.Lc);
            document.addEventListener('DOMNodeRemoved', this.Mc);
        };
        e.Ka.prototype.Th = function () {
            document.body.removeChild(this.kc);
            document.body.removeEventListener('focus', this.Jc, !0);
            document.removeEventListener('keydown', this.Lc);
            document.removeEventListener('DOMNodeRemoved', this.Mc);
        };
        e.Ka.prototype.Ef = function () {
            for (var f = this.Lf, g = 0; g < this.ra.length; g++)
                g == this.ra.length - 1 && (this.kc.style.zIndex = f++), this.ra[g].Uh(f++, f++);
        };
        e.Ka.prototype.Jc = function (f) {
            if (a(f.target) != this.Cf()) return f.preventDefault(), f.stopPropagation(), b(f.target), !1;
        };
        e.Ka.prototype.Lc = function (f) {
            if (27 == f.keyCode) {
                f.preventDefault();
                f.stopPropagation();
                f = new d('cancel', { bubbles: !1, cancelable: !0 });
                var g = this.Cf();
                g.dispatchEvent(f) && g.close();
            }
        };
        e.Ka.prototype.Mc = function (f) {
            if ('DIALOG' == f.target.nodeName.toUpperCase()) {
                var g = f.target;
                g.open &&
                    this.ra.some(function (h) {
                        if (h.Ke == g) return h.Hb(), !0;
                    });
            }
        };
        e.Ka.prototype.ph = function (f) {
            if (this.ra.length >= (this.Wh - this.Lf) / 2 - 1) return !1;
            this.ra.push(f);
            1 == this.ra.length && this.eg();
            this.Ef();
            return !0;
        };
        e.Ka.prototype.rh = function (f) {
            f = this.ra.indexOf(f);
            -1 != f && (this.ra.splice(f, 1), this.Ef(), 0 == this.ra.length && this.Th());
        };
        e.Me = new e.Ka();
        document.addEventListener(
            'submit',
            function (f) {
                var g = f.target;
                if (
                    g &&
                    g.hasAttribute('method') &&
                    'dialog' == g.getAttribute('method').toLowerCase() &&
                    (f.preventDefault(), (g = a(f.target)))
                ) {
                    var h,
                        n = ['BUTTON', 'INPUT'];
                    [document.activeElement, f.explicitOriginalTarget].some(function (p) {
                        if (p && p.form == f.target && -1 != n.indexOf(p.nodeName.toUpperCase()))
                            return (h = p.value), !0;
                    });
                    g.close(h);
                }
            },
            !0
        );
        e.forceRegisterDialog = e.Qe;
        e.registerDialog = e.qh;
        'function' === typeof define && 'amd' in define
            ? define(function () {
                  return e;
              })
            : 'object' === typeof module && 'object' === typeof module.exports
            ? (module.exports = e)
            : (window.dialogPolyfill = e);
    })();
}.call(this));
