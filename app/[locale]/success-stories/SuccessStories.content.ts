import { t, type DeclarationContent } from "intlayer";

const successStoriesContent = {
  key: "success-stories",
  content: {
    tabs: {
      all: t({ en: "All", ar: "الكل" }),
      epm: t({ en: "Oracle EPM", ar: "Oracle EPM" }),
      digital: t({ en: "Digital & Web", ar: "الرقمي والويب" }),
    },
    labels: {
      client: t({ en: "Client", ar: "العميل" }),
      challenge: t({ en: "Challenge", ar: "التحدي" }),
      whatWeDid: t({ en: "What we did", ar: "ما قمنا به" }),
      outcome: t({ en: "Outcome", ar: "النتيجة" }),
    },
    cta: {
      title: t({
        en: "Ready to start your project?",
        ar: "هل أنت مستعد لبدء مشروعك؟",
      }),
      description: t({
        en: "Let's talk about what you need.",
        ar: "لنتحدث عمّا تحتاجه.",
      }),
      scheduleConsultation: t({
        en: "Schedule Consultation",
        ar: "جدولة استشارة",
      }),
    },
    caseStudies: {
      study1: {
        industry: t({ en: "Oracle EPM", ar: "Oracle EPM" }),
        companyName: t({
          en: "ESG Emissions Reporting",
          ar: "تقارير الانبعاثات (ESG)",
        }),
        metric1: t({ en: "Scope 1 & 2", ar: "النطاقان 1 و2" }),
        metric1Label: t({ en: "Emissions reporting", ar: "تقارير الانبعاثات" }),
        metric2: t({ en: "Scope 3", ar: "النطاق 3" }),
        metric2Label: t({ en: "First build", ar: "البناء الأول" }),
        client: t({
          en: "A US organisation.",
          ar: "مؤسسة في الولايات المتحدة.",
        }),
        challenge: t({
          en: "Report emissions alongside the financials.",
          ar: "إعداد تقارير الانبعاثات جنبًا إلى جنب مع التقارير المالية.",
        }),
        whatWeDid: t({
          en: "Built Scope 1 and 2 emissions reporting in Oracle EPM and the first Scope 3 build, with data integration.",
          ar: "بنينا تقارير انبعاثات النطاقين 1 و2 في Oracle EPM والبناء الأول للنطاق 3، مع تكامل البيانات.",
        }),
        outcome: t({
          en: "Delivered; ongoing support agreed.",
          ar: "تم التسليم، مع الاتفاق على دعم مستمر.",
        }),
      },
      study2: {
        industry: t({ en: "Digital & Web", ar: "الرقمي والويب" }),
        companyName: t({
          en: "Wellness Brand",
          ar: "علامة تجارية للعافية",
        }),
        metric1: t({ en: "Logo & Brand", ar: "الشعار والهوية" }),
        metric1Label: t({ en: "Brand presentation", ar: "عرض العلامة التجارية" }),
        metric2: t({ en: "One-page Site", ar: "موقع من صفحة واحدة" }),
        metric2Label: t({ en: "With contact form", ar: "مع نموذج تواصل" }),
        client: t({
          en: "A US wellness practice.",
          ar: "مركز عافية في الولايات المتحدة.",
        }),
        whatWeDid: t({
          en: "Logo design, brand presentation and a one-page website with contact form.",
          ar: "تصميم الشعار، وعرض العلامة التجارية، وموقع إلكتروني من صفحة واحدة مع نموذج تواصل.",
        }),
      },
    },
  },
} satisfies DeclarationContent;

export default successStoriesContent;
