"use client";

/**
 * AI Automations — "One AI, five capabilities" particle card
 * ------------------------------------------------------------------
 * 9,000 particles of light form a slowly turning AI core. On hover the same
 * particles reassemble, one service at a time (~32 s, never loops):
 *   01 Machine Learning            — data separates into learned clusters; one anomaly is flagged
 *   02 Robotic Process Automation  — work packets flow through validate / process / post gates
 *   03 Natural Language Processing — the particles become a sentence: "How can I help?"
 *   04 Computer Vision             — they form an eye; the system recognises what it sees
 *   05 Generative AI               — noise resolves into a brand-new generated form
 * Finally they gather back into the AI core: 24/7 automated operations.
 *
 * Single self-contained file. WebGL2 point renderer, no external libraries.
 */
import { useEffect, useRef } from "react";

/* ENGINE START */
const N = 9000;

const P_VS = `#version 300 es
in vec4 aA; in vec4 aB; in vec4 aR;
uniform mat4 uPV; uniform float uRot, uMix, uTime, uPx;
out vec3 vC; out float vA;
const vec3 IVORY = vec3(0.86, 0.84, 0.78), GOLD = vec3(1.0, 0.72, 0.32), AMBER = vec3(1.0, 0.38, 0.12), ICE = vec3(0.6, 0.72, 1.0);
vec3 pal(float t){ return t < 0.5 ? IVORY * 0.42 : t < 1.5 ? GOLD : t < 2.5 ? AMBER * 1.3 : t < 3.5 ? GOLD : ICE * 0.62; }
vec3 flow(vec4 s, out float fa){
  fa = 1.0; vec3 p = s.xyz;
  if (s.w > 2.5 && s.w < 3.5) { p.x = mod(p.x + uTime * 0.42 + 1.6, 3.2) - 1.6; fa = smoothstep(1.6, 1.3, abs(p.x)); }
  return p;
}
void main(){
  float k = clamp((uMix - aR.x * 0.4) / 0.6, 0.0, 1.0); k = k * k * (3.0 - 2.0 * k);
  float fa, fb; vec3 a = flow(aA, fa), b = flow(aB, fb);
  vec3 p = mix(a, b, k) + (aR.yzw - 0.5) * 1.1 * sin(k * 3.14159);
  p += 0.006 * vec3(sin(uTime * 1.3 + aR.y * 40.0), sin(uTime * 1.1 + aR.z * 40.0), sin(uTime * 1.7 + aR.w * 40.0));
  float c = cos(uRot), s = sin(uRot); p = vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
  gl_Position = uPV * vec4(p, 1.0);
  vC = mix(pal(aA.w), pal(aB.w), k);
  vA = mix(fa, fb, k) * (0.55 + 0.45 * aR.y);
  gl_PointSize = uPx * (0.55 + aR.z * 0.9) / gl_Position.w;
}`;
const P_FS = `#version 300 es
precision mediump float;
in vec3 vC; in float vA; out vec4 o;
void main(){ vec2 q = gl_PointCoord * 2.0 - 1.0; float r = dot(q, q); if (r > 1.0) discard;
  float a = exp(-r * 3.2) * vA; o = vec4(vC * a, a); }`;

/* ---------- shapes (each returns N x [x, y, z, tag]) ---------- */
/* tags: 0 ivory (dim) · 1 gold · 2 amber · 3 gold + flowing · 4 ice */
type Shape = Float32Array;
function rng(seed: number) { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647); }
function gauss(r: () => number) { return Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(6.2832 * r()); }

