// [08-lucide-icons] 还原自 index-liunM0pp.js 第 48205-49000 行（边界为近似值，无 sourcemap）
function pt(...e) {
  return II(W1(e));
} /**
  * @license lucide-react v1.18.0 - ISC
  *
  * This source code is licensed under the ISC license.
  * See the LICENSE file in the root directory of this source tree.
  */
const oC = (...e) => e.filter((n, r, i) => !!n && n.trim() !== "" && i.indexOf(n) === r).join(" ").trim(); /**
                                                                                                           * @license lucide-react v1.18.0 - ISC
                                                                                                           *
                                                                                                           * This source code is licensed under the ISC license.
                                                                                                           * See the LICENSE file in the root directory of this source tree.
                                                                                                           */
const LI = e => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(); /**
                                                                        * @license lucide-react v1.18.0 - ISC
                                                                        *
                                                                        * This source code is licensed under the ISC license.
                                                                        * See the LICENSE file in the root directory of this source tree.
                                                                        */
const PI = e => e.replace(/^([A-Z])|[\s-_]+(\w)/g, (n, r, i) => i ? i.toUpperCase() : r.toLowerCase()); /**
                                                                                                        * @license lucide-react v1.18.0 - ISC
                                                                                                        *
                                                                                                        * This source code is licensed under the ISC license.
                                                                                                        * See the LICENSE file in the root directory of this source tree.
                                                                                                        */
