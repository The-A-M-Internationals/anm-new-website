import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";

/**
 * "How it works" film: one drawing of twelve strokes that reshapes itself for each step
 * (the sentence you type -> the plan's hierarchy -> the built block -> its check and record).
 * Each scene lists the strokes as x1, y1, x2, y2 and which of them are gold.
 */
export const SCENES: { gold: number[]; pts: number[][] }[] = [
  { gold: [], pts: [[90,150,250,150],[270,150,430,150],[90,190,200,190],[220,190,380,190],[90,230,300,230],[320,230,410,230],[90,270,180,270],[200,270,300,270],[90,310,260,310],[280,310,430,310],[90,350,210,350],[230,350,340,350]] },
  { gold: [0, 1], pts: [[120,110,120,410],[120,110,300,110],[120,190,160,190],[180,190,380,190],[120,260,160,260],[180,260,340,260],[120,330,160,330],[180,330,400,330],[120,410,160,410],[180,410,320,410],[180,225,300,225],[180,365,280,365]] },
  { gold: [6, 7, 8], pts: [[260,110,390,185],[390,185,390,335],[390,335,260,410],[260,410,130,335],[130,335,130,185],[130,185,260,110],[260,260,130,185],[260,260,390,185],[260,260,260,410],[195,222.5,195,372.5],[325,222.5,325,372.5],[195,147.5,325,222.5]] },
  { gold: [6, 7], pts: [[260,110,390,185],[390,185,390,335],[390,335,260,410],[260,410,130,335],[130,335,130,185],[130,185,260,110],[195,262,243,310],[243,310,335,208],[243,310,243,310],[180,452,340,452],[200,476,320,476],[220,500,300,500]] },
];
const NAVY = "#050E30", GOLD = "#C9A13B";

/**
 * Plays the film by itself while the section is on screen (a step every few seconds) and jumps to a
 * step when its word is picked. Strokes move as SVG attributes, the big word swaps inside a mask.
 * With reduced motion nothing plays by itself and steps change instantly.
 */
export function useStepFilm(rootRef: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(0);
  const prev = useRef(0);
  const timer = useRef(0);
  const calm = useRef(false);
  const placed = useRef(false);

  // autoplay only while visible
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    calm.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm.current) return;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer.current);
      if (e.isIntersecting) timer.current = window.setInterval(() => setActive((a) => (a + 1) % SCENES.length), 3800);
    }, { threshold: 0.4 });
    io.observe(root);
    return () => { window.clearInterval(timer.current); io.disconnect(); };
  }, [rootRef]);

  // move to the active scene
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const scene = SCENES[active], from = prev.current, fast = calm.current;
    root.querySelectorAll<SVGLineElement>("[data-film-line]").forEach((line, n) => {
      const [x1, y1, x2, y2] = scene.pts[n];
      gsap.to(line, { attr: { x1, y1, x2, y2, stroke: scene.gold.includes(n) ? GOLD : NAVY }, duration: fast ? 0 : 1.35, ease: "expo.inOut", delay: fast ? 0 : n * 0.025, overwrite: true });
    });
    const verbs = root.querySelectorAll<HTMLElement>("[data-film-verb]");
    if (!placed.current) {   // first run: park the waiting words under the mask (they are only faded out in the page HTML)
      placed.current = true;
      verbs.forEach((verb, n) => gsap.set(verb, { yPercent: n === active ? 0 : 110, opacity: 1 }));
    }
    verbs.forEach((verb, n) => {
      if (n === active) gsap.fromTo(verb, { yPercent: from === active ? 0 : 110 }, { yPercent: 0, duration: fast ? 0 : 1, ease: "expo.out", overwrite: true });
      else gsap.to(verb, { yPercent: n === from ? -110 : 110, duration: fast || n !== from ? 0 : 0.8, ease: "expo.in", overwrite: true });
    });
    prev.current = active;
  }, [active, rootRef]);

  /** picking a word jumps there and restarts the wait */
  const pick = (i: number) => {
    setActive(i);
    if (timer.current) { window.clearInterval(timer.current); timer.current = window.setInterval(() => setActive((a) => (a + 1) % SCENES.length), 3800); }
  };
  return { active, pick };
}
