import { t, type DeclarationContent } from "intlayer";

const successStoriesContent = {
  key: "success-stories",
  content: {
    tabs: {
      all: t({ en: "All", ar: "الكل" }),
      epm: t({ en: "Oracle EPM", ar: "Oracle EPM" }),
    },
    labels: {
      client: t({ en: "Client", ar: "العميل" }),
      challenge: t({ en: "Challenge", ar: "التحدي" }),
      whatWeDid: t({ en: "What we did", ar: "ما قمنا به" }),
      outcome: t({ en: "Outcome", ar: "النتيجة" }),
      readStory: t({ en: "Read the story", ar: "اقرأ القصة" }),
    },
    cta: {
      title: t({
        en: "Have a similar challenge?",
        ar: "هل لديك تحدٍّ مماثل؟",
      }),
      description: t({
        en: "Tell us about your planning, close or reporting needs, and we’ll show you how we’d approach it.",
        ar: "أخبرنا باحتياجاتك في التخطيط أو الإقفال أو التقارير، وسنوضح لك كيف سنتعامل معها.",
      }),
      scheduleConsultation: t({
        en: "Book a Consultation",
        ar: "احجز استشارة",
      }),
    },
    // Built-in card, shown only when no Our Work projects can be loaded from the admin portal
    caseStudies: {
      study1: {
        industry: t({ en: "Oracle EPM", ar: "Oracle EPM" }),
        companyName: t({
          en: "ESG emissions reporting",
          ar: "تقارير انبعاثات ESG",
        }),
        metric1: t({ en: "Scope 1 & 2", ar: "النطاقان 1 و2" }),
        metric1Label: t({ en: "Emissions reporting", ar: "تقارير الانبعاثات" }),
        metric2: t({ en: "Scope 3", ar: "النطاق 3" }),
        metric2Label: t({ en: "First build", ar: "البناء الأول" }),
        client: t({
          en: "A US automotive company (first client, June 2026)",
          ar: "شركة سيارات أمريكية (أول عميل، يونيو 2026)",
        }),
        challenge: t({
          en: "Report greenhouse-gas emissions alongside the financials, in the same system finance already uses.",
          ar: "إعداد تقارير انبعاثات الغازات الدفيئة جنبًا إلى جنب مع البيانات المالية، في النظام نفسه الذي يستخدمه فريق المالية بالفعل.",
        }),
        whatWeDid: t({
          en: "Built Scope 1 and Scope 2 emissions reporting in Oracle EPM, including data integration, plus the initial build for Scope 3.",
          ar: "بنينا تقارير انبعاثات النطاق 1 والنطاق 2 في Oracle EPM، بما في ذلك تكامل البيانات، إضافةً إلى البناء الأولي للنطاق 3.",
        }),
        outcome: t({
          en: "Delivered; ongoing support contract in progress.",
          ar: "تم التسليم؛ وعقد الدعم المستمر قيد الإعداد.",
        }),
      },
    },
  },
} satisfies DeclarationContent;

export default successStoriesContent;
