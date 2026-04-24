import { t } from "intlayer";

const articleContent = {
  key: "blogsFeatureArticle",
  content: {
    sectionTitlePrefix: t({ en: "Featured", ar: "مقال" }),
    sectionTitleHighlight: t({ en: "Article", ar: "مميز" }),

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
