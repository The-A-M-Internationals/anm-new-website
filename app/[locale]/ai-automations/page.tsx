import type { Metadata } from 'next';
import Hero from "../../components/homePageComponents/Hero";
import Services from "../../components/Services";
import Events from "../../components/Events";
import Innovation from "../../components/Innovation";

export const metadata: Metadata = {
    title: "AI Automations | The A&M Internationals",
    description: "RPA, generative AI, and machine learning that eliminate manual effort, accelerate decisions, and create competitive advantage.",
}

export default function AIAutomationsPage() {
    return (
        <div>
            <Hero />
            <Services />
            <Events />
            <Innovation />
        </div>
    );
}