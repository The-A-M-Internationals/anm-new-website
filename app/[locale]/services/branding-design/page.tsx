import type { Metadata } from 'next';
import { t } from "intlayer";
import BrandingDesignClient from "./BrandingDesignClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: t({
            en: "Branding & Design | The A&M internationals",
            ar: "العلامة التجارية والتصميم | A&M الدولية",
        })[locale as 'en' | 'ar'],
        description: t({
            en: "Strategic branding and distinctive visual design to elevate your brand identity.",
            ar: "العلامة التجارية الاستراتيجية والتصميم البصري المميز للارتقاء بهوية علامتك التجارية.",
        })[locale as 'en' | 'ar'],
    };
}

export default function BrandingDesignPage() {
    return <BrandingDesignClient />;
}