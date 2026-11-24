import { t } from "intlayer";

const featuresEpmContent = {
  key: "featuresEpm",
  content: {
    leftTitle: t({
      en: "Talk to an Oracle EPM expert",
      ar: "تحدّث إلى خبير في Oracle EPM",
    }),
    leftDescription: t({
      en: "Book a free 30-minute call about your planning, close or reporting challenge.",
      ar: "احجز مكالمة مجانية مدتها 30 دقيقة لمناقشة تحديات التخطيط أو الإقفال أو التقارير لديك.",
    }),

    bullet1: t({
      en: "30-minute personalized walkthrough",
      ar: "عرض توضيحي مخصص لمدة 30 دقيقة",
    }),
    bullet2: t({
      en: "Custom use case demonstration",
      ar: "عرض لحالة استخدام مخصصة",
    }),
    bullet3: t({
      en: "Q&A with product experts",
      ar: "أسئلة وأجوبة مع خبراء المنتج",
    }),

    formTitle: t({
      en: "Book a Consultation",
      ar: "احجز استشارة",
    }),

    fullNameLabel: t({ en: "Full name", ar: "الاسم الكامل" }),
    fullNamePlaceholder: t({ en: "John Doe", ar: "محمد أحمد" }),

    workEmailLabel: t({ en: "Work email", ar: "البريد الإلكتروني للعمل" }),

    companyNameLabel: t({ en: "Company name", ar: "اسم الشركة" }),
    companyNamePlaceholder: t({ en: "Company Name", ar: "اسم الشركة" }),

    phoneNumberLabel: t({ en: "Phone number", ar: "رقم الهاتف" }),

    serviceLabel: t({ en: "Service", ar: "الخدمة" }),
    servicePlaceholder: t({
      en: "Select a service",
      ar: "اختر خدمة",
    }),

    optionFcc: t({
      en: "Financial Consolidation & Close (FCC)",
      ar: "التجميع المالي والإقفال (FCC)",
    }),
    optionPlanning: t({
      en: "Planning and Budgeting",
      ar: "التخطيط وإعداد الميزانية",
    }),
    optionAccountReconciliation: t({
      en: "Account Reconciliation",
      ar: "مطابقة الحسابات",
    }),
    optionPcm: t({
      en: "Profitability & Cost Management (PCM)",
      ar: "إدارة الربحية والتكلفة (PCM)",
    }),
    optionEnterpriseDataManagement: t({
      en: "Enterprise Data Management",
      ar: "إدارة بيانات المؤسسة",
    }),
    optionNarrativeReporting: t({
      en: "Narrative Reporting",
      ar: "التقارير السردية",
    }),
    optionTaxReporting: t({
      en: "Tax Reporting",
      ar: "تقارير الضرائب",
    }),
    optionConsultingAsService: t({
      en: "Consulting-as-a-Service",
      ar: "الاستشارات كخدمة",
    }),
    optionEpmSolutionManagement: t({
      en: "EPM Solution Management",
      ar: "إدارة حلول EPM",
    }),
    optionVersionUpgrade: t({
      en: "Monthly Update Testing",
      ar: "اختبار التحديثات الشهرية",
    }),
    optionMonthlyMaintenance: t({
      en: "Monthly Maintenance & Administration",
      ar: "الصيانة والإدارة الشهرية",
    }),

    submitButton: t({ en: "Book my call", ar: "احجز مكالمتي" }),
    submittingButton: t({ en: "Submitting...", ar: "جارٍ الإرسال..." }),

    errorFillRequired: t({
      en: "Please fill all required fields.",
      ar: "يرجى تعبئة جميع الحقول المطلوبة.",
    }),
    errorNameOnlyLetters: t({
      en: "Name should only contain letters and spaces.",
      ar: "يجب أن يحتوي الاسم على أحرف ومسافات فقط.",
    }),
    errorNameMinLength: t({
      en: "Name should be at least 3 characters long.",
      ar: "يجب ألا يقل الاسم عن 3 أحرف.",
    }),
    errorCompanyMinLength: t({
      en: "Company name should be at least 3 characters long.",
      ar: "يجب ألا يقل اسم الشركة عن 3 أحرف.",
    }),
    errorInvalidEmail: t({
      en: "Please enter a valid email address.",
      ar: "يرجى إدخال بريد إلكتروني صحيح.",
    }),
    errorInvalidPhone: t({
      en: "Phone number should be between 10-15 digits.",
      ar: "يجب أن يكون رقم الهاتف بين 10 و15 رقمًا.",
    }),
    errorSubmitFailed: t({
      en: "Failed to submit. Please try again.",
      ar: "تعذر الإرسال. يرجى المحاولة مرة أخرى.",
    }),
    successSubmitted: t({
      en: "Thank you for filling the form! We will get back to you.",
      ar: "شكرًا لتعبئة النموذج! سنعاود التواصل معك قريبًا.",
    }),
  },
};

export default featuresEpmContent;
