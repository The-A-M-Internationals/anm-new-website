/** Shared WebGL2 plumbing for the service scenes */

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function createProgram(gl: WebGL2RenderingContext, vs: string, fs: string) {
  const mk = (type: number, src: string) => {
    const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(String(gl.getShaderInfoLog(s)));
    return s;
  };
  const pr = gl.createProgram()!;
  const v = mk(gl.VERTEX_SHADER, vs), f = mk(gl.FRAGMENT_SHADER, fs);
  gl.attachShader(pr, v); gl.attachShader(pr, f); gl.linkProgram(pr); gl.useProgram(pr);
  gl.deleteShader(v); gl.deleteShader(f);
  return pr;
}

export function getUniforms(gl: WebGL2RenderingContext, pr: WebGLProgram, names: string[]) {
  const U: Record<string, WebGLUniformLocation | null> = {};
  names.forEach((n) => (U[n] = gl.getUniformLocation(pr, n)));
  return U;
}

/**
 * Lowers the render resolution until the scene holds ~60 fps (rolling-average frame time).
 * The scene shares the page's frame, so a slow scene would make scrolling stutter too.
 * Starts at the real device DPR so every step takes effect immediately.
 * With `key`, the settled cap is remembered per device, so the ramp-down happens once — later
 * visits start at the resolution this GPU can hold.
 * Returns the current device-pixel-ratio cap for this frame.
 */
export function createDprGovernor(start: number, min: number, step: number, key?: string) {
  const store = key ? `anm-dpr:${key}` : "";
  let saved = NaN;
  try { if (store) saved = Number(localStorage.getItem(store) ?? NaN); } catch {}
  let cap = Math.min(saved >= min && saved <= start ? saved : start, window.devicePixelRatio || 1);
  let avg = 1 / 60, wait = 0;
  return (dt: number) => {
    avg += (dt - avg) * 0.1; wait += dt;
    if (avg > 0.018 && wait > 0.25 && cap > min) {
      cap = Math.max(min, cap - step); wait = 0;
      try { if (store) localStorage.setItem(store, cap.toFixed(2)); } catch {}
    }
    return cap;
  };
}

/**
 * Sizes the canvas (and optional overlay) to its layout box at the capped DPR.
 * Uses clientWidth/Height (not getBoundingClientRect) so GSAP scale/tilt
 * transforms never trigger a buffer resize mid-animation.
 */
export function fitCanvas(canvas: HTMLCanvasElement, dprCap: number, overlay?: HTMLCanvasElement | null) {
  const r = { width: canvas.clientWidth, height: canvas.clientHeight };
  const dpr = Math.min(dprCap, window.devicePixelRatio || 1);
  const w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w; canvas.height = h;
    if (overlay) { overlay.width = w; overlay.height = h; }
  }
  return { w, h, dpr, aspect: w / h, cssWidth: r.width };
}

/**
 * rAF loop with play/pause. `tick` returns false when no further frames are
 * needed (e.g. reduced motion). `kick` renders a single frame while paused.
 */
export function createLoop(tick: (dt: number) => boolean) {
  let raf = 0, last = 0, playing = false, alive = true;
  const frame = (now: number) => {
    const dt = Math.min(0.1, (now - (last || now)) / 1000); last = now;
    const more = tick(dt);
    raf = alive && playing && more ? requestAnimationFrame(frame) : 0;
  };
  const kick = () => { if (alive && !raf) { last = 0; raf = requestAnimationFrame(frame); } };
  return {
    play() { playing = true; kick(); },
    pause() { playing = false; cancelAnimationFrame(raf); raf = 0; },
    kick,
    stop() { alive = false; playing = false; cancelAnimationFrame(raf); raf = 0; },
  };
}
