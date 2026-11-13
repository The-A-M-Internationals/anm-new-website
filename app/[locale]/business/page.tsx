import type { Metadata } from "next";
import BusinessPage from "./BusinessPage";
import { getCollection } from "@/lib/cms/server";
import { byOrder } from "@/lib/cms/siteContent";
import { getTranslation } from "intlayer";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: getTranslation({
            en: "About Us | The A&M Internationals",
            ar: "من نحن | A&M الدولية",
        }, locale),
        description: getTranslation({
            en: "Discover how The A&M Internationals empowers businesses with innovative solutions and social responsibility. Learn about our journey and impact.",
            ar: "اكتشف كيف تمكّن A&M الدولية الأعمال بحلول مبتكرة ومسؤولية مجتمعية. تعرّف على رحلتنا وأثرنا.",
        }, locale),
    };
}

export default async function Page() {
    // Founders and team from the admin portal (built-in list if none saved)
    const [founders, team] = await Promise.all([getCollection("founders"), getCollection("team")]);
    return (
        <BusinessPage
            founders={founders?.length ? byOrder(founders) : undefined}
            team={team?.length ? byOrder(team) : undefined}
        />
    )
}

// Admin edits show within a minute
export const revalidate = 60;