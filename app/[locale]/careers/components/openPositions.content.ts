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
      en: "No current openings — but great things are coming soon.",
      ar: "لا توجد وظائف متاحة حاليًا — لكن القادم أفضل قريبًا.",
    }),

    emptyLine2: t({
      en: "Subscribe to stay updated on future roles and opportunities!",
      ar: "اشترك لتبقى على اطلاع بالفرص والأدوار القادمة!",
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
