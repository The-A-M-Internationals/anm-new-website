import { t } from "intlayer";

/**
 * EPM Build Agent: the additional sections (A–H of the 23 Nov 2026 content file).
 * English is the supplied copy. The Arabic is a working translation until the final one arrives.
 */
const featuresAgentContent = {
  key: "featuresAgent",
  content: {
    why: {
      title: t({ en: "Why we’re building it", ar: "لماذا نبنيه" }),
      text1: t({
        en: "Every Oracle EPM implementation includes weeks of repetitive build work: creating dimensions and members, setting up forms, writing similar rules, and documenting it all. It’s important work, but it takes time away from the parts that need real expertise: understanding the business and designing the right solution.",
        ar: "يتضمن كل تطبيق لـ Oracle EPM أسابيع من أعمال البناء المتكررة: إنشاء الأبعاد والأعضاء، وإعداد النماذج، وكتابة قواعد متشابهة، وتوثيق ذلك كله. إنه عمل مهم، لكنه يأخذ الوقت من الأجزاء التي تحتاج إلى خبرة حقيقية: فهم الأعمال وتصميم الحل المناسب.",
      }),
      text2: t({
        en: "We’ve spent years doing that work by hand. The EPM Build Agent is our way of handing the repetitive parts to AI, so consultants and finance teams can focus on what matters.",
        ar: "أمضينا سنوات نقوم بهذا العمل يدويًا. وكيل بناء EPM هو طريقتنا في إسناد الأجزاء المتكررة إلى الذكاء الاصطناعي، ليتفرغ المستشارون وفرق المالية لما يهم.",
      }),
    },
    how: {
      title: t({ en: "How it works", ar: "كيف يعمل" }),
      steps: [
        { title: t({ en: "Describe", ar: "صِف" }), text: t({ en: "Tell the agent what you need in plain language, for example a new cost centre hierarchy or a revenue planning form.", ar: "أخبر الوكيل بما تحتاجه بلغة بسيطة، مثل هيكل جديد لمراكز التكلفة أو نموذج لتخطيط الإيرادات." }) },
        { title: t({ en: "Plan", ar: "خطِّط" }), text: t({ en: "The agent turns your request into a clear, step-by-step Oracle EPM build plan for you to review.", ar: "يحوّل الوكيل طلبك إلى خطة بناء واضحة في Oracle EPM، خطوة بخطوة، لتراجعها." }) },
        { title: t({ en: "Build", ar: "ابنِ" }), text: t({ en: "Once you approve the plan, the agent builds it in your Oracle EPM test environment.", ar: "بعد موافقتك على الخطة، يبنيها الوكيل في بيئة الاختبار الخاصة بك في Oracle EPM." }) },
        { title: t({ en: "Check and record", ar: "تحقَّق ووثِّق" }), text: t({ en: "The agent checks the build against the plan, flags any gaps, and records every change for handover.", ar: "يتحقق الوكيل من البناء مقارنةً بالخطة، وينبّه إلى أي فجوات، ويسجّل كل تغيير للتسليم." }) },
      ],
    },
    control: {
      title: t({ en: "You stay in control", ar: "التحكم يبقى بيدك" }),
      cards: [
        { title: t({ en: "Nothing changes without approval", ar: "لا شيء يتغير دون موافقة" }), text: t({ en: "The agent shows its plan first. Nothing is built until a person reviews and approves it.", ar: "يعرض الوكيل خطته أولًا. لا يُبنى شيء حتى يراجعه شخص ويوافق عليه." }) },
        { title: t({ en: "Test environment first", ar: "بيئة الاختبار أولًا" }), text: t({ en: "Builds happen in your test environment, so you can check everything before it goes anywhere near production.", ar: "يتم البناء في بيئة الاختبار لديك، لتتحقق من كل شيء قبل أن يقترب من بيئة الإنتاج." }) },
        { title: t({ en: "Your data stays on Oracle", ar: "بياناتك تبقى على Oracle" }), text: t({ en: "The agent runs on Oracle Cloud Infrastructure with OCI Generative AI, so your data doesn’t leave Oracle.", ar: "يعمل الوكيل على Oracle Cloud Infrastructure مع OCI Generative AI، فلا تغادر بياناتك Oracle." }) },
      ],
    },
    starting: {
      title: t({ en: "Where we’re starting", ar: "من أين نبدأ" }),
      text: t({ en: "We’re starting with the Oracle EPM modules our team knows best.", ar: "نبدأ بوحدات Oracle EPM التي يعرفها فريقنا أكثر من غيرها." }),
      modules: [
        { name: t({ en: "Oracle EPM Planning", ar: "Oracle EPM Planning" }), status: t({ en: "First", ar: "أولًا" }) },
        { name: t({ en: "Financial Consolidation and Close", ar: "Financial Consolidation and Close" }), status: t({ en: "Next", ar: "التالي" }) },
        { name: t({ en: "Other EPM modules", ar: "وحدات EPM الأخرى" }), status: t({ en: "Later, based on early-access feedback", ar: "لاحقًا، بناءً على ملاحظات الوصول المبكر" }) },
      ],
    },
    audience: {
      title: t({ en: "Who it’s for", ar: "لمن هو" }),
      cards: [
        { title: t({ en: "EPM consultants and partners", ar: "مستشارو EPM والشركاء" }), text: t({ en: "Deliver builds faster and spend more time on design and client conversations.", ar: "سلِّم أعمال البناء أسرع واقضِ وقتًا أطول في التصميم والحوار مع العملاء." }) },
        { title: t({ en: "Finance teams with in-house EPM admins", ar: "فرق المالية التي لديها مسؤولو EPM داخليون" }), text: t({ en: "Make routine changes such as new members, forms and hierarchies without waiting weeks for outside help.", ar: "نفِّذ التغييرات الروتينية مثل الأعضاء والنماذج والهياكل الجديدة دون انتظار أسابيع لمساعدة خارجية." }) },
        { title: t({ en: "Organisations starting with Oracle EPM", ar: "المؤسسات التي تبدأ مع Oracle EPM" }), text: t({ en: "Get a well-documented build from day one, which is easier to support and extend later.", ar: "احصل على بناء موثَّق جيدًا من اليوم الأول، يسهل دعمه وتوسيعه لاحقًا." }) },
      ],
    },
    roadmap: {
      title: t({ en: "Roadmap", ar: "خارطة الطريق" }),
      current: t({ en: "Current", ar: "الحالية" }),
      stages: [
        { title: t({ en: "Research and prototype", ar: "البحث والنموذج الأولي" }), when: t({ en: "Oct–Nov 2026", ar: "أكتوبر–نوفمبر 2026" }), text: t({ en: "Designing the agent and testing it on real Oracle EPM build tasks.", ar: "تصميم الوكيل واختباره على مهام بناء حقيقية في Oracle EPM." }) },
        { title: t({ en: "First preview", ar: "العرض الأول" }), when: t({ en: "Dec 2026", ar: "ديسمبر 2026" }), text: t({ en: "Preview at GITEX Global 2026, Dubai.", ar: "عرض أولي في GITEX Global 2026، دبي." }) },
        { title: t({ en: "Early access", ar: "الوصول المبكر" }), when: t({ en: "Next", ar: "التالي" }), text: t({ en: "Pilots with a small group of early-access users and partners.", ar: "تجارب مع مجموعة صغيرة من مستخدمي الوصول المبكر والشركاء." }) },
        { title: t({ en: "Wider release", ar: "الإصدار الأوسع" }), when: t({ en: "Later", ar: "لاحقًا" }), text: t({ en: "Opening up to more teams, with more EPM modules.", ar: "الانفتاح على فرق أكثر، مع وحدات EPM إضافية." }) },
      ],
    },
    builtBy: {
      title: t({ en: "Built by people who do this work", ar: "يبنيه من يمارسون هذا العمل" }),
      text: t({
        en: "The EPM Build Agent is designed by The A&M Internationals, an Oracle Partner whose senior team has 16 years of hands-on Oracle EPM experience. Our consultants, designers and developers are building it together, testing it against the same build tasks we deliver for clients.",
        ar: "وكيل بناء EPM من تصميم A&M الدولية، شريك Oracle الذي يملك فريقه القيادي 16 عامًا من الخبرة العملية في Oracle EPM. مستشارونا ومصممونا ومطورونا يبنونه معًا، ويختبرونه على مهام البناء نفسها التي نسلّمها لعملائنا.",
      }),
      badge: t({ en: "Oracle PartnerNetwork Member", ar: "عضو في Oracle PartnerNetwork" }),
    },
    faq: {
      title: t({ en: "Questions about the EPM Build Agent", ar: "أسئلة حول وكيل بناء EPM" }),
      items: [
        { q: t({ en: "Is the EPM Build Agent available now?", ar: "هل وكيل بناء EPM متاح الآن؟" }), a: t({ en: "Not yet. It’s in development, with a first preview at GITEX Global 2026. Join early access to be among the first to try it.", ar: "ليس بعد. هو قيد التطوير، مع عرض أول في GITEX Global 2026. انضم إلى الوصول المبكر لتكون من أوائل من يجرّبه." }) },
        { q: t({ en: "Will it replace EPM consultants?", ar: "هل سيحل محل مستشاري EPM؟" }), a: t({ en: "No. It takes on repetitive build work, so consultants can spend more time on design, business understanding and client conversations. A person reviews and approves everything it builds.", ar: "لا. يتولى أعمال البناء المتكررة، ليقضي المستشارون وقتًا أطول في التصميم وفهم الأعمال والحوار مع العملاء. يراجع شخص كل ما يبنيه ويوافق عليه." }) },
        { q: t({ en: "Where does my data go?", ar: "أين تذهب بياناتي؟" }), a: t({ en: "The agent runs on Oracle Cloud Infrastructure with OCI Generative AI, so your data stays on Oracle.", ar: "يعمل الوكيل على Oracle Cloud Infrastructure مع OCI Generative AI، فتبقى بياناتك على Oracle." }) },
        { q: t({ en: "Which Oracle EPM modules will it support?", ar: "ما وحدات Oracle EPM التي سيدعمها؟" }), a: t({ en: "We’re starting with Oracle EPM Planning, then Financial Consolidation and Close. More modules will follow based on early-access feedback.", ar: "نبدأ بـ Oracle EPM Planning، ثم Financial Consolidation and Close. وستتبعها وحدات أخرى بناءً على ملاحظات الوصول المبكر." }) },
        { q: t({ en: "Does it work directly in my production environment?", ar: "هل يعمل مباشرة في بيئة الإنتاج لدي؟" }), a: t({ en: "No. It builds in your test environment first, so you can check everything before moving it to production.", ar: "لا. يبني في بيئة الاختبار أولًا، لتتحقق من كل شيء قبل نقله إلى الإنتاج." }) },
        { q: t({ en: "How do I join early access?", ar: "كيف أنضم إلى الوصول المبكر؟" }), a: t({ en: "Fill in the form below and we’ll contact you as soon as previews open.", ar: "املأ النموذج أدناه وسنتواصل معك فور فتح العروض الأولية." }) },
        { q: t({ en: "How much will it cost?", ar: "كم ستكون التكلفة؟" }), a: t({ en: "Pricing will be shared with early-access users. Early access itself is free.", ar: "ستُشارك الأسعار مع مستخدمي الوصول المبكر. الوصول المبكر نفسه مجاني." }) },
      ],
    },
  },
};

export default featuresAgentContent;
