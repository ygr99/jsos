// [jsos-local-grid] 外科补丁：桌面网格右边界与网格线对齐（配合 assets/restored/07-app-core.js 同名标记）
// 背景：原公式 floor((innerWidth-40)/104) 要求整格距(含8px间隙)塞进左右边距，
//       宽 1280（1920@150%）时最右一列看得见却放不进；改为 floor((innerWidth-20)/104)。
// 用法: node tools/patch-grid-bound.mjs   （幂等：已打过则跳过）
import { readFileSync, writeFileSync } from 'fs';
const FILE = 'assets/index-restored.js';
let s = readFileSync(FILE, 'utf8');
const must = (cond, msg) => { if (!cond) throw new Error(msg); };
const count = (hay, needle) => hay.split(needle).length - 1;

const REPL = [
  ['window.innerWidth-R1*2', 'window.innerWidth-R1', 2], // Ni + k1（图标拖拽判定/找最近格）
  ['window.innerWidth-$c*2', 'window.innerWidth-$c', 1], // 图标 findEmptyCell（自动落位）
  ['window.innerWidth-Ai*2', 'window.innerWidth-Ai', 3], // 小组件 findEmpty/拖拽判定/resize 判定
  ['<=ae-q+1;', '<=ae-q;', 1], // 小组件自动落位循环上界：原比拖拽判定多放一列（上游 off-by-one；分片源码里是 ae-Y+1，产物中 Y 被压缩为 q）
];
let changed = false;
for (const [from, to, n] of REPL) {
  const c = count(s, from);
  if (c === 0) {
    must(count(s, to) >= n, `既无 ${from} 也无 ${to}，产物形态变了，人工检查`);
    console.log(`跳过（已打）: ${from} x${count(s, to)}`);
    continue;
  }
  must(c === n, `${from} 出现 ${c} 次，预期 ${n} 次，人工检查`);
  s = s.split(from).join(to);
  changed = true;
  console.log(`替换: ${from} -> ${to} x${n}`);
}
if (changed) {
  writeFileSync(FILE, s);
  console.log('OK ->', FILE);
} else {
  console.log('无改动（补丁均已生效）');
}
