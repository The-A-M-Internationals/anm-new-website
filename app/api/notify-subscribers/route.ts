import { NextResponse } from "next/server";
import { FIREBASE_PROJECT, FIRESTORE_DATABASE } from "@/lib/firebaseConfig";
import { readEntry } from "@/lib/cms/shared";
import { oneLine } from "@/lib/email/guard";
import { newsEmail } from "@/lib/email/newsEmail";
import { isNotifiable, toNewsEmail } from "@/lib/email/newsItems";
import { resendReady, sendToSubscribers, UNSUBSCRIBE_LINK } from "@/lib/email/resend";

/**
 * Emails one published item (project, job, article or event) to every subscriber.
 * Called by the admin portal when "Email this to subscribers" is ticked on save.
 * Admins only: the caller's Firebase login token must be able to read their own admins/{email}
 * document, which the Firestore rules allow for admins alone. Test mode has no token, so it can
 * never send. The email is built here from what is saved in the database, never from the request.
 */
export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const body = await req.json().catch(() => null) as { email?: string; collection?: string; id?: string } | null;
  const email = body?.email?.toLowerCase();
  if (!token || !email) return NextResponse.json({ ok: false, error: "Sign in as an admin to email subscribers." }, { status: 401 });

  const admin = await fetch(
    `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT}/databases/${FIRESTORE_DATABASE}/documents/admins/${encodeURIComponent(email)}`,
    { headers: { authorization: `Bearer ${token}` }, cache: "no-store" },
  );
  if (!admin.ok) return NextResponse.json({ ok: false, error: "Only admins can email subscribers." }, { status: 403 });

  if (!isNotifiable(body?.collection) || !body?.id || body.id.length > 128) {
    return NextResponse.json({ ok: false, error: "This kind of item can't be emailed." }, { status: 400 });
  }
  if (!resendReady()) {
    return NextResponse.json({ ok: false, error: "Email sending isn't set up yet (the Resend key is missing)." }, { status: 503 });
  }

  const item = await readEntry(body.collection, body.id).catch(() => null);
  if (!item) return NextResponse.json({ ok: false, error: "Couldn't find the saved item." }, { status: 404 });

  const { subject, email: content } = toNewsEmail(body.collection, item.id, item.data);
  const sent = await sendToSubscribers({
    subject: oneLine(subject).slice(0, 200),
    html: newsEmail({ ...content, unsubscribe: UNSUBSCRIBE_LINK }),
    name: `${body.collection}: ${oneLine(content.title).slice(0, 80)}`,
  });
  if (!sent.ok) {
    console.error("[notify-subscribers] Resend refused the send:", sent.status, sent.message);
    return NextResponse.json({ ok: false, error: `Resend didn't accept it: ${sent.message}` }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
