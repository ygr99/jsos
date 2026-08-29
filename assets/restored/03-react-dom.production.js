// [03-react-dom.production] 还原自 index-liunM0pp.js 第 1074-1290 行（边界为近似值，无 sourcemap）
var Sr = {};
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var yw;
function fk() {
  if (yw) {
    return Sr;
  }
  yw = 1;
  var e = vu();
  function n(c) {
    var d = "https://react.dev/errors/" + c;
    if (arguments.length > 1) {
      d += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var p = 2; p < arguments.length; p++) {
        d += "&args[]=" + encodeURIComponent(arguments[p]);
      }
    }
    return "Minified React error #" + c + "; visit " + d + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {}
  var i = {
    d: {
      f: r,
      r: function () {
        throw Error(n(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
    },
    p: 0,
    findDOMNode: null
  };
  var o = Symbol.for("react.portal");
  function u(c, d, p, f = null) {
    return {
      $$typeof: o,
      key: f == null ? null : "" + f,
      children: c,
      containerInfo: d,
      implementation: p
    };
  }
  var h = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function a(c, d) {
    if (c === "font") {
      return "";
    }
    if (typeof d == "string") {
      if (d === "use-credentials") {
        return d;
      } else {
        return "";
      }
    }
  }
  Sr.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i;
  Sr.createPortal = function (c, d, p = null) {
    if (!d || d.nodeType !== 1 && d.nodeType !== 9 && d.nodeType !== 11) {
      throw Error(n(299));
    }
    return u(c, d, null, p);
  };
  Sr.flushSync = function (c) {
    var d = h.T;
    var p = i.p;
    try {
      h.T = null;
      i.p = 2;
      if (c) {
        return c();
      }
    } finally {
      h.T = d;
      i.p = p;
      i.d.f();
    }
  };
  Sr.preconnect = function (c, d) {
    if (typeof c == "string") {
      if (d) {
        d = d.crossOrigin;
        d = typeof d == "string" ? d === "use-credentials" ? d : "" : undefined;
      } else {
        d = null;
      }
      i.d.C(c, d);
    }
  };
  Sr.prefetchDNS = function (c) {
    if (typeof c == "string") {
      i.d.D(c);
    }
  };
  Sr.preinit = function (c, d) {
    if (typeof c == "string" && d && typeof d.as == "string") {
      var p = d.as;
      var f = a(p, d.crossOrigin);
      var S = typeof d.integrity == "string" ? d.integrity : undefined;
      var _ = typeof d.fetchPriority == "string" ? d.fetchPriority : undefined;
      if (p === "style") {
        i.d.S(c, typeof d.precedence == "string" ? d.precedence : undefined, {
          crossOrigin: f,
          integrity: S,
          fetchPriority: _
        });
      } else if (p === "script") {
        i.d.X(c, {
          crossOrigin: f,
          integrity: S,
          fetchPriority: _,
          nonce: typeof d.nonce == "string" ? d.nonce : undefined
        });
      }
    }
  };
  Sr.preinitModule = function (c, d) {
    if (typeof c == "string") {
      if (typeof d == "object" && d !== null) {
        if (d.as == null || d.as === "script") {
          var p = a(d.as, d.crossOrigin);
          i.d.M(c, {
            crossOrigin: p,
            integrity: typeof d.integrity == "string" ? d.integrity : undefined,
            nonce: typeof d.nonce == "string" ? d.nonce : undefined
          });
        }
      } else if (d == null) {
        i.d.M(c);
      }
    }
  };
  Sr.preload = function (c, d) {
    if (typeof c == "string" && typeof d == "object" && d !== null && typeof d.as == "string") {
      var p = d.as;
      var f = a(p, d.crossOrigin);
      i.d.L(c, p, {
        crossOrigin: f,
        integrity: typeof d.integrity == "string" ? d.integrity : undefined,
        nonce: typeof d.nonce == "string" ? d.nonce : undefined,
        type: typeof d.type == "string" ? d.type : undefined,
        fetchPriority: typeof d.fetchPriority == "string" ? d.fetchPriority : undefined,
        referrerPolicy: typeof d.referrerPolicy == "string" ? d.referrerPolicy : undefined,
        imageSrcSet: typeof d.imageSrcSet == "string" ? d.imageSrcSet : undefined,
        imageSizes: typeof d.imageSizes == "string" ? d.imageSizes : undefined,
        media: typeof d.media == "string" ? d.media : undefined
      });
    }
  };
  Sr.preloadModule = function (c, d) {
    if (typeof c == "string") {
      if (d) {
        var p = a(d.as, d.crossOrigin);
        i.d.m(c, {
          as: typeof d.as == "string" && d.as !== "script" ? d.as : undefined,
          crossOrigin: p,
          integrity: typeof d.integrity == "string" ? d.integrity : undefined
        });
      } else {
        i.d.m(c);
      }
    }
  };
  Sr.requestFormReset = function (c) {
    i.d.r(c);
  };
  Sr.unstable_batchedUpdates = function (c, d) {
    return c(d);
  };
  Sr.useFormState = function (c, d, p) {
    return h.H.useFormState(c, d, p);
  };
  Sr.useFormStatus = function () {
    return h.H.useHostTransitionStatus();
  };
  Sr.version = "19.2.7";
  return Sr;
}
var _w;
function $x() {
  if (_w) {
    return Qm.exports;
  }
  _w = 1;
  function e() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") {
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
      } catch (n) {
        console.error(n);
      }
    }
  }
  e();
  Qm.exports = fk();
  return Qm.exports;
} /**
  * @license React
  * react-dom-client.production.js
  *
  * Copyright (c) Meta Platforms, Inc. and affiliates.
  *
  * This source code is licensed under the MIT license found in the
  * LICENSE file in the root directory of this source tree.
  */