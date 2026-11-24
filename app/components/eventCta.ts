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

/**
 * Optional second button on an upcoming event (Firebase): detailsText / detailsTextAr + detailsLink,
 * e.g. "Event details" → https://… (opens in a new tab). Hidden when either text or link is missing.
 */
export type EventDetailsFields = { detailsText?: string; detailsTextAr?: string; detailsLink?: string };

export function eventDetailsLink(e: EventDetailsFields, locale: string) {
  const label = locale === "ar" ? e.detailsTextAr || e.detailsText : e.detailsText;
  const link = e.detailsLink?.trim();
  if (!label || !link) return null;
  const href = link.startsWith("/") ? `/${locale}${link}` : link;
  return { label, href, external: /^https?:\/\//.test(href) };
}
