"use client";

import { useIntlayer, useLocale } from "next-intlayer";
import PageHero from "../../components/PageHero";
import EPM from "../features/components/EPM";
import WhatSetsUsApartList from "./components/WhatSetsUsApartList";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import type { AppLocale } from "@/types/locale";

export default function WhatSetsUsApartPage() {
    const content = useIntlayer("whatSetsUsApartPage");
    const { locale } = useLocale();

    // Same hero images as the Features page
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
                    description={content.heroDescription.value}
                    button={content.heroButton.value}
                    link={getLocalizedPath(locale as AppLocale, "/contact#form")}
                    image={heroImage}
                    image2={heroImageMobile}
                    image3={heroImageTablet}
                    buttonImage={heroButtonImage}
                />
            </section>

            <section className="snap-section bg-[#f9f9f9]"><WhatSetsUsApartList /></section>
            <section className="snap-section"><EPM variant="consultation" /></section>
        </div>
    );
}
