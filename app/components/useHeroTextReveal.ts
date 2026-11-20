import { useEffect, type RefObject } from "react";
import gsap from "gsap";

/**
 * Inner-page hero text: each line of the title rises out of a mask, one line after another,
 * then the badge and description ease in. Runs once on load on the shared GSAP ticker.
 * Transform and opacity only; skipped entirely for visitors who prefer reduced motion.
 */
export function useHeroTextReveal(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const masks = Array.from(root.querySelectorAll<HTMLElement>("[data-hero-word]"));
      const soft = root.querySelectorAll<HTMLElement>("[data-hero-soft]");

      // Words that share a row (and a heading) form one line, so whole lines move together
      let line = -1, lastTop = NaN, lastParent: Element | null = null;
      const lineOf = masks.map((m) => {
        const parent = m.closest("[aria-label]");
        if (m.offsetTop !== lastTop || parent !== lastParent) { line += 1; lastTop = m.offsetTop; lastParent = parent; }
        return line;
      });

      const tl = gsap.timeline({ delay: 0.15 });
      masks.forEach((m, i) => {
        tl.fromTo(m.firstElementChild, { yPercent: 115, y: 0 }, { yPercent: 0, duration: 1.15, ease: "expo.out" }, lineOf[i] * 0.11);
      });
      // Once a word has landed its mask opens, so the text shadow is no longer clipped
      tl.set(masks, { overflow: "visible" });
      tl.fromTo(soft, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 }, 0.35 + line * 0.11);
    });

    return () => mm.revert();
  }, [rootRef]);
}
