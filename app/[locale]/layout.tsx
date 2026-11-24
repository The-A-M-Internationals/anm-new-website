import type { Metadata } from "next";
import "../globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollReveal from "../components/ScrollReveal";
import PauseOffscreenAnimations from "../components/PauseOffscreenAnimations";
import ImagePreloader from "../components/ImagePreloader";
import PageLeave from "../components/PageLeave";
import PageLoader from "../components/PageLoader";
import Spotlight from "../components/Spotlight";
import AdminShortcut from "../components/AdminShortcut";
import SiteIntro from "../components/intro/SiteIntro";
import GlobalCursor from "../components/GlobalCursor";
import GoToTopButton from "../components/GoToTopButton";
import HashScrollHandler from "../components/HashScrollHandler";
import SmoothScrolling from "../components/SmoothScrolling";
import { ContactInfoProvider } from "../components/ContactInfo";
import { getEntry } from "@/lib/cms/server";
import { toContact } from "@/lib/cms/siteContent";

import { getHTMLTextDir } from 'intlayer';
import { IntlayerClientProvider } from "next-intlayer";
import React from 'react';
import { Tajawal, Cairo, Noto_Sans_Arabic } from 'next/font/google';

const tajawal = Tajawal({
    subsets: ['arabic'],
    weight: ['400', '500', '700'],
    variable: '--font-tajawal',
});

const cairo = Cairo({
    subsets: ['arabic'],
    weight: ['400', '500', '700'],
    variable: '--font-cairo',
});

const notoTabsArabic = Noto_Sans_Arabic({
    subsets: ['arabic'],
    weight: ['400', '500', '700'],
    variable: '--font-noto',
});

import type { Viewport } from 'next';

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

// Admin-edited content (contact details in the footer) refreshes at most once a minute
export const revalidate = 60;

export const metadata: Metadata = {
    title: "The A&M Internationals",
    description: "The A&M Internationals provides services to help businesses thrive in the global market.",
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/icon.png", type: "image/png" },
        ],
        apple: [
            { url: "/apple-icon.png" },
        ],
    },
};

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const isArabic = locale === 'ar';
    // Contact details edited in the admin portal (footer + Contact page); built-in values if unset
    const contact = toContact((await getEntry("siteContent", "contact"))?.data);

    return (
        <html lang={locale} dir={getHTMLTextDir(locale)} className={`${tajawal.variable} ${cairo.variable} ${notoTabsArabic.variable}`} suppressHydrationWarning>
            <head>
                {/* Lettering of the logo in the opening intro, and the count on the page loading screen: only the characters they use */}
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&display=swap&text=THEAMINRNOLS0123456789%26%20" />
            </head>
            <body className={`${isArabic ? 'font-noto' : 'font-sf'}`} suppressHydrationWarning>
                <style dangerouslySetInnerHTML={{ __html: `
                    :root {
                        --heading-font: ${isArabic ? 'var(--font-tajawal), var(--font-cairo)' : "'SF Pro', sans-serif"};
                    }
                    h1, h2, h3, h4, h5, h6 {
                        font-family: var(--heading-font) !important;
                    }
                `}} />
                {/* Opening intro: on the first page of a visit, and again when the visitor refreshes with F5 (or a hard
                    refresh). Any other reload shows the page straight away. Never with reduced motion. Decided before the first paint. */}
                <script dangerouslySetInnerHTML={{ __html: "try{var s=sessionStorage,again=s.getItem('anm-intro-replay');s.removeItem('anm-intro-replay');if(matchMedia('(prefers-reduced-motion: reduce)').matches||(s.getItem('anm-intro')&&!again))document.documentElement.setAttribute('data-intro','skip');addEventListener('keydown',function(e){if(e.key==='F5'||((e.ctrlKey||e.metaKey)&&e.shiftKey&&(e.key==='R'||e.key==='r')))try{s.setItem('anm-intro-replay','1')}catch(_){}},true)}catch(e){}" }} />
                <noscript><style>{".site-intro{display:none}"}</style></noscript>
                <SiteIntro />
                <IntlayerClientProvider locale={locale}>
                    <ContactInfoProvider value={contact}>
                    <SmoothScrolling>
                        <ScrollReveal />
                        <PauseOffscreenAnimations />
                        <ImagePreloader />
                        <PageLeave />
                        <PageLoader />
                        <Spotlight />
                        <AdminShortcut />
                        <GlobalCursor />
                        <HashScrollHandler />
                        <Navbar />
                        {children}
                        <GoToTopButton />
                        <Footer />
                    </SmoothScrolling>
                    </ContactInfoProvider>
                </IntlayerClientProvider>
            </body>
        </html>
    );
}
