import { t, type Dictionary } from "intlayer";

const metadata: Dictionary = {
  key: "metadata",
  content: {
    title: t({
      en: "A&M International",
      ar: "إيه آند إم الدولية",
    }),
    description: t({
      en: "A&M International provides services to help businesses thrive in the global market.",
      ar: "تقدم شركة إيه آند إم الدولية خدمات لمساعدة الشركات على النجاح في السوق العالمي.",
    }),
  },
};

export default metadata;
