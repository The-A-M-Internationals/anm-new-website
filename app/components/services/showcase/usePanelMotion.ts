"use client";

import { useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MOTION = "(prefers-reduced-motion: no-preference)";
const QUERIES = {
  desktop: `(min-width: 1024px) and ${MOTION}`,
  mobile: `(max-width: 1023.98px) and ${MOTION}`,
  reduce: "(prefers-reduced-motion: reduce)",
};

/**
 * Scroll motion for one service panel (natural scroll, no pin). No hover effects:
 * the scene plays on its own while the panel is in view.
 * - Expand: the panel scales up to full size as it enters, scrubbed (transform only).
 * - Copy: [data-reveal] lines fade up in sequence, once.
 * Returns whether live media may mount; reduced motion keeps the poster only.
 */
export function usePanelMotion(
  panelRef: RefObject<HTMLElement | null>,
  mediaRef: RefObject<HTMLElement | null>
) {
  const [motion, setMotion] = useState(false);

  useGSAP(() => {
    const panel = panelRef.current, media = mediaRef.current;
    if (!panel || !media) return;

    /* created inside the useGSAP context, so it is reverted automatically on unmount */
    gsap.matchMedia().add(QUERIES, (ctx) => {
      const { desktop, reduce } = ctx.conditions as Record<keyof typeof QUERIES, boolean>;
      setMotion(!reduce);
      if (reduce) return;

      /* expand via transform only (compositor) — a scrubbed clip-path repaints the live canvas every frame */
      const scrub = { trigger: panel, start: "top bottom", end: "top 30%", scrub: true };
      gsap.fromTo(panel, { scale: desktop ? 0.94 : 0.96 }, { scale: 1, ease: "none", force3D: true, scrollTrigger: scrub });
      gsap.fromTo(media, { scale: 1.08 }, { scale: 1, ease: "none", force3D: true, scrollTrigger: { ...scrub } });

      gsap.from(panel.querySelectorAll("[data-reveal]"), {
        autoAlpha: 0, y: 24, duration: 0.8, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: panel, start: desktop ? "top 60%" : "top 75%", once: true },
      });

    });
  }, { scope: panelRef });

  return motion;
}