function shapeCore(goldFrac: number): Shape {
  const r = rng(11), out = new Float32Array(N * 4), shell = Math.floor(N * 0.72);
  for (let i = 0; i < N; i++) {
    let x, y, z, t;
    if (i < shell) {
      y = 1 - (2 * (i + 0.5)) / shell; const rr = Math.sqrt(1 - y * y), ph = i * 2.39996;
      x = Math.cos(ph) * rr * 1.02; z = Math.sin(ph) * rr * 1.02; y *= 1.02; t = r() < goldFrac ? 1 : 0;
    } else {
      const u = r(), v = r(), w = Math.cbrt(r()) * 0.42, th = 6.2832 * u, ph = Math.acos(2 * v - 1);
      x = w * Math.sin(ph) * Math.cos(th); y = w * Math.cos(ph); z = w * Math.sin(ph) * Math.sin(th); t = r() < 0.6 ? 1 : 4;
    }
    out.set([x, y, z, t], i * 4);
  }
  return out;
}
const ANOMALY = [1.18, 0.82, 0.12];
function shapeML(): Shape {
  const r = rng(23), out = new Float32Array(N * 4);
  const C = [[-0.78, 0.32, 0.2, 1], [0.52, 0.5, -0.32, 4], [0.05, -0.52, 0.38, 1], [0.92, -0.32, 0.4, 4], [-0.5, -0.45, -0.4, 0]];
  for (let i = 0; i < N; i++) {
    if (i >= N - 80) { out.set([ANOMALY[0] + gauss(r) * 0.035, ANOMALY[1] + gauss(r) * 0.035, ANOMALY[2] + gauss(r) * 0.035, 2], i * 4); continue; }
    const c = C[i % C.length], sd = 0.16 + (i % 3) * 0.02;
    out.set([c[0] + gauss(r) * sd, c[1] + gauss(r) * sd * 0.8, c[2] + gauss(r) * sd, c[3]], i * 4);
  }
  return out;
}
const LANES = [[0.42, -0.25], [0, 0], [-0.42, 0.25]], GATES = [-0.72, 0, 0.72];
function shapeRPA(): Shape {
  const r = rng(37), out = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) {
    const f = i / N;
    if (f < 0.22) { const L = LANES[i % 3]; out.set([-1.5 + r() * 3.0, L[0] + gauss(r) * 0.004, L[1] + gauss(r) * 0.004, 0], i * 4); }
    else if (f < 0.42) {
      const gx = GATES[i % 3], s = r() * 4, a = s % 1, hy = 0.66, hz = 0.46, side = Math.floor(s);
      const y = side === 0 ? -hy + a * 2 * hy : side === 1 ? hy : side === 2 ? hy - a * 2 * hy : -hy;
      const z = side === 0 ? -hz : side === 1 ? -hz + a * 2 * hz : side === 2 ? hz : hz - a * 2 * hz;
      out.set([gx + gauss(r) * 0.006, y, z, 1], i * 4);
    } else {
      const lane = i % 3, m = Math.floor(i / 3) % 5, L = LANES[lane], h = 0.065;
      const face = Math.floor(r() * 6), u = (r() * 2 - 1) * h, v = (r() * 2 - 1) * h;
      const q = face < 2 ? [face ? h : -h, u, v] : face < 4 ? [u, face === 3 ? h : -h, v] : [u, v, face === 5 ? h : -h];
      out.set([-1.6 + m * 0.64 + lane * 0.21 + q[0], L[0] + q[1], L[1] + q[2], 3], i * 4);
    }
  }
  return out;
}
function shapeText(text: string): Shape {
  if (typeof document === "undefined") return new Float32Array(N * 4);
  const r = rng(51), out = new Float32Array(N * 4);
  const W = 1200, H = 220, cv = document.createElement("canvas"); cv.width = W; cv.height = H;
  const g = cv.getContext("2d");
  if (!g) return out;
  g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "middle";
  g.font = "700 132px Inter, 'Segoe UI', Arial, sans-serif"; g.fillText(text, W / 2, H / 2);
  const d = g.getImageData(0, 0, W, H).data, pts: number[] = [];
  for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) if (d[(y * W + x) * 4 + 3] > 128) pts.push(x, y);
  const textN = Math.floor(N * 0.84);
  for (let i = 0; i < N; i++) {
    if (i < textN && pts.length) {
      const k = Math.floor(r() * (pts.length / 2)) * 2;
      out.set([(pts[k] / W - 0.5) * 3.0, -(pts[k + 1] / H - 0.5) * 0.55 + 0.14, gauss(r) * 0.025, r() < 0.82 ? 1 : 0], i * 4);
    } else {
      const x = -1.3 + r() * 2.6, env = Math.exp(-x * x * 1.2);
      out.set([x, -0.42 + Math.sin(x * 11) * 0.09 * env * (r() * 2 - 1), gauss(r) * 0.01, 4], i * 4);
    }
  }
  return out;
}
function shapeEye(): Shape {
  const r = rng(67), out = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) {
    const f = i / N;
    if (f < 0.18) {
      const x = -1.32 + r() * 2.64, yy = 0.56 * (1 - (x / 1.32) ** 2) * (r() < 0.5 ? 1 : -1);
      out.set([x, yy + gauss(r) * 0.008, gauss(r) * 0.01, 1], i * 4);
    } else if (f < 0.66) {
      const rr = 0.2 + Math.sqrt(r()) * 0.38, a = r() * 6.2832, fib = (a * 24 / 6.2832 + rr * 3) % 1;
      out.set([Math.cos(a) * rr, Math.sin(a) * rr, 0.16 * Math.sqrt(Math.max(0, 1 - (rr * rr) / 0.36)), fib < 0.45 ? 1 : 0], i * 4);
    } else if (f < 0.76) {
      const a = r() * 6.2832, rr = 0.2 + gauss(r) * 0.006; out.set([Math.cos(a) * rr, Math.sin(a) * rr, 0.16, 1], i * 4);
    } else {
      let x = 0, y = 0;
      for (let k = 0; k < 20; k++) { x = -1.25 + r() * 2.5; y = (r() * 2 - 1) * 0.52; if (Math.abs(y) < 0.52 * (1 - (x / 1.32) ** 2) && x * x + y * y > 0.42) break; }
      out.set([x, y, 0, 4], i * 4);
    }
  }
  return out;
}
function shapeGen(): Shape {
  const r = rng(83), out = new Float32Array(N * 4);
  const P = (t: number) => [(Math.sin(t) + 2 * Math.sin(2 * t)) * 0.27, (Math.cos(t) - 2 * Math.cos(2 * t)) * 0.27 - 0.08, -Math.sin(3 * t) * 0.3];
  for (let i = 0; i < N; i++) {
    const t = r() * 6.2832, a = P(t), b = P(t + 0.001);
    const T = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], l = Math.hypot(T[0], T[1], T[2]); T[0] /= l; T[1] /= l; T[2] /= l;
    const U = [T[1], -T[0], 0], ul = Math.hypot(U[0], U[1]) || 1; U[0] /= ul; U[1] /= ul;
    const V = [T[1] * U[2] - T[2] * U[1], T[2] * U[0] - T[0] * U[2], T[0] * U[1] - T[1] * U[0]];
    const ph = r() * 6.2832, rad = 0.1 + gauss(r) * 0.006;
    const p = [0, 1, 2].map((j) => a[j] + (U[j] * Math.cos(ph) + V[j] * Math.sin(ph)) * rad);
    out.set([p[0], p[1], p[2], (t * 3 / 6.2832) % 1 < 0.5 ? 1 : 4], i * 4);
  }
  return out;
}

/* ---------- small math ---------- */
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth01 = (a: number, b: number, x: number) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };
function persp(fov: number, asp: number, n: number, f: number) {
  const t = 1 / Math.tan(fov / 2), o = new Float32Array(16);
  o[0] = t / asp; o[5] = t; o[10] = (f + n) / (n - f); o[11] = -1; o[14] = (2 * f * n) / (n - f); return o;
}
function lookAt(e: number[], c: number[]) {
  const nz = (v: number[]) => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
  const cr = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const dt = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const z = nz([e[0] - c[0], e[1] - c[1], e[2] - c[2]]), x = nz(cr([0, 1, 0], z)), y = cr(z, x);
  return new Float32Array([x[0], y[0], z[0], 0, x[1], y[1], z[1], 0, x[2], y[2], z[2], 0, -dt(x, e), -dt(y, e), -dt(z, e), 1]);
}
function mul4(a: Float32Array, b: Float32Array) {
  const o = new Float32Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
  return o;
}

/* ---------- story ---------- */
type Hud = { key?: string; idx: string; name: string; line: string };
const CHAPTERS: Hud[] = [
  { key: "ml", idx: "01", name: "Machine Learning", line: "Learns patterns in your data · flags the anomaly" },
  { key: "rpa", idx: "02", name: "Robotic Process Automation", line: "Repetitive work flows through on its own" },
  { key: "nlp", idx: "03", name: "Natural Language Processing", line: "Understands and answers human language" },
  { key: "cv", idx: "04", name: "Computer Vision", line: "Sees, recognises and inspects" },
  { key: "gen", idx: "05", name: "Generative AI", line: "Creates new content, code and designs" },
];
const CH_START = 0.4, CH_LEN = 6.2, FINALE = CH_START + CHAPTERS.length * CH_LEN;
const REST: Hud = { idx: "AI", name: "Intelligent Automation", line: "Hover to explore five AI capabilities" };
const DONE: Hud = { idx: "24/7", name: "Powered by Artificial Intelligence", line: "One AI core · five capabilities · always on" };

export function initAiCard(card: HTMLElement): () => void {
  const canvas = card.querySelector("canvas.ai-gl") as HTMLCanvasElement | null;
  const ov = card.querySelector("canvas.ai-ov") as HTMLCanvasElement | null;
  if (!canvas || !ov) return () => {};

  const hud = card.querySelector(".ai-hud") as HTMLElement | null;
  const hudIdx = card.querySelector("[data-idx]") as HTMLElement | null;
  const hudName = card.querySelector("[data-name]") as HTMLElement | null;
  const hudLine = card.querySelector("[data-line]") as HTMLElement | null;
  const dots = Array.from(card.querySelectorAll(".ai-dots i")) as HTMLElement[];

  const gl = canvas.getContext("webgl2", { antialias: true, alpha: true, premultipliedAlpha: true });
  if (!gl) { card.classList.add("no-webgl"); return () => {}; }

  const mk = (type: number, src: string) => {
    const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(String(gl.getShaderInfoLog(s)));
    return s;
  };
  const pr = gl.createProgram()!;
  gl.attachShader(pr, mk(gl.VERTEX_SHADER, P_VS)); gl.attachShader(pr, mk(gl.FRAGMENT_SHADER, P_FS)); gl.linkProgram(pr); gl.useProgram(pr);
  const U: Record<string, WebGLUniformLocation | null> = {};
  ["uPV", "uRot", "uMix", "uTime", "uPx"].forEach((n) => (U[n] = gl.getUniformLocation(pr, n)));

  const SH: Record<string, Shape> = {
    rest: shapeCore(0.12),
    ml: shapeML(),
    rpa: shapeRPA(),
    nlp: shapeText("How can I help?"),
    cv: shapeEye(),
    gen: shapeGen(),
    done: shapeCore(0.42),
  };
  const seeds = new Float32Array(N * 4);
  { const r = rng(5); for (let i = 0; i < N * 4; i++) seeds[i] = r(); }
  let A: Shape = SH.rest.slice(), B: Shape = SH.rest.slice();
  const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
  const mkBuf = (name: string, data: Float32Array, usage: number) => {
    const b = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, data, usage); const l = gl.getAttribLocation(pr, name); gl.enableVertexAttribArray(l);
    gl.vertexAttribPointer(l, 4, gl.FLOAT, false, 0, 0); return b;
  };
  const bA = mkBuf("aA", A, gl.DYNAMIC_DRAW), bB = mkBuf("aB", B, gl.DYNAMIC_DRAW); mkBuf("aR", seeds, gl.STATIC_DRAW);
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE); gl.disable(gl.DEPTH_TEST);

  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let T = 0, goal = 0, time = 0, last = 0, raf = 0, visible = true, mixStart = -10, target = "rest", spin = 0, shown = "";
  let dprCap = typeof window !== "undefined" ? ((window as unknown as { __AI_DPR?: number }).__AI_DPR || 1.5) : 1.5;
  let slow = 0;
  const m = { x: 0, y: 0, tx: 0, ty: 0 };

  const mixAt = () => (reduce ? 1 : clamp01((time - mixStart) / 1.8));
  const retarget = (key: string) => {
    if (key === target) return;
    const mx = mixAt(), snap = new Float32Array(N * 4);
    const fl = (x: number, tag: number) => (tag > 2.5 && tag < 3.5 ? ((((x + time * 0.42 + 1.6) % 3.2) + 3.2) % 3.2) - 1.6 : x);
    for (let i = 0; i < N; i++) {
      let k = clamp01((mx - seeds[i * 4] * 0.4) / 0.6); k = k * k * (3 - 2 * k);
      const j = i * 4, ax = fl(A[j], A[j + 3]), bx = fl(B[j], B[j + 3]);
      snap[j] = ax + (bx - ax) * k; snap[j + 1] = A[j + 1] + (B[j + 1] - A[j + 1]) * k; snap[j + 2] = A[j + 2] + (B[j + 2] - A[j + 2]) * k;
      const tg = k > 0.5 ? B[j + 3] : A[j + 3]; snap[j + 3] = tg === 3 ? 1 : tg;
    }
    A = snap; B = SH[key]; target = key; mixStart = time;
    gl.bindBuffer(gl.ARRAY_BUFFER, bA); gl.bufferData(gl.ARRAY_BUFFER, A, gl.DYNAMIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, bB); gl.bufferData(gl.ARRAY_BUFFER, B, gl.DYNAMIC_DRAW);
  };
  const setHud = (h: Hud) => {
    const id = h.idx + h.name; if (id === shown || !hud) return; shown = id;
    hud.classList.remove("in"); void hud.offsetWidth;
    if (hudIdx) hudIdx.textContent = h.idx; if (hudName) hudName.textContent = h.name; if (hudLine) hudLine.textContent = h.line;
    hud.classList.add("in");
  };

  const frame = (now: number) => {
    const dt = Math.min(0.1, (now - (last || now)) / 1000); last = now;
    time += dt;
    if (goal) T += reduce ? 60 : dt;
    if (!goal) T = 0;
    m.x += (m.tx - m.x) * 0.05; m.y += (m.ty - m.y) * 0.05;
    if (dt > 0.03) slow++; else slow = Math.max(0, slow - 1);
    if (slow > 20 && dprCap > 0.75) { dprCap -= 0.25; slow = 0; }

    let ci = -1;
    if (goal) ci = T < CH_START ? -1 : T < FINALE ? Math.floor((T - CH_START) / CH_LEN) : 99;
    const key = !goal || ci < 0 ? "rest" : ci === 99 ? "done" : CHAPTERS[ci].key!;
    retarget(key);
    setHud(!goal || ci < 0 ? REST : ci === 99 ? DONE : CHAPTERS[ci]);
    dots.forEach((d, i) => d.classList.toggle("on", goal === 1 && (ci === 99 || (ci >= 0 && i <= ci))));
    card.classList.toggle("is-done", ci === 99);

    const facing = key === "nlp" || key === "cv" || key === "rpa";
    spin += dt * (key === "rest" || key === "done" ? 0.22 : key === "gen" ? 0.35 : 0);
    if (facing || key === "ml") spin += (Math.round(spin / 6.2832) * 6.2832 - spin) * 0.06;
    const rot = spin + (facing ? Math.sin(time * 0.35) * 0.22 : key === "ml" ? Math.sin(time * 0.3) * 0.45 : 0) + m.x * 0.5;

    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(dprCap, (typeof window !== "undefined" && window.devicePixelRatio) || 1);
    const w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; ov.width = w; ov.height = h; }
    gl.viewport(0, 0, w, h); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    const dist = (r.width < 480 ? 4.6 : 3.8) - (key === "rest" ? 0 : 0.15);
    const eye = [m.x * 0.6, 0.18 - m.y * 0.4, dist];
    const PV = mul4(persp(0.72, w / h, 0.1, 30), lookAt(eye, [0, 0.05, 0]));
    gl.uniformMatrix4fv(U.uPV, false, PV); gl.uniform1f(U.uRot, rot); gl.uniform1f(U.uMix, mixAt());
    gl.uniform1f(U.uTime, time); gl.uniform1f(U.uPx, h * 0.022);
    gl.drawArrays(gl.POINTS, 0, N);

    /* annotation layer */
    const g = ov.getContext("2d");
    if (g) {
      g.clearRect(0, 0, w, h);
      const proj = (p: number[]) => {
        const c = Math.cos(rot), s = Math.sin(rot);
        const x = c * p[0] + s * p[2], y = p[1], z = -s * p[0] + c * p[2];
        const X = PV[0] * x + PV[4] * y + PV[8] * z + PV[12],
              Y = PV[1] * x + PV[5] * y + PV[9] * z + PV[13],
              W = PV[3] * x + PV[7] * y + PV[11] * z + PV[15];
        return [((X / W) * 0.5 + 0.5) * w, (1 - ((Y / W) * 0.5 + 0.5)) * h];
      };
      const c0 = CH_START + ci * CH_LEN;
      const into = goal && ci >= 0 && ci < 99 ? smooth01(c0 + 1.9, c0 + 2.5, T) * (1 - smooth01(c0 + CH_LEN - 0.5, c0 + CH_LEN, T)) : 0;
      if (into > 0.01) {
        g.globalAlpha = into; g.lineWidth = 1.2 * dpr; g.font = `600 ${10 * dpr}px ui-monospace, Menlo, Consolas, monospace`;
        const gold = "rgba(242,205,98,.9)", amber = "rgba(255,120,50,.95)";
        const label = (txt: string, x: number, y: number, col: string) => { g.fillStyle = col; g.fillText(txt.toUpperCase(), x, y); };
        g.textAlign = "left";
        if (key === "ml") {
          const [x, y] = proj(ANOMALY), rr = (20 + 3 * Math.sin(time * 4)) * dpr;
          g.strokeStyle = amber; g.beginPath(); g.arc(x, y, rr, 0, 6.2832); g.stroke();
          g.beginPath(); g.moveTo(x - rr * 0.7, y + rr * 0.7); g.lineTo(x - rr * 2.0, y + rr * 1.8); g.stroke();
          g.textAlign = "right"; label("Anomaly detected", x - rr * 2.1, y + rr * 1.8 + 4 * dpr, amber);
        } else if (key === "rpa") {
          g.textAlign = "center";
          ["Validate", "Process", "Post"].forEach((t, i) => { const [x, y] = proj([GATES[i], 0.8, 0]); label(t, x, y, gold); });
        } else if (key === "nlp") {
          const [x, y] = proj([0, -0.64, 0]); g.textAlign = "center"; label("Intent: support · sentiment: positive · 0.97", x, y, gold);
        } else if (key === "cv") {
          const a = proj([-1.4, 0.66, 0]), b = proj([1.4, -0.66, 0]), L = 16 * dpr;
          g.strokeStyle = gold; g.beginPath();
          [[a[0], a[1], 1, 1], [b[0], a[1], -1, 1], [a[0], b[1], 1, -1], [b[0], b[1], -1, -1]].forEach(([x, y, sx, sy]) => {
            g.moveTo(x + sx * L, y); g.lineTo(x, y); g.lineTo(x, y + sy * L);
          });
          g.stroke();
          const sy = a[1] + (b[1] - a[1]) * (0.5 + 0.5 * Math.sin(time * 1.6));
          g.globalAlpha = into * 0.35; g.beginPath(); g.moveTo(a[0], sy); g.lineTo(b[0], sy); g.stroke(); g.globalAlpha = into;
          label("Recognised · 98.6%", a[0], a[1] - 8 * dpr, gold);
        } else if (key === "gen") {
          const [x, y] = proj([0.95, 0.35, 0]); label("Generated", x, y, gold);
        }
        g.globalAlpha = 1;
      }
    }
    raf = visible ? requestAnimationFrame(frame) : 0;
  };
  const start = () => { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
  io.observe(canvas); start();

  let lastPointer = "mouse";
  const onIn = () => { if (card.classList.contains("is-active")) return; card.classList.add("is-active"); goal = 1; start(); };
  const off = () => { card.classList.remove("is-active"); goal = 0; m.tx = 0; m.ty = 0; start(); };
  const ev: [string, EventListener][] = [
    ["pointerdown", ((e: PointerEvent) => { lastPointer = e.pointerType; }) as EventListener],
    ["pointerenter", ((e: PointerEvent) => { lastPointer = e.pointerType; if (e.pointerType !== "touch") onIn(); }) as EventListener],
    ["pointerleave", ((e: PointerEvent) => { if (e.pointerType !== "touch") off(); }) as EventListener],
    ["pointermove", ((e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = canvas.getBoundingClientRect();
      m.tx = clamp01((e.clientX - r.left) / r.width) - 0.5;
      m.ty = clamp01((e.clientY - r.top) / r.height) - 0.5;
    }) as EventListener],
    ["click", (() => { if (lastPointer === "touch") (card.classList.contains("is-active") ? off() : onIn()); }) as EventListener],
    ["focus", (() => { if (lastPointer !== "touch") onIn(); }) as EventListener],
    ["blur", off as EventListener],
  ];
  ev.forEach(([n, fn]) => card.addEventListener(n, fn));
  return () => { cancelAnimationFrame(raf); raf = 0; visible = false; io.disconnect(); ev.forEach(([n, fn]) => card.removeEventListener(n, fn)); };
}
/* ENGINE END */

export interface AiAutomationCard3DProps {
  href?: string;
  eyebrow?: string;
  title?: string;
  desc?: string;
  list?: string[];
  stats?: { num: string; label: string }[];
  tags?: string[];
  explore?: string;
}

export default function AiAutomationCard3D({
  href = "/ai-automations",
  eyebrow = "Powered by Artificial Intelligence",
  title = "Intelligent Automation, Elevated by AI",
  desc = "Transform your business with cutting-edge AI and machine learning. Automate workflows, enhance decision-making, and unlock unprecedented efficiency.",
  list = [
    "Machine Learning",
    "Robotic Process Automation",
    "Natural Language Processing",
    "Computer Vision",
    "Generative AI",
  ],
  stats = [
    { num: "85%", label: "efficiency increase" },
    { num: "10x", label: "faster processing" },
    { num: "24/7", label: "automated operations" },
  ],
  tags = ["ML", "RPA", "NLP", "CV", "GenAI"],
  explore = "Explore AI Solutions",
}: AiAutomationCard3DProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) return initAiCard(ref.current);
  }, []);

  return (
    <article ref={ref} className="ai-card cursor-pointer" tabIndex={0} aria-label={title}>
      <style>{AI_CSS}</style>
      <div className="ai-visual">
        <canvas className="ai-gl" aria-hidden="true" />
        <canvas className="ai-ov" aria-hidden="true" />
        <div className="ai-bin" aria-hidden="true">01001001 · 01000001 · 01001001</div>
        <div className="ai-hud in" aria-live="polite">
          <span data-idx>AI</span>
          <b data-name>Intelligent Automation</b>
          <small data-line>Hover to explore five AI capabilities</small>
        </div>
        <div className="ai-dots" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      </div>
      <div className="ai-body">
        <p className="ai-eyebrow">{eyebrow}</p>
        <h3 className="ai-title">{title}</h3>
        <p className="ai-desc">{desc}</p>
        <ul className="ai-list">
          {list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <div className="ai-stats">
          {stats.map((s, i) => (
            <div key={i} className="ai-stat">
              <b>{s.num}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="ai-foot">
        <div className="ai-tags">
          {tags.map((t, i) => (
            <span key={i} className="ai-tag">{t}</span>
          ))}
        </div>
        <a className="ai-explore cursor-pointer" href={href}>
          {explore}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </article>
  );
}

const AI_CSS = `
.ai-card { position: relative; overflow: hidden; border-radius: 20px; background: #fff; border: 1px solid #ece3cf; outline: none;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  box-shadow: 0 1px 2px rgba(11,19,43,.04), 0 12px 32px -18px rgba(11,19,43,.18);
  transition: transform .6s cubic-bezier(.16,1,.3,1), box-shadow .6s, border-color .6s; }
.ai-card.is-active { transform: translateY(-4px); border-color: #e2cf9c; box-shadow: 0 1px 2px rgba(11,19,43,.04), 0 28px 50px -24px rgba(11,19,43,.3); }
.ai-card:focus-visible { box-shadow: 0 0 0 3px rgba(201,161,59,.45); }
.ai-visual { position: relative; height: 360px; overflow: hidden;
  background: radial-gradient(70% 70% at 55% 48%, #101a38 0%, #070b18 60%, #04060c 100%); }
.ai-visual canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.ai-bin { position: absolute; right: 18px; top: 18px; font: 600 10px/1 ui-monospace, Menlo, Consolas, monospace; letter-spacing: .14em; color: rgba(242,205,98,.38); }
.ai-hud { position: absolute; left: 20px; bottom: 18px; right: 120px; display: grid; gap: 5px; pointer-events: none; }
.ai-hud span { font: 700 11px/1 ui-monospace, Menlo, Consolas, monospace; letter-spacing: .16em; color: #f2cd62; }
.ai-hud b { font-size: 16px; font-weight: 600; color: #fff; letter-spacing: -.005em; }
.ai-hud small { font-size: 12px; color: rgba(232,236,245,.6); }
.ai-hud.in { animation: ai-in .7s cubic-bezier(.16,1,.3,1) both; }
@keyframes ai-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
.ai-dots { position: absolute; right: 20px; bottom: 22px; display: flex; gap: 6px; }
.ai-dots i { width: 14px; height: 3px; border-radius: 2px; background: rgba(255,255,255,.16); transition: background .5s; }
.ai-dots i.on { background: #f2cd62; }
.no-webgl .ai-visual canvas { display: none; }
.ai-body { padding: 26px 28px 8px; }
.ai-eyebrow { margin: 0 0 6px; font-size: 11.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #9a7414; }
.ai-title { margin: 0 0 10px; font-size: 23px; font-weight: 600; letter-spacing: -.01em; color: #0b1e4f; }
.ai-desc { margin: 0 0 16px; font-size: 14.5px; line-height: 1.65; color: #5b6474; }
.ai-list { list-style: none; margin: 0 0 20px; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 9px 18px; }
.ai-list li { position: relative; padding-left: 14px; font-size: 13.5px; font-weight: 500; color: #0b132b; }
.ai-list li::before { content: ""; position: absolute; left: 0; top: 50%; width: 5px; height: 5px; margin-top: -2.5px; border-radius: 50%; background: #c9a13b; }
.ai-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(0, 1fr)); gap: 10px; }
.ai-stat { padding: 12px 14px; border: 1px solid #efe1b8; border-radius: 10px; background: #fffaf0; }
.ai-stat b { display: block; font-size: 22px; font-weight: 700; color: #c9a13b; line-height: 1.1; }
.ai-stat span { font-size: 11.5px; color: #5b6474; }
.ai-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-top: 18px; padding: 14px 28px 18px; border-top: 1px solid #f1ead6; }
.ai-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.ai-tag { padding: 5px 11px; border-radius: 999px; border: 1px solid #ecd9a2; background: #fffaf0; font-size: 11.5px; font-weight: 600; color: #9a7414; }
.ai-explore { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: #c9a13b; text-decoration: none; }
.ai-explore svg { transition: transform .4s; }
.is-active .ai-explore svg { transform: translateX(4px); }
@media (max-width: 520px) { .ai-visual { height: 300px; } .ai-list { grid-template-columns: 1fr; } .ai-hud { right: 20px; bottom: 34px; } .ai-dots { left: 20px; right: auto; bottom: 16px; } }
@media (prefers-reduced-motion: reduce) { .ai-card { transition: none; } }
`;
