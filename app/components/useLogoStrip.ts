import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v));

/** Heading reveal on scroll, plus the logo line's motion: steady glide, scroll boost, hover slow-down, drag and throw. */
export function useLogoStrip(rootRef: RefObject<HTMLElement | null>, trackRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const scrollTrigger = { trigger: root, start: "top 75%" };
      gsap.from("[data-word]", { yPercent: 115, rotate: 3, duration: 1.2, ease: "expo.out", stagger: 0.05, scrollTrigger });
      gsap.from("[data-reveal]", { y: 24, autoAlpha: 0, duration: 1, ease: "power3.out", stagger: 0.08, delay: 0.2, scrollTrigger });
    }, root);
    return () => ctx.revert();
  }, [rootRef]);

  useEffect(() => {
    const track = trackRef.current;
    const strip = track?.parentElement;
    if (!track || !strip) return;
    const base = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : window.innerWidth < 640 ? 36 : 50; // px per second
    let x = 0, dir = -1, boost = 0, thrown = 0, hover = 1, hoverTo = 1;
    let dragging = false, lastX = 0, lastT = 0, dragV = 0, lastScroll = window.scrollY, raf = 0, prev = 0;

    const frame = (now: number) => {
      const dt = Math.min((now - prev) / 1000, 0.05);
      prev = now;
      hover += (hoverTo - hover) * 0.08;
      if (!dragging) {
        x += (dir * base * hover + boost + thrown) * dt;
        boost *= Math.exp(-4 * dt);
        thrown *= Math.exp(-2.5 * dt);
      }
      const half = track.scrollWidth / 2;
      if (half) x = ((x % half) - half) % half; // keep within one set so the loop is seamless
      track.style.transform = `translate3d(${x}px,0,0)`;
      raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) { prev = performance.now(); lastScroll = window.scrollY; raf = requestAnimationFrame(frame); }
    });
    io.observe(strip);

    const onScroll = () => {
      const dy = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      if (!dy) return;
      dir = dy > 0 ? -1 : 1;
      boost = clamp(dir * Math.max(Math.abs(boost), Math.abs(dy) * 14), 700);
    };
    const onEnter = (e: PointerEvent) => { if (e.pointerType === "mouse") hoverTo = 0.12; };
    const onLeave = () => { hoverTo = 1; };
    const onDown = (e: PointerEvent) => {
      dragging = true; dragV = 0; lastX = e.clientX; lastT = performance.now();
      strip.setPointerCapture(e.pointerId);
      strip.dataset.dragging = "";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now(), dx = e.clientX - lastX;
      dragV = dragV * 0.6 + (dx / Math.max(now - lastT, 1)) * 1000 * 0.4;
      x += dx; lastX = e.clientX; lastT = now;
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      delete strip.dataset.dragging;
      if (performance.now() - lastT > 120) dragV = 0; // held still before letting go
      if (Math.abs(dragV) > 40) dir = dragV > 0 ? 1 : -1;
      thrown = clamp(dragV, 2600);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    strip.addEventListener("pointerenter", onEnter);
    strip.addEventListener("pointerleave", onLeave);
    strip.addEventListener("pointerdown", onDown);
    strip.addEventListener("pointermove", onMove);
    strip.addEventListener("pointerup", onUp);
    strip.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      strip.removeEventListener("pointerenter", onEnter);
      strip.removeEventListener("pointerleave", onLeave);
      strip.removeEventListener("pointerdown", onDown);
      strip.removeEventListener("pointermove", onMove);
      strip.removeEventListener("pointerup", onUp);
      strip.removeEventListener("pointercancel", onUp);
    };
  }, [trackRef]);
}
