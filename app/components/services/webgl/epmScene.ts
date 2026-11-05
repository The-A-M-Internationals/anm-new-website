/**
 * Oracle EPM "Group Consolidation" scene — standalone renderer.
 * Four entity towers and Group HQ play a ~28 s month-end close, then the
 * camera settles into a slow endless orbit. play() resumes, pause() freezes.
 */
import { VS, FS } from "./epmShader";
import { createDprGovernor, createLoop, createProgram, fitCanvas, getUniforms, prefersReducedMotion } from "./gl";
import { cr, fitDistance, inOut, nz, smooth } from "./math";
import type { SceneFactory } from "./types";

const TOWERS = [
  [-1.42, -0.86, 0.17, 0.98], // UAE
  [1.46, -0.8, 0.16, 0.78],   // India
  [-1.32, 0.92, 0.15, 0.7],   // UK
  [1.36, 0.96, 0.18, 1.12],   // USA
  [0.0, 0.0, 0.26, 1.62],     // Group HQ
];
const STEPS: [number, string][] = [
  [0, "Entity books · UAE · India · UK · USA"],
  [3, "Reconciling entity ledgers"],
  [9, "Consolidating to group"],
  [13.5, "Group view coming together"],
  [18.5, "Planning & forecast"],
  [21.5, "Board reporting"],
  [27, "Month-end close complete"],
];
/* camera keyframes: [time, yaw, pitch, dist, targetY] */
const CAM_KEYS: number[][] = [
  [0, 0.66, 0.52, 6.5, 0.66], [3, 0.42, 0.46, 5.7, 0.5], [9, 0.92, 0.66, 6.2, 0.45], [14, 1.32, 0.38, 5.3, 0.86],
  [19, 1.62, 0.3, 5.9, 1.1], [23, 1.95, 0.5, 6.8, 0.95], [28, 2.15, 0.48, 6.6, 0.8],
];
const UNIFORMS = ["uRes", "uRo", "uF", "uRt", "uUp", "uFoc", "uTime", "uT", "uSend", "uLevel", "uGrow", "uCrown",
  "uBeam", "uWave", "uRep", "uScanE", "uRecE", "uPathE"];
const HALF_FOV_TAN = Math.tan(0.25);

function camAt(T: number) {
  let k = 1; while (k < CAM_KEYS.length - 1 && CAM_KEYS[k][0] < T) k++;
  const A = CAM_KEYS[k - 1], B = CAM_KEYS[k], f = inOut(Math.min(1, Math.max(0, (T - A[0]) / (B[0] - A[0]))));
  const c = A.map((v, n) => v + (B[n] - v) * f);
  if (T > 28) c[1] += (T - 28) * 0.035;
  return c;
}

export const createEpmScene: SceneFactory = (canvas, _overlay, { bias = 0, onCaption }) => {
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "high-performance" });
  if (!gl) return null;
  const pr = createProgram(gl, VS, FS), U = getUniforms(gl, pr, UNIFORMS);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, "aP"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  gl.uniform4fv(U.uT, new Float32Array(TOWERS.flat()));

  const reduce = prefersReducedMotion(), governor = createDprGovernor(0.65, 0.45, 0.1, "epm");
  const m = { x: 0, y: 0, tx: 0, ty: 0 };
  let T = reduce ? 40 : 0, time = 0, caption = "";

  const loop = createLoop((dt) => {
    if (!reduce) { time += dt; T += dt; }
    m.x += (m.tx - m.x) * 0.05; m.y += (m.ty - m.y) * 0.05;
    const { w, h, aspect } = fitCanvas(canvas, governor(dt));
    gl.viewport(0, 0, w, h);

    const cv = camAt(T), dist = cv[3] * fitDistance(aspect, 1.45);
    const yaw = cv[1] + m.x * 0.4, pitch = cv[2] - m.y * 0.1, tgt = [0, cv[4], 0.05];
    const eye = [tgt[0] + Math.sin(yaw) * Math.cos(pitch) * dist, tgt[1] + Math.sin(pitch) * dist, tgt[2] + Math.cos(yaw) * Math.cos(pitch) * dist];
    const f = nz([tgt[0] - eye[0], tgt[1] - eye[1], tgt[2] - eye[2]]), rt = nz(cr(f, [0, 1, 0])), up = cr(rt, f);
    /* slide the camera sideways so the model sits clear of the copy card */
    const s = aspect > 1.3 ? bias * 0.4 * dist * HALF_FOV_TAN * aspect : 0;
    const ro = [eye[0] - rt[0] * s, eye[1] - rt[1] * s, eye[2] - rt[2] * s];
    gl.uniform2f(U.uRes, w, h); gl.uniform3fv(U.uRo, ro); gl.uniform3fv(U.uF, f); gl.uniform3fv(U.uRt, rt); gl.uniform3fv(U.uUp, up);
    gl.uniform1f(U.uFoc, 1 / HALF_FOV_TAN); gl.uniform1f(U.uTime, time);

    /* story beats */
    const scan = [0, 1, 2, 3].map((i) => { const a = 3 + i * 1.45; return T > a && T < a + 1.7 ? (T - a) / 1.7 : -1; });
    const rec = [0, 1, 2, 3].map((i) => smooth(3 + i * 1.45 + 1.5, 3 + i * 1.45 + 1.8, T));
    const path = [0, 1, 2, 3].map((i) => smooth(9 + i * 0.9, 9 + i * 0.9 + 2.1, T));
    const waveT = T - 23.5, wave = waveT > 0 ? (waveT < 5 ? waveT * 0.55 : ((waveT - 5) % 8) * 0.55) : -1;
    gl.uniform1f(U.uSend, smooth(0, 2.5, T));
    gl.uniform4fv(U.uScanE, scan); gl.uniform4fv(U.uRecE, rec); gl.uniform4fv(U.uPathE, path);
    gl.uniform1f(U.uLevel, smooth(13.5, 18.5, T) * 1.02);
    gl.uniform1f(U.uGrow, smooth(18.5, 21.5, T));
    gl.uniform1f(U.uCrown, smooth(21.5, 23, T));
    gl.uniform1f(U.uBeam, smooth(22, 24.5, T));
    gl.uniform1f(U.uWave, wave);
    gl.uniform1f(U.uRep, smooth(25, 27, T));
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    let label = STEPS[0][1];
    for (const [at, txt] of STEPS) if (T >= at) label = txt;
    if (label !== caption) { caption = label; onCaption?.({ title: label, done: T >= 27 }); }
    return !reduce;
  });

  const ro = new ResizeObserver(() => loop.kick()); ro.observe(canvas);
  loop.kick(); /* first frame = rest pose, shown before playback starts */

  return {
    play: loop.play,
    pause: loop.pause,
    /* caller (gsap.quickTo) already eases the value, so apply it directly */
    setPointer(x, y) { m.tx = m.x = x; m.ty = m.y = y; loop.kick(); },
    destroy() { loop.stop(); ro.disconnect(); gl.deleteBuffer(buf); gl.deleteProgram(pr); },
  };
};
