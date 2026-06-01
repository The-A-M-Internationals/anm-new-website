import { t } from "intlayer";

const faqContent = {
  key: "faq",
  content: {
    title: t({
      en: "Frequently Asked Questions",
      ar: "الأسئلة الشائعة",
    }),
    subheading: t({
      en: "Everything you need to know before reaching out.",
      ar: "كل ما تحتاج معرفته قبل التواصل معنا.",
    }),

    faq1Question: t({
      en: "1. WHAT SERVICES DOES THE A&M INTERNATIONALS OFFER?",
      ar: "١. ما الخدمات التي تقدّمها A&M الدولية؟",
    }),
    faq1Answer: t({
      en: "We offer four core services: Digital Marketing, UI/UX Design, Web Development, and Enterprise Performance Management (EPM). Most of our engagements combine two or more of these — for example, a brand might come to us for a website redesign and stay on for ongoing digital marketing. We work as an integrated team rather than siloed departments, which means your project benefits from every discipline working together from day one.",
      ar: "نقدّم أربع خدمات أساسية: التسويق الرقمي، تصميم تجربة المستخدم، تطوير المواقع، وإدارة الأداء المؤسسي (EPM). معظم تعاملاتنا تجمع بين خدمتين أو أكثر — على سبيل المثال، قد تأتي علامة تجارية لإعادة تصميم موقعها، ثم تستمر معنا في التسويق الرقمي. نعمل كفريق متكامل لا كأقسام منفصلة، مما يعني أن مشروعك يستفيد من كل التخصصات معًا منذ اليوم الأول.",
    }),

    faq2Question: t({
      en: "2. WHICH REGIONS AND INDUSTRIES DO YOU WORK WITH?",
      ar: "٢. ما المناطق والقطاعات التي تعملون معها؟",
    }),
    faq2Answer: t({
      en: "We work with clients across India, the UAE, and the United States, with a growing presence in the wider GCC. Our work spans hospitality, food and agriculture, entertainment, public sector, and enterprise services — and we're actively expanding into healthcare, insurance, and automotive. If you're in a region or industry we haven't listed, reach out anyway. We're selective about who we partner with, but open to the right opportunities anywhere.",
      ar: "نعمل مع عملاء في الهند والإمارات العربية المتحدة والولايات المتحدة الأمريكية، مع حضور متنامٍ في منطقة الخليج. تمتد أعمالنا عبر قطاعات الضيافة، الأغذية والزراعة، الترفيه، القطاع العام، وخدمات المؤسسات — ونتوسّع حاليًا في قطاعات الرعاية الصحية والتأمين والسيارات. إذا كنت في منطقة أو قطاع لم نذكره، تواصل معنا على أي حال. نحن انتقائيون فيمن نعمل معهم، لكننا منفتحون على الفرص المناسبة أينما كانت.",
    }),

    faq3Question: t({
      en: "3. HOW DO I GET STARTED WITH A PROJECT?",
      ar: "٣. كيف أبدأ مشروعًا معكم؟",
    }),
    answer: t({
      en: "The simplest way is to send us a message through our contact form or email us directly at am@theaminternationals.com. We'll schedule a discovery call within one business day to understand your goals, timeline, and budget. From there, we share a tailored proposal with scope, deliverables, and pricing — usually within 3–5 working days. No upfront commitment is needed until you're ready to move forward.",
      ar: "أبسط طريقة هي إرسال رسالة عبر نموذج التواصل أو البريد الإلكتروني am@theaminternationals.com. سنُحدّد مكالمة تعارف خلال يوم عمل واحد لفهم أهدافك وجدولك الزمني وميزانيتك. بعد ذلك، نُقدّم لك عرضًا مُخصّصًا يشمل النطاق والتسليمات والتسعير — عادةً خلال ٣ إلى ٥ أيام عمل. لا يوجد التزام مُسبق حتى تكون مستعدًا للمضيّ قدمًا.",
    }),

    faq4Question: t({
      en: "4. HOW IS PRICING STRUCTURED?",
      ar: "٤. كيف يتم تحديد التسعير؟",
    }),
    faq4Answer: t({
      en: "Our pricing depends on project scope, complexity, and timeline — we don't believe in one-size-fits-all packages. For most engagements, we offer a fixed project fee for clearly defined deliverables, and a retainer model for ongoing work like marketing, support, or design partnerships. We're transparent about pricing from the first conversation, and every proposal includes a clear breakdown so you know exactly what you're paying for.",
      ar: "يعتمد تسعيرنا على نطاق المشروع، تعقيده، وجدوله الزمني — نحن لا نؤمن بالباقات الجاهزة الموحّدة. لمعظم المشاريع، نقدّم رسومًا ثابتة للتسليمات المحدّدة بوضوح، ونموذج عقد شهري للأعمال المستمرة كالتسويق والدعم وشراكات التصميم. نحن شفّافون بشأن التسعير منذ المحادثة الأولى، وكل عرض يتضمّن تفصيلاً واضحًا لتعرف بالضبط ما الذي تدفع مقابله.",
    }),

    faq5Question: t({
      en: "5. HOW LONG DOES A TYPICAL PROJECT TAKE?",
      ar: "٥. كم يستغرق المشروع عادةً؟",
    }),
    faq5Answer: t({
      en: "Timelines vary by scope, but here are general ranges: a focused website redesign takes 4–6 weeks, a complete brand and digital build takes 8–12 weeks, and EPM or custom platform engagements run 3–6 months. We share a detailed timeline as part of every proposal and provide weekly updates throughout the project so you always know where things stand.",
      ar: "تتفاوت الجداول الزمنية حسب النطاق، وإليك الأطر العامة: إعادة تصميم موقع تستغرق من ٤ إلى ٦ أسابيع، البناء الكامل للهوية والمنصة الرقمية يستغرق من ٨ إلى ١٢ أسبوعًا، ومشاريع EPM أو المنصات المخصّصة تمتد من ٣ إلى ٦ أشهر. نُشارك جدولاً زمنيًا تفصيليًا في كل عرض، ونُقدّم تحديثات أسبوعية طوال المشروع لتعرف موقع الأمور دائمًا.",
    }),

    faq6Question: t({
      en: "6. DO YOU OFFER ONGOING SUPPORT AFTER A PROJECT IS DELIVERED?",
      ar: "٦. هل تقدّمون دعمًا مستمرًا بعد تسليم المشروع؟",
    }),
    faq6Answer: t({
      en: "Yes. Most of our clients continue with us through monthly support and growth retainers — covering everything from website maintenance and security updates to design iterations, marketing optimization, and new feature development. We treat launch as a starting point, not a finish line, and our retention reflects that approach.",
      ar: "نعم. معظم عملائنا يستمرون معنا عبر عقود دعم ونمو شهرية — تشمل صيانة المواقع، تحديثات الأمان، تحسينات التصميم، تطوير التسويق، وإضافة ميزات جديدة. نتعامل مع الإطلاق كنقطة بداية لا كخط نهاية، ومعدّل احتفاظنا بالعملاء يعكس هذا النهج.",
    }),

    faq7Question: t({
      en: "7. CAN YOU WORK WITH OUR EXISTING BRAND, WEBSITE, OR SYSTEMS?",
      ar: "٧. هل يمكنكم العمل على هويتنا أو موقعنا أو أنظمتنا الحالية؟",
    }),
    faq7Answer: t({
      en: "Absolutely. We're often brought in to refine, extend, or scale existing work rather than rebuild from scratch. Whether it's a website that needs to evolve, a brand that needs sharpening, or internal systems that need modernization, we adapt our approach to what's already in place — and we're always honest about when a fresh start would serve you better than an extension.",
      ar: "بالتأكيد. كثيرًا ما نُستدعى لتحسين أو توسيع أو تطوير أعمال قائمة بدلاً من إعادة البناء من الصفر. سواء كان موقعًا يحتاج إلى تطوّر، أو هوية تحتاج إلى صقل، أو أنظمة داخلية تحتاج إلى تحديث، نُكيّف نهجنا مع ما هو موجود — ونكون دائمًا صادقين معك إذا كانت البداية الجديدة ستخدمك أفضل من التوسعة.",
    }),

    faq8Question: t({
      en: "8. HOW DO I KNOW IF THE A&M INTERNATIONALS IS THE RIGHT FIT FOR MY BRAND?",
      ar: "٨. كيف أعرف إن كانت A&M الدولية مناسبة لعلامتي التجارية؟",
    }),
    faq8Answer: t({
      en: "The honest answer: a 15-minute discovery call will tell both of us more than any FAQ can. We're not the right partner for every brand, and we'd rather have that conversation early than oversell. If you're looking for a team that values craft over volume, prioritizes long-term partnerships, and treats your brand with the care it deserves — there's a good chance we'll work well together.",
      ar: "الإجابة الصادقة: مكالمة تعارف لمدة ١٥ دقيقة ستُخبرنا بأكثر مما يمكن لأي قسم أسئلة شائعة أن يُخبره. لسنا الشريك المناسب لكل علامة تجارية، ونُفضّل أن نُجري تلك المحادثة مبكرًا بدلاً من المبالغة في الترويج. إذا كنت تبحث عن فريق يُقدّر الحرفية على الكمّ، ويُولي الأولوية للشراكات طويلة الأمد، ويعامل علامتك بالعناية التي تستحقّها — فثَمّة احتمال كبير أن نعمل معًا بشكل جيد.",
    }),

    joinTitle: t({
      en: "Join Our Team",
      ar: "انضم إلى فريقنا",
    }),
    joinDescription: t({
      en: "Interested in working with us? We're always looking for talented individuals who share our values.",
      ar: "هل ترغب في العمل معنا؟ نحن دائمًا نبحث عن أشخاص موهوبين يشاركوننا قيمنا.",
    }),
    joinButton: t({
      en: "View opening positions",
      ar: "عرض الوظائف المتاحة",
    }),
  },
};

export default faqContent;
