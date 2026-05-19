import type { Metadata } from 'next';
import DigitalMarketingHero from "./DigitalMarketingHero";
import DigitalMarketingServices from "./DigitalMarketingServices";

export const metadata: Metadata = {
    title: "Digital Marketing & Growth Services | The A&M Internationals",
    description: "Elevate your brand with data-driven marketing strategies including video production, social media management, branding, web development, and photography.",
}

export default function DigitalMarketingPage() {
    return (
        <div>
            <DigitalMarketingHero />
            <DigitalMarketingServices />
        </div>
    );
}