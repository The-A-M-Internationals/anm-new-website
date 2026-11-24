import { t, type DeclarationContent } from "intlayer";

const aiAutomationsContent = {
    key: "aiAutomations",
    content: {
        // Hero Section
        heroTitle: t({
            en: "AI and automation",
            ar: "الذكاء الاصطناعي والأتمتة",
        }),
        heroSubtitle: t({
            en: "for Oracle EPM",
            ar: "لـ Oracle EPM",
        }),
        heroDescription: t({
            en: "We build AI agents and automation tools that take repetitive work off Oracle EPM teams, running on Oracle Cloud.",
            ar: "نبني وكلاء ذكاء اصطناعي وأدوات أتمتة تُخفّف العمل المتكرر عن فرق Oracle EPM، وتعمل على Oracle Cloud.",
        }),
        exploreServices: t({
            en: "Explore AI Solutions",
            ar: "استكشف حلول الذكاء الاصطناعي",
        }),
        bookConsultation: t({
            en: "Schedule Consultation",
            ar: "حدد موعد استشارة",
        }),
        heroBadge: t({
            en: "Powered by Artificial Intelligence",
            ar: "مدعوم بالذكاء الاصطناعي",
        }),
        scroll: t({ en: "Scroll", ar: "تمرير" }),
        learnMore: t({ en: "Learn More", ar: "اعرف المزيد" }),

        // Services Section
        servicesTitle: t({
            en: "Our AI Automation Services",
            ar: "خدمات الأتمتة بالذكاء الاصطناعي",
        }),
        servicesSubtitle: t({
            en: "Intelligent solutions powered by artificial intelligence",
            ar: "حلول ذكية مدعومة بالذكاء الاصطناعي",
        }),
        comingSoon: t({
            en: "Coming soon",
            ar: "قريبًا",
        }),

        // EPM Build Agent
        buildAgentTitle: t({
            en: "EPM Build Agent",
            ar: "EPM Build Agent",
        }),
        buildAgentDescription: t({
            en: "An AI agent that helps Oracle EPM teams build and configure their applications.",
            ar: "وكيل ذكاء اصطناعي يساعد فرق Oracle EPM على بناء تطبيقاتهم وإعدادها.",
        }),
        buildAgentService1: t({
            en: "Built for Oracle EPM",
            ar: "مصمم لـ Oracle EPM",
        }),
        buildAgentService2: t({
            en: "Runs on Oracle Cloud",
            ar: "يعمل على Oracle Cloud",
        }),
        buildAgentService3: t({
            en: "Early access sign-up open",
            ar: "التسجيل للوصول المبكر متاح",
        }),

        // EPM Automation
        epmAutomationTitle: t({
            en: "EPM Automation",
            ar: "أتمتة EPM",
        }),
        epmAutomationDescription: t({
            en: "Scripts and tools that automate data loads, admin and testing.",
            ar: "نصوص برمجية وأدوات تؤتمت تحميل البيانات والمهام الإدارية والاختبار.",
        }),
        epmAutomationService1: t({
            en: "Data load automation",
            ar: "أتمتة تحميل البيانات",
        }),
        epmAutomationService2: t({
            en: "Admin task automation",
            ar: "أتمتة المهام الإدارية",
        }),
        epmAutomationService3: t({
            en: "Testing automation",
            ar: "أتمتة الاختبارات",
        }),

        // AI on Oracle Cloud
        ociAITitle: t({
            en: "AI on Oracle Cloud",
            ar: "الذكاء الاصطناعي على Oracle Cloud",
        }),
        ociAIDescription: t({
            en: "AI built on OCI Generative AI, so your data stays on Oracle.",
            ar: "ذكاء اصطناعي مبني على OCI Generative AI، لتبقى بياناتك على Oracle.",
        }),
        ociAIService1: t({
            en: "OCI Generative AI",
            ar: "OCI Generative AI",
        }),
        ociAIService2: t({
            en: "Model-agnostic",
            ar: "غير مرتبط بنموذج محدد",
        }),
        ociAIService3: t({
            en: "Your data stays on Oracle",
            ar: "تبقى بياناتك على Oracle",
        }),
    },
} satisfies DeclarationContent;

export default aiAutomationsContent;
