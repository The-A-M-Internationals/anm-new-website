'use client';

import PageHero from '../../components/PageHero';
import ContactForm from './ContactForm';
import OurOffices from './Offices';
import FAQ from './FAQ';

import { useIntlayer, useLocale } from "next-intlayer";

const ContactPage = () => {
    const content = useIntlayer("contactPage");
    const { locale } = useLocale();

    // 🔥 Locale-specific images
    const heroImage =
        locale === "ar" ? "/Contact-ar.png" : "/Contact.png";

    const heroImageMobile =
        locale === "ar" ? "/contactmo-ar.png" : "/contactm.png";

    const heroImageTablet =
        locale === "ar" ? "/blogs/tab-hero.png" : "/blogs/tab-hero.png";

    const heroButtonImage =
        locale === "ar" ? "/contact-button-heroo-ar.png" : "/contact-button-hero.png";

    return (
        <div className='flex flex-col gap-8'>
            <section className="snap-section">
                <PageHero
                    title={content.heroTitle.value}
                    title2={content.heroSubheading.value}
                    description={content.heroIntro.value}
                    button={content.heroButton.value}
                    link={`/${locale}/contact#form`}
                    image={heroImage}
                    image2={heroImageMobile}
                    image3={heroImageTablet}
                    buttonImage={heroButtonImage}
                />
            </section>

            <section className="snap-section"><ContactForm /></section>
            <section className="snap-section"><OurOffices /></section>
            <section className="snap-section"><FAQ /></section>
        </div>
    );
};

export default ContactPage;