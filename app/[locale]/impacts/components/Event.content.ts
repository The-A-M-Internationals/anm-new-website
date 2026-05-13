import { t } from "intlayer";

const impactsEventContent = {
  key: "impactsEvent",
  content: {
    badge: t({ en: "CSR Events", ar: "فعاليات المسؤولية الاجتماعية" }),
    title: t({
      en: "Children's Education Fundraiser Gala",
      ar: "حفل جمع التبرعات لتعليم الأطفال",
    }),
    description: t({
      en: "Annual fundraising gala supporting our partner orphanages. An evening of impact stories, performances, and community building.",
      ar: "حفل سنوي لجمع التبرعات لدعم دور الأيتام الشريكة. أمسية من قصص الأثر والعروض وبناء المجتمع.",
    }),
    seats: t({ en: "150 seats available", ar: "١٥٠ مقعد متاح" }),
    month: t({ en: "Oct", ar: "أكتوبر" }),
    day: t({ en: "27", ar: "٢٧" }),
    eventYear: t({ en: "26", ar: "٢٦" }),
    time: t({ en: "9 am - 6 pm", ar: "٩ صباحاً - ٦ مساءً" }),
    button: t({ en: "Get Tickets", ar: "احجز تذكرتك" }),
  },
};

export default impactsEventContent;
