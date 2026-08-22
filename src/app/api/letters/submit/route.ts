import { NextResponse } from "next/server";
import { readLettersFromGitHub, writeLettersToGitHub, type Letter } from "@/lib/github-letters";

export const runtime = "nodejs";

const MAX_LETTER_CHARACTERS = 1000;
const noStoreHeaders = { "Cache-Control": "no-store, max-age=0" };

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const payload = body && typeof body === "object" ? body as { content?: unknown; author?: unknown } : {};
    const content = payload.content;
    const author = payload.author;

    if (typeof content !== "string" || typeof author !== "string" || !content.trim() || !author.trim()) {
      return NextResponse.json(
        { error: "A letter and your name are required." },
        { status: 400, headers: noStoreHeaders }
      );
    }

    if (content.length > MAX_LETTER_CHARACTERS) {
      return NextResponse.json(
        { error: `Letters must be ${MAX_LETTER_CHARACTERS} characters or fewer.` },
        { status: 400, headers: noStoreHeaders }
      );
    }

    if (author.length > 100) {
      return NextResponse.json(
        { error: "Names must be 100 characters or fewer." },
        { status: 400, headers: noStoreHeaders }
      );
    }

    // Read existing letters
    const { letters: existingLetters, sha } = await readLettersFromGitHub();

    // Create new letter
    const newLetter: Letter = {
      id: `letter-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      content: content.trim(),
      author: author.trim(),
      createdAt: new Date().toISOString(),
    };

    // Append and write back
    const updatedLetters = [newLetter, ...existingLetters];
    const writeSuccess = await writeLettersToGitHub(updatedLetters, sha);

    if (!writeSuccess) {
      return NextResponse.json(
        { error: "Your letter could not be saved. Please try again." },
        { status: 503, headers: noStoreHeaders }
      );
    }

    return NextResponse.json(
      {
        id: newLetter.id,
        letter: newLetter,
      },
      { status: 201, headers: noStoreHeaders }
    );
  } catch (error) {
    console.error("Unable to save letter:", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json(
      { error: "Your letter could not be saved. Please try again." },
      { status: 503, headers: noStoreHeaders }
    );
  }
}
