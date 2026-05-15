import type { Metadata } from 'next';
import DigitalMarketingHero from "./DigitalMarketingHero";
import DigitalMarketingServices from "./DigitalMarketingServices";
import Events from "../../components/Events";
import Innovation from "../../components/Innovation";
import { t } from "intlayer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    
    return {
        title: (t({
            en: "Digital Transformation | The A&M internationals",
            ar: "التحول الرقمي | A&M الدولية",
        }) as any)[locale],
        description: (t({
            en: "Cloud migration, ERP implementation, and data modernisation that transforms how your business operates and competes globally.",
            ar: "ترحيل السحابة وتحديث تخطيط موارد المؤسسات وتحديث البيانات الذي يحول طريقة عمل عملك ومنافسته عالميًا.",
        }) as any)[locale],
    };
}

export default function DigitalTransformationPage() {
    return (
        <div>
            <DigitalMarketingHero />
            <DigitalMarketingServices />
            <Events />
            <Innovation />
        </div>
    );
}