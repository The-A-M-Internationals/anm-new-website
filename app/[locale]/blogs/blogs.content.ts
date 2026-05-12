import { t } from "intlayer";

const blogsContent = {
  key: "blogsPage",
  content: {
    heroTitle: t({
      en: "The A&M internationals Blog",
      ar: "مدونة A&M الدولية",
    }),

    heroDescription: t({
      en: "Industry insights, technical guides, and stories of impact from our team of experts",
      ar: "رؤى صناعية وأدلة تقنية وقصص أثر من فريق خبرائنا",
    }),

    heroButton: t({
      en: "Schedule a Consultation",
      ar: "احجز استشارة",
    }),
  },
};

export default blogsContent;
