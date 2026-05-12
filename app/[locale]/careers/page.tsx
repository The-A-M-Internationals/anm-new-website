import type { Metadata } from "next";
import CareersPage from "./CareersPage";

export const metadata: Metadata = {
    title: "Careers | A&M Internationals",
    description: "Join our team that builds the future with purpose and innovation at A&M Internationals.",
}

export default function Page() {
    return (
        <CareersPage />
    )
}