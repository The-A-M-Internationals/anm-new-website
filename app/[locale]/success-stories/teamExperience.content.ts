import { t, type DeclarationContent } from "intlayer";

// Our Work page: "Our team's experience" (sits directly under the project cards)
const teamExperienceContent = {
  key: "success-stories-team-experience",
  content: {
    title: t({ en: "Our team’s experience", ar: "خبرة فريقنا" }),
    intro: t({
      en: "Before founding The A&M Internationals, our consultants delivered Oracle EPM projects for organisations across industries. That experience shapes how we work with every client today.",
      ar: "قبل تأسيس The A&M Internationals، نفّذ مستشارونا مشاريع Oracle EPM لمؤسسات في مختلف القطاعات. وهذه الخبرة هي ما يشكّل طريقة عملنا مع كل عميل اليوم.",
    }),
    stats: [
      {
        number: t({ en: "16 years", ar: "16 عامًا" }),
        label: t({ en: "Oracle EPM experience", ar: "من الخبرة في Oracle EPM" }),
        note: t({ en: "in our senior team", ar: "لدى فريقنا من كبار الاستشاريين" }),
      },
      {
        number: t({ en: "26+", ar: "26+" }),
        label: t({ en: "Organisations", ar: "مؤسسة" }),
        note: t({ en: "our team’s Oracle EPM experience", ar: "خبرة فريقنا في Oracle EPM" }),
      },
      {
        number: t({ en: "3", ar: "3" }),
        label: t({ en: "Industries", ar: "قطاعات" }),
        note: t({ en: "automotive, manufacturing, healthcare", ar: "السيارات، والتصنيع، والرعاية الصحية" }),
      },
    ],
    cards: [
      {
        title: t({ en: "Financial Consolidation and Close", ar: "التجميع المالي والإقفال" }),
        tag: t({ en: "Manufacturing · Automotive", ar: "التصنيع · السيارات" }),
        text: t({
          en: "Designed and supported month-end close and consolidation in Oracle FCCS: intercompany eliminations, multi-currency and close task management for finance teams working to tight deadlines.",
          ar: "صمّمنا ودعمنا عمليات الإقفال الشهري والتجميع في Oracle FCCS: استبعادات المعاملات بين الشركات، وتعدد العملات، وإدارة مهام الإقفال لفرق مالية تعمل وفق مواعيد نهائية ضيقة.",
        }),
      },
      {
        title: t({ en: "Planning and Forecasting", ar: "التخطيط والتنبؤ" }),
        tag: t({ en: "Healthcare · Manufacturing", ar: "الرعاية الصحية · التصنيع" }),
        text: t({
          en: "Built budgeting and forecasting models in Oracle EPM Planning, replacing spreadsheets with driver-based plans that finance and business teams could update together.",
          ar: "بنينا نماذج للموازنة والتنبؤ في Oracle EPM Planning، لتحل محل جداول البيانات بخطط قائمة على المحرّكات يمكن لفرق المالية والأعمال تحديثها معًا.",
        }),
      },
      {
        title: t({ en: "Data Integration", ar: "تكامل البيانات" }),
        tag: t({ en: "All industries", ar: "جميع القطاعات" }),
        text: t({
          en: "Connected ERP and source-system data to Oracle EPM through Data Management, with mappings, validations and automated loads that finance could trust at every close.",
          ar: "ربطنا بيانات ERP وأنظمة المصدر بـ Oracle EPM عبر Data Management، مع عمليات ربط وتحقق وتحميل آلي يمكن لفريق المالية الوثوق بها في كل إقفال.",
        }),
      },
      {
        title: t({ en: "Support and Optimisation", ar: "الدعم والتحسين" }),
        tag: t({ en: "All industries", ar: "جميع القطاعات" }),
        text: t({
          en: "Kept live Oracle EPM applications healthy after go-live: monthly close support, testing of Oracle’s quarterly updates, performance tuning and user help.",
          ar: "حافظنا على كفاءة تطبيقات Oracle EPM العاملة بعد الإطلاق: دعم الإقفال الشهري، واختبار التحديثات الفصلية من Oracle، وتحسين الأداء، ومساعدة المستخدمين.",
        }),
      },
    ],
    note: t({
      en: "Projects delivered by our consultants in previous roles. Client names are kept confidential.",
      ar: "مشاريع نفّذها مستشارونا في مناصب سابقة. أسماء العملاء محفوظة بسرّية.",
    }),
  },
} satisfies DeclarationContent;

export default teamExperienceContent;
