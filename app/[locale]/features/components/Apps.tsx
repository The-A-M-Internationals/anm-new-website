"use client";

import { useIntlayer } from "next-intlayer";

const Apps = () => {
    const content = useIntlayer("featuresApps");
    const topRowApps = [
        content.app1,
        content.app2,
        content.app3,
        content.app4
    ];

    const bottomRowApps = [
        content.app5,
        content.app6,
        content.app7,
        content.app8
    ];

    return (
        <div
            className="
        relative py-12 md:py-20 lg:py-24 px-4 overflow-hidden 
        bg-[#0F1E4D]
      "
            style={{
                backgroundImage: "url('/whychooseus.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "right -100px",
            }}
        >
            <div className="max-w-6xl mx-auto text-center">
                {/* Header */}
                <h2 className="text-4xl md:text-[48px] font-bold text-white mb-3">
                    {content.titlePrefix} <span className="text-yellow-500">{content.titleHighlight}</span>
                </h2>
                <p className="text-gray-300 mb-12 text-lg">
                    {content.subtitle}
                </p>

                {/* Integration Pills */}
                <div className="space-y-4">
                    {/* Top Row */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {topRowApps.map((app, index) => (
                            <div
                                key={index}
                                className="bg-white text-[#000000] px-8 py-4 rounded-xl font-semibold text-lg transition-all"
                            >
                                {app}
                            </div>
                        ))}
                    </div>

                    {/* Bottom Row */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {bottomRowApps.map((app, index) => (
                            <div
                                key={index}
                                className="bg-white text-[#000000] px-8 py-4 rounded-xl font-semibold text-lg transition-all"
                            >
                                {app}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Apps;