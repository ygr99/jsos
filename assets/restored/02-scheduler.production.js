// [02-scheduler.production] 还原自 index-liunM0pp.js 第 691-1073 行（边界为近似值，无 sourcemap）
var Zm = {};
/**
* @license React
* scheduler.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var vw;
function uk() {
  if (!vw) {
    vw = 1;
    (function (e) {
      function n(G, q) {
        var U = G.length;
        G.push(q);
        e: while (U > 0) {
          var L = U - 1 >>> 1;
          var F = G[L];
          if (o(F, q) > 0) {
            G[L] = q;
            G[U] = F;
            U = L;
          } else {
            break e;
          }
        }
      }
      function r(G) {
        if (G.length === 0) {
          return null;
        } else {
          return G[0];
        }
      }
      function i(G) {
        if (G.length === 0) {
          return null;
        }
        var q = G[0];
        var U = G.pop();
        if (U !== q) {
          G[0] = U;
          e: for (var L = 0, F = G.length, P = F >>> 1; L < P;) {
            var V = (L + 1) * 2 - 1;
            var Z = G[V];
            var J = V + 1;
            var ne = G[J];
            if (o(Z, U) < 0) {
              if (J < F && o(ne, Z) < 0) {
                G[L] = ne;
                G[J] = U;
                L = J;
              } else {
                G[L] = Z;
                G[V] = U;
                L = V;
              }
            } else if (J < F && o(ne, U) < 0) {
              G[L] = ne;
              G[J] = U;
              L = J;
            } else {
              break e;
            }
          }
        }
        return q;
      }
      function o(G, q) {
        var U = G.sortIndex - q.sortIndex;
        if (U !== 0) {
          return U;
        } else {
          return G.id - q.id;
        }
      }
      e.unstable_now = undefined;
      if (typeof performance == "object" && typeof performance.now == "function") {
        var u = performance;
        e.unstable_now = function () {
          return u.now();
        };
      } else {
        var h = Date;
        var a = h.now();
        e.unstable_now = function () {
          return h.now() - a;
        };
      }
      var c = [];
      var d = [];
      var p = 1;
      var f = null;
      var S = 3;
      var _ = false;
      var x = false;
      var w = false;
      var g = false;
      var b = typeof setTimeout == "function" ? setTimeout : null;
      var m = typeof clearTimeout == "function" ? clearTimeout : null;
      var v = typeof setImmediate !== "undefined" ? setImmediate : null;
      function C(G) {
        for (var q = r(d); q !== null;) {
          if (q.callback === null) {
            i(d);
          } else if (q.startTime <= G) {
            i(d);
            q.sortIndex = q.expirationTime;
            n(c, q);
          } else {
            break;
          }
          q = r(d);
        }
      }
      function T(G) {
        w = false;
        C(G);
        if (!x) {
          if (r(c) !== null) {
            x = true;
            if (!A) {
              A = true;
              z();
            }
          } else {
            var q = r(d);
            if (q !== null) {
              $(T, q.startTime - G);
            }
          }
        }
      }
      var A = false;
      var M = -1;
      var R = 5;
      var I = -1;
      function j() {
        if (g) {
          return true;
        } else {
          return !(e.unstable_now() - I < R);
        }
      }
      function W() {
        g = false;
        if (A) {
          var G = e.unstable_now();
          I = G;
          var q = true;
          try {
            e: {
              x = false;
              if (w) {
                w = false;
                m(M);
                M = -1;
              }
              _ = true;
              var U = S;
              try {
                t: {
                  C(G);
                  f = r(c);
                  while (f !== null && (!(f.expirationTime > G) || !j())) {
                    var L = f.callback;
                    if (typeof L == "function") {
                      f.callback = null;
                      S = f.priorityLevel;
                      var F = L(f.expirationTime <= G);
                      G = e.unstable_now();
                      if (typeof F == "function") {
                        f.callback = F;
                        C(G);
                        q = true;
                        break t;
                      }
                      if (f === r(c)) {
                        i(c);
                      }
                      C(G);
                    } else {
                      i(c);
                    }
                    f = r(c);
                  }
                  if (f !== null) {
                    q = true;
                  } else {
                    var P = r(d);
                    if (P !== null) {
                      $(T, P.startTime - G);
                    }
                    q = false;
                  }
                }
                break e;
              } finally {
                f = null;
                S = U;
                _ = false;
              }
              q = undefined;
            }
          } finally {
            if (q) {
              z();
            } else {
              A = false;
            }
          }
        }
      }
      var z;
      if (typeof v == "function") {
        z = function () {
          v(W);
        };
      } else if (typeof MessageChannel !== "undefined") {
        var N = new MessageChannel();
        var D = N.port2;
        N.port1.onmessage = W;
        z = function () {
          D.postMessage(null);
        };
      } else {
        z = function () {
          b(W, 0);
        };
      }
      function $(G, q) {
        M = b(function () {
          G(e.unstable_now());
        }, q);
      }
      e.unstable_IdlePriority = 5;
      e.unstable_ImmediatePriority = 1;
      e.unstable_LowPriority = 4;
      e.unstable_NormalPriority = 3;
      e.unstable_Profiling = null;
      e.unstable_UserBlockingPriority = 2;
      e.unstable_cancelCallback = function (G) {
        G.callback = null;
      };
      e.unstable_forceFrameRate = function (G) {
        if (G < 0 || G > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        } else {
          R = G > 0 ? Math.floor(1000 / G) : 5;
        }
      };
      e.unstable_getCurrentPriorityLevel = function () {
        return S;
      };
      e.unstable_next = function (G) {
        switch (S) {
          case 1:
          case 2:
          case 3:
            var q = 3;
            break;
          default:
            q = S;
        }
        var U = S;
        S = q;
        try {
          return G();
        } finally {
          S = U;
        }
      };
      e.unstable_requestPaint = function () {
        g = true;
      };
      e.unstable_runWithPriority = function (G, q) {
        switch (G) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            G = 3;
        }
        var U = S;
        S = G;
        try {
          return q();
        } finally {
          S = U;
        }
      };
      e.unstable_scheduleCallback = function (G, q, U) {
        var L = e.unstable_now();
        if (typeof U == "object" && U !== null) {
          U = U.delay;
          U = typeof U == "number" && U > 0 ? L + U : L;
        } else {
          U = L;
        }
        switch (G) {
          case 1:
            var F = -1;
            break;
          case 2:
            F = 250;
            break;
          case 5:
            F = 1073741823;
            break;
          case 4:
            F = 10000;
            break;
          default:
            F = 5000;
        }
        F = U + F;
        G = {
          id: p++,
          callback: q,
          priorityLevel: G,
          startTime: U,
          expirationTime: F,
          sortIndex: -1
        };
        if (U > L) {
          G.sortIndex = U;
          n(d, G);
          if (r(c) === null && G === r(d)) {
            if (w) {
              m(M);
              M = -1;
            } else {
              w = true;
            }
            $(T, U - L);
          }
        } else {
          G.sortIndex = F;
          n(c, G);
          if (!x && !_) {
            x = true;
            if (!A) {
              A = true;
              z();
            }
          }
        }
        return G;
      };
      e.unstable_shouldYield = j;
      e.unstable_wrapCallback = function (G) {
        var q = S;
        return function () {
          var U = S;
          S = q;
          try {
            return G.apply(this, arguments);
          } finally {
            S = U;
          }
        };
      };
    })(Zm);
  }
  return Zm;
}
var bw;
function dk() {
  if (!bw) {
    bw = 1;
    Km.exports = uk();
  }
  return Km.exports;
}
var Qm = {
  exports: {}
};