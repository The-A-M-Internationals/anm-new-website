"use client";

import { useIntlayer, useLocale } from "next-intlayer";
import Innovation from "../../components/Innovation";
import PageHero from "../../components/PageHero";
import EmpoweringSection from "./components/EmpoweringSection";
import JourneyTimeline from "./components/JourneyTimeline";
import LeadershipTeam from "./components/LeadershipTeam";
import type { CmsDoc } from "@/lib/cms/shared";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import type { AppLocale } from "@/types/locale";

export default function BusinessPage({ founders, team }: { founders?: CmsDoc[]; team?: CmsDoc[] }) {
    const content = useIntlayer("businessPage");
    const { locale } = useLocale();

    const heroImage =
        locale === "ar" ? "/business/hero-ar.png" : "/business/hero.png";

    const heroImageMobile =
        locale === "ar" ? "/about-ar.png" : "/about.png";

    const heroImageTablet =
        locale === "ar" ? "/business/herotab.png" : "/business/herotab.png";

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
                    link={getLocalizedPath(locale as AppLocale, "/business#about-us")}
                    image={heroImage}
                    image2={heroImageMobile}
                    image3={heroImageTablet}
                    buttonImage={heroButtonImage}
                />
            </section>
            <section className="snap-section"><EmpoweringSection /></section>
            <section className="snap-section"><JourneyTimeline /></section>
            <LeadershipTeam founders={founders} team={team} />
            <section className="snap-section"><Innovation /></section>
        </div>
    );
}
