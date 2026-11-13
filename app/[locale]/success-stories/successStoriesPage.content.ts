// app/[locale]/success-stories/successStoriesPage.content.ts
import { t, type DeclarationContent } from "intlayer";

const successStoriesPageContent = {
  key: "successstories-page",
  content: {
    heroTitle: t({
      en: "Our Work",
      ar: "أعمالنا",
    }),
    heroTitle2: t({
      en: "",
      ar: "",
    }),
    heroDescription: t({
      en: "A look at projects we've delivered for clients in the USA, UAE and India.",
      ar: "نظرة على مشاريع قدّمناها لعملاء في الولايات المتحدة والإمارات والهند.",
    }),
    heroButton: t({
      en: "Schedule a Consultation",
      ar: "جدولة استشارة",
    }),
  },
} satisfies DeclarationContent;

export default successStoriesPageContent;
