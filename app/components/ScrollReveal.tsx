"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
/**
 * Global scroll-to-reveal: content blocks rise 80px and fade in, staggered, as they enter.
 * - GSAP on the shared ticker (same clock as Lenis + ScrollTrigger); transform + opacity only.
 */
const OWNED = "[data-reveal],[data-card],[data-word],[data-orb],[data-panel],canvas,video,iframe,.no-global-reveal";
const MAX_DEPTH = 3;

function collect(el: HTMLElement, out: Set<HTMLElement>, depth: number) {
  if (el.matches(OWNED) || el.offsetHeight === 0) return;
  const pos = getComputedStyle(el).position;
  if (pos === "absolute" || pos === "fixed") return;           // decorative layers stay put

  const kids = Array.from(el.children) as HTMLElement[];
  const owned = el.querySelector(OWNED) !== null;
  const tall = el.offsetHeight > window.innerHeight * 0.8;
  if ((owned || tall) && kids.length && depth < MAX_DEPTH) {
    kids.forEach((k) => collect(k, out, depth + 1));
    return;
  }
  if (!owned) out.add(el);
}

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const aos = () => document.querySelectorAll("[data-aos]").forEach((el) => el.classList.add("is-revealed"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { aos(); return; }

    const seen = new WeakSet<HTMLElement>();
    const ctx = gsap.context(() => {});
    const insideSeen = (el: HTMLElement) => {
      for (let p = el.parentElement; p; p = p.parentElement) if (seen.has(p)) return true;
      return false;
    };

    const scan = () => {
      const found = new Set<HTMLElement>();
      document.querySelectorAll<HTMLElement>("section").forEach((s) => {
        if (s.closest(".no-global-reveal")) return;
        Array.from(s.children).forEach((c) => collect(c as HTMLElement, found, 0));
      });
      document.querySelectorAll<HTMLElement>(".reveal-up,[data-aos]").forEach((el) => {
        if (!el.closest(".no-global-reveal")) found.add(el);
      });

      const list = [...found].filter((el) => {
        if (seen.has(el)) return false;
        if (!insideSeen(el)) return true;
        el.classList.add("is-revealed");                    // never leave a CSS-hidden [data-aos] stuck
        return false;
      });
      // [data-aos] items reveal individually; a block wrapping them stays static (visible)
      const isAos = (el: HTMLElement) => el.matches("[data-aos]");
      const fresh = list.filter((el) =>
        isAos(el)
          ? !list.some((o) => o !== el && isAos(o) && o.contains(el))
          : !el.querySelector("[data-aos]") && !list.some((o) => o !== el && o.contains(el))
      );
      const markDone = (el: Element) => {
        el.classList.add("is-revealed");
        el.querySelectorAll("[data-aos]").forEach((a) => a.classList.add("is-revealed"));
      };
      const hidden: HTMLElement[] = [];
      fresh.forEach((el) => {
        seen.add(el);
        // already on screen: show as-is, never flash it away
        if (el.getBoundingClientRect().top < window.innerHeight) markDone(el);
        else hidden.push(el);
      });
      if (!hidden.length) return;

      ctx.add(() => {
        // Pre-promoted off-screen so the reveal is pure compositing (no raster burst on enter)
        gsap.set(hidden, { y: 80, opacity: 0, willChange: "transform, opacity" });
        const reveal = (batch: Element[]) => {
          batch.forEach(markDone);
          gsap.to(batch, {
            y: 0, opacity: 1, duration: 1.15, ease: "expo.out", stagger: 0.09, overwrite: true,
            onComplete() { settle.push(...(this.targets() as Element[])); if (!settleTimer) settleTimer = window.setTimeout(flush, 400); },
          });
        };
        ScrollTrigger.batch(hidden, { start: "top bottom+=60", once: true, interval: 0.1, onEnter: reveal, onEnterBack: reveal });
      });
    };

    // Tidy finished reveals only at rest: dropping the layer re-rasterizes (a hitch mid-glide)
    const settle: Element[] = [];
    let settleTimer = 0;
    const flush = () => {
      if (window.__lenis?.isScrolling === "smooth") { settleTimer = window.setTimeout(flush, 250); return; }
      settleTimer = 0;
      gsap.set(settle.splice(0), { clearProps: "transform,opacity,willChange" });
    };
    let debounce = 0;
    const timer = window.setTimeout(scan, 150);
    const mo = new MutationObserver(() => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(scan, 200);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(debounce);
      window.clearTimeout(settleTimer);
      mo.disconnect();
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
