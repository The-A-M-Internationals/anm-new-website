'use client';

import { useMemo } from 'react';
import LiveEvents from '../../components/LiveEvents';
import { asSnapshot, type CmsDoc } from "@/lib/cms/shared";
import { useCmsDocs } from "@/lib/cms/useCmsDocs";
import { useIntlayer, useLocale } from 'next-intlayer';

type EventType = {
    id: string;
    dateRange: string;
    month: string;
    title: string;
    titleAr?: string;
    description: string;
    descriptionAr?: string;
    location: string;
    locationAr?: string;
    monthAr?: string;
    timeRange: string;
    timeRangeAr?: string;
    imageSrc: string;
    buttonText?: string;
    buttonTextAr?: string;
    buttonLink?: string;
};

const UpcomingEvents = ({ docs: serverDocs }: { docs?: CmsDoc[] }) => {
    const content = useIntlayer("eventsPage");
    const { locale } = useLocale();
    const { docs, loading } = useCmsDocs("events", serverDocs);

    const events = useMemo(() => {
            try {
                const snapshot = asSnapshot(docs);

                const isArabic = locale?.toLowerCase().startsWith('ar');

                const parseEventStartDate = (dateRange: string, month: string): Date | null => {
                    const days = dateRange.match(/\d{1,2}/g);
                    if (!days || days.length === 0) return null;

                    const startDay = days[0];
                    const [mon, yr] = month.split(',');
                    const year = `20${yr.trim()}`;

                    const date = new Date(`${mon} ${startDay}, ${year}`);
                    date.setHours(0, 0, 0, 0);
                    return date;
                };

                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const upcomingEvents: EventType[] = snapshot.docs
                    .map(doc => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            dateRange: data.dateRange ?? '',
                            month: data.month ?? '',
                            title: data.title ?? '',
                            titleAr: data.titleAr,
                            description: data.description ?? '',
                            descriptionAr: data.descriptionAr,
                            location: data.location ?? '',
                            locationAr: data.locationAr,
                            monthAr: data.monthAr,
                            timeRange: data.timeRange ?? '',
                            timeRangeAr: data.timeRangeAr,
                            imageSrc: data.imageSrc ?? '',
                            buttonText: data.buttonText,
                            buttonTextAr: data.buttonTextAr,
                            buttonLink: data.buttonLink,
                        };
                    })
                    .filter(event => {
                        const startDate = parseEventStartDate(event.dateRange, event.month);
                        return startDate !== null && startDate > today;
                    })
                    .sort((a, b) => {
                        const d1 = parseEventStartDate(a.dateRange, a.month);
                        const d2 = parseEventStartDate(b.dateRange, b.month);
                        return (d1?.getTime() ?? 0) - (d2?.getTime() ?? 0);
                    });

                const localizedEvents = upcomingEvents.map((event) => {
                    if (!isArabic) {
                        return {
                            id: event.id,
                            title: event.title,
                            description: event.description,
                            location: event.location,
                            dateRange: event.dateRange,
                            month: event.month,
                            timeRange: event.timeRange,
                            imageSrc: event.imageSrc,
                            buttonText: event.buttonText,
                            buttonTextAr: event.buttonTextAr,
                            buttonLink: event.buttonLink,
                        };
                    }

                    return {
                        id: event.id,
                        title: event.titleAr ?? event.title,
                        description: event.descriptionAr ?? event.description,
                        location: event.locationAr ?? event.location,
                        dateRange: event.dateRange,
                        month: event.monthAr ?? event.month,
                        timeRange: event.timeRangeAr ?? event.timeRange,
                        imageSrc: event.imageSrc,
                        buttonText: event.buttonText,
                        buttonTextAr: event.buttonTextAr,
                        buttonLink: event.buttonLink,
                    };
                });

                return localizedEvents as EventType[];
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