import type { Metadata } from 'next';
import { t } from "intlayer";
import RPAClient from "./RPAClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: (t({
            en: "Robotic Process Automation | The A&M internationals",
            ar: "أتمتة العمليات الروبوتية | A&M الدولية",
        }) as any)[locale],
        description: (t({
            en: "Advanced RPA solutions to automate repetitive tasks and enhance business productivity.",
            ar: "حلول أتمتة العمليات الروبوتية المتقدمة لأتمتة المهام المتكررة وتعزيز إنتاجية العمل.",
        }) as any)[locale],
    };
}

export default function RPAPage() {
    return <RPAClient />;
}