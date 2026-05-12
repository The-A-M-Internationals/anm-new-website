import type { Metadata } from 'next';
import { t } from "intlayer";
import GenerativeAIClient from "./GenerativeAIClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: t({
            en: "Generative AI | The A&M internationals",
            ar: "الذكاء الاصطناعي التوليدي | A&M الدولية",
        })[locale as 'en' | 'ar'],
        description: t({
            en: "Cutting-edge generative AI solutions including LLMs, image generation, and creative automation.",
            ar: "حلول الذكاء الاصطناعي التوليدي المتطورة بما في ذلك نماذج اللغة الكبيرة وتوليد الصور والأتمتة الإبداعية.",
        })[locale as 'en' | 'ar'],
    };
}

export default function GenerativeAIPage() {
    return <GenerativeAIClient />;
}