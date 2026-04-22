import type { Metadata } from "next";
import BlogsPage from "./BlogsPage";


export const metadata: Metadata = {
    title: "Blogs | A&M International",
    description: "Read the latest blogs and insights from A&M International.",
};

export default function Page() {
    return(
        <BlogsPage />
    )
}