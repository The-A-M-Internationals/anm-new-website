"use client";

/**
 * Our Clients â€” magnetic enterprise client carousel
 * ------------------------------------------------------------------
 * â€¢ Spring-physics carousel: inertial drag, rubber-band edges, magnetic snap,
 *   trackpad swipe, keyboard â† â†’, magnetic prev/next buttons.
 * â€¢ Velocity-reactive cards (skew + depth), per-card 3D tilt and cursor glow,
 *   inner parallax, custom "Drag" cursor.
 * â€¢ GSAP ScrollTrigger: editorial headline reveal, staggered 3D card entrance.
 * â€¢ TBC Corporation is the signature featured engagement card with live logo.
 * â€¢ Fully adapted to The A&M Internationals design system:
 *   Clean neutral canvas (#F4F6F9), pure white card containers (#FFFFFF),
 *   executive corporate navy (#0B1E4F), and warm gold accents (#C9A13B).
 */
import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CLIENTS, type Client } from "./clients-data";
import { handleHashLink } from "@/lib/handleHashLink";

/* ======================================================================
   Physics engine (framework-free; one rAF loop for the whole section)
   ====================================================================== */
type CardState = {
  el: HTMLElement;
  tilt: HTMLElement;
  inner: HTMLElement;
  rx: number;
  ry: number;
  trx: number;
  try_: number;
  hover: boolean;
};

function createCarousel(root: HTMLElement, reduce: boolean): () => void {
  const viewport = root.querySelector("[data-viewport]") as HTMLElement | null;
  const track = root.querySelector("[data-track]") as HTMLElement | null;
  const cursor = root.querySelector("[data-cursor]") as HTMLElement | null;
  const counter = root.querySelector("[data-counter]") as HTMLElement | null;
  const bar = root.querySelector("[data-progress]") as HTMLElement | null;
  const prev = root.querySelector("[data-prev]") as HTMLButtonElement | null;
  const next = root.querySelector("[data-next]") as HTMLButtonElement | null;

  if (!viewport || !track || !counter || !bar || !prev || !next || !cursor) {
    return () => {};
  }

  const cards: CardState[] = Array.from(track.querySelectorAll<HTMLElement>("[data-card]")).map((el) => ({
    el,
    tilt: (el.querySelector("[data-tilt]") as HTMLElement) || el,
    inner: (el.querySelector("[data-inner]") as HTMLElement) || el,
    rx: 0,
    ry: 0,
    trx: 0,
    try_: 0,
    hover: false,
  }));

  let x = 0, v = 0, target = 0, minX = 0, snaps: number[] = [0], snapCard: number[] = [0], index = 0;
  let dragging = false, moved = 0, startX = 0, startPX = 0, lastPX = 0, lastT = 0, skew = 0;
  let wheelTimer = 0, raf = 0, last = 0;
  const visible = true;
  const cur = { x: 0, y: 0, tx: 0, ty: 0, show: 0, tshow: 0, px: 0, py: 0 };   // px/py: pointer in window coords

  const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));
  const nearest = (pos: number) => snaps.reduce((best, s, i) => (Math.abs(s - pos) < Math.abs(snaps[best] - pos) ? i : best), 0);
  const rubber = (raw: number) => (raw > 0 ? raw * 0.32 : raw < minX ? minX + (raw - minX) * 0.32 : raw);

  const measure = () => {
    const padL = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    minX = Math.min(0, viewport.clientWidth - track.scrollWidth);
    snaps = []; snapCard = [];
    cards.forEach((c, i) => {
      const s = -(c.el.offsetLeft - padL);
      if (s > minX + 60) { snaps.push(s); snapCard.push(i); }
    });
    snaps.push(minX); snapCard.push(cards.length - 1);
    target = snaps[clamp(index, 0, snaps.length - 1)];
  };
  const goTo = (i: number) => {
    index = clamp(i, 0, snaps.length - 1);
    target = snaps[index];
    start();
  };

  /* ---- loop ---- */
  const frame = (now: number) => {
    const dt = Math.min(0.033, (now - (last || now)) / 1000); last = now;

    if (!dragging) {
      const k = reduce ? 400 : 165, c = 2 * Math.sqrt(k) * (reduce ? 1 : 0.86);
      v += (k * (target - x) - c * v) * dt;
      x += v * dt;
      if (Math.abs(target - x) < 0.05 && Math.abs(v) < 0.5) { x = target; v = 0; }
    }
    track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;

    const tSkew = reduce ? 0 : clamp(-v * 0.0016, -7, 7);
    skew += (tSkew - skew) * 0.12;
    const vw = viewport.clientWidth;
    cards.forEach((c) => {
      c.rx += (c.trx - c.rx) * 0.1;
      c.ry += (c.try_ - c.ry) * 0.1;
      const center = c.el.offsetLeft + x + c.el.offsetWidth / 2, off = (center - vw / 2) / vw;
      const depth = reduce ? 0 : -Math.min(Math.abs(off), 1.2) * 50;
      c.tilt.style.transform =
        `perspective(1400px) translateZ(${depth.toFixed(1)}px) rotateX(${c.rx.toFixed(2)}deg) rotateY(${(c.ry + (reduce ? 0 : off * -5)).toFixed(2)}deg) skewX(${skew.toFixed(2)}deg)`;
      if (!reduce) c.inner.style.transform = `translate3d(${(-off * 18).toFixed(1)}px,0,0)`;
    });

    // Re-anchor to the pointer every frame so the cursor stays under it while the page scrolls;
    // easing scaled by dt so it feels the same at 60 Hz and 144 Hz.
    if (cur.tshow) { const vr = viewport.getBoundingClientRect(); cur.tx = cur.px - vr.left; cur.ty = cur.py - vr.top; }
    const ease = (r: number) => 1 - Math.pow(1 - r, dt * 60);
    cur.x += (cur.tx - cur.x) * ease(0.25); cur.y += (cur.ty - cur.y) * ease(0.25); cur.show += (cur.tshow - cur.show) * ease(0.3);
    cursor.style.transform = `translate3d(${cur.x}px,${cur.y}px,0) translate(-50%,-50%) scale(${(cur.show * (dragging ? 0.85 : 1)).toFixed(3)})`;

    const i = nearest(x);
    if (i !== index && !dragging) index = i;
    counter.textContent = `${String(snapCard[nearest(x)] + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
    bar.style.transform = `scaleX(${minX < 0 ? clamp(x / minX, 0, 1) * 0.85 + 0.15 : 1})`;
    prev.disabled = target >= -1;
    next.disabled = target <= minX + 1;

    const settled = !dragging && x === target && Math.abs(skew) < 0.01 &&
      cards.every((c) => Math.abs(c.trx - c.rx) < 0.01 && Math.abs(c.try_ - c.ry) < 0.01) && Math.abs(cur.tshow - cur.show) < 0.001 &&
      (cur.show < 0.001 || (Math.abs(cur.tx - cur.x) < 0.1 && Math.abs(cur.ty - cur.y) < 0.1));   // cursor has caught up
    raf = visible && !settled ? requestAnimationFrame(frame) : 0;
  };

  function start() {
    if (!raf && visible) { last = 0; raf = requestAnimationFrame(frame); }
  }

  /* ---- drag ---- */
  const onDown = (e: PointerEvent) => {
    if (e.button !== 0) return;
    dragging = true; moved = 0; startX = x; startPX = lastPX = e.clientX; lastT = performance.now(); v = 0;
    viewport.setPointerCapture(e.pointerId);
    root.classList.add("is-dragging");
    start();
  };
  const onMove = (e: PointerEvent) => {
    cur.px = e.clientX; cur.py = e.clientY;
    const vr = viewport.getBoundingClientRect();
    cur.tx = e.clientX - vr.left; cur.ty = e.clientY - vr.top;
    if (e.pointerType !== "touch") cur.tshow = 1;
    if (!dragging) { start(); return; }
    moved += Math.abs(e.clientX - lastPX);
    x = rubber(startX + (e.clientX - startPX));
    const now = performance.now(), dt = (now - lastT) / 1000;
    if (dt > 0.008) { v = ((e.clientX - lastPX) / dt) * 0.85; lastPX = e.clientX; lastT = now; }
    start();
  };
  const onUp = (e: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    try { viewport.releasePointerCapture(e.pointerId); } catch {}
    root.classList.remove("is-dragging");
    if (e.pointerType === "touch") cur.tshow = 0;
    const projected = clamp(x + v * 0.28, minX, 0);
    target = snaps[nearest(projected)];
    start();
  };
  const onWheel = (e: WheelEvent) => {
    const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    if (!dx) return;
    e.preventDefault();
    v -= dx * 1.6;
    x = rubber(x - dx * 1.1);
    clearTimeout(wheelTimer);
    wheelTimer = window.setTimeout(() => {
      target = snaps[nearest(clamp(x + v * 0.18, minX, 0))];
      start();
    }, 70);
    start();
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { goTo(index + 1); e.preventDefault(); }
    if (e.key === "ArrowLeft") { goTo(index - 1); e.preventDefault(); }
  };

  /* card tilt */
  cards.forEach((c) => {
    const onEnter = () => { c.hover = true; };
    const onMoveCard = (e: MouseEvent) => {
      if (reduce || dragging) return;
      const r = c.el.getBoundingClientRect();
      const px = clamp((e.clientX - r.left) / r.width, 0, 1), py = clamp((e.clientY - r.top) / r.height, 0, 1);
      c.trx = (0.5 - py) * 10; c.try_ = (px - 0.5) * 12;
      c.el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      c.el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      start();
    };
    const onLeave = () => { c.hover = false; c.trx = 0; c.try_ = 0; start(); };
    c.el.addEventListener("mouseenter", onEnter);
    c.el.addEventListener("mousemove", onMoveCard);
    c.el.addEventListener("mouseleave", onLeave);
  });

  const onViewportEnter = (e: MouseEvent) => {
    cur.px = e.clientX; cur.py = e.clientY;
    const vr = viewport.getBoundingClientRect();
    cur.x = cur.tx = e.clientX - vr.left; cur.y = cur.ty = e.clientY - vr.top;   // appear under the pointer, not fly in from the corner
    cur.tshow = 1; start();
  };
  /* Pointer events are paused while the page glides (keeps scrolling smooth), so mouseenter/leave
     arrive late. Track the mouse on the window and hit-test on every scroll frame instead. */
  let mouse = false;
  const onWindowPointer = (e: PointerEvent) => {
    if (e.pointerType === "touch") return;
    mouse = true; cur.px = e.clientX; cur.py = e.clientY;
  };
  const onPageScroll = () => {
    if (!mouse || dragging) return;
    const vr = viewport.getBoundingClientRect();
    const inside = cur.px >= vr.left && cur.px <= vr.right && cur.py >= vr.top && cur.py <= vr.bottom;
    if (inside && !cur.tshow) { cur.x = cur.tx = cur.px - vr.left; cur.y = cur.ty = cur.py - vr.top; cur.tshow = 1; }
    else if (!inside && cur.tshow) cur.tshow = 0;
    if (cur.tshow || cur.show > 0.001) start();
  };
  const onViewportLeave = () => { cur.tshow = 0; start(); };
  const onPrev = () => goTo(index - 1);
  const onNext = () => goTo(index + 1);

  viewport.addEventListener("pointerdown", onDown);
  viewport.addEventListener("pointermove", onMove);
  viewport.addEventListener("pointerup", onUp);
  viewport.addEventListener("pointercancel", onUp);
  viewport.addEventListener("wheel", onWheel, { passive: false });
  viewport.addEventListener("keydown", onKey);
  viewport.addEventListener("mouseenter", onViewportEnter);
  viewport.addEventListener("mouseleave", onViewportLeave);
  window.addEventListener("scroll", onPageScroll, { passive: true });
  window.addEventListener("pointermove", onWindowPointer, { passive: true });
  prev.addEventListener("click", onPrev);
  next.addEventListener("click", onNext);

  /* suppress clicks if user dragged > 6 px */
  const onTrackClick = (e: MouseEvent) => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } };
  track.addEventListener("click", onTrackClick, true);

  const ro = new ResizeObserver(() => measure());
  ro.observe(viewport); ro.observe(track);
  measure();
  start();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    viewport.removeEventListener("pointerdown", onDown);
    viewport.removeEventListener("pointermove", onMove);
    viewport.removeEventListener("pointerup", onUp);
    viewport.removeEventListener("pointercancel", onUp);
    viewport.removeEventListener("wheel", onWheel);
    viewport.removeEventListener("keydown", onKey);
    viewport.removeEventListener("mouseenter", onViewportEnter);
    viewport.removeEventListener("mouseleave", onViewportLeave);
    window.removeEventListener("scroll", onPageScroll);
    window.removeEventListener("pointermove", onWindowPointer);
    prev.removeEventListener("click", onPrev);
    next.removeEventListener("click", onNext);
    track.removeEventListener("click", onTrackClick, true);
  };
}

/* ======================================================================
   Card Presentation
   ====================================================================== */
const Check = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Arrow = ({ dir = 1 }: { dir?: 1 | -1 }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    style={{ transform: dir === -1 ? "rotate(180deg)" : undefined }}
    className="rtl:rotate-180 transition-transform"
  >
    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Mark({ c }: { c: Client }) {
  return c.logo ? (
    <img className="oc-logo" src={c.logo} alt={`${c.name} logo`} draggable={false} />
  ) : (
    <span className="oc-wordmark">{c.wordmark}</span>
  );
}

function ClientCard({ c, i, total }: { c: Client; i: number; total: number }) {
  return (
    <li
      className={`oc-card${c.featured ? " oc-card--featured" : ""}`}
      data-card
      data-accent={c.accent}
      aria-roledescription="slide"
      aria-label={`${i + 1} of ${total}: ${c.name}`}
    >
      <div className="oc-tilt" data-tilt>
        <div className="oc-glow" aria-hidden="true" />
        <div className="oc-inner" data-inner>
          <header className="oc-top">
            <div className="oc-mark"><Mark c={c} /></div>
            {c.featured ? (
              <span className="oc-chip oc-chip--featured">
                Featured Client
              </span>
            ) : (
              <span className="oc-chip">{c.sector}</span>
            )}
          </header>

          {c.featured ? (
            <div className="oc-feature">
              <div>
                <p className="oc-kicker">{c.sector} · {c.region}</p>
                <h3 className="oc-name">{c.name}</h3>
                <p className="oc-engagement oc-engagement--gold">{c.engagement}</p>
                <p className="oc-summary">{c.summary}</p>
              </div>
              <div className="oc-feature-side">
                <ul className="oc-outcomes">
                  {c.outcomes?.map((o) => (
                    <li key={o}><Check />{o}</li>
                  ))}
                </ul>
                <div className="oc-metrics">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <b>{m.value}</b>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="oc-body">
              <p className="oc-kicker">{c.region}</p>
              <h3 className="oc-name">{c.name}</h3>
              <p className="oc-engagement">{c.engagement}</p>
              <p className="oc-summary">{c.summary}</p>
              <div className="oc-metrics">
                {c.metrics.map((m) => (
                  <div key={m.label}>
                    <b>{m.value}</b>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <footer className="oc-foot">
            <span className="oc-scope">Scope · {c.scope}</span>
            {c.placeholder && <span className="oc-illus" title="Placeholder content for layout">Illustrative</span>}
            {c.href && (
              <a className="oc-cta cursor-pointer" href={c.href} draggable={false}>
                Discuss your architecture <Arrow />
              </a>
            )}
          </footer>
        </div>
      </div>
    </li>
  );
}

/* ======================================================================
   Section
   ====================================================================== */
export default function OurClients({ clients = CLIENTS }: { clients?: Client[] }) {
  const ref = useRef<HTMLElement>(null);
  const ordered = [...clients].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stop = createCarousel(root, reduce);

    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.from("[data-word]", {
        yPercent: 115,
        rotate: 3,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.05,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
      gsap.from("[data-reveal]", {
        y: 24,
        autoAlpha: 0,
        duration: 1.0,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.2,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
      gsap.from("[data-card]", {
        xPercent: 25,
        autoAlpha: 0,
        rotateY: -12,
        transformOrigin: "left center",
        transformPerspective: 1400,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.08,
        clearProps: "transform,opacity,visibility",
        scrollTrigger: { trigger: "[data-viewport]", start: "top 85%" },
      });
      gsap.to("[data-orb='gold']", {
        yPercent: -25,
        xPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
      gsap.to("[data-orb='navy']", {
        yPercent: 25,
        xPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
    }, root);

    return () => {
      stop();
      ctx.revert();
    };
  }, []);

  const headline = ["Enterprises", "that", "run", "their", "numbers", "on", "our", "architecture."];
  const glow = new Set(["our", "architecture."]);

  return (
    <section ref={ref} className="oc" id="our-clients" aria-labelledby="oc-title">
      <style>{CSS}</style>
      <div className="oc-orb" data-orb="gold" aria-hidden="true" />
      <div className="oc-orb oc-orb--navy" data-orb="navy" aria-hidden="true" />
      <div className="oc-grid" aria-hidden="true" />

      <div className="oc-wrap">
        <div className="oc-head">
          <div>
            <h2 id="oc-title" className="oc-title">
              {headline.map((w, i) => (
                <Fragment key={i}>
                  <span className="oc-wmask">
                    <span data-word className={glow.has(w) ? "oc-highlight" : undefined}>
                      {w}
                    </span>
                  </span>
                  {i < headline.length - 1 ? " " : ""}
                </Fragment>
              ))}
            </h2>
          </div>
          <div className="oc-head-side" data-reveal>
            <p className="oc-lede">
              From multi-entity consolidation to rolling forecasts, we architect Oracle EPM platforms that enterprise finance leaders rely upon at month-end.
            </p>
            <div className="oc-controls">
              <button type="button" className="oc-btn cursor-pointer" data-prev aria-label="Previous client">
                <Arrow dir={-1} />
              </button>
              <button type="button" className="oc-btn cursor-pointer" data-next aria-label="Next client">
                <Arrow />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="oc-viewport"
        data-viewport
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client engagements. Use left and right arrow keys to browse."
      >
        <ul className="oc-track" data-track>
          {ordered.map((c, i) => (
            <ClientCard key={c.id} c={c} i={i} total={ordered.length} />
          ))}
        </ul>
        <div className="oc-cursor" data-cursor aria-hidden="true">
          <span>Drag</span>
        </div>
      </div>

      <div className="oc-wrap">
        <div className="oc-rail" data-reveal>
          <span className="oc-counter" data-counter>
            01 / {String(ordered.length).padStart(2, "0")}
          </span>
          <div className="oc-bar">
            <i data-progress />
          </div>
          <span className="oc-hint">Drag · swipe · ← →</span>
          <a
            className="oc-next-sec cursor-pointer"
            href="#success-stories"
            onClick={(e) => handleHashLink(e, "#success-stories")}
          >
            Success stories <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ======================================================================
   Styles (scoped by .oc prefix; tailored to A&M Internationals #F4F6F9 palette)
   ====================================================================== */
const CSS = `
.oc {
  contain: layout paint;
  --navy: 11, 30, 79;
  --navy-deep: 13, 29, 74;
  --gold: 201, 161, 59;
  --gold-ink: 154, 116, 20;
  --ink: #0b132b;
  --mute: #5b6474;
  --border: #ece3cf;
  --gutter: max(20px, calc((100vw - 1240px) / 2));
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: clamp(80px, 9vw, 120px) 0 clamp(64px, 8vw, 96px);
  background: #f4f6f9;
  color: var(--ink);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
}
.oc *, .oc *::before, .oc *::after { box-sizing: border-box; }

.oc-orb {
  position: absolute; z-index: -1; width: 55vw; height: 55vw; max-width: 800px; max-height: 800px;
  left: -10vw; top: -14vw; border-radius: 50%;
  background: radial-gradient(closest-side, rgba(var(--gold), .16), rgba(var(--gold), .06) 40%, rgba(var(--gold), .01) 70%, transparent);
  pointer-events: none; will-change: transform; transform: translateZ(0);
}
.oc-orb--navy {
  left: auto; right: -14vw; top: auto; bottom: -20vw;
  background: radial-gradient(closest-side, rgba(var(--navy-deep), .10), rgba(var(--navy-deep), .03) 45%, rgba(var(--navy-deep), .005) 70%, transparent);
  pointer-events: none; will-change: transform; transform: translateZ(0);
}
.oc-grid {
  position: absolute; inset: 0; z-index: -1; pointer-events: none; opacity: .45;
  background-image: linear-gradient(rgba(11,19,43,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11,19,43,.04) 1px, transparent 1px);
  background-size: 72px 72px;
  -webkit-mask-image: radial-gradient(ellipse 75% 65% at 50% 40%, #000, transparent);
  mask-image: radial-gradient(ellipse 75% 65% at 50% 40%, #000, transparent);
}
.oc-wrap { padding: 0 var(--gutter); }

/* Header */
.oc-head {
  display: grid; grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
  gap: 40px; align-items: end; margin-bottom: clamp(40px, 5vw, 64px);
}
.oc-title { margin: 0; font-size: clamp(34px, 4.8vw, 64px); line-height: 1.05; font-weight: 700; letter-spacing: -.03em; color: #0b1e4f; }
.oc-wmask { display: inline-block; overflow: hidden; vertical-align: top; padding: .08em .24em .14em .02em; margin-right: -.16em; }
.oc-wmask > span { display: inline-block; will-change: transform; }
.oc-highlight {
  color: #d4af37;
  font-style: italic;
  font-weight: 600;
  letter-spacing: -.015em;
  padding-right: .18em;
}
.oc-head-side { display: grid; gap: 24px; justify-items: start; }
.oc-lede { margin: 0; max-width: 44ch; font-size: 15.5px; line-height: 1.65; color: var(--mute); }
.oc-controls { display: flex; gap: 12px; }
.oc-btn {
  width: 52px; height: 52px; border-radius: 50%; display: grid; place-items: center; cursor: pointer; color: #0b1e4f;
  background: #ffffff; border: 1px solid #ece3cf; box-shadow: 0 4px 14px -4px rgba(11,19,43,.08);
  transition: all .3s cubic-bezier(.16,1,.3,1);
}
.oc-btn:hover:not(:disabled) {
  background: #0d1d4a; color: #f2cd62; border-color: #0d1d4a; transform: scale(1.05);
}
.oc-btn:disabled { opacity: .35; cursor: default; }
.oc-btn:focus-visible, .oc-viewport:focus-visible { outline: 2px solid rgba(var(--gold), .8); outline-offset: 4px; }

/* Track & Viewport */
.oc-viewport {
  position: relative; cursor: grab; touch-action: pan-y; user-select: none;
  -webkit-user-select: none; outline: none;
}
.oc.is-dragging .oc-viewport { cursor: grabbing; }
.oc-track {
  display: flex; gap: 28px; margin: 0; padding: 24px var(--gutter) 36px;
  list-style: none; width: max-content; will-change: transform;
}
.oc-card { flex: 0 0 auto; width: min(390px, 80vw); }
.oc-card--featured { width: min(740px, 88vw); }

.oc-tilt {
  position: relative; height: 100%; min-height: 480px; border-radius: 24px;
  transform-style: preserve-3d; will-change: transform;
  --mx: 50%; --my: 50%; --glow: rgba(var(--gold), .16);
  background: #ffffff;
  border: 1px solid #ece3cf;
  box-shadow: 0 1px 3px rgba(11,19,43,.04), 0 16px 36px -18px rgba(11,19,43,.12);
  transition: border-color .4s, box-shadow .4s;
}
.oc-tilt:hover {
  border-color: #e2cf9c;
  box-shadow: 0 1px 3px rgba(11,19,43,.04), 0 28px 56px -22px rgba(11,19,43,.22), 0 0 0 1px rgba(201,161,59,.25);
}
.oc-glow {
  position: absolute; inset: 0; border-radius: inherit; pointer-events: none; opacity: 0; transition: opacity .4s;
  background: radial-gradient(520px circle at var(--mx) var(--my), var(--glow), transparent 60%);
}
.oc-tilt:hover .oc-glow { opacity: 1; }
.oc-inner {
  position: relative; display: flex; flex-direction: column; height: 100%; min-height: 480px;
  padding: 30px 30px 24px; transform: translateZ(30px);
}

.oc-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 30px; }
.oc-mark { height: 46px; display: flex; align-items: center; }
.oc-logo { max-height: 44px; max-width: 160px; object-fit: contain; pointer-events: none; }
.oc-wordmark { font-size: 16px; font-weight: 700; letter-spacing: .2em; color: #0b1e4f; }
.oc-chip {
  padding: 5px 12px; border-radius: 999px; font: 600 11px/1 ui-monospace, Menlo, Consolas, monospace; letter-spacing: .08em;
  text-transform: uppercase; color: #9a7414; background: #fffaf0; border: 1px solid #efe1b8; white-space: nowrap;
}
.oc-chip--featured {
  color: #92660a;
  background: #fffbed;
  border-color: #d4af37;
  font-weight: 700;
}
.oc-kicker { margin: 0 0 8px; font: 700 11px/1.3 ui-monospace, Menlo, Consolas, monospace; letter-spacing: .14em; text-transform: uppercase; color: #9a7414; }
.oc-name { margin: 0 0 10px; font-size: 26px; line-height: 1.12; font-weight: 700; letter-spacing: -.02em; color: #0b1e4f; }
.oc-engagement { margin: 0 0 12px; font-size: 15px; font-weight: 600; color: #1a3380; line-height: 1.4; }
.oc-summary { margin: 0; font-size: 14.5px; line-height: 1.65; color: var(--mute); }
.oc-body { flex: 1; display: flex; flex-direction: column; }
.oc-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: auto; padding-top: 24px; }
.oc-metrics > div { padding: 14px 0 4px; border-top: 1px solid #f0e4c2; }
.oc-metrics b { display: block; font-size: 28px; font-weight: 700; letter-spacing: -.02em; line-height: 1; color: #0b1e4f; }
.oc-metrics span { display: block; margin-top: 8px; font-size: 12px; line-height: 1.4; color: var(--mute); }
.oc-foot { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-top: 20px; padding-top: 16px; border-top: 1px solid #f1ead6; }
.oc-scope { font: 600 11px/1.3 ui-monospace, Menlo, Consolas, monospace; letter-spacing: .1em; text-transform: uppercase; color: #788293; }
.oc-illus {
  padding: 3px 8px; border-radius: 6px; font: 600 9.5px/1.2 ui-monospace, Menlo, monospace; letter-spacing: .1em; text-transform: uppercase;
  color: #9a7414; border: 1px dashed #d5be7b; background: #fffdf8;
}
.oc-cta { margin-left: auto; display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; text-decoration: none; color: #c9a13b; }
.oc-cta:hover { color: #9a7414; }
.oc-cta svg { transition: transform .3s cubic-bezier(.16,1,.3,1); } .oc-cta:hover svg { transform: translateX(5px); }

/* TBC Featured Card */
.oc-card--featured .oc-tilt {
  background: #ffffff;
  border: 1px solid #d4af37;
  box-shadow: 0 1px 3px rgba(11,19,43,.04), 0 16px 36px -18px rgba(11,19,43,.10);
}
.oc-card--featured .oc-tilt:hover {
  border-color: #c9a13b;
  box-shadow: 0 1px 3px rgba(11,19,43,.04), 0 24px 50px -20px rgba(11,19,43,.18);
}
.oc-feature { flex: 1; display: grid; grid-template-columns: 1.1fr 1fr; gap: 36px; }
.oc-engagement--gold { color: #92660a; }
.oc-feature-side { display: flex; flex-direction: column; }
.oc-outcomes { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }
.oc-outcomes li {
  display: grid; grid-template-columns: 18px 1fr; gap: 12px; align-items: start;
  font-size: 14px; line-height: 1.45; color: #0b132b; font-weight: 500;
}
.oc-outcomes svg { margin-top: 2px; color: #c9a13b; }
.oc-card--featured .oc-metrics b {
  color: #0b1e4f;
}
.oc-card--featured .oc-wordmark {
  font-size: 18px; font-weight: 800; letter-spacing: .16em; color: #0b1e4f;
}

/* Cursor + Rail */
.oc-cursor {
  position: absolute; left: 0; top: 0; z-index: 5; width: 84px; height: 84px; border-radius: 50%;
  display: grid; place-items: center; pointer-events: none; transform: scale(0);
  background: #0d1d4a; border: 1px solid rgba(201, 161, 59, .45); box-shadow: 0 10px 24px -6px rgba(11,19,43,.4);
  font: 700 11px/1 ui-monospace, Menlo, Consolas, monospace; letter-spacing: .18em; text-transform: uppercase; color: #f2cd62;
}
.oc.is-dragging .oc-cursor { background: #c9a13b; border-color: #f2cd62; color: #0b132b; }
.oc-rail { display: grid; grid-template-columns: auto 1fr auto auto; align-items: center; gap: 24px; margin-top: 12px; }
          <span className="oc-hint">Drag · swipe · ← →</span>
.oc-bar { position: relative; height: 3px; background: #e5e7eb; border-radius: 2px; overflow: hidden; }
.oc-bar i {
  position: absolute; inset: 0; transform-origin: left; transform: scaleX(.15);
  background: linear-gradient(90deg, #0d1d4a, #c9a13b); box-shadow: 0 0 10px rgba(201, 161, 59, .6);
}
.oc-next-sec {
  display: inline-flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600;
  color: #0b1e4f; text-decoration: none; transition: color .3s;
}
.oc-next-sec:hover { color: #c9a13b; }
.oc-next-sec svg { transform: rotate(90deg); transition: transform .3s; }
.oc-next-sec:hover svg { transform: rotate(90deg) translateX(4px); }

@media (hover: none) { .oc-viewport { cursor: grab; } .oc-cursor { display: none; } }
@media (max-width: 900px) {
  .oc-head { grid-template-columns: 1fr; gap: 28px; }
  .oc-feature { grid-template-columns: 1fr; gap: 22px; }
  .oc-tilt, .oc-inner { min-height: 440px; }
          <span className="oc-hint">Drag · swipe · ← →</span>
}
@media (prefers-reduced-motion: reduce) {
  .oc-tilt, .oc-inner, .oc-track { transition: none !important; }
}
`;
