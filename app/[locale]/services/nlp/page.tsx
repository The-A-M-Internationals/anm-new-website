import type { Metadata } from 'next';
import { t } from "intlayer";
import NLPClient from "./NLPClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: (t({
            en: "Natural Language Processing | The A&M internationals",
            ar: "معالجة اللغة الطبيعية | A&M الدولية",
        }) as any)[locale],
        description: (t({
            en: "Advanced NLP solutions for text analysis, sentiment detection, and automated language understanding.",
            ar: "حلول معالجة اللغة الطبيعية المتقدمة لتحليل النصوص وكشف المشاعر وفهم اللغة المؤتمت.",
        }) as any)[locale],
    };
}

export default function NLPPage() {
    return <NLPClient />;
}