"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useIntlayer } from "next-intlayer";
import FaqItem from "./FaqItem";
import JoinTeam from "./JoinTeam";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COUNT = 9;
type Field = { value?: unknown } | undefined;
/** The questions carry their own "1. " prefix; the row shows its own number, so the prefix is dropped here. */
const bare = (question: string) => question.replace(/^\s*[\d٠-٩]+[.)]\s*/, "");

/** Contact page FAQ: wide rows on the navy ground, one answer open at a time, then the Join band. */
const FAQ = () => {
  const content = useIntlayer("faq");
  const fields = content as unknown as Record<string, Field>;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const listRef = useRef<HTMLDivElement>(null);

  const faqs = Array.from({ length: COUNT }, (_, i) => ({
    question: bare(fields[`faq${i + 1}Question`]?.value?.toString() ?? ""),
    answer: fields[`faq${i + 1}Answer`]?.value?.toString() ?? "",
  })).filter((faq) => faq.question);

  // Rows ease up one after another when the list comes into view (transform + opacity only)
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-faq-row]", {
        y: 36, autoAlpha: 0, stagger: 0.07, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: listRef.current, start: "top 82%", once: true },
      });
    });
  }, { scope: listRef });

  return (
    <div>
      {/* Same navy ground and artwork the FAQ had before */}
      <div
        className="relative overflow-hidden bg-[#0D1B3E] py-[clamp(48px,9vh,100px)]"
        style={{ backgroundImage: "url('/whychooseus.svg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "right -100px" }}
      >
        <div className="absolute -left-8 top-0" aria-hidden>
          <Image src="/left.svg" alt="" width={150} height={150} />
        </div>
        <div className="relative mx-auto w-[min(100%-2rem,1240px)]">
          <h2 className="text-[clamp(32px,4.6vw,68px)] font-medium leading-[1.04] tracking-[-0.025em] text-white">
            {content.title.value}
          </h2>
          <p className="mt-3 mb-[clamp(26px,5vh,50px)] text-[clamp(15px,1.3vw,19px)] text-[#C9A84C]">
            {content.subheading.value}
          </p>

          <div ref={listRef} className="no-global-reveal">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                index={i}
                question={faq.question}
                answer={faq.answer}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>

      <JoinTeam />
    </div>
  );
};

export default FAQ;
