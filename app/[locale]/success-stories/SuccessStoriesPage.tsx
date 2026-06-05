'use client';
import PageHero from '../../components/PageHero';
import SuccessStories from './SuccessStories';
import { useIntlayer, useLocale } from 'next-intlayer';

const SuccessStoriesPage = () => {
    const content = useIntlayer("successstories-page");
    const { locale } = useLocale();

    const isArabic = locale === "ar";

    const heroImage = isArabic ? "/SuccessStories-ar.png" : "/SuccessStories.png";
    const heroImageMobile = isArabic ? "/stories-ar.png" : "/stories.png";
    const heroImageTablet = isArabic ? "/SuccessStories-ar.png" : "/SuccessStories.png";
    const heroButtonImage = isArabic
        ? "/button/success-button-hero-ar.png"
        : "/button/success-button-hero.png";

    return (
        <div className='flex flex-col gap-8'>
            <PageHero
                title={content.heroTitle.value}
                title2={content.heroTitle2.value}
                description={content.heroDescription.value}
                button={content.heroButton.value}
                link={`/${locale}/contact#form`}
                image={heroImage}
                image2={heroImageMobile}
                image3={heroImageTablet}
                buttonImage={heroButtonImage}
            />
            <SuccessStories />
        </div>
    );
};

export default SuccessStoriesPage;