"use client";
import Image from "next/image";
import { Calendar, Clock, Users, UserSquare2 } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../lib/firebaseConfig";
import { useIntlayer, useLocale } from "next-intlayer";

interface ArticleType {
    id: string;
    category: string;
    title: string;
    description: string;
    authors: string;
    readTime: string;
    tags?: string[];
    externalLink?: string;
    imageUrl?: string;
    featureArticle?: boolean;
    // Localized fields
    title_ar?: string;
    description_ar?: string;
    category_ar?: string;
    authors_ar?: string;
    readTime_ar?: string;
}

const Article = () => {
    const { locale } = useLocale();
    const content = useIntlayer("blogsFeatureArticle");
    const [article, setArticle] = useState<ArticleType | null>(null);
    const [loading, setLoading] = useState(true);

    // Helper to get localized content
    const getLocalizedContent = (field: keyof ArticleType) => {
        if (!article) return "";
        const arField = `${field}_ar` as keyof ArticleType;
        if (locale === 'ar' && article[arField]) {
            return article[arField] as string;
        }
        return article[field] as string;
    };

    useEffect(() => {
        const fetchFeatureArticle = async () => {
            try {
                const q = query(collection(db, "articles"), where("featureArticle", "in", [true, "true", "Yes"]));
                const snap = await getDocs(q);
                if (!snap.empty) {
                    const doc = snap.docs[0];
                    setArticle({ id: doc.id, ...doc.data() } as ArticleType);
                }
            } catch (err) {
                console.error("Error fetching feature article:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatureArticle();
    }, []);

    if (loading) {
        return <div className="text-center py-20">{content.loading}</div>;
    }

    if (!article) {
        return <div className="text-center py-20">{content.noneFound}</div>;
    }

    return (
        <div id="article" className="bg-[#FFFBED] flex flex-col items-center justify-center gap-10 py-12 md:py-20 lg:py-24 px-4 md:px-4">
            {/* Title */}
            <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-semibold text-black">
                    {content.sectionTitlePrefix} <span className="text-[#D4AF37]">{content.sectionTitleHighlight}</span>
                </h2>
            </div>

            {/* Article Card */}
            <div className="w-full md:max-w-7xl">
                <div className="bg-white rounded-[40px] shadow-lg border border-gray-100 overflow-hidden p-2 md:p-5 ">
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-[30px]">
                        {/* Image Section - Top for mobile/tablet, Left for desktop */}
                        <div className="w-full lg:w-[30%] flex-shrink-0">
                            <div className="relative w-full h-[230px] lg:h-full min-h-[400px]">
                                <Image
                                    src={article.imageUrl || "/blogs/event.jpg"}
                                    alt={article.title || content.imageAltFallback}
                                    fill
                                    className="object-cover rounded-[40px]"
                                />
                            </div>
                        </div>

                        {/* Content Section - Below for mobile/tablet, Right for desktop */}
                        <div className="w-full lg:w-[70%] p-5 lg:p-10 flex flex-col justify-center bg-linear-to-r from-[#FFFFFF] to-[#FFFBED] border  border-[#D9D9D9] rounded-[40px] shadow-lg">
                            {/* Category Badge */}
                            <div className="inline-flex items-center gap-2 text-[#D4AF37] text-sm font-medium mb-5 bg-[#FFFEF8] rounded-full md:px-4 py-2 w-fit">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.33203 10.6663L6.66536 8.66634M9.33203 7.33301L12.6654 5.33301M7.9987 3.33301V6.66634M7.9987 9.33301V12.6663M3.33203 5.33301L6.66536 7.33301M9.33203 8.66634L12.6654 10.6663M13.6654 5.99967V9.66634M8.9987 13.6663L12.6654 11.6663M2.9987 11.6663L6.9987 13.6663M2.33203 9.99967V5.99967M2.9987 4.33301L6.9987 2.33301M12.9987 4.33301L8.9987 2.33301" stroke="#D4AF37" strokeLinejoin="round" />
                                    <path d="M8 3.33301C8.55228 3.33301 9 2.88529 9 2.33301C9 1.78072 8.55228 1.33301 8 1.33301C7.44772 1.33301 7 1.78072 7 2.33301C7 2.88529 7.44772 3.33301 8 3.33301Z" stroke="#D4AF37" strokeLinejoin="round" />
                                    <path d="M8 14.666C8.55228 14.666 9 14.2183 9 13.666C9 13.1137 8.55228 12.666 8 12.666C7.44772 12.666 7 13.1137 7 13.666C7 14.2183 7.44772 14.666 8 14.666Z" stroke="#D4AF37" strokeLinejoin="round" />
                                    <path d="M2.33203 6C2.88432 6 3.33203 5.55228 3.33203 5C3.33203 4.44772 2.88432 4 2.33203 4C1.77975 4 1.33203 4.44772 1.33203 5C1.33203 5.55228 1.77975 6 2.33203 6Z" stroke="#D4AF37" strokeLinejoin="round" />
                                    <path d="M13.6641 6C14.2163 6 14.6641 5.55228 14.6641 5C14.6641 4.44772 14.2163 4 13.6641 4C13.1118 4 12.6641 4.44772 12.6641 5C12.6641 5.55228 13.1118 6 13.6641 6Z" stroke="#D4AF37" strokeLinejoin="round" />
                                    <path d="M13.6641 12C14.2163 12 14.6641 11.5523 14.6641 11C14.6641 10.4477 14.2163 10 13.6641 10C13.1118 10 12.6641 10.4477 12.6641 11C12.6641 11.5523 13.1118 12 13.6641 12Z" stroke="#D4AF37" strokeLinejoin="round" />
                                    <path d="M2.33203 12C2.88432 12 3.33203 11.5523 3.33203 11C3.33203 10.4477 2.88432 10 2.33203 10C1.77975 10 1.33203 10.4477 1.33203 11C1.33203 11.5523 1.77975 12 2.33203 12Z" stroke="#D4AF37" strokeLinejoin="round" />
                                    <path d="M7.9974 6.5L9.33073 7.25V8.75L7.9974 9.5L6.66406 8.75V7.25L7.9974 6.5Z" stroke="#D4AF37" strokeLinejoin="round" />
                                </svg>
                                <span>{getLocalizedContent('category')}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl md:text-[28px] text-black mb-4 leading-tight">
                                {getLocalizedContent('title')}
                            </h3>

                            {/* Description */}
                            <p className="text-[#6B7280] text-base md:text-[20px] mb-6 leading-relaxed">
                                {getLocalizedContent('description')}
                            </p>

                            {/* Date and Time Row */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10Z" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M17 18C17 16.6739 16.4732 15.4021 15.5355 14.4645C14.5979 13.5268 13.3261 13 12 13C10.6739 13 9.40215 13.5268 8.46447 14.4645C7.52678 15.4021 7 16.6739 7 18" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M21 13V11C21 7.229 21 5.343 19.828 4.172C18.656 3.001 16.771 3 13 3H11C7.229 3 5.343 3 4.172 4.172C3.001 5.344 3 7.229 3 11V13C3 16.771 3 18.657 4.172 19.828C5.344 20.999 7.229 21 11 21H13C16.771 21 18.657 21 19.828 19.828C20.999 18.656 21 16.771 21 13Z" stroke="#D4AF37" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round" />
                                    </svg>

                                    <span className="text-black text-[16px]">
                                        {getLocalizedContent('authors')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white">
                                    <Clock className="w-5 h-5 text-[#D4AF37]" />
                                    <span className="text-black font-medium">
                                        {getLocalizedContent('readTime') || (locale === 'ar' ? "9 صباحًا - 6 مساءً" : "9 am - 6 pm")}
                                    </span>
                                </div>
                            </div>

                            {/* CTA Button */}
                            {article.externalLink && (
                                <a
                                    href={article.externalLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-[#D4AF37]   text-black font-semibold px-8 py-3.5 rounded-full transition-all hover:scale-105 shadow-md w-full md:w-auto"
                                >
                                    <span>{content.readFullArticle}</span>
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;