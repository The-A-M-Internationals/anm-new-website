import type { Metadata } from 'next';
import DigitalMarketingHero from "./DigitalMarketingHero";
import DigitalMarketingServices from "./DigitalMarketingServices";
import Events from "../../components/Events";
import Innovation from "../../components/Innovation";

export const metadata: Metadata = {
    title: "Digital Transformation | The A&M Internationals",
    description: "Cloud migration, ERP implementation, and data modernisation that transforms how your business operates and competes globally.",
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