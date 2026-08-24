"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Kill any ongoing tweens on this element just in case
    gsap.killTweensOf(containerRef.current);

    // Elegant fade-in and slight slide-up on every page load/navigation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.1 }
    );
  }, [pathname]); // Re-run when pathname changes, though template remounts anyway

  return (
    <div ref={containerRef} className="opacity-0 min-h-screen">
      {children}
    </div>
  );
}
