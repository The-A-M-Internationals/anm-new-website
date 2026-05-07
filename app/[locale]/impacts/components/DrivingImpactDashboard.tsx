'use client';

import React from 'react';
import { useIntlayer, useLocale } from "next-intlayer";

export default function DrivingImpactDashboard() {
    const content = useIntlayer("drivingimpactsDashboard");
    const { locale } = useLocale();

    return (
        <section className="bg-white py-12 md:py-20 lg:py-24 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        {content.header}
                    </h2>
                    <p className="text-[#C9A84C] font-semibold text-xl mb-8">
                        {content.subheader}
                    </p>
                    <div className="text-gray-700 text-lg max-w-4xl mx-auto space-y-6 leading-relaxed text-left md:text-center">
                        <p>{content.intro1}</p>
                        <p>{content.intro2}</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {content.stats.map((stat: { value: { value: string }; label: { value: string } }, index: number) => (
                        <div 
                            key={index} 
                            className="bg-[#FFFBED] border border-gray-200 rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="text-3xl md:text-4xl font-bold text-[#C9A84C] mb-2">
                                {stat.value.value}
                            </div>
                            <div className="text-gray-900 font-medium text-base">
                                {stat.label.value}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
