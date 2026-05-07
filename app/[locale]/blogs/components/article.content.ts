import { t } from "intlayer";

const articleContent = {
  key: "blogsFeatureArticle",
  content: {
    sectionTitlePrefix: t({ en: "Featured", ar: "مقال" }),
    sectionTitleHighlight: t({ en: "Article", ar: "مميز" }),

    title: t({
      en: "5 Signs Your Website Needs a Redesign",
      ar: "٥ علامات تدل على أن موقعك الإلكتروني بحاجة إلى إعادة تصميم",
    }),

    description: t({
      en: "Is your website failing to convert visitors into customers? Discover the five critical signs that indicate it's time for a professional redesign to improve performance and user engagement.",
      ar: "هل موقعك الإلكتروني بطيء أو لا يحقق أهدافك؟ إليك ٥ علامات تدل على أن موقعك بحاجة إلى إعادة تصميم شاملة لتحسين تجربة المستخدم وزيادة التفاعل.",
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
