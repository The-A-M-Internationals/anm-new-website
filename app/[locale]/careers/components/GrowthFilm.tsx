"use client";

import { useEffect, useRef, useState } from "react";

type Film = { destroy: () => void };
declare global {
  interface Window { AnmGrowthFilm?: (el: HTMLElement, opts: { onStage?: (i: number) => void; hold?: () => boolean }) => Film | null }
}

/** The 3D engine (three.js r128, kept in /public/vendor) and the film itself: plain scripts, loaded in order, once */
const SCRIPTS = ["/vendor/three-r128/three.min.js", "/vendor/three-r128/RoomEnvironment.js", "/films/growth-film.js"];
const loading = new Map<string, Promise<void>>();
const load = (src: string) => {
  if (!loading.has(src)) loading.set(src, new Promise<void>((ok, fail) => {
    const s = document.createElement("script"); s.src = src; s.async = false; s.onload = () => ok(); s.onerror = () => fail(new Error(src)); document.head.appendChild(s);
  }));
  return loading.get(src)!;
};

/**
 * Professional Growth film behind the navy benefits tile (see /public/films/growth-film.js).
 * It starts by itself shortly after the page has loaded (no hover, no click) and plays whenever the tile
 * is on screen. Smooth scrolling comes first: it is prepared only while the page is at rest and holds
 * still while the page is moving, so its 3D work never competes with the scroll.
 * Never with reduced motion: then, or if the device cannot run it, the tile stays plain navy.
 * `stages`: the translated name of each scene, shown small in the corner.
 */
export default function GrowthFilm({ stages }: { stages: string[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let film: Film | null = null, gone = false;
    // "moving" = the page scrolled within the last 0.3 seconds (covers the whole glide, and the pauses inside it)
    let lastScroll = 0;
    const onScroll = () => { lastScroll = performance.now(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    const moving = () => performance.now() - lastScroll < 300;
    let started = false, wait = 0;
    // start as soon as the page has loaded and is at rest, wherever the tile is, so the film is already
    // playing by the time anyone scrolls to it (it only draws while it is on screen)
    const begin = () => {
      if (gone || started) return;
      if (moving()) { wait = window.setTimeout(begin, 200); return; }   // not in the middle of a scroll
      started = true;
      SCRIPTS.reduce((before, src) => before.then(() => load(src)), Promise.resolve())
        .then(() => {
          if (gone || !window.AnmGrowthFilm) return;
          film = window.AnmGrowthFilm(el, { onStage: setStage, hold: moving });
          if (film) setReady(true);
        })
        .catch(() => { /* no 3D on this device or connection: the tile stays plain navy */ });
    };
    const kick = () => { wait = window.setTimeout(begin, 500); };
    if (document.readyState === "complete") kick(); else window.addEventListener("load", kick, { once: true });
    return () => { gone = true; window.clearTimeout(wait); window.removeEventListener("scroll", onScroll); window.removeEventListener("load", kick); film?.destroy(); };
  }, []);

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out ${ready ? "opacity-100" : "opacity-0"}`}>
      {/* mirrored in Arabic, so the action stays on the side away from the text */}
      <div ref={stageRef} className="absolute inset-0 rtl:-scale-x-100" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#050E30_0%,#050E30_34%,rgba(5,14,48,0.8)_48%,rgba(5,14,48,0)_66%)] rtl:bg-[linear-gradient(270deg,#050E30_0%,#050E30_34%,rgba(5,14,48,0.8)_48%,rgba(5,14,48,0)_66%)]" />
      <span className="absolute end-6 top-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E6CF8B] md:end-8 md:top-8 md:text-xs">{stages[stage] ?? ""}</span>
    </div>
  );
}
