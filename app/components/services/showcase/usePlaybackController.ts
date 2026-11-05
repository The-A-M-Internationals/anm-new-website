"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/**
 * One controller per showcase. Two IntersectionObservers:
 * - `near` (200px margin): panels that may mount their WebGL layer (lazy, mount once)
 * - `view` (no margin): the single most-visible panel (>= 25%) is the only one playing
 */
type Playback = {
  activeId: string | null;
  nearIds: ReadonlySet<string>;
  register: (id: string, el: HTMLElement | null) => void;
};

const PlaybackContext = createContext<Playback | null>(null);
export const PlaybackProvider = PlaybackContext.Provider;

const MIN_RATIO = 0.25;
const THRESHOLDS = [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1];
const idOf = (el: Element) => (el as HTMLElement).dataset.panel ?? "";

export function usePlaybackController(): Playback {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [nearIds, setNearIds] = useState<ReadonlySet<string>>(() => new Set());
  const els = useRef(new Map<string, HTMLElement>());
  const ratios = useRef(new Map<string, number>());
  const obs = useRef<{ view: IntersectionObserver; near: IntersectionObserver } | null>(null);

  useEffect(() => {
    const view = new IntersectionObserver((entries) => {
      entries.forEach((e) => ratios.current.set(idOf(e.target), e.isIntersecting ? e.intersectionRatio : 0));
      let best: string | null = null, max = MIN_RATIO;
      ratios.current.forEach((r, id) => { if (r >= max) { best = id; max = r; } });
      setActiveId(best);
    }, { threshold: THRESHOLDS });

    const near = new IntersectionObserver((entries) => {
      setNearIds((prev) => {
        const add = entries.filter((e) => e.isIntersecting && !prev.has(idOf(e.target)));
        return add.length ? new Set([...prev, ...add.map((e) => idOf(e.target))]) : prev;
      });
    }, { rootMargin: "200px 0px" });

    obs.current = { view, near };
    els.current.forEach((el) => { view.observe(el); near.observe(el); });

    /* Warm-up: mount scenes one per idle slot after load, so the heavy shader compile
       runs while the visitor is reading the hero — never as a hitch mid-scroll. */
    let idle = 0, alive = true;
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const warmed = new Set<string>();
    const warm = () => {
      const next = [...els.current.keys()].find((id) => !warmed.has(id));
      if (!alive || !next) return;
      warmed.add(next);
      setNearIds((prev) => (prev.has(next) ? prev : new Set([...prev, next])));
      idle = ric(warm, { timeout: 2500 });
    };
    const start = () => { idle = ric(warm, { timeout: 2500 }); };
    if (document.readyState === "complete") start(); else window.addEventListener("load", start, { once: true });

    return () => {
      alive = false; cancel(idle); window.removeEventListener("load", start);
      view.disconnect(); near.disconnect(); obs.current = null;
    };
  }, []);

  const register = useCallback((id: string, el: HTMLElement | null) => {
    const prev = els.current.get(id);
    if (prev) { obs.current?.view.unobserve(prev); obs.current?.near.unobserve(prev); }
    if (el) {
      els.current.set(id, el);
      obs.current?.view.observe(el); obs.current?.near.observe(el);
    } else {
      els.current.delete(id); ratios.current.delete(id);
    }
  }, []);

  return { activeId, nearIds, register };
}

/** Panel-side hook: attach `ref` to the panel element (which must carry data-panel={id}) */
export function usePanelPlayback(id: string) {
  const ctx = useContext(PlaybackContext);
  const register = ctx?.register;
  const ref = useCallback((el: HTMLElement | null) => register?.(id, el), [register, id]);
  return { ref, active: ctx?.activeId === id, near: ctx?.nearIds.has(id) ?? false };
}
