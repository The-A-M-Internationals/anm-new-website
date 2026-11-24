"use client";

import { useIntlayer } from "next-intlayer";
import AgentHeading from "./agent/AgentHeading";
import { A_ITEM, useAgentReveal } from "./agent/useAgentReveal";

/** What it's being built to do: four capabilities, revealed one after another as the section scrolls in */
const FeaturesList = () => {
    const content = useIntlayer("featuresList");
    const ref = useAgentReveal();
    const features = [
        { title: content.feature1Title.value, text: content.feature1Text.value },
        { title: content.feature2Title.value, text: content.feature2Text.value },
        { title: content.feature3Title.value, text: content.feature3Text.value },
        { title: content.feature4Title.value, text: content.feature4Text.value },
    ];
    const highlight = String(content.titleHighlight.value);

    return (
        <div ref={ref} id="features" className="no-global-reveal bg-white px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-7xl p-2 md:p-7">
                <AgentHeading text={`${content.titlePrefix.value} ${highlight}`} gold={highlight.split(/\s+/).filter(Boolean).length} />
                <span data-a-item className={`mt-4 inline-block rounded-full bg-[#FFFBED] px-3 py-1.5 text-xs font-semibold text-[#ab8d2b] md:text-sm ${A_ITEM}`}>
                    {content.statusTag.value}
                </span>

                <div className="mt-8 md:mt-10">
                    {features.map((feature, index) => (
                        <div key={index} data-a-item className={`border-b border-[#050E30]/20 py-8 ${A_ITEM}`}>
                            <h3 className="text-2xl font-medium text-[#050E30] md:text-[28px]">{feature.title}</h3>
                            <p className="mt-2 max-w-4xl text-base text-slate-600 md:text-lg">{feature.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesList;
