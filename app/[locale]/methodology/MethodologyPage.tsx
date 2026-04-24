'use client';

import Innovation from "../../components/Innovation";
import PageHero from "../../components/PageHero";
import MethodologySection from "./components/MethodologySection";
import PartnerShip from "./components/Partnership";
import ProcessMatters from "./components/ProcessMatters";
import { useIntlayer, useLocale } from "next-intlayer";

export default function MethodologyPage() {
    const content = useIntlayer("methodologyPage");
    const { locale } = useLocale();

    // 🔥 Locale-based images
    const heroImage =
        locale === "ar" ? "/business/hero2-ar.png" : "/business/hero2.png";

    const heroImageMobile =
        locale === "ar" ? "/methodology-ar.png" : "/methodology.png";

    const heroImageTablet =
        locale === "ar" ? "/business/tab-hero-ar.png" : "/business/tab-hero.png";

    const heroButtonImage =
        locale === "ar" ? "/business/button-ar.png" : "/business/button.png";

    return (
        <div>
            <section className="snap-section">
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
            </section>

            <section className="snap-section"><MethodologySection /></section>
            <section className="snap-section"><ProcessMatters /></section>
            {/* <PartnerShip /> */}
            <section className="snap-section"><Innovation /></section>
        </div>
    );
}