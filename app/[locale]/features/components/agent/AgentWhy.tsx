"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIntlayer } from "next-intlayer";
import AgentHeading from "./AgentHeading";
import { A_ITEM, useAgentReveal } from "./useAgentReveal";

/** A. Why we are building it: one large paragraph that reads itself, word by word, as you scroll */
export default function AgentWhy() {
  const c = useIntlayer("featuresAgent").why;
  const ref = useAgentReveal();
  const words: string[] = String(c.text1.value).split(/\s+/).filter(Boolean);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const para = root.querySelector("[data-why-para]");
      gsap.fromTo(root.querySelectorAll("[data-why-w]"), { opacity: 0.18 }, {
        opacity: 1, ease: "none", stagger: 0.05,
        scrollTrigger: { trigger: para, start: "top 82%", end: "bottom 52%", scrub: 0.4 },
      });
    });
    return () => mm.revert();
  }, [ref]);

  return (
    <div ref={ref} id="why" className="no-global-reveal bg-white px-4 py-10 sm:px-6 md:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl p-2 md:p-7">
        <AgentHeading text={c.title.value} gold={2} />
        <p data-why-para aria-label={c.text1.value} className="mt-8 max-w-[1100px] text-[clamp(26px,3.5vw,52px)] font-semibold leading-[1.2] tracking-[-0.015em] text-[#050E30] md:mt-12">
          {words.map((w, i) => <span key={i} aria-hidden data-why-w className="motion-safe:opacity-[0.18]">{w}{i < words.length - 1 ? " " : ""}</span>)}
        </p>
        <p data-a-item className={`ms-auto mt-10 max-w-[620px] text-lg leading-relaxed text-slate-600 md:text-xl ${A_ITEM}`}>{c.text2.value}</p>
      </div>
    </div>
  );
}
