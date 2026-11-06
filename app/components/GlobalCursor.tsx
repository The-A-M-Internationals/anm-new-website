"use client";

import { useEffect, useRef } from "react";

/**
 * Site-wide context cursor: a label bubble that follows the pointer over anything tagged
 * `data-cursor="view" | "play" | "drag"` (the native cursor stays). Mouse/trackpad only.
 * Hit-testing also runs on scroll, because pointer events are paused while the page glides.
 * One small rAF loop that sleeps when the bubble is hidden and settled; transform-only.
 */
// OurClients keeps its own bubble, marked with an empty data-cursor: ignore that one
const TAGGED = '[data-cursor]:not([data-cursor=""])';

const LABELS: Record<string, { en: string; ar: string }> = {
  view: { en: "View", ar: "عرض" },
  play: { en: "Play", ar: "تشغيل" },
  drag: { en: "Drag", ar: "اسحب" },
};

export default function GlobalCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const label = el.firstElementChild as HTMLElement;
    const s = { x: 0, y: 0, tx: 0, ty: 0, show: 0, tshow: 0, seen: false };
    let raf = 0, last = 0, kind = "";

    const setKind = (k: string) => {
      if (k === kind) return;
      kind = k;
      if (k) label.textContent = LABELS[k]?.[document.documentElement.lang === "ar" ? "ar" : "en"] ?? k;
    };
    const target = (k: string) => {
      s.tshow = k ? 1 : 0;
      if (k) setKind(k);
      start();
    };

    const frame = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0; last = now;
      const k = reduce ? 1 : 1 - Math.pow(1 - 0.28, dt * 60);
      s.x += (s.tx - s.x) * k; s.y += (s.ty - s.y) * k;
      s.show += (s.tshow - s.show) * (reduce ? 1 : 1 - Math.pow(1 - 0.3, dt * 60));
      el.style.transform = `translate3d(${s.x.toFixed(1)}px,${s.y.toFixed(1)}px,0) translate(-50%,-50%) scale(${s.show.toFixed(3)})`;
      const settled = Math.abs(s.tshow - s.show) < 0.002 && (s.show < 0.002 || (Math.abs(s.tx - s.x) < 0.1 && Math.abs(s.ty - s.y) < 0.1));
      raf = settled ? 0 : requestAnimationFrame(frame);
    };
    function start() { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } }

    const kindAt = (node: EventTarget | null) =>
      ((node as Element | null)?.closest?.(TAGGED) as HTMLElement | null)?.dataset.cursor ?? "";

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      s.tx = e.clientX; s.ty = e.clientY;
      if (!s.seen) { s.x = s.tx; s.y = s.ty; s.seen = true; }
      const k = kindAt(e.target);
      if (k && !s.tshow) { s.x = s.tx; s.y = s.ty; }               // appear under the pointer
      target(k);
    };
    // While the page glides, pointer events are off: hit-test the tagged elements by geometry
    const onScroll = () => {
      if (!s.seen) return;
      let k = "";
      for (const t of document.querySelectorAll<HTMLElement>(TAGGED)) {
        const r = t.getBoundingClientRect();
        if (s.tx >= r.left && s.tx <= r.right && s.ty >= r.top && s.ty <= r.bottom) { k = t.dataset.cursor ?? ""; break; }
      }
      if (k && !s.tshow) { s.x = s.tx; s.y = s.ty; }
      target(k);
    };
    const onLeave = () => target("");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] grid h-[84px] w-[84px] place-items-center rounded-full border border-[#c9a13b]/45 bg-[#0d1d4a] text-[11px] font-bold uppercase tracking-[0.18em] text-[#f2cd62] shadow-[0_10px_24px_-6px_rgba(11,19,43,0.4)] will-change-transform"
      style={{ transform: "scale(0)", fontFamily: "ui-monospace, Menlo, Consolas, monospace" }}
    >
      <span />
    </div>
  );
}
