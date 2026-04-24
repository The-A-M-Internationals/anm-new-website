import type { Metadata } from "next";
import BusinessPage from "./BusinessPage";

export const metadata: Metadata = {
    title: "Business Service | A&M International",
    description: "Discover how A&M International empowers businesses with innovative solutions and social responsibility. Learn about our journey and impact.",
};

export default function Page() {
    return (
        <BusinessPage />
    )
}