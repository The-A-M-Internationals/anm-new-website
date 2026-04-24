// aboutUs.content.ts
import { t } from "intlayer";

const aboutUsContent = {
  key: "aboutUs",
  content: {
    titleBefore: t({
      en: "About",
      ar: "معلومات",
    }),

    titleHighlight: t({
      en: "Us",
      ar: "عنا",
    }),

    tagline: t({
      en: "We're the engineers behind businesses that scale with confidence.",
      ar: "نحن المهندسون الذين يقفون وراء الشركات التي تنمو بثقة.",
    }),

    paragraph1: t({
      en: "Our team of passionate cloud architects, solution experts, and AI specialists brings deep, hands-on experience in building secure, high-performance, and future-ready digital systems.",
      ar: "يضم فريقنا مهندسي سحابة متحمسين وخبراء حلول ومتخصصي ذكاء اصطناعي يتمتعون بخبرة عملية عميقة في بناء أنظمة رقمية آمنة وعالية الأداء وجاهزة للمستقبل.",
    }),

    paragraph2: t({
      en: "We're more than consultants — we are partners who work alongside your team to streamline delivery workflows, enhance operational efficiency, and accelerate digital transformation.",
      ar: "نحن أكثر من مجرد مستشارين — نحن شركاء نعمل جنبًا إلى جنب مع فريقك لتبسيط سير العمل، وتعزيز الكفاءة التشغيلية، وتسريع التحول الرقمي.",
    }),

    cta: t({
      en: "Explore more",
      ar: "اكتشف المزيد",
    }),
  },
};

export default aboutUsContent;
