"use client";

import { useEffect, useRef, useState } from "react";
import { createEpmScene } from "../webgl/epmScene";
import { createAiScene } from "../webgl/aiScene";
import type { Scene, SceneCaption as Caption } from "../webgl/types";
import SceneCaption from "./SceneCaption";

type Props = {
  scene: "epm" | "ai";
  active: boolean;
  flip: boolean;
  /** Hands the live scene to the panel (hover tilt via setPointer); null on teardown */
  onScene?: (scene: Scene | null) => void;
};

const FACTORIES = { epm: createEpmScene, ai: createAiScene };

/**
 * Mounts a standalone WebGL scene over the poster. The canvas fades in once the
 * first frame is drawn; if WebGL2 is unavailable the poster simply stays.
 */
export default function WebGLLayer({ scene, active, flip, onScene }: Props) {
  const glRef = useRef<HTMLCanvasElement>(null);
  const ovRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<Scene | null>(null);
  const [ready, setReady] = useState(false);
  const [caption, setCaption] = useState<Caption | null>(null);

  useEffect(() => {
    const canvas = glRef.current;
    if (!canvas) return;
    const rtl = getComputedStyle(canvas).direction === "rtl";
    const bias = (flip ? -1 : 1) * (rtl ? -1 : 1);
    let alive = true;
    const s = FACTORIES[scene](canvas, ovRef.current, { bias, onCaption: (c) => alive && setCaption(c) });
    if (!s) return;
    sceneRef.current = s;
    onScene?.(s);
    setReady(true);
    return () => { alive = false; onScene?.(null); s.destroy(); sceneRef.current = null; setReady(false); };
  }, [scene, flip, onScene]);

  useEffect(() => {
    const s = sceneRef.current;
    if (!s) return;
    if (active) s.play(); else s.pause();
  }, [active, ready]);

  const fade = `absolute inset-0 h-full w-full transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`;

  return (
    <>
      <canvas ref={glRef} className={`${fade} block`} />
      {scene === "ai" && <canvas ref={ovRef} className={`${fade} pointer-events-none`} />}
      {ready && caption && <SceneCaption caption={caption} flip={flip} />}
    </>
  );
}
