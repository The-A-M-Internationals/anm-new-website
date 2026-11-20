'use client';

import React from 'react';
import { useIntlayer } from "next-intlayer";
import WelfareGraph from "./WelfareGraph";

const ChildWelfareImpact = () => {
    const content = useIntlayer("impactsChildWelfare");

    return (
        <section className="py-12 md:py-20 lg:py-24 px-6 md:px-12 bg-[#FFFBED]">
            <div className="max-w-6xl mx-auto">

                {/* Header - Contribution line */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {content?.headerTitle?.value}
                    </h2>
                    <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed italic">
                        {content?.headerDescription?.value}
                    </p>
                </div>

                <WelfareGraph />

                {/* CSR SECTION */}
                <div className="border-t border-gray-200 pt-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 uppercase tracking-tight">
                            {content?.csrTitle?.value}
                        </h2>
                        <p className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed italic">
                            {content?.csrDescription?.value}
                        </p>
                    </div>

                    {/* CSR Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {content?.csrPillars?.map((pillar: any, index: number) => (
                            <div key={index} className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm shadow-sm border border-gray-100 cursor-pointer transform hover:-translate-y-2 hover:scale-105 hover:shadow-xl transform-gpu transition-[transform,opacity,box-shadow,border-color] duration-300">
                                <h4 className="text-[#C9A84C] font-bold text-xl mb-3">{pillar?.title?.value}</h4>
                                <p className="text-gray-600 text-sm transition-colors duration-300 group-hover:text-[#C9A84C]">{pillar?.description?.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-[#C9A84C] font-semibold text-lg">
                            {content?.contactText?.value}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ChildWelfareImpact;
