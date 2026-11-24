// notFound.content.ts
import { t } from "intlayer";

const notFoundContent = {
  key: "notFound",
  content: {
    title: t({ en: "This page could not be found", ar: "تعذّر العثور على هذه الصفحة" }),
    text: t({
      en: "The address may be mistyped, or the page may have moved. Use the links below to get back on track.",
      ar: "قد يكون العنوان مكتوبًا بشكل خاطئ، أو ربما نُقلت الصفحة. استخدم الروابط أدناه للعودة.",
    }),
    home: t({ en: "Back to home", ar: "العودة إلى الرئيسية" }),
    contact: t({ en: "Contact us", ar: "تواصل معنا" }),
  },
};

export default notFoundContent;
