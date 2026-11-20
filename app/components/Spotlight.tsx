"use client";

import { useEffect } from "react";

/**
 * Gold light that follows the pointer across any `.spot-card` (styles in globals.css).
 * One listener for the whole site: it writes the pointer position into two CSS variables on the
 * card under the pointer, at most once per frame. Mouse and trackpad only; touch screens skip it.
 * Cards inside a mirrored (RTL) wrapper add `data-spot-mirror` so the light stays under the pointer.
 */
export default function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let current: HTMLElement | null = null, frame = 0, x = 0, y = 0;

    const clear = (el: HTMLElement | null) => { el?.style.removeProperty("--spot-x"); el?.style.removeProperty("--spot-y"); };
    const paint = () => {
      frame = 0;
      if (!current) return;
      const box = current.getBoundingClientRect();
      const mirrored = current.dataset.spotMirror !== undefined && document.documentElement.dir === "rtl";
      current.style.setProperty("--spot-x", `${mirrored ? box.right - x : x - box.left}px`);
      current.style.setProperty("--spot-y", `${y - box.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".spot-card") ?? null;
      if (card !== current) { clear(current); current = card; }
      if (!card) return;
      x = e.clientX; y = e.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => { document.removeEventListener("pointermove", onMove); cancelAnimationFrame(frame); clear(current); };
  }, []);

  return null;
}
