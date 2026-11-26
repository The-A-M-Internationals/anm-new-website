import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FillText from "./FillText";
import type { ShowcaseService } from "./types";

type Props = { service: ShowcaseService; index: number; byWord: boolean };

/** One service's copy beside the film panel: number, name, the sentence that fills in, what it covers, the link. */
export default function StageCopy({ service, index, byWord }: Props) {
  const titleId = `showcase-${service.id}-title`;

  return (
    <article
      data-block
      aria-labelledby={titleId}
      className="flex flex-col px-1 pt-6 pb-14 lg:p-0"
    >
      <p className="flex items-baseline gap-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#8A6D1C]">
        <span className="tabular-nums text-[#050E30]/45">{String(index + 1).padStart(2, "0")}</span>
        {service.eyebrow}
      </p>
      <h3 id={titleId} className="mt-3 text-[clamp(26px,3vw,44px)] font-bold leading-[1.1] tracking-tight text-[#050E30]">
        {service.title}
      </h3>
      {service.desc && (
        <FillText
          text={service.desc}
          byWord={byWord}
          className="mt-[clamp(16px,3vh,30px)] text-[clamp(20px,2.6vw,38px)] font-medium leading-[1.18] tracking-[-0.02em] text-[#050E30]"
        />
      )}

      <ul className="mt-[clamp(16px,3vh,30px)] flex flex-wrap gap-2">
        {service.list.map((item) => (
          <li key={item} className="rounded-full border border-[#050E30]/20 px-3.5 py-1.5 text-[13.5px] font-medium text-[#050E30]">
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-[clamp(18px,3.4vh,34px)] flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link
          href={service.href}
          aria-describedby={titleId}
          className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full bg-[#050E30] px-6 py-3 text-sm font-semibold text-white hover:bg-[#C9A84C] hover:text-[#050E30] transition-all duration-150 ease-in-out"
        >
          {service.explore}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
        </Link>
        {service.tags.length > 0 && (
          <p className="text-[13px] font-medium text-[#050E30]/55">{service.tags.join(" · ")}</p>
        )}
      </div>
    </article>
  );
}
