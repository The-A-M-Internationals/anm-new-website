"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const RINGS = [60, 100, 140, 180];

/**
 * Poster panel for an event that has no photo: slowly turning gold rings behind an oversized date
 * that rises out of a mask when the card scrolls into view. Fills its positioned parent.
 */
export default function EventPoster({ dateRange, month, location }: { dateRange: string; month: string; location?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } })
        .fromTo(el.querySelector("[data-poster-rings]"), { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 0.55, scale: 1, duration: 1.6, ease: "power3.out" }, 0)
        .fromTo(el.querySelector("[data-poster-date]"), { yPercent: 115, y: 0 }, { yPercent: 0, duration: 1.2, ease: "expo.out" }, 0.1)
        .fromTo(el.querySelectorAll("[data-poster-soft]"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 }, 0.5);
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="absolute inset-0 grid place-items-center overflow-hidden bg-[#050E30] p-6 text-center">
      <div data-poster-rings className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 opacity-55">
        <svg viewBox="0 0 400 400" aria-hidden className="h-full w-full animate-[spin_70s_linear_infinite] motion-reduce:animate-none">
          {RINGS.map((r, i) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#D4AF37" strokeWidth="0.7" strokeDasharray={i % 2 ? "2 9" : "40 14"} />
          ))}
        </svg>
      </div>

      <div className="relative flex flex-col items-center gap-2">
        <span className="block overflow-hidden pb-1">
          <span
            data-poster-date
            dir="ltr"
            className="block whitespace-nowrap text-[clamp(56px,7vw,104px)] leading-none text-[#D4AF37] will-change-transform motion-safe:[transform:translateY(115%)]"
            style={{ fontFamily: "Lora, Georgia, serif" }}
          >
            {dateRange}
          </span>
        </span>
        <span data-poster-soft className="text-sm font-semibold uppercase tracking-[0.2em] text-white/85 md:text-base">{month}</span>
        {location && <span data-poster-soft className="mt-1 text-xs text-white/60 md:text-sm">{location}</span>}
      </div>
    </div>
  );
}
