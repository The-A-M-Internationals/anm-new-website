import type { Metadata } from 'next';
import FinanceTransformationPage from "../FinanceTransformationPage";

export const metadata: Metadata = {
    title: "Transformational Services | The A&M internationals",
    description: "Oracle EPM services — Planning & Budgeting, Financial Consolidation, Account Reconciliation, Enterprise Data Management, and more.",
}

export default function TransformationalServicesPage() {
    return <FinanceTransformationPage initialTab="transformational" />;
}