import { t } from "intlayer";

const servicesContent = {
  key: "services",
  content: {
    heading: t({
      en: "We Are",
      ar: "نحن",
    }),
    headingHighlight: t({
      en: "Specialized",
      ar: "متخصصون",
    }),
    headingEnd: t({
      en: "In",
      ar: "في",
    }),
    subheading: t({
      en: "Comprehensive solutions that transform businesses and create lasting impact",
      ar: "حلول شاملة تُحوّل الأعمال وتُحدث تأثيرًا مستدامًا",
    }),

    cta: t({
      en: "All Services",
      ar: "جميع الخدمات",
    }),

    items: [
      {
        title: t({
          en: "Financial Consolidation & Close (FCC)",
          ar: "التوحيد المالي والإغلاق (FCC)",
        }),
        description: t({
          en: "Unlock multidimensional analysis and reporting to adapt to changing business needs and cover full end-to end close tasks",
          ar: "تمكين التحليل والتقارير متعددة الأبعاد للتكيف مع احتياجات الأعمال المتغيرة وتغطية جميع مهام الإغلاق بالكامل",
        }),
      },
      {
        title: t({
          en: "Planning and Budgeting",
          ar: "التخطيط والميزانية",
        }),
        description: t({
          en: "Exceed your organization’s planning, budgeting and forecasting needs with improved planning accuracy and automation.",
          ar: "تجاوز احتياجات التخطيط والميزانية والتنبؤ بدقة أعلى وأتمتة متقدمة",
        }),
      },
      {
        title: t({
          en: "Account Reconciliation",
          ar: "تسوية الحسابات",
        }),
        description: t({
          en: "Automate account reconciliations and transaction matching and minimize risk for efficient and accurate financial statements.",
          ar: "أتمتة تسويات الحسابات ومطابقة المعاملات وتقليل المخاطر لإعداد بيانات مالية دقيقة وفعالة",
        }),
      },
      {
        title: t({
          en: "Profitability & Cost Management (PCM)",
          ar: "إدارة الربحية والتكاليف (PCM)",
        }),
        description: t({
          en: "Achieve precision in cost allocation and enhance profitability with PCMCS.",
          ar: "تحقيق دقة في توزيع التكاليف وتعزيز الربحية باستخدام PCMCS",
        }),
      },
      {
        title: t({
          en: "Enterprise Data Management",
          ar: "إدارة بيانات المؤسسة",
        }),
        description: t({
          en: "Optimize data integration, governance, and quality with EDM.",
          ar: "تحسين تكامل البيانات وحوكمتها وجودتها باستخدام EDM",
        }),
      },
      {
        title: t({
          en: "Narrative Reporting",
          ar: "التقارير السردية",
        }),
        description: t({
          en: "Manage all reporting package needs with collaborative authoring and publishing",
          ar: "إدارة جميع احتياجات التقارير من خلال التأليف والنشر التعاوني",
        }),
      },
    ],
  },
};

export default servicesContent;
