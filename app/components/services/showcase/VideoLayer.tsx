"use client";

import { useEffect, useRef, useState } from "react";
import SceneCaption from "./SceneCaption";
import { useVideoPlayback } from "./useVideoPlayback";
import { SCENE_CAPTIONS } from "./sceneCaptions";
import type { SceneCaption as Caption } from "../webgl/types";

type Props = {
  scene: "epm" | "ai"; active: boolean; flip: boolean; motion: boolean;
  /** Always use the centred cut, so the animation sits in the middle of the box */
  centred?: boolean;
};

/**
 * The service scene as a pre-rendered loop (baked from the WebGL scenes at 1440p):
 * pixel-sharp at any size, decoded by the video hardware, so it costs the page almost
 * nothing while scrolling. Plays only while its panel is the one in view; never on hover.
 * The story captions stay live text, synced to the video's clock.
 * Files: /showcase/<scene>-<l|r>.mp4 (desktop/tablet, subject left/right of the copy) and
 * /showcase/<scene>-m.mp4 (phones, centred); each has a matching .jpg first frame.
 */
export default function VideoLayer({ scene, active, flip, motion, centred = false }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [caption, setCaption] = useState<Caption | null>(null);

  // Pick the variant for this screen and reading direction (subject sits away from the copy)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    const side = (flip ? -1 : 1) * (rtl ? -1 : 1) > 0 ? "r" : "l";
    const phone = window.matchMedia("(max-width: 639.98px)");
    const pick = () => setSrc(`/showcase/${scene}-${centred || phone.matches ? "m" : side}`);
    pick();
    // a rotated phone or a resized window crosses the breakpoint: switch to the film framed for that shape
    phone.addEventListener("change", pick);
    return () => phone.removeEventListener("change", pick);
  }, [scene, flip, centred]);

  useVideoPlayback(ref, src, active && motion);

  // Captions follow the video clock (only while playing)
  useEffect(() => {
    const el = ref.current;
    const track = SCENE_CAPTIONS[scene];
    if (!el || !track.length) return;
    let raf = 0, shown = "";
    const sync = () => {
      const t = el.currentTime;
      let c = track[0][1];
      for (const [at, cap] of track) if (at <= t) c = cap;
      if (c.title !== shown) { shown = c.title; setCaption(c); }
      if (!el.paused) raf = requestAnimationFrame(sync);
    };
    const start = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(sync); };
    sync();
    el.addEventListener("playing", start);
    el.addEventListener("seeked", sync);
    return () => { cancelAnimationFrame(raf); el.removeEventListener("playing", start); el.removeEventListener("seeked", sync); };
  }, [scene]);

  return (
    <>
      <video
        ref={ref}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${src ? "opacity-100" : "opacity-0"}`}
        poster={src ? `${src}.jpg` : undefined}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        onLoadedData={() => setReady(true)}
        aria-hidden="true"
      >
        {src && <source src={`${src}.mp4`} type="video/mp4" />}
      </video>
      {ready && caption && <SceneCaption caption={caption} flip={flip} />}
    </>
  );
}
