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
          en: "Crafting guest-first digital journeys that turn every visit into a lasting memory.",
          ar: "صياغة رحلات رقمية تركز على الضيف وتحول كل زيارة إلى ذكرى دائمة.",
        }),
        icon: t({ en: "hospitality", ar: "hospitality" }),
      },
      {
        title: t({ en: "Real Estate", ar: "العقارات" }),
        description: t({
          en: "Building high-performance platforms that bring property visions and architectural dreams to life.",
          ar: "بناء منصات عالية الأداء تجسد رؤى العقارات والأحلام المعمارية على أرض الواقع.",
        }),
        icon: t({ en: "real-estate", ar: "real-estate" }),
      },
      {
        title: t({ en: "E-Commerce", ar: "التجارة الإلكترونية" }),
        description: t({
          en: "Creating frictionless shopping experiences that connect brands with customers across the globe.",
          ar: "إنشاء تجارب تسوق سلسة تربط العلامات التجارية بالعملاء في جميع أنحاء العالم.",
        }),
        icon: t({ en: "ecommerce", ar: "ecommerce" }),
      },
      {
        title: t({ en: "Enterprise", ar: "المؤسسات" }),
        description: t({
          en: "Architecting robust digital systems that empower large-scale operations with precision and ease.",
          ar: "هندسة أنظمة رقمية قوية تمكن العمليات واسعة النطاق بدقة وسهولة.",
        }),
        icon: t({ en: "enterprise", ar: "enterprise" }),
      },
      {
        title: t({ en: "Professional Services", ar: "الخدمات المهنية" }),
        description: t({
          en: "Transforming professional services through elegant design that prioritizes human connection and trust.",
          ar: "تحويل الخدمات المهنية من خلال تصميم أنيق يعطي الأورووية للتواصل الإنساني والثقة.",
        }),
        icon: t({ en: "services", ar: "services" }),
      },
    ],
  },
};

export default industryCardsContent;
