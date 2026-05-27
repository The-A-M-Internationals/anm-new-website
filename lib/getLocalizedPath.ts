import type { AppLocale } from "@/types/locale";

export const getLocalizedPath = (locale: AppLocale, path: string) => {
  // ensures no double slash
  if (!path.startsWith("/")) path = `/${path}`;

  // If locale is english (default), don't prepend it to the path
  // to avoid double-rewrites in next-intlayer
  if (locale === "en") return path;

  return `/${locale}${path}`;
};
