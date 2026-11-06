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
 * Scroll feel, adapted from Framer's Lenis component. Test overrides (remembered per tab):
 * - ?scroll=glide (default): duration-based glide; length = intensity / 10 s (Framer default 12 → 1.2 s)
 * - ?intensity=1–100: tune the glide live, like Framer's Intensity slider · ?speed=0.3–2: distance per wheel click
 * - ?scroll=snappy: frame-based lerp · ?scroll=native: no Lenis, browser scrolling
 */
type ScrollMode = "glide" | "snappy" | "native";
const MODES: ScrollMode[] = ["glide", "snappy", "native"];
function setting(key: string, valid: (v: string) => boolean, fallback: string) {
  const q = new URLSearchParams(window.location.search).get(key);
  try {
    if (q && valid(q)) sessionStorage.setItem(`anm-${key}`, q);
    const saved = sessionStorage.getItem(`anm-${key}`);
    if (saved && valid(saved)) return saved;
  } catch {}
  return q && valid(q) ? q : fallback;
}
const scrollMode = () => setting("scroll", (v) => MODES.includes(v as ScrollMode), "glide") as ScrollMode;
const intensity = () => Number(setting("intensity", (v) => +v >= 1 && +v <= 100, "12"));
const wheelSpeed = () => Number(setting("speed", (v) => +v >= 0.3 && +v <= 2, "0.7"));

/** Framer "disable/enable smooth" tweak: e.g. turn smoothing off while a modal or map is open. */
export function setSmoothWheel(on: boolean) {
  if (window.__lenis) window.__lenis.options.smoothWheel = on;
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
      ? { lerp: 0.075 }
      : { duration: intensity() / 10, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) };
    const l = new Lenis({
      autoRaf: false,                                      // GSAP's ticker drives it (below) — never two rAF loops
      ...feel,
      smoothWheel: !reduce,
      wheelMultiplier: wheelSpeed(),                     // distance per wheel click (lower = calmer)
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
      if (l.isScrolling === "smooth") { settle = window.setTimeout(refreshWhenIdle, 200); return; }
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
