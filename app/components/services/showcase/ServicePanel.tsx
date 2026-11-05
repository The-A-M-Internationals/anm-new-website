"use client";

import { useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import MediaStage from "./MediaStage";
import PanelCopy from "./PanelCopy";
import { usePanelPlayback } from "./usePlaybackController";
import { usePanelMotion } from "./usePanelMotion";
import type { Scene } from "../webgl/types";
import type { ShowcaseService } from "./types";

/* WebGL code stays out of the initial bundle; loaded once the panel is near the viewport */
const WebGLLayer = dynamic(() => import("./WebGLLayer"), { ssr: false });

type Props = { service: ShowcaseService; flip?: boolean };

/**
 * One full-width service block.
 * - Mobile/tablet: media box stacked above the copy.
 * - Desktop: media is the full-bleed background of a 16:9 panel; the copy card
 *   sits over a 12-column grid, 5 columns wide, on the start or end side.
 *   Grid flow follows `dir`, so the flip mirrors correctly in Arabic.
 */
export default function ServicePanel({ service, flip = false }: Props) {
  const { ref: register, active, near } = usePanelPlayback(service.id);
  const panelRef = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const motion = usePanelMotion(panelRef, mediaRef, sceneRef);

  const setPanel = useCallback((el: HTMLElement | null) => { panelRef.current = el; register(el); }, [register]);
  const setScene = useCallback((s: Scene | null) => { sceneRef.current = s; }, []);

  return (
    <article
      ref={setPanel}
      aria-labelledby={`showcase-${service.id}-title`}
      data-panel={service.id}
      data-active={active || undefined}
      className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#08090c] shadow-xs will-change-transform lg:block lg:aspect-[16/9] lg:min-h-[640px] lg:max-h-[90svh]"
    >
      <MediaStage ref={mediaRef} poster={service.poster} className="lg:absolute lg:inset-0 will-change-transform">
        {motion && near && <WebGLLayer scene={service.id} active={active} flip={flip} onScene={setScene} />}
        {/* mobile: media dissolves into the copy below */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#08090c] lg:hidden" />
      </MediaStage>

      {/* desktop: dark scrim on the copy side so text reads over the scene without a box */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 hidden lg:block from-[#08090c]/90 from-0% via-[#08090c]/55 via-40% to-transparent to-70% ${
          flip ? "ltr:bg-gradient-to-l rtl:bg-gradient-to-r" : "ltr:bg-gradient-to-r rtl:bg-gradient-to-l"
        }`}
      />

      <div className="relative lg:absolute lg:inset-0 lg:grid lg:grid-cols-12 lg:items-center lg:p-12 xl:p-16 lg:pointer-events-none">
        <div className={`lg:col-span-5 lg:pointer-events-auto ${flip ? "lg:col-start-8" : "lg:col-start-1"}`}>
          <PanelCopy service={service} />
        </div>
      </div>
    </article>
  );
}
