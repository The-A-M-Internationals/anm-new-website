import { t } from "intlayer";

const impactsDashboardContent = {
  key: "drivingimpactsDashboard",
  content: {
    header: t({
      en: "Our Impact",
      ar: "أثرنا",
    }),
    subheader: t({
      en: "Real work, and giving back as we grow.",
      ar: "عمل حقيقي، وعطاء يكبر مع نمونا.",
    }),
    intro1: t({
      en: "At The A&M Internationals, every number tells a story — of a client trusted, a vision delivered, and a brand elevated. From boutique hospitality brands to enterprise solutions, our work spans continents, industries, and ambitions — serving clients across India, the UAE, and the United States.",
      ar: "في A&M الدولية، كل رقم يروي قصة — قصة عميل وثق بنا، ورؤية تحققت، وعلامة تجارية ارتقت. من علامات الضيافة البوتيكية إلى الحلول المؤسسية، يمتد عملنا عبر القارات والقطاعات والطموحات — خدمةً لعملائنا في الهند والإمارات العربية المتحدة والولايات المتحدة الأمريكية.",
    }),
    intro2: t({
      en: "We measure our success not just in projects completed, but in the lasting partnerships we build and the impact we create globally. The figures below reflect our journey so far — and we're just getting started.",
      ar: "نقيس نجاحنا ليس فقط بعدد المشاريع المُنجزة، بل بالشراكات الدائمة التي نبنيها والأثر العالمي الذي نصنعه. الأرقام أدناه تعكس رحلتنا حتى الآن — ونحن في البداية فقط.",
    }),
    // Clients (26+), Projects (40+) and Industries (8+) counters are hidden
    // until the numbers are confirmed; re-add them here when they are.
    stats: [
      {
        label: t({ en: "Countries Reached", ar: "الدول التي وصلنا إليها" }),
        value: t({ en: "3 (UAE, India, USA)", ar: "٣ (الإمارات، الهند، الولايات المتحدة)" }),
      },
      {
        label: t({ en: "Team Members", ar: "أعضاء الفريق" }),
        value: t({ en: "8", ar: "٨" }),
      },
    ],
  },
};

export default impactsDashboardContent;
