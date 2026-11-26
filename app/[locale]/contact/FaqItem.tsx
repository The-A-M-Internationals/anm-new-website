"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Props = { index: number; question: string; answer: string; open: boolean; onToggle: () => void };

/** One FAQ row: number, question, round plus button. The answer opens underneath; the plus turns into a cross. */
export default function FaqItem({ index, question, answer, open, onToggle }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const plus = useRef<SVGSVGElement>(null);
  const first = useRef(true);

  useGSAP(() => {
    const calm = first.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    first.current = false;
    gsap.to(panel.current, { height: open ? "auto" : 0, duration: calm ? 0 : 0.55, ease: "power3.inOut", overwrite: true });
    gsap.to(plus.current, { rotation: open ? 45 : 0, duration: calm ? 0 : 0.45, ease: "power3.out", overwrite: true });
  }, { dependencies: [open] });

  return (
    <div data-faq-row className="border-t border-white/20 last:border-b">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-answer-${index}`}
          className="group grid w-full cursor-pointer grid-cols-[2em_1fr_auto] items-center gap-2.5 py-[clamp(18px,3.4vh,30px)] text-start sm:grid-cols-[3.2em_1fr_auto] sm:gap-4"
        >
          <span className="text-[15px] font-medium tabular-nums text-[#C9A84C]">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-[clamp(17px,2vw,28px)] font-medium leading-[1.2] tracking-[-0.01em] text-white">{question}</span>
          <span className={`grid aspect-square w-[clamp(44px,4.6vw,64px)] place-items-center rounded-full transition-all duration-150 ease-in-out group-hover:bg-[#C9A84C] ${open ? "bg-[#C9A84C]" : "bg-white"}`}>
            <svg ref={plus} viewBox="0 0 24 24" className="w-2/5 fill-none stroke-[#050E30] stroke-2 will-change-transform" aria-hidden>
              <path d="M12 4v16M4 12h16" />
            </svg>
          </span>
        </button>
      </h3>
      <div ref={panel} id={`faq-answer-${index}`} role="region" className="h-0 overflow-hidden">
        <p className="max-w-[74ch] pb-[clamp(20px,4vh,34px)] text-[clamp(15.5px,1.3vw,19px)] leading-[1.6] text-white/75 sm:ps-[calc(3.2em+1rem)]">
          {answer}
        </p>
      </div>
    </div>
  );
}
