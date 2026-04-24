import { t, type Dictionary } from "intlayer";

const eventRegisterContent = {
  key: "eventRegister",
  content: {
    // Form Title
    registration: t({
      en: "Event Registration",
      ar: "تسجيل الفعالية",
    }),

    // Labels
    fullName: t({
      en: "Full Name",
      ar: "الاسم الكامل",
    }),

    email: t({
      en: "Email Address",
      ar: "البريد الإلكتروني",
    }),

    phone: t({
      en: "Phone Number",
      ar: "رقم الهاتف",
    }),

    optional: t({
      en: "(optional)",
      ar: "(اختياري)",
    }),

    // Placeholders
    namePlaceholder: t({
      en: "Enter your full name",
      ar: "أدخل اسمك الكامل",
    }),

    emailPlaceholder: t({
      en: "Enter your email",
      ar: "أدخل بريدك الإلكتروني",
    }),

    phonePlaceholder: t({
      en: "Enter your phone number",
      ar: "أدخل رقم هاتفك",
    }),

    // Button
    register: t({
      en: "Register",
      ar: "تسجيل",
    }),

    submitting: t({
      en: "Submitting...",
      ar: "جارٍ الإرسال...",
    }),

    // Messages
    requiredError: t({
      en: "Please fill all required fields.",
      ar: "يرجى ملء جميع الحقول المطلوبة.",
    }),

    successMessage: t({
      en: "Registration successful!",
      ar: "تم التسجيل بنجاح!",
    }),

    errorMessage: t({
      en: "Something went wrong. Please try again.",
      ar: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
    }),

    redirecting: t({
      en: "Redirecting...",
      ar: "جارٍ إعادة التوجيه...",
    }),

    loadingEvent: t({
      en: "Loading event details...",
      ar: "جارٍ تحميل تفاصيل الفعالية...",
    }),

    // Event Meta Labels (for Location / Date / Time)
    locationLabel: t({
      en: "Location",
      ar: "الموقع",
    }),

    dateLabel: t({
      en: "Date",
      ar: "التاريخ",
    }),

    timeLabel: t({
      en: "Time",
      ar: "الوقت",
    }),
  },
};

export default eventRegisterContent;
