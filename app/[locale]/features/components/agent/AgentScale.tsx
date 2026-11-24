"use client";

import AgentHeading from "./AgentHeading";
import { A_ITEM, useAgentReveal } from "./useAgentReveal";

export type ScaleRow = { label: string; title: string; text?: string };

/** Type size and strength per row: what is now is largest, what is further away is smaller and fainter */
const SIZE = ["text-[clamp(34px,5.6vw,88px)]", "text-[clamp(27px,3.8vw,58px)]", "text-[clamp(22px,2.6vw,38px)]", "text-[clamp(18px,1.9vw,27px)]"];
const FADE = ["", "opacity-60", "opacity-40", "opacity-[0.28]"];

/**
 * D. Where we are starting / F. Roadmap: a list where distance in time is shown as distance in size.
 * The first row carries the gold tag (`tag`); pointing at a later row brings it to full strength.
 */
export default function AgentScale({ id, title, gold = 1, intro, rows, tag }: { id: string; title: string; gold?: number; intro?: string; rows: ScaleRow[]; tag?: string }) {
  const ref = useAgentReveal();
  return (
    <div ref={ref} id={id} className="no-global-reveal bg-white px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl p-2 md:p-7">
        <AgentHeading text={title} gold={gold} />
        {intro && <p data-a-item className={`mt-4 max-w-[38rem] text-lg leading-relaxed text-slate-600 md:text-xl ${A_ITEM}`}>{intro}</p>}
        <ol className="mt-8 md:mt-12">
          {rows.map((r, i) => {
            const step = Math.min(i, SIZE.length - 1);
            return (
              <li key={i} data-a-item className={`grid items-baseline gap-x-8 gap-y-1 md:grid-cols-[minmax(0,220px)_1fr] ${i ? "mt-6 md:mt-7" : ""} ${A_ITEM}`}>
                <p className={`flex flex-wrap items-center gap-2 text-sm font-semibold text-[#050E30]/60 md:text-[15px] ${FADE[step]}`}>
                  {r.label}
                  {i === 0 && tag && <span className="rounded-full bg-[#D4AF37] px-3 py-0.5 text-xs text-[#050E30]">{tag}</span>}
                </p>
                <div className={`transition-opacity duration-300 ease-out hover:opacity-100 ${FADE[step]}`}>
                  <h3 className={`font-bold leading-[1.06] tracking-[-0.03em] text-[#050E30] ${SIZE[step]}`}>{r.title}</h3>
                  {r.text && <p className={`mt-2 max-w-[36rem] leading-relaxed text-slate-600 ${i === 0 ? "text-lg md:text-xl" : "text-base"}`}>{r.text}</p>}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
