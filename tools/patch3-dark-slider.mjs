// 补丁3：终端主题 开关 → 二档拉条（浅/深），放到不透明度上方；预览文字颜色联动
import fs from 'fs';
const FILE = 'C:/tmp-zip/settings/beauty.js';
let s = fs.readFileSync(FILE, 'utf8');
const must = (cond, msg) => { if (!cond) throw new Error(msg); };

// 1. 移除之前的开关行（space-y-6 顶部）
const swOld = `children: [R.jsxs("div", {
                className: "flex items-center justify-between",
                children: [R.jsxs("div", {
                    children: [R.jsx("label", {
                        className: "text-sm font-medium",
                        children: t("terminalBg.dark")
                    }), R.jsx("p", {
                        className: "text-xs text-muted-foreground mt-1",
                        children: t("terminalBg.darkDesc")
                    })]
                }), R.jsx(XN, {
                    checked: td,
                    onCheckedChange: h => {
                        tdSet(h);
                        try {
                            window.JSOS.setTerminalBgSettings({
                                dark: h
                            }).then(() => {
                                var g, b;
                                (g = window.JSOS) == null || (b = g.toast) == null || b.call(g, {
                                    title: t("toast.terminalTheme.saved"),
                                    type: "success"
                                })
                            })
                        } catch {}
                    }
                })]
            }), R.jsxs("div", {
                className: "relative h-48 rounded-xl overflow-hidden border border-border",`;
must(s.includes(swOld), 'switch row not found');
s = s.replace(swOld, `children: [R.jsxs("div", {
                className: "relative h-48 rounded-xl overflow-hidden border border-border",`);

// 2. 在预览之前插入 终端主题 拉条（不透明度同款 pu 滑条，step=100 只有浅/深两档）
const insB = 'children: [R.jsxs("div", {\n                className: "relative h-48 rounded-xl overflow-hidden border border-border",';
must(s.includes(insB), 'preview anchor not found');
const slider = `children: [R.jsxs("div", {
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
s = s.replace(insB, slider);

// 3. i18n：浅色/深色 档位文案
const zhB = '        "terminalBg.darkDesc": "终端使用独立深色配色，不受系统主题影响",';
must(s.includes(zhB), 'zh darkDesc not found');
s = s.replace(zhB, zhB + `
        "terminalBg.light": "浅色",
        "terminalBg.deep": "深色",`);
const enB = '        "terminalBg.blurDesc": "Background blur intensity. Higher values create a stronger blur effect",';
must(s.includes(enB), 'en darkDesc not found');
s = s.replace(enB, enB + `
        "terminalBg.light": "Light",
        "terminalBg.deep": "Dark",`);

fs.writeFileSync(FILE, s);
console.log('补丁3 完成');
