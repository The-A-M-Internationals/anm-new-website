import type { Metadata } from "next";
import "../globals.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AOSInitializer from "../components/AOSInitializer";
import GoToTopButton from "../components/GoToTopButton";

import { getHTMLTextDir } from 'intlayer';
import { IntlayerClientProvider } from "next-intlayer";
import React from 'react';

import type { AppLocale } from "@/types/locale";
// import type { Locales } from "intlayer";

export const metadata: Metadata = {
    title: "A&M International",
    description: "A&M International provides services to help businesses thrive in the global market.",
};

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return (
        <html lang={locale} dir={getHTMLTextDir(locale)}>
            <body className="font-sf">
                <IntlayerClientProvider locale={locale}>
                    <AOSInitializer />
                    <Navbar />
                    {children}
                    <GoToTopButton />
                    <Footer />
                </IntlayerClientProvider>
            </body>
        </html>
    );
}