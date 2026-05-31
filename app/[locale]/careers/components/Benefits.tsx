"use client";

import { useState, useEffect, useRef } from "react";
import FancyCard from "./FancyCard";
import { useIntlayer } from "next-intlayer";

const Benefits = () => {
    const content = useIntlayer("careersBenefits");
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle clicking outside to reset active state
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setActiveIndex(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCardClick = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div ref={containerRef} className="flex flex-col justify-center items-center gap-5 py-12 md:py-20 px-4">
            <div className="flex flex-col justify-center items-center text-center">
                <p className="text-3xl md:text-[48px] font-semibold text-[#000000]">
                    <span className="text-[#D4AF37]">{content.titleHighlight.value} </span>
                    {content.titleRest.value}
                </p>
                <p className="text-[#6B7280] text-lg md:text-[24px] mt-2">{content.subtitle.value}</p>        
            </div>
            <div className="flex flex-col gap-6 max-w-[95%] md:w-full md:max-w-full items-center">      
                <div className="flex flex-col lg:flex-row gap-6 justify-center w-full flex-wrap">       
                    <FancyCard
                        icon="/careers/growth.svg"
                        title={content.card1Title.value}
                        description={content.card1Description.value}
                        isActive={activeIndex === 0}
                        onClick={() => handleCardClick(0)}
                    />
                    <FancyCard
                        icon="/careers/culture.svg"
                        title={content.card2Title.value}
                        description={content.card2Description.value}
                        isActive={activeIndex === 1}
                        onClick={() => handleCardClick(1)}
                    />
                    <FancyCard
                        icon="/careers/hybrid.svg"
                        title={content.card3Title.value}
                        description={content.card3Description.value}
                        isActive={activeIndex === 2}
                        onClick={() => handleCardClick(2)}
                    />
                </div>

                <div className="flex flex-col lg:flex-row gap-6 justify-center w-full flex-wrap">       
                    <FancyCard
                        icon="/careers/comp.svg"
                        title={content.card4Title.value}
                        description={content.card4Description.value}
                        isActive={activeIndex === 3}
                        onClick={() => handleCardClick(3)}
                    />
                    <FancyCard
                        icon="/careers/balance.svg"
                        title={content.card5Title.value}
                        description={content.card5Description.value}
                        isActive={activeIndex === 4}
                        onClick={() => handleCardClick(4)}
                    />
                    <FancyCard
                        icon="/careers/impact.svg"
                        title={content.card6Title.value}
                        description={content.card6Description.value}
                        isActive={activeIndex === 5}
                        onClick={() => handleCardClick(5)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Benefits;
