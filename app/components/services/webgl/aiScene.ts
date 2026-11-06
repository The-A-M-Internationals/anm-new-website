/**
 * AI Automations "One AI, five capabilities" particle scene — standalone renderer.
 * 9,000 particles morph through five chapters (~32 s), then settle into the
 * always-on AI core. play() resumes, pause() freezes.
 */
import { P_VS, P_FS } from "./aiShader";
import { N, rng, shapeCore, shapeEye, shapeGen, shapeML, shapeRPA, shapeText, type Shape } from "./aiShapes";
import { drawAnnotations } from "./aiOverlay";
import { createDprGovernor, createLoop, createProgram, fitCanvas, getUniforms, prefersReducedMotion } from "./gl";
import { clamp01, fitDistance, lookAt, mul4, persp, smooth } from "./math";
import type { SceneCaption, SceneFactory } from "./types";

const CHAPTERS = [
  { key: "ml", idx: "01", title: "Machine Learning", line: "Learns patterns in your data · flags the anomaly" },
  { key: "rpa", idx: "02", title: "Robotic Process Automation", line: "Repetitive work flows through on its own" },
  { key: "nlp", idx: "03", title: "Natural Language Processing", line: "Understands and answers human language" },
  { key: "cv", idx: "04", title: "Computer Vision", line: "Sees, recognises and inspects" },
  { key: "gen", idx: "05", title: "Generative AI", line: "Creates new content, code and designs" },
];
const CH_START = 0.4, CH_LEN = 6.2, FINALE = CH_START + CHAPTERS.length * CH_LEN;
const REST: SceneCaption = { idx: "AI", title: "Intelligent Automation", line: "Five AI capabilities", done: false };
const DONE: SceneCaption = { idx: "24/7", title: "Powered by Artificial Intelligence", line: "One AI core · five capabilities · always on", done: true };
const FOV = 0.72;

export const createAiScene: SceneFactory = (canvas, overlay, { bias = 0, onCaption }) => {
  const gl = canvas.getContext("webgl2", { antialias: true, alpha: true, premultipliedAlpha: true });
  if (!gl) return null;
  const pr = createProgram(gl, P_VS, P_FS), U = getUniforms(gl, pr, ["uPV", "uRot", "uMix", "uTime", "uPx"]);
  const g = overlay?.getContext("2d") ?? null;

  const SH: Record<string, Shape> = {
    rest: shapeCore(0.12), ml: shapeML(), rpa: shapeRPA(), nlp: shapeText("How can I help?"),
    cv: shapeEye(), gen: shapeGen(), done: shapeCore(0.42),
  };
  const seeds = new Float32Array(N * 4);
  { const r = rng(5); for (let i = 0; i < N * 4; i++) seeds[i] = r(); }
  let A: Shape = SH.rest.slice(), B: Shape = SH.rest.slice();
  const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
  const bufs: WebGLBuffer[] = [];
  const mkBuf = (name: string, data: Float32Array, usage: number) => {
    const b = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, b); bufs.push(b);
    gl.bufferData(gl.ARRAY_BUFFER, data, usage); const l = gl.getAttribLocation(pr, name); gl.enableVertexAttribArray(l);
    gl.vertexAttribPointer(l, 4, gl.FLOAT, false, 0, 0); return b;
  };
  const bA = mkBuf("aA", A, gl.DYNAMIC_DRAW), bB = mkBuf("aB", B, gl.DYNAMIC_DRAW); mkBuf("aR", seeds, gl.STATIC_DRAW);
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE); gl.disable(gl.DEPTH_TEST);

  const reduce = prefersReducedMotion(), governor = createDprGovernor(1, 0.75, 0.125);
  const m = { x: 0, y: 0, tx: 0, ty: 0 };
  let T = reduce ? 60 : 0, time = 0, mixStart = -10, target = "rest", spin = 0, shown = "";

  const mixAt = () => (reduce ? 1 : clamp01((time - mixStart) / 1.8));
  /* snapshot the in-flight morph so a new target starts from where particles are now */
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

  const loop = createLoop((dt) => {
    if (!reduce) { time += dt; T += dt; }
    m.x += (m.tx - m.x) * 0.05; m.y += (m.ty - m.y) * 0.05;

    const ci = T < CH_START ? -1 : T < FINALE ? Math.floor((T - CH_START) / CH_LEN) : 99;
    const key = ci < 0 ? "rest" : ci === 99 ? "done" : CHAPTERS[ci].key;
    retarget(key);
    const cap: SceneCaption = ci < 0 ? REST : ci === 99 ? DONE : { ...CHAPTERS[ci], done: false };
    if (cap.title !== shown) { shown = cap.title; onCaption?.(cap); }

    const facing = key === "nlp" || key === "cv" || key === "rpa";
    spin += dt * (key === "rest" || key === "done" ? 0.22 : key === "gen" ? 0.35 : 0);
    if (facing || key === "ml") spin += (Math.round(spin / 6.2832) * 6.2832 - spin) * 0.06;
    const rot = spin + (facing ? Math.sin(time * 0.35) * 0.22 : key === "ml" ? Math.sin(time * 0.3) * 0.45 : 0) + m.x * 0.5;

    const { w, h, dpr, aspect } = fitCanvas(canvas, governor(dt), overlay);
    gl.viewport(0, 0, w, h); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    const dist = 3.8 * fitDistance(aspect, 1.15) - (key === "rest" ? 0 : 0.15);
    const s = aspect > 1.3 ? bias * 0.4 * dist * Math.tan(FOV / 2) * aspect : 0;
    const PV = mul4(persp(FOV, aspect, 0.1, 30), lookAt([m.x * 0.6 - s, 0.18 - m.y * 0.4, dist], [-s, 0.05, 0]));
    gl.uniformMatrix4fv(U.uPV, false, PV); gl.uniform1f(U.uRot, rot); gl.uniform1f(U.uMix, mixAt());
    gl.uniform1f(U.uTime, time); gl.uniform1f(U.uPx, h * 0.022);
    gl.drawArrays(gl.POINTS, 0, N);

    if (g) {
      const c0 = CH_START + ci * CH_LEN;
      const into = ci >= 0 && ci < 99 ? smooth(c0 + 1.9, c0 + 2.5, T) * (1 - smooth(c0 + CH_LEN - 0.5, c0 + CH_LEN, T)) : 0;
      drawAnnotations(g, { key, into, time, rot, PV, w, h, dpr });
    }
    return !reduce;
  });

  const ro = new ResizeObserver(() => loop.kick()); ro.observe(canvas);
  loop.kick();

  return {
    play: loop.play,
    pause: loop.pause,
    /* caller (gsap.quickTo) already eases the value, so apply it directly */
    setPointer(x, y) { m.tx = m.x = x; m.ty = m.y = y; loop.kick(); },
    destroy() {
      loop.stop(); ro.disconnect();
      bufs.forEach((b) => gl.deleteBuffer(b)); gl.deleteVertexArray(vao); gl.deleteProgram(pr);
    },
  };
};
