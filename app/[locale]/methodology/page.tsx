import type { Metadata } from "next";
import MethodologyPage from "./MethodologyPage";


export const metadata: Metadata = {
    title: "Methodology | The A&M Internationals",
    description: "Explore The A&M Internationals's proven methodology for delivering safe, fast, and measurable transformation in the global market.",
}

export default function Page() {
    return (
        <MethodologyPage />
    )
}