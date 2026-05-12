import type { Metadata } from "next";
import FeaturesPage from "./FeaturesPage";

export const metadata: Metadata = {
    title: "Features | The A&M internationals",
    description: "Explore the features of The A&M internationals's EPM Suite, designed to optimize your business performance and drive growth.",
}

export default function Page() {
    return (
        <FeaturesPage />
    )
}