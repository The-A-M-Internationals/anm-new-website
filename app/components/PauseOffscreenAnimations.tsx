"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Looping decorations (floating icons, drifting orbs, pulses, marquees) keep running after they
 * scroll out of view and steal frames from the section you're reading. This pauses every *looping*
 * CSS / SVG animation inside a section while it's off screen and resumes it just before it comes
 * back. One-shot entrance animations are never touched, so nothing looks different.
 */
const ZONES = "section, footer";
const NEAR = "300px 0px";   // resume a little before the section scrolls in
const SMIL = "animate, animateTransform, animateMotion";

const loops = (zone: Element) =>
  zone.getAnimations({ subtree: true }).filter((a) => a.effect?.getComputedTiming().iterations === Infinity);

/** Outer <svg>s whose SVG animations all repeat forever (a one-off SVG animation is left alone) */
const loopingSvgs = (zone: Element) =>
  Array.from(zone.querySelectorAll("svg")).filter((s) => {
    if (s.ownerSVGElement) return false;
    const anims = Array.from(s.querySelectorAll(SMIL));
    return anims.length > 0 && anims.every((a) => a.getAttribute("repeatCount") === "indefinite");
  });

export default function PauseOffscreenAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || typeof document.getAnimations !== "function") return;
    const paused = new WeakMap<Element, Animation[]>();
    const watched = new WeakSet<Element>();

    const sleep = (zone: Element) => {
      const list = loops(zone).filter((a) => a.playState === "running");
      list.forEach((a) => a.pause());
      paused.set(zone, list);
      loopingSvgs(zone).forEach((s) => s.pauseAnimations());
    };
    const wake = (zone: Element) => {
      paused.get(zone)?.forEach((a) => { if (a.playState === "paused") a.play(); });
      paused.delete(zone);
      loopingSvgs(zone).forEach((s) => s.unpauseAnimations());
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.isIntersecting ? wake(e.target) : sleep(e.target))),
      { rootMargin: NEAR },
    );

    // Outermost zones only, so a parent and its child never fight over the same animations
    const scan = () => {
      document.querySelectorAll(ZONES).forEach((z) => {
        if (watched.has(z) || z.parentElement?.closest(ZONES)) return;
        watched.add(z);
        io.observe(z);
      });
    };

    let debounce = 0;
    const timer = window.setTimeout(scan, 300);
    const mo = new MutationObserver(() => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(scan, 300);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(debounce);
      mo.disconnect();
      io.disconnect();
      document.querySelectorAll(ZONES).forEach((z) => paused.has(z) && wake(z));
    };
  }, [pathname]);

  return null;
}
