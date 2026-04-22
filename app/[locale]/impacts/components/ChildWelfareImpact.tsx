'use client';

import { useIntlayer } from "next-intlayer";


const ChildWelfareImpact = () => {
    const content = useIntlayer("impactsChildWelfare");

    const stats = [
        {
            value: content.stats[0].value,
            title: content.stats[0].title,
            description: content.stats[0].description
        },
        {
            value: content.stats[1].value,
            title: content.stats[1].title,
            description: content.stats[1].description
        },
        {
            value: content.stats[2].value,
            title: content.stats[2].title,
            description: content.stats[2].description
        }
    ];

    return (
        <section className="mt-15 md:mt-20 py-12 px-6 md:px-12 bg-[#FFFBED]">
            <div className="max-w-6xl mx-auto ">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className=" text-4xl md:text-5xl font-bold bg-clip-text text-[#D4AF37] mb-4">
                        {content.headerTitle}
                    </h2>
                    <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
                        {content.headerDescription}
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-3xl flex flex-col p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 items-center justify-center text-center"
                        >
                            {/* Large Number/Value */}
                            <div className="text-5xl md:text-4xl bg-clip-text font-semibold text-[#D4AF37] mb-4">
                                {stat.value}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {stat.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {stat.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ChildWelfareImpact;