import type { Metadata } from 'next';
import FinanceTransformationPage from "../FinanceTransformationPage";

export const metadata: Metadata = {
    title: "Managed Services | A&M Internationals",
    description: "Ongoing EPM support — Consulting-as-a-Service, Solution Management, Version Upgrades, and Monthly Maintenance.",
}

export default function ManagedServicesPage() {
    return <FinanceTransformationPage initialTab="managed" />;
}