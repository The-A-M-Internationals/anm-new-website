"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

/**
 * Loads a scene video one screen ahead, plays it while `play` is true (scrolling does not pause it), and heals itself:
 * if the browser pauses or drops the video while it should be playing (tab switch, power saving,
 * network blip, server restart), it is restarted, so a refresh is never needed.
 */
export function useVideoPlayback(ref: RefObject<HTMLVideoElement | null>, src: string | null, play: boolean) {
  const want = useRef(false);
  const kick = useCallback(() => {
    const el = ref.current;
    if (!el || !want.current) return;
    // Failed or dropped source: fetch it again
    if (el.error || el.networkState === el.NETWORK_NO_SOURCE) el.load();
    if (el.paused) el.play().catch(() => {});
  }, [ref]);

  // When to download: computers on a good connection fetch it as soon as the page is idle, so it
  // is ready long before the visitor scrolls there; phones / data saver wait until one screen ahead.
  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;
    // the film was swapped for another framing (screen shape changed): drop the old one
    if (el.currentSrc && !el.currentSrc.endsWith(`${src}.mp4`)) el.load();
    const fetchNow = () => {
      el.preload = "auto";
      // Never load() over a play() that already started fetching: that reset leaves it frozen
      if (el.readyState === 0 && el.networkState !== el.NETWORK_LOADING) el.load();
      kick();
    };
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const early = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)").matches
      && !conn?.saveData && !/(^|-)2g$|^3g$/.test(conn?.effectiveType ?? "");
    if (early) {
      const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
      const cancel = window.cancelIdleCallback ?? window.clearTimeout;
      const id = ric(fetchNow, { timeout: 3000 });
      return () => cancel(id);
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      fetchNow();
    }, { rootMargin: "100% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, src, kick]);

  // Play only while wanted
  useEffect(() => {
    const el = ref.current;
    want.current = !!src && play;
    if (!el || !src) return;
    if (want.current) kick(); else el.pause();
  }, [ref, src, play, kick]);

  // Self-heal: restart if the browser pauses or drops the video while it should play
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let retry = 0;
    const onPause = () => { if (want.current && !document.hidden) requestAnimationFrame(kick); };
    const onFail = () => {
      clearTimeout(retry);
      retry = window.setTimeout(() => {
        if (want.current && (el.error || el.readyState < 2)) { el.load(); kick(); }
      }, 1500);
    };
    const onShow = () => { if (!document.hidden) kick(); };
    el.addEventListener("pause", onPause);
    el.addEventListener("error", onFail, true); // capture: <source> errors don't bubble
    el.addEventListener("stalled", onFail);
    document.addEventListener("visibilitychange", onShow);
    window.addEventListener("pageshow", onShow);
    return () => {
      clearTimeout(retry);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("error", onFail, true);
      el.removeEventListener("stalled", onFail);
      document.removeEventListener("visibilitychange", onShow);
      window.removeEventListener("pageshow", onShow);
    };
  }, [ref, kick]);
}
