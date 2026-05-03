import { t } from "intlayer";

const industryCardsContent = {
  key: "industryCards",
  content: {
    heading: t({
      en: "Industries We",
      ar: "الصناعات التي",
    }),
    headingHighlight: t({
      en: "Serve",
      ar: "نخدمها",
    }),
    subheading: t({
      en: "Tailored digital solutions across diverse sectors to drive growth and innovation.",
      ar: "حلول رقمية مخصصة عبر قطاعات متنوعة لتعزيز النمو والابتكار.",
    }),
    items: [
      {
        title: t({ en: "Hospitality", ar: "الضيافة" }),
        description: t({
          en: "Designing seamless digital experiences for hotels and resorts.",
          ar: "تصميم تجارب رقمية سلسة للفنادق والمنتجعات.",
        }),
        icon: "hospitality",
      },
      {
        title: t({ en: "Real Estate", ar: "العقارات" }),
        description: t({
          en: "Creating high-conversion platforms for property businesses.",
          ar: "إنشاء منصات عالية التحويل لشركات العقارات.",
        }),
        icon: "real-estate",
      },
      {
        title: t({ en: "E-Commerce", ar: "التجارة الإلكترونية" }),
        description: t({
          en: "Building scalable and user-friendly online stores.",
          ar: "بناء متاجر إلكترونية قابلة للتوسع وسهلة الاستخدام.",
        }),
        icon: "ecommerce",
      },
      {
        title: t({ en: "Enterprise", ar: "المؤسسات" }),
        description: t({
          en: "Delivering robust solutions for complex business needs.",
          ar: "تقديم حلول قوية لاحتياجات الأعمال المعقدة.",
        }),
        icon: "enterprise",
      },
      {
        title: t({ en: "Service-Based Businesses", ar: "الشركات القائمة على الخدمات" }),
        description: t({
          en: "Helping service brands grow with digital transformation.",
          ar: "مساعدة العلامات التجارية الخدمية على النمو من خلال التحول الرقمي.",
        }),
        icon: "services",
      },
    ],
  },
};

export default industryCardsContent;
