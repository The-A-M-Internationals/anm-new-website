import type { Metadata } from 'next';
import { getTranslation } from "intlayer";
import VideoProductionClient from "./VideoProductionClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: getTranslation({
            en: "Video Production | The A&M Internationals",
            ar: "إنتاج الفيديو | A&M الدولية",
        }, locale),
        description: getTranslation({
            en: "Professional video production services to tell your brand story through high-quality visuals.",
            ar: "خدمات إنتاج فيديو احترافية لسرد قصة علامتك التجارية من خلال مرئيات عالية الجودة.",
        }, locale),
    };
}

export default function VideoProductionPage() {
    return <VideoProductionClient />;
}