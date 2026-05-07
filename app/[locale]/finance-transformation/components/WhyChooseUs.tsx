"use client";

import { useIntlayer, useLocale } from "next-intlayer";

const WhyChooseUs = () => {
    const content = useIntlayer("financeTransformationWhyChooseUs");
    const { locale } = useLocale();
    const isArabic = locale === "ar";

    return (
        <div
            className="relative py-12 md:py-20 lg:py-24 px-4 overflow-hidden bg-[#0F1E4D]"
            style={{
                backgroundImage: "url('/whychooseus.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center -100px",
            }}
            dir={isArabic ? "rtl" : "ltr"}
        >
            <div className={`w-[95%] mx-auto relative z-10 flex flex-col lg:flex-row items-center lg:items-center ${isArabic ? "gap-20" : "gap-10"}`}>
                {/* LEFT TITLE */}
                <div className={`flex items-center justify-center text-center lg:text-left lg:w-1/2 ${isArabic ? "lg:mr-12" : ""}`}>
                    <p className="text-4xl md:text-5xl lg:text-[64px] font-bold text-white leading-tight">
                        {content.titleLine1} <br /> {content.titleLine2}
                    </p>
                </div>

                {/* RIGHT-SIDE CARDS */}
                <div className={`flex flex-col gap-6 w-full lg:translate-x-25 lg:w-1/2 items-center lg:items-start ${isArabic ? "lg:ml-12" : ""}`}>
                    {content.features.map((feature: { title: { value: string }; description: { value: string }; highlight: boolean }, index: number) => (
                        <div
                            key={index}
                            className={`
                                bg-white rounded-2xl shadow-lg p-4 lg:px-7 max-w-sm lg:w-[500px]
                                transition-all duration-300
                                ${feature.highlight ? "border-l-8 border-yellow-500" : "border-l-8 border-[#D9D9D9]"}
                                ${index === 1 ? "lg:ml-16" : ""}
                            `}
                        >
                            <p className="text-2xl md:text-[30px] text-black mb-1">
                                {feature.title.value}
                            </p>
                            <p className="text-black text-[18px]">
                                {feature.description.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
