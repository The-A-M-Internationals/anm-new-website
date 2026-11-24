"use client";

import { useIntlayer } from "next-intlayer";

/** EPM Build Agent: "Built on Oracle" band (same dark style as the former integrations section) */
const BuiltOnOracle = () => {
    const content = useIntlayer("featuresBuiltOnOracle");

    return (
        <div
            id="built-on-oracle"
            className="relative py-12 md:py-16 lg:py-20 px-4 overflow-hidden bg-[#0F1E4D]"
            style={{
                backgroundImage: "url('/whychooseus.svg')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "right -100px",
            }}
        >
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-[48px] font-bold text-white mb-3">
                    {content.titlePrefix.value} <span className="text-yellow-500">{content.titleHighlight.value}</span>
                </h2>
                <div className="space-y-3">
                    {[content.line1.value, content.line2.value, content.line3.value].map((line) => (
                        <p key={line} className="text-gray-300 text-lg">{line}</p>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BuiltOnOracle;
