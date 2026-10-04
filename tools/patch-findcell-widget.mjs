// [jsos-local-findcell] 外科补丁：桌面自动落位（findEmptyCell）的占用格计入桌面小组件占位
// 背景：安装应用后新图标自动罗列时只避让了已有图标，未避让小组件占用的格子
//       → 新应用会被放到小组件覆盖的位置（卡片搭在小组件上）。
//       平台已有 T1()（拖拽碰撞检测用：图标 + 小组件占格合并），自动落位改为复用 T1。
// 配合 assets/restored/07-app-core.js 同名标记。
// 用法: node tools/patch-findcell-widget.mjs   （幂等：已打过则跳过）
import { readFileSync, writeFileSync } from 'fs';
const FILE = 'assets/index-restored.js';
let s = readFileSync(FILE, 'utf8');
const must = (cond, msg) => { if (!cond) throw new Error(msg); };
const count = (hay, needle) => hay.split(needle).length - 1;

const FROM = 'L=E.useCallback((D,Y)=>{const H=new Set;for(const[z,U]of Object.entries(l))z!==Y&&U.workspaceId===D&&H.add(`${U.x},${U.y}`);';
const TO = 'L=E.useCallback((D,Y)=>{const H=T1(w.current,v.current,g.current,D,Y,"icon");';

const cFrom = count(s, FROM);
const cTo = count(s, TO);
if (cFrom === 0) {
  must(cTo === 1, `既无旧形态也无新形态（新形态 ${cTo} 处），产物结构变了，人工检查`);
  console.log('跳过（已打）：findEmptyCell 已改用 T1 合并小组件占位');
} else {
  must(cFrom === 1, `旧形态出现 ${cFrom} 次，预期 1 次，人工检查`);
  must(cTo === 0, '同时存在新旧形态，产物状态异常，人工检查');
  s = s.replace(FROM, TO);
  writeFileSync(FILE, s);
  console.log('OK ->', FILE);
}