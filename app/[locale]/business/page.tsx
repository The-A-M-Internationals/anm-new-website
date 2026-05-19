import type { Metadata } from "next";
import BusinessPage from "./BusinessPage";

export const metadata: Metadata = {
    title: "Business Service | The A&M internationals",
    description: "Discover how The A&M internationals empowers businesses with innovative solutions and social responsibility. Learn about our journey and impact.",
};

export default function Page() {
    return (
        <BusinessPage />
    )
}