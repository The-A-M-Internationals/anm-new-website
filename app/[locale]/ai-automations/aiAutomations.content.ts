import { t, type DeclarationContent } from "intlayer";

const aiAutomationsContent = {
    key: "aiAutomations",
    content: {
        // Hero Section
        heroTitle: t({
            en: "Intelligent Automation",
            ar: "الأتمتة الذكية",
        }),
        heroSubtitle: t({
            en: "Elevated by AI",
            ar: "مدعومة بالذكاء الاصطناعي",
        }),
        heroDescription: t({
            en: "Transform your business with cutting-edge AI and machine learning solutions. Automate workflows, enhance decision-making, and unlock unprecedented efficiency.",
            ar: "حوّل عملك بحلول الذكاء الاصطناعي والتعلم الآلي المتطورة. أتمتة سير العمل، وتحسين اتخاذ القرارات، وإطلاق العنان لكفاءة غير مسبوقة.",
        }),
        exploreServices: t({
            en: "Explore AI Solutions",
            ar: "استكشف حلول الذكاء الاصطناعي",
        }),
        bookConsultation: t({
            en: "Schedule Consultation",
            ar: "حدد موعد استشارة",
        }),

        // Services Section
        servicesTitle: t({
            en: "Our AI Automation Services",
            ar: "خدمات الأتمتة بالذكاء الاصطناعي",
        }),
        servicesSubtitle: t({
            en: "Intelligent solutions powered by artificial intelligence",
            ar: "حلول ذكية مدعومة بالذكاء الاصطناعي",
        }),

        // Machine Learning
        mlTitle: t({
            en: "Machine Learning",
            ar: "التعلم الآلي",
        }),
        mlDescription: t({
            en: "Custom ML models that learn from your data and improve over time",
            ar: "نماذج تعلم آلي مخصصة تتعلم من بياناتك وتتحسن بمرور الوقت",
        }),
        mlService1: t({
            en: "Predictive Analytics",
            ar: "التحليلات التنبؤية",
        }),
        mlService2: t({
            en: "Pattern Recognition",
            ar: "التعرف على الأنماط",
        }),
        mlService3: t({
            en: "Recommendation Systems",
            ar: "أنظمة التوصيات",
        }),
        mlService4: t({
            en: "Anomaly Detection",
            ar: "كشف الشذوذ",
        }),

        // Robotic Process Automation
        rpaTitle: t({
            en: "Robotic Process Automation",
            ar: "أتمتة العمليات الروبوتية",
        }),
        rpaDescription: t({
            en: "Automate repetitive tasks and free your team for strategic work",
            ar: "أتمتة المهام المتكررة وتحرير فريقك للعمل الاستراتيجي",
        }),
        rpaService1: t({
            en: "Data Entry Automation",
            ar: "أتمتة إدخال البيانات",
        }),
        rpaService2: t({
            en: "Report Generation",
            ar: "توليد التقارير",
        }),
        rpaService3: t({
            en: "Email Processing",
            ar: "معالجة البريد الإلكتروني",
        }),
        rpaService4: t({
            en: "Workflow Orchestration",
            ar: "تنسيق سير العمل",
        }),

        // Natural Language Processing
        nlpTitle: t({
            en: "Natural Language Processing",
            ar: "معالجة اللغة الطبيعية",
        }),
        nlpDescription: t({
            en: "Enable machines to understand and respond to human language",
            ar: "تمكين الآلات من فهم اللغة البشرية والاستجابة لها",
        }),
        nlpService1: t({
            en: "Chatbots & Virtual Assistants",
            ar: "روبوتات الدردشة والمساعدين الافتراضيين",
        }),
        nlpService2: t({
            en: "Sentiment Analysis",
            ar: "تحليل المشاعر",
        }),
        nlpService3: t({
            en: "Document Understanding",
            ar: "فهم المستندات",
        }),
        nlpService4: t({
            en: "Language Translation",
            ar: "الترجمة اللغوية",
        }),

        // Computer Vision
        cvTitle: t({
            en: "Computer Vision",
            ar: "رؤية الكمبيوتر",
        }),
        cvDescription: t({
            en: "Extract insights from images and video with advanced visual AI",
            ar: "استخراج الرؤى من الصور والفيديو بالذكاء الاصطناعي البصري المتقدم",
        }),
        cvService1: t({
            en: "Image Recognition",
            ar: "التعرف على الصور",
        }),
        cvService2: t({
            en: "Object Detection",
            ar: "كشف الأشياء",
        }),
        cvService3: t({
            en: "Facial Analysis",
            ar: "تحليل الوجه",
        }),
        cvService4: t({
            en: "Quality Inspection",
            ar: "فحص الجودة",
        }),

        // Generative AI
        genAITitle: t({
            en: "Generative AI",
            ar: "الذكاء الاصطناعي التوليدي",
        }),
        genAIDescription: t({
            en: "Create content, code, and solutions with cutting-edge generative models",
            ar: "إنشاء المحتوى والأكواد والحلول بنماذج توليدية متطورة",
        }),
        genAIService1: t({
            en: "Content Generation",
            ar: "توليد المحتوى",
        }),
        genAIService2: t({
            en: "Code Assistance",
            ar: "مساعدة الأكواد",
        }),
        genAIService3: t({
            en: "Creative Design",
            ar: "التصميم الإبداعي",
        }),
        genAIService4: t({
            en: "Data Synthesis",
            ar: "تركيب البيانات",
        }),
    },
} satisfies DeclarationContent;

export default aiAutomationsContent;