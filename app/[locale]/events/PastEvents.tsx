"use client";

import React, { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { asSnapshot, type CmsDoc } from "@/lib/cms/shared";
import { useCmsDocs } from "@/lib/cms/useCmsDocs";
import { useIntlayer, useLocale } from "next-intlayer";
import { parseEventRange, startOfToday } from "./eventDates";

interface EventType {
  id: string;
  title: string;
  description: string;
  dateRange: string;
  month: string;
  /** Optional small label from Firebase (`tag` / `tagAr`), e.g. "Attended" */
  tag: string;
  externalLink: string;
}

const ITEMS_PER_PAGE = 2;

const PastEvents: React.FC<{ docs?: CmsDoc[] }> = ({ docs: serverDocs }) => {
  const content = useIntlayer("eventsPage");
  const { locale } = useLocale();
  const { docs, loading } = useCmsDocs("events", serverDocs);
  const [page, setPage] = useState(0);
  // Back to the first page when the list or language changes
  const [listKey, setListKey] = useState({ docs, locale });
  if (listKey.docs !== docs || listKey.locale !== locale) { setListKey({ docs, locale }); setPage(0); }

  const events = useMemo(() => {
      try {
        const snapshot = asSnapshot(docs);
        const isArabic = locale?.toLowerCase().startsWith("ar");
        const today = startOfToday();
        const pick = (en?: string, ar?: string) => (isArabic ? ar ?? en : en) ?? "";

        // Month-only events (no day numbers) end on the last day of their month
        return snapshot.docs
          .map((doc) => ({ id: doc.id, data: doc.data(), range: parseEventRange(doc.data().dateRange, doc.data().month) }))
          .filter(({ range }) => range !== null && range.end < today)
          .sort((a, b) => b.range!.end.getTime() - a.range!.end.getTime())
          .map(({ id, data }): EventType => ({
            id,
            title: pick(data.title, data.titleAr),
            description: pick(data.description, data.descriptionAr),
            dateRange: data.dateRange ?? "",
            month: pick(data.month, data.monthAr),
            tag: pick(data.tag, data.tagAr),
            externalLink: data.externalLink ?? "",
          }));
      } catch (error) {
        console.error("Failed to load past events", error);
        return [] as EventType[];
      }
  }, [docs, locale]);

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const visibleEvents = events.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  // Nothing past to show: hide the whole section instead of an empty heading
  if (!loading && events.length === 0) return null;

  return (
    <div className="py-4 px-4">
      <div className="w-[90%] mx-auto">
        {/* Header - Fixed with .value */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {locale?.toLowerCase().startsWith("ar") ? (
              <>
                <span className="text-[#D4AF37]">{content.eventsWord.value}</span>{" "}
                {content.past.headingPrefix.value}
              </>
            ) : (
              <>
                {content.past.headingPrefix.value}{" "}
                <span className="text-[#D4AF37]">{content.eventsWord.value}</span>
              </>
            )}
          </h1>
          <p className="text-[#6B7280] text-xl md:text-[21px]">
            {content.past.subheading.value}
          </p>
        </div>

        {/* Loading State - Fixed with .value */}
        {loading && (
          <p className="text-center text-gray-500">{content.past.loading.value}</p>
        )}

        {/* Empty State - Fixed with .value */}
        {!loading && events.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            {content.past.empty.value}
          </p>
        )}

        {/* Events Grid */}
        {!loading && events.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
              {visibleEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-[20px] md:rounded-[40px] border border-gray-300 p-6 md:p-8 shadow-md hover:shadow-md transition-shadow duration-300"
                >
                  {event.tag && (
                    <span className="inline-block bg-[#FFFBED] text-[#D4AF37] px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3">
                      {event.tag}
                    </span>
                  )}

                  <h2 className="text-2xl font-medium text-gray-900 mb-4">
                    {event.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {event.description}
                  </p>

                  {event.externalLink && (
                    <button
                      onClick={() =>
                        window.open(event.externalLink, "_blank", "noopener,noreferrer")
                      }
                      className="inline-flex cursor-pointer items-center text-[#D4AF37] font-semibold hover:text-yellow-600 transition-colors group"
                    >
                      {content.past.watchRecording.value}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                    </button>
                  )}
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