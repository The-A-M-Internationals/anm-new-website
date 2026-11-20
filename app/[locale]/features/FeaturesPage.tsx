"use client";

import { useIntlayer, useLocale } from "next-intlayer";
import PageHero from "../../components/PageHero";
import BuiltOnOracle from "./components/BuiltOnOracle";
import EPM from "./components/EPM";
import FeaturesList from "./components/FeaturesList";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { AppLocale } from "@/types/locale";

/** EPM Build Agent early-access page */
export default function FeaturesPage() {
    const content = useIntlayer("featuresPage");
    const { locale } = useLocale();

    // 🔥 Locale-based images
    const heroImage =
        locale === "ar" ? "/features/hero-image-ar.png" : "/features/hero-image.png";

    const heroImageMobile =
        locale === "ar" ? "/event-arr.png" : "/event.png";

    const heroImageTablet =
        locale === "ar" ? "/blogs/tab-hero.png" : "/blogs/tab-hero.png";

    const heroButtonImage =
        locale === "ar" ? "/features/button-hero-ar.png" : "/features/button-hero.png";

    return (
        <div>
            <section className="snap-section">
                <PageHero
                    title={content.heroTitle.value}
                    title2={content.heroTitle2.value}
                    description={content.heroDescription.value}
                    button={content.heroButton.value}
                    link={getLocalizedPath(locale as AppLocale, "/features#early-access")}
                    image={heroImage}
                    image2={heroImageMobile}
                    image3={heroImageTablet}
                    buttonImage={heroButtonImage}
                />
            </section>

            <section className="snap-section"><FeaturesList /></section>
            <section className="snap-section"><BuiltOnOracle /></section>
            <section className="snap-section"><EPM variant="earlyAccess" /></section>
        </div>
    );
}
