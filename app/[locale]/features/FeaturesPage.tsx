"use client";

import { useIntlayer, useLocale } from "next-intlayer";
import PageHero from "../../components/PageHero";
import Apps from "./components/Apps";
import EPM from "./components/EPM";
import FeaturesList from "./components/FeaturesList";
import Results from "./components/Results";

export default function FeaturesPage() {
    const content = useIntlayer("featuresPage");
    const { locale } = useLocale();

    // 🔥 Locale-based images
    const heroImage =
        locale === "ar" ? "/features/hero-image-ar.png" : "/features/hero-image.png";

    const heroImageMobile =
        locale === "ar" ? "/event-arr.png" : "/event.png";

    const heroImageTablet =
        locale === "ar" ? "/blogs/tab-hero-ar.png" : "/blogs/tab-hero.png";

    const heroButtonImage =
        locale === "ar" ? "/features/button-hero-ar.png" : "/features/button-hero.png";

    return (
        <div>
            <PageHero
                title={content.heroTitle}
                title2={content.heroTitle2}
                description={content.heroDescription}
                button={content.heroButton}
                link={`/${locale}/features#epm-suites`}
                image={heroImage}
                image2={heroImageMobile}
                image3={heroImageTablet}
                buttonImage={heroButtonImage}
            />

            <FeaturesList />
            <Apps />
            <Results />
            <EPM />
        </div>
    );
}