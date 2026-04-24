"use client";

import { useIntlayer, useLocale } from "next-intlayer";

import Listings from "./components/Listings";
import WhyChooseUs from "./components/WhyChooseUs";
import PageHero from "../../components/PageHero";
import Innovation from "../../components/Innovation";

export default function FinanceTransformationPage() {
    const content = useIntlayer("financeTransformationPage");
    const { locale } = useLocale();

    // 🔥 Locale-specific assets
    const heroImage =
        locale === "ar" ? "/services/hero-image-ar.png" : "/services/hero-image.png";

    const heroImageMobile =
        locale === "ar" ? "/serv-ar.png" : "/serv.png";

    const heroImageTablet =
        locale === "ar" ? "/aboutus/new-ar.png" : "/aboutus/new.png";

    const heroButtonImage =
        locale === "ar" ? "/services/button-image-ar.png" : "/services/button-image.png";

    return (
        <div>
            <section className="snap-section">
                <PageHero
                    title={content.heroTitle}
                    title2={content.heroTitle2}
                    description={content.heroDescription}
                    button={content.heroButton}
                    link={`/${locale}/contact#form`}
                    image={heroImage}
                    image2={heroImageMobile}
                    image3={heroImageTablet}
                    buttonImage={heroButtonImage}
                />
            </section>

            <Listings />
            <WhyChooseUs />
            <Innovation />
        </div>
    );
}