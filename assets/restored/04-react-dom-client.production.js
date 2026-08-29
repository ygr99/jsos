// [04-react-dom-client.production] 还原自 index-liunM0pp.js 第 1291-15722 行（边界为近似值，无 sourcemap）
var ww;
function hk() {
  if (ww) {
    return Vc;
  }
  ww = 1;
  var e = dk();
  var n = vu();
  var r = $x();
  function i(t) {
    var s = "https://react.dev/errors/" + t;
    if (arguments.length > 1) {
      s += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++) {
        s += "&args[]=" + encodeURIComponent(arguments[l]);
      }
    }
    return "Minified React error #" + t + "; visit " + s + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o(t) {
    return !!t && (t.nodeType === 1 || t.nodeType === 9 || t.nodeType === 11);
  }
  function u(t) {
    var s = t;
    var l = t;
    if (t.alternate) {
      while (s.return) {
        s = s.return;
      }
    } else {
      t = s;
      do {
        s = t;
        if ((s.flags & 4098) !== 0) {
          l = s.return;
        }
        t = s.return;
      } while (t);
    }
    if (s.tag === 3) {
      return l;
    } else {
      return null;
    }
  }
  function h(t) {
    if (t.tag === 13) {
      var s = t.memoizedState;
      if (s === null) {
        t = t.alternate;
        if (t !== null) {
          s = t.memoizedState;
        }
      }
      if (s !== null) {
        return s.dehydrated;
      }
    }
    return null;
  }
  function a(t) {
    if (t.tag === 31) {
      var s = t.memoizedState;
      if (s === null) {
        t = t.alternate;
        if (t !== null) {
          s = t.memoizedState;
        }
      }
      if (s !== null) {
        return s.dehydrated;
      }
    }
    return null;
  }
  function c(t) {
    if (u(t) !== t) {
      throw Error(i(188));
    }
  }
  function d(t) {
    var s = t.alternate;
    if (!s) {
      s = u(t);
      if (s === null) {
        throw Error(i(188));
      }
      if (s !== t) {
        return null;
      } else {
        return t;
      }
    }
    var l = t;
    var y = s;
    while (true) {
      var k = l.return;
      if (k === null) {
        break;
      }
      var O = k.alternate;
      if (O === null) {
        y = k.return;
        if (y !== null) {
          l = y;
          continue;
        }
        break;
      }
      if (k.child === O.child) {
        for (O = k.child; O;) {
          if (O === l) {
            c(k);
            return t;
          }
          if (O === y) {
            c(k);
            return s;
          }
          O = O.sibling;
        }
        throw Error(i(188));
      }
      if (l.return !== y.return) {
        l = k;
        y = O;
      } else {
        var K = false;
        for (var le = k.child; le;) {
          if (le === l) {
            K = true;
            l = k;
            y = O;
            break;
          }
          if (le === y) {
            K = true;
            y = k;
            l = O;
            break;
          }
          le = le.sibling;
        }
        if (!K) {
          for (le = O.child; le;) {
            if (le === l) {
              K = true;
              l = O;
              y = k;
              break;
            }
            if (le === y) {
              K = true;
              y = O;
              l = k;
              break;
            }
            le = le.sibling;
          }
          if (!K) {
            throw Error(i(189));
          }
        }
      }
      if (l.alternate !== y) {
        throw Error(i(190));
      }
    }
    if (l.tag !== 3) {
      throw Error(i(188));
    }
    if (l.stateNode.current === l) {
      return t;
    } else {
      return s;
    }
  }
  function p(t) {
    var s = t.tag;
    if (s === 5 || s === 26 || s === 27 || s === 6) {
      return t;
    }
    for (t = t.child; t !== null;) {
      s = p(t);
      if (s !== null) {
        return s;
      }
      t = t.sibling;
    }
    return null;
  }
  var f = Object.assign;
  var S = Symbol.for("react.element");
  var _ = Symbol.for("react.transitional.element");
  var x = Symbol.for("react.portal");
  var w = Symbol.for("react.fragment");
  var g = Symbol.for("react.strict_mode");
  var b = Symbol.for("react.profiler");
  var m = Symbol.for("react.consumer");
  var v = Symbol.for("react.context");
  var C = Symbol.for("react.forward_ref");
  var T = Symbol.for("react.suspense");
  var A = Symbol.for("react.suspense_list");
  var M = Symbol.for("react.memo");
  var R = Symbol.for("react.lazy");
  var I = Symbol.for("react.activity");
  var j = Symbol.for("react.memo_cache_sentinel");
  var W = Symbol.iterator;
  function z(t) {
    if (t === null || typeof t != "object") {
      return null;
    } else {
      t = W && t[W] || t["@@iterator"];
      if (typeof t == "function") {
        return t;
      } else {
        return null;
      }
    }
  }
  var N = Symbol.for("react.client.reference");
  function D(t) {
    if (t == null) {
      return null;
    }
    if (typeof t == "function") {
      if (t.$$typeof === N) {
        return null;
      } else {
        return t.displayName || t.name || null;
      }
    }
    if (typeof t == "string") {
      return t;
    }
    switch (t) {
      case w:
        return "Fragment";
      case b:
        return "Profiler";
      case g:
        return "StrictMode";
      case T:
        return "Suspense";
      case A:
        return "SuspenseList";
      case I:
        return "Activity";
    }
    if (typeof t == "object") {
      switch (t.$$typeof) {
        case x:
          return "Portal";
        case v:
          return t.displayName || "Context";
        case m:
          return (t._context.displayName || "Context") + ".Consumer";
        case C:
          var s = t.render;
          t = t.displayName;
          if (!t) {
            t = s.displayName || s.name || "";
            t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef";
          }
          return t;
        case M:
          s = t.displayName || null;
          if (s !== null) {
            return s;
          } else {
            return D(t.type) || "Memo";
          }
        case R:
          s = t._payload;
          t = t._init;
          try {
            return D(t(s));
          } catch {}
      }
    }
    return null;
  }
  var $ = Array.isArray;
  var G = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  var q = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  var U = {
    pending: false,
    data: null,
    method: null,
    action: null
  };
  var L = [];
  var F = -1;
  function P(t) {
    return {
      current: t
    };
  }
  function V(t) {
    if (!(F < 0)) {
      t.current = L[F];
      L[F] = null;
      F--;
    }
  }
  function Z(t, s) {
    F++;
    L[F] = t.current;
    t.current = s;
  }
  var J = P(null);
  var ne = P(null);
  var ue = P(null);
  var ee = P(null);
  function Y(t, s) {
    Z(ue, s);
    Z(ne, t);
    Z(J, null);
    switch (s.nodeType) {
      case 9:
      case 11:
        t = (t = s.documentElement) && (t = t.namespaceURI) ? B0(t) : 0;
        break;
      default:
        t = s.tagName;
        if (s = s.namespaceURI) {
          s = B0(s);
          t = z0(s, t);
        } else {
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
        }
    }
    V(J);
    Z(J, t);
  }
  function re() {
    V(J);
    V(ne);
    V(ue);
  }
  function ce(t) {
    if (t.memoizedState !== null) {
      Z(ee, t);
    }
    var s = J.current;
    var l = z0(s, t.type);
    if (s !== l) {
      Z(ne, t);
      Z(J, l);
    }
  }
  function ge(t) {
    if (ne.current === t) {
      V(J);
      V(ne);
    }
    if (ee.current === t) {
      V(ee);
      Nc._currentValue = U;
    }
  }
  var de;
  var me;
  function H(t) {
    if (de === undefined) {
      try {
        throw Error();
      } catch (l) {
        var s = l.stack.trim().match(/\n( *(at )?)/);
        de = s && s[1] || "";
        me = l.stack.indexOf(`
    at`) > -1 ? " (<anonymous>)" : l.stack.indexOf("@") > -1 ? "@unknown:0:0" : "";
      }
    }
    return `
${de}${t}${me}`;
  }
  var ae = false;
  function oe(t, s) {
    if (!t || ae) {
      return "";
    }
    ae = true;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = undefined;
    try {
      var y = {
        DetermineComponentFrameRoot: function () {
          try {
            if (s) {
              function He() {
                throw Error();
              }
              Object.defineProperty(He.prototype, "props", {
                set: function () {
                  throw Error();
                }
              });
              if (typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(He, []);
                } catch (De) {
                  var Oe = De;
                }
                Reflect.construct(t, [], He);
              } else {
                try {
                  He.call();
                } catch (De) {
                  Oe = De;
                }
                t.call(He.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (De) {
                Oe = De;
              }
              if ((He = t()) && typeof He.catch == "function") {
                He.catch(function () {});
              }
            }
          } catch (De) {
            if (De && Oe && typeof De.stack == "string") {
              return [De.stack, Oe.stack];
            }
          }
          return [null, null];
        }
      };
      y.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var k = Object.getOwnPropertyDescriptor(y.DetermineComponentFrameRoot, "name");
      if (k && k.configurable) {
        Object.defineProperty(y.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot"
        });
      }
      var O = y.DetermineComponentFrameRoot();
      var K = O[0];
      var le = O[1];
      if (K && le) {
        var we = K.split(`
`);
        var Ae = le.split(`
`);
        for (k = y = 0; y < we.length && !we[y].includes("DetermineComponentFrameRoot");) {
          y++;
        }
        while (k < Ae.length && !Ae[k].includes("DetermineComponentFrameRoot")) {
          k++;
        }
        if (y === we.length || k === Ae.length) {
          y = we.length - 1;
          k = Ae.length - 1;
          while (y >= 1 && k >= 0 && we[y] !== Ae[k]) {
            k--;
          }
        }
        for (; y >= 1 && k >= 0; y--, k--) {
          if (we[y] !== Ae[k]) {
            if (y !== 1 || k !== 1) {
              do {
                y--;
                k--;
                if (k < 0 || we[y] !== Ae[k]) {
                  var Le = `
${we[y].replace(" at new ", " at ")}`;
                  if (t.displayName && Le.includes("<anonymous>")) {
                    Le = Le.replace("<anonymous>", t.displayName);
                  }
                  return Le;
                }
              } while (y >= 1 && k >= 0);
            }
            break;
          }
        }
      }
    } finally {
      ae = false;
      Error.prepareStackTrace = l;
    }
    if (l = t ? t.displayName || t.name : "") {
      return H(l);
    } else {
      return "";
    }
  }
  function X(t, s) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return H(t.type);
      case 16:
        return H("Lazy");
      case 13:
        if (t.child !== s && s !== null) {
          return H("Suspense Fallback");
        } else {
          return H("Suspense");
        }
      case 19:
        return H("SuspenseList");
      case 0:
      case 15:
        return oe(t.type, false);
      case 11:
        return oe(t.type.render, false);
      case 1:
        return oe(t.type, true);
      case 31:
        return H("Activity");
      default:
        return "";
    }
  }
  function Q(t) {
    try {
      var s = "";
      var l = null;
      do {
        s += X(t, l);
        l = t;
        t = t.return;
      } while (t);
      return s;
    } catch (y) {
      return `
Error generating stack: ${y.message}
${y.stack}`;
    }
  }
  var se = Object.prototype.hasOwnProperty;
  var he = e.unstable_scheduleCallback;
  var ye = e.unstable_cancelCallback;
  var pe = e.unstable_shouldYield;
  var Se = e.unstable_requestPaint;
  var _e = e.unstable_now;
  var ie = e.unstable_getCurrentPriorityLevel;
  var te = e.unstable_ImmediatePriority;
  var be = e.unstable_UserBlockingPriority;
  var ve = e.unstable_NormalPriority;
  var Te = e.unstable_LowPriority;
  var Re = e.unstable_IdlePriority;
  var ze = e.log;
  var Be = e.unstable_setDisableYieldValue;
  var Ue = null;
  var We = null;
  function lt(t) {
    if (typeof ze == "function") {
      Be(t);
    }
    if (We && typeof We.setStrictMode == "function") {
      try {
        We.setStrictMode(Ue, t);
      } catch {}
    }
  }
  var dt = Math.clz32 ? Math.clz32 : kt;
  var _t = Math.log;
  var Dt = Math.LN2;
  function kt(t) {
    t >>>= 0;
    if (t === 0) {
      return 32;
    } else {
      return 31 - (_t(t) / Dt | 0) | 0;
    }
  }
  var Ge = 256;
  var Ye = 262144;
  var Qe = 4194304;
  function gt(t) {
    var s = t & 42;
    if (s !== 0) {
      return s;
    }
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function ft(t, s, l) {
    var y = t.pendingLanes;
    if (y === 0) {
      return 0;
    }
    var k = 0;
    var O = t.suspendedLanes;
    var K = t.pingedLanes;
    t = t.warmLanes;
    var le = y & 134217727;
    if (le !== 0) {
      y = le & ~O;
      if (y !== 0) {
        k = gt(y);
      } else {
        K &= le;
        if (K !== 0) {
          k = gt(K);
        } else if (!l) {
          l = le & ~t;
          if (l !== 0) {
            k = gt(l);
          }
        }
      }
    } else {
      le = y & ~O;
      if (le !== 0) {
        k = gt(le);
      } else if (K !== 0) {
        k = gt(K);
      } else if (!l) {
        l = y & ~t;
        if (l !== 0) {
          k = gt(l);
        }
      }
    }
    if (k === 0) {
      return 0;
    } else if (s !== 0 && s !== k && (s & O) === 0 && (O = k & -k, l = s & -s, O >= l || O === 32 && (l & 4194048) !== 0)) {
      return s;
    } else {
      return k;
    }
  }
  function Ke(t, s) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & s) === 0;
  }
  function en(t, s) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return s + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return s + 5000;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function St() {
    var t = Qe;
    Qe <<= 1;
    if ((Qe & 62914560) === 0) {
      Qe = 4194304;
    }
    return t;
  }
  function it(t) {
    var s = [];
    for (var l = 0; l < 31; l++) {
      s.push(t);
    }
    return s;
  }
  function et(t, s) {
    t.pendingLanes |= s;
    if (s !== 268435456) {
      t.suspendedLanes = 0;
      t.pingedLanes = 0;
      t.warmLanes = 0;
    }
  }
  function Wt(t, s, l, y, k, O) {
    var K = t.pendingLanes;
    t.pendingLanes = l;
    t.suspendedLanes = 0;
    t.pingedLanes = 0;
    t.warmLanes = 0;
    t.expiredLanes &= l;
    t.entangledLanes &= l;
    t.errorRecoveryDisabledLanes &= l;
    t.shellSuspendCounter = 0;
    var le = t.entanglements;
    var we = t.expirationTimes;
    var Ae = t.hiddenUpdates;
    for (l = K & ~l; l > 0;) {
      var Le = 31 - dt(l);
      var He = 1 << Le;
      le[Le] = 0;
      we[Le] = -1;
      var Oe = Ae[Le];
      if (Oe !== null) {
        Ae[Le] = null;
        Le = 0;
        for (; Le < Oe.length; Le++) {
          var De = Oe[Le];
          if (De !== null) {
            De.lane &= -536870913;
          }
        }
      }
      l &= ~He;
    }
    if (y !== 0) {
      xt(t, y, 0);
    }
    if (O !== 0 && k === 0 && t.tag !== 0) {
      t.suspendedLanes |= O & ~(K & ~s);
    }
  }
  function xt(t, s, l) {
    t.pendingLanes |= s;
    t.suspendedLanes &= ~s;
    var y = 31 - dt(s);
    t.entangledLanes |= s;
    t.entanglements[y] = t.entanglements[y] | 1073741824 | l & 261930;
  }
  function Ln(t, s) {
    var l = t.entangledLanes |= s;
    for (t = t.entanglements; l;) {
      var y = 31 - dt(l);
      var k = 1 << y;
      if (k & s | t[y] & s) {
        t[y] |= s;
      }
      l &= ~k;
    }
  }
  function tn(t, s) {
    var l = s & -s;
    l = (l & 42) !== 0 ? 1 : Kt(l);
    if ((l & (t.suspendedLanes | s)) !== 0) {
      return 0;
    } else {
      return l;
    }
  }
  function Kt(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function ht(t) {
    t &= -t;
    if (t > 2) {
      if (t > 8) {
        if ((t & 134217727) !== 0) {
          return 32;
        } else {
          return 268435456;
        }
      } else {
        return 8;
      }
    } else {
      return 2;
    }
  }
  function Zt() {
    var t = q.p;
    if (t !== 0) {
      return t;
    } else {
      t = window.event;
      if (t === undefined) {
        return 32;
      } else {
        return ow(t.type);
      }
    }
  }
  function nn(t, s) {
    var l = q.p;
    try {
      q.p = t;
      return s();
    } finally {
      q.p = l;
    }
  }
  var $t = Math.random().toString(36).slice(2);
  var Ft = "__reactFiber$" + $t;
  var sn = "__reactProps$" + $t;
  var zt = "__reactContainer$" + $t;
  var Et = "__reactEvents$" + $t;
  var or = "__reactListeners$" + $t;
  var Rs = "__reactHandles$" + $t;
  var Yr = "__reactResources$" + $t;
  var dr = "__reactMarker$" + $t;
  function us(t) {
    delete t[Ft];
    delete t[sn];
    delete t[Et];
    delete t[or];
    delete t[Rs];
  }
  function Xr(t) {
    var s = t[Ft];
    if (s) {
      return s;
    }
    for (var l = t.parentNode; l;) {
      if (s = l[zt] || l[Ft]) {
        l = s.alternate;
        if (s.child !== null || l !== null && l.child !== null) {
          for (t = W0(t); t !== null;) {
            if (l = t[Ft]) {
              return l;
            }
            t = W0(t);
          }
        }
        return s;
      }
      t = l;
      l = t.parentNode;
    }
    return null;
  }
  function yr(t) {
    if (t = t[Ft] || t[zt]) {
      var s = t.tag;
      if (s === 5 || s === 6 || s === 13 || s === 31 || s === 26 || s === 27 || s === 3) {
        return t;
      }
    }
    return null;
  }
  function Tr(t) {
    var s = t.tag;
    if (s === 5 || s === 26 || s === 27 || s === 6) {
      return t.stateNode;
    }
    throw Error(i(33));
  }
  function fr(t) {
    var s = t[Yr];
    s ||= t[Yr] = {
      hoistableStyles: new Map(),
      hoistableScripts: new Map()
    };
    return s;
  }
  function _n(t) {
    t[dr] = true;
  }
  var Wo = new Set();
  var qn = {};
  function Gn(t, s) {
    Ts(t, s);
    Ts(t + "Capture", s);
  }
  function Ts(t, s) {
    qn[t] = s;
    t = 0;
    for (; t < s.length; t++) {
      Wo.add(s[t]);
    }
  }
  var Fa = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$");
  var $o = {};
  var qo = {};
  function Gi(t) {
    if (se.call(qo, t)) {
      return true;
    } else if (se.call($o, t)) {
      return false;
    } else if (Fa.test(t)) {
      return qo[t] = true;
    } else {
      $o[t] = true;
      return false;
    }
  }
  function di(t, s, l) {
    if (Gi(s)) {
      if (l === null) {
        t.removeAttribute(s);
      } else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(s);
            return;
          case "boolean":
            var y = s.toLowerCase().slice(0, 5);
            if (y !== "data-" && y !== "aria-") {
              t.removeAttribute(s);
              return;
            }
        }
        t.setAttribute(s, "" + l);
      }
    }
  }
  function hr(t, s, l) {
    if (l === null) {
      t.removeAttribute(s);
    } else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(s);
          return;
      }
      t.setAttribute(s, "" + l);
    }
  }
  function kr(t, s, l, y) {
    if (y === null) {
      t.removeAttribute(l);
    } else {
      switch (typeof y) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(l);
          return;
      }
      t.setAttributeNS(s, l, "" + y);
    }
  }
  function Pn(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function ks(t) {
    var s = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (s === "checkbox" || s === "radio");
  }
  function Ar(t, s, l) {
    var y = Object.getOwnPropertyDescriptor(t.constructor.prototype, s);
    if (!t.hasOwnProperty(s) && typeof y !== "undefined" && typeof y.get == "function" && typeof y.set == "function") {
      var k = y.get;
      var O = y.set;
      Object.defineProperty(t, s, {
        configurable: true,
        get: function () {
          return k.call(this);
        },
        set: function (K) {
          l = "" + K;
          O.call(this, K);
        }
      });
      Object.defineProperty(t, s, {
        enumerable: y.enumerable
      });
      return {
        getValue: function () {
          return l;
        },
        setValue: function (K) {
          l = "" + K;
        },
        stopTracking: function () {
          t._valueTracker = null;
          delete t[s];
        }
      };
    }
  }
  function ar(t) {
    if (!t._valueTracker) {
      var s = ks(t) ? "checked" : "value";
      t._valueTracker = Ar(t, s, "" + t[s]);
    }
  }
  function ds(t) {
    if (!t) {
      return false;
    }
    var s = t._valueTracker;
    if (!s) {
      return true;
    }
    var l = s.getValue();
    var y = "";
    if (t) {
      y = ks(t) ? t.checked ? "true" : "false" : t.value;
    }
    t = y;
    if (t !== l) {
      s.setValue(t);
      return true;
    } else {
      return false;
    }
  }
  function Pr(t) {
    t = t || (typeof document !== "undefined" ? document : undefined);
    if (typeof t === "undefined") {
      return null;
    }
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var Ua = /[\n"\\]/g;
  function er(t) {
    return t.replace(Ua, function (s) {
      return "\\" + s.charCodeAt(0).toString(16) + " ";
    });
  }
  function Vs(t, s, l, y, k, O, K, le) {
    t.name = "";
    if (K != null && typeof K != "function" && typeof K != "symbol" && typeof K != "boolean") {
      t.type = K;
    } else {
      t.removeAttribute("type");
    }
    if (s != null) {
      if (K === "number") {
        if (s === 0 && t.value === "" || t.value != s) {
          t.value = "" + Pn(s);
        }
      } else if (t.value !== "" + Pn(s)) {
        t.value = "" + Pn(s);
      }
    } else if (K === "submit" || K === "reset") {
      t.removeAttribute("value");
    }
    if (s != null) {
      As(t, K, Pn(s));
    } else if (l != null) {
      As(t, K, Pn(l));
    } else if (y != null) {
      t.removeAttribute("value");
    }
    if (k == null && O != null) {
      t.defaultChecked = !!O;
    }
    if (k != null) {
      t.checked = k && typeof k != "function" && typeof k != "symbol";
    }
    if (le != null && typeof le != "function" && typeof le != "symbol" && typeof le != "boolean") {
      t.name = "" + Pn(le);
    } else {
      t.removeAttribute("name");
    }
  }
  function Go(t, s, l, y, k, O, K, le) {
    if (O != null && typeof O != "function" && typeof O != "symbol" && typeof O != "boolean") {
      t.type = O;
    }
    if (s != null || l != null) {
      if ((O === "submit" || O === "reset") && s == null) {
        ar(t);
        return;
      }
      l = l != null ? "" + Pn(l) : "";
      s = s != null ? "" + Pn(s) : l;
      if (!le && s !== t.value) {
        t.value = s;
      }
      t.defaultValue = s;
    }
    y = y ?? k;
    y = typeof y != "function" && typeof y != "symbol" && !!y;
    t.checked = le ? t.checked : !!y;
    t.defaultChecked = !!y;
    if (K != null && typeof K != "function" && typeof K != "symbol" && typeof K != "boolean") {
      t.name = K;
    }
    ar(t);
  }
  function As(t, s, l) {
    if ((s !== "number" || Pr(t.ownerDocument) !== t) && t.defaultValue !== "" + l) {
      t.defaultValue = "" + l;
    }
  }
  function Kr(t, s, l, y) {
    t = t.options;
    if (s) {
      s = {};
      for (var k = 0; k < l.length; k++) {
        s["$" + l[k]] = true;
      }
      for (l = 0; l < t.length; l++) {
        k = s.hasOwnProperty("$" + t[l].value);
        if (t[l].selected !== k) {
          t[l].selected = k;
        }
        if (k && y) {
          t[l].defaultSelected = true;
        }
      }
    } else {
      l = "" + Pn(l);
      s = null;
      k = 0;
      for (; k < t.length; k++) {
        if (t[k].value === l) {
          t[k].selected = true;
          if (y) {
            t[k].defaultSelected = true;
          }
          return;
        }
        if (s === null && !t[k].disabled) {
          s = t[k];
        }
      }
      if (s !== null) {
        s.selected = true;
      }
    }
  }
  function _r(t, s, l) {
    if (s != null && (s = "" + Pn(s), s !== t.value && (t.value = s), l == null)) {
      if (t.defaultValue !== s) {
        t.defaultValue = s;
      }
      return;
    }
    t.defaultValue = l != null ? "" + Pn(l) : "";
  }
  function Ms(t, s, l, y) {
    if (s == null) {
      if (y != null) {
        if (l != null) {
          throw Error(i(92));
        }
        if ($(y)) {
          if (y.length > 1) {
            throw Error(i(93));
          }
          y = y[0];
        }
        l = y;
      }
      if (l == null) {
        l = "";
      }
      s = l;
    }
    l = Pn(s);
    t.defaultValue = l;
    y = t.textContent;
    if (y === l && y !== "" && y !== null) {
      t.value = y;
    }
    ar(t);
  }
  function Zr(t, s) {
    if (s) {
      var l = t.firstChild;
      if (l && l === t.lastChild && l.nodeType === 3) {
        l.nodeValue = s;
        return;
      }
    }
    t.textContent = s;
  }
  var Yi = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function hn(t, s, l) {
    var y = s.indexOf("--") === 0;
    if (l == null || typeof l == "boolean" || l === "") {
      if (y) {
        t.setProperty(s, "");
      } else if (s === "float") {
        t.cssFloat = "";
      } else {
        t[s] = "";
      }
    } else if (y) {
      t.setProperty(s, l);
    } else if (typeof l != "number" || l === 0 || Yi.has(s)) {
      if (s === "float") {
        t.cssFloat = l;
      } else {
        t[s] = ("" + l).trim();
      }
    } else {
      t[s] = l + "px";
    }
  }
  function Xi(t, s, l) {
    if (s != null && typeof s != "object") {
      throw Error(i(62));
    }
    t = t.style;
    if (l != null) {
      for (var y in l) {
        if (!!l.hasOwnProperty(y) && (s == null || !s.hasOwnProperty(y))) {
          if (y.indexOf("--") === 0) {
            t.setProperty(y, "");
          } else if (y === "float") {
            t.cssFloat = "";
          } else {
            t[y] = "";
          }
        }
      }
      for (var k in s) {
        y = s[k];
        if (s.hasOwnProperty(k) && l[k] !== y) {
          hn(t, k, y);
        }
      }
    } else {
      for (var O in s) {
        if (s.hasOwnProperty(O)) {
          hn(t, O, s[O]);
        }
      }
    }
  }
  function fi(t) {
    if (t.indexOf("-") === -1) {
      return false;
    }
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var Yo = new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]);
  var ec = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ki(t) {
    if (ec.test("" + t)) {
      return "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')";
    } else {
      return t;
    }
  }
  function Qr() {}
  var Xo = null;
  function hi(t) {
    t = t.target || t.srcElement || window;
    if (t.correspondingUseElement) {
      t = t.correspondingUseElement;
    }
    if (t.nodeType === 3) {
      return t.parentNode;
    } else {
      return t;
    }
  }
  var Ws = null;
  var $s = null;
  function qe(t) {
    var s = yr(t);
    if (s && (t = s.stateNode)) {
      var l = t[sn] || null;
      t = s.stateNode;
      e: switch (s.type) {
        case "input":
          Vs(t, l.value, l.defaultValue, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name);
          s = l.name;
          if (l.type === "radio" && s != null) {
            for (l = t; l.parentNode;) {
              l = l.parentNode;
            }
            l = l.querySelectorAll("input[name=\"" + er("" + s) + "\"][type=\"radio\"]");
            s = 0;
            for (; s < l.length; s++) {
              var y = l[s];
              if (y !== t && y.form === t.form) {
                var k = y[sn] || null;
                if (!k) {
                  throw Error(i(90));
                }
                Vs(y, k.value, k.defaultValue, k.defaultValue, k.checked, k.defaultChecked, k.type, k.name);
              }
            }
            for (s = 0; s < l.length; s++) {
              y = l[s];
              if (y.form === t.form) {
                ds(y);
              }
            }
          }
          break e;
        case "textarea":
          _r(t, l.value, l.defaultValue);
          break e;
        case "select":
          s = l.value;
          if (s != null) {
            Kr(t, !!l.multiple, s, false);
          }
      }
    }
  }
  var rt = false;
  function It(t, s, l) {
    if (rt) {
      return t(s, l);
    }
    rt = true;
    try {
      var y = t(s);
      return y;
    } finally {
      rt = false;
      if ((Ws !== null || $s !== null) && (wd(), Ws && (s = Ws, t = $s, $s = Ws = null, qe(s), t))) {
        for (s = 0; s < t.length; s++) {
          qe(t[s]);
        }
      }
    }
  }
  function Nt(t, s) {
    var l = t.stateNode;
    if (l === null) {
      return null;
    }
    var y = l[sn] || null;
    if (y === null) {
      return null;
    }
    l = y[s];
    e: switch (s) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        if (!(y = !y.disabled)) {
          t = t.type;
          y = t !== "button" && t !== "input" && t !== "select" && t !== "textarea";
        }
        t = !y;
        break e;
      default:
        t = false;
    }
    if (t) {
      return null;
    }
    if (l && typeof l != "function") {
      throw Error(i(231, s, typeof l));
    }
    return l;
  }
  var ln = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
  var Cn = false;
  if (ln) {
    try {
      var Bn = {};
      Object.defineProperty(Bn, "passive", {
        get: function () {
          Cn = true;
        }
      });
      window.addEventListener("test", Bn, Bn);
      window.removeEventListener("test", Bn, Bn);
    } catch {
      Cn = false;
    }
  }
  var tr = null;
  var Br = null;
  var Ko = null;
  function Va() {
    if (Ko) {
      return Ko;
    }
    var t;
    var s = Br;
    var l = s.length;
    var y;
    var k = "value" in tr ? tr.value : tr.textContent;
    var O = k.length;
    for (t = 0; t < l && s[t] === k[t]; t++);
    var K = l - t;
    for (y = 1; y <= K && s[l - y] === k[O - y]; y++);
    return Ko = k.slice(t, y > 1 ? 1 - y : undefined);
  }
  function Zo(t) {
    var s = t.keyCode;
    if ("charCode" in t) {
      t = t.charCode;
      if (t === 0 && s === 13) {
        t = 13;
      }
    } else {
      t = s;
    }
    if (t === 10) {
      t = 13;
    }
    if (t >= 32 || t === 13) {
      return t;
    } else {
      return 0;
    }
  }
  function Wa() {
    return true;
  }
  function $a() {
    return false;
  }
  function wr(t) {
    function s(l, y, k, O, K) {
      this._reactName = l;
      this._targetInst = k;
      this.type = y;
      this.nativeEvent = O;
      this.target = K;
      this.currentTarget = null;
      for (var le in t) {
        if (t.hasOwnProperty(le)) {
          l = t[le];
          this[le] = l ? l(O) : O[le];
        }
      }
      this.isDefaultPrevented = O.defaultPrevented ?? O.returnValue === false ? Wa : $a;
      this.isPropagationStopped = $a;
      return this;
    }
    f(s.prototype, {
      preventDefault: function () {
        this.defaultPrevented = true;
        var l = this.nativeEvent;
        if (l) {
          if (l.preventDefault) {
            l.preventDefault();
          } else if (typeof l.returnValue != "unknown") {
            l.returnValue = false;
          }
          this.isDefaultPrevented = Wa;
        }
      },
      stopPropagation: function () {
        var l = this.nativeEvent;
        if (l) {
          if (l.stopPropagation) {
            l.stopPropagation();
          } else if (typeof l.cancelBubble != "unknown") {
            l.cancelBubble = true;
          }
          this.isPropagationStopped = Wa;
        }
      },
      persist: function () {},
      isPersistent: Wa
    });
    return s;
  }
  var qs = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  };
  var qa = wr(qs);
  var Qo = f({}, qs, {
    view: 0,
    detail: 0
  });
  var qh = wr(Qo);
  var tc;
  var nc;
  var Jo;
  var Ga = f({}, Qo, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Ve,
    button: 0,
    buttons: 0,
    relatedTarget: function (t) {
      if (t.relatedTarget === undefined) {
        if (t.fromElement === t.srcElement) {
          return t.toElement;
        } else {
          return t.fromElement;
        }
      } else {
        return t.relatedTarget;
      }
    },
    movementX: function (t) {
      if ("movementX" in t) {
        return t.movementX;
      } else {
        if (t !== Jo) {
          if (Jo && t.type === "mousemove") {
            tc = t.screenX - Jo.screenX;
            nc = t.screenY - Jo.screenY;
          } else {
            nc = tc = 0;
          }
          Jo = t;
        }
        return tc;
      }
    },
    movementY: function (t) {
      if ("movementY" in t) {
        return t.movementY;
      } else {
        return nc;
      }
    }
  });
  var Ya = wr(Ga);
  var Xa = f({}, Ga, {
    dataTransfer: 0
  });
  var Gh = wr(Xa);
  var Yh = f({}, Qo, {
    relatedTarget: 0
  });
  var rc = wr(Yh);
  var Xh = f({}, qs, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  });
  var Kh = wr(Xh);
  var Bu = f({}, qs, {
    clipboardData: function (t) {
      if ("clipboardData" in t) {
        return t.clipboardData;
      } else {
        return window.clipboardData;
      }
    }
  });
  var zu = wr(Bu);
  var Nu = f({}, qs, {
    data: 0
  });
  var sc = wr(Nu);
  var ju = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  };
  var fe = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  };
  var Ce = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Ie(t) {
    var s = this.nativeEvent;
    if (s.getModifierState) {
      return s.getModifierState(t);
    } else if (t = Ce[t]) {
      return !!s[t];
    } else {
      return false;
    }
  }
  function Ve() {
    return Ie;
  }
  var ct = f({}, Qo, {
    key: function (t) {
      if (t.key) {
        var s = ju[t.key] || t.key;
        if (s !== "Unidentified") {
          return s;
        }
      }
      if (t.type === "keypress") {
        t = Zo(t);
        if (t === 13) {
          return "Enter";
        } else {
          return String.fromCharCode(t);
        }
      } else if (t.type === "keydown" || t.type === "keyup") {
        return fe[t.keyCode] || "Unidentified";
      } else {
        return "";
      }
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ve,
    charCode: function (t) {
      if (t.type === "keypress") {
        return Zo(t);
      } else {
        return 0;
      }
    },
    keyCode: function (t) {
      if (t.type === "keydown" || t.type === "keyup") {
        return t.keyCode;
      } else {
        return 0;
      }
    },
    which: function (t) {
      if (t.type === "keypress") {
        return Zo(t);
      } else if (t.type === "keydown" || t.type === "keyup") {
        return t.keyCode;
      } else {
        return 0;
      }
    }
  });
  var vt = wr(ct);
  var Rt = f({}, Ga, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  });
  var ot = wr(Rt);
  var Ct = f({}, Qo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ve
  });
  var Mr = wr(Ct);
  var Ot = f({}, qs, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  });
  var Yn = wr(Ot);
  var Zh = f({}, Ga, {
    deltaX: function (t) {
      if ("deltaX" in t) {
        return t.deltaX;
      } else if ("wheelDeltaX" in t) {
        return -t.wheelDeltaX;
      } else {
        return 0;
      }
    },
    deltaY: function (t) {
      if ("deltaY" in t) {
        return t.deltaY;
      } else if ("wheelDeltaY" in t) {
        return -t.wheelDeltaY;
      } else if ("wheelDelta" in t) {
        return -t.wheelDelta;
      } else {
        return 0;
      }
    },
    deltaZ: 0,
    deltaMode: 0
  });
  var Qh = wr(Zh);
  var x2 = f({}, qs, {
    newState: 0,
    oldState: 0
  });
  var C2 = wr(x2);
  var E2 = [9, 13, 27, 32];
  var Jh = ln && "CompositionEvent" in window;
  var ic = null;
  if (ln && "documentMode" in document) {
    ic = document.documentMode;
  }
  var R2 = ln && "TextEvent" in window && !ic;
  var Ub = ln && (!Jh || ic && ic > 8 && ic <= 11);
  var Vb = " ";
  var Wb = false;
  function $b(t, s) {
    switch (t) {
      case "keyup":
        return E2.indexOf(s.keyCode) !== -1;
      case "keydown":
        return s.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function qb(t) {
    t = t.detail;
    if (typeof t == "object" && "data" in t) {
      return t.data;
    } else {
      return null;
    }
  }
  var Ka = false;
  function T2(t, s) {
    switch (t) {
      case "compositionend":
        return qb(s);
      case "keypress":
        if (s.which !== 32) {
          return null;
        } else {
          Wb = true;
          return Vb;
        }
      case "textInput":
        t = s.data;
        if (t === Vb && Wb) {
          return null;
        } else {
          return t;
        }
      default:
        return null;
    }
  }
  function k2(t, s) {
    if (Ka) {
      if (t === "compositionend" || !Jh && $b(t, s)) {
        t = Va();
        Ko = Br = tr = null;
        Ka = false;
        return t;
      } else {
        return null;
      }
    }
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!s.ctrlKey && !s.altKey && !s.metaKey || s.ctrlKey && s.altKey) {
          if (s.char && s.char.length > 1) {
            return s.char;
          }
          if (s.which) {
            return String.fromCharCode(s.which);
          }
        }
        return null;
      case "compositionend":
        if (Ub && s.locale !== "ko") {
          return null;
        } else {
          return s.data;
        }
      default:
        return null;
    }
  }
  var A2 = {
    color: true,
    date: true,
    datetime: true,
    "datetime-local": true,
    email: true,
    month: true,
    number: true,
    password: true,
    range: true,
    search: true,
    tel: true,
    text: true,
    time: true,
    url: true,
    week: true
  };
  function Gb(t) {
    var s = t && t.nodeName && t.nodeName.toLowerCase();
    if (s === "input") {
      return !!A2[t.type];
    } else {
      return s === "textarea";
    }
  }
  function Yb(t, s, l, y) {
    if (Ws) {
      if ($s) {
        $s.push(y);
      } else {
        $s = [y];
      }
    } else {
      Ws = y;
    }
    s = kd(s, "onChange");
    if (s.length > 0) {
      l = new qa("onChange", "change", null, l, y);
      t.push({
        event: l,
        listeners: s
      });
    }
  }
  var oc = null;
  var ac = null;
  function M2(t) {
    M0(t, 0);
  }
  function Hu(t) {
    var s = Tr(t);
    if (ds(s)) {
      return t;
    }
  }
  function Xb(t, s) {
    if (t === "change") {
      return s;
    }
  }
  var Kb = false;
  if (ln) {
    var ep;
    if (ln) {
      var tp = "oninput" in document;
      if (!tp) {
        var Zb = document.createElement("div");
        Zb.setAttribute("oninput", "return;");
        tp = typeof Zb.oninput == "function";
      }
      ep = tp;
    } else {
      ep = false;
    }
    Kb = ep && (!document.documentMode || document.documentMode > 9);
  }
  function Qb() {
    if (oc) {
      oc.detachEvent("onpropertychange", Jb);
      ac = oc = null;
    }
  }
  function Jb(t) {
    if (t.propertyName === "value" && Hu(ac)) {
      var s = [];
      Yb(s, ac, t, hi(t));
      It(M2, s);
    }
  }
  function O2(t, s, l) {
    if (t === "focusin") {
      Qb();
      oc = s;
      ac = l;
      oc.attachEvent("onpropertychange", Jb);
    } else if (t === "focusout") {
      Qb();
    }
  }
  function D2(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown") {
      return Hu(ac);
    }
  }
  function I2(t, s) {
    if (t === "click") {
      return Hu(s);
    }
  }
  function L2(t, s) {
    if (t === "input" || t === "change") {
      return Hu(s);
    }
  }
  function P2(t, s) {
    return t === s && (t !== 0 || 1 / t === 1 / s) || t !== t && s !== s;
  }
  var Jr = typeof Object.is == "function" ? Object.is : P2;
  function lc(t, s) {
    if (Jr(t, s)) {
      return true;
    }
    if (typeof t != "object" || t === null || typeof s != "object" || s === null) {
      return false;
    }
    var l = Object.keys(t);
    var y = Object.keys(s);
    if (l.length !== y.length) {
      return false;
    }
    for (y = 0; y < l.length; y++) {
      var k = l[y];
      if (!se.call(s, k) || !Jr(t[k], s[k])) {
        return false;
      }
    }
    return true;
  }
  function ey(t) {
    while (t && t.firstChild) {
      t = t.firstChild;
    }
    return t;
  }
  function ty(t, s) {
    var l = ey(t);
    t = 0;
    var y;
    for (; l;) {
      if (l.nodeType === 3) {
        y = t + l.textContent.length;
        if (t <= s && y >= s) {
          return {
            node: l,
            offset: s - t
          };
        }
        t = y;
      }
      e: {
        while (l) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = undefined;
      }
      l = ey(l);
    }
  }
  function ny(t, s) {
    if (t && s) {
      if (t === s) {
        return true;
      } else if (t && t.nodeType === 3) {
        return false;
      } else if (s && s.nodeType === 3) {
        return ny(t, s.parentNode);
      } else if ("contains" in t) {
        return t.contains(s);
      } else if (t.compareDocumentPosition) {
        return !!(t.compareDocumentPosition(s) & 16);
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function ry(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var s = Pr(t.document); s instanceof t.HTMLIFrameElement;) {
      try {
        var l = typeof s.contentWindow.location.href == "string";
      } catch {
        l = false;
      }
      if (l) {
        t = s.contentWindow;
      } else {
        break;
      }
      s = Pr(t.document);
    }
    return s;
  }
  function np(t) {
    var s = t && t.nodeName && t.nodeName.toLowerCase();
    return s && (s === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || s === "textarea" || t.contentEditable === "true");
  }
  var B2 = ln && "documentMode" in document && document.documentMode <= 11;
  var Za = null;
  var rp = null;
  var cc = null;
  var sp = false;
  function sy(t, s, l) {
    var y = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    if (!sp && Za != null && Za === Pr(y)) {
      y = Za;
      if ("selectionStart" in y && np(y)) {
        y = {
          start: y.selectionStart,
          end: y.selectionEnd
        };
      } else {
        y = (y.ownerDocument && y.ownerDocument.defaultView || window).getSelection();
        y = {
          anchorNode: y.anchorNode,
          anchorOffset: y.anchorOffset,
          focusNode: y.focusNode,
          focusOffset: y.focusOffset
        };
      }
      if (!cc || !lc(cc, y)) {
        cc = y;
        y = kd(rp, "onSelect");
        if (y.length > 0) {
          s = new qa("onSelect", "select", null, s, l);
          t.push({
            event: s,
            listeners: y
          });
          s.target = Za;
        }
      }
    }
  }
  function ea(t, s) {
    var l = {};
    l[t.toLowerCase()] = s.toLowerCase();
    l["Webkit" + t] = "webkit" + s;
    l["Moz" + t] = "moz" + s;
    return l;
  }
  var Qa = {
    animationend: ea("Animation", "AnimationEnd"),
    animationiteration: ea("Animation", "AnimationIteration"),
    animationstart: ea("Animation", "AnimationStart"),
    transitionrun: ea("Transition", "TransitionRun"),
    transitionstart: ea("Transition", "TransitionStart"),
    transitioncancel: ea("Transition", "TransitionCancel"),
    transitionend: ea("Transition", "TransitionEnd")
  };
  var ip = {};
  var iy = {};
  if (ln) {
    iy = document.createElement("div").style;
    if (!("AnimationEvent" in window)) {
      delete Qa.animationend.animation;
      delete Qa.animationiteration.animation;
      delete Qa.animationstart.animation;
    }
    if (!("TransitionEvent" in window)) {
      delete Qa.transitionend.transition;
    }
  }
  function ta(t) {
    if (ip[t]) {
      return ip[t];
    }
    if (!Qa[t]) {
      return t;
    }
    var s = Qa[t];
    var l;
    for (l in s) {
      if (s.hasOwnProperty(l) && l in iy) {
        return ip[t] = s[l];
      }
    }
    return t;
  }
  var oy = ta("animationend");
  var ay = ta("animationiteration");
  var ly = ta("animationstart");
  var z2 = ta("transitionrun");
  var N2 = ta("transitionstart");
  var j2 = ta("transitioncancel");
  var cy = ta("transitionend");
  var uy = new Map();
  var op = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  op.push("scrollEnd");
  function Os(t, s) {
    uy.set(t, s);
    Gn(s, [t]);
  }
  var Fu = typeof reportError == "function" ? reportError : function (t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var s = new window.ErrorEvent("error", {
        bubbles: true,
        cancelable: true,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(s)) {
        return;
      }
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  };
  var fs = [];
  var Ja = 0;
  var ap = 0;
  function Uu() {
    for (var t = Ja, s = ap = Ja = 0; s < t;) {
      var l = fs[s];
      fs[s++] = null;
      var y = fs[s];
      fs[s++] = null;
      var k = fs[s];
      fs[s++] = null;
      var O = fs[s];
      fs[s++] = null;
      if (y !== null && k !== null) {
        var K = y.pending;
        if (K === null) {
          k.next = k;
        } else {
          k.next = K.next;
          K.next = k;
        }
        y.pending = k;
      }
      if (O !== 0) {
        dy(l, k, O);
      }
    }
  }
  function Vu(t, s, l, y) {
    fs[Ja++] = t;
    fs[Ja++] = s;
    fs[Ja++] = l;
    fs[Ja++] = y;
    ap |= y;
    t.lanes |= y;
    t = t.alternate;
    if (t !== null) {
      t.lanes |= y;
    }
  }
  function lp(t, s, l, y) {
    Vu(t, s, l, y);
    return Wu(t);
  }
  function na(t, s) {
    Vu(t, null, null, s);
    return Wu(t);
  }
  function dy(t, s, l) {
    t.lanes |= l;
    var y = t.alternate;
    if (y !== null) {
      y.lanes |= l;
    }
    var k = false;
    for (var O = t.return; O !== null;) {
      O.childLanes |= l;
      y = O.alternate;
      if (y !== null) {
        y.childLanes |= l;
      }
      if (O.tag === 22) {
        t = O.stateNode;
        if (t !== null && !(t._visibility & 1)) {
          k = true;
        }
      }
      t = O;
      O = O.return;
    }
    if (t.tag === 3) {
      O = t.stateNode;
      if (k && s !== null) {
        k = 31 - dt(l);
        t = O.hiddenUpdates;
        y = t[k];
        if (y === null) {
          t[k] = [s];
        } else {
          y.push(s);
        }
        s.lane = l | 536870912;
      }
      return O;
    } else {
      return null;
    }
  }
  function Wu(t) {
    if (Oc > 50) {
      Oc = 0;
      vm = null;
      throw Error(i(185));
    }
    for (var s = t.return; s !== null;) {
      t = s;
      s = t.return;
    }
    if (t.tag === 3) {
      return t.stateNode;
    } else {
      return null;
    }
  }
  var el = {};
  function H2(t, s, l, y) {
    this.tag = t;
    this.key = l;
    this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
    this.index = 0;
    this.refCleanup = this.ref = null;
    this.pendingProps = s;
    this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
    this.mode = y;
    this.subtreeFlags = this.flags = 0;
    this.deletions = null;
    this.childLanes = this.lanes = 0;
    this.alternate = null;
  }
  function es(t, s, l, y) {
    return new H2(t, s, l, y);
  }
  function cp(t) {
    t = t.prototype;
    return !!t && !!t.isReactComponent;
  }
  function pi(t, s) {
    var l = t.alternate;
    if (l === null) {
      l = es(t.tag, s, t.key, t.mode);
      l.elementType = t.elementType;
      l.type = t.type;
      l.stateNode = t.stateNode;
      l.alternate = t;
      t.alternate = l;
    } else {
      l.pendingProps = s;
      l.type = t.type;
      l.flags = 0;
      l.subtreeFlags = 0;
      l.deletions = null;
    }
    l.flags = t.flags & 65011712;
    l.childLanes = t.childLanes;
    l.lanes = t.lanes;
    l.child = t.child;
    l.memoizedProps = t.memoizedProps;
    l.memoizedState = t.memoizedState;
    l.updateQueue = t.updateQueue;
    s = t.dependencies;
    l.dependencies = s === null ? null : {
      lanes: s.lanes,
      firstContext: s.firstContext
    };
    l.sibling = t.sibling;
    l.index = t.index;
    l.ref = t.ref;
    l.refCleanup = t.refCleanup;
    return l;
  }
  function fy(t, s) {
    t.flags &= 65011714;
    var l = t.alternate;
    if (l === null) {
      t.childLanes = 0;
      t.lanes = s;
      t.child = null;
      t.subtreeFlags = 0;
      t.memoizedProps = null;
      t.memoizedState = null;
      t.updateQueue = null;
      t.dependencies = null;
      t.stateNode = null;
    } else {
      t.childLanes = l.childLanes;
      t.lanes = l.lanes;
      t.child = l.child;
      t.subtreeFlags = 0;
      t.deletions = null;
      t.memoizedProps = l.memoizedProps;
      t.memoizedState = l.memoizedState;
      t.updateQueue = l.updateQueue;
      t.type = l.type;
      s = l.dependencies;
      t.dependencies = s === null ? null : {
        lanes: s.lanes,
        firstContext: s.firstContext
      };
    }
    return t;
  }
  function $u(t, s, l, y, k, O) {
    var K = 0;
    y = t;
    if (typeof t == "function") {
      if (cp(t)) {
        K = 1;
      }
    } else if (typeof t == "string") {
      K = $T(t, l, J.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    } else {
      e: switch (t) {
        case I:
          t = es(31, l, s, k);
          t.elementType = I;
          t.lanes = O;
          return t;
        case w:
          return ra(l.children, k, O, s);
        case g:
          K = 8;
          k |= 24;
          break;
        case b:
          t = es(12, l, s, k | 2);
          t.elementType = b;
          t.lanes = O;
          return t;
        case T:
          t = es(13, l, s, k);
          t.elementType = T;
          t.lanes = O;
          return t;
        case A:
          t = es(19, l, s, k);
          t.elementType = A;
          t.lanes = O;
          return t;
        default:
          if (typeof t == "object" && t !== null) {
            switch (t.$$typeof) {
              case v:
                K = 10;
                break e;
              case m:
                K = 9;
                break e;
              case C:
                K = 11;
                break e;
              case M:
                K = 14;
                break e;
              case R:
                K = 16;
                y = null;
                break e;
            }
          }
          K = 29;
          l = Error(i(130, t === null ? "null" : typeof t, ""));
          y = null;
      }
    }
    s = es(K, l, s, k);
    s.elementType = t;
    s.type = y;
    s.lanes = O;
    return s;
  }
  function ra(t, s, l, y) {
    t = es(7, t, y, s);
    t.lanes = l;
    return t;
  }
  function up(t, s, l) {
    t = es(6, t, null, s);
    t.lanes = l;
    return t;
  }
  function hy(t) {
    var s = es(18, null, null, 0);
    s.stateNode = t;
    return s;
  }
  function dp(t, s, l) {
    s = es(4, t.children !== null ? t.children : [], t.key, s);
    s.lanes = l;
    s.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    };
    return s;
  }
  var py = new WeakMap();
  function hs(t, s) {
    if (typeof t == "object" && t !== null) {
      var l = py.get(t);
      if (l !== undefined) {
        return l;
      } else {
        s = {
          value: t,
          source: s,
          stack: Q(s)
        };
        py.set(t, s);
        return s;
      }
    }
    return {
      value: t,
      source: s,
      stack: Q(s)
    };
  }
  var tl = [];
  var nl = 0;
  var qu = null;
  var uc = 0;
  var ps = [];
  var ms = 0;
  var Zi = null;
  var Gs = 1;
  var Ys = "";
  function mi(t, s) {
    tl[nl++] = uc;
    tl[nl++] = qu;
    qu = t;
    uc = s;
  }
  function my(t, s, l) {
    ps[ms++] = Gs;
    ps[ms++] = Ys;
    ps[ms++] = Zi;
    Zi = t;
    var y = Gs;
    t = Ys;
    var k = 32 - dt(y) - 1;
    y &= ~(1 << k);
    l += 1;
    var O = 32 - dt(s) + k;
    if (O > 30) {
      var K = k - k % 5;
      O = (y & (1 << K) - 1).toString(32);
      y >>= K;
      k -= K;
      Gs = 1 << 32 - dt(s) + k | l << k | y;
      Ys = O + t;
    } else {
      Gs = 1 << O | l << k | y;
      Ys = t;
    }
  }
  function fp(t) {
    if (t.return !== null) {
      mi(t, 1);
      my(t, 1, 0);
    }
  }
  function hp(t) {
    while (t === qu) {
      qu = tl[--nl];
      tl[nl] = null;
      uc = tl[--nl];
      tl[nl] = null;
    }
    while (t === Zi) {
      Zi = ps[--ms];
      ps[ms] = null;
      Ys = ps[--ms];
      ps[ms] = null;
      Gs = ps[--ms];
      ps[ms] = null;
    }
  }
  function gy(t, s) {
    ps[ms++] = Gs;
    ps[ms++] = Ys;
    ps[ms++] = Zi;
    Gs = s.id;
    Ys = s.overflow;
    Zi = t;
  }
  var pr = null;
  var En = null;
  var Qt = false;
  var Qi = null;
  var gs = false;
  var pp = Error(i(519));
  function Ji(t) {
    var s = Error(i(418, arguments.length > 1 && arguments[1] !== undefined && arguments[1] ? "text" : "HTML", ""));
    dc(hs(s, t));
    throw pp;
  }
  function vy(t) {
    var s = t.stateNode;
    var l = t.type;
    var y = t.memoizedProps;
    s[Ft] = t;
    s[sn] = y;
    switch (l) {
      case "dialog":
        Vt("cancel", s);
        Vt("close", s);
        break;
      case "iframe":
      case "object":
      case "embed":
        Vt("load", s);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Ic.length; l++) {
          Vt(Ic[l], s);
        }
        break;
      case "source":
        Vt("error", s);
        break;
      case "img":
      case "image":
      case "link":
        Vt("error", s);
        Vt("load", s);
        break;
      case "details":
        Vt("toggle", s);
        break;
      case "input":
        Vt("invalid", s);
        Go(s, y.value, y.defaultValue, y.checked, y.defaultChecked, y.type, y.name, true);
        break;
      case "select":
        Vt("invalid", s);
        break;
      case "textarea":
        Vt("invalid", s);
        Ms(s, y.value, y.defaultValue, y.children);
    }
    l = y.children;
    if (typeof l != "string" && typeof l != "number" && typeof l != "bigint" || s.textContent === "" + l || y.suppressHydrationWarning === true || L0(s.textContent, l)) {
      if (y.popover != null) {
        Vt("beforetoggle", s);
        Vt("toggle", s);
      }
      if (y.onScroll != null) {
        Vt("scroll", s);
      }
      if (y.onScrollEnd != null) {
        Vt("scrollend", s);
      }
      if (y.onClick != null) {
        s.onclick = Qr;
      }
      s = true;
    } else {
      s = false;
    }
    if (!s) {
      Ji(t, true);
    }
  }
  function by(t) {
    for (pr = t.return; pr;) {
      switch (pr.tag) {
        case 5:
        case 31:
        case 13:
          gs = false;
          return;
        case 27:
        case 3:
          gs = true;
          return;
        default:
          pr = pr.return;
      }
    }
  }
  function rl(t) {
    if (t !== pr) {
      return false;
    }
    if (!Qt) {
      by(t);
      Qt = true;
      return false;
    }
    var s = t.tag;
    var l;
    if (l = s !== 3 && s !== 27) {
      if (l = s === 5) {
        l = t.type;
        l = l === "form" || l === "button" || Dm(t.type, t.memoizedProps);
      }
      l = !l;
    }
    if (l && En) {
      Ji(t);
    }
    by(t);
    if (s === 13) {
      t = t.memoizedState;
      t = t !== null ? t.dehydrated : null;
      if (!t) {
        throw Error(i(317));
      }
      En = V0(t);
    } else if (s === 31) {
      t = t.memoizedState;
      t = t !== null ? t.dehydrated : null;
      if (!t) {
        throw Error(i(317));
      }
      En = V0(t);
    } else if (s === 27) {
      s = En;
      if (po(t.type)) {
        t = zm;
        zm = null;
        En = t;
      } else {
        En = s;
      }
    } else {
      En = pr ? bs(t.stateNode.nextSibling) : null;
    }
    return true;
  }
  function sa() {
    En = pr = null;
    Qt = false;
  }
  function mp() {
    var t = Qi;
    if (t !== null) {
      if (Hr === null) {
        Hr = t;
      } else {
        Hr.push.apply(Hr, t);
      }
      Qi = null;
    }
    return t;
  }
  function dc(t) {
    if (Qi === null) {
      Qi = [t];
    } else {
      Qi.push(t);
    }
  }
  var gp = P(null);
  var ia = null;
  var gi = null;
  function eo(t, s, l) {
    Z(gp, s._currentValue);
    s._currentValue = l;
  }
  function vi(t) {
    t._currentValue = gp.current;
    V(gp);
  }
  function vp(t, s, l) {
    while (t !== null) {
      var y = t.alternate;
      if ((t.childLanes & s) !== s) {
        t.childLanes |= s;
        if (y !== null) {
          y.childLanes |= s;
        }
      } else if (y !== null && (y.childLanes & s) !== s) {
        y.childLanes |= s;
      }
      if (t === l) {
        break;
      }
      t = t.return;
    }
  }
  function bp(t, s, l, y) {
    var k = t.child;
    for (k !== null && (k.return = t); k !== null;) {
      var O = k.dependencies;
      if (O !== null) {
        var K = k.child;
        O = O.firstContext;
        e: while (O !== null) {
          var le = O;
          O = k;
          for (var we = 0; we < s.length; we++) {
            if (le.context === s[we]) {
              O.lanes |= l;
              le = O.alternate;
              if (le !== null) {
                le.lanes |= l;
              }
              vp(O.return, l, t);
              if (!y) {
                K = null;
              }
              break e;
            }
          }
          O = le.next;
        }
      } else if (k.tag === 18) {
        K = k.return;
        if (K === null) {
          throw Error(i(341));
        }
        K.lanes |= l;
        O = K.alternate;
        if (O !== null) {
          O.lanes |= l;
        }
        vp(K, l, t);
        K = null;
      } else {
        K = k.child;
      }
      if (K !== null) {
        K.return = k;
      } else {
        for (K = k; K !== null;) {
          if (K === t) {
            K = null;
            break;
          }
          k = K.sibling;
          if (k !== null) {
            k.return = K.return;
            K = k;
            break;
          }
          K = K.return;
        }
      }
      k = K;
    }
  }
  function sl(t, s, l, y) {
    t = null;
    for (var k = s, O = false; k !== null;) {
      if (!O) {
        if ((k.flags & 524288) !== 0) {
          O = true;
        } else if ((k.flags & 262144) !== 0) {
          break;
        }
      }
      if (k.tag === 10) {
        var K = k.alternate;
        if (K === null) {
          throw Error(i(387));
        }
        K = K.memoizedProps;
        if (K !== null) {
          var le = k.type;
          if (!Jr(k.pendingProps.value, K.value)) {
            if (t !== null) {
              t.push(le);
            } else {
              t = [le];
            }
          }
        }
      } else if (k === ee.current) {
        K = k.alternate;
        if (K === null) {
          throw Error(i(387));
        }
        if (K.memoizedState.memoizedState !== k.memoizedState.memoizedState) {
          if (t !== null) {
            t.push(Nc);
          } else {
            t = [Nc];
          }
        }
      }
      k = k.return;
    }
    if (t !== null) {
      bp(s, t, l, y);
    }
    s.flags |= 262144;
  }
  function Gu(t) {
    for (t = t.firstContext; t !== null;) {
      if (!Jr(t.context._currentValue, t.memoizedValue)) {
        return true;
      }
      t = t.next;
    }
    return false;
  }
  function oa(t) {
    ia = t;
    gi = null;
    t = t.dependencies;
    if (t !== null) {
      t.firstContext = null;
    }
  }
  function mr(t) {
    return yy(ia, t);
  }
  function Yu(t, s) {
    if (ia === null) {
      oa(t);
    }
    return yy(t, s);
  }
  function yy(t, s) {
    var l = s._currentValue;
    s = {
      context: s,
      memoizedValue: l,
      next: null
    };
    if (gi === null) {
      if (t === null) {
        throw Error(i(308));
      }
      gi = s;
      t.dependencies = {
        lanes: 0,
        firstContext: s
      };
      t.flags |= 524288;
    } else {
      gi = gi.next = s;
    }
    return l;
  }
  var F2 = typeof AbortController !== "undefined" ? AbortController : function () {
    var t = [];
    var s = this.signal = {
      aborted: false,
      addEventListener: function (l, y) {
        t.push(y);
      }
    };
    this.abort = function () {
      s.aborted = true;
      t.forEach(function (l) {
        return l();
      });
    };
  };
  var U2 = e.unstable_scheduleCallback;
  var V2 = e.unstable_NormalPriority;
  var Xn = {
    $$typeof: v,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function yp() {
    return {
      controller: new F2(),
      data: new Map(),
      refCount: 0
    };
  }
  function fc(t) {
    t.refCount--;
    if (t.refCount === 0) {
      U2(V2, function () {
        t.controller.abort();
      });
    }
  }
  var hc = null;
  var _p = 0;
  var il = 0;
  var ol = null;
  function W2(t, s) {
    if (hc === null) {
      var l = hc = [];
      _p = 0;
      il = xm();
      ol = {
        status: "pending",
        value: undefined,
        then: function (y) {
          l.push(y);
        }
      };
    }
    _p++;
    s.then(_y, _y);
    return s;
  }
  function _y() {
    if (--_p === 0 && hc !== null) {
      if (ol !== null) {
        ol.status = "fulfilled";
      }
      var t = hc;
      hc = null;
      il = 0;
      ol = null;
      for (var s = 0; s < t.length; s++) {
        (0, t[s])();
      }
    }
  }
  function $2(t, s) {
    var l = [];
    var y = {
      status: "pending",
      value: null,
      reason: null,
      then: function (k) {
        l.push(k);
      }
    };
    t.then(function () {
      y.status = "fulfilled";
      y.value = s;
      for (var k = 0; k < l.length; k++) {
        (0, l[k])(s);
      }
    }, function (k) {
      y.status = "rejected";
      y.reason = k;
      k = 0;
      for (; k < l.length; k++) {
        (0, l[k])(undefined);
      }
    });
    return y;
  }
  var wy = G.S;
  G.S = function (t, s) {
    s0 = _e();
    if (typeof s == "object" && s !== null && typeof s.then == "function") {
      W2(t, s);
    }
    if (wy !== null) {
      wy(t, s);
    }
  };
  var aa = P(null);
  function wp() {
    var t = aa.current;
    if (t !== null) {
      return t;
    } else {
      return wn.pooledCache;
    }
  }
  function Xu(t, s) {
    if (s === null) {
      Z(aa, aa.current);
    } else {
      Z(aa, s.pool);
    }
  }
  function Sy() {
    var t = wp();
    if (t === null) {
      return null;
    } else {
      return {
        parent: Xn._currentValue,
        pool: t
      };
    }
  }
  var al = Error(i(460));
  var Sp = Error(i(474));
  var Ku = Error(i(542));
  var Zu = {
    then: function () {}
  };
  function xy(t) {
    t = t.status;
    return t === "fulfilled" || t === "rejected";
  }
  function Cy(t, s, l) {
    l = t[l];
    if (l === undefined) {
      t.push(s);
    } else if (l !== s) {
      s.then(Qr, Qr);
      s = l;
    }
    switch (s.status) {
      case "fulfilled":
        return s.value;
      case "rejected":
        t = s.reason;
        Ry(t);
        throw t;
      default:
        if (typeof s.status == "string") {
          s.then(Qr, Qr);
        } else {
          t = wn;
          if (t !== null && t.shellSuspendCounter > 100) {
            throw Error(i(482));
          }
          t = s;
          t.status = "pending";
          t.then(function (y) {
            if (s.status === "pending") {
              var k = s;
              k.status = "fulfilled";
              k.value = y;
            }
          }, function (y) {
            if (s.status === "pending") {
              var k = s;
              k.status = "rejected";
              k.reason = y;
            }
          });
        }
        switch (s.status) {
          case "fulfilled":
            return s.value;
          case "rejected":
            t = s.reason;
            Ry(t);
            throw t;
        }
        ca = s;
        throw al;
    }
  }
  function la(t) {
    try {
      var s = t._init;
      return s(t._payload);
    } catch (l) {
      throw l !== null && typeof l == "object" && typeof l.then == "function" ? (ca = l, al) : l;
    }
  }
  var ca = null;
  function Ey() {
    if (ca === null) {
      throw Error(i(459));
    }
    var t = ca;
    ca = null;
    return t;
  }
  function Ry(t) {
    if (t === al || t === Ku) {
      throw Error(i(483));
    }
  }
  var ll = null;
  var pc = 0;
  function Qu(t) {
    var s = pc;
    pc += 1;
    if (ll === null) {
      ll = [];
    }
    return Cy(ll, t, s);
  }
  function mc(t, s) {
    s = s.props.ref;
    t.ref = s !== undefined ? s : null;
  }
  function Ju(t, s) {
    throw s.$$typeof === S ? Error(i(525)) : (t = Object.prototype.toString.call(s), Error(i(31, t === "[object Object]" ? "object with keys {" + Object.keys(s).join(", ") + "}" : t)));
  }
  function Ty(t) {
    function s(Ee, xe) {
      if (t) {
        var ke = Ee.deletions;
        if (ke === null) {
          Ee.deletions = [xe];
          Ee.flags |= 16;
        } else {
          ke.push(xe);
        }
      }
    }
    function l(Ee, xe) {
      if (!t) {
        return null;
      }
      while (xe !== null) {
        s(Ee, xe);
        xe = xe.sibling;
      }
      return null;
    }
    function y(Ee) {
      var xe = new Map();
      for (; Ee !== null;) {
        if (Ee.key !== null) {
          xe.set(Ee.key, Ee);
        } else {
          xe.set(Ee.index, Ee);
        }
        Ee = Ee.sibling;
      }
      return xe;
    }
    function k(Ee, xe) {
      Ee = pi(Ee, xe);
      Ee.index = 0;
      Ee.sibling = null;
      return Ee;
    }
    function O(Ee, xe, ke) {
      Ee.index = ke;
      if (t) {
        ke = Ee.alternate;
        if (ke !== null) {
          ke = ke.index;
          if (ke < xe) {
            Ee.flags |= 67108866;
            return xe;
          } else {
            return ke;
          }
        } else {
          Ee.flags |= 67108866;
          return xe;
        }
      } else {
        Ee.flags |= 1048576;
        return xe;
      }
    }
    function K(Ee) {
      if (t && Ee.alternate === null) {
        Ee.flags |= 67108866;
      }
      return Ee;
    }
    function le(Ee, xe, ke, Ne) {
      if (xe === null || xe.tag !== 6) {
        xe = up(ke, Ee.mode, Ne);
        xe.return = Ee;
        return xe;
      } else {
        xe = k(xe, ke);
        xe.return = Ee;
        return xe;
      }
    }
    function we(Ee, xe, ke, Ne) {
      var mt = ke.type;
      if (mt === w) {
        return Le(Ee, xe, ke.props.children, Ne, ke.key);
      } else if (xe !== null && (xe.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === R && la(mt) === xe.type)) {
        xe = k(xe, ke.props);
        mc(xe, ke);
        xe.return = Ee;
        return xe;
      } else {
        xe = $u(ke.type, ke.key, ke.props, null, Ee.mode, Ne);
        mc(xe, ke);
        xe.return = Ee;
        return xe;
      }
    }
    function Ae(Ee, xe, ke, Ne) {
      if (xe === null || xe.tag !== 4 || xe.stateNode.containerInfo !== ke.containerInfo || xe.stateNode.implementation !== ke.implementation) {
        xe = dp(ke, Ee.mode, Ne);
        xe.return = Ee;
        return xe;
      } else {
        xe = k(xe, ke.children || []);
        xe.return = Ee;
        return xe;
      }
    }
    function Le(Ee, xe, ke, Ne, mt) {
      if (xe === null || xe.tag !== 7) {
        xe = ra(ke, Ee.mode, Ne, mt);
        xe.return = Ee;
        return xe;
      } else {
        xe = k(xe, ke);
        xe.return = Ee;
        return xe;
      }
    }
    function He(Ee, xe, ke) {
      if (typeof xe == "string" && xe !== "" || typeof xe == "number" || typeof xe == "bigint") {
        xe = up("" + xe, Ee.mode, ke);
        xe.return = Ee;
        return xe;
      }
      if (typeof xe == "object" && xe !== null) {
        switch (xe.$$typeof) {
          case _:
            ke = $u(xe.type, xe.key, xe.props, null, Ee.mode, ke);
            mc(ke, xe);
            ke.return = Ee;
            return ke;
          case x:
            xe = dp(xe, Ee.mode, ke);
            xe.return = Ee;
            return xe;
          case R:
            xe = la(xe);
            return He(Ee, xe, ke);
        }
        if ($(xe) || z(xe)) {
          xe = ra(xe, Ee.mode, ke, null);
          xe.return = Ee;
          return xe;
        }
        if (typeof xe.then == "function") {
          return He(Ee, Qu(xe), ke);
        }
        if (xe.$$typeof === v) {
          return He(Ee, Yu(Ee, xe), ke);
        }
        Ju(Ee, xe);
      }
      return null;
    }
    function Oe(Ee, xe, ke, Ne) {
      var mt = xe !== null ? xe.key : null;
      if (typeof ke == "string" && ke !== "" || typeof ke == "number" || typeof ke == "bigint") {
        if (mt !== null) {
          return null;
        } else {
          return le(Ee, xe, "" + ke, Ne);
        }
      }
      if (typeof ke == "object" && ke !== null) {
        switch (ke.$$typeof) {
          case _:
            if (ke.key === mt) {
              return we(Ee, xe, ke, Ne);
            } else {
              return null;
            }
          case x:
            if (ke.key === mt) {
              return Ae(Ee, xe, ke, Ne);
            } else {
              return null;
            }
          case R:
            ke = la(ke);
            return Oe(Ee, xe, ke, Ne);
        }
        if ($(ke) || z(ke)) {
          if (mt !== null) {
            return null;
          } else {
            return Le(Ee, xe, ke, Ne, null);
          }
        }
        if (typeof ke.then == "function") {
          return Oe(Ee, xe, Qu(ke), Ne);
        }
        if (ke.$$typeof === v) {
          return Oe(Ee, xe, Yu(Ee, ke), Ne);
        }
        Ju(Ee, ke);
      }
      return null;
    }
    function De(Ee, xe, ke, Ne, mt) {
      if (typeof Ne == "string" && Ne !== "" || typeof Ne == "number" || typeof Ne == "bigint") {
        Ee = Ee.get(ke) || null;
        return le(xe, Ee, "" + Ne, mt);
      }
      if (typeof Ne == "object" && Ne !== null) {
        switch (Ne.$$typeof) {
          case _:
            Ee = Ee.get(Ne.key === null ? ke : Ne.key) || null;
            return we(xe, Ee, Ne, mt);
          case x:
            Ee = Ee.get(Ne.key === null ? ke : Ne.key) || null;
            return Ae(xe, Ee, Ne, mt);
          case R:
            Ne = la(Ne);
            return De(Ee, xe, ke, Ne, mt);
        }
        if ($(Ne) || z(Ne)) {
          Ee = Ee.get(ke) || null;
          return Le(xe, Ee, Ne, mt, null);
        }
        if (typeof Ne.then == "function") {
          return De(Ee, xe, ke, Qu(Ne), mt);
        }
        if (Ne.$$typeof === v) {
          return De(Ee, xe, ke, Yu(xe, Ne), mt);
        }
        Ju(xe, Ne);
      }
      return null;
    }
    function at(Ee, xe, ke, Ne) {
      var mt = null;
      var on = null;
      for (var ut = xe, Pt = xe = 0, Gt = null; ut !== null && Pt < ke.length; Pt++) {
        if (ut.index > Pt) {
          Gt = ut;
          ut = null;
        } else {
          Gt = ut.sibling;
        }
        var an = Oe(Ee, ut, ke[Pt], Ne);
        if (an === null) {
          if (ut === null) {
            ut = Gt;
          }
          break;
        }
        if (t && ut && an.alternate === null) {
          s(Ee, ut);
        }
        xe = O(an, xe, Pt);
        if (on === null) {
          mt = an;
        } else {
          on.sibling = an;
        }
        on = an;
        ut = Gt;
      }
      if (Pt === ke.length) {
        l(Ee, ut);
        if (Qt) {
          mi(Ee, Pt);
        }
        return mt;
      }
      if (ut === null) {
        for (; Pt < ke.length; Pt++) {
          ut = He(Ee, ke[Pt], Ne);
          if (ut !== null) {
            xe = O(ut, xe, Pt);
            if (on === null) {
              mt = ut;
            } else {
              on.sibling = ut;
            }
            on = ut;
          }
        }
        if (Qt) {
          mi(Ee, Pt);
        }
        return mt;
      }
      for (ut = y(ut); Pt < ke.length; Pt++) {
        Gt = De(ut, Ee, Pt, ke[Pt], Ne);
        if (Gt !== null) {
          if (t && Gt.alternate !== null) {
            ut.delete(Gt.key === null ? Pt : Gt.key);
          }
          xe = O(Gt, xe, Pt);
          if (on === null) {
            mt = Gt;
          } else {
            on.sibling = Gt;
          }
          on = Gt;
        }
      }
      if (t) {
        ut.forEach(function (yo) {
          return s(Ee, yo);
        });
      }
      if (Qt) {
        mi(Ee, Pt);
      }
      return mt;
    }
    function wt(Ee, xe, ke, Ne) {
      if (ke == null) {
        throw Error(i(151));
      }
      var mt = null;
      var on = null;
      for (var ut = xe, Pt = xe = 0, Gt = null, an = ke.next(); ut !== null && !an.done; Pt++, an = ke.next()) {
        if (ut.index > Pt) {
          Gt = ut;
          ut = null;
        } else {
          Gt = ut.sibling;
        }
        var yo = Oe(Ee, ut, an.value, Ne);
        if (yo === null) {
          if (ut === null) {
            ut = Gt;
          }
          break;
        }
        if (t && ut && yo.alternate === null) {
          s(Ee, ut);
        }
        xe = O(yo, xe, Pt);
        if (on === null) {
          mt = yo;
        } else {
          on.sibling = yo;
        }
        on = yo;
        ut = Gt;
      }
      if (an.done) {
        l(Ee, ut);
        if (Qt) {
          mi(Ee, Pt);
        }
        return mt;
      }
      if (ut === null) {
        for (; !an.done; Pt++, an = ke.next()) {
          an = He(Ee, an.value, Ne);
          if (an !== null) {
            xe = O(an, xe, Pt);
            if (on === null) {
              mt = an;
            } else {
              on.sibling = an;
            }
            on = an;
          }
        }
        if (Qt) {
          mi(Ee, Pt);
        }
        return mt;
      }
      for (ut = y(ut); !an.done; Pt++, an = ke.next()) {
        an = De(ut, Ee, Pt, an.value, Ne);
        if (an !== null) {
          if (t && an.alternate !== null) {
            ut.delete(an.key === null ? Pt : an.key);
          }
          xe = O(an, xe, Pt);
          if (on === null) {
            mt = an;
          } else {
            on.sibling = an;
          }
          on = an;
        }
      }
      if (t) {
        ut.forEach(function (nk) {
          return s(Ee, nk);
        });
      }
      if (Qt) {
        mi(Ee, Pt);
      }
      return mt;
    }
    function bn(Ee, xe, ke, Ne) {
      if (typeof ke == "object" && ke !== null && ke.type === w && ke.key === null) {
        ke = ke.props.children;
      }
      if (typeof ke == "object" && ke !== null) {
        switch (ke.$$typeof) {
          case _:
            e: {
              var mt = ke.key;
              for (; xe !== null;) {
                if (xe.key === mt) {
                  mt = ke.type;
                  if (mt === w) {
                    if (xe.tag === 7) {
                      l(Ee, xe.sibling);
                      Ne = k(xe, ke.props.children);
                      Ne.return = Ee;
                      Ee = Ne;
                      break e;
                    }
                  } else if (xe.elementType === mt || typeof mt == "object" && mt !== null && mt.$$typeof === R && la(mt) === xe.type) {
                    l(Ee, xe.sibling);
                    Ne = k(xe, ke.props);
                    mc(Ne, ke);
                    Ne.return = Ee;
                    Ee = Ne;
                    break e;
                  }
                  l(Ee, xe);
                  break;
                } else {
                  s(Ee, xe);
                }
                xe = xe.sibling;
              }
              if (ke.type === w) {
                Ne = ra(ke.props.children, Ee.mode, Ne, ke.key);
                Ne.return = Ee;
                Ee = Ne;
              } else {
                Ne = $u(ke.type, ke.key, ke.props, null, Ee.mode, Ne);
                mc(Ne, ke);
                Ne.return = Ee;
                Ee = Ne;
              }
            }
            return K(Ee);
          case x:
            e: {
              for (mt = ke.key; xe !== null;) {
                if (xe.key === mt) {
                  if (xe.tag === 4 && xe.stateNode.containerInfo === ke.containerInfo && xe.stateNode.implementation === ke.implementation) {
                    l(Ee, xe.sibling);
                    Ne = k(xe, ke.children || []);
                    Ne.return = Ee;
                    Ee = Ne;
                    break e;
                  } else {
                    l(Ee, xe);
                    break;
                  }
                } else {
                  s(Ee, xe);
                }
                xe = xe.sibling;
              }
              Ne = dp(ke, Ee.mode, Ne);
              Ne.return = Ee;
              Ee = Ne;
            }
            return K(Ee);
          case R:
            ke = la(ke);
            return bn(Ee, xe, ke, Ne);
        }
        if ($(ke)) {
          return at(Ee, xe, ke, Ne);
        }
        if (z(ke)) {
          mt = z(ke);
          if (typeof mt != "function") {
            throw Error(i(150));
          }
          ke = mt.call(ke);
          return wt(Ee, xe, ke, Ne);
        }
        if (typeof ke.then == "function") {
          return bn(Ee, xe, Qu(ke), Ne);
        }
        if (ke.$$typeof === v) {
          return bn(Ee, xe, Yu(Ee, ke), Ne);
        }
        Ju(Ee, ke);
      }
      if (typeof ke == "string" && ke !== "" || typeof ke == "number" || typeof ke == "bigint") {
        ke = "" + ke;
        if (xe !== null && xe.tag === 6) {
          l(Ee, xe.sibling);
          Ne = k(xe, ke);
          Ne.return = Ee;
          Ee = Ne;
        } else {
          l(Ee, xe);
          Ne = up(ke, Ee.mode, Ne);
          Ne.return = Ee;
          Ee = Ne;
        }
        return K(Ee);
      } else {
        return l(Ee, xe);
      }
    }
    return function (Ee, xe, ke, Ne) {
      try {
        pc = 0;
        var mt = bn(Ee, xe, ke, Ne);
        ll = null;
        return mt;
      } catch (ut) {
        if (ut === al || ut === Ku) {
          throw ut;
        }
        var on = es(29, ut, null, Ee.mode);
        on.lanes = Ne;
        on.return = Ee;
        return on;
      } finally {}
    };
  }
  var ua = Ty(true);
  var ky = Ty(false);
  var to = false;
  function xp(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        lanes: 0,
        hiddenCallbacks: null
      },
      callbacks: null
    };
  }
  function Cp(t, s) {
    t = t.updateQueue;
    if (s.updateQueue === t) {
      s.updateQueue = {
        baseState: t.baseState,
        firstBaseUpdate: t.firstBaseUpdate,
        lastBaseUpdate: t.lastBaseUpdate,
        shared: t.shared,
        callbacks: null
      };
    }
  }
  function no(t) {
    return {
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null
    };
  }
  function ro(t, s, l) {
    var y = t.updateQueue;
    if (y === null) {
      return null;
    }
    y = y.shared;
    if ((cn & 2) !== 0) {
      var k = y.pending;
      if (k === null) {
        s.next = s;
      } else {
        s.next = k.next;
        k.next = s;
      }
      y.pending = s;
      s = Wu(t);
      dy(t, null, l);
      return s;
    }
    Vu(t, y, s, l);
    return Wu(t);
  }
  function gc(t, s, l) {
    s = s.updateQueue;
    if (s !== null && (s = s.shared, (l & 4194048) !== 0)) {
      var y = s.lanes;
      y &= t.pendingLanes;
      l |= y;
      s.lanes = l;
      Ln(t, l);
    }
  }
  function Ep(t, s) {
    var l = t.updateQueue;
    var y = t.alternate;
    if (y !== null && (y = y.updateQueue, l === y)) {
      var k = null;
      var O = null;
      l = l.firstBaseUpdate;
      if (l !== null) {
        do {
          var K = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null
          };
          if (O === null) {
            k = O = K;
          } else {
            O = O.next = K;
          }
          l = l.next;
        } while (l !== null);
        if (O === null) {
          k = O = s;
        } else {
          O = O.next = s;
        }
      } else {
        k = O = s;
      }
      l = {
        baseState: y.baseState,
        firstBaseUpdate: k,
        lastBaseUpdate: O,
        shared: y.shared,
        callbacks: y.callbacks
      };
      t.updateQueue = l;
      return;
    }
    t = l.lastBaseUpdate;
    if (t === null) {
      l.firstBaseUpdate = s;
    } else {
      t.next = s;
    }
    l.lastBaseUpdate = s;
  }
  var Rp = false;
  function vc() {
    if (Rp) {
      var t = ol;
      if (t !== null) {
        throw t;
      }
    }
  }
  function bc(t, s, l, y) {
    Rp = false;
    var k = t.updateQueue;
    to = false;
    var O = k.firstBaseUpdate;
    var K = k.lastBaseUpdate;
    var le = k.shared.pending;
    if (le !== null) {
      k.shared.pending = null;
      var we = le;
      var Ae = we.next;
      we.next = null;
      if (K === null) {
        O = Ae;
      } else {
        K.next = Ae;
      }
      K = we;
      var Le = t.alternate;
      if (Le !== null) {
        Le = Le.updateQueue;
        le = Le.lastBaseUpdate;
        if (le !== K) {
          if (le === null) {
            Le.firstBaseUpdate = Ae;
          } else {
            le.next = Ae;
          }
          Le.lastBaseUpdate = we;
        }
      }
    }
    if (O !== null) {
      var He = k.baseState;
      K = 0;
      Le = Ae = we = null;
      le = O;
      do {
        var Oe = le.lane & -536870913;
        var De = Oe !== le.lane;
        if (De ? (qt & Oe) === Oe : (y & Oe) === Oe) {
          if (Oe !== 0 && Oe === il) {
            Rp = true;
          }
          if (Le !== null) {
            Le = Le.next = {
              lane: 0,
              tag: le.tag,
              payload: le.payload,
              callback: null,
              next: null
            };
          }
          e: {
            var at = t;
            var wt = le;
            Oe = s;
            var bn = l;
            switch (wt.tag) {
              case 1:
                at = wt.payload;
                if (typeof at == "function") {
                  He = at.call(bn, He, Oe);
                  break e;
                }
                He = at;
                break e;
              case 3:
                at.flags = at.flags & -65537 | 128;
              case 0:
                at = wt.payload;
                Oe = typeof at == "function" ? at.call(bn, He, Oe) : at;
                if (Oe == null) {
                  break e;
                }
                He = f({}, He, Oe);
                break e;
              case 2:
                to = true;
            }
          }
          Oe = le.callback;
          if (Oe !== null) {
            t.flags |= 64;
            if (De) {
              t.flags |= 8192;
            }
            De = k.callbacks;
            if (De === null) {
              k.callbacks = [Oe];
            } else {
              De.push(Oe);
            }
          }
        } else {
          De = {
            lane: Oe,
            tag: le.tag,
            payload: le.payload,
            callback: le.callback,
            next: null
          };
          if (Le === null) {
            Ae = Le = De;
            we = He;
          } else {
            Le = Le.next = De;
          }
          K |= Oe;
        }
        le = le.next;
        if (le === null) {
          le = k.shared.pending;
          if (le === null) {
            break;
          }
          De = le;
          le = De.next;
          De.next = null;
          k.lastBaseUpdate = De;
          k.shared.pending = null;
        }
      } while (true);
      if (Le === null) {
        we = He;
      }
      k.baseState = we;
      k.firstBaseUpdate = Ae;
      k.lastBaseUpdate = Le;
      if (O === null) {
        k.shared.lanes = 0;
      }
      lo |= K;
      t.lanes = K;
      t.memoizedState = He;
    }
  }
  function Ay(t, s) {
    if (typeof t != "function") {
      throw Error(i(191, t));
    }
    t.call(s);
  }
  function My(t, s) {
    var l = t.callbacks;
    if (l !== null) {
      t.callbacks = null;
      t = 0;
      for (; t < l.length; t++) {
        Ay(l[t], s);
      }
    }
  }
  var cl = P(null);
  var ed = P(0);
  function Oy(t, s) {
    t = Ri;
    Z(ed, t);
    Z(cl, s);
    Ri = t | s.baseLanes;
  }
  function Tp() {
    Z(ed, Ri);
    Z(cl, cl.current);
  }
  function kp() {
    Ri = ed.current;
    V(cl);
    V(ed);
  }
  var ts = P(null);
  var vs = null;
  function so(t) {
    var s = t.alternate;
    Z(Vn, Vn.current & 1);
    Z(ts, t);
    if (vs === null && (s === null || cl.current !== null || s.memoizedState !== null)) {
      vs = t;
    }
  }
  function Ap(t) {
    Z(Vn, Vn.current);
    Z(ts, t);
    if (vs === null) {
      vs = t;
    }
  }
  function Dy(t) {
    if (t.tag === 22) {
      Z(Vn, Vn.current);
      Z(ts, t);
      if (vs === null) {
        vs = t;
      }
    } else {
      io();
    }
  }
  function io() {
    Z(Vn, Vn.current);
    Z(ts, ts.current);
  }
  function ns(t) {
    V(ts);
    if (vs === t) {
      vs = null;
    }
    V(Vn);
  }
  var Vn = P(0);
  function td(t) {
    for (var s = t; s !== null;) {
      if (s.tag === 13) {
        var l = s.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || Pm(l) || Bm(l))) {
          return s;
        }
      } else if (s.tag === 19 && (s.memoizedProps.revealOrder === "forwards" || s.memoizedProps.revealOrder === "backwards" || s.memoizedProps.revealOrder === "unstable_legacy-backwards" || s.memoizedProps.revealOrder === "together")) {
        if ((s.flags & 128) !== 0) {
          return s;
        }
      } else if (s.child !== null) {
        s.child.return = s;
        s = s.child;
        continue;
      }
      if (s === t) {
        break;
      }
      while (s.sibling === null) {
        if (s.return === null || s.return === t) {
          return null;
        }
        s = s.return;
      }
      s.sibling.return = s.return;
      s = s.sibling;
    }
    return null;
  }
  var bi = 0;
  var Lt = null;
  var gn = null;
  var Kn = null;
  var nd = false;
  var ul = false;
  var da = false;
  var rd = 0;
  var yc = 0;
  var dl = null;
  var q2 = 0;
  function zn() {
    throw Error(i(321));
  }
  function Mp(t, s) {
    if (s === null) {
      return false;
    }
    for (var l = 0; l < s.length && l < t.length; l++) {
      if (!Jr(t[l], s[l])) {
        return false;
      }
    }
    return true;
  }
  function Op(t, s, l, y, k, O) {
    bi = O;
    Lt = s;
    s.memoizedState = null;
    s.updateQueue = null;
    s.lanes = 0;
    G.H = t === null || t.memoizedState === null ? m_ : qp;
    da = false;
    O = l(y, k);
    da = false;
    if (ul) {
      O = Ly(s, l, y, k);
    }
    Iy(t);
    return O;
  }
  function Iy(t) {
    G.H = Sc;
    var s = gn !== null && gn.next !== null;
    bi = 0;
    Kn = gn = Lt = null;
    nd = false;
    yc = 0;
    dl = null;
    if (s) {
      throw Error(i(300));
    }
    if (t !== null && !Zn) {
      t = t.dependencies;
      if (t !== null && Gu(t)) {
        Zn = true;
      }
    }
  }
  function Ly(t, s, l, y) {
    Lt = t;
    var k = 0;
    do {
      if (ul) {
        dl = null;
      }
      yc = 0;
      ul = false;
      if (k >= 25) {
        throw Error(i(301));
      }
      k += 1;
      Kn = gn = null;
      if (t.updateQueue != null) {
        var O = t.updateQueue;
        O.lastEffect = null;
        O.events = null;
        O.stores = null;
        if (O.memoCache != null) {
          O.memoCache.index = 0;
        }
      }
      G.H = g_;
      O = s(l, y);
    } while (ul);
    return O;
  }
  function G2() {
    var t = G.H;
    var s = t.useState()[0];
    s = typeof s.then == "function" ? _c(s) : s;
    t = t.useState()[0];
    if ((gn !== null ? gn.memoizedState : null) !== t) {
      Lt.flags |= 1024;
    }
    return s;
  }
  function Dp() {
    var t = rd !== 0;
    rd = 0;
    return t;
  }
  function Ip(t, s, l) {
    s.updateQueue = t.updateQueue;
    s.flags &= -2053;
    t.lanes &= ~l;
  }
  function Lp(t) {
    if (nd) {
      for (t = t.memoizedState; t !== null;) {
        var s = t.queue;
        if (s !== null) {
          s.pending = null;
        }
        t = t.next;
      }
      nd = false;
    }
    bi = 0;
    Kn = gn = Lt = null;
    ul = false;
    yc = rd = 0;
    dl = null;
  }
  function Or() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    if (Kn === null) {
      Lt.memoizedState = Kn = t;
    } else {
      Kn = Kn.next = t;
    }
    return Kn;
  }
  function Wn() {
    if (gn === null) {
      var t = Lt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else {
      t = gn.next;
    }
    var s = Kn === null ? Lt.memoizedState : Kn.next;
    if (s !== null) {
      Kn = s;
      gn = t;
    } else {
      if (t === null) {
        throw Lt.alternate === null ? Error(i(467)) : Error(i(310));
      }
      gn = t;
      t = {
        memoizedState: gn.memoizedState,
        baseState: gn.baseState,
        baseQueue: gn.baseQueue,
        queue: gn.queue,
        next: null
      };
      if (Kn === null) {
        Lt.memoizedState = Kn = t;
      } else {
        Kn = Kn.next = t;
      }
    }
    return Kn;
  }
  function sd() {
    return {
      lastEffect: null,
      events: null,
      stores: null,
      memoCache: null
    };
  }
  function _c(t) {
    var s = yc;
    yc += 1;
    if (dl === null) {
      dl = [];
    }
    t = Cy(dl, t, s);
    s = Lt;
    if ((Kn === null ? s.memoizedState : Kn.next) === null) {
      s = s.alternate;
      G.H = s === null || s.memoizedState === null ? m_ : qp;
    }
    return t;
  }
  function id(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") {
        return _c(t);
      }
      if (t.$$typeof === v) {
        return mr(t);
      }
    }
    throw Error(i(438, String(t)));
  }
  function Pp(t) {
    var s = null;
    var l = Lt.updateQueue;
    if (l !== null) {
      s = l.memoCache;
    }
    if (s == null) {
      var y = Lt.alternate;
      if (y !== null) {
        y = y.updateQueue;
        if (y !== null) {
          y = y.memoCache;
          if (y != null) {
            s = {
              data: y.data.map(function (k) {
                return k.slice();
              }),
              index: 0
            };
          }
        }
      }
    }
    if (s == null) {
      s = {
        data: [],
        index: 0
      };
    }
    if (l === null) {
      l = sd();
      Lt.updateQueue = l;
    }
    l.memoCache = s;
    l = s.data[s.index];
    if (l === undefined) {
      l = s.data[s.index] = Array(t);
      y = 0;
      for (; y < t; y++) {
        l[y] = j;
      }
    }
    s.index++;
    return l;
  }
  function yi(t, s) {
    if (typeof s == "function") {
      return s(t);
    } else {
      return s;
    }
  }
  function od(t) {
    var s = Wn();
    return Bp(s, gn, t);
  }
  function Bp(t, s, l) {
    var y = t.queue;
    if (y === null) {
      throw Error(i(311));
    }
    y.lastRenderedReducer = l;
    var k = t.baseQueue;
    var O = y.pending;
    if (O !== null) {
      if (k !== null) {
        var K = k.next;
        k.next = O.next;
        O.next = K;
      }
      s.baseQueue = k = O;
      y.pending = null;
    }
    O = t.baseState;
    if (k === null) {
      t.memoizedState = O;
    } else {
      s = k.next;
      var le = K = null;
      var we = null;
      var Ae = s;
      var Le = false;
      do {
        var He = Ae.lane & -536870913;
        if (He !== Ae.lane ? (qt & He) === He : (bi & He) === He) {
          var Oe = Ae.revertLane;
          if (Oe === 0) {
            if (we !== null) {
              we = we.next = {
                lane: 0,
                revertLane: 0,
                gesture: null,
                action: Ae.action,
                hasEagerState: Ae.hasEagerState,
                eagerState: Ae.eagerState,
                next: null
              };
            }
            if (He === il) {
              Le = true;
            }
          } else if ((bi & Oe) === Oe) {
            Ae = Ae.next;
            if (Oe === il) {
              Le = true;
            }
            continue;
          } else {
            He = {
              lane: 0,
              revertLane: Ae.revertLane,
              gesture: null,
              action: Ae.action,
              hasEagerState: Ae.hasEagerState,
              eagerState: Ae.eagerState,
              next: null
            };
            if (we === null) {
              le = we = He;
              K = O;
            } else {
              we = we.next = He;
            }
            Lt.lanes |= Oe;
            lo |= Oe;
          }
          He = Ae.action;
          if (da) {
            l(O, He);
          }
          O = Ae.hasEagerState ? Ae.eagerState : l(O, He);
        } else {
          Oe = {
            lane: He,
            revertLane: Ae.revertLane,
            gesture: Ae.gesture,
            action: Ae.action,
            hasEagerState: Ae.hasEagerState,
            eagerState: Ae.eagerState,
            next: null
          };
          if (we === null) {
            le = we = Oe;
            K = O;
          } else {
            we = we.next = Oe;
          }
          Lt.lanes |= He;
          lo |= He;
        }
        Ae = Ae.next;
      } while (Ae !== null && Ae !== s);
      if (we === null) {
        K = O;
      } else {
        we.next = le;
      }
      if (!Jr(O, t.memoizedState) && (Zn = true, Le && (l = ol, l !== null))) {
        throw l;
      }
      t.memoizedState = O;
      t.baseState = K;
      t.baseQueue = we;
      y.lastRenderedState = O;
    }
    if (k === null) {
      y.lanes = 0;
    }
    return [t.memoizedState, y.dispatch];
  }
  function zp(t) {
    var s = Wn();
    var l = s.queue;
    if (l === null) {
      throw Error(i(311));
    }
    l.lastRenderedReducer = t;
    var y = l.dispatch;
    var k = l.pending;
    var O = s.memoizedState;
    if (k !== null) {
      l.pending = null;
      var K = k = k.next;
      do {
        O = t(O, K.action);
        K = K.next;
      } while (K !== k);
      if (!Jr(O, s.memoizedState)) {
        Zn = true;
      }
      s.memoizedState = O;
      if (s.baseQueue === null) {
        s.baseState = O;
      }
      l.lastRenderedState = O;
    }
    return [O, y];
  }
  function Py(t, s, l) {
    var y = Lt;
    var k = Wn();
    var O = Qt;
    if (O) {
      if (l === undefined) {
        throw Error(i(407));
      }
      l = l();
    } else {
      l = s();
    }
    var K = !Jr((gn || k).memoizedState, l);
    if (K) {
      k.memoizedState = l;
      Zn = true;
    }
    k = k.queue;
    Hp(Ny.bind(null, y, k, t), [t]);
    if (k.getSnapshot !== s || K || Kn !== null && Kn.memoizedState.tag & 1) {
      y.flags |= 2048;
      fl(9, {
        destroy: undefined
      }, zy.bind(null, y, k, l, s), null);
      if (wn === null) {
        throw Error(i(349));
      }
      if (!O && (bi & 127) === 0) {
        By(y, s, l);
      }
    }
    return l;
  }
  function By(t, s, l) {
    t.flags |= 16384;
    t = {
      getSnapshot: s,
      value: l
    };
    s = Lt.updateQueue;
    if (s === null) {
      s = sd();
      Lt.updateQueue = s;
      s.stores = [t];
    } else {
      l = s.stores;
      if (l === null) {
        s.stores = [t];
      } else {
        l.push(t);
      }
    }
  }
  function zy(t, s, l, y) {
    s.value = l;
    s.getSnapshot = y;
    if (jy(s)) {
      Hy(t);
    }
  }
  function Ny(t, s, l) {
    return l(function () {
      if (jy(s)) {
        Hy(t);
      }
    });
  }
  function jy(t) {
    var s = t.getSnapshot;
    t = t.value;
    try {
      var l = s();
      return !Jr(t, l);
    } catch {
      return true;
    }
  }
  function Hy(t) {
    var s = na(t, 2);
    if (s !== null) {
      Fr(s, t, 2);
    }
  }
  function Np(t) {
    var s = Or();
    if (typeof t == "function") {
      var l = t;
      t = l();
      if (da) {
        lt(true);
        try {
          l();
        } finally {
          lt(false);
        }
      }
    }
    s.memoizedState = s.baseState = t;
    s.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: yi,
      lastRenderedState: t
    };
    return s;
  }
  function Fy(t, s, l, y) {
    t.baseState = l;
    return Bp(t, gn, typeof y == "function" ? y : yi);
  }
  function Y2(t, s, l, y, k) {
    if (cd(t)) {
      throw Error(i(485));
    }
    t = s.action;
    if (t !== null) {
      var O = {
        payload: k,
        action: t,
        next: null,
        isTransition: true,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (K) {
          O.listeners.push(K);
        }
      };
      if (G.T !== null) {
        l(true);
      } else {
        O.isTransition = false;
      }
      y(O);
      l = s.pending;
      if (l === null) {
        O.next = s.pending = O;
        Uy(s, O);
      } else {
        O.next = l.next;
        s.pending = l.next = O;
      }
    }
  }
  function Uy(t, s) {
    var l = s.action;
    var y = s.payload;
    var k = t.state;
    if (s.isTransition) {
      var O = G.T;
      var K = {};
      G.T = K;
      try {
        var le = l(k, y);
        var we = G.S;
        if (we !== null) {
          we(K, le);
        }
        Vy(t, s, le);
      } catch (Ae) {
        jp(t, s, Ae);
      } finally {
        if (O !== null && K.types !== null) {
          O.types = K.types;
        }
        G.T = O;
      }
    } else {
      try {
        O = l(k, y);
        Vy(t, s, O);
      } catch (Ae) {
        jp(t, s, Ae);
      }
    }
  }
  function Vy(t, s, l) {
    if (l !== null && typeof l == "object" && typeof l.then == "function") {
      l.then(function (y) {
        Wy(t, s, y);
      }, function (y) {
        return jp(t, s, y);
      });
    } else {
      Wy(t, s, l);
    }
  }
  function Wy(t, s, l) {
    s.status = "fulfilled";
    s.value = l;
    $y(s);
    t.state = l;
    s = t.pending;
    if (s !== null) {
      l = s.next;
      if (l === s) {
        t.pending = null;
      } else {
        l = l.next;
        s.next = l;
        Uy(t, l);
      }
    }
  }
  function jp(t, s, l) {
    var y = t.pending;
    t.pending = null;
    if (y !== null) {
      y = y.next;
      do {
        s.status = "rejected";
        s.reason = l;
        $y(s);
        s = s.next;
      } while (s !== y);
    }
    t.action = null;
  }
  function $y(t) {
    t = t.listeners;
    for (var s = 0; s < t.length; s++) {
      (0, t[s])();
    }
  }
  function qy(t, s) {
    return s;
  }
  function Gy(t, s) {
    if (Qt) {
      var l = wn.formState;
      if (l !== null) {
        e: {
          var y = Lt;
          if (Qt) {
            if (En) {
              t: {
                for (var k = En, O = gs; k.nodeType !== 8;) {
                  if (!O) {
                    k = null;
                    break t;
                  }
                  k = bs(k.nextSibling);
                  if (k === null) {
                    k = null;
                    break t;
                  }
                }
                O = k.data;
                k = O === "F!" || O === "F" ? k : null;
              }
              if (k) {
                En = bs(k.nextSibling);
                y = k.data === "F!";
                break e;
              }
            }
            Ji(y);
          }
          y = false;
        }
        if (y) {
          s = l[0];
        }
      }
    }
    l = Or();
    l.memoizedState = l.baseState = s;
    y = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: qy,
      lastRenderedState: s
    };
    l.queue = y;
    l = f_.bind(null, Lt, y);
    y.dispatch = l;
    y = Np(false);
    O = $p.bind(null, Lt, false, y.queue);
    y = Or();
    k = {
      state: s,
      dispatch: null,
      action: t,
      pending: null
    };
    y.queue = k;
    l = Y2.bind(null, Lt, k, O, l);
    k.dispatch = l;
    y.memoizedState = t;
    return [s, l, false];
  }
  function Yy(t) {
    var s = Wn();
    return Xy(s, gn, t);
  }
  function Xy(t, s, l) {
    s = Bp(t, s, qy)[0];
    t = od(yi)[0];
    if (typeof s == "object" && s !== null && typeof s.then == "function") {
      try {
        var y = _c(s);
      } catch (K) {
        throw K === al ? Ku : K;
      }
    } else {
      y = s;
    }
    s = Wn();
    var k = s.queue;
    var O = k.dispatch;
    if (l !== s.memoizedState) {
      Lt.flags |= 2048;
      fl(9, {
        destroy: undefined
      }, X2.bind(null, k, l), null);
    }
    return [y, O, t];
  }
  function X2(t, s) {
    t.action = s;
  }
  function Ky(t) {
    var s = Wn();
    var l = gn;
    if (l !== null) {
      return Xy(s, l, t);
    }
    Wn();
    s = s.memoizedState;
    l = Wn();
    var y = l.queue.dispatch;
    l.memoizedState = t;
    return [s, y, false];
  }
  function fl(t, s, l, y) {
    t = {
      tag: t,
      create: l,
      deps: y,
      inst: s,
      next: null
    };
    s = Lt.updateQueue;
    if (s === null) {
      s = sd();
      Lt.updateQueue = s;
    }
    l = s.lastEffect;
    if (l === null) {
      s.lastEffect = t.next = t;
    } else {
      y = l.next;
      l.next = t;
      t.next = y;
      s.lastEffect = t;
    }
    return t;
  }
  function Zy() {
    return Wn().memoizedState;
  }
  function ad(t, s, l, y) {
    var k = Or();
    Lt.flags |= t;
    k.memoizedState = fl(s | 1, {
      destroy: undefined
    }, l, y === undefined ? null : y);
  }
  function ld(t, s, l, y) {
    var k = Wn();
    y = y === undefined ? null : y;
    var O = k.memoizedState.inst;
    if (gn !== null && y !== null && Mp(y, gn.memoizedState.deps)) {
      k.memoizedState = fl(s, O, l, y);
    } else {
      Lt.flags |= t;
      k.memoizedState = fl(s | 1, O, l, y);
    }
  }
  function Qy(t, s) {
    ad(8390656, 8, t, s);
  }
  function Hp(t, s) {
    ld(2048, 8, t, s);
  }
  function K2(t) {
    Lt.flags |= 4;
    var s = Lt.updateQueue;
    if (s === null) {
      s = sd();
      Lt.updateQueue = s;
      s.events = [t];
    } else {
      var l = s.events;
      if (l === null) {
        s.events = [t];
      } else {
        l.push(t);
      }
    }
  }
  function Jy(t) {
    var s = Wn().memoizedState;
    K2({
      ref: s,
      nextImpl: t
    });
    return function () {
      if ((cn & 2) !== 0) {
        throw Error(i(440));
      }
      return s.impl.apply(undefined, arguments);
    };
  }
  function e_(t, s) {
    return ld(4, 2, t, s);
  }
  function t_(t, s) {
    return ld(4, 4, t, s);
  }
  function n_(t, s) {
    if (typeof s == "function") {
      t = t();
      var l = s(t);
      return function () {
        if (typeof l == "function") {
          l();
        } else {
          s(null);
        }
      };
    }
    if (s != null) {
      t = t();
      s.current = t;
      return function () {
        s.current = null;
      };
    }
  }
  function r_(t, s, l) {
    l = l != null ? l.concat([t]) : null;
    ld(4, 4, n_.bind(null, s, t), l);
  }
  function Fp() {}
  function s_(t, s) {
    var l = Wn();
    s = s === undefined ? null : s;
    var y = l.memoizedState;
    if (s !== null && Mp(s, y[1])) {
      return y[0];
    } else {
      l.memoizedState = [t, s];
      return t;
    }
  }
  function i_(t, s) {
    var l = Wn();
    s = s === undefined ? null : s;
    var y = l.memoizedState;
    if (s !== null && Mp(s, y[1])) {
      return y[0];
    }
    y = t();
    if (da) {
      lt(true);
      try {
        t();
      } finally {
        lt(false);
      }
    }
    l.memoizedState = [y, s];
    return y;
  }
  function Up(t, s, l) {
    if (l === undefined || (bi & 1073741824) !== 0 && (qt & 261930) === 0) {
      return t.memoizedState = s;
    } else {
      t.memoizedState = l;
      t = o0();
      Lt.lanes |= t;
      lo |= t;
      return l;
    }
  }
  function o_(t, s, l, y) {
    if (Jr(l, s)) {
      return l;
    } else if (cl.current !== null) {
      t = Up(t, l, y);
      if (!Jr(t, s)) {
        Zn = true;
      }
      return t;
    } else if ((bi & 42) === 0 || (bi & 1073741824) !== 0 && (qt & 261930) === 0) {
      Zn = true;
      return t.memoizedState = l;
    } else {
      t = o0();
      Lt.lanes |= t;
      lo |= t;
      return s;
    }
  }
  function a_(t, s, l, y, k) {
    var O = q.p;
    q.p = O !== 0 && O < 8 ? O : 8;
    var K = G.T;
    var le = {};
    G.T = le;
    $p(t, false, s, l);
    try {
      var we = k();
      var Ae = G.S;
      if (Ae !== null) {
        Ae(le, we);
      }
      if (we !== null && typeof we == "object" && typeof we.then == "function") {
        var Le = $2(we, y);
        wc(t, s, Le, is(t));
      } else {
        wc(t, s, y, is(t));
      }
    } catch (He) {
      wc(t, s, {
        then: function () {},
        status: "rejected",
        reason: He
      }, is());
    } finally {
      q.p = O;
      if (K !== null && le.types !== null) {
        K.types = le.types;
      }
      G.T = K;
    }
  }
  function Z2() {}
  function Vp(t, s, l, y) {
    if (t.tag !== 5) {
      throw Error(i(476));
    }
    var k = l_(t).queue;
    a_(t, k, s, U, l === null ? Z2 : function () {
      c_(t);
      return l(y);
    });
  }
  function l_(t) {
    var s = t.memoizedState;
    if (s !== null) {
      return s;
    }
    s = {
      memoizedState: U,
      baseState: U,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: yi,
        lastRenderedState: U
      },
      next: null
    };
    var l = {};
    s.next = {
      memoizedState: l,
      baseState: l,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: yi,
        lastRenderedState: l
      },
      next: null
    };
    t.memoizedState = s;
    t = t.alternate;
    if (t !== null) {
      t.memoizedState = s;
    }
    return s;
  }
  function c_(t) {
    var s = l_(t);
    if (s.next === null) {
      s = t.alternate.memoizedState;
    }
    wc(t, s.next.queue, {}, is());
  }
  function Wp() {
    return mr(Nc);
  }
  function u_() {
    return Wn().memoizedState;
  }
  function d_() {
    return Wn().memoizedState;
  }
  function Q2(t) {
    for (var s = t.return; s !== null;) {
      switch (s.tag) {
        case 24:
        case 3:
          var l = is();
          t = no(l);
          var y = ro(s, t, l);
          if (y !== null) {
            Fr(y, s, l);
            gc(y, s, l);
          }
          s = {
            cache: yp()
          };
          t.payload = s;
          return;
      }
      s = s.return;
    }
  }
  function J2(t, s, l) {
    var y = is();
    l = {
      lane: y,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (cd(t)) {
      h_(s, l);
    } else {
      l = lp(t, s, l, y);
      if (l !== null) {
        Fr(l, t, y);
        p_(l, s, y);
      }
    }
  }
  function f_(t, s, l) {
    var y = is();
    wc(t, s, l, y);
  }
  function wc(t, s, l, y) {
    var k = {
      lane: y,
      revertLane: 0,
      gesture: null,
      action: l,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (cd(t)) {
      h_(s, k);
    } else {
      var O = t.alternate;
      if (t.lanes === 0 && (O === null || O.lanes === 0) && (O = s.lastRenderedReducer, O !== null)) {
        try {
          var K = s.lastRenderedState;
          var le = O(K, l);
          k.hasEagerState = true;
          k.eagerState = le;
          if (Jr(le, K)) {
            Vu(t, s, k, 0);
            if (wn === null) {
              Uu();
            }
            return false;
          }
        } catch {} finally {}
      }
      l = lp(t, s, k, y);
      if (l !== null) {
        Fr(l, t, y);
        p_(l, s, y);
        return true;
      }
    }
    return false;
  }
  function $p(t, s, l, y) {
    y = {
      lane: 2,
      revertLane: xm(),
      gesture: null,
      action: y,
      hasEagerState: false,
      eagerState: null,
      next: null
    };
    if (cd(t)) {
      if (s) {
        throw Error(i(479));
      }
    } else {
      s = lp(t, l, y, 2);
      if (s !== null) {
        Fr(s, t, 2);
      }
    }
  }
  function cd(t) {
    var s = t.alternate;
    return t === Lt || s !== null && s === Lt;
  }
  function h_(t, s) {
    ul = nd = true;
    var l = t.pending;
    if (l === null) {
      s.next = s;
    } else {
      s.next = l.next;
      l.next = s;
    }
    t.pending = s;
  }
  function p_(t, s, l) {
    if ((l & 4194048) !== 0) {
      var y = s.lanes;
      y &= t.pendingLanes;
      l |= y;
      s.lanes = l;
      Ln(t, l);
    }
  }
  var Sc = {
    readContext: mr,
    use: id,
    useCallback: zn,
    useContext: zn,
    useEffect: zn,
    useImperativeHandle: zn,
    useLayoutEffect: zn,
    useInsertionEffect: zn,
    useMemo: zn,
    useReducer: zn,
    useRef: zn,
    useState: zn,
    useDebugValue: zn,
    useDeferredValue: zn,
    useTransition: zn,
    useSyncExternalStore: zn,
    useId: zn,
    useHostTransitionStatus: zn,
    useFormState: zn,
    useActionState: zn,
    useOptimistic: zn,
    useMemoCache: zn,
    useCacheRefresh: zn
  };
  Sc.useEffectEvent = zn;
  var m_ = {
    readContext: mr,
    use: id,
    useCallback: function (t, s) {
      Or().memoizedState = [t, s === undefined ? null : s];
      return t;
    },
    useContext: mr,
    useEffect: Qy,
    useImperativeHandle: function (t, s, l) {
      l = l != null ? l.concat([t]) : null;
      ad(4194308, 4, n_.bind(null, s, t), l);
    },
    useLayoutEffect: function (t, s) {
      return ad(4194308, 4, t, s);
    },
    useInsertionEffect: function (t, s) {
      ad(4, 2, t, s);
    },
    useMemo: function (t, s) {
      var l = Or();
      s = s === undefined ? null : s;
      var y = t();
      if (da) {
        lt(true);
        try {
          t();
        } finally {
          lt(false);
        }
      }
      l.memoizedState = [y, s];
      return y;
    },
    useReducer: function (t, s, l) {
      var y = Or();
      if (l !== undefined) {
        var k = l(s);
        if (da) {
          lt(true);
          try {
            l(s);
          } finally {
            lt(false);
          }
        }
      } else {
        k = s;
      }
      y.memoizedState = y.baseState = k;
      t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: k
      };
      y.queue = t;
      t = t.dispatch = J2.bind(null, Lt, t);
      return [y.memoizedState, t];
    },
    useRef: function (t) {
      var s = Or();
      t = {
        current: t
      };
      return s.memoizedState = t;
    },
    useState: function (t) {
      t = Np(t);
      var s = t.queue;
      var l = f_.bind(null, Lt, s);
      s.dispatch = l;
      return [t.memoizedState, l];
    },
    useDebugValue: Fp,
    useDeferredValue: function (t, s) {
      var l = Or();
      return Up(l, t, s);
    },
    useTransition: function () {
      var t = Np(false);
      t = a_.bind(null, Lt, t.queue, true, false);
      Or().memoizedState = t;
      return [false, t];
    },
    useSyncExternalStore: function (t, s, l) {
      var y = Lt;
      var k = Or();
      if (Qt) {
        if (l === undefined) {
          throw Error(i(407));
        }
        l = l();
      } else {
        l = s();
        if (wn === null) {
          throw Error(i(349));
        }
        if ((qt & 127) === 0) {
          By(y, s, l);
        }
      }
      k.memoizedState = l;
      var O = {
        value: l,
        getSnapshot: s
      };
      k.queue = O;
      Qy(Ny.bind(null, y, O, t), [t]);
      y.flags |= 2048;
      fl(9, {
        destroy: undefined
      }, zy.bind(null, y, O, l, s), null);
      return l;
    },
    useId: function () {
      var t = Or();
      var s = wn.identifierPrefix;
      if (Qt) {
        var l = Ys;
        var y = Gs;
        l = (y & ~(1 << 32 - dt(y) - 1)).toString(32) + l;
        s = "_" + s + "R_" + l;
        l = rd++;
        if (l > 0) {
          s += "H" + l.toString(32);
        }
        s += "_";
      } else {
        l = q2++;
        s = "_" + s + "r_" + l.toString(32) + "_";
      }
      return t.memoizedState = s;
    },
    useHostTransitionStatus: Wp,
    useFormState: Gy,
    useActionState: Gy,
    useOptimistic: function (t) {
      var s = Or();
      s.memoizedState = s.baseState = t;
      var l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      s.queue = l;
      s = $p.bind(null, Lt, true, l);
      l.dispatch = s;
      return [t, s];
    },
    useMemoCache: Pp,
    useCacheRefresh: function () {
      return Or().memoizedState = Q2.bind(null, Lt);
    },
    useEffectEvent: function (t) {
      var s = Or();
      var l = {
        impl: t
      };
      s.memoizedState = l;
      return function () {
        if ((cn & 2) !== 0) {
          throw Error(i(440));
        }
        return l.impl.apply(undefined, arguments);
      };
    }
  };
  var qp = {
    readContext: mr,
    use: id,
    useCallback: s_,
    useContext: mr,
    useEffect: Hp,
    useImperativeHandle: r_,
    useInsertionEffect: e_,
    useLayoutEffect: t_,
    useMemo: i_,
    useReducer: od,
    useRef: Zy,
    useState: function () {
      return od(yi);
    },
    useDebugValue: Fp,
    useDeferredValue: function (t, s) {
      var l = Wn();
      return o_(l, gn.memoizedState, t, s);
    },
    useTransition: function () {
      var t = od(yi)[0];
      var s = Wn().memoizedState;
      return [typeof t == "boolean" ? t : _c(t), s];
    },
    useSyncExternalStore: Py,
    useId: u_,
    useHostTransitionStatus: Wp,
    useFormState: Yy,
    useActionState: Yy,
    useOptimistic: function (t, s) {
      var l = Wn();
      return Fy(l, gn, t, s);
    },
    useMemoCache: Pp,
    useCacheRefresh: d_
  };
  qp.useEffectEvent = Jy;
  var g_ = {
    readContext: mr,
    use: id,
    useCallback: s_,
    useContext: mr,
    useEffect: Hp,
    useImperativeHandle: r_,
    useInsertionEffect: e_,
    useLayoutEffect: t_,
    useMemo: i_,
    useReducer: zp,
    useRef: Zy,
    useState: function () {
      return zp(yi);
    },
    useDebugValue: Fp,
    useDeferredValue: function (t, s) {
      var l = Wn();
      if (gn === null) {
        return Up(l, t, s);
      } else {
        return o_(l, gn.memoizedState, t, s);
      }
    },
    useTransition: function () {
      var t = zp(yi)[0];
      var s = Wn().memoizedState;
      return [typeof t == "boolean" ? t : _c(t), s];
    },
    useSyncExternalStore: Py,
    useId: u_,
    useHostTransitionStatus: Wp,
    useFormState: Ky,
    useActionState: Ky,
    useOptimistic: function (t, s) {
      var l = Wn();
      if (gn !== null) {
        return Fy(l, gn, t, s);
      } else {
        l.baseState = t;
        return [t, l.queue.dispatch];
      }
    },
    useMemoCache: Pp,
    useCacheRefresh: d_
  };
  g_.useEffectEvent = Jy;
  function Gp(t, s, l, y) {
    s = t.memoizedState;
    l = l(y, s);
    l = l == null ? s : f({}, s, l);
    t.memoizedState = l;
    if (t.lanes === 0) {
      t.updateQueue.baseState = l;
    }
  }
  var Yp = {
    enqueueSetState: function (t, s, l) {
      t = t._reactInternals;
      var y = is();
      var k = no(y);
      k.payload = s;
      if (l != null) {
        k.callback = l;
      }
      s = ro(t, k, y);
      if (s !== null) {
        Fr(s, t, y);
        gc(s, t, y);
      }
    },
    enqueueReplaceState: function (t, s, l) {
      t = t._reactInternals;
      var y = is();
      var k = no(y);
      k.tag = 1;
      k.payload = s;
      if (l != null) {
        k.callback = l;
      }
      s = ro(t, k, y);
      if (s !== null) {
        Fr(s, t, y);
        gc(s, t, y);
      }
    },
    enqueueForceUpdate: function (t, s) {
      t = t._reactInternals;
      var l = is();
      var y = no(l);
      y.tag = 2;
      if (s != null) {
        y.callback = s;
      }
      s = ro(t, y, l);
      if (s !== null) {
        Fr(s, t, l);
        gc(s, t, l);
      }
    }
  };
  function v_(t, s, l, y, k, O, K) {
    t = t.stateNode;
    if (typeof t.shouldComponentUpdate == "function") {
      return t.shouldComponentUpdate(y, O, K);
    } else if (s.prototype && s.prototype.isPureReactComponent) {
      return !lc(l, y) || !lc(k, O);
    } else {
      return true;
    }
  }
  function b_(t, s, l, y) {
    t = s.state;
    if (typeof s.componentWillReceiveProps == "function") {
      s.componentWillReceiveProps(l, y);
    }
    if (typeof s.UNSAFE_componentWillReceiveProps == "function") {
      s.UNSAFE_componentWillReceiveProps(l, y);
    }
    if (s.state !== t) {
      Yp.enqueueReplaceState(s, s.state, null);
    }
  }
  function fa(t, s) {
    var l = s;
    if ("ref" in s) {
      l = {};
      for (var y in s) {
        if (y !== "ref") {
          l[y] = s[y];
        }
      }
    }
    if (t = t.defaultProps) {
      if (l === s) {
        l = f({}, l);
      }
      for (var k in t) {
        if (l[k] === undefined) {
          l[k] = t[k];
        }
      }
    }
    return l;
  }
  function y_(t) {
    Fu(t);
  }
  function __(t) {
    console.error(t);
  }
  function w_(t) {
    Fu(t);
  }
  function ud(t, s) {
    try {
      var l = t.onUncaughtError;
      l(s.value, {
        componentStack: s.stack
      });
    } catch (y) {
      setTimeout(function () {
        throw y;
      });
    }
  }
  function S_(t, s, l) {
    try {
      var y = t.onCaughtError;
      y(l.value, {
        componentStack: l.stack,
        errorBoundary: s.tag === 1 ? s.stateNode : null
      });
    } catch (k) {
      setTimeout(function () {
        throw k;
      });
    }
  }
  function Xp(t, s, l) {
    l = no(l);
    l.tag = 3;
    l.payload = {
      element: null
    };
    l.callback = function () {
      ud(t, s);
    };
    return l;
  }
  function x_(t) {
    t = no(t);
    t.tag = 3;
    return t;
  }
  function C_(t, s, l, y) {
    var k = l.type.getDerivedStateFromError;
    if (typeof k == "function") {
      var O = y.value;
      t.payload = function () {
        return k(O);
      };
      t.callback = function () {
        S_(s, l, y);
      };
    }
    var K = l.stateNode;
    if (K !== null && typeof K.componentDidCatch == "function") {
      t.callback = function () {
        S_(s, l, y);
        if (typeof k != "function") {
          if (co === null) {
            co = new Set([this]);
          } else {
            co.add(this);
          }
        }
        var le = y.stack;
        this.componentDidCatch(y.value, {
          componentStack: le !== null ? le : ""
        });
      };
    }
  }
  function eT(t, s, l, y, k) {
    l.flags |= 32768;
    if (y !== null && typeof y == "object" && typeof y.then == "function") {
      s = l.alternate;
      if (s !== null) {
        sl(s, l, k, true);
      }
      l = ts.current;
      if (l !== null) {
        switch (l.tag) {
          case 31:
          case 13:
            if (vs === null) {
              Sd();
            } else if (l.alternate === null && Nn === 0) {
              Nn = 3;
            }
            l.flags &= -257;
            l.flags |= 65536;
            l.lanes = k;
            if (y === Zu) {
              l.flags |= 16384;
            } else {
              s = l.updateQueue;
              if (s === null) {
                l.updateQueue = new Set([y]);
              } else {
                s.add(y);
              }
              _m(t, y, k);
            }
            return false;
          case 22:
            l.flags |= 65536;
            if (y === Zu) {
              l.flags |= 16384;
            } else {
              s = l.updateQueue;
              if (s === null) {
                s = {
                  transitions: null,
                  markerInstances: null,
                  retryQueue: new Set([y])
                };
                l.updateQueue = s;
              } else {
                l = s.retryQueue;
                if (l === null) {
                  s.retryQueue = new Set([y]);
                } else {
                  l.add(y);
                }
              }
              _m(t, y, k);
            }
            return false;
        }
        throw Error(i(435, l.tag));
      }
      _m(t, y, k);
      Sd();
      return false;
    }
    if (Qt) {
      s = ts.current;
      if (s !== null) {
        if ((s.flags & 65536) === 0) {
          s.flags |= 256;
        }
        s.flags |= 65536;
        s.lanes = k;
        if (y !== pp) {
          t = Error(i(422), {
            cause: y
          });
          dc(hs(t, l));
        }
      } else {
        if (y !== pp) {
          s = Error(i(423), {
            cause: y
          });
          dc(hs(s, l));
        }
        t = t.current.alternate;
        t.flags |= 65536;
        k &= -k;
        t.lanes |= k;
        y = hs(y, l);
        k = Xp(t.stateNode, y, k);
        Ep(t, k);
        if (Nn !== 4) {
          Nn = 2;
        }
      }
      return false;
    }
    var O = Error(i(520), {
      cause: y
    });
    O = hs(O, l);
    if (Mc === null) {
      Mc = [O];
    } else {
      Mc.push(O);
    }
    if (Nn !== 4) {
      Nn = 2;
    }
    if (s === null) {
      return true;
    }
    y = hs(y, l);
    l = s;
    do {
      switch (l.tag) {
        case 3:
          l.flags |= 65536;
          t = k & -k;
          l.lanes |= t;
          t = Xp(l.stateNode, y, t);
          Ep(l, t);
          return false;
        case 1:
          s = l.type;
          O = l.stateNode;
          if ((l.flags & 128) === 0 && (typeof s.getDerivedStateFromError == "function" || O !== null && typeof O.componentDidCatch == "function" && (co === null || !co.has(O)))) {
            l.flags |= 65536;
            k &= -k;
            l.lanes |= k;
            k = x_(k);
            C_(k, t, l, y);
            Ep(l, k);
            return false;
          }
      }
      l = l.return;
    } while (l !== null);
    return false;
  }
  var Kp = Error(i(461));
  var Zn = false;
  function gr(t, s, l, y) {
    s.child = t === null ? ky(s, null, l, y) : ua(s, t.child, l, y);
  }
  function E_(t, s, l, y, k) {
    l = l.render;
    var O = s.ref;
    if ("ref" in y) {
      var K = {};
      for (var le in y) {
        if (le !== "ref") {
          K[le] = y[le];
        }
      }
    } else {
      K = y;
    }
    oa(s);
    y = Op(t, s, l, K, O, k);
    le = Dp();
    if (t !== null && !Zn) {
      Ip(t, s, k);
      return _i(t, s, k);
    } else {
      if (Qt && le) {
        fp(s);
      }
      s.flags |= 1;
      gr(t, s, y, k);
      return s.child;
    }
  }
  function R_(t, s, l, y, k) {
    if (t === null) {
      var O = l.type;
      if (typeof O == "function" && !cp(O) && O.defaultProps === undefined && l.compare === null) {
        s.tag = 15;
        s.type = O;
        return T_(t, s, O, y, k);
      } else {
        t = $u(l.type, null, y, s, s.mode, k);
        t.ref = s.ref;
        t.return = s;
        return s.child = t;
      }
    }
    O = t.child;
    if (!sm(t, k)) {
      var K = O.memoizedProps;
      l = l.compare;
      l = l !== null ? l : lc;
      if (l(K, y) && t.ref === s.ref) {
        return _i(t, s, k);
      }
    }
    s.flags |= 1;
    t = pi(O, y);
    t.ref = s.ref;
    t.return = s;
    return s.child = t;
  }
  function T_(t, s, l, y, k) {
    if (t !== null) {
      var O = t.memoizedProps;
      if (lc(O, y) && t.ref === s.ref) {
        Zn = false;
        s.pendingProps = y = O;
        if (sm(t, k)) {
          if ((t.flags & 131072) !== 0) {
            Zn = true;
          }
        } else {
          s.lanes = t.lanes;
          return _i(t, s, k);
        }
      }
    }
    return Zp(t, s, l, y, k);
  }
  function k_(t, s, l, y) {
    var k = y.children;
    var O = t !== null ? t.memoizedState : null;
    if (t === null && s.stateNode === null) {
      s.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      };
    }
    if (y.mode === "hidden") {
      if ((s.flags & 128) !== 0) {
        O = O !== null ? O.baseLanes | l : l;
        if (t !== null) {
          y = s.child = t.child;
          k = 0;
          while (y !== null) {
            k = k | y.lanes | y.childLanes;
            y = y.sibling;
          }
          y = k & ~O;
        } else {
          y = 0;
          s.child = null;
        }
        return A_(t, s, O, l, y);
      }
      if ((l & 536870912) !== 0) {
        s.memoizedState = {
          baseLanes: 0,
          cachePool: null
        };
        if (t !== null) {
          Xu(s, O !== null ? O.cachePool : null);
        }
        if (O !== null) {
          Oy(s, O);
        } else {
          Tp();
        }
        Dy(s);
      } else {
        y = s.lanes = 536870912;
        return A_(t, s, O !== null ? O.baseLanes | l : l, l, y);
      }
    } else if (O !== null) {
      Xu(s, O.cachePool);
      Oy(s, O);
      io();
      s.memoizedState = null;
    } else {
      if (t !== null) {
        Xu(s, null);
      }
      Tp();
      io();
    }
    gr(t, s, k, l);
    return s.child;
  }
  function xc(t, s) {
    if ((t === null || t.tag !== 22) && s.stateNode === null) {
      s.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      };
    }
    return s.sibling;
  }
  function A_(t, s, l, y, k) {
    var O = wp();
    O = O === null ? null : {
      parent: Xn._currentValue,
      pool: O
    };
    s.memoizedState = {
      baseLanes: l,
      cachePool: O
    };
    if (t !== null) {
      Xu(s, null);
    }
    Tp();
    Dy(s);
    if (t !== null) {
      sl(t, s, y, true);
    }
    s.childLanes = k;
    return null;
  }
  function dd(t, s) {
    s = hd({
      mode: s.mode,
      children: s.children
    }, t.mode);
    s.ref = t.ref;
    t.child = s;
    s.return = t;
    return s;
  }
  function M_(t, s, l) {
    ua(s, t.child, null, l);
    t = dd(s, s.pendingProps);
    t.flags |= 2;
    ns(s);
    s.memoizedState = null;
    return t;
  }
  function tT(t, s, l) {
    var y = s.pendingProps;
    var k = (s.flags & 128) !== 0;
    s.flags &= -129;
    if (t === null) {
      if (Qt) {
        if (y.mode === "hidden") {
          t = dd(s, y);
          s.lanes = 536870912;
          return xc(null, t);
        }
        Ap(s);
        if (t = En) {
          t = U0(t, gs);
          t = t !== null && t.data === "&" ? t : null;
          if (t !== null) {
            s.memoizedState = {
              dehydrated: t,
              treeContext: Zi !== null ? {
                id: Gs,
                overflow: Ys
              } : null,
              retryLane: 536870912,
              hydrationErrors: null
            };
            l = hy(t);
            l.return = s;
            s.child = l;
            pr = s;
            En = null;
          }
        } else {
          t = null;
        }
        if (t === null) {
          throw Ji(s);
        }
        s.lanes = 536870912;
        return null;
      }
      return dd(s, y);
    }
    var O = t.memoizedState;
    if (O !== null) {
      var K = O.dehydrated;
      Ap(s);
      if (k) {
        if (s.flags & 256) {
          s.flags &= -257;
          s = M_(t, s, l);
        } else if (s.memoizedState !== null) {
          s.child = t.child;
          s.flags |= 128;
          s = null;
        } else {
          throw Error(i(558));
        }
      } else {
        if (!Zn) {
          sl(t, s, l, false);
        }
        k = (l & t.childLanes) !== 0;
        if (Zn || k) {
          y = wn;
          if (y !== null && (K = tn(y, l), K !== 0 && K !== O.retryLane)) {
            O.retryLane = K;
            na(t, K);
            Fr(y, t, K);
            throw Kp;
          }
          Sd();
          s = M_(t, s, l);
        } else {
          t = O.treeContext;
          En = bs(K.nextSibling);
          pr = s;
          Qt = true;
          Qi = null;
          gs = false;
          if (t !== null) {
            gy(s, t);
          }
          s = dd(s, y);
          s.flags |= 4096;
        }
      }
      return s;
    }
    t = pi(t.child, {
      mode: y.mode,
      children: y.children
    });
    t.ref = s.ref;
    s.child = t;
    t.return = s;
    return t;
  }
  function fd(t, s) {
    var l = s.ref;
    if (l === null) {
      if (t !== null && t.ref !== null) {
        s.flags |= 4194816;
      }
    } else {
      if (typeof l != "function" && typeof l != "object") {
        throw Error(i(284));
      }
      if (t === null || t.ref !== l) {
        s.flags |= 4194816;
      }
    }
  }
  function Zp(t, s, l, y, k) {
    oa(s);
    l = Op(t, s, l, y, undefined, k);
    y = Dp();
    if (t !== null && !Zn) {
      Ip(t, s, k);
      return _i(t, s, k);
    } else {
      if (Qt && y) {
        fp(s);
      }
      s.flags |= 1;
      gr(t, s, l, k);
      return s.child;
    }
  }
  function O_(t, s, l, y, k, O) {
    oa(s);
    s.updateQueue = null;
    l = Ly(s, y, l, k);
    Iy(t);
    y = Dp();
    if (t !== null && !Zn) {
      Ip(t, s, O);
      return _i(t, s, O);
    } else {
      if (Qt && y) {
        fp(s);
      }
      s.flags |= 1;
      gr(t, s, l, O);
      return s.child;
    }
  }
  function D_(t, s, l, y, k) {
    oa(s);
    if (s.stateNode === null) {
      var O = el;
      var K = l.contextType;
      if (typeof K == "object" && K !== null) {
        O = mr(K);
      }
      O = new l(y, O);
      s.memoizedState = O.state ?? null;
      O.updater = Yp;
      s.stateNode = O;
      O._reactInternals = s;
      O = s.stateNode;
      O.props = y;
      O.state = s.memoizedState;
      O.refs = {};
      xp(s);
      K = l.contextType;
      O.context = typeof K == "object" && K !== null ? mr(K) : el;
      O.state = s.memoizedState;
      K = l.getDerivedStateFromProps;
      if (typeof K == "function") {
        Gp(s, l, K, y);
        O.state = s.memoizedState;
      }
      if (typeof l.getDerivedStateFromProps != "function" && typeof O.getSnapshotBeforeUpdate != "function" && (typeof O.UNSAFE_componentWillMount == "function" || typeof O.componentWillMount == "function")) {
        K = O.state;
        if (typeof O.componentWillMount == "function") {
          O.componentWillMount();
        }
        if (typeof O.UNSAFE_componentWillMount == "function") {
          O.UNSAFE_componentWillMount();
        }
        if (K !== O.state) {
          Yp.enqueueReplaceState(O, O.state, null);
        }
        bc(s, y, O, k);
        vc();
        O.state = s.memoizedState;
      }
      if (typeof O.componentDidMount == "function") {
        s.flags |= 4194308;
      }
      y = true;
    } else if (t === null) {
      O = s.stateNode;
      var le = s.memoizedProps;
      var we = fa(l, le);
      O.props = we;
      var Ae = O.context;
      var Le = l.contextType;
      K = el;
      if (typeof Le == "object" && Le !== null) {
        K = mr(Le);
      }
      var He = l.getDerivedStateFromProps;
      Le = typeof He == "function" || typeof O.getSnapshotBeforeUpdate == "function";
      le = s.pendingProps !== le;
      if (!Le && (typeof O.UNSAFE_componentWillReceiveProps == "function" || typeof O.componentWillReceiveProps == "function")) {
        if (le || Ae !== K) {
          b_(s, O, y, K);
        }
      }
      to = false;
      var Oe = s.memoizedState;
      O.state = Oe;
      bc(s, y, O, k);
      vc();
      Ae = s.memoizedState;
      if (le || Oe !== Ae || to) {
        if (typeof He == "function") {
          Gp(s, l, He, y);
          Ae = s.memoizedState;
        }
        if (we = to || v_(s, l, we, y, Oe, Ae, K)) {
          if (!Le && (typeof O.UNSAFE_componentWillMount == "function" || typeof O.componentWillMount == "function")) {
            if (typeof O.componentWillMount == "function") {
              O.componentWillMount();
            }
            if (typeof O.UNSAFE_componentWillMount == "function") {
              O.UNSAFE_componentWillMount();
            }
          }
          if (typeof O.componentDidMount == "function") {
            s.flags |= 4194308;
          }
        } else {
          if (typeof O.componentDidMount == "function") {
            s.flags |= 4194308;
          }
          s.memoizedProps = y;
          s.memoizedState = Ae;
        }
        O.props = y;
        O.state = Ae;
        O.context = K;
        y = we;
      } else {
        if (typeof O.componentDidMount == "function") {
          s.flags |= 4194308;
        }
        y = false;
      }
    } else {
      O = s.stateNode;
      Cp(t, s);
      K = s.memoizedProps;
      Le = fa(l, K);
      O.props = Le;
      He = s.pendingProps;
      Oe = O.context;
      Ae = l.contextType;
      we = el;
      if (typeof Ae == "object" && Ae !== null) {
        we = mr(Ae);
      }
      le = l.getDerivedStateFromProps;
      if (!(Ae = typeof le == "function" || typeof O.getSnapshotBeforeUpdate == "function") && (typeof O.UNSAFE_componentWillReceiveProps == "function" || typeof O.componentWillReceiveProps == "function")) {
        if (K !== He || Oe !== we) {
          b_(s, O, y, we);
        }
      }
      to = false;
      Oe = s.memoizedState;
      O.state = Oe;
      bc(s, y, O, k);
      vc();
      var De = s.memoizedState;
      if (K !== He || Oe !== De || to || t !== null && t.dependencies !== null && Gu(t.dependencies)) {
        if (typeof le == "function") {
          Gp(s, l, le, y);
          De = s.memoizedState;
        }
        if (Le = to || v_(s, l, Le, y, Oe, De, we) || t !== null && t.dependencies !== null && Gu(t.dependencies)) {
          if (!Ae && (typeof O.UNSAFE_componentWillUpdate == "function" || typeof O.componentWillUpdate == "function")) {
            if (typeof O.componentWillUpdate == "function") {
              O.componentWillUpdate(y, De, we);
            }
            if (typeof O.UNSAFE_componentWillUpdate == "function") {
              O.UNSAFE_componentWillUpdate(y, De, we);
            }
          }
          if (typeof O.componentDidUpdate == "function") {
            s.flags |= 4;
          }
          if (typeof O.getSnapshotBeforeUpdate == "function") {
            s.flags |= 1024;
          }
        } else {
          if (typeof O.componentDidUpdate == "function" && (K !== t.memoizedProps || Oe !== t.memoizedState)) {
            s.flags |= 4;
          }
          if (typeof O.getSnapshotBeforeUpdate == "function" && (K !== t.memoizedProps || Oe !== t.memoizedState)) {
            s.flags |= 1024;
          }
          s.memoizedProps = y;
          s.memoizedState = De;
        }
        O.props = y;
        O.state = De;
        O.context = we;
        y = Le;
      } else {
        if (typeof O.componentDidUpdate == "function" && (K !== t.memoizedProps || Oe !== t.memoizedState)) {
          s.flags |= 4;
        }
        if (typeof O.getSnapshotBeforeUpdate == "function" && (K !== t.memoizedProps || Oe !== t.memoizedState)) {
          s.flags |= 1024;
        }
        y = false;
      }
    }
    O = y;
    fd(t, s);
    y = (s.flags & 128) !== 0;
    if (O || y) {
      O = s.stateNode;
      l = y && typeof l.getDerivedStateFromError != "function" ? null : O.render();
      s.flags |= 1;
      if (t !== null && y) {
        s.child = ua(s, t.child, null, k);
        s.child = ua(s, null, l, k);
      } else {
        gr(t, s, l, k);
      }
      s.memoizedState = O.state;
      t = s.child;
    } else {
      t = _i(t, s, k);
    }
    return t;
  }
  function I_(t, s, l, y) {
    sa();
    s.flags |= 256;
    gr(t, s, l, y);
    return s.child;
  }
  var Qp = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Jp(t) {
    return {
      baseLanes: t,
      cachePool: Sy()
    };
  }
  function em(t, s, l) {
    t = t !== null ? t.childLanes & ~l : 0;
    if (s) {
      t |= ss;
    }
    return t;
  }
  function L_(t, s, l) {
    var y = s.pendingProps;
    var k = false;
    var O = (s.flags & 128) !== 0;
    var K;
    if (!(K = O)) {
      K = t !== null && t.memoizedState === null ? false : (Vn.current & 2) !== 0;
    }
    if (K) {
      k = true;
      s.flags &= -129;
    }
    K = (s.flags & 32) !== 0;
    s.flags &= -33;
    if (t === null) {
      if (Qt) {
        if (k) {
          so(s);
        } else {
          io();
        }
        if (t = En) {
          t = U0(t, gs);
          t = t !== null && t.data !== "&" ? t : null;
          if (t !== null) {
            s.memoizedState = {
              dehydrated: t,
              treeContext: Zi !== null ? {
                id: Gs,
                overflow: Ys
              } : null,
              retryLane: 536870912,
              hydrationErrors: null
            };
            l = hy(t);
            l.return = s;
            s.child = l;
            pr = s;
            En = null;
          }
        } else {
          t = null;
        }
        if (t === null) {
          throw Ji(s);
        }
        if (Bm(t)) {
          s.lanes = 32;
        } else {
          s.lanes = 536870912;
        }
        return null;
      }
      var le = y.children;
      y = y.fallback;
      if (k) {
        io();
        k = s.mode;
        le = hd({
          mode: "hidden",
          children: le
        }, k);
        y = ra(y, k, l, null);
        le.return = s;
        y.return = s;
        le.sibling = y;
        s.child = le;
        y = s.child;
        y.memoizedState = Jp(l);
        y.childLanes = em(t, K, l);
        s.memoizedState = Qp;
        return xc(null, y);
      } else {
        so(s);
        return tm(s, le);
      }
    }
    var we = t.memoizedState;
    if (we !== null && (le = we.dehydrated, le !== null)) {
      if (O) {
        if (s.flags & 256) {
          so(s);
          s.flags &= -257;
          s = nm(t, s, l);
        } else if (s.memoizedState !== null) {
          io();
          s.child = t.child;
          s.flags |= 128;
          s = null;
        } else {
          io();
          le = y.fallback;
          k = s.mode;
          y = hd({
            mode: "visible",
            children: y.children
          }, k);
          le = ra(le, k, l, null);
          le.flags |= 2;
          y.return = s;
          le.return = s;
          y.sibling = le;
          s.child = y;
          ua(s, t.child, null, l);
          y = s.child;
          y.memoizedState = Jp(l);
          y.childLanes = em(t, K, l);
          s.memoizedState = Qp;
          s = xc(null, y);
        }
      } else {
        so(s);
        if (Bm(le)) {
          K = le.nextSibling && le.nextSibling.dataset;
          if (K) {
            var Ae = K.dgst;
          }
          K = Ae;
          y = Error(i(419));
          y.stack = "";
          y.digest = K;
          dc({
            value: y,
            source: null,
            stack: null
          });
          s = nm(t, s, l);
        } else {
          if (!Zn) {
            sl(t, s, l, false);
          }
          K = (l & t.childLanes) !== 0;
          if (Zn || K) {
            K = wn;
            if (K !== null && (y = tn(K, l), y !== 0 && y !== we.retryLane)) {
              we.retryLane = y;
              na(t, y);
              Fr(K, t, y);
              throw Kp;
            }
            if (!Pm(le)) {
              Sd();
            }
            s = nm(t, s, l);
          } else if (Pm(le)) {
            s.flags |= 192;
            s.child = t.child;
            s = null;
          } else {
            t = we.treeContext;
            En = bs(le.nextSibling);
            pr = s;
            Qt = true;
            Qi = null;
            gs = false;
            if (t !== null) {
              gy(s, t);
            }
            s = tm(s, y.children);
            s.flags |= 4096;
          }
        }
      }
      return s;
    }
    if (k) {
      io();
      le = y.fallback;
      k = s.mode;
      we = t.child;
      Ae = we.sibling;
      y = pi(we, {
        mode: "hidden",
        children: y.children
      });
      y.subtreeFlags = we.subtreeFlags & 65011712;
      if (Ae !== null) {
        le = pi(Ae, le);
      } else {
        le = ra(le, k, l, null);
        le.flags |= 2;
      }
      le.return = s;
      y.return = s;
      y.sibling = le;
      s.child = y;
      xc(null, y);
      y = s.child;
      le = t.child.memoizedState;
      if (le === null) {
        le = Jp(l);
      } else {
        k = le.cachePool;
        if (k !== null) {
          we = Xn._currentValue;
          k = k.parent !== we ? {
            parent: we,
            pool: we
          } : k;
        } else {
          k = Sy();
        }
        le = {
          baseLanes: le.baseLanes | l,
          cachePool: k
        };
      }
      y.memoizedState = le;
      y.childLanes = em(t, K, l);
      s.memoizedState = Qp;
      return xc(t.child, y);
    } else {
      so(s);
      l = t.child;
      t = l.sibling;
      l = pi(l, {
        mode: "visible",
        children: y.children
      });
      l.return = s;
      l.sibling = null;
      if (t !== null) {
        K = s.deletions;
        if (K === null) {
          s.deletions = [t];
          s.flags |= 16;
        } else {
          K.push(t);
        }
      }
      s.child = l;
      s.memoizedState = null;
      return l;
    }
  }
  function tm(t, s) {
    s = hd({
      mode: "visible",
      children: s
    }, t.mode);
    s.return = t;
    return t.child = s;
  }
  function hd(t, s) {
    t = es(22, t, null, s);
    t.lanes = 0;
    return t;
  }
  function nm(t, s, l) {
    ua(s, t.child, null, l);
    t = tm(s, s.pendingProps.children);
    t.flags |= 2;
    s.memoizedState = null;
    return t;
  }
  function P_(t, s, l) {
    t.lanes |= s;
    var y = t.alternate;
    if (y !== null) {
      y.lanes |= s;
    }
    vp(t.return, s, l);
  }
  function rm(t, s, l, y, k, O) {
    var K = t.memoizedState;
    if (K === null) {
      t.memoizedState = {
        isBackwards: s,
        rendering: null,
        renderingStartTime: 0,
        last: y,
        tail: l,
        tailMode: k,
        treeForkCount: O
      };
    } else {
      K.isBackwards = s;
      K.rendering = null;
      K.renderingStartTime = 0;
      K.last = y;
      K.tail = l;
      K.tailMode = k;
      K.treeForkCount = O;
    }
  }
  function B_(t, s, l) {
    var y = s.pendingProps;
    var k = y.revealOrder;
    var O = y.tail;
    y = y.children;
    var K = Vn.current;
    var le = (K & 2) !== 0;
    if (le) {
      K = K & 1 | 2;
      s.flags |= 128;
    } else {
      K &= 1;
    }
    Z(Vn, K);
    gr(t, s, y, l);
    y = Qt ? uc : 0;
    if (!le && t !== null && (t.flags & 128) !== 0) {
      e: for (t = s.child; t !== null;) {
        if (t.tag === 13) {
          if (t.memoizedState !== null) {
            P_(t, l, s);
          }
        } else if (t.tag === 19) {
          P_(t, l, s);
        } else if (t.child !== null) {
          t.child.return = t;
          t = t.child;
          continue;
        }
        if (t === s) {
          break e;
        }
        while (t.sibling === null) {
          if (t.return === null || t.return === s) {
            break e;
          }
          t = t.return;
        }
        t.sibling.return = t.return;
        t = t.sibling;
      }
    }
    switch (k) {
      case "forwards":
        l = s.child;
        k = null;
        while (l !== null) {
          t = l.alternate;
          if (t !== null && td(t) === null) {
            k = l;
          }
          l = l.sibling;
        }
        l = k;
        if (l === null) {
          k = s.child;
          s.child = null;
        } else {
          k = l.sibling;
          l.sibling = null;
        }
        rm(s, false, k, l, O, y);
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        l = null;
        k = s.child;
        s.child = null;
        while (k !== null) {
          t = k.alternate;
          if (t !== null && td(t) === null) {
            s.child = k;
            break;
          }
          t = k.sibling;
          k.sibling = l;
          l = k;
          k = t;
        }
        rm(s, true, l, null, O, y);
        break;
      case "together":
        rm(s, false, null, null, undefined, y);
        break;
      default:
        s.memoizedState = null;
    }
    return s.child;
  }
  function _i(t, s, l) {
    if (t !== null) {
      s.dependencies = t.dependencies;
    }
    lo |= s.lanes;
    if ((l & s.childLanes) === 0) {
      if (t !== null) {
        sl(t, s, l, false);
        if ((l & s.childLanes) === 0) {
          return null;
        }
      } else {
        return null;
      }
    }
    if (t !== null && s.child !== t.child) {
      throw Error(i(153));
    }
    if (s.child !== null) {
      t = s.child;
      l = pi(t, t.pendingProps);
      s.child = l;
      l.return = s;
      while (t.sibling !== null) {
        t = t.sibling;
        l = l.sibling = pi(t, t.pendingProps);
        l.return = s;
      }
      l.sibling = null;
    }
    return s.child;
  }
  function sm(t, s) {
    if ((t.lanes & s) !== 0) {
      return true;
    } else {
      t = t.dependencies;
      return t !== null && !!Gu(t);
    }
  }
  function nT(t, s, l) {
    switch (s.tag) {
      case 3:
        Y(s, s.stateNode.containerInfo);
        eo(s, Xn, t.memoizedState.cache);
        sa();
        break;
      case 27:
      case 5:
        ce(s);
        break;
      case 4:
        Y(s, s.stateNode.containerInfo);
        break;
      case 10:
        eo(s, s.type, s.memoizedProps.value);
        break;
      case 31:
        if (s.memoizedState !== null) {
          s.flags |= 128;
          Ap(s);
          return null;
        }
        break;
      case 13:
        var y = s.memoizedState;
        if (y !== null) {
          if (y.dehydrated !== null) {
            so(s);
            s.flags |= 128;
            return null;
          } else if ((l & s.child.childLanes) !== 0) {
            return L_(t, s, l);
          } else {
            so(s);
            t = _i(t, s, l);
            if (t !== null) {
              return t.sibling;
            } else {
              return null;
            }
          }
        }
        so(s);
        break;
      case 19:
        var k = (t.flags & 128) !== 0;
        y = (l & s.childLanes) !== 0;
        if (!y) {
          sl(t, s, l, false);
          y = (l & s.childLanes) !== 0;
        }
        if (k) {
          if (y) {
            return B_(t, s, l);
          }
          s.flags |= 128;
        }
        k = s.memoizedState;
        if (k !== null) {
          k.rendering = null;
          k.tail = null;
          k.lastEffect = null;
        }
        Z(Vn, Vn.current);
        if (y) {
          break;
        }
        return null;
      case 22:
        s.lanes = 0;
        return k_(t, s, l, s.pendingProps);
      case 24:
        eo(s, Xn, t.memoizedState.cache);
    }
    return _i(t, s, l);
  }
  function z_(t, s, l) {
    if (t !== null) {
      if (t.memoizedProps !== s.pendingProps) {
        Zn = true;
      } else {
        if (!sm(t, l) && (s.flags & 128) === 0) {
          Zn = false;
          return nT(t, s, l);
        }
        Zn = (t.flags & 131072) !== 0;
      }
    } else {
      Zn = false;
      if (Qt && (s.flags & 1048576) !== 0) {
        my(s, uc, s.index);
      }
    }
    s.lanes = 0;
    switch (s.tag) {
      case 16:
        e: {
          var y = s.pendingProps;
          t = la(s.elementType);
          s.type = t;
          if (typeof t == "function") {
            if (cp(t)) {
              y = fa(t, y);
              s.tag = 1;
              s = D_(null, s, t, y, l);
            } else {
              s.tag = 0;
              s = Zp(null, s, t, y, l);
            }
          } else {
            if (t != null) {
              var k = t.$$typeof;
              if (k === C) {
                s.tag = 11;
                s = E_(null, s, t, y, l);
                break e;
              } else if (k === M) {
                s.tag = 14;
                s = R_(null, s, t, y, l);
                break e;
              }
            }
            s = D(t) || t;
            throw Error(i(306, s, ""));
          }
        }
        return s;
      case 0:
        return Zp(t, s, s.type, s.pendingProps, l);
      case 1:
        y = s.type;
        k = fa(y, s.pendingProps);
        return D_(t, s, y, k, l);
      case 3:
        e: {
          Y(s, s.stateNode.containerInfo);
          if (t === null) {
            throw Error(i(387));
          }
          y = s.pendingProps;
          var O = s.memoizedState;
          k = O.element;
          Cp(t, s);
          bc(s, y, null, l);
          var K = s.memoizedState;
          y = K.cache;
          eo(s, Xn, y);
          if (y !== O.cache) {
            bp(s, [Xn], l, true);
          }
          vc();
          y = K.element;
          if (O.isDehydrated) {
            O = {
              element: y,
              isDehydrated: false,
              cache: K.cache
            };
            s.updateQueue.baseState = O;
            s.memoizedState = O;
            if (s.flags & 256) {
              s = I_(t, s, y, l);
              break e;
            } else if (y !== k) {
              k = hs(Error(i(424)), s);
              dc(k);
              s = I_(t, s, y, l);
              break e;
            } else {
              t = s.stateNode.containerInfo;
              switch (t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              En = bs(t.firstChild);
              pr = s;
              Qt = true;
              Qi = null;
              gs = true;
              l = ky(s, null, y, l);
              s.child = l;
              while (l) {
                l.flags = l.flags & -3 | 4096;
                l = l.sibling;
              }
            }
          } else {
            sa();
            if (y === k) {
              s = _i(t, s, l);
              break e;
            }
            gr(t, s, y, l);
          }
          s = s.child;
        }
        return s;
      case 26:
        fd(t, s);
        if (t === null) {
          if (l = Y0(s.type, null, s.pendingProps, null)) {
            s.memoizedState = l;
          } else if (!Qt) {
            l = s.type;
            t = s.pendingProps;
            y = Ad(ue.current).createElement(l);
            y[Ft] = s;
            y[sn] = t;
            vr(y, l, t);
            _n(y);
            s.stateNode = y;
          }
        } else {
          s.memoizedState = Y0(s.type, t.memoizedProps, s.pendingProps, t.memoizedState);
        }
        return null;
      case 27:
        ce(s);
        if (t === null && Qt) {
          y = s.stateNode = $0(s.type, s.pendingProps, ue.current);
          pr = s;
          gs = true;
          k = En;
          if (po(s.type)) {
            zm = k;
            En = bs(y.firstChild);
          } else {
            En = k;
          }
        }
        gr(t, s, s.pendingProps.children, l);
        fd(t, s);
        if (t === null) {
          s.flags |= 4194304;
        }
        return s.child;
      case 5:
        if (t === null && Qt) {
          if (k = y = En) {
            y = DT(y, s.type, s.pendingProps, gs);
            if (y !== null) {
              s.stateNode = y;
              pr = s;
              En = bs(y.firstChild);
              gs = false;
              k = true;
            } else {
              k = false;
            }
          }
          if (!k) {
            Ji(s);
          }
        }
        ce(s);
        k = s.type;
        O = s.pendingProps;
        K = t !== null ? t.memoizedProps : null;
        y = O.children;
        if (Dm(k, O)) {
          y = null;
        } else if (K !== null && Dm(k, K)) {
          s.flags |= 32;
        }
        if (s.memoizedState !== null) {
          k = Op(t, s, G2, null, null, l);
          Nc._currentValue = k;
        }
        fd(t, s);
        gr(t, s, y, l);
        return s.child;
      case 6:
        if (t === null && Qt) {
          if (t = l = En) {
            l = IT(l, s.pendingProps, gs);
            if (l !== null) {
              s.stateNode = l;
              pr = s;
              En = null;
              t = true;
            } else {
              t = false;
            }
          }
          if (!t) {
            Ji(s);
          }
        }
        return null;
      case 13:
        return L_(t, s, l);
      case 4:
        Y(s, s.stateNode.containerInfo);
        y = s.pendingProps;
        if (t === null) {
          s.child = ua(s, null, y, l);
        } else {
          gr(t, s, y, l);
        }
        return s.child;
      case 11:
        return E_(t, s, s.type, s.pendingProps, l);
      case 7:
        gr(t, s, s.pendingProps, l);
        return s.child;
      case 8:
        gr(t, s, s.pendingProps.children, l);
        return s.child;
      case 12:
        gr(t, s, s.pendingProps.children, l);
        return s.child;
      case 10:
        y = s.pendingProps;
        eo(s, s.type, y.value);
        gr(t, s, y.children, l);
        return s.child;
      case 9:
        k = s.type._context;
        y = s.pendingProps.children;
        oa(s);
        k = mr(k);
        y = y(k);
        s.flags |= 1;
        gr(t, s, y, l);
        return s.child;
      case 14:
        return R_(t, s, s.type, s.pendingProps, l);
      case 15:
        return T_(t, s, s.type, s.pendingProps, l);
      case 19:
        return B_(t, s, l);
      case 31:
        return tT(t, s, l);
      case 22:
        return k_(t, s, l, s.pendingProps);
      case 24:
        oa(s);
        y = mr(Xn);
        if (t === null) {
          k = wp();
          if (k === null) {
            k = wn;
            O = yp();
            k.pooledCache = O;
            O.refCount++;
            if (O !== null) {
              k.pooledCacheLanes |= l;
            }
            k = O;
          }
          s.memoizedState = {
            parent: y,
            cache: k
          };
          xp(s);
          eo(s, Xn, k);
        } else {
          if ((t.lanes & l) !== 0) {
            Cp(t, s);
            bc(s, null, null, l);
            vc();
          }
          k = t.memoizedState;
          O = s.memoizedState;
          if (k.parent !== y) {
            k = {
              parent: y,
              cache: y
            };
            s.memoizedState = k;
            if (s.lanes === 0) {
              s.memoizedState = s.updateQueue.baseState = k;
            }
            eo(s, Xn, y);
          } else {
            y = O.cache;
            eo(s, Xn, y);
            if (y !== k.cache) {
              bp(s, [Xn], l, true);
            }
          }
        }
        gr(t, s, s.pendingProps.children, l);
        return s.child;
      case 29:
        throw s.pendingProps;
    }
    throw Error(i(156, s.tag));
  }
  function wi(t) {
    t.flags |= 4;
  }
  function im(t, s, l, y, k) {
    if (s = (t.mode & 32) !== 0) {
      s = false;
    }
    if (s) {
      t.flags |= 16777216;
      if ((k & 335544128) === k) {
        if (t.stateNode.complete) {
          t.flags |= 8192;
        } else if (u0()) {
          t.flags |= 8192;
        } else {
          ca = Zu;
          throw Sp;
        }
      }
    } else {
      t.flags &= -16777217;
    }
  }
  function N_(t, s) {
    if (s.type !== "stylesheet" || (s.state.loading & 4) !== 0) {
      t.flags &= -16777217;
    } else {
      t.flags |= 16777216;
      if (!J0(s)) {
        if (u0()) {
          t.flags |= 8192;
        } else {
          ca = Zu;
          throw Sp;
        }
      }
    }
  }
  function pd(t, s) {
    if (s !== null) {
      t.flags |= 4;
    }
    if (t.flags & 16384) {
      s = t.tag !== 22 ? St() : 536870912;
      t.lanes |= s;
      gl |= s;
    }
  }
  function Cc(t, s) {
    if (!Qt) {
      switch (t.tailMode) {
        case "hidden":
          s = t.tail;
          var l = null;
          for (; s !== null;) {
            if (s.alternate !== null) {
              l = s;
            }
            s = s.sibling;
          }
          if (l === null) {
            t.tail = null;
          } else {
            l.sibling = null;
          }
          break;
        case "collapsed":
          l = t.tail;
          var y = null;
          for (; l !== null;) {
            if (l.alternate !== null) {
              y = l;
            }
            l = l.sibling;
          }
          if (y === null) {
            if (s || t.tail === null) {
              t.tail = null;
            } else {
              t.tail.sibling = null;
            }
          } else {
            y.sibling = null;
          }
      }
    }
  }
  function Rn(t) {
    var s = t.alternate !== null && t.alternate.child === t.child;
    var l = 0;
    var y = 0;
    if (s) {
      for (var k = t.child; k !== null;) {
        l |= k.lanes | k.childLanes;
        y |= k.subtreeFlags & 65011712;
        y |= k.flags & 65011712;
        k.return = t;
        k = k.sibling;
      }
    } else {
      for (k = t.child; k !== null;) {
        l |= k.lanes | k.childLanes;
        y |= k.subtreeFlags;
        y |= k.flags;
        k.return = t;
        k = k.sibling;
      }
    }
    t.subtreeFlags |= y;
    t.childLanes = l;
    return s;
  }
  function rT(t, s, l) {
    var y = s.pendingProps;
    hp(s);
    switch (s.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        Rn(s);
        return null;
      case 1:
        Rn(s);
        return null;
      case 3:
        l = s.stateNode;
        y = null;
        if (t !== null) {
          y = t.memoizedState.cache;
        }
        if (s.memoizedState.cache !== y) {
          s.flags |= 2048;
        }
        vi(Xn);
        re();
        if (l.pendingContext) {
          l.context = l.pendingContext;
          l.pendingContext = null;
        }
        if (t === null || t.child === null) {
          if (rl(s)) {
            wi(s);
          } else if (t !== null && (!t.memoizedState.isDehydrated || (s.flags & 256) !== 0)) {
            s.flags |= 1024;
            mp();
          }
        }
        Rn(s);
        return null;
      case 26:
        var k = s.type;
        var O = s.memoizedState;
        if (t === null) {
          wi(s);
          if (O !== null) {
            Rn(s);
            N_(s, O);
          } else {
            Rn(s);
            im(s, k, null, y, l);
          }
        } else if (O) {
          if (O !== t.memoizedState) {
            wi(s);
            Rn(s);
            N_(s, O);
          } else {
            Rn(s);
            s.flags &= -16777217;
          }
        } else {
          t = t.memoizedProps;
          if (t !== y) {
            wi(s);
          }
          Rn(s);
          im(s, k, t, y, l);
        }
        return null;
      case 27:
        ge(s);
        l = ue.current;
        k = s.type;
        if (t !== null && s.stateNode != null) {
          if (t.memoizedProps !== y) {
            wi(s);
          }
        } else {
          if (!y) {
            if (s.stateNode === null) {
              throw Error(i(166));
            }
            Rn(s);
            return null;
          }
          t = J.current;
          if (rl(s)) {
            vy(s);
          } else {
            t = $0(k, y, l);
            s.stateNode = t;
            wi(s);
          }
        }
        Rn(s);
        return null;
      case 5:
        ge(s);
        k = s.type;
        if (t !== null && s.stateNode != null) {
          if (t.memoizedProps !== y) {
            wi(s);
          }
        } else {
          if (!y) {
            if (s.stateNode === null) {
              throw Error(i(166));
            }
            Rn(s);
            return null;
          }
          O = J.current;
          if (rl(s)) {
            vy(s);
          } else {
            var K = Ad(ue.current);
            switch (O) {
              case 1:
                O = K.createElementNS("http://www.w3.org/2000/svg", k);
                break;
              case 2:
                O = K.createElementNS("http://www.w3.org/1998/Math/MathML", k);
                break;
              default:
                switch (k) {
                  case "svg":
                    O = K.createElementNS("http://www.w3.org/2000/svg", k);
                    break;
                  case "math":
                    O = K.createElementNS("http://www.w3.org/1998/Math/MathML", k);
                    break;
                  case "script":
                    O = K.createElement("div");
                    O.innerHTML = "<script></script>";
                    O = O.removeChild(O.firstChild);
                    break;
                  case "select":
                    O = typeof y.is == "string" ? K.createElement("select", {
                      is: y.is
                    }) : K.createElement("select");
                    if (y.multiple) {
                      O.multiple = true;
                    } else if (y.size) {
                      O.size = y.size;
                    }
                    break;
                  default:
                    O = typeof y.is == "string" ? K.createElement(k, {
                      is: y.is
                    }) : K.createElement(k);
                }
            }
            O[Ft] = s;
            O[sn] = y;
            e: for (K = s.child; K !== null;) {
              if (K.tag === 5 || K.tag === 6) {
                O.appendChild(K.stateNode);
              } else if (K.tag !== 4 && K.tag !== 27 && K.child !== null) {
                K.child.return = K;
                K = K.child;
                continue;
              }
              if (K === s) {
                break e;
              }
              while (K.sibling === null) {
                if (K.return === null || K.return === s) {
                  break e;
                }
                K = K.return;
              }
              K.sibling.return = K.return;
              K = K.sibling;
            }
            s.stateNode = O;
            vr(O, k, y);
            e: switch (k) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                y = !!y.autoFocus;
                break e;
              case "img":
                y = true;
                break e;
              default:
                y = false;
            }
            if (y) {
              wi(s);
            }
          }
        }
        Rn(s);
        im(s, s.type, t === null ? null : t.memoizedProps, s.pendingProps, l);
        return null;
      case 6:
        if (t && s.stateNode != null) {
          if (t.memoizedProps !== y) {
            wi(s);
          }
        } else {
          if (typeof y != "string" && s.stateNode === null) {
            throw Error(i(166));
          }
          t = ue.current;
          if (rl(s)) {
            t = s.stateNode;
            l = s.memoizedProps;
            y = null;
            k = pr;
            if (k !== null) {
              switch (k.tag) {
                case 27:
                case 5:
                  y = k.memoizedProps;
              }
            }
            t[Ft] = s;
            t = t.nodeValue === l || y !== null && y.suppressHydrationWarning === true || !!L0(t.nodeValue, l);
            if (!t) {
              Ji(s, true);
            }
          } else {
            t = Ad(t).createTextNode(y);
            t[Ft] = s;
            s.stateNode = t;
          }
        }
        Rn(s);
        return null;
      case 31:
        l = s.memoizedState;
        if (t === null || t.memoizedState !== null) {
          y = rl(s);
          if (l !== null) {
            if (t === null) {
              if (!y) {
                throw Error(i(318));
              }
              t = s.memoizedState;
              t = t !== null ? t.dehydrated : null;
              if (!t) {
                throw Error(i(557));
              }
              t[Ft] = s;
            } else {
              sa();
              if ((s.flags & 128) === 0) {
                s.memoizedState = null;
              }
              s.flags |= 4;
            }
            Rn(s);
            t = false;
          } else {
            l = mp();
            if (t !== null && t.memoizedState !== null) {
              t.memoizedState.hydrationErrors = l;
            }
            t = true;
          }
          if (!t) {
            if (s.flags & 256) {
              ns(s);
              return s;
            } else {
              ns(s);
              return null;
            }
          }
          if ((s.flags & 128) !== 0) {
            throw Error(i(558));
          }
        }
        Rn(s);
        return null;
      case 13:
        y = s.memoizedState;
        if (t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          k = rl(s);
          if (y !== null && y.dehydrated !== null) {
            if (t === null) {
              if (!k) {
                throw Error(i(318));
              }
              k = s.memoizedState;
              k = k !== null ? k.dehydrated : null;
              if (!k) {
                throw Error(i(317));
              }
              k[Ft] = s;
            } else {
              sa();
              if ((s.flags & 128) === 0) {
                s.memoizedState = null;
              }
              s.flags |= 4;
            }
            Rn(s);
            k = false;
          } else {
            k = mp();
            if (t !== null && t.memoizedState !== null) {
              t.memoizedState.hydrationErrors = k;
            }
            k = true;
          }
          if (!k) {
            if (s.flags & 256) {
              ns(s);
              return s;
            } else {
              ns(s);
              return null;
            }
          }
        }
        ns(s);
        if ((s.flags & 128) !== 0) {
          s.lanes = l;
          return s;
        } else {
          l = y !== null;
          t = t !== null && t.memoizedState !== null;
          if (l) {
            y = s.child;
            k = null;
            if (y.alternate !== null && y.alternate.memoizedState !== null && y.alternate.memoizedState.cachePool !== null) {
              k = y.alternate.memoizedState.cachePool.pool;
            }
            O = null;
            if (y.memoizedState !== null && y.memoizedState.cachePool !== null) {
              O = y.memoizedState.cachePool.pool;
            }
            if (O !== k) {
              y.flags |= 2048;
            }
          }
          if (l !== t && l) {
            s.child.flags |= 8192;
          }
          pd(s, s.updateQueue);
          Rn(s);
          return null;
        }
      case 4:
        re();
        if (t === null) {
          Tm(s.stateNode.containerInfo);
        }
        Rn(s);
        return null;
      case 10:
        vi(s.type);
        Rn(s);
        return null;
      case 19:
        V(Vn);
        y = s.memoizedState;
        if (y === null) {
          Rn(s);
          return null;
        }
        k = (s.flags & 128) !== 0;
        O = y.rendering;
        if (O === null) {
          if (k) {
            Cc(y, false);
          } else {
            if (Nn !== 0 || t !== null && (t.flags & 128) !== 0) {
              for (t = s.child; t !== null;) {
                O = td(t);
                if (O !== null) {
                  s.flags |= 128;
                  Cc(y, false);
                  t = O.updateQueue;
                  s.updateQueue = t;
                  pd(s, t);
                  s.subtreeFlags = 0;
                  t = l;
                  l = s.child;
                  while (l !== null) {
                    fy(l, t);
                    l = l.sibling;
                  }
                  Z(Vn, Vn.current & 1 | 2);
                  if (Qt) {
                    mi(s, y.treeForkCount);
                  }
                  return s.child;
                }
                t = t.sibling;
              }
            }
            if (y.tail !== null && _e() > yd) {
              s.flags |= 128;
              k = true;
              Cc(y, false);
              s.lanes = 4194304;
            }
          }
        } else {
          if (!k) {
            t = td(O);
            if (t !== null) {
              s.flags |= 128;
              k = true;
              t = t.updateQueue;
              s.updateQueue = t;
              pd(s, t);
              Cc(y, true);
              if (y.tail === null && y.tailMode === "hidden" && !O.alternate && !Qt) {
                Rn(s);
                return null;
              }
            } else if (_e() * 2 - y.renderingStartTime > yd && l !== 536870912) {
              s.flags |= 128;
              k = true;
              Cc(y, false);
              s.lanes = 4194304;
            }
          }
          if (y.isBackwards) {
            O.sibling = s.child;
            s.child = O;
          } else {
            t = y.last;
            if (t !== null) {
              t.sibling = O;
            } else {
              s.child = O;
            }
            y.last = O;
          }
        }
        if (y.tail !== null) {
          t = y.tail;
          y.rendering = t;
          y.tail = t.sibling;
          y.renderingStartTime = _e();
          t.sibling = null;
          l = Vn.current;
          Z(Vn, k ? l & 1 | 2 : l & 1);
          if (Qt) {
            mi(s, y.treeForkCount);
          }
          return t;
        } else {
          Rn(s);
          return null;
        }
      case 22:
      case 23:
        ns(s);
        kp();
        y = s.memoizedState !== null;
        if (t !== null) {
          if (t.memoizedState !== null !== y) {
            s.flags |= 8192;
          }
        } else if (y) {
          s.flags |= 8192;
        }
        if (y) {
          if ((l & 536870912) !== 0 && (s.flags & 128) === 0) {
            Rn(s);
            if (s.subtreeFlags & 6) {
              s.flags |= 8192;
            }
          }
        } else {
          Rn(s);
        }
        l = s.updateQueue;
        if (l !== null) {
          pd(s, l.retryQueue);
        }
        l = null;
        if (t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null) {
          l = t.memoizedState.cachePool.pool;
        }
        y = null;
        if (s.memoizedState !== null && s.memoizedState.cachePool !== null) {
          y = s.memoizedState.cachePool.pool;
        }
        if (y !== l) {
          s.flags |= 2048;
        }
        if (t !== null) {
          V(aa);
        }
        return null;
      case 24:
        l = null;
        if (t !== null) {
          l = t.memoizedState.cache;
        }
        if (s.memoizedState.cache !== l) {
          s.flags |= 2048;
        }
        vi(Xn);
        Rn(s);
        return null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(i(156, s.tag));
  }
  function sT(t, s) {
    hp(s);
    switch (s.tag) {
      case 1:
        t = s.flags;
        if (t & 65536) {
          s.flags = t & -65537 | 128;
          return s;
        } else {
          return null;
        }
      case 3:
        vi(Xn);
        re();
        t = s.flags;
        if ((t & 65536) !== 0 && (t & 128) === 0) {
          s.flags = t & -65537 | 128;
          return s;
        } else {
          return null;
        }
      case 26:
      case 27:
      case 5:
        ge(s);
        return null;
      case 31:
        if (s.memoizedState !== null) {
          ns(s);
          if (s.alternate === null) {
            throw Error(i(340));
          }
          sa();
        }
        t = s.flags;
        if (t & 65536) {
          s.flags = t & -65537 | 128;
          return s;
        } else {
          return null;
        }
      case 13:
        ns(s);
        t = s.memoizedState;
        if (t !== null && t.dehydrated !== null) {
          if (s.alternate === null) {
            throw Error(i(340));
          }
          sa();
        }
        t = s.flags;
        if (t & 65536) {
          s.flags = t & -65537 | 128;
          return s;
        } else {
          return null;
        }
      case 19:
        V(Vn);
        return null;
      case 4:
        re();
        return null;
      case 10:
        vi(s.type);
        return null;
      case 22:
      case 23:
        ns(s);
        kp();
        if (t !== null) {
          V(aa);
        }
        t = s.flags;
        if (t & 65536) {
          s.flags = t & -65537 | 128;
          return s;
        } else {
          return null;
        }
      case 24:
        vi(Xn);
        return null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function j_(t, s) {
    hp(s);
    switch (s.tag) {
      case 3:
        vi(Xn);
        re();
        break;
      case 26:
      case 27:
      case 5:
        ge(s);
        break;
      case 4:
        re();
        break;
      case 31:
        if (s.memoizedState !== null) {
          ns(s);
        }
        break;
      case 13:
        ns(s);
        break;
      case 19:
        V(Vn);
        break;
      case 10:
        vi(s.type);
        break;
      case 22:
      case 23:
        ns(s);
        kp();
        if (t !== null) {
          V(aa);
        }
        break;
      case 24:
        vi(Xn);
    }
  }
  function Ec(t, s) {
    try {
      var l = s.updateQueue;
      var y = l !== null ? l.lastEffect : null;
      if (y !== null) {
        var k = y.next;
        l = k;
        do {
          if ((l.tag & t) === t) {
            y = undefined;
            var O = l.create;
            var K = l.inst;
            y = O();
            K.destroy = y;
          }
          l = l.next;
        } while (l !== k);
      }
    } catch (le) {
      mn(s, s.return, le);
    }
  }
  function oo(t, s, l) {
    try {
      var y = s.updateQueue;
      var k = y !== null ? y.lastEffect : null;
      if (k !== null) {
        var O = k.next;
        y = O;
        do {
          if ((y.tag & t) === t) {
            var K = y.inst;
            var le = K.destroy;
            if (le !== undefined) {
              K.destroy = undefined;
              k = s;
              var we = l;
              var Ae = le;
              try {
                Ae();
              } catch (Le) {
                mn(k, we, Le);
              }
            }
          }
          y = y.next;
        } while (y !== O);
      }
    } catch (Le) {
      mn(s, s.return, Le);
    }
  }
  function H_(t) {
    var s = t.updateQueue;
    if (s !== null) {
      var l = t.stateNode;
      try {
        My(s, l);
      } catch (y) {
        mn(t, t.return, y);
      }
    }
  }
  function F_(t, s, l) {
    l.props = fa(t.type, t.memoizedProps);
    l.state = t.memoizedState;
    try {
      l.componentWillUnmount();
    } catch (y) {
      mn(t, s, y);
    }
  }
  function Rc(t, s) {
    try {
      var l = t.ref;
      if (l !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var y = t.stateNode;
            break;
          case 30:
            y = t.stateNode;
            break;
          default:
            y = t.stateNode;
        }
        if (typeof l == "function") {
          t.refCleanup = l(y);
        } else {
          l.current = y;
        }
      }
    } catch (k) {
      mn(t, s, k);
    }
  }
  function Xs(t, s) {
    var l = t.ref;
    var y = t.refCleanup;
    if (l !== null) {
      if (typeof y == "function") {
        try {
          y();
        } catch (k) {
          mn(t, s, k);
        } finally {
          t.refCleanup = null;
          t = t.alternate;
          if (t != null) {
            t.refCleanup = null;
          }
        }
      } else if (typeof l == "function") {
        try {
          l(null);
        } catch (k) {
          mn(t, s, k);
        }
      } else {
        l.current = null;
      }
    }
  }
  function U_(t) {
    var s = t.type;
    var l = t.memoizedProps;
    var y = t.stateNode;
    try {
      e: switch (s) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          if (l.autoFocus) {
            y.focus();
          }
          break e;
        case "img":
          if (l.src) {
            y.src = l.src;
          } else if (l.srcSet) {
            y.srcset = l.srcSet;
          }
      }
    } catch (k) {
      mn(t, t.return, k);
    }
  }
  function om(t, s, l) {
    try {
      var y = t.stateNode;
      RT(y, t.type, l, s);
      y[sn] = s;
    } catch (k) {
      mn(t, t.return, k);
    }
  }
  function V_(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && po(t.type) || t.tag === 4;
  }
  function am(t) {
    e: while (true) {
      while (t.sibling === null) {
        if (t.return === null || V_(t.return)) {
          return null;
        }
        t = t.return;
      }
      t.sibling.return = t.return;
      t = t.sibling;
      while (t.tag !== 5 && t.tag !== 6 && t.tag !== 18) {
        if (t.tag === 27 && po(t.type) || t.flags & 2 || t.child === null || t.tag === 4) {
          continue e;
        }
        t.child.return = t;
        t = t.child;
      }
      if (!(t.flags & 2)) {
        return t.stateNode;
      }
    }
  }
  function lm(t, s, l) {
    var y = t.tag;
    if (y === 5 || y === 6) {
      t = t.stateNode;
      if (s) {
        (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(t, s);
      } else {
        s = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l;
        s.appendChild(t);
        l = l._reactRootContainer;
        if (l == null && s.onclick === null) {
          s.onclick = Qr;
        }
      }
    } else if (y !== 4 && (y === 27 && po(t.type) && (l = t.stateNode, s = null), t = t.child, t !== null)) {
      lm(t, s, l);
      t = t.sibling;
      while (t !== null) {
        lm(t, s, l);
        t = t.sibling;
      }
    }
  }
  function md(t, s, l) {
    var y = t.tag;
    if (y === 5 || y === 6) {
      t = t.stateNode;
      if (s) {
        l.insertBefore(t, s);
      } else {
        l.appendChild(t);
      }
    } else if (y !== 4 && (y === 27 && po(t.type) && (l = t.stateNode), t = t.child, t !== null)) {
      md(t, s, l);
      t = t.sibling;
      while (t !== null) {
        md(t, s, l);
        t = t.sibling;
      }
    }
  }
  function W_(t) {
    var s = t.stateNode;
    var l = t.memoizedProps;
    try {
      var y = t.type;
      for (var k = s.attributes; k.length;) {
        s.removeAttributeNode(k[0]);
      }
      vr(s, y, l);
      s[Ft] = t;
      s[sn] = l;
    } catch (O) {
      mn(t, t.return, O);
    }
  }
  var Si = false;
  var Qn = false;
  var cm = false;
  var $_ = typeof WeakSet == "function" ? WeakSet : Set;
  var lr = null;
  function iT(t, s) {
    t = t.containerInfo;
    Mm = Bd;
    t = ry(t);
    if (np(t)) {
      if ("selectionStart" in t) {
        var l = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      } else {
        e: {
          l = (l = t.ownerDocument) && l.defaultView || window;
          var y = l.getSelection && l.getSelection();
          if (y && y.rangeCount !== 0) {
            l = y.anchorNode;
            var k = y.anchorOffset;
            var O = y.focusNode;
            y = y.focusOffset;
            try {
              l.nodeType;
              O.nodeType;
            } catch {
              l = null;
              break e;
            }
            var K = 0;
            var le = -1;
            var we = -1;
            var Ae = 0;
            var Le = 0;
            var He = t;
            var Oe = null;
            t: while (true) {
              for (var De; He !== l || k !== 0 && He.nodeType !== 3 || (le = K + k), He !== O || y !== 0 && He.nodeType !== 3 || (we = K + y), He.nodeType === 3 && (K += He.nodeValue.length), (De = He.firstChild) !== null;) {
                Oe = He;
                He = De;
              }
              while (true) {
                if (He === t) {
                  break t;
                }
                if (Oe === l && ++Ae === k) {
                  le = K;
                }
                if (Oe === O && ++Le === y) {
                  we = K;
                }
                if ((De = He.nextSibling) !== null) {
                  break;
                }
                He = Oe;
                Oe = He.parentNode;
              }
              He = De;
            }
            l = le === -1 || we === -1 ? null : {
              start: le,
              end: we
            };
          } else {
            l = null;
          }
        }
      }
      l = l || {
        start: 0,
        end: 0
      };
    } else {
      l = null;
    }
    Om = {
      focusedElem: t,
      selectionRange: l
    };
    Bd = false;
    lr = s;
    while (lr !== null) {
      s = lr;
      t = s.child;
      if ((s.subtreeFlags & 1028) !== 0 && t !== null) {
        t.return = s;
        lr = t;
      } else {
        while (lr !== null) {
          s = lr;
          O = s.alternate;
          t = s.flags;
          switch (s.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = s.updateQueue, t = t !== null ? t.events : null, t !== null)) {
                for (l = 0; l < t.length; l++) {
                  k = t[l];
                  k.ref.impl = k.nextImpl;
                }
              }
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && O !== null) {
                t = undefined;
                l = s;
                k = O.memoizedProps;
                O = O.memoizedState;
                y = l.stateNode;
                try {
                  var at = fa(l.type, k);
                  t = y.getSnapshotBeforeUpdate(at, O);
                  y.__reactInternalSnapshotBeforeUpdate = t;
                } catch (wt) {
                  mn(l, l.return, wt);
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                t = s.stateNode.containerInfo;
                l = t.nodeType;
                if (l === 9) {
                  Lm(t);
                } else if (l === 1) {
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Lm(t);
                      break;
                    default:
                      t.textContent = "";
                  }
                }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) {
                throw Error(i(163));
              }
          }
          t = s.sibling;
          if (t !== null) {
            t.return = s.return;
            lr = t;
            break;
          }
          lr = s.return;
        }
      }
    }
  }
  function q_(t, s, l) {
    var y = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Ci(t, l);
        if (y & 4) {
          Ec(5, l);
        }
        break;
      case 1:
        Ci(t, l);
        if (y & 4) {
          t = l.stateNode;
          if (s === null) {
            try {
              t.componentDidMount();
            } catch (K) {
              mn(l, l.return, K);
            }
          } else {
            var k = fa(l.type, s.memoizedProps);
            s = s.memoizedState;
            try {
              t.componentDidUpdate(k, s, t.__reactInternalSnapshotBeforeUpdate);
            } catch (K) {
              mn(l, l.return, K);
            }
          }
        }
        if (y & 64) {
          H_(l);
        }
        if (y & 512) {
          Rc(l, l.return);
        }
        break;
      case 3:
        Ci(t, l);
        if (y & 64 && (t = l.updateQueue, t !== null)) {
          s = null;
          if (l.child !== null) {
            switch (l.child.tag) {
              case 27:
              case 5:
                s = l.child.stateNode;
                break;
              case 1:
                s = l.child.stateNode;
            }
          }
          try {
            My(t, s);
          } catch (K) {
            mn(l, l.return, K);
          }
        }
        break;
      case 27:
        if (s === null && y & 4) {
          W_(l);
        }
      case 26:
      case 5:
        Ci(t, l);
        if (s === null && y & 4) {
          U_(l);
        }
        if (y & 512) {
          Rc(l, l.return);
        }
        break;
      case 12:
        Ci(t, l);
        break;
      case 31:
        Ci(t, l);
        if (y & 4) {
          X_(t, l);
        }
        break;
      case 13:
        Ci(t, l);
        if (y & 4) {
          K_(t, l);
        }
        if (y & 64) {
          t = l.memoizedState;
          if (t !== null) {
            t = t.dehydrated;
            if (t !== null) {
              l = pT.bind(null, l);
              LT(t, l);
            }
          }
        }
        break;
      case 22:
        y = l.memoizedState !== null || Si;
        if (!y) {
          s = s !== null && s.memoizedState !== null || Qn;
          k = Si;
          var O = Qn;
          Si = y;
          if ((Qn = s) && !O) {
            Ei(t, l, (l.subtreeFlags & 8772) !== 0);
          } else {
            Ci(t, l);
          }
          Si = k;
          Qn = O;
        }
        break;
      case 30:
        break;
      default:
        Ci(t, l);
    }
  }
  function G_(t) {
    var s = t.alternate;
    if (s !== null) {
      t.alternate = null;
      G_(s);
    }
    t.child = null;
    t.deletions = null;
    t.sibling = null;
    if (t.tag === 5) {
      s = t.stateNode;
      if (s !== null) {
        us(s);
      }
    }
    t.stateNode = null;
    t.return = null;
    t.dependencies = null;
    t.memoizedProps = null;
    t.memoizedState = null;
    t.pendingProps = null;
    t.stateNode = null;
    t.updateQueue = null;
  }
  var Tn = null;
  var zr = false;
  function xi(t, s, l) {
    for (l = l.child; l !== null;) {
      Y_(t, s, l);
      l = l.sibling;
    }
  }
  function Y_(t, s, l) {
    if (We && typeof We.onCommitFiberUnmount == "function") {
      try {
        We.onCommitFiberUnmount(Ue, l);
      } catch {}
    }
    switch (l.tag) {
      case 26:
        if (!Qn) {
          Xs(l, s);
        }
        xi(t, s, l);
        if (l.memoizedState) {
          l.memoizedState.count--;
        } else if (l.stateNode) {
          l = l.stateNode;
          l.parentNode.removeChild(l);
        }
        break;
      case 27:
        if (!Qn) {
          Xs(l, s);
        }
        var y = Tn;
        var k = zr;
        if (po(l.type)) {
          Tn = l.stateNode;
          zr = false;
        }
        xi(t, s, l);
        Pc(l.stateNode);
        Tn = y;
        zr = k;
        break;
      case 5:
        if (!Qn) {
          Xs(l, s);
        }
      case 6:
        y = Tn;
        k = zr;
        Tn = null;
        xi(t, s, l);
        Tn = y;
        zr = k;
        if (Tn !== null) {
          if (zr) {
            try {
              (Tn.nodeType === 9 ? Tn.body : Tn.nodeName === "HTML" ? Tn.ownerDocument.body : Tn).removeChild(l.stateNode);
            } catch (O) {
              mn(l, s, O);
            }
          } else {
            try {
              Tn.removeChild(l.stateNode);
            } catch (O) {
              mn(l, s, O);
            }
          }
        }
        break;
      case 18:
        if (Tn !== null) {
          if (zr) {
            t = Tn;
            H0(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, l.stateNode);
            Cl(t);
          } else {
            H0(Tn, l.stateNode);
          }
        }
        break;
      case 4:
        y = Tn;
        k = zr;
        Tn = l.stateNode.containerInfo;
        zr = true;
        xi(t, s, l);
        Tn = y;
        zr = k;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        oo(2, l, s);
        if (!Qn) {
          oo(4, l, s);
        }
        xi(t, s, l);
        break;
      case 1:
        if (!Qn) {
          Xs(l, s);
          y = l.stateNode;
          if (typeof y.componentWillUnmount == "function") {
            F_(l, s, y);
          }
        }
        xi(t, s, l);
        break;
      case 21:
        xi(t, s, l);
        break;
      case 22:
        Qn = (y = Qn) || l.memoizedState !== null;
        xi(t, s, l);
        Qn = y;
        break;
      default:
        xi(t, s, l);
    }
  }
  function X_(t, s) {
    if (s.memoizedState === null && (t = s.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Cl(t);
      } catch (l) {
        mn(s, s.return, l);
      }
    }
  }
  function K_(t, s) {
    if (s.memoizedState === null && (t = s.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null)))) {
      try {
        Cl(t);
      } catch (l) {
        mn(s, s.return, l);
      }
    }
  }
  function oT(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var s = t.stateNode;
        if (s === null) {
          s = t.stateNode = new $_();
        }
        return s;
      case 22:
        t = t.stateNode;
        s = t._retryCache;
        if (s === null) {
          s = t._retryCache = new $_();
        }
        return s;
      default:
        throw Error(i(435, t.tag));
    }
  }
  function gd(t, s) {
    var l = oT(t);
    s.forEach(function (y) {
      if (!l.has(y)) {
        l.add(y);
        var k = mT.bind(null, t, y);
        y.then(k, k);
      }
    });
  }
  function Nr(t, s) {
    var l = s.deletions;
    if (l !== null) {
      for (var y = 0; y < l.length; y++) {
        var k = l[y];
        var O = t;
        var K = s;
        var le = K;
        e: while (le !== null) {
          switch (le.tag) {
            case 27:
              if (po(le.type)) {
                Tn = le.stateNode;
                zr = false;
                break e;
              }
              break;
            case 5:
              Tn = le.stateNode;
              zr = false;
              break e;
            case 3:
            case 4:
              Tn = le.stateNode.containerInfo;
              zr = true;
              break e;
          }
          le = le.return;
        }
        if (Tn === null) {
          throw Error(i(160));
        }
        Y_(O, K, k);
        Tn = null;
        zr = false;
        O = k.alternate;
        if (O !== null) {
          O.return = null;
        }
        k.return = null;
      }
    }
    if (s.subtreeFlags & 13886) {
      for (s = s.child; s !== null;) {
        Z_(s, t);
        s = s.sibling;
      }
    }
  }
  var Ds = null;
  function Z_(t, s) {
    var l = t.alternate;
    var y = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        Nr(s, t);
        jr(t);
        if (y & 4) {
          oo(3, t, t.return);
          Ec(3, t);
          oo(5, t, t.return);
        }
        break;
      case 1:
        Nr(s, t);
        jr(t);
        if (y & 512) {
          if (!Qn && l !== null) {
            Xs(l, l.return);
          }
        }
        if (y & 64 && Si) {
          t = t.updateQueue;
          if (t !== null) {
            y = t.callbacks;
            if (y !== null) {
              l = t.shared.hiddenCallbacks;
              t.shared.hiddenCallbacks = l === null ? y : l.concat(y);
            }
          }
        }
        break;
      case 26:
        var k = Ds;
        Nr(s, t);
        jr(t);
        if (y & 512) {
          if (!Qn && l !== null) {
            Xs(l, l.return);
          }
        }
        if (y & 4) {
          var O = l !== null ? l.memoizedState : null;
          y = t.memoizedState;
          if (l === null) {
            if (y === null) {
              if (t.stateNode === null) {
                e: {
                  y = t.type;
                  l = t.memoizedProps;
                  k = k.ownerDocument || k;
                  t: switch (y) {
                    case "title":
                      O = k.getElementsByTagName("title")[0];
                      if (!O || O[dr] || O[Ft] || O.namespaceURI === "http://www.w3.org/2000/svg" || O.hasAttribute("itemprop")) {
                        O = k.createElement(y);
                        k.head.insertBefore(O, k.querySelector("head > title"));
                      }
                      vr(O, y, l);
                      O[Ft] = t;
                      _n(O);
                      y = O;
                      break e;
                    case "link":
                      var K = Z0("link", "href", k).get(y + (l.href || ""));
                      if (K) {
                        for (var le = 0; le < K.length; le++) {
                          O = K[le];
                          if (O.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && O.getAttribute("rel") === (l.rel == null ? null : l.rel) && O.getAttribute("title") === (l.title == null ? null : l.title) && O.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                            K.splice(le, 1);
                            break t;
                          }
                        }
                      }
                      O = k.createElement(y);
                      vr(O, y, l);
                      k.head.appendChild(O);
                      break;
                    case "meta":
                      if (K = Z0("meta", "content", k).get(y + (l.content || ""))) {
                        for (le = 0; le < K.length; le++) {
                          O = K[le];
                          if (O.getAttribute("content") === (l.content == null ? null : "" + l.content) && O.getAttribute("name") === (l.name == null ? null : l.name) && O.getAttribute("property") === (l.property == null ? null : l.property) && O.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && O.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                            K.splice(le, 1);
                            break t;
                          }
                        }
                      }
                      O = k.createElement(y);
                      vr(O, y, l);
                      k.head.appendChild(O);
                      break;
                    default:
                      throw Error(i(468, y));
                  }
                  O[Ft] = t;
                  _n(O);
                  y = O;
                }
                t.stateNode = y;
              } else {
                Q0(k, t.type, t.stateNode);
              }
            } else {
              t.stateNode = K0(k, y, t.memoizedProps);
            }
          } else if (O !== y) {
            if (O === null) {
              if (l.stateNode !== null) {
                l = l.stateNode;
                l.parentNode.removeChild(l);
              }
            } else {
              O.count--;
            }
            if (y === null) {
              Q0(k, t.type, t.stateNode);
            } else {
              K0(k, y, t.memoizedProps);
            }
          } else if (y === null && t.stateNode !== null) {
            om(t, t.memoizedProps, l.memoizedProps);
          }
        }
        break;
      case 27:
        Nr(s, t);
        jr(t);
        if (y & 512) {
          if (!Qn && l !== null) {
            Xs(l, l.return);
          }
        }
        if (l !== null && y & 4) {
          om(t, t.memoizedProps, l.memoizedProps);
        }
        break;
      case 5:
        Nr(s, t);
        jr(t);
        if (y & 512) {
          if (!Qn && l !== null) {
            Xs(l, l.return);
          }
        }
        if (t.flags & 32) {
          k = t.stateNode;
          try {
            Zr(k, "");
          } catch (at) {
            mn(t, t.return, at);
          }
        }
        if (y & 4 && t.stateNode != null) {
          k = t.memoizedProps;
          om(t, k, l !== null ? l.memoizedProps : k);
        }
        if (y & 1024) {
          cm = true;
        }
        break;
      case 6:
        Nr(s, t);
        jr(t);
        if (y & 4) {
          if (t.stateNode === null) {
            throw Error(i(162));
          }
          y = t.memoizedProps;
          l = t.stateNode;
          try {
            l.nodeValue = y;
          } catch (at) {
            mn(t, t.return, at);
          }
        }
        break;
      case 3:
        Dd = null;
        k = Ds;
        Ds = Md(s.containerInfo);
        Nr(s, t);
        Ds = k;
        jr(t);
        if (y & 4 && l !== null && l.memoizedState.isDehydrated) {
          try {
            Cl(s.containerInfo);
          } catch (at) {
            mn(t, t.return, at);
          }
        }
        if (cm) {
          cm = false;
          Q_(t);
        }
        break;
      case 4:
        y = Ds;
        Ds = Md(t.stateNode.containerInfo);
        Nr(s, t);
        jr(t);
        Ds = y;
        break;
      case 12:
        Nr(s, t);
        jr(t);
        break;
      case 31:
        Nr(s, t);
        jr(t);
        if (y & 4) {
          y = t.updateQueue;
          if (y !== null) {
            t.updateQueue = null;
            gd(t, y);
          }
        }
        break;
      case 13:
        Nr(s, t);
        jr(t);
        if (t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null)) {
          bd = _e();
        }
        if (y & 4) {
          y = t.updateQueue;
          if (y !== null) {
            t.updateQueue = null;
            gd(t, y);
          }
        }
        break;
      case 22:
        k = t.memoizedState !== null;
        var we = l !== null && l.memoizedState !== null;
        var Ae = Si;
        var Le = Qn;
        Si = Ae || k;
        Qn = Le || we;
        Nr(s, t);
        Qn = Le;
        Si = Ae;
        jr(t);
        if (y & 8192) {
          s = t.stateNode;
          s._visibility = k ? s._visibility & -2 : s._visibility | 1;
          if (k) {
            if (l !== null && !we && !Si && !Qn) {
              ha(t);
            }
          }
          l = null;
          s = t;
          e: while (true) {
            if (s.tag === 5 || s.tag === 26) {
              if (l === null) {
                we = l = s;
                try {
                  O = we.stateNode;
                  if (k) {
                    K = O.style;
                    if (typeof K.setProperty == "function") {
                      K.setProperty("display", "none", "important");
                    } else {
                      K.display = "none";
                    }
                  } else {
                    le = we.stateNode;
                    var He = we.memoizedProps.style;
                    var Oe = He != null && He.hasOwnProperty("display") ? He.display : null;
                    le.style.display = Oe == null || typeof Oe == "boolean" ? "" : ("" + Oe).trim();
                  }
                } catch (at) {
                  mn(we, we.return, at);
                }
              }
            } else if (s.tag === 6) {
              if (l === null) {
                we = s;
                try {
                  we.stateNode.nodeValue = k ? "" : we.memoizedProps;
                } catch (at) {
                  mn(we, we.return, at);
                }
              }
            } else if (s.tag === 18) {
              if (l === null) {
                we = s;
                try {
                  var De = we.stateNode;
                  if (k) {
                    F0(De, true);
                  } else {
                    F0(we.stateNode, false);
                  }
                } catch (at) {
                  mn(we, we.return, at);
                }
              }
            } else if ((s.tag !== 22 && s.tag !== 23 || s.memoizedState === null || s === t) && s.child !== null) {
              s.child.return = s;
              s = s.child;
              continue;
            }
            if (s === t) {
              break e;
            }
            while (s.sibling === null) {
              if (s.return === null || s.return === t) {
                break e;
              }
              if (l === s) {
                l = null;
              }
              s = s.return;
            }
            if (l === s) {
              l = null;
            }
            s.sibling.return = s.return;
            s = s.sibling;
          }
        }
        if (y & 4) {
          y = t.updateQueue;
          if (y !== null) {
            l = y.retryQueue;
            if (l !== null) {
              y.retryQueue = null;
              gd(t, l);
            }
          }
        }
        break;
      case 19:
        Nr(s, t);
        jr(t);
        if (y & 4) {
          y = t.updateQueue;
          if (y !== null) {
            t.updateQueue = null;
            gd(t, y);
          }
        }
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        Nr(s, t);
        jr(t);
    }
  }
  function jr(t) {
    var s = t.flags;
    if (s & 2) {
      try {
        var l;
        for (var y = t.return; y !== null;) {
          if (V_(y)) {
            l = y;
            break;
          }
          y = y.return;
        }
        if (l == null) {
          throw Error(i(160));
        }
        switch (l.tag) {
          case 27:
            var k = l.stateNode;
            var O = am(t);
            md(t, O, k);
            break;
          case 5:
            var K = l.stateNode;
            if (l.flags & 32) {
              Zr(K, "");
              l.flags &= -33;
            }
            var le = am(t);
            md(t, le, K);
            break;
          case 3:
          case 4:
            var we = l.stateNode.containerInfo;
            var Ae = am(t);
            lm(t, Ae, we);
            break;
          default:
            throw Error(i(161));
        }
      } catch (Le) {
        mn(t, t.return, Le);
      }
      t.flags &= -3;
    }
    if (s & 4096) {
      t.flags &= -4097;
    }
  }
  function Q_(t) {
    if (t.subtreeFlags & 1024) {
      for (t = t.child; t !== null;) {
        var s = t;
        Q_(s);
        if (s.tag === 5 && s.flags & 1024) {
          s.stateNode.reset();
        }
        t = t.sibling;
      }
    }
  }
  function Ci(t, s) {
    if (s.subtreeFlags & 8772) {
      for (s = s.child; s !== null;) {
        q_(t, s.alternate, s);
        s = s.sibling;
      }
    }
  }
  function ha(t) {
    for (t = t.child; t !== null;) {
      var s = t;
      switch (s.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          oo(4, s, s.return);
          ha(s);
          break;
        case 1:
          Xs(s, s.return);
          var l = s.stateNode;
          if (typeof l.componentWillUnmount == "function") {
            F_(s, s.return, l);
          }
          ha(s);
          break;
        case 27:
          Pc(s.stateNode);
        case 26:
        case 5:
          Xs(s, s.return);
          ha(s);
          break;
        case 22:
          if (s.memoizedState === null) {
            ha(s);
          }
          break;
        case 30:
          ha(s);
          break;
        default:
          ha(s);
      }
      t = t.sibling;
    }
  }
  function Ei(t, s, l) {
    l = l && (s.subtreeFlags & 8772) !== 0;
    s = s.child;
    while (s !== null) {
      var y = s.alternate;
      var k = t;
      var O = s;
      var K = O.flags;
      switch (O.tag) {
        case 0:
        case 11:
        case 15:
          Ei(k, O, l);
          Ec(4, O);
          break;
        case 1:
          Ei(k, O, l);
          y = O;
          k = y.stateNode;
          if (typeof k.componentDidMount == "function") {
            try {
              k.componentDidMount();
            } catch (Ae) {
              mn(y, y.return, Ae);
            }
          }
          y = O;
          k = y.updateQueue;
          if (k !== null) {
            var le = y.stateNode;
            try {
              var we = k.shared.hiddenCallbacks;
              if (we !== null) {
                k.shared.hiddenCallbacks = null;
                k = 0;
                for (; k < we.length; k++) {
                  Ay(we[k], le);
                }
              }
            } catch (Ae) {
              mn(y, y.return, Ae);
            }
          }
          if (l && K & 64) {
            H_(O);
          }
          Rc(O, O.return);
          break;
        case 27:
          W_(O);
        case 26:
        case 5:
          Ei(k, O, l);
          if (l && y === null && K & 4) {
            U_(O);
          }
          Rc(O, O.return);
          break;
        case 12:
          Ei(k, O, l);
          break;
        case 31:
          Ei(k, O, l);
          if (l && K & 4) {
            X_(k, O);
          }
          break;
        case 13:
          Ei(k, O, l);
          if (l && K & 4) {
            K_(k, O);
          }
          break;
        case 22:
          if (O.memoizedState === null) {
            Ei(k, O, l);
          }
          Rc(O, O.return);
          break;
        case 30:
          break;
        default:
          Ei(k, O, l);
      }
      s = s.sibling;
    }
  }
  function um(t, s) {
    var l = null;
    if (t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null) {
      l = t.memoizedState.cachePool.pool;
    }
    t = null;
    if (s.memoizedState !== null && s.memoizedState.cachePool !== null) {
      t = s.memoizedState.cachePool.pool;
    }
    if (t !== l) {
      if (t != null) {
        t.refCount++;
      }
      if (l != null) {
        fc(l);
      }
    }
  }
  function dm(t, s) {
    t = null;
    if (s.alternate !== null) {
      t = s.alternate.memoizedState.cache;
    }
    s = s.memoizedState.cache;
    if (s !== t) {
      s.refCount++;
      if (t != null) {
        fc(t);
      }
    }
  }
  function Is(t, s, l, y) {
    if (s.subtreeFlags & 10256) {
      for (s = s.child; s !== null;) {
        J_(t, s, l, y);
        s = s.sibling;
      }
    }
  }
  function J_(t, s, l, y) {
    var k = s.flags;
    switch (s.tag) {
      case 0:
      case 11:
      case 15:
        Is(t, s, l, y);
        if (k & 2048) {
          Ec(9, s);
        }
        break;
      case 1:
        Is(t, s, l, y);
        break;
      case 3:
        Is(t, s, l, y);
        if (k & 2048) {
          t = null;
          if (s.alternate !== null) {
            t = s.alternate.memoizedState.cache;
          }
          s = s.memoizedState.cache;
          if (s !== t) {
            s.refCount++;
            if (t != null) {
              fc(t);
            }
          }
        }
        break;
      case 12:
        if (k & 2048) {
          Is(t, s, l, y);
          t = s.stateNode;
          try {
            var O = s.memoizedProps;
            var K = O.id;
            var le = O.onPostCommit;
            if (typeof le == "function") {
              le(K, s.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0);
            }
          } catch (we) {
            mn(s, s.return, we);
          }
        } else {
          Is(t, s, l, y);
        }
        break;
      case 31:
        Is(t, s, l, y);
        break;
      case 13:
        Is(t, s, l, y);
        break;
      case 23:
        break;
      case 22:
        O = s.stateNode;
        K = s.alternate;
        if (s.memoizedState !== null) {
          if (O._visibility & 2) {
            Is(t, s, l, y);
          } else {
            Tc(t, s);
          }
        } else if (O._visibility & 2) {
          Is(t, s, l, y);
        } else {
          O._visibility |= 2;
          hl(t, s, l, y, (s.subtreeFlags & 10256) !== 0 || false);
        }
        if (k & 2048) {
          um(K, s);
        }
        break;
      case 24:
        Is(t, s, l, y);
        if (k & 2048) {
          dm(s.alternate, s);
        }
        break;
      default:
        Is(t, s, l, y);
    }
  }
  function hl(t, s, l, y, k) {
    k = k && ((s.subtreeFlags & 10256) !== 0 || false);
    s = s.child;
    while (s !== null) {
      var O = t;
      var K = s;
      var le = l;
      var we = y;
      var Ae = K.flags;
      switch (K.tag) {
        case 0:
        case 11:
        case 15:
          hl(O, K, le, we, k);
          Ec(8, K);
          break;
        case 23:
          break;
        case 22:
          var Le = K.stateNode;
          if (K.memoizedState !== null) {
            if (Le._visibility & 2) {
              hl(O, K, le, we, k);
            } else {
              Tc(O, K);
            }
          } else {
            Le._visibility |= 2;
            hl(O, K, le, we, k);
          }
          if (k && Ae & 2048) {
            um(K.alternate, K);
          }
          break;
        case 24:
          hl(O, K, le, we, k);
          if (k && Ae & 2048) {
            dm(K.alternate, K);
          }
          break;
        default:
          hl(O, K, le, we, k);
      }
      s = s.sibling;
    }
  }
  function Tc(t, s) {
    if (s.subtreeFlags & 10256) {
      for (s = s.child; s !== null;) {
        var l = t;
        var y = s;
        var k = y.flags;
        switch (y.tag) {
          case 22:
            Tc(l, y);
            if (k & 2048) {
              um(y.alternate, y);
            }
            break;
          case 24:
            Tc(l, y);
            if (k & 2048) {
              dm(y.alternate, y);
            }
            break;
          default:
            Tc(l, y);
        }
        s = s.sibling;
      }
    }
  }
  var kc = 8192;
  function pl(t, s, l) {
    if (t.subtreeFlags & kc) {
      for (t = t.child; t !== null;) {
        e0(t, s, l);
        t = t.sibling;
      }
    }
  }
  function e0(t, s, l) {
    switch (t.tag) {
      case 26:
        pl(t, s, l);
        if (t.flags & kc && t.memoizedState !== null) {
          qT(l, Ds, t.memoizedState, t.memoizedProps);
        }
        break;
      case 5:
        pl(t, s, l);
        break;
      case 3:
      case 4:
        var y = Ds;
        Ds = Md(t.stateNode.containerInfo);
        pl(t, s, l);
        Ds = y;
        break;
      case 22:
        if (t.memoizedState === null) {
          y = t.alternate;
          if (y !== null && y.memoizedState !== null) {
            y = kc;
            kc = 16777216;
            pl(t, s, l);
            kc = y;
          } else {
            pl(t, s, l);
          }
        }
        break;
      default:
        pl(t, s, l);
    }
  }
  function t0(t) {
    var s = t.alternate;
    if (s !== null && (t = s.child, t !== null)) {
      s.child = null;
      do {
        s = t.sibling;
        t.sibling = null;
        t = s;
      } while (t !== null);
    }
  }
  function Ac(t) {
    var s = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (s !== null) {
        for (var l = 0; l < s.length; l++) {
          var y = s[l];
          lr = y;
          r0(y, t);
        }
      }
      t0(t);
    }
    if (t.subtreeFlags & 10256) {
      for (t = t.child; t !== null;) {
        n0(t);
        t = t.sibling;
      }
    }
  }
  function n0(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Ac(t);
        if (t.flags & 2048) {
          oo(9, t, t.return);
        }
        break;
      case 3:
        Ac(t);
        break;
      case 12:
        Ac(t);
        break;
      case 22:
        var s = t.stateNode;
        if (t.memoizedState !== null && s._visibility & 2 && (t.return === null || t.return.tag !== 13)) {
          s._visibility &= -3;
          vd(t);
        } else {
          Ac(t);
        }
        break;
      default:
        Ac(t);
    }
  }
  function vd(t) {
    var s = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (s !== null) {
        for (var l = 0; l < s.length; l++) {
          var y = s[l];
          lr = y;
          r0(y, t);
        }
      }
      t0(t);
    }
    for (t = t.child; t !== null;) {
      s = t;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          oo(8, s, s.return);
          vd(s);
          break;
        case 22:
          l = s.stateNode;
          if (l._visibility & 2) {
            l._visibility &= -3;
            vd(s);
          }
          break;
        default:
          vd(s);
      }
      t = t.sibling;
    }
  }
  function r0(t, s) {
    while (lr !== null) {
      var l = lr;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          oo(8, l, s);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var y = l.memoizedState.cachePool.pool;
            if (y != null) {
              y.refCount++;
            }
          }
          break;
        case 24:
          fc(l.memoizedState.cache);
      }
      y = l.child;
      if (y !== null) {
        y.return = l;
        lr = y;
      } else {
        e: for (l = t; lr !== null;) {
          y = lr;
          var k = y.sibling;
          var O = y.return;
          G_(y);
          if (y === l) {
            lr = null;
            break e;
          }
          if (k !== null) {
            k.return = O;
            lr = k;
            break e;
          }
          lr = O;
        }
      }
    }
  }
  var aT = {
    getCacheForType: function (t) {
      var s = mr(Xn);
      var l = s.data.get(t);
      if (l === undefined) {
        l = t();
        s.data.set(t, l);
      }
      return l;
    },
    cacheSignal: function () {
      return mr(Xn).controller.signal;
    }
  };
  var lT = typeof WeakMap == "function" ? WeakMap : Map;
  var cn = 0;
  var wn = null;
  var Ut = null;
  var qt = 0;
  var pn = 0;
  var rs = null;
  var ao = false;
  var ml = false;
  var fm = false;
  var Ri = 0;
  var Nn = 0;
  var lo = 0;
  var pa = 0;
  var hm = 0;
  var ss = 0;
  var gl = 0;
  var Mc = null;
  var Hr = null;
  var pm = false;
  var bd = 0;
  var s0 = 0;
  var yd = Infinity;
  var _d = null;
  var co = null;
  var nr = 0;
  var uo = null;
  var vl = null;
  var Ti = 0;
  var mm = 0;
  var gm = null;
  var i0 = null;
  var Oc = 0;
  var vm = null;
  function is() {
    if ((cn & 2) !== 0 && qt !== 0) {
      return qt & -qt;
    } else if (G.T !== null) {
      return xm();
    } else {
      return Zt();
    }
  }
  function o0() {
    if (ss === 0) {
      if ((qt & 536870912) === 0 || Qt) {
        var t = Ye;
        Ye <<= 1;
        if ((Ye & 3932160) === 0) {
          Ye = 262144;
        }
        ss = t;
      } else {
        ss = 536870912;
      }
    }
    t = ts.current;
    if (t !== null) {
      t.flags |= 32;
    }
    return ss;
  }
  function Fr(t, s, l) {
    if (t === wn && (pn === 2 || pn === 9) || t.cancelPendingCommit !== null) {
      bl(t, 0);
      fo(t, qt, ss, false);
    }
    et(t, l);
    if ((cn & 2) === 0 || t !== wn) {
      if (t === wn) {
        if ((cn & 2) === 0) {
          pa |= l;
        }
        if (Nn === 4) {
          fo(t, qt, ss, false);
        }
      }
      Ks(t);
    }
  }
  function a0(t, s, l) {
    if ((cn & 6) !== 0) {
      throw Error(i(327));
    }
    var y = !l && (s & 127) === 0 && (s & t.expiredLanes) === 0 || Ke(t, s);
    var k = y ? dT(t, s) : ym(t, s, true);
    var O = y;
    do {
      if (k === 0) {
        if (ml && !y) {
          fo(t, s, 0, false);
        }
        break;
      } else {
        l = t.current.alternate;
        if (O && !cT(l)) {
          k = ym(t, s, false);
          O = false;
          continue;
        }
        if (k === 2) {
          O = s;
          if (t.errorRecoveryDisabledLanes & O) {
            var K = 0;
          } else {
            K = t.pendingLanes & -536870913;
            K = K !== 0 ? K : K & 536870912 ? 536870912 : 0;
          }
          if (K !== 0) {
            s = K;
            e: {
              var le = t;
              k = Mc;
              var we = le.current.memoizedState.isDehydrated;
              if (we) {
                bl(le, K).flags |= 256;
              }
              K = ym(le, K, false);
              if (K !== 2) {
                if (fm && !we) {
                  le.errorRecoveryDisabledLanes |= O;
                  pa |= O;
                  k = 4;
                  break e;
                }
                O = Hr;
                Hr = k;
                if (O !== null) {
                  if (Hr === null) {
                    Hr = O;
                  } else {
                    Hr.push.apply(Hr, O);
                  }
                }
              }
              k = K;
            }
            O = false;
            if (k !== 2) {
              continue;
            }
          }
        }
        if (k === 1) {
          bl(t, 0);
          fo(t, s, 0, true);
          break;
        }
        e: {
          y = t;
          O = k;
          switch (O) {
            case 0:
            case 1:
              throw Error(i(345));
            case 4:
              if ((s & 4194048) !== s) {
                break;
              }
            case 6:
              fo(y, s, ss, !ao);
              break e;
            case 2:
              Hr = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(i(329));
          }
          if ((s & 62914560) === s && (k = bd + 300 - _e(), k > 10)) {
            fo(y, s, ss, !ao);
            if (ft(y, 0, true) !== 0) {
              break e;
            }
            Ti = s;
            y.timeoutHandle = N0(l0.bind(null, y, l, Hr, _d, pm, s, ss, pa, gl, ao, O, "Throttled", -0, 0), k);
            break e;
          }
          l0(y, l, Hr, _d, pm, s, ss, pa, gl, ao, O, null, -0, 0);
        }
      }
      break;
    } while (true);
    Ks(t);
  }
  function l0(t, s, l, y, k, O, K, le, we, Ae, Le, He, Oe, De) {
    t.timeoutHandle = -1;
    He = s.subtreeFlags;
    if (He & 8192 || (He & 16785408) === 16785408) {
      He = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: true,
        waitingForViewTransition: false,
        unsuspend: Qr
      };
      e0(s, O, He);
      var at = (O & 62914560) === O ? bd - _e() : (O & 4194048) === O ? s0 - _e() : 0;
      at = GT(He, at);
      if (at !== null) {
        Ti = O;
        t.cancelPendingCommit = at(g0.bind(null, t, s, O, l, y, k, K, le, we, Le, He, null, Oe, De));
        fo(t, O, K, !Ae);
        return;
      }
    }
    g0(t, s, O, l, y, k, K, le, we);
  }
  function cT(t) {
    var s = t;
    for (;;) {
      var l = s.tag;
      if ((l === 0 || l === 11 || l === 15) && s.flags & 16384 && (l = s.updateQueue, l !== null && (l = l.stores, l !== null))) {
        for (var y = 0; y < l.length; y++) {
          var k = l[y];
          var O = k.getSnapshot;
          k = k.value;
          try {
            if (!Jr(O(), k)) {
              return false;
            }
          } catch {
            return false;
          }
        }
      }
      l = s.child;
      if (s.subtreeFlags & 16384 && l !== null) {
        l.return = s;
        s = l;
      } else {
        if (s === t) {
          break;
        }
        while (s.sibling === null) {
          if (s.return === null || s.return === t) {
            return true;
          }
          s = s.return;
        }
        s.sibling.return = s.return;
        s = s.sibling;
      }
    }
    return true;
  }
  function fo(t, s, l, y) {
    s &= ~hm;
    s &= ~pa;
    t.suspendedLanes |= s;
    t.pingedLanes &= ~s;
    if (y) {
      t.warmLanes |= s;
    }
    y = t.expirationTimes;
    for (var k = s; k > 0;) {
      var O = 31 - dt(k);
      var K = 1 << O;
      y[O] = -1;
      k &= ~K;
    }
    if (l !== 0) {
      xt(t, l, s);
    }
  }
  function wd() {
    if ((cn & 6) === 0) {
      Dc(0);
      return false;
    } else {
      return true;
    }
  }
  function bm() {
    if (Ut !== null) {
      if (pn === 0) {
        var t = Ut.return;
      } else {
        t = Ut;
        gi = ia = null;
        Lp(t);
        ll = null;
        pc = 0;
        t = Ut;
      }
      while (t !== null) {
        j_(t.alternate, t);
        t = t.return;
      }
      Ut = null;
    }
  }
  function bl(t, s) {
    var l = t.timeoutHandle;
    if (l !== -1) {
      t.timeoutHandle = -1;
      AT(l);
    }
    l = t.cancelPendingCommit;
    if (l !== null) {
      t.cancelPendingCommit = null;
      l();
    }
    Ti = 0;
    bm();
    wn = t;
    Ut = l = pi(t.current, null);
    qt = s;
    pn = 0;
    rs = null;
    ao = false;
    ml = Ke(t, s);
    fm = false;
    gl = ss = hm = pa = lo = Nn = 0;
    Hr = Mc = null;
    pm = false;
    if ((s & 8) !== 0) {
      s |= s & 32;
    }
    var y = t.entangledLanes;
    if (y !== 0) {
      t = t.entanglements;
      y &= s;
      while (y > 0) {
        var k = 31 - dt(y);
        var O = 1 << k;
        s |= t[k];
        y &= ~O;
      }
    }
    Ri = s;
    Uu();
    return l;
  }
  function c0(t, s) {
    Lt = null;
    G.H = Sc;
    if (s === al || s === Ku) {
      s = Ey();
      pn = 3;
    } else if (s === Sp) {
      s = Ey();
      pn = 4;
    } else {
      pn = s === Kp ? 8 : s !== null && typeof s == "object" && typeof s.then == "function" ? 6 : 1;
    }
    rs = s;
    if (Ut === null) {
      Nn = 1;
      ud(t, hs(s, t.current));
    }
  }
  function u0() {
    var t = ts.current;
    if (t === null) {
      return true;
    } else if ((qt & 4194048) === qt) {
      return vs === null;
    } else if ((qt & 62914560) === qt || (qt & 536870912) !== 0) {
      return t === vs;
    } else {
      return false;
    }
  }
  function d0() {
    var t = G.H;
    G.H = Sc;
    if (t === null) {
      return Sc;
    } else {
      return t;
    }
  }
  function f0() {
    var t = G.A;
    G.A = aT;
    return t;
  }
  function Sd() {
    Nn = 4;
    if (!ao && ((qt & 4194048) === qt || ts.current === null)) {
      ml = true;
    }
    if (((lo & 134217727) !== 0 || (pa & 134217727) !== 0) && wn !== null) {
      fo(wn, qt, ss, false);
    }
  }
  function ym(t, s, l) {
    var y = cn;
    cn |= 2;
    var k = d0();
    var O = f0();
    if (wn !== t || qt !== s) {
      _d = null;
      bl(t, s);
    }
    s = false;
    var K = Nn;
    e: do {
      try {
        if (pn !== 0 && Ut !== null) {
          var le = Ut;
          var we = rs;
          switch (pn) {
            case 8:
              bm();
              K = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              if (ts.current === null) {
                s = true;
              }
              var Ae = pn;
              pn = 0;
              rs = null;
              yl(t, le, we, Ae);
              if (l && ml) {
                K = 0;
                break e;
              }
              break;
            default:
              Ae = pn;
              pn = 0;
              rs = null;
              yl(t, le, we, Ae);
          }
        }
        uT();
        K = Nn;
        break;
      } catch (Le) {
        c0(t, Le);
      }
    } while (true);
    if (s) {
      t.shellSuspendCounter++;
    }
    gi = ia = null;
    cn = y;
    G.H = k;
    G.A = O;
    if (Ut === null) {
      wn = null;
      qt = 0;
      Uu();
    }
    return K;
  }
  function uT() {
    while (Ut !== null) {
      h0(Ut);
    }
  }
  function dT(t, s) {
    var l = cn;
    cn |= 2;
    var y = d0();
    var k = f0();
    if (wn !== t || qt !== s) {
      _d = null;
      yd = _e() + 500;
      bl(t, s);
    } else {
      ml = Ke(t, s);
    }
    e: do {
      try {
        if (pn !== 0 && Ut !== null) {
          s = Ut;
          var O = rs;
          t: switch (pn) {
            case 1:
              pn = 0;
              rs = null;
              yl(t, s, O, 1);
              break;
            case 2:
            case 9:
              if (xy(O)) {
                pn = 0;
                rs = null;
                p0(s);
                break;
              }
              s = function () {
                if ((pn === 2 || pn === 9) && wn === t) {
                  pn = 7;
                }
                Ks(t);
              };
              O.then(s, s);
              break e;
            case 3:
              pn = 7;
              break e;
            case 4:
              pn = 5;
              break e;
            case 7:
              if (xy(O)) {
                pn = 0;
                rs = null;
                p0(s);
              } else {
                pn = 0;
                rs = null;
                yl(t, s, O, 7);
              }
              break;
            case 5:
              var K = null;
              switch (Ut.tag) {
                case 26:
                  K = Ut.memoizedState;
                case 5:
                case 27:
                  var le = Ut;
                  if (K ? J0(K) : le.stateNode.complete) {
                    pn = 0;
                    rs = null;
                    var we = le.sibling;
                    if (we !== null) {
                      Ut = we;
                    } else {
                      var Ae = le.return;
                      if (Ae !== null) {
                        Ut = Ae;
                        xd(Ae);
                      } else {
                        Ut = null;
                      }
                    }
                    break t;
                  }
              }
              pn = 0;
              rs = null;
              yl(t, s, O, 5);
              break;
            case 6:
              pn = 0;
              rs = null;
              yl(t, s, O, 6);
              break;
            case 8:
              bm();
              Nn = 6;
              break e;
            default:
              throw Error(i(462));
          }
        }
        fT();
        break;
      } catch (Le) {
        c0(t, Le);
      }
    } while (true);
    gi = ia = null;
    G.H = y;
    G.A = k;
    cn = l;
    if (Ut !== null) {
      return 0;
    } else {
      wn = null;
      qt = 0;
      Uu();
      return Nn;
    }
  }
  function fT() {
    while (Ut !== null && !pe()) {
      h0(Ut);
    }
  }
  function h0(t) {
    var s = z_(t.alternate, t, Ri);
    t.memoizedProps = t.pendingProps;
    if (s === null) {
      xd(t);
    } else {
      Ut = s;
    }
  }
  function p0(t) {
    var s = t;
    var l = s.alternate;
    switch (s.tag) {
      case 15:
      case 0:
        s = O_(l, s, s.pendingProps, s.type, undefined, qt);
        break;
      case 11:
        s = O_(l, s, s.pendingProps, s.type.render, s.ref, qt);
        break;
      case 5:
        Lp(s);
      default:
        j_(l, s);
        s = Ut = fy(s, Ri);
        s = z_(l, s, Ri);
    }
    t.memoizedProps = t.pendingProps;
    if (s === null) {
      xd(t);
    } else {
      Ut = s;
    }
  }
  function yl(t, s, l, y) {
    gi = ia = null;
    Lp(s);
    ll = null;
    pc = 0;
    var k = s.return;
    try {
      if (eT(t, k, s, l, qt)) {
        Nn = 1;
        ud(t, hs(l, t.current));
        Ut = null;
        return;
      }
    } catch (O) {
      if (k !== null) {
        Ut = k;
        throw O;
      }
      Nn = 1;
      ud(t, hs(l, t.current));
      Ut = null;
      return;
    }
    if (s.flags & 32768) {
      if (Qt || y === 1) {
        t = true;
      } else if (ml || (qt & 536870912) !== 0) {
        t = false;
      } else {
        ao = t = true;
        if (y === 2 || y === 9 || y === 3 || y === 6) {
          y = ts.current;
          if (y !== null && y.tag === 13) {
            y.flags |= 16384;
          }
        }
      }
      m0(s, t);
    } else {
      xd(s);
    }
  }
  function xd(t) {
    var s = t;
    do {
      if ((s.flags & 32768) !== 0) {
        m0(s, ao);
        return;
      }
      t = s.return;
      var l = rT(s.alternate, s, Ri);
      if (l !== null) {
        Ut = l;
        return;
      }
      s = s.sibling;
      if (s !== null) {
        Ut = s;
        return;
      }
      Ut = s = t;
    } while (s !== null);
    if (Nn === 0) {
      Nn = 5;
    }
  }
  function m0(t, s) {
    do {
      var l = sT(t.alternate, t);
      if (l !== null) {
        l.flags &= 32767;
        Ut = l;
        return;
      }
      l = t.return;
      if (l !== null) {
        l.flags |= 32768;
        l.subtreeFlags = 0;
        l.deletions = null;
      }
      if (!s && (t = t.sibling, t !== null)) {
        Ut = t;
        return;
      }
      Ut = t = l;
    } while (t !== null);
    Nn = 6;
    Ut = null;
  }
  function g0(t, s, l, y, k, O, K, le, we) {
    t.cancelPendingCommit = null;
    do {
      Cd();
    } while (nr !== 0);
    if ((cn & 6) !== 0) {
      throw Error(i(327));
    }
    if (s !== null) {
      if (s === t.current) {
        throw Error(i(177));
      }
      O = s.lanes | s.childLanes;
      O |= ap;
      Wt(t, l, O, K, le, we);
      if (t === wn) {
        Ut = wn = null;
        qt = 0;
      }
      vl = s;
      uo = t;
      Ti = l;
      mm = O;
      gm = k;
      i0 = y;
      if ((s.subtreeFlags & 10256) !== 0 || (s.flags & 10256) !== 0) {
        t.callbackNode = null;
        t.callbackPriority = 0;
        gT(ve, function () {
          w0();
          return null;
        });
      } else {
        t.callbackNode = null;
        t.callbackPriority = 0;
      }
      y = (s.flags & 13878) !== 0;
      if ((s.subtreeFlags & 13878) !== 0 || y) {
        y = G.T;
        G.T = null;
        k = q.p;
        q.p = 2;
        K = cn;
        cn |= 4;
        try {
          iT(t, s, l);
        } finally {
          cn = K;
          q.p = k;
          G.T = y;
        }
      }
      nr = 1;
      v0();
      b0();
      y0();
    }
  }
  function v0() {
    if (nr === 1) {
      nr = 0;
      var t = uo;
      var s = vl;
      var l = (s.flags & 13878) !== 0;
      if ((s.subtreeFlags & 13878) !== 0 || l) {
        l = G.T;
        G.T = null;
        var y = q.p;
        q.p = 2;
        var k = cn;
        cn |= 4;
        try {
          Z_(s, t);
          var O = Om;
          var K = ry(t.containerInfo);
          var le = O.focusedElem;
          var we = O.selectionRange;
          if (K !== le && le && le.ownerDocument && ny(le.ownerDocument.documentElement, le)) {
            if (we !== null && np(le)) {
              var Ae = we.start;
              var Le = we.end;
              if (Le === undefined) {
                Le = Ae;
              }
              if ("selectionStart" in le) {
                le.selectionStart = Ae;
                le.selectionEnd = Math.min(Le, le.value.length);
              } else {
                var He = le.ownerDocument || document;
                var Oe = He && He.defaultView || window;
                if (Oe.getSelection) {
                  var De = Oe.getSelection();
                  var at = le.textContent.length;
                  var wt = Math.min(we.start, at);
                  var bn = we.end === undefined ? wt : Math.min(we.end, at);
                  if (!De.extend && wt > bn) {
                    K = bn;
                    bn = wt;
                    wt = K;
                  }
                  var Ee = ty(le, wt);
                  var xe = ty(le, bn);
                  if (Ee && xe && (De.rangeCount !== 1 || De.anchorNode !== Ee.node || De.anchorOffset !== Ee.offset || De.focusNode !== xe.node || De.focusOffset !== xe.offset)) {
                    var ke = He.createRange();
                    ke.setStart(Ee.node, Ee.offset);
                    De.removeAllRanges();
                    if (wt > bn) {
                      De.addRange(ke);
                      De.extend(xe.node, xe.offset);
                    } else {
                      ke.setEnd(xe.node, xe.offset);
                      De.addRange(ke);
                    }
                  }
                }
              }
            }
            He = [];
            De = le;
            while (De = De.parentNode) {
              if (De.nodeType === 1) {
                He.push({
                  element: De,
                  left: De.scrollLeft,
                  top: De.scrollTop
                });
              }
            }
            if (typeof le.focus == "function") {
              le.focus();
            }
            le = 0;
            for (; le < He.length; le++) {
              var Ne = He[le];
              Ne.element.scrollLeft = Ne.left;
              Ne.element.scrollTop = Ne.top;
            }
          }
          Bd = !!Mm;
          Om = Mm = null;
        } finally {
          cn = k;
          q.p = y;
          G.T = l;
        }
      }
      t.current = s;
      nr = 2;
    }
  }
  function b0() {
    if (nr === 2) {
      nr = 0;
      var t = uo;
      var s = vl;
      var l = (s.flags & 8772) !== 0;
      if ((s.subtreeFlags & 8772) !== 0 || l) {
        l = G.T;
        G.T = null;
        var y = q.p;
        q.p = 2;
        var k = cn;
        cn |= 4;
        try {
          q_(t, s.alternate, s);
        } finally {
          cn = k;
          q.p = y;
          G.T = l;
        }
      }
      nr = 3;
    }
  }
  function y0() {
    if (nr === 4 || nr === 3) {
      nr = 0;
      Se();
      var t = uo;
      var s = vl;
      var l = Ti;
      var y = i0;
      if ((s.subtreeFlags & 10256) !== 0 || (s.flags & 10256) !== 0) {
        nr = 5;
      } else {
        nr = 0;
        vl = uo = null;
        _0(t, t.pendingLanes);
      }
      var k = t.pendingLanes;
      if (k === 0) {
        co = null;
      }
      ht(l);
      s = s.stateNode;
      if (We && typeof We.onCommitFiberRoot == "function") {
        try {
          We.onCommitFiberRoot(Ue, s, undefined, (s.current.flags & 128) === 128);
        } catch {}
      }
      if (y !== null) {
        s = G.T;
        k = q.p;
        q.p = 2;
        G.T = null;
        try {
          var O = t.onRecoverableError;
          for (var K = 0; K < y.length; K++) {
            var le = y[K];
            O(le.value, {
              componentStack: le.stack
            });
          }
        } finally {
          G.T = s;
          q.p = k;
        }
      }
      if ((Ti & 3) !== 0) {
        Cd();
      }
      Ks(t);
      k = t.pendingLanes;
      if ((l & 261930) !== 0 && (k & 42) !== 0) {
        if (t === vm) {
          Oc++;
        } else {
          Oc = 0;
          vm = t;
        }
      } else {
        Oc = 0;
      }
      Dc(0);
    }
  }
  function _0(t, s) {
    if ((t.pooledCacheLanes &= s) === 0) {
      s = t.pooledCache;
      if (s != null) {
        t.pooledCache = null;
        fc(s);
      }
    }
  }
  function Cd() {
    v0();
    b0();
    y0();
    return w0();
  }
  function w0() {
    if (nr !== 5) {
      return false;
    }
    var t = uo;
    var s = mm;
    mm = 0;
    var l = ht(Ti);
    var y = G.T;
    var k = q.p;
    try {
      q.p = l < 32 ? 32 : l;
      G.T = null;
      l = gm;
      gm = null;
      var O = uo;
      var K = Ti;
      nr = 0;
      vl = uo = null;
      Ti = 0;
      if ((cn & 6) !== 0) {
        throw Error(i(331));
      }
      var le = cn;
      cn |= 4;
      n0(O.current);
      J_(O, O.current, K, l);
      cn = le;
      Dc(0, false);
      if (We && typeof We.onPostCommitFiberRoot == "function") {
        try {
          We.onPostCommitFiberRoot(Ue, O);
        } catch {}
      }
      return true;
    } finally {
      q.p = k;
      G.T = y;
      _0(t, s);
    }
  }
  function S0(t, s, l) {
    s = hs(l, s);
    s = Xp(t.stateNode, s, 2);
    t = ro(t, s, 2);
    if (t !== null) {
      et(t, 2);
      Ks(t);
    }
  }
  function mn(t, s, l) {
    if (t.tag === 3) {
      S0(t, t, l);
    } else {
      while (s !== null) {
        if (s.tag === 3) {
          S0(s, t, l);
          break;
        } else if (s.tag === 1) {
          var y = s.stateNode;
          if (typeof s.type.getDerivedStateFromError == "function" || typeof y.componentDidCatch == "function" && (co === null || !co.has(y))) {
            t = hs(l, t);
            l = x_(2);
            y = ro(s, l, 2);
            if (y !== null) {
              C_(l, y, s, t);
              et(y, 2);
              Ks(y);
            }
            break;
          }
        }
        s = s.return;
      }
    }
  }
  function _m(t, s, l) {
    var y = t.pingCache;
    if (y === null) {
      y = t.pingCache = new lT();
      var k = new Set();
      y.set(s, k);
    } else {
      k = y.get(s);
      if (k === undefined) {
        k = new Set();
        y.set(s, k);
      }
    }
    if (!k.has(l)) {
      fm = true;
      k.add(l);
      t = hT.bind(null, t, s, l);
      s.then(t, t);
    }
  }
  function hT(t, s, l) {
    var y = t.pingCache;
    if (y !== null) {
      y.delete(s);
    }
    t.pingedLanes |= t.suspendedLanes & l;
    t.warmLanes &= ~l;
    if (wn === t && (qt & l) === l) {
      if (Nn === 4 || Nn === 3 && (qt & 62914560) === qt && _e() - bd < 300) {
        if ((cn & 2) === 0) {
          bl(t, 0);
        }
      } else {
        hm |= l;
      }
      if (gl === qt) {
        gl = 0;
      }
    }
    Ks(t);
  }
  function x0(t, s) {
    if (s === 0) {
      s = St();
    }
    t = na(t, s);
    if (t !== null) {
      et(t, s);
      Ks(t);
    }
  }
  function pT(t) {
    var s = t.memoizedState;
    var l = 0;
    if (s !== null) {
      l = s.retryLane;
    }
    x0(t, l);
  }
  function mT(t, s) {
    var l = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var y = t.stateNode;
        var k = t.memoizedState;
        if (k !== null) {
          l = k.retryLane;
        }
        break;
      case 19:
        y = t.stateNode;
        break;
      case 22:
        y = t.stateNode._retryCache;
        break;
      default:
        throw Error(i(314));
    }
    if (y !== null) {
      y.delete(s);
    }
    x0(t, l);
  }
  function gT(t, s) {
    return he(t, s);
  }
  var Ed = null;
  var _l = null;
  var wm = false;
  var Rd = false;
  var Sm = false;
  var ho = 0;
  function Ks(t) {
    if (t !== _l && t.next === null) {
      if (_l === null) {
        Ed = _l = t;
      } else {
        _l = _l.next = t;
      }
    }
    Rd = true;
    if (!wm) {
      wm = true;
      bT();
    }
  }
  function Dc(t, s) {
    if (!Sm && Rd) {
      Sm = true;
      do {
        for (var l = false, y = Ed; y !== null;) {
          if (t !== 0) {
            var k = y.pendingLanes;
            if (k === 0) {
              var O = 0;
            } else {
              var K = y.suspendedLanes;
              var le = y.pingedLanes;
              O = (1 << 31 - dt(t | 42) + 1) - 1;
              O &= k & ~(K & ~le);
              O = O & 201326741 ? O & 201326741 | 1 : O ? O | 2 : 0;
            }
            if (O !== 0) {
              l = true;
              T0(y, O);
            }
          } else {
            O = qt;
            O = ft(y, y === wn ? O : 0, y.cancelPendingCommit !== null || y.timeoutHandle !== -1);
            if ((O & 3) !== 0 && !Ke(y, O)) {
              l = true;
              T0(y, O);
            }
          }
          y = y.next;
        }
      } while (l);
      Sm = false;
    }
  }
  function vT() {
    C0();
  }
  function C0() {
    Rd = wm = false;
    var t = 0;
    if (ho !== 0 && kT()) {
      t = ho;
    }
    var s = _e();
    for (var l = null, y = Ed; y !== null;) {
      var k = y.next;
      var O = E0(y, s);
      if (O === 0) {
        y.next = null;
        if (l === null) {
          Ed = k;
        } else {
          l.next = k;
        }
        if (k === null) {
          _l = l;
        }
      } else {
        l = y;
        if (t !== 0 || (O & 3) !== 0) {
          Rd = true;
        }
      }
      y = k;
    }
    if (nr === 0 || nr === 5) {
      Dc(t);
    }
    if (ho !== 0) {
      ho = 0;
    }
  }
  function E0(t, s) {
    var l = t.suspendedLanes;
    var y = t.pingedLanes;
    var k = t.expirationTimes;
    for (var O = t.pendingLanes & -62914561; O > 0;) {
      var K = 31 - dt(O);
      var le = 1 << K;
      var we = k[K];
      if (we === -1) {
        if ((le & l) === 0 || (le & y) !== 0) {
          k[K] = en(le, s);
        }
      } else if (we <= s) {
        t.expiredLanes |= le;
      }
      O &= ~le;
    }
    s = wn;
    l = qt;
    l = ft(t, t === s ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1);
    y = t.callbackNode;
    if (l === 0 || t === s && (pn === 2 || pn === 9) || t.cancelPendingCommit !== null) {
      if (y !== null && y !== null) {
        ye(y);
      }
      t.callbackNode = null;
      return t.callbackPriority = 0;
    }
    if ((l & 3) === 0 || Ke(t, l)) {
      s = l & -l;
      if (s === t.callbackPriority) {
        return s;
      }
      if (y !== null) {
        ye(y);
      }
      switch (ht(l)) {
        case 2:
        case 8:
          l = be;
          break;
        case 32:
          l = ve;
          break;
        case 268435456:
          l = Re;
          break;
        default:
          l = ve;
      }
      y = R0.bind(null, t);
      l = he(l, y);
      t.callbackPriority = s;
      t.callbackNode = l;
      return s;
    }
    if (y !== null && y !== null) {
      ye(y);
    }
    t.callbackPriority = 2;
    t.callbackNode = null;
    return 2;
  }
  function R0(t, s) {
    if (nr !== 0 && nr !== 5) {
      t.callbackNode = null;
      t.callbackPriority = 0;
      return null;
    }
    var l = t.callbackNode;
    if (Cd() && t.callbackNode !== l) {
      return null;
    }
    var y = qt;
    y = ft(t, t === wn ? y : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1);
    if (y === 0) {
      return null;
    } else {
      a0(t, y, s);
      E0(t, _e());
      if (t.callbackNode != null && t.callbackNode === l) {
        return R0.bind(null, t);
      } else {
        return null;
      }
    }
  }
  function T0(t, s) {
    if (Cd()) {
      return null;
    }
    a0(t, s, true);
  }
  function bT() {
    MT(function () {
      if ((cn & 6) !== 0) {
        he(te, vT);
      } else {
        C0();
      }
    });
  }
  function xm() {
    if (ho === 0) {
      var t = il;
      if (t === 0) {
        t = Ge;
        Ge <<= 1;
        if ((Ge & 261888) === 0) {
          Ge = 256;
        }
      }
      ho = t;
    }
    return ho;
  }
  function k0(t) {
    if (t == null || typeof t == "symbol" || typeof t == "boolean") {
      return null;
    } else if (typeof t == "function") {
      return t;
    } else {
      return Ki("" + t);
    }
  }
  function A0(t, s) {
    var l = s.ownerDocument.createElement("input");
    l.name = s.name;
    l.value = s.value;
    if (t.id) {
      l.setAttribute("form", t.id);
    }
    s.parentNode.insertBefore(l, s);
    t = new FormData(t);
    l.parentNode.removeChild(l);
    return t;
  }
  function yT(t, s, l, y, k) {
    if (s === "submit" && l && l.stateNode === k) {
      var O = k0((k[sn] || null).action);
      var K = y.submitter;
      if (K) {
        s = (s = K[sn] || null) ? k0(s.formAction) : K.getAttribute("formAction");
        if (s !== null) {
          O = s;
          K = null;
        }
      }
      var le = new qa("action", "action", null, y, k);
      t.push({
        event: le,
        listeners: [{
          instance: null,
          listener: function () {
            if (y.defaultPrevented) {
              if (ho !== 0) {
                var we = K ? A0(k, K) : new FormData(k);
                Vp(l, {
                  pending: true,
                  data: we,
                  method: k.method,
                  action: O
                }, null, we);
              }
            } else if (typeof O == "function") {
              le.preventDefault();
              we = K ? A0(k, K) : new FormData(k);
              Vp(l, {
                pending: true,
                data: we,
                method: k.method,
                action: O
              }, O, we);
            }
          },
          currentTarget: k
        }]
      });
    }
  }
  for (var Cm = 0; Cm < op.length; Cm++) {
    var Em = op[Cm];
    var _T = Em.toLowerCase();
    var wT = Em[0].toUpperCase() + Em.slice(1);
    Os(_T, "on" + wT);
  }
  Os(oy, "onAnimationEnd");
  Os(ay, "onAnimationIteration");
  Os(ly, "onAnimationStart");
  Os("dblclick", "onDoubleClick");
  Os("focusin", "onFocus");
  Os("focusout", "onBlur");
  Os(z2, "onTransitionRun");
  Os(N2, "onTransitionStart");
  Os(j2, "onTransitionCancel");
  Os(cy, "onTransitionEnd");
  Ts("onMouseEnter", ["mouseout", "mouseover"]);
  Ts("onMouseLeave", ["mouseout", "mouseover"]);
  Ts("onPointerEnter", ["pointerout", "pointerover"]);
  Ts("onPointerLeave", ["pointerout", "pointerover"]);
  Gn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
  Gn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
  Gn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
  Gn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
  Gn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
  Gn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Ic = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
  var ST = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ic));
  function M0(t, s) {
    s = (s & 4) !== 0;
    for (var l = 0; l < t.length; l++) {
      var y = t[l];
      var k = y.event;
      y = y.listeners;
      e: {
        var O = undefined;
        if (s) {
          for (var K = y.length - 1; K >= 0; K--) {
            var le = y[K];
            var we = le.instance;
            var Ae = le.currentTarget;
            le = le.listener;
            if (we !== O && k.isPropagationStopped()) {
              break e;
            }
            O = le;
            k.currentTarget = Ae;
            try {
              O(k);
            } catch (Le) {
              Fu(Le);
            }
            k.currentTarget = null;
            O = we;
          }
        } else {
          for (K = 0; K < y.length; K++) {
            le = y[K];
            we = le.instance;
            Ae = le.currentTarget;
            le = le.listener;
            if (we !== O && k.isPropagationStopped()) {
              break e;
            }
            O = le;
            k.currentTarget = Ae;
            try {
              O(k);
            } catch (Le) {
              Fu(Le);
            }
            k.currentTarget = null;
            O = we;
          }
        }
      }
    }
  }
  function Vt(t, s) {
    var l = s[Et];
    if (l === undefined) {
      l = s[Et] = new Set();
    }
    var y = t + "__bubble";
    if (!l.has(y)) {
      O0(s, t, 2, false);
      l.add(y);
    }
  }
  function Rm(t, s, l) {
    var y = 0;
    if (s) {
      y |= 4;
    }
    O0(l, t, y, s);
  }
  var Td = "_reactListening" + Math.random().toString(36).slice(2);
  function Tm(t) {
    if (!t[Td]) {
      t[Td] = true;
      Wo.forEach(function (l) {
        if (l !== "selectionchange") {
          if (!ST.has(l)) {
            Rm(l, false, t);
          }
          Rm(l, true, t);
        }
      });
      var s = t.nodeType === 9 ? t : t.ownerDocument;
      if (s !== null && !s[Td]) {
        s[Td] = true;
        Rm("selectionchange", false, s);
      }
    }
  }
  function O0(t, s, l, y) {
    switch (ow(s)) {
      case 2:
        var k = KT;
        break;
      case 8:
        k = ZT;
        break;
      default:
        k = Um;
    }
    l = k.bind(null, s, l, t);
    k = undefined;
    if (!!Cn && (s === "touchstart" || s === "touchmove" || s === "wheel")) {
      k = true;
    }
    if (y) {
      if (k !== undefined) {
        t.addEventListener(s, l, {
          capture: true,
          passive: k
        });
      } else {
        t.addEventListener(s, l, true);
      }
    } else if (k !== undefined) {
      t.addEventListener(s, l, {
        passive: k
      });
    } else {
      t.addEventListener(s, l, false);
    }
  }
  function km(t, s, l, y, k) {
    var O = y;
    if ((s & 1) === 0 && (s & 2) === 0 && y !== null) {
      e: while (true) {
        if (y === null) {
          return;
        }
        var K = y.tag;
        if (K === 3 || K === 4) {
          var le = y.stateNode.containerInfo;
          if (le === k) {
            break;
          }
          if (K === 4) {
            for (K = y.return; K !== null;) {
              var we = K.tag;
              if ((we === 3 || we === 4) && K.stateNode.containerInfo === k) {
                return;
              }
              K = K.return;
            }
          }
          while (le !== null) {
            K = Xr(le);
            if (K === null) {
              return;
            }
            we = K.tag;
            if (we === 5 || we === 6 || we === 26 || we === 27) {
              y = O = K;
              continue e;
            }
            le = le.parentNode;
          }
        }
        y = y.return;
      }
    }
    It(function () {
      var Ae = O;
      var Le = hi(l);
      var He = [];
      e: {
        var Oe = uy.get(t);
        if (Oe !== undefined) {
          var De = qa;
          var at = t;
          switch (t) {
            case "keypress":
              if (Zo(l) === 0) {
                break e;
              }
            case "keydown":
            case "keyup":
              De = vt;
              break;
            case "focusin":
              at = "focus";
              De = rc;
              break;
            case "focusout":
              at = "blur";
              De = rc;
              break;
            case "beforeblur":
            case "afterblur":
              De = rc;
              break;
            case "click":
              if (l.button === 2) {
                break e;
              }
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              De = Ya;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              De = Gh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              De = Mr;
              break;
            case oy:
            case ay:
            case ly:
              De = Kh;
              break;
            case cy:
              De = Yn;
              break;
            case "scroll":
            case "scrollend":
              De = qh;
              break;
            case "wheel":
              De = Qh;
              break;
            case "copy":
            case "cut":
            case "paste":
              De = zu;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              De = ot;
              break;
            case "toggle":
            case "beforetoggle":
              De = C2;
          }
          var wt = (s & 4) !== 0;
          var bn = !wt && (t === "scroll" || t === "scrollend");
          var Ee = wt ? Oe !== null ? Oe + "Capture" : null : Oe;
          wt = [];
          for (var xe = Ae, ke; xe !== null;) {
            var Ne = xe;
            ke = Ne.stateNode;
            Ne = Ne.tag;
            if ((Ne === 5 || Ne === 26 || Ne === 27) && ke !== null && Ee !== null) {
              Ne = Nt(xe, Ee);
              if (Ne != null) {
                wt.push(Lc(xe, Ne, ke));
              }
            }
            if (bn) {
              break;
            }
            xe = xe.return;
          }
          if (wt.length > 0) {
            Oe = new De(Oe, at, null, l, Le);
            He.push({
              event: Oe,
              listeners: wt
            });
          }
        }
      }
      if ((s & 7) === 0) {
        e: {
          Oe = t === "mouseover" || t === "pointerover";
          De = t === "mouseout" || t === "pointerout";
          if (Oe && l !== Xo && (at = l.relatedTarget || l.fromElement) && (Xr(at) || at[zt])) {
            break e;
          }
          if ((De || Oe) && (Oe = Le.window === Le ? Le : (Oe = Le.ownerDocument) ? Oe.defaultView || Oe.parentWindow : window, De ? (at = l.relatedTarget || l.toElement, De = Ae, at = at ? Xr(at) : null, at !== null && (bn = u(at), wt = at.tag, at !== bn || wt !== 5 && wt !== 27 && wt !== 6) && (at = null)) : (De = null, at = Ae), De !== at)) {
            wt = Ya;
            Ne = "onMouseLeave";
            Ee = "onMouseEnter";
            xe = "mouse";
            if (t === "pointerout" || t === "pointerover") {
              wt = ot;
              Ne = "onPointerLeave";
              Ee = "onPointerEnter";
              xe = "pointer";
            }
            bn = De == null ? Oe : Tr(De);
            ke = at == null ? Oe : Tr(at);
            Oe = new wt(Ne, xe + "leave", De, l, Le);
            Oe.target = bn;
            Oe.relatedTarget = ke;
            Ne = null;
            if (Xr(Le) === Ae) {
              wt = new wt(Ee, xe + "enter", at, l, Le);
              wt.target = ke;
              wt.relatedTarget = bn;
              Ne = wt;
            }
            bn = Ne;
            if (De && at) {
              t: {
                wt = xT;
                Ee = De;
                xe = at;
                ke = 0;
                Ne = Ee;
                for (; Ne; Ne = wt(Ne)) {
                  ke++;
                }
                Ne = 0;
                for (var mt = xe; mt; mt = wt(mt)) {
                  Ne++;
                }
                while (ke - Ne > 0) {
                  Ee = wt(Ee);
                  ke--;
                }
                while (Ne - ke > 0) {
                  xe = wt(xe);
                  Ne--;
                }
                while (ke--) {
                  if (Ee === xe || xe !== null && Ee === xe.alternate) {
                    wt = Ee;
                    break t;
                  }
                  Ee = wt(Ee);
                  xe = wt(xe);
                }
                wt = null;
              }
            } else {
              wt = null;
            }
            if (De !== null) {
              D0(He, Oe, De, wt, false);
            }
            if (at !== null && bn !== null) {
              D0(He, bn, at, wt, true);
            }
          }
        }
        e: {
          Oe = Ae ? Tr(Ae) : window;
          De = Oe.nodeName && Oe.nodeName.toLowerCase();
          if (De === "select" || De === "input" && Oe.type === "file") {
            var on = Xb;
          } else if (Gb(Oe)) {
            if (Kb) {
              on = L2;
            } else {
              on = D2;
              var ut = O2;
            }
          } else {
            De = Oe.nodeName;
            if (!De || De.toLowerCase() !== "input" || Oe.type !== "checkbox" && Oe.type !== "radio") {
              if (Ae && fi(Ae.elementType)) {
                on = Xb;
              }
            } else {
              on = I2;
            }
          }
          if (on &&= on(t, Ae)) {
            Yb(He, on, l, Le);
            break e;
          }
          if (ut) {
            ut(t, Oe, Ae);
          }
          if (t === "focusout" && Ae && Oe.type === "number" && Ae.memoizedProps.value != null) {
            As(Oe, "number", Oe.value);
          }
        }
        ut = Ae ? Tr(Ae) : window;
        switch (t) {
          case "focusin":
            if (Gb(ut) || ut.contentEditable === "true") {
              Za = ut;
              rp = Ae;
              cc = null;
            }
            break;
          case "focusout":
            cc = rp = Za = null;
            break;
          case "mousedown":
            sp = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            sp = false;
            sy(He, l, Le);
            break;
          case "selectionchange":
            if (B2) {
              break;
            }
          case "keydown":
          case "keyup":
            sy(He, l, Le);
        }
        var Pt;
        if (Jh) {
          e: {
            switch (t) {
              case "compositionstart":
                var Gt = "onCompositionStart";
                break e;
              case "compositionend":
                Gt = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Gt = "onCompositionUpdate";
                break e;
            }
            Gt = undefined;
          }
        } else if (Ka) {
          if ($b(t, l)) {
            Gt = "onCompositionEnd";
          }
        } else if (t === "keydown" && l.keyCode === 229) {
          Gt = "onCompositionStart";
        }
        if (Gt) {
          if (Ub && l.locale !== "ko") {
            if (Ka || Gt !== "onCompositionStart") {
              if (Gt === "onCompositionEnd" && Ka) {
                Pt = Va();
              }
            } else {
              tr = Le;
              Br = "value" in tr ? tr.value : tr.textContent;
              Ka = true;
            }
          }
          ut = kd(Ae, Gt);
          if (ut.length > 0) {
            Gt = new sc(Gt, t, null, l, Le);
            He.push({
              event: Gt,
              listeners: ut
            });
            if (Pt) {
              Gt.data = Pt;
            } else {
              Pt = qb(l);
              if (Pt !== null) {
                Gt.data = Pt;
              }
            }
          }
        }
        if (Pt = R2 ? T2(t, l) : k2(t, l)) {
          Gt = kd(Ae, "onBeforeInput");
          if (Gt.length > 0) {
            ut = new sc("onBeforeInput", "beforeinput", null, l, Le);
            He.push({
              event: ut,
              listeners: Gt
            });
            ut.data = Pt;
          }
        }
        yT(He, t, Ae, l, Le);
      }
      M0(He, s);
    });
  }
  function Lc(t, s, l) {
    return {
      instance: t,
      listener: s,
      currentTarget: l
    };
  }
  function kd(t, s) {
    var l = s + "Capture";
    var y = [];
    for (; t !== null;) {
      var k = t;
      var O = k.stateNode;
      k = k.tag;
      if ((k === 5 || k === 26 || k === 27) && O !== null) {
        k = Nt(t, l);
        if (k != null) {
          y.unshift(Lc(t, k, O));
        }
        k = Nt(t, s);
        if (k != null) {
          y.push(Lc(t, k, O));
        }
      }
      if (t.tag === 3) {
        return y;
      }
      t = t.return;
    }
    return [];
  }
  function xT(t) {
    if (t === null) {
      return null;
    }
    do {
      t = t.return;
    } while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function D0(t, s, l, y, k) {
    var O = s._reactName;
    var K = [];
    for (; l !== null && l !== y;) {
      var le = l;
      var we = le.alternate;
      var Ae = le.stateNode;
      le = le.tag;
      if (we !== null && we === y) {
        break;
      }
      if ((le === 5 || le === 26 || le === 27) && Ae !== null) {
        we = Ae;
        if (k) {
          Ae = Nt(l, O);
          if (Ae != null) {
            K.unshift(Lc(l, Ae, we));
          }
        } else if (!k) {
          Ae = Nt(l, O);
          if (Ae != null) {
            K.push(Lc(l, Ae, we));
          }
        }
      }
      l = l.return;
    }
    if (K.length !== 0) {
      t.push({
        event: s,
        listeners: K
      });
    }
  }
  var CT = /\r\n?/g;
  var ET = /\u0000|\uFFFD/g;
  function I0(t) {
    return (typeof t == "string" ? t : "" + t).replace(CT, `
`).replace(ET, "");
  }
  function L0(t, s) {
    s = I0(s);
    return I0(t) === s;
  }
  function vn(t, s, l, y, k, O) {
    switch (l) {
      case "children":
        if (typeof y == "string") {
          if (s !== "body" && (s !== "textarea" || y !== "")) {
            Zr(t, y);
          }
        } else if ((typeof y == "number" || typeof y == "bigint") && s !== "body") {
          Zr(t, "" + y);
        }
        break;
      case "className":
        hr(t, "class", y);
        break;
      case "tabIndex":
        hr(t, "tabindex", y);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        hr(t, l, y);
        break;
      case "style":
        Xi(t, y, O);
        break;
      case "data":
        if (s !== "object") {
          hr(t, "data", y);
          break;
        }
      case "src":
      case "href":
        if (y === "" && (s !== "a" || l !== "href")) {
          t.removeAttribute(l);
          break;
        }
        if (y == null || typeof y == "function" || typeof y == "symbol" || typeof y == "boolean") {
          t.removeAttribute(l);
          break;
        }
        y = Ki("" + y);
        t.setAttribute(l, y);
        break;
      case "action":
      case "formAction":
        if (typeof y == "function") {
          t.setAttribute(l, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        } else if (typeof O == "function") {
          if (l === "formAction") {
            if (s !== "input") {
              vn(t, s, "name", k.name, k, null);
            }
            vn(t, s, "formEncType", k.formEncType, k, null);
            vn(t, s, "formMethod", k.formMethod, k, null);
            vn(t, s, "formTarget", k.formTarget, k, null);
          } else {
            vn(t, s, "encType", k.encType, k, null);
            vn(t, s, "method", k.method, k, null);
            vn(t, s, "target", k.target, k, null);
          }
        }
        if (y == null || typeof y == "symbol" || typeof y == "boolean") {
          t.removeAttribute(l);
          break;
        }
        y = Ki("" + y);
        t.setAttribute(l, y);
        break;
      case "onClick":
        if (y != null) {
          t.onclick = Qr;
        }
        break;
      case "onScroll":
        if (y != null) {
          Vt("scroll", t);
        }
        break;
      case "onScrollEnd":
        if (y != null) {
          Vt("scrollend", t);
        }
        break;
      case "dangerouslySetInnerHTML":
        if (y != null) {
          if (typeof y != "object" || !("__html" in y)) {
            throw Error(i(61));
          }
          l = y.__html;
          if (l != null) {
            if (k.children != null) {
              throw Error(i(60));
            }
            t.innerHTML = l;
          }
        }
        break;
      case "multiple":
        t.multiple = y && typeof y != "function" && typeof y != "symbol";
        break;
      case "muted":
        t.muted = y && typeof y != "function" && typeof y != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (y == null || typeof y == "function" || typeof y == "boolean" || typeof y == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        l = Ki("" + y);
        t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        if (y != null && typeof y != "function" && typeof y != "symbol") {
          t.setAttribute(l, "" + y);
        } else {
          t.removeAttribute(l);
        }
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        if (y && typeof y != "function" && typeof y != "symbol") {
          t.setAttribute(l, "");
        } else {
          t.removeAttribute(l);
        }
        break;
      case "capture":
      case "download":
        if (y === true) {
          t.setAttribute(l, "");
        } else if (y !== false && y != null && typeof y != "function" && typeof y != "symbol") {
          t.setAttribute(l, y);
        } else {
          t.removeAttribute(l);
        }
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        if (y != null && typeof y != "function" && typeof y != "symbol" && !isNaN(y) && y >= 1) {
          t.setAttribute(l, y);
        } else {
          t.removeAttribute(l);
        }
        break;
      case "rowSpan":
      case "start":
        if (y == null || typeof y == "function" || typeof y == "symbol" || isNaN(y)) {
          t.removeAttribute(l);
        } else {
          t.setAttribute(l, y);
        }
        break;
      case "popover":
        Vt("beforetoggle", t);
        Vt("toggle", t);
        di(t, "popover", y);
        break;
      case "xlinkActuate":
        kr(t, "http://www.w3.org/1999/xlink", "xlink:actuate", y);
        break;
      case "xlinkArcrole":
        kr(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", y);
        break;
      case "xlinkRole":
        kr(t, "http://www.w3.org/1999/xlink", "xlink:role", y);
        break;
      case "xlinkShow":
        kr(t, "http://www.w3.org/1999/xlink", "xlink:show", y);
        break;
      case "xlinkTitle":
        kr(t, "http://www.w3.org/1999/xlink", "xlink:title", y);
        break;
      case "xlinkType":
        kr(t, "http://www.w3.org/1999/xlink", "xlink:type", y);
        break;
      case "xmlBase":
        kr(t, "http://www.w3.org/XML/1998/namespace", "xml:base", y);
        break;
      case "xmlLang":
        kr(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", y);
        break;
      case "xmlSpace":
        kr(t, "http://www.w3.org/XML/1998/namespace", "xml:space", y);
        break;
      case "is":
        di(t, "is", y);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!(l.length > 2) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") {
          l = Yo.get(l) || l;
          di(t, l, y);
        }
    }
  }
  function Am(t, s, l, y, k, O) {
    switch (l) {
      case "style":
        Xi(t, y, O);
        break;
      case "dangerouslySetInnerHTML":
        if (y != null) {
          if (typeof y != "object" || !("__html" in y)) {
            throw Error(i(61));
          }
          l = y.__html;
          if (l != null) {
            if (k.children != null) {
              throw Error(i(60));
            }
            t.innerHTML = l;
          }
        }
        break;
      case "children":
        if (typeof y == "string") {
          Zr(t, y);
        } else if (typeof y == "number" || typeof y == "bigint") {
          Zr(t, "" + y);
        }
        break;
      case "onScroll":
        if (y != null) {
          Vt("scroll", t);
        }
        break;
      case "onScrollEnd":
        if (y != null) {
          Vt("scrollend", t);
        }
        break;
      case "onClick":
        if (y != null) {
          t.onclick = Qr;
        }
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!qn.hasOwnProperty(l)) {
          e: {
            if (l[0] === "o" && l[1] === "n" && (k = l.endsWith("Capture"), s = l.slice(2, k ? l.length - 7 : undefined), O = t[sn] || null, O = O != null ? O[l] : null, typeof O == "function" && t.removeEventListener(s, O, k), typeof y == "function")) {
              if (typeof O != "function" && O !== null) {
                if (l in t) {
                  t[l] = null;
                } else if (t.hasAttribute(l)) {
                  t.removeAttribute(l);
                }
              }
              t.addEventListener(s, y, k);
              break e;
            }
            if (l in t) {
              t[l] = y;
            } else if (y === true) {
              t.setAttribute(l, "");
            } else {
              di(t, l, y);
            }
          }
        }
    }
  }
  function vr(t, s, l) {
    switch (s) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Vt("error", t);
        Vt("load", t);
        var y = false;
        var k = false;
        var O;
        for (O in l) {
          if (l.hasOwnProperty(O)) {
            var K = l[O];
            if (K != null) {
              switch (O) {
                case "src":
                  y = true;
                  break;
                case "srcSet":
                  k = true;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(i(137, s));
                default:
                  vn(t, s, O, K, l, null);
              }
            }
          }
        }
        if (k) {
          vn(t, s, "srcSet", l.srcSet, l, null);
        }
        if (y) {
          vn(t, s, "src", l.src, l, null);
        }
        return;
      case "input":
        Vt("invalid", t);
        var le = O = K = k = null;
        var we = null;
        var Ae = null;
        for (y in l) {
          if (l.hasOwnProperty(y)) {
            var Le = l[y];
            if (Le != null) {
              switch (y) {
                case "name":
                  k = Le;
                  break;
                case "type":
                  K = Le;
                  break;
                case "checked":
                  we = Le;
                  break;
                case "defaultChecked":
                  Ae = Le;
                  break;
                case "value":
                  O = Le;
                  break;
                case "defaultValue":
                  le = Le;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Le != null) {
                    throw Error(i(137, s));
                  }
                  break;
                default:
                  vn(t, s, y, Le, l, null);
              }
            }
          }
        }
        Go(t, O, le, we, Ae, K, k, false);
        return;
      case "select":
        Vt("invalid", t);
        y = K = O = null;
        for (k in l) {
          if (l.hasOwnProperty(k) && (le = l[k], le != null)) {
            switch (k) {
              case "value":
                O = le;
                break;
              case "defaultValue":
                K = le;
                break;
              case "multiple":
                y = le;
              default:
                vn(t, s, k, le, l, null);
            }
          }
        }
        s = O;
        l = K;
        t.multiple = !!y;
        if (s != null) {
          Kr(t, !!y, s, false);
        } else if (l != null) {
          Kr(t, !!y, l, true);
        }
        return;
      case "textarea":
        Vt("invalid", t);
        O = k = y = null;
        for (K in l) {
          if (l.hasOwnProperty(K) && (le = l[K], le != null)) {
            switch (K) {
              case "value":
                y = le;
                break;
              case "defaultValue":
                k = le;
                break;
              case "children":
                O = le;
                break;
              case "dangerouslySetInnerHTML":
                if (le != null) {
                  throw Error(i(91));
                }
                break;
              default:
                vn(t, s, K, le, l, null);
            }
          }
        }
        Ms(t, y, k, O);
        return;
      case "option":
        for (we in l) {
          if (l.hasOwnProperty(we) && (y = l[we], y != null)) {
            switch (we) {
              case "selected":
                t.selected = y && typeof y != "function" && typeof y != "symbol";
                break;
              default:
                vn(t, s, we, y, l, null);
            }
          }
        }
        return;
      case "dialog":
        Vt("beforetoggle", t);
        Vt("toggle", t);
        Vt("cancel", t);
        Vt("close", t);
        break;
      case "iframe":
      case "object":
        Vt("load", t);
        break;
      case "video":
      case "audio":
        for (y = 0; y < Ic.length; y++) {
          Vt(Ic[y], t);
        }
        break;
      case "image":
        Vt("error", t);
        Vt("load", t);
        break;
      case "details":
        Vt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Vt("error", t);
        Vt("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (Ae in l) {
          if (l.hasOwnProperty(Ae) && (y = l[Ae], y != null)) {
            switch (Ae) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(i(137, s));
              default:
                vn(t, s, Ae, y, l, null);
            }
          }
        }
        return;
      default:
        if (fi(s)) {
          for (Le in l) {
            if (l.hasOwnProperty(Le)) {
              y = l[Le];
              if (y !== undefined) {
                Am(t, s, Le, y, l, undefined);
              }
            }
          }
          return;
        }
    }
    for (le in l) {
      if (l.hasOwnProperty(le)) {
        y = l[le];
        if (y != null) {
          vn(t, s, le, y, l, null);
        }
      }
    }
  }
  function RT(t, s, l, y) {
    switch (s) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var k = null;
        var O = null;
        var K = null;
        var le = null;
        var we = null;
        var Ae = null;
        var Le = null;
        for (De in l) {
          var He = l[De];
          if (l.hasOwnProperty(De) && He != null) {
            switch (De) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                we = He;
              default:
                if (!y.hasOwnProperty(De)) {
                  vn(t, s, De, null, y, He);
                }
            }
          }
        }
        for (var Oe in y) {
          var De = y[Oe];
          He = l[Oe];
          if (y.hasOwnProperty(Oe) && (De != null || He != null)) {
            switch (Oe) {
              case "type":
                O = De;
                break;
              case "name":
                k = De;
                break;
              case "checked":
                Ae = De;
                break;
              case "defaultChecked":
                Le = De;
                break;
              case "value":
                K = De;
                break;
              case "defaultValue":
                le = De;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (De != null) {
                  throw Error(i(137, s));
                }
                break;
              default:
                if (De !== He) {
                  vn(t, s, Oe, De, y, He);
                }
            }
          }
        }
        Vs(t, K, le, we, Ae, Le, O, k);
        return;
      case "select":
        De = K = le = Oe = null;
        for (O in l) {
          we = l[O];
          if (l.hasOwnProperty(O) && we != null) {
            switch (O) {
              case "value":
                break;
              case "multiple":
                De = we;
              default:
                if (!y.hasOwnProperty(O)) {
                  vn(t, s, O, null, y, we);
                }
            }
          }
        }
        for (k in y) {
          O = y[k];
          we = l[k];
          if (y.hasOwnProperty(k) && (O != null || we != null)) {
            switch (k) {
              case "value":
                Oe = O;
                break;
              case "defaultValue":
                le = O;
                break;
              case "multiple":
                K = O;
              default:
                if (O !== we) {
                  vn(t, s, k, O, y, we);
                }
            }
          }
        }
        s = le;
        l = K;
        y = De;
        if (Oe != null) {
          Kr(t, !!l, Oe, false);
        } else if (!!y != !!l) {
          if (s != null) {
            Kr(t, !!l, s, true);
          } else {
            Kr(t, !!l, l ? [] : "", false);
          }
        }
        return;
      case "textarea":
        De = Oe = null;
        for (le in l) {
          k = l[le];
          if (l.hasOwnProperty(le) && k != null && !y.hasOwnProperty(le)) {
            switch (le) {
              case "value":
                break;
              case "children":
                break;
              default:
                vn(t, s, le, null, y, k);
            }
          }
        }
        for (K in y) {
          k = y[K];
          O = l[K];
          if (y.hasOwnProperty(K) && (k != null || O != null)) {
            switch (K) {
              case "value":
                Oe = k;
                break;
              case "defaultValue":
                De = k;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (k != null) {
                  throw Error(i(91));
                }
                break;
              default:
                if (k !== O) {
                  vn(t, s, K, k, y, O);
                }
            }
          }
        }
        _r(t, Oe, De);
        return;
      case "option":
        for (var at in l) {
          Oe = l[at];
          if (l.hasOwnProperty(at) && Oe != null && !y.hasOwnProperty(at)) {
            switch (at) {
              case "selected":
                t.selected = false;
                break;
              default:
                vn(t, s, at, null, y, Oe);
            }
          }
        }
        for (we in y) {
          Oe = y[we];
          De = l[we];
          if (y.hasOwnProperty(we) && Oe !== De && (Oe != null || De != null)) {
            switch (we) {
              case "selected":
                t.selected = Oe && typeof Oe != "function" && typeof Oe != "symbol";
                break;
              default:
                vn(t, s, we, Oe, y, De);
            }
          }
        }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var wt in l) {
          Oe = l[wt];
          if (l.hasOwnProperty(wt) && Oe != null && !y.hasOwnProperty(wt)) {
            vn(t, s, wt, null, y, Oe);
          }
        }
        for (Ae in y) {
          Oe = y[Ae];
          De = l[Ae];
          if (y.hasOwnProperty(Ae) && Oe !== De && (Oe != null || De != null)) {
            switch (Ae) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (Oe != null) {
                  throw Error(i(137, s));
                }
                break;
              default:
                vn(t, s, Ae, Oe, y, De);
            }
          }
        }
        return;
      default:
        if (fi(s)) {
          for (var bn in l) {
            Oe = l[bn];
            if (l.hasOwnProperty(bn) && Oe !== undefined && !y.hasOwnProperty(bn)) {
              Am(t, s, bn, undefined, y, Oe);
            }
          }
          for (Le in y) {
            Oe = y[Le];
            De = l[Le];
            if (!!y.hasOwnProperty(Le) && Oe !== De && (Oe !== undefined || De !== undefined)) {
              Am(t, s, Le, Oe, y, De);
            }
          }
          return;
        }
    }
    for (var Ee in l) {
      Oe = l[Ee];
      if (l.hasOwnProperty(Ee) && Oe != null && !y.hasOwnProperty(Ee)) {
        vn(t, s, Ee, null, y, Oe);
      }
    }
    for (He in y) {
      Oe = y[He];
      De = l[He];
      if (!!y.hasOwnProperty(He) && Oe !== De && (Oe != null || De != null)) {
        vn(t, s, He, Oe, y, De);
      }
    }
  }
  function P0(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return true;
      default:
        return false;
    }
  }
  function TT() {
    if (typeof performance.getEntriesByType == "function") {
      var t = 0;
      var s = 0;
      for (var l = performance.getEntriesByType("resource"), y = 0; y < l.length; y++) {
        var k = l[y];
        var O = k.transferSize;
        var K = k.initiatorType;
        var le = k.duration;
        if (O && le && P0(K)) {
          K = 0;
          le = k.responseEnd;
          y += 1;
          for (; y < l.length; y++) {
            var we = l[y];
            var Ae = we.startTime;
            if (Ae > le) {
              break;
            }
            var Le = we.transferSize;
            var He = we.initiatorType;
            if (Le && P0(He)) {
              we = we.responseEnd;
              K += Le * (we < le ? 1 : (le - Ae) / (we - Ae));
            }
          }
          --y;
          s += (O + K) * 8 / (k.duration / 1000);
          t++;
          if (t > 10) {
            break;
          }
        }
      }
      if (t > 0) {
        return s / t / 1000000;
      }
    }
    if (navigator.connection && (t = navigator.connection.downlink, typeof t == "number")) {
      return t;
    } else {
      return 5;
    }
  }
  var Mm = null;
  var Om = null;
  function Ad(t) {
    if (t.nodeType === 9) {
      return t;
    } else {
      return t.ownerDocument;
    }
  }
  function B0(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function z0(t, s) {
    if (t === 0) {
      switch (s) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    }
    if (t === 1 && s === "foreignObject") {
      return 0;
    } else {
      return t;
    }
  }
  function Dm(t, s) {
    return t === "textarea" || t === "noscript" || typeof s.children == "string" || typeof s.children == "number" || typeof s.children == "bigint" || typeof s.dangerouslySetInnerHTML == "object" && s.dangerouslySetInnerHTML !== null && s.dangerouslySetInnerHTML.__html != null;
  }
  var Im = null;
  function kT() {
    var t = window.event;
    if (t && t.type === "popstate") {
      if (t === Im) {
        return false;
      } else {
        Im = t;
        return true;
      }
    } else {
      Im = null;
      return false;
    }
  }
  var N0 = typeof setTimeout == "function" ? setTimeout : undefined;
  var AT = typeof clearTimeout == "function" ? clearTimeout : undefined;
  var j0 = typeof Promise == "function" ? Promise : undefined;
  var MT = typeof queueMicrotask == "function" ? queueMicrotask : typeof j0 !== "undefined" ? function (t) {
    return j0.resolve(null).then(t).catch(OT);
  } : N0;
  function OT(t) {
    setTimeout(function () {
      throw t;
    });
  }
  function po(t) {
    return t === "head";
  }
  function H0(t, s) {
    var l = s;
    var y = 0;
    do {
      var k = l.nextSibling;
      t.removeChild(l);
      if (k && k.nodeType === 8) {
        l = k.data;
        if (l === "/$" || l === "/&") {
          if (y === 0) {
            t.removeChild(k);
            Cl(s);
            return;
          }
          y--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&") {
          y++;
        } else if (l === "html") {
          Pc(t.ownerDocument.documentElement);
        } else if (l === "head") {
          l = t.ownerDocument.head;
          Pc(l);
          for (var O = l.firstChild; O;) {
            var K = O.nextSibling;
            var le = O.nodeName;
            if (!O[dr] && le !== "SCRIPT" && le !== "STYLE" && (le !== "LINK" || O.rel.toLowerCase() !== "stylesheet")) {
              l.removeChild(O);
            }
            O = K;
          }
        } else if (l === "body") {
          Pc(t.ownerDocument.body);
        }
      }
      l = k;
    } while (l);
    Cl(s);
  }
  function F0(t, s) {
    var l = t;
    t = 0;
    do {
      var y = l.nextSibling;
      if (l.nodeType === 1) {
        if (s) {
          l._stashedDisplay = l.style.display;
          l.style.display = "none";
        } else {
          l.style.display = l._stashedDisplay || "";
          if (l.getAttribute("style") === "") {
            l.removeAttribute("style");
          }
        }
      } else if (l.nodeType === 3) {
        if (s) {
          l._stashedText = l.nodeValue;
          l.nodeValue = "";
        } else {
          l.nodeValue = l._stashedText || "";
        }
      }
      if (y && y.nodeType === 8) {
        l = y.data;
        if (l === "/$") {
          if (t === 0) {
            break;
          }
          t--;
        } else if (l === "$" || l === "$?" || l === "$~" || l === "$!") {
          t++;
        }
      }
      l = y;
    } while (l);
  }
  function Lm(t) {
    var s = t.firstChild;
    for (s && s.nodeType === 10 && (s = s.nextSibling); s;) {
      var l = s;
      s = s.nextSibling;
      switch (l.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Lm(l);
          us(l);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") {
            continue;
          }
      }
      t.removeChild(l);
    }
  }
  function DT(t, s, l, y) {
    while (t.nodeType === 1) {
      var k = l;
      if (t.nodeName.toLowerCase() !== s.toLowerCase()) {
        if (!y && (t.nodeName !== "INPUT" || t.type !== "hidden")) {
          break;
        }
      } else if (y) {
        if (!t[dr]) {
          switch (s) {
            case "meta":
              if (!t.hasAttribute("itemprop")) {
                break;
              }
              return t;
            case "link":
              O = t.getAttribute("rel");
              if (O === "stylesheet" && t.hasAttribute("data-precedence")) {
                break;
              }
              if (O !== k.rel || t.getAttribute("href") !== (k.href == null || k.href === "" ? null : k.href) || t.getAttribute("crossorigin") !== (k.crossOrigin == null ? null : k.crossOrigin) || t.getAttribute("title") !== (k.title == null ? null : k.title)) {
                break;
              }
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) {
                break;
              }
              return t;
            case "script":
              O = t.getAttribute("src");
              if ((O !== (k.src == null ? null : k.src) || t.getAttribute("type") !== (k.type == null ? null : k.type) || t.getAttribute("crossorigin") !== (k.crossOrigin == null ? null : k.crossOrigin)) && O && t.hasAttribute("async") && !t.hasAttribute("itemprop")) {
                break;
              }
              return t;
            default:
              return t;
          }
        }
      } else if (s === "input" && t.type === "hidden") {
        var O = k.name == null ? null : "" + k.name;
        if (k.type === "hidden" && t.getAttribute("name") === O) {
          return t;
        }
      } else {
        return t;
      }
      t = bs(t.nextSibling);
      if (t === null) {
        break;
      }
    }
    return null;
  }
  function IT(t, s, l) {
    if (s === "") {
      return null;
    }
    while (t.nodeType !== 3) {
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !l || (t = bs(t.nextSibling), t === null)) {
        return null;
      }
    }
    return t;
  }
  function U0(t, s) {
    while (t.nodeType !== 8) {
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !s || (t = bs(t.nextSibling), t === null)) {
        return null;
      }
    }
    return t;
  }
  function Pm(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Bm(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function LT(t, s) {
    var l = t.ownerDocument;
    if (t.data === "$~") {
      t._reactRetry = s;
    } else if (t.data !== "$?" || l.readyState !== "loading") {
      s();
    } else {
      function y() {
        s();
        l.removeEventListener("DOMContentLoaded", y);
      }
      l.addEventListener("DOMContentLoaded", y);
      t._reactRetry = y;
    }
  }
  function bs(t) {
    for (; t != null; t = t.nextSibling) {
      var s = t.nodeType;
      if (s === 1 || s === 3) {
        break;
      }
      if (s === 8) {
        s = t.data;
        if (s === "$" || s === "$!" || s === "$?" || s === "$~" || s === "&" || s === "F!" || s === "F") {
          break;
        }
        if (s === "/$" || s === "/&") {
          return null;
        }
      }
    }
    return t;
  }
  var zm = null;
  function V0(t) {
    t = t.nextSibling;
    var s = 0;
    for (; t;) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "/$" || l === "/&") {
          if (s === 0) {
            return bs(t.nextSibling);
          }
          s--;
        } else if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          s++;
        }
      }
      t = t.nextSibling;
    }
    return null;
  }
  function W0(t) {
    t = t.previousSibling;
    var s = 0;
    for (; t;) {
      if (t.nodeType === 8) {
        var l = t.data;
        if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
          if (s === 0) {
            return t;
          }
          s--;
        } else if (l === "/$" || l === "/&") {
          s++;
        }
      }
      t = t.previousSibling;
    }
    return null;
  }
  function $0(t, s, l) {
    s = Ad(l);
    switch (t) {
      case "html":
        t = s.documentElement;
        if (!t) {
          throw Error(i(452));
        }
        return t;
      case "head":
        t = s.head;
        if (!t) {
          throw Error(i(453));
        }
        return t;
      case "body":
        t = s.body;
        if (!t) {
          throw Error(i(454));
        }
        return t;
      default:
        throw Error(i(451));
    }
  }
  function Pc(t) {
    for (var s = t.attributes; s.length;) {
      t.removeAttributeNode(s[0]);
    }
    us(t);
  }
  var ys = new Map();
  var q0 = new Set();
  function Md(t) {
    if (typeof t.getRootNode == "function") {
      return t.getRootNode();
    } else if (t.nodeType === 9) {
      return t;
    } else {
      return t.ownerDocument;
    }
  }
  var ki = q.d;
  q.d = {
    f: PT,
    r: BT,
    D: zT,
    C: NT,
    L: jT,
    m: HT,
    X: UT,
    S: FT,
    M: VT
  };
  function PT() {
    var t = ki.f();
    var s = wd();
    return t || s;
  }
  function BT(t) {
    var s = yr(t);
    if (s !== null && s.tag === 5 && s.type === "form") {
      c_(s);
    } else {
      ki.r(t);
    }
  }
  var wl = typeof document === "undefined" ? null : document;
  function G0(t, s, l) {
    var y = wl;
    if (y && typeof s == "string" && s) {
      var k = er(s);
      k = "link[rel=\"" + t + "\"][href=\"" + k + "\"]";
      if (typeof l == "string") {
        k += "[crossorigin=\"" + l + "\"]";
      }
      if (!q0.has(k)) {
        q0.add(k);
        t = {
          rel: t,
          crossOrigin: l,
          href: s
        };
        if (y.querySelector(k) === null) {
          s = y.createElement("link");
          vr(s, "link", t);
          _n(s);
          y.head.appendChild(s);
        }
      }
    }
  }
  function zT(t) {
    ki.D(t);
    G0("dns-prefetch", t, null);
  }
  function NT(t, s) {
    ki.C(t, s);
    G0("preconnect", t, s);
  }
  function jT(t, s, l) {
    ki.L(t, s, l);
    var y = wl;
    if (y && t && s) {
      var k = "link[rel=\"preload\"][as=\"" + er(s) + "\"]";
      if (s === "image" && l && l.imageSrcSet) {
        k += "[imagesrcset=\"" + er(l.imageSrcSet) + "\"]";
        if (typeof l.imageSizes == "string") {
          k += "[imagesizes=\"" + er(l.imageSizes) + "\"]";
        }
      } else {
        k += "[href=\"" + er(t) + "\"]";
      }
      var O = k;
      switch (s) {
        case "style":
          O = Sl(t);
          break;
        case "script":
          O = xl(t);
      }
      if (!ys.has(O)) {
        t = f({
          rel: "preload",
          href: s === "image" && l && l.imageSrcSet ? undefined : t,
          as: s
        }, l);
        ys.set(O, t);
        if (y.querySelector(k) === null && (s !== "style" || !y.querySelector(Bc(O))) && (s !== "script" || !y.querySelector(zc(O)))) {
          s = y.createElement("link");
          vr(s, "link", t);
          _n(s);
          y.head.appendChild(s);
        }
      }
    }
  }
  function HT(t, s) {
    ki.m(t, s);
    var l = wl;
    if (l && t) {
      var y = s && typeof s.as == "string" ? s.as : "script";
      var k = "link[rel=\"modulepreload\"][as=\"" + er(y) + "\"][href=\"" + er(t) + "\"]";
      var O = k;
      switch (y) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          O = xl(t);
      }
      if (!ys.has(O) && (t = f({
        rel: "modulepreload",
        href: t
      }, s), ys.set(O, t), l.querySelector(k) === null)) {
        switch (y) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(zc(O))) {
              return;
            }
        }
        y = l.createElement("link");
        vr(y, "link", t);
        _n(y);
        l.head.appendChild(y);
      }
    }
  }
  function FT(t, s, l) {
    ki.S(t, s, l);
    var y = wl;
    if (y && t) {
      var k = fr(y).hoistableStyles;
      var O = Sl(t);
      s = s || "default";
      var K = k.get(O);
      if (!K) {
        var le = {
          loading: 0,
          preload: null
        };
        if (K = y.querySelector(Bc(O))) {
          le.loading = 5;
        } else {
          t = f({
            rel: "stylesheet",
            href: t,
            "data-precedence": s
          }, l);
          if (l = ys.get(O)) {
            Nm(t, l);
          }
          var we = K = y.createElement("link");
          _n(we);
          vr(we, "link", t);
          we._p = new Promise(function (Ae, Le) {
            we.onload = Ae;
            we.onerror = Le;
          });
          we.addEventListener("load", function () {
            le.loading |= 1;
          });
          we.addEventListener("error", function () {
            le.loading |= 2;
          });
          le.loading |= 4;
          Od(K, s, y);
        }
        K = {
          type: "stylesheet",
          instance: K,
          count: 1,
          state: le
        };
        k.set(O, K);
      }
    }
  }
  function UT(t, s) {
    ki.X(t, s);
    var l = wl;
    if (l && t) {
      var y = fr(l).hoistableScripts;
      var k = xl(t);
      var O = y.get(k);
      if (!O) {
        O = l.querySelector(zc(k));
        if (!O) {
          t = f({
            src: t,
            async: true
          }, s);
          if (s = ys.get(k)) {
            jm(t, s);
          }
          O = l.createElement("script");
          _n(O);
          vr(O, "link", t);
          l.head.appendChild(O);
        }
        O = {
          type: "script",
          instance: O,
          count: 1,
          state: null
        };
        y.set(k, O);
      }
    }
  }
  function VT(t, s) {
    ki.M(t, s);
    var l = wl;
    if (l && t) {
      var y = fr(l).hoistableScripts;
      var k = xl(t);
      var O = y.get(k);
      if (!O) {
        O = l.querySelector(zc(k));
        if (!O) {
          t = f({
            src: t,
            async: true,
            type: "module"
          }, s);
          if (s = ys.get(k)) {
            jm(t, s);
          }
          O = l.createElement("script");
          _n(O);
          vr(O, "link", t);
          l.head.appendChild(O);
        }
        O = {
          type: "script",
          instance: O,
          count: 1,
          state: null
        };
        y.set(k, O);
      }
    }
  }
  function Y0(t, s, l, y) {
    var k = (k = ue.current) ? Md(k) : null;
    if (!k) {
      throw Error(i(446));
    }
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        if (typeof l.precedence == "string" && typeof l.href == "string") {
          s = Sl(l.href);
          l = fr(k).hoistableStyles;
          y = l.get(s);
          if (!y) {
            y = {
              type: "style",
              instance: null,
              count: 0,
              state: null
            };
            l.set(s, y);
          }
          return y;
        } else {
          return {
            type: "void",
            instance: null,
            count: 0,
            state: null
          };
        }
      case "link":
        if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
          t = Sl(l.href);
          var O = fr(k).hoistableStyles;
          var K = O.get(t);
          if (!K) {
            k = k.ownerDocument || k;
            K = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: {
                loading: 0,
                preload: null
              }
            };
            O.set(t, K);
            if ((O = k.querySelector(Bc(t))) && !O._p) {
              K.instance = O;
              K.state.loading = 5;
            }
            if (!ys.has(t)) {
              l = {
                rel: "preload",
                as: "style",
                href: l.href,
                crossOrigin: l.crossOrigin,
                integrity: l.integrity,
                media: l.media,
                hrefLang: l.hrefLang,
                referrerPolicy: l.referrerPolicy
              };
              ys.set(t, l);
              if (!O) {
                WT(k, t, l, K.state);
              }
            }
          }
          if (s && y === null) {
            throw Error(i(528, ""));
          }
          return K;
        }
        if (s && y !== null) {
          throw Error(i(529, ""));
        }
        return null;
      case "script":
        s = l.async;
        l = l.src;
        if (typeof l == "string" && s && typeof s != "function" && typeof s != "symbol") {
          s = xl(l);
          l = fr(k).hoistableScripts;
          y = l.get(s);
          if (!y) {
            y = {
              type: "script",
              instance: null,
              count: 0,
              state: null
            };
            l.set(s, y);
          }
          return y;
        } else {
          return {
            type: "void",
            instance: null,
            count: 0,
            state: null
          };
        }
      default:
        throw Error(i(444, t));
    }
  }
  function Sl(t) {
    return "href=\"" + er(t) + "\"";
  }
  function Bc(t) {
    return "link[rel=\"stylesheet\"][" + t + "]";
  }
  function X0(t) {
    return f({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function WT(t, s, l, y) {
    if (t.querySelector("link[rel=\"preload\"][as=\"style\"][" + s + "]")) {
      y.loading = 1;
    } else {
      s = t.createElement("link");
      y.preload = s;
      s.addEventListener("load", function () {
        return y.loading |= 1;
      });
      s.addEventListener("error", function () {
        return y.loading |= 2;
      });
      vr(s, "link", l);
      _n(s);
      t.head.appendChild(s);
    }
  }
  function xl(t) {
    return "[src=\"" + er(t) + "\"]";
  }
  function zc(t) {
    return "script[async]" + t;
  }
  function K0(t, s, l) {
    s.count++;
    if (s.instance === null) {
      switch (s.type) {
        case "style":
          var y = t.querySelector("style[data-href~=\"" + er(l.href) + "\"]");
          if (y) {
            s.instance = y;
            _n(y);
            return y;
          }
          var k = f({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null
          });
          y = (t.ownerDocument || t).createElement("style");
          _n(y);
          vr(y, "style", k);
          Od(y, l.precedence, t);
          return s.instance = y;
        case "stylesheet":
          k = Sl(l.href);
          var O = t.querySelector(Bc(k));
          if (O) {
            s.state.loading |= 4;
            s.instance = O;
            _n(O);
            return O;
          }
          y = X0(l);
          if (k = ys.get(k)) {
            Nm(y, k);
          }
          O = (t.ownerDocument || t).createElement("link");
          _n(O);
          var K = O;
          K._p = new Promise(function (le, we) {
            K.onload = le;
            K.onerror = we;
          });
          vr(O, "link", y);
          s.state.loading |= 4;
          Od(O, l.precedence, t);
          return s.instance = O;
        case "script":
          O = xl(l.src);
          if (k = t.querySelector(zc(O))) {
            s.instance = k;
            _n(k);
            return k;
          } else {
            y = l;
            if (k = ys.get(O)) {
              y = f({}, l);
              jm(y, k);
            }
            t = t.ownerDocument || t;
            k = t.createElement("script");
            _n(k);
            vr(k, "link", y);
            t.head.appendChild(k);
            return s.instance = k;
          }
        case "void":
          return null;
        default:
          throw Error(i(443, s.type));
      }
    } else if (s.type === "stylesheet" && (s.state.loading & 4) === 0) {
      y = s.instance;
      s.state.loading |= 4;
      Od(y, l.precedence, t);
    }
    return s.instance;
  }
  function Od(t, s, l) {
    for (var y = l.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), k = y.length ? y[y.length - 1] : null, O = k, K = 0; K < y.length; K++) {
      var le = y[K];
      if (le.dataset.precedence === s) {
        O = le;
      } else if (O !== k) {
        break;
      }
    }
    if (O) {
      O.parentNode.insertBefore(t, O.nextSibling);
    } else {
      s = l.nodeType === 9 ? l.head : l;
      s.insertBefore(t, s.firstChild);
    }
  }
  function Nm(t, s) {
    if (t.crossOrigin == null) {
      t.crossOrigin = s.crossOrigin;
    }
    if (t.referrerPolicy == null) {
      t.referrerPolicy = s.referrerPolicy;
    }
    if (t.title == null) {
      t.title = s.title;
    }
  }
  function jm(t, s) {
    if (t.crossOrigin == null) {
      t.crossOrigin = s.crossOrigin;
    }
    if (t.referrerPolicy == null) {
      t.referrerPolicy = s.referrerPolicy;
    }
    if (t.integrity == null) {
      t.integrity = s.integrity;
    }
  }
  var Dd = null;
  function Z0(t, s, l) {
    if (Dd === null) {
      var y = new Map();
      var k = Dd = new Map();
      k.set(l, y);
    } else {
      k = Dd;
      y = k.get(l);
      if (!y) {
        y = new Map();
        k.set(l, y);
      }
    }
    if (y.has(t)) {
      return y;
    }
    y.set(t, null);
    l = l.getElementsByTagName(t);
    k = 0;
    for (; k < l.length; k++) {
      var O = l[k];
      if (!O[dr] && !O[Ft] && (t !== "link" || O.getAttribute("rel") !== "stylesheet") && O.namespaceURI !== "http://www.w3.org/2000/svg") {
        var K = O.getAttribute(s) || "";
        K = t + K;
        var le = y.get(K);
        if (le) {
          le.push(O);
        } else {
          y.set(K, [O]);
        }
      }
    }
    return y;
  }
  function Q0(t, s, l) {
    t = t.ownerDocument || t;
    t.head.insertBefore(l, s === "title" ? t.querySelector("head > title") : null);
  }
  function $T(t, s, l) {
    if (l === 1 || s.itemProp != null) {
      return false;
    }
    switch (t) {
      case "meta":
      case "title":
        return true;
      case "style":
        if (typeof s.precedence != "string" || typeof s.href != "string" || s.href === "") {
          break;
        }
        return true;
      case "link":
        if (typeof s.rel != "string" || typeof s.href != "string" || s.href === "" || s.onLoad || s.onError) {
          break;
        }
        switch (s.rel) {
          case "stylesheet":
            t = s.disabled;
            return typeof s.precedence == "string" && t == null;
          default:
            return true;
        }
      case "script":
        if (s.async && typeof s.async != "function" && typeof s.async != "symbol" && !s.onLoad && !s.onError && s.src && typeof s.src == "string") {
          return true;
        }
    }
    return false;
  }
  function J0(t) {
    return t.type !== "stylesheet" || (t.state.loading & 3) !== 0;
  }
  function qT(t, s, l, y) {
    if (l.type === "stylesheet" && (typeof y.media != "string" || matchMedia(y.media).matches !== false) && (l.state.loading & 4) === 0) {
      if (l.instance === null) {
        var k = Sl(y.href);
        var O = s.querySelector(Bc(k));
        if (O) {
          s = O._p;
          if (s !== null && typeof s == "object" && typeof s.then == "function") {
            t.count++;
            t = Id.bind(t);
            s.then(t, t);
          }
          l.state.loading |= 4;
          l.instance = O;
          _n(O);
          return;
        }
        O = s.ownerDocument || s;
        y = X0(y);
        if (k = ys.get(k)) {
          Nm(y, k);
        }
        O = O.createElement("link");
        _n(O);
        var K = O;
        K._p = new Promise(function (le, we) {
          K.onload = le;
          K.onerror = we;
        });
        vr(O, "link", y);
        l.instance = O;
      }
      if (t.stylesheets === null) {
        t.stylesheets = new Map();
      }
      t.stylesheets.set(l, s);
      if ((s = l.state.preload) && (l.state.loading & 3) === 0) {
        t.count++;
        l = Id.bind(t);
        s.addEventListener("load", l);
        s.addEventListener("error", l);
      }
    }
  }
  var Hm = 0;
  function GT(t, s) {
    if (t.stylesheets && t.count === 0) {
      Pd(t, t.stylesheets);
    }
    if (t.count > 0 || t.imgCount > 0) {
      return function (l) {
        var y = setTimeout(function () {
          if (t.stylesheets) {
            Pd(t, t.stylesheets);
          }
          if (t.unsuspend) {
            var O = t.unsuspend;
            t.unsuspend = null;
            O();
          }
        }, 60000 + s);
        if (t.imgBytes > 0 && Hm === 0) {
          Hm = TT() * 62500;
        }
        var k = setTimeout(function () {
          t.waitingForImages = false;
          if (t.count === 0 && (t.stylesheets && Pd(t, t.stylesheets), t.unsuspend)) {
            var O = t.unsuspend;
            t.unsuspend = null;
            O();
          }
        }, (t.imgBytes > Hm ? 50 : 800) + s);
        t.unsuspend = l;
        return function () {
          t.unsuspend = null;
          clearTimeout(y);
          clearTimeout(k);
        };
      };
    } else {
      return null;
    }
  }
  function Id() {
    this.count--;
    if (this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) {
        Pd(this, this.stylesheets);
      } else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null;
        t();
      }
    }
  }
  var Ld = null;
  function Pd(t, s) {
    t.stylesheets = null;
    if (t.unsuspend !== null) {
      t.count++;
      Ld = new Map();
      s.forEach(YT, t);
      Ld = null;
      Id.call(t);
    }
  }
  function YT(t, s) {
    if (!(s.state.loading & 4)) {
      var l = Ld.get(t);
      if (l) {
        var y = l.get(null);
      } else {
        l = new Map();
        Ld.set(t, l);
        for (var k = t.querySelectorAll("link[data-precedence],style[data-precedence]"), O = 0; O < k.length; O++) {
          var K = k[O];
          if (K.nodeName === "LINK" || K.getAttribute("media") !== "not all") {
            l.set(K.dataset.precedence, K);
            y = K;
          }
        }
        if (y) {
          l.set(null, y);
        }
      }
      k = s.instance;
      K = k.getAttribute("data-precedence");
      O = l.get(K) || y;
      if (O === y) {
        l.set(null, k);
      }
      l.set(K, k);
      this.count++;
      y = Id.bind(this);
      k.addEventListener("load", y);
      k.addEventListener("error", y);
      if (O) {
        O.parentNode.insertBefore(k, O.nextSibling);
      } else {
        t = t.nodeType === 9 ? t.head : t;
        t.insertBefore(k, t.firstChild);
      }
      s.state.loading |= 4;
    }
  }
  var Nc = {
    $$typeof: v,
    Provider: null,
    Consumer: null,
    _currentValue: U,
    _currentValue2: U,
    _threadCount: 0
  };
  function XT(t, s, l, y, k, O, K, le, we) {
    this.tag = 1;
    this.containerInfo = t;
    this.pingCache = this.current = this.pendingChildren = null;
    this.timeoutHandle = -1;
    this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
    this.callbackPriority = 0;
    this.expirationTimes = it(-1);
    this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
    this.entanglements = it(0);
    this.hiddenUpdates = it(null);
    this.identifierPrefix = y;
    this.onUncaughtError = k;
    this.onCaughtError = O;
    this.onRecoverableError = K;
    this.pooledCache = null;
    this.pooledCacheLanes = 0;
    this.formState = we;
    this.incompleteTransitions = new Map();
  }
  function ew(t, s, l, y, k, O, K, le, we, Ae, Le, He) {
    t = new XT(t, s, l, K, we, Ae, Le, He, le);
    s = 1;
    if (O === true) {
      s |= 24;
    }
    O = es(3, null, null, s);
    t.current = O;
    O.stateNode = t;
    s = yp();
    s.refCount++;
    t.pooledCache = s;
    s.refCount++;
    O.memoizedState = {
      element: y,
      isDehydrated: l,
      cache: s
    };
    xp(O);
    return t;
  }
  function tw(t) {
    if (t) {
      t = el;
      return t;
    } else {
      return el;
    }
  }
  function nw(t, s, l, y, k, O) {
    k = tw(k);
    if (y.context === null) {
      y.context = k;
    } else {
      y.pendingContext = k;
    }
    y = no(s);
    y.payload = {
      element: l
    };
    O = O === undefined ? null : O;
    if (O !== null) {
      y.callback = O;
    }
    l = ro(t, y, s);
    if (l !== null) {
      Fr(l, t, s);
      gc(l, t, s);
    }
  }
  function rw(t, s) {
    t = t.memoizedState;
    if (t !== null && t.dehydrated !== null) {
      var l = t.retryLane;
      t.retryLane = l !== 0 && l < s ? l : s;
    }
  }
  function Fm(t, s) {
    rw(t, s);
    if (t = t.alternate) {
      rw(t, s);
    }
  }
  function sw(t) {
    if (t.tag === 13 || t.tag === 31) {
      var s = na(t, 67108864);
      if (s !== null) {
        Fr(s, t, 67108864);
      }
      Fm(t, 67108864);
    }
  }
  function iw(t) {
    if (t.tag === 13 || t.tag === 31) {
      var s = is();
      s = Kt(s);
      var l = na(t, s);
      if (l !== null) {
        Fr(l, t, s);
      }
      Fm(t, s);
    }
  }
  var Bd = true;
  function KT(t, s, l, y) {
    var k = G.T;
    G.T = null;
    var O = q.p;
    try {
      q.p = 2;
      Um(t, s, l, y);
    } finally {
      q.p = O;
      G.T = k;
    }
  }
  function ZT(t, s, l, y) {
    var k = G.T;
    G.T = null;
    var O = q.p;
    try {
      q.p = 8;
      Um(t, s, l, y);
    } finally {
      q.p = O;
      G.T = k;
    }
  }
  function Um(t, s, l, y) {
    if (Bd) {
      var k = Vm(y);
      if (k === null) {
        km(t, s, y, zd, l);
        aw(t, y);
      } else if (JT(k, t, s, l, y)) {
        y.stopPropagation();
      } else {
        aw(t, y);
        if (s & 4 && QT.indexOf(t) > -1) {
          while (k !== null) {
            var O = yr(k);
            if (O !== null) {
              switch (O.tag) {
                case 3:
                  O = O.stateNode;
                  if (O.current.memoizedState.isDehydrated) {
                    var K = gt(O.pendingLanes);
                    if (K !== 0) {
                      var le = O;
                      le.pendingLanes |= 2;
                      le.entangledLanes |= 2;
                      while (K) {
                        var we = 1 << 31 - dt(K);
                        le.entanglements[1] |= we;
                        K &= ~we;
                      }
                      Ks(O);
                      if ((cn & 6) === 0) {
                        yd = _e() + 500;
                        Dc(0);
                      }
                    }
                  }
                  break;
                case 31:
                case 13:
                  le = na(O, 2);
                  if (le !== null) {
                    Fr(le, O, 2);
                  }
                  wd();
                  Fm(O, 2);
              }
            }
            O = Vm(y);
            if (O === null) {
              km(t, s, y, zd, l);
            }
            if (O === k) {
              break;
            }
            k = O;
          }
          if (k !== null) {
            y.stopPropagation();
          }
        } else {
          km(t, s, y, null, l);
        }
      }
    }
  }
  function Vm(t) {
    t = hi(t);
    return Wm(t);
  }
  var zd = null;
  function Wm(t) {
    zd = null;
    t = Xr(t);
    if (t !== null) {
      var s = u(t);
      if (s === null) {
        t = null;
      } else {
        var l = s.tag;
        if (l === 13) {
          t = h(s);
          if (t !== null) {
            return t;
          }
          t = null;
        } else if (l === 31) {
          t = a(s);
          if (t !== null) {
            return t;
          }
          t = null;
        } else if (l === 3) {
          if (s.stateNode.current.memoizedState.isDehydrated) {
            if (s.tag === 3) {
              return s.stateNode.containerInfo;
            } else {
              return null;
            }
          }
          t = null;
        } else if (s !== t) {
          t = null;
        }
      }
    }
    zd = t;
    return null;
  }
  function ow(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (ie()) {
          case te:
            return 2;
          case be:
            return 8;
          case ve:
          case Te:
            return 32;
          case Re:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var $m = false;
  var mo = null;
  var go = null;
  var vo = null;
  var jc = new Map();
  var Hc = new Map();
  var bo = [];
  var QT = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function aw(t, s) {
    switch (t) {
      case "focusin":
      case "focusout":
        mo = null;
        break;
      case "dragenter":
      case "dragleave":
        go = null;
        break;
      case "mouseover":
      case "mouseout":
        vo = null;
        break;
      case "pointerover":
      case "pointerout":
        jc.delete(s.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Hc.delete(s.pointerId);
    }
  }
  function Fc(t, s, l, y, k, O) {
    if (t === null || t.nativeEvent !== O) {
      t = {
        blockedOn: s,
        domEventName: l,
        eventSystemFlags: y,
        nativeEvent: O,
        targetContainers: [k]
      };
      if (s !== null) {
        s = yr(s);
        if (s !== null) {
          sw(s);
        }
      }
      return t;
    } else {
      t.eventSystemFlags |= y;
      s = t.targetContainers;
      if (k !== null && s.indexOf(k) === -1) {
        s.push(k);
      }
      return t;
    }
  }
  function JT(t, s, l, y, k) {
    switch (s) {
      case "focusin":
        mo = Fc(mo, t, s, l, y, k);
        return true;
      case "dragenter":
        go = Fc(go, t, s, l, y, k);
        return true;
      case "mouseover":
        vo = Fc(vo, t, s, l, y, k);
        return true;
      case "pointerover":
        var O = k.pointerId;
        jc.set(O, Fc(jc.get(O) || null, t, s, l, y, k));
        return true;
      case "gotpointercapture":
        O = k.pointerId;
        Hc.set(O, Fc(Hc.get(O) || null, t, s, l, y, k));
        return true;
    }
    return false;
  }
  function lw(t) {
    var s = Xr(t.target);
    if (s !== null) {
      var l = u(s);
      if (l !== null) {
        s = l.tag;
        if (s === 13) {
          s = h(l);
          if (s !== null) {
            t.blockedOn = s;
            nn(t.priority, function () {
              iw(l);
            });
            return;
          }
        } else if (s === 31) {
          s = a(l);
          if (s !== null) {
            t.blockedOn = s;
            nn(t.priority, function () {
              iw(l);
            });
            return;
          }
        } else if (s === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Nd(t) {
    if (t.blockedOn !== null) {
      return false;
    }
    for (var s = t.targetContainers; s.length > 0;) {
      var l = Vm(t.nativeEvent);
      if (l === null) {
        l = t.nativeEvent;
        var y = new l.constructor(l.type, l);
        Xo = y;
        l.target.dispatchEvent(y);
        Xo = null;
      } else {
        s = yr(l);
        if (s !== null) {
          sw(s);
        }
        t.blockedOn = l;
        return false;
      }
      s.shift();
    }
    return true;
  }
  function cw(t, s, l) {
    if (Nd(t)) {
      l.delete(s);
    }
  }
  function ek() {
    $m = false;
    if (mo !== null && Nd(mo)) {
      mo = null;
    }
    if (go !== null && Nd(go)) {
      go = null;
    }
    if (vo !== null && Nd(vo)) {
      vo = null;
    }
    jc.forEach(cw);
    Hc.forEach(cw);
  }
  function jd(t, s) {
    if (t.blockedOn === s) {
      t.blockedOn = null;
      if (!$m) {
        $m = true;
        e.unstable_scheduleCallback(e.unstable_NormalPriority, ek);
      }
    }
  }
  var Hd = null;
  function uw(t) {
    if (Hd !== t) {
      Hd = t;
      e.unstable_scheduleCallback(e.unstable_NormalPriority, function () {
        if (Hd === t) {
          Hd = null;
        }
        for (var s = 0; s < t.length; s += 3) {
          var l = t[s];
          var y = t[s + 1];
          var k = t[s + 2];
          if (typeof y != "function") {
            if (Wm(y || l) === null) {
              continue;
            }
            break;
          }
          var O = yr(l);
          if (O !== null) {
            t.splice(s, 3);
            s -= 3;
            Vp(O, {
              pending: true,
              data: k,
              method: l.method,
              action: y
            }, y, k);
          }
        }
      });
    }
  }
  function Cl(t) {
    function s(we) {
      return jd(we, t);
    }
    if (mo !== null) {
      jd(mo, t);
    }
    if (go !== null) {
      jd(go, t);
    }
    if (vo !== null) {
      jd(vo, t);
    }
    jc.forEach(s);
    Hc.forEach(s);
    for (var l = 0; l < bo.length; l++) {
      var y = bo[l];
      if (y.blockedOn === t) {
        y.blockedOn = null;
      }
    }
    while (bo.length > 0 && (l = bo[0], l.blockedOn === null)) {
      lw(l);
      if (l.blockedOn === null) {
        bo.shift();
      }
    }
    l = (t.ownerDocument || t).$$reactFormReplay;
    if (l != null) {
      for (y = 0; y < l.length; y += 3) {
        var k = l[y];
        var O = l[y + 1];
        var K = k[sn] || null;
        if (typeof O == "function") {
          if (!K) {
            uw(l);
          }
        } else if (K) {
          var le = null;
          if (O && O.hasAttribute("formAction")) {
            k = O;
            if (K = O[sn] || null) {
              le = K.formAction;
            } else if (Wm(k) !== null) {
              continue;
            }
          } else {
            le = K.action;
          }
          if (typeof le == "function") {
            l[y + 1] = le;
          } else {
            l.splice(y, 3);
            y -= 3;
          }
          uw(l);
        }
      }
    }
  }
  function dw() {
    function t(O) {
      if (O.canIntercept && O.info === "react-transition") {
        O.intercept({
          handler: function () {
            return new Promise(function (K) {
              return k = K;
            });
          },
          focusReset: "manual",
          scroll: "manual"
        });
      }
    }
    function s() {
      if (k !== null) {
        k();
        k = null;
      }
      if (!y) {
        setTimeout(l, 20);
      }
    }
    function l() {
      if (!y && !navigation.transition) {
        var O = navigation.currentEntry;
        if (O && O.url != null) {
          navigation.navigate(O.url, {
            state: O.getState(),
            info: "react-transition",
            history: "replace"
          });
        }
      }
    }
    if (typeof navigation == "object") {
      var y = false;
      var k = null;
      navigation.addEventListener("navigate", t);
      navigation.addEventListener("navigatesuccess", s);
      navigation.addEventListener("navigateerror", s);
      setTimeout(l, 100);
      return function () {
        y = true;
        navigation.removeEventListener("navigate", t);
        navigation.removeEventListener("navigatesuccess", s);
        navigation.removeEventListener("navigateerror", s);
        if (k !== null) {
          k();
          k = null;
        }
      };
    }
  }
  function qm(t) {
    this._internalRoot = t;
  }
  Fd.prototype.render = qm.prototype.render = function (t) {
    var s = this._internalRoot;
    if (s === null) {
      throw Error(i(409));
    }
    var l = s.current;
    var y = is();
    nw(l, y, t, s, null, null);
  };
  Fd.prototype.unmount = qm.prototype.unmount = function () {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var s = t.containerInfo;
      nw(t.current, 2, null, t, null, null);
      wd();
      s[zt] = null;
    }
  };
  function Fd(t) {
    this._internalRoot = t;
  }
  Fd.prototype.unstable_scheduleHydration = function (t) {
    if (t) {
      var s = Zt();
      t = {
        blockedOn: null,
        target: t,
        priority: s
      };
      for (var l = 0; l < bo.length && s !== 0 && s < bo[l].priority; l++);
      bo.splice(l, 0, t);
      if (l === 0) {
        lw(t);
      }
    }
  };
  var fw = n.version;
  if (fw !== "19.2.7") {
    throw Error(i(527, fw, "19.2.7"));
  }
  q.findDOMNode = function (t) {
    var s = t._reactInternals;
    if (s === undefined) {
      throw typeof t.render == "function" ? Error(i(188)) : (t = Object.keys(t).join(","), Error(i(268, t)));
    }
    t = d(s);
    t = t !== null ? p(t) : null;
    t = t === null ? null : t.stateNode;
    return t;
  };
  var tk = {
    bundleType: 0,
    version: "19.2.7",
    rendererPackageName: "react-dom",
    currentDispatcherRef: G,
    reconcilerVersion: "19.2.7"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
    var Ud = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ud.isDisabled && Ud.supportsFiber) {
      try {
        Ue = Ud.inject(tk);
        We = Ud;
      } catch {}
    }
  }
  Vc.createRoot = function (t, s) {
    if (!o(t)) {
      throw Error(i(299));
    }
    var l = false;
    var y = "";
    var k = y_;
    var O = __;
    var K = w_;
    if (s != null) {
      if (s.unstable_strictMode === true) {
        l = true;
      }
      if (s.identifierPrefix !== undefined) {
        y = s.identifierPrefix;
      }
      if (s.onUncaughtError !== undefined) {
        k = s.onUncaughtError;
      }
      if (s.onCaughtError !== undefined) {
        O = s.onCaughtError;
      }
      if (s.onRecoverableError !== undefined) {
        K = s.onRecoverableError;
      }
    }
    s = ew(t, 1, false, null, null, l, y, null, k, O, K, dw);
    t[zt] = s.current;
    Tm(t);
    return new qm(s);
  };
  Vc.hydrateRoot = function (t, s, l) {
    if (!o(t)) {
      throw Error(i(299));
    }
    var y = false;
    var k = "";
    var O = y_;
    var K = __;
    var le = w_;
    var we = null;
    if (l != null) {
      if (l.unstable_strictMode === true) {
        y = true;
      }
      if (l.identifierPrefix !== undefined) {
        k = l.identifierPrefix;
      }
      if (l.onUncaughtError !== undefined) {
        O = l.onUncaughtError;
      }
      if (l.onCaughtError !== undefined) {
        K = l.onCaughtError;
      }
      if (l.onRecoverableError !== undefined) {
        le = l.onRecoverableError;
      }
      if (l.formState !== undefined) {
        we = l.formState;
      }
    }
    s = ew(t, 1, true, s, l ?? null, y, k, we, O, K, le, dw);
    s.context = tw(null);
    l = s.current;
    y = is();
    y = Kt(y);
    k = no(y);
    k.callback = null;
    ro(l, k, y);
    l = y;
    s.current.lanes = l;
    et(s, l);
    Ks(s);
    t[zt] = s.current;
    Tm(t);
    return new Fd(s);
  };
  Vc.version = "19.2.7";
  return Vc;
}