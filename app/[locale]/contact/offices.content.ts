import { t } from "intlayer";

const officesContent = {
  key: "offices",
  content: {
    titlePrefix: t({
      en: "Our",
      ar: "مكاتب",
    }),
    titleHighlight: t({
      en: "Offices",
      ar: "نا",
    }),
    subtitle: t({
      en: "Visit us at any of the locations listed below.",
      ar: "زورونا في أي من المواقع المدرجة أدناه.",
    }),

    getDirection: t({
      en: "Get Direction",
      ar: "الحصول على الاتجاهات",
    }),

    dubaiLocation: t({
      en: "Dubai",
      ar: "دبي",
    }),
    dubaiAddress: t({
      en: "Office - C1 - 1F - SF6017, Ajman Free Zone C1 Building, Ajman Free Zone",
      ar: "مكتب - C1 - 1F - SF6017، مبنى المنطقة الحرة بعجمان C1، المنطقة الحرة بعجمان",
    }),

    indiaLocation: t({
      en: "India",
      ar: "الهند",
    }),
    indiaAddress: t({
      en: "G5, Dreamscape towers, plot no. 679/A & 681, 5th main, OMBR layout, Bangalore 560043.",
      ar: "G5، أبراج دريم سكيب، قطعة رقم 679/A و681، الشارع الرئيسي الخامس، مخطط OMBR، بنغالور 560043.",
    }),

    usaLocation: t({
      en: "United States of America",
      ar: "الولايات المتحدة الأمريكية",
    }),
    usaAddress: t({
      en: "8736 Outlets Blvd, Charlotte, NC 28278",
      ar: "8736 Outlets Blvd, Charlotte, NC 28278",
    }),
  },
};

export default officesContent;
