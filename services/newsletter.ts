import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

export type SubscribeResult =
  | { status: "success" }
  | { status: "already_subscribed" }
  | { status: "error"; message: string };

export async function subscribeToNewsletter(
  email: string
): Promise<SubscribeResult> {
  try {
    const newsletterRef = collection(db, "newsletters");

    const q = query(newsletterRef, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return { status: "already_subscribed" };
    }

    await addDoc(newsletterRef, {
      email,
      subscribedAt: Timestamp.now(),
    });

    // Send confirmation email to subscriber and notification to admin
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "subscribe", email }),
      });
    } catch (mailErr) {
      console.warn("Could not dispatch subscription email:", mailErr);
    }

    return { status: "success" };
  } catch (err) {
    console.error("Newsletter subscription error:", err);
    return {
      status: "error",
      message: "Failed to subscribe. Please try again.",
    };
  }
}