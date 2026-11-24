import { t } from "intlayer";

export const navbarModalContent = {
  key: "navbarModal",
  content: {
    masterclassTitle: t({
      en: "Meet us at GITEX Global 2026 — Dubai, 8–11 Dec",
      ar: "التقِ بنا في جيتكس جلوبال 2026 — دبي، 8–11 ديسمبر",
    }),
    masterclassDateMain: t({
      en: "15 – 18",
      ar: "١٥ – ١٨",
    }),
    masterclassDateSub: t({
      en: "Mar, 26",
      ar: "مارس، ٢٦",
    }),
    masterclassTime: t({
      en: "9 am – 6 pm",
      ar: "٩ صباحًا – ٦ مساءً",
    }),
    masterclassRegisterBtn: t({
      en: "Book a meeting",
      ar: "احجز اجتماعًا",
    }),
    // Internal page (locale prefix added in NavbarModal)
    masterclassRegisterUrl: t({
      en: "/contact#form",
      ar: "/contact#form",
    }),
    signsTitle: t({
      en: "5 Signs Your Business Needs EPM",
      ar: "٥ علامات على أن عملك يحتاج إلى إدارة أداء المؤسسة",
    }),
    signsReadTime: t({
      en: "5 min read",
      ar: "٥ دقائق قراءة",
    }),
    signsReadBtn: t({
      en: "Read Articles",
      ar: "اقرأ المقالات",
    }),
  },
};

export default navbarModalContent;
