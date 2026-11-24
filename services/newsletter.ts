import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";

export type SubscribeResult =
  | { status: "success" }
  | { status: "already_subscribed" }
  | { status: "error"; message: string };

export async function subscribeToNewsletter(
  email: string
): Promise<SubscribeResult> {
  try {
    // One document per subscriber, keyed by the lower-cased email: the duplicate check is a single
    // document read, so the subscriber list never has to be readable (see firestore.rules).
    const address = email.trim().toLowerCase();
    if (!/^[^\s@/]+@[^\s@/]+\.[a-z]{2,24}$/.test(address)) {
      return { status: "error", message: "Please enter a valid email address." };
    }
    const ref = doc(db, "newsletters", address);

    if ((await getDoc(ref)).exists()) {
      return { status: "already_subscribed" };
    }

    await setDoc(ref, {
      email: address,
      subscribedAt: Timestamp.now(),
    });

    // Send confirmation email to subscriber and notification to admin
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "subscribe", email: address }),
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
