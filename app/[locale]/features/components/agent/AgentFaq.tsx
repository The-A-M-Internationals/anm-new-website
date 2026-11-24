"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import AgentHeading from "./AgentHeading";
import { A_ITEM, useAgentReveal, type Txt } from "./useAgentReveal";

/** H. Questions about the EPM Build Agent: accordion in the Contact page FAQ style */
export default function AgentFaq() {
  const c = useIntlayer("featuresAgent").faq;
  const ref = useAgentReveal();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div ref={ref} id="agent-faq" className="no-global-reveal relative overflow-hidden bg-[#0D1B3E] px-4 py-12 md:py-16 lg:py-20"
      style={{ backgroundImage: "url('/whychooseus.svg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "right -100px" }}>
      <div className="mx-auto max-w-4xl">
        <AgentHeading text={c.title.value} gold={3} dark className="text-center" />
        <div className="mt-10 space-y-4 md:mt-14">
          {(c.items as { q: Txt; a: Txt }[]).map((f, i) => (
            <div key={i} data-a-item className={`border-b border-white/70 pb-4 ${A_ITEM}`}>
              <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-controls={`agent-faq-${i}`}
                className="flex w-full cursor-pointer items-start justify-between gap-4 py-1 text-start">
                <h3 className="flex-1 text-lg font-medium text-white md:text-xl">{f.q.value}</h3>
                <span className="flex h-8 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#050E30]">
                  {open === i ? <Minus className="h-5 w-5" aria-hidden /> : <Plus className="h-5 w-5" aria-hidden />}
                </span>
              </button>
              <div id={`agent-faq-${i}`} role="region" className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open === i ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <div className="overflow-hidden">
                  <p className="rounded-lg bg-white/95 p-6 leading-relaxed text-gray-700">{f.a.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
