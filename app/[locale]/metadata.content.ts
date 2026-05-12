import { t, type Dictionary } from "intlayer";

const metadata: Dictionary = {
  key: "metadata",
  content: {
    title: t({
      en: "A&M Internationals",
      ar: "A&M الدولية",
    }),
    description: t({
      en: "A&M Internationals provides services to help businesses thrive in the global market.",
      ar: "تقدم A&M الدولية خدمات لمساعدة الشركات على النجاح في السوق العالمي.",
    }),
  },
};

export default metadata;
