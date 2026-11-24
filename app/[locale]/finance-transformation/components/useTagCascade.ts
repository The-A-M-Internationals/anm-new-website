import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Service card tags (`[data-tag]`) rise in one after another the first time the card scrolls into view.
 * Transform and opacity only; visitors who prefer reduced motion simply see the tags.
 */
export function useTagCascade(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // The card is rendered twice (phone and desktop layouts); only animate the tags that are showing
      const tags = Array.from(root.querySelectorAll<HTMLElement>("[data-tag]")).filter((t) => t.offsetParent !== null);
      if (!tags.length) return;
      gsap.fromTo(tags, { autoAlpha: 0, y: 14 }, {
        autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.07,
        scrollTrigger: { trigger: root, start: "top 82%", once: true },
      });
    });
    return () => mm.revert();
  }, [rootRef]);
}
