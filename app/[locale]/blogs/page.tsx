import type { Metadata } from "next";
import BlogsPage from "./BlogsPage";


export const metadata: Metadata = {
    title: "Blogs | The A&M internationals",
    description: "Read the latest blogs and insights from The A&M internationals.",
};

export default function Page() {
    return(
        <BlogsPage />
    )
}