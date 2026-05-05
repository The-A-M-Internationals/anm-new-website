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
        industry: t({ en: "Automotive & Mobility", ar: "السيارات والتنقل" }),
        companyName: t({
          en: "Automotive & Mobility",
          ar: "السيارات والتنقّل",
        }),
        metric1: t({ en: "Seamless Experience", ar: "تجربة سلسة" }),
        metric2: t({ en: "Future Ready", ar: "جاهز للمستقبل" }),
        p1: t({
          en: "The automotive industry is in the middle of its biggest transformation in a century — and the brands that win the next decade will be the ones whose digital experiences match the quality of their physical products.",
          ar: "يمرّ قطاع السيارات بأكبر تحوّل في تاريخه منذ قرن — والعلامات التي ستنتصر في العقد القادم هي تلك التي ستتطابق تجاربها الرقمية مع جودة منتجاتها المادية.",
        }),
        p2: t({
          en: "We work with automotive and mobility brands to design the digital layer of their customer journey: dealership websites that make discovery effortless, configuration tools that turn browsing into buying, service portals that respect the customer's time, and brand identity systems that translate craftsmanship into pixels.",
          ar: "نعمل مع علامات السيارات والتنقّل لتصميم الطبقة الرقمية من رحلة العميل: مواقع المعارض التي تجعل الاكتشاف سلسًا، وأدوات التهيئة التي تُحوّل التصفّح إلى شراء، وبوابات الخدمة التي تحترم وقت العميل، وأنظمة الهوية التي تُترجم الحرفية إلى بكسلات.",
        }),
        p3: t({
          en: "Whether it's a traditional dealership modernizing its presence, an EV brand defining its visual language, or a mobility startup building from scratch, our focus stays the same — make the digital experience as considered as the engineering behind the product.",
          ar: "سواء كان معرضًا تقليديًا يُحدّث حضوره، أو علامة سيارات كهربائية تُعرّف لغتها البصرية، أو شركة تنقّل ناشئة تبني من الصفر — يبقى تركيزنا واحدًا: جعل التجربة الرقمية بنفس مستوى التفكير الهندسي وراء المنتج.",
        }),
        p4: t({
          en: "We work with: automotive dealerships, EV brands, mobility startups, fleet management platforms, and aftermarket service providers.",
          ar: "نعمل مع: معارض السيارات، علامات السيارات الكهربائية، شركات التنقّل الناشئة، منصات إدارة الأساطيل، ومقدّمي خدمات ما بعد البيع.",
        }),
        link: t({
          en: "Open to automotive partnerships → am@theaminternational.com",
          ar: "نرحب بشراكات في قطاع السيارات ← am@theaminternational.com",
        }),
      },
      study2: {
        industry: t({ en: "Insurance & Financial Services", ar: "التأمين والخدمات المالية" }),
        companyName: t({
          en: "Insurance & Financial Services",
          ar: "التأمين والخدمات المالية",
        }),
        metric1: t({ en: "User Centric", ar: "محورها المستخدم" }),
        metric2: t({ en: "Trusted Flow", ar: "تدفق موثوق" }),
        p1: t({
          en: "Insurance and financial services live or die by trust — and trust today is built (or broken) in the first thirty seconds someone spends on your website.",
          ar: "التأمين والخدمات المالية يعيشان أو يسقطان بناءً على الثقة — والثقة اليوم تُبنى (أو تنهار) خلال أول ثلاثين ثانية يقضيها العميل على موقعك الإلكتروني.",
        }),
        p2: t({
          en: "We help insurance and financial services brands translate complex products into clear digital experiences. That means websites that explain coverage without jargon, comparison tools that respect the customer's intelligence, claims journeys that reduce anxiety instead of adding to it, and brand systems that signal stability across every touchpoint.",
          ar: "نساعد علامات التأمين والخدمات المالية على ترجمة منتجاتها المعقّدة إلى تجارب رقمية واضحة. وهذا يعني مواقع تشرح التغطية دون مصطلحات معقّدة، وأدوات مقارنة تحترم ذكاء العميل، ورحلات مطالبات تُقلّل القلق بدلاً من زيادته، وأنظمة هوية تنقل الاستقرار في كل نقطة تواصل.",
        }),
        p3: t({
          en: "Our design approach for this sector emphasizes transparency, hierarchy, and trust signals — clear pricing structures, visible accreditations, plain-language policy summaries, and interfaces that don't hide behind fine print. Because in financial services, the design is the product promise.",
          ar: "نهجنا التصميمي لهذا القطاع يُركّز على الشفافية والتسلسل ومؤشرات الثقة — هياكل تسعير واضحة، واعتمادات ظاهرة، وملخصات وثائق بلغة بسيطة، وواجهات لا تختبئ خلف البنود الدقيقة. لأن التصميم في الخدمات المالية هو وعد المنتج ذاته.",
        }),
        p4: t({
          en: "We work with: general insurance providers, health insurance brands, InsurTech startups, financial advisory firms, and brokerages.",
          ar: "نعمل مع: شركات التأمين العام، علامات التأمين الصحي، شركات التقنية التأمينية الناشئة، مكاتب الاستشارات المالية، والوسطاء.",
        }),
        link: t({
          en: "Open to insurance partnerships → am@theaminternational.com",
          ar: "نرحب بشراكات في قطاع التأمين ← am@theaminternational.com",
        }),
      },
      study3: {
        industry: t({ en: "Healthcare & Wellness", ar: "الرعاية الصحية والعافية" }),
        companyName: t({
          en: "Healthcare & Wellness",
          ar: "الرعاية الصحية والعافية",
        }),
        metric1: t({ en: "Empathetic Design", ar: "تصميم رحيم" }),
        metric2: t({ en: "Wellness First", ar: "العافية أولاً" }),
        p1: t({
          en: "Healthcare is one of the most demanding industries for digital design — every interface decision affects how patients access care, how providers manage information, and how trust is built between them.",
          ar: "تُعدّ الرعاية الصحية من أكثر القطاعات تطلّبًا في التصميم الرقمي — فكل قرار تصميمي يؤثر على كيفية وصول المرضى إلى الرعاية، وكيفية إدارة مقدّمي الخدمة للمعلومات، وكيفية بناء الثقة بينهما.",
        }),
        p2: t({
          en: "We work with healthcare and wellness brands to create digital experiences that prioritize clarity above all else. From patient-facing websites and appointment booking systems to wellness brand identities and clinic portals, our approach is grounded in three principles: information hierarchy that respects the user's emotional state, design systems that scale across departments and services, and visual language that communicates competence without coldness.",
          ar: "نعمل مع علامات الرعاية الصحية والعافية لإنشاء تجارب رقمية تُعطي الأولوية للوضوح قبل كل شيء. من المواقع الموجّهة للمرضى وأنظمة حجز المواعيد إلى هويات علامات العافية وبوابات العيادات، يستند نهجنا إلى ثلاثة مبادئ: تسلسل معلوماتي يحترم الحالة النفسية للمستخدم، وأنظمة تصميم قابلة للتوسّع عبر الأقسام والخدمات، ولغة بصرية تنقل الكفاءة دون برود.",
        }),
        p3: t({
          en: "We understand the responsibilities that come with this sector — data sensitivity, accessibility standards, and the need for interfaces that serve patients, families, and practitioners with equal care.",
          ar: "نُدرك المسؤوليات التي يحملها هذا القطاع — حساسية البيانات، ومعايير سهولة الوصول، والحاجة إلى واجهات تخدم المرضى وذويهم والممارسين بعناية متساوية.",
        }),
        p4: t({
          en: "We work with: hospitals, clinics, telemedicine platforms, wellness brands, health-tech startups, and individual practitioners.",
          ar: "نعمل مع: المستشفيات، العيادات، منصات الطب عن بُعد، علامات العافية، شركات التقنية الصحية الناشئة، والممارسين المستقلّين.",
        }),
        link: t({
          en: "Open to healthcare partnerships → am@theaminternational.com",
          ar: "نرحب بشراكات في قطاع الرعاية الصحية ← am@theaminternational.com",
        }),
      },
    },
  },
} satisfies DeclarationContent;

export default successStoriesContent;
