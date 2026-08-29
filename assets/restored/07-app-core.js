// [07-app-core] 还原自 index-liunM0pp.js 第 28516-48204 行（边界为近似值，无 sourcemap）
var lO = aO();
const nu = Tv(lO);
const cO = "jsos-daemon";
const uO = 1;
async function bu() {
  return ah(cO, uO, {
    upgrade(e) {
      if (!e.objectStoreNames.contains("snapshots")) {
        e.createObjectStore("snapshots", {
          keyPath: "id"
        });
      }
      if (!e.objectStoreNames.contains("manifest")) {
        e.createObjectStore("manifest", {
          keyPath: "id"
        });
      }
    }
  });
}
async function dO(e, n) {
  await (await bu()).put("snapshots", {
    id: "daemon",
    snapshot: e,
    version: n,
    updatedAt: Date.now()
  });
}
async function fO() {
  return (await (await bu()).get("snapshots", "daemon")) ?? null;
}
async function Ww() {
  await (await bu()).delete("snapshots", "daemon");
}
async function hO(e) {
  await (await bu()).put("manifest", {
    id: "daemon",
    version: e,
    updatedAt: Date.now()
  });
}
async function pO() {
  return (await (await bu()).get("manifest", "daemon")) ?? null;
}
const mO = "/daemon/latest.zip";
const gO = "/daemon/package.json";
const Vr = "jsos-daemon";
function vO(e) {
  const n = Math.min(e.length, 8192);
  for (let r = 0; r < n; r++) {
    if (e[r] === 0) {
      return true;
    }
  }
  return false;
}
function nv(e) {
  if (typeof e != "string") {
    return e;
  } else {
    return e.replace(/\x1B\[[0-9;]*[a-zA-Z]/g, "");
  }
}
function bO(e) {
  const n = {};
  for (const [r, i] of Object.entries(e)) {
    const o = r.split("/");
    let u = n;
    for (let a = 0; a < o.length - 1; a++) {
      const c = o[a];
      u[c] ||= {
        directory: {}
      };
      u = u[c].directory;
    }
    const h = o[o.length - 1];
    u[h] = {
      file: {
        contents: i
      }
    };
  }
  return n;
}
function yO(e, n) {
  const r = e.split(".").map(Number);
  const i = n.split(".").map(Number);
  for (let o = 0; o < Math.max(r.length, i.length); o++) {
    const u = r[o] || 0;
    const h = i[o] || 0;
    if (u < h) {
      return -1;
    }
    if (u > h) {
      return 1;
    }
  }
  return 0;
}
async function _O() {
  try {
    const e = await fetch(gO);
    if (!e.ok) {
      return {
        needsUpdate: true,
        reason: "fetch-manifest-failed"
      };
    }
    const n = await e.json();
    const r = await pO();
    if (r) {
      if (yO(n.version, r.version) > 0) {
        return {
          needsUpdate: true,
          reason: "version-mismatch",
          version: n.version,
          localVersion: r.version
        };
      } else {
        return {
          needsUpdate: false,
          version: n.version
        };
      }
    } else {
      return {
        needsUpdate: true,
        reason: "no-local-manifest",
        version: n.version
      };
    }
  } catch (e) {
    return {
      needsUpdate: true,
      reason: "check-failed",
      error: e.message
    };
  }
}
async function wO(e) {
  if (e != null) {
    e("Fetching daemon package...");
  }
  const n = await fetch(mO);
  if (!n.ok) {
    throw new Error(`Failed to fetch daemon: ${n.statusText}`);
  }
  const r = await n.arrayBuffer();
  if (e != null) {
    e(`Unpacking daemon (${r.byteLength} bytes)...`);
  }
  const i = await nu.loadAsync(r);
  const o = {};
  for (const [u, h] of Object.entries(i.files)) {
    if (!h.dir) {
      const a = await h.async("uint8array");
      o[u] = vO(a) ? a : new TextDecoder().decode(a);
    }
  }
  return {
    files: o,
    zipData: r
  };
}
async function SO(e, n, r) {
  if (r != null) {
    r("Mounting daemon files...");
  }
  await e.fs.mkdir(`${Vr}/bin`, {
    recursive: true
  });
  await e.fs.mkdir(`${Vr}/lib`, {
    recursive: true
  });
  await e.fs.mkdir(`${Vr}/routes`, {
    recursive: true
  });
  await e.mount(bO(n), {
    mountPoint: Vr
  });
  if (r != null) {
    r("Setting execute permissions...");
  }
  await (await e.spawn("chmod", ["-R", "+x", `${Vr}/bin`])).exit;
  if (r != null) {
    r("Daemon files mounted successfully");
  }
}
async function xO(e, n) {
  if (n != null) {
    n("Installing daemon dependencies...");
  }
  const r = await e.spawn("sh", ["-c", "which pnpm || echo \"not found\""], {
    cwd: Vr
  });
  let i = "";
  r.output.pipeTo(new WritableStream({
    write: u => {
      i += u;
    }
  }));
  await r.exit;
  if (i.includes("not found")) {
    if (n != null) {
      n("Installing pnpm...");
    }
    const u = await e.spawn("sh", ["-c", "npm install -g pnpm"], {
      cwd: Vr
    });
    u.output.pipeTo(new WritableStream({
      write: h => n == null ? undefined : n(nv(h))
    }));
    await u.exit;
  }
  const o = await e.spawn("sh", ["-c", "pnpm install --prod"], {
    cwd: Vr
  });
  o.output.pipeTo(new WritableStream({
    write: u => n == null ? undefined : n(nv(u))
  }));
  await o.exit;
  if (n != null) {
    n("Dependencies installed");
  }
}
async function CO(e) {
  return await e.export(Vr, {
    format: "binary"
  });
}
async function EO(e, n) {
  const r = await _O();
  if (r.needsUpdate) {
    if (n != null) {
      n(`Update needed: ${r.reason}`);
    }
  } else {
    const h = await fO();
    if (h != null && h.snapshot) {
      try {
        if (n != null) {
          n("Restoring daemon from snapshot...");
        }
        await e.fs.mkdir(Vr, {
          recursive: true
        });
        await e.mount(h.snapshot, {
          mountPoint: Vr
        });
        if ((await e.fs.readdir(Vr)).length > 0) {
          if (n != null) {
            n(`Daemon restored from snapshot (v${h.version})`);
          }
          return Vr;
        }
        if (n != null) {
          n("Snapshot restored empty directory, removing corrupted snapshot...");
        }
        await Ww();
      } catch (a) {
        if (n != null) {
          n(`Snapshot restore failed: ${a.message}, reloading...`);
        }
        await Ww();
      }
    }
  }
  const {
    files: i
  } = await wO(n);
  await SO(e, i, n);
  await xO(e, n);
  if (n != null) {
    n("Creating daemon snapshot...");
  }
  const o = await CO(e);
  const u = r.version || "1.0.0";
  await dO(o, u);
  await hO(u);
  if (n != null) {
    n(`Daemon loaded and snapshotted (v${u})`);
  }
  return Vr;
}
async function RO(e, n, r, i) {
  if (r != null) {
    r("Starting daemon process...");
  }
  const o = "1993";
  const u = "1";
  const h = e.workdir || "/home/user";
  const a = `${h}/${n}`;
  const c = `${a}/bin`;
  const f = `${`${a}/node_modules/.bin`}:${c}:/usr/local/bin:/usr/bin:/bin`;
  const S = await e.spawn("node", ["jsos-daemon.js"], {
    cwd: n,
    env: {
      DAEMON_PORT: o,
      DEBUG: u,
      PATH: f,
      HOME: a,
      WORKDIR: h
    }
  });
  let _ = "";
  S.output.pipeTo(new WritableStream({
    write: x => {
      const w = nv(x);
      _ += w;
      const g = _.split(`
`);
      _ = g.pop();
      for (const b of g) {
        const m = b.trim();
        if (m) {
          try {
            const v = JSON.parse(m);
            if (v.kind === "api-request" && v.id && v.apiType) {
              window.dispatchEvent(new CustomEvent("daemon-api-request", {
                detail: {
                  requestId: v.id,
                  apiType: v.apiType,
                  payload: v.payload
                }
              }));
              continue;
            }
            if (v.kind === "lifecycle" && v.event) {
              if (i != null) {
                i(v.event, v.params || {});
              }
              continue;
            }
          } catch {}
          if (r != null) {
            r(m);
          }
        }
      }
    }
  }));
  if (r != null) {
    r(`Daemon started on port ${o}`);
  }
  return {
    process: S,
    port: o,
    path: f
  };
}
const TO = `
;(function() {
  const pendingRequests = new Map()
  let requestId = 0
  let _localeListeners = []
  let _themeListeners = []

  function sendRequest(msg) {
    return new Promise((resolve, reject) => {
      const id = ++requestId
      pendingRequests.set(id, { resolve, reject })
      window.parent.postMessage({ id, ...msg }, '*')
    })
  }

  window.JSOS = {
    // ==================== 通知 ====================
    /**
     * 发送浏览器通知
     * @param {Object} options
     * @param {string} options.title - 通知标题（必填）
     * @param {string} [options.body] - 通知内容
     * @param {string} [options.icon] - 图标 URL
     * @returns {Promise<boolean>} 成功返回 true，失败抛出错误
     */
    async notify({ title, body, icon } = {}) {
      if (!title) throw new Error('title is required')
      return sendRequest({ type: 'notify', payload: { title, body, icon } })
    },

    /**
     * 显示 Toast 消息
     * @param {Object} options
     * @param {string} options.title - Toast 标题（必填）
     * @param {string} [options.description] - Toast 详细描述
     * @param {'default'|'success'|'error'|'info'|'warning'} [options.type='default'] - Toast 类型
     * @param {number} [options.timeout=3000] - 自动关闭时间（毫秒），0 表示不自动关闭
     * @returns {Promise<boolean>} 成功返回 true
     */
    async toast({ title, description, type = 'default', timeout = 3000 } = {}) {
      if (!title) throw new Error('title is required')
      return sendRequest({ type: 'toast', payload: { title, description, type, timeout } })
    },

    // ==================== 应用管理 ====================
    /**
     * 获取已安装应用列表
     * @returns {Promise<Array<{id, name, icon, version, type, isSystem}>>}
     */
    async getApps() {
      return sendRequest({ type: 'getApps' })
    },

    /**
     * 获取应用详细信息
     * @param {string} appId - 应用 ID
     * @returns {Promise<{id, name, icon, version, type, isSystem, port, isRunning, serverUrl}>}
     */
    async getAppInfo(appId) {
      if (!appId) throw new Error('appId is required')
      return sendRequest({ type: 'getAppInfo', payload: { appId } })
    },

    /**
     * 打开应用
     * @param {string} appId - 应用 ID
     * @param {Object} [options] - 可选参数
     * @param {string} [options.route] - 路由路径，如 '/wallpaper'
     * @param {Object} [options.params] - 查询参数，如 { workspaceId: 'home' }
     * @returns {Promise<{success: boolean, windowId?: string, error?: string}>}
     */
    async openApp(appId, options = {}) {
      if (!appId) throw new Error('appId is required')
      return sendRequest({ type: 'openApp', payload: { appId, ...options } })
    },

    /**
     * 关闭应用（关闭该应用的所有窗口）
     * @param {string} appId - 应用 ID
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async closeApp(appId) {
      if (!appId) throw new Error('appId is required')
      return sendRequest({ type: 'closeApp', payload: { appId } })
    },

    /**
     * 关闭当前调用者的窗口（仅关闭发起调用的 iframe 所在窗口）
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async closeAppWindow() {
      return sendRequest({ type: 'closeAppWindow', payload: {} })
    },

    /**
     * 检查应用是否运行
     * @param {string} appId - 应用 ID
     * @returns {Promise<{running: boolean}>}
     */
    async isAppRunning(appId) {
      if (!appId) throw new Error('appId is required')
      return sendRequest({ type: 'isAppRunning', payload: { appId } })
    },

    /**
     * 打开应用并传递自定义启动参数（适用于 CLI 应用）
     * @param {string} appId - 应用 ID
     * @param {Object} [options] - 启动参数
     * @param {string} [options.startCommand] - 自定义启动命令，覆盖 manifest 中的 startCommand
     * @param {Object} [options.env] - 额外环境变量（不能覆盖 DATA_DIR/APP_DIR/PORT/LANG）
     * @returns {Promise<{success: boolean, windowId?: string, error?: string}>}
     */
    async openAppWithArgs(appId, options = {}) {
      if (!appId) throw new Error('appId is required')
      return sendRequest({ type: 'openAppWithArgs', payload: { appId, ...options } })
    },

    // ==================== 工作区设置 ====================
    /**
     * 获取工作区列表
     * @returns {Promise<Array<{id, name, type}>>}
     */
    async getWorkspaces() {
      return sendRequest({ type: 'getWorkspaces' })
    },

    /**
     * 获取当前工作区
     * @returns {Promise<{id, name, type}>}
     */
    async getCurrentWorkspace() {
      return sendRequest({ type: 'getCurrentWorkspace' })
    },

    /**
     * 切换工作区
     * @param {string} id - 工作区 ID
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async switchWorkspace(id) {
      if (!id) throw new Error('workspace id is required')
      return sendRequest({ type: 'switchWorkspace', payload: { id } })
    },

    /**
     * 创建工作区
     * @param {string} name - 工作区名称
     * @returns {Promise<{id: string, success: boolean, error?: string}>}
     */
    async createWorkspace(name) {
      if (!name) throw new Error('workspace name is required')
      return sendRequest({ type: 'createWorkspace', payload: { name } })
    },

    /**
     * 删除工作区
     * @param {string} id - 工作区 ID
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async deleteWorkspace(id) {
      if (!id) throw new Error('workspace id is required')
      return sendRequest({ type: 'deleteWorkspace', payload: { id } })
    },

    /**
     * 重命名工作区
     * @param {string} id - 工作区 ID
     * @param {string} name - 新名称
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async renameWorkspace(id, name) {
      if (!id) throw new Error('workspace id is required')
      if (!name) throw new Error('workspace name is required')
      return sendRequest({ type: 'renameWorkspace', payload: { id, name } })
    },

    // ==================== 壁纸设置 ====================
    /**
     * 获取壁纸配置
     * @param {string} [workspaceId] - 可选，指定工作区 ID，不传则返回当前工作区
     * @returns {Promise<{type, dataUrl, mimeType, overlay, overlayOpacity, blur}>}
     */
    async getWallpaper(workspaceId) {
      return sendRequest({ type: 'getWallpaper', payload: { workspaceId } })
    },

    /**
     * 设置壁纸
     * @param {Object} config
     * @param {'default'|'image'|'video'} config.type - 壁纸类型
     * @param {string} [config.data] - base64 编码的图片/视频数据（不含 data URL 前缀）
     * @param {string} [config.mimeType] - MIME 类型（如 'image/jpeg', 'video/mp4'）
     * @param {string} [config.overlay] - 遮罩颜色（如 'rgba(0,0,0,0.5)'）
     * @param {number} [config.overlayOpacity=0] - 遮罩透明度 0-100
     * @param {number} [config.blur=0] - 模糊效果 0-20 (px)
     * @param {string} [config.workspaceId] - 可选，指定工作区 ID，不传则操作当前工作区
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async setWallpaper(config = {}) {
      return sendRequest({ type: 'setWallpaper', payload: config })
    },

    /**
     * 重置壁纸为默认
     * @param {string} [workspaceId] - 可选，指定工作区 ID，不传则重置当前工作区
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async resetWallpaper(workspaceId) {
      return sendRequest({ type: 'resetWallpaper', payload: { workspaceId } })
    },

    // ==================== 语言设置 ====================
    /**
     * 获取当前系统语言
     * @returns {Promise<string>} 语言代码，如 'zh-CN' 或 'en'
     */
    async getLocale() {
      return sendRequest({ type: 'getLocale' })
    },

    /**
     * 设置系统语言
     * @param {string} lang - 语言代码，'zh-CN' 或 'en'
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async setLocale(lang) {
      if (!lang) throw new Error('lang is required')
      return sendRequest({ type: 'setLocale', payload: { lang } })
    },

    // ==================== Dock 设置 ====================
    /**
     * 获取 Dock 设置
     * @returns {Promise<{position: 'top'|'bottom'|'left'|'right'}>}
     */
    async getDockSettings() {
      return sendRequest({ type: 'getDockSettings' })
    },

    /**
     * 设置 Dock 位置
     * @param {Object} settings
     * @param {'top'|'bottom'|'left'|'right'} settings.position - Dock 位置
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async setDockSettings(settings) {
      if (!settings || !settings.position) throw new Error('position is required')
      return sendRequest({ type: 'setDockSettings', payload: settings })
    },

    // ==================== 终端背景设置 ====================
    /**
     * 获取终端背景设置
     * @returns {Promise<{opacity: number, blur: number}>} opacity: 0-100, blur: 0-30
     */
    async getTerminalBgSettings() {
      return sendRequest({ type: 'getTerminalBgSettings' })
    },

    /**
     * 设置终端背景效果
     * @param {Object} settings
     * @param {number} [settings.opacity] - 背景不透明度 0-100（百分比）
     * @param {number} [settings.blur] - 模糊效果 0-30（像素）
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async setTerminalBgSettings(settings) {
      if (!settings) throw new Error('settings is required')
      return sendRequest({ type: 'setTerminalBgSettings', payload: settings })
    },

    // ==================== 应用安装 ====================
    /**
     * 解析 ZIP 应用包（不安装，仅预览）
     * @param {File} file - ZIP 文件对象
     * @returns {Promise<Object>} { valid, manifest, fileSize, fileCount, installAction, existingVersion, error? }
     */
    async parseZip(file) {
      if (!file) throw new Error('file is required')
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64 = reader.result
          sendRequest({ type: 'parseZip', payload: { base64, fileName: file.name } }).then(resolve, reject)
        }
        reader.onerror = () => reject(new Error('Failed to read file'))
        reader.readAsDataURL(file)
      })
    },

    /**
     * 安装应用（解析 ZIP + 存入系统）
     * @param {File} file - ZIP 文件对象
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async installApp(file) {
      if (!file) throw new Error('file is required')
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64 = reader.result
          sendRequest({ type: 'installApp', payload: { base64, fileName: file.name } }).then(resolve, reject)
        }
        reader.onerror = () => reject(new Error('Failed to read file'))
        reader.readAsDataURL(file)
      })
    },

    /**
     * 卸载应用
     * @param {string} appId - 应用 ID
     * @param {boolean} [deleteData=false] - 是否同时删除应用数据
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async uninstallApp(appId, deleteData = false) {
      if (!appId) throw new Error('appId is required')
      return sendRequest({ type: 'uninstallApp', payload: { appId, deleteData } })
    },

    // ==================== 小组件 ====================
    /**
     * 添加小组件到桌面
     * @param {string} appId - 应用 ID
     * @param {string} widgetId - 小组件 ID
     * @param {Object} [options] - 可选参数
     * @param {number} [options.x] - 桌面 X 坐标（客户端像素）
     * @param {number} [options.y] - 桌面 Y 坐标（客户端像素）
     * @returns {Promise<{success: boolean, instanceId?: string, error?: string}>}
     */
    async getTheme() {
      return sendRequest({ type: 'getTheme' })
    },

    async getThemeMode() {
      return sendRequest({ type: 'getThemeMode' })
    },

    async setTheme(mode) {
      if (!mode) throw new Error('mode is required')
      return sendRequest({ type: 'setTheme', payload: { mode } })
    },

    async addWidget(appId, widgetId, options = {}) {
      if (!appId) throw new Error('appId is required')
      if (!widgetId) throw new Error('widgetId is required')
      return sendRequest({ type: 'addWidget', payload: { appId, widgetId, ...options } })
    },

    // ==================== 代理设置 ====================
    /**
     * 获取代理配置
     * @returns {Promise<{url: string, key: string} | null>}
     */
    async getProxyConfig() {
      return sendRequest({ type: 'getProxyConfig' })
    },

    /**
     * 设置代理配置
     * @param {Object} config
     * @param {string} config.url - 代理服务地址
     * @param {string} [config.key] - 认证密钥（可选）
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async setProxyConfig(config) {
      if (!config || !config.url) throw new Error('url is required')
      return sendRequest({ type: 'setProxyConfig', payload: config })
    },

    /**
     * 删除代理配置
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async deleteProxyConfig() {
      return sendRequest({ type: 'deleteProxyConfig' })
    },

    /**
     * 通过代理发起请求
     * @param {string} url - 目标 URL（不含代理前缀）
     * @param {Object} [options] - fetch 选项（method, headers, body 等）
     * @returns {Promise<{ok: boolean, status: number, statusText: string, headers: Object, data: string}>}
     */
    async proxyFetch(url, options = {}) {
      if (!url) throw new Error('url is required')
      return sendRequest({ type: 'proxyFetch', payload: { url, options } })
    },

    // ==================== 数据备份/还原 ====================
    /**
     * 导出系统所有 IndexedDB 数据
     * @returns {Promise<Object>} 序列化后的数据库数据
     */
    async exportAllData() {
      return sendRequest({ type: 'exportAllData' })
    },

    /**
     * 导入数据（会清空所有现有数据）
     * @param {Object} data - 从 exportAllData 返回的数据对象
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    async importAllData(data) {
      if (!data) throw new Error('data is required')
      return sendRequest({ type: 'importAllData', payload: { data } })
    },

    // ==================== 系统控制 ====================
    /**
     * 重启 JSOS 系统（刷新父窗口页面）
     * @returns {Promise<{success: boolean}>}
     */
    restart() {
      return sendRequest({ type: 'restart' })
    },

    /**
     * 清空所有 IndexedDB 数据库，还原系统到初始状态
     * @returns {Promise<{success: boolean, error?: string}>}
     */
    clearAllData() {
      return sendRequest({ type: 'clearAllData' })
    },

    // ==================== 系统信息 ====================
    /**
     * 获取系统信息（版本等）
     * @returns {Promise<{version: string}>}
     */
    getSystemInfo() {
      return sendRequest({ type: 'getSystemInfo' })
    },

    /**
     * 获取存储信息
     * @returns {Promise<{quota: number, usage: number, usageDetails: Object, persistent: boolean}>}
     */
    async getStorageInfo() {
      return sendRequest({ type: 'getStorageInfo' })
    },

    // ==================== 系统事件监听 ====================
    /**
     * 监听系统语言变化
     * @param {function} callback - 接收语言代码（如 'zh-CN'）
     * @returns {function} 取消监听的函数
     */
    onLocaleChange(callback) {
      _localeListeners.push(callback)
      return () => {
        _localeListeners = _localeListeners.filter(cb => cb !== callback)
      }
    },

    /**
     * 监听系统主题变化
     * @param {function} callback - 接收主题值（'light' | 'dark'）
     * @returns {function} 取消监听的函数
     */
    onThemeChange(callback) {
      _themeListeners.push(callback)
      return () => {
        _themeListeners = _themeListeners.filter(cb => cb !== callback)
      }
    },
  }

  window.addEventListener('message', (e) => {
    if (e.source !== window.parent) return

    const { id, type, result, error } = e.data || {}

    if (id == null) {
      if (type === 'locale-changed') {
        _localeListeners.forEach(cb => cb(e.data.locale))
      }
      if (type === 'theme-changed') {
        _themeListeners.forEach(cb => cb(e.data.theme, e.data.mode))
      }
      return
    }

    const pending = pendingRequests.get(id)
    if (pending) {
      pendingRequests.delete(id)
      if (error) pending.reject(new Error(error))
      else pending.resolve(result)
    }
  })

  // 同步 URL（含 hash）到父窗口：定时轮询 + 初始发送
  let _lastHref = location.href
  setInterval(() => {
    if (location.href !== _lastHref) {
      _lastHref = location.href
      window.parent.postMessage({ type: 'url-update', href: location.href }, '*')
    }
  }, 1000)
  window.parent.postMessage({ type: 'url-update', href: location.href }, '*')
})()
`;
let pg = null;
let Zd = null;
function kO() {
  const e = E.useRef(null);
  const [n, r] = E.useState(false);
  const [i, o] = E.useState("idle");
  const [u, h] = E.useState(null);
  const [a, c] = E.useState("");
  const [d, p] = E.useState(null);
  const [f, S] = E.useState(false);
  const _ = E.useRef(new Map());
  E.useEffect(() => {
    let m = true;
    async function v() {
      try {
        o("booting");
        Zd ||= zf.boot({
          forwardPreviewErrors: true
        });
        const C = await Zd;
        if (!m) {
          return;
        }
        pg = C;
        e.current = C;
        C.setPreviewScript(TO);
        if (!C._jsosListenerAdded) {
          C.on("server-ready", (T, A) => {
            const M = _.current.get(T);
            const R = new CustomEvent(M ? "server-ready" : "server-ready-unregistered", {
              detail: {
                port: T,
                url: A,
                ...(M ? {
                  appId: M
                } : {})
              }
            });
            window.dispatchEvent(R);
          });
          C._jsosListenerAdded = true;
        }
        if (!C._jsosWorkspaceReady) {
          await C.fs.mkdir("workspace/apps", {
            recursive: true
          });
          await nO(C);
          try {
            c("");
            const T = await EO(C, M => {
              c(M);
            });
            C._daemonPath = T;
            const A = await RO(C, T, M => {
              c(M);
            }, (M, R) => {
              window.dispatchEvent(new CustomEvent("daemon-toast", {
                detail: R
              }));
            });
            C._daemonInfo = A;
            S(true);
            c("");
          } catch (T) {
            console.error("[JSOS] Failed to load daemon:", T);
            window.dispatchEvent(new CustomEvent("daemon-toast", {
              detail: {
                title: "Daemon Error",
                description: (T == null ? undefined : T.message) || "Failed to start daemon",
                type: "error",
                duration: 5000
              }
            }));
            c("");
          }
          C._jsosWorkspaceReady = true;
        }
        r(true);
        o("ready");
      } catch (C) {
        Zd = null;
        o("error");
        h(C);
        p(oO());
        console.error("Failed to boot OS:", C);
      }
    }
    if (pg) {
      e.current = pg;
      r(true);
      o("ready");
    } else {
      v();
    }
    return () => {
      m = false;
    };
  }, []);
  const x = E.useCallback((m, v) => {
    _.current.set(m, v);
  }, []);
  const w = E.useCallback(m => {
    _.current.delete(m);
  }, []);
  const g = E.useCallback(m => {
    for (const [v, C] of _.current) {
      if (C === m) {
        _.current.delete(v);
      }
    }
  }, []);
  const b = E.useCallback(() => {
    if (e.current) {
      return rO(e.current);
    }
  }, []);
  return {
    wc: e.current,
    isReady: n,
    registerPort: x,
    unregisterPort: w,
    unregisterAppPorts: g,
    syncSharedData: b,
    bootState: i,
    bootError: u,
    bootDescription: a,
    daemonReady: f,
    compatibilityResult: d
  };
}
function AO() {
  const [e, n] = E.useState(new Map());
  const [r, i] = E.useState(null);
  const o = E.useRef(0);
  const u = E.useCallback((_, x) => {
    const w = `win-${++o.current}`;
    const g = 50 + o.current % 8 * 30;
    const b = 30 + o.current % 8 * 30;
    const m = window.innerWidth < 800;
    const v = m ? window.innerWidth : Math.min(_.defaultWidth || 900, window.innerWidth - 100);
    const C = m ? window.innerHeight : Math.min(_.defaultHeight || 600, window.innerHeight - 150);
    const T = {
      id: w,
      appId: _.id,
      app: _,
      workspaceId: x || "home",
      x: m ? 0 : g,
      y: m ? 0 : b,
      width: v,
      height: C,
      minWidth: _.minWidth || 400,
      minHeight: _.minHeight || 300,
      allowMaximize: _.allowMaximize !== false,
      zIndex: 100 + o.current,
      maximized: m,
      minimized: false,
      process: null,
      terminal: null,
      status: "initializing",
      statusText: "Initializing...",
      serverUrl: null
    };
    n(A => {
      const M = new Map(A);
      M.set(w, T);
      return M;
    });
    return w;
  }, []);
  const h = E.useCallback((_, x) => {
    n(w => {
      const g = new Map(w);
      const b = g.get(_);
      if (b) {
        g.set(_, {
          ...b,
          ...x
        });
      }
      return g;
    });
  }, []);
  const a = E.useCallback(_ => {
    i(x => x === _ ? null : x);
    n(x => {
      const w = new Map(x);
      w.delete(_);
      return w;
    });
  }, []);
  const c = E.useCallback(_ => {
    i(_);
    n(x => {
      const w = new Map(x);
      const g = Math.max(100, ...[...w.values()].map(m => m.zIndex));
      const b = w.get(_);
      if (b) {
        w.set(_, {
          ...b,
          zIndex: g + 1,
          minimized: false
        });
      }
      return w;
    });
  }, []);
  const d = E.useCallback(_ => {
    n(x => {
      const w = new Map(x);
      const g = w.get(_);
      if (g) {
        w.set(_, {
          ...g,
          minimized: true
        });
      }
      return w;
    });
  }, []);
  const p = E.useCallback(_ => {
    n(x => {
      const w = new Map(x);
      const g = w.get(_);
      if (g) {
        w.set(_, {
          ...g,
          maximized: !g.maximized
        });
      }
      return w;
    });
  }, []);
  const f = E.useCallback((_, x, w) => {
    n(g => {
      const b = new Map(g);
      const m = b.get(_);
      if (m) {
        b.set(_, {
          ...m,
          x,
          y: w
        });
      }
      return b;
    });
  }, []);
  const S = E.useCallback((_, x, w) => {
    n(g => {
      const b = new Map(g);
      const m = b.get(_);
      if (m) {
        b.set(_, {
          ...m,
          width: Math.max(m.minWidth || 400, x),
          height: Math.max(m.minHeight || 300, w)
        });
      }
      return b;
    });
  }, []);
  return {
    windows: e,
    focusedWindowId: r,
    createWindow: u,
    updateWindow: h,
    closeWindow: a,
    focusWindow: c,
    minimizeWindow: d,
    toggleMaximize: p,
    moveWindow: f,
    resizeWindow: S
  };
}
const MO = 4000;
const jf = new Set();
const Hf = new Map();
function OO(e, n) {
  for (const [r, i] of Object.entries(e)) {
    jf.add(i);
    Hf.set(r, i);
  }
  for (const [r, i] of Object.entries(n)) {
    jf.add(i);
    Hf.set(r, i);
  }
}
function DO(e) {
  let n = MO;
  while (jf.has(n)) {
    n++;
  }
  jf.add(n);
  Hf.set(e, n);
  return n;
}
function IO(e) {
  return Hf.get(e);
}
const LO = {
  url: "https://cors-proxy.jsos.dev",
  key: "hello-world"
};
const PO = "jsos-workspaces";
const BO = 4;
async function Rr() {
  return ah(PO, BO, {
    upgrade(e, n) {
      if (n < 1) {
        if (!e.objectStoreNames.contains("workspaces")) {
          e.createObjectStore("workspaces", {
            keyPath: "id"
          });
        }
        if (!e.objectStoreNames.contains("icon-positions")) {
          e.createObjectStore("icon-positions", {
            keyPath: ["appId", "workspaceId"]
          }).createIndex("workspaceId", "workspaceId");
        }
      }
      if (n < 2) {
        if (!e.objectStoreNames.contains("wallpapers")) {
          e.createObjectStore("wallpapers", {
            keyPath: "workspaceId"
          });
        }
      }
      if (n < 3) {
        if (!e.objectStoreNames.contains("app-state")) {
          e.createObjectStore("app-state", {
            keyPath: "id"
          });
        }
      }
      if (n < 4) {
        if (!e.objectStoreNames.contains("settings")) {
          e.createObjectStore("settings", {
            keyPath: "id"
          });
        }
      }
    }
  });
}
async function zO() {
  const n = await (await Rr()).getAll("workspaces");
  const r = new Map();
  for (const i of n) {
    r.set(i.id, i);
  }
  return r;
}
async function mg(e) {
  await (await Rr()).put("workspaces", e);
}
async function NO(e) {
  await (await Rr()).delete("workspaces", e);
}
async function Qd(e, n, r, i) {
  await (await Rr()).put("icon-positions", {
    appId: e,
    workspaceId: n,
    x: r,
    y: i
  });
}
async function $w(e, n) {
  await (await Rr()).delete("icon-positions", [e, n]);
}
async function jO() {
  const n = await (await Rr()).getAll("icon-positions");
  const r = new Map();
  for (const i of n) {
    r.set(i.appId, {
      workspaceId: i.workspaceId,
      x: i.x,
      y: i.y
    });
  }
  return r;
}
async function qw(e, n, r, i, o) {
  const h = (await Rr()).transaction("icon-positions", "readwrite");
  await h.store.delete([e, n]);
  await h.store.put({
    appId: e,
    workspaceId: r,
    x: i,
    y: o
  });
  await h.done;
}
async function HO(e) {
  const r = (await Rr()).transaction("icon-positions", "readwrite");
  for (const [i, o] of Object.entries(e)) {
    await r.store.put({
      appId: i,
      workspaceId: "home",
      x: o.x,
      y: o.y
    });
  }
  await r.done;
}
async function rv(e) {
  return (await Rr()).get("wallpapers", e) || null;
}
async function S1(e) {
  await (await Rr()).put("wallpapers", e);
}
async function sv(e) {
  await (await Rr()).delete("wallpapers", e);
}
async function yu(e, n) {
  await (await Rr()).put("settings", {
    id: e,
    value: n
  });
}
async function _u(e) {
  const r = await (await Rr()).get("settings", e);
  return (r == null ? undefined : r.value) ?? null;
}
async function FO(e) {
  await (await Rr()).put("app-state", {
    id: "active-workspace",
    value: e
  });
}
async function UO() {
  const n = await (await Rr()).get("app-state", "active-workspace");
  return (n == null ? undefined : n.value) || null;
}
async function Lv() {
  const e = await _u("proxy-config");
  if (e) {
    return {
      ...e,
      isDefault: false
    };
  } else {
    return {
      ...LO,
      isDefault: true
    };
  }
}
async function VO(e) {
  await yu("proxy-config", e);
}
async function WO() {
  await (await Rr()).delete("settings", "proxy-config");
}
const x1 = "locale";
let Ea = null;
function C1() {
  if (typeof window === "undefined" || navigator.language.startsWith("zh")) {
    return "zh-CN";
  } else {
    return "en";
  }
}
async function $O() {
  Ea = (await _u(x1)) || C1();
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("locale-changed", {
      detail: Ea
    }));
  }
  return Ea;
}
function xr() {
  Ea ||= C1();
  return Ea;
}
async function Gw(e) {
  Ea = e;
  await yu(x1, e);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("locale-changed", {
      detail: e
    }));
  }
}
function rn(e, n) {
  if (e) {
    if (typeof e == "string") {
      return e;
    } else if (typeof e == "object" && e !== null) {
      return e[n] || e.en || Object.values(e)[0] || "";
    } else {
      return String(e);
    }
  } else {
    return "";
  }
}
const Jd = "workspace/apps";
const qO = "workspace/data";
const GO = "/builtin-apps.json";
const YO = /\x1b\[[\d?;]*[a-zA-Z]/g;
function Yw(e) {
  const r = e.replace(YO, "").split(`
`).filter(Boolean);
  if (r.length === 0) {
    return null;
  } else {
    return r[r.length - 1].trimEnd();
  }
}
function gg(e) {
  const n = {};
  for (const [r, i] of Object.entries(e)) {
    const o = r.split("/");
    let u = n;
    for (let a = 0; a < o.length - 1; a++) {
      const c = o[a];
      u[c] ||= {
        directory: {}
      };
      u = u[c].directory;
    }
    const h = o[o.length - 1];
    u[h] = {
      file: {
        contents: i
      }
    };
  }
  return n;
}
function E1(e) {
  const n = Math.min(e.length, 8192);
  for (let r = 0; r < n; r++) {
    if (e[r] === 0) {
      return true;
    }
  }
  return false;
}
function XO(e) {
  const n = e.split(".").pop().toLowerCase();
  return {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    webp: "image/webp",
    ico: "image/x-icon",
    bmp: "image/bmp"
  }[n] || "application/octet-stream";
}
async function KO(e, n) {
  const r = e.file(n);
  if (!r) {
    return null;
  }
  const i = await r.async("uint8array");
  const o = XO(n);
  const u = new Blob([i], {
    type: o
  });
  return new Promise(h => {
    const a = new FileReader();
    a.onloadend = () => h(a.result);
    a.onerror = () => h(null);
    a.readAsDataURL(u);
  });
}
async function Xw(e) {
  const n = e.file("package.json");
  if (!n) {
    return null;
  }
  let r;
  try {
    r = JSON.parse(await n.async("text"));
  } catch {
    return null;
  }
  if (!r.jsos) {
    return null;
  }
  const i = {
    ...r,
    ...r.jsos,
    name: r.jsos.name || r.name,
    version: r.jsos.version || r.version
  };
  const o = typeof i.name == "string" ? !!i.name : typeof i.name == "object" && i.name !== null && Object.keys(i.name).length > 0;
  if (!i.id || !o || !i.startCommand) {
    return null;
  }
  if (i.icon && !i.icon.startsWith("data:") && e.file(i.icon)) {
    i.icon = await KO(e, i.icon);
  }
  const u = {};
  for (const [h, a] of Object.entries(e.files)) {
    if (!a.dir) {
      const c = await a.async("uint8array");
      u[h] = E1(c) ? c : new TextDecoder().decode(c);
    }
  }
  return {
    manifest: i,
    files: u
  };
}
function ZO(e, n = {}) {
  const [r, i] = E.useState(new Map());
  const [o, u] = E.useState(new Map());
  const [h, a] = E.useState([]);
  const [c, d] = E.useState(false);
  const p = E.useRef(o);
  p.current = o;
  const f = E.useRef(n.onBuiltinProgress);
  f.current = n.onBuiltinProgress;
  const S = E.useRef(false);
  E.useEffect(() => {
    async function I() {
      if (S.current) {
        return;
      }
      S.current = true;
      await BM();
      const j = await NM();
      OO({}, j);
      await _();
      await x();
      d(true);
    }
    I();
  }, []);
  const _ = async () => {
    const I = new Map();
    const j = await IM();
    for (const W of j) {
      I.set(W.id, W);
    }
    i(I);
  };
  const x = async () => {
    var W;
    var z;
    var N;
    var D;
    var $;
    var G;
    var q;
    let I = [];
    try {
      const U = await fetch(GO);
      if (U.ok) {
        I = await U.json();
      }
    } catch (U) {
      console.warn("Failed to load builtin registry:", U);
      return;
    }
    // 优化：并行预取需要安装/更新的内置应用 zip（下方安装流程仍保持串行，跳过已安装逻辑不变）
    const __jsosZipCache = {};
    await Promise.all(I.map(async (U2) => {
      try {
        const installed = await qM(U2.id);
        if (installed !== U2.version) {
          const resp = await fetch(U2.zipUrl);
          __jsosZipCache[U2.zipUrl] = resp.ok ? await resp.arrayBuffer() : null;
        }
      } catch (e2) {
        __jsosZipCache[U2.zipUrl] = null;
      }
    }));
    const j = [];
    for (const U of I) {
      try {
        const L = await qM(U.id);
        if (L) {
          if (L !== U.version) {
            const F = rn(U.name, xr()) || U.id;
            const P = rn(U.description, xr()) || "";
            if ((D = f.current) != null) {
              D.call(f, {
                type: "update-start",
                appId: U.id,
                appName: F,
                oldVersion: L,
                newVersion: U.version,
                description: P
              });
            }
            const Z = __jsosZipCache[U.zipUrl];
            if (!Z) {
              if (($ = f.current) != null) {
                $.call(f, {
                  type: "update-error",
                  appId: U.id,
                  appName: F,
                  oldVersion: L,
                  newVersion: U.version
                });
              }
              continue;
            }
            const J = await nu.loadAsync(Z);
            const ne = await Xw(J);
            if (ne) {
              m(ne.manifest.id);
              try {
                await (e == null ? undefined : e.fs.rm(`${Jd}/${ne.manifest.id}`, {
                  recursive: true,
                  force: true
                }));
              } catch {}
              await jw(ne.manifest.id, ne.manifest, U.version);
              await Nf(ne.manifest, new Uint8Array(Z));
              const ue = rn(ne.manifest.name, xr());
              j.push({
                type: "update",
                appId: ne.manifest.id,
                appName: ue,
                oldVersion: L,
                newVersion: U.version
              });
              if ((G = f.current) != null) {
                G.call(f, {
                  type: "update-end",
                  appId: ne.manifest.id,
                  appName: ue,
                  oldVersion: L,
                  newVersion: U.version
                });
              }
              await _();
            }
          }
        } else {
          const F = rn(U.name, xr()) || U.id;
          const P = rn(U.description, xr()) || "";
          if ((W = f.current) != null) {
            W.call(f, {
              type: "install-start",
              appId: U.id,
              appName: F,
              version: U.version,
              description: P
            });
          }
          const Z = __jsosZipCache[U.zipUrl];
          if (!Z) {
            if ((z = f.current) != null) {
              z.call(f, {
                type: "install-error",
                appId: U.id,
                appName: F,
                version: U.version
              });
            }
            continue;
          }
          const J = await nu.loadAsync(Z);
          const ne = await Xw(J);
          if (ne) {
            m(ne.manifest.id);
            try {
              await (e == null ? undefined : e.fs.rm(`${Jd}/${ne.manifest.id}`, {
                recursive: true,
                force: true
              }));
            } catch {}
            await jw(ne.manifest.id, ne.manifest, U.version);
            await Nf(ne.manifest, new Uint8Array(Z));
            const ue = rn(ne.manifest.name, xr());
            j.push({
              type: "install",
              appId: ne.manifest.id,
              appName: ue,
              version: U.version
            });
            if ((N = f.current) != null) {
              N.call(f, {
                type: "install-end",
                appId: ne.manifest.id,
                appName: ue,
                version: U.version
              });
            }
            await _();
          }
        }
      } catch (L) {
        console.warn(`Failed to process builtin app ${U.id}:`, L);
        if ((q = f.current) != null) {
          q.call(f, {
            type: "install-error",
            appId: U.id,
            appName: rn(U.name, xr()) || U.id,
            error: L.message
          });
        }
      }
    }
    if (j.length > 0) {
      a(j);
    }
  };
  const w = E.useCallback(async (I, j, W, z = "gui", N = {}) => {
    var J;
    const {
      onStatusChange: D,
      onTerminalOutput: $,
      onStatusLine: G
    } = W;
    const q = z === "cli";
    const U = I.id;
    const L = q ? j : U;
    const F = `${Jd}/${U}`;
    const P = p.current.get(L);
    if (!q && P && (P.state === "running" || P.state === "starting")) {
      P.windows.add(j);
      if ($) {
        P.terminalCallbacks.set(j, $);
      }
      if (G) {
        P.statusLineCallbacks.set(j, G);
      }
      if (P.state === "running" && P.serverUrl) {
        if (D != null) {
          D("ready");
        }
        if (G != null) {
          G("Ready");
        }
      }
      return P.process;
    }
    let V = null;
    if (!q) {
      V = I.port ?? IO(U);
      if (V === undefined) {
        V = DO(U);
        await zM(U, V);
      }
    }
    const Z = {
      appId: U,
      state: "starting",
      process: null,
      port: V,
      serverUrl: null,
      windows: new Set([j]),
      terminalCallbacks: new Map($ ? [[j, $]] : []),
      statusLineCallbacks: new Map(G ? [[j, G]] : [])
    };
    p.current.set(L, Z);
    u(ne => {
      const ue = new Map(ne);
      ue.set(L, Z);
      return ue;
    });
    try {
      if (D != null) {
        D("installing", "Installing dependencies...");
      }
      if ($ != null) {
        $(`\x1B[1;36m[JSOS] Installing ${rn(I.name, xr())}...\x1B[0m
`);
      }
      let ne = false;
      try {
        await e.fs.rm(F, {
          recursive: true,
          force: true
        });
      } catch {}
      await e.fs.mkdir(F, {
        recursive: true
      });
      const ue = await e.fs.readdir(F);
      if ($ != null) {
        $(`\x1B[2m[JSOS] App dir: ${F} (${ue.length} entries)\x1B[0m
`);
      }
      const ee = await GM(U);
      if (ee) {
        if ($ != null) {
          $(`\x1B[2m[JSOS] Loading from ZIP data (${ee.byteLength} bytes)\x1B[0m
`);
        }
        const H = await nu.loadAsync(ee);
        const ae = {};
        for (const [oe, X] of Object.entries(H.files)) {
          if (!X.dir) {
            const Q = await X.async("uint8array");
            ae[oe] = E1(Q) ? Q : new TextDecoder().decode(Q);
          }
        }
        await e.mount(gg(ae), {
          mountPoint: F
        });
        ne = true;
      } else {
        const H = await WM(U);
        if (H && (H instanceof Uint8Array || typeof H == "object" && Object.keys(H).length > 0)) {
          try {
            await e.mount(H, {
              mountPoint: F
            });
            const ae = await e.fs.readdir(F);
            if ($ != null) {
              $(`\x1B[1;36m[JSOS] Restored from snapshot (${ae.length} entries)\x1B[0m
`);
            }
          } catch (ae) {
            if ($ != null) {
              $(`\x1B[1;33m[JSOS] Snapshot mount failed, falling back to files: ${ae.message}\x1B[0m
`);
            }
            const oe = await Nw(U);
            if (!oe || Object.keys(oe).length === 0) {
              throw new Error("No app files found");
            }
            await e.mount(gg(oe), {
              mountPoint: F
            });
            ne = true;
          }
        } else {
          const ae = await Nw(U);
          if (!ae || Object.keys(ae).length === 0) {
            throw new Error("No app files found");
          }
          await e.mount(gg(ae), {
            mountPoint: F
          });
          ne = true;
        }
      }
      const Y = await e.fs.readdir(F);
      if ($ != null) {
        $(`\x1B[2m[JSOS] After mount: ${F} (${Y.length} entries)\x1B[0m
`);
      }
      const re = `${qO}/${U}`;
      const ce = `${Jd}/${U}`;
      await e.fs.mkdir(re, {
        recursive: true
      });
      const ge = await Lv();
      const de = {
        DATA_DIR: `${e.workdir}/${re}`,
        APP_DIR: `${e.workdir}/${ce}`,
        LANG: xr(),
        PROXY_URL: ge.url || "",
        PROXY_KEY: ge.key || ""
      };
      if ((J = e._daemonInfo) != null && J.path) {
        const H = "/usr/local/bin:/usr/bin:/bin";
        de.PATH = `${e._daemonInfo.path}:${H}`;
      }
      if (!q) {
        de.PORT = V.toString();
      }
      if (N.env && typeof N.env == "object") {
        const H = new Set(["DATA_DIR", "APP_DIR", "PORT", "LANG", "PROXY_URL", "PROXY_KEY"]);
        for (const [ae, oe] of Object.entries(N.env)) {
          if (!H.has(ae)) {
            de[ae] = oe;
          }
        }
      }
      if (ne && I.installCommand) {
        const H = await e.spawn("sh", ["-c", `cd ${F} && ${I.installCommand}`], {
          env: de
        });
        H.output.pipeTo(new WritableStream({
          write: ae => {
            if ($ != null) {
              $(ae);
            }
            const oe = Yw(ae);
            if (oe) {
              if (G != null) {
                G(oe);
              }
            }
          }
        }));
        await H.exit;
      }
      if (ne) {
        try {
          const H = await e.export(F, {
            format: "binary"
          });
          await VM(U, H);
          await YM(U);
          await PM(U);
          if ($ != null) {
            $("[1;36m[WebOS] Snapshot saved (binary)[0m");
          }
        } catch (H) {
          console.warn("Failed to save app snapshot:", H);
        }
      }
      if ($ != null) {
        $(`
\x1B[1;32mDependencies installed!\x1B[0m
`);
      }
      if (q) {
        if ($ != null) {
          $("[2J[H");
        }
      }
      if (D != null) {
        D(q ? "running" : "starting");
      }
      const me = await e.spawn("sh", ["-c", `cd ${F} && ${N.startCommand || I.startCommand || "node server.js"}`], {
        env: de
      });
      me.output.pipeTo(new WritableStream({
        write: H => {
          for (const oe of Z.terminalCallbacks.values()) {
            oe(H);
          }
          const ae = Yw(H);
          if (ae) {
            for (const oe of Z.statusLineCallbacks.values()) {
              oe(ae);
            }
          }
        }
      }));
      Z.process = me;
      Z.state = "running";
      if (q) {
        me.exit.then(H => {
          if (H !== 0) {
            if ($ != null) {
              $(`\r
\x1B[1;31m⚠ 进程异常退出 (code: ${H})\x1B[0m\r
`);
            }
          }
          if (D != null) {
            D("exited");
          }
          if (G != null) {
            G(H === 0 ? "Exited" : `Exited (${H})`);
          }
          u(ae => {
            const oe = new Map(ae);
            oe.delete(j);
            return oe;
          });
        });
      } else {
        me.exit.then(H => {
          u(ae => {
            const oe = new Map(ae);
            oe.delete(U);
            return oe;
          });
        });
      }
      return me;
    } catch (ne) {
      if ($ != null) {
        $(`\x1B[1;31mError: ${ne.message}\x1B[0m`);
      }
      if (D != null) {
        D("error");
      }
      if (G != null) {
        G(`Error: ${ne.message}`);
      }
      if (!q) {
        u(ue => {
          const ee = new Map(ue);
          ee.delete(U);
          return ee;
        });
      }
      return null;
    }
  }, [e]);
  const g = E.useCallback((I, j) => {
    u(W => {
      const z = new Map(W);
      const N = z.get(I);
      if (N) {
        N.serverUrl = j;
        N.state = "running";
      }
      return z;
    });
  }, []);
  const b = E.useCallback((I, j, W = false) => {
    var D;
    var $;
    const z = W ? j : I;
    const N = p.current.get(z);
    if (N && (N.windows.delete(j), (D = N.terminalCallbacks) == null || D.delete(j), ($ = N.statusLineCallbacks) == null || $.delete(j), N.windows.size === 0)) {
      if (N.process) {
        try {
          N.process.kill();
        } catch {}
      }
      u(G => {
        const q = new Map(G);
        q.delete(z);
        return q;
      });
    }
  }, []);
  const m = E.useCallback(I => {
    const j = [];
    for (const [W, z] of p.current) {
      if (z.appId === I) {
        if (z.process) {
          try {
            z.process.kill();
          } catch {}
        }
        j.push(W);
      }
    }
    for (const W of j) {
      p.current.delete(W);
    }
    if (j.length > 0) {
      u(W => {
        const z = new Map(W);
        for (const N of j) {
          z.delete(N);
        }
        return z;
      });
    }
  }, []);
  const v = E.useCallback(I => {
    for (const [, j] of p.current) {
      if (j.appId === I && (j.state === "running" || j.state === "starting")) {
        return true;
      }
    }
    return false;
  }, []);
  const C = E.useCallback(I => p.current.get(I), []);
  const T = E.useCallback(() => _(), []);
  const A = E.useCallback(I => {
    const j = ["#89b4fa", "#a6e3a1", "#f38ba8", "#f9e2af", "#cba6f7", "#94e2d5"];
    let W = 0;
    for (let z = 0; z < I.length; z++) {
      W = I.charCodeAt(z) + ((W << 5) - W);
    }
    return j[Math.abs(W) % j.length];
  }, []);
  const M = E.useCallback(() => {
    a([]);
  }, []);
  const R = new Map();
  for (const [, I] of o) {
    for (const j of I.windows) {
      R.set(j, {
        appId: I.appId,
        process: I.process,
        port: I.port
      });
    }
  }
  return {
    installedApps: r,
    appServers: o,
    runningApps: R,
    builtinNotifications: h,
    clearBuiltinNotifications: M,
    initialized: c,
    installAndRunApp: w,
    closeApp: b,
    forceCleanupAppServer: m,
    updateServerUrl: g,
    isAppRunning: v,
    getServerInfo: C,
    reloadInstalledApps: T,
    getColorForApp: A
  };
}
const ef = 104;
const Li = 8;
function Ls(e) {
  let n;
  let r;
  if (e.cols != null && e.rows != null) {
    n = e.cols;
    r = e.rows;
  } else if (e.size) {
    const i = e.size.match(/^(\d+)\s*[x×]\s*(\d+)$/);
    if (i) {
      n = parseInt(i[1]);
      r = parseInt(i[2]);
    }
  }
  if (!n || !r) {
    n = Math.round((e.width || 320) / ef);
    r = Math.round((e.height || 208) / ef);
  }
  n = Math.max(1, Math.round(n));
  r = Math.max(1, Math.round(r));
  return {
    cols: n,
    rows: r,
    width: n * ef,
    height: r * ef
  };
}
const QO = 96;
const JO = 8;
const Ur = QO + JO;
const R1 = 20;
function T1(e, n, r, i, o, u) {
  const h = new Set();
  for (const [a, c] of Object.entries(e)) {
    if (c.workspaceId === i) {
      if (u !== "icon" || a !== o) {
        h.add(`${c.x},${c.y}`);
      }
    }
  }
  for (const [a, c] of Object.entries(n)) {
    const d = r.get(a);
    if (!d || d.workspaceId !== i || u === "widget" && a === o) {
      continue;
    }
    const {
      cols: p,
      rows: f
    } = Ls(d.widget || {});
    for (let S = 0; S < f; S++) {
      for (let _ = 0; _ < p; _++) {
        h.add(`${c.x + _ * Ur},${c.y + S * Ur}`);
      }
    }
  }
  return h;
}
function Ni(e, n, r, i, o) {
  for (let h = 0; h < i; h++) {
    for (let a = 0; a < r; a++) {
      if (o.has(`${e + a * Ur},${n + h * Ur}`)) {
        return false;
      }
    }
  }
  const u = Math.floor((window.innerWidth - R1 * 2) / Ur);
  return !(e + (r - 1) * Ur > (u - 1) * Ur);
}
function k1(e, n, r, i, o) {
  const u = Math.floor((window.innerWidth - R1 * 2) / Ur);
  const h = 50;
  if (Ni(e, n, r, i, o)) {
    return {
      x: e,
      y: n
    };
  }
  for (let a = 1; a <= h; a++) {
    for (let c = -a; c <= a; c++) {
      for (let d = -a; d <= a; d++) {
        if (Math.abs(d) !== a && Math.abs(c) !== a) {
          continue;
        }
        const p = e + d * Ur;
        const f = n + c * Ur;
        if (!(p < 0) && !(f < 0) && !(p + (r - 1) * Ur > (u - 1) * Ur) && Ni(p, f, r, i, o)) {
          return {
            x: p,
            y: f
          };
        }
      }
    }
  }
  for (let a = 0; a <= h; a++) {
    for (let c = 0; c <= u - r; c++) {
      const d = c * Ur;
      const p = a * Ur;
      if (Ni(d, p, r, i, o)) {
        return {
          x: d,
          y: p
        };
      }
    }
  }
  return {
    x: e,
    y: n
  };
}
const eD = 96;
const tD = 8;
const Pi = eD + tD;
const $c = 20;
function Kw(e, n) {
  return {
    x: Math.max(0, Math.round(e / Pi) * Pi),
    y: Math.max(0, Math.round(n / Pi) * Pi)
  };
}
function nD(e, n, r, i) {
  const [o, u] = E.useState({});
  const [h, a] = E.useState(null);
  const [c, d] = E.useState(null);
  const p = E.useRef({
    appId: null,
    offsetX: 0,
    offsetY: 0,
    sourceWorkspaceId: null
  });
  const f = E.useRef(null);
  const S = E.useRef(null);
  const _ = E.useRef(null);
  const x = E.useRef(n);
  const w = E.useRef(o);
  const g = E.useRef(r);
  const b = E.useRef(i);
  E.useEffect(() => {
    x.current = n;
  }, [n]);
  E.useEffect(() => {
    w.current = o;
  }, [o]);
  E.useEffect(() => {
    g.current = r;
  }, [r]);
  E.useEffect(() => {
    b.current = i;
  }, [i]);
  E.useEffect(() => {
    jO().then(D => {
      const $ = {};
      for (const [G, q] of D) {
        $[G] = q;
      }
      u($);
    });
  }, []);
  const m = E.useCallback(() => {
    const D = x.current || "home";
    const $ = {};
    for (const [G, q] of Object.entries(o)) {
      if (q.workspaceId === D) {
        $[G] = {
          x: q.x,
          y: q.y
        };
      }
    }
    return $;
  }, [o])();
  const v = E.useCallback(async (D, $, G) => {
    const q = x.current || "home";
    u(U => ({
      ...U,
      [D]: {
        workspaceId: q,
        x: $,
        y: G
      }
    }));
    await Qd(D, q, $, G);
  }, []);
  const C = E.useCallback(async D => {
    const $ = x.current || "home";
    u(G => {
      const q = {
        ...G
      };
      delete q[D];
      return q;
    });
    await $w(D, $);
  }, []);
  const T = E.useCallback(async (D, $, G, q) => {
    const U = o[D];
    if (U) {
      await Qd(D, U.workspaceId, U.x, U.y);
    }
    u(L => ({
      ...L,
      [D]: {
        workspaceId: $,
        x: G,
        y: q
      }
    }));
    await Qd(D, $, G, q);
  }, [o]);
  const A = E.useCallback((D, $, G) => {
    const q = w.current[D];
    if (!q) {
      return;
    }
    const U = $ - q.x - $c;
    const L = G - q.y - $c;
    p.current = {
      appId: D,
      offsetX: U,
      offsetY: L,
      sourceWorkspaceId: q.workspaceId
    };
    const F = q.workspaceId || x.current || "home";
    _.current = T1(w.current, g.current, b.current, F, D, "icon");
    a({
      appId: D,
      currentX: q.x,
      currentY: q.y
    });
    const P = Ni(q.x, q.y, 1, 1, _.current);
    d({
      x: q.x,
      y: q.y,
      isValid: P
    });
  }, []);
  const M = E.useCallback((D, $) => {
    if (!p.current.appId) {
      return;
    }
    const {
      offsetX: G,
      offsetY: q
    } = p.current;
    const U = D - G - $c;
    const L = $ - q - $c;
    S.current = {
      x: U,
      y: L
    };
    f.current ||= requestAnimationFrame(() => {
      f.current = null;
      const F = S.current;
      if (!F) {
        return;
      }
      const P = Kw(F.x, F.y);
      const V = Ni(P.x, P.y, 1, 1, _.current);
      d({
        x: P.x,
        y: P.y,
        isValid: V
      });
    });
  }, []);
  const R = E.useCallback(() => {
    if (f.current) {
      cancelAnimationFrame(f.current);
      f.current = null;
    }
    if (!p.current.appId) {
      return;
    }
    const {
      appId: D,
      sourceWorkspaceId: $
    } = p.current;
    p.current = {
      appId: null,
      offsetX: 0,
      offsetY: 0,
      sourceWorkspaceId: null
    };
    const G = S.current;
    S.current = null;
    if (!G) {
      _.current = null;
      a(null);
      d(null);
      return;
    }
    const q = Kw(G.x, G.y);
    const U = $ || "home";
    let L = q;
    if (!Ni(q.x, q.y, 1, 1, _.current)) {
      L = k1(q.x, q.y, 1, 1, _.current);
    }
    _.current = null;
    u(F => ({
      ...F,
      [D]: {
        workspaceId: U,
        x: L.x,
        y: L.y
      }
    }));
    Qd(D, U, L.x, L.y);
    a(null);
    d(null);
  }, []);
  const I = E.useCallback((D, $) => {
    const G = new Set();
    for (const [V, Z] of Object.entries(o)) {
      if (V !== $ && Z.workspaceId === D) {
        G.add(`${Z.x},${Z.y}`);
      }
    }
    const U = Object.entries(o).filter(([, V]) => V.workspaceId === D).reduce((V, [, Z]) => Math.max(V, Z.y), 0);
    const L = Math.floor(U / Pi) + 10;
    const F = Math.floor((window.innerWidth - $c * 2) / Pi);
    for (let V = 0; V <= L; V++) {
      for (let Z = 0; Z < F; Z++) {
        const J = Z * Pi;
        const ne = V * Pi;
        if (!G.has(`${J},${ne}`)) {
          return {
            col: Z,
            row: V,
            x: J,
            y: ne
          };
        }
      }
    }
    const P = L + 1;
    return {
      col: 0,
      row: P,
      x: 0,
      y: P * Pi
    };
  }, [o]);
  const j = E.useCallback(D => {
    const $ = x.current || "home";
    return I($, D);
  }, [I]);
  const W = E.useCallback(async D => {
    const $ = [];
    for (const [G, q] of Object.entries(o)) {
      if (q.workspaceId === D) {
        $.push(G);
      }
    }
    u(G => {
      const q = {
        ...G
      };
      for (const U of $) {
        delete q[U];
      }
      return q;
    });
    for (const G of $) {
      await $w(G, D);
    }
  }, [o]);
  const z = E.useCallback(async (D, $) => {
    const G = [];
    for (const [q, U] of Object.entries(o)) {
      if (U.workspaceId === D) {
        G.push(q);
      }
    }
    for (const q of G) {
      const U = o[q];
      u(L => ({
        ...L,
        [q]: {
          workspaceId: $,
          x: U.x,
          y: U.y
        }
      }));
      await qw(q, D, $, U.x, U.y);
    }
  }, [o]);
  const N = E.useCallback(async (D, $) => {
    const G = o[D];
    if (!G || G.workspaceId === $) {
      return;
    }
    const q = I($);
    u(U => ({
      ...U,
      [D]: {
        workspaceId: $,
        x: q.x,
        y: q.y
      }
    }));
    await qw(D, G.workspaceId, $, q.x, q.y);
  }, [o]);
  return {
    desktopIcons: o,
    positions: m,
    dragState: h,
    dragTarget: c,
    isDragging: h !== null,
    handleDragStart: A,
    handleDragMove: M,
    handleDragEnd: R,
    findEmptyCell: j,
    savePosition: v,
    removePosition: C,
    addIconToWorkspace: T,
    removeIconsByWorkspace: W,
    moveIconsToWorkspace: z,
    moveIconToWorkspace: N
  };
}
const rD = "jsos-widgets";
const sD = 1;
async function Do() {
  return ah(rD, sD, {
    upgrade(e) {
      if (!e.objectStoreNames.contains("desktop-widgets")) {
        const n = e.createObjectStore("desktop-widgets", {
          keyPath: "id"
        });
        n.createIndex("appId", "appId");
        n.createIndex("workspaceId", "workspaceId");
      }
    }
  });
}
function iD(e, n, r) {
  return `${e}::${n}::${r}::${Date.now()}`;
}
async function Zw(e) {
  await (await Do()).put("desktop-widgets", e);
}
async function oD() {
  return await (await Do()).getAll("desktop-widgets");
}
async function vg(e) {
  await (await Do()).delete("desktop-widgets", e);
}
async function aD(e, n, r) {
  const i = await Do();
  const o = await i.get("desktop-widgets", e);
  if (o) {
    o.x = n;
    o.y = r;
    await i.put("desktop-widgets", o);
  }
}
async function lD() {
  const e = await Do();
  const n = await e.getAll("desktop-widgets");
  const r = e.transaction("desktop-widgets", "readwrite");
  let i = 0;
  for (const o of n) {
    if (!o.workspaceId) {
      o.workspaceId = "home";
      await r.store.put(o);
      i++;
    }
  }
  await r.done;
  return i;
}
async function cD(e, n, r) {
  const i = await Do();
  const o = await i.get("desktop-widgets", e);
  if (o) {
    o.widget = {
      ...o.widget,
      cols: n,
      rows: r
    };
    await i.put("desktop-widgets", o);
  }
}
async function uD(e, n) {
  const r = await Do();
  const i = await r.get("desktop-widgets", e);
  if (i) {
    i.locked = n;
    await r.put("desktop-widgets", i);
  }
}
async function dD(e, n) {
  const r = await Do();
  const i = await r.get("desktop-widgets", e);
  if (i) {
    i.widget = {
      ...i.widget,
      background: n
    };
    await r.put("desktop-widgets", i);
  }
}
const fD = 96;
const hD = 8;
const Jt = fD + hD;
const Ai = 20;
function pD(e, n, r) {
  const [i, o] = E.useState(new Map());
  const [u, h] = E.useState({});
  const [a, c] = E.useState(null);
  const [d, p] = E.useState(null);
  const [f, S] = E.useState(null);
  const [_, x] = E.useState(null);
  const w = E.useRef({
    widgetId: null,
    offsetX: 0,
    offsetY: 0,
    sourceWorkspaceId: null
  });
  const g = E.useRef(null);
  const b = E.useRef(null);
  const m = E.useRef(null);
  const v = E.useRef({
    widgetId: null,
    handle: null,
    startCols: 0,
    startRows: 0,
    startClientX: 0,
    startClientY: 0,
    posX: 0,
    posY: 0
  });
  const C = E.useRef(n);
  const T = E.useRef(u);
  const A = E.useRef(i);
  E.useEffect(() => {
    C.current = n;
  }, [n]);
  E.useEffect(() => {
    T.current = u;
  }, [u]);
  E.useEffect(() => {
    A.current = i;
  }, [i]);
  E.useEffect(() => {
    oD().then(ee => {
      const Y = new Map();
      const re = {};
      for (const ce of ee) {
        ce.workspaceId ||= "home";
        Y.set(ce.id, ce);
        re[ce.id] = {
          x: ce.x,
          y: ce.y
        };
      }
      o(Y);
      h(re);
    });
  }, []);
  const M = E.useCallback((ee, Y, re) => {
    const ce = new Set();
    const ge = C.current || "home";
    for (const [X, Q] of Object.entries(r.current || {})) {
      if (Q.workspaceId === ge) {
        ce.add(`${Q.x},${Q.y}`);
      }
    }
    for (const [X, Q] of Object.entries(u)) {
      if (X === ee) {
        continue;
      }
      const se = i.get(X);
      if (se && se.workspaceId !== ge) {
        continue;
      }
      const {
        cols: he,
        rows: ye
      } = Ls((se == null ? undefined : se.widget) || {});
      for (let pe = 0; pe < ye; pe++) {
        for (let Se = 0; Se < he; Se++) {
          ce.add(`${Q.x + Se * Jt},${Q.y + pe * Jt}`);
        }
      }
    }
    const de = {};
    for (const [X, Q] of Object.entries(u)) {
      const se = i.get(X);
      if (se && se.workspaceId === ge) {
        de[X] = Q;
      }
    }
    const me = Object.values(de).reduce((X, Q) => Math.max(X, Q.y), 0);
    const H = Math.floor(me / Jt) + 10;
    const ae = Math.floor((window.innerWidth - Ai * 2) / Jt);
    for (let X = 0; X <= H; X++) {
      for (let Q = 0; Q <= ae - Y + 1; Q++) {
        const se = Q * Jt;
        const he = X * Jt;
        let ye = true;
        for (let pe = 0; pe < re && ye; pe++) {
          for (let Se = 0; Se < Y && ye; Se++) {
            if (ce.has(`${se + Se * Jt},${he + pe * Jt}`)) {
              ye = false;
            }
          }
        }
        if (ye) {
          return {
            x: se,
            y: he
          };
        }
      }
    }
    return {
      x: 0,
      y: (H + 1) * Jt
    };
  }, [u, i]);
  const R = E.useCallback((ee, Y, re, ce, ge) => {
    const de = new Set();
    const me = C.current || "home";
    for (const [ae, oe] of Object.entries(r.current || {})) {
      if (oe.workspaceId === me) {
        de.add(`${oe.x},${oe.y}`);
      }
    }
    for (const [ae, oe] of Object.entries(u)) {
      if (ae === ge) {
        continue;
      }
      const X = i.get(ae);
      if (X && X.workspaceId !== me) {
        continue;
      }
      const {
        cols: Q,
        rows: se
      } = Ls((X == null ? undefined : X.widget) || {});
      for (let he = 0; he < se; he++) {
        for (let ye = 0; ye < Q; ye++) {
          de.add(`${oe.x + ye * Jt},${oe.y + he * Jt}`);
        }
      }
    }
    for (let ae = 0; ae < ce; ae++) {
      for (let oe = 0; oe < re; oe++) {
        if (de.has(`${ee + oe * Jt},${Y + ae * Jt}`)) {
          return false;
        }
      }
    }
    const H = Math.floor((window.innerWidth - Ai * 2) / Jt);
    return !(ee / Jt + re > H);
  }, [u, i]);
  const I = E.useCallback(async (ee, Y, re, ce) => {
    const ge = e.get(ee);
    if (!ge) {
      return null;
    }
    const de = C.current || "home";
    const me = iD(ee, Y.id, de);
    const {
      cols: H,
      rows: ae
    } = Ls(Y);
    let oe = null;
    if (re != null && ce != null) {
      const Q = Math.max(0, Math.round((re - Ai) / Jt) * Jt);
      const se = Math.max(0, Math.round((ce - Ai) / Jt) * Jt);
      if (R(Q, se, H, ae, me)) {
        oe = {
          x: Q,
          y: se
        };
      }
    }
    oe ||= M(me, H, ae);
    const X = {
      id: me,
      appId: ee,
      widgetId: Y.id,
      workspaceId: de,
      widget: Y,
      app: {
        id: ge.id,
        name: rn(ge.name, xr()),
        icon: ge.icon
      },
      x: oe.x,
      y: oe.y
    };
    await Zw(X);
    o(Q => {
      const se = new Map(Q);
      se.set(me, X);
      return se;
    });
    h(Q => ({
      ...Q,
      [me]: {
        x: oe.x,
        y: oe.y
      }
    }));
    return me;
  }, [e, M, R]);
  const j = E.useCallback(async ee => {
    await vg(ee);
    o(Y => {
      const re = new Map(Y);
      re.delete(ee);
      return re;
    });
    h(Y => {
      const re = {
        ...Y
      };
      delete re[ee];
      return re;
    });
  }, []);
  const W = E.useCallback(async ee => {
    const Y = [];
    for (const [re, ce] of i) {
      if (ce.appId === ee) {
        Y.push(re);
      }
    }
    for (const re of Y) {
      await vg(re);
    }
    o(re => {
      const ce = new Map(re);
      for (const ge of Y) {
        ce.delete(ge);
      }
      return ce;
    });
    h(re => {
      const ce = {
        ...re
      };
      for (const ge of Y) {
        delete ce[ge];
      }
      return ce;
    });
  }, [i]);
  const z = E.useCallback(async ee => {
    const Y = [];
    for (const [re, ce] of i) {
      if (ce.workspaceId === ee) {
        Y.push(re);
      }
    }
    for (const re of Y) {
      await vg(re);
    }
    o(re => {
      const ce = new Map(re);
      for (const ge of Y) {
        ce.delete(ge);
      }
      return ce;
    });
    h(re => {
      const ce = {
        ...re
      };
      for (const ge of Y) {
        delete ce[ge];
      }
      return ce;
    });
  }, [i]);
  const N = E.useCallback(async (ee, Y) => {
    const re = [];
    for (const [ce, ge] of i) {
      if (ge.workspaceId === ee) {
        re.push(ce);
      }
    }
    for (const ce of re) {
      const ge = i.get(ce);
      if (ge) {
        const de = {
          ...ge,
          workspaceId: Y
        };
        await Zw(de);
        o(me => {
          const H = new Map(me);
          H.set(ce, de);
          return H;
        });
      }
    }
  }, [i]);
  const D = E.useCallback(() => {
    const ee = [];
    for (const [Y, re] of e) {
      if (re.widgets && re.widgets.length > 0) {
        ee.push({
          appId: Y,
          appName: rn(re.name, xr()),
          appIcon: re.icon,
          widgets: re.widgets
        });
      }
    }
    return ee;
  }, [e]);
  const $ = E.useCallback((ee, Y, re) => {
    const ce = T.current[ee];
    const ge = A.current.get(ee);
    if (!ce || !ge) {
      return;
    }
    const de = Y - ce.x - Ai;
    const me = re - ce.y - Ai;
    w.current = {
      widgetId: ee,
      offsetX: de,
      offsetY: me,
      sourceWorkspaceId: ge.workspaceId
    };
    const {
      cols: H,
      rows: ae
    } = Ls(ge.widget || {});
    const oe = ge.workspaceId || C.current || "home";
    m.current = T1(r.current, T.current, A.current, oe, ee, "widget");
    c({
      widgetId: ee,
      currentX: ce.x,
      currentY: ce.y
    });
    const X = Ni(ce.x, ce.y, H, ae, m.current);
    p({
      x: ce.x,
      y: ce.y,
      isValid: X
    });
  }, []);
  const G = E.useCallback((ee, Y) => {
    if (!w.current.widgetId) {
      return;
    }
    const {
      offsetX: re,
      offsetY: ce
    } = w.current;
    const ge = ee - re - Ai;
    const de = Y - ce - Ai;
    b.current = {
      x: ge,
      y: de
    };
    g.current ||= requestAnimationFrame(() => {
      g.current = null;
      const me = b.current;
      if (!me) {
        return;
      }
      const H = {
        x: Math.max(0, Math.round(me.x / Jt) * Jt),
        y: Math.max(0, Math.round(me.y / Jt) * Jt)
      };
      const ae = A.current.get(w.current.widgetId);
      const {
        cols: oe,
        rows: X
      } = Ls((ae == null ? undefined : ae.widget) || {});
      const Q = Ni(H.x, H.y, oe, X, m.current);
      p({
        x: H.x,
        y: H.y,
        isValid: Q
      });
    });
  }, []);
  const q = E.useCallback(() => {
    if (g.current) {
      cancelAnimationFrame(g.current);
      g.current = null;
    }
    if (!w.current.widgetId) {
      return;
    }
    const {
      widgetId: ee,
      sourceWorkspaceId: Y
    } = w.current;
    w.current = {
      widgetId: null,
      offsetX: 0,
      offsetY: 0,
      sourceWorkspaceId: null
    };
    const re = b.current;
    b.current = null;
    if (!re) {
      m.current = null;
      c(null);
      p(null);
      return;
    }
    const ce = {
      x: Math.max(0, Math.round(re.x / Jt) * Jt),
      y: Math.max(0, Math.round(re.y / Jt) * Jt)
    };
    const ge = A.current.get(ee);
    const {
      cols: de,
      rows: me
    } = Ls((ge == null ? undefined : ge.widget) || {});
    if (!Y) {
      C.current;
    }
    let H = ce;
    if (!Ni(ce.x, ce.y, de, me, m.current)) {
      H = k1(ce.x, ce.y, de, me, m.current);
    }
    m.current = null;
    const ae = {
      ...ge,
      x: H.x,
      y: H.y
    };
    h(oe => ({
      ...oe,
      [ee]: H
    }));
    aD(ee, H.x, H.y);
    o(oe => {
      const X = new Map(oe);
      if (ge) {
        X.set(ee, ae);
      }
      return X;
    });
    c(null);
    p(null);
  }, []);
  const U = E.useRef(null);
  const L = E.useRef(null);
  const F = E.useRef(null);
  const P = E.useCallback(ee => {
    const Y = new Set();
    const re = C.current || "home";
    for (const [ce, ge] of Object.entries(r.current || {})) {
      if (ge.workspaceId === re) {
        Y.add(`${ge.x},${ge.y}`);
      }
    }
    for (const [ce, ge] of Object.entries(u)) {
      if (ce === ee) {
        continue;
      }
      const de = i.get(ce);
      if (de && de.workspaceId !== re) {
        continue;
      }
      const {
        cols: me,
        rows: H
      } = Ls((de == null ? undefined : de.widget) || {});
      for (let ae = 0; ae < H; ae++) {
        for (let oe = 0; oe < me; oe++) {
          Y.add(`${ge.x + oe * Jt},${ge.y + ae * Jt}`);
        }
      }
    }
    return Y;
  }, [u, i]);
  const V = E.useCallback((ee, Y, re, ce) => {
    const ge = u[ee];
    const de = i.get(ee);
    if (!ge || !de) {
      return;
    }
    const {
      cols: me,
      rows: H
    } = Ls(de.widget || {});
    v.current = {
      widgetId: ee,
      handle: Y,
      startCols: me,
      startRows: H,
      startClientX: re,
      startClientY: ce,
      posX: ge.x,
      posY: ge.y
    };
    U.current = P(ee);
    S({
      widgetId: ee,
      handle: Y,
      currentCols: me,
      currentRows: H
    });
    x({
      cols: me,
      rows: H
    });
  }, [u, i, P]);
  const Z = E.useCallback((ee, Y) => {
    const re = v.current;
    if (!re.widgetId) {
      return;
    }
    const ce = ee - re.startClientX;
    const ge = Y - re.startClientY;
    const de = Math.round(ce / Jt);
    const me = Math.round(ge / Jt);
    const H = re.handle;
    let ae = re.startCols;
    let oe = re.startRows;
    if (H.includes("e")) {
      ae = Math.max(1, re.startCols + de);
    }
    if (H.includes("w")) {
      ae = Math.max(1, re.startCols - de);
    }
    if (H.includes("s")) {
      oe = Math.max(1, re.startRows + me);
    }
    if (H.includes("n")) {
      oe = Math.max(1, re.startRows - me);
    }
    F.current = {
      newCols: ae,
      newRows: oe
    };
    L.current ||= requestAnimationFrame(() => {
      L.current = null;
      const X = F.current;
      if (!X) {
        return;
      }
      const Q = U.current;
      let se = true;
      for (let ye = 0; ye < X.newRows && se; ye++) {
        for (let pe = 0; pe < X.newCols && se; pe++) {
          if (Q.has(`${re.posX + pe * Jt},${re.posY + ye * Jt}`)) {
            se = false;
          }
        }
      }
      const he = Math.floor((window.innerWidth - Ai * 2) / Jt);
      if (re.posX + X.newCols > he * Jt) {
        se = false;
      }
      if (se) {
        S(ye => ye ? {
          ...ye,
          currentCols: X.newCols,
          currentRows: X.newRows
        } : null);
        x({
          cols: X.newCols,
          rows: X.newRows
        });
      }
      F.current = null;
    });
  }, []);
  const J = E.useCallback(() => {
    if (L.current) {
      cancelAnimationFrame(L.current);
      L.current = null;
    }
    F.current = null;
    U.current = null;
    const ee = v.current;
    if (!ee.widgetId) {
      return;
    }
    const {
      widgetId: Y
    } = ee;
    v.current = {
      widgetId: null,
      handle: null,
      startCols: 0,
      startRows: 0,
      startClientX: 0,
      startClientY: 0,
      posX: 0,
      posY: 0
    };
    S(re => {
      if (!re) {
        return null;
      }
      const ce = re.currentCols;
      const ge = re.currentRows;
      cD(Y, ce, ge);
      o(de => {
        const me = new Map(de);
        const H = me.get(Y);
        if (H) {
          me.set(Y, {
            ...H,
            widget: {
              ...H.widget,
              cols: ce,
              rows: ge
            }
          });
        }
        return me;
      });
      return null;
    });
    x(null);
  }, []);
  const ne = E.useCallback(async ee => {
    const Y = i.get(ee);
    if (!Y) {
      return;
    }
    const re = !Y.locked;
    await uD(ee, re);
    o(ce => {
      const ge = new Map(ce);
      const de = ge.get(ee);
      if (de) {
        ge.set(ee, {
          ...de,
          locked: re
        });
      }
      return ge;
    });
  }, [i]);
  const ue = E.useCallback(async (ee, Y) => {
    await dD(ee, Y);
    o(re => {
      const ce = new Map(re);
      const ge = ce.get(ee);
      if (ge) {
        ce.set(ee, {
          ...ge,
          widget: {
            ...ge.widget,
            background: Y
          }
        });
      }
      return ce;
    });
  }, []);
  return {
    allWidgets: i,
    widgetPositions: u,
    dragState: a,
    dragTarget: d,
    isDragging: a !== null,
    resizeState: f,
    resizeTarget: _,
    isResizing: f !== null,
    addWidget: I,
    removeWidget: j,
    removeWidgetsByApp: W,
    removeWidgetsByWorkspace: z,
    moveWidgetsToWorkspace: N,
    getAvailableWidgets: D,
    handleDragStart: $,
    handleDragMove: G,
    handleDragEnd: q,
    handleResizeStart: V,
    handleResizeMove: Z,
    handleResizeEnd: J,
    toggleWidgetLock: ne,
    updateWidgetBackground: ue
  };
}
const mD = {
  desktop: {
    installApp: "安装应用",
    addWidget: "添加挂件",
    wallpaper: "壁纸设置",
    enterFullscreen: "进入全屏",
    exitFullscreen: "退出全屏",
    about: "关于程序"
  },
  icon: {
    open: "打开",
    moveTo: "移动",
    selectTarget: "工作区",
    properties: "属性",
    uninstall: "卸载",
    systemApp: "系统应用",
    moveSuccess: "移动成功",
    moveDescription: "已将「{name}」移动到「{workspace}」"
  },
  taskbar: {
    minimized: "最小化",
    running: "运行中",
    exited: "已退出",
    starting: "启动中...",
    newWindow: "新建窗口",
    windowGroup: "窗口 · {count}"
  },
  dock: {
    position: "Dock 位置",
    top: "顶部",
    bottom: "底部",
    left: "左侧",
    right: "右侧",
    autoHide: "自动隐藏 Dock",
    autoHideDesc: "鼠标离开后自动隐藏，移动到屏幕边缘显示",
    settings: "Dock 设置...",
    autoHideOn: "自动隐藏已开启",
    autoHideOff: "自动隐藏已关闭"
  },
  workspace: {
    home: "首页",
    switcher: "工作区",
    group: "工作区 · {count}",
    new: "新建工作区",
    create: "创建",
    delete: "删除工作区",
    defaultName: "工作区 {number}",
    deleted: "工作区已删除",
    deletedDesc: "工作区「{name}」已删除",
    createTitle: "新建工作区",
    createDesc: "为新工作区设置名称",
    namePlaceholder: "工作区名称",
    deleteTitle: "删除工作区",
    deleteDesc: "工作区「{name}」中有以下内容：",
    deleteEmpty: "工作区为空，可以直接删除。",
    deleteWindows: "{count} 个应用窗口",
    deleteWidgets: "{count} 个小组件",
    moveToOther: "移动到其他工作区",
    noOtherWorkspace: "没有其他工作区可移动",
    closeAppsAndDelete: "关闭应用并删除小组件",
    confirmDelete: "确认删除",
    cancel: "取消"
  },
  window: {
    processExited: "进程已退出",
    restart: "重启",
    close: "关闭",
    minimize: "最小化",
    maximize: "最大化",
    restore: "还原",
    terminalSize25: "切换到 25%",
    terminalSize50: "切换到 50%",
    terminalSize75: "切换到 75%",
    addressBar: "地址栏",
    logs: "日志",
    back: "后退",
    forward: "前进",
    home: "首页",
    refresh: "刷新",
    restarting: "正在重启..."
  },
  install: {
    title: "安装应用",
    localFile: "本地文件",
    remoteUrl: "远程URL",
    fromGitHub: "从 GitHub 安装",
    fromUrl: "从远程 URL 安装",
    comingSoon: "开发中，敬请期待",
    zipFormat: "支持 .zip 格式",
    selectFile: "选择文件",
    confirmInstall: "确认安装以下应用？",
    confirmUpgrade: "发现新版本，确认升级？",
    confirmDowngrade: "目标版本低于当前版本，确认降级？",
    confirmOverwrite: "目标版本与当前版本相同，确认覆盖安装？",
    selectPackage: "选择应用包进行安装",
    installing: "正在解析应用包...",
    fileCount: "{count} 个文件",
    currentVersion: "当前 v{version}",
    downgradeWarning: "降级可能导致数据兼容性问题",
    actionInstall: "安装",
    actionUpgrade: "升级",
    actionDowngrade: "降级",
    actionOverwrite: "覆盖安装",
    installTitle: "安装应用",
    installDesc: "正在安装 {name}",
    invalidFormat: "文件格式错误",
    invalidFormatDesc: "请选择 .zip 格式的应用包",
    invalidPackage: "无效的应用包",
    parseFailed: "解析失败",
    installingStatus: "正在安装...",
    installComplete: "安装完成",
    open: "打开",
    installFailed: "安装失败",
    cancel: "取消"
  },
  uninstall: {
    title: "确认卸载",
    desc: "确定要卸载「{name}」吗？卸载后应用将从桌面移除。",
    deleteData: "同时删除应用数据",
    cancel: "取消",
    uninstall: "卸载",
    success: "卸载成功",
    successDesc: "应用已从桌面移除",
    failed: "卸载失败"
  },
  properties: {
    title: "应用属性",
    type: "类型",
    cliApp: "CLI 应用",
    guiApp: "GUI 应用",
    windowSize: "窗口尺寸",
    windowSizeDesc: "默认 {width}×{height}（最小 {minWidth}×{minHeight}）",
    widgets: "小组件",
    widgetsCount: "{count} 个可用",
    installedAt: "安装于",
    close: "关闭"
  },
  widget: {
    addTitle: "添加小组件",
    addDesc: "选择要添加到桌面的小组件",
    noWidgets: "没有可用的小组件",
    noWidgetsDesc: "已安装的应用没有配置小组件",
    openApp: "打开应用",
    remove: "移除小组件",
    removeTitle: "确认删除",
    removeDesc: "确定要移除「{name}」小组件吗？",
    cancel: "取消",
    delete: "删除",
    added: "小组件已添加",
    addedDesc: "{name} 已添加到桌面",
    removed: "小组件已移除",
    removedDesc: "小组件已从桌面移除",
    background: "Widget 背景",
    bgFrosted: "磨砂",
    bgTransparent: "透明",
    bgSolid: "实心",
    bgOpacity: "透明度",
    bgBlur: "模糊度",
    logs: "日志",
    refresh: "刷新",
    lock: "锁定",
    unlock: "解锁",
    bgSettings: "背景设置",
    bgSettingsMenu: "背景设置"
  },
  launcher: {
    title: "应用列表",
    search: "搜索应用...",
    clear: "清除搜索",
    noResults: "没有找到匹配的应用",
    noApps: "暂无已安装的应用",
    navigate: "导航",
    select: "打开",
    close: "关闭",
    running: "运行中",
    installed: "已安装"
  },
  compat: {
    title: "浏览器/设备不兼容",
    desc: "您的浏览器或设备不满足 JSOS 的运行要求，以下为检测详情：",
    recommend: "推荐使用电脑端 Chrome / Edge 浏览器访问。",
    refresh: "刷新重试",
    statusPassed: "通过",
    statusFailed: "未通过",
    statusUnknown: "未知"
  },
  toast: {
    systemBooting: "系统启动中",
    systemBootingDesc: "正在初始化系统环境...",
    loadingApps: "正在加载应用数据...",
    systemReady: "系统就绪",
    systemReadyDesc: "系统启动完成(●'◡'●)",
    bootFailed: "启动失败",
    bootFailedDesc: "请刷新页面重试",
    retry: "重试",
    appInstalling: "正在安装 {name}...",
    appInstallingTitle: "正在安装 {name} v{version}",
    appInstalled: "系统应用已安装",
    appInstalledDesc: "{name} v{version} 已安装",
    appUpdating: "正在更新 {name}...",
    appUpdatingTitle: "正在更新 {name} v{newVersion}",
    appUpdated: "系统应用已更新",
    appUpdatedDesc: "{name} 已从 v{oldVersion} 更新到 v{newVersion}",
    httpDetected: "检测到 HTTP 服务",
    httpDetectedDesc: "端口 {port} 上有服务启动",
    preview: "预览"
  }
};
const iv = {
  desktop: {
    installApp: "Install App",
    addWidget: "Add Widget",
    wallpaper: "Wallpaper Settings",
    enterFullscreen: "Enter Fullscreen",
    exitFullscreen: "Exit Fullscreen",
    about: "About"
  },
  icon: {
    open: "Open",
    moveTo: "Move",
    selectTarget: "Select target workspace",
    properties: "Properties",
    uninstall: "Uninstall",
    systemApp: "System App",
    moveSuccess: "Moved successfully",
    moveDescription: "Moved \"{name}\" to \"{workspace}\""
  },
  taskbar: {
    minimized: "Minimized",
    running: "Running",
    exited: "Exited",
    starting: "Starting...",
    newWindow: "New Window",
    windowGroup: "Window · {count}"
  },
  dock: {
    position: "Dock Position",
    top: "Top",
    bottom: "Bottom",
    left: "Left",
    right: "Right",
    autoHide: "Auto-hide Dock",
    autoHideDesc: "Auto-hide when mouse leaves, show when approaching screen edge",
    settings: "Dock Settings...",
    autoHideOn: "Auto-hide enabled",
    autoHideOff: "Auto-hide disabled"
  },
  workspace: {
    home: "Home",
    switcher: "Workspace",
    group: "Workspace · {count}",
    new: "New Workspace",
    create: "Create",
    delete: "Delete Workspace",
    defaultName: "Workspace {number}",
    deleted: "Workspace deleted",
    deletedDesc: "Workspace \"{name}\" has been deleted",
    createTitle: "New Workspace",
    createDesc: "Set a name for the new workspace",
    namePlaceholder: "Workspace name",
    deleteTitle: "Delete Workspace",
    deleteDesc: "Workspace \"{name}\" contains:",
    deleteEmpty: "The workspace is empty and can be deleted directly.",
    deleteWindows: "{count} app window(s)",
    deleteWidgets: "{count} widget(s)",
    moveToOther: "Move to another workspace",
    noOtherWorkspace: "No other workspace available",
    closeAppsAndDelete: "Close apps and delete widgets",
    confirmDelete: "Confirm Delete",
    cancel: "Cancel"
  },
  window: {
    processExited: "Process exited",
    restart: "Restart",
    close: "Close",
    minimize: "Minimize",
    maximize: "Maximize",
    restore: "Restore",
    terminalSize25: "Switch to 25%",
    terminalSize50: "Switch to 50%",
    terminalSize75: "Switch to 75%",
    addressBar: "Address Bar",
    logs: "Logs",
    back: "Back",
    forward: "Forward",
    home: "Home",
    refresh: "Refresh",
    restarting: "Restarting..."
  },
  install: {
    title: "Install App",
    localFile: "Local File",
    remoteUrl: "Remote URL",
    fromGitHub: "Install from GitHub",
    fromUrl: "Install from Remote URL",
    comingSoon: "Coming soon",
    zipFormat: "Supports .zip format",
    selectFile: "Select File",
    confirmInstall: "Confirm installation of the following app?",
    confirmUpgrade: "A new version is available, upgrade?",
    confirmDowngrade: "Target version is lower, downgrade?",
    confirmOverwrite: "Same version detected, overwrite?",
    selectPackage: "Select an app package to install",
    installing: "Parsing app package...",
    fileCount: "{count} file(s)",
    currentVersion: "Current v{version}",
    downgradeWarning: "Downgrading may cause compatibility issues",
    actionInstall: "Install",
    actionUpgrade: "Upgrade",
    actionDowngrade: "Downgrade",
    actionOverwrite: "Overwrite",
    installTitle: "Install App",
    installDesc: "Installing {name}",
    invalidFormat: "Invalid file format",
    invalidFormatDesc: "Please select a .zip file",
    invalidPackage: "Invalid package",
    parseFailed: "Parse failed",
    installingStatus: "Installing...",
    installComplete: "Installation complete",
    open: "Open",
    installFailed: "Installation failed",
    cancel: "Cancel"
  },
  uninstall: {
    title: "Confirm Uninstall",
    desc: "Are you sure you want to uninstall \"{name}\"? It will be removed from the desktop.",
    deleteData: "Also delete app data",
    cancel: "Cancel",
    uninstall: "Uninstall",
    success: "Uninstalled",
    successDesc: "App has been removed from desktop",
    failed: "Uninstall failed"
  },
  properties: {
    title: "App Properties",
    type: "Type",
    cliApp: "CLI App",
    guiApp: "GUI App",
    windowSize: "Window Size",
    windowSizeDesc: "Default {width}×{height} (min {minWidth}×{minHeight})",
    widgets: "Widgets",
    widgetsCount: "{count} available",
    installedAt: "Installed at",
    close: "Close"
  },
  widget: {
    addTitle: "Add Widget",
    addDesc: "Select a widget to add to the desktop",
    noWidgets: "No widgets available",
    noWidgetsDesc: "Installed apps have no widget configured",
    openApp: "Open App",
    remove: "Remove Widget",
    removeTitle: "Confirm Remove",
    removeDesc: "Are you sure you want to remove \"{name}\" widget?",
    cancel: "Cancel",
    delete: "Remove",
    added: "Widget added",
    addedDesc: "{name} has been added to the desktop",
    removed: "Widget removed",
    removedDesc: "Widget has been removed from the desktop",
    background: "Widget Background",
    bgFrosted: "Frosted",
    bgTransparent: "Transparent",
    bgSolid: "Solid",
    bgOpacity: "Opacity",
    bgBlur: "Blur",
    logs: "Logs",
    refresh: "Refresh",
    lock: "Lock",
    unlock: "Unlock",
    bgSettings: "Background",
    bgSettingsMenu: "Background"
  },
  launcher: {
    title: "All Apps",
    search: "Search apps...",
    clear: "Clear search",
    noResults: "No matching apps found",
    noApps: "No apps installed",
    navigate: "Navigate",
    select: "Open",
    close: "Close",
    running: "Running",
    installed: "Installed"
  },
  compat: {
    title: "Browser / Device Incompatible",
    desc: "Your browser or device does not meet the requirements for JSOS. Details below:",
    recommend: "Please use Chrome or Edge on a desktop computer.",
    refresh: "Retry",
    statusPassed: "Pass",
    statusFailed: "Fail",
    statusUnknown: "Unknown"
  },
  toast: {
    systemBooting: "System Booting",
    systemBootingDesc: "Initializing system environment...",
    loadingApps: "Loading app data...",
    systemReady: "System Ready",
    systemReadyDesc: "System startup complete(●'◡'●)",
    bootFailed: "Boot Failed",
    bootFailedDesc: "Please refresh the page and try again",
    retry: "Retry",
    appInstalling: "Installing {name}...",
    appInstallingTitle: "Installing {name} v{version}",
    appInstalled: "System app installed",
    appInstalledDesc: "{name} v{version} has been installed",
    appUpdating: "Updating {name}...",
    appUpdatingTitle: "Updating {name} v{newVersion}",
    appUpdated: "System app updated",
    appUpdatedDesc: "{name} has been updated from v{oldVersion} to v{newVersion}",
    httpDetected: "HTTP service detected",
    httpDetectedDesc: "A service started on port {port}",
    preview: "Preview"
  }
};
const gD = {
  "zh-CN": mD,
  en: iv
};
function A1(e, n) {
  const r = gD[n] || iv;
  let i = e.split(".").reduce((o, u) => o == null ? undefined : o[u], r);
  if (i == null) {
    i = e.split(".").reduce((o, u) => o == null ? undefined : o[u], iv);
  }
  return i ?? e;
}
function M1(e, n) {
  if (n) {
    return e.replace(/\{(\w+)\}/g, (r, i) => n[i] ?? `{${i}}`);
  } else {
    return e;
  }
}
function _s(e, n) {
  return M1(A1(e, xr()), n);
}
const O1 = E.createContext(null);
function _Component114({
  children: e
}) {
  const [n, r] = E.useState(xr());
  E.useEffect(() => {
    const o = u => r(u.detail || xr());
    window.addEventListener("locale-changed", o);
    return () => window.removeEventListener("locale-changed", o);
  }, []);
  const i = E.useCallback((o, u) => M1(A1(o, n), u), [n]);
  return <O1.Provider value={{
    t: i,
    locale: n
  }}>{e}</O1.Provider>;
}
function Lr() {
  const e = E.useContext(O1);
  if (!e) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return e;
}
function D1(e, {
  delay: n = 500,
  threshold: r = 10,
  stopPropagation: i = false
} = {}) {
  const o = E.useRef(null);
  const u = E.useRef(null);
  const h = E.useRef(false);
  const a = E.useCallback(() => {
    if (o.current) {
      clearTimeout(o.current);
      o.current = null;
    }
    u.current = null;
    h.current = false;
  }, []);
  const c = E.useCallback(S => {
    if (i) {
      S.stopPropagation();
    }
    if (S.touches.length !== 1) {
      return;
    }
    const _ = S.touches[0];
    u.current = {
      x: _.clientX,
      y: _.clientY
    };
    h.current = false;
    o.current = setTimeout(() => {
      if (u.current) {
        h.current = true;
        e({
          x: u.current.x,
          y: u.current.y
        });
        a();
      }
    }, n);
  }, [i, e, n, a]);
  const d = E.useCallback(S => {
    if (!u.current || h.current) {
      return;
    }
    const _ = S.touches[0];
    const x = _.clientX - u.current.x;
    const w = _.clientY - u.current.y;
    if (Math.sqrt(x * x + w * w) > r) {
      a();
    }
  }, [r, a]);
  const p = E.useCallback(() => {
    a();
  }, [a]);
  const f = E.useCallback(() => {
    a();
  }, [a]);
  E.useEffect(() => () => a(), [a]);
  return {
    onTouchStart: c,
    onTouchMove: d,
    onTouchEnd: p,
    onTouchCancel: f
  };
}
const Ff = {
  "2xl": 1536,
  "3xl": 1600,
  "4xl": 2000,
  lg: 1024,
  md: 800,
  sm: 640,
  xl: 1280
};
function Qw(e) {
  return `(min-width: ${typeof e == "number" ? e : Ff[e]}px)`;
}
function Jw(e) {
  return `(max-width: ${(typeof e == "number" ? e : Ff[e]) - 1}px)`;
}
function bD(e) {
  if (typeof e != "string") {
    const r = [];
    if (e.min != null) {
      r.push(Qw(e.min));
    }
    if (e.max != null) {
      r.push(Jw(e.max));
    }
    if (e.pointer === "coarse") {
      r.push("(pointer: coarse)");
    }
    if (e.pointer === "fine") {
      r.push("(pointer: fine)");
    }
    if (r.length === 0) {
      return "(min-width: 0px)";
    } else {
      return r.join(" and ");
    }
  }
  if (e.startsWith("(")) {
    return e;
  }
  const n = [];
  for (const r of e.split(":")) {
    if (r.startsWith("max-")) {
      const i = r.slice(4);
      if (i in Ff) {
        n.push(Jw(i));
      }
    } else if (r in Ff) {
      n.push(Qw(r));
    }
  }
  if (n.length > 0) {
    return n.join(" and ");
  } else {
    return e;
  }
}
function yD() {
  return false;
}
function ou(e) {
  const n = bD(e);
  const r = E.useCallback(o => {
    if (typeof window === "undefined") {
      return () => {};
    }
    const u = window.matchMedia(n);
    u.addEventListener("change", o);
    return () => u.removeEventListener("change", o);
  }, [n]);
  const i = E.useCallback(() => typeof window === "undefined" ? false : window.matchMedia(n).matches, [n]);
  return E.useSyncExternalStore(r, i, yD);
}
const eS = 20;
const tS = 104;
const _D = 5;
const wD = 300;
function SD(e) {
  const n = ["#89b4fa", "#a6e3a1", "#f38ba8", "#f9e2af", "#cba6f7", "#94e2d5"];
  let r = 0;
  for (let i = 0; i < e.length; i++) {
    r = e.charCodeAt(i) + ((r << 5) - r);
  }
  return n[Math.abs(r) % n.length];
}
function _Component100({
  app: e,
  x: n,
  y: r,
  isDragging: i,
  onDoubleClick: o,
  onContextMenu: u,
  onDragStart: h,
  onDragEnd: a
}) {
  const {
    locale: c
  } = Lr();
  const [d, p] = E.useState(false);
  const f = E.useRef(null);
  const S = ou({
    pointer: "coarse"
  });
  const _ = D1(({
    x: m,
    y: v
  }) => {
    if (u != null) {
      u(e, {
        x: m,
        y: v
      });
    }
    if (a != null) {
      a();
    }
  }, {
    stopPropagation: true
  });
  const x = E.useCallback(m => {
    if (m.button === 0) {
      m.stopPropagation();
      f.current = {
        x: m.clientX,
        y: m.clientY,
        time: Date.now()
      };
      if (h != null) {
        h(e.id, m.clientX, m.clientY);
      }
    }
  }, [e.id, h]);
  const w = E.useCallback(m => {
    if (m.button === 0) {
      m.stopPropagation();
      if (f.current) {
        const v = m.clientX - f.current.x;
        const C = m.clientY - f.current.y;
        const T = Date.now() - f.current.time;
        if (Math.sqrt(v * v + C * C) < _D && T < wD) {
          if (o != null) {
            o(e.id);
          }
        }
      }
      f.current = null;
      if (a != null) {
        a();
      }
    }
  }, [e.id, o, a]);
  const g = E.useCallback(m => {
    m.preventDefault();
    m.stopPropagation();
    if (u != null) {
      u(e, {
        x: m.clientX,
        y: m.clientY
      });
    }
  }, [e, u]);
  const b = e.icon && !d ? <img src={e.icon} alt={rn(e.name, c)} className="w-12 h-12 mb-1 select-none pointer-events-none" draggable={false} onError={() => p(true)} /> : <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold text-white mb-1 select-none pointer-events-none" style={{
    background: SD(e.id)
  }}>{rn(e.name, c).charAt(0).toUpperCase()}</div>;
  return <div className={`absolute flex flex-col items-center justify-center rounded-lg cursor-pointer select-none pointer-events-auto ${i ? "opacity-60 z-50 transition-none" : "z-0 hover:bg-white/10"}`} style={{
    transform: `translate(${eS + (n ?? 0)}px, ${eS + (r ?? 0)}px) scale(${i ? 1.05 : 1})`,
    width: tS,
    height: tS,
    transition: i ? "none" : "transform 0.15s ease",
    willChange: i ? "transform" : "auto",
    ...(S ? {
      WebkitTouchCallout: "none"
    } : {})
  }} onPointerDown={x} onPointerUp={w} onContextMenu={g} {...S ? _ : {}}>{b}<span className="text-xs text-center text-white break-words leading-tight pointer-events-none w-full px-1" style={{
      textShadow: "0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black"
    }}>{rn(e.name, c)}</span></div>;
}
var bg = {
  exports: {}
};
var nS;
function CD() {
  if (!nS) {
    nS = 1;
    (function (e, n) {
      (function (r, i) {
        e.exports = i();
      })(globalThis, () => (() => {
        var r = {
          4567: function (h, a, c) {
            var d = this && this.__decorate || function (m, v, C, T) {
              var A;
              var M = arguments.length;
              var R = M < 3 ? v : T === null ? T = Object.getOwnPropertyDescriptor(v, C) : T;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                R = Reflect.decorate(m, v, C, T);
              } else {
                for (var I = m.length - 1; I >= 0; I--) {
                  if (A = m[I]) {
                    R = (M < 3 ? A(R) : M > 3 ? A(v, C, R) : A(v, C)) || R;
                  }
                }
              }
              if (M > 3 && R) {
                Object.defineProperty(v, C, R);
              }
              return R;
            };
            var p = this && this.__param || function (m, v) {
              return function (C, T) {
                v(C, T, m);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.AccessibilityManager = undefined;
            const f = c(9042);
            const S = c(9924);
            const _ = c(844);
            const x = c(4725);
            const w = c(2585);
            const g = c(3656);
            let b = a.AccessibilityManager = class extends _.Disposable {
              constructor(m, v, C, T) {
                super();
                this._terminal = m;
                this._coreBrowserService = C;
                this._renderService = T;
                this._rowColumns = new WeakMap();
                this._liveRegionLineCount = 0;
                this._charsToConsume = [];
                this._charsToAnnounce = "";
                this._accessibilityContainer = this._coreBrowserService.mainDocument.createElement("div");
                this._accessibilityContainer.classList.add("xterm-accessibility");
                this._rowContainer = this._coreBrowserService.mainDocument.createElement("div");
                this._rowContainer.setAttribute("role", "list");
                this._rowContainer.classList.add("xterm-accessibility-tree");
                this._rowElements = [];
                for (let A = 0; A < this._terminal.rows; A++) {
                  this._rowElements[A] = this._createAccessibilityTreeNode();
                  this._rowContainer.appendChild(this._rowElements[A]);
                }
                this._topBoundaryFocusListener = A => this._handleBoundaryFocus(A, 0);
                this._bottomBoundaryFocusListener = A => this._handleBoundaryFocus(A, 1);
                this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener);
                this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener);
                this._refreshRowsDimensions();
                this._accessibilityContainer.appendChild(this._rowContainer);
                this._liveRegion = this._coreBrowserService.mainDocument.createElement("div");
                this._liveRegion.classList.add("live-region");
                this._liveRegion.setAttribute("aria-live", "assertive");
                this._accessibilityContainer.appendChild(this._liveRegion);
                this._liveRegionDebouncer = this.register(new S.TimeBasedDebouncer(this._renderRows.bind(this)));
                if (!this._terminal.element) {
                  throw new Error("Cannot enable accessibility before Terminal.open");
                }
                this._terminal.element.insertAdjacentElement("afterbegin", this._accessibilityContainer);
                this.register(this._terminal.onResize(A => this._handleResize(A.rows)));
                this.register(this._terminal.onRender(A => this._refreshRows(A.start, A.end)));
                this.register(this._terminal.onScroll(() => this._refreshRows()));
                this.register(this._terminal.onA11yChar(A => this._handleChar(A)));
                this.register(this._terminal.onLineFeed(() => this._handleChar(`
`)));
                this.register(this._terminal.onA11yTab(A => this._handleTab(A)));
                this.register(this._terminal.onKey(A => this._handleKey(A.key)));
                this.register(this._terminal.onBlur(() => this._clearLiveRegion()));
                this.register(this._renderService.onDimensionsChange(() => this._refreshRowsDimensions()));
                this.register((0, g.addDisposableDomListener)(document, "selectionchange", () => this._handleSelectionChange()));
                this.register(this._coreBrowserService.onDprChange(() => this._refreshRowsDimensions()));
                this._refreshRows();
                this.register((0, _.toDisposable)(() => {
                  this._accessibilityContainer.remove();
                  this._rowElements.length = 0;
                }));
              }
              _handleTab(m) {
                for (let v = 0; v < m; v++) {
                  this._handleChar(" ");
                }
              }
              _handleChar(m) {
                if (this._liveRegionLineCount < 21) {
                  if (this._charsToConsume.length > 0) {
                    if (this._charsToConsume.shift() !== m) {
                      this._charsToAnnounce += m;
                    }
                  } else {
                    this._charsToAnnounce += m;
                  }
                  if (m === `
`) {
                    this._liveRegionLineCount++;
                    if (this._liveRegionLineCount === 21) {
                      this._liveRegion.textContent += f.tooMuchOutput;
                    }
                  }
                }
              }
              _clearLiveRegion() {
                this._liveRegion.textContent = "";
                this._liveRegionLineCount = 0;
              }
              _handleKey(m) {
                this._clearLiveRegion();
                if (!new RegExp("\\p{Control}", "u").test(m)) {
                  this._charsToConsume.push(m);
                }
              }
              _refreshRows(m, v) {
                this._liveRegionDebouncer.refresh(m, v, this._terminal.rows);
              }
              _renderRows(m, v) {
                const C = this._terminal.buffer;
                const T = C.lines.length.toString();
                for (let A = m; A <= v; A++) {
                  const M = C.lines.get(C.ydisp + A);
                  const R = [];
                  const I = (M == null ? undefined : M.translateToString(true, undefined, undefined, R)) || "";
                  const j = (C.ydisp + A + 1).toString();
                  const W = this._rowElements[A];
                  if (W) {
                    if (I.length === 0) {
                      W.innerText = "\xA0";
                      this._rowColumns.set(W, [0, 1]);
                    } else {
                      W.textContent = I;
                      this._rowColumns.set(W, R);
                    }
                    W.setAttribute("aria-posinset", j);
                    W.setAttribute("aria-setsize", T);
                  }
                }
                this._announceCharacters();
              }
              _announceCharacters() {
                if (this._charsToAnnounce.length !== 0) {
                  this._liveRegion.textContent += this._charsToAnnounce;
                  this._charsToAnnounce = "";
                }
              }
              _handleBoundaryFocus(m, v) {
                const C = m.target;
                const T = this._rowElements[v === 0 ? 1 : this._rowElements.length - 2];
                if (C.getAttribute("aria-posinset") === (v === 0 ? "1" : `${this._terminal.buffer.lines.length}`) || m.relatedTarget !== T) {
                  return;
                }
                let A;
                let M;
                if (v === 0) {
                  A = C;
                  M = this._rowElements.pop();
                  this._rowContainer.removeChild(M);
                } else {
                  A = this._rowElements.shift();
                  M = C;
                  this._rowContainer.removeChild(A);
                }
                A.removeEventListener("focus", this._topBoundaryFocusListener);
                M.removeEventListener("focus", this._bottomBoundaryFocusListener);
                if (v === 0) {
                  const R = this._createAccessibilityTreeNode();
                  this._rowElements.unshift(R);
                  this._rowContainer.insertAdjacentElement("afterbegin", R);
                } else {
                  const R = this._createAccessibilityTreeNode();
                  this._rowElements.push(R);
                  this._rowContainer.appendChild(R);
                }
                this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener);
                this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener);
                this._terminal.scrollLines(v === 0 ? -1 : 1);
                this._rowElements[v === 0 ? 1 : this._rowElements.length - 2].focus();
                m.preventDefault();
                m.stopImmediatePropagation();
              }
              _handleSelectionChange() {
                var I;
                if (this._rowElements.length === 0) {
                  return;
                }
                const m = document.getSelection();
                if (!m) {
                  return;
                }
                if (m.isCollapsed) {
                  if (this._rowContainer.contains(m.anchorNode)) {
                    this._terminal.clearSelection();
                  }
                  return;
                }
                if (!m.anchorNode || !m.focusNode) {
                  console.error("anchorNode and/or focusNode are null");
                  return;
                }
                let v = {
                  node: m.anchorNode,
                  offset: m.anchorOffset
                };
                let C = {
                  node: m.focusNode,
                  offset: m.focusOffset
                };
                if (v.node.compareDocumentPosition(C.node) & Node.DOCUMENT_POSITION_PRECEDING || v.node === C.node && v.offset > C.offset) {
                  [v, C] = [C, v];
                }
                if (v.node.compareDocumentPosition(this._rowElements[0]) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_FOLLOWING)) {
                  v = {
                    node: this._rowElements[0].childNodes[0],
                    offset: 0
                  };
                }
                if (!this._rowContainer.contains(v.node)) {
                  return;
                }
                const T = this._rowElements.slice(-1)[0];
                if (C.node.compareDocumentPosition(T) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_PRECEDING)) {
                  C = {
                    node: T,
                    offset: ((I = T.textContent) == null ? undefined : I.length) ?? 0
                  };
                }
                if (!this._rowContainer.contains(C.node)) {
                  return;
                }
                const A = ({
                  node: j,
                  offset: W
                }) => {
                  const z = j instanceof Text ? j.parentNode : j;
                  let N = parseInt(z == null ? undefined : z.getAttribute("aria-posinset"), 10) - 1;
                  if (isNaN(N)) {
                    console.warn("row is invalid. Race condition?");
                    return null;
                  }
                  const D = this._rowColumns.get(z);
                  if (!D) {
                    console.warn("columns is null. Race condition?");
                    return null;
                  }
                  let $ = W < D.length ? D[W] : D.slice(-1)[0] + 1;
                  if ($ >= this._terminal.cols) {
                    ++N;
                    $ = 0;
                  }
                  return {
                    row: N,
                    column: $
                  };
                };
                const M = A(v);
                const R = A(C);
                if (M && R) {
                  if (M.row > R.row || M.row === R.row && M.column >= R.column) {
                    throw new Error("invalid range");
                  }
                  this._terminal.select(M.column, M.row, (R.row - M.row) * this._terminal.cols - M.column + R.column);
                }
              }
              _handleResize(m) {
                this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
                for (let v = this._rowContainer.children.length; v < this._terminal.rows; v++) {
                  this._rowElements[v] = this._createAccessibilityTreeNode();
                  this._rowContainer.appendChild(this._rowElements[v]);
                }
                while (this._rowElements.length > m) {
                  this._rowContainer.removeChild(this._rowElements.pop());
                }
                this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener);
                this._refreshRowsDimensions();
              }
              _createAccessibilityTreeNode() {
                const m = this._coreBrowserService.mainDocument.createElement("div");
                m.setAttribute("role", "listitem");
                m.tabIndex = -1;
                this._refreshRowDimensions(m);
                return m;
              }
              _refreshRowsDimensions() {
                if (this._renderService.dimensions.css.cell.height) {
                  this._accessibilityContainer.style.width = `${this._renderService.dimensions.css.canvas.width}px`;
                  if (this._rowElements.length !== this._terminal.rows) {
                    this._handleResize(this._terminal.rows);
                  }
                  for (let m = 0; m < this._terminal.rows; m++) {
                    this._refreshRowDimensions(this._rowElements[m]);
                  }
                }
              }
              _refreshRowDimensions(m) {
                m.style.height = `${this._renderService.dimensions.css.cell.height}px`;
              }
            };
            a.AccessibilityManager = b = d([p(1, w.IInstantiationService), p(2, x.ICoreBrowserService), p(3, x.IRenderService)], b);
          },
          3614: (h, a) => {
            function c(S) {
              return S.replace(/\r?\n/g, "\r");
            }
            function d(S, _) {
              if (_) {
                return "[200~" + S + "[201~";
              } else {
                return S;
              }
            }
            function p(S, _, x, w) {
              S = d(S = c(S), x.decPrivateModes.bracketedPasteMode && w.rawOptions.ignoreBracketedPasteMode !== true);
              x.triggerDataEvent(S, true);
              _.value = "";
            }
            function f(S, _, x) {
              const w = x.getBoundingClientRect();
              const g = S.clientX - w.left - 10;
              const b = S.clientY - w.top - 10;
              _.style.width = "20px";
              _.style.height = "20px";
              _.style.left = `${g}px`;
              _.style.top = `${b}px`;
              _.style.zIndex = "1000";
              _.focus();
            }
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.rightClickHandler = a.moveTextAreaUnderMouseCursor = a.paste = a.handlePasteEvent = a.copyHandler = a.bracketTextForPaste = a.prepareTextForTerminal = undefined;
            a.prepareTextForTerminal = c;
            a.bracketTextForPaste = d;
            a.copyHandler = function (S, _) {
              if (S.clipboardData) {
                S.clipboardData.setData("text/plain", _.selectionText);
              }
              S.preventDefault();
            };
            a.handlePasteEvent = function (S, _, x, w) {
              S.stopPropagation();
              if (S.clipboardData) {
                p(S.clipboardData.getData("text/plain"), _, x, w);
              }
            };
            a.paste = p;
            a.moveTextAreaUnderMouseCursor = f;
            a.rightClickHandler = function (S, _, x, w, g) {
              f(S, _, x);
              if (g) {
                w.rightClickSelect(S);
              }
              _.value = w.selectionText;
              _.select();
            };
          },
          7239: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.ColorContrastCache = undefined;
            const d = c(1505);
            a.ColorContrastCache = class {
              constructor() {
                this._color = new d.TwoKeyMap();
                this._css = new d.TwoKeyMap();
              }
              setCss(p, f, S) {
                this._css.set(p, f, S);
              }
              getCss(p, f) {
                return this._css.get(p, f);
              }
              setColor(p, f, S) {
                this._color.set(p, f, S);
              }
              getColor(p, f) {
                return this._color.get(p, f);
              }
              clear() {
                this._color.clear();
                this._css.clear();
              }
            };
          },
          3656: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.addDisposableDomListener = undefined;
            a.addDisposableDomListener = function (c, d, p, f) {
              c.addEventListener(d, p, f);
              let S = false;
              return {
                dispose: () => {
                  if (!S) {
                    S = true;
                    c.removeEventListener(d, p, f);
                  }
                }
              };
            };
          },
          3551: function (h, a, c) {
            var d = this && this.__decorate || function (b, m, v, C) {
              var T;
              var A = arguments.length;
              var M = A < 3 ? m : C === null ? C = Object.getOwnPropertyDescriptor(m, v) : C;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                M = Reflect.decorate(b, m, v, C);
              } else {
                for (var R = b.length - 1; R >= 0; R--) {
                  if (T = b[R]) {
                    M = (A < 3 ? T(M) : A > 3 ? T(m, v, M) : T(m, v)) || M;
                  }
                }
              }
              if (A > 3 && M) {
                Object.defineProperty(m, v, M);
              }
              return M;
            };
            var p = this && this.__param || function (b, m) {
              return function (v, C) {
                m(v, C, b);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.Linkifier = undefined;
            const f = c(3656);
            const S = c(8460);
            const _ = c(844);
            const x = c(2585);
            const w = c(4725);
            let g = a.Linkifier = class extends _.Disposable {
              get currentLink() {
                return this._currentLink;
              }
              constructor(b, m, v, C, T) {
                super();
                this._element = b;
                this._mouseService = m;
                this._renderService = v;
                this._bufferService = C;
                this._linkProviderService = T;
                this._linkCacheDisposables = [];
                this._isMouseOut = true;
                this._wasResized = false;
                this._activeLine = -1;
                this._onShowLinkUnderline = this.register(new S.EventEmitter());
                this.onShowLinkUnderline = this._onShowLinkUnderline.event;
                this._onHideLinkUnderline = this.register(new S.EventEmitter());
                this.onHideLinkUnderline = this._onHideLinkUnderline.event;
                this.register((0, _.getDisposeArrayDisposable)(this._linkCacheDisposables));
                this.register((0, _.toDisposable)(() => {
                  var A;
                  this._lastMouseEvent = undefined;
                  if ((A = this._activeProviderReplies) != null) {
                    A.clear();
                  }
                }));
                this.register(this._bufferService.onResize(() => {
                  this._clearCurrentLink();
                  this._wasResized = true;
                }));
                this.register((0, f.addDisposableDomListener)(this._element, "mouseleave", () => {
                  this._isMouseOut = true;
                  this._clearCurrentLink();
                }));
                this.register((0, f.addDisposableDomListener)(this._element, "mousemove", this._handleMouseMove.bind(this)));
                this.register((0, f.addDisposableDomListener)(this._element, "mousedown", this._handleMouseDown.bind(this)));
                this.register((0, f.addDisposableDomListener)(this._element, "mouseup", this._handleMouseUp.bind(this)));
              }
              _handleMouseMove(b) {
                this._lastMouseEvent = b;
                const m = this._positionFromMouseEvent(b, this._element, this._mouseService);
                if (!m) {
                  return;
                }
                this._isMouseOut = false;
                const v = b.composedPath();
                for (let C = 0; C < v.length; C++) {
                  const T = v[C];
                  if (T.classList.contains("xterm")) {
                    break;
                  }
                  if (T.classList.contains("xterm-hover")) {
                    return;
                  }
                }
                if (!this._lastBufferCell || m.x !== this._lastBufferCell.x || m.y !== this._lastBufferCell.y) {
                  this._handleHover(m);
                  this._lastBufferCell = m;
                }
              }
              _handleHover(b) {
                if (this._activeLine !== b.y || this._wasResized) {
                  this._clearCurrentLink();
                  this._askForLink(b, false);
                  this._wasResized = false;
                  return;
                }
                if (!this._currentLink || !this._linkAtPosition(this._currentLink.link, b)) {
                  this._clearCurrentLink();
                  this._askForLink(b, true);
                }
              }
              _askForLink(b, m) {
                var C;
                var T;
                if (!this._activeProviderReplies || !m) {
                  if ((C = this._activeProviderReplies) != null) {
                    C.forEach(A => {
                      if (A != null) {
                        A.forEach(M => {
                          if (M.link.dispose) {
                            M.link.dispose();
                          }
                        });
                      }
                    });
                  }
                  this._activeProviderReplies = new Map();
                  this._activeLine = b.y;
                }
                let v = false;
                for (const [A, M] of this._linkProviderService.linkProviders.entries()) {
                  if (m) {
                    if ((T = this._activeProviderReplies) != null && T.get(A)) {
                      v = this._checkLinkProviderResult(A, b, v);
                    }
                  } else {
                    M.provideLinks(b.y, R => {
                      var j;
                      var W;
                      if (this._isMouseOut) {
                        return;
                      }
                      const I = R == null ? undefined : R.map(z => ({
                        link: z
                      }));
                      if ((j = this._activeProviderReplies) != null) {
                        j.set(A, I);
                      }
                      v = this._checkLinkProviderResult(A, b, v);
                      if (((W = this._activeProviderReplies) == null ? undefined : W.size) === this._linkProviderService.linkProviders.length) {
                        this._removeIntersectingLinks(b.y, this._activeProviderReplies);
                      }
                    });
                  }
                }
              }
              _removeIntersectingLinks(b, m) {
                const v = new Set();
                for (let C = 0; C < m.size; C++) {
                  const T = m.get(C);
                  if (T) {
                    for (let A = 0; A < T.length; A++) {
                      const M = T[A];
                      const R = M.link.range.start.y < b ? 0 : M.link.range.start.x;
                      const I = M.link.range.end.y > b ? this._bufferService.cols : M.link.range.end.x;
                      for (let j = R; j <= I; j++) {
                        if (v.has(j)) {
                          T.splice(A--, 1);
                          break;
                        }
                        v.add(j);
                      }
                    }
                  }
                }
              }
              _checkLinkProviderResult(b, m, v) {
                var A;
                if (!this._activeProviderReplies) {
                  return v;
                }
                const C = this._activeProviderReplies.get(b);
                let T = false;
                for (let M = 0; M < b; M++) {
                  if (!this._activeProviderReplies.has(M) || !!this._activeProviderReplies.get(M)) {
                    T = true;
                  }
                }
                if (!T && C) {
                  const M = C.find(R => this._linkAtPosition(R.link, m));
                  if (M) {
                    v = true;
                    this._handleNewLink(M);
                  }
                }
                if (this._activeProviderReplies.size === this._linkProviderService.linkProviders.length && !v) {
                  for (let M = 0; M < this._activeProviderReplies.size; M++) {
                    const R = (A = this._activeProviderReplies.get(M)) == null ? undefined : A.find(I => this._linkAtPosition(I.link, m));
                    if (R) {
                      v = true;
                      this._handleNewLink(R);
                      break;
                    }
                  }
                }
                return v;
              }
              _handleMouseDown() {
                this._mouseDownLink = this._currentLink;
              }
              _handleMouseUp(b) {
                if (!this._currentLink) {
                  return;
                }
                const m = this._positionFromMouseEvent(b, this._element, this._mouseService);
                if (m && this._mouseDownLink === this._currentLink && this._linkAtPosition(this._currentLink.link, m)) {
                  this._currentLink.link.activate(b, this._currentLink.link.text);
                }
              }
              _clearCurrentLink(b, m) {
                if (this._currentLink && this._lastMouseEvent && (!b || !m || this._currentLink.link.range.start.y >= b && this._currentLink.link.range.end.y <= m)) {
                  this._linkLeave(this._element, this._currentLink.link, this._lastMouseEvent);
                  this._currentLink = undefined;
                  (0, _.disposeArray)(this._linkCacheDisposables);
                }
              }
              _handleNewLink(b) {
                if (!this._lastMouseEvent) {
                  return;
                }
                const m = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
                if (m && this._linkAtPosition(b.link, m)) {
                  this._currentLink = b;
                  this._currentLink.state = {
                    decorations: {
                      underline: b.link.decorations === undefined || b.link.decorations.underline,
                      pointerCursor: b.link.decorations === undefined || b.link.decorations.pointerCursor
                    },
                    isHovered: true
                  };
                  this._linkHover(this._element, b.link, this._lastMouseEvent);
                  b.link.decorations = {};
                  Object.defineProperties(b.link.decorations, {
                    pointerCursor: {
                      get: () => {
                        var v;
                        var C;
                        if ((C = (v = this._currentLink) == null ? undefined : v.state) == null) {
                          return undefined;
                        } else {
                          return C.decorations.pointerCursor;
                        }
                      },
                      set: v => {
                        var C;
                        if ((C = this._currentLink) != null && C.state && this._currentLink.state.decorations.pointerCursor !== v) {
                          this._currentLink.state.decorations.pointerCursor = v;
                          if (this._currentLink.state.isHovered) {
                            this._element.classList.toggle("xterm-cursor-pointer", v);
                          }
                        }
                      }
                    },
                    underline: {
                      get: () => {
                        var v;
                        var C;
                        if ((C = (v = this._currentLink) == null ? undefined : v.state) == null) {
                          return undefined;
                        } else {
                          return C.decorations.underline;
                        }
                      },
                      set: v => {
                        var C;
                        var T;
                        var A;
                        if ((C = this._currentLink) != null && C.state && ((A = (T = this._currentLink) == null ? undefined : T.state) == null ? undefined : A.decorations.underline) !== v) {
                          this._currentLink.state.decorations.underline = v;
                          if (this._currentLink.state.isHovered) {
                            this._fireUnderlineEvent(b.link, v);
                          }
                        }
                      }
                    }
                  });
                  this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange(v => {
                    if (!this._currentLink) {
                      return;
                    }
                    const C = v.start === 0 ? 0 : v.start + 1 + this._bufferService.buffer.ydisp;
                    const T = this._bufferService.buffer.ydisp + 1 + v.end;
                    if (this._currentLink.link.range.start.y >= C && this._currentLink.link.range.end.y <= T && (this._clearCurrentLink(C, T), this._lastMouseEvent)) {
                      const A = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
                      if (A) {
                        this._askForLink(A, false);
                      }
                    }
                  }));
                }
              }
              _linkHover(b, m, v) {
                var C;
                if ((C = this._currentLink) != null && C.state) {
                  this._currentLink.state.isHovered = true;
                  if (this._currentLink.state.decorations.underline) {
                    this._fireUnderlineEvent(m, true);
                  }
                  if (this._currentLink.state.decorations.pointerCursor) {
                    b.classList.add("xterm-cursor-pointer");
                  }
                }
                if (m.hover) {
                  m.hover(v, m.text);
                }
              }
              _fireUnderlineEvent(b, m) {
                const v = b.range;
                const C = this._bufferService.buffer.ydisp;
                const T = this._createLinkUnderlineEvent(v.start.x - 1, v.start.y - C - 1, v.end.x, v.end.y - C - 1, undefined);
                (m ? this._onShowLinkUnderline : this._onHideLinkUnderline).fire(T);
              }
              _linkLeave(b, m, v) {
                var C;
                if ((C = this._currentLink) != null && C.state) {
                  this._currentLink.state.isHovered = false;
                  if (this._currentLink.state.decorations.underline) {
                    this._fireUnderlineEvent(m, false);
                  }
                  if (this._currentLink.state.decorations.pointerCursor) {
                    b.classList.remove("xterm-cursor-pointer");
                  }
                }
                if (m.leave) {
                  m.leave(v, m.text);
                }
              }
              _linkAtPosition(b, m) {
                const v = b.range.start.y * this._bufferService.cols + b.range.start.x;
                const C = b.range.end.y * this._bufferService.cols + b.range.end.x;
                const T = m.y * this._bufferService.cols + m.x;
                return v <= T && T <= C;
              }
              _positionFromMouseEvent(b, m, v) {
                const C = v.getCoords(b, m, this._bufferService.cols, this._bufferService.rows);
                if (C) {
                  return {
                    x: C[0],
                    y: C[1] + this._bufferService.buffer.ydisp
                  };
                }
              }
              _createLinkUnderlineEvent(b, m, v, C, T) {
                return {
                  x1: b,
                  y1: m,
                  x2: v,
                  y2: C,
                  cols: this._bufferService.cols,
                  fg: T
                };
              }
            };
            a.Linkifier = g = d([p(1, w.IMouseService), p(2, w.IRenderService), p(3, x.IBufferService), p(4, w.ILinkProviderService)], g);
          },
          9042: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.tooMuchOutput = a.promptLabel = undefined;
            a.promptLabel = "Terminal input";
            a.tooMuchOutput = "Too much output to announce, navigate to rows manually to read";
          },
          3730: function (h, a, c) {
            var d = this && this.__decorate || function (w, g, b, m) {
              var v;
              var C = arguments.length;
              var T = C < 3 ? g : m === null ? m = Object.getOwnPropertyDescriptor(g, b) : m;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                T = Reflect.decorate(w, g, b, m);
              } else {
                for (var A = w.length - 1; A >= 0; A--) {
                  if (v = w[A]) {
                    T = (C < 3 ? v(T) : C > 3 ? v(g, b, T) : v(g, b)) || T;
                  }
                }
              }
              if (C > 3 && T) {
                Object.defineProperty(g, b, T);
              }
              return T;
            };
            var p = this && this.__param || function (w, g) {
              return function (b, m) {
                g(b, m, w);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.OscLinkProvider = undefined;
            const f = c(511);
            const S = c(2585);
            let _ = a.OscLinkProvider = class {
              constructor(w, g, b) {
                this._bufferService = w;
                this._optionsService = g;
                this._oscLinkService = b;
              }
              provideLinks(w, g) {
                var I;
                const b = this._bufferService.buffer.lines.get(w - 1);
                if (!b) {
                  g(undefined);
                  return;
                }
                const m = [];
                const v = this._optionsService.rawOptions.linkHandler;
                const C = new f.CellData();
                const T = b.getTrimmedLength();
                let A = -1;
                let M = -1;
                let R = false;
                for (let j = 0; j < T; j++) {
                  if (M !== -1 || b.hasContent(j)) {
                    b.loadCell(j, C);
                    if (C.hasExtendedAttrs() && C.extended.urlId) {
                      if (M === -1) {
                        M = j;
                        A = C.extended.urlId;
                        continue;
                      }
                      R = C.extended.urlId !== A;
                    } else if (M !== -1) {
                      R = true;
                    }
                    if (R || M !== -1 && j === T - 1) {
                      const W = (I = this._oscLinkService.getLinkData(A)) == null ? undefined : I.uri;
                      if (W) {
                        const z = {
                          start: {
                            x: M + 1,
                            y: w
                          },
                          end: {
                            x: j + (R || j !== T - 1 ? 0 : 1),
                            y: w
                          }
                        };
                        let N = false;
                        if (v == null || !v.allowNonHttpProtocols) {
                          try {
                            const D = new URL(W);
                            if (!["http:", "https:"].includes(D.protocol)) {
                              N = true;
                            }
                          } catch {
                            N = true;
                          }
                        }
                        if (!N) {
                          m.push({
                            text: W,
                            range: z,
                            activate: (D, $) => v ? v.activate(D, $, z) : x(0, $),
                            hover: (D, $) => {
                              var G;
                              if ((G = v == null ? undefined : v.hover) == null) {
                                return undefined;
                              } else {
                                return G.call(v, D, $, z);
                              }
                            },
                            leave: (D, $) => {
                              var G;
                              if ((G = v == null ? undefined : v.leave) == null) {
                                return undefined;
                              } else {
                                return G.call(v, D, $, z);
                              }
                            }
                          });
                        }
                      }
                      R = false;
                      if (C.hasExtendedAttrs() && C.extended.urlId) {
                        M = j;
                        A = C.extended.urlId;
                      } else {
                        M = -1;
                        A = -1;
                      }
                    }
                  }
                }
                g(m);
              }
            };
            function x(w, g) {
              if (confirm(`Do you want to navigate to ${g}?

WARNING: This link could potentially be dangerous`)) {
                const b = window.open();
                if (b) {
                  try {
                    b.opener = null;
                  } catch {}
                  b.location.href = g;
                } else {
                  console.warn("Opening link blocked as opener could not be cleared");
                }
              }
            }
            a.OscLinkProvider = _ = d([p(0, S.IBufferService), p(1, S.IOptionsService), p(2, S.IOscLinkService)], _);
          },
          6193: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.RenderDebouncer = undefined;
            a.RenderDebouncer = class {
              constructor(c, d) {
                this._renderCallback = c;
                this._coreBrowserService = d;
                this._refreshCallbacks = [];
              }
              dispose() {
                if (this._animationFrame) {
                  this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame);
                  this._animationFrame = undefined;
                }
              }
              addRefreshCallback(c) {
                this._refreshCallbacks.push(c);
                this._animationFrame ||= this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh());
                return this._animationFrame;
              }
              refresh(c, d, p) {
                this._rowCount = p;
                c = c !== undefined ? c : 0;
                d = d !== undefined ? d : this._rowCount - 1;
                this._rowStart = this._rowStart !== undefined ? Math.min(this._rowStart, c) : c;
                this._rowEnd = this._rowEnd !== undefined ? Math.max(this._rowEnd, d) : d;
                this._animationFrame ||= this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh());
              }
              _innerRefresh() {
                this._animationFrame = undefined;
                if (this._rowStart === undefined || this._rowEnd === undefined || this._rowCount === undefined) {
                  this._runRefreshCallbacks();
                  return;
                }
                const c = Math.max(this._rowStart, 0);
                const d = Math.min(this._rowEnd, this._rowCount - 1);
                this._rowStart = undefined;
                this._rowEnd = undefined;
                this._renderCallback(c, d);
                this._runRefreshCallbacks();
              }
              _runRefreshCallbacks() {
                for (const c of this._refreshCallbacks) {
                  c(0);
                }
                this._refreshCallbacks = [];
              }
            };
          },
          3236: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.Terminal = undefined;
            const d = c(3614);
            const p = c(3656);
            const f = c(3551);
            const S = c(9042);
            const _ = c(3730);
            const x = c(1680);
            const w = c(3107);
            const g = c(5744);
            const b = c(2950);
            const m = c(1296);
            const v = c(428);
            const C = c(4269);
            const T = c(5114);
            const A = c(8934);
            const M = c(3230);
            const R = c(9312);
            const I = c(4725);
            const j = c(6731);
            const W = c(8055);
            const z = c(8969);
            const N = c(8460);
            const D = c(844);
            const $ = c(6114);
            const G = c(8437);
            const q = c(2584);
            const U = c(7399);
            const L = c(5941);
            const F = c(9074);
            const P = c(2585);
            const V = c(5435);
            const Z = c(4567);
            const J = c(779);
            class ne extends z.CoreTerminal {
              get onFocus() {
                return this._onFocus.event;
              }
              get onBlur() {
                return this._onBlur.event;
              }
              get onA11yChar() {
                return this._onA11yCharEmitter.event;
              }
              get onA11yTab() {
                return this._onA11yTabEmitter.event;
              }
              get onWillOpen() {
                return this._onWillOpen.event;
              }
              constructor(ee = {}) {
                super(ee);
                this.browser = $;
                this._keyDownHandled = false;
                this._keyDownSeen = false;
                this._keyPressHandled = false;
                this._unprocessedDeadKey = false;
                this._accessibilityManager = this.register(new D.MutableDisposable());
                this._onCursorMove = this.register(new N.EventEmitter());
                this.onCursorMove = this._onCursorMove.event;
                this._onKey = this.register(new N.EventEmitter());
                this.onKey = this._onKey.event;
                this._onRender = this.register(new N.EventEmitter());
                this.onRender = this._onRender.event;
                this._onSelectionChange = this.register(new N.EventEmitter());
                this.onSelectionChange = this._onSelectionChange.event;
                this._onTitleChange = this.register(new N.EventEmitter());
                this.onTitleChange = this._onTitleChange.event;
                this._onBell = this.register(new N.EventEmitter());
                this.onBell = this._onBell.event;
                this._onFocus = this.register(new N.EventEmitter());
                this._onBlur = this.register(new N.EventEmitter());
                this._onA11yCharEmitter = this.register(new N.EventEmitter());
                this._onA11yTabEmitter = this.register(new N.EventEmitter());
                this._onWillOpen = this.register(new N.EventEmitter());
                this._setup();
                this._decorationService = this._instantiationService.createInstance(F.DecorationService);
                this._instantiationService.setService(P.IDecorationService, this._decorationService);
                this._linkProviderService = this._instantiationService.createInstance(J.LinkProviderService);
                this._instantiationService.setService(I.ILinkProviderService, this._linkProviderService);
                this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(_.OscLinkProvider));
                this.register(this._inputHandler.onRequestBell(() => this._onBell.fire()));
                this.register(this._inputHandler.onRequestRefreshRows((Y, re) => this.refresh(Y, re)));
                this.register(this._inputHandler.onRequestSendFocus(() => this._reportFocus()));
                this.register(this._inputHandler.onRequestReset(() => this.reset()));
                this.register(this._inputHandler.onRequestWindowsOptionsReport(Y => this._reportWindowsOptions(Y)));
                this.register(this._inputHandler.onColor(Y => this._handleColorEvent(Y)));
                this.register((0, N.forwardEvent)(this._inputHandler.onCursorMove, this._onCursorMove));
                this.register((0, N.forwardEvent)(this._inputHandler.onTitleChange, this._onTitleChange));
                this.register((0, N.forwardEvent)(this._inputHandler.onA11yChar, this._onA11yCharEmitter));
                this.register((0, N.forwardEvent)(this._inputHandler.onA11yTab, this._onA11yTabEmitter));
                this.register(this._bufferService.onResize(Y => this._afterResize(Y.cols, Y.rows)));
                this.register((0, D.toDisposable)(() => {
                  var Y;
                  var re;
                  this._customKeyEventHandler = undefined;
                  if ((re = (Y = this.element) == null ? undefined : Y.parentNode) != null) {
                    re.removeChild(this.element);
                  }
                }));
              }
              _handleColorEvent(ee) {
                if (this._themeService) {
                  for (const Y of ee) {
                    let re;
                    let ce = "";
                    switch (Y.index) {
                      case 256:
                        re = "foreground";
                        ce = "10";
                        break;
                      case 257:
                        re = "background";
                        ce = "11";
                        break;
                      case 258:
                        re = "cursor";
                        ce = "12";
                        break;
                      default:
                        re = "ansi";
                        ce = "4;" + Y.index;
                    }
                    switch (Y.type) {
                      case 0:
                        const ge = W.color.toColorRGB(re === "ansi" ? this._themeService.colors.ansi[Y.index] : this._themeService.colors[re]);
                        this.coreService.triggerDataEvent(`${q.C0.ESC}]${ce};${(0, L.toRgbString)(ge)}${q.C1_ESCAPED.ST}`);
                        break;
                      case 1:
                        if (re === "ansi") {
                          this._themeService.modifyColors(de => de.ansi[Y.index] = W.channels.toColor(...Y.color));
                        } else {
                          const de = re;
                          this._themeService.modifyColors(me => me[de] = W.channels.toColor(...Y.color));
                        }
                        break;
                      case 2:
                        this._themeService.restoreColor(Y.index);
                    }
                  }
                }
              }
              _setup() {
                super._setup();
                this._customKeyEventHandler = undefined;
              }
              get buffer() {
                return this.buffers.active;
              }
              focus() {
                if (this.textarea) {
                  this.textarea.focus({
                    preventScroll: true
                  });
                }
              }
              _handleScreenReaderModeOptionChange(ee) {
                if (ee) {
                  if (!this._accessibilityManager.value && this._renderService) {
                    this._accessibilityManager.value = this._instantiationService.createInstance(Z.AccessibilityManager, this);
                  }
                } else {
                  this._accessibilityManager.clear();
                }
              }
              _handleTextAreaFocus(ee) {
                if (this.coreService.decPrivateModes.sendFocus) {
                  this.coreService.triggerDataEvent(q.C0.ESC + "[I");
                }
                this.element.classList.add("focus");
                this._showCursor();
                this._onFocus.fire();
              }
              blur() {
                var ee;
                if ((ee = this.textarea) == null) {
                  return undefined;
                } else {
                  return ee.blur();
                }
              }
              _handleTextAreaBlur() {
                this.textarea.value = "";
                this.refresh(this.buffer.y, this.buffer.y);
                if (this.coreService.decPrivateModes.sendFocus) {
                  this.coreService.triggerDataEvent(q.C0.ESC + "[O");
                }
                this.element.classList.remove("focus");
                this._onBlur.fire();
              }
              _syncTextArea() {
                if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService) {
                  return;
                }
                const ee = this.buffer.ybase + this.buffer.y;
                const Y = this.buffer.lines.get(ee);
                if (!Y) {
                  return;
                }
                const re = Math.min(this.buffer.x, this.cols - 1);
                const ce = this._renderService.dimensions.css.cell.height;
                const ge = Y.getWidth(re);
                const de = this._renderService.dimensions.css.cell.width * ge;
                const me = this.buffer.y * this._renderService.dimensions.css.cell.height;
                const H = re * this._renderService.dimensions.css.cell.width;
                this.textarea.style.left = H + "px";
                this.textarea.style.top = me + "px";
                this.textarea.style.width = de + "px";
                this.textarea.style.height = ce + "px";
                this.textarea.style.lineHeight = ce + "px";
                this.textarea.style.zIndex = "-5";
              }
              _initGlobal() {
                this._bindKeys();
                this.register((0, p.addDisposableDomListener)(this.element, "copy", Y => {
                  if (this.hasSelection()) {
                    (0, d.copyHandler)(Y, this._selectionService);
                  }
                }));
                const ee = Y => (0, d.handlePasteEvent)(Y, this.textarea, this.coreService, this.optionsService);
                this.register((0, p.addDisposableDomListener)(this.textarea, "paste", ee));
                this.register((0, p.addDisposableDomListener)(this.element, "paste", ee));
                if ($.isFirefox) {
                  this.register((0, p.addDisposableDomListener)(this.element, "mousedown", Y => {
                    if (Y.button === 2) {
                      (0, d.rightClickHandler)(Y, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
                    }
                  }));
                } else {
                  this.register((0, p.addDisposableDomListener)(this.element, "contextmenu", Y => {
                    (0, d.rightClickHandler)(Y, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
                  }));
                }
                if ($.isLinux) {
                  this.register((0, p.addDisposableDomListener)(this.element, "auxclick", Y => {
                    if (Y.button === 1) {
                      (0, d.moveTextAreaUnderMouseCursor)(Y, this.textarea, this.screenElement);
                    }
                  }));
                }
              }
              _bindKeys() {
                this.register((0, p.addDisposableDomListener)(this.textarea, "keyup", ee => this._keyUp(ee), true));
                this.register((0, p.addDisposableDomListener)(this.textarea, "keydown", ee => this._keyDown(ee), true));
                this.register((0, p.addDisposableDomListener)(this.textarea, "keypress", ee => this._keyPress(ee), true));
                this.register((0, p.addDisposableDomListener)(this.textarea, "compositionstart", () => this._compositionHelper.compositionstart()));
                this.register((0, p.addDisposableDomListener)(this.textarea, "compositionupdate", ee => this._compositionHelper.compositionupdate(ee)));
                this.register((0, p.addDisposableDomListener)(this.textarea, "compositionend", () => this._compositionHelper.compositionend()));
                this.register((0, p.addDisposableDomListener)(this.textarea, "input", ee => this._inputEvent(ee), true));
                this.register(this.onRender(() => this._compositionHelper.updateCompositionElements()));
              }
              open(ee) {
                var re;
                if (!ee) {
                  throw new Error("Terminal requires a parent element.");
                }
                if (!ee.isConnected) {
                  this._logService.debug("Terminal.open was called on an element that was not attached to the DOM");
                }
                if (((re = this.element) == null ? undefined : re.ownerDocument.defaultView) && this._coreBrowserService) {
                  if (this.element.ownerDocument.defaultView !== this._coreBrowserService.window) {
                    this._coreBrowserService.window = this.element.ownerDocument.defaultView;
                  }
                  return;
                }
                this._document = ee.ownerDocument;
                if (this.options.documentOverride && this.options.documentOverride instanceof Document) {
                  this._document = this.optionsService.rawOptions.documentOverride;
                }
                this.element = this._document.createElement("div");
                this.element.dir = "ltr";
                this.element.classList.add("terminal");
                this.element.classList.add("xterm");
                ee.appendChild(this.element);
                const Y = this._document.createDocumentFragment();
                this._viewportElement = this._document.createElement("div");
                this._viewportElement.classList.add("xterm-viewport");
                Y.appendChild(this._viewportElement);
                this._viewportScrollArea = this._document.createElement("div");
                this._viewportScrollArea.classList.add("xterm-scroll-area");
                this._viewportElement.appendChild(this._viewportScrollArea);
                this.screenElement = this._document.createElement("div");
                this.screenElement.classList.add("xterm-screen");
                this.register((0, p.addDisposableDomListener)(this.screenElement, "mousemove", ce => this.updateCursorStyle(ce)));
                this._helperContainer = this._document.createElement("div");
                this._helperContainer.classList.add("xterm-helpers");
                this.screenElement.appendChild(this._helperContainer);
                Y.appendChild(this.screenElement);
                this.textarea = this._document.createElement("textarea");
                this.textarea.classList.add("xterm-helper-textarea");
                this.textarea.setAttribute("aria-label", S.promptLabel);
                if (!$.isChromeOS) {
                  this.textarea.setAttribute("aria-multiline", "false");
                }
                this.textarea.setAttribute("autocorrect", "off");
                this.textarea.setAttribute("autocapitalize", "off");
                this.textarea.setAttribute("spellcheck", "false");
                this.textarea.tabIndex = 0;
                this._coreBrowserService = this.register(this._instantiationService.createInstance(T.CoreBrowserService, this.textarea, ee.ownerDocument.defaultView ?? window, this._document ?? typeof window !== "undefined" ? window.document : null));
                this._instantiationService.setService(I.ICoreBrowserService, this._coreBrowserService);
                this.register((0, p.addDisposableDomListener)(this.textarea, "focus", ce => this._handleTextAreaFocus(ce)));
                this.register((0, p.addDisposableDomListener)(this.textarea, "blur", () => this._handleTextAreaBlur()));
                this._helperContainer.appendChild(this.textarea);
                this._charSizeService = this._instantiationService.createInstance(v.CharSizeService, this._document, this._helperContainer);
                this._instantiationService.setService(I.ICharSizeService, this._charSizeService);
                this._themeService = this._instantiationService.createInstance(j.ThemeService);
                this._instantiationService.setService(I.IThemeService, this._themeService);
                this._characterJoinerService = this._instantiationService.createInstance(C.CharacterJoinerService);
                this._instantiationService.setService(I.ICharacterJoinerService, this._characterJoinerService);
                this._renderService = this.register(this._instantiationService.createInstance(M.RenderService, this.rows, this.screenElement));
                this._instantiationService.setService(I.IRenderService, this._renderService);
                this.register(this._renderService.onRenderedViewportChange(ce => this._onRender.fire(ce)));
                this.onResize(ce => this._renderService.resize(ce.cols, ce.rows));
                this._compositionView = this._document.createElement("div");
                this._compositionView.classList.add("composition-view");
                this._compositionHelper = this._instantiationService.createInstance(b.CompositionHelper, this.textarea, this._compositionView);
                this._helperContainer.appendChild(this._compositionView);
                this._mouseService = this._instantiationService.createInstance(A.MouseService);
                this._instantiationService.setService(I.IMouseService, this._mouseService);
                this.linkifier = this.register(this._instantiationService.createInstance(f.Linkifier, this.screenElement));
                this.element.appendChild(Y);
                try {
                  this._onWillOpen.fire(this.element);
                } catch {}
                if (!this._renderService.hasRenderer()) {
                  this._renderService.setRenderer(this._createRenderer());
                }
                this.viewport = this._instantiationService.createInstance(x.Viewport, this._viewportElement, this._viewportScrollArea);
                this.viewport.onRequestScrollLines(ce => this.scrollLines(ce.amount, ce.suppressScrollEvent, 1));
                this.register(this._inputHandler.onRequestSyncScrollBar(() => this.viewport.syncScrollArea()));
                this.register(this.viewport);
                this.register(this.onCursorMove(() => {
                  this._renderService.handleCursorMove();
                  this._syncTextArea();
                }));
                this.register(this.onResize(() => this._renderService.handleResize(this.cols, this.rows)));
                this.register(this.onBlur(() => this._renderService.handleBlur()));
                this.register(this.onFocus(() => this._renderService.handleFocus()));
                this.register(this._renderService.onDimensionsChange(() => this.viewport.syncScrollArea()));
                this._selectionService = this.register(this._instantiationService.createInstance(R.SelectionService, this.element, this.screenElement, this.linkifier));
                this._instantiationService.setService(I.ISelectionService, this._selectionService);
                this.register(this._selectionService.onRequestScrollLines(ce => this.scrollLines(ce.amount, ce.suppressScrollEvent)));
                this.register(this._selectionService.onSelectionChange(() => this._onSelectionChange.fire()));
                this.register(this._selectionService.onRequestRedraw(ce => this._renderService.handleSelectionChanged(ce.start, ce.end, ce.columnSelectMode)));
                this.register(this._selectionService.onLinuxMouseSelection(ce => {
                  this.textarea.value = ce;
                  this.textarea.focus();
                  this.textarea.select();
                }));
                this.register(this._onScroll.event(ce => {
                  this.viewport.syncScrollArea();
                  this._selectionService.refresh();
                }));
                this.register((0, p.addDisposableDomListener)(this._viewportElement, "scroll", () => this._selectionService.refresh()));
                this.register(this._instantiationService.createInstance(w.BufferDecorationRenderer, this.screenElement));
                this.register((0, p.addDisposableDomListener)(this.element, "mousedown", ce => this._selectionService.handleMouseDown(ce)));
                if (this.coreMouseService.areMouseEventsActive) {
                  this._selectionService.disable();
                  this.element.classList.add("enable-mouse-events");
                } else {
                  this._selectionService.enable();
                }
                if (this.options.screenReaderMode) {
                  this._accessibilityManager.value = this._instantiationService.createInstance(Z.AccessibilityManager, this);
                }
                this.register(this.optionsService.onSpecificOptionChange("screenReaderMode", ce => this._handleScreenReaderModeOptionChange(ce)));
                if (this.options.overviewRulerWidth) {
                  this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(g.OverviewRulerRenderer, this._viewportElement, this.screenElement));
                }
                this.optionsService.onSpecificOptionChange("overviewRulerWidth", ce => {
                  if (!this._overviewRulerRenderer && ce && this._viewportElement && this.screenElement) {
                    this._overviewRulerRenderer = this.register(this._instantiationService.createInstance(g.OverviewRulerRenderer, this._viewportElement, this.screenElement));
                  }
                });
                this._charSizeService.measure();
                this.refresh(0, this.rows - 1);
                this._initGlobal();
                this.bindMouse();
              }
              _createRenderer() {
                return this._instantiationService.createInstance(m.DomRenderer, this, this._document, this.element, this.screenElement, this._viewportElement, this._helperContainer, this.linkifier);
              }
              bindMouse() {
                const ee = this;
                const Y = this.element;
                function re(de) {
                  const me = ee._mouseService.getMouseReportCoords(de, ee.screenElement);
                  if (!me) {
                    return false;
                  }
                  let H;
                  let ae;
                  switch (de.overrideType || de.type) {
                    case "mousemove":
                      ae = 32;
                      if (de.buttons === undefined) {
                        H = 3;
                        if (de.button !== undefined) {
                          H = de.button < 3 ? de.button : 3;
                        }
                      } else {
                        H = de.buttons & 1 ? 0 : de.buttons & 4 ? 1 : de.buttons & 2 ? 2 : 3;
                      }
                      break;
                    case "mouseup":
                      ae = 0;
                      H = de.button < 3 ? de.button : 3;
                      break;
                    case "mousedown":
                      ae = 1;
                      H = de.button < 3 ? de.button : 3;
                      break;
                    case "wheel":
                      if (ee._customWheelEventHandler && ee._customWheelEventHandler(de) === false || ee.viewport.getLinesScrolled(de) === 0) {
                        return false;
                      }
                      ae = de.deltaY < 0 ? 0 : 1;
                      H = 4;
                      break;
                    default:
                      return false;
                  }
                  return ae !== undefined && H !== undefined && !(H > 4) && ee.coreMouseService.triggerMouseEvent({
                    col: me.col,
                    row: me.row,
                    x: me.x,
                    y: me.y,
                    button: H,
                    action: ae,
                    ctrl: de.ctrlKey,
                    alt: de.altKey,
                    shift: de.shiftKey
                  });
                }
                const ce = {
                  mouseup: null,
                  wheel: null,
                  mousedrag: null,
                  mousemove: null
                };
                const ge = {
                  mouseup: de => {
                    re(de);
                    if (!de.buttons) {
                      this._document.removeEventListener("mouseup", ce.mouseup);
                      if (ce.mousedrag) {
                        this._document.removeEventListener("mousemove", ce.mousedrag);
                      }
                    }
                    return this.cancel(de);
                  },
                  wheel: de => {
                    re(de);
                    return this.cancel(de, true);
                  },
                  mousedrag: de => {
                    if (de.buttons) {
                      re(de);
                    }
                  },
                  mousemove: de => {
                    if (!de.buttons) {
                      re(de);
                    }
                  }
                };
                this.register(this.coreMouseService.onProtocolChange(de => {
                  if (de) {
                    if (this.optionsService.rawOptions.logLevel === "debug") {
                      this._logService.debug("Binding to mouse events:", this.coreMouseService.explainEvents(de));
                    }
                    this.element.classList.add("enable-mouse-events");
                    this._selectionService.disable();
                  } else {
                    this._logService.debug("Unbinding from mouse events.");
                    this.element.classList.remove("enable-mouse-events");
                    this._selectionService.enable();
                  }
                  if (de & 8) {
                    if (!ce.mousemove) {
                      Y.addEventListener("mousemove", ge.mousemove);
                      ce.mousemove = ge.mousemove;
                    }
                  } else {
                    Y.removeEventListener("mousemove", ce.mousemove);
                    ce.mousemove = null;
                  }
                  if (de & 16) {
                    if (!ce.wheel) {
                      Y.addEventListener("wheel", ge.wheel, {
                        passive: false
                      });
                      ce.wheel = ge.wheel;
                    }
                  } else {
                    Y.removeEventListener("wheel", ce.wheel);
                    ce.wheel = null;
                  }
                  if (de & 2) {
                    ce.mouseup ||= ge.mouseup;
                  } else {
                    this._document.removeEventListener("mouseup", ce.mouseup);
                    ce.mouseup = null;
                  }
                  if (de & 4) {
                    ce.mousedrag ||= ge.mousedrag;
                  } else {
                    this._document.removeEventListener("mousemove", ce.mousedrag);
                    ce.mousedrag = null;
                  }
                }));
                this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol;
                this.register((0, p.addDisposableDomListener)(Y, "mousedown", de => {
                  de.preventDefault();
                  this.focus();
                  if (this.coreMouseService.areMouseEventsActive && !this._selectionService.shouldForceSelection(de)) {
                    re(de);
                    if (ce.mouseup) {
                      this._document.addEventListener("mouseup", ce.mouseup);
                    }
                    if (ce.mousedrag) {
                      this._document.addEventListener("mousemove", ce.mousedrag);
                    }
                    return this.cancel(de);
                  }
                }));
                this.register((0, p.addDisposableDomListener)(Y, "wheel", de => {
                  if (!ce.wheel) {
                    if (this._customWheelEventHandler && this._customWheelEventHandler(de) === false) {
                      return false;
                    }
                    if (!this.buffer.hasScrollback) {
                      const me = this.viewport.getLinesScrolled(de);
                      if (me === 0) {
                        return;
                      }
                      const H = q.C0.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? "O" : "[") + (de.deltaY < 0 ? "A" : "B");
                      let ae = "";
                      for (let oe = 0; oe < Math.abs(me); oe++) {
                        ae += H;
                      }
                      this.coreService.triggerDataEvent(ae, true);
                      return this.cancel(de, true);
                    }
                    if (this.viewport.handleWheel(de)) {
                      return this.cancel(de);
                    } else {
                      return undefined;
                    }
                  }
                }, {
                  passive: false
                }));
                this.register((0, p.addDisposableDomListener)(Y, "touchstart", de => {
                  if (!this.coreMouseService.areMouseEventsActive) {
                    this.viewport.handleTouchStart(de);
                    return this.cancel(de);
                  }
                }, {
                  passive: true
                }));
                this.register((0, p.addDisposableDomListener)(Y, "touchmove", de => {
                  if (!this.coreMouseService.areMouseEventsActive) {
                    if (this.viewport.handleTouchMove(de)) {
                      return undefined;
                    } else {
                      return this.cancel(de);
                    }
                  }
                }, {
                  passive: false
                }));
              }
              refresh(ee, Y) {
                var re;
                if ((re = this._renderService) != null) {
                  re.refreshRows(ee, Y);
                }
              }
              updateCursorStyle(ee) {
                var Y;
                if ((Y = this._selectionService) != null && Y.shouldColumnSelect(ee)) {
                  this.element.classList.add("column-select");
                } else {
                  this.element.classList.remove("column-select");
                }
              }
              _showCursor() {
                if (!this.coreService.isCursorInitialized) {
                  this.coreService.isCursorInitialized = true;
                  this.refresh(this.buffer.y, this.buffer.y);
                }
              }
              scrollLines(ee, Y, re = 0) {
                var ce;
                if (re === 1) {
                  super.scrollLines(ee, Y, re);
                  this.refresh(0, this.rows - 1);
                } else if ((ce = this.viewport) != null) {
                  ce.scrollLines(ee);
                }
              }
              paste(ee) {
                (0, d.paste)(ee, this.textarea, this.coreService, this.optionsService);
              }
              attachCustomKeyEventHandler(ee) {
                this._customKeyEventHandler = ee;
              }
              attachCustomWheelEventHandler(ee) {
                this._customWheelEventHandler = ee;
              }
              registerLinkProvider(ee) {
                return this._linkProviderService.registerLinkProvider(ee);
              }
              registerCharacterJoiner(ee) {
                if (!this._characterJoinerService) {
                  throw new Error("Terminal must be opened first");
                }
                const Y = this._characterJoinerService.register(ee);
                this.refresh(0, this.rows - 1);
                return Y;
              }
              deregisterCharacterJoiner(ee) {
                if (!this._characterJoinerService) {
                  throw new Error("Terminal must be opened first");
                }
                if (this._characterJoinerService.deregister(ee)) {
                  this.refresh(0, this.rows - 1);
                }
              }
              get markers() {
                return this.buffer.markers;
              }
              registerMarker(ee) {
                return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + ee);
              }
              registerDecoration(ee) {
                return this._decorationService.registerDecoration(ee);
              }
              hasSelection() {
                return !!this._selectionService && this._selectionService.hasSelection;
              }
              select(ee, Y, re) {
                this._selectionService.setSelection(ee, Y, re);
              }
              getSelection() {
                if (this._selectionService) {
                  return this._selectionService.selectionText;
                } else {
                  return "";
                }
              }
              getSelectionPosition() {
                if (this._selectionService && this._selectionService.hasSelection) {
                  return {
                    start: {
                      x: this._selectionService.selectionStart[0],
                      y: this._selectionService.selectionStart[1]
                    },
                    end: {
                      x: this._selectionService.selectionEnd[0],
                      y: this._selectionService.selectionEnd[1]
                    }
                  };
                }
              }
              clearSelection() {
                var ee;
                if ((ee = this._selectionService) != null) {
                  ee.clearSelection();
                }
              }
              selectAll() {
                var ee;
                if ((ee = this._selectionService) != null) {
                  ee.selectAll();
                }
              }
              selectLines(ee, Y) {
                var re;
                if ((re = this._selectionService) != null) {
                  re.selectLines(ee, Y);
                }
              }
              _keyDown(ee) {
                this._keyDownHandled = false;
                this._keyDownSeen = true;
                if (this._customKeyEventHandler && this._customKeyEventHandler(ee) === false) {
                  return false;
                }
                const Y = this.browser.isMac && this.options.macOptionIsMeta && ee.altKey;
                if (!Y && !this._compositionHelper.keydown(ee)) {
                  if (this.options.scrollOnUserInput && this.buffer.ybase !== this.buffer.ydisp) {
                    this.scrollToBottom();
                  }
                  return false;
                }
                if (!Y && (ee.key === "Dead" || ee.key === "AltGraph")) {
                  this._unprocessedDeadKey = true;
                }
                const re = (0, U.evaluateKeyboardEvent)(ee, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
                this.updateCursorStyle(ee);
                if (re.type === 3 || re.type === 2) {
                  const ce = this.rows - 1;
                  this.scrollLines(re.type === 2 ? -ce : ce);
                  return this.cancel(ee, true);
                }
                if (re.type === 1) {
                  this.selectAll();
                }
                return !!this._isThirdLevelShift(this.browser, ee) || (re.cancel && this.cancel(ee, true), !re.key || !!ee.key && !ee.ctrlKey && !ee.altKey && !ee.metaKey && ee.key.length === 1 && !!(ee.key.charCodeAt(0) >= 65) && !!(ee.key.charCodeAt(0) <= 90) || (this._unprocessedDeadKey ? (this._unprocessedDeadKey = false, true) : (re.key !== q.C0.ETX && re.key !== q.C0.CR || (this.textarea.value = ""), this._onKey.fire({
                  key: re.key,
                  domEvent: ee
                }), this._showCursor(), this.coreService.triggerDataEvent(re.key, true), !this.optionsService.rawOptions.screenReaderMode || ee.altKey || ee.ctrlKey ? this.cancel(ee, true) : void (this._keyDownHandled = true))));
              }
              _isThirdLevelShift(ee, Y) {
                const re = ee.isMac && !this.options.macOptionIsMeta && Y.altKey && !Y.ctrlKey && !Y.metaKey || ee.isWindows && Y.altKey && Y.ctrlKey && !Y.metaKey || ee.isWindows && Y.getModifierState("AltGraph");
                if (Y.type === "keypress") {
                  return re;
                } else {
                  return re && (!Y.keyCode || Y.keyCode > 47);
                }
              }
              _keyUp(ee) {
                this._keyDownSeen = false;
                if (!this._customKeyEventHandler || this._customKeyEventHandler(ee) !== false) {
                  if (!function (Y) {
                    return Y.keyCode === 16 || Y.keyCode === 17 || Y.keyCode === 18;
                  }(ee)) {
                    this.focus();
                  }
                  this.updateCursorStyle(ee);
                  this._keyPressHandled = false;
                }
              }
              _keyPress(ee) {
                let Y;
                this._keyPressHandled = false;
                if (this._keyDownHandled || this._customKeyEventHandler && this._customKeyEventHandler(ee) === false) {
                  return false;
                }
                this.cancel(ee);
                if (ee.charCode) {
                  Y = ee.charCode;
                } else if (ee.which === null || ee.which === undefined) {
                  Y = ee.keyCode;
                } else {
                  if (ee.which === 0 || ee.charCode === 0) {
                    return false;
                  }
                  Y = ee.which;
                }
                return !!Y && (!ee.altKey && !ee.ctrlKey && !ee.metaKey || !!this._isThirdLevelShift(this.browser, ee)) && !(Y = String.fromCharCode(Y), this._onKey.fire({
                  key: Y,
                  domEvent: ee
                }), this._showCursor(), this.coreService.triggerDataEvent(Y, true), this._keyPressHandled = true, this._unprocessedDeadKey = false, 0);
              }
              _inputEvent(ee) {
                if (ee.data && ee.inputType === "insertText" && (!ee.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
                  if (this._keyPressHandled) {
                    return false;
                  }
                  this._unprocessedDeadKey = false;
                  const Y = ee.data;
                  this.coreService.triggerDataEvent(Y, true);
                  this.cancel(ee);
                  return true;
                }
                return false;
              }
              resize(ee, Y) {
                if (ee !== this.cols || Y !== this.rows) {
                  super.resize(ee, Y);
                } else if (this._charSizeService && !this._charSizeService.hasValidSize) {
                  this._charSizeService.measure();
                }
              }
              _afterResize(ee, Y) {
                var re;
                var ce;
                if ((re = this._charSizeService) != null) {
                  re.measure();
                }
                if ((ce = this.viewport) != null) {
                  ce.syncScrollArea(true);
                }
              }
              clear() {
                var ee;
                if (this.buffer.ybase !== 0 || this.buffer.y !== 0) {
                  this.buffer.clearAllMarkers();
                  this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y));
                  this.buffer.lines.length = 1;
                  this.buffer.ydisp = 0;
                  this.buffer.ybase = 0;
                  this.buffer.y = 0;
                  for (let Y = 1; Y < this.rows; Y++) {
                    this.buffer.lines.push(this.buffer.getBlankLine(G.DEFAULT_ATTR_DATA));
                  }
                  this._onScroll.fire({
                    position: this.buffer.ydisp,
                    source: 0
                  });
                  if ((ee = this.viewport) != null) {
                    ee.reset();
                  }
                  this.refresh(0, this.rows - 1);
                }
              }
              reset() {
                var Y;
                var re;
                this.options.rows = this.rows;
                this.options.cols = this.cols;
                const ee = this._customKeyEventHandler;
                this._setup();
                super.reset();
                if ((Y = this._selectionService) != null) {
                  Y.reset();
                }
                this._decorationService.reset();
                if ((re = this.viewport) != null) {
                  re.reset();
                }
                this._customKeyEventHandler = ee;
                this.refresh(0, this.rows - 1);
              }
              clearTextureAtlas() {
                var ee;
                if ((ee = this._renderService) != null) {
                  ee.clearTextureAtlas();
                }
              }
              _reportFocus() {
                var ee;
                if ((ee = this.element) != null && ee.classList.contains("focus")) {
                  this.coreService.triggerDataEvent(q.C0.ESC + "[I");
                } else {
                  this.coreService.triggerDataEvent(q.C0.ESC + "[O");
                }
              }
              _reportWindowsOptions(ee) {
                if (this._renderService) {
                  switch (ee) {
                    case V.WindowsOptionsReportType.GET_WIN_SIZE_PIXELS:
                      const Y = this._renderService.dimensions.css.canvas.width.toFixed(0);
                      const re = this._renderService.dimensions.css.canvas.height.toFixed(0);
                      this.coreService.triggerDataEvent(`${q.C0.ESC}[4;${re};${Y}t`);
                      break;
                    case V.WindowsOptionsReportType.GET_CELL_SIZE_PIXELS:
                      const ce = this._renderService.dimensions.css.cell.width.toFixed(0);
                      const ge = this._renderService.dimensions.css.cell.height.toFixed(0);
                      this.coreService.triggerDataEvent(`${q.C0.ESC}[6;${ge};${ce}t`);
                  }
                }
              }
              cancel(ee, Y) {
                if (this.options.cancelEvents || Y) {
                  ee.preventDefault();
                  ee.stopPropagation();
                  return false;
                }
              }
            }
            a.Terminal = ne;
          },
          9924: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.TimeBasedDebouncer = undefined;
            a.TimeBasedDebouncer = class {
              constructor(c, d = 1000) {
                this._renderCallback = c;
                this._debounceThresholdMS = d;
                this._lastRefreshMs = 0;
                this._additionalRefreshRequested = false;
              }
              dispose() {
                if (this._refreshTimeoutID) {
                  clearTimeout(this._refreshTimeoutID);
                }
              }
              refresh(c, d, p) {
                this._rowCount = p;
                c = c !== undefined ? c : 0;
                d = d !== undefined ? d : this._rowCount - 1;
                this._rowStart = this._rowStart !== undefined ? Math.min(this._rowStart, c) : c;
                this._rowEnd = this._rowEnd !== undefined ? Math.max(this._rowEnd, d) : d;
                const f = Date.now();
                if (f - this._lastRefreshMs >= this._debounceThresholdMS) {
                  this._lastRefreshMs = f;
                  this._innerRefresh();
                } else if (!this._additionalRefreshRequested) {
                  const S = f - this._lastRefreshMs;
                  const _ = this._debounceThresholdMS - S;
                  this._additionalRefreshRequested = true;
                  this._refreshTimeoutID = window.setTimeout(() => {
                    this._lastRefreshMs = Date.now();
                    this._innerRefresh();
                    this._additionalRefreshRequested = false;
                    this._refreshTimeoutID = undefined;
                  }, _);
                }
              }
              _innerRefresh() {
                if (this._rowStart === undefined || this._rowEnd === undefined || this._rowCount === undefined) {
                  return;
                }
                const c = Math.max(this._rowStart, 0);
                const d = Math.min(this._rowEnd, this._rowCount - 1);
                this._rowStart = undefined;
                this._rowEnd = undefined;
                this._renderCallback(c, d);
              }
            };
          },
          1680: function (h, a, c) {
            var d = this && this.__decorate || function (b, m, v, C) {
              var T;
              var A = arguments.length;
              var M = A < 3 ? m : C === null ? C = Object.getOwnPropertyDescriptor(m, v) : C;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                M = Reflect.decorate(b, m, v, C);
              } else {
                for (var R = b.length - 1; R >= 0; R--) {
                  if (T = b[R]) {
                    M = (A < 3 ? T(M) : A > 3 ? T(m, v, M) : T(m, v)) || M;
                  }
                }
              }
              if (A > 3 && M) {
                Object.defineProperty(m, v, M);
              }
              return M;
            };
            var p = this && this.__param || function (b, m) {
              return function (v, C) {
                m(v, C, b);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.Viewport = undefined;
            const f = c(3656);
            const S = c(4725);
            const _ = c(8460);
            const x = c(844);
            const w = c(2585);
            let g = a.Viewport = class extends x.Disposable {
              constructor(b, m, v, C, T, A, M, R) {
                super();
                this._viewportElement = b;
                this._scrollArea = m;
                this._bufferService = v;
                this._optionsService = C;
                this._charSizeService = T;
                this._renderService = A;
                this._coreBrowserService = M;
                this.scrollBarWidth = 0;
                this._currentRowHeight = 0;
                this._currentDeviceCellHeight = 0;
                this._lastRecordedBufferLength = 0;
                this._lastRecordedViewportHeight = 0;
                this._lastRecordedBufferHeight = 0;
                this._lastTouchY = 0;
                this._lastScrollTop = 0;
                this._wheelPartialScroll = 0;
                this._refreshAnimationFrame = null;
                this._ignoreNextScrollEvent = false;
                this._smoothScrollState = {
                  startTime: 0,
                  origin: -1,
                  target: -1
                };
                this._onRequestScrollLines = this.register(new _.EventEmitter());
                this.onRequestScrollLines = this._onRequestScrollLines.event;
                this.scrollBarWidth = this._viewportElement.offsetWidth - this._scrollArea.offsetWidth || 15;
                this.register((0, f.addDisposableDomListener)(this._viewportElement, "scroll", this._handleScroll.bind(this)));
                this._activeBuffer = this._bufferService.buffer;
                this.register(this._bufferService.buffers.onBufferActivate(I => this._activeBuffer = I.activeBuffer));
                this._renderDimensions = this._renderService.dimensions;
                this.register(this._renderService.onDimensionsChange(I => this._renderDimensions = I));
                this._handleThemeChange(R.colors);
                this.register(R.onChangeColors(I => this._handleThemeChange(I)));
                this.register(this._optionsService.onSpecificOptionChange("scrollback", () => this.syncScrollArea()));
                setTimeout(() => this.syncScrollArea());
              }
              _handleThemeChange(b) {
                this._viewportElement.style.backgroundColor = b.background.css;
              }
              reset() {
                this._currentRowHeight = 0;
                this._currentDeviceCellHeight = 0;
                this._lastRecordedBufferLength = 0;
                this._lastRecordedViewportHeight = 0;
                this._lastRecordedBufferHeight = 0;
                this._lastTouchY = 0;
                this._lastScrollTop = 0;
                this._coreBrowserService.window.requestAnimationFrame(() => this.syncScrollArea());
              }
              _refresh(b) {
                if (b) {
                  this._innerRefresh();
                  if (this._refreshAnimationFrame !== null) {
                    this._coreBrowserService.window.cancelAnimationFrame(this._refreshAnimationFrame);
                  }
                  return;
                }
                if (this._refreshAnimationFrame === null) {
                  this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh());
                }
              }
              _innerRefresh() {
                if (this._charSizeService.height > 0) {
                  this._currentRowHeight = this._renderDimensions.device.cell.height / this._coreBrowserService.dpr;
                  this._currentDeviceCellHeight = this._renderDimensions.device.cell.height;
                  this._lastRecordedViewportHeight = this._viewportElement.offsetHeight;
                  const m = Math.round(this._currentRowHeight * this._lastRecordedBufferLength) + (this._lastRecordedViewportHeight - this._renderDimensions.css.canvas.height);
                  if (this._lastRecordedBufferHeight !== m) {
                    this._lastRecordedBufferHeight = m;
                    this._scrollArea.style.height = this._lastRecordedBufferHeight + "px";
                  }
                }
                const b = this._bufferService.buffer.ydisp * this._currentRowHeight;
                if (this._viewportElement.scrollTop !== b) {
                  this._ignoreNextScrollEvent = true;
                  this._viewportElement.scrollTop = b;
                }
                this._refreshAnimationFrame = null;
              }
              syncScrollArea(b = false) {
                if (this._lastRecordedBufferLength !== this._bufferService.buffer.lines.length) {
                  this._lastRecordedBufferLength = this._bufferService.buffer.lines.length;
                  this._refresh(b);
                  return;
                }
                if (this._lastRecordedViewportHeight !== this._renderService.dimensions.css.canvas.height || this._lastScrollTop !== this._activeBuffer.ydisp * this._currentRowHeight || this._renderDimensions.device.cell.height !== this._currentDeviceCellHeight) {
                  this._refresh(b);
                }
              }
              _handleScroll(b) {
                this._lastScrollTop = this._viewportElement.scrollTop;
                if (!this._viewportElement.offsetParent) {
                  return;
                }
                if (this._ignoreNextScrollEvent) {
                  this._ignoreNextScrollEvent = false;
                  this._onRequestScrollLines.fire({
                    amount: 0,
                    suppressScrollEvent: true
                  });
                  return;
                }
                const m = Math.round(this._lastScrollTop / this._currentRowHeight) - this._bufferService.buffer.ydisp;
                this._onRequestScrollLines.fire({
                  amount: m,
                  suppressScrollEvent: true
                });
              }
              _smoothScroll() {
                if (this._isDisposed || this._smoothScrollState.origin === -1 || this._smoothScrollState.target === -1) {
                  return;
                }
                const b = this._smoothScrollPercent();
                this._viewportElement.scrollTop = this._smoothScrollState.origin + Math.round(b * (this._smoothScrollState.target - this._smoothScrollState.origin));
                if (b < 1) {
                  this._coreBrowserService.window.requestAnimationFrame(() => this._smoothScroll());
                } else {
                  this._clearSmoothScrollState();
                }
              }
              _smoothScrollPercent() {
                if (this._optionsService.rawOptions.smoothScrollDuration && this._smoothScrollState.startTime) {
                  return Math.max(Math.min((Date.now() - this._smoothScrollState.startTime) / this._optionsService.rawOptions.smoothScrollDuration, 1), 0);
                } else {
                  return 1;
                }
              }
              _clearSmoothScrollState() {
                this._smoothScrollState.startTime = 0;
                this._smoothScrollState.origin = -1;
                this._smoothScrollState.target = -1;
              }
              _bubbleScroll(b, m) {
                const v = this._viewportElement.scrollTop + this._lastRecordedViewportHeight;
                return (!(m < 0) || this._viewportElement.scrollTop === 0) && (!(m > 0) || !(v < this._lastRecordedBufferHeight)) || (b.cancelable && b.preventDefault(), false);
              }
              handleWheel(b) {
                const m = this._getPixelsScrolled(b);
                return m !== 0 && (this._optionsService.rawOptions.smoothScrollDuration ? (this._smoothScrollState.startTime = Date.now(), this._smoothScrollPercent() < 1 ? (this._smoothScrollState.origin = this._viewportElement.scrollTop, this._smoothScrollState.target === -1 ? this._smoothScrollState.target = this._viewportElement.scrollTop + m : this._smoothScrollState.target += m, this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0), this._smoothScroll()) : this._clearSmoothScrollState()) : this._viewportElement.scrollTop += m, this._bubbleScroll(b, m));
              }
              scrollLines(b) {
                if (b !== 0) {
                  if (this._optionsService.rawOptions.smoothScrollDuration) {
                    const m = b * this._currentRowHeight;
                    this._smoothScrollState.startTime = Date.now();
                    if (this._smoothScrollPercent() < 1) {
                      this._smoothScrollState.origin = this._viewportElement.scrollTop;
                      this._smoothScrollState.target = this._smoothScrollState.origin + m;
                      this._smoothScrollState.target = Math.max(Math.min(this._smoothScrollState.target, this._viewportElement.scrollHeight), 0);
                      this._smoothScroll();
                    } else {
                      this._clearSmoothScrollState();
                    }
                  } else {
                    this._onRequestScrollLines.fire({
                      amount: b,
                      suppressScrollEvent: false
                    });
                  }
                }
              }
              _getPixelsScrolled(b) {
                if (b.deltaY === 0 || b.shiftKey) {
                  return 0;
                }
                let m = this._applyScrollModifier(b.deltaY, b);
                if (b.deltaMode === WheelEvent.DOM_DELTA_LINE) {
                  m *= this._currentRowHeight;
                } else if (b.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
                  m *= this._currentRowHeight * this._bufferService.rows;
                }
                return m;
              }
              getBufferElements(b, m) {
                var R;
                let v;
                let C = "";
                const T = [];
                const A = m ?? this._bufferService.buffer.lines.length;
                const M = this._bufferService.buffer.lines;
                for (let I = b; I < A; I++) {
                  const j = M.get(I);
                  if (!j) {
                    continue;
                  }
                  const W = (R = M.get(I + 1)) == null ? undefined : R.isWrapped;
                  C += j.translateToString(!W);
                  if (!W || I === M.length - 1) {
                    const z = document.createElement("div");
                    z.textContent = C;
                    T.push(z);
                    if (C.length > 0) {
                      v = z;
                    }
                    C = "";
                  }
                }
                return {
                  bufferElements: T,
                  cursorElement: v
                };
              }
              getLinesScrolled(b) {
                if (b.deltaY === 0 || b.shiftKey) {
                  return 0;
                }
                let m = this._applyScrollModifier(b.deltaY, b);
                if (b.deltaMode === WheelEvent.DOM_DELTA_PIXEL) {
                  m /= this._currentRowHeight + 0;
                  this._wheelPartialScroll += m;
                  m = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1);
                  this._wheelPartialScroll %= 1;
                } else if (b.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
                  m *= this._bufferService.rows;
                }
                return m;
              }
              _applyScrollModifier(b, m) {
                const v = this._optionsService.rawOptions.fastScrollModifier;
                if (v === "alt" && m.altKey || v === "ctrl" && m.ctrlKey || v === "shift" && m.shiftKey) {
                  return b * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity;
                } else {
                  return b * this._optionsService.rawOptions.scrollSensitivity;
                }
              }
              handleTouchStart(b) {
                this._lastTouchY = b.touches[0].pageY;
              }
              handleTouchMove(b) {
                const m = this._lastTouchY - b.touches[0].pageY;
                this._lastTouchY = b.touches[0].pageY;
                return m !== 0 && (this._viewportElement.scrollTop += m, this._bubbleScroll(b, m));
              }
            };
            a.Viewport = g = d([p(2, w.IBufferService), p(3, w.IOptionsService), p(4, S.ICharSizeService), p(5, S.IRenderService), p(6, S.ICoreBrowserService), p(7, S.IThemeService)], g);
          },
          3107: function (h, a, c) {
            var d = this && this.__decorate || function (w, g, b, m) {
              var v;
              var C = arguments.length;
              var T = C < 3 ? g : m === null ? m = Object.getOwnPropertyDescriptor(g, b) : m;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                T = Reflect.decorate(w, g, b, m);
              } else {
                for (var A = w.length - 1; A >= 0; A--) {
                  if (v = w[A]) {
                    T = (C < 3 ? v(T) : C > 3 ? v(g, b, T) : v(g, b)) || T;
                  }
                }
              }
              if (C > 3 && T) {
                Object.defineProperty(g, b, T);
              }
              return T;
            };
            var p = this && this.__param || function (w, g) {
              return function (b, m) {
                g(b, m, w);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.BufferDecorationRenderer = undefined;
            const f = c(4725);
            const S = c(844);
            const _ = c(2585);
            let x = a.BufferDecorationRenderer = class extends S.Disposable {
              constructor(w, g, b, m, v) {
                super();
                this._screenElement = w;
                this._bufferService = g;
                this._coreBrowserService = b;
                this._decorationService = m;
                this._renderService = v;
                this._decorationElements = new Map();
                this._altBufferIsActive = false;
                this._dimensionsChanged = false;
                this._container = document.createElement("div");
                this._container.classList.add("xterm-decoration-container");
                this._screenElement.appendChild(this._container);
                this.register(this._renderService.onRenderedViewportChange(() => this._doRefreshDecorations()));
                this.register(this._renderService.onDimensionsChange(() => {
                  this._dimensionsChanged = true;
                  this._queueRefresh();
                }));
                this.register(this._coreBrowserService.onDprChange(() => this._queueRefresh()));
                this.register(this._bufferService.buffers.onBufferActivate(() => {
                  this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
                }));
                this.register(this._decorationService.onDecorationRegistered(() => this._queueRefresh()));
                this.register(this._decorationService.onDecorationRemoved(C => this._removeDecoration(C)));
                this.register((0, S.toDisposable)(() => {
                  this._container.remove();
                  this._decorationElements.clear();
                }));
              }
              _queueRefresh() {
                if (this._animationFrame === undefined) {
                  this._animationFrame = this._renderService.addRefreshCallback(() => {
                    this._doRefreshDecorations();
                    this._animationFrame = undefined;
                  });
                }
              }
              _doRefreshDecorations() {
                for (const w of this._decorationService.decorations) {
                  this._renderDecoration(w);
                }
                this._dimensionsChanged = false;
              }
              _renderDecoration(w) {
                this._refreshStyle(w);
                if (this._dimensionsChanged) {
                  this._refreshXPosition(w);
                }
              }
              _createElement(w) {
                var m;
                const g = this._coreBrowserService.mainDocument.createElement("div");
                g.classList.add("xterm-decoration");
                g.classList.toggle("xterm-decoration-top-layer", ((m = w == null ? undefined : w.options) == null ? undefined : m.layer) === "top");
                g.style.width = `${Math.round((w.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`;
                g.style.height = (w.options.height || 1) * this._renderService.dimensions.css.cell.height + "px";
                g.style.top = (w.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.css.cell.height + "px";
                g.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`;
                const b = w.options.x ?? 0;
                if (b && b > this._bufferService.cols) {
                  g.style.display = "none";
                }
                this._refreshXPosition(w, g);
                return g;
              }
              _refreshStyle(w) {
                const g = w.marker.line - this._bufferService.buffers.active.ydisp;
                if (g < 0 || g >= this._bufferService.rows) {
                  if (w.element) {
                    w.element.style.display = "none";
                    w.onRenderEmitter.fire(w.element);
                  }
                } else {
                  let b = this._decorationElements.get(w);
                  if (!b) {
                    b = this._createElement(w);
                    w.element = b;
                    this._decorationElements.set(w, b);
                    this._container.appendChild(b);
                    w.onDispose(() => {
                      this._decorationElements.delete(w);
                      b.remove();
                    });
                  }
                  b.style.top = g * this._renderService.dimensions.css.cell.height + "px";
                  b.style.display = this._altBufferIsActive ? "none" : "block";
                  w.onRenderEmitter.fire(b);
                }
              }
              _refreshXPosition(w, g = w.element) {
                if (!g) {
                  return;
                }
                const b = w.options.x ?? 0;
                if ((w.options.anchor || "left") === "right") {
                  g.style.right = b ? b * this._renderService.dimensions.css.cell.width + "px" : "";
                } else {
                  g.style.left = b ? b * this._renderService.dimensions.css.cell.width + "px" : "";
                }
              }
              _removeDecoration(w) {
                var g;
                if ((g = this._decorationElements.get(w)) != null) {
                  g.remove();
                }
                this._decorationElements.delete(w);
                w.dispose();
              }
            };
            a.BufferDecorationRenderer = x = d([p(1, _.IBufferService), p(2, f.ICoreBrowserService), p(3, _.IDecorationService), p(4, f.IRenderService)], x);
          },
          5871: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.ColorZoneStore = undefined;
            a.ColorZoneStore = class {
              constructor() {
                this._zones = [];
                this._zonePool = [];
                this._zonePoolIndex = 0;
                this._linePadding = {
                  full: 0,
                  left: 0,
                  center: 0,
                  right: 0
                };
              }
              get zones() {
                this._zonePool.length = Math.min(this._zonePool.length, this._zones.length);
                return this._zones;
              }
              clear() {
                this._zones.length = 0;
                this._zonePoolIndex = 0;
              }
              addDecoration(c) {
                if (c.options.overviewRulerOptions) {
                  for (const d of this._zones) {
                    if (d.color === c.options.overviewRulerOptions.color && d.position === c.options.overviewRulerOptions.position) {
                      if (this._lineIntersectsZone(d, c.marker.line)) {
                        return;
                      }
                      if (this._lineAdjacentToZone(d, c.marker.line, c.options.overviewRulerOptions.position)) {
                        this._addLineToZone(d, c.marker.line);
                        return;
                      }
                    }
                  }
                  if (this._zonePoolIndex < this._zonePool.length) {
                    this._zonePool[this._zonePoolIndex].color = c.options.overviewRulerOptions.color;
                    this._zonePool[this._zonePoolIndex].position = c.options.overviewRulerOptions.position;
                    this._zonePool[this._zonePoolIndex].startBufferLine = c.marker.line;
                    this._zonePool[this._zonePoolIndex].endBufferLine = c.marker.line;
                    this._zones.push(this._zonePool[this._zonePoolIndex++]);
                    return;
                  }
                  this._zones.push({
                    color: c.options.overviewRulerOptions.color,
                    position: c.options.overviewRulerOptions.position,
                    startBufferLine: c.marker.line,
                    endBufferLine: c.marker.line
                  });
                  this._zonePool.push(this._zones[this._zones.length - 1]);
                  this._zonePoolIndex++;
                }
              }
              setPadding(c) {
                this._linePadding = c;
              }
              _lineIntersectsZone(c, d) {
                return d >= c.startBufferLine && d <= c.endBufferLine;
              }
              _lineAdjacentToZone(c, d, p) {
                return d >= c.startBufferLine - this._linePadding[p || "full"] && d <= c.endBufferLine + this._linePadding[p || "full"];
              }
              _addLineToZone(c, d) {
                c.startBufferLine = Math.min(c.startBufferLine, d);
                c.endBufferLine = Math.max(c.endBufferLine, d);
              }
            };
          },
          5744: function (h, a, c) {
            var d = this && this.__decorate || function (v, C, T, A) {
              var M;
              var R = arguments.length;
              var I = R < 3 ? C : A === null ? A = Object.getOwnPropertyDescriptor(C, T) : A;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                I = Reflect.decorate(v, C, T, A);
              } else {
                for (var j = v.length - 1; j >= 0; j--) {
                  if (M = v[j]) {
                    I = (R < 3 ? M(I) : R > 3 ? M(C, T, I) : M(C, T)) || I;
                  }
                }
              }
              if (R > 3 && I) {
                Object.defineProperty(C, T, I);
              }
              return I;
            };
            var p = this && this.__param || function (v, C) {
              return function (T, A) {
                C(T, A, v);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.OverviewRulerRenderer = undefined;
            const f = c(5871);
            const S = c(4725);
            const _ = c(844);
            const x = c(2585);
            const w = {
              full: 0,
              left: 0,
              center: 0,
              right: 0
            };
            const g = {
              full: 0,
              left: 0,
              center: 0,
              right: 0
            };
            const b = {
              full: 0,
              left: 0,
              center: 0,
              right: 0
            };
            let m = a.OverviewRulerRenderer = class extends _.Disposable {
              get _width() {
                return this._optionsService.options.overviewRulerWidth || 0;
              }
              constructor(v, C, T, A, M, R, I) {
                var W;
                super();
                this._viewportElement = v;
                this._screenElement = C;
                this._bufferService = T;
                this._decorationService = A;
                this._renderService = M;
                this._optionsService = R;
                this._coreBrowserService = I;
                this._colorZoneStore = new f.ColorZoneStore();
                this._shouldUpdateDimensions = true;
                this._shouldUpdateAnchor = true;
                this._lastKnownBufferLength = 0;
                this._canvas = this._coreBrowserService.mainDocument.createElement("canvas");
                this._canvas.classList.add("xterm-decoration-overview-ruler");
                this._refreshCanvasDimensions();
                if ((W = this._viewportElement.parentElement) != null) {
                  W.insertBefore(this._canvas, this._viewportElement);
                }
                const j = this._canvas.getContext("2d");
                if (!j) {
                  throw new Error("Ctx cannot be null");
                }
                this._ctx = j;
                this._registerDecorationListeners();
                this._registerBufferChangeListeners();
                this._registerDimensionChangeListeners();
                this.register((0, _.toDisposable)(() => {
                  var z;
                  if ((z = this._canvas) != null) {
                    z.remove();
                  }
                }));
              }
              _registerDecorationListeners() {
                this.register(this._decorationService.onDecorationRegistered(() => this._queueRefresh(undefined, true)));
                this.register(this._decorationService.onDecorationRemoved(() => this._queueRefresh(undefined, true)));
              }
              _registerBufferChangeListeners() {
                this.register(this._renderService.onRenderedViewportChange(() => this._queueRefresh()));
                this.register(this._bufferService.buffers.onBufferActivate(() => {
                  this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? "none" : "block";
                }));
                this.register(this._bufferService.onScroll(() => {
                  if (this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length) {
                    this._refreshDrawHeightConstants();
                    this._refreshColorZonePadding();
                  }
                }));
              }
              _registerDimensionChangeListeners() {
                this.register(this._renderService.onRender(() => {
                  if (!this._containerHeight || this._containerHeight !== this._screenElement.clientHeight) {
                    this._queueRefresh(true);
                    this._containerHeight = this._screenElement.clientHeight;
                  }
                }));
                this.register(this._optionsService.onSpecificOptionChange("overviewRulerWidth", () => this._queueRefresh(true)));
                this.register(this._coreBrowserService.onDprChange(() => this._queueRefresh(true)));
                this._queueRefresh(true);
              }
              _refreshDrawConstants() {
                const v = Math.floor(this._canvas.width / 3);
                const C = Math.ceil(this._canvas.width / 3);
                g.full = this._canvas.width;
                g.left = v;
                g.center = C;
                g.right = v;
                this._refreshDrawHeightConstants();
                b.full = 0;
                b.left = 0;
                b.center = g.left;
                b.right = g.left + g.center;
              }
              _refreshDrawHeightConstants() {
                w.full = Math.round(this._coreBrowserService.dpr * 2);
                const v = this._canvas.height / this._bufferService.buffer.lines.length;
                const C = Math.round(Math.max(Math.min(v, 12), 6) * this._coreBrowserService.dpr);
                w.left = C;
                w.center = C;
                w.right = C;
              }
              _refreshColorZonePadding() {
                this._colorZoneStore.setPadding({
                  full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * w.full),
                  left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * w.left),
                  center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * w.center),
                  right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * w.right)
                });
                this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
              }
              _refreshCanvasDimensions() {
                this._canvas.style.width = `${this._width}px`;
                this._canvas.width = Math.round(this._width * this._coreBrowserService.dpr);
                this._canvas.style.height = `${this._screenElement.clientHeight}px`;
                this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowserService.dpr);
                this._refreshDrawConstants();
                this._refreshColorZonePadding();
              }
              _refreshDecorations() {
                if (this._shouldUpdateDimensions) {
                  this._refreshCanvasDimensions();
                }
                this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
                this._colorZoneStore.clear();
                for (const C of this._decorationService.decorations) {
                  this._colorZoneStore.addDecoration(C);
                }
                this._ctx.lineWidth = 1;
                const v = this._colorZoneStore.zones;
                for (const C of v) {
                  if (C.position !== "full") {
                    this._renderColorZone(C);
                  }
                }
                for (const C of v) {
                  if (C.position === "full") {
                    this._renderColorZone(C);
                  }
                }
                this._shouldUpdateDimensions = false;
                this._shouldUpdateAnchor = false;
              }
              _renderColorZone(v) {
                this._ctx.fillStyle = v.color;
                this._ctx.fillRect(b[v.position || "full"], Math.round((this._canvas.height - 1) * (v.startBufferLine / this._bufferService.buffers.active.lines.length) - w[v.position || "full"] / 2), g[v.position || "full"], Math.round((this._canvas.height - 1) * ((v.endBufferLine - v.startBufferLine) / this._bufferService.buffers.active.lines.length) + w[v.position || "full"]));
              }
              _queueRefresh(v, C) {
                this._shouldUpdateDimensions = v || this._shouldUpdateDimensions;
                this._shouldUpdateAnchor = C || this._shouldUpdateAnchor;
                if (this._animationFrame === undefined) {
                  this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => {
                    this._refreshDecorations();
                    this._animationFrame = undefined;
                  });
                }
              }
            };
            a.OverviewRulerRenderer = m = d([p(2, x.IBufferService), p(3, x.IDecorationService), p(4, S.IRenderService), p(5, x.IOptionsService), p(6, S.ICoreBrowserService)], m);
          },
          2950: function (h, a, c) {
            var d = this && this.__decorate || function (w, g, b, m) {
              var v;
              var C = arguments.length;
              var T = C < 3 ? g : m === null ? m = Object.getOwnPropertyDescriptor(g, b) : m;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                T = Reflect.decorate(w, g, b, m);
              } else {
                for (var A = w.length - 1; A >= 0; A--) {
                  if (v = w[A]) {
                    T = (C < 3 ? v(T) : C > 3 ? v(g, b, T) : v(g, b)) || T;
                  }
                }
              }
              if (C > 3 && T) {
                Object.defineProperty(g, b, T);
              }
              return T;
            };
            var p = this && this.__param || function (w, g) {
              return function (b, m) {
                g(b, m, w);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.CompositionHelper = undefined;
            const f = c(4725);
            const S = c(2585);
            const _ = c(2584);
            let x = a.CompositionHelper = class {
              get isComposing() {
                return this._isComposing;
              }
              constructor(w, g, b, m, v, C) {
                this._textarea = w;
                this._compositionView = g;
                this._bufferService = b;
                this._optionsService = m;
                this._coreService = v;
                this._renderService = C;
                this._isComposing = false;
                this._isSendingComposition = false;
                this._compositionPosition = {
                  start: 0,
                  end: 0
                };
                this._dataAlreadySent = "";
              }
              compositionstart() {
                this._isComposing = true;
                this._compositionPosition.start = this._textarea.value.length;
                this._compositionView.textContent = "";
                this._dataAlreadySent = "";
                this._compositionView.classList.add("active");
              }
              compositionupdate(w) {
                this._compositionView.textContent = w.data;
                this.updateCompositionElements();
                setTimeout(() => {
                  this._compositionPosition.end = this._textarea.value.length;
                }, 0);
              }
              compositionend() {
                this._finalizeComposition(true);
              }
              keydown(w) {
                if (this._isComposing || this._isSendingComposition) {
                  if (w.keyCode === 229 || w.keyCode === 16 || w.keyCode === 17 || w.keyCode === 18) {
                    return false;
                  }
                  this._finalizeComposition(false);
                }
                return w.keyCode !== 229 || (this._handleAnyTextareaChanges(), false);
              }
              _finalizeComposition(w) {
                this._compositionView.classList.remove("active");
                this._isComposing = false;
                if (w) {
                  const g = {
                    start: this._compositionPosition.start,
                    end: this._compositionPosition.end
                  };
                  this._isSendingComposition = true;
                  setTimeout(() => {
                    if (this._isSendingComposition) {
                      let b;
                      this._isSendingComposition = false;
                      g.start += this._dataAlreadySent.length;
                      b = this._isComposing ? this._textarea.value.substring(g.start, g.end) : this._textarea.value.substring(g.start);
                      if (b.length > 0) {
                        this._coreService.triggerDataEvent(b, true);
                      }
                    }
                  }, 0);
                } else {
                  this._isSendingComposition = false;
                  const g = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
                  this._coreService.triggerDataEvent(g, true);
                }
              }
              _handleAnyTextareaChanges() {
                const w = this._textarea.value;
                setTimeout(() => {
                  if (!this._isComposing) {
                    const g = this._textarea.value;
                    const b = g.replace(w, "");
                    this._dataAlreadySent = b;
                    if (g.length > w.length) {
                      this._coreService.triggerDataEvent(b, true);
                    } else if (g.length < w.length) {
                      this._coreService.triggerDataEvent(`${_.C0.DEL}`, true);
                    } else if (g.length === w.length && g !== w) {
                      this._coreService.triggerDataEvent(g, true);
                    }
                  }
                }, 0);
              }
              updateCompositionElements(w) {
                if (this._isComposing) {
                  if (this._bufferService.buffer.isCursorInViewport) {
                    const g = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1);
                    const b = this._renderService.dimensions.css.cell.height;
                    const m = this._bufferService.buffer.y * this._renderService.dimensions.css.cell.height;
                    const v = g * this._renderService.dimensions.css.cell.width;
                    this._compositionView.style.left = v + "px";
                    this._compositionView.style.top = m + "px";
                    this._compositionView.style.height = b + "px";
                    this._compositionView.style.lineHeight = b + "px";
                    this._compositionView.style.fontFamily = this._optionsService.rawOptions.fontFamily;
                    this._compositionView.style.fontSize = this._optionsService.rawOptions.fontSize + "px";
                    const C = this._compositionView.getBoundingClientRect();
                    this._textarea.style.left = v + "px";
                    this._textarea.style.top = m + "px";
                    this._textarea.style.width = Math.max(C.width, 1) + "px";
                    this._textarea.style.height = Math.max(C.height, 1) + "px";
                    this._textarea.style.lineHeight = C.height + "px";
                  }
                  if (!w) {
                    setTimeout(() => this.updateCompositionElements(true), 0);
                  }
                }
              }
            };
            a.CompositionHelper = x = d([p(2, S.IBufferService), p(3, S.IOptionsService), p(4, S.ICoreService), p(5, f.IRenderService)], x);
          },
          9806: (h, a) => {
            function c(d, p, f) {
              const S = f.getBoundingClientRect();
              const _ = d.getComputedStyle(f);
              const x = parseInt(_.getPropertyValue("padding-left"));
              const w = parseInt(_.getPropertyValue("padding-top"));
              return [p.clientX - S.left - x, p.clientY - S.top - w];
            }
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.getCoords = a.getCoordsRelativeToElement = undefined;
            a.getCoordsRelativeToElement = c;
            a.getCoords = function (d, p, f, S, _, x, w, g, b) {
              if (!x) {
                return;
              }
              const m = c(d, p, f);
              if (m) {
                m[0] = Math.ceil((m[0] + (b ? w / 2 : 0)) / w);
                m[1] = Math.ceil(m[1] / g);
                m[0] = Math.min(Math.max(m[0], 1), S + (b ? 1 : 0));
                m[1] = Math.min(Math.max(m[1], 1), _);
                return m;
              } else {
                return undefined;
              }
            };
          },
          9504: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.moveToCellSequence = undefined;
            const d = c(2584);
            function p(g, b, m, v) {
              const C = g - f(g, m);
              const T = b - f(b, m);
              const A = Math.abs(C - T) - function (M, R, I) {
                let j = 0;
                const W = M - f(M, I);
                const z = R - f(R, I);
                for (let N = 0; N < Math.abs(W - z); N++) {
                  const D = S(M, R) === "A" ? -1 : 1;
                  const $ = I.buffer.lines.get(W + D * N);
                  if ($ != null && $.isWrapped) {
                    j++;
                  }
                }
                return j;
              }(g, b, m);
              return w(A, x(S(g, b), v));
            }
            function f(g, b) {
              let m = 0;
              let v = b.buffer.lines.get(g);
              let C = v == null ? undefined : v.isWrapped;
              while (C && g >= 0 && g < b.rows) {
                m++;
                v = b.buffer.lines.get(--g);
                C = v == null ? undefined : v.isWrapped;
              }
              return m;
            }
            function S(g, b) {
              if (g > b) {
                return "A";
              } else {
                return "B";
              }
            }
            function _(g, b, m, v, C, T) {
              let A = g;
              let M = b;
              let R = "";
              while (A !== m || M !== v) {
                A += C ? 1 : -1;
                if (C && A > T.cols - 1) {
                  R += T.buffer.translateBufferLineToString(M, false, g, A);
                  A = 0;
                  g = 0;
                  M++;
                } else if (!C && A < 0) {
                  R += T.buffer.translateBufferLineToString(M, false, 0, g + 1);
                  A = T.cols - 1;
                  g = A;
                  M--;
                }
              }
              return R + T.buffer.translateBufferLineToString(M, false, g, A);
            }
            function x(g, b) {
              const m = b ? "O" : "[";
              return d.C0.ESC + m + g;
            }
            function w(g, b) {
              g = Math.floor(g);
              let m = "";
              for (let v = 0; v < g; v++) {
                m += b;
              }
              return m;
            }
            a.moveToCellSequence = function (g, b, m, v) {
              const C = m.buffer.x;
              const T = m.buffer.y;
              if (!m.buffer.hasScrollback) {
                return function (R, I, j, W, z, N) {
                  if (p(I, W, z, N).length === 0) {
                    return "";
                  } else {
                    return w(_(R, I, R, I - f(I, z), false, z).length, x("D", N));
                  }
                }(C, T, 0, b, m, v) + p(T, b, m, v) + function (R, I, j, W, z, N) {
                  let D;
                  D = p(I, W, z, N).length > 0 ? W - f(W, z) : I;
                  const $ = W;
                  const G = function (q, U, L, F, P, V) {
                    let Z;
                    Z = p(L, F, P, V).length > 0 ? F - f(F, P) : U;
                    if (q < L && Z <= F || q >= L && Z < F) {
                      return "C";
                    } else {
                      return "D";
                    }
                  }(R, I, j, W, z, N);
                  return w(_(R, D, j, $, G === "C", z).length, x(G, N));
                }(C, T, g, b, m, v);
              }
              let A;
              if (T === b) {
                A = C > g ? "D" : "C";
                return w(Math.abs(C - g), x(A, v));
              }
              A = T > b ? "D" : "C";
              const M = Math.abs(T - b);
              return w(function (R, I) {
                return I.cols - R;
              }(T > b ? g : C, m) + (M - 1) * m.cols + 1 + ((T > b ? C : g) - 1), x(A, v));
            };
          },
          1296: function (h, a, c) {
            var d = this && this.__decorate || function (N, D, $, G) {
              var q;
              var U = arguments.length;
              var L = U < 3 ? D : G === null ? G = Object.getOwnPropertyDescriptor(D, $) : G;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                L = Reflect.decorate(N, D, $, G);
              } else {
                for (var F = N.length - 1; F >= 0; F--) {
                  if (q = N[F]) {
                    L = (U < 3 ? q(L) : U > 3 ? q(D, $, L) : q(D, $)) || L;
                  }
                }
              }
              if (U > 3 && L) {
                Object.defineProperty(D, $, L);
              }
              return L;
            };
            var p = this && this.__param || function (N, D) {
              return function ($, G) {
                D($, G, N);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.DomRenderer = undefined;
            const f = c(3787);
            const S = c(2550);
            const _ = c(2223);
            const x = c(6171);
            const w = c(6052);
            const g = c(4725);
            const b = c(8055);
            const m = c(8460);
            const v = c(844);
            const C = c(2585);
            const T = "xterm-dom-renderer-owner-";
            const A = "xterm-rows";
            const M = "xterm-fg-";
            const R = "xterm-bg-";
            const I = "xterm-focus";
            const j = "xterm-selection";
            let W = 1;
            let z = a.DomRenderer = class extends v.Disposable {
              constructor(N, D, $, G, q, U, L, F, P, V, Z, J, ne) {
                super();
                this._terminal = N;
                this._document = D;
                this._element = $;
                this._screenElement = G;
                this._viewportElement = q;
                this._helperContainer = U;
                this._linkifier2 = L;
                this._charSizeService = P;
                this._optionsService = V;
                this._bufferService = Z;
                this._coreBrowserService = J;
                this._themeService = ne;
                this._terminalClass = W++;
                this._rowElements = [];
                this._selectionRenderModel = (0, w.createSelectionRenderModel)();
                this.onRequestRedraw = this.register(new m.EventEmitter()).event;
                this._rowContainer = this._document.createElement("div");
                this._rowContainer.classList.add(A);
                this._rowContainer.style.lineHeight = "normal";
                this._rowContainer.setAttribute("aria-hidden", "true");
                this._refreshRowElements(this._bufferService.cols, this._bufferService.rows);
                this._selectionContainer = this._document.createElement("div");
                this._selectionContainer.classList.add(j);
                this._selectionContainer.setAttribute("aria-hidden", "true");
                this.dimensions = (0, x.createRenderDimensions)();
                this._updateDimensions();
                this.register(this._optionsService.onOptionChange(() => this._handleOptionsChanged()));
                this.register(this._themeService.onChangeColors(ue => this._injectCss(ue)));
                this._injectCss(this._themeService.colors);
                this._rowFactory = F.createInstance(f.DomRendererRowFactory, document);
                this._element.classList.add(T + this._terminalClass);
                this._screenElement.appendChild(this._rowContainer);
                this._screenElement.appendChild(this._selectionContainer);
                this.register(this._linkifier2.onShowLinkUnderline(ue => this._handleLinkHover(ue)));
                this.register(this._linkifier2.onHideLinkUnderline(ue => this._handleLinkLeave(ue)));
                this.register((0, v.toDisposable)(() => {
                  this._element.classList.remove(T + this._terminalClass);
                  this._rowContainer.remove();
                  this._selectionContainer.remove();
                  this._widthCache.dispose();
                  this._themeStyleElement.remove();
                  this._dimensionsStyleElement.remove();
                }));
                this._widthCache = new S.WidthCache(this._document, this._helperContainer);
                this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold);
                this._setDefaultSpacing();
              }
              _updateDimensions() {
                const N = this._coreBrowserService.dpr;
                this.dimensions.device.char.width = this._charSizeService.width * N;
                this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * N);
                this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing);
                this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight);
                this.dimensions.device.char.left = 0;
                this.dimensions.device.char.top = 0;
                this.dimensions.device.canvas.width = this.dimensions.device.cell.width * this._bufferService.cols;
                this.dimensions.device.canvas.height = this.dimensions.device.cell.height * this._bufferService.rows;
                this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / N);
                this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / N);
                this.dimensions.css.cell.width = this.dimensions.css.canvas.width / this._bufferService.cols;
                this.dimensions.css.cell.height = this.dimensions.css.canvas.height / this._bufferService.rows;
                for (const $ of this._rowElements) {
                  $.style.width = `${this.dimensions.css.canvas.width}px`;
                  $.style.height = `${this.dimensions.css.cell.height}px`;
                  $.style.lineHeight = `${this.dimensions.css.cell.height}px`;
                  $.style.overflow = "hidden";
                }
                if (!this._dimensionsStyleElement) {
                  this._dimensionsStyleElement = this._document.createElement("style");
                  this._screenElement.appendChild(this._dimensionsStyleElement);
                }
                const D = `${this._terminalSelector} .${A} span { display: inline-block; height: 100%; vertical-align: top;}`;
                this._dimensionsStyleElement.textContent = D;
                this._selectionContainer.style.height = this._viewportElement.style.height;
                this._screenElement.style.width = `${this.dimensions.css.canvas.width}px`;
                this._screenElement.style.height = `${this.dimensions.css.canvas.height}px`;
              }
              _injectCss(N) {
                if (!this._themeStyleElement) {
                  this._themeStyleElement = this._document.createElement("style");
                  this._screenElement.appendChild(this._themeStyleElement);
                }
                let D = `${this._terminalSelector} .${A} { color: ${N.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;
                D += `${this._terminalSelector} .${A} .xterm-dim { color: ${b.color.multiplyOpacity(N.foreground, 0.5).css};}`;
                D += `${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`;
                const $ = `blink_underline_${this._terminalClass}`;
                const G = `blink_bar_${this._terminalClass}`;
                const q = `blink_block_${this._terminalClass}`;
                D += `@keyframes ${$} { 50% {  border-bottom-style: hidden; }}`;
                D += `@keyframes ${G} { 50% {  box-shadow: none; }}`;
                D += `@keyframes ${q} { 0% {  background-color: ${N.cursor.css};  color: ${N.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${N.cursor.css}; }}`;
                D += `${this._terminalSelector} .${A}.${I} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${$} 1s step-end infinite;}${this._terminalSelector} .${A}.${I} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${G} 1s step-end infinite;}${this._terminalSelector} .${A}.${I} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${q} 1s step-end infinite;}${this._terminalSelector} .${A} .xterm-cursor.xterm-cursor-block { background-color: ${N.cursor.css}; color: ${N.cursorAccent.css};}${this._terminalSelector} .${A} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${N.cursor.css} !important; color: ${N.cursorAccent.css} !important;}${this._terminalSelector} .${A} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${N.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${A} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${N.cursor.css} inset;}${this._terminalSelector} .${A} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${N.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`;
                D += `${this._terminalSelector} .${j} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${j} div { position: absolute; background-color: ${N.selectionBackgroundOpaque.css};}${this._terminalSelector} .${j} div { position: absolute; background-color: ${N.selectionInactiveBackgroundOpaque.css};}`;
                for (const [U, L] of N.ansi.entries()) {
                  D += `${this._terminalSelector} .${M}${U} { color: ${L.css}; }${this._terminalSelector} .${M}${U}.xterm-dim { color: ${b.color.multiplyOpacity(L, 0.5).css}; }${this._terminalSelector} .${R}${U} { background-color: ${L.css}; }`;
                }
                D += `${this._terminalSelector} .${M}${_.INVERTED_DEFAULT_COLOR} { color: ${b.color.opaque(N.background).css}; }${this._terminalSelector} .${M}${_.INVERTED_DEFAULT_COLOR}.xterm-dim { color: ${b.color.multiplyOpacity(b.color.opaque(N.background), 0.5).css}; }${this._terminalSelector} .${R}${_.INVERTED_DEFAULT_COLOR} { background-color: ${N.foreground.css}; }`;
                this._themeStyleElement.textContent = D;
              }
              _setDefaultSpacing() {
                const N = this.dimensions.css.cell.width - this._widthCache.get("W", false, false);
                this._rowContainer.style.letterSpacing = `${N}px`;
                this._rowFactory.defaultSpacing = N;
              }
              handleDevicePixelRatioChange() {
                this._updateDimensions();
                this._widthCache.clear();
                this._setDefaultSpacing();
              }
              _refreshRowElements(N, D) {
                for (let $ = this._rowElements.length; $ <= D; $++) {
                  const G = this._document.createElement("div");
                  this._rowContainer.appendChild(G);
                  this._rowElements.push(G);
                }
                while (this._rowElements.length > D) {
                  this._rowContainer.removeChild(this._rowElements.pop());
                }
              }
              handleResize(N, D) {
                this._refreshRowElements(N, D);
                this._updateDimensions();
                this.handleSelectionChanged(this._selectionRenderModel.selectionStart, this._selectionRenderModel.selectionEnd, this._selectionRenderModel.columnSelectMode);
              }
              handleCharSizeChanged() {
                this._updateDimensions();
                this._widthCache.clear();
                this._setDefaultSpacing();
              }
              handleBlur() {
                this._rowContainer.classList.remove(I);
                this.renderRows(0, this._bufferService.rows - 1);
              }
              handleFocus() {
                this._rowContainer.classList.add(I);
                this.renderRows(this._bufferService.buffer.y, this._bufferService.buffer.y);
              }
              handleSelectionChanged(N, D, $) {
                this._selectionContainer.replaceChildren();
                this._rowFactory.handleSelectionChanged(N, D, $);
                this.renderRows(0, this._bufferService.rows - 1);
                if (!N || !D) {
                  return;
                }
                this._selectionRenderModel.update(this._terminal, N, D, $);
                const G = this._selectionRenderModel.viewportStartRow;
                const q = this._selectionRenderModel.viewportEndRow;
                const U = this._selectionRenderModel.viewportCappedStartRow;
                const L = this._selectionRenderModel.viewportCappedEndRow;
                if (U >= this._bufferService.rows || L < 0) {
                  return;
                }
                const F = this._document.createDocumentFragment();
                if ($) {
                  const P = N[0] > D[0];
                  F.appendChild(this._createSelectionElement(U, P ? D[0] : N[0], P ? N[0] : D[0], L - U + 1));
                } else {
                  const P = G === U ? N[0] : 0;
                  const V = U === q ? D[0] : this._bufferService.cols;
                  F.appendChild(this._createSelectionElement(U, P, V));
                  const Z = L - U - 1;
                  F.appendChild(this._createSelectionElement(U + 1, 0, this._bufferService.cols, Z));
                  if (U !== L) {
                    const J = q === L ? D[0] : this._bufferService.cols;
                    F.appendChild(this._createSelectionElement(L, 0, J));
                  }
                }
                this._selectionContainer.appendChild(F);
              }
              _createSelectionElement(N, D, $, G = 1) {
                const q = this._document.createElement("div");
                const U = D * this.dimensions.css.cell.width;
                let L = this.dimensions.css.cell.width * ($ - D);
                if (U + L > this.dimensions.css.canvas.width) {
                  L = this.dimensions.css.canvas.width - U;
                }
                q.style.height = G * this.dimensions.css.cell.height + "px";
                q.style.top = N * this.dimensions.css.cell.height + "px";
                q.style.left = `${U}px`;
                q.style.width = `${L}px`;
                return q;
              }
              handleCursorMove() {}
              _handleOptionsChanged() {
                this._updateDimensions();
                this._injectCss(this._themeService.colors);
                this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold);
                this._setDefaultSpacing();
              }
              clear() {
                for (const N of this._rowElements) {
                  N.replaceChildren();
                }
              }
              renderRows(N, D) {
                const $ = this._bufferService.buffer;
                const G = $.ybase + $.y;
                const q = Math.min($.x, this._bufferService.cols - 1);
                const U = this._optionsService.rawOptions.cursorBlink;
                const L = this._optionsService.rawOptions.cursorStyle;
                const F = this._optionsService.rawOptions.cursorInactiveStyle;
                for (let P = N; P <= D; P++) {
                  const V = P + $.ydisp;
                  const Z = this._rowElements[P];
                  const J = $.lines.get(V);
                  if (!Z || !J) {
                    break;
                  }
                  Z.replaceChildren(...this._rowFactory.createRow(J, V, V === G, L, F, q, U, this.dimensions.css.cell.width, this._widthCache, -1, -1));
                }
              }
              get _terminalSelector() {
                return `.${T}${this._terminalClass}`;
              }
              _handleLinkHover(N) {
                this._setCellUnderline(N.x1, N.x2, N.y1, N.y2, N.cols, true);
              }
              _handleLinkLeave(N) {
                this._setCellUnderline(N.x1, N.x2, N.y1, N.y2, N.cols, false);
              }
              _setCellUnderline(N, D, $, G, q, U) {
                if ($ < 0) {
                  N = 0;
                }
                if (G < 0) {
                  D = 0;
                }
                const L = this._bufferService.rows - 1;
                $ = Math.max(Math.min($, L), 0);
                G = Math.max(Math.min(G, L), 0);
                q = Math.min(q, this._bufferService.cols);
                const F = this._bufferService.buffer;
                const P = F.ybase + F.y;
                const V = Math.min(F.x, q - 1);
                const Z = this._optionsService.rawOptions.cursorBlink;
                const J = this._optionsService.rawOptions.cursorStyle;
                const ne = this._optionsService.rawOptions.cursorInactiveStyle;
                for (let ue = $; ue <= G; ++ue) {
                  const ee = ue + F.ydisp;
                  const Y = this._rowElements[ue];
                  const re = F.lines.get(ee);
                  if (!Y || !re) {
                    break;
                  }
                  Y.replaceChildren(...this._rowFactory.createRow(re, ee, ee === P, J, ne, V, Z, this.dimensions.css.cell.width, this._widthCache, U ? ue === $ ? N : 0 : -1, U ? (ue === G ? D : q) - 1 : -1));
                }
              }
            };
            a.DomRenderer = z = d([p(7, C.IInstantiationService), p(8, g.ICharSizeService), p(9, C.IOptionsService), p(10, C.IBufferService), p(11, g.ICoreBrowserService), p(12, g.IThemeService)], z);
          },
          3787: function (h, a, c) {
            var d = this && this.__decorate || function (A, M, R, I) {
              var j;
              var W = arguments.length;
              var z = W < 3 ? M : I === null ? I = Object.getOwnPropertyDescriptor(M, R) : I;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                z = Reflect.decorate(A, M, R, I);
              } else {
                for (var N = A.length - 1; N >= 0; N--) {
                  if (j = A[N]) {
                    z = (W < 3 ? j(z) : W > 3 ? j(M, R, z) : j(M, R)) || z;
                  }
                }
              }
              if (W > 3 && z) {
                Object.defineProperty(M, R, z);
              }
              return z;
            };
            var p = this && this.__param || function (A, M) {
              return function (R, I) {
                M(R, I, A);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.DomRendererRowFactory = undefined;
            const f = c(2223);
            const S = c(643);
            const _ = c(511);
            const x = c(2585);
            const w = c(8055);
            const g = c(4725);
            const b = c(4269);
            const m = c(6171);
            const v = c(3734);
            let C = a.DomRendererRowFactory = class {
              constructor(A, M, R, I, j, W, z) {
                this._document = A;
                this._characterJoinerService = M;
                this._optionsService = R;
                this._coreBrowserService = I;
                this._coreService = j;
                this._decorationService = W;
                this._themeService = z;
                this._workCell = new _.CellData();
                this._columnSelectMode = false;
                this.defaultSpacing = 0;
              }
              handleSelectionChanged(A, M, R) {
                this._selectionStart = A;
                this._selectionEnd = M;
                this._columnSelectMode = R;
              }
              createRow(A, M, R, I, j, W, z, N, D, $, G) {
                const q = [];
                const U = this._characterJoinerService.getJoinedCharacters(M);
                const L = this._themeService.colors;
                let F;
                let P = A.getNoBgTrimmedLength();
                if (R && P < W + 1) {
                  P = W + 1;
                }
                let V = 0;
                let Z = "";
                let J = 0;
                let ne = 0;
                let ue = 0;
                let ee = false;
                let Y = 0;
                let re = false;
                let ce = 0;
                const ge = [];
                const de = $ !== -1 && G !== -1;
                for (let me = 0; me < P; me++) {
                  A.loadCell(me, this._workCell);
                  let H = this._workCell.getWidth();
                  if (H === 0) {
                    continue;
                  }
                  let ae = false;
                  let oe = me;
                  let X = this._workCell;
                  if (U.length > 0 && me === U[0][0]) {
                    ae = true;
                    const Be = U.shift();
                    X = new b.JoinedCellData(this._workCell, A.translateToString(true, Be[0], Be[1]), Be[1] - Be[0]);
                    oe = Be[1] - 1;
                    H = X.getWidth();
                  }
                  const Q = this._isCellInSelection(me, M);
                  const se = R && me === W;
                  const he = de && me >= $ && me <= G;
                  let ye = false;
                  this._decorationService.forEachDecorationAtCell(me, M, undefined, Be => {
                    ye = true;
                  });
                  let pe = X.getChars() || S.WHITESPACE_CELL_CHAR;
                  if (pe === " " && (X.isUnderline() || X.isOverline())) {
                    pe = "\xA0";
                  }
                  ce = H * N - D.get(pe, X.isBold(), X.isItalic());
                  if (F) {
                    if (V && (Q && re || !Q && !re && X.bg === J) && (Q && re && L.selectionForeground || X.fg === ne) && X.extended.ext === ue && he === ee && ce === Y && !se && !ae && !ye) {
                      if (X.isInvisible()) {
                        Z += S.WHITESPACE_CELL_CHAR;
                      } else {
                        Z += pe;
                      }
                      V++;
                      continue;
                    }
                    if (V) {
                      F.textContent = Z;
                    }
                    F = this._document.createElement("span");
                    V = 0;
                    Z = "";
                  } else {
                    F = this._document.createElement("span");
                  }
                  J = X.bg;
                  ne = X.fg;
                  ue = X.extended.ext;
                  ee = he;
                  Y = ce;
                  re = Q;
                  if (ae && W >= me && W <= oe) {
                    W = me;
                  }
                  if (!this._coreService.isCursorHidden && se && this._coreService.isCursorInitialized) {
                    ge.push("xterm-cursor");
                    if (this._coreBrowserService.isFocused) {
                      if (z) {
                        ge.push("xterm-cursor-blink");
                      }
                      ge.push(I === "bar" ? "xterm-cursor-bar" : I === "underline" ? "xterm-cursor-underline" : "xterm-cursor-block");
                    } else if (j) {
                      switch (j) {
                        case "outline":
                          ge.push("xterm-cursor-outline");
                          break;
                        case "block":
                          ge.push("xterm-cursor-block");
                          break;
                        case "bar":
                          ge.push("xterm-cursor-bar");
                          break;
                        case "underline":
                          ge.push("xterm-cursor-underline");
                      }
                    }
                  }
                  if (X.isBold()) {
                    ge.push("xterm-bold");
                  }
                  if (X.isItalic()) {
                    ge.push("xterm-italic");
                  }
                  if (X.isDim()) {
                    ge.push("xterm-dim");
                  }
                  Z = X.isInvisible() ? S.WHITESPACE_CELL_CHAR : X.getChars() || S.WHITESPACE_CELL_CHAR;
                  if (X.isUnderline() && (ge.push(`xterm-underline-${X.extended.underlineStyle}`), Z === " " && (Z = "\xA0"), !X.isUnderlineColorDefault())) {
                    if (X.isUnderlineColorRGB()) {
                      F.style.textDecorationColor = `rgb(${v.AttributeData.toColorRGB(X.getUnderlineColor()).join(",")})`;
                    } else {
                      let Be = X.getUnderlineColor();
                      if (this._optionsService.rawOptions.drawBoldTextInBrightColors && X.isBold() && Be < 8) {
                        Be += 8;
                      }
                      F.style.textDecorationColor = L.ansi[Be].css;
                    }
                  }
                  if (X.isOverline()) {
                    ge.push("xterm-overline");
                    if (Z === " ") {
                      Z = "\xA0";
                    }
                  }
                  if (X.isStrikethrough()) {
                    ge.push("xterm-strikethrough");
                  }
                  if (he) {
                    F.style.textDecoration = "underline";
                  }
                  let Se = X.getFgColor();
                  let _e = X.getFgColorMode();
                  let ie = X.getBgColor();
                  let te = X.getBgColorMode();
                  const be = !!X.isInverse();
                  if (be) {
                    const Be = Se;
                    Se = ie;
                    ie = Be;
                    const Ue = _e;
                    _e = te;
                    te = Ue;
                  }
                  let ve;
                  let Te;
                  let Re;
                  let ze = false;
                  this._decorationService.forEachDecorationAtCell(me, M, undefined, Be => {
                    if (Be.options.layer === "top" || !ze) {
                      if (Be.backgroundColorRGB) {
                        te = 50331648;
                        ie = Be.backgroundColorRGB.rgba >> 8 & 16777215;
                        ve = Be.backgroundColorRGB;
                      }
                      if (Be.foregroundColorRGB) {
                        _e = 50331648;
                        Se = Be.foregroundColorRGB.rgba >> 8 & 16777215;
                        Te = Be.foregroundColorRGB;
                      }
                      ze = Be.options.layer === "top";
                    }
                  });
                  if (!ze && Q) {
                    ve = this._coreBrowserService.isFocused ? L.selectionBackgroundOpaque : L.selectionInactiveBackgroundOpaque;
                    ie = ve.rgba >> 8 & 16777215;
                    te = 50331648;
                    ze = true;
                    if (L.selectionForeground) {
                      _e = 50331648;
                      Se = L.selectionForeground.rgba >> 8 & 16777215;
                      Te = L.selectionForeground;
                    }
                  }
                  if (ze) {
                    ge.push("xterm-decoration-top");
                  }
                  switch (te) {
                    case 16777216:
                    case 33554432:
                      Re = L.ansi[ie];
                      ge.push(`xterm-bg-${ie}`);
                      break;
                    case 50331648:
                      Re = w.channels.toColor(ie >> 16, ie >> 8 & 255, ie & 255);
                      this._addStyle(F, `background-color:#${T((ie >>> 0).toString(16), "0", 6)}`);
                      break;
                    default:
                      if (be) {
                        Re = L.foreground;
                        ge.push(`xterm-bg-${f.INVERTED_DEFAULT_COLOR}`);
                      } else {
                        Re = L.background;
                      }
                  }
                  if (!ve) {
                    if (X.isDim()) {
                      ve = w.color.multiplyOpacity(Re, 0.5);
                    }
                  }
                  switch (_e) {
                    case 16777216:
                    case 33554432:
                      if (X.isBold() && Se < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors) {
                        Se += 8;
                      }
                      if (!this._applyMinimumContrast(F, Re, L.ansi[Se], X, ve, undefined)) {
                        ge.push(`xterm-fg-${Se}`);
                      }
                      break;
                    case 50331648:
                      const Be = w.channels.toColor(Se >> 16 & 255, Se >> 8 & 255, Se & 255);
                      if (!this._applyMinimumContrast(F, Re, Be, X, ve, Te)) {
                        this._addStyle(F, `color:#${T(Se.toString(16), "0", 6)}`);
                      }
                      break;
                    default:
                      if (!this._applyMinimumContrast(F, Re, L.foreground, X, ve, Te)) {
                        if (be) {
                          ge.push(`xterm-fg-${f.INVERTED_DEFAULT_COLOR}`);
                        }
                      }
                  }
                  if (ge.length) {
                    F.className = ge.join(" ");
                    ge.length = 0;
                  }
                  if (se || ae || ye) {
                    F.textContent = Z;
                  } else {
                    V++;
                  }
                  if (ce !== this.defaultSpacing) {
                    F.style.letterSpacing = `${ce}px`;
                  }
                  q.push(F);
                  me = oe;
                }
                if (F && V) {
                  F.textContent = Z;
                }
                return q;
              }
              _applyMinimumContrast(A, M, R, I, j, W) {
                if (this._optionsService.rawOptions.minimumContrastRatio === 1 || (0, m.treatGlyphAsBackgroundColor)(I.getCode())) {
                  return false;
                }
                const z = this._getContrastCache(I);
                let N;
                if (!j && !W) {
                  N = z.getColor(M.rgba, R.rgba);
                }
                if (N === undefined) {
                  const D = this._optionsService.rawOptions.minimumContrastRatio / (I.isDim() ? 2 : 1);
                  N = w.color.ensureContrastRatio(j || M, W || R, D);
                  z.setColor((j || M).rgba, (W || R).rgba, N ?? null);
                }
                return !!N && (this._addStyle(A, `color:${N.css}`), true);
              }
              _getContrastCache(A) {
                if (A.isDim()) {
                  return this._themeService.colors.halfContrastCache;
                } else {
                  return this._themeService.colors.contrastCache;
                }
              }
              _addStyle(A, M) {
                A.setAttribute("style", `${A.getAttribute("style") || ""}${M};`);
              }
              _isCellInSelection(A, M) {
                const R = this._selectionStart;
                const I = this._selectionEnd;
                return !!R && !!I && (this._columnSelectMode ? R[0] <= I[0] ? A >= R[0] && M >= R[1] && A < I[0] && M <= I[1] : A < R[0] && M >= R[1] && A >= I[0] && M <= I[1] : M > R[1] && M < I[1] || R[1] === I[1] && M === R[1] && A >= R[0] && A < I[0] || R[1] < I[1] && M === I[1] && A < I[0] || R[1] < I[1] && M === R[1] && A >= R[0]);
              }
            };
            function T(A, M, R) {
              while (A.length < R) {
                A = M + A;
              }
              return A;
            }
            a.DomRendererRowFactory = C = d([p(1, g.ICharacterJoinerService), p(2, x.IOptionsService), p(3, g.ICoreBrowserService), p(4, x.ICoreService), p(5, x.IDecorationService), p(6, g.IThemeService)], C);
          },
          2550: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.WidthCache = undefined;
            a.WidthCache = class {
              constructor(c, d) {
                this._flat = new Float32Array(256);
                this._font = "";
                this._fontSize = 0;
                this._weight = "normal";
                this._weightBold = "bold";
                this._measureElements = [];
                this._container = c.createElement("div");
                this._container.classList.add("xterm-width-cache-measure-container");
                this._container.setAttribute("aria-hidden", "true");
                this._container.style.whiteSpace = "pre";
                this._container.style.fontKerning = "none";
                const p = c.createElement("span");
                p.classList.add("xterm-char-measure-element");
                const f = c.createElement("span");
                f.classList.add("xterm-char-measure-element");
                f.style.fontWeight = "bold";
                const S = c.createElement("span");
                S.classList.add("xterm-char-measure-element");
                S.style.fontStyle = "italic";
                const _ = c.createElement("span");
                _.classList.add("xterm-char-measure-element");
                _.style.fontWeight = "bold";
                _.style.fontStyle = "italic";
                this._measureElements = [p, f, S, _];
                this._container.appendChild(p);
                this._container.appendChild(f);
                this._container.appendChild(S);
                this._container.appendChild(_);
                d.appendChild(this._container);
                this.clear();
              }
              dispose() {
                this._container.remove();
                this._measureElements.length = 0;
                this._holey = undefined;
              }
              clear() {
                this._flat.fill(-9999);
                this._holey = new Map();
              }
              setFont(c, d, p, f) {
                if (c !== this._font || d !== this._fontSize || p !== this._weight || f !== this._weightBold) {
                  this._font = c;
                  this._fontSize = d;
                  this._weight = p;
                  this._weightBold = f;
                  this._container.style.fontFamily = this._font;
                  this._container.style.fontSize = `${this._fontSize}px`;
                  this._measureElements[0].style.fontWeight = `${p}`;
                  this._measureElements[1].style.fontWeight = `${f}`;
                  this._measureElements[2].style.fontWeight = `${p}`;
                  this._measureElements[3].style.fontWeight = `${f}`;
                  this.clear();
                }
              }
              get(c, d, p) {
                let f = 0;
                if (!d && !p && c.length === 1 && (f = c.charCodeAt(0)) < 256) {
                  if (this._flat[f] !== -9999) {
                    return this._flat[f];
                  }
                  const x = this._measure(c, 0);
                  if (x > 0) {
                    this._flat[f] = x;
                  }
                  return x;
                }
                let S = c;
                if (d) {
                  S += "B";
                }
                if (p) {
                  S += "I";
                }
                let _ = this._holey.get(S);
                if (_ === undefined) {
                  let x = 0;
                  if (d) {
                    x |= 1;
                  }
                  if (p) {
                    x |= 2;
                  }
                  _ = this._measure(c, x);
                  if (_ > 0) {
                    this._holey.set(S, _);
                  }
                }
                return _;
              }
              _measure(c, d) {
                const p = this._measureElements[d];
                p.textContent = c.repeat(32);
                return p.offsetWidth / 32;
              }
            };
          },
          2223: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.TEXT_BASELINE = a.DIM_OPACITY = a.INVERTED_DEFAULT_COLOR = undefined;
            const d = c(6114);
            a.INVERTED_DEFAULT_COLOR = 257;
            a.DIM_OPACITY = 0.5;
            a.TEXT_BASELINE = d.isFirefox || d.isLegacyEdge ? "bottom" : "ideographic";
          },
          6171: (h, a) => {
            function c(p) {
              return p >= 57508 && p <= 57558;
            }
            function d(p) {
              return p >= 128512 && p <= 128591 || p >= 127744 && p <= 128511 || p >= 128640 && p <= 128767 || p >= 9728 && p <= 9983 || p >= 9984 && p <= 10175 || p >= 65024 && p <= 65039 || p >= 129280 && p <= 129535 || p >= 127462 && p <= 127487;
            }
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.computeNextVariantOffset = a.createRenderDimensions = a.treatGlyphAsBackgroundColor = a.allowRescaling = a.isEmoji = a.isRestrictedPowerlineGlyph = a.isPowerlineGlyph = a.throwIfFalsy = undefined;
            a.throwIfFalsy = function (p) {
              if (!p) {
                throw new Error("value must not be falsy");
              }
              return p;
            };
            a.isPowerlineGlyph = c;
            a.isRestrictedPowerlineGlyph = function (p) {
              return p >= 57520 && p <= 57527;
            };
            a.isEmoji = d;
            a.allowRescaling = function (p, f, S, _) {
              return f === 1 && S > Math.ceil(_ * 1.5) && p !== undefined && p > 255 && !d(p) && !c(p) && !function (x) {
                return x >= 57344 && x <= 63743;
              }(p);
            };
            a.treatGlyphAsBackgroundColor = function (p) {
              return c(p) || function (f) {
                return f >= 9472 && f <= 9631;
              }(p);
            };
            a.createRenderDimensions = function () {
              return {
                css: {
                  canvas: {
                    width: 0,
                    height: 0
                  },
                  cell: {
                    width: 0,
                    height: 0
                  }
                },
                device: {
                  canvas: {
                    width: 0,
                    height: 0
                  },
                  cell: {
                    width: 0,
                    height: 0
                  },
                  char: {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                  }
                }
              };
            };
            a.computeNextVariantOffset = function (p, f, S = 0) {
              return (p - (Math.round(f) * 2 - S)) % (Math.round(f) * 2);
            };
          },
          6052: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.createSelectionRenderModel = undefined;
            class c {
              constructor() {
                this.clear();
              }
              clear() {
                this.hasSelection = false;
                this.columnSelectMode = false;
                this.viewportStartRow = 0;
                this.viewportEndRow = 0;
                this.viewportCappedStartRow = 0;
                this.viewportCappedEndRow = 0;
                this.startCol = 0;
                this.endCol = 0;
                this.selectionStart = undefined;
                this.selectionEnd = undefined;
              }
              update(p, f, S, _ = false) {
                this.selectionStart = f;
                this.selectionEnd = S;
                if (!f || !S || f[0] === S[0] && f[1] === S[1]) {
                  this.clear();
                  return;
                }
                const x = p.buffers.active.ydisp;
                const w = f[1] - x;
                const g = S[1] - x;
                const b = Math.max(w, 0);
                const m = Math.min(g, p.rows - 1);
                if (b >= p.rows || m < 0) {
                  this.clear();
                } else {
                  this.hasSelection = true;
                  this.columnSelectMode = _;
                  this.viewportStartRow = w;
                  this.viewportEndRow = g;
                  this.viewportCappedStartRow = b;
                  this.viewportCappedEndRow = m;
                  this.startCol = f[0];
                  this.endCol = S[0];
                }
              }
              isCellSelected(p, f, S) {
                return !!this.hasSelection && (S -= p.buffer.active.viewportY, this.columnSelectMode ? this.startCol <= this.endCol ? f >= this.startCol && S >= this.viewportCappedStartRow && f < this.endCol && S <= this.viewportCappedEndRow : f < this.startCol && S >= this.viewportCappedStartRow && f >= this.endCol && S <= this.viewportCappedEndRow : S > this.viewportStartRow && S < this.viewportEndRow || this.viewportStartRow === this.viewportEndRow && S === this.viewportStartRow && f >= this.startCol && f < this.endCol || this.viewportStartRow < this.viewportEndRow && S === this.viewportEndRow && f < this.endCol || this.viewportStartRow < this.viewportEndRow && S === this.viewportStartRow && f >= this.startCol);
              }
            }
            a.createSelectionRenderModel = function () {
              return new c();
            };
          },
          456: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.SelectionModel = undefined;
            a.SelectionModel = class {
              constructor(c) {
                this._bufferService = c;
                this.isSelectAllActive = false;
                this.selectionStartLength = 0;
              }
              clearSelection() {
                this.selectionStart = undefined;
                this.selectionEnd = undefined;
                this.isSelectAllActive = false;
                this.selectionStartLength = 0;
              }
              get finalSelectionStart() {
                if (this.isSelectAllActive) {
                  return [0, 0];
                } else if (this.selectionEnd && this.selectionStart && this.areSelectionValuesReversed()) {
                  return this.selectionEnd;
                } else {
                  return this.selectionStart;
                }
              }
              get finalSelectionEnd() {
                if (this.isSelectAllActive) {
                  return [this._bufferService.cols, this._bufferService.buffer.ybase + this._bufferService.rows - 1];
                }
                if (this.selectionStart) {
                  if (!this.selectionEnd || this.areSelectionValuesReversed()) {
                    const c = this.selectionStart[0] + this.selectionStartLength;
                    if (c > this._bufferService.cols) {
                      if (c % this._bufferService.cols == 0) {
                        return [this._bufferService.cols, this.selectionStart[1] + Math.floor(c / this._bufferService.cols) - 1];
                      } else {
                        return [c % this._bufferService.cols, this.selectionStart[1] + Math.floor(c / this._bufferService.cols)];
                      }
                    } else {
                      return [c, this.selectionStart[1]];
                    }
                  }
                  if (this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1]) {
                    const c = this.selectionStart[0] + this.selectionStartLength;
                    if (c > this._bufferService.cols) {
                      return [c % this._bufferService.cols, this.selectionStart[1] + Math.floor(c / this._bufferService.cols)];
                    } else {
                      return [Math.max(c, this.selectionEnd[0]), this.selectionEnd[1]];
                    }
                  }
                  return this.selectionEnd;
                }
              }
              areSelectionValuesReversed() {
                const c = this.selectionStart;
                const d = this.selectionEnd;
                return !!c && !!d && (c[1] > d[1] || c[1] === d[1] && c[0] > d[0]);
              }
              handleTrim(c) {
                if (this.selectionStart) {
                  this.selectionStart[1] -= c;
                }
                if (this.selectionEnd) {
                  this.selectionEnd[1] -= c;
                }
                if (this.selectionEnd && this.selectionEnd[1] < 0) {
                  this.clearSelection();
                  return true;
                } else {
                  if (this.selectionStart && this.selectionStart[1] < 0) {
                    this.selectionStart[1] = 0;
                  }
                  return false;
                }
              }
            };
          },
          428: function (h, a, c) {
            var d = this && this.__decorate || function (m, v, C, T) {
              var A;
              var M = arguments.length;
              var R = M < 3 ? v : T === null ? T = Object.getOwnPropertyDescriptor(v, C) : T;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                R = Reflect.decorate(m, v, C, T);
              } else {
                for (var I = m.length - 1; I >= 0; I--) {
                  if (A = m[I]) {
                    R = (M < 3 ? A(R) : M > 3 ? A(v, C, R) : A(v, C)) || R;
                  }
                }
              }
              if (M > 3 && R) {
                Object.defineProperty(v, C, R);
              }
              return R;
            };
            var p = this && this.__param || function (m, v) {
              return function (C, T) {
                v(C, T, m);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.CharSizeService = undefined;
            const f = c(2585);
            const S = c(8460);
            const _ = c(844);
            let x = a.CharSizeService = class extends _.Disposable {
              get hasValidSize() {
                return this.width > 0 && this.height > 0;
              }
              constructor(m, v, C) {
                super();
                this._optionsService = C;
                this.width = 0;
                this.height = 0;
                this._onCharSizeChange = this.register(new S.EventEmitter());
                this.onCharSizeChange = this._onCharSizeChange.event;
                try {
                  this._measureStrategy = this.register(new b(this._optionsService));
                } catch {
                  this._measureStrategy = this.register(new g(m, v, this._optionsService));
                }
                this.register(this._optionsService.onMultipleOptionChange(["fontFamily", "fontSize"], () => this.measure()));
              }
              measure() {
                const m = this._measureStrategy.measure();
                if (m.width !== this.width || m.height !== this.height) {
                  this.width = m.width;
                  this.height = m.height;
                  this._onCharSizeChange.fire();
                }
              }
            };
            a.CharSizeService = x = d([p(2, f.IOptionsService)], x);
            class w extends _.Disposable {
              constructor() {
                super(...arguments);
                this._result = {
                  width: 0,
                  height: 0
                };
              }
              _validateAndSet(v, C) {
                if (v !== undefined && v > 0 && C !== undefined && C > 0) {
                  this._result.width = v;
                  this._result.height = C;
                }
              }
            }
            class g extends w {
              constructor(v, C, T) {
                super();
                this._document = v;
                this._parentElement = C;
                this._optionsService = T;
                this._measureElement = this._document.createElement("span");
                this._measureElement.classList.add("xterm-char-measure-element");
                this._measureElement.textContent = "W".repeat(32);
                this._measureElement.setAttribute("aria-hidden", "true");
                this._measureElement.style.whiteSpace = "pre";
                this._measureElement.style.fontKerning = "none";
                this._parentElement.appendChild(this._measureElement);
              }
              measure() {
                this._measureElement.style.fontFamily = this._optionsService.rawOptions.fontFamily;
                this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`;
                this._validateAndSet(Number(this._measureElement.offsetWidth) / 32, Number(this._measureElement.offsetHeight));
                return this._result;
              }
            }
            class b extends w {
              constructor(v) {
                super();
                this._optionsService = v;
                this._canvas = new OffscreenCanvas(100, 100);
                this._ctx = this._canvas.getContext("2d");
                const C = this._ctx.measureText("W");
                if (!("width" in C) || !("fontBoundingBoxAscent" in C) || !("fontBoundingBoxDescent" in C)) {
                  throw new Error("Required font metrics not supported");
                }
              }
              measure() {
                this._ctx.font = `${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;
                const v = this._ctx.measureText("W");
                this._validateAndSet(v.width, v.fontBoundingBoxAscent + v.fontBoundingBoxDescent);
                return this._result;
              }
            }
          },
          4269: function (h, a, c) {
            var d = this && this.__decorate || function (b, m, v, C) {
              var T;
              var A = arguments.length;
              var M = A < 3 ? m : C === null ? C = Object.getOwnPropertyDescriptor(m, v) : C;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                M = Reflect.decorate(b, m, v, C);
              } else {
                for (var R = b.length - 1; R >= 0; R--) {
                  if (T = b[R]) {
                    M = (A < 3 ? T(M) : A > 3 ? T(m, v, M) : T(m, v)) || M;
                  }
                }
              }
              if (A > 3 && M) {
                Object.defineProperty(m, v, M);
              }
              return M;
            };
            var p = this && this.__param || function (b, m) {
              return function (v, C) {
                m(v, C, b);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.CharacterJoinerService = a.JoinedCellData = undefined;
            const f = c(3734);
            const S = c(643);
            const _ = c(511);
            const x = c(2585);
            class w extends f.AttributeData {
              constructor(m, v, C) {
                super();
                this.content = 0;
                this.combinedData = "";
                this.fg = m.fg;
                this.bg = m.bg;
                this.combinedData = v;
                this._width = C;
              }
              isCombined() {
                return 2097152;
              }
              getWidth() {
                return this._width;
              }
              getChars() {
                return this.combinedData;
              }
              getCode() {
                return 2097151;
              }
              setFromCharData(m) {
                throw new Error("not implemented");
              }
              getAsCharData() {
                return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
              }
            }
            a.JoinedCellData = w;
            let g = a.CharacterJoinerService = class I1 {
              constructor(m) {
                this._bufferService = m;
                this._characterJoiners = [];
                this._nextCharacterJoinerId = 0;
                this._workCell = new _.CellData();
              }
              register(m) {
                const v = {
                  id: this._nextCharacterJoinerId++,
                  handler: m
                };
                this._characterJoiners.push(v);
                return v.id;
              }
              deregister(m) {
                for (let v = 0; v < this._characterJoiners.length; v++) {
                  if (this._characterJoiners[v].id === m) {
                    this._characterJoiners.splice(v, 1);
                    return true;
                  }
                }
                return false;
              }
              getJoinedCharacters(m) {
                if (this._characterJoiners.length === 0) {
                  return [];
                }
                const v = this._bufferService.buffer.lines.get(m);
                if (!v || v.length === 0) {
                  return [];
                }
                const C = [];
                const T = v.translateToString(true);
                let A = 0;
                let M = 0;
                let R = 0;
                let I = v.getFg(0);
                let j = v.getBg(0);
                for (let W = 0; W < v.getTrimmedLength(); W++) {
                  v.loadCell(W, this._workCell);
                  if (this._workCell.getWidth() !== 0) {
                    if (this._workCell.fg !== I || this._workCell.bg !== j) {
                      if (W - A > 1) {
                        const z = this._getJoinedRanges(T, R, M, v, A);
                        for (let N = 0; N < z.length; N++) {
                          C.push(z[N]);
                        }
                      }
                      A = W;
                      R = M;
                      I = this._workCell.fg;
                      j = this._workCell.bg;
                    }
                    M += this._workCell.getChars().length || S.WHITESPACE_CELL_CHAR.length;
                  }
                }
                if (this._bufferService.cols - A > 1) {
                  const W = this._getJoinedRanges(T, R, M, v, A);
                  for (let z = 0; z < W.length; z++) {
                    C.push(W[z]);
                  }
                }
                return C;
              }
              _getJoinedRanges(m, v, C, T, A) {
                const M = m.substring(v, C);
                let R = [];
                try {
                  R = this._characterJoiners[0].handler(M);
                } catch (I) {
                  console.error(I);
                }
                for (let I = 1; I < this._characterJoiners.length; I++) {
                  try {
                    const j = this._characterJoiners[I].handler(M);
                    for (let W = 0; W < j.length; W++) {
                      I1._mergeRanges(R, j[W]);
                    }
                  } catch (j) {
                    console.error(j);
                  }
                }
                this._stringRangesToCellRanges(R, T, A);
                return R;
              }
              _stringRangesToCellRanges(m, v, C) {
                let T = 0;
                let A = false;
                let M = 0;
                let R = m[T];
                if (R) {
                  for (let I = C; I < this._bufferService.cols; I++) {
                    const j = v.getWidth(I);
                    const W = v.getString(I).length || S.WHITESPACE_CELL_CHAR.length;
                    if (j !== 0) {
                      if (!A && R[0] <= M) {
                        R[0] = I;
                        A = true;
                      }
                      if (R[1] <= M) {
                        R[1] = I;
                        R = m[++T];
                        if (!R) {
                          break;
                        }
                        if (R[0] <= M) {
                          R[0] = I;
                          A = true;
                        } else {
                          A = false;
                        }
                      }
                      M += W;
                    }
                  }
                  if (R) {
                    R[1] = this._bufferService.cols;
                  }
                }
              }
              static _mergeRanges(m, v) {
                let C = false;
                for (let T = 0; T < m.length; T++) {
                  const A = m[T];
                  if (C) {
                    if (v[1] <= A[0]) {
                      m[T - 1][1] = v[1];
                      return m;
                    }
                    if (v[1] <= A[1]) {
                      m[T - 1][1] = Math.max(v[1], A[1]);
                      m.splice(T, 1);
                      return m;
                    }
                    m.splice(T, 1);
                    T--;
                  } else {
                    if (v[1] <= A[0]) {
                      m.splice(T, 0, v);
                      return m;
                    }
                    if (v[1] <= A[1]) {
                      A[0] = Math.min(v[0], A[0]);
                      return m;
                    }
                    if (v[0] < A[1]) {
                      A[0] = Math.min(v[0], A[0]);
                      C = true;
                    }
                  }
                }
                if (C) {
                  m[m.length - 1][1] = v[1];
                } else {
                  m.push(v);
                }
                return m;
              }
            };
            a.CharacterJoinerService = g = d([p(0, x.IBufferService)], g);
          },
          5114: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.CoreBrowserService = undefined;
            const d = c(844);
            const p = c(8460);
            const f = c(3656);
            class S extends d.Disposable {
              constructor(w, g, b) {
                super();
                this._textarea = w;
                this._window = g;
                this.mainDocument = b;
                this._isFocused = false;
                this._cachedIsFocused = undefined;
                this._screenDprMonitor = new _(this._window);
                this._onDprChange = this.register(new p.EventEmitter());
                this.onDprChange = this._onDprChange.event;
                this._onWindowChange = this.register(new p.EventEmitter());
                this.onWindowChange = this._onWindowChange.event;
                this.register(this.onWindowChange(m => this._screenDprMonitor.setWindow(m)));
                this.register((0, p.forwardEvent)(this._screenDprMonitor.onDprChange, this._onDprChange));
                this._textarea.addEventListener("focus", () => this._isFocused = true);
                this._textarea.addEventListener("blur", () => this._isFocused = false);
              }
              get window() {
                return this._window;
              }
              set window(w) {
                if (this._window !== w) {
                  this._window = w;
                  this._onWindowChange.fire(this._window);
                }
              }
              get dpr() {
                return this.window.devicePixelRatio;
              }
              get isFocused() {
                if (this._cachedIsFocused === undefined) {
                  this._cachedIsFocused = this._isFocused && this._textarea.ownerDocument.hasFocus();
                  queueMicrotask(() => this._cachedIsFocused = undefined);
                }
                return this._cachedIsFocused;
              }
            }
            a.CoreBrowserService = S;
            class _ extends d.Disposable {
              constructor(w) {
                super();
                this._parentWindow = w;
                this._windowResizeListener = this.register(new d.MutableDisposable());
                this._onDprChange = this.register(new p.EventEmitter());
                this.onDprChange = this._onDprChange.event;
                this._outerListener = () => this._setDprAndFireIfDiffers();
                this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio;
                this._updateDpr();
                this._setWindowResizeListener();
                this.register((0, d.toDisposable)(() => this.clearListener()));
              }
              setWindow(w) {
                this._parentWindow = w;
                this._setWindowResizeListener();
                this._setDprAndFireIfDiffers();
              }
              _setWindowResizeListener() {
                this._windowResizeListener.value = (0, f.addDisposableDomListener)(this._parentWindow, "resize", () => this._setDprAndFireIfDiffers());
              }
              _setDprAndFireIfDiffers() {
                if (this._parentWindow.devicePixelRatio !== this._currentDevicePixelRatio) {
                  this._onDprChange.fire(this._parentWindow.devicePixelRatio);
                }
                this._updateDpr();
              }
              _updateDpr() {
                var w;
                if (this._outerListener) {
                  if ((w = this._resolutionMediaMatchList) != null) {
                    w.removeListener(this._outerListener);
                  }
                  this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio;
                  this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`);
                  this._resolutionMediaMatchList.addListener(this._outerListener);
                }
              }
              clearListener() {
                if (this._resolutionMediaMatchList && this._outerListener) {
                  this._resolutionMediaMatchList.removeListener(this._outerListener);
                  this._resolutionMediaMatchList = undefined;
                  this._outerListener = undefined;
                }
              }
            }
          },
          779: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.LinkProviderService = undefined;
            const d = c(844);
            class p extends d.Disposable {
              constructor() {
                super();
                this.linkProviders = [];
                this.register((0, d.toDisposable)(() => this.linkProviders.length = 0));
              }
              registerLinkProvider(S) {
                this.linkProviders.push(S);
                return {
                  dispose: () => {
                    const _ = this.linkProviders.indexOf(S);
                    if (_ !== -1) {
                      this.linkProviders.splice(_, 1);
                    }
                  }
                };
              }
            }
            a.LinkProviderService = p;
          },
          8934: function (h, a, c) {
            var d = this && this.__decorate || function (x, w, g, b) {
              var m;
              var v = arguments.length;
              var C = v < 3 ? w : b === null ? b = Object.getOwnPropertyDescriptor(w, g) : b;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                C = Reflect.decorate(x, w, g, b);
              } else {
                for (var T = x.length - 1; T >= 0; T--) {
                  if (m = x[T]) {
                    C = (v < 3 ? m(C) : v > 3 ? m(w, g, C) : m(w, g)) || C;
                  }
                }
              }
              if (v > 3 && C) {
                Object.defineProperty(w, g, C);
              }
              return C;
            };
            var p = this && this.__param || function (x, w) {
              return function (g, b) {
                w(g, b, x);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.MouseService = undefined;
            const f = c(4725);
            const S = c(9806);
            let _ = a.MouseService = class {
              constructor(x, w) {
                this._renderService = x;
                this._charSizeService = w;
              }
              getCoords(x, w, g, b, m) {
                return (0, S.getCoords)(window, x, w, g, b, this._charSizeService.hasValidSize, this._renderService.dimensions.css.cell.width, this._renderService.dimensions.css.cell.height, m);
              }
              getMouseReportCoords(x, w) {
                const g = (0, S.getCoordsRelativeToElement)(window, x, w);
                if (this._charSizeService.hasValidSize) {
                  g[0] = Math.min(Math.max(g[0], 0), this._renderService.dimensions.css.canvas.width - 1);
                  g[1] = Math.min(Math.max(g[1], 0), this._renderService.dimensions.css.canvas.height - 1);
                  return {
                    col: Math.floor(g[0] / this._renderService.dimensions.css.cell.width),
                    row: Math.floor(g[1] / this._renderService.dimensions.css.cell.height),
                    x: Math.floor(g[0]),
                    y: Math.floor(g[1])
                  };
                }
              }
            };
            a.MouseService = _ = d([p(0, f.IRenderService), p(1, f.ICharSizeService)], _);
          },
          3230: function (h, a, c) {
            var d = this && this.__decorate || function (m, v, C, T) {
              var A;
              var M = arguments.length;
              var R = M < 3 ? v : T === null ? T = Object.getOwnPropertyDescriptor(v, C) : T;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                R = Reflect.decorate(m, v, C, T);
              } else {
                for (var I = m.length - 1; I >= 0; I--) {
                  if (A = m[I]) {
                    R = (M < 3 ? A(R) : M > 3 ? A(v, C, R) : A(v, C)) || R;
                  }
                }
              }
              if (M > 3 && R) {
                Object.defineProperty(v, C, R);
              }
              return R;
            };
            var p = this && this.__param || function (m, v) {
              return function (C, T) {
                v(C, T, m);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.RenderService = undefined;
            const f = c(6193);
            const S = c(4725);
            const _ = c(8460);
            const x = c(844);
            const w = c(7226);
            const g = c(2585);
            let b = a.RenderService = class extends x.Disposable {
              get dimensions() {
                return this._renderer.value.dimensions;
              }
              constructor(m, v, C, T, A, M, R, I) {
                super();
                this._rowCount = m;
                this._charSizeService = T;
                this._renderer = this.register(new x.MutableDisposable());
                this._pausedResizeTask = new w.DebouncedIdleTask();
                this._observerDisposable = this.register(new x.MutableDisposable());
                this._isPaused = false;
                this._needsFullRefresh = false;
                this._isNextRenderRedrawOnly = true;
                this._needsSelectionRefresh = false;
                this._canvasWidth = 0;
                this._canvasHeight = 0;
                this._selectionState = {
                  start: undefined,
                  end: undefined,
                  columnSelectMode: false
                };
                this._onDimensionsChange = this.register(new _.EventEmitter());
                this.onDimensionsChange = this._onDimensionsChange.event;
                this._onRenderedViewportChange = this.register(new _.EventEmitter());
                this.onRenderedViewportChange = this._onRenderedViewportChange.event;
                this._onRender = this.register(new _.EventEmitter());
                this.onRender = this._onRender.event;
                this._onRefreshRequest = this.register(new _.EventEmitter());
                this.onRefreshRequest = this._onRefreshRequest.event;
                this._renderDebouncer = new f.RenderDebouncer((j, W) => this._renderRows(j, W), R);
                this.register(this._renderDebouncer);
                this.register(R.onDprChange(() => this.handleDevicePixelRatioChange()));
                this.register(M.onResize(() => this._fullRefresh()));
                this.register(M.buffers.onBufferActivate(() => {
                  var j;
                  if ((j = this._renderer.value) == null) {
                    return undefined;
                  } else {
                    return j.clear();
                  }
                }));
                this.register(C.onOptionChange(() => this._handleOptionsChanged()));
                this.register(this._charSizeService.onCharSizeChange(() => this.handleCharSizeChanged()));
                this.register(A.onDecorationRegistered(() => this._fullRefresh()));
                this.register(A.onDecorationRemoved(() => this._fullRefresh()));
                this.register(C.onMultipleOptionChange(["customGlyphs", "drawBoldTextInBrightColors", "letterSpacing", "lineHeight", "fontFamily", "fontSize", "fontWeight", "fontWeightBold", "minimumContrastRatio", "rescaleOverlappingGlyphs"], () => {
                  this.clear();
                  this.handleResize(M.cols, M.rows);
                  this._fullRefresh();
                }));
                this.register(C.onMultipleOptionChange(["cursorBlink", "cursorStyle"], () => this.refreshRows(M.buffer.y, M.buffer.y, true)));
                this.register(I.onChangeColors(() => this._fullRefresh()));
                this._registerIntersectionObserver(R.window, v);
                this.register(R.onWindowChange(j => this._registerIntersectionObserver(j, v)));
              }
              _registerIntersectionObserver(m, v) {
                if ("IntersectionObserver" in m) {
                  const C = new m.IntersectionObserver(T => this._handleIntersectionChange(T[T.length - 1]), {
                    threshold: 0
                  });
                  C.observe(v);
                  this._observerDisposable.value = (0, x.toDisposable)(() => C.disconnect());
                }
              }
              _handleIntersectionChange(m) {
                this._isPaused = m.isIntersecting === undefined ? m.intersectionRatio === 0 : !m.isIntersecting;
                if (!this._isPaused && !this._charSizeService.hasValidSize) {
                  this._charSizeService.measure();
                }
                if (!this._isPaused && this._needsFullRefresh) {
                  this._pausedResizeTask.flush();
                  this.refreshRows(0, this._rowCount - 1);
                  this._needsFullRefresh = false;
                }
              }
              refreshRows(m, v, C = false) {
                if (this._isPaused) {
                  this._needsFullRefresh = true;
                } else {
                  if (!C) {
                    this._isNextRenderRedrawOnly = false;
                  }
                  this._renderDebouncer.refresh(m, v, this._rowCount);
                }
              }
              _renderRows(m, v) {
                if (this._renderer.value) {
                  m = Math.min(m, this._rowCount - 1);
                  v = Math.min(v, this._rowCount - 1);
                  this._renderer.value.renderRows(m, v);
                  if (this._needsSelectionRefresh) {
                    this._renderer.value.handleSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode);
                    this._needsSelectionRefresh = false;
                  }
                  if (!this._isNextRenderRedrawOnly) {
                    this._onRenderedViewportChange.fire({
                      start: m,
                      end: v
                    });
                  }
                  this._onRender.fire({
                    start: m,
                    end: v
                  });
                  this._isNextRenderRedrawOnly = true;
                }
              }
              resize(m, v) {
                this._rowCount = v;
                this._fireOnCanvasResize();
              }
              _handleOptionsChanged() {
                if (this._renderer.value) {
                  this.refreshRows(0, this._rowCount - 1);
                  this._fireOnCanvasResize();
                }
              }
              _fireOnCanvasResize() {
                if (this._renderer.value) {
                  if (this._renderer.value.dimensions.css.canvas.width !== this._canvasWidth || this._renderer.value.dimensions.css.canvas.height !== this._canvasHeight) {
                    this._onDimensionsChange.fire(this._renderer.value.dimensions);
                  }
                }
              }
              hasRenderer() {
                return !!this._renderer.value;
              }
              setRenderer(m) {
                this._renderer.value = m;
                if (this._renderer.value) {
                  this._renderer.value.onRequestRedraw(v => this.refreshRows(v.start, v.end, true));
                  this._needsSelectionRefresh = true;
                  this._fullRefresh();
                }
              }
              addRefreshCallback(m) {
                return this._renderDebouncer.addRefreshCallback(m);
              }
              _fullRefresh() {
                if (this._isPaused) {
                  this._needsFullRefresh = true;
                } else {
                  this.refreshRows(0, this._rowCount - 1);
                }
              }
              clearTextureAtlas() {
                var m;
                var v;
                if (this._renderer.value) {
                  if ((v = (m = this._renderer.value).clearTextureAtlas) != null) {
                    v.call(m);
                  }
                  this._fullRefresh();
                }
              }
              handleDevicePixelRatioChange() {
                this._charSizeService.measure();
                if (this._renderer.value) {
                  this._renderer.value.handleDevicePixelRatioChange();
                  this.refreshRows(0, this._rowCount - 1);
                }
              }
              handleResize(m, v) {
                if (this._renderer.value) {
                  if (this._isPaused) {
                    this._pausedResizeTask.set(() => {
                      var C;
                      if ((C = this._renderer.value) == null) {
                        return undefined;
                      } else {
                        return C.handleResize(m, v);
                      }
                    });
                  } else {
                    this._renderer.value.handleResize(m, v);
                  }
                  this._fullRefresh();
                }
              }
              handleCharSizeChanged() {
                var m;
                if ((m = this._renderer.value) != null) {
                  m.handleCharSizeChanged();
                }
              }
              handleBlur() {
                var m;
                if ((m = this._renderer.value) != null) {
                  m.handleBlur();
                }
              }
              handleFocus() {
                var m;
                if ((m = this._renderer.value) != null) {
                  m.handleFocus();
                }
              }
              handleSelectionChanged(m, v, C) {
                var T;
                this._selectionState.start = m;
                this._selectionState.end = v;
                this._selectionState.columnSelectMode = C;
                if ((T = this._renderer.value) != null) {
                  T.handleSelectionChanged(m, v, C);
                }
              }
              handleCursorMove() {
                var m;
                if ((m = this._renderer.value) != null) {
                  m.handleCursorMove();
                }
              }
              clear() {
                var m;
                if ((m = this._renderer.value) != null) {
                  m.clear();
                }
              }
            };
            a.RenderService = b = d([p(2, g.IOptionsService), p(3, S.ICharSizeService), p(4, g.IDecorationService), p(5, g.IBufferService), p(6, S.ICoreBrowserService), p(7, S.IThemeService)], b);
          },
          9312: function (h, a, c) {
            var d = this && this.__decorate || function (R, I, j, W) {
              var z;
              var N = arguments.length;
              var D = N < 3 ? I : W === null ? W = Object.getOwnPropertyDescriptor(I, j) : W;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                D = Reflect.decorate(R, I, j, W);
              } else {
                for (var $ = R.length - 1; $ >= 0; $--) {
                  if (z = R[$]) {
                    D = (N < 3 ? z(D) : N > 3 ? z(I, j, D) : z(I, j)) || D;
                  }
                }
              }
              if (N > 3 && D) {
                Object.defineProperty(I, j, D);
              }
              return D;
            };
            var p = this && this.__param || function (R, I) {
              return function (j, W) {
                I(j, W, R);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.SelectionService = undefined;
            const f = c(9806);
            const S = c(9504);
            const _ = c(456);
            const x = c(4725);
            const w = c(8460);
            const g = c(844);
            const b = c(6114);
            const m = c(4841);
            const v = c(511);
            const C = c(2585);
            const T = "\xA0";
            const A = new RegExp(T, "g");
            let M = a.SelectionService = class extends g.Disposable {
              constructor(R, I, j, W, z, N, D, $, G) {
                super();
                this._element = R;
                this._screenElement = I;
                this._linkifier = j;
                this._bufferService = W;
                this._coreService = z;
                this._mouseService = N;
                this._optionsService = D;
                this._renderService = $;
                this._coreBrowserService = G;
                this._dragScrollAmount = 0;
                this._enabled = true;
                this._workCell = new v.CellData();
                this._mouseDownTimeStamp = 0;
                this._oldHasSelection = false;
                this._oldSelectionStart = undefined;
                this._oldSelectionEnd = undefined;
                this._onLinuxMouseSelection = this.register(new w.EventEmitter());
                this.onLinuxMouseSelection = this._onLinuxMouseSelection.event;
                this._onRedrawRequest = this.register(new w.EventEmitter());
                this.onRequestRedraw = this._onRedrawRequest.event;
                this._onSelectionChange = this.register(new w.EventEmitter());
                this.onSelectionChange = this._onSelectionChange.event;
                this._onRequestScrollLines = this.register(new w.EventEmitter());
                this.onRequestScrollLines = this._onRequestScrollLines.event;
                this._mouseMoveListener = q => this._handleMouseMove(q);
                this._mouseUpListener = q => this._handleMouseUp(q);
                this._coreService.onUserInput(() => {
                  if (this.hasSelection) {
                    this.clearSelection();
                  }
                });
                this._trimListener = this._bufferService.buffer.lines.onTrim(q => this._handleTrim(q));
                this.register(this._bufferService.buffers.onBufferActivate(q => this._handleBufferActivate(q)));
                this.enable();
                this._model = new _.SelectionModel(this._bufferService);
                this._activeSelectionMode = 0;
                this.register((0, g.toDisposable)(() => {
                  this._removeMouseDownListeners();
                }));
              }
              reset() {
                this.clearSelection();
              }
              disable() {
                this.clearSelection();
                this._enabled = false;
              }
              enable() {
                this._enabled = true;
              }
              get selectionStart() {
                return this._model.finalSelectionStart;
              }
              get selectionEnd() {
                return this._model.finalSelectionEnd;
              }
              get hasSelection() {
                const R = this._model.finalSelectionStart;
                const I = this._model.finalSelectionEnd;
                return !!R && !!I && (R[0] !== I[0] || R[1] !== I[1]);
              }
              get selectionText() {
                const R = this._model.finalSelectionStart;
                const I = this._model.finalSelectionEnd;
                if (!R || !I) {
                  return "";
                }
                const j = this._bufferService.buffer;
                const W = [];
                if (this._activeSelectionMode === 3) {
                  if (R[0] === I[0]) {
                    return "";
                  }
                  const z = R[0] < I[0] ? R[0] : I[0];
                  const N = R[0] < I[0] ? I[0] : R[0];
                  for (let D = R[1]; D <= I[1]; D++) {
                    const $ = j.translateBufferLineToString(D, true, z, N);
                    W.push($);
                  }
                } else {
                  const z = R[1] === I[1] ? I[0] : undefined;
                  W.push(j.translateBufferLineToString(R[1], true, R[0], z));
                  for (let N = R[1] + 1; N <= I[1] - 1; N++) {
                    const D = j.lines.get(N);
                    const $ = j.translateBufferLineToString(N, true);
                    if (D != null && D.isWrapped) {
                      W[W.length - 1] += $;
                    } else {
                      W.push($);
                    }
                  }
                  if (R[1] !== I[1]) {
                    const N = j.lines.get(I[1]);
                    const D = j.translateBufferLineToString(I[1], true, 0, I[0]);
                    if (N && N.isWrapped) {
                      W[W.length - 1] += D;
                    } else {
                      W.push(D);
                    }
                  }
                }
                return W.map(z => z.replace(A, " ")).join(b.isWindows ? `\r
` : `
`);
              }
              clearSelection() {
                this._model.clearSelection();
                this._removeMouseDownListeners();
                this.refresh();
                this._onSelectionChange.fire();
              }
              refresh(R) {
                this._refreshAnimationFrame ||= this._coreBrowserService.window.requestAnimationFrame(() => this._refresh());
                if (b.isLinux && R && this.selectionText.length) {
                  this._onLinuxMouseSelection.fire(this.selectionText);
                }
              }
              _refresh() {
                this._refreshAnimationFrame = undefined;
                this._onRedrawRequest.fire({
                  start: this._model.finalSelectionStart,
                  end: this._model.finalSelectionEnd,
                  columnSelectMode: this._activeSelectionMode === 3
                });
              }
              _isClickInSelection(R) {
                const I = this._getMouseBufferCoords(R);
                const j = this._model.finalSelectionStart;
                const W = this._model.finalSelectionEnd;
                return !!j && !!W && !!I && this._areCoordsInSelection(I, j, W);
              }
              isCellInSelection(R, I) {
                const j = this._model.finalSelectionStart;
                const W = this._model.finalSelectionEnd;
                return !!j && !!W && this._areCoordsInSelection([R, I], j, W);
              }
              _areCoordsInSelection(R, I, j) {
                return R[1] > I[1] && R[1] < j[1] || I[1] === j[1] && R[1] === I[1] && R[0] >= I[0] && R[0] < j[0] || I[1] < j[1] && R[1] === j[1] && R[0] < j[0] || I[1] < j[1] && R[1] === I[1] && R[0] >= I[0];
              }
              _selectWordAtCursor(R, I) {
                var z;
                var N;
                const j = (N = (z = this._linkifier.currentLink) == null ? undefined : z.link) == null ? undefined : N.range;
                if (j) {
                  this._model.selectionStart = [j.start.x - 1, j.start.y - 1];
                  this._model.selectionStartLength = (0, m.getRangeLength)(j, this._bufferService.cols);
                  this._model.selectionEnd = undefined;
                  return true;
                }
                const W = this._getMouseBufferCoords(R);
                return !!W && (this._selectWordAt(W, I), this._model.selectionEnd = undefined, true);
              }
              selectAll() {
                this._model.isSelectAllActive = true;
                this.refresh();
                this._onSelectionChange.fire();
              }
              selectLines(R, I) {
                this._model.clearSelection();
                R = Math.max(R, 0);
                I = Math.min(I, this._bufferService.buffer.lines.length - 1);
                this._model.selectionStart = [0, R];
                this._model.selectionEnd = [this._bufferService.cols, I];
                this.refresh();
                this._onSelectionChange.fire();
              }
              _handleTrim(R) {
                if (this._model.handleTrim(R)) {
                  this.refresh();
                }
              }
              _getMouseBufferCoords(R) {
                const I = this._mouseService.getCoords(R, this._screenElement, this._bufferService.cols, this._bufferService.rows, true);
                if (I) {
                  I[0]--;
                  I[1]--;
                  I[1] += this._bufferService.buffer.ydisp;
                  return I;
                }
              }
              _getMouseEventScrollAmount(R) {
                let I = (0, f.getCoordsRelativeToElement)(this._coreBrowserService.window, R, this._screenElement)[1];
                const j = this._renderService.dimensions.css.canvas.height;
                if (I >= 0 && I <= j) {
                  return 0;
                } else {
                  if (I > j) {
                    I -= j;
                  }
                  I = Math.min(Math.max(I, -50), 50);
                  I /= 50;
                  return I / Math.abs(I) + Math.round(I * 14);
                }
              }
              shouldForceSelection(R) {
                if (b.isMac) {
                  return R.altKey && this._optionsService.rawOptions.macOptionClickForcesSelection;
                } else {
                  return R.shiftKey;
                }
              }
              handleMouseDown(R) {
                this._mouseDownTimeStamp = R.timeStamp;
                if ((R.button !== 2 || !this.hasSelection) && R.button === 0) {
                  if (!this._enabled) {
                    if (!this.shouldForceSelection(R)) {
                      return;
                    }
                    R.stopPropagation();
                  }
                  R.preventDefault();
                  this._dragScrollAmount = 0;
                  if (this._enabled && R.shiftKey) {
                    this._handleIncrementalClick(R);
                  } else if (R.detail === 1) {
                    this._handleSingleClick(R);
                  } else if (R.detail === 2) {
                    this._handleDoubleClick(R);
                  } else if (R.detail === 3) {
                    this._handleTripleClick(R);
                  }
                  this._addMouseDownListeners();
                  this.refresh(true);
                }
              }
              _addMouseDownListeners() {
                if (this._screenElement.ownerDocument) {
                  this._screenElement.ownerDocument.addEventListener("mousemove", this._mouseMoveListener);
                  this._screenElement.ownerDocument.addEventListener("mouseup", this._mouseUpListener);
                }
                this._dragScrollIntervalTimer = this._coreBrowserService.window.setInterval(() => this._dragScroll(), 50);
              }
              _removeMouseDownListeners() {
                if (this._screenElement.ownerDocument) {
                  this._screenElement.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener);
                  this._screenElement.ownerDocument.removeEventListener("mouseup", this._mouseUpListener);
                }
                this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer);
                this._dragScrollIntervalTimer = undefined;
              }
              _handleIncrementalClick(R) {
                if (this._model.selectionStart) {
                  this._model.selectionEnd = this._getMouseBufferCoords(R);
                }
              }
              _handleSingleClick(R) {
                this._model.selectionStartLength = 0;
                this._model.isSelectAllActive = false;
                this._activeSelectionMode = this.shouldColumnSelect(R) ? 3 : 0;
                this._model.selectionStart = this._getMouseBufferCoords(R);
                if (!this._model.selectionStart) {
                  return;
                }
                this._model.selectionEnd = undefined;
                const I = this._bufferService.buffer.lines.get(this._model.selectionStart[1]);
                if (I && I.length !== this._model.selectionStart[0] && I.hasWidth(this._model.selectionStart[0]) === 0) {
                  this._model.selectionStart[0]++;
                }
              }
              _handleDoubleClick(R) {
                if (this._selectWordAtCursor(R, true)) {
                  this._activeSelectionMode = 1;
                }
              }
              _handleTripleClick(R) {
                const I = this._getMouseBufferCoords(R);
                if (I) {
                  this._activeSelectionMode = 2;
                  this._selectLineAt(I[1]);
                }
              }
              shouldColumnSelect(R) {
                return R.altKey && (!b.isMac || !this._optionsService.rawOptions.macOptionClickForcesSelection);
              }
              _handleMouseMove(R) {
                R.stopImmediatePropagation();
                if (!this._model.selectionStart) {
                  return;
                }
                const I = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
                this._model.selectionEnd = this._getMouseBufferCoords(R);
                if (!this._model.selectionEnd) {
                  this.refresh(true);
                  return;
                }
                if (this._activeSelectionMode === 2) {
                  if (this._model.selectionEnd[1] < this._model.selectionStart[1]) {
                    this._model.selectionEnd[0] = 0;
                  } else {
                    this._model.selectionEnd[0] = this._bufferService.cols;
                  }
                } else if (this._activeSelectionMode === 1) {
                  this._selectToWordAt(this._model.selectionEnd);
                }
                this._dragScrollAmount = this._getMouseEventScrollAmount(R);
                if (this._activeSelectionMode !== 3) {
                  if (this._dragScrollAmount > 0) {
                    this._model.selectionEnd[0] = this._bufferService.cols;
                  } else if (this._dragScrollAmount < 0) {
                    this._model.selectionEnd[0] = 0;
                  }
                }
                const j = this._bufferService.buffer;
                if (this._model.selectionEnd[1] < j.lines.length) {
                  const W = j.lines.get(this._model.selectionEnd[1]);
                  if (W && W.hasWidth(this._model.selectionEnd[0]) === 0 && this._model.selectionEnd[0] < this._bufferService.cols) {
                    this._model.selectionEnd[0]++;
                  }
                }
                if (!I || I[0] !== this._model.selectionEnd[0] || I[1] !== this._model.selectionEnd[1]) {
                  this.refresh(true);
                }
              }
              _dragScroll() {
                if (this._model.selectionEnd && this._model.selectionStart && this._dragScrollAmount) {
                  this._onRequestScrollLines.fire({
                    amount: this._dragScrollAmount,
                    suppressScrollEvent: false
                  });
                  const R = this._bufferService.buffer;
                  if (this._dragScrollAmount > 0) {
                    if (this._activeSelectionMode !== 3) {
                      this._model.selectionEnd[0] = this._bufferService.cols;
                    }
                    this._model.selectionEnd[1] = Math.min(R.ydisp + this._bufferService.rows, R.lines.length - 1);
                  } else {
                    if (this._activeSelectionMode !== 3) {
                      this._model.selectionEnd[0] = 0;
                    }
                    this._model.selectionEnd[1] = R.ydisp;
                  }
                  this.refresh();
                }
              }
              _handleMouseUp(R) {
                const I = R.timeStamp - this._mouseDownTimeStamp;
                this._removeMouseDownListeners();
                if (this.selectionText.length <= 1 && I < 500 && R.altKey && this._optionsService.rawOptions.altClickMovesCursor) {
                  if (this._bufferService.buffer.ybase === this._bufferService.buffer.ydisp) {
                    const j = this._mouseService.getCoords(R, this._element, this._bufferService.cols, this._bufferService.rows, false);
                    if (j && j[0] !== undefined && j[1] !== undefined) {
                      const W = (0, S.moveToCellSequence)(j[0] - 1, j[1] - 1, this._bufferService, this._coreService.decPrivateModes.applicationCursorKeys);
                      this._coreService.triggerDataEvent(W, true);
                    }
                  }
                } else {
                  this._fireEventIfSelectionChanged();
                }
              }
              _fireEventIfSelectionChanged() {
                const R = this._model.finalSelectionStart;
                const I = this._model.finalSelectionEnd;
                const j = !!R && !!I && (R[0] !== I[0] || R[1] !== I[1]);
                if (j) {
                  if (R && I) {
                    if (!this._oldSelectionStart || !this._oldSelectionEnd || R[0] !== this._oldSelectionStart[0] || R[1] !== this._oldSelectionStart[1] || I[0] !== this._oldSelectionEnd[0] || I[1] !== this._oldSelectionEnd[1]) {
                      this._fireOnSelectionChange(R, I, j);
                    }
                  }
                } else if (this._oldHasSelection) {
                  this._fireOnSelectionChange(R, I, j);
                }
              }
              _fireOnSelectionChange(R, I, j) {
                this._oldSelectionStart = R;
                this._oldSelectionEnd = I;
                this._oldHasSelection = j;
                this._onSelectionChange.fire();
              }
              _handleBufferActivate(R) {
                this.clearSelection();
                this._trimListener.dispose();
                this._trimListener = R.activeBuffer.lines.onTrim(I => this._handleTrim(I));
              }
              _convertViewportColToCharacterIndex(R, I) {
                let j = I;
                for (let W = 0; I >= W; W++) {
                  const z = R.loadCell(W, this._workCell).getChars().length;
                  if (this._workCell.getWidth() === 0) {
                    j--;
                  } else if (z > 1 && I !== W) {
                    j += z - 1;
                  }
                }
                return j;
              }
              setSelection(R, I, j) {
                this._model.clearSelection();
                this._removeMouseDownListeners();
                this._model.selectionStart = [R, I];
                this._model.selectionStartLength = j;
                this.refresh();
                this._fireEventIfSelectionChanged();
              }
              rightClickSelect(R) {
                if (!this._isClickInSelection(R)) {
                  if (this._selectWordAtCursor(R, false)) {
                    this.refresh(true);
                  }
                  this._fireEventIfSelectionChanged();
                }
              }
              _getWordAt(R, I, j = true, W = true) {
                if (R[0] >= this._bufferService.cols) {
                  return;
                }
                const z = this._bufferService.buffer;
                const N = z.lines.get(R[1]);
                if (!N) {
                  return;
                }
                const D = z.translateBufferLineToString(R[1], false);
                let $ = this._convertViewportColToCharacterIndex(N, R[0]);
                let G = $;
                const q = R[0] - $;
                let U = 0;
                let L = 0;
                let F = 0;
                let P = 0;
                if (D.charAt($) === " ") {
                  while ($ > 0 && D.charAt($ - 1) === " ") {
                    $--;
                  }
                  while (G < D.length && D.charAt(G + 1) === " ") {
                    G++;
                  }
                } else {
                  let J = R[0];
                  let ne = R[0];
                  if (N.getWidth(J) === 0) {
                    U++;
                    J--;
                  }
                  if (N.getWidth(ne) === 2) {
                    L++;
                    ne++;
                  }
                  const ue = N.getString(ne).length;
                  for (ue > 1 && (P += ue - 1, G += ue - 1); J > 0 && $ > 0 && !this._isCharWordSeparator(N.loadCell(J - 1, this._workCell));) {
                    N.loadCell(J - 1, this._workCell);
                    const ee = this._workCell.getChars().length;
                    if (this._workCell.getWidth() === 0) {
                      U++;
                      J--;
                    } else if (ee > 1) {
                      F += ee - 1;
                      $ -= ee - 1;
                    }
                    $--;
                    J--;
                  }
                  while (ne < N.length && G + 1 < D.length && !this._isCharWordSeparator(N.loadCell(ne + 1, this._workCell))) {
                    N.loadCell(ne + 1, this._workCell);
                    const ee = this._workCell.getChars().length;
                    if (this._workCell.getWidth() === 2) {
                      L++;
                      ne++;
                    } else if (ee > 1) {
                      P += ee - 1;
                      G += ee - 1;
                    }
                    G++;
                    ne++;
                  }
                }
                G++;
                let V = $ + q - U + F;
                let Z = Math.min(this._bufferService.cols, G - $ + U + L - F - P);
                if (I || D.slice($, G).trim() !== "") {
                  if (j && V === 0 && N.getCodePoint(0) !== 32) {
                    const J = z.lines.get(R[1] - 1);
                    if (J && N.isWrapped && J.getCodePoint(this._bufferService.cols - 1) !== 32) {
                      const ne = this._getWordAt([this._bufferService.cols - 1, R[1] - 1], false, true, false);
                      if (ne) {
                        const ue = this._bufferService.cols - ne.start;
                        V -= ue;
                        Z += ue;
                      }
                    }
                  }
                  if (W && V + Z === this._bufferService.cols && N.getCodePoint(this._bufferService.cols - 1) !== 32) {
                    const J = z.lines.get(R[1] + 1);
                    if (J != null && J.isWrapped && J.getCodePoint(0) !== 32) {
                      const ne = this._getWordAt([0, R[1] + 1], false, false, true);
                      if (ne) {
                        Z += ne.length;
                      }
                    }
                  }
                  return {
                    start: V,
                    length: Z
                  };
                }
              }
              _selectWordAt(R, I) {
                const j = this._getWordAt(R, I);
                if (j) {
                  while (j.start < 0) {
                    j.start += this._bufferService.cols;
                    R[1]--;
                  }
                  this._model.selectionStart = [j.start, R[1]];
                  this._model.selectionStartLength = j.length;
                }
              }
              _selectToWordAt(R) {
                const I = this._getWordAt(R, true);
                if (I) {
                  let j = R[1];
                  while (I.start < 0) {
                    I.start += this._bufferService.cols;
                    j--;
                  }
                  if (!this._model.areSelectionValuesReversed()) {
                    while (I.start + I.length > this._bufferService.cols) {
                      I.length -= this._bufferService.cols;
                      j++;
                    }
                  }
                  this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? I.start : I.start + I.length, j];
                }
              }
              _isCharWordSeparator(R) {
                return R.getWidth() !== 0 && this._optionsService.rawOptions.wordSeparator.indexOf(R.getChars()) >= 0;
              }
              _selectLineAt(R) {
                const I = this._bufferService.buffer.getWrappedRangeForLine(R);
                const j = {
                  start: {
                    x: 0,
                    y: I.first
                  },
                  end: {
                    x: this._bufferService.cols - 1,
                    y: I.last
                  }
                };
                this._model.selectionStart = [0, I.first];
                this._model.selectionEnd = undefined;
                this._model.selectionStartLength = (0, m.getRangeLength)(j, this._bufferService.cols);
              }
            };
            a.SelectionService = M = d([p(3, C.IBufferService), p(4, C.ICoreService), p(5, x.IMouseService), p(6, C.IOptionsService), p(7, x.IRenderService), p(8, x.ICoreBrowserService)], M);
          },
          4725: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.ILinkProviderService = a.IThemeService = a.ICharacterJoinerService = a.ISelectionService = a.IRenderService = a.IMouseService = a.ICoreBrowserService = a.ICharSizeService = undefined;
            const d = c(8343);
            a.ICharSizeService = (0, d.createDecorator)("CharSizeService");
            a.ICoreBrowserService = (0, d.createDecorator)("CoreBrowserService");
            a.IMouseService = (0, d.createDecorator)("MouseService");
            a.IRenderService = (0, d.createDecorator)("RenderService");
            a.ISelectionService = (0, d.createDecorator)("SelectionService");
            a.ICharacterJoinerService = (0, d.createDecorator)("CharacterJoinerService");
            a.IThemeService = (0, d.createDecorator)("ThemeService");
            a.ILinkProviderService = (0, d.createDecorator)("LinkProviderService");
          },
          6731: function (h, a, c) {
            var d = this && this.__decorate || function (M, R, I, j) {
              var W;
              var z = arguments.length;
              var N = z < 3 ? R : j === null ? j = Object.getOwnPropertyDescriptor(R, I) : j;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                N = Reflect.decorate(M, R, I, j);
              } else {
                for (var D = M.length - 1; D >= 0; D--) {
                  if (W = M[D]) {
                    N = (z < 3 ? W(N) : z > 3 ? W(R, I, N) : W(R, I)) || N;
                  }
                }
              }
              if (z > 3 && N) {
                Object.defineProperty(R, I, N);
              }
              return N;
            };
            var p = this && this.__param || function (M, R) {
              return function (I, j) {
                R(I, j, M);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.ThemeService = a.DEFAULT_ANSI_COLORS = undefined;
            const f = c(7239);
            const S = c(8055);
            const _ = c(8460);
            const x = c(844);
            const w = c(2585);
            const g = S.css.toColor("#ffffff");
            const b = S.css.toColor("#000000");
            const m = S.css.toColor("#ffffff");
            const v = S.css.toColor("#000000");
            const C = {
              css: "rgba(255, 255, 255, 0.3)",
              rgba: 4294967117
            };
            a.DEFAULT_ANSI_COLORS = Object.freeze((() => {
              const M = [S.css.toColor("#2e3436"), S.css.toColor("#cc0000"), S.css.toColor("#4e9a06"), S.css.toColor("#c4a000"), S.css.toColor("#3465a4"), S.css.toColor("#75507b"), S.css.toColor("#06989a"), S.css.toColor("#d3d7cf"), S.css.toColor("#555753"), S.css.toColor("#ef2929"), S.css.toColor("#8ae234"), S.css.toColor("#fce94f"), S.css.toColor("#729fcf"), S.css.toColor("#ad7fa8"), S.css.toColor("#34e2e2"), S.css.toColor("#eeeeec")];
              const R = [0, 95, 135, 175, 215, 255];
              for (let I = 0; I < 216; I++) {
                const j = R[I / 36 % 6 | 0];
                const W = R[I / 6 % 6 | 0];
                const z = R[I % 6];
                M.push({
                  css: S.channels.toCss(j, W, z),
                  rgba: S.channels.toRgba(j, W, z)
                });
              }
              for (let I = 0; I < 24; I++) {
                const j = 8 + I * 10;
                M.push({
                  css: S.channels.toCss(j, j, j),
                  rgba: S.channels.toRgba(j, j, j)
                });
              }
              return M;
            })());
            let T = a.ThemeService = class extends x.Disposable {
              get colors() {
                return this._colors;
              }
              constructor(M) {
                super();
                this._optionsService = M;
                this._contrastCache = new f.ColorContrastCache();
                this._halfContrastCache = new f.ColorContrastCache();
                this._onChangeColors = this.register(new _.EventEmitter());
                this.onChangeColors = this._onChangeColors.event;
                this._colors = {
                  foreground: g,
                  background: b,
                  cursor: m,
                  cursorAccent: v,
                  selectionForeground: undefined,
                  selectionBackgroundTransparent: C,
                  selectionBackgroundOpaque: S.color.blend(b, C),
                  selectionInactiveBackgroundTransparent: C,
                  selectionInactiveBackgroundOpaque: S.color.blend(b, C),
                  ansi: a.DEFAULT_ANSI_COLORS.slice(),
                  contrastCache: this._contrastCache,
                  halfContrastCache: this._halfContrastCache
                };
                this._updateRestoreColors();
                this._setTheme(this._optionsService.rawOptions.theme);
                this.register(this._optionsService.onSpecificOptionChange("minimumContrastRatio", () => this._contrastCache.clear()));
                this.register(this._optionsService.onSpecificOptionChange("theme", () => this._setTheme(this._optionsService.rawOptions.theme)));
              }
              _setTheme(M = {}) {
                const R = this._colors;
                R.foreground = A(M.foreground, g);
                R.background = A(M.background, b);
                R.cursor = A(M.cursor, m);
                R.cursorAccent = A(M.cursorAccent, v);
                R.selectionBackgroundTransparent = A(M.selectionBackground, C);
                R.selectionBackgroundOpaque = S.color.blend(R.background, R.selectionBackgroundTransparent);
                R.selectionInactiveBackgroundTransparent = A(M.selectionInactiveBackground, R.selectionBackgroundTransparent);
                R.selectionInactiveBackgroundOpaque = S.color.blend(R.background, R.selectionInactiveBackgroundTransparent);
                R.selectionForeground = M.selectionForeground ? A(M.selectionForeground, S.NULL_COLOR) : undefined;
                if (R.selectionForeground === S.NULL_COLOR) {
                  R.selectionForeground = undefined;
                }
                if (S.color.isOpaque(R.selectionBackgroundTransparent)) {
                  R.selectionBackgroundTransparent = S.color.opacity(R.selectionBackgroundTransparent, 0.3);
                }
                if (S.color.isOpaque(R.selectionInactiveBackgroundTransparent)) {
                  R.selectionInactiveBackgroundTransparent = S.color.opacity(R.selectionInactiveBackgroundTransparent, 0.3);
                }
                R.ansi = a.DEFAULT_ANSI_COLORS.slice();
                R.ansi[0] = A(M.black, a.DEFAULT_ANSI_COLORS[0]);
                R.ansi[1] = A(M.red, a.DEFAULT_ANSI_COLORS[1]);
                R.ansi[2] = A(M.green, a.DEFAULT_ANSI_COLORS[2]);
                R.ansi[3] = A(M.yellow, a.DEFAULT_ANSI_COLORS[3]);
                R.ansi[4] = A(M.blue, a.DEFAULT_ANSI_COLORS[4]);
                R.ansi[5] = A(M.magenta, a.DEFAULT_ANSI_COLORS[5]);
                R.ansi[6] = A(M.cyan, a.DEFAULT_ANSI_COLORS[6]);
                R.ansi[7] = A(M.white, a.DEFAULT_ANSI_COLORS[7]);
                R.ansi[8] = A(M.brightBlack, a.DEFAULT_ANSI_COLORS[8]);
                R.ansi[9] = A(M.brightRed, a.DEFAULT_ANSI_COLORS[9]);
                R.ansi[10] = A(M.brightGreen, a.DEFAULT_ANSI_COLORS[10]);
                R.ansi[11] = A(M.brightYellow, a.DEFAULT_ANSI_COLORS[11]);
                R.ansi[12] = A(M.brightBlue, a.DEFAULT_ANSI_COLORS[12]);
                R.ansi[13] = A(M.brightMagenta, a.DEFAULT_ANSI_COLORS[13]);
                R.ansi[14] = A(M.brightCyan, a.DEFAULT_ANSI_COLORS[14]);
                R.ansi[15] = A(M.brightWhite, a.DEFAULT_ANSI_COLORS[15]);
                if (M.extendedAnsi) {
                  const I = Math.min(R.ansi.length - 16, M.extendedAnsi.length);
                  for (let j = 0; j < I; j++) {
                    R.ansi[j + 16] = A(M.extendedAnsi[j], a.DEFAULT_ANSI_COLORS[j + 16]);
                  }
                }
                this._contrastCache.clear();
                this._halfContrastCache.clear();
                this._updateRestoreColors();
                this._onChangeColors.fire(this.colors);
              }
              restoreColor(M) {
                this._restoreColor(M);
                this._onChangeColors.fire(this.colors);
              }
              _restoreColor(M) {
                if (M !== undefined) {
                  switch (M) {
                    case 256:
                      this._colors.foreground = this._restoreColors.foreground;
                      break;
                    case 257:
                      this._colors.background = this._restoreColors.background;
                      break;
                    case 258:
                      this._colors.cursor = this._restoreColors.cursor;
                      break;
                    default:
                      this._colors.ansi[M] = this._restoreColors.ansi[M];
                  }
                } else {
                  for (let R = 0; R < this._restoreColors.ansi.length; ++R) {
                    this._colors.ansi[R] = this._restoreColors.ansi[R];
                  }
                }
              }
              modifyColors(M) {
                M(this._colors);
                this._onChangeColors.fire(this.colors);
              }
              _updateRestoreColors() {
                this._restoreColors = {
                  foreground: this._colors.foreground,
                  background: this._colors.background,
                  cursor: this._colors.cursor,
                  ansi: this._colors.ansi.slice()
                };
              }
            };
            function A(M, R) {
              if (M !== undefined) {
                try {
                  return S.css.toColor(M);
                } catch {}
              }
              return R;
            }
            a.ThemeService = T = d([p(0, w.IOptionsService)], T);
          },
          6349: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.CircularList = undefined;
            const d = c(8460);
            const p = c(844);
            class f extends p.Disposable {
              constructor(_) {
                super();
                this._maxLength = _;
                this.onDeleteEmitter = this.register(new d.EventEmitter());
                this.onDelete = this.onDeleteEmitter.event;
                this.onInsertEmitter = this.register(new d.EventEmitter());
                this.onInsert = this.onInsertEmitter.event;
                this.onTrimEmitter = this.register(new d.EventEmitter());
                this.onTrim = this.onTrimEmitter.event;
                this._array = new Array(this._maxLength);
                this._startIndex = 0;
                this._length = 0;
              }
              get maxLength() {
                return this._maxLength;
              }
              set maxLength(_) {
                if (this._maxLength === _) {
                  return;
                }
                const x = new Array(_);
                for (let w = 0; w < Math.min(_, this.length); w++) {
                  x[w] = this._array[this._getCyclicIndex(w)];
                }
                this._array = x;
                this._maxLength = _;
                this._startIndex = 0;
              }
              get length() {
                return this._length;
              }
              set length(_) {
                if (_ > this._length) {
                  for (let x = this._length; x < _; x++) {
                    this._array[x] = undefined;
                  }
                }
                this._length = _;
              }
              get(_) {
                return this._array[this._getCyclicIndex(_)];
              }
              set(_, x) {
                this._array[this._getCyclicIndex(_)] = x;
              }
              push(_) {
                this._array[this._getCyclicIndex(this._length)] = _;
                if (this._length === this._maxLength) {
                  this._startIndex = ++this._startIndex % this._maxLength;
                  this.onTrimEmitter.fire(1);
                } else {
                  this._length++;
                }
              }
              recycle() {
                if (this._length !== this._maxLength) {
                  throw new Error("Can only recycle when the buffer is full");
                }
                this._startIndex = ++this._startIndex % this._maxLength;
                this.onTrimEmitter.fire(1);
                return this._array[this._getCyclicIndex(this._length - 1)];
              }
              get isFull() {
                return this._length === this._maxLength;
              }
              pop() {
                return this._array[this._getCyclicIndex(this._length-- - 1)];
              }
              splice(_, x, ...w) {
                if (x) {
                  for (let g = _; g < this._length - x; g++) {
                    this._array[this._getCyclicIndex(g)] = this._array[this._getCyclicIndex(g + x)];
                  }
                  this._length -= x;
                  this.onDeleteEmitter.fire({
                    index: _,
                    amount: x
                  });
                }
                for (let g = this._length - 1; g >= _; g--) {
                  this._array[this._getCyclicIndex(g + w.length)] = this._array[this._getCyclicIndex(g)];
                }
                for (let g = 0; g < w.length; g++) {
                  this._array[this._getCyclicIndex(_ + g)] = w[g];
                }
                if (w.length) {
                  this.onInsertEmitter.fire({
                    index: _,
                    amount: w.length
                  });
                }
                if (this._length + w.length > this._maxLength) {
                  const g = this._length + w.length - this._maxLength;
                  this._startIndex += g;
                  this._length = this._maxLength;
                  this.onTrimEmitter.fire(g);
                } else {
                  this._length += w.length;
                }
              }
              trimStart(_) {
                if (_ > this._length) {
                  _ = this._length;
                }
                this._startIndex += _;
                this._length -= _;
                this.onTrimEmitter.fire(_);
              }
              shiftElements(_, x, w) {
                if (!(x <= 0)) {
                  if (_ < 0 || _ >= this._length) {
                    throw new Error("start argument out of range");
                  }
                  if (_ + w < 0) {
                    throw new Error("Cannot shift elements in list beyond index 0");
                  }
                  if (w > 0) {
                    for (let b = x - 1; b >= 0; b--) {
                      this.set(_ + b + w, this.get(_ + b));
                    }
                    const g = _ + x + w - this._length;
                    if (g > 0) {
                      for (this._length += g; this._length > this._maxLength;) {
                        this._length--;
                        this._startIndex++;
                        this.onTrimEmitter.fire(1);
                      }
                    }
                  } else {
                    for (let g = 0; g < x; g++) {
                      this.set(_ + g + w, this.get(_ + g));
                    }
                  }
                }
              }
              _getCyclicIndex(_) {
                return (this._startIndex + _) % this._maxLength;
              }
            }
            a.CircularList = f;
          },
          1439: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.clone = undefined;
            a.clone = function c(d, p = 5) {
              if (typeof d != "object") {
                return d;
              }
              const f = Array.isArray(d) ? [] : {};
              for (const S in d) {
                f[S] = p <= 1 ? d[S] : d[S] && c(d[S], p - 1);
              }
              return f;
            };
          },
          8055: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.contrastRatio = a.toPaddedHex = a.rgba = a.rgb = a.css = a.color = a.channels = a.NULL_COLOR = undefined;
            let c = 0;
            let d = 0;
            let p = 0;
            let f = 0;
            var S;
            var _;
            var x;
            var w;
            var g;
            function b(v) {
              const C = v.toString(16);
              if (C.length < 2) {
                return "0" + C;
              } else {
                return C;
              }
            }
            function m(v, C) {
              if (v < C) {
                return (C + 0.05) / (v + 0.05);
              } else {
                return (v + 0.05) / (C + 0.05);
              }
            }
            a.NULL_COLOR = {
              css: "#00000000",
              rgba: 0
            };
            (function (v) {
              v.toCss = function (C, T, A, M) {
                if (M !== undefined) {
                  return `#${b(C)}${b(T)}${b(A)}${b(M)}`;
                } else {
                  return `#${b(C)}${b(T)}${b(A)}`;
                }
              };
              v.toRgba = function (C, T, A, M = 255) {
                return (C << 24 | T << 16 | A << 8 | M) >>> 0;
              };
              v.toColor = function (C, T, A, M) {
                return {
                  css: v.toCss(C, T, A, M),
                  rgba: v.toRgba(C, T, A, M)
                };
              };
            })(S || (a.channels = S = {}));
            (function (v) {
              function C(T, A) {
                f = Math.round(A * 255);
                [c, d, p] = g.toChannels(T.rgba);
                return {
                  css: S.toCss(c, d, p, f),
                  rgba: S.toRgba(c, d, p, f)
                };
              }
              v.blend = function (T, A) {
                f = (A.rgba & 255) / 255;
                if (f === 1) {
                  return {
                    css: A.css,
                    rgba: A.rgba
                  };
                }
                const M = A.rgba >> 24 & 255;
                const R = A.rgba >> 16 & 255;
                const I = A.rgba >> 8 & 255;
                const j = T.rgba >> 24 & 255;
                const W = T.rgba >> 16 & 255;
                const z = T.rgba >> 8 & 255;
                c = j + Math.round((M - j) * f);
                d = W + Math.round((R - W) * f);
                p = z + Math.round((I - z) * f);
                return {
                  css: S.toCss(c, d, p),
                  rgba: S.toRgba(c, d, p)
                };
              };
              v.isOpaque = function (T) {
                return (T.rgba & 255) == 255;
              };
              v.ensureContrastRatio = function (T, A, M) {
                const R = g.ensureContrastRatio(T.rgba, A.rgba, M);
                if (R) {
                  return S.toColor(R >> 24 & 255, R >> 16 & 255, R >> 8 & 255);
                }
              };
              v.opaque = function (T) {
                const A = (T.rgba | 255) >>> 0;
                [c, d, p] = g.toChannels(A);
                return {
                  css: S.toCss(c, d, p),
                  rgba: A
                };
              };
              v.opacity = C;
              v.multiplyOpacity = function (T, A) {
                f = T.rgba & 255;
                return C(T, f * A / 255);
              };
              v.toColorRGB = function (T) {
                return [T.rgba >> 24 & 255, T.rgba >> 16 & 255, T.rgba >> 8 & 255];
              };
            })(_ || (a.color = _ = {}));
            (function (v) {
              let C;
              let T;
              try {
                const A = document.createElement("canvas");
                A.width = 1;
                A.height = 1;
                const M = A.getContext("2d", {
                  willReadFrequently: true
                });
                if (M) {
                  C = M;
                  C.globalCompositeOperation = "copy";
                  T = C.createLinearGradient(0, 0, 1, 1);
                }
              } catch {}
              v.toColor = function (A) {
                if (A.match(/#[\da-f]{3,8}/i)) {
                  switch (A.length) {
                    case 4:
                      c = parseInt(A.slice(1, 2).repeat(2), 16);
                      d = parseInt(A.slice(2, 3).repeat(2), 16);
                      p = parseInt(A.slice(3, 4).repeat(2), 16);
                      return S.toColor(c, d, p);
                    case 5:
                      c = parseInt(A.slice(1, 2).repeat(2), 16);
                      d = parseInt(A.slice(2, 3).repeat(2), 16);
                      p = parseInt(A.slice(3, 4).repeat(2), 16);
                      f = parseInt(A.slice(4, 5).repeat(2), 16);
                      return S.toColor(c, d, p, f);
                    case 7:
                      return {
                        css: A,
                        rgba: (parseInt(A.slice(1), 16) << 8 | 255) >>> 0
                      };
                    case 9:
                      return {
                        css: A,
                        rgba: parseInt(A.slice(1), 16) >>> 0
                      };
                  }
                }
                const M = A.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
                if (M) {
                  c = parseInt(M[1]);
                  d = parseInt(M[2]);
                  p = parseInt(M[3]);
                  f = Math.round((M[5] === undefined ? 1 : parseFloat(M[5])) * 255);
                  return S.toColor(c, d, p, f);
                }
                if (!C || !T) {
                  throw new Error("css.toColor: Unsupported css format");
                }
                C.fillStyle = T;
                C.fillStyle = A;
                if (typeof C.fillStyle != "string") {
                  throw new Error("css.toColor: Unsupported css format");
                }
                C.fillRect(0, 0, 1, 1);
                [c, d, p, f] = C.getImageData(0, 0, 1, 1).data;
                if (f !== 255) {
                  throw new Error("css.toColor: Unsupported css format");
                }
                return {
                  rgba: S.toRgba(c, d, p, f),
                  css: A
                };
              };
            })(x || (a.css = x = {}));
            (function (v) {
              function C(T, A, M) {
                const R = T / 255;
                const I = A / 255;
                const j = M / 255;
                return (R <= 0.03928 ? R / 12.92 : Math.pow((R + 0.055) / 1.055, 2.4)) * 0.2126 + (I <= 0.03928 ? I / 12.92 : Math.pow((I + 0.055) / 1.055, 2.4)) * 0.7152 + (j <= 0.03928 ? j / 12.92 : Math.pow((j + 0.055) / 1.055, 2.4)) * 0.0722;
              }
              v.relativeLuminance = function (T) {
                return C(T >> 16 & 255, T >> 8 & 255, T & 255);
              };
              v.relativeLuminance2 = C;
            })(w || (a.rgb = w = {}));
            (function (v) {
              function C(A, M, R) {
                const I = A >> 24 & 255;
                const j = A >> 16 & 255;
                const W = A >> 8 & 255;
                let z = M >> 24 & 255;
                let N = M >> 16 & 255;
                let D = M >> 8 & 255;
                let $ = m(w.relativeLuminance2(z, N, D), w.relativeLuminance2(I, j, W));
                while ($ < R && (z > 0 || N > 0 || D > 0)) {
                  z -= Math.max(0, Math.ceil(z * 0.1));
                  N -= Math.max(0, Math.ceil(N * 0.1));
                  D -= Math.max(0, Math.ceil(D * 0.1));
                  $ = m(w.relativeLuminance2(z, N, D), w.relativeLuminance2(I, j, W));
                }
                return (z << 24 | N << 16 | D << 8 | 255) >>> 0;
              }
              function T(A, M, R) {
                const I = A >> 24 & 255;
                const j = A >> 16 & 255;
                const W = A >> 8 & 255;
                let z = M >> 24 & 255;
                let N = M >> 16 & 255;
                let D = M >> 8 & 255;
                let $ = m(w.relativeLuminance2(z, N, D), w.relativeLuminance2(I, j, W));
                while ($ < R && (z < 255 || N < 255 || D < 255)) {
                  z = Math.min(255, z + Math.ceil((255 - z) * 0.1));
                  N = Math.min(255, N + Math.ceil((255 - N) * 0.1));
                  D = Math.min(255, D + Math.ceil((255 - D) * 0.1));
                  $ = m(w.relativeLuminance2(z, N, D), w.relativeLuminance2(I, j, W));
                }
                return (z << 24 | N << 16 | D << 8 | 255) >>> 0;
              }
              v.blend = function (A, M) {
                f = (M & 255) / 255;
                if (f === 1) {
                  return M;
                }
                const R = M >> 24 & 255;
                const I = M >> 16 & 255;
                const j = M >> 8 & 255;
                const W = A >> 24 & 255;
                const z = A >> 16 & 255;
                const N = A >> 8 & 255;
                c = W + Math.round((R - W) * f);
                d = z + Math.round((I - z) * f);
                p = N + Math.round((j - N) * f);
                return S.toRgba(c, d, p);
              };
              v.ensureContrastRatio = function (A, M, R) {
                const I = w.relativeLuminance(A >> 8);
                const j = w.relativeLuminance(M >> 8);
                if (m(I, j) < R) {
                  if (j < I) {
                    const N = C(A, M, R);
                    const D = m(I, w.relativeLuminance(N >> 8));
                    if (D < R) {
                      const $ = T(A, M, R);
                      if (D > m(I, w.relativeLuminance($ >> 8))) {
                        return N;
                      } else {
                        return $;
                      }
                    }
                    return N;
                  }
                  const W = T(A, M, R);
                  const z = m(I, w.relativeLuminance(W >> 8));
                  if (z < R) {
                    const N = C(A, M, R);
                    if (z > m(I, w.relativeLuminance(N >> 8))) {
                      return W;
                    } else {
                      return N;
                    }
                  }
                  return W;
                }
              };
              v.reduceLuminance = C;
              v.increaseLuminance = T;
              v.toChannels = function (A) {
                return [A >> 24 & 255, A >> 16 & 255, A >> 8 & 255, A & 255];
              };
            })(g || (a.rgba = g = {}));
            a.toPaddedHex = b;
            a.contrastRatio = m;
          },
          8969: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.CoreTerminal = undefined;
            const d = c(844);
            const p = c(2585);
            const f = c(4348);
            const S = c(7866);
            const _ = c(744);
            const x = c(7302);
            const w = c(6975);
            const g = c(8460);
            const b = c(1753);
            const m = c(1480);
            const v = c(7994);
            const C = c(9282);
            const T = c(5435);
            const A = c(5981);
            const M = c(2660);
            let R = false;
            class I extends d.Disposable {
              get onScroll() {
                if (!this._onScrollApi) {
                  this._onScrollApi = this.register(new g.EventEmitter());
                  this._onScroll.event(W => {
                    var z;
                    if ((z = this._onScrollApi) != null) {
                      z.fire(W.position);
                    }
                  });
                }
                return this._onScrollApi.event;
              }
              get cols() {
                return this._bufferService.cols;
              }
              get rows() {
                return this._bufferService.rows;
              }
              get buffers() {
                return this._bufferService.buffers;
              }
              get options() {
                return this.optionsService.options;
              }
              set options(W) {
                for (const z in W) {
                  this.optionsService.options[z] = W[z];
                }
              }
              constructor(W) {
                super();
                this._windowsWrappingHeuristics = this.register(new d.MutableDisposable());
                this._onBinary = this.register(new g.EventEmitter());
                this.onBinary = this._onBinary.event;
                this._onData = this.register(new g.EventEmitter());
                this.onData = this._onData.event;
                this._onLineFeed = this.register(new g.EventEmitter());
                this.onLineFeed = this._onLineFeed.event;
                this._onResize = this.register(new g.EventEmitter());
                this.onResize = this._onResize.event;
                this._onWriteParsed = this.register(new g.EventEmitter());
                this.onWriteParsed = this._onWriteParsed.event;
                this._onScroll = this.register(new g.EventEmitter());
                this._instantiationService = new f.InstantiationService();
                this.optionsService = this.register(new x.OptionsService(W));
                this._instantiationService.setService(p.IOptionsService, this.optionsService);
                this._bufferService = this.register(this._instantiationService.createInstance(_.BufferService));
                this._instantiationService.setService(p.IBufferService, this._bufferService);
                this._logService = this.register(this._instantiationService.createInstance(S.LogService));
                this._instantiationService.setService(p.ILogService, this._logService);
                this.coreService = this.register(this._instantiationService.createInstance(w.CoreService));
                this._instantiationService.setService(p.ICoreService, this.coreService);
                this.coreMouseService = this.register(this._instantiationService.createInstance(b.CoreMouseService));
                this._instantiationService.setService(p.ICoreMouseService, this.coreMouseService);
                this.unicodeService = this.register(this._instantiationService.createInstance(m.UnicodeService));
                this._instantiationService.setService(p.IUnicodeService, this.unicodeService);
                this._charsetService = this._instantiationService.createInstance(v.CharsetService);
                this._instantiationService.setService(p.ICharsetService, this._charsetService);
                this._oscLinkService = this._instantiationService.createInstance(M.OscLinkService);
                this._instantiationService.setService(p.IOscLinkService, this._oscLinkService);
                this._inputHandler = this.register(new T.InputHandler(this._bufferService, this._charsetService, this.coreService, this._logService, this.optionsService, this._oscLinkService, this.coreMouseService, this.unicodeService));
                this.register((0, g.forwardEvent)(this._inputHandler.onLineFeed, this._onLineFeed));
                this.register(this._inputHandler);
                this.register((0, g.forwardEvent)(this._bufferService.onResize, this._onResize));
                this.register((0, g.forwardEvent)(this.coreService.onData, this._onData));
                this.register((0, g.forwardEvent)(this.coreService.onBinary, this._onBinary));
                this.register(this.coreService.onRequestScrollToBottom(() => this.scrollToBottom()));
                this.register(this.coreService.onUserInput(() => this._writeBuffer.handleUserInput()));
                this.register(this.optionsService.onMultipleOptionChange(["windowsMode", "windowsPty"], () => this._handleWindowsPtyOptionChange()));
                this.register(this._bufferService.onScroll(z => {
                  this._onScroll.fire({
                    position: this._bufferService.buffer.ydisp,
                    source: 0
                  });
                  this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
                }));
                this.register(this._inputHandler.onScroll(z => {
                  this._onScroll.fire({
                    position: this._bufferService.buffer.ydisp,
                    source: 0
                  });
                  this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
                }));
                this._writeBuffer = this.register(new A.WriteBuffer((z, N) => this._inputHandler.parse(z, N)));
                this.register((0, g.forwardEvent)(this._writeBuffer.onWriteParsed, this._onWriteParsed));
              }
              write(W, z) {
                this._writeBuffer.write(W, z);
              }
              writeSync(W, z) {
                if (this._logService.logLevel <= p.LogLevelEnum.WARN && !R) {
                  this._logService.warn("writeSync is unreliable and will be removed soon.");
                  R = true;
                }
                this._writeBuffer.writeSync(W, z);
              }
              input(W, z = true) {
                this.coreService.triggerDataEvent(W, z);
              }
              resize(W, z) {
                if (!isNaN(W) && !isNaN(z)) {
                  W = Math.max(W, _.MINIMUM_COLS);
                  z = Math.max(z, _.MINIMUM_ROWS);
                  this._bufferService.resize(W, z);
                }
              }
              scroll(W, z = false) {
                this._bufferService.scroll(W, z);
              }
              scrollLines(W, z, N) {
                this._bufferService.scrollLines(W, z, N);
              }
              scrollPages(W) {
                this.scrollLines(W * (this.rows - 1));
              }
              scrollToTop() {
                this.scrollLines(-this._bufferService.buffer.ydisp);
              }
              scrollToBottom() {
                this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
              }
              scrollToLine(W) {
                const z = W - this._bufferService.buffer.ydisp;
                if (z !== 0) {
                  this.scrollLines(z);
                }
              }
              registerEscHandler(W, z) {
                return this._inputHandler.registerEscHandler(W, z);
              }
              registerDcsHandler(W, z) {
                return this._inputHandler.registerDcsHandler(W, z);
              }
              registerCsiHandler(W, z) {
                return this._inputHandler.registerCsiHandler(W, z);
              }
              registerOscHandler(W, z) {
                return this._inputHandler.registerOscHandler(W, z);
              }
              _setup() {
                this._handleWindowsPtyOptionChange();
              }
              reset() {
                this._inputHandler.reset();
                this._bufferService.reset();
                this._charsetService.reset();
                this.coreService.reset();
                this.coreMouseService.reset();
              }
              _handleWindowsPtyOptionChange() {
                let W = false;
                const z = this.optionsService.rawOptions.windowsPty;
                if (z && z.buildNumber !== undefined && z.buildNumber !== undefined) {
                  W = z.backend === "conpty" && z.buildNumber < 21376;
                } else if (this.optionsService.rawOptions.windowsMode) {
                  W = true;
                }
                if (W) {
                  this._enableWindowsWrappingHeuristics();
                } else {
                  this._windowsWrappingHeuristics.clear();
                }
              }
              _enableWindowsWrappingHeuristics() {
                if (!this._windowsWrappingHeuristics.value) {
                  const W = [];
                  W.push(this.onLineFeed(C.updateWindowsModeWrappedState.bind(null, this._bufferService)));
                  W.push(this.registerCsiHandler({
                    final: "H"
                  }, () => {
                    (0, C.updateWindowsModeWrappedState)(this._bufferService);
                    return false;
                  }));
                  this._windowsWrappingHeuristics.value = (0, d.toDisposable)(() => {
                    for (const z of W) {
                      z.dispose();
                    }
                  });
                }
              }
            }
            a.CoreTerminal = I;
          },
          8460: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.runAndSubscribe = a.forwardEvent = a.EventEmitter = undefined;
            a.EventEmitter = class {
              constructor() {
                this._listeners = [];
                this._disposed = false;
              }
              get event() {
                this._event ||= c => {
                  this._listeners.push(c);
                  return {
                    dispose: () => {
                      if (!this._disposed) {
                        for (let d = 0; d < this._listeners.length; d++) {
                          if (this._listeners[d] === c) {
                            this._listeners.splice(d, 1);
                            return;
                          }
                        }
                      }
                    }
                  };
                };
                return this._event;
              }
              fire(c, d) {
                const p = [];
                for (let f = 0; f < this._listeners.length; f++) {
                  p.push(this._listeners[f]);
                }
                for (let f = 0; f < p.length; f++) {
                  p[f].call(undefined, c, d);
                }
              }
              dispose() {
                this.clearListeners();
                this._disposed = true;
              }
              clearListeners() {
                if (this._listeners) {
                  this._listeners.length = 0;
                }
              }
            };
            a.forwardEvent = function (c, d) {
              return c(p => d.fire(p));
            };
            a.runAndSubscribe = function (c, d) {
              d(undefined);
              return c(p => d(p));
            };
          },
          5435: function (h, a, c) {
            var d = this && this.__decorate || function (U, L, F, P) {
              var V;
              var Z = arguments.length;
              var J = Z < 3 ? L : P === null ? P = Object.getOwnPropertyDescriptor(L, F) : P;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                J = Reflect.decorate(U, L, F, P);
              } else {
                for (var ne = U.length - 1; ne >= 0; ne--) {
                  if (V = U[ne]) {
                    J = (Z < 3 ? V(J) : Z > 3 ? V(L, F, J) : V(L, F)) || J;
                  }
                }
              }
              if (Z > 3 && J) {
                Object.defineProperty(L, F, J);
              }
              return J;
            };
            var p = this && this.__param || function (U, L) {
              return function (F, P) {
                L(F, P, U);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.InputHandler = a.WindowsOptionsReportType = undefined;
            const f = c(2584);
            const S = c(7116);
            const _ = c(2015);
            const x = c(844);
            const w = c(482);
            const g = c(8437);
            const b = c(8460);
            const m = c(643);
            const v = c(511);
            const C = c(3734);
            const T = c(2585);
            const A = c(1480);
            const M = c(6242);
            const R = c(6351);
            const I = c(5941);
            const j = {
              "(": 0,
              ")": 1,
              "*": 2,
              "+": 3,
              "-": 1,
              ".": 2
            };
            const W = 131072;
            function z(U, L) {
              if (U > 24) {
                return L.setWinLines || false;
              }
              switch (U) {
                case 1:
                  return !!L.restoreWin;
                case 2:
                  return !!L.minimizeWin;
                case 3:
                  return !!L.setWinPosition;
                case 4:
                  return !!L.setWinSizePixels;
                case 5:
                  return !!L.raiseWin;
                case 6:
                  return !!L.lowerWin;
                case 7:
                  return !!L.refreshWin;
                case 8:
                  return !!L.setWinSizeChars;
                case 9:
                  return !!L.maximizeWin;
                case 10:
                  return !!L.fullscreenWin;
                case 11:
                  return !!L.getWinState;
                case 13:
                  return !!L.getWinPosition;
                case 14:
                  return !!L.getWinSizePixels;
                case 15:
                  return !!L.getScreenSizePixels;
                case 16:
                  return !!L.getCellSizePixels;
                case 18:
                  return !!L.getWinSizeChars;
                case 19:
                  return !!L.getScreenSizeChars;
                case 20:
                  return !!L.getIconTitle;
                case 21:
                  return !!L.getWinTitle;
                case 22:
                  return !!L.pushTitle;
                case 23:
                  return !!L.popTitle;
                case 24:
                  return !!L.setWinLines;
              }
              return false;
            }
            var N;
            (function (U) {
              U[U.GET_WIN_SIZE_PIXELS = 0] = "GET_WIN_SIZE_PIXELS";
              U[U.GET_CELL_SIZE_PIXELS = 1] = "GET_CELL_SIZE_PIXELS";
            })(N || (a.WindowsOptionsReportType = N = {}));
            let D = 0;
            class $ extends x.Disposable {
              getAttrData() {
                return this._curAttrData;
              }
              constructor(L, F, P, V, Z, J, ne, ue, ee = new _.EscapeSequenceParser()) {
                super();
                this._bufferService = L;
                this._charsetService = F;
                this._coreService = P;
                this._logService = V;
                this._optionsService = Z;
                this._oscLinkService = J;
                this._coreMouseService = ne;
                this._unicodeService = ue;
                this._parser = ee;
                this._parseBuffer = new Uint32Array(4096);
                this._stringDecoder = new w.StringToUtf32();
                this._utf8Decoder = new w.Utf8ToUtf32();
                this._workCell = new v.CellData();
                this._windowTitle = "";
                this._iconName = "";
                this._windowTitleStack = [];
                this._iconNameStack = [];
                this._curAttrData = g.DEFAULT_ATTR_DATA.clone();
                this._eraseAttrDataInternal = g.DEFAULT_ATTR_DATA.clone();
                this._onRequestBell = this.register(new b.EventEmitter());
                this.onRequestBell = this._onRequestBell.event;
                this._onRequestRefreshRows = this.register(new b.EventEmitter());
                this.onRequestRefreshRows = this._onRequestRefreshRows.event;
                this._onRequestReset = this.register(new b.EventEmitter());
                this.onRequestReset = this._onRequestReset.event;
                this._onRequestSendFocus = this.register(new b.EventEmitter());
                this.onRequestSendFocus = this._onRequestSendFocus.event;
                this._onRequestSyncScrollBar = this.register(new b.EventEmitter());
                this.onRequestSyncScrollBar = this._onRequestSyncScrollBar.event;
                this._onRequestWindowsOptionsReport = this.register(new b.EventEmitter());
                this.onRequestWindowsOptionsReport = this._onRequestWindowsOptionsReport.event;
                this._onA11yChar = this.register(new b.EventEmitter());
                this.onA11yChar = this._onA11yChar.event;
                this._onA11yTab = this.register(new b.EventEmitter());
                this.onA11yTab = this._onA11yTab.event;
                this._onCursorMove = this.register(new b.EventEmitter());
                this.onCursorMove = this._onCursorMove.event;
                this._onLineFeed = this.register(new b.EventEmitter());
                this.onLineFeed = this._onLineFeed.event;
                this._onScroll = this.register(new b.EventEmitter());
                this.onScroll = this._onScroll.event;
                this._onTitleChange = this.register(new b.EventEmitter());
                this.onTitleChange = this._onTitleChange.event;
                this._onColor = this.register(new b.EventEmitter());
                this.onColor = this._onColor.event;
                this._parseStack = {
                  paused: false,
                  cursorStartX: 0,
                  cursorStartY: 0,
                  decodedLength: 0,
                  position: 0
                };
                this._specialColors = [256, 257, 258];
                this.register(this._parser);
                this._dirtyRowTracker = new G(this._bufferService);
                this._activeBuffer = this._bufferService.buffer;
                this.register(this._bufferService.buffers.onBufferActivate(Y => this._activeBuffer = Y.activeBuffer));
                this._parser.setCsiHandlerFallback((Y, re) => {
                  this._logService.debug("Unknown CSI code: ", {
                    identifier: this._parser.identToString(Y),
                    params: re.toArray()
                  });
                });
                this._parser.setEscHandlerFallback(Y => {
                  this._logService.debug("Unknown ESC code: ", {
                    identifier: this._parser.identToString(Y)
                  });
                });
                this._parser.setExecuteHandlerFallback(Y => {
                  this._logService.debug("Unknown EXECUTE code: ", {
                    code: Y
                  });
                });
                this._parser.setOscHandlerFallback((Y, re, ce) => {
                  this._logService.debug("Unknown OSC code: ", {
                    identifier: Y,
                    action: re,
                    data: ce
                  });
                });
                this._parser.setDcsHandlerFallback((Y, re, ce) => {
                  if (re === "HOOK") {
                    ce = ce.toArray();
                  }
                  this._logService.debug("Unknown DCS code: ", {
                    identifier: this._parser.identToString(Y),
                    action: re,
                    payload: ce
                  });
                });
                this._parser.setPrintHandler((Y, re, ce) => this.print(Y, re, ce));
                this._parser.registerCsiHandler({
                  final: "@"
                }, Y => this.insertChars(Y));
                this._parser.registerCsiHandler({
                  intermediates: " ",
                  final: "@"
                }, Y => this.scrollLeft(Y));
                this._parser.registerCsiHandler({
                  final: "A"
                }, Y => this.cursorUp(Y));
                this._parser.registerCsiHandler({
                  intermediates: " ",
                  final: "A"
                }, Y => this.scrollRight(Y));
                this._parser.registerCsiHandler({
                  final: "B"
                }, Y => this.cursorDown(Y));
                this._parser.registerCsiHandler({
                  final: "C"
                }, Y => this.cursorForward(Y));
                this._parser.registerCsiHandler({
                  final: "D"
                }, Y => this.cursorBackward(Y));
                this._parser.registerCsiHandler({
                  final: "E"
                }, Y => this.cursorNextLine(Y));
                this._parser.registerCsiHandler({
                  final: "F"
                }, Y => this.cursorPrecedingLine(Y));
                this._parser.registerCsiHandler({
                  final: "G"
                }, Y => this.cursorCharAbsolute(Y));
                this._parser.registerCsiHandler({
                  final: "H"
                }, Y => this.cursorPosition(Y));
                this._parser.registerCsiHandler({
                  final: "I"
                }, Y => this.cursorForwardTab(Y));
                this._parser.registerCsiHandler({
                  final: "J"
                }, Y => this.eraseInDisplay(Y, false));
                this._parser.registerCsiHandler({
                  prefix: "?",
                  final: "J"
                }, Y => this.eraseInDisplay(Y, true));
                this._parser.registerCsiHandler({
                  final: "K"
                }, Y => this.eraseInLine(Y, false));
                this._parser.registerCsiHandler({
                  prefix: "?",
                  final: "K"
                }, Y => this.eraseInLine(Y, true));
                this._parser.registerCsiHandler({
                  final: "L"
                }, Y => this.insertLines(Y));
                this._parser.registerCsiHandler({
                  final: "M"
                }, Y => this.deleteLines(Y));
                this._parser.registerCsiHandler({
                  final: "P"
                }, Y => this.deleteChars(Y));
                this._parser.registerCsiHandler({
                  final: "S"
                }, Y => this.scrollUp(Y));
                this._parser.registerCsiHandler({
                  final: "T"
                }, Y => this.scrollDown(Y));
                this._parser.registerCsiHandler({
                  final: "X"
                }, Y => this.eraseChars(Y));
                this._parser.registerCsiHandler({
                  final: "Z"
                }, Y => this.cursorBackwardTab(Y));
                this._parser.registerCsiHandler({
                  final: "`"
                }, Y => this.charPosAbsolute(Y));
                this._parser.registerCsiHandler({
                  final: "a"
                }, Y => this.hPositionRelative(Y));
                this._parser.registerCsiHandler({
                  final: "b"
                }, Y => this.repeatPrecedingCharacter(Y));
                this._parser.registerCsiHandler({
                  final: "c"
                }, Y => this.sendDeviceAttributesPrimary(Y));
                this._parser.registerCsiHandler({
                  prefix: ">",
                  final: "c"
                }, Y => this.sendDeviceAttributesSecondary(Y));
                this._parser.registerCsiHandler({
                  final: "d"
                }, Y => this.linePosAbsolute(Y));
                this._parser.registerCsiHandler({
                  final: "e"
                }, Y => this.vPositionRelative(Y));
                this._parser.registerCsiHandler({
                  final: "f"
                }, Y => this.hVPosition(Y));
                this._parser.registerCsiHandler({
                  final: "g"
                }, Y => this.tabClear(Y));
                this._parser.registerCsiHandler({
                  final: "h"
                }, Y => this.setMode(Y));
                this._parser.registerCsiHandler({
                  prefix: "?",
                  final: "h"
                }, Y => this.setModePrivate(Y));
                this._parser.registerCsiHandler({
                  final: "l"
                }, Y => this.resetMode(Y));
                this._parser.registerCsiHandler({
                  prefix: "?",
                  final: "l"
                }, Y => this.resetModePrivate(Y));
                this._parser.registerCsiHandler({
                  final: "m"
                }, Y => this.charAttributes(Y));
                this._parser.registerCsiHandler({
                  final: "n"
                }, Y => this.deviceStatus(Y));
                this._parser.registerCsiHandler({
                  prefix: "?",
                  final: "n"
                }, Y => this.deviceStatusPrivate(Y));
                this._parser.registerCsiHandler({
                  intermediates: "!",
                  final: "p"
                }, Y => this.softReset(Y));
                this._parser.registerCsiHandler({
                  intermediates: " ",
                  final: "q"
                }, Y => this.setCursorStyle(Y));
                this._parser.registerCsiHandler({
                  final: "r"
                }, Y => this.setScrollRegion(Y));
                this._parser.registerCsiHandler({
                  final: "s"
                }, Y => this.saveCursor(Y));
                this._parser.registerCsiHandler({
                  final: "t"
                }, Y => this.windowOptions(Y));
                this._parser.registerCsiHandler({
                  final: "u"
                }, Y => this.restoreCursor(Y));
                this._parser.registerCsiHandler({
                  intermediates: "'",
                  final: "}"
                }, Y => this.insertColumns(Y));
                this._parser.registerCsiHandler({
                  intermediates: "'",
                  final: "~"
                }, Y => this.deleteColumns(Y));
                this._parser.registerCsiHandler({
                  intermediates: "\"",
                  final: "q"
                }, Y => this.selectProtected(Y));
                this._parser.registerCsiHandler({
                  intermediates: "$",
                  final: "p"
                }, Y => this.requestMode(Y, true));
                this._parser.registerCsiHandler({
                  prefix: "?",
                  intermediates: "$",
                  final: "p"
                }, Y => this.requestMode(Y, false));
                this._parser.setExecuteHandler(f.C0.BEL, () => this.bell());
                this._parser.setExecuteHandler(f.C0.LF, () => this.lineFeed());
                this._parser.setExecuteHandler(f.C0.VT, () => this.lineFeed());
                this._parser.setExecuteHandler(f.C0.FF, () => this.lineFeed());
                this._parser.setExecuteHandler(f.C0.CR, () => this.carriageReturn());
                this._parser.setExecuteHandler(f.C0.BS, () => this.backspace());
                this._parser.setExecuteHandler(f.C0.HT, () => this.tab());
                this._parser.setExecuteHandler(f.C0.SO, () => this.shiftOut());
                this._parser.setExecuteHandler(f.C0.SI, () => this.shiftIn());
                this._parser.setExecuteHandler(f.C1.IND, () => this.index());
                this._parser.setExecuteHandler(f.C1.NEL, () => this.nextLine());
                this._parser.setExecuteHandler(f.C1.HTS, () => this.tabSet());
                this._parser.registerOscHandler(0, new M.OscHandler(Y => {
                  this.setTitle(Y);
                  this.setIconName(Y);
                  return true;
                }));
                this._parser.registerOscHandler(1, new M.OscHandler(Y => this.setIconName(Y)));
                this._parser.registerOscHandler(2, new M.OscHandler(Y => this.setTitle(Y)));
                this._parser.registerOscHandler(4, new M.OscHandler(Y => this.setOrReportIndexedColor(Y)));
                this._parser.registerOscHandler(8, new M.OscHandler(Y => this.setHyperlink(Y)));
                this._parser.registerOscHandler(10, new M.OscHandler(Y => this.setOrReportFgColor(Y)));
                this._parser.registerOscHandler(11, new M.OscHandler(Y => this.setOrReportBgColor(Y)));
                this._parser.registerOscHandler(12, new M.OscHandler(Y => this.setOrReportCursorColor(Y)));
                this._parser.registerOscHandler(104, new M.OscHandler(Y => this.restoreIndexedColor(Y)));
                this._parser.registerOscHandler(110, new M.OscHandler(Y => this.restoreFgColor(Y)));
                this._parser.registerOscHandler(111, new M.OscHandler(Y => this.restoreBgColor(Y)));
                this._parser.registerOscHandler(112, new M.OscHandler(Y => this.restoreCursorColor(Y)));
                this._parser.registerEscHandler({
                  final: "7"
                }, () => this.saveCursor());
                this._parser.registerEscHandler({
                  final: "8"
                }, () => this.restoreCursor());
                this._parser.registerEscHandler({
                  final: "D"
                }, () => this.index());
                this._parser.registerEscHandler({
                  final: "E"
                }, () => this.nextLine());
                this._parser.registerEscHandler({
                  final: "H"
                }, () => this.tabSet());
                this._parser.registerEscHandler({
                  final: "M"
                }, () => this.reverseIndex());
                this._parser.registerEscHandler({
                  final: "="
                }, () => this.keypadApplicationMode());
                this._parser.registerEscHandler({
                  final: ">"
                }, () => this.keypadNumericMode());
                this._parser.registerEscHandler({
                  final: "c"
                }, () => this.fullReset());
                this._parser.registerEscHandler({
                  final: "n"
                }, () => this.setgLevel(2));
                this._parser.registerEscHandler({
                  final: "o"
                }, () => this.setgLevel(3));
                this._parser.registerEscHandler({
                  final: "|"
                }, () => this.setgLevel(3));
                this._parser.registerEscHandler({
                  final: "}"
                }, () => this.setgLevel(2));
                this._parser.registerEscHandler({
                  final: "~"
                }, () => this.setgLevel(1));
                this._parser.registerEscHandler({
                  intermediates: "%",
                  final: "@"
                }, () => this.selectDefaultCharset());
                this._parser.registerEscHandler({
                  intermediates: "%",
                  final: "G"
                }, () => this.selectDefaultCharset());
                for (const Y in S.CHARSETS) {
                  this._parser.registerEscHandler({
                    intermediates: "(",
                    final: Y
                  }, () => this.selectCharset("(" + Y));
                  this._parser.registerEscHandler({
                    intermediates: ")",
                    final: Y
                  }, () => this.selectCharset(")" + Y));
                  this._parser.registerEscHandler({
                    intermediates: "*",
                    final: Y
                  }, () => this.selectCharset("*" + Y));
                  this._parser.registerEscHandler({
                    intermediates: "+",
                    final: Y
                  }, () => this.selectCharset("+" + Y));
                  this._parser.registerEscHandler({
                    intermediates: "-",
                    final: Y
                  }, () => this.selectCharset("-" + Y));
                  this._parser.registerEscHandler({
                    intermediates: ".",
                    final: Y
                  }, () => this.selectCharset("." + Y));
                  this._parser.registerEscHandler({
                    intermediates: "/",
                    final: Y
                  }, () => this.selectCharset("/" + Y));
                }
                this._parser.registerEscHandler({
                  intermediates: "#",
                  final: "8"
                }, () => this.screenAlignmentPattern());
                this._parser.setErrorHandler(Y => {
                  this._logService.error("Parsing error: ", Y);
                  return Y;
                });
                this._parser.registerDcsHandler({
                  intermediates: "$",
                  final: "q"
                }, new R.DcsHandler((Y, re) => this.requestStatusString(Y, re)));
              }
              _preserveStack(L, F, P, V) {
                this._parseStack.paused = true;
                this._parseStack.cursorStartX = L;
                this._parseStack.cursorStartY = F;
                this._parseStack.decodedLength = P;
                this._parseStack.position = V;
              }
              _logSlowResolvingAsync(L) {
                if (this._logService.logLevel <= T.LogLevelEnum.WARN) {
                  Promise.race([L, new Promise((F, P) => setTimeout(() => P("#SLOW_TIMEOUT"), 5000))]).catch(F => {
                    if (F !== "#SLOW_TIMEOUT") {
                      throw F;
                    }
                    console.warn("async parser handler taking longer than 5000 ms");
                  });
                }
              }
              _getCurrentLinkId() {
                return this._curAttrData.extended.urlId;
              }
              parse(L, F) {
                let P;
                let V = this._activeBuffer.x;
                let Z = this._activeBuffer.y;
                let J = 0;
                const ne = this._parseStack.paused;
                if (ne) {
                  if (P = this._parser.parse(this._parseBuffer, this._parseStack.decodedLength, F)) {
                    this._logSlowResolvingAsync(P);
                    return P;
                  }
                  V = this._parseStack.cursorStartX;
                  Z = this._parseStack.cursorStartY;
                  this._parseStack.paused = false;
                  if (L.length > W) {
                    J = this._parseStack.position + W;
                  }
                }
                if (this._logService.logLevel <= T.LogLevelEnum.DEBUG) {
                  this._logService.debug("parsing data" + (typeof L == "string" ? ` "${L}"` : ` "${Array.prototype.map.call(L, Y => String.fromCharCode(Y)).join("")}"`), typeof L == "string" ? L.split("").map(Y => Y.charCodeAt(0)) : L);
                }
                if (this._parseBuffer.length < L.length && this._parseBuffer.length < W) {
                  this._parseBuffer = new Uint32Array(Math.min(L.length, W));
                }
                if (!ne) {
                  this._dirtyRowTracker.clearRange();
                }
                if (L.length > W) {
                  for (let Y = J; Y < L.length; Y += W) {
                    const re = Y + W < L.length ? Y + W : L.length;
                    const ce = typeof L == "string" ? this._stringDecoder.decode(L.substring(Y, re), this._parseBuffer) : this._utf8Decoder.decode(L.subarray(Y, re), this._parseBuffer);
                    if (P = this._parser.parse(this._parseBuffer, ce)) {
                      this._preserveStack(V, Z, ce, Y);
                      this._logSlowResolvingAsync(P);
                      return P;
                    }
                  }
                } else if (!ne) {
                  const Y = typeof L == "string" ? this._stringDecoder.decode(L, this._parseBuffer) : this._utf8Decoder.decode(L, this._parseBuffer);
                  if (P = this._parser.parse(this._parseBuffer, Y)) {
                    this._preserveStack(V, Z, Y, 0);
                    this._logSlowResolvingAsync(P);
                    return P;
                  }
                }
                if (this._activeBuffer.x !== V || this._activeBuffer.y !== Z) {
                  this._onCursorMove.fire();
                }
                const ue = this._dirtyRowTracker.end + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
                const ee = this._dirtyRowTracker.start + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
                if (ee < this._bufferService.rows) {
                  this._onRequestRefreshRows.fire(Math.min(ee, this._bufferService.rows - 1), Math.min(ue, this._bufferService.rows - 1));
                }
              }
              print(L, F, P) {
                let V;
                let Z;
                const J = this._charsetService.charset;
                const ne = this._optionsService.rawOptions.screenReaderMode;
                const ue = this._bufferService.cols;
                const ee = this._coreService.decPrivateModes.wraparound;
                const Y = this._coreService.modes.insertMode;
                const re = this._curAttrData;
                let ce = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
                this._dirtyRowTracker.markDirty(this._activeBuffer.y);
                if (this._activeBuffer.x && P - F > 0 && ce.getWidth(this._activeBuffer.x - 1) === 2) {
                  ce.setCellFromCodepoint(this._activeBuffer.x - 1, 0, 1, re);
                }
                let ge = this._parser.precedingJoinState;
                for (let de = F; de < P; ++de) {
                  V = L[de];
                  if (V < 127 && J) {
                    const oe = J[String.fromCharCode(V)];
                    if (oe) {
                      V = oe.charCodeAt(0);
                    }
                  }
                  const me = this._unicodeService.charProperties(V, ge);
                  Z = A.UnicodeService.extractWidth(me);
                  const H = A.UnicodeService.extractShouldJoin(me);
                  const ae = H ? A.UnicodeService.extractWidth(ge) : 0;
                  ge = me;
                  if (ne) {
                    this._onA11yChar.fire((0, w.stringFromCodePoint)(V));
                  }
                  if (this._getCurrentLinkId()) {
                    this._oscLinkService.addLineToLink(this._getCurrentLinkId(), this._activeBuffer.ybase + this._activeBuffer.y);
                  }
                  if (this._activeBuffer.x + Z - ae > ue) {
                    if (ee) {
                      const oe = ce;
                      let X = this._activeBuffer.x - ae;
                      this._activeBuffer.x = ae;
                      this._activeBuffer.y++;
                      if (this._activeBuffer.y === this._activeBuffer.scrollBottom + 1) {
                        this._activeBuffer.y--;
                        this._bufferService.scroll(this._eraseAttrData(), true);
                      } else {
                        if (this._activeBuffer.y >= this._bufferService.rows) {
                          this._activeBuffer.y = this._bufferService.rows - 1;
                        }
                        this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = true;
                      }
                      ce = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
                      if (ae > 0 && ce instanceof g.BufferLine) {
                        ce.copyCellsFrom(oe, X, 0, ae, false);
                      }
                      while (X < ue) {
                        oe.setCellFromCodepoint(X++, 0, 1, re);
                      }
                    } else {
                      this._activeBuffer.x = ue - 1;
                      if (Z === 2) {
                        continue;
                      }
                    }
                  }
                  if (H && this._activeBuffer.x) {
                    const oe = ce.getWidth(this._activeBuffer.x - 1) ? 1 : 2;
                    ce.addCodepointToCell(this._activeBuffer.x - oe, V, Z);
                    for (let X = Z - ae; --X >= 0;) {
                      ce.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, re);
                    }
                  } else {
                    if (Y) {
                      ce.insertCells(this._activeBuffer.x, Z - ae, this._activeBuffer.getNullCell(re));
                      if (ce.getWidth(ue - 1) === 2) {
                        ce.setCellFromCodepoint(ue - 1, m.NULL_CELL_CODE, m.NULL_CELL_WIDTH, re);
                      }
                    }
                    ce.setCellFromCodepoint(this._activeBuffer.x++, V, Z, re);
                    if (Z > 0) {
                      while (--Z) {
                        ce.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, re);
                      }
                    }
                  }
                }
                this._parser.precedingJoinState = ge;
                if (this._activeBuffer.x < ue && P - F > 0 && ce.getWidth(this._activeBuffer.x) === 0 && !ce.hasContent(this._activeBuffer.x)) {
                  ce.setCellFromCodepoint(this._activeBuffer.x, 0, 1, re);
                }
                this._dirtyRowTracker.markDirty(this._activeBuffer.y);
              }
              registerCsiHandler(L, F) {
                if (L.final !== "t" || L.prefix || L.intermediates) {
                  return this._parser.registerCsiHandler(L, F);
                } else {
                  return this._parser.registerCsiHandler(L, P => !z(P.params[0], this._optionsService.rawOptions.windowOptions) || F(P));
                }
              }
              registerDcsHandler(L, F) {
                return this._parser.registerDcsHandler(L, new R.DcsHandler(F));
              }
              registerEscHandler(L, F) {
                return this._parser.registerEscHandler(L, F);
              }
              registerOscHandler(L, F) {
                return this._parser.registerOscHandler(L, new M.OscHandler(F));
              }
              bell() {
                this._onRequestBell.fire();
                return true;
              }
              lineFeed() {
                this._dirtyRowTracker.markDirty(this._activeBuffer.y);
                if (this._optionsService.rawOptions.convertEol) {
                  this._activeBuffer.x = 0;
                }
                this._activeBuffer.y++;
                if (this._activeBuffer.y === this._activeBuffer.scrollBottom + 1) {
                  this._activeBuffer.y--;
                  this._bufferService.scroll(this._eraseAttrData());
                } else if (this._activeBuffer.y >= this._bufferService.rows) {
                  this._activeBuffer.y = this._bufferService.rows - 1;
                } else {
                  this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false;
                }
                if (this._activeBuffer.x >= this._bufferService.cols) {
                  this._activeBuffer.x--;
                }
                this._dirtyRowTracker.markDirty(this._activeBuffer.y);
                this._onLineFeed.fire();
                return true;
              }
              carriageReturn() {
                this._activeBuffer.x = 0;
                return true;
              }
              backspace() {
                var L;
                if (!this._coreService.decPrivateModes.reverseWraparound) {
                  this._restrictCursor();
                  if (this._activeBuffer.x > 0) {
                    this._activeBuffer.x--;
                  }
                  return true;
                }
                this._restrictCursor(this._bufferService.cols);
                if (this._activeBuffer.x > 0) {
                  this._activeBuffer.x--;
                } else if (this._activeBuffer.x === 0 && this._activeBuffer.y > this._activeBuffer.scrollTop && this._activeBuffer.y <= this._activeBuffer.scrollBottom && (L = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y)) != null && L.isWrapped) {
                  this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false;
                  this._activeBuffer.y--;
                  this._activeBuffer.x = this._bufferService.cols - 1;
                  const F = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
                  if (F.hasWidth(this._activeBuffer.x) && !F.hasContent(this._activeBuffer.x)) {
                    this._activeBuffer.x--;
                  }
                }
                this._restrictCursor();
                return true;
              }
              tab() {
                if (this._activeBuffer.x >= this._bufferService.cols) {
                  return true;
                }
                const L = this._activeBuffer.x;
                this._activeBuffer.x = this._activeBuffer.nextStop();
                if (this._optionsService.rawOptions.screenReaderMode) {
                  this._onA11yTab.fire(this._activeBuffer.x - L);
                }
                return true;
              }
              shiftOut() {
                this._charsetService.setgLevel(1);
                return true;
              }
              shiftIn() {
                this._charsetService.setgLevel(0);
                return true;
              }
              _restrictCursor(L = this._bufferService.cols - 1) {
                this._activeBuffer.x = Math.min(L, Math.max(0, this._activeBuffer.x));
                this._activeBuffer.y = this._coreService.decPrivateModes.origin ? Math.min(this._activeBuffer.scrollBottom, Math.max(this._activeBuffer.scrollTop, this._activeBuffer.y)) : Math.min(this._bufferService.rows - 1, Math.max(0, this._activeBuffer.y));
                this._dirtyRowTracker.markDirty(this._activeBuffer.y);
              }
              _setCursor(L, F) {
                this._dirtyRowTracker.markDirty(this._activeBuffer.y);
                if (this._coreService.decPrivateModes.origin) {
                  this._activeBuffer.x = L;
                  this._activeBuffer.y = this._activeBuffer.scrollTop + F;
                } else {
                  this._activeBuffer.x = L;
                  this._activeBuffer.y = F;
                }
                this._restrictCursor();
                this._dirtyRowTracker.markDirty(this._activeBuffer.y);
              }
              _moveCursor(L, F) {
                this._restrictCursor();
                this._setCursor(this._activeBuffer.x + L, this._activeBuffer.y + F);
              }
              cursorUp(L) {
                const F = this._activeBuffer.y - this._activeBuffer.scrollTop;
                if (F >= 0) {
                  this._moveCursor(0, -Math.min(F, L.params[0] || 1));
                } else {
                  this._moveCursor(0, -(L.params[0] || 1));
                }
                return true;
              }
              cursorDown(L) {
                const F = this._activeBuffer.scrollBottom - this._activeBuffer.y;
                if (F >= 0) {
                  this._moveCursor(0, Math.min(F, L.params[0] || 1));
                } else {
                  this._moveCursor(0, L.params[0] || 1);
                }
                return true;
              }
              cursorForward(L) {
                this._moveCursor(L.params[0] || 1, 0);
                return true;
              }
              cursorBackward(L) {
                this._moveCursor(-(L.params[0] || 1), 0);
                return true;
              }
              cursorNextLine(L) {
                this.cursorDown(L);
                this._activeBuffer.x = 0;
                return true;
              }
              cursorPrecedingLine(L) {
                this.cursorUp(L);
                this._activeBuffer.x = 0;
                return true;
              }
              cursorCharAbsolute(L) {
                this._setCursor((L.params[0] || 1) - 1, this._activeBuffer.y);
                return true;
              }
              cursorPosition(L) {
                this._setCursor(L.length >= 2 ? (L.params[1] || 1) - 1 : 0, (L.params[0] || 1) - 1);
                return true;
              }
              charPosAbsolute(L) {
                this._setCursor((L.params[0] || 1) - 1, this._activeBuffer.y);
                return true;
              }
              hPositionRelative(L) {
                this._moveCursor(L.params[0] || 1, 0);
                return true;
              }
              linePosAbsolute(L) {
                this._setCursor(this._activeBuffer.x, (L.params[0] || 1) - 1);
                return true;
              }
              vPositionRelative(L) {
                this._moveCursor(0, L.params[0] || 1);
                return true;
              }
              hVPosition(L) {
                this.cursorPosition(L);
                return true;
              }
              tabClear(L) {
                const F = L.params[0];
                if (F === 0) {
                  delete this._activeBuffer.tabs[this._activeBuffer.x];
                } else if (F === 3) {
                  this._activeBuffer.tabs = {};
                }
                return true;
              }
              cursorForwardTab(L) {
                if (this._activeBuffer.x >= this._bufferService.cols) {
                  return true;
                }
                let F = L.params[0] || 1;
                while (F--) {
                  this._activeBuffer.x = this._activeBuffer.nextStop();
                }
                return true;
              }
              cursorBackwardTab(L) {
                if (this._activeBuffer.x >= this._bufferService.cols) {
                  return true;
                }
                let F = L.params[0] || 1;
                while (F--) {
                  this._activeBuffer.x = this._activeBuffer.prevStop();
                }
                return true;
              }
              selectProtected(L) {
                const F = L.params[0];
                if (F === 1) {
                  this._curAttrData.bg |= 536870912;
                }
                if (F === 2 || F === 0) {
                  this._curAttrData.bg &= -536870913;
                }
                return true;
              }
              _eraseInBufferLine(L, F, P, V = false, Z = false) {
                const J = this._activeBuffer.lines.get(this._activeBuffer.ybase + L);
                J.replaceCells(F, P, this._activeBuffer.getNullCell(this._eraseAttrData()), Z);
                if (V) {
                  J.isWrapped = false;
                }
              }
              _resetBufferLine(L, F = false) {
                const P = this._activeBuffer.lines.get(this._activeBuffer.ybase + L);
                if (P) {
                  P.fill(this._activeBuffer.getNullCell(this._eraseAttrData()), F);
                  this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase + L);
                  P.isWrapped = false;
                }
              }
              eraseInDisplay(L, F = false) {
                let P;
                this._restrictCursor(this._bufferService.cols);
                switch (L.params[0]) {
                  case 0:
                    P = this._activeBuffer.y;
                    this._dirtyRowTracker.markDirty(P);
                    this._eraseInBufferLine(P++, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, F);
                    for (; P < this._bufferService.rows; P++) {
                      this._resetBufferLine(P, F);
                    }
                    this._dirtyRowTracker.markDirty(P);
                    break;
                  case 1:
                    P = this._activeBuffer.y;
                    this._dirtyRowTracker.markDirty(P);
                    this._eraseInBufferLine(P, 0, this._activeBuffer.x + 1, true, F);
                    if (this._activeBuffer.x + 1 >= this._bufferService.cols) {
                      this._activeBuffer.lines.get(P + 1).isWrapped = false;
                    }
                    while (P--) {
                      this._resetBufferLine(P, F);
                    }
                    this._dirtyRowTracker.markDirty(0);
                    break;
                  case 2:
                    P = this._bufferService.rows;
                    this._dirtyRowTracker.markDirty(P - 1);
                    while (P--) {
                      this._resetBufferLine(P, F);
                    }
                    this._dirtyRowTracker.markDirty(0);
                    break;
                  case 3:
                    const V = this._activeBuffer.lines.length - this._bufferService.rows;
                    if (V > 0) {
                      this._activeBuffer.lines.trimStart(V);
                      this._activeBuffer.ybase = Math.max(this._activeBuffer.ybase - V, 0);
                      this._activeBuffer.ydisp = Math.max(this._activeBuffer.ydisp - V, 0);
                      this._onScroll.fire(0);
                    }
                }
                return true;
              }
              eraseInLine(L, F = false) {
                this._restrictCursor(this._bufferService.cols);
                switch (L.params[0]) {
                  case 0:
                    this._eraseInBufferLine(this._activeBuffer.y, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, F);
                    break;
                  case 1:
                    this._eraseInBufferLine(this._activeBuffer.y, 0, this._activeBuffer.x + 1, false, F);
                    break;
                  case 2:
                    this._eraseInBufferLine(this._activeBuffer.y, 0, this._bufferService.cols, true, F);
                }
                this._dirtyRowTracker.markDirty(this._activeBuffer.y);
                return true;
              }
              insertLines(L) {
                this._restrictCursor();
                let F = L.params[0] || 1;
                if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) {
                  return true;
                }
                const P = this._activeBuffer.ybase + this._activeBuffer.y;
                const V = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom;
                const Z = this._bufferService.rows - 1 + this._activeBuffer.ybase - V + 1;
                while (F--) {
                  this._activeBuffer.lines.splice(Z - 1, 1);
                  this._activeBuffer.lines.splice(P, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
                }
                this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom);
                this._activeBuffer.x = 0;
                return true;
              }
              deleteLines(L) {
                this._restrictCursor();
                let F = L.params[0] || 1;
                if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) {
                  return true;
                }
                const P = this._activeBuffer.ybase + this._activeBuffer.y;
                let V;
                V = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom;
                V = this._bufferService.rows - 1 + this._activeBuffer.ybase - V;
                while (F--) {
                  this._activeBuffer.lines.splice(P, 1);
                  this._activeBuffer.lines.splice(V, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
                }
                this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom);
                this._activeBuffer.x = 0;
                return true;
              }
              insertChars(L) {
                this._restrictCursor();
                const F = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
                if (F) {
                  F.insertCells(this._activeBuffer.x, L.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData()));
                  this._dirtyRowTracker.markDirty(this._activeBuffer.y);
                }
                return true;
              }
              deleteChars(L) {
                this._restrictCursor();
                const F = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
                if (F) {
                  F.deleteCells(this._activeBuffer.x, L.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData()));
                  this._dirtyRowTracker.markDirty(this._activeBuffer.y);
                }
                return true;
              }
              scrollUp(L) {
                let F = L.params[0] || 1;
                while (F--) {
                  this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 1);
                  this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
                }
                this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
                return true;
              }
              scrollDown(L) {
                let F = L.params[0] || 1;
                while (F--) {
                  this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 1);
                  this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 0, this._activeBuffer.getBlankLine(g.DEFAULT_ATTR_DATA));
                }
                this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
                return true;
              }
              scrollLeft(L) {
                if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) {
                  return true;
                }
                const F = L.params[0] || 1;
                for (let P = this._activeBuffer.scrollTop; P <= this._activeBuffer.scrollBottom; ++P) {
                  const V = this._activeBuffer.lines.get(this._activeBuffer.ybase + P);
                  V.deleteCells(0, F, this._activeBuffer.getNullCell(this._eraseAttrData()));
                  V.isWrapped = false;
                }
                this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
                return true;
              }
              scrollRight(L) {
                if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) {
                  return true;
                }
                const F = L.params[0] || 1;
                for (let P = this._activeBuffer.scrollTop; P <= this._activeBuffer.scrollBottom; ++P) {
                  const V = this._activeBuffer.lines.get(this._activeBuffer.ybase + P);
                  V.insertCells(0, F, this._activeBuffer.getNullCell(this._eraseAttrData()));
                  V.isWrapped = false;
                }
                this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
                return true;
              }
              insertColumns(L) {
                if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) {
                  return true;
                }
                const F = L.params[0] || 1;
                for (let P = this._activeBuffer.scrollTop; P <= this._activeBuffer.scrollBottom; ++P) {
                  const V = this._activeBuffer.lines.get(this._activeBuffer.ybase + P);
                  V.insertCells(this._activeBuffer.x, F, this._activeBuffer.getNullCell(this._eraseAttrData()));
                  V.isWrapped = false;
                }
                this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
                return true;
              }
              deleteColumns(L) {
                if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) {
                  return true;
                }
                const F = L.params[0] || 1;
                for (let P = this._activeBuffer.scrollTop; P <= this._activeBuffer.scrollBottom; ++P) {
                  const V = this._activeBuffer.lines.get(this._activeBuffer.ybase + P);
                  V.deleteCells(this._activeBuffer.x, F, this._activeBuffer.getNullCell(this._eraseAttrData()));
                  V.isWrapped = false;
                }
                this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
                return true;
              }
              eraseChars(L) {
                this._restrictCursor();
                const F = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
                if (F) {
                  F.replaceCells(this._activeBuffer.x, this._activeBuffer.x + (L.params[0] || 1), this._activeBuffer.getNullCell(this._eraseAttrData()));
                  this._dirtyRowTracker.markDirty(this._activeBuffer.y);
                }
                return true;
              }
              repeatPrecedingCharacter(L) {
                const F = this._parser.precedingJoinState;
                if (!F) {
                  return true;
                }
                const P = L.params[0] || 1;
                const V = A.UnicodeService.extractWidth(F);
                const Z = this._activeBuffer.x - V;
                const J = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).getString(Z);
                const ne = new Uint32Array(J.length * P);
                let ue = 0;
                for (let Y = 0; Y < J.length;) {
                  const re = J.codePointAt(Y) || 0;
                  ne[ue++] = re;
                  Y += re > 65535 ? 2 : 1;
                }
                let ee = ue;
                for (let Y = 1; Y < P; ++Y) {
                  ne.copyWithin(ee, 0, ue);
                  ee += ue;
                }
                this.print(ne, 0, ee);
                return true;
              }
              sendDeviceAttributesPrimary(L) {
                if (!(L.params[0] > 0)) {
                  if (this._is("xterm") || this._is("rxvt-unicode") || this._is("screen")) {
                    this._coreService.triggerDataEvent(f.C0.ESC + "[?1;2c");
                  } else if (this._is("linux")) {
                    this._coreService.triggerDataEvent(f.C0.ESC + "[?6c");
                  }
                }
                return true;
              }
              sendDeviceAttributesSecondary(L) {
                if (!(L.params[0] > 0)) {
                  if (this._is("xterm")) {
                    this._coreService.triggerDataEvent(f.C0.ESC + "[>0;276;0c");
                  } else if (this._is("rxvt-unicode")) {
                    this._coreService.triggerDataEvent(f.C0.ESC + "[>85;95;0c");
                  } else if (this._is("linux")) {
                    this._coreService.triggerDataEvent(L.params[0] + "c");
                  } else if (this._is("screen")) {
                    this._coreService.triggerDataEvent(f.C0.ESC + "[>83;40003;0c");
                  }
                }
                return true;
              }
              _is(L) {
                return (this._optionsService.rawOptions.termName + "").indexOf(L) === 0;
              }
              setMode(L) {
                for (let F = 0; F < L.length; F++) {
                  switch (L.params[F]) {
                    case 4:
                      this._coreService.modes.insertMode = true;
                      break;
                    case 20:
                      this._optionsService.options.convertEol = true;
                  }
                }
                return true;
              }
              setModePrivate(L) {
                for (let F = 0; F < L.length; F++) {
                  switch (L.params[F]) {
                    case 1:
                      this._coreService.decPrivateModes.applicationCursorKeys = true;
                      break;
                    case 2:
                      this._charsetService.setgCharset(0, S.DEFAULT_CHARSET);
                      this._charsetService.setgCharset(1, S.DEFAULT_CHARSET);
                      this._charsetService.setgCharset(2, S.DEFAULT_CHARSET);
                      this._charsetService.setgCharset(3, S.DEFAULT_CHARSET);
                      break;
                    case 3:
                      if (this._optionsService.rawOptions.windowOptions.setWinLines) {
                        this._bufferService.resize(132, this._bufferService.rows);
                        this._onRequestReset.fire();
                      }
                      break;
                    case 6:
                      this._coreService.decPrivateModes.origin = true;
                      this._setCursor(0, 0);
                      break;
                    case 7:
                      this._coreService.decPrivateModes.wraparound = true;
                      break;
                    case 12:
                      this._optionsService.options.cursorBlink = true;
                      break;
                    case 45:
                      this._coreService.decPrivateModes.reverseWraparound = true;
                      break;
                    case 66:
                      this._logService.debug("Serial port requested application keypad.");
                      this._coreService.decPrivateModes.applicationKeypad = true;
                      this._onRequestSyncScrollBar.fire();
                      break;
                    case 9:
                      this._coreMouseService.activeProtocol = "X10";
                      break;
                    case 1000:
                      this._coreMouseService.activeProtocol = "VT200";
                      break;
                    case 1002:
                      this._coreMouseService.activeProtocol = "DRAG";
                      break;
                    case 1003:
                      this._coreMouseService.activeProtocol = "ANY";
                      break;
                    case 1004:
                      this._coreService.decPrivateModes.sendFocus = true;
                      this._onRequestSendFocus.fire();
                      break;
                    case 1005:
                      this._logService.debug("DECSET 1005 not supported (see #2507)");
                      break;
                    case 1006:
                      this._coreMouseService.activeEncoding = "SGR";
                      break;
                    case 1015:
                      this._logService.debug("DECSET 1015 not supported (see #2507)");
                      break;
                    case 1016:
                      this._coreMouseService.activeEncoding = "SGR_PIXELS";
                      break;
                    case 25:
                      this._coreService.isCursorHidden = false;
                      break;
                    case 1048:
                      this.saveCursor();
                      break;
                    case 1049:
                      this.saveCursor();
                    case 47:
                    case 1047:
                      this._bufferService.buffers.activateAltBuffer(this._eraseAttrData());
                      this._coreService.isCursorInitialized = true;
                      this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1);
                      this._onRequestSyncScrollBar.fire();
                      break;
                    case 2004:
                      this._coreService.decPrivateModes.bracketedPasteMode = true;
                  }
                }
                return true;
              }
              resetMode(L) {
                for (let F = 0; F < L.length; F++) {
                  switch (L.params[F]) {
                    case 4:
                      this._coreService.modes.insertMode = false;
                      break;
                    case 20:
                      this._optionsService.options.convertEol = false;
                  }
                }
                return true;
              }
              resetModePrivate(L) {
                for (let F = 0; F < L.length; F++) {
                  switch (L.params[F]) {
                    case 1:
                      this._coreService.decPrivateModes.applicationCursorKeys = false;
                      break;
                    case 3:
                      if (this._optionsService.rawOptions.windowOptions.setWinLines) {
                        this._bufferService.resize(80, this._bufferService.rows);
                        this._onRequestReset.fire();
                      }
                      break;
                    case 6:
                      this._coreService.decPrivateModes.origin = false;
                      this._setCursor(0, 0);
                      break;
                    case 7:
                      this._coreService.decPrivateModes.wraparound = false;
                      break;
                    case 12:
                      this._optionsService.options.cursorBlink = false;
                      break;
                    case 45:
                      this._coreService.decPrivateModes.reverseWraparound = false;
                      break;
                    case 66:
                      this._logService.debug("Switching back to normal keypad.");
                      this._coreService.decPrivateModes.applicationKeypad = false;
                      this._onRequestSyncScrollBar.fire();
                      break;
                    case 9:
                    case 1000:
                    case 1002:
                    case 1003:
                      this._coreMouseService.activeProtocol = "NONE";
                      break;
                    case 1004:
                      this._coreService.decPrivateModes.sendFocus = false;
                      break;
                    case 1005:
                      this._logService.debug("DECRST 1005 not supported (see #2507)");
                      break;
                    case 1006:
                    case 1016:
                      this._coreMouseService.activeEncoding = "DEFAULT";
                      break;
                    case 1015:
                      this._logService.debug("DECRST 1015 not supported (see #2507)");
                      break;
                    case 25:
                      this._coreService.isCursorHidden = true;
                      break;
                    case 1048:
                      this.restoreCursor();
                      break;
                    case 1049:
                    case 47:
                    case 1047:
                      this._bufferService.buffers.activateNormalBuffer();
                      if (L.params[F] === 1049) {
                        this.restoreCursor();
                      }
                      this._coreService.isCursorInitialized = true;
                      this._onRequestRefreshRows.fire(0, this._bufferService.rows - 1);
                      this._onRequestSyncScrollBar.fire();
                      break;
                    case 2004:
                      this._coreService.decPrivateModes.bracketedPasteMode = false;
                  }
                }
                return true;
              }
              requestMode(L, F) {
                const P = this._coreService.decPrivateModes;
                const {
                  activeProtocol: V,
                  activeEncoding: Z
                } = this._coreMouseService;
                const J = this._coreService;
                const {
                  buffers: ne,
                  cols: ue
                } = this._bufferService;
                const {
                  active: ee,
                  alt: Y
                } = ne;
                const re = this._optionsService.rawOptions;
                const ce = H => H ? 1 : 2;
                const ge = L.params[0];
                de = ge;
                me = F ? ge === 2 ? 4 : ge === 4 ? ce(J.modes.insertMode) : ge === 12 ? 3 : ge === 20 ? ce(re.convertEol) : 0 : ge === 1 ? ce(P.applicationCursorKeys) : ge === 3 ? re.windowOptions.setWinLines ? ue === 80 ? 2 : ue === 132 ? 1 : 0 : 0 : ge === 6 ? ce(P.origin) : ge === 7 ? ce(P.wraparound) : ge === 8 ? 3 : ge === 9 ? ce(V === "X10") : ge === 12 ? ce(re.cursorBlink) : ge === 25 ? ce(!J.isCursorHidden) : ge === 45 ? ce(P.reverseWraparound) : ge === 66 ? ce(P.applicationKeypad) : ge === 67 ? 4 : ge === 1000 ? ce(V === "VT200") : ge === 1002 ? ce(V === "DRAG") : ge === 1003 ? ce(V === "ANY") : ge === 1004 ? ce(P.sendFocus) : ge === 1005 ? 4 : ge === 1006 ? ce(Z === "SGR") : ge === 1015 ? 4 : ge === 1016 ? ce(Z === "SGR_PIXELS") : ge === 1048 ? 1 : ge === 47 || ge === 1047 || ge === 1049 ? ce(ee === Y) : ge === 2004 ? ce(P.bracketedPasteMode) : 0;
                J.triggerDataEvent(`${f.C0.ESC}[${F ? "" : "?"}${de};${me}$y`);
                return true;
                var de;
                var me;
              }
              _updateAttrColor(L, F, P, V, Z) {
                if (F === 2) {
                  L |= 50331648;
                  L &= -16777216;
                  L |= C.AttributeData.fromColorRGB([P, V, Z]);
                } else if (F === 5) {
                  L &= -50331904;
                  L |= P & 255 | 33554432;
                }
                return L;
              }
              _extractColor(L, F, P) {
                const V = [0, 0, -1, 0, 0, 0];
                let Z = 0;
                let J = 0;
                do {
                  V[J + Z] = L.params[F + J];
                  if (L.hasSubParams(F + J)) {
                    const ne = L.getSubParams(F + J);
                    let ue = 0;
                    do {
                      if (V[1] === 5) {
                        Z = 1;
                      }
                      V[J + ue + 1 + Z] = ne[ue];
                    } while (++ue < ne.length && ue + J + 1 + Z < V.length);
                    break;
                  }
                  if (V[1] === 5 && J + Z >= 2 || V[1] === 2 && J + Z >= 5) {
                    break;
                  }
                  if (V[1]) {
                    Z = 1;
                  }
                } while (++J + F < L.length && J + Z < V.length);
                for (let ne = 2; ne < V.length; ++ne) {
                  if (V[ne] === -1) {
                    V[ne] = 0;
                  }
                }
                switch (V[0]) {
                  case 38:
                    P.fg = this._updateAttrColor(P.fg, V[1], V[3], V[4], V[5]);
                    break;
                  case 48:
                    P.bg = this._updateAttrColor(P.bg, V[1], V[3], V[4], V[5]);
                    break;
                  case 58:
                    P.extended = P.extended.clone();
                    P.extended.underlineColor = this._updateAttrColor(P.extended.underlineColor, V[1], V[3], V[4], V[5]);
                }
                return J;
              }
              _processUnderline(L, F) {
                F.extended = F.extended.clone();
                if (!~L || L > 5) {
                  L = 1;
                }
                F.extended.underlineStyle = L;
                F.fg |= 268435456;
                if (L === 0) {
                  F.fg &= -268435457;
                }
                F.updateExtended();
              }
              _processSGR0(L) {
                L.fg = g.DEFAULT_ATTR_DATA.fg;
                L.bg = g.DEFAULT_ATTR_DATA.bg;
                L.extended = L.extended.clone();
                L.extended.underlineStyle = 0;
                L.extended.underlineColor &= -67108864;
                L.updateExtended();
              }
              charAttributes(L) {
                if (L.length === 1 && L.params[0] === 0) {
                  this._processSGR0(this._curAttrData);
                  return true;
                }
                const F = L.length;
                let P;
                const V = this._curAttrData;
                for (let Z = 0; Z < F; Z++) {
                  P = L.params[Z];
                  if (P >= 30 && P <= 37) {
                    V.fg &= -50331904;
                    V.fg |= P - 30 | 16777216;
                  } else if (P >= 40 && P <= 47) {
                    V.bg &= -50331904;
                    V.bg |= P - 40 | 16777216;
                  } else if (P >= 90 && P <= 97) {
                    V.fg &= -50331904;
                    V.fg |= P - 90 | 16777224;
                  } else if (P >= 100 && P <= 107) {
                    V.bg &= -50331904;
                    V.bg |= P - 100 | 16777224;
                  } else if (P === 0) {
                    this._processSGR0(V);
                  } else if (P === 1) {
                    V.fg |= 134217728;
                  } else if (P === 3) {
                    V.bg |= 67108864;
                  } else if (P === 4) {
                    V.fg |= 268435456;
                    this._processUnderline(L.hasSubParams(Z) ? L.getSubParams(Z)[0] : 1, V);
                  } else if (P === 5) {
                    V.fg |= 536870912;
                  } else if (P === 7) {
                    V.fg |= 67108864;
                  } else if (P === 8) {
                    V.fg |= 1073741824;
                  } else if (P === 9) {
                    V.fg |= 2147483648;
                  } else if (P === 2) {
                    V.bg |= 134217728;
                  } else if (P === 21) {
                    this._processUnderline(2, V);
                  } else if (P === 22) {
                    V.fg &= -134217729;
                    V.bg &= -134217729;
                  } else if (P === 23) {
                    V.bg &= -67108865;
                  } else if (P === 24) {
                    V.fg &= -268435457;
                    this._processUnderline(0, V);
                  } else if (P === 25) {
                    V.fg &= -536870913;
                  } else if (P === 27) {
                    V.fg &= -67108865;
                  } else if (P === 28) {
                    V.fg &= -1073741825;
                  } else if (P === 29) {
                    V.fg &= 2147483647;
                  } else if (P === 39) {
                    V.fg &= -67108864;
                    V.fg |= g.DEFAULT_ATTR_DATA.fg & 16777215;
                  } else if (P === 49) {
                    V.bg &= -67108864;
                    V.bg |= g.DEFAULT_ATTR_DATA.bg & 16777215;
                  } else if (P === 38 || P === 48 || P === 58) {
                    Z += this._extractColor(L, Z, V);
                  } else if (P === 53) {
                    V.bg |= 1073741824;
                  } else if (P === 55) {
                    V.bg &= -1073741825;
                  } else if (P === 59) {
                    V.extended = V.extended.clone();
                    V.extended.underlineColor = -1;
                    V.updateExtended();
                  } else if (P === 100) {
                    V.fg &= -67108864;
                    V.fg |= g.DEFAULT_ATTR_DATA.fg & 16777215;
                    V.bg &= -67108864;
                    V.bg |= g.DEFAULT_ATTR_DATA.bg & 16777215;
                  } else {
                    this._logService.debug("Unknown SGR attribute: %d.", P);
                  }
                }
                return true;
              }
              deviceStatus(L) {
                switch (L.params[0]) {
                  case 5:
                    this._coreService.triggerDataEvent(`${f.C0.ESC}[0n`);
                    break;
                  case 6:
                    const F = this._activeBuffer.y + 1;
                    const P = this._activeBuffer.x + 1;
                    this._coreService.triggerDataEvent(`${f.C0.ESC}[${F};${P}R`);
                }
                return true;
              }
              deviceStatusPrivate(L) {
                if (L.params[0] === 6) {
                  const F = this._activeBuffer.y + 1;
                  const P = this._activeBuffer.x + 1;
                  this._coreService.triggerDataEvent(`${f.C0.ESC}[?${F};${P}R`);
                }
                return true;
              }
              softReset(L) {
                this._coreService.isCursorHidden = false;
                this._onRequestSyncScrollBar.fire();
                this._activeBuffer.scrollTop = 0;
                this._activeBuffer.scrollBottom = this._bufferService.rows - 1;
                this._curAttrData = g.DEFAULT_ATTR_DATA.clone();
                this._coreService.reset();
                this._charsetService.reset();
                this._activeBuffer.savedX = 0;
                this._activeBuffer.savedY = this._activeBuffer.ybase;
                this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg;
                this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg;
                this._activeBuffer.savedCharset = this._charsetService.charset;
                this._coreService.decPrivateModes.origin = false;
                return true;
              }
              setCursorStyle(L) {
                const F = L.params[0] || 1;
                switch (F) {
                  case 1:
                  case 2:
                    this._optionsService.options.cursorStyle = "block";
                    break;
                  case 3:
                  case 4:
                    this._optionsService.options.cursorStyle = "underline";
                    break;
                  case 5:
                  case 6:
                    this._optionsService.options.cursorStyle = "bar";
                }
                const P = F % 2 == 1;
                this._optionsService.options.cursorBlink = P;
                return true;
              }
              setScrollRegion(L) {
                const F = L.params[0] || 1;
                let P;
                if (L.length < 2 || (P = L.params[1]) > this._bufferService.rows || P === 0) {
                  P = this._bufferService.rows;
                }
                if (P > F) {
                  this._activeBuffer.scrollTop = F - 1;
                  this._activeBuffer.scrollBottom = P - 1;
                  this._setCursor(0, 0);
                }
                return true;
              }
              windowOptions(L) {
                if (!z(L.params[0], this._optionsService.rawOptions.windowOptions)) {
                  return true;
                }
                const F = L.length > 1 ? L.params[1] : 0;
                switch (L.params[0]) {
                  case 14:
                    if (F !== 2) {
                      this._onRequestWindowsOptionsReport.fire(N.GET_WIN_SIZE_PIXELS);
                    }
                    break;
                  case 16:
                    this._onRequestWindowsOptionsReport.fire(N.GET_CELL_SIZE_PIXELS);
                    break;
                  case 18:
                    if (this._bufferService) {
                      this._coreService.triggerDataEvent(`${f.C0.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);
                    }
                    break;
                  case 22:
                    if (F === 0 || F === 2) {
                      this._windowTitleStack.push(this._windowTitle);
                      if (this._windowTitleStack.length > 10) {
                        this._windowTitleStack.shift();
                      }
                    }
                    if (F === 0 || F === 1) {
                      this._iconNameStack.push(this._iconName);
                      if (this._iconNameStack.length > 10) {
                        this._iconNameStack.shift();
                      }
                    }
                    break;
                  case 23:
                    if (F === 0 || F === 2) {
                      if (this._windowTitleStack.length) {
                        this.setTitle(this._windowTitleStack.pop());
                      }
                    }
                    if (F === 0 || F === 1) {
                      if (this._iconNameStack.length) {
                        this.setIconName(this._iconNameStack.pop());
                      }
                    }
                }
                return true;
              }
              saveCursor(L) {
                this._activeBuffer.savedX = this._activeBuffer.x;
                this._activeBuffer.savedY = this._activeBuffer.ybase + this._activeBuffer.y;
                this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg;
                this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg;
                this._activeBuffer.savedCharset = this._charsetService.charset;
                return true;
              }
              restoreCursor(L) {
                this._activeBuffer.x = this._activeBuffer.savedX || 0;
                this._activeBuffer.y = Math.max(this._activeBuffer.savedY - this._activeBuffer.ybase, 0);
                this._curAttrData.fg = this._activeBuffer.savedCurAttrData.fg;
                this._curAttrData.bg = this._activeBuffer.savedCurAttrData.bg;
                this._charsetService.charset = this._savedCharset;
                if (this._activeBuffer.savedCharset) {
                  this._charsetService.charset = this._activeBuffer.savedCharset;
                }
                this._restrictCursor();
                return true;
              }
              setTitle(L) {
                this._windowTitle = L;
                this._onTitleChange.fire(L);
                return true;
              }
              setIconName(L) {
                this._iconName = L;
                return true;
              }
              setOrReportIndexedColor(L) {
                const F = [];
                const P = L.split(";");
                while (P.length > 1) {
                  const V = P.shift();
                  const Z = P.shift();
                  if (/^\d+$/.exec(V)) {
                    const J = parseInt(V);
                    if (q(J)) {
                      if (Z === "?") {
                        F.push({
                          type: 0,
                          index: J
                        });
                      } else {
                        const ne = (0, I.parseColor)(Z);
                        if (ne) {
                          F.push({
                            type: 1,
                            index: J,
                            color: ne
                          });
                        }
                      }
                    }
                  }
                }
                if (F.length) {
                  this._onColor.fire(F);
                }
                return true;
              }
              setHyperlink(L) {
                const F = L.split(";");
                return !(F.length < 2) && (F[1] ? this._createHyperlink(F[0], F[1]) : !F[0] && this._finishHyperlink());
              }
              _createHyperlink(L, F) {
                if (this._getCurrentLinkId()) {
                  this._finishHyperlink();
                }
                const P = L.split(":");
                let V;
                const Z = P.findIndex(J => J.startsWith("id="));
                if (Z !== -1) {
                  V = P[Z].slice(3) || undefined;
                }
                this._curAttrData.extended = this._curAttrData.extended.clone();
                this._curAttrData.extended.urlId = this._oscLinkService.registerLink({
                  id: V,
                  uri: F
                });
                this._curAttrData.updateExtended();
                return true;
              }
              _finishHyperlink() {
                this._curAttrData.extended = this._curAttrData.extended.clone();
                this._curAttrData.extended.urlId = 0;
                this._curAttrData.updateExtended();
                return true;
              }
              _setOrReportSpecialColor(L, F) {
                const P = L.split(";");
                for (let V = 0; V < P.length && !(F >= this._specialColors.length); ++V, ++F) {
                  if (P[V] === "?") {
                    this._onColor.fire([{
                      type: 0,
                      index: this._specialColors[F]
                    }]);
                  } else {
                    const Z = (0, I.parseColor)(P[V]);
                    if (Z) {
                      this._onColor.fire([{
                        type: 1,
                        index: this._specialColors[F],
                        color: Z
                      }]);
                    }
                  }
                }
                return true;
              }
              setOrReportFgColor(L) {
                return this._setOrReportSpecialColor(L, 0);
              }
              setOrReportBgColor(L) {
                return this._setOrReportSpecialColor(L, 1);
              }
              setOrReportCursorColor(L) {
                return this._setOrReportSpecialColor(L, 2);
              }
              restoreIndexedColor(L) {
                if (!L) {
                  this._onColor.fire([{
                    type: 2
                  }]);
                  return true;
                }
                const F = [];
                const P = L.split(";");
                for (let V = 0; V < P.length; ++V) {
                  if (/^\d+$/.exec(P[V])) {
                    const Z = parseInt(P[V]);
                    if (q(Z)) {
                      F.push({
                        type: 2,
                        index: Z
                      });
                    }
                  }
                }
                if (F.length) {
                  this._onColor.fire(F);
                }
                return true;
              }
              restoreFgColor(L) {
                this._onColor.fire([{
                  type: 2,
                  index: 256
                }]);
                return true;
              }
              restoreBgColor(L) {
                this._onColor.fire([{
                  type: 2,
                  index: 257
                }]);
                return true;
              }
              restoreCursorColor(L) {
                this._onColor.fire([{
                  type: 2,
                  index: 258
                }]);
                return true;
              }
              nextLine() {
                this._activeBuffer.x = 0;
                this.index();
                return true;
              }
              keypadApplicationMode() {
                this._logService.debug("Serial port requested application keypad.");
                this._coreService.decPrivateModes.applicationKeypad = true;
                this._onRequestSyncScrollBar.fire();
                return true;
              }
              keypadNumericMode() {
                this._logService.debug("Switching back to normal keypad.");
                this._coreService.decPrivateModes.applicationKeypad = false;
                this._onRequestSyncScrollBar.fire();
                return true;
              }
              selectDefaultCharset() {
                this._charsetService.setgLevel(0);
                this._charsetService.setgCharset(0, S.DEFAULT_CHARSET);
                return true;
              }
              selectCharset(L) {
                if (L.length !== 2) {
                  this.selectDefaultCharset();
                  return true;
                } else {
                  if (L[0] !== "/") {
                    this._charsetService.setgCharset(j[L[0]], S.CHARSETS[L[1]] || S.DEFAULT_CHARSET);
                  }
                  return true;
                }
              }
              index() {
                this._restrictCursor();
                this._activeBuffer.y++;
                if (this._activeBuffer.y === this._activeBuffer.scrollBottom + 1) {
                  this._activeBuffer.y--;
                  this._bufferService.scroll(this._eraseAttrData());
                } else if (this._activeBuffer.y >= this._bufferService.rows) {
                  this._activeBuffer.y = this._bufferService.rows - 1;
                }
                this._restrictCursor();
                return true;
              }
              tabSet() {
                this._activeBuffer.tabs[this._activeBuffer.x] = true;
                return true;
              }
              reverseIndex() {
                this._restrictCursor();
                if (this._activeBuffer.y === this._activeBuffer.scrollTop) {
                  const L = this._activeBuffer.scrollBottom - this._activeBuffer.scrollTop;
                  this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase + this._activeBuffer.y, L, 1);
                  this._activeBuffer.lines.set(this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.getBlankLine(this._eraseAttrData()));
                  this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
                } else {
                  this._activeBuffer.y--;
                  this._restrictCursor();
                }
                return true;
              }
              fullReset() {
                this._parser.reset();
                this._onRequestReset.fire();
                return true;
              }
              reset() {
                this._curAttrData = g.DEFAULT_ATTR_DATA.clone();
                this._eraseAttrDataInternal = g.DEFAULT_ATTR_DATA.clone();
              }
              _eraseAttrData() {
                this._eraseAttrDataInternal.bg &= -67108864;
                this._eraseAttrDataInternal.bg |= this._curAttrData.bg & 67108863;
                return this._eraseAttrDataInternal;
              }
              setgLevel(L) {
                this._charsetService.setgLevel(L);
                return true;
              }
              screenAlignmentPattern() {
                const L = new v.CellData();
                L.content = 4194373;
                L.fg = this._curAttrData.fg;
                L.bg = this._curAttrData.bg;
                this._setCursor(0, 0);
                for (let F = 0; F < this._bufferService.rows; ++F) {
                  const P = this._activeBuffer.ybase + this._activeBuffer.y + F;
                  const V = this._activeBuffer.lines.get(P);
                  if (V) {
                    V.fill(L);
                    V.isWrapped = false;
                  }
                }
                this._dirtyRowTracker.markAllDirty();
                this._setCursor(0, 0);
                return true;
              }
              requestStatusString(L, F) {
                const P = this._bufferService.buffer;
                const V = this._optionsService.rawOptions;
                return (Z => {
                  this._coreService.triggerDataEvent(`${f.C0.ESC}${Z}${f.C0.ESC}\\`);
                  return true;
                })(L === "\"q" ? `P1$r${this._curAttrData.isProtected() ? 1 : 0}"q` : L === "\"p" ? "P1$r61;1\"p" : L === "r" ? `P1$r${P.scrollTop + 1};${P.scrollBottom + 1}r` : L === "m" ? "P1$r0m" : L === " q" ? `P1$r${{
                  block: 2,
                  underline: 4,
                  bar: 6
                }[V.cursorStyle] - (V.cursorBlink ? 1 : 0)} q` : "P0$r");
              }
              markRangeDirty(L, F) {
                this._dirtyRowTracker.markRangeDirty(L, F);
              }
            }
            a.InputHandler = $;
            let G = class {
              constructor(U) {
                this._bufferService = U;
                this.clearRange();
              }
              clearRange() {
                this.start = this._bufferService.buffer.y;
                this.end = this._bufferService.buffer.y;
              }
              markDirty(U) {
                if (U < this.start) {
                  this.start = U;
                } else if (U > this.end) {
                  this.end = U;
                }
              }
              markRangeDirty(U, L) {
                if (U > L) {
                  D = U;
                  U = L;
                  L = D;
                }
                if (U < this.start) {
                  this.start = U;
                }
                if (L > this.end) {
                  this.end = L;
                }
              }
              markAllDirty() {
                this.markRangeDirty(0, this._bufferService.rows - 1);
              }
            };
            function q(U) {
              return U >= 0 && U < 256;
            }
            G = d([p(0, T.IBufferService)], G);
          },
          844: (h, a) => {
            function c(d) {
              for (const p of d) {
                p.dispose();
              }
              d.length = 0;
            }
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.getDisposeArrayDisposable = a.disposeArray = a.toDisposable = a.MutableDisposable = a.Disposable = undefined;
            a.Disposable = class {
              constructor() {
                this._disposables = [];
                this._isDisposed = false;
              }
              dispose() {
                this._isDisposed = true;
                for (const d of this._disposables) {
                  d.dispose();
                }
                this._disposables.length = 0;
              }
              register(d) {
                this._disposables.push(d);
                return d;
              }
              unregister(d) {
                const p = this._disposables.indexOf(d);
                if (p !== -1) {
                  this._disposables.splice(p, 1);
                }
              }
            };
            a.MutableDisposable = class {
              constructor() {
                this._isDisposed = false;
              }
              get value() {
                if (this._isDisposed) {
                  return undefined;
                } else {
                  return this._value;
                }
              }
              set value(d) {
                var p;
                if (!this._isDisposed && d !== this._value) {
                  if ((p = this._value) != null) {
                    p.dispose();
                  }
                  this._value = d;
                }
              }
              clear() {
                this.value = undefined;
              }
              dispose() {
                var d;
                this._isDisposed = true;
                if ((d = this._value) != null) {
                  d.dispose();
                }
                this._value = undefined;
              }
            };
            a.toDisposable = function (d) {
              return {
                dispose: d
              };
            };
            a.disposeArray = c;
            a.getDisposeArrayDisposable = function (d) {
              return {
                dispose: () => c(d)
              };
            };
          },
          1505: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.FourKeyMap = a.TwoKeyMap = undefined;
            class c {
              constructor() {
                this._data = {};
              }
              set(p, f, S) {
                this._data[p] ||= {};
                this._data[p][f] = S;
              }
              get(p, f) {
                if (this._data[p]) {
                  return this._data[p][f];
                } else {
                  return undefined;
                }
              }
              clear() {
                this._data = {};
              }
            }
            a.TwoKeyMap = c;
            a.FourKeyMap = class {
              constructor() {
                this._data = new c();
              }
              set(d, p, f, S, _) {
                if (!this._data.get(d, p)) {
                  this._data.set(d, p, new c());
                }
                this._data.get(d, p).set(f, S, _);
              }
              get(d, p, f, S) {
                var _;
                if ((_ = this._data.get(d, p)) == null) {
                  return undefined;
                } else {
                  return _.get(f, S);
                }
              }
              clear() {
                this._data.clear();
              }
            };
          },
          6114: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.isChromeOS = a.isLinux = a.isWindows = a.isIphone = a.isIpad = a.isMac = a.getSafariVersion = a.isSafari = a.isLegacyEdge = a.isFirefox = a.isNode = undefined;
            a.isNode = typeof process !== "undefined" && "title" in process;
            const c = a.isNode ? "node" : navigator.userAgent;
            const d = a.isNode ? "node" : navigator.platform;
            a.isFirefox = c.includes("Firefox");
            a.isLegacyEdge = c.includes("Edge");
            a.isSafari = /^((?!chrome|android).)*safari/i.test(c);
            a.getSafariVersion = function () {
              if (!a.isSafari) {
                return 0;
              }
              const p = c.match(/Version\/(\d+)/);
              if (p === null || p.length < 2) {
                return 0;
              } else {
                return parseInt(p[1]);
              }
            };
            a.isMac = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].includes(d);
            a.isIpad = d === "iPad";
            a.isIphone = d === "iPhone";
            a.isWindows = ["Windows", "Win16", "Win32", "WinCE"].includes(d);
            a.isLinux = d.indexOf("Linux") >= 0;
            a.isChromeOS = /\bCrOS\b/.test(c);
          },
          6106: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.SortedList = undefined;
            let c = 0;
            a.SortedList = class {
              constructor(d) {
                this._getKey = d;
                this._array = [];
              }
              clear() {
                this._array.length = 0;
              }
              insert(d) {
                if (this._array.length !== 0) {
                  c = this._search(this._getKey(d));
                  this._array.splice(c, 0, d);
                } else {
                  this._array.push(d);
                }
              }
              delete(d) {
                if (this._array.length === 0) {
                  return false;
                }
                const p = this._getKey(d);
                if (p === undefined || (c = this._search(p), c === -1) || this._getKey(this._array[c]) !== p) {
                  return false;
                }
                do {
                  if (this._array[c] === d) {
                    this._array.splice(c, 1);
                    return true;
                  }
                } while (++c < this._array.length && this._getKey(this._array[c]) === p);
                return false;
              }
              *getKeyIterator(d) {
                if (this._array.length !== 0 && (c = this._search(d), !(c < 0) && !(c >= this._array.length) && this._getKey(this._array[c]) === d)) {
                  do {
                    yield this._array[c];
                  } while (++c < this._array.length && this._getKey(this._array[c]) === d);
                }
              }
              forEachByKey(d, p) {
                if (this._array.length !== 0 && (c = this._search(d), !(c < 0) && !(c >= this._array.length) && this._getKey(this._array[c]) === d)) {
                  do {
                    p(this._array[c]);
                  } while (++c < this._array.length && this._getKey(this._array[c]) === d);
                }
              }
              values() {
                return [...this._array].values();
              }
              _search(d) {
                let p = 0;
                let f = this._array.length - 1;
                while (f >= p) {
                  let S = p + f >> 1;
                  const _ = this._getKey(this._array[S]);
                  if (_ > d) {
                    f = S - 1;
                  } else {
                    if (!(_ < d)) {
                      while (S > 0 && this._getKey(this._array[S - 1]) === d) {
                        S--;
                      }
                      return S;
                    }
                    p = S + 1;
                  }
                }
                return p;
              }
            };
          },
          7226: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.DebouncedIdleTask = a.IdleTaskQueue = a.PriorityTaskQueue = undefined;
            const d = c(6114);
            class p {
              constructor() {
                this._tasks = [];
                this._i = 0;
              }
              enqueue(_) {
                this._tasks.push(_);
                this._start();
              }
              flush() {
                while (this._i < this._tasks.length) {
                  if (!this._tasks[this._i]()) {
                    this._i++;
                  }
                }
                this.clear();
              }
              clear() {
                if (this._idleCallback) {
                  this._cancelCallback(this._idleCallback);
                  this._idleCallback = undefined;
                }
                this._i = 0;
                this._tasks.length = 0;
              }
              _start() {
                this._idleCallback ||= this._requestCallback(this._process.bind(this));
              }
              _process(_) {
                this._idleCallback = undefined;
                let x = 0;
                let w = 0;
                let g = _.timeRemaining();
                let b = 0;
                while (this._i < this._tasks.length) {
                  x = Date.now();
                  if (!this._tasks[this._i]()) {
                    this._i++;
                  }
                  x = Math.max(1, Date.now() - x);
                  w = Math.max(x, w);
                  b = _.timeRemaining();
                  if (w * 1.5 > b) {
                    if (g - x < -20) {
                      console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(g - x))}ms`);
                    }
                    this._start();
                    return;
                  }
                  g = b;
                }
                this.clear();
              }
            }
            class f extends p {
              _requestCallback(_) {
                return setTimeout(() => _(this._createDeadline(16)));
              }
              _cancelCallback(_) {
                clearTimeout(_);
              }
              _createDeadline(_) {
                const x = Date.now() + _;
                return {
                  timeRemaining: () => Math.max(0, x - Date.now())
                };
              }
            }
            a.PriorityTaskQueue = f;
            a.IdleTaskQueue = !d.isNode && "requestIdleCallback" in window ? class extends p {
              _requestCallback(S) {
                return requestIdleCallback(S);
              }
              _cancelCallback(S) {
                cancelIdleCallback(S);
              }
            } : f;
            a.DebouncedIdleTask = class {
              constructor() {
                this._queue = new a.IdleTaskQueue();
              }
              set(S) {
                this._queue.clear();
                this._queue.enqueue(S);
              }
              flush() {
                this._queue.flush();
              }
            };
          },
          9282: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.updateWindowsModeWrappedState = undefined;
            const d = c(643);
            a.updateWindowsModeWrappedState = function (p) {
              const f = p.buffer.lines.get(p.buffer.ybase + p.buffer.y - 1);
              const S = f == null ? undefined : f.get(p.cols - 1);
              const _ = p.buffer.lines.get(p.buffer.ybase + p.buffer.y);
              if (_ && S) {
                _.isWrapped = S[d.CHAR_DATA_CODE_INDEX] !== d.NULL_CELL_CODE && S[d.CHAR_DATA_CODE_INDEX] !== d.WHITESPACE_CELL_CODE;
              }
            };
          },
          3734: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.ExtendedAttrs = a.AttributeData = undefined;
            class c {
              constructor() {
                this.fg = 0;
                this.bg = 0;
                this.extended = new d();
              }
              static toColorRGB(f) {
                return [f >>> 16 & 255, f >>> 8 & 255, f & 255];
              }
              static fromColorRGB(f) {
                return (f[0] & 255) << 16 | (f[1] & 255) << 8 | f[2] & 255;
              }
              clone() {
                const f = new c();
                f.fg = this.fg;
                f.bg = this.bg;
                f.extended = this.extended.clone();
                return f;
              }
              isInverse() {
                return this.fg & 67108864;
              }
              isBold() {
                return this.fg & 134217728;
              }
              isUnderline() {
                if (this.hasExtendedAttrs() && this.extended.underlineStyle !== 0) {
                  return 1;
                } else {
                  return this.fg & 268435456;
                }
              }
              isBlink() {
                return this.fg & 536870912;
              }
              isInvisible() {
                return this.fg & 1073741824;
              }
              isItalic() {
                return this.bg & 67108864;
              }
              isDim() {
                return this.bg & 134217728;
              }
              isStrikethrough() {
                return this.fg & -2147483648;
              }
              isProtected() {
                return this.bg & 536870912;
              }
              isOverline() {
                return this.bg & 1073741824;
              }
              getFgColorMode() {
                return this.fg & 50331648;
              }
              getBgColorMode() {
                return this.bg & 50331648;
              }
              isFgRGB() {
                return (this.fg & 50331648) == 50331648;
              }
              isBgRGB() {
                return (this.bg & 50331648) == 50331648;
              }
              isFgPalette() {
                return (this.fg & 50331648) == 16777216 || (this.fg & 50331648) == 33554432;
              }
              isBgPalette() {
                return (this.bg & 50331648) == 16777216 || (this.bg & 50331648) == 33554432;
              }
              isFgDefault() {
                return (this.fg & 50331648) == 0;
              }
              isBgDefault() {
                return (this.bg & 50331648) == 0;
              }
              isAttributeDefault() {
                return this.fg === 0 && this.bg === 0;
              }
              getFgColor() {
                switch (this.fg & 50331648) {
                  case 16777216:
                  case 33554432:
                    return this.fg & 255;
                  case 50331648:
                    return this.fg & 16777215;
                  default:
                    return -1;
                }
              }
              getBgColor() {
                switch (this.bg & 50331648) {
                  case 16777216:
                  case 33554432:
                    return this.bg & 255;
                  case 50331648:
                    return this.bg & 16777215;
                  default:
                    return -1;
                }
              }
              hasExtendedAttrs() {
                return this.bg & 268435456;
              }
              updateExtended() {
                if (this.extended.isEmpty()) {
                  this.bg &= -268435457;
                } else {
                  this.bg |= 268435456;
                }
              }
              getUnderlineColor() {
                if (this.bg & 268435456 && ~this.extended.underlineColor) {
                  switch (this.extended.underlineColor & 50331648) {
                    case 16777216:
                    case 33554432:
                      return this.extended.underlineColor & 255;
                    case 50331648:
                      return this.extended.underlineColor & 16777215;
                    default:
                      return this.getFgColor();
                  }
                }
                return this.getFgColor();
              }
              getUnderlineColorMode() {
                if (this.bg & 268435456 && ~this.extended.underlineColor) {
                  return this.extended.underlineColor & 50331648;
                } else {
                  return this.getFgColorMode();
                }
              }
              isUnderlineColorRGB() {
                if (this.bg & 268435456 && ~this.extended.underlineColor) {
                  return (this.extended.underlineColor & 50331648) == 50331648;
                } else {
                  return this.isFgRGB();
                }
              }
              isUnderlineColorPalette() {
                if (this.bg & 268435456 && ~this.extended.underlineColor) {
                  return (this.extended.underlineColor & 50331648) == 16777216 || (this.extended.underlineColor & 50331648) == 33554432;
                } else {
                  return this.isFgPalette();
                }
              }
              isUnderlineColorDefault() {
                if (this.bg & 268435456 && ~this.extended.underlineColor) {
                  return (this.extended.underlineColor & 50331648) == 0;
                } else {
                  return this.isFgDefault();
                }
              }
              getUnderlineStyle() {
                if (this.fg & 268435456) {
                  if (this.bg & 268435456) {
                    return this.extended.underlineStyle;
                  } else {
                    return 1;
                  }
                } else {
                  return 0;
                }
              }
              getUnderlineVariantOffset() {
                return this.extended.underlineVariantOffset;
              }
            }
            a.AttributeData = c;
            class d {
              get ext() {
                if (this._urlId) {
                  return this._ext & -469762049 | this.underlineStyle << 26;
                } else {
                  return this._ext;
                }
              }
              set ext(f) {
                this._ext = f;
              }
              get underlineStyle() {
                if (this._urlId) {
                  return 5;
                } else {
                  return (this._ext & 469762048) >> 26;
                }
              }
              set underlineStyle(f) {
                this._ext &= -469762049;
                this._ext |= f << 26 & 469762048;
              }
              get underlineColor() {
                return this._ext & 67108863;
              }
              set underlineColor(f) {
                this._ext &= -67108864;
                this._ext |= f & 67108863;
              }
              get urlId() {
                return this._urlId;
              }
              set urlId(f) {
                this._urlId = f;
              }
              get underlineVariantOffset() {
                const f = (this._ext & -536870912) >> 29;
                if (f < 0) {
                  return f ^ -8;
                } else {
                  return f;
                }
              }
              set underlineVariantOffset(f) {
                this._ext &= 536870911;
                this._ext |= f << 29 & -536870912;
              }
              constructor(f = 0, S = 0) {
                this._ext = 0;
                this._urlId = 0;
                this._ext = f;
                this._urlId = S;
              }
              clone() {
                return new d(this._ext, this._urlId);
              }
              isEmpty() {
                return this.underlineStyle === 0 && this._urlId === 0;
              }
            }
            a.ExtendedAttrs = d;
          },
          9092: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.Buffer = a.MAX_BUFFER_SIZE = undefined;
            const d = c(6349);
            const p = c(7226);
            const f = c(3734);
            const S = c(8437);
            const _ = c(4634);
            const x = c(511);
            const w = c(643);
            const g = c(4863);
            const b = c(7116);
            a.MAX_BUFFER_SIZE = 4294967295;
            a.Buffer = class {
              constructor(m, v, C) {
                this._hasScrollback = m;
                this._optionsService = v;
                this._bufferService = C;
                this.ydisp = 0;
                this.ybase = 0;
                this.y = 0;
                this.x = 0;
                this.tabs = {};
                this.savedY = 0;
                this.savedX = 0;
                this.savedCurAttrData = S.DEFAULT_ATTR_DATA.clone();
                this.savedCharset = b.DEFAULT_CHARSET;
                this.markers = [];
                this._nullCell = x.CellData.fromCharData([0, w.NULL_CELL_CHAR, w.NULL_CELL_WIDTH, w.NULL_CELL_CODE]);
                this._whitespaceCell = x.CellData.fromCharData([0, w.WHITESPACE_CELL_CHAR, w.WHITESPACE_CELL_WIDTH, w.WHITESPACE_CELL_CODE]);
                this._isClearing = false;
                this._memoryCleanupQueue = new p.IdleTaskQueue();
                this._memoryCleanupPosition = 0;
                this._cols = this._bufferService.cols;
                this._rows = this._bufferService.rows;
                this.lines = new d.CircularList(this._getCorrectBufferLength(this._rows));
                this.scrollTop = 0;
                this.scrollBottom = this._rows - 1;
                this.setupTabStops();
              }
              getNullCell(m) {
                if (m) {
                  this._nullCell.fg = m.fg;
                  this._nullCell.bg = m.bg;
                  this._nullCell.extended = m.extended;
                } else {
                  this._nullCell.fg = 0;
                  this._nullCell.bg = 0;
                  this._nullCell.extended = new f.ExtendedAttrs();
                }
                return this._nullCell;
              }
              getWhitespaceCell(m) {
                if (m) {
                  this._whitespaceCell.fg = m.fg;
                  this._whitespaceCell.bg = m.bg;
                  this._whitespaceCell.extended = m.extended;
                } else {
                  this._whitespaceCell.fg = 0;
                  this._whitespaceCell.bg = 0;
                  this._whitespaceCell.extended = new f.ExtendedAttrs();
                }
                return this._whitespaceCell;
              }
              getBlankLine(m, v) {
                return new S.BufferLine(this._bufferService.cols, this.getNullCell(m), v);
              }
              get hasScrollback() {
                return this._hasScrollback && this.lines.maxLength > this._rows;
              }
              get isCursorInViewport() {
                const m = this.ybase + this.y - this.ydisp;
                return m >= 0 && m < this._rows;
              }
              _getCorrectBufferLength(m) {
                if (!this._hasScrollback) {
                  return m;
                }
                const v = m + this._optionsService.rawOptions.scrollback;
                if (v > a.MAX_BUFFER_SIZE) {
                  return a.MAX_BUFFER_SIZE;
                } else {
                  return v;
                }
              }
              fillViewportRows(m) {
                if (this.lines.length === 0) {
                  if (m === undefined) {
                    m = S.DEFAULT_ATTR_DATA;
                  }
                  let v = this._rows;
                  while (v--) {
                    this.lines.push(this.getBlankLine(m));
                  }
                }
              }
              clear() {
                this.ydisp = 0;
                this.ybase = 0;
                this.y = 0;
                this.x = 0;
                this.lines = new d.CircularList(this._getCorrectBufferLength(this._rows));
                this.scrollTop = 0;
                this.scrollBottom = this._rows - 1;
                this.setupTabStops();
              }
              resize(m, v) {
                const C = this.getNullCell(S.DEFAULT_ATTR_DATA);
                let T = 0;
                const A = this._getCorrectBufferLength(v);
                if (A > this.lines.maxLength) {
                  this.lines.maxLength = A;
                }
                if (this.lines.length > 0) {
                  if (this._cols < m) {
                    for (let R = 0; R < this.lines.length; R++) {
                      T += +this.lines.get(R).resize(m, C);
                    }
                  }
                  let M = 0;
                  if (this._rows < v) {
                    for (let R = this._rows; R < v; R++) {
                      if (this.lines.length < v + this.ybase) {
                        if (this._optionsService.rawOptions.windowsMode || this._optionsService.rawOptions.windowsPty.backend !== undefined || this._optionsService.rawOptions.windowsPty.buildNumber !== undefined) {
                          this.lines.push(new S.BufferLine(m, C));
                        } else if (this.ybase > 0 && this.lines.length <= this.ybase + this.y + M + 1) {
                          this.ybase--;
                          M++;
                          if (this.ydisp > 0) {
                            this.ydisp--;
                          }
                        } else {
                          this.lines.push(new S.BufferLine(m, C));
                        }
                      }
                    }
                  } else {
                    for (let R = this._rows; R > v; R--) {
                      if (this.lines.length > v + this.ybase) {
                        if (this.lines.length > this.ybase + this.y + 1) {
                          this.lines.pop();
                        } else {
                          this.ybase++;
                          this.ydisp++;
                        }
                      }
                    }
                  }
                  if (A < this.lines.maxLength) {
                    const R = this.lines.length - A;
                    if (R > 0) {
                      this.lines.trimStart(R);
                      this.ybase = Math.max(this.ybase - R, 0);
                      this.ydisp = Math.max(this.ydisp - R, 0);
                      this.savedY = Math.max(this.savedY - R, 0);
                    }
                    this.lines.maxLength = A;
                  }
                  this.x = Math.min(this.x, m - 1);
                  this.y = Math.min(this.y, v - 1);
                  if (M) {
                    this.y += M;
                  }
                  this.savedX = Math.min(this.savedX, m - 1);
                  this.scrollTop = 0;
                }
                this.scrollBottom = v - 1;
                if (this._isReflowEnabled && (this._reflow(m, v), this._cols > m)) {
                  for (let M = 0; M < this.lines.length; M++) {
                    T += +this.lines.get(M).resize(m, C);
                  }
                }
                this._cols = m;
                this._rows = v;
                this._memoryCleanupQueue.clear();
                if (T > this.lines.length * 0.1) {
                  this._memoryCleanupPosition = 0;
                  this._memoryCleanupQueue.enqueue(() => this._batchedMemoryCleanup());
                }
              }
              _batchedMemoryCleanup() {
                let m = true;
                if (this._memoryCleanupPosition >= this.lines.length) {
                  this._memoryCleanupPosition = 0;
                  m = false;
                }
                let v = 0;
                while (this._memoryCleanupPosition < this.lines.length) {
                  v += this.lines.get(this._memoryCleanupPosition++).cleanupMemory();
                  if (v > 100) {
                    return true;
                  }
                }
                return m;
              }
              get _isReflowEnabled() {
                const m = this._optionsService.rawOptions.windowsPty;
                if (m && m.buildNumber) {
                  return this._hasScrollback && m.backend === "conpty" && m.buildNumber >= 21376;
                } else {
                  return this._hasScrollback && !this._optionsService.rawOptions.windowsMode;
                }
              }
              _reflow(m, v) {
                if (this._cols !== m) {
                  if (m > this._cols) {
                    this._reflowLarger(m, v);
                  } else {
                    this._reflowSmaller(m, v);
                  }
                }
              }
              _reflowLarger(m, v) {
                const C = (0, _.reflowLargerGetLinesToRemove)(this.lines, this._cols, m, this.ybase + this.y, this.getNullCell(S.DEFAULT_ATTR_DATA));
                if (C.length > 0) {
                  const T = (0, _.reflowLargerCreateNewLayout)(this.lines, C);
                  (0, _.reflowLargerApplyNewLayout)(this.lines, T.layout);
                  this._reflowLargerAdjustViewport(m, v, T.countRemoved);
                }
              }
              _reflowLargerAdjustViewport(m, v, C) {
                const T = this.getNullCell(S.DEFAULT_ATTR_DATA);
                let A = C;
                while (A-- > 0) {
                  if (this.ybase === 0) {
                    if (this.y > 0) {
                      this.y--;
                    }
                    if (this.lines.length < v) {
                      this.lines.push(new S.BufferLine(m, T));
                    }
                  } else {
                    if (this.ydisp === this.ybase) {
                      this.ydisp--;
                    }
                    this.ybase--;
                  }
                }
                this.savedY = Math.max(this.savedY - C, 0);
              }
              _reflowSmaller(m, v) {
                const C = this.getNullCell(S.DEFAULT_ATTR_DATA);
                const T = [];
                let A = 0;
                for (let M = this.lines.length - 1; M >= 0; M--) {
                  let R = this.lines.get(M);
                  if (!R || !R.isWrapped && R.getTrimmedLength() <= m) {
                    continue;
                  }
                  const I = [R];
                  while (R.isWrapped && M > 0) {
                    R = this.lines.get(--M);
                    I.unshift(R);
                  }
                  const j = this.ybase + this.y;
                  if (j >= M && j < M + I.length) {
                    continue;
                  }
                  const W = I[I.length - 1].getTrimmedLength();
                  const z = (0, _.reflowSmallerGetNewLineLengths)(I, this._cols, m);
                  const N = z.length - I.length;
                  let D;
                  D = this.ybase === 0 && this.y !== this.lines.length - 1 ? Math.max(0, this.y - this.lines.maxLength + N) : Math.max(0, this.lines.length - this.lines.maxLength + N);
                  const $ = [];
                  for (let P = 0; P < N; P++) {
                    const V = this.getBlankLine(S.DEFAULT_ATTR_DATA, true);
                    $.push(V);
                  }
                  if ($.length > 0) {
                    T.push({
                      start: M + I.length + A,
                      newLines: $
                    });
                    A += $.length;
                  }
                  I.push(...$);
                  let G = z.length - 1;
                  let q = z[G];
                  if (q === 0) {
                    G--;
                    q = z[G];
                  }
                  let U = I.length - N - 1;
                  let L = W;
                  while (U >= 0) {
                    const P = Math.min(L, q);
                    if (I[G] === undefined) {
                      break;
                    }
                    I[G].copyCellsFrom(I[U], L - P, q - P, P, true);
                    q -= P;
                    if (q === 0) {
                      G--;
                      q = z[G];
                    }
                    L -= P;
                    if (L === 0) {
                      U--;
                      const V = Math.max(U, 0);
                      L = (0, _.getWrappedLineTrimmedLength)(I, V, this._cols);
                    }
                  }
                  for (let P = 0; P < I.length; P++) {
                    if (z[P] < m) {
                      I[P].setCell(z[P], C);
                    }
                  }
                  let F = N - D;
                  while (F-- > 0) {
                    if (this.ybase === 0) {
                      if (this.y < v - 1) {
                        this.y++;
                        this.lines.pop();
                      } else {
                        this.ybase++;
                        this.ydisp++;
                      }
                    } else if (this.ybase < Math.min(this.lines.maxLength, this.lines.length + A) - v) {
                      if (this.ybase === this.ydisp) {
                        this.ydisp++;
                      }
                      this.ybase++;
                    }
                  }
                  this.savedY = Math.min(this.savedY + N, this.ybase + v - 1);
                }
                if (T.length > 0) {
                  const M = [];
                  const R = [];
                  for (let G = 0; G < this.lines.length; G++) {
                    R.push(this.lines.get(G));
                  }
                  const I = this.lines.length;
                  let j = I - 1;
                  let W = 0;
                  let z = T[W];
                  this.lines.length = Math.min(this.lines.maxLength, this.lines.length + A);
                  let N = 0;
                  for (let G = Math.min(this.lines.maxLength - 1, I + A - 1); G >= 0; G--) {
                    if (z && z.start > j + N) {
                      for (let q = z.newLines.length - 1; q >= 0; q--) {
                        this.lines.set(G--, z.newLines[q]);
                      }
                      G++;
                      M.push({
                        index: j + 1,
                        amount: z.newLines.length
                      });
                      N += z.newLines.length;
                      z = T[++W];
                    } else {
                      this.lines.set(G, R[j--]);
                    }
                  }
                  let D = 0;
                  for (let G = M.length - 1; G >= 0; G--) {
                    M[G].index += D;
                    this.lines.onInsertEmitter.fire(M[G]);
                    D += M[G].amount;
                  }
                  const $ = Math.max(0, I + A - this.lines.maxLength);
                  if ($ > 0) {
                    this.lines.onTrimEmitter.fire($);
                  }
                }
              }
              translateBufferLineToString(m, v, C = 0, T) {
                const A = this.lines.get(m);
                if (A) {
                  return A.translateToString(v, C, T);
                } else {
                  return "";
                }
              }
              getWrappedRangeForLine(m) {
                let v = m;
                let C = m;
                while (v > 0 && this.lines.get(v).isWrapped) {
                  v--;
                }
                while (C + 1 < this.lines.length && this.lines.get(C + 1).isWrapped) {
                  C++;
                }
                return {
                  first: v,
                  last: C
                };
              }
              setupTabStops(m) {
                for (m != null ? this.tabs[m] || (m = this.prevStop(m)) : (this.tabs = {}, m = 0); m < this._cols; m += this._optionsService.rawOptions.tabStopWidth) {
                  this.tabs[m] = true;
                }
              }
              prevStop(m) {
                for (m == null && (m = this.x); !this.tabs[--m] && m > 0;);
                if (m >= this._cols) {
                  return this._cols - 1;
                } else if (m < 0) {
                  return 0;
                } else {
                  return m;
                }
              }
              nextStop(m) {
                for (m == null && (m = this.x); !this.tabs[++m] && m < this._cols;);
                if (m >= this._cols) {
                  return this._cols - 1;
                } else if (m < 0) {
                  return 0;
                } else {
                  return m;
                }
              }
              clearMarkers(m) {
                this._isClearing = true;
                for (let v = 0; v < this.markers.length; v++) {
                  if (this.markers[v].line === m) {
                    this.markers[v].dispose();
                    this.markers.splice(v--, 1);
                  }
                }
                this._isClearing = false;
              }
              clearAllMarkers() {
                this._isClearing = true;
                for (let m = 0; m < this.markers.length; m++) {
                  this.markers[m].dispose();
                  this.markers.splice(m--, 1);
                }
                this._isClearing = false;
              }
              addMarker(m) {
                const v = new g.Marker(m);
                this.markers.push(v);
                v.register(this.lines.onTrim(C => {
                  v.line -= C;
                  if (v.line < 0) {
                    v.dispose();
                  }
                }));
                v.register(this.lines.onInsert(C => {
                  if (v.line >= C.index) {
                    v.line += C.amount;
                  }
                }));
                v.register(this.lines.onDelete(C => {
                  if (v.line >= C.index && v.line < C.index + C.amount) {
                    v.dispose();
                  }
                  if (v.line > C.index) {
                    v.line -= C.amount;
                  }
                }));
                v.register(v.onDispose(() => this._removeMarker(v)));
                return v;
              }
              _removeMarker(m) {
                if (!this._isClearing) {
                  this.markers.splice(this.markers.indexOf(m), 1);
                }
              }
            };
          },
          8437: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.BufferLine = a.DEFAULT_ATTR_DATA = undefined;
            const d = c(3734);
            const p = c(511);
            const f = c(643);
            const S = c(482);
            a.DEFAULT_ATTR_DATA = Object.freeze(new d.AttributeData());
            let _ = 0;
            class x {
              constructor(g, b, m = false) {
                this.isWrapped = m;
                this._combined = {};
                this._extendedAttrs = {};
                this._data = new Uint32Array(g * 3);
                const v = b || p.CellData.fromCharData([0, f.NULL_CELL_CHAR, f.NULL_CELL_WIDTH, f.NULL_CELL_CODE]);
                for (let C = 0; C < g; ++C) {
                  this.setCell(C, v);
                }
                this.length = g;
              }
              get(g) {
                const b = this._data[g * 3 + 0];
                const m = b & 2097151;
                return [this._data[g * 3 + 1], b & 2097152 ? this._combined[g] : m ? (0, S.stringFromCodePoint)(m) : "", b >> 22, b & 2097152 ? this._combined[g].charCodeAt(this._combined[g].length - 1) : m];
              }
              set(g, b) {
                this._data[g * 3 + 1] = b[f.CHAR_DATA_ATTR_INDEX];
                if (b[f.CHAR_DATA_CHAR_INDEX].length > 1) {
                  this._combined[g] = b[1];
                  this._data[g * 3 + 0] = g | 2097152 | b[f.CHAR_DATA_WIDTH_INDEX] << 22;
                } else {
                  this._data[g * 3 + 0] = b[f.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | b[f.CHAR_DATA_WIDTH_INDEX] << 22;
                }
              }
              getWidth(g) {
                return this._data[g * 3 + 0] >> 22;
              }
              hasWidth(g) {
                return this._data[g * 3 + 0] & 12582912;
              }
              getFg(g) {
                return this._data[g * 3 + 1];
              }
              getBg(g) {
                return this._data[g * 3 + 2];
              }
              hasContent(g) {
                return this._data[g * 3 + 0] & 4194303;
              }
              getCodePoint(g) {
                const b = this._data[g * 3 + 0];
                if (b & 2097152) {
                  return this._combined[g].charCodeAt(this._combined[g].length - 1);
                } else {
                  return b & 2097151;
                }
              }
              isCombined(g) {
                return this._data[g * 3 + 0] & 2097152;
              }
              getString(g) {
                const b = this._data[g * 3 + 0];
                if (b & 2097152) {
                  return this._combined[g];
                } else if (b & 2097151) {
                  return (0, S.stringFromCodePoint)(b & 2097151);
                } else {
                  return "";
                }
              }
              isProtected(g) {
                return this._data[g * 3 + 2] & 536870912;
              }
              loadCell(g, b) {
                _ = g * 3;
                b.content = this._data[_ + 0];
                b.fg = this._data[_ + 1];
                b.bg = this._data[_ + 2];
                if (b.content & 2097152) {
                  b.combinedData = this._combined[g];
                }
                if (b.bg & 268435456) {
                  b.extended = this._extendedAttrs[g];
                }
                return b;
              }
              setCell(g, b) {
                if (b.content & 2097152) {
                  this._combined[g] = b.combinedData;
                }
                if (b.bg & 268435456) {
                  this._extendedAttrs[g] = b.extended;
                }
                this._data[g * 3 + 0] = b.content;
                this._data[g * 3 + 1] = b.fg;
                this._data[g * 3 + 2] = b.bg;
              }
              setCellFromCodepoint(g, b, m, v) {
                if (v.bg & 268435456) {
                  this._extendedAttrs[g] = v.extended;
                }
                this._data[g * 3 + 0] = b | m << 22;
                this._data[g * 3 + 1] = v.fg;
                this._data[g * 3 + 2] = v.bg;
              }
              addCodepointToCell(g, b, m) {
                let v = this._data[g * 3 + 0];
                if (v & 2097152) {
                  this._combined[g] += (0, S.stringFromCodePoint)(b);
                } else if (v & 2097151) {
                  this._combined[g] = (0, S.stringFromCodePoint)(v & 2097151) + (0, S.stringFromCodePoint)(b);
                  v &= -2097152;
                  v |= 2097152;
                } else {
                  v = b | 4194304;
                }
                if (m) {
                  v &= -12582913;
                  v |= m << 22;
                }
                this._data[g * 3 + 0] = v;
              }
              insertCells(g, b, m) {
                if ((g %= this.length) && this.getWidth(g - 1) === 2) {
                  this.setCellFromCodepoint(g - 1, 0, 1, m);
                }
                if (b < this.length - g) {
                  const v = new p.CellData();
                  for (let C = this.length - g - b - 1; C >= 0; --C) {
                    this.setCell(g + b + C, this.loadCell(g + C, v));
                  }
                  for (let C = 0; C < b; ++C) {
                    this.setCell(g + C, m);
                  }
                } else {
                  for (let v = g; v < this.length; ++v) {
                    this.setCell(v, m);
                  }
                }
                if (this.getWidth(this.length - 1) === 2) {
                  this.setCellFromCodepoint(this.length - 1, 0, 1, m);
                }
              }
              deleteCells(g, b, m) {
                g %= this.length;
                if (b < this.length - g) {
                  const v = new p.CellData();
                  for (let C = 0; C < this.length - g - b; ++C) {
                    this.setCell(g + C, this.loadCell(g + b + C, v));
                  }
                  for (let C = this.length - b; C < this.length; ++C) {
                    this.setCell(C, m);
                  }
                } else {
                  for (let v = g; v < this.length; ++v) {
                    this.setCell(v, m);
                  }
                }
                if (g && this.getWidth(g - 1) === 2) {
                  this.setCellFromCodepoint(g - 1, 0, 1, m);
                }
                if (this.getWidth(g) === 0 && !this.hasContent(g)) {
                  this.setCellFromCodepoint(g, 0, 1, m);
                }
              }
              replaceCells(g, b, m, v = false) {
                if (v) {
                  if (g && this.getWidth(g - 1) === 2 && !this.isProtected(g - 1)) {
                    this.setCellFromCodepoint(g - 1, 0, 1, m);
                  }
                  if (b < this.length && this.getWidth(b - 1) === 2 && !this.isProtected(b)) {
                    this.setCellFromCodepoint(b, 0, 1, m);
                  }
                  while (g < b && g < this.length) {
                    if (!this.isProtected(g)) {
                      this.setCell(g, m);
                    }
                    g++;
                  }
                } else {
                  if (g && this.getWidth(g - 1) === 2) {
                    this.setCellFromCodepoint(g - 1, 0, 1, m);
                  }
                  if (b < this.length && this.getWidth(b - 1) === 2) {
                    this.setCellFromCodepoint(b, 0, 1, m);
                  }
                  while (g < b && g < this.length) {
                    this.setCell(g++, m);
                  }
                }
              }
              resize(g, b) {
                if (g === this.length) {
                  return this._data.length * 4 * 2 < this._data.buffer.byteLength;
                }
                const m = g * 3;
                if (g > this.length) {
                  if (this._data.buffer.byteLength >= m * 4) {
                    this._data = new Uint32Array(this._data.buffer, 0, m);
                  } else {
                    const v = new Uint32Array(m);
                    v.set(this._data);
                    this._data = v;
                  }
                  for (let v = this.length; v < g; ++v) {
                    this.setCell(v, b);
                  }
                } else {
                  this._data = this._data.subarray(0, m);
                  const v = Object.keys(this._combined);
                  for (let T = 0; T < v.length; T++) {
                    const A = parseInt(v[T], 10);
                    if (A >= g) {
                      delete this._combined[A];
                    }
                  }
                  const C = Object.keys(this._extendedAttrs);
                  for (let T = 0; T < C.length; T++) {
                    const A = parseInt(C[T], 10);
                    if (A >= g) {
                      delete this._extendedAttrs[A];
                    }
                  }
                }
                this.length = g;
                return m * 4 * 2 < this._data.buffer.byteLength;
              }
              cleanupMemory() {
                if (this._data.length * 4 * 2 < this._data.buffer.byteLength) {
                  const g = new Uint32Array(this._data.length);
                  g.set(this._data);
                  this._data = g;
                  return 1;
                }
                return 0;
              }
              fill(g, b = false) {
                if (b) {
                  for (let m = 0; m < this.length; ++m) {
                    if (!this.isProtected(m)) {
                      this.setCell(m, g);
                    }
                  }
                } else {
                  this._combined = {};
                  this._extendedAttrs = {};
                  for (let m = 0; m < this.length; ++m) {
                    this.setCell(m, g);
                  }
                }
              }
              copyFrom(g) {
                if (this.length !== g.length) {
                  this._data = new Uint32Array(g._data);
                } else {
                  this._data.set(g._data);
                }
                this.length = g.length;
                this._combined = {};
                for (const b in g._combined) {
                  this._combined[b] = g._combined[b];
                }
                this._extendedAttrs = {};
                for (const b in g._extendedAttrs) {
                  this._extendedAttrs[b] = g._extendedAttrs[b];
                }
                this.isWrapped = g.isWrapped;
              }
              clone() {
                const g = new x(0);
                g._data = new Uint32Array(this._data);
                g.length = this.length;
                for (const b in this._combined) {
                  g._combined[b] = this._combined[b];
                }
                for (const b in this._extendedAttrs) {
                  g._extendedAttrs[b] = this._extendedAttrs[b];
                }
                g.isWrapped = this.isWrapped;
                return g;
              }
              getTrimmedLength() {
                for (let g = this.length - 1; g >= 0; --g) {
                  if (this._data[g * 3 + 0] & 4194303) {
                    return g + (this._data[g * 3 + 0] >> 22);
                  }
                }
                return 0;
              }
              getNoBgTrimmedLength() {
                for (let g = this.length - 1; g >= 0; --g) {
                  if (this._data[g * 3 + 0] & 4194303 || this._data[g * 3 + 2] & 50331648) {
                    return g + (this._data[g * 3 + 0] >> 22);
                  }
                }
                return 0;
              }
              copyCellsFrom(g, b, m, v, C) {
                const T = g._data;
                if (C) {
                  for (let M = v - 1; M >= 0; M--) {
                    for (let R = 0; R < 3; R++) {
                      this._data[(m + M) * 3 + R] = T[(b + M) * 3 + R];
                    }
                    if (T[(b + M) * 3 + 2] & 268435456) {
                      this._extendedAttrs[m + M] = g._extendedAttrs[b + M];
                    }
                  }
                } else {
                  for (let M = 0; M < v; M++) {
                    for (let R = 0; R < 3; R++) {
                      this._data[(m + M) * 3 + R] = T[(b + M) * 3 + R];
                    }
                    if (T[(b + M) * 3 + 2] & 268435456) {
                      this._extendedAttrs[m + M] = g._extendedAttrs[b + M];
                    }
                  }
                }
                const A = Object.keys(g._combined);
                for (let M = 0; M < A.length; M++) {
                  const R = parseInt(A[M], 10);
                  if (R >= b) {
                    this._combined[R - b + m] = g._combined[R];
                  }
                }
              }
              translateToString(g, b, m, v) {
                b = b ?? 0;
                m = m ?? this.length;
                if (g) {
                  m = Math.min(m, this.getTrimmedLength());
                }
                if (v) {
                  v.length = 0;
                }
                let C = "";
                while (b < m) {
                  const T = this._data[b * 3 + 0];
                  const A = T & 2097151;
                  const M = T & 2097152 ? this._combined[b] : A ? (0, S.stringFromCodePoint)(A) : f.WHITESPACE_CELL_CHAR;
                  C += M;
                  if (v) {
                    for (let R = 0; R < M.length; ++R) {
                      v.push(b);
                    }
                  }
                  b += T >> 22 || 1;
                }
                if (v) {
                  v.push(b);
                }
                return C;
              }
            }
            a.BufferLine = x;
          },
          4841: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.getRangeLength = undefined;
            a.getRangeLength = function (c, d) {
              if (c.start.y > c.end.y) {
                throw new Error(`Buffer range end (${c.end.x}, ${c.end.y}) cannot be before start (${c.start.x}, ${c.start.y})`);
              }
              return d * (c.end.y - c.start.y) + (c.end.x - c.start.x + 1);
            };
          },
          4634: (h, a) => {
            function c(d, p, f) {
              if (p === d.length - 1) {
                return d[p].getTrimmedLength();
              }
              const S = !d[p].hasContent(f - 1) && d[p].getWidth(f - 1) === 1;
              const _ = d[p + 1].getWidth(0) === 2;
              if (S && _) {
                return f - 1;
              } else {
                return f;
              }
            }
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.getWrappedLineTrimmedLength = a.reflowSmallerGetNewLineLengths = a.reflowLargerApplyNewLayout = a.reflowLargerCreateNewLayout = a.reflowLargerGetLinesToRemove = undefined;
            a.reflowLargerGetLinesToRemove = function (d, p, f, S, _) {
              const x = [];
              for (let w = 0; w < d.length - 1; w++) {
                let g = w;
                let b = d.get(++g);
                if (!b.isWrapped) {
                  continue;
                }
                const m = [d.get(w)];
                while (g < d.length && b.isWrapped) {
                  m.push(b);
                  b = d.get(++g);
                }
                if (S >= w && S < g) {
                  w += m.length - 1;
                  continue;
                }
                let v = 0;
                let C = c(m, v, p);
                let T = 1;
                let A = 0;
                while (T < m.length) {
                  const R = c(m, T, p);
                  const I = R - A;
                  const j = f - C;
                  const W = Math.min(I, j);
                  m[v].copyCellsFrom(m[T], A, C, W, false);
                  C += W;
                  if (C === f) {
                    v++;
                    C = 0;
                  }
                  A += W;
                  if (A === R) {
                    T++;
                    A = 0;
                  }
                  if (C === 0 && v !== 0 && m[v - 1].getWidth(f - 1) === 2) {
                    m[v].copyCellsFrom(m[v - 1], f - 1, C++, 1, false);
                    m[v - 1].setCell(f - 1, _);
                  }
                }
                m[v].replaceCells(C, f, _);
                let M = 0;
                for (let R = m.length - 1; R > 0 && (R > v || m[R].getTrimmedLength() === 0); R--) {
                  M++;
                }
                if (M > 0) {
                  x.push(w + m.length - M);
                  x.push(M);
                }
                w += m.length - 1;
              }
              return x;
            };
            a.reflowLargerCreateNewLayout = function (d, p) {
              const f = [];
              let S = 0;
              let _ = p[S];
              let x = 0;
              for (let w = 0; w < d.length; w++) {
                if (_ === w) {
                  const g = p[++S];
                  d.onDeleteEmitter.fire({
                    index: w - x,
                    amount: g
                  });
                  w += g - 1;
                  x += g;
                  _ = p[++S];
                } else {
                  f.push(w);
                }
              }
              return {
                layout: f,
                countRemoved: x
              };
            };
            a.reflowLargerApplyNewLayout = function (d, p) {
              const f = [];
              for (let S = 0; S < p.length; S++) {
                f.push(d.get(p[S]));
              }
              for (let S = 0; S < f.length; S++) {
                d.set(S, f[S]);
              }
              d.length = p.length;
            };
            a.reflowSmallerGetNewLineLengths = function (d, p, f) {
              const S = [];
              const _ = d.map((b, m) => c(d, m, p)).reduce((b, m) => b + m);
              let x = 0;
              let w = 0;
              let g = 0;
              while (g < _) {
                if (_ - g < f) {
                  S.push(_ - g);
                  break;
                }
                x += f;
                const b = c(d, w, p);
                if (x > b) {
                  x -= b;
                  w++;
                }
                const m = d[w].getWidth(x - 1) === 2;
                if (m) {
                  x--;
                }
                const v = m ? f - 1 : f;
                S.push(v);
                g += v;
              }
              return S;
            };
            a.getWrappedLineTrimmedLength = c;
          },
          5295: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.BufferSet = undefined;
            const d = c(8460);
            const p = c(844);
            const f = c(9092);
            class S extends p.Disposable {
              constructor(x, w) {
                super();
                this._optionsService = x;
                this._bufferService = w;
                this._onBufferActivate = this.register(new d.EventEmitter());
                this.onBufferActivate = this._onBufferActivate.event;
                this.reset();
                this.register(this._optionsService.onSpecificOptionChange("scrollback", () => this.resize(this._bufferService.cols, this._bufferService.rows)));
                this.register(this._optionsService.onSpecificOptionChange("tabStopWidth", () => this.setupTabStops()));
              }
              reset() {
                this._normal = new f.Buffer(true, this._optionsService, this._bufferService);
                this._normal.fillViewportRows();
                this._alt = new f.Buffer(false, this._optionsService, this._bufferService);
                this._activeBuffer = this._normal;
                this._onBufferActivate.fire({
                  activeBuffer: this._normal,
                  inactiveBuffer: this._alt
                });
                this.setupTabStops();
              }
              get alt() {
                return this._alt;
              }
              get active() {
                return this._activeBuffer;
              }
              get normal() {
                return this._normal;
              }
              activateNormalBuffer() {
                if (this._activeBuffer !== this._normal) {
                  this._normal.x = this._alt.x;
                  this._normal.y = this._alt.y;
                  this._alt.clearAllMarkers();
                  this._alt.clear();
                  this._activeBuffer = this._normal;
                  this._onBufferActivate.fire({
                    activeBuffer: this._normal,
                    inactiveBuffer: this._alt
                  });
                }
              }
              activateAltBuffer(x) {
                if (this._activeBuffer !== this._alt) {
                  this._alt.fillViewportRows(x);
                  this._alt.x = this._normal.x;
                  this._alt.y = this._normal.y;
                  this._activeBuffer = this._alt;
                  this._onBufferActivate.fire({
                    activeBuffer: this._alt,
                    inactiveBuffer: this._normal
                  });
                }
              }
              resize(x, w) {
                this._normal.resize(x, w);
                this._alt.resize(x, w);
                this.setupTabStops(x);
              }
              setupTabStops(x) {
                this._normal.setupTabStops(x);
                this._alt.setupTabStops(x);
              }
            }
            a.BufferSet = S;
          },
          511: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.CellData = undefined;
            const d = c(482);
            const p = c(643);
            const f = c(3734);
            class S extends f.AttributeData {
              constructor() {
                super(...arguments);
                this.content = 0;
                this.fg = 0;
                this.bg = 0;
                this.extended = new f.ExtendedAttrs();
                this.combinedData = "";
              }
              static fromCharData(x) {
                const w = new S();
                w.setFromCharData(x);
                return w;
              }
              isCombined() {
                return this.content & 2097152;
              }
              getWidth() {
                return this.content >> 22;
              }
              getChars() {
                if (this.content & 2097152) {
                  return this.combinedData;
                } else if (this.content & 2097151) {
                  return (0, d.stringFromCodePoint)(this.content & 2097151);
                } else {
                  return "";
                }
              }
              getCode() {
                if (this.isCombined()) {
                  return this.combinedData.charCodeAt(this.combinedData.length - 1);
                } else {
                  return this.content & 2097151;
                }
              }
              setFromCharData(x) {
                this.fg = x[p.CHAR_DATA_ATTR_INDEX];
                this.bg = 0;
                let w = false;
                if (x[p.CHAR_DATA_CHAR_INDEX].length > 2) {
                  w = true;
                } else if (x[p.CHAR_DATA_CHAR_INDEX].length === 2) {
                  const g = x[p.CHAR_DATA_CHAR_INDEX].charCodeAt(0);
                  if (g >= 55296 && g <= 56319) {
                    const b = x[p.CHAR_DATA_CHAR_INDEX].charCodeAt(1);
                    if (b >= 56320 && b <= 57343) {
                      this.content = (g - 55296) * 1024 + b - 56320 + 65536 | x[p.CHAR_DATA_WIDTH_INDEX] << 22;
                    } else {
                      w = true;
                    }
                  } else {
                    w = true;
                  }
                } else {
                  this.content = x[p.CHAR_DATA_CHAR_INDEX].charCodeAt(0) | x[p.CHAR_DATA_WIDTH_INDEX] << 22;
                }
                if (w) {
                  this.combinedData = x[p.CHAR_DATA_CHAR_INDEX];
                  this.content = x[p.CHAR_DATA_WIDTH_INDEX] << 22 | 2097152;
                }
              }
              getAsCharData() {
                return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
              }
            }
            a.CellData = S;
          },
          643: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.WHITESPACE_CELL_CODE = a.WHITESPACE_CELL_WIDTH = a.WHITESPACE_CELL_CHAR = a.NULL_CELL_CODE = a.NULL_CELL_WIDTH = a.NULL_CELL_CHAR = a.CHAR_DATA_CODE_INDEX = a.CHAR_DATA_WIDTH_INDEX = a.CHAR_DATA_CHAR_INDEX = a.CHAR_DATA_ATTR_INDEX = a.DEFAULT_EXT = a.DEFAULT_ATTR = a.DEFAULT_COLOR = undefined;
            a.DEFAULT_COLOR = 0;
            a.DEFAULT_ATTR = a.DEFAULT_COLOR << 9 | 256;
            a.DEFAULT_EXT = 0;
            a.CHAR_DATA_ATTR_INDEX = 0;
            a.CHAR_DATA_CHAR_INDEX = 1;
            a.CHAR_DATA_WIDTH_INDEX = 2;
            a.CHAR_DATA_CODE_INDEX = 3;
            a.NULL_CELL_CHAR = "";
            a.NULL_CELL_WIDTH = 1;
            a.NULL_CELL_CODE = 0;
            a.WHITESPACE_CELL_CHAR = " ";
            a.WHITESPACE_CELL_WIDTH = 1;
            a.WHITESPACE_CELL_CODE = 32;
          },
          4863: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.Marker = undefined;
            const d = c(8460);
            const p = c(844);
            class f {
              get id() {
                return this._id;
              }
              constructor(_) {
                this.line = _;
                this.isDisposed = false;
                this._disposables = [];
                this._id = f._nextId++;
                this._onDispose = this.register(new d.EventEmitter());
                this.onDispose = this._onDispose.event;
              }
              dispose() {
                if (!this.isDisposed) {
                  this.isDisposed = true;
                  this.line = -1;
                  this._onDispose.fire();
                  (0, p.disposeArray)(this._disposables);
                  this._disposables.length = 0;
                }
              }
              register(_) {
                this._disposables.push(_);
                return _;
              }
            }
            a.Marker = f;
            f._nextId = 1;
          },
          7116: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.DEFAULT_CHARSET = a.CHARSETS = undefined;
            a.CHARSETS = {};
            a.DEFAULT_CHARSET = a.CHARSETS.B;
            a.CHARSETS[0] = {
              "`": "◆",
              a: "▒",
              b: "␉",
              c: "␌",
              d: "␍",
              e: "␊",
              f: "°",
              g: "±",
              h: "␤",
              i: "␋",
              j: "┘",
              k: "┐",
              l: "┌",
              m: "└",
              n: "┼",
              o: "⎺",
              p: "⎻",
              q: "─",
              r: "⎼",
              s: "⎽",
              t: "├",
              u: "┤",
              v: "┴",
              w: "┬",
              x: "│",
              y: "≤",
              z: "≥",
              "{": "π",
              "|": "≠",
              "}": "£",
              "~": "·"
            };
            a.CHARSETS.A = {
              "#": "£"
            };
            a.CHARSETS.B = undefined;
            a.CHARSETS[4] = {
              "#": "£",
              "@": "¾",
              "[": "ij",
              "\\": "½",
              "]": "|",
              "{": "¨",
              "|": "f",
              "}": "¼",
              "~": "´"
            };
            a.CHARSETS.C = a.CHARSETS[5] = {
              "[": "Ä",
              "\\": "Ö",
              "]": "Å",
              "^": "Ü",
              "`": "é",
              "{": "ä",
              "|": "ö",
              "}": "å",
              "~": "ü"
            };
            a.CHARSETS.R = {
              "#": "£",
              "@": "à",
              "[": "°",
              "\\": "ç",
              "]": "§",
              "{": "é",
              "|": "ù",
              "}": "è",
              "~": "¨"
            };
            a.CHARSETS.Q = {
              "@": "à",
              "[": "â",
              "\\": "ç",
              "]": "ê",
              "^": "î",
              "`": "ô",
              "{": "é",
              "|": "ù",
              "}": "è",
              "~": "û"
            };
            a.CHARSETS.K = {
              "@": "§",
              "[": "Ä",
              "\\": "Ö",
              "]": "Ü",
              "{": "ä",
              "|": "ö",
              "}": "ü",
              "~": "ß"
            };
            a.CHARSETS.Y = {
              "#": "£",
              "@": "§",
              "[": "°",
              "\\": "ç",
              "]": "é",
              "`": "ù",
              "{": "à",
              "|": "ò",
              "}": "è",
              "~": "ì"
            };
            a.CHARSETS.E = a.CHARSETS[6] = {
              "@": "Ä",
              "[": "Æ",
              "\\": "Ø",
              "]": "Å",
              "^": "Ü",
              "`": "ä",
              "{": "æ",
              "|": "ø",
              "}": "å",
              "~": "ü"
            };
            a.CHARSETS.Z = {
              "#": "£",
              "@": "§",
              "[": "¡",
              "\\": "Ñ",
              "]": "¿",
              "{": "°",
              "|": "ñ",
              "}": "ç"
            };
            a.CHARSETS.H = a.CHARSETS[7] = {
              "@": "É",
              "[": "Ä",
              "\\": "Ö",
              "]": "Å",
              "^": "Ü",
              "`": "é",
              "{": "ä",
              "|": "ö",
              "}": "å",
              "~": "ü"
            };
            a.CHARSETS["="] = {
              "#": "ù",
              "@": "à",
              "[": "é",
              "\\": "ç",
              "]": "ê",
              "^": "î",
              _: "è",
              "`": "ô",
              "{": "ä",
              "|": "ö",
              "}": "ü",
              "~": "û"
            };
          },
          2584: (h, a) => {
            var c;
            var d;
            var p;
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.C1_ESCAPED = a.C1 = a.C0 = undefined;
            (function (f) {
              f.NUL = "\0";
              f.SOH = "";
              f.STX = "";
              f.ETX = "";
              f.EOT = "";
              f.ENQ = "";
              f.ACK = "";
              f.BEL = "";
              f.BS = "\b";
              f.HT = "\t";
              f.LF = `
`;
              f.VT = "";
              f.FF = "\f";
              f.CR = "\r";
              f.SO = "";
              f.SI = "";
              f.DLE = "";
              f.DC1 = "";
              f.DC2 = "";
              f.DC3 = "";
              f.DC4 = "";
              f.NAK = "";
              f.SYN = "";
              f.ETB = "";
              f.CAN = "";
              f.EM = "";
              f.SUB = "";
              f.ESC = "";
              f.FS = "";
              f.GS = "";
              f.RS = "";
              f.US = "";
              f.SP = " ";
              f.DEL = "";
            })(c || (a.C0 = c = {}));
            (function (f) {
              f.PAD = "";
              f.HOP = "";
              f.BPH = "";
              f.NBH = "";
              f.IND = "";
              f.NEL = "";
              f.SSA = "";
              f.ESA = "";
              f.HTS = "";
              f.HTJ = "";
              f.VTS = "";
              f.PLD = "";
              f.PLU = "";
              f.RI = "";
              f.SS2 = "";
              f.SS3 = "";
              f.DCS = "";
              f.PU1 = "";
              f.PU2 = "";
              f.STS = "";
              f.CCH = "";
              f.MW = "";
              f.SPA = "";
              f.EPA = "";
              f.SOS = "";
              f.SGCI = "";
              f.SCI = "";
              f.CSI = "";
              f.ST = "";
              f.OSC = "";
              f.PM = "";
              f.APC = "";
            })(d || (a.C1 = d = {}));
            (function (f) {
              f.ST = `${c.ESC}\\`;
            })(p || (a.C1_ESCAPED = p = {}));
          },
          7399: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.evaluateKeyboardEvent = undefined;
            const d = c(2584);
            const p = {
              48: ["0", ")"],
              49: ["1", "!"],
              50: ["2", "@"],
              51: ["3", "#"],
              52: ["4", "$"],
              53: ["5", "%"],
              54: ["6", "^"],
              55: ["7", "&"],
              56: ["8", "*"],
              57: ["9", "("],
              186: [";", ":"],
              187: ["=", "+"],
              188: [",", "<"],
              189: ["-", "_"],
              190: [".", ">"],
              191: ["/", "?"],
              192: ["`", "~"],
              219: ["[", "{"],
              220: ["\\", "|"],
              221: ["]", "}"],
              222: ["'", "\""]
            };
            a.evaluateKeyboardEvent = function (f, S, _, x) {
              const w = {
                type: 0,
                cancel: false,
                key: undefined
              };
              const g = (f.shiftKey ? 1 : 0) | (f.altKey ? 2 : 0) | (f.ctrlKey ? 4 : 0) | (f.metaKey ? 8 : 0);
              switch (f.keyCode) {
                case 0:
                  if (f.key === "UIKeyInputUpArrow") {
                    w.key = S ? d.C0.ESC + "OA" : d.C0.ESC + "[A";
                  } else if (f.key === "UIKeyInputLeftArrow") {
                    w.key = S ? d.C0.ESC + "OD" : d.C0.ESC + "[D";
                  } else if (f.key === "UIKeyInputRightArrow") {
                    w.key = S ? d.C0.ESC + "OC" : d.C0.ESC + "[C";
                  } else if (f.key === "UIKeyInputDownArrow") {
                    w.key = S ? d.C0.ESC + "OB" : d.C0.ESC + "[B";
                  }
                  break;
                case 8:
                  w.key = f.ctrlKey ? "\b" : d.C0.DEL;
                  if (f.altKey) {
                    w.key = d.C0.ESC + w.key;
                  }
                  break;
                case 9:
                  if (f.shiftKey) {
                    w.key = d.C0.ESC + "[Z";
                    break;
                  }
                  w.key = d.C0.HT;
                  w.cancel = true;
                  break;
                case 13:
                  w.key = f.altKey ? d.C0.ESC + d.C0.CR : d.C0.CR;
                  w.cancel = true;
                  break;
                case 27:
                  w.key = d.C0.ESC;
                  if (f.altKey) {
                    w.key = d.C0.ESC + d.C0.ESC;
                  }
                  w.cancel = true;
                  break;
                case 37:
                  if (f.metaKey) {
                    break;
                  }
                  if (g) {
                    w.key = d.C0.ESC + "[1;" + (g + 1) + "D";
                    if (w.key === d.C0.ESC + "[1;3D") {
                      w.key = d.C0.ESC + (_ ? "b" : "[1;5D");
                    }
                  } else {
                    w.key = S ? d.C0.ESC + "OD" : d.C0.ESC + "[D";
                  }
                  break;
                case 39:
                  if (f.metaKey) {
                    break;
                  }
                  if (g) {
                    w.key = d.C0.ESC + "[1;" + (g + 1) + "C";
                    if (w.key === d.C0.ESC + "[1;3C") {
                      w.key = d.C0.ESC + (_ ? "f" : "[1;5C");
                    }
                  } else {
                    w.key = S ? d.C0.ESC + "OC" : d.C0.ESC + "[C";
                  }
                  break;
                case 38:
                  if (f.metaKey) {
                    break;
                  }
                  if (g) {
                    w.key = d.C0.ESC + "[1;" + (g + 1) + "A";
                    if (!_ && w.key === d.C0.ESC + "[1;3A") {
                      w.key = d.C0.ESC + "[1;5A";
                    }
                  } else {
                    w.key = S ? d.C0.ESC + "OA" : d.C0.ESC + "[A";
                  }
                  break;
                case 40:
                  if (f.metaKey) {
                    break;
                  }
                  if (g) {
                    w.key = d.C0.ESC + "[1;" + (g + 1) + "B";
                    if (!_ && w.key === d.C0.ESC + "[1;3B") {
                      w.key = d.C0.ESC + "[1;5B";
                    }
                  } else {
                    w.key = S ? d.C0.ESC + "OB" : d.C0.ESC + "[B";
                  }
                  break;
                case 45:
                  if (!f.shiftKey && !f.ctrlKey) {
                    w.key = d.C0.ESC + "[2~";
                  }
                  break;
                case 46:
                  w.key = g ? d.C0.ESC + "[3;" + (g + 1) + "~" : d.C0.ESC + "[3~";
                  break;
                case 36:
                  w.key = g ? d.C0.ESC + "[1;" + (g + 1) + "H" : S ? d.C0.ESC + "OH" : d.C0.ESC + "[H";
                  break;
                case 35:
                  w.key = g ? d.C0.ESC + "[1;" + (g + 1) + "F" : S ? d.C0.ESC + "OF" : d.C0.ESC + "[F";
                  break;
                case 33:
                  if (f.shiftKey) {
                    w.type = 2;
                  } else if (f.ctrlKey) {
                    w.key = d.C0.ESC + "[5;" + (g + 1) + "~";
                  } else {
                    w.key = d.C0.ESC + "[5~";
                  }
                  break;
                case 34:
                  if (f.shiftKey) {
                    w.type = 3;
                  } else if (f.ctrlKey) {
                    w.key = d.C0.ESC + "[6;" + (g + 1) + "~";
                  } else {
                    w.key = d.C0.ESC + "[6~";
                  }
                  break;
                case 112:
                  w.key = g ? d.C0.ESC + "[1;" + (g + 1) + "P" : d.C0.ESC + "OP";
                  break;
                case 113:
                  w.key = g ? d.C0.ESC + "[1;" + (g + 1) + "Q" : d.C0.ESC + "OQ";
                  break;
                case 114:
                  w.key = g ? d.C0.ESC + "[1;" + (g + 1) + "R" : d.C0.ESC + "OR";
                  break;
                case 115:
                  w.key = g ? d.C0.ESC + "[1;" + (g + 1) + "S" : d.C0.ESC + "OS";
                  break;
                case 116:
                  w.key = g ? d.C0.ESC + "[15;" + (g + 1) + "~" : d.C0.ESC + "[15~";
                  break;
                case 117:
                  w.key = g ? d.C0.ESC + "[17;" + (g + 1) + "~" : d.C0.ESC + "[17~";
                  break;
                case 118:
                  w.key = g ? d.C0.ESC + "[18;" + (g + 1) + "~" : d.C0.ESC + "[18~";
                  break;
                case 119:
                  w.key = g ? d.C0.ESC + "[19;" + (g + 1) + "~" : d.C0.ESC + "[19~";
                  break;
                case 120:
                  w.key = g ? d.C0.ESC + "[20;" + (g + 1) + "~" : d.C0.ESC + "[20~";
                  break;
                case 121:
                  w.key = g ? d.C0.ESC + "[21;" + (g + 1) + "~" : d.C0.ESC + "[21~";
                  break;
                case 122:
                  w.key = g ? d.C0.ESC + "[23;" + (g + 1) + "~" : d.C0.ESC + "[23~";
                  break;
                case 123:
                  w.key = g ? d.C0.ESC + "[24;" + (g + 1) + "~" : d.C0.ESC + "[24~";
                  break;
                default:
                  if (!f.ctrlKey || f.shiftKey || f.altKey || f.metaKey) {
                    if (_ && !x || !f.altKey || f.metaKey) {
                      if (!_ || f.altKey || f.ctrlKey || f.shiftKey || !f.metaKey) {
                        if (f.key && !f.ctrlKey && !f.altKey && !f.metaKey && f.keyCode >= 48 && f.key.length === 1) {
                          w.key = f.key;
                        } else if (f.key && f.ctrlKey) {
                          if (f.key === "_") {
                            w.key = d.C0.US;
                          }
                          if (f.key === "@") {
                            w.key = d.C0.NUL;
                          }
                        }
                      } else if (f.keyCode === 65) {
                        w.type = 1;
                      }
                    } else {
                      const b = p[f.keyCode];
                      const m = b == null ? undefined : b[f.shiftKey ? 1 : 0];
                      if (m) {
                        w.key = d.C0.ESC + m;
                      } else if (f.keyCode >= 65 && f.keyCode <= 90) {
                        const v = f.ctrlKey ? f.keyCode - 64 : f.keyCode + 32;
                        let C = String.fromCharCode(v);
                        if (f.shiftKey) {
                          C = C.toUpperCase();
                        }
                        w.key = d.C0.ESC + C;
                      } else if (f.keyCode === 32) {
                        w.key = d.C0.ESC + (f.ctrlKey ? d.C0.NUL : " ");
                      } else if (f.key === "Dead" && f.code.startsWith("Key")) {
                        let v = f.code.slice(3, 4);
                        if (!f.shiftKey) {
                          v = v.toLowerCase();
                        }
                        w.key = d.C0.ESC + v;
                        w.cancel = true;
                      }
                    }
                  } else if (f.keyCode >= 65 && f.keyCode <= 90) {
                    w.key = String.fromCharCode(f.keyCode - 64);
                  } else if (f.keyCode === 32) {
                    w.key = d.C0.NUL;
                  } else if (f.keyCode >= 51 && f.keyCode <= 55) {
                    w.key = String.fromCharCode(f.keyCode - 51 + 27);
                  } else if (f.keyCode === 56) {
                    w.key = d.C0.DEL;
                  } else if (f.keyCode === 219) {
                    w.key = d.C0.ESC;
                  } else if (f.keyCode === 220) {
                    w.key = d.C0.FS;
                  } else if (f.keyCode === 221) {
                    w.key = d.C0.GS;
                  }
              }
              return w;
            };
          },
          482: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.Utf8ToUtf32 = a.StringToUtf32 = a.utf32ToString = a.stringFromCodePoint = undefined;
            a.stringFromCodePoint = function (c) {
              if (c > 65535) {
                c -= 65536;
                return String.fromCharCode(55296 + (c >> 10)) + String.fromCharCode(c % 1024 + 56320);
              } else {
                return String.fromCharCode(c);
              }
            };
            a.utf32ToString = function (c, d = 0, p = c.length) {
              let f = "";
              for (let S = d; S < p; ++S) {
                let _ = c[S];
                if (_ > 65535) {
                  _ -= 65536;
                  f += String.fromCharCode(55296 + (_ >> 10)) + String.fromCharCode(_ % 1024 + 56320);
                } else {
                  f += String.fromCharCode(_);
                }
              }
              return f;
            };
            a.StringToUtf32 = class {
              constructor() {
                this._interim = 0;
              }
              clear() {
                this._interim = 0;
              }
              decode(c, d) {
                const p = c.length;
                if (!p) {
                  return 0;
                }
                let f = 0;
                let S = 0;
                if (this._interim) {
                  const _ = c.charCodeAt(S++);
                  if (_ >= 56320 && _ <= 57343) {
                    d[f++] = (this._interim - 55296) * 1024 + _ - 56320 + 65536;
                  } else {
                    d[f++] = this._interim;
                    d[f++] = _;
                  }
                  this._interim = 0;
                }
                for (let _ = S; _ < p; ++_) {
                  const x = c.charCodeAt(_);
                  if (x >= 55296 && x <= 56319) {
                    if (++_ >= p) {
                      this._interim = x;
                      return f;
                    }
                    const w = c.charCodeAt(_);
                    if (w >= 56320 && w <= 57343) {
                      d[f++] = (x - 55296) * 1024 + w - 56320 + 65536;
                    } else {
                      d[f++] = x;
                      d[f++] = w;
                    }
                  } else if (x !== 65279) {
                    d[f++] = x;
                  }
                }
                return f;
              }
            };
            a.Utf8ToUtf32 = class {
              constructor() {
                this.interim = new Uint8Array(3);
              }
              clear() {
                this.interim.fill(0);
              }
              decode(c, d) {
                const p = c.length;
                if (!p) {
                  return 0;
                }
                let f;
                let S;
                let _;
                let x;
                let w = 0;
                let g = 0;
                let b = 0;
                if (this.interim[0]) {
                  let C = false;
                  let T = this.interim[0];
                  T &= (T & 224) == 192 ? 31 : (T & 240) == 224 ? 15 : 7;
                  let A;
                  let M = 0;
                  while ((A = this.interim[++M] & 63) && M < 4) {
                    T <<= 6;
                    T |= A;
                  }
                  const R = (this.interim[0] & 224) == 192 ? 2 : (this.interim[0] & 240) == 224 ? 3 : 4;
                  const I = R - M;
                  while (b < I) {
                    if (b >= p) {
                      return 0;
                    }
                    A = c[b++];
                    if ((A & 192) != 128) {
                      b--;
                      C = true;
                      break;
                    }
                    this.interim[M++] = A;
                    T <<= 6;
                    T |= A & 63;
                  }
                  if (!C) {
                    if (R === 2) {
                      if (T < 128) {
                        b--;
                      } else {
                        d[w++] = T;
                      }
                    } else if (R === 3) {
                      if (!(T < 2048) && (!(T >= 55296) || !(T <= 57343)) && T !== 65279) {
                        d[w++] = T;
                      }
                    } else if (!(T < 65536) && !(T > 1114111)) {
                      d[w++] = T;
                    }
                  }
                  this.interim.fill(0);
                }
                const m = p - 4;
                let v = b;
                while (v < p) {
                  while (!!(v < m) && !((f = c[v]) & 128) && !((S = c[v + 1]) & 128) && !((_ = c[v + 2]) & 128) && !((x = c[v + 3]) & 128)) {
                    d[w++] = f;
                    d[w++] = S;
                    d[w++] = _;
                    d[w++] = x;
                    v += 4;
                  }
                  f = c[v++];
                  if (f < 128) {
                    d[w++] = f;
                  } else if ((f & 224) == 192) {
                    if (v >= p) {
                      this.interim[0] = f;
                      return w;
                    }
                    S = c[v++];
                    if ((S & 192) != 128) {
                      v--;
                      continue;
                    }
                    g = (f & 31) << 6 | S & 63;
                    if (g < 128) {
                      v--;
                      continue;
                    }
                    d[w++] = g;
                  } else if ((f & 240) == 224) {
                    if (v >= p) {
                      this.interim[0] = f;
                      return w;
                    }
                    S = c[v++];
                    if ((S & 192) != 128) {
                      v--;
                      continue;
                    }
                    if (v >= p) {
                      this.interim[0] = f;
                      this.interim[1] = S;
                      return w;
                    }
                    _ = c[v++];
                    if ((_ & 192) != 128) {
                      v--;
                      continue;
                    }
                    g = (f & 15) << 12 | (S & 63) << 6 | _ & 63;
                    if (g < 2048 || g >= 55296 && g <= 57343 || g === 65279) {
                      continue;
                    }
                    d[w++] = g;
                  } else if ((f & 248) == 240) {
                    if (v >= p) {
                      this.interim[0] = f;
                      return w;
                    }
                    S = c[v++];
                    if ((S & 192) != 128) {
                      v--;
                      continue;
                    }
                    if (v >= p) {
                      this.interim[0] = f;
                      this.interim[1] = S;
                      return w;
                    }
                    _ = c[v++];
                    if ((_ & 192) != 128) {
                      v--;
                      continue;
                    }
                    if (v >= p) {
                      this.interim[0] = f;
                      this.interim[1] = S;
                      this.interim[2] = _;
                      return w;
                    }
                    x = c[v++];
                    if ((x & 192) != 128) {
                      v--;
                      continue;
                    }
                    g = (f & 7) << 18 | (S & 63) << 12 | (_ & 63) << 6 | x & 63;
                    if (g < 65536 || g > 1114111) {
                      continue;
                    }
                    d[w++] = g;
                  }
                }
                return w;
              }
            };
          },
          225: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.UnicodeV6 = undefined;
            const d = c(1480);
            const p = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286, 64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531]];
            const f = [[68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]];
            let S;
            a.UnicodeV6 = class {
              constructor() {
                this.version = "6";
                if (!S) {
                  S = new Uint8Array(65536);
                  S.fill(1);
                  S[0] = 0;
                  S.fill(0, 1, 32);
                  S.fill(0, 127, 160);
                  S.fill(2, 4352, 4448);
                  S[9001] = 2;
                  S[9002] = 2;
                  S.fill(2, 11904, 42192);
                  S[12351] = 1;
                  S.fill(2, 44032, 55204);
                  S.fill(2, 63744, 64256);
                  S.fill(2, 65040, 65050);
                  S.fill(2, 65072, 65136);
                  S.fill(2, 65280, 65377);
                  S.fill(2, 65504, 65511);
                  for (let _ = 0; _ < p.length; ++_) {
                    S.fill(0, p[_][0], p[_][1] + 1);
                  }
                }
              }
              wcwidth(_) {
                if (_ < 32) {
                  return 0;
                } else if (_ < 127) {
                  return 1;
                } else if (_ < 65536) {
                  return S[_];
                } else if (function (x, w) {
                  let g;
                  let b = 0;
                  let m = w.length - 1;
                  if (x < w[0][0] || x > w[m][1]) {
                    return false;
                  }
                  while (m >= b) {
                    g = b + m >> 1;
                    if (x > w[g][1]) {
                      b = g + 1;
                    } else {
                      if (!(x < w[g][0])) {
                        return true;
                      }
                      m = g - 1;
                    }
                  }
                  return false;
                }(_, f)) {
                  return 0;
                } else if (_ >= 131072 && _ <= 196605 || _ >= 196608 && _ <= 262141) {
                  return 2;
                } else {
                  return 1;
                }
              }
              charProperties(_, x) {
                let w = this.wcwidth(_);
                let g = w === 0 && x !== 0;
                if (g) {
                  const b = d.UnicodeService.extractWidth(x);
                  if (b === 0) {
                    g = false;
                  } else if (b > w) {
                    w = b;
                  }
                }
                return d.UnicodeService.createPropertyValue(0, w, g);
              }
            };
          },
          5981: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.WriteBuffer = undefined;
            const d = c(8460);
            const p = c(844);
            class f extends p.Disposable {
              constructor(_) {
                super();
                this._action = _;
                this._writeBuffer = [];
                this._callbacks = [];
                this._pendingData = 0;
                this._bufferOffset = 0;
                this._isSyncWriting = false;
                this._syncCalls = 0;
                this._didUserInput = false;
                this._onWriteParsed = this.register(new d.EventEmitter());
                this.onWriteParsed = this._onWriteParsed.event;
              }
              handleUserInput() {
                this._didUserInput = true;
              }
              writeSync(_, x) {
                if (x !== undefined && this._syncCalls > x) {
                  this._syncCalls = 0;
                  return;
                }
                this._pendingData += _.length;
                this._writeBuffer.push(_);
                this._callbacks.push(undefined);
                this._syncCalls++;
                if (this._isSyncWriting) {
                  return;
                }
                let w;
                for (this._isSyncWriting = true; w = this._writeBuffer.shift();) {
                  this._action(w);
                  const g = this._callbacks.shift();
                  if (g) {
                    g();
                  }
                }
                this._pendingData = 0;
                this._bufferOffset = 2147483647;
                this._isSyncWriting = false;
                this._syncCalls = 0;
              }
              write(_, x) {
                if (this._pendingData > 50000000) {
                  throw new Error("write data discarded, use flow control to avoid losing data");
                }
                if (!this._writeBuffer.length) {
                  this._bufferOffset = 0;
                  if (this._didUserInput) {
                    this._didUserInput = false;
                    this._pendingData += _.length;
                    this._writeBuffer.push(_);
                    this._callbacks.push(x);
                    this._innerWrite();
                    return;
                  }
                  setTimeout(() => this._innerWrite());
                }
                this._pendingData += _.length;
                this._writeBuffer.push(_);
                this._callbacks.push(x);
              }
              _innerWrite(_ = 0, x = true) {
                const w = _ || Date.now();
                while (this._writeBuffer.length > this._bufferOffset) {
                  const g = this._writeBuffer[this._bufferOffset];
                  const b = this._action(g, x);
                  if (b) {
                    const v = C => Date.now() - w >= 12 ? setTimeout(() => this._innerWrite(0, C)) : this._innerWrite(w, C);
                    b.catch(C => {
                      queueMicrotask(() => {
                        throw C;
                      });
                      return Promise.resolve(false);
                    }).then(v);
                    return;
                  }
                  const m = this._callbacks[this._bufferOffset];
                  if (m) {
                    m();
                  }
                  this._bufferOffset++;
                  this._pendingData -= g.length;
                  if (Date.now() - w >= 12) {
                    break;
                  }
                }
                if (this._writeBuffer.length > this._bufferOffset) {
                  if (this._bufferOffset > 50) {
                    this._writeBuffer = this._writeBuffer.slice(this._bufferOffset);
                    this._callbacks = this._callbacks.slice(this._bufferOffset);
                    this._bufferOffset = 0;
                  }
                  setTimeout(() => this._innerWrite());
                } else {
                  this._writeBuffer.length = 0;
                  this._callbacks.length = 0;
                  this._pendingData = 0;
                  this._bufferOffset = 0;
                }
                this._onWriteParsed.fire();
              }
            }
            a.WriteBuffer = f;
          },
          5941: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.toRgbString = a.parseColor = undefined;
            const c = /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/;
            const d = /^[\da-f]+$/;
            function p(f, S) {
              const _ = f.toString(16);
              const x = _.length < 2 ? "0" + _ : _;
              switch (S) {
                case 4:
                  return _[0];
                case 8:
                  return x;
                case 12:
                  return (x + x).slice(0, 3);
                default:
                  return x + x;
              }
            }
            a.parseColor = function (f) {
              if (!f) {
                return;
              }
              let S = f.toLowerCase();
              if (S.indexOf("rgb:") === 0) {
                S = S.slice(4);
                const _ = c.exec(S);
                if (_) {
                  const x = _[1] ? 15 : _[4] ? 255 : _[7] ? 4095 : 65535;
                  return [Math.round(parseInt(_[1] || _[4] || _[7] || _[10], 16) / x * 255), Math.round(parseInt(_[2] || _[5] || _[8] || _[11], 16) / x * 255), Math.round(parseInt(_[3] || _[6] || _[9] || _[12], 16) / x * 255)];
                }
              } else if (S.indexOf("#") === 0 && (S = S.slice(1), d.exec(S) && [3, 6, 9, 12].includes(S.length))) {
                const _ = S.length / 3;
                const x = [0, 0, 0];
                for (let w = 0; w < 3; ++w) {
                  const g = parseInt(S.slice(_ * w, _ * w + _), 16);
                  x[w] = _ === 1 ? g << 4 : _ === 2 ? g : _ === 3 ? g >> 4 : g >> 8;
                }
                return x;
              }
            };
            a.toRgbString = function (f, S = 16) {
              const [_, x, w] = f;
              return `rgb:${p(_, S)}/${p(x, S)}/${p(w, S)}`;
            };
          },
          5770: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.PAYLOAD_LIMIT = undefined;
            a.PAYLOAD_LIMIT = 10000000;
          },
          6351: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.DcsHandler = a.DcsParser = undefined;
            const d = c(482);
            const p = c(8742);
            const f = c(5770);
            const S = [];
            a.DcsParser = class {
              constructor() {
                this._handlers = Object.create(null);
                this._active = S;
                this._ident = 0;
                this._handlerFb = () => {};
                this._stack = {
                  paused: false,
                  loopPosition: 0,
                  fallThrough: false
                };
              }
              dispose() {
                this._handlers = Object.create(null);
                this._handlerFb = () => {};
                this._active = S;
              }
              registerHandler(x, w) {
                if (this._handlers[x] === undefined) {
                  this._handlers[x] = [];
                }
                const g = this._handlers[x];
                g.push(w);
                return {
                  dispose: () => {
                    const b = g.indexOf(w);
                    if (b !== -1) {
                      g.splice(b, 1);
                    }
                  }
                };
              }
              clearHandler(x) {
                if (this._handlers[x]) {
                  delete this._handlers[x];
                }
              }
              setHandlerFallback(x) {
                this._handlerFb = x;
              }
              reset() {
                if (this._active.length) {
                  for (let x = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; x >= 0; --x) {
                    this._active[x].unhook(false);
                  }
                }
                this._stack.paused = false;
                this._active = S;
                this._ident = 0;
              }
              hook(x, w) {
                this.reset();
                this._ident = x;
                this._active = this._handlers[x] || S;
                if (this._active.length) {
                  for (let g = this._active.length - 1; g >= 0; g--) {
                    this._active[g].hook(w);
                  }
                } else {
                  this._handlerFb(this._ident, "HOOK", w);
                }
              }
              put(x, w, g) {
                if (this._active.length) {
                  for (let b = this._active.length - 1; b >= 0; b--) {
                    this._active[b].put(x, w, g);
                  }
                } else {
                  this._handlerFb(this._ident, "PUT", (0, d.utf32ToString)(x, w, g));
                }
              }
              unhook(x, w = true) {
                if (this._active.length) {
                  let g = false;
                  let b = this._active.length - 1;
                  let m = false;
                  if (this._stack.paused) {
                    b = this._stack.loopPosition - 1;
                    g = w;
                    m = this._stack.fallThrough;
                    this._stack.paused = false;
                  }
                  if (!m && g === false) {
                    for (; b >= 0 && (g = this._active[b].unhook(x), g !== true); b--) {
                      if (g instanceof Promise) {
                        this._stack.paused = true;
                        this._stack.loopPosition = b;
                        this._stack.fallThrough = false;
                        return g;
                      }
                    }
                    b--;
                  }
                  for (; b >= 0; b--) {
                    g = this._active[b].unhook(false);
                    if (g instanceof Promise) {
                      this._stack.paused = true;
                      this._stack.loopPosition = b;
                      this._stack.fallThrough = true;
                      return g;
                    }
                  }
                } else {
                  this._handlerFb(this._ident, "UNHOOK", x);
                }
                this._active = S;
                this._ident = 0;
              }
            };
            const _ = new p.Params();
            _.addParam(0);
            a.DcsHandler = class {
              constructor(x) {
                this._handler = x;
                this._data = "";
                this._params = _;
                this._hitLimit = false;
              }
              hook(x) {
                this._params = x.length > 1 || x.params[0] ? x.clone() : _;
                this._data = "";
                this._hitLimit = false;
              }
              put(x, w, g) {
                if (!this._hitLimit) {
                  this._data += (0, d.utf32ToString)(x, w, g);
                  if (this._data.length > f.PAYLOAD_LIMIT) {
                    this._data = "";
                    this._hitLimit = true;
                  }
                }
              }
              unhook(x) {
                let w = false;
                if (this._hitLimit) {
                  w = false;
                } else if (x && (w = this._handler(this._data, this._params), w instanceof Promise)) {
                  return w.then(g => {
                    this._params = _;
                    this._data = "";
                    this._hitLimit = false;
                    return g;
                  });
                }
                this._params = _;
                this._data = "";
                this._hitLimit = false;
                return w;
              }
            };
          },
          2015: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.EscapeSequenceParser = a.VT500_TRANSITION_TABLE = a.TransitionTable = undefined;
            const d = c(844);
            const p = c(8742);
            const f = c(6242);
            const S = c(6351);
            class _ {
              constructor(b) {
                this.table = new Uint8Array(b);
              }
              setDefault(b, m) {
                this.table.fill(b << 4 | m);
              }
              add(b, m, v, C) {
                this.table[m << 8 | b] = v << 4 | C;
              }
              addMany(b, m, v, C) {
                for (let T = 0; T < b.length; T++) {
                  this.table[m << 8 | b[T]] = v << 4 | C;
                }
              }
            }
            a.TransitionTable = _;
            const x = 160;
            a.VT500_TRANSITION_TABLE = function () {
              const g = new _(4095);
              const b = Array.apply(null, Array(256)).map((M, R) => R);
              const m = (M, R) => b.slice(M, R);
              const v = m(32, 127);
              const C = m(0, 24);
              C.push(25);
              C.push.apply(C, m(28, 32));
              const T = m(0, 14);
              let A;
              g.setDefault(1, 0);
              g.addMany(v, 0, 2, 0);
              for (A in T) {
                g.addMany([24, 26, 153, 154], A, 3, 0);
                g.addMany(m(128, 144), A, 3, 0);
                g.addMany(m(144, 152), A, 3, 0);
                g.add(156, A, 0, 0);
                g.add(27, A, 11, 1);
                g.add(157, A, 4, 8);
                g.addMany([152, 158, 159], A, 0, 7);
                g.add(155, A, 11, 3);
                g.add(144, A, 11, 9);
              }
              g.addMany(C, 0, 3, 0);
              g.addMany(C, 1, 3, 1);
              g.add(127, 1, 0, 1);
              g.addMany(C, 8, 0, 8);
              g.addMany(C, 3, 3, 3);
              g.add(127, 3, 0, 3);
              g.addMany(C, 4, 3, 4);
              g.add(127, 4, 0, 4);
              g.addMany(C, 6, 3, 6);
              g.addMany(C, 5, 3, 5);
              g.add(127, 5, 0, 5);
              g.addMany(C, 2, 3, 2);
              g.add(127, 2, 0, 2);
              g.add(93, 1, 4, 8);
              g.addMany(v, 8, 5, 8);
              g.add(127, 8, 5, 8);
              g.addMany([156, 27, 24, 26, 7], 8, 6, 0);
              g.addMany(m(28, 32), 8, 0, 8);
              g.addMany([88, 94, 95], 1, 0, 7);
              g.addMany(v, 7, 0, 7);
              g.addMany(C, 7, 0, 7);
              g.add(156, 7, 0, 0);
              g.add(127, 7, 0, 7);
              g.add(91, 1, 11, 3);
              g.addMany(m(64, 127), 3, 7, 0);
              g.addMany(m(48, 60), 3, 8, 4);
              g.addMany([60, 61, 62, 63], 3, 9, 4);
              g.addMany(m(48, 60), 4, 8, 4);
              g.addMany(m(64, 127), 4, 7, 0);
              g.addMany([60, 61, 62, 63], 4, 0, 6);
              g.addMany(m(32, 64), 6, 0, 6);
              g.add(127, 6, 0, 6);
              g.addMany(m(64, 127), 6, 0, 0);
              g.addMany(m(32, 48), 3, 9, 5);
              g.addMany(m(32, 48), 5, 9, 5);
              g.addMany(m(48, 64), 5, 0, 6);
              g.addMany(m(64, 127), 5, 7, 0);
              g.addMany(m(32, 48), 4, 9, 5);
              g.addMany(m(32, 48), 1, 9, 2);
              g.addMany(m(32, 48), 2, 9, 2);
              g.addMany(m(48, 127), 2, 10, 0);
              g.addMany(m(48, 80), 1, 10, 0);
              g.addMany(m(81, 88), 1, 10, 0);
              g.addMany([89, 90, 92], 1, 10, 0);
              g.addMany(m(96, 127), 1, 10, 0);
              g.add(80, 1, 11, 9);
              g.addMany(C, 9, 0, 9);
              g.add(127, 9, 0, 9);
              g.addMany(m(28, 32), 9, 0, 9);
              g.addMany(m(32, 48), 9, 9, 12);
              g.addMany(m(48, 60), 9, 8, 10);
              g.addMany([60, 61, 62, 63], 9, 9, 10);
              g.addMany(C, 11, 0, 11);
              g.addMany(m(32, 128), 11, 0, 11);
              g.addMany(m(28, 32), 11, 0, 11);
              g.addMany(C, 10, 0, 10);
              g.add(127, 10, 0, 10);
              g.addMany(m(28, 32), 10, 0, 10);
              g.addMany(m(48, 60), 10, 8, 10);
              g.addMany([60, 61, 62, 63], 10, 0, 11);
              g.addMany(m(32, 48), 10, 9, 12);
              g.addMany(C, 12, 0, 12);
              g.add(127, 12, 0, 12);
              g.addMany(m(28, 32), 12, 0, 12);
              g.addMany(m(32, 48), 12, 9, 12);
              g.addMany(m(48, 64), 12, 0, 11);
              g.addMany(m(64, 127), 12, 12, 13);
              g.addMany(m(64, 127), 10, 12, 13);
              g.addMany(m(64, 127), 9, 12, 13);
              g.addMany(C, 13, 13, 13);
              g.addMany(v, 13, 13, 13);
              g.add(127, 13, 0, 13);
              g.addMany([27, 156, 24, 26], 13, 14, 0);
              g.add(x, 0, 2, 0);
              g.add(x, 8, 5, 8);
              g.add(x, 6, 0, 6);
              g.add(x, 11, 0, 11);
              g.add(x, 13, 13, 13);
              return g;
            }();
            class w extends d.Disposable {
              constructor(b = a.VT500_TRANSITION_TABLE) {
                super();
                this._transitions = b;
                this._parseStack = {
                  state: 0,
                  handlers: [],
                  handlerPos: 0,
                  transition: 0,
                  chunkPos: 0
                };
                this.initialState = 0;
                this.currentState = this.initialState;
                this._params = new p.Params();
                this._params.addParam(0);
                this._collect = 0;
                this.precedingJoinState = 0;
                this._printHandlerFb = (m, v, C) => {};
                this._executeHandlerFb = m => {};
                this._csiHandlerFb = (m, v) => {};
                this._escHandlerFb = m => {};
                this._errorHandlerFb = m => m;
                this._printHandler = this._printHandlerFb;
                this._executeHandlers = Object.create(null);
                this._csiHandlers = Object.create(null);
                this._escHandlers = Object.create(null);
                this.register((0, d.toDisposable)(() => {
                  this._csiHandlers = Object.create(null);
                  this._executeHandlers = Object.create(null);
                  this._escHandlers = Object.create(null);
                }));
                this._oscParser = this.register(new f.OscParser());
                this._dcsParser = this.register(new S.DcsParser());
                this._errorHandler = this._errorHandlerFb;
                this.registerEscHandler({
                  final: "\\"
                }, () => true);
              }
              _identifier(b, m = [64, 126]) {
                let v = 0;
                if (b.prefix) {
                  if (b.prefix.length > 1) {
                    throw new Error("only one byte as prefix supported");
                  }
                  v = b.prefix.charCodeAt(0);
                  if (v && v < 60 || v > 63) {
                    throw new Error("prefix must be in range 0x3c .. 0x3f");
                  }
                }
                if (b.intermediates) {
                  if (b.intermediates.length > 2) {
                    throw new Error("only two bytes as intermediates are supported");
                  }
                  for (let T = 0; T < b.intermediates.length; ++T) {
                    const A = b.intermediates.charCodeAt(T);
                    if (A < 32 || A > 47) {
                      throw new Error("intermediate must be in range 0x20 .. 0x2f");
                    }
                    v <<= 8;
                    v |= A;
                  }
                }
                if (b.final.length !== 1) {
                  throw new Error("final must be a single byte");
                }
                const C = b.final.charCodeAt(0);
                if (m[0] > C || C > m[1]) {
                  throw new Error(`final must be in range ${m[0]} .. ${m[1]}`);
                }
                v <<= 8;
                v |= C;
                return v;
              }
              identToString(b) {
                const m = [];
                while (b) {
                  m.push(String.fromCharCode(b & 255));
                  b >>= 8;
                }
                return m.reverse().join("");
              }
              setPrintHandler(b) {
                this._printHandler = b;
              }
              clearPrintHandler() {
                this._printHandler = this._printHandlerFb;
              }
              registerEscHandler(b, m) {
                const v = this._identifier(b, [48, 126]);
                if (this._escHandlers[v] === undefined) {
                  this._escHandlers[v] = [];
                }
                const C = this._escHandlers[v];
                C.push(m);
                return {
                  dispose: () => {
                    const T = C.indexOf(m);
                    if (T !== -1) {
                      C.splice(T, 1);
                    }
                  }
                };
              }
              clearEscHandler(b) {
                if (this._escHandlers[this._identifier(b, [48, 126])]) {
                  delete this._escHandlers[this._identifier(b, [48, 126])];
                }
              }
              setEscHandlerFallback(b) {
                this._escHandlerFb = b;
              }
              setExecuteHandler(b, m) {
                this._executeHandlers[b.charCodeAt(0)] = m;
              }
              clearExecuteHandler(b) {
                if (this._executeHandlers[b.charCodeAt(0)]) {
                  delete this._executeHandlers[b.charCodeAt(0)];
                }
              }
              setExecuteHandlerFallback(b) {
                this._executeHandlerFb = b;
              }
              registerCsiHandler(b, m) {
                const v = this._identifier(b);
                if (this._csiHandlers[v] === undefined) {
                  this._csiHandlers[v] = [];
                }
                const C = this._csiHandlers[v];
                C.push(m);
                return {
                  dispose: () => {
                    const T = C.indexOf(m);
                    if (T !== -1) {
                      C.splice(T, 1);
                    }
                  }
                };
              }
              clearCsiHandler(b) {
                if (this._csiHandlers[this._identifier(b)]) {
                  delete this._csiHandlers[this._identifier(b)];
                }
              }
              setCsiHandlerFallback(b) {
                this._csiHandlerFb = b;
              }
              registerDcsHandler(b, m) {
                return this._dcsParser.registerHandler(this._identifier(b), m);
              }
              clearDcsHandler(b) {
                this._dcsParser.clearHandler(this._identifier(b));
              }
              setDcsHandlerFallback(b) {
                this._dcsParser.setHandlerFallback(b);
              }
              registerOscHandler(b, m) {
                return this._oscParser.registerHandler(b, m);
              }
              clearOscHandler(b) {
                this._oscParser.clearHandler(b);
              }
              setOscHandlerFallback(b) {
                this._oscParser.setHandlerFallback(b);
              }
              setErrorHandler(b) {
                this._errorHandler = b;
              }
              clearErrorHandler() {
                this._errorHandler = this._errorHandlerFb;
              }
              reset() {
                this.currentState = this.initialState;
                this._oscParser.reset();
                this._dcsParser.reset();
                this._params.reset();
                this._params.addParam(0);
                this._collect = 0;
                this.precedingJoinState = 0;
                if (this._parseStack.state !== 0) {
                  this._parseStack.state = 2;
                  this._parseStack.handlers = [];
                }
              }
              _preserveStack(b, m, v, C, T) {
                this._parseStack.state = b;
                this._parseStack.handlers = m;
                this._parseStack.handlerPos = v;
                this._parseStack.transition = C;
                this._parseStack.chunkPos = T;
              }
              parse(b, m, v) {
                let C;
                let T = 0;
                let A = 0;
                let M = 0;
                if (this._parseStack.state) {
                  if (this._parseStack.state === 2) {
                    this._parseStack.state = 0;
                    M = this._parseStack.chunkPos + 1;
                  } else {
                    if (v === undefined || this._parseStack.state === 1) {
                      this._parseStack.state = 1;
                      throw new Error("improper continuation due to previous async handler, giving up parsing");
                    }
                    const R = this._parseStack.handlers;
                    let I = this._parseStack.handlerPos - 1;
                    switch (this._parseStack.state) {
                      case 3:
                        if (v === false && I > -1) {
                          for (; I >= 0 && (C = R[I](this._params), C !== true); I--) {
                            if (C instanceof Promise) {
                              this._parseStack.handlerPos = I;
                              return C;
                            }
                          }
                        }
                        this._parseStack.handlers = [];
                        break;
                      case 4:
                        if (v === false && I > -1) {
                          for (; I >= 0 && (C = R[I](), C !== true); I--) {
                            if (C instanceof Promise) {
                              this._parseStack.handlerPos = I;
                              return C;
                            }
                          }
                        }
                        this._parseStack.handlers = [];
                        break;
                      case 6:
                        T = b[this._parseStack.chunkPos];
                        C = this._dcsParser.unhook(T !== 24 && T !== 26, v);
                        if (C) {
                          return C;
                        }
                        if (T === 27) {
                          this._parseStack.transition |= 1;
                        }
                        this._params.reset();
                        this._params.addParam(0);
                        this._collect = 0;
                        break;
                      case 5:
                        T = b[this._parseStack.chunkPos];
                        C = this._oscParser.end(T !== 24 && T !== 26, v);
                        if (C) {
                          return C;
                        }
                        if (T === 27) {
                          this._parseStack.transition |= 1;
                        }
                        this._params.reset();
                        this._params.addParam(0);
                        this._collect = 0;
                    }
                    this._parseStack.state = 0;
                    M = this._parseStack.chunkPos + 1;
                    this.precedingJoinState = 0;
                    this.currentState = this._parseStack.transition & 15;
                  }
                }
                for (let R = M; R < m; ++R) {
                  T = b[R];
                  A = this._transitions.table[this.currentState << 8 | (T < 160 ? T : x)];
                  switch (A >> 4) {
                    case 2:
                      for (let N = R + 1;; ++N) {
                        if (N >= m || (T = b[N]) < 32 || T > 126 && T < x) {
                          this._printHandler(b, R, N);
                          R = N - 1;
                          break;
                        }
                        if (++N >= m || (T = b[N]) < 32 || T > 126 && T < x) {
                          this._printHandler(b, R, N);
                          R = N - 1;
                          break;
                        }
                        if (++N >= m || (T = b[N]) < 32 || T > 126 && T < x) {
                          this._printHandler(b, R, N);
                          R = N - 1;
                          break;
                        }
                        if (++N >= m || (T = b[N]) < 32 || T > 126 && T < x) {
                          this._printHandler(b, R, N);
                          R = N - 1;
                          break;
                        }
                      }
                      break;
                    case 3:
                      if (this._executeHandlers[T]) {
                        this._executeHandlers[T]();
                      } else {
                        this._executeHandlerFb(T);
                      }
                      this.precedingJoinState = 0;
                      break;
                    case 0:
                      break;
                    case 1:
                      if (this._errorHandler({
                        position: R,
                        code: T,
                        currentState: this.currentState,
                        collect: this._collect,
                        params: this._params,
                        abort: false
                      }).abort) {
                        return;
                      }
                      break;
                    case 7:
                      const I = this._csiHandlers[this._collect << 8 | T];
                      let j = I ? I.length - 1 : -1;
                      for (; j >= 0 && (C = I[j](this._params), C !== true); j--) {
                        if (C instanceof Promise) {
                          this._preserveStack(3, I, j, A, R);
                          return C;
                        }
                      }
                      if (j < 0) {
                        this._csiHandlerFb(this._collect << 8 | T, this._params);
                      }
                      this.precedingJoinState = 0;
                      break;
                    case 8:
                      do {
                        switch (T) {
                          case 59:
                            this._params.addParam(0);
                            break;
                          case 58:
                            this._params.addSubParam(-1);
                            break;
                          default:
                            this._params.addDigit(T - 48);
                        }
                      } while (++R < m && (T = b[R]) > 47 && T < 60);
                      R--;
                      break;
                    case 9:
                      this._collect <<= 8;
                      this._collect |= T;
                      break;
                    case 10:
                      const W = this._escHandlers[this._collect << 8 | T];
                      let z = W ? W.length - 1 : -1;
                      for (; z >= 0 && (C = W[z](), C !== true); z--) {
                        if (C instanceof Promise) {
                          this._preserveStack(4, W, z, A, R);
                          return C;
                        }
                      }
                      if (z < 0) {
                        this._escHandlerFb(this._collect << 8 | T);
                      }
                      this.precedingJoinState = 0;
                      break;
                    case 11:
                      this._params.reset();
                      this._params.addParam(0);
                      this._collect = 0;
                      break;
                    case 12:
                      this._dcsParser.hook(this._collect << 8 | T, this._params);
                      break;
                    case 13:
                      for (let N = R + 1;; ++N) {
                        if (N >= m || (T = b[N]) === 24 || T === 26 || T === 27 || T > 127 && T < x) {
                          this._dcsParser.put(b, R, N);
                          R = N - 1;
                          break;
                        }
                      }
                      break;
                    case 14:
                      C = this._dcsParser.unhook(T !== 24 && T !== 26);
                      if (C) {
                        this._preserveStack(6, [], 0, A, R);
                        return C;
                      }
                      if (T === 27) {
                        A |= 1;
                      }
                      this._params.reset();
                      this._params.addParam(0);
                      this._collect = 0;
                      this.precedingJoinState = 0;
                      break;
                    case 4:
                      this._oscParser.start();
                      break;
                    case 5:
                      for (let N = R + 1;; N++) {
                        if (N >= m || (T = b[N]) < 32 || T > 127 && T < x) {
                          this._oscParser.put(b, R, N);
                          R = N - 1;
                          break;
                        }
                      }
                      break;
                    case 6:
                      C = this._oscParser.end(T !== 24 && T !== 26);
                      if (C) {
                        this._preserveStack(5, [], 0, A, R);
                        return C;
                      }
                      if (T === 27) {
                        A |= 1;
                      }
                      this._params.reset();
                      this._params.addParam(0);
                      this._collect = 0;
                      this.precedingJoinState = 0;
                  }
                  this.currentState = A & 15;
                }
              }
            }
            a.EscapeSequenceParser = w;
          },
          6242: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.OscHandler = a.OscParser = undefined;
            const d = c(5770);
            const p = c(482);
            const f = [];
            a.OscParser = class {
              constructor() {
                this._state = 0;
                this._active = f;
                this._id = -1;
                this._handlers = Object.create(null);
                this._handlerFb = () => {};
                this._stack = {
                  paused: false,
                  loopPosition: 0,
                  fallThrough: false
                };
              }
              registerHandler(S, _) {
                if (this._handlers[S] === undefined) {
                  this._handlers[S] = [];
                }
                const x = this._handlers[S];
                x.push(_);
                return {
                  dispose: () => {
                    const w = x.indexOf(_);
                    if (w !== -1) {
                      x.splice(w, 1);
                    }
                  }
                };
              }
              clearHandler(S) {
                if (this._handlers[S]) {
                  delete this._handlers[S];
                }
              }
              setHandlerFallback(S) {
                this._handlerFb = S;
              }
              dispose() {
                this._handlers = Object.create(null);
                this._handlerFb = () => {};
                this._active = f;
              }
              reset() {
                if (this._state === 2) {
                  for (let S = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; S >= 0; --S) {
                    this._active[S].end(false);
                  }
                }
                this._stack.paused = false;
                this._active = f;
                this._id = -1;
                this._state = 0;
              }
              _start() {
                this._active = this._handlers[this._id] || f;
                if (this._active.length) {
                  for (let S = this._active.length - 1; S >= 0; S--) {
                    this._active[S].start();
                  }
                } else {
                  this._handlerFb(this._id, "START");
                }
              }
              _put(S, _, x) {
                if (this._active.length) {
                  for (let w = this._active.length - 1; w >= 0; w--) {
                    this._active[w].put(S, _, x);
                  }
                } else {
                  this._handlerFb(this._id, "PUT", (0, p.utf32ToString)(S, _, x));
                }
              }
              start() {
                this.reset();
                this._state = 1;
              }
              put(S, _, x) {
                if (this._state !== 3) {
                  if (this._state === 1) {
                    while (_ < x) {
                      const w = S[_++];
                      if (w === 59) {
                        this._state = 2;
                        this._start();
                        break;
                      }
                      if (w < 48 || w > 57) {
                        this._state = 3;
                        return;
                      }
                      if (this._id === -1) {
                        this._id = 0;
                      }
                      this._id = this._id * 10 + w - 48;
                    }
                  }
                  if (this._state === 2 && x - _ > 0) {
                    this._put(S, _, x);
                  }
                }
              }
              end(S, _ = true) {
                if (this._state !== 0) {
                  if (this._state !== 3) {
                    if (this._state === 1) {
                      this._start();
                    }
                    if (this._active.length) {
                      let x = false;
                      let w = this._active.length - 1;
                      let g = false;
                      if (this._stack.paused) {
                        w = this._stack.loopPosition - 1;
                        x = _;
                        g = this._stack.fallThrough;
                        this._stack.paused = false;
                      }
                      if (!g && x === false) {
                        for (; w >= 0 && (x = this._active[w].end(S), x !== true); w--) {
                          if (x instanceof Promise) {
                            this._stack.paused = true;
                            this._stack.loopPosition = w;
                            this._stack.fallThrough = false;
                            return x;
                          }
                        }
                        w--;
                      }
                      for (; w >= 0; w--) {
                        x = this._active[w].end(false);
                        if (x instanceof Promise) {
                          this._stack.paused = true;
                          this._stack.loopPosition = w;
                          this._stack.fallThrough = true;
                          return x;
                        }
                      }
                    } else {
                      this._handlerFb(this._id, "END", S);
                    }
                  }
                  this._active = f;
                  this._id = -1;
                  this._state = 0;
                }
              }
            };
            a.OscHandler = class {
              constructor(S) {
                this._handler = S;
                this._data = "";
                this._hitLimit = false;
              }
              start() {
                this._data = "";
                this._hitLimit = false;
              }
              put(S, _, x) {
                if (!this._hitLimit) {
                  this._data += (0, p.utf32ToString)(S, _, x);
                  if (this._data.length > d.PAYLOAD_LIMIT) {
                    this._data = "";
                    this._hitLimit = true;
                  }
                }
              }
              end(S) {
                let _ = false;
                if (this._hitLimit) {
                  _ = false;
                } else if (S && (_ = this._handler(this._data), _ instanceof Promise)) {
                  return _.then(x => {
                    this._data = "";
                    this._hitLimit = false;
                    return x;
                  });
                }
                this._data = "";
                this._hitLimit = false;
                return _;
              }
            };
          },
          8742: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.Params = undefined;
            const c = 2147483647;
            class d {
              static fromArray(f) {
                const S = new d();
                if (!f.length) {
                  return S;
                }
                for (let _ = Array.isArray(f[0]) ? 1 : 0; _ < f.length; ++_) {
                  const x = f[_];
                  if (Array.isArray(x)) {
                    for (let w = 0; w < x.length; ++w) {
                      S.addSubParam(x[w]);
                    }
                  } else {
                    S.addParam(x);
                  }
                }
                return S;
              }
              constructor(f = 32, S = 32) {
                this.maxLength = f;
                this.maxSubParamsLength = S;
                if (S > 256) {
                  throw new Error("maxSubParamsLength must not be greater than 256");
                }
                this.params = new Int32Array(f);
                this.length = 0;
                this._subParams = new Int32Array(S);
                this._subParamsLength = 0;
                this._subParamsIdx = new Uint16Array(f);
                this._rejectDigits = false;
                this._rejectSubDigits = false;
                this._digitIsSub = false;
              }
              clone() {
                const f = new d(this.maxLength, this.maxSubParamsLength);
                f.params.set(this.params);
                f.length = this.length;
                f._subParams.set(this._subParams);
                f._subParamsLength = this._subParamsLength;
                f._subParamsIdx.set(this._subParamsIdx);
                f._rejectDigits = this._rejectDigits;
                f._rejectSubDigits = this._rejectSubDigits;
                f._digitIsSub = this._digitIsSub;
                return f;
              }
              toArray() {
                const f = [];
                for (let S = 0; S < this.length; ++S) {
                  f.push(this.params[S]);
                  const _ = this._subParamsIdx[S] >> 8;
                  const x = this._subParamsIdx[S] & 255;
                  if (x - _ > 0) {
                    f.push(Array.prototype.slice.call(this._subParams, _, x));
                  }
                }
                return f;
              }
              reset() {
                this.length = 0;
                this._subParamsLength = 0;
                this._rejectDigits = false;
                this._rejectSubDigits = false;
                this._digitIsSub = false;
              }
              addParam(f) {
                this._digitIsSub = false;
                if (this.length >= this.maxLength) {
                  this._rejectDigits = true;
                } else {
                  if (f < -1) {
                    throw new Error("values lesser than -1 are not allowed");
                  }
                  this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength;
                  this.params[this.length++] = f > c ? c : f;
                }
              }
              addSubParam(f) {
                this._digitIsSub = true;
                if (this.length) {
                  if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength) {
                    this._rejectSubDigits = true;
                  } else {
                    if (f < -1) {
                      throw new Error("values lesser than -1 are not allowed");
                    }
                    this._subParams[this._subParamsLength++] = f > c ? c : f;
                    this._subParamsIdx[this.length - 1]++;
                  }
                }
              }
              hasSubParams(f) {
                return (this._subParamsIdx[f] & 255) - (this._subParamsIdx[f] >> 8) > 0;
              }
              getSubParams(f) {
                const S = this._subParamsIdx[f] >> 8;
                const _ = this._subParamsIdx[f] & 255;
                if (_ - S > 0) {
                  return this._subParams.subarray(S, _);
                } else {
                  return null;
                }
              }
              getSubParamsAll() {
                const f = {};
                for (let S = 0; S < this.length; ++S) {
                  const _ = this._subParamsIdx[S] >> 8;
                  const x = this._subParamsIdx[S] & 255;
                  if (x - _ > 0) {
                    f[S] = this._subParams.slice(_, x);
                  }
                }
                return f;
              }
              addDigit(f) {
                let S;
                if (this._rejectDigits || !(S = this._digitIsSub ? this._subParamsLength : this.length) || this._digitIsSub && this._rejectSubDigits) {
                  return;
                }
                const _ = this._digitIsSub ? this._subParams : this.params;
                const x = _[S - 1];
                _[S - 1] = ~x ? Math.min(x * 10 + f, c) : f;
              }
            }
            a.Params = d;
          },
          5741: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.AddonManager = undefined;
            a.AddonManager = class {
              constructor() {
                this._addons = [];
              }
              dispose() {
                for (let c = this._addons.length - 1; c >= 0; c--) {
                  this._addons[c].instance.dispose();
                }
              }
              loadAddon(c, d) {
                const p = {
                  instance: d,
                  dispose: d.dispose,
                  isDisposed: false
                };
                this._addons.push(p);
                d.dispose = () => this._wrappedAddonDispose(p);
                d.activate(c);
              }
              _wrappedAddonDispose(c) {
                if (c.isDisposed) {
                  return;
                }
                let d = -1;
                for (let p = 0; p < this._addons.length; p++) {
                  if (this._addons[p] === c) {
                    d = p;
                    break;
                  }
                }
                if (d === -1) {
                  throw new Error("Could not dispose an addon that has not been loaded");
                }
                c.isDisposed = true;
                c.dispose.apply(c.instance);
                this._addons.splice(d, 1);
              }
            };
          },
          8771: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.BufferApiView = undefined;
            const d = c(3785);
            const p = c(511);
            a.BufferApiView = class {
              constructor(f, S) {
                this._buffer = f;
                this.type = S;
              }
              init(f) {
                this._buffer = f;
                return this;
              }
              get cursorY() {
                return this._buffer.y;
              }
              get cursorX() {
                return this._buffer.x;
              }
              get viewportY() {
                return this._buffer.ydisp;
              }
              get baseY() {
                return this._buffer.ybase;
              }
              get length() {
                return this._buffer.lines.length;
              }
              getLine(f) {
                const S = this._buffer.lines.get(f);
                if (S) {
                  return new d.BufferLineApiView(S);
                }
              }
              getNullCell() {
                return new p.CellData();
              }
            };
          },
          3785: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.BufferLineApiView = undefined;
            const d = c(511);
            a.BufferLineApiView = class {
              constructor(p) {
                this._line = p;
              }
              get isWrapped() {
                return this._line.isWrapped;
              }
              get length() {
                return this._line.length;
              }
              getCell(p, f) {
                if (!(p < 0) && !(p >= this._line.length)) {
                  if (f) {
                    this._line.loadCell(p, f);
                    return f;
                  } else {
                    return this._line.loadCell(p, new d.CellData());
                  }
                }
              }
              translateToString(p, f, S) {
                return this._line.translateToString(p, f, S);
              }
            };
          },
          8285: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.BufferNamespaceApi = undefined;
            const d = c(8771);
            const p = c(8460);
            const f = c(844);
            class S extends f.Disposable {
              constructor(x) {
                super();
                this._core = x;
                this._onBufferChange = this.register(new p.EventEmitter());
                this.onBufferChange = this._onBufferChange.event;
                this._normal = new d.BufferApiView(this._core.buffers.normal, "normal");
                this._alternate = new d.BufferApiView(this._core.buffers.alt, "alternate");
                this._core.buffers.onBufferActivate(() => this._onBufferChange.fire(this.active));
              }
              get active() {
                if (this._core.buffers.active === this._core.buffers.normal) {
                  return this.normal;
                }
                if (this._core.buffers.active === this._core.buffers.alt) {
                  return this.alternate;
                }
                throw new Error("Active buffer is neither normal nor alternate");
              }
              get normal() {
                return this._normal.init(this._core.buffers.normal);
              }
              get alternate() {
                return this._alternate.init(this._core.buffers.alt);
              }
            }
            a.BufferNamespaceApi = S;
          },
          7975: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.ParserApi = undefined;
            a.ParserApi = class {
              constructor(c) {
                this._core = c;
              }
              registerCsiHandler(c, d) {
                return this._core.registerCsiHandler(c, p => d(p.toArray()));
              }
              addCsiHandler(c, d) {
                return this.registerCsiHandler(c, d);
              }
              registerDcsHandler(c, d) {
                return this._core.registerDcsHandler(c, (p, f) => d(p, f.toArray()));
              }
              addDcsHandler(c, d) {
                return this.registerDcsHandler(c, d);
              }
              registerEscHandler(c, d) {
                return this._core.registerEscHandler(c, d);
              }
              addEscHandler(c, d) {
                return this.registerEscHandler(c, d);
              }
              registerOscHandler(c, d) {
                return this._core.registerOscHandler(c, d);
              }
              addOscHandler(c, d) {
                return this.registerOscHandler(c, d);
              }
            };
          },
          7090: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.UnicodeApi = undefined;
            a.UnicodeApi = class {
              constructor(c) {
                this._core = c;
              }
              register(c) {
                this._core.unicodeService.register(c);
              }
              get versions() {
                return this._core.unicodeService.versions;
              }
              get activeVersion() {
                return this._core.unicodeService.activeVersion;
              }
              set activeVersion(c) {
                this._core.unicodeService.activeVersion = c;
              }
            };
          },
          744: function (h, a, c) {
            var d = this && this.__decorate || function (g, b, m, v) {
              var C;
              var T = arguments.length;
              var A = T < 3 ? b : v === null ? v = Object.getOwnPropertyDescriptor(b, m) : v;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                A = Reflect.decorate(g, b, m, v);
              } else {
                for (var M = g.length - 1; M >= 0; M--) {
                  if (C = g[M]) {
                    A = (T < 3 ? C(A) : T > 3 ? C(b, m, A) : C(b, m)) || A;
                  }
                }
              }
              if (T > 3 && A) {
                Object.defineProperty(b, m, A);
              }
              return A;
            };
            var p = this && this.__param || function (g, b) {
              return function (m, v) {
                b(m, v, g);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.BufferService = a.MINIMUM_ROWS = a.MINIMUM_COLS = undefined;
            const f = c(8460);
            const S = c(844);
            const _ = c(5295);
            const x = c(2585);
            a.MINIMUM_COLS = 2;
            a.MINIMUM_ROWS = 1;
            let w = a.BufferService = class extends S.Disposable {
              get buffer() {
                return this.buffers.active;
              }
              constructor(g) {
                super();
                this.isUserScrolling = false;
                this._onResize = this.register(new f.EventEmitter());
                this.onResize = this._onResize.event;
                this._onScroll = this.register(new f.EventEmitter());
                this.onScroll = this._onScroll.event;
                this.cols = Math.max(g.rawOptions.cols || 0, a.MINIMUM_COLS);
                this.rows = Math.max(g.rawOptions.rows || 0, a.MINIMUM_ROWS);
                this.buffers = this.register(new _.BufferSet(g, this));
              }
              resize(g, b) {
                this.cols = g;
                this.rows = b;
                this.buffers.resize(g, b);
                this._onResize.fire({
                  cols: g,
                  rows: b
                });
              }
              reset() {
                this.buffers.reset();
                this.isUserScrolling = false;
              }
              scroll(g, b = false) {
                const m = this.buffer;
                let v;
                v = this._cachedBlankLine;
                if (!v || v.length !== this.cols || v.getFg(0) !== g.fg || v.getBg(0) !== g.bg) {
                  v = m.getBlankLine(g, b);
                  this._cachedBlankLine = v;
                }
                v.isWrapped = b;
                const C = m.ybase + m.scrollTop;
                const T = m.ybase + m.scrollBottom;
                if (m.scrollTop === 0) {
                  const A = m.lines.isFull;
                  if (T === m.lines.length - 1) {
                    if (A) {
                      m.lines.recycle().copyFrom(v);
                    } else {
                      m.lines.push(v.clone());
                    }
                  } else {
                    m.lines.splice(T + 1, 0, v.clone());
                  }
                  if (A) {
                    if (this.isUserScrolling) {
                      m.ydisp = Math.max(m.ydisp - 1, 0);
                    }
                  } else {
                    m.ybase++;
                    if (!this.isUserScrolling) {
                      m.ydisp++;
                    }
                  }
                } else {
                  const A = T - C + 1;
                  m.lines.shiftElements(C + 1, A - 1, -1);
                  m.lines.set(T, v.clone());
                }
                if (!this.isUserScrolling) {
                  m.ydisp = m.ybase;
                }
                this._onScroll.fire(m.ydisp);
              }
              scrollLines(g, b, m) {
                const v = this.buffer;
                if (g < 0) {
                  if (v.ydisp === 0) {
                    return;
                  }
                  this.isUserScrolling = true;
                } else if (g + v.ydisp >= v.ybase) {
                  this.isUserScrolling = false;
                }
                const C = v.ydisp;
                v.ydisp = Math.max(Math.min(v.ydisp + g, v.ybase), 0);
                if (C !== v.ydisp) {
                  if (!b) {
                    this._onScroll.fire(v.ydisp);
                  }
                }
              }
            };
            a.BufferService = w = d([p(0, x.IOptionsService)], w);
          },
          7994: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.CharsetService = undefined;
            a.CharsetService = class {
              constructor() {
                this.glevel = 0;
                this._charsets = [];
              }
              reset() {
                this.charset = undefined;
                this._charsets = [];
                this.glevel = 0;
              }
              setgLevel(c) {
                this.glevel = c;
                this.charset = this._charsets[c];
              }
              setgCharset(c, d) {
                this._charsets[c] = d;
                if (this.glevel === c) {
                  this.charset = d;
                }
              }
            };
          },
          1753: function (h, a, c) {
            var d = this && this.__decorate || function (v, C, T, A) {
              var M;
              var R = arguments.length;
              var I = R < 3 ? C : A === null ? A = Object.getOwnPropertyDescriptor(C, T) : A;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                I = Reflect.decorate(v, C, T, A);
              } else {
                for (var j = v.length - 1; j >= 0; j--) {
                  if (M = v[j]) {
                    I = (R < 3 ? M(I) : R > 3 ? M(C, T, I) : M(C, T)) || I;
                  }
                }
              }
              if (R > 3 && I) {
                Object.defineProperty(C, T, I);
              }
              return I;
            };
            var p = this && this.__param || function (v, C) {
              return function (T, A) {
                C(T, A, v);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.CoreMouseService = undefined;
            const f = c(2585);
            const S = c(8460);
            const _ = c(844);
            const x = {
              NONE: {
                events: 0,
                restrict: () => false
              },
              X10: {
                events: 1,
                restrict: v => v.button !== 4 && v.action === 1 && (v.ctrl = false, v.alt = false, v.shift = false, true)
              },
              VT200: {
                events: 19,
                restrict: v => v.action !== 32
              },
              DRAG: {
                events: 23,
                restrict: v => v.action !== 32 || v.button !== 3
              },
              ANY: {
                events: 31,
                restrict: v => true
              }
            };
            function w(v, C) {
              let T = (v.ctrl ? 16 : 0) | (v.shift ? 4 : 0) | (v.alt ? 8 : 0);
              if (v.button === 4) {
                T |= 64;
                T |= v.action;
              } else {
                T |= v.button & 3;
                if (v.button & 4) {
                  T |= 64;
                }
                if (v.button & 8) {
                  T |= 128;
                }
                if (v.action === 32) {
                  T |= 32;
                } else if (v.action === 0 && !C) {
                  T |= 3;
                }
              }
              return T;
            }
            const g = String.fromCharCode;
            const b = {
              DEFAULT: v => {
                const C = [w(v, false) + 32, v.col + 32, v.row + 32];
                if (C[0] > 255 || C[1] > 255 || C[2] > 255) {
                  return "";
                } else {
                  return `\x1B[M${g(C[0])}${g(C[1])}${g(C[2])}`;
                }
              },
              SGR: v => {
                const C = v.action === 0 && v.button !== 4 ? "m" : "M";
                return `\x1B[<${w(v, true)};${v.col};${v.row}${C}`;
              },
              SGR_PIXELS: v => {
                const C = v.action === 0 && v.button !== 4 ? "m" : "M";
                return `\x1B[<${w(v, true)};${v.x};${v.y}${C}`;
              }
            };
            let m = a.CoreMouseService = class extends _.Disposable {
              constructor(v, C) {
                super();
                this._bufferService = v;
                this._coreService = C;
                this._protocols = {};
                this._encodings = {};
                this._activeProtocol = "";
                this._activeEncoding = "";
                this._lastEvent = null;
                this._onProtocolChange = this.register(new S.EventEmitter());
                this.onProtocolChange = this._onProtocolChange.event;
                for (const T of Object.keys(x)) {
                  this.addProtocol(T, x[T]);
                }
                for (const T of Object.keys(b)) {
                  this.addEncoding(T, b[T]);
                }
                this.reset();
              }
              addProtocol(v, C) {
                this._protocols[v] = C;
              }
              addEncoding(v, C) {
                this._encodings[v] = C;
              }
              get activeProtocol() {
                return this._activeProtocol;
              }
              get areMouseEventsActive() {
                return this._protocols[this._activeProtocol].events !== 0;
              }
              set activeProtocol(v) {
                if (!this._protocols[v]) {
                  throw new Error(`unknown protocol "${v}"`);
                }
                this._activeProtocol = v;
                this._onProtocolChange.fire(this._protocols[v].events);
              }
              get activeEncoding() {
                return this._activeEncoding;
              }
              set activeEncoding(v) {
                if (!this._encodings[v]) {
                  throw new Error(`unknown encoding "${v}"`);
                }
                this._activeEncoding = v;
              }
              reset() {
                this.activeProtocol = "NONE";
                this.activeEncoding = "DEFAULT";
                this._lastEvent = null;
              }
              triggerMouseEvent(v) {
                if (v.col < 0 || v.col >= this._bufferService.cols || v.row < 0 || v.row >= this._bufferService.rows || v.button === 4 && v.action === 32 || v.button === 3 && v.action !== 32 || v.button !== 4 && (v.action === 2 || v.action === 3) || (v.col++, v.row++, v.action === 32 && this._lastEvent && this._equalEvents(this._lastEvent, v, this._activeEncoding === "SGR_PIXELS")) || !this._protocols[this._activeProtocol].restrict(v)) {
                  return false;
                }
                const C = this._encodings[this._activeEncoding](v);
                if (C) {
                  if (this._activeEncoding === "DEFAULT") {
                    this._coreService.triggerBinaryEvent(C);
                  } else {
                    this._coreService.triggerDataEvent(C, true);
                  }
                }
                this._lastEvent = v;
                return true;
              }
              explainEvents(v) {
                return {
                  down: !!(v & 1),
                  up: !!(v & 2),
                  drag: !!(v & 4),
                  move: !!(v & 8),
                  wheel: !!(v & 16)
                };
              }
              _equalEvents(v, C, T) {
                if (T) {
                  if (v.x !== C.x || v.y !== C.y) {
                    return false;
                  }
                } else if (v.col !== C.col || v.row !== C.row) {
                  return false;
                }
                return v.button === C.button && v.action === C.action && v.ctrl === C.ctrl && v.alt === C.alt && v.shift === C.shift;
              }
            };
            a.CoreMouseService = m = d([p(0, f.IBufferService), p(1, f.ICoreService)], m);
          },
          6975: function (h, a, c) {
            var d = this && this.__decorate || function (m, v, C, T) {
              var A;
              var M = arguments.length;
              var R = M < 3 ? v : T === null ? T = Object.getOwnPropertyDescriptor(v, C) : T;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                R = Reflect.decorate(m, v, C, T);
              } else {
                for (var I = m.length - 1; I >= 0; I--) {
                  if (A = m[I]) {
                    R = (M < 3 ? A(R) : M > 3 ? A(v, C, R) : A(v, C)) || R;
                  }
                }
              }
              if (M > 3 && R) {
                Object.defineProperty(v, C, R);
              }
              return R;
            };
            var p = this && this.__param || function (m, v) {
              return function (C, T) {
                v(C, T, m);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.CoreService = undefined;
            const f = c(1439);
            const S = c(8460);
            const _ = c(844);
            const x = c(2585);
            const w = Object.freeze({
              insertMode: false
            });
            const g = Object.freeze({
              applicationCursorKeys: false,
              applicationKeypad: false,
              bracketedPasteMode: false,
              origin: false,
              reverseWraparound: false,
              sendFocus: false,
              wraparound: true
            });
            let b = a.CoreService = class extends _.Disposable {
              constructor(m, v, C) {
                super();
                this._bufferService = m;
                this._logService = v;
                this._optionsService = C;
                this.isCursorInitialized = false;
                this.isCursorHidden = false;
                this._onData = this.register(new S.EventEmitter());
                this.onData = this._onData.event;
                this._onUserInput = this.register(new S.EventEmitter());
                this.onUserInput = this._onUserInput.event;
                this._onBinary = this.register(new S.EventEmitter());
                this.onBinary = this._onBinary.event;
                this._onRequestScrollToBottom = this.register(new S.EventEmitter());
                this.onRequestScrollToBottom = this._onRequestScrollToBottom.event;
                this.modes = (0, f.clone)(w);
                this.decPrivateModes = (0, f.clone)(g);
              }
              reset() {
                this.modes = (0, f.clone)(w);
                this.decPrivateModes = (0, f.clone)(g);
              }
              triggerDataEvent(m, v = false) {
                if (this._optionsService.rawOptions.disableStdin) {
                  return;
                }
                const C = this._bufferService.buffer;
                if (v && this._optionsService.rawOptions.scrollOnUserInput && C.ybase !== C.ydisp) {
                  this._onRequestScrollToBottom.fire();
                }
                if (v) {
                  this._onUserInput.fire();
                }
                this._logService.debug(`sending data "${m}"`, () => m.split("").map(T => T.charCodeAt(0)));
                this._onData.fire(m);
              }
              triggerBinaryEvent(m) {
                if (!this._optionsService.rawOptions.disableStdin) {
                  this._logService.debug(`sending binary "${m}"`, () => m.split("").map(v => v.charCodeAt(0)));
                  this._onBinary.fire(m);
                }
              }
            };
            a.CoreService = b = d([p(0, x.IBufferService), p(1, x.ILogService), p(2, x.IOptionsService)], b);
          },
          9074: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.DecorationService = undefined;
            const d = c(8055);
            const p = c(8460);
            const f = c(844);
            const S = c(6106);
            let _ = 0;
            let x = 0;
            class w extends f.Disposable {
              get decorations() {
                return this._decorations.values();
              }
              constructor() {
                super();
                this._decorations = new S.SortedList(m => m == null ? undefined : m.marker.line);
                this._onDecorationRegistered = this.register(new p.EventEmitter());
                this.onDecorationRegistered = this._onDecorationRegistered.event;
                this._onDecorationRemoved = this.register(new p.EventEmitter());
                this.onDecorationRemoved = this._onDecorationRemoved.event;
                this.register((0, f.toDisposable)(() => this.reset()));
              }
              registerDecoration(m) {
                if (m.marker.isDisposed) {
                  return;
                }
                const v = new g(m);
                if (v) {
                  const C = v.marker.onDispose(() => v.dispose());
                  v.onDispose(() => {
                    if (v) {
                      if (this._decorations.delete(v)) {
                        this._onDecorationRemoved.fire(v);
                      }
                      C.dispose();
                    }
                  });
                  this._decorations.insert(v);
                  this._onDecorationRegistered.fire(v);
                }
                return v;
              }
              reset() {
                for (const m of this._decorations.values()) {
                  m.dispose();
                }
                this._decorations.clear();
              }
              *getDecorationsAtCell(m, v, C) {
                let T = 0;
                let A = 0;
                for (const M of this._decorations.getKeyIterator(v)) {
                  T = M.options.x ?? 0;
                  A = T + (M.options.width ?? 1);
                  if (m >= T && m < A && (!C || (M.options.layer ?? "bottom") === C)) {
                    yield M;
                  }
                }
              }
              forEachDecorationAtCell(m, v, C, T) {
                this._decorations.forEachByKey(v, A => {
                  _ = A.options.x ?? 0;
                  x = _ + (A.options.width ?? 1);
                  if (m >= _ && m < x && (!C || (A.options.layer ?? "bottom") === C)) {
                    T(A);
                  }
                });
              }
            }
            a.DecorationService = w;
            class g extends f.Disposable {
              get isDisposed() {
                return this._isDisposed;
              }
              get backgroundColorRGB() {
                if (this._cachedBg === null) {
                  if (this.options.backgroundColor) {
                    this._cachedBg = d.css.toColor(this.options.backgroundColor);
                  } else {
                    this._cachedBg = undefined;
                  }
                }
                return this._cachedBg;
              }
              get foregroundColorRGB() {
                if (this._cachedFg === null) {
                  if (this.options.foregroundColor) {
                    this._cachedFg = d.css.toColor(this.options.foregroundColor);
                  } else {
                    this._cachedFg = undefined;
                  }
                }
                return this._cachedFg;
              }
              constructor(m) {
                super();
                this.options = m;
                this.onRenderEmitter = this.register(new p.EventEmitter());
                this.onRender = this.onRenderEmitter.event;
                this._onDispose = this.register(new p.EventEmitter());
                this.onDispose = this._onDispose.event;
                this._cachedBg = null;
                this._cachedFg = null;
                this.marker = m.marker;
                if (this.options.overviewRulerOptions && !this.options.overviewRulerOptions.position) {
                  this.options.overviewRulerOptions.position = "full";
                }
              }
              dispose() {
                this._onDispose.fire();
                super.dispose();
              }
            }
          },
          4348: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.InstantiationService = a.ServiceCollection = undefined;
            const d = c(2585);
            const p = c(8343);
            class f {
              constructor(..._) {
                this._entries = new Map();
                for (const [x, w] of _) {
                  this.set(x, w);
                }
              }
              set(_, x) {
                const w = this._entries.get(_);
                this._entries.set(_, x);
                return w;
              }
              forEach(_) {
                for (const [x, w] of this._entries.entries()) {
                  _(x, w);
                }
              }
              has(_) {
                return this._entries.has(_);
              }
              get(_) {
                return this._entries.get(_);
              }
            }
            a.ServiceCollection = f;
            a.InstantiationService = class {
              constructor() {
                this._services = new f();
                this._services.set(d.IInstantiationService, this);
              }
              setService(S, _) {
                this._services.set(S, _);
              }
              getService(S) {
                return this._services.get(S);
              }
              createInstance(S, ..._) {
                const x = (0, p.getServiceDependencies)(S).sort((b, m) => b.index - m.index);
                const w = [];
                for (const b of x) {
                  const m = this._services.get(b.id);
                  if (!m) {
                    throw new Error(`[createInstance] ${S.name} depends on UNKNOWN service ${b.id}.`);
                  }
                  w.push(m);
                }
                const g = x.length > 0 ? x[0].index : _.length;
                if (_.length !== g) {
                  throw new Error(`[createInstance] First service dependency of ${S.name} at position ${g + 1} conflicts with ${_.length} static arguments`);
                }
                return new S(..._, ...w);
              }
            };
          },
          7866: function (h, a, c) {
            var d = this && this.__decorate || function (g, b, m, v) {
              var C;
              var T = arguments.length;
              var A = T < 3 ? b : v === null ? v = Object.getOwnPropertyDescriptor(b, m) : v;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                A = Reflect.decorate(g, b, m, v);
              } else {
                for (var M = g.length - 1; M >= 0; M--) {
                  if (C = g[M]) {
                    A = (T < 3 ? C(A) : T > 3 ? C(b, m, A) : C(b, m)) || A;
                  }
                }
              }
              if (T > 3 && A) {
                Object.defineProperty(b, m, A);
              }
              return A;
            };
            var p = this && this.__param || function (g, b) {
              return function (m, v) {
                b(m, v, g);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.traceCall = a.setTraceLogger = a.LogService = undefined;
            const f = c(844);
            const S = c(2585);
            const _ = {
              trace: S.LogLevelEnum.TRACE,
              debug: S.LogLevelEnum.DEBUG,
              info: S.LogLevelEnum.INFO,
              warn: S.LogLevelEnum.WARN,
              error: S.LogLevelEnum.ERROR,
              off: S.LogLevelEnum.OFF
            };
            let x;
            let w = a.LogService = class extends f.Disposable {
              get logLevel() {
                return this._logLevel;
              }
              constructor(g) {
                super();
                this._optionsService = g;
                this._logLevel = S.LogLevelEnum.OFF;
                this._updateLogLevel();
                this.register(this._optionsService.onSpecificOptionChange("logLevel", () => this._updateLogLevel()));
                x = this;
              }
              _updateLogLevel() {
                this._logLevel = _[this._optionsService.rawOptions.logLevel];
              }
              _evalLazyOptionalParams(g) {
                for (let b = 0; b < g.length; b++) {
                  if (typeof g[b] == "function") {
                    g[b] = g[b]();
                  }
                }
              }
              _log(g, b, m) {
                this._evalLazyOptionalParams(m);
                g.call(console, (this._optionsService.options.logger ? "" : "xterm.js: ") + b, ...m);
              }
              trace(g, ...b) {
                var m;
                if (this._logLevel <= S.LogLevelEnum.TRACE) {
                  this._log(((m = this._optionsService.options.logger) == null ? undefined : m.trace.bind(this._optionsService.options.logger)) ?? console.log, g, b);
                }
              }
              debug(g, ...b) {
                var m;
                if (this._logLevel <= S.LogLevelEnum.DEBUG) {
                  this._log(((m = this._optionsService.options.logger) == null ? undefined : m.debug.bind(this._optionsService.options.logger)) ?? console.log, g, b);
                }
              }
              info(g, ...b) {
                var m;
                if (this._logLevel <= S.LogLevelEnum.INFO) {
                  this._log(((m = this._optionsService.options.logger) == null ? undefined : m.info.bind(this._optionsService.options.logger)) ?? console.info, g, b);
                }
              }
              warn(g, ...b) {
                var m;
                if (this._logLevel <= S.LogLevelEnum.WARN) {
                  this._log(((m = this._optionsService.options.logger) == null ? undefined : m.warn.bind(this._optionsService.options.logger)) ?? console.warn, g, b);
                }
              }
              error(g, ...b) {
                var m;
                if (this._logLevel <= S.LogLevelEnum.ERROR) {
                  this._log(((m = this._optionsService.options.logger) == null ? undefined : m.error.bind(this._optionsService.options.logger)) ?? console.error, g, b);
                }
              }
            };
            a.LogService = w = d([p(0, S.IOptionsService)], w);
            a.setTraceLogger = function (g) {
              x = g;
            };
            a.traceCall = function (g, b, m) {
              if (typeof m.value != "function") {
                throw new Error("not supported");
              }
              const v = m.value;
              m.value = function (...C) {
                if (x.logLevel !== S.LogLevelEnum.TRACE) {
                  return v.apply(this, C);
                }
                x.trace(`GlyphRenderer#${v.name}(${C.map(A => JSON.stringify(A)).join(", ")})`);
                const T = v.apply(this, C);
                x.trace(`GlyphRenderer#${v.name} return`, T);
                return T;
              };
            };
          },
          7302: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.OptionsService = a.DEFAULT_OPTIONS = undefined;
            const d = c(8460);
            const p = c(844);
            const f = c(6114);
            a.DEFAULT_OPTIONS = {
              cols: 80,
              rows: 24,
              cursorBlink: false,
              cursorStyle: "block",
              cursorWidth: 1,
              cursorInactiveStyle: "outline",
              customGlyphs: true,
              drawBoldTextInBrightColors: true,
              documentOverride: null,
              fastScrollModifier: "alt",
              fastScrollSensitivity: 5,
              fontFamily: "courier-new, courier, monospace",
              fontSize: 15,
              fontWeight: "normal",
              fontWeightBold: "bold",
              ignoreBracketedPasteMode: false,
              lineHeight: 1,
              letterSpacing: 0,
              linkHandler: null,
              logLevel: "info",
              logger: null,
              scrollback: 1000,
              scrollOnUserInput: true,
              scrollSensitivity: 1,
              screenReaderMode: false,
              smoothScrollDuration: 0,
              macOptionIsMeta: false,
              macOptionClickForcesSelection: false,
              minimumContrastRatio: 1,
              disableStdin: false,
              allowProposedApi: false,
              allowTransparency: false,
              tabStopWidth: 8,
              theme: {},
              rescaleOverlappingGlyphs: false,
              rightClickSelectsWord: f.isMac,
              windowOptions: {},
              windowsMode: false,
              windowsPty: {},
              wordSeparator: " ()[]{}',\"`",
              altClickMovesCursor: true,
              convertEol: false,
              termName: "xterm",
              cancelEvents: false,
              overviewRulerWidth: 0
            };
            const S = ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
            class _ extends p.Disposable {
              constructor(w) {
                super();
                this._onOptionChange = this.register(new d.EventEmitter());
                this.onOptionChange = this._onOptionChange.event;
                const g = {
                  ...a.DEFAULT_OPTIONS
                };
                for (const b in w) {
                  if (b in g) {
                    try {
                      const m = w[b];
                      g[b] = this._sanitizeAndValidateOption(b, m);
                    } catch (m) {
                      console.error(m);
                    }
                  }
                }
                this.rawOptions = g;
                this.options = {
                  ...g
                };
                this._setupOptions();
                this.register((0, p.toDisposable)(() => {
                  this.rawOptions.linkHandler = null;
                  this.rawOptions.documentOverride = null;
                }));
              }
              onSpecificOptionChange(w, g) {
                return this.onOptionChange(b => {
                  if (b === w) {
                    g(this.rawOptions[w]);
                  }
                });
              }
              onMultipleOptionChange(w, g) {
                return this.onOptionChange(b => {
                  if (w.indexOf(b) !== -1) {
                    g();
                  }
                });
              }
              _setupOptions() {
                const w = b => {
                  if (!(b in a.DEFAULT_OPTIONS)) {
                    throw new Error(`No option with key "${b}"`);
                  }
                  return this.rawOptions[b];
                };
                const g = (b, m) => {
                  if (!(b in a.DEFAULT_OPTIONS)) {
                    throw new Error(`No option with key "${b}"`);
                  }
                  m = this._sanitizeAndValidateOption(b, m);
                  if (this.rawOptions[b] !== m) {
                    this.rawOptions[b] = m;
                    this._onOptionChange.fire(b);
                  }
                };
                for (const b in this.rawOptions) {
                  const m = {
                    get: w.bind(this, b),
                    set: g.bind(this, b)
                  };
                  Object.defineProperty(this.options, b, m);
                }
              }
              _sanitizeAndValidateOption(w, g) {
                switch (w) {
                  case "cursorStyle":
                    g ||= a.DEFAULT_OPTIONS[w];
                    if (!function (b) {
                      return b === "block" || b === "underline" || b === "bar";
                    }(g)) {
                      throw new Error(`"${g}" is not a valid value for ${w}`);
                    }
                    break;
                  case "wordSeparator":
                    g ||= a.DEFAULT_OPTIONS[w];
                    break;
                  case "fontWeight":
                  case "fontWeightBold":
                    if (typeof g == "number" && g >= 1 && g <= 1000) {
                      break;
                    }
                    g = S.includes(g) ? g : a.DEFAULT_OPTIONS[w];
                    break;
                  case "cursorWidth":
                    g = Math.floor(g);
                  case "lineHeight":
                  case "tabStopWidth":
                    if (g < 1) {
                      throw new Error(`${w} cannot be less than 1, value: ${g}`);
                    }
                    break;
                  case "minimumContrastRatio":
                    g = Math.max(1, Math.min(21, Math.round(g * 10) / 10));
                    break;
                  case "scrollback":
                    if ((g = Math.min(g, 4294967295)) < 0) {
                      throw new Error(`${w} cannot be less than 0, value: ${g}`);
                    }
                    break;
                  case "fastScrollSensitivity":
                  case "scrollSensitivity":
                    if (g <= 0) {
                      throw new Error(`${w} cannot be less than or equal to 0, value: ${g}`);
                    }
                    break;
                  case "rows":
                  case "cols":
                    if (!g && g !== 0) {
                      throw new Error(`${w} must be numeric, value: ${g}`);
                    }
                    break;
                  case "windowsPty":
                    g = g ?? {};
                }
                return g;
              }
            }
            a.OptionsService = _;
          },
          2660: function (h, a, c) {
            var d = this && this.__decorate || function (_, x, w, g) {
              var b;
              var m = arguments.length;
              var v = m < 3 ? x : g === null ? g = Object.getOwnPropertyDescriptor(x, w) : g;
              if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
                v = Reflect.decorate(_, x, w, g);
              } else {
                for (var C = _.length - 1; C >= 0; C--) {
                  if (b = _[C]) {
                    v = (m < 3 ? b(v) : m > 3 ? b(x, w, v) : b(x, w)) || v;
                  }
                }
              }
              if (m > 3 && v) {
                Object.defineProperty(x, w, v);
              }
              return v;
            };
            var p = this && this.__param || function (_, x) {
              return function (w, g) {
                x(w, g, _);
              };
            };
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.OscLinkService = undefined;
            const f = c(2585);
            let S = a.OscLinkService = class {
              constructor(_) {
                this._bufferService = _;
                this._nextId = 1;
                this._entriesWithId = new Map();
                this._dataByLinkId = new Map();
              }
              registerLink(_) {
                const x = this._bufferService.buffer;
                if (_.id === undefined) {
                  const C = x.addMarker(x.ybase + x.y);
                  const T = {
                    data: _,
                    id: this._nextId++,
                    lines: [C]
                  };
                  C.onDispose(() => this._removeMarkerFromLink(T, C));
                  this._dataByLinkId.set(T.id, T);
                  return T.id;
                }
                const w = _;
                const g = this._getEntryIdKey(w);
                const b = this._entriesWithId.get(g);
                if (b) {
                  this.addLineToLink(b.id, x.ybase + x.y);
                  return b.id;
                }
                const m = x.addMarker(x.ybase + x.y);
                const v = {
                  id: this._nextId++,
                  key: this._getEntryIdKey(w),
                  data: w,
                  lines: [m]
                };
                m.onDispose(() => this._removeMarkerFromLink(v, m));
                this._entriesWithId.set(v.key, v);
                this._dataByLinkId.set(v.id, v);
                return v.id;
              }
              addLineToLink(_, x) {
                const w = this._dataByLinkId.get(_);
                if (w && w.lines.every(g => g.line !== x)) {
                  const g = this._bufferService.buffer.addMarker(x);
                  w.lines.push(g);
                  g.onDispose(() => this._removeMarkerFromLink(w, g));
                }
              }
              getLinkData(_) {
                var x;
                if ((x = this._dataByLinkId.get(_)) == null) {
                  return undefined;
                } else {
                  return x.data;
                }
              }
              _getEntryIdKey(_) {
                return `${_.id};;${_.uri}`;
              }
              _removeMarkerFromLink(_, x) {
                const w = _.lines.indexOf(x);
                if (w !== -1) {
                  _.lines.splice(w, 1);
                  if (_.lines.length === 0) {
                    if (_.data.id !== undefined) {
                      this._entriesWithId.delete(_.key);
                    }
                    this._dataByLinkId.delete(_.id);
                  }
                }
              }
            };
            a.OscLinkService = S = d([p(0, f.IBufferService)], S);
          },
          8343: (h, a) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.createDecorator = a.getServiceDependencies = a.serviceRegistry = undefined;
            const c = "di$target";
            const d = "di$dependencies";
            a.serviceRegistry = new Map();
            a.getServiceDependencies = function (p) {
              return p[d] || [];
            };
            a.createDecorator = function (p) {
              if (a.serviceRegistry.has(p)) {
                return a.serviceRegistry.get(p);
              }
              const f = function (S, _, x) {
                if (arguments.length !== 3) {
                  throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
                }
                (function (w, g, b) {
                  if (g[c] === g) {
                    g[d].push({
                      id: w,
                      index: b
                    });
                  } else {
                    g[d] = [{
                      id: w,
                      index: b
                    }];
                    g[c] = g;
                  }
                })(f, S, x);
              };
              f.toString = () => p;
              a.serviceRegistry.set(p, f);
              return f;
            };
          },
          2585: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.IDecorationService = a.IUnicodeService = a.IOscLinkService = a.IOptionsService = a.ILogService = a.LogLevelEnum = a.IInstantiationService = a.ICharsetService = a.ICoreService = a.ICoreMouseService = a.IBufferService = undefined;
            const d = c(8343);
            var p;
            a.IBufferService = (0, d.createDecorator)("BufferService");
            a.ICoreMouseService = (0, d.createDecorator)("CoreMouseService");
            a.ICoreService = (0, d.createDecorator)("CoreService");
            a.ICharsetService = (0, d.createDecorator)("CharsetService");
            a.IInstantiationService = (0, d.createDecorator)("InstantiationService");
            (function (f) {
              f[f.TRACE = 0] = "TRACE";
              f[f.DEBUG = 1] = "DEBUG";
              f[f.INFO = 2] = "INFO";
              f[f.WARN = 3] = "WARN";
              f[f.ERROR = 4] = "ERROR";
              f[f.OFF = 5] = "OFF";
            })(p || (a.LogLevelEnum = p = {}));
            a.ILogService = (0, d.createDecorator)("LogService");
            a.IOptionsService = (0, d.createDecorator)("OptionsService");
            a.IOscLinkService = (0, d.createDecorator)("OscLinkService");
            a.IUnicodeService = (0, d.createDecorator)("UnicodeService");
            a.IDecorationService = (0, d.createDecorator)("DecorationService");
          },
          1480: (h, a, c) => {
            Object.defineProperty(a, "__esModule", {
              value: true
            });
            a.UnicodeService = undefined;
            const d = c(8460);
            const p = c(225);
            class f {
              static extractShouldJoin(_) {
                return (_ & 1) != 0;
              }
              static extractWidth(_) {
                return _ >> 1 & 3;
              }
              static extractCharKind(_) {
                return _ >> 3;
              }
              static createPropertyValue(_, x, w = false) {
                return (_ & 16777215) << 3 | (x & 3) << 1 | (w ? 1 : 0);
              }
              constructor() {
                this._providers = Object.create(null);
                this._active = "";
                this._onChange = new d.EventEmitter();
                this.onChange = this._onChange.event;
                const _ = new p.UnicodeV6();
                this.register(_);
                this._active = _.version;
                this._activeProvider = _;
              }
              dispose() {
                this._onChange.dispose();
              }
              get versions() {
                return Object.keys(this._providers);
              }
              get activeVersion() {
                return this._active;
              }
              set activeVersion(_) {
                if (!this._providers[_]) {
                  throw new Error(`unknown Unicode version "${_}"`);
                }
                this._active = _;
                this._activeProvider = this._providers[_];
                this._onChange.fire(_);
              }
              register(_) {
                this._providers[_.version] = _;
              }
              wcwidth(_) {
                return this._activeProvider.wcwidth(_);
              }
              getStringCellWidth(_) {
                let x = 0;
                let w = 0;
                const g = _.length;
                for (let b = 0; b < g; ++b) {
                  let m = _.charCodeAt(b);
                  if (m >= 55296 && m <= 56319) {
                    if (++b >= g) {
                      return x + this.wcwidth(m);
                    }
                    const T = _.charCodeAt(b);
                    if (T >= 56320 && T <= 57343) {
                      m = (m - 55296) * 1024 + T - 56320 + 65536;
                    } else {
                      x += this.wcwidth(T);
                    }
                  }
                  const v = this.charProperties(m, w);
                  let C = f.extractWidth(v);
                  if (f.extractShouldJoin(v)) {
                    C -= f.extractWidth(w);
                  }
                  x += C;
                  w = v;
                }
                return x;
              }
              charProperties(_, x) {
                return this._activeProvider.charProperties(_, x);
              }
            }
            a.UnicodeService = f;
          }
        };
        var i = {};
        function o(h) {
          var a = i[h];
          if (a !== undefined) {
            return a.exports;
          }
          var c = i[h] = {
            exports: {}
          };
          r[h].call(c.exports, c, c.exports, o);
          return c.exports;
        }
        var u = {};
        (() => {
          var h = u;
          Object.defineProperty(h, "__esModule", {
            value: true
          });
          h.Terminal = undefined;
          const a = o(9042);
          const c = o(3236);
          const d = o(844);
          const p = o(5741);
          const f = o(8285);
          const S = o(7975);
          const _ = o(7090);
          const x = ["cols", "rows"];
          class w extends d.Disposable {
            constructor(b) {
              super();
              this._core = this.register(new c.Terminal(b));
              this._addonManager = this.register(new p.AddonManager());
              this._publicOptions = {
                ...this._core.options
              };
              const m = C => this._core.options[C];
              const v = (C, T) => {
                this._checkReadonlyOptions(C);
                this._core.options[C] = T;
              };
              for (const C in this._core.options) {
                const T = {
                  get: m.bind(this, C),
                  set: v.bind(this, C)
                };
                Object.defineProperty(this._publicOptions, C, T);
              }
            }
            _checkReadonlyOptions(b) {
              if (x.includes(b)) {
                throw new Error(`Option "${b}" can only be set in the constructor`);
              }
            }
            _checkProposedApi() {
              if (!this._core.optionsService.rawOptions.allowProposedApi) {
                throw new Error("You must set the allowProposedApi option to true to use proposed API");
              }
            }
            get onBell() {
              return this._core.onBell;
            }
            get onBinary() {
              return this._core.onBinary;
            }
            get onCursorMove() {
              return this._core.onCursorMove;
            }
            get onData() {
              return this._core.onData;
            }
            get onKey() {
              return this._core.onKey;
            }
            get onLineFeed() {
              return this._core.onLineFeed;
            }
            get onRender() {
              return this._core.onRender;
            }
            get onResize() {
              return this._core.onResize;
            }
            get onScroll() {
              return this._core.onScroll;
            }
            get onSelectionChange() {
              return this._core.onSelectionChange;
            }
            get onTitleChange() {
              return this._core.onTitleChange;
            }
            get onWriteParsed() {
              return this._core.onWriteParsed;
            }
            get element() {
              return this._core.element;
            }
            get parser() {
              this._parser ||= new S.ParserApi(this._core);
              return this._parser;
            }
            get unicode() {
              this._checkProposedApi();
              return new _.UnicodeApi(this._core);
            }
            get textarea() {
              return this._core.textarea;
            }
            get rows() {
              return this._core.rows;
            }
            get cols() {
              return this._core.cols;
            }
            get buffer() {
              this._buffer ||= this.register(new f.BufferNamespaceApi(this._core));
              return this._buffer;
            }
            get markers() {
              this._checkProposedApi();
              return this._core.markers;
            }
            get modes() {
              const b = this._core.coreService.decPrivateModes;
              let m = "none";
              switch (this._core.coreMouseService.activeProtocol) {
                case "X10":
                  m = "x10";
                  break;
                case "VT200":
                  m = "vt200";
                  break;
                case "DRAG":
                  m = "drag";
                  break;
                case "ANY":
                  m = "any";
              }
              return {
                applicationCursorKeysMode: b.applicationCursorKeys,
                applicationKeypadMode: b.applicationKeypad,
                bracketedPasteMode: b.bracketedPasteMode,
                insertMode: this._core.coreService.modes.insertMode,
                mouseTrackingMode: m,
                originMode: b.origin,
                reverseWraparoundMode: b.reverseWraparound,
                sendFocusMode: b.sendFocus,
                wraparoundMode: b.wraparound
              };
            }
            get options() {
              return this._publicOptions;
            }
            set options(b) {
              for (const m in b) {
                this._publicOptions[m] = b[m];
              }
            }
            blur() {
              this._core.blur();
            }
            focus() {
              this._core.focus();
            }
            input(b, m = true) {
              this._core.input(b, m);
            }
            resize(b, m) {
              this._verifyIntegers(b, m);
              this._core.resize(b, m);
            }
            open(b) {
              this._core.open(b);
            }
            attachCustomKeyEventHandler(b) {
              this._core.attachCustomKeyEventHandler(b);
            }
            attachCustomWheelEventHandler(b) {
              this._core.attachCustomWheelEventHandler(b);
            }
            registerLinkProvider(b) {
              return this._core.registerLinkProvider(b);
            }
            registerCharacterJoiner(b) {
              this._checkProposedApi();
              return this._core.registerCharacterJoiner(b);
            }
            deregisterCharacterJoiner(b) {
              this._checkProposedApi();
              this._core.deregisterCharacterJoiner(b);
            }
            registerMarker(b = 0) {
              this._verifyIntegers(b);
              return this._core.registerMarker(b);
            }
            registerDecoration(b) {
              this._checkProposedApi();
              this._verifyPositiveIntegers(b.x ?? 0, b.width ?? 0, b.height ?? 0);
              return this._core.registerDecoration(b);
            }
            hasSelection() {
              return this._core.hasSelection();
            }
            select(b, m, v) {
              this._verifyIntegers(b, m, v);
              this._core.select(b, m, v);
            }
            getSelection() {
              return this._core.getSelection();
            }
            getSelectionPosition() {
              return this._core.getSelectionPosition();
            }
            clearSelection() {
              this._core.clearSelection();
            }
            selectAll() {
              this._core.selectAll();
            }
            selectLines(b, m) {
              this._verifyIntegers(b, m);
              this._core.selectLines(b, m);
            }
            dispose() {
              super.dispose();
            }
            scrollLines(b) {
              this._verifyIntegers(b);
              this._core.scrollLines(b);
            }
            scrollPages(b) {
              this._verifyIntegers(b);
              this._core.scrollPages(b);
            }
            scrollToTop() {
              this._core.scrollToTop();
            }
            scrollToBottom() {
              this._core.scrollToBottom();
            }
            scrollToLine(b) {
              this._verifyIntegers(b);
              this._core.scrollToLine(b);
            }
            clear() {
              this._core.clear();
            }
            write(b, m) {
              this._core.write(b, m);
            }
            writeln(b, m) {
              this._core.write(b);
              this._core.write(`\r
`, m);
            }
            paste(b) {
              this._core.paste(b);
            }
            refresh(b, m) {
              this._verifyIntegers(b, m);
              this._core.refresh(b, m);
            }
            reset() {
              this._core.reset();
            }
            clearTextureAtlas() {
              this._core.clearTextureAtlas();
            }
            loadAddon(b) {
              this._addonManager.loadAddon(this, b);
            }
            static get strings() {
              return a;
            }
            _verifyIntegers(...b) {
              for (const m of b) {
                if (m === Infinity || isNaN(m) || m % 1 != 0) {
                  throw new Error("This API only accepts integers");
                }
              }
            }
            _verifyPositiveIntegers(...b) {
              for (const m of b) {
                if (m && (m === Infinity || isNaN(m) || m % 1 != 0 || m < 0)) {
                  throw new Error("This API only accepts positive integers");
                }
              }
            }
          }
          h.Terminal = w;
        })();
        return u;
      })());
    })(bg);
  }
  return bg.exports;
}
var L1 = CD();
var yg = {
  exports: {}
};
var rS;
function ED() {
  if (!rS) {
    rS = 1;
    (function (e, n) {
      (function (r, i) {
        e.exports = i();
      })(self, () => (() => {
        var r = {};
        (() => {
          var i = r;
          Object.defineProperty(i, "__esModule", {
            value: true
          });
          i.FitAddon = undefined;
          i.FitAddon = class {
            activate(o) {
              this._terminal = o;
            }
            dispose() {}
            fit() {
              const o = this.proposeDimensions();
              if (!o || !this._terminal || isNaN(o.cols) || isNaN(o.rows)) {
                return;
              }
              const u = this._terminal._core;
              if (this._terminal.rows !== o.rows || this._terminal.cols !== o.cols) {
                u._renderService.clear();
                this._terminal.resize(o.cols, o.rows);
              }
            }
            proposeDimensions() {
              if (!this._terminal || !this._terminal.element || !this._terminal.element.parentElement) {
                return;
              }
              const o = this._terminal._core;
              const u = o._renderService.dimensions;
              if (u.css.cell.width === 0 || u.css.cell.height === 0) {
                return;
              }
              const h = this._terminal.options.scrollback === 0 ? 0 : o.viewport.scrollBarWidth;
              const a = window.getComputedStyle(this._terminal.element.parentElement);
              const c = parseInt(a.getPropertyValue("height"));
              const d = Math.max(0, parseInt(a.getPropertyValue("width")));
              const p = window.getComputedStyle(this._terminal.element);
              const f = c - (parseInt(p.getPropertyValue("padding-top")) + parseInt(p.getPropertyValue("padding-bottom")));
              const S = d - (parseInt(p.getPropertyValue("padding-right")) + parseInt(p.getPropertyValue("padding-left"))) - h;
              return {
                cols: Math.max(2, Math.floor(S / u.css.cell.width)),
                rows: Math.max(1, Math.floor(f / u.css.cell.height))
              };
            }
          };
        })();
        return r;
      })());
    })(yg);
  }
  return yg.exports;
}
var P1 = ED();
function ov(e, n) {
  if (e && !n) {
    return e;
  }
  if (!e && n) {
    return n;
  }
  if (e || n) {
    return {
      ...e,
      ...n
    };
  }
}
const Pv = {};
function Sn(e, n, r, i, o) {
  if (!r && !i && !o && !e) {
    return Uf(n);
  }
  let u = Uf(e);
  if (n) {
    u = Zc(u, n);
  }
  if (r) {
    u = Zc(u, r);
  }
  if (i) {
    u = Zc(u, i);
  }
  if (o) {
    u = Zc(u, o);
  }
  return u;
}
function RD(e) {
  if (e.length === 0) {
    return Pv;
  }
  if (e.length === 1) {
    return Uf(e[0]);
  }
  let n = Uf(e[0]);
  for (let r = 1; r < e.length; r += 1) {
    n = Zc(n, e[r]);
  }
  return n;
}
function Uf(e) {
  if (Bv(e)) {
    return {
      ...z1(e, Pv)
    };
  } else {
    return TD(e);
  }
}
function Zc(e, n) {
  if (Bv(n)) {
    return z1(n, e);
  } else {
    return kD(e, n);
  }
}
function TD(e) {
  const n = {
    ...e
  };
  for (const r in n) {
    const i = n[r];
    if (B1(r, i)) {
      n[r] = N1(i);
    }
  }
  return n;
}
function kD(e, n) {
  if (!n) {
    return e;
  }
  for (const r in n) {
    const i = n[r];
    switch (r) {
      case "style":
        {
          e[r] = ov(e.style, i);
          break;
        }
      case "className":
        {
          e[r] = j1(e.className, i);
          break;
        }
      default:
        if (B1(r, i)) {
          e[r] = AD(e[r], i);
        } else {
          e[r] = i;
        }
    }
  }
  return e;
}
function B1(e, n) {
  const r = e.charCodeAt(0);
  const i = e.charCodeAt(1);
  const o = e.charCodeAt(2);
  return r === 111 && i === 110 && o >= 65 && o <= 90 && (typeof n == "function" || typeof n === "undefined");
}
function Bv(e) {
  return typeof e == "function";
}
function z1(e, n) {
  if (Bv(e)) {
    return e(n);
  } else {
    return e ?? Pv;
  }
}
function AD(e, n) {
  if (n) {
    if (e) {
      return (...r) => {
        const i = r[0];
        if (H1(i)) {
          const u = i;
          Vf(u);
          const h = n(...r);
          if (!u.baseUIHandlerPrevented && e != null) {
            e(...r);
          }
          return h;
        }
        const o = n(...r);
        if (e != null) {
          e(...r);
        }
        return o;
      };
    } else {
      return N1(n);
    }
  } else {
    return e;
  }
}
function N1(e) {
  return e && ((...n) => {
    const r = n[0];
    if (H1(r)) {
      Vf(r);
    }
    return e(...n);
  });
}
function Vf(e) {
  e.preventBaseUIHandler = () => {
    e.baseUIHandlerPrevented = true;
  };
  return e;
}
function j1(e, n) {
  if (n) {
    if (e) {
      return n + " " + e;
    } else {
      return n;
    }
  } else {
    return e;
  }
}
function H1(e) {
  return e != null && typeof e == "object" && "nativeEvent" in e;
}
function MD(e, n) {
  return function (i, ...o) {
    const u = new URL(e);
    u.searchParams.set("code", i.toString());
    o.forEach(h => u.searchParams.append("args[]", h));
    return `${n} error #${i}; visit ${u} for the full message.`;
  };
}
const Bt = MD("https://base-ui.com/production-error", "Base UI");
const sS = {};
function sr(e, n) {
  const r = E.useRef(sS);
  if (r.current === sS) {
    r.current = e(n);
  }
  return r;
}
function ls(e, n, r, i) {
  const o = sr(F1).current;
  if (DD(o, e, n, r, i)) {
    U1(o, [e, n, r, i]);
  }
  return o.callback;
}
function OD(e) {
  const n = sr(F1).current;
  if (ID(n, e)) {
    U1(n, e);
  }
  return n.callback;
}
function F1() {
  return {
    callback: null,
    cleanup: null,
    refs: []
  };
}
function DD(e, n, r, i, o) {
  return e.refs[0] !== n || e.refs[1] !== r || e.refs[2] !== i || e.refs[3] !== o;
}
function ID(e, n) {
  return e.refs.length !== n.length || e.refs.some((r, i) => r !== n[i]);
}
function U1(e, n) {
  e.refs = n;
  if (n.every(r => r == null)) {
    e.callback = null;
    return;
  }
  e.callback = r => {
    if (e.cleanup) {
      e.cleanup();
      e.cleanup = null;
    }
    if (r != null) {
      const i = Array(n.length).fill(null);
      for (let o = 0; o < n.length; o += 1) {
        const u = n[o];
        if (u != null) {
          switch (typeof u) {
            case "function":
              {
                const h = u(r);
                if (typeof h == "function") {
                  i[o] = h;
                }
                break;
              }
            case "object":
              {
                u.current = r;
                break;
              }
          }
        }
      }
      e.cleanup = () => {
        for (let o = 0; o < n.length; o += 1) {
          const u = n[o];
          if (u != null) {
            switch (typeof u) {
              case "function":
                {
                  const h = i[o];
                  if (typeof h == "function") {
                    h();
                  } else {
                    u(null);
                  }
                  break;
                }
              case "object":
                {
                  u.current = null;
                  break;
                }
            }
          }
        }
      };
    }
  };
}
const LD = parseInt(E.version, 10);
function zv(e) {
  return LD >= e;
}
function iS(e) {
  if (!E.isValidElement(e)) {
    return null;
  }
  const n = e;
  const r = n.props;
  return (zv(19) ? r == null ? undefined : r.ref : n.ref) ?? null;
}
function Yt() {}
const zs = Object.freeze([]);
const Xt = Object.freeze({});
function PD(e, n) {
  const r = {};
  for (const i in e) {
    const o = e[i];
    if (n != null && n.hasOwnProperty(i)) {
      const u = n[i](o);
      if (u != null) {
        Object.assign(r, u);
      }
      continue;
    }
    if (o === true) {
      r[`data-${i.toLowerCase()}`] = "";
    } else if (o) {
      r[`data-${i.toLowerCase()}`] = o.toString();
    }
  }
  return r;
}
function BD(e, n) {
  if (typeof e == "function") {
    return e(n);
  } else {
    return e;
  }
}
function zD(e, n) {
  if (typeof e == "function") {
    return e(n);
  } else {
    return e;
  }
}
function Je(e, n, r = {}) {
  const i = n.render;
  const o = ND(n, r);
  if (r.enabled === false) {
    return null;
  }
  const u = r.state ?? Xt;
  return FD(e, i, o, u);
}
function ND(e, n = {}) {
  const {
    className: r,
    style: i,
    render: o
  } = e;
  const {
    state: u = Xt,
    ref: h,
    props: a,
    stateAttributesMapping: c,
    enabled: d = true
  } = n;
  const p = d ? BD(r, u) : undefined;
  const f = d ? zD(i, u) : undefined;
  const S = d ? PD(u, c) : Xt;
  const _ = d && a ? jD(a) : undefined;
  const x = d ? ov(S, _) ?? {} : Xt;
  if (typeof document !== "undefined") {
    if (d) {
      if (Array.isArray(h)) {
        x.ref = OD([x.ref, iS(o), ...h]);
      } else {
        x.ref = ls(x.ref, iS(o), h);
      }
    } else {
      ls(null, null);
    }
  }
  if (d) {
    if (p !== undefined) {
      x.className = j1(x.className, p);
    }
    if (f !== undefined) {
      x.style = ov(x.style, f);
    }
    return x;
  } else {
    return Xt;
  }
}
function jD(e) {
  if (Array.isArray(e)) {
    return RD(e);
  } else {
    return Sn(undefined, e);
  }
}
const HD = Symbol.for("react.lazy");
function FD(e, n, r, i) {
  if (n) {
    if (typeof n == "function") {
      return n(r, i);
    }
    const o = Sn(r, n.props);
    o.ref = r.ref;
    let u = n;
    if ((u == null ? undefined : u.$$typeof) === HD) {
      u = E.Children.toArray(n)[0];
    }
    return E.cloneElement(u, o);
  }
  if (e && typeof e == "string") {
    return UD(e, r);
  }
  throw new Error(Bt(8));
}
function UD(e, n) {
  if (e === "button") {
    return E.createElement("button", {
      type: "button",
      ...n,
      key: n.key
    });
  } else if (e === "img") {
    return E.createElement("img", {
      alt: "",
      ...n,
      key: n.key
    });
  } else {
    return E.createElement(e, n);
  }
}
function wu(e) {
  return Je(e.defaultTagName ?? "div", e, e);
}
function V1(e) {
  var n;
  var r;
  var i = "";
  if (typeof e == "string" || typeof e == "number") {
    i += e;
  } else if (typeof e == "object") {
    if (Array.isArray(e)) {
      var o = e.length;
      for (n = 0; n < o; n++) {
        if (e[n] && (r = V1(e[n]))) {
          if (i) {
            i += " ";
          }
          i += r;
        }
      }
    } else {
      for (r in e) {
        if (e[r]) {
          if (i) {
            i += " ";
          }
          i += r;
        }
      }
    }
  }
  return i;
}
function W1() {
  var e;
  var n;
  for (var r = 0, i = "", o = arguments.length; r < o; r++) {
    if ((e = arguments[r]) && (n = V1(e))) {
      if (i) {
        i += " ";
      }
      i += n;
    }
  }
  return i;
}
const oS = e => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e;
const aS = W1;
const $1 = (e, n) => r => {
  var i;
  if ((n == null ? undefined : n.variants) == null) {
    return aS(e, r == null ? undefined : r.class, r == null ? undefined : r.className);
  }
  const {
    variants: o,
    defaultVariants: u
  } = n;
  const h = Object.keys(o).map(d => {
    const p = r == null ? undefined : r[d];
    const f = u == null ? undefined : u[d];
    if (p === null) {
      return null;
    }
    const S = oS(p) || oS(f);
    return o[d][S];
  });
  const a = r && Object.entries(r).reduce((d, p) => {
    let [f, S] = p;
    if (S !== undefined) {
      d[f] = S;
    }
    return d;
  }, {});
  const c = n == null || (i = n.compoundVariants) === null || i === undefined ? undefined : i.reduce((d, p) => {
    let {
      class: f,
      className: S,
      ..._
    } = p;
    if (Object.entries(_).every(x => {
      let [w, g] = x;
      if (Array.isArray(g)) {
        return g.includes({
          ...u,
          ...a
        }[w]);
      } else {
        return {
          ...u,
          ...a
        }[w] === g;
      }
    })) {
      return [...d, f, S];
    } else {
      return d;
    }
  }, []);
  return aS(e, h, c, r == null ? undefined : r.class, r == null ? undefined : r.className);
};
const VD = (e, n) => {
  const r = new Array(e.length + n.length);
  for (let i = 0; i < e.length; i++) {
    r[i] = e[i];
  }
  for (let i = 0; i < n.length; i++) {
    r[e.length + i] = n[i];
  }
  return r;
};
const WD = (e, n) => ({
  classGroupId: e,
  validator: n
});
const q1 = (e = new Map(), n = null, r) => ({
  nextPart: e,
  validators: n,
  classGroupId: r
});
const Wf = "-";
const lS = [];
const $D = "arbitrary..";
const qD = e => {
  const n = YD(e);
  const {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: i
  } = e;
  return {
    getClassGroupId: h => {
      if (h.startsWith("[") && h.endsWith("]")) {
        return GD(h);
      }
      const a = h.split(Wf);
      const c = a[0] === "" && a.length > 1 ? 1 : 0;
      return G1(a, c, n);
    },
    getConflictingClassGroupIds: (h, a) => {
      if (a) {
        const c = i[h];
        const d = r[h];
        if (c) {
          if (d) {
            return VD(d, c);
          } else {
            return c;
          }
        } else {
          return d || lS;
        }
      }
      return r[h] || lS;
    }
  };
};
const G1 = (e, n, r) => {
  if (e.length - n === 0) {
    return r.classGroupId;
  }
  const o = e[n];
  const u = r.nextPart.get(o);
  if (u) {
    const d = G1(e, n + 1, u);
    if (d) {
      return d;
    }
  }
  const h = r.validators;
  if (h === null) {
    return;
  }
  const a = n === 0 ? e.join(Wf) : e.slice(n).join(Wf);
  const c = h.length;
  for (let d = 0; d < c; d++) {
    const p = h[d];
    if (p.validator(a)) {
      return p.classGroupId;
    }
  }
};
const GD = e => e.slice(1, -1).indexOf(":") === -1 ? undefined : (() => {
  const n = e.slice(1, -1);
  const r = n.indexOf(":");
  const i = n.slice(0, r);
  if (i) {
    return $D + i;
  } else {
    return undefined;
  }
})();
const YD = e => {
  const {
    theme: n,
    classGroups: r
  } = e;
  return XD(r, n);
};
const XD = (e, n) => {
  const r = q1();
  for (const i in e) {
    const o = e[i];
    Nv(o, r, i, n);
  }
  return r;
};
const Nv = (e, n, r, i) => {
  const o = e.length;
  for (let u = 0; u < o; u++) {
    const h = e[u];
    KD(h, n, r, i);
  }
};
const KD = (e, n, r, i) => {
  if (typeof e == "string") {
    ZD(e, n, r);
    return;
  }
  if (typeof e == "function") {
    QD(e, n, r, i);
    return;
  }
  JD(e, n, r, i);
};
const ZD = (e, n, r) => {
  const i = e === "" ? n : Y1(n, e);
  i.classGroupId = r;
};
const QD = (e, n, r, i) => {
  if (eI(e)) {
    Nv(e(i), n, r, i);
    return;
  }
  if (n.validators === null) {
    n.validators = [];
  }
  n.validators.push(WD(r, e));
};
const JD = (e, n, r, i) => {
  const o = Object.entries(e);
  const u = o.length;
  for (let h = 0; h < u; h++) {
    const [a, c] = o[h];
    Nv(c, Y1(n, a), r, i);
  }
};
const Y1 = (e, n) => {
  let r = e;
  const i = n.split(Wf);
  const o = i.length;
  for (let u = 0; u < o; u++) {
    const h = i[u];
    let a = r.nextPart.get(h);
    if (!a) {
      a = q1();
      r.nextPart.set(h, a);
    }
    r = a;
  }
  return r;
};
const eI = e => "isThemeGetter" in e && e.isThemeGetter === true;
const tI = e => {
  if (e < 1) {
    return {
      get: () => {},
      set: () => {}
    };
  }
  let n = 0;
  let r = Object.create(null);
  let i = Object.create(null);
  const o = (u, h) => {
    r[u] = h;
    n++;
    if (n > e) {
      n = 0;
      i = r;
      r = Object.create(null);
    }
  };
  return {
    get(u) {
      let h = r[u];
      if (h !== undefined) {
        return h;
      }
      if ((h = i[u]) !== undefined) {
        o(u, h);
        return h;
      }
    },
    set(u, h) {
      if (u in r) {
        r[u] = h;
      } else {
        o(u, h);
      }
    }
  };
};
const av = "!";
const cS = ":";
const nI = [];
const uS = (e, n, r, i, o) => ({
  modifiers: e,
  hasImportantModifier: n,
  baseClassName: r,
  maybePostfixModifierPosition: i,
  isExternal: o
});
const rI = e => {
  const {
    prefix: n,
    experimentalParseClassName: r
  } = e;
  let i = o => {
    const u = [];
    let h = 0;
    let a = 0;
    let c = 0;
    let d;
    const p = o.length;
    for (let w = 0; w < p; w++) {
      const g = o[w];
      if (h === 0 && a === 0) {
        if (g === cS) {
          u.push(o.slice(c, w));
          c = w + 1;
          continue;
        }
        if (g === "/") {
          d = w;
          continue;
        }
      }
      if (g === "[") {
        h++;
      } else if (g === "]") {
        h--;
      } else if (g === "(") {
        a++;
      } else if (g === ")") {
        a--;
      }
    }
    const f = u.length === 0 ? o : o.slice(c);
    let S = f;
    let _ = false;
    if (f.endsWith(av)) {
      S = f.slice(0, -1);
      _ = true;
    } else if (f.startsWith(av)) {
      S = f.slice(1);
      _ = true;
    }
    const x = d && d > c ? d - c : undefined;
    return uS(u, _, S, x);
  };
  if (n) {
    const o = n + cS;
    const u = i;
    i = h => h.startsWith(o) ? u(h.slice(o.length)) : uS(nI, false, h, undefined, true);
  }
  if (r) {
    const o = i;
    i = u => r({
      className: u,
      parseClassName: o
    });
  }
  return i;
};
const sI = e => {
  const n = new Map();
  e.orderSensitiveModifiers.forEach((r, i) => {
    n.set(r, 1000000 + i);
  });
  return r => {
    const i = [];
    let o = [];
    for (let u = 0; u < r.length; u++) {
      const h = r[u];
      const a = h[0] === "[";
      const c = n.has(h);
      if (a || c) {
        if (o.length > 0) {
          o.sort();
          i.push(...o);
          o = [];
        }
        i.push(h);
      } else {
        o.push(h);
      }
    }
    if (o.length > 0) {
      o.sort();
      i.push(...o);
    }
    return i;
  };
};
const iI = e => ({
  cache: tI(e.cacheSize),
  parseClassName: rI(e),
  sortModifiers: sI(e),
  postfixLookupClassGroupIds: oI(e),
  ...qD(e)
});
const oI = e => {
  const n = Object.create(null);
  const r = e.postfixLookupClassGroups;
  if (r) {
    for (let i = 0; i < r.length; i++) {
      n[r[i]] = true;
    }
  }
  return n;
};
const aI = /\s+/;
const lI = (e, n) => {
  const {
    parseClassName: r,
    getClassGroupId: i,
    getConflictingClassGroupIds: o,
    sortModifiers: u,
    postfixLookupClassGroupIds: h
  } = n;
  const a = [];
  const c = e.trim().split(aI);
  let d = "";
  for (let p = c.length - 1; p >= 0; p -= 1) {
    const f = c[p];
    const {
      isExternal: S,
      modifiers: _,
      hasImportantModifier: x,
      baseClassName: w,
      maybePostfixModifierPosition: g
    } = r(f);
    if (S) {
      d = f + (d.length > 0 ? " " + d : d);
      continue;
    }
    let b = !!g;
    let m;
    if (b) {
      const M = w.substring(0, g);
      m = i(M);
      const R = m && h[m] ? i(w) : undefined;
      if (R && R !== m) {
        m = R;
        b = false;
      }
    } else {
      m = i(w);
    }
    if (!m) {
      if (!b) {
        d = f + (d.length > 0 ? " " + d : d);
        continue;
      }
      m = i(w);
      if (!m) {
        d = f + (d.length > 0 ? " " + d : d);
        continue;
      }
      b = false;
    }
    const v = _.length === 0 ? "" : _.length === 1 ? _[0] : u(_).join(":");
    const C = x ? v + av : v;
    const T = C + m;
    if (a.indexOf(T) > -1) {
      continue;
    }
    a.push(T);
    const A = o(m, b);
    for (let M = 0; M < A.length; ++M) {
      const R = A[M];
      a.push(C + R);
    }
    d = f + (d.length > 0 ? " " + d : d);
  }
  return d;
};
const cI = (...e) => {
  let n = 0;
  let r;
  let i;
  let o = "";
  while (n < e.length) {
    if ((r = e[n++]) && (i = X1(r))) {
      if (o) {
        o += " ";
      }
      o += i;
    }
  }
  return o;
};
const X1 = e => {
  if (typeof e == "string") {
    return e;
  }
  let n;
  let r = "";
  for (let i = 0; i < e.length; i++) {
    if (e[i] && (n = X1(e[i]))) {
      if (r) {
        r += " ";
      }
      r += n;
    }
  }
  return r;
};
const uI = (e, ...n) => {
  let r;
  let i;
  let o;
  let u;
  const h = c => {
    const d = n.reduce((p, f) => f(p), e());
    r = iI(d);
    i = r.cache.get;
    o = r.cache.set;
    u = a;
    return a(c);
  };
  const a = c => {
    const d = i(c);
    if (d) {
      return d;
    }
    const p = lI(c, r);
    o(c, p);
    return p;
  };
  u = h;
  return (...c) => u(cI(...c));
};
const dI = [];
const rr = e => {
  const n = r => r[e] || dI;
  n.isThemeGetter = true;
  return n;
};
const K1 = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
const Z1 = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
const fI = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
const hI = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const pI = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const mI = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
const gI = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const vI = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const _o = e => fI.test(e);
const jt = e => !!e && !Number.isNaN(Number(e));
const Zs = e => !!e && Number.isInteger(Number(e));
const _g = e => e.endsWith("%") && jt(e.slice(0, -1));
const Mi = e => hI.test(e);
const Q1 = () => true;
const bI = e => pI.test(e) && !mI.test(e);
const jv = () => false;
const yI = e => gI.test(e);
const _I = e => vI.test(e);
const wI = e => !nt(e) && !st(e);
const SI = e => e.startsWith("@container") && (e[10] === "/" && e[11] !== undefined || e[11] === "s" && e[16] !== undefined && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== undefined && e.startsWith("-normal/", 10));
const xI = e => Io(e, tC, jv);
const nt = e => K1.test(e);
const ma = e => Io(e, nC, bI);
const dS = e => Io(e, OI, jt);
const CI = e => Io(e, sC, Q1);
const EI = e => Io(e, rC, jv);
const fS = e => Io(e, J1, jv);
const RI = e => Io(e, eC, _I);
const tf = e => Io(e, iC, yI);
const st = e => Z1.test(e);
const qc = e => Ia(e, nC);
const TI = e => Ia(e, rC);
const hS = e => Ia(e, J1);
const kI = e => Ia(e, tC);
const AI = e => Ia(e, eC);
const nf = e => Ia(e, iC, true);
const MI = e => Ia(e, sC, true);
const Io = (e, n, r) => {
  const i = K1.exec(e);
  if (i) {
    if (i[1]) {
      return n(i[1]);
    } else {
      return r(i[2]);
    }
  } else {
    return false;
  }
};
const Ia = (e, n, r = false) => {
  const i = Z1.exec(e);
  if (i) {
    if (i[1]) {
      return n(i[1]);
    } else {
      return r;
    }
  } else {
    return false;
  }
};
const J1 = e => e === "position" || e === "percentage";
const eC = e => e === "image" || e === "url";
const tC = e => e === "length" || e === "size" || e === "bg-size";
const nC = e => e === "length";
const OI = e => e === "number";
const rC = e => e === "family-name";
const sC = e => e === "number" || e === "weight";
const iC = e => e === "shadow";
const DI = () => {
  const e = rr("color");
  const n = rr("font");
  const r = rr("text");
  const i = rr("font-weight");
  const o = rr("tracking");
  const u = rr("leading");
  const h = rr("breakpoint");
  const a = rr("container");
  const c = rr("spacing");
  const d = rr("radius");
  const p = rr("shadow");
  const f = rr("inset-shadow");
  const S = rr("text-shadow");
  const _ = rr("drop-shadow");
  const x = rr("blur");
  const w = rr("perspective");
  const g = rr("aspect");
  const b = rr("ease");
  const m = rr("animate");
  const v = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const C = () => ["center", "top", "bottom", "left", "right", "top-left", "left-top", "top-right", "right-top", "bottom-right", "right-bottom", "bottom-left", "left-bottom"];
  const T = () => [...C(), st, nt];
  const A = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const M = () => ["auto", "contain", "none"];
  const R = () => [st, nt, c];
  const I = () => [_o, "full", "auto", ...R()];
  const j = () => [Zs, "none", "subgrid", st, nt];
  const W = () => ["auto", {
    span: ["full", Zs, st, nt]
  }, Zs, st, nt];
  const z = () => [Zs, "auto", st, nt];
  const N = () => ["auto", "min", "max", "fr", st, nt];
  const D = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"];
  const $ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"];
  const G = () => ["auto", ...R()];
  const q = () => [_o, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...R()];
  const U = () => [_o, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...R()];
  const L = () => [_o, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...R()];
  const F = () => [e, st, nt];
  const P = () => [...C(), hS, fS, {
    position: [st, nt]
  }];
  const V = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }];
  const Z = () => ["auto", "cover", "contain", kI, xI, {
    size: [st, nt]
  }];
  const J = () => [_g, qc, ma];
  const ne = () => ["", "none", "full", d, st, nt];
  const ue = () => ["", jt, qc, ma];
  const ee = () => ["solid", "dashed", "dotted", "double"];
  const Y = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const re = () => [jt, _g, hS, fS];
  const ce = () => ["", "none", x, st, nt];
  const ge = () => ["none", jt, st, nt];
  const de = () => ["none", jt, st, nt];
  const me = () => [jt, st, nt];
  const H = () => [_o, "full", ...R()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Mi],
      breakpoint: [Mi],
      color: [Q1],
      container: [Mi],
      "drop-shadow": [Mi],
      ease: ["in", "out", "in-out"],
      font: [wI],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Mi],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Mi],
      shadow: [Mi],
      spacing: ["px", jt],
      text: [Mi],
      "text-shadow": [Mi],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      aspect: [{
        aspect: ["auto", "square", _o, nt, st, g]
      }],
      container: ["container"],
      "container-type": [{
        "@container": ["", "normal", "size", st, nt]
      }],
      "container-named": [SI],
      columns: [{
        columns: [jt, nt, st, a]
      }],
      "break-after": [{
        "break-after": v()
      }],
      "break-before": [{
        "break-before": v()
      }],
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      box: [{
        box: ["border", "content"]
      }],
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      sr: ["sr-only", "not-sr-only"],
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      isolation: ["isolate", "isolation-auto"],
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      "object-position": [{
        object: T()
      }],
      overflow: [{
        overflow: A()
      }],
      "overflow-x": [{
        "overflow-x": A()
      }],
      "overflow-y": [{
        "overflow-y": A()
      }],
      overscroll: [{
        overscroll: M()
      }],
      "overscroll-x": [{
        "overscroll-x": M()
      }],
      "overscroll-y": [{
        "overscroll-y": M()
      }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{
        inset: I()
      }],
      "inset-x": [{
        "inset-x": I()
      }],
      "inset-y": [{
        "inset-y": I()
      }],
      start: [{
        "inset-s": I(),
        start: I()
      }],
      end: [{
        "inset-e": I(),
        end: I()
      }],
      "inset-bs": [{
        "inset-bs": I()
      }],
      "inset-be": [{
        "inset-be": I()
      }],
      top: [{
        top: I()
      }],
      right: [{
        right: I()
      }],
      bottom: [{
        bottom: I()
      }],
      left: [{
        left: I()
      }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{
        z: [Zs, "auto", st, nt]
      }],
      basis: [{
        basis: [_o, "full", "auto", a, ...R()]
      }],
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      flex: [{
        flex: [jt, _o, "auto", "initial", "none", nt]
      }],
      grow: [{
        grow: ["", jt, st, nt]
      }],
      shrink: [{
        shrink: ["", jt, st, nt]
      }],
      order: [{
        order: [Zs, "first", "last", "none", st, nt]
      }],
      "grid-cols": [{
        "grid-cols": j()
      }],
      "col-start-end": [{
        col: W()
      }],
      "col-start": [{
        "col-start": z()
      }],
      "col-end": [{
        "col-end": z()
      }],
      "grid-rows": [{
        "grid-rows": j()
      }],
      "row-start-end": [{
        row: W()
      }],
      "row-start": [{
        "row-start": z()
      }],
      "row-end": [{
        "row-end": z()
      }],
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      "auto-cols": [{
        "auto-cols": N()
      }],
      "auto-rows": [{
        "auto-rows": N()
      }],
      gap: [{
        gap: R()
      }],
      "gap-x": [{
        "gap-x": R()
      }],
      "gap-y": [{
        "gap-y": R()
      }],
      "justify-content": [{
        justify: [...D(), "normal"]
      }],
      "justify-items": [{
        "justify-items": [...$(), "normal"]
      }],
      "justify-self": [{
        "justify-self": ["auto", ...$()]
      }],
      "align-content": [{
        content: ["normal", ...D()]
      }],
      "align-items": [{
        items: [...$(), {
          baseline: ["", "last"]
        }]
      }],
      "align-self": [{
        self: ["auto", ...$(), {
          baseline: ["", "last"]
        }]
      }],
      "place-content": [{
        "place-content": D()
      }],
      "place-items": [{
        "place-items": [...$(), "baseline"]
      }],
      "place-self": [{
        "place-self": ["auto", ...$()]
      }],
      p: [{
        p: R()
      }],
      px: [{
        px: R()
      }],
      py: [{
        py: R()
      }],
      ps: [{
        ps: R()
      }],
      pe: [{
        pe: R()
      }],
      pbs: [{
        pbs: R()
      }],
      pbe: [{
        pbe: R()
      }],
      pt: [{
        pt: R()
      }],
      pr: [{
        pr: R()
      }],
      pb: [{
        pb: R()
      }],
      pl: [{
        pl: R()
      }],
      m: [{
        m: G()
      }],
      mx: [{
        mx: G()
      }],
      my: [{
        my: G()
      }],
      ms: [{
        ms: G()
      }],
      me: [{
        me: G()
      }],
      mbs: [{
        mbs: G()
      }],
      mbe: [{
        mbe: G()
      }],
      mt: [{
        mt: G()
      }],
      mr: [{
        mr: G()
      }],
      mb: [{
        mb: G()
      }],
      ml: [{
        ml: G()
      }],
      "space-x": [{
        "space-x": R()
      }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{
        "space-y": R()
      }],
      "space-y-reverse": ["space-y-reverse"],
      size: [{
        size: q()
      }],
      "inline-size": [{
        inline: ["auto", ...U()]
      }],
      "min-inline-size": [{
        "min-inline": ["auto", ...U()]
      }],
      "max-inline-size": [{
        "max-inline": ["none", ...U()]
      }],
      "block-size": [{
        block: ["auto", ...L()]
      }],
      "min-block-size": [{
        "min-block": ["auto", ...L()]
      }],
      "max-block-size": [{
        "max-block": ["none", ...L()]
      }],
      w: [{
        w: [a, "screen", ...q()]
      }],
      "min-w": [{
        "min-w": [a, "screen", "none", ...q()]
      }],
      "max-w": [{
        "max-w": [a, "screen", "none", "prose", {
          screen: [h]
        }, ...q()]
      }],
      h: [{
        h: ["screen", "lh", ...q()]
      }],
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...q()]
      }],
      "max-h": [{
        "max-h": ["screen", "lh", ...q()]
      }],
      "font-size": [{
        text: ["base", r, qc, ma]
      }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [{
        font: [i, MI, CI]
      }],
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", _g, nt]
      }],
      "font-family": [{
        font: [TI, EI, n]
      }],
      "font-features": [{
        "font-features": [nt]
      }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      tracking: [{
        tracking: [o, st, nt]
      }],
      "line-clamp": [{
        "line-clamp": [jt, "none", st, dS]
      }],
      leading: [{
        leading: [u, ...R()]
      }],
      "list-image": [{
        "list-image": ["none", st, nt]
      }],
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      "list-style-type": [{
        list: ["disc", "decimal", "none", st, nt]
      }],
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      "placeholder-color": [{
        placeholder: F()
      }],
      "text-color": [{
        text: F()
      }],
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      "text-decoration-style": [{
        decoration: [...ee(), "wavy"]
      }],
      "text-decoration-thickness": [{
        decoration: [jt, "from-font", "auto", st, ma]
      }],
      "text-decoration-color": [{
        decoration: F()
      }],
      "underline-offset": [{
        "underline-offset": [jt, "auto", st, nt]
      }],
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      indent: [{
        indent: R()
      }],
      "tab-size": [{
        tab: [Zs, st, nt]
      }],
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", st, nt]
      }],
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      content: [{
        content: ["none", st, nt]
      }],
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      "bg-position": [{
        bg: P()
      }],
      "bg-repeat": [{
        bg: V()
      }],
      "bg-size": [{
        bg: Z()
      }],
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Zs, st, nt],
          radial: ["", st, nt],
          conic: [Zs, st, nt]
        }, AI, RI]
      }],
      "bg-color": [{
        bg: F()
      }],
      "gradient-from-pos": [{
        from: J()
      }],
      "gradient-via-pos": [{
        via: J()
      }],
      "gradient-to-pos": [{
        to: J()
      }],
      "gradient-from": [{
        from: F()
      }],
      "gradient-via": [{
        via: F()
      }],
      "gradient-to": [{
        to: F()
      }],
      rounded: [{
        rounded: ne()
      }],
      "rounded-s": [{
        "rounded-s": ne()
      }],
      "rounded-e": [{
        "rounded-e": ne()
      }],
      "rounded-t": [{
        "rounded-t": ne()
      }],
      "rounded-r": [{
        "rounded-r": ne()
      }],
      "rounded-b": [{
        "rounded-b": ne()
      }],
      "rounded-l": [{
        "rounded-l": ne()
      }],
      "rounded-ss": [{
        "rounded-ss": ne()
      }],
      "rounded-se": [{
        "rounded-se": ne()
      }],
      "rounded-ee": [{
        "rounded-ee": ne()
      }],
      "rounded-es": [{
        "rounded-es": ne()
      }],
      "rounded-tl": [{
        "rounded-tl": ne()
      }],
      "rounded-tr": [{
        "rounded-tr": ne()
      }],
      "rounded-br": [{
        "rounded-br": ne()
      }],
      "rounded-bl": [{
        "rounded-bl": ne()
      }],
      "border-w": [{
        border: ue()
      }],
      "border-w-x": [{
        "border-x": ue()
      }],
      "border-w-y": [{
        "border-y": ue()
      }],
      "border-w-s": [{
        "border-s": ue()
      }],
      "border-w-e": [{
        "border-e": ue()
      }],
      "border-w-bs": [{
        "border-bs": ue()
      }],
      "border-w-be": [{
        "border-be": ue()
      }],
      "border-w-t": [{
        "border-t": ue()
      }],
      "border-w-r": [{
        "border-r": ue()
      }],
      "border-w-b": [{
        "border-b": ue()
      }],
      "border-w-l": [{
        "border-l": ue()
      }],
      "divide-x": [{
        "divide-x": ue()
      }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{
        "divide-y": ue()
      }],
      "divide-y-reverse": ["divide-y-reverse"],
      "border-style": [{
        border: [...ee(), "hidden", "none"]
      }],
      "divide-style": [{
        divide: [...ee(), "hidden", "none"]
      }],
      "border-color": [{
        border: F()
      }],
      "border-color-x": [{
        "border-x": F()
      }],
      "border-color-y": [{
        "border-y": F()
      }],
      "border-color-s": [{
        "border-s": F()
      }],
      "border-color-e": [{
        "border-e": F()
      }],
      "border-color-bs": [{
        "border-bs": F()
      }],
      "border-color-be": [{
        "border-be": F()
      }],
      "border-color-t": [{
        "border-t": F()
      }],
      "border-color-r": [{
        "border-r": F()
      }],
      "border-color-b": [{
        "border-b": F()
      }],
      "border-color-l": [{
        "border-l": F()
      }],
      "divide-color": [{
        divide: F()
      }],
      "outline-style": [{
        outline: [...ee(), "none", "hidden"]
      }],
      "outline-offset": [{
        "outline-offset": [jt, st, nt]
      }],
      "outline-w": [{
        outline: ["", jt, qc, ma]
      }],
      "outline-color": [{
        outline: F()
      }],
      shadow: [{
        shadow: ["", "none", p, nf, tf]
      }],
      "shadow-color": [{
        shadow: F()
      }],
      "inset-shadow": [{
        "inset-shadow": ["none", f, nf, tf]
      }],
      "inset-shadow-color": [{
        "inset-shadow": F()
      }],
      "ring-w": [{
        ring: ue()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: F()
      }],
      "ring-offset-w": [{
        "ring-offset": [jt, ma]
      }],
      "ring-offset-color": [{
        "ring-offset": F()
      }],
      "inset-ring-w": [{
        "inset-ring": ue()
      }],
      "inset-ring-color": [{
        "inset-ring": F()
      }],
      "text-shadow": [{
        "text-shadow": ["none", S, nf, tf]
      }],
      "text-shadow-color": [{
        "text-shadow": F()
      }],
      opacity: [{
        opacity: [jt, st, nt]
      }],
      "mix-blend": [{
        "mix-blend": [...Y(), "plus-darker", "plus-lighter"]
      }],
      "bg-blend": [{
        "bg-blend": Y()
      }],
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      "mask-image-linear-pos": [{
        "mask-linear": [jt]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": re()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": re()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": F()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": F()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": re()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": re()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": F()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": F()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": re()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": re()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": F()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": F()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": re()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": re()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": F()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": F()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": re()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": re()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": F()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": F()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": re()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": re()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": F()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": F()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": re()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": re()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": F()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": F()
      }],
      "mask-image-radial": [{
        "mask-radial": [st, nt]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": re()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": re()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": F()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": F()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": C()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [jt]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": re()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": re()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": F()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": F()
      }],
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      "mask-position": [{
        mask: P()
      }],
      "mask-repeat": [{
        mask: V()
      }],
      "mask-size": [{
        mask: Z()
      }],
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      "mask-image": [{
        mask: ["none", st, nt]
      }],
      filter: [{
        filter: ["", "none", st, nt]
      }],
      blur: [{
        blur: ce()
      }],
      brightness: [{
        brightness: [jt, st, nt]
      }],
      contrast: [{
        contrast: [jt, st, nt]
      }],
      "drop-shadow": [{
        "drop-shadow": ["", "none", _, nf, tf]
      }],
      "drop-shadow-color": [{
        "drop-shadow": F()
      }],
      grayscale: [{
        grayscale: ["", jt, st, nt]
      }],
      "hue-rotate": [{
        "hue-rotate": [jt, st, nt]
      }],
      invert: [{
        invert: ["", jt, st, nt]
      }],
      saturate: [{
        saturate: [jt, st, nt]
      }],
      sepia: [{
        sepia: ["", jt, st, nt]
      }],
      "backdrop-filter": [{
        "backdrop-filter": ["", "none", st, nt]
      }],
      "backdrop-blur": [{
        "backdrop-blur": ce()
      }],
      "backdrop-brightness": [{
        "backdrop-brightness": [jt, st, nt]
      }],
      "backdrop-contrast": [{
        "backdrop-contrast": [jt, st, nt]
      }],
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", jt, st, nt]
      }],
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [jt, st, nt]
      }],
      "backdrop-invert": [{
        "backdrop-invert": ["", jt, st, nt]
      }],
      "backdrop-opacity": [{
        "backdrop-opacity": [jt, st, nt]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [jt, st, nt]
      }],
      "backdrop-sepia": [{
        "backdrop-sepia": ["", jt, st, nt]
      }],
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      "border-spacing": [{
        "border-spacing": R()
      }],
      "border-spacing-x": [{
        "border-spacing-x": R()
      }],
      "border-spacing-y": [{
        "border-spacing-y": R()
      }],
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      caption: [{
        caption: ["top", "bottom"]
      }],
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", st, nt]
      }],
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      duration: [{
        duration: [jt, "initial", st, nt]
      }],
      ease: [{
        ease: ["linear", "initial", b, st, nt]
      }],
      delay: [{
        delay: [jt, st, nt]
      }],
      animate: [{
        animate: ["none", m, st, nt]
      }],
      backface: [{
        backface: ["hidden", "visible"]
      }],
      perspective: [{
        perspective: [w, st, nt]
      }],
      "perspective-origin": [{
        "perspective-origin": T()
      }],
      rotate: [{
        rotate: ge()
      }],
      "rotate-x": [{
        "rotate-x": ge()
      }],
      "rotate-y": [{
        "rotate-y": ge()
      }],
      "rotate-z": [{
        "rotate-z": ge()
      }],
      scale: [{
        scale: de()
      }],
      "scale-x": [{
        "scale-x": de()
      }],
      "scale-y": [{
        "scale-y": de()
      }],
      "scale-z": [{
        "scale-z": de()
      }],
      "scale-3d": ["scale-3d"],
      skew: [{
        skew: me()
      }],
      "skew-x": [{
        "skew-x": me()
      }],
      "skew-y": [{
        "skew-y": me()
      }],
      transform: [{
        transform: [st, nt, "", "none", "gpu", "cpu"]
      }],
      "transform-origin": [{
        origin: T()
      }],
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      translate: [{
        translate: H()
      }],
      "translate-x": [{
        "translate-x": H()
      }],
      "translate-y": [{
        "translate-y": H()
      }],
      "translate-z": [{
        "translate-z": H()
      }],
      "translate-none": ["translate-none"],
      zoom: [{
        zoom: [Zs, st, nt]
      }],
      accent: [{
        accent: F()
      }],
      appearance: [{
        appearance: ["none", "auto"]
      }],
      "caret-color": [{
        caret: F()
      }],
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", st, nt]
      }],
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": F()
      }],
      "scrollbar-track-color": [{
        "scrollbar-track": F()
      }],
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      "scroll-m": [{
        "scroll-m": R()
      }],
      "scroll-mx": [{
        "scroll-mx": R()
      }],
      "scroll-my": [{
        "scroll-my": R()
      }],
      "scroll-ms": [{
        "scroll-ms": R()
      }],
      "scroll-me": [{
        "scroll-me": R()
      }],
      "scroll-mbs": [{
        "scroll-mbs": R()
      }],
      "scroll-mbe": [{
        "scroll-mbe": R()
      }],
      "scroll-mt": [{
        "scroll-mt": R()
      }],
      "scroll-mr": [{
        "scroll-mr": R()
      }],
      "scroll-mb": [{
        "scroll-mb": R()
      }],
      "scroll-ml": [{
        "scroll-ml": R()
      }],
      "scroll-p": [{
        "scroll-p": R()
      }],
      "scroll-px": [{
        "scroll-px": R()
      }],
      "scroll-py": [{
        "scroll-py": R()
      }],
      "scroll-ps": [{
        "scroll-ps": R()
      }],
      "scroll-pe": [{
        "scroll-pe": R()
      }],
      "scroll-pbs": [{
        "scroll-pbs": R()
      }],
      "scroll-pbe": [{
        "scroll-pbe": R()
      }],
      "scroll-pt": [{
        "scroll-pt": R()
      }],
      "scroll-pr": [{
        "scroll-pr": R()
      }],
      "scroll-pb": [{
        "scroll-pb": R()
      }],
      "scroll-pl": [{
        "scroll-pl": R()
      }],
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      "touch-pz": ["touch-pinch-zoom"],
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", st, nt]
      }],
      fill: [{
        fill: ["none", ...F()]
      }],
      "stroke-w": [{
        stroke: [jt, qc, ma, dS]
      }],
      stroke: [{
        stroke: ["none", ...F()]
      }],
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
};
const II = uI(DI);