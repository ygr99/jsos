// [09-ui-components] 还原自 index-liunM0pp.js 第 49001-53751 行（边界为近似值，无 sourcemap）
function _C({
  className: e,
  ...n
}) {
  return <_Component aria-label="Loading" className={pt("animate-spin", e)} role="status" {...n} />;
}
const wC = $1("relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border font-medium text-base outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-64 data-loading:select-none data-loading:text-transparent sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0", {
  defaultVariants: {
    size: "default",
    variant: "default"
  },
  variants: {
    size: {
      default: "h-9 px-[calc(--spacing(3)-1px)] sm:h-8",
      icon: "size-9 sm:size-8",
      "icon-lg": "size-10 sm:size-9",
      "icon-sm": "size-8 sm:size-7",
      "icon-xl": "size-11 sm:size-10 [&_svg:not([class*='size-'])]:size-5 sm:[&_svg:not([class*='size-'])]:size-4.5",
      "icon-xs": "size-7 rounded-md before:rounded-[calc(var(--radius-md)-1px)] sm:size-6 not-in-data-[slot=input-group]:[&_svg:not([class*='size-'])]:size-4 sm:not-in-data-[slot=input-group]:[&_svg:not([class*='size-'])]:size-3.5",
      lg: "h-10 px-[calc(--spacing(3.5)-1px)] sm:h-9",
      sm: "h-8 gap-1.5 px-[calc(--spacing(2.5)-1px)] sm:h-7",
      xl: "h-11 px-[calc(--spacing(4)-1px)] text-lg sm:h-10 sm:text-base [&_svg:not([class*='size-'])]:size-5 sm:[&_svg:not([class*='size-'])]:size-4.5",
      xs: "h-7 gap-1 rounded-md px-[calc(--spacing(2)-1px)] text-sm before:rounded-[calc(var(--radius-md)-1px)] sm:h-6 sm:text-xs [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5"
    },
    variant: {
      default: "not-disabled:inset-shadow-[0_1px_--theme(--color-white/16%)] border-primary bg-primary text-primary-foreground shadow-primary/24 shadow-xs hover:bg-primary/90 data-pressed:bg-primary/90 *:data-[slot=button-loading-indicator]:text-primary-foreground [:active,[data-pressed]]:inset-shadow-[0_1px_--theme(--color-black/8%)] [:disabled,:active,[data-pressed]]:shadow-none",
      destructive: "not-disabled:inset-shadow-[0_1px_--theme(--color-white/16%)] border-destructive bg-destructive text-white shadow-destructive/24 shadow-xs hover:bg-destructive/90 data-pressed:bg-destructive/90 *:data-[slot=button-loading-indicator]:text-white [:active,[data-pressed]]:inset-shadow-[0_1px_--theme(--color-black/8%)] [:disabled,:active,[data-pressed]]:shadow-none",
      "destructive-outline": "border-input bg-popover not-dark:bg-clip-padding text-destructive-foreground shadow-xs/5 not-disabled:not-active:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/4%)] hover:border-destructive/32 hover:bg-destructive/4 data-pressed:border-destructive/32 data-pressed:bg-destructive/4 *:data-[slot=button-loading-indicator]:text-foreground dark:bg-input/32 dark:not-disabled:before:shadow-[0_-1px_--theme(--color-white/2%)] dark:not-disabled:not-active:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/6%)] [:disabled,:active,[data-pressed]]:shadow-none",
      ghost: "border-transparent text-foreground hover:bg-accent data-pressed:bg-accent *:data-[slot=button-loading-indicator]:text-foreground",
      link: "border-transparent text-foreground underline-offset-4 hover:underline data-pressed:underline *:data-[slot=button-loading-indicator]:text-foreground",
      outline: "border-input bg-popover not-dark:bg-clip-padding text-foreground shadow-xs/5 not-disabled:not-active:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/4%)] hover:bg-accent/50 data-pressed:bg-accent/50 *:data-[slot=button-loading-indicator]:text-foreground dark:bg-input/32 dark:data-pressed:bg-input/64 dark:hover:bg-input/64 dark:not-disabled:before:shadow-[0_-1px_--theme(--color-white/2%)] dark:not-disabled:not-active:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/6%)] [:disabled,:active,[data-pressed]]:shadow-none",
      secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/90 data-pressed:bg-secondary/90 *:data-[slot=button-loading-indicator]:text-secondary-foreground [:active,[data-pressed]]:bg-secondary/80"
    }
  }
});
function Jn({
  className: e,
  variant: n,
  size: r,
  render: i,
  children: o,
  loading: u = false,
  disabled: h,
  ...a
}) {
  const c = !!u || !!h;
  const d = i ? undefined : "button";
  const p = {
    children: <B.Fragment>{o}{u && <_C className="pointer-events-none absolute" data-slot="button-loading-indicator" />}</B.Fragment>,
    className: pt(wC({
      className: e,
      size: r,
      variant: n
    })),
    "aria-disabled": u || undefined,
    "data-loading": u ? "" : undefined,
    "data-slot": "button",
    disabled: c,
    type: d
  };
  return wu({
    defaultTagName: "button",
    props: Sn(p, a),
    render: i
  });
}
const cv = [];
let uv;
function W5() {
  return uv;
}
function $5(e) {
  cv.push(e);
}
function Fv(e) {
  const n = (r, i) => {
    const o = sr(q5).current;
    let u;
    try {
      uv = o;
      for (const h of cv) {
        h.before(o);
      }
      u = e(r, i);
      for (const h of cv) {
        h.after(o);
      }
      o.didInitialize = true;
    } finally {
      uv = undefined;
    }
    return u;
  };
  n.displayName = e.displayName || e.name;
  return n;
}
function SC(e) {
  return E.forwardRef(Fv(e));
}
function q5() {
  return {
    didInitialize: false
  };
}
function Wl(e) {
  const n = E.useRef(true);
  if (n.current) {
    n.current = false;
    e();
  }
}
const G5 = () => {};
const Fe = typeof document !== "undefined" ? E.useLayoutEffect : G5;
const xC = E.createContext(undefined);
function xu(e) {
  const n = E.useContext(xC);
  if (n === undefined && !e) {
    throw new Error(Bt(72));
  }
  return n;
}
const Y5 = [];
function lh(e) {
  E.useEffect(e, Y5);
}
const Gc = 0;
class $r {
  constructor() {
    tt(this, "currentId", Gc);
    tt(this, "clear", () => {
      if (this.currentId !== Gc) {
        clearTimeout(this.currentId);
        this.currentId = Gc;
      }
    });
    tt(this, "disposeEffect", () => this.clear);
  }
  static create() {
    return new $r();
  }
  start(n, r) {
    this.clear();
    this.currentId = setTimeout(() => {
      this.currentId = Gc;
      r();
    }, n);
  }
  isStarted() {
    return this.currentId !== Gc;
  }
}
function xn() {
  const e = sr($r.create).current;
  lh(e.disposeEffect);
  return e;
}
const La = typeof navigator !== "undefined";
const Sg = X5();
const CC = Z5();
const Uv = K5();
const ch = typeof CSS === "undefined" || !CSS.supports ? false : CSS.supports("-webkit-backdrop-filter:none");
const Vv = Sg.platform === "MacIntel" && Sg.maxTouchPoints > 1 ? true : /iP(hone|ad|od)|iOS/.test(Sg.platform);
const vS = La && /firefox/i.test(Uv);
const EC = La && /apple/i.test(navigator.vendor);
const $f = La && /android/i.test(CC) || /android/i.test(Uv);
const RC = La && CC.toLowerCase().startsWith("mac") && !navigator.maxTouchPoints;
const TC = Uv.includes("jsdom/");
function X5() {
  if (!La) {
    return {
      platform: "",
      maxTouchPoints: -1
    };
  }
  const e = navigator.userAgentData;
  if (e != null && e.platform) {
    return {
      platform: e.platform,
      maxTouchPoints: navigator.maxTouchPoints
    };
  } else {
    return {
      platform: navigator.platform ?? "",
      maxTouchPoints: navigator.maxTouchPoints ?? -1
    };
  }
}
function K5() {
  if (!La) {
    return "";
  }
  const e = navigator.userAgentData;
  if (e && Array.isArray(e.brands)) {
    return e.brands.map(({
      brand: n,
      version: r
    }) => `${n}/${r}`).join(" ");
  } else {
    return navigator.userAgent;
  }
}
function Z5() {
  if (!La) {
    return "";
  }
  const e = navigator.userAgentData;
  if (e != null && e.platform) {
    return e.platform;
  } else {
    return navigator.platform ?? "";
  }
}
function cr(e) {
  e.preventDefault();
  e.stopPropagation();
}
function Q5(e) {
  return "nativeEvent" in e;
}
function Wv(e) {
  if (e.pointerType === "" && e.isTrusted) {
    return true;
  } else if ($f && e.pointerType) {
    return e.type === "click" && e.buttons === 1;
  } else {
    return e.detail === 0 && !e.pointerType;
  }
}
function kC(e) {
  if (TC) {
    return false;
  } else {
    return !$f && e.width === 0 && e.height === 0 || $f && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse" || e.width < 1 && e.height < 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "touch";
  }
}
function Aa(e, n) {
  const r = ["mouse", "pen"];
  if (!n) {
    r.push("", undefined);
  }
  return r.includes(e);
}
function J5(e) {
  const n = e.type;
  return n === "click" || n === "mousedown" || n === "keydown" || n === "keyup";
}
function uh() {
  return typeof window !== "undefined";
}
function Er(e) {
  if ($v(e)) {
    return (e.nodeName || "").toLowerCase();
  } else {
    return "#document";
  }
}
function fn(e) {
  var n;
  return (e == null || (n = e.ownerDocument) == null ? undefined : n.defaultView) || window;
}
function li(e) {
  var n;
  if ((n = ($v(e) ? e.ownerDocument : e.document) || window.document) == null) {
    return undefined;
  } else {
    return n.documentElement;
  }
}
function $v(e) {
  if (uh()) {
    return e instanceof Node || e instanceof fn(e).Node;
  } else {
    return false;
  }
}
function Mt(e) {
  if (uh()) {
    return e instanceof Element || e instanceof fn(e).Element;
  } else {
    return false;
  }
}
function un(e) {
  if (uh()) {
    return e instanceof HTMLElement || e instanceof fn(e).HTMLElement;
  } else {
    return false;
  }
}
function Hl(e) {
  if (!uh() || typeof ShadowRoot === "undefined") {
    return false;
  } else {
    return e instanceof ShadowRoot || e instanceof fn(e).ShadowRoot;
  }
}
function Lo(e) {
  const {
    overflow: n,
    overflowX: r,
    overflowY: i,
    display: o
  } = Dr(e);
  return /auto|scroll|overlay|hidden|clip/.test(n + i + r) && o !== "inline" && o !== "contents";
}
function e3(e) {
  return /^(table|td|th)$/.test(Er(e));
}
function dh(e) {
  try {
    if (e.matches(":popover-open")) {
      return true;
    }
  } catch {}
  try {
    return e.matches(":modal");
  } catch {
    return false;
  }
}
const t3 = /transform|translate|scale|rotate|perspective|filter/;
const n3 = /paint|layout|strict|content/;
const ga = e => !!e && e !== "none";
let xg;
function qv(e) {
  const n = Mt(e) ? Dr(e) : e;
  return ga(n.transform) || ga(n.translate) || ga(n.scale) || ga(n.rotate) || ga(n.perspective) || !fh() && (ga(n.backdropFilter) || ga(n.filter)) || t3.test(n.willChange || "") || n3.test(n.contain || "");
}
function r3(e) {
  let n = oi(e);
  while (un(n) && !si(n)) {
    if (qv(n)) {
      return n;
    }
    if (dh(n)) {
      return null;
    }
    n = oi(n);
  }
  return null;
}
function fh() {
  if (xg == null) {
    xg = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return xg;
}
function si(e) {
  return /^(html|body|#document)$/.test(Er(e));
}
function Dr(e) {
  return fn(e).getComputedStyle(e);
}
function hh(e) {
  if (Mt(e)) {
    return {
      scrollLeft: e.scrollLeft,
      scrollTop: e.scrollTop
    };
  } else {
    return {
      scrollLeft: e.scrollX,
      scrollTop: e.scrollY
    };
  }
}
function oi(e) {
  if (Er(e) === "html") {
    return e;
  }
  const n = e.assignedSlot || e.parentNode || Hl(e) && e.host || li(e);
  if (Hl(n)) {
    return n.host;
  } else {
    return n;
  }
}
function AC(e) {
  const n = oi(e);
  if (si(n)) {
    if (e.ownerDocument) {
      return e.ownerDocument.body;
    } else {
      return e.body;
    }
  } else if (un(n) && Lo(n)) {
    return n;
  } else {
    return AC(n);
  }
}
function lu(e, n, r) {
  var i;
  if (n === undefined) {
    n = [];
  }
  if (r === undefined) {
    r = true;
  }
  const o = AC(e);
  const u = o === ((i = e.ownerDocument) == null ? undefined : i.body);
  const h = fn(o);
  if (u) {
    const a = dv(h);
    return n.concat(h, h.visualViewport || [], Lo(o) ? o : [], a && r ? lu(a) : []);
  } else {
    return n.concat(o, lu(o, [], r));
  }
}
function dv(e) {
  if (e.parent && Object.getPrototypeOf(e.parent)) {
    return e.frameElement;
  } else {
    return null;
  }
}
const fv = "data-base-ui-focusable";
const MC = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
const ko = "ArrowLeft";
const Ao = "ArrowRight";
const Gv = "ArrowUp";
const Cu = "ArrowDown";
function Hn(e) {
  var r;
  let n = e.activeElement;
  while (((r = n == null ? undefined : n.shadowRoot) == null ? undefined : r.activeElement) != null) {
    n = n.shadowRoot.activeElement;
  }
  return n;
}
function Xe(e, n) {
  var i;
  if (!e || !n) {
    return false;
  }
  const r = (i = n.getRootNode) == null ? undefined : i.call(n);
  if (e.contains(n)) {
    return true;
  }
  if (r && Hl(r)) {
    let o = n;
    while (o) {
      if (e === o) {
        return true;
      }
      o = o.parentNode || o.host;
    }
  }
  return false;
}
function dn(e) {
  if ("composedPath" in e) {
    return e.composedPath()[0];
  } else {
    return e.target;
  }
}
function qf(e, n) {
  if (!Mt(e)) {
    return false;
  }
  const r = e;
  if (n.hasElement(r)) {
    return !r.hasAttribute("data-trigger-disabled");
  }
  for (const [, i] of n.entries()) {
    if (Xe(i, r)) {
      return !i.hasAttribute("data-trigger-disabled");
    }
  }
  return false;
}
function Cg(e, n) {
  if (n == null) {
    return false;
  }
  if ("composedPath" in e) {
    return e.composedPath().includes(n);
  }
  const r = e;
  return r.target != null && n.contains(r.target);
}
function s3(e) {
  return e.matches("html,body");
}
function ph(e) {
  return un(e) && e.matches(MC);
}
function OC(e) {
  return (e == null ? undefined : e.closest(`button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${MC}`)) != null;
}
function hv(e) {
  if (e) {
    return e.getAttribute("role") === "combobox" && ph(e);
  } else {
    return false;
  }
}
function cu(e) {
  if (!e || TC) {
    return true;
  }
  try {
    return e.matches(":focus-visible");
  } catch {
    return true;
  }
}
function Gf(e) {
  if (e) {
    if (e.hasAttribute(fv)) {
      return e;
    } else {
      return e.querySelector(`[${fv}]`) || e;
    }
  } else {
    return null;
  }
}
function i3(e, n) {
  if (n != null && !Aa(n)) {
    return 0;
  } else if (typeof e == "function") {
    return e();
  } else {
    return e;
  }
}
function Yf(e, n, r) {
  const i = i3(e, r);
  if (typeof i == "number") {
    return i;
  } else if (i == null) {
    return undefined;
  } else {
    return i[n];
  }
}
function bS(e) {
  if (typeof e == "function") {
    return e();
  } else {
    return e;
  }
}
function DC(e, n) {
  return n || e === "click" || e === "mousedown";
}
function o3(e) {
  return (e == null ? undefined : e.includes("mouse")) && e !== "mousedown";
}
const ur = "none";
const Fi = "trigger-press";
const In = "trigger-hover";
const Ll = "trigger-focus";
const Eu = "outside-press";
const Ra = "item-press";
const Yv = "close-press";
const yS = "clear-press";
const _S = "track-press";
const wa = "input-change";
const Ii = "input-clear";
const IC = "input-press";
const Ui = "focus-out";
const $l = "escape-key";
const Xf = "list-navigation";
const a3 = "keyboard";
const l3 = "pointer";
const c3 = "drag";
const LC = "cancel-open";
const Qc = "sibling-open";
const u3 = "disabled";
const mh = "imperative-action";
const d3 = "window-resize";
function $e(e, n, r, i) {
  let o = false;
  let u = false;
  const h = i ?? Xt;
  return {
    reason: e,
    event: n ?? new Event("base-ui"),
    cancel() {
      o = true;
    },
    allowPropagation() {
      u = true;
    },
    get isCanceled() {
      return o;
    },
    get isPropagationAllowed() {
      return u;
    },
    trigger: r,
    ...h
  };
}
function _a(e, n, r) {
  const i = r ?? Xt;
  return {
    reason: e,
    event: n ?? new Event("base-ui"),
    ...i
  };
}
const PC = E.createContext({
  hasProvider: false,
  timeoutMs: 0,
  delayRef: {
    current: 0
  },
  initialDelayRef: {
    current: 0
  },
  timeout: new $r(),
  currentIdRef: {
    current: null
  },
  currentContextRef: {
    current: null
  }
});
function _Component3(e) {
  const {
    children: n,
    delay: r,
    timeoutMs: i = 0
  } = e;
  const o = E.useRef(r);
  const u = E.useRef(r);
  const h = E.useRef(null);
  const a = E.useRef(null);
  const c = xn();
  return <PC.Provider value={E.useMemo(() => ({
    hasProvider: true,
    delayRef: o,
    initialDelayRef: u,
    currentIdRef: h,
    timeoutMs: i,
    currentContextRef: a,
    timeout: c
  }), [i, c])}>{n}</PC.Provider>;
}
function h3(e, n = {
  open: false
}) {
  const {
    open: r
  } = n;
  const i = "rootStore" in e ? e.rootStore : e;
  const o = i.useState("floatingId");
  const u = E.useContext(PC);
  const {
    currentIdRef: h,
    delayRef: a,
    timeoutMs: c,
    initialDelayRef: d,
    currentContextRef: p,
    hasProvider: f,
    timeout: S
  } = u;
  const [_, x] = E.useState(false);
  Fe(() => {
    function w() {
      var g;
      x(false);
      if ((g = p.current) != null) {
        g.setIsInstantPhase(false);
      }
      h.current = null;
      p.current = null;
      a.current = d.current;
    }
    if (h.current && !r && h.current === o) {
      x(false);
      if (c) {
        const g = o;
        S.start(c, () => {
          if (!i.select("open") && (!h.current || h.current === g)) {
            w();
          }
        });
        return () => {
          S.clear();
        };
      }
      w();
    }
  }, [r, o, h, a, c, d, p, S, i]);
  Fe(() => {
    if (!r) {
      return;
    }
    const w = p.current;
    const g = h.current;
    S.clear();
    p.current = {
      onOpenChange: i.setOpen,
      setIsInstantPhase: x
    };
    h.current = o;
    a.current = {
      open: 0,
      close: Yf(d.current, "close")
    };
    if (g !== null && g !== o) {
      x(true);
      if (w != null) {
        w.setIsInstantPhase(true);
      }
      if (w != null) {
        w.onOpenChange(false, $e(ur));
      }
    } else {
      x(false);
      if (w != null) {
        w.setIsInstantPhase(false);
      }
    }
  }, [r, o, i, h, a, d, p, S]);
  Fe(() => () => {
    p.current = null;
  }, [p]);
  return E.useMemo(() => ({
    hasProvider: f,
    delayRef: a,
    isInstantPhase: _
  }), [f, a, _]);
}
function Tt(e, n, r, i) {
  e.addEventListener(n, r, i);
  return () => {
    e.removeEventListener(n, r, i);
  };
}
function js(...e) {
  return () => {
    for (let n = 0; n < e.length; n += 1) {
      const r = e[n];
      if (r) {
        r();
      }
    }
  };
}
function On(e) {
  const n = sr(p3, e).current;
  n.next = e;
  Fe(n.effect);
  return n;
}
function p3(e) {
  const n = {
    current: e,
    next: e,
    effect: () => {
      n.current = n.next;
    }
  };
  return n;
}
const Xv = {
  ...ck
};
const Eg = Xv.useInsertionEffect;
const m3 = Eg && Eg !== Xv.useLayoutEffect ? Eg : e => e();
function je(e) {
  const n = sr(g3).current;
  n.next = e;
  m3(n.effect);
  return n.trampoline;
}
function g3() {
  const e = {
    next: undefined,
    callback: v3,
    trampoline: (...n) => {
      var r;
      if ((r = e.callback) == null) {
        return undefined;
      } else {
        return r.call(e, ...n);
      }
    },
    effect: () => {
      e.callback = e.next;
    }
  };
  return e;
}
function v3() {}
const rf = null;
class b3 {
  constructor() {
    tt(this, "callbacks", []);
    tt(this, "callbacksCount", 0);
    tt(this, "nextId", 1);
    tt(this, "startId", 1);
    tt(this, "isScheduled", false);
    tt(this, "tick", n => {
      var o;
      this.isScheduled = false;
      const r = this.callbacks;
      const i = this.callbacksCount;
      this.callbacks = [];
      this.callbacksCount = 0;
      this.startId = this.nextId;
      if (i > 0) {
        for (let u = 0; u < r.length; u += 1) {
          if ((o = r[u]) != null) {
            o.call(r, n);
          }
        }
      }
    });
  }
  request(n) {
    const r = this.nextId;
    this.nextId += 1;
    this.callbacks.push(n);
    this.callbacksCount += 1;
    if (!this.isScheduled || false) {
      requestAnimationFrame(this.tick);
      this.isScheduled = true;
    }
    return r;
  }
  cancel(n) {
    const r = n - this.startId;
    if (!(r < 0) && !(r >= this.callbacks.length)) {
      this.callbacks[r] = null;
      this.callbacksCount -= 1;
    }
  }
}
const sf = new b3();
class ei {
  constructor() {
    tt(this, "currentId", rf);
    tt(this, "cancel", () => {
      if (this.currentId !== rf) {
        sf.cancel(this.currentId);
        this.currentId = rf;
      }
    });
    tt(this, "disposeEffect", () => this.cancel);
  }
  static create() {
    return new ei();
  }
  static request(n) {
    return sf.request(n);
  }
  static cancel(n) {
    return sf.cancel(n);
  }
  request(n) {
    this.cancel();
    this.currentId = sf.request(() => {
      this.currentId = rf;
      n();
    });
  }
}
function Vi() {
  const e = sr(ei.create).current;
  lh(e.disposeEffect);
  return e;
}
function yt(e) {
  return (e == null ? undefined : e.ownerDocument) || document;
}
const BC = {
  clipPath: "inset(50%)",
  overflow: "hidden",
  whiteSpace: "nowrap",
  border: 0,
  padding: 0,
  width: 1,
  height: 1,
  margin: -1
};
const Ma = {
  ...BC,
  position: "fixed",
  top: 0,
  left: 0
};
const gh = {
  ...BC,
  position: "absolute"
};
const Hs = E.forwardRef(function (n, r) {
  const [i, o] = E.useState();
  Fe(() => {
    if (EC) {
      o("button");
    }
  }, []);
  const u = {
    tabIndex: 0,
    role: i
  };
  return <span {...n} ref={r} style={Ma} aria-hidden={i ? undefined : true} {...u} data-base-ui-focus-guard="" />;
});
const y3 = ["top", "right", "bottom", "left"];
const Fl = Math.min;
const as = Math.max;
const Ul = Math.round;
const Sa = Math.floor;
const ii = e => ({
  x: e,
  y: e
});
const _3 = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function pv(e, n, r) {
  return as(e, Fl(n, r));
}
function Wi(e, n) {
  if (typeof e == "function") {
    return e(n);
  } else {
    return e;
  }
}
function Wr(e) {
  return e.split("-")[0];
}
function Po(e) {
  return e.split("-")[1];
}
function Kv(e) {
  if (e === "x") {
    return "y";
  } else {
    return "x";
  }
}
function Zv(e) {
  if (e === "y") {
    return "height";
  } else {
    return "width";
  }
}
function ws(e) {
  const n = e[0];
  if (n === "t" || n === "b") {
    return "y";
  } else {
    return "x";
  }
}
function Qv(e) {
  return Kv(ws(e));
}
function w3(e, n, r = false) {
  const i = Po(e);
  const o = Qv(e);
  const u = Zv(o);
  let h = o === "x" ? i === (r ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  if (n.reference[u] > n.floating[u]) {
    h = Kf(h);
  }
  return [h, Kf(h)];
}
function S3(e) {
  const n = Kf(e);
  return [mv(e), n, mv(n)];
}
function mv(e) {
  if (e.includes("start")) {
    return e.replace("start", "end");
  } else {
    return e.replace("end", "start");
  }
}
const wS = ["left", "right"];
const SS = ["right", "left"];
const x3 = ["top", "bottom"];
const C3 = ["bottom", "top"];
function E3(e, n, r) {
  switch (e) {
    case "top":
    case "bottom":
      if (r) {
        if (n) {
          return SS;
        } else {
          return wS;
        }
      } else if (n) {
        return wS;
      } else {
        return SS;
      }
    case "left":
    case "right":
      if (n) {
        return x3;
      } else {
        return C3;
      }
    default:
      return [];
  }
}
function R3(e, n, r, i) {
  const o = Po(e);
  let u = E3(Wr(e), r === "start", i);
  if (o) {
    u = u.map(h => h + "-" + o);
    if (n) {
      u = u.concat(u.map(mv));
    }
  }
  return u;
}
function Kf(e) {
  const n = Wr(e);
  return _3[n] + e.slice(n.length);
}
function T3(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function zC(e) {
  if (typeof e != "number") {
    return T3(e);
  } else {
    return {
      top: e,
      right: e,
      bottom: e,
      left: e
    };
  }
}
function uu(e) {
  const {
    x: n,
    y: r,
    width: i,
    height: o
  } = e;
  return {
    width: i,
    height: o,
    top: r,
    left: n,
    right: n + i,
    bottom: r + o,
    x: n,
    y: r
  };
}
function of(e, n, r) {
  return Math.floor(e / n) !== r;
}
function du(e, n) {
  return n < 0 || n >= e.length;
}
function kf(e, n) {
  return Cr(e.current, {
    disabledIndices: n
  });
}
function gv(e, n) {
  return Cr(e.current, {
    decrement: true,
    startingIndex: e.current.length,
    disabledIndices: n
  });
}
function Cr(e, {
  startingIndex: n = -1,
  decrement: r = false,
  disabledIndices: i,
  amount: o = 1
} = {}) {
  let u = n;
  do {
    u += r ? -o : o;
  } while (u >= 0 && u <= e.length - 1 && ji(e, u, i));
  return u;
}
function NC(e, {
  event: n,
  orientation: r,
  loopFocus: i,
  onLoop: o,
  rtl: u,
  cols: h,
  disabledIndices: a,
  minIndex: c,
  maxIndex: d,
  prevIndex: p,
  stopEvent: f = false
}) {
  let S = p;
  let _;
  if (n.key === Gv) {
    _ = "up";
  } else if (n.key === Cu) {
    _ = "down";
  }
  if (_) {
    const x = [];
    const w = [];
    let g = false;
    let b = 0;
    {
      let I = null;
      let j = -1;
      e.forEach((W, z) => {
        if (W == null) {
          return;
        }
        b += 1;
        const N = W.closest("[role=\"row\"]");
        if (N) {
          g = true;
        }
        if (N !== I || j === -1) {
          I = N;
          j += 1;
          x[j] = [];
        }
        x[j].push(z);
        w[z] = j;
      });
    }
    let m = false;
    let v = 0;
    if (g) {
      for (const I of x) {
        const j = I.length;
        if (j > v) {
          v = j;
        }
        if (j !== h) {
          m = true;
        }
      }
    }
    const C = m && b < e.length;
    const T = v || h;
    const A = I => {
      if (!m || p === -1) {
        return;
      }
      const j = w[p];
      if (j == null) {
        return;
      }
      const W = x[j].indexOf(p);
      const z = I === "up" ? -1 : 1;
      for (let N = j + z, D = 0; D < x.length; D += 1, N += z) {
        if (N < 0 || N >= x.length) {
          if (!i || C) {
            return;
          }
          N = N < 0 ? x.length - 1 : 0;
          if (o) {
            const G = Math.min(W, x[N].length - 1);
            const q = x[N][G] ?? x[N][0];
            const U = o(n, p, q);
            N = w[U] ?? N;
          }
        }
        const $ = x[N];
        for (let G = Math.min(W, $.length - 1); G >= 0; G -= 1) {
          const q = $[G];
          if (!ji(e, q, a)) {
            return q;
          }
        }
      }
    };
    const M = I => {
      if (!C || p === -1) {
        return;
      }
      const j = p % T;
      const W = I === "up" ? -T : T;
      const z = d - d % T;
      const N = Sa(d / T) + 1;
      for (let D = p - j + W, $ = 0; $ < N; $ += 1, D += W) {
        if (D < 0 || D > d) {
          if (!i) {
            return;
          }
          D = D < 0 ? z : 0;
        }
        const G = Math.min(D + T - 1, d);
        for (let q = Math.min(D + j, G); q >= D; q -= 1) {
          if (!ji(e, q, a)) {
            return q;
          }
        }
      }
    };
    if (f) {
      cr(n);
    }
    const R = A(_) ?? M(_);
    if (R !== undefined) {
      S = R;
    } else if (p === -1) {
      S = _ === "up" ? d : c;
    } else {
      S = Cr(e, {
        startingIndex: p,
        amount: T,
        decrement: _ === "up",
        disabledIndices: a
      });
      if (i) {
        if (_ === "up" && (p - T < c || S < 0)) {
          const I = p % T;
          const j = d % T;
          const W = d - (j - I);
          if (j === I) {
            S = d;
          } else {
            S = j > I ? W : W - T;
          }
          if (o) {
            S = o(n, p, S);
          }
        }
        if (_ === "down" && p + T > d) {
          S = Cr(e, {
            startingIndex: p % T - T,
            amount: T,
            disabledIndices: a
          });
          if (o) {
            S = o(n, p, S);
          }
        }
      }
    }
    if (du(e, S)) {
      S = p;
    }
  }
  if (r === "both") {
    const x = Sa(p / h);
    if (n.key === (u ? ko : Ao)) {
      if (f) {
        cr(n);
      }
      if (p % h !== h - 1) {
        S = Cr(e, {
          startingIndex: p,
          disabledIndices: a
        });
        if (i && of(S, h, x)) {
          S = Cr(e, {
            startingIndex: p - p % h - 1,
            disabledIndices: a
          });
          if (o) {
            S = o(n, p, S);
          }
        }
      } else if (i) {
        S = Cr(e, {
          startingIndex: p - p % h - 1,
          disabledIndices: a
        });
        if (o) {
          S = o(n, p, S);
        }
      }
      if (of(S, h, x)) {
        S = p;
      }
    }
    if (n.key === (u ? Ao : ko)) {
      if (f) {
        cr(n);
      }
      if (p % h !== 0) {
        S = Cr(e, {
          startingIndex: p,
          decrement: true,
          disabledIndices: a
        });
        if (i && of(S, h, x)) {
          S = Cr(e, {
            startingIndex: p + (h - p % h),
            decrement: true,
            disabledIndices: a
          });
          if (o) {
            S = o(n, p, S);
          }
        }
      } else if (i) {
        S = Cr(e, {
          startingIndex: p + (h - p % h),
          decrement: true,
          disabledIndices: a
        });
        if (o) {
          S = o(n, p, S);
        }
      }
      if (of(S, h, x)) {
        S = p;
      }
    }
    const w = Sa(d / h) === x;
    if (du(e, S)) {
      if (i && w) {
        S = n.key === (u ? Ao : ko) ? d : Cr(e, {
          startingIndex: p - p % h - 1,
          disabledIndices: a
        });
        if (o) {
          S = o(n, p, S);
        }
      } else {
        S = p;
      }
    }
  }
  return S;
}
function jC(e, n, r) {
  const i = [];
  let o = 0;
  e.forEach(({
    width: u,
    height: h
  }, a) => {
    let c = false;
    for (r && (o = 0); !c;) {
      const d = [];
      for (let p = 0; p < u; p += 1) {
        for (let f = 0; f < h; f += 1) {
          d.push(o + p + f * n);
        }
      }
      if (o % n + u <= n && d.every(p => i[p] == null)) {
        d.forEach(p => {
          i[p] = a;
        });
        c = true;
      } else {
        o += 1;
      }
    }
  });
  return [...i];
}
function HC(e, n, r, i, o) {
  if (e === -1) {
    return -1;
  }
  const u = r.indexOf(e);
  const h = n[e];
  switch (o) {
    case "tl":
      return u;
    case "tr":
      if (h) {
        return u + h.width - 1;
      } else {
        return u;
      }
    case "bl":
      if (h) {
        return u + (h.height - 1) * i;
      } else {
        return u;
      }
    case "br":
      return r.lastIndexOf(e);
    default:
      return -1;
  }
}
function FC(e, n) {
  return n.flatMap((r, i) => e.includes(r) ? [i] : []);
}
function ji(e, n, r) {
  if (typeof r == "function" ? r(n) : (r == null ? undefined : r.includes(n)) ?? false) {
    return true;
  }
  const o = e[n];
  if (o) {
    if (vh(o)) {
      return !r && (o.hasAttribute("disabled") || o.getAttribute("aria-disabled") === "true");
    } else {
      return true;
    }
  } else {
    return false;
  }
}
function k3(e) {
  return e.visibility === "hidden" || e.visibility === "collapse";
}
function vh(e, n = e ? Dr(e) : null) {
  if (!e || !e.isConnected || !n || k3(n)) {
    return false;
  } else if (typeof e.checkVisibility == "function") {
    return e.checkVisibility();
  } else {
    return n.display !== "none" && n.display !== "contents";
  }
}
const A3 = "a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable=\"false\"]),audio[controls],video[controls]";
function M3(e) {
  const n = e.assignedSlot;
  if (n) {
    return n;
  }
  if (e.parentElement) {
    return e.parentElement;
  }
  const r = e.getRootNode();
  if (Hl(r)) {
    return r.host;
  } else {
    return null;
  }
}
function vv(e) {
  for (const n of Array.from(e.children)) {
    if (Er(n) === "summary") {
      return n;
    }
  }
  return null;
}
function O3(e, n) {
  const r = vv(n);
  return !!r && (e === r || Xe(r, e));
}
function UC(e) {
  const n = e ? Er(e) : "";
  return e != null && e.matches(A3) && (n !== "summary" || e.parentElement != null && Er(e.parentElement) === "details" && vv(e.parentElement) === e) && (n !== "details" || vv(e) == null) && (n !== "input" || e.type !== "hidden");
}
function VC(e) {
  if (!UC(e) || !e.isConnected || e.matches(":disabled")) {
    return false;
  }
  for (let n = e; n; n = M3(n)) {
    const r = n !== e;
    const i = Er(n) === "slot";
    if (n.hasAttribute("inert") || r && Er(n) === "details" && !n.open && !O3(e, n) || n.hasAttribute("hidden") || !i && !D3(n, r)) {
      return false;
    }
  }
  return true;
}
function D3(e, n) {
  const r = Dr(e);
  if (n) {
    return r.display !== "none";
  } else {
    return vh(e, r);
  }
}
function WC(e) {
  const n = e.tabIndex;
  if (n < 0) {
    const r = Er(e);
    if (r === "details" || r === "audio" || r === "video" || un(e) && e.isContentEditable) {
      return 0;
    }
  }
  return n;
}
function Rg(e) {
  if (Er(e) !== "input") {
    return null;
  }
  const n = e;
  if (n.type === "radio" && n.name !== "") {
    return n;
  } else {
    return null;
  }
}
function I3(e, n) {
  const r = Rg(e);
  if (!r) {
    return true;
  }
  const i = n.find(o => {
    const u = Rg(o);
    return (u == null ? undefined : u.name) === r.name && u.form === r.form && u.checked;
  });
  if (i) {
    return i === r;
  } else {
    return n.find(o => {
      const u = Rg(o);
      return (u == null ? undefined : u.name) === r.name && u.form === r.form;
    }) === r;
  }
}
function $C(e) {
  if (un(e) && Er(e) === "slot") {
    const n = e.assignedElements({
      flatten: true
    });
    if (n.length > 0) {
      return n;
    }
  }
  if (un(e) && e.shadowRoot) {
    return Array.from(e.shadowRoot.children);
  } else {
    return Array.from(e.children);
  }
}
function qC(e, n) {
  $C(e).forEach(r => {
    if (UC(r)) {
      n.push(r);
    }
    qC(r, n);
  });
}
function GC(e, n, r) {
  $C(e).forEach(i => {
    if (un(i) && i.matches(n)) {
      r.push(i);
    }
    GC(i, n, r);
  });
}
function Jv(e) {
  return VC(e) && WC(e) >= 0;
}
function YC(e) {
  const n = [];
  qC(e, n);
  return n.filter(VC);
}
function Ru(e) {
  const n = YC(e);
  return n.filter(r => WC(r) >= 0 && I3(r, n));
}
function XC(e, n) {
  const r = Ru(e);
  const i = r.length;
  if (i === 0) {
    return;
  }
  const o = Hn(yt(e));
  const u = r.indexOf(o);
  const h = u === -1 ? n === 1 ? 0 : i - 1 : u + n;
  return r[h];
}
function eb(e) {
  return XC(yt(e).body, 1) || e;
}
function KC(e) {
  return XC(yt(e).body, -1) || e;
}
function ZC(e, n) {
  if (!e) {
    return null;
  }
  const r = Ru(yt(e).body);
  const i = r.length;
  if (i === 0) {
    return null;
  }
  const o = r.indexOf(e);
  if (o === -1) {
    return null;
  }
  const u = (o + n + i) % i;
  return r[u];
}
function L3(e) {
  return ZC(e, 1);
}
function P3(e) {
  return ZC(e, -1);
}
function Pl(e, n) {
  const r = n || e.currentTarget;
  const i = e.relatedTarget;
  return !i || !Xe(r, i);
}
function B3(e) {
  Ru(e).forEach(r => {
    r.dataset.tabindex = r.getAttribute("tabindex") || "";
    r.setAttribute("tabindex", "-1");
  });
}
function xS(e) {
  const n = [];
  GC(e, "[data-tabindex]", n);
  n.forEach(r => {
    const i = r.dataset.tabindex;
    delete r.dataset.tabindex;
    if (i) {
      r.setAttribute("tabindex", i);
    } else {
      r.removeAttribute("tabindex");
    }
  });
}
function Oo(e, n, r = true) {
  return e.filter(o => o.parentId === n).flatMap(o => {
    var u;
    return [...(!r || (u = o.context) != null && u.open ? [o] : []), ...Oo(e, o.id, r)];
  });
}
function CS(e, n) {
  var o;
  let r = [];
  let i = (o = e.find(u => u.id === n)) == null ? undefined : o.parentId;
  while (i) {
    const u = e.find(h => h.id === i);
    i = u == null ? undefined : u.parentId;
    if (u) {
      r = r.concat(u);
    }
  }
  return r;
}
function fu(e) {
  return `data-base-ui-${e}`;
}
let af = 0;
function Af(e, n = {}) {
  const {
    preventScroll: r = false,
    sync: i = false,
    shouldFocus: o
  } = n;
  cancelAnimationFrame(af);
  function u() {
    if ((!o || !!o()) && e != null) {
      e.focus({
        preventScroll: r
      });
    }
  }
  if (i) {
    u();
    return Yt;
  }
  const h = requestAnimationFrame(u);
  af = h;
  return () => {
    if (af === h) {
      cancelAnimationFrame(h);
      af = 0;
    }
  };
}
const Tg = {
  inert: new WeakMap(),
  "aria-hidden": new WeakMap()
};
const ES = "data-base-ui-inert";
const bv = {
  inert: new WeakSet(),
  "aria-hidden": new WeakSet()
};
let Yc = new WeakMap();
let kg = 0;
function z3(e) {
  return bv[e];
}
function QC(e) {
  if (e) {
    if (Hl(e)) {
      return e.host;
    } else {
      return QC(e.parentNode);
    }
  } else {
    return null;
  }
}
const Ag = (e, n) => n.map(r => {
  if (e.contains(r)) {
    return r;
  }
  const i = QC(r);
  if (e.contains(i)) {
    return i;
  } else {
    return null;
  }
}).filter(r => r != null);
const RS = e => {
  const n = new Set();
  e.forEach(r => {
    let i = r;
    while (i && !n.has(i)) {
      n.add(i);
      i = i.parentNode;
    }
  });
  return n;
};
const TS = (e, n, r) => {
  const i = [];
  const o = u => {
    if (!!u && !r.has(u)) {
      Array.from(u.children).forEach(h => {
        if (Er(h) !== "script") {
          if (n.has(h)) {
            o(h);
          } else {
            i.push(h);
          }
        }
      });
    }
  };
  o(e);
  return i;
};
function N3(e, n, r, i, {
  mark: o = true,
  markerIgnoreElements: u = []
}) {
  const h = i ? "inert" : r ? "aria-hidden" : null;
  let a = null;
  let c = null;
  const d = Ag(n, e);
  const p = o ? Ag(n, u) : [];
  const f = new Set(p);
  const S = o ? TS(n, RS(d), new Set(d)).filter(w => !f.has(w)) : [];
  const _ = [];
  const x = [];
  if (h) {
    const w = Tg[h];
    const g = z3(h);
    c = g;
    a = w;
    const b = Ag(n, Array.from(n.querySelectorAll("[aria-live]")));
    const m = d.concat(b);
    TS(n, RS(m), new Set(m)).forEach(C => {
      const T = C.getAttribute(h);
      const A = T !== null && T !== "false";
      const M = (w.get(C) || 0) + 1;
      w.set(C, M);
      _.push(C);
      if (M === 1 && A) {
        g.add(C);
      }
      if (!A) {
        C.setAttribute(h, h === "inert" ? "" : "true");
      }
    });
  }
  if (o) {
    S.forEach(w => {
      const g = (Yc.get(w) || 0) + 1;
      Yc.set(w, g);
      x.push(w);
      if (g === 1) {
        w.setAttribute(ES, "");
      }
    });
  }
  kg += 1;
  return () => {
    if (a) {
      _.forEach(w => {
        const b = (a.get(w) || 0) - 1;
        a.set(w, b);
        if (!b) {
          if ((c == null || !c.has(w)) && h) {
            w.removeAttribute(h);
          }
          if (c != null) {
            c.delete(w);
          }
        }
      });
    }
    if (o) {
      x.forEach(w => {
        const g = (Yc.get(w) || 0) - 1;
        Yc.set(w, g);
        if (!g) {
          w.removeAttribute(ES);
        }
      });
    }
    kg -= 1;
    if (!kg) {
      Tg.inert = new WeakMap();
      Tg["aria-hidden"] = new WeakMap();
      bv.inert = new WeakSet();
      bv["aria-hidden"] = new WeakSet();
      Yc = new WeakMap();
    }
  };
}
function kS(e, n = {}) {
  const {
    ariaHidden: r = false,
    inert: i = false,
    mark: o = true,
    markerIgnoreElements: u = []
  } = n;
  const h = yt(e[0]).body;
  return N3(e, h, r, i, {
    mark: o,
    markerIgnoreElements: u
  });
}
var cs = $x();
let AS = 0;
function j3(e, n = "mui") {
  const [r, i] = E.useState(e);
  const o = e || r;
  E.useEffect(() => {
    if (r == null) {
      AS += 1;
      i(`${n}-${AS}`);
    }
  }, [r, n]);
  return o;
}
const MS = Xv.useId;
function $i(e, n) {
  if (MS !== undefined) {
    const r = MS();
    return e ?? (n ? `${n}-${r}` : r);
  }
  return j3(e, n);
}
const H3 = 500;
const JC = 500;
const F3 = {
  style: {
    transition: "none"
  }
};
const eE = "data-base-ui-click-trigger";
const U3 = "data-base-ui-swipe-ignore";
const V3 = "data-swipe-ignore";
const W3 = `[${U3}]`;
const $3 = `[${V3}]`;
const tE = {
  fallbackAxisSide: "none"
};
const tb = {
  fallbackAxisSide: "end"
};
const q3 = {
  clipPath: "inset(50%)",
  position: "fixed",
  top: 0,
  left: 0
};
const nE = E.createContext(null);
const rE = () => E.useContext(nE);
const G3 = fu("portal");
function sE(e = {}) {
  const {
    ref: n,
    container: r,
    componentProps: i = Xt,
    elementProps: o
  } = e;
  const u = $i();
  const h = rE();
  const a = h == null ? undefined : h.portalNode;
  const [c, d] = E.useState(null);
  const [p, f] = E.useState(null);
  const S = je(g => {
    if (g !== null) {
      f(g);
    }
  });
  const _ = E.useRef(null);
  Fe(() => {
    if (r === null) {
      if (_.current) {
        _.current = null;
        f(null);
        d(null);
      }
      return;
    }
    if (u == null) {
      return;
    }
    const g = (r && ($v(r) ? r : r.current)) ?? a ?? document.body;
    if (g == null) {
      if (_.current) {
        _.current = null;
        f(null);
        d(null);
      }
      return;
    }
    if (_.current !== g) {
      _.current = g;
      f(null);
      d(g);
    }
  }, [r, a, u]);
  const x = Je("div", i, {
    ref: [n, S],
    props: [{
      id: u,
      [G3]: ""
    }, o]
  });
  return {
    portalNode: p,
    portalSubtree: c && x ? cs.createPortal(x, c) : null
  };
}
const _Component9 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    children: h,
    container: a,
    renderGuards: c,
    ...d
  } = n;
  const {
    portalNode: p,
    portalSubtree: f
  } = sE({
    container: a,
    ref: r,
    componentProps: n,
    elementProps: d
  });
  const S = E.useRef(null);
  const _ = E.useRef(null);
  const x = E.useRef(null);
  const w = E.useRef(null);
  const [g, b] = E.useState(null);
  const m = E.useRef(false);
  const v = g == null ? undefined : g.modal;
  const C = g == null ? undefined : g.open;
  const T = typeof c == "boolean" ? c : !!g && !g.modal && g.open && !!p;
  E.useEffect(() => {
    if (!p || v) {
      return;
    }
    function M(R) {
      if (p && R.relatedTarget && Pl(R)) {
        if (R.type === "focusin") {
          if (m.current) {
            xS(p);
            m.current = false;
          }
        } else {
          B3(p);
          m.current = true;
        }
      }
    }
    return js(Tt(p, "focusin", M, true), Tt(p, "focusout", M, true));
  }, [p, v]);
  E.useEffect(() => {
    if (!!p && C === false) {
      xS(p);
      m.current = false;
    }
  }, [C, p]);
  const A = E.useMemo(() => ({
    beforeOutsideRef: S,
    afterOutsideRef: _,
    beforeInsideRef: x,
    afterInsideRef: w,
    portalNode: p,
    setFocusManagerState: b
  }), [p]);
  return <E.Fragment>{f}<nE.Provider value={A}>{T && p && <Hs data-type="outside" ref={S} onFocus={M => {
        var R;
        if (Pl(M, p)) {
          if ((R = x.current) != null) {
            R.focus();
          }
        } else {
          const I = g ? g.domReference : null;
          const j = KC(I);
          if (j != null) {
            j.focus();
          }
        }
      }} />}{T && p && <span aria-owns={p.id} style={q3} />}{p && cs.createPortal(h, p)}{T && p && <Hs data-type="outside" ref={_} onFocus={M => {
        var R;
        if (Pl(M, p)) {
          if ((R = w.current) != null) {
            R.focus();
          }
        } else {
          const I = g ? g.domReference : null;
          const j = eb(I);
          if (j != null) {
            j.focus();
          }
          if (g != null && g.closeOnFocusOut) {
            if (g != null) {
              g.onOpenChange(false, $e(Ui, M.nativeEvent));
            }
          }
        }
      }} />}</nE.Provider></E.Fragment>;
});
function iE() {
  const e = new Map();
  return {
    emit(n, r) {
      var i;
      if ((i = e.get(n)) != null) {
        i.forEach(o => o(r));
      }
    },
    on(n, r) {
      if (!e.has(n)) {
        e.set(n, new Set());
      }
      e.get(n).add(r);
    },
    off(n, r) {
      var i;
      if ((i = e.get(n)) != null) {
        i.delete(r);
      }
    }
  };
}
class nb {
  constructor() {
    tt(this, "nodesRef", {
      current: []
    });
    tt(this, "events", iE());
  }
  addNode(n) {
    this.nodesRef.current.push(n);
  }
  removeNode(n) {
    const r = this.nodesRef.current.findIndex(i => i === n);
    if (r !== -1) {
      this.nodesRef.current.splice(r, 1);
    }
  }
}
const oE = E.createContext(null);
const aE = E.createContext(null);
const qi = () => {
  var e;
  return ((e = E.useContext(oE)) == null ? undefined : e.id) || null;
};
const Bo = e => {
  const n = E.useContext(aE);
  return e ?? n;
};
function rb(e) {
  const n = $i();
  const r = Bo(e);
  const i = qi();
  Fe(() => {
    if (!n) {
      return;
    }
    const o = {
      id: n,
      parentId: i
    };
    if (r != null) {
      r.addNode(o);
    }
    return () => {
      if (r != null) {
        r.removeNode(o);
      }
    };
  }, [r, n, i]);
  return n;
}
function _Component0(e) {
  const {
    children: n,
    id: r
  } = e;
  const i = qi();
  return <oE.Provider value={E.useMemo(() => ({
    id: r,
    parentId: i
  }), [r, i])}>{n}</oE.Provider>;
}
function _Component1(e) {
  const {
    children: n,
    externalTree: r
  } = e;
  const i = sr(() => r ?? new nb()).current;
  return <aE.Provider value={i}>{n}</aE.Provider>;
}
function Di(e) {
  if (e == null) {
    return e;
  } else if ("current" in e) {
    return e.current;
  } else {
    return e;
  }
}
function Y3(e, n) {
  const r = fn(dn(e));
  if (e instanceof r.KeyboardEvent) {
    return "keyboard";
  } else if (e instanceof r.FocusEvent) {
    return n || "keyboard";
  } else if ("pointerType" in e) {
    return e.pointerType || "keyboard";
  } else if ("touches" in e) {
    return "touch";
  } else if (e instanceof r.MouseEvent) {
    return n || (e.detail === 0 ? "keyboard" : "mouse");
  } else {
    return "";
  }
}
const OS = 20;
let Co = [];
function sb() {
  Co = Co.filter(e => {
    var n;
    if ((n = e.deref()) == null) {
      return undefined;
    } else {
      return n.isConnected;
    }
  });
}
function X3(e) {
  sb();
  if (e && Er(e) !== "body") {
    Co.push(new WeakRef(e));
    if (Co.length > OS) {
      Co = Co.slice(-OS);
    }
  }
}
function Mg() {
  var e;
  sb();
  if ((e = Co[Co.length - 1]) == null) {
    return undefined;
  } else {
    return e.deref();
  }
}
function K3(e) {
  if (e) {
    if (Jv(e)) {
      return e;
    } else {
      return Ru(e)[0] || e;
    }
  } else {
    return null;
  }
}
function DS(e, n) {
  var u;
  if (e.hasAttribute("tabindex") && !e.hasAttribute("data-tabindex") || !n.current.includes("floating") && ((u = e.getAttribute("role")) == null || !u.includes("dialog"))) {
    return;
  }
  const i = YC(e).filter(h => {
    const a = h.getAttribute("data-tabindex") || "";
    return Jv(h) || h.hasAttribute("data-tabindex") && !a.startsWith("-");
  });
  const o = e.getAttribute("tabindex");
  if (n.current.includes("floating") || i.length === 0) {
    if (o !== "0") {
      e.setAttribute("tabindex", "0");
    }
  } else if (o !== "-1" || e.hasAttribute("data-tabindex") && e.getAttribute("data-tabindex") !== "-1") {
    e.setAttribute("tabindex", "-1");
    e.setAttribute("data-tabindex", "-1");
  }
}
function _Component8(e) {
  const {
    context: n,
    children: r,
    disabled: i = false,
    initialFocus: o = true,
    returnFocus: u = true,
    restoreFocus: h = false,
    modal: a = true,
    closeOnFocusOut: c = true,
    openInteractionType: d = "",
    nextFocusableElement: p,
    previousFocusableElement: f,
    beforeContentFocusGuardRef: S,
    externalTree: _,
    getInsideElements: x
  } = e;
  const w = "rootStore" in n ? n.rootStore : n;
  const g = w.useState("open");
  const b = w.useState("domReferenceElement");
  const m = w.useState("floatingElement");
  const {
    events: v,
    dataRef: C
  } = w.context;
  const T = je(() => {
    var de;
    if ((de = C.current.floatingContext) == null) {
      return undefined;
    } else {
      return de.nodeId;
    }
  });
  const A = o === false;
  const M = hv(b) && A;
  const R = E.useRef(["content"]);
  const I = On(o);
  const j = On(u);
  const W = On(d);
  const z = Bo(_);
  const N = rE();
  const D = E.useRef(false);
  const $ = E.useRef(false);
  const G = E.useRef(false);
  const q = E.useRef(null);
  const U = E.useRef("");
  const L = E.useRef("");
  const F = E.useRef(null);
  const P = E.useRef(null);
  const V = ls(F, S, N == null ? undefined : N.beforeInsideRef);
  const Z = ls(P, N == null ? undefined : N.afterInsideRef);
  const J = xn();
  const ne = xn();
  const ue = Vi();
  const ee = N != null;
  const Y = Gf(m);
  const re = je((de = Y) => de ? Ru(de) : []);
  const ce = je(() => (x == null ? undefined : x().filter(de => de != null)) ?? []);
  E.useEffect(() => {
    if (i || !a) {
      return;
    }
    function de(H) {
      if (H.key === "Tab" && Xe(Y, Hn(yt(Y))) && re().length === 0 && !M) {
        cr(H);
      }
    }
    const me = yt(Y);
    return Tt(me, "keydown", de);
  }, [i, Y, a, M, re]);
  E.useEffect(() => {
    if (i || !g) {
      return;
    }
    const de = yt(Y);
    function me() {
      G.current = false;
    }
    function H(oe) {
      const X = dn(oe);
      const Q = ce();
      const se = Xe(m, X) || Xe(b, X) || Xe(N == null ? undefined : N.portalNode, X) || Q.some(he => he === X || Xe(he, X));
      G.current = !se;
      L.current = oe.pointerType || "keyboard";
      if (X != null && X.closest(`[${eE}]`)) {
        $.current = true;
      }
    }
    function ae() {
      L.current = "keyboard";
    }
    return js(Tt(de, "pointerdown", H, true), Tt(de, "pointerup", me, true), Tt(de, "pointercancel", me, true), Tt(de, "keydown", ae, true));
  }, [i, m, b, Y, g, N, ce]);
  E.useEffect(() => {
    if (i || !c) {
      return;
    }
    const de = yt(Y);
    function me() {
      $.current = true;
      ne.start(0, () => {
        $.current = false;
      });
    }
    function H(Q) {
      const se = dn(Q);
      if (Jv(se)) {
        q.current = se;
      }
    }
    function ae(Q) {
      const se = Q.relatedTarget;
      const he = Q.currentTarget;
      const ye = dn(Q);
      queueMicrotask(() => {
        const pe = T();
        const Se = w.context.triggerElements;
        const _e = ce();
        const ie = (se == null ? undefined : se.hasAttribute(fu("focus-guard"))) && [F.current, P.current, N == null ? undefined : N.beforeInsideRef.current, N == null ? undefined : N.afterInsideRef.current, N == null ? undefined : N.beforeOutsideRef.current, N == null ? undefined : N.afterOutsideRef.current, Di(f), Di(p)].includes(se);
        const te = !Xe(b, se) && !Xe(m, se) && !Xe(se, m) && !Xe(N == null ? undefined : N.portalNode, se) && !_e.some(be => be === se || Xe(be, se)) && (se == null || !Se.hasElement(se)) && !Se.hasMatchingElement(be => Xe(be, se)) && !ie && (!z || !Oo(z.nodesRef.current, pe).find(be => {
          var ve;
          var Te;
          return Xe((ve = be.context) == null ? undefined : ve.elements.floating, se) || Xe((Te = be.context) == null ? undefined : Te.elements.domReference, se);
        }) && !CS(z.nodesRef.current, pe).find(be => {
          var ve;
          var Te;
          var Re;
          return [(ve = be.context) == null ? undefined : ve.elements.floating, Gf((Te = be.context) == null ? undefined : Te.elements.floating)].includes(se) || ((Re = be.context) == null ? undefined : Re.elements.domReference) === se;
        }));
        if (he === b && Y) {
          DS(Y, R);
        }
        if (h && he !== b && !vh(ye) && Hn(de) === de.body) {
          if (un(Y) && (Y.focus(), h === "popup")) {
            ue.request(() => {
              Y.focus();
            });
            return;
          }
          const be = re();
          const ve = q.current;
          const Te = (ve && be.includes(ve) ? ve : null) || be[be.length - 1] || Y;
          if (un(Te)) {
            Te.focus();
          }
        }
        if (C.current.insideReactTree) {
          C.current.insideReactTree = false;
          return;
        }
        if ((M || !a) && se && te && !$.current && (M || se !== Mg())) {
          D.current = true;
          w.setOpen(false, $e(Ui, Q));
        }
      });
    }
    function oe() {
      if (!G.current) {
        C.current.insideReactTree = true;
        J.start(0, () => {
          C.current.insideReactTree = false;
        });
      }
    }
    const X = un(b) ? b : null;
    if (!!m || !!X) {
      return js(X && Tt(X, "focusout", ae), X && Tt(X, "pointerdown", me), m && Tt(m, "focusin", H), m && Tt(m, "focusout", ae), m && N && Tt(m, "focusout", oe, true));
    }
  }, [i, b, m, Y, a, z, N, w, c, h, re, M, T, R, C, J, ne, ue, p, f, ce]);
  E.useEffect(() => {
    var he;
    var ye;
    var pe;
    if (i || !m || !g) {
      return;
    }
    const de = Array.from(((he = N == null ? undefined : N.portalNode) == null ? undefined : he.querySelectorAll(`[${fu("portal")}]`)) || []);
    const H = (pe = (ye = (z ? CS(z.nodesRef.current, T()) : []).find(Se => {
      var _e;
      return hv(((_e = Se.context) == null ? undefined : _e.elements.domReference) || null);
    })) == null ? undefined : ye.context) == null ? undefined : pe.elements.domReference;
    const oe = [...[m, ...de, F.current, P.current, N == null ? undefined : N.beforeOutsideRef.current, N == null ? undefined : N.afterOutsideRef.current, ...ce()], H, Di(f), Di(p), M ? b : null].filter(Se => Se != null);
    const X = kS(oe, {
      ariaHidden: a || M,
      mark: false
    });
    const Q = [m, ...de].filter(Se => Se != null);
    const se = kS(Q);
    return () => {
      se();
      X();
    };
  }, [g, i, b, m, a, N, M, z, T, p, f, ce]);
  Fe(() => {
    if (!g || i || !un(Y)) {
      return;
    }
    const de = yt(Y);
    const me = Hn(de);
    queueMicrotask(() => {
      const H = I.current;
      const ae = typeof H == "function" ? H(W.current || "") : H;
      if (ae === undefined || ae === false || Xe(Y, me)) {
        return;
      }
      let X = null;
      const Q = () => {
        if (X == null) {
          X = re(Y);
        }
        return X[0] || Y;
      };
      let se;
      if (ae === true || ae === null) {
        se = Q();
      } else {
        se = Di(ae);
      }
      se = se || Q();
      const he = Xe(Y, Hn(de));
      Af(se, {
        preventScroll: se === Y,
        shouldFocus() {
          if (he) {
            return true;
          }
          const ye = Hn(de);
          return ye === se || !Xe(Y, ye);
        }
      });
    });
  }, [i, g, Y, re, I, W]);
  Fe(() => {
    if (i || !Y) {
      return;
    }
    const de = yt(Y);
    const me = Hn(de);
    X3(me);
    function H(oe) {
      if (!oe.open) {
        U.current = Y3(oe.nativeEvent, L.current);
      }
      if (oe.reason === In && oe.nativeEvent.type === "mouseleave") {
        D.current = true;
      }
      if (oe.reason === Eu) {
        if (oe.nested) {
          D.current = false;
        } else if (Wv(oe.nativeEvent) || kC(oe.nativeEvent)) {
          D.current = false;
        } else {
          let X = false;
          yt(Y).createElement("div").focus({
            get preventScroll() {
              X = true;
              return false;
            }
          });
          if (X) {
            D.current = false;
          } else {
            D.current = true;
          }
        }
      }
    }
    v.on("openchange", H);
    function ae() {
      const oe = j.current;
      let X = typeof oe == "function" ? oe(U.current) : oe;
      if (X === undefined || X === false) {
        return null;
      }
      if (X === null) {
        X = true;
      }
      if (typeof X == "boolean") {
        if (b != null && b.isConnected) {
          return b;
        } else {
          return Mg() || null;
        }
      }
      const Q = b != null && b.isConnected ? b : Mg();
      return Di(X) || Q || null;
    }
    return () => {
      v.off("openchange", H);
      const oe = Hn(de);
      const X = ce();
      const Q = Xe(m, oe) || X.some(ye => ye === oe || Xe(ye, oe)) || z && Oo(z.nodesRef.current, T(), false).some(ye => {
        var pe;
        return Xe((pe = ye.context) == null ? undefined : pe.elements.floating, oe);
      });
      const se = j.current;
      const he = ae();
      queueMicrotask(() => {
        const ye = K3(he);
        const pe = typeof se != "boolean";
        if (se && !D.current && un(ye) && (!!pe || ye === oe || oe === de.body || Q)) {
          ye.focus({
            preventScroll: true
          });
        }
        D.current = false;
      });
    };
  }, [i, m, Y, j, v, z, b, T, ce]);
  Fe(() => {
    if (!ch || g || !m) {
      return;
    }
    const de = Hn(yt(m));
    if (!!un(de) && !!ph(de)) {
      if (Xe(m, de)) {
        de.blur();
      }
    }
  }, [g, m]);
  Fe(() => {
    if (!i && !!N) {
      N.setFocusManagerState({
        modal: a,
        closeOnFocusOut: c,
        open: g,
        onOpenChange: w.setOpen,
        domReference: b
      });
      return () => {
        N.setFocusManagerState(null);
      };
    }
  }, [i, N, a, g, w, c, b]);
  Fe(() => {
    if (!i && !!Y) {
      DS(Y, R);
      return () => {
        queueMicrotask(sb);
      };
    }
  }, [i, Y, R]);
  const ge = !i && (a ? !M : true) && (ee || a);
  return <E.Fragment>{ge && <Hs data-type="inside" ref={V} onFocus={de => {
      var me;
      if (a) {
        const H = re();
        Af(H[H.length - 1]);
      } else if (N != null && N.portalNode) {
        D.current = false;
        if (Pl(de, N.portalNode)) {
          const H = eb(b);
          if (H != null) {
            H.focus();
          }
        } else if ((me = Di(f ?? N.beforeOutsideRef)) != null) {
          me.focus();
        }
      }
    }} />}{r}{ge && <Hs data-type="inside" ref={Z} onFocus={de => {
      var me;
      if (a) {
        Af(re()[0]);
      } else if (N != null && N.portalNode) {
        if (c) {
          D.current = true;
        }
        if (Pl(de, N.portalNode)) {
          const H = KC(b);
          if (H != null) {
            H.focus();
          }
        } else if ((me = Di(p ?? N.afterOutsideRef)) != null) {
          me.focus();
        }
      }
    }} />}</E.Fragment>;
}
function ql(e, n = {}) {
  const {
    enabled: r = true,
    event: i = "click",
    toggle: o = true,
    ignoreMouse: u = false,
    stickIfOpen: h = true,
    touchOpenDelay: a = 0,
    reason: c = Fi
  } = n;
  const d = "rootStore" in e ? e.rootStore : e;
  const p = d.context.dataRef;
  const f = E.useRef(undefined);
  const S = Vi();
  const _ = xn();
  const x = E.useMemo(() => {
    function w(b, m, v, C) {
      const T = $e(c, m, v);
      if (b && C === "touch" && a > 0) {
        _.start(a, () => {
          d.setOpen(true, T);
        });
      } else {
        d.setOpen(b, T);
      }
    }
    function g(b, m, v) {
      const C = p.current.openEvent;
      const T = d.select("domReferenceElement") !== m;
      if (b && T || !b || !o) {
        return true;
      } else if (C && h) {
        return !v(C.type);
      } else {
        return false;
      }
    }
    return {
      onPointerDown(b) {
        f.current = b.pointerType;
      },
      onMouseDown(b) {
        const m = f.current;
        const v = b.nativeEvent;
        const C = d.select("open");
        if (b.button !== 0 || i === "click" || Aa(m, true) && u) {
          return;
        }
        const T = g(C, b.currentTarget, R => R === "click" || R === "mousedown");
        const A = dn(v);
        if (ph(A)) {
          w(T, v, A, m);
          return;
        }
        const M = b.currentTarget;
        S.request(() => {
          w(T, v, M, m);
        });
      },
      onClick(b) {
        if (i === "mousedown-only") {
          return;
        }
        const m = f.current;
        if (i === "mousedown" && m) {
          f.current = undefined;
          return;
        }
        if (Aa(m, true) && u) {
          return;
        }
        const v = d.select("open");
        const C = g(v, b.currentTarget, T => T === "click" || T === "mousedown" || T === "keydown" || T === "keyup");
        w(C, b.nativeEvent, b.currentTarget, m);
      },
      onKeyDown() {
        f.current = undefined;
      }
    };
  }, [p, i, u, c, d, h, o, S, _, a]);
  return E.useMemo(() => r ? {
    reference: x
  } : Xt, [r, x]);
}
function Z3(e, n) {
  let r = null;
  let i = null;
  let o = false;
  return {
    contextElement: e || undefined,
    getBoundingClientRect() {
      var _;
      const u = (e == null ? undefined : e.getBoundingClientRect()) || {
        width: 0,
        height: 0,
        x: 0,
        y: 0
      };
      const h = n.axis === "x" || n.axis === "both";
      const a = n.axis === "y" || n.axis === "both";
      const c = ["mouseenter", "mousemove"].includes(((_ = n.dataRef.current.openEvent) == null ? undefined : _.type) || "") && n.pointerType !== "touch";
      let d = u.width;
      let p = u.height;
      let f = u.x;
      let S = u.y;
      if (r == null && n.x && h) {
        r = u.x - n.x;
      }
      if (i == null && n.y && a) {
        i = u.y - n.y;
      }
      f -= r || 0;
      S -= i || 0;
      d = 0;
      p = 0;
      if (!o || c) {
        d = n.axis === "y" ? u.width : 0;
        p = n.axis === "x" ? u.height : 0;
        f = h && n.x != null ? n.x : f;
        S = a && n.y != null ? n.y : S;
      } else if (o && !c) {
        p = n.axis === "x" ? u.height : p;
        d = n.axis === "y" ? u.width : d;
      }
      o = true;
      return {
        width: d,
        height: p,
        x: f,
        y: S,
        top: S,
        right: f + d,
        bottom: S + p,
        left: f
      };
    }
  };
}
function IS(e) {
  return e != null && e.clientX != null;
}
function Q3(e, n = {}) {
  const {
    enabled: r = true,
    axis: i = "both"
  } = n;
  const o = "rootStore" in e ? e.rootStore : e;
  const u = o.useState("open");
  const h = o.useState("floatingElement");
  const a = o.useState("domReferenceElement");
  const c = o.context.dataRef;
  const d = E.useRef(false);
  const p = E.useRef(null);
  const [f, S] = E.useState();
  const [_, x] = E.useState([]);
  const w = je(C => {
    o.set("positionReference", C);
  });
  const g = je((C, T, A) => {
    if (!d.current && (!c.current.openEvent || !!IS(c.current.openEvent))) {
      o.set("positionReference", Z3(A ?? a, {
        x: C,
        y: T,
        axis: i,
        dataRef: c,
        pointerType: f
      }));
    }
  });
  const b = je(C => {
    if (u) {
      if (!p.current) {
        g(C.clientX, C.clientY, C.currentTarget);
        x([]);
      }
    } else {
      g(C.clientX, C.clientY, C.currentTarget);
    }
  });
  const m = Aa(f) ? h : u;
  E.useEffect(() => {
    if (!r) {
      w(a);
      return;
    }
    if (!m) {
      return;
    }
    function C() {
      var M;
      if ((M = p.current) != null) {
        M.call(p);
      }
      p.current = null;
    }
    const T = fn(h);
    function A(M) {
      const R = dn(M);
      if (Xe(h, R)) {
        C();
      } else {
        g(M.clientX, M.clientY);
      }
    }
    if (!c.current.openEvent || IS(c.current.openEvent)) {
      p.current = Tt(T, "mousemove", A);
    } else {
      w(a);
    }
    return C;
  }, [m, r, h, c, a, o, g, w, _]);
  E.useEffect(() => () => {
    o.set("positionReference", null);
  }, [o]);
  E.useEffect(() => {
    if (r && !h) {
      d.current = false;
    }
  }, [r, h]);
  E.useEffect(() => {
    if (!r && u) {
      d.current = true;
    }
  }, [r, u]);
  const v = E.useMemo(() => {
    function C(T) {
      S(T.pointerType);
    }
    return {
      onPointerDown: C,
      onPointerEnter: C,
      onMouseMove: b,
      onMouseEnter: b
    };
  }, [b]);
  return E.useMemo(() => r ? {
    reference: v,
    trigger: v
  } : {}, [r, v]);
}
const J3 = {
  intentional: "onClick",
  sloppy: "onPointerDown"
};
function eL() {
  return false;
}
function tL(e) {
  return {
    escapeKey: typeof e == "boolean" ? e : (e == null ? undefined : e.escapeKey) ?? false,
    outsidePress: typeof e == "boolean" ? e : (e == null ? undefined : e.outsidePress) ?? true
  };
}
function Gl(e, n = {}) {
  const {
    enabled: r = true,
    escapeKey: i = true,
    outsidePress: o = true,
    outsidePressEvent: u = "sloppy",
    referencePress: h = eL,
    referencePressEvent: a = "sloppy",
    bubbles: c,
    externalTree: d
  } = n;
  const p = "rootStore" in e ? e.rootStore : e;
  const f = p.useState("open");
  const S = p.useState("floatingElement");
  const {
    dataRef: _
  } = p.context;
  const x = Bo(d);
  const w = je(typeof o == "function" ? o : () => false);
  const g = typeof o == "function" ? w : o;
  const b = g !== false;
  const m = je(() => u);
  const {
    escapeKey: v,
    outsidePress: C
  } = tL(c);
  const T = E.useRef(false);
  const A = E.useRef(false);
  const M = E.useRef(false);
  const R = E.useRef(false);
  const I = E.useRef("");
  const j = E.useRef(null);
  const W = xn();
  const z = xn();
  const N = je(() => {
    z.clear();
    _.current.insideReactTree = false;
  });
  const D = je(Z => {
    var ue;
    const J = (ue = _.current.floatingContext) == null ? undefined : ue.nodeId;
    return (x ? Oo(x.nodesRef.current, J) : []).some(ee => {
      var Y;
      return ((Y = ee.context) == null ? undefined : Y.open) && !ee.context.dataRef.current[Z];
    });
  });
  const $ = je(Z => Cg(Z, p.select("floatingElement")) || Cg(Z, p.select("domReferenceElement")));
  const G = je(Z => {
    if (h()) {
      p.setOpen(false, $e(Fi, Z.nativeEvent));
    }
  });
  const q = je(Z => {
    if (!f || !r || !i || Z.key !== "Escape" || R.current || !v && D("__escapeKeyBubbles")) {
      return;
    }
    const J = Q5(Z) ? Z.nativeEvent : Z;
    const ne = $e($l, J);
    p.setOpen(false, ne);
    if (!ne.isCanceled) {
      Z.preventDefault();
    }
    if (!v && !ne.isPropagationAllowed) {
      Z.stopPropagation();
    }
  });
  const U = je(() => {
    _.current.insideReactTree = true;
    z.start(0, N);
  });
  const L = je(Z => {
    if (!f || !r || Z.button !== 0) {
      return;
    }
    const J = dn(Z.nativeEvent);
    if (Xe(p.select("floatingElement"), J)) {
      if (!T.current) {
        T.current = true;
        A.current = false;
      }
    }
  });
  const F = je(Z => {
    if (!!f && !!r) {
      if ((Z.defaultPrevented || Z.nativeEvent.defaultPrevented) && T.current) {
        A.current = true;
      }
    }
  });
  E.useEffect(() => {
    if (!f || !r) {
      return;
    }
    _.current.__escapeKeyBubbles = v;
    _.current.__outsidePressBubbles = C;
    const Z = new $r();
    const J = new $r();
    function ne() {
      Z.clear();
      R.current = true;
    }
    function ue() {
      Z.start(fh() ? 5 : 0, () => {
        R.current = false;
      });
    }
    function ee() {
      M.current = true;
      J.start(0, () => {
        M.current = false;
      });
    }
    function Y() {
      T.current = false;
      A.current = false;
    }
    function re() {
      const ie = I.current;
      const te = ie === "pen" || !ie ? "mouse" : ie;
      const be = m();
      const ve = typeof be == "function" ? be() : be;
      if (typeof ve == "string") {
        return ve;
      } else {
        return ve[te];
      }
    }
    function ce(ie) {
      const te = re();
      return te === "intentional" && ie.type !== "click" || te === "sloppy" && ie.type === "click";
    }
    function ge(ie) {
      var ve;
      const te = (ve = _.current.floatingContext) == null ? undefined : ve.nodeId;
      const be = x && Oo(x.nodesRef.current, te).some(Te => {
        var Re;
        return Cg(ie, (Re = Te.context) == null ? undefined : Re.elements.floating);
      });
      return $(ie) || be;
    }
    function de(ie) {
      if (ce(ie)) {
        if (ie.type !== "click" && !$(ie)) {
          J.clear();
          M.current = false;
        }
        N();
        return;
      }
      if (_.current.insideReactTree) {
        N();
        return;
      }
      const te = dn(ie);
      const be = `[${fu("inert")}]`;
      const ve = Mt(te) ? te.getRootNode() : null;
      const Te = Array.from((Hl(ve) ? ve : yt(p.select("floatingElement"))).querySelectorAll(be));
      const Re = p.context.triggerElements;
      if (te && (Re.hasElement(te) || Re.hasMatchingElement(Be => Xe(Be, te)))) {
        return;
      }
      let ze = Mt(te) ? te : null;
      while (ze && !si(ze)) {
        const Be = oi(ze);
        if (si(Be) || !Mt(Be)) {
          break;
        }
        ze = Be;
      }
      if (!Te.length || !Mt(te) || !!s3(te) || !!Xe(te, p.select("floatingElement")) || !Te.every(Be => !Xe(ze, Be))) {
        if (un(te) && !("touches" in ie)) {
          const Be = si(te);
          const Ue = Dr(te);
          const We = /auto|scroll/;
          const lt = Be || We.test(Ue.overflowX);
          const dt = Be || We.test(Ue.overflowY);
          const _t = lt && te.clientWidth > 0 && te.scrollWidth > te.clientWidth;
          const Dt = dt && te.clientHeight > 0 && te.scrollHeight > te.clientHeight;
          const kt = Ue.direction === "rtl";
          const Ge = Dt && (kt ? ie.offsetX <= te.offsetWidth - te.clientWidth : ie.offsetX > te.clientWidth);
          const Ye = _t && ie.offsetY > te.clientHeight;
          if (Ge || Ye) {
            return;
          }
        }
        if (!ge(ie)) {
          if (re() === "intentional" && M.current) {
            J.clear();
            M.current = false;
            return;
          }
          if ((typeof g != "function" || !!g(ie)) && !D("__outsidePressBubbles")) {
            p.setOpen(false, $e(Eu, ie));
            N();
          }
        }
      }
    }
    function me(ie) {
      if (re() === "sloppy" && ie.pointerType !== "touch" && !!p.select("open") && !!r && !$(ie)) {
        de(ie);
      }
    }
    function H(ie) {
      if (re() !== "sloppy" || !p.select("open") || !r || $(ie)) {
        return;
      }
      const te = ie.touches[0];
      if (te) {
        j.current = {
          startTime: Date.now(),
          startX: te.clientX,
          startY: te.clientY,
          dismissOnTouchEnd: false,
          dismissOnMouseDown: true
        };
        W.start(1000, () => {
          if (j.current) {
            j.current.dismissOnTouchEnd = false;
            j.current.dismissOnMouseDown = false;
          }
        });
      }
    }
    function ae(ie, te) {
      const be = dn(ie);
      if (!be) {
        return;
      }
      const ve = Tt(be, ie.type, () => {
        te(ie);
        ve();
      });
    }
    function oe(ie) {
      I.current = "touch";
      ae(ie, H);
    }
    function X(ie) {
      W.clear();
      if (ie.type === "pointerdown") {
        I.current = ie.pointerType;
      }
      if (ie.type !== "mousedown" || !j.current || !!j.current.dismissOnMouseDown) {
        ae(ie, te => {
          if (te.type === "pointerdown") {
            me(te);
          } else {
            de(te);
          }
        });
      }
    }
    function Q(ie) {
      if (!T.current) {
        return;
      }
      const te = A.current;
      Y();
      if (re() === "intentional") {
        if (ie.type === "pointercancel") {
          if (te) {
            ee();
          }
          return;
        }
        if (!ge(ie)) {
          if (te) {
            ee();
            return;
          }
          if (typeof g != "function" || !!g(ie)) {
            J.clear();
            M.current = true;
            N();
          }
        }
      }
    }
    function se(ie) {
      if (re() !== "sloppy" || !j.current || $(ie)) {
        return;
      }
      const te = ie.touches[0];
      if (!te) {
        return;
      }
      const be = Math.abs(te.clientX - j.current.startX);
      const ve = Math.abs(te.clientY - j.current.startY);
      const Te = Math.sqrt(be * be + ve * ve);
      if (Te > 5) {
        j.current.dismissOnTouchEnd = true;
      }
      if (Te > 10) {
        de(ie);
        W.clear();
        j.current = null;
      }
    }
    function he(ie) {
      ae(ie, se);
    }
    function ye(ie) {
      if (re() === "sloppy" && !!j.current && !$(ie)) {
        if (j.current.dismissOnTouchEnd) {
          de(ie);
        }
        W.clear();
        j.current = null;
      }
    }
    function pe(ie) {
      ae(ie, ye);
    }
    const Se = yt(S);
    const _e = js(i && js(Tt(Se, "keydown", q), Tt(Se, "compositionstart", ne), Tt(Se, "compositionend", ue)), b && js(Tt(Se, "click", X, true), Tt(Se, "pointerdown", X, true), Tt(Se, "pointerup", Q, true), Tt(Se, "pointercancel", Q, true), Tt(Se, "mousedown", X, true), Tt(Se, "mouseup", Q, true), Tt(Se, "touchstart", oe, true), Tt(Se, "touchmove", he, true), Tt(Se, "touchend", pe, true)));
    return () => {
      _e();
      Z.clear();
      J.clear();
      Y();
      M.current = false;
    };
  }, [_, S, i, b, g, f, r, v, C, q, N, m, D, $, x, p, W]);
  E.useEffect(N, [g, N]);
  const P = E.useMemo(() => ({
    onKeyDown: q,
    [J3[a]]: G,
    ...(a !== "intentional" && {
      onClick: G
    })
  }), [q, G, a]);
  const V = E.useMemo(() => ({
    onKeyDown: q,
    onPointerDown: F,
    onMouseDown: F,
    onClickCapture: U,
    onMouseDownCapture(Z) {
      U();
      L(Z);
    },
    onPointerDownCapture(Z) {
      U();
      L(Z);
    },
    onMouseUpCapture: U,
    onTouchEndCapture: U,
    onTouchMoveCapture: U
  }), [q, U, L, F]);
  return E.useMemo(() => r ? {
    reference: P,
    floating: V,
    trigger: P
  } : {}, [r, P, V]);
}
function LS(e, n, r) {
  let {
    reference: i,
    floating: o
  } = e;
  const u = ws(n);
  const h = Qv(n);
  const a = Zv(h);
  const c = Wr(n);
  const d = u === "y";
  const p = i.x + i.width / 2 - o.width / 2;
  const f = i.y + i.height / 2 - o.height / 2;
  const S = i[a] / 2 - o[a] / 2;
  let _;
  switch (c) {
    case "top":
      _ = {
        x: p,
        y: i.y - o.height
      };
      break;
    case "bottom":
      _ = {
        x: p,
        y: i.y + i.height
      };
      break;
    case "right":
      _ = {
        x: i.x + i.width,
        y: f
      };
      break;
    case "left":
      _ = {
        x: i.x - o.width,
        y: f
      };
      break;
    default:
      _ = {
        x: i.x,
        y: i.y
      };
  }
  switch (Po(n)) {
    case "start":
      _[h] -= S * (r && d ? -1 : 1);
      break;
    case "end":
      _[h] += S * (r && d ? -1 : 1);
      break;
  }
  return _;
}
async function nL(e, n) {
  var r;
  if (n === undefined) {
    n = {};
  }
  const {
    x: i,
    y: o,
    platform: u,
    rects: h,
    elements: a,
    strategy: c
  } = e;
  const {
    boundary: d = "clippingAncestors",
    rootBoundary: p = "viewport",
    elementContext: f = "floating",
    altBoundary: S = false,
    padding: _ = 0
  } = Wi(n, e);
  const x = zC(_);
  const g = a[S ? f === "floating" ? "reference" : "floating" : f];
  const b = uu(await u.getClippingRect({
    element: (r = await (u.isElement == null ? undefined : u.isElement(g))) == null || r ? g : g.contextElement || (await (u.getDocumentElement == null ? undefined : u.getDocumentElement(a.floating))),
    boundary: d,
    rootBoundary: p,
    strategy: c
  }));
  const m = f === "floating" ? {
    x: i,
    y: o,
    width: h.floating.width,
    height: h.floating.height
  } : h.reference;
  const v = await (u.getOffsetParent == null ? undefined : u.getOffsetParent(a.floating));
  const C = (await (u.isElement == null ? undefined : u.isElement(v))) ? (await (u.getScale == null ? undefined : u.getScale(v))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const T = uu(u.convertOffsetParentRelativeRectToViewportRelativeRect ? await u.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: m,
    offsetParent: v,
    strategy: c
  }) : m);
  return {
    top: (b.top - T.top + x.top) / C.y,
    bottom: (T.bottom - b.bottom + x.bottom) / C.y,
    left: (b.left - T.left + x.left) / C.x,
    right: (T.right - b.right + x.right) / C.x
  };
}
const rL = 50;
const sL = async (e, n, r) => {
  const {
    placement: i = "bottom",
    strategy: o = "absolute",
    middleware: u = [],
    platform: h
  } = r;
  const a = h.detectOverflow ? h : {
    ...h,
    detectOverflow: nL
  };
  const c = await (h.isRTL == null ? undefined : h.isRTL(n));
  let d = await h.getElementRects({
    reference: e,
    floating: n,
    strategy: o
  });
  let {
    x: p,
    y: f
  } = LS(d, i, c);
  let S = i;
  let _ = 0;
  const x = {};
  for (let w = 0; w < u.length; w++) {
    const g = u[w];
    if (!g) {
      continue;
    }
    const {
      name: b,
      fn: m
    } = g;
    const {
      x: v,
      y: C,
      data: T,
      reset: A
    } = await m({
      x: p,
      y: f,
      initialPlacement: i,
      placement: S,
      strategy: o,
      middlewareData: x,
      rects: d,
      platform: a,
      elements: {
        reference: e,
        floating: n
      }
    });
    p = v ?? p;
    f = C ?? f;
    x[b] = {
      ...x[b],
      ...T
    };
    if (A && _ < rL) {
      _++;
      if (typeof A == "object") {
        if (A.placement) {
          S = A.placement;
        }
        if (A.rects) {
          d = A.rects === true ? await h.getElementRects({
            reference: e,
            floating: n,
            strategy: o
          }) : A.rects;
        }
        ({
          x: p,
          y: f
        } = LS(d, S, c));
      }
      w = -1;
    }
  }
  return {
    x: p,
    y: f,
    placement: S,
    strategy: o,
    middlewareData: x
  };
};
const iL = function (e = {}) {
  return {
    name: "flip",
    options: e,
    async fn(n) {
      var r;
      var i;
      const {
        placement: o,
        middlewareData: u,
        rects: h,
        initialPlacement: a,
        platform: c,
        elements: d
      } = n;
      const {
        mainAxis: p = true,
        crossAxis: f = true,
        fallbackPlacements: S,
        fallbackStrategy: _ = "bestFit",
        fallbackAxisSideDirection: x = "none",
        flipAlignment: w = true,
        ...g
      } = Wi(e, n);
      if ((r = u.arrow) != null && r.alignmentOffset) {
        return {};
      }
      const b = Wr(o);
      const m = ws(a);
      const v = Wr(a) === a;
      const C = await (c.isRTL == null ? undefined : c.isRTL(d.floating));
      const T = S || (v || !w ? [Kf(a)] : S3(a));
      const A = x !== "none";
      if (!S && A) {
        T.push(...R3(a, w, x, C));
      }
      const M = [a, ...T];
      const R = await c.detectOverflow(n, g);
      const I = [];
      let j = ((i = u.flip) == null ? undefined : i.overflows) || [];
      if (p) {
        I.push(R[b]);
      }
      if (f) {
        const D = w3(o, h, C);
        I.push(R[D[0]], R[D[1]]);
      }
      j = [...j, {
        placement: o,
        overflows: I
      }];
      if (!I.every(D => D <= 0)) {
        var W;
        var z;
        const D = (((W = u.flip) == null ? undefined : W.index) || 0) + 1;
        const $ = M[D];
        if ($ && (!(f === "alignment" ? m !== ws($) : false) || j.every(U => ws(U.placement) === m ? U.overflows[0] > 0 : true))) {
          return {
            data: {
              index: D,
              overflows: j
            },
            reset: {
              placement: $
            }
          };
        }
        let G = (z = j.filter(q => q.overflows[0] <= 0).sort((q, U) => q.overflows[1] - U.overflows[1])[0]) == null ? undefined : z.placement;
        if (!G) {
          switch (_) {
            case "bestFit":
              {
                var N;
                const q = (N = j.filter(U => {
                  if (A) {
                    const L = ws(U.placement);
                    return L === m || L === "y";
                  }
                  return true;
                }).map(U => [U.placement, U.overflows.filter(L => L > 0).reduce((L, F) => L + F, 0)]).sort((U, L) => U[1] - L[1])[0]) == null ? undefined : N[0];
                if (q) {
                  G = q;
                }
                break;
              }
            case "initialPlacement":
              G = a;
              break;
          }
        }
        if (o !== G) {
          return {
            reset: {
              placement: G
            }
          };
        }
      }
      return {};
    }
  };
};
function PS(e, n) {
  return {
    top: e.top - n.height,
    right: e.right - n.width,
    bottom: e.bottom - n.height,
    left: e.left - n.width
  };
}
function BS(e) {
  return y3.some(n => e[n] >= 0);
}
const oL = function (e = {}) {
  return {
    name: "hide",
    options: e,
    async fn(n) {
      const {
        rects: r,
        platform: i
      } = n;
      const {
        strategy: o = "referenceHidden",
        ...u
      } = Wi(e, n);
      switch (o) {
        case "referenceHidden":
          {
            const h = await i.detectOverflow(n, {
              ...u,
              elementContext: "reference"
            });
            const a = PS(h, r.reference);
            return {
              data: {
                referenceHiddenOffsets: a,
                referenceHidden: BS(a)
              }
            };
          }
        case "escaped":
          {
            const h = await i.detectOverflow(n, {
              ...u,
              altBoundary: true
            });
            const a = PS(h, r.floating);
            return {
              data: {
                escapedOffsets: a,
                escaped: BS(a)
              }
            };
          }
        default:
          return {};
      }
    }
  };
};
const uE = new Set(["left", "top"]);
async function aL(e, n) {
  const {
    placement: r,
    platform: i,
    elements: o
  } = e;
  const u = await (i.isRTL == null ? undefined : i.isRTL(o.floating));
  const h = Wr(r);
  const a = Po(r);
  const c = ws(r) === "y";
  const d = uE.has(h) ? -1 : 1;
  const p = u && c ? -1 : 1;
  const f = Wi(n, e);
  let {
    mainAxis: S,
    crossAxis: _,
    alignmentAxis: x
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  if (a && typeof x == "number") {
    _ = a === "end" ? x * -1 : x;
  }
  if (c) {
    return {
      x: _ * p,
      y: S * d
    };
  } else {
    return {
      x: S * d,
      y: _ * p
    };
  }
}
const lL = function (e = 0) {
  return {
    name: "offset",
    options: e,
    async fn(n) {
      var r;
      var i;
      const {
        x: o,
        y: u,
        placement: h,
        middlewareData: a
      } = n;
      const c = await aL(n, e);
      if (h === ((r = a.offset) == null ? undefined : r.placement) && (i = a.arrow) != null && i.alignmentOffset) {
        return {};
      } else {
        return {
          x: o + c.x,
          y: u + c.y,
          data: {
            ...c,
            placement: h
          }
        };
      }
    }
  };
};
const cL = function (e = {}) {
  return {
    name: "shift",
    options: e,
    async fn(n) {
      const {
        x: r,
        y: i,
        placement: o,
        platform: u
      } = n;
      const {
        mainAxis: h = true,
        crossAxis: a = false,
        limiter: c = {
          fn: b => {
            let {
              x: m,
              y: v
            } = b;
            return {
              x: m,
              y: v
            };
          }
        },
        ...d
      } = Wi(e, n);
      const p = {
        x: r,
        y: i
      };
      const f = await u.detectOverflow(n, d);
      const S = ws(Wr(o));
      const _ = Kv(S);
      let x = p[_];
      let w = p[S];
      if (h) {
        const b = _ === "y" ? "top" : "left";
        const m = _ === "y" ? "bottom" : "right";
        const v = x + f[b];
        const C = x - f[m];
        x = pv(v, x, C);
      }
      if (a) {
        const b = S === "y" ? "top" : "left";
        const m = S === "y" ? "bottom" : "right";
        const v = w + f[b];
        const C = w - f[m];
        w = pv(v, w, C);
      }
      const g = c.fn({
        ...n,
        [_]: x,
        [S]: w
      });
      return {
        ...g,
        data: {
          x: g.x - r,
          y: g.y - i,
          enabled: {
            [_]: h,
            [S]: a
          }
        }
      };
    }
  };
};
const uL = function (e = {}) {
  return {
    options: e,
    fn(n) {
      const {
        x: r,
        y: i,
        placement: o,
        rects: u,
        middlewareData: h
      } = n;
      const {
        offset: a = 0,
        mainAxis: c = true,
        crossAxis: d = true
      } = Wi(e, n);
      const p = {
        x: r,
        y: i
      };
      const f = ws(o);
      const S = Kv(f);
      let _ = p[S];
      let x = p[f];
      const w = Wi(a, n);
      const g = typeof w == "number" ? {
        mainAxis: w,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...w
      };
      if (c) {
        const v = S === "y" ? "height" : "width";
        const C = u.reference[S] - u.floating[v] + g.mainAxis;
        const T = u.reference[S] + u.reference[v] - g.mainAxis;
        if (_ < C) {
          _ = C;
        } else if (_ > T) {
          _ = T;
        }
      }
      if (d) {
        var b;
        var m;
        const v = S === "y" ? "width" : "height";
        const C = uE.has(Wr(o));
        const T = u.reference[f] - u.floating[v] + (C && ((b = h.offset) == null ? undefined : b[f]) || 0) + (C ? 0 : g.crossAxis);
        const A = u.reference[f] + u.reference[v] + (C ? 0 : ((m = h.offset) == null ? undefined : m[f]) || 0) - (C ? g.crossAxis : 0);
        if (x < T) {
          x = T;
        } else if (x > A) {
          x = A;
        }
      }
      return {
        [S]: _,
        [f]: x
      };
    }
  };
};
const dL = function (e = {}) {
  return {
    name: "size",
    options: e,
    async fn(n) {
      var r;
      var i;
      const {
        placement: o,
        rects: u,
        platform: h,
        elements: a
      } = n;
      const {
        apply: c = () => {},
        ...d
      } = Wi(e, n);
      const p = await h.detectOverflow(n, d);
      const f = Wr(o);
      const S = Po(o);
      const _ = ws(o) === "y";
      const {
        width: x,
        height: w
      } = u.floating;
      let g;
      let b;
      if (f === "top" || f === "bottom") {
        g = f;
        b = S === ((await (h.isRTL == null ? undefined : h.isRTL(a.floating))) ? "start" : "end") ? "left" : "right";
      } else {
        b = f;
        g = S === "end" ? "top" : "bottom";
      }
      const m = w - p.top - p.bottom;
      const v = x - p.left - p.right;
      const C = Fl(w - p[g], m);
      const T = Fl(x - p[b], v);
      const A = !n.middlewareData.shift;
      let M = C;
      let R = T;
      if ((r = n.middlewareData.shift) != null && r.enabled.x) {
        R = v;
      }
      if ((i = n.middlewareData.shift) != null && i.enabled.y) {
        M = m;
      }
      if (A && !S) {
        const j = as(p.left, 0);
        const W = as(p.right, 0);
        const z = as(p.top, 0);
        const N = as(p.bottom, 0);
        if (_) {
          R = x - (j !== 0 || W !== 0 ? j + W : as(p.left, p.right)) * 2;
        } else {
          M = w - (z !== 0 || N !== 0 ? z + N : as(p.top, p.bottom)) * 2;
        }
      }
      await c({
        ...n,
        availableWidth: R,
        availableHeight: M
      });
      const I = await h.getDimensions(a.floating);
      if (x !== I.width || w !== I.height) {
        return {
          reset: {
            rects: true
          }
        };
      } else {
        return {};
      }
    }
  };
};
function dE(e) {
  const n = Dr(e);
  let r = parseFloat(n.width) || 0;
  let i = parseFloat(n.height) || 0;
  const o = un(e);
  const u = o ? e.offsetWidth : r;
  const h = o ? e.offsetHeight : i;
  const a = Ul(r) !== u || Ul(i) !== h;
  if (a) {
    r = u;
    i = h;
  }
  return {
    width: r,
    height: i,
    $: a
  };
}
function ib(e) {
  if (Mt(e)) {
    return e;
  } else {
    return e.contextElement;
  }
}
function Bl(e) {
  const n = ib(e);
  if (!un(n)) {
    return ii(1);
  }
  const r = n.getBoundingClientRect();
  const {
    width: i,
    height: o,
    $: u
  } = dE(n);
  let h = (u ? Ul(r.width) : r.width) / i;
  let a = (u ? Ul(r.height) : r.height) / o;
  if (!h || !Number.isFinite(h)) {
    h = 1;
  }
  if (!a || !Number.isFinite(a)) {
    a = 1;
  }
  return {
    x: h,
    y: a
  };
}
const fL = ii(0);
function fE(e) {
  const n = fn(e);
  if (!fh() || !n.visualViewport) {
    return fL;
  } else {
    return {
      x: n.visualViewport.offsetLeft,
      y: n.visualViewport.offsetTop
    };
  }
}
function hL(e, n = false, r) {
  if (!r || n && r !== fn(e)) {
    return false;
  } else {
    return n;
  }
}
function Oa(e, n = false, r = false, i) {
  const o = e.getBoundingClientRect();
  const u = ib(e);
  let h = ii(1);
  if (n) {
    if (i) {
      if (Mt(i)) {
        h = Bl(i);
      }
    } else {
      h = Bl(e);
    }
  }
  const a = hL(u, r, i) ? fE(u) : ii(0);
  let c = (o.left + a.x) / h.x;
  let d = (o.top + a.y) / h.y;
  let p = o.width / h.x;
  let f = o.height / h.y;
  if (u) {
    const S = fn(u);
    const _ = i && Mt(i) ? fn(i) : i;
    let x = S;
    let w = dv(x);
    while (w && i && _ !== x) {
      const g = Bl(w);
      const b = w.getBoundingClientRect();
      const m = Dr(w);
      const v = b.left + (w.clientLeft + parseFloat(m.paddingLeft)) * g.x;
      const C = b.top + (w.clientTop + parseFloat(m.paddingTop)) * g.y;
      c *= g.x;
      d *= g.y;
      p *= g.x;
      f *= g.y;
      c += v;
      d += C;
      x = fn(w);
      w = dv(x);
    }
  }
  return uu({
    width: p,
    height: f,
    x: c,
    y: d
  });
}
function _h(e, n) {
  const r = hh(e).scrollLeft;
  if (n) {
    return n.left + r;
  } else {
    return Oa(li(e)).left + r;
  }
}
function hE(e, n) {
  const r = e.getBoundingClientRect();
  const i = r.left + n.scrollLeft - _h(e, r);
  const o = r.top + n.scrollTop;
  return {
    x: i,
    y: o
  };
}
function pL(e) {
  let {
    elements: n,
    rect: r,
    offsetParent: i,
    strategy: o
  } = e;
  const u = o === "fixed";
  const h = li(i);
  const a = n ? dh(n.floating) : false;
  if (i === h || a && u) {
    return r;
  }
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let d = ii(1);
  const p = ii(0);
  const f = un(i);
  if ((f || !f && !u) && ((Er(i) !== "body" || Lo(h)) && (c = hh(i)), f)) {
    const _ = Oa(i);
    d = Bl(i);
    p.x = _.x + i.clientLeft;
    p.y = _.y + i.clientTop;
  }
  const S = h && !f && !u ? hE(h, c) : ii(0);
  return {
    width: r.width * d.x,
    height: r.height * d.y,
    x: r.x * d.x - c.scrollLeft * d.x + p.x + S.x,
    y: r.y * d.y - c.scrollTop * d.y + p.y + S.y
  };
}
function mL(e) {
  return Array.from(e.getClientRects());
}
function gL(e) {
  const n = li(e);
  const r = hh(e);
  const i = e.ownerDocument.body;
  const o = as(n.scrollWidth, n.clientWidth, i.scrollWidth, i.clientWidth);
  const u = as(n.scrollHeight, n.clientHeight, i.scrollHeight, i.clientHeight);
  let h = -r.scrollLeft + _h(e);
  const a = -r.scrollTop;
  if (Dr(i).direction === "rtl") {
    h += as(n.clientWidth, i.clientWidth) - o;
  }
  return {
    width: o,
    height: u,
    x: h,
    y: a
  };
}
const zS = 25;
function vL(e, n) {
  const r = fn(e);
  const i = li(e);
  const o = r.visualViewport;
  let u = i.clientWidth;
  let h = i.clientHeight;
  let a = 0;
  let c = 0;
  if (o) {
    u = o.width;
    h = o.height;
    const p = fh();
    if (!p || p && n === "fixed") {
      a = o.offsetLeft;
      c = o.offsetTop;
    }
  }
  const d = _h(i);
  if (d <= 0) {
    const p = i.ownerDocument;
    const f = p.body;
    const S = getComputedStyle(f);
    const _ = p.compatMode === "CSS1Compat" && parseFloat(S.marginLeft) + parseFloat(S.marginRight) || 0;
    const x = Math.abs(i.clientWidth - f.clientWidth - _);
    if (x <= zS) {
      u -= x;
    }
  } else if (d <= zS) {
    u += d;
  }
  return {
    width: u,
    height: h,
    x: a,
    y: c
  };
}
function bL(e, n) {
  const r = Oa(e, true, n === "fixed");
  const i = r.top + e.clientTop;
  const o = r.left + e.clientLeft;
  const u = un(e) ? Bl(e) : ii(1);
  const h = e.clientWidth * u.x;
  const a = e.clientHeight * u.y;
  const c = o * u.x;
  const d = i * u.y;
  return {
    width: h,
    height: a,
    x: c,
    y: d
  };
}
function NS(e, n, r) {
  let i;
  if (n === "viewport") {
    i = vL(e, r);
  } else if (n === "document") {
    i = gL(li(e));
  } else if (Mt(n)) {
    i = bL(n, r);
  } else {
    const o = fE(e);
    i = {
      x: n.x - o.x,
      y: n.y - o.y,
      width: n.width,
      height: n.height
    };
  }
  return uu(i);
}
function pE(e, n) {
  const r = oi(e);
  if (r === n || !Mt(r) || si(r)) {
    return false;
  } else {
    return Dr(r).position === "fixed" || pE(r, n);
  }
}
function yL(e, n) {
  const r = n.get(e);
  if (r) {
    return r;
  }
  let i = lu(e, [], false).filter(a => Mt(a) && Er(a) !== "body");
  let o = null;
  const u = Dr(e).position === "fixed";
  let h = u ? oi(e) : e;
  while (Mt(h) && !si(h)) {
    const a = Dr(h);
    const c = qv(h);
    if (!c && a.position === "fixed") {
      o = null;
    }
    if (u ? !c && !o : !c && a.position === "static" && !!o && (o.position === "absolute" || o.position === "fixed") || Lo(h) && !c && pE(e, h)) {
      i = i.filter(p => p !== h);
    } else {
      o = a;
    }
    h = oi(h);
  }
  n.set(e, i);
  return i;
}
function _L(e) {
  let {
    element: n,
    boundary: r,
    rootBoundary: i,
    strategy: o
  } = e;
  const h = [...(r === "clippingAncestors" ? dh(n) ? [] : yL(n, this._c) : [].concat(r)), i];
  const a = NS(n, h[0], o);
  let c = a.top;
  let d = a.right;
  let p = a.bottom;
  let f = a.left;
  for (let S = 1; S < h.length; S++) {
    const _ = NS(n, h[S], o);
    c = as(_.top, c);
    d = Fl(_.right, d);
    p = Fl(_.bottom, p);
    f = as(_.left, f);
  }
  return {
    width: d - f,
    height: p - c,
    x: f,
    y: c
  };
}
function wL(e) {
  const {
    width: n,
    height: r
  } = dE(e);
  return {
    width: n,
    height: r
  };
}
function SL(e, n, r) {
  const i = un(n);
  const o = li(n);
  const u = r === "fixed";
  const h = Oa(e, true, u, n);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = ii(0);
  function d() {
    c.x = _h(o);
  }
  if (i || !i && !u) {
    if (Er(n) !== "body" || Lo(o)) {
      a = hh(n);
    }
    if (i) {
      const _ = Oa(n, true, u, n);
      c.x = _.x + n.clientLeft;
      c.y = _.y + n.clientTop;
    } else if (o) {
      d();
    }
  }
  if (u && !i && o) {
    d();
  }
  const p = o && !i && !u ? hE(o, a) : ii(0);
  const f = h.left + a.scrollLeft - c.x - p.x;
  const S = h.top + a.scrollTop - c.y - p.y;
  return {
    x: f,
    y: S,
    width: h.width,
    height: h.height
  };
}
function Og(e) {
  return Dr(e).position === "static";
}
function jS(e, n) {
  if (!un(e) || Dr(e).position === "fixed") {
    return null;
  }
  if (n) {
    return n(e);
  }
  let r = e.offsetParent;
  if (li(e) === r) {
    r = r.ownerDocument.body;
  }
  return r;
}
function mE(e, n) {
  const r = fn(e);
  if (dh(e)) {
    return r;
  }
  if (!un(e)) {
    let o = oi(e);
    while (o && !si(o)) {
      if (Mt(o) && !Og(o)) {
        return o;
      }
      o = oi(o);
    }
    return r;
  }
  let i = jS(e, n);
  while (i && e3(i) && Og(i)) {
    i = jS(i, n);
  }
  if (i && si(i) && Og(i) && !qv(i)) {
    return r;
  } else {
    return i || r3(e) || r;
  }
}
const xL = async function (e) {
  const n = this.getOffsetParent || mE;
  const r = this.getDimensions;
  const i = await r(e.floating);
  return {
    reference: SL(e.reference, await n(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: i.width,
      height: i.height
    }
  };
};
function CL(e) {
  return Dr(e).direction === "rtl";
}
const gE = {
  convertOffsetParentRelativeRectToViewportRelativeRect: pL,
  getDocumentElement: li,
  getClippingRect: _L,
  getOffsetParent: mE,
  getElementRects: xL,
  getClientRects: mL,
  getDimensions: wL,
  getScale: Bl,
  isElement: Mt,
  isRTL: CL
};
function vE(e, n) {
  return e.x === n.x && e.y === n.y && e.width === n.width && e.height === n.height;
}
function EL(e, n) {
  let r = null;
  let i;
  const o = li(e);
  function u() {
    var a;
    clearTimeout(i);
    if ((a = r) != null) {
      a.disconnect();
    }
    r = null;
  }
  function h(a = false, c = 1) {
    u();
    const d = e.getBoundingClientRect();
    const {
      left: p,
      top: f,
      width: S,
      height: _
    } = d;
    if (!a) {
      n();
    }
    if (!S || !_) {
      return;
    }
    const x = Sa(f);
    const w = Sa(o.clientWidth - (p + S));
    const g = Sa(o.clientHeight - (f + _));
    const b = Sa(p);
    const v = {
      rootMargin: -x + "px " + -w + "px " + -g + "px " + -b + "px",
      threshold: as(0, Fl(1, c)) || 1
    };
    let C = true;
    function T(A) {
      const M = A[0].intersectionRatio;
      if (M !== c) {
        if (!C) {
          return h();
        }
        if (M) {
          h(false, M);
        } else {
          i = setTimeout(() => {
            h(false, 1e-7);
          }, 1000);
        }
      }
      if (M === 1 && !vE(d, e.getBoundingClientRect())) {
        h();
      }
      C = false;
    }
    try {
      r = new IntersectionObserver(T, {
        ...v,
        root: o.ownerDocument
      });
    } catch {
      r = new IntersectionObserver(T, v);
    }
    r.observe(e);
  }
  h(true);
  return u;
}
function HS(e, n, r, i = {}) {
  const {
    ancestorScroll: o = true,
    ancestorResize: u = true,
    elementResize: h = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = false
  } = i;
  const d = ib(e);
  const p = o || u ? [...(d ? lu(d) : []), ...(n ? lu(n) : [])] : [];
  p.forEach(b => {
    if (o) {
      b.addEventListener("scroll", r, {
        passive: true
      });
    }
    if (u) {
      b.addEventListener("resize", r);
    }
  });
  const f = d && a ? EL(d, r) : null;
  let S = -1;
  let _ = null;
  if (h) {
    _ = new ResizeObserver(b => {
      let [m] = b;
      if (m && m.target === d && _ && n) {
        _.unobserve(n);
        cancelAnimationFrame(S);
        S = requestAnimationFrame(() => {
          var v;
          if ((v = _) != null) {
            v.observe(n);
          }
        });
      }
      r();
    });
    if (d && !c) {
      _.observe(d);
    }
    if (n) {
      _.observe(n);
    }
  }
  let x;
  let w = c ? Oa(e) : null;
  if (c) {
    g();
  }
  function g() {
    const b = Oa(e);
    if (w && !vE(w, b)) {
      r();
    }
    w = b;
    x = requestAnimationFrame(g);
  }
  r();
  return () => {
    var b;
    p.forEach(m => {
      if (o) {
        m.removeEventListener("scroll", r);
      }
      if (u) {
        m.removeEventListener("resize", r);
      }
    });
    if (f != null) {
      f();
    }
    if ((b = _) != null) {
      b.disconnect();
    }
    _ = null;
    if (c) {
      cancelAnimationFrame(x);
    }
  };
}
const RL = lL;
const TL = cL;
const kL = iL;
const AL = dL;
const ML = oL;
const OL = uL;
const DL = (e, n, r) => {
  const i = new Map();
  const o = {
    platform: gE,
    ...r
  };
  const u = {
    ...o.platform,
    _c: i
  };
  return sL(e, n, {
    ...o,
    platform: u
  });
};
var IL = typeof document !== "undefined";
function LL() {}
var Mf = IL ? E.useLayoutEffect : LL;
function Zf(e, n) {
  if (e === n) {
    return true;
  }
  if (typeof e != typeof n) {
    return false;
  }
  if (typeof e == "function" && e.toString() === n.toString()) {
    return true;
  }
  let r;
  let i;
  let o;
  if (e && n && typeof e == "object") {
    if (Array.isArray(e)) {
      r = e.length;
      if (r !== n.length) {
        return false;
      }
      for (i = r; i-- !== 0;) {
        if (!Zf(e[i], n[i])) {
          return false;
        }
      }
      return true;
    }
    o = Object.keys(e);
    r = o.length;
    if (r !== Object.keys(n).length) {
      return false;
    }
    for (i = r; i-- !== 0;) {
      if (!{}.hasOwnProperty.call(n, o[i])) {
        return false;
      }
    }
    for (i = r; i-- !== 0;) {
      const u = o[i];
      if ((u !== "_owner" || !e.$$typeof) && !Zf(e[u], n[u])) {
        return false;
      }
    }
    return true;
  }
  return e !== e && n !== n;
}
function bE(e) {
  if (typeof window === "undefined") {
    return 1;
  } else {
    return (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
  }
}
function FS(e, n) {
  const r = bE(e);
  return Math.round(n * r) / r;
}
function Dg(e) {
  const n = E.useRef(e);
  Mf(() => {
    n.current = e;
  });
  return n;
}
function PL(e = {}) {
  const {
    placement: n = "bottom",
    strategy: r = "absolute",
    middleware: i = [],
    platform: o,
    elements: {
      reference: u,
      floating: h
    } = {},
    transform: a = true,
    whileElementsMounted: c,
    open: d
  } = e;
  const [p, f] = E.useState({
    x: 0,
    y: 0,
    strategy: r,
    placement: n,
    middlewareData: {},
    isPositioned: false
  });
  const [S, _] = E.useState(i);
  if (!Zf(S, i)) {
    _(i);
  }
  const [x, w] = E.useState(null);
  const [g, b] = E.useState(null);
  const m = E.useCallback(U => {
    if (U !== A.current) {
      A.current = U;
      w(U);
    }
  }, []);
  const v = E.useCallback(U => {
    if (U !== M.current) {
      M.current = U;
      b(U);
    }
  }, []);
  const C = u || x;
  const T = h || g;
  const A = E.useRef(null);
  const M = E.useRef(null);
  const R = E.useRef(p);
  const I = c != null;
  const j = Dg(c);
  const W = Dg(o);
  const z = Dg(d);
  const N = E.useCallback(() => {
    if (!A.current || !M.current) {
      return;
    }
    const U = {
      placement: n,
      strategy: r,
      middleware: S
    };
    if (W.current) {
      U.platform = W.current;
    }
    DL(A.current, M.current, U).then(L => {
      const F = {
        ...L,
        isPositioned: z.current !== false
      };
      if (D.current && !Zf(R.current, F)) {
        R.current = F;
        cs.flushSync(() => {
          f(F);
        });
      }
    });
  }, [S, n, r, W, z]);
  Mf(() => {
    if (d === false && R.current.isPositioned) {
      R.current.isPositioned = false;
      f(U => ({
        ...U,
        isPositioned: false
      }));
    }
  }, [d]);
  const D = E.useRef(false);
  Mf(() => {
    D.current = true;
    return () => {
      D.current = false;
    };
  }, []);
  Mf(() => {
    if (C) {
      A.current = C;
    }
    if (T) {
      M.current = T;
    }
    if (C && T) {
      if (j.current) {
        return j.current(C, T, N);
      }
      N();
    }
  }, [C, T, N, j, I]);
  const $ = E.useMemo(() => ({
    reference: A,
    floating: M,
    setReference: m,
    setFloating: v
  }), [m, v]);
  const G = E.useMemo(() => ({
    reference: C,
    floating: T
  }), [C, T]);
  const q = E.useMemo(() => {
    const U = {
      position: r,
      left: 0,
      top: 0
    };
    if (!G.floating) {
      return U;
    }
    const L = FS(G.floating, p.x);
    const F = FS(G.floating, p.y);
    if (a) {
      return {
        ...U,
        transform: "translate(" + L + "px, " + F + "px)",
        ...(bE(G.floating) >= 1.5 && {
          willChange: "transform"
        })
      };
    } else {
      return {
        position: r,
        left: L,
        top: F
      };
    }
  }, [r, a, G.floating, p.x, p.y]);
  return E.useMemo(() => ({
    ...p,
    update: N,
    refs: $,
    elements: G,
    floatingStyles: q
  }), [p, N, $, G, q]);
}
const BL = (e, n) => {
  const r = RL(e);
  return {
    name: r.name,
    fn: r.fn,
    options: [e, n]
  };
};
const zL = (e, n) => {
  const r = TL(e);
  return {
    name: r.name,
    fn: r.fn,
    options: [e, n]
  };
};
const NL = (e, n) => ({
  fn: OL(e).fn,
  options: [e, n]
});
const jL = (e, n) => {
  const r = kL(e);
  return {
    name: r.name,
    fn: r.fn,
    options: [e, n]
  };
};
const HL = (e, n) => {
  const r = AL(e);
  return {
    name: r.name,
    fn: r.fn,
    options: [e, n]
  };
};
const FL = (e, n) => {
  const r = ML(e);
  return {
    name: r.name,
    fn: r.fn,
    options: [e, n]
  };
};
const Me = (e, n, r, i, o, u, ...h) => {
  if (h.length > 0) {
    throw new Error(Bt(1));
  }
  let a;
  if (e && n && r && i && o && u) {
    a = (c, d, p, f) => {
      const S = e(c, d, p, f);
      const _ = n(c, d, p, f);
      const x = r(c, d, p, f);
      const w = i(c, d, p, f);
      const g = o(c, d, p, f);
      return u(S, _, x, w, g, d, p, f);
    };
  } else if (e && n && r && i && o) {
    a = (c, d, p, f) => {
      const S = e(c, d, p, f);
      const _ = n(c, d, p, f);
      const x = r(c, d, p, f);
      const w = i(c, d, p, f);
      return o(S, _, x, w, d, p, f);
    };
  } else if (e && n && r && i) {
    a = (c, d, p, f) => {
      const S = e(c, d, p, f);
      const _ = n(c, d, p, f);
      const x = r(c, d, p, f);
      return i(S, _, x, d, p, f);
    };
  } else if (e && n && r) {
    a = (c, d, p, f) => {
      const S = e(c, d, p, f);
      const _ = n(c, d, p, f);
      return r(S, _, d, p, f);
    };
  } else if (e && n) {
    a = (c, d, p, f) => {
      const S = e(c, d, p, f);
      return n(S, d, p, f);
    };
  } else if (e) {
    a = e;
  } else {
    throw new Error("Missing arguments");
  }
  return a;
};
var Ig = {
  exports: {}
};