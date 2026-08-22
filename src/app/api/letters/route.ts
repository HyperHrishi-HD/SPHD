import { NextResponse } from "next/server";
import { readLettersFromGitHub } from "@/lib/github-letters";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStoreHeaders = { "Cache-Control": "no-store, max-age=0" };

export async function GET() {
  const { letters, configured } = await readLettersFromGitHub();

  return NextResponse.json({ letters, configured }, { headers: noStoreHeaders });
}
