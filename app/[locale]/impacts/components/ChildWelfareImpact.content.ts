import { t } from "intlayer";

const impactsChildWelfareContent = {
  key: "impactsChildWelfare",
  content: {
    headerTitle: t({
      en: "Supporting Child Welfare with Purpose",
      ar: "دعم رفاهية الأطفال بهدف واضح",
    }),
    headerDescription: t({
      en: "We donate 10% of our profits to children's welfare causes.",
      ar: "نتبرع بنسبة 10% من أرباحنا لقضايا رعاية الأطفال.",
    }),
    // New CSR Content from PDF merged
    csrTitle: t({
      en: "Corporate Social Responsibility",
      ar: "المسؤولية الاجتماعية للمؤسسات",
    }),
    csrDescription: t({
      en: "At The A&M Internationals, we believe that elevating brands also means elevating communities. As we grow, so does our commitment to giving back — through pro bono work for purpose-driven organizations, technology partnerships with educational initiatives, and CSR programs that reflect our values.",
      ar: "في A&M الدولية، نؤمن بأن الارتقاء بالعلامات التجارية يعني أيضًا الارتقاء بالمجتمعات. ومع نمونا، يكبر معنا التزامنا بالعطاء — من خلال المشاريع التطوعية للمؤسسات ذات الرسالة، والشراكات التقنية مع المبادرات التعليمية، وبرامج المسؤولية الاجتماعية التي تعكس قيمنا.",
    }),
    csrPillars: [
      {
        title: t({ en: "Education", ar: "التعليم" }),
        description: t({
          en: "Focusing on education and digital literacy across the regions we serve.",
          ar: "التركيز على التعليم ومحو الأمية الرقمية في المناطق التي نخدمها.",
        }),
      },
      {
        title: t({ en: "Sustainability", ar: "الاستدامة" }),
        description: t({
          en: "Commitment to sustainable growth and long-term community impact.",
          ar: "الالتزام بالنمو المستدام والأثر المجتمعي طويل الأمد.",
        }),
      },
      {
        title: t({ en: "Community", ar: "المجتمع" }),
        description: t({
          en: "Empowering small businesses and supporting purpose-driven organizations.",
          ar: "تمكين الأعمال الصغيرة ودعم المؤسسات ذات الرسالة.",
        }),
      },
    ],
    // Labels for the contribution graph's hover card (WelfareGraph.tsx)
    raised: t({ en: "Raised this month", ar: "المبلغ المجموع هذا الشهر" }),
    cumulative: t({ en: "Cumulative total", ar: "الإجمالي التراكمي" }),
    charitable: t({ en: "Charitable Contribution (10%)", ar: "المساهمة الخيرية (١٠٪)" }),
    getInTouch: t({
      en: "Get in touch: am@theaminternationals.com",
      ar: "تواصلوا معنا: am@theaminternationals.com",
    }),
  },
};

export default impactsChildWelfareContent;
