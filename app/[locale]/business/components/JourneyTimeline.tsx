"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { useIntlayer } from "next-intlayer";
import { useTimelineDraw } from "@/app/components/useTimelineDraw";

const JourneyTimeline = () => {
    const content = useIntlayer("businessJourneyTimeline");
    const timelineRef = useRef<HTMLDivElement>(null);
    useTimelineDraw(timelineRef);
    // Text-only milestones (photos to follow); the text side alternates on desktop
    const milestones = [
        content.milestone1.value,
        content.milestone2.value,
        content.milestone3.value,
        content.milestone4.value,
        content.milestone5.value,
    ].map((text, i) => ({
        text,
        position: i % 2 === 0 ? "right" : "left",
    }));

    return (
        <section id="about-us" className="py-12 md:py-20 lg:py-24 px-6 md:px-12">
            <div className="max-w-5xl mx-auto">

                {/* HEADER */}
                <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-10">
                    {content.title.value}
                </h2>

                {/* MAIN IMAGE WITH YELLOW BOX */}
                <div className="relative flex justify-center mb-12 md:mb-24">

                    <div className="absolute bg-[#FFFBED] w-full max-w-[800px] h-[200px] md:h-[277px] rounded-[40px] top-[25%] z-0"></div>

                    <div className="relative w-full max-w-2xl h-48 sm:h-64 md:h-72 rounded-3xl overflow-hidden shadow-xl z-10">
                        <Image
                            src="/business/main.jpg"
                            alt="Our journey main"
                            fill
                            sizes="(min-width: 768px) 672px, 100vw"
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* TIMELINE: rows are min-h-28 with the text centred, so both spines end at the last row's dot (bottom-14) */}
                <div ref={timelineRef} className="relative pt-10">

                    {/* DESKTOP VERTICAL LINE */}
                    <div data-draw="y" className="hidden md:block absolute left-1/2 -translate-x-1/2 -top-24 bottom-14 w-[3px] bg-[#D4AF37]"></div>

                    <div className="relative space-y-8 md:space-y-10">

                        {/* MOBILE VERTICAL LINE (ONE CONTINUOUS LINE) */}
                        <div data-draw="y" className="md:hidden absolute start-5 -top-25 bottom-14 w-[3px] bg-[#D4AF37]"></div>

                        {milestones.map((milestone, index) => (
                            <div key={index} data-draw-row className="relative">

                                {/* MOBILE CONNECTOR + DOT */}
                                <div data-draw="x" className="md:hidden absolute start-5 top-1/2 -translate-y-1/2 w-[80px] h-[3px] bg-[#D4AF37] ltr:origin-left rtl:origin-right"></div>
                                <div data-draw="dot" className="md:hidden absolute start-[85px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#D4AF37] shadow-md"></div>

                                {/* DESKTOP CONNECTOR + DOT (towards the text side) */}
                                {milestone.position === "left" ? (
                                    <>
                                        <div data-draw="x" className="hidden md:block absolute start-1/2 top-1/2 -translate-y-1/2 w-28 h-[3px] bg-[#D4AF37] ltr:origin-left rtl:origin-right"></div>
                                        <div data-draw="dot" className="hidden md:block absolute start-[calc(50%+7rem)] top-1/2 -translate-y-1/2 w-5 h-5 bg-[#D4AF37] border-4 border-[#D4AF37] rounded-full shadow-md"></div>
                                    </>
                                ) : (
                                    <>
                                        <div data-draw="x" className="hidden md:block absolute end-1/2 top-1/2 -translate-y-1/2 w-28 h-[3px] bg-[#D4AF37] ltr:origin-right rtl:origin-left"></div>
                                        <div data-draw="dot" className="hidden md:block absolute end-[calc(50%+7rem)] top-1/2 -translate-y-1/2 w-5 h-5 bg-[#D4AF37] border-4 border-[#D4AF37] rounded-full shadow-md"></div>
                                    </>
                                )}

                                {/* CONTENT ROW: empty half + text half on desktop; text beside the dot on mobile */}
                                <div className={`flex items-center min-h-28 ${milestone.position === "right" ? "md:flex-row-reverse" : ""}`}>
                                    <div className="hidden md:block w-1/2" aria-hidden="true"></div>

                                    <div className="hidden md:flex w-1/2 items-center">
                                        <p
                                            className={`max-w-xs text-lg text-gray-700 leading-relaxed font-medium ${milestone.position === "right"
                                                ? "text-end me-auto pe-6 md:me-34"
                                                : "text-start ms-auto ps-6 md:ms-34"
                                                }`}
                                            data-aos="fade-up" data-aos-delay="250"
                                        >
                                            {milestone.text}
                                        </p>
                                    </div>

                                    <p className="md:hidden text-gray-700 text-sm ms-28 max-w-[16rem] text-start">
                                        {milestone.text}
                                    </p>
                                </div>

                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default JourneyTimeline;
