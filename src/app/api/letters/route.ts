import { NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebase-admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStoreHeaders = { "Cache-Control": "no-store, max-age=0" };

function serializeDate(value: unknown) {
  if (value && typeof value === "object" && "toDate" in value && typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return undefined;
}

export async function GET() {
  try {
    const db = getAdminFirestore();
    const snapshot = await db.collection("letters").orderBy("createdAt", "desc").limit(100).get();

    const letters = snapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          content: typeof data.content === "string" ? data.content : "",
          author: typeof data.author === "string" ? data.author : "",
          createdAt: serializeDate(data.createdAt),
        };
      })
      .filter((letter) => letter.content.trim().length > 0 && letter.author.trim().length > 0);

    return NextResponse.json({ letters }, { headers: noStoreHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";

    // A local build without environment variables is a valid development state.
    // Keep the read contract successful so it does not create a browser network error;
    // the UI still shows the unavailable state and writes remain protected by the API.
    if (message.startsWith("Missing ")) {
      return NextResponse.json(
        { letters: [], configured: false, error: "Shared letters are not configured." },
        { headers: noStoreHeaders }
      );
    }

    console.error("Unable to read shared letters:", message);
    return NextResponse.json(
      { letters: [], configured: true, error: "Shared letters are not available right now." },
      { status: 503, headers: noStoreHeaders }
    );
  }
}
