import type { Metadata } from 'next';
import { t } from "intlayer";
import SocialMediaClient from "./SocialMediaClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: t({
            en: "Social Media Management | The A&M internationals",
            ar: "إدارة وسائل التواصل الاجتماعي | A&M الدولية",
        })[locale as 'en' | 'ar'],
        description: t({
            en: "Expert social media management to grow your presence and engage with your audience across platforms.",
            ar: "إدارة خبيرة لوسائل التواصل الاجتماعي لزيادة تواجدك والتفاعل مع جمهورك عبر المنصات.",
        })[locale as 'en' | 'ar'],
    };
}

export default function SocialMediaPage() {
    return <SocialMediaClient />;
}