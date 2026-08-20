import { NextResponse } from "next/server";
import { readdirSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const photosDir = join(process.cwd(), "public", "photos");
    const files = readdirSync(photosDir).filter((f) =>
      /\.(jpg|jpeg|png|webp)$/i.test(f)
    );

    // Sort naturally
    files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    const photos = files.map((file, index) => ({
      id: index + 1,
      src: `/photos/${file}`,
      filename: file,
    }));

    return NextResponse.json({ photos, count: photos.length });
  } catch {
    return NextResponse.json({ photos: [], count: 0 });
  }
}
