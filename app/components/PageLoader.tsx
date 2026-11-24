"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ICON_SHAPES, ICON_VIEWBOX } from "./intro/iconShapes";

/**
 * Loading screen between pages: a white screen where the A&M icon draws itself in gold in step with
 * the load, and a count rises in the bottom corner.
 * It starts on the "page:leaving" event (PageLeave.tsx). A page cannot report an exact percentage, so
 * the count climbs by itself towards 90 at a pace that follows how long things are taking, and runs to
 * 100 the moment the next page has really mounted (a fast connection rockets straight up).
 * Never shown with reduced motion (PageLeave does not announce then). Transform and opacity only.
 */
export default function PageLoader() {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const state = useRef({ running: false, ready: false });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const strokes = Array.from(el.querySelectorAll<SVGPathElement>("[data-load-stroke]")), count = el.querySelector<HTMLElement>("[data-load-count]")!;
    const lens = strokes.map((p) => { const len = p.getTotalLength(); p.style.strokeDasharray = String(len); return len; });
    const paint = (p: number) => { count.textContent = String(Math.round(p)); strokes.forEach((s, i) => { s.style.strokeDashoffset = String(lens[i] * (1 - p / 100)); }); };
    let frame = 0, giveUp = 0;

    const finish = () => {
      state.current.running = false; window.clearTimeout(giveUp);
      gsap.timeline()
        .to(el.querySelector("[data-load-fill]"), { opacity: 1, duration: 0.25, ease: "power1.out" })
        .to(count, { yPercent: -120, duration: 0.3, ease: "power3.in" }, 0.08)
        .to(el, { autoAlpha: 0, duration: 0.34, ease: "power2.inOut" }, 0.24);
    };
    const start = () => {
      cancelAnimationFrame(frame); gsap.killTweensOf([el, count, el.querySelector("[data-load-fill]")]);
      state.current = { running: true, ready: false };
      gsap.set(el.querySelector("[data-load-fill]"), { opacity: 0 }); gsap.set(count, { yPercent: 0 }); paint(0);
      gsap.to(el, { autoAlpha: 1, duration: 0.16, ease: "power2.out" });
      let p = 0; const t0 = performance.now();
      const tick = () => {
        const ready = state.current.ready, target = ready ? 100 : 90 * (1 - Math.exp(-(performance.now() - t0) / 1400));
        p += (target - p) * (ready ? 0.34 : 0.06); paint(p);
        if (ready && p > 98.5) { paint(100); finish(); return; }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      // the click led nowhere (PageLeave brings the page back after 6s): never leave the screen white
      window.clearTimeout(giveUp); giveUp = window.setTimeout(() => { state.current.ready = true; }, 6200);
    };
    window.addEventListener("page:leaving", start);
    return () => { window.removeEventListener("page:leaving", start); cancelAnimationFrame(frame); window.clearTimeout(giveUp); };
  }, []);

  // the next page has mounted: the count may run to 100
  useEffect(() => { if (state.current.running) state.current.ready = true; }, [pathname]);

  return (
    <div ref={root} aria-hidden className="pointer-events-none invisible fixed inset-0 z-[9998] bg-white opacity-0">
      <svg viewBox={ICON_VIEWBOX} className="absolute left-1/2 top-1/2 h-auto w-[clamp(72px,8vw,112px)] -translate-x-1/2 -translate-y-[56%] overflow-visible">
        <g data-load-fill fill="#C9A13B" opacity="0">{ICON_SHAPES.map((d) => <path key={d} d={d} />)}</g>
        {ICON_SHAPES.map((d) => <path key={d} data-load-stroke d={d} fill="none" stroke="#C9A13B" strokeWidth="6" strokeLinejoin="round" />)}
      </svg>
      <div className="absolute bottom-7 start-7 overflow-hidden md:bottom-10 md:start-10">
        <span data-load-count className="block text-[clamp(30px,3.6vw,52px)] font-medium leading-none tracking-[0.04em] text-[#050E30] [font-family:Cinzel,Georgia,serif] [font-variant-numeric:tabular-nums]">0</span>
      </div>
    </div>
  );
}
