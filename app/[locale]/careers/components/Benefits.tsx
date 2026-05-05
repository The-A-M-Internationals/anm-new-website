"use client";

import FancyCard from "./FancyCard";
import { useIntlayer } from "next-intlayer";

const Benefits = () => {
    const content = useIntlayer("careersBenefits");

    return (
        <div className="flex flex-col justify-center items-center gap-5 py-12 md:py-20 lg:py-24 px-4">
            <div className="flex flex-col justify-center items-center text-center">
                <p className="text-3xl md:text-[48px] font-semibold text-[#000000]">
                    <span className="text-[#D4AF37]">{content.titleHighlight} </span>
                    {content.titleRest}
                </p>
                <p className="text-[#6B7280] text-lg md:text-[24px] mt-2">{content.subtitle}</p>
            </div>
            <div className="flex flex-col gap-6 max-w-[95%] md:w-full md:max-w-full items-center">
                <div className="flex flex-col lg:flex-row gap-6 justify-center w-full flex-wrap">
                    <FancyCard
                        icon="/careers/growth.svg"
                        title={content.card1Title}
                        description={content.card1Description}
                    />
                    <FancyCard
                        icon="/careers/culture.svg"
                        title={content.card2Title}
                        description={content.card2Description}
                    />
                    <FancyCard
                        icon="/careers/hybrid.svg"
                        title={content.card3Title}
                        description={content.card3Description}
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-6 justify-center w-full flex-wrap">
                    <FancyCard
                        icon="/careers/comp.svg"
                        title={content.card4Title}
                        description={content.card4Description}
                    />
                    <FancyCard
                        icon="/careers/balance.svg"
                        title={content.card5Title}
                        description={content.card5Description}
                    />
                    <FancyCard
                        icon="/careers/impact.svg"
                        title={content.card6Title}
                        description={content.card6Description}
                    />
                </div>
            </div>
        </div>
    )
}

export default Benefits;