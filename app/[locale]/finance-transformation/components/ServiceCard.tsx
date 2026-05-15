"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, ReactNode } from "react";
import { useIntlayer, useLocale } from "next-intlayer";

interface CardProps {
    id?: string;
    title: string;
    description: string;
    tags: string[];
    svgIcon: ReactNode;
}

export const ServiceCard: React.FC<CardProps> = ({
    id,
    title,
    description,
    svgIcon,
    tags,
}) => {
    const [isActive, setIsActive] = useState(false);
    const router = useRouter();
    const { locale } = useLocale();
    const content = useIntlayer("financeTransformationServiceCard");

    const visibleTags = tags.filter(Boolean);

    return (
        <div id={id} className="bg-[#FFFBED] flex justify-center items-center">

            {/* 📱 MOBILE VERSION */}
            <div className="w-full md:hidden flex justify-center">
                {/* 🔁 Mirror entire card in RTL */}
                <div className="m-2 group relative w-full max-w-[300px] md:max-w-[380px] mx-auto rtl:[transform:scaleX(-1)]">

                    <div
                        onClick={() => setIsActive(!isActive)}
                        className="relative h-auto w-full overflow-hidden rounded-3xl bg-white transition-colors duration-300 cursor-pointer pb-8"
                    >

                        {/* Border */}
                        <div className="absolute inset-0 border-2 border-gray-200 rounded-3xl"></div>

                        {/* Decorative corner */}
                        <div className="absolute -top-6 -end-6 size-20 rounded-bs-4xl border-2 border-gray-200 bg-[#FFFBED]">
                            <div className="absolute top-5 -start-5 h-5 w-5 bg-[#FFFBED]"></div>
                            <div className="absolute top-5 -start-5 h-5 w-5 rounded-te-full border-t-2 border-e-2 border-gray-200 bg-white"></div>
                            <div className="absolute -bottom-5 end-5 h-5 w-5 bg-[#FFFBED]"></div>
                            <div className="absolute -bottom-5 end-5 h-5 w-5 rounded-te-full border-t-2 border-e-2 border-gray-200 bg-white"></div>
                        </div>

                        {/* Icon */}
                        <div className={`absolute top-0 end-0 w-12 h-12 flex items-center justify-center fill-current transition-colors duration-300 z-50 ${isActive ? 'text-[#D4AF37]' : 'text-black'} group-hover:text-[#D4AF37]`}>
                            <div className="w-8 h-8 flex items-center justify-center">
                                {svgIcon}
                            </div>
                        </div>

                        {/* 🔁 Flip content back so text is readable */}
                        <div className="relative z-10 p-6 pt-12 flex flex-col rtl:[transform:scaleX(-1)]">

                            <h3 className={`text-xl font-bold transition-colors duration-300 leading-tight ${isActive ? 'text-[#D4AF37]' : 'text-[#111827]'} group-hover:text-[#D4AF37]`}>
                                {title}
                            </h3>

                            <p className="text-sm text-[#6B7280] mt-2 leading-snug">
                                {description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-3">
                                {visibleTags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full bg-yellow-50 text-[#D4AF37] text-xs font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* 💻 DESKTOP / TABLET VERSION */}
            <div className="hidden md:flex m-4 md:m-10 relative w-full max-w-[90%] group rtl:[transform:scaleX(-1)]">

                <div className="relative h-auto w-full overflow-hidden rounded-3xl bg-white p-6 md:p-12">
                    <div className="absolute inset-0 border-2 border-gray-200 rounded-3xl"></div>

                    {/* Decorative corner */}
                    <div className="absolute -top-6 -right-6 size-16 md:size-24 rounded-bl-4xl border-2 border-gray-200 bg-[#FFFBED]">
                        <div className="absolute top-5.5 -left-6 h-6 w-6 bg-[#FFFBED]"></div>
                        <div className="absolute top-5.5 -left-6 h-6 w-6 rounded-tr-full border-t-2 border-r-2 border-gray-200 bg-white"></div>
                        <div className="absolute -bottom-6 right-5.5 h-6 w-6 bg-[#FFFBED]"></div>
                        <div className="absolute -bottom-6 right-5.5 h-6 w-6 rounded-tr-full border-t-2 border-r-2 border-gray-200 bg-white"></div>
                    </div>

                    {/* Icon */}
                    <div className="absolute -top-7 -right-9 w-16 h-16 md:w-24 md:h-24 z-50 text-[#111827] group-hover:text-[#D4AF37] fill-current transition-colors duration-300 flex items-center justify-center">
                        <div className="w-16 h-16 md:w-13 md:h-13 flex items-center justify-center -translate-x-6 translate-y-4">
                            {svgIcon}
                        </div>
                    </div>

                    {/* 🔁 Flip content back */}
                    <div className="relative z-10 mt-6 mr-24 rtl:[transform:scaleX(-1)]">

                        <h2 className="text-2xl md:text-4xl font-bold text-[#111827] group-hover:text-[#D4AF37]">
                            {title}
                        </h2>

                        <p className="text-base md:text-lg text-[#6B7280] mt-4">
                            {description}
                        </p>

                        <div className="flex flex-wrap gap-3 mt-8">
                            {visibleTags.map((tag, i) => (
                                <span key={i} className="px-4 py-2 rounded-full bg-yellow-50 text-yellow-700 text-sm font-medium hover:bg-[#0F1E4D] hover:text-white">
                                    {tag}
                                </span>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;