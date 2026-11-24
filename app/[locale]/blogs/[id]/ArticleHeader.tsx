import Image from "next/image";
import Link from "next/link";
import type { DocumentData } from "firebase/firestore";
import { ArrowLeft, Clock, User } from "lucide-react";
import BlogCover from "../components/BlogCover";
import { articleImage, localizedField } from "../articleFields";

/** First tag of the article (Arabic tags when present), else its category */
function articleTag(data: DocumentData, locale: string): string {
    const tags = (locale === "ar" && (data.tagsAr || data.tags_ar)) || data.tags;
    if (Array.isArray(tags) && tags.length > 0) return String(tags[0]);
    return localizedField(data, "category", locale);
}

export default function ArticleHeader({ data, locale, backLabel }: { data: DocumentData; locale: string; backLabel: string }) {
    const title = localizedField(data, "title", locale);
    const authors = localizedField(data, "authors", locale);
    const readTime = localizedField(data, "readTime", locale);
    const tag = articleTag(data, locale);
    const image = articleImage(data);

    return (
        <header>
            <div className="px-6 md:px-12 pt-8 md:pt-10 text-start">
                <Link
                    href={`/${locale}/blogs`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] hover:text-[#B8962E] transition-all duration-150 ease-in-out cursor-pointer mb-6"
                >
                    <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                    {backLabel}
                </Link>

                {tag && (
                    <div className="bg-[#FFFBED] text-[#D4AF37] px-3 py-1.5 rounded-full w-fit text-sm font-medium mb-4">{tag}</div>
                )}

                <h1 className="text-3xl md:text-5xl font-semibold text-black leading-tight mb-5">{title}</h1>

                <div className="flex flex-wrap gap-3 mb-8">
                    {authors && (
                        <span className="flex items-center gap-2 border border-[#D9D9D9] rounded-full px-3 py-1.5 text-sm text-black">
                            <User className="w-4 h-4 text-[#D4AF37]" />
                            {authors}
                        </span>
                    )}
                    {readTime && (
                        <span className="flex items-center gap-2 border border-[#D9D9D9] rounded-full px-3 py-1.5 text-sm font-medium text-black">
                            <Clock className="w-4 h-4 text-[#D4AF37]" />
                            {readTime}
                        </span>
                    )}
                </div>
            </div>

            {/* Cover: photo when set, otherwise the navy/gold title graphic */}
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        priority
                        unoptimized={image.startsWith("http")}
                        sizes="(max-width: 896px) 100vw, 896px"
                        className="object-cover"
                    />
                ) : (
                    <BlogCover title={title} />
                )}
            </div>
        </header>
    );
}
