import { t } from "intlayer";

const financeTransformationListingsContent = {
  key: "financeTransformationListings",
  content: {
    sectionTitle: t({
      en: "Oracle EPM Implementation",
      ar: "تنفيذ Oracle EPM",
    }),

    managedServiceTitle: t({
      en: "Managed Services",
      ar: "الخدمات المُدارة",
    }),

    services: [
      {
        title: t({
          en: "Planning and Budgeting",
          ar: "التخطيط وإعداد الميزانية",
        }),
        description: t({
          en: "Exceed your organization’s planning, budgeting and forecasting needs with improved planning accuracy and automation.",
          ar: "لبِّ احتياجات مؤسستك في التخطيط والميزانية والتنبؤ بدقة أعلى وأتمتة أفضل.",
        }),
        tags: [
          t({ en: "Implementation and Configuration", ar: "التنفيذ والتهيئة" }),
          t({ en: "Model Development", ar: "تطوير النماذج" }),
          t({ en: "Data Integration", ar: "تكامل البيانات" }),
          t({ en: "Process Automation", ar: "أتمتة العمليات" }),
          t({ en: "Scenario Analysis", ar: "تحليل السيناريوهات" }),
          t({ en: "Training and Enablement", ar: "التدريب والتمكين" }),
        ],
      },
      {
        title: t({
          en: "Profitability and Cost Management",
          ar: "إدارة الربحية والتكاليف",
        }),
        description: t({
          en: "Achieve precision in cost allocation and enhance profitability with PCMCS.",
          ar: "حقق دقة أعلى في توزيع التكاليف وعزز الربحية باستخدام PCMCS.",
        }),
        tags: [
          t({
            en: "Integration with Financial Systems",
            ar: "التكامل مع الأنظمة المالية",
          }),
          t({ en: "Activity-Based Costing", ar: "التكلفة على أساس الأنشطة" }),
          t({ en: "Profitability Analysis", ar: "تحليل الربحية" }),
          t({ en: "Process Optimization", ar: "تحسين العمليات" }),
          t({ en: "Cost Allocation", ar: "توزيع التكاليف" }),
          t({ en: "Training and Support", ar: "التدريب والدعم" }),
        ],
      },
      {
        title: t({
          en: "Financial Consolidation and Close",
          ar: "التوحيد المالي والإغلاق",
        }),
        description: t({
          en: "Unlock multidimensional analysis and reporting to adapt to changing business needs and cover full end-to-end close tasks.",
          ar: "فعّل التحليل والتقارير متعددة الأبعاد للتكيف مع احتياجات الأعمال المتغيرة وتغطية مهام الإغلاق من البداية إلى النهاية.",
        }),
        tags: [
          t({ en: "Implementation and Configuration", ar: "التنفيذ والتهيئة" }),
          t({ en: "Data Integration", ar: "تكامل البيانات" }),
          t({ en: "Process Optimization", ar: "تحسين العمليات" }),
          t({ en: "Compliance and Controls", ar: "الامتثال والضوابط" }),
          t({ en: "Audit & Close Support", ar: "دعم التدقيق والإغلاق" }),
        ],
      },
      {
        title: t({
          en: "Account Reconciliation",
          ar: "تسوية الحسابات",
        }),
        description: t({
          en: "Automate account reconciliations and transaction matching and minimize risk for efficient and accurate financial statements.",
          ar: "أتمت تسويات الحسابات ومطابقة المعاملات وقلّل المخاطر للحصول على بيانات مالية دقيقة وفعّالة.",
        }),
        tags: [
          t({ en: "Configuration and Setup", ar: "الإعداد والتهيئة" }),
          t({ en: "Integration with ERP Systems", ar: "التكامل مع أنظمة ERP" }),
          t({ en: "Exception Handling", ar: "معالجة الاستثناءات" }),
          t({ en: "Certification and Review", ar: "التصديق والمراجعة" }),
          t({ en: "Reconciliation Rules", ar: "قواعد التسوية" }),
          t({ en: "Training and Support", ar: "التدريب والدعم" }),
        ],
      },
      {
        title: t({
          en: "Enterprise Data Management",
          ar: "إدارة بيانات المؤسسة",
        }),
        description: t({
          en: "Optimize data integration, governance, and quality with EDM.",
          ar: "حسّن تكامل البيانات وحوكمتها وجودتها باستخدام EDM.",
        }),
        tags: [
          t({
            en: "Data Governance Implementation Services",
            ar: "خدمات تنفيذ حوكمة البيانات",
          }),
          t({
            en: "Custom Development & Integration Services",
            ar: "تطوير مخصص وخدمات التكامل",
          }),
          t({
            en: "Data Integration & Migration Services",
            ar: "تكامل البيانات وخدمات الترحيل",
          }),
          t({
            en: "Data Privacy and Compliance Services",
            ar: "خصوصية البيانات وخدمات الامتثال",
          }),
          t({
            en: "Data Quality Management Services",
            ar: "إدارة جودة البيانات",
          }),
          t({
            en: "Metadata Management Solutions",
            ar: "حلول إدارة البيانات الوصفية",
          }),
          t({ en: "Training & Support Service", ar: "خدمة التدريب والدعم" }),
          t({
            en: "Master Data Management (MDM) Implementation",
            ar: "تنفيذ إدارة البيانات الرئيسية (MDM)",
          }),
        ],
      },
      {
        title: t({
          en: "Narrative Reporting",
          ar: "التقارير السردية",
        }),
        description: t({
          en: "Manage all reporting package needs with collaborative authoring and publishing.",
          ar: "أدر جميع احتياجات حزم التقارير عبر التأليف والنشر التعاوني.",
        }),
        tags: [
          t({ en: "Report Design & Development", ar: "تصميم وتطوير التقارير" }),
          t({ en: "Template Customization", ar: "تخصيص القوالب" }),
          t({ en: "Data Integration", ar: "تكامل البيانات" }),
          t({ en: "Collaboration & Review", ar: "التعاون والمراجعة" }),
          t({ en: "Distribution and Publishing", ar: "التوزيع والنشر" }),
          t({ en: "Training & Support", ar: "التدريب والدعم" }),
        ],
      },
      {
        title: t({
          en: "Tax Reporting",
          ar: "تقارير الضرائب",
        }),
        description: t({
          en: "Align tax and corporate financial reporting for better visibility and compliance.",
          ar: "وحّد تقارير الضرائب والتقارير المالية المؤسسية لتحسين الرؤية والامتثال.",
        }),
        tags: [
          t({
            en: "Implementation & Configuration Services",
            ar: "خدمات التنفيذ والتهيئة",
          }),
          t({
            en: "Tax Compliance Assessment & Gap Analysis",
            ar: "تقييم الامتثال الضريبي وتحليل الفجوات",
          }),
          t({
            en: "Tax Automation & Optimization",
            ar: "أتمتة الضرائب وتحسينها",
          }),
          t({
            en: "Post-Implementation Support & Maintenance",
            ar: "دعم وصيانة ما بعد التنفيذ",
          }),
          t({
            en: "Custom Tax Reporting Templates & Dashboards",
            ar: "قوالب ولوحات معلومات ضريبية مخصصة",
          }),
        ],
      },
      {
        title: t({
          en: "Data Integration",
          ar: "تكامل البيانات",
        }),
        description: t({
          en: "Reliable, automated data loads from your ERP into Oracle EPM.",
          ar: "تحميل بيانات موثوق ومؤتمت من نظام ERP الخاص بك إلى Oracle EPM.",
        }),
        tags: [
          t({ en: "Integration Design", ar: "تصميم التكامل" }),
          t({ en: "Mappings & Validation", ar: "الربط والتحقق" }),
          t({ en: "Data Management / FDMEE", ar: "إدارة البيانات / FDMEE" }),
          t({ en: "Automation", ar: "الأتمتة" }),
        ],
      },
      {
        title: t({
          en: "ESG & Sustainability Reporting",
          ar: "تقارير ESG والاستدامة",
        }),
        description: t({
          en: "Track and report emissions alongside your financials in Oracle EPM.",
          ar: "تتبّع الانبعاثات وأعدّ تقاريرها جنبًا إلى جنب مع بياناتك المالية في Oracle EPM.",
        }),
        tags: [
          t({ en: "ESG Data Model", ar: "نموذج بيانات ESG" }),
          t({ en: "Emissions Calculations", ar: "حسابات الانبعاثات" }),
          t({ en: "Data Integration", ar: "تكامل البيانات" }),
          t({ en: "Sustainability Reports", ar: "تقارير الاستدامة" }),
        ],
      },
    ],

    managedServices: [
      {
        title: t({
          en: "Consulting-as-a-Service",
          ar: "الاستشارات كخدمة",
        }),
        description: t({
          en: "Senior Oracle EPM advice when you need it: roadmaps, design reviews and second opinions.",
          ar: "استشارات Oracle EPM من خبراء كبار عند الحاجة: خرائط طريق، ومراجعات تصميم، وآراء ثانية.",
        }),
        tags: [
          t({
            en: "EPM Strategy & Roadmap",
            ar: "استراتيجية EPM وخارطة الطريق",
          }),
          t({
            en: "Business Process Re-engineering",
            ar: "إعادة هندسة العمليات",
          }),
          t({
            en: "Solution Selection & Proof-of-Value",
            ar: "اختيار الحل وإثبات القيمة",
          }),
          t({
            en: "Data Governance & Master Data Strategy",
            ar: "حوكمة البيانات واستراتيجية البيانات الرئيسية",
          }),
          t({
            en: "Change Management & Training",
            ar: "إدارة التغيير والتدريب",
          }),
        ],
      },
      {
        title: t({
          en: "EPM Solution Management",
          ar: "إدارة حلول EPM",
        }),
        description: t({
          en: "We improve and extend your live Oracle EPM application: new modules, rules, reports and security.",
          ar: "نطوّر تطبيق Oracle EPM العامل لديك ونوسّعه: وحدات جديدة، وقواعد، وتقارير، وصلاحيات أمان.",
        }),
        tags: [
          t({ en: "Module Implementation", ar: "تنفيذ الوحدات" }),
          t({
            en: "Integration & Data Management",
            ar: "التكامل وإدارة البيانات",
          }),
          t({
            en: "Modeling & Calculation Design",
            ar: "النمذجة وتصميم الحسابات",
          }),
          t({ en: "Reporting & Visualization", ar: "التقارير والتصور" }),
          t({ en: "Security & Role Design", ar: "الأمان وتصميم الأدوار" }),
          t({ en: "Testing & Validation", ar: "الاختبار والتحقق" }),
        ],
      },
      {
        title: t({
          en: "Monthly Update Testing",
          ar: "اختبار التحديثات الشهرية",
        }),
        description: t({
          en: "We review Oracle's monthly EPM Cloud updates and test them in your test environment before they reach production.",
          ar: "نراجع تحديثات Oracle EPM Cloud الشهرية ونختبرها في بيئة الاختبار لديك قبل وصولها إلى بيئة الإنتاج.",
        }),
        tags: [
          t({ en: "Release Notes Review", ar: "مراجعة ملاحظات الإصدار" }),
          t({ en: "Test Environment Validation", ar: "التحقق في بيئة الاختبار" }),
          t({ en: "Regression Testing", ar: "الاختبارات الرجعية" }),
          t({ en: "Update Deferral Planning", ar: "تخطيط تأجيل التحديثات" }),
        ],
      },
      {
        title: t({
          en: "Monthly Maintenance & Administration",
          ar: "الصيانة والإدارة الشهرية",
        }),
        description: t({
          en: "Month-end close support, data loads, user help and change requests, handled by our team every month.",
          ar: "دعم إقفال نهاية الشهر، وتحميل البيانات، ومساعدة المستخدمين، وطلبات التغيير، يتولاها فريقنا كل شهر.",
        }),
        tags: [
          t({
            en: "Monthly Close & Routine Operations",
            ar: "إغلاق شهري وعمليات دورية",
          }),
          t({
            en: "Data Loads & Reconciliation",
            ar: "تحميل البيانات والتسويات",
          }),
          t({
            en: "Report & Distribution Management",
            ar: "إدارة التقارير والتوزيع",
          }),
          t({
            en: "User Support & Change Requests",
            ar: "دعم المستخدم وطلبات التغيير",
          }),
          t({
            en: "Performance Tuning & Housekeeping",
            ar: "تحسين الأداء والصيانة",
          }),
          t({ en: "Backup & Audit", ar: "النسخ الاحتياطي والتدقيق" }),
        ],
      },
      {
        title: t({
          en: "EPM Staffing",
          ar: "توفير كفاءات EPM",
        }),
        description: t({
          en: "Experienced Oracle EPM consultants placed into your team, full or part time.",
          ar: "استشاريو Oracle EPM ذوو خبرة ينضمون إلى فريقك بدوام كامل أو جزئي.",
        }),
        tags: [
          t({ en: "Contract Consultants", ar: "استشاريون بعقود" }),
          t({ en: "Part-time Support", ar: "دعم بدوام جزئي" }),
          t({ en: "Short-term Cover", ar: "تغطية قصيرة الأجل" }),
        ],
      },
    ],
  },
};

export default financeTransformationListingsContent;
