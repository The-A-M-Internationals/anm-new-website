import type { DocumentData } from "firebase/firestore";
import type { CmsDoc } from "./shared";

/**
 * Helpers for the admin-editable site content (home counters, Our Work, founders, team, contact).
 * Anything missing or empty in Firebase falls back to the text built into the site.
 */

/** English or Arabic value of a field; Arabic falls back to English when empty */
export function tr(d: DocumentData, key: string, locale: string): string {
  const en = String(d[key] ?? "").trim();
  if (locale !== "ar") return en;
  return String(d[`${key}Ar`] ?? "").trim() || en;
}

/** List items in their Position order (items without one go last, oldest first) */
export const byOrder = (docs: CmsDoc[]) =>
  [...docs].sort((a, b) => (Number(a.data.order) || 999) - (Number(b.data.order) || 999));

/** A positive whole number from Firebase, else the built-in one */
export const num = (v: unknown, fallback: number) =>
  typeof v === "number" && Number.isFinite(v) && v >= 0 ? Math.round(v) : fallback;

export type Counters = { clients: number; projects: number; countries: number };
export const DEFAULT_COUNTERS: Counters = { clients: 26, projects: 40, countries: 3 };
export const toCounters = (d?: DocumentData | null): Counters => ({
  clients: num(d?.clients, DEFAULT_COUNTERS.clients),
  projects: num(d?.projects, DEFAULT_COUNTERS.projects),
  countries: num(d?.countries, DEFAULT_COUNTERS.countries),
});

export type ContactInfo = {
  phone: string; email: string; whatsapp: string; mapLink: string;
  hours?: string; hoursAr?: string; office?: string; officeAr?: string;
};
export const DEFAULT_CONTACT: ContactInfo = {
  phone: "+971 56 478 3478",
  email: "am@theaminternationals.com",
  whatsapp: "+971 56 478 3478",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Ajman+Free+Zone&query_place_id=ChIJU3HJp4RXXz4Rs7x2839vey8",
};
const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");
export const toContact = (d?: DocumentData | null): ContactInfo => ({
  phone: s(d?.phone) || DEFAULT_CONTACT.phone,
  email: s(d?.email) || DEFAULT_CONTACT.email,
  whatsapp: s(d?.whatsapp) || DEFAULT_CONTACT.whatsapp,
  mapLink: s(d?.mapLink) || DEFAULT_CONTACT.mapLink,
  hours: s(d?.hours) || undefined,
  hoursAr: s(d?.hoursAr) || undefined,
  office: s(d?.office) || undefined,
  officeAr: s(d?.officeAr) || undefined,
});

/** "+971 56 478 3478" -> "+971564783478" for tel: and wa.me links */
export const digits = (phone: string) => phone.replace(/[^\d+]/g, "");
