import type { Metadata } from "next";
import FeaturesPage from "./FeaturesPage";

export const metadata: Metadata = {
    title: "Features | A&M Internationals",
    description: "Explore the features of A&M Internationals's EPM Suite, designed to optimize your business performance and drive growth.",
}

export default function Page() {
    return (
        <FeaturesPage />
    )
}