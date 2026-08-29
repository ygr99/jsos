// [10-use-sync-external-store] 还原自 index-liunM0pp.js 第 53752-53926 行（边界为近似值，无 sourcemap）
var Lg = {};
/**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var US;
function UL() {
  if (US) {
    return Lg;
  }
  US = 1;
  var e = vu();
  function n(f, S) {
    return f === S && (f !== 0 || 1 / f === 1 / S) || f !== f && S !== S;
  }
  var r = typeof Object.is == "function" ? Object.is : n;
  var i = e.useState;
  var o = e.useEffect;
  var u = e.useLayoutEffect;
  var h = e.useDebugValue;
  function a(f, S) {
    var _ = S();
    var x = i({
      inst: {
        value: _,
        getSnapshot: S
      }
    });
    var w = x[0].inst;
    var g = x[1];
    u(function () {
      w.value = _;
      w.getSnapshot = S;
      if (c(w)) {
        g({
          inst: w
        });
      }
    }, [f, _, S]);
    o(function () {
      if (c(w)) {
        g({
          inst: w
        });
      }
      return f(function () {
        if (c(w)) {
          g({
            inst: w
          });
        }
      });
    }, [f]);
    h(_);
    return _;
  }
  function c(f) {
    var S = f.getSnapshot;
    f = f.value;
    try {
      var _ = S();
      return !r(f, _);
    } catch {
      return true;
    }
  }
  function d(f, S) {
    return S();
  }
  var p = typeof window === "undefined" || typeof window.document === "undefined" || typeof window.document.createElement === "undefined" ? d : a;
  Lg.useSyncExternalStore = e.useSyncExternalStore !== undefined ? e.useSyncExternalStore : p;
  return Lg;
}
var VS;
function yE() {
  if (!VS) {
    VS = 1;
    Ig.exports = UL();
  }
  return Ig.exports;
}
var ob = yE();
var Pg = {
  exports: {}
};
var Bg = {};
/**
* @license React
* use-sync-external-store-shim/with-selector.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var WS;
function VL() {
  if (WS) {
    return Bg;
  }
  WS = 1;
  var e = vu();
  var n = yE();
  function r(d, p) {
    return d === p && (d !== 0 || 1 / d === 1 / p) || d !== d && p !== p;
  }
  var i = typeof Object.is == "function" ? Object.is : r;
  var o = n.useSyncExternalStore;
  var u = e.useRef;
  var h = e.useEffect;
  var a = e.useMemo;
  var c = e.useDebugValue;
  Bg.useSyncExternalStoreWithSelector = function (d, p, f, S, _) {
    var x = u(null);
    if (x.current === null) {
      var w = {
        hasValue: false,
        value: null
      };
      x.current = w;
    } else {
      w = x.current;
    }
    x = a(function () {
      function b(A) {
        if (!m) {
          m = true;
          v = A;
          A = S(A);
          if (_ !== undefined && w.hasValue) {
            var M = w.value;
            if (_(M, A)) {
              return C = M;
            }
          }
          return C = A;
        }
        M = C;
        if (i(v, A)) {
          return M;
        }
        var R = S(A);
        if (_ !== undefined && _(M, R)) {
          v = A;
          return M;
        } else {
          v = A;
          return C = R;
        }
      }
      var m = false;
      var v;
      var C;
      var T = f === undefined ? null : f;
      return [function () {
        return b(p());
      }, T === null ? undefined : function () {
        return b(T());
      }];
    }, [p, f, S, _]);
    var g = o(d, x[0], x[1]);
    h(function () {
      w.hasValue = true;
      w.value = g;
    }, [g]);
    c(g);
    return g;
  };
  return Bg;
}