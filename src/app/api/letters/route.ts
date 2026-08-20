import { NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export async function GET() {
  try {
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY) {
      return NextResponse.json({ letters: [] });
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
    const snapshot = await db
      .collection("letters")
      .where("approved", "==", true)
      .orderBy("createdAt", "desc")
      .limit(50)
      .get();

    const letters = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString(),
    }));

    return NextResponse.json({ letters });
  } catch (error) {
    console.error("Error fetching letters:", error);
    return NextResponse.json({ letters: [] });
  }
}
