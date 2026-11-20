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
      en: "Our main service is Oracle EPM: implementation, managed support and EPM staffing. We also offer website design and build, UI/UX design and digital marketing.",
      ar: "خدمتنا الرئيسية هي Oracle EPM: التطبيق، والدعم المُدار، وتوفير كوادر EPM. كما نقدّم تصميم المواقع وتطويرها، وتصميم تجربة وواجهة المستخدم، والتسويق الرقمي.",
    }),

    faq2Question: t({
      en: "2. WHICH REGIONS AND INDUSTRIES DO YOU WORK WITH?",
      ar: "٢. ما المناطق والقطاعات التي تعملون معها؟",
    }),
    faq2Answer: t({
      en: "We work with clients in the USA, the UAE and India, and are growing across the GCC. Our Oracle EPM work covers automotive, manufacturing and healthcare, and our approach applies equally to retail, financial services, energy and other industries with complex planning, close and reporting needs.",
      ar: "نعمل مع عملاء في الولايات المتحدة والإمارات العربية المتحدة والهند، ونتوسّع في أنحاء دول الخليج العربي. تشمل أعمالنا في Oracle EPM قطاعات السيارات والتصنيع والرعاية الصحية، ويُطبَّق نهجنا بالقدر نفسه على قطاعات التجزئة والخدمات المالية والطاقة وغيرها من القطاعات ذات الاحتياجات المعقّدة في التخطيط والإقفال المالي وإعداد التقارير.",
    }),

    faq3Question: t({
      en: "3. HOW DO I GET STARTED WITH A PROJECT?",
      ar: "٣. كيف أبدأ مشروعًا معكم؟",
    }),
    faq3Answer: t({
      en: "Send us a message through the form or email am@theaminternationals.com. We'll set up a discovery call within one business day to understand your goals and timeline, then share a tailored proposal with scope and pricing within 3–5 working days. No commitment is needed until you're ready.",
      ar: "أرسل لنا رسالة عبر النموذج أو عبر البريد الإلكتروني am@theaminternationals.com. سنُحدّد مكالمة تعارف خلال يوم عمل واحد لفهم أهدافك وجدولك الزمني، ثم نُقدّم لك عرضًا مُخصّصًا يشمل النطاق والتسعير خلال ٣ إلى ٥ أيام عمل. لا حاجة لأي التزام حتى تكون مستعدًا.",
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
      en: "Most Oracle EPM implementations take 3–6 months, depending on the modules and scope. Support engagements and smaller enhancements can start within a couple of weeks. Every proposal includes a detailed timeline, and we share weekly updates throughout the project.",
      ar: "تستغرق معظم مشاريع تطبيق Oracle EPM من ٣ إلى ٦ أشهر، بحسب الوحدات والنطاق. ويمكن أن تبدأ خدمات الدعم والتحسينات الأصغر خلال أسبوعين تقريبًا. يتضمّن كل عرض جدولاً زمنيًا تفصيليًا، ونُشارك تحديثات أسبوعية طوال المشروع.",
    }),

    faq6Question: t({
      en: "6. DO YOU OFFER ONGOING SUPPORT AFTER A PROJECT IS DELIVERED?",
      ar: "٦. هل تقدّمون دعمًا مستمرًا بعد تسليم المشروع؟",
    }),
    faq6Answer: t({
      en: "Yes — through monthly support plans for Oracle EPM and websites.",
      ar: "نعم — من خلال خطط دعم شهرية لأنظمة Oracle EPM والمواقع الإلكترونية.",
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

    faq9Question: t({
      en: "9. ARE YOU AN ORACLE PARTNER?",
      ar: "٩. هل أنتم شريك لـ Oracle؟",
    }),
    faq9Answer: t({
      en: "Yes, we're a member of the Oracle PartnerNetwork.",
      ar: "نعم، نحن عضو في Oracle PartnerNetwork.",
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
