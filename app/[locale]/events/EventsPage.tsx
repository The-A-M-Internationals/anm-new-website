"use client";

import PageHero from "../../components/PageHero";
import PastEvents from "./PastEvents";
import UpcomingEvents from "./UpcomingEvents";
import NewsLetter from "./NewsLetterSection";
import { useIntlayer, useLocale } from "next-intlayer";

const EventsPage = () => {
    const content = useIntlayer("eventsPage");
    const { locale } = useLocale();

    // Locale-based assets (client-side safe)
    const heroImage = locale === "ar" ? "/EventsHero-ar.png" : "/EventsHero.png";

    const heroImageMobile = locale === "ar" ? "/event-ar.png" : "/event.png";

    const heroImageTablet =
        locale === "ar" ? "/features/tab-hero-ar.png" : "/features/tab-hero.png";

    const heroButtonImage =
        locale === "ar" ? "/eventsbutton-ar.png" : "/eventsbutton.png";

    return (
        <div className="flex flex-col gap-8">
            <PageHero
                title={content.heroTitle}
                title2=""
                description={content.heroDescription}
                button={content.heroButton}
                link={`/${locale}/contact#form`}
                image={heroImage}
                image2={heroImageMobile}
                image3={heroImageTablet}
                buttonImage={heroButtonImage}
            />

            <UpcomingEvents />
            <PastEvents />
            <NewsLetter />
        </div>
    );
};

export default EventsPage;
