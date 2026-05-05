"use client";

import { useIntlayer } from "next-intlayer";

const Results = () => {
    const content = useIntlayer("featuresResults");

    return (
        <div
            id="results"
            className="
                relative py-12 md:py-20 lg:py-24 px-4 overflow-hidden 
                bg-[#0F1E4D]
            "
            style={{
                backgroundImage: "url('/whychooseus.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center -40px",
            }}
        >
            <div className="flex flex-col items-center justify-center text-center">
                <p className="text-[#D4AF37] font-semibold text-3xl md:text-[48px]">{content.title}</p>
                <p className="text-[#FFFFFF] font-semibold text-base md:text-[16px] mt-2">{content.subtitle}</p>
                {/* Mobile: stacked, Web: numbers in one line, texts in one line below */}
                <div className="flex flex-col mt-8 gap-8 lg:gap-16 flex-wrap justify-center w-full">
                    {/* Mobile view: stacked */}
                    <div className="flex flex-col md:hidden gap-8">
                        <div className="flex flex-col items-center justify-center">
                            <p className="font-semibold text-4xl text-[#D4AF37]">{content.stat1Value}</p>
                            <p className="text-[#FFFFFF] text-lg font-medium">{content.stat1Label}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="font-semibold text-4xl text-[#D4AF37]">{content.stat2Value}</p>
                            <p className="text-[#FFFFFF] text-lg font-medium">{content.stat2Label}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="font-semibold text-4xl text-[#D4AF37]">{content.stat3Value}</p>
                            <p className="text-[#FFFFFF] text-lg font-medium">{content.stat3Label}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <p className="font-semibold text-4xl text-[#D4AF37]">{content.stat4Value}</p>
                            <p className="text-[#FFFFFF] text-lg font-medium">{content.stat4Label}</p>
                        </div>
                    </div>
                    {/* Web view: numbers and texts aligned in flex row */}
                    <div
                        className="
    hidden md:grid
    grid-cols-2 gap-y-12 gap-x-16
    lg:flex lg:flex-row lg:gap-20
    justify-center items-end w-full
  "
                    >
                        <div className="flex flex-col items-center">
                            <p className="font-semibold text-[48px] text-[#D4AF37]">{content.stat1Value}</p>
                            <p className="text-[#FFFFFF] text-[24px] font-medium mt-2">{content.stat1Label}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="font-semibold text-[48px] text-[#D4AF37]">{content.stat2Value}</p>
                            <p className="text-[#FFFFFF] text-[24px] font-medium mt-2">{content.stat2Label}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="font-semibold text-[48px] text-[#D4AF37]">{content.stat3Value}</p>
                            <p className="text-[#FFFFFF] text-[24px] font-medium mt-2">{content.stat3Label}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="font-semibold text-[48px] text-[#D4AF37]">{content.stat4Value}</p>
                            <p className="text-[#FFFFFF] text-[24px] font-medium mt-2">{content.stat4Label}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;