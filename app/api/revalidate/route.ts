import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { FIREBASE_PROJECT, FIRESTORE_DATABASE } from "@/lib/firebaseConfig";

/**
 * Called by the admin portal after a save, so the live site shows the change right away
 * instead of after the 60-second content cache.
 * Only admins can trigger it: the caller's Firebase login token must be able to read their own
 * admins/{email} document, which the Firestore rules allow for admins only.
 */

export async function POST(req: Request) {
  // Admin test mode (localhost + npm run dev only) has no login token; never allowed in production
  if (process.env.NODE_ENV === "development" && !req.headers.get("authorization")) {
    revalidateTag("cms", { expire: 0 });
    return NextResponse.json({ ok: true, dev: true });
  }

  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const email = new URL(req.url).searchParams.get("email")?.toLowerCase();
  if (!token || !email) return NextResponse.json({ ok: false }, { status: 401 });

  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT}/databases/${FIRESTORE_DATABASE}/documents/admins/${encodeURIComponent(email)}`,
    { headers: { authorization: `Bearer ${token}` }, cache: "no-store" },
  );
  if (!res.ok) return NextResponse.json({ ok: false }, { status: 403 });

  revalidateTag("cms", { expire: 0 });   // expire now: the very next visit reads fresh content
  return NextResponse.json({ ok: true });
}
