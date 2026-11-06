import type { Metadata } from "next";
import "../globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollReveal from "../components/ScrollReveal";
import ImagePreloader from "../components/ImagePreloader";
import PageLeave from "../components/PageLeave";
import GlobalCursor from "../components/GlobalCursor";
import GoToTopButton from "../components/GoToTopButton";
import HashScrollHandler from "../components/HashScrollHandler";
import SmoothScrolling from "../components/SmoothScrolling";

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

export const metadata: Metadata = {
    title: "The A&M internationals",
    description: "The A&M internationals provides services to help businesses thrive in the global market.",
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

    return (
        <html lang={locale} dir={getHTMLTextDir(locale)} className={`${tajawal.variable} ${cairo.variable} ${notoTabsArabic.variable}`} suppressHydrationWarning>
            <body className={`${isArabic ? 'font-noto' : 'font-sf'}`} suppressHydrationWarning>
                <style dangerouslySetInnerHTML={{ __html: `
                    :root {
                        --heading-font: ${isArabic ? 'var(--font-tajawal), var(--font-cairo)' : "'SF Pro', sans-serif"};
                    }
                    h1, h2, h3, h4, h5, h6 {
                        font-family: var(--heading-font) !important;
                    }
                `}} />
                <IntlayerClientProvider locale={locale}>
                    <SmoothScrolling>
                        <ScrollReveal />
                        <ImagePreloader />
                        <PageLeave />
                        <GlobalCursor />
                        <HashScrollHandler />
                        <Navbar />
                        {children}
                        <GoToTopButton />
                        <Footer />
                    </SmoothScrolling>
                </IntlayerClientProvider>
            </body>
        </html>
    );
}
