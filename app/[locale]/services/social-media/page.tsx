import type { Metadata } from 'next';
import { getTranslation } from "intlayer";
import SocialMediaClient from "./SocialMediaClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: getTranslation({
            en: "Social Media Management | The A&M Internationals",
            ar: "إدارة وسائل التواصل الاجتماعي | A&M الدولية",
        }, locale),
        description: getTranslation({
            en: "Expert social media management to grow your presence and engage with your audience across platforms.",
            ar: "إدارة خبيرة لوسائل التواصل الاجتماعي لزيادة تواجدك والتفاعل مع جمهورك عبر المنصات.",
        }, locale),
    };
}

export default function SocialMediaPage() {
    return <SocialMediaClient />;
}