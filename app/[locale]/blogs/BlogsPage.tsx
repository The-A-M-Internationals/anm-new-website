'use client';

import PageHero from "@/app/components/PageHero";
import Article from "./components/Article";
import BlogArticleList from "./components/BlogArticleList";
import SuggestTopicSection from "./components/SuggestTopicSection";
import { useIntlayer, useLocale } from "next-intlayer";

export default function BlogsPage() {
    const content = useIntlayer("blogsPage");
    const { locale } = useLocale();
    const heroImage =
        locale === "ar" ? "/blogs/hero-image-ar.png" : "/blogs/hero-image.png";

    const heroImageMobile =
        locale === "ar" ? "/contactmo-ar.png" : "/contactm.png";

    const heroImageTablet =
        locale === "ar" ? "/blogs/tab-hero-ar.png" : "/blogs/tab-hero.png";

    const heroButtonImage =
        locale === "ar" ? "/blogs/button-heroo-ar.png" : "/blogs/button-hero.png";
    return (
        <div>
            <section className="snap-section">
                <PageHero
                    title={content.heroTitle.value}
                    description={content.heroDescription.value}
                    button={content.heroButton.value}
                    link={`/${locale}/contact#form`}
                    image={heroImage}
                    image2={heroImageMobile}
                    image3={heroImageTablet}
                    buttonImage={heroButtonImage}
                    titleClassName="text-2xl md:text-3xl lg:text-5xl"
                />
            </section>
            <section className="snap-section"><Article /></section>
            <section className="snap-section"><BlogArticleList /></section>
            <section className="snap-section"><SuggestTopicSection /></section>
        </div>
    );
}