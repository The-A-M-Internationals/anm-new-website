import { t } from "intlayer";

const jobApplyContent = {
  key: "jobApply",
  content: {
    loading: t({
      en: "Loading job details…",
      ar: "جارٍ تحميل تفاصيل الوظيفة…",
    }),
    notFound: t({
      en: "Job not found.",
      ar: "الوظيفة غير موجودة.",
    }),
    loadError: t({
      en: "Failed to load job.",
      ar: "تعذر تحميل الوظيفة.",
    }),
    applyTitle: t({
      en: "Apply for this Position",
      ar: "قدّم لهذه الوظيفة",
    }),
    nameLabel: t({
      en: "Name",
      ar: "الاسم",
    }),
    emailLabel: t({
      en: "Email",
      ar: "البريد الإلكتروني",
    }),
    phoneLabel: t({
      en: "Phone",
      ar: "رقم الهاتف",
    }),
    experienceLabel: t({
      en: "Experience",
      ar: "الخبرة",
    }),
    resumeLabel: t({
      en: "Resume (PDF, max 5MB)",
      ar: "السيرة الذاتية (PDF، بحد أقصى 5MB)",
    }),
    submitButton: t({
      en: "Submit Application",
      ar: "إرسال الطلب",
    }),
    submitting: t({
      en: "Submitting…",
      ar: "جارٍ الإرسال…",
    }),
    success: t({
      en: "Application submitted successfully!",
      ar: "تم إرسال الطلب بنجاح!",
    }),
    formErrorPdf: t({
      en: "Please upload a PDF file",
      ar: "يرجى رفع ملف PDF",
    }),
    formErrorSize: t({
      en: "File size should be less than 5MB",
      ar: "يجب ألا يتجاوز حجم الملف 5MB",
    }),
    formErrorRequired: t({
      en: "All fields are required",
      ar: "جميع الحقول مطلوبة",
    }),
    formErrorSubmit: t({
      en: "Failed to submit application.",
      ar: "تعذر إرسال الطلب.",
    }),
    deptLabel: t({
      en: "Dept",
      ar: "القسم",
    }),
    locationLabel: t({
      en: "Location",
      ar: "الموقع",
    }),
    typeLabel: t({
      en: "Type",
      ar: "النوع",
    }),
    jobDescriptionTitle: t({
      en: "Job Description",
      ar: "وصف الوظيفة",
    }),
  },
};

export default jobApplyContent;
