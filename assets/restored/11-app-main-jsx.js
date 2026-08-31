// [11-app-main-jsx] 还原自 index-liunM0pp.js 第 53927-76948 行（边界为近似值，无 sourcemap）
var $S;
function WL() {
  if (!$S) {
    $S = 1;
    Pg.exports = VL();
  }
  return Pg.exports;
}
var $L = WL();
const qL = zv(19);
const GL = qL ? XL : KL;
function Pe(e, n, r, i, o) {
  return GL(e, n, r, i, o);
}
function YL(e, n, r, i, o) {
  const u = E.useCallback(() => n(e.getSnapshot(), r, i, o), [e, n, r, i, o]);
  return ob.useSyncExternalStore(e.subscribe, u, u);
}
$5({
  before(e) {
    e.syncIndex = 0;
    if (!e.didInitialize) {
      e.syncTick = 1;
      e.syncHooks = [];
      e.didChangeStore = true;
      e.getSnapshot = () => {
        let n = false;
        for (let r = 0; r < e.syncHooks.length; r += 1) {
          const i = e.syncHooks[r];
          const o = i.selector(i.store.state, i.a1, i.a2, i.a3);
          if (i.didChange || !Object.is(i.value, o)) {
            n = true;
            i.value = o;
            i.didChange = false;
          }
        }
        if (n) {
          e.syncTick += 1;
        }
        return e.syncTick;
      };
    }
  },
  after(e) {
    if (e.syncHooks.length > 0) {
      if (e.didChangeStore) {
        e.didChangeStore = false;
        e.subscribe = n => {
          const r = new Set();
          for (const o of e.syncHooks) {
            r.add(o.store);
          }
          const i = [];
          for (const o of r) {
            i.push(o.subscribe(n));
          }
          return () => {
            for (const o of i) {
              o();
            }
          };
        };
      }
      ob.useSyncExternalStore(e.subscribe, e.getSnapshot, e.getSnapshot);
    }
  }
});
function XL(e, n, r, i, o) {
  const u = W5();
  if (!u) {
    return YL(e, n, r, i, o);
  }
  const h = u.syncIndex;
  u.syncIndex += 1;
  let a;
  if (u.didInitialize) {
    a = u.syncHooks[h];
    if (a.store !== e || a.selector !== n || !Object.is(a.a1, r) || !Object.is(a.a2, i) || !Object.is(a.a3, o)) {
      if (a.store !== e) {
        u.didChangeStore = true;
      }
      a.store = e;
      a.selector = n;
      a.a1 = r;
      a.a2 = i;
      a.a3 = o;
      a.didChange = true;
    }
  } else {
    a = {
      store: e,
      selector: n,
      a1: r,
      a2: i,
      a3: o,
      value: n(e.getSnapshot(), r, i, o),
      didChange: false
    };
    u.syncHooks.push(a);
  }
  return a.value;
}
function KL(e, n, r, i, o) {
  return $L.useSyncExternalStoreWithSelector(e.subscribe, e.getSnapshot, e.getSnapshot, u => n(u, r, i, o));
}
class ab {
  constructor(n) {
    tt(this, "subscribe", n => {
      this.listeners.add(n);
      return () => {
        this.listeners.delete(n);
      };
    });
    tt(this, "getSnapshot", () => this.state);
    this.state = n;
    this.listeners = new Set();
    this.updateTick = 0;
  }
  setState(n) {
    if (this.state === n) {
      return;
    }
    this.state = n;
    this.updateTick += 1;
    const r = this.updateTick;
    for (const i of this.listeners) {
      if (r !== this.updateTick) {
        return;
      }
      i(n);
    }
  }
  update(n) {
    for (const r in n) {
      if (!Object.is(this.state[r], n[r])) {
        this.setState({
          ...this.state,
          ...n
        });
        return;
      }
    }
  }
  set(n, r) {
    if (!Object.is(this.state[n], r)) {
      this.setState({
        ...this.state,
        [n]: r
      });
    }
  }
  notifyAll() {
    const n = {
      ...this.state
    };
    this.setState(n);
  }
  use(n, r, i, o) {
    return Pe(this, n, r, i, o);
  }
}
class Yl extends ab {
  constructor(n, r = {}, i) {
    super(n);
    this.context = r;
    this.selectors = i;
  }
  useSyncedValue(n, r) {
    E.useDebugValue(n);
    const i = this;
    Fe(() => {
      if (i.state[n] !== r) {
        i.set(n, r);
      }
    }, [i, n, r]);
  }
  useSyncedValueWithCleanup(n, r) {
    const i = this;
    Fe(() => {
      if (i.state[n] !== r) {
        i.set(n, r);
      }
      return () => {
        i.set(n, undefined);
      };
    }, [i, n, r]);
  }
  useSyncedValues(n) {
    const r = this;
    const i = Object.values(n);
    Fe(() => {
      r.update(n);
    }, [r, ...i]);
  }
  useControlledProp(n, r) {
    E.useDebugValue(n);
    const i = this;
    const o = r !== undefined;
    Fe(() => {
      if (o && !Object.is(i.state[n], r)) {
        i.setState({
          ...i.state,
          [n]: r
        });
      }
    }, [i, n, r, o]);
  }
  select(n, r, i, o) {
    const u = this.selectors[n];
    return u(this.state, r, i, o);
  }
  useState(n, r, i, o) {
    E.useDebugValue(n);
    return Pe(this, this.selectors[n], r, i, o);
  }
  useContextCallback(n, r) {
    E.useDebugValue(n);
    const i = je(r ?? Yt);
    this.context[n] = i;
  }
  useStateSetter(n) {
    const r = E.useRef(undefined);
    if (r.current === undefined) {
      r.current = i => {
        this.set(n, i);
      };
    }
    return r.current;
  }
  observe(n, r) {
    let i;
    if (typeof n == "function") {
      i = n;
    } else {
      i = this.selectors[n];
    }
    let o = i(this.state);
    r(o, o, this);
    return this.subscribe(u => {
      const h = i(u);
      if (!Object.is(o, h)) {
        const a = o;
        o = h;
        r(h, a, this);
      }
    });
  }
}
const ZL = {
  open: Me(e => e.open),
  transitionStatus: Me(e => e.transitionStatus),
  domReferenceElement: Me(e => e.domReferenceElement),
  referenceElement: Me(e => e.positionReference ?? e.referenceElement),
  floatingElement: Me(e => e.floatingElement),
  floatingId: Me(e => e.floatingId)
};
class wh extends Yl {
  constructor(r) {
    const {
      syncOnly: i,
      nested: o,
      onOpenChange: u,
      triggerElements: h,
      ...a
    } = r;
    super({
      ...a,
      positionReference: a.referenceElement,
      domReferenceElement: a.referenceElement
    }, {
      onOpenChange: u,
      dataRef: {
        current: {}
      },
      events: iE(),
      nested: o,
      triggerElements: h
    }, ZL);
    tt(this, "syncOpenEvent", (r, i) => {
      if (!r || !this.state.open || i != null && J5(i)) {
        this.context.dataRef.current.openEvent = r ? i : undefined;
      }
    });
    tt(this, "dispatchOpenChange", (r, i) => {
      this.syncOpenEvent(r, i.event);
      const o = {
        open: r,
        reason: i.reason,
        nativeEvent: i.event,
        nested: this.context.nested,
        triggerElement: i.trigger
      };
      this.context.events.emit("openchange", o);
    });
    tt(this, "setOpen", (r, i) => {
      var o;
      var u;
      var h;
      var a;
      if (this.syncOnly) {
        if ((u = (o = this.context).onOpenChange) != null) {
          u.call(o, r, i);
        }
        return;
      }
      this.dispatchOpenChange(r, i);
      if ((a = (h = this.context).onOpenChange) != null) {
        a.call(h, r, i);
      }
    });
    this.syncOnly = i;
  }
}
function _E(e) {
  const {
    popupStore: n,
    treatPopupAsFloatingElement: r = false,
    floatingRootContext: i,
    floatingId: o,
    nested: u,
    onOpenChange: h
  } = e;
  const a = n.useState("open");
  const c = n.useState("activeTriggerElement");
  const d = n.useState(r ? "popupElement" : "positionerElement");
  const p = n.context.triggerElements;
  const f = h;
  const S = E.useRef(null);
  if (i === undefined && S.current === null) {
    S.current = new wh({
      open: a,
      transitionStatus: undefined,
      referenceElement: c,
      floatingElement: d,
      triggerElements: p,
      onOpenChange: f,
      floatingId: o,
      syncOnly: true,
      nested: u
    });
  }
  const _ = i ?? S.current;
  n.useSyncedValue("floatingId", o);
  Fe(() => {
    const x = {
      open: a,
      floatingId: o,
      referenceElement: c,
      floatingElement: d
    };
    if (Mt(c)) {
      x.domReferenceElement = c;
    }
    if (_.state.positionReference === _.state.referenceElement) {
      x.positionReference = c;
    }
    _.update(x);
  }, [a, o, c, d, _]);
  _.context.onOpenChange = f;
  _.context.nested = u;
  return _;
}
function zo(e, n = false, r = false) {
  const [i, o] = E.useState(e && n ? "idle" : undefined);
  const [u, h] = E.useState(e);
  if (e && !u) {
    h(true);
    o("starting");
  }
  if (!e && u && i !== "ending" && !r) {
    o("ending");
  }
  if (!e && !u && i === "ending") {
    o(undefined);
  }
  Fe(() => {
    if (!e && u && i !== "ending" && r) {
      const a = ei.request(() => {
        o("ending");
      });
      return () => {
        ei.cancel(a);
      };
    }
  }, [e, u, i, r]);
  Fe(() => {
    if (!e || n) {
      return;
    }
    const a = ei.request(() => {
      o(undefined);
    });
    return () => {
      ei.cancel(a);
    };
  }, [n, e]);
  Fe(() => {
    if (!e || !n) {
      return;
    }
    if (e && u && i !== "idle") {
      o("starting");
    }
    const a = ei.request(() => {
      o("idle");
    });
    return () => {
      ei.cancel(a);
    };
  }, [n, e, u, i]);
  return {
    mounted: u,
    setMounted: h,
    transitionStatus: i
  };
}
let hu = function (e) {
  e.startingStyle = "data-starting-style";
  e.endingStyle = "data-ending-style";
  return e;
}({});
const QL = {
  [hu.startingStyle]: ""
};
const JL = {
  [hu.endingStyle]: ""
};
const xs = {
  transitionStatus(e) {
    if (e === "starting") {
      return QL;
    } else if (e === "ending") {
      return JL;
    } else {
      return null;
    }
  }
};
function Tu(e, n = false, r = true) {
  const i = Vi();
  return je((o, u = null) => {
    i.cancel();
    const h = Di(e);
    if (h == null) {
      return;
    }
    const a = h;
    const c = () => {
      cs.flushSync(o);
    };
    if (typeof a.getAnimations != "function" || globalThis.BASE_UI_ANIMATIONS_DISABLED) {
      o();
      return;
    }
    function d() {
      Promise.all(a.getAnimations().map(p => p.finished)).then(() => {
        if (u == null || !u.aborted) {
          c();
        }
      }).catch(() => {
        if (r) {
          if (u == null || !u.aborted) {
            c();
          }
          return;
        }
        const p = a.getAnimations();
        if ((u == null || !u.aborted) && p.length > 0 && p.some(f => f.pending || f.playState !== "finished")) {
          d();
        }
      });
    }
    if (n) {
      const p = hu.startingStyle;
      if (!a.hasAttribute(p)) {
        i.request(d);
        return;
      }
      const f = new MutationObserver(() => {
        if (!a.hasAttribute(p)) {
          f.disconnect();
          d();
        }
      });
      f.observe(a, {
        attributes: true,
        attributeFilter: [p]
      });
      if (u != null) {
        u.addEventListener("abort", () => f.disconnect(), {
          once: true
        });
      }
      return;
    }
    i.request(d);
  });
}
function qr(e) {
  const {
    enabled: n = true,
    open: r,
    ref: i,
    onComplete: o
  } = e;
  const u = je(o);
  const h = Tu(i, r, false);
  E.useEffect(() => {
    if (!n) {
      return;
    }
    const a = new AbortController();
    h(u, a.signal);
    return () => {
      a.abort();
    };
  }, [n, r, u, h]);
}
const No = {
  tabIndex: -1,
  [fv]: ""
};
function lb(e, n, r = false) {
  const i = $i();
  const o = qi() != null;
  const u = E.useRef(null);
  if (e === undefined && u.current === null) {
    u.current = n(i, o);
  }
  const h = e ?? u.current;
  _E({
    popupStore: h,
    treatPopupAsFloatingElement: r,
    floatingRootContext: h.state.floatingRootContext,
    floatingId: i,
    nested: o,
    onOpenChange: h.setOpen
  });
  return {
    store: h,
    internalStore: u.current
  };
}
function wE(e, n) {
  const r = E.useRef(null);
  const i = E.useRef(null);
  return E.useCallback(o => {
    if (e === undefined) {
      return;
    }
    let u = false;
    if (r.current !== null) {
      const h = r.current;
      const a = i.current;
      const c = n.context.triggerElements.getById(h);
      if (a && c === a) {
        n.context.triggerElements.delete(h);
        u = true;
      }
      r.current = null;
      i.current = null;
    }
    if (o !== null) {
      r.current = e;
      i.current = o;
      n.context.triggerElements.add(e, o);
      u = true;
    }
    if (u) {
      const h = n.context.triggerElements.size;
      if (n.select("open") && n.state.triggerCount !== h) {
        n.set("triggerCount", h);
      }
    }
  }, [n, e]);
}
function cb(e, n, r) {
  const i = (r == null ? undefined : r.id) ?? null;
  if (i || n) {
    e.activeTriggerId = i;
    e.activeTriggerElement = r ?? null;
  }
}
function ub(e, n, r, i) {
  const o = r.useState("isMountedByTrigger", e);
  const u = wE(e, r);
  const h = je(a => {
    u(a);
    if (!a) {
      return;
    }
    const c = r.select("open");
    const d = r.select("activeTriggerId");
    if (d === e) {
      r.update({
        activeTriggerElement: a,
        ...(c ? i : null)
      });
      return;
    }
    if (d == null && c) {
      r.update({
        activeTriggerId: e,
        activeTriggerElement: a,
        ...i
      });
    }
  });
  Fe(() => {
    if (o) {
      r.update({
        activeTriggerElement: n.current,
        ...i
      });
    }
  }, [o, r, n, ...Object.values(i)]);
  return {
    registerTrigger: h,
    isMountedByThisTrigger: o
  };
}
function Sh(e) {
  const n = e.useState("open");
  const r = e.useState("triggerCount");
  Fe(() => {
    if (!n) {
      if (e.state.triggerCount !== 0) {
        e.set("triggerCount", 0);
      }
      return;
    }
    const i = e.context.triggerElements.size;
    const o = {};
    if (e.state.triggerCount !== i) {
      o.triggerCount = i;
    }
    if (!e.select("activeTriggerId") && i === 1) {
      const u = e.context.triggerElements.entries().next();
      if (!u.done) {
        const [h, a] = u.value;
        o.activeTriggerId = h;
        o.activeTriggerElement = a;
      }
    }
    if (o.triggerCount !== undefined || o.activeTriggerId !== undefined) {
      e.update(o);
    }
  }, [n, e, r]);
}
function xh(e, n, r) {
  const {
    mounted: i,
    setMounted: o,
    transitionStatus: u
  } = zo(e);
  n.useSyncedValues({
    mounted: i,
    transitionStatus: u
  });
  const h = je(() => {
    var c;
    var d;
    o(false);
    n.update({
      activeTriggerId: null,
      activeTriggerElement: null,
      mounted: false,
      preventUnmountingOnClose: false
    });
    if (r != null) {
      r();
    }
    if ((d = (c = n.context).onOpenChangeComplete) != null) {
      d.call(c, false);
    }
  });
  const a = n.useState("preventUnmountingOnClose");
  qr({
    enabled: i && !e && !a,
    open: e,
    ref: n.context.popupRef,
    onComplete() {
      if (!e) {
        h();
      }
    }
  });
  return {
    forceUnmount: h,
    transitionStatus: u
  };
}
function Ch(e, n) {
  e.useSyncedValues(n);
  Fe(() => () => {
    e.update({
      activeTriggerProps: Xt,
      inactiveTriggerProps: Xt,
      popupProps: Xt
    });
  }, [e]);
}
function SE(e, n) {
  Fe(() => {
    if (!n && e.state.openMethod !== null) {
      e.set("openMethod", null);
    }
  }, [n, e]);
  Fe(() => () => {
    if (e.state.openMethod !== null) {
      e.set("openMethod", null);
    }
  }, [e]);
}
class Xl {
  constructor() {
    this.elementsSet = new Set();
    this.idMap = new Map();
  }
  add(n, r) {
    const i = this.idMap.get(n);
    if (i !== r) {
      if (i !== undefined) {
        this.elementsSet.delete(i);
      }
      this.elementsSet.add(r);
      this.idMap.set(n, r);
    }
  }
  delete(n) {
    const r = this.idMap.get(n);
    if (r) {
      this.elementsSet.delete(r);
      this.idMap.delete(n);
    }
  }
  hasElement(n) {
    return this.elementsSet.has(n);
  }
  hasMatchingElement(n) {
    for (const r of this.elementsSet) {
      if (n(r)) {
        return true;
      }
    }
    return false;
  }
  getById(n) {
    return this.idMap.get(n);
  }
  entries() {
    return this.idMap.entries();
  }
  elements() {
    return this.elementsSet.values();
  }
  get size() {
    return this.idMap.size;
  }
}
function eP() {
  return new wh({
    open: false,
    transitionStatus: undefined,
    floatingElement: null,
    referenceElement: null,
    triggerElements: new Xl(),
    floatingId: undefined,
    syncOnly: false,
    nested: false,
    onOpenChange: undefined
  });
}
function Eh() {
  return {
    open: false,
    openProp: undefined,
    mounted: false,
    transitionStatus: undefined,
    floatingRootContext: eP(),
    floatingId: undefined,
    triggerCount: 0,
    preventUnmountingOnClose: false,
    payload: undefined,
    activeTriggerId: null,
    activeTriggerElement: null,
    triggerIdProp: undefined,
    popupElement: null,
    positionerElement: null,
    activeTriggerProps: Xt,
    inactiveTriggerProps: Xt,
    popupProps: Xt
  };
}
function db(e, n, r = false) {
  return new wh({
    open: false,
    transitionStatus: undefined,
    floatingElement: null,
    referenceElement: null,
    triggerElements: e,
    floatingId: n,
    syncOnly: true,
    nested: r,
    onOpenChange: undefined
  });
}
const ru = Me(e => e.triggerIdProp ?? e.activeTriggerId);
const fb = Me(e => e.openProp ?? e.open);
const qS = Me(e => {
  var r;
  return (((r = e.popupElement) == null ? undefined : r.id) ?? e.floatingId) || undefined;
});
function xE(e, n) {
  return n !== undefined && fb(e) && ru(e) === n;
}
function tP(e, n) {
  if (xE(e, n)) {
    return true;
  } else {
    return n !== undefined && fb(e) && ru(e) == null && e.triggerCount === 1;
  }
}
const Rh = {
  open: fb,
  mounted: Me(e => e.mounted),
  transitionStatus: Me(e => e.transitionStatus),
  floatingRootContext: Me(e => e.floatingRootContext),
  triggerCount: Me(e => e.triggerCount),
  preventUnmountingOnClose: Me(e => e.preventUnmountingOnClose),
  payload: Me(e => e.payload),
  activeTriggerId: ru,
  activeTriggerElement: Me(e => e.mounted ? e.activeTriggerElement : null),
  popupId: qS,
  isTriggerActive: Me((e, n) => n !== undefined && ru(e) === n),
  isOpenedByTrigger: Me((e, n) => xE(e, n)),
  isMountedByTrigger: Me((e, n) => n !== undefined && ru(e) === n && e.mounted),
  triggerProps: Me((e, n) => n ? e.activeTriggerProps : e.inactiveTriggerProps),
  triggerPopupId: Me((e, n) => tP(e, n) ? qS(e) : undefined),
  popupProps: Me(e => e.popupProps),
  popupElement: Me(e => e.popupElement),
  positionerElement: Me(e => e.positionerElement)
};
function hb(e) {
  const {
    open: n = false,
    onOpenChange: r,
    elements: i = {}
  } = e;
  const o = $i();
  const u = qi() != null;
  const h = sr(() => new wh({
    open: n,
    transitionStatus: undefined,
    onOpenChange: r,
    referenceElement: i.reference ?? null,
    floatingElement: i.floating ?? null,
    triggerElements: new Xl(),
    floatingId: o,
    syncOnly: false,
    nested: u
  })).current;
  Fe(() => {
    const a = {
      open: n,
      floatingId: o
    };
    if (i.reference !== undefined) {
      a.referenceElement = i.reference;
      a.domReferenceElement = Mt(i.reference) ? i.reference : null;
    }
    if (i.floating !== undefined) {
      a.floatingElement = i.floating;
    }
    h.update(a);
  }, [n, o, i.reference, i.floating, h]);
  h.context.onOpenChange = r;
  h.context.nested = u;
  return h;
}
function nP(e = {}) {
  const {
    nodeId: n,
    externalTree: r
  } = e;
  const i = hb(e);
  const o = e.rootContext || i;
  const u = o.useState("referenceElement");
  const h = o.useState("floatingElement");
  const a = o.useState("domReferenceElement");
  const c = o.useState("open");
  const d = o.useState("floatingId");
  const [p, f] = E.useState(null);
  const [S, _] = E.useState(undefined);
  const [x, w] = E.useState(undefined);
  const g = E.useRef(null);
  const b = Bo(r);
  const m = E.useMemo(() => ({
    reference: u,
    floating: h,
    domReference: a
  }), [u, h, a]);
  const v = PL({
    ...e,
    elements: {
      ...m,
      ...(p && {
        reference: p
      })
    }
  });
  const C = Mt(S) ? S : null;
  const T = x === undefined ? o.state.floatingElement : x;
  o.useSyncedValue("referenceElement", S ?? null);
  o.useSyncedValue("domReferenceElement", S === undefined ? a : C);
  o.useSyncedValue("floatingElement", T);
  const A = E.useCallback(z => {
    const N = Mt(z) ? {
      getBoundingClientRect: () => z.getBoundingClientRect(),
      getClientRects: () => z.getClientRects(),
      contextElement: z
    } : z;
    f(N);
    v.refs.setReference(N);
  }, [v.refs]);
  const M = E.useCallback(z => {
    if (Mt(z) || z === null) {
      g.current = z;
      _(z);
    }
    if (Mt(v.refs.reference.current) || v.refs.reference.current === null || z !== null && !Mt(z)) {
      v.refs.setReference(z);
    }
  }, [v.refs, _]);
  const R = E.useCallback(z => {
    w(z);
    v.refs.setFloating(z);
  }, [v.refs]);
  const I = E.useMemo(() => ({
    ...v.refs,
    setReference: M,
    setFloating: R,
    setPositionReference: A,
    domReference: g
  }), [v.refs, M, R, A]);
  const j = E.useMemo(() => ({
    ...v.elements,
    domReference: a
  }), [v.elements, a]);
  const W = E.useMemo(() => ({
    ...v,
    dataRef: o.context.dataRef,
    open: c,
    onOpenChange: o.setOpen,
    events: o.context.events,
    floatingId: d,
    refs: I,
    elements: j,
    nodeId: n,
    rootStore: o
  }), [v, I, j, n, o, c, d]);
  Fe(() => {
    if (a) {
      g.current = a;
    }
  }, [a]);
  Fe(() => {
    o.context.dataRef.current.floatingContext = W;
    const z = b == null ? undefined : b.nodesRef.current.find(N => N.id === n);
    if (z) {
      z.context = W;
    }
  });
  return E.useMemo(() => ({
    ...v,
    context: W,
    refs: I,
    elements: j,
    rootStore: o
  }), [v, I, j, W, o]);
}
const zg = RC && EC;
function CE(e, n = {}) {
  const {
    enabled: r = true,
    delay: i
  } = n;
  const o = "rootStore" in e ? e.rootStore : e;
  const {
    events: u,
    dataRef: h
  } = o.context;
  const a = E.useRef(false);
  const c = E.useRef(null);
  const d = E.useRef(true);
  const p = xn();
  E.useEffect(() => {
    const S = o.select("domReferenceElement");
    if (!r) {
      return;
    }
    const _ = fn(S);
    function x() {
      const b = o.select("domReferenceElement");
      if (!o.select("open") && un(b) && b === Hn(yt(b))) {
        a.current = true;
      }
    }
    function w() {
      d.current = true;
    }
    function g() {
      d.current = false;
    }
    return js(Tt(_, "blur", x), zg && Tt(_, "keydown", w, true), zg && Tt(_, "pointerdown", g, true));
  }, [o, r]);
  E.useEffect(() => {
    if (!r) {
      return;
    }
    function S(_) {
      if (_.reason === Fi || _.reason === $l) {
        const x = o.select("domReferenceElement");
        if (Mt(x)) {
          c.current = x;
          a.current = true;
        }
      }
    }
    u.on("openchange", S);
    return () => {
      u.off("openchange", S);
    };
  }, [u, r, o]);
  const f = E.useMemo(() => {
    function S() {
      a.current = false;
      c.current = null;
    }
    return {
      onMouseLeave() {
        S();
      },
      onFocus(_) {
        const x = _.currentTarget;
        if (a.current) {
          if (c.current === x) {
            return;
          }
          S();
        }
        const w = dn(_.nativeEvent);
        if (Mt(w)) {
          if (zg && !_.relatedTarget) {
            if (!d.current && !ph(w)) {
              return;
            }
          } else if (!cu(w)) {
            return;
          }
        }
        const g = qf(_.relatedTarget, o.context.triggerElements);
        const {
          nativeEvent: b,
          currentTarget: m
        } = _;
        const v = typeof i == "function" ? i() : i;
        if (o.select("open") && g || v === 0 || v === undefined) {
          o.setOpen(true, $e(Ll, b, m));
          return;
        }
        p.start(v, () => {
          if (!a.current) {
            o.setOpen(true, $e(Ll, b, m));
          }
        });
      },
      onBlur(_) {
        S();
        const x = _.relatedTarget;
        const w = _.nativeEvent;
        const g = Mt(x) && x.hasAttribute(fu("focus-guard")) && x.getAttribute("data-type") === "outside";
        p.start(0, () => {
          var C;
          const b = o.select("domReferenceElement");
          const m = Hn(yt(b));
          if ((!!x || m !== b) && !Xe((C = h.current.floatingContext) == null ? undefined : C.refs.floating.current, m) && !Xe(b, m) && !g && !qf(x ?? m, o.context.triggerElements)) {
            o.setOpen(false, $e(Ll, w));
          }
        });
      }
    };
  }, [h, i, o, p]);
  return E.useMemo(() => r ? {
    reference: f,
    trigger: f
  } : {}, [r, f]);
}
class pb {
  constructor() {
    tt(this, "dispose", () => {
      this.openChangeTimeout.clear();
      this.restTimeout.clear();
    });
    tt(this, "disposeEffect", () => this.dispose);
    this.pointerType = undefined;
    this.interactedInside = false;
    this.handler = undefined;
    this.blockMouseMove = true;
    this.performedPointerEventsMutation = false;
    this.pointerEventsScopeElement = null;
    this.pointerEventsReferenceElement = null;
    this.pointerEventsFloatingElement = null;
    this.restTimeoutPending = false;
    this.openChangeTimeout = new $r();
    this.restTimeout = new $r();
    this.handleCloseOptions = undefined;
  }
  static create() {
    return new pb();
  }
}
const Qf = new WeakMap();
function Jf(e) {
  var r;
  var i;
  var o;
  if (!e.performedPointerEventsMutation) {
    return;
  }
  const n = e.pointerEventsScopeElement;
  if (n && Qf.get(n) === e) {
    if ((r = e.pointerEventsScopeElement) != null) {
      r.style.removeProperty("pointer-events");
    }
    if ((i = e.pointerEventsReferenceElement) != null) {
      i.style.removeProperty("pointer-events");
    }
    if ((o = e.pointerEventsFloatingElement) != null) {
      o.style.removeProperty("pointer-events");
    }
    Qf.delete(n);
  }
  e.performedPointerEventsMutation = false;
  e.pointerEventsScopeElement = null;
  e.pointerEventsReferenceElement = null;
  e.pointerEventsFloatingElement = null;
}
function EE(e, n) {
  const {
    scopeElement: r,
    referenceElement: i,
    floatingElement: o
  } = n;
  const u = Qf.get(r);
  if (u && u !== e) {
    Jf(u);
  }
  Jf(e);
  e.performedPointerEventsMutation = true;
  e.pointerEventsScopeElement = r;
  e.pointerEventsReferenceElement = i;
  e.pointerEventsFloatingElement = o;
  Qf.set(r, e);
  r.style.pointerEvents = "none";
  i.style.pointerEvents = "auto";
  o.style.pointerEvents = "auto";
}
function mb(e) {
  const n = e.context.dataRef.current;
  const r = sr(() => n.hoverInteractionState ?? pb.create()).current;
  n.hoverInteractionState ||= r;
  lh(n.hoverInteractionState.disposeEffect);
  return n.hoverInteractionState;
}
function gb(e, n = {}) {
  const {
    enabled: r = true,
    closeDelay: i = 0,
    nodeId: o
  } = n;
  const u = "rootStore" in e ? e.rootStore : e;
  const h = u.useState("open");
  const a = u.useState("floatingElement");
  const c = u.useState("domReferenceElement");
  const {
    dataRef: d
  } = u.context;
  const p = Bo();
  const f = qi();
  const S = mb(u);
  const _ = xn();
  const x = je(() => {
    var b;
    return DC((b = d.current.openEvent) == null ? undefined : b.type, S.interactedInside);
  });
  const w = je(() => {
    var b;
    return o3((b = d.current.openEvent) == null ? undefined : b.type);
  });
  const g = je(() => {
    Jf(S);
  });
  Fe(() => {
    if (!h) {
      S.pointerType = undefined;
      S.restTimeoutPending = false;
      S.interactedInside = false;
      g();
    }
  }, [h, S, g]);
  E.useEffect(() => g, [g]);
  Fe(() => {
    var b;
    var m;
    var v;
    var C;
    var T;
    if (r && h && (b = S.handleCloseOptions) != null && b.blockPointerEvents && w() && Mt(c) && a) {
      const A = c;
      const M = a;
      const R = yt(a);
      const I = (v = (m = p == null ? undefined : p.nodesRef.current.find(N => N.id === f)) == null ? undefined : m.context) == null ? undefined : v.elements.floating;
      if (I) {
        I.style.pointerEvents = "";
      }
      const j = S.pointerEventsScopeElement !== M ? S.pointerEventsScopeElement : null;
      const W = I !== M ? I : null;
      const z = ((T = (C = S.handleCloseOptions) == null ? undefined : C.getScope) == null ? undefined : T.call(C)) ?? j ?? W ?? A.closest("[data-rootownerid]") ?? R.body;
      EE(S, {
        scopeElement: z,
        referenceElement: A,
        floatingElement: M
      });
      return () => {
        g();
      };
    }
  }, [r, h, c, a, S, w, p, f, g]);
  E.useEffect(() => {
    if (!r) {
      return;
    }
    function b() {
      return !!p && !!f && !!(Oo(p.nodesRef.current, f).length > 0);
    }
    function m(R) {
      const I = Yf(i, "close", S.pointerType);
      const j = () => {
        u.setOpen(false, $e(In, R));
        if (p != null) {
          p.events.emit("floating.closed", R);
        }
      };
      if (I) {
        S.openChangeTimeout.start(I, j);
      } else {
        S.openChangeTimeout.clear();
        j();
      }
    }
    function v(R) {
      const I = dn(R);
      if (!OC(I)) {
        S.interactedInside = false;
        return;
      }
      S.interactedInside = (I == null ? undefined : I.closest("[aria-haspopup]")) != null;
    }
    function C() {
      S.openChangeTimeout.clear();
      _.clear();
      if (p != null) {
        p.events.off("floating.closed", A);
      }
      g();
    }
    function T(R) {
      var z;
      if (b() && p) {
        p.events.on("floating.closed", A);
        return;
      }
      if (qf(R.relatedTarget, u.context.triggerElements)) {
        return;
      }
      const I = ((z = d.current.floatingContext) == null ? undefined : z.nodeId) ?? o;
      const j = R.relatedTarget;
      if (!p || !I || !Mt(j) || !Oo(p.nodesRef.current, I, false).some(N => {
        var D;
        return Xe((D = N.context) == null ? undefined : D.elements.floating, j);
      })) {
        if (S.handler) {
          S.handler(R);
          return;
        }
        g();
        if (!x()) {
          m(R);
        }
      }
    }
    function A(R) {
      if (!!p && !!f && !b()) {
        _.start(0, () => {
          p.events.off("floating.closed", A);
          u.setOpen(false, $e(In, R));
          p.events.emit("floating.closed", R);
        });
      }
    }
    const M = a;
    return js(M && Tt(M, "mouseenter", C), M && Tt(M, "mouseleave", T), M && Tt(M, "pointerdown", v, true), () => {
      if (p != null) {
        p.events.off("floating.closed", A);
      }
    });
  }, [r, a, u, d, i, o, x, g, S, p, f, _]);
}
const rP = {
  current: null
};
function Th(e, n = {}) {
  var $;
  const {
    enabled: r = true,
    delay: i = 0,
    handleClose: o = null,
    mouseOnly: u = false,
    restMs: h = 0,
    move: a = true,
    triggerElementRef: c = rP,
    externalTree: d,
    isActiveTrigger: p = true,
    getHandleCloseContext: f,
    isClosing: S,
    shouldOpen: _
  } = n;
  const x = "rootStore" in e ? e.rootStore : e;
  const {
    dataRef: w,
    events: g
  } = x.context;
  const b = Bo(d);
  const m = mb(x);
  const v = E.useRef(false);
  const C = On(o);
  const T = On(i);
  const A = On(h);
  const M = On(r);
  const R = On(_);
  const I = On(S);
  const j = je(() => {
    var G;
    return DC((G = w.current.openEvent) == null ? undefined : G.type, m.interactedInside);
  });
  const W = je(() => {
    var G;
    return ((G = R.current) == null ? undefined : G.call(R)) !== false;
  });
  const z = je((G, q, U) => {
    const L = x.context.triggerElements;
    if (L.hasElement(q)) {
      return !G || !Xe(G, q);
    }
    if (!Mt(U)) {
      return false;
    }
    const F = U;
    return L.hasMatchingElement(P => Xe(P, F)) && (!G || !Xe(G, F));
  });
  const N = je(() => {
    if (!m.handler) {
      return;
    }
    yt(x.select("domReferenceElement")).removeEventListener("mousemove", m.handler);
    m.handler = undefined;
  });
  const D = je(() => {
    Jf(m);
  });
  if (p) {
    m.handleCloseOptions = ($ = C.current) == null ? undefined : $.__options;
  }
  E.useEffect(() => N, [N]);
  E.useEffect(() => {
    if (!r) {
      return;
    }
    function G(q) {
      if (q.open) {
        v.current = false;
      } else {
        v.current = q.reason === In;
        N();
        m.openChangeTimeout.clear();
        m.restTimeout.clear();
        m.blockMouseMove = true;
        m.restTimeoutPending = false;
      }
    }
    g.on("openchange", G);
    return () => {
      g.off("openchange", G);
    };
  }, [r, g, m, N]);
  E.useEffect(() => {
    if (!r) {
      return;
    }
    function G(F, P = true) {
      const V = Yf(T.current, "close", m.pointerType);
      if (V) {
        m.openChangeTimeout.start(V, () => {
          x.setOpen(false, $e(In, F));
          if (b != null) {
            b.events.emit("floating.closed", F);
          }
        });
      } else if (P) {
        m.openChangeTimeout.clear();
        x.setOpen(false, $e(In, F));
        if (b != null) {
          b.events.emit("floating.closed", F);
        }
      }
    }
    const q = c.current ?? (p ? x.select("domReferenceElement") : null);
    if (!Mt(q)) {
      return;
    }
    function U(F) {
      var ae;
      m.openChangeTimeout.clear();
      m.blockMouseMove = false;
      if (u && !Aa(m.pointerType)) {
        return;
      }
      const P = bS(A.current);
      const V = Yf(T.current, "open", m.pointerType);
      const Z = dn(F);
      const J = F.currentTarget ?? null;
      const ne = x.select("domReferenceElement");
      let ue = J;
      if (Mt(Z) && !x.context.triggerElements.hasElement(Z)) {
        for (const oe of x.context.triggerElements.elements()) {
          if (Xe(oe, Z)) {
            ue = oe;
            break;
          }
        }
      }
      if (Mt(J) && Mt(ne) && !x.context.triggerElements.hasElement(J) && Xe(J, ne)) {
        ue = ne;
      }
      const ee = ue == null ? false : z(ne, ue, Z);
      const Y = x.select("open");
      const re = ((ae = I.current) == null ? undefined : ae.call(I)) ?? x.select("transitionStatus") === "ending";
      const ce = !Y && re && v.current;
      const ge = !ee && Mt(ue) && Mt(ne) && Xe(ne, ue) && ce;
      const de = P > 0 && !V;
      const me = ee && (Y || ce) || ge;
      const H = !Y || ee;
      if (me) {
        if (W()) {
          x.setOpen(true, $e(In, F, ue));
        }
        return;
      }
      if (!de) {
        if (V) {
          m.openChangeTimeout.start(V, () => {
            if (H && W()) {
              x.setOpen(true, $e(In, F, ue));
            }
          });
        } else if (H && W()) {
          x.setOpen(true, $e(In, F, ue));
        }
      }
    }
    function L(F) {
      if (j()) {
        D();
        return;
      }
      N();
      const P = x.select("domReferenceElement");
      const V = yt(P);
      m.restTimeout.clear();
      m.restTimeoutPending = false;
      const Z = w.current.floatingContext ?? (f == null ? undefined : f());
      if (qf(F.relatedTarget, x.context.triggerElements)) {
        return;
      }
      if (C.current && Z) {
        if (!x.select("open")) {
          m.openChangeTimeout.clear();
        }
        const ne = c.current;
        m.handler = C.current({
          ...Z,
          tree: b,
          x: F.clientX,
          y: F.clientY,
          onClose() {
            D();
            N();
            if (M.current && !j() && ne === x.select("domReferenceElement")) {
              G(F, true);
            }
          }
        });
        V.addEventListener("mousemove", m.handler);
        m.handler(F);
        return;
      }
      if (m.pointerType === "touch" ? !Xe(x.select("floatingElement"), F.relatedTarget) : true) {
        G(F);
      }
    }
    if (a) {
      return js(Tt(q, "mousemove", U, {
        once: true
      }), Tt(q, "mouseenter", U), Tt(q, "mouseleave", L));
    } else {
      return js(Tt(q, "mouseenter", U), Tt(q, "mouseleave", L));
    }
  }, [N, D, w, T, x, r, C, m, p, z, j, u, a, A, c, b, M, f, I, W]);
  return E.useMemo(() => {
    if (!r) {
      return;
    }
    function G(q) {
      m.pointerType = q.pointerType;
    }
    return {
      onPointerDown: G,
      onPointerEnter: G,
      onMouseMove(q) {
        var ne;
        var ue;
        var ee;
        const {
          nativeEvent: U
        } = q;
        const L = q.currentTarget;
        const F = x.select("domReferenceElement");
        const P = x.select("open");
        const V = z(F, L, q.target);
        if (u && !Aa(m.pointerType)) {
          return;
        }
        if (P && V && (ne = m.handleCloseOptions) != null && ne.blockPointerEvents) {
          const Y = x.select("floatingElement");
          if (Y) {
            const re = ((ee = (ue = m.handleCloseOptions) == null ? undefined : ue.getScope) == null ? undefined : ee.call(ue)) ?? L.ownerDocument.body;
            EE(m, {
              scopeElement: re,
              referenceElement: L,
              floatingElement: Y
            });
          }
        }
        const Z = bS(A.current);
        if (P && !V || Z === 0 || !V && m.restTimeoutPending && q.movementX ** 2 + q.movementY ** 2 < 2) {
          return;
        }
        m.restTimeout.clear();
        function J() {
          m.restTimeoutPending = false;
          if (j()) {
            return;
          }
          const Y = x.select("open");
          if (!m.blockMouseMove && (!Y || V) && W()) {
            x.setOpen(true, $e(In, U, L));
          }
        }
        if (m.pointerType === "touch") {
          cs.flushSync(() => {
            J();
          });
        } else if (V && P) {
          J();
        } else {
          m.restTimeoutPending = true;
          m.restTimeout.start(Z, J);
        }
      }
    };
  }, [r, m, j, z, u, x, A, W]);
}
const sP = "Escape";
function kh(e, n, r) {
  switch (e) {
    case "vertical":
      return n;
    case "horizontal":
      return r;
    default:
      return n || r;
  }
}
function lf(e, n) {
  return kh(n, e === Gv || e === Cu, e === ko || e === Ao);
}
function Ng(e, n, r) {
  return kh(n, e === Cu, r ? e === ko : e === Ao) || e === "Enter" || e === " " || e === "";
}
function iP(e, n, r) {
  return kh(n, r ? e === ko : e === Ao, e === Cu);
}
function oP(e, n, r, i) {
  const o = r ? e === Ao : e === ko;
  const u = e === Gv;
  if (n === "both" || n === "horizontal" && i && i > 1) {
    return e === sP;
  } else {
    return kh(n, o, u);
  }
}
function vb(e, n) {
  const {
    listRef: r,
    activeIndex: i,
    onNavigate: o = () => {},
    enabled: u = true,
    selectedIndex: h = null,
    allowEscape: a = false,
    loopFocus: c = false,
    nested: d = false,
    rtl: p = false,
    virtual: f = false,
    focusItemOnOpen: S = "auto",
    focusItemOnHover: _ = true,
    openOnArrowKeyDown: x = true,
    disabledIndices: w = undefined,
    orientation: g = "vertical",
    parentOrientation: b,
    cols: m = 1,
    id: v,
    resetOnPointerLeave: C = true,
    externalTree: T
  } = n;
  const A = "rootStore" in e ? e.rootStore : e;
  const M = A.useState("open");
  const R = A.useState("floatingElement");
  const I = A.useState("domReferenceElement");
  const j = A.context.dataRef;
  const W = Gf(R);
  const z = hv(I);
  const N = On(W);
  const D = qi();
  const $ = Bo(T);
  const G = E.useRef(S);
  const q = E.useRef(h ?? -1);
  const U = E.useRef(null);
  const L = E.useRef(true);
  const F = je(_e => {
    o(q.current === -1 ? null : q.current, _e);
  });
  const P = E.useRef(F);
  const V = E.useRef(!!R);
  const Z = E.useRef(M);
  const J = E.useRef(false);
  const ne = E.useRef(false);
  const ue = E.useRef(null);
  const ee = On(w);
  const Y = On(M);
  const re = On(h);
  const ce = On(C);
  const ge = Vi();
  const de = Vi();
  const me = je(() => {
    function _e(ve) {
      if (f) {
        if ($ != null) {
          $.events.emit("virtualfocus", ve);
        }
      } else {
        ue.current = Af(ve, {
          sync: J.current,
          preventScroll: true
        });
      }
    }
    const ie = r.current[q.current];
    const te = ne.current;
    if (ie) {
      _e(ie);
    }
    (J.current ? ve => ve() : ve => ge.request(ve))(() => {
      var Re;
      const ve = r.current[q.current] || ie;
      if (!ve) {
        return;
      }
      if (!ie) {
        _e(ve);
      }
      if (se && (te || !L.current)) {
        if ((Re = ve.scrollIntoView) != null) {
          Re.call(ve, {
            block: "nearest",
            inline: "nearest"
          });
        }
      }
    });
  });
  Fe(() => {
    j.current.orientation = g;
  }, [j, g]);
  Fe(() => {
    if (u) {
      if (M && R) {
        q.current = h ?? -1;
        if (G.current && h != null) {
          ne.current = true;
          F();
        }
      } else if (V.current) {
        q.current = -1;
        P.current();
      }
    }
  }, [u, M, R, h, F]);
  Fe(() => {
    if (u) {
      if (!M) {
        J.current = false;
        return;
      }
      if (R) {
        if (i == null) {
          J.current = false;
          if (re.current != null) {
            return;
          }
          if (V.current) {
            q.current = -1;
            me();
          }
          if ((!Z.current || !V.current) && G.current && (U.current != null || G.current === true && U.current == null)) {
            let _e = 0;
            const ie = () => {
              if (r.current[0] == null) {
                if (_e < 2) {
                  (_e ? be => de.request(be) : queueMicrotask)(ie);
                }
                _e += 1;
              } else {
                q.current = U.current == null || Ng(U.current, g, p) || d ? kf(r) : gv(r);
                U.current = null;
                F();
              }
            };
            ie();
          }
        } else if (!du(r.current, i)) {
          q.current = i;
          me();
          ne.current = false;
        }
      }
    }
  }, [u, M, R, i, re, d, r, g, p, F, me, de]);
  Fe(() => {
    var ve;
    var Te;
    if (!u || R || !$ || f || !V.current) {
      return;
    }
    const _e = $.nodesRef.current;
    const ie = (Te = (ve = _e.find(Re => Re.id === D)) == null ? undefined : ve.context) == null ? undefined : Te.elements.floating;
    const te = Hn(yt(R));
    const be = _e.some(Re => Re.context && Xe(Re.context.elements.floating, te));
    if (ie && !be && L.current) {
      ie.focus({
        preventScroll: true
      });
    }
  }, [u, R, $, D, f]);
  Fe(() => {
    P.current = F;
    Z.current = M;
    V.current = !!R;
  });
  Fe(() => {
    if (!M) {
      U.current = null;
      G.current = S;
    }
  }, [M, S]);
  const H = i != null;
  const ae = je(_e => {
    if (!Y.current) {
      return;
    }
    const ie = r.current.indexOf(_e.currentTarget);
    if (ie !== -1 && (q.current !== ie || i !== ie)) {
      q.current = ie;
      F(_e);
    }
  });
  const oe = je(() => {
    var _e;
    var ie;
    var te;
    return b ?? ((te = (ie = (_e = $ == null ? undefined : $.nodesRef.current.find(be => be.id === D)) == null ? undefined : _e.context) == null ? undefined : ie.dataRef) == null ? undefined : te.current.orientation);
  });
  const X = je(() => kf(r, ee.current));
  const Q = je(_e => {
    L.current = false;
    J.current = true;
    if (_e.which === 229 || !Y.current && _e.currentTarget === N.current) {
      return;
    }
    if (d && oP(_e.key, g, p, m)) {
      if (!lf(_e.key, oe())) {
        cr(_e);
      }
      A.setOpen(false, $e(Xf, _e.nativeEvent));
      if (un(I)) {
        if (f) {
          if ($ != null) {
            $.events.emit("virtualfocus", I);
          }
        } else {
          I.focus();
        }
      }
      return;
    }
    const ie = q.current;
    const te = kf(r, w);
    const be = gv(r, w);
    if (!z) {
      if (_e.key === "Home") {
        cr(_e);
        q.current = te;
        F(_e);
      }
      if (_e.key === "End") {
        cr(_e);
        q.current = be;
        F(_e);
      }
    }
    if (m > 1) {
      const ve = Array.from({
        length: r.current.length
      }, () => ({
        width: 1,
        height: 1
      }));
      const Te = jC(ve, m, false);
      const Re = Te.findIndex(Ue => Ue != null && !ji(r.current, Ue, w));
      const ze = Te.reduce((Ue, We, lt) => We != null && !ji(r.current, We, w) ? lt : Ue, -1);
      const Be = Te[NC(Te.map(Ue => Ue != null ? r.current[Ue] : null), {
        event: _e,
        orientation: g,
        loopFocus: c,
        rtl: p,
        cols: m,
        disabledIndices: FC([...((typeof w != "function" ? w : null) || r.current.map((Ue, We) => ji(r.current, We, w) ? We : undefined)), undefined], Te),
        minIndex: Re,
        maxIndex: ze,
        prevIndex: HC(q.current > be ? te : q.current, ve, Te, m, _e.key === Cu ? "bl" : _e.key === (p ? ko : Ao) ? "tr" : "tl"),
        stopEvent: true
      })];
      if (Be != null) {
        q.current = Be;
        F(_e);
      }
      if (g === "both") {
        return;
      }
    }
    if (lf(_e.key, g)) {
      cr(_e);
      if (M && !f && Hn(_e.currentTarget.ownerDocument) === _e.currentTarget) {
        q.current = Ng(_e.key, g, p) ? te : be;
        F(_e);
        return;
      }
      if (Ng(_e.key, g, p)) {
        if (c) {
          if (ie >= be) {
            if (a && ie !== r.current.length) {
              q.current = -1;
            } else {
              J.current = false;
              q.current = te;
            }
          } else {
            q.current = Cr(r.current, {
              startingIndex: ie,
              disabledIndices: w
            });
          }
        } else {
          q.current = Math.min(be, Cr(r.current, {
            startingIndex: ie,
            disabledIndices: w
          }));
        }
      } else if (c) {
        if (ie <= te) {
          if (a && ie !== -1) {
            q.current = r.current.length;
          } else {
            J.current = false;
            q.current = be;
          }
        } else {
          q.current = Cr(r.current, {
            startingIndex: ie,
            decrement: true,
            disabledIndices: w
          });
        }
      } else {
        q.current = Math.max(te, Cr(r.current, {
          startingIndex: ie,
          decrement: true,
          disabledIndices: w
        }));
      }
      if (du(r.current, q.current)) {
        q.current = -1;
      }
      F(_e);
    }
  });
  const se = E.useMemo(() => ({
    onFocus(ie) {
      J.current = true;
      ae(ie);
    },
    onClick: ({
      currentTarget: ie
    }) => ie.focus({
      preventScroll: true
    }),
    onMouseMove(ie) {
      J.current = true;
      ne.current = false;
      if (_) {
        ae(ie);
      }
    },
    onPointerLeave(ie) {
      var be;
      if (!Y.current || !L.current || ie.pointerType === "touch") {
        return;
      }
      J.current = true;
      const te = ie.relatedTarget;
      if (!!_ && !r.current.includes(te) && ce.current && ((be = ue.current) == null || be.call(ue), ue.current = null, q.current = -1, F(ie), !f)) {
        const ve = N.current;
        const Te = Hn(yt(ve));
        if (ve && Xe(ve, Te)) {
          ve.focus({
            preventScroll: true
          });
        }
      }
    }
  }), [ae, Y, N, _, r, F, ce, f]);
  const he = E.useMemo(() => f && M && H && {
    "aria-activedescendant": `${v}-${i}`
  }, [f, M, H, v, i]);
  const ye = E.useMemo(() => ({
    "aria-orientation": g === "both" ? undefined : g,
    ...(z ? {} : he),
    onKeyDown(_e) {
      if (_e.key === "Tab" && _e.shiftKey && M && !f) {
        const ie = dn(_e.nativeEvent);
        if (ie && !Xe(N.current, ie)) {
          return;
        }
        cr(_e);
        A.setOpen(false, $e(Ui, _e.nativeEvent));
        if (un(I)) {
          I.focus();
        }
        return;
      }
      Q(_e);
    },
    onPointerMove() {
      L.current = true;
    }
  }), [he, Q, N, g, z, A, M, f, I]);
  const pe = E.useMemo(() => {
    function _e(be) {
      A.setOpen(true, $e(Xf, be.nativeEvent, be.currentTarget));
    }
    function ie(be) {
      if (S === "auto" && Wv(be.nativeEvent)) {
        G.current = !f;
      }
    }
    function te(be) {
      G.current = S;
      if (S === "auto" && kC(be.nativeEvent)) {
        G.current = true;
      }
    }
    return {
      onKeyDown(be) {
        const ve = A.select("open");
        L.current = false;
        const Te = be.key.startsWith("Arrow");
        const Re = iP(be.key, oe(), p);
        const ze = lf(be.key, g);
        const Be = (d ? Re : ze) || be.key === "Enter" || be.key.trim() === "";
        if (f && ve) {
          return Q(be);
        }
        if (!!ve || !!x || !Te) {
          if (Be) {
            const Ue = lf(be.key, oe());
            U.current = d && Ue ? null : be.key;
          }
          if (d) {
            if (Re) {
              cr(be);
              if (ve) {
                q.current = X();
                F(be);
              } else {
                _e(be);
              }
            }
            return;
          }
          if (ze) {
            if (re.current != null) {
              q.current = re.current;
            }
            cr(be);
            if (!ve && x) {
              _e(be);
            } else {
              Q(be);
            }
            if (ve) {
              F(be);
            }
          }
        }
      },
      onFocus(be) {
        if (A.select("open") && !f) {
          q.current = -1;
          F(be);
        }
      },
      onPointerDown: te,
      onPointerEnter: te,
      onMouseDown: ie,
      onClick: ie
    };
  }, [Q, S, X, d, F, A, x, g, oe, p, re, f]);
  const Se = E.useMemo(() => ({
    ...he,
    ...pe
  }), [he, pe]);
  return E.useMemo(() => u ? {
    reference: Se,
    floating: ye,
    item: se,
    trigger: pe
  } : {}, [u, Se, ye, pe, se]);
}
function bb(e, n) {
  const {
    listRef: r,
    elementsRef: i,
    activeIndex: o,
    onMatch: u,
    onTyping: h,
    enabled: a = true,
    resetMs: c = 750,
    selectedIndex: d = null
  } = n;
  const p = "rootStore" in e ? e.rootStore : e;
  const f = p.useState("open");
  const S = xn();
  const _ = E.useRef("");
  const x = E.useRef(d ?? o ?? -1);
  const w = E.useRef(null);
  const g = je(v => {
    function C(z) {
      const N = i == null ? undefined : i.current[z];
      return !N || vh(N);
    }
    function T(z, N, D = 0) {
      if (z.length === 0) {
        return -1;
      }
      const $ = (D % z.length + z.length) % z.length;
      const G = N.toLocaleLowerCase();
      for (let q = 0; q < z.length; q += 1) {
        const U = ($ + q) % z.length;
        const L = z[U];
        if (L != null && !!L.toLocaleLowerCase().startsWith(G) && !!C(U)) {
          return U;
        }
      }
      return -1;
    }
    const A = r.current;
    if (_.current.length > 0 && v.key === " ") {
      cr(v);
      if (h != null) {
        h(true);
      }
    }
    if (_.current.length > 0 && _.current[0] !== " " && T(A, _.current) === -1 && v.key !== " ") {
      if (h != null) {
        h(false);
      }
    }
    if (A == null || v.key.length !== 1 || v.ctrlKey || v.metaKey || v.altKey) {
      return;
    }
    if (f && v.key !== " ") {
      cr(v);
      if (h != null) {
        h(true);
      }
    }
    const M = _.current === "";
    if (M) {
      x.current = d ?? o ?? -1;
    }
    if (A.every(z => {
      var N;
      var D;
      if (z) {
        return ((N = z[0]) == null ? undefined : N.toLocaleLowerCase()) !== ((D = z[1]) == null ? undefined : D.toLocaleLowerCase());
      } else {
        return true;
      }
    }) && _.current === v.key) {
      _.current = "";
      x.current = w.current;
    }
    _.current += v.key;
    S.start(c, () => {
      _.current = "";
      x.current = w.current;
      if (h != null) {
        h(false);
      }
    });
    const j = ((M ? d ?? o ?? -1 : x.current) ?? 0) + 1;
    const W = T(A, _.current, j);
    if (W !== -1) {
      if (u != null) {
        u(W);
      }
      w.current = W;
    } else if (v.key !== " ") {
      _.current = "";
      if (h != null) {
        h(false);
      }
    }
  });
  const b = je(v => {
    const C = v.relatedTarget;
    const T = p.select("domReferenceElement");
    const A = p.select("floatingElement");
    if (!Xe(T, C) && !Xe(A, C)) {
      S.clear();
      _.current = "";
      x.current = w.current;
      if (h != null) {
        h(false);
      }
    }
  });
  Fe(() => {
    if (!!f || d === null) {
      S.clear();
      w.current = null;
      if (_.current !== "") {
        _.current = "";
      }
    }
  }, [f, d, S]);
  Fe(() => {
    if (f && _.current === "") {
      x.current = d ?? o ?? -1;
    }
  }, [f, d, o]);
  const m = E.useMemo(() => ({
    onKeyDown: g,
    onBlur: b
  }), [g, b]);
  return E.useMemo(() => a ? {
    reference: m,
    floating: m
  } : {}, [a, m]);
}
const GS = 0.1;
const aP = GS * GS;
const yn = 0.5;
function cf(e, n, r, i, o, u) {
  return i >= n != u >= n && e <= (o - r) * (n - i) / (u - i) + r;
}
function uf(e, n, r, i, o, u, h, a, c, d) {
  let p = false;
  if (cf(e, n, r, i, o, u)) {
    p = !p;
  }
  if (cf(e, n, o, u, h, a)) {
    p = !p;
  }
  if (cf(e, n, h, a, c, d)) {
    p = !p;
  }
  if (cf(e, n, c, d, r, i)) {
    p = !p;
  }
  return p;
}
function lP(e, n, r) {
  return e >= r.x && e <= r.x + r.width && n >= r.y && n <= r.y + r.height;
}
function df(e, n, r, i, o, u) {
  const h = Math.min(r, o);
  const a = Math.max(r, o);
  const c = Math.min(i, u);
  const d = Math.max(i, u);
  return e >= h && e <= a && n >= c && n <= d;
}
function Ah(e = {}) {
  const {
    blockPointerEvents: n = false
  } = e;
  const r = new $r();
  const i = ({
    x: o,
    y: u,
    placement: h,
    elements: a,
    onClose: c,
    nodeId: d,
    tree: p
  }) => {
    const f = h == null ? undefined : h.split("-")[0];
    let S = false;
    let _ = null;
    let x = null;
    let w = typeof performance !== "undefined" ? performance.now() : 0;
    function g(m, v) {
      const C = performance.now();
      const T = C - w;
      if (_ === null || x === null || T === 0) {
        _ = m;
        x = v;
        w = C;
        return false;
      }
      const A = m - _;
      const M = v - x;
      const R = A * A + M * M;
      const I = T * T * aP;
      _ = m;
      x = v;
      w = C;
      return R < I;
    }
    function b() {
      r.clear();
      c();
    }
    return function (v) {
      r.clear();
      const C = a.domReference;
      const T = a.floating;
      if (!C || !T || f == null || o == null || u == null) {
        return;
      }
      const {
        clientX: A,
        clientY: M
      } = v;
      const R = dn(v);
      const I = v.type === "mouseleave";
      const j = Xe(T, R);
      const W = Xe(C, R);
      if (j && (S = true, !I)) {
        return;
      }
      if (W && (S = false, !I)) {
        S = true;
        return;
      }
      if (I && Mt(v.relatedTarget) && Xe(T, v.relatedTarget)) {
        return;
      }
      function z() {
        return !!p && !!(Oo(p.nodesRef.current, d).length > 0);
      }
      function N() {
        if (!z()) {
          b();
        }
      }
      if (z()) {
        return;
      }
      const D = C.getBoundingClientRect();
      const $ = T.getBoundingClientRect();
      const G = o > $.right - $.width / 2;
      const q = u > $.bottom - $.height / 2;
      const U = $.width > D.width;
      const L = $.height > D.height;
      const F = (U ? D : $).left;
      const P = (U ? D : $).right;
      const V = (L ? D : $).top;
      const Z = (L ? D : $).bottom;
      if (f === "top" && u >= D.bottom - 1 || f === "bottom" && u <= D.top + 1 || f === "left" && o >= D.right - 1 || f === "right" && o <= D.left + 1) {
        N();
        return;
      }
      let J = false;
      switch (f) {
        case "top":
          J = df(A, M, F, D.top + 1, P, $.bottom - 1);
          break;
        case "bottom":
          J = df(A, M, F, $.top + 1, P, D.bottom - 1);
          break;
        case "left":
          J = df(A, M, $.right - 1, Z, D.left + 1, V);
          break;
        case "right":
          J = df(A, M, D.right - 1, Z, $.left + 1, V);
          break;
      }
      if (J) {
        return;
      }
      if (S && !lP(A, M, D)) {
        N();
        return;
      }
      if (!I && g(A, M)) {
        N();
        return;
      }
      let ne = false;
      switch (f) {
        case "top":
          {
            const ue = U ? yn / 2 : yn * 4;
            const ee = U || G ? o + ue : o - ue;
            const Y = U ? o - ue : G ? o + ue : o - ue;
            const re = u + yn + 1;
            const ce = G || U ? $.bottom - yn : $.top;
            const ge = G ? U ? $.bottom - yn : $.top : $.bottom - yn;
            ne = uf(A, M, ee, re, Y, re, $.left, ce, $.right, ge);
            break;
          }
        case "bottom":
          {
            const ue = U ? yn / 2 : yn * 4;
            const ee = U || G ? o + ue : o - ue;
            const Y = U ? o - ue : G ? o + ue : o - ue;
            const re = u - yn;
            const ce = G || U ? $.top + yn : $.bottom;
            const ge = G ? U ? $.top + yn : $.bottom : $.top + yn;
            ne = uf(A, M, ee, re, Y, re, $.left, ce, $.right, ge);
            break;
          }
        case "left":
          {
            const ue = L ? yn / 2 : yn * 4;
            const ee = L || q ? u + ue : u - ue;
            const Y = L ? u - ue : q ? u + ue : u - ue;
            const re = o + yn + 1;
            const ce = q || L ? $.right - yn : $.left;
            const ge = q ? L ? $.right - yn : $.left : $.right - yn;
            ne = uf(A, M, ce, $.top, ge, $.bottom, re, ee, re, Y);
            break;
          }
        case "right":
          {
            const ue = L ? yn / 2 : yn * 4;
            const ee = L || q ? u + ue : u - ue;
            const Y = L ? u - ue : q ? u + ue : u - ue;
            const re = o - yn;
            const ce = q || L ? $.left + yn : $.right;
            const ge = q ? L ? $.left + yn : $.right : $.left + yn;
            ne = uf(A, M, re, ee, re, Y, ce, $.top, ge, $.bottom);
            break;
          }
      }
      if (ne) {
        if (!S) {
          r.start(40, N);
        }
      } else {
        N();
      }
    };
  };
  i.__options = {
    ...e,
    blockPointerEvents: n
  };
  return i;
}
const cP = {
  ...Rh,
  disabled: Me(e => e.disabled),
  instantType: Me(e => e.instantType),
  isInstantPhase: Me(e => e.isInstantPhase),
  trackCursorAxis: Me(e => e.trackCursorAxis),
  disableHoverablePopup: Me(e => e.disableHoverablePopup),
  lastOpenChangeReason: Me(e => e.openChangeReason),
  closeOnClick: Me(e => e.closeOnClick),
  closeDelay: Me(e => e.closeDelay),
  hasViewport: Me(e => e.hasViewport)
};
class yb extends Yl {
  constructor(r, i, o = false) {
    const u = new Xl();
    const h = {
      ...uP(),
      ...r
    };
    h.floatingRootContext = db(u, i, o);
    super(h, {
      popupRef: E.createRef(),
      onOpenChange: undefined,
      onOpenChangeComplete: undefined,
      triggerElements: u
    }, cP);
    tt(this, "setOpen", (r, i) => {
      var d;
      var p;
      const o = i.reason;
      const u = o === In;
      const h = r && o === Ll;
      const a = !r && (o === Fi || o === $l);
      i.preventUnmountOnClose = () => {
        this.set("preventUnmountingOnClose", true);
      };
      if ((p = (d = this.context).onOpenChange) != null) {
        p.call(d, r, i);
      }
      if (i.isCanceled) {
        return;
      }
      this.state.floatingRootContext.dispatchOpenChange(r, i);
      const c = () => {
        const f = {
          open: r,
          openChangeReason: o
        };
        if (h) {
          f.instantType = "focus";
        } else if (a) {
          f.instantType = "dismiss";
        } else if (o === In) {
          f.instantType = undefined;
        }
        cb(f, r, i.trigger);
        this.update(f);
      };
      if (u) {
        cs.flushSync(c);
      } else {
        c();
      }
    });
  }
  cancelPendingOpen(r) {
    this.state.floatingRootContext.dispatchOpenChange(false, $e(Fi, r));
  }
  static useStore(r, i) {
    return lb(r, (u, h) => new yb(i, u, h)).store;
  }
}
function uP() {
  return {
    ...Eh(),
    disabled: false,
    instantType: undefined,
    isInstantPhase: false,
    trackCursorAxis: "none",
    disableHoverablePopup: false,
    openChangeReason: null,
    closeOnClick: true,
    closeDelay: 0,
    hasViewport: false
  };
}
const dP = Fv(function (n) {
  const {
    disabled: r = false,
    defaultOpen: i = false,
    open: o,
    disableHoverablePopup: u = false,
    trackCursorAxis: h = "none",
    actionsRef: a,
    onOpenChange: c,
    onOpenChangeComplete: d,
    handle: p,
    triggerId: f,
    defaultTriggerId: S = null,
    children: _
  } = n;
  const x = yb.useStore(p == null ? undefined : p.store, {
    open: i,
    openProp: o,
    activeTriggerId: S,
    triggerIdProp: f
  });
  Wl(() => {
    if (o === undefined && x.state.open === false && i === true) {
      x.update({
        open: true,
        activeTriggerId: S
      });
    }
  });
  x.useControlledProp("openProp", o);
  x.useControlledProp("triggerIdProp", f);
  x.useContextCallback("onOpenChange", c);
  x.useContextCallback("onOpenChangeComplete", d);
  const w = x.useState("open");
  const g = !r && w;
  const b = x.useState("activeTriggerId");
  const m = x.useState("mounted");
  const v = x.useState("payload");
  x.useSyncedValues({
    trackCursorAxis: h,
    disableHoverablePopup: u
  });
  x.useSyncedValue("disabled", r);
  Sh(x);
  const {
    forceUnmount: C,
    transitionStatus: T
  } = xh(g, x);
  const A = x.useState("isInstantPhase");
  const M = x.useState("instantType");
  const R = x.useState("lastOpenChangeReason");
  const I = E.useRef(null);
  Fe(() => {
    if (w && r) {
      x.setOpen(false, $e(u3));
    }
  }, [w, r, x]);
  Fe(() => {
    if (T === "ending" && R === ur || T !== "ending" && A) {
      if (M !== "delay") {
        I.current = M;
      }
      x.set("instantType", "delay");
    } else if (I.current !== null) {
      x.set("instantType", I.current);
      I.current = null;
    }
  }, [T, A, R, M, x]);
  Fe(() => {
    if (g && b == null) {
      x.set("payload", undefined);
    }
  }, [x, b, g]);
  const j = E.useCallback(() => {
    x.setOpen(false, $e(mh));
  }, [x]);
  E.useImperativeHandle(a, () => ({
    unmount: C,
    close: j
  }), [C, j]);
  const W = g || m || !r && h !== "none";
  return <xC.Provider value={x}>{W && <_Component2 store={x} disabled={r} trackCursorAxis={h} />}{typeof _ == "function" ? _({
      payload: v
    }) : _}</xC.Provider>;
});
function _Component2({
  store: e,
  disabled: n,
  trackCursorAxis: r
}) {
  const i = e.useState("floatingRootContext");
  const o = Gl(i, {
    enabled: !n,
    referencePress: () => e.select("closeOnClick")
  });
  const u = Q3(i, {
    enabled: !n && r !== "none",
    axis: r === "none" ? undefined : r
  });
  const h = E.useMemo(() => Sn(u.reference, o.reference), [u.reference, o.reference]);
  const a = E.useMemo(() => Sn(u.trigger, o.trigger), [u.trigger, o.trigger]);
  const c = E.useMemo(() => Sn(No, u.floating, o.floating), [u.floating, o.floating]);
  Ch(e, {
    activeTriggerProps: h,
    inactiveTriggerProps: a,
    popupProps: c
  });
  return null;
}
let Ns = function (e) {
  e.open = "data-open";
  e.closed = "data-closed";
  e[e.startingStyle = hu.startingStyle] = "startingStyle";
  e[e.endingStyle = hu.endingStyle] = "endingStyle";
  e.anchorHidden = "data-anchor-hidden";
  e.side = "data-side";
  e.align = "data-align";
  return e;
}({});
let eh = function (e) {
  e.popupOpen = "data-popup-open";
  e.pressed = "data-pressed";
  return e;
}({});
const hP = {
  [eh.popupOpen]: ""
};
const pP = {
  [eh.popupOpen]: "",
  [eh.pressed]: ""
};
const mP = {
  [Ns.open]: ""
};
const gP = {
  [Ns.closed]: ""
};
const vP = {
  [Ns.anchorHidden]: ""
};
const ku = {
  open(e) {
    if (e) {
      return hP;
    } else {
      return null;
    }
  }
};
const pu = {
  open(e) {
    if (e) {
      return pP;
    } else {
      return null;
    }
  }
};
const jo = {
  open(e) {
    if (e) {
      return mP;
    } else {
      return gP;
    }
  },
  anchorHidden(e) {
    if (e) {
      return vP;
    } else {
      return null;
    }
  }
};
function $n(e) {
  return $i(e, "base-ui");
}
const RE = E.createContext(undefined);
function bP() {
  return E.useContext(RE);
}
let yP = function (e) {
  e[e.popupOpen = eh.popupOpen] = "popupOpen";
  e.triggerDisabled = "data-trigger-disabled";
  return e;
}({});
const _P = 600;
const TE = "data-base-ui-tooltip-trigger";
function YS(e) {
  if ("composedPath" in e) {
    const r = e.composedPath();
    for (let i = 0; i < r.length; i += 1) {
      const o = r[i];
      if (Mt(o)) {
        return o;
      }
    }
  }
  const n = e.target;
  if (Mt(n)) {
    return n;
  } else {
    return null;
  }
}
function wP(e) {
  let n = e;
  while (n) {
    if (n.hasAttribute(TE)) {
      return n;
    }
    const r = n.parentElement;
    if (r) {
      n = r;
      continue;
    }
    const i = n.getRootNode();
    n = "host" in i && Mt(i.host) ? i.host : null;
  }
  return null;
}
const SP = SC(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    handle: h,
    payload: a,
    disabled: c,
    delay: d,
    closeOnClick: p = true,
    closeDelay: f,
    id: S,
    ..._
  } = n;
  const x = xu(true);
  const w = (h == null ? undefined : h.store) ?? x;
  if (!w) {
    throw new Error(Bt(82));
  }
  const g = $n(S);
  const b = w.useState("isTriggerActive", g);
  const m = w.useState("isOpenedByTrigger", g);
  const v = w.useState("floatingRootContext");
  const C = E.useRef(null);
  const T = d ?? _P;
  const A = f ?? 0;
  const {
    registerTrigger: M,
    isMountedByThisTrigger: R
  } = ub(g, C, w, {
    payload: a,
    closeOnClick: p,
    closeDelay: A
  });
  const I = bP();
  const {
    delayRef: j,
    isInstantPhase: W,
    hasProvider: z
  } = h3(v, {
    open: m
  });
  const N = mb(v);
  w.useSyncedValue("isInstantPhase", W);
  const D = w.useState("disabled");
  const $ = c ?? D;
  const G = On($);
  const q = w.useState("trackCursorAxis");
  const U = w.useState("disableHoverablePopup");
  const L = E.useRef(false);
  const F = xn();
  const P = E.useRef(undefined);
  function V() {
    const de = I == null ? undefined : I.delay;
    const me = typeof j.current == "object" ? j.current.open : undefined;
    let H = T;
    if (z) {
      if (me !== 0) {
        H = d ?? de ?? T;
      } else {
        H = 0;
      }
    }
    return H;
  }
  function Z(de) {
    const me = C.current;
    if (!me || !de) {
      return false;
    }
    const H = wP(de);
    return H !== null && H !== me && Xe(me, H);
  }
  function J(de) {
    const me = Z(de);
    L.current = me;
    if (me) {
      N.openChangeTimeout.clear();
      N.restTimeout.clear();
      N.restTimeoutPending = false;
      F.clear();
    }
    return me;
  }
  const ne = Th(v, {
    enabled: !$,
    mouseOnly: true,
    move: false,
    handleClose: !U && q !== "both" ? Ah() : null,
    restMs: V,
    delay() {
      const de = typeof j.current == "object" ? j.current.close : undefined;
      let me = A;
      if (f == null && z) {
        me = de;
      }
      return {
        close: me
      };
    },
    triggerElementRef: C,
    isActiveTrigger: b,
    isClosing: () => w.select("transitionStatus") === "ending",
    shouldOpen() {
      return !L.current;
    }
  });
  const ue = CE(v, {
    enabled: !$
  }).reference;
  const ee = de => {
    const me = L.current;
    const H = YS(de);
    const ae = J(H);
    const oe = C.current;
    const X = oe && H && Xe(oe, H);
    if (ae && w.select("open") && w.select("lastOpenChangeReason") === In) {
      w.setOpen(false, $e(In, de));
      return;
    }
    if (me && !ae && X && !G.current && !w.select("open") && oe && Aa(P.current)) {
      const Q = () => {
        if (!L.current && !G.current && !w.select("open")) {
          w.setOpen(true, $e(In, de, oe));
        }
      };
      const se = V();
      if (se === 0) {
        F.clear();
        Q();
      } else {
        F.start(se, Q);
      }
    }
  };
  const Y = w.useState("triggerProps", R);
  return Je("button", n, {
    state: {
      open: m
    },
    ref: [r, M, C],
    props: [ne, ue, R || q !== "none" ? Y : undefined, {
      onMouseOver(de) {
        ee(de.nativeEvent);
      },
      onFocus(de) {
        if (Z(YS(de.nativeEvent))) {
          de.preventBaseUIHandler();
        }
      },
      onMouseLeave() {
        L.current = false;
        F.clear();
        P.current = undefined;
      },
      onPointerEnter(de) {
        P.current = de.pointerType;
      },
      onPointerDown(de) {
        P.current = de.pointerType;
        w.set("closeOnClick", p);
        if (p && !w.select("open")) {
          w.cancelPendingOpen(de.nativeEvent);
        }
      },
      onClick(de) {
        if (p && !w.select("open")) {
          w.cancelPendingOpen(de.nativeEvent);
        }
      },
      id: g,
      [yP.triggerDisabled]: $ ? "" : undefined,
      [TE]: $ ? undefined : ""
    }, _],
    stateAttributesMapping: ku
  });
});
const kE = E.createContext(undefined);
function xP() {
  const e = E.useContext(kE);
  if (e === undefined) {
    throw new Error(Bt(70));
  }
  return e;
}
const AE = E.forwardRef(function (n, r) {
  const {
    children: i,
    container: o,
    className: u,
    render: h,
    style: a,
    ...c
  } = n;
  const {
    portalNode: d,
    portalSubtree: p
  } = sE({
    container: o,
    ref: r,
    componentProps: n,
    elementProps: c
  });
  if (!p && !d) {
    return null;
  } else {
    return <E.Fragment>{p}{d && cs.createPortal(i, d)}</E.Fragment>;
  }
});
const CP = E.forwardRef(function (n, r) {
  const {
    keepMounted: i = false,
    ...o
  } = n;
  if (xu().useState("mounted") || i) {
    return <kE.Provider value={i}><AE ref={r} {...o} /></kE.Provider>;
  } else {
    return null;
  }
});
const ME = E.createContext(undefined);
function OE() {
  const e = E.useContext(ME);
  if (e === undefined) {
    throw new Error(Bt(71));
  }
  return e;
}
const EP = E.createContext(undefined);
function Us() {
  const e = E.useContext(EP);
  return (e == null ? undefined : e.direction) ?? "ltr";
}
const RP = e => ({
  name: "arrow",
  options: e,
  async fn(n) {
    var L;
    var F;
    const {
      x: r,
      y: i,
      placement: o,
      rects: u,
      platform: h,
      elements: a,
      middlewareData: c
    } = n;
    const {
      element: d,
      padding: p = 0,
      offsetParent: f = "real"
    } = Wi(e, n) || {};
    if (d == null) {
      return {};
    }
    const S = zC(p);
    const _ = {
      x: r,
      y: i
    };
    const x = Qv(o);
    const w = Zv(x);
    const g = await h.getDimensions(d);
    const b = x === "y";
    const m = b ? "top" : "left";
    const v = b ? "bottom" : "right";
    const C = b ? "clientHeight" : "clientWidth";
    const T = u.reference[w] + u.reference[x] - _[x] - u.floating[w];
    const A = _[x] - u.reference[x];
    const M = f === "real" ? await ((L = h.getOffsetParent) == null ? undefined : L.call(h, d)) : a.floating;
    let R = a.floating[C] || u.floating[w];
    if (!R || !(await ((F = h.isElement) == null ? undefined : F.call(h, M)))) {
      R = a.floating[C] || u.floating[w];
    }
    const I = T / 2 - A / 2;
    const j = R / 2 - g[w] / 2 - 1;
    const W = Math.min(S[m], j);
    const z = Math.min(S[v], j);
    const N = W;
    const D = R - g[w] - z;
    const $ = R / 2 - g[w] / 2 + I;
    const G = pv(N, $, D);
    const q = !c.arrow && Po(o) != null && $ !== G && u.reference[w] / 2 - ($ < N ? W : z) - g[w] / 2 < 0;
    const U = q ? $ < N ? $ - N : $ - D : 0;
    return {
      [x]: _[x] + U,
      data: {
        [x]: G,
        centerOffset: $ - G - U,
        ...(q && {
          alignmentOffset: U
        })
      },
      reset: q
    };
  }
});
const TP = (e, n) => ({
  ...RP(e),
  options: [e, n]
});
const kP = {
  name: "hide",
  async fn(e) {
    var a;
    const {
      width: n,
      height: r,
      x: i,
      y: o
    } = e.rects.reference;
    const u = n === 0 && r === 0 && i === 0 && o === 0;
    return {
      data: {
        referenceHidden: ((a = (await FL().fn(e)).data) == null ? undefined : a.referenceHidden) || u
      }
    };
  }
};
const Of = {
  sideX: "left",
  sideY: "top"
};
const _b = {
  name: "adaptiveOrigin",
  async fn(e) {
    var m;
    var v;
    const {
      x: n,
      y: r,
      rects: {
        floating: i
      },
      elements: {
        floating: o
      },
      platform: u,
      strategy: h,
      placement: a
    } = e;
    const c = fn(o);
    const d = c.getComputedStyle(o);
    if (d.transitionDuration === "0s" || d.transitionDuration === "") {
      return {
        x: n,
        y: r,
        data: Of
      };
    }
    const f = await ((m = u.getOffsetParent) == null ? undefined : m.call(u, o));
    let S = {
      width: 0,
      height: 0
    };
    if (h === "fixed" && c != null && c.visualViewport) {
      S = {
        width: c.visualViewport.width,
        height: c.visualViewport.height
      };
    } else if (f === c) {
      const C = yt(o);
      S = {
        width: C.documentElement.clientWidth,
        height: C.documentElement.clientHeight
      };
    } else if (await ((v = u.isElement) == null ? undefined : v.call(u, f))) {
      S = await u.getDimensions(f);
    }
    const _ = Wr(a);
    let x = n;
    let w = r;
    if (_ === "left") {
      x = S.width - (n + i.width);
    }
    if (_ === "top") {
      w = S.height - (r + i.height);
    }
    const g = _ === "left" ? "right" : Of.sideX;
    const b = _ === "top" ? "bottom" : Of.sideY;
    return {
      x,
      y: w,
      data: {
        sideX: g,
        sideY: b
      }
    };
  }
};
function DE(e, n, r) {
  const i = e === "inline-start" || e === "inline-end";
  return {
    top: "top",
    right: i ? r ? "inline-start" : "inline-end" : "right",
    bottom: "bottom",
    left: i ? r ? "inline-end" : "inline-start" : "left"
  }[n];
}
function XS(e, n, r) {
  const {
    rects: i,
    placement: o
  } = e;
  return {
    side: DE(n, Wr(o), r),
    align: Po(o) || "center",
    anchor: {
      width: i.reference.width,
      height: i.reference.height
    },
    positioner: {
      width: i.floating.width,
      height: i.floating.height
    }
  };
}
function Mh(e) {
  var kt;
  var Ge;
  const {
    anchor: n,
    positionMethod: r = "absolute",
    side: i = "bottom",
    sideOffset: o = 0,
    align: u = "center",
    alignOffset: h = 0,
    collisionBoundary: a,
    collisionPadding: c = 5,
    sticky: d = false,
    arrowPadding: p = 5,
    disableAnchorTracking: f = false,
    inline: S,
    keepMounted: _ = false,
    floatingRootContext: x,
    mounted: w,
    collisionAvoidance: g,
    shiftCrossAxis: b = false,
    nodeId: m,
    adaptiveOrigin: v,
    lazyFlip: C = false,
    externalTree: T
  } = e;
  const [A, M] = E.useState(null);
  if (!w && A !== null) {
    M(null);
  }
  const R = g.side || "flip";
  const I = g.align || "flip";
  const j = g.fallbackAxisSide || "end";
  const W = typeof n == "function" ? n : undefined;
  const z = je(W);
  const N = W ? z : n;
  const D = On(n);
  const $ = On(w);
  const q = Us() === "rtl";
  const U = A || {
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left",
    "inline-end": q ? "left" : "right",
    "inline-start": q ? "right" : "left"
  }[i];
  const L = u === "center" ? U : `${U}-${u}`;
  let F = c;
  const P = 1;
  const V = i === "bottom" ? P : 0;
  const Z = i === "top" ? P : 0;
  const J = i === "right" ? P : 0;
  const ne = i === "left" ? P : 0;
  if (typeof F == "number") {
    F = {
      top: F + V,
      right: F + ne,
      bottom: F + Z,
      left: F + J
    };
  } else {
    F &&= {
      top: (F.top || 0) + V,
      right: (F.right || 0) + ne,
      bottom: (F.bottom || 0) + Z,
      left: (F.left || 0) + J
    };
  }
  const ue = {
    boundary: a === "clipping-ancestors" ? "clippingAncestors" : a,
    padding: F
  };
  const ee = E.useRef(null);
  const Y = On(o);
  const re = On(h);
  const ce = typeof o != "function" ? o : 0;
  const ge = typeof h != "function" ? h : 0;
  const de = [];
  if (S) {
    de.push(S);
  }
  de.push(BL(Ye => {
    const Qe = XS(Ye, i, q);
    const gt = typeof Y.current == "function" ? Y.current(Qe) : Y.current;
    const ft = typeof re.current == "function" ? re.current(Qe) : re.current;
    return {
      mainAxis: gt,
      crossAxis: ft,
      alignmentAxis: ft
    };
  }, [ce, ge, q, i]));
  const me = I === "none" && R !== "shift";
  const H = !me && (d || b || R === "shift");
  const ae = R === "none" ? null : jL({
    ...ue,
    padding: {
      top: F.top + P,
      right: F.right + P,
      bottom: F.bottom + P,
      left: F.left + P
    },
    mainAxis: !b && R === "flip",
    crossAxis: I === "flip" ? "alignment" : false,
    fallbackAxisSideDirection: j
  });
  const oe = me ? null : zL(Ye => {
    const Qe = yt(Ye.elements.floating).documentElement;
    return {
      ...ue,
      rootBoundary: b ? {
        x: 0,
        y: 0,
        width: Qe.clientWidth,
        height: Qe.clientHeight
      } : undefined,
      mainAxis: I !== "none",
      crossAxis: H,
      limiter: d || b ? undefined : NL(gt => {
        if (!ee.current) {
          return {};
        }
        const {
          width: ft,
          height: Ke
        } = ee.current.getBoundingClientRect();
        const en = ws(Wr(gt.placement));
        const St = en === "y" ? ft : Ke;
        const it = en === "y" ? F.left + F.right : F.top + F.bottom;
        return {
          offset: St / 2 + it / 2
        };
      })
    };
  }, [ue, d, b, F, I]);
  if (R === "shift" || I === "shift" || u === "center") {
    de.push(oe, ae);
  } else {
    de.push(ae, oe);
  }
  de.push(HL({
    ...ue,
    apply({
      elements: {
        floating: Ye
      },
      availableWidth: Qe,
      availableHeight: gt,
      rects: ft
    }) {
      if (!$.current) {
        return;
      }
      const Ke = Ye.style;
      Ke.setProperty("--available-width", `${Qe}px`);
      Ke.setProperty("--available-height", `${gt}px`);
      const en = fn(Ye).devicePixelRatio || 1;
      const {
        x: St,
        y: it,
        width: et,
        height: Wt
      } = ft.reference;
      const xt = (Math.round((St + et) * en) - Math.round(St * en)) / en;
      const Ln = (Math.round((it + Wt) * en) - Math.round(it * en)) / en;
      Ke.setProperty("--anchor-width", `${xt}px`);
      Ke.setProperty("--anchor-height", `${Ln}px`);
    }
  }), TP(Ye => ({
    element: ee.current || yt(Ye.elements.floating).createElement("div"),
    padding: p,
    offsetParent: "floating"
  }), [p]), {
    name: "transformOrigin",
    fn(Ye) {
      var Et;
      var or;
      var Rs;
      const {
        elements: Qe,
        middlewareData: gt,
        placement: ft,
        rects: Ke,
        y: en
      } = Ye;
      const St = Wr(ft);
      const it = ws(St);
      const et = ee.current;
      const Wt = ((Et = gt.arrow) == null ? undefined : Et.x) || 0;
      const xt = ((or = gt.arrow) == null ? undefined : or.y) || 0;
      const Ln = (et == null ? undefined : et.clientWidth) || 0;
      const tn = (et == null ? undefined : et.clientHeight) || 0;
      const Kt = Wt + Ln / 2;
      const ht = xt + tn / 2;
      const Zt = Math.abs(((Rs = gt.shift) == null ? undefined : Rs.y) || 0);
      const nn = Ke.reference.height / 2;
      const $t = typeof o == "function" ? o(XS(Ye, i, q)) : o;
      const Ft = Zt > $t;
      const sn = {
        top: `${Kt}px calc(100% + ${$t}px)`,
        bottom: `${Kt}px ${-$t}px`,
        left: `calc(100% + ${$t}px) ${ht}px`,
        right: `${-$t}px ${ht}px`
      }[St];
      const zt = `${Kt}px ${Ke.reference.y + nn - en}px`;
      Qe.floating.style.setProperty("--transform-origin", H && it === "y" && Ft ? zt : sn);
      return {};
    }
  }, kP, v);
  Fe(() => {
    if (!w && x) {
      x.update({
        referenceElement: null,
        floatingElement: null,
        domReferenceElement: null,
        positionReference: null
      });
    }
  }, [w, x]);
  const X = E.useMemo(() => ({
    elementResize: !f && typeof ResizeObserver !== "undefined",
    layoutShift: !f && typeof IntersectionObserver !== "undefined"
  }), [f]);
  const {
    refs: Q,
    elements: se,
    x: he,
    y: ye,
    middlewareData: pe,
    update: Se,
    placement: _e,
    context: ie,
    isPositioned: te,
    floatingStyles: be
  } = nP({
    rootContext: x,
    open: _ ? w : undefined,
    placement: L,
    middleware: de,
    strategy: r,
    whileElementsMounted: _ ? undefined : (...Ye) => HS(...Ye, X),
    nodeId: m,
    externalTree: T
  });
  const {
    sideX: ve,
    sideY: Te
  } = pe.adaptiveOrigin || Of;
  const Re = te ? r : "fixed";
  const ze = E.useMemo(() => {
    const Ye = v ? {
      position: Re,
      [ve]: he,
      [Te]: ye
    } : {
      position: Re,
      ...be
    };
    if (!te) {
      Ye.opacity = 0;
    }
    return Ye;
  }, [v, Re, ve, he, Te, ye, be, te]);
  const Be = E.useRef(null);
  Fe(() => {
    if (!w) {
      return;
    }
    const Ye = D.current;
    const Qe = typeof Ye == "function" ? Ye() : Ye;
    const ft = (KS(Qe) ? Qe.current : Qe) || null || null;
    if (ft !== Be.current) {
      Q.setPositionReference(ft);
      Be.current = ft;
    }
  }, [w, Q, N, D]);
  E.useEffect(() => {
    if (!w) {
      return;
    }
    const Ye = D.current;
    if (typeof Ye != "function" && KS(Ye) && Ye.current !== Be.current) {
      Q.setPositionReference(Ye.current);
      Be.current = Ye.current;
    }
  }, [w, Q, N, D]);
  E.useEffect(() => {
    if (_ && w && se.domReference && se.floating) {
      return HS(se.domReference, se.floating, Se, X);
    }
  }, [_, w, se, Se, X]);
  const Ue = Wr(_e);
  const We = DE(i, Ue, q);
  const lt = Po(_e) || "center";
  const dt = (kt = pe.hide) != null && !!kt.referenceHidden;
  Fe(() => {
    if (C && w && te) {
      M(Ue);
    }
  }, [C, w, te, Ue]);
  const _t = E.useMemo(() => {
    var Ye;
    var Qe;
    return {
      position: "absolute",
      top: (Ye = pe.arrow) == null ? undefined : Ye.y,
      left: (Qe = pe.arrow) == null ? undefined : Qe.x
    };
  }, [pe.arrow]);
  const Dt = ((Ge = pe.arrow) == null ? undefined : Ge.centerOffset) !== 0;
  return E.useMemo(() => ({
    positionerStyles: ze,
    arrowStyles: _t,
    arrowRef: ee,
    arrowUncentered: Dt,
    side: We,
    align: lt,
    physicalSide: Ue,
    anchorHidden: dt,
    refs: Q,
    context: ie,
    isPositioned: te,
    update: Se
  }), [ze, _t, ee, Dt, We, lt, Ue, dt, Q, ie, te, Se]);
}
function KS(e) {
  return e != null && "current" in e;
}
function Au(e) {
  if (e === "starting") {
    return F3;
  } else {
    return Xt;
  }
}
function Oh(e, n, {
  styles: r,
  transitionStatus: i,
  props: o,
  refs: u,
  hidden: h,
  inert: a = false
}) {
  const c = {
    ...r
  };
  if (a) {
    c.pointerEvents = "none";
  }
  return Je("div", e, {
    state: n,
    ref: u,
    props: [{
      role: "presentation",
      hidden: h,
      style: c
    }, Au(i), o],
    stateAttributesMapping: jo
  });
}
const AP = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    anchor: u,
    positionMethod: h = "absolute",
    side: a = "top",
    align: c = "center",
    sideOffset: d = 0,
    alignOffset: p = 0,
    collisionBoundary: f = "clipping-ancestors",
    collisionPadding: S = 5,
    arrowPadding: _ = 5,
    sticky: x = false,
    disableAnchorTracking: w = false,
    collisionAvoidance: g = tb,
    style: b,
    ...m
  } = n;
  const v = xu();
  const C = xP();
  const T = v.useState("open");
  const A = v.useState("mounted");
  const M = v.useState("trackCursorAxis");
  const R = v.useState("disableHoverablePopup");
  const I = v.useState("floatingRootContext");
  const j = v.useState("instantType");
  const W = v.useState("transitionStatus");
  const z = v.useState("hasViewport");
  const N = Mh({
    anchor: u,
    positionMethod: h,
    floatingRootContext: I,
    mounted: A,
    side: a,
    sideOffset: d,
    align: c,
    alignOffset: p,
    collisionBoundary: f,
    collisionPadding: S,
    sticky: x,
    arrowPadding: _,
    disableAnchorTracking: w,
    keepMounted: C,
    collisionAvoidance: g,
    adaptiveOrigin: z ? _b : undefined
  });
  const D = E.useMemo(() => ({
    open: T,
    side: N.side,
    align: N.align,
    anchorHidden: N.anchorHidden,
    instant: M !== "none" ? "tracking-cursor" : j
  }), [T, N.side, N.align, N.anchorHidden, M, j]);
  const $ = Oh(n, D, {
    styles: N.positionerStyles,
    transitionStatus: W,
    props: m,
    refs: [r, v.useStateSetter("positionerElement")],
    hidden: !A,
    inert: !T || M === "both" || R
  });
  return <ME.Provider value={N}>{$}</ME.Provider>;
});
const MP = {
  ...jo,
  ...xs
};
const OP = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    ...h
  } = n;
  const a = xu();
  const {
    side: c,
    align: d
  } = OE();
  const p = a.useState("open");
  const f = a.useState("instantType");
  const S = a.useState("transitionStatus");
  const _ = a.useState("popupProps");
  const x = a.useState("floatingRootContext");
  const w = a.useState("disabled");
  const g = a.useState("closeDelay");
  qr({
    open: p,
    ref: a.context.popupRef,
    onComplete() {
      var C;
      var T;
      if (p) {
        if ((T = (C = a.context).onOpenChangeComplete) != null) {
          T.call(C, true);
        }
      }
    }
  });
  gb(x, {
    enabled: !w,
    closeDelay: g
  });
  const b = a.useStateSetter("popupElement");
  return Je("div", n, {
    state: {
      open: p,
      side: c,
      align: d,
      instant: f,
      transitionStatus: S
    },
    ref: [r, a.context.popupRef, b],
    props: [_, Au(S), h],
    stateAttributesMapping: MP
  });
});
const DP = function (n) {
  const {
    delay: r,
    closeDelay: i,
    timeout: o = 400
  } = n;
  const u = E.useMemo(() => ({
    delay: r,
    closeDelay: i
  }), [r, i]);
  const h = E.useMemo(() => ({
    open: r,
    close: i
  }), [r, i]);
  return <RE.Provider value={u}><_Component3 delay={h} timeoutMs={o}>{n.children}</_Component3></RE.Provider>;
};
let IP = function (e) {
  e.popupWidth = "--popup-width";
  e.popupHeight = "--popup-height";
  return e;
}({});
function Kl(e) {
  if (zv(19)) {
    return e;
  } else if (e) {
    return "true";
  } else {
    return undefined;
  }
}
function IE(e) {
  const [n, r] = E.useState({
    current: e,
    previous: null
  });
  if (e !== n.current) {
    r({
      current: e,
      previous: n.current
    });
  }
  return n.previous;
}
function ZS(e) {
  const n = Dr(e);
  let r = parseFloat(n.width) || 0;
  let i = parseFloat(n.height) || 0;
  const o = un(e);
  const u = o ? e.offsetWidth : r;
  const h = o ? e.offsetHeight : i;
  if (Ul(r) !== u || Ul(i) !== h) {
    r = u;
    i = h;
  }
  return {
    width: r,
    height: i
  };
}
const LP = () => true;
function PP(e) {
  const {
    popupElement: n,
    positionerElement: r,
    content: i,
    mounted: o,
    enabled: u = LP,
    onMeasureLayout: h,
    onMeasureLayoutComplete: a,
    side: c,
    direction: d
  } = e;
  const p = Tu(n, true, false);
  const f = Vi();
  const S = E.useRef(null);
  const _ = E.useRef(null);
  const x = E.useRef(true);
  const w = E.useRef(Yt);
  const g = je(h);
  const b = je(a);
  const m = E.useMemo(() => {
    let v = c === "top";
    let C = c === "left";
    if (d === "rtl") {
      v = v || c === "inline-end";
      C = C || c === "inline-end";
    } else {
      v = v || c === "inline-start";
      C = C || c === "inline-start";
    }
    if (v) {
      return {
        position: "absolute",
        [c === "top" ? "bottom" : "top"]: "0",
        [C ? "right" : "left"]: "0"
      };
    } else {
      return Xt;
    }
  }, [c, d]);
  Fe(() => {
    if (!o || !u() || typeof ResizeObserver != "function") {
      w.current = Yt;
      x.current = true;
      S.current = null;
      _.current = null;
      return;
    }
    if (!n || !r) {
      return;
    }
    w.current = QS(n, m);
    const v = new ResizeObserver(N => {
      const D = N[0];
      if (D) {
        _.current = {
          width: Math.ceil(D.borderBoxSize[0].inlineSize),
          height: Math.ceil(D.borderBoxSize[0].blockSize)
        };
      }
    });
    v.observe(n);
    ff(n, "auto");
    const C = Df(n, "position", "static");
    const T = Df(n, "transform", "none");
    const A = Df(n, "scale", "1");
    const M = QS(r, {
      "--available-width": "max-content",
      "--available-height": "max-content"
    });
    function R() {
      C();
      T();
      M();
    }
    function I() {
      R();
      A();
    }
    if (g != null) {
      g();
    }
    if (x.current || S.current === null) {
      Xc(r, "max-content");
      const N = ZS(n);
      S.current = N;
      Xc(r, N);
      I();
      if (b != null) {
        b(null, N);
      }
      x.current = false;
      return () => {
        v.disconnect();
        w.current();
        w.current = Yt;
      };
    }
    ff(n, "auto");
    Xc(r, "max-content");
    const j = S.current ?? _.current;
    const W = ZS(n);
    S.current = W;
    if (!j) {
      Xc(r, W);
      I();
      if (b != null) {
        b(null, W);
      }
      return () => {
        v.disconnect();
        f.cancel();
        w.current();
        w.current = Yt;
      };
    }
    ff(n, j);
    I();
    if (b != null) {
      b(j, W);
    }
    Xc(r, W);
    const z = new AbortController();
    f.request(() => {
      ff(n, W);
      p(() => {
        n.style.setProperty("--popup-width", "auto");
        n.style.setProperty("--popup-height", "auto");
      }, z.signal);
    });
    return () => {
      v.disconnect();
      z.abort();
      f.cancel();
      w.current();
      w.current = Yt;
    };
  }, [i, n, r, p, f, u, o, g, b, m]);
}
function Df(e, n, r) {
  const i = e.style.getPropertyValue(n);
  e.style.setProperty(n, r);
  return () => {
    e.style.setProperty(n, i);
  };
}
function QS(e, n) {
  const r = [];
  for (const [i, o] of Object.entries(n)) {
    r.push(Df(e, i, o));
  }
  if (r.length) {
    return () => {
      r.forEach(i => i());
    };
  } else {
    return Yt;
  }
}
function ff(e, n) {
  const r = n === "auto" ? "auto" : `${n.width}px`;
  const i = n === "auto" ? "auto" : `${n.height}px`;
  e.style.setProperty("--popup-width", r);
  e.style.setProperty("--popup-height", i);
}
function Xc(e, n) {
  const r = n === "max-content" ? "max-content" : `${n.width}px`;
  const i = n === "max-content" ? "max-content" : `${n.height}px`;
  e.style.setProperty("--positioner-width", r);
  e.style.setProperty("--positioner-height", i);
}
function LE(e) {
  const {
    store: n,
    side: r,
    cssVars: i,
    children: o
  } = e;
  const u = Us();
  const h = n.useState("activeTriggerElement");
  const a = n.useState("activeTriggerId");
  const c = n.useState("open");
  const d = n.useState("payload");
  const p = n.useState("mounted");
  const f = n.useState("popupElement");
  const S = n.useState("positionerElement");
  const _ = IE(c ? h : null);
  const x = NP(a, d);
  const w = E.useRef(null);
  const [g, b] = E.useState(null);
  const [m, v] = E.useState(null);
  const C = E.useRef(null);
  const T = E.useRef(null);
  const A = Tu(C, true, false);
  const M = Vi();
  const [R, I] = E.useState(null);
  const [j, W] = E.useState(false);
  Fe(() => {
    n.set("hasViewport", true);
    return () => {
      n.set("hasViewport", false);
    };
  }, [n]);
  const z = je(() => {
    var U;
    var L;
    var F;
    if ((U = C.current) != null) {
      U.style.setProperty("animation", "none");
    }
    if ((L = C.current) != null) {
      L.style.setProperty("transition", "none");
    }
    if ((F = T.current) != null) {
      F.style.setProperty("display", "none");
    }
  });
  const N = je(U => {
    var L;
    var F;
    var P;
    if ((L = C.current) != null) {
      L.style.removeProperty("animation");
    }
    if ((F = C.current) != null) {
      F.style.removeProperty("transition");
    }
    if ((P = T.current) != null) {
      P.style.removeProperty("display");
    }
    if (U) {
      I(U);
    }
  });
  const D = E.useRef(null);
  Fe(() => {
    if (h && _ && h !== _ && D.current !== h && w.current) {
      b(w.current);
      W(true);
      const U = zP(_, h);
      v(U);
      M.request(() => {
        cs.flushSync(() => {
          W(false);
        });
        A(() => {
          b(null);
          I(null);
          w.current = null;
        });
      });
      D.current = h;
    }
  }, [h, _, g, A, M]);
  Fe(() => {
    const U = C.current;
    if (!U) {
      return;
    }
    const L = yt(U).createElement("div");
    for (const F of Array.from(U.childNodes)) {
      L.appendChild(F.cloneNode(true));
    }
    w.current = L;
  });
  const $ = g != null;
  let G;
  if ($) {
    G = <E.Fragment><div data-previous={true} inert={Kl(true)} ref={T} style={{
        ...(R ? {
          [i.popupWidth]: `${R.width}px`,
          [i.popupHeight]: `${R.height}px`
        } : null),
        position: "absolute"
      }} data-ending-style={j ? undefined : ""} key="previous" /><div data-current={true} ref={C} data-starting-style={j ? "" : undefined} key={x}>{o}</div></E.Fragment>;
  } else {
    G = <div data-current={true} ref={C} key={x}>{o}</div>;
  }
  Fe(() => {
    const U = T.current;
    if (!!U && !!g) {
      U.replaceChildren(...Array.from(g.childNodes));
    }
  }, [g]);
  PP({
    popupElement: f,
    positionerElement: S,
    mounted: p,
    content: d,
    onMeasureLayout: z,
    onMeasureLayoutComplete: N,
    side: r,
    direction: u
  });
  const q = {
    activationDirection: BP(m),
    transitioning: $
  };
  return {
    children: G,
    state: q
  };
}
function BP(e) {
  if (e) {
    return `${JS(e.horizontal, 5, "right", "left")} ${JS(e.vertical, 5, "down", "up")}`;
  }
}
function JS(e, n, r, i) {
  if (e > n) {
    return r;
  } else if (e < -n) {
    return i;
  } else {
    return "";
  }
}
function zP(e, n) {
  const r = e.getBoundingClientRect();
  const i = n.getBoundingClientRect();
  const o = {
    x: r.left + r.width / 2,
    y: r.top + r.height / 2
  };
  const u = {
    x: i.left + i.width / 2,
    y: i.top + i.height / 2
  };
  return {
    horizontal: u.x - o.x,
    vertical: u.y - o.y
  };
}
function NP(e, n) {
  const [r, i] = E.useState(0);
  const o = E.useRef(e);
  const u = E.useRef(n);
  const h = E.useRef(false);
  Fe(() => {
    const a = o.current;
    const c = u.current;
    const d = e !== a;
    const p = n !== c;
    if (d) {
      i(f => f + 1);
      h.current = !p;
    } else if (h.current && p) {
      i(f => f + 1);
      h.current = false;
    }
    o.current = e;
    u.current = n;
  }, [e, n]);
  return `${e ?? "current"}-${r}`;
}
const jP = {
  activationDirection: e => e ? {
    "data-activation-direction": e
  } : null
};
const HP = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    children: h,
    ...a
  } = n;
  const c = xu();
  const d = OE();
  const p = c.useState("instantType");
  const {
    children: f,
    state: S
  } = LE({
    store: c,
    side: d.side,
    cssVars: IP,
    children: h
  });
  const _ = {
    activationDirection: S.activationDirection,
    transitioning: S.transitioning,
    instant: p
  };
  return Je("div", n, {
    state: _,
    ref: r,
    props: [a, {
      children: f
    }],
    stateAttributesMapping: jP
  });
});
const FP = DP;
const _Component25 = dP;
function An(e) {
  return <SP data-slot="tooltip-trigger" {...e} />;
}
function Mn({
  className: e,
  align: n = "center",
  sideOffset: r = 4,
  side: i = "top",
  anchor: o,
  children: u,
  portalProps: h,
  ...a
}) {
  return <CP {...h}><AP align={n} anchor={o} className="z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] data-instant:transition-none" data-slot="tooltip-positioner" side={i} sideOffset={r}><OP className={pt("relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) text-balance rounded-md border bg-popover not-dark:bg-clip-padding text-popover-foreground text-xs shadow-md/5 transition-[width,height,scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 data-instant:duration-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]", e)} data-slot="tooltip-popup" {...a}><HP className="relative size-full overflow-clip px-(--viewport-inline-padding) py-1 [--viewport-inline-padding:--spacing(2)] data-instant:transition-none **:data-current:data-ending-style:opacity-0 **:data-current:data-starting-style:opacity-0 **:data-previous:data-ending-style:opacity-0 **:data-previous:data-starting-style:opacity-0 **:data-current:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:truncate **:data-current:opacity-100 **:data-previous:opacity-100 **:data-current:transition-opacity **:data-previous:transition-opacity" data-slot="tooltip-viewport">{u}</HP></OP></AP></CP>;
}
const ex = {};
function UP(e) {
  if (ex[e]) {
    return ex[e];
  }
  const n = ["#89b4fa", "#a6e3a1", "#f38ba8", "#f9e2af", "#cba6f7", "#94e2d5"];
  let r = 0;
  for (let i = 0; i < e.length; i++) {
    r = e.charCodeAt(i) + ((r << 5) - r);
  }
  return n[Math.abs(r) % n.length];
}
function _Component26({
  app: e,
  statusText: n,
  compact: r
}) {
  const {
    locale: i
  } = Lr();
  const [o, u] = E.useState(false);
  return <div className={`absolute inset-0 flex flex-col items-center justify-center bg-background ${r ? "gap-0" : "gap-4"}`}>{e.icon && !o ? <img src={e.icon} alt="" className={`rounded-2xl shadow-lg ${r ? "w-8 h-8" : "w-16 h-16"}`} onError={() => u(true)} /> : <div className={`rounded-2xl flex items-center justify-center font-bold text-white shadow-lg ${r ? "w-8 h-8 text-base" : "w-16 h-16 text-3xl"}`} style={{
      background: UP(e.id)
    }}>{rn(e.name, i).charAt(0).toUpperCase()}</div>}{!r && <B.Fragment><div className="flex flex-col items-center gap-1"><h2 className="text-lg font-semibold text-foreground">{rn(e.name, i)}</h2>{e.version && <span className="text-xs text-muted-foreground">v{e.version}</span>}</div><div className="flex flex-col items-center gap-2 mt-2"><div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-primary rounded-full animate-spin" /></div></B.Fragment>}</div>;
}
let tx = function (e) {
  e.disabled = "data-disabled";
  e.valid = "data-valid";
  e.invalid = "data-invalid";
  e.touched = "data-touched";
  e.dirty = "data-dirty";
  e.filled = "data-filled";
  e.focused = "data-focused";
  return e;
}({});
const Dh = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: null,
  valueMissing: false
};
const Ol = {
  valid: null,
  touched: false,
  dirty: false,
  filled: false,
  focused: false
};
const VP = {
  disabled: false,
  ...Ol
};
const Ho = {
  valid(e) {
    if (e === null) {
      return null;
    } else if (e) {
      return {
        [tx.valid]: ""
      };
    } else {
      return {
        [tx.invalid]: ""
      };
    }
  }
};
const PE = {
  invalid: undefined,
  name: undefined,
  validityData: {
    state: Dh,
    errors: [],
    error: "",
    value: "",
    initialValue: null
  },
  setValidityData: Yt,
  disabled: undefined,
  touched: Ol.touched,
  setTouched: Yt,
  dirty: Ol.dirty,
  setDirty: Yt,
  filled: Ol.filled,
  setFilled: Yt,
  focused: Ol.focused,
  setFocused: Yt,
  validate: () => null,
  validationMode: "onSubmit",
  validationDebounceTime: 0,
  shouldValidateOnChange: () => false,
  state: VP,
  markedDirtyRef: {
    current: false
  },
  registerFieldControl: Yt,
  validation: {
    getValidationProps: (e = Xt) => e,
    getInputValidationProps: (e = Xt) => e,
    inputRef: {
      current: null
    },
    commit: async () => {}
  }
};
const wb = E.createContext(PE);
function Gr(e = true) {
  const n = E.useContext(wb);
  if (n.setValidityData === Yt && !e) {
    throw new Error(Bt(28));
  }
  return n;
}
const WP = E.createContext({
  legendId: undefined,
  setLegendId: () => {},
  disabled: undefined
});
function BE(e = false) {
  const n = E.useContext(WP);
  if (!n && !e) {
    throw new Error(Bt(86));
  }
  return n;
}
const $P = E.createContext({
  formRef: {
    current: {
      fields: new Map()
    }
  },
  errors: {},
  clearErrors: Yt,
  validationMode: "onSubmit",
  submitAttemptedRef: {
    current: false
  }
});
function Pa() {
  return E.useContext($P);
}
const zE = E.createContext({
  controlId: undefined,
  registerControlId: Yt,
  labelId: undefined,
  setLabelId: Yt,
  messageIds: [],
  setMessageIds: Yt,
  getDescriptionProps: e => e
});
function Cs() {
  return E.useContext(zE);
}
const _Component5 = function (n) {
  const r = $n();
  const i = n.controlId === undefined ? r : n.controlId;
  const [o, u] = E.useState(i);
  const [h, a] = E.useState(n.labelId);
  const [c, d] = E.useState([]);
  const p = sr(() => new Map());
  const {
    messageIds: f
  } = Cs();
  const S = je((w, g) => {
    const b = p.current;
    if (g === undefined) {
      b.delete(w);
      return;
    }
    b.set(w, g);
    u(m => {
      if (b.size === 0) {
        return;
      }
      let v;
      for (const C of b.values()) {
        if (m !== undefined && C === m) {
          return m;
        }
        if (v === undefined) {
          v = C;
        }
      }
      return v;
    });
  });
  const _ = E.useCallback(w => Sn({
    "aria-describedby": f.concat(c).join(" ") || undefined
  }, w), [f, c]);
  const x = E.useMemo(() => ({
    controlId: o,
    registerControlId: S,
    labelId: h,
    setLabelId: a,
    messageIds: c,
    setMessageIds: d,
    getDescriptionProps: _
  }), [o, S, h, a, c, d, _]);
  return <zE.Provider value={x}>{n.children}</zE.Provider>;
};
function GP(e, n, r, i = true, o) {
  const [u, h] = E.useState();
  const a = $n(o ? `${o}-label` : undefined);
  const c = e ?? n ?? u;
  Fe(() => {
    const d = e || n || !i ? undefined : YP(r.current, a);
    if (u !== d) {
      h(d);
    }
  });
  return c;
}
function YP(e, n) {
  const r = XP(e);
  if (r) {
    if (!r.id && n) {
      r.id = n;
    }
    return r.id || undefined;
  }
}
function XP(e) {
  if (!e) {
    return;
  }
  const n = e.parentElement;
  if (n && n.tagName === "LABEL") {
    return n;
  }
  const r = e.id;
  if (r) {
    const o = e.nextElementSibling;
    if (o && o.htmlFor === r) {
      return o;
    }
  }
  const i = e.labels;
  return i && i[0];
}
function Ba(e = {}) {
  const {
    id: n,
    implicit: r = false,
    controlRef: i
  } = e;
  const {
    controlId: o,
    registerControlId: u
  } = Cs();
  const h = $n(n);
  const a = r ? o : undefined;
  const c = sr(() => Symbol("labelable-control"));
  const d = E.useRef(false);
  const p = E.useRef(n != null);
  const f = je(() => {
    if (!!d.current && u !== Yt) {
      d.current = false;
      u(c.current, undefined);
    }
  });
  Fe(() => {
    if (u === Yt) {
      return;
    }
    let S;
    if (r) {
      const _ = i == null ? undefined : i.current;
      if (Mt(_) && _.closest("label") != null) {
        S = n ?? null;
      } else {
        S = a ?? h;
      }
    } else if (n != null) {
      p.current = true;
      S = n;
    } else if (p.current) {
      S = h;
    } else {
      f();
      return;
    }
    if (S === undefined) {
      f();
      return;
    }
    d.current = true;
    u(c.current, S);
  }, [n, i, a, u, r, h, c, f]);
  E.useEffect(() => f, [f]);
  return o ?? h;
}
function KP(e, n) {
  const r = $n(e);
  Fe(() => {
    n(r);
    return () => {
      n(undefined);
    };
  }, [r, n]);
  return r;
}
function ZP(e = {}) {
  const {
    id: n,
    fallbackControlId: r,
    native: i = false,
    setLabelId: o,
    focusControl: u
  } = e;
  const {
    controlId: h,
    setLabelId: a
  } = Cs();
  const c = je(_ => {
    a(_);
    if (o != null) {
      o(_);
    }
  });
  const d = KP(n, c);
  const p = h ?? r;
  function f(_) {
    if (u) {
      u(_, p);
      return;
    }
    if (!p) {
      return;
    }
    const x = yt(_.currentTarget).getElementById(p);
    if (un(x)) {
      QP(x);
    }
  }
  function S(_) {
    const x = dn(_.nativeEvent);
    if (x == null || !x.closest("button,input,select,textarea")) {
      if (!_.defaultPrevented && _.detail > 1) {
        _.preventDefault();
      }
      if (!i) {
        f(_);
      }
    }
  }
  if (i) {
    return {
      id: d,
      htmlFor: p ?? undefined,
      onMouseDown: S
    };
  } else {
    return {
      id: d,
      onClick: S,
      onPointerDown(_) {
        _.preventDefault();
      }
    };
  }
}
function QP(e) {
  e.focus({
    focusVisible: true
  });
}
function _v(e, n) {
  return {
    ...e,
    state: {
      ...e.state,
      valid: !n && e.state.valid
    }
  };
}
const If = Object.keys(Dh);
function JP(e) {
  if (!e || e.valid || !e.valueMissing) {
    return false;
  }
  let n = false;
  for (const r of If) {
    if (r !== "valid") {
      if (r === "valueMissing") {
        n = e[r];
      }
      if (e[r]) {
        n = false;
      }
    }
  }
  return n;
}
function e4(e) {
  const {
    formRef: n,
    clearErrors: r
  } = Pa();
  const {
    setValidityData: i,
    validate: o,
    validityData: u,
    validationDebounceTime: h,
    invalid: a,
    markedDirtyRef: c,
    state: d,
    name: p,
    shouldValidateOnChange: f,
    getRegisteredFieldId: S
  } = e;
  const {
    controlId: _,
    getDescriptionProps: x
  } = Cs();
  const w = xn();
  const g = E.useRef(null);
  const b = je(async (C, T = false) => {
    const A = g.current;
    if (!A) {
      return;
    }
    function M($, G = a) {
      const q = S() ?? _;
      if (q == null) {
        return;
      }
      const U = n.current.fields.get(q);
      if (!U) {
        return;
      }
      const L = _v($, G);
      n.current.fields.set(q, {
        ...U,
        validityData: L
      });
    }
    if (T) {
      if (d.valid !== false) {
        return;
      }
      const $ = A.validity;
      if (!$.valueMissing) {
        const q = {
          value: C,
          state: {
            ...Dh,
            valid: true
          },
          error: "",
          errors: [],
          initialValue: u.initialValue
        };
        A.setCustomValidity("");
        M(q, false);
        i(q);
        return;
      }
      const G = If.reduce((q, U) => {
        q[U] = $[U];
        return q;
      }, {});
      if (!G.valid && !JP(G)) {
        return;
      }
    }
    function R($) {
      const G = If.reduce((U, L) => {
        U[L] = $.validity[L];
        return U;
      }, {});
      let q = false;
      for (const U of If) {
        if (U !== "valid") {
          if (U === "valueMissing" && G[U]) {
            q = true;
          } else if (G[U]) {
            return G;
          }
        }
      }
      if (q && !c.current) {
        G.valid = true;
        G.valueMissing = false;
      }
      return G;
    }
    w.clear();
    let I = null;
    let j = [];
    const W = R(A);
    let z;
    const N = f();
    if (A.validationMessage && !N) {
      z = A.validationMessage;
      j = [A.validationMessage];
    } else {
      const $ = Array.from(n.current.fields.values()).reduce((q, U) => {
        if (U.name) {
          q[U.name] = U.getValue();
        }
        return q;
      }, {});
      const G = o(C, $);
      if (typeof G == "object" && G !== null && "then" in G) {
        I = await G;
      } else {
        I = G;
      }
      if (I !== null) {
        W.valid = false;
        W.customError = true;
        if (Array.isArray(I)) {
          j = I;
          A.setCustomValidity(I.join(`
`));
        } else if (I) {
          j = [I];
          A.setCustomValidity(I);
        }
      } else if (N) {
        A.setCustomValidity("");
        W.customError = false;
        if (A.validationMessage) {
          z = A.validationMessage;
          j = [A.validationMessage];
        } else if (A.validity.valid && !W.valid) {
          W.valid = true;
        }
      }
    }
    const D = {
      value: C,
      state: W,
      error: z ?? (Array.isArray(I) ? I[0] : I ?? ""),
      errors: j,
      initialValue: u.initialValue
    };
    M(D);
    i(D);
  });
  const m = E.useCallback((C = {}) => Sn(x, d.valid === false ? {
    "aria-invalid": true
  } : Xt, C), [x, d.valid]);
  const v = E.useCallback((C = {}) => Sn({
    onChange(T) {
      if (T.nativeEvent.defaultPrevented) {
        return;
      }
      r(p);
      if (!f()) {
        b(T.currentTarget.value, true);
        return;
      }
      const A = T.currentTarget;
      if (A.value === "") {
        b(A.value);
        return;
      }
      w.clear();
      if (h) {
        w.start(h, () => {
          b(A.value);
        });
      } else {
        b(A.value);
      }
    }
  }, m(C)), [m, r, p, w, b, h, f]);
  return E.useMemo(() => ({
    getValidationProps: m,
    getInputValidationProps: v,
    inputRef: g,
    commit: b
  }), [m, v, b]);
}
function t4(e) {
  const {
    commit: n,
    invalid: r,
    markedDirtyRef: i,
    name: o,
    setRegisteredFieldId: u,
    setValidityData: h,
    validityData: a
  } = e;
  const {
    formRef: c
  } = Pa();
  const d = E.useRef(null);
  const p = E.useRef(null);
  const f = E.useRef(null);
  const S = je(() => {
    const b = p.current;
    if (b) {
      if (b.getValue) {
        return b.getValue();
      } else {
        return b.value;
      }
    }
  });
  const _ = je(() => {
    const b = p.current;
    if (!b) {
      return;
    }
    let m = b.value;
    if (m === undefined) {
      m = S();
    }
    i.current = true;
    n(m);
  });
  function x() {
    const b = p.current;
    if (!!b && !!b.id) {
      c.current.fields.set(b.id, {
        getValue: S,
        name: o,
        controlRef: b.controlRef ?? f,
        validityData: _v(a, r),
        validate: _
      });
    }
  }
  function w(b = (m => (m = p.current) == null ? undefined : m.id)()) {
    if (b) {
      c.current.fields.delete(b);
    }
  }
  function g() {
    const b = p.current;
    if (!b) {
      return;
    }
    let m = b.value;
    if (m === undefined) {
      m = S();
    }
    if (a.initialValue === null && m !== null) {
      h(v => ({
        ...v,
        initialValue: m
      }));
    }
  }
  Fe(() => {
    const b = p.current;
    if (!!b && !!b.id) {
      c.current.fields.set(b.id, {
        getValue: S,
        name: o,
        controlRef: b.controlRef ?? f,
        validityData: _v(a, r),
        validate: _
      });
    }
  }, [c, S, r, o, _, a]);
  Fe(() => {
    const b = c.current.fields;
    return () => {
      var v;
      const m = (v = p.current) == null ? undefined : v.id;
      if (m) {
        b.delete(m);
      }
    };
  }, [c]);
  return je((b, m) => {
    var C;
    if (!m) {
      if (d.current === b) {
        d.current = null;
        w();
        p.current = null;
        u(undefined);
      }
      return;
    }
    const v = (C = p.current) == null ? undefined : C.id;
    d.current = b;
    p.current = m;
    u(m.id);
    if (v && v !== m.id) {
      w(v);
    }
    g();
    x();
  });
}
const _Component4 = E.forwardRef(function (n, r) {
  const {
    errors: i,
    validationMode: o,
    submitAttemptedRef: u
  } = Pa();
  const {
    render: h,
    className: a,
    validate: c,
    validationDebounceTime: d = 0,
    validationMode: p = o,
    name: f,
    disabled: S = false,
    invalid: _,
    dirty: x,
    touched: w,
    actionsRef: g,
    style: b,
    ...m
  } = n;
  const {
    disabled: v
  } = BE();
  const C = je(c || (() => null));
  const T = v || S;
  const [A, M] = E.useState(false);
  const [R, I] = E.useState(false);
  const [j, W] = E.useState(false);
  const [z, N] = E.useState(false);
  const D = x ?? R;
  const $ = w ?? A;
  const G = E.useRef(false);
  const q = E.useRef(undefined);
  const U = E.useCallback(() => q.current, []);
  const L = E.useCallback(ae => {
    q.current = ae;
  }, []);
  const F = je(ae => {
    if (x === undefined) {
      if (ae) {
        G.current = true;
      }
      I(ae);
    }
  });
  const P = je(ae => {
    if (w === undefined) {
      M(ae);
    }
  });
  const V = je(() => p === "onChange" || p === "onSubmit" && u.current);
  const Z = !!f && Object.hasOwn(i, f) && i[f] !== undefined;
  const J = _ === true || Z;
  const [ne, ue] = E.useState({
    state: Dh,
    error: "",
    errors: [],
    value: null,
    initialValue: null
  });
  const ee = !J && ne.state.valid;
  const Y = E.useMemo(() => ({
    disabled: T,
    touched: $,
    dirty: D,
    valid: ee,
    filled: j,
    focused: z
  }), [T, $, D, ee, j, z]);
  const re = e4({
    setValidityData: ue,
    validate: C,
    validityData: ne,
    validationDebounceTime: d,
    invalid: J,
    markedDirtyRef: G,
    state: Y,
    name: f,
    shouldValidateOnChange: V,
    getRegisteredFieldId: U
  });
  const ce = ne.value;
  const ge = E.useCallback(() => {
    G.current = true;
    re.commit(ce);
  }, [re, ce]);
  const de = t4({
    commit: re.commit,
    invalid: J,
    markedDirtyRef: G,
    name: f,
    setRegisteredFieldId: L,
    setValidityData: ue,
    validityData: ne
  });
  E.useImperativeHandle(g, () => ({
    validate: ge
  }), [ge]);
  const me = E.useMemo(() => ({
    invalid: J,
    name: f,
    validityData: ne,
    setValidityData: ue,
    disabled: T,
    touched: $,
    setTouched: P,
    dirty: D,
    setDirty: F,
    filled: j,
    setFilled: W,
    focused: z,
    setFocused: N,
    validate: C,
    validationMode: p,
    validationDebounceTime: d,
    shouldValidateOnChange: V,
    state: Y,
    markedDirtyRef: G,
    registerFieldControl: de,
    validation: re
  }), [J, f, ne, T, $, P, D, F, j, W, z, N, C, p, d, V, Y, de, re]);
  const H = Je("div", n, {
    ref: r,
    state: Y,
    props: m,
    stateAttributesMapping: Ho
  });
  return <wb.Provider value={me}>{H}</wb.Provider>;
});
const _Component68 = E.forwardRef(function (n, r) {
  return <_Component5><_Component4 {...n} ref={r} /></_Component5>;
});
const _Component69 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    id: h,
    nativeLabel: a = true,
    ...c
  } = n;
  const d = Gr(false);
  const {
    labelId: p
  } = Cs();
  const f = E.useRef(null);
  const S = ZP({
    id: p ?? h,
    native: a
  });
  return Je("label", n, {
    ref: [r, f],
    state: d.state,
    props: [S, c],
    stateAttributesMapping: Ho
  });
});
function Hi({
  controlled: e,
  default: n,
  name: r,
  state: i = "value"
}) {
  const {
    current: o
  } = E.useRef(e !== undefined);
  const [u, h] = E.useState(n);
  const a = o ? e : u;
  const c = E.useCallback(d => {
    if (!o) {
      h(d);
    }
  }, []);
  return [a, c];
}
function Mu(e, n, r, i, o = true) {
  const {
    registerFieldControl: u
  } = Gr();
  const h = E.useRef(null);
  h.current ||= Symbol();
  Fe(() => {
    const a = h.current;
    if (!a || !o) {
      return undefined;
    } else {
      u(a, {
        controlRef: e,
        getValue: i,
        id: n,
        value: r
      });
      return () => {
        u(a, undefined);
      };
    }
  }, [e, o, i, n, u, r]);
}
const _Component6 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    id: u,
    name: h,
    value: a,
    disabled: c = false,
    onValueChange: d,
    defaultValue: p,
    autoFocus: f = false,
    style: S,
    ..._
  } = n;
  const {
    state: x,
    name: w,
    disabled: g,
    setTouched: b,
    setDirty: m,
    validityData: v,
    setFocused: C,
    setFilled: T,
    validationMode: A,
    validation: M
  } = Gr();
  const R = g || c;
  const I = w ?? h;
  const j = {
    ...x,
    disabled: R
  };
  const {
    labelId: W
  } = Cs();
  const z = Ba({
    id: u
  });
  Fe(() => {
    var F;
    const L = a != null;
    if ((F = M.inputRef.current) != null && F.value || L && a !== "") {
      T(true);
    } else if (L && a === "") {
      T(false);
    }
  }, [M.inputRef, T, a]);
  const N = E.useRef(null);
  Fe(() => {
    if (f && N.current === Hn(yt(N.current))) {
      C(true);
    }
  }, [f, C]);
  const [D] = Hi({
    controlled: a,
    default: p,
    name: "FieldControl",
    state: "value"
  });
  const $ = a !== undefined;
  const G = $ ? D : undefined;
  const q = je(() => {
    var L;
    if ((L = M.inputRef.current) == null) {
      return undefined;
    } else {
      return L.value;
    }
  });
  Mu(M.inputRef, z, G, q);
  return Je("input", n, {
    ref: [r, N],
    state: j,
    props: [{
      id: z,
      disabled: R,
      name: I,
      ref: M.inputRef,
      "aria-labelledby": W,
      autoFocus: f,
      ...($ ? {
        value: G
      } : {
        defaultValue: p
      }),
      onChange(L) {
        const F = L.currentTarget.value;
        if (d != null) {
          d(F, $e(ur, L.nativeEvent));
        }
        m(F !== v.initialValue);
        T(F !== "");
      },
      onFocus() {
        C(true);
      },
      onBlur(L) {
        b(true);
        C(false);
        if (A === "onBlur") {
          M.commit(L.currentTarget.value);
        }
      },
      onKeyDown(L) {
        if (L.currentTarget.tagName === "INPUT" && L.key === "Enter") {
          b(true);
          M.commit(L.currentTarget.value);
        }
      }
    }, M.getInputValidationProps(), _],
    stateAttributesMapping: Ho
  });
});
const o4 = E.createContext({
  disabled: false
});
function a4() {
  return E.useContext(o4);
}
const _Component7 = E.forwardRef(function (n, r) {
  return <_Component6 ref={r} {...n} />;
});
function Sb({
  className: e,
  size: n = "default",
  unstyled: r = false,
  nativeInput: i = false,
  style: o,
  ...u
}) {
  const h = pt("h-8.5 w-full min-w-0 rounded-[inherit] px-[calc(--spacing(3)-1px)] leading-8.5 outline-none [transition:background-color_5000000s_ease-in-out_0s] placeholder:text-muted-foreground/72 sm:h-7.5 sm:leading-7.5", n === "sm" && "h-7.5 px-[calc(--spacing(2.5)-1px)] leading-7.5 sm:h-6.5 sm:leading-6.5", n === "lg" && "h-9.5 leading-9.5 sm:h-8.5 sm:leading-8.5", u.type === "search" && "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none", u.type === "file" && "text-muted-foreground file:me-3 file:bg-transparent file:font-medium file:text-foreground file:text-sm");
  return <span className={pt(!r && "relative inline-flex w-full rounded-lg border border-input bg-background not-dark:bg-clip-padding text-base text-foreground shadow-xs/5 ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:has-aria-invalid:border-destructive/64 has-focus-visible:has-aria-invalid:ring-destructive/16 has-aria-invalid:border-destructive/36 has-focus-visible:border-ring has-autofill:bg-foreground/4 has-disabled:opacity-64 has-[:disabled,:focus-visible,[aria-invalid]]:shadow-none has-focus-visible:ring-[3px] sm:text-sm dark:bg-input/32 dark:has-autofill:bg-foreground/8 dark:has-aria-invalid:ring-destructive/24 dark:not-has-disabled:not-has-focus-visible:not-has-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)]", e) || undefined} data-size={n} data-slot="input-control">{i ? <input className={h} data-slot="input" size={typeof n == "number" ? n : undefined} style={typeof o == "function" ? undefined : o} {...u} /> : <_Component7 className={h} data-slot="input" size={typeof n == "number" ? n : undefined} style={o} {...u} />}</span>;
}
const wv = new Map();
function nx(e, n) {
  if (n) {
    wv.set(e, n);
  } else {
    wv.delete(e);
  }
}
const NE = "terminal-bg";
const jE = {
  opacity: 75,
  blur: 20,
  dark: false
};
let ti = null;
function xb() {
  if (ti) {
    return {
      ...ti
    };
  } else {
    return {
      ...jE
    };
  }
}
async function c4() {
  const e = await _u(NE);
  if (e && typeof e.opacity == "number" && typeof e.blur == "number") {
    ti = {
      opacity: Math.max(0, Math.min(100, e.opacity)),
      blur: Math.max(0, Math.min(30, e.blur)),
      dark: e.dark === true
    };
  } else {
    ti = {
      ...jE
    };
  }
  window.dispatchEvent(new CustomEvent("terminal-bg-changed", {
    detail: ti
  }));
  return ti;
}
async function rx(e) {
  if (!e) {
    throw new Error("settings is required");
  }
  const n = {
    ...xb()
  };
  if (e.opacity !== undefined) {
    n.opacity = Math.max(0, Math.min(100, e.opacity));
  }
  if (e.blur !== undefined) {
    n.blur = Math.max(0, Math.min(30, e.blur));
  }
  if (e.dark !== undefined) {
    n.dark = !!e.dark;
  }
  ti = n;
  await yu(NE, ti);
  window.dispatchEvent(new CustomEvent("terminal-bg-changed", {
    detail: ti
  }));
  return ti;
}
const HE = E.createContext(undefined);
function Ih(e) {
  const n = E.useContext(HE);
  if (n === undefined && !e) {
    throw new Error(Bt(33));
  }
  return n;
}
const FE = E.createContext(undefined);
function ci(e) {
  const n = E.useContext(FE);
  if (n === undefined && !e) {
    throw new Error(Bt(36));
  }
  return n;
}
const u4 = E.createContext(undefined);
function Lh(e = true) {
  const n = E.useContext(u4);
  if (n === undefined && !e) {
    throw new Error(Bt(25));
  }
  return n;
}
const UE = E.createContext(undefined);
function d4() {
  const e = E.useContext(UE);
  if (e === undefined) {
    throw new Error(Bt(30));
  }
  return e;
}
const VE = E.createContext(undefined);
function Cb(e = false) {
  const n = E.useContext(VE);
  if (n === undefined && !e) {
    throw new Error(Bt(16));
  }
  return n;
}
function f4(e) {
  const {
    focusableWhenDisabled: n,
    disabled: r,
    composite: i = false,
    tabIndex: o = 0,
    isNativeButton: u
  } = e;
  const h = i && n !== false;
  const a = i && n === false;
  return {
    props: E.useMemo(() => {
      const d = {
        onKeyDown(p) {
          if (r && n && p.key !== "Tab") {
            p.preventDefault();
          }
        }
      };
      if (!i) {
        d.tabIndex = o;
        if (!u && r) {
          d.tabIndex = n ? o : -1;
        }
      }
      if (u && (n || h) || !u && r) {
        d["aria-disabled"] = r;
      }
      if (u && (!n || a)) {
        d.disabled = r;
      }
      return d;
    }, [i, r, n, h, a, u, o])
  };
}
function Es(e = {}) {
  const {
    disabled: n = false,
    focusableWhenDisabled: r,
    tabIndex: i = 0,
    native: o = true,
    composite: u
  } = e;
  const h = E.useRef(null);
  const a = Cb(true);
  const c = u ?? a !== undefined;
  const {
    props: d
  } = f4({
    focusableWhenDisabled: r,
    disabled: n,
    composite: c,
    tabIndex: i,
    isNativeButton: o
  });
  const p = E.useCallback(() => {
    const _ = h.current;
    if (jg(_) && c && n && d.disabled === undefined && _.disabled) {
      _.disabled = false;
    }
  }, [n, d.disabled, c]);
  Fe(p, [p]);
  const f = E.useCallback((_ = {}) => {
    const {
      onClick: x,
      onMouseDown: w,
      onKeyUp: g,
      onKeyDown: b,
      onPointerDown: m,
      ...v
    } = _;
    return Sn({
      onClick(C) {
        if (n) {
          C.preventDefault();
          return;
        }
        if (x != null) {
          x(C);
        }
      },
      onMouseDown(C) {
        if (!n && w != null) {
          w(C);
        }
      },
      onKeyDown(C) {
        if (n || (Vf(C), b == null || b(C), C.baseUIHandlerPrevented)) {
          return;
        }
        const T = C.target === C.currentTarget;
        const A = C.currentTarget;
        const M = jg(A);
        const R = !o && h4(A);
        const I = T && (o ? M : !R);
        const j = C.key === "Enter";
        const W = C.key === " ";
        const z = A.getAttribute("role");
        const N = (z == null ? undefined : z.startsWith("menuitem")) || z === "option" || z === "gridcell";
        if (T && c && W) {
          if (C.defaultPrevented && N) {
            return;
          }
          C.preventDefault();
          if (R || o && M) {
            A.click();
            C.preventBaseUIHandler();
          } else if (I) {
            if (x != null) {
              x(C);
            }
            C.preventBaseUIHandler();
          }
          return;
        }
        if (I) {
          if (!o && (W || j)) {
            C.preventDefault();
          }
          if (!o && j) {
            if (x != null) {
              x(C);
            }
          }
        }
      },
      onKeyUp(C) {
        if (!n) {
          Vf(C);
          if (g != null) {
            g(C);
          }
          if (C.target === C.currentTarget && o && c && jg(C.currentTarget) && C.key === " ") {
            C.preventDefault();
            return;
          }
          if (!C.baseUIHandlerPrevented) {
            if (C.target === C.currentTarget && !o && !c && C.key === " ") {
              if (x != null) {
                x(C);
              }
            }
          }
        }
      },
      onPointerDown(C) {
        if (n) {
          C.preventDefault();
          return;
        }
        if (m != null) {
          m(C);
        }
      }
    }, o ? {
      type: "button"
    } : {
      role: "button"
    }, d, v);
  }, [n, d, c, o]);
  const S = je(_ => {
    h.current = _;
    p();
  });
  return {
    getButtonProps: f,
    buttonRef: S
  };
}
function jg(e) {
  return un(e) && e.tagName === "BUTTON";
}
function h4(e) {
  return (e == null ? undefined : e.tagName) === "A" && e != null && !!e.href;
}
function p4(e) {
  const {
    closeOnClick: n,
    highlighted: r,
    id: i,
    nodeId: o,
    store: u,
    typingRef: h,
    itemRef: a,
    itemMetadata: c
  } = e;
  const {
    events: d
  } = u.useState("floatingTreeRoot");
  const p = Lh(true);
  const f = p !== undefined;
  return E.useMemo(() => ({
    id: i,
    role: "menuitem",
    tabIndex: r ? 0 : -1,
    onKeyDown(S) {
      if (S.key === " " && h != null && h.current) {
        S.preventDefault();
      }
    },
    onMouseMove(S) {
      if (o) {
        d.emit("itemhover", {
          nodeId: o,
          target: S.currentTarget
        });
      }
    },
    onClick(S) {
      if (n) {
        d.emit("close", {
          domEvent: S,
          reason: Ra
        });
      }
    },
    onMouseUp(S) {
      if (p) {
        const _ = p.initialCursorPointRef.current;
        p.initialCursorPointRef.current = null;
        if (f && _ && Math.abs(S.clientX - _.x) <= 1 && Math.abs(S.clientY - _.y) <= 1 || f && !RC && S.button === 2) {
          return;
        }
      }
      if (a.current && u.context.allowMouseUpTriggerRef.current && (!f || S.button === 2) && (!c || c.type === "regular-item")) {
        a.current.click();
      }
    }
  }), [n, r, i, d, o, u, h, a, p, f, c]);
}
const WE = {
  type: "regular-item"
};
function Eb(e) {
  const {
    closeOnClick: n,
    disabled: r = false,
    highlighted: i,
    id: o,
    store: u,
    typingRef: h = u.context.typingRef,
    nativeButton: a,
    itemMetadata: c,
    nodeId: d
  } = e;
  const p = E.useRef(null);
  const {
    getButtonProps: f,
    buttonRef: S
  } = Es({
    disabled: r,
    focusableWhenDisabled: true,
    native: a,
    composite: true
  });
  const _ = p4({
    closeOnClick: n,
    highlighted: i,
    id: o,
    nodeId: d,
    store: u,
    typingRef: h,
    itemRef: p,
    itemMetadata: c
  });
  const x = E.useCallback(g => Sn(_, {
    onMouseEnter() {
      if (c.type === "submenu-trigger") {
        c.setActive();
      }
    }
  }, g, f), [_, f, c]);
  const w = ls(p, S);
  return E.useMemo(() => ({
    getItemProps: x,
    itemRef: w
  }), [x, w]);
}
const $E = E.createContext({
  register: () => {},
  unregister: () => {},
  subscribeMapChange: () => () => {},
  elementsRef: {
    current: []
  },
  nextIndexRef: {
    current: 0
  }
});
function m4() {
  return E.useContext($E);
}
let Rb = function (e) {
  e[e.None = 0] = "None";
  e[e.GuessFromOrder = 1] = "GuessFromOrder";
  return e;
}({});
function za(e = {}) {
  const {
    label: n,
    metadata: r,
    textRef: i,
    indexGuessBehavior: o,
    index: u
  } = e;
  const {
    register: h,
    unregister: a,
    subscribeMapChange: c,
    elementsRef: d,
    labelsRef: p,
    nextIndexRef: f
  } = m4();
  const S = E.useRef(-1);
  const [_, x] = E.useState(u ?? (o === Rb.GuessFromOrder ? () => {
    if (S.current === -1) {
      const b = f.current;
      f.current += 1;
      S.current = b;
    }
    return S.current;
  } : -1));
  const w = E.useRef(null);
  const g = E.useCallback(b => {
    var m;
    w.current = b;
    if (_ !== -1 && b !== null && (d.current[_] = b, p)) {
      const v = n !== undefined;
      p.current[_] = v ? n : ((m = i == null ? undefined : i.current) == null ? undefined : m.textContent) ?? b.textContent;
    }
  }, [_, d, p, n, i]);
  Fe(() => {
    if (u != null) {
      return;
    }
    const b = w.current;
    if (b) {
      h(b, r);
      return () => {
        a(b);
      };
    }
  }, [u, h, a, r]);
  Fe(() => {
    if (u == null) {
      return c(b => {
        var v;
        const m = w.current ? (v = b.get(w.current)) == null ? undefined : v.index : null;
        if (m != null) {
          x(m);
        }
      });
    }
  }, [u, c, x]);
  return E.useMemo(() => ({
    ref: g,
    index: _
  }), [_, g]);
}
let sx = function (e) {
  e.checked = "data-checked";
  e.unchecked = "data-unchecked";
  e.disabled = "data-disabled";
  e.highlighted = "data-highlighted";
  return e;
}({});
const qE = {
  checked(e) {
    if (e) {
      return {
        [sx.checked]: ""
      };
    } else {
      return {
        [sx.unchecked]: ""
      };
    }
  },
  ...xs
};
const _Component15 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    id: u,
    label: h,
    nativeButton: a = false,
    disabled: c = false,
    closeOnClick: d = false,
    checked: p,
    defaultChecked: f,
    onCheckedChange: S,
    style: _,
    ...x
  } = n;
  const w = za({
    label: h
  });
  const g = Ih(true);
  const b = $n(u);
  const {
    store: m
  } = ci();
  const v = m.useState("isActive", w.index);
  const C = m.useState("itemProps");
  const [T, A] = Hi({
    controlled: p,
    default: f ?? false,
    name: "MenuCheckboxItem",
    state: "checked"
  });
  const {
    getItemProps: M,
    itemRef: R
  } = Eb({
    closeOnClick: d,
    disabled: c,
    highlighted: v,
    id: b,
    store: m,
    nativeButton: a,
    nodeId: g == null ? undefined : g.context.nodeId,
    itemMetadata: WE
  });
  const I = E.useMemo(() => ({
    disabled: c,
    highlighted: v,
    checked: T
  }), [c, v, T]);
  function j(z) {
    const N = $e(Ra, z.nativeEvent, undefined, {
      preventUnmountOnClose() {}
    });
    if (S != null) {
      S(!T, N);
    }
    if (!N.isCanceled) {
      A(D => !D);
    }
  }
  const W = Je("div", n, {
    state: I,
    stateAttributesMapping: qE,
    props: [C, {
      role: "menuitemcheckbox",
      "aria-checked": T,
      onClick: j
    }, x, M],
    ref: [R, r, w.ref]
  });
  return <UE.Provider value={I}>{W}</UE.Provider>;
});
const _Component14 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    keepMounted: h = false,
    ...a
  } = n;
  const c = d4();
  const d = E.useRef(null);
  const {
    transitionStatus: p,
    setMounted: f
  } = zo(c.checked);
  qr({
    open: c.checked,
    ref: d,
    onComplete() {
      if (!c.checked) {
        f(false);
      }
    }
  });
  const S = {
    checked: c.checked,
    disabled: c.disabled,
    highlighted: c.highlighted,
    transitionStatus: p
  };
  return Je("span", n, {
    state: S,
    ref: [r, d],
    stateAttributesMapping: qE,
    props: {
      "aria-hidden": true,
      ...a
    },
    enabled: h || c.checked
  });
});
const GE = E.createContext(undefined);
function v4() {
  const e = E.useContext(GE);
  if (e === undefined) {
    throw new Error(Bt(31));
  }
  return e;
}
const _Component13 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    ...h
  } = n;
  const [a, c] = E.useState(undefined);
  const d = Je("div", n, {
    ref: r,
    props: {
      role: "group",
      "aria-labelledby": a,
      ...h
    }
  });
  return <GE.Provider value={c}>{d}</GE.Provider>;
});
const _Component16 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    id: h,
    ...a
  } = n;
  const c = $n(h);
  const d = v4();
  Fe(() => {
    d(c);
    return () => {
      d(undefined);
    };
  }, [d, c]);
  return Je("div", n, {
    ref: r,
    props: {
      id: c,
      role: "presentation",
      ...a
    }
  });
});
const _4 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    id: u,
    label: h,
    nativeButton: a = false,
    disabled: c = false,
    closeOnClick: d = true,
    style: p,
    ...f
  } = n;
  const S = za({
    label: h
  });
  const _ = Ih(true);
  const x = $n(u);
  const {
    store: w
  } = ci();
  const g = w.useState("isActive", S.index);
  const b = w.useState("itemProps");
  const {
    getItemProps: m,
    itemRef: v
  } = Eb({
    closeOnClick: d,
    disabled: c,
    highlighted: g,
    id: x,
    store: w,
    nativeButton: a,
    nodeId: _ == null ? undefined : _.context.nodeId,
    itemMetadata: WE
  });
  return Je("div", n, {
    state: {
      disabled: c,
      highlighted: g
    },
    props: [b, f, m],
    ref: [v, r, S.ref]
  });
});
const w4 = E.createContext(undefined);
function Tb(e) {
  return E.useContext(w4);
}
const zl = "ArrowUp";
const xa = "ArrowDown";
const mu = "ArrowLeft";
const Nl = "ArrowRight";
const Ou = "Home";
const Du = "End";
const YE = "PageUp";
const XE = "PageDown";
const KE = new Set([mu, Nl]);
const S4 = new Set([mu, Nl, Ou, Du]);
const ZE = new Set([zl, xa]);
const x4 = new Set([zl, xa, Ou, Du]);
const QE = new Set([...KE, ...ZE]);
const Na = new Set([...QE, Ou, Du]);
const JE = "Shift";
const C4 = "Control";
const E4 = "Alt";
const R4 = "Meta";
const T4 = new Set([JE, C4, E4, R4]);
function k4(e) {
  return un(e) && e.tagName === "INPUT";
}
function ox(e) {
  return !!k4(e) && e.selectionStart != null || !!un(e) && e.tagName === "TEXTAREA";
}
function ax(e, n, r, i) {
  if (!e || !n || !n.scrollTo) {
    return;
  }
  let o = e.scrollLeft;
  let u = e.scrollTop;
  const h = e.clientWidth < e.scrollWidth;
  const a = e.clientHeight < e.scrollHeight;
  if (h && i !== "vertical") {
    const c = lx(e, n, "left");
    const d = hf(e);
    const p = hf(n);
    if (r === "ltr") {
      if (c + n.offsetWidth + p.scrollMarginRight > e.scrollLeft + e.clientWidth - d.scrollPaddingRight) {
        o = c + n.offsetWidth + p.scrollMarginRight - e.clientWidth + d.scrollPaddingRight;
      } else if (c - p.scrollMarginLeft < e.scrollLeft + d.scrollPaddingLeft) {
        o = c - p.scrollMarginLeft - d.scrollPaddingLeft;
      }
    }
    if (r === "rtl") {
      if (c - p.scrollMarginRight < e.scrollLeft + d.scrollPaddingLeft) {
        o = c - p.scrollMarginLeft - d.scrollPaddingLeft;
      } else if (c + n.offsetWidth + p.scrollMarginRight > e.scrollLeft + e.clientWidth - d.scrollPaddingRight) {
        o = c + n.offsetWidth + p.scrollMarginRight - e.clientWidth + d.scrollPaddingRight;
      }
    }
  }
  if (a && i !== "horizontal") {
    const c = lx(e, n, "top");
    const d = hf(e);
    const p = hf(n);
    if (c - p.scrollMarginTop < e.scrollTop + d.scrollPaddingTop) {
      u = c - p.scrollMarginTop - d.scrollPaddingTop;
    } else if (c + n.offsetHeight + p.scrollMarginBottom > e.scrollTop + e.clientHeight - d.scrollPaddingBottom) {
      u = c + n.offsetHeight + p.scrollMarginBottom - e.clientHeight + d.scrollPaddingBottom;
    }
  }
  e.scrollTo({
    left: o,
    top: u,
    behavior: "auto"
  });
}
function lx(e, n, r) {
  const i = r === "left" ? "offsetLeft" : "offsetTop";
  let o = 0;
  while (n.offsetParent && (o += n[i], n.offsetParent !== e)) {
    n = n.offsetParent;
  }
  return o;
}
function hf(e) {
  const n = getComputedStyle(e);
  return {
    scrollMarginTop: parseFloat(n.scrollMarginTop) || 0,
    scrollMarginRight: parseFloat(n.scrollMarginRight) || 0,
    scrollMarginBottom: parseFloat(n.scrollMarginBottom) || 0,
    scrollMarginLeft: parseFloat(n.scrollMarginLeft) || 0,
    scrollPaddingTop: parseFloat(n.scrollPaddingTop) || 0,
    scrollPaddingRight: parseFloat(n.scrollPaddingRight) || 0,
    scrollPaddingBottom: parseFloat(n.scrollPaddingBottom) || 0,
    scrollPaddingLeft: parseFloat(n.scrollPaddingLeft) || 0
  };
}
const A4 = {
  ...jo,
  ...xs
};
const M4 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    finalFocus: h,
    ...a
  } = n;
  const {
    store: c
  } = ci();
  const {
    side: d,
    align: p
  } = Ih();
  const f = Tb() != null;
  const S = c.useState("open");
  const _ = c.useState("transitionStatus");
  const x = c.useState("popupProps");
  const w = c.useState("mounted");
  const g = c.useState("instantType");
  const b = c.useState("activeTriggerElement");
  const m = c.useState("parent");
  const v = c.useState("lastOpenChangeReason");
  const C = c.useState("rootId");
  const T = c.useState("floatingRootContext");
  const A = c.useState("floatingTreeRoot");
  const M = c.useState("closeDelay");
  const R = c.useState("activeTriggerElement");
  const I = c.useState("hoverEnabled");
  const j = c.useState("disabled");
  const W = m.type === "context-menu";
  qr({
    open: S,
    ref: c.context.popupRef,
    onComplete() {
      var G;
      var q;
      if (S) {
        if ((q = (G = c.context).onOpenChangeComplete) != null) {
          q.call(G, true);
        }
      }
    }
  });
  E.useEffect(() => {
    function G(q) {
      c.setOpen(false, $e(q.reason, q.domEvent));
    }
    A.events.on("close", G);
    return () => {
      A.events.off("close", G);
    };
  }, [A.events, c]);
  gb(T, {
    enabled: I && !j && !W && m.type !== "menubar",
    closeDelay: M
  });
  const z = E.useCallback(G => {
    c.set("popupElement", G);
  }, [c]);
  const N = {
    transitionStatus: _,
    side: d,
    align: p,
    open: S,
    nested: m.type === "menu",
    instant: g
  };
  const D = Je("div", n, {
    state: N,
    ref: [r, c.context.popupRef, z],
    stateAttributesMapping: A4,
    props: [x, {
      onKeyDown(G) {
        if (f && Na.has(G.key)) {
          G.stopPropagation();
        }
      }
    }, Au(_), a, {
      "data-rootownerid": C
    }]
  });
  let $ = m.type === undefined || W;
  if (b || m.type === "menubar" && v !== Eu) {
    $ = true;
  }
  return <_Component8 context={T} modal={W} disabled={!w} returnFocus={h === undefined ? $ : h} initialFocus={m.type !== "menu"} restoreFocus={true} externalTree={m.type !== "menubar" ? A : undefined} previousFocusableElement={R} nextFocusableElement={m.type === undefined ? c.context.triggerFocusTargetRef : undefined} beforeContentFocusGuardRef={m.type === undefined ? c.context.beforeContentFocusGuardRef : undefined}>{D}</_Component8>;
});
const eR = E.createContext(undefined);
function O4() {
  const e = E.useContext(eR);
  if (e === undefined) {
    throw new Error(Bt(32));
  }
  return e;
}
const D4 = E.forwardRef(function (n, r) {
  const {
    keepMounted: i = false,
    ...o
  } = n;
  const {
    store: u
  } = ci();
  if (u.useState("mounted") || i) {
    return <eR.Provider value={i}><_Component9 ref={r} {...o} /></eR.Provider>;
  } else {
    return null;
  }
});
function Iu(e) {
  const {
    children: n,
    elementsRef: r,
    labelsRef: i,
    onMapChange: o
  } = e;
  const u = je(o);
  const h = E.useRef(0);
  const a = sr(L4).current;
  const c = sr(I4).current;
  const [d, p] = E.useState(0);
  const f = E.useRef(d);
  const S = je((b, m) => {
    c.set(b, m ?? null);
    f.current += 1;
    p(f.current);
  });
  const _ = je(b => {
    c.delete(b);
    f.current += 1;
    p(f.current);
  });
  const x = E.useMemo(() => {
    const b = new Map();
    Array.from(c.keys()).filter(v => v.isConnected).sort(P4).forEach((v, C) => {
      const T = c.get(v) ?? {};
      b.set(v, {
        ...T,
        index: C
      });
    });
    return b;
  }, [c, d]);
  Fe(() => {
    if (typeof MutationObserver != "function" || x.size === 0) {
      return;
    }
    const b = new MutationObserver(m => {
      const v = new Set();
      const C = T => v.has(T) ? v.delete(T) : v.add(T);
      m.forEach(T => {
        T.removedNodes.forEach(C);
        T.addedNodes.forEach(C);
      });
      if (v.size === 0) {
        f.current += 1;
        p(f.current);
      }
    });
    x.forEach((m, v) => {
      if (v.parentElement) {
        b.observe(v.parentElement, {
          childList: true
        });
      }
    });
    return () => {
      b.disconnect();
    };
  }, [x]);
  Fe(() => {
    if (f.current === d) {
      if (r.current.length !== x.size) {
        r.current.length = x.size;
      }
      if (i && i.current.length !== x.size) {
        i.current.length = x.size;
      }
      h.current = x.size;
    }
    u(x);
  }, [u, x, r, i, d]);
  Fe(() => () => {
    r.current = [];
  }, [r]);
  Fe(() => () => {
    if (i) {
      i.current = [];
    }
  }, [i]);
  const w = je(b => {
    a.add(b);
    return () => {
      a.delete(b);
    };
  });
  Fe(() => {
    a.forEach(b => b(x));
  }, [a, x]);
  const g = E.useMemo(() => ({
    register: S,
    unregister: _,
    subscribeMapChange: w,
    elementsRef: r,
    labelsRef: i,
    nextIndexRef: h
  }), [S, _, w, r, i, h]);
  return <$E.Provider value={g}>{n}</$E.Provider>;
}
function I4() {
  return new Map();
}
function L4() {
  return new Set();
}
function P4(e, n) {
  const r = e.compareDocumentPosition(n);
  if (r & Node.DOCUMENT_POSITION_FOLLOWING || r & Node.DOCUMENT_POSITION_CONTAINED_BY) {
    return -1;
  } else if (r & Node.DOCUMENT_POSITION_PRECEDING || r & Node.DOCUMENT_POSITION_CONTAINS) {
    return 1;
  } else {
    return 0;
  }
}
const Ph = E.forwardRef(function (n, r) {
  const {
    cutout: i,
    ...o
  } = n;
  let u;
  if (i) {
    const h = i.getBoundingClientRect();
    u = `polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${h.left}px ${h.top}px,${h.left}px ${h.bottom}px,${h.right}px ${h.bottom}px,${h.right}px ${h.top}px,${h.left}px ${h.top}px)`;
  }
  return <div ref={r} role="presentation" data-base-ui-inert="" {...o} style={{
    position: "fixed",
    inset: 0,
    userSelect: "none",
    WebkitUserSelect: "none",
    clipPath: u
  }} />;
});
let cx = {};
let ux = {};
let dx = "";
function B4(e) {
  if (typeof document === "undefined") {
    return false;
  }
  const n = yt(e);
  return fn(n).innerWidth - n.documentElement.clientWidth > 0;
}
function z4(e) {
  if (typeof CSS === "undefined" || !CSS.supports || !CSS.supports("scrollbar-gutter", "stable") || typeof document === "undefined") {
    return false;
  }
  const r = yt(e);
  const i = r.documentElement;
  const o = r.body;
  const u = Lo(i) ? i : o;
  const h = u.style.overflowY;
  const a = i.style.scrollbarGutter;
  i.style.scrollbarGutter = "stable";
  u.style.overflowY = "scroll";
  const c = u.offsetWidth;
  u.style.overflowY = "hidden";
  const d = u.offsetWidth;
  u.style.overflowY = h;
  i.style.scrollbarGutter = a;
  return c === d;
}
function N4(e) {
  const n = yt(e);
  const r = n.documentElement;
  const i = n.body;
  const o = Lo(r) ? r : i;
  const u = {
    overflowY: o.style.overflowY,
    overflowX: o.style.overflowX
  };
  Object.assign(o.style, {
    overflowY: "hidden",
    overflowX: "hidden"
  });
  return () => {
    Object.assign(o.style, u);
  };
}
function j4(e) {
  var _;
  const n = yt(e);
  const r = n.documentElement;
  const i = n.body;
  const o = fn(r);
  let u = 0;
  let h = 0;
  let a = false;
  const c = ei.create();
  if (ch && (((_ = o.visualViewport) == null ? undefined : _.scale) ?? 1) !== 1) {
    return () => {};
  }
  function d() {
    const x = o.getComputedStyle(r);
    const w = o.getComputedStyle(i);
    const m = (x.scrollbarGutter || "").includes("both-edges") ? "stable both-edges" : "stable";
    u = r.scrollTop;
    h = r.scrollLeft;
    cx = {
      scrollbarGutter: r.style.scrollbarGutter,
      overflowY: r.style.overflowY,
      overflowX: r.style.overflowX
    };
    dx = r.style.scrollBehavior;
    ux = {
      position: i.style.position,
      height: i.style.height,
      width: i.style.width,
      boxSizing: i.style.boxSizing,
      overflowY: i.style.overflowY,
      overflowX: i.style.overflowX,
      scrollBehavior: i.style.scrollBehavior
    };
    const v = r.scrollHeight > r.clientHeight;
    const C = r.scrollWidth > r.clientWidth;
    const T = x.overflowY === "scroll" || w.overflowY === "scroll";
    const A = x.overflowX === "scroll" || w.overflowX === "scroll";
    const M = Math.max(0, o.innerWidth - i.clientWidth);
    const R = Math.max(0, o.innerHeight - i.clientHeight);
    const I = parseFloat(w.marginTop) + parseFloat(w.marginBottom);
    const j = parseFloat(w.marginLeft) + parseFloat(w.marginRight);
    const W = Lo(r) ? r : i;
    a = z4(e);
    if (a) {
      r.style.scrollbarGutter = m;
      W.style.overflowY = "hidden";
      W.style.overflowX = "hidden";
      return;
    }
    Object.assign(r.style, {
      scrollbarGutter: m,
      overflowY: "hidden",
      overflowX: "hidden"
    });
    if (v || T) {
      r.style.overflowY = "scroll";
    }
    if (C || A) {
      r.style.overflowX = "scroll";
    }
    Object.assign(i.style, {
      position: "relative",
      height: I || R ? `calc(100dvh - ${I + R}px)` : "100dvh",
      width: j || M ? `calc(100vw - ${j + M}px)` : "100vw",
      boxSizing: "border-box",
      overflow: "hidden",
      scrollBehavior: "unset"
    });
    i.scrollTop = u;
    i.scrollLeft = h;
    r.setAttribute("data-base-ui-scroll-locked", "");
    r.style.scrollBehavior = "unset";
  }
  function p() {
    Object.assign(r.style, cx);
    Object.assign(i.style, ux);
    if (!a) {
      r.scrollTop = u;
      r.scrollLeft = h;
      r.removeAttribute("data-base-ui-scroll-locked");
      r.style.scrollBehavior = dx;
    }
  }
  function f() {
    p();
    c.request(d);
  }
  d();
  const S = Tt(o, "resize", f);
  return () => {
    c.cancel();
    p();
    if (typeof o.removeEventListener == "function") {
      S();
    }
  };
}
class H4 {
  constructor() {
    tt(this, "lockCount", 0);
    tt(this, "restore", null);
    tt(this, "timeoutLock", $r.create());
    tt(this, "timeoutUnlock", $r.create());
    tt(this, "release", () => {
      this.lockCount -= 1;
      if (this.lockCount === 0 && this.restore) {
        this.timeoutUnlock.start(0, this.unlock);
      }
    });
    tt(this, "unlock", () => {
      var n;
      if (this.lockCount === 0 && this.restore) {
        if ((n = this.restore) != null) {
          n.call(this);
        }
        this.restore = null;
      }
    });
  }
  acquire(n) {
    this.lockCount += 1;
    if (this.lockCount === 1 && this.restore === null) {
      this.timeoutLock.start(0, () => this.lock(n));
    }
    return this.release;
  }
  lock(n) {
    if (this.lockCount === 0 || this.restore !== null) {
      return;
    }
    const i = yt(n).documentElement;
    const o = fn(i).getComputedStyle(i).overflowY;
    if (o === "hidden" || o === "clip") {
      this.restore = Yt;
      return;
    }
    const u = Vv || !B4(n);
    this.restore = u ? N4(n) : j4(n);
  }
}
const F4 = new H4();
function tR(e = true, n = null) {
  Fe(() => {
    if (e) {
      return F4.acquire(n);
    }
  }, [e, n]);
}
const U4 = 20;
function kb(e, n, r, i) {
  const [o, u] = E.useState(false);
  Fe(() => {
    if (!e || !n || r == null) {
      u(false);
      return;
    }
    const h = yt(r).documentElement.clientWidth;
    const a = r.offsetWidth;
    u(h > 0 && a > 0 && a >= h - U4);
  }, [e, n, r]);
  tR(e && (!n || o), i);
}
const V4 = E.forwardRef(function (n, r) {
  var he;
  const {
    anchor: i,
    positionMethod: o = "absolute",
    className: u,
    render: h,
    side: a,
    align: c,
    sideOffset: d = 0,
    alignOffset: p = 0,
    collisionBoundary: f = "clipping-ancestors",
    collisionPadding: S = 5,
    arrowPadding: _ = 5,
    sticky: x = false,
    disableAnchorTracking: w = false,
    collisionAvoidance: g = tE,
    style: b,
    ...m
  } = n;
  const {
    store: v
  } = ci();
  const C = O4();
  const T = Lh(true);
  const A = v.useState("parent");
  const M = v.useState("floatingRootContext");
  const R = v.useState("floatingTreeRoot");
  const I = v.useState("mounted");
  const j = v.useState("open");
  const W = v.useState("modal");
  const z = v.useState("openMethod");
  const N = v.useState("activeTriggerElement");
  const D = v.useState("transitionStatus");
  const $ = v.useState("positionerElement");
  const G = v.useState("instantType");
  const q = v.useState("hasViewport");
  const U = v.useState("lastOpenChangeReason");
  const L = v.useState("floatingNodeId");
  const F = v.useState("floatingParentNodeId");
  const P = M.useState("domReferenceElement");
  const V = E.useRef(null);
  const Z = Tu($, false, false);
  let J = i;
  let ne = d;
  let ue = p;
  let ee = c;
  let Y = g;
  if (A.type === "context-menu") {
    J = i ?? ((he = A.context) == null ? undefined : he.anchor);
    ee = ee ?? "start";
    if (!a && ee !== "center") {
      ue = n.alignOffset ?? 2;
      ne = n.sideOffset ?? -5;
    }
  }
  let re = a;
  let ce = ee;
  if (A.type === "menu") {
    re = re ?? "inline-end";
    ce = ce ?? "start";
    Y = n.collisionAvoidance ?? tb;
  } else if (A.type === "menubar") {
    re = re ?? "bottom";
    ce = ce ?? "start";
  }
  const ge = A.type === "context-menu";
  const de = Mh({
    anchor: J,
    floatingRootContext: M,
    positionMethod: T ? "fixed" : o,
    mounted: I,
    side: re,
    sideOffset: ne,
    align: ce,
    alignOffset: ue,
    arrowPadding: ge ? 0 : _,
    collisionBoundary: f,
    collisionPadding: S,
    sticky: x,
    nodeId: L,
    keepMounted: C,
    disableAnchorTracking: w,
    collisionAvoidance: Y,
    shiftCrossAxis: ge && (!("side" in Y) || Y.side !== "flip"),
    externalTree: R,
    adaptiveOrigin: q ? _b : undefined
  });
  E.useEffect(() => {
    function ye(pe) {
      if (pe.open) {
        if (pe.parentNodeId === L) {
          v.set("hoverEnabled", false);
        }
        if (pe.nodeId !== L && pe.parentNodeId === v.select("floatingParentNodeId")) {
          v.setOpen(false, $e(Qc));
        }
      }
    }
    R.events.on("menuopenchange", ye);
    return () => {
      R.events.off("menuopenchange", ye);
    };
  }, [v, R.events, L]);
  E.useEffect(() => {
    if (v.select("floatingParentNodeId") == null) {
      return;
    }
    function ye(pe) {
      if (pe.open || pe.nodeId !== v.select("floatingParentNodeId")) {
        return;
      }
      const Se = pe.reason ?? Qc;
      v.setOpen(false, $e(Se));
    }
    R.events.on("menuopenchange", ye);
    return () => {
      R.events.off("menuopenchange", ye);
    };
  }, [R.events, v]);
  const me = xn();
  E.useEffect(() => {
    if (!j) {
      me.clear();
    }
  }, [j, me]);
  E.useEffect(() => {
    function ye(pe) {
      if (!!j && pe.nodeId === v.select("floatingParentNodeId")) {
        if (pe.target && N && N !== pe.target) {
          const Se = v.select("closeDelay");
          if (Se > 0) {
            if (!me.isStarted()) {
              me.start(Se, () => {
                v.setOpen(false, $e(Qc));
              });
            }
          } else {
            v.setOpen(false, $e(Qc));
          }
        } else {
          me.clear();
        }
      }
    }
    R.events.on("itemhover", ye);
    return () => {
      R.events.off("itemhover", ye);
    };
  }, [R.events, j, N, v, me]);
  E.useEffect(() => {
    const ye = {
      open: j,
      nodeId: L,
      parentNodeId: F,
      reason: v.select("lastOpenChangeReason")
    };
    R.events.emit("menuopenchange", ye);
  }, [R.events, j, v, L, F]);
  Fe(() => {
    const ye = P;
    const pe = V.current;
    if (ye) {
      V.current = ye;
    }
    if (pe && ye && ye !== pe) {
      v.set("instantType", undefined);
      const Se = new AbortController();
      Z(() => {
        v.set("instantType", "trigger-change");
      }, Se.signal);
      return () => {
        Se.abort();
      };
    }
  }, [P, Z, v]);
  const H = {
    open: j,
    side: de.side,
    align: de.align,
    anchorHidden: de.anchorHidden,
    nested: A.type === "menu",
    instant: G
  };
  const ae = A.type === "menubar" && A.context.modal;
  kb(j && (ae || W && U !== In), z === "touch", $, N);
  const X = Oh(n, H, {
    styles: de.positionerStyles,
    transitionStatus: D,
    props: m,
    refs: [r, v.useStateSetter("positionerElement")],
    hidden: !I,
    inert: !j
  });
  const Q = I && A.type !== "menu" && (A.type !== "menubar" && W && U !== In || A.type === "menubar" && A.context.modal);
  let se = null;
  if (A.type === "menubar") {
    se = A.context.contentElement;
  } else if (A.type === undefined) {
    se = N;
  }
  return <HE.Provider value={de}>{Q && <Ph ref={A.type === "context-menu" || A.type === "nested-context-menu" ? A.context.internalBackdropRef : null} inert={Kl(!j)} cutout={se} />}<_Component0 id={L}><Iu elementsRef={v.context.itemDomElements} labelsRef={v.context.itemLabels}>{X}</Iu></_Component0></HE.Provider>;
});
const W4 = E.createContext(null);
function nR(e) {
  return E.useContext(W4);
}
function $4(e) {
  const n = E.useRef("");
  const r = E.useCallback(o => {
    if (!o.defaultPrevented) {
      n.current = o.pointerType;
      e(o, o.pointerType);
    }
  }, [e]);
  return {
    onClick: E.useCallback(o => {
      if (o.detail === 0) {
        e(o, "keyboard");
        return;
      }
      if ("pointerType" in o) {
        e(o, o.pointerType);
      } else {
        e(o, n.current);
      }
      n.current = "";
    }, [e]),
    onPointerDown: r
  };
}
function Eo(e, n) {
  const r = E.useRef(e);
  const i = je(n);
  Fe(() => {
    if (r.current !== e) {
      i(r.current);
    }
  }, [e, i]);
  Fe(() => {
    r.current = e;
  }, [e]);
}
function rR(e, n) {
  const r = je((u, h) => {
    if (!(typeof e == "function" ? e() : e)) {
      n(h || (Vv ? "touch" : ""));
    }
  });
  const {
    onClick: i,
    onPointerDown: o
  } = $4(r);
  return E.useMemo(() => ({
    onClick: i,
    onPointerDown: o
  }), [i, o]);
}
function Ab(e) {
  const [n, r] = E.useState(null);
  const i = rR(e, r);
  Eo(e, o => {
    if (o && !e) {
      r(null);
    }
  });
  return E.useMemo(() => ({
    openMethod: n,
    triggerProps: i
  }), [n, i]);
}
const q4 = {
  ...Rh,
  disabled: Me(e => e.parent.type === "menubar" && e.parent.context.disabled || e.disabled),
  modal: Me(e => (e.parent.type === undefined || e.parent.type === "context-menu") && (e.modal ?? true)),
  openMethod: Me(e => e.openMethod),
  allowMouseEnter: Me(e => e.allowMouseEnter),
  stickIfOpen: Me(e => e.stickIfOpen),
  parent: Me(e => e.parent),
  rootId: Me(e => e.parent.type === "menu" ? e.parent.store.select("rootId") : e.parent.type !== undefined ? e.parent.context.rootId : e.rootId),
  activeIndex: Me(e => e.activeIndex),
  isActive: Me((e, n) => e.activeIndex === n),
  hoverEnabled: Me(e => e.hoverEnabled),
  instantType: Me(e => e.instantType),
  lastOpenChangeReason: Me(e => e.openChangeReason),
  floatingTreeRoot: Me(e => e.parent.type === "menu" ? e.parent.store.select("floatingTreeRoot") : e.floatingTreeRoot),
  floatingNodeId: Me(e => e.floatingNodeId),
  floatingParentNodeId: Me(e => e.floatingParentNodeId),
  itemProps: Me(e => e.itemProps),
  closeDelay: Me(e => e.closeDelay),
  hasViewport: Me(e => e.hasViewport),
  keyboardEventRelay: Me(e => {
    if (e.keyboardEventRelay) {
      return e.keyboardEventRelay;
    }
    if (e.parent.type === "menu") {
      return e.parent.store.select("keyboardEventRelay");
    }
  })
};
class Bh extends Yl {
  constructor(r) {
    super({
      ...G4(),
      ...r
    }, {
      positionerRef: E.createRef(),
      popupRef: E.createRef(),
      typingRef: {
        current: false
      },
      itemDomElements: {
        current: []
      },
      itemLabels: {
        current: []
      },
      allowMouseUpTriggerRef: {
        current: false
      },
      triggerFocusTargetRef: E.createRef(),
      beforeContentFocusGuardRef: E.createRef(),
      onOpenChangeComplete: undefined,
      triggerElements: new Xl()
    }, q4);
    tt(this, "unsubscribeParentListener", null);
    this.unsubscribeParentListener = this.observe("parent", i => {
      var o;
      if ((o = this.unsubscribeParentListener) != null) {
        o.call(this);
      }
      if (i.type === "menu") {
        let u = i.store.select("rootId");
        let h = i.store.select("floatingTreeRoot");
        let a = i.store.select("keyboardEventRelay");
        this.unsubscribeParentListener = i.store.subscribe(() => {
          const c = i.store.select("rootId");
          const d = i.store.select("floatingTreeRoot");
          const p = i.store.select("keyboardEventRelay");
          if (u !== c || h !== d || a !== p) {
            u = c;
            h = d;
            a = p;
            this.notifyAll();
          }
        });
        this.context.allowMouseUpTriggerRef = i.store.context.allowMouseUpTriggerRef;
        return;
      }
      if (i.type !== undefined) {
        this.context.allowMouseUpTriggerRef = i.context.allowMouseUpTriggerRef;
      }
      this.unsubscribeParentListener = null;
    });
  }
  setOpen(r, i) {
    this.state.floatingRootContext.context.events.emit("setOpen", {
      open: r,
      eventDetails: i
    });
  }
  static useStore(r, i) {
    const o = sr(() => new Bh(i)).current;
    return r ?? o;
  }
}
function G4() {
  return {
    ...Eh(),
    disabled: false,
    modal: true,
    openMethod: null,
    allowMouseEnter: false,
    stickIfOpen: true,
    parent: {
      type: undefined
    },
    rootId: undefined,
    activeIndex: null,
    hoverEnabled: true,
    instantType: undefined,
    openChangeReason: null,
    floatingTreeRoot: new nb(),
    floatingNodeId: undefined,
    floatingParentNodeId: null,
    itemProps: Xt,
    keyboardEventRelay: undefined,
    closeDelay: 0,
    hasViewport: false
  };
}
const sR = E.createContext(undefined);
function iR() {
  return E.useContext(sR);
}
const _Component10 = Fv(function (n) {
  const {
    children: r,
    open: i,
    onOpenChange: o,
    onOpenChangeComplete: u,
    defaultOpen: h = false,
    disabled: a = false,
    modal: c,
    loopFocus: d = true,
    orientation: p = "vertical",
    actionsRef: f,
    closeParentOnEsc: S = false,
    handle: _,
    triggerId: x,
    defaultTriggerId: w = null,
    highlightItemOnHover: g = true
  } = n;
  const b = Lh(true);
  const m = ci(true);
  const v = nR(true);
  const C = iR();
  const T = E.useMemo(() => C && m ? {
    type: "menu",
    store: m.store
  } : v ? {
    type: "menubar",
    context: v
  } : b && !m ? {
    type: "context-menu",
    context: b
  } : {
    type: undefined
  }, [b, m, v, C]);
  const A = Bh.useStore(_ == null ? undefined : _.store, {
    open: h,
    openProp: i,
    activeTriggerId: w,
    triggerIdProp: x,
    parent: T
  });
  Wl(() => {
    if (i === undefined && A.state.open === false && h === true) {
      A.update({
        open: true,
        activeTriggerId: w
      });
    }
  });
  A.useControlledProp("openProp", i);
  A.useControlledProp("triggerIdProp", x);
  A.useContextCallback("onOpenChangeComplete", u);
  const M = $i();
  const R = $i();
  const I = A.useState("floatingTreeRoot");
  const j = rb(I);
  const W = qi();
  const z = A.useState("open");
  const N = A.useState("activeTriggerElement");
  const D = A.useState("positionerElement");
  const $ = A.useState("hoverEnabled");
  const G = A.useState("disabled");
  const q = A.useState("lastOpenChangeReason");
  const U = A.useState("parent");
  const L = A.useState("activeIndex");
  const F = A.useState("payload");
  const P = A.useState("floatingParentNodeId");
  const V = E.useRef(null);
  const Z = E.useRef(U.type !== "context-menu");
  const J = xn();
  const ne = E.useRef(true);
  const ue = xn();
  const ee = P != null;
  const {
    openMethod: Y,
    triggerProps: re
  } = Ab(z);
  A.useSyncedValues({
    disabled: a,
    modal: U.type === undefined ? c : undefined,
    openMethod: Y,
    rootId: M
  });
  Sh(A);
  const {
    forceUnmount: ce
  } = xh(z, A, () => {
    A.update({
      allowMouseEnter: false,
      stickIfOpen: true
    });
  });
  Fe(() => {
    if (b && !m) {
      A.update({
        parent: {
          type: "context-menu",
          context: b
        },
        floatingNodeId: j,
        floatingParentNodeId: W
      });
    } else if (m) {
      A.update({
        floatingNodeId: j,
        floatingParentNodeId: W
      });
    }
  }, [b, m, j, W, A]);
  E.useEffect(() => {
    if (!z) {
      V.current = null;
    }
    if (U.type === "context-menu") {
      if (!z) {
        J.clear();
        Z.current = false;
        return;
      }
      J.start(500, () => {
        Z.current = true;
      });
    }
  }, [J, z, U.type]);
  Fe(() => {
    if (!z && !$) {
      A.set("hoverEnabled", true);
    }
  }, [z, $, A]);
  const ge = je((ve, Te) => {
    var dt;
    const Re = Te.reason;
    if (z === ve && Te.trigger === N && q === Re || (Te.preventUnmountOnClose = () => {
      A.set("preventUnmountingOnClose", true);
    }, !ve && Te.trigger == null && (Te.trigger = N ?? undefined), o == null || o(ve, Te), Te.isCanceled)) {
      return;
    }
    A.state.floatingRootContext.dispatchOpenChange(ve, Te);
    const ze = Te.event;
    if (ve === false && (ze == null ? undefined : ze.type) === "click" && ze.pointerType === "touch" && !ne.current) {
      return;
    }
    if (!ve && L !== null) {
      const _t = A.context.itemDomElements.current[L];
      queueMicrotask(() => {
        if (_t != null) {
          _t.setAttribute("tabindex", "-1");
        }
      });
    }
    if (ve && Re === Ll) {
      ne.current = false;
      ue.start(300, () => {
        ne.current = true;
      });
    } else {
      ne.current = true;
      ue.clear();
    }
    const Be = (Re === Fi || Re === Ra) && ze.detail === 0 && (ze == null ? undefined : ze.isTrusted);
    const Ue = !ve && (Re === $l || Re == null);
    const We = {
      open: ve,
      openChangeReason: Re
    };
    V.current = Te.event ?? null;
    const lt = ((dt = Te.trigger) == null ? undefined : dt.id) ?? null;
    if (lt || ve) {
      We.activeTriggerId = lt;
      We.activeTriggerElement = Te.trigger ?? null;
    }
    A.update(We);
    if (U.type === "menubar" && (Re === Ll || Re === Ui || Re === In || Re === Xf || Re === Qc)) {
      A.set("instantType", "group");
    } else if (Be || Ue) {
      A.set("instantType", Be ? "click" : "dismiss");
    } else {
      A.set("instantType", undefined);
    }
  });
  const de = _E({
    popupStore: A,
    floatingId: R,
    nested: W != null,
    onOpenChange: ge
  });
  const me = de.context.events;
  E.useEffect(() => {
    const ve = ({
      open: Te,
      eventDetails: Re
    }) => ge(Te, Re);
    me.on("setOpen", ve);
    return () => {
      if (me != null) {
        me.off("setOpen", ve);
      }
    };
  }, [me, ge]);
  const H = E.useCallback(() => {
    A.setOpen(false, $e(mh));
  }, [A]);
  E.useImperativeHandle(f, () => ({
    unmount: ce,
    close: H
  }), [ce, H]);
  let ae;
  if (U.type === "context-menu") {
    ae = U.context;
  }
  E.useImperativeHandle(ae == null ? undefined : ae.positionerRef, () => D, [D]);
  E.useImperativeHandle(ae == null ? undefined : ae.actionsRef, () => ({
    setOpen: ge
  }), [ge]);
  const oe = Gl(de, {
    enabled: !G,
    bubbles: {
      escapeKey: S && U.type === "menu"
    },
    outsidePress() {
      var ve;
      if (U.type !== "context-menu" || ((ve = V.current) == null ? undefined : ve.type) === "contextmenu") {
        return true;
      } else {
        return Z.current;
      }
    },
    externalTree: ee ? I : undefined
  });
  const X = Us();
  const Q = E.useCallback(ve => {
    if (A.select("activeIndex") !== ve) {
      A.set("activeIndex", ve);
    }
  }, [A]);
  const se = vb(de, {
    enabled: !G,
    listRef: A.context.itemDomElements,
    activeIndex: L,
    nested: U.type !== undefined,
    loopFocus: d,
    orientation: p,
    parentOrientation: U.type === "menubar" ? U.context.orientation : undefined,
    rtl: X === "rtl",
    disabledIndices: zs,
    onNavigate: Q,
    openOnArrowKeyDown: U.type !== "context-menu",
    externalTree: ee ? I : undefined,
    focusItemOnHover: g
  });
  const he = E.useCallback(ve => {
    A.context.typingRef.current = ve;
  }, [A]);
  const ye = bb(de, {
    listRef: A.context.itemLabels,
    elementsRef: A.context.itemDomElements,
    activeIndex: L,
    resetMs: H3,
    onMatch: ve => {
      if (z && ve !== L) {
        A.set("activeIndex", ve);
      }
    },
    onTyping: he
  });
  const pe = E.useMemo(() => {
    const ve = Sn(ye.reference, se.reference, oe.reference, {
      onMouseMove() {
        A.set("allowMouseEnter", true);
      }
    }, re);
    ve["aria-haspopup"] = "menu";
    ve["aria-expanded"] = z;
    return ve;
  }, [A, ye.reference, se.reference, oe.reference, re, z]);
  const Se = E.useMemo(() => {
    const ve = Sn(se.trigger, oe.trigger, re);
    ve["aria-haspopup"] = "menu";
    ve["aria-expanded"] = false;
    return ve;
  }, [se.trigger, oe.trigger, re]);
  const _e = E.useMemo(() => Sn(No, {
    id: R,
    role: "menu",
    "aria-labelledby": N == null ? undefined : N.id,
    onMouseMove() {
      A.set("allowMouseEnter", true);
      if (U.type === "menu") {
        A.set("hoverEnabled", false);
      }
    },
    onClick() {
      if (A.select("hoverEnabled")) {
        A.set("hoverEnabled", false);
      }
    },
    onKeyDown(ve) {
      const Te = A.select("keyboardEventRelay");
      if (Te && !ve.isPropagationStopped()) {
        Te(ve);
      }
    }
  }, ye.floating, se.floating, oe.floating), [N, R, U.type, A, ye.floating, se.floating, oe.floating]);
  const ie = se.item ?? Xt;
  Ch(A, {
    floatingRootContext: de,
    activeTriggerProps: pe,
    inactiveTriggerProps: Se,
    popupProps: _e,
    itemProps: ie
  });
  const te = E.useMemo(() => ({
    store: A,
    parent: T
  }), [A, T]);
  const be = <FE.Provider value={te}>{typeof r == "function" ? r({
      payload: F
    }) : r}</FE.Provider>;
  if (U.type === undefined || U.type === "context-menu") {
    return <_Component1 externalTree={I}>{be}</_Component1>;
  } else {
    return be;
  }
});
function Y4(e) {
  const n = ci().store;
  const r = E.useMemo(() => ({
    parentMenu: n
  }), [n]);
  return <sR.Provider value={r}><_Component10 {...e} /></sR.Provider>;
}
function Mb(e) {
  const n = e.getBoundingClientRect();
  const r = fn(e);
  const i = r.getComputedStyle(e, "::before");
  const o = r.getComputedStyle(e, "::after");
  if (i.content === "none" && o.content === "none") {
    return n;
  }
  const h = parseFloat(i.width) || 0;
  const a = parseFloat(i.height) || 0;
  const c = parseFloat(o.width) || 0;
  const d = parseFloat(o.height) || 0;
  const p = Math.max(n.width, h, c);
  const f = Math.max(n.height, a, d);
  const S = p - n.width;
  const _ = f - n.height;
  return {
    left: n.left - S / 2,
    right: n.right + S / 2,
    top: n.top - _ / 2,
    bottom: n.bottom + _ / 2
  };
}
function X4(e = {}) {
  const {
    highlightItemOnHover: n,
    highlightedIndex: r,
    onHighlightedIndexChange: i
  } = Cb();
  const {
    ref: o,
    index: u
  } = za(e);
  const h = r === u;
  const a = E.useRef(null);
  const c = ls(o, a);
  return {
    compositeProps: E.useMemo(() => ({
      tabIndex: h ? 0 : -1,
      onFocus() {
        i(u);
      },
      onMouseMove() {
        const p = a.current;
        if (!n || !p) {
          return;
        }
        const f = p.hasAttribute("disabled") || p.ariaDisabled === "true";
        if (!h && !f) {
          p.focus();
        }
      }
    }), [h, i, u, n]),
    compositeRef: c,
    index: u
  };
}
function _Component11(e) {
  const {
    render: n,
    className: r,
    style: i,
    state: o = Xt,
    props: u = zs,
    refs: h = zs,
    metadata: a,
    stateAttributesMapping: c,
    tag: d = "div",
    ...p
  } = e;
  const {
    compositeProps: f,
    compositeRef: S
  } = X4({
    metadata: a
  });
  return Je(d, e, {
    state: o,
    ref: [...h, S],
    props: [f, ...u, p],
    stateAttributesMapping: c
  });
}
function lR(e) {
  if (un(e) && e.hasAttribute("data-rootownerid")) {
    return e.getAttribute("data-rootownerid") ?? undefined;
  }
  if (!si(e)) {
    return lR(oi(e));
  }
}
function cR(e, n) {
  const r = E.useRef(null);
  function i(u) {
    cs.flushSync(() => {
      e.setOpen(false, $e(Ui, u.nativeEvent, u.currentTarget));
    });
    const h = P3(r.current);
    if (h != null) {
      h.focus();
    }
  }
  function o(u) {
    var a;
    const h = e.select("positionerElement");
    if (h && Pl(u, h)) {
      if ((a = e.context.beforeContentFocusGuardRef.current) != null) {
        a.focus();
      }
    } else {
      cs.flushSync(() => {
        e.setOpen(false, $e(Ui, u.nativeEvent, u.currentTarget));
      });
      let c = L3(e.context.triggerFocusTargetRef.current || n.current);
      while (c !== null && Xe(h, c)) {
        const d = c;
        c = eb(c);
        if (c === d) {
          break;
        }
      }
      if (c != null) {
        c.focus();
      }
    }
  }
  return {
    preFocusGuardRef: r,
    handlePreFocusGuardFocus: i,
    handleFocusTargetFocus: o
  };
}
function K4(e) {
  const {
    enabled: n = true,
    mouseDownAction: r,
    open: i
  } = e;
  const o = E.useRef(false);
  return E.useMemo(() => n ? {
    onMouseDown: u => {
      if (r === "open" && !i || r === "close" && i) {
        o.current = true;
        yt(u.currentTarget).addEventListener("click", () => {
          o.current = false;
        }, {
          once: true
        });
      }
    },
    onClick: u => {
      if (o.current) {
        o.current = false;
        u.preventBaseUIHandler();
      }
    }
  } : Xt, [n, r, i]);
}
const pf = 2;
const Z4 = SC(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    disabled: h = false,
    nativeButton: a = true,
    id: c,
    openOnHover: d,
    delay: p = 100,
    closeDelay: f = 0,
    handle: S,
    payload: _,
    ...x
  } = n;
  const w = ci(true);
  const g = (S == null ? undefined : S.store) ?? (w == null ? undefined : w.store);
  if (!g) {
    throw new Error(Bt(85));
  }
  const b = $n(c);
  const m = g.useState("isTriggerActive", b);
  const v = g.useState("floatingRootContext");
  const C = g.useState("isOpenedByTrigger", b);
  const T = g.useState("triggerPopupId", b);
  const A = E.useRef(null);
  const M = J4();
  const R = Cb(true);
  const I = Bo();
  const j = E.useMemo(() => I ?? new nb(), [I]);
  const W = rb(j);
  const z = qi();
  const {
    registerTrigger: N,
    isMountedByThisTrigger: D
  } = ub(b, A, g, {
    payload: _,
    closeDelay: f,
    parent: M,
    floatingTreeRoot: j,
    floatingNodeId: W,
    floatingParentNodeId: z,
    keyboardEventRelay: R == null ? undefined : R.relayKeyboardEvent
  });
  const $ = M.type === "menubar";
  const G = g.useState("disabled");
  const q = h || G || $ && M.context.disabled;
  const {
    getButtonProps: U,
    buttonRef: L
  } = Es({
    disabled: q,
    native: a
  });
  E.useEffect(() => {
    if (!C && M.type === undefined) {
      g.context.allowMouseUpTriggerRef.current = false;
    }
  }, [g, C, M.type]);
  const F = E.useRef(null);
  const P = xn();
  const V = je(se => {
    if (!F.current) {
      return;
    }
    P.clear();
    g.context.allowMouseUpTriggerRef.current = false;
    const he = se.target;
    if (Xe(F.current, he) || Xe(g.select("positionerElement"), he) || he === F.current || he != null && lR(he) === g.select("rootId")) {
      return;
    }
    const ye = Mb(F.current);
    if (!(se.clientX >= ye.left - pf) || !(se.clientX <= ye.right + pf) || !(se.clientY >= ye.top - pf) || !(se.clientY <= ye.bottom + pf)) {
      j.events.emit("close", {
        domEvent: se,
        reason: LC
      });
    }
  });
  E.useEffect(() => {
    if (C && g.select("lastOpenChangeReason") === In) {
      yt(F.current).addEventListener("mouseup", V, {
        once: true
      });
    }
  }, [C, V, g]);
  const Z = $ && M.context.hasSubmenuOpen;
  const ne = Th(v, {
    enabled: (d ?? Z) && !q && M.type !== "context-menu" && (!$ || Z && !D),
    handleClose: Ah({
      blockPointerEvents: !$
    }),
    mouseOnly: true,
    move: false,
    restMs: M.type === undefined ? p : undefined,
    delay: {
      close: f
    },
    triggerElementRef: A,
    externalTree: j,
    isActiveTrigger: m,
    isClosing: () => g.select("transitionStatus") === "ending"
  });
  const ue = Q4(C, g.select("lastOpenChangeReason"));
  const ee = ql(v, {
    enabled: !q && M.type !== "context-menu",
    event: C && $ ? "click" : "mousedown",
    toggle: true,
    ignoreMouse: false,
    stickIfOpen: M.type === undefined ? ue : false
  });
  const Y = CE(v, {
    enabled: !q && Z
  });
  const re = K4({
    open: C,
    enabled: $,
    mouseDownAction: "open"
  });
  const ce = E.useMemo(() => Sn(Y.reference, ee.reference), [Y.reference, ee.reference]);
  const ge = g.useState("triggerProps", D);
  const {
    preFocusGuardRef: de,
    handlePreFocusGuardFocus: me,
    handleFocusTargetFocus: H
  } = cR(g, A);
  const ae = {
    disabled: q,
    open: C
  };
  const oe = [F, r, L, N, A];
  const X = [ce, ne ?? Xt, ge, {
    "aria-haspopup": "menu",
    "aria-controls": T,
    id: b,
    onMouseDown: se => {
      if (g.select("open")) {
        return;
      }
      P.start(200, () => {
        g.context.allowMouseUpTriggerRef.current = true;
      });
      yt(se.currentTarget).addEventListener("mouseup", V, {
        once: true
      });
    }
  }, $ ? {
    role: "menuitem"
  } : {}, re, x, U];
  const Q = Je("button", n, {
    enabled: !$,
    stateAttributesMapping: pu,
    state: ae,
    ref: oe,
    props: X
  });
  if ($) {
    return <_Component11 tag="button" render={i} className={o} style={u} state={ae} refs={oe} props={X} stateAttributesMapping={pu} />;
  } else if (C) {
    return <E.Fragment><Hs ref={de} onFocus={me} key={`${b}-pre-focus-guard`} /><E.Fragment key={b}>{Q}</E.Fragment><Hs ref={g.context.triggerFocusTargetRef} onFocus={H} key={`${b}-post-focus-guard`} /></E.Fragment>;
  } else {
    return <E.Fragment key={b}>{Q}</E.Fragment>;
  }
});
function Q4(e, n) {
  const r = xn();
  const [i, o] = E.useState(false);
  Fe(() => {
    if (e && n === "trigger-hover") {
      o(true);
      r.start(JC, () => {
        o(false);
      });
    } else if (!e) {
      r.clear();
      o(false);
    }
  }, [e, n, r]);
  return i;
}
function J4() {
  const e = Lh(true);
  const n = ci(true);
  const r = nR();
  return E.useMemo(() => r ? {
    type: "menubar",
    context: r
  } : e && !n ? {
    type: "context-menu",
    context: e
  } : {
    type: undefined
  }, [e, n, r]);
}
const _Component17 = E.forwardRef(function (n, r) {
  const {
    className: i,
    render: o,
    orientation: u = "horizontal",
    style: h,
    ...a
  } = n;
  return Je("div", n, {
    state: {
      orientation: u
    },
    ref: r,
    props: [{
      role: "separator",
      "aria-orientation": u
    }, a]
  });
});
function eB(e) {
  return e == null || e.hasAttribute("disabled") || e.getAttribute("aria-disabled") === "true";
}
const _Component19 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    label: h,
    id: a,
    nativeButton: c = false,
    openOnHover: d = true,
    delay: p = 100,
    closeDelay: f = 0,
    disabled: S = false,
    ..._
  } = n;
  const x = za();
  const w = Ih();
  const {
    store: g
  } = ci();
  const b = $n(a);
  const m = g.useState("open");
  const v = g.useState("floatingRootContext");
  const C = g.useState("floatingTreeRoot");
  const T = g.useState("triggerPopupId", b);
  const A = wE(b, g);
  const M = E.useCallback(ee => {
    const Y = A(ee);
    if (ee !== null && g.select("open") && g.select("activeTriggerId") == null) {
      g.update({
        activeTriggerId: b,
        activeTriggerElement: ee,
        closeDelay: f
      });
    }
    return Y;
  }, [A, f, g, b]);
  const R = E.useRef(null);
  const I = E.useCallback(ee => {
    R.current = ee;
    g.set("activeTriggerElement", ee);
  }, [g]);
  const j = iR();
  if (j == null || !j.parentMenu) {
    throw new Error(Bt(37));
  }
  g.useSyncedValue("closeDelay", f);
  const W = j.parentMenu;
  const z = W.useState("itemProps");
  const N = W.useState("isActive", x.index);
  const D = E.useMemo(() => ({
    type: "submenu-trigger",
    setActive() {
      W.set("activeIndex", x.index);
    }
  }), [W, x.index]);
  const $ = g.useState("disabled");
  const G = S || $;
  const {
    getItemProps: q,
    itemRef: U
  } = Eb({
    closeOnClick: false,
    disabled: G,
    highlighted: N,
    id: b,
    store: g,
    typingRef: W.context.typingRef,
    nativeButton: c,
    itemMetadata: D,
    nodeId: w == null ? undefined : w.context.nodeId
  });
  const L = g.useState("hoverEnabled");
  const F = W.useState("allowMouseEnter");
  const P = Th(v, {
    enabled: L && d && !G,
    handleClose: Ah({
      blockPointerEvents: true
    }),
    mouseOnly: true,
    move: true,
    restMs: p,
    delay: F ? {
      open: p,
      close: f
    } : 0,
    triggerElementRef: R,
    externalTree: C,
    isClosing: () => g.select("transitionStatus") === "ending"
  });
  const Z = ql(v, {
    enabled: !G,
    event: "mousedown",
    toggle: !d,
    ignoreMouse: d,
    stickIfOpen: false
  }).reference ?? Xt;
  const J = g.useState("triggerProps", true);
  delete J.id;
  return Je("div", n, {
    state: {
      disabled: G,
      highlighted: N,
      open: m
    },
    stateAttributesMapping: ku,
    props: [Z, P, J, z, {
      "aria-controls": T,
      tabIndex: m || N ? 0 : -1,
      onBlur() {
        if (N) {
          W.set("activeIndex", null);
        }
      }
    }, _, q],
    ref: [r, x.ref, U, M, I]
  });
});
class nB {
  constructor() {
    this.store = new Bh();
  }
  open(n) {
    const r = n ? this.store.context.triggerElements.getById(n) : undefined;
    if (n && !r) {
      throw new Error(Bt(83, n));
    }
    this.store.setOpen(true, $e("imperative-action", undefined, r));
  }
  close() {
    this.store.setOpen(false, $e("imperative-action", undefined, undefined));
  }
  get isOpen() {
    return this.store.select("open");
  }
}
function rB() {
  return new nB();
}
const sB = rB;
const _Component24 = _Component10;
const _Component12 = D4;
function Zl({
  className: e,
  children: n,
  ...r
}) {
  return <Z4 className={e} data-slot="menu-trigger" {...r}>{n}</Z4>;
}
function Fo({
  children: e,
  className: n,
  sideOffset: r = 4,
  align: i = "center",
  alignOffset: o,
  side: u = "bottom",
  anchor: h,
  portalProps: a,
  ...c
}) {
  return <_Component12 {...a}><V4 align={i} alignOffset={o} anchor={h} className="z-50" data-slot="menu-positioner" side={u} sideOffset={r}><M4 className={pt("relative flex not-[class*='w-']:min-w-32 origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] focus:outline-none dark:before:shadow-[0_-1px_--theme(--color-white/6%)]", n)} data-slot="menu-popup" {...c}><div className="max-h-(--available-height) w-full overflow-y-auto p-1">{e}</div></M4></V4></_Component12>;
}
function Ta(e) {
  return <_Component13 data-slot="menu-group" {...e} />;
}
function Fn({
  className: e,
  inset: n,
  variant: r = "default",
  ...i
}) {
  return <_4 className={pt("flex min-h-8 cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-inset:ps-8 data-[variant=destructive]:text-destructive-foreground data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&>svg:not([class*='opacity-'])]:opacity-80 [&>svg:not([class*='size-'])]:size-4.5 sm:[&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:-mx-0.5 [&>svg]:shrink-0", e)} data-inset={n} data-slot="menu-item" data-variant={r} {...i} />;
}
function _Component59({
  className: e,
  children: n,
  checked: r,
  variant: i = "default",
  ...o
}) {
  return <_Component15 checked={r} className={pt("grid min-h-8 in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default items-center gap-2 rounded-sm py-1 ps-2 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", i === "switch" ? "grid-cols-[1fr_auto] gap-4 pe-1.5" : "grid-cols-[.75rem_1fr] pe-4", e)} data-slot="menu-checkbox-item" {...o}>{i === "switch" ? <B.Fragment><span className="col-start-1">{n}</span><_Component14 className="inset-shadow-[0_1px_--theme(--color-black/4%)] inline-flex h-[calc(var(--thumb-size)+2px)] w-[calc(var(--thumb-size)*2-2px)] shrink-0 items-center rounded-full p-px outline-none transition-[background-color,box-shadow] duration-200 [--thumb-size:--spacing(4)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-checked:bg-primary data-unchecked:bg-input data-disabled:opacity-64 sm:[--thumb-size:--spacing(3)]" keepMounted={true}><span className="pointer-events-none block aspect-square h-full in-[[data-slot=menu-checkbox-item][data-checked]]:origin-[var(--thumb-size)_50%] origin-left in-[[data-slot=menu-checkbox-item][data-checked]]:translate-x-[calc(var(--thumb-size)-4px)] in-[[data-slot=menu-checkbox-item]:active]:not-data-disabled:scale-x-110 in-[[data-slot=menu-checkbox-item]:active]:rounded-[var(--thumb-size)/calc(var(--thumb-size)*1.10)] rounded-(--thumb-size) bg-background shadow-sm/5 will-change-transform [transition:translate_.15s,border-radius_.15s,scale_.1s_.1s,transform-origin_.15s]" /></_Component14></B.Fragment> : <B.Fragment><_Component14 className="col-start-1 -ms-0.5"><svg aria-hidden="true" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M5.252 12.7 10.2 18.63 18.748 5.37" /></svg></_Component14><span className="col-start-2">{n}</span></B.Fragment>}</_Component15>;
}
function Ob({
  className: e,
  inset: n,
  ...r
}) {
  return <_Component16 className={pt("px-2 py-1.5 font-medium text-muted-foreground text-xs data-inset:ps-9 sm:data-inset:ps-8", e)} data-inset={n} data-slot="menu-label" {...r} />;
}
function Fs({
  className: e,
  ...n
}) {
  return <_Component17 className={pt("mx-2 my-1 h-px bg-border", e)} data-slot="menu-separator" {...n} />;
}
function _Component53(e) {
  return <Y4 data-slot="menu-sub" {...e} />;
}
function _Component51({
  className: e,
  inset: n,
  children: r,
  ...i
}) {
  return <_Component19 className={pt("flex min-h-8 items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-popup-open:bg-accent data-inset:ps-8 data-highlighted:text-accent-foreground data-popup-open:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&>svg:not(:last-child)]:-mx-0.5 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none", e)} data-inset={n} data-slot="menu-sub-trigger" {...i}>{r}<_Component18 className="ms-auto -me-0.5 opacity-80" /></_Component19>;
}
function _Component52({
  className: e,
  sideOffset: n = 0,
  alignOffset: r,
  align: i = "start",
  ...o
}) {
  const u = i !== "center" ? -5 : undefined;
  return <Fo align={i} alignOffset={r ?? u} className={e} data-slot="menu-sub-content" side="inline-end" sideOffset={n} {...o} />;
}
const fx = {};
function Hg(e) {
  return getComputedStyle(document.documentElement).getPropertyValue(e).trim();
}
function hx() {
  if (ti && ti.dark) {
    return {
      background: "transparent",
      foreground: "#e4e4e7",
      cursor: "#e4e4e7",
      selectionBackground: "#3b82f680"
    };
  }
  return {
    background: "transparent",
    foreground: Hg("--foreground"),
    cursor: Hg("--foreground"),
    selectionBackground: Hg("--ring")
  };
}
function aB(e) {
  if (fx[e]) {
    return fx[e];
  }
  const n = ["#89b4fa", "#a6e3a1", "#f38ba8", "#f9e2af", "#cba6f7", "#94e2d5"];
  let r = 0;
  for (let i = 0; i < e.length; i++) {
    r = e.charCodeAt(i) + ((r << 5) - r);
  }
  return n[Math.abs(r) % n.length];
}
const px = [0.25, 0.5, 0.75];
// [jsos-local-terminal-spawn] 面板「终端 N」tab 的独立 xterm 容器（组件名必须大写开头，否则 JSX 会被当作字符串标签）
function JsSpawnTabView({ tabId: e, visible: n, onReady: r }) {
  const i = E.useRef(null);
  const o = E.useRef(null);
  const u = E.useRef(null);
  E.useEffect(() => {
    if (!i.current || o.current) {
      return;
    }
    const h = new P1.FitAddon();
    const a = new L1.Terminal({
      cursorBlink: true,
      convertEol: true,
      fontSize: 13,
      fontFamily: "'SF Mono', Monaco, 'Cascadia Code', monospace",
      theme: hx()
    });
    a.loadAddon(h);
    a.open(i.current);
    o.current = a;
    u.current = h;
    if (r) {
      r(a, h);
    }
    requestAnimationFrame(() => {
      try {
        h.fit();
      } catch {}
    });
    const c = d => {
      if (o.current) {
        o.current.options.theme = hx();
      }
    };
    window.addEventListener("theme-changed", c);
    window.addEventListener("terminal-bg-changed", c);
    return () => {
      window.removeEventListener("theme-changed", c);
      window.removeEventListener("terminal-bg-changed", c);
      a.dispose();
      o.current = null;
    };
  }, []);
  E.useEffect(() => {
    if (n && u.current) {
      const h = setTimeout(() => {
        try {
          u.current.fit();
        } catch {}
      }, 60);
      return () => clearTimeout(h);
    }
  }, [n]);
  return <div ref={i} className="xterm-transparent-bg" style={{
    flex: 1,
    minHeight: 0,
    overflow: "hidden",
    display: n ? "block" : "none"
  }} />;
}

function _Component105({
  window: e,
  title: n,
  isFocused: r,
  onFocus: i,
  onClose: o,
  onMinimize: u,
  onRestart: h,
  onMaximize: a,
  onMove: c,
  onResize: d,
  terminalInstances: p
}) {
  var Se;
  var _e;
  var ie;
  const {
    t: f,
    locale: S
  } = Lr();
  const _ = ou({
    pointer: "coarse"
  });
  const x = E.useRef(null);
  const w = E.useRef(null);
  const g = E.useRef(null);
  const b = E.useRef(null);
  const [m, v] = E.useState(false);
  // [jsos-local-terminal-spawn] 面板终端 tab 状态
  const [jsSpawnTabs, jsSetSpawnTabs] = E.useState([]);
  const [jsActiveTab, jsSetActiveTab] = E.useState("logs");
  const jsSpawnSeq = E.useRef(0);
  const [C, T] = E.useState(1);
  const [A, M] = E.useState(false);
  const [R, I] = E.useState([]);
  const [j, W] = E.useState(0);
  const [z, N] = E.useState("");
  const [D, $] = E.useState(false);
  const [G, q] = E.useState(0);
  const [U, L] = E.useState(xb());
  const F = E.useRef({
    navHistory: R,
    navIndex: j,
    currentUrl: z
  });
  E.useEffect(() => {
    const te = be => {
      L(be.detail);
      if (w.current) {
        w.current.options.theme = hx();
      }
    };
    window.addEventListener("terminal-bg-changed", te);
    return () => window.removeEventListener("terminal-bg-changed", te);
  }, []);
  E.useEffect(() => {
    const te = be => {
      const ve = be.detail || {};
      if (ve.windowId !== e.id) {
        return;
      }
      jsSpawnSeq.current += 1;
      const Ce = `spawn${Date.now()}_${jsSpawnSeq.current}`;
      jsSetSpawnTabs(Te => [...Te, {
        tabId: Ce,
        title: `${f("window.terminalTab")} ${jsSpawnSeq.current}`
      }]);
      jsSetActiveTab(Ce);
      v(true);
    };
    window.addEventListener("jsos-terminal-spawn", te);
    return () => window.removeEventListener("jsos-terminal-spawn", te);
  }, [e.id, f]);
  E.useEffect(() => {
    if (jsActiveTab === "logs" && g.current) {
      const te = setTimeout(() => {
        try {
          g.current.fit();
        } catch {}
      }, 60);
      return () => clearTimeout(te);
    }
  }, [jsActiveTab]);
  E.useEffect(() => {
    F.current = {
      navHistory: R,
      navIndex: j,
      currentUrl: z
    };
  });
  E.useEffect(() => {
    if (e.serverUrl) {
      let te = e.serverUrl;
      if (e.pendingRoute) {
        const be = e.pendingRouteParams && Object.keys(e.pendingRouteParams).length > 0 ? "?" + new URLSearchParams(e.pendingRouteParams).toString() : "";
        te = `${e.serverUrl.replace(/\/$/, "")}/#${e.pendingRoute}${be}`;
      }
      I([te]);
      W(0);
      N(te);
    }
  }, [e.serverUrl, e.pendingRoute]);
  E.useEffect(() => {
    if (!e.pendingNavUrl) {
      return;
    }
    const {
      navHistory: te,
      navIndex: be,
      currentUrl: ve
    } = F.current;
    if (e.pendingNavUrl === ve || te.length > 0 && te[te.length - 1] === e.pendingNavUrl) {
      return;
    }
    const Te = [...te.slice(0, be + 1), e.pendingNavUrl];
    I(Te);
    W(Te.length - 1);
    N(e.pendingNavUrl);
  }, [e.pendingNavUrl]);
  const P = ((Se = e.app) == null ? undefined : Se.type) === "cli";
  const V = E.useRef(false);
  E.useEffect(() => {
    if (!P) {
      if (e.status === "installing") {
        const te = setTimeout(() => {
          v(true);
          V.current = true;
        }, 500);
        return () => clearTimeout(te);
      } else if (V.current && e.status !== "initializing") {
        v(false);
        V.current = false;
      }
    }
  }, [P, e.status]);
  const Z = E.useRef(false);
  const J = E.useRef(false);
  const ne = E.useRef({
    x: 0,
    y: 0,
    winX: 0,
    winY: 0
  });
  const ue = E.useRef({
    x: 0,
    y: 0,
    w: 0,
    h: 0
  });
  const ee = E.useRef(null);
  const Y = E.useCallback(te => {
    var be;
    ee.current = te;
    nx((be = e.app) == null ? undefined : be.id, te);
  }, [(_e = e.app) == null ? undefined : _e.id]);
  E.useEffect(() => () => {
    var te;
    nx((te = e.app) == null ? undefined : te.id, null);
  }, [(ie = e.app) == null ? undefined : ie.id]);
  E.useEffect(() => {
    if (!A) {
      return;
    }
    const te = be => {
      var Te;
      const ve = (Te = b.current) == null ? undefined : Te.closest("[data-window-id]");
      if (ve && !ve.contains(be.target)) {
        M(false);
      }
    };
    document.addEventListener("pointerdown", te);
    return () => document.removeEventListener("pointerdown", te);
  }, [A]);
  E.useEffect(() => {
    // [wm-focus-fix] 窗口获得焦点时自动聚焦 iframe 并放行指针事件，
    // 使滚轮/键盘立即作用于应用，无需先点击一次（修复从桌面打开/切换应用后无法滚动）
    if (r) {
      if (!P && z && ee.current) {
        try {
          ee.current.contentWindow.focus();
        } catch {}
      }
      M(true);
    } else {
      M(false);
    }
  }, [r, P, z]);
  const re = E.useCallback(() => {
    if (j > 0) {
      const te = j - 1;
      W(te);
      N(R[te]);
    }
  }, [j, R]);
  const ce = E.useCallback(() => {
    if (j < R.length - 1) {
      const te = j + 1;
      W(te);
      N(R[te]);
    }
  }, [j, R]);
  const ge = E.useCallback(() => {
    if (R.length > 0) {
      W(0);
      N(R[0]);
    }
  }, [R]);
  const de = E.useCallback(() => {
    q(te => te + 1);
  }, []);
  E.useEffect(() => {
    if (!P || !e.process || !w.current) {
      return;
    }
    const te = w.current;
    const ve = e.process.input.getWriter();
    const Te = te.onData(Re => {
      ve.write(Re);
    });
    return () => {
      Te.dispose();
      ve.releaseLock();
    };
  }, [P, e.process]);
  E.useEffect(() => {
    if (!x.current || w.current) {
      return;
    }
    const te = new P1.FitAddon();
    const be = new L1.Terminal({
      cursorBlink: true,
      convertEol: true,
      fontSize: 13,
      fontFamily: "'SF Mono', Monaco, 'Cascadia Code', monospace",
      theme: hx()
    });
    be.loadAddon(te);
    be.open(x.current);
    w.current = be;
    g.current = te;
    if (p) {
      p.set(e.id, be);
    }
    requestAnimationFrame(() => {
      te.fit();
      if (P) {
        be.focus();
      }
      if (e.process && w.current) {
        const {
          cols: Te,
          rows: Re
        } = w.current;
        e.process.resize({
          cols: Te,
          rows: Re
        });
      }
    });
    const ve = Te => {
      if (w.current) {
        w.current.options.theme = hx();
      }
    };
    window.addEventListener("theme-changed", ve);
    return () => {
      window.removeEventListener("theme-changed", ve);
      if (p) {
        p.delete(e.id);
      }
      be.dispose();
      w.current = null;
    };
  }, [e.id]);
  E.useEffect(() => {
    if ((P || m) && g.current) {
      const te = setTimeout(() => {
        g.current.fit();
        if (P && e.process && w.current) {
          const {
            cols: be,
            rows: ve
          } = w.current;
          e.process.resize({
            cols: be,
            rows: ve
          });
        }
      }, 250);
      return () => clearTimeout(te);
    }
  }, [P, m, e.maximized, e.width, e.height, C, e.process]);
  const me = E.useRef(null);
  const H = E.useRef(null);
  const ae = E.useCallback(te => {
    if (te.target.tagName === "BUTTON" || te.target.closest("button") || e.maximized) {
      return;
    }
    te.preventDefault();
    Z.current = true;
    ne.current = {
      x: te.clientX,
      y: te.clientY,
      winX: e.x,
      winY: e.y
    };
    const be = Te => {
      if (!Z.current) {
        return;
      }
      const Re = Te.clientX - ne.current.x;
      const ze = Te.clientY - ne.current.y;
      H.current = {
        x: ne.current.winX + Re,
        y: ne.current.winY + ze
      };
      me.current ||= requestAnimationFrame(() => {
        me.current = null;
        if (H.current) {
          if (c != null) {
            c(e.id, H.current.x, H.current.y);
          }
          H.current = null;
        }
      });
    };
    const ve = () => {
      Z.current = false;
      if (me.current) {
        cancelAnimationFrame(me.current);
        me.current = null;
      }
      H.current = null;
      document.removeEventListener("pointermove", be);
      document.removeEventListener("pointerup", ve);
    };
    document.addEventListener("pointermove", be);
    document.addEventListener("pointerup", ve);
  }, [e.id, e.x, e.y, e.maximized, c, a]);
  const oe = E.useRef(null);
  const X = E.useRef(null);
  const Q = E.useCallback(te => {
    if (e.maximized) {
      return;
    }
    J.current = true;
    ue.current = {
      x: te.clientX,
      y: te.clientY,
      w: e.width,
      h: e.height
    };
    te.preventDefault();
    te.stopPropagation();
    const be = Te => {
      if (!J.current) {
        return;
      }
      const Re = Te.clientX - ue.current.x;
      const ze = Te.clientY - ue.current.y;
      X.current = {
        w: ue.current.w + Re,
        h: ue.current.h + ze
      };
      oe.current ||= requestAnimationFrame(() => {
        oe.current = null;
        if (X.current) {
          if (d != null) {
            d(e.id, X.current.w, X.current.h);
          }
          X.current = null;
        }
      });
    };
    const ve = () => {
      J.current = false;
      if (oe.current) {
        cancelAnimationFrame(oe.current);
        oe.current = null;
      }
      X.current = null;
      document.removeEventListener("pointermove", be);
      document.removeEventListener("pointerup", ve);
    };
    document.addEventListener("pointermove", be);
    document.addEventListener("pointerup", ve);
  }, [e.id, e.width, e.height, e.maximized, d]);
  const se = e.maximized ? {
    top: 0,
    left: 0,
    width: "100%",
    height: "100dvh",
    zIndex: e.zIndex
  } : {
    top: e.y,
    left: e.x,
    width: e.width,
    height: e.height,
    zIndex: e.zIndex
  };
  const [he, ye] = E.useState(false);
  const pe = (() => {
    const te = e.displayUrl || z;
    if (!te || !e.serverPort) {
      return te || "";
    }
    try {
      const be = new URL(te);
      return `http://localhost:${e.serverPort}${be.pathname}${be.search}${be.hash}`;
    } catch {
      return te;
    }
  })();
  return <div className={`absolute flex flex-col overflow-hidden ${e.maximized ? "" : "rounded-xl"} ${e.maximized ? "" : r ? "shadow-2xl border border-border" : "shadow-lg border border-border/50"} ${e.minimized ? "hidden" : ""}`} style={se} onPointerDown={() => {
    if (i != null) {
      i(e.id);
    }
    if (P && w.current) {
      w.current.focus();
    }
  }} onTouchStart={te => te.stopPropagation()} onContextMenu={te => te.stopPropagation()} data-window-id={e.id}><div className={`flex items-center px-3 py-2 border-b cursor-move shrink-0 ${r ? "border-border bg-card" : "border-border/50 bg-background"}`} style={{
      touchAction: "none"
    }} onPointerDown={ae}>{e.app.icon && !he ? <img src={e.app.icon} alt="" className="w-[18px] h-[18px] mr-2 rounded" onError={() => ye(true)} /> : <div className="w-[18px] h-[18px] rounded flex items-center justify-center text-[10px] font-bold text-white mr-2" style={{
        background: aB(e.appId)
      }}>{rn(e.app.name, S).charAt(0)}</div>}<span className="flex-1 text-[13px] truncate text-foreground">{n || rn(e.app.name, S)}</span><div className="flex gap-1 ml-2">{_ ? <_Component24><Zl render={<Jn size="icon-xs" className={`rounded-full !size-5 border-0 shadow-none ${r ? "bg-foreground/15 hover:bg-foreground/20" : "bg-muted-foreground/10 hover:bg-muted-foreground/20"}`} onClick={te => te.stopPropagation()} />}><_Component20 size={14} /></Zl><Fo side="bottom" align="end" sideOffset={4}>{e.allowMaximize !== false && <Fn onClick={te => {
              te.stopPropagation();
              if (a != null) {
                a(e.id);
              }
            }}>{e.maximized ? <_Component21 size={14} /> : <_Component22 size={14} />}{e.maximized ? f("window.restore") : f("window.maximize")}</Fn>}<Fn onClick={te => {
              te.stopPropagation();
              if (u != null) {
                u(e.id);
              }
            }}><R5 size={14} />{f("window.minimize")}</Fn><Fs /><Fn variant="destructive" onClick={te => {
              te.stopPropagation();
              if (o != null) {
                o(e.id);
              }
            }}><_Component23 size={14} />{f("window.close")}</Fn></Fo></_Component24> : <B.Fragment><_Component25><An render={<Jn size="icon-xs" className={`rounded-full !size-4 sm:!size-3.5 border-0 shadow-none ${r ? "bg-warning/50 hover:bg-warning/80" : "bg-muted-foreground/15 hover:bg-muted-foreground/35"}`} onClick={te => {
              te.stopPropagation();
              if (u != null) {
                u(e.id);
              }
            }} />} /><Mn side="bottom">{f("window.minimize")}</Mn></_Component25>{e.allowMaximize !== false && <_Component25><An render={<Jn size="icon-xs" className={`rounded-full !size-4 sm:!size-3.5 border-0 shadow-none ${r ? "bg-success/50 hover:bg-success/80" : "bg-muted-foreground/15 hover:bg-muted-foreground/35"}`} onClick={te => {
              te.stopPropagation();
              if (a != null) {
                a(e.id);
              }
            }} />} /><Mn side="bottom">{f("window.maximize")}</Mn></_Component25>}<_Component25><An render={<Jn size="icon-xs" className={`rounded-full !size-4 sm:!size-3.5 border-0 shadow-none ${r ? "bg-destructive/50 hover:bg-destructive/80" : "bg-muted-foreground/15 hover:bg-muted-foreground/35"}`} onClick={te => {
              te.stopPropagation();
              if (o != null) {
                o(e.id);
              }
            }} />} /><Mn side="bottom">{f("window.close")}</Mn></_Component25></B.Fragment>}</div></div><div ref={b} className="flex-1 relative overflow-hidden min-h-0">{P ? <B.Fragment><div ref={x} className="absolute inset-0" style={{
          background: `color-mix(in srgb, ${U.dark ? "#18181b" : "var(--background)"} ${U.opacity}%, transparent)`,
          backdropFilter: `blur(${U.blur}px)`,
          WebkitBackdropFilter: `blur(${U.blur}px)`
        }} />{e.status === "initializing" && <_Component26 app={e.app} statusText={e.statusText} />}{e.status === "exited" && <div className="absolute bottom-0 left-0 right-0 px-3 py-1.5 text-[11px] border-t border-border/50 bg-background/95 backdrop-blur-sm text-muted-foreground flex items-center gap-2 z-10"><div className="w-2 h-2 rounded-full bg-muted-foreground/50" /><span className="flex-1">{e.statusText || f("window.processExited")}</span><_Component25><An render={<button className="flex items-center justify-center w-5 h-5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" onClick={te => {
              te.stopPropagation();
              if (h != null) {
                h(e.id);
              }
            }} />}><_Component27 size={12} /></An><Mn side="top">{f("window.restart")}</Mn></_Component25><_Component25><An render={<button className="flex items-center justify-center w-5 h-5 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors" onClick={te => {
              te.stopPropagation();
              if (o != null) {
                o(e.id);
              }
            }} />}><_Component23 size={12} /></An><Mn side="top">{f("window.close")}</Mn></_Component25></div>}</B.Fragment> : <B.Fragment>{z ? <B.Fragment><iframe ref={Y} src={z} data-window-id={e.id} className="absolute inset-0 w-full h-full border-none bg-background" key={G} /><div className="absolute inset-0 z-10" style={{
            pointerEvents: A ? "none" : "auto"
          }} onPointerDown={() => {
            if (i != null) {
              i(e.id);
            }
            M(true);
          }} /></B.Fragment> : <_Component26 app={e.app} statusText={e.statusText} />}<div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: m ? e.height * px[C] : 0,
          opacity: m ? 1 : 0,
          pointerEvents: m ? "auto" : "none",
          backdropFilter: `blur(${U.blur}px)`,
          WebkitBackdropFilter: `blur(${U.blur}px)`,
          background: `color-mix(in srgb, ${U.dark ? "#18181b" : "var(--background)"} ${U.opacity}%, transparent)`,
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          flexDirection: "column",
          zIndex: 20,
          transition: "height 200ms ease, opacity 200ms ease"
        }}><div style={{
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            padding: "0 8px",
            borderBottom: "1px solid var(--color-border)",
            flexShrink: 0
          }}><div style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            flex: 1,
            overflow: "hidden"
          }}><button onClick={() => jsSetActiveTab("logs")} style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 8px",
              fontSize: 11,
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
              background: jsActiveTab === "logs" ? "var(--color-accent)" : "transparent",
              color: jsActiveTab === "logs" ? "var(--color-accent-foreground)" : "var(--color-muted-foreground)"
            }}>{f("window.logs")}</button>{jsSpawnTabs.map(jsTe => <div key={jsTe.tabId} onClick={() => jsSetActiveTab(jsTe.tabId)} style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "2px 8px",
              fontSize: 11,
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
              whiteSpace: "nowrap",
              background: jsActiveTab === jsTe.tabId ? "var(--color-accent)" : "transparent",
              color: jsActiveTab === jsTe.tabId ? "var(--color-accent-foreground)" : "var(--color-muted-foreground)"
            }}><span>{jsTe.title}</span><button onClick={jsEv => {
              jsEv.stopPropagation();
              const jsKey = `${e.id}::${jsTe.tabId}`;
              const jsProc = jsSpawnProcesses.get(jsKey);
              if (jsProc) {
                try {
                  jsProc.kill();
                } catch {}
                jsSpawnProcesses.delete(jsKey);
              }
              jsSetSpawnTabs(jsTs => jsTs.filter(jsT2 => jsT2.tabId !== jsTe.tabId));
              if (p) {
                p.delete(jsKey);
              }
              jsSetActiveTab(jsCur => jsCur === jsTe.tabId ? "logs" : jsCur);
            }} style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 14,
              height: 14,
              borderRadius: 2,
              border: "none",
              background: "transparent",
              color: "inherit",
              cursor: "pointer",
              padding: 0,
              opacity: .6
            }}><svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></button></div>)}</div><Tf size={12} style={{
              color: "var(--color-muted-foreground)",
              flexShrink: 0
            }} /><_Component25><An render={<button style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
                borderRadius: 4,
                border: "none",
                background: "transparent",
                color: "var(--color-muted-foreground)",
                cursor: "pointer",
                padding: 0
              }} onClick={() => T(te => (te + 1) % px.length)} onPointerDown={te => te.stopPropagation()}>{C < 2 ? <_Component28 size={12} /> : <_Component29 size={12} />}</button>}>{C === 0 ? "25%" : C === 1 ? "50%" : "75%"}</An><Mn side="top">{f(C === 0 ? "window.terminalSize50" : C === 1 ? "window.terminalSize75" : "window.terminalSize25")}</Mn></_Component25></div><div ref={x} className="xterm-transparent-bg" style={{
            flex: 1,
            minHeight: 0,
            overflow: "hidden",
            display: jsActiveTab === "logs" ? "block" : "none"
          }} />{jsSpawnTabs.map(jsTe => <JsSpawnTabView key={jsTe.tabId} tabId={jsTe.tabId} visible={jsActiveTab === jsTe.tabId} onReady={(jsTerm, jsFit) => {
            if (p) {
              p.set(`${e.id}::${jsTe.tabId}`, jsTerm);
            }
          }} />)}</div></B.Fragment>}</div>{!P && <div className="relative h-7 overflow-hidden shrink-0 border-t border-border bg-card"><div className={`absolute inset-0 flex items-center gap-1 px-2 text-[11px] transition-opacity duration-200 ${D ? "opacity-0 pointer-events-none" : "opacity-100"}`}><div className={`w-2 h-2 rounded-full ${e.status === "ready" ? "bg-success" : e.status === "error" ? "bg-destructive" : "bg-warning"}`} /><span className="flex-1 truncate text-muted-foreground">{e.statusText}</span><_Component25><An render={<Jn variant="ghost" size="icon-xs" aria-label={f("window.addressBar")} className={D ? "bg-accent text-accent-foreground" : undefined} onClick={() => $(te => !te)} />}><_Component30 size={13} /></An><Mn side="top">{f("window.addressBar")}</Mn></_Component25><_Component25><An render={<Jn variant="ghost" size="icon-xs" aria-label={f("window.logs")} className={m ? "bg-accent text-accent-foreground" : undefined} onClick={() => v(te => !te)} />}><Tf size={12} /></An><Mn side="top">{f("window.logs")}</Mn></_Component25></div><div className={`absolute inset-0 flex items-center gap-1 px-2 text-[11px] transition-opacity duration-200 ${D ? "opacity-100" : "opacity-0 pointer-events-none"}`}><_Component25><An render={<Jn variant="ghost" size="icon-xs" aria-label={f("window.back")} disabled={j <= 0} onClick={re} />}><XI size={14} /></An><Mn side="top">{f("window.back")}</Mn></_Component25><_Component25><An render={<Jn variant="ghost" size="icon-xs" aria-label={f("window.forward")} disabled={j >= R.length - 1} onClick={ce} />}><_Component18 size={14} /></An><Mn side="top">{f("window.forward")}</Mn></_Component25><_Component25><An render={<Jn variant="ghost" size="icon-xs" aria-label={f("window.home")} onClick={ge} />}><_Component31 size={14} /></An><Mn side="top">{f("window.home")}</Mn></_Component25><_Component25><An render={<Jn variant="ghost" size="icon-xs" aria-label={f("window.refresh")} onClick={de} />}><_Component27 size={14} /></An><Mn side="top">{f("window.refresh")}</Mn></_Component25><div className="flex-1 min-w-0"><Sb type="text" size="sm" value={pe} readOnly={true} className="h-5 px-1.5 bg-muted/30 border-border/50 [&>input]:text-[10px]" style={{
            height: "1.25rem",
            lineHeight: "1.25rem"
          }} aria-label={f("window.addressBar")} nativeInput={true} /></div><_Component25><An render={<Jn variant="ghost" size="icon-xs" aria-label={f("window.addressBar")} className={D ? "bg-accent text-accent-foreground" : undefined} onClick={() => $(te => !te)} />}><_Component30 size={13} /></An><Mn side="top">{f("window.addressBar")}</Mn></_Component25><_Component25><An render={<Jn variant="ghost" size="icon-xs" aria-label={f("window.logs")} className={m ? "bg-accent text-accent-foreground" : undefined} onClick={() => v(te => !te)} />}><Tf size={12} /></An><Mn side="top">{f("window.logs")}</Mn></_Component25></div></div>}{!e.maximized && <div className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize" style={{
      touchAction: "none",
      minWidth: 20,
      minHeight: 20
    }} onPointerDown={Q} />}</div>;
}
function _Component56({
  workspaces: e,
  activeWorkspaceId: n,
  onSwitch: r,
  onCreate: i,
  onRename: o,
  onDelete: u,
  homeId: h,
  popupSide: a = "top",
  compact: c = false
}) {
  const {
    t: d
  } = Lr();
  const [p, f] = E.useState(null);
  const [S, _] = E.useState("");
  const x = E.useRef(null);
  const w = E.useRef("");
  const g = e.get(n);
  const b = [...e.values()].sort((T, A) => T.createdAt - A.createdAt);
  E.useEffect(() => {
    if (p && x.current) {
      x.current.focus();
      x.current.select();
    }
  }, [p]);
  const m = E.useCallback(T => {
    w.current = T.name;
    f(T.id);
    _(T.name);
  }, []);
  const v = E.useCallback(() => {
    const T = w.current.trim();
    if (T && p) {
      o(p, T);
    }
    f(null);
  }, [p, o]);
  const C = E.useMemo(() => sB(), []);
  return <_Component24 handle={C}><_Component25><Zl render={<An render={<button className={c ? "h-8 w-8 rounded-lg flex items-center justify-center hover:bg-accent transition-colors shrink-0 text-foreground/80" : "h-8 px-2.5 rounded-lg flex items-center gap-1.5 hover:bg-accent transition-colors shrink-0 text-xs font-medium text-foreground/80"} />} />}><_Component32 size={18} />{!c && <B.Fragment><span className="max-w-[80px] truncate">{g ? g.id === h ? d("workspace.home") : g.name : d("workspace.home")}</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg></B.Fragment>}</Zl><Mn side={a}>{g ? g.id === h ? d("workspace.home") : g.name : d("workspace.home")}</Mn></_Component25><Fo side={a} sideOffset={8} className="w-56"><Ta><Ob>{d("workspace.group", {
            count: e.size
          })}</Ob></Ta><Fs />{b.map(T => {
        const A = T.id === n;
        const M = T.id === h;
        const R = p === T.id;
        return <Fn closeOnClick={false} onClick={() => {
          if (!R) {
            r(T.id);
          }
        }} key={T.id}>{M ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted-foreground"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted-foreground"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></svg>}{R ? <input ref={x} value={S} onChange={I => {
            w.current = I.target.value;
            _(I.target.value);
          }} onBlur={v} onKeyDown={I => {
            if (I.key === "Enter") {
              v();
            }
            if (I.key === "Escape") {
              f(null);
            }
          }} onClick={I => I.stopPropagation()} className="flex-1 min-w-0 bg-background border border-border rounded px-1.5 py-0.5 text-xs outline-none" /> : <span className="flex-1 min-w-0 truncate">{M ? d("workspace.home") : T.name}</span>}{A && !R && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-primary ms-auto"><polyline points="20 6 9 17 4 12" /></svg>}{!M && !A && !R && <button className="shrink-0 p-0.5 rounded hover:bg-accent text-muted-foreground hover:text-foreground ms-auto" onClick={I => {
            I.stopPropagation();
            m(T);
          }}><D5 size={12} /></button>}{!M && !A && !R && <button className="shrink-0 p-0.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive" onClick={I => {
            I.stopPropagation();
            C.close();
            u(T);
          }}><Su size={12} /></button>}</Fn>;
      })}<Fs /><Fn onClick={() => i()}><_Component33 size={14} className="shrink-0 text-muted-foreground" /><span>{d("workspace.new")}</span></Fn></Fo></_Component24>;
}
const pR = E.createContext(false);
const mR = E.createContext(undefined);
function Uo(e) {
  const n = E.useContext(mR);
  if (e === false && n === undefined) {
    throw new Error(Bt(27));
  }
  return n;
}
const uB = {
  ...jo,
  ...xs
};
const _Component43 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    forceRender: h = false,
    ...a
  } = n;
  const {
    store: c
  } = Uo();
  const d = c.useState("open");
  const p = c.useState("nested");
  const f = c.useState("mounted");
  const S = c.useState("transitionStatus");
  return Je("div", n, {
    state: {
      open: d,
      transitionStatus: S
    },
    ref: [c.context.backdropRef, r],
    stateAttributesMapping: uB,
    props: [{
      role: "presentation",
      hidden: !f,
      style: {
        userSelect: "none",
        WebkitUserSelect: "none"
      }
    }, a],
    enabled: h || !p
  });
});
const _Component75 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    disabled: h = false,
    nativeButton: a = true,
    ...c
  } = n;
  const {
    store: d
  } = Uo();
  const p = d.useState("open");
  const {
    getButtonProps: f,
    buttonRef: S
  } = Es({
    disabled: h,
    native: a
  });
  const _ = {
    disabled: h
  };
  function x(w) {
    if (p) {
      d.setOpen(false, $e(Yv, w.nativeEvent));
    }
  }
  return Je("button", n, {
    state: _,
    ref: [r, S],
    props: [{
      onClick: x
    }, c, f]
  });
});
const _Component76 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    id: h,
    ...a
  } = n;
  const {
    store: c
  } = Uo();
  const d = $n(h);
  c.useSyncedValueWithCleanup("descriptionElementId", d);
  return Je("p", n, {
    ref: r,
    props: [{
      id: d
    }, a]
  });
});
let hB = function (e) {
  e.nestedDialogs = "--nested-dialogs";
  return e;
}({});
let pB = function (e) {
  e[e.open = Ns.open] = "open";
  e[e.closed = Ns.closed] = "closed";
  e[e.startingStyle = Ns.startingStyle] = "startingStyle";
  e[e.endingStyle = Ns.endingStyle] = "endingStyle";
  e.nested = "data-nested";
  e.nestedDialogOpen = "data-nested-dialog-open";
  return e;
}({});
const vR = E.createContext(undefined);
function bR() {
  const e = E.useContext(vR);
  if (e === undefined) {
    throw new Error(Bt(26));
  }
  return e;
}
const mB = {
  ...jo,
  ...xs,
  nestedDialogOpen(e) {
    if (e) {
      return {
        [pB.nestedDialogOpen]: ""
      };
    } else {
      return null;
    }
  }
};
const _Component44 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    finalFocus: h,
    initialFocus: a,
    ...c
  } = n;
  const {
    store: d
  } = Uo();
  const p = d.useState("descriptionElementId");
  const f = d.useState("disablePointerDismissal");
  const S = d.useState("floatingRootContext");
  const _ = d.useState("popupProps");
  const x = d.useState("modal");
  const w = d.useState("mounted");
  const g = d.useState("nested");
  const b = d.useState("nestedOpenDialogCount");
  const m = d.useState("open");
  const v = d.useState("openMethod");
  const C = d.useState("titleElementId");
  const T = d.useState("transitionStatus");
  const A = d.useState("role");
  const M = S.useState("floatingId");
  const R = c.id ?? M;
  bR();
  qr({
    open: m,
    ref: d.context.popupRef,
    onComplete() {
      var $;
      var G;
      if (m) {
        if ((G = ($ = d.context).onOpenChangeComplete) != null) {
          G.call($, true);
        }
      }
    }
  });
  function I($) {
    if ($ === "touch") {
      return d.context.popupRef.current;
    } else {
      return true;
    }
  }
  const j = a === undefined ? I : a;
  const W = b > 0;
  const z = d.useStateSetter("popupElement");
  const D = Je("div", n, {
    state: {
      open: m,
      nested: g,
      transitionStatus: T,
      nestedDialogOpen: W
    },
    props: [_, {
      id: R,
      "aria-labelledby": C ?? undefined,
      "aria-describedby": p ?? undefined,
      role: A,
      ...No,
      hidden: !w,
      onKeyDown($) {
        if (Na.has($.key)) {
          $.stopPropagation();
        }
      },
      style: {
        [hB.nestedDialogs]: b
      }
    }, c],
    ref: [r, d.context.popupRef, z],
    stateAttributesMapping: mB
  });
  return <_Component8 context={S} openInteractionType={v} disabled={!w} closeOnFocusOut={!f} initialFocus={j} returnFocus={h} modal={x !== false} restoreFocus="popup">{D}</_Component8>;
});
const _R = E.forwardRef(function (n, r) {
  const {
    keepMounted: i = false,
    ...o
  } = n;
  const {
    store: u
  } = Uo();
  const h = u.useState("mounted");
  const a = u.useState("modal");
  const c = u.useState("open");
  if (h || i) {
    return <vR.Provider value={i}><_Component9 ref={r} {...o}>{h && a === true && <Ph ref={u.context.internalBackdropRef} inert={Kl(!c)} />}{n.children}</_Component9></vR.Provider>;
  } else {
    return null;
  }
});
function gB(e) {
  const {
    store: n,
    parentContext: r,
    actionsRef: i,
    isDrawer: o
  } = e;
  const u = n.useState("open");
  SE(n, u);
  Sh(n);
  const {
    forceUnmount: h
  } = xh(u, n);
  const a = E.useCallback(() => {
    n.setOpen(false, $e(mh));
  }, [n]);
  E.useImperativeHandle(i, () => ({
    unmount: h,
    close: a
  }), [h, a]);
  return {
    parentContext: r,
    isDrawer: o
  };
}
function _Component34({
  store: e,
  dialogRoot: n
}) {
  const {
    parentContext: r,
    isDrawer: i
  } = n;
  const o = e.useState("open");
  const u = e.useState("disablePointerDismissal");
  const h = e.useState("modal");
  const a = e.useState("popupElement");
  const c = e.useState("floatingRootContext");
  const [d, p] = E.useState(0);
  const [f, S] = E.useState(0);
  const _ = d === 0;
  const x = Gl(c, {
    outsidePressEvent() {
      if (e.context.internalBackdropRef.current || e.context.backdropRef.current) {
        return "intentional";
      } else {
        return {
          mouse: h === "trap-focus" ? "sloppy" : "intentional",
          touch: "sloppy"
        };
      }
    },
    outsidePress(m) {
      if (!e.context.outsidePressEnabledRef.current || "button" in m && m.button !== 0 || "touches" in m && m.touches.length !== 1) {
        return false;
      }
      const v = dn(m);
      if (_ && !u) {
        const C = v;
        if (h && (e.context.internalBackdropRef.current || e.context.backdropRef.current)) {
          return e.context.internalBackdropRef.current === C || e.context.backdropRef.current === C || Xe(C, a) && (C == null || !C.hasAttribute("data-base-ui-portal"));
        } else {
          return true;
        }
      }
      return false;
    },
    escapeKey: _
  });
  tR(o && h === true, a);
  e.useContextCallback("onNestedDialogOpen", (m, v) => {
    p(m);
    S(v);
  });
  e.useContextCallback("onNestedDialogClose", () => {
    p(0);
    S(0);
  });
  E.useEffect(() => {
    if (r != null && r.onNestedDialogOpen && o) {
      r.onNestedDialogOpen(d + 1, f + (i ? 1 : 0));
    }
    if (r != null && r.onNestedDialogClose && !o) {
      r.onNestedDialogClose();
    }
    return () => {
      if (r != null && r.onNestedDialogClose && o) {
        r.onNestedDialogClose();
      }
    };
  }, [i, o, d, f, r]);
  const w = x.reference ?? Xt;
  const g = x.trigger ?? Xt;
  const b = E.useMemo(() => Sn(No, x.floating), [x.floating]);
  Ch(e, {
    activeTriggerProps: w,
    inactiveTriggerProps: g,
    popupProps: b,
    nestedOpenDialogCount: d,
    nestedOpenDrawerCount: f
  });
  return null;
}
const bB = {
  ...Rh,
  modal: Me(e => e.modal),
  nested: Me(e => e.nested),
  nestedOpenDialogCount: Me(e => e.nestedOpenDialogCount),
  nestedOpenDrawerCount: Me(e => e.nestedOpenDrawerCount),
  disablePointerDismissal: Me(e => e.disablePointerDismissal),
  openMethod: Me(e => e.openMethod),
  descriptionElementId: Me(e => e.descriptionElementId),
  titleElementId: Me(e => e.titleElementId),
  viewportElement: Me(e => e.viewportElement),
  role: Me(e => e.role)
};
class Db extends Yl {
  constructor(r, i, o = false) {
    const u = new Xl();
    const h = yB(r);
    h.floatingRootContext = db(u, i, o);
    super(h, {
      popupRef: E.createRef(),
      backdropRef: E.createRef(),
      internalBackdropRef: E.createRef(),
      outsidePressEnabledRef: {
        current: true
      },
      triggerElements: u,
      onOpenChange: undefined,
      onOpenChangeComplete: undefined
    }, bB);
    tt(this, "setOpen", (r, i) => {
      var u;
      var h;
      i.preventUnmountOnClose = () => {
        this.set("preventUnmountingOnClose", true);
      };
      if (!r && i.trigger == null && this.state.activeTriggerId != null) {
        i.trigger = this.state.activeTriggerElement ?? undefined;
      }
      if ((h = (u = this.context).onOpenChange) != null) {
        h.call(u, r, i);
      }
      if (i.isCanceled) {
        return;
      }
      this.state.floatingRootContext.dispatchOpenChange(r, i);
      const o = {
        open: r
      };
      cb(o, r, i.trigger);
      this.update(o);
    });
  }
  static useStore(r, i) {
    return lb(r, (u, h) => new Db(i, u, h), true).store;
  }
}
function yB(e = {}) {
  return {
    ...Eh(),
    modal: true,
    disablePointerDismissal: false,
    popupElement: null,
    viewportElement: null,
    descriptionElementId: undefined,
    titleElementId: undefined,
    openMethod: null,
    nested: false,
    nestedOpenDialogCount: 0,
    nestedOpenDrawerCount: 0,
    role: "dialog",
    ...e
  };
}
function _B(e, n = "dialog") {
  const {
    children: r,
    open: i,
    defaultOpen: o = false,
    onOpenChange: u,
    onOpenChangeComplete: h,
    disablePointerDismissal: a = false,
    modal: c = true,
    actionsRef: d,
    handle: p,
    triggerId: f,
    defaultTriggerId: S = null
  } = e;
  const _ = n === "drawer";
  const x = n === "alert-dialog";
  const w = x ? true : c;
  const g = x || a;
  const b = x ? "alertdialog" : "dialog";
  const m = Uo(true);
  const C = {
    modal: w,
    disablePointerDismissal: g,
    nested: !!m,
    role: b
  };
  const T = Db.useStore(p == null ? undefined : p.store, {
    open: o,
    openProp: i,
    activeTriggerId: S,
    triggerIdProp: f,
    ...C
  });
  Wl(() => {
    const z = i === undefined && T.state.open === false && o === true ? {
      open: true,
      activeTriggerId: S
    } : null;
    if (x) {
      T.update(z ? {
        ...C,
        ...z
      } : C);
    } else if (z) {
      T.update(z);
    }
  });
  T.useControlledProp("openProp", i);
  T.useControlledProp("triggerIdProp", f);
  T.useSyncedValues(C);
  T.useContextCallback("onOpenChange", u);
  T.useContextCallback("onOpenChangeComplete", h);
  const A = T.useState("open");
  const M = T.useState("mounted");
  const R = T.useState("payload");
  const I = gB({
    store: T,
    actionsRef: d,
    parentContext: m == null ? undefined : m.store.context,
    isDrawer: _
  });
  const j = A || M;
  const W = E.useMemo(() => ({
    store: T
  }), [T]);
  return <pR.Provider value={false}><mR.Provider value={W}>{j && <_Component34 store={T} dialogRoot={I} />}{typeof r == "function" ? r({
        payload: R
      }) : r}</mR.Provider></pR.Provider>;
}
function wR(e) {
  const n = E.useContext(pR) ? "drawer" : "dialog";
  return _B(e, n);
}
let mx = function (e) {
  e[e.open = Ns.open] = "open";
  e[e.closed = Ns.closed] = "closed";
  e[e.startingStyle = Ns.startingStyle] = "startingStyle";
  e[e.endingStyle = Ns.endingStyle] = "endingStyle";
  e.nested = "data-nested";
  e.nestedDialogOpen = "data-nested-dialog-open";
  return e;
}({});
const wB = {
  ...jo,
  ...xs,
  nested(e) {
    if (e) {
      return {
        [mx.nested]: ""
      };
    } else {
      return null;
    }
  },
  nestedDialogOpen(e) {
    if (e) {
      return {
        [mx.nestedDialogOpen]: ""
      };
    } else {
      return null;
    }
  }
};
const SR = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    children: h,
    ...a
  } = n;
  const c = bR();
  const {
    store: d
  } = Uo();
  const p = d.useState("open");
  const f = d.useState("nested");
  const S = d.useState("transitionStatus");
  const _ = d.useState("nestedOpenDialogCount");
  const x = d.useState("mounted");
  const w = d.useStateSetter("viewportElement");
  const g = _ > 0;
  return Je("div", n, {
    enabled: c || x,
    state: {
      open: p,
      nested: f,
      transitionStatus: S,
      nestedDialogOpen: g
    },
    ref: [r, w],
    stateAttributesMapping: wB,
    props: [{
      role: "presentation",
      hidden: !x,
      style: {
        pointerEvents: p ? undefined : "none"
      },
      children: h
    }, a]
  });
});
const SB = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    id: h,
    ...a
  } = n;
  const {
    store: c
  } = Uo();
  const d = $n(h);
  c.useSyncedValueWithCleanup("titleElementId", d);
  return Je("h2", n, {
    ref: r,
    props: [{
      id: d
    }, a]
  });
});
const xR = E.createContext(undefined);
const CR = E.createContext(undefined);
const ER = E.createContext(undefined);
const RR = E.createContext("");
function Vo() {
  const e = E.useContext(xR);
  if (!e) {
    throw new Error(Bt(22));
  }
  return e;
}
function TR() {
  const e = E.useContext(CR);
  if (!e) {
    throw new Error(Bt(23));
  }
  return e;
}
function Ha() {
  const e = E.useContext(ER);
  if (!e) {
    throw new Error(Bt(24));
  }
  return e;
}
function Ib() {
  return E.useContext(RR);
}
const kR = (e, n) => Object.is(e, n);
function ai(e, n, r) {
  if (e == null || n == null) {
    return Object.is(e, n);
  } else {
    return r(e, n);
  }
}
function AR(e, n, r) {
  if (!e || e.length === 0) {
    return false;
  } else {
    return e.some(i => i === undefined ? false : ai(n, i, r));
  }
}
function Mo(e, n, r) {
  if (!e || e.length === 0) {
    return -1;
  } else {
    return e.findIndex(i => i === undefined ? false : ai(i, n, r));
  }
}
function MR(e, n, r) {
  return e.filter(i => !ai(n, i, r));
}
function th(e) {
  if (e == null) {
    return "";
  }
  if (typeof e == "string") {
    return e;
  }
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}
function Lb(e) {
  return e != null && e.length > 0 && typeof e[0] == "object" && e[0] != null && "items" in e[0];
}
function OR(e) {
  if (!Array.isArray(e)) {
    return e != null && "null" in e;
  }
  const n = e;
  if (Lb(n)) {
    for (const r of n) {
      for (const i of r.items) {
        if (i && i.value == null && i.label != null) {
          return true;
        }
      }
    }
    return false;
  }
  for (const r of n) {
    if (r && r.value == null && r.label != null) {
      return true;
    }
  }
  return false;
}
function br(e, n) {
  if (n && e != null) {
    return n(e) ?? "";
  }
  if (e && typeof e == "object") {
    if ("label" in e && e.label != null) {
      return String(e.label);
    }
    if ("value" in e) {
      return String(e.value);
    }
  }
  return th(e);
}
function Bs(e, n) {
  if (n && e != null) {
    return n(e) ?? "";
  } else if (e && typeof e == "object" && "value" in e && "label" in e) {
    return th(e.value);
  } else {
    return th(e);
  }
}
function DR(e, n, r) {
  function i() {
    return br(e, r);
  }
  if (r && e != null) {
    return r(e);
  }
  if (e && typeof e == "object" && "label" in e && e.label != null) {
    return e.label;
  }
  if (n && !Array.isArray(n)) {
    return n[e] ?? i();
  }
  if (Array.isArray(n)) {
    const o = n;
    const u = Lb(o) ? o.flatMap(h => h.items) : o;
    if (e == null || typeof e != "object") {
      const h = u.find(a => a.value === e);
      if (h && h.label != null) {
        return h.label;
      } else {
        return i();
      }
    }
    if ("value" in e) {
      const h = u.find(a => a && a.value === e.value);
      if (h && h.label != null) {
        return h.label;
      }
    }
  }
  return i();
}
function xB(e, n, r) {
  return e.reduce((i, o, u) => {
    if (u > 0) {
      i.push(", ");
    }
    i.push(<E.Fragment key={u}>{DR(o, n, r)}</E.Fragment>);
    return i;
  }, []);
}
const Ze = {
  id: Me(e => e.id),
  labelId: Me(e => e.labelId),
  items: Me(e => e.items),
  selectedValue: Me(e => e.selectedValue),
  hasSelectionChips: Me(e => {
    const n = e.selectedValue;
    return Array.isArray(n) && n.length > 0;
  }),
  hasSelectedValue: Me(e => {
    const {
      selectedValue: n,
      selectionMode: r
    } = e;
    if (n == null) {
      return false;
    } else if (r === "multiple" && Array.isArray(n)) {
      return n.length > 0;
    } else {
      return true;
    }
  }),
  hasNullItemLabel: Me((e, n) => n ? OR(e.items) : false),
  open: Me(e => e.open),
  mounted: Me(e => e.mounted),
  forceMounted: Me(e => e.forceMounted),
  inline: Me(e => e.inline),
  activeIndex: Me(e => e.activeIndex),
  selectedIndex: Me(e => e.selectedIndex),
  isActive: Me((e, n) => e.activeIndex === n),
  isSelected: Me((e, n) => {
    const r = e.isItemEqualToValue;
    const i = e.selectedValue;
    if (Array.isArray(i)) {
      return i.some(o => ai(n, o, r));
    } else {
      return ai(n, i, r);
    }
  }),
  transitionStatus: Me(e => e.transitionStatus),
  popupProps: Me(e => e.popupProps),
  inputProps: Me(e => e.inputProps),
  triggerProps: Me(e => e.triggerProps),
  itemProps: Me(e => e.itemProps),
  positionerElement: Me(e => e.positionerElement),
  listElement: Me(e => e.listElement),
  triggerElement: Me(e => e.triggerElement),
  inputElement: Me(e => e.inputElement),
  inputGroupElement: Me(e => e.inputGroupElement),
  popupSide: Me(e => e.popupSide),
  openMethod: Me(e => e.openMethod),
  inputInsidePopup: Me(e => e.inputInsidePopup),
  inputOwnsFormValue: Me(e => e.inputOwnsFormValue),
  selectionMode: Me(e => e.selectionMode),
  name: Me(e => e.name),
  form: Me(e => e.form),
  disabled: Me(e => e.disabled),
  readOnly: Me(e => e.readOnly),
  required: Me(e => e.required),
  grid: Me(e => e.grid),
  virtualized: Me(e => e.virtualized),
  itemToStringLabel: Me(e => e.itemToStringLabel),
  isItemEqualToValue: Me(e => e.isItemEqualToValue),
  modal: Me(e => e.modal),
  autoHighlight: Me(e => e.autoHighlight),
  submitOnItemClick: Me(e => e.submitOnItemClick)
};
function CB(e, n) {
  return (r, i) => {
    if (r == null) {
      return false;
    }
    const o = br(r, n);
    return e.contains(o, i);
  };
}
function EB(e, n, r) {
  return (i, o) => {
    if (i == null) {
      return false;
    }
    if (!o) {
      return true;
    }
    const u = br(i, n);
    const h = r != null ? br(r, n) : "";
    if (h && e.contains(h, o) && h.length === o.length) {
      return true;
    } else {
      return e.contains(u, o);
    }
  };
}
const gx = new Map();
function RB(e = {}) {
  const n = {
    usage: "search",
    sensitivity: "base",
    ignorePunctuation: true,
    ...e
  };
  const r = `${IR(e.locale)}|${JSON.stringify(n)}`;
  const i = gx.get(r);
  if (i) {
    return i;
  }
  const o = new Intl.Collator(e.locale, n);
  const u = {
    contains(h, a, c) {
      if (!a) {
        return true;
      }
      const d = br(h, c);
      for (let p = 0; p <= d.length - a.length; p += 1) {
        if (o.compare(d.slice(p, p + a.length), a) === 0) {
          return true;
        }
      }
      return false;
    },
    startsWith(h, a, c) {
      if (!a) {
        return true;
      }
      const d = br(h, c);
      return o.compare(d.slice(0, a.length), a) === 0;
    },
    endsWith(h, a, c) {
      if (!a) {
        return true;
      }
      const d = br(h, c);
      const p = a.length;
      return d.length >= p && o.compare(d.slice(d.length - p), a) === 0;
    }
  };
  gx.set(r, u);
  return u;
}
function IR(e) {
  if (Array.isArray(e)) {
    return e.map(n => IR(n)).join(",");
  } else if (e == null) {
    return "";
  } else {
    return String(e);
  }
}
const LR = RB;
const PR = Symbol("none");
const va = {
  value: PR,
  index: -1
};
function TB(e) {
  const {
    id: n,
    onOpenChangeComplete: r,
    defaultSelectedValue: i = null,
    selectedValue: o,
    onSelectedValueChange: u,
    defaultInputValue: h,
    inputValue: a,
    open: c,
    defaultOpen: d = false,
    selectionMode: p = "none",
    onItemHighlighted: f,
    name: S,
    form: _,
    disabled: x = false,
    readOnly: w = false,
    required: g = false,
    inputRef: b,
    grid: m = false,
    items: v,
    filteredItems: C,
    filter: T,
    openOnInputClick: A = true,
    autoHighlight: M = false,
    keepHighlight: R = false,
    highlightItemOnHover: I = true,
    loopFocus: j = true,
    itemToStringLabel: W,
    itemToStringValue: z,
    isItemEqualToValue: N = kR,
    virtualized: D = false,
    inline: $ = false,
    fillInputOnItemPress: G = true,
    modal: q = false,
    limit: U = -1,
    autoComplete: L = "list",
    formAutoComplete: F,
    locale: P,
    submitOnItemClick: V = false
  } = e;
  const {
    clearErrors: Z
  } = Pa();
  const {
    setDirty: J,
    validityData: ne,
    shouldValidateOnChange: ue,
    setFilled: ee,
    name: Y,
    disabled: re,
    setTouched: ce,
    setFocused: ge,
    validationMode: de,
    validation: me
  } = Gr();
  const H = Us();
  const ae = Ba({
    id: n
  });
  const oe = LR({
    locale: P
  });
  const [X, Q] = E.useState(false);
  const [se, he] = E.useState(null);
  const ye = E.useRef([]);
  const pe = E.useRef([]);
  const Se = E.useRef(null);
  const _e = E.useRef(null);
  const ie = E.useRef(null);
  const te = E.useRef(null);
  const be = E.useRef(null);
  const ve = E.useRef(true);
  const Te = E.useRef(false);
  const Re = E.useRef(null);
  const ze = E.useRef(null);
  const Be = E.useRef(null);
  const Ue = E.useRef(va);
  const We = E.useRef(null);
  const lt = E.useRef([]);
  const dt = E.useRef([]);
  const _t = re || x;
  const Dt = Y ?? S;
  const kt = p === "multiple";
  const Ge = p === "single";
  const Ye = a !== undefined || h !== undefined;
  const Qe = v !== undefined;
  const gt = C !== undefined;
  let ft;
  if (M === "always") {
    ft = "always";
  } else {
    ft = M ? "input-change" : false;
  }
  const [Ke, en] = Hi({
    controlled: o,
    default: kt ? i ?? zs : i,
    name: "Combobox",
    state: "selectedValue"
  });
  const St = E.useMemo(() => T === null ? () => true : T !== undefined ? T : Ge && !X ? EB(oe, W, Ke) : CB(oe, W), [T, Ge, Ke, X, oe, W]);
  const it = sr(() => Ye ? h ?? "" : Ge ? br(Ke, W) : "").current;
  const [et, Wt] = Hi({
    controlled: a,
    default: it,
    name: "Combobox",
    state: "inputValue"
  });
  const [xt, Ln] = Hi({
    controlled: c,
    default: d,
    name: "Combobox",
    state: "open"
  });
  const tn = Lb(v);
  const Kt = se ?? (et === "" ? "" : String(et).trim());
  const ht = Ge ? br(Ke, W) : "";
  const Zt = Ge && !X && Kt !== "" && ht !== "" && ht.length === Kt.length && oe.contains(ht, Kt);
  const nn = Zt ? "" : Kt;
  const $t = Qe && gt && Zt;
  const Ft = E.useMemo(() => v ? tn ? v.flatMap(qe => qe.items) : v : zs, [v, tn]);
  const sn = E.useMemo(() => {
    if (C && !$t) {
      return C;
    }
    if (!v) {
      return zs;
    }
    if (tn) {
      const rt = v;
      const It = [];
      let Nt = 0;
      for (const ln of rt) {
        if (U > -1 && Nt >= U) {
          break;
        }
        const Cn = nn === "" ? ln.items : ln.items.filter(Br => St(Br, nn, W));
        if (Cn.length === 0) {
          continue;
        }
        const Bn = U > -1 ? U - Nt : Infinity;
        const tr = Cn.slice(0, Bn);
        if (tr.length > 0) {
          const Br = {
            ...ln,
            items: tr
          };
          It.push(Br);
          Nt += tr.length;
        }
      }
      return It;
    }
    if (nn === "") {
      if (U > -1) {
        return Ft.slice(0, U);
      } else {
        return Ft;
      }
    }
    const qe = [];
    for (const rt of Ft) {
      if (U > -1 && qe.length >= U) {
        break;
      }
      if (St(rt, nn, W)) {
        qe.push(rt);
      }
    }
    return qe;
  }, [C, $t, v, tn, nn, U, St, W, Ft]);
  const zt = E.useMemo(() => tn ? sn.flatMap(rt => rt.items) : sn, [sn, tn]);
  const Et = sr(() => new ab({
    id: ae,
    labelId: undefined,
    selectedValue: Ke,
    open: xt,
    filter: St,
    query: Kt,
    items: v,
    selectionMode: p,
    listRef: ye,
    labelsRef: pe,
    popupRef: Se,
    emptyRef: be,
    inputRef: _e,
    startDismissRef: ie,
    endDismissRef: te,
    keyboardActiveRef: ve,
    chipsContainerRef: Re,
    clearRef: ze,
    valuesRef: lt,
    allValuesRef: dt,
    selectionEventRef: Be,
    name: Dt,
    form: _,
    disabled: _t,
    readOnly: w,
    required: g,
    grid: m,
    isGrouped: tn,
    virtualized: D,
    openOnInputClick: A,
    itemToStringLabel: W,
    isItemEqualToValue: N,
    modal: q,
    autoHighlight: ft,
    submitOnItemClick: V,
    hasInputValue: Ye,
    mounted: false,
    forceMounted: false,
    transitionStatus: "idle",
    inline: $,
    activeIndex: null,
    selectedIndex: null,
    popupProps: {},
    inputProps: {},
    triggerProps: {},
    itemProps: Xt,
    positionerElement: null,
    listElement: null,
    triggerElement: null,
    inputElement: null,
    inputGroupElement: null,
    popupSide: null,
    openMethod: null,
    inputInsidePopup: true,
    inputOwnsFormValue: p === "none",
    onOpenChangeComplete: r || Yt,
    setOpen: Yt,
    setInputValue: Yt,
    setSelectedValue: Yt,
    setIndices: Yt,
    onItemHighlighted: Yt,
    handleSelection: Yt,
    forceMount: Yt,
    requestSubmit: Yt
  })).current;
  const or = p === "none" ? et : Ke;
  const Rs = E.useMemo(() => p === "none" ? or : Array.isArray(Ke) ? Ke.map(qe => Bs(qe, z)) : Bs(Ke, z), [or, z, p, Ke]);
  const Yr = je(f);
  const dr = je(r);
  const us = Pe(Et, Ze.activeIndex);
  const Xr = Pe(Et, Ze.selectedIndex);
  const yr = Pe(Et, Ze.positionerElement);
  const Tr = Pe(Et, Ze.listElement);
  const fr = Pe(Et, Ze.triggerElement);
  const _n = Pe(Et, Ze.inputElement);
  const Wo = Pe(Et, Ze.inputGroupElement);
  const qn = Pe(Et, Ze.inline);
  const Gn = Pe(Et, Ze.inputInsidePopup);
  const Ts = Pe(Et, Ze.inputOwnsFormValue);
  const Fa = On(fr);
  const {
    mounted: $o,
    setMounted: qo,
    transitionStatus: Gi
  } = zo(xt);
  const {
    openMethod: di,
    triggerProps: hr
  } = Ab(xt);
  const kr = je(() => Rs);
  Mu(Gn ? Fa : _e, ae, or, kr);
  const Pn = je(() => {
    if (v) {
      pe.current = zt.map(qe => br(qe, W));
    } else {
      Et.set("forceMounted", true);
    }
  });
  const ks = E.useRef(Ke);
  Fe(() => {
    if (Ke !== ks.current) {
      Pn();
    }
  }, [Pn, Ke]);
  const Ar = je(qe => {
    Et.update(qe);
    const rt = qe.type || "none";
    if (qe.activeIndex !== undefined) {
      if (qe.activeIndex === null) {
        if (Ue.current !== va) {
          Ue.current = va;
          Yr(undefined, _a(rt, undefined, {
            index: -1
          }));
        }
      } else {
        const It = lt.current[qe.activeIndex];
        Ue.current = {
          value: It,
          index: qe.activeIndex
        };
        Yr(It, _a(rt, undefined, {
          index: qe.activeIndex
        }));
      }
    }
  });
  const ar = je((qe, rt) => {
    var It;
    Te.current = rt.reason === Ii;
    if ((It = e.onInputValueChange) != null) {
      It.call(e, qe, rt);
    }
    if (!rt.isCanceled) {
      if (rt.reason === wa) {
        const Nt = rt.event;
        const ln = Nt.inputType;
        if (Nt.type === "compositionend" || ln != null && ln !== "" && ln !== "insertReplacementText") {
          const Bn = qe.trim() !== "";
          if (Bn) {
            Q(true);
          }
          We.current = {
            hasQuery: Bn
          };
          if (Bn && ft && Et.state.activeIndex == null) {
            Et.set("activeIndex", 0);
          }
        }
      }
      Wt(qe);
    }
  });
  const ds = je((qe, rt) => {
    var It;
    if (xt !== qe && (rt.reason === "escape-key" && Qe && zt.length === 0 && !Et.state.emptyRef.current && rt.allowPropagation(), (It = e.onOpenChange) == null || It.call(e, qe, rt), !rt.isCanceled && (qe && kt && Gn && !qn && se !== null && (Q(false), he(null), et !== "" && ar("", $e(Ii, rt.event))), !qe && X && (Ge ? (qn || he(Kt), Kt === "" && Q(false)) : kt && (qn || he(Kt), Gn && Ar({
      activeIndex: null
    }), (!Gn || qn) && ar("", $e(Ii, rt.event)))), Ln(qe), !qe && Gn && (rt.reason === Ui || rt.reason === Eu) && (ce(true), ge(false), de === "onBlur")))) {
      const Nt = p === "none" ? et : Ke;
      me.commit(Nt);
    }
  });
  const Pr = je((qe, rt) => {
    if (u != null) {
      u(qe, rt);
    }
    if (rt.isCanceled) {
      return;
    }
    en(qe);
    if (p === "none" && Se.current && G || Ge && !Et.state.inputInsidePopup) {
      ar(br(qe, W), $e(rt.reason, rt.event));
    }
    if (Ge && qe != null && rt.reason !== wa && X && !qn) {
      he(Kt);
    }
  });
  const Ua = je((qe, rt) => {
    var tr;
    let It = rt;
    if (It === undefined) {
      if (us === null) {
        return;
      }
      It = lt.current[us];
    }
    const Nt = dn(qe);
    const ln = Be.current ?? qe;
    Be.current = null;
    const Cn = $e(Ra, ln);
    const Bn = (tr = Nt == null ? undefined : Nt.closest("a")) == null ? undefined : tr.getAttribute("href");
    if (Bn) {
      if (Bn.startsWith("#")) {
        ds(false, Cn);
      }
      return;
    }
    if (kt) {
      const Br = Array.isArray(Ke) ? Ke : [];
      const Va = AR(Br, It, Et.state.isItemEqualToValue) ? MR(Br, It, Et.state.isItemEqualToValue) : [...Br, It];
      Pr(Va, Cn);
      if (!(_e.current ? _e.current.value.trim() !== "" : false)) {
        return;
      }
      if (Et.state.inputInsidePopup) {
        ar("", $e(Ii, Cn.event));
      } else {
        ds(false, Cn);
      }
    } else {
      Pr(It, Cn);
      ds(false, Cn);
    }
  });
  const er = je(() => {
    var rt;
    var It;
    if (!Et.state.submitOnItemClick) {
      return;
    }
    const qe = ((rt = me.inputRef.current) == null ? undefined : rt.form) ?? ((It = Et.state.inputElement) == null ? undefined : It.form);
    if (qe && typeof qe.requestSubmit == "function") {
      qe.requestSubmit();
    }
  });
  const Vs = je(() => {
    qo(false);
    if (dr != null) {
      dr(false);
    }
    Q(false);
    he(null);
    Ar(p === "none" ? {
      activeIndex: null,
      selectedIndex: null
    } : {
      activeIndex: null
    });
    if (kt && _e.current && _e.current.value !== "" && !Te.current) {
      ar("", $e(Ii));
    }
    if (Ge) {
      if (Et.state.inputInsidePopup) {
        if (_e.current && _e.current.value !== "") {
          ar("", $e(Ii));
        }
      } else {
        const qe = br(Ke, W);
        if (_e.current && _e.current.value !== qe) {
          ar(qe, $e(qe === "" ? Ii : ur));
        }
      }
    }
  });
  const Go = E.useMemo(() => qn && yr ? {
    current: yr.closest("[role=\"dialog\"]")
  } : Se, [qn, yr]);
  qr({
    enabled: !e.actionsRef,
    open: xt,
    ref: Go,
    onComplete() {
      if (!xt) {
        Vs();
      }
    }
  });
  E.useImperativeHandle(e.actionsRef, () => ({
    unmount: Vs
  }), [Vs]);
  Fe(function () {
    if (xt || p === "none") {
      return;
    }
    const rt = v ? Ft : dt.current;
    if (kt) {
      const It = Array.isArray(Ke) ? Ke : [];
      const Nt = It[It.length - 1];
      const ln = Mo(rt, Nt, N);
      Ar({
        selectedIndex: ln === -1 ? null : ln
      });
    } else {
      const It = Mo(rt, Ke, N);
      Ar({
        selectedIndex: It === -1 ? null : It
      });
    }
  }, [xt, Ke, v, p, Ft, kt, N, Ar]);
  Fe(() => {
    if (v) {
      lt.current = zt;
      ye.current.length = zt.length;
    }
  }, [v, zt]);
  Fe(() => {
    const qe = We.current;
    if (qe) {
      if (qe.hasQuery) {
        if (ft) {
          Et.set("activeIndex", 0);
        }
      } else if (ft === "always") {
        Et.set("activeIndex", 0);
      }
      We.current = null;
    }
    if (!xt && !qn) {
      return;
    }
    const It = Qe || gt ? zt : lt.current;
    const Nt = Et.state.activeIndex;
    if (Nt == null) {
      if (ft === "always" && It.length > 0) {
        Et.set("activeIndex", 0);
        return;
      }
      if (Ue.current !== va) {
        Ue.current = va;
        Et.state.onItemHighlighted(undefined, _a(ur, undefined, {
          index: -1
        }));
      }
      return;
    }
    if (Nt >= It.length) {
      if (Ue.current !== va) {
        Ue.current = va;
        Et.state.onItemHighlighted(undefined, _a(ur, undefined, {
          index: -1
        }));
      }
      Et.set("activeIndex", null);
      return;
    }
    const ln = It[Nt];
    const Cn = Ue.current.value;
    const Bn = Cn !== PR && ai(ln, Cn, Et.state.isItemEqualToValue);
    if (Ue.current.index !== Nt || !Bn) {
      Ue.current = {
        value: ln,
        index: Nt
      };
      Et.state.onItemHighlighted(ln, _a(ur, undefined, {
        index: Nt
      }));
    }
  }, [us, ft, gt, Qe, zt, qn, xt, Et]);
  Fe(() => {
    if (p === "none") {
      ee(String(et) !== "");
      return;
    }
    ee(kt ? Array.isArray(Ke) && Ke.length > 0 : Ke != null);
  }, [ee, p, et, Ke, kt]);
  E.useEffect(() => {
    if (Qe && ft && zt.length === 0) {
      Ar({
        activeIndex: null
      });
    }
  }, [Qe, ft, zt.length, Ar]);
  Eo(Kt, () => {
    if (!!xt && Kt !== "" && Kt !== String(it)) {
      Q(true);
    }
  });
  Eo(Ke, () => {
    if (p !== "none" && (Z(Dt), J(Ke !== ne.initialValue), ue() ? me.commit(Ke) : me.commit(Ke, true), Ge && !Ye && !Gn)) {
      const qe = br(Ke, W);
      if (et !== qe) {
        ar(qe, $e(ur));
      }
    }
  });
  Eo(et, () => {
    if (p === "none") {
      Z(Dt);
      J(et !== ne.initialValue);
      if (ue()) {
        me.commit(et);
      } else {
        me.commit(et, true);
      }
    }
  });
  Eo(v, () => {
    if (!Ge || Ye || Gn || X) {
      return;
    }
    const qe = br(Ke, W);
    if (et !== qe) {
      ar(qe, $e(ur));
    }
  });
  const As = hb({
    open: qn ? true : xt,
    onOpenChange: ds,
    elements: {
      reference: Gn ? fr : _n,
      floating: yr
    }
  });
  let Kr;
  let _r;
  if (!qn) {
    Kr = m ? "grid" : "listbox";
    _r = xt ? "true" : "false";
  }
  const Ms = E.useMemo(() => {
    const qe = (_n == null ? undefined : _n.tagName) === "INPUT";
    const rt = _n == null || qe;
    const It = rt || xt;
    const Nt = rt ? {
      autoComplete: "off",
      spellCheck: "false",
      autoCorrect: "off",
      autoCapitalize: "none"
    } : {};
    if (It) {
      Nt.role = "combobox";
      Nt["aria-expanded"] = _r;
      Nt["aria-haspopup"] = Kr;
      Nt["aria-controls"] = xt ? Tr == null ? undefined : Tr.id : undefined;
      Nt["aria-autocomplete"] = L;
    }
    return {
      reference: Nt,
      floating: {
        role: "presentation"
      }
    };
  }, [_n, xt, _r, Kr, Tr == null ? undefined : Tr.id, L]);
  const Zr = ql(As, {
    enabled: !w && !_t && A,
    event: "mousedown-only",
    toggle: false,
    touchOpenDelay: Gn ? 0 : 100,
    reason: IC
  });
  const Yi = Gl(As, {
    enabled: !w && !_t && !qn,
    outsidePressEvent: {
      mouse: "sloppy",
      touch: "intentional"
    },
    bubbles: qn ? true : undefined,
    outsidePress(qe) {
      const rt = dn(qe);
      return !Xe(fr, rt) && !Xe(ze.current, rt) && !Xe(Re.current, rt) && !Xe(Wo, rt);
    }
  });
  const hn = vb(As, {
    enabled: !w && !_t,
    id: ae,
    listRef: ye,
    activeIndex: us,
    selectedIndex: Xr,
    virtual: true,
    loopFocus: j,
    allowEscape: j && !ft,
    focusItemOnOpen: X || p === "none" && !ft ? false : "auto",
    focusItemOnHover: I,
    resetOnPointerLeave: !R,
    cols: m ? 2 : 1,
    orientation: m ? "horizontal" : undefined,
    rtl: H === "rtl",
    disabledIndices: zs,
    onNavigate(qe, rt) {
      if ((!!rt || !!xt) && Gi !== "ending") {
        Ar(rt ? {
          activeIndex: qe,
          type: ve.current ? "keyboard" : "pointer"
        } : {
          activeIndex: qe
        });
      }
    }
  });
  const Xi = E.useMemo(() => Sn(hn.reference, Yi.reference, Zr.reference, Ms.reference), [hn.reference, Yi.reference, Zr.reference, Ms.reference]);
  const fi = E.useMemo(() => Sn(No, hn.floating, Yi.floating, Ms.floating), [hn.floating, Yi.floating, Ms.floating]);
  const Yo = E.useMemo(() => {
    const qe = hn.item;
    if (qe) {
      return {
        ...qe,
        onFocus: undefined
      };
    } else {
      return Xt;
    }
  }, [hn.item]);
  Wl(() => {
    Et.update({
      inline: $,
      popupProps: fi,
      inputProps: Xi,
      triggerProps: hr,
      itemProps: Yo,
      setOpen: ds,
      setInputValue: ar,
      setSelectedValue: Pr,
      setIndices: Ar,
      onItemHighlighted: Yr,
      handleSelection: Ua,
      forceMount: Pn,
      requestSubmit: er
    });
  });
  Fe(() => {
    Et.update({
      id: ae,
      selectedValue: Ke,
      open: xt,
      mounted: $o,
      transitionStatus: Gi,
      items: v,
      inline: $,
      popupProps: fi,
      inputProps: Xi,
      triggerProps: hr,
      openMethod: di,
      itemProps: Yo,
      selectionMode: p,
      name: Dt,
      form: _,
      disabled: _t,
      readOnly: w,
      required: g,
      grid: m,
      isGrouped: tn,
      virtualized: D,
      onOpenChangeComplete: dr,
      openOnInputClick: A,
      itemToStringLabel: W,
      modal: q,
      autoHighlight: ft,
      isItemEqualToValue: N,
      submitOnItemClick: V,
      hasInputValue: Ye,
      requestSubmit: er,
      inputOwnsFormValue: p === "none" && ($ || !Et.state.inputInsidePopup)
    });
  }, [Et, ae, Ke, xt, $o, Gi, v, fi, Xi, Yo, di, hr, p, Dt, _t, w, g, me, m, tn, D, dr, A, W, q, N, V, Ye, $, er, ft, _]);
  const ec = ls(b, me.inputRef);
  const Ki = E.useMemo(() => ({
    query: Kt,
    hasItems: Qe,
    filteredItems: sn,
    flatFilteredItems: zt
  }), [Kt, Qe, sn, zt]);
  const Qr = E.useMemo(() => Array.isArray(or) ? "" : Bs(or, z), [or, z]);
  const Xo = kt && Array.isArray(Ke) && Ke.length > 0;
  const hi = kt || p === "none" && Ts ? undefined : Dt;
  const Ws = E.useMemo(() => !kt || !Array.isArray(Ke) || !Dt ? null : Ke.map(qe => {
    const rt = Bs(qe, z);
    return <input type="hidden" form={_} name={Dt} value={rt} key={rt} />;
  }), [kt, Ke, _, Dt, z]);
  const $s = <E.Fragment>{e.children}<input {...me.getInputValidationProps({
      onFocus() {
        var qe;
        if (Gn) {
          if (fr != null) {
            fr.focus();
          }
          return;
        }
        if ((qe = _e.current || fr) != null) {
          qe.focus();
        }
      },
      onChange(qe) {
        var ln;
        if (qe.nativeEvent.defaultPrevented || _t || w) {
          if ((ln = qe.preventBaseUIHandler) != null) {
            ln.call(qe);
          }
          return;
        }
        const rt = qe.currentTarget.value;
        const It = $e(ur, qe.nativeEvent);
        function Nt() {
          if (kt) {
            return;
          }
          if (p === "none") {
            J(rt !== ne.initialValue);
            ar(rt, It);
            if (ue()) {
              me.commit(rt);
            }
            return;
          }
          const Cn = lt.current.find(Bn => Bs(Bn, z).toLowerCase() === rt.toLowerCase() || br(Bn, W).toLowerCase() === rt.toLowerCase());
          if (Cn != null) {
            J(Cn !== ne.initialValue);
            if (Pr != null) {
              Pr(Cn, It);
            }
            if (ue()) {
              me.commit(Cn);
            }
          }
        }
        if (v) {
          Nt();
        } else {
          Pn();
          queueMicrotask(Nt);
        }
      }
    })} id={ae && hi == null ? `${ae}-hidden-input` : undefined} form={_} name={hi} autoComplete={F} disabled={_t} required={g && !Xo} readOnly={w} value={Qr} ref={ec} style={hi ? gh : Ma} tabIndex={-1} aria-hidden={true} suppressHydrationWarning={true} />{Ws}</E.Fragment>;
  return <xR.Provider value={Et}><CR.Provider value={As}><ER.Provider value={Ki}><RR.Provider value={et}>{$s}</RR.Provider></ER.Provider></CR.Provider></xR.Provider>;
}
function kB(e) {
  const {
    openOnInputClick: n = false,
    value: r,
    defaultValue: i,
    onValueChange: o,
    mode: u = "list",
    itemToStringValue: h,
    ...a
  } = e;
  const c = u === "inline" || u === "both";
  const d = u === "inline" || u === "none";
  const p = r !== undefined;
  const [f, S] = E.useState(i ?? "");
  const [_, x] = E.useState("");
  E.useEffect(() => {
    if (p) {
      x("");
    }
  }, [r, p]);
  let w;
  if (c && _ !== "") {
    w = _;
  } else if (p) {
    w = r ?? "";
  } else {
    w = f;
  }
  const g = LR();
  const b = E.useMemo(() => a.filter !== undefined ? a.filter : g.contains, [a.filter, g]);
  const m = String(p ? r : f).trim();
  const v = E.useMemo(() => u !== "both" ? d ? null : b : b === null ? null : (A, M, R) => b(A, m, R), [b, u, m, d]);
  function C(A, M) {
    x("");
    if (!p) {
      S(A);
    }
    if (o != null) {
      o(A, M);
    }
  }
  function T(A, M) {
    var R;
    if ((R = e.onItemHighlighted) != null) {
      R.call(e, A, M);
    }
    if (M.reason !== l3) {
      if (c) {
        if (A == null) {
          x("");
        } else {
          x(br(A, h));
        }
      } else {
        x("");
      }
    }
  }
  return <TB {...a} itemToStringLabel={h} openOnInputClick={n} selectionMode="none" fillInputOnItemPress={true} filter={v} autoComplete={u} inputValue={w} defaultInputValue={i} onInputValueChange={C} onItemHighlighted={T} />;
}
const Pb = {
  ...pu,
  ...Ho,
  popupSide: e => e ? {
    "data-popup-side": e
  } : null,
  listEmpty: e => e ? {
    "data-list-empty": ""
  } : null
};
function AB(e) {
  if (e == null) {
    return undefined;
  } else {
    return `${e}-label`;
  }
}
function zh(e, n) {
  return e ?? n;
}
const mf = 2;
const MB = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    nativeButton: u = true,
    disabled: h = false,
    id: a,
    style: c,
    ...d
  } = n;
  const {
    state: p,
    disabled: f,
    setTouched: S,
    setFocused: _,
    validationMode: x,
    validation: w
  } = Gr();
  const {
    labelId: g
  } = Cs();
  const b = Vo();
  const {
    filteredItems: m
  } = Ha();
  const v = Pe(b, Ze.selectionMode);
  const C = Pe(b, Ze.disabled);
  const T = Pe(b, Ze.readOnly);
  const A = Pe(b, Ze.required);
  const M = Pe(b, Ze.mounted);
  const R = Pe(b, Ze.popupSide);
  const I = Pe(b, Ze.positionerElement);
  const j = Pe(b, Ze.listElement);
  const W = Pe(b, Ze.triggerProps);
  const z = Pe(b, Ze.triggerElement);
  const N = Pe(b, Ze.inputInsidePopup);
  const D = Pe(b, Ze.id);
  const $ = Pe(b, Ze.labelId);
  const G = Pe(b, Ze.open);
  const q = Pe(b, Ze.selectedValue);
  const U = Pe(b, Ze.activeIndex);
  const L = Pe(b, Ze.selectedIndex);
  const F = Pe(b, Ze.hasSelectedValue);
  const P = TR();
  const V = Ib();
  const Z = xn();
  const J = f || C || h;
  const ne = m.length === 0;
  const ue = M && I ? R : null;
  Ba({
    id: N ? a : undefined
  });
  const ee = N ? a ?? D : a;
  const Y = zh(g, $);
  const re = E.useRef("");
  function ce(se) {
    re.current = se.pointerType;
  }
  const ge = P.useState("domReferenceElement");
  E.useEffect(() => {
    if (N && z && z !== ge) {
      P.set("domReferenceElement", z);
    }
  }, [z, ge, P, N]);
  const {
    reference: de
  } = bb(P, {
    enabled: !G && !T && !C && v === "single",
    listRef: b.state.labelsRef,
    activeIndex: U,
    selectedIndex: L,
    onMatch(se) {
      const he = b.state.valuesRef.current[se];
      if (he !== undefined) {
        b.state.setSelectedValue(he, $e("none"));
      }
    }
  });
  const {
    reference: me
  } = ql(P, {
    enabled: !T && !C,
    event: "mousedown"
  });
  const {
    buttonRef: H,
    getButtonProps: ae
  } = Es({
    native: u,
    disabled: J
  });
  const oe = {
    ...p,
    open: G,
    disabled: J,
    popupSide: ue,
    listEmpty: ne,
    placeholder: v === "none" ? false : !F
  };
  const X = je(se => {
    b.set("triggerElement", se);
  });
  return Je("button", n, {
    ref: [r, H, X],
    state: oe,
    props: [W, me, de, {
      id: ee,
      tabIndex: N ? 0 : -1,
      role: N ? "combobox" : undefined,
      "aria-expanded": G ? "true" : "false",
      "aria-haspopup": N ? "dialog" : "listbox",
      "aria-controls": G ? j == null ? undefined : j.id : undefined,
      "aria-required": N && A || undefined,
      "aria-labelledby": Y,
      onPointerDown: ce,
      onPointerEnter: ce,
      onFocus() {
        _(true);
        if (!J && !T) {
          Z.start(0, b.state.forceMount);
        }
      },
      onBlur(se) {
        if (!Xe(I, se.relatedTarget) && (S(true), _(false), x === "onBlur")) {
          const he = v === "none" ? V : q;
          w.commit(he);
        }
      },
      onMouseDown(se) {
        var pe;
        if (J || T || (N || P.set("domReferenceElement", se.currentTarget), b.state.forceMount(), re.current !== "touch" && ((pe = b.state.inputRef.current) == null || pe.focus(), N || se.preventDefault()), G)) {
          return;
        }
        const he = yt(se.currentTarget);
        function ye(Se) {
          if (!z) {
            return;
          }
          const _e = dn(Se);
          const ie = b.state.positionerElement;
          const te = b.state.listElement;
          if (Xe(z, _e) || Xe(ie, _e) || Xe(te, _e) || _e === z) {
            return;
          }
          const be = Mb(z);
          const ve = Se.clientX >= be.left - mf && Se.clientX <= be.right + mf;
          const Te = Se.clientY >= be.top - mf && Se.clientY <= be.bottom + mf;
          if (!ve || !Te) {
            b.state.setOpen(false, $e("cancel-open", Se));
          }
        }
        if (N) {
          he.addEventListener("mouseup", ye, {
            once: true
          });
        }
      },
      onKeyDown(se) {
        var he;
        if (!J && !T) {
          if (se.key === "ArrowDown" || se.key === "ArrowUp") {
            cr(se);
            b.state.setOpen(true, $e(Xf, se.nativeEvent));
            if ((he = b.state.inputRef.current) != null) {
              he.focus();
            }
          }
        }
      }
    }, w ? w.getValidationProps(d) : d, ae],
    stateAttributesMapping: Pb
  });
});
const OB = MB;
const DB = E.createContext(undefined);
function IB() {
  return E.useContext(DB);
}
const LB = E.createContext(undefined);
function BR(e) {
  return E.useContext(LB);
}
const PB = E.forwardRef(function (n, r) {
  const i = Vo();
  const {
    buttonRef: o,
    getButtonProps: u
  } = Es({
    native: false
  });
  const h = ls(r, o);
  function a(d) {
    i.state.setOpen(false, $e(Yv, d.nativeEvent, d.currentTarget));
  }
  const c = u({
    onClick: a
  });
  return <span ref={h} {...c} aria-label="Dismiss" tabIndex={undefined} style={gh} />;
});
const BB = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    disabled: u = false,
    id: h,
    style: a,
    ...c
  } = n;
  const {
    state: d,
    disabled: p,
    setTouched: f,
    setFocused: S,
    validationMode: _,
    validation: x
  } = Gr();
  const {
    labelId: w
  } = Cs();
  const g = IB();
  const m = !!BR();
  const v = Vo();
  const {
    filteredItems: C
  } = Ha();
  const T = Ib();
  const A = Us();
  const M = Pe(v, Ze.required);
  const R = Pe(v, Ze.disabled);
  const I = Pe(v, Ze.readOnly);
  const j = Pe(v, Ze.name);
  const W = Pe(v, Ze.form);
  const z = Pe(v, Ze.selectionMode);
  const N = Pe(v, Ze.autoHighlight);
  const D = Pe(v, Ze.inputProps);
  const $ = Pe(v, Ze.triggerProps);
  const G = Pe(v, Ze.open);
  const q = Pe(v, Ze.mounted);
  const U = Pe(v, Ze.selectedValue);
  const L = Pe(v, Ze.popupSide);
  const F = Pe(v, Ze.positionerElement);
  const P = Pe(v, Ze.id);
  const V = Pe(v, Ze.inline);
  const Z = Pe(v, Ze.modal);
  const J = !!N;
  const ne = q && F ? L : null;
  const ue = p || R || u;
  const ee = C.length === 0;
  const Y = m || V;
  const re = !Y || Z;
  const ce = $n(h ?? (Y ? undefined : P));
  const ge = zh(w, undefined);
  const de = m ? Ol : d;
  const [me, H] = E.useState(null);
  const ae = E.useRef(false);
  const oe = E.useRef(null);
  const X = E.useRef(false);
  const Q = z === "none" && !m;
  const se = je(ie => {
    const te = m || v.state.inline;
    if (te && !v.state.hasInputValue) {
      v.state.setInputValue("", $e(ur));
    }
    v.update({
      inputElement: ie,
      inputInsidePopup: te,
      inputOwnsFormValue: Q
    });
  });
  const he = m || !x ? c : x.getValidationProps(c);
  const ye = {
    ...de,
    open: G,
    disabled: ue,
    readOnly: I,
    popupSide: ne,
    listEmpty: ee
  };
  function pe(ie) {
    if (!g) {
      return;
    }
    let te;
    const {
      highlightedChipIndex: be
    } = g;
    const ve = g.chipsRef.current.length;
    const Te = A === "rtl";
    const Re = Te ? "ArrowRight" : "ArrowLeft";
    const ze = Te ? "ArrowLeft" : "ArrowRight";
    if (be !== undefined) {
      if (ie.key === Re) {
        ie.preventDefault();
        if (be > 0) {
          te = be - 1;
        } else {
          te = undefined;
        }
      } else if (ie.key === ze) {
        ie.preventDefault();
        if (be < ve - 1) {
          te = be + 1;
        } else {
          te = undefined;
        }
      } else if (ie.key === "Backspace" || ie.key === "Delete") {
        ie.preventDefault();
        const Be = be >= U.length - 1 ? U.length - 2 : be;
        te = Be >= 0 ? Be : undefined;
        v.state.setIndices({
          activeIndex: null,
          selectedIndex: null,
          type: "keyboard"
        });
      }
      return te;
    }
    if (ie.key === Re && (ie.currentTarget.selectionStart ?? 0) === 0 && U.length > 0) {
      ie.preventDefault();
      te = ve > 0 ? ve - 1 : undefined;
    } else if (ie.key === "Backspace" && ie.currentTarget.value === "" && U.length > 0) {
      v.state.setIndices({
        activeIndex: null,
        selectedIndex: null,
        type: "keyboard"
      });
      ie.preventDefault();
    }
    return te;
  }
  const Se = Je("input", n, {
    state: ye,
    ref: [r, v.state.inputRef, se],
    props: [D, $, {
      type: "text",
      value: n.value ?? me ?? T,
      "aria-readonly": I || undefined,
      "aria-required": M || undefined,
      "aria-labelledby": ge,
      disabled: ue,
      readOnly: I,
      required: z === "none" ? M : undefined,
      form: W,
      ...(Q && j && {
        name: j
      }),
      id: ce,
      onFocus() {
        S(true);
        if (!V || !X.current) {
          return;
        }
        X.current = false;
        const ie = oe.current;
        if (ie != null && !!Object.hasOwn(v.state.valuesRef.current, ie)) {
          v.state.setIndices({
            activeIndex: ie
          });
        }
      },
      onBlur() {
        f(true);
        S(false);
        const ie = v.state.activeIndex;
        if (V && ie !== null && N !== "always") {
          oe.current = ie;
          X.current = true;
          v.state.setIndices({
            activeIndex: null
          });
        }
        if (_ === "onBlur") {
          const te = z === "none" ? T : U;
          x.commit(te);
        }
      },
      onCompositionStart(ie) {
        if (!$f) {
          ae.current = true;
          H(ie.currentTarget.value);
        }
      },
      onCompositionEnd(ie) {
        ae.current = false;
        const te = ie.currentTarget.value;
        H(null);
        v.state.setInputValue(te, $e(wa, ie.nativeEvent));
      },
      onChange(ie) {
        const te = ie.nativeEvent.inputType;
        const be = !te || te === "insertReplacementText";
        const ve = ae.current || !be;
        if (ae.current) {
          const Be = ie.currentTarget.value;
          H(Be);
          if (Be === "" && !v.state.openOnInputClick && !v.state.inputInsidePopup) {
            v.state.setOpen(false, $e(Ii, ie.nativeEvent));
          }
          const Ue = Be.trim();
          const We = J && Ue !== "";
          if (!I && !ue && Ue && ve) {
            v.state.setOpen(true, $e(wa, ie.nativeEvent));
            if (!J) {
              v.state.setIndices({
                activeIndex: null,
                selectedIndex: null,
                type: v.state.keyboardActiveRef.current ? "keyboard" : "pointer"
              });
            }
          }
          if (G && v.state.activeIndex !== null && !We) {
            v.state.setIndices({
              activeIndex: null,
              selectedIndex: null,
              type: v.state.keyboardActiveRef.current ? "keyboard" : "pointer"
            });
          }
          return;
        }
        v.state.setInputValue(ie.currentTarget.value, $e(wa, ie.nativeEvent));
        const Te = ie.currentTarget.value === "";
        const Re = $e(Ii, ie.nativeEvent);
        if (Te && !v.state.inputInsidePopup) {
          if (z === "single") {
            v.state.setSelectedValue(null, Re);
          }
          if (!v.state.openOnInputClick) {
            v.state.setOpen(false, Re);
          }
        }
        const ze = ie.currentTarget.value.trim();
        if (!I && !ue && ze && ve) {
          v.state.setOpen(true, $e(wa, ie.nativeEvent));
          if (!J) {
            v.state.setIndices({
              activeIndex: null,
              selectedIndex: null,
              type: v.state.keyboardActiveRef.current ? "keyboard" : "pointer"
            });
          }
        }
        if (G && v.state.activeIndex !== null && !J) {
          v.state.setIndices({
            activeIndex: null,
            selectedIndex: null,
            type: v.state.keyboardActiveRef.current ? "keyboard" : "pointer"
          });
        }
      },
      onKeyDown(ie) {
        var ze;
        var Be;
        if (ue || I || ie.ctrlKey || ie.shiftKey || ie.altKey || ie.metaKey) {
          return;
        }
        v.state.keyboardActiveRef.current = true;
        const te = ie.currentTarget;
        const be = te.scrollWidth - te.clientWidth;
        const ve = A === "rtl";
        if (ie.key === "Home") {
          cr(ie);
          const Ue = vS && ve ? te.value.length : 0;
          te.setSelectionRange(Ue, Ue);
          te.scrollLeft = 0;
          return;
        }
        if (ie.key === "End") {
          cr(ie);
          const Ue = vS && ve ? 0 : te.value.length;
          te.setSelectionRange(Ue, Ue);
          te.scrollLeft = ve ? -be : be;
          return;
        }
        if (!q && ie.key === "Escape") {
          const Ue = z === "multiple" && Array.isArray(U) ? U.length === 0 : U === null;
          const We = $e($l, ie.nativeEvent);
          const lt = z === "multiple" ? [] : null;
          v.state.setInputValue("", We);
          v.state.setSelectedValue(lt, We);
          if (!Ue && !v.state.inline && !We.isPropagationAllowed) {
            ie.stopPropagation();
          }
          return;
        }
        if (g && ie.key === "Backspace" && te.value === "" && g.highlightedChipIndex === undefined && Array.isArray(U) && U.length > 0) {
          const Ue = g.chipsRef.current.length;
          const We = Ue > 0 ? Ue - 1 : U.length - 1;
          const lt = U.filter((dt, _t) => _t !== We);
          v.state.setIndices({
            activeIndex: null,
            selectedIndex: null,
            type: v.state.keyboardActiveRef.current ? "keyboard" : "pointer"
          });
          v.state.setSelectedValue(lt, $e(ur, ie.nativeEvent));
          return;
        }
        const Te = (g == null ? undefined : g.highlightedChipIndex) !== undefined;
        const Re = pe(ie);
        if (g != null) {
          g.setHighlightedChipIndex(Re);
        }
        if (Re !== undefined) {
          if ((ze = g == null ? undefined : g.chipsRef.current[Re]) != null) {
            ze.focus();
          }
        } else if (Te) {
          if ((Be = v.state.inputRef.current) != null) {
            Be.focus();
          }
        }
        if (ie.which !== 229 && ie.key === "Enter" && G) {
          const Ue = v.state.activeIndex;
          const We = ie.nativeEvent;
          if (Ue === null) {
            if (V) {
              return;
            }
            v.state.setOpen(false, $e(ur, We));
            return;
          }
          cr(ie);
          const lt = v.state.listRef.current[Ue];
          if (lt) {
            v.state.selectionEventRef.current = We;
            lt.click();
            v.state.selectionEventRef.current = null;
          }
        }
      },
      onPointerMove() {
        v.state.keyboardActiveRef.current = false;
      },
      onPointerDown() {
        v.state.keyboardActiveRef.current = false;
      }
    }, he],
    stateAttributesMapping: Pb
  });
  const _e = m ? <wb.Provider value={PE}>{Se}</wb.Provider> : Se;
  return <E.Fragment>{G && re && <PB ref={v.state.startDismissRef} />}{_e}</E.Fragment>;
});
function zB(e, n, r, i, o) {
  var a;
  if (e.baseUIHandlerPrevented || i) {
    return;
  }
  const u = dn(e.nativeEvent);
  const h = Mt(u) ? u : null;
  if (h === e.currentTarget || (o == null || !o(h)) && !OC(h)) {
    e.preventDefault();
    if (!r) {
      if ((a = n.state.inputRef.current) != null) {
        a.focus();
      }
      if (n.state.openOnInputClick) {
        n.state.setOpen(true, $e(IC, e.nativeEvent));
      }
    }
  }
}
const NB = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    ...h
  } = n;
  const {
    state: a
  } = Gr();
  const c = Vo();
  const {
    filteredItems: d
  } = Ha();
  const p = Pe(c, Ze.open);
  const f = Pe(c, Ze.mounted);
  const S = Pe(c, Ze.popupSide);
  const _ = Pe(c, Ze.positionerElement);
  const x = Pe(c, Ze.disabled);
  const w = Pe(c, Ze.readOnly);
  const g = Pe(c, Ze.hasSelectedValue);
  const b = Pe(c, Ze.selectionMode);
  const m = f && _ ? S : null;
  const v = x;
  const C = d.length === 0;
  const A = {
    ...a,
    open: p,
    disabled: v,
    readOnly: w,
    popupSide: m,
    listEmpty: C,
    placeholder: b === "none" ? false : !g
  };
  const M = je(R => {
    c.set("inputGroupElement", R);
  });
  return Je("div", n, {
    ref: [r, M],
    props: [{
      role: "group",
      onMouseDown(R) {
        zB(R, c, v, w, I => Xe(c.state.chipsContainerRef.current, I));
      }
    }, h],
    state: A,
    stateAttributesMapping: Pb
  });
});
const _Component40 = NB;
const HB = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    ...h
  } = n;
  return Je("span", n, {
    ref: r,
    props: [{
      "aria-hidden": true,
      children: "▼"
    }, h]
  });
});
const FB = {
  ...xs,
  ...ku
};
const UB = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    disabled: u = false,
    nativeButton: h = true,
    keepMounted: a = false,
    style: c,
    ...d
  } = n;
  const {
    disabled: p
  } = Gr();
  const f = Vo();
  const S = Pe(f, Ze.selectionMode);
  const _ = Pe(f, Ze.disabled);
  const x = Pe(f, Ze.readOnly);
  const w = Pe(f, Ze.open);
  const g = Pe(f, Ze.selectedValue);
  const b = Pe(f, Ze.hasSelectionChips);
  const m = Ib();
  let v = false;
  if (S === "none") {
    v = m !== "";
  } else if (S === "single") {
    v = g != null;
  } else {
    v = b;
  }
  const C = p || _ || u;
  const {
    buttonRef: T,
    getButtonProps: A
  } = Es({
    native: h,
    disabled: C
  });
  const {
    mounted: M,
    transitionStatus: R,
    setMounted: I
  } = zo(v);
  const j = {
    disabled: C,
    visible: v,
    open: w,
    transitionStatus: R
  };
  qr({
    open: v,
    ref: f.state.clearRef,
    onComplete() {
      if (!v) {
        I(false);
      }
    }
  });
  const W = Je("button", n, {
    state: j,
    ref: [r, T, f.state.clearRef],
    props: [{
      tabIndex: -1,
      children: "x",
      onMouseDown(N) {
        N.preventDefault();
      },
      onClick(N) {
        var $;
        if (C || x) {
          return;
        }
        const D = f.state.keyboardActiveRef;
        f.state.setInputValue("", $e(yS, N.nativeEvent));
        if (S !== "none") {
          f.state.setSelectedValue(Array.isArray(g) ? [] : null, $e(yS, N.nativeEvent));
          f.state.setIndices({
            activeIndex: null,
            selectedIndex: null,
            type: D.current ? "keyboard" : "pointer"
          });
        } else {
          f.state.setIndices({
            activeIndex: null,
            type: D.current ? "keyboard" : "pointer"
          });
        }
        if (($ = f.state.inputRef.current) != null) {
          $.focus();
        }
      }
    }, d, A],
    stateAttributesMapping: FB
  });
  if (a || M) {
    return W;
  } else {
    return null;
  }
});
const zR = E.createContext(null);
function VB() {
  return E.useContext(zR);
}
function WB(e) {
  const {
    children: n,
    items: r
  } = e;
  const i = E.useMemo(() => ({
    items: r
  }), [r]);
  return <zR.Provider value={i}>{n}</zR.Provider>;
}
function NR(e) {
  const {
    children: n
  } = e;
  const {
    filteredItems: r
  } = Ha();
  const i = VB();
  const o = i ? i.items : r;
  if (o) {
    return <E.Fragment>{o.map(n)}</E.Fragment>;
  } else {
    return null;
  }
}
const $B = E.forwardRef(function (n, r) {
  var i;
  const {
    render: o,
    className: u,
    style: h,
    children: a,
    ...c
  } = n;
  const d = Vo();
  const p = TR();
  const f = !!BR();
  const {
    filteredItems: S,
    hasItems: _
  } = Ha();
  const x = Pe(d, Ze.selectionMode);
  const w = Pe(d, Ze.grid);
  const g = Pe(d, Ze.popupProps);
  const b = Pe(d, Ze.virtualized);
  const m = x === "multiple";
  const v = S.length === 0;
  const C = je(j => {
    d.set("positionerElement", j);
  });
  const T = je(j => {
    d.set("listElement", j);
  });
  const A = E.useMemo(() => typeof a == "function" ? i ||= <NR>{a}</NR> : a, [a]);
  const M = {
    empty: v
  };
  const R = p.useState("floatingId");
  const I = Je("div", n, {
    state: M,
    ref: [r, T, f ? null : C],
    props: [g, {
      children: A,
      tabIndex: -1,
      id: R,
      role: w ? "grid" : "listbox",
      "aria-multiselectable": m ? "true" : undefined,
      onKeyDown(j) {
        if (!d.state.disabled && !d.state.readOnly && j.key === "Enter") {
          const W = d.state.activeIndex;
          if (W == null) {
            return;
          }
          cr(j);
          const z = j.nativeEvent;
          const N = d.state.listRef.current[W];
          if (N) {
            d.state.selectionEventRef.current = z;
            N.click();
            d.state.selectionEventRef.current = null;
          }
        }
      },
      onKeyDownCapture() {
        d.state.keyboardActiveRef.current = true;
      },
      onPointerMoveCapture() {
        d.state.keyboardActiveRef.current = false;
      }
    }, c]
  });
  if (b) {
    return I;
  } else {
    return <Iu elementsRef={d.state.listRef} labelsRef={_ ? undefined : d.state.labelsRef}>{I}</Iu>;
  }
});
const qB = "⁠";
const GB = 200;
function YB(e) {
  const n = e.ownerDocument.createTreeWalker(e, NodeFilter.SHOW_TEXT);
  let r = null;
  while (n.nextNode()) {
    const i = n.currentNode;
    if (i.nodeValue !== "") {
      r = i;
    }
  }
  return r;
}
function XB() {
  const e = xn();
  const n = E.useRef(null);
  E.useEffect(() => {
    if (Vv) {
      return;
    }
    const r = n.current;
    if (r == null) {
      return;
    }
    const i = YB(r);
    if (i == null) {
      return;
    }
    const o = i.nodeValue ?? "";
    const u = `${o}${qB}`;
    i.nodeValue = u;
    e.start(GB, () => {
      if (i.nodeValue === u) {
        i.nodeValue = o;
      }
    });
    return () => {
      e.clear();
      if (i.nodeValue === u) {
        i.nodeValue = o;
      }
    };
  }, [n, e]);
  return n;
}
const jR = E.createContext(undefined);
function KB() {
  const e = E.useContext(jR);
  if (e === undefined) {
    throw new Error(Bt(18));
  }
  return e;
}
const ZB = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    items: h,
    ...a
  } = n;
  const [c, d] = E.useState();
  const p = E.useMemo(() => ({
    labelId: c,
    setLabelId: d,
    items: h
  }), [c, d, h]);
  const f = Je("div", n, {
    ref: r,
    props: [{
      role: "group",
      "aria-labelledby": c
    }, a]
  });
  const S = <jR.Provider value={p}>{f}</jR.Provider>;
  if (h) {
    return <WB items={h}>{S}</WB>;
  } else {
    return S;
  }
});
const QB = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    id: h,
    ...a
  } = n;
  const {
    setLabelId: c
  } = KB();
  const d = $n(h);
  Fe(() => {
    c(d);
    return () => {
      c(undefined);
    };
  }, [d, c]);
  return Je("div", n, {
    ref: r,
    props: [{
      id: d
    }, a]
  });
});
const JB = E.createContext(undefined);
const e6 = E.createContext(false);
function t6() {
  return E.useContext(e6);
}
const n6 = E.memo(E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    value: h = null,
    index: a,
    disabled: c = false,
    nativeButton: d = false,
    ...p
  } = n;
  const f = E.useRef(false);
  const S = E.useRef(null);
  const _ = za({
    index: a,
    textRef: S,
    indexGuessBehavior: Rb.GuessFromOrder
  });
  const x = Vo();
  const w = t6();
  const {
    flatFilteredItems: g,
    hasItems: b
  } = Ha();
  const m = Pe(x, Ze.open);
  const v = Pe(x, Ze.selectionMode);
  const C = Pe(x, Ze.readOnly);
  const T = Pe(x, Ze.virtualized);
  const A = Pe(x, Ze.isItemEqualToValue);
  const M = v !== "none";
  const R = a ?? (T ? Mo(g, h, A) : _.index);
  const I = _.index !== -1;
  const j = Pe(x, Ze.id);
  const W = Pe(x, Ze.isActive, R);
  const z = Pe(x, Ze.isSelected, h);
  const N = Pe(x, Ze.itemProps);
  const D = E.useRef(null);
  const $ = j != null && I ? `${j}-${R}` : undefined;
  const G = z && M;
  Fe(() => {
    if (!I || !T && a == null) {
      return;
    }
    const ne = x.state.listRef.current;
    ne[R] = D.current;
    return () => {
      delete ne[R];
    };
  }, [I, T, R, a, x]);
  Fe(() => {
    if (!I || b) {
      return;
    }
    const J = x.state.valuesRef.current;
    J[R] = h;
    if (v !== "none") {
      x.state.allValuesRef.current.push(h);
    }
    return () => {
      delete J[R];
    };
  }, [I, b, R, h, x, v]);
  Fe(() => {
    if (!m) {
      f.current = false;
      return;
    }
    if (!I || b) {
      return;
    }
    const J = x.state.selectedValue;
    const ne = Array.isArray(J) ? J[J.length - 1] : J;
    if (ai(h, ne, A)) {
      x.set("selectedIndex", R);
    }
  }, [I, b, m, x, R, h, A]);
  const {
    getButtonProps: q,
    buttonRef: U
  } = Es({
    disabled: c,
    focusableWhenDisabled: true,
    native: d,
    composite: true
  });
  const L = {
    disabled: c,
    selected: G,
    highlighted: W
  };
  function F(J) {
    function ne() {
      x.state.handleSelection(J, h);
    }
    if (x.state.submitOnItemClick) {
      cs.flushSync(ne);
      x.state.requestSubmit();
    } else {
      ne();
    }
  }
  const P = {
    id: $,
    role: w ? "gridcell" : "option",
    "aria-selected": M ? G : undefined,
    tabIndex: undefined,
    onPointerDownCapture(J) {
      f.current = true;
      J.preventDefault();
    },
    onMouseDown(J) {
      J.preventDefault();
    },
    onClick(J) {
      if (!c && !C) {
        F(J.nativeEvent);
      }
    },
    onMouseUp(J) {
      const ne = f.current;
      f.current = false;
      if (!c && !C && J.button === 0 && !ne && !!W) {
        F(J.nativeEvent);
      }
    }
  };
  const V = Je("div", n, {
    ref: [U, r, _.ref, D],
    state: L,
    props: [N, P, p, q]
  });
  const Z = E.useMemo(() => ({
    selected: G,
    textRef: S
  }), [G, S]);
  return <JB.Provider value={Z}>{V}</JB.Provider>;
}));
const _Component41 = n6;
const _Component42 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    children: h,
    ...a
  } = n;
  const {
    filteredItems: c
  } = Ha();
  const d = Vo();
  const p = XB();
  const f = c.length === 0 ? h : null;
  return Je("div", n, {
    ref: [r, d.state.emptyRef, p],
    props: [{
      children: f,
      role: "status",
      "aria-live": "polite",
      "aria-atomic": true
    }, a]
  });
});
const HR = E.createContext(undefined);
function Lu() {
  const e = E.useContext(HR);
  if (e === undefined) {
    throw new Error(Bt(53));
  }
  return e;
}
let nh = function (e) {
  e.scrollAreaCornerHeight = "--scroll-area-corner-height";
  e.scrollAreaCornerWidth = "--scroll-area-corner-width";
  return e;
}({});
const gf = 500;
const vx = 16;
function Ss(e, n, r) {
  if (!e) {
    return 0;
  }
  const i = getComputedStyle(e);
  const o = r === "x" ? "Inline" : "Block";
  if (r === "x" && n === "margin") {
    return parseFloat(i[`${n}InlineStart`]) * 2;
  } else {
    return parseFloat(i[`${n}${o}Start`]) + parseFloat(i[`${n}${o}End`]);
  }
}
let i6 = function (e) {
  e.orientation = "data-orientation";
  e.hovering = "data-hovering";
  e.scrolling = "data-scrolling";
  e.hasOverflowX = "data-has-overflow-x";
  e.hasOverflowY = "data-has-overflow-y";
  e.overflowXStart = "data-overflow-x-start";
  e.overflowXEnd = "data-overflow-x-end";
  e.overflowYStart = "data-overflow-y-start";
  e.overflowYEnd = "data-overflow-y-end";
  return e;
}({});
const vf = "base-ui-disable-scrollbar";
const gu = {
  className: vf,
  getElement(e) {
    return <style nonce={e} href={vf} precedence="base-ui:low">{`.${vf}{scrollbar-width:none}.${vf}::-webkit-scrollbar{display:none}`}</style>;
  }
};
let kl = function (e) {
  e.scrolling = "data-scrolling";
  e.hasOverflowX = "data-has-overflow-x";
  e.hasOverflowY = "data-has-overflow-y";
  e.overflowXStart = "data-overflow-x-start";
  e.overflowXEnd = "data-overflow-x-end";
  e.overflowYStart = "data-overflow-y-start";
  e.overflowYEnd = "data-overflow-y-end";
  return e;
}({});
const Nh = {
  hasOverflowX: e => e ? {
    [kl.hasOverflowX]: ""
  } : null,
  hasOverflowY: e => e ? {
    [kl.hasOverflowY]: ""
  } : null,
  overflowXStart: e => e ? {
    [kl.overflowXStart]: ""
  } : null,
  overflowXEnd: e => e ? {
    [kl.overflowXEnd]: ""
  } : null,
  overflowYStart: e => e ? {
    [kl.overflowYStart]: ""
  } : null,
  overflowYEnd: e => e ? {
    [kl.overflowYEnd]: ""
  } : null,
  cornerHidden: () => null
};
const o6 = E.createContext(undefined);
const a6 = {
  disableStyleElements: false
};
function Bb() {
  return E.useContext(o6) ?? a6;
}
const l6 = {
  x: 0,
  y: 0
};
const bx = {
  width: 0,
  height: 0
};
const c6 = {
  xStart: false,
  xEnd: false,
  yStart: false,
  yEnd: false
};
const u6 = {
  x: true,
  y: true,
  corner: true
};
const _Component36 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    overflowEdgeThreshold: u,
    style: h,
    ...a
  } = n;
  const c = f6(u);
  const d = $n();
  const p = xn();
  const f = xn();
  const {
    nonce: S,
    disableStyleElements: _
  } = Bb();
  const [x, w] = E.useState(false);
  const [g, b] = E.useState(false);
  const [m, v] = E.useState(false);
  const [C, T] = E.useState(false);
  const [A, M] = E.useState(false);
  const [R, I] = E.useState(bx);
  const [j, W] = E.useState(bx);
  const [z, N] = E.useState(c6);
  const [D, $] = E.useState(u6);
  const G = E.useRef(null);
  const q = E.useRef(null);
  const U = E.useRef(null);
  const L = E.useRef(null);
  const F = E.useRef(null);
  const P = E.useRef(null);
  const V = E.useRef(null);
  const Z = E.useRef(false);
  const J = E.useRef(0);
  const ne = E.useRef(0);
  const ue = E.useRef(0);
  const ee = E.useRef(0);
  const Y = E.useRef("vertical");
  const re = E.useRef(l6);
  const ce = je(he => {
    const ye = he.x - re.current.x;
    const pe = he.y - re.current.y;
    re.current = he;
    if (pe !== 0) {
      v(true);
      p.start(gf, () => {
        v(false);
      });
    }
    if (ye !== 0) {
      b(true);
      f.start(gf, () => {
        b(false);
      });
    }
  });
  const ge = je(he => {
    if (he.button === 0) {
      Z.current = true;
      J.current = he.clientY;
      ne.current = he.clientX;
      Y.current = he.currentTarget.getAttribute(i6.orientation);
      if (q.current) {
        ue.current = q.current.scrollTop;
        ee.current = q.current.scrollLeft;
      }
      if (F.current && Y.current === "vertical") {
        F.current.setPointerCapture(he.pointerId);
      }
      if (P.current && Y.current === "horizontal") {
        P.current.setPointerCapture(he.pointerId);
      }
    }
  });
  const de = je(he => {
    if (!Z.current) {
      return;
    }
    const ye = he.clientY - J.current;
    const pe = he.clientX - ne.current;
    if (q.current) {
      const Se = q.current.scrollHeight;
      const _e = q.current.clientHeight;
      const ie = q.current.scrollWidth;
      const te = q.current.clientWidth;
      if (F.current && U.current && Y.current === "vertical") {
        const be = Ss(U.current, "padding", "y");
        const ve = Ss(F.current, "margin", "y");
        const Te = F.current.offsetHeight;
        const Re = U.current.offsetHeight - Te - be - ve;
        const ze = ye / Re;
        q.current.scrollTop = ue.current + ze * (Se - _e);
        he.preventDefault();
        v(true);
        p.start(gf, () => {
          v(false);
        });
      }
      if (P.current && L.current && Y.current === "horizontal") {
        const be = Ss(L.current, "padding", "x");
        const ve = Ss(P.current, "margin", "x");
        const Te = P.current.offsetWidth;
        const Re = L.current.offsetWidth - Te - be - ve;
        const ze = pe / Re;
        q.current.scrollLeft = ee.current + ze * (ie - te);
        he.preventDefault();
        b(true);
        f.start(gf, () => {
          b(false);
        });
      }
    }
  });
  const me = je(he => {
    Z.current = false;
    if (F.current && Y.current === "vertical") {
      F.current.releasePointerCapture(he.pointerId);
    }
    if (P.current && Y.current === "horizontal") {
      P.current.releasePointerCapture(he.pointerId);
    }
  });
  function H(he) {
    T(he.pointerType === "touch");
  }
  function ae(he) {
    H(he);
    if (he.pointerType !== "touch") {
      const ye = Xe(G.current, he.target);
      w(ye);
    }
  }
  const oe = E.useMemo(() => ({
    scrolling: g || m,
    hasOverflowX: !D.x,
    hasOverflowY: !D.y,
    overflowXStart: z.xStart,
    overflowXEnd: z.xEnd,
    overflowYStart: z.yStart,
    overflowYEnd: z.yEnd,
    cornerHidden: D.corner
  }), [g, m, D.x, D.y, D.corner, z]);
  const X = {
    role: "presentation",
    onPointerEnter: ae,
    onPointerMove: ae,
    onPointerDown: H,
    onPointerLeave() {
      w(false);
    },
    style: {
      position: "relative",
      [nh.scrollAreaCornerHeight]: `${R.height}px`,
      [nh.scrollAreaCornerWidth]: `${R.width}px`
    }
  };
  const Q = Je("div", n, {
    state: oe,
    ref: [r, G],
    props: [X, a],
    stateAttributesMapping: Nh
  });
  const se = E.useMemo(() => ({
    handlePointerDown: ge,
    handlePointerMove: de,
    handlePointerUp: me,
    handleScroll: ce,
    cornerSize: R,
    setCornerSize: I,
    thumbSize: j,
    setThumbSize: W,
    hasMeasuredScrollbar: A,
    setHasMeasuredScrollbar: M,
    touchModality: C,
    cornerRef: V,
    scrollingX: g,
    setScrollingX: b,
    scrollingY: m,
    setScrollingY: v,
    hovering: x,
    setHovering: w,
    viewportRef: q,
    rootRef: G,
    scrollbarYRef: U,
    scrollbarXRef: L,
    thumbYRef: F,
    thumbXRef: P,
    rootId: d,
    hiddenState: D,
    setHiddenState: $,
    overflowEdges: z,
    setOverflowEdges: N,
    viewportState: oe,
    overflowEdgeThreshold: c
  }), [ge, de, me, ce, R, j, A, C, g, b, m, v, x, w, d, D, z, oe, c]);
  return <HR.Provider value={se}>{!_ && gu.getElement(S)}{Q}</HR.Provider>;
});
function f6(e) {
  if (typeof e == "number") {
    const n = Math.max(0, e);
    return {
      xStart: n,
      xEnd: n,
      yStart: n,
      yEnd: n
    };
  }
  return {
    xStart: Math.max(0, (e == null ? undefined : e.xStart) || 0),
    xEnd: Math.max(0, (e == null ? undefined : e.xEnd) || 0),
    yStart: Math.max(0, (e == null ? undefined : e.yStart) || 0),
    yEnd: Math.max(0, (e == null ? undefined : e.yEnd) || 0)
  };
}
const FR = E.createContext(undefined);
function h6() {
  const e = E.useContext(FR);
  if (e === undefined) {
    throw new Error(Bt(55));
  }
  return e;
}
function Un(e, n = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
  return Math.max(n, Math.min(e, r));
}
let Ro = function (e) {
  e.scrollAreaOverflowXStart = "--scroll-area-overflow-x-start";
  e.scrollAreaOverflowXEnd = "--scroll-area-overflow-x-end";
  e.scrollAreaOverflowYStart = "--scroll-area-overflow-y-start";
  e.scrollAreaOverflowYEnd = "--scroll-area-overflow-y-end";
  return e;
}({});
const Ps = 1;
function zb(e, n) {
  return Math.max(0, e - n);
}
function Vl(e, n) {
  if (n <= 0) {
    return 0;
  }
  const r = Un(e, 0, n);
  const i = r;
  const o = n - r;
  const u = i <= Ps;
  const h = o <= Ps;
  if (u && h) {
    if (i <= o) {
      return 0;
    } else {
      return n;
    }
  } else if (u) {
    return 0;
  } else if (h) {
    return n;
  } else {
    return r;
  }
}
let yx = false;
function p6() {
  if (!yx && !ch) {
    if (typeof CSS !== "undefined" && "registerProperty" in CSS) {
      [Ro.scrollAreaOverflowXStart, Ro.scrollAreaOverflowXEnd, Ro.scrollAreaOverflowYStart, Ro.scrollAreaOverflowYEnd].forEach(e => {
        try {
          CSS.registerProperty({
            name: e,
            syntax: "<length>",
            inherits: false,
            initialValue: "0px"
          });
        } catch {}
      });
    }
    yx = true;
  }
}
const _Component35 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    ...h
  } = n;
  const {
    viewportRef: a,
    scrollbarYRef: c,
    scrollbarXRef: d,
    thumbYRef: p,
    thumbXRef: f,
    cornerRef: S,
    cornerSize: _,
    setCornerSize: x,
    setThumbSize: w,
    rootId: g,
    setHiddenState: b,
    hiddenState: m,
    setHasMeasuredScrollbar: v,
    handleScroll: C,
    setHovering: T,
    setOverflowEdges: A,
    overflowEdges: M,
    overflowEdgeThreshold: R,
    scrollingX: I,
    scrollingY: j
  } = Lu();
  const W = Us();
  const z = E.useRef(true);
  const N = E.useRef([NaN, NaN, NaN, NaN]);
  const D = xn();
  const $ = xn();
  const G = je(() => {
    const V = a.current;
    const Z = c.current;
    const J = d.current;
    const ne = p.current;
    const ue = f.current;
    const ee = S.current;
    if (!V) {
      return;
    }
    const Y = V.scrollHeight;
    const re = V.scrollWidth;
    const ce = V.clientHeight;
    const ge = V.clientWidth;
    const de = V.scrollTop;
    const me = V.scrollLeft;
    const H = N.current;
    const ae = Number.isNaN(H[0]);
    H[0] = ce;
    H[1] = Y;
    H[2] = ge;
    H[3] = re;
    if (ae) {
      v(true);
    }
    if (Y === 0 || re === 0) {
      return;
    }
    const oe = g6(V);
    const X = oe.y;
    const Q = oe.x;
    const se = ge / re;
    const he = ce / Y;
    const ye = Math.max(0, re - ge);
    const pe = Math.max(0, Y - ce);
    let Se = 0;
    let _e = 0;
    if (!Q) {
      let St = 0;
      if (W === "rtl") {
        St = Un(-me, 0, ye);
      } else {
        St = Un(me, 0, ye);
      }
      Se = Vl(St, ye);
      _e = ye - Se;
    }
    const ie = X ? 0 : Un(de, 0, pe);
    const te = X ? 0 : Vl(ie, pe);
    const be = X ? 0 : pe - te;
    const ve = Q ? 0 : ge;
    const Te = X ? 0 : ce;
    let Re = 0;
    let ze = 0;
    if (!Q && !X) {
      Re = (Z == null ? undefined : Z.offsetWidth) || 0;
      ze = (J == null ? undefined : J.offsetHeight) || 0;
    }
    const Be = _.width === 0 && _.height === 0;
    const Ue = Be ? Re : 0;
    const We = Be ? ze : 0;
    const lt = Ss(J, "padding", "x");
    const dt = Ss(Z, "padding", "y");
    const _t = Ss(ue, "margin", "x");
    const Dt = Ss(ne, "margin", "y");
    const kt = ve - lt - _t;
    const Ge = Te - dt - Dt;
    const Ye = J ? Math.min(J.offsetWidth - Ue, kt) : kt;
    const Qe = Z ? Math.min(Z.offsetHeight - We, Ge) : Ge;
    const gt = Math.max(vx, Ye * se);
    const ft = Math.max(vx, Qe * he);
    w(St => St.height === ft && St.width === gt ? St : {
      width: gt,
      height: ft
    });
    if (Z && ne) {
      const St = Z.offsetHeight - ft - dt - Dt;
      const it = Y - ce;
      const et = it === 0 ? 0 : de / it;
      const Wt = Math.min(St, Math.max(0, et * St));
      ne.style.transform = `translate3d(0,${Wt}px,0)`;
    }
    if (J && ue) {
      const St = J.offsetWidth - gt - lt - _t;
      const it = re - ge;
      const et = it === 0 ? 0 : me / it;
      const Wt = W === "rtl" ? Un(et * St, -St, 0) : Un(et * St, 0, St);
      ue.style.transform = `translate3d(${Wt}px,0,0)`;
    }
    const Ke = [[Ro.scrollAreaOverflowXStart, Se], [Ro.scrollAreaOverflowXEnd, _e], [Ro.scrollAreaOverflowYStart, te], [Ro.scrollAreaOverflowYEnd, be]];
    for (const [St, it] of Ke) {
      V.style.setProperty(St, `${it}px`);
    }
    if (ee) {
      if (Q || X) {
        x({
          width: 0,
          height: 0
        });
      } else if (!Q && !X) {
        x({
          width: Re,
          height: ze
        });
      }
    }
    b(St => v6(St, oe));
    const en = {
      xStart: !Q && Se > R.xStart,
      xEnd: !Q && _e > R.xEnd,
      yStart: !X && te > R.yStart,
      yEnd: !X && be > R.yEnd
    };
    A(St => St.xStart === en.xStart && St.xEnd === en.xEnd && St.yStart === en.yStart && St.yEnd === en.yEnd ? St : en);
  });
  Fe(() => {
    if (a.current) {
      p6();
    }
  }, [a]);
  Fe(() => {
    queueMicrotask(G);
  }, [G, m, W]);
  Fe(() => {
    var V;
    if ((V = a.current) != null && V.matches(":hover")) {
      T(true);
    }
  }, [a, T]);
  E.useEffect(() => {
    const V = a.current;
    if (typeof ResizeObserver === "undefined" || !V) {
      return;
    }
    let Z = false;
    const J = new ResizeObserver(() => {
      if (!Z) {
        Z = true;
        const ne = N.current;
        if (ne[0] === V.clientHeight && ne[1] === V.scrollHeight && ne[2] === V.clientWidth && ne[3] === V.scrollWidth) {
          return;
        }
      }
      G();
    });
    J.observe(V);
    $.start(0, () => {
      const ne = V.getAnimations({
        subtree: true
      });
      if (ne.length !== 0) {
        Promise.allSettled(ne.map(ue => ue.finished)).then(G).catch(() => {});
      }
    });
    return () => {
      J.disconnect();
      $.clear();
    };
  }, [G, a, $]);
  function q() {
    z.current = false;
  }
  const U = {
    role: "presentation",
    ...(g && {
      "data-id": `${g}-viewport`
    }),
    tabIndex: m.x && m.y ? -1 : 0,
    className: gu.className,
    style: {
      overflow: "scroll"
    },
    onScroll() {
      if (a.current) {
        G();
        if (!z.current) {
          C({
            x: a.current.scrollLeft,
            y: a.current.scrollTop
          });
        }
        D.start(100, () => {
          z.current = true;
        });
      }
    },
    onWheel: q,
    onTouchMove: q,
    onPointerMove: q,
    onPointerEnter: q,
    onKeyDown: q
  };
  const L = E.useMemo(() => ({
    scrolling: I || j,
    hasOverflowX: !m.x,
    hasOverflowY: !m.y,
    overflowXStart: M.xStart,
    overflowXEnd: M.xEnd,
    overflowYStart: M.yStart,
    overflowYEnd: M.yEnd,
    cornerHidden: m.corner
  }), [I, j, m.x, m.y, m.corner, M]);
  const F = Je("div", n, {
    ref: [r, a],
    state: L,
    props: [U, h],
    stateAttributesMapping: Nh
  });
  const P = E.useMemo(() => ({
    computeThumbPosition: G
  }), [G]);
  return <FR.Provider value={P}>{F}</FR.Provider>;
});
function g6(e) {
  const n = e.clientHeight >= e.scrollHeight;
  const r = e.clientWidth >= e.scrollWidth;
  return {
    y: n,
    x: r,
    corner: n || r
  };
}
function v6(e, n) {
  if (e.y === n.y && e.x === n.x && e.corner === n.corner) {
    return e;
  } else {
    return n;
  }
}
const UR = E.createContext(undefined);
function b6() {
  const e = E.useContext(UR);
  if (e === undefined) {
    throw new Error(Bt(54));
  }
  return e;
}
let rh = function (e) {
  e.scrollAreaThumbHeight = "--scroll-area-thumb-height";
  e.scrollAreaThumbWidth = "--scroll-area-thumb-width";
  return e;
}({});
const _Component38 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    orientation: u = "vertical",
    keepMounted: h = false,
    style: a,
    ...c
  } = n;
  const {
    hovering: d,
    scrollingX: p,
    scrollingY: f,
    hiddenState: S,
    overflowEdges: _,
    scrollbarYRef: x,
    scrollbarXRef: w,
    viewportRef: g,
    thumbYRef: b,
    thumbXRef: m,
    handlePointerDown: v,
    handlePointerUp: C,
    rootId: T,
    thumbSize: A,
    hasMeasuredScrollbar: M
  } = Lu();
  const R = {
    hovering: d,
    scrolling: {
      horizontal: p,
      vertical: f
    }[u],
    orientation: u,
    hasOverflowX: !S.x,
    hasOverflowY: !S.y,
    overflowXStart: _.xStart,
    overflowXEnd: _.xEnd,
    overflowYStart: _.yStart,
    overflowYEnd: _.yEnd,
    cornerHidden: S.corner
  };
  const I = Us();
  const j = !M && !h;
  const W = u === "vertical" ? S.y : S.x;
  const z = h || !W;
  E.useEffect(() => {
    if (!z) {
      return;
    }
    const G = g.current;
    const q = u === "vertical" ? x.current : w.current;
    if (!q) {
      return;
    }
    function U(L) {
      if (!G || !q || L.ctrlKey) {
        return;
      }
      L.preventDefault();
      const F = u === "horizontal";
      const P = F ? "scrollLeft" : "scrollTop";
      const V = F ? L.deltaX : L.deltaY;
      const Z = F ? G.scrollWidth - G.clientWidth : G.scrollHeight - G.clientHeight;
      const J = F && I === "rtl" ? -Z : 0;
      const ne = F && I === "rtl" ? 0 : Z;
      const ue = G[P];
      if ((!(ue <= J) || !(V < 0)) && (!(ue >= ne) || !(V > 0))) {
        G[P] = Math.min(ne, Math.max(J, ue + V));
      }
    }
    return Tt(q, "wheel", U, {
      passive: false
    });
  }, [I, u, w, x, z, g]);
  const N = {
    ...(T && {
      "data-id": `${T}-scrollbar`
    }),
    onPointerDown(G) {
      if (G.button !== 0) {
        return;
      }
      const q = dn(G.nativeEvent);
      const U = u === "vertical" ? b.current : m.current;
      if ((!U || !Xe(U, q)) && g.current) {
        if (b.current && x.current && u === "vertical") {
          const L = Ss(b.current, "margin", "y");
          const F = Ss(x.current, "padding", "y");
          const P = b.current.offsetHeight;
          const V = x.current.getBoundingClientRect();
          const Z = G.clientY - V.top - P / 2 - F + L / 2;
          const J = g.current.scrollHeight;
          const ne = g.current.clientHeight;
          const ue = x.current.offsetHeight - P - F - L;
          const Y = Z / ue * (J - ne);
          g.current.scrollTop = Y;
        }
        if (m.current && w.current && u === "horizontal") {
          const L = Ss(m.current, "margin", "x");
          const F = Ss(w.current, "padding", "x");
          const P = m.current.offsetWidth;
          const V = w.current.getBoundingClientRect();
          const Z = G.clientX - V.left - P / 2 - F + L / 2;
          const J = g.current.scrollWidth;
          const ne = g.current.clientWidth;
          const ue = w.current.offsetWidth - P - F - L;
          const ee = Z / ue;
          let Y;
          if (I === "rtl") {
            Y = (1 - ee) * (J - ne);
            if (g.current.scrollLeft <= 0) {
              Y = -Y;
            }
          } else {
            Y = ee * (J - ne);
          }
          g.current.scrollLeft = Y;
        }
        v(G);
      }
    },
    onPointerUp: C,
    style: {
      position: "absolute",
      touchAction: "none",
      WebkitUserSelect: "none",
      userSelect: "none",
      visibility: j ? "hidden" : undefined,
      ...(u === "vertical" && {
        top: 0,
        bottom: `var(${nh.scrollAreaCornerHeight})`,
        insetInlineEnd: 0,
        [rh.scrollAreaThumbHeight]: `${A.height}px`
      }),
      ...(u === "horizontal" && {
        insetInlineStart: 0,
        insetInlineEnd: `var(${nh.scrollAreaCornerWidth})`,
        bottom: 0,
        [rh.scrollAreaThumbWidth]: `${A.width}px`
      })
    }
  };
  const D = Je("div", n, {
    ref: [r, u === "vertical" ? x : w],
    state: R,
    props: [N, c],
    stateAttributesMapping: Nh
  });
  const $ = E.useMemo(() => ({
    orientation: u
  }), [u]);
  if (z) {
    return <UR.Provider value={$}>{D}</UR.Provider>;
  } else {
    return null;
  }
});
const _6 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    ...h
  } = n;
  const {
    computeThumbPosition: a
  } = h6();
  const {
    viewportState: c
  } = Lu();
  const d = E.useRef(null);
  Fe(() => {
    if (typeof ResizeObserver === "undefined") {
      return;
    }
    let f = false;
    const S = new ResizeObserver(() => {
      if (!f) {
        f = true;
        return;
      }
      a();
    });
    if (d.current) {
      S.observe(d.current);
    }
    return () => {
      S.disconnect();
    };
  }, [a]);
  return Je("div", n, {
    ref: [r, d],
    state: c,
    stateAttributesMapping: Nh,
    props: [{
      role: "presentation",
      style: {
        minWidth: "fit-content"
      }
    }, h]
  });
});
const _Component37 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    ...h
  } = n;
  const {
    thumbYRef: a,
    thumbXRef: c,
    handlePointerDown: d,
    handlePointerMove: p,
    handlePointerUp: f,
    setScrollingX: S,
    setScrollingY: _,
    hasMeasuredScrollbar: x
  } = Lu();
  const {
    orientation: w
  } = b6();
  return Je("div", n, {
    ref: [r, w === "vertical" ? a : c],
    state: {
      orientation: w
    },
    props: [{
      onPointerDown: d,
      onPointerMove: p,
      onPointerUp(m) {
        if (w === "vertical") {
          _(false);
        }
        if (w === "horizontal") {
          S(false);
        }
        f(m);
      },
      style: {
        visibility: x ? undefined : "hidden",
        ...(w === "vertical" && {
          height: `var(${rh.scrollAreaThumbHeight})`
        }),
        ...(w === "horizontal" && {
          width: `var(${rh.scrollAreaThumbWidth})`
        })
      }
    }, h]
  });
});
const S6 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    ...h
  } = n;
  const {
    cornerRef: a,
    cornerSize: c,
    hiddenState: d
  } = Lu();
  const p = Je("div", n, {
    ref: [r, a],
    props: [{
      style: {
        position: "absolute",
        bottom: 0,
        insetInlineEnd: 0,
        width: c.width,
        height: c.height
      }
    }, h]
  });
  if (d.corner) {
    return null;
  } else {
    return p;
  }
});
function VR({
  className: e,
  children: n,
  scrollFade: r = false,
  scrollbarGutter: i = false,
  fill: o = false,
  clampContentMinWidth: u = true,
  ...h
}) {
  return <_Component36 className={pt("size-full min-h-0", e)} {...h}><_Component35 className={pt("h-full rounded-[inherit] outline-none transition-shadows focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-has-overflow-y:overscroll-y-contain data-has-overflow-x:overscroll-x-contain", r && "mask-t-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-start)))] mask-b-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-y-end)))] mask-l-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-x-start)))] mask-r-from-[calc(100%-min(var(--fade-size),var(--scroll-area-overflow-x-end)))] [--fade-size:1.5rem]", i && "data-has-overflow-y:pe-2.5 data-has-overflow-x:pb-2.5")} data-slot="scroll-area-viewport"><_6 className={pt(o && "size-full")} data-slot="scroll-area-content" style={u ? {
        minWidth: 0
      } : undefined}>{n}</_6></_Component35><_x orientation="vertical" /><_x orientation="horizontal" /><S6 data-slot="scroll-area-corner" /></_Component36>;
}
function _x({
  className: e,
  orientation: n = "vertical",
  ...r
}) {
  return <_Component38 className={pt("m-1 flex opacity-0 transition-opacity delay-300 data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5 data-[orientation=horizontal]:flex-col data-hovering:opacity-100 data-scrolling:opacity-100 data-hovering:delay-0 data-scrolling:delay-0 data-hovering:duration-100 data-scrolling:duration-100", e)} data-slot="scroll-area-scrollbar" orientation={n} {...r}><_Component37 className="relative flex-1 rounded-full bg-foreground/20" data-slot="scroll-area-thumb" /></_Component38>;
}
const _Component46 = kB;
function C6({
  className: e,
  showTrigger: n = false,
  showClear: r = false,
  startAddon: i,
  size: o,
  triggerProps: u,
  clearProps: h,
  ...a
}) {
  const c = o ?? "default";
  return <_Component40 className="relative not-has-[>*.w-full]:w-fit w-full text-foreground has-disabled:opacity-64" data-slot="autocomplete-input-group">{i && <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 start-px z-10 flex items-center ps-[calc(--spacing(3)-1px)] opacity-80 has-[+[data-size=sm]]:ps-[calc(--spacing(2.5)-1px)] [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:-mx-0.5" data-slot="autocomplete-start-addon">{i}</div>}<BB className={pt(i && "data-[size=sm]:*:data-[slot=autocomplete-input]:ps-[calc(--spacing(7.5)-1px)] *:data-[slot=autocomplete-input]:ps-[calc(--spacing(8.5)-1px)] sm:data-[size=sm]:*:data-[slot=autocomplete-input]:ps-[calc(--spacing(7)-1px)] sm:*:data-[slot=autocomplete-input]:ps-[calc(--spacing(8)-1px)]", c === "sm" ? "has-[+[data-slot=autocomplete-trigger],+[data-slot=autocomplete-clear]]:*:data-[slot=autocomplete-input]:pe-6.5" : "has-[+[data-slot=autocomplete-trigger],+[data-slot=autocomplete-clear]]:*:data-[slot=autocomplete-input]:pe-7", e)} data-slot="autocomplete-input" render={<Sb nativeInput={true} size={c} />} {...a} />{n && <I6 className={pt("absolute top-1/2 inline-flex size-8 shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-colors pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 has-[+[data-slot=autocomplete-clear]]:hidden sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", c === "sm" ? "end-0" : "end-0.5")} {...u}><HB data-slot="autocomplete-icon"><_Component39 /></HB></I6>}{r && <O6 className={pt("absolute top-1/2 inline-flex size-8 shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-colors pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 has-[+[data-slot=autocomplete-clear]]:hidden sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", c === "sm" ? "end-0" : "end-0.5")} {...h}><_Component23 /></O6>}</_Component40>;
}
function E6({
  className: e,
  children: n,
  ...r
}) {
  return <_Component41 className={pt("flex min-h-8 cursor-default select-none items-center rounded-sm px-2 py-1 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm", e)} data-slot="autocomplete-item" {...r}>{n}</_Component41>;
}
function R6({
  className: e,
  ...n
}) {
  return <_Component17 className={pt("mx-2 my-1 h-px bg-border last:hidden", e)} data-slot="autocomplete-separator" {...n} />;
}
function T6({
  className: e,
  ...n
}) {
  return <ZB className={pt("[[role=group]+&]:mt-1.5", e)} data-slot="autocomplete-group" {...n} />;
}
function _Component48({
  className: e,
  ...n
}) {
  return <QB className={pt("px-2 py-1.5 font-medium text-muted-foreground text-xs", e)} data-slot="autocomplete-group-label" {...n} />;
}
function A6({
  className: e,
  ...n
}) {
  return <_Component42 className={pt("not-empty:p-2 text-center text-base text-muted-foreground sm:text-sm", e)} data-slot="autocomplete-empty" {...n} />;
}
function M6({
  className: e,
  ...n
}) {
  return <VR scrollbarGutter={true} scrollFade={true}><$B className={pt("not-empty:scroll-py-1 not-empty:p-1 in-data-has-overflow-y:pe-3", e)} data-slot="autocomplete-list" {...n} /></VR>;
}
function O6({
  className: e,
  ...n
}) {
  return <UB className={pt("absolute end-0.5 top-1/2 inline-flex size-8 shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-[color,background-color,box-shadow,opacity] pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", e)} data-slot="autocomplete-clear" {...n}><_Component23 /></UB>;
}
function D6({
  ...e
}) {
  return <NR data-slot="autocomplete-collection" {...e} />;
}
function I6({
  className: e,
  children: n,
  ...r
}) {
  return <OB className={e} data-slot="autocomplete-trigger" {...r}>{n}</OB>;
}
const L6 = wR;
const P6 = _R;
function B6({
  className: e,
  ...n
}) {
  return <_Component43 className={pt("fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0", e)} data-slot="command-dialog-backdrop" {...n} />;
}
function _Component45({
  className: e,
  ...n
}) {
  return <SR className={pt("fixed inset-0 z-50 flex flex-col items-center px-4 py-[max(--spacing(4),4vh)] sm:py-[10vh]", e)} data-slot="command-dialog-viewport" {...n} />;
}
function N6({
  className: e,
  children: n,
  portalProps: r,
  ...i
}) {
  return <P6 {...r}><B6 /><_Component45><_Component44 className={pt("relative row-start-2 flex max-h-105 min-h-0 w-full min-w-0 max-w-xl -translate-y-[calc(1.25rem*var(--nested-dialogs))] scale-[calc(1-0.1*var(--nested-dialogs))] flex-col rounded-2xl border bg-popover not-dark:bg-clip-padding text-popover-foreground opacity-[calc(1-0.1*var(--nested-dialogs))] shadow-lg/5 outline-none transition-[scale,opacity,translate] duration-200 ease-in-out will-change-transform before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:bg-muted/72 before:shadow-[0_1px_--theme(--color-black/4%)] data-nested:data-ending-style:translate-y-8 data-nested:data-starting-style:translate-y-8 data-nested-dialog-open:origin-top data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 **:data-[slot=scroll-area-viewport]:data-has-overflow-y:pe-1 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]", e)} data-slot="command-dialog-popup" {...i}>{n}</_Component44></_Component45></P6>;
}
function _Component55({
  autoHighlight: e = "always",
  keepHighlight: n = true,
  ...r
}) {
  return <_Component46 autoHighlight={e} inline={true} keepHighlight={n} open={true} {...r} />;
}
function H6({
  className: e,
  placeholder: n = undefined,
  ...r
}) {
  return <div className="px-2.5 py-1.5"><C6 autoFocus={true} className={pt("border-transparent! bg-transparent! shadow-none before:hidden has-focus-visible:ring-0", e)} placeholder={n} size="lg" startAddon={<_Component47 />} {...r} /></div>;
}
function F6({
  className: e,
  ...n
}) {
  return <M6 className={pt("not-empty:scroll-py-2 not-empty:p-2", e)} data-slot="command-list" {...n} />;
}
function U6({
  className: e,
  ...n
}) {
  return <A6 className={pt("not-empty:py-6", e)} data-slot="command-empty" {...n} />;
}
function V6({
  className: e,
  ...n
}) {
  return <T6 className={e} data-slot="command-group" {...n} />;
}
function W6({
  className: e,
  ...n
}) {
  return <_Component48 className={e} data-slot="command-group-label" {...n} />;
}
function $6({
  ...e
}) {
  return <D6 data-slot="command-collection" {...e} />;
}
function _Component54({
  className: e,
  ...n
}) {
  return <E6 className={pt("py-1.5", e)} data-slot="command-item" {...n} />;
}
function G6({
  className: e,
  ...n
}) {
  return <R6 className={pt("my-2", e)} data-slot="command-separator" {...n} />;
}
function Y6({
  className: e,
  ...n
}) {
  return <div className={pt("flex items-center justify-between gap-2 rounded-b-[calc(var(--radius-2xl)-1px)] border-t px-5 py-3 text-muted-foreground text-xs", e)} data-slot="command-footer" {...n} />;
}
function WR({
  open: e,
  x: n,
  y: r,
  appId: i,
  workspaces: o,
  currentWorkspaceId: u,
  appWorkspaceId: h,
  isSystem: a,
  onOpenChange: c,
  onOpen: d,
  onInfo: p,
  onUninstall: f,
  onMoveToWorkspace: S
}) {
  const {
    t: _
  } = Lr();
  const x = E.useRef(null);
  const w = h ?? u;
  const g = [...o.values()].filter(b => b.id !== w);
  E.useEffect(() => {
    if (e && x.current) {
      x.current.click();
    }
  }, [e]);
  return <_Component24 open={e} onOpenChange={c}><Zl ref={x} className="fixed z-[9999] p-0 m-0 border-none bg-transparent" style={{
      left: n,
      top: r,
      width: 0,
      height: 0,
      minWidth: 0,
      minHeight: 0,
      padding: 0,
      overflow: "hidden"
    }}><span style={{
        fontSize: 0
      }}> </span></Zl><Fo side="bottom" align="start" sideOffset={4} anchor={e ? {
      getBoundingClientRect: () => ({
        x: n,
        y: r,
        width: 0,
        height: 0,
        top: r,
        right: n,
        bottom: r,
        left: n
      })
    } : undefined}><Fn onClick={() => d(i)}><_Component49 aria-hidden="true" />{_("icon.open")}</Fn>{g.length > 0 && <_Component53><_Component51><_Component50 aria-hidden="true" />{_("icon.moveTo")}</_Component51><_Component52><Ta><Ob>{_("icon.selectTarget")}</Ob>{g.map(b => <Fn onClick={() => S(i, b.id)} key={b.id}>{b.name}</Fn>)}</Ta></_Component52></_Component53>}<Fs /><Fn onClick={() => p(i)}><Hv aria-hidden="true" />{_("icon.properties")}</Fn><Fn variant="destructive" disabled={a} onClick={() => !a && f(i)}><Su aria-hidden="true" />{_("icon.uninstall")}</Fn></Fo></_Component24>;
}
function X6(e) {
  const n = ["#89b4fa", "#a6e3a1", "#f38ba8", "#f9e2af", "#cba6f7", "#94e2d5"];
  let r = 0;
  for (let i = 0; i < e.length; i++) {
    r = e.charCodeAt(i) + ((r << 5) - r);
  }
  return n[Math.abs(r) % n.length];
}
function wx(e) {
  if (e) {
    if (typeof e == "string") {
      return e;
    } else if (typeof e == "object" && e !== null) {
      return Object.values(e).join(" ");
    } else {
      return String(e);
    }
  } else {
    return "";
  }
}
const Sx = {
  open: false,
  x: 0,
  y: 0,
  appId: null,
  isSystem: false,
  appWorkspaceId: null
};
function K6({
  installedApps: e,
  runningApps: n,
  desktopIcons: r,
  onLaunchApp: i,
  open: o,
  onOpenChange: u,
  workspaces: h,
  currentWorkspaceId: a,
  onInfoApp: c,
  onUninstallApp: d,
  onMoveIconToWorkspace: p,
  popupSide: f = "top",
  bootState: S
}) {
  var M;
  const {
    t: _,
    locale: x
  } = Lr();
  const [w, g] = E.useState(Sx);
  const b = E.useMemo(() => {
    const R = new Set();
    for (const I of n.values()) {
      R.add(I.appId);
    }
    return R;
  }, [n]);
  const m = E.useMemo(() => {
    const R = [];
    const I = new Map();
    for (const [z, N] of e) {
      const D = rn(N.name, x);
      const $ = [wx(N.name), wx(N.description)].join(" ").toLowerCase();
      const G = {
        value: z,
        label: D,
        icon: N.icon,
        isRunning: b.has(z),
        isSystem: N.isSystem || false,
        searchText: $
      };
      const q = r == null ? undefined : r[z];
      const U = (q == null ? undefined : q.workspaceId) ?? a;
      G.workspaceId = U;
      if (b.has(z)) {
        R.push(G);
      } else {
        if (!I.has(U)) {
          const L = h.get(U);
          I.set(U, {
            value: U,
            label: (L == null ? undefined : L.name) || U,
            items: []
          });
        }
        I.get(U).items.push(G);
      }
    }
    R.sort((z, N) => z.label.localeCompare(N.label, x));
    for (const [, z] of I) {
      z.items.sort((N, D) => N.label.localeCompare(D.label, x));
    }
    const j = [];
    if (R.length > 0) {
      j.push({
        value: "running",
        label: _("launcher.running"),
        items: R
      });
    }
    const W = [...I.entries()];
    W.sort((z, N) => {
      if (z[0] === a && N[0] !== a) {
        return -1;
      }
      if (N[0] === a && z[0] !== a) {
        return 1;
      }
      const D = h.get(z[0]);
      const $ = h.get(N[0]);
      if ((D == null ? undefined : D.type) === "home" && ($ == null ? undefined : $.type) !== "home") {
        return -1;
      } else if (($ == null ? undefined : $.type) === "home" && (D == null ? undefined : D.type) !== "home") {
        return 1;
      } else {
        return z[1].label.localeCompare(N[1].label, x);
      }
    });
    for (const [, z] of W) {
      j.push(z);
    }
    return j;
  }, [e, b, r, h, a, x, _]);
  const v = E.useCallback(R => {
    if (i != null) {
      i(R);
    }
    if (u != null) {
      u(false);
    }
  }, [i, u]);
  const C = E.useCallback(() => {
    g(Sx);
  }, []);
  const A = typeof navigator !== "undefined" && ((M = navigator.platform) == null ? undefined : M.includes("Mac")) ? "⌘" : "Ctrl+";
  return <B.Fragment><_Component25><An render={<button onClick={() => u == null ? undefined : u(true)} className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-accent transition-colors shrink-0 text-foreground/80" />}>{S === "ready" ? <_Component47 size={18} /> : <_C className="size-[18px]" />}</An><Mn side={f}>{_("launcher.title")}</Mn></_Component25><L6 open={o} onOpenChange={u}><N6><_Component55 items={m} filter={(R, I) => R.searchText.includes(I.toLowerCase())}><H6 placeholder={_("launcher.search")} /><div className="min-h-0" onContextMenu={R => R.stopPropagation()}><U6>{_("launcher.noResults")}</U6><F6>{(R, I) => <E.Fragment key={R.value}><V6 items={R.items}><W6>{R.label}</W6><$6>{j => <_Component54 value={j.value} className="gap-2.5" onClick={() => v(j.value)} onContextMenu={W => {
                      W.preventDefault();
                      W.stopPropagation();
                      g({
                        open: true,
                        x: W.clientX,
                        y: W.clientY,
                        appId: j.value,
                        isSystem: j.isSystem,
                        appWorkspaceId: j.workspaceId
                      });
                    }} key={j.value}><div className="w-7 h-7 rounded-md overflow-hidden shrink-0 shadow-sm">{j.icon ? <img src={j.icon} alt="" className="w-full h-full object-cover" draggable={false} /> : <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white" style={{
                          background: X6(j.value)
                        }}>{j.label.charAt(0)}</div>}</div><span className="flex-1 min-w-0 truncate">{j.label}</span>{j.isRunning && <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />}</_Component54>}</$6></V6>{I < m.length - 1 && <G6 />}</E.Fragment>}</F6></div></_Component55><Y6><span>↑↓ {_("launcher.navigate")}</span><span>↵ {_("launcher.select")}</span><span>{A}P {_("launcher.close")}</span></Y6></N6></L6><WR open={w.open} x={w.x} y={w.y} appId={w.appId} workspaces={h} currentWorkspaceId={a} appWorkspaceId={w.appWorkspaceId} isSystem={w.isSystem} onOpenChange={R => {
      if (!R) {
        C();
      }
    }} onOpen={R => {
      C();
      v(R);
    }} onInfo={R => {
      C();
      if (u != null) {
        u(false);
      }
      if (c != null) {
        c(R);
      }
    }} onUninstall={R => {
      C();
      if (u != null) {
        u(false);
      }
      if (d != null) {
        d(R);
      }
    }} onMoveToWorkspace={(R, I) => {
      C();
      if (p != null) {
        p(R, I);
      }
    }} /></B.Fragment>;
}
const xx = {};
function Cx(e) {
  if (xx[e]) {
    return xx[e];
  }
  const n = ["#89b4fa", "#a6e3a1", "#f38ba8", "#f9e2af", "#cba6f7", "#94e2d5"];
  let r = 0;
  for (let i = 0; i < e.length; i++) {
    r = e.charCodeAt(i) + ((r << 5) - r);
  }
  return n[Math.abs(r) % n.length];
}
function Z6(e) {
  switch (e) {
    case "bottom":
      return "translateY(calc(100% + 12px))";
    case "top":
      return "translateY(calc(-100% - 12px))";
    case "left":
      return "translateX(calc(-100% - 12px))";
    case "right":
      return "translateX(calc(100% + 12px))";
    default:
      return "translateY(calc(100% + 12px))";
  }
}
function Q6(e) {
  return {
    bottom: "bottom-0 left-0 right-0 h-[8px]",
    top: "top-0 left-0 right-0 h-[8px]",
    left: "left-0 top-0 bottom-0 w-[8px]",
    right: "right-0 top-0 bottom-0 w-[8px]"
  }[e];
}
function J6(e) {
  return {
    bottom: "left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[134px] h-[5px]",
    top: "left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[134px] h-[5px]",
    left: "top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[5px] h-[134px]",
    right: "top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[5px] h-[134px]"
  }[e];
}
function _Component106({
  windows: e,
  runningApps: n,
  installedApps: r,
  focusedWindowId: i,
  onFocus: o,
  onLaunchApp: u,
  anyMaximized: h,
  workspaces: a,
  activeWorkspaceId: c,
  onSwitchWorkspace: d,
  onCreateWorkspace: p,
  onRenameWorkspace: f,
  onDeleteWorkspace: S,
  homeId: _,
  dockSettings: x = {
    position: "bottom"
  },
  desktopIcons: w,
  commandPaletteOpen: g,
  onCommandPaletteChange: b,
  onInfoApp: m,
  onUninstallApp: v,
  onMoveIconToWorkspace: C,
  onDockContextMenu: T,
  bootState: A
}) {
  const {
    t: M,
    locale: R
  } = Lr();
  const [I, j] = E.useState({});
  const W = E.useRef(null);
  const z = E.useRef(null);
  const N = (x == null ? undefined : x.position) || "bottom";
  const D = x != null && !!x.autoHide;
  const $ = (x == null ? undefined : x.autoHideDelay) || 1000;
  const [G, q] = E.useState(true);
  const U = N === "bottom" || N === "top";
  const L = {
    bottom: "top",
    top: "bottom",
    left: "right",
    right: "left"
  }[N];
  const F = {
    bottom: "bottom-3 left-1/2 -translate-x-1/2",
    top: "top-3 left-1/2 -translate-x-1/2",
    left: "left-3 top-1/2 -translate-y-1/2",
    right: "right-3 top-1/2 -translate-y-1/2"
  }[N];
  const P = U ? "flex-row items-center" : "flex-col items-center";
  const V = U ? "w-px h-6" : "h-px w-6";
  const Z = Q6(N);
  const J = J6(N);
  const ne = Z6(N);
  E.useEffect(() => {
    if (!D) {
      q(true);
      if (W.current) {
        clearTimeout(W.current);
        W.current = null;
      }
    }
  }, [D]);
  const ue = E.useCallback(() => {
    if (W.current) {
      clearTimeout(W.current);
      W.current = null;
    }
    q(true);
  }, []);
  const ee = E.useCallback(() => {
    if (D) {
      if (W.current) {
        clearTimeout(W.current);
      }
      W.current = setTimeout(() => {
        var oe;
        if ((oe = z.current) != null && oe.matches(":hover")) {
          q(true);
          return;
        }
        q(false);
      }, $);
    }
  }, [D, $]);
  const Y = E.useCallback(() => {
    if (W.current) {
      clearTimeout(W.current);
      W.current = null;
    }
    q(true);
  }, []);
  const re = E.useCallback(oe => oe.minimized ? M("taskbar.minimized") : oe.status === "ready" || oe.status === "running" ? M("taskbar.running") : oe.status === "exited" ? oe.statusText || M("taskbar.exited") : M("taskbar.starting"), [M]);
  const ce = E.useCallback(oe => {
    j(X => ({
      ...X,
      [oe]: true
    }));
  }, []);
  const ge = [];
  for (const [oe, X] of n) {
    const Q = e.get(oe);
    if (!Q || Q.workspaceId !== c) {
      continue;
    }
    const se = r.get(X.appId);
    if (!se) {
      continue;
    }
    let he = ge.find(ye => ye.appId === X.appId);
    if (!he) {
      he = {
        appId: X.appId,
        app: se,
        windows: []
      };
      ge.push(he);
    }
    he.windows.push({
      windowId: oe,
      win: Q,
      isFocused: oe === i
    });
  }
  const de = E.useCallback(oe => {
    if (oe.windows.length === 1) {
      const X = oe.windows[0];
      X.isFocused;
      if (o != null) {
        o(X.windowId);
      }
    }
  }, [o]);
  const me = E.useCallback(oe => {
    if (o != null) {
      o(oe);
    }
  }, [o]);
  const H = D && !G;
  const ae = !!h;
  return <FP>{D && !G && !ae && <div className={`fixed ${Z} z-50 cursor-default`} onMouseEnter={Y}><div className={`absolute ${J} rounded-full bg-muted-foreground/30`} /></div>}<div className={`fixed ${F} z-50 pointer-events-none ${ae ? "hidden" : ""}`}><div ref={z} className="pointer-events-auto" style={{
        transform: H ? ne : undefined,
        opacity: H ? 0 : undefined,
        transition: "transform 300ms ease-out, opacity 300ms ease-out"
      }} onMouseEnter={ue} onMouseLeave={ee} onContextMenu={T}><div className={`flex ${P} gap-1 px-3 py-2 rounded-2xl bg-popover/60 border border-border/50 backdrop-blur-xl shadow-lg`}><K6 installedApps={r} runningApps={n} desktopIcons={w} onLaunchApp={u} open={g} onOpenChange={b} workspaces={a} currentWorkspaceId={c} onInfoApp={m} onUninstallApp={v} onMoveIconToWorkspace={C} popupSide={L} bootState={A} /><div className={`${V} bg-border mx-1 shrink-0`} /><_Component56 workspaces={a} activeWorkspaceId={c} onSwitch={d} onCreate={p} onRename={f} onDelete={S} homeId={_} popupSide={L} compact={true} />{ge.length > 0 && <div className={`${V} bg-border mx-1 shrink-0`} />}{ge.map(oe => {
            const {
              appId: X,
              app: Q,
              windows: se
            } = oe;
            const he = se.length;
            const ye = se.some(_e => _e.isFocused);
            const pe = rn(Q.name, R);
            const Se = he > 1 ? `${pe} (${he})` : pe;
            if (he > 1) {
              return <div key={X}><_Component24><_Component25><Zl render={<An render={_e => <button {..._e} className={`relative flex flex-col items-center outline-none ${ye ? "" : "opacity-60"}`} />} />}><div className="relative"><div className="w-8 h-8 rounded-lg overflow-hidden shadow-md">{Q.icon && !I[X] ? <img src={Q.icon} alt="" className="w-full h-full object-cover" onError={() => ce(X)} draggable={false} /> : <div className="w-full h-full flex items-center justify-center text-base font-bold text-white" style={{
                            background: Cx(X)
                          }}>{rn(Q.name, R).charAt(0)}</div>}</div><span className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center px-0.5 shadow-sm">{he}</span></div></Zl><Mn side={L}>{Se}</Mn></_Component25><Fo side={L} sideOffset={8}><Ta><Ob>{M("taskbar.windowGroup", {
                          count: he
                        })}</Ob></Ta><Fs />{se.map(({
                      windowId: _e,
                      win: ie,
                      isFocused: te
                    }, be) => <Fn onClick={() => me(_e)} key={_e}><span className="flex-1 truncate">{rn(Q.name, R)} #{be + 1}</span><span className="text-xs text-muted-foreground shrink-0">{re(ie)}</span></Fn>)}<Fs /><Fn onClick={() => u == null ? undefined : u(X)}><_Component33 size={14} className="shrink-0 text-muted-foreground" /><span>{M("taskbar.newWindow")}</span></Fn></Fo></_Component24></div>;
            } else {
              return <div key={X}><_Component25><An render={_e => <button {..._e} className={`relative flex flex-col items-center outline-none ${ye ? "" : "opacity-60"}`} onClick={() => de(oe)} />}><div className="w-8 h-8 rounded-lg overflow-hidden shadow-md">{Q.icon && !I[X] ? <img src={Q.icon} alt="" className="w-full h-full object-cover" onError={() => ce(X)} draggable={false} /> : <div className="w-full h-full flex items-center justify-center text-base font-bold text-white" style={{
                        background: Cx(X)
                      }}>{rn(Q.name, R).charAt(0)}</div>}</div></An><Mn side={L}>{Se}</Mn></_Component25></div>;
            }
          })}</div></div></div></FP>;
}
function _Component107({
  open: e,
  x: n,
  y: r,
  isFullscreen: i,
  onOpenChange: o,
  onInstall: u,
  onAddWidget: h,
  onWallpaper: a,
  onToggleFullscreen: c,
  onAbout: d
}) {
  const {
    t: p
  } = Lr();
  const f = E.useRef(null);
  E.useEffect(() => {
    if (e && f.current) {
      f.current.click();
    }
  }, [e]);
  return <_Component24 open={e} onOpenChange={o}><Zl ref={f} className="fixed z-[9999] p-0 m-0 border-none bg-transparent" style={{
      left: n,
      top: r,
      width: 0,
      height: 0,
      minWidth: 0,
      minHeight: 0,
      padding: 0,
      overflow: "hidden"
    }}><span style={{
        fontSize: 0
      }}> </span></Zl><Fo side="bottom" align="start" sideOffset={4}><Ta><Fn onClick={u}><U5 aria-hidden="true" />{p("desktop.installApp")}</Fn><Fn onClick={h}><_Component57 aria-hidden="true" />{p("desktop.addWidget")}</Fn></Ta><Fs /><Ta><Fn onClick={a}><_Component58 aria-hidden="true" />{p("desktop.wallpaper")}</Fn></Ta><Fs /><Ta><Fn onClick={c}>{i ? <_Component21 aria-hidden="true" /> : <_Component22 aria-hidden="true" />}{p(i ? "desktop.exitFullscreen" : "desktop.enterFullscreen")}</Fn><Fn onClick={d}><Hv aria-hidden="true" />{p("desktop.about")}</Fn></Ta></Fo></_Component24>;
}
const nz = [{
  value: "top",
  label: "dock.top",
  Icon: qI
}, {
  value: "bottom",
  label: "dock.bottom",
  Icon: FI
}, {
  value: "left",
  label: "dock.left",
  Icon: VI
}, {
  value: "right",
  label: "dock.right",
  Icon: _Component50
}];
function _Component108({
  open: e,
  x: n,
  y: r,
  position: i,
  autoHide: o,
  onOpenChange: u,
  onToggleAutoHide: h,
  onChangePosition: a,
  onOpenSettings: c
}) {
  const {
    t: d
  } = Lr();
  return <_Component24 open={e} onOpenChange={u}><Zl className="fixed z-[9999] p-0 m-0 border-none bg-transparent" style={{
      left: n,
      top: r,
      width: 0,
      height: 0,
      minWidth: 0,
      minHeight: 0,
      padding: 0,
      overflow: "hidden"
    }}><span style={{
        fontSize: 0
      }}> </span></Zl><Fo side="bottom" align="start" sideOffset={4}><_Component59 variant="switch" checked={o} closeOnClick={false} onClick={() => h(!o)}>{d("dock.autoHide")}</_Component59><Fs /><_Component53><_Component51><_Component60 size={14} />{d("dock.position")}</_Component51><_Component52><Ta>{nz.map(({
              value: p,
              label: f,
              Icon: S
            }) => <Fn onClick={() => a(p)} className={i === p ? "font-medium" : ""} key={p}><S size={14} /><span className="flex-1">{d(f)}</span>{i === p && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-primary"><polyline points="20 6 9 17 4 12" /></svg>}</Fn>)}</Ta></_Component52></_Component53><Fs /><Fn onClick={c}><_Component61 size={14} />{d("dock.settings")}</Fn></Fo></_Component24>;
}
const $R = E.createContext(undefined);
function Ql(e) {
  const n = E.useContext($R);
  if (n === undefined && !e) {
    throw new Error(Bt(47));
  }
  return n;
}
function sz() {
  return {
    ...Eh(),
    disabled: false,
    modal: false,
    focusManagerModal: false,
    instantType: undefined,
    openMethod: null,
    openChangeReason: null,
    titleElementId: undefined,
    descriptionElementId: undefined,
    stickIfOpen: true,
    nested: false,
    openOnHover: false,
    closeDelay: 0,
    hasViewport: false
  };
}
const iz = {
  ...Rh,
  disabled: Me(e => e.disabled),
  instantType: Me(e => e.instantType),
  openMethod: Me(e => e.openMethod),
  openChangeReason: Me(e => e.openChangeReason),
  modal: Me(e => e.modal),
  focusManagerModal: Me(e => e.focusManagerModal),
  stickIfOpen: Me(e => e.stickIfOpen),
  titleElementId: Me(e => e.titleElementId),
  descriptionElementId: Me(e => e.descriptionElementId),
  openOnHover: Me(e => e.openOnHover),
  closeDelay: Me(e => e.closeDelay),
  hasViewport: Me(e => e.hasViewport)
};
class Nb extends Yl {
  constructor(r, i, o = false) {
    const u = {
      ...sz(),
      ...r
    };
    const h = new Xl();
    if (u.open && (r == null ? undefined : r.mounted) === undefined) {
      u.mounted = true;
    }
    u.floatingRootContext = db(h, i, o);
    super(u, {
      popupRef: E.createRef(),
      backdropRef: E.createRef(),
      internalBackdropRef: E.createRef(),
      onOpenChange: undefined,
      onOpenChangeComplete: undefined,
      triggerFocusTargetRef: E.createRef(),
      beforeContentFocusGuardRef: E.createRef(),
      stickIfOpenTimeout: new $r(),
      triggerElements: h
    }, iz);
    tt(this, "setOpen", (r, i) => {
      var d;
      var p;
      const o = i.reason === In;
      const u = i.reason === Fi && i.event.detail === 0;
      const h = !r && (i.reason === $l || i.reason == null);
      i.preventUnmountOnClose = () => {
        this.set("preventUnmountingOnClose", true);
      };
      const a = this.select("activeTriggerId");
      if (!r && i.reason === Yv && i.trigger == null && a != null) {
        i.trigger = this.context.triggerElements.getById(a) ?? this.select("activeTriggerElement") ?? undefined;
      }
      if ((p = (d = this.context).onOpenChange) != null) {
        p.call(d, r, i);
      }
      if (i.isCanceled) {
        return;
      }
      this.state.floatingRootContext.dispatchOpenChange(r, i);
      const c = () => {
        const f = {
          open: r,
          openChangeReason: i.reason
        };
        cb(f, r, i.trigger);
        this.update(f);
      };
      if (o) {
        this.set("stickIfOpen", true);
        this.context.stickIfOpenTimeout.start(JC, () => {
          this.set("stickIfOpen", false);
        });
        cs.flushSync(c);
      } else {
        c();
      }
      if (u || h) {
        this.set("instantType", u ? "click" : "dismiss");
      } else if (i.reason === Ui) {
        this.set("instantType", "focus");
      } else {
        this.set("instantType", undefined);
      }
    });
    tt(this, "disposeEffect", () => this.context.stickIfOpenTimeout.disposeEffect());
  }
  static useStore(r, i) {
    const {
      store: o,
      internalStore: u
    } = lb(r, (h, a) => new Nb(i, h, a));
    E.useEffect(() => u == null ? undefined : u.disposeEffect(), [u]);
    return o;
  }
}
function Ex({
  props: e
}) {
  const {
    children: n,
    open: r,
    defaultOpen: i = false,
    onOpenChange: o,
    onOpenChangeComplete: u,
    modal: h = false,
    handle: a,
    triggerId: c,
    defaultTriggerId: d = null
  } = e;
  const p = Nb.useStore(a == null ? undefined : a.store, {
    modal: h,
    open: i,
    openProp: r,
    activeTriggerId: d,
    triggerIdProp: c
  });
  Wl(() => {
    if (r === undefined && p.state.open === false && i === true) {
      p.update({
        open: true,
        activeTriggerId: d
      });
    }
  });
  p.useControlledProp("openProp", r);
  p.useControlledProp("triggerIdProp", c);
  const f = p.useState("open");
  const S = p.useState("mounted");
  const _ = p.useState("payload");
  const x = qi() != null;
  p.useContextCallback("onOpenChange", o);
  p.useContextCallback("onOpenChangeComplete", u);
  SE(p, f);
  Sh(p);
  const {
    forceUnmount: w
  } = xh(f, p, () => {
    p.update({
      stickIfOpen: true,
      openChangeReason: null
    });
  });
  p.useSyncedValues({
    modal: h,
    nested: x
  });
  E.useEffect(() => {
    if (!f) {
      p.context.stickIfOpenTimeout.clear();
    }
  }, [p, f]);
  const g = E.useCallback(() => {
    p.setOpen(false, $e(mh));
  }, [p]);
  E.useImperativeHandle(e.actionsRef, () => ({
    unmount: w,
    close: g
  }), [w, g]);
  const b = f || S;
  const m = E.useMemo(() => ({
    store: p
  }), [p]);
  return <$R.Provider value={m}>{b && <_Component62 store={p} modal={h} />}{typeof n == "function" ? n({
      payload: _
    }) : n}</$R.Provider>;
}
function oz(e) {
  if (Ql(true)) {
    return <Ex props={e} />;
  } else {
    return <_Component1><Ex props={e} /></_Component1>;
  }
}
function _Component62({
  store: e,
  modal: n
}) {
  const r = e.useState("floatingRootContext");
  const i = Gl(r, {
    outsidePressEvent: {
      mouse: n === "trap-focus" ? "sloppy" : "intentional",
      touch: "sloppy"
    }
  });
  const o = i.reference ?? Xt;
  const u = i.trigger ?? Xt;
  const h = E.useMemo(() => Sn(No, i.floating), [i.floating]);
  Ch(e, {
    activeTriggerProps: o,
    inactiveTriggerProps: u,
    popupProps: h
  });
  return null;
}
const lz = 300;
const _Component64 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    disabled: h = false,
    nativeButton: a = true,
    handle: c,
    payload: d,
    openOnHover: p = false,
    delay: f = lz,
    closeDelay: S = 0,
    id: _,
    ...x
  } = n;
  const w = Ql(true);
  const g = (c == null ? undefined : c.store) ?? (w == null ? undefined : w.store);
  if (!g) {
    throw new Error(Bt(74));
  }
  const b = $n(_);
  const m = g.useState("isTriggerActive", b);
  const v = g.useState("floatingRootContext");
  const C = g.useState("isOpenedByTrigger", b);
  const T = g.useState("triggerPopupId", b);
  const A = E.useRef(null);
  const {
    registerTrigger: M,
    isMountedByThisTrigger: R
  } = ub(b, A, g, {
    payload: d,
    disabled: h,
    openOnHover: p,
    closeDelay: S
  });
  const I = g.useState("openChangeReason");
  const j = g.useState("stickIfOpen");
  const W = g.useState("openMethod");
  const z = g.useState("focusManagerModal");
  const N = Th(v, {
    enabled: v != null && p && (W !== "touch" || I !== Fi),
    mouseOnly: true,
    move: false,
    handleClose: Ah(),
    restMs: f,
    delay: {
      close: S
    },
    triggerElementRef: A,
    isActiveTrigger: m,
    isClosing: () => g.select("transitionStatus") === "ending"
  });
  const D = ql(v, {
    enabled: v != null,
    stickIfOpen: j
  });
  const $ = rR(() => g.select("open"), ne => {
    g.set("openMethod", ne);
  });
  const G = g.useState("triggerProps", R);
  const {
    getButtonProps: q,
    buttonRef: U
  } = Es({
    disabled: h,
    native: a
  });
  const L = {
    open(ne) {
      if (ne && I === Fi) {
        return pu.open(ne);
      } else {
        return ku.open(ne);
      }
    }
  };
  const {
    preFocusGuardRef: F,
    handlePreFocusGuardFocus: P,
    handleFocusTargetFocus: V
  } = cR(g, A);
  const J = Je("button", n, {
    state: {
      disabled: h,
      open: C
    },
    ref: [U, r, M, A],
    props: [D.reference, N, G, $, {
      [eE]: "",
      id: b,
      "aria-haspopup": "dialog",
      "aria-expanded": C,
      "aria-controls": T
    }, x, q],
    stateAttributesMapping: L
  });
  if (R && !z) {
    return <E.Fragment><Hs ref={F} onFocus={P} /><E.Fragment key={b}>{J}</E.Fragment><Hs ref={g.context.triggerFocusTargetRef} onFocus={V} /></E.Fragment>;
  } else {
    return <E.Fragment key={b}>{J}</E.Fragment>;
  }
});
const qR = E.createContext(undefined);
function uz() {
  const e = E.useContext(qR);
  if (e === undefined) {
    throw new Error(Bt(45));
  }
  return e;
}
const _Component67 = E.forwardRef(function (n, r) {
  const {
    keepMounted: i = false,
    ...o
  } = n;
  const {
    store: u
  } = Ql();
  if (u.useState("mounted") || i) {
    return <qR.Provider value={i}><_Component9 ref={r} {...o} /></qR.Provider>;
  } else {
    return null;
  }
});
const GR = E.createContext(undefined);
function YR() {
  const e = E.useContext(GR);
  if (!e) {
    throw new Error(Bt(46));
  }
  return e;
}
const _Component66 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    anchor: h,
    positionMethod: a = "absolute",
    side: c = "bottom",
    align: d = "center",
    sideOffset: p = 0,
    alignOffset: f = 0,
    collisionBoundary: S = "clipping-ancestors",
    collisionPadding: _ = 5,
    arrowPadding: x = 5,
    sticky: w = false,
    disableAnchorTracking: g = false,
    collisionAvoidance: b = tb,
    ...m
  } = n;
  const {
    store: v
  } = Ql();
  const C = uz();
  const T = rb();
  const A = v.useState("floatingRootContext");
  const M = v.useState("mounted");
  const R = v.useState("open");
  const I = v.useState("openChangeReason");
  const j = v.useState("activeTriggerElement");
  const W = v.useState("modal");
  const z = v.useState("openMethod");
  const N = v.useState("positionerElement");
  const D = v.useState("instantType");
  const $ = v.useState("transitionStatus");
  const G = v.useState("hasViewport");
  const q = E.useRef(null);
  const U = Tu(N, false, false);
  const L = Mh({
    anchor: h,
    floatingRootContext: A,
    positionMethod: a,
    mounted: M,
    side: c,
    sideOffset: p,
    align: d,
    alignOffset: f,
    arrowPadding: x,
    collisionBoundary: S,
    collisionPadding: _,
    sticky: w,
    disableAnchorTracking: g,
    keepMounted: C,
    nodeId: T,
    collisionAvoidance: b,
    adaptiveOrigin: G ? _b : undefined
  });
  const F = A.useState("domReferenceElement");
  Fe(() => {
    const J = F;
    const ne = q.current;
    if (J) {
      q.current = J;
    }
    if (ne && J && J !== ne) {
      v.set("instantType", undefined);
      const ue = new AbortController();
      U(() => {
        v.set("instantType", "trigger-change");
      }, ue.signal);
      return () => {
        ue.abort();
      };
    }
  }, [F, U, v]);
  kb(R && W === true && I !== In, z === "touch", N, j);
  const P = E.useCallback(J => {
    v.set("positionerElement", J);
  }, [v]);
  const V = {
    open: R,
    side: L.side,
    align: L.align,
    anchorHidden: L.anchorHidden,
    instant: D
  };
  const Z = Oh(n, V, {
    styles: L.positionerStyles,
    transitionStatus: $,
    props: m,
    refs: [r, P],
    hidden: !M,
    inert: !R
  });
  return <GR.Provider value={L}>{M && W === true && I !== In && <Ph ref={v.context.internalBackdropRef} inert={Kl(!R)} cutout={j} />}<_Component0 id={T}>{Z}</_Component0></GR.Provider>;
});
const hz = E.createContext(undefined);
function pz() {
  const [e, n] = E.useState(0);
  const r = je(() => {
    n(o => o + 1);
    return () => {
      n(o => Math.max(0, o - 1));
    };
  });
  return {
    context: E.useMemo(() => ({
      register: r
    }), [r]),
    hasClosePart: e > 0
  };
}
function _Component63(e) {
  const {
    value: n,
    children: r
  } = e;
  return <hz.Provider value={n}>{r}</hz.Provider>;
}
const gz = {
  ...jo,
  ...xs
};
const _Component65 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    initialFocus: h,
    finalFocus: a,
    ...c
  } = n;
  const {
    store: d
  } = Ql();
  const p = YR();
  const f = Tb() != null;
  const {
    context: S,
    hasClosePart: _
  } = pz();
  const x = d.useState("open");
  const w = d.useState("openMethod");
  const g = d.useState("instantType");
  const b = d.useState("transitionStatus");
  const m = d.useState("popupProps");
  const v = d.useState("titleElementId");
  const C = d.useState("descriptionElementId");
  const T = d.useState("modal");
  const A = d.useState("mounted");
  const M = d.useState("openChangeReason");
  const R = d.useState("activeTriggerElement");
  const I = d.useState("floatingRootContext");
  const j = I.useState("floatingId");
  const W = d.useState("disabled");
  const z = d.useState("openOnHover");
  const N = d.useState("closeDelay");
  const D = c.id ?? j;
  qr({
    open: x,
    ref: d.context.popupRef,
    onComplete() {
      var P;
      var V;
      if (x) {
        if ((V = (P = d.context).onOpenChangeComplete) != null) {
          V.call(P, true);
        }
      }
    }
  });
  gb(I, {
    enabled: z && !W,
    closeDelay: N
  });
  function $(P) {
    if (P === "touch") {
      return d.context.popupRef.current;
    } else {
      return true;
    }
  }
  const G = h === undefined ? $ : h;
  const q = T !== false && _;
  d.useSyncedValue("focusManagerModal", q);
  const U = E.useCallback(P => {
    d.set("popupElement", P);
  }, [d]);
  const L = {
    open: x,
    side: p.side,
    align: p.align,
    instant: g,
    transitionStatus: b
  };
  const F = Je("div", n, {
    state: L,
    ref: [r, d.context.popupRef, U],
    props: [m, {
      id: D,
      role: "dialog",
      ...No,
      "aria-labelledby": v,
      "aria-describedby": C,
      onKeyDown(P) {
        if (f && Na.has(P.key)) {
          P.stopPropagation();
        }
      }
    }, Au(b), c],
    stateAttributesMapping: gz
  });
  return <_Component8 context={I} openInteractionType={w} modal={q} disabled={!A || M === In} initialFocus={G} returnFocus={a} restoreFocus="popup" previousFocusableElement={un(R) ? R : undefined} nextFocusableElement={d.context.triggerFocusTargetRef} beforeContentFocusGuardRef={d.context.beforeContentFocusGuardRef}><_Component63 value={S}>{F}</_Component63></_Component8>;
});
let bz = function (e) {
  e.popupWidth = "--popup-width";
  e.popupHeight = "--popup-height";
  return e;
}({});
const yz = {
  activationDirection: e => e ? {
    "data-activation-direction": e
  } : null
};
const _z = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    children: h,
    ...a
  } = n;
  const {
    store: c
  } = Ql();
  const {
    side: d
  } = YR();
  const p = c.useState("instantType");
  const {
    children: f,
    state: S
  } = LE({
    store: c,
    side: d,
    cssVars: bz,
    children: h
  });
  const _ = {
    activationDirection: S.activationDirection,
    transitioning: S.transitioning,
    instant: p
  };
  return Je("div", n, {
    state: _,
    ref: r,
    props: [a, {
      children: f
    }],
    stateAttributesMapping: yz
  });
});
const _Component74 = oz;
function Sz({
  className: e,
  children: n,
  ...r
}) {
  return <_Component64 className={e} data-slot="popover-trigger" {...r}>{n}</_Component64>;
}
function _Component73({
  children: e,
  className: n,
  side: r = "bottom",
  align: i = "center",
  sideOffset: o = 4,
  alignOffset: u = 0,
  tooltipStyle: h = false,
  anchor: a,
  portalProps: c,
  ...d
}) {
  return <_Component67 {...c}><_Component66 align={i} alignOffset={u} anchor={a} className="z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] data-instant:transition-none" data-slot="popover-positioner" side={r} sideOffset={o}><_Component65 className={pt("relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-[width,height,scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] has-data-[slot=calendar]:rounded-xl has-data-[slot=calendar]:before:rounded-[calc(var(--radius-xl)-1px)] data-starting-style:scale-98 data-starting-style:opacity-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]", h && "w-fit text-balance rounded-md text-xs shadow-md/5 before:rounded-[calc(var(--radius-md)-1px)]", n)} data-slot="popover-popup" {...d}><_z className={pt("relative size-full max-h-(--available-height) overflow-clip px-(--viewport-inline-padding) py-4 [--viewport-inline-padding:--spacing(4)] has-data-[slot=calendar]:p-2 data-instant:transition-none **:data-current:data-ending-style:opacity-0 **:data-current:data-starting-style:opacity-0 **:data-previous:data-ending-style:opacity-0 **:data-previous:data-starting-style:opacity-0 **:data-current:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-current:opacity-100 **:data-previous:opacity-100 **:data-current:transition-opacity **:data-previous:transition-opacity", h ? "py-1 [--viewport-inline-padding:--spacing(2)]" : "not-data-transitioning:overflow-y-auto")} data-slot="popover-viewport">{e}</_z></_Component65></_Component66></_Component67>;
}
function XR(e, n, r = (i, o) => i === o) {
  return e.length === n.length && e.every((i, o) => r(i, n[o]));
}
function KR(e, n) {
  return e - n;
}
function Cz(e, n, r) {
  const i = e.slice();
  i[n] = r;
  return i.sort(KR);
}
function ZR(e, n, r, i, o, u) {
  let h = e;
  h = Un(h, r, i);
  if (o) {
    h = Cz(u, n, Un(h, u[n - 1] || -Infinity, u[n + 1] || Infinity));
  }
  return h;
}
function QR(e, n, r) {
  if (!Array.isArray(e)) {
    return true;
  }
  const i = e.reduce((o, u, h, a) => {
    if (h !== a.length - 1) {
      o.push(Math.abs(u - a[h + 1]));
    }
    return o;
  }, []);
  return Math.min(...i) >= n * r;
}
const Jl = {
  activeThumbIndex: () => null,
  max: () => null,
  min: () => null,
  minStepsBetweenValues: () => null,
  step: () => null,
  values: () => null,
  ...Ho
};
const JR = E.createContext(undefined);
function Pu() {
  const e = E.useContext(JR);
  if (e === undefined) {
    throw new Error(Bt(62));
  }
  return e;
}
function Ez(e) {
  if ("key" in e) {
    return a3;
  } else {
    return wa;
  }
}
function Rz(e, n) {
  if (typeof e == "number" && typeof n == "number") {
    return e === n;
  } else if (Array.isArray(e) && Array.isArray(n)) {
    return XR(e, n);
  } else {
    return false;
  }
}
const Tz = E.forwardRef(function (n, r) {
  const {
    "aria-labelledby": i,
    className: o,
    defaultValue: u,
    disabled: h = false,
    id: a,
    format: c,
    largeStep: d = 10,
    locale: p,
    render: f,
    max: S = 100,
    min: _ = 0,
    minStepsBetweenValues: x = 0,
    form: w,
    name: g,
    onValueChange: b,
    onValueCommitted: m,
    orientation: v = "horizontal",
    step: C = 1,
    thumbCollisionBehavior: T = "push",
    thumbAlignment: A = "center",
    value: M,
    style: R,
    ...I
  } = n;
  const j = $n(a);
  const W = AB(j);
  const z = je(b);
  const N = je(m);
  const {
    clearErrors: D
  } = Pa();
  const {
    state: $,
    disabled: G,
    name: q,
    setTouched: U,
    setDirty: L,
    validityData: F,
    shouldValidateOnChange: P,
    validation: V
  } = Gr();
  const {
    labelId: Z
  } = Cs();
  const [J, ne] = E.useState();
  const ue = i ?? zh(Z, J);
  const ee = G || h;
  const Y = q ?? g;
  const [re, ce] = Hi({
    controlled: M,
    default: u ?? _,
    name: "Slider"
  });
  const ge = E.useRef(null);
  const de = E.useRef(null);
  const me = E.useRef([]);
  const H = E.useRef(null);
  const ae = E.useRef(null);
  const oe = E.useRef(-1);
  const X = E.useRef(null);
  const Q = E.useRef(null);
  const se = E.useRef("none");
  const he = On(c);
  const [ye, pe] = E.useState(-1);
  const [Se, _e] = E.useState(-1);
  const [ie, te] = E.useState(false);
  const [be, ve] = E.useState(() => new Map());
  const [Te, Re] = E.useState([undefined, undefined]);
  const ze = je(Ge => {
    pe(Ge);
    if (Ge !== -1) {
      _e(Ge);
    }
  });
  Mu(de, j, re);
  Eo(re, () => {
    D(Y);
    if (P()) {
      V.commit(re);
    } else {
      V.commit(re, true);
    }
    const Ge = F.initialValue;
    let Ye;
    if (Array.isArray(re) && Array.isArray(Ge)) {
      Ye = !XR(re, Ge);
    } else {
      Ye = re !== Ge;
    }
    L(Ye);
  });
  const Be = je(Ge => {
    if (Ge) {
      de.current = Ge;
    }
  });
  const Ue = Array.isArray(re);
  const We = E.useMemo(() => Ue ? re.slice().sort(KR) : [Un(re, _, S)], [S, _, Ue, re]);
  const lt = je((Ge, Ye) => {
    if (Number.isNaN(Ge) || Rz(Ge, re)) {
      return;
    }
    const Qe = Ye ?? $e(ur, undefined, undefined, {
      activeThumbIndex: -1
    });
    se.current = Qe.reason;
    const gt = Qe.event;
    const ft = gt.constructor ?? Event;
    const Ke = new ft(gt.type, gt);
    Object.defineProperty(Ke, "target", {
      writable: true,
      value: {
        value: Ge,
        name: Y
      }
    });
    Qe.event = Ke;
    Q.current = Ge;
    z(Ge, Qe);
    if (!Qe.isCanceled) {
      ce(Ge);
    }
  });
  const dt = je((Ge, Ye, Qe) => {
    const gt = ZR(Ge, Ye, _, S, Ue, We);
    if (QR(gt, C, x)) {
      const ft = Ez(Qe);
      lt(gt, $e(ft, Qe.nativeEvent, undefined, {
        activeThumbIndex: Ye
      }));
      U(true);
      const Ke = Q.current ?? gt;
      N(Ke, _a(ft, Qe.nativeEvent));
    }
  });
  Fe(() => {
    const Ge = Hn(yt(ge.current));
    if (ee && Xe(ge.current, Ge)) {
      Ge.blur();
    }
  }, [ee]);
  if (ee && ye !== -1) {
    ze(-1);
  }
  const _t = E.useMemo(() => ({
    ...$,
    activeThumbIndex: ye,
    disabled: ee,
    dragging: ie,
    orientation: v,
    max: S,
    min: _,
    minStepsBetweenValues: x,
    step: C,
    values: We
  }), [$, ye, ee, ie, S, _, x, v, C, We]);
  const Dt = E.useMemo(() => ({
    active: ye,
    controlRef: de,
    disabled: ee,
    dragging: ie,
    validation: V,
    formatOptionsRef: he,
    handleInputChange: dt,
    indicatorPosition: Te,
    inset: A !== "center",
    labelId: ue,
    rootLabelId: W,
    largeStep: d,
    lastUsedThumbIndex: Se,
    lastChangedValueRef: Q,
    lastChangeReasonRef: se,
    form: w,
    locale: p,
    max: S,
    min: _,
    minStepsBetweenValues: x,
    name: Y,
    onValueCommitted: N,
    orientation: v,
    pressedInputRef: H,
    pressedThumbCenterOffsetRef: ae,
    pressedThumbIndexRef: oe,
    pressedValuesRef: X,
    registerFieldControlRef: Be,
    renderBeforeHydration: A === "edge",
    setActive: ze,
    setDragging: te,
    setIndicatorPosition: Re,
    setLabelId: ne,
    setValue: lt,
    state: _t,
    step: C,
    thumbCollisionBehavior: T,
    thumbMap: be,
    thumbRefs: me,
    values: We
  }), [ye, de, ue, W, ee, ie, V, he, dt, Te, d, Se, Q, se, w, p, S, _, x, Y, N, v, H, ae, oe, X, Be, ze, te, Re, ne, lt, _t, C, T, A, be, me, We]);
  const kt = Je("div", n, {
    state: _t,
    ref: [r, ge],
    props: [{
      "aria-labelledby": ue,
      id: j,
      role: "group"
    }, V.getValidationProps, I],
    stateAttributesMapping: Jl
  });
  return <JR.Provider value={Dt}><Iu elementsRef={me} onMapChange={ve}>{kt}</Iu></JR.Provider>;
});
const Rx = new Map();
function kz(e, n) {
  const r = JSON.stringify({
    locale: e,
    options: n
  });
  const i = Rx.get(r);
  if (i) {
    return i;
  }
  const o = new Intl.NumberFormat(e, n);
  Rx.set(r, o);
  return o;
}
function su(e, n, r) {
  if (e == null) {
    return "";
  } else {
    return kz(n, r).format(e);
  }
}
const Az = E.forwardRef(function (n, r) {
  const {
    "aria-live": i = "off",
    render: o,
    className: u,
    children: h,
    style: a,
    ...c
  } = n;
  const {
    thumbMap: d,
    state: p,
    values: f,
    formatOptionsRef: S,
    locale: _
  } = Pu();
  let x = "";
  for (const v of d.values()) {
    if (v != null && v.inputId) {
      x += `${v.inputId} `;
    }
  }
  const w = x.trim() === "" ? undefined : x.trim();
  const g = E.useMemo(() => {
    const v = [];
    for (let C = 0; C < f.length; C += 1) {
      v.push(su(f[C], _, S.current ?? undefined));
    }
    return v;
  }, [S, _, f]);
  const b = f.map((v, C) => g[C] || v).join(" – ");
  return Je("output", n, {
    state: p,
    ref: r,
    props: [{
      "aria-live": i,
      children: typeof h == "function" ? h(g, f) : b,
      htmlFor: w
    }, c],
    stateAttributesMapping: Jl
  });
});
function e2(e) {
  const n = e.getBoundingClientRect();
  return {
    x: (n.left + n.right) / 2,
    y: (n.top + n.bottom) / 2
  };
}
function iu(e) {
  if (e === 0) {
    return 0;
  }
  if (Math.abs(e) < 1) {
    const r = e.toExponential().split("e-");
    const i = r[0].split(".")[1];
    return (i ? i.length : 0) + parseInt(r[1], 10);
  }
  const n = e.toString().split(".")[1];
  if (n) {
    return n.length;
  } else {
    return 0;
  }
}
function t2(e, n, r) {
  const i = Math.round((e - r) / n) * n + r;
  return Number(i.toFixed(Math.max(iu(n), iu(r))));
}
function Tx({
  values: e,
  index: n,
  nextValue: r,
  min: i,
  max: o,
  step: u,
  minStepsBetweenValues: h,
  initialValues: a
}) {
  if (e.length === 0) {
    return [];
  }
  const c = e.slice();
  const d = u * h;
  const p = c.length - 1;
  const f = a ?? e;
  const S = i + n * d;
  const _ = o - (p - n) * d;
  c[n] = Un(r, S, _);
  for (let x = n + 1; x <= p; x += 1) {
    const w = c[x - 1] + d;
    const g = o - (p - x) * d;
    const b = f[x] ?? c[x];
    let m = Math.max(c[x], w);
    if (b < m) {
      m = Math.max(b, w);
    }
    c[x] = Un(m, w, g);
  }
  for (let x = n - 1; x >= 0; x -= 1) {
    const w = c[x + 1] - d;
    const g = i + x * d;
    const b = f[x] ?? c[x];
    let m = Math.min(c[x], w);
    if (b > m) {
      m = Math.min(b, w);
    }
    c[x] = Un(m, g, w);
  }
  for (let x = 0; x <= p; x += 1) {
    c[x] = Number(c[x].toFixed(12));
  }
  return c;
}
function Mz({
  behavior: e,
  values: n,
  currentValues: r,
  initialValues: i,
  pressedIndex: o,
  nextValue: u,
  min: h,
  max: a,
  step: c,
  minStepsBetweenValues: d
}) {
  const p = r ?? n;
  const f = i ?? n;
  if (!(p.length > 1)) {
    return {
      value: u,
      thumbIndex: 0,
      didSwap: false
    };
  }
  const _ = c * d;
  switch (e) {
    case "swap":
      {
        const x = p[o];
        const w = 1e-7;
        const g = p.slice();
        const b = g[o - 1];
        const m = g[o + 1];
        const v = b != null ? b + _ : h;
        const C = m != null ? m - _ : a;
        const T = Un(u, v, C);
        const A = Number(T.toFixed(12));
        g[o] = A;
        const M = u > x;
        const R = u < x;
        const I = M && m != null && u >= m - w;
        const j = R && b != null && u <= b + w;
        if (!I && !j) {
          return {
            value: g,
            thumbIndex: o,
            didSwap: false
          };
        }
        const W = I ? o + 1 : o - 1;
        const z = g.map((G, q) => {
          if (q === o) {
            return A;
          }
          const U = f[q];
          return U ?? p[q];
        });
        let N = u;
        if (I) {
          N = Math.max(u, g[W]);
        } else {
          N = Math.min(u, g[W]);
        }
        const D = Tx({
          values: g,
          index: W,
          nextValue: N,
          min: h,
          max: a,
          step: c,
          minStepsBetweenValues: d,
          initialValues: z
        });
        const $ = I ? W - 1 : W + 1;
        if ($ >= 0 && $ < D.length) {
          const G = D[$ - 1];
          const q = D[$ + 1];
          let U = G != null ? G + _ : h;
          U = Math.max(U, h + $ * _);
          let L = q != null ? q - _ : a;
          L = Math.min(L, a - (D.length - 1 - $) * _);
          const F = Un(A, U, L);
          D[$] = Number(F.toFixed(12));
        }
        return {
          value: D,
          thumbIndex: W,
          didSwap: true
        };
      }
    case "push":
      return {
        value: Tx({
          values: p,
          index: o,
          nextValue: u,
          min: h,
          max: a,
          step: c,
          minStepsBetweenValues: d
        }),
        thumbIndex: o,
        didSwap: false
      };
    case "none":
    default:
      {
        const x = p.slice();
        const w = x[o - 1];
        const g = x[o + 1];
        const b = w != null ? w + _ : h;
        const m = g != null ? g - _ : a;
        const v = Un(u, b, m);
        x[o] = Number(v.toFixed(12));
        return {
          value: x,
          thumbIndex: o,
          didSwap: false
        };
      }
  }
}
const Oz = 2;
function Dz(e, n) {
  if (!e) {
    return {
      start: 0,
      end: 0
    };
  }
  function r(u) {
    const h = u != null ? parseFloat(u) : 0;
    if (Number.isNaN(h)) {
      return 0;
    } else {
      return h;
    }
  }
  const i = n ? "Top" : "InlineStart";
  const o = n ? "Bottom" : "InlineEnd";
  return {
    start: r(e[`border${i}Width`]) + r(e[`padding${i}`]),
    end: r(e[`border${o}Width`]) + r(e[`padding${o}`])
  };
}
function bf(e, n) {
  if (n.current != null && e.changedTouches) {
    const r = e;
    for (let i = 0; i < r.changedTouches.length; i += 1) {
      const o = r.changedTouches[i];
      if (o.identifier === n.current) {
        return {
          x: o.clientX,
          y: o.clientY
        };
      }
    }
    return null;
  }
  return {
    x: e.clientX,
    y: e.clientY
  };
}
const Iz = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    ...h
  } = n;
  const {
    disabled: a,
    dragging: c,
    inset: d,
    lastChangedValueRef: p,
    lastChangeReasonRef: f,
    max: S,
    min: _,
    minStepsBetweenValues: x,
    onValueCommitted: w,
    orientation: g,
    pressedInputRef: b,
    pressedThumbCenterOffsetRef: m,
    pressedThumbIndexRef: v,
    pressedValuesRef: C,
    registerFieldControlRef: T,
    renderBeforeHydration: A,
    setActive: M,
    setDragging: R,
    setValue: I,
    state: j,
    step: W,
    thumbCollisionBehavior: z,
    thumbRefs: N,
    values: D
  } = Pu();
  const $ = Us();
  const G = D.length > 1;
  const q = g === "vertical";
  const U = E.useRef(null);
  const L = E.useRef(null);
  const F = je(ae => {
    if (ae && L.current == null) {
      L.current = fn(ae).getComputedStyle(ae);
    }
  });
  const P = E.useRef(null);
  const V = E.useRef(0);
  const Z = E.useRef(0);
  const J = On(D);
  function ne(ae) {
    if (v.current !== ae) {
      v.current = ae;
    }
    const oe = N.current[ae];
    if (!oe) {
      m.current = null;
      b.current = null;
      return;
    }
    b.current = oe.querySelector("input[type=\"range\"]");
  }
  function ue(ae) {
    const oe = U.current;
    if (!oe) {
      return null;
    }
    const {
      width: X,
      height: Q,
      bottom: se,
      left: he,
      right: ye
    } = oe.getBoundingClientRect();
    const pe = Dz(L.current, q);
    const Se = Z.current;
    const _e = (q ? Q : X) - pe.start - pe.end - Se * 2;
    const ie = m.current ?? 0;
    const te = ae.x - ie;
    const be = ae.y - ie;
    const ve = q ? se - be - pe.end : ($ === "rtl" ? ye - te : te - he) - pe.start;
    const Te = Un((ve - Se) / _e, 0, 1);
    let Re = (S - _) * Te + _;
    Re = t2(Re, W, _);
    Re = Un(Re, _, S);
    if (!G) {
      return {
        value: Re,
        thumbIndex: 0,
        didSwap: false
      };
    }
    const ze = v.current;
    if (ze < 0) {
      return null;
    }
    const Be = Mz({
      behavior: z,
      values: D,
      currentValues: J.current ?? D,
      initialValues: C.current,
      pressedIndex: ze,
      nextValue: Re,
      min: _,
      max: S,
      step: W,
      minStepsBetweenValues: x
    });
    if (z === "swap" && Be.didSwap) {
      ne(Be.thumbIndex);
    } else {
      v.current = Be.thumbIndex;
    }
    return Be;
  }
  function ee(ae) {
    C.current = G ? D.slice() : null;
    J.current = D;
    const oe = v.current;
    let X = oe;
    if (oe > -1 && oe < D.length) {
      if (D[oe] === S) {
        let Q = oe;
        while (Q > 0 && D[Q - 1] === S) {
          Q -= 1;
        }
        X = Q;
      }
    } else {
      const Q = q ? "y" : "x";
      let se;
      X = -1;
      for (let he = 0; he < N.current.length; he += 1) {
        const ye = N.current[he];
        if (Mt(ye)) {
          const pe = e2(ye);
          const Se = Math.abs(ae[Q] - pe[Q]);
          if (se === undefined || Se <= se) {
            X = he;
            se = Se;
          }
        }
      }
    }
    if (X > -1 && X !== oe) {
      ne(X);
    }
    if (d) {
      const Q = N.current[X];
      if (Mt(Q)) {
        const se = Q.getBoundingClientRect();
        const he = q ? "height" : "width";
        Z.current = se[he] / 2;
      }
    }
  }
  function Y(ae) {
    var X;
    var Q;
    const oe = (Q = (X = N.current) == null ? undefined : X[ae]) == null ? undefined : Q.querySelector("input[type=\"range\"]");
    if (oe) {
      oe.focus({
        preventScroll: true,
        focusVisible: false
      });
    }
  }
  const re = je(ae => {
    const oe = bf(ae, P);
    if (oe == null) {
      return;
    }
    V.current += 1;
    if (ae.type === "pointermove" && ae.buttons === 0) {
      ce(ae);
      return;
    }
    const X = ue(oe);
    if (X != null && QR(X.value, W, x)) {
      if (!c && V.current > Oz) {
        R(true);
      }
      I(X.value, $e(c3, ae, undefined, {
        activeThumbIndex: X.thumbIndex
      }));
      J.current = Array.isArray(X.value) ? X.value : [X.value];
      if (X.didSwap) {
        Y(X.thumbIndex);
      }
    }
  });
  function ce(ae) {
    var Q;
    var se;
    M(-1);
    R(false);
    b.current = null;
    m.current = null;
    const oe = bf(ae, P);
    const X = oe != null ? ue(oe) : null;
    if (X != null) {
      const he = f.current;
      w(p.current ?? X.value, _a(he, ae));
    }
    if ("pointerType" in ae && (Q = U.current) != null && Q.hasPointerCapture(ae.pointerId)) {
      if ((se = U.current) != null) {
        se.releasePointerCapture(ae.pointerId);
      }
    }
    v.current = -1;
    P.current = null;
    C.current = null;
    de();
  }
  const ge = je(ae => {
    if (a) {
      return;
    }
    const oe = ae.changedTouches[0];
    if (oe != null) {
      P.current = oe.identifier;
    }
    const X = bf(ae, P);
    if (X != null) {
      ee(X);
      const se = ue(X);
      if (se == null) {
        return;
      }
      Y(se.thumbIndex);
      I(se.value, $e(_S, ae, undefined, {
        activeThumbIndex: se.thumbIndex
      }));
      J.current = Array.isArray(se.value) ? se.value : [se.value];
      if (se.didSwap) {
        Y(se.thumbIndex);
      }
    }
    V.current = 0;
    const Q = yt(U.current);
    Q.addEventListener("touchmove", re, {
      passive: true
    });
    Q.addEventListener("touchend", ce, {
      passive: true
    });
  });
  const de = je(() => {
    const ae = yt(U.current);
    ae.removeEventListener("pointermove", re);
    ae.removeEventListener("pointerup", ce);
    ae.removeEventListener("touchmove", re);
    ae.removeEventListener("touchend", ce);
    C.current = null;
  });
  const me = Vi();
  E.useEffect(() => {
    const ae = U.current;
    if (!ae) {
      return () => de();
    }
    const oe = Tt(ae, "touchstart", ge, {
      passive: true
    });
    return () => {
      oe();
      me.cancel();
      de();
    };
  }, [de, ge, U, me]);
  E.useEffect(() => {
    if (a) {
      de();
    }
  }, [a, de]);
  return Je("div", n, {
    state: j,
    ref: [r, T, U, F],
    props: [{
      "data-base-ui-slider-control": A ? "" : undefined,
      onPointerDown(ae) {
        const oe = U.current;
        const X = dn(ae.nativeEvent);
        if (!oe || a || ae.defaultPrevented || !Mt(X) || ae.button !== 0) {
          return;
        }
        const Q = bf(ae, P);
        if (Q != null) {
          ee(Q);
          const he = ue(Q);
          if (he == null) {
            return;
          }
          if (Xe(N.current[he.thumbIndex], Hn(yt(oe)))) {
            ae.preventDefault();
          } else {
            me.request(() => {
              Y(he.thumbIndex);
            });
          }
          R(true);
          if (m.current == null) {
            I(he.value, $e(_S, ae.nativeEvent, undefined, {
              activeThumbIndex: he.thumbIndex
            }));
            J.current = Array.isArray(he.value) ? he.value : [he.value];
            if (he.didSwap) {
              Y(he.thumbIndex);
            }
          }
        }
        if (ae.nativeEvent.pointerId) {
          oe.setPointerCapture(ae.nativeEvent.pointerId);
        }
        V.current = 0;
        const se = yt(U.current);
        se.addEventListener("pointermove", re, {
          passive: true
        });
        se.addEventListener("pointerup", ce, {
          once: true
        });
      }
    }, h],
    stateAttributesMapping: Jl
  });
});
const Lz = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    ...h
  } = n;
  const {
    state: a
  } = Pu();
  return Je("div", n, {
    state: a,
    ref: r,
    props: [{
      style: {
        position: "relative"
      }
    }, h],
    stateAttributesMapping: Jl
  });
});
function Pz() {
  return Yt;
}
function Bz() {
  return false;
}
function zz() {
  return true;
}
function n2() {
  return ob.useSyncExternalStore(Pz, Bz, zz);
}
function Sv(e, n, r) {
  return (e - n) * 100 / (r - n);
}
let Nz = function (e) {
  e.index = "data-index";
  e.dragging = "data-dragging";
  e.orientation = "data-orientation";
  e.disabled = "data-disabled";
  e.valid = "data-valid";
  e.invalid = "data-invalid";
  e.touched = "data-touched";
  e.dirty = "data-dirty";
  e.focused = "data-focused";
  return e;
}({});
const jz = "!function(){const t=document.currentScript?.parentElement;if(!t)return;const e=t.closest(\"[data-base-ui-slider-control]\");if(!e)return;const r=e.querySelector(\"[data-base-ui-slider-indicator]\"),i=e.getBoundingClientRect(),n=\"vertical\"===e.getAttribute(\"data-orientation\")?\"height\":\"width\",o=e.querySelectorAll('input[type=\"range\"]'),l=o.length>1,s=o.length-1;let a=null,u=null;for(let t=0;t<o.length;t+=1){const e=o[t],y=parseFloat(e.getAttribute(\"value\")??\"\");if(Number.isNaN(y))return;const c=e.parentElement;if(!c)return;const p=parseFloat(e.getAttribute(\"max\")??\"100\"),g=parseFloat(e.getAttribute(\"min\")??\"0\"),b=c?.getBoundingClientRect(),d=i[n]-b[n],m=100*(y-g)/(p-g),v=(b[n]/2+d*m/100)/i[n]*100;c.style.setProperty(\"--position\",`${v}%`),Number.isFinite(v)&&(c.style.removeProperty(\"visibility\"),r&&(0===t?(a=v,r.style.setProperty(\"--start-position\",`${v}%`),l||r.style.removeProperty(\"visibility\")):t===s&&(u=v-(a??0),r.style.setProperty(\"--end-position\",`${v}%`),r.style.setProperty(\"--relative-size\",`${u}%`),r.style.removeProperty(\"visibility\"))))}}();";
const Hz = new Set([...Na, YE, XE]);
function Fz(e, n, r, i) {
  if (!(n < 0)) {
    if (e.length === 2) {
      if (n === 0) {
        return `${su(e[n], i, r)} start range`;
      } else {
        return `${su(e[n], i, r)} end range`;
      }
    } else if (r) {
      return su(e[n], i, r);
    } else {
      return undefined;
    }
  }
}
function Al(e, n, r, i, o) {
  const u = r === 1 ? e + n : e - n;
  const h = Number(u.toFixed(Math.max(iu(e), iu(n), iu(i))));
  return Un(h, i, o);
}
const Uz = E.forwardRef(function (n, r) {
  const {
    render: i,
    children: o,
    className: u,
    "aria-describedby": h,
    "aria-label": a,
    "aria-labelledby": c,
    disabled: d = false,
    getAriaLabel: p,
    getAriaValueText: f,
    id: S,
    index: _,
    inputRef: x,
    onBlur: w,
    onFocus: g,
    onKeyDown: b,
    tabIndex: m,
    style: v,
    ...C
  } = n;
  const {
    nonce: T
  } = Bb();
  const A = $n(S);
  const {
    active: M,
    lastUsedThumbIndex: R,
    controlRef: I,
    disabled: j,
    validation: W,
    formatOptionsRef: z,
    handleInputChange: N,
    inset: D,
    labelId: $,
    largeStep: G,
    locale: q,
    max: U,
    min: L,
    minStepsBetweenValues: F,
    form: P,
    name: V,
    orientation: Z,
    pressedInputRef: J,
    pressedThumbCenterOffsetRef: ne,
    pressedThumbIndexRef: ue,
    renderBeforeHydration: ee,
    setActive: Y,
    setIndicatorPosition: re,
    state: ce,
    step: ge,
    values: de
  } = Pu();
  const me = Us();
  const H = d || j;
  const ae = de.length > 1;
  const oe = Z === "vertical";
  const X = me === "rtl";
  const {
    setTouched: Q,
    setFocused: se,
    validationMode: he
  } = Gr();
  const ye = E.useRef(null);
  const pe = E.useRef(null);
  const Se = E.useRef(false);
  const _e = $n();
  const ie = Ba();
  const te = ae ? _e : ie;
  const be = E.useMemo(() => ({
    inputId: te
  }), [te]);
  const {
    ref: ve,
    index: Te
  } = za({
    metadata: be
  });
  const Re = ae ? _ ?? Te : 0;
  const ze = Re === de.length - 1;
  const Be = de[Re];
  const Ue = Sv(Be, L, U);
  const [We, lt] = E.useState();
  const dt = n2();
  const _t = R >= 0 && R < de.length ? R : -1;
  const Dt = je(() => {
    const it = I.current;
    const et = ye.current;
    if (!it || !et) {
      return;
    }
    const Wt = et.getBoundingClientRect();
    const xt = it.getBoundingClientRect();
    const Ln = oe ? "height" : "width";
    const tn = xt[Ln] - Wt[Ln];
    const ht = (Wt[Ln] / 2 + tn * Ue / 100) / xt[Ln] * 100;
    const Zt = Number.isFinite(ht) ? ht : undefined;
    lt(Zt);
    if (Re === 0) {
      re(nn => [Zt, nn[1]]);
    } else if (ze) {
      re(nn => [nn[0], Zt]);
    }
  });
  Fe(() => {
    if (D) {
      queueMicrotask(Dt);
    }
  }, [Dt, D]);
  Fe(() => {
    if (D) {
      Dt();
    }
  }, [Dt, D, Ue]);
  Fe(() => {
    if (!D) {
      return;
    }
    const it = I.current;
    const et = ye.current;
    if (!it || !et) {
      return;
    }
    const Wt = fn(it).ResizeObserver;
    if (typeof Wt != "function") {
      return;
    }
    const xt = new Wt(Dt);
    xt.observe(it);
    xt.observe(et);
    return () => {
      xt.disconnect();
    };
  }, [I, Dt, D]);
  const kt = oe ? "bottom" : "insetInlineStart";
  const Ge = oe ? "left" : "top";
  let Ye;
  if (ae) {
    if (M === Re) {
      Ye = 2;
    } else if (_t === Re) {
      Ye = 1;
    }
  } else if (M === Re) {
    Ye = 1;
  }
  let Qe;
  if (D) {
    Qe = {
      "--position": `${We ?? 0}%`,
      visibility: ee && dt || We === undefined ? "hidden" : undefined,
      position: "absolute",
      [kt]: "var(--position)",
      [Ge]: "50%",
      translate: `${(oe || !X ? -1 : 1) * 50}% ${(oe ? 1 : -1) * 50}%`,
      zIndex: Ye
    };
  } else {
    Qe = Number.isFinite(Ue) ? {
      position: "absolute",
      [kt]: `${Ue}%`,
      [Ge]: "50%",
      translate: `${(oe || !X ? -1 : 1) * 50}% ${(oe ? 1 : -1) * 50}%`,
      zIndex: Ye
    } : Ma;
  }
  let gt;
  if (Z === "vertical") {
    gt = X ? "vertical-rl" : "vertical-lr";
  }
  const ft = typeof p == "function" ? p(Re) : a;
  const Ke = Sn({
    "aria-label": ft,
    "aria-labelledby": c ?? (ft == null ? $ : undefined),
    "aria-describedby": h,
    "aria-orientation": Z,
    "aria-valuenow": Be,
    "aria-valuetext": typeof f == "function" ? f(su(Be, q, z.current ?? undefined), Be, Re) : Fz(de, Re, z.current ?? undefined, q),
    disabled: H,
    form: P,
    id: te,
    max: U,
    min: L,
    name: V,
    onChange(it) {
      N(it.currentTarget.valueAsNumber, Re, it);
    },
    onFocus(it) {
      const et = Se.current;
      Se.current = false;
      Y(Re);
      se(true);
      if (et) {
        it.stopPropagation();
      }
    },
    onBlur(it) {
      if (Se.current) {
        it.stopPropagation();
        return;
      }
      if (ye.current) {
        Y(-1);
        Q(true);
        se(false);
        if (he === "onBlur") {
          W.commit(ZR(Be, Re, L, U, ae, de));
        }
      }
    },
    onKeyDown(it) {
      if (!Hz.has(it.key)) {
        return;
      }
      if (Na.has(it.key)) {
        it.stopPropagation();
      }
      let et = null;
      const Wt = t2(Be, ge, L);
      switch (it.key) {
        case zl:
          et = Al(Wt, it.shiftKey ? G : ge, 1, L, U);
          break;
        case Nl:
          et = Al(Wt, it.shiftKey ? G : ge, X ? -1 : 1, L, U);
          break;
        case xa:
          et = Al(Wt, it.shiftKey ? G : ge, -1, L, U);
          break;
        case mu:
          et = Al(Wt, it.shiftKey ? G : ge, X ? 1 : -1, L, U);
          break;
        case YE:
          et = Al(Wt, G, 1, L, U);
          break;
        case XE:
          et = Al(Wt, G, -1, L, U);
          break;
        case Du:
          et = U;
          if (ae) {
            et = Number.isFinite(de[Re + 1]) ? de[Re + 1] - ge * F : U;
          }
          break;
        case Ou:
          et = L;
          if (ae) {
            et = Number.isFinite(de[Re - 1]) ? de[Re - 1] + ge * F : L;
          }
          break;
      }
      if (et !== null) {
        const xt = it.currentTarget;
        if (!cu(xt)) {
          Se.current = true;
          xt.blur();
          xt.focus({
            preventScroll: true,
            focusVisible: true
          });
        }
        N(et, Re, it);
        it.preventDefault();
      }
    },
    step: ge,
    style: {
      ...Ma,
      width: "100%",
      height: "100%",
      writingMode: gt
    },
    tabIndex: m ?? undefined,
    type: "range",
    value: Be ?? ""
  }, W.getInputValidationProps);
  const en = ls(pe, W.inputRef, x);
  return Je("div", n, {
    state: ce,
    ref: [r, ve, ye],
    props: [{
      [Nz.index]: Re,
      children: <E.Fragment>{o}<input ref={en} {...Ke} suppressHydrationWarning={true} />{D && dt && ee && ze && <script nonce={T} dangerouslySetInnerHTML={{
          __html: jz
        }} suppressHydrationWarning={true} />}</E.Fragment>,
      id: A,
      onBlur: w,
      onFocus: g,
      onPointerDown(it) {
        ue.current = Re;
        if (ye.current != null) {
          const et = Z === "horizontal" ? "x" : "y";
          const Wt = e2(ye.current);
          const xt = (Z === "horizontal" ? it.clientX : it.clientY) - Wt[et];
          ne.current = xt;
        }
        if (pe.current != null && J.current !== pe.current) {
          J.current = pe.current;
        }
      },
      style: Qe,
      suppressHydrationWarning: ee || undefined
    }, C],
    stateAttributesMapping: Jl
  });
});
function Vz(e, n, r, i, o, u) {
  const h = r === undefined || n && i === undefined ? "hidden" : undefined;
  const a = e ? "bottom" : "insetInlineStart";
  const c = e ? "height" : "width";
  const p = {
    visibility: o && u ? "hidden" : h,
    position: e ? "absolute" : "relative",
    [e ? "width" : "height"]: "inherit"
  };
  p["--start-position"] = `${r ?? 0}%`;
  if (n) {
    p["--relative-size"] = `${(i ?? 0) - (r ?? 0)}%`;
    p[a] = "var(--start-position)";
    p[c] = "var(--relative-size)";
    return p;
  } else {
    p[a] = 0;
    p[c] = "var(--start-position)";
    return p;
  }
}
function Wz(e, n, r, i) {
  const o = e ? "bottom" : "insetInlineStart";
  const u = e ? "height" : "width";
  const a = {
    position: e ? "absolute" : "relative",
    [e ? "width" : "height"]: "inherit"
  };
  if (!n) {
    a[o] = 0;
    a[u] = `${r}%`;
    return a;
  }
  const c = i - r;
  a[o] = `${r}%`;
  a[u] = `${c}%`;
  return a;
}
const $z = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    ...h
  } = n;
  const {
    indicatorPosition: a,
    inset: c,
    max: d,
    min: p,
    orientation: f,
    renderBeforeHydration: S,
    state: _,
    values: x
  } = Pu();
  const w = n2();
  const g = f === "vertical";
  const b = x.length > 1;
  const m = c ? Vz(g, b, a[0], a[1], S, w) : Wz(g, b, Sv(x[0], p, d), Sv(x[x.length - 1], p, d));
  return Je("div", n, {
    state: _,
    ref: r,
    props: [{
      "data-base-ui-slider-indicator": S ? "" : undefined,
      style: m,
      suppressHydrationWarning: S || undefined
    }, h],
    stateAttributesMapping: Jl
  });
});
function _Component72({
  className: e,
  children: n,
  defaultValue: r,
  value: i,
  min: o = 0,
  max: u = 100,
  ...h
}) {
  const a = E.useMemo(() => i !== undefined ? Array.isArray(i) ? i : [i] : r !== undefined ? Array.isArray(r) ? r : [r] : [o], [i, r, o]);
  return <Tz className={pt("data-[orientation=horizontal]:w-full", e)} defaultValue={r} max={u} min={o} thumbAlignment="edge" value={i} {...h}>{n}<Iz className="flex touch-none select-none data-disabled:pointer-events-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=horizontal]:w-full data-[orientation=horizontal]:min-w-44 data-[orientation=vertical]:flex-col data-disabled:opacity-64" data-slot="slider-control"><Lz className="relative grow select-none before:absolute before:rounded-full before:bg-input data-[orientation=horizontal]:h-1 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1 data-[orientation=horizontal]:before:inset-x-0.5 data-[orientation=vertical]:before:inset-x-0 data-[orientation=horizontal]:before:inset-y-0 data-[orientation=vertical]:before:inset-y-0.5" data-slot="slider-track"><$z className="select-none rounded-full bg-primary data-[orientation=horizontal]:ms-0.5 data-[orientation=vertical]:mb-0.5" data-slot="slider-indicator" />{Array.from({
          length: a.length
        }, (c, d) => <Uz className="block size-5 shrink-0 select-none rounded-full border border-input bg-white not-dark:bg-clip-padding shadow-xs/5 outline-none transition-[box-shadow,scale] before:absolute before:inset-0 before:rounded-full before:shadow-[0_1px_--theme(--color-black/4%)] has-focus-visible:ring-[3px] has-focus-visible:ring-ring/24 data-dragging:scale-120 sm:size-4 dark:border-background dark:has-focus-visible:ring-ring/48 [:has(*:focus-visible),[data-dragging]]:shadow-none" data-slot="slider-thumb" index={d} key={String(d)} />)}</Lz></Iz></Tz>;
}
function Ax({
  className: e,
  ...n
}) {
  return <Az className={pt("flex justify-end text-sm", e)} data-slot="slider-value" {...n} />;
}
function Mx({
  className: e,
  ...n
}) {
  return <_Component68 className={pt("flex flex-col items-start gap-2", e)} data-slot="field" {...n} />;
}
function Ox({
  className: e,
  ...n
}) {
  return <_Component69 className={pt("inline-flex items-center gap-2 font-medium text-base/4.5 text-foreground data-disabled:opacity-64 sm:text-sm/4", e)} data-slot="field-label" {...n} />;
}
function Fg(e) {
  return getComputedStyle(document.documentElement).getPropertyValue(e).trim();
}
function Dx() {
  return {
    background: "transparent",
    foreground: Fg("--foreground"),
    cursor: Fg("--foreground"),
    selectionBackground: Fg("--ring")
  };
}
const Ix = 20;
const qz = [{
  id: "n",
  cursor: "ns-resize",
  style: {
    top: -4,
    left: 8,
    right: 8,
    height: 8
  }
}, {
  id: "s",
  cursor: "ns-resize",
  style: {
    bottom: -4,
    left: 8,
    right: 8,
    height: 8
  }
}, {
  id: "e",
  cursor: "ew-resize",
  style: {
    top: 8,
    bottom: 8,
    right: -4,
    width: 8
  }
}, {
  id: "w",
  cursor: "ew-resize",
  style: {
    top: 8,
    bottom: 8,
    left: -4,
    width: 8
  }
}, {
  id: "ne",
  cursor: "nesw-resize",
  style: {
    top: -4,
    right: -4,
    width: 12,
    height: 12
  }
}, {
  id: "nw",
  cursor: "nwse-resize",
  style: {
    top: -4,
    left: -4,
    width: 12,
    height: 12
  }
}, {
  id: "se",
  cursor: "nwse-resize",
  style: {
    bottom: -4,
    right: -4,
    width: 12,
    height: 12
  }
}, {
  id: "sw",
  cursor: "nesw-resize",
  style: {
    bottom: -4,
    left: -4,
    width: 12,
    height: 12
  }
}];
const Gz = [{
  id: "n",
  cursor: "ns-resize",
  style: {
    top: -8,
    left: 8,
    right: 8,
    height: 16
  }
}, {
  id: "s",
  cursor: "ns-resize",
  style: {
    bottom: -8,
    left: 8,
    right: 8,
    height: 16
  }
}, {
  id: "e",
  cursor: "ew-resize",
  style: {
    top: 8,
    bottom: 8,
    right: -8,
    width: 16
  }
}, {
  id: "w",
  cursor: "ew-resize",
  style: {
    top: 8,
    bottom: 8,
    left: -8,
    width: 16
  }
}, {
  id: "ne",
  cursor: "nesw-resize",
  style: {
    top: -8,
    right: -8,
    width: 20,
    height: 20
  }
}, {
  id: "nw",
  cursor: "nwse-resize",
  style: {
    top: -8,
    left: -8,
    width: 20,
    height: 20
  }
}, {
  id: "se",
  cursor: "nwse-resize",
  style: {
    bottom: -8,
    right: -8,
    width: 20,
    height: 20
  }
}, {
  id: "sw",
  cursor: "nesw-resize",
  style: {
    bottom: -8,
    left: -8,
    width: 20,
    height: 20
  }
}];
function Yz(e) {
  const n = ["#89b4fa", "#a6e3a1", "#f38ba8", "#f9e2af", "#cba6f7", "#94e2d5"];
  let r = 0;
  for (let i = 0; i < e.length; i++) {
    r = e.charCodeAt(i) + ((r << 5) - r);
  }
  return n[Math.abs(r) % n.length];
}
function Xz({
  widget: e,
  serverUrl: n,
  isAppRunning: r,
  onAutoStart: i,
  isDragging: o,
  onDragStart: u,
  onDragEnd: h,
  onContextMenu: a,
  onResizeStart: c,
  isResizing: d,
  onOpenApp: p,
  onToggleLock: f,
  onDelete: S,
  onUpdateBackground: _,
  refreshKey: x = 0,
  onRefresh: w,
  showBgConfig: g,
  onShowBgConfigChange: b
}) {
  const [m, v] = E.useState(false);
  const [C, T] = E.useState(false);
  const [A, M] = E.useState(false);
  const [R, I] = E.useState(false);
  const [j, W] = E.useState(false);
  const z = E.useRef(false);
  const N = E.useRef(null);
  const D = E.useRef(null);
  const $ = E.useRef(null);
  const G = E.useRef(null);
  const q = E.useRef(null);
  const U = E.useRef(null);
  const L = e.locked === true;
  const F = ou({
    pointer: "coarse"
  });
  const P = ou("max-md");
  E.useEffect(() => {
    if (!F) {
      if (L) {
        if (A) {
          const te = setTimeout(() => I(true), 1500);
          return () => clearTimeout(te);
        } else {
          I(false);
        }
      } else {
        I(A);
      }
    }
  }, [A, L, F]);
  E.useEffect(() => {
    if (L) {
      W(false);
    }
  }, [L]);
  E.useEffect(() => {
    if (g && !L) {
      I(true);
      W(true);
    }
  }, [g, L]);
  const V = E.useCallback(te => {
    if (te.button === 0 && te.target.tagName !== "IFRAME") {
      if (!L) {
        z.current = true;
        if (u != null) {
          u(e.id, te.clientX, te.clientY);
        }
      }
    }
  }, [e.id, u, L]);
  const Z = E.useCallback(() => {
    if (z.current) {
      z.current = false;
      if (h != null) {
        h();
      }
    }
  }, [h]);
  const J = E.useCallback(te => {
    if (!L) {
      q.current = {
        x: te.clientX,
        y: te.clientY,
        time: Date.now(),
        moved: false
      };
    }
  }, [L]);
  const ne = E.useCallback(te => {
    if (!q.current || q.current.moved) {
      return;
    }
    const be = te.clientX - q.current.x;
    const ve = te.clientY - q.current.y;
    if (Math.abs(be) > 10 || Math.abs(ve) > 10) {
      q.current.moved = true;
      z.current = true;
      if (u != null) {
        u(e.id, te.clientX, te.clientY);
      }
    }
  }, [e.id, u, L]);
  const ue = E.useCallback(() => {
    if (q.current && !q.current.moved && Date.now() - q.current.time < 500) {
      I(be => !be);
    }
    q.current = null;
    if (z.current) {
      z.current = false;
      if (h != null) {
        h();
      }
    }
  }, [h]);
  const ee = E.useCallback(te => {
    if (!L) {
      q.current = {
        x: te.clientX,
        y: te.clientY,
        time: Date.now(),
        moved: false
      };
      U.current = setTimeout(() => {
        if (q.current && !q.current.moved) {
          if (a != null) {
            a(e, {
              x: q.current.x,
              y: q.current.y
            });
          }
          q.current = null;
        }
      }, 500);
    }
  }, [e, a, L]);
  const Y = E.useCallback(te => {
    if (!q.current || q.current.moved) {
      return;
    }
    const be = te.clientX - q.current.x;
    const ve = te.clientY - q.current.y;
    if (Math.abs(be) > 10 || Math.abs(ve) > 10) {
      q.current.moved = true;
      if (U.current) {
        clearTimeout(U.current);
        U.current = null;
      }
      z.current = true;
      if (u != null) {
        u(e.id, te.clientX, te.clientY);
      }
    }
  }, [e.id, u, L]);
  const re = E.useCallback(() => {
    if (U.current) {
      clearTimeout(U.current);
      U.current = null;
    }
    if (q.current && !q.current.moved && Date.now() - q.current.time < 500) {
      I(be => !be);
    }
    q.current = null;
    if (z.current) {
      z.current = false;
      if (h != null) {
        h();
      }
    }
  }, [h]);
  const ce = E.useCallback(te => {
    te.preventDefault();
    te.stopPropagation();
    if (a != null) {
      a(e, {
        x: te.clientX,
        y: te.clientY
      });
    }
  }, [e, a]);
  const ge = E.useCallback(te => {
    te.stopPropagation();
    if (w != null) {
      w(e.id);
    }
  }, [e.id, w]);
  const de = E.useCallback(te => {
    te.stopPropagation();
    T(be => !be);
  }, []);
  const me = E.useCallback((te, be) => {
    te.preventDefault();
    te.stopPropagation();
    if (c != null) {
      c(e.id, be, te.clientX, te.clientY);
    }
  }, [e.id, c]);
  const H = E.useCallback(te => {
    te.stopPropagation();
    if (p != null) {
      p(e.appId);
    }
  }, [e.appId, p]);
  const ae = E.useCallback(te => {
    te.stopPropagation();
    if (f != null) {
      f(e.id);
    }
  }, [e.id, f]);
  const oe = E.useCallback(te => {
    te.stopPropagation();
    if (S != null) {
      S(e);
    }
  }, [e, S]);
  E.useEffect(() => {
    if (i !== G.current) {
      G.current = i;
      if (i != null) {
        i(e.appId, e.id, D);
      }
    }
  }, [i, e.appId, e.id]);
  E.useEffect(() => {
    if (!N.current || D.current) {
      return;
    }
    const te = new P1.FitAddon();
    const be = new L1.Terminal({
      cursorBlink: true,
      convertEol: true,
      fontSize: 11,
      fontFamily: "'SF Mono', Monaco, 'Cascadia Code', monospace",
      theme: Dx()
    });
    be.loadAddon(te);
    be.open(N.current);
    D.current = be;
    $.current = te;
    const ve = Te => {
      if (D.current) {
        D.current.options.theme = Dx();
      }
    };
    window.addEventListener("theme-changed", ve);
    return () => {
      window.removeEventListener("theme-changed", ve);
      be.dispose();
      D.current = null;
      $.current = null;
    };
  }, [e.id]);
  E.useEffect(() => {
    if (C && $.current) {
      const te = setTimeout(() => $.current.fit(), 100);
      return () => clearTimeout(te);
    }
  }, [C]);
  const X = n ? `${n}${e.widget.url}` : null;
  const Q = e.app || {};
  const se = Q.icon && !m ? Q.icon : null;
  const {
    width: he,
    height: ye
  } = Ls(e.widget);
  const pe = he - Li;
  const Se = ye - Li;
  const _e = Li / 2;
  const ie = E.useMemo(() => {
    const te = e.widget.background ?? {};
    const be = typeof te == "string" ? {
      type: te
    } : te;
    const ve = be.type ?? "frosted";
    if (ve === "transparent") {
      return {};
    }
    if (ve === "solid") {
      return {
        background: "var(--background)"
      };
    }
    const Te = Math.max(0, Math.min(100, be.opacity ?? 80));
    const Re = Math.max(0, be.blur ?? 12);
    return {
      background: `color-mix(in srgb, var(--background) ${Te}%, transparent)`,
      backdropFilter: `blur(${Re}px)`,
      WebkitBackdropFilter: `blur(${Re}px)`
    };
  }, [e.widget.background]);
  return <div className={`absolute flex flex-col rounded-xl overflow-hidden border border-border/30 transition-[box-shadow,border-color] duration-150 ${o ? "opacity-80 scale-[1.02] z-50 shadow-lg border-border/60 transition-none" : "z-0 hover:shadow-lg hover:border-border/60"}`} style={{
    transform: `translate(${Ix + (e.x ?? 0) + _e}px, ${Ix + (e.y ?? 0) + _e}px)`,
    width: pe,
    height: Se,
    transition: o || d ? "none" : "transform 0.15s ease",
    touchAction: "none",
    WebkitTouchCallout: "none",
    willChange: o || d ? "transform" : "auto",
    ...ie
  }} onPointerDown={V} onPointerUp={Z} onMouseEnter={() => M(true)} onMouseLeave={() => M(false)} onContextMenu={ce} data-widget-id={e.id}>{F && <div data-widget-top-edge={true} className="absolute top-0 left-0 right-0 z-25" style={{
      height: 24,
      touchAction: "none",
      pointerEvents: R ? "none" : "auto"
    }} onPointerDown={te => {
      te.stopPropagation();
      J(te);
    }} onPointerMove={ne} onPointerUp={ue} onTouchStart={te => te.stopPropagation()} />}<div data-widget-header={true} className="absolute top-0 left-0 right-0 z-20 flex items-center gap-1 px-2 py-1 bg-background/60 backdrop-blur-md border-b border-border/20 shrink-0" style={{
      transform: R ? "translateY(0)" : "translateY(-100%)",
      transition: "transform 0.2s ease",
      pointerEvents: R ? "auto" : "none"
    }} onPointerDown={F ? te => {
      te.stopPropagation();
      ee(te);
    } : undefined} onPointerMove={F ? Y : undefined} onPointerUp={F ? re : undefined} onTouchStart={F ? te => te.stopPropagation() : undefined}>{se ? <img src={se} alt="" className="w-3.5 h-3.5 rounded" onError={() => v(true)} /> : <div className="w-3.5 h-3.5 rounded flex items-center justify-center text-[8px] font-bold text-white" style={{
        background: Yz(e.appId)
      }}>{(Q.name || "?").charAt(0)}</div>}<span className="text-[10px] text-muted-foreground truncate flex-1 select-none">{rn(e.widget.name, xr())}</span>{!P && <_Component25><An render={<button className={`flex items-center justify-center w-4 h-4 rounded transition-colors disabled:opacity-30 disabled:cursor-default ${C ? "bg-accent text-accent-foreground" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`} disabled={L} onPointerDown={te => te.stopPropagation()} onClick={de} />}><Tf className="w-2.5 h-2.5" /></An><Mn side="top">{_s("widget.logs")}</Mn></_Component25>}<_Component25><An render={<button className="flex items-center justify-center w-4 h-4 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-default" disabled={L} onPointerDown={te => te.stopPropagation()} onClick={ge} />}><_Component70 className="w-2.5 h-2.5" /></An><Mn side="top">{_s("widget.refresh")}</Mn></_Component25>{!P && <_Component25><An render={<button className="flex items-center justify-center w-4 h-4 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-default" disabled={L} onPointerDown={te => te.stopPropagation()} onClick={H} />}><_Component71 className="w-2.5 h-2.5" /></An><Mn side="top">{_s("widget.openApp")}</Mn></_Component25>}<_Component74 open={j} onOpenChange={te => {
        W(te);
        if (!te && b != null) {
          b(false);
        }
      }}><_Component25><An render={<Sz render={<button className="flex items-center justify-center w-4 h-4 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-default" disabled={L} onPointerDown={te => te.stopPropagation()}><_Component61 className="w-2.5 h-2.5" /></button>} />}><_Component61 className="w-2.5 h-2.5" /></An><Mn side="top">{_s("widget.bgSettings")}</Mn></_Component25><_Component73 side="top" align="end" sideOffset={6} onPointerDown={te => te.stopPropagation()}><div className="w-56 space-y-3"><div className="text-xs font-medium text-foreground">{_s("widget.background")}</div><div className="flex gap-1">{["frosted", "transparent", "solid"].map(te => {
                const be = e.widget.background ?? {};
                const Te = (typeof be == "string" ? {
                  type: be
                } : be).type ?? "frosted";
                return <button className={`flex-1 px-2 py-1 rounded text-[10px] font-medium transition-colors ${Te === te ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"}`} onPointerDown={Re => Re.stopPropagation()} onClick={() => {
                  const Re = e.widget.background ?? {};
                  const Be = {
                    ...(typeof Re == "string" ? {
                      type: Re
                    } : Re),
                    type: te
                  };
                  if (_ != null) {
                    _(e.id, Be);
                  }
                }} key={te}>{_s(te === "frosted" ? "widget.bgFrosted" : te === "transparent" ? "widget.bgTransparent" : "widget.bgSolid")}</button>;
              })}</div>{(() => {
              const te = e.widget.background ?? {};
              const be = typeof te == "string" ? {
                type: te
              } : te;
              if ((be.type ?? "frosted") !== "frosted") {
                return null;
              } else {
                return <B.Fragment><Mx><_Component72 value={be.opacity ?? 80} min={0} max={100} onValueChange={Te => {
                      const Re = Array.isArray(Te) ? Te[0] : Te;
                      const ze = {
                        ...be,
                        opacity: Re
                      };
                      if (_ != null) {
                        _(e.id, ze);
                      }
                    }}><div className="mb-2 flex items-center justify-between gap-1"><Ox className="text-xs text-muted-foreground">{_s("widget.bgOpacity")}</Ox><div className="flex items-center gap-0.5"><Ax className="text-xs text-muted-foreground" /><span className="text-xs text-muted-foreground">%</span></div></div></_Component72></Mx><Mx><_Component72 value={be.blur ?? 12} min={0} max={24} onValueChange={Te => {
                      const Re = Array.isArray(Te) ? Te[0] : Te;
                      const ze = {
                        ...be,
                        blur: Re
                      };
                      if (_ != null) {
                        _(e.id, ze);
                      }
                    }}><div className="mb-2 flex items-center justify-between gap-1"><Ox className="text-xs text-muted-foreground">{_s("widget.bgBlur")}</Ox><div className="flex items-center gap-0.5"><Ax className="text-xs text-muted-foreground" /><span className="text-xs text-muted-foreground">px</span></div></div></_Component72></Mx></B.Fragment>;
              }
            })()}</div></_Component73></_Component74>{!P && <_Component25><An render={<button className={`flex items-center justify-center w-4 h-4 rounded transition-colors ${L ? "text-warning hover:bg-muted" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`} onPointerDown={te => te.stopPropagation()} onClick={ae} />}>{L ? <S5 className="w-2.5 h-2.5" /> : <_5 className="w-2.5 h-2.5" />}</An><Mn side="top">{_s(L ? "widget.unlock" : "widget.lock")}</Mn></_Component25>}<_Component25><An render={<button className="flex items-center justify-center w-4 h-4 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30 disabled:cursor-default" disabled={L} onPointerDown={te => te.stopPropagation()} onClick={oe} />}><Su className="w-2.5 h-2.5" /></An><Mn side="top">{_s("widget.delete")}</Mn></_Component25></div><div className="flex-1 relative min-h-0 overflow-hidden rounded-xl">{n ? <iframe src={X} data-widget-id={e.id} className="absolute inset-0 w-full h-full border-none bg-transparent" style={{
        pointerEvents: o || d ? "none" : "auto"
      }} key={x} /> : <_Component26 app={e.app} statusText="Starting..." compact={Se <= 104} />}<div className="absolute inset-0 z-10 bg-background/70 backdrop-blur-md flex flex-col" style={{
        display: C ? "flex" : "none"
      }}><div ref={N} className="flex-1 bg-background p-1" /></div></div>{!L && (F ? Gz.filter(te => te.id !== "n") : qz).map(te => <div className="absolute z-30" style={{
      ...te.style,
      cursor: te.cursor,
      touchAction: "none"
    }} onPointerDown={be => me(be, te.id)} key={te.id} />)}</div>;
}
function Kz({
  open: e,
  x: n,
  y: r,
  widgetId: i,
  onOpenChange: o,
  onOpenApp: u,
  onRefresh: h,
  onOpenBgSettings: a,
  onRemove: c
}) {
  const {
    t: d
  } = Lr();
  return <_Component24 open={e} onOpenChange={o}><Fo anchor={e ? {
      getBoundingClientRect: () => ({
        x: n,
        y: r,
        width: 0,
        height: 0,
        top: r,
        right: n,
        bottom: r,
        left: n
      })
    } : undefined} side="bottom" align="start" sideOffset={4}><Fn onClick={() => u(i)}><_Component49 aria-hidden="true" />{d("widget.openApp")}</Fn><Fn onClick={() => h(i)}><_Component70 aria-hidden="true" />{d("widget.refresh")}</Fn><Fn onClick={() => a(i)}><M5 aria-hidden="true" />{d("widget.bgSettingsMenu")}</Fn><Fs /><Fn variant="destructive" onClick={() => c(i)}><Su aria-hidden="true" />{d("widget.remove")}</Fn></Fo></_Component24>;
}
const _Component77 = wR;
const Zz = _R;
function Qz({
  className: e,
  ...n
}) {
  return <_Component43 className={pt("fixed inset-0 z-50 bg-black/32 backdrop-blur-sm transition-all duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0", e)} data-slot="dialog-backdrop" {...n} />;
}
function Jz({
  className: e,
  ...n
}) {
  return <SR className={pt("fixed inset-0 z-50 grid grid-rows-[1fr_auto_3fr] justify-items-center p-4", e)} data-slot="dialog-viewport" {...n} />;
}
function Hh({
  className: e,
  children: n,
  showCloseButton: r = true,
  bottomStickOnMobile: i = true,
  closeProps: o,
  portalProps: u,
  ...h
}) {
  return <Zz {...u}><Qz /><Jz className={pt(i && "max-sm:grid-rows-[1fr_auto] max-sm:p-0 max-sm:pt-12")}><_Component44 className={pt("relative row-start-2 flex max-h-full min-h-0 w-full min-w-0 max-w-lg origin-center flex-col rounded-2xl border bg-popover not-dark:bg-clip-padding text-popover-foreground opacity-[calc(1-var(--nested-dialogs))] shadow-lg/5 outline-none transition-[scale,opacity,translate] duration-200 ease-in-out will-change-transform before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:opacity-0 data-starting-style:opacity-0 sm:scale-[calc(1-0.1*var(--nested-dialogs))] sm:data-ending-style:scale-98 sm:data-starting-style:scale-98 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]", i && "max-sm:max-w-none max-sm:origin-bottom max-sm:rounded-none max-sm:border-x-0 max-sm:border-t max-sm:border-b-0 max-sm:data-ending-style:translate-y-4 max-sm:data-starting-style:translate-y-4 max-sm:before:hidden max-sm:before:rounded-none", e)} data-slot="dialog-popup" {...h}>{n}{r && <_Component75 aria-label="Close" className="absolute end-2 top-2" render={<Jn size="icon" variant="ghost" />} {...o}><_Component23 /></_Component75>}</_Component44></Jz></Zz>;
}
function Fh({
  className: e,
  render: n,
  ...r
}) {
  const i = {
    className: pt("flex flex-col gap-2 p-6 in-[[data-slot=dialog-popup]:has([data-slot=dialog-panel])]:pb-3 max-sm:pb-4", e),
    "data-slot": "dialog-header"
  };
  return wu({
    defaultTagName: "div",
    props: Sn(i, r),
    render: n
  });
}
function Uh({
  className: e,
  variant: n = "default",
  render: r,
  ...i
}) {
  const o = {
    className: pt("flex flex-col-reverse gap-2 px-6 sm:flex-row sm:justify-end sm:rounded-b-[calc(var(--radius-2xl)-1px)]", n === "default" && "border-t bg-muted/72 py-4", n === "bare" && "in-[[data-slot=dialog-popup]:has([data-slot=dialog-panel])]:pt-3 pt-4 pb-6", e),
    "data-slot": "dialog-footer"
  };
  return wu({
    defaultTagName: "div",
    props: Sn(o, i),
    render: r
  });
}
function Vh({
  className: e,
  ...n
}) {
  return <SB className={pt("font-heading font-semibold text-xl leading-none", e)} data-slot="dialog-title" {...n} />;
}
function Wh({
  className: e,
  ...n
}) {
  return <_Component76 className={pt("text-muted-foreground text-sm", e)} data-slot="dialog-description" {...n} />;
}
function _Component99({
  className: e,
  scrollFade: n = true,
  render: r,
  ...i
}) {
  const o = {
    className: pt("p-6 in-[[data-slot=dialog-popup]:has([data-slot=dialog-header])]:pt-1 in-[[data-slot=dialog-popup]:has([data-slot=dialog-footer]:not(.border-t))]:pb-1", e),
    "data-slot": "dialog-panel"
  };
  return <VR scrollFade={n}>{wu({
      defaultTagName: "div",
      props: Sn(o, i),
      render: r
    })}</VR>;
}
function _Component109({
  open: e,
  widgetName: n,
  onConfirm: r,
  onCancel: i
}) {
  const {
    t: o
  } = Lr();
  return <_Component77 open={e} onOpenChange={u => !u && i()}><Hh showCloseButton={false} className="sm:max-w-xs z-[400]"><Fh><Vh>{o("widget.removeTitle")}</Vh><Wh>{o("widget.removeDesc", {
            name: n
          })}</Wh></Fh><Uh><Jn variant="outline" onClick={i}>{o("widget.cancel")}</Jn><Jn variant="destructive" onClick={r}>{o("widget.delete")}</Jn></Uh></Hh></_Component77>;
}
const jb = E.createContext(undefined);
function s2() {
  const e = E.useContext(jb);
  if (!e) {
    throw new Error(Bt(73));
  }
  return e;
}
let Lx = 0;
function i2(e) {
  Lx += 1;
  return `${e}-${Math.random().toString(36).slice(2, 6)}-${Lx}`;
}
function Ug(e, n) {
  if (typeof e == "string") {
    return {
      description: e
    };
  }
  if (typeof e == "function") {
    const r = e(n);
    if (typeof r == "string") {
      return {
        description: r
      };
    } else {
      return r;
    }
  }
  return e;
}
function Vg(e) {
  const n = new Map();
  let r = 0;
  let i = 0;
  e.forEach((o, u) => {
    const h = o.transitionStatus === "ending";
    n.set(o.id, {
      value: o,
      domIndex: u,
      visibleIndex: h ? -1 : r,
      offsetY: i
    });
    i += o.height || 0;
    if (!h) {
      r += 1;
    }
  });
  return n;
}
const yf = e => e.toastMetadata;
const Qs = {
  toasts: Me(e => e.toasts),
  isEmpty: Me(e => e.toasts.length === 0),
  toast: Me(yf, (e, n) => {
    var r;
    if ((r = e.get(n)) == null) {
      return undefined;
    } else {
      return r.value;
    }
  }),
  toastIndex: Me(yf, (e, n) => {
    var r;
    return ((r = e.get(n)) == null ? undefined : r.domIndex) ?? -1;
  }),
  toastOffsetY: Me(yf, (e, n) => {
    var r;
    return ((r = e.get(n)) == null ? undefined : r.offsetY) ?? 0;
  }),
  toastVisibleIndex: Me(yf, (e, n) => {
    var r;
    return ((r = e.get(n)) == null ? undefined : r.visibleIndex) ?? -1;
  }),
  hovering: Me(e => e.hovering),
  focused: Me(e => e.focused),
  expanded: Me(e => e.hovering || e.focused),
  expandedOrOutOfFocus: Me(e => e.hovering || e.focused || !e.isWindowFocused),
  prevFocusElement: Me(e => e.prevFocusElement)
};
class tN extends Yl {
  constructor(r) {
    super({
      ...r,
      toastMetadata: Vg(r.toasts)
    }, {}, Qs);
    tt(this, "timers", new Map());
    tt(this, "areTimersPaused", false);
    tt(this, "setViewport", r => {
      this.set("viewport", r);
    });
    tt(this, "disposeEffect", () => () => {
      this.timers.forEach(r => {
        var i;
        if ((i = r.timeout) != null) {
          i.clear();
        }
      });
      this.timers.clear();
    });
    tt(this, "addToast", r => {
      const {
        timeout: i,
        limit: o
      } = this.state;
      const u = r.id || i2("toast");
      if (r.id) {
        const p = Qs.toast(this.state, r.id);
        if (p) {
          if (p.transitionStatus === "ending") {
            this.removeToast(r.id, {
              skipOnRemove: true
            });
          } else {
            const {
              id: f,
              transitionStatus: S,
              ..._
            } = r;
            this.updateToastInternal(r.id, _, {
              resetTimer: true,
              markUpdated: true
            });
            return r.id;
          }
        }
      }
      const h = {
        ...r,
        id: u,
        updateKey: 0,
        transitionStatus: "starting"
      };
      const a = [h, ...this.state.toasts];
      const c = a.filter(p => p.transitionStatus !== "ending");
      if (c.length > o) {
        const p = c.length - o;
        const f = c.slice(-p);
        const S = new Set(f.map(_ => _.id));
        this.setToasts(a.map(_ => {
          const x = S.has(_.id);
          if (_.limited !== x) {
            return {
              ..._,
              limited: x
            };
          } else {
            return _;
          }
        }));
      } else {
        this.setToasts(a.map(p => p.limited ? {
          ...p,
          limited: false
        } : p));
      }
      const d = h.timeout ?? i;
      if (h.type !== "loading" && d > 0) {
        this.scheduleTimer(u, d, () => this.closeToast(u));
      }
      if (Qs.expandedOrOutOfFocus(this.state)) {
        this.pauseTimers();
      }
      return u;
    });
    tt(this, "updateToast", (r, i) => {
      this.updateToastInternal(r, i, {
        markUpdated: true
      });
    });
    tt(this, "updateToastInternal", (r, i, o = {}) => {
      var g;
      var b;
      const {
        timeout: u,
        toasts: h
      } = this.state;
      const a = Qs.toast(this.state, r) ?? null;
      if (!a || a.transitionStatus === "ending") {
        return;
      }
      const c = {
        ...a,
        ...i,
        ...(o.markUpdated && {
          updateKey: (a.updateKey ?? 0) + 1
        })
      };
      this.setToasts(h.map(m => m.id === r ? c : m));
      const d = c.timeout ?? u;
      const p = (a == null ? undefined : a.timeout) ?? u;
      const f = Object.hasOwn(i, "timeout");
      const S = c.transitionStatus !== "ending" && c.type !== "loading" && d > 0;
      const _ = this.timers.has(r);
      const x = p !== d;
      const w = (a == null ? undefined : a.type) === "loading";
      if (!S && _) {
        const m = this.timers.get(r);
        if ((g = m == null ? undefined : m.timeout) != null) {
          g.clear();
        }
        this.timers.delete(r);
        return;
      }
      if (S && (!_ || x || f || w || o.resetTimer)) {
        const m = this.timers.get(r);
        if (m) {
          if ((b = m.timeout) != null) {
            b.clear();
          }
          this.timers.delete(r);
        }
        this.scheduleTimer(r, d, () => this.closeToast(r));
        if (Qs.expandedOrOutOfFocus(this.state)) {
          this.pauseTimers();
        }
      }
    });
    tt(this, "closeToast", r => {
      const i = r === undefined;
      const {
        limit: o,
        toasts: u
      } = this.state;
      let h;
      if (i) {
        h = u;
        this.timers.forEach(p => {
          var f;
          if ((f = p.timeout) != null) {
            f.clear();
          }
        });
        this.timers.clear();
      } else {
        const p = Qs.toast(this.state, r);
        if (!p) {
          return;
        }
        h = [p];
        const f = this.timers.get(r);
        if (f != null && f.timeout) {
          f.timeout.clear();
          this.timers.delete(r);
        }
      }
      let a = 0;
      const c = u.map(p => {
        if (i || p.id === r) {
          return {
            ...p,
            transitionStatus: "ending",
            height: 0
          };
        }
        if (p.transitionStatus === "ending") {
          return p;
        }
        const f = a >= o;
        a += 1;
        if (p.limited !== f) {
          return {
            ...p,
            limited: f
          };
        } else {
          return p;
        }
      });
      const d = {
        toasts: c,
        toastMetadata: Vg(c)
      };
      if (i || u.length === 1) {
        d.hovering = false;
        d.focused = false;
      }
      this.update(d);
      h.forEach(p => {
        var f;
        if (p.transitionStatus !== "ending") {
          if ((f = p.onClose) != null) {
            f.call(p);
          }
        }
      });
      this.handleFocusManagement(r);
    });
    tt(this, "promiseToast", (r, i) => {
      const o = Ug(i.loading);
      const u = this.addToast({
        ...o,
        type: "loading"
      });
      const h = r.then(a => {
        const c = Ug(i.success, a);
        this.updateToast(u, {
          ...c,
          type: "success",
          timeout: c.timeout
        });
        return a;
      }).catch(a => {
        const c = Ug(i.error, a);
        this.updateToast(u, {
          ...c,
          type: "error",
          timeout: c.timeout
        });
        return Promise.reject(a);
      });
      if ({}.hasOwnProperty.call(i, "setPromise")) {
        i.setPromise(h);
      }
      return h;
    });
    tt(this, "handleDocumentPointerDown", r => {
      if (r.pointerType !== "touch") {
        return;
      }
      const i = dn(r);
      if (!Xe(this.state.viewport, i)) {
        this.resumeTimers();
        this.update({
          hovering: false,
          focused: false
        });
      }
    });
  }
  setFocused(r) {
    this.set("focused", r);
  }
  setHovering(r) {
    this.set("hovering", r);
  }
  setIsWindowFocused(r) {
    this.set("isWindowFocused", r);
  }
  setPrevFocusElement(r) {
    this.set("prevFocusElement", r);
  }
  removeToast(r, i = {}) {
    var a;
    const o = Qs.toastIndex(this.state, r);
    if (o === -1) {
      return;
    }
    const u = this.state.toasts[o];
    if (!i.skipOnRemove && (a = u == null ? undefined : u.onRemove) != null) {
      a.call(u);
    }
    const h = [...this.state.toasts];
    h.splice(o, 1);
    this.setToasts(h);
  }
  pauseTimers() {
    if (!this.areTimersPaused) {
      this.areTimersPaused = true;
      this.timers.forEach(r => {
        if (r.timeout) {
          r.timeout.clear();
          const i = Date.now() - r.start;
          const o = r.delay - i;
          r.remaining = o > 0 ? o : 0;
        }
      });
    }
  }
  resumeTimers() {
    if (this.areTimersPaused) {
      this.areTimersPaused = false;
      this.timers.forEach((r, i) => {
        r.remaining = r.remaining > 0 ? r.remaining : r.delay;
        r.timeout ??= $r.create();
        r.timeout.start(r.remaining, () => {
          this.timers.delete(i);
          r.callback();
        });
        r.start = Date.now();
      });
    }
  }
  restoreFocusToPrevElement() {
    var r;
    if ((r = this.state.prevFocusElement) != null) {
      r.focus({
        preventScroll: true
      });
    }
  }
  scheduleTimer(r, i, o) {
    const u = Date.now();
    const h = !Qs.expandedOrOutOfFocus(this.state);
    const a = h ? $r.create() : undefined;
    if (a != null) {
      a.start(i, () => {
        this.timers.delete(r);
        o();
      });
    }
    this.timers.set(r, {
      timeout: a,
      start: h ? u : 0,
      delay: i,
      remaining: i,
      callback: o
    });
  }
  setToasts(r) {
    const i = {
      toasts: r,
      toastMetadata: Vg(r)
    };
    if (r.length === 0) {
      i.hovering = false;
      i.focused = false;
    }
    this.update(i);
  }
  handleFocusManagement(r) {
    var c;
    var d;
    const i = Hn(yt(this.state.viewport));
    if (!this.state.viewport || !Xe(this.state.viewport, i) || !cu(i)) {
      return;
    }
    if (r === undefined) {
      this.restoreFocusToPrevElement();
      return;
    }
    const o = Qs.toasts(this.state);
    const u = Qs.toastIndex(this.state, r);
    let h = null;
    let a = u + 1;
    while (a < o.length) {
      if (o[a].transitionStatus !== "ending") {
        h = o[a];
        break;
      }
      a += 1;
    }
    if (!h) {
      for (a = u - 1; a >= 0;) {
        if (o[a].transitionStatus !== "ending") {
          h = o[a];
          break;
        }
        a -= 1;
      }
    }
    if (h) {
      if ((d = (c = h.ref) == null ? undefined : c.current) != null) {
        d.focus();
      }
    } else {
      this.restoreFocusToPrevElement();
    }
  }
}
const _Component87 = function (n) {
  const {
    children: r,
    timeout: i = 5000,
    limit: o = 3,
    toastManager: u
  } = n;
  const h = sr(() => new tN({
    timeout: i,
    limit: o,
    viewport: null,
    toasts: [],
    hovering: false,
    focused: false,
    isWindowFocused: true,
    prevFocusElement: null
  })).current;
  lh(h.disposeEffect);
  E.useEffect(function () {
    if (u) {
      return u[" subscribe"](({
        action: d,
        options: p
      }) => {
        const f = p.id;
        if (d === "promise" && p.promise) {
          h.promiseToast(p.promise, p);
        } else if (d === "update" && f) {
          h.updateToast(f, p);
        } else if (d === "close") {
          h.closeToast(f);
        } else {
          h.addToast(p);
        }
      });
    } else {
      return undefined;
    }
  }, [h, u]);
  h.useSyncedValues({
    timeout: i,
    limit: o
  });
  return <jb.Provider value={h}>{r}</jb.Provider>;
};
let rN = function (e) {
  e.frontmostHeight = "--toast-frontmost-height";
  return e;
}({});
const _Component84 = E.forwardRef(function (n, r) {
  var q;
  const {
    render: i,
    className: o,
    style: u,
    children: h,
    ...a
  } = n;
  const c = s2();
  const d = xn();
  const p = E.useRef(false);
  const f = E.useRef(false);
  const S = E.useRef(false);
  const _ = c.useState("isEmpty");
  const x = c.useState("toasts");
  const w = c.useState("focused");
  const g = c.useState("expanded");
  const b = c.useState("prevFocusElement");
  const m = ((q = x[0]) == null ? undefined : q.height) ?? 0;
  const v = E.useMemo(() => x.some(U => U.transitionStatus === "ending"), [x]);
  const C = E.useMemo(() => x.filter(U => U.priority === "high"), [x]);
  E.useEffect(() => {
    const U = c.state.viewport;
    if (!U) {
      return;
    }
    function L(P) {
      if (!_) {
        if (P.key === "F6" && dn(P) !== U) {
          P.preventDefault();
          c.setPrevFocusElement(Hn(yt(U)));
          if (U != null) {
            U.focus({
              preventScroll: true
            });
          }
          c.pauseTimers();
          c.setFocused(true);
        }
      }
    }
    const F = fn(U);
    return Tt(F, "keydown", L);
  }, [c, _]);
  E.useEffect(() => {
    const U = c.state.viewport;
    if (!U || _) {
      return;
    }
    const L = fn(U);
    function F(V) {
      if (dn(V) === L) {
        c.setIsWindowFocused(false);
        c.pauseTimers();
      }
    }
    function P(V) {
      if (V.relatedTarget) {
        return;
      }
      const Z = dn(V);
      const J = Hn(yt(U));
      if (Z === L || !Xe(U, Z) || !cu(J)) {
        c.resumeTimers();
      }
      d.start(0, () => c.setIsWindowFocused(true));
    }
    return js(Tt(L, "blur", F, true), Tt(L, "focus", P, true));
  }, [c, d, _]);
  E.useEffect(() => {
    const U = c.state.viewport;
    if (!U || _) {
      return;
    }
    const L = yt(U);
    return Tt(L, "pointerdown", c.handleDocumentPointerDown, true);
  }, [_, c]);
  function T(U) {
    var F;
    var P;
    var V;
    const L = c.state.viewport;
    if (L) {
      p.current = true;
      if (U.relatedTarget === L) {
        if ((V = (P = (F = x[0]) == null ? undefined : F.ref) == null ? undefined : P.current) != null) {
          V.focus();
        }
      } else {
        c.restoreFocusToPrevElement();
      }
    }
  }
  function A(U) {
    if (U.key === "Tab" && U.shiftKey && dn(U.nativeEvent) === c.state.viewport) {
      U.preventDefault();
      c.restoreFocusToPrevElement();
      c.resumeTimers();
    }
  }
  function M() {
    const U = c.state.toasts.some(L => L.transitionStatus === "ending");
    if (!!c.state.isWindowFocused && !U && !S.current && !!f.current) {
      c.resumeTimers();
      c.setHovering(false);
      f.current = false;
    }
  }
  E.useEffect(M, [v, c]);
  function R() {
    c.pauseTimers();
    c.setHovering(true);
    f.current = false;
  }
  function I() {
    if (v || S.current) {
      f.current = true;
    } else {
      c.resumeTimers();
      c.setHovering(false);
    }
  }
  function j(U) {
    if (U.pointerType === "touch") {
      S.current = true;
    }
  }
  function W(U) {
    if (U.pointerType === "touch") {
      S.current = false;
      M();
    }
  }
  function z() {
    if (p.current) {
      p.current = false;
      return;
    }
    if (!w) {
      if (cu(Hn(yt(c.state.viewport)))) {
        c.setFocused(true);
        c.pauseTimers();
      }
    }
  }
  function N(U) {
    if (!!w && !Xe(c.state.viewport, U.relatedTarget)) {
      c.setFocused(false);
      c.resumeTimers();
    }
  }
  const D = {
    tabIndex: -1,
    role: "region",
    "aria-live": "polite",
    "aria-atomic": false,
    "aria-relevant": "additions text",
    "aria-label": "Notifications",
    onMouseEnter: R,
    onMouseMove: R,
    onMouseLeave: I,
    onFocus: z,
    onBlur: N,
    onKeyDown: A,
    onClick: z,
    onPointerDown: j,
    onPointerUp: W,
    onPointerCancel: W
  };
  const $ = {
    expanded: g
  };
  const G = Je("div", n, {
    ref: [r, c.setViewport],
    state: $,
    props: [D, {
      style: {
        [rN.frontmostHeight]: m ? `${m}px` : undefined
      }
    }, a, {
      children: <E.Fragment>{!_ && b && <Hs onFocus={T} />}{h}{!_ && b && <Hs onFocus={T} />}</E.Fragment>
    }]
  });
  return <E.Fragment>{!_ && b && <Hs onFocus={T} />}{G}{!w && C.length > 0 && <div style={Ma}>{C.map(U => <div role="alert" aria-atomic={true} key={U.id}><div>{U.title}</div><div>{U.description}</div></div>)}</div>}</E.Fragment>;
});
const o2 = E.createContext(undefined);
function $h() {
  const e = E.useContext(o2);
  if (!e) {
    throw new Error(Bt(66));
  }
  return e;
}
let ba = function (e) {
  e.index = "--toast-index";
  e.offsetY = "--toast-offset-y";
  e.height = "--toast-height";
  e.swipeMovementX = "--toast-swipe-movement-x";
  e.swipeMovementY = "--toast-swipe-movement-y";
  return e;
}({});
function Px(e, n, r) {
  switch (e) {
    case "up":
      return -r;
    case "down":
      return r;
    case "left":
      return -n;
    case "right":
      return n;
    default:
      return 0;
  }
}
function iN(e) {
  const r = fn(e).getComputedStyle(e).transform;
  let i = 0;
  let o = 0;
  let u = 1;
  if (r && r !== "none") {
    const h = r.match(/matrix(?:3d)?\(([^)]+)\)/);
    if (h) {
      const a = h[1].split(", ").map(parseFloat);
      if (a.length === 6) {
        i = a[4];
        o = a[5];
        u = Math.sqrt(a[0] * a[0] + a[1] * a[1]);
      } else if (a.length === 16) {
        i = a[12];
        o = a[13];
        u = a[0];
      }
    }
  }
  return {
    x: i,
    y: o,
    scale: u
  };
}
const oN = {
  ...xs,
  swipeDirection(e) {
    if (e) {
      return {
        "data-swipe-direction": e
      };
    } else {
      return null;
    }
  }
};
const Kc = 40;
const aN = 10;
const wo = 0.5;
const lN = 1;
const cN = `${W3},${$3}`;
const _Component83 = E.forwardRef(function (n, r) {
  var _e;
  const {
    toast: i,
    render: o,
    className: u,
    swipeDirection: h = ["down", "right"],
    style: a,
    ...c
  } = n;
  const d = ((_e = i.positionerProps) == null ? undefined : _e.anchor) !== undefined;
  let p = [];
  if (!d) {
    p = Array.isArray(h) ? h : [h];
  }
  const f = p.length > 0;
  const S = s2();
  const [_, x] = E.useState(undefined);
  const [w, g] = E.useState(false);
  const [b, m] = E.useState(false);
  const [v, C] = E.useState(false);
  const [T, A] = E.useState({
    x: 0,
    y: 0
  });
  const [M, R] = E.useState({
    x: 0,
    y: 0,
    scale: 1
  });
  const [I, j] = E.useState();
  const [W, z] = E.useState();
  const [N, D] = E.useState(null);
  const $ = E.useRef(null);
  const G = E.useRef({
    x: 0,
    y: 0
  });
  const q = E.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  const U = E.useRef(undefined);
  const L = E.useRef(0);
  const F = E.useRef(false);
  const P = E.useRef({
    x: 0,
    y: 0
  });
  const V = E.useRef(false);
  const Z = E.useRef({
    x: 0,
    y: 0
  });
  const J = E.useRef(null);
  const ne = E.useRef(null);
  const ue = S.useState("toastIndex", i.id);
  const ee = S.useState("toastVisibleIndex", i.id);
  const Y = S.useState("toastOffsetY", i.id);
  const re = S.useState("focused");
  const ce = S.useState("expanded");
  qr({
    open: i.transitionStatus !== "ending",
    ref: $,
    onComplete() {
      if (i.transitionStatus === "ending") {
        S.removeToast(i.id);
      }
    }
  });
  const ge = je((ie = false) => {
    const te = $.current;
    if (!te) {
      return;
    }
    const be = te.style.height;
    te.style.height = "auto";
    const ve = te.offsetHeight;
    te.style.height = be;
    function Te() {
      S.updateToastInternal(i.id, {
        ref: $,
        height: ve,
        ...(i.transitionStatus === "starting" ? {
          transitionStatus: undefined
        } : {})
      });
    }
    if (ie) {
      cs.flushSync(Te);
    } else {
      Te();
    }
  });
  Fe(ge, [ge]);
  function de(ie) {
    Z.current = ie;
    A(ie);
  }
  Fe(() => () => {
    var ie;
    if ((ie = ne.current) != null) {
      ie.abort();
    }
  }, []);
  function me(ie, te) {
    let be = ie;
    let ve = te;
    if (!p.includes("left") && !p.includes("right")) {
      be = ie > 0 ? ie ** wo : -(Math.abs(ie) ** wo);
    } else {
      if (!p.includes("right") && ie > 0) {
        be = ie ** wo;
      }
      if (!p.includes("left") && ie < 0) {
        be = -(Math.abs(ie) ** wo);
      }
    }
    if (!p.includes("up") && !p.includes("down")) {
      ve = te > 0 ? te ** wo : -(Math.abs(te) ** wo);
    } else {
      if (!p.includes("down") && te > 0) {
        ve = te ** wo;
      }
      if (!p.includes("up") && te < 0) {
        ve = -(Math.abs(te) ** wo);
      }
    }
    return {
      x: be,
      y: ve
    };
  }
  const H = je(ie => {
    var Be;
    if (ie.pointerId !== J.current) {
      return;
    }
    J.current = null;
    if ((Be = ne.current) != null) {
      Be.abort();
    }
    ne.current = null;
    g(false);
    m(false);
    D(null);
    const te = q.current;
    if (ie.type === "pointercancel" || F.current) {
      de({
        x: te.x,
        y: te.y
      });
      x(undefined);
      return;
    }
    let be = false;
    const ve = Z.current;
    const Te = ve.x - te.x;
    const Re = ve.y - te.y;
    let ze;
    for (const Ue of p) {
      switch (Ue) {
        case "right":
          if (Te > Kc) {
            be = true;
            ze = "right";
          }
          break;
        case "left":
          if (Te < -Kc) {
            be = true;
            ze = "left";
          }
          break;
        case "down":
          if (Re > Kc) {
            be = true;
            ze = "down";
          }
          break;
        case "up":
          if (Re < -Kc) {
            be = true;
            ze = "up";
          }
          break;
      }
      if (be) {
        break;
      }
    }
    if (be) {
      x(ze);
      C(true);
      S.closeToast(i.id);
    } else {
      de({
        x: te.x,
        y: te.y
      });
      x(undefined);
    }
  });
  function ae(ie) {
    var Te;
    var Re;
    if (ie.button !== 0) {
      return;
    }
    if (ie.pointerType === "touch") {
      S.pauseTimers();
    }
    const te = dn(ie.nativeEvent);
    if (te ? te.closest(`button,a,input,textarea,[role="button"],${cN}`) : false) {
      return;
    }
    F.current = false;
    U.current = undefined;
    L.current = 0;
    J.current = ie.pointerId;
    G.current = {
      x: ie.clientX,
      y: ie.clientY
    };
    P.current = G.current;
    if ($.current) {
      const ze = iN($.current);
      q.current = ze;
      R(ze);
      de({
        x: ze.x,
        y: ze.y
      });
    }
    S.setHovering(true);
    g(true);
    m(false);
    D(null);
    V.current = true;
    const ve = $.current;
    if (ve) {
      if ((Te = ne.current) != null) {
        Te.abort();
      }
      const ze = new AbortController();
      ne.current = ze;
      const Be = yt(ve);
      Be.addEventListener("pointerup", H, {
        signal: ze.signal
      });
      Be.addEventListener("pointercancel", H, {
        signal: ze.signal
      });
      if ((Re = ve.setPointerCapture) != null) {
        Re.call(ve, ie.pointerId);
      }
    }
  }
  function oe(ie) {
    if (ie.pointerId !== J.current) {
      return;
    }
    ie.preventDefault();
    if (V.current) {
      G.current = {
        x: ie.clientX,
        y: ie.clientY
      };
      V.current = false;
    }
    const {
      clientY: te,
      clientX: be,
      movementX: ve,
      movementY: Te
    } = ie;
    if (Te < 0 && te > P.current.y || Te > 0 && te < P.current.y) {
      P.current = {
        x: P.current.x,
        y: te
      };
    }
    if (ve < 0 && be > P.current.x || ve > 0 && be < P.current.x) {
      P.current = {
        x: be,
        y: P.current.y
      };
    }
    const Re = be - G.current.x;
    const ze = te - G.current.y;
    const Be = te - P.current.y;
    const Ue = be - P.current.x;
    if (!b && Math.sqrt(Re * Re + ze * ze) >= lN && (m(true), N === null)) {
      const kt = p.includes("left") || p.includes("right");
      const Ge = p.includes("up") || p.includes("down");
      if (kt && Ge) {
        const Ye = Math.abs(Re);
        const Qe = Math.abs(ze);
        D(Ye > Qe ? "horizontal" : "vertical");
      }
    }
    let We;
    if (!U.current) {
      if (N === "vertical") {
        if (ze > 0) {
          We = "down";
        } else if (ze < 0) {
          We = "up";
        }
      } else if (N === "horizontal") {
        if (Re > 0) {
          We = "right";
        } else if (Re < 0) {
          We = "left";
        }
      } else if (Math.abs(Re) >= Math.abs(ze)) {
        We = Re > 0 ? "right" : "left";
      } else {
        We = ze > 0 ? "down" : "up";
      }
      if (We && p.includes(We)) {
        U.current = We;
        L.current = Px(We, Re, ze);
        x(We);
      }
    } else {
      const Dt = U.current;
      const kt = Px(Dt, Ue, Be);
      if (kt > Kc) {
        F.current = false;
        x(Dt);
      } else if ((!p.includes("left") || !p.includes("right")) && (!p.includes("up") || !p.includes("down")) && L.current - kt >= aN) {
        F.current = true;
      }
    }
    const lt = me(Re, ze);
    let dt = q.current.x;
    let _t = q.current.y;
    if (N === "horizontal") {
      if (p.includes("left") || p.includes("right")) {
        dt += lt.x;
      }
    } else {
      if (N !== "vertical") {
        if (p.includes("left") || p.includes("right")) {
          dt += lt.x;
        }
      }
      if (p.includes("up") || p.includes("down")) {
        _t += lt.y;
      }
    }
    de({
      x: dt,
      y: _t
    });
  }
  function X(ie) {
    if (ie.key === "Escape") {
      if (!$.current || !Xe($.current, Hn(yt($.current)))) {
        return;
      }
      S.closeToast(i.id);
    }
  }
  E.useEffect(() => {
    if (!f) {
      return;
    }
    const ie = $.current;
    if (!ie) {
      return;
    }
    function te(be) {
      if (Xe(ie, dn(be))) {
        be.preventDefault();
      }
    }
    return Tt(ie, "touchmove", te, {
      passive: false
    });
  }, [f]);
  function Q() {
    if (!w && T.x === M.x && T.y === M.y && !v) {
      return {
        [ba.swipeMovementX]: "0px",
        [ba.swipeMovementY]: "0px"
      };
    }
    const ie = T.x - M.x;
    const te = T.y - M.y;
    return {
      transition: w ? "none" : undefined,
      transform: w ? `translateX(${T.x}px) translateY(${T.y}px) scale(${M.scale})` : undefined,
      [ba.swipeMovementX]: `${ie}px`,
      [ba.swipeMovementY]: `${te}px`
    };
  }
  const se = i.priority === "high";
  const he = {
    role: se ? "alertdialog" : "dialog",
    tabIndex: 0,
    "aria-modal": false,
    "aria-labelledby": I,
    "aria-describedby": W,
    "aria-hidden": se && !re ? true : undefined,
    onPointerDown: f ? ae : undefined,
    onPointerMove: f ? oe : undefined,
    onPointerUp: f ? H : undefined,
    onPointerCancel: f ? H : undefined,
    onKeyDown: X,
    inert: Kl(i.limited),
    style: {
      ...Q(),
      [ba.index]: i.transitionStatus === "ending" ? ue : ee,
      [ba.offsetY]: `${Y}px`,
      [ba.height]: i.height ? `${i.height}px` : undefined
    }
  };
  const ye = E.useMemo(() => ({
    rootRef: $,
    toast: i,
    titleId: I,
    setTitleId: j,
    descriptionId: W,
    setDescriptionId: z,
    swiping: w,
    swipeDirection: _,
    recalculateHeight: ge,
    index: ue,
    visibleIndex: ee,
    expanded: ce
  }), [i, I, W, w, _, ge, ue, ee, ce]);
  const pe = {
    transitionStatus: i.transitionStatus,
    expanded: ce,
    limited: i.limited || false,
    type: i.type,
    swiping: ye.swiping,
    swipeDirection: ye.swipeDirection
  };
  const Se = Je("div", n, {
    ref: [r, ye.rootRef],
    state: pe,
    stateAttributesMapping: oN,
    props: [he, c]
  });
  return <o2.Provider value={ye}>{Se}</o2.Provider>;
});
const _Component82 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    ...h
  } = n;
  const {
    visibleIndex: a,
    expanded: c,
    recalculateHeight: d
  } = $h();
  const p = E.useRef(null);
  Fe(() => {
    const x = p.current;
    if (!x || (d(), typeof ResizeObserver != "function" || typeof MutationObserver != "function")) {
      return;
    }
    const w = new ResizeObserver(() => d(true));
    const g = new MutationObserver(() => d(true));
    w.observe(x);
    g.observe(x, {
      childList: true,
      subtree: true,
      characterData: true
    });
    return () => {
      w.disconnect();
      g.disconnect();
    };
  }, [d]);
  const f = a > 0;
  return Je("div", n, {
    ref: [r, p],
    state: {
      expanded: c,
      behind: f
    },
    props: h
  });
});
const _Component80 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    id: h,
    children: a,
    ...c
  } = n;
  const {
    toast: d,
    setDescriptionId: p
  } = $h();
  const f = a ?? d.description;
  const S = !!f;
  const _ = $i(h);
  Fe(() => {
    if (S) {
      p(_);
      return () => {
        p(undefined);
      };
    }
  }, [S, _, p]);
  const x = {
    type: d.type
  };
  const w = Je("p", n, {
    ref: r,
    state: x,
    props: {
      ...c,
      id: _,
      children: f
    }
  });
  if (S) {
    return w;
  } else {
    return null;
  }
});
const _Component79 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    id: h,
    children: a,
    ...c
  } = n;
  const {
    toast: d,
    setTitleId: p
  } = $h();
  const f = a ?? d.title;
  const S = !!f;
  const _ = $i(h);
  Fe(() => {
    if (S) {
      p(_);
      return () => {
        p(undefined);
      };
    }
  }, [S, _, p]);
  const x = {
    type: d.type
  };
  const w = Je("h2", n, {
    ref: r,
    state: x,
    props: {
      ...c,
      id: _,
      children: f
    }
  });
  if (S) {
    return w;
  } else {
    return null;
  }
});
const _Component81 = E.forwardRef(function (n, r) {
  var g;
  const {
    render: i,
    className: o,
    style: u,
    disabled: h,
    nativeButton: a = true,
    ...c
  } = n;
  const {
    toast: d
  } = $h();
  const p = ((g = d.actionProps) == null ? undefined : g.children) ?? c.children;
  const f = !!p;
  const {
    getButtonProps: S,
    buttonRef: _
  } = Es({
    disabled: h,
    native: a
  });
  const x = {
    type: d.type
  };
  const w = Je("button", n, {
    ref: [r, _],
    state: x,
    props: [c, d.actionProps, S, {
      children: p
    }]
  });
  if (f) {
    return w;
  } else {
    return null;
  }
});
const _Component85 = AE;
function gN() {
  const e = E.useContext(jb);
  if (!e) {
    throw new Error(Bt(73));
  }
  const n = e.useState("toasts");
  return E.useMemo(() => ({
    toasts: n,
    add: e.addToast,
    close: e.closeToast,
    update: e.updateToast,
    promise: e.promiseToast
  }), [n, e]);
}
function vN() {
  const e = new Set();
  function n(r) {
    e.forEach(i => i(r));
  }
  return {
    " subscribe": function (i) {
      e.add(i);
      return () => {
        e.delete(i);
      };
    },
    add(r) {
      const i = r.id || i2("toast");
      const o = {
        ...r,
        id: i,
        transitionStatus: "starting"
      };
      n({
        action: "add",
        options: o
      });
      return i;
    },
    close(r) {
      n({
        action: "close",
        options: {
          id: r
        }
      });
    },
    update(r, i) {
      n({
        action: "update",
        options: {
          ...i,
          id: r
        }
      });
    },
    promise(r, i) {
      let o = r;
      n({
        action: "promise",
        options: {
          ...i,
          promise: r,
          setPromise(u) {
            o = u;
          }
        }
      });
      return o;
    }
  };
}
const bN = {
  error: e5,
  info: Hv,
  loading: _Component,
  success: n5,
  warning: H5
};
function yN(e) {
  const n = e.startsWith("top") ? "up" : "down";
  if (e.includes("center")) {
    return [n];
  } else if (e.includes("left")) {
    return ["left", n];
  } else {
    return ["right", n];
  }
}
function _N(e) {
  const n = e.updateKey ?? 0;
  if (n <= 0) {
    return;
  }
  const r = n % 2 === 0;
  if (e.type === "error") {
    if (r) {
      return "animate-toast-error-even";
    } else {
      return "animate-toast-error-odd";
    }
  } else if (r) {
    return "animate-toast-success-even";
  } else {
    return "animate-toast-success-odd";
  }
}
function _Component86({
  position: e,
  portalProps: n
}) {
  const {
    toasts: r
  } = gN();
  const i = yN(e);
  return <_Component85 data-slot="toast-portal" {...n}><_Component84 className={pt("fixed z-60 mx-auto flex w-[calc(100%-var(--toast-inset)*2)] max-w-90 [--toast-inset:--spacing(4)] sm:[--toast-inset:--spacing(8)]", "data-[position*=top]:top-(--toast-inset)", "data-[position*=bottom]:bottom-(--toast-inset)", "data-[position*=left]:left-(--toast-inset)", "data-[position*=right]:right-(--toast-inset)", "data-[position*=center]:left-1/2 data-[position*=center]:-translate-x-1/2")} data-position={e} data-slot="toast-viewport">{r.map(o => {
        const _Component78 = o.type ? bN[o.type] : null;
        const h = o.data;
        return <_Component83 className={pt("absolute z-[calc(9999-var(--toast-index))] h-(--toast-calc-height) w-full select-none rounded-lg border bg-[color-mix(in_srgb,var(--popover),var(--color-black)_calc(1%*max(0,var(--toast-index,0))))] not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 [transition:transform_.5s_cubic-bezier(.22,1,.36,1),opacity_.5s,height_.15s,background-color_.5s] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-expanded:bg-popover dark:bg-[color-mix(in_srgb,var(--popover),var(--color-black)_calc(6%*max(0,var(--toast-index,0))))] dark:data-expanded:bg-popover dark:before:shadow-[0_-1px_--theme(--color-white/6%)]", "data-[position*=right]:right-0 data-[position*=right]:left-auto", "data-[position*=left]:right-auto data-[position*=left]:left-0", "data-[position*=center]:right-0 data-[position*=center]:left-0", "data-[position*=top]:top-0 data-[position*=top]:bottom-auto data-[position*=top]:origin-[50%_calc(50%-50%*min(var(--toast-index,0),1))]", "data-[position*=bottom]:top-auto data-[position*=bottom]:bottom-0 data-[position*=bottom]:origin-[50%_calc(50%+50%*min(var(--toast-index,0),1))]", "after:absolute after:left-0 after:h-[calc(var(--toast-gap)+1px)] after:w-full", "data-[position*=top]:after:top-full", "data-[position*=bottom]:after:bottom-full", "[--toast-calc-height:var(--toast-frontmost-height,var(--toast-height))] [--toast-gap:--spacing(3)] [--toast-peek:--spacing(3)] [--toast-scale:calc(max(0,1-(var(--toast-index)*.1)))] [--toast-shrink:calc(1-var(--toast-scale))]", "data-[position*=top]:[--toast-calc-offset-y:calc(var(--toast-offset-y)+var(--toast-index)*var(--toast-gap)+var(--toast-swipe-movement-y))]", "data-[position*=bottom]:[--toast-calc-offset-y:calc(var(--toast-offset-y)*-1+var(--toast-index)*var(--toast-gap)*-1+var(--toast-swipe-movement-y))]", "data-[position*=top]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)+(var(--toast-index)*var(--toast-peek))+(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]", "data-[position*=bottom]:transform-[translateX(var(--toast-swipe-movement-x))_translateY(calc(var(--toast-swipe-movement-y)-(var(--toast-index)*var(--toast-peek))-(var(--toast-shrink)*var(--toast-calc-height))))_scale(var(--toast-scale))]", "data-limited:opacity-0", "data-expanded:h-(--toast-height)", "data-position:data-expanded:transform-[translateX(var(--toast-swipe-movement-x))_translateY(var(--toast-calc-offset-y))]", "data-[position*=top]:data-starting-style:transform-[translateY(calc(-100%-var(--toast-inset)))]", "data-[position*=bottom]:data-starting-style:transform-[translateY(calc(100%+var(--toast-inset)))]", "data-ending-style:opacity-0", "data-ending-style:not-data-limited:not-data-swipe-direction:transform-[translateY(calc(100%+var(--toast-inset)))]", "data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]", "data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]", "data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]", "data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]", "data-expanded:data-ending-style:data-[swipe-direction=left]:transform-[translateX(calc(var(--toast-swipe-movement-x)-100%-var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]", "data-expanded:data-ending-style:data-[swipe-direction=right]:transform-[translateX(calc(var(--toast-swipe-movement-x)+100%+var(--toast-inset)))_translateY(var(--toast-calc-offset-y))]", "data-expanded:data-ending-style:data-[swipe-direction=up]:transform-[translateY(calc(var(--toast-swipe-movement-y)-100%-var(--toast-inset)))]", "data-expanded:data-ending-style:data-[swipe-direction=down]:transform-[translateY(calc(var(--toast-swipe-movement-y)+100%+var(--toast-inset)))]", _N(o))} {...h == null ? undefined : h.rootProps} data-position={e} swipeDirection={i} toast={o} key={o.id}><_Component82 className="pointer-events-auto flex items-center justify-between gap-1.5 overflow-hidden px-3.5 py-3 text-sm transition-opacity duration-250 data-behind:not-data-expanded:pointer-events-none data-behind:opacity-0 data-expanded:opacity-100"><div className="flex gap-2">{_Component78 && <div className="[&>svg]:h-lh [&>svg]:w-4 [&_svg]:pointer-events-none [&_svg]:shrink-0" data-slot="toast-icon"><_Component78 className="in-data-[type=loading]:animate-spin in-data-[type=error]:text-destructive in-data-[type=info]:text-info in-data-[type=success]:text-success in-data-[type=warning]:text-warning in-data-[type=loading]:opacity-80" /></div>}<div className="flex flex-col gap-0.5"><_Component79 className="font-medium" data-slot="toast-title" /><_Component80 className="text-muted-foreground" data-slot="toast-description" /></div></div>{o.actionProps && <_Component81 className={wC({
              size: "xs"
            })} data-slot="toast-action">{o.actionProps.children}</_Component81>}</_Component82></_Component83>;
      })}</_Component84></_Component85>;
}
const jn = vN();
function SN({
  children: e,
  position: n = "bottom-right",
  portalProps: r,
  ...i
}) {
  return <_Component87 toastManager={jn} {...i}>{e}<_Component86 portalProps={r} position={n} /></_Component87>;
}
const _f = "home";
const xN = _s("workspace.home");
function CN() {
  const [e, n] = E.useState(new Map());
  const [r, i] = E.useState(_f);
  const [o, u] = E.useState(false);
  const h = E.useRef(false);
  E.useEffect(() => {
    if (!h.current) {
      h.current = true;
      zO().then(f => {
        if (f.size === 0) {
          const S = {
            id: _f,
            name: xN,
            type: "home",
            createdAt: Date.now()
          };
          mg(S);
          f.set(S.id, S);
        }
        n(f);
        UO().then(S => {
          if (S && f.has(S)) {
            i(S);
          }
          u(true);
        });
      });
    }
  }, []);
  const a = E.useCallback(async f => {
    const S = `ws-${Date.now()}`;
    const _ = {
      id: S,
      name: f || _s("workspace.defaultName", {
        number: e.size + 1
      }),
      type: "regular",
      createdAt: Date.now()
    };
    await mg(_);
    n(x => {
      const w = new Map(x);
      w.set(S, _);
      return w;
    });
    return S;
  }, [e.size]);
  const c = E.useCallback(async (f, S) => {
    n(_ => {
      const x = new Map(_);
      const w = x.get(f);
      if (w) {
        const g = {
          ...w,
          name: S
        };
        x.set(f, g);
        mg(g);
      }
      return x;
    });
  }, []);
  const d = E.useCallback(async f => {
    if (f !== _f) {
      await NO(f);
      n(S => {
        const _ = new Map(S);
        _.delete(f);
        return _;
      });
    }
  }, []);
  const p = E.useCallback(f => {
    i(f);
    FO(f);
  }, []);
  return {
    workspaces: e,
    activeWorkspaceId: r,
    loaded: o,
    createWorkspace: a,
    renameWorkspace: c,
    deleteWorkspace: d,
    switchWorkspace: p,
    HOME_ID: _f
  };
}
const Wg = {
  type: "default",
  data: null,
  mimeType: null,
  overlay: null,
  overlayOpacity: 0,
  blur: 0
};
function EN(e) {
  const [n, r] = E.useState(Wg);
  const [i, o] = E.useState(null);
  const u = E.useRef(null);
  const h = E.useRef(null);
  const a = E.useCallback(() => {
    if (h.current) {
      URL.revokeObjectURL(h.current);
    }
    h.current = null;
    o(null);
  }, []);
  E.useEffect(() => () => {
    if (h.current) {
      URL.revokeObjectURL(h.current);
    }
  }, []);
  const c = E.useCallback(f => {
    if (h.current) {
      URL.revokeObjectURL(h.current);
    }
    const S = URL.createObjectURL(f);
    h.current = S;
    o(S);
    return S;
  }, []);
  E.useEffect(() => {
    if (e && u.current !== e) {
      u.current = e;
      rv(e).then(f => {
        if (f) {
          r(f);
          if (f.type !== "default" && f.data) {
            c(f.data);
          } else {
            a();
          }
        } else {
          r(Wg);
          a();
        }
      });
    }
  }, [e, c, a]);
  const d = E.useCallback(async f => {
    if (!e) {
      return;
    }
    const S = {
      workspaceId: e,
      ...f
    };
    await S1(S);
    r(S);
    if (f.type !== "default" && f.data) {
      c(f.data);
    } else {
      a();
    }
  }, [e, c, a]);
  const p = E.useCallback(async () => {
    if (e) {
      await sv(e);
      r(Wg);
      a();
    }
  }, [e, a]);
  return {
    wallpaper: n,
    wallpaperBlobUrl: i,
    saveWallpaper: d,
    resetWallpaper: p,
    isDefault: n.type === "default"
  };
}
function RN(e) {
  const n = e.split(".").pop().toLowerCase();
  return {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    webp: "image/webp",
    ico: "image/x-icon",
    bmp: "image/bmp"
  }[n] || "application/octet-stream";
}
async function TN(e, n) {
  const r = e.file(n);
  if (!r) {
    return null;
  }
  const i = await r.async("uint8array");
  const o = RN(n);
  const u = new Blob([i], {
    type: o
  });
  return new Promise(h => {
    const a = new FileReader();
    a.onloadend = () => h(a.result);
    a.onerror = () => h(null);
    a.readAsDataURL(u);
  });
}
async function kN(e) {
  let n = 0;
  for (const [r, i] of Object.entries(e.files)) {
    if (!i.dir) {
      const o = await i.async("uint8array");
      n += o.byteLength;
    }
  }
  return n;
}
async function a2(e) {
  const n = await nu.loadAsync(e);
  const r = n.file("package.json");
  if (!r) {
    return {
      valid: false,
      error: "ZIP 中未找到 package.json"
    };
  }
  let i;
  try {
    const c = await r.async("text");
    i = JSON.parse(c);
  } catch {
    return {
      valid: false,
      error: "package.json 格式错误：不是有效的 JSON"
    };
  }
  if (!i.jsos) {
    return {
      valid: false,
      error: "package.json 中未找到 jsos 配置字段"
    };
  }
  const o = {
    ...i,
    ...i.jsos,
    name: i.jsos.name || i.name,
    version: i.jsos.version || i.version
  };
  const u = typeof o.name == "string" ? !!o.name : typeof o.name == "object" && o.name !== null && Object.keys(o.name).length > 0;
  if (!o.id || !u) {
    return {
      valid: false,
      error: "清单缺少必要字段：id 和 name 是必须的"
    };
  }
  if (!o.startCommand) {
    return {
      valid: false,
      error: "清单缺少启动命令 (startCommand)"
    };
  }
  if (o.icon) {
    if (o.icon.startsWith("http://") || o.icon.startsWith("https://")) {
      return {
        valid: false,
        error: "不支持网络图标，请使用 data URI 或应用包内的本地文件"
      };
    }
    if (!o.icon.startsWith("data:")) {
      if (!n.file(o.icon)) {
        return {
          valid: false,
          error: `图标文件 "${o.icon}" 不存在于应用包中`
        };
      }
      const d = await TN(n, o.icon);
      if (d) {
        o.icon = d;
      } else {
        return {
          valid: false,
          error: `图标文件 "${o.icon}" 读取失败`
        };
      }
    }
  }
  const h = await kN(n);
  const a = Object.values(n.files).filter(c => !c.dir).length;
  return {
    valid: true,
    manifest: o,
    fileSize: h,
    fileCount: a,
    zipData: new Uint8Array(e)
  };
}
function AN(e, n) {
  const r = (e || "0.0.0").split(".").map(Number);
  const i = (n || "0.0.0").split(".").map(Number);
  for (let o = 0; o < 3; o++) {
    if ((r[o] || 0) > (i[o] || 0)) {
      return 1;
    }
    if ((r[o] || 0) < (i[o] || 0)) {
      return -1;
    }
  }
  return 0;
}
async function Bx(e, n) {
  switch (e.type) {
    case "notify":
      return await MN(e.payload);
    case "toast":
      return ON(e.payload);
    case "getApps":
      return DN(n);
    case "getAppInfo":
      return await IN(e.payload, n);
    case "openApp":
      return await LN(e.payload, n);
    case "closeApp":
      return PN(e.payload, n);
    case "closeAppWindow":
      return BN(e.payload, n);
    case "isAppRunning":
      return zN(e.payload, n);
    case "openAppWithArgs":
      return await NN(e.payload, n);
    case "terminal.spawn":
      return await jsTerminalSpawn(e.payload, n);
    case "getWorkspaces":
      return jN(n);
    case "getCurrentWorkspace":
      return HN(n);
    case "switchWorkspace":
      return FN(e.payload, n);
    case "createWorkspace":
      return await UN(e.payload, n);
    case "deleteWorkspace":
      return await VN(e.payload, n);
    case "renameWorkspace":
      return await WN(e.payload, n);
    case "getWallpaper":
      return await GN(e.payload, n);
    case "setWallpaper":
      return await YN(e.payload, n);
    case "resetWallpaper":
      return await XN(e.payload, n);
    case "getLocale":
      return KN(n);
    case "setLocale":
      return ZN(e.payload, n);
    case "getDockSettings":
      return QN(n);
    case "setDockSettings":
      return JN(e.payload, n);
    case "getTerminalBgSettings":
      return ej(n);
    case "setTerminalBgSettings":
      return await tj(e.payload, n);
    case "getTheme":
      return rj(n);
    case "getThemeMode":
      return nj(n);
    case "setTheme":
      return await sj(e.payload, n);
    case "parseZip":
      return await ij(e.payload, n);
    case "installApp":
      return await oj(e.payload, n);
    case "uninstallApp":
      return await aj(e.payload, n);
    case "fetchAppAsset":
      return await jsFetchAppAsset(e.payload);
    case "addWidget":
      return await lj(e.payload, n);
    case "getProxyConfig":
      return await fj();
    case "setProxyConfig":
      return await hj(e.payload);
    case "deleteProxyConfig":
      return await pj();
    case "proxyFetch":
      return await mj(e.payload);
    case "exportAllData":
      return await uj();
    case "importAllData":
      return await dj(e.payload);
    case "restart":
      return bj();
    case "clearAllData":
      return await yj();
    case "getSystemInfo":
      return gj(n);
    case "getStorageInfo":
      return await vj();
    default:
      return {
        error: `Unknown API: ${e.type}`
      };
  }
}
async function MN({
  title: e,
  body: n,
  icon: r
}) {
  if (!e) {
    return {
      error: "title is required"
    };
  }
  if (!("Notification" in window)) {
    return {
      error: "Notifications not supported"
    };
  }
  if (Notification.permission === "granted") {
    try {
      new Notification(e, {
        body: n,
        icon: r
      });
      return {
        result: true
      };
    } catch (i) {
      return {
        error: i.message
      };
    }
  }
  if (Notification.permission !== "denied") {
    try {
      if ((await Notification.requestPermission()) === "granted") {
        new Notification(e, {
          body: n,
          icon: r
        });
        return {
          result: true
        };
      } else {
        return {
          error: "Permission denied"
        };
      }
    } catch (i) {
      return {
        error: i.message
      };
    }
  }
  return {
    error: "Notification permission denied"
  };
}
function ON({
  title: e,
  description: n,
  type: r = "default",
  timeout: i = 3000
}) {
  if (e) {
    window.dispatchEvent(new CustomEvent("jsos-toast", {
      detail: {
        title: e,
        description: n,
        type: r,
        timeout: i
      }
    }));
    return {
      result: true
    };
  } else {
    return {
      error: "title is required"
    };
  }
}
function DN(e) {
  const {
    installedApps: n,
    isAppRunning: r
  } = e;
  const i = e.getLocale();
  const o = [];
  n.forEach((u, h) => {
    const a = u.widgets ? u.widgets.map(c => ({
      ...c,
      name: rn(c.name, i),
      description: rn(c.description, i)
    })) : null;
    o.push({
      id: h,
      name: rn(u.name, i),
      icon: u.icon || null,
      version: u.version || "1.0.0",
      type: u.type || "gui",
      isSystem: u.isSystem || false,
      isRunning: r(h),
      widgets: a
    });
  });
  return {
    result: o
  };
}
async function IN(e, n) {
  const {
    appId: r
  } = e;
  const {
    installedApps: i,
    getServerInfo: o,
    isAppRunning: u,
    wc: h
  } = n;
  if (!i.has(r)) {
    return {
      error: "App not found"
    };
  }
  const a = i.get(r);
  const c = o(r);
  const d = u(r);
  const p = n.getLocale();
  const f = a.widgets ? a.widgets.map(x => ({
    ...x,
    name: rn(x.name, p),
    description: rn(x.description, p)
  })) : null;
  let S = false;
  let _ = false;
  if (h) {
    try {
      await h.fs.readdir(`workspace/apps/${r}`);
      S = true;
    } catch {}
    try {
      await h.fs.readdir(`workspace/data/${r}`);
      _ = true;
    } catch {}
  }
  return {
    result: {
      id: r,
      name: rn(a.name, p),
      description: rn(a.description, p) || null,
      icon: a.icon || null,
      version: a.version || "1.0.0",
      type: a.type || "gui",
      isSystem: a.isSystem || false,
      port: (c == null ? undefined : c.port) ?? null,
      isRunning: d,
      serverUrl: (c == null ? undefined : c.serverUrl) ?? null,
      installedAt: a.installedAt || null,
      defaultWidth: a.defaultWidth ?? 900,
      defaultHeight: a.defaultHeight ?? 600,
      widgets: f,
      author: a.author || null,
      contributors: a.contributors || null,
      repository: a.repository || null,
      bugs: a.bugs || null,
      appDir: n.workdir ? `${n.workdir}/workspace/apps/${r}` : null,
      dataDir: n.workdir ? `${n.workdir}/workspace/data/${r}` : null,
      sourceDirExists: S,
      dataDirExists: _
    }
  };
}
async function LN(e, n) {
  const {
    appId: r,
    route: i,
    params: o
  } = e;
  const {
    installedApps: u,
    launchApp: h
  } = n;
  if (!u.has(r)) {
    return {
      error: "App not found"
    };
  }
  try {
    return {
      result: {
        success: true,
        windowId: await h(r, {
          route: i,
          params: o
        })
      }
    };
  } catch (a) {
    return {
      result: {
        success: false,
        error: a.message
      }
    };
  }
}
function PN(e, n) {
  const {
    appId: r
  } = e;
  const {
    installedApps: i,
    closeApp: o,
    closeWindow: u,
    getServerInfo: h
  } = n;
  if (!i.has(r)) {
    return {
      error: "App not found"
    };
  }
  try {
    const a = h(r);
    if (a) {
      for (const c of a.windows) {
        o(r, c);
        u(c);
      }
    }
    return {
      result: {
        success: true
      }
    };
  } catch (a) {
    return {
      result: {
        success: false,
        error: a.message
      }
    };
  }
}
function BN(e, n) {
  const {
    callingWindowId: r,
    getWindowAppId: i,
    closeApp: o,
    closeWindow: u
  } = n;
  if (!r) {
    return {
      error: "Cannot identify calling window"
    };
  }
  const h = i(r);
  if (!h) {
    return {
      error: "Window not found"
    };
  }
  try {
    o(h, r);
    u(r);
    return {
      result: {
        success: true
      }
    };
  } catch (a) {
    return {
      result: {
        success: false,
        error: a.message
      }
    };
  }
}
function zN(e, n) {
  const {
    appId: r
  } = e;
  const {
    isAppRunning: i
  } = n;
  return {
    result: {
      running: i(r)
    }
  };
}
async function NN(e, n) {
  const {
    appId: r,
    startCommand: i,
    env: o
  } = e;
  const {
    installedApps: u,
    launchApp: h
  } = n;
  if (!u.has(r)) {
    return {
      error: "App not found"
    };
  }
  try {
    return {
      result: {
        success: true,
        windowId: await h(r, {
          startCommand: i,
          env: o
        })
      }
    };
  } catch (a) {
    return {
      result: {
        success: false,
        error: a.message
      }
    };
  }
}
// [jsos-local-terminal-spawn] 支持 window.JSOS.terminal.spawn：在调用者窗口自带的终端面板中执行命令
const jsSpawnProcesses = new Map(); // 面板 tab key -> WebContainer 进程（关闭 tab 时终止）
async function jsTerminalSpawn(e, n) {
  const { command: r, args: i = [], cwd: u } = e || {};
  if (!r) {
    return {
      error: "command is required"
    };
  }
  const o = n.callingWindowId;
  if (!o || !n.jsSpawnInPanel) {
    return {
      result: {
        success: false,
        error: "calling window not found"
      }
    };
  }
  return await n.jsSpawnInPanel(o, {
    command: r,
    args: i,
    cwd: u
  });
}
function jN(e) {
  const {
    workspaces: n
  } = e;
  const r = [];
  n.forEach(i => {
    r.push({
      id: i.id,
      name: i.name,
      type: i.type
    });
  });
  r.sort((i, o) => {
    const u = n.get(i.id);
    const h = n.get(o.id);
    return ((u == null ? undefined : u.createdAt) || 0) - ((h == null ? undefined : h.createdAt) || 0);
  });
  return {
    result: r
  };
}
function HN(e) {
  const {
    workspaces: n,
    activeWorkspaceId: r
  } = e;
  const i = n.get(r);
  if (i) {
    return {
      result: {
        id: i.id,
        name: i.name,
        type: i.type
      }
    };
  } else {
    return {
      error: "Active workspace not found"
    };
  }
}
function FN(e, n) {
  const {
    id: r
  } = e;
  const {
    workspaces: i,
    switchWorkspace: o
  } = n;
  if (!i.has(r)) {
    return {
      error: "Workspace not found"
    };
  }
  try {
    o(r);
    return {
      result: {
        success: true
      }
    };
  } catch (u) {
    return {
      result: {
        success: false,
        error: u.message
      }
    };
  }
}
async function UN(e, n) {
  const {
    name: r
  } = e;
  const {
    createWorkspace: i
  } = n;
  try {
    return {
      result: {
        id: await i(r),
        success: true
      }
    };
  } catch (o) {
    return {
      result: {
        success: false,
        error: o.message
      }
    };
  }
}
async function VN(e, n) {
  const {
    id: r
  } = e;
  const {
    workspaces: i,
    deleteWorkspace: o
  } = n;
  if (!i.has(r)) {
    return {
      error: "Workspace not found"
    };
  }
  if (i.get(r).type === "home") {
    return {
      error: "Cannot delete home workspace"
    };
  }
  try {
    await o(r);
    return {
      result: {
        success: true
      }
    };
  } catch (h) {
    return {
      result: {
        success: false,
        error: h.message
      }
    };
  }
}
async function WN(e, n) {
  const {
    id: r,
    name: i
  } = e;
  const {
    workspaces: o,
    renameWorkspace: u
  } = n;
  if (!o.has(r)) {
    return {
      error: "Workspace not found"
    };
  }
  try {
    await u(r, i);
    return {
      result: {
        success: true
      }
    };
  } catch (h) {
    return {
      result: {
        success: false,
        error: h.message
      }
    };
  }
}
async function $N(e) {
  return new Promise((n, r) => {
    const i = new FileReader();
    i.onloadend = () => n(i.result);
    i.onerror = r;
    i.readAsDataURL(e);
  });
}
function qN(e, n) {
  const r = e.includes(",") ? e.split(",")[1] : e;
  const i = atob(r);
  const o = new Uint8Array(i.length);
  for (let u = 0; u < i.length; u++) {
    o[u] = i.charCodeAt(u);
  }
  return new Blob([o], {
    type: n
  });
}
async function GN(e, n) {
  const {
    wallpaper: r,
    getWallpaperForWorkspace: i
  } = n;
  let o;
  if (e != null && e.workspaceId) {
    o = i ? await i(e.workspaceId) : null;
  } else {
    o = r;
  }
  if (!o || o.type === "default") {
    return {
      result: {
        type: "default",
        dataUrl: null,
        mimeType: null,
        overlay: null,
        overlayOpacity: 0,
        blur: 0
      }
    };
  }
  let u = null;
  if (o.data) {
    try {
      u = await $N(o.data);
    } catch (h) {
      return {
        error: `Failed to convert wallpaper data: ${h.message}`
      };
    }
  }
  return {
    result: {
      type: o.type,
      dataUrl: u,
      mimeType: o.mimeType,
      overlay: o.overlay,
      overlayOpacity: o.overlayOpacity,
      blur: o.blur
    }
  };
}
async function YN(e, n) {
  const {
    saveWallpaper: r,
    saveWallpaperForWorkspace: i
  } = n;
  const {
    type: o,
    data: u,
    mimeType: h,
    overlay: a,
    overlayOpacity: c,
    blur: d,
    workspaceId: p
  } = e;
  let f = null;
  if (u && o !== "default") {
    try {
      f = qN(u, h || (o === "video" ? "video/mp4" : "image/jpeg"));
    } catch (S) {
      return {
        error: `Failed to parse wallpaper data: ${S.message}`
      };
    }
  }
  try {
    const S = {
      type: o || "image",
      data: f,
      mimeType: h || null,
      overlay: a || null,
      overlayOpacity: c ?? 0,
      blur: d ?? 0
    };
    if (p && i) {
      await i(p, S);
    } else {
      await r(S);
    }
    return {
      result: {
        success: true
      }
    };
  } catch (S) {
    return {
      result: {
        success: false,
        error: S.message
      }
    };
  }
}
async function XN(e, n) {
  const {
    resetWallpaper: r,
    resetWallpaperForWorkspace: i
  } = n;
  try {
    if (e != null && e.workspaceId && i) {
      await i(e.workspaceId);
    } else {
      await r();
    }
    return {
      result: {
        success: true
      }
    };
  } catch (o) {
    return {
      result: {
        success: false,
        error: o.message
      }
    };
  }
}
function KN(e) {
  return {
    result: e.getLocale()
  };
}
async function ZN({
  lang: e
}, n) {
  if (e) {
    await n.setLocale(e);
    return {
      result: true
    };
  } else {
    return {
      error: "lang is required"
    };
  }
}
function QN(e) {
  return {
    result: e.getDockSettings()
  };
}
async function JN(e, n) {
  if (!e || !e.position) {
    return {
      error: "position is required"
    };
  }
  try {
    await n.setDockSettings(e);
    return {
      result: {
        success: true
      }
    };
  } catch (r) {
    return {
      result: {
        success: false,
        error: r.message
      }
    };
  }
}
function ej(e) {
  return {
    result: e.getTerminalBgSettings()
  };
}
async function tj(e, n) {
  if (!e) {
    return {
      error: "settings is required"
    };
  }
  try {
    await n.setTerminalBgSettings(e);
    return {
      result: {
        success: true
      }
    };
  } catch (r) {
    return {
      result: {
        success: false,
        error: r.message
      }
    };
  }
}
function nj(e) {
  return {
    result: e.getTheme()
  };
}
function rj(e) {
  const n = e.getTheme();
  if (n === "system") {
    return {
      result: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    };
  } else {
    return {
      result: n
    };
  }
}
async function sj({
  mode: e
}, n) {
  if (!e || !["light", "dark", "system"].includes(e)) {
    return {
      error: "Invalid mode"
    };
  } else {
    await n.setTheme(e);
    return {
      result: true
    };
  }
}
function l2(e) {
  const n = e.includes(",") ? e.split(",")[1] : e;
  const r = atob(n);
  const i = new Uint8Array(r.length);
  for (let o = 0; o < r.length; o++) {
    i[o] = r.charCodeAt(o);
  }
  return i.buffer;
}
async function ij(e, n) {
  const {
    base64: r,
    fileName: i
  } = e;
  if (!r) {
    return {
      error: "base64 is required"
    };
  }
  let o;
  try {
    o = l2(r);
  } catch {
    return {
      error: "Invalid base64 data"
    };
  }
  const u = await a2(o);
  if (!u.valid) {
    return {
      result: {
        valid: false,
        error: u.error
      }
    };
  }
  const {
    installedApps: h
  } = n;
  const a = h.get(u.manifest.id);
  let c = "install";
  let d = null;
  if (a) {
    const p = AN(u.manifest.version, a.version);
    if (p > 0) {
      c = "upgrade";
    } else if (p < 0) {
      c = "downgrade";
    } else {
      c = "overwrite";
    }
    d = a.version;
  }
  return {
    result: {
      valid: true,
      manifest: u.manifest,
      fileSize: u.fileSize,
      fileCount: u.fileCount,
      installAction: c,
      existingVersion: d
    }
  };
}
async function oj(e, n) {
  const {
    path: r,
    base64: i,
    fileName: o
  } = e;
  const {
    wc: u
  } = n;
  if (!u) {
    return {
      error: "WebContainer not ready"
    };
  }
  let h;
  if (r) {
    let d = r;
    if (r.startsWith("/")) {
      const p = u.workdir || "/home/user";
      if (r.startsWith(p + "/")) {
        d = r.slice(p.length + 1);
      } else {
        return {
          error: `Path is outside workspace: ${r}`
        };
      }
    }
    try {
      h = await u.fs.readFile(d);
    } catch (p) {
      return {
        error: `Cannot read file: ${p.message}`
      };
    }
  } else if (i) {
    try {
      h = l2(i);
    } catch {
      return {
        error: "Invalid base64 data"
      };
    }
  } else {
    return {
      error: "path or base64 is required"
    };
  }
  if (!h || h.length === 0) {
    return {
      error: "File is empty or unreadable"
    };
  }
  const a = h instanceof ArrayBuffer ? h : h.buffer.slice(h.byteOffset, h.byteOffset + h.byteLength);
  const c = await a2(a);
  if (!c.valid) {
    return {
      result: {
        success: false,
        error: c.error
      }
    };
  }
  try {
    await n.installApp(c.manifest, c.zipData);
    return {
      result: {
        success: true,
        appId: c.manifest.id,
        name: typeof c.manifest.name == "string" ? c.manifest.name : Object.values(c.manifest.name)[0],
        version: c.manifest.version
      }
    };
  } catch (d) {
    return {
      result: {
        success: false,
        error: d.message
      }
    };
  }
}
// [jsos-local-store] 主站静态资源代理：WebContainer 内应用无法 fetch 主站 localhost（被预览 SW 路由进容器），
// 由主页面代为 fetch 同源资源后以 base64 回传
async function jsFetchAppAsset(e) {
  const url = e && e.url;
  if (typeof url !== "string" || !url.startsWith("/") || url.includes("..")) {
    return {
      error: "invalid url"
    };
  }
  try {
    const r = await fetch(url);
    if (!r.ok) {
      return {
        error: "HTTP " + r.status
      };
    }
    const i = new Uint8Array(await r.arrayBuffer());
    let s = "";
    const chunkSize = 32768;
    for (let c = 0; c < i.length; c += chunkSize) {
      s += String.fromCharCode.apply(null, i.subarray(c, c + chunkSize));
    }
    return {
      result: {
        base64: btoa(s)
      }
    };
  } catch (u) {
    return {
      error: u.message
    };
  }
}
async function aj(e, n) {
  const {
    appId: r,
    deleteData: i = false
  } = e;
  if (!r) {
    return {
      error: "appId is required"
    };
  }
  const {
    installedApps: o
  } = n;
  if (!o.has(r)) {
    return {
      error: "App not found"
    };
  }
  try {
    await n.uninstallApp(r, i);
    return {
      result: {
        success: true
      }
    };
  } catch (u) {
    return {
      result: {
        success: false,
        error: u.message
      }
    };
  }
}
async function lj(e, n) {
  var p;
  const {
    appId: r,
    widgetId: i,
    x: o,
    y: u
  } = e;
  const {
    installedApps: h,
    addWidget: a
  } = n;
  if (!r) {
    return {
      error: "appId is required"
    };
  }
  if (!i) {
    return {
      error: "widgetId is required"
    };
  }
  const c = h.get(r);
  if (!c) {
    return {
      error: "App not found"
    };
  }
  const d = (p = c.widgets) == null ? undefined : p.find(f => f.id === i);
  if (!d) {
    return {
      error: "Widget not found"
    };
  }
  try {
    const f = await a(r, d, o, u);
    if (f) {
      return {
        result: {
          success: true,
          instanceId: f
        }
      };
    } else {
      return {
        error: "Failed to add widget"
      };
    }
  } catch (f) {
    return {
      result: {
        success: false,
        error: f.message
      }
    };
  }
}
const sh = {
  "jsos-apps": {
    version: 7,
    stores: {
      apps: {
        keyPath: "id"
      },
      files: {
        keyPath: ["appId", "path"],
        indexes: {
          appId: "appId"
        }
      },
      "port-assignments": {
        keyPath: "appId"
      },
      "icon-positions": {
        keyPath: "appId"
      },
      "desktop-widgets": {
        keyPath: "id",
        indexes: {
          appId: "appId",
          workspaceId: "workspaceId"
        }
      },
      "app-snapshots": {
        keyPath: "appId"
      },
      "shared-data-snapshots": {
        keyPath: "appId"
      },
      "zip-data": {
        keyPath: "appId"
      }
    }
  },
  "jsos-widgets": {
    version: 1,
    stores: {
      "desktop-widgets": {
        keyPath: "id",
        indexes: {
          appId: "appId",
          workspaceId: "workspaceId"
        }
      }
    }
  },
  "jsos-workspaces": {
    version: 4,
    stores: {
      workspaces: {
        keyPath: "id"
      },
      "icon-positions": {
        keyPath: ["appId", "workspaceId"],
        indexes: {
          workspaceId: "workspaceId"
        }
      },
      wallpapers: {
        keyPath: "workspaceId"
      },
      "app-state": {
        keyPath: "id"
      },
      settings: {
        keyPath: "id"
      }
    }
  }
};
function cj(e, n) {
  return new Promise((r, i) => {
    const o = indexedDB.open(e, n);
    o.onsuccess = () => r(o.result);
    o.onerror = () => i(o.error);
  });
}
async function xv(e) {
  if (e instanceof Blob) {
    const n = await e.arrayBuffer();
    const r = new Uint8Array(n);
    let i = "";
    for (let o = 0; o < r.length; o++) {
      i += String.fromCharCode(r[o]);
    }
    return {
      _t: "blob",
      d: btoa(i),
      mime: e.type || ""
    };
  }
  if (e instanceof Uint8Array || e instanceof ArrayBuffer) {
    const n = e instanceof Uint8Array ? e : new Uint8Array(e);
    let r = "";
    for (let i = 0; i < n.length; i++) {
      r += String.fromCharCode(n[i]);
    }
    return {
      _t: "u8",
      d: btoa(r)
    };
  }
  if (e instanceof Date) {
    return {
      _t: "date",
      d: e.toISOString()
    };
  }
  if (Array.isArray(e)) {
    return Promise.all(e.map(xv));
  }
  if (e !== null && typeof e == "object" && e.constructor === Object) {
    const n = await Promise.all(Object.entries(e).map(async ([r, i]) => [r, await xv(i)]));
    return Object.fromEntries(n);
  }
  return e;
}
function Cv(e) {
  if (e && e._t === "blob") {
    const n = e.d.includes(",") ? e.d.split(",")[1] : e.d;
    const r = atob(n);
    const i = new Uint8Array(r.length);
    for (let o = 0; o < r.length; o++) {
      i[o] = r.charCodeAt(o);
    }
    return new Blob([i], {
      type: e.mime || "application/octet-stream"
    });
  }
  if (e && e._t === "u8") {
    const n = atob(e.d);
    const r = new Uint8Array(n.length);
    for (let i = 0; i < n.length; i++) {
      r[i] = n.charCodeAt(i);
    }
    return r;
  }
  if (e && e._t === "date") {
    return new Date(e.d);
  } else if (Array.isArray(e)) {
    return e.map(Cv);
  } else if (e !== null && typeof e == "object" && e.constructor === Object) {
    return Object.fromEntries(Object.entries(e).map(([n, r]) => [n, Cv(r)]));
  } else {
    return e;
  }
}
async function uj() {
  try {
    const e = {
      _version: 1,
      databases: {}
    };
    for (const [n, r] of Object.entries(sh)) {
      const i = await cj(n, r.version);
      const o = [...i.objectStoreNames];
      if (!o.length) {
        i.close();
        continue;
      }
      const u = i.transaction(o, "readonly");
      const h = {};
      await Promise.all(o.map(a => new Promise((c, d) => {
        const p = [];
        const f = u.objectStore(a).openCursor();
        f.onsuccess = S => {
          const _ = S.target.result;
          if (_) {
            p.push(_.value);
            _.continue();
          } else {
            h[a] = p;
            c();
          }
        };
        f.onerror = () => d(f.error);
      })));
      i.close();
      e.databases[n] = h;
    }
    return {
      result: await xv(e)
    };
  } catch (e) {
    return {
      result: {
        success: false,
        error: e.message
      }
    };
  }
}
async function dj({
  data: e
}) {
  var n;
  if (!e) {
    return {
      error: "data is required"
    };
  }
  try {
    const r = Cv(e);
    for (const i of Object.keys(sh)) {
      await new Promise((o, u) => {
        const h = indexedDB.deleteDatabase(i);
        h.onsuccess = () => o();
        h.onerror = () => u(h.error);
      });
    }
    for (const [i, o] of Object.entries(sh)) {
      const u = ((n = r.databases) == null ? undefined : n[i]) || {};
      const h = await new Promise((c, d) => {
        const p = indexedDB.open(i, o.version);
        p.onupgradeneeded = f => {
          const S = f.target.result;
          for (const [_, x] of Object.entries(o.stores)) {
            if (!S.objectStoreNames.contains(_)) {
              const w = S.createObjectStore(_, {
                keyPath: x.keyPath
              });
              if (x.indexes) {
                for (const [g, b] of Object.entries(x.indexes)) {
                  w.createIndex(g, b);
                }
              }
            }
          }
        };
        p.onsuccess = () => c(p.result);
        p.onerror = () => d(p.error);
      });
      const a = Object.keys(u).filter(c => u[c].length > 0);
      if (a.length) {
        const c = h.transaction(a, "readwrite");
        await Promise.all(a.map(d => new Promise((p, f) => {
          const S = u[d];
          const _ = c.objectStore(d);
          let x = 0;
          for (const w of S) {
            const g = _.add(w);
            g.onsuccess = () => {
              if (++x === S.length) {
                p();
              }
            };
            g.onerror = () => f(g.error);
          }
        })));
      }
      h.close();
    }
    return {
      result: {
        success: true
      }
    };
  } catch (r) {
    return {
      result: {
        success: false,
        error: r.message
      }
    };
  }
}
async function fj() {
  return {
    result: (await Lv()) || null
  };
}
async function hj(e) {
  const {
    url: n,
    key: r
  } = e;
  if (!n) {
    return {
      error: "url is required"
    };
  }
  try {
    await VO({
      url: n,
      key: r || ""
    });
    return {
      result: {
        success: true
      }
    };
  } catch (i) {
    return {
      result: {
        success: false,
        error: i.message
      }
    };
  }
}
async function pj() {
  try {
    await WO();
    return {
      result: {
        success: true
      }
    };
  } catch (e) {
    return {
      result: {
        success: false,
        error: e.message
      }
    };
  }
}
async function mj(e) {
  const {
    url: n,
    options: r = {}
  } = e;
  if (!n) {
    return {
      error: "url is required"
    };
  }
  const i = await Lv();
  if (!i || !i.url) {
    return {
      error: "Proxy not configured"
    };
  }
  try {
    const o = `${i.url}/${n}`;
    const u = {
      ...r.headers
    };
    if (i.key) {
      u["x-cors-proxy-key"] = i.key;
    }
    const h = await fetch(o, {
      ...r,
      headers: u
    });
    const a = await h.text();
    const c = {};
    h.headers.forEach((d, p) => {
      c[p] = d;
    });
    return {
      result: {
        ok: h.ok,
        status: h.status,
        statusText: h.statusText,
        headers: c,
        data: a
      }
    };
  } catch (o) {
    return {
      error: o.message
    };
  }
}
function gj(e) {
  return {
    result: {
      version: e.systemVersion || "1.0.0"
    }
  };
}
async function vj() {
  try {
    if (!navigator.storage) {
      return {
        error: "Storage API not supported"
      };
    }
    const e = await navigator.storage.estimate();
    const n = await navigator.storage.persisted();
    return {
      result: {
        quota: e.quota,
        usage: e.usage,
        usageDetails: e.usageDetails || {},
        persistent: n
      }
    };
  } catch (e) {
    return {
      error: e.message
    };
  }
}
function bj() {
  setTimeout(() => window.location.reload(), 100);
  return {
    result: {
      success: true
    }
  };
}
async function yj() {
  const e = Object.keys(sh);
  try {
    for (const n of e) {
      await new Promise((r, i) => {
        const o = indexedDB.deleteDatabase(n);
        o.onsuccess = () => r();
        o.onerror = () => i(o.error);
      });
    }
    setTimeout(() => window.location.reload(), 100);
    return {
      result: {
        success: true
      }
    };
  } catch (n) {
    return {
      result: {
        success: false,
        error: n.message
      }
    };
  }
}
const _j = "0.7.1";
const zx = {
  version: _j
};
let Nx = function (e) {
  e.checked = "data-checked";
  e.unchecked = "data-unchecked";
  e.disabled = "data-disabled";
  e.readonly = "data-readonly";
  e.required = "data-required";
  e.valid = "data-valid";
  e.invalid = "data-invalid";
  e.touched = "data-touched";
  e.dirty = "data-dirty";
  e.filled = "data-filled";
  e.focused = "data-focused";
  return e;
}({});
const Ev = {
  checked(e) {
    if (e) {
      return {
        [Nx.checked]: ""
      };
    } else {
      return {
        [Nx.unchecked]: ""
      };
    }
  },
  ...xs,
  ...Ho
};
const c2 = "data-composite-item-active";
const u2 = E.createContext(undefined);
function wj() {
  return E.useContext(u2);
}
const d2 = E.createContext(undefined);
function Sj() {
  const e = E.useContext(d2);
  if (e === undefined) {
    throw new Error(Bt(52));
  }
  return e;
}
const _Component89 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    disabled: u = false,
    readOnly: h = false,
    required: a = false,
    "aria-labelledby": c,
    value: d,
    inputRef: p,
    nativeButton: f = false,
    id: S,
    style: _,
    ...x
  } = n;
  const w = wj();
  const {
    disabled: g,
    readOnly: b,
    required: m,
    form: v,
    checkedValue: C,
    touched: T = false,
    validation: A,
    name: M
  } = w ?? {};
  const R = (w == null ? undefined : w.setCheckedValue) ?? Yt;
  const I = (w == null ? undefined : w.setTouched) ?? Yt;
  const j = (w == null ? undefined : w.registerControlRef) ?? Yt;
  const W = (w == null ? undefined : w.registerInputRef) ?? Yt;
  const {
    setDirty: z,
    validityData: N,
    setTouched: D,
    setFilled: $,
    state: G,
    disabled: q
  } = Gr();
  const U = a4();
  const {
    labelId: L,
    getDescriptionProps: F
  } = Cs();
  const P = q || U.disabled || g || u;
  const V = b || h;
  const Z = m || a;
  const J = v;
  const ne = w ? C === d : d === "";
  const ue = E.useRef(null);
  const ee = E.useRef(null);
  const Y = je(_e => {
    if (_e) {
      j(_e, P);
    }
  });
  const re = ls(p, ee, W);
  Fe(() => {
    var _e;
    if ((_e = ee.current) != null && _e.checked) {
      $(true);
    }
  }, [$]);
  Fe(() => {
    if (ee.current) {
      if (P && ne) {
        W(null);
        return;
      }
      if (ue.current) {
        j(ue.current, P);
      }
      W(ee.current);
    }
  }, [ne, P, j, W]);
  const ce = $n();
  const ge = Ba({
    id: S,
    implicit: false,
    controlRef: ue
  });
  const de = f ? undefined : ge;
  const me = GP(c, L, ee, !f, de);
  const H = {
    role: "radio",
    "aria-checked": ne,
    "aria-required": Z || undefined,
    "aria-readonly": V || undefined,
    "aria-labelledby": me,
    [c2]: ne ? "" : undefined,
    id: f ? ge : ce,
    onKeyDown(_e) {
      if (_e.key === "Enter") {
        _e.preventDefault();
      }
    },
    onClick(_e) {
      if (_e.defaultPrevented || P || V) {
        return;
      }
      _e.preventDefault();
      const ie = ee.current;
      if (ie) {
        ie.dispatchEvent(new (fn(ie).PointerEvent)("click", {
          bubbles: true,
          shiftKey: _e.shiftKey,
          ctrlKey: _e.ctrlKey,
          altKey: _e.altKey,
          metaKey: _e.metaKey
        }));
      }
    },
    onFocus(_e) {
      var ie;
      if (!_e.defaultPrevented && !P && !V && !!T) {
        if ((ie = ee.current) != null) {
          ie.click();
        }
        I(false);
      }
    }
  };
  const {
    getButtonProps: ae,
    buttonRef: oe
  } = Es({
    disabled: P,
    native: f
  });
  const X = {
    type: "radio",
    ref: re,
    form: J,
    id: de,
    name: M,
    tabIndex: -1,
    style: M ? gh : Ma,
    "aria-hidden": true,
    ...(d !== undefined ? {
      value: th(d)
    } : Xt),
    disabled: P,
    checked: ne,
    required: Z,
    readOnly: V,
    onChange(_e) {
      if (_e.nativeEvent.defaultPrevented || P || V || d === undefined) {
        return;
      }
      const ie = $e(ur, _e.nativeEvent);
      if (!ie.isCanceled) {
        D(true);
        z(d !== N.initialValue);
        $(true);
        R(d, ie);
      }
    },
    onFocus() {
      var _e;
      if ((_e = ue.current) != null) {
        _e.focus();
      }
    }
  };
  const Q = E.useMemo(() => ({
    ...G,
    required: Z,
    disabled: P,
    readOnly: V,
    checked: ne
  }), [G, P, V, ne, Z]);
  const se = Q;
  const he = w !== undefined;
  const ye = [r, ue, oe, Y];
  const pe = [H, F, (A == null ? undefined : A.getValidationProps) ?? Xt, x, ae];
  const Se = Je("span", n, {
    enabled: !he,
    state: Q,
    ref: ye,
    props: pe,
    stateAttributesMapping: Ev
  });
  return <d2.Provider value={se}>{he ? <_Component11 tag="span" render={i} className={o} style={_} state={Q} refs={ye} props={pe} stateAttributesMapping={Ev} /> : Se}<input {...X} suppressHydrationWarning={true} /></d2.Provider>;
});
const Cj = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    keepMounted: h = false,
    ...a
  } = n;
  const c = Sj();
  const d = c.checked;
  const {
    mounted: p,
    transitionStatus: f,
    setMounted: S
  } = zo(d);
  const _ = {
    ...c,
    transitionStatus: f
  };
  const x = E.useRef(null);
  const w = h || p;
  const g = Je("span", n, {
    ref: [r, x],
    state: _,
    props: a,
    stateAttributesMapping: Ev
  });
  qr({
    open: d,
    ref: x,
    onComplete() {
      if (!d) {
        S(false);
      }
    }
  });
  if (w) {
    return g;
  } else {
    return null;
  }
});
const Ej = [];
function Rj(e) {
  const {
    itemSizes: n,
    cols: r = 1,
    loopFocus: i = true,
    onLoop: o,
    dense: u = false,
    orientation: h = "both",
    direction: a,
    highlightedIndex: c,
    onHighlightedIndexChange: d,
    rootRef: p,
    enableHomeAndEndKeys: f = false,
    stopEventPropagation: S = false,
    disabledIndices: _,
    modifierKeys: x = Ej
  } = e;
  const [w, g] = E.useState(0);
  const b = r > 1;
  const m = E.useRef(null);
  const v = ls(m, p);
  const C = E.useRef([]);
  const T = E.useRef(false);
  const A = c ?? w;
  const M = je((W, z = false) => {
    (d ?? g)(W);
    if (z) {
      const N = C.current[W];
      ax(m.current, N, a, h);
    }
  });
  const R = je(W => {
    if (W.size === 0 || T.current) {
      return;
    }
    T.current = true;
    const z = Array.from(W.keys());
    const N = z.find($ => $ == null ? undefined : $.hasAttribute(c2)) ?? null;
    const D = N ? z.indexOf(N) : -1;
    if (D !== -1) {
      M(D);
    }
    ax(m.current, N, a, h);
  });
  const I = je((W, z, N) => o ? o == null ? undefined : o(W, z, N, C) : N);
  const j = E.useMemo(() => ({
    "aria-orientation": h === "both" ? undefined : h,
    ref: v,
    onFocus(W) {
      const z = m.current;
      const N = dn(W.nativeEvent);
      if (!!z && N != null && !!ox(N)) {
        N.setSelectionRange(0, N.value.length ?? 0);
      }
    },
    onKeyDown(W) {
      const z = f ? Na : QE;
      if (!z.has(W.key) || Tj(W, x) || !m.current) {
        return;
      }
      const D = a === "rtl";
      const $ = D ? mu : Nl;
      const G = {
        horizontal: $,
        vertical: xa,
        both: $
      }[h];
      const q = D ? Nl : mu;
      const U = {
        horizontal: q,
        vertical: zl,
        both: q
      }[h];
      const L = dn(W.nativeEvent);
      if (L != null && ox(L) && !eB(L)) {
        const ue = L.selectionStart;
        const ee = L.selectionEnd;
        const Y = L.value ?? "";
        if (ue == null || W.shiftKey || ue !== ee || W.key !== U && ue < Y.length || W.key !== G && ue > 0) {
          return;
        }
      }
      let F = A;
      const P = kf(C, _);
      const V = gv(C, _);
      if (b) {
        const ue = n || Array.from({
          length: C.current.length
        }, () => ({
          width: 1,
          height: 1
        }));
        const ee = jC(ue, r, u);
        const Y = ee.findIndex(ce => ce != null && !ji(C.current, ce, _));
        const re = ee.reduce((ce, ge, de) => ge != null && !ji(C.current, ge, _) ? de : ce, -1);
        F = ee[NC(ee.map(ce => ce != null ? C.current[ce] : null), {
          event: W,
          orientation: h,
          loopFocus: i,
          onLoop: I,
          cols: r,
          disabledIndices: FC([...(_ || C.current.map((ce, ge) => ji(C.current, ge) ? ge : undefined)), undefined], ee),
          minIndex: Y,
          maxIndex: re,
          prevIndex: HC(A > V ? P : A, ue, ee, r, W.key === xa ? "bl" : W.key === Nl ? "tr" : "tl"),
          rtl: D
        })];
      }
      const Z = {
        horizontal: [$],
        vertical: [xa],
        both: [$, xa]
      }[h];
      const J = {
        horizontal: [q],
        vertical: [zl],
        both: [q, zl]
      }[h];
      const ne = b ? z : {
        horizontal: f ? S4 : KE,
        vertical: f ? x4 : ZE,
        both: z
      }[h];
      if (f) {
        if (W.key === Ou) {
          F = P;
        } else if (W.key === Du) {
          F = V;
        }
      }
      if (F === A && (Z.includes(W.key) || J.includes(W.key))) {
        if (i && F === V && Z.includes(W.key)) {
          F = P;
          if (o) {
            F = o(W, A, F, C);
          }
        } else if (i && F === P && J.includes(W.key)) {
          F = V;
          if (o) {
            F = o(W, A, F, C);
          }
        } else {
          F = Cr(C.current, {
            startingIndex: F,
            decrement: J.includes(W.key),
            disabledIndices: _
          });
        }
      }
      if (F !== A && !du(C.current, F)) {
        if (S) {
          W.stopPropagation();
        }
        if (ne.has(W.key)) {
          W.preventDefault();
        }
        M(F, true);
        queueMicrotask(() => {
          var ue;
          if ((ue = C.current[F]) != null) {
            ue.focus();
          }
        });
      }
    }
  }), [r, u, a, _, C, f, A, b, n, i, o, I, v, x, M, h, S]);
  return E.useMemo(() => ({
    props: j,
    highlightedIndex: A,
    onHighlightedIndexChange: M,
    elementsRef: C,
    disabledIndices: _,
    onMapChange: R,
    relayKeyboardEvent: j.onKeyDown
  }), [j, A, M, C, _, R]);
}
function Tj(e, n) {
  for (const r of T4.values()) {
    if (!n.includes(r) && e.getModifierState(r)) {
      return true;
    }
  }
  return false;
}
function _Component88(e) {
  const {
    render: n,
    className: r,
    style: i,
    refs: o = zs,
    props: u = zs,
    state: h = Xt,
    stateAttributesMapping: a,
    highlightedIndex: c,
    onHighlightedIndexChange: d,
    orientation: p,
    dense: f,
    itemSizes: S,
    loopFocus: _,
    onLoop: x,
    cols: w,
    enableHomeAndEndKeys: g,
    onMapChange: b,
    stopEventPropagation: m = true,
    rootRef: v,
    disabledIndices: C,
    modifierKeys: T,
    highlightItemOnHover: A = false,
    tag: M = "div",
    ...R
  } = e;
  const I = Us();
  const {
    props: j,
    highlightedIndex: W,
    onHighlightedIndexChange: z,
    elementsRef: N,
    onMapChange: D,
    relayKeyboardEvent: $
  } = Rj({
    itemSizes: S,
    cols: w,
    loopFocus: _,
    onLoop: x,
    dense: f,
    orientation: p,
    highlightedIndex: c,
    onHighlightedIndexChange: d,
    rootRef: v,
    stopEventPropagation: m,
    enableHomeAndEndKeys: g,
    direction: I,
    disabledIndices: C,
    modifierKeys: T
  });
  const G = Je(M, e, {
    state: h,
    ref: o,
    props: [j, ...u, R],
    stateAttributesMapping: a
  });
  const q = E.useMemo(() => ({
    highlightedIndex: W,
    onHighlightedIndexChange: z,
    highlightItemOnHover: A,
    relayKeyboardEvent: $
  }), [W, z, A, $]);
  return <VE.Provider value={q}><Iu elementsRef={N} onMapChange={U => {
      if (b != null) {
        b(U);
      }
      D(U);
    }}>{G}</Iu></VE.Provider>;
}
const Aj = [JE];
const Mj = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    disabled: u,
    readOnly: h,
    required: a,
    onValueChange: c,
    value: d,
    defaultValue: p,
    form: f,
    name: S,
    inputRef: _,
    id: x,
    style: w,
    ...g
  } = n;
  const {
    setTouched: b,
    setFocused: m,
    shouldValidateOnChange: v,
    validationMode: C,
    name: T,
    disabled: A,
    state: M,
    validation: R,
    setDirty: I,
    setFilled: j,
    validityData: W
  } = Gr();
  const {
    labelId: z
  } = Cs();
  const {
    clearErrors: N
  } = Pa();
  const D = BE(true);
  const $ = A || u;
  const G = T ?? S;
  const q = $n(x);
  const [U, L] = Hi({
    controlled: d,
    default: p,
    name: "RadioGroup",
    state: "value"
  });
  const [F, P] = E.useState(false);
  const V = je((me, H) => {
    if (c != null) {
      c(me, H);
    }
    if (!H.isCanceled) {
      L(me);
    }
  });
  const Z = E.useRef(null);
  const J = E.useRef(null);
  const ne = E.useRef(null);
  function ue(me) {
    let H;
    if (_) {
      if (typeof _ == "function") {
        H = _(me);
      } else {
        _.current = me;
      }
    }
    J.current = me;
    R.inputRef.current = me;
    return H;
  }
  const ee = je((me, H = false) => {
    if (me) {
      if (H) {
        if (Z.current === me) {
          Z.current = null;
        }
        return;
      }
      if (Z.current == null) {
        Z.current = me;
      }
    }
  });
  const Y = je(me => {
    if (!me || me.disabled) {
      return;
    }
    ne.current ||= me;
    const H = J.current;
    if (me.checked || H == null || H.disabled) {
      return ue(me);
    }
  });
  Mu(Z, q, U ?? null);
  Eo(U, () => {
    N(G);
    I(U !== W.initialValue);
    j(U != null);
    if (v()) {
      R.commit(U);
    } else {
      R.commit(U, true);
    }
    const me = ne.current;
    if (U == null && me && !me.disabled) {
      ue(me);
    }
  });
  const re = g["aria-labelledby"] ?? z ?? (D == null ? undefined : D.legendId);
  const ce = {
    ...M,
    disabled: $ ?? false,
    required: a ?? false,
    readOnly: h ?? false
  };
  const ge = E.useMemo(() => ({
    ...M,
    checkedValue: U,
    disabled: $,
    form: f,
    validation: R,
    name: G,
    readOnly: h,
    registerControlRef: ee,
    registerInputRef: Y,
    required: a,
    setCheckedValue: V,
    setTouched: P,
    touched: F
  }), [U, $, f, R, M, G, h, ee, Y, a, V, P, F]);
  const de = {
    role: "radiogroup",
    "aria-required": a || undefined,
    "aria-disabled": $ || undefined,
    "aria-readonly": h || undefined,
    "aria-labelledby": re,
    onFocus() {
      m(true);
    },
    onBlur(me) {
      if (!Xe(me.currentTarget, me.relatedTarget)) {
        b(true);
        m(false);
        if (C === "onBlur") {
          R.commit(U);
        }
      }
    },
    onKeyDownCapture(me) {
      if (me.key.startsWith("Arrow")) {
        b(true);
        P(true);
        m(true);
      }
    }
  };
  return <u2.Provider value={ge}><_Component88 render={i} className={o} style={w} state={ce} props={[de, R.getValidationProps, g]} refs={[r]} stateAttributesMapping={Ho} enableHomeAndEndKeys={false} modifierKeys={Aj} /></u2.Provider>;
});
function Oj({
  className: e,
  ...n
}) {
  return <Mj className={pt("flex flex-col gap-3", e)} data-slot="radio-group" {...n} />;
}
function _Component93({
  className: e,
  ...n
}) {
  return <_Component89 className={pt("relative inline-flex size-4.5 shrink-0 items-center justify-center rounded-full border border-input bg-background not-dark:bg-clip-padding shadow-xs/5 outline-none transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-full not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/48 data-disabled:cursor-not-allowed data-disabled:opacity-64 sm:size-4 dark:not-data-checked:bg-input/32 dark:aria-invalid:ring-destructive/24 dark:not-data-disabled:not-data-checked:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)] [[data-disabled],[data-checked],[aria-invalid]]:shadow-none", e)} data-slot="radio" {...n}><Cj className="absolute -inset-px flex size-4.5 items-center justify-center rounded-full before:size-2 before:rounded-full before:bg-primary-foreground data-unchecked:hidden data-checked:bg-primary sm:size-4 sm:before:size-1.5" data-slot="radio-indicator" /></_Component89>;
}
const f2 = E.createContext(null);
const h2 = E.createContext(null);
function ui() {
  const e = E.useContext(f2);
  if (e === null) {
    throw new Error(Bt(60));
  }
  return e;
}
function p2() {
  const e = E.useContext(h2);
  if (e === null) {
    throw new Error(Bt(61));
  }
  return e;
}
const bt = {
  id: Me(e => e.id),
  labelId: Me(e => e.labelId),
  modal: Me(e => e.modal),
  multiple: Me(e => e.multiple),
  items: Me(e => e.items),
  itemToStringLabel: Me(e => e.itemToStringLabel),
  itemToStringValue: Me(e => e.itemToStringValue),
  isItemEqualToValue: Me(e => e.isItemEqualToValue),
  value: Me(e => e.value),
  hasSelectedValue: Me(e => {
    const {
      value: n,
      multiple: r,
      itemToStringValue: i
    } = e;
    if (n == null) {
      return false;
    } else if (r && Array.isArray(n)) {
      return n.length > 0;
    } else {
      return Bs(n, i) !== "";
    }
  }),
  hasNullItemLabel: Me((e, n) => n ? OR(e.items) : false),
  open: Me(e => e.open),
  mounted: Me(e => e.mounted),
  forceMount: Me(e => e.forceMount),
  transitionStatus: Me(e => e.transitionStatus),
  openMethod: Me(e => e.openMethod),
  activeIndex: Me(e => e.activeIndex),
  selectedIndex: Me(e => e.selectedIndex),
  isActive: Me((e, n) => e.activeIndex === n),
  isSelected: Me((e, n, r) => {
    const i = e.isItemEqualToValue;
    const o = e.value;
    if (e.multiple) {
      return Array.isArray(o) && o.some(u => ai(r, u, i));
    } else if (e.selectedIndex === n && e.selectedIndex !== null) {
      return true;
    } else {
      return ai(r, o, i);
    }
  }),
  isSelectedByFocus: Me((e, n) => e.selectedIndex === n),
  popupProps: Me(e => e.popupProps),
  triggerProps: Me(e => e.triggerProps),
  triggerElement: Me(e => e.triggerElement),
  positionerElement: Me(e => e.positionerElement),
  listElement: Me(e => e.listElement),
  popupSide: Me(e => e.popupSide),
  scrollUpArrowVisible: Me(e => e.scrollUpArrowVisible),
  scrollDownArrowVisible: Me(e => e.scrollDownArrowVisible),
  hasScrollArrows: Me(e => e.hasScrollArrows)
};
function Dj(e) {
  const {
    id: n,
    value: r,
    defaultValue: i = null,
    onValueChange: o,
    open: u,
    defaultOpen: h = false,
    onOpenChange: a,
    name: c,
    form: d,
    autoComplete: p,
    disabled: f = false,
    readOnly: S = false,
    required: _ = false,
    modal: x = true,
    actionsRef: w,
    inputRef: g,
    onOpenChangeComplete: b,
    items: m,
    multiple: v = false,
    itemToStringLabel: C,
    itemToStringValue: T,
    isItemEqualToValue: A = kR,
    highlightItemOnHover: M = true,
    children: R
  } = e;
  const {
    clearErrors: I
  } = Pa();
  const {
    setDirty: j,
    setTouched: W,
    setFocused: z,
    shouldValidateOnChange: N,
    validityData: D,
    setFilled: $,
    name: G,
    disabled: q,
    validation: U,
    validationMode: L
  } = Gr();
  const F = Ba({
    id: n
  });
  const P = q || f;
  const V = G ?? c;
  const [Z, J] = Hi({
    controlled: r,
    default: v ? i ?? zs : i,
    name: "Select",
    state: "value"
  });
  const [ne, ue] = Hi({
    controlled: u,
    default: h,
    name: "Select",
    state: "open"
  });
  const ee = E.useRef([]);
  const Y = E.useRef([]);
  const re = E.useRef(null);
  const ce = E.useRef(null);
  const ge = E.useRef(0);
  const de = E.useRef(null);
  const me = E.useRef([]);
  const H = E.useRef(false);
  const ae = E.useRef(false);
  const oe = E.useRef(null);
  const X = E.useRef(null);
  const Q = E.useRef({
    allowSelectedMouseUp: false,
    allowUnselectedMouseUp: false,
    dragY: 0
  });
  const se = E.useRef(false);
  const {
    mounted: he,
    setMounted: ye,
    transitionStatus: pe
  } = zo(ne);
  const {
    openMethod: Se,
    triggerProps: _e
  } = Ab(ne);
  const ie = sr(() => new ab({
    id: F,
    labelId: undefined,
    modal: x,
    multiple: v,
    itemToStringLabel: C,
    itemToStringValue: T,
    isItemEqualToValue: A,
    value: Z,
    open: ne,
    mounted: he,
    transitionStatus: pe,
    items: m,
    forceMount: false,
    openMethod: null,
    activeIndex: null,
    selectedIndex: null,
    popupProps: {},
    triggerProps: {},
    triggerElement: null,
    positionerElement: null,
    listElement: null,
    popupSide: null,
    scrollUpArrowVisible: false,
    scrollDownArrowVisible: false,
    hasScrollArrows: false
  })).current;
  const te = Pe(ie, bt.activeIndex);
  const be = Pe(ie, bt.selectedIndex);
  const ve = Pe(ie, bt.triggerElement);
  const Te = Pe(ie, bt.positionerElement);
  const Re = IE(Se);
  const ze = Se ?? Re;
  const Be = E.useMemo(() => v && Array.isArray(Z) && Z.length === 0 ? "" : Bs(Z, T), [v, Z, T]);
  const Ue = E.useMemo(() => v && Array.isArray(Z) ? Z.map(ht => Bs(ht, T)) : Bs(Z, T), [v, Z, T]);
  const We = On(ie.state.triggerElement);
  const lt = je(() => Ue);
  Mu(We, F, Z, lt);
  const dt = E.useRef(Z);
  const _t = v ? Array.isArray(Z) && Z.length > 0 : Z != null;
  Fe(() => {
    if (Z !== dt.current) {
      ie.set("forceMount", true);
    }
  }, [ie, Z]);
  Fe(() => {
    $(_t);
  }, [_t, $]);
  Fe(function () {
    const Zt = me.current;
    let nn;
    if (v) {
      const $t = Array.isArray(Z) ? Z : [];
      if ($t.length === 0) {
        nn = null;
      } else {
        const Ft = $t[$t.length - 1];
        const sn = Mo(Zt, Ft, A);
        nn = sn === -1 ? null : sn;
      }
    } else {
      const $t = Mo(Zt, Z, A);
      nn = $t === -1 ? null : $t;
    }
    if (nn === null) {
      X.current = null;
    }
    if (!ne) {
      ie.set("selectedIndex", nn);
    }
  }, [_t, v, ne, Z, me, A, ie, X]);
  Eo(Z, () => {
    I(V);
    j(Z !== D.initialValue);
    if (N()) {
      U.commit(Z);
    } else {
      U.commit(Z, true);
    }
  });
  const Dt = je((ht, Zt) => {
    if (a != null) {
      a(ht, Zt);
    }
    if (!Zt.isCanceled && (ue(ht), !ht && (Zt.reason === Ui || Zt.reason === Eu) && (W(true), z(false), L === "onBlur" && U.commit(Z)), !ht && ie.state.activeIndex !== null)) {
      const nn = ee.current[ie.state.activeIndex];
      queueMicrotask(() => {
        if (nn != null) {
          nn.setAttribute("tabindex", "-1");
        }
      });
    }
  });
  const kt = je(() => {
    ye(false);
    ie.update({
      activeIndex: null,
      openMethod: null
    });
    if (b != null) {
      b(false);
    }
  });
  qr({
    enabled: !w,
    open: ne,
    ref: re,
    onComplete() {
      if (!ne) {
        kt();
      }
    }
  });
  E.useImperativeHandle(w, () => ({
    unmount: kt
  }), [kt]);
  const Ge = je((ht, Zt) => {
    if (o != null) {
      o(ht, Zt);
    }
    if (!Zt.isCanceled) {
      J(ht);
    }
  });
  const Ye = je(() => {
    const ht = ie.state.listElement || re.current;
    if (!ht) {
      return;
    }
    const Zt = zb(ht.scrollHeight, ht.clientHeight);
    const nn = Vl(ht.scrollTop, Zt);
    const $t = nn > 0;
    const Ft = nn < Zt;
    if (ie.state.scrollUpArrowVisible !== $t) {
      ie.set("scrollUpArrowVisible", $t);
    }
    if (ie.state.scrollDownArrowVisible !== Ft) {
      ie.set("scrollDownArrowVisible", Ft);
    }
  });
  const Qe = hb({
    open: ne,
    onOpenChange: Dt,
    elements: {
      reference: ve,
      floating: Te
    }
  });
  const gt = ql(Qe, {
    enabled: !S && !P,
    event: "mousedown"
  });
  const ft = Gl(Qe);
  const Ke = vb(Qe, {
    enabled: !S && !P,
    listRef: ee,
    activeIndex: te,
    selectedIndex: be,
    disabledIndices: zs,
    onNavigate(ht) {
      if (ht !== null || !!ne) {
        ie.set("activeIndex", ht);
      }
    },
    focusItemOnHover: M
  });
  const en = bb(Qe, {
    enabled: !S && !P && (ne || !v),
    listRef: Y,
    activeIndex: te,
    selectedIndex: be,
    onMatch(ht) {
      if (ne) {
        ie.set("activeIndex", ht);
      } else {
        Ge(me.current[ht], $e("none"));
      }
    },
    onTyping(ht) {
      H.current = ht;
    }
  });
  const St = E.useMemo(() => {
    const ht = Sn(en.reference, Ke.reference, ft.reference, gt.reference, _e);
    if (F) {
      ht.id = F;
    }
    return ht;
  }, [gt.reference, en.reference, Ke.reference, ft.reference, _e, F]);
  const it = E.useMemo(() => Sn(No, en.floating, Ke.floating, ft.floating), [en.floating, Ke.floating, ft.floating]);
  const et = Ke.item ?? Xt;
  Wl(() => {
    ie.update({
      popupProps: it,
      triggerProps: St
    });
  });
  Fe(() => {
    ie.update({
      id: F,
      modal: x,
      multiple: v,
      value: Z,
      open: ne,
      mounted: he,
      transitionStatus: pe,
      popupProps: it,
      triggerProps: St,
      items: m,
      itemToStringLabel: C,
      itemToStringValue: T,
      isItemEqualToValue: A,
      openMethod: ze
    });
  }, [ie, F, x, v, Z, ne, he, pe, it, St, m, C, T, A, ze]);
  const Wt = E.useMemo(() => ({
    store: ie,
    name: V,
    required: _,
    disabled: P,
    readOnly: S,
    multiple: v,
    highlightItemOnHover: M,
    setValue: Ge,
    setOpen: Dt,
    listRef: ee,
    popupRef: re,
    scrollHandlerRef: ce,
    handleScrollArrowVisibility: Ye,
    scrollArrowsMountedCountRef: ge,
    itemProps: et,
    events: Qe.context.events,
    valueRef: de,
    valuesRef: me,
    labelsRef: Y,
    typingRef: H,
    selectionRef: Q,
    firstItemTextRef: oe,
    selectedItemTextRef: X,
    validation: U,
    onOpenChangeComplete: b,
    keyboardActiveRef: ae,
    alignItemWithTriggerActiveRef: se,
    initialValueRef: dt
  }), [ie, V, _, P, S, v, M, Ge, Dt, et, Qe.context.events, U, b, Ye]);
  const xt = ls(g, U.inputRef);
  const Ln = v && Array.isArray(Z) && Z.length > 0;
  const tn = v ? undefined : V;
  const Kt = E.useMemo(() => !v || !Array.isArray(Z) || !V ? null : Z.map(ht => {
    const Zt = Bs(ht, T);
    return <input type="hidden" form={d} name={V} value={Zt} key={Zt} />;
  }), [v, Z, d, V, T]);
  return <f2.Provider value={Wt}><h2.Provider value={Qe}>{R}<input {...U.getInputValidationProps({
        onFocus() {
          var ht;
          if ((ht = ie.state.triggerElement) != null) {
            ht.focus({
              focusVisible: true
            });
          }
        },
        onChange(ht) {
          var Ft;
          if (ht.nativeEvent.defaultPrevented || P || S) {
            if ((Ft = ht.preventBaseUIHandler) != null) {
              Ft.call(ht);
            }
            return;
          }
          const Zt = ht.currentTarget.value;
          const nn = $e(ur, ht.nativeEvent);
          function $t() {
            if (v) {
              return;
            }
            const sn = me.current.find(zt => Bs(zt, T).toLowerCase() === Zt.toLowerCase() || br(zt, C).toLowerCase() === Zt.toLowerCase());
            if (sn != null) {
              j(sn !== D.initialValue);
              Ge(sn, nn);
              if (N()) {
                U.commit(sn);
              }
            }
          }
          ie.set("forceMount", true);
          queueMicrotask($t);
        }
      })} id={F && tn == null ? `${F}-hidden-input` : undefined} form={d} name={tn} autoComplete={p} value={Be} disabled={P} required={_ && !Ln} readOnly={S} ref={xt} style={V ? gh : Ma} tabIndex={-1} aria-hidden={true} suppressHydrationWarning={true} />{Kt}</h2.Provider></f2.Provider>;
}
const wf = 2;
const Ij = 400;
const Lj = {
  ...pu,
  ...Ho,
  popupSide: e => e ? {
    "data-popup-side": e
  } : null,
  value: () => null
};
const Pj = E.forwardRef(function (n, r) {
  var H;
  const {
    render: i,
    className: o,
    id: u,
    disabled: h = false,
    nativeButton: a = true,
    style: c,
    ...d
  } = n;
  const {
    setTouched: p,
    setFocused: f,
    validationMode: S,
    state: _,
    disabled: x
  } = Gr();
  const {
    labelId: w
  } = Cs();
  const {
    store: g,
    setOpen: b,
    selectionRef: m,
    validation: v,
    readOnly: C,
    required: T,
    alignItemWithTriggerActiveRef: A,
    disabled: M,
    keyboardActiveRef: R
  } = ui();
  const I = x || M || h;
  const j = Pe(g, bt.open);
  const W = Pe(g, bt.mounted);
  const z = Pe(g, bt.value);
  const N = Pe(g, bt.triggerProps);
  const D = Pe(g, bt.positionerElement);
  const $ = Pe(g, bt.listElement);
  const G = Pe(g, bt.popupSide);
  const q = Pe(g, bt.id);
  const U = Pe(g, bt.labelId);
  const L = Pe(g, bt.hasSelectedValue);
  const F = W && D ? G : null;
  const P = u ?? q;
  const V = zh(w, U);
  Ba({
    id: P
  });
  const Z = On(D);
  const J = E.useRef(null);
  const {
    getButtonProps: ne,
    buttonRef: ue
  } = Es({
    disabled: I,
    native: a
  });
  const ee = je(ae => {
    g.set("triggerElement", ae);
  });
  const Y = ls(r, J, ue, ee);
  const re = xn();
  const ce = xn();
  const ge = xn();
  E.useEffect(() => {
    if (j) {
      ge.start(Ij, () => {
        m.current.allowUnselectedMouseUp = true;
        m.current.allowSelectedMouseUp = true;
      });
      return () => {
        ge.clear();
      };
    }
    m.current = {
      allowSelectedMouseUp: false,
      allowUnselectedMouseUp: false,
      dragY: 0
    };
    ce.clear();
  }, [j, m, ce, ge]);
  const de = Sn(N, {
    id: P,
    role: "combobox",
    "aria-expanded": j ? "true" : "false",
    "aria-haspopup": "listbox",
    "aria-controls": j ? ($ == null ? undefined : $.id) ?? ((H = Gf(D)) == null ? undefined : H.id) : undefined,
    "aria-labelledby": V,
    "aria-readonly": C || undefined,
    "aria-required": T || undefined,
    tabIndex: I ? -1 : 0,
    ref: Y,
    onFocus(ae) {
      f(true);
      if (j && A.current) {
        b(false, $e(ur, ae.nativeEvent));
      }
      re.start(0, () => {
        g.set("forceMount", true);
      });
    },
    onBlur(ae) {
      if (!Xe(D, ae.relatedTarget)) {
        p(true);
        f(false);
        if (S === "onBlur") {
          v.commit(z);
        }
      }
    },
    onPointerMove() {
      R.current = false;
    },
    onKeyDown() {
      R.current = true;
    },
    onMouseDown(ae) {
      if (j) {
        return;
      }
      const oe = yt(ae.currentTarget);
      function X(Q) {
        if (!J.current) {
          return;
        }
        const se = Q.target;
        if (Xe(J.current, se) || Xe(Z.current, se) || se === J.current) {
          return;
        }
        const he = Mb(J.current);
        if (!(Q.clientX >= he.left - wf) || !(Q.clientX <= he.right + wf) || !(Q.clientY >= he.top - wf) || !(Q.clientY <= he.bottom + wf)) {
          b(false, $e(LC, Q));
        }
      }
      ce.start(0, () => {
        oe.addEventListener("mouseup", X, {
          once: true
        });
      });
    }
  }, v.getValidationProps, d, ne);
  de.role = "combobox";
  const me = {
    ..._,
    open: j,
    disabled: I,
    value: z,
    readOnly: C,
    popupSide: F,
    placeholder: !L
  };
  return Je("button", n, {
    ref: [r, J],
    state: me,
    stateAttributesMapping: Lj,
    props: de
  });
});
const Bj = {
  value: () => null
};
const _Component91 = E.forwardRef(function (n, r) {
  const {
    className: i,
    render: o,
    children: u,
    placeholder: h,
    style: a,
    ...c
  } = n;
  const {
    store: d,
    valueRef: p
  } = ui();
  const f = Pe(d, bt.value);
  const S = Pe(d, bt.items);
  const _ = Pe(d, bt.itemToStringLabel);
  const x = Pe(d, bt.hasSelectedValue);
  const w = !x && h != null && u == null;
  const g = Pe(d, bt.hasNullItemLabel, w);
  const b = {
    value: f,
    placeholder: !x
  };
  let m = null;
  if (typeof u == "function") {
    m = u(f);
  } else if (u != null) {
    m = u;
  } else if (!x && h != null && !g) {
    m = h;
  } else if (Array.isArray(f)) {
    m = xB(f, S, _);
  } else {
    m = DR(f, S, _);
  }
  return Je("span", n, {
    state: b,
    ref: [r, p],
    props: [{
      children: m
    }, c],
    stateAttributesMapping: Bj
  });
});
const Nj = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    ...h
  } = n;
  const {
    store: a
  } = ui();
  const d = {
    open: Pe(a, bt.open)
  };
  return Je("span", n, {
    state: d,
    ref: r,
    props: [{
      "aria-hidden": true,
      children: "▼"
    }, h],
    stateAttributesMapping: ku
  });
});
const jj = E.createContext(undefined);
const Hj = E.forwardRef(function (n, r) {
  const {
    store: i
  } = ui();
  const o = Pe(i, bt.mounted);
  const u = Pe(i, bt.forceMount);
  if (o || u) {
    return <jj.Provider value={true}><_Component9 ref={r} {...n} /></jj.Provider>;
  } else {
    return null;
  }
});
const m2 = E.createContext(undefined);
function Hb() {
  const e = E.useContext(m2);
  if (!e) {
    throw new Error(Bt(59));
  }
  return e;
}
function ih(e, n) {
  if (e) {
    Object.assign(e.style, n);
  }
}
const g2 = {
  position: "relative",
  maxHeight: "100%",
  overflowX: "hidden",
  overflowY: "auto"
};
const Fj = {
  position: "fixed"
};
const Uj = E.forwardRef(function (n, r) {
  const {
    anchor: i,
    positionMethod: o = "absolute",
    className: u,
    render: h,
    side: a = "bottom",
    align: c = "center",
    sideOffset: d = 0,
    alignOffset: p = 0,
    collisionBoundary: f = "clipping-ancestors",
    collisionPadding: S,
    arrowPadding: _ = 5,
    sticky: x = false,
    disableAnchorTracking: w,
    alignItemWithTrigger: g = true,
    collisionAvoidance: b = tE,
    style: m,
    ...v
  } = n;
  const {
    store: C,
    listRef: T,
    labelsRef: A,
    alignItemWithTriggerActiveRef: M,
    selectedItemTextRef: R,
    valuesRef: I,
    initialValueRef: j,
    popupRef: W,
    setValue: z
  } = ui();
  const N = p2();
  const D = Pe(C, bt.open);
  const $ = Pe(C, bt.mounted);
  const G = Pe(C, bt.modal);
  const q = Pe(C, bt.value);
  const U = Pe(C, bt.openMethod);
  const L = Pe(C, bt.positionerElement);
  const F = Pe(C, bt.triggerElement);
  const P = Pe(C, bt.isItemEqualToValue);
  const V = Pe(C, bt.transitionStatus);
  const Z = E.useRef(null);
  const J = E.useRef(null);
  const [ne, ue] = E.useState(g);
  const ee = $ && ne && U !== "touch";
  if (!$ && ne !== g) {
    ue(g);
  }
  Fe(() => {
    if (!$) {
      if (bt.scrollUpArrowVisible(C.state)) {
        C.set("scrollUpArrowVisible", false);
      }
      if (bt.scrollDownArrowVisible(C.state)) {
        C.set("scrollDownArrowVisible", false);
      }
    }
  }, [C, $]);
  E.useImperativeHandle(M, () => ee);
  kb((ee || G) && D, U === "touch", L, F);
  const Y = Mh({
    anchor: i,
    floatingRootContext: N,
    positionMethod: o,
    mounted: $,
    side: a,
    sideOffset: d,
    align: c,
    alignOffset: p,
    arrowPadding: _,
    collisionBoundary: f,
    collisionPadding: S,
    sticky: x,
    disableAnchorTracking: w ?? ee,
    collisionAvoidance: b,
    keepMounted: true
  });
  const re = ee ? "none" : Y.side;
  const ce = ee ? Fj : Y.positionerStyles;
  const ge = {
    open: D,
    side: re,
    align: Y.align,
    anchorHidden: Y.anchorHidden
  };
  Fe(() => {
    C.set("popupSide", Y.side);
  }, [C, Y.side]);
  const de = je(X => {
    C.set("positionerElement", X);
  });
  const me = Oh(n, ge, {
    styles: ce,
    transitionStatus: V,
    props: v,
    refs: [r, de],
    hidden: !$,
    inert: !D
  });
  const H = E.useRef(0);
  const ae = je(X => {
    if (X.size === 0 && H.current === 0 || I.current.length === 0) {
      return;
    }
    const Q = H.current;
    H.current = X.size;
    if (X.size === Q) {
      return;
    }
    const se = $e(ur);
    if (Q !== 0 && !C.state.multiple && q !== null && Mo(I.current, q, P) === -1) {
      const ye = j.current;
      const Se = ye != null && Mo(I.current, ye, P) !== -1 ? ye : null;
      z(Se, se);
      if (Se === null) {
        C.set("selectedIndex", null);
        R.current = null;
      }
    }
    if (Q !== 0 && C.state.multiple && Array.isArray(q)) {
      const he = pe => Mo(I.current, pe, P) !== -1;
      const ye = q.filter(pe => he(pe));
      if (ye.length !== q.length || ye.some(pe => !AR(q, pe, P))) {
        z(ye, se);
        if (ye.length === 0) {
          C.set("selectedIndex", null);
          R.current = null;
        }
      }
    }
    if (D && ee) {
      C.update({
        scrollUpArrowVisible: false,
        scrollDownArrowVisible: false
      });
      const he = {
        height: ""
      };
      ih(L, he);
      ih(W.current, he);
    }
  });
  const oe = E.useMemo(() => ({
    ...Y,
    side: re,
    alignItemWithTriggerActive: ee,
    setControlledAlignItemWithTrigger: ue,
    scrollUpArrowRef: Z,
    scrollDownArrowRef: J
  }), [Y, re, ee, ue]);
  return <Iu elementsRef={T} labelsRef={A} onMapChange={ae}><m2.Provider value={oe}>{$ && G && <Ph inert={Kl(!D)} cutout={F} />}{me}</m2.Provider></Iu>;
});
const Vj = {
  ...jo,
  ...xs
};
const Wj = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    finalFocus: h,
    ...a
  } = n;
  const {
    store: c,
    popupRef: d,
    onOpenChangeComplete: p,
    setOpen: f,
    valueRef: S,
    firstItemTextRef: _,
    selectedItemTextRef: x,
    keyboardActiveRef: w,
    multiple: g,
    handleScrollArrowVisibility: b,
    scrollHandlerRef: m,
    listRef: v,
    highlightItemOnHover: C
  } = ui();
  const {
    side: T,
    align: A,
    alignItemWithTriggerActive: M,
    isPositioned: R,
    setControlledAlignItemWithTrigger: I,
    scrollDownArrowRef: j,
    scrollUpArrowRef: W
  } = Hb();
  const z = Tb() != null;
  const N = p2();
  const D = Us();
  const {
    nonce: $,
    disableStyleElements: G
  } = Bb();
  const q = Pe(c, bt.id);
  const U = Pe(c, bt.open);
  const L = Pe(c, bt.mounted);
  const F = Pe(c, bt.popupProps);
  const P = Pe(c, bt.transitionStatus);
  const V = Pe(c, bt.triggerElement);
  const Z = Pe(c, bt.positionerElement);
  const J = Pe(c, bt.listElement);
  const ne = E.useRef(false);
  const ue = E.useRef(false);
  const ee = E.useRef({});
  const Y = Vi();
  const re = je(me => {
    if (!Z || !d.current || !ue.current) {
      return;
    }
    if (ne.current || !M) {
      b();
      return;
    }
    const H = Z.style.top === "0px";
    const ae = Z.style.bottom === "0px";
    if (!H && !ae) {
      b();
      return;
    }
    const oe = Fx(Z);
    const X = Jc(Z.getBoundingClientRect().height, "y", oe);
    const Q = yt(Z);
    const se = getComputedStyle(Z);
    const he = parseFloat(se.marginTop);
    const ye = parseFloat(se.marginBottom);
    const pe = Hx(getComputedStyle(d.current));
    const Se = Math.min(Q.documentElement.clientHeight - he - ye, pe);
    const _e = me.scrollTop;
    const ie = Sf(me);
    let te = 0;
    let be = null;
    let ve = false;
    let Te = false;
    const Re = We => {
      Z.style.height = `${We}px`;
    };
    const ze = (We, lt) => {
      const dt = Un(We, 0, Se - X);
      if (dt > 0) {
        Re(X + dt);
      }
      me.scrollTop = lt;
      if (Se - (X + dt) <= Ps) {
        ne.current = true;
      }
      b();
    };
    const Be = H ? ie - _e : _e;
    const Ue = Math.min(X + Be, Se);
    te = Ue;
    if (Be <= Ps) {
      ze(Be, H ? ie : 0);
      return;
    }
    if (Se - Ue > Ps) {
      if (H) {
        Te = true;
      } else {
        be = 0;
      }
    } else {
      ve = true;
      if (ae && _e < ie) {
        const We = X + Be - Se;
        be = _e - (Be - We);
      }
    }
    te = Math.ceil(te);
    if (te !== 0) {
      Re(te);
    }
    if (Te || be != null) {
      const We = Sf(me);
      const lt = Te ? We : Un(be, 0, We);
      if (Math.abs(me.scrollTop - lt) > Ps) {
        me.scrollTop = lt;
      }
    }
    if (ve || te >= Se - Ps) {
      ne.current = true;
    }
    b();
  });
  E.useImperativeHandle(m, () => re, [re]);
  qr({
    open: U,
    ref: d,
    onComplete() {
      if (U) {
        if (p != null) {
          p(true);
        }
      }
    }
  });
  const ce = {
    open: U,
    transitionStatus: P,
    side: T,
    align: A
  };
  Fe(() => {
    if (!!Z && !!d.current && !Object.keys(ee.current).length) {
      ee.current = {
        top: Z.style.top || "0",
        left: Z.style.left || "0",
        right: Z.style.right,
        height: Z.style.height,
        bottom: Z.style.bottom,
        minHeight: Z.style.minHeight,
        maxHeight: Z.style.maxHeight,
        marginTop: Z.style.marginTop,
        marginBottom: Z.style.marginBottom
      };
    }
  }, [d, Z]);
  Fe(() => {
    if (!U && !M) {
      ue.current = false;
      ne.current = false;
      ih(Z, ee.current);
    }
  }, [U, M, Z, d]);
  Fe(() => {
    var ae;
    var oe;
    const me = d.current;
    if (!U || !V || !Z || !me || M && !R || c.state.transitionStatus === "ending") {
      return;
    }
    if (!M) {
      ue.current = true;
      Y.request(b);
      me.style.removeProperty("--transform-origin");
      return;
    }
    const H = $j(me);
    me.style.removeProperty("--transform-origin");
    try {
      let X = x.current;
      if (X == null || !X.isConnected) {
        X = !bt.hasSelectedValue(c.state) && (ae = _.current) != null && ae.isConnected ? _.current : null;
      }
      const Q = S.current;
      const se = getComputedStyle(Z);
      const he = getComputedStyle(me);
      const ye = yt(V);
      const pe = fn(Z);
      const Se = Fx(V);
      const _e = xf(V.getBoundingClientRect(), Se);
      const ie = xf(Z.getBoundingClientRect(), Se);
      const te = _e.height;
      const be = J || me;
      const ve = be.scrollHeight;
      const Te = parseFloat(he.borderBottomWidth);
      const Re = parseFloat(se.marginTop) || 10;
      const ze = parseFloat(se.marginBottom) || 10;
      const Be = parseFloat(se.minHeight) || 100;
      const Ue = Hx(he);
      const We = 5;
      const lt = 5;
      const dt = 20;
      const _t = ye.documentElement.clientHeight - Re - ze;
      const Dt = ye.documentElement.clientWidth;
      const kt = _t - _e.bottom + te;
      let Ge;
      let Ye = D === "rtl" ? _e.right - ie.width : _e.left;
      let Qe = 0;
      if (X && Q) {
        const tn = xf(Q.getBoundingClientRect(), Se);
        Ge = xf(X.getBoundingClientRect(), Se);
        Ye = ie.left + (D === "rtl" ? tn.right - Ge.right : tn.left - Ge.left);
        const Kt = tn.top - _e.top + tn.height / 2;
        Qe = Ge.top - ie.top + Ge.height / 2 - Kt;
      }
      const gt = kt + Qe + ze + Te;
      let ft = Math.min(_t, gt);
      const Ke = _t - Re - ze;
      const en = gt - ft;
      const St = Dt - lt;
      Z.style.left = `${Un(Ye, We, St - ie.width)}px`;
      Z.style.height = `${ft}px`;
      Z.style.maxHeight = "auto";
      Z.style.marginTop = `${Re}px`;
      Z.style.marginBottom = `${ze}px`;
      me.style.height = "100%";
      const it = Sf(be);
      const et = en >= it - Ps;
      if (et) {
        ft = Math.min(_t, ie.height) - (en - it);
      }
      const Wt = _e.top < dt || _e.bottom > _t - dt || Math.ceil(ft) + Ps < Math.min(ve, Be);
      const xt = (((oe = pe.visualViewport) == null ? undefined : oe.scale) ?? 1) !== 1 && ch;
      if (Wt || xt) {
        ue.current = true;
        ih(Z, ee.current);
        I(false);
        return;
      }
      const Ln = Math.max(Be, ft);
      if (et) {
        const tn = Math.max(0, _t - gt);
        Z.style.top = ie.height >= Ke ? "0" : `${tn}px`;
        Z.style.height = `${ft}px`;
        be.scrollTop = Sf(be);
      } else {
        Z.style.bottom = "0";
        be.scrollTop = en;
      }
      if (Ge) {
        const tn = ie.top;
        const Kt = ie.height;
        const ht = Ge.top + Ge.height / 2;
        const Zt = Kt > 0 ? (ht - tn) / Kt * 100 : 50;
        const nn = Un(Zt, 0, 100);
        me.style.setProperty("--transform-origin", `50% ${nn}%`);
      }
      if (Ln === _t || ft >= Ue) {
        ne.current = true;
      }
      b();
      if (C && c.state.selectedIndex === null && c.state.activeIndex === null && v.current[0] != null) {
        c.set("activeIndex", 0);
      }
      ue.current = true;
    } finally {
      H();
    }
  }, [c, U, Z, V, S, _, x, d, b, M, I, Y, j, W, J, v, C, D, R]);
  E.useEffect(() => {
    if (!M || !Z || !U) {
      return;
    }
    const me = fn(Z);
    function H(ae) {
      f(false, $e(d3, ae));
    }
    return Tt(me, "resize", H);
  }, [f, M, Z, U]);
  const ge = {
    ...(J ? {
      role: "presentation",
      "aria-orientation": undefined
    } : {
      role: "listbox",
      "aria-multiselectable": g || undefined,
      id: `${q}-list`
    }),
    onKeyDown(me) {
      w.current = true;
      if (z && Na.has(me.key)) {
        me.stopPropagation();
      }
    },
    onMouseMove() {
      w.current = false;
    },
    onScroll(me) {
      if (!J) {
        re(me.currentTarget);
      }
    },
    ...(M && {
      style: J ? {
        height: "100%"
      } : g2
    })
  };
  const de = Je("div", n, {
    ref: [r, d],
    state: ce,
    stateAttributesMapping: Vj,
    props: [F, ge, Au(P), {
      className: !J && M ? gu.className : undefined
    }, a]
  });
  return <E.Fragment>{!G && gu.getElement($)}<_Component8 context={N} modal={false} disabled={!L} returnFocus={h} restoreFocus={true}>{de}</_Component8></E.Fragment>;
});
function Hx(e) {
  const n = e.maxHeight || "";
  return n.endsWith("px") && parseFloat(n) || Infinity;
}
function Sf(e) {
  return zb(e.scrollHeight, e.clientHeight);
}
function Fx(e) {
  return gE.getScale(e);
}
function Jc(e, n, r) {
  return e / r[n];
}
function xf(e, n) {
  return uu({
    x: Jc(e.x, "x", n),
    y: Jc(e.y, "y", n),
    width: Jc(e.width, "x", n),
    height: Jc(e.height, "y", n)
  });
}
const Ux = [["transform", "none"], ["scale", "1"], ["translate", "0 0"]];
function $j(e) {
  const {
    style: n
  } = e;
  const r = {};
  for (const [i, o] of Ux) {
    r[i] = n.getPropertyValue(i);
    n.setProperty(i, o, "important");
  }
  return () => {
    for (const [i] of Ux) {
      const o = r[i];
      if (o) {
        n.setProperty(i, o);
      } else {
        n.removeProperty(i);
      }
    }
  };
}
const _Component92 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    ...h
  } = n;
  const {
    store: a,
    scrollHandlerRef: c
  } = ui();
  const {
    alignItemWithTriggerActive: d
  } = Hb();
  const p = Pe(a, bt.hasScrollArrows);
  const f = Pe(a, bt.openMethod);
  const S = Pe(a, bt.multiple);
  const x = {
    id: `${Pe(a, bt.id)}-list`,
    role: "listbox",
    "aria-multiselectable": S || undefined,
    onScroll(g) {
      var b;
      if ((b = c.current) != null) {
        b.call(c, g.currentTarget);
      }
    },
    ...(d && {
      style: g2
    }),
    className: p && f !== "touch" ? gu.className : undefined
  };
  const w = je(g => {
    a.set("listElement", g);
  });
  return Je("div", n, {
    ref: [r, w],
    props: [x, h]
  });
});
const v2 = E.createContext(undefined);
function Fb() {
  const e = E.useContext(v2);
  if (!e) {
    throw new Error(Bt(57));
  }
  return e;
}
const Gj = E.memo(E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    value: h = null,
    label: a,
    disabled: c = false,
    nativeButton: d = false,
    ...p
  } = n;
  const f = E.useRef(null);
  const S = za({
    label: a,
    textRef: f,
    indexGuessBehavior: Rb.GuessFromOrder
  });
  const {
    store: _,
    itemProps: x,
    setOpen: w,
    setValue: g,
    selectionRef: b,
    typingRef: m,
    valuesRef: v,
    multiple: C,
    selectedItemTextRef: T
  } = ui();
  const A = Pe(_, bt.isActive, S.index);
  const M = Pe(_, bt.isSelected, S.index, h);
  const R = Pe(_, bt.isSelectedByFocus, S.index);
  const I = Pe(_, bt.isItemEqualToValue);
  const j = S.index;
  const W = j !== -1;
  const z = E.useRef(null);
  Fe(() => {
    if (!W) {
      return;
    }
    const J = v.current;
    J[j] = h;
    return () => {
      delete J[j];
    };
  }, [W, j, h, v]);
  Fe(() => {
    if (!W) {
      return;
    }
    const J = _.state.value;
    let ne = J;
    if (C && Array.isArray(J) && J.length > 0) {
      ne = J[J.length - 1];
    }
    if (ne !== undefined && ai(h, ne, I)) {
      _.set("selectedIndex", j);
      if (f.current) {
        T.current = f.current;
      }
    }
  }, [W, j, C, I, _, h, T]);
  const N = E.useRef(null);
  const D = E.useRef("mouse");
  const $ = E.useRef(false);
  const {
    getButtonProps: G,
    buttonRef: q
  } = Es({
    disabled: c,
    focusableWhenDisabled: true,
    native: d,
    composite: true
  });
  const U = {
    disabled: c,
    selected: M,
    highlighted: A
  };
  function L(J) {
    const ne = _.state.value;
    if (C) {
      const ue = Array.isArray(ne) ? ne : [];
      const ee = M ? MR(ue, h, I) : [...ue, h];
      g(ee, $e(Ra, J));
    } else {
      g(h, $e(Ra, J));
      w(false, $e(Ra, J));
    }
  }
  function F() {
    b.current.dragY = 0;
  }
  const P = {
    role: "option",
    "aria-selected": M,
    tabIndex: A ? 0 : -1,
    onKeyDown(J) {
      N.current = J.key;
      _.set("activeIndex", j);
      if (J.key === " " && m.current) {
        J.preventDefault();
      }
    },
    onClick(J) {
      const ne = J.type === "click" && D.current !== "touch";
      const ue = J.nativeEvent.pointerType;
      const ee = ne && Wv(J.nativeEvent) && (ue !== undefined || A);
      const Y = ne && !ee && !$.current;
      $.current = false;
      if (J.type !== "keydown" || N.current !== null) {
        if (!c && (J.type !== "keydown" || N.current !== " " || !m.current) && !Y) {
          N.current = null;
          L(J.nativeEvent);
        }
      }
    },
    onPointerEnter(J) {
      D.current = J.pointerType;
    },
    onPointerMove(J) {
      if (J.pointerType === "mouse" && J.buttons === 1) {
        const ne = b.current;
        ne.dragY += J.movementY;
        if (ne.dragY ** 2 >= 64) {
          ne.allowUnselectedMouseUp = true;
        }
      }
    },
    onPointerDown(J) {
      D.current = J.pointerType;
      $.current = true;
      F();
    },
    onMouseUp() {
      var ue;
      F();
      if (c || D.current === "touch" || $.current) {
        return;
      }
      const J = !b.current.allowSelectedMouseUp && M;
      const ne = !b.current.allowUnselectedMouseUp && !M;
      if (!J && !ne) {
        $.current = true;
        if ((ue = z.current) != null) {
          ue.click();
        }
        $.current = false;
      }
    }
  };
  const V = Je("div", n, {
    ref: [q, r, S.ref, z],
    state: U,
    props: [x, P, p, G]
  });
  const Z = E.useMemo(() => ({
    selected: M,
    index: j,
    textRef: f,
    selectedByFocus: R,
    hasRegistered: W
  }), [M, j, f, R, W]);
  return <v2.Provider value={Z}>{V}</v2.Provider>;
}));
const Yj = E.forwardRef(function (n, r) {
  const i = n.keepMounted ?? false;
  const {
    selected: o
  } = Fb();
  if (i || o) {
    return <Xj {...n} ref={r} />;
  } else {
    return null;
  }
});
const Xj = E.memo(E.forwardRef((e, n) => {
  const {
    render: r,
    className: i,
    style: o,
    keepMounted: u,
    ...h
  } = e;
  const {
    selected: a
  } = Fb();
  const c = E.useRef(null);
  const {
    transitionStatus: d,
    setMounted: p
  } = zo(a);
  const S = Je("span", e, {
    ref: [n, c],
    state: {
      selected: a,
      transitionStatus: d
    },
    props: [{
      "aria-hidden": true,
      children: "✔️"
    }, h],
    stateAttributesMapping: xs
  });
  qr({
    open: a,
    ref: c,
    onComplete() {
      if (!a) {
        p(false);
      }
    }
  });
  return S;
}));
const Kj = E.memo(E.forwardRef(function (n, r) {
  const {
    index: i,
    textRef: o,
    selectedByFocus: u,
    hasRegistered: h
  } = Fb();
  const {
    firstItemTextRef: a,
    selectedItemTextRef: c
  } = ui();
  const {
    render: d,
    className: p,
    style: f,
    ...S
  } = n;
  const _ = E.useCallback(w => {
    if (w) {
      if (h && i === 0) {
        a.current = w;
      }
      if (h && u) {
        c.current = w;
      }
    }
  }, [a, c, i, u, h]);
  return Je("div", n, {
    ref: [_, r, o],
    props: S
  });
}));
const _Component90 = E.forwardRef(function (n, r) {
  const {
    render: i,
    className: o,
    style: u,
    direction: h,
    keepMounted: a = false,
    ...c
  } = n;
  const d = h === "up";
  const {
    store: p,
    popupRef: f,
    listRef: S,
    handleScrollArrowVisibility: _,
    scrollArrowsMountedCountRef: x
  } = ui();
  const {
    side: w,
    scrollDownArrowRef: g,
    scrollUpArrowRef: b
  } = Hb();
  const m = d ? bt.scrollUpArrowVisible : bt.scrollDownArrowVisible;
  const v = Pe(p, m);
  const C = Pe(p, bt.openMethod);
  const T = v && C !== "touch";
  const A = xn();
  const M = d ? b : g;
  const {
    transitionStatus: R,
    setMounted: I
  } = zo(T);
  Fe(() => {
    x.current += 1;
    if (!p.state.hasScrollArrows) {
      p.set("hasScrollArrows", true);
    }
    return () => {
      x.current = Math.max(0, x.current - 1);
      if (x.current === 0 && p.state.hasScrollArrows) {
        p.set("hasScrollArrows", false);
      }
    };
  }, [p, x]);
  qr({
    open: T,
    ref: M,
    onComplete() {
      if (!T) {
        I(false);
      }
    }
  });
  const z = Je("div", n, {
    ref: [r, M],
    state: {
      direction: h,
      visible: T,
      side: w,
      transitionStatus: R
    },
    props: [{
      "aria-hidden": true,
      children: d ? "▲" : "▼",
      style: {
        position: "absolute"
      },
      onMouseMove(D) {
        if (D.movementX === 0 && D.movementY === 0 || A.isStarted()) {
          return;
        }
        p.set("activeIndex", null);
        function $() {
          var P;
          const G = p.state.listElement ?? f.current;
          if (!G) {
            return;
          }
          p.set("activeIndex", null);
          _();
          const q = zb(G.scrollHeight, G.clientHeight);
          const U = Vl(G.scrollTop, q);
          const L = U === (d ? 0 : q);
          const F = S.current;
          if (U !== G.scrollTop) {
            G.scrollTop = U;
          }
          if (F.length === 0) {
            p.set(d ? "scrollUpArrowVisible" : "scrollDownArrowVisible", !L);
          }
          if (L) {
            A.clear();
            return;
          }
          if (F.length > 0) {
            const V = ((P = M.current) == null ? undefined : P.offsetHeight) || 0;
            G.scrollTop = Zj(F, d, U, G.clientHeight, V, q);
          }
          A.start(40, $);
        }
        A.start(40, $);
      },
      onMouseLeave() {
        A.clear();
      }
    }, c]
  });
  if (T || a) {
    return z;
  } else {
    return null;
  }
});
function Zj(e, n, r, i, o, u) {
  if (n) {
    let p = 0;
    const f = r + o - Ps;
    for (let x = 0; x < e.length; x += 1) {
      const w = e[x];
      if (w && w.offsetTop >= f) {
        p = x;
        break;
      }
    }
    const S = Math.max(0, p - 1);
    const _ = e[S];
    if (S < p && _) {
      return Vl(_.offsetTop - o, u);
    } else {
      return 0;
    }
  }
  let h = e.length - 1;
  const a = r + i - o + Ps;
  for (let p = 0; p < e.length; p += 1) {
    const f = e[p];
    if (f && f.offsetTop + f.offsetHeight > a) {
      h = Math.max(0, p - 1);
      break;
    }
  }
  const c = Math.min(e.length - 1, h + 1);
  const d = e[c];
  if (c > h && d) {
    return Vl(d.offsetTop + d.offsetHeight - i + o, u);
  } else {
    return u;
  }
}
const Qj = E.forwardRef(function (n, r) {
  return <_Component90 {...n} ref={r} direction="down" />;
});
const Jj = E.forwardRef(function (n, r) {
  return <_Component90 {...n} ref={r} direction="up" />;
});
const _Component98 = Dj;
const t8 = $1("relative inline-flex min-h-9 w-full min-w-36 select-none items-center justify-between gap-2 rounded-lg border border-input bg-background not-dark:bg-clip-padding px-[calc(--spacing(3)-1px)] text-left text-base text-foreground shadow-xs/5 outline-none ring-ring/24 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-data-disabled:not-focus-visible:not-aria-invalid:not-data-pressed:before:shadow-[0_1px_--theme(--color-black/4%)] pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/16 data-disabled:pointer-events-none data-disabled:opacity-64 sm:min-h-8 sm:text-sm dark:bg-input/32 dark:aria-invalid:ring-destructive/24 dark:not-data-disabled:not-focus-visible:not-aria-invalid:not-data-pressed:before:shadow-[0_-1px_--theme(--color-white/6%)] [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0 [[data-disabled],:focus-visible,[aria-invalid],[data-pressed]]:shadow-none", {
  defaultVariants: {
    size: "default"
  },
  variants: {
    size: {
      default: "",
      lg: "min-h-10 sm:min-h-9",
      sm: "min-h-8 gap-1.5 px-[calc(--spacing(2.5)-1px)] sm:min-h-7"
    }
  }
});
const n8 = "-me-1 size-4.5 opacity-80 sm:size-4";
function _Component95({
  className: e,
  size: n = "default",
  children: r,
  ...i
}) {
  return <Pj className={pt(t8({
    size: n
  }), e)} data-slot="select-trigger" {...i}>{r}<Nj data-slot="select-icon"><_Component39 className={n8} /></Nj></Pj>;
}
function _Component94({
  className: e,
  ...n
}) {
  return <_Component91 className={pt("flex-1 truncate data-placeholder:text-muted-foreground", e)} data-slot="select-value" {...n} />;
}
function _Component97({
  className: e,
  children: n,
  side: r = "bottom",
  sideOffset: i = 4,
  align: o = "start",
  alignOffset: u = 0,
  alignItemWithTrigger: h = true,
  anchor: a,
  portalProps: c,
  ...d
}) {
  return <Hj {...c}><Uj align={o} alignItemWithTrigger={h} alignOffset={u} anchor={a} className="z-50 select-none" data-slot="select-positioner" side={r} sideOffset={i}><Wj className="origin-(--transform-origin) text-foreground outline-none" data-slot="select-popup" {...d}><Jj className="top-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:top-px before:h-[200%] before:rounded-t-[calc(var(--radius-lg)-1px)] before:bg-linear-to-b before:from-50% before:from-popover" data-slot="select-scroll-up-arrow"><_Component28 className="relative size-4.5 sm:size-4" /></Jj><div className="relative h-full min-w-(--anchor-width) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]"><_Component92 className={pt("max-h-(--available-height) overflow-y-auto p-1", e)} data-slot="select-list">{n}</_Component92></div><Qj className="bottom-0 z-50 flex h-6 w-full cursor-default items-center justify-center before:pointer-events-none before:absolute before:inset-x-px before:bottom-px before:h-[200%] before:rounded-b-[calc(var(--radius-lg)-1px)] before:bg-linear-to-t before:from-50% before:from-popover" data-slot="select-scroll-down-arrow"><_Component29 className="relative size-4.5 sm:size-4" /></Qj></Wj></Uj></Hj>;
}
function _Component96({
  className: e,
  children: n,
  ...r
}) {
  return <Gj className={pt("grid min-h-8 in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default grid-cols-[1rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0", e)} data-slot="select-item" {...r}><Yj className="col-start-1"><svg aria-hidden="true" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M5.252 12.7 10.2 18.63 18.748 5.37" /></svg></Yj><Kj className="col-start-2 min-w-0">{n}</Kj></Gj>;
}
function Vx({
  className: e,
  render: n,
  ...r
}) {
  const i = {
    className: pt("inline-flex items-center gap-2 font-medium text-base/4.5 text-foreground sm:text-sm/4", e),
    "data-slot": "label"
  };
  return wu({
    defaultTagName: "label",
    props: Sn(i, r),
    render: n
  });
}
function _Component110({
  open: e,
  workspace: n,
  windows: r,
  widgets: i,
  workspaces: o,
  homeId: u,
  onConfirm: h,
  onCancel: a
}) {
  const [c, d] = E.useState("close");
  const [p, f] = E.useState("");
  const {
    t: S
  } = Lr();
  E.useEffect(() => {
    var g;
    if (e) {
      const b = r.length === 0 && i.length === 0;
      d(b ? "close" : "move");
      const m = [...o.values()].filter(v => v.id !== (n == null ? undefined : n.id));
      f(((g = m[0]) == null ? undefined : g.id) || "");
    }
  }, [e, n, r, i, o, u]);
  if (!n) {
    return null;
  }
  const _ = r.length;
  const x = i.length;
  const w = [...o.values()].filter(g => g.id !== n.id);
  return <_Component77 open={e} onOpenChange={g => {
    if (!g) {
      a();
    }
  }}><Hh showCloseButton={false} className="sm:max-w-sm z-[400]"><Fh><div className="flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive"><Su size={20} /></div><div className="min-w-0"><Vh>{S("workspace.deleteTitle")}</Vh><Wh>{S("workspace.deleteDesc", {
                name: n.name
              })}</Wh></div></div></Fh><_Component99><div className="space-y-1.5 mb-4 text-sm">{_ > 0 && <div className="flex items-center gap-2 text-foreground"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8" /><path d="M12 17v4" /></svg>{S("workspace.deleteWindows", {
              count: _
            })}</div>}{x > 0 && <div className="flex items-center gap-2 text-foreground"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>{S("workspace.deleteWidgets", {
              count: x
            })}</div>}{_ === 0 && x === 0 && <div className="text-muted-foreground">{S("workspace.deleteEmpty")}</div>}</div>{(_ > 0 || x > 0) && <Oj value={c} onValueChange={d} className="gap-2"><Vx className="flex items-start gap-3 rounded-lg border border-border p-3 cursor-pointer transition-colors has-data-checked:border-primary has-data-checked:bg-primary/5"><_Component93 value="move" /><div className="min-w-0 flex-1"><span className="text-sm font-medium">{S("workspace.moveToOther")}</span>{c === "move" && w.length > 0 && <_Component98 value={p} onValueChange={f}><_Component95 className="mt-2 w-full" size="sm" onClick={g => g.stopPropagation()}><_Component94 placeholder={S("icon.selectTarget")} /></_Component95><_Component97>{w.map(g => <_Component96 value={g.id} key={g.id}>{g.name}</_Component96>)}</_Component97></_Component98>}{c === "move" && w.length === 0 && <p className="mt-1 text-xs text-muted-foreground">{S("workspace.noOtherWorkspace")}</p>}</div></Vx><Vx className="flex items-start gap-3 rounded-lg border border-border p-3 cursor-pointer transition-colors has-data-checked:border-primary has-data-checked:bg-primary/5"><_Component93 value="close" /><div className="min-w-0"><span className="text-sm font-medium">{S("workspace.closeAppsAndDelete")}</span></div></Vx></Oj>}</_Component99><Uh><Jn type="button" variant="ghost" onClick={a}>{S("workspace.cancel")}</Jn><Jn variant="destructive" disabled={c === "move" && w.length === 0 || c === "move" && !p} onClick={() => h(c, p)}>{S("workspace.confirmDelete")}</Jn></Uh></Hh></_Component77>;
}
function _Component111({
  open: e,
  defaultName: n,
  onConfirm: r,
  onCancel: i
}) {
  const [o, u] = E.useState("");
  const h = E.useRef(null);
  const {
    t: a
  } = Lr();
  E.useEffect(() => {
    if (e) {
      u(n || "");
    }
  }, [e, n]);
  E.useEffect(() => {
    if (e && h.current) {
      const d = h.current;
      d.focus();
      d.select();
    }
  }, [e]);
  const c = d => {
    d.preventDefault();
    const p = o.trim();
    if (p) {
      r(p);
      u("");
    }
  };
  return <_Component77 open={e} onOpenChange={d => {
    if (!d) {
      i();
    }
  }}><Hh showCloseButton={false} className="sm:max-w-sm z-[400]"><Fh><div className="flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><_Component32 size={20} /></div><div className="min-w-0"><Vh>{a("workspace.createTitle")}</Vh><Wh>{a("workspace.createDesc")}</Wh></div></div></Fh><form onSubmit={c} className="contents"><_Component99><Sb ref={h} type="text" nativeInput={true} value={o} onChange={d => u(d.target.value)} placeholder={a("workspace.namePlaceholder")} onKeyDown={d => {
            if (d.key === "Escape") {
              i();
            }
          }} /></_Component99><Uh><Jn type="button" variant="ghost" onClick={i}>{a("workspace.cancel")}</Jn><Jn type="submit" disabled={!o.trim()}>{a("workspace.create")}</Jn></Uh></form></Hh></_Component77>;
}
function _Component112({
  open: e,
  checks: n,
  onRetry: r
}) {
  var o;
  const {
    t: i
  } = Lr();
  return <_Component77 open={e} onOpenChange={() => {}}><Hh showCloseButton={false} className="sm:max-w-md z-[500]"><Fh><Vh>{i("compat.title")}</Vh><Wh>{i("compat.desc")}</Wh></Fh><div className="px-6 pb-2"><div className="rounded-lg border bg-muted/40 divide-y">{n.map(u => <div className="flex items-center gap-3 px-4 py-2.5 text-sm" key={u.id}><span className={u.passed === false ? "text-red-500" : "text-green-500"}>{u.passed === false ? "✗" : "✓"}</span><span className="flex-1 font-medium">{u.label}</span><span className={u.passed === false ? "text-red-500 text-xs" : u.passed === null ? "text-muted-foreground text-xs" : "text-green-600 text-xs"}>{u.passed === false ? i("compat.statusFailed") : u.passed === null ? i("compat.statusUnknown") : i("compat.statusPassed")}</span></div>)}</div></div><div className="px-6 pb-1">{n.some(u => u.hint) && <p className="text-xs text-muted-foreground mb-2">{(o = n.find(u => u.hint)) == null ? undefined : o.hint}</p>}<p className="text-sm font-medium text-foreground">{i("compat.recommend")}</p></div><Uh><Jn onClick={r}>{i("compat.refresh")}</Jn></Uh></Hh></_Component77>;
}
const y2 = "dock-config";
const _2 = {
  position: "bottom",
  autoHide: false,
  autoHideDelay: 1000
};
let ni = null;
function w2() {
  if (ni) {
    return {
      ...ni
    };
  } else {
    return {
      ..._2
    };
  }
}
async function u8() {
  const e = await _u(y2);
  if (e && e.position && ["top", "bottom", "left", "right"].includes(e.position)) {
    ni = {
      position: e.position,
      autoHide: !!e.autoHide,
      autoHideDelay: e.autoHideDelay || 1000
    };
  } else {
    ni = {
      ..._2
    };
  }
  window.dispatchEvent(new CustomEvent("dock-settings-changed", {
    detail: ni
  }));
  return ni;
}
async function Ml(e) {
  if (!e) {
    throw new Error("settings is required");
  }
  const n = {
    ...w2()
  };
  if (e.position !== undefined) {
    const r = ["top", "bottom", "left", "right"];
    if (!r.includes(e.position)) {
      throw new Error(`Invalid position: ${e.position}. Must be one of: ${r.join(", ")}`);
    }
    n.position = e.position;
  }
  if (e.autoHide !== undefined) {
    n.autoHide = !!e.autoHide;
  }
  if (e.autoHideDelay !== undefined) {
    n.autoHideDelay = Math.max(200, Math.min(5000, e.autoHideDelay));
  }
  ni = n;
  await yu(y2, ni);
  window.dispatchEvent(new CustomEvent("dock-settings-changed", {
    detail: ni
  }));
  return ni;
}
const S2 = "theme";
let Bi = "system";
function Rv() {
  if (Bi === "system") {
    try {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      } else {
        return "light";
      }
    } catch {
      return "light";
    }
  }
  return Bi;
}
function d8() {
  return Bi;
}
async function f8() {
  Bi = (await _u(S2)) || "system";
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (Bi === "system") {
      window.dispatchEvent(new CustomEvent("theme-changed", {
        detail: {
          mode: Bi,
          effective: Rv()
        }
      }));
    }
  });
  window.dispatchEvent(new CustomEvent("theme-changed", {
    detail: {
      mode: Bi,
      effective: Rv()
    }
  }));
  return Bi;
}
async function Wx(e) {
  Bi = e;
  await yu(S2, e);
  window.dispatchEvent(new CustomEvent("theme-changed", {
    detail: {
      mode: e,
      effective: Rv()
    }
  }));
}
const h8 = {
  id: "__preview__",
  name: "Preview",
  type: "gui",
  icon: "/preview-app-icon.svg",
  defaultWidth: 900,
  defaultHeight: 600
};
const _Component101 = Dn.memo(function ({
  app: n,
  iconInfo: r,
  isDragging: i,
  onDoubleClick: o,
  onContextMenu: u,
  onDragStart: h,
  onDragEnd: a
}) {
  return <div data-desktop-icon={true} className="no-swipe" style={{
    willChange: i ? "transform" : "auto"
  }}><_Component100 app={n} x={r.x} y={r.y} isDragging={i} onDoubleClick={o} onContextMenu={u} onDragStart={h} onDragEnd={a} /></div>;
});
const _Component102 = Dn.memo(function ({
  widget: n,
  serverUrl: r,
  isAppRunning: i,
  onAutoStart: o,
  isDragging: u,
  isResizing: h,
  onDragStart: a,
  onDragEnd: c,
  onResizeStart: d,
  onContextMenu: p,
  onOpenApp: f,
  onToggleLock: S,
  onDelete: _,
  onUpdateBackground: x,
  refreshKey: w,
  onRefresh: g,
  showBgConfig: b,
  onShowBgConfigChange: m
}) {
  return <div data-desktop-widget={true} className="relative pointer-events-auto no-swipe" style={{
    willChange: u || h ? "transform" : "auto"
  }}><Xz widget={n} serverUrl={r} isAppRunning={i} onAutoStart={o} isDragging={u} isResizing={h} onDragStart={a} onDragEnd={c} onResizeStart={d} onContextMenu={p} onOpenApp={f} onToggleLock={S} onDelete={_} onUpdateBackground={x} refreshKey={w} onRefresh={g} showBgConfig={b} onShowBgConfigChange={m} /></div>;
});
function _Component113() {
  var Bu;
  var zu;
  var Nu;
  var sc;
  var ju;
  const {
    t: e
  } = Lr();
  const {
    wc: n,
    bootState: r,
    bootError: i,
    bootDescription: o,
    daemonReady: u,
    compatibilityResult: h,
    registerPort: a,
    unregisterAppPorts: c,
    syncSharedData: d
  } = kO();
  const {
    windows: p,
    focusedWindowId: f,
    createWindow: S,
    updateWindow: _,
    closeWindow: x,
    focusWindow: w,
    minimizeWindow: g,
    toggleMaximize: b,
    moveWindow: m,
    resizeWindow: v
  } = AO();
  const {
    workspaces: C,
    activeWorkspaceId: T,
    loaded: A,
    createWorkspace: M,
    renameWorkspace: R,
    deleteWorkspace: I,
    switchWorkspace: j,
    HOME_ID: W
  } = CN();
  const z = E.useMemo(() => [...C.values()].sort((fe, Ce) => fe.createdAt - Ce.createdAt), [C]);
  const N = E.useCallback(fe => {
    const Ce = z[fe.activeIndex];
    if (Ce && Ce.id !== T) {
      j(Ce.id);
    }
  }, [C, T, j]);
  const D = E.useCallback(fe => {
    const Ce = z.findIndex(Ie => Ie.id === fe);
    if (Ce >= 0 && _r.current) {
      _r.current.slideTo(Ce);
    }
  }, [C]);
  const {
    wallpaper: $,
    wallpaperBlobUrl: G,
    saveWallpaper: q,
    resetWallpaper: U
  } = EN(T);
  const [L, F] = E.useState(0);
  const P = E.useCallback(async fe => {
    await q(fe);
    F(Ce => Ce + 1);
  }, [q]);
  const V = ou({
    pointer: "coarse"
  });
  const Z = D1(({
    x: fe,
    y: Ce
  }) => {
    Te({
      type: "desktop",
      x: fe,
      y: Ce
    });
  });
  const J = E.useCallback(async () => {
    await U();
    F(fe => fe + 1);
  }, [U]);
  const ne = E.useCallback(async fe => (await rv(fe)) || {
    type: "default",
    data: null,
    mimeType: null,
    overlay: null,
    overlayOpacity: 0,
    blur: 0
  }, []);
  const ue = E.useCallback(async (fe, Ce) => {
    if (fe === T) {
      await q(Ce);
    } else {
      const Ie = {
        workspaceId: fe,
        ...Ce
      };
      await S1(Ie);
    }
    F(Ie => Ie + 1);
  }, [T, q]);
  const ee = E.useCallback(async fe => {
    if (fe === T) {
      await U();
    } else {
      await sv(fe);
    }
    F(Ce => Ce + 1);
  }, [T, U]);
  const Y = E.useRef(p);
  Y.current = p;
  const re = E.useRef(null);
  const ce = E.useRef(new Map());
  const ge = E.useCallback(fe => {
    if (fe.type === "install-start" || fe.type === "update-start") {
      const Ce = fe.appId;
      const Ie = jn.add({
        title: fe.type === "install-start" ? e("toast.appInstallingTitle", {
          name: fe.appName,
          version: fe.version
        }) : e("toast.appUpdatingTitle", {
          name: fe.appName,
          newVersion: fe.newVersion
        }),
        description: fe.description || undefined,
        type: "loading",
        timeout: 600000
      });
      ce.current.set(Ce, Ie);
    } else if (fe.type === "install-end") {
      const Ce = fe.appId;
      const Ie = ce.current.get(Ce);
      if (Ie) {
        jn.update(Ie, {
          title: e("toast.appInstalled"),
          description: e("toast.appInstalledDesc", {
            name: fe.appName,
            version: fe.version
          }),
          type: "success",
          timeout: 3000
        });
        ce.current.delete(Ce);
      }
    } else if (fe.type === "update-end") {
      const Ce = fe.appId;
      const Ie = ce.current.get(Ce);
      if (Ie) {
        jn.update(Ie, {
          title: e("toast.appUpdated"),
          description: e("toast.appUpdatedDesc", {
            name: fe.appName,
            oldVersion: fe.oldVersion,
            newVersion: fe.newVersion
          }),
          type: "success",
          timeout: 3000
        });
        ce.current.delete(Ce);
      }
    } else if (fe.type === "install-error" || fe.type === "update-error") {
      const Ce = fe.appId;
      const Ie = ce.current.get(Ce);
      if (Ie) {
        jn.close(Ie);
        ce.current.delete(Ce);
      }
    }
  }, [e]);
  const {
    installedApps: de,
    runningApps: me,
    installAndRunApp: H,
    closeApp: ae,
    forceCleanupAppServer: oe,
    updateServerUrl: X,
    isAppRunning: Q,
    getServerInfo: se,
    reloadInstalledApps: he,
    initialized: ye
  } = ZO(n, {
    onBuiltinProgress: ge
  });
  const pe = E.useRef(de);
  pe.current = de;
  const Se = E.useRef(null);
  const _e = E.useRef(null);
  const ie = E.useRef(null);
  const te = E.useRef(new Map());
  const be = E.useRef(new Set());
  const [ve, Te] = E.useState(null);
  const [Re, ze] = E.useState(null);
  const [Be, Ue] = E.useState(null);
  const [We, lt] = E.useState({
    open: false,
    widget: null
  });
  const [dt, _t] = E.useState({});
  const [Dt, kt] = E.useState(null);
  const [Ge, Ye] = E.useState({
    open: false,
    workspace: null
  });
  const [Qe, gt] = E.useState({
    open: false
  });
  const [ft, Ke] = E.useState(false);
  const [en, St] = E.useState(false);
  const [it, et] = E.useState(xr());
  const [Wt, xt] = E.useState(w2());
  const [Ln, tn] = E.useState(xb());
  const [Kt, ht] = E.useState(d8());
  const [Zt, nn] = E.useState(false);
  E.useEffect(() => {
    $O().then(et);
  }, []);
  E.useEffect(() => {
    u8().then(xt);
  }, []);
  E.useEffect(() => {
    c4().then(tn);
  }, []);
  E.useEffect(() => {
    f8();
  }, []);
  E.useEffect(() => {
    const fe = Ce => xt(Ce.detail);
    window.addEventListener("dock-settings-changed", fe);
    return () => window.removeEventListener("dock-settings-changed", fe);
  }, []);
  E.useEffect(() => {
    const fe = Ce => tn(Ce.detail);
    window.addEventListener("terminal-bg-changed", fe);
    return () => window.removeEventListener("terminal-bg-changed", fe);
  }, []);
  const $t = E.useCallback(fe => {
    document.querySelectorAll("iframe[data-window-id], iframe[data-widget-id]").forEach(Ce => {
      if (Ce != null && Ce.contentWindow) {
        Ce.contentWindow.postMessage(fe, "*");
      }
    });
  }, []);
  E.useEffect(() => {
    const fe = Ce => {
      ht(Ce.detail.mode);
      document.documentElement.classList.toggle("dark", Ce.detail.effective === "dark");
      $t({
        type: "theme-changed",
        theme: Ce.detail.effective,
        mode: Ce.detail.mode
      });
    };
    window.addEventListener("theme-changed", fe);
    return () => window.removeEventListener("theme-changed", fe);
  }, [$t]);
  E.useEffect(() => {
    const fe = Ce => {
      if ((Ce.metaKey || Ce.ctrlKey) && Ce.key === "p") {
        Ce.preventDefault();
        nn(Ie => !Ie);
      }
    };
    document.addEventListener("keydown", fe);
    return () => document.removeEventListener("keydown", fe);
  }, []);
  const Ft = E.useRef({});
  const sn = E.useRef(new Map());
  const {
    allWidgets: zt,
    widgetPositions: Et,
    dragState: or,
    dragTarget: Rs,
    isDragging: Yr,
    resizeState: dr,
    resizeTarget: us,
    isResizing: Xr,
    addWidget: yr,
    removeWidget: Tr,
    removeWidgetsByApp: fr,
    handleDragStart: _n,
    handleDragMove: Wo,
    handleDragEnd: qn,
    handleResizeStart: Gn,
    handleResizeMove: Ts,
    handleResizeEnd: Fa,
    toggleWidgetLock: $o,
    removeWidgetsByWorkspace: qo,
    moveWidgetsToWorkspace: Gi,
    updateWidgetBackground: di
  } = pD(de, T, Ft);
  const {
    desktopIcons: hr,
    dragState: kr,
    dragTarget: Pn,
    isDragging: ks,
    handleDragStart: Ar,
    handleDragMove: ar,
    handleDragEnd: ds,
    findEmptyCell: Pr,
    savePosition: Ua,
    removePosition: er,
    removeIconsByWorkspace: Vs,
    moveIconsToWorkspace: Go,
    moveIconToWorkspace: As
  } = nD(de, T, Et, zt);
  E.useEffect(() => {
    Ft.current = hr;
  }, [hr]);
  E.useEffect(() => {
    const fe = Ce => {
      const {
        port: Ie,
        url: Ve,
        appId: ct
      } = Ce.detail;
      X(ct, Ve);
      for (const [vt, Rt] of Y.current) {
        if (Rt.appId === ct) {
          _(vt, {
            status: "ready",
            statusText: "Ready",
            serverUrl: Ve
          });
        }
      }
    };
    window.addEventListener("server-ready", fe);
    return () => window.removeEventListener("server-ready", fe);
  }, [_, X]);
  const Kr = E.useCallback((fe, Ce, Ie) => {
    const Ve = S(h8, Ie || T);
    _(Ve, {
      serverUrl: fe,
      status: "ready",
      statusText: "Ready",
      title: `Preview :${Ce}`
    });
    return Ve;
  }, [S, _, T]);
  E.useEffect(() => {
    const fe = Ce => {
      const {
        port: Ie,
        url: Ve
      } = Ce.detail;
      if (Ie < 3000) {
        return;
      }
      const ct = jn.add({
        title: e("toast.httpDetected"),
        description: e("toast.httpDetectedDesc", {
          port: Ie
        }),
        type: "info",
        timeout: 10000,
        actionProps: {
          children: e("toast.preview"),
          onClick: () => {
            jn.close(ct);
            const vt = Kr(Ve, Ie);
            w(vt);
          }
        }
      });
    };
    window.addEventListener("server-ready-unregistered", fe);
    return () => window.removeEventListener("server-ready-unregistered", fe);
  }, [Kr, w, e]);
  E.useEffect(() => {
    if (r === "booting") {
      const fe = o || e("toast.systemBootingDesc");
      if (re.current) {
        jn.update(re.current, {
          title: e("toast.systemBooting"),
          description: fe
        });
      } else {
        re.current = jn.add({
          title: e("toast.systemBooting"),
          description: fe,
          type: "loading",
          timeout: 600000
        });
      }
    } else if (r === "ready" && !ye) {
      const fe = e("toast.loadingApps");
      if (re.current) {
        jn.update(re.current, {
          title: e("toast.systemBooting"),
          description: fe
        });
      } else {
        re.current = jn.add({
          title: e("toast.systemBooting"),
          description: fe,
          type: "loading",
          timeout: 600000
        });
      }
    } else if (r === "ready" && ye && re.current) {
      jn.update(re.current, {
        title: e("toast.systemReady"),
        description: e("toast.systemReadyDesc"),
        type: "success",
        timeout: 2000
      });
      re.current = null;
    } else if (r === "error") {
      if (h && !h.supported) {
        if (re.current) {
          jn.close(re.current);
          re.current = null;
        }
        St(true);
      } else {
        const fe = {
          title: e("toast.bootFailed"),
          description: (i == null ? undefined : i.message) || e("toast.bootFailedDesc"),
          type: "error",
          timeout: 600000,
          actionProps: {
            children: e("toast.retry"),
            onClick: () => window.location.reload()
          }
        };
        if (re.current) {
          jn.update(re.current, fe);
        } else {
          re.current = jn.add(fe);
        }
        re.current = null;
      }
    }
  }, [r, i, o, h, ye, e]);
  E.useEffect(() => {
    const fe = Ce => {
      const {
        title: Ie,
        description: Ve,
        type: ct,
        duration: vt
      } = Ce.detail || {};
      if (Ie) {
        jn.add({
          title: Ie,
          description: Ve || "",
          type: ct || "info",
          timeout: vt || 3000
        });
      }
    };
    window.addEventListener("daemon-toast", fe);
    return () => window.removeEventListener("daemon-toast", fe);
  }, []);
  E.useEffect(() => {
    const Ce = async Ie => {
      var Ct;
      var Mr;
      const {
        requestId: Ve,
        apiType: ct,
        payload: vt
      } = Ie.detail;
      if ((Ct = n == null ? undefined : n._daemonInfo) == null || !Ct.process) {
        return;
      }
      const Rt = {
        systemVersion: zx.version,
        workdir: ((Mr = Se.current) == null ? undefined : Mr.workdir) ?? null,
        wc: Se.current,
        installedApps: de,
        getServerInfo: se,
        isAppRunning: Q,
        launchApp: _e.current,
        closeApp: ae,
        closeWindow: x,
        installApp: async (Ot, Yn) => {
          await Nf(Ot, Yn);
          await he();
        },
        uninstallApp: (...Ot) => {
          var Yn;
          if ((Yn = ie.current) == null) {
            return undefined;
          } else {
            return Yn.call(ie, ...Ot);
          }
        },
        addWidget: yr,
        workspaces: C,
        activeWorkspaceId: T,
        createWorkspace: M,
        deleteWorkspace: I,
        renameWorkspace: R,
        switchWorkspace: j,
        wallpaper: $,
        saveWallpaper: P,
        resetWallpaper: J,
        getWallpaperForWorkspace: ne,
        saveWallpaperForWorkspace: ue,
        resetWallpaperForWorkspace: ee,
        getLocale: () => it,
        setLocale: async Ot => {
          await Gw(Ot);
          et(Ot);
          $t({
            type: "locale-changed",
            locale: Ot
          });
        },
        getDockSettings: () => Wt,
        setDockSettings: async Ot => {
          const Yn = await Ml(Ot);
          xt(Yn);
        },
        getTerminalBgSettings: () => Ln,
        setTerminalBgSettings: async Ot => {
          const Yn = await rx(Ot);
          tn(Yn);
        },
        getTheme: () => Kt,
        setTheme: async Ot => {
          await Wx(Ot);
          ht(Ot);
        }
      };
      let ot;
      try {
        const Ot = await Bx({
          id: Ve,
          type: ct,
          payload: vt
        }, Rt);
        const Yn = JSON.stringify(Ot.result);
        if (Yn.length <= 65536) {
          ot = {
            kind: "api-response",
            id: Ve,
            result: Ot.result,
            error: Ot.error || undefined,
            ts: Date.now()
          };
        } else {
          const Zh = `.tmp/jsos-api-${Ve}.json`;
          const Qh = `${n.workdir}/.tmp/jsos-api-${Ve}.json`;
          await n.fs.mkdir(".tmp", {
            recursive: true
          });
          await n.fs.writeFile(Zh, Yn);
          ot = {
            kind: "api-response",
            id: Ve,
            transport: "file",
            dataPath: Qh,
            error: Ot.error || undefined,
            ts: Date.now()
          };
        }
      } catch (Ot) {
        ot = {
          kind: "api-response",
          id: Ve,
          error: Ot.message || "Unknown error",
          ts: Date.now()
        };
      }
      try {
        const Ot = n._daemonInfo.process.input.getWriter();
        await Ot.write(`${JSON.stringify(ot)}
`);
        Ot.releaseLock();
      } catch {}
    };
    window.addEventListener("daemon-api-request", Ce);
    return () => window.removeEventListener("daemon-api-request", Ce);
  }, [n, u, de, C, T, $, ae, se, Q, M, I, R, j, P, J, ne, ue, ee, it, Ln, Kt, $t, he, yr]);
  E.useEffect(() => {
    if (!ks) {
      return;
    }
    const fe = Ie => ar(Ie.clientX, Ie.clientY);
    const Ce = () => ds();
    document.addEventListener("pointermove", fe);
    document.addEventListener("pointerup", Ce);
    return () => {
      document.removeEventListener("pointermove", fe);
      document.removeEventListener("pointerup", Ce);
    };
  }, [ks, ar, ds]);
  E.useEffect(() => {
    if (!Yr) {
      return;
    }
    const fe = Ie => Wo(Ie.clientX, Ie.clientY);
    const Ce = () => qn();
    document.addEventListener("pointermove", fe);
    document.addEventListener("pointerup", Ce);
    return () => {
      document.removeEventListener("pointermove", fe);
      document.removeEventListener("pointerup", Ce);
    };
  }, [Yr, Wo, qn]);
  E.useEffect(() => {
    if (!Xr) {
      return;
    }
    const fe = Ie => Ts(Ie.clientX, Ie.clientY);
    const Ce = () => Fa();
    document.addEventListener("pointermove", fe);
    document.addEventListener("pointerup", Ce);
    return () => {
      document.removeEventListener("pointermove", fe);
      document.removeEventListener("pointerup", Ce);
    };
  }, [Xr, Ts, Fa]);
  const _r = E.useRef(null);
  const [Ms, Zr] = E.useState(null);
  E.useEffect(() => {
    if (_r.current) {
      if (ks || Yr) {
        _r.current.allowTouchMove = false;
      } else {
        _r.current.allowTouchMove = true;
      }
    }
  }, [ks, Yr]);
  E.useEffect(() => {
    if ([...de.values()].length !== 0) {
      for (const [fe] of de) {
        if (!hr[fe] && !be.current.has(fe)) {
          const Ce = Pr(fe);
          Ua(fe, Ce.x, Ce.y);
          break;
        }
      }
    }
  }, [de, hr, Pr, Ua]);
  E.useEffect(() => {
    if (A) {
      jM().then(fe => {
        if (Object.keys(fe).length > 0) {
          HO(fe);
        }
      });
      lD();
    }
  }, [A]);
  E.useEffect(() => {
    const fe = Ce => {
      d();
      Ce.preventDefault();
      Ce.returnValue = "";
    };
    window.addEventListener("beforeunload", fe);
    return () => window.removeEventListener("beforeunload", fe);
  }, [d]);
  E.useEffect(() => {
    const fe = async Ce => {
      var Rt;
      const Ie = Ce.data;
      if (Ie == null || !Ie.type || Ie == null || !Ie.id) {
        return;
      }
      const Ve = {
        systemVersion: zx.version,
        workdir: ((Rt = Se.current) == null ? undefined : Rt.workdir) ?? null,
        wc: Se.current,
        installedApps: pe.current,
        getServerInfo: se,
        isAppRunning: Q,
        launchApp: _e.current,
        closeApp: ae,
        closeWindow: x,
        installApp: async (ot, Ct) => {
          await Nf(ot, Ct);
          await he();
        },
        uninstallApp: (...ot) => {
          var Ct;
          if ((Ct = ie.current) == null) {
            return undefined;
          } else {
            return Ct.call(ie, ...ot);
          }
        },
        addWidget: yr,
        workspaces: C,
        activeWorkspaceId: T,
        createWorkspace: M,
        deleteWorkspace: I,
        renameWorkspace: R,
        switchWorkspace: j,
        wallpaper: $,
        saveWallpaper: P,
        resetWallpaper: J,
        getWallpaperForWorkspace: ne,
        saveWallpaperForWorkspace: ue,
        resetWallpaperForWorkspace: ee,
        getLocale: () => it,
        setLocale: async ot => {
          await Gw(ot);
          et(ot);
          $t({
            type: "locale-changed",
            locale: ot
          });
        },
        getDockSettings: () => Wt,
        setDockSettings: async ot => {
          const Ct = await Ml(ot);
          xt(Ct);
        },
        getTerminalBgSettings: () => Ln,
        setTerminalBgSettings: async ot => {
          const Ct = await rx(ot);
          tn(Ct);
        },
        getTheme: () => Kt,
        setTheme: async ot => {
          await Wx(ot);
          ht(ot);
        },
        getWindowAppId: ot => {
          var Ct;
          if ((Ct = Y.current.get(ot)) == null) {
            return undefined;
          } else {
            return Ct.appId;
          }
        },
        jsSpawnInPanel: jsSpawnInPanel
      };
      let ct = Ce.source;
      if (!ct) {
        for (const [, ot] of wv) {
          if (ot != null && ot.contentWindow) {
            ct = ot.contentWindow;
            break;
          }
        }
      }
      let vt = null;
      if (ct) {
        const ot = document.querySelectorAll("iframe[data-window-id]");
        for (const Ct of ot) {
          if (Ct.contentWindow === ct) {
            vt = Ct.dataset.windowId;
            break;
          }
        }
      }
      try {
        const ot = await Bx(Ie, {
          ...Ve,
          callingWindowId: vt
        });
        if (ct != null) {
          ct.postMessage({
            id: Ie.id,
            ...ot
          }, "*");
        }
      } catch (ot) {
        if (ct != null) {
          ct.postMessage({
            id: Ie.id,
            error: ot.message || "Unknown error"
          }, "*");
        }
      }
    };
    window.addEventListener("message", fe);
    return () => window.removeEventListener("message", fe);
  }, [n, C, T, $, ae, se, Q, M, I, R, j, P, J, ne, ue, ee, it, Ln, Kt, $t, yr]);
  E.useEffect(() => {
    const fe = Ce => {
      var Ve;
      if (((Ve = Ce.data) == null ? undefined : Ve.type) !== "url-update") {
        return;
      }
      const Ie = document.querySelectorAll("iframe[data-window-id]");
      for (const ct of Ie) {
        if (ct.contentWindow === Ce.source) {
          _(ct.dataset.windowId, {
            displayUrl: Ce.data.href,
            pendingNavUrl: Ce.data.href
          });
          break;
        }
      }
    };
    window.addEventListener("message", fe);
    return () => window.removeEventListener("message", fe);
  }, [_]);
  E.useEffect(() => {
    const fe = Ce => {
      const {
        title: Ie,
        description: Ve,
        type: ct,
        timeout: vt
      } = Ce.detail;
      jn.add({
        title: Ie,
        description: Ve,
        type: ct,
        timeout: vt
      });
    };
    window.addEventListener("jsos-toast", fe);
    return () => window.removeEventListener("jsos-toast", fe);
  }, []);
  E.useEffect(() => {
    const fe = () => {
      Ke(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", fe);
    return () => document.removeEventListener("fullscreenchange", fe);
  }, []);
  const Yi = E.useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch (fe) {
      console.error("Fullscreen error:", fe);
    }
  }, []);
  E.useEffect(() => {
    if (!Ms || !_r.current) {
      return;
    }
    const fe = z.findIndex(Ce => Ce.id === Ms);
    if (fe >= 0) {
      _r.current.update();
      _r.current.slideTo(fe);
    }
    Zr(null);
  }, [Ms, C]);
  const hn = E.useCallback(async (fe, Ce = {}) => {
    const {
      route: Ie,
      params: Ve,
      startCommand: ct,
      env: vt
    } = Ce;
    const Rt = de.get(fe);
    if (!Rt || !n) {
      return;
    }
    const ot = Rt.type === "cli";
    const Ct = S(Rt, T);
    w(Ct);
    if (Ie) {
      _(Ct, {
        pendingRoute: Ie,
        pendingRouteParams: Ve || {}
      });
    }
    const Mr = await H(Rt, Ct, {
      onStatusChange: Ot => _(Ct, {
        status: Ot
      }),
      onTerminalOutput: Ot => {
        const Yn = te.current.get(Ct);
        if (Yn) {
          Yn.write(Ot);
        }
      },
      onStatusLine: Ot => _(Ct, {
        statusText: Ot
      })
    }, Rt.type, {
      startCommand: ct,
      env: vt
    });
    if (Mr) {
      const Ot = se(fe);
      const Yn = (Ot == null ? undefined : Ot.port) ?? null;
      if (!ot && Yn) {
        a(Yn, fe);
      }
      _(Ct, {
        process: Mr,
        serverPort: Yn,
        serverUrl: (Ot == null ? undefined : Ot.serverUrl) ?? null
      });
    }
  }, [de, n, S, w, a, H, _, se, T]);
  const Xi = E.useCallback(() => {
    hn("dev.jsos.settings", {
      route: "/wallpaper",
      params: {
        workspaceId: T
      }
    });
  }, [hn, T]);
  const fi = E.useCallback(() => {
    hn("dev.jsos.settings", {
      route: "/about"
    });
    Te(null);
  }, [hn]);
  _e.current = hn;
  Se.current = n;
  // [jsos-local-terminal-spawn] 在指定窗口自带的终端面板（xterm）中执行命令：新建「终端 N」tab 运行
  const jsSpawnInPanel = E.useCallback(async (fe, Ce) => {
    const Ie = Se.current;
    if (!Ie) {
      return {
        result: {
          success: false,
          error: "WebContainer not ready"
        }
      };
    }
    // 记录已有的 spawn tab key，通知窗口组件新建 tab，然后轮询等待新 xterm 注册
    const Ue = fe + "::spawn";
    const Le = new Set();
    for (const Ne of te.current.keys()) {
      if (Ne.startsWith(Ue)) {
        Le.add(Ne);
      }
    }
    window.dispatchEvent(new CustomEvent("jsos-terminal-spawn", {
      detail: {
        windowId: fe
      }
    }));
    let be = null;
    for (let Ne = 0; Ne < 80 && !be; Ne++) {
      await new Promise(Ue2 => setTimeout(Ue2, 100));
      for (const Le2 of te.current.keys()) {
        if (Le2.startsWith(Ue) && !Le.has(Le2)) {
          be = Le2;
          break;
        }
      }
    }
    if (!be) {
      console.warn("[jsos-terminal-spawn] 面板 tab 未就绪，当前 xterm 注册表:", Array.from(te.current.keys()));
      return {
        result: {
          success: false,
          error: "terminal panel not available"
        }
      };
    }
    const Te = te.current.get(be);
    if (!Te) {
      return {
        result: {
          success: false,
          error: "terminal panel not available"
        }
      };
    }
    // 组合命令：按需安装依赖 → 按需构建 → 启动。WebContainer 的 sh 是精简版 jsh（不支持 {} 分组），
    // 因此引导逻辑用 node -e + base64 执行，绕开 shell 语法限制
    let Ne = Ce.command;
    if (Ce.args && Ce.args.length > 0) {
      Ne += ` ${Ce.args.join(" ")}`;
    }
    // 分配端口并注入（模板 server.js 会 console.log(process.env.PORT)，不注入则输出 undefined）
    const JsPort = String(40000 + Math.floor(Math.random() * 20000));
    if (Ce.cwd) {
      const jsBoot = "const fs=require('fs'),cp=require('child_process');if(!fs.existsSync('node_modules')){console.log('[JSOS] Installing dependencies (first run may take a while)...');cp.execSync('npm install',{stdio:'inherit'})}if(!fs.existsSync('dist/index.html')){const s=(JSON.parse(fs.readFileSync('package.json','utf8')).scripts)||{};if(s.build){console.log('[JSOS] dist not found, building...');cp.execSync('npm run build',{stdio:'inherit'})}}";
      const jsStart = Ne.replaceAll("'", "'\\''");
      Ne = `cd '${String(Ce.cwd).replace(/'/g, "'\\''")}' && node -e "eval(Buffer.from('${btoa(jsBoot)}','base64').toString())" && ${jsStart}`;
      Te.write(`\x1B[1;36m$ ${Ne}\x1B[0m\x1B[2m  [PORT=${JsPort}]\x1B[0m\r\n`);
    } else {
      Te.write(`\x1B[1;36m$ ${Ne}\x1B[0m\x1B[2m  [PORT=${JsPort}]\x1B[0m\r\n`);
    }
    try {
      const Ue = await Ie.spawn("sh", ["-c", Ne], {
        env: {
          PORT: JsPort
        }
      });
      jsSpawnProcesses.set(be, Ue);
      Ue.output.pipeTo(new WritableStream({
        write: Le => Te.write(Le)
      }));
      Ue.exit.then(Le => {
        jsSpawnProcesses.delete(be);
        Te.write(`\r\n\x1B[1;33m[进程已退出 code ${Le}]\x1B[0m\r\n`);
      });
      return {
        result: {
          success: true
        }
      };
    } catch (Ue) {
      Te.write(`\r\n\x1B[1;31mError: ${Ue.message}\x1B[0m\r\n`);
      return {
        result: {
          success: false,
          error: Ue.message
        }
      };
    }
  }, []);
  const Yo = E.useCallback(async (fe, Ce = false) => {
    var Ie;
    var Ve;
    var ct;
    if (fe) {
      be.current.add(fe);
      for (const [vt, Rt] of p) {
        if (Rt.appId === fe) {
          if (((Ie = Rt.app) == null ? undefined : Ie.type) === "cli" && Rt.process) {
            try {
              Rt.process.kill();
            } catch {}
          }
          ae(Rt.appId, vt, ((Ve = Rt.app) == null ? undefined : Ve.type) === "cli");
          if ((ct = te.current.get(vt)) != null) {
            ct.dispose();
          }
          te.current.delete(vt);
          x(vt);
        }
      }
      oe(fe);
      try {
        await fr(fe);
        c(fe);
        await LM(fe);
        await $M(fe);
        await er(fe);
        try {
          await (n == null ? undefined : n.fs.rm(`workspace/apps/${fe}`, {
            recursive: true,
            force: true
          }));
        } catch {}
        if (Ce) {
          await UM(fe);
          await sO(n, fe);
        }
        d();
        he();
        jn.add({
          title: e("uninstall.success"),
          description: e("uninstall.successDesc"),
          type: "success",
          timeout: 3000
        });
      } catch (vt) {
        jn.add({
          title: e("uninstall.failed"),
          description: vt.message,
          type: "error",
          timeout: 6000
        });
      } finally {
        be.current.delete(fe);
      }
    }
  }, [p, n, ae, x, oe, c, er, fr, he, d, e]);
  ie.current = Yo;
  const ec = E.useCallback(async fe => {
    const Ce = Y.current.get(fe);
    if (!Ce || !n) {
      return;
    }
    const Ie = te.current.get(fe);
    if (Ie) {
      Ie.write(`\r
\x1B[1;33m--- ${e("window.restart")} ---\x1B[0m\r
`);
    }
    _(fe, {
      status: "installing",
      statusText: e("window.restarting"),
      process: null,
      serverUrl: null,
      serverPort: null
    });
    const Ve = Ce.app;
    const ct = await H(Ve, fe, {
      onStatusChange: vt => _(fe, {
        status: vt
      }),
      onTerminalOutput: vt => {
        const Rt = te.current.get(fe);
        if (Rt) {
          Rt.write(vt);
        }
      },
      onStatusLine: vt => _(fe, {
        statusText: vt
      })
    }, Ve.type);
    if (ct) {
      _(fe, {
        process: ct
      });
    }
  }, [n, H, _, e]);
  const Ki = E.useCallback(async (fe, Ce, Ie) => {
    var Rt;
    const Ve = de.get(fe);
    if (!Ve || !n || Ve.type === "cli") {
      return;
    }
    const ct = `widget-${Ce}`;
    if (Q(fe)) {
      const ot = se(fe);
      if (ot) {
        ot.windows.add(ct);
        if ((Rt = ot.terminalCallbacks) != null) {
          Rt.set(ct, Ct => {
            if (Ie != null && Ie.current) {
              Ie.current.write(Ct);
            }
          });
        }
      }
      return;
    }
    if (await H(Ve, ct, {
      onStatusChange: ot => {
        if (ot === "starting") {
          const Ct = se(fe);
          if (Ct != null && Ct.port) {
            a(Ct.port, fe);
          }
        }
      },
      onTerminalOutput: ot => {
        if (Ie != null && Ie.current) {
          Ie.current.write(ot);
        }
      }
    }, Ve.type)) {
      const ot = se(fe);
      const Ct = (ot == null ? undefined : ot.port) ?? null;
      if (Ct) {
        a(Ct, fe);
      }
    }
  }, [de, n, H, Q, se, a]);
  const Qr = E.useCallback(fe => {
    var vt;
    var Rt;
    var ot;
    const Ce = Y.current.get(fe);
    if (!Ce) {
      return;
    }
    let Ie = 0;
    for (const [, Ct] of me) {
      if (Ct.appId === Ce.appId) {
        Ie++;
      }
    }
    let Ve = 0;
    for (const [, Ct] of zt) {
      if (Ct.appId === Ce.appId) {
        Ve++;
      }
    }
    const ct = Ie <= 1 && Ve === 0;
    if (((vt = Ce.app) == null ? undefined : vt.type) === "cli" && Ce.process) {
      try {
        Ce.process.kill();
      } catch {}
    }
    ae(Ce.appId, fe, ((Rt = Ce.app) == null ? undefined : Rt.type) === "cli");
    if (ct) {
      c(Ce.appId);
    }
    if ((ot = te.current.get(fe)) != null) {
      ot.dispose();
    }
    te.current.delete(fe);
    x(fe);
    d();
  }, [x, ae, c, me, zt, d]);
  const Xo = E.useCallback(fe => {
    w(fe);
  }, [w]);
  const hi = E.useCallback(fe => {
    g(fe);
  }, [g]);
  const Ws = E.useCallback(fe => {
    if (fe.target !== fe.currentTarget || ve) {
      return;
    }
    const Ce = sn.current;
    const Ie = Ce.get(T);
    if (Ie && Ie.size > 0) {
      for (const Ve of Ie) {
        _(Ve, {
          minimized: false
        });
      }
      Ce.delete(T);
    } else {
      const Ve = new Set();
      for (const [ct, vt] of p) {
        if (vt.workspaceId === T && !vt.minimized) {
          g(ct);
          Ve.add(ct);
        }
      }
      if (Ve.size > 0) {
        Ce.set(T, Ve);
      }
    }
  }, [p, T, ve, g, _]);
  const $s = E.useCallback(fe => {
    b(fe);
  }, [b]);
  const qe = E.useCallback((fe, Ce, Ie) => {
    m(fe, Ce, Ie);
  }, [m]);
  const rt = E.useCallback((fe, Ce, Ie) => {
    v(fe, Ce, Ie);
  }, [v]);
  const It = E.useCallback(fe => {
    const Ce = Y.current.get(fe);
    if (Ce != null && Ce.minimized) {
      _(fe, {
        minimized: false
      });
    }
    w(fe);
  }, [w, _]);
  const Nt = E.useCallback(fe => {
    fe.preventDefault();
    Te({
      type: "desktop",
      x: fe.clientX,
      y: fe.clientY
    });
  }, []);
  const ln = E.useCallback((fe, Ce) => {
    Te({
      type: "icon",
      app: fe,
      ...Ce
    });
  }, []);
  const Cn = E.useCallback(fe => {
    hn("dev.jsos.appmanager", {
      route: "/app/" + fe
    });
    Te(null);
  }, [hn]);
  const Bn = E.useCallback(fe => {
    hn("dev.jsos.appmanager", {
      route: "/app/" + fe,
      params: {
        action: "uninstall"
      }
    });
    Te(null);
  }, [hn]);
  const tr = E.useCallback(async (fe, Ce) => {
    await As(fe, Ce);
    const Ie = de.get(fe);
    const Ve = C.get(Ce);
    jn.add({
      title: e("icon.moveSuccess"),
      description: e("icon.moveDescription", {
        name: rn(Ie == null ? undefined : Ie.name, it) || fe,
        workspace: (Ve == null ? undefined : Ve.name) || Ce
      }),
      type: "success",
      timeout: 3000
    });
    Te(null);
  }, [As, de, C, e]);
  const Br = E.useCallback(fe => {
    fe.preventDefault();
    ze({
      x: fe.clientX,
      y: fe.clientY
    });
  }, []);
  const Ko = E.useCallback(async fe => {
    const Ce = await Ml({
      autoHide: fe
    });
    xt(Ce);
    ze(null);
  }, [Ml]);
  const Va = E.useCallback(async fe => {
    const Ce = await Ml({
      position: fe
    });
    xt(Ce);
    ze(null);
  }, [Ml]);
  const Zo = E.useCallback(() => {
    const fe = ve == null ? undefined : ve.x;
    const Ce = ve == null ? undefined : ve.y;
    Te(null);
    hn("dev.jsos.appmanager", {
      route: "/add-widget",
      params: {
        x: fe,
        y: Ce,
        hideNav: "1"
      }
    });
  }, [ve, hn]);
  const Wa = E.useCallback((fe, Ce) => {
    Ue({
      widget: fe,
      ...Ce
    });
  }, []);
  const $a = E.useCallback(async fe => {
    const Ce = zt.get(fe);
    const Ie = Ce == null ? undefined : Ce.appId;
    await Tr(fe);
    Ue(null);
    if (Ie) {
      let Ve = 0;
      for (const [vt, Rt] of zt) {
        if (vt !== fe && Rt.appId === Ie) {
          Ve++;
        }
      }
      let ct = false;
      for (const [, vt] of me) {
        if (vt.appId === Ie) {
          ct = true;
          break;
        }
      }
      if (Ve === 0 && !ct) {
        ae(Ie, `widget-${Ie}`);
      }
    }
    jn.add({
      title: e("widget.removed"),
      description: e("widget.removedDesc"),
      type: "success",
      timeout: 3000
    });
  }, [zt, zt, Tr, me, ae, e]);
  const wr = E.useCallback(fe => {
    const Ce = zt.get(fe);
    if (Ce) {
      hn(Ce.appId);
    }
    Ue(null);
  }, [zt, hn]);
  const qs = E.useCallback(fe => {
    _t(Ce => ({
      ...Ce,
      [fe]: (Ce[fe] || 0) + 1
    }));
    Ue(null);
  }, []);
  const qa = E.useCallback(fe => {
    kt(fe);
    Ue(null);
  }, []);
  const Qo = E.useCallback(fe => {
    lt({
      open: true,
      widget: fe
    });
    Ue(null);
  }, []);
  const qh = E.useCallback(async () => {
    const fe = We.widget;
    if (fe) {
      await $a(fe.id);
      lt({
        open: false,
        widget: null
      });
    }
  }, [We, $a]);
  const tc = E.useCallback(fe => {
    const Ce = [];
    for (const [, Ve] of p) {
      if (Ve.workspaceId === fe.id) {
        Ce.push(Ve);
      }
    }
    const Ie = [];
    for (const [, Ve] of zt) {
      if (Ve.workspaceId === fe.id) {
        Ie.push(Ve);
      }
    }
    Ye({
      open: true,
      workspace: fe,
      windows: Ce,
      widgets: Ie
    });
  }, [p, zt]);
  const nc = E.useCallback(() => {
    const fe = e("workspace.defaultName", {
      number: C.size + 1
    });
    gt({
      open: true,
      defaultName: fe
    });
  }, [C.size]);
  const Jo = E.useCallback(async fe => {
    const Ce = await M(fe);
    gt({
      open: false
    });
    Zr(Ce);
  }, [M]);
  const Ga = E.useCallback(async (fe, Ce) => {
    var Ve;
    var ct;
    var vt;
    const {
      workspace: Ie
    } = Ge;
    if (Ie) {
      if (fe === "move" && Ce) {
        for (const [, Rt] of p) {
          if (Rt.workspaceId === Ie.id) {
            _(Rt.id, {
              workspaceId: Ce
            });
          }
        }
        await Gi(Ie.id, Ce);
        await Go(Ie.id, Ce);
      } else if (fe === "close") {
        for (const [Rt, ot] of p) {
          if (ot.workspaceId === Ie.id) {
            if (((Ve = ot.app) == null ? undefined : Ve.type) === "cli" && ot.process) {
              try {
                ot.process.kill();
              } catch {}
            }
            ae(ot.appId, Rt, ((ct = ot.app) == null ? undefined : ct.type) === "cli");
            if ((vt = te.current.get(Rt)) != null) {
              vt.dispose();
            }
            te.current.delete(Rt);
            x(Rt);
          }
        }
        await qo(Ie.id);
        await Vs(Ie.id);
        await sv(Ie.id);
      }
      await I(Ie.id);
      if (T === Ie.id) {
        Zr(W);
      }
      Ye({
        open: false,
        workspace: null
      });
      jn.add({
        title: e("workspace.deleted"),
        description: e("workspace.deletedDesc", {
          name: Ie.name
        }),
        type: "success",
        timeout: 3000
      });
    }
  }, [Ge, p, T, I, W, _, ae, x, Gi, qo, Go, Vs, e]);
  E.useRef(new Map());
  const Ya = E.useRef(new Map());
  const Xa = E.useRef(null);
  E.useEffect(() => {
    const fe = () => {
      if (Xa.current) {
        if (document.hidden) {
          Xa.current.pause();
        } else {
          Xa.current.play().catch(() => {});
        }
      }
    };
    document.addEventListener("visibilitychange", fe);
    return () => document.removeEventListener("visibilitychange", fe);
  }, []);
  const Gh = ({
    wsId: fe,
    version: Ce
  }) => {
    const Ie = E.useRef(null);
    const [Ve, ct] = E.useState(null);
    const [vt, Rt] = E.useState(null);
    E.useEffect(() => {
      let ot = false;
      const Ct = Ya.current.get(fe);
      if (Ct && (!Ce || Ct.version === Ce)) {
        ct(Ct.config);
        if (Ct.blobUrl) {
          Ie.current = Ct.blobUrl;
          Rt(Ct.blobUrl);
        }
        return;
      }
      rv(fe).then(Mr => {
        if (!ot && Mr) {
          ct(Mr);
          if (Mr.type !== "default" && Mr.data) {
            const Ot = URL.createObjectURL(Mr.data);
            Ie.current = Ot;
            Rt(Ot);
            Ya.current.set(fe, {
              config: Mr,
              blobUrl: Ot,
              version: Ce
            });
          } else {
            Ie.current = null;
            Rt(null);
            Ya.current.set(fe, {
              config: Mr,
              blobUrl: null,
              version: Ce
            });
          }
        }
      });
      return () => {
        ot = true;
      };
    }, [fe, Ce]);
    if (Ve) {
      if (Ve.type === "video" && vt) {
        return <video src={vt} autoPlay={false} loop={true} muted={true} disablePictureInPicture={true} className="absolute inset-0 w-full h-full object-cover video-wallpaper" style={{
          filter: Ve.blur > 0 ? `blur(${Ve.blur}px)` : undefined
        }} />;
      } else {
        return <B.Fragment><div className="absolute inset-0" style={{
            background: Ve.type === "default" || !Ve.data ? "url('/bg.webp') center/cover no-repeat" : `url(${vt}) center/cover no-repeat`,
            filter: Ve.blur > 0 ? `blur(${Ve.blur}px)` : undefined
          }} />{Ve.overlay && <div className="absolute inset-0" style={{
            backgroundColor: Ve.overlay,
            opacity: Ve.overlayOpacity / 100
          }} />}</B.Fragment>;
      }
    } else {
      return <div className="absolute inset-0" style={{
        background: "url('/bg.webp') center/cover no-repeat"
      }} />;
    }
  };
  const Yh = E.useMemo(() => {
    const fe = {};
    for (const Ce of de.values()) {
      const Ie = hr[Ce.id];
      if (Ie) {
        fe[Ie.workspaceId] ||= [];
        fe[Ie.workspaceId].push(Ce);
      }
    }
    return fe;
  }, [de, hr]);
  const rc = E.useMemo(() => {
    const fe = {};
    for (const Ce of zt.values()) {
      fe[Ce.workspaceId] ||= [];
      fe[Ce.workspaceId].push(Ce);
    }
    return fe;
  }, [zt]);
  const Xh = fe => (Yh[fe] || []).map(Ce => <_Component101 app={Ce} iconInfo={hr[Ce.id]} isDragging={(kr == null ? undefined : kr.appId) === Ce.id} onDoubleClick={hn} onContextMenu={ln} onDragStart={Ar} onDragEnd={ds} key={Ce.id} />);
  const Kh = fe => (rc[fe] || []).map(Ce => {
    var Ie;
    return <_Component102 widget={Ce} serverUrl={(Ie = se(Ce.appId)) == null ? undefined : Ie.serverUrl} isAppRunning={Q(Ce.appId)} onAutoStart={Ki} isDragging={(or == null ? undefined : or.widgetId) === Ce.id} isResizing={(dr == null ? undefined : dr.widgetId) === Ce.id} onDragStart={_n} onDragEnd={qn} onResizeStart={Gn} onContextMenu={Wa} onOpenApp={hn} onToggleLock={$o} onDelete={Qo} onUpdateBackground={di} refreshKey={dt[Ce.id] || 0} onRefresh={qs} showBgConfig={Dt === Ce.id} onShowBgConfigChange={Ve => {
      if (!Ve) {
        kt(null);
      }
    }} key={Ce.id} />;
  });
  return <div className="h-screen relative overflow-hidden"><div className="absolute inset-0 overflow-hidden select-none" onContextMenu={V ? fe => fe.preventDefault() : Nt} style={V ? {
      WebkitTouchCallout: "none"
    } : undefined} onPointerDown={() => {
      if (ve) {
        Te(null);
      }
    }} {...V ? Z : {}}>{A ? <_Component104 initialSlide={z.findIndex(fe => fe.id === T)} slidesPerView={1} speed={350} simulateTouch={true} grabCursor={true} resistance={true} resistanceRatio={0.85} noSwiping={true} noSwipingClass="no-swipe" onSwiper={fe => {
        _r.current = fe;
      }} onSlideChange={N} className="h-full">{z.map((fe, Ce) => {
          const Ie = fe.id === T;
          const Ve = Ie ? $ : null;
          const ct = Ie ? G : null;
          const vt = z.findIndex(ot => ot.id === T);
          const Rt = Math.abs(Ce - vt) <= 1;
          return <_Component103 key={fe.id}>{Ie ? <B.Fragment>{Ve.type === "video" && ct ? <video ref={Xa} src={ct} autoPlay={true} loop={true} muted={true} disablePictureInPicture={true} className="absolute inset-0 w-full h-full object-cover video-wallpaper" style={{
                filter: Ve.blur > 0 ? `blur(${Ve.blur}px)` : undefined
              }} /> : <div className="absolute inset-0" style={{
                background: Ve.type === "default" || !Ve.data ? "url('/bg.webp') center/cover no-repeat" : `url(${ct}) center/cover no-repeat`,
                filter: Ve.blur > 0 ? `blur(${Ve.blur}px)` : undefined
              }} />}{Ve.overlay && <div className="absolute inset-0" style={{
                backgroundColor: Ve.overlay,
                opacity: Ve.overlayOpacity / 100
              }} />}</B.Fragment> : Rt ? <Gh wsId={fe.id} version={L} /> : <div className="absolute inset-0" style={{
              background: "url('/bg.webp') center/cover no-repeat"
            }} />}<div className="absolute inset-0 z-0" onDoubleClick={Ws} /><div className="absolute inset-0 pointer-events-none">{Xh(fe.id)}</div><div className="absolute inset-0 pointer-events-none">{Kh(fe.id)}</div></_Component103>;
        })}</_Component104> : <div className="h-full" />}<div className="absolute inset-0 pointer-events-none transition-opacity duration-200 z-10" style={{
        opacity: ks || Yr || Xr ? 1 : 0,
        backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 104px), repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 104px)",
        backgroundPosition: "20px 20px"
      }} />{ks && Pn && <div className={`absolute pointer-events-none rounded-lg border border-dashed z-10 transition-colors duration-150 ${Pn.isValid ? "border-primary/30 bg-primary/5" : "border-red-400/50 bg-red-500/10"}`} style={{
        left: 20 + Pn.x,
        top: 20 + Pn.y,
        width: 104,
        height: 104,
        transition: "left 0.1s ease, top 0.1s ease, border-color 0.15s ease, background-color 0.15s ease"
      }} />}{Yr && Rs && or && (() => {
        const fe = zt.get(or.widgetId);
        if (!fe) {
          return null;
        }
        const {
          width: Ce,
          height: Ie
        } = Ls(fe.widget);
        const Ve = Ce - Li;
        const ct = Ie - Li;
        const vt = Li / 2;
        return <div className={`absolute pointer-events-none rounded-xl border border-dashed z-10 transition-colors duration-150 ${Rs.isValid ? "border-primary/30 bg-primary/5" : "border-red-400/50 bg-red-500/10"}`} style={{
          left: 20 + Rs.x + vt,
          top: 20 + Rs.y + vt,
          width: Ve,
          height: ct,
          transition: "left 0.1s ease, top 0.1s ease, border-color 0.15s ease, background-color 0.15s ease"
        }} />;
      })()}{Xr && us && dr && (() => {
        const fe = zt.get(dr.widgetId);
        if (!fe) {
          return null;
        }
        const Ce = us.cols * 104 - Li;
        const Ie = us.rows * 104 - Li;
        const Ve = Li / 2;
        return <div className="absolute pointer-events-none rounded-xl border border-dashed border-primary/30 bg-primary/5 z-10" style={{
          left: 20 + (fe.x ?? 0) + Ve,
          top: 20 + (fe.y ?? 0) + Ve,
          width: Ce,
          height: Ie
        }} />;
      })()}<div className="absolute inset-0 pointer-events-none z-20">{(() => {
          const fe = {};
          const Ce = {};
          const Ie = {};
          for (const [, Ve] of me) {
            fe[Ve.appId] = (fe[Ve.appId] || 0) + 1;
          }
          for (const [Ve, ct] of me) {
            Ce[ct.appId] = (Ce[ct.appId] || 0) + 1;
            if (fe[ct.appId] > 1) {
              Ie[Ve] = Ce[ct.appId];
            }
          }
          return [...p.values()].map(Ve => <div className="relative pointer-events-auto" style={{
            display: Ve.workspaceId === T ? "" : "none"
          }} key={Ve.id}><_Component105 window={Ve} title={Ve.title || (Ie[Ve.id] ? `${rn(Ve.app.name, it)} #${Ie[Ve.id]}` : undefined)} isFocused={Ve.id === f} onFocus={Xo} onClose={Qr} onMinimize={hi} onMaximize={$s} onMove={qe} onResize={rt} onRestart={ec} terminalInstances={te.current} /></div>);
        })()}</div></div><_Component106 windows={p} runningApps={me} installedApps={de} focusedWindowId={f} onFocus={It} onLaunchApp={hn} anyMaximized={f ? (() => {
      const fe = p.get(f);
      return fe && fe.maximized && !fe.minimized;
    })() : false} workspaces={C} activeWorkspaceId={T} onSwitchWorkspace={D} onCreateWorkspace={nc} onRenameWorkspace={R} onDeleteWorkspace={tc} homeId={W} dockSettings={Wt} desktopIcons={hr} commandPaletteOpen={Zt} onCommandPaletteChange={nn} onInfoApp={Cn} onUninstallApp={Bn} onMoveIconToWorkspace={tr} onDockContextMenu={Br} bootState={r} /><_Component107 open={(ve == null ? undefined : ve.type) === "desktop"} x={(ve == null ? undefined : ve.x) || 0} y={(ve == null ? undefined : ve.y) || 0} isFullscreen={ft} onOpenChange={fe => {
      if (!fe) {
        Te(null);
      }
    }} onInstall={() => hn("dev.jsos.appmanager", {
      route: "/store"
    })} onAddWidget={Zo} onWallpaper={Xi} onToggleFullscreen={Yi} onAbout={fi} /><_Component108 open={!!Re} x={(Re == null ? undefined : Re.x) || 0} y={(Re == null ? undefined : Re.y) || 0} position={Wt.position} autoHide={!!Wt.autoHide} onOpenChange={fe => {
      if (!fe) {
        ze(null);
      }
    }} onToggleAutoHide={Ko} onChangePosition={Va} onOpenSettings={() => {
      ze(null);
      hn("dev.jsos.settings", {
        route: "/dock"
      });
    }} /><WR open={(ve == null ? undefined : ve.type) === "icon"} x={(ve == null ? undefined : ve.x) || 0} y={(ve == null ? undefined : ve.y) || 0} appId={(Bu = ve == null ? undefined : ve.app) == null ? undefined : Bu.id} workspaces={C} currentWorkspaceId={T} isSystem={(zu = ve == null ? undefined : ve.app) == null ? undefined : zu.isSystem} onOpenChange={fe => {
      if (!fe) {
        Te(null);
      }
    }} onOpen={hn} onInfo={Cn} onUninstall={Bn} onMoveToWorkspace={tr} /><Kz open={!!Be} x={(Be == null ? undefined : Be.x) || 0} y={(Be == null ? undefined : Be.y) || 0} widgetId={(Nu = Be == null ? undefined : Be.widget) == null ? undefined : Nu.id} onOpenChange={fe => {
      if (!fe) {
        Ue(null);
      }
    }} onOpenApp={wr} onRefresh={qs} onOpenBgSettings={qa} onRemove={$a} /><_Component109 open={We.open} widgetName={rn((ju = (sc = We.widget) == null ? undefined : sc.widget) == null ? undefined : ju.name, it) || ""} onConfirm={qh} onCancel={() => lt({
      open: false,
      widget: null
    })} /><_Component110 open={Ge.open} workspace={Ge.workspace} windows={Ge.windows || []} widgets={Ge.widgets || []} workspaces={C} homeId={W} onConfirm={Ga} onCancel={() => Ye({
      open: false,
      workspace: null
    })} /><_Component111 open={Qe.open} defaultName={Qe.defaultName} onConfirm={Jo} onCancel={() => gt({
      open: false
    })} /><_Component112 open={en} checks={(h == null ? undefined : h.checks) || []} onRetry={() => window.location.reload()} /></div>;
}
function _Component115() {
  return <SN position="bottom-right"><_Component114><_Component113 /></_Component114></SN>;
}
gk.createRoot(document.getElementById("root")).render(<Dn.StrictMode><_Component115 /></Dn.StrictMode>);