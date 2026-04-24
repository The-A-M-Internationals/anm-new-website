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
        locale === "ar" ? "/blogs/tab-hero-ar.png" : "/blogs/tab-hero.png";

    const heroButtonImage =
        locale === "ar" ? "/contact-button-heroo-ar.png" : "/contact-button-hero.png";

    return (
        <div className='flex flex-col gap-8'>
            <PageHero
                title={content.heroTitle}
                description={content.heroDescription}
                button={content.heroButton}
                link={`/${locale}/contact#form`}
                image={heroImage}
                image2={heroImageMobile}
                image3={heroImageTablet}
                buttonImage={heroButtonImage}
            />

            <ContactForm />
            <OurOffices />
            <FAQ />
        </div>
    );
};

export default ContactPage;