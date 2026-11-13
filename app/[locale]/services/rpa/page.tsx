import type { Metadata } from 'next';
import { getTranslation } from "intlayer";
import RPAClient from "./RPAClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: getTranslation({
            en: "Robotic Process Automation | The A&M Internationals",
            ar: "أتمتة العمليات الروبوتية | A&M الدولية",
        }, locale),
        description: getTranslation({
            en: "Advanced RPA solutions to automate repetitive tasks and enhance business productivity.",
            ar: "حلول أتمتة العمليات الروبوتية المتقدمة لأتمتة المهام المتكررة وتعزيز إنتاجية العمل.",
        }, locale),
    };
}

export default function RPAPage() {
    return <RPAClient />;
}