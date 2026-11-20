import type { DocumentData } from "firebase/firestore";

/**
 * Article fields from Firebase `articles`. Arabic twins come as `titleAr` (newer docs)
 * or `title_ar` (older docs); either one is used, falling back to English.
 */
export function localizedField(data: DocumentData, field: string, locale: string): string {
  if (locale === "ar") {
    const ar = data[`${field}Ar`] || data[`${field}_ar`];
    if (ar) return String(ar);
  }
  return data[field] ? String(data[field]) : "";
}

/** Cover photo: `imageSrc` (newer docs) or `imageUrl` (older docs); empty = use the title graphic */
export const articleImage = (data: DocumentData): string => String(data.imageSrc || data.imageUrl || "");

/**
 * Where "Read more" goes: an article with a `body` has its own page on the site,
 * otherwise its `externalLink` (new tab). null = nowhere to go.
 */
export function articleLink(id: string, data: DocumentData, locale: string) {
  if (typeof data.body === "string" && data.body.trim()) {
    return { href: `/${locale}/blogs/${encodeURIComponent(id)}`, external: false };
  }
  const ext = typeof data.externalLink === "string" ? data.externalLink.trim() : "";
  return ext ? { href: ext, external: true } : null;
}
