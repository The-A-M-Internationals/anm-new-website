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
                            <div key={index} className="spot-card group flex flex-col items-center text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm shadow-sm border border-gray-100 transform-gpu transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-xl">
                                <h4 className="text-[#C9A84C] font-bold text-xl mb-3 relative w-fit after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:origin-left rtl:after:origin-right after:scale-x-0 after:bg-[#C9A13B] after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:after:scale-x-100">{pillar?.title?.value}</h4>
                                <p className="text-gray-600 text-sm">{pillar?.description?.value}</p>
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
