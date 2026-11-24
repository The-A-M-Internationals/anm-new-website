"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const GAP = 20;   // px between lines
const STEP = 14;  // px between points along a line

/**
 * Backdrop of slow, flowing lines with a single gold one. Fills its nearest positioned parent.
 * Drawn on the shared GSAP ticker at half rate, paused while off screen, pixel ratio capped at 1.5.
 * Visitors who prefer reduced motion get one still frame.
 */
export default function FlowLines({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    let w = 0, h = 0, visible = true, frame = 0, now = 0;

    const draw = () => {
      const t = now * 0.22;
      const count = Math.ceil((h * 1.3) / GAP);
      const gold = Math.round(count * 0.37);
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < count; i++) {
        const base = i * GAP - h * 0.15;
        ctx.beginPath();
        for (let x = -STEP; x <= w + STEP; x += STEP) {
          const y = base + Math.sin(x * 0.006 + t + i * 0.33) * 34 + Math.sin(x * 0.013 - t * 1.4 + i * 0.12) * 14;
          if (x < 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = i === gold ? "rgba(212,175,55,0.55)" : `rgba(110,145,255,${0.1 + 0.12 * Math.abs(Math.sin(i * 1.7))})`;
        ctx.lineWidth = i === gold ? 1.4 : 1;
        ctx.stroke();
      }
    };
    const fit = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
      io.observe(canvas);
      const tick = (time: number) => { if (visible && frame++ % 2 === 0) { now = time; draw(); } };
      gsap.ticker.add(tick);
      return () => { gsap.ticker.remove(tick); io.disconnect(); };
    });
    return () => { mm.revert(); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
