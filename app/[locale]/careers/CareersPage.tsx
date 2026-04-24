'use client';

import PageHero from "../../components/PageHero";
import Benefits from "./components/Benefits";
import CultureGrowthSection from "./components/CultureGrowthSection";
import Open from "./components/Open";
import Innovation from "../../components/Innovation";
import { useIntlayer, useLocale } from "next-intlayer";

export default function CareersPage() {
    const content = useIntlayer("careersPage");
    const { locale } = useLocale();

    // 🔥 Locale-specific images
    const heroImage =
        locale === "ar" ? "/careers/hero-image-ar.png" : "/careers/hero-image.png";

    const heroImageMobile =
        locale === "ar" ? "/interview-ar.png" : "/interview.png";

    const heroImageTablet =
        locale === "ar" ? "/careers/tab-hero-ar.png" : "/careers/tab-hero.png";

    const heroButtonImage =
        locale === "ar" ? "/careers/button-hero-ar.png" : "/careers/button-hero.png";

    return (
        <div>
            <PageHero
                title={content.heroTitle}
                title2={content.heroTitle2}
                description={content.heroDescription}
                button={content.heroButton}
                link={`/${locale}/careers#open-positions`}
                image={heroImage}
                image2={heroImageMobile}
                image3={heroImageTablet}
                buttonImage={heroButtonImage}
            />

            <CultureGrowthSection />
            <Benefits />
            <Open />
            <Innovation />
        </div>
    );
}