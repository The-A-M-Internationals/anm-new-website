"use client";

/**
 * Oracle EPM — "Group Consolidation" 3D card
 * ------------------------------------------------------------------
 * An architect's scale model: four entity towers (UAE · India · UK · USA) and
 * Group HQ on a black stone plinth among white context buildings. On hover it plays
 * a full ~28 s month-end close that never loops: entity ledgers reconcile (scan bands),
 * gold light consolidates into Group HQ, HQ fills floor by floor, a forecast tier
 * grows out of the roof, the crown and a light shaft go up, and a reporting wave rolls
 * back out to every entity. Afterwards the model stays lit and the camera orbits slowly.
 *
 * Single self-contained file. Rendered with a hand-written WebGL2 ray-marcher:
 * no Three.js, no libraries, React is the only import.
 *
 * Usage:   <OracleEpmCard3D />   or   <OracleEpmCard3D href="/services/oracle-epm" />
 */
import { useEffect, useRef } from "react";

/* ENGINE START */
const VS = `#version 300 es
in vec2 aP; void main(){ gl_Position = vec4(aP, 0.0, 1.0); }`;

const FS = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2 uRes; uniform vec3 uRo, uF, uRt, uUp; uniform float uFoc, uTime;
uniform vec4 uT[5];                 // tower: x, z, half-width, height (index 4 = Group HQ)
uniform float uSend, uLevel, uGrow, uCrown, uBeam, uWave, uRep;
uniform vec4 uScanE, uRecE, uPathE;   // per entity: scan band (0..1, <0 off), reconciled, path progress

const vec3 KEY = normalize(vec3(-0.55, 0.85, 0.30));
const vec3 WARM = vec3(1.0, 0.74, 0.43);
const vec3 GOLD = vec3(1.0, 0.70, 0.30);
const float CELL = 0.30;

float h21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float sdBox(vec3 p, vec3 b, float r){ vec3 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r; }
float sdCap(vec3 p, vec3 a, vec3 b, float r){ vec3 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * h) - r; }
float seg(vec2 p, vec2 a, vec2 b, out float t){ vec2 pa = p - a, ba = b - a; t = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0); return length(pa - ba * t); }

float hqTop(){ return uT[4].w + 0.36 * uGrow; }

