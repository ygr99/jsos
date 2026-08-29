// 补丁4：①预览文字用内联 style（text-zinc-100 类在预构建 CSS 中不存在所以无效）②拉条移到预览下方/不透明度上方 ③文案改「颜色」
import fs from 'fs';
const FILE = 'C:/tmp-zip/settings/beauty.js';
let s = fs.readFileSync(FILE, 'utf8');
const must = (cond, msg) => { if (!cond) throw new Error(msg); };

// 1. 文字颜色改内联 style
const t1 = 'className: td ? "text-sm font-mono text-zinc-100" : "text-sm font-mono text-foreground",';
must(s.includes(t1), 'text1 ternary not found');
s = s.replace(t1, 'className: "text-sm font-mono text-foreground",\n                            style: {\n                                color: td ? "#e4e4e7" : void 0\n                            },');
const t2 = 'className: td ? "text-xs font-mono text-zinc-100 mt-1" : "text-xs font-mono text-foreground mt-1",';
must(s.includes(t2), 'text2 ternary not found');
s = s.replace(t2, 'className: "text-xs font-mono text-foreground mt-1",\n                            style: {\n                                color: td ? "#e4e4e7" : void 0\n                            },');

// 2. 从预览上方移除拉条行
const sliderBlock = `children: [R.jsxs("div", {
                children: [R.jsxs("div", {
                    className: "flex items-center justify-between mb-2",
                    children: [R.jsx("label", {
                        className: "text-sm font-medium",
                        children: t("terminalBg.dark")
                    }), R.jsxs("span", {
                        className: "text-sm text-muted-foreground",
                        children: td ? t("terminalBg.deep") : t("terminalBg.light")
                    })]
                }), R.jsx(pu, {
                    value: td ? 100 : 0,
                    onValueChange: async y => {
                        const h = Number(y) >= 50;
                        if (h !== td) {
                            tdSet(h);
                            try {
                                await window.JSOS.setTerminalBgSettings({
                                    dark: h
                                })
                            } catch {}
                        }
                    },
                    min: 0,
                    max: 100,
                    step: 100
                }), R.jsx("p", {
                    className: "text-xs text-muted-foreground mt-1",
                    children: t("terminalBg.darkDesc")
                })]
            }), R.jsxs("div", {
                className: "relative h-48 rounded-xl overflow-hidden border border-border",`;
must(s.includes(sliderBlock), 'slider block not found');
s = s.replace(sliderBlock, `children: [R.jsxs("div", {
                className: "relative h-48 rounded-xl overflow-hidden border border-border",`);

// 3. 在预览之后、不透明度之前插入拉条（文案改为「颜色」）
const opA = '})]\n            }), R.jsxs("div", {\n                children: [R.jsxs("div", {\n                    className: "flex items-center justify-between mb-2",\n                    children: [R.jsx("label", {\n                        className: "text-sm font-medium",\n                        children: t("terminalBg.opacity")';
must(s.includes(opA), 'opacity row anchor not found');
s = s.replace(opA, `})]
            }), R.jsxs("div", {
                children: [R.jsxs("div", {
                    className: "flex items-center justify-between mb-2",
                    children: [R.jsx("label", {
                        className: "text-sm font-medium",
                        children: t("terminalBg.color")
                    }), R.jsxs("span", {
                        className: "text-sm text-muted-foreground",
                        children: td ? t("terminalBg.deep") : t("terminalBg.light")
                    })]
                }), R.jsx(pu, {
                    value: td ? 100 : 0,
                    onValueChange: async y => {
                        const h = Number(y) >= 50;
                        if (h !== td) {
                            tdSet(h);
                            try {
                                await window.JSOS.setTerminalBgSettings({
                                    dark: h
                                })
                            } catch {}
                        }
                    },
                    min: 0,
                    max: 100,
                    step: 100
                }), R.jsx("p", {
                    className: "text-xs text-muted-foreground mt-1",
                    children: t("terminalBg.darkDesc")
                })]
            }), R.jsxs("div", {
                children: [R.jsxs("div", {
                    className: "flex items-center justify-between mb-2",
                    children: [R.jsx("label", {
                        className: "text-sm font-medium",
                        children: t("terminalBg.opacity")`);

// 4. i18n 文案（EN 缺 terminalBg.dark/darkDesc，做存在性分支处理）
const zhD = '"terminalBg.dark": "终端主题",';
must(s.includes(zhD), 'zh dark not found');
s = s.replace(zhD, '"terminalBg.color": "颜色",');
const zhDD = '"terminalBg.darkDesc": "终端使用独立深色配色，不受系统主题影响",';
must(s.includes(zhDD), 'zh darkDesc not found');
s = s.replace(zhDD, '"terminalBg.darkDesc": "终端背景的颜色，最左为浅色，最右为深色",');
const enT = '"theme.terminal": "Terminal Theme",';
if (s.includes(enT)) {
  s = s.replace(enT, '"terminalBg.color": "Color",');
} else {
  must(s.includes('"terminalBg.color": "Color",'), 'en color missing');
}
const enDD = '"terminalBg.darkDesc": "Terminal uses its own dark color scheme, independent of system theme",';
if (s.includes(enDD)) {
  s = s.replace(enDD, '"terminalBg.darkDesc": "Terminal background color. Left for light, right for dark",');
} else {
  const enDeep = '"terminalBg.deep": "Dark",';
  must(s.includes(enDeep), 'en deep anchor missing');
  s = s.replace(enDeep, enDeep + `
        "terminalBg.darkDesc": "Terminal background color. Left for light, right for dark",`);
}

fs.writeFileSync(FILE, s);
console.log('补丁4 完成');
