import type { MouseEvent } from "react";
import type { useRouter } from "next/navigation";
import { handleHashLink } from "@/lib/handleHashLink";

/**
 * Optional per-event button, set in Firebase on the event document:
 *   buttonText / buttonTextAr  e.g. "Book a meeting"
 *   buttonLink                 site path ("/contact#form", locale added here) or a full https:// URL
 * Without them the event keeps the default "Register now" → /register?eventId=… button.
 */
export type EventCtaFields = { id: string; buttonText?: string; buttonTextAr?: string; buttonLink?: string };

export function eventCta(e: EventCtaFields, locale: string, fallbackLabel: string) {
  const label = (locale === "ar" ? e.buttonTextAr || e.buttonText : e.buttonText) || fallbackLabel;
  const link = e.buttonLink?.trim();
  const href = !link ? `/${locale}/register?eventId=${e.id}` : link.startsWith("/") ? `/${locale}${link}` : link;
  return { label, href, external: /^https?:\/\//.test(href) };
}

/** Click handler: external links open in a new tab, #hash links scroll smoothly, the rest navigate */
export function openEventCta(ev: MouseEvent, cta: ReturnType<typeof eventCta>, router: ReturnType<typeof useRouter>) {
  if (cta.external) { window.open(cta.href, "_blank", "noopener,noreferrer"); return; }
  if (!handleHashLink(ev, cta.href, router)) router.push(cta.href);
}
