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
            <PageHero
                title={content.heroTitle}
                title2={content.heroTitle2}
                description={content.heroDescription}
                button={content.heroButton}
                link={`/${locale}/business#about-us`}
                image={heroImage}
                image2={heroImageMobile}
                image3={heroImageTablet}
                buttonImage={heroButtonImage}
            />
            <EmpoweringSection />
            <JourneyTimeline />
            <LeadershipTeam />
            <Innovation />
        </div>
    );
}