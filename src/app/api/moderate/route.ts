import { NextResponse } from "next/server";

const GEMINI_MODERATION_ENABLED = false;
const MAX_LETTER_CHARACTERS = 1000;

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const content = body && typeof body === "object" ? (body as { content?: unknown }).content : undefined;

    if (typeof content !== "string" || !content.trim()) {
      return NextResponse.json({ error: "No content provided" }, { status: 400 });
    }

    if (content.length > MAX_LETTER_CHARACTERS) {
      return NextResponse.json(
        { error: `Content exceeds the ${MAX_LETTER_CHARACTERS} character limit` },
        { status: 400 }
      );
    }

    if (!GEMINI_MODERATION_ENABLED) {
      return NextResponse.json({
        isSafe: true,
        enabled: false,
        reason: "Gemini moderation is temporarily disabled.",
      });
    }

    // Keep this endpoint as the future moderation seam without calling Gemini while disabled.
    return NextResponse.json({ isSafe: true, enabled: false });
  } catch {
    return NextResponse.json({ error: "Invalid moderation request" }, { status: 400 });
  }
}
