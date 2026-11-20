import { t } from "intlayer";

const openPositionsContent = {
  key: "careersOpenPositions",
  content: {
    titlePrefix: t({ en: "Open", ar: "وظائف" }),
    titleHighlight: t({ en: "Positions", ar: "متاحة" }),

    subtitle: t({
      en: "Explore opportunities to grow with us",
      ar: "استكشف فرصًا للنمو معنا",
    }),

    loading: t({
      en: "Loading jobs…",
      ar: "جارٍ تحميل الوظائف…",
    }),

    emptyLine1: t({
      en: "No open roles right now. Send your CV to am@theaminternationals.com and we'll be in touch when something opens up.",
      ar: "لا توجد وظائف شاغرة حاليًا. أرسل سيرتك الذاتية إلى am@theaminternationals.com وسنتواصل معك عند توفّر فرصة جديدة.",
    }),

    deptLabel: t({ en: "Dept", ar: "القسم" }),
    locationLabel: t({ en: "Location", ar: "الموقع" }),
    typeLabel: t({ en: "Type", ar: "النوع" }),

    apply: t({ en: "Apply", ar: "قدّم الآن" }),

    loadError: t({
      en: "Unable to load jobs right now.",
      ar: "تعذر تحميل الوظائف حاليًا.",
    }),
  },
};

export default openPositionsContent;
