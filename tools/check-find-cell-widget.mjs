// 回归：桌面自动落位（findEmptyCell）必须避让「桌面小组件」占用的格子
// 场景：第一排只剩 2 格 → 放入 2 格宽的小组件占满第一排 → 安装新应用时，
//       新图标应落到下一行 / 第一排之后的第一个空位，而不是叠在小组件上。
// 做法：直接从 assets/index-restored.js 提取真实的 Ls / T1 / findEmptyCell(L) 执行仿真
//       （不重建、不依赖浏览器），并与旧实现（只避让图标）做对照。
// 用法: node tools/check-find-cell-widget.mjs
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const s = readFileSync(join(root, 'assets/index-restored.js'), 'utf8');

let pass = 0, fail = 0;
const ok = (cond, msg) => { if (cond) { pass++; console.log('  ✓ ' + msg); } else { fail++; console.error('  ✗ ' + msg); } };

// ── 0. 静态形态：旧实现（手写 Set 只收图标）应已不存在，findEmptyCell 改用 T1 ──
console.log('[1] 产物静态形态');
ok(!s.includes('const H=new Set;for(const[z,U]of Object.entries(l))z!==Y&&U.workspaceId===D&&H.add('), '旧形态（只收集图标占格）已不存在');
ok(s.split('L=E.useCallback((D,Y)=>{const H=T1(w.current,v.current,g.current,D,Y,"icon");').length - 1 === 1, 'findEmptyCell 已改用 T1(..., "icon")');

// ── 1. 从产物提取真实函数：const ef / function Ls / const QO,Ur / function T1 / L ──
console.log('[2] 从产物提取真实函数');
const iEf = s.indexOf('const ef=104');
const iLs = s.indexOf('function Ls(e){', iEf);
const iQO = s.indexOf('const QO=96', iLs);
const iT1 = s.indexOf('function T1(', iQO);
const iNi = s.indexOf('function Ni(', iT1);
const iL = s.indexOf('L=E.useCallback((D,Y)=>{', iT1);
const iLend = s.indexOf('}},[l])', iL);
ok(iEf >= 0 && iLs > iEf && iQO > iLs && iT1 > iQO && iNi > iT1 && iL > iNi && iLend > iL, '锚点全部找到');
const LText = s.slice(iL, iLend + 7); // "...y:$*Pi}},[l])"

const env = new Function(`
  ${s.slice(iEf, iLs)};   // const ef=104,Li=8;
  ${s.slice(iLs, iQO)}    // function Ls(e){...}
  ${s.slice(iQO, iT1)}    // const QO=96,JO=8,Ur=QO+JO,R1=20;
  ${s.slice(iT1, iNi)}    // function T1(...){...}
  return { Ls, T1, Ur };
`)();
ok(env.Ur === 104, `Ur=${env.Ur}（=104，与网格一致）`);

// ── 2. 执行仿真：真实 findEmptyCell(修复后) ──
const mkL = new Function('E', 'T1', 'w', 'v', 'g', 'l', 'Pi', '$c', 'window', LText + '; return L;');
const mkEnv = (icons, wpos, widgets) => mkL(
  { useCallback: fn => fn },
  env.T1,
  { current: icons },   // w: 图标位置（ref）
  { current: wpos },    // v: 小组件位置（ref）
  { current: widgets }, // g: 小组件定义（ref, Map）
  icons,                // l: 图标位置（state，用于行上界）
  104,                  // Pi
  20,                   // $c
  { innerWidth: 1280 }, // window
);
// 旧实现（修复前）：占用集只收图标
function oldFindEmptyCell(icons, workspaceId) {
  const G = new Set();
  for (const [id, p] of Object.entries(icons)) {
    if (p.workspaceId === workspaceId) G.add(`${p.x},${p.y}`);
  }
  for (let row = 0; ; row++) {
    for (let col = 0; col < 100; col++) {
      const x = col * 104, y = row * 104;
      if (!G.has(`${x},${y}`)) return { x, y };
    }
  }
}

console.log('[3] 场景：图标 (0,0) + 2×1 小组件占 (104,0)(208,0) → 新应用应落到 (312,0)');
{
  const icons = { AppA: { workspaceId: 'home', x: 0, y: 0 } };
  const wpos = { W1: { x: 104, y: 0 } };
  const widgets = new Map([['W1', { workspaceId: 'home', widget: { cols: 2, rows: 1 } }]]);
  const now = mkEnv(icons, wpos, widgets)('home', 'NewApp');
  const old = oldFindEmptyCell(icons, 'home');
  ok(old.x === 104 && old.y === 0, `对照：旧实现落在 (${old.x},${old.y}) —— 正是小组件覆盖的位置`);
  ok(now.x === 312 && now.y === 0, `修复后落在 (${now.x},${now.y}) —— 第一排第一个空位`);
}

console.log('[4] 场景：2×2 小组件占 (0,0)(104,0)(0,104)(104,104)、无图标 → 应落到 (208,0)');
{
  const wpos = { W1: { x: 0, y: 0 } };
  const widgets = new Map([['W1', { workspaceId: 'home', widget: { cols: 2, rows: 2 } }]]);
  const now = mkEnv({}, wpos, widgets)('home', 'NewApp');
  ok(now.x === 208 && now.y === 0, `修复后落在 (${now.x},${now.y})`);
}

console.log('[5] 回归：无小组件时行为不变（图标 (0,0)+(104,0) → 新应用落到 (208,0)）');
{
  const icons = { AppA: { workspaceId: 'home', x: 0, y: 0 }, AppB: { workspaceId: 'home', x: 104, y: 0 } };
  const now = mkEnv(icons, {}, new Map())('home', 'NewApp');
  ok(now.x === 208 && now.y === 0, `修复后落在 (${now.x},${now.y})`);
}

console.log('[6] 回归：其他工作区的小组件不影响本区落位（home 里图标 (0,0) → 落到 (104,0)）');
{
  const icons = { AppA: { workspaceId: 'home', x: 0, y: 0 } };
  const wpos = { W1: { x: 104, y: 0 } };
  const widgets = new Map([['W1', { workspaceId: 'work', widget: { cols: 2, rows: 1 } }]]);
  const now = mkEnv(icons, wpos, widgets)('home', 'NewApp');
  ok(now.x === 104 && now.y === 0, `修复后落在 (${now.x},${now.y})`);
}

console.log(`\n${fail === 0 ? '全部通过' : '有失败'}：${pass} 通过 / ${fail} 失败`);
process.exit(fail === 0 ? 0 : 1);