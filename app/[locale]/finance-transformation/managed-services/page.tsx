import type { Metadata } from 'next';
import FinanceTransformationPage from "../FinanceTransformationPage";

export const metadata: Metadata = {
    title: "Managed Services | The A&M Internationals",
    description: "Ongoing Oracle EPM support: Consulting-as-a-Service, Solution Management, Monthly Update Testing, Monthly Maintenance and EPM Staffing.",
}

export default function ManagedServicesPage() {
    return <FinanceTransformationPage initialTab="managed" />;
}