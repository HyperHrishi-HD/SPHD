// SPHD — encodes captured frames into the final MP4.
// tblend=average blends consecutive frames for subtle motion blur,
// then song.m4a is looped to video length. Run: node vidrender/encode.mjs
import ffmpegPath from "ffmpeg-static";
import { spawnSync } from "node:child_process";
import { existsSync, rmSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const FRAMES = join(here, "frames");
const OUT = join(here, "sphd-anniversary-vertical.mp4");
const AUDIO = join(root, "public", "audio", "song.m4a");

if (!existsSync(join(FRAMES, "f_00000.jpg"))) {
  console.error("No frames found — run render.mjs first.");
  process.exit(1);
}

console.log("Encoding MP4 (30fps, motion blur, music)…");
const res = spawnSync(
  ffmpegPath,
  [
    "-y",
    "-framerate", "30",
    "-i", join(FRAMES, "f_%05d.jpg"),
    "-stream_loop", "-1", "-i", AUDIO,
    "-filter_complex", "[0:v]tblend=all_mode=average,format=yuv420p[v]",
    "-map", "[v]", "-map", "1:a:0",
    "-c:v", "libx264", "-preset", "medium", "-crf", "19",
    "-r", "30",
    "-c:a", "aac", "-b:a", "160k",
    "-shortest",
    "-movflags", "+faststart",
    OUT,
  ],
  { stdio: ["ignore", "ignore", "pipe"] }
);

if (!existsSync(OUT) || statSync(OUT).size < 100_000) {
  console.error("Encode failed. ffmpeg stderr:\n" + (res.stderr?.toString() || "(none)"));
  process.exit(1);
}
rmSync(FRAMES, { recursive: true, force: true });
console.log(`Done → ${OUT} (${(statSync(OUT).size / 1024 / 1024).toFixed(1)} MB)`);
