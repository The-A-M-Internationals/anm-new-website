"use client";

import { useIntlayer } from "next-intlayer";

const WhatSetsUsApartList = () => {
    const content = useIntlayer("whatSetsUsApartList");
    const features = [
        {
            number: '01',
            title: content.feature1Title.value,
            description: content.feature1Description.value
        },
        {
            number: '02',
            title: content.feature2Title.value,
            description: content.feature2Description.value
        },
        {
            number: '03',
            title: content.feature3Title.value,
            description: content.feature3Description.value
        },
        {
            number: '04',
            title: content.feature4Title.value,
            description: content.feature4Description.value
        },
        {
            number: '05',
            title: content.feature5Title.value,
            description: content.feature5Description.value
        },
        {
            number: '06',
            title: content.feature6Title.value,
            description: content.feature6Description.value
        }
    ];

    return (
        <div id="what-sets-us-apart" className="bg-white py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 scroll-mt-[112px]">
            <div className="w-full mx-auto p-2 md:p-7">
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-3">
                        {content.titlePrefix.value} <span className="text-[#ab8d2b]">{content.titleHighlight.value}</span>
                    </h2>
                    <p className="text-[#6B7280]">
                        {content.subtitle.value}
                    </p>
                </div>

                {/* Features List */}
                <div className="space-y-0">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="border-b border-[#000000] py-8 flex flex-col md:flex-row items-start justify-between gap-4 md:gap-8 group transition-colors px-4 -mx-4"
                        >
                            <div className="flex-1 order-2 md:order-1">
                                <h3 className="text-2xl md:text-[28px] font-medium text-[#000000] mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-[#6B7280] leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhatSetsUsApartList;
