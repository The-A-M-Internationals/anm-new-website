import type { NextRequest } from "next/server";

/** Input hardening for the public email route: escaping, validation, origin check, rate limit. */

const ESC: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Escape a user value for safe use inside the HTML email templates. */
export const esc = (v: unknown) => String(v ?? "").replace(/[&<>"']/g, (c) => ESC[c]);

/** Strip line breaks so a value can never add extra mail headers via the subject. */
export const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ");

const EMAIL_RE = /^[^\s@<>"']{1,64}@[^\s@<>"']{1,190}\.[A-Za-z]{2,24}$/;
export const isEmail = (v: unknown): v is string => typeof v === "string" && v.length <= 254 && EMAIL_RE.test(v.trim());

/** Trimmed string capped at `max` chars; non-strings become "". */
export const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Requests must come from this site's own pages (blocks other websites posting to the route). */
export function sameOrigin(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!origin) return true;                                   // same-origin fetches may omit it; rate limit still applies
  try { return new URL(origin).host === req.headers.get("host"); } catch { return false; }
}

/** Best-effort per-IP limit: `max` requests per `windowMs` (in-memory, per server instance). */
const hits = new Map<string, number[]>();
export function rateLimited(req: NextRequest, max = 5, windowMs = 10 * 60_000) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();                         // keep memory bounded
  return recent.length > max;
}
