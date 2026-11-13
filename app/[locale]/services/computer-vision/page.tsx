import type { Metadata } from 'next';
import { getTranslation } from "intlayer";
import ComputerVisionClient from "./ComputerVisionClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: getTranslation({
            en: "Computer Vision | The A&M Internationals",
            ar: "رؤية الكمبيوتر | A&M الدولية",
        }, locale),
        description: getTranslation({
            en: "Advanced computer vision solutions for image and video analysis using AI.",
            ar: "حلول رؤية الكمبيوتر المتقدمة لتحليل الصور والفيديو باستخدام الذكاء الاصطناعي.",
        }, locale),
    };
}

export default function ComputerVisionPage() {
    return <ComputerVisionClient />;
}