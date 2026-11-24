import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Careers benefits entrance: the tiles (`[data-benefit]`) rise, grow and fade in one after another
 * the first time the grid scrolls into view. Transform and opacity only. With reduced motion the
 * tiles are simply visible (they are only hidden up front when motion is allowed).
 */
export function useBenefitsReveal(gridRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(grid.querySelectorAll("[data-benefit]"), { autoAlpha: 0, y: 56, scale: 0.92 }, {
        autoAlpha: 1, y: 0, scale: 1, duration: 1.15, ease: "expo.out", stagger: 0.1, clearProps: "transform",
        scrollTrigger: { trigger: grid, start: "top 80%", once: true },
      });
    });
    return () => mm.revert();
  }, [gridRef]);
}
