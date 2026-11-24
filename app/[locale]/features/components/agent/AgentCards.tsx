"use client";

import { useState } from "react";
import { useIntlayer } from "next-intlayer";
import AgentHeading from "./AgentHeading";
import { A_ITEM, useAgentReveal, type Txt } from "./useAgentReveal";

/**
 * C. You stay in control / E. Who it is for: three statements in large type. The one being pointed at
 * (the first, until then) stands at full strength with a gold underline and its explanation; the
 * others step back. On touch screens all three simply show.
 */
export default function AgentCards({ which }: { which: "control" | "audience" }) {
  const c = useIntlayer("featuresAgent")[which];
  const cards = c.cards as { title: Txt; text: Txt }[];
  const ref = useAgentReveal();
  const [active, setActive] = useState(0);
  return (
    <div ref={ref} id={which === "control" ? "in-control" : "who-its-for"} className="no-global-reveal bg-white px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl p-2 md:p-7">
        <AgentHeading text={c.title.value} gold={which === "control" ? 2 : 1} />
        <div className="mt-8 md:mt-12" onPointerLeave={() => setActive(0)}>
          {cards.map((card, i) => {
            const on = i === active;
            return (
              <article key={i} data-a-item onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                className={`grid items-end gap-x-10 gap-y-2 py-5 md:py-6 lg:grid-cols-[1.1fr_0.9fr] ${A_ITEM}`}>
                <h3 className={`text-[clamp(26px,3.7vw,56px)] font-bold leading-[1.08] tracking-[-0.025em] text-[#050E30] transition-opacity duration-500 ease-out ${on ? "" : "lg:[@media(hover:hover)]:opacity-25"}`}>
                  <span className={`bg-[linear-gradient(#C9A13B,#C9A13B)] bg-[position:0_94%] bg-no-repeat pb-1 transition-[background-size] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rtl:bg-[position:100%_94%] ${on ? "lg:[@media(hover:hover)]:bg-[length:100%_3px] bg-[length:0%_3px]" : "bg-[length:0%_3px]"}`}>{card.title.value}</span>
                </h3>
                <p className={`max-w-[32rem] pb-1 text-base leading-relaxed text-slate-600 transition-[opacity,translate] duration-500 ease-out md:text-lg ${on ? "" : "lg:[@media(hover:hover)]:translate-y-2 lg:[@media(hover:hover)]:opacity-0"}`}>{card.text.value}</p>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
