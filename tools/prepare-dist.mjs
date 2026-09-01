// CI 部署前置脚本：把站点运行所需的静态文件收集到 dist/，供 wrangler deploy 上传。
// 只复制白名单——源码分片（assets/restored、assets/cracked）、tools、.git 均不进入部署产物。
import { rmSync, mkdirSync, cpSync, existsSync, statSync, readdirSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// 根目录单文件白名单
const files = [
  "index.html",
  "_headers",
  "bg.webp",
  "logo.svg",
  "default-app-icon.svg",
  "preview-app-icon.svg",
  "screenshot.jpg",
  "builtin-apps.json",
  "store.json"
];

// 整目录白名单
const dirs = ["apps", "icons", "daemon"];

// assets/ 下运行时产物白名单（index.html 实际引用的文件）
const assetFiles = ["index-restored.js", "index-D_GfNr6K.css"];

let count = 0;
let bytes = 0;
function copy(src, dest) {
  if (!existsSync(src)) {
    console.warn(`[prepare-dist] 跳过（不存在）: ${src}`);
    return;
  }
  cpSync(src, dest, { recursive: true });
  count++;
  bytes += statSync(src).size;
}

for (const f of files) copy(f, join(dist, f));
for (const d of dirs) copy(d, join(dist, d));

mkdirSync(join(dist, "assets"), { recursive: true });
for (const f of assetFiles) copy(join("assets", f), join(dist, "assets", f));

function sizeOf(p) {
  if (!existsSync(p)) return 0;
  const st = statSync(p);
  if (st.isDirectory()) {
    return readdirSync(p, { recursive: true }).reduce((acc, e) => {
      const fp = join(p, e);
      try {
        const s = statSync(fp);
        return acc + (s.isFile() ? s.size : 0);
      } catch {
        return acc;
      }
    }, 0);
  }
  return st.size;
}

const mb = (sizeOf(dist) / 1024 / 1024).toFixed(2);
console.log(`[prepare-dist] 完成：dist/ 共 ${mb} MiB`);
