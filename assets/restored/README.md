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
