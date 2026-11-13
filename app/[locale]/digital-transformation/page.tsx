import type { Metadata } from 'next';
import DigitalMarketingHero from "./DigitalMarketingHero";
import DigitalMarketingServices from "./DigitalMarketingServices";
import EventsSection from "../../components/EventsSection";
import Innovation from "../../components/Innovation";
import { getTranslation } from "intlayer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    
    return {
        title: getTranslation({
            en: "Digital Services | The A&M Internationals",
            ar: "الخدمات الرقمية | A&M الدولية",
        }, locale),
        description: getTranslation({
            en: "Cloud migration, ERP implementation, and data modernisation that transforms how your business operates and competes globally.",
            ar: "ترحيل السحابة وتحديث تخطيط موارد المؤسسات وتحديث البيانات الذي يحول طريقة عمل عملك ومنافسته عالميًا.",
        }, locale),
    };
}

export default function DigitalMarketingPage() {
    return (
        <div>
            <section className="snap-section"><DigitalMarketingHero /></section>
            <section className="snap-section"><DigitalMarketingServices /></section>
            <section className="snap-section"><EventsSection /></section>
            <section className="snap-section"><Innovation /></section>
        </div>
    );
}
// Events come from Firebase: rebuild this page at most once a minute so new posts show up
export const revalidate = 60;
