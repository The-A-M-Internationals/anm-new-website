"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll-drawn timeline. Inside `root`:
 * - [data-draw="y"]   vertical lines grow from the top as the section scrolls through (scrubbed)
 * - [data-draw="x"]   connectors grow out from the spine when their row reaches the middle of the screen
 * - [data-draw="dot"] dots pop in right after their connector
 * Transform-only (compositor), on the shared GSAP ticker that Lenis drives. Off for reduced motion.
 */
export function useTimelineDraw(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('[data-draw="y"]'),
        { scaleY: 0 },
        {
          scaleY: 1, ease: "none", transformOrigin: "50% 0%",
          scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 65%", scrub: 0.6 },
        }
      );

      el.querySelectorAll<HTMLElement>("[data-draw-row]").forEach((row) => {
        const lines = row.querySelectorAll<HTMLElement>('[data-draw="x"]');
        const dots = row.querySelectorAll<HTMLElement>('[data-draw="dot"]');
        gsap.set(lines, { scaleX: 0 });
        gsap.set(dots, { scale: 0 });
        gsap.timeline({ scrollTrigger: { trigger: row, start: "top 62%", once: true } })
          .to(lines, { scaleX: 1, duration: 0.7, ease: "expo.out" })
          .to(dots, { scale: 1, duration: 0.5, ease: "back.out(2.2)" }, "-=0.35");
      });
    }, el);

    return () => ctx.revert();
  }, [root]);
}
