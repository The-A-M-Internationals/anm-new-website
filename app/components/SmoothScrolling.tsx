"use client";

/**
 * THE one smooth-scroll engine for the whole site.
 * Replaces BOTH the old SmoothScrolling.tsx and the SmoothScroll.tsx that came with
 * OurClients — two Lenis instances fighting over window.scrollTo is the #1 cause of
 * "stutter when scrolling past sections". Mount it once in app/layout.tsx.
 *
 * • Lenis is driven by GSAP's ticker (autoRaf: false) → one clock for scroll + ScrollTrigger.
 * • Exposes the instance via useLenis() and window.__lenis for anchor links / back-to-top.
 * • Re-measures ScrollTrigger once fonts and images have loaded (late layout shifts
 *   otherwise make triggers fire in the wrong place and cause jumps).
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

declare global { interface Window { __lenis?: Lenis } }

/**
 * Scroll feel (default: snappy). Override for testing: ?scroll=current | snappy | native (remembered per tab).
 * - current: duration-based glide (1.1 s expo ease-out)
 * - snappy:  frame-based lerp — quicker response, short tail (typical award-site feel)
 * - native:  no Lenis; the browser's own compositor-threaded smooth scrolling
 */
type ScrollMode = "current" | "snappy" | "native";
const MODES: ScrollMode[] = ["current", "snappy", "native"];
function scrollMode(): ScrollMode {
  const q = new URLSearchParams(window.location.search).get("scroll") as ScrollMode | null;
  try {
    if (q && MODES.includes(q)) sessionStorage.setItem("anm-scroll", q);
    const saved = sessionStorage.getItem("anm-scroll") as ScrollMode | null;
    if (saved && MODES.includes(saved)) return saved;
  } catch {}
  return q && MODES.includes(q) ? q : "snappy";
}

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });   // no re-layout when the mobile URL bar shows/hides

    if (window.__lenis) return;                            // guard against a second mount (Strict Mode / duplicate providers)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mode = scrollMode();
    document.documentElement.dataset.scroll = mode;
    if (mode === "native") return;                         // consumers fall back to window.scrollTo

    const feel = mode === "snappy"
      ? { lerp: 0.12 }
      : { duration: 1.1, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) };
    const l = new Lenis({
      autoRaf: false,                                      // GSAP's ticker drives it (below) — never two rAF loops
      ...feel,
      smoothWheel: !reduce,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      syncTouch: false,                                    // native momentum on touch devices = smoothest on phones
    });
    window.__lenis = l;
    l.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    // Late content (fetched events, lazy sections) changes the page height after triggers were
    // measured. Re-measure once things settle — and only while Lenis is idle, so the wheel never hitches.
    let settle = 0, lastH = document.body.scrollHeight;
    const refreshWhenIdle = () => {
      if (l.isScrolling) { settle = window.setTimeout(refreshWhenIdle, 200); return; }
      const h = document.body.scrollHeight;
      if (h === lastH) return;                             // width-only / no-op changes: nothing to re-measure
      lastH = h;
      l.resize();
      ScrollTrigger.refresh();
    };
    const ro = new ResizeObserver(() => { window.clearTimeout(settle); settle = window.setTimeout(refreshWhenIdle, 250); });
    ro.observe(document.body);

    setLenis(l);
    return () => {
      ro.disconnect();
      window.clearTimeout(settle);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(tick);
      l.destroy();
      if (window.__lenis === l) delete window.__lenis;
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
