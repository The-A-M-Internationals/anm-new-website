import type { Metadata } from 'next';
import { getTranslation } from "intlayer";
import WebDevelopmentClient from "./WebDevelopmentClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: getTranslation({
            en: "Web Development | The A&M Internationals",
            ar: "تطوير الويب | A&M الدولية",
        }, locale),
        description: getTranslation({
            en: "Custom web development services to create responsive, high-performance websites and web applications.",
            ar: "خدمات تطوير الويب المخصصة لإنشاء مواقع وتطبيقات ويب سريعة الاستجابة وعالية الأداء.",
        }, locale),
    };
}

export default function WebDevelopmentPage() {
    return <WebDevelopmentClient />;
}