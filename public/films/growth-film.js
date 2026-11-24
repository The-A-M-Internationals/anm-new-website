/*
 * Professional Growth film (Careers page, the navy benefits tile).
 * Eight short 3D scenes with chess pieces: joining, part of the team, training, mentoring, leading the
 * room, rewarded, promotion, now you lead. The camera pushes into one object and comes out of the
 * next, and the last frame of each scene dissolves into the first frame of the following one.
 * Plain script (not bundled): GrowthFilm.tsx loads three.js r128 from /vendor/three-r128 and then this
 * file, only when the tile is on screen, and calls AnmGrowthFilm(container, { onStage }).
 * It pauses itself whenever the tile is off screen.
 */
window.AnmGrowthFilm = function (tile, opts) {
  opts = opts || {};

    if (!window.THREE) return null;
  const T = THREE, V = (x, y, z) => new T.Vector3(x, y, z), PI = Math.PI;
  const c01 = (x) => Math.min(1, Math.max(0, x)), seg = (u, a, b) => c01((u - a) / (b - a));
  const eo = (x) => 1 - Math.pow(1 - x, 3), eio = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2), ei = (x) => x * x * x;
  const lerp = (a, b, k) => a + (b - a) * k;

  // ---------- renderer, look ----------
  const renderer = new T.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  renderer.outputEncoding = T.sRGBEncoding; renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.82;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block"; tile.prepend(renderer.domElement);
  const scene = new T.Scene(); scene.background = new T.Color(0x050e30); scene.fog = new T.Fog(0x050e30, 14, 48);
  if (T.RoomEnvironment) scene.environment = new T.PMREMGenerator(renderer).fromScene(new T.RoomEnvironment(), 0.04).texture;
  const camera = new T.PerspectiveCamera(34, 2, 0.1, 200);

  const M = {
    gold: new T.MeshStandardMaterial({ color: 0xd2a136, metalness: 1, roughness: 0.24, envMapIntensity: 1.15 }),
    goldSoft: new T.MeshStandardMaterial({ color: 0xb98a2c, metalness: 1, roughness: 0.45, envMapIntensity: 1 }),
    navy: new T.MeshStandardMaterial({ color: 0x07134a, metalness: 0.6, roughness: 0.28, envMapIntensity: 0.55 }),
    dark: new T.MeshStandardMaterial({ color: 0x050b2a, metalness: 0.3, roughness: 0.6, envMapIntensity: 0.3 }),
    white: new T.MeshStandardMaterial({ color: 0xaeb4c4, metalness: 0.95, roughness: 0.3, envMapIntensity: 0.9 }),
    track: new T.MeshStandardMaterial({ color: 0x16245f, metalness: 0.2, roughness: 0.55, envMapIntensity: 0.4 }),
    glow: new T.MeshStandardMaterial({ color: 0xc9b07a, metalness: 0.35, roughness: 0.5, envMapIntensity: 0.6 }),
    glowSoft: new T.MeshStandardMaterial({ color: 0xa8873a, metalness: 0.6, roughness: 0.5, envMapIntensity: 0.6 }),
    sun: new T.MeshBasicMaterial({ color: 0xb8964a, fog: false }),
    paper: new T.MeshStandardMaterial({ color: 0xcfcbc0, metalness: 0, roughness: 0.5, envMapIntensity: 0.4 }),
    floor: new T.MeshStandardMaterial({ color: 0x060d30, metalness: 0.15, roughness: 0.82, envMapIntensity: 0.08 }),
  };
  const sh = (m) => { m.castShadow = true; m.receiveShadow = true; return m; };
  const mesh = (g, mat, x = 0, y = 0, z = 0) => { const m = sh(new T.Mesh(g, mat)); m.position.set(x, y, z); return m; };
  // rounded slab: w x h face, depth d, bevelled edges
  const rbox = (w, h, d, r = 0.08) => { const s = new T.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r); s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r); s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    const b = Math.min(0.03, d / 4), g = new T.ExtrudeGeometry(s, { depth: d - 2 * b, bevelEnabled: true, bevelSize: b, bevelThickness: b, bevelSegments: 3, curveSegments: 8 }); g.translate(0, 0, -(d - 2 * b) / 2); return g; };
  const PAWN = new T.LatheGeometry([[0, 0], [0.44, 0], [0.47, 0.07], [0.4, 0.16], [0.27, 0.55], [0.2, 0.96], [0.3, 1.04], [0.24, 1.12], [0, 1.14]].map(([x, y]) => new T.Vector2(x, y)), 40);
  const HEAD = new T.SphereGeometry(0.29, 40, 28);
  const pawn = (mat, s = 1) => { const g = new T.Group(); g.add(mesh(PAWN, mat), mesh(HEAD, mat, 0, 1.4, 0)); g.scale.setScalar(s); return g; };
  const hop = (k, n = 5, h = 0.14) => Math.abs(Math.sin(k * PI * n)) * h;

  const floor = new T.Mesh(new T.PlaneGeometry(900, 200), M.floor); floor.rotation.x = -PI / 2; floor.receiveShadow = true; floor.position.x = 160; scene.add(floor);
  const key = new T.DirectionalLight(0xfff1dc, 1.15); key.castShadow = true; key.shadow.mapSize.set(1024, 1024); key.shadow.bias = -0.0005;
  Object.assign(key.shadow.camera, { left: -13, right: 13, top: 13, bottom: -13, near: 1, far: 50 }); scene.add(key, key.target);
  const rim = new T.PointLight(0xe2c074, 0.8, 26, 2); scene.add(rim); scene.add(new T.HemisphereLight(0x6f86e8, 0x05081c, 0.18));

  // ---------- the nine scenes ----------
  const GAP = 40, S = [], CIRCLE = 1.75;
  const add = (def) => { const g = new T.Group(); g.position.x = S.length * GAP; scene.add(g); S.push({ g, ...def(g) }); };
  const at = (g, v) => v.clone().add(g.position);

  // a doorway whose door swings on its hinge: call the returned function with 0 (shut) to 1 (open)
  const doorway = (g) => {
    g.add(mesh(rbox(0.34, 4.3, 0.5), M.gold, -1.3, 2.15, -1), mesh(rbox(0.34, 4.3, 0.5), M.gold, 1.3, 2.15, -1), mesh(rbox(2.94, 0.34, 0.5), M.gold, 0, 4.3, -1));
    const hinge = new T.Group(); hinge.position.set(-1.13, 0, -1.05);
    const leaf = sh(new T.Mesh(new T.BoxGeometry(2.26, 4.0, 0.1), M.goldSoft)); leaf.position.set(1.13, 2.0, 0);
    hinge.add(leaf, mesh(new T.SphereGeometry(0.09, 20, 14), M.gold, 1.95, 2.0, 0.1)); g.add(hinge);
    return (open) => { hinge.rotation.y = 1.3 * open; };
  };
  add((g) => { // 1 joining: someone opens the door for you
    const swing = doorway(g), host = pawn(M.navy, 1.15); host.position.set(2.55, 0, -0.1); g.add(host);
    const hero = pawn(M.gold); g.add(hero);
    return { cap: "Joining", wide: [V(4.6, 2.3, 10.5), V(0, 1.75, 0)], out: () => ({ p: V(0, 2.0, -1.05), size: 4.0, dir: V(0, 0, 1) }),
      update(u) { swing(eio(seg(u, 0.08, 0.34)));   // opened for you, and it stays open
        const k = eo(seg(u, 0.05, 0.7)); hero.position.set(0, hop(k, 6), 5.4 - 7.6 * k); host.position.y = hop(seg(u, 0.06, 0.3), 2, 0.16); } };
  });
  add((g) => { // 2 employee
    const card = new T.Group(); card.position.set(0, 2.0, -1.05); g.add(card);
    card.add(mesh(rbox(2.26, 4.0, 0.12, 0.16), M.paper), mesh(rbox(2.26, 0.9, 0.14, 0.16), M.gold, 0, 1.55, 0.005), mesh(new T.CylinderGeometry(0.56, 0.56, 0.06, 48).rotateX(PI / 2), M.navy, 0, 0.35, 0.08),
      mesh(new T.SphereGeometry(0.18, 24, 16), M.gold, 0, 0.47, 0.13), mesh(new T.SphereGeometry(0.3, 24, 16, 0, PI * 2, 0, PI / 2).scale(1, 0.75, 0.5), M.gold, 0, 0.06, 0.1),
      mesh(rbox(1.5, 0.16, 0.04, 0.07), M.navy, 0, -0.62, 0.07), mesh(rbox(1.1, 0.11, 0.04, 0.05), M.track, 0, -0.95, 0.07), mesh(rbox(1.3, 0.11, 0.04, 0.05), M.track, 0, -1.2, 0.07), mesh(rbox(0.7, 0.22, 0.05, 0.1), M.gold, 0, -1.6, 0.07),
      mesh(rbox(0.5, 0.2, 0.2, 0.06), M.gold, 0, 2.06, 0));
    [-1, 1].forEach((s) => { const strap = mesh(rbox(0.1, 5, 0.03, 0.03), M.goldSoft, s * 0.11, 4.5, 0); strap.rotation.z = -s * 0.035; card.add(strap); });
    const hero = pawn(M.gold); hero.position.set(2.9, 0, 1.6); g.add(hero);
    const f = () => ({ p: V(0, 2.0, -1.05), size: 4.0, dir: V(0, 0, 1) });
    return { cap: "Part of the team", wide: [V(5, 2.5, 10.5), V(0.7, 1.9, 0)], in: f, out: f,
      update(u, t) { const sw = Math.sin(seg(u, 0.14, 0.8) * PI); card.rotation.y = Math.sin(t * 1.6) * 0.42 * sw; card.rotation.z = Math.sin(t * 2.1) * 0.05 * sw; hero.position.y = hop(seg(u, 0.3, 0.7), 3, 0.3); } };
  });
  add((g) => { // 3 training
    const slab = new T.Group(); slab.position.set(0, 2.0, -1.05); g.add(slab);
    slab.add(mesh(rbox(2.26, 4.0, 0.14, 0.16), M.navy));
    const ring = []; for (let i = 0; i < 44; i++) { const a = PI / 2 - (i / 44) * PI * 2, m = mesh(rbox(0.07, 0.19, 0.05, 0.03), M.track, Math.cos(a) * 0.62, 1.05 + Math.sin(a) * 0.62, 0.08); m.rotation.z = a - PI / 2; slab.add(m); ring.push(m); }
    const fills = [0, 1, 2, 3].map((i) => { slab.add(mesh(rbox(1.66, 0.16, 0.04, 0.07), M.track, 0, -0.25 - i * 0.42, 0.07)); const f = mesh(rbox(1.66, 0.16, 0.05, 0.07), M.glow, -0.83, -0.25 - i * 0.42, 0.085); f.geometry.translate(0.83, 0, 0); slab.add(f); return f; });
    const cubes = [0, 1, 2].map((i) => { const c = mesh(rbox(0.62, 0.62, 0.62, 0.1), i === 1 ? M.gold : M.white, 2.4 + i * 0.5, 0.4, 0.6 - i * 0.9); g.add(c); return c; });
    const hero = pawn(M.gold); hero.position.set(-2.5, 0, 1.7); g.add(hero);
    return { cap: "Training", wide: [V(4.8, 2.6, 10.2), V(0.2, 1.9, 0)], in: () => ({ p: V(0, 2.0, -1.05), size: 4.0, dir: V(0, 0, 1) }), out: () => ({ p: V(0, 3.05, -0.97), size: 1.24 * CIRCLE, dir: V(0, 0, 1) }),
      update(u, t) { fills.forEach((f, i) => f.scale.x = Math.max(0.001, eo(seg(u, 0.16 + i * 0.12, 0.42 + i * 0.12))));
        const lit = Math.floor(44 * seg(u, 0.18, 0.78)); ring.forEach((m, i) => m.material = i < lit ? M.glow : M.track);
        cubes.forEach((c, i) => { const k = eo(seg(u, 0.22 + i * 0.14, 0.6 + i * 0.14)); c.position.y = 0.4 + k * (1.0 + i * 0.75); c.rotation.set(t * 0.5 + i, t * 0.7, 0); }); hero.position.y = hop(seg(u, 0.6, 0.8), 2, 0.2); } };
  });
  add((g) => { // 4 mentoring
    const mentor = pawn(M.navy, 1.32); mentor.position.set(-1.7, 0, 0); mentor.add(mesh(new T.TorusGeometry(0.235, 0.045, 16, 48).rotateX(PI / 2), M.gold, 0, 1.02, 0)); g.add(mentor);
    const hero = pawn(M.gold); hero.position.set(1.7, 0, 0); g.add(hero);
    const orb = new T.Mesh(new T.SphereGeometry(0.45, 40, 28), M.glow); g.add(orb); const light = new T.PointLight(0xe2c074, 0.5, 8, 2); orb.add(light);
    const trail = Array.from({ length: 16 }, (_, i) => { const m = new T.Mesh(new T.SphereGeometry(0.13 - i * 0.006, 12, 8), M.glowSoft); g.add(m); return m; });
    g.add(mesh(new T.TorusGeometry(3.1, 0.03, 8, 120).rotateX(PI / 2), M.glowSoft, 0, 0.03, 0));
    const A = V(0, 3.05, 0.4), Bm = V(-1.7, 2.75, 0), C = V(1.7, 2.35, 0), D = V(1.7, 2.75, 0), pos = (u) => {
      if (u < 0.22) return A.clone().lerp(Bm, eio(u / 0.22));
      if (u < 0.62) { const k = eio(seg(u, 0.26, 0.62)); return Bm.clone().lerp(C, k).add(V(0, Math.sin(k * PI) * 1.5, Math.sin(k * PI) * 0.8)); }
      return C.clone().lerp(D, eo(seg(u, 0.62, 0.8))); };
    return { cap: "Mentoring", wide: [V(4.6, 2.7, 10.2), V(0, 1.7, 0)], in: () => ({ p: A, size: 0.9 * CIRCLE, dir: V(0, 0, 1) }), out: () => ({ p: D, size: 0.9 * CIRCLE, dir: V(0, 0, 1) }),
      update(u) { orb.position.copy(pos(u)); trail.forEach((m, i) => { m.position.copy(pos(Math.max(0, u - (i + 1) * 0.012))); m.visible = u > 0.24 && u < 0.7; });
        hero.scale.setScalar(1 + 0.2 * eo(seg(u, 0.6, 0.82))); mentor.rotation.z = -0.06 * Math.sin(seg(u, 0.2, 0.5) * PI); } };
  });
  add((g) => { // 6 presenting
    g.add(mesh(new T.CylinderGeometry(1.6, 1.6, 0.14, 72), M.navy, 0, 0.98, 0), mesh(new T.TorusGeometry(1.6, 0.05, 16, 72).rotateX(PI / 2), M.gold, 0, 1.05, 0), mesh(new T.CylinderGeometry(0.2, 0.5, 0.92, 32), M.dark, 0, 0.46, 0));
    const team = Array.from({ length: 7 }, (_, i) => { const a = (i / 7) * PI * 2, p = pawn(M.white, 0.82); p.position.set(Math.cos(a) * 2.5, 0, Math.sin(a) * 2.5); g.add(p); return p; });
    g.add(mesh(rbox(5.6, 3.5, 0.14, 0.14), M.dark, 0, 2.95, -4.1));
    const H = [0.7, 1.1, 1.5, 2.0, 2.5], bars = H.map((h, i) => { const b = mesh(rbox(0.6, h, 0.6, 0.06), M.gold, -1.6 + i * 0.8, 1.5, -3.75); b.geometry.translate(0, h / 2, 0); g.add(b); return b; });
    const hero = pawn(M.gold, 1.2); hero.position.set(3.5, 0, -3.1); g.add(hero);
    return { cap: "Leading the room", wide: [V(5.2, 3.3, 9.4), V(0, 1.9, -1.9)], in: () => ({ p: V(0, 1.06, 0), size: 3.2 * CIRCLE, dir: V(0, 1, 0.02) }), out: () => ({ p: V(0, 2.75, -3.75), size: 4.7, dir: V(0, 0, 1) }),
      update(u, t) { bars.forEach((b, i) => b.scale.y = Math.max(0.001, eo(seg(u, 0.26 + i * 0.07, 0.6 + i * 0.07)))); team.forEach((p, i) => p.position.y = Math.max(0, Math.sin(t * 5 + i * 1.7)) * 0.1 * seg(u, 0.55, 0.7)); hero.position.y = hop(seg(u, 0.3, 0.7), 2, 0.18); } };
  });
  add((g) => { // 7 salary
    g.add(mesh(rbox(5.6, 3.5, 0.14, 0.14), M.dark, 0, 2.95, -4.1), mesh(rbox(4.6, 0.16, 1.1, 0.06), M.navy, 0, 1.42, -3.75));
    const H = [2, 4, 6, 8, 11], BH = 0.215, CG = new T.BoxGeometry(0.7, BH - 0.015, 0.42), coins = [];
    const paint = (w, h, draw) => { const c = document.createElement("canvas"); c.width = w; c.height = h; draw(c.getContext("2d")); const t = new T.CanvasTexture(c); t.encoding = T.sRGBEncoding; t.anisotropy = 8; return new T.MeshStandardMaterial({ map: t, roughness: 0.62, metalness: 0 }); };
    // the long edge of a bundle: the cut paper, wrapped by a gold band that carries the "$"
    const edge = paint(512, 152, (c) => { c.fillStyle = "#d6d0bf"; c.fillRect(0, 0, 512, 152); c.fillStyle = "rgba(7,19,74,.16)"; for (let y = 8; y < 152; y += 9) c.fillRect(0, y, 512, 2);
      c.fillStyle = "#b98a2c"; c.fillRect(176, 0, 160, 152); c.fillStyle = "#07134a"; c.font = "700 124px Georgia, serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("$", 256, 82); });
    const top = paint(512, 300, (c) => { c.fillStyle = "#d6d0bf"; c.fillRect(0, 0, 512, 300); c.strokeStyle = "#07134a"; c.lineWidth = 8; c.strokeRect(22, 22, 468, 256); c.fillStyle = "#b98a2c"; c.fillRect(176, 0, 160, 300); c.fillStyle = "#07134a"; c.font = "700 190px Georgia, serif"; c.textAlign = "center"; c.textBaseline = "middle"; c.fillText("$", 256, 160); });
    const NOTE = [M.paper, M.paper, top, M.paper, edge, M.paper];   // right, left, top, bottom, front, back
    H.forEach((n, i) => { for (let k = 0; k < n; k++) { const c = sh(new T.Mesh(CG, NOTE)); c.position.set(-1.6 + i * 0.8, 1.55 + BH / 2 + k * BH, -3.72); c.userData = { i, k, y: c.position.y }; c.rotation.y = (Math.random() - 0.5) * 0.1; g.add(c); coins.push(c); } });
    const big = mesh(new T.CylinderGeometry(0.5, 0.5, 0.09, 64), M.gold); big.add(mesh(new T.TorusGeometry(0.4, 0.02, 12, 64).rotateX(PI / 2), M.goldSoft, 0, 0.05, 0), mesh(new T.TorusGeometry(0.4, 0.02, 12, 64).rotateX(PI / 2), M.goldSoft, 0, -0.05, 0)); g.add(big);
    const hero = pawn(M.gold, 1.2); hero.position.set(-3.6, 0, -1.4); g.add(hero);
    const A = V(1.6, 4.3, -3.75), B = V(0.4, 3.0, 1.4);
    return { cap: "Rewarded", wide: [V(4.6, 3.1, 9), V(0, 2.4, -2.4)], in: () => ({ p: V(0, 2.75, -3.75), size: 4.7, dir: V(0, 0, 1) }), out: () => ({ p: B, size: 1.0 * CIRCLE, dir: V(0, 0, 1) }),
      update(u, t) { coins.forEach((c) => { const a = 0.1 + c.userData.i * 0.05 + c.userData.k * 0.032, d = eo(seg(u, a, a + 0.2)); c.visible = u > a; c.position.y = c.userData.y + (1 - d) * 3.2; });   // each bundle drops onto its stack
        const k = eio(seg(u, 0.3, 0.8)); big.position.copy(A.clone().lerp(B, k)).add(V(0, Math.sin(k * PI) * 1.3, 0)); big.rotation.x = PI / 2 + (1 - k) * PI * 5; big.visible = u > 0.28; hero.position.y = hop(seg(u, 0.3, 0.75), 4, 0.25); } };
  });
  add((g) => { // 8 promotion
    const block = (w, h, x) => { g.add(mesh(rbox(w, h, w, 0.08), M.navy, x, h / 2, 0), mesh(rbox(w + 0.06, 0.07, w + 0.06, 0.03), M.gold, x, h + 0.035, 0)); };
    block(1.7, 1.25, 0); block(1.5, 0.85, -1.66); block(1.5, 0.55, 1.66);
    const hero = pawn(M.gold, 1.2); hero.position.set(0, 1.32, 0); g.add(hero);
    const medalP = V(0, 1.32 + 0.82, 0.42), medal = mesh(new T.CylinderGeometry(0.25, 0.25, 0.05, 48).rotateX(PI / 2), M.gold, medalP.x, medalP.y, medalP.z); medal.add(mesh(new T.TorusGeometry(0.19, 0.015, 10, 48), M.goldSoft, 0, 0, 0.03)); g.add(medal);
    const s2 = pawn(M.white, 0.95); s2.position.set(-1.66, 0.92, 0); const s3 = pawn(M.white, 0.9); s3.position.set(1.66, 0.62, 0); g.add(s2, s3);
    const crowd = Array.from({ length: 13 }, (_, i) => { const p = pawn(M.white, 0.78), a = -1 + (i / 12) * 2; p.position.set(a * 4.6, 0, 3.2 + Math.cos(a * 1.4) * 1.6 + (i % 2) * 0.9); g.add(p); return p; });
    const beam = new T.Mesh(new T.ConeGeometry(2.6, 9, 48, 1, true), new T.MeshBasicMaterial({ color: 0xffe2a0, transparent: true, opacity: 0, blending: T.NormalBlending, depthWrite: false, side: T.DoubleSide })); beam.position.set(0, 5.6, 0); g.add(beam);
    const N = 170, conf = new T.InstancedMesh(new T.PlaneGeometry(0.11, 0.2), new T.MeshStandardMaterial({ color: 0xe6bd55, metalness: 1, roughness: 0.3, side: T.DoubleSide }), N), seed = Array.from({ length: N }, () => [Math.random() * 9 - 4.5, Math.random(), Math.random() * 6 - 2, Math.random() * 6]), d = new T.Object3D(); g.add(conf);
    const f = () => ({ p: medalP.clone().add(V(0, 0, 0.03)), size: 0.5 * CIRCLE, dir: V(0, 0, 1) });
    return { cap: "Promoted", wide: [V(4.2, 3.3, 11), V(0, 2.1, 0.6)], in: f, out: f,
      update(u, t) { const cheer = seg(u, 0.16, 0.3) * (1 - seg(u, 0.84, 0.95)); crowd.forEach((p, i) => p.position.y = Math.max(0, Math.sin(t * 7 + i * 1.3)) * 0.34 * cheer); [s2, s3].forEach((p, i) => p.position.y = (i ? 0.62 : 0.92) + Math.max(0, Math.sin(t * 7 + i * 2)) * 0.15 * cheer);
        seed.forEach(([x, ph, z, r], i) => { const y = 8 - ((t * 0.9 + ph * 6) % 8); d.position.set(x + Math.sin(t + r) * 0.3, y, z); d.rotation.set(t * 3 + r, t * 2 + r, r); d.scale.setScalar(cheer > 0.02 ? 1 : 0.001); d.updateMatrix(); conf.setMatrixAt(i, d.matrix); }); conf.instanceMatrix.needsUpdate = true; } };
  });
  add((g) => { // 8 now you lead: you open the door for the next one
    const swing = doorway(g), hero = pawn(M.gold, 1.2); hero.position.set(2.6, 0, -0.1); g.add(hero);
    const P0 = V(2.6, 0.82, 0.38); g.add(mesh(new T.CircleGeometry(0.2, 40), M.gold, P0.x, P0.y, P0.z));   // the medal the camera comes out of
    const next = pawn(M.white, 0.85); g.add(next);
    return { cap: "Now you lead", wide: [V(4.6, 2.3, 10.5), V(0, 1.75, 0)], last: true, in: () => ({ p: P0, size: 0.5 * CIRCLE, dir: V(0, 0, 1) }),
      update(u) { swing(eio(seg(u, 0.14, 0.34))); const k = eo(seg(u, 0.24, 0.86)); next.position.set(0, hop(k, 6), 5.6 - 8.8 * k); hero.position.y = hop(seg(u, 0.1, 0.34), 2, 0.16); } };
  });

  // ---------- timeline + camera ----------
  const DUR = 3.6, HOLD = 5, PULL = 0.24, PUSH = 0.74, TOTAL = S.length * DUR + HOLD;
  const close = (g, f) => { const c = f(), p = at(g, c.p); return [p.clone().add(c.dir.clone().normalize().multiplyScalar(c.size * 1.22)), p]; };
    let composer = null, W = 0, H = 0, shown = -1, lastI = -1;
  // the dissolve: a flat copy of the outgoing scene's final close-up, laid over the film and faded away
  const snap = document.createElement("canvas"), snapCtx = snap.getContext("2d"); snap.style.cssText = "position:absolute;inset:0;width:100%;height:100%;z-index:1;opacity:0;pointer-events:none"; renderer.domElement.after(snap);
  function frame(time) {
    const i = Math.min(S.length - 1, Math.floor(time / DUR)), sc = S[i], u = sc.last ? c01((time - i * DUR) / (DUR + HOLD)) : (time - i * DUR) / DUR, lu = sc.last ? (time - i * DUR) / DUR : u;
    S.forEach((s, n) => (s.g.visible = Math.abs(n - i) <= 0)); sc.update(sc.last ? c01(lu) : u, time);
    const wide = [at(sc.g, sc.wide[0]).add(V(Math.sin(time * 0.5) * 0.3, Math.sin(time * 0.37) * 0.08, 0)), at(sc.g, sc.wide[1])];
    let pose = wide;
    if (sc.in && lu < PULL) { const a = close(sc.g, sc.in), k = eo(lu / PULL); pose = [a[0].lerp(wide[0], k), a[1].lerp(wide[1], k)]; }
    else if (sc.out && u > PUSH) { const b = close(sc.g, sc.out), k = ei((u - PUSH) / (1 - PUSH)); pose = [wide[0].lerp(b[0], k), wide[1].lerp(b[1], k)]; }
    else if (sc.last) { const k = eio(seg(lu, PULL, 2.6)); pose = [wide[0].add(V(0, -0.5 * k, -4 * k)), wide[1]]; }
    else if (!sc.in) { const k = eo(seg(u, 0, 0.5)); pose = [wide[0].add(V(1.5 * (1 - k), 0.4 * (1 - k), 3 * (1 - k))), wide[1]]; }
    camera.position.copy(pose[0]); camera.lookAt(pose[1]);
    key.position.set(sc.g.position.x + 6, 11, 9); key.target.position.set(sc.g.position.x, 1, 0); rim.position.set(sc.g.position.x - 5, 4.5, -3);
    if (shown !== i) { shown = i; if (opts.onStage) opts.onStage(i, S.length); }
    composer ? composer.render() : renderer.render(scene, camera);
    const gl = renderer.domElement;
    if (i !== lastI) { if (lastI >= 0 && snap.width > 1) { snap.style.transition = "none"; snap.style.opacity = 1; requestAnimationFrame(() => { snap.style.transition = "opacity .55s cubic-bezier(.4,0,.2,1)"; snap.style.opacity = 0; }); } lastI = i; }
    else if ((sc.last ? TOTAL - time : (i + 1) * DUR - time) < 0.045) { if (snap.width !== gl.width || snap.height !== gl.height) { snap.width = gl.width; snap.height = gl.height; } snapCtx.drawImage(gl, 0, 0); }
  }
  function size() {
    W = tile.clientWidth; H = tile.clientHeight; if (!W || !H) return; renderer.setSize(W, H, false); camera.aspect = W / H;
    camera.fov = camera.aspect >= 1.9 ? 34 : Math.min(62, 2 * Math.atan(Math.tan(17 * PI / 180) * 1.9 / camera.aspect) * 180 / PI);
    camera.setViewOffset(W, H, -W * (camera.aspect >= 1.9 ? 0.15 : 0.24), 0, W, H);            // keeps the action right of the text
    camera.updateProjectionMatrix();
    if (false) { composer = new T.EffectComposer(renderer); composer.setSize(W, H); composer.addPass(new T.RenderPass(scene, camera)); composer.addPass(new T.UnrealBloomPass(new T.Vector2(W, H), 0.55, 0.65, 0.84)); }
  }
  const ro = new ResizeObserver(size); ro.observe(tile); size();

  S.forEach((sc) => (sc.g.visible = true)); renderer.compile(scene, camera); renderer.render(scene, camera);   // warm-up: all scenes once
  frame(0);   // then leave the real opening frame on the canvas (the warm-up picture was a close-up full of gold)
  let t0 = null, raf = 0, on = false, seekT = null;
  // its own clock, so it can hold still while the page scrolls (opts.hold) and carry on from the same moment
  let clock = 0, prev = null;
  const loop = (now) => { const dt = prev === null ? 0 : Math.min(0.1, (now - prev) / 1000); prev = now; if (!(opts.hold && opts.hold())) { clock = (clock + dt) % TOTAL; frame(seekT !== null ? seekT : clock); } raf = requestAnimationFrame(loop); };
  const io = new IntersectionObserver(([e]) => { cancelAnimationFrame(raf); if (e.isIntersecting) { if (!on) { on = true; t0 = null; } raf = requestAnimationFrame(loop); } }, { threshold: 0.25 }); io.observe(tile);
  return { stages: S.length, seek: (sec) => { seekT = sec; frame(sec); }, destroy() { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove(); snap.remove(); } };

};