vec2 map(vec3 p){
  /* plinth */
  vec2 r = vec2(sdBox(p - vec3(0.0, -0.09, 0.0), vec3(2.35, 0.09, 1.62), 0.02), 1.0);

  /* white context massing (architectural model) — domain repetition, excluded near towers + light paths */
  float dReg = sdBox(p - vec3(0.0, 0.13, 0.0), vec3(2.2, 0.13, 1.48), 0.0);
  if (dReg > 0.02) { r.x = min(r.x, dReg); }
  else {
    vec2 id = floor(p.xz / CELL), c = (id + 0.5) * CELL, q = p.xz - c;
    float keep = 1.0;
    for (int i = 0; i < 5; i++){ if (length(c - uT[i].xy) < uT[i].z * 1.35 + 0.26) keep = 0.0; }
    for (int i = 0; i < 4; i++){ float t; if (seg(c, uT[i].xy, uT[4].xy, t) < 0.17) keep = 0.0; }
    float bd = min(CELL * 0.5 - abs(q.x), CELL * 0.5 - abs(q.y)) + 0.01;
    if (keep > 0.5 && h21(id + 3.1) > 0.18) {
      float hx = 0.055 + 0.06 * h21(id), hz = 0.05 + 0.06 * h21(id + 7.7), hh = 0.03 + 0.15 * pow(h21(id + 1.3), 2.2);
      float d = sdBox(vec3(q.x, p.y - hh, q.y), vec3(hx, hh, hz), 0.004);
      if (d < r.x) r = vec2(d, 2.0);
    }
    r.x = min(r.x, max(bd, 0.004));
  }

  /* entity towers */
  for (int i = 0; i < 4; i++){
    vec4 T = uT[i]; vec3 q = p - vec3(T.x, 0.0, T.y);
    float pod = sdBox(q - vec3(0.0, 0.035, 0.0), vec3(T.z * 1.38, 0.035, T.z * 1.15), 0.006);
    if (pod < r.x) r = vec2(pod, 30.0);
    float sh = sdBox(q - vec3(0.0, T.w * 0.5, 0.0), vec3(T.z, T.w * 0.5, T.z * 0.8), 0.012);
    if (sh < r.x) r = vec2(sh, 10.0 + float(i));
    float cap = sdBox(q - vec3(0.0, T.w + 0.025, 0.0), vec3(T.z * 0.55, 0.025, T.z * 0.4), 0.004);
    if (cap < r.x) r = vec2(cap, 31.0);
  }

  /* Group HQ — three setbacks, crown, spire */
  vec4 H = uT[4]; vec3 q = p - vec3(H.x, 0.0, H.y);
  float pod = sdBox(q - vec3(0.0, 0.045, 0.0), vec3(H.z * 1.45, 0.045, H.z * 1.3), 0.008);
  if (pod < r.x) r = vec2(pod, 30.0);
  float h1 = H.w * 0.55, h2 = H.w * 0.82;
  float t1 = sdBox(q - vec3(0.0, h1 * 0.5, 0.0), vec3(H.z, h1 * 0.5, H.z * 0.86), 0.014);
  float t2 = sdBox(q - vec3(0.0, (h1 + h2) * 0.5, 0.0), vec3(H.z * 0.78, (h2 - h1) * 0.5, H.z * 0.68), 0.012);
  float t3 = sdBox(q - vec3(0.0, (h2 + H.w) * 0.5, 0.0), vec3(H.z * 0.56, (H.w - h2) * 0.5, H.z * 0.5), 0.01);
  float hq = min(t1, min(t2, t3));
  if (hq < r.x) r = vec2(hq, 14.0);
  /* forecast tier: grows out of the roof during Planning & Budgeting */
  float gH = 0.36 * uGrow, top = H.w + gH;
  if (uGrow > 0.002) {
    float t4 = sdBox(q - vec3(0.0, H.w + gH * 0.5, 0.0), vec3(H.z * 0.44, gH * 0.5, H.z * 0.4), 0.008);
    if (t4 < r.x) r = vec2(t4, 16.0);
  }
  float crown = sdBox(q - vec3(0.0, top + 0.04, 0.0), vec3(H.z * 0.42, 0.04, H.z * 0.36), 0.005);
  if (crown < r.x) r = vec2(crown, 15.0);
  float spire = sdCap(q, vec3(0.0, top + 0.08, 0.0), vec3(0.0, top + 0.42, 0.0), 0.009);
  if (spire < r.x) r = vec2(spire, 15.0);
  return r;
}

vec3 nrm(vec3 p){ const vec2 k = vec2(1, -1); float e = 0.0006;
  return normalize(k.xyy * map(p + k.xyy * e).x + k.yyx * map(p + k.yyx * e).x + k.yxy * map(p + k.yxy * e).x + k.xxx * map(p + k.xxx * e).x); }
float shadow(vec3 ro, vec3 rd){ float s = 1.0, t = 0.012;
  for (int i = 0; i < 56; i++){ float h = map(ro + rd * t).x; s = min(s, 10.0 * h / t); t += clamp(h, 0.008, 0.22); if (s < 0.002 || t > 6.0) break; }
  return clamp(s, 0.0, 1.0); }
float ao(vec3 p, vec3 n){ float o = 0.0, sc = 1.0;
  for (int i = 0; i < 5; i++){ float h = 0.012 + 0.1 * float(i) / 4.0; o += (h - map(p + n * h).x) * sc; sc *= 0.75; }
  return clamp(1.0 - 2.8 * o, 0.0, 1.0); }

/* dark photographic studio: large soft key, cool rim */
vec3 env(vec3 d){
  vec3 c = mix(vec3(0.008, 0.009, 0.012), vec3(0.04, 0.042, 0.05), smoothstep(-0.2, 0.9, d.y));
  c += vec3(1.0, 0.96, 0.9) * 2.6 * pow(max(dot(d, normalize(vec3(-0.5, 0.8, 0.32))), 0.0), 40.0);
  c += vec3(0.7, 0.8, 1.0) * 0.8 * pow(max(dot(d, normalize(vec3(0.85, 0.3, -0.45))), 0.0), 18.0);
  return c;
}

