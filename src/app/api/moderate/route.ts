import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json({ error: "No content provided" }, { status: 400 });
    }

    if (content.length > 500) {
      return NextResponse.json({ error: "Content exceeds 500 character limit" }, { status: 400 });
    }

    // Gemini moderation disabled for now — auto-approve all letters
    return NextResponse.json({
      isSafe: true,
      reason: "Auto-approved (moderation temporarily disabled)",
    });
  } catch {
    return NextResponse.json({ isSafe: true, reason: "Auto-approved" });
  }
}
