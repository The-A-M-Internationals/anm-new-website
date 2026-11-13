import { t } from "intlayer";

// EPM Build Agent: what it's being built to do (titles only)
const featuresListContent = {
  key: "featuresList",
  content: {
    titlePrefix: t({
      en: "What it's being",
      ar: "ما الذي",
    }),
    titleHighlight: t({
      en: "built to do",
      ar: "يُبنى ليقوم به",
    }),
    feature1Title: t({
      en: "Turn requirements into build steps",
      ar: "تحويل المتطلبات إلى خطوات بناء",
    }),
    feature2Title: t({
      en: "Set up dimensions, forms and rules faster",
      ar: "إعداد الأبعاد والنماذج والقواعد بشكل أسرع",
    }),
    feature3Title: t({
      en: "Check builds for common mistakes",
      ar: "فحص عمليات البناء بحثًا عن الأخطاء الشائعة",
    }),
    feature4Title: t({
      en: "Keep a clear record of what was built",
      ar: "الاحتفاظ بسجل واضح لما تم بناؤه",
    }),
  },
};

export default featuresListContent;
