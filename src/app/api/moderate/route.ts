import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = process.env.GOOGLE_API_KEY
  ? new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "No content provided" },
        { status: 400 }
      );
    }

    if (content.length > 500) {
      return NextResponse.json(
        { error: "Content exceeds 500 character limit" },
        { status: 400 }
      );
    }

    // If Gemini API key is not configured, auto-approve
    if (!genAI) {
      return NextResponse.json({
        isSafe: true,
        reason: "Auto-approved (no API key configured)",
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a content moderator for a family anniversary website. Analyze the following letter/text for appropriateness.

Rules:
- The text should be a heartfelt message for a wedding anniversary
- It should NOT contain: profanity, hate speech, threats, spam, links, or inappropriate content
- It should be respectful and family-friendly
- Minor sentiment and emotion is perfectly fine

Text to analyze: "${content}"

Return ONLY a JSON object (no markdown, no code fences) with exactly these fields:
{"isSafe": boolean, "reason": "brief explanation"}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();

    // Parse the JSON from the response
    try {
      // Remove any markdown code fences if present
      const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const parsed = JSON.parse(cleaned);
      return NextResponse.json({
        isSafe: Boolean(parsed.isSafe),
        reason: String(parsed.reason || ""),
      });
    } catch {
      // If parsing fails, default to safe
      return NextResponse.json({
        isSafe: true,
        reason: "Analysis inconclusive, auto-approved",
      });
    }
  } catch (error) {
    console.error("Moderation error:", error);
    // Fail open — approve the letter if moderation fails
    return NextResponse.json({
      isSafe: true,
      reason: "Moderation service temporarily unavailable, auto-approved",
    });
  }
}
