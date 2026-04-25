import { t } from "intlayer";

const digitalTransformationListingsContent = {
  key: "digitalTransformationListings",
  content: {
    sectionTitle: t({
      en: "Digital Transformation",
      ar: "التحول الرقمي",
    }),

    managedServiceTitle: t({
      en: "Managed Service",
      ar: "الخدمات المُدارة",
    }),

    services: [
      {
        title: t({
          en: "Cloud Migration & Modernisation",
          ar: "الترحيل إلى السحابة والتحديث",
        }),
        description: t({
          en: "Migrate legacy systems and workloads to the cloud with minimal disruption, enabling greater agility, scalability, and cost efficiency.",
          ar: "انقل الأنظمة والأحمال القديمة إلى السحابة بأقل قدر من التعطيل لتحقيق مرونة وقابلية توسع وكفاءة أعلى في التكاليف.",
        }),
        tags: [
          t({ en: "Cloud Readiness Assessment", ar: "تقييم الجاهزية للسحابة" }),
          t({ en: "Infrastructure Migration", ar: "ترحيل البنية التحتية" }),
          t({ en: "Application Re-platforming", ar: "إعادة منصة التطبيقات" }),
          t({ en: "Data Migration & Validation", ar: "ترحيل البيانات والتحقق" }),
          t({ en: "Cloud Cost Optimisation", ar: "تحسين تكاليف السحابة" }),
          t({ en: "Post-Migration Support", ar: "الدعم بعد الترحيل" }),
        ],
      },
      {
        title: t({
          en: "ERP Implementation & Integration",
          ar: "تنفيذ وتكامل نظام ERP",
        }),
        description: t({
          en: "Implement and integrate enterprise resource planning systems that unify business operations, data flows, and reporting across your organisation.",
          ar: "نفّذ وادمج أنظمة تخطيط موارد المؤسسة التي توحّد عمليات الأعمال وتدفقات البيانات والتقارير عبر مؤسستك.",
        }),
        tags: [
          t({ en: "Requirements Gathering & Design", ar: "جمع المتطلبات والتصميم" }),
          t({ en: "System Configuration", ar: "تهيئة النظام" }),
          t({ en: "Data Migration", ar: "ترحيل البيانات" }),
          t({ en: "Third-Party Integration", ar: "تكامل الطرف الثالث" }),
          t({ en: "User Acceptance Testing", ar: "اختبار قبول المستخدم" }),
          t({ en: "Training & Hypercare", ar: "التدريب والرعاية المكثفة" }),
        ],
      },
      {
        title: t({
          en: "Business Process Digitisation",
          ar: "رقمنة العمليات التجارية",
        }),
        description: t({
          en: "Transform manual and paper-based processes into streamlined digital workflows that improve accuracy, speed, and operational visibility.",
          ar: "حوّل العمليات اليدوية والورقية إلى سير عمل رقمي مبسّط يحسّن الدقة والسرعة والرؤية التشغيلية.",
        }),
        tags: [
          t({ en: "Process Mapping & Analysis", ar: "رسم وتحليل العمليات" }),
          t({ en: "Workflow Automation", ar: "أتمتة سير العمل" }),
          t({ en: "Digital Forms & Approvals", ar: "النماذج والموافقات الرقمية" }),
          t({ en: "Document Management", ar: "إدارة الوثائق" }),
          t({ en: "Process Monitoring & KPIs", ar: "مراقبة العمليات ومؤشرات الأداء" }),
          t({ en: "Continuous Improvement", ar: "التحسين المستمر" }),
        ],
      },
      {
        title: t({
          en: "Digital Strategy & Roadmap",
          ar: "الاستراتيجية الرقمية وخارطة الطريق",
        }),
        description: t({
          en: "Develop a clear, actionable digital transformation strategy aligned to your business goals, capabilities, and market opportunities.",
          ar: "طوّر استراتيجية تحول رقمي واضحة وقابلة للتنفيذ تتوافق مع أهداف أعمالك وقدراتك وفرص السوق.",
        }),
        tags: [
          t({ en: "Digital Maturity Assessment", ar: "تقييم النضج الرقمي" }),
          t({ en: "Technology Landscape Review", ar: "مراجعة المشهد التقني" }),
          t({ en: "Prioritisation & Business Case", ar: "تحديد الأولويات وحالة العمل" }),
          t({ en: "Architecture & Platform Selection", ar: "الهندسة واختيار المنصة" }),
          t({ en: "Change Management Planning", ar: "تخطيط إدارة التغيير" }),
          t({ en: "Governance & Ownership Model", ar: "نموذج الحوكمة والملكية" }),
        ],
      },
      {
        title: t({
          en: "API & Systems Integration",
          ar: "تكامل واجهات برمجة التطبيقات والأنظمة",
        }),
        description: t({
          en: "Connect disparate systems, applications, and data sources through robust API and middleware solutions that ensure seamless information exchange.",
          ar: "اربط الأنظمة والتطبيقات ومصادر البيانات المتباينة من خلال حلول API والوسيط المتينة لضمان تبادل المعلومات بسلاسة.",
        }),
        tags: [
          t({ en: "API Design & Development", ar: "تصميم وتطوير واجهات API" }),
          t({ en: "Middleware Configuration", ar: "تهيئة الوسيط" }),
          t({ en: "Real-Time Data Sync", ar: "مزامنة البيانات في الوقت الفعلي" }),
          t({ en: "Legacy System Connectors", ar: "موصلات الأنظمة القديمة" }),
          t({ en: "Security & Authentication", ar: "الأمان والمصادقة" }),
          t({ en: "Integration Testing & Monitoring", ar: "اختبار التكامل والمراقبة" }),
        ],
      },
      {
        title: t({
          en: "Data & Analytics Modernisation",
          ar: "تحديث البيانات والتحليلات",
        }),
        description: t({
          en: "Modernise your data architecture and analytics capabilities to unlock real-time insights, improve reporting quality, and support data-driven decisions.",
          ar: "حدّث بنية بياناتك وقدرات التحليلات لإطلاق الرؤى الفورية وتحسين جودة التقارير ودعم القرارات القائمة على البيانات.",
        }),
        tags: [
          t({ en: "Data Warehouse & Lakehouse", ar: "مستودع البيانات والبحيرة" }),
          t({ en: "BI & Dashboard Development", ar: "تطوير BI ولوحات المعلومات" }),
          t({ en: "Data Pipeline Engineering", ar: "هندسة خطوط بيانات" }),
          t({ en: "Self-Service Analytics", ar: "التحليلات الذاتية" }),
          t({ en: "Data Quality & Governance", ar: "جودة البيانات وحوكمتها" }),
          t({ en: "Training & Adoption", ar: "التدريب والتبني" }),
        ],
      },
    ],

    managedServices: [
      {
        title: t({
          en: "Digital Programme Management",
          ar: "إدارة البرامج الرقمية",
        }),
        description: t({
          en: "A&M International provides end-to-end programme management for complex digital transformation initiatives, ensuring on-time delivery, stakeholder alignment, and measurable business outcomes.",
          ar: "تقدم A&M International إدارة برامج شاملة لمبادرات التحول الرقمي المعقدة، مع ضمان التسليم في الوقت المحدد وتوافق أصحاب المصلحة وتحقيق نتائج أعمال قابلة للقياس.",
        }),
        tags: [
          t({ en: "Programme Governance & Reporting", ar: "حوكمة البرنامج والتقارير" }),
          t({ en: "Risk & Issue Management", ar: "إدارة المخاطر والمشكلات" }),
          t({ en: "Vendor & Stakeholder Coordination", ar: "تنسيق الموردين وأصحاب المصلحة" }),
          t({ en: "Budget & Resource Tracking", ar: "تتبع الميزانية والموارد" }),
          t({ en: "Benefits Realisation", ar: "تحقيق الفوائد" }),
        ],
      },
      {
        title: t({
          en: "Managed Cloud Operations",
          ar: "إدارة عمليات السحابة",
        }),
        description: t({
          en: "A&M International manages your cloud environment on an ongoing basis — monitoring performance, controlling costs, applying patches, and ensuring availability so your teams can focus on business outcomes.",
          ar: "تدير A&M International بيئتك السحابية باستمرار — مراقبة الأداء والتحكم في التكاليف وتطبيق التحديثات وضمان التوفر حتى تتمكن فرقك من التركيز على نتائج الأعمال.",
        }),
        tags: [
          t({ en: "Infrastructure Monitoring", ar: "مراقبة البنية التحتية" }),
          t({ en: "Patch & Security Management", ar: "إدارة التحديثات والأمان" }),
          t({ en: "Cost Governance & Rightsizing", ar: "حوكمة التكاليف والتحجيم" }),
          t({ en: "Backup & Disaster Recovery", ar: "النسخ الاحتياطي والتعافي من الكوارث" }),
          t({ en: "SLA Management & Reporting", ar: "إدارة اتفاقيات مستوى الخدمة والتقارير" }),
          t({ en: "24/7 Incident Response", ar: "الاستجابة للحوادث على مدار الساعة" }),
        ],
      },
      {
        title: t({
          en: "Application Support & Evolution",
          ar: "دعم التطبيقات وتطورها",
        }),
        description: t({
          en: "A&M International provides ongoing support and continuous enhancement for business-critical applications, managing incidents, releases, and improvements to keep your systems performing at their best.",
          ar: "تقدم A&M International دعمًا مستمرًا وتحسينات متواصلة للتطبيقات الحيوية للأعمال، وإدارة الحوادث والإصدارات والتحسينات للحفاظ على أداء أنظمتك بأفضل مستوى.",
        }),
        tags: [
          t({ en: "Incident & Problem Management", ar: "إدارة الحوادث والمشكلات" }),
          t({ en: "Release & Change Management", ar: "إدارة الإصدارات والتغييرات" }),
          t({ en: "Enhancement Backlog Management", ar: "إدارة قائمة التحسينات" }),
          t({ en: "Performance Tuning", ar: "تحسين الأداء" }),
          t({ en: "User Support & Training", ar: "دعم المستخدم والتدريب" }),
          t({ en: "Documentation & Knowledge Base", ar: "التوثيق وقاعدة المعرفة" }),
        ],
      },
      {
        title: t({
          en: "Change Management & Adoption",
          ar: "إدارة التغيير والتبني",
        }),
        description: t({
          en: "A&M International helps organisations navigate the human side of digital transformation — driving adoption, building capability, and embedding new ways of working across all levels of the business.",
          ar: "تساعد A&M International المؤسسات على التعامل مع الجانب البشري للتحول الرقمي — تعزيز التبني وبناء القدرات وترسيخ أساليب عمل جديدة عبر جميع مستويات الأعمال.",
        }),
        tags: [
          t({ en: "Stakeholder Impact Assessment", ar: "تقييم أثر أصحاب المصلحة" }),
          t({ en: "Communication Planning", ar: "تخطيط التواصل" }),
          t({ en: "Training Design & Delivery", ar: "تصميم التدريب وتقديمه" }),
          t({ en: "Adoption Metrics & Tracking", ar: "مقاييس التبني والتتبع" }),
          t({ en: "Leadership Coaching", ar: "تدريب القيادة" }),
          t({ en: "Resistance Management", ar: "إدارة مقاومة التغيير" }),
        ],
      },
    ],
  },
};

export default digitalTransformationListingsContent;