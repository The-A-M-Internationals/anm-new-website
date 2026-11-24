import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Entrance shared by the EPM Build Agent sections, once, when a section scrolls into view:
 * heading words (`[data-a-word]`) rise out of their masks, lines (`[data-a-line]`) draw across,
 * then the items (`[data-a-item]`) rise in one after another.
 * Transform and opacity only. With reduced motion everything is simply visible.
 */
export function useAgentReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 78%", once: true } });
      // y: 0 as well: the words start hidden by a CSS transform, which GSAP would otherwise keep as a pixel offset
      if (q("[data-a-word]").length) tl.fromTo(q("[data-a-word]"), { yPercent: 118, y: 0 }, { yPercent: 0, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.07 }, 0);
      if (q("[data-a-line]").length) tl.fromTo(q("[data-a-line]"), { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "power3.inOut" }, 0.2);
      if (q("[data-a-item]").length) tl.fromTo(q("[data-a-item]"), { autoAlpha: 0, y: 44 }, { autoAlpha: 1, y: 0, duration: 1.05, ease: "expo.out", stagger: 0.12, clearProps: "transform" }, 0.3);
    });
    return () => mm.revert();
  }, []);
  return ref;
}

/** Classes for elements the hook reveals (hidden up front only when motion is allowed) */
export const A_ITEM = "motion-safe:opacity-0";
export const A_LINE = "origin-left rtl:origin-right motion-safe:scale-x-0";

/** One translated text as Intlayer hands it over (lists lose their types, so the sections name them) */
export type Txt = { value: string };
