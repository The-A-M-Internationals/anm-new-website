import type { Metadata } from "next";
import Innovation from "../../components/Innovation";
import ChildWelfareImpact from "./components/ChildWelfareImpact";
import DrivingImpactDashboard from "./components/DrivingImpactDashboard";

export const metadata: Metadata = {
    title: "Our Impact | The A&M Internationals",
    description: "Discover the impactful initiatives of The A&M Internationals, showcasing our commitment to driving positive change in the global market.",
}

export default function ImpactsPage() {
    return (
        <div>
            <section className="snap-section"><DrivingImpactDashboard /></section>
            <section className="snap-section"><ChildWelfareImpact /></section>
            <section className="snap-section"><Innovation /></section>
        </div>
    )
}
