# 还原产物说明

由 assets/index-liunM0pp.js（Vite 压缩产物）还原而来，无 sourcemap，边界为近似值。
各分片已通过 esbuild JSX 语法校验，但相互之间共享顶层作用域，**不能单独运行**，仅供阅读分析。

- 00-prelude-and-jsx-runtime: 兼容 prelude + react-jsx-runtime
- 01-react.production: React 19.2.7 核心
- 02-scheduler.production: React 调度器
- 03-react-dom.production / 04-react-dom-client.production: ReactDOM
- 05-app-consts-and-misc: 应用常量与杂项（jsos-apps 等）
- 06-jszip-pako: JSZip 3.10.1 + pako（webcrack 同时拆出了独立模块目录 ../cracked/modules）
- 07-app-core: JSOS 应用核心逻辑（window.JSOS API 等）
- 08-lucide-icons: lucide-react v1.18.0 图标
- 09-ui-components: shadcn 风格 UI 组件
- 10-use-sync-external-store: use-sync-external-store shim
- 11-app-main-jsx: 主应用代码（webcrack 已还原为 JSX）

## 可运行版

assets/index-restored.js 是把 12 个分片按序拼回、经 esbuild 以 `--jsx-factory=At.createElement --jsx-fragment=At.Fragment` 编译后的可运行版本，已在本地 serve + 浏览器实测：桌面、图标、兼容性检测对话框均正常渲染。

复现：
1. 按序拼接 12 个分片（去掉文件头注释行）
2. esbuild 编译 JSX（工厂函数为 bundle 内的 React 命名空间 At）
3. 临时把 index.html 的 script src 指向 /assets/index-restored.js
4. `npx serve -l 4173 .`（serve.json 提供 WebContainer 所需 COOP/COEP 头）

## 优化记录

**内置应用 zip 并行下载**（修改 07-app-core.js，2026-08-29）：

原版启动时在 for 循环里串行 `await fetch` 逐个下载 6 个内置应用 zip（约 2.3MB，A/B 实测首包时间跨度 419ms，真实网络需 6 次串行往返）；修改为按"已安装版本比对"先并行预取，安装流程仍保持串行、跳过逻辑与事件不变。A/B 同条件实测：原版跨度 419ms → 优化版 3ms，6 个应用全部安装成功并持久化，桌面渲染无差异。

重建：`node tools/rebuild.mjs`（拼接 12 分片 → esbuild JSX 编译 + minify 压缩 → assets/index-restored.js，gzip 后约 447KB）
