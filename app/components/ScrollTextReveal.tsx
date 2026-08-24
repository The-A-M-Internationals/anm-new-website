"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface ScrollTextRevealProps {
    headingText: string;
    subtext: string;
    theme?: "dark" | "light";
}

const ScrollTextReveal: React.FC<ScrollTextRevealProps> = ({
    headingText,
    subtext,
    theme = "light",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<HTMLSpanElement[]>([]);

    const isDark = theme === "dark";
    const bgClass = isDark ? "bg-[#050E30] text-white" : "bg-white text-gray-900";

    useGSAP(
        () => {
            if (!containerRef.current || textRefs.current.length === 0) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1, // Smooth scrubbing effect
                },
            });

            // Animate each word from translateY(100%) hidden below mask to 0%
            tl.fromTo(
                textRefs.current,
                { yPercent: 100, opacity: 0 },
                {
                    yPercent: 0,
                    opacity: 1,
                    stagger: 0.05,
                    ease: "power2.out",
                }
            );
        },
        { scope: containerRef }
    );

    // Split text into words for masking wrappers
    const headingWords = headingText.split(" ");
    const subWords = subtext.split(" ");

    const addToRefs = (el: HTMLSpanElement | null) => {
        if (el && !textRefs.current.includes(el)) {
            textRefs.current.push(el);
        }
    };

    return (
        <section ref={containerRef} className={`relative w-full min-h-[200vh] ${bgClass}`}>
            {/* Sticky Inner Container */}
            <div className="sticky top-0 left-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12">
                
                {/* Heading Wrapper */}
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-center leading-[1.1] mb-6 max-w-5xl flex flex-wrap justify-center gap-x-3 gap-y-2">
                    {headingWords.map((word, index) => (
                        <div key={`heading-${index}`} className="overflow-hidden relative inline-flex pb-2">
                            <span
                                ref={addToRefs}
                                className="inline-block will-change-transform transform opacity-0"
                            >
                                {word}
                            </span>
                        </div>
                    ))}
                </h2>

                {/* Subtext Wrapper */}
                <p className="text-lg md:text-2xl text-center max-w-3xl flex flex-wrap justify-center gap-x-2 gap-y-1 opacity-80">
                    {subWords.map((word, index) => (
                        <div key={`subtext-${index}`} className="overflow-hidden relative inline-flex pb-1">
                            <span
                                ref={addToRefs}
                                className="inline-block will-change-transform transform font-medium opacity-0"
                            >
                                {word}
                            </span>
                        </div>
                    ))}
                </p>
                
            </div>
        </section>
    );
};

export default ScrollTextReveal;
