import type { Metadata } from 'next';
import AiAutomationsHero from "./AiAutomationsHero";
import AiAutomationsServices from "./AiAutomationsServices";

export const metadata: Metadata = {
    title: "AI Automations | The A&M Internationals",
    description: "Transform your business with cutting-edge AI and machine learning solutions. Automate workflows, enhance decision-making, and unlock unprecedented efficiency.",
    keywords: "AI automation, artificial intelligence, machine learning, business automation, intelligent workflows, RPA, generative AI",
}

export default function AIAutomationsPage() {
    return (
        <main>
            <AiAutomationsHero />
            <AiAutomationsServices />
        </main>
    );
}