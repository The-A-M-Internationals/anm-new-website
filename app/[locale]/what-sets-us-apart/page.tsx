import type { Metadata } from "next";
import WhatSetsUsApartPage from "./WhatSetsUsApartPage";

export const metadata: Metadata = {
    title: "What Sets Us Apart | The A&M internationals",
    description: "Discover what makes The A&M internationals different. Our global reach, integrated strategy, and commitment to long-term partnerships set us apart.",
}

export default function Page() {
    return (
        <WhatSetsUsApartPage />
    )
}
