import { t } from "intlayer";

const successStoryContent = {
  key: "successStory",
  content: {
    headingStart: t({
      en: "Success",
      ar: "قصص",
    }),
    headingEnd: t({
      en: "Stories",
      ar: "النجاح",
    }),
    subheading: t({
      en: "Real results that drive business transformation",
      ar: "نتائج حقيقية تقود تحول الأعمال",
    }),

    cta: t({
      en: "Explore More",
      ar: "اكتشف المزيد",
    }),

    items: [
      {
        title: t({
          en: "Global Manufacturing Corp",
          ar: "شركة تصنيع عالمية",
        }),
        description: t({
          en: "Fragmented data across 15 systems",
          ar: "بيانات مجزأة عبر 15 نظامًا",
        }),
        industry: t({
          en: "Automotive",
          ar: "السيارات",
        }),
        badge: t({
          en: "87% Faster Reporting",
          ar: "تقارير أسرع بنسبة 87٪",
        }),
      },
      {
        title: t({
          en: "Regional Healthcare Network",
          ar: "شبكة رعاية صحية إقليمية",
        }),
        description: t({
          en: "Manual compliance tracking",
          ar: "متابعة الامتثال يدويًا",
        }),
        industry: t({
          en: "Healthcare",
          ar: "الرعاية الصحية",
        }),
        badge: t({
          en: "100% audit compliance",
          ar: "امتثال تدقيق 100٪",
        }),
      },
      {
        title: t({
          en: "Financial Services Leader",
          ar: "شركة رائدة في الخدمات المالية",
        }),
        description: t({
          en: "Legacy infrastructure bottlenecks",
          ar: "اختناقات في البنية التحتية القديمة",
        }),
        industry: t({
          en: "Insurance",
          ar: "التأمين",
        }),
        badge: t({
          en: "3x performance improvement",
          ar: "تحسن الأداء 3 مرات",
        }),
      },
    ],
  },
};

export default successStoryContent;
