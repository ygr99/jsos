// 重建脚本：拼接还原分片 → esbuild 编译 JSX → assets/index-restored.js
// 用法: node tools/rebuild.mjs
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { transformSync } from 'esbuild';

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

writeFileSync('assets/index-restored.js', out);
console.log('OK -> assets/index-restored.js', (out.length / 1024 / 1024).toFixed(2) + 'MB');
