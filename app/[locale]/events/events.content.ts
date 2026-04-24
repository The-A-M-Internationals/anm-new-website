import { t } from "intlayer";

const eventsContent = {
  key: "eventsPage",
  content: {
    heroTitle: t({
      en: "Events & Workshops",
      ar: "الفعاليات وورش العمل",
    }),
    heroDescription: t({
      en: "Connect with industry leaders, learn from experts, and be part of our social impact initiatives. From technical workshops to community events, there's something for everyone.",
      ar: "تواصل مع قادة الصناعة، وتعلّم من الخبراء، وكن جزءًا من مبادراتنا ذات الأثر المجتمعي. من ورش العمل التقنية إلى الفعاليات المجتمعية، هناك ما يناسب الجميع.",
    }),
    heroButton: t({
      en: "Schedule a Consultation",
      ar: "احجز استشارة",
    }),

    eventsWord: t({
      en: "Events",
      ar: "الفعاليات",
    }),

    upcoming: {
      headingPrefix: t({
        en: "Upcoming",
        ar: "القادمة",
      }),
      subheading: t({
        en: "Register today to secure your spot",
        ar: "سجّل اليوم لتأمين مقعدك",
      }),
      loading: t({
        en: "Loading events...",
        ar: "جارٍ تحميل الفعاليات...",
      }),
      empty: t({
        en: "No upcoming events.",
        ar: "لا توجد فعاليات قادمة.",
      }),
    },

    past: {
      headingPrefix: t({
        en: "Past",
        ar: "السابقة",
      }),
      subheading: t({
        en: "Missed an event? Watch recordings of past sessions",
        ar: "فاتتك فعالية؟ شاهد تسجيلات الجلسات السابقة",
      }),
      loading: t({
        en: "Loading past events...",
        ar: "جارٍ تحميل الفعاليات السابقة...",
      }),
      empty: t({
        en: "No past events available.",
        ar: "لا توجد فعاليات سابقة متاحة.",
      }),
      watchRecording: t({
        en: "Watch Recording",
        ar: "مشاهدة التسجيل",
      }),
    },

    newsletter: {
      heading: t({
        en: "Never Miss an Event",
        ar: "لا تفوّت أي فعالية",
      }),
      description: t({
        en: "Subscribe to our events newsletter and be the first to know about upcoming workshops, webinars, and community gatherings.",
        ar: "اشترك في نشرتنا البريدية للفعاليات وكن أول من يعرف عن ورش العمل والندوات عبر الإنترنت واللقاءات المجتمعية القادمة.",
      }),
      emailPlaceholder: t({
        en: "Enter your email",
        ar: "أدخل بريدك الإلكتروني",
      }),
      subscribeButton: t({
        en: "Subscribe to Event Update",
        ar: "اشترك لتحديثات الفعاليات",
      }),
      subscribingButton: t({
        en: "Subscribing...",
        ar: "جارٍ الاشتراك...",
      }),
      successMessage: t({
        en: "Subscribed successfully!",
        ar: "تم الاشتراك بنجاح!",
      }),
      alreadySubscribedMessage: t({
        en: "You are already subscribed.",
        ar: "أنت مشترك بالفعل.",
      }),
    },
  },
};

export default eventsContent;
