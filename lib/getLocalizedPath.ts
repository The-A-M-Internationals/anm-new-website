import type { AppLocale } from "@/types/locale";

export const getLocalizedPath = (locale: AppLocale, path: string) => {
  // ensures no double slash
  if (!path.startsWith("/")) path = `/${path}`;
  return `/${locale}${path}`;
};
