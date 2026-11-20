"use client";

import { useRef } from "react";
import { BrainCircuit, GraduationCap, HandCoins, Handshake, HeartHandshake, Laptop, Palmtree } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import BenefitTile from "./BenefitTile";
import { useBenefitsReveal } from "./useBenefitsReveal";

/**
 * Careers benefits as a bento: one navy feature tile, four compact tiles beside it and two wide
 * tiles underneath, so all seven benefits and their full text fit in one view on a laptop.
 * Phones stack them in one column; tablets use two.
 */
const Benefits = () => {
    const c = useIntlayer("careersBenefits");
    const grid = useRef<HTMLDivElement>(null);
    useBenefitsReveal(grid);   // tiles rise in one after another on scroll

    return (
        <div className="flex flex-col items-center gap-8 px-4 py-12 md:py-20">
            <div className="flex flex-col items-center text-center">
                <p className="text-3xl md:text-[48px] font-semibold text-[#000000]">
                    <span className="text-[#D4AF37]">{c.titleHighlight.value} </span>
                    {c.titleRest.value}
                </p>
                <p className="text-[#6B7280] text-lg md:text-[24px] mt-2">{c.subtitle.value}</p>
            </div>

            <div ref={grid} className="no-global-reveal grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(124px,auto)]">
                <BenefitTile big icon={GraduationCap} title={c.card1Title.value} description={c.card1Description.value} className="md:col-span-2 lg:row-span-2" />
                <BenefitTile icon={Laptop} title={c.card3Title.value} description={c.card3Description.value} />
                <BenefitTile icon={HandCoins} title={c.card4Title.value} description={c.card4Description.value} />
                <BenefitTile icon={Palmtree} title={c.card5Title.value} description={c.card5Description.value} />
                <BenefitTile icon={BrainCircuit} title={c.card7Title.value} description={c.card7Description.value} />
                <BenefitTile icon={Handshake} title={c.card2Title.value} description={c.card2Description.value} className="lg:col-span-2" />
                <BenefitTile icon={HeartHandshake} title={c.card6Title.value} description={c.card6Description.value} className="lg:col-span-2" />
            </div>
        </div>
    );
};

export default Benefits;
