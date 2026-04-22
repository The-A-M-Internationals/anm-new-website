'use client';

import { useEffect, useState } from 'react';
import LiveEvents from '../../components/LiveEvents';
import { db } from "../../../lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
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
};

const UpcomingEvents = () => {
    const content = useIntlayer("eventsPage");
    const { locale } = useLocale();
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const snapshot = await getDocs(collection(db, 'events'));

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
                    };
                });

                setEvents(localizedEvents);
            } catch (error) {
                console.error("Failed to load upcoming events", error);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [locale]);

    return (
        <div id="upcoming-events" className="flex flex-col gap-2">
            <h3 className="text-3xl md:text-5xl text-center text-black font-semibold">
                {locale?.toLowerCase().startsWith('ar') ? (
                    <>
                        <span className="text-[#D4AF37]">{content.eventsWord}</span> {content.upcoming.headingPrefix}
                    </>
                ) : (
                    <>
                        {content.upcoming.headingPrefix} <span className="text-[#D4AF37]">{content.eventsWord}</span>
                    </>
                )}
            </h3>

            <p className="text-center text-[#6B7280] text-lg md:text-xl mb-6">
                {content.upcoming.subheading}
            </p>

            {loading ? (
                <div className="text-center">{content.upcoming.loading}</div>
            ) : events.length === 0 ? (
                <div className="text-center text-gray-500">
                    {content.upcoming.empty}
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