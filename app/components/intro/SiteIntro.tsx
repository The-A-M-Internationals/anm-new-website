"use client";

import { useRef } from "react";
import { useSiteIntro } from "./useSiteIntro";

/** The icon as three straight-edged shapes (traced from the brand artwork) */
const SHAPES = [
  "M190,2L192,431L156,410L156,264L97,227L97,375L57,351L57,166L66,163L155,217L155,70L38,142L38,340L0,318L0,117Z",
  "M214,0L404,118L404,317L365,341L365,139L214,47Z",
  "M216,138L271,185L330,144L346,155L346,352L213,435L213,392L306,333L306,211L267,235L216,192Z",
];
const GOLD_TEXT = "inline-block bg-[linear-gradient(180deg,#F6E27A_0%,#D4AF37_50%,#A47E1F_100%)] bg-clip-text [-webkit-text-fill-color:transparent]";
const letters = (text: string) => [...text];

/** Opening of the site (see useSiteIntro). The brand name and tagline are the logo's own lettering, so they stay in English. */
export default function SiteIntro() {
  const root = useRef<HTMLDivElement>(null);
  useSiteIntro(root);
  return (
    <div ref={root} className="site-intro" dir="ltr" aria-hidden>
      <div data-intro-bg className="absolute inset-0 overflow-hidden bg-[radial-gradient(120%_90%_at_50%_45%,#0D1B3E_0%,#081430_60%,#050E30_100%)]">
        <div data-intro-glow className="absolute left-1/2 top-1/2 -ml-[35vmax] -mt-[35vmax] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(212,175,55,0.2),rgba(212,175,55,0.05)_45%,transparent_70%)] opacity-0 will-change-transform" />
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <svg data-intro-icon viewBox="-6 -6 416 447" shapeRendering="geometricPrecision" className="h-auto w-[clamp(92px,12vmin,156px)] invisible overflow-visible opacity-0">
          <defs>
            <linearGradient id="intro-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F8E58A" /><stop offset=".45" stopColor="#D4AF37" /><stop offset="1" stopColor="#9A751B" />
            </linearGradient>
            <linearGradient id="intro-sheen" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".85" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <clipPath id="intro-shape">{SHAPES.map((d) => <path key={d} d={d} />)}</clipPath>
          </defs>
          <g data-intro-fill fill="url(#intro-gold)" opacity="0">{SHAPES.map((d) => <path key={d} d={d} />)}</g>
          <g clipPath="url(#intro-shape)"><rect data-intro-sheen x="-260" y="-40" width="170" height="520" fill="url(#intro-sheen)" transform="skewX(-20)" /></g>
          {SHAPES.map((d) => <path key={d} data-intro-stroke d={d} fill="none" stroke="#F3D777" strokeWidth="3" strokeLinejoin="round" />)}
        </svg>

        <div data-intro-words className="mt-[30px] h-0 overflow-visible text-center [font-family:Cinzel,Georgia,serif]">
          <div className="whitespace-nowrap text-[clamp(28px,5.4vmin,68px)] font-semibold leading-none tracking-[0.1em]">
            {letters("THE A & M").map((ch, i) => ch === " " ? <span key={i}>&nbsp;</span> : (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span data-intro-name className={`${GOLD_TEXT} translate-y-[115%]`}>{ch}</span>
              </span>
            ))}
          </div>
          <div className="ms-[0.5em] mt-[14px] whitespace-nowrap text-[clamp(13px,2.3vmin,29px)] font-medium tracking-[0.5em] text-white">
            {letters("INTERNATIONALS").map((ch, i) => <span key={i} data-intro-sub className="inline-block opacity-0">{ch}</span>)}
          </div>
          <div className="mt-[18px] flex items-center justify-center gap-[18px]">
            <i data-intro-rule className="block h-px w-[clamp(80px,18vmin,230px)] origin-right scale-x-0 bg-[linear-gradient(90deg,transparent,#D4AF37)]" />
            <svg data-intro-star viewBox="0 0 20 20" className="h-5 w-5 scale-0"><path d="M10 0C10.6 6 14 9.4 20 10C14 10.6 10.6 14 10 20C9.4 14 6 10.6 0 10C6 9.4 9.4 6 10 0Z" fill="#D4AF37" /></svg>
            <i data-intro-rule className="block h-px w-[clamp(80px,18vmin,230px)] origin-left scale-x-0 bg-[linear-gradient(270deg,transparent,#D4AF37)]" />
          </div>
          <div data-intro-tag className="mt-4 whitespace-nowrap font-sans text-[clamp(9px,1.35vmin,15px)] font-medium tracking-[0.42em] text-[#D4AF37] opacity-0">ELEVATING THE WORLD ELEGANTLY.</div>
        </div>
      </div>
    </div>
  );
}
