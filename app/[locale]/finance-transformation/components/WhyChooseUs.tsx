"use client";

import { useRef } from "react";
import { useIntlayer, useLocale } from "next-intlayer";
import { useWhyChoose } from "./useWhyChoose";

type Feature = { title: { value: string }; description: { value: string }; highlight: boolean };

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/**
 * "Why Choose The A&M Internationals?": heading on one side, three cards on the other.
 * The gold bar is not fixed to one card: it travels from card to card by itself and jumps to the
 * card under the mouse; the card that carries it lifts and its title turns gold (see useWhyChoose).
 */
const WhyChooseUs = () => {
    const content = useIntlayer("financeTransformationWhyChooseUs");
    const { locale } = useLocale();
    const isArabic = locale === "ar";
    const features = content.features as unknown as Feature[];
    const root = useRef<HTMLDivElement>(null);
    const { active, hold, release } = useWhyChoose(root, features.length, Math.max(0, features.findIndex((f) => f.highlight)), isArabic);

    // Heading split into words, each rising out of its own mask; the second line is gold
    const lines: string[] = [String(content.titleLine1.value), String(content.titleLine2.value)];
    const word = (w: string, gold: boolean, key: string) => (
        <span key={key} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <span data-why-word className={`inline-block will-change-transform motion-safe:[transform:translateY(118%)] ${gold ? "text-[#D4AF37]" : ""}`}>{w}</span>
        </span>
    );

    return (
        <div
            ref={root}
            className="no-global-reveal relative py-12 md:py-20 lg:py-24 px-4 overflow-hidden bg-[#0F1E4D]"
            style={{ backgroundImage: "url('/whychooseus.svg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center -100px" }}
            dir={isArabic ? "rtl" : "ltr"}
        >
            <div className={`w-[95%] mx-auto relative z-10 flex flex-col lg:flex-row items-center lg:items-center ${isArabic ? "gap-20" : "gap-10"}`}>
                {/* TITLE (English: sits toward the middle, next to the cards; mirrors the Arabic layout) */}
                <div className={`flex items-center justify-center text-center lg:text-start lg:w-1/2 ${isArabic ? "lg:mr-12" : "lg:justify-end lg:pe-6"}`}>
                    <h2 aria-label={lines.join(" ")} className={`text-4xl md:text-5xl lg:text-[64px] font-bold text-white leading-tight ${isArabic ? "" : "lg:max-w-[520px]"}`}>
                        {lines.map((line, l) => (
                            <span key={l} aria-hidden className="block">
                                {line.split(" ").map((w, i) => [word(w, l === 1, `${l}-${i}`), " "])}
                            </span>
                        ))}
                    </h2>
                </div>

                {/* CARDS */}
                <div className={`flex flex-col gap-6 w-full xl:translate-x-25 lg:w-1/2 items-center lg:items-start ${isArabic ? "lg:ml-12" : ""}`}>
                    {features.map((feature, index) => {
                        const on = index === active;
                        return (
                            <div
                                key={index}
                                data-why-card
                                onPointerEnter={(e) => hold(index, e.pointerType === "mouse")}
                                onPointerLeave={release}
                                className={`relative overflow-hidden bg-white rounded-2xl shadow-lg p-4 ps-7 lg:px-7 lg:ps-9 w-full max-w-sm lg:w-[500px] text-[#050E30] motion-safe:opacity-0 transition-[translate] duration-500 ${EASE} ${on ? "-translate-y-1.5" : ""} ${index === 1 ? "lg:ms-16" : ""}`}
                            >
                                <span aria-hidden className="absolute inset-y-0 start-0 w-2 bg-[#D9D9D9]" />
                                <span aria-hidden className={`absolute inset-y-0 start-0 w-2 origin-top bg-gradient-to-b from-[#F3D98B] to-[#A8842A] transition-[scale] duration-700 ${EASE} ${on ? "scale-y-100" : "scale-y-0"}`} />
                                <p className={`text-2xl md:text-[30px] mb-1 font-semibold transition-colors duration-500 ${on ? "text-[#A8842A]" : ""}`}>{feature.title.value}</p>
                                <p className="text-[18px] text-slate-600">{feature.description.value}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
