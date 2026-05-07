"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebaseConfig";
import { ArrowRight } from "lucide-react";
import LiveEvents from "./LiveEvents";
import { useRouter } from "next/navigation";
import { useIntlayer, useLocale } from "next-intlayer";

interface EventType {
    id: string;
    title: string;
    titleAr?: string;
    description: string;
    descriptionAr?: string;
    location: string;
    locationAr?: string;
    dateRange: string;
    month: string;
    monthAr?: string;
    timeRange: string;
    timeRangeAr?: string;
    imageSrc: string;
}

const Events = () => {
    const content = useIntlayer("events");
    const { locale } = useLocale();
    const router = useRouter();

    const [upcomingEvents, setUpcomingEvents] = useState<EventType[]>([]);
    const [liveEvent, setLiveEvent] = useState<EventType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const snapshot = await getDocs(collection(db, "events"));

                const parseEventDateRange = (dateRange: string, month: string) => {
                    const days = dateRange.match(/\d{1,2}/g);
                    if (!days) return null;

                    const [startDay, endDay = startDay] = days;
                    const [mon, yr] = month.split(",");
                    const year = `20${yr.trim()}`;

                    const startDate = new Date(`${mon} ${startDay}, ${year}`);
                    const endDate = new Date(`${mon} ${endDay}, ${year}`);

                    startDate.setHours(0, 0, 0, 0);
                    endDate.setHours(23, 59, 59, 999);

                    return { startDate, endDate };
                };

                const today = new Date();
                today.setHours(0, 0, 0, 0);


                let detectedLiveEvent: EventType | null = null;
                const upcoming: EventType[] = [];

                snapshot.docs.forEach((docSnap) => {
                    const data = docSnap.data();
                    const range = parseEventDateRange(data.dateRange, data.month);
                    if (!range) return;

                    // Always map both English and Arabic fields
                    const event: EventType = {
                        id: docSnap.id,
                        title: data.title,
                        titleAr: data.titleAr,
                        description: data.description,
                        descriptionAr: data.descriptionAr,
                        location: data.location,
                        locationAr: data.locationAr,
                        dateRange: data.dateRange,
                        month: data.month,
                        monthAr: data.monthAr,
                        timeRange: data.timeRange,
                        timeRangeAr: data.timeRangeAr,
                        imageSrc: data.imageSrc,
                    };

                    if (today >= range.startDate && today <= range.endDate) {
                        detectedLiveEvent = event;
                    } else if (range.startDate > today) {
                        upcoming.push(event);
                    }
                });

                upcoming.sort((a, b) => {
                    const r1 = parseEventDateRange(a.dateRange, a.month)!;
                    const r2 = parseEventDateRange(b.dateRange, b.month)!;
                    return r1.startDate.getTime() - r2.startDate.getTime();
                });

                setLiveEvent(detectedLiveEvent);
                setUpcomingEvents(upcoming);
            } catch (err) {
                console.error(err);
                setError("Failed to load events");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [locale]); // re-run when language changes

    /* PAGINATION */
    const [page, setPage] = useState(0);
    const ITEMS_PER_PAGE = 2;

    const totalPages = Math.ceil(upcomingEvents.length / ITEMS_PER_PAGE);
    const visibleEvents = upcomingEvents.slice(
        page * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    if (loading) {
        return <div className="w-full flex justify-center py-10">Loading events...</div>;
    }

    if (error) {
        return <div className="w-full flex justify-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div className="bg-gradient-to-r from-[#EED689]/10 to-white py-8 sm:py-10 md:py-0">
            <div className="max-w-7xl mx-auto w-full">
                {/* HEADER */}
                <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[48px] text-center">
                    {content.header.value}
                </h2>
                <p className="font-semibold text-[#6B7280] text-xs sm:text-sm md:text-base text-center px-4 lg:mb-10">
                    {content.subHeader.value}
                </p>

                {/* LIVE EVENT */}
                {liveEvent ? (
                    <LiveEvents
                        {...{
                            ...liveEvent,
                            title: locale === "ar" ? liveEvent.titleAr || liveEvent.title : liveEvent.title,
                            description: locale === "ar" ? liveEvent.descriptionAr || liveEvent.description : liveEvent.description,
                            location: locale === "ar" ? liveEvent.locationAr || liveEvent.location : liveEvent.location,
                            month: locale === "ar" ? liveEvent.monthAr || liveEvent.month : liveEvent.month,
                            timeRange: locale === "ar" ? liveEvent.timeRangeAr || liveEvent.timeRange : liveEvent.timeRange,
                        }}
                    />
                ) : (
                    <div className="w-full text-center text-gray-500 text-lg font-medium mb-6">
                        {content.noLiveEvents.value}
                    </div>
                )}
            </div>

            {/* UPCOMING EVENTS */}
            <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col gap-6 pb-5 md:pb-20">
                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                        {content.upcomingHeader.value}
                    </h2>
                </div>

                {visibleEvents.length === 0 ? (
                    <p className="text-center text-gray-500 mb-8 md:mb-15">
                        {content.noUpcomingEvents.value}
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {visibleEvents.map((event) => {
                            const title = locale === "ar" ? event.titleAr || event.title : event.title;
                            const description = locale === "ar" ? event.descriptionAr || event.description : event.description;
                            const location = locale === "ar" ? event.locationAr || event.location : event.location;
                            const month = locale === "ar" ? event.monthAr || event.month : event.month;
                            const timeRange = locale === "ar" ? event.timeRangeAr || event.timeRange : event.timeRange;
                            return (
                                <div
                                    key={event.id}
                                    className="rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex gap-2 mb-2">
                                        <span className="bg-[#FFFBED] text-[#D4AF37] px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                                            {event.dateRange}
                                        </span>
                                        <span className="bg-[#FFFBED] text-[#D4AF37] px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
                                            {month}
                                        </span>
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-medium mb-2">
                                        {title}
                                    </h3>

                                    <p className="text-gray-600 text-xs sm:text-sm mb-4">
                                        {description}
                                    </p>

                                    <button
                                        onClick={() => router.push(`/${locale}/register?eventId=${event.id}`)}
                                        className="text-[#D4AF37] hover:text-yellow-700 cursor-pointer font-semibold flex items-center gap-2"
                                    >
                                        {content.registerNow.value}
                                        <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* VIEW ALL BUTTON - Moved to bottom and centered */}
                {visibleEvents.length > 0 && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={() => router.push(`/${locale}/events#upcoming-events`)}
                            className="bg-[#D4AF37] cursor-pointer text-sm sm:text-base font-semibold px-8 py-3 rounded-full hover:scale-105 transition shadow-md"
                        >
                            {content.viewAll.value}
                        </button>
                    </div>
                )}

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-4 mb-8">
                        <div className="flex gap-2 bg-[#FFFBED] rounded-full px-4 py-2">
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setPage(index)}
                                    className={`w-2 h-2 rounded-full transition-all ${page === index
                                        ? "bg-[#D4AF37] scale-125"
                                        : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;