import { t } from "intlayer";

/**
 * Home "Our Work" section (approved home page changes, 10 Nov 2026).
 * Only real, delivered projects go in `items`; the row centres itself on however
 * many there are.
 */
const successStoryContent = {
  key: "successStory",
  content: {
    headingStart: t({
      en: "Our",
      ar: "أعمالنا",
    }),
    headingEnd: t({
      en: "Work",
      ar: "",
    }),
    subheading: t({
      en: "Projects we've delivered for our clients.",
      ar: "مشاريع أنجزناها لعملائنا.",
    }),

    cta: t({
      en: "Explore More",
      ar: "اكتشف المزيد",
    }),

    items: [
      {
        client: t({
          en: "A US automotive company",
          ar: "شركة سيارات أمريكية",
        }),
        title: t({
          en: "ESG emissions reporting",
          ar: "تقارير انبعاثات ESG",
        }),
        description: t({
          en: "Built emissions reporting into Oracle EPM, alongside the financials",
          ar: "بنينا تقارير الانبعاثات داخل Oracle EPM، جنبًا إلى جنب مع البيانات المالية",
        }),
        industry: t({
          en: "Oracle EPM",
          ar: "Oracle EPM",
        }),
        badge: t({
          en: "Delivered",
          ar: "تم التسليم",
        }),
      },
    ],
  },
};

export default successStoryContent;
