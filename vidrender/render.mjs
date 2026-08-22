// SPHD — deterministic 30fps frame capture of scene.html.
// Usage: node vidrender/render.mjs [startFrame] [endFrameExclusive]
// All animation is clock-driven (window.__setTime), so frames are identical
// no matter how the capture is chunked.
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const FPS = 30;
const TOTAL_MS = 43000;
const FRAME_COUNT = Math.round((TOTAL_MS / 1000) * FPS); // 1290 frames

const startFrame = parseInt(process.argv[2] ?? "0", 10);
const endFrame = Math.min(parseInt(process.argv[3] ?? String(FRAME_COUNT), 10), FRAME_COUNT);

const FRAMES_DIR = join(here, "frames");
mkdirSync(FRAMES_DIR, { recursive: true });

console.log(`Capturing frames ${startFrame}..${endFrame - 1} (${FPS} fps)`);

const browser = await chromium.launch({ args: ["--force-device-scale-factor=1"] });
const page = await browser.newPage({
  viewport: { width: 720, height: 1280 },
  deviceScaleFactor: 1,
});
await page.goto("file://" + join(here, "scene.html"), { waitUntil: "load" });

// Wait for fonts + all photos decoded before starting
await page.evaluate(() => document.fonts.ready.then(() => undefined)).catch(() => {});
await page
  .waitForFunction("window.__ready && window.__ready() === true", null, { timeout: 30000 })
  .catch(() => {});
await page.evaluate("window.__init()");
await page.evaluate("window.__setTime(0)");

let lastLogged = -1;
for (let i = startFrame; i < endFrame; i++) {
  await page.evaluate((t) => window.__setTime(t), (i / FPS) * 1000);
  await page.screenshot({
    path: join(FRAMES_DIR, `f_${String(i).padStart(5, "0")}.jpg`),
    type: "jpeg",
    quality: 85,
  });
  const pct = Math.floor(((i - startFrame) / (endFrame - startFrame)) * 100);
  if (pct >= lastLogged + 25) {
    lastLogged = pct;
    console.log(`  ${pct}% (frame ${i})`);
  }
}

await browser.close();
console.log(`Done: frames ${startFrame}..${endFrame - 1}`);
