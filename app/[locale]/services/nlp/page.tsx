import type { Metadata } from 'next';
import { getTranslation } from "intlayer";
import NLPClient from "./NLPClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: getTranslation({
            en: "Natural Language Processing | The A&M Internationals",
            ar: "معالجة اللغة الطبيعية | A&M الدولية",
        }, locale),
        description: getTranslation({
            en: "Advanced NLP solutions for text analysis, sentiment detection, and automated language understanding.",
            ar: "حلول معالجة اللغة الطبيعية المتقدمة لتحليل النصوص وكشف المشاعر وفهم اللغة المؤتمت.",
        }, locale),
    };
}

export default function NLPPage() {
    return <NLPClient />;
}