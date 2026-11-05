import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ShowcaseService } from "./types";

/** Boxless copy set directly over the 3D scene — same palette as the home hero */
export default function PanelCopy({ service }: { service: ShowcaseService }) {
  const titleId = `showcase-${service.id}-title`;

  return (
    <div className="flex flex-col p-6 sm:p-8 lg:p-0 [text-shadow:0_1px_14px_rgba(0,0,0,0.45)]">
      <p data-reveal className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-[#C9A84C]">{service.eyebrow}</p>
      <h3 data-reveal id={titleId} className="mt-3 text-3xl lg:text-[42px] font-bold leading-[1.15] tracking-tight text-white">
        {service.title}
      </h3>
      {service.desc && (
        <p data-reveal className="mt-4 text-sm lg:text-base font-light leading-relaxed text-white/80">{service.desc}</p>
      )}

      <ul data-reveal className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
        {service.list.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-[13.5px] font-medium text-white/90">
            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-[#C9A84C]" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <div data-reveal className="mt-7">
        <div className="h-px w-full bg-gradient-to-r rtl:bg-gradient-to-l from-white/25 via-white/10 to-transparent" />
        <dl className={`mt-5 grid gap-4 ${service.stats.length > 2 ? "grid-cols-3" : "grid-cols-2"}`}>
          {service.stats.map((s) => (
            <div key={s.label}>
              <dt className="text-2xl lg:text-3xl font-bold text-white" style={{ fontFamily: "Lora, Georgia, serif" }}>{s.num}</dt>
              <dd className="mt-1 text-[10px] lg:text-xs font-semibold uppercase tracking-wider text-[#C9A84C]">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div data-reveal className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-1.5">
          {service.tags.map((tag) => (
            <li key={tag} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-semibold text-white/70">
              {tag}
            </li>
          ))}
        </ul>
        <Link
          href={service.href}
          aria-describedby={titleId}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-[#C9A84C] to-[#E3C973] px-6 py-2.5 text-sm font-bold text-[#050E30] [text-shadow:none] shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-150 ease-in-out"
        >
          {service.explore}
          <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
