import type { Metadata } from "next";
import CareersPage from "./CareersPage";
import { getCollection } from "@/lib/cms/server";

export const metadata: Metadata = {
    title: "Careers | The A&M Internationals",
    description: "Join our team that builds the future with purpose and innovation at The A&M Internationals.",
}

// Jobs come from Firebase: rebuild this page at most once a minute so new posts show up
export const revalidate = 60;

export default async function Page() {
    return (
        <CareersPage jobs={await getCollection("jobs")} />
    )
}
