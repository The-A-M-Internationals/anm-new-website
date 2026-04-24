import { t, type DeclarationContent } from "intlayer";

const successStoriesContent = {
  key: "success-stories",
  content: {
    tabs: {
      all: t({ en: "All", ar: "الكل" }),
      automotive: t({ en: "Automotive", ar: "السيارات" }),
      healthcare: t({ en: "Healthcare", ar: "الرعاية الصحية" }),
      insurance: t({ en: "Insurance", ar: "التأمين" }),
    },
    readFullStory: t({ en: "Read Full Story", ar: "اقرأ القصة كاملة" }),
    theChallenge: t({ en: "The Challenge", ar: "التحدي" }),
    theSolution: t({ en: "The Solution", ar: "الحل" }),
    theResults: t({ en: "The Results", ar: "النتائج" }),
    primaryImpact: t({ en: "Primary Impact", ar: "التأثير الرئيسي" }),
    additionalBenefit: t({ en: "Additional Benefit", ar: "فائدة إضافية" }),
    additionalSavings: t({ en: "Additional savings", ar: "مدخرات إضافية" }),
    cta: {
      title: t({
        en: "Ready to Write Your Success Story?",
        ar: "هل أنت مستعد لكتابة قصة نجاحك؟",
      }),
      description: t({
        en: "Let's discuss how we can help you achieve similar results while creating positive social impact.",
        ar: "لنناقش كيف يمكننا مساعدتك في تحقيق نتائج مماثلة مع إحداث تأثير اجتماعي إيجابي.",
      }),
      seeEpm: t({ en: "See EPM in Action", ar: "شاهد EPM في العمل" }),
      scheduleConsultation: t({
        en: "Schedule Consultation",
        ar: "جدولة استشارة",
      }),
    },
    caseStudies: {
      study1: {
        industry: t({ en: "Automotive", ar: "السيارات" }),
        companyName: t({
          en: "Global Manufacturing Corp",
          ar: "شركة التصنيع العالمية",
        }),
        metric1: t({ en: "87% faster", ar: "أسرع بنسبة 87٪" }),
        metric2: t({ en: "$2.5M saved", ar: "توفير 2.5 مليون درهم" }),
        challenge: t({
          en: "Modernize and standardize financial consolidation and cash-flow reporting by eliminating Excel dependency, strengthening controls, and unifying budgeting and forecasting across all entities.",
          ar: "تحديث وتوحيد التوحيد المالي وتقارير التدفق النقدي من خلال التخلص من الاعتماد على Excel وتعزيز الضوابط وتوحيد الميزانية والتنبؤ عبر جميع الكيانات.",
        }),
        solution: t({
          en: "Implemented FCCS for automated consolidation and cash-flow reporting, integrated Enterprise Planning for budgeting and forecasting, and standardized reporting through a unified chart of accounts.",
          ar: "تم تطبيق FCCS للتوحيد الآلي وتقارير التدفق النقدي، ودمج التخطيط المؤسسي للميزانية والتنبؤ، وتوحيد التقارير من خلال دليل حسابات موحد.",
        }),
        results: {
          r1: t({
            en: "Automated cash-flow reporting in FCCS, replacing manual Excel processes.",
            ar: "تقارير التدفق النقدي الآلية في FCCS، تحل محل عمليات Excel اليدوية.",
          }),
          r2: t({
            en: "FCCS now consolidates actuals for accurate, timely close and reporting cycles.",
            ar: "يوحّد FCCS الآن الأرقام الفعلية لدورات إغلاق وإعداد تقارير دقيقة وفي الوقت المناسب.",
          }),
          r3: t({
            en: "Enterprise Planning fully leveraged for detailed budgeting and forecasting.",
            ar: "تم استخدام التخطيط المؤسسي بشكل كامل للميزانية التفصيلية والتنبؤ.",
          }),
          r4: t({
            en: "Custom multi-entity reports delivered, enabling dynamic, organization-wide financial visibility.",
            ar: "تم تسليم تقارير مخصصة متعددة الكيانات، مما يتيح رؤية مالية ديناميكية على مستوى المنظمة.",
          }),
        },
      },
      study2: {
        industry: t({ en: "Insurance", ar: "التأمين" }),
        companyName: t({
          en: "Financial Services Leader",
          ar: "رائد الخدمات المالية",
        }),
        metric1: t({ en: "3x faster", ar: "أسرع 3 مرات" }),
        metric2: t({ en: "60% cost cut", ar: "خفض التكاليف بنسبة 60٪" }),
        challenge: t({
          en: "Streamline global financial consolidation by eliminating manual Excel processes, integrating data automatically, and creating a standardized, scalable platform that reduces IT dependency.",
          ar: "تبسيط التوحيد المالي العالمي من خلال التخلص من عمليات Excel اليدوية، ودمج البيانات تلقائيًا، وإنشاء منصة موحدة وقابلة للتوسع تقلل الاعتماد على تقنية المعلومات.",
        }),
        solution: t({
          en: "We built and deployed a user-friendly financial platform with automated SAP HANA integration, standardized global workflows, enhanced security, and unified reporting across all business units.",
          ar: "قمنا ببناء ونشر منصة مالية سهلة الاستخدام مع تكامل SAP HANA الآلي وسير عمل عالمية موحدة وأمان محسّن وتقارير موحدة عبر جميع وحدات الأعمال.",
        }),
        results: {
          r1: t({
            en: "Centralized single source of truth with unified data entry, reporting, and standardized global processes.",
            ar: "مصدر حقيقة مركزي واحد مع إدخال بيانات موحد وتقارير وعمليات عالمية موحدة.",
          }),
          r2: t({
            en: "Automated SAP HANA integrations enabling seamless, reliable real-time data flows.",
            ar: "تكاملات SAP HANA الآلية التي تتيح تدفقات بيانات في الوقت الفعلي سلسة وموثوقة.",
          }),
          r3: t({
            en: "Strengthened security, audit controls, and version management for higher compliance and system integrity.",
            ar: "تعزيز الأمان وضوابط التدقيق وإدارة الإصدارات لتحقيق امتثال أعلى ونزاهة النظام.",
          }),
          r4: t({
            en: "Advanced dashboards and reporting delivering deeper insights and faster decision-making.",
            ar: "لوحات معلومات وتقارير متقدمة توفر رؤى أعمق واتخاذ قرارات أسرع.",
          }),
        },
      },
      study3: {
        industry: t({ en: "Healthcare", ar: "الرعاية الصحية" }),
        companyName: t({
          en: "Regional Healthcare Network",
          ar: "شبكة الرعاية الصحية الإقليمية",
        }),
        metric1: t({ en: "100%", ar: "100٪" }),
        metric2: t({ en: "75% saved", ar: "توفير 75٪" }),
        challenge: t({
          en: "Manual compliance tracking across 8 hospitals with inconsistent documentation and audit failures.",
          ar: "تتبع الامتثال اليدوي عبر 8 مستشفيات مع توثيق غير متسق وإخفاقات في التدقيق.",
        }),
        solution: t({
          en: "Deployed automated compliance management system with real-time monitoring and documentation workflows.",
          ar: "تم نشر نظام إدارة الامتثال الآلي مع المراقبة في الوقت الفعلي وسير عمل التوثيق.",
        }),
        results: {
          r1: t({
            en: "87% faster reporting (5 days to 8 hours)",
            ar: "تقارير أسرع بنسبة 87٪ (من 5 أيام إلى 8 ساعات)",
          }),
          r2: t({
            en: "$2.5M annual cost savings from improved efficiency.",
            ar: "توفير سنوي في التكاليف بقيمة 2.5 مليون درهم من تحسين الكفاءة.",
          }),
          r3: t({
            en: "100% executive team adoption within 3 months.",
            ar: "اعتماد 100٪ من فريق الإدارة التنفيذية خلال 3 أشهر.",
          }),
          r4: t({
            en: "Real-time visibility across 12 manufacturing plants.",
            ar: "رؤية في الوقت الفعلي عبر 12 مصنعًا.",
          }),
        },
      },
    },
  },
} satisfies DeclarationContent;

export default successStoriesContent;
