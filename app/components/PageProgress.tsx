"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/**
 * Thin gold line across the top of the screen while one page hands over to the next.
 * It starts on the "page:leaving" event (PageLeave.tsx), creeps forward while the next page
 * loads, then completes and fades as that page appears. Transform and opacity only.
 */
export default function PageProgress() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);
  const running = useRef(false);

  useEffect(() => {
    const el = bar.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => {
      running.current = true;
      gsap.killTweensOf(el);
      gsap.set(el, { autoAlpha: 1, scaleX: 0 });
      gsap.to(el, { scaleX: 0.82, duration: 4, ease: "expo.out" });
    };
    window.addEventListener("page:leaving", start);
    return () => { window.removeEventListener("page:leaving", start); gsap.killTweensOf(el); };
  }, []);

  // The next page has mounted: finish the line and fade it out
  useEffect(() => {
    const el = bar.current;
    if (!el || !running.current) return;
    running.current = false;
    gsap.killTweensOf(el);
    gsap.timeline().to(el, { scaleX: 1, duration: 0.22, ease: "power2.out" }).to(el, { autoAlpha: 0, duration: 0.25 }, "+=0.05");
  }, [pathname]);

  return <div ref={bar} aria-hidden className="pointer-events-none invisible fixed inset-x-0 top-0 z-[9999] h-[2px] origin-left bg-[#D4AF37] rtl:origin-right" />;
}
