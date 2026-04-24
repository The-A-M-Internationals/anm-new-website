import { t } from "intlayer";

export const eventsContent = {
  key: "events",
  content: {
    header: t({
      en: "Live & Happening",
      ar: "مباشر وجاري التنفيذ",
    }),
    subHeader: t({
      en: "Discover exciting experiences and industry gatherings planned just for you.",
      ar: "اكتشف تجارب مثيرة وفعاليات صناعية مخطط لها خصيصًا لك.",
    }),
    liveEventLabel: t({
      en: "Live Event",
      ar: "حدث مباشر",
    }),
    noLiveEvents: t({
      en: "No live events.",
      ar: "لا توجد أحداث مباشرة.",
    }),
    upcomingHeader: t({
      en: "Upcoming Events",
      ar: "الأحداث القادمة",
    }),
    viewAll: t({
      en: "View All",
      ar: "عرض الكل",
    }),
    noUpcomingEvents: t({
      en: "No upcoming events.",
      ar: "لا توجد أحداث قادمة.",
    }),
    registerNow: t({
      en: "Register Now",
      ar: "سجل الآن",
    }),
    events: [
      {
        id: "1",
        title: t({
          en: "Industry Summit 2026",
          ar: "قمة الصناعة 2026",
        }),
        description: t({
          en: "Join industry leaders for a day of insights and networking.",
          ar: "انضم إلى قادة الصناعة ليوم من الرؤى والتواصل.",
        }),
        location: t({
          en: "New York City",
          ar: "نيويورك",
        }),
        dateRange: t({
          en: "23-24",
          ar: "23-24",
        }),
        month: t({
          en: "Feb, 26",
          ar: "فبراير، 26",
        }),
        timeRange: t({
          en: "10:00 AM - 5:00 PM",
          ar: "10:00 صباحًا - 5:00 مساءً",
        }),
        imageSrc: "/images/summit.jpg",
      },
      {
        id: "2",
        title: t({
          en: "Tech Expo",
          ar: "معرض التقنية",
        }),
        description: t({
          en: "Explore the latest innovations in technology.",
          ar: "استكشف أحدث الابتكارات في التقنية.",
        }),
        location: t({
          en: "San Francisco",
          ar: "سان فرانسيسكو",
        }),
        dateRange: t({
          en: "28",
          ar: "28",
        }),
        month: t({
          en: "Feb, 26",
          ar: "فبراير، 26",
        }),
        timeRange: t({
          en: "9:00 AM - 4:00 PM",
          ar: "9:00 صباحًا - 4:00 مساءً",
        }),
        imageSrc: "/images/techexpo.jpg",
      },
      // Add more events as needed
    ],
  },
};

export default eventsContent;
