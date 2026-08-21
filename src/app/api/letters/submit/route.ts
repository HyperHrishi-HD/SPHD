import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export async function POST(request: Request) {
  try {
    const { content, author } = await request.json();

    if (!content || !author) {
      return NextResponse.json(
        { error: "Content and author are required" },
        { status: 400 }
      );
    }

    if (typeof content !== "string" || content.length > 500) {
      return NextResponse.json(
        { error: "Content must be a string under 500 characters" },
        { status: 400 }
      );
    }

    if (typeof author !== "string" || author.length > 100) {
      return NextResponse.json(
        { error: "Author name must be under 100 characters" },
        { status: 400 }
      );
    }

    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY) {
      return NextResponse.json({
        id: `local-${Date.now()}`,
        message: "Letter saved locally (Firebase not configured)",
      });
    }

    if (!getApps().length) {
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
      });
    }

    const db = getFirestore();

    const docRef = await db.collection("letters").add({
      content,
      author,
      approved: true,
      photoIndex: Math.floor(Math.random() * 25) + 1,
      createdAt: new Date(),
    });

    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    console.error("Error submitting letter:", error);
    return NextResponse.json(
      { error: "Failed to submit letter" },
      { status: 500 }
    );
  }
}
