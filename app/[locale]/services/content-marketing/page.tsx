import type { Metadata } from 'next';
import { getTranslation } from "intlayer";
import ContentMarketingClient from "./ContentMarketingClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: getTranslation({
            en: "Content Marketing | The A&M Internationals",
            ar: "تسويق المحتوى | A&M الدولية",
        }, locale),
        description: getTranslation({
            en: "Strategic content marketing solutions to engage your audience and build brand authority.",
            ar: "حلول تسويق المحتوى الاستراتيجية لإشراك جمهورك وبناء سلطة علامتك التجارية.",
        }, locale),
    };
}

export default function ContentMarketingPage() {
    return <ContentMarketingClient />;
}