// 重建脚本：拼接还原分片 → esbuild 编译 JSX → assets/index-restored.js
// 用法: node tools/rebuild.mjs
//
// 2026-10-09 起加了两道保险：
//   1. 写盘前先备份旧产物到 tools/.backup/，重建坏了能直接捞回来
//   2. 写盘后校验关键补丁没被重建抹掉（__jsos_wid / __jsos_wipe）
//      —— 历史上正是「只存在于产物、不在分片」的补丁被重建悄悄冲掉过
import { readFileSync, writeFileSync, readdirSync, mkdirSync, copyFileSync, existsSync } from 'fs';
import { transformSync } from 'esbuild';

const OUT = 'assets/index-restored.js';
const BACKUP_DIR = 'tools/.backup';

// 重建后必须还在的补丁签名（产物里都应恰好出现 ≥1 次）
const REQUIRED = ['__jsos_wid', '__jsos_wipe'];

const dir = 'assets/restored';
const shards = readdirSync(dir)
  .filter((f) => /^\d{2}-.+\.js$/.test(f))
  .sort();
console.log('shards:', shards.join(', '));

const combined = shards
  .map((f) => readFileSync(`${dir}/${f}`, 'utf8').split('\n').slice(1).join('\n'))
  .join('\n');

const out = transformSync(combined, {
  loader: 'jsx',
  jsxFactory: 'At.createElement',
  jsxFragment: 'At.Fragment',
  minify: true,
  sourcemap: false,
}).code;

// 写盘前先备份 —— 重建是覆盖操作，出错就回不来了
if (existsSync(OUT)) {
  mkdirSync(BACKUP_DIR, { recursive: true });
  const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  const bak = `${BACKUP_DIR}/index-restored.${stamp}.js`;
  copyFileSync(OUT, bak);
  console.log('已备份旧产物 ->', bak);
}

writeFileSync(OUT, out);
console.log('OK -> ' + OUT, (out.length / 1024 / 1024).toFixed(2) + 'MB');

// 校验补丁没丢：丢了一条就立刻报错，别等运行时才发现小组件行为变了
let bad = false;
for (const sig of REQUIRED) {
  const n = out.split(sig).length - 1;
  if (n < 1) {
    console.error(`✗ 重建后丢失补丁签名：${sig} —— 该补丁只存在于产物、不在分片？`);
    bad = true;
  } else {
    console.log(`✓ 补丁保留：${sig} × ${n}`);
  }
}
if (bad) {
  console.error('重建结果可能不完整，已写入但请对照 tools/.backup/ 检查。');
  process.exit(1);
}
