import { t } from "intlayer";

const methodologySectionContent = {
  key: "methodologySection",
  content: {
    headerTitle: t({
      en: "Our Methodology",
      ar: "منهجيتنا",
    }),
    headerDescription: t({
      en: "A proven approach that delivers consistent results across every engagement",
      ar: "نهج مثبت يقدم نتائج متسقة عبر كل مشروع",
    }),
    steps: [
      {
        number: t({ en: "01", ar: "٠١" }),
        title: t({ en: "Assess", ar: "تقييم" }),
        subtitle: t({
          en: "Understand client needs and objectives",
          ar: "فهم احتياجات وأهداف العميل",
        }),
        description: t({
          en: "We begin with a deep understanding of your current processes, data flows, and business goals. Through workshops, system audits, and gap analysis, we identify quickly what really drives value and quantitative board-used to optimize resources and set clear, realistic milestones for the project.",
          ar: "نبدأ بفهم عميق لعملياتك الحالية وتدفقات البيانات وأهداف العمل. من خلال ورش العمل وتدقيق الأنظمة وتحليل الفجوات، نحدد بسرعة ما يحقق القيمة فعلاً ونستخدم اللوحات الكمية لتحسين الموارد وتحديد معالم واضحة وواقعية للمشروع.",
        }),
        bullets: [
          t({
            en: "Conduct stakeholder workshops to understand business goals",
            ar: "إجراء ورش عمل مع أصحاب المصلحة لفهم أهداف العمل",
          }),
          t({
            en: "Analyze existing processes, systems, and data flows",
            ar: "تحليل العمليات والأنظمة وتدفقات البيانات الحالية",
          }),
          t({
            en: "Perform gap analysis to identify improvement opportunities",
            ar: "إجراء تحليل الفجوات لتحديد فرص التحسين",
          }),
          t({
            en: "Define success metrics and outline the transformation roadmap",
            ar: "تحديد مقاييس النجاح ووضع خارطة طريق التحول",
          }),
        ],
      },
      {
        number: t({ en: "02", ar: "٠٢" }),
        title: t({ en: "Design", ar: "تصميم" }),
        subtitle: t({
          en: "Tailored solutions for optimal results",
          ar: "حلول مخصصة لتحقيق أفضل النتائج",
        }),
        description: t({
          en: "Based on our assessment, we craft a customized solution blueprint — including planning models, consolidation logic, integrations, security, reporting dashboards, and a clear governance framework. Every design decision is validated to align your strategic outcomes.",
          ar: "استنادًا إلى تقييمنا، نصمم مخطط حل مخصص يشمل نماذج التخطيط، منطق الدمج، التكاملات، الأمان، لوحات التقارير، وإطار حوكمة واضح. يتم التحقق من كل قرار تصميم لضمان توافقه مع أهدافك الاستراتيجية.",
        }),
        bullets: [
          t({
            en: "Create a tailored Oracle EPM architecture aligned to objectives",
            ar: "إنشاء بنية أوراكل EPM مخصصة تتماشى مع الأهداف",
          }),
          t({
            en: "Define workflows, rules, automation rules, and reporting structures",
            ar: "تحديد سير العمل والقواعد وقواعد الأتمتة وهياكل التقارير",
          }),
          t({
            en: "Design integrations, data frameworks, and security models",
            ar: "تصميم التكاملات وأطر البيانات ونماذج الأمان",
          }),
          t({
            en: "Document detailed solution blueprints and implementation plans",
            ar: "توثيق مخططات الحلول التفصيلية وخطط التنفيذ",
          }),
        ],
      },
      {
        number: t({ en: "03", ar: "٠٣" }),
        title: t({ en: "Deploy", ar: "تنفيذ" }),
        subtitle: t({
          en: "Execute plans with precision and care",
          ar: "تنفيذ الخطط بدقة وعناية",
        }),
        description: t({
          en: "We execute the build, test, and cutover from existing tools (or startup with a blank slate) in a structured, low-risk manner. Our team sets up Oracle EPM, migrates data, configures processes, and transitions with minimal disruption and immediate business value.",
          ar: "ننفذ البناء والاختبار والتحويل من الأدوات الحالية (أو البدء من الصفر) بطريقة منظمة ومنخفضة المخاطر. يقوم فريقنا بإعداد أوراكل EPM، وترحيل البيانات، وتكوين العمليات، والانتقال بأقل قدر من التعطيل وتحقيق قيمة فورية للأعمال.",
        }),
        bullets: [
          t({
            en: "Configure and implement Oracle EPM modules with precision",
            ar: "تكوين وتنفيذ وحدات أوراكل EPM بدقة",
          }),
          t({
            en: "Migrate data, build dimensions, and validate end-to-end accuracy",
            ar: "ترحيل البيانات، وبناء الأبعاد، والتحقق من الدقة الشاملة",
          }),
          t({
            en: "Launch testing cycles (UAT, pilot) and implement user training",
            ar: "إطلاق دورات الاختبار (UAT، تجريبي) وتنفيذ تدريب المستخدمين",
          }),
          t({
            en: "Go live with full support to ensure smooth transition",
            ar: "تشغيل النظام بدعم كامل لضمان انتقال سلس",
          }),
        ],
      },
      {
        number: t({ en: "04", ar: "٠٤" }),
        title: t({ en: "Sustain", ar: "استدامة" }),
        subtitle: t({
          en: "Long-term support for ongoing success",
          ar: "دعم طويل الأمد لتحقيق النجاح المستمر",
        }),
        description: t({
          en: "We provide continuous support for your Oracle EPM environment through monthly health checks, release upgrades, and quick user assistance. Whether you need regular updates, new model enhancements, system validation, performance tuning, and continuous improvement.",
          ar: "نقدم دعمًا مستمرًا لبيئة أوراكل EPM الخاصة بك من خلال الفحوصات الشهرية، وترقيات الإصدارات، والمساعدة السريعة للمستخدمين. سواء كنت بحاجة إلى تحديثات منتظمة، أو تحسينات على النماذج، أو التحقق من النظام، أو ضبط الأداء، أو التحسين المستمر.",
        }),
        bullets: [
          t({
            en: "Manage monthly operations, dashboards, and task schedules",
            ar: "إدارة العمليات الشهرية ولوحات المعلومات وجداول المهام",
          }),
          t({
            en: "Monitor performance and optimize models for ongoing efficiency",
            ar: "مراقبة الأداء وتحسين النماذج لتحقيق الكفاءة المستمرة",
          }),
          t({
            en: "Provide ongoing training and user support as needs evolve",
            ar: "تقديم التدريب المستمر ودعم المستخدمين حسب الحاجة",
          }),
          t({
            en: "Drive continuous improvement through insights and regular reviews",
            ar: "قيادة التحسين المستمر من خلال الرؤى والمراجعات المنتظمة",
          }),
        ],
      },
    ],
  },
};

export default methodologySectionContent;
