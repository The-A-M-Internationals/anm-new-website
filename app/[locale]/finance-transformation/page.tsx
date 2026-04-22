import type { Metadata } from 'next';
import FinanceTransformationPage from "./FinanceTransformationPage";

export const metadata: Metadata = {
    title: "Services | A&M International",
    description: "Discover our comprehensive range of services. From enterprise performance management to cloud transformation.",
}

export default function ServicePage() {
    return (
        <FinanceTransformationPage />
    )
}