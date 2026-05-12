import { t } from "intlayer";

const financeTransformationWhyChooseUsContent = {
  key: "financeTransformationWhyChooseUs",
  content: {
    titleLine1: t({
      en: "Why Choose",
      ar: "لماذا تختار",
    }),

    titleLine2: t({
      en: "A&M Internationals?",
      ar: "A&M الدولية؟",
    }),

    features: [
      {
        title: t({
          en: "Proven Track Record",
          ar: "سجل نجاح مثبت",
        }),
        description: t({
          en: "100+ successful implementations across diverse industries and company sizes.",
          ar: "أكثر من 100 تنفيذ ناجح عبر صناعات مختلفة وأحجام شركات متنوعة.",
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
