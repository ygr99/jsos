# AGENTS.md — JSOS 主仓库开发指南（AI 接手必读）

> 本仓库是 JSOS（浏览器里的 Web 桌面）的**静态部署仓库**。上游是 jsos-dev/jsos，本 fork 的前端源码不在仓库里——`assets/` 下是构建产物，我们已建立"反编译还原 → 修改 → 回编译"的完整管线。所有文档、注释、提交信息使用中文。

## 1. 项目本质与目录结构

```
C:\Users\99\jsos
├── index.html                  # 入口；引用 /assets/index-restored.js（我们编译的压缩版）
├── assets/
│   ├── index-liunM0pp.js       # 原始压缩 bundle（上游产物，勿删勿改，仅作参照）
│   ├── index-D_GfNr6K.css      # 原始压缩 CSS（仍在使用）
│   ├── index-restored.js       # ★ 当前生效的 JS：还原分片重建 + esbuild 压缩后的产物
│   ├── restored/               # ★ 可读源码：12 个分片 + README（详见其 README.md）
│   └── cracked/                # webcrack 早期产物（JSZip 已拆模块），仅参考
├── apps/                       # 内置应用 zip + 商店应用 zip + 商店图标
├── builtin-apps.json           # 内置应用注册表（启动自动安装，isSystem 不可卸载）
├── store.json                  # ★ 应用商店目录（本仓库本地化后商店数据源）
├── serve.json / _headers       # 本地(Clareflare Pages)响应头：COOP/COEP + 商店资源 CORS/CORP
├── tools/rebuild.mjs           # ★ 一键重建：拼接 12 分片 → esbuild(minify+JSX) → index-restored.js
├── daemon/                     # 守护进程 zip（应用内拉取）
└── AGENTS.md                   # 本文件
```

## 2. 标准开发流程（改网站 = 3 步）

1. 改 `assets/restored/` 里对应的分片（见下方分片地图）
2. `node tools/rebuild.mjs`（需要 `npm i --no-save esbuild jszip`）
3. 刷新浏览器即生效；`git commit`（**推送前必须经用户确认**）

构建产物是压缩过的单文件，`index.html` 引用它。分片间**共享同一顶层作用域**，新增顶层标识符必须用独特前缀（历史先例：`__jsosZipCache`、`jsFetchAppAsset`）。

## 3. 分片地图（assets/restored/）

| 分片 | 内容 | 常改什么 |
|------|------|----------|
| 00-04 | prelude + React 19.2.7 + scheduler + ReactDOM | 不动 |
| 05-app-consts-and-misc | 应用常量、i18n 部分、IndexedDB 封装（`jw` 内置安装标记 isSystem、`Nf` 安装写入、`qM` 查版本） | 少动 |
| 06-jszip-pako | JSZip 3.10.1 + pako | 不动 |
| 07-app-core | **window.JSOS API 定义**（notify/toast/parseZip/installApp/uninstallApp/fetchAppAsset…）、内置应用启动安装循环（已优化为并行预取）、i18n 文案 | API、文案 |
| 08-lucide-icons | lucide 图标定义（`Ht("名字", 节点数组)` 模式） | 图标 |
| 09-ui-components | shadcn 风格 UI 组件 | 少动 |
| 10-use-sync-external-store | shim | 不动 |
| 11-app-main-jsx | **桌面主体**（JSX 已还原）：API 分发 switch（`case "installApp"` 等）、桌面右键菜单、窗口管理、`jsFetchAppAsset` 实现 | 桌面行为 |

## 4. 启动与测试

```bash
npx serve -l 4173 .        # serve.json 自动带 COOP/COEP（WebContainer 必需）
```

- 完整体验（WebContainer 跑应用）：必须用户本机 Chrome/Edge 访问 http://localhost:4173/
- AI 内嵌测试浏览器**无法跑 WebContainer**（SharedArrayBuffer 检测不过），只能验证：桌面渲染、网络请求、静态资源。涉及应用内功能的改动，最后一步永远是请用户实测确认。

## 5. 应用系统机制（核心）

### 内置应用（builtin-apps.json）
- 启动时逐条比对版本：不一致 → 下载 zip（并行预取）→ 安装 → 写入 `isSystem: true + builtinVersion`
- **isSystem=true 的应用在应用管理里没有卸载按钮**（UI 层保护），这就是"默认应用不可卸载"
- 更新某内置应用：改 zip + bump `builtin-apps.json` 的 version + zipUrl，启动时自动更新（更新前会先删 `workspace/apps/<id>` 旧文件）

### 商店（store.json）
- appmanager（应用管理）从主站拉 `/store.json`：`{ appCount, apps: [...] }`
- 条目字段：`id, name{en,zh-CN}, description{en,zh-CN}, version, icon(data URL!), category, tags[], author, zipUrl, stars, updatedAt`
- **icon 必须用 data URL**（`data:image/svg+xml;base64,...`）——`<img>` 请求 localhost 会被 WebContainer 预览 SW 拦截，只有 fetchAppAsset 通道能拿主站资源
- 商店条目带 `zipUrl` → 点击卡片经 `JSOS.fetchAppAsset` 下载 → `JSOS.parseZip` → （升级时先 `uninstallApp(id,false)` 保数据）→ `JSOS.installApp`
- 商店应用**不进** builtin-apps.json → 不自动安装、不上桌面、`isSystem=false` 可卸载
- 商店 UI 已定制：无星标排序（默认"更新时间"）、无标签行、元信息只显示时间

