// [05-app-consts-and-misc] 还原自 index-liunM0pp.js 第 15723-22203 行（边界为近似值，无 sourcemap）
var Sw;
function pk() {
  if (Sw) {
    return Xm.exports;
  }
  Sw = 1;
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
  Xm.exports = hk();
  return Xm.exports;
}
var mk = pk();
const gk = Tv(mk);
function xw(e) {
  return e !== null && typeof e == "object" && "constructor" in e && e.constructor === Object;
}
function kv(e = {}, n = {}) {
  const r = ["__proto__", "constructor", "prototype"];
  Object.keys(n).filter(i => r.indexOf(i) < 0).forEach(i => {
    if (typeof e[i] === "undefined") {
      e[i] = n[i];
    } else if (xw(n[i]) && xw(e[i]) && Object.keys(n[i]).length > 0) {
      kv(e[i], n[i]);
    }
  });
}
const qx = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: {
    blur() {},
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {}
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function Da() {
  const e = typeof document !== "undefined" ? document : {};
  kv(e, qx);
  return e;
}
const vk = {
  document: qx,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {},
    pushState() {},
    go() {},
    back() {}
  },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(e) {
    if (typeof setTimeout === "undefined") {
      e();
      return null;
    } else {
      return setTimeout(e, 0);
    }
  },
  cancelAnimationFrame(e) {
    if (typeof setTimeout !== "undefined") {
      clearTimeout(e);
    }
  }
};
function Ir() {
  const e = typeof window !== "undefined" ? window : {};
  kv(e, vk);
  return e;
}
function bk(e = "") {
  return e.trim().split(" ").filter(n => !!n.trim());
}
function yk(e) {
  const n = e;
  Object.keys(n).forEach(r => {
    try {
      n[r] = null;
    } catch {}
    try {
      delete n[r];
    } catch {}
  });
}
function Gx(e, n = 0) {
  return setTimeout(e, n);
}
function Lf() {
  return Date.now();
}
function _k(e) {
  const n = Ir();
  let r;
  if (n.getComputedStyle) {
    r = n.getComputedStyle(e, null);
  }
  if (!r && e.currentStyle) {
    r = e.currentStyle;
  }
  r ||= e.style;
  return r;
}
function wk(e, n = "x") {
  const r = Ir();
  let i;
  let o;
  let u;
  const h = _k(e);
  if (r.WebKitCSSMatrix) {
    o = h.transform || h.webkitTransform;
    if (o.split(",").length > 6) {
      o = o.split(", ").map(a => a.replace(",", ".")).join(", ");
    }
    u = new r.WebKitCSSMatrix(o === "none" ? "" : o);
  } else {
    u = h.MozTransform || h.OTransform || h.MsTransform || h.msTransform || h.transform || h.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
    i = u.toString().split(",");
  }
  if (n === "x") {
    if (r.WebKitCSSMatrix) {
      o = u.m41;
    } else if (i.length === 16) {
      o = parseFloat(i[12]);
    } else {
      o = parseFloat(i[4]);
    }
  }
  if (n === "y") {
    if (r.WebKitCSSMatrix) {
      o = u.m42;
    } else if (i.length === 16) {
      o = parseFloat(i[13]);
    } else {
      o = parseFloat(i[5]);
    }
  }
  return o || 0;
}
function Wd(e) {
  return typeof e == "object" && e !== null && e.constructor && Object.prototype.toString.call(e).slice(8, -1) === "Object";
}
function Sk(e) {
  if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
    return e instanceof HTMLElement;
  } else {
    return e && (e.nodeType === 1 || e.nodeType === 11);
  }
}
function os(...e) {
  const n = Object(e[0]);
  for (let r = 1; r < e.length; r += 1) {
    const i = e[r];
    if (i != null && !Sk(i)) {
      const o = Object.keys(Object(i)).filter(u => u !== "__proto__" && u !== "constructor" && u !== "prototype");
      for (let u = 0, h = o.length; u < h; u += 1) {
        const a = o[u];
        const c = Object.getOwnPropertyDescriptor(i, a);
        if (c !== undefined && c.enumerable) {
          if (Wd(n[a]) && Wd(i[a])) {
            if (i[a].__swiper__) {
              n[a] = i[a];
            } else {
              os(n[a], i[a]);
            }
          } else if (!Wd(n[a]) && Wd(i[a])) {
            n[a] = {};
            if (i[a].__swiper__) {
              n[a] = i[a];
            } else {
              os(n[a], i[a]);
            }
          } else {
            n[a] = i[a];
          }
        }
      }
    }
  }
  return n;
}
function El(e, n, r) {
  e.style.setProperty(n, r);
}
function Yx({
  swiper: e,
  targetPosition: n,
  side: r
}) {
  const i = Ir();
  const o = -e.translate;
  let u = null;
  let h;
  const a = e.params.speed;
  e.wrapperEl.style.scrollSnapType = "none";
  i.cancelAnimationFrame(e.cssModeFrameID);
  const c = n > o ? "next" : "prev";
  const d = (f, S) => c === "next" && f >= S || c === "prev" && f <= S;
  const p = () => {
    h = new Date().getTime();
    if (u === null) {
      u = h;
    }
    const f = Math.max(Math.min((h - u) / a, 1), 0);
    const S = 0.5 - Math.cos(f * Math.PI) / 2;
    let _ = o + S * (n - o);
    if (d(_, n)) {
      _ = n;
    }
    e.wrapperEl.scrollTo({
      [r]: _
    });
    if (d(_, n)) {
      e.wrapperEl.style.overflow = "hidden";
      e.wrapperEl.style.scrollSnapType = "";
      setTimeout(() => {
        e.wrapperEl.style.overflow = "";
        e.wrapperEl.scrollTo({
          [r]: _
        });
      });
      i.cancelAnimationFrame(e.cssModeFrameID);
      return;
    }
    e.cssModeFrameID = i.requestAnimationFrame(p);
  };
  p();
}
function zi(e, n = "") {
  const r = Ir();
  const i = [...e.children];
  if (r.HTMLSlotElement && e instanceof HTMLSlotElement) {
    i.push(...e.assignedElements());
  }
  if (n) {
    return i.filter(o => o.matches(n));
  } else {
    return i;
  }
}
function xk(e, n) {
  const r = [n];
  while (r.length > 0) {
    const i = r.shift();
    if (e === i) {
      return true;
    }
    r.push(...i.children, ...(i.shadowRoot ? i.shadowRoot.children : []), ...(i.assignedElements ? i.assignedElements() : []));
  }
}
function Ck(e, n) {
  const r = Ir();
  let i = n.contains(e);
  if (!i && r.HTMLSlotElement && n instanceof HTMLSlotElement) {
    i = [...n.assignedElements()].includes(e);
    i ||= xk(e, n);
  }
  return i;
}
function Pf(e) {
  try {
    console.warn(e);
    return;
  } catch {}
}
function $g(e, n = []) {
  const r = document.createElement(e);
  r.classList.add(...(Array.isArray(n) ? n : bk(n)));
  return r;
}
function Ek(e, n) {
  const r = [];
  while (e.previousElementSibling) {
    const i = e.previousElementSibling;
    if (n) {
      if (i.matches(n)) {
        r.push(i);
      }
    } else {
      r.push(i);
    }
    e = i;
  }
  return r;
}
function Rk(e, n) {
  const r = [];
  while (e.nextElementSibling) {
    const i = e.nextElementSibling;
    if (n) {
      if (i.matches(n)) {
        r.push(i);
      }
    } else {
      r.push(i);
    }
    e = i;
  }
  return r;
}
function So(e, n) {
  return Ir().getComputedStyle(e, null).getPropertyValue(n);
}
function Cw(e) {
  let n = e;
  let r;
  if (n) {
    for (r = 0; (n = n.previousSibling) !== null;) {
      if (n.nodeType === 1) {
        r += 1;
      }
    }
    return r;
  }
}
function Tk(e, n) {
  const r = [];
  let i = e.parentElement;
  while (i) {
    r.push(i);
    i = i.parentElement;
  }
  return r;
}
function Ew(e, n, r) {
  const i = Ir();
  return e[n === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(e, null).getPropertyValue(n === "width" ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(e, null).getPropertyValue(n === "width" ? "margin-left" : "margin-bottom"));
}
function Rw(e, n = "") {
  if (typeof trustedTypes !== "undefined") {
    e.innerHTML = trustedTypes.createPolicy("html", {
      createHTML: r => r
    }).createHTML(n);
  } else {
    e.innerHTML = n;
  }
}
let Jm;
function kk() {
  const e = Ir();
  const n = Da();
  return {
    smoothScroll: n.documentElement && n.documentElement.style && "scrollBehavior" in n.documentElement.style,
    touch: !!("ontouchstart" in e) || !!e.DocumentTouch && !!(n instanceof e.DocumentTouch)
  };
}
function Xx() {
  Jm ||= kk();
  return Jm;
}
let eg;
function Ak({
  userAgent: e
} = {}) {
  const n = Xx();
  const r = Ir();
  const i = r.navigator.platform;
  const o = e || r.navigator.userAgent;
  const u = {
    ios: false,
    android: false
  };
  const h = r.screen.width;
  const a = r.screen.height;
  const c = o.match(/(Android);?[\s\/]+([\d.]+)?/);
  let d = o.match(/(iPad)(?!\1).*OS\s([\d_]+)/);
  const p = o.match(/(iPod)(.*OS\s([\d_]+))?/);
  const f = !d && o.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  const S = i === "Win32";
  let _ = i === "MacIntel";
  const x = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  if (!d && _ && n.touch && x.indexOf(`${h}x${a}`) >= 0) {
    d = o.match(/(Version)\/([\d.]+)/);
    d ||= [0, 1, "13_0_0"];
    _ = false;
  }
  if (c && !S) {
    u.os = "android";
    u.android = true;
  }
  if (d || f || p) {
    u.os = "ios";
    u.ios = true;
  }
  return u;
}
function Kx(e = {}) {
  eg ||= Ak(e);
  return eg;
}
let tg;
function Mk() {
  const e = Ir();
  const n = Kx();
  let r = false;
  function i() {
    const a = e.navigator.userAgent.toLowerCase();
    return a.indexOf("safari") >= 0 && a.indexOf("chrome") < 0 && a.indexOf("android") < 0;
  }
  if (i()) {
    const a = String(e.navigator.userAgent);
    if (a.includes("Version/")) {
      const [c, d] = a.split("Version/")[1].split(" ")[0].split(".").map(p => Number(p));
      r = c < 16 || c === 16 && d < 2;
    }
  }
  const o = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent);
  const u = i();
  const h = u || o && n.ios;
  return {
    isSafari: r || u,
    needPerspectiveFix: r,
    need3dFix: h,
    isWebView: o
  };
}
function Zx() {
  tg ||= Mk();
  return tg;
}
function Ok({
  swiper: e,
  on: n,
  emit: r
}) {
  const i = Ir();
  let o = null;
  let u = null;
  const h = () => {
    if (!!e && !e.destroyed && !!e.initialized) {
      r("beforeResize");
      r("resize");
    }
  };
  const a = () => {
    if (!!e && !e.destroyed && !!e.initialized) {
      o = new ResizeObserver(p => {
        u = i.requestAnimationFrame(() => {
          const {
            width: f,
            height: S
          } = e;
          let _ = f;
          let x = S;
          p.forEach(({
            contentBoxSize: w,
            contentRect: g,
            target: b
          }) => {
            if (!b || b === e.el) {
              _ = g ? g.width : (w[0] || w).inlineSize;
              x = g ? g.height : (w[0] || w).blockSize;
            }
          });
          if (_ !== f || x !== S) {
            h();
          }
        });
      });
      o.observe(e.el);
    }
  };
  const c = () => {
    if (u) {
      i.cancelAnimationFrame(u);
    }
    if (o && o.unobserve && e.el) {
      o.unobserve(e.el);
      o = null;
    }
  };
  const d = () => {
    if (!!e && !e.destroyed && !!e.initialized) {
      r("orientationchange");
    }
  };
  n("init", () => {
    if (e.params.resizeObserver && typeof i.ResizeObserver !== "undefined") {
      a();
      return;
    }
    i.addEventListener("resize", h);
    i.addEventListener("orientationchange", d);
  });
  n("destroy", () => {
    c();
    i.removeEventListener("resize", h);
    i.removeEventListener("orientationchange", d);
  });
}
function Dk({
  swiper: e,
  extendParams: n,
  on: r,
  emit: i
}) {
  const o = [];
  const u = Ir();
  const h = (d, p = {}) => {
    const f = u.MutationObserver || u.WebkitMutationObserver;
    const S = new f(_ => {
      if (e.__preventObserver__) {
        return;
      }
      if (_.length === 1) {
        i("observerUpdate", _[0]);
        return;
      }
      const x = function () {
        i("observerUpdate", _[0]);
      };
      if (u.requestAnimationFrame) {
        u.requestAnimationFrame(x);
      } else {
        u.setTimeout(x, 0);
      }
    });
    S.observe(d, {
      attributes: typeof p.attributes === "undefined" ? true : p.attributes,
      childList: e.isElement || (typeof p.childList === "undefined" ? true : p).childList,
      characterData: typeof p.characterData === "undefined" ? true : p.characterData
    });
    o.push(S);
  };
  const a = () => {
    if (e.params.observer) {
      if (e.params.observeParents) {
        const d = Tk(e.hostEl);
        for (let p = 0; p < d.length; p += 1) {
          h(d[p]);
        }
      }
      h(e.hostEl, {
        childList: e.params.observeSlideChildren
      });
      h(e.wrapperEl, {
        attributes: false
      });
    }
  };
  const c = () => {
    o.forEach(d => {
      d.disconnect();
    });
    o.splice(0, o.length);
  };
  n({
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  });
  r("init", a);
  r("destroy", c);
}
var Ik = {
  on(e, n, r) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof n != "function") {
      return i;
    }
    const o = r ? "unshift" : "push";
    e.split(" ").forEach(u => {
      i.eventsListeners[u] ||= [];
      i.eventsListeners[u][o](n);
    });
    return i;
  },
  once(e, n, r) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof n != "function") {
      return i;
    }
    function o(...u) {
      i.off(e, o);
      if (o.__emitterProxy) {
        delete o.__emitterProxy;
      }
      n.apply(i, u);
    }
    o.__emitterProxy = n;
    return i.on(e, o, r);
  },
  onAny(e, n) {
    const r = this;
    if (!r.eventsListeners || r.destroyed || typeof e != "function") {
      return r;
    }
    const i = n ? "unshift" : "push";
    if (r.eventsAnyListeners.indexOf(e) < 0) {
      r.eventsAnyListeners[i](e);
    }
    return r;
  },
  offAny(e) {
    const n = this;
    if (!n.eventsListeners || n.destroyed || !n.eventsAnyListeners) {
      return n;
    }
    const r = n.eventsAnyListeners.indexOf(e);
    if (r >= 0) {
      n.eventsAnyListeners.splice(r, 1);
    }
    return n;
  },
  off(e, n) {
    const r = this;
    if (!!r.eventsListeners && !r.destroyed && !!r.eventsListeners) {
      e.split(" ").forEach(i => {
        if (typeof n === "undefined") {
          r.eventsListeners[i] = [];
        } else if (r.eventsListeners[i]) {
          r.eventsListeners[i].forEach((o, u) => {
            if (o === n || o.__emitterProxy && o.__emitterProxy === n) {
              r.eventsListeners[i].splice(u, 1);
            }
          });
        }
      });
    }
    return r;
  },
  emit(...e) {
    const n = this;
    if (!n.eventsListeners || n.destroyed || !n.eventsListeners) {
      return n;
    }
    let r;
    let i;
    let o;
    if (typeof e[0] == "string" || Array.isArray(e[0])) {
      r = e[0];
      i = e.slice(1, e.length);
      o = n;
    } else {
      r = e[0].events;
      i = e[0].data;
      o = e[0].context || n;
    }
    i.unshift(o);
    (Array.isArray(r) ? r : r.split(" ")).forEach(h => {
      if (n.eventsAnyListeners && n.eventsAnyListeners.length) {
        n.eventsAnyListeners.forEach(a => {
          a.apply(o, [h, ...i]);
        });
      }
      if (n.eventsListeners && n.eventsListeners[h]) {
        n.eventsListeners[h].forEach(a => {
          a.apply(o, i);
        });
      }
    });
    return n;
  }
};
function Lk() {
  const e = this;
  let n;
  let r;
  const i = e.el;
  if (typeof e.params.width !== "undefined" && e.params.width !== null) {
    n = e.params.width;
  } else {
    n = i.clientWidth;
  }
  if (typeof e.params.height !== "undefined" && e.params.height !== null) {
    r = e.params.height;
  } else {
    r = i.clientHeight;
  }
  if ((n !== 0 || !e.isHorizontal()) && (r !== 0 || !e.isVertical())) {
    n = n - parseInt(So(i, "padding-left") || 0, 10) - parseInt(So(i, "padding-right") || 0, 10);
    r = r - parseInt(So(i, "padding-top") || 0, 10) - parseInt(So(i, "padding-bottom") || 0, 10);
    if (Number.isNaN(n)) {
      n = 0;
    }
    if (Number.isNaN(r)) {
      r = 0;
    }
    Object.assign(e, {
      width: n,
      height: r,
      size: e.isHorizontal() ? n : r
    });
  }
}
function Pk() {
  const e = this;
  function n(j, W) {
    return parseFloat(j.getPropertyValue(e.getDirectionLabel(W)) || 0);
  }
  const r = e.params;
  const {
    wrapperEl: i,
    slidesEl: o,
    rtlTranslate: u,
    wrongRTL: h
  } = e;
  const a = e.virtual && r.virtual.enabled;
  const c = a ? e.virtual.slides.length : e.slides.length;
  const d = zi(o, `.${e.params.slideClass}, swiper-slide`);
  const p = a ? e.virtual.slides.length : d.length;
  let f = [];
  const S = [];
  const _ = [];
  let x = r.slidesOffsetBefore;
  if (typeof x == "function") {
    x = r.slidesOffsetBefore.call(e);
  }
  let w = r.slidesOffsetAfter;
  if (typeof w == "function") {
    w = r.slidesOffsetAfter.call(e);
  }
  const g = e.snapGrid.length;
  const b = e.slidesGrid.length;
  const m = e.size - x - w;
  let v = r.spaceBetween;
  let C = -x;
  let T = 0;
  let A = 0;
  if (typeof m === "undefined") {
    return;
  }
  if (typeof v == "string" && v.indexOf("%") >= 0) {
    v = parseFloat(v.replace("%", "")) / 100 * m;
  } else if (typeof v == "string") {
    v = parseFloat(v);
  }
  e.virtualSize = -v - x - w;
  d.forEach(j => {
    if (u) {
      j.style.marginLeft = "";
    } else {
      j.style.marginRight = "";
    }
    j.style.marginBottom = "";
    j.style.marginTop = "";
  });
  if (r.centeredSlides && r.cssMode) {
    El(i, "--swiper-centered-offset-before", "");
    El(i, "--swiper-centered-offset-after", "");
  }
  if (r.cssMode) {
    El(i, "--swiper-slides-offset-before", `${x}px`);
    El(i, "--swiper-slides-offset-after", `${w}px`);
  }
  const M = r.grid && r.grid.rows > 1 && e.grid;
  if (M) {
    e.grid.initSlides(d);
  } else if (e.grid) {
    e.grid.unsetSlides();
  }
  let R;
  const I = r.slidesPerView === "auto" && r.breakpoints && Object.keys(r.breakpoints).filter(j => typeof r.breakpoints[j].slidesPerView !== "undefined").length > 0;
  for (let j = 0; j < p; j += 1) {
    R = 0;
    const W = d[j];
    if (!W || !(M && e.grid.updateSlide(j, W, d), So(W, "display") === "none")) {
      if (a && r.slidesPerView === "auto") {
        if (r.virtual.slidesPerViewAutoSlideSize) {
          R = r.virtual.slidesPerViewAutoSlideSize;
        }
        if (R && W) {
          if (r.roundLengths) {
            R = Math.floor(R);
          }
          W.style[e.getDirectionLabel("width")] = `${R}px`;
        }
      } else if (r.slidesPerView === "auto") {
        if (I) {
          W.style[e.getDirectionLabel("width")] = "";
        }
        const z = getComputedStyle(W);
        const N = W.style.transform;
        const D = W.style.webkitTransform;
        if (N) {
          W.style.transform = "none";
        }
        if (D) {
          W.style.webkitTransform = "none";
        }
        if (r.roundLengths) {
          R = e.isHorizontal() ? Ew(W, "width") : Ew(W, "height");
        } else {
          const $ = n(z, "width");
          const G = n(z, "padding-left");
          const q = n(z, "padding-right");
          const U = n(z, "margin-left");
          const L = n(z, "margin-right");
          const F = z.getPropertyValue("box-sizing");
          if (F && F === "border-box") {
            R = $ + U + L;
          } else {
            const {
              clientWidth: P,
              offsetWidth: V
            } = W;
            R = $ + G + q + U + L + (V - P);
          }
        }
        if (N) {
          W.style.transform = N;
        }
        if (D) {
          W.style.webkitTransform = D;
        }
        if (r.roundLengths) {
          R = Math.floor(R);
        }
      } else {
        R = (m - (r.slidesPerView - 1) * v) / r.slidesPerView;
        if (r.roundLengths) {
          R = Math.floor(R);
        }
        if (W) {
          W.style[e.getDirectionLabel("width")] = `${R}px`;
        }
      }
      if (W) {
        W.swiperSlideSize = R;
      }
      _.push(R);
      if (r.centeredSlides) {
        C = C + R / 2 + T / 2 + v;
        if (T === 0 && j !== 0) {
          C = C - m / 2 - v;
        }
        if (j === 0) {
          C = C - m / 2 - v;
        }
        if (Math.abs(C) < 1 / 1000) {
          C = 0;
        }
        if (r.roundLengths) {
          C = Math.floor(C);
        }
        if (A % r.slidesPerGroup === 0) {
          f.push(C);
        }
        S.push(C);
      } else {
        if (r.roundLengths) {
          C = Math.floor(C);
        }
        if ((A - Math.min(e.params.slidesPerGroupSkip, A)) % e.params.slidesPerGroup === 0) {
          f.push(C);
        }
        S.push(C);
        C = C + R + v;
      }
      e.virtualSize += R + v;
      T = R;
      A += 1;
    }
  }
  e.virtualSize = Math.max(e.virtualSize, m) + w;
  if (u && h && (r.effect === "slide" || r.effect === "coverflow")) {
    i.style.width = `${e.virtualSize + v}px`;
  }
  if (r.setWrapperSize) {
    i.style[e.getDirectionLabel("width")] = `${e.virtualSize + v}px`;
  }
  if (M) {
    e.grid.updateWrapperSize(R, f);
  }
  if (!r.centeredSlides) {
    const j = r.slidesPerView !== "auto" && r.slidesPerView % 1 !== 0;
    const W = r.snapToSlideEdge && !r.loop && (r.slidesPerView === "auto" || j);
    let z = f.length;
    if (W) {
      let D;
      if (r.slidesPerView === "auto") {
        D = 1;
        let $ = 0;
        for (let G = _.length - 1; G >= 0 && ($ += _[G] + (G < _.length - 1 ? v : 0), $ <= m); G -= 1) {
          D = _.length - G;
        }
      } else {
        D = Math.floor(r.slidesPerView);
      }
      z = Math.max(p - D, 0);
    }
    const N = [];
    for (let D = 0; D < f.length; D += 1) {
      let $ = f[D];
      if (r.roundLengths) {
        $ = Math.floor($);
      }
      if (W) {
        if (D <= z) {
          N.push($);
        }
      } else if (f[D] <= e.virtualSize - m) {
        N.push($);
      }
    }
    f = N;
    if (Math.floor(e.virtualSize - m) - Math.floor(f[f.length - 1]) > 1) {
      if (!W) {
        f.push(e.virtualSize - m);
      }
    }
  }
  if (a && r.loop) {
    const j = _[0] + v;
    if (r.slidesPerGroup > 1) {
      const W = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / r.slidesPerGroup);
      const z = j * r.slidesPerGroup;
      for (let N = 0; N < W; N += 1) {
        f.push(f[f.length - 1] + z);
      }
    }
    for (let W = 0; W < e.virtual.slidesBefore + e.virtual.slidesAfter; W += 1) {
      if (r.slidesPerGroup === 1) {
        f.push(f[f.length - 1] + j);
      }
      S.push(S[S.length - 1] + j);
      e.virtualSize += j;
    }
  }
  if (f.length === 0) {
    f = [0];
  }
  if (v !== 0) {
    const j = e.isHorizontal() && u ? "marginLeft" : e.getDirectionLabel("marginRight");
    d.filter((W, z) => !r.cssMode || r.loop ? true : z !== d.length - 1).forEach(W => {
      W.style[j] = `${v}px`;
    });
  }
  if (r.centeredSlides && r.centeredSlidesBounds) {
    let j = 0;
    _.forEach(z => {
      j += z + (v || 0);
    });
    j -= v;
    const W = j > m ? j - m : 0;
    f = f.map(z => z <= 0 ? -x : z > W ? W + w : z);
  }
  if (r.centerInsufficientSlides) {
    let j = 0;
    _.forEach(W => {
      j += W + (v || 0);
    });
    j -= v;
    if (j < m) {
      const W = (m - j) / 2;
      f.forEach((z, N) => {
        f[N] = z - W;
      });
      S.forEach((z, N) => {
        S[N] = z + W;
      });
    }
  }
  Object.assign(e, {
    slides: d,
    snapGrid: f,
    slidesGrid: S,
    slidesSizesGrid: _
  });
  if (r.centeredSlides && r.cssMode && !r.centeredSlidesBounds) {
    El(i, "--swiper-centered-offset-before", `${-f[0]}px`);
    El(i, "--swiper-centered-offset-after", `${e.size / 2 - _[_.length - 1] / 2}px`);
    const j = -e.snapGrid[0];
    const W = -e.slidesGrid[0];
    e.snapGrid = e.snapGrid.map(z => z + j);
    e.slidesGrid = e.slidesGrid.map(z => z + W);
  }
  if (p !== c) {
    e.emit("slidesLengthChange");
  }
  if (f.length !== g) {
    if (e.params.watchOverflow) {
      e.checkOverflow();
    }
    e.emit("snapGridLengthChange");
  }
  if (S.length !== b) {
    e.emit("slidesGridLengthChange");
  }
  if (r.watchSlidesProgress) {
    e.updateSlidesOffset();
  }
  e.emit("slidesUpdated");
  if (!a && !r.cssMode && (r.effect === "slide" || r.effect === "fade")) {
    const j = `${r.containerModifierClass}backface-hidden`;
    const W = e.el.classList.contains(j);
    if (p <= r.maxBackfaceHiddenSlides) {
      if (!W) {
        e.el.classList.add(j);
      }
    } else if (W) {
      e.el.classList.remove(j);
    }
  }
}
function Bk(e) {
  const n = this;
  const r = [];
  const i = n.virtual && n.params.virtual.enabled;
  let o = 0;
  let u;
  if (typeof e == "number") {
    n.setTransition(e);
  } else if (e === true) {
    n.setTransition(n.params.speed);
  }
  const h = a => i ? n.slides[n.getSlideIndexByData(a)] : n.slides[a];
  if (n.params.slidesPerView !== "auto" && n.params.slidesPerView > 1) {
    if (n.params.centeredSlides) {
      (n.visibleSlides || []).forEach(a => {
        r.push(a);
      });
    } else {
      for (u = 0; u < Math.ceil(n.params.slidesPerView); u += 1) {
        const a = n.activeIndex + u;
        if (a > n.slides.length && !i) {
          break;
        }
        r.push(h(a));
      }
    }
  } else {
    r.push(h(n.activeIndex));
  }
  for (u = 0; u < r.length; u += 1) {
    if (typeof r[u] !== "undefined") {
      const a = r[u].offsetHeight;
      o = a > o ? a : o;
    }
  }
  if (o || o === 0) {
    n.wrapperEl.style.height = `${o}px`;
  }
}
function zk() {
  const e = this;
  const n = e.slides;
  const r = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
  for (let i = 0; i < n.length; i += 1) {
    n[i].swiperSlideOffset = (e.isHorizontal() ? n[i].offsetLeft : n[i].offsetTop) - r - e.cssOverflowAdjustment();
  }
}
const Tw = (e, n, r) => {
  if (n && !e.classList.contains(r)) {
    e.classList.add(r);
  } else if (!n && e.classList.contains(r)) {
    e.classList.remove(r);
  }
};
function Nk(e = this && this.translate || 0) {
  const n = this;
  const r = n.params;
  const {
    slides: i,
    rtlTranslate: o,
    snapGrid: u
  } = n;
  if (i.length === 0) {
    return;
  }
  if (typeof i[0].swiperSlideOffset === "undefined") {
    n.updateSlidesOffset();
  }
  let h = -e;
  if (o) {
    h = e;
  }
  n.visibleSlidesIndexes = [];
  n.visibleSlides = [];
  let a = r.spaceBetween;
  if (typeof a == "string" && a.indexOf("%") >= 0) {
    a = parseFloat(a.replace("%", "")) / 100 * n.size;
  } else if (typeof a == "string") {
    a = parseFloat(a);
  }
  for (let c = 0; c < i.length; c += 1) {
    const d = i[c];
    let p = d.swiperSlideOffset;
    if (r.cssMode && r.centeredSlides) {
      p -= i[0].swiperSlideOffset;
    }
    const f = (h + (r.centeredSlides ? n.minTranslate() : 0) - p) / (d.swiperSlideSize + a);
    const S = (h - u[0] + (r.centeredSlides ? n.minTranslate() : 0) - p) / (d.swiperSlideSize + a);
    const _ = -(h - p);
    const x = _ + n.slidesSizesGrid[c];
    const w = _ >= 0 && _ <= n.size - n.slidesSizesGrid[c];
    const g = _ >= 0 && _ < n.size - 1 || x > 1 && x <= n.size || _ <= 0 && x >= n.size;
    if (g) {
      n.visibleSlides.push(d);
      n.visibleSlidesIndexes.push(c);
    }
    Tw(d, g, r.slideVisibleClass);
    Tw(d, w, r.slideFullyVisibleClass);
    d.progress = o ? -f : f;
    d.originalProgress = o ? -S : S;
  }
}
function jk(e) {
  const n = this;
  if (typeof e === "undefined") {
    const p = n.rtlTranslate ? -1 : 1;
    e = n && n.translate && n.translate * p || 0;
  }
  const r = n.params;
  const i = n.maxTranslate() - n.minTranslate();
  let {
    progress: o,
    isBeginning: u,
    isEnd: h,
    progressLoop: a
  } = n;
  const c = u;
  const d = h;
  if (i === 0) {
    o = 0;
    u = true;
    h = true;
  } else {
    o = (e - n.minTranslate()) / i;
    const p = Math.abs(e - n.minTranslate()) < 1;
    const f = Math.abs(e - n.maxTranslate()) < 1;
    u = p || o <= 0;
    h = f || o >= 1;
    if (p) {
      o = 0;
    }
    if (f) {
      o = 1;
    }
  }
  if (r.loop) {
    const p = n.getSlideIndexByData(0);
    const f = n.getSlideIndexByData(n.slides.length - 1);
    const S = n.slidesGrid[p];
    const _ = n.slidesGrid[f];
    const x = n.slidesGrid[n.slidesGrid.length - 1];
    const w = Math.abs(e);
    if (w >= S) {
      a = (w - S) / x;
    } else {
      a = (w + x - _) / x;
    }
    if (a > 1) {
      a -= 1;
    }
  }
  Object.assign(n, {
    progress: o,
    progressLoop: a,
    isBeginning: u,
    isEnd: h
  });
  if (r.watchSlidesProgress || r.centeredSlides && r.autoHeight) {
    n.updateSlidesProgress(e);
  }
  if (u && !c) {
    n.emit("reachBeginning toEdge");
  }
  if (h && !d) {
    n.emit("reachEnd toEdge");
  }
  if (c && !u || d && !h) {
    n.emit("fromEdge");
  }
  n.emit("progress", o);
}
const ng = (e, n, r) => {
  if (n && !e.classList.contains(r)) {
    e.classList.add(r);
  } else if (!n && e.classList.contains(r)) {
    e.classList.remove(r);
  }
};
function Hk() {
  const e = this;
  const {
    slides: n,
    params: r,
    slidesEl: i,
    activeIndex: o
  } = e;
  const u = e.virtual && r.virtual.enabled;
  const h = e.grid && r.grid && r.grid.rows > 1;
  const a = f => zi(i, `.${r.slideClass}${f}, swiper-slide${f}`)[0];
  let c;
  let d;
  let p;
  if (u) {
    if (r.loop) {
      let f = o - e.virtual.slidesBefore;
      if (f < 0) {
        f = e.virtual.slides.length + f;
      }
      if (f >= e.virtual.slides.length) {
        f -= e.virtual.slides.length;
      }
      c = a(`[data-swiper-slide-index="${f}"]`);
    } else {
      c = a(`[data-swiper-slide-index="${o}"]`);
    }
  } else if (h) {
    c = n.find(f => f.column === o);
    p = n.find(f => f.column === o + 1);
    d = n.find(f => f.column === o - 1);
  } else {
    c = n[o];
  }
  if (c) {
    if (!h) {
      p = Rk(c, `.${r.slideClass}, swiper-slide`)[0];
      if (r.loop && !p) {
        p = n[0];
      }
      d = Ek(c, `.${r.slideClass}, swiper-slide`)[0];
      if (r.loop && !d === 0) {
        d = n[n.length - 1];
      }
    }
  }
  n.forEach(f => {
    ng(f, f === c, r.slideActiveClass);
    ng(f, f === p, r.slideNextClass);
    ng(f, f === d, r.slidePrevClass);
  });
  e.emitSlidesClasses();
}
const Cf = (e, n) => {
  if (!e || e.destroyed || !e.params) {
    return;
  }
  const r = () => e.isElement ? "swiper-slide" : `.${e.params.slideClass}`;
  const i = n.closest(r());
  if (i) {
    let o = i.querySelector(`.${e.params.lazyPreloaderClass}`);
    if (!o && e.isElement) {
      if (i.shadowRoot) {
        o = i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`);
      } else {
        requestAnimationFrame(() => {
          if (i.shadowRoot) {
            o = i.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`);
            if (o && !o.lazyPreloaderManaged) {
              o.remove();
            }
          }
        });
      }
    }
    if (o && !o.lazyPreloaderManaged) {
      o.remove();
    }
  }
};
const rg = (e, n) => {
  if (!e.slides[n]) {
    return;
  }
  const r = e.slides[n].querySelector("[loading=\"lazy\"]");
  if (r) {
    r.removeAttribute("loading");
  }
};
const qg = e => {
  if (!e || e.destroyed || !e.params) {
    return;
  }
  let n = e.params.lazyPreloadPrevNext;
  const r = e.slides.length;
  if (!r || !n || n < 0) {
    return;
  }
  n = Math.min(n, r);
  const i = e.params.slidesPerView === "auto" ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView);
  const o = e.activeIndex;
  if (e.params.grid && e.params.grid.rows > 1) {
    const h = o;
    const a = [h - n];
    a.push(...Array.from({
      length: n
    }).map((c, d) => h + i + d));
    e.slides.forEach((c, d) => {
      if (a.includes(c.column)) {
        rg(e, d);
      }
    });
    return;
  }
  const u = o + i - 1;
  if (e.params.rewind || e.params.loop) {
    for (let h = o - n; h <= u + n; h += 1) {
      const a = (h % r + r) % r;
      if (a < o || a > u) {
        rg(e, a);
      }
    }
  } else {
    for (let h = Math.max(o - n, 0); h <= Math.min(u + n, r - 1); h += 1) {
      if (h !== o && (h > u || h < o)) {
        rg(e, h);
      }
    }
  }
};
function Fk(e) {
  const {
    slidesGrid: n,
    params: r
  } = e;
  const i = e.rtlTranslate ? e.translate : -e.translate;
  let o;
  for (let u = 0; u < n.length; u += 1) {
    if (typeof n[u + 1] !== "undefined") {
      if (i >= n[u] && i < n[u + 1] - (n[u + 1] - n[u]) / 2) {
        o = u;
      } else if (i >= n[u] && i < n[u + 1]) {
        o = u + 1;
      }
    } else if (i >= n[u]) {
      o = u;
    }
  }
  if (r.normalizeSlideIndex && (o < 0 || typeof o === "undefined")) {
    o = 0;
  }
  return o;
}
function Uk(e) {
  const n = this;
  const r = n.rtlTranslate ? n.translate : -n.translate;
  const {
    snapGrid: i,
    params: o,
    activeIndex: u,
    realIndex: h,
    snapIndex: a
  } = n;
  let c = e;
  let d;
  const p = _ => {
    let x = _ - n.virtual.slidesBefore;
    if (x < 0) {
      x = n.virtual.slides.length + x;
    }
    if (x >= n.virtual.slides.length) {
      x -= n.virtual.slides.length;
    }
    return x;
  };
  if (typeof c === "undefined") {
    c = Fk(n);
  }
  if (i.indexOf(r) >= 0) {
    d = i.indexOf(r);
  } else {
    const _ = Math.min(o.slidesPerGroupSkip, c);
    d = _ + Math.floor((c - _) / o.slidesPerGroup);
  }
  if (d >= i.length) {
    d = i.length - 1;
  }
  if (c === u && !n.params.loop) {
    if (d !== a) {
      n.snapIndex = d;
      n.emit("snapIndexChange");
    }
    return;
  }
  if (c === u && n.params.loop && n.virtual && n.params.virtual.enabled) {
    n.realIndex = p(c);
    return;
  }
  const f = n.grid && o.grid && o.grid.rows > 1;
  let S;
  if (n.virtual && o.virtual.enabled) {
    if (o.loop) {
      S = p(c);
    } else {
      S = c;
    }
  } else if (f) {
    const _ = n.slides.find(w => w.column === c);
    let x = parseInt(_.getAttribute("data-swiper-slide-index"), 10);
    if (Number.isNaN(x)) {
      x = Math.max(n.slides.indexOf(_), 0);
    }
    S = Math.floor(x / o.grid.rows);
  } else if (n.slides[c]) {
    const _ = n.slides[c].getAttribute("data-swiper-slide-index");
    if (_) {
      S = parseInt(_, 10);
    } else {
      S = c;
    }
  } else {
    S = c;
  }
  Object.assign(n, {
    previousSnapIndex: a,
    snapIndex: d,
    previousRealIndex: h,
    realIndex: S,
    previousIndex: u,
    activeIndex: c
  });
  if (n.initialized) {
    qg(n);
  }
  n.emit("activeIndexChange");
  n.emit("snapIndexChange");
  if (n.initialized || n.params.runCallbacksOnInit) {
    if (h !== S) {
      n.emit("realIndexChange");
    }
    n.emit("slideChange");
  }
}
function Vk(e, n) {
  const r = this;
  const i = r.params;
  let o = e.closest(`.${i.slideClass}, swiper-slide`);
  if (!o && r.isElement && n && n.length > 1 && n.includes(e)) {
    [...n.slice(n.indexOf(e) + 1, n.length)].forEach(a => {
      if (!o && a.matches && a.matches(`.${i.slideClass}, swiper-slide`)) {
        o = a;
      }
    });
  }
  let u = false;
  let h;
  if (o) {
    for (let a = 0; a < r.slides.length; a += 1) {
      if (r.slides[a] === o) {
        u = true;
        h = a;
        break;
      }
    }
  }
  if (o && u) {
    r.clickedSlide = o;
    if (r.virtual && r.params.virtual.enabled) {
      r.clickedIndex = parseInt(o.getAttribute("data-swiper-slide-index"), 10);
    } else {
      r.clickedIndex = h;
    }
  } else {
    r.clickedSlide = undefined;
    r.clickedIndex = undefined;
    return;
  }
  if (i.slideToClickedSlide && r.clickedIndex !== undefined && r.clickedIndex !== r.activeIndex) {
    r.slideToClickedSlide();
  }
}
var Wk = {
  updateSize: Lk,
  updateSlides: Pk,
  updateAutoHeight: Bk,
  updateSlidesOffset: zk,
  updateSlidesProgress: Nk,
  updateProgress: jk,
  updateSlidesClasses: Hk,
  updateActiveIndex: Uk,
  updateClickedSlide: Vk
};
function $k(e = this.isHorizontal() ? "x" : "y") {
  const n = this;
  const {
    params: r,
    rtlTranslate: i,
    translate: o,
    wrapperEl: u
  } = n;
  if (r.virtualTranslate) {
    if (i) {
      return -o;
    } else {
      return o;
    }
  }
  if (r.cssMode) {
    return o;
  }
  let h = wk(u, e);
  h += n.cssOverflowAdjustment();
  if (i) {
    h = -h;
  }
  return h || 0;
}
function qk(e, n) {
  const r = this;
  const {
    rtlTranslate: i,
    params: o,
    wrapperEl: u,
    progress: h
  } = r;
  let a = 0;
  let c = 0;
  const d = 0;
  if (r.isHorizontal()) {
    a = i ? -e : e;
  } else {
    c = e;
  }
  if (o.roundLengths) {
    a = Math.floor(a);
    c = Math.floor(c);
  }
  r.previousTranslate = r.translate;
  r.translate = r.isHorizontal() ? a : c;
  if (o.cssMode) {
    u[r.isHorizontal() ? "scrollLeft" : "scrollTop"] = r.isHorizontal() ? -a : -c;
  } else if (!o.virtualTranslate) {
    if (r.isHorizontal()) {
      a -= r.cssOverflowAdjustment();
    } else {
      c -= r.cssOverflowAdjustment();
    }
    u.style.transform = `translate3d(${a}px, ${c}px, ${d}px)`;
  }
  let p;
  const f = r.maxTranslate() - r.minTranslate();
  if (f === 0) {
    p = 0;
  } else {
    p = (e - r.minTranslate()) / f;
  }
  if (p !== h) {
    r.updateProgress(e);
  }
  r.emit("setTranslate", r.translate, n);
}
function Gk() {
  return -this.snapGrid[0];
}
function Yk() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function Xk(e = 0, n = this.params.speed, r = true, i = true, o) {
  const u = this;
  const {
    params: h,
    wrapperEl: a
  } = u;
  if (u.animating && h.preventInteractionOnTransition) {
    return false;
  }
  const c = u.minTranslate();
  const d = u.maxTranslate();
  let p;
  if (i && e > c) {
    p = c;
  } else if (i && e < d) {
    p = d;
  } else {
    p = e;
  }
  u.updateProgress(p);
  if (h.cssMode) {
    const f = u.isHorizontal();
    if (n === 0) {
      a[f ? "scrollLeft" : "scrollTop"] = -p;
    } else {
      if (!u.support.smoothScroll) {
        Yx({
          swiper: u,
          targetPosition: -p,
          side: f ? "left" : "top"
        });
        return true;
      }
      a.scrollTo({
        [f ? "left" : "top"]: -p,
        behavior: "smooth"
      });
    }
    return true;
  }
  if (n === 0) {
    u.setTransition(0);
    u.setTranslate(p);
    if (r) {
      u.emit("beforeTransitionStart", n, o);
      u.emit("transitionEnd");
    }
  } else {
    u.setTransition(n);
    u.setTranslate(p);
    if (r) {
      u.emit("beforeTransitionStart", n, o);
      u.emit("transitionStart");
    }
    if (!u.animating) {
      u.animating = true;
      u.onTranslateToWrapperTransitionEnd ||= function (S) {
        if (!!u && !u.destroyed) {
          if (S.target === this) {
            u.wrapperEl.removeEventListener("transitionend", u.onTranslateToWrapperTransitionEnd);
            u.onTranslateToWrapperTransitionEnd = null;
            delete u.onTranslateToWrapperTransitionEnd;
            u.animating = false;
            if (r) {
              u.emit("transitionEnd");
            }
          }
        }
      };
      u.wrapperEl.addEventListener("transitionend", u.onTranslateToWrapperTransitionEnd);
    }
  }
  return true;
}
var Kk = {
  getTranslate: $k,
  setTranslate: qk,
  minTranslate: Gk,
  maxTranslate: Yk,
  translateTo: Xk
};
function Zk(e, n) {
  const r = this;
  if (!r.params.cssMode) {
    r.wrapperEl.style.transitionDuration = `${e}ms`;
    r.wrapperEl.style.transitionDelay = e === 0 ? "0ms" : "";
  }
  r.emit("setTransition", e, n);
}
function Qx({
  swiper: e,
  runCallbacks: n,
  direction: r,
  step: i
}) {
  const {
    activeIndex: o,
    previousIndex: u
  } = e;
  let h = r;
  if (!h) {
    if (o > u) {
      h = "next";
    } else if (o < u) {
      h = "prev";
    } else {
      h = "reset";
    }
  }
  e.emit(`transition${i}`);
  if (n && h === "reset") {
    e.emit(`slideResetTransition${i}`);
  } else if (n && o !== u) {
    e.emit(`slideChangeTransition${i}`);
    if (h === "next") {
      e.emit(`slideNextTransition${i}`);
    } else {
      e.emit(`slidePrevTransition${i}`);
    }
  }
}
function Qk(e = true, n) {
  const r = this;
  const {
    params: i
  } = r;
  if (!i.cssMode) {
    if (i.autoHeight) {
      r.updateAutoHeight();
    }
    Qx({
      swiper: r,
      runCallbacks: e,
      direction: n,
      step: "Start"
    });
  }
}
function Jk(e = true, n) {
  const r = this;
  const {
    params: i
  } = r;
  r.animating = false;
  if (!i.cssMode) {
    r.setTransition(0);
    Qx({
      swiper: r,
      runCallbacks: e,
      direction: n,
      step: "End"
    });
  }
}
var eA = {
  setTransition: Zk,
  transitionStart: Qk,
  transitionEnd: Jk
};
function tA(e = 0, n, r = true, i, o) {
  if (typeof e == "string") {
    e = parseInt(e, 10);
  }
  const u = this;
  let h = e;
  if (h < 0) {
    h = 0;
  }
  const {
    params: a,
    snapGrid: c,
    slidesGrid: d,
    previousIndex: p,
    activeIndex: f,
    rtlTranslate: S,
    wrapperEl: _,
    enabled: x
  } = u;
  if (!x && !i && !o || u.destroyed || u.animating && a.preventInteractionOnTransition) {
    return false;
  }
  if (typeof n === "undefined") {
    n = u.params.speed;
  }
  const w = Math.min(u.params.slidesPerGroupSkip, h);
  let g = w + Math.floor((h - w) / u.params.slidesPerGroup);
  if (g >= c.length) {
    g = c.length - 1;
  }
  const b = -c[g];
  if (a.normalizeSlideIndex) {
    for (let M = 0; M < d.length; M += 1) {
      const R = -Math.floor(b * 100);
      const I = Math.floor(d[M] * 100);
      const j = Math.floor(d[M + 1] * 100);
      if (typeof d[M + 1] !== "undefined") {
        if (R >= I && R < j - (j - I) / 2) {
          h = M;
        } else if (R >= I && R < j) {
          h = M + 1;
        }
      } else if (R >= I) {
        h = M;
      }
    }
  }
  if (u.initialized && h !== f && (!u.allowSlideNext && (S ? b > u.translate && b > u.minTranslate() : b < u.translate && b < u.minTranslate()) || !u.allowSlidePrev && b > u.translate && b > u.maxTranslate() && (f || 0) !== h)) {
    return false;
  }
  if (h !== (p || 0) && r) {
    u.emit("beforeSlideChangeStart");
  }
  u.updateProgress(b);
  let m;
  if (h > f) {
    m = "next";
  } else if (h < f) {
    m = "prev";
  } else {
    m = "reset";
  }
  const v = u.virtual && u.params.virtual.enabled;
  if ((!v || !o) && (S && -b === u.translate || !S && b === u.translate)) {
    u.updateActiveIndex(h);
    if (a.autoHeight) {
      u.updateAutoHeight();
    }
    u.updateSlidesClasses();
    if (a.effect !== "slide") {
      u.setTranslate(b);
    }
    if (m !== "reset") {
      u.transitionStart(r, m);
      u.transitionEnd(r, m);
    }
    return false;
  }
  if (a.cssMode) {
    const M = u.isHorizontal();
    const R = S ? b : -b;
    if (n === 0) {
      if (v) {
        u.wrapperEl.style.scrollSnapType = "none";
        u._immediateVirtual = true;
      }
      if (v && !u._cssModeVirtualInitialSet && u.params.initialSlide > 0) {
        u._cssModeVirtualInitialSet = true;
        requestAnimationFrame(() => {
          _[M ? "scrollLeft" : "scrollTop"] = R;
        });
      } else {
        _[M ? "scrollLeft" : "scrollTop"] = R;
      }
      if (v) {
        requestAnimationFrame(() => {
          u.wrapperEl.style.scrollSnapType = "";
          u._immediateVirtual = false;
        });
      }
    } else {
      if (!u.support.smoothScroll) {
        Yx({
          swiper: u,
          targetPosition: R,
          side: M ? "left" : "top"
        });
        return true;
      }
      _.scrollTo({
        [M ? "left" : "top"]: R,
        behavior: "smooth"
      });
    }
    return true;
  }
  const A = Zx().isSafari;
  if (v && !o && A && u.isElement) {
    u.virtual.update(false, false, h);
  }
  u.setTransition(n);
  u.setTranslate(b);
  u.updateActiveIndex(h);
  u.updateSlidesClasses();
  u.emit("beforeTransitionStart", n, i);
  u.transitionStart(r, m);
  if (n === 0) {
    u.transitionEnd(r, m);
  } else if (!u.animating) {
    u.animating = true;
    u.onSlideToWrapperTransitionEnd ||= function (R) {
      if (!!u && !u.destroyed) {
        if (R.target === this) {
          u.wrapperEl.removeEventListener("transitionend", u.onSlideToWrapperTransitionEnd);
          u.onSlideToWrapperTransitionEnd = null;
          delete u.onSlideToWrapperTransitionEnd;
          u.transitionEnd(r, m);
        }
      }
    };
    u.wrapperEl.addEventListener("transitionend", u.onSlideToWrapperTransitionEnd);
  }
  return true;
}
function nA(e = 0, n, r = true, i) {
  if (typeof e == "string") {
    e = parseInt(e, 10);
  }
  const o = this;
  if (o.destroyed) {
    return;
  }
  if (typeof n === "undefined") {
    n = o.params.speed;
  }
  const u = o.grid && o.params.grid && o.params.grid.rows > 1;
  let h = e;
  if (o.params.loop) {
    if (o.virtual && o.params.virtual.enabled) {
      h = h + o.virtual.slidesBefore;
    } else {
      let a;
      if (u) {
        const w = h * o.params.grid.rows;
        a = o.slides.find(g => g.getAttribute("data-swiper-slide-index") * 1 === w).column;
      } else {
        a = o.getSlideIndexByData(h);
      }
      const c = u ? Math.ceil(o.slides.length / o.params.grid.rows) : o.slides.length;
      const {
        centeredSlides: d,
        slidesOffsetBefore: p,
        slidesOffsetAfter: f
      } = o.params;
      const S = d || !!p || !!f;
      let _ = o.params.slidesPerView;
      if (_ === "auto") {
        _ = o.slidesPerViewDynamic();
      } else {
        _ = Math.ceil(parseFloat(o.params.slidesPerView, 10));
        if (S && _ % 2 === 0) {
          _ = _ + 1;
        }
      }
      let x = c - a < _;
      if (S) {
        x = x || a < Math.ceil(_ / 2);
      }
      if (i && S && o.params.slidesPerView !== "auto" && !u) {
        x = false;
      }
      if (x) {
        const w = S ? a < o.activeIndex ? "prev" : "next" : a - o.activeIndex - 1 < o.params.slidesPerView ? "next" : "prev";
        o.loopFix({
          direction: w,
          slideTo: true,
          activeSlideIndex: w === "next" ? a + 1 : a - c + 1,
          slideRealIndex: w === "next" ? o.realIndex : undefined
        });
      }
      if (u) {
        const w = h * o.params.grid.rows;
        h = o.slides.find(g => g.getAttribute("data-swiper-slide-index") * 1 === w).column;
      } else {
        h = o.getSlideIndexByData(h);
      }
    }
  }
  requestAnimationFrame(() => {
    o.slideTo(h, n, r, i);
  });
  return o;
}
function rA(e, n = true, r) {
  const i = this;
  const {
    enabled: o,
    params: u,
    animating: h
  } = i;
  if (!o || i.destroyed) {
    return i;
  }
  if (typeof e === "undefined") {
    e = i.params.speed;
  }
  let a = u.slidesPerGroup;
  if (u.slidesPerView === "auto" && u.slidesPerGroup === 1 && u.slidesPerGroupAuto) {
    a = Math.max(i.slidesPerViewDynamic("current", true), 1);
  }
  const c = i.activeIndex < u.slidesPerGroupSkip ? 1 : a;
  const d = i.virtual && u.virtual.enabled;
  if (u.loop) {
    if (h && !d && u.loopPreventsSliding) {
      return false;
    }
    i.loopFix({
      direction: "next"
    });
    i._clientLeft = i.wrapperEl.clientLeft;
    if (i.activeIndex === i.slides.length - 1 && u.cssMode) {
      requestAnimationFrame(() => {
        i.slideTo(i.activeIndex + c, e, n, r);
      });
      return true;
    }
  }
  if (u.rewind && i.isEnd) {
    return i.slideTo(0, e, n, r);
  } else {
    return i.slideTo(i.activeIndex + c, e, n, r);
  }
}
function sA(e, n = true, r) {
  const i = this;
  const {
    params: o,
    snapGrid: u,
    slidesGrid: h,
    rtlTranslate: a,
    enabled: c,
    animating: d
  } = i;
  if (!c || i.destroyed) {
    return i;
  }
  if (typeof e === "undefined") {
    e = i.params.speed;
  }
  const p = i.virtual && o.virtual.enabled;
  if (o.loop) {
    if (d && !p && o.loopPreventsSliding) {
      return false;
    }
    i.loopFix({
      direction: "prev"
    });
    i._clientLeft = i.wrapperEl.clientLeft;
  }
  const f = a ? i.translate : -i.translate;
  function S(m) {
    if (m < 0) {
      return -Math.floor(Math.abs(m));
    } else {
      return Math.floor(m);
    }
  }
  const _ = S(f);
  const x = u.map(m => S(m));
  const w = o.freeMode && o.freeMode.enabled;
  let g = u[x.indexOf(_) - 1];
  if (typeof g === "undefined" && (o.cssMode || w)) {
    let m;
    u.forEach((v, C) => {
      if (_ >= v) {
        m = C;
      }
    });
    if (typeof m !== "undefined") {
      g = w ? u[m] : u[m > 0 ? m - 1 : m];
    }
  }
  let b = 0;
  if (typeof g !== "undefined") {
    b = h.indexOf(g);
    if (b < 0) {
      b = i.activeIndex - 1;
    }
    if (o.slidesPerView === "auto" && o.slidesPerGroup === 1 && o.slidesPerGroupAuto) {
      b = b - i.slidesPerViewDynamic("previous", true) + 1;
      b = Math.max(b, 0);
    }
  }
  if (o.rewind && i.isBeginning) {
    const m = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
    return i.slideTo(m, e, n, r);
  } else if (o.loop && i.activeIndex === 0 && o.cssMode) {
    requestAnimationFrame(() => {
      i.slideTo(b, e, n, r);
    });
    return true;
  }
  return i.slideTo(b, e, n, r);
}
function iA(e, n = true, r) {
  const i = this;
  if (!i.destroyed) {
    if (typeof e === "undefined") {
      e = i.params.speed;
    }
    return i.slideTo(i.activeIndex, e, n, r);
  }
}
function oA(e, n = true, r, i = 0.5) {
  const o = this;
  if (o.destroyed) {
    return;
  }
  if (typeof e === "undefined") {
    e = o.params.speed;
  }
  let u = o.activeIndex;
  const h = Math.min(o.params.slidesPerGroupSkip, u);
  const a = h + Math.floor((u - h) / o.params.slidesPerGroup);
  const c = o.rtlTranslate ? o.translate : -o.translate;
  if (c >= o.snapGrid[a]) {
    const d = o.snapGrid[a];
    const p = o.snapGrid[a + 1];
    if (c - d > (p - d) * i) {
      u += o.params.slidesPerGroup;
    }
  } else {
    const d = o.snapGrid[a - 1];
    const p = o.snapGrid[a];
    if (c - d <= (p - d) * i) {
      u -= o.params.slidesPerGroup;
    }
  }
  u = Math.max(u, 0);
  u = Math.min(u, o.slidesGrid.length - 1);
  return o.slideTo(u, e, n, r);
}
function aA() {
  const e = this;
  if (e.destroyed) {
    return;
  }
  const {
    params: n,
    slidesEl: r
  } = e;
  const i = n.slidesPerView === "auto" ? e.slidesPerViewDynamic() : n.slidesPerView;
  let o = e.getSlideIndexWhenGrid(e.clickedIndex);
  let u;
  const h = e.isElement ? "swiper-slide" : `.${n.slideClass}`;
  const a = e.grid && e.params.grid && e.params.grid.rows > 1;
  if (n.loop) {
    if (e.animating) {
      return;
    }
    u = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
    if (n.centeredSlides) {
      e.slideToLoop(u);
    } else if (o > (a ? (e.slides.length - i) / 2 - (e.params.grid.rows - 1) : e.slides.length - i)) {
      e.loopFix();
      o = e.getSlideIndex(zi(r, `${h}[data-swiper-slide-index="${u}"]`)[0]);
      Gx(() => {
        e.slideTo(o);
      });
    } else {
      e.slideTo(o);
    }
  } else {
    e.slideTo(o);
  }
}
var lA = {
  slideTo: tA,
  slideToLoop: nA,
  slideNext: rA,
  slidePrev: sA,
  slideReset: iA,
  slideToClosest: oA,
  slideToClickedSlide: aA
};
function cA(e, n) {
  const r = this;
  const {
    params: i,
    slidesEl: o
  } = r;
  if (!i.loop || r.virtual && r.params.virtual.enabled) {
    return;
  }
  const u = () => {
    zi(o, `.${i.slideClass}, swiper-slide`).forEach((x, w) => {
      x.setAttribute("data-swiper-slide-index", w);
    });
  };
  const h = () => {
    const _ = zi(o, `.${i.slideBlankClass}`);
    _.forEach(x => {
      x.remove();
    });
    if (_.length > 0) {
      r.recalcSlides();
      r.updateSlides();
    }
  };
  const a = r.grid && i.grid && i.grid.rows > 1;
  if (i.loopAddBlankSlides && (i.slidesPerGroup > 1 || a)) {
    h();
  }
  const c = i.slidesPerGroup * (a ? i.grid.rows : 1);
  const d = r.slides.length % c !== 0;
  const p = a && r.slides.length % i.grid.rows !== 0;
  const f = _ => {
    for (let x = 0; x < _; x += 1) {
      const w = r.isElement ? $g("swiper-slide", [i.slideBlankClass]) : $g("div", [i.slideClass, i.slideBlankClass]);
      r.slidesEl.append(w);
    }
  };
  if (d) {
    if (i.loopAddBlankSlides) {
      const _ = c - r.slides.length % c;
      f(_);
      r.recalcSlides();
      r.updateSlides();
    } else {
      Pf("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    }
    u();
  } else if (p) {
    if (i.loopAddBlankSlides) {
      const _ = i.grid.rows - r.slides.length % i.grid.rows;
      f(_);
      r.recalcSlides();
      r.updateSlides();
    } else {
      Pf("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    }
    u();
  } else {
    u();
  }
  const S = i.centeredSlides || !!i.slidesOffsetBefore || !!i.slidesOffsetAfter;
  r.loopFix({
    slideRealIndex: e,
    direction: S ? undefined : "next",
    initial: n
  });
}
function uA({
  slideRealIndex: e,
  slideTo: n = true,
  direction: r,
  setTranslate: i,
  activeSlideIndex: o,
  initial: u,
  byController: h,
  byMousewheel: a
} = {}) {
  const c = this;
  if (!c.params.loop) {
    return;
  }
  c.emit("beforeLoopFix");
  const {
    slides: d,
    allowSlidePrev: p,
    allowSlideNext: f,
    slidesEl: S,
    params: _
  } = c;
  const {
    centeredSlides: x,
    slidesOffsetBefore: w,
    slidesOffsetAfter: g,
    initialSlide: b
  } = _;
  const m = x || !!w || !!g;
  c.allowSlidePrev = true;
  c.allowSlideNext = true;
  if (c.virtual && _.virtual.enabled) {
    if (n) {
      if (!m && c.snapIndex === 0) {
        c.slideTo(c.virtual.slides.length, 0, false, true);
      } else if (m && c.snapIndex < _.slidesPerView) {
        c.slideTo(c.virtual.slides.length + c.snapIndex, 0, false, true);
      } else if (c.snapIndex === c.snapGrid.length - 1) {
        c.slideTo(c.virtual.slidesBefore, 0, false, true);
      }
    }
    c.allowSlidePrev = p;
    c.allowSlideNext = f;
    c.emit("loopFix");
    return;
  }
  let v = _.slidesPerView;
  if (v === "auto") {
    v = c.slidesPerViewDynamic();
  } else {
    v = Math.ceil(parseFloat(_.slidesPerView, 10));
    if (m && v % 2 === 0) {
      v = v + 1;
    }
  }
  const C = _.slidesPerGroupAuto ? v : _.slidesPerGroup;
  let T = m ? Math.max(C, Math.ceil(v / 2)) : C;
  if (T % C !== 0) {
    T += C - T % C;
  }
  T += _.loopAdditionalSlides;
  c.loopedSlides = T;
  const A = c.grid && _.grid && _.grid.rows > 1;
  if (d.length < v + T || c.params.effect === "cards" && d.length < v + T * 2) {
    Pf("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters");
  } else if (A && _.grid.fill === "row") {
    Pf("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  }
  const M = [];
  const R = [];
  const I = A ? Math.ceil(d.length / _.grid.rows) : d.length;
  const j = u && I - b < v && !m;
  let W = j ? b : c.activeIndex;
  if (typeof o === "undefined") {
    o = c.getSlideIndex(d.find(U => U.classList.contains(_.slideActiveClass)));
  } else {
    W = o;
  }
  const z = r === "next" || !r;
  const N = r === "prev" || !r;
  let D = 0;
  let $ = 0;
  const q = (A ? d[o].column : o) + (m && typeof i === "undefined" ? -v / 2 + 0.5 : 0);
  if (q < T) {
    D = Math.max(T - q, C);
    for (let U = 0; U < T - q; U += 1) {
      const L = U - Math.floor(U / I) * I;
      if (A) {
        const F = I - L - 1;
        for (let P = d.length - 1; P >= 0; P -= 1) {
          if (d[P].column === F) {
            M.push(P);
          }
        }
      } else {
        M.push(I - L - 1);
      }
    }
  } else if (q + v > I - T) {
    $ = Math.max(q - (I - T * 2), C);
    if (j) {
      $ = Math.max($, v - I + b + 1);
    }
    for (let U = 0; U < $; U += 1) {
      const L = U - Math.floor(U / I) * I;
      if (A) {
        d.forEach((F, P) => {
          if (F.column === L) {
            R.push(P);
          }
        });
      } else {
        R.push(L);
      }
    }
  }
  c.__preventObserver__ = true;
  requestAnimationFrame(() => {
    c.__preventObserver__ = false;
  });
  if (c.params.effect === "cards" && d.length < v + T * 2) {
    if (R.includes(o)) {
      R.splice(R.indexOf(o), 1);
    }
    if (M.includes(o)) {
      M.splice(M.indexOf(o), 1);
    }
  }
  if (N) {
    M.forEach(U => {
      d[U].swiperLoopMoveDOM = true;
      S.prepend(d[U]);
      d[U].swiperLoopMoveDOM = false;
    });
  }
  if (z) {
    R.forEach(U => {
      d[U].swiperLoopMoveDOM = true;
      S.append(d[U]);
      d[U].swiperLoopMoveDOM = false;
    });
  }
  c.recalcSlides();
  if (_.slidesPerView === "auto") {
    c.updateSlides();
  } else if (A && (M.length > 0 && N || R.length > 0 && z)) {
    c.slides.forEach((U, L) => {
      c.grid.updateSlide(L, U, c.slides);
    });
  }
  if (_.watchSlidesProgress) {
    c.updateSlidesOffset();
  }
  if (n) {
    if (M.length > 0 && N) {
      if (typeof e === "undefined") {
        const U = c.slidesGrid[W];
        const F = c.slidesGrid[W + D] - U;
        if (a) {
          c.setTranslate(c.translate - F);
        } else {
          c.slideTo(W + Math.ceil(D), 0, false, true);
          if (i) {
            c.touchEventsData.startTranslate = c.touchEventsData.startTranslate - F;
            c.touchEventsData.currentTranslate = c.touchEventsData.currentTranslate - F;
          }
        }
      } else if (i) {
        const U = A ? M.length / _.grid.rows : M.length;
        c.slideTo(c.activeIndex + U, 0, false, true);
        c.touchEventsData.currentTranslate = c.translate;
      }
    } else if (R.length > 0 && z) {
      if (typeof e === "undefined") {
        const U = c.slidesGrid[W];
        const F = c.slidesGrid[W - $] - U;
        if (a) {
          c.setTranslate(c.translate - F);
        } else {
          c.slideTo(W - $, 0, false, true);
          if (i) {
            c.touchEventsData.startTranslate = c.touchEventsData.startTranslate - F;
            c.touchEventsData.currentTranslate = c.touchEventsData.currentTranslate - F;
          }
        }
      } else {
        const U = A ? R.length / _.grid.rows : R.length;
        c.slideTo(c.activeIndex - U, 0, false, true);
      }
    }
  }
  c.allowSlidePrev = p;
  c.allowSlideNext = f;
  if (c.controller && c.controller.control && !h) {
    const U = {
      slideRealIndex: e,
      direction: r,
      setTranslate: i,
      activeSlideIndex: o,
      byController: true
    };
    if (Array.isArray(c.controller.control)) {
      c.controller.control.forEach(L => {
        if (!L.destroyed && L.params.loop) {
          L.loopFix({
            ...U,
            slideTo: L.params.slidesPerView === _.slidesPerView ? n : false
          });
        }
      });
    } else if (c.controller.control instanceof c.constructor && c.controller.control.params.loop) {
      c.controller.control.loopFix({
        ...U,
        slideTo: c.controller.control.params.slidesPerView === _.slidesPerView ? n : false
      });
    }
  }
  c.emit("loopFix");
}
function dA() {
  const e = this;
  const {
    params: n,
    slidesEl: r
  } = e;
  if (!n.loop || !r || e.virtual && e.params.virtual.enabled) {
    return;
  }
  e.recalcSlides();
  const i = [];
  e.slides.forEach(o => {
    const u = typeof o.swiperSlideIndex === "undefined" ? o.getAttribute("data-swiper-slide-index") * 1 : o.swiperSlideIndex;
    i[u] = o;
  });
  e.slides.forEach(o => {
    o.removeAttribute("data-swiper-slide-index");
  });
  i.forEach(o => {
    r.append(o);
  });
  e.recalcSlides();
  e.slideTo(e.realIndex, 0);
}
var fA = {
  loopCreate: cA,
  loopFix: uA,
  loopDestroy: dA
};
function hA(e) {
  const n = this;
  if (!n.params.simulateTouch || n.params.watchOverflow && n.isLocked || n.params.cssMode) {
    return;
  }
  const r = n.params.touchEventsTarget === "container" ? n.el : n.wrapperEl;
  if (n.isElement) {
    n.__preventObserver__ = true;
  }
  r.style.cursor = "move";
  r.style.cursor = e ? "grabbing" : "grab";
  if (n.isElement) {
    requestAnimationFrame(() => {
      n.__preventObserver__ = false;
    });
  }
}
function pA() {
  const e = this;
  if ((!e.params.watchOverflow || !e.isLocked) && !e.params.cssMode) {
    if (e.isElement) {
      e.__preventObserver__ = true;
    }
    e[e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
    if (e.isElement) {
      requestAnimationFrame(() => {
        e.__preventObserver__ = false;
      });
    }
  }
}
var mA = {
  setGrabCursor: hA,
  unsetGrabCursor: pA
};
function gA(e, n = this) {
  function r(i) {
    if (!i || i === Da() || i === Ir()) {
      return null;
    }
    if (i.assignedSlot) {
      i = i.assignedSlot;
    }
    const o = i.closest(e);
    if (!o && !i.getRootNode) {
      return null;
    } else {
      return o || r(i.getRootNode().host);
    }
  }
  return r(n);
}
function kw(e, n, r) {
  const i = Ir();
  const {
    params: o
  } = e;
  const u = o.edgeSwipeDetection;
  const h = o.edgeSwipeThreshold;
  if (u && (r <= h || r >= i.innerWidth - h)) {
    if (u === "prevent") {
      n.preventDefault();
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}
function vA(e) {
  const n = this;
  if (n.destroyed) {
    return;
  }
  const r = Da();
  let i = e;
  if (i.originalEvent) {
    i = i.originalEvent;
  }
  const o = n.touchEventsData;
  if (i.type === "pointerdown") {
    if (o.pointerId !== null && o.pointerId !== i.pointerId) {
      return;
    }
    o.pointerId = i.pointerId;
  } else if (i.type === "touchstart" && i.targetTouches.length === 1) {
    o.touchId = i.targetTouches[0].identifier;
  }
  if (i.type === "touchstart") {
    kw(n, i, i.targetTouches[0].pageX);
    return;
  }
  const {
    params: u,
    touches: h,
    enabled: a
  } = n;
  if (!a || !u.simulateTouch && i.pointerType === "mouse" || n.animating && u.preventInteractionOnTransition) {
    return;
  }
  if (!n.animating && u.cssMode && u.loop) {
    n.loopFix();
  }
  let c = i.target;
  if (u.touchEventsTarget === "wrapper" && !Ck(c, n.wrapperEl) || "which" in i && i.which === 3 || "button" in i && i.button > 0 || o.isTouched && o.isMoved) {
    return;
  }
  const d = !!u.noSwipingClass && u.noSwipingClass !== "";
  const p = i.composedPath ? i.composedPath() : i.path;
  if (d && i.target && i.target.shadowRoot && p) {
    c = p[0];
  }
  const f = u.noSwipingSelector ? u.noSwipingSelector : `.${u.noSwipingClass}`;
  const S = !!i.target && !!i.target.shadowRoot;
  if (u.noSwiping && (S ? gA(f, c) : c.closest(f))) {
    n.allowClick = true;
    return;
  }
  if (u.swipeHandler && !c.closest(u.swipeHandler)) {
    return;
  }
  h.currentX = i.pageX;
  h.currentY = i.pageY;
  const _ = h.currentX;
  const x = h.currentY;
  if (!kw(n, i, _)) {
    return;
  }
  Object.assign(o, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined
  });
  h.startX = _;
  h.startY = x;
  o.touchStartTime = Lf();
  n.allowClick = true;
  n.updateSize();
  n.swipeDirection = undefined;
  if (u.threshold > 0) {
    o.allowThresholdMove = false;
  }
  let w = true;
  if (c.matches(o.focusableElements)) {
    w = false;
    if (c.nodeName === "SELECT") {
      o.isTouched = false;
    }
  }
  if (r.activeElement && r.activeElement.matches(o.focusableElements) && r.activeElement !== c && (i.pointerType === "mouse" || i.pointerType !== "mouse" && !c.matches(o.focusableElements))) {
    r.activeElement.blur();
  }
  const g = w && n.allowTouchMove && u.touchStartPreventDefault;
  if ((u.touchStartForcePreventDefault || g) && !c.isContentEditable) {
    i.preventDefault();
  }
  if (u.freeMode && u.freeMode.enabled && n.freeMode && n.animating && !u.cssMode) {
    n.freeMode.onTouchStart();
  }
  n.emit("touchStart", i);
}
function bA(e) {
  const n = Da();
  const r = this;
  if (r.destroyed) {
    return;
  }
  const i = r.touchEventsData;
  const {
    params: o,
    touches: u,
    rtlTranslate: h,
    enabled: a
  } = r;
  if (!a || !o.simulateTouch && e.pointerType === "mouse") {
    return;
  }
  let c = e;
  if (c.originalEvent) {
    c = c.originalEvent;
  }
  if (c.type === "pointermove" && (i.touchId !== null || c.pointerId !== i.pointerId)) {
    return;
  }
  let d;
  if (c.type === "touchmove") {
    d = [...c.changedTouches].find(T => T.identifier === i.touchId);
    if (!d || d.identifier !== i.touchId) {
      return;
    }
  } else {
    d = c;
  }
  if (!i.isTouched) {
    if (i.startMoving && i.isScrolling) {
      r.emit("touchMoveOpposite", c);
    }
    return;
  }
  const p = d.pageX;
  const f = d.pageY;
  if (c.preventedByNestedSwiper) {
    u.startX = p;
    u.startY = f;
    return;
  }
  if (!r.allowTouchMove) {
    if (!c.target.matches(i.focusableElements)) {
      r.allowClick = false;
    }
    if (i.isTouched) {
      Object.assign(u, {
        startX: p,
        startY: f,
        currentX: p,
        currentY: f
      });
      i.touchStartTime = Lf();
    }
    return;
  }
  if (o.touchReleaseOnEdges && !o.loop) {
    if (r.isVertical()) {
      if (f < u.startY && r.translate <= r.maxTranslate() || f > u.startY && r.translate >= r.minTranslate()) {
        i.isTouched = false;
        i.isMoved = false;
        return;
      }
    } else {
      if (h && (p > u.startX && -r.translate <= r.maxTranslate() || p < u.startX && -r.translate >= r.minTranslate())) {
        return;
      }
      if (!h && (p < u.startX && r.translate <= r.maxTranslate() || p > u.startX && r.translate >= r.minTranslate())) {
        return;
      }
    }
  }
  if (n.activeElement && n.activeElement.matches(i.focusableElements) && n.activeElement !== c.target && c.pointerType !== "mouse") {
    n.activeElement.blur();
  }
  if (n.activeElement && c.target === n.activeElement && c.target.matches(i.focusableElements)) {
    i.isMoved = true;
    r.allowClick = false;
    return;
  }
  if (i.allowTouchCallbacks) {
    r.emit("touchMove", c);
  }
  u.previousX = u.currentX;
  u.previousY = u.currentY;
  u.currentX = p;
  u.currentY = f;
  const S = u.currentX - u.startX;
  const _ = u.currentY - u.startY;
  if (r.params.threshold && Math.sqrt(S ** 2 + _ ** 2) < r.params.threshold) {
    return;
  }
  if (typeof i.isScrolling === "undefined") {
    let T;
    if (r.isHorizontal() && u.currentY === u.startY || r.isVertical() && u.currentX === u.startX) {
      i.isScrolling = false;
    } else if (S * S + _ * _ >= 25) {
      T = Math.atan2(Math.abs(_), Math.abs(S)) * 180 / Math.PI;
      i.isScrolling = r.isHorizontal() ? T > o.touchAngle : 90 - T > o.touchAngle;
    }
  }
  if (i.isScrolling) {
    r.emit("touchMoveOpposite", c);
  }
  if (typeof i.startMoving === "undefined" && (u.currentX !== u.startX || u.currentY !== u.startY)) {
    i.startMoving = true;
  }
  if (i.isScrolling || c.type === "touchmove" && i.preventTouchMoveFromPointerMove) {
    i.isTouched = false;
    return;
  }
  if (!i.startMoving) {
    return;
  }
  r.allowClick = false;
  if (!o.cssMode && c.cancelable) {
    c.preventDefault();
  }
  if (o.touchMoveStopPropagation && !o.nested) {
    c.stopPropagation();
  }
  let x = r.isHorizontal() ? S : _;
  let w = r.isHorizontal() ? u.currentX - u.previousX : u.currentY - u.previousY;
  if (o.oneWayMovement) {
    x = Math.abs(x) * (h ? 1 : -1);
    w = Math.abs(w) * (h ? 1 : -1);
  }
  u.diff = x;
  x *= o.touchRatio;
  if (h) {
    x = -x;
    w = -w;
  }
  const g = r.touchesDirection;
  r.swipeDirection = x > 0 ? "prev" : "next";
  r.touchesDirection = w > 0 ? "prev" : "next";
  const b = r.params.loop && !o.cssMode;
  const m = r.touchesDirection === "next" && r.allowSlideNext || r.touchesDirection === "prev" && r.allowSlidePrev;
  if (!i.isMoved) {
    if (b && m) {
      r.loopFix({
        direction: r.swipeDirection
      });
    }
    i.startTranslate = r.getTranslate();
    r.setTransition(0);
    if (r.animating) {
      const T = new window.CustomEvent("transitionend", {
        bubbles: true,
        cancelable: true,
        detail: {
          bySwiperTouchMove: true
        }
      });
      r.wrapperEl.dispatchEvent(T);
    }
    i.allowMomentumBounce = false;
    if (o.grabCursor && (r.allowSlideNext === true || r.allowSlidePrev === true)) {
      r.setGrabCursor(true);
    }
    r.emit("sliderFirstMove", c);
  }
  new Date().getTime();
  if (o._loopSwapReset !== false && i.isMoved && i.allowThresholdMove && g !== r.touchesDirection && b && m && Math.abs(x) >= 1) {
    Object.assign(u, {
      startX: p,
      startY: f,
      currentX: p,
      currentY: f,
      startTranslate: i.currentTranslate
    });
    i.loopSwapReset = true;
    i.startTranslate = i.currentTranslate;
    return;
  }
  r.emit("sliderMove", c);
  i.isMoved = true;
  i.currentTranslate = x + i.startTranslate;
  let v = true;
  let C = o.resistanceRatio;
  if (o.touchReleaseOnEdges) {
    C = 0;
  }
  if (x > 0) {
    if (b && m && i.allowThresholdMove && i.currentTranslate > (o.centeredSlides ? r.minTranslate() - r.slidesSizesGrid[r.activeIndex + 1] - (o.slidesPerView !== "auto" && r.slides.length - o.slidesPerView >= 2 ? r.slidesSizesGrid[r.activeIndex + 1] + r.params.spaceBetween : 0) - r.params.spaceBetween : r.minTranslate())) {
      r.loopFix({
        direction: "prev",
        setTranslate: true,
        activeSlideIndex: 0
      });
    }
    if (i.currentTranslate > r.minTranslate()) {
      v = false;
      if (o.resistance) {
        i.currentTranslate = r.minTranslate() - 1 + (-r.minTranslate() + i.startTranslate + x) ** C;
      }
    }
  } else if (x < 0) {
    if (b && m && i.allowThresholdMove && i.currentTranslate < (o.centeredSlides ? r.maxTranslate() + r.slidesSizesGrid[r.slidesSizesGrid.length - 1] + r.params.spaceBetween + (o.slidesPerView !== "auto" && r.slides.length - o.slidesPerView >= 2 ? r.slidesSizesGrid[r.slidesSizesGrid.length - 1] + r.params.spaceBetween : 0) : r.maxTranslate())) {
      r.loopFix({
        direction: "next",
        setTranslate: true,
        activeSlideIndex: r.slides.length - (o.slidesPerView === "auto" ? r.slidesPerViewDynamic() : Math.ceil(parseFloat(o.slidesPerView, 10)))
      });
    }
    if (i.currentTranslate < r.maxTranslate()) {
      v = false;
      if (o.resistance) {
        i.currentTranslate = r.maxTranslate() + 1 - (r.maxTranslate() - i.startTranslate - x) ** C;
      }
    }
  }
  if (v) {
    c.preventedByNestedSwiper = true;
  }
  if (!r.allowSlideNext && r.swipeDirection === "next" && i.currentTranslate < i.startTranslate) {
    i.currentTranslate = i.startTranslate;
  }
  if (!r.allowSlidePrev && r.swipeDirection === "prev" && i.currentTranslate > i.startTranslate) {
    i.currentTranslate = i.startTranslate;
  }
  if (!r.allowSlidePrev && !r.allowSlideNext) {
    i.currentTranslate = i.startTranslate;
  }
  if (o.threshold > 0) {
    if (Math.abs(x) > o.threshold || i.allowThresholdMove) {
      if (!i.allowThresholdMove) {
        i.allowThresholdMove = true;
        u.startX = u.currentX;
        u.startY = u.currentY;
        i.currentTranslate = i.startTranslate;
        u.diff = r.isHorizontal() ? u.currentX - u.startX : u.currentY - u.startY;
        return;
      }
    } else {
      i.currentTranslate = i.startTranslate;
      return;
    }
  }
  if (!!o.followFinger && !o.cssMode) {
    if (o.freeMode && o.freeMode.enabled && r.freeMode || o.watchSlidesProgress) {
      r.updateActiveIndex();
      r.updateSlidesClasses();
    }
    if (o.freeMode && o.freeMode.enabled && r.freeMode) {
      r.freeMode.onTouchMove();
    }
    r.updateProgress(i.currentTranslate);
    r.setTranslate(i.currentTranslate);
  }
}
function yA(e) {
  const n = this;
  if (n.destroyed) {
    return;
  }
  const r = n.touchEventsData;
  let i = e;
  if (i.originalEvent) {
    i = i.originalEvent;
  }
  let o;
  if (i.type === "touchend" || i.type === "touchcancel") {
    o = [...i.changedTouches].find(T => T.identifier === r.touchId);
    if (!o || o.identifier !== r.touchId) {
      return;
    }
  } else {
    if (r.touchId !== null || i.pointerId !== r.pointerId) {
      return;
    }
    o = i;
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(i.type) && (!["pointercancel", "contextmenu"].includes(i.type) || !n.browser.isSafari && !n.browser.isWebView)) {
    return;
  }
  r.pointerId = null;
  r.touchId = null;
  const {
    params: h,
    touches: a,
    rtlTranslate: c,
    slidesGrid: d,
    enabled: p
  } = n;
  if (!p || !h.simulateTouch && i.pointerType === "mouse") {
    return;
  }
  if (r.allowTouchCallbacks) {
    n.emit("touchEnd", i);
  }
  r.allowTouchCallbacks = false;
  if (!r.isTouched) {
    if (r.isMoved && h.grabCursor) {
      n.setGrabCursor(false);
    }
    r.isMoved = false;
    r.startMoving = false;
    return;
  }
  if (h.grabCursor && r.isMoved && r.isTouched && (n.allowSlideNext === true || n.allowSlidePrev === true)) {
    n.setGrabCursor(false);
  }
  const f = Lf();
  const S = f - r.touchStartTime;
  if (n.allowClick) {
    const T = i.path || i.composedPath && i.composedPath();
    n.updateClickedSlide(T && T[0] || i.target, T);
    n.emit("tap click", i);
    if (S < 300 && f - r.lastClickTime < 300) {
      n.emit("doubleTap doubleClick", i);
    }
  }
  r.lastClickTime = Lf();
  Gx(() => {
    if (!n.destroyed) {
      n.allowClick = true;
    }
  });
  if (!r.isTouched || !r.isMoved || !n.swipeDirection || a.diff === 0 && !r.loopSwapReset || r.currentTranslate === r.startTranslate && !r.loopSwapReset) {
    r.isTouched = false;
    r.isMoved = false;
    r.startMoving = false;
    return;
  }
  r.isTouched = false;
  r.isMoved = false;
  r.startMoving = false;
  let _;
  if (h.followFinger) {
    _ = c ? n.translate : -n.translate;
  } else {
    _ = -r.currentTranslate;
  }
  if (h.cssMode) {
    return;
  }
  if (h.freeMode && h.freeMode.enabled) {
    n.freeMode.onTouchEnd({
      currentPos: _
    });
    return;
  }
  const x = _ >= -n.maxTranslate() && !n.params.loop;
  let w = 0;
  let g = n.slidesSizesGrid[0];
  for (let T = 0; T < d.length; T += T < h.slidesPerGroupSkip ? 1 : h.slidesPerGroup) {
    const A = T < h.slidesPerGroupSkip - 1 ? 1 : h.slidesPerGroup;
    if (typeof d[T + A] !== "undefined") {
      if (x || _ >= d[T] && _ < d[T + A]) {
        w = T;
        g = d[T + A] - d[T];
      }
    } else if (x || _ >= d[T]) {
      w = T;
      g = d[d.length - 1] - d[d.length - 2];
    }
  }
  let b = null;
  let m = null;
  if (h.rewind) {
    if (n.isBeginning) {
      m = h.virtual && h.virtual.enabled && n.virtual ? n.virtual.slides.length - 1 : n.slides.length - 1;
    } else if (n.isEnd) {
      b = 0;
    }
  }
  const v = (_ - d[w]) / g;
  const C = w < h.slidesPerGroupSkip - 1 ? 1 : h.slidesPerGroup;
  if (S > h.longSwipesMs) {
    if (!h.longSwipes) {
      n.slideTo(n.activeIndex);
      return;
    }
    if (n.swipeDirection === "next") {
      if (v >= h.longSwipesRatio) {
        n.slideTo(h.rewind && n.isEnd ? b : w + C);
      } else {
        n.slideTo(w);
      }
    }
    if (n.swipeDirection === "prev") {
      if (v > 1 - h.longSwipesRatio) {
        n.slideTo(w + C);
      } else if (m !== null && v < 0 && Math.abs(v) > h.longSwipesRatio) {
        n.slideTo(m);
      } else {
        n.slideTo(w);
      }
    }
  } else {
    if (!h.shortSwipes) {
      n.slideTo(n.activeIndex);
      return;
    }
    if (n.navigation && (i.target === n.navigation.nextEl || i.target === n.navigation.prevEl)) {
      if (i.target === n.navigation.nextEl) {
        n.slideTo(w + C);
      } else {
        n.slideTo(w);
      }
    } else {
      if (n.swipeDirection === "next") {
        n.slideTo(b !== null ? b : w + C);
      }
      if (n.swipeDirection === "prev") {
        n.slideTo(m !== null ? m : w);
      }
    }
  }
}
function Aw() {
  const e = this;
  const {
    params: n,
    el: r
  } = e;
  if (r && r.offsetWidth === 0) {
    return;
  }
  if (n.breakpoints) {
    e.setBreakpoint();
  }
  const {
    allowSlideNext: i,
    allowSlidePrev: o,
    snapGrid: u
  } = e;
  const h = e.virtual && e.params.virtual.enabled;
  e.allowSlideNext = true;
  e.allowSlidePrev = true;
  e.updateSize();
  e.updateSlides();
  e.updateSlidesClasses();
  const a = h && n.loop;
  if ((n.slidesPerView === "auto" || n.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides && !a) {
    const c = h ? e.virtual.slides : e.slides;
    e.slideTo(c.length - 1, 0, false, true);
  } else if (e.params.loop && !h) {
    e.slideToLoop(e.realIndex, 0, false, true);
  } else {
    e.slideTo(e.activeIndex, 0, false, true);
  }
  if (e.autoplay && e.autoplay.running && e.autoplay.paused) {
    clearTimeout(e.autoplay.resizeTimeout);
    e.autoplay.resizeTimeout = setTimeout(() => {
      if (e.autoplay && e.autoplay.running && e.autoplay.paused) {
        e.autoplay.resume();
      }
    }, 500);
  }
  e.allowSlidePrev = o;
  e.allowSlideNext = i;
  if (e.params.watchOverflow && u !== e.snapGrid) {
    e.checkOverflow();
  }
}
function _A(e) {
  const n = this;
  if (!n.destroyed) {
    if (n.enabled) {
      if (!n.allowClick) {
        if (n.params.preventClicks) {
          e.preventDefault();
        }
        if (n.params.preventClicksPropagation && n.animating) {
          e.stopPropagation();
          e.stopImmediatePropagation();
        }
      }
    }
  }
}
function wA() {
  const e = this;
  if (e.destroyed) {
    return;
  }
  const {
    wrapperEl: n,
    rtlTranslate: r,
    enabled: i
  } = e;
  if (!i) {
    return;
  }
  e.previousTranslate = e.translate;
  if (e.isHorizontal()) {
    e.translate = -n.scrollLeft;
  } else {
    e.translate = -n.scrollTop;
  }
  if (e.translate === 0) {
    e.translate = 0;
  }
  e.updateActiveIndex();
  e.updateSlidesClasses();
  let o;
  const u = e.maxTranslate() - e.minTranslate();
  if (u === 0) {
    o = 0;
  } else {
    o = (e.translate - e.minTranslate()) / u;
  }
  if (o !== e.progress) {
    e.updateProgress(r ? -e.translate : e.translate);
  }
  e.emit("setTranslate", e.translate, false);
}
function SA(e) {
  const n = this;
  if (!n.destroyed) {
    Cf(n, e.target);
    if (!n.params.cssMode && (n.params.slidesPerView === "auto" || !!n.params.autoHeight)) {
      n.update();
    }
  }
}
function xA() {
  const e = this;
  if (!e.destroyed && !e.documentTouchHandlerProceeded) {
    e.documentTouchHandlerProceeded = true;
    if (e.params.touchReleaseOnEdges) {
      e.el.style.touchAction = "auto";
    }
  }
}
const Jx = (e, n) => {
  const r = Da();
  const {
    params: i,
    el: o,
    wrapperEl: u,
    device: h
  } = e;
  const a = !!i.nested;
  const c = n === "on" ? "addEventListener" : "removeEventListener";
  const d = n;
  if (!!o && typeof o != "string") {
    r[c]("touchstart", e.onDocumentTouchStart, {
      passive: false,
      capture: a
    });
    o[c]("touchstart", e.onTouchStart, {
      passive: false
    });
    o[c]("pointerdown", e.onTouchStart, {
      passive: false
    });
    r[c]("touchmove", e.onTouchMove, {
      passive: false,
      capture: a
    });
    r[c]("pointermove", e.onTouchMove, {
      passive: false,
      capture: a
    });
    r[c]("touchend", e.onTouchEnd, {
      passive: true
    });
    r[c]("pointerup", e.onTouchEnd, {
      passive: true
    });
    r[c]("pointercancel", e.onTouchEnd, {
      passive: true
    });
    r[c]("touchcancel", e.onTouchEnd, {
      passive: true
    });
    r[c]("pointerout", e.onTouchEnd, {
      passive: true
    });
    r[c]("pointerleave", e.onTouchEnd, {
      passive: true
    });
    r[c]("contextmenu", e.onTouchEnd, {
      passive: true
    });
    if (i.preventClicks || i.preventClicksPropagation) {
      o[c]("click", e.onClick, true);
    }
    if (i.cssMode) {
      u[c]("scroll", e.onScroll);
    }
    if (i.updateOnWindowResize) {
      e[d](h.ios || h.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", Aw, true);
    } else {
      e[d]("observerUpdate", Aw, true);
    }
    o[c]("load", e.onLoad, {
      capture: true
    });
  }
};
function CA() {
  const e = this;
  const {
    params: n
  } = e;
  e.onTouchStart = vA.bind(e);
  e.onTouchMove = bA.bind(e);
  e.onTouchEnd = yA.bind(e);
  e.onDocumentTouchStart = xA.bind(e);
  if (n.cssMode) {
    e.onScroll = wA.bind(e);
  }
  e.onClick = _A.bind(e);
  e.onLoad = SA.bind(e);
  Jx(e, "on");
}
function EA() {
  Jx(this, "off");
}
var RA = {
  attachEvents: CA,
  detachEvents: EA
};
const Mw = (e, n) => e.grid && n.grid && n.grid.rows > 1;
function TA() {
  const e = this;
  const {
    realIndex: n,
    initialized: r,
    params: i,
    el: o
  } = e;
  const u = i.breakpoints;
  if (!u || u && Object.keys(u).length === 0) {
    return;
  }
  const h = Da();
  const a = i.breakpointsBase === "window" || !i.breakpointsBase ? i.breakpointsBase : "container";
  const c = ["window", "container"].includes(i.breakpointsBase) || !i.breakpointsBase ? e.el : h.querySelector(i.breakpointsBase);
  const d = e.getBreakpoint(u, a, c);
  if (!d || e.currentBreakpoint === d) {
    return;
  }
  const f = (d in u ? u[d] : undefined) || e.originalParams;
  const S = Mw(e, i);
  const _ = Mw(e, f);
  const x = e.params.grabCursor;
  const w = f.grabCursor;
  const g = i.enabled;
  if (S && !_) {
    o.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`);
    e.emitContainerClasses();
  } else if (!S && _) {
    o.classList.add(`${i.containerModifierClass}grid`);
    if (f.grid.fill && f.grid.fill === "column" || !f.grid.fill && i.grid.fill === "column") {
      o.classList.add(`${i.containerModifierClass}grid-column`);
    }
    e.emitContainerClasses();
  }
  if (x && !w) {
    e.unsetGrabCursor();
  } else if (!x && w) {
    e.setGrabCursor();
  }
  ["navigation", "pagination", "scrollbar"].forEach(A => {
    if (typeof f[A] === "undefined") {
      return;
    }
    const M = i[A] && i[A].enabled;
    const R = f[A] && f[A].enabled;
    if (M && !R) {
      e[A].disable();
    }
    if (!M && R) {
      e[A].enable();
    }
  });
  const b = f.direction && f.direction !== i.direction;
  const m = i.loop && (f.slidesPerView !== i.slidesPerView || b);
  const v = i.loop;
  if (b && r) {
    e.changeDirection();
  }
  os(e.params, f);
  const C = e.params.enabled;
  const T = e.params.loop;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev
  });
  if (g && !C) {
    e.disable();
  } else if (!g && C) {
    e.enable();
  }
  e.currentBreakpoint = d;
  e.emit("_beforeBreakpoint", f);
  if (r) {
    if (m) {
      e.loopDestroy();
      e.loopCreate(n);
      e.updateSlides();
    } else if (!v && T) {
      e.loopCreate(n);
      e.updateSlides();
    } else if (v && !T) {
      e.loopDestroy();
    }
  }
  e.emit("breakpoint", f);
}
function kA(e, n = "window", r) {
  if (!e || n === "container" && !r) {
    return;
  }
  let i = false;
  const o = Ir();
  const u = n === "window" ? o.innerHeight : r.clientHeight;
  const h = Object.keys(e).map(a => {
    if (typeof a == "string" && a.indexOf("@") === 0) {
      const c = parseFloat(a.substr(1));
      return {
        value: u * c,
        point: a
      };
    }
    return {
      value: a,
      point: a
    };
  });
  h.sort((a, c) => parseInt(a.value, 10) - parseInt(c.value, 10));
  for (let a = 0; a < h.length; a += 1) {
    const {
      point: c,
      value: d
    } = h[a];
    if (n === "window") {
      if (o.matchMedia(`(min-width: ${d}px)`).matches) {
        i = c;
      }
    } else if (d <= r.clientWidth) {
      i = c;
    }
  }
  return i || "max";
}
var AA = {
  setBreakpoint: TA,
  getBreakpoint: kA
};
function MA(e, n) {
  const r = [];
  e.forEach(i => {
    if (typeof i == "object") {
      Object.keys(i).forEach(o => {
        if (i[o]) {
          r.push(n + o);
        }
      });
    } else if (typeof i == "string") {
      r.push(n + i);
    }
  });
  return r;
}
function OA() {
  const e = this;
  const {
    classNames: n,
    params: r,
    rtl: i,
    el: o,
    device: u
  } = e;
  const h = MA(["initialized", r.direction, {
    "free-mode": e.params.freeMode && r.freeMode.enabled
  }, {
    autoheight: r.autoHeight
  }, {
    rtl: i
  }, {
    grid: r.grid && r.grid.rows > 1
  }, {
    "grid-column": r.grid && r.grid.rows > 1 && r.grid.fill === "column"
  }, {
    android: u.android
  }, {
    ios: u.ios
  }, {
    "css-mode": r.cssMode
  }, {
    centered: r.cssMode && r.centeredSlides
  }, {
    "watch-progress": r.watchSlidesProgress
  }], r.containerModifierClass);
  n.push(...h);
  o.classList.add(...n);
  e.emitContainerClasses();
}
function DA() {
  const e = this;
  const {
    el: n,
    classNames: r
  } = e;
  if (!!n && typeof n != "string") {
    n.classList.remove(...r);
    e.emitContainerClasses();
  }
}
var IA = {
  addClasses: OA,
  removeClasses: DA
};
function LA() {
  const e = this;
  const {
    isLocked: n,
    params: r
  } = e;
  const {
    slidesOffsetBefore: i
  } = r;
  if (i) {
    const o = e.slides.length - 1;
    const u = e.slidesGrid[o] + e.slidesSizesGrid[o] + i * 2;
    e.isLocked = e.size > u;
  } else {
    e.isLocked = e.snapGrid.length === 1;
  }
  if (r.allowSlideNext === true) {
    e.allowSlideNext = !e.isLocked;
  }
  if (r.allowSlidePrev === true) {
    e.allowSlidePrev = !e.isLocked;
  }
  if (n && n !== e.isLocked) {
    e.isEnd = false;
  }
  if (n !== e.isLocked) {
    e.emit(e.isLocked ? "lock" : "unlock");
  }
}
var PA = {
  checkOverflow: LA
};
var Gg = {
  init: true,
  direction: "horizontal",
  oneWayMovement: false,
  swiperElementNodeName: "SWIPER-CONTAINER",
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  eventsPrefix: "swiper",
  enabled: true,
  focusableElements: "input, select, option, textarea, button, video, label",
  width: null,
  height: null,
  preventInteractionOnTransition: false,
  userAgent: null,
  url: null,
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  autoHeight: false,
  setWrapperSize: false,
  virtualTranslate: false,
  effect: "slide",
  breakpoints: undefined,
  breakpointsBase: "window",
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  snapToSlideEdge: false,
  watchOverflow: true,
  roundLengths: false,
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 5,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  uniqueNavElements: true,
  resistance: true,
  resistanceRatio: 0.85,
  watchSlidesProgress: false,
  grabCursor: false,
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  loop: false,
  loopAddBlankSlides: true,
  loopAdditionalSlides: 0,
  loopPreventsSliding: true,
  rewind: false,
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  noSwiping: true,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  passiveListeners: true,
  maxBackfaceHiddenSlides: 10,
  containerModifierClass: "swiper-",
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-blank",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideFullyVisibleClass: "swiper-slide-fully-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 0,
  runCallbacksOnInit: true,
  _emitClasses: false
};
function BA(e, n) {
  return function (i = {}) {
    const o = Object.keys(i)[0];
    const u = i[o];
    if (typeof u != "object" || u === null) {
      os(n, i);
      return;
    }
    if (e[o] === true) {
      e[o] = {
        enabled: true
      };
    }
    if (o === "navigation" && e[o] && e[o].enabled && !e[o].prevEl && !e[o].nextEl) {
      e[o].auto = true;
    }
    if (["pagination", "scrollbar"].indexOf(o) >= 0 && e[o] && e[o].enabled && !e[o].el) {
      e[o].auto = true;
    }
    if (!(o in e) || !("enabled" in u)) {
      os(n, i);
      return;
    }
    if (typeof e[o] == "object" && !("enabled" in e[o])) {
      e[o].enabled = true;
    }
    e[o] ||= {
      enabled: false
    };
    os(n, i);
  };
}
const sg = {
  eventsEmitter: Ik,
  update: Wk,
  translate: Kk,
  transition: eA,
  slide: lA,
  loop: fA,
  grabCursor: mA,
  events: RA,
  breakpoints: AA,
  checkOverflow: PA,
  classes: IA
};
const ig = {};
let Av = class Oi {
  constructor(...n) {
    let r;
    let i;
    if (n.length === 1 && n[0].constructor && Object.prototype.toString.call(n[0]).slice(8, -1) === "Object") {
      i = n[0];
    } else {
      [r, i] = n;
    }
    i ||= {};
    i = os({}, i);
    if (r && !i.el) {
      i.el = r;
    }
    const o = Da();
    if (i.el && typeof i.el == "string" && o.querySelectorAll(i.el).length > 1) {
      const c = [];
      o.querySelectorAll(i.el).forEach(d => {
        const p = os({}, i, {
          el: d
        });
        c.push(new Oi(p));
      });
      return c;
    }
    const u = this;
    u.__swiper__ = true;
    u.support = Xx();
    u.device = Kx({
      userAgent: i.userAgent
    });
    u.browser = Zx();
    u.eventsListeners = {};
    u.eventsAnyListeners = [];
    u.modules = [...u.__modules__];
    if (i.modules && Array.isArray(i.modules)) {
      i.modules.forEach(c => {
        if (typeof c == "function" && u.modules.indexOf(c) < 0) {
          u.modules.push(c);
        }
      });
    }
    const h = {};
    u.modules.forEach(c => {
      c({
        params: i,
        swiper: u,
        extendParams: BA(i, h),
        on: u.on.bind(u),
        once: u.once.bind(u),
        off: u.off.bind(u),
        emit: u.emit.bind(u)
      });
    });
    const a = os({}, Gg, h);
    u.params = os({}, a, ig, i);
    u.originalParams = os({}, u.params);
    u.passedParams = os({}, i);
    if (u.params && u.params.on) {
      Object.keys(u.params.on).forEach(c => {
        u.on(c, u.params.on[c]);
      });
    }
    if (u.params && u.params.onAny) {
      u.onAny(u.params.onAny);
    }
    Object.assign(u, {
      enabled: u.params.enabled,
      el: r,
      classNames: [],
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      isHorizontal() {
        return u.params.direction === "horizontal";
      },
      isVertical() {
        return u.params.direction === "vertical";
      },
      activeIndex: 0,
      realIndex: 0,
      isBeginning: true,
      isEnd: false,
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 8388608) * 8388608;
      },
      allowSlideNext: u.params.allowSlideNext,
      allowSlidePrev: u.params.allowSlidePrev,
      touchEventsData: {
        isTouched: undefined,
        isMoved: undefined,
        allowTouchCallbacks: undefined,
        touchStartTime: undefined,
        isScrolling: undefined,
        currentTranslate: undefined,
        startTranslate: undefined,
        allowThresholdMove: undefined,
        focusableElements: u.params.focusableElements,
        lastClickTime: 0,
        clickTimeout: undefined,
        velocities: [],
        allowMomentumBounce: undefined,
        startMoving: undefined,
        pointerId: null,
        touchId: null
      },
      allowClick: true,
      allowTouchMove: u.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      imagesToLoad: [],
      imagesLoaded: 0
    });
    u.emit("_swiper");
    if (u.params.init) {
      u.init();
    }
    return u;
  }
  getDirectionLabel(n) {
    if (this.isHorizontal()) {
      return n;
    } else {
      return {
        width: "height",
        "margin-top": "margin-left",
        "margin-bottom ": "margin-right",
        "margin-left": "margin-top",
        "margin-right": "margin-bottom",
        "padding-left": "padding-top",
        "padding-right": "padding-bottom",
        marginRight: "marginBottom"
      }[n];
    }
  }
  getSlideIndex(n) {
    const {
      slidesEl: r,
      params: i
    } = this;
    const o = zi(r, `.${i.slideClass}, swiper-slide`);
    const u = Cw(o[0]);
    return Cw(n) - u;
  }
  getSlideIndexByData(n) {
    return this.getSlideIndex(this.slides.find(r => r.getAttribute("data-swiper-slide-index") * 1 === n));
  }
  getSlideIndexWhenGrid(n) {
    if (this.grid && this.params.grid && this.params.grid.rows > 1) {
      if (this.params.grid.fill === "column") {
        n = Math.floor(n / this.params.grid.rows);
      } else if (this.params.grid.fill === "row") {
        n = n % Math.ceil(this.slides.length / this.params.grid.rows);
      }
    }
    return n;
  }
  recalcSlides() {
    const n = this;
    const {
      slidesEl: r,
      params: i
    } = n;
    n.slides = zi(r, `.${i.slideClass}, swiper-slide`);
  }
  enable() {
    const n = this;
    if (!n.enabled) {
      n.enabled = true;
      if (n.params.grabCursor) {
        n.setGrabCursor();
      }
      n.emit("enable");
    }
  }
  disable() {
    const n = this;
    if (n.enabled) {
      n.enabled = false;
      if (n.params.grabCursor) {
        n.unsetGrabCursor();
      }
      n.emit("disable");
    }
  }
  setProgress(n, r) {
    const i = this;
    n = Math.min(Math.max(n, 0), 1);
    const o = i.minTranslate();
    const h = (i.maxTranslate() - o) * n + o;
    i.translateTo(h, typeof r === "undefined" ? 0 : r);
    i.updateActiveIndex();
    i.updateSlidesClasses();
  }
  emitContainerClasses() {
    const n = this;
    if (!n.params._emitClasses || !n.el) {
      return;
    }
    const r = n.el.className.split(" ").filter(i => i.indexOf("swiper") === 0 || i.indexOf(n.params.containerModifierClass) === 0);
    n.emit("_containerClasses", r.join(" "));
  }
  getSlideClasses(n) {
    const r = this;
    if (r.destroyed) {
      return "";
    } else {
      return n.className.split(" ").filter(i => i.indexOf("swiper-slide") === 0 || i.indexOf(r.params.slideClass) === 0).join(" ");
    }
  }
  emitSlidesClasses() {
    const n = this;
    if (!n.params._emitClasses || !n.el) {
      return;
    }
    const r = [];
    n.slides.forEach(i => {
      const o = n.getSlideClasses(i);
      r.push({
        slideEl: i,
        classNames: o
      });
      n.emit("_slideClass", i, o);
    });
    n.emit("_slideClasses", r);
  }
  slidesPerViewDynamic(n = "current", r = false) {
    const i = this;
    const {
      params: o,
      slides: u,
      slidesGrid: h,
      slidesSizesGrid: a,
      size: c,
      activeIndex: d
    } = i;
    let p = 1;
    if (typeof o.slidesPerView == "number") {
      return o.slidesPerView;
    }
    if (o.centeredSlides) {
      let f = u[d] ? Math.ceil(u[d].swiperSlideSize) : 0;
      let S;
      for (let _ = d + 1; _ < u.length; _ += 1) {
        if (u[_] && !S) {
          f += Math.ceil(u[_].swiperSlideSize);
          p += 1;
          if (f > c) {
            S = true;
          }
        }
      }
      for (let _ = d - 1; _ >= 0; _ -= 1) {
        if (u[_] && !S) {
          f += u[_].swiperSlideSize;
          p += 1;
          if (f > c) {
            S = true;
          }
        }
      }
    } else if (n === "current") {
      for (let f = d + 1; f < u.length; f += 1) {
        if (r ? h[f] + a[f] - h[d] < c : h[f] - h[d] < c) {
          p += 1;
        }
      }
    } else {
      for (let f = d - 1; f >= 0; f -= 1) {
        if (h[d] - h[f] < c) {
          p += 1;
        }
      }
    }
    return p;
  }
  update() {
    const n = this;
    if (!n || n.destroyed) {
      return;
    }
    const {
      snapGrid: r,
      params: i
    } = n;
    if (i.breakpoints) {
      n.setBreakpoint();
    }
    [...n.el.querySelectorAll("[loading=\"lazy\"]")].forEach(h => {
      if (h.complete) {
        Cf(n, h);
      }
    });
    n.updateSize();
    n.updateSlides();
    n.updateProgress();
    n.updateSlidesClasses();
    function o() {
      const h = n.rtlTranslate ? n.translate * -1 : n.translate;
      const a = Math.min(Math.max(h, n.maxTranslate()), n.minTranslate());
      n.setTranslate(a);
      n.updateActiveIndex();
      n.updateSlidesClasses();
    }
    let u;
    if (i.freeMode && i.freeMode.enabled && !i.cssMode) {
      o();
      if (i.autoHeight) {
        n.updateAutoHeight();
      }
    } else {
      if ((i.slidesPerView === "auto" || i.slidesPerView > 1) && n.isEnd && !i.centeredSlides) {
        const h = n.virtual && i.virtual.enabled ? n.virtual.slides : n.slides;
        u = n.slideTo(h.length - 1, 0, false, true);
      } else {
        u = n.slideTo(n.activeIndex, 0, false, true);
      }
      if (!u) {
        o();
      }
    }
    if (i.watchOverflow && r !== n.snapGrid) {
      n.checkOverflow();
    }
    n.emit("update");
  }
  changeDirection(n, r = true) {
    const i = this;
    const o = i.params.direction;
    n ||= o === "horizontal" ? "vertical" : "horizontal";
    if (n !== o && (n === "horizontal" || n === "vertical")) {
      i.el.classList.remove(`${i.params.containerModifierClass}${o}`);
      i.el.classList.add(`${i.params.containerModifierClass}${n}`);
      i.emitContainerClasses();
      i.params.direction = n;
      i.slides.forEach(u => {
        if (n === "vertical") {
          u.style.width = "";
        } else {
          u.style.height = "";
        }
      });
      i.emit("changeDirection");
      if (r) {
        i.update();
      }
    }
    return i;
  }
  changeLanguageDirection(n) {
    const r = this;
    if ((!r.rtl || n !== "rtl") && (!!r.rtl || n !== "ltr")) {
      r.rtl = n === "rtl";
      r.rtlTranslate = r.params.direction === "horizontal" && r.rtl;
      if (r.rtl) {
        r.el.classList.add(`${r.params.containerModifierClass}rtl`);
        r.el.dir = "rtl";
      } else {
        r.el.classList.remove(`${r.params.containerModifierClass}rtl`);
        r.el.dir = "ltr";
      }
      r.update();
    }
  }
  mount(n) {
    const r = this;
    if (r.mounted) {
      return true;
    }
    let i = n || r.params.el;
    if (typeof i == "string") {
      i = document.querySelector(i);
    }
    if (!i) {
      return false;
    }
    i.swiper = r;
    if (i.parentNode && i.parentNode.host && i.parentNode.host.nodeName === r.params.swiperElementNodeName.toUpperCase()) {
      r.isElement = true;
    }
    const o = () => `.${(r.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let h = i && i.shadowRoot && i.shadowRoot.querySelector ? i.shadowRoot.querySelector(o()) : zi(i, o())[0];
    if (!h && r.params.createElements) {
      h = $g("div", r.params.wrapperClass);
      i.append(h);
      zi(i, `.${r.params.slideClass}`).forEach(a => {
        h.append(a);
      });
    }
    Object.assign(r, {
      el: i,
      wrapperEl: h,
      slidesEl: r.isElement && !i.parentNode.host.slideSlots ? i.parentNode.host : h,
      hostEl: r.isElement ? i.parentNode.host : i,
      mounted: true,
      rtl: i.dir.toLowerCase() === "rtl" || So(i, "direction") === "rtl",
      rtlTranslate: r.params.direction === "horizontal" && (i.dir.toLowerCase() === "rtl" || So(i, "direction") === "rtl"),
      wrongRTL: So(h, "display") === "-webkit-box"
    });
    return true;
  }
  init(n) {
    const r = this;
    if (r.initialized || r.mount(n) === false) {
      return r;
    }
    r.emit("beforeInit");
    if (r.params.breakpoints) {
      r.setBreakpoint();
    }
    r.addClasses();
    r.updateSize();
    r.updateSlides();
    if (r.params.watchOverflow) {
      r.checkOverflow();
    }
    if (r.params.grabCursor && r.enabled) {
      r.setGrabCursor();
    }
    if (r.params.loop && r.virtual && r.params.virtual.enabled) {
      r.slideTo(r.params.initialSlide + r.virtual.slidesBefore, 0, r.params.runCallbacksOnInit, false, true);
    } else {
      r.slideTo(r.params.initialSlide, 0, r.params.runCallbacksOnInit, false, true);
    }
    if (r.params.loop) {
      r.loopCreate(undefined, true);
    }
    r.attachEvents();
    const o = [...r.el.querySelectorAll("[loading=\"lazy\"]")];
    if (r.isElement) {
      o.push(...r.hostEl.querySelectorAll("[loading=\"lazy\"]"));
    }
    o.forEach(u => {
      if (u.complete) {
        Cf(r, u);
      } else {
        u.addEventListener("load", h => {
          Cf(r, h.target);
        });
      }
    });
    qg(r);
    r.initialized = true;
    qg(r);
    r.emit("init");
    r.emit("afterInit");
    return r;
  }
  destroy(n = true, r = true) {
    const i = this;
    const {
      params: o,
      el: u,
      wrapperEl: h,
      slides: a
    } = i;
    if (typeof i.params !== "undefined" && !i.destroyed) {
      i.emit("beforeDestroy");
      i.initialized = false;
      i.detachEvents();
      if (o.loop) {
        i.loopDestroy();
      }
      if (r) {
        i.removeClasses();
        if (u && typeof u != "string") {
          u.removeAttribute("style");
        }
        if (h) {
          h.removeAttribute("style");
        }
        if (a && a.length) {
          a.forEach(c => {
            c.classList.remove(o.slideVisibleClass, o.slideFullyVisibleClass, o.slideActiveClass, o.slideNextClass, o.slidePrevClass);
            c.removeAttribute("style");
            c.removeAttribute("data-swiper-slide-index");
          });
        }
      }
      i.emit("destroy");
      Object.keys(i.eventsListeners).forEach(c => {
        i.off(c);
      });
      if (n !== false) {
        if (i.el && typeof i.el != "string") {
          i.el.swiper = null;
        }
        yk(i);
      }
      i.destroyed = true;
    }
    return null;
  }
  static extendDefaults(n) {
    os(ig, n);
  }
  static get extendedDefaults() {
    return ig;
  }
  static get defaults() {
    return Gg;
  }
  static installModule(n) {
    Oi.prototype.__modules__ ||= [];
    const r = Oi.prototype.__modules__;
    if (typeof n == "function" && r.indexOf(n) < 0) {
      r.push(n);
    }
  }
  static use(n) {
    if (Array.isArray(n)) {
      n.forEach(r => Oi.installModule(r));
      return Oi;
    } else {
      Oi.installModule(n);
      return Oi;
    }
  }
};
Object.keys(sg).forEach(e => {
  Object.keys(sg[e]).forEach(n => {
    Av.prototype[n] = sg[e][n];
  });
});
Av.use([Ok, Dk]);
const e1 = ["eventsPrefix", "injectStyles", "injectStylesUrls", "modules", "init", "_direction", "oneWayMovement", "swiperElementNodeName", "touchEventsTarget", "initialSlide", "_speed", "cssMode", "updateOnWindowResize", "resizeObserver", "nested", "focusableElements", "_enabled", "_width", "_height", "preventInteractionOnTransition", "userAgent", "url", "_edgeSwipeDetection", "_edgeSwipeThreshold", "_freeMode", "_autoHeight", "setWrapperSize", "virtualTranslate", "_effect", "breakpoints", "breakpointsBase", "_spaceBetween", "_slidesPerView", "maxBackfaceHiddenSlides", "_grid", "_slidesPerGroup", "_slidesPerGroupSkip", "_slidesPerGroupAuto", "_centeredSlides", "_centeredSlidesBounds", "_slidesOffsetBefore", "_slidesOffsetAfter", "normalizeSlideIndex", "_centerInsufficientSlides", "_snapToSlideEdge", "_watchOverflow", "roundLengths", "touchRatio", "touchAngle", "simulateTouch", "_shortSwipes", "_longSwipes", "longSwipesRatio", "longSwipesMs", "_followFinger", "allowTouchMove", "_threshold", "touchMoveStopPropagation", "touchStartPreventDefault", "touchStartForcePreventDefault", "touchReleaseOnEdges", "uniqueNavElements", "_resistance", "_resistanceRatio", "_watchSlidesProgress", "_grabCursor", "preventClicks", "preventClicksPropagation", "_slideToClickedSlide", "_loop", "loopAdditionalSlides", "loopAddBlankSlides", "loopPreventsSliding", "_rewind", "_allowSlidePrev", "_allowSlideNext", "_swipeHandler", "_noSwiping", "noSwipingClass", "noSwipingSelector", "passiveListeners", "containerModifierClass", "slideClass", "slideActiveClass", "slideVisibleClass", "slideFullyVisibleClass", "slideNextClass", "slidePrevClass", "slideBlankClass", "wrapperClass", "lazyPreloaderClass", "lazyPreloadPrevNext", "runCallbacksOnInit", "observer", "observeParents", "observeSlideChildren", "a11y", "_autoplay", "_controller", "coverflowEffect", "cubeEffect", "fadeEffect", "flipEffect", "creativeEffect", "cardsEffect", "hashNavigation", "history", "keyboard", "mousewheel", "_navigation", "_pagination", "parallax", "_scrollbar", "_thumbs", "virtual", "zoom", "control"];
function ka(e) {
  return typeof e == "object" && e !== null && e.constructor && Object.prototype.toString.call(e).slice(8, -1) === "Object" && !e.__swiper__;
}
function Dl(e, n) {
  const r = ["__proto__", "constructor", "prototype"];
  Object.keys(n).filter(i => r.indexOf(i) < 0).forEach(i => {
    if (typeof e[i] === "undefined") {
      e[i] = n[i];
    } else if (ka(n[i]) && ka(e[i]) && Object.keys(n[i]).length > 0) {
      if (n[i].__swiper__) {
        e[i] = n[i];
      } else {
        Dl(e[i], n[i]);
      }
    } else {
      e[i] = n[i];
    }
  });
}
function t1(e = {}) {
  return e.navigation && typeof e.navigation.nextEl === "undefined" && typeof e.navigation.prevEl === "undefined";
}
function n1(e = {}) {
  return e.pagination && typeof e.pagination.el === "undefined";
}
function r1(e = {}) {
  return e.scrollbar && typeof e.scrollbar.el === "undefined";
}
function s1(e = "") {
  const n = e.split(" ").map(i => i.trim()).filter(i => !!i);
  const r = [];
  n.forEach(i => {
    if (r.indexOf(i) < 0) {
      r.push(i);
    }
  });
  return r.join(" ");
}
function zA(e = "") {
  if (e) {
    if (e.includes("swiper-wrapper")) {
      return e;
    } else {
      return `swiper-wrapper ${e}`;
    }
  } else {
    return "swiper-wrapper";
  }
}
function NA({
  swiper: e,
  slides: n,
  passedParams: r,
  changedParams: i,
  nextEl: o,
  prevEl: u,
  scrollbarEl: h,
  paginationEl: a
}) {
  const c = i.filter(R => R !== "children" && R !== "direction" && R !== "wrapperClass");
  const {
    params: d,
    pagination: p,
    navigation: f,
    scrollbar: S,
    virtual: _,
    thumbs: x
  } = e;
  let w;
  let g;
  let b;
  let m;
  let v;
  let C;
  let T;
  let A;
  if (i.includes("thumbs") && r.thumbs && r.thumbs.swiper && !r.thumbs.swiper.destroyed && d.thumbs && (!d.thumbs.swiper || d.thumbs.swiper.destroyed)) {
    w = true;
  }
  if (i.includes("controller") && r.controller && r.controller.control && d.controller && !d.controller.control) {
    g = true;
  }
  if (i.includes("pagination") && r.pagination && (r.pagination.el || a) && (d.pagination || d.pagination === false) && p && !p.el) {
    b = true;
  }
  if (i.includes("scrollbar") && r.scrollbar && (r.scrollbar.el || h) && (d.scrollbar || d.scrollbar === false) && S && !S.el) {
    m = true;
  }
  if (i.includes("navigation") && r.navigation && (r.navigation.prevEl || u) && (r.navigation.nextEl || o) && (d.navigation || d.navigation === false) && f && !f.prevEl && !f.nextEl) {
    v = true;
  }
  const M = R => {
    if (e[R]) {
      e[R].destroy();
      if (R === "navigation") {
        if (e.isElement) {
          e[R].prevEl.remove();
          e[R].nextEl.remove();
        }
        d[R].prevEl = undefined;
        d[R].nextEl = undefined;
        e[R].prevEl = undefined;
        e[R].nextEl = undefined;
      } else {
        if (e.isElement) {
          e[R].el.remove();
        }
        d[R].el = undefined;
        e[R].el = undefined;
      }
    }
  };
  if (i.includes("loop") && e.isElement) {
    if (d.loop && !r.loop) {
      C = true;
    } else if (!d.loop && r.loop) {
      T = true;
    } else {
      A = true;
    }
  }
  c.forEach(R => {
    if (ka(d[R]) && ka(r[R])) {
      Object.assign(d[R], r[R]);
      if ((R === "navigation" || R === "pagination" || R === "scrollbar") && "enabled" in r[R] && !r[R].enabled) {
        M(R);
      }
    } else {
      const I = r[R];
      if ((I === true || I === false) && (R === "navigation" || R === "pagination" || R === "scrollbar")) {
        if (I === false) {
          M(R);
        }
      } else {
        d[R] = r[R];
      }
    }
  });
  if (c.includes("controller") && !g && e.controller && e.controller.control && d.controller && d.controller.control) {
    e.controller.control = d.controller.control;
  }
  if (i.includes("children") && n && _ && d.virtual.enabled) {
    _.slides = n;
    _.update(true);
  } else if (i.includes("virtual") && _ && d.virtual.enabled) {
    if (n) {
      _.slides = n;
    }
    _.update(true);
  }
  if (i.includes("children") && n && d.loop) {
    A = true;
  }
  if (w && x.init()) {
    x.update(true);
  }
  if (g) {
    e.controller.control = d.controller.control;
  }
  if (b) {
    if (e.isElement && (!a || typeof a == "string")) {
      a = document.createElement("div");
      a.classList.add("swiper-pagination");
      a.part.add("pagination");
      e.el.appendChild(a);
    }
    if (a) {
      d.pagination.el = a;
    }
    p.init();
    p.render();
    p.update();
  }
  if (m) {
    if (e.isElement && (!h || typeof h == "string")) {
      h = document.createElement("div");
      h.classList.add("swiper-scrollbar");
      h.part.add("scrollbar");
      e.el.appendChild(h);
    }
    if (h) {
      d.scrollbar.el = h;
    }
    S.init();
    S.updateSize();
    S.setTranslate();
  }
  if (v) {
    if (e.isElement) {
      if (!o || typeof o == "string") {
        o = document.createElement("div");
        o.classList.add("swiper-button-next");
        Rw(o, e.navigation.arrowSvg);
        o.part.add("button-next");
        e.el.appendChild(o);
      }
      if (!u || typeof u == "string") {
        u = document.createElement("div");
        u.classList.add("swiper-button-prev");
        Rw(u, e.navigation.arrowSvg);
        u.part.add("button-prev");
        e.el.appendChild(u);
      }
    }
    if (o) {
      d.navigation.nextEl = o;
    }
    if (u) {
      d.navigation.prevEl = u;
    }
    f.init();
    f.update();
  }
  if (i.includes("allowSlideNext")) {
    e.allowSlideNext = r.allowSlideNext;
  }
  if (i.includes("allowSlidePrev")) {
    e.allowSlidePrev = r.allowSlidePrev;
  }
  if (i.includes("direction")) {
    e.changeDirection(r.direction, false);
  }
  if (C || A) {
    e.loopDestroy();
  }
  if (T || A) {
    e.loopCreate();
  }
  e.update();
}
function jA(e = {}, n = true) {
  const r = {
    on: {}
  };
  const i = {};
  const o = {};
  Dl(r, Gg);
  r._emitClasses = true;
  r.init = false;
  const u = {};
  const h = e1.map(c => c.replace(/_/, ""));
  const a = Object.assign({}, e);
  Object.keys(a).forEach(c => {
    if (typeof e[c] !== "undefined") {
      if (h.indexOf(c) >= 0) {
        if (ka(e[c])) {
          r[c] = {};
          o[c] = {};
          Dl(r[c], e[c]);
          Dl(o[c], e[c]);
        } else {
          r[c] = e[c];
          o[c] = e[c];
        }
      } else if (c.search(/on[A-Z]/) === 0 && typeof e[c] == "function") {
        if (n) {
          i[`${c[2].toLowerCase()}${c.substr(3)}`] = e[c];
        } else {
          r.on[`${c[2].toLowerCase()}${c.substr(3)}`] = e[c];
        }
      } else {
        u[c] = e[c];
      }
    }
  });
  ["navigation", "pagination", "scrollbar"].forEach(c => {
    if (r[c] === true) {
      r[c] = {};
    }
    if (r[c] === false) {
      delete r[c];
    }
  });
  return {
    params: r,
    passedParams: o,
    rest: u,
    events: i
  };
}
function HA({
  el: e,
  nextEl: n,
  prevEl: r,
  paginationEl: i,
  scrollbarEl: o,
  swiper: u
}, h) {
  if (t1(h) && n && r) {
    u.params.navigation.nextEl = n;
    u.originalParams.navigation.nextEl = n;
    u.params.navigation.prevEl = r;
    u.originalParams.navigation.prevEl = r;
  }
  if (n1(h) && i) {
    u.params.pagination.el = i;
    u.originalParams.pagination.el = i;
  }
  if (r1(h) && o) {
    u.params.scrollbar.el = o;
    u.originalParams.scrollbar.el = o;
  }
  u.init(e);
}
function FA(e, n, r, i, o) {
  const u = [];
  if (!n) {
    return u;
  }
  const h = c => {
    if (u.indexOf(c) < 0) {
      u.push(c);
    }
  };
  if (r && i) {
    const c = i.map(o);
    const d = r.map(o);
    if (c.join("") !== d.join("")) {
      h("children");
    }
    if (i.length !== r.length) {
      h("children");
    }
  }
  e1.filter(c => c[0] === "_").map(c => c.replace(/_/, "")).forEach(c => {
    if (c in e && c in n) {
      if (ka(e[c]) && ka(n[c])) {
        const d = Object.keys(e[c]);
        const p = Object.keys(n[c]);
        if (d.length !== p.length) {
          h(c);
        } else {
          d.forEach(f => {
            if (e[c][f] !== n[c][f]) {
              h(c);
            }
          });
          p.forEach(f => {
            if (e[c][f] !== n[c][f]) {
              h(c);
            }
          });
        }
      } else if (e[c] !== n[c]) {
        h(c);
      }
    }
  });
  return u;
}
const UA = e => {
  if (!!e && !e.destroyed && !!e.params.virtual && (!e.params.virtual || !!e.params.virtual.enabled)) {
    e.updateSlides();
    e.updateProgress();
    e.updateSlidesClasses();
    e.emit("_virtualUpdated");
    if (e.parallax && e.params.parallax && e.params.parallax.enabled) {
      e.parallax.setTranslate();
    }
  }
};
function Bf() {
  Bf = Object.assign ? Object.assign.bind() : function (e) {
    for (var n = 1; n < arguments.length; n++) {
      var r = arguments[n];
      for (var i in r) {
        if (Object.prototype.hasOwnProperty.call(r, i)) {
          e[i] = r[i];
        }
      }
    }
    return e;
  };
  return Bf.apply(this, arguments);
}
function i1(e) {
  return e.type && e.type.displayName && e.type.displayName.includes("SwiperSlide");
}
function o1(e) {
  const n = [];
  Dn.Children.toArray(e).forEach(r => {
    if (i1(r)) {
      n.push(r);
    } else if (r.props && r.props.children) {
      o1(r.props.children).forEach(i => n.push(i));
    }
  });
  return n;
}
function VA(e) {
  const n = [];
  const r = {
    "container-start": [],
    "container-end": [],
    "wrapper-start": [],
    "wrapper-end": []
  };
  Dn.Children.toArray(e).forEach(i => {
    if (i1(i)) {
      n.push(i);
    } else if (i.props && i.props.slot && r[i.props.slot]) {
      r[i.props.slot].push(i);
    } else if (i.props && i.props.children) {
      const o = o1(i.props.children);
      if (o.length > 0) {
        o.forEach(u => n.push(u));
      } else {
        r["container-end"].push(i);
      }
    } else {
      r["container-end"].push(i);
    }
  });
  return {
    slides: n,
    slots: r
  };
}
function WA(e, n, r) {
  if (!r) {
    return null;
  }
  const i = p => {
    let f = p;
    if (p < 0) {
      f = n.length + p;
    } else if (f >= n.length) {
      f = f - n.length;
    }
    return f;
  };
  const o = e.isHorizontal() ? {
    [e.rtlTranslate ? "right" : "left"]: `${r.offset}px`
  } : {
    top: `${r.offset}px`
  };
  const {
    from: u,
    to: h
  } = r;
  const a = e.params.loop ? -n.length : 0;
  const c = e.params.loop ? n.length * 2 : n.length;
  const d = [];
  for (let p = a; p < c; p += 1) {
    if (p >= u && p <= h) {
      d.push(n[i(p)]);
    }
  }
  return d.map((p, f) => Dn.cloneElement(p, {
    swiper: e,
    style: o,
    key: p.props.virtualIndex || p.key || `slide-${f}`
  }));
}
function eu(e, n) {
  if (typeof window === "undefined") {
    return E.useEffect(e, n);
  } else {
    return E.useLayoutEffect(e, n);
  }
}
const Ow = E.createContext(null);
const $A = E.createContext(null);
const _Component104 = E.forwardRef(({
  className: e,
  tag: n = "div",
  wrapperTag: r = "div",
  children: i,
  onSwiper: o,
  ...u
} = {}, h) => {
  let a = false;
  const [c, d] = E.useState("swiper");
  const [p, f] = E.useState(null);
  const [S, _] = E.useState(false);
  const x = E.useRef(false);
  const w = E.useRef(null);
  const g = E.useRef(null);
  const b = E.useRef(null);
  const m = E.useRef(null);
  const v = E.useRef(null);
  const C = E.useRef(null);
  const T = E.useRef(null);
  const A = E.useRef(null);
  const {
    params: M,
    passedParams: R,
    rest: I,
    events: j
  } = jA(u);
  const {
    slides: W,
    slots: z
  } = VA(i);
  const N = () => {
    _(!S);
  };
  Object.assign(M.on, {
    _containerClasses(U, L) {
      d(L);
    }
  });
  const D = () => {
    Object.assign(M.on, j);
    a = true;
    const U = {
      ...M
    };
    delete U.wrapperClass;
    g.current = new Av(U);
    if (g.current.virtual && g.current.params.virtual.enabled) {
      g.current.virtual.slides = W;
      const L = {
        cache: false,
        slides: W,
        renderExternal: f,
        renderExternalUpdate: false
      };
      Dl(g.current.params.virtual, L);
      Dl(g.current.originalParams.virtual, L);
    }
  };
  if (!w.current) {
    D();
  }
  if (g.current) {
    g.current.on("_beforeBreakpoint", N);
  }
  const $ = () => {
    if (!a && !!j && !!g.current) {
      Object.keys(j).forEach(U => {
        g.current.on(U, j[U]);
      });
    }
  };
  const G = () => {
    if (!!j && !!g.current) {
      Object.keys(j).forEach(U => {
        g.current.off(U, j[U]);
      });
    }
  };
  E.useEffect(() => () => {
    if (g.current) {
      g.current.off("_beforeBreakpoint", N);
    }
  });
  E.useEffect(() => {
    if (!x.current && g.current) {
      g.current.emitSlidesClasses();
      x.current = true;
    }
  });
  eu(() => {
    if (h) {
      h.current = w.current;
    }
    if (w.current) {
      if (g.current.destroyed) {
        D();
      }
      HA({
        el: w.current,
        nextEl: v.current,
        prevEl: C.current,
        paginationEl: T.current,
        scrollbarEl: A.current,
        swiper: g.current
      }, M);
      if (o && !g.current.destroyed) {
        o(g.current);
      }
      return () => {
        if (g.current && !g.current.destroyed) {
          g.current.destroy(true, false);
        }
      };
    }
  }, []);
  eu(() => {
    $();
    const U = FA(R, b.current, W, m.current, L => L.key);
    b.current = R;
    m.current = W;
    if (U.length && g.current && !g.current.destroyed) {
      NA({
        swiper: g.current,
        slides: W,
        passedParams: R,
        changedParams: U,
        nextEl: v.current,
        prevEl: C.current,
        scrollbarEl: A.current,
        paginationEl: T.current
      });
    }
    return () => {
      G();
    };
  });
  eu(() => {
    UA(g.current);
  }, [p]);
  function q() {
    if (M.virtual) {
      return WA(g.current, W, p);
    } else {
      return W.map((U, L) => Dn.cloneElement(U, {
        swiper: g.current,
        swiperSlideIndex: L
      }));
    }
  }
  return Dn.createElement(n, Bf({
    ref: w,
    className: s1(`${c}${e ? ` ${e}` : ""}`)
  }, I), Dn.createElement($A.Provider, {
    value: g.current
  }, z["container-start"], Dn.createElement(r, {
    className: zA(M.wrapperClass)
  }, z["wrapper-start"], q(), z["wrapper-end"]), t1(M) && Dn.createElement(Dn.Fragment, null, Dn.createElement("div", {
    ref: C,
    className: "swiper-button-prev"
  }), Dn.createElement("div", {
    ref: v,
    className: "swiper-button-next"
  })), r1(M) && Dn.createElement("div", {
    ref: A,
    className: "swiper-scrollbar"
  }), n1(M) && Dn.createElement("div", {
    ref: T,
    className: "swiper-pagination"
  }), z["container-end"]));
});
_Component104.displayName = "Swiper";
const _Component103 = E.forwardRef(({
  tag: e = "div",
  children: n,
  className: r = "",
  swiper: i,
  zoom: o,
  lazy: u,
  virtualIndex: h,
  swiperSlideIndex: a,
  ...c
} = {}, d) => {
  const p = E.useRef(null);
  const [f, S] = E.useState("swiper-slide");
  const [_, x] = E.useState(false);
  function w(v, C, T) {
    if (C === p.current) {
      S(T);
    }
  }
  eu(() => {
    if (typeof a !== "undefined") {
      p.current.swiperSlideIndex = a;
    }
    if (d) {
      d.current = p.current;
    }
    if (!!p.current && !!i) {
      if (i.destroyed) {
        if (f !== "swiper-slide") {
          S("swiper-slide");
        }
        return;
      }
      i.on("_slideClass", w);
      return () => {
        if (i) {
          i.off("_slideClass", w);
        }
      };
    }
  });
  eu(() => {
    if (i && p.current && !i.destroyed) {
      S(i.getSlideClasses(p.current));
    }
  }, [i]);
  const g = {
    isActive: f.indexOf("swiper-slide-active") >= 0,
    isVisible: f.indexOf("swiper-slide-visible") >= 0,
    isFullyVisible: f.indexOf("swiper-slide-fully-visible") >= 0,
    isPrev: f.indexOf("swiper-slide-prev") >= 0,
    isNext: f.indexOf("swiper-slide-next") >= 0
  };
  const b = () => typeof n == "function" ? n(g) : n;
  const m = () => {
    x(true);
  };
  return Dn.createElement(e, Bf({
    ref: p,
    className: s1(`${f}${r ? ` ${r}` : ""}`),
    "data-swiper-slide-index": h,
    onLoad: m
  }, c), o && Dn.createElement(Ow.Provider, {
    value: g
  }, Dn.createElement("div", {
    className: "swiper-zoom-container",
    "data-swiper-zoom": typeof o == "number" ? o : undefined
  }, b(), u && !_ && Dn.createElement("div", {
    className: "swiper-lazy-preloader",
    ref: v => {
      if (v) {
        v.lazyPreloaderManaged = true;
      }
    }
  }))), !o && Dn.createElement(Ow.Provider, {
    value: g
  }, b(), u && !_ && Dn.createElement("div", {
    className: "swiper-lazy-preloader",
    ref: v => {
      if (v) {
        v.lazyPreloaderManaged = true;
      }
    }
  })));
});
_Component103.displayName = "SwiperSlide";
const qA = "https://stackblitz.com";
const GA = new Error();
GA.stack = "";
const og = {};
let $d = null;
const ag = {
  get editorOrigin() {
    if ($d == null) {
      $d = new URL(globalThis.WEBCONTAINER_API_IFRAME_URL ?? qA).origin;
    }
    return $d;
  },
  set editorOrigin(e) {
    $d = new URL(e).origin;
  },
  setQueryParam(e, n) {
    og[e] = n;
  },
  get url() {
    const e = new URL(this.editorOrigin);
    e.pathname = "/headless";
    for (const n in og) {
      e.searchParams.set(n, og[n]);
    }
    e.searchParams.set("version", "1.6.4");
    return e;
  }
};
function YA() {
  let e;
  let n;
  function r() {
    n = new Promise(i => e = i);
  }
  r();
  return {
    get promise() {
      return n;
    },
    resolve(i) {
      return e(i);
    },
    reset: r
  };
}
YA();
var tu;
(function (e) {
  e.UncaughtException = "PREVIEW_UNCAUGHT_EXCEPTION";
  e.UnhandledRejection = "PREVIEW_UNHANDLED_REJECTION";
  e.ConsoleError = "PREVIEW_CONSOLE_ERROR";
})(tu ||= {});
var XA = Object.defineProperty;
var KA = (e, n) => {
  for (var r in n) {
    XA(e, r, {
      get: n[r],
      enumerable: true
    });
  }
};
var ri = {};
KA(ri, {
  createEndpoint: () => c1,
  expose: () => Dv,
  proxy: () => g1,
  proxyMarker: () => Mv,
  releaseProxy: () => u1,
  transfer: () => m1,
  transferHandlers: () => Ov,
  windowEndpoint: () => tM,
  wrap: () => h1
});
var Mv = Symbol("Comlink.proxy");
var c1 = Symbol("Comlink.endpoint");
var u1 = Symbol("Comlink.releaseProxy");
var Yg = Symbol("Comlink.thrown");
var d1 = e => typeof e == "object" && e !== null || typeof e == "function";
var ZA = {
  canHandle: e => d1(e) && e[Mv],
  serialize(e) {
    const {
      port1: n,
      port2: r
    } = new MessageChannel();
    Dv(e, n);
    return [r, [r]];
  },
  deserialize(e) {
    e.start();
    return h1(e);
  }
};
var QA = {
  canHandle: e => d1(e) && Yg in e,
  serialize({
    value: e
  }) {
    let n;
    if (e instanceof Error) {
      n = {
        isError: true,
        value: {
          message: e.message,
          name: e.name,
          stack: e.stack
        }
      };
    } else {
      n = {
        isError: false,
        value: e
      };
    }
    return [n, []];
  },
  deserialize(e) {
    throw e.isError ? Object.assign(new Error(e.value.message), e.value) : e.value;
  }
};
var Ov = new Map([["proxy", ZA], ["throw", QA]]);
function Dv(e, n = self) {
  n.addEventListener("message", function r(i) {
    if (!i || !i.data) {
      return;
    }
    const {
      id: o,
      type: u,
      path: h
    } = Object.assign({
      path: []
    }, i.data);
    const a = (i.data.argumentList || []).map(ya);
    let c;
    try {
      const d = h.slice(0, -1).reduce((f, S) => f[S], e);
      const p = h.reduce((f, S) => f[S], e);
      switch (u) {
        case 0:
          c = p;
          break;
        case 1:
          d[h.slice(-1)[0]] = ya(i.data.value);
          c = true;
          break;
        case 2:
          c = p.apply(d, a);
          break;
        case 3:
          {
            const f = new p(...a);
            c = g1(f);
          }
          break;
        case 4:
          {
            const {
              port1: f,
              port2: S
            } = new MessageChannel();
            Dv(e, S);
            c = m1(f, [f]);
          }
          break;
        case 5:
          c = undefined;
          break;
      }
    } catch (d) {
      c = {
        value: d,
        [Yg]: 0
      };
    }
    Promise.resolve(c).catch(d => ({
      value: d,
      [Yg]: 0
    })).then(d => {
      const [p, f] = Iv(d);
      n.postMessage(Object.assign(Object.assign({}, p), {
        id: o
      }), f);
      if (u === 5) {
        n.removeEventListener("message", r);
        f1(n);
      }
    });
  });
  if (n.start) {
    n.start();
  }
}
function JA(e) {
  return e.constructor.name === "MessagePort";
}
function f1(e) {
  if (JA(e)) {
    e.close();
  }
}
function h1(e, n) {
  return Xg(e, [], n);
}
function qd(e) {
  if (e) {
    throw new Error("Proxy has been released and is not useable");
  }
}
function Xg(e, n = [], r = function () {}) {
  let i = false;
  const o = new Proxy(r, {
    get(u, h) {
      qd(i);
      if (h === u1) {
        return () => Rl(e, {
          type: 5,
          path: n.map(a => a.toString())
        }).then(() => {
          f1(e);
          i = true;
        });
      }
      if (h === "then") {
        if (n.length === 0) {
          return {
            then: () => o
          };
        }
        const a = Rl(e, {
          type: 0,
          path: n.map(c => c.toString())
        }).then(ya);
        return a.then.bind(a);
      }
      return Xg(e, [...n, h]);
    },
    set(u, h, a) {
      qd(i);
      const [c, d] = Iv(a);
      return Rl(e, {
        type: 1,
        path: [...n, h].map(p => p.toString()),
        value: c
      }, d).then(ya);
    },
    apply(u, h, a) {
      qd(i);
      const c = n[n.length - 1];
      if (c === c1) {
        return Rl(e, {
          type: 4
        }).then(ya);
      }
      if (c === "bind") {
        return Xg(e, n.slice(0, -1));
      }
      const [d, p] = Dw(a);
      return Rl(e, {
        type: 2,
        path: n.map(f => f.toString()),
        argumentList: d
      }, p).then(ya);
    },
    construct(u, h) {
      qd(i);
      const [a, c] = Dw(h);
      return Rl(e, {
        type: 3,
        path: n.map(d => d.toString()),
        argumentList: a
      }, c).then(ya);
    }
  });
  return o;
}
function eM(e) {
  return Array.prototype.concat.apply([], e);
}
function Dw(e) {
  const n = e.map(Iv);
  return [n.map(r => r[0]), eM(n.map(r => r[1]))];
}
var p1 = new WeakMap();
function m1(e, n) {
  p1.set(e, n);
  return e;
}
function g1(e) {
  return Object.assign(e, {
    [Mv]: true
  });
}
function tM(e, n = self, r = "*") {
  return {
    postMessage: (i, o) => e.postMessage(i, r, o),
    addEventListener: n.addEventListener.bind(n),
    removeEventListener: n.removeEventListener.bind(n)
  };
}
function Iv(e) {
  for (const [n, r] of Ov) {
    if (r.canHandle(e)) {
      const [i, o] = r.serialize(e);
      return [{
        type: 3,
        name: n,
        value: i
      }, o];
    }
  }
  return [{
    type: 0,
    value: e
  }, p1.get(e) || []];
}
function ya(e) {
  switch (e.type) {
    case 3:
      return Ov.get(e.name).deserialize(e.value);
    case 0:
      return e.value;
  }
}
function Rl(e, n, r) {
  return new Promise(i => {
    const o = nM();
    e.addEventListener("message", function u(h) {
      if (!!h.data && !!h.data.id && h.data.id === o) {
        e.removeEventListener("message", u);
        i(h.data);
      }
    });
    if (e.start) {
      e.start();
    }
    e.postMessage(Object.assign({
      id: o
    }, n), r);
  });
}
function nM() {
  return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
}
const rM = [tu.ConsoleError, tu.UncaughtException, tu.UnhandledRejection];
function sM(e) {
  return e != null && typeof e == "object" && !!("type" in e) && !!rM.includes(e.type);
}
function Tl(e) {
  const n = Object.create(null);
  if (e) {
    return Object.assign(n, e);
  } else {
    return n;
  }
}
function v1(e) {
  const n = {
    d: {}
  };
  for (const r of Object.keys(e)) {
    const i = e[r];
    if ("file" in i) {
      if ("symlink" in i.file) {
        n.d[r] = {
          f: {
            l: i.file.symlink
          }
        };
        continue;
      }
      const u = i.file.contents;
      const h = typeof u == "string" ? u : oM(u);
      const a = typeof u == "string" ? {} : {
        b: true
      };
      n.d[r] = {
        f: {
          c: h,
          ...a
        }
      };
      continue;
    }
    const o = v1(i.directory);
    n.d[r] = o;
  }
  return n;
}
function b1(e) {
  const n = Tl();
  if ("f" in e) {
    throw new Error("It is not possible to export a single file in the JSON format.");
  }
  if ("d" in e) {
    for (const r of Object.keys(e.d)) {
      const i = e.d[r];
      if ("d" in i) {
        n[r] = Tl({
          directory: b1(i)
        });
      } else if ("f" in i) {
        if ("c" in i.f) {
          n[r] = Tl({
            file: Tl({
              contents: i.f.b ? iM(i.f.c) : i.f.c
            })
          });
        } else if ("l" in i.f) {
          n[r] = Tl({
            file: Tl({
              symlink: i.f.l
            })
          });
        }
      }
    }
  }
  return n;
}
function iM(e) {
  const n = new Uint8Array(e.length);
  for (let r = 0; r < e.length; r++) {
    n[r] = e[r].charCodeAt(0);
  }
  return n;
}
function oM(e) {
  let n = "";
  for (let r = 0; r < e.length; r++) {
    n += String.fromCharCode(e[r]);
  }
  return n;
}
let Gd = null;
let Yd = null;
let lg = {};
const y1 = new TextDecoder();
const aM = new TextEncoder();
const Js = class Js {
  constructor(n, r, i, o) {
    tt(this, "_instance");
    tt(this, "_runtimeInfo");
    tt(this, "fs");
    tt(this, "_tornDown", false);
    tt(this, "_unsubscribeFromTokenChangedListener", () => {});
    this._instance = n;
    this._runtimeInfo = o;
    this.fs = new hM(r);
  }
  async spawn(n, r, i) {
    let o = [];
    if (Array.isArray(r)) {
      o = r;
    } else {
      i = r;
    }
    let u;
    let h = new ReadableStream();
    if ((i == null ? undefined : i.output) !== false) {
      const w = bM();
      u = w.push;
      h = w.stream;
    }
    let a;
    let c;
    let d;
    let p;
    const f = Ef(cg(u));
    const S = Ef(cg(a));
    const _ = Ef(cg(d));
    const x = await this._instance.run({
      command: n,
      args: o,
      cwd: i == null ? undefined : i.cwd,
      env: i == null ? undefined : i.env,
      terminal: i == null ? undefined : i.terminal
    }, S, _, f);
    return new fM(x, h, c, p);
  }
  async export(n, r) {
    const i = {
      format: (r == null ? undefined : r.format) ?? "json",
      includes: r == null ? undefined : r.includes,
      excludes: r == null ? undefined : r.excludes,
      external: true
    };
    const o = await this._instance.serialize(n, i);
    if (i.format === "json") {
      const u = JSON.parse(y1.decode(o));
      return b1(u);
    }
    return o;
  }
  on(n, r) {
    if (n === "preview-message") {
      const u = r;
      r = h => {
        if (sM(h)) {
          u(h);
        }
      };
    }
    const {
      listener: i,
      subscribe: o
    } = yM(r);
    return o(this._instance.on(n, ri.proxy(i)));
  }
  mount(n, r) {
    const i = n instanceof Uint8Array ? n : n instanceof ArrayBuffer ? new Uint8Array(n) : aM.encode(JSON.stringify(v1(n)));
    return this._instance.loadFiles(ri.transfer(i, [i.buffer]), {
      mountPoints: r == null ? undefined : r.mountPoint
    });
  }
  setPreviewScript(n, r) {
    return this._instance.setPreviewScript(n, r);
  }
  get path() {
    return this._runtimeInfo.path;
  }
  get workdir() {
    return this._runtimeInfo.cwd;
  }
  teardown() {
    if (this._tornDown) {
      throw new Error("WebContainer already torn down");
    }
    this._tornDown = true;
    this._unsubscribeFromTokenChangedListener();
    const n = async () => {
      try {
        await this.fs._teardown();
        await this._instance.teardown();
      } finally {
        this._instance[ri.releaseProxy]();
        if (Js._instance === this) {
          Js._instance = null;
        }
      }
    };
    Js._teardownPromise = n();
  }
  static async boot(n = {}) {
    await this._teardownPromise;
    Js._teardownPromise = null;
    const {
      workdirName: r
    } = n;
    if (window.crossOriginIsolated && n.coep === "none") {
      console.warn(`A Cross-Origin-Embedder-Policy header is required in cross origin isolated environments.
Set the 'coep' option to 'require-corp'.`);
    }
    if (r != null && r.includes("/") || r === ".." || r === ".") {
      throw new Error("workdirName should be a valid folder name");
    }
    while (Gd) {
      await Gd;
    }
    if (Js._instance) {
      throw new Error("Only a single WebContainer instance can be booted");
    }
    const i = pM(n);
    Gd = i.catch(() => {});
    try {
      const o = await i;
      Js._instance = o;
      return o;
    } finally {
      Gd = null;
    }
  }
};
tt(Js, "_instance", null);
tt(Js, "_teardownPromise", null);
let zf = Js;
const lM = 1;
const cM = 2;
class uM {
  constructor(n, r) {
    tt(this, "name");
    tt(this, "_type");
    this.name = n;
    this._type = r;
  }
  isFile() {
    return this._type === lM;
  }
  isDirectory() {
    return this._type === cM;
  }
}
class dM {
  constructor(n, r, i, o) {
    tt(this, "_apiClient");
    tt(this, "_path");
    tt(this, "_options");
    tt(this, "_listener");
    tt(this, "_wrappedListener");
    tt(this, "_watcher");
    tt(this, "_closed", false);
    this._apiClient = n;
    this._path = r;
    this._options = i;
    this._listener = o;
    this._apiClient._watchers.add(this);
    this._wrappedListener = (u, h) => {
      if (this._listener && !this._closed) {
        this._listener(u, h);
      }
    };
    this._apiClient._fs.watch(this._path, this._options, Ef(this._wrappedListener)).then(u => {
      this._watcher = u;
      if (this._closed) {
        return this._teardown();
      }
    }).catch(console.error);
  }
  async close() {
    if (!this._closed) {
      this._closed = true;
      this._apiClient._watchers.delete(this);
      await this._teardown();
    }
  }
  async _teardown() {
    var n;
    await ((n = this._watcher) == null ? undefined : n.close().finally(() => {
      var r;
      if ((r = this._watcher) != null) {
        r[ri.releaseProxy]();
      }
    }));
  }
}
class fM {
  constructor(n, r, i, o) {
    tt(this, "output");
    tt(this, "input");
    tt(this, "exit");
    tt(this, "_process");
    tt(this, "stdout");
    tt(this, "stderr");
    this.output = r;
    this._process = n;
    this.input = new WritableStream({
      write: u => {
        var h;
        if ((h = this._getProcess()) != null) {
          h.write(u).catch(() => {});
        }
      }
    });
    this.exit = this._onExit();
    this.stdout = i;
    this.stderr = o;
  }
  kill() {
    var n;
    if ((n = this._process) != null) {
      n.kill();
    }
  }
  resize(n) {
    var r;
    if ((r = this._getProcess()) != null) {
      r.resize(n);
    }
  }
  async _onExit() {
    var n;
    try {
      return await this._process.onExit;
    } finally {
      if ((n = this._process) != null) {
        n[ri.releaseProxy]();
      }
      this._process = null;
    }
  }
  _getProcess() {
    if (this._process == null) {
      console.warn("This process already exited");
    }
    return this._process;
  }
}
class hM {
  constructor(n) {
    tt(this, "_fs");
    tt(this, "_watchers", new Set([]));
    this._fs = n;
  }
  rm(...n) {
    return this._fs.rm(...n);
  }
  async readFile(n, r) {
    return await this._fs.readFile(n, r);
  }
  async rename(n, r) {
    return await this._fs.rename(n, r);
  }
  async writeFile(n, r, i) {
    if (r instanceof Uint8Array) {
      const o = r.buffer.slice(r.byteOffset, r.byteOffset + r.byteLength);
      r = ri.transfer(new Uint8Array(o), [o]);
    }
    await this._fs.writeFile(n, r, i);
  }
  async readdir(n, r) {
    const i = await this._fs.readdir(n, r);
    if (gM(i) || vM(i)) {
      return i;
    } else {
      return i.map(u => new uM(u.name, u["Symbol(type)"]));
    }
  }
  async mkdir(n, r) {
    return await this._fs.mkdir(n, r);
  }
  watch(n, r, i) {
    if (typeof r == "function") {
      i = r;
      r = null;
    }
    return new dM(this, n, r, i);
  }
  async _teardown() {
    this._fs[ri.releaseProxy]();
    await Promise.all([...this._watchers].map(n => n.close()));
  }
}
async function pM(e) {
  const {
    serverPromise: n
  } = mM(e);
  const i = await (await n).build({
    host: window.location.host,
    version: "1.6.4",
    workdirName: e.workdirName,
    forwardPreviewErrors: e.forwardPreviewErrors
  });
  const [o, u, h] = await Promise.all([i.fs(), i.previewScript(), i.runtimeInfo()]);
  return new zf(i, o, u, h);
}
function cg(e) {
  if (e != null) {
    return n => {
      if (n instanceof Uint8Array) {
        e(y1.decode(n));
      } else if (n == null) {
        e(null);
      }
    };
  }
}
function Ef(e) {
  if (e != null) {
    return ri.proxy(e);
  }
}
function mM(e) {
  if (Yd != null) {
    if (e.coep !== lg.coep) {
      console.warn(`Attempting to boot WebContainer with 'coep: ${e.coep}'`);
      console.warn(`First boot had 'coep: ${lg.coep}', new settings will not take effect!`);
    }
    return {
      serverPromise: Yd
    };
  }
  if (e.coep) {
    ag.setQueryParam("coep", e.coep);
  }
  if (e.experimentalNode) {
    ag.setQueryParam("experimental_node", "1");
  }
  const n = document.createElement("iframe");
  n.style.display = "none";
  n.setAttribute("allow", "cross-origin-isolated");
  const r = ag.url;
  n.src = r.toString();
  const {
    origin: i
  } = r;
  lg = {
    ...e
  };
  Yd = new Promise(o => {
    const u = h => {
      if (h.origin !== i) {
        return;
      }
      const {
        data: a
      } = h;
      if (a.type === "init") {
        o(ri.wrap(h.ports[0]));
        return;
      }
      if (a.type === "warning") {
        console[a.level].call(console, a.message);
        return;
      }
    };
    window.addEventListener("message", u);
  });
  document.body.insertBefore(n, null);
  return {
    serverPromise: Yd
  };
}
function gM(e) {
  return typeof e[0] == "string";
}
function vM(e) {
  return e[0] instanceof Uint8Array;
}
function bM() {
  let e = null;
  return {
    stream: new ReadableStream({
      start(i) {
        e = i;
      }
    }),
    push: i => {
      if (i != null) {
        if (e != null) {
          e.enqueue(i);
        }
      } else {
        if (e != null) {
          e.close();
        }
        e = null;
      }
    }
  };
}
function yM(e) {
  let n = false;
  let r = () => {};
  return {
    subscribe(o) {
      o.then(u => {
        r = u;
        if (n) {
          r();
        }
      });
      return () => {
        n = true;
        r();
      };
    },
    listener: (...o) => {
      if (!n) {
        e(...o);
      }
    }
  };
}
const Kg = (e, n) => n.some(r => e instanceof r);
let Iw;
let Lw;
function _M() {
  return Iw ||= [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction];
}
function wM() {
  return Lw ||= [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey];
}
const Zg = new WeakMap();
const ug = new WeakMap();
const oh = new WeakMap();
function SM(e) {
  const n = new Promise((r, i) => {
    const o = () => {
      e.removeEventListener("success", u);
      e.removeEventListener("error", h);
    };
    const u = () => {
      r(Ca(e.result));
      o();
    };
    const h = () => {
      i(e.error);
      o();
    };
    e.addEventListener("success", u);
    e.addEventListener("error", h);
  });
  oh.set(n, e);
  return n;
}
function xM(e) {
  if (Zg.has(e)) {
    return;
  }
  const n = new Promise((r, i) => {
    const o = () => {
      e.removeEventListener("complete", u);
      e.removeEventListener("error", h);
      e.removeEventListener("abort", h);
    };
    const u = () => {
      r();
      o();
    };
    const h = () => {
      i(e.error || new DOMException("AbortError", "AbortError"));
      o();
    };
    e.addEventListener("complete", u);
    e.addEventListener("error", h);
    e.addEventListener("abort", h);
  });
  Zg.set(e, n);
}
let Qg = {
  get(e, n, r) {
    if (e instanceof IDBTransaction) {
      if (n === "done") {
        return Zg.get(e);
      }
      if (n === "store") {
        if (r.objectStoreNames[1]) {
          return undefined;
        } else {
          return r.objectStore(r.objectStoreNames[0]);
        }
      }
    }
    return Ca(e[n]);
  },
  set(e, n, r) {
    e[n] = r;
    return true;
  },
  has(e, n) {
    if (e instanceof IDBTransaction && (n === "done" || n === "store")) {
      return true;
    } else {
      return n in e;
    }
  }
};
function _1(e) {
  Qg = e(Qg);
}
function CM(e) {
  if (wM().includes(e)) {
    return function (...n) {
      e.apply(Jg(this), n);
      return Ca(this.request);
    };
  } else {
    return function (...n) {
      return Ca(e.apply(Jg(this), n));
    };
  }
}
function EM(e) {
  if (typeof e == "function") {
    return CM(e);
  } else {
    if (e instanceof IDBTransaction) {
      xM(e);
    }
    if (Kg(e, _M())) {
      return new Proxy(e, Qg);
    } else {
      return e;
    }
  }
}
function Ca(e) {
  if (e instanceof IDBRequest) {
    return SM(e);
  }
  if (ug.has(e)) {
    return ug.get(e);
  }
  const n = EM(e);
  if (n !== e) {
    ug.set(e, n);
    oh.set(n, e);
  }
  return n;
}
const Jg = e => oh.get(e);
function ah(e, n, {
  blocked: r,
  upgrade: i,
  blocking: o,
  terminated: u
} = {}) {
  const h = indexedDB.open(e, n);
  const a = Ca(h);
  if (i) {
    h.addEventListener("upgradeneeded", c => {
      i(Ca(h.result), c.oldVersion, c.newVersion, Ca(h.transaction), c);
    });
  }
  if (r) {
    h.addEventListener("blocked", c => r(c.oldVersion, c.newVersion, c));
  }
  a.then(c => {
    if (u) {
      c.addEventListener("close", () => u());
    }
    if (o) {
      c.addEventListener("versionchange", d => o(d.oldVersion, d.newVersion, d));
    }
  }).catch(() => {});
  return a;
}
const RM = ["get", "getKey", "getAll", "getAllKeys", "count"];
const TM = ["put", "add", "delete", "clear"];
const dg = new Map();
function Pw(e, n) {
  if (!(e instanceof IDBDatabase) || !!(n in e) || typeof n != "string") {
    return;
  }
  if (dg.get(n)) {
    return dg.get(n);
  }
  const r = n.replace(/FromIndex$/, "");
  const i = n !== r;
  const o = TM.includes(r);
  if (!(r in (i ? IDBIndex : IDBObjectStore).prototype) || !o && !RM.includes(r)) {
    return;
  }
  const u = async function (h, ...a) {
    const c = this.transaction(h, o ? "readwrite" : "readonly");
    let d = c.store;
    if (i) {
      d = d.index(a.shift());
    }
    return (await Promise.all([d[r](...a), o && c.done]))[0];
  };
  dg.set(n, u);
  return u;
}
_1(e => ({
  ...e,
  get: (n, r, i) => Pw(n, r) || e.get(n, r, i),
  has: (n, r) => !!Pw(n, r) || e.has(n, r)
}));
const kM = ["continue", "continuePrimaryKey", "advance"];
const Bw = {};
const ev = new WeakMap();
const w1 = new WeakMap();
const AM = {
  get(e, n) {
    if (!kM.includes(n)) {
      return e[n];
    }
    let r = Bw[n];
    r ||= Bw[n] = function (...i) {
      ev.set(this, w1.get(this)[n](...i));
    };
    return r;
  }
};
async function* MM(...e) {
  let n = this;
  if (!(n instanceof IDBCursor)) {
    n = await n.openCursor(...e);
  }
  if (!n) {
    return;
  }
  n = n;
  const r = new Proxy(n, AM);
  w1.set(r, n);
  oh.set(r, Jg(n));
  while (n) {
    yield r;
    n = await (ev.get(r) || n.continue());
    ev.delete(r);
  }
}
function zw(e, n) {
  return n === Symbol.asyncIterator && Kg(e, [IDBIndex, IDBObjectStore, IDBCursor]) || n === "iterate" && Kg(e, [IDBIndex, IDBObjectStore]);
}
_1(e => ({
  ...e,
  get(n, r, i) {
    if (zw(n, r)) {
      return MM;
    } else {
      return e.get(n, r, i);
    }
  },
  has(n, r) {
    return zw(n, r) || e.has(n, r);
  }
}));
const OM = "jsos-apps";
const DM = 7;
async function ir() {
  return ah(OM, DM, {
    upgrade(e, n) {
      if (n < 1) {
        if (!e.objectStoreNames.contains("apps")) {
          e.createObjectStore("apps", {
            keyPath: "id"
          });
        }
        if (!e.objectStoreNames.contains("files")) {
          e.createObjectStore("files", {
            keyPath: ["appId", "path"]
          }).createIndex("appId", "appId");
        }
      }
      if (n < 2) {
        if (!e.objectStoreNames.contains("port-assignments")) {
          e.createObjectStore("port-assignments", {
            keyPath: "appId"
          });
        }
      }
      if (n < 3) {
        if (!e.objectStoreNames.contains("icon-positions")) {
          e.createObjectStore("icon-positions", {
            keyPath: "appId"
          });
        }
      }
      if (n < 4) {
        if (!e.objectStoreNames.contains("desktop-widgets")) {
          e.createObjectStore("desktop-widgets", {
            keyPath: "id"
          }).createIndex("appId", "appId");
        }
      }
      if (n < 5) {
        if (!e.objectStoreNames.contains("app-snapshots")) {
          e.createObjectStore("app-snapshots", {
            keyPath: "appId"
          });
        }
      }
      if (n < 6) {
        if (e.objectStoreNames.contains("shared-data")) {
          e.deleteObjectStore("shared-data");
        }
        if (!e.objectStoreNames.contains("shared-data-snapshots")) {
          e.createObjectStore("shared-data-snapshots", {
            keyPath: "appId"
          });
        }
      }
      if (n < 7) {
        if (!e.objectStoreNames.contains("zip-data")) {
          e.createObjectStore("zip-data", {
            keyPath: "appId"
          });
        }
      }
    }
  });
}
async function IM() {
  return (await (await ir()).getAll("apps")).map(r => ({
    ...r.manifest,
    installedAt: r.installedAt,
    isSystem: r.isSystem
  }));
}
async function Nf(e, n) {
  const i = (await ir()).transaction(["apps", "zip-data", "app-snapshots"], "readwrite");
  const o = await i.objectStore("apps").get(e.id);
  await i.objectStore("apps").put({
    id: e.id,
    manifest: e,
    installedAt: Date.now(),
    isSystem: (o == null ? undefined : o.isSystem) || false,
    builtinVersion: o == null ? undefined : o.builtinVersion
  });
  await i.objectStore("app-snapshots").delete(e.id);
  await i.objectStore("zip-data").put({
    appId: e.id,
    zipData: n,
    createdAt: Date.now()
  });
  await i.done;
}
async function LM(e) {
  const r = (await ir()).transaction(["apps", "files", "zip-data", "app-snapshots"], "readwrite");
  await r.objectStore("apps").delete(e);
  let o = await r.objectStore("files").index("appId").openCursor(e);
  while (o) {
    await o.delete();
    o = await o.continue();
  }
  await r.objectStore("zip-data").delete(e);
  await r.objectStore("app-snapshots").delete(e);
  await r.done;
}
async function PM(e) {
  const r = (await ir()).transaction("files", "readwrite");
  let o = await r.objectStore("files").index("appId").openCursor(e);
  while (o) {
    await o.delete();
    o = await o.continue();
  }
  await r.done;
}
async function Nw(e) {
  const r = await (await ir()).getAllFromIndex("files", "appId", e);
  const i = {};
  for (const o of r) {
    i[o.path] = o.content;
  }
  return i;
}
async function BM() {
  const e = localStorage.getItem("jsos-custom-apps");
  if (e) {
    try {
      const n = JSON.parse(e);
      const i = (await ir()).transaction("apps", "readwrite");
      for (const {
        manifest: o
      } of n) {
        await i.objectStore("apps").put({
          id: o.id,
          manifest: o,
          installedAt: Date.now(),
          isSystem: false
        });
      }
      await i.done;
      localStorage.removeItem("jsos-custom-apps");
      console.log(`Migrated ${n.length} apps from localStorage to IndexedDB`);
    } catch (n) {
      console.warn("Migration from localStorage failed:", n);
    }
  }
}
async function zM(e, n) {
  await (await ir()).put("port-assignments", {
    appId: e,
    port: n
  });
}
async function NM() {
  const n = await (await ir()).getAll("port-assignments");
  const r = {};
  for (const i of n) {
    r[i.appId] = i.port;
  }
  return r;
}
async function jM() {
  const n = await (await ir()).getAll("icon-positions");
  const r = {};
  for (const i of n) {
    r[i.appId] = {
      x: i.x,
      y: i.y
    };
  }
  return r;
}
async function HM(e, n) {
  await (await ir()).put("shared-data-snapshots", {
    appId: e,
    snapshot: n,
    updatedAt: Date.now()
  });
}
async function FM() {
  const n = await (await ir()).getAll("shared-data-snapshots");
  const r = {};
  for (const i of n) {
    r[i.appId] = i.snapshot;
  }
  return r;
}
async function UM(e) {
  await (await ir()).delete("shared-data-snapshots", e);
}
async function VM(e, n) {
  await (await ir()).put("app-snapshots", {
    appId: e,
    snapshot: n,
    createdAt: Date.now()
  });
}
async function WM(e) {
  const r = await (await ir()).get("app-snapshots", e);
  return (r == null ? undefined : r.snapshot) ?? null;
}
async function $M(e) {
  await (await ir()).delete("app-snapshots", e);
}
async function jw(e, n, r) {
  await (await ir()).put("apps", {
    id: e,
    manifest: n,
    isSystem: true,
    builtinVersion: r,
    installedAt: Date.now()
  });
}
async function qM(e) {
  const r = await (await ir()).get("apps", e);
  return r != null && r.isSystem && r.builtinVersion || null;
}
async function GM(e) {
  const r = await (await ir()).get("zip-data", e);
  return (r == null ? undefined : r.zipData) ?? null;
}
async function YM(e) {
  await (await ir()).delete("zip-data", e);
}
const To = "workspace/data";
const Hw = 1000;
const Fw = 10000;
const XM = [/\/node_modules\//, /\/\.git\//, /\/\.cache\//, /\/__pycache__\//, /\/(\.)?~.*/, /\.(tmp|log|swp)$/i];
const jl = new Map();
const Il = new Set();
const xo = [];
let Rf = false;
const Wc = new Set();
let fg = false;
let Xd = null;
let Uw = false;
function KM(e) {
  const n = `${To}/`;
  const r = e.indexOf(n);
  let i = r >= 0 ? e.slice(r + n.length) : e;
  if (!i || i.startsWith(".") && !i.includes("/")) {
    return null;
  }
  const o = i.indexOf("/");
  if (o >= 0) {
    return i.slice(0, o);
  } else {
    return i;
  }
}
function ZM(e) {
  const n = XM.some(r => r.test(e));
  if (n) {
    console.log("[sharedData] ⏭️ 跳过排除路径:", e);
  }
  return n;
}
async function QM(e, n) {
  try {
    const r = await e.export(`${To}/${n}`, {
      format: "binary"
    });
    await HM(n, r);
    console.log(`[sharedData] ✅ 导出完成 ${n} (${(r == null ? undefined : r.byteLength) ?? 0} 字节)`);
  } catch (r) {
    console.warn(`[sharedData] ❌ 导出失败 ${n}:`, r);
  }
}
async function JM() {
  if (!Rf) {
    Rf = true;
    console.log(`[sharedData] ▶️ 队列处理器启动 (${xo.length} 项)`);
    while (xo.length > 0) {
      await new Promise(o => requestIdleCallback(o, {
        timeout: 50
      }));
      const {
        wc: e,
        appId: n
      } = xo.shift();
      console.log(`[sharedData] ⏳ 正在导出 ${n}... (剩余 ${xo.length})`);
      const r = performance.now();
      await QM(e, n);
      console.log(`[sharedData] ⏱️  导出 ${n} 耗时 ${(performance.now() - r).toFixed(0)}ms`);
      const i = jl.get(n);
      if (i && !i.debounceTimer && !i.maxWaitTimer) {
        jl.delete(n);
        console.log(`[sharedData] 🧹 已清理 ${n} 的同步状态`);
      }
    }
    Rf = false;
    console.log("[sharedData] ⏹️ 队列处理器结束");
  }
}
function tv(e, n) {
  console.log(`[sharedData] 📥 入队 ${n} (队列长度=${xo.length + 1})`);
  xo.push({
    wc: e,
    appId: n
  });
  JM();
}
function eO(e, n) {
  let r = jl.get(n);
  if (!r) {
    r = {
      debounceTimer: null,
      maxWaitTimer: null
    };
    jl.set(n, r);
    Il.add(n);
    console.log(`[sharedData] 🆕 ${n} 首次变更`);
  }
  clearTimeout(r.debounceTimer);
  r.maxWaitTimer ||= setTimeout(() => {
    console.log(`[sharedData] ⏰ ${n} maxWait(${Fw}ms) 超时触发`);
    clearTimeout(r.debounceTimer);
    r.debounceTimer = null;
    r.maxWaitTimer = null;
    Il.delete(n);
    tv(e, n);
  }, Fw);
  r.debounceTimer = setTimeout(() => {
    if (r.maxWaitTimer) {
      clearTimeout(r.maxWaitTimer);
      r.maxWaitTimer = null;
    }
    r.debounceTimer = null;
    Il.delete(n);
    console.log(`[sharedData] ⏰ ${n} debounce(${Hw}ms) 静默触发`);
    tv(e, n);
  }, Hw);
}
function tO(e) {
  if (Xd) {
    try {
      Xd.close();
    } catch {}
    Xd = null;
  }
  try {
    Xd = e.fs.watch(To, {
      recursive: true
    }, (n, r) => {
      if (!r || typeof r != "string") {
        return;
      }
      const i = KM(r);
      if (i) {
        if (!ZM(r)) {
          Wc.add(i);
          if (!fg) {
            fg = true;
            queueMicrotask(() => {
              console.log(`[sharedData] 🔄 批量提交 ${Wc.size} 个待处理应用: ${[...Wc].join(", ")}`);
              for (const o of Wc) {
                eO(e, o);
              }
              Wc.clear();
              fg = false;
            });
          }
        }
      }
    });
    console.log(`[sharedData] 👂 文件监听已启动: ${To}`);
  } catch (n) {
    console.warn("[sharedData] ⚠️ Failed to setup watcher:", n);
  }
}
async function nO(e) {
  if (!Uw && e) {
    try {
      await e.fs.mkdir(To, {
        recursive: true
      });
    } catch {}
    try {
      const n = await FM();
      console.log(`[sharedData] 🔄 恢复 ${Object.keys(n).length} 个数据快照`);
      for (const [r, i] of Object.entries(n)) {
        try {
          await e.fs.mkdir(`${To}/${r}`, {
            recursive: true
          });
          await e.mount(i, {
            mountPoint: `${To}/${r}`
          });
          console.log(`[sharedData] 📦 已恢复 ${r} (${(i == null ? undefined : i.byteLength) ?? 0} 字节)`);
        } catch (o) {
          console.warn(`[sharedData] ⚠️ 恢复数据快照失败 ${r}:`, o);
        }
      }
    } catch (n) {
      console.warn("[sharedData] ⚠️ Failed to restore shared data snapshots:", n);
    }
    tO(e);
    Uw = true;
    console.log("[sharedData] 🚀 初始化完成");
  }
}
async function rO(e) {
  for (const [n, r] of jl) {
    clearTimeout(r.debounceTimer);
    clearTimeout(r.maxWaitTimer);
  }
  jl.clear();
  console.log(`[sharedData] 💾 立即同步: ${Il.size} 个应用待处理`);
  for (const n of Il) {
    tv(e, n);
  }
  Il.clear();
  if (xo.length > 0) {
    await new Promise(n => {
      const r = () => {
        if (xo.length === 0 && !Rf) {
          n();
        } else {
          setTimeout(r, 10);
        }
      };
      r();
    });
  }
  console.log("[sharedData] 💾 立即同步完成");
}
async function sO(e, n) {
  if (e) {
    try {
      await e.fs.rm(`${To}/${n}`, {
        recursive: true,
        force: true
      });
      console.log(`[sharedData] 🗑️ 已删除 ${n} 数据目录`);
    } catch {}
  }
}
const iO = [{
  id: "sharedArrayBuffer",
  label: "SharedArrayBuffer",
  test: () => typeof SharedArrayBuffer !== "undefined"
}, {
  id: "atomics",
  label: "Atomics",
  test: () => typeof Atomics !== "undefined"
}, {
  id: "webAssembly",
  label: "WebAssembly",
  test: () => typeof WebAssembly !== "undefined" && WebAssembly.validate !== undefined
}, {
  id: "structuredClone",
  label: "structuredClone",
  test: () => typeof structuredClone == "function"
}, {
  id: "deviceMemory",
  label: "Device Memory (≥4 GB)",
  test: () => "deviceMemory" in navigator ? navigator.deviceMemory >= 4 : null
}];
function oO() {
  const e = /iP(hone|od|ad)|Android/.test(navigator.userAgent);
  const n = iO.map(({
    id: i,
    label: o,
    test: u,
    hint: h
  }) => {
    const a = u();
    return {
      id: i,
      label: o,
      passed: a,
      hint: h ? h(a) : null
    };
  });
  return {
    supported: n.every(i => i.passed !== false),
    isMobile: e,
    checks: n
  };
}
function Kd(e) {
  throw new Error("Could not dynamically require \"" + e + "\". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.");
}