vec3 hqPos(){ return vec3(uT[4].x, uT[4].w * 0.55, uT[4].y); }

vec3 lit(vec3 p, vec3 n, vec3 rd, vec3 base, float rough, float metal, float sh, float oc){
  float dif = clamp(dot(n, KEY), 0.0, 1.0) * sh;
  vec3 h = normalize(KEY - rd); float gl = mix(220.0, 6.0, rough);
  float sp = pow(clamp(dot(n, h), 0.0, 1.0), gl) * sh * (gl + 8.0) / 70.0;
  float fr = 0.04 + 0.96 * pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 5.0);
  vec3 rf = env(reflect(rd, n)) * mix(1.0, 0.2, rough);
  vec3 F0 = mix(vec3(0.04), base, metal);
  vec3 spec = mix(F0, vec3(1.0), fr * (1.0 - metal));
  vec3 kd = base * (1.0 - metal);
  vec3 amb = mix(vec3(0.015, 0.016, 0.02), vec3(0.05, 0.052, 0.06), n.y * 0.5 + 0.5) * oc;
  /* warm bounce from Group HQ once it is lit */
  vec3 L = hqPos() - p; float dl = length(L);
  float hqLight = uLevel * clamp(dot(n, L / dl), 0.0, 1.0) / (1.0 + dl * dl * 5.0);
  return kd * (dif * vec3(1.0, 0.95, 0.88) * 2.3 + amb * 2.0 + WARM * hqLight * 1.6) + spec * (sp * 1.5 + rf * oc * (0.3 + 0.7 * metal));
}

/* glass curtain wall with floor plates, mullions, fins and lit interiors */
vec3 facade(vec3 p, vec3 n, vec3 rd, vec3 c0, float ti, float topH, float sh, float oc){
  vec3 q = p - c0;
  float u = abs(n.x) > 0.5 ? q.z : q.x;
  float fl = 0.034, fv = fract(p.y / fl);
  float mw = 0.026, fm = fract(u / mw + 0.5);
  float slab = 1.0 - smoothstep(0.08, 0.16, fv);
  float mull = 1.0 - smoothstep(0.04, 0.1, min(fm, 1.0 - fm) * 2.0);
  float fin = 1.0 - smoothstep(0.08, 0.16, min(fract(u / (mw * 4.0) + 0.5), 1.0 - fract(u / (mw * 4.0) + 0.5)) * 2.0);
  vec2 cell = vec2(floor(u / mw + 0.5), floor(p.y / fl));
  float rnd = h21(cell + ti * 17.3), rnd2 = h21(cell * 1.7 + ti * 3.1);
  float level = clamp(p.y / topH, 0.0, 1.0);
  float on;
  if (ti > 3.5) on = step(level, uLevel) * step(0.002, uLevel) * step(0.12, rnd) * (0.55 + 0.45 * rnd2);
  else {
    int ei = int(ti + 0.5); float band = uScanE[ei], bandY = band * topH;
    float below = step(0.0, band) * step(p.y, bandY);
    float rec = max(uRecE[ei], below);
    on = step(rnd, 0.08 + 0.1 * uSend + 0.17 * rec) * (0.45 + 0.55 * rnd2);
  }
  vec3 tint = mix(vec3(1.0, 0.74, 0.44), vec3(0.95, 0.93, 0.88), step(0.8, rnd2));
  vec3 interior = tint * on * (0.35 + 0.65 * (1.0 - fv)) * (ti > 3.5 ? 0.95 : 0.75);
  vec3 glass = lit(p, n, rd, vec3(0.008, 0.013, 0.02), 0.02, 0.0, sh, oc) * 1.5;
  vec3 frame = lit(p, n, rd, vec3(0.30, 0.31, 0.33), 0.32, 1.0, sh, oc);
  vec3 c = mix(glass + interior, frame, clamp(max(slab, max(mull * 0.6, fin)), 0.0, 1.0));
  if (ti < 3.5) { /* reconciliation scan band sweeping up the tower */
    int ei = int(ti + 0.5); float band = uScanE[ei];
    if (band >= 0.0 && band < 0.999) c += GOLD * (exp(-pow((p.y - band * topH) / 0.012, 2.0)) * 2.2 + exp(-pow((p.y - band * topH) / 0.06, 2.0)) * 0.25);
  }
  return c;
}

vec3 shade(vec3 p, vec3 rd, float m){
  vec3 n = nrm(p); float sh = shadow(p + n * 0.002, KEY), oc = ao(p, n);
  if (m < 1.5) {
    /* honed black granite plinth with brass inlay + engraved streets + light paths */
    float edge = max(abs(p.x) - 2.27, abs(p.z) - 1.54);
    if (n.y > 0.5 && edge > 0.0 && edge < 0.03) return lit(p, n, rd, vec3(0.78, 0.58, 0.30), 0.3, 1.0, sh, oc);
    vec3 base = vec3(0.022, 0.022, 0.025) * (0.92 + 0.16 * h21(floor(p.xz * 160.0)));
    vec3 c = lit(p, n, rd, base, 0.22, 0.0, sh, oc);
    if (n.y > 0.5) {
      vec2 g = abs(fract(p.xz / CELL) - 0.5);
      c *= 1.0 - 0.45 * (1.0 - smoothstep(0.0, 0.03, 0.5 - max(g.x, g.y)));
      vec2 hq = uT[4].xy; vec3 em = vec3(0.0);
      for (int i = 0; i < 4; i++){
        float t; float d = seg(p.xz, uT[i].xy, hq, t);
        float pr = uPathE[i];
        float on = smoothstep(pr + 0.02, pr - 0.03, t) * step(0.001, pr);
        float head = exp(-pow((t - pr) * 22.0, 2.0)) * step(0.001, pr) * (1.0 - step(0.999, pr));
        float core = exp(-d * d / 0.00009), glow = exp(-d * d / 0.01);
        float pulse = exp(-pow((t - fract(uTime * 0.38 + float(i) * 0.27)) * 10.0, 2.0)) * smoothstep(0.95, 1.0, pr) * uLevel;
        em += GOLD * (on * (core * 2.4 + glow * 0.35) + head * (core * 6.0 + glow * 1.2) + pulse * core * 3.5);
      }
      if (uWave > 0.0) { /* reporting wave rolling out from Group HQ to every entity */
        float dW = length(p.xz - hq);
        em += GOLD * (exp(-pow((dW - uWave) * 14.0, 2.0)) * 1.4 + exp(-pow((dW - uWave) * 4.0, 2.0)) * 0.12) * (1.0 - smoothstep(1.9, 2.7, uWave));
      }
      c += em;
    }
    return c;
  }
  if (m < 2.5) return lit(p, n, rd, vec3(0.58, 0.57, 0.55), 0.85, 0.0, sh, oc);          /* white model massing */
  if (m > 29.5 && m < 30.5) return lit(p, n, rd, vec3(0.86, 0.85, 0.82), 0.75, 0.0, sh, oc); /* podiums */
  if (m > 30.5) { /* entity roof caps — flash gold as the report reaches them */
    vec3 c = lit(p, n, rd, vec3(0.10, 0.10, 0.11), 0.5, 0.0, sh, oc);
    float dC = length(p.xz - uT[4].xy);
    float flash = uWave > 0.0 ? exp(-pow((dC - uWave) * 5.0, 2.0)) : 0.0;
    return c + GOLD * (flash * 1.4 + uRep * 0.45);
  }
  if (m > 15.5) { /* forecast tier: glass with glowing gold floor lines */
    float fv = fract(p.y / 0.034), u = abs(n.x) > 0.5 ? p.z : p.x, fm = fract(u / 0.026 + 0.5);
    float lines = (1.0 - smoothstep(0.06, 0.16, fv)) + 0.5 * (1.0 - smoothstep(0.04, 0.12, min(fm, 1.0 - fm) * 2.0));
    vec3 c = lit(p, n, rd, vec3(0.01, 0.014, 0.022), 0.03, 0.0, sh, oc) * 1.6;
    return c + GOLD * clamp(lines, 0.0, 1.0) * (0.55 + 0.25 * sin(uTime * 2.0 + p.y * 18.0)) + (n.y > 0.5 ? GOLD * 0.3 : vec3(0.0));
  }
  if (m > 14.5) { /* crown + spire: brushed brass, glowing gold when consolidated */
    vec3 c = lit(p, n, rd, vec3(0.76, 0.56, 0.28), 0.28, 1.0, sh, oc);
    return c + GOLD * uCrown * (0.9 + 0.25 * sin(uTime * 2.2));
  }
  if (n.y > 0.5) return lit(p, n, rd, vec3(0.08, 0.08, 0.09), 0.5, 0.0, sh, oc);         /* roofs */
  float ti = m - 10.0; int ii = int(ti + 0.5); vec4 T = uT[ii];
  return facade(p, n, rd, vec3(T.x, 0.0, T.y), ti, T.w, sh, oc);
}

void main(){
  vec2 uv = (2.0 * gl_FragCoord.xy - uRes) / uRes.y;
  vec3 rd = normalize(uF * uFoc + uRt * uv.x + uUp * uv.y), ro = uRo;
  vec3 col = env(rd) * 0.45;
  float t = 0.0; vec2 hit = vec2(1e9, 0.0);
  for (int i = 0; i < 140; i++){ hit = map(ro + rd * t); if (hit.x < 0.0004 * t || t > 18.0) break; t += hit.x; }
  float tg = rd.y < 0.0 ? (-0.18 - ro.y) / rd.y : 1e9;
  float tHit = min(t, tg);
  if (t < 18.0 && t < tg) col = shade(ro + rd * t, rd, hit.y);
  else if (tg < 1e8) {
    vec3 p = ro + rd * tg, n = vec3(0, 1, 0);
    vec3 c = lit(p, n, rd, vec3(0.018, 0.017, 0.017), 0.6, 0.0, shadow(p + n * 0.002, KEY), ao(p, n));
    col = mix(col, c, exp(-dot(p.xz, p.xz) * 0.1));
  }
  if (uBeam > 0.001) { /* light shaft from the spire — the group result going out */
    vec2 ax = uT[4].xy, d2 = rd.xz; float dd = dot(d2, d2);
    float sB = dd > 1e-5 ? dot(ax - ro.xz, d2) / dd : 0.0;
    float y0 = hqTop() + 0.42, yB = ro.y + rd.y * sB;
    float dB = length(ro.xz + d2 * sB - ax);
    if (sB > 0.0 && sB < tHit && yB > y0)
      col += GOLD * uBeam * (exp(-dB * dB / 0.00025) * 1.6 + exp(-dB * dB / 0.006) * 0.3) * exp(-(yB - y0) * 0.35);
  }
  col *= 1.1;
  col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);   /* ACES filmic */
  col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));
  vec2 q = gl_FragCoord.xy / uRes; col *= 0.5 + 0.5 * pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), 0.2);
  col += (h21(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;
  o = vec4(col, 1.0);
}`;

const TOWERS = [
  [-1.42, -0.86, 0.17, 0.98], // UAE
  [1.46, -0.8, 0.16, 0.78],   // India
  [-1.32, 0.92, 0.15, 0.7],   // UK
  [1.36, 0.96, 0.18, 1.12],   // USA
  [0.0, 0.0, 0.26, 1.62],     // Group HQ
];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, x: number) => { const t = clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const nz = (v: number[]) => { const l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; };
const cr = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

/* ---------- story timeline (seconds after hover) — a full month-end close, ~28 s, never loops ---------- */
const span = (T: number, a: number, b: number) => smooth(a, b, T);
const STEPS: [number, string][] = [
  [0, "Entity books · UAE · India · UK · USA"],
  [3, "Reconciling entity ledgers"],
  [9, "Consolidating to group"],
  [13.5, "Group view coming together"],
  [18.5, "Planning & forecast"],
  [21.5, "Board reporting"],
  [27, "Month-end close complete"],
];
const REST_STEP = "Hover to run the month-end close";
/* camera keyframes: [time, yaw, pitch, dist, targetY] */
const CAM_KEYS: number[][] = [
  [0, 0.66, 0.52, 6.5, 0.66],
  [3, 0.42, 0.46, 5.7, 0.5],
  [9, 0.92, 0.66, 6.2, 0.45],
  [14, 1.32, 0.38, 5.3, 0.86],
  [19, 1.62, 0.3, 5.9, 1.1],
  [23, 1.95, 0.5, 6.8, 0.95],
  [28, 2.15, 0.48, 6.6, 0.8],
];
function camAt(T: number) {
  let k = 1; while (k < CAM_KEYS.length - 1 && CAM_KEYS[k][0] < T) k++;
  const A = CAM_KEYS[k - 1], B = CAM_KEYS[k], f = inOut(clamp01((T - A[0]) / (B[0] - A[0])));
  const c = A.map((v, n) => v + (B[n] - v) * f);
  if (T > 28) c[1] += (T - 28) * 0.035; /* settle into a slow endless orbit */
  return c;
}

export function initEpmCard(card: HTMLElement): () => void {
  const canvas = card.querySelector("canvas") as HTMLCanvasElement;
  const stepEl = card.querySelector("[data-step]") as HTMLElement | null;
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "high-performance" });
  if (!gl) { card.classList.add("no-webgl"); return () => {}; }
  const mk = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(String(gl.getShaderInfoLog(s))); return s; };
  const pr = gl.createProgram()!;
  gl.attachShader(pr, mk(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, mk(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr); gl.useProgram(pr);
  const U: Record<string, WebGLUniformLocation | null> = {};
  ["uRes", "uRo", "uF", "uRt", "uUp", "uFoc", "uTime", "uT", "uSend", "uLevel", "uGrow", "uCrown", "uBeam", "uWave", "uRep",
    "uScanE", "uRecE", "uPathE"].forEach((n) => (U[n] = gl.getUniformLocation(pr, n)));
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, "aP"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  gl.uniform4fv(U.uT, new Float32Array(TOWERS.flat()));

  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let T = 0, fade = 0, goal = 0, time = 0, last = 0, raf = 0, visible = true, slow = 0, step = "";
  let dprCap = typeof window !== "undefined" ? ((window as unknown as { __EPM_DPR?: number }).__EPM_DPR || 1.25) : 1.25;
  const m = { x: 0, y: 0, tx: 0, ty: 0 };
  const setStep = (txt: string) => {
    if (!stepEl || txt === step) return; step = txt;
    stepEl.classList.remove("in"); void stepEl.offsetWidth; stepEl.textContent = txt; stepEl.classList.add("in");
  };

  const frame = (now: number) => {
    const dt = Math.min(0.1, (now - (last || now)) / 1000); last = now;
    if (!reduce) time += dt;
    if (goal) { T += reduce ? 40 : dt; fade = reduce ? 1 : Math.min(1, fade + dt / 0.8); }
    else { fade = reduce ? 0 : Math.max(0, fade - dt / 1.4); if (fade === 0) T = 0; }
    m.x += (m.tx - m.x) * 0.05; m.y += (m.ty - m.y) * 0.05;
    if (dt > 0.03) slow++; else slow = Math.max(0, slow - 1);
    if (slow > 20 && dprCap > 0.7) { dprCap -= 0.15; slow = 0; }

    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(dprCap, window.devicePixelRatio || 1);
    const w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    gl.viewport(0, 0, w, h);

    /* camera: rest pose blended with the story camera */
    const rest = CAM_KEYS[0], story = camAt(T), k = inOut(fade);
    const cv = rest.map((v, n) => v + (story[n] - v) * k);
    const narrow = r.width < 480 ? 1.28 : 1;
    const yaw = cv[1] + m.x * 0.4, pitch = cv[2] - m.y * 0.1, dist = cv[3] * narrow, tgt = [0, cv[4], 0.05];
    const eye = [tgt[0] + Math.sin(yaw) * Math.cos(pitch) * dist, tgt[1] + Math.sin(pitch) * dist, tgt[2] + Math.cos(yaw) * Math.cos(pitch) * dist];
    const f = nz([tgt[0] - eye[0], tgt[1] - eye[1], tgt[2] - eye[2]]), rt = nz(cr(f, [0, 1, 0])), up = cr(rt, f);
    gl.uniform2f(U.uRes, w, h); gl.uniform3fv(U.uRo, eye); gl.uniform3fv(U.uF, f); gl.uniform3fv(U.uRt, rt); gl.uniform3fv(U.uUp, up);
    gl.uniform1f(U.uFoc, 1 / Math.tan(0.5 / 2)); gl.uniform1f(U.uTime, time);

    /* ---- story beats ---- */
    const scan = [0, 1, 2, 3].map((i) => { const a = 3 + i * 1.45; return T > a && T < a + 1.7 && fade > 0.99 ? (T - a) / 1.7 : -1; });
    const rec = [0, 1, 2, 3].map((i) => span(T, 3 + i * 1.45 + 1.5, 3 + i * 1.45 + 1.8) * fade);
    const path = [0, 1, 2, 3].map((i) => span(T, 9 + i * 0.9, 9 + i * 0.9 + 2.1) * fade);
    const waveT = T - 23.5, wave = fade > 0.99 && waveT > 0 ? (waveT < 5 ? waveT * 0.55 : ((waveT - 5) % 8) * 0.55) : -1;
    gl.uniform1f(U.uSend, span(T, 0, 2.5) * fade);
    gl.uniform4fv(U.uScanE, scan); gl.uniform4fv(U.uRecE, rec); gl.uniform4fv(U.uPathE, path);
    gl.uniform1f(U.uLevel, span(T, 13.5, 18.5) * 1.02 * fade);
    gl.uniform1f(U.uGrow, span(T, 18.5, 21.5) * fade);
    gl.uniform1f(U.uCrown, span(T, 21.5, 23) * fade);
    gl.uniform1f(U.uBeam, span(T, 22, 24.5) * fade);
    gl.uniform1f(U.uWave, wave);
    gl.uniform1f(U.uRep, span(T, 25, 27) * fade);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    let label = REST_STEP;
    if (goal || fade > 0.5) for (const [at, txt] of STEPS) if (T >= at) label = txt;
    setStep(label);
    card.classList.toggle("is-done", T > 27 && fade > 0.99);

    const moving = Math.abs(m.tx - m.x) + Math.abs(m.ty - m.y) > 0.0005;
    raf = visible && (goal === 1 || fade > 0 || moving) ? requestAnimationFrame(frame) : 0;
  };
  const start = () => { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
  io.observe(canvas); start();
  const ro = new ResizeObserver(() => start()); ro.observe(canvas);

  let lastPointer = "mouse";
  const on = () => { if (card.classList.contains("is-active")) return; card.classList.add("is-active"); goal = 1; start(); };
  const off = () => { card.classList.remove("is-active"); goal = 0; m.tx = 0; m.ty = 0; start(); };
  const ev: [string, EventListener][] = [
    ["pointerdown", ((e: PointerEvent) => { lastPointer = e.pointerType; }) as EventListener],
    ["pointerenter", ((e: PointerEvent) => { lastPointer = e.pointerType; if (e.pointerType !== "touch") on(); }) as EventListener],
    ["pointerleave", ((e: PointerEvent) => { if (e.pointerType !== "touch") off(); }) as EventListener],
    ["pointermove", ((e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = canvas.getBoundingClientRect();
      m.tx = clamp01((e.clientX - r.left) / r.width) - 0.5;
      m.ty = clamp01((e.clientY - r.top) / r.height) - 0.5;
      start();
    }) as EventListener],
    ["click", (() => {
      if (lastPointer === "touch") {
        if (card.classList.contains("is-active")) off(); else on();
      }
    }) as EventListener],
    ["focus", (() => { if (lastPointer !== "touch") on(); }) as EventListener],
    ["blur", off as EventListener],
  ];
  ev.forEach(([n, fn]) => card.addEventListener(n, fn));
  return () => { cancelAnimationFrame(raf); raf = 0; visible = false; io.disconnect(); ro.disconnect();
    ev.forEach(([n, fn]) => card.removeEventListener(n, fn)); };
}
/* ENGINE END */

export default function OracleEpmCard3D({
  href = "/services/oracle-epm",
  eyebrow = "Financial Transformation",
  title = "Oracle EPM Solutions",
  desc = "Enterprise performance management unifying planning, consolidation and reporting across your organisation.",
  list = ["Planning & Budgeting", "Financial Consolidation", "Account Reconciliation", "Managed Services"],
  stats = [
    { num: "40%", label: "faster close" },
    { num: "150+", label: "implementations" },
  ],
  tags = ["Oracle EPM", "EPM Cloud"],
  explore = "Explore",
}: {
  href?: string;
  eyebrow?: string;
  title?: string;
  desc?: string;
  list?: string[];
  stats?: { num: string; label: string }[];
  tags?: string[];
  explore?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) return initEpmCard(ref.current);
  }, []);

  return (
    <article ref={ref} className="epm-card" tabIndex={0} aria-label={title}>
      <style>{CSS}</style>
      <div className="epm-visual">
        <canvas aria-hidden="true" />
        <div className="epm-step in" data-step aria-live="polite">Hover to run the month-end close</div>
      </div>
      <div className="epm-body">
        <p className="epm-eyebrow">{eyebrow}</p>
        <h3 className="epm-title">{title}</h3>
        <p className="epm-desc">{desc}</p>
        <ul className="epm-list">
          {list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <div className="epm-stats">
          {stats.map((s, i) => (
            <div key={i} className="epm-stat"><b>{s.num}</b><span>{s.label}</span></div>
          ))}
        </div>
      </div>
      <div className="epm-foot">
        <div className="epm-tags">
          {tags.map((t, i) => (
            <span key={i} className="epm-tag">{t}</span>
          ))}
        </div>
        <a className="epm-explore" href={href}>
          {explore}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </article>
  );
}

const CSS = `
.epm-card { position: relative; overflow: hidden; border-radius: 20px; background: #fff; border: 1px solid #ece3cf; outline: none;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  box-shadow: 0 1px 2px rgba(11,19,43,.04), 0 12px 32px -18px rgba(11,19,43,.18);
  transition: transform .6s cubic-bezier(.16,1,.3,1), box-shadow .6s, border-color .6s; }
.epm-card.is-active { transform: translateY(-4px); border-color: #e2cf9c; box-shadow: 0 1px 2px rgba(11,19,43,.04), 0 28px 50px -24px rgba(11,19,43,.3); }
.epm-card:focus-visible { box-shadow: 0 0 0 3px rgba(201,161,59,.45); }
.epm-visual { position: relative; height: 360px; background: #08090c; }
.epm-visual canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.no-webgl .epm-visual { background: radial-gradient(80% 70% at 50% 60%, #1a1d26, #08090c); }
.epm-step { position: absolute; left: 20px; bottom: 16px; font: 500 11px/1 Inter, system-ui, sans-serif; letter-spacing: .1em;
  text-transform: uppercase; color: rgba(255,255,255,.5); }
.epm-step.in { animation: epm-step .7s cubic-bezier(.16,1,.3,1) both; }
.is-done .epm-step { color: #e7c873; }
@keyframes epm-step { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.epm-body { padding: 26px 28px 8px; }
.epm-eyebrow { margin: 0 0 6px; font-size: 11.5px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #9a7414; }
.epm-title { margin: 0 0 10px; font-size: 23px; font-weight: 600; letter-spacing: -.01em; color: #0b1e4f; }
.epm-desc { margin: 0 0 16px; font-size: 14.5px; line-height: 1.65; color: #5b6474; }
.epm-list { list-style: none; margin: 0 0 20px; padding: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 9px 18px; }
.epm-list li { position: relative; padding-left: 14px; font-size: 13.5px; font-weight: 500; color: #0b132b; }
.epm-list li::before { content: ""; position: absolute; left: 0; top: 50%; width: 5px; height: 5px; margin-top: -2.5px; border-radius: 50%; background: #c9a13b; }
.epm-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.epm-stat { padding: 12px 14px; border: 1px solid #efe1b8; border-radius: 10px; background: #fffaf0; }
.epm-stat b { display: block; font-size: 22px; font-weight: 700; color: #c9a13b; line-height: 1.1; }
.epm-stat span { font-size: 11.5px; color: #5b6474; }
.epm-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 18px; padding: 14px 28px 18px; border-top: 1px solid #f1ead6; }
.epm-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.epm-tag { padding: 5px 11px; border-radius: 999px; border: 1px solid #ecd9a2; background: #fffaf0; font-size: 11.5px; font-weight: 600; color: #9a7414; }
.epm-explore { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; color: #c9a13b; text-decoration: none; }
.epm-explore svg { transition: transform .4s; }
.is-active .epm-explore svg { transform: translateX(4px); }
@media (max-width: 520px) { .epm-visual { height: 300px; } .epm-list { grid-template-columns: 1fr; }  }
@media (prefers-reduced-motion: reduce) { .epm-card { transition: none; } }
`;
