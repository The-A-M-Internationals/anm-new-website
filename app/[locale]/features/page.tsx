import type { Metadata } from "next";
import FeaturesPage from "./FeaturesPage";

export const metadata: Metadata = {
    title: "Features | A&M International",
    description: "Explore the features of A&M International's EPM Suite, designed to optimize your business performance and drive growth.",
}

export default function Page() {
    return (
        <FeaturesPage />
    )
}