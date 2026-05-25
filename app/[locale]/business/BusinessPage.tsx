"use client";

import { useIntlayer, useLocale } from "next-intlayer";
import Innovation from "../../components/Innovation";
import PageHero from "../../components/PageHero";
import EmpoweringSection from "./components/EmpoweringSection";
import JourneyTimeline from "./components/JourneyTimeline";
import LeadershipTeam from "./components/LeadershipTeam";

export default function BusinessPage() {
    const content = useIntlayer("businessPage");
    const { locale } = useLocale();

    const heroImage =
        locale === "ar" ? "/business/hero-ar.png" : "/business/hero.png";

    const heroImageMobile =
        locale === "ar" ? "/about-ar.png" : "/about.png";

    const heroImageTablet =
        locale === "ar" ? "/business/herotab-ar.png" : "/business/herotab.png";

    const heroButtonImage =
        locale === "ar" ? "/business/hero-buttonn-ar.png" : "/business/hero-button.png";

    return (
        <div>
            <section className="snap-section">
                <PageHero
                    title={content.heroTitle.value}
                    title2={content.heroTitle2.value}
                    description={content.heroDescription.value}
                    button={content.heroButton.value}
                    link={`/${locale}/business#about-us`}
                    image={heroImage}
                    image2={heroImageMobile}
                    image3={heroImageTablet}
                    buttonImage={heroButtonImage}
                />
            </section>
            <section className="snap-section"><EmpoweringSection /></section>
            <section className="snap-section"><JourneyTimeline /></section>
            <section className="snap-section"><LeadershipTeam /></section>
            <section className="snap-section"><Innovation /></section>
        </div>
    );
}