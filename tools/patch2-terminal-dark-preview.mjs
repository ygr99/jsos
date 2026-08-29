// 补丁2：终端主题开关从主题卡片迁到「终端背景效果」卡片 + 预览颜色随深浅联动
import fs from 'fs';
const FILE = 'C:/tmp-zip/settings/beauty.js';
let s = fs.readFileSync(FILE, 'utf8');
const must = (cond, msg) => { if (!cond) throw new Error(msg); };

// ── A. 从 HN（主题卡片）撤掉之前的添加 ──
const hnState = '[i, s] = m.useState(!0), [td, tdSet] = m.useState(!1), c = [{';
must(s.includes(hnState), 'HN state not found');
s = s.replace(hnState, '[i, s] = m.useState(!0), c = [{');

const hnLoad = `    m.useEffect(() => {
        var p;
        (p = window.JSOS) == null || p.getTerminalBgSettings().then(g => {
            tdSet(!!(g && g.dark))
        })
    }, []);
`;
must(s.includes(hnLoad), 'HN load effect not found');
s = s.replace(hnLoad, '');

const hnRowStart = '})]\n        }), R.jsxs("div", {\n            className: "flex items-center justify-between mt-6 pt-6 border-t border-border",';
const hnRowEnd = '            })]\n        })]\n    })\n}\nconst Mp = [{';
const i0 = s.indexOf(hnRowStart);
must(i0 >= 0, 'HN row start not found');
const i1 = s.indexOf(hnRowEnd, i0);
must(i1 > i0, 'HN row end not found');
s = s.slice(0, i0) + '})]\n        })]' + s.slice(i1 + hnRowEnd.length);

// ── B. 加到 hD（终端背景效果卡片）──
// B1. 状态
const stB = '[l, o] = m.useState(bi.opacity), [i, s] = m.useState(bi.blur), [c, f] = m.useState(!0);';
must(s.includes(stB), 'hD state not found');
s = s.replace(stB, '[l, o] = m.useState(bi.opacity), [i, s] = m.useState(bi.blur), [c, f] = m.useState(!0), [td, tdSet] = m.useState(!1);');

// B2. bi 默认值加 dark
const biA = 'const bi = {\n    opacity: 75,\n    blur: 20\n};';
must(s.includes(biA), 'bi not found');
s = s.replace(biA, 'const bi = {\n    opacity: 75,\n    blur: 20,\n    dark: !1\n};');

// B3. 加载 dark
const ldB = '!y && g && (typeof g.opacity == "number" && o(g.opacity), typeof g.blur == "number" && s(g.blur))';
must(s.includes(ldB), 'load not found');
s = s.replace(ldB, '!y && g && (typeof g.opacity == "number" && o(g.opacity), typeof g.blur == "number" && s(g.blur), typeof g.dark == "boolean" && tdSet(g.dark))');

// B4. 恢复默认时也重置 dark
const rsB = 'o(bi.opacity), s(bi.blur);';
must(s.includes(rsB), 'reset not found');
s = s.replace(rsB, 'o(bi.opacity), s(bi.blur), tdSet(bi.dark);');

// B5. 开关行插到 space-y-6 内容最前（预览之前）
const insB = 'children: [R.jsxs("div", {\n                className: "relative h-48 rounded-xl overflow-hidden border border-border",';
must(s.includes(insB), 'preview anchor not found');
const row = `children: [R.jsxs("div", {
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
s = s.replace(insB, row);

// B6. 预览磨砂层颜色联动
const ovB = 'background: `color-mix(in srgb, var(--background) ${l}%, transparent)`';
must(s.includes(ovB), 'preview overlay not found');
s = s.replace(ovB, 'background: `color-mix(in srgb, ${td ? "#18181b" : "var(--background)"} ${l}%, transparent)`');

// B7. 预览文字颜色联动
const t1 = 'className: "text-sm font-mono text-foreground"';
must(s.includes(t1), 'preview text1 not found');
s = s.replace(t1, 'className: td ? "text-sm font-mono text-zinc-100" : "text-sm font-mono text-foreground"');
const t2 = 'className: "text-xs font-mono text-foreground mt-1"';
must(s.includes(t2), 'preview text2 not found');
s = s.replace(t2, 'className: td ? "text-xs font-mono text-zinc-100 mt-1" : "text-xs font-mono text-foreground mt-1"');

// ── C. i18n：终端背景效果 段落加开关文案 ──
const zhB = '        "terminalBg.blurDesc": "背景模糊程度，数值越大模糊效果越强",';
must(s.includes(zhB), 'zh blurDesc not found');
s = s.replace(zhB, zhB + `
        "terminalBg.dark": "终端主题",
        "terminalBg.darkDesc": "终端使用独立深色配色，不受系统主题影响",`);
const enB = '        "terminalBg.blurDesc": "Background blur intensity. Higher values mean stronger blur",';
if (s.includes(enB)) {
  s = s.replace(enB, enB + `
        "terminalBg.dark": "Terminal Theme",
        "terminalBg.darkDesc": "Terminal uses its own dark color scheme, independent of system theme",`);
} else {
  console.log('警告: en blurDesc 未找到，仅添加了中文');
}

fs.writeFileSync(FILE, s);
console.log('补丁2 完成');
