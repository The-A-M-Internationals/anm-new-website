import type { Metadata } from "next";
import MethodologyPage from "./MethodologyPage";


export const metadata: Metadata = {
    title: "Methodology | A&M International",
    description: "Explore A&M International's proven methodology for delivering safe, fast, and measurable transformation in the global market.",
}

export default function Page() {
    return (
        <MethodologyPage />
    )
}