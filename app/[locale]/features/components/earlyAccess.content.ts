import { t } from "intlayer";

// EPM Build Agent early-access form (Features page). Shared field labels and messages stay in epm.content.ts.
const featuresEarlyAccessContent = {
  key: "featuresEarlyAccess",
  content: {
    leftTitle: t({
      en: "Join early access",
      ar: "انضم إلى الوصول المبكر",
    }),
    leftDescription: t({
      en: "We'll contact you as soon as previews open.",
      ar: "سنتواصل معك فور إتاحة العروض التمهيدية.",
    }),
    formTitle: t({
      en: "Request early access",
      ar: "اطلب الوصول المبكر",
    }),

    moduleLabel: t({
      en: "Oracle EPM modules you use",
      ar: "وحدات Oracle EPM التي تستخدمها",
    }),
    modulePlaceholder: t({
      en: "Select a module",
      ar: "اختر وحدة",
    }),
    optionPlanning: t({ en: "Planning", ar: "Planning" }),
    optionFccs: t({ en: "FCCS", ar: "FCCS" }),
    optionArcs: t({ en: "ARCS", ar: "ARCS" }),
    optionOther: t({ en: "Other", ar: "أخرى" }),

    submitButton: t({
      en: "Request early access",
      ar: "اطلب الوصول المبكر",
    }),
  },
};

export default featuresEarlyAccessContent;
