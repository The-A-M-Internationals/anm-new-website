"use client";

import { useIntlayer } from "next-intlayer";
import AgentHeading from "./AgentHeading";
import { A_ITEM, useAgentReveal, type Txt } from "./useAgentReveal";
import { SCENES, useStepFilm } from "./useStepFilm";

/** B. How it works: the step as one large word beside a drawing that reshapes itself for each step */
export default function AgentSteps() {
  const c = useIntlayer("featuresAgent").how;
  const steps = c.steps as { title: Txt; text: Txt }[];
  const ref = useAgentReveal();
  const { active, pick } = useStepFilm(ref);
  return (
    <div ref={ref} id="how-it-works" className="no-global-reveal bg-white px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl p-2 md:p-7">
        <AgentHeading text={c.title.value} gold={1} />
        <div data-a-item className={`mt-10 grid items-center gap-10 md:mt-14 lg:grid-cols-[1.05fr_0.95fr] ${A_ITEM}`}>
          <div>
            {/* the step's name, swapping inside a mask that cuts only above and below, never the last letter */}
            <div className="relative h-[clamp(46px,6.9vw,106px)] [clip-path:inset(0_-100vw)]" aria-live="polite">
              {steps.map((s, i) => (
                <span key={i} data-film-verb aria-hidden={i !== active} className={`absolute start-0 top-0 whitespace-nowrap text-[clamp(32px,5.4vw,82px)] font-bold leading-[1.18] tracking-[-0.03em] text-[#050E30] will-change-transform ${i === 0 ? "" : "opacity-0"}`}>
                  {s.title.value}
                </span>
              ))}
            </div>
            <div className="relative mt-5 min-h-[6.5em] max-w-[34rem] text-lg leading-relaxed text-slate-600 md:text-xl">
              {steps.map((s, i) => (
                <p key={i} aria-hidden={i !== active} className={`absolute inset-x-0 top-0 transition-opacity duration-500 ease-out ${i === active ? "opacity-100" : "opacity-0"}`}>{s.text.value}</p>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2" role="tablist">
              {steps.map((s, i) => (
                <button key={i} role="tab" aria-selected={i === active} onClick={() => pick(i)}
                  className={`cursor-pointer py-2 text-base font-semibold transition-colors duration-150 ease-in-out hover:text-[#ab8d2b] md:text-lg ${i === active ? "text-[#050E30]" : "text-[#050E30]/30"}`}>
                  {s.title.value}
                </button>
              ))}
            </div>
          </div>
          <svg viewBox="40 80 440 440" aria-hidden className="mx-auto w-full max-w-[400px] overflow-visible lg:me-0 lg:max-w-[520px]">
            {SCENES[0].pts.map(([x1, y1, x2, y2], n) => (
              <line key={n} data-film-line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#050E30" strokeWidth="3.2" strokeLinecap="round" />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
}
