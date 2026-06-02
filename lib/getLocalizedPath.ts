import type { AppLocale } from "@/types/locale";

export const getLocalizedPath = (locale: AppLocale, path: string) => {
  // ensures no double slash
  if (!path.startsWith("/")) path = `/${path}`;

  // Project uses locale-prefixed routes for all languages (including /en)
  return `/${locale}${path === '/' ? '' : path}`;
};
