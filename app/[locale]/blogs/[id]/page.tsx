import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslation } from "intlayer";
import { getEntry } from "@/lib/cms/server";
import { localizedField } from "../articleFields";
import ArticleHeader from "./ArticleHeader";
import ArticleBody from "./ArticleBody";
import { articleDetailLabels as L } from "./articleDetail.labels";

// Articles come from Firebase: refresh at most once a minute so edits show up
export const revalidate = 60;

type Props = { params: Promise<{ locale: string; id: string }> };

/** The article, or notFound() when there is no such document */
async function loadArticle(id: string) {
    const entry = await getEntry("articles", decodeURIComponent(id));
    if (entry === null) notFound();
    // undefined = Firebase could not be read: show the error page instead of a cached 404
    if (entry === undefined) throw new Error(`Could not load article "${id}"`);
    return entry;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, id } = await params;
    const entry = await getEntry("articles", decodeURIComponent(id));
    if (!entry) return { title: getTranslation(L.notFoundTitle, locale) + getTranslation(L.titleSuffix, locale) };
    return {
        title: localizedField(entry.data, "title", locale) + getTranslation(L.titleSuffix, locale),
        description: localizedField(entry.data, "description", locale) || undefined,
    };
}

export default async function ArticlePage({ params }: Props) {
    const { locale, id } = await params;
    const { data } = await loadArticle(id);
    // Body is markdown; the Arabic page uses bodyAr (or body_ar) and falls back to English
    const body = localizedField(data, "body", locale) || localizedField(data, "description", locale);

    return (
        <article className="bg-[#F4F6F9] py-12 md:py-20 px-4">
            <div className="max-w-4xl mx-auto bg-white border border-slate-200/80 rounded-xl shadow-xs overflow-hidden">
                <ArticleHeader data={data} locale={locale} backLabel={getTranslation(L.backToBlog, locale)} />
                <div className="px-6 md:px-12 pb-12 pt-8 text-start">
                    <ArticleBody markdown={body} />
                </div>
            </div>
        </article>
    );
}
