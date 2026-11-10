import type { Metadata } from "next";
import BlogsPage from "./BlogsPage";
import { getCollection } from "@/lib/cms/server";


export const metadata: Metadata = {
    title: "Blogs | The A&M Internationals",
    description: "Read the latest blogs and insights from The A&M Internationals.",
};

// Articles come from Firebase: rebuild this page at most once a minute so new posts show up
export const revalidate = 60;

export default async function Page() {
    return(
        <BlogsPage articles={await getCollection("articles")} />
    )
}
