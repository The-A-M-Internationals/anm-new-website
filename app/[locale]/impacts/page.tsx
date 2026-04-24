import type { Metadata } from "next";
import Innovation from "../../components/Innovation";
import ChildWelfareImpact from "./components/ChildWelfareImpact";
import DrivingImpactDashboard from "./components/DrivingImpactDashboard";
import Event from "./components/Event";
import Numbers from "./components/Numbers";

export const metadata: Metadata = {
    title: "Impacts | A&M International",
    description: "Discover the impactful initiatives of A&M International, showcasing our commitment to driving positive change in the global market.",
}

export default function ImpactsPage() {
    return (
        <div>
            <DrivingImpactDashboard />
            <Numbers />
            <Event />
            <ChildWelfareImpact />
            <Innovation />
        </div>
    )
}