"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Exit half of the page transition (the enter half is `.page-enter` in template.tsx).
 * When an internal link to another page is clicked, the current page starts fading out
 * straight away — navigation is never delayed or intercepted, so prefetching and every
 * onClick handler work exactly as before. The new page then fades in as it mounts.
 */
export default function PageLeave() {
  const pathname = usePathname();

  useEffect(() => {
    // New page mounted: clear any leftover state from the previous one
    document.querySelectorAll(".page-leaving").forEach((el) => el.classList.remove("page-leaving"));
  }, [pathname]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let undo = 0;
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;          // same page (hash links scroll instead)
      const page = document.querySelector(".page-enter");
      if (!page) return;
      page.classList.add("page-leaving");
      // Safety net: if the navigation never happens, bring the page back
      window.clearTimeout(undo);
      undo = window.setTimeout(() => page.classList.remove("page-leaving"), 1500);
    };
    // Bubble phase on window: runs after React's handlers, so a handler that cancels the click wins
    const afterReact = (e: MouseEvent) => { if (!e.defaultPrevented || isNextLink(e)) onClick(e); };
    window.addEventListener("click", afterReact);
    return () => { window.removeEventListener("click", afterReact); window.clearTimeout(undo); };
  }, []);

  return null;
}

/** next/link prevents the default itself before navigating client-side, so its clicks still count. */
function isNextLink(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.("a[href]");
  return !!a && !a.getAttribute("href")?.includes("#");
}
