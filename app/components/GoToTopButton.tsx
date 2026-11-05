"use client";

/**
 * Back-to-top button that listens to Lenis (one listener, already per-frame) instead of a
 * window "scroll" listener, and only re-renders when it crosses the 200px threshold.
 */
import { useEffect, useRef, useState } from "react";
import { useLenis } from "./SmoothScrolling";

export default function GoToTopButton() {
  const lenis = useLenis();
  const [show, setShow] = useState(false);
  const shown = useRef(false);

  useEffect(() => {
    const update = (y: number) => { const s = y > 200; if (s !== shown.current) { shown.current = s; setShow(s); } };
    if (lenis) {
      const off = lenis.on("scroll", ({ scroll }: { scroll: number }) => update(scroll));
      update(lenis.scroll);
      return off;
    }
    const onScroll = () => update(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
      className={`fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#0B132B] text-white shadow-lg
        transition-[opacity,transform] duration-300 ${show ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"}`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
