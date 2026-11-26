"use client";

import { useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll motion for the home services rows (each row: [data-block] copy + [data-film] box).
 * - The sentence in each row fills in letter by letter as the row scrolls up the screen (opacity only).
 * - A row's film plays for as long as any part of its box is on screen, and stops once it is scrolled past.
 * - Reduced motion: text at full strength, stills only.
 * Returns, per row, whether its film may play, and whether motion is allowed at all.
 */
export function useStageMotion(stageRef: RefObject<HTMLElement | null>) {
  const [playing, setPlaying] = useState<boolean[]>([]);
  const [motion, setMotion] = useState(false);

  useGSAP(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const blocks = gsap.utils.toArray<HTMLElement>("[data-block]", stage);
    const films = gsap.utils.toArray<HTMLElement>("[data-film]", stage);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: reduce)", () => setMotion(false));
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      setMotion(true);
      blocks.forEach((block, i) => {
        const letters = block.querySelectorAll("[data-fill]");
        gsap.set(letters, { opacity: 0.18 });
        gsap.to(letters, {
          opacity: 1, duration: 0.1, ease: "none", stagger: 0.015,
          scrollTrigger: { trigger: block, start: "top 85%", end: "top 30%", scrub: 0.4 },
        });
        ScrollTrigger.create({
          trigger: films[i], start: "top bottom", end: "bottom top",
          onToggle: (self) => setPlaying((now) => { const next = [...now]; next[i] = self.isActive; return next; }),
        });
      });
      return () => setPlaying([]);
    });
  }, { scope: stageRef });

  return { playing, motion };
}
