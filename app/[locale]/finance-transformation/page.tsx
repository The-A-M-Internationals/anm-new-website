import type { Metadata } from 'next';
import FinanceTransformationPage from "./FinanceTransformationPage";

export const metadata: Metadata = {
    title: "Services | The A&M Internationals",
    description: "Oracle EPM services that make finance run smoother, from first implementation to month-end support.",
}

export default function ServicePage() {
    return (
        <FinanceTransformationPage />
    )
}