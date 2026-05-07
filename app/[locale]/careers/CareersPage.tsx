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
            <section className="snap-section">
                <PageHero
                    title={content.heroTitle.value}
                    title2={content.heroTitle2.value}
                    description={content.heroDescription.value}
                    button={content.heroButton.value}
                    link={`/${locale}/careers#open-positions`}
                    image={heroImage}
                    image2={heroImageMobile}
                    image3={heroImageTablet}
                    buttonImage={heroButtonImage}
                />
            </section>

            <section className="snap-section"><CultureGrowthSection /></section>
            <section className="snap-section"><Benefits /></section>
            <section className="snap-section"><Open /></section>
            <section className="snap-section"><Innovation /></section>
        </div>
    );
}