"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Loads every lazy image on the page in the background once the page has settled,
 * nearest-first and a few at a time, then pre-decodes it — so team photos, cards and
 * section art are already in memory when the visitor scrolls to them.
 * Uses the image's own srcset/sizes, so the browser still picks the right size.
 */
const BATCH = 3;

export default function ImagePreloader() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    const idle = (fn: () => void) => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(fn, { timeout: 1500 });
      else setTimeout(fn, 200);
    };

    const pending = () =>
      Array.from(document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]'))
        .filter((img) => !img.complete)
        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

    const loadOne = (img: HTMLImageElement) =>
      new Promise<void>((done) => {
        const finish = () => { img.decode().catch(() => {}).finally(done); };
        img.addEventListener("load", finish, { once: true });
        img.addEventListener("error", () => done(), { once: true });
        img.loading = "eager";                                  // starts the download now
      });

    const run = async () => {
      let queue = pending();
      while (!cancelled && queue.length) {
        await Promise.all(queue.splice(0, BATCH).map(loadOne));
        await new Promise<void>((r) => idle(r));                // yield between batches
        if (!queue.length) queue = pending();                   // pick up content mounted later
      }
    };

    const start = () => window.setTimeout(() => idle(run), 600);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => { cancelled = true; window.removeEventListener("load", start); };
  }, [pathname]);

  return null;
}
