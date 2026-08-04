"use client";

import React, { useEffect, useState } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../lib/firebaseConfig";
import { useIntlayer, useLocale } from "next-intlayer";

// Article Interface
export interface Article {
    id: string;
    category: string;
    categoryAr?: string;
    title: string;
    titleAr?: string;
    description: string;
    descriptionAr?: string;
    authors: string;
    authorsAr?: string;
    readTime: string;
    readTimeAr?: string;
    tags: string[];
    tagsAr?: string[];
    externalLink: string;
    featureArticle: boolean;
    createdAt?: { seconds: number; nanoseconds: number };
}

const BlogArticleList = () => {
    const content = useIntlayer("blogsArticleList");
    const { locale } = useLocale();
    const [activeFilter, setActiveFilter] = useState<string>('All Post');
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const [showMobileTags, setShowMobileTags] = useState(false);

    // Define filters with fixed keys for matching and localized labels
    const filterOptions = [
        { key: "All Post", label: content.filters.allPost.value },
        { key: "EPM Strategy", label: content.filters.epmStrategy.value },
        { key: "Cloud", label: content.filters.cloud.value },
        { key: "Data Analytics", label: content.filters.dataAnalytics.value },
        { key: "Cybersecurity", label: content.filters.cybersecurity.value },
        { key: "AI & Machine Learning", label: content.filters.aiMl.value },
        { key: "CSR", label: content.filters.csr.value },
        { key: "Company News", label: content.filters.companyNews.value },
    ];

    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // ⭐ Static Popular Tags
    // const popularTags: string[] = [
    //     "Oracle Cloud Infrastructure",
    //     "Database Insider",
    //     "Modern Finance",
    //     "Customer Experience",
    //     "The Fusion Insider",
    //     "Modern Marketing",
    //     "Developers",
    // ];

    // 🔥 Fetch Articles From Firestore
    useEffect(() => {
        const fetchData = async () => {
            try {
                const articleSnap = await getDocs(collection(db, "articles"));
                const articleList: Article[] = articleSnap.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        category: data.category,
                        categoryAr: data.categoryAr,
                        title: data.title,
                        titleAr: data.titleAr,
                        description: data.description,
                        descriptionAr: data.descriptionAr,
                        authors: data.authors,
                        authorsAr: data.authorsAr,
                        readTime: data.readTime,
                        readTimeAr: data.readTimeAr,
                        tags: data.tags || [],
                        tagsAr: data.tagsAr,
                        externalLink: data.externalLink,
                        featureArticle: data.featureArticle,
                        createdAt: data.createdAt,
                    };
                });
                // Sort by createdAt descending (latest first)
                const sortedList = [...articleList].sort((a, b) => {
                    const aTime = (a as Article).createdAt?.seconds || 0;
                    const bTime = (b as Article).createdAt?.seconds || 0;
                    return bTime - aTime;
                });
                setArticles(sortedList);
                console.log("Fetched Articles: ", articleList);

            } catch (err) {
                console.error("Error fetching data: ", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter Articles
    const filteredArticles: Article[] =
        activeFilter === "All Post"
            ? articles
            : articles.filter((article) => article.tags?.includes(activeFilter));


    return (
        <div className="min-h-screen bg-white py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* HEADING */}
                <div className="text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-8 md:mb-12">
                        {content.headingPrefix.value} <span className="text-[#D4AF37]">{content.headingHighlight.value}</span>
                    </h1>
                </div>


                {/* MOBILE FILTER & TAG BUTTONS */}
                <div className="md:hidden mb-8 flex gap-4 justify-center">
                    <div className='flex flex-row gap-3 items-center bg-[#FFFBED] border border-[#D9D9D9] px-6 py-2  rounded-xl'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3 7C3 6.73478 3.10536 6.48043 3.29289 6.29289C3.48043 6.10536 3.73478 6 4 6H20C20.2652 6 20.5196 6.10536 20.7071 6.29289C20.8946 6.48043 21 6.73478 21 7C21 7.26522 20.8946 7.51957 20.7071 7.70711C20.5196 7.89464 20.2652 8 20 8H4C3.73478 8 3.48043 7.89464 3.29289 7.70711C3.10536 7.51957 3 7.26522 3 7ZM5 11.5C5 11.2348 5.10536 10.9804 5.29289 10.7929C5.48043 10.6054 5.73478 10.5 6 10.5H18C18.2652 10.5 18.5196 10.6054 18.7071 10.7929C18.8946 10.9804 19 11.2348 19 11.5C19 11.7652 18.8946 12.0196 18.7071 12.2071C18.5196 12.3946 18.2652 12.5 18 12.5H6C5.73478 12.5 5.48043 12.3946 5.29289 12.2071C5.10536 12.0196 5 11.7652 5 11.5ZM8 16C8 15.7348 8.10536 15.4804 8.29289 15.2929C8.48043 15.1054 8.73478 15 9 15H15C15.2652 15 15.5196 15.1054 15.7071 15.2929C15.8946 15.4804 16 15.7348 16 16C16 16.2652 15.8946 16.5196 15.7071 16.7071C15.5196 16.8946 15.2652 17 15 17H9C8.73478 17 8.48043 16.8946 8.29289 16.7071C8.10536 16.5196 8 16.2652 8 16Z" fill="#D4AF37" />
                        </svg>
                        <button
                            className=" text-black  flex items-center gap-2"
                            onClick={() => setShowMobileFilter(true)}
                        >
                            {content.filtersButton.value}
                        </button>


                    </div>
                    <div className='flex flex-row gap-3 items-center bg-[#FFFBED] border border-[#D9D9D9] px-6 py-2 rounded-xl'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.4497 2.42627C11.0984 2.56502 11.5109 3.20252 11.3722 3.85127L10.6559 7.20002H15.3997L16.2247 3.34877C16.3634 2.70002 17.0009 2.28752 17.6497 2.42627C18.2984 2.56502 18.7109 3.20252 18.5722 3.85127L17.8559 7.20002H20.3984C21.0622 7.20002 21.5984 7.73627 21.5984 8.40002C21.5984 9.06377 21.0622 9.60002 20.3984 9.60002H17.3384L16.3109 14.4H18.8534C19.5172 14.4 20.0534 14.9363 20.0534 15.6C20.0534 16.2638 19.5172 16.8 18.8534 16.8H15.7934L14.9684 20.6513C14.8297 21.3 14.1922 21.7125 13.5434 21.5738C12.8947 21.435 12.4822 20.7975 12.6209 20.1488L13.3372 16.8H8.59344L7.76844 20.6513C7.62969 21.3 6.99219 21.7125 6.34344 21.5738C5.69469 21.435 5.28219 20.7975 5.42094 20.1488L6.14094 16.8H3.59844C2.93469 16.8 2.39844 16.2638 2.39844 15.6C2.39844 14.9363 2.93469 14.4 3.59844 14.4H6.65844L7.68594 9.60002H5.14344C4.47969 9.60002 3.94344 9.06377 3.94344 8.40002C3.94344 7.73627 4.47969 7.20002 5.14344 7.20002H8.20344L9.02844 3.34877C9.16344 2.70002 9.80094 2.28752 10.4497 2.42627ZM10.1384 9.60002L9.11094 14.4H13.8547L14.8822 9.60002H10.1384Z" fill="#D4AF37" />
                        </svg>
                        <button
                            className="text-black flex items-center gap-2"
                            onClick={() => setShowMobileTags(true)}
                        >
                            {content.popularTagsButton.value}
                        </button>


                    </div>


                </div>

                {/* MOBILE FILTER CARD */}
                {showMobileFilter && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 pb-40">
                        <div className="bg-white rounded-2xl p-6 w-[90%] max-w-xs shadow-xl flex flex-col gap-4 relative">
                            <button
                                className="absolute top-2 right-5 text-gray-400 hover:text-gray-600 text-xl"
                                onClick={() => setShowMobileFilter(false)}
                                aria-label="Close"
                            >
                                &times;
                            </button>
                            <div className="font-bold text-lg mb-2 text-center">{content.modalFiltersTitle.value}</div>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {filterOptions.map((filter) => (
                                    <button
                                        key={filter.key}
                                        onClick={() => {
                                            setActiveFilter(filter.key);
                                            setShowMobileFilter(false);
                                        }}
                                        className={`px-4 py-2 rounded-full text-sm font-medium border border-[#D9D9D9] transition-all ${activeFilter === filter.key ? 'bg-[#D4AF37] text-white shadow-md' : 'bg-white text-black'}`}
                                    >
                                        {filter.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* MOBILE TAGS CARD */}
                {showMobileTags && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 pb-40">
                        <div className="bg-white rounded-2xl p-6 w-[90%] max-w-xs shadow-xl flex flex-col gap-4 relative">
                            <button
                                className="absolute top-2 right-5 text-gray-400 hover:text-gray-600 text-xl"
                                onClick={() => setShowMobileTags(false)}
                                aria-label="Close"
                            >
                                &times;
                            </button>
                            <div className="font-bold text-lg mb-2 text-center">{content.modalPopularTagsTitle.value}</div>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {filterOptions.map((tag) => (
                                    <button
                                        key={tag.key}
                                        onClick={() => {
                                            setActiveFilter(tag.key);
                                            setShowMobileTags(false);
                                        }}
                                        className={`px-4 py-2 rounded-full text-sm font-medium border border-[#D9D9D9] transition-all ${activeFilter === tag.key ? 'bg-[#D4AF37] text-white shadow-md' : 'bg-white text-black'}`}
                                    >
                                        {tag.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* DESKTOP/TABLET FILTER BUTTONS */}
                <div className="hidden md:flex flex-wrap w-fit mx-auto gap-3 mb-12 rounded-3xl md:rounded-3xl p-2 border border-gray-200 shadow items-center justify-center">
                    {filterOptions.map((filter) => (
                        <button
                            key={filter.key}
                            onClick={() => setActiveFilter(filter.key)}
                            className={`px-6 py-2 cursor-pointer rounded-full text-sm font-medium transition-all ${activeFilter === filter.key
                                ? "bg-[#D4AF37] text-white shadow-md"
                                : "bg-[#F6F6F6] text-black"
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <p className="text-gray-500 text-center text-lg">{content.loading.value}</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] lg:grid-cols-3 gap-8 md:gap-2 md:mx-auto">

                        {/* ARTICLES LIST */}
                        <div className="lg:col-span-2 space-y-6 p-5 md:p-2">
                            {filteredArticles.map((article) => {
                                const isArabic = locale === "ar";
                                const category = isArabic ? article.categoryAr || article.category : article.category;
                                const title = isArabic ? article.titleAr || article.title : article.title;
                                const description = isArabic ? article.descriptionAr || article.description : article.description;
                                const authors = isArabic ? article.authorsAr || article.authors : article.authors;
                                const readTime = isArabic ? article.readTimeAr || article.readTime : article.readTime;

                                return (
                                    <div
                                        key={article.id}
                                        className="bg-white rounded-4xl p-8 shadow-xl transition-shadow border border-[#D9D9D9]"
                                    >
                                        {/* CATEGORY BADGE */}
                                        <div className="bg-[#FFFBED] p-2 rounded-full flex w-fit items-center gap-2 mb-4 text-[#D4AF37]">
                                            <span className="text-sm font-medium">{category}</span>
                                        </div>

                                        <h2 className="text-[28px] font-medium text-black mb-4">
                                            {title} {(article.featureArticle === true) && (
                                                <span className="text-sm bg-[#D4AF37] text-white px-2 py-1 rounded-full ml-2">{isArabic ? "مميز" : "Featured"}</span>
                                            )}
                                        </h2>



                                        <p className="text-[#6B7280] text-[20px] mb-4">
                                            {description
                                                .split('\n')
                                                .slice(0, 2)
                                                .join('\n')}
                                        </p>

                                        {/* AUTHORS */}
                                        <div className="flex items-center gap-1 mb-2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10Z" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M17 18C17 16.6739 16.4732 15.4021 15.5355 14.4645C14.5979 13.5268 13.3261 13 12 13C10.6739 13 9.40215 13.5268 8.46447 14.4645C7.52678 15.4021 7 16.6739 7 18" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M21 13V11C21 7.229 21 5.343 19.828 4.172C18.656 3.001 16.771 3 13 3H11C7.229 3 5.343 3 4.172 4.172C3.001 5.344 3 7.229 3 11V13C3 16.771 3 18.657 4.172 19.828C5.344 20.999 7.229 21 11 21H13C16.771 21 18.657 21 19.828 19.828C20.999 18.656 21 16.771 21 13Z" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                                            </svg>

                                            <span className="text-[16px] text-black">{authors}</span>
                                        </div>

                                        {/* READ TIME */}
                                        <div className="flex items-center gap-2">
                                            <div className="flex flex-row gap-2 border border-[#D9D9D9] rounded-full p-2">
                                                <Clock className="w-4 h-4 text-[#D4AF37]" />
                                                <span className="text-black font-medium text-sm">
                                                    {readTime}
                                                </span>
                                            </div>
                                        </div>

                                        {/* READ MORE BUTTON */}
                                        <div className="mt-4 flex items-center justify-center">
                                            <a
                                                href={article.externalLink || undefined}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-[#D4AF37] text-black px-8 py-3 rounded-full font-medium w-full flex items-center justify-center gap-2 hover:scale-105 transition cursor-pointer text-center"
                                                style={{ pointerEvents: article.externalLink ? 'auto' : 'none', opacity: article.externalLink ? 1 : 0.5 }}
                                            >
                                                {content.readMoreButton.value}
                                                <ArrowRight size={18} className={`${locale === 'ar' ? 'rotate-180' : ''}`} />
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                            {filteredArticles.length === 0 && (
                                <div className="bg-white rounded-2xl p-12 text-center">
                                    {content.emptyCategory.value}
                                </div>
                            )}
                        </div>

                        {/* POPULAR TAGS SIDEBAR */}
                        <div className="hidden md:block lg:col-span-1 md:mt-2 lg:mt-2">
                            <div className="sticky top-24">
                                <div className="bg-white rounded-4xl p-8 shadow-xl border border-[#D9D9D9]">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                                        {content.popularTags.value}
                                    </h3>

                                    <div className="flex flex-wrap gap-3 cursor-pointer">
                                        {filterOptions.map((tag, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setActiveFilter(tag.key)}
                                                className={`px-4 py-2 cursor-pointer border border-[#D9D9D9] text-black rounded-full text-sm transition-all ${activeFilter === tag.key ? 'bg-[#D4AF37] text-white shadow-md' : 'bg-white'}`}
                                            >
                                                {tag.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogArticleList;