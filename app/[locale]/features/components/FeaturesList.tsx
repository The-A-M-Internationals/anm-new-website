"use client";

import { useIntlayer } from "next-intlayer";

const FeaturesList = () => {
    const content = useIntlayer("featuresList");
    const features = [
        { title: content.feature1Title.value, text: content.feature1Text.value },
        { title: content.feature2Title.value, text: content.feature2Text.value },
        { title: content.feature3Title.value, text: content.feature3Text.value },
        { title: content.feature4Title.value, text: content.feature4Text.value },
    ];

    return (
        <div id="features" className="bg-white py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="w-full mx-auto p-2 md:p-7">
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-3">
                        {content.titlePrefix.value} <span className="text-[#ab8d2b]">{content.titleHighlight.value}</span>
                    </h2>
                    <span className="inline-block mt-2 rounded-full px-3 py-1.5 bg-[#FFFBED] text-xs md:text-sm font-semibold text-[#ab8d2b]">
                        {content.statusTag.value}
                    </span>
                </div>

                {/* Features List */}
                <div className="space-y-0">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="reveal-up border-b border-[#000000] py-8 flex flex-col md:flex-row items-start justify-between gap-4 md:gap-8 group transition-colors px-4 -mx-4"
                        >
                            <div className="flex-1 order-2 md:order-1">
                                <h3 className="text-2xl md:text-[28px] font-medium text-[#000000]">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-gray-600 text-base md:text-lg">
                                    {feature.text}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesList;