const pS = e => {
  const n = PI(e);
  return n.charAt(0).toUpperCase() + n.slice(1);
}; /**
   * @license lucide-react v1.18.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
var wg = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}; /**
   * @license lucide-react v1.18.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
const BI = e => {
  for (const n in e) {
    if (n.startsWith("aria-") || n === "role" || n === "title") {
      return true;
    }
  }
  return false;
};
const zI = E.createContext({});
const NI = () => E.useContext(zI);
const jI = E.forwardRef(({
  color: e,
  size: n,
  strokeWidth: r,
  absoluteStrokeWidth: i,
  className: o = "",
  children: u,
  iconNode: h,
  ...a
}, c) => {
  const {
    size: d = 24,
    strokeWidth: p = 2,
    absoluteStrokeWidth: f = false,
    color: S = "currentColor",
    className: _ = ""
  } = NI() ?? {};
  const x = i ?? f ? Number(r ?? p) * 24 / Number(n ?? d) : r ?? p;
  return E.createElement("svg", {
    ref: c,
    ...wg,
    width: n ?? d ?? wg.width,
    height: n ?? d ?? wg.height,
    stroke: e ?? S,
    strokeWidth: x,
    className: oC("lucide", _, o),
    ...(!u && !BI(a) && {
      "aria-hidden": "true"
    }),
    ...a
  }, [...h.map(([w, g]) => E.createElement(w, g)), ...(Array.isArray(u) ? u : [u])]);
});
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ht = (e, n) => {
  const r = E.forwardRef(({
    className: i,
    ...o
  }, u) => E.createElement(jI, {
    ref: u,
    iconNode: n,
    className: oC(`lucide-${LI(pS(e))}`, `lucide-${e}`, i),
    ...o
  }));
  r.displayName = pS(e);
  return r;
}; /**
   * @license lucide-react v1.18.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
const HI = [["path", {
  d: "M12 5v14",
  key: "s699le"
}], ["path", {
  d: "m19 12-7 7-7-7",
  key: "1idqje"
}]];
const FI = Ht("arrow-down", HI);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const UI = [["path", {
  d: "m12 19-7-7 7-7",
  key: "1l729n"
}], ["path", {
  d: "M19 12H5",
  key: "x3x0zl"
}]];
const VI = Ht("arrow-left", UI);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const WI = [["path", {
  d: "M5 12h14",
  key: "1ays0h"
}], ["path", {
  d: "m12 5 7 7-7 7",
  key: "xquz4c"
}]];
const _Component50 = Ht("arrow-right", WI);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const $I = [["path", {
  d: "m5 12 7-7 7 7",
  key: "hav0vg"
}], ["path", {
  d: "M12 19V5",
  key: "x0mq9r"
}]];
const qI = Ht("arrow-up", $I);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const GI = [["path", {
  d: "m6 9 6 6 6-6",
  key: "qrunsl"
}]];
const _Component29 = Ht("chevron-down", GI);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const YI = [["path", {
  d: "m15 18-6-6 6-6",
  key: "1wnfg3"
}]];
const XI = Ht("chevron-left", YI);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const KI = [["path", {
  d: "m9 18 6-6-6-6",
  key: "mthhwq"
}]];
const _Component18 = Ht("chevron-right", KI);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const ZI = [["path", {
  d: "m18 15-6-6-6 6",
  key: "153udz"
}]];
const _Component28 = Ht("chevron-up", ZI);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const QI = [["path", {
  d: "m7 15 5 5 5-5",
  key: "1hf1tw"
}], ["path", {
  d: "m7 9 5-5 5 5",
  key: "sgt6xg"
}]];
const _Component39 = Ht("chevrons-up-down", QI);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const JI = [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["line", {
  x1: "12",
  x2: "12",
  y1: "8",
  y2: "12",
  key: "1pkeuh"
}], ["line", {
  x1: "12",
  x2: "12.01",
  y1: "16",
  y2: "16",
  key: "4dfq90"
}]];
const e5 = Ht("circle-alert", JI);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const t5 = [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "m9 12 2 2 4-4",
  key: "dzmm74"
}]];
const n5 = Ht("circle-check", t5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const r5 = [["circle", {
  cx: "12",
  cy: "12",
  r: "1",
  key: "41hilf"
}], ["circle", {
  cx: "12",
  cy: "5",
  r: "1",
  key: "gxeob9"
}], ["circle", {
  cx: "12",
  cy: "19",
  r: "1",
  key: "lyex9k"
}]];
const _Component20 = Ht("ellipsis-vertical", r5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const i5 = [["path", {
  d: "M15 3h6v6",
  key: "1q9fwt"
}], ["path", {
  d: "M10 14 21 3",
  key: "gplh6r"
}], ["path", {
  d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
  key: "a6xqqp"
}]];
const _Component71 = Ht("external-link", i5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const a5 = [["path", {
  d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
  key: "1oefj6"
}], ["path", {
  d: "M14 2v5a1 1 0 0 0 1 1h5",
  key: "wfsgrz"
}], ["path", {
  d: "M10 9H8",
  key: "b1mrlr"
}], ["path", {
  d: "M16 13H8",
  key: "t4e002"
}], ["path", {
  d: "M16 17H8",
  key: "z1uh3a"
}]];
const Tf = Ht("file-text", a5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const l5 = [["path", {
  d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
  key: "usdka0"
}]];
const _Component49 = Ht("folder-open", l5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const c5 = [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
  key: "13o1zl"
}], ["path", {
  d: "M2 12h20",
  key: "9i4pu4"
}]];
const _Component30 = Ht("globe", c5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const u5 = [["path", {
  d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
  key: "5wwlr5"
}], ["path", {
  d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  key: "r6nss1"
}]];
const _Component31 = Ht("house", u5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const f5 = [["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "3",
  rx: "2",
  ry: "2",
  key: "1m3agn"
}], ["circle", {
  cx: "9",
  cy: "9",
  r: "2",
  key: "af1f0g"
}], ["path", {
  d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",
  key: "1xmnt7"
}]];
const _Component58 = Ht("image", f5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const p5 = [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["path", {
  d: "M12 16v-4",
  key: "1dtifu"
}], ["path", {
  d: "M12 8h.01",
  key: "e9boi3"
}]];
const Hv = Ht("info", p5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const m5 = [["path", {
  d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
  key: "zw3jo"
}], ["path", {
  d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
  key: "1wduqc"
}], ["path", {
  d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
  key: "kqbvx6"
}]];
const _Component32 = Ht("layers", m5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const g5 = [["rect", {
  width: "7",
  height: "7",
  x: "3",
  y: "3",
  rx: "1",
  key: "1g98yp"
}], ["rect", {
  width: "7",
  height: "7",
  x: "14",
  y: "3",
  rx: "1",
  key: "6d4xhi"
}], ["rect", {
  width: "7",
  height: "7",
  x: "14",
  y: "14",
  rx: "1",
  key: "nxv5o0"
}], ["rect", {
  width: "7",
  height: "7",
  x: "3",
  y: "14",
  rx: "1",
  key: "1bb6yr"
}]];
const _Component57 = Ht("layout-grid", g5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const b5 = [["path", {
  d: "M21 12a9 9 0 1 1-6.219-8.56",
  key: "13zald"
}]];
const _Component = Ht("loader-circle", b5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const y5 = [["rect", {
  width: "18",
  height: "11",
  x: "3",
  y: "11",
  rx: "2",
  ry: "2",
  key: "1w4ew1"
}], ["path", {
  d: "M7 11V7a5 5 0 0 1 9.9-1",
  key: "1mm8w8"
}]];
const _5 = Ht("lock-open", y5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const w5 = [["rect", {
  width: "18",
  height: "11",
  x: "3",
  y: "11",
  rx: "2",
  ry: "2",
  key: "1w4ew1"
}], ["path", {
  d: "M7 11V7a5 5 0 0 1 10 0v4",
  key: "fwvmzm"
}]];
const S5 = Ht("lock", w5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const x5 = [["path", {
  d: "M15 3h6v6",
  key: "1q9fwt"
}], ["path", {
  d: "m21 3-7 7",
  key: "1l2asr"
}], ["path", {
  d: "m3 21 7-7",
  key: "tjx5ai"
}], ["path", {
  d: "M9 21H3v-6",
  key: "wtvkvv"
}]];
const _Component22 = Ht("maximize-2", x5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const C5 = [["path", {
  d: "m14 10 7-7",
  key: "oa77jy"
}], ["path", {
  d: "M20 10h-6V4",
  key: "mjg0md"
}], ["path", {
  d: "m3 21 7-7",
  key: "tjx5ai"
}], ["path", {
  d: "M4 14h6v6",
  key: "rmj7iw"
}]];
const _Component21 = Ht("minimize-2", C5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const E5 = [["path", {
  d: "M5 12h14",
  key: "1ays0h"
}]];
const R5 = Ht("minus", E5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const T5 = [["rect", {
  width: "20",
  height: "14",
  x: "2",
  y: "3",
  rx: "2",
  key: "48i651"
}], ["line", {
  x1: "8",
  x2: "16",
  y1: "21",
  y2: "21",
  key: "1svkeh"
}], ["line", {
  x1: "12",
  x2: "12",
  y1: "17",
  y2: "21",
  key: "vw1qmm"
}]];
const _Component60 = Ht("monitor", T5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const A5 = [["path", {
  d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
  key: "e79jfc"
}], ["circle", {
  cx: "13.5",
  cy: "6.5",
  r: ".5",
  fill: "currentColor",
  key: "1okk4w"
}], ["circle", {
  cx: "17.5",
  cy: "10.5",
  r: ".5",
  fill: "currentColor",
  key: "f64h9f"
}], ["circle", {
  cx: "6.5",
  cy: "12.5",
  r: ".5",
  fill: "currentColor",
  key: "qy21gx"
}], ["circle", {
  cx: "8.5",
  cy: "7.5",
  r: ".5",
  fill: "currentColor",
  key: "fotxhn"
}]];
const M5 = Ht("palette", A5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const O5 = [["path", {
  d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
  key: "1a8usu"
}], ["path", {
  d: "m15 5 4 4",
  key: "1mk7zo"
}]];
const D5 = Ht("pencil", O5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const I5 = [["path", {
  d: "M5 12h14",
  key: "1ays0h"
}], ["path", {
  d: "M12 5v14",
  key: "s699le"
}]];
const _Component33 = Ht("plus", I5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const L5 = [["path", {
  d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
  key: "v9h5vc"
}], ["path", {
  d: "M21 3v5h-5",
  key: "1q7to0"
}], ["path", {
  d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
  key: "3uifl3"
}], ["path", {
  d: "M8 16H3v5",
  key: "1cv678"
}]];
const _Component70 = Ht("refresh-cw", L5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const P5 = [["path", {
  d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8",
  key: "1p45f6"
}], ["path", {
  d: "M21 3v5h-5",
  key: "1q7to0"
}]];
const _Component27 = Ht("rotate-cw", P5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const B5 = [["path", {
  d: "m21 21-4.34-4.34",
  key: "14j7rj"
}], ["circle", {
  cx: "11",
  cy: "11",
  r: "8",
  key: "4ej97u"
}]];
const _Component47 = Ht("search", B5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const z5 = [["path", {
  d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
  key: "1i5ecw"
}], ["circle", {
  cx: "12",
  cy: "12",
  r: "3",
  key: "1v7zrd"
}]];
const _Component61 = Ht("settings", z5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const N5 = [["path", {
  d: "M10 11v6",
  key: "nco0om"
}], ["path", {
  d: "M14 11v6",
  key: "outv1u"
}], ["path", {
  d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
  key: "miytrc"
}], ["path", {
  d: "M3 6h18",
  key: "d0wm0j"
}], ["path", {
  d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  key: "e791ji"
}]];
const Su = Ht("trash-2", N5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const j5 = [["path", {
  d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
  key: "wmoenq"
}], ["path", {
  d: "M12 9v4",
  key: "juzpu7"
}], ["path", {
  d: "M12 17h.01",
  key: "p32p05"
}]];
const H5 = Ht("triangle-alert", j5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const F5 = [["path", {
  d: "M12 3v12",
  key: "1x0j5s"
}], ["path", {
  d: "m17 8-5-5-5 5",
  key: "7q97r8"
}], ["path", {
  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
  key: "ih7n3h"
}]];
const U5 = Ht("upload", F5);
/**
* @license lucide-react v1.18.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const V5 = [["path", {
  d: "M18 6 6 18",
  key: "1bl5f8"
}], ["path", {
  d: "m6 6 12 12",
  key: "d8bk6v"
}]];
const _Component23 = Ht("x", V5);