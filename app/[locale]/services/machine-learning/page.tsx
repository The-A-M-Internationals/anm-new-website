import type { Metadata } from 'next';
import { getTranslation } from "intlayer";
import MachineLearningClient from "./MachineLearningClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: getTranslation({
            en: "Machine Learning | The A&M Internationals",
            ar: "تعلم الآلة | A&M الدولية",
        }, locale),
        description: getTranslation({
            en: "Advanced machine learning models and predictive analytics to drive business intelligence.",
            ar: "نماذج تعلم الآلة المتقدمة والتحليلات التنبؤية لتعزيز ذكاء الأعمال.",
        }, locale),
    };
}

export default function MachineLearningPage() {
    return <MachineLearningClient />;
}