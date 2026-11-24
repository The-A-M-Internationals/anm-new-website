"use client";

import { useIntlayer } from "next-intlayer";
import OraclePartnerBadge from "@/app/components/OraclePartnerBadge";
import AgentHeading from "./AgentHeading";
import { A_ITEM, useAgentReveal } from "./useAgentReveal";

/** G. Built by people who do this work: centred statement with the Oracle partner badge */
export default function AgentBuiltBy() {
  const c = useIntlayer("featuresAgent").builtBy;
  const ref = useAgentReveal();
  return (
    <div ref={ref} id="built-by" className="no-global-reveal bg-white px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <AgentHeading text={c.title.value} gold={3} />
        <p data-a-item className={`mt-8 text-[clamp(22px,2.6vw,38px)] font-semibold leading-[1.25] tracking-[-0.01em] text-[#050E30] ${A_ITEM}`}>{c.text.value}</p>
        <div data-a-item className={`mt-9 flex flex-col items-center gap-3 px-8 py-2 ${A_ITEM}`}>
          <OraclePartnerBadge tone="light" className="h-12 w-auto" />
          <span className="text-sm font-semibold text-[#050E30]">{c.badge.value}</span>
        </div>
      </div>
    </div>
  );
}
