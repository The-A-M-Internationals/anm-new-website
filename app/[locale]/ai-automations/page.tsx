import type { Metadata } from 'next';
import AIAutomationsHero from "./AiAutomationsHero";
import AiAutomationsServices from "./AiAutomationsServices";
import Events from "../../components/Events";
import Innovation from "../../components/Innovation";
import { t } from "intlayer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: t({
            en: "AI Automations | The A&M internationals",
            ar: "أتمتة الذكاء الاصطناعي | A&M الدولية",
        })[locale as 'en' | 'ar'],
        description: t({
            en: "RPA, generative AI, and machine learning that eliminate manual effort, accelerate decisions, and create competitive advantage.",
            ar: "أتمتة العمليات الروبوتية والذكاء الاصطناعي التوليدي والتعلم الآلي الذي يلغي الجهد اليدوي ويسرع القرارات ويخلق ميزة تنافسية.",
        })[locale as 'en' | 'ar'],
    };
}

export default function AIAutomationsPage() {
    return (
        <div>
            <AIAutomationsHero />
            <AiAutomationsServices />
            <Events />
            <Innovation />
        </div>
    );
}