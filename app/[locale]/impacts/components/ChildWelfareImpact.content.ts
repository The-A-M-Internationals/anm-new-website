import { t } from "intlayer";

const impactsChildWelfareContent = {
  key: "impactsChildWelfare",
  content: {
    headerTitle: t({
      en: "Supporting Child Welfare with Purpose",
      ar: "دعم رفاهية الأطفال بهدف واضح",
    }),
    headerDescription: t({
      en: "We contribute a portion of our revenue to trusted child-welfare trusts and orphanages, ensuring that our success helps fund education, healthcare, and essential care for children in need.",
      ar: "نخصص جزءًا من إيراداتنا لصالح صناديق رعاية الأطفال ودور الأيتام الموثوقة، لضمان أن نجاحنا يساهم في تمويل التعليم والرعاية الصحية والرعاية الأساسية للأطفال المحتاجين.",
    }),
    stats: [
      {
        value: t({ en: "₹15M+", ar: "١٥ مليون+ روبية" }),
        title: t({ en: "Impact Contributions", ar: "مساهمات الأثر" }),
        description: t({
          en: "Funds donated to vetted partners to support long-term programs in education, health, and shelter.",
          ar: "تم التبرع بالأموال لشركاء موثوقين لدعم برامج طويلة الأمد في التعليم والصحة والمأوى.",
        }),
      },
      {
        value: t({ en: "5,000+", ar: "٥٬٠٠٠+" }),
        title: t({ en: "Children Supported", ar: "الأطفال المدعومون" }),
        description: t({
          en: "Lives positively impacted through our partnerships access to learning, nutrition, and care.",
          ar: "حياة تأثرت إيجابياً من خلال شراكاتنا التي توفر التعليم والتغذية والرعاية.",
        }),
      },
      {
        value: t({ en: "25", ar: "٢٥" }),
        title: t({
          en: "Verified NGO Partners",
          ar: "شركاء منظمات غير حكومية موثوقون",
        }),
        description: t({
          en: "Collaborations with carefully vetted trusts and organisations committed to child welfare.",
          ar: "تعاون مع صناديق ومنظمات تم التحقق منها بعناية وملتزمة برفاهية الأطفال.",
        }),
      },
    ],
  },
};

export default impactsChildWelfareContent;
