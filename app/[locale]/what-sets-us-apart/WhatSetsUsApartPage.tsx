"use client";

import { useIntlayer, useLocale } from "next-intlayer";
import PageHero from "../../components/PageHero";
import Apps from "../features/components/Apps";
import EPM from "../features/components/EPM";
import WhatSetsUsApartList from "./components/WhatSetsUsApartList";
import Results from "../features/components/Results";

export default function WhatSetsUsApartPage() {
    // 99% Features Page replica - using featuresPage content for everything except the list
    const content = useIntlayer("featuresPage");
    const { locale } = useLocale();

    // 🔥 Exact replica of Features Page images
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
                    link={`/${locale}/features#epm-suites`}
                    image={heroImage}
                    image2={heroImageMobile}
                    image3={heroImageTablet}
                    buttonImage={heroButtonImage}
                />
            </section>

            {/* The 1% unique content: WhatSetsUsApartList instead of FeaturesList */}
            <section className="snap-section bg-[#f9f9f9]"><WhatSetsUsApartList /></section>
            
            <section className="snap-section"><Apps /></section>
            <section className="snap-section"><Results /></section>
            <section className="snap-section"><EPM /></section>
        </div>
    );
}