### 为什么应用里 fetch 不到主站（重要教训）
WebContainer 给应用 iframe 注册预览 SW，应用内发出的 `localhost` 请求被路由进容器内部 → 必然网络错误。**跨源资源一律走 `window.JSOS.fetchAppAsset({url:"/path"})`**（主页面同源 fetch 后 base64 回传；仅允许站内绝对路径）。现有一侧定义在 07 分片（API 方法）、一侧在 11 分片（`jsFetchAppAsset` 实现 + switch 分支）。

## 6. 应用打包铁律

- **必须用 JSZip 打包**（正向斜杠）。PowerShell `Compress-Archive` 写反斜杠条目名，子目录（dist/、public/）解包后全部错位 → 应用 404。血泪教训，勿再犯。
- zip 根级放 `package.json`、`server.js`、`icon.svg`、静态资源目录；排除 `node_modules`、`data/`、`package-lock.json`
- 范例：`C:\Users\99\jsos-apps\dev.jsos.appmanager\build.mjs`

## 7. 其他约定

- 原始产物是别人构建的：改前想清楚是否可逆，每步 git 提交（规范见 **§8**），push 必须用户点头
- `serve.json`/`_headers` 中 `/store.json` 与 `/apps/**` 的 CORS+CORP 头是商店工作的前提，勿删
- 应用管理（appmanager）的源码与构建在 `C:\Users\99\jsos-apps\dev.jsos.appmanager`（见该目录 AGENTS.md），改完需 bump 版本并同步 `builtin-apps.json`

## 8. Git 提交信息规范（2026-09-10 用户拍板，新提交一律照此）

**格式：`<中文类型>(<中文 scope>): <更新日志式描述>` —— 类型和 scope 都用中文，描述要让普通用户也看得懂。**

```
新增(日历): 新增「下一个假期」桌面小组件 1.9.0
修复(朋友圈): 修好上一版服务端存储迁移的致命 bug，1.1.0 上架
优化(每日速览): 「每日 jsos 更新」每一行右侧对齐，不再箭头和编号混着排 1.5.1
修复(应用管理): 手机上折叠侧边栏后，添加小组件页的内容被侧栏挡住 1.2.26
新增(工具箱): 便携小空调工具 1.2.0
调整(平台): 窗口与小组件的 URL 不再追加冗余参数
文档: Git 提交规范改为中文类型 + 更新日志式描述
```

- **中文类型**（括号内为等价的英文写法，仅供对照）：

  | 类型 | 含义 | 对应英文 |
  |------|------|----------|
  | 新增 | 新功能、新应用、新栏目 | feat |
  | 修复 | 修 bug | fix |
  | 优化 | 体验 / 性能 / 文案打磨（不改变既有行为） | perf · style |
  | 调整 | 有意的行为或结构变更 | refactor |
  | 文档 | 文档改动 | docs |
  | 杂务 | 上架、打包、版本号、依赖 | chore |
  | 构建 | 构建管线（`tools/`、`build.mjs`） | build |
  | 测试 | 测试脚本 | test |

- **描述 = 一条更新日志**：写给普通用户看，一句话说清「更新后能感知到什么变化」
  - 不用只有开发者懂的说法（函数名、分片名、`store.json`、TTL、CORS、`pl-14` 之类）；这些细节放正文
  - 末尾带版本号（如 `1.9.0`）；补充说明用 `——` 接在版本号之前
  - 类型已表达动作，描述里再重复一次「新增 / 修复」不算错，但更推荐直接写变化本身（`新增(日历): 「下一个假期」桌面小组件 1.9.0`）
- **正文**（推荐）：用 `- ` 要点写「改了什么 / 为什么这么改 / 怎么验证的（脚本名 + 断言数 + 全绿）」；技术细节、踩坑都放这里
- **scope 仍是应用中文名**（= `store.json` / `builtin-apps.json` 的 `name.zh-CN`）：

  | 类别 | scope |
  |------|-------|
  | 商店应用 | 每日速览 · 书影音游 · 音乐 · 小姐姐视频 · 随机盒子 · 网页屏保 · 朋友圈 · Markdown 笔记 · 番茄钟 · 备忘快帖 · 全网热榜 · 天气 · 日历 · 桌面宠物 · 工具箱 · 小游戏 · 看电视 · 日子 |
  | 内置/上游应用 | 终端 · Node.js · 应用管理 · 设置 · 文件管理器 · 日期时间 · 开发文档（其余第三方按 `name.zh-CN`，如 `图小小`、`流体实验室`） |
  | 仓库自身 | 平台（`assets/restored/` 分片、桌面主体、窗口管理）· 商店（`store.json`、`builtin-apps.json`）· 构建（`tools/`）；纯文档 / 杂务可省略 scope，直接写 `文档: ...`、`杂务: ...` |

- 历史提交里的旧英文风格（`fix(moments): ...`、`feat(calendar): ...`、`daily-brief 1.4.1: ...`）**不回改**，只约束新提交
- 提交只落本地，**push 必须用户确认**；一个提交做一件事（同一件事的代码改动 + 上架/版本号 + 文档同步可合并成一个提交）
