import type { Metadata } from 'next';
import { t } from "intlayer";
import VideoProductionClient from "./VideoProductionClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: t({
            en: "Video Production | The A&M internationals",
            ar: "إنتاج الفيديو | A&M الدولية",
        })[locale as 'en' | 'ar'],
        description: t({
            en: "Professional video production services to tell your brand story through high-quality visuals.",
            ar: "خدمات إنتاج فيديو احترافية لسرد قصة علامتك التجارية من خلال مرئيات عالية الجودة.",
        })[locale as 'en' | 'ar'],
    };
}

export default function VideoProductionPage() {
    return <VideoProductionClient />;
}