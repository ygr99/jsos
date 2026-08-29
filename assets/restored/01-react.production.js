// [01-react.production] 还原自 index-liunM0pp.js 第 151-690 行（边界为近似值，无 sourcemap）
var At = {};
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var mw;
function lk() {
  if (mw) {
    return At;
  }
  mw = 1;
  var e = Symbol.for("react.transitional.element");
  var n = Symbol.for("react.portal");
  var r = Symbol.for("react.fragment");
  var i = Symbol.for("react.strict_mode");
  var o = Symbol.for("react.profiler");
  var u = Symbol.for("react.consumer");
  var h = Symbol.for("react.context");
  var a = Symbol.for("react.forward_ref");
  var c = Symbol.for("react.suspense");
  var d = Symbol.for("react.memo");
  var p = Symbol.for("react.lazy");
  var f = Symbol.for("react.activity");
  var S = Symbol.iterator;
  function _(P) {
    if (P === null || typeof P != "object") {
      return null;
    } else {
      P = S && P[S] || P["@@iterator"];
      if (typeof P == "function") {
        return P;
      } else {
        return null;
      }
    }
  }
  var x = {
    isMounted: function () {
      return false;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {}
  };
  var w = Object.assign;
  var g = {};
  function b(P, V, Z) {
    this.props = P;
    this.context = V;
    this.refs = g;
    this.updater = Z || x;
  }
  b.prototype.isReactComponent = {};
  b.prototype.setState = function (P, V) {
    if (typeof P != "object" && typeof P != "function" && P != null) {
      throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    }
    this.updater.enqueueSetState(this, P, V, "setState");
  };
  b.prototype.forceUpdate = function (P) {
    this.updater.enqueueForceUpdate(this, P, "forceUpdate");
  };
  function m() {}
  m.prototype = b.prototype;
  function v(P, V, Z) {
    this.props = P;
    this.context = V;
    this.refs = g;
    this.updater = Z || x;
  }
  var C = v.prototype = new m();
  C.constructor = v;
  w(C, b.prototype);
  C.isPureReactComponent = true;
  var T = Array.isArray;
  function A() {}
  var M = {
    H: null,
    A: null,
    T: null,
    S: null
  };
  var R = Object.prototype.hasOwnProperty;
  function I(P, V, Z) {
    var J = Z.ref;
    return {
      $$typeof: e,
      type: P,
      key: V,
      ref: J !== undefined ? J : null,
      props: Z
    };
  }
  function j(P, V) {
    return I(P.type, V, P.props);
  }
  function W(P) {
    return typeof P == "object" && P !== null && P.$$typeof === e;
  }
  function z(P) {
    var V = {
      "=": "=0",
      ":": "=2"
    };
    return "$" + P.replace(/[=:]/g, function (Z) {
      return V[Z];
    });
  }
  var N = /\/+/g;
  function D(P, V) {
    if (typeof P == "object" && P !== null && P.key != null) {
      return z("" + P.key);
    } else {
      return V.toString(36);
    }
  }
  function $(P) {
    switch (P.status) {
      case "fulfilled":
        return P.value;
      case "rejected":
        throw P.reason;
      default:
        if (typeof P.status == "string") {
          P.then(A, A);
        } else {
          P.status = "pending";
          P.then(function (V) {
            if (P.status === "pending") {
              P.status = "fulfilled";
              P.value = V;
            }
          }, function (V) {
            if (P.status === "pending") {
              P.status = "rejected";
              P.reason = V;
            }
          });
        }
        switch (P.status) {
          case "fulfilled":
            return P.value;
          case "rejected":
            throw P.reason;
        }
    }
    throw P;
  }
  function G(P, V, Z, J, ne) {
    var ue = typeof P;
    if (ue === "undefined" || ue === "boolean") {
      P = null;
    }
    var ee = false;
    if (P === null) {
      ee = true;
    } else {
      switch (ue) {
        case "bigint":
        case "string":
        case "number":
          ee = true;
          break;
        case "object":
          switch (P.$$typeof) {
            case e:
            case n:
              ee = true;
              break;
            case p:
              ee = P._init;
              return G(ee(P._payload), V, Z, J, ne);
          }
      }
    }
    if (ee) {
      ne = ne(P);
      ee = J === "" ? "." + D(P, 0) : J;
      if (T(ne)) {
        Z = "";
        if (ee != null) {
          Z = ee.replace(N, "$&/") + "/";
        }
        G(ne, V, Z, "", function (ce) {
          return ce;
        });
      } else if (ne != null) {
        if (W(ne)) {
          ne = j(ne, Z + (ne.key == null || P && P.key === ne.key ? "" : ("" + ne.key).replace(N, "$&/") + "/") + ee);
        }
        V.push(ne);
      }
      return 1;
    }
    ee = 0;
    var Y = J === "" ? "." : J + ":";
    if (T(P)) {
      for (var re = 0; re < P.length; re++) {
        J = P[re];
        ue = Y + D(J, re);
        ee += G(J, V, Z, ue, ne);
      }
    } else {
      re = _(P);
      if (typeof re == "function") {
        P = re.call(P);
        re = 0;
        while (!(J = P.next()).done) {
          J = J.value;
          ue = Y + D(J, re++);
          ee += G(J, V, Z, ue, ne);
        }
      } else if (ue === "object") {
        if (typeof P.then == "function") {
          return G($(P), V, Z, J, ne);
        }
        V = String(P);
        throw Error("Objects are not valid as a React child (found: " + (V === "[object Object]" ? "object with keys {" + Object.keys(P).join(", ") + "}" : V) + "). If you meant to render a collection of children, use an array instead.");
      }
    }
    return ee;
  }
  function q(P, V, Z) {
    if (P == null) {
      return P;
    }
    var J = [];
    var ne = 0;
    G(P, J, "", "", function (ue) {
      return V.call(Z, ue, ne++);
    });
    return J;
  }
  function U(P) {
    if (P._status === -1) {
      var V = P._result;
      V = V();
      V.then(function (Z) {
        if (P._status === 0 || P._status === -1) {
          P._status = 1;
          P._result = Z;
        }
      }, function (Z) {
        if (P._status === 0 || P._status === -1) {
          P._status = 2;
          P._result = Z;
        }
      });
      if (P._status === -1) {
        P._status = 0;
        P._result = V;
      }
    }
    if (P._status === 1) {
      return P._result.default;
    }
    throw P._result;
  }
  var L = typeof reportError == "function" ? reportError : function (P) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var V = new window.ErrorEvent("error", {
        bubbles: true,
        cancelable: true,
        message: typeof P == "object" && P !== null && typeof P.message == "string" ? String(P.message) : String(P),
        error: P
      });
      if (!window.dispatchEvent(V)) {
        return;
      }
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", P);
      return;
    }
    console.error(P);
  };
  var F = {
    map: q,
    forEach: function (P, V, Z) {
      q(P, function () {
        V.apply(this, arguments);
      }, Z);
    },
    count: function (P) {
      var V = 0;
      q(P, function () {
        V++;
      });
      return V;
    },
    toArray: function (P) {
      return q(P, function (V) {
        return V;
      }) || [];
    },
    only: function (P) {
      if (!W(P)) {
        throw Error("React.Children.only expected to receive a single React element child.");
      }
      return P;
    }
  };
  At.Activity = f;
  At.Children = F;
  At.Component = b;
  At.Fragment = r;
  At.Profiler = o;
  At.PureComponent = v;
  At.StrictMode = i;
  At.Suspense = c;
  At.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = M;
  At.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function (P) {
      return M.H.useMemoCache(P);
    }
  };
  At.cache = function (P) {
    return function () {
      return P.apply(null, arguments);
    };
  };
  At.cacheSignal = function () {
    return null;
  };
  At.cloneElement = function (P, V, Z) {
    if (P == null) {
      throw Error("The argument must be a React element, but you passed " + P + ".");
    }
    var J = w({}, P.props);
    var ne = P.key;
    if (V != null) {
      if (V.key !== undefined) {
        ne = "" + V.key;
      }
      for (ue in V) {
        if (!!R.call(V, ue) && ue !== "key" && ue !== "__self" && ue !== "__source" && (ue !== "ref" || V.ref !== undefined)) {
          J[ue] = V[ue];
        }
      }
    }
    var ue = arguments.length - 2;
    if (ue === 1) {
      J.children = Z;
    } else if (ue > 1) {
      var ee = Array(ue);
      for (var Y = 0; Y < ue; Y++) {
        ee[Y] = arguments[Y + 2];
      }
      J.children = ee;
    }
    return I(P.type, ne, J);
  };
  At.createContext = function (P) {
    P = {
      $$typeof: h,
      _currentValue: P,
      _currentValue2: P,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    };
    P.Provider = P;
    P.Consumer = {
      $$typeof: u,
      _context: P
    };
    return P;
  };
  At.createElement = function (P, V, Z) {
    var J;
    var ne = {};
    var ue = null;
    if (V != null) {
      if (V.key !== undefined) {
        ue = "" + V.key;
      }
      for (J in V) {
        if (R.call(V, J) && J !== "key" && J !== "__self" && J !== "__source") {
          ne[J] = V[J];
        }
      }
    }
    var ee = arguments.length - 2;
    if (ee === 1) {
      ne.children = Z;
    } else if (ee > 1) {
      var Y = Array(ee);
      for (var re = 0; re < ee; re++) {
        Y[re] = arguments[re + 2];
      }
      ne.children = Y;
    }
    if (P && P.defaultProps) {
      ee = P.defaultProps;
      for (J in ee) {
        if (ne[J] === undefined) {
          ne[J] = ee[J];
        }
      }
    }
    return I(P, ue, ne);
  };
  At.createRef = function () {
    return {
      current: null
    };
  };
  At.forwardRef = function (P) {
    return {
      $$typeof: a,
      render: P
    };
  };
  At.isValidElement = W;
  At.lazy = function (P) {
    return {
      $$typeof: p,
      _payload: {
        _status: -1,
        _result: P
      },
      _init: U
    };
  };
  At.memo = function (P, V) {
    return {
      $$typeof: d,
      type: P,
      compare: V === undefined ? null : V
    };
  };
  At.startTransition = function (P) {
    var V = M.T;
    var Z = {};
    M.T = Z;
    try {
      var J = P();
      var ne = M.S;
      if (ne !== null) {
        ne(Z, J);
      }
      if (typeof J == "object" && J !== null && typeof J.then == "function") {
        J.then(A, L);
      }
    } catch (ue) {
      L(ue);
    } finally {
      if (V !== null && Z.types !== null) {
        V.types = Z.types;
      }
      M.T = V;
    }
  };
  At.unstable_useCacheRefresh = function () {
    return M.H.useCacheRefresh();
  };
  At.use = function (P) {
    return M.H.use(P);
  };
  At.useActionState = function (P, V, Z) {
    return M.H.useActionState(P, V, Z);
  };
  At.useCallback = function (P, V) {
    return M.H.useCallback(P, V);
  };
  At.useContext = function (P) {
    return M.H.useContext(P);
  };
  At.useDebugValue = function () {};
  At.useDeferredValue = function (P, V) {
    return M.H.useDeferredValue(P, V);
  };
  At.useEffect = function (P, V) {
    return M.H.useEffect(P, V);
  };
  At.useEffectEvent = function (P) {
    return M.H.useEffectEvent(P);
  };
  At.useId = function () {
    return M.H.useId();
  };
  At.useImperativeHandle = function (P, V, Z) {
    return M.H.useImperativeHandle(P, V, Z);
  };
  At.useInsertionEffect = function (P, V) {
    return M.H.useInsertionEffect(P, V);
  };
  At.useLayoutEffect = function (P, V) {
    return M.H.useLayoutEffect(P, V);
  };
  At.useMemo = function (P, V) {
    return M.H.useMemo(P, V);
  };
  At.useOptimistic = function (P, V) {
    return M.H.useOptimistic(P, V);
  };
  At.useReducer = function (P, V, Z) {
    return M.H.useReducer(P, V, Z);
  };
  At.useRef = function (P) {
    return M.H.useRef(P);
  };
  At.useState = function (P) {
    return M.H.useState(P);
  };
  At.useSyncExternalStore = function (P, V, Z) {
    return M.H.useSyncExternalStore(P, V, Z);
  };
  At.useTransition = function () {
    return M.H.useTransition();
  };
  At.version = "19.2.7";
  return At;
}
var gw;
function vu() {
  if (!gw) {
    gw = 1;
    Ym.exports = lk();
  }
  return Ym.exports;
}
var E = vu();
const Dn = Tv(E);
const ck = ik({
  __proto__: null,
  default: Dn
}, [E]);
var Xm = {
  exports: {}
};
var Vc = {};
var Km = {
  exports: {}
};