"use client";

import { useIntlayer, useLocale } from "next-intlayer";
import PageHero from "../../components/PageHero";
import Apps from "../features/components/Apps";
import EPM from "../features/components/EPM";
import WhatSetsUsApartList from "./components/WhatSetsUsApartList";
import Results from "../features/components/Results";

export default function WhatSetsUsApartPage() {
    const content = useIntlayer("whatSetsUsApartPage");
    const { locale } = useLocale();

    // 🔥 Locale-based images (Reusing from features for exact replica structure)
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
            <section className="snap-section">
                <PageHero
                    title={content.heroTitle.value}
                    title2={content.heroTitle2.value}
                    description={content.heroDescription.value}
                    button={content.heroButton.value}
                    link={`/${locale}/what-sets-us-apart#epm-suites`}
                    image={heroImage}
                    image2={heroImageMobile}
                    image3={heroImageTablet}
                    buttonImage={heroButtonImage}
                />
            </section>

            <section className="snap-section"><WhatSetsUsApartList /></section>
            <section className="snap-section"><Apps /></section>
            <section className="snap-section"><Results /></section>
            <section className="snap-section"><EPM /></section>
        </div>
    );
}
