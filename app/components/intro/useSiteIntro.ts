import { useEffect, type RefObject } from "react";
import gsap from "gsap";

type LenisLike = { stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

/** Where the icon sits inside the top-bar logo picture (new-logo.png, 890 x 280, 4px padding above and below) */
function dockTarget() {
  const img = document.querySelector<HTMLElement>('nav img[alt="Logo"]');
  if (!img) return { x: innerWidth * 0.094, y: 36, h: 46 };
  const r = img.getBoundingClientRect(), k = (r.height - 8) / 280;
  return { x: r.left + 159 * k, y: r.top + 4 + 129.5 * k, h: 229 * k };
}

/**
 * The opening of the site, on the first page of a visit and again on an F5 / hard refresh:
 * out of a completely empty stage the icon's outline draws itself, fills with gold and catches a
 * passing light (with a soft gold glow behind), lifts while the full logo forms under it, then flies to the top-bar
 * logo as the stage dissolves into the page. The top-bar logo itself is never touched: it is simply
 * there, fully visible, when the stage has gone.
 * It only starts once the page behind has finished loading and the browser is idle, so the motion is
 * never fighting the page for time and everything is ready at the hand-over.
 * Skipped (html[data-intro="skip"], set before paint in the layout) on other reloads and with reduced
 * motion. Transform and opacity only.
 */
export function useSiteIntro(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current, html = document.documentElement;
    if (!root || html.dataset.intro === "skip") return;
    try { sessionStorage.setItem("anm-intro", "1"); } catch { /* private mode: it simply plays again next page */ }
    html.dataset.intro = "play";
    const q = gsap.utils.selector(root);
    const icon = q("[data-intro-icon]")[0] as unknown as SVGSVGElement, words = q("[data-intro-words]")[0] as HTMLElement;
    // each outline piece starts undrawn: one dash as long as the piece, pushed fully out of sight.
    // Real lengths in pixels, so the drawing moves continuously (the icon itself is hidden until the timeline starts)
    const strokes = q("[data-intro-stroke]") as unknown as SVGPathElement[];
    strokes.forEach((p) => { const len = p.getTotalLength(); gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 }); });
    gsap.set(q("[data-intro-fill]"), { opacity: 0 });
    const hold = gsap.delayedCall(0.4, () => lenis()?.stop());   // the page stays put underneath
    const finish = () => { html.dataset.intro = "done"; lenis()?.start(); };
    const lift = () => -words.scrollHeight / 2 - 4;
    const rect = () => icon.getBoundingClientRect();

    const tl = gsap.timeline({ paused: true, onComplete: finish });
    // the icon, exactly as in the approved preview: out of an empty stage its outline draws itself,
    // it fills with gold, the outline fades and a light passes over it (the glow blooms behind)
    tl.fromTo(q("[data-intro-glow]"), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1.8, ease: "power2.out" }, 0)
      .set(icon, { autoAlpha: 1, scale: 1, transformOrigin: "50% 50%" }, 0)
      .to(strokes, { strokeDashoffset: 0, duration: 1.7, ease: "power2.inOut", stagger: 0.16 }, 0.45)
      .to(q("[data-intro-fill]"), { opacity: 1, duration: 0.7, ease: "power1.out" }, 1.9)
      .to(strokes, { opacity: 0, duration: 0.6 }, 2.1)
      .fromTo(q("[data-intro-sheen]"), { x: 0 }, { x: 760, duration: 1, ease: "power2.inOut" }, 2)
      // it lifts and the full logo forms under it
      .to(icon, { y: lift, scale: 0.86, duration: 1.2, ease: "expo.inOut" }, 3)
      .fromTo(words, { y: () => lift() * 0.2 }, { y: () => lift() + rect().height * 0.05, duration: 1.2, ease: "expo.inOut" }, 3)
      .fromTo(q("[data-intro-name]"), { yPercent: 115, y: 0 }, { yPercent: 0, y: 0, duration: 1, ease: "expo.out", stagger: 0.045 }, 3.55)
      .fromTo(q("[data-intro-sub]"), { opacity: 0, x: 26 }, { opacity: 1, x: 0, duration: 0.85, ease: "power3.out", stagger: 0.028 }, 3.8)
      .fromTo(q("[data-intro-rule]"), { scaleX: 0 }, { scaleX: 1, duration: 0.95, ease: "expo.out" }, 4.1)
      .fromTo(q("[data-intro-star]"), { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.7, ease: "back.out(2)" }, 4.1)
      .fromTo(q("[data-intro-tag]"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }, 4.35)
      .fromTo(q("[data-intro-sheen]"), { x: 0 }, { x: 760, duration: 1, ease: "power2.inOut" }, 4.5)
      // hand-over: the words go, the icon flies to the top-bar logo, the stage dissolves into the page
      .to(words, { opacity: 0, duration: 0.5, ease: "power2.inOut" }, 5.65)
      .to(icon, {
        duration: 1.25, ease: "expo.inOut",
        x: () => Number(gsap.getProperty(icon, "x")) + dockTarget().x - (rect().left + rect().width / 2),
        y: () => Number(gsap.getProperty(icon, "y")) + dockTarget().y - (rect().top + rect().height / 2),
        scale: () => (dockTarget().h / rect().height) * Number(gsap.getProperty(icon, "scale")),
      }, 5.8)
      .to(q("[data-intro-bg]"), { opacity: 0, duration: 1.1, ease: "power2.inOut" }, 5.95)
      .call(() => { window.dispatchEvent(new Event("intro:reveal")); }, [], 6.75)   // the page is showing through: its own opening can start
      .to(icon, { opacity: 0, duration: 0.35 }, 7);

    // start when the page has loaded, the logo lettering has its font and the browser has a free moment
    let started = false, idle = 0;
    const start = () => { if (!started) { started = true; requestAnimationFrame(() => requestAnimationFrame(() => tl.play())); } };
    const ready = () => (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(start, { timeout: 1200 });
      else setTimeout(start, 150);
    });
    if (document.readyState === "complete") ready(); else window.addEventListener("load", ready, { once: true });
    const cap = window.setTimeout(start, 6000);   // never keep the visitor waiting on an empty stage
    return () => {
      window.clearTimeout(cap); window.removeEventListener("load", ready); if (idle) window.cancelIdleCallback?.(idle);
      started = true; hold.kill(); tl.kill(); lenis()?.start();
      if (html.dataset.intro === "play") delete html.dataset.intro;
    };
  }, [rootRef]);
}
