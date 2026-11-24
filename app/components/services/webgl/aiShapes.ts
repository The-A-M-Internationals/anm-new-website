/* AI particle target shapes — extracted verbatim from the original AI card */
export const N = 9000;

/* ---------- shapes (each returns N x [x, y, z, tag]) ---------- */
/* tags: 0 ivory (dim) · 1 gold · 2 amber · 3 gold + flowing · 4 ice */
export type Shape = Float32Array;
export function rng(seed: number) { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647); }
export function gauss(r: () => number) { return Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(6.2832 * r()); }

export function shapeCore(goldFrac: number): Shape {
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
export const ANOMALY = [1.18, 0.82, 0.12];
export function shapeML(): Shape {
  const r = rng(23), out = new Float32Array(N * 4);
  const C = [[-0.78, 0.32, 0.2, 1], [0.52, 0.5, -0.32, 4], [0.05, -0.52, 0.38, 1], [0.92, -0.32, 0.4, 4], [-0.5, -0.45, -0.4, 0]];
  for (let i = 0; i < N; i++) {
    if (i >= N - 80) { out.set([ANOMALY[0] + gauss(r) * 0.035, ANOMALY[1] + gauss(r) * 0.035, ANOMALY[2] + gauss(r) * 0.035, 2], i * 4); continue; }
    const c = C[i % C.length], sd = 0.16 + (i % 3) * 0.02;
    out.set([c[0] + gauss(r) * sd, c[1] + gauss(r) * sd * 0.8, c[2] + gauss(r) * sd, c[3]], i * 4);
  }
  return out;
}
export const LANES = [[0.42, -0.25], [0, 0], [-0.42, 0.25]], GATES = [-0.72, 0, 0.72];
export function shapeRPA(): Shape {
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
export function shapeText(text: string): Shape {
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
export function shapeEye(): Shape {
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
export function shapeGen(): Shape {
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
