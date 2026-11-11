import { t } from "intlayer";

const financeTransformationWhyChooseUsContent = {
  key: "financeTransformationWhyChooseUs",
  content: {
    titleLine1: t({
      en: "Why Choose",
      ar: "لماذا تختار",
    }),

    titleLine2: t({
      en: "The A&M Internationals?",
      ar: "A&M الدولية؟",
    }),

    features: [
      {
        title: t({
          en: "Senior-led",
          ar: "بقيادة خبراء كبار",
        }),
        description: t({
          en: "Every project is overseen by a consultant with 16 years of Oracle EPM experience.",
          ar: "يشرف على كل مشروع استشاري يمتلك 16 عامًا من الخبرة في Oracle EPM.",
        }),
        highlight: false,
      },
      {
        title: t({
          en: "Technical Excellence",
          ar: "تميز تقني",
        }),
        description: t({
          en: "Deep expertise in enterprise technologies and cutting-edge solutions.",
          ar: "خبرة عميقة في تقنيات المؤسسات والحلول المتقدمة.",
        }),
        highlight: true,
      },
      {
        title: t({
          en: "Social Impact",
          ar: "أثر مجتمعي",
        }),
        description: t({
          en: "We donate a portion of our earnings to trusted orphanages and children's welfare trusts.",
          ar: "نخصص جزءًا من أرباحنا لدعم دور الأيتام الموثوقة وصناديق رعاية الأطفال.",
        }),
        highlight: false,
      },
    ],
  },
};

export default financeTransformationWhyChooseUsContent;
