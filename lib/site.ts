/** Public site origin, used for sitemap, robots and language links. Override with NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://theaminternationals.com").replace(/\/$/, "");

/** English lives at the root, Arabic under /ar (matches the Intlayer routing). */
export const localePath = (locale: string, path: string) =>
  `${locale === "ar" ? "/ar" : ""}${path === "/" ? (locale === "ar" ? "" : "/") : path}`;

