'use client';

import { useMemo } from 'react';
import LiveEvents from '../../components/LiveEvents';
import { asSnapshot, type CmsDoc } from "@/lib/cms/shared";
import { useCmsDocs } from "@/lib/cms/useCmsDocs";
import { useIntlayer, useLocale } from 'next-intlayer';
import { parseEventRange, startOfToday } from './eventDates';

type EventType = {
    id: string;
    dateRange: string;
    month: string;
    title: string;
    description: string;
    location: string;
    timeRange: string;
    imageSrc: string;
    buttonText?: string;
    buttonTextAr?: string;
    buttonLink?: string;
    detailsText?: string;
    detailsTextAr?: string;
    detailsLink?: string;
};

const UpcomingEvents = ({ docs: serverDocs }: { docs?: CmsDoc[] }) => {
    const content = useIntlayer("eventsPage");
    const { locale } = useLocale();
    const { docs, loading } = useCmsDocs("events", serverDocs);

    const events = useMemo(() => {
            try {
                const snapshot = asSnapshot(docs);
                const isArabic = locale?.toLowerCase().startsWith('ar');
                const today = startOfToday();
                const pick = (en?: string, ar?: string) => (isArabic ? ar ?? en : en) ?? '';

                // Same date rules as Past Events: an event stays here until its last day is over
                return snapshot.docs
                    .map(doc => ({ id: doc.id, data: doc.data(), range: parseEventRange(doc.data().dateRange, doc.data().month) }))
                    .filter(({ range }) => range !== null && range.end >= today)
                    .sort((a, b) => a.range!.start.getTime() - b.range!.start.getTime())
                    .map(({ id, data }): EventType => ({
                        id,
                        title: pick(data.title, data.titleAr),
                        description: pick(data.description, data.descriptionAr),
                        location: pick(data.location, data.locationAr),
                        dateRange: data.dateRange ?? '',
                        month: pick(data.month, data.monthAr),
                        timeRange: pick(data.timeRange, data.timeRangeAr),
                        imageSrc: data.imageSrc ?? '',
                        buttonText: data.buttonText,
                        buttonTextAr: data.buttonTextAr,
                        buttonLink: data.buttonLink,
                        detailsText: data.detailsText,
                        detailsTextAr: data.detailsTextAr,
                        detailsLink: data.detailsLink,
                    }));
            } catch (error) {
                console.error("Failed to load upcoming events", error);
                return [] as EventType[];
            }
    }, [docs, locale]);

    return (
        <div id="upcoming-events" className="flex flex-col gap-2">
            <h3 className="text-3xl md:text-5xl text-center text-black font-semibold">
                {locale?.toLowerCase().startsWith('ar') ? (
                    <>
                        <span className="text-[#D4AF37]">{content.eventsWord.value}</span> {content.upcoming.headingPrefix.value}
                    </>
                ) : (
                    <>
                        {content.upcoming.headingPrefix.value} <span className="text-[#D4AF37]">{content.eventsWord.value}</span>
                    </>
                )}
            </h3>

            <p className="text-center text-[#6B7280] text-lg md:text-xl mb-6">
                {content.upcoming.subheading.value}
            </p>

            {loading ? (
                <div className="text-center">{content.upcoming.loading.value}</div>
            ) : events.length === 0 ? (
                <div className="text-center text-gray-500">
                    {content.upcoming.empty.value}
                </div>
            ) : (
                events.map(event => (
                    <LiveEvents key={event.id} {...event} />
                ))
            )}
        </div>
    );
};

export default UpcomingEvents;