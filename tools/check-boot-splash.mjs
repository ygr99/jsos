import { createRequire } from 'module';
const require = createRequire('C:/Users/99/.workbuddy/binaries/node/workspace/');
const puppeteer = require('puppeteer-core');

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });
await page.setCacheEnabled(false); // 模拟首次访问

// 从文档创建起每帧采样：封面是否存在/透明度、root 是否挂载
await page.evaluateOnNewDocument(() => {
  window.__tl = [];
  const t0 = performance.now();
  function sample() {
    const s = document.getElementById('boot-splash');
    window.__tl.push({
      t: Math.round(performance.now() - t0),
      splash: !!s,
      opacity: s ? getComputedStyle(s).opacity : null,
      root: !!document.getElementById('root')?.firstElementChild,
    });
    if (window.__tl.length < 600) requestAnimationFrame(sample);
  }
  requestAnimationFrame(sample);
});

await page.goto('http://localhost:4173/', { waitUntil: 'domcontentloaded' });
// 立即截早帧
await page.screenshot({ path: 'C:/Users/99/jsos/tools/boot-splash-early.png' });

await page.waitForFunction(() => document.getElementById('root')?.firstElementChild, { timeout: 45000 });
await new Promise(r => setTimeout(r, 1000));
await page.screenshot({ path: 'C:/Users/99/jsos/tools/boot-splash-late.png' });

const tl = await page.evaluate(() => window.__tl);
const first = tl[0];
const mountIdx = tl.findIndex(e => e.root);
const visibleFrames = tl.filter(e => e.splash && e.opacity === '1').length;
console.log(JSON.stringify({
  firstSample: first,
  framesTotal: tl.length,
  framesWithSplashVisible: visibleFrames,
  rootMountedAtMs: mountIdx >= 0 ? tl[mountIdx].t : null,
  splashRemoved: !tl[tl.length - 1].splash || tl[tl.length - 1].opacity === '0',
  lastSample: tl[tl.length - 1],
}, null, 2));
await browser.close();
