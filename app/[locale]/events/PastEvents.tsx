"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebaseConfig";
import { useIntlayer, useLocale } from "next-intlayer";

interface EventType {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  dateRange: string;
  month: string;
  monthAr?: string;
  externalLink: string;
}

const ITEMS_PER_PAGE = 2;

const PastEvents: React.FC = () => {
  const content = useIntlayer("eventsPage");
  const { locale } = useLocale();
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchPastEvents = async () => {
      setLoading(true);
      setPage(0);
      try {
        const snapshot = await getDocs(collection(db, "events"));

        const isArabic = locale?.toLowerCase().startsWith("ar");

        const parseEventEndDate = (dateRange: string, month: string): Date | null => {
          const days = dateRange.match(/\d{1,2}/g);
          if (!days || days.length === 0) return null;

          const endDay = days[days.length - 1];
          const [mon, yr] = month.split(",");
          const year = `20${yr.trim()}`;

          const endDate = new Date(`${mon} ${endDay}, ${year}`);
          endDate.setHours(23, 59, 59, 999);
          return endDate;
        };

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const pastEvents: EventType[] = snapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title ?? "",
              titleAr: data.titleAr,
              description: data.description ?? "",
              descriptionAr: data.descriptionAr,
              dateRange: data.dateRange ?? "",
              month: data.month ?? "",
              monthAr: data.monthAr,
              externalLink: data.externalLink ?? "",
            };
          })
          .filter((event) => {
            const endDate = parseEventEndDate(event.dateRange, event.month);
            return endDate !== null && endDate < today;
          })
          .sort((a, b) => {
            const d1 = parseEventEndDate(a.dateRange, a.month);
            const d2 = parseEventEndDate(b.dateRange, b.month);
            return (d2?.getTime() ?? 0) - (d1?.getTime() ?? 0);
          });

        const localizedEvents = pastEvents.map((event) => {
          if (!isArabic) {
            return {
              id: event.id,
              title: event.title,
              description: event.description,
              dateRange: event.dateRange,
              month: event.month,
              externalLink: event.externalLink,
            };
          }

          return {
            id: event.id,
            title: event.titleAr ?? event.title,
            description: event.descriptionAr ?? event.description,
            dateRange: event.dateRange,
            month: event.monthAr ?? event.month,
            externalLink: event.externalLink,
          };
        });

        setEvents(localizedEvents);
      } catch (error) {
        console.error("Failed to load past events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPastEvents();
  }, [locale]);

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const visibleEvents = events.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <div className="py-4 px-4">
      <div className="w-[90%] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale?.toLowerCase().startsWith("ar") ? (
              <>
                <span className="text-[#D4AF37]">{content.eventsWord}</span> {content.past.headingPrefix}
              </>
            ) : (
              <>
                {content.past.headingPrefix} <span className="text-[#D4AF37]">{content.eventsWord}</span>
              </>
            )}
          </h1>
          <p className="text-[#6B7280] text-xl md:text-[21px]">
            {content.past.subheading}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">{content.past.loading}</p>
        )}

        {/* No Events */}
        {!loading && events.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            {content.past.empty}
          </p>
        )}

        {/* Events */}
        {!loading && events.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
              {visibleEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-[20px] md:rounded-[40px] border border-gray-300 p-6 md:p-8 shadow-md hover:shadow-md transition-shadow duration-300"
                >
                  {/* Date Badge */}
                  <div className="text-[#D4AF37] px-3 py-2 rounded-full w-fit font-semibold bg-[#FFFBED] text-xs mb-4">
                    {event.dateRange} {event.month}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-medium text-gray-900 mb-4">
                    {event.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Fixed CTA */}
                  <button
                    onClick={() => window.open(event.externalLink, "_blank", "noopener,noreferrer")}
                    className="inline-flex cursor-pointer items-center text-[#D4AF37] font-semibold hover:text-yellow-600 transition-colors group"
                  >
                    {content.past.watchRecording}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-2 bg-[#FFFBED] rounded-full px-4 py-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setPage(index)}
                      className={`w-2 h-2 cursor-pointer rounded-full transition-all duration-300 ${page === index
                        ? "bg-[#D4AF37] scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      aria-label={`Page ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PastEvents;