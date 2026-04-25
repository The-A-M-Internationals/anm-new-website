import { t } from "intlayer";

const aiAutomationsListingsContent = {
  key: "aiAutomationsListings",
  content: {
    sectionTitle: t({
      en: "AI Automations",
      ar: "أتمتة الذكاء الاصطناعي",
    }),

    managedServiceTitle: t({
      en: "Managed Service",
      ar: "الخدمات المُدارة",
    }),

    services: [
      {
        title: t({
          en: "AI Strategy & Implementation",
          ar: "استراتيجية الذكاء الاصطناعي وتنفيذها",
        }),
        description: t({
          en: "Define and execute a practical AI strategy that identifies the highest-value automation and intelligence opportunities across your organisation.",
          ar: "حدّد استراتيجية ذكاء اصطناعي عملية ونفّذها تُحدد فرص الأتمتة والذكاء الأعلى قيمة عبر مؤسستك.",
        }),
        tags: [
          t({ en: "AI Opportunity Assessment", ar: "تقييم فرص الذكاء الاصطناعي" }),
          t({ en: "Use Case Prioritisation", ar: "تحديد أولويات حالات الاستخدام" }),
          t({ en: "Data Readiness Review", ar: "مراجعة جاهزية البيانات" }),
          t({ en: "Build vs Buy Analysis", ar: "تحليل البناء مقابل الشراء" }),
          t({ en: "Governance & Ethics Framework", ar: "إطار الحوكمة والأخلاقيات" }),
          t({ en: "Proof of Concept Development", ar: "تطوير إثبات المفهوم" }),
        ],
      },
      {
        title: t({
          en: "Robotic Process Automation (RPA)",
          ar: "أتمتة العمليات الروبوتية (RPA)",
        }),
        description: t({
          en: "Automate repetitive, rule-based tasks across finance, operations, and back-office functions to reduce manual effort, eliminate errors, and free your teams for higher-value work.",
          ar: "أتمت المهام المتكررة والقائمة على القواعد عبر المالية والعمليات والوظائف الخلفية لتقليل الجهد اليدوي والقضاء على الأخطاء وتحرير فرقك للعمل ذي القيمة الأعلى.",
        }),
        tags: [
          t({ en: "Process Discovery & Assessment", ar: "اكتشاف العمليات وتقييمها" }),
          t({ en: "Bot Design & Development", ar: "تصميم الروبوت وتطويره" }),
          t({ en: "Attended & Unattended Automation", ar: "الأتمتة المراقبة وغير المراقبة" }),
          t({ en: "Exception Handling", ar: "معالجة الاستثناءات" }),
          t({ en: "Bot Orchestration & Scheduling", ar: "تنسيق الروبوتات وجدولتها" }),
          t({ en: "Testing & Deployment", ar: "الاختبار والنشر" }),
        ],
      },
      {
        title: t({
          en: "Intelligent Document Processing",
          ar: "معالجة المستندات الذكية",
        }),
        description: t({
          en: "Extract, classify, and process structured and unstructured data from documents using AI-powered OCR, NLP, and machine learning to accelerate workflows and reduce manual handling.",
          ar: "استخرج البيانات المنظمة وغير المنظمة من المستندات وصنّفها وعالجها باستخدام التعرف الضوئي على الحروف والمعالجة الطبيعية للغة والتعلم الآلي المعتمد على الذكاء الاصطناعي لتسريع سير العمل.",
        }),
        tags: [
          t({ en: "OCR & Data Extraction", ar: "التعرف الضوئي واستخراج البيانات" }),
          t({ en: "Document Classification", ar: "تصنيف المستندات" }),
          t({ en: "NLP-Based Validation", ar: "التحقق القائم على معالجة اللغة الطبيعية" }),
          t({ en: "ERP & System Integration", ar: "التكامل مع ERP والأنظمة" }),
          t({ en: "Human-in-the-Loop Review", ar: "مراجعة بمشاركة الإنسان" }),
          t({ en: "Accuracy Monitoring", ar: "مراقبة الدقة" }),
        ],
      },
      {
        title: t({
          en: "AI-Powered Analytics & Forecasting",
          ar: "التحليلات والتنبؤ المعتمدان على الذكاء الاصطناعي",
        }),
        description: t({
          en: "Leverage machine learning and predictive modelling to generate forward-looking insights, detect anomalies, and improve decision-making accuracy across finance, operations, and strategy.",
          ar: "استفد من التعلم الآلي والنمذجة التنبؤية لتوليد رؤى مستقبلية واكتشاف الشذوذات وتحسين دقة اتخاذ القرار عبر المالية والعمليات والاستراتيجية.",
        }),
        tags: [
          t({ en: "Predictive Modelling", ar: "النمذجة التنبؤية" }),
          t({ en: "Anomaly Detection", ar: "اكتشاف الشذوذات" }),
          t({ en: "Demand & Revenue Forecasting", ar: "التنبؤ بالطلب والإيرادات" }),
          t({ en: "Scenario Planning", ar: "تخطيط السيناريوهات" }),
          t({ en: "Model Explainability", ar: "قابلية تفسير النموذج" }),
          t({ en: "Dashboard & Reporting Integration", ar: "تكامل لوحة المعلومات والتقارير" }),
        ],
      },
      {
        title: t({
          en: "Conversational AI & Virtual Assistants",
          ar: "الذكاء الاصطناعي التحادثي والمساعدون الافتراضيون",
        }),
        description: t({
          en: "Deploy intelligent chatbots and virtual assistants that handle employee and customer queries, automate routine interactions, and integrate with your existing systems.",
          ar: "انشر روبوتات محادثة ذكية ومساعدين افتراضيين يتعاملون مع استفسارات الموظفين والعملاء ويؤتمتون التفاعلات الروتينية ويتكاملون مع أنظمتك الحالية.",
        }),
        tags: [
          t({ en: "Intent Design & NLP Training", ar: "تصميم النية وتدريب معالجة اللغة" }),
          t({ en: "Multi-Channel Deployment", ar: "النشر متعدد القنوات" }),
          t({ en: "System & API Integration", ar: "تكامل الأنظمة وواجهات API" }),
          t({ en: "Escalation & Handoff Logic", ar: "منطق التصعيد والتسليم" }),
          t({ en: "Continuous Learning & Tuning", ar: "التعلم المستمر والضبط" }),
          t({ en: "Analytics & Conversation Insights", ar: "التحليلات ورؤى المحادثة" }),
        ],
      },
      {
        title: t({
          en: "Generative AI Integration",
          ar: "تكامل الذكاء الاصطناعي التوليدي",
        }),
        description: t({
          en: "Embed large language models and generative AI capabilities into your business workflows to accelerate content creation, knowledge retrieval, code generation, and decision support.",
          ar: "ادمج نماذج اللغة الكبيرة وقدرات الذكاء الاصطناعي التوليدي في سير عمل أعمالك لتسريع إنشاء المحتوى واسترجاع المعرفة وتوليد الكود ودعم القرار.",
        }),
        tags: [
          t({ en: "LLM Selection & Fine-Tuning", ar: "اختيار النموذج اللغوي الكبير وضبطه" }),
          t({ en: "Retrieval-Augmented Generation (RAG)", ar: "التوليد المعزز بالاسترجاع (RAG)" }),
          t({ en: "Prompt Engineering", ar: "هندسة الأوامر" }),
          t({ en: "Enterprise Knowledge Bases", ar: "قواعد المعرفة المؤسسية" }),
          t({ en: "Security & Data Privacy", ar: "الأمان وخصوصية البيانات" }),
          t({ en: "Evaluation & Quality Assurance", ar: "التقييم وضمان الجودة" }),
        ],
      },
    ],

    managedServices: [
      {
        title: t({
          en: "AI Operations & Model Management",
          ar: "عمليات الذكاء الاصطناعي وإدارة النماذج",
        }),
        description: t({
          en: "A&M International manages your deployed AI models on an ongoing basis — monitoring performance, detecting drift, retraining where needed, and ensuring your automation continues to deliver accurate, reliable results.",
          ar: "تدير A&M International نماذج الذكاء الاصطناعي المنشورة لديك باستمرار — مراقبة الأداء واكتشاف الانحراف وإعادة التدريب عند الحاجة وضمان استمرار أتمتتك في تقديم نتائج دقيقة وموثوقة.",
        }),
        tags: [
          t({ en: "Model Performance Monitoring", ar: "مراقبة أداء النموذج" }),
          t({ en: "Drift Detection & Retraining", ar: "اكتشاف الانحراف وإعادة التدريب" }),
          t({ en: "Pipeline Health Checks", ar: "فحوصات صحة خط الأنابيب" }),
          t({ en: "Incident & Escalation Management", ar: "إدارة الحوادث والتصعيد" }),
          t({ en: "Version Control & Rollback", ar: "التحكم في الإصدار والرجوع" }),
        ],
      },
      {
        title: t({
          en: "RPA Bot Support & Maintenance",
          ar: "دعم وصيانة روبوتات RPA",
        }),
        description: t({
          en: "A&M International provides continuous support for your RPA estate — resolving bot failures, managing updates, handling exceptions, and optimising automation coverage as your business processes evolve.",
          ar: "تقدم A&M International دعمًا مستمرًا لأسطول RPA الخاص بك — حل أعطال الروبوتات وإدارة التحديثات ومعالجة الاستثناءات وتحسين تغطية الأتمتة مع تطور عمليات أعمالك.",
        }),
        tags: [
          t({ en: "Bot Incident Resolution", ar: "حل حوادث الروبوت" }),
          t({ en: "Exception Monitoring & Handling", ar: "مراقبة الاستثناءات ومعالجتها" }),
          t({ en: "Release & Patch Management", ar: "إدارة الإصدارات والتحديثات" }),
          t({ en: "Performance Optimisation", ar: "تحسين الأداء" }),
          t({ en: "Capacity Planning", ar: "تخطيط الطاقة" }),
          t({ en: "SLA Reporting", ar: "تقارير اتفاقيات مستوى الخدمة" }),
        ],
      },
      {
        title: t({
          en: "AI Centre of Excellence (CoE)",
          ar: "مركز تميز الذكاء الاصطناعي",
        }),
        description: t({
          en: "A&M International helps you establish and run an AI Centre of Excellence — setting standards, scaling successful use cases, building internal capability, and governing AI adoption responsibly across the enterprise.",
          ar: "تساعدك A&M International على إنشاء وإدارة مركز تميز للذكاء الاصطناعي — وضع المعايير وتوسيع نطاق حالات الاستخدام الناجحة وبناء القدرات الداخلية وحوكمة تبني الذكاء الاصطناعي بمسؤولية عبر المؤسسة.",
        }),
        tags: [
          t({ en: "CoE Design & Setup", ar: "تصميم مركز التميز وإعداده" }),
          t({ en: "AI Governance Frameworks", ar: "أطر حوكمة الذكاء الاصطناعي" }),
          t({ en: "Use Case Pipeline Management", ar: "إدارة خط حالات الاستخدام" }),
          t({ en: "Skills & Capability Building", ar: "بناء المهارات والقدرات" }),
          t({ en: "Tooling & Platform Standards", ar: "معايير الأدوات والمنصات" }),
          t({ en: "AI Ethics & Compliance", ar: "أخلاقيات الذكاء الاصطناعي والامتثال" }),
        ],
      },
      {
        title: t({
          en: "Automation Analytics & Reporting",
          ar: "تحليلات الأتمتة والتقارير",
        }),
        description: t({
          en: "A&M International delivers ongoing reporting on your automation portfolio — tracking efficiency gains, cost savings, error rates, and ROI to demonstrate value and inform future investment decisions.",
          ar: "تقدم A&M International تقارير مستمرة عن محفظة الأتمتة الخاصة بك — تتبع مكاسب الكفاءة ووفورات التكاليف ومعدلات الأخطاء والعائد على الاستثمار لإثبات القيمة وإبلاغ قرارات الاستثمار المستقبلية.",
        }),
        tags: [
          t({ en: "Automation ROI Tracking", ar: "تتبع عائد الاستثمار في الأتمتة" }),
          t({ en: "KPI Dashboard Management", ar: "إدارة لوحة مؤشرات الأداء الرئيسية" }),
          t({ en: "Exception & Error Rate Reporting", ar: "تقارير معدلات الاستثناء والخطأ" }),
          t({ en: "Capacity & Throughput Analysis", ar: "تحليل الطاقة والإنتاجية" }),
          t({ en: "Executive Summaries", ar: "ملخصات تنفيذية" }),
          t({ en: "Improvement Recommendations", ar: "توصيات التحسين" }),
        ],
      },
    ],
  },
};

export default aiAutomationsListingsContent;