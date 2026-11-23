/**
 * Subscriber list + sending to all subscribers, through Resend's API (server only).
 * Resend keeps the list (a "segment" of contacts) and handles unsubscribing itself: every broadcast
 * carries its unsubscribe link, and people who use it are skipped on later sends.
 * Needs RESEND_API_KEY in the server settings. Without it every function reports "not set up".
 */
const API = "https://api.resend.com";
const SEGMENT_NAME = "Website subscribers";
/** Put in the footer of broadcast emails; Resend swaps in each person's own unsubscribe link */
export const UNSUBSCRIBE_LINK = "{{{RESEND_UNSUBSCRIBE_URL}}}";

export const resendReady = () => Boolean(process.env.RESEND_API_KEY);
export const newsFrom = () =>
  process.env.NEWS_FROM_EMAIL || process.env.FROM_EMAIL || "The A&M Internationals <news@theaminternationals.com>";

type Result<T = unknown> = { ok: true; data: T } | { ok: false; status: number; message: string };

async function call<T>(method: string, path: string, body?: unknown): Promise<Result<T>> {
  if (!resendReady()) return { ok: false, status: 0, message: "Resend is not set up (RESEND_API_KEY is missing)." };
  try {
    const res = await fetch(API + path, {
      method,
      headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}`, "content-type": "application/json", "user-agent": "anm-website/1.0" },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return { ok: false, status: res.status, message: String(data?.message || data?.name || res.statusText) };
    return { ok: true, data: data as T };
  } catch {
    return { ok: false, status: 0, message: "Could not reach Resend." };
  }
}

/** The segment subscribers are kept in: RESEND_SEGMENT_ID if given, else found by name, else created */
let segment: string | null = null;
async function segmentId(): Promise<Result<string>> {
  if (process.env.RESEND_SEGMENT_ID) return { ok: true, data: process.env.RESEND_SEGMENT_ID };
  if (segment) return { ok: true, data: segment };
  const list = await call<{ data?: { id: string; name: string }[] }>("GET", "/segments");
  if (!list.ok) return list;
  const found = list.data.data?.find((s) => s.name === SEGMENT_NAME);
  if (found) return { ok: true, data: (segment = found.id) };
  const made = await call<{ id: string }>("POST", "/segments", { name: SEGMENT_NAME });
  if (!made.ok) return made;
  return { ok: true, data: (segment = made.data.id) };
}

/** Add one email to the subscriber list. Safe to call again for someone already on it. */
export async function addSubscriber(email: string): Promise<Result> {
  const seg = await segmentId();
  if (!seg.ok) return seg;
  const created = await call("POST", "/contacts", { email, unsubscribed: false, segments: [{ id: seg.data }] });
  if (created.ok) return created;
  // Already a contact: make sure they are in the segment
  return call("POST", `/contacts/${encodeURIComponent(email)}/segments/${seg.data}`);
}

/** Send one email to everyone on the subscriber list (minus anyone who unsubscribed) */
export async function sendToSubscribers(mail: { subject: string; html: string; name: string }): Promise<Result<{ id: string }>> {
  const seg = await segmentId();
  if (!seg.ok) return seg;
  return call<{ id: string }>("POST", "/broadcasts", {
    segment_id: seg.data, from: newsFrom(), subject: mail.subject, html: mail.html, name: mail.name, send: true,
  });
}
