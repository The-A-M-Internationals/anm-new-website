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
      en: "Be among the first to try the EPM Build Agent. We’ll contact you as soon as previews open.",
      ar: "كن من أوائل من يجرّبون EPM Build Agent. سنتواصل معك فور إتاحة العروض التمهيدية.",
    }),
    bullet1: t({
      en: "Early preview of the agent",
      ar: "عرض تمهيدي مبكر للوكيل",
    }),
    bullet2: t({
      en: "A walkthrough with our EPM team",
      ar: "جولة تعريفية مع فريق EPM لدينا",
    }),
    bullet3: t({
      en: "A say in what we build next",
      ar: "رأي في ما سنبنيه لاحقًا",
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
    optionFccs: t({ en: "Financial Consolidation and Close", ar: "Financial Consolidation and Close" }),
    optionArcs: t({ en: "Account Reconciliation", ar: "Account Reconciliation" }),
    optionOther: t({ en: "Other", ar: "أخرى" }),

    messageLabel: t({
      en: "Message",
      ar: "الرسالة",
    }),

    submitButton: t({
      en: "Request early access",
      ar: "اطلب الوصول المبكر",
    }),
    note: t({
      en: "No spam. We’ll only contact you about the EPM Build Agent.",
      ar: "لا رسائل مزعجة. سنتواصل معك فقط بخصوص EPM Build Agent.",
    }),
  },
};

export default featuresEarlyAccessContent;
