import { t } from "intlayer";

const blogArticleListContent = {
  key: "blogsArticleList",
  content: {
    headingPrefix: t({ en: "Latest", ar: "أحدث" }),
    headingHighlight: t({ en: "Article", ar: "المقالات" }),

    filtersButton: t({ en: "Filters", ar: "الفلاتر" }),
    popularTagsButton: t({ en: "Popular Tags", ar: "الوسوم الشائعة" }),

    modalFiltersTitle: t({ en: "Filters", ar: "الفلاتر" }),
    modalPopularTagsTitle: t({ en: "Popular Tags", ar: "الوسوم الشائعة" }),

    loading: t({ en: "Loading articles...", ar: "جارٍ تحميل المقالات..." }),

    featuredBadge: t({ en: "Featured", ar: "مميز" }),
    readMore: t({ en: "Read More", ar: "اقرأ المزيد" }),

    // Added for blogArticle.content.ts usage
    readMoreButton: t({ en: "Read More", ar: "اقرأ المزيد" }),
    popularTags: t({ en: "Popular Tags", ar: "الوسوم الشائعة" }),

    emptyCategory: t({
      en: "No articles found for this category.",
      ar: "لم يتم العثور على مقالات ضمن هذه الفئة.",
    }),

    // These are displayed labels; the filter values in code may need to stay in English
    // if they are used to match Firestore tags.
    filters: t({
      en: {
        allPost: "All Post",
        epmStrategy: "EPM Strategy",
        cloud: "Cloud",
        dataAnalytics: "Data Analytics",
        cybersecurity: "Cybersecurity",
        aiMl: "AI & Machine Learning",
        csr: "CSR",
        companyNews: "Company News",
      },
      ar: {
        allPost: "كل المنشورات",
        epmStrategy: "استراتيجية EPM",
        cloud: "السحابة",
        dataAnalytics: "تحليلات البيانات",
        cybersecurity: "الأمن السيبراني",
        aiMl: "الذكاء الاصطناعي وتعلم الآلة",
        csr: "المسؤولية المجتمعية",
        companyNews: "أخبار الشركة",
      },
    }),
  },
};

export default blogArticleListContent;
