import React from 'react';
import Image from 'next/image';
import { useIntlayer } from "next-intlayer";

const JourneyTimeline = () => {
    const content = useIntlayer("businessJourneyTimeline");
    const milestones = [
        {
            image: "/business/image1.jpg",
            text: content.milestone1.value,
            position: "right"
        },
        {
            image: "/business/image2.jpg",
            text: content.milestone2.value,
            position: "left"
        },
        {
            image: "/business/image3.jpg",
            text: content.milestone3.value,
            position: "right"
        },
        {
            image: "/business/image4.jpg",
            text: content.milestone4.value,
            position: "left"
        },
        {
            image: "/business/image5.jpg",
            text: content.milestone5.value,
            position: "right"
        }
    ];

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
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* TIMELINE CONTAINER */}
                <div className="relative pt-10">

                    {/* VERTICAL LINE (correct height now) */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 -top-24 bottom-27.5 w-[3px] bg-[#D4AF37]"></div>

                    <div className="relative space-y-24">

                        {/* --- MOBILE VERTICAL LINE (ONE CONTINUOUS LINE) --- */}
                        <div className="md:hidden absolute left-5 -top-25 bottom-13 w-[3px] bg-[#D4AF37]"></div>

                        {milestones.map((milestone, index) => (
                            <div key={index} className="relative">

                                {/* --- MOBILE HORIZONTAL LINE (STARTS FROM VERTICAL, ENDS BEFORE IMAGE) --- */}
                                <div className="md:hidden absolute left-5 top-[110px] w-[80px] h-[3px] bg-[#D4AF37]"></div>

                                {/* --- MOBILE DOT AT END OF HORIZONTAL LINE --- */}
                                <div className="md:hidden absolute left-[85px] top-[102px] w-4 h-4 rounded-full bg-[#D4AF37] shadow-md"></div>

                                {/* --- DESKTOP HORIZONTAL + DOTS (UNCHANGED) --- */}
                                {milestone.position === "left" && (
                                    <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 w-28 h-[3px] bg-[#D4AF37]"></div>
                                )}
                                {milestone.position === "right" && (
                                    <div className="hidden md:block absolute right-1/2 top-1/2 -translate-y-1/2 w-28 h-[3px] bg-[#D4AF37]"></div>
                                )}

                                {milestone.position === "left" && (
                                    <div className="hidden md:block absolute left-[calc(50%+7rem)] top-1/2 -translate-y-1/2 w-5 h-5 bg-[#D4AF37] border-4 border-[#D4AF37] rounded-full shadow-md"></div>
                                )}
                                {milestone.position === "right" && (
                                    <div className="hidden md:block absolute right-[calc(50%+7rem)] top-1/2 -translate-y-1/2 w-5 h-5 bg-[#D4AF37] border-4 border-[#D4AF37] rounded-full shadow-md"></div>
                                )}

                                {/* --- CONTENT ROW --- */}
                                <div className={`flex flex-col md:flex-row items-center ${milestone.position === "right" ? "md:flex-row-reverse" : ""}`}>

                                    {/* IMAGE BLOCK (MOVED RIGHT IN MOBILE) */}
                                    <div className="w-full md:w-1/2 flex md:justify-center" data-aos="fade-up" data-aos-delay="100">
                                        <div className="relative ml-28 md:ml-0 w-64 h-52 md:w-72 md:h-56 rounded-3xl overflow-hidden shadow-xl">
                                            <Image
                                                src={milestone.image}
                                                alt="Milestone image"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* --- DESKTOP TEXT (UNCHANGED) --- */}
                                    <div className="hidden md:flex w-1/2 items-center">
                                        <p
                                            className={`max-w-xs text-lg text-gray-700 leading-relaxed font-medium ${milestone.position === "right"
                                                ? "text-right mr-auto pr-6 md:mr-34"
                                                : "text-left ml-auto pl-6 md:ml-34"
                                                }`}
                                            data-aos="fade-up" data-aos-delay="250"
                                        >
                                            {milestone.text}
                                        </p>
                                    </div>

                                    {/* --- MOBILE TEXT UNDER IMAGE --- */}
                                    <p className="md:hidden text-gray-700 text-sm mt-3 ml-28 max-w-[16rem]">
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