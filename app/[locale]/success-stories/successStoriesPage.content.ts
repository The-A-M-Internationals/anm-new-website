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
      en: "Real projects we’ve delivered, and the Oracle EPM experience our team brings to every client.",
      ar: "مشاريع حقيقية أنجزناها، وخبرة Oracle EPM التي يقدّمها فريقنا لكل عميل.",
    }),
    heroButton: t({
      en: "Schedule a Consultation",
      ar: "جدولة استشارة",
    }),
  },
} satisfies DeclarationContent;

export default successStoriesPageContent;
