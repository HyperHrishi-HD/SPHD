// SPHD — renders a 9:16 vertical video of the anniversary scene.
// Isolated from the main site: records vidrender/scene.html with Playwright,
// then encodes to MP4 with the site's song mixed in. Run: node vidrender/render.mjs
import { chromium } from "playwright";
import ffmpegPath from "ffmpeg-static";
import { spawnSync } from "node:child_process";
import { mkdirSync, rmSync, statSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const DURATION_MS = 45000; // scene timeline is 43s + 2s buffer
const REC_DIR = join(here, ".rec");
const OUT = join(here, "sphd-anniversary-vertical.mp4");
const AUDIO = join(root, "public", "audio", "song.m4a");

mkdirSync(REC_DIR, { recursive: true });

console.log("Launching browser…");
const browser = await chromium.launch({
  args: ["--force-device-scale-factor=1", "--disable-lcd-text"],
});
const context = await browser.newContext({
  viewport: { width: 720, height: 1280 },
  deviceScaleFactor: 1,
  recordVideo: { dir: REC_DIR, size: { width: 720, height: 1280 } },
});

const page = await context.newPage();
await page.goto("file://" + join(here, "scene.html"), { waitUntil: "networkidle" }).catch(() => {});
await page.waitForTimeout(DURATION_MS);

const video = page.video();
await context.close(); // flushes the recording
await browser.close();
const webm = await video.path();
console.log("Recorded:", webm);

// ── Encode: H.264 MP4 + song.m4a looped to video length ──
console.log("Encoding MP4 with music…");
const args = [
  "-y",
  "-i", webm,
  "-stream_loop", "-1", "-i", AUDIO,
  "-map", "0:v:0", "-map", "1:a:0",
  "-c:v", "libx264", "-preset", "medium", "-crf", "20",
  "-pix_fmt", "yuv420p", "-r", "25",
  "-c:a", "aac", "-b:a", "160k",
  "-shortest",
  "-movflags", "+faststart",
  OUT,
];
const res = spawnSync(ffmpegPath, args, { stdio: ["ignore", "ignore", "pipe"] });

if (!existsSync(OUT) || statSync(OUT).size < 100_000) {
  console.error("Encode failed. ffmpeg stderr:\n" + (res.stderr?.toString() || "(none)"));
  process.exit(1);
}

rmSync(REC_DIR, { recursive: true, force: true });
const mb = (statSync(OUT).size / 1024 / 1024).toFixed(1);
console.log(`Done → ${OUT} (${mb} MB)`);
