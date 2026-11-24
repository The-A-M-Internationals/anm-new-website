import { t } from "intlayer";

// EPM Build Agent: what it's being built to do (title + one line per card)
const featuresListContent = {
  key: "featuresList",
  content: {
    statusTag: t({
      en: "In development · Preview at GITEX Global 2026",
      ar: "قيد التطوير · عرض تمهيدي في GITEX Global 2026",
    }),
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
    feature1Text: t({
      en: "Describe what you need in plain language, and the agent turns it into a step-by-step Oracle EPM build plan.",
      ar: "صِف ما تحتاجه بلغة بسيطة، وسيحوّله الوكيل إلى خطة بناء في Oracle EPM خطوة بخطوة.",
    }),
    feature2Title: t({
      en: "Set up dimensions, forms and rules faster",
      ar: "إعداد الأبعاد والنماذج والقواعد بشكل أسرع",
    }),
    feature2Text: t({
      en: "The agent creates the repetitive parts from that plan, so consultants spend their time on design and the business.",
      ar: "ينشئ الوكيل الأجزاء المتكررة انطلاقًا من تلك الخطة، ليتفرّغ الاستشاريون للتصميم واحتياجات الأعمال.",
    }),
    feature3Title: t({
      en: "Check builds for common mistakes",
      ar: "فحص عمليات البناء بحثًا عن الأخطاء الشائعة",
    }),
    feature3Text: t({
      en: "It checks what it built against the plan and flags gaps before the build reaches testing.",
      ar: "يطابق ما بناه مع الخطة وينبّه إلى الثغرات قبل أن يصل البناء إلى مرحلة الاختبار.",
    }),
    feature4Title: t({
      en: "Keep a clear record of what was built",
      ar: "الاحتفاظ بسجل واضح لما تم بناؤه",
    }),
    feature4Text: t({
      en: "Every change is recorded automatically, so handovers and reviews are simple.",
      ar: "يُسجَّل كل تغيير تلقائيًا، لتصبح عمليات التسليم والمراجعة سهلة.",
    }),
  },
};

export default featuresListContent;
