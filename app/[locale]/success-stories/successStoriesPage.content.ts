// app/[locale]/success-stories/successStoriesPage.content.ts
import { t, type DeclarationContent } from "intlayer";

const successStoriesPageContent = {
  key: "successstories-page",
  content: {
    heroTitle: t({
      en: "Success Stories That Inspire",
      ar: "قصص نجاح ملهمة",
    }),
    heroTitle2: t({
      en: "",
      ar: "",
    }),
    heroDescription: t({
      en: "Real challenges. Real solutions. Real results. Discover how we've helped organizations across industries achieve measurable transformation.",
      ar: "تحديات حقيقية. حلول حقيقية. نتائج حقيقية. اكتشف كيف ساعدنا المنظمات عبر الصناعات في تحقيق تحول قابل للقياس.",
    }),
    heroButton: t({
      en: "Schedule a Consultation",
      ar: "جدولة استشارة",
    }),
  },
} satisfies DeclarationContent;

export default successStoriesPageContent;
