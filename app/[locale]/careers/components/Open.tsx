"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useIntlayer, useLocale } from "next-intlayer";

type Job = {
    id: string;
    title: string;
    titleAr?: string;
    department?: string;
    departmentAr?: string;
    location?: string;
    locationAr?: string;
    type?: string;
    typeAr?: string;
    description?: string;
    descriptionAr?: string;
};

const Open = () => {
    const router = useRouter();
    const content = useIntlayer("careersOpenPositions");
    const { locale } = useLocale();

    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const snap = await getDocs(collection(db, "jobs"));
                const list: Job[] = snap.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        title: data.title,
                        titleAr: data.titleAr,
                        department: data.department,
                        departmentAr: data.departmentAr,
                        location: data.location,
                        locationAr: data.locationAr,
                        type: data.type,
                        typeAr: data.typeAr,
                        description: data.description,
                        descriptionAr: data.descriptionAr,
                    };
                });
                setJobs(list);
            } catch {
                setError(content.loadError.value);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [locale]);

    const hasJobs = !loading && jobs.length > 0;

    return (
        <div
            id="open-positions"
            className="flex flex-col items-center justify-center gap-6 py-12 md:py-20 lg:py-24 px-4 text-center"
        >
            <p className="font-semibold text-xl md:text-2xl">
                {content.titlePrefix.value} <span className="text-[#D4AF37]">{content.titleHighlight.value}</span>
            </p>

            <p className="text-[#6B7280] text-sm md:text-base">
                {content.subtitle.value}
            </p>

            {loading && <p className="text-[#6B7280]">{content.loading.value}</p>}

            {!hasJobs && !loading && (
                <>
                    <div className="flex flex-col items-center gap-4">
                        <Image
                            src="/careers/open.png"
                            alt="No positions"
                            width={400}
                            height={400}
                            className="mt-2 rounded-lg w-full max-w-[400px] h-auto hover:scale-105 transition"
                        />
                        <p className="text-black text-sm md:text-base max-w-2xl">
                            {content.emptyLine1.value}
                            <br className="hidden md:block" />
                            {content.emptyLine2.value}
                        </p>
                    </div>
                    </>
                    )}            {hasJobs && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                    {jobs.map((job) => {
                        const title = locale === "ar" ? job.titleAr || job.title : job.title;
                        const department = locale === "ar" ? job.departmentAr || job.department : job.department;
                        const location = locale === "ar" ? job.locationAr || job.location : job.location;
                        const type = locale === "ar" ? job.typeAr || job.type : job.type;
                        const description = locale === "ar" ? job.descriptionAr || job.description : job.description;
                        return (
                            <div
                                key={job.id}
                                className="border border-gray-300 rounded-2xl p-5 text-left rtl:text-right shadow-sm hover:shadow-md transition flex flex-col justify-between"
                            >
                                <div>
                                    <p className="font-semibold text-xl">{title}</p>

                                    <div className="mt-1 text-sm text-[#6B7280]">
                                        <div className="flex flex-wrap gap-3">
                                            {department && <span>{content.deptLabel.value}: {department}</span>}
                                            {location && <span>{content.locationLabel.value}: {location}</span>}
                                        </div>

                                        {type && (
                                            <div className="mt-1">
                                                <span>{content.typeLabel.value}: {type}</span>
                                            </div>
                                        )}
                                    </div>

                                    {description && (
                                        <div className="mt-3 text-black text-sm line-clamp-3 overflow-hidden">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    h1: ({ children }) => <span className="font-semibold">{children}</span>,
                                                    h2: ({ children }) => <span className="font-semibold">{children}</span>,
                                                    h3: ({ children }) => <span className="font-semibold">{children}</span>,
                                                    p: ({ children }) => <span>{children} </span>,
                                                    ul: ({ children }) => <span>{children}</span>,
                                                    li: ({ children }) => <span>- {children} </span>,
                                                }}
                                            >
                                                {description}
                                            </ReactMarkdown>
                                        </div>
                                    )}
                                </div>

                                <button
                                    className="mt-4 bg-[#D4AF37] cursor-pointer text-black px-4 py-2 rounded-full font-medium hover:scale-105 transition"
                                    onClick={() => router.push(`/${locale}/careers/${job.id}`)}
                                >
                                    {content.apply.value}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
    );
};

export default Open;