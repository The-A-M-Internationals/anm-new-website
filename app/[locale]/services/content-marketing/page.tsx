import type { Metadata } from 'next';
import { t } from "intlayer";
import ContentMarketingClient from "./ContentMarketingClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: (t({
            en: "Content Marketing | The A&M internationals",
            ar: "تسويق المحتوى | A&M الدولية",
        }) as any)[locale],
        description: (t({
            en: "Strategic content marketing solutions to engage your audience and build brand authority.",
            ar: "حلول تسويق المحتوى الاستراتيجية لإشراك جمهورك وبناء سلطة علامتك التجارية.",
        }) as any)[locale],
    };
}

export default function ContentMarketingPage() {
    return <ContentMarketingClient />;
}