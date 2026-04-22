"use client";

import { useIntlayer } from "next-intlayer";

const FeaturesList = () => {
    const content = useIntlayer("featuresList");
    const features = [
        {
            number: '01',
            title: content.feature1Title,
            description: content.feature1Description
        },
        {
            number: '02',
            title: content.feature2Title,
            description: content.feature2Description
        },
        {
            number: '03',
            title: content.feature3Title,
            description: content.feature3Description
        },
        {
            number: '04',
            title: content.feature4Title,
            description: content.feature4Description
        },
        {
            number: '05',
            title: content.feature5Title,
            description: content.feature5Description
        },
        {
            number: '06',
            title: content.feature6Title,
            description: content.feature6Description
        }
    ];

    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="w-full mx-auto p-2 md:p-7">
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-3">
                        {content.titlePrefix} <span className="text-[#ab8d2b]">{content.titleHighlight}</span>
                    </h2>
                    <p className="text-[#6B7280]">
                        {content.subtitle}
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
                            {/* <div className="text-4xl md:text-5xl font-bold text-[#D4AF37] opacity-90 shrink-0 order-1 md:order-2">
                                {feature.number}
                            </div> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesList;