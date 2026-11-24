"use client";

/** Scrolls to #hash after route changes / deep links — via Lenis, after layout has settled. */
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToHash } from "@/lib/handleHashLink";

export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const go = () => {
      const { hash } = window.location;
      if (hash) {
        requestAnimationFrame(() => requestAnimationFrame(() => scrollToHash(hash)));
      } else {
        window.__lenis?.scrollTo(0, { immediate: true });
      }
    };

    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, [pathname]);

  return null;
}
