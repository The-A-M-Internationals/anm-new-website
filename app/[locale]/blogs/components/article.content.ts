import { t } from "intlayer";

const articleContent = {
  key: "blogsFeatureArticle",
  content: {
    sectionTitlePrefix: t({ en: "Feature", ar: "مقال" }),
    sectionTitleHighlight: t({ en: "Article", ar: "مميز" }),

    loading: t({
      en: "Loading feature article...",
      ar: "جارٍ تحميل المقال المميز...",
    }),

    noneFound: t({
      en: "No feature article found.",
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
