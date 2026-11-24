import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type Props = { icon: LucideIcon; title: string; description: string; big?: boolean; className?: string; film?: ReactNode };

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/**
 * One tile of the careers benefits bento (`data-benefit` is what useBenefitsReveal animates in).
 * White tiles stay white: on hover the outline turns gold, the icon badge turns solid gold and
 * the icon slowly redraws itself (`.benefit-icon` in globals.css).
 * The `big` tile is already navy: its oversized watermark icon drifts and warms to gold instead.
 * `film` (big tile only) takes the watermark's place, under the text.
 * Both lift and carry the pointer-following gold light (`.spot-card`).
 */
export default function BenefitTile({ icon: Icon, title, description, big = false, className = "", film }: Props) {
  return (
    <article
      data-benefit
      className={`spot-card group relative flex gap-4 overflow-hidden rounded-xl border transition-[translate,box-shadow,border-color] duration-500 ${EASE} hover:-translate-y-2 hover:shadow-xl motion-safe:opacity-0 ${
        big ? "min-h-[240px] flex-col justify-between border-[#050E30] bg-[#050E30] p-7 text-white md:p-8" : "items-center border-slate-200/80 bg-white p-5 text-[#050E30] shadow-xs hover:border-[#D4AF37]"
      } ${className}`}
    >
      {big && !film && (
        <Icon aria-hidden strokeWidth={1} className={`pointer-events-none absolute -bottom-8 -end-6 h-52 w-52 text-white/[0.06] transition-[translate,rotate,color] duration-1000 ${EASE} group-hover:-translate-y-3 group-hover:-rotate-6 group-hover:text-[#C9A13B]/25`} />
      )}

      {big && film}

      <span className={`relative grid shrink-0 place-items-center rounded-full transition-[background-color,color,scale] duration-500 ${EASE} group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-[#050E30] ${big ? "h-16 w-16 bg-white/10 text-[#D4AF37]" : "h-12 w-12 bg-[#C9A13B]/15 text-[#A8842A]"}`}>
        <Icon aria-hidden strokeWidth={1.5} className={`benefit-icon ${big ? "h-8 w-8" : "h-6 w-6"}`} />
      </span>

      {/* with the film, the text keeps to its own side so it never runs over the action */}
      <div className={`relative min-w-0 text-start ${big && film ? "max-w-[60%] sm:max-w-[54%]" : ""}`}>
        <h3 className={`font-semibold leading-tight transition-colors duration-500 ${big ? "text-2xl md:text-3xl" : "text-base md:text-lg"}`}>{title}</h3>
        <p className={`mt-1.5 leading-snug transition-colors duration-500 ${big ? "text-base text-white/70" : "text-sm text-slate-600"}`}>{description}</p>
      </div>
    </article>
  );
}
