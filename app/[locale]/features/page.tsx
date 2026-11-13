import type { Metadata } from "next";
import FeaturesPage from "./FeaturesPage";

export const metadata: Metadata = {
    title: "Features | The A&M Internationals",
    description: "EPM Build Agent: AI that helps build Oracle EPM. Join early access.",
}

export default function Page() {
    return (
        <FeaturesPage />
    )
}