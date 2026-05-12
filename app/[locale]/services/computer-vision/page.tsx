import type { Metadata } from 'next';
import { t } from "intlayer";
import ComputerVisionClient from "./ComputerVisionClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: t({
            en: "Computer Vision | The A&M internationals",
            ar: "رؤية الكمبيوتر | A&M الدولية",
        })[locale as 'en' | 'ar'],
        description: t({
            en: "Advanced computer vision solutions for image and video analysis using AI.",
            ar: "حلول رؤية الكمبيوتر المتقدمة لتحليل الصور والفيديو باستخدام الذكاء الاصطناعي.",
        })[locale as 'en' | 'ar'],
    };
}

export default function ComputerVisionPage() {
    return <ComputerVisionClient />;
}