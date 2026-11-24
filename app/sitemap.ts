import type { MetadataRoute } from "next";
import { SITE_URL, localePath } from "@/lib/site";

const ROUTES = [
  "/", "/features", "/finance-transformation", "/finance-transformation/managed-services",
  "/finance-transformation/transformational-services", "/ai-automations", "/digital-transformation",
  "/services/branding-design", "/services/computer-vision", "/services/content-marketing",
  "/services/generative-ai", "/services/machine-learning", "/services/nlp", "/services/rpa",
  "/services/social-media", "/services/video-production", "/services/web-development",
  "/methodology", "/what-sets-us-apart", "/business", "/careers", "/events", "/blogs",
  "/success-stories", "/impacts", "/contact",
];

/** Every page in English and Arabic, each linked to its other-language version. */
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((path) => {
    const languages = { en: `${SITE_URL}${localePath("en", path)}`, ar: `${SITE_URL}${localePath("ar", path)}` };
    return (["en", "ar"] as const).map((locale) => ({
      url: languages[locale],
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
      alternates: { languages },
    }));
  });
}
