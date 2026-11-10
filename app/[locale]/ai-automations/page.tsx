import type { Metadata } from 'next';
import AIAutomationsHero from "./AiAutomationsHero";
import AiAutomationsServices from "./AiAutomationsServices";
import EventsSection from "../../components/EventsSection";
import Innovation from "../../components/Innovation";
import { t } from "intlayer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: (t({
            en: "AI Automations | The A&M Internationals",
            ar: "أتمتة الذكاء الاصطناعي | A&M الدولية",
        }) as any)[locale],
        description: (t({
            en: "RPA, generative AI, and machine learning that eliminate manual effort, accelerate decisions, and create competitive advantage.",
            ar: "أتمتة العمليات الروبوتية والذكاء الاصطناعي التوليدي والتعلم الآلي الذي يلغي الجهد اليدوي ويسرع القرارات ويخلق ميزة تنافسية.",
        }) as any)[locale],
    };
}

export default function AIAutomationsPage() {
    return (
        <div>
            <section className="snap-section"><AIAutomationsHero /></section>
            <section className="snap-section"><AiAutomationsServices /></section>
            <section className="snap-section"><EventsSection /></section>
            <section className="snap-section"><Innovation /></section>
        </div>
    );
}
// Events come from Firebase: rebuild this page at most once a minute so new posts show up
export const revalidate = 60;
