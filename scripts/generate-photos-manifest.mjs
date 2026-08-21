import { readdirSync, writeFileSync } from "fs";
import { join } from "path";

const photosDir = join(process.cwd(), "public", "photos");
const outPath = join(process.cwd(), "src", "lib", "photos-manifest.json");

const files = readdirSync(photosDir)
  .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f) && f !== "README.md")
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const manifest = files.map((file, index) => ({
  id: index + 1,
  src: `/photos/${file}`,
  alt: `Memory ${index + 1}`,
}));

writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n");
console.log(`✅ Generated manifest with ${manifest.length} photos → ${outPath}`);
