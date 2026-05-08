"use client";

import Image from 'next/image';
import React from 'react';
import { useIntlayer } from "next-intlayer";

const CultureGrowthSection = () => {
    const content = useIntlayer("careersCultureGrowthSection");

    const values = [
        {
            title: content.value1Title.value,
            description: content.value1Description.value,
        },
        {
            title: content.value2Title.value,
            description: content.value2Description.value,
        },
        {
            title: content.value3Title.value,
            description: content.value3Description.value,
        },
        {
            title: content.value4Title.value,
            description: content.value4Description.value,
        }
    ];

    return (
        <div className="bg-[#FFFBED] py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col gap-10 md:gap-16">

                {/* ROW 1 — Title + Description */}
                <div id="culture" className="flex flex-col lg:flex-row justify-between items-start gap-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-black leading-tight">
                        {content.title.value}
                    </h2>

                    <p className="text-gray-600 leading-relaxed w-full lg:w-[550px] text-sm md:text-base">
                        {content.description.value}
                    </p>
                </div>

                {/* ROW 2 — Image + Value Boxes */}
                <div className="flex flex-col lg:flex-row items-start gap-10">

                    {/* LEFT IMAGE */}
                    <div className="shadow-lg w-full lg:w-[552px] h-[300px] md:h-[418px] rounded-[20px] overflow-hidden relative">
                        <Image
                            src="/careers/culture-growth.jpg"
                            alt="Culture and Growth"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* RIGHT — 4 VALUE BOXES */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:flex-1">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white border border-[#D9D9D9] shadow-xl flex flex-col gap-3 rounded-[40px] p-6 md:p-8 h-auto md:h-[197px]"
                            >
                                <h3 className="text-lg md:text-xl font-bold text-[#D4AF37]">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-normal text-xs md:text-sm">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CultureGrowthSection;