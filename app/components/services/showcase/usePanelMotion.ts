"use client";

import { useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Scene } from "../webgl/types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MOTION = "(prefers-reduced-motion: no-preference)";
const QUERIES = {
  desktop: `(min-width: 1024px) and ${MOTION}`,
  mobile: `(max-width: 1023.98px) and ${MOTION}`,
  hover: `(min-width: 1024px) and (hover: hover) and (pointer: fine) and ${MOTION}`,
  reduce: "(prefers-reduced-motion: reduce)",
};

/**
 * Scroll + hover motion for one service panel (natural scroll, no pin).
 * - Expand: the panel scales up to full size as it enters, scrubbed (transform only).
 * - Copy: [data-reveal] lines fade up in sequence, once.
 * - Hover (desktop, fine pointer): quickTo eases a pointer value into the scene
 *   camera (setPointer) and a small counter-parallax on the media layer.
 * Returns whether live media may mount; reduced motion keeps the poster only.
 */
export function usePanelMotion(
  panelRef: RefObject<HTMLElement | null>,
  mediaRef: RefObject<HTMLElement | null>,
  sceneRef: RefObject<Scene | null>
) {
  const [motion, setMotion] = useState(false);

  useGSAP(() => {
    const panel = panelRef.current, media = mediaRef.current;
    if (!panel || !media) return;

    /* created inside the useGSAP context, so it is reverted automatically on unmount */
    gsap.matchMedia().add(QUERIES, (ctx) => {
      const { desktop, hover, reduce } = ctx.conditions as Record<keyof typeof QUERIES, boolean>;
      setMotion(!reduce);
      if (reduce) return;

      /* expand via transform only (compositor) — a scrubbed clip-path repaints the live canvas every frame */
      const scrub = { trigger: panel, start: "top bottom", end: "top 30%", scrub: true };
      gsap.fromTo(panel, { scale: desktop ? 0.94 : 0.96 }, { scale: 1, ease: "none", force3D: true, scrollTrigger: scrub });
      gsap.fromTo(media, { scale: 1.15 }, { scale: desktop ? 1.04 : 1, ease: "none", force3D: true, scrollTrigger: { ...scrub } });

      gsap.from(panel.querySelectorAll("[data-reveal]"), {
        autoAlpha: 0, y: 24, duration: 0.8, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: panel, start: desktop ? "top 60%" : "top 75%", once: true },
      });

      if (!hover) return;
      const tilt = { x: 0, y: 0 };
      const apply = () => sceneRef.current?.setPointer(tilt.x, tilt.y);
      const ease = { duration: 0.6, ease: "power3.out" };
      const toX = gsap.quickTo(tilt, "x", { ...ease, onUpdate: apply });
      const toY = gsap.quickTo(tilt, "y", { ...ease, onUpdate: apply });
      const panX = gsap.quickTo(media, "xPercent", { duration: 0.9, ease: "power3.out" });
      const panY = gsap.quickTo(media, "yPercent", { duration: 0.9, ease: "power3.out" });

      const move = (e: PointerEvent) => {
        const r = panel.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        toX(x); toY(y); panX(-x * 1.2); panY(-y * 1.2);
      };
      const leave = () => { toX(0); toY(0); panX(0); panY(0); };
      panel.addEventListener("pointermove", move);
      panel.addEventListener("pointerleave", leave);
      return () => { panel.removeEventListener("pointermove", move); panel.removeEventListener("pointerleave", leave); };
    });
  }, { scope: panelRef });

  return motion;
}
