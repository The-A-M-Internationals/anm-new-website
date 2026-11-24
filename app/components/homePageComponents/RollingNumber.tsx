"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";

/**
 * A number whose digits roll into place like a counter wheel: every digit is a masked column that
 * spins down to its figure, the last digit spinning the most, then the suffix ("+") pops in gold.
 * Transform and opacity only. With reduced motion the final number is simply shown.
 */
type Props = { value: number; suffix?: string; delay?: number; className?: string; style?: CSSProperties };

export default function RollingNumber({ value, suffix = "", delay = 0, className, style }: Props) {
  const root = useRef<HTMLSpanElement>(null);
  const digits = String(Math.max(0, Math.round(value))).split("").map(Number);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const strips = gsap.utils.toArray<HTMLElement>("[data-roll]", el);
      // on the first page of a visit the opening intro covers the hero for about five seconds
      const intro = document.documentElement.dataset.intro;
      const tl = gsap.timeline({ delay: delay + (intro === "skip" || intro === "done" ? 0 : 5.2) });
      strips.forEach((strip, i) => {
        tl.fromTo(strip, { yPercent: 0 }, { yPercent: Number(strip.dataset.roll), duration: 1.5 + i * 0.35, ease: "expo.out" }, i * 0.1);
      });
      if (el.querySelector("[data-roll-suffix]")) tl.fromTo("[data-roll-suffix]", { autoAlpha: 0, scale: 0.3, yPercent: 30 }, { autoAlpha: 1, scale: 1, yPercent: 0, duration: 0.6, ease: "back.out(2.6)" }, "-=0.75");
      return () => tl.kill();
    }, el);
    return () => mm.revert();
  }, [value, delay]);

  return (
    <span ref={root} className={`inline-flex items-baseline justify-center tabular-nums ${className ?? ""}`} style={style} role="text" aria-label={`${value}${suffix}`} dir="ltr">
      {digits.map((d, i) => {
        const last = 10 * (i + 1) + d;   // each column to the right makes one more full turn
        const end = -(last / (last + 1)) * 100;
        return (
          <span key={`${digits.length}-${i}`} aria-hidden className="inline-block h-[1.15em] overflow-hidden leading-[1.15]">
            <span data-roll={end} className="flex flex-col will-change-transform motion-reduce:[transform:translateY(var(--end))]" style={{ "--end": `${end}%` } as CSSProperties}>
              {Array.from({ length: last + 1 }, (_, n) => <span key={n} className="block h-[1.15em]">{n % 10}</span>)}
            </span>
          </span>
        );
      })}
      {suffix && <span data-roll-suffix aria-hidden className="inline-block text-[#D4AF37] motion-safe:opacity-0">{suffix}</span>}
    </span>
  );
}
