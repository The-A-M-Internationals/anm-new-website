import type { Metadata } from 'next';
import { t } from "intlayer";
import MachineLearningClient from "./MachineLearningClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: t({
            en: "Machine Learning | The A&M internationals",
            ar: "تعلم الآلة | A&M الدولية",
        })[locale as 'en' | 'ar'],
        description: t({
            en: "Advanced machine learning models and predictive analytics to drive business intelligence.",
            ar: "نماذج تعلم الآلة المتقدمة والتحليلات التنبؤية لتعزيز ذكاء الأعمال.",
        })[locale as 'en' | 'ar'],
    };
}

export default function MachineLearningPage() {
    return <MachineLearningClient />;
}