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

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a content moderator for a family anniversary website celebrating 18 years of marriage between Swapna and Praveen.

TASK: Determine if the following message is appropriate for this family celebration.

RULES FOR APPROVAL (isSafe: true):
- Heartfelt wishes, congratulations, love, warmth, celebration
- Personal memories, stories, anecdotes about the couple
- Emotional expressions (love, gratitude, admiration, nostalgia)
- Positive humor and inside jokes
- Simple "Happy Anniversary" or similar greetings
- Any message that feels genuine and kind, even if imperfect

RULES FOR REJECTION (isSafe: false):
- Profanity, vulgar language, or sexual content
- Hate speech, discrimination, or offensive slurs
- Threats, violence, or harmful intentions
- Spam, advertisements, or unrelated commercial content
- Solicitation of personal information or links to external sites
- Harassment, bullying, or mean-spirited comments
- Political propaganda or controversial divisive content
- Messages that are clearly not anniversary-related

IMPORTANT GUIDELINES:
- Be LENIENT — this is a celebration, not a formal document
- Accept casual language, slang, and informal expressions
- Accept messages in ANY language (not just English)
- Accept short messages like "Happy Anniversary!" or "Love you both!"
- Accept messages with minor grammar/spelling errors
- Only REJECT if the message is clearly inappropriate or harmful

RESPONSE FORMAT:
Return ONLY a valid JSON object with exactly these fields:
{"isSafe": boolean, "reason": "brief explanation (max 50 words)"}

Do NOT include any other text, markdown, or code fences. Just the raw JSON.

Message to moderate:
"${content}"`;

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
      // If parsing fails, check if the response contains "isSafe": false
      // This handles cases where Gemini adds extra text around the JSON
      const isSafeMatch = text.match(/"isSafe"\s*:\s*(true|false)/i);
      if (isSafeMatch) {
        const isSafe = isSafeMatch[1].toLowerCase() === "true";
        const reasonMatch = text.match(/"reason"\s*:\s*"([^"]*)"/i);
        return NextResponse.json({
          isSafe,
          reason: reasonMatch?.[1] || "Content moderation completed",
        });
      }
      // If we still can't parse, default to safe
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
