import type { Metadata } from "next";
import CareersPage from "./CareersPage";

export const metadata: Metadata = {
    title: "Careers | The A&M internationals",
    description: "Join our team that builds the future with purpose and innovation at The A&M internationals.",
}

export default function Page() {
    return (
        <CareersPage />
    )
}