import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * "Why Choose" section motion.
 * - Entrance, once, when the section scrolls into view: the heading's words (`[data-why-word]`)
 *   rise out of their masks, then the cards (`[data-why-card]`) slide in from the far side.
 * - The gold bar: `active` is the card that carries it. It moves on to the next card every few
 *   seconds by itself and goes straight to a card the mouse is over (`hold` / `release`).
 * Transform and opacity only. With reduced motion everything is simply visible and the bar stays put.
 */
export function useWhyChoose(rootRef: RefObject<HTMLElement | null>, count: number, start: number, rtl: boolean) {
  const [active, setActive] = useState(start);
  const held = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 75%", once: true } });
      // y: 0 as well: the words start hidden by a CSS transform, which GSAP would otherwise keep as a pixel offset
      tl.fromTo(root.querySelectorAll("[data-why-word]"), { yPercent: 118, y: 0 }, { yPercent: 0, y: 0, duration: 1.15, ease: "expo.out", stagger: 0.09 });
      tl.fromTo(root.querySelectorAll("[data-why-card]"), { autoAlpha: 0, x: rtl ? -60 : 60 },
        { autoAlpha: 1, x: 0, duration: 1.1, ease: "expo.out", stagger: 0.13, clearProps: "transform" }, 0.25);

      // the bar only travels while the section is on screen
      let timer = 0;
      const io = new IntersectionObserver(([e]) => {
        window.clearInterval(timer);
        if (e.isIntersecting) timer = window.setInterval(() => { if (!held.current) setActive((a) => (a + 1) % count); }, 2800);
      }, { threshold: 0.3 });
      io.observe(root);
      return () => { window.clearInterval(timer); io.disconnect(); };
    });
    return () => mm.revert();
  }, [rootRef, count, rtl]);

  return {
    active,
    hold: (i: number, mouse: boolean) => { held.current = mouse; setActive(i); },   // a tap moves the bar but doesn't freeze it
    release: () => { held.current = false; },
  };
}
