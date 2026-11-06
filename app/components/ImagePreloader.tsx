"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Loads lazy images ahead of the visitor once the page has settled, nearest-first and a few
 * at a time, then pre-decodes them — so team photos, cards and section art are already in
 * memory when the visitor scrolls to them. Uses each image's own srcset/sizes.
 * How far ahead depends on the connection: everything on desktop, the next 3 screens on
 * phones (follows the scroll), and nothing on data-saver / slow connections.
 */
const BATCH = 3;

type NetInfo = { saveData?: boolean; effectiveType?: string };
function horizon() {
  const net = (navigator as Navigator & { connection?: NetInfo }).connection;
  if (net?.saveData || /(^|-)2g|3g/.test(net?.effectiveType ?? "")) return 0;
  return window.matchMedia("(pointer: coarse)").matches ? 3 : Infinity;   // in screen heights
}

export default function ImagePreloader() {
  const pathname = usePathname();

  useEffect(() => {
    const ahead = horizon();
    if (!ahead) return;
    let cancelled = false, running = false;
    const idle = (fn: () => void) => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(fn, { timeout: 1500 });
      else setTimeout(fn, 200);
    };

    const pending = () =>
      Array.from(document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]'))
        .map((img) => ({ img, top: img.getBoundingClientRect().top }))
        .filter(({ img, top }) => !img.complete && top < window.innerHeight * ahead)
        .sort((a, b) => a.top - b.top)
        .map(({ img }) => img);

    const loadOne = (img: HTMLImageElement) =>
      new Promise<void>((done) => {
        const finish = () => { img.decode().catch(() => {}).finally(done); };
        img.addEventListener("load", finish, { once: true });
        img.addEventListener("error", () => done(), { once: true });
        img.loading = "eager";                                  // starts the download now
      });

    const run = async () => {
      if (running) return;
      running = true;
      let queue = pending();
      while (!cancelled && queue.length) {
        await Promise.all(queue.splice(0, BATCH).map(loadOne));
        await new Promise<void>((r) => idle(r));                // yield between batches
        if (!queue.length) queue = pending();                   // pick up content mounted later
      }
      running = false;
    };

    // With a limited horizon, keep topping up as the visitor scrolls
    let scrollTimer = 0;
    const onScroll = () => { window.clearTimeout(scrollTimer); scrollTimer = window.setTimeout(() => idle(run), 300); };
    const start = () => {
      window.setTimeout(() => idle(run), 600);
      if (ahead !== Infinity) window.addEventListener("scroll", onScroll, { passive: true });
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      cancelled = true;
      window.clearTimeout(scrollTimer);
      window.removeEventListener("load", start);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  return null;
}
