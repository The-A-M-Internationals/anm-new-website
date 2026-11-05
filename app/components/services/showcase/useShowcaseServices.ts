"use client";

import { useIntlayer, useLocale } from "next-intlayer";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import type { AppLocale } from "@/types/locale";
import type { ShowcaseService } from "./types";

type Field = { value?: unknown } | undefined;
const v = (field: Field, fallback = "") => field?.value?.toString() || fallback;

/** Maps the existing services_content dictionary to the two showcase panels */
export function useShowcaseServices() {
  const { locale } = useLocale();
  const c = useIntlayer("services_content") as unknown as Record<string, Field>;
  const href = (path: string) => getLocalizedPath(locale as AppLocale, path);

  const heading = {
    heading: v(c.heading),
    highlight: v(c.headingHighlight),
    end: v(c.headingEnd),
    subheading: v(c.subheading),
  };

  const services: ShowcaseService[] = [
    {
      id: "epm",
      href: href("/finance-transformation"),
      eyebrow: v(c.financeCategory, "Financial Transformation"),
      title: v(c.financeTitle, "Oracle EPM Solutions"),
      desc: v(c.financeDescription),
      list: [1, 2, 3, 4].map((n) => v(c[`financeCapability${n}`])).filter(Boolean),
      stats: [1, 2].map((n) => ({
        num: v(c[`financeMetric${n}Value`]),
        label: v(c[`financeMetric${n}Label`]),
      })),
      tags: [1, 2].map((n) => v(c[`financeTag${n}`])).filter(Boolean),
      explore: v(c.financeExplore, "Explore EPM Solutions"),
    },
    {
      id: "ai",
      href: href("/ai-automations"),
      eyebrow: v(c.aiCategory, "AI Automations"),
      title: v(c.aiTitle, "AI Automations"),
      desc: v(c.aiDescription),
      list: [1, 2, 3, 4, 5].map((n) => v(c[`aiCapability${n}`])).filter(Boolean),
      stats: [1, 2, 3].map((n) => ({
        num: v(c[`aiMetric${n}Value`]),
        label: v(c[`aiMetric${n}Label`]),
      })),
      tags: [1, 2, 3, 4, 5].map((n) => v(c[`aiTag${n}`])).filter(Boolean),
      explore: v(c.explore, "Explore"),
    },
  ];

  return { heading, services };
}
