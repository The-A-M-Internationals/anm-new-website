'use client';

import Image from "next/image";
import { useIntlayer } from "next-intlayer";

const ProcessMatters = () => {
    const content = useIntlayer("processMatter");

    const benefits = [
        {
            icon: "/business/minimize.svg",
            title: content.benefitsTitle1,
            description: content.benefitsDescription1
        },
        {
            icon: "/business/shorten.svg",
            title: content.benefitsTitle2,
            description: content.benefitsDescription2
        },
        {
            icon: "/business/embed.svg",
            title: content.benefitsTitle3,
            description: content.benefitsDescription3
        }
    ];

    return (
        <section id="process" className="bg-[#FFFBED] py-12 md:py-20 lg:py-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side - Text Content */}
                    <div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-[#D4AF37] mb-6 leading-tight">
                            {content.title}
                        </h2>
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                            {content.description}
                        </p>
                    </div>

                    {/* Right Side - Benefits Cards */}
                    <div className="space-y-1 bg-[#FFFFFF] rounded-[40px] p-4 border border-[#D9D9D9]">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="group rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 "
                            >
                                <div className="flex items-start gap-5">
                                    {/* Icon Container */}
                                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md">
                                        <Image
                                            src={benefit.icon}
                                            alt={benefit.title}
                                            width={34}
                                            height={34}
                                            className="w-14 h-14"
                                        />
                                    </div>

                                    {/* Text Content */}

                                    <div className="flex-1 pt-1">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section >
    );
};

export default ProcessMatters;