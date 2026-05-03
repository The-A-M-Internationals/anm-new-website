import { t } from "intlayer";

const articleContent = {
  key: "blogsFeatureArticle",
  content: {
    sectionTitlePrefix: t({ en: "Featured", ar: "مقال" }),
    sectionTitleHighlight: t({ en: "Article", ar: "مميز" }),

    title: t({
      en: "The Future of Digital Transformation",
      ar: "مستقبل التحول الرقمي",
    }),

    description: t({
      en: "Digital transformation is no longer optional—it's the backbone of modern business strategy. From AI-driven automation to data-centric decision-making, companies that embrace digital change are outperforming their competitors.",
      ar: "لم يعد التحول الرقمي خيارًا، بل أصبح أساس استراتيجيات الأعمال الحديثة. من الأتمتة المدعومة بالذكاء الاصطناعي إلى اتخاذ القرارات المبنية على البيانات، الشركات التي تتبنى هذا التحول تتفوق على منافسيها.",
    }),

    loading: t({
      en: "Loading featured article...",
      ar: "جارٍ تحميل المقال المميز...",
    }),

    noneFound: t({
      en: "No featured article found.",
      ar: "لم يتم العثور على مقال مميز.",
    }),

    readFullArticle: t({
      en: "Read Full Article",
      ar: "اقرأ المقال كاملًا",
    }),

    imageAltFallback: t({
      en: "Event Image",
      ar: "صورة",
    }),
  },
};

export default articleContent;
