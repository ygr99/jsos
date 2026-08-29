// [00-prelude-and-jsx-runtime] 还原自 index-liunM0pp.js 第 1-150 行（边界为近似值，无 sourcemap）
var rk = Object.defineProperty;
var sk = (e, n, r) => n in e ? rk(e, n, {
  enumerable: true,
  configurable: true,
  writable: true,
  value: r
}) : e[n] = r;
var tt = (e, n, r) => sk(e, typeof n != "symbol" ? n + "" : n, r);
function ik(e, n) {
  for (var r = 0; r < n.length; r++) {
    const i = n[r];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const o in i) {
        if (o !== "default" && !(o in e)) {
          const u = Object.getOwnPropertyDescriptor(i, o);
          if (u) {
            Object.defineProperty(e, o, u.get ? u : {
              enumerable: true,
              get: () => i[o]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, {
    value: "Module"
  }));
}
(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) {
    return;
  }
  for (const o of document.querySelectorAll("link[rel=\"modulepreload\"]")) {
    i(o);
  }
  new MutationObserver(o => {
    for (const u of o) {
      if (u.type === "childList") {
        for (const h of u.addedNodes) {
          if (h.tagName === "LINK" && h.rel === "modulepreload") {
            i(h);
          }
        }
      }
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function r(o) {
    const u = {};
    if (o.integrity) {
      u.integrity = o.integrity;
    }
    if (o.referrerPolicy) {
      u.referrerPolicy = o.referrerPolicy;
    }
    if (o.crossOrigin === "use-credentials") {
      u.credentials = "include";
    } else if (o.crossOrigin === "anonymous") {
      u.credentials = "omit";
    } else {
      u.credentials = "same-origin";
    }
    return u;
  }
  function i(o) {
    if (o.ep) {
      return;
    }
    o.ep = true;
    const u = r(o);
    fetch(o.href, u);
  }
})();
var Vd = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function Tv(e) {
  if (e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")) {
    return e.default;
  } else {
    return e;
  }
}
var Gm = {
  exports: {}
};
var Uc = {};
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var hw;
function ok() {
  if (hw) {
    return Uc;
  }
  hw = 1;
  var e = Symbol.for("react.transitional.element");
  var n = Symbol.for("react.fragment");
  function r(i, o, u) {
    var h = null;
    if (u !== undefined) {
      h = "" + u;
    }
    if (o.key !== undefined) {
      h = "" + o.key;
    }
    if ("key" in o) {
      u = {};
      for (var a in o) {
        if (a !== "key") {
          u[a] = o[a];
        }
      }
    } else {
      u = o;
    }
    o = u.ref;
    return {
      $$typeof: e,
      type: i,
      key: h,
      ref: o !== undefined ? o : null,
      props: u
    };
  }
  Uc.Fragment = n;
  Uc.jsx = r;
  Uc.jsxs = r;
  return Uc;
}
var pw;
function ak() {
  if (!pw) {
    pw = 1;
    Gm.exports = ok();
  }
  return Gm.exports;
}
var B = ak();
var Ym = {
  exports: {}
};