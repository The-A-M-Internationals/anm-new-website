import type { Metadata } from 'next';
import { t } from "intlayer";
import WebDevelopmentClient from "./WebDevelopmentClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: (t({
            en: "Web Development | The A&M internationals",
            ar: "تطوير الويب | A&M الدولية",
        }) as any)[locale],
        description: (t({
            en: "Custom web development services to create responsive, high-performance websites and web applications.",
            ar: "خدمات تطوير الويب المخصصة لإنشاء مواقع وتطبيقات ويب سريعة الاستجابة وعالية الأداء.",
        }) as any)[locale],
    };
}

export default function WebDevelopmentPage() {
    return <WebDevelopmentClient />;
}