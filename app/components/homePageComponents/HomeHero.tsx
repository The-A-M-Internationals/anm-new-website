"use client";

import { useRouter } from "next/navigation";
import { useLocale, useIntlayer } from "next-intlayer";
import { useEffect, useRef } from "react";
import type { AppLocale } from "@/types/locale";
import { getLocalizedPath } from "@/lib/getLocalizedPath";

const HomeHero = () => {
    const router = useRouter();
    const { locale } = useLocale();
    const content = useIntlayer("homeHero");
    const currentLocale = locale as AppLocale;

    // Animated counter refs
    const clientsRef = useRef<HTMLDivElement>(null);
    const countriesRef = useRef<HTMLDivElement>(null);
    const yearsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const animateCounter = (element: HTMLElement, target: number, suffix: string = "", duration: number = 1000) => {
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start) + suffix;
                }
            }, 16);
        };

        if (clientsRef.current) animateCounter(clientsRef.current, 150, "+", 1100);
        if (countriesRef.current) animateCounter(countriesRef.current, 12, "+", 900);
        if (yearsRef.current) animateCounter(yearsRef.current, 10, "+", 750);
    }, []);

    return (
        <>
            <style>{`
                @keyframes am-float-particle {
                    0% { transform: translate(0, 0); }
                    50% { transform: translate(var(--dx), var(--dy)); }
                    100% { transform: translate(0, 0); }
                }
                @keyframes am-glow-pulse {
                    0%, 100% { opacity: .3; }
                    50% { opacity: .7; }
                }
            `}</style>

            <section className="relative min-h-[90vh] lg:min-h-screen w-full bg-[#09132F] overflow-hidden flex items-center justify-center py-12 lg:py-0">
                {/* Background Pattern/Overlay */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    {/* Animated Particles */}
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-[#D4AF37]/10"
                            style={{
                                width: Math.random() * 6 + 2 + 'px',
                                height: Math.random() * 6 + 2 + 'px',
                                left: Math.random() * 100 + '%',
                                top: Math.random() * 100 + '%',
                                '--dx': (Math.random() - 0.5) * 100 + 'px',
                                '--dy': (Math.random() - 0.5) * 100 + 'px',
                                animation: `am-float-particle ${Math.random() * 10 + 10}s infinite ease-in-out`
                            } as any}
                        />
                    ))}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#D4AF3715_0%,transparent_70%)] opacity-60" />
                </div>

                <div className="container mx-auto px-6 lg:px-12 z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* LEFT CONTENT */}
                    <div className="w-full lg:w-3/5 text-center lg:text-left space-y-8">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                            <span className="text-white/80 text-xs md:text-sm font-medium tracking-wider uppercase">
                                {content.tagline.value} <span className="text-[#D4AF37]">{content.taglineHighlight.value}</span>
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-[76px] leading-[1.1] font-bold text-white tracking-tight">
                            Elevating the <span className="text-[#D4AF37] relative">World
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                                    <path d="M1 10.5C50 3.5 150 1.5 299 10.5" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </span>,<br />
                            Elegantly.
                        </h1>

                        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                            {content.description.value}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
                            <button
                                onClick={() => router.push(getLocalizedPath("/contact#form", currentLocale))}
                                className="w-full sm:w-auto px-10 py-4 bg-[#D4AF37] hover:bg-[#b8963e] text-[#09132F] font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_10px_20px_-10px_rgba(212,175,55,0.4)]"
                            >
                                {content.bookConsultation.value}
                            </button>
                            <button
                                onClick={() => router.push(getLocalizedPath("/services", currentLocale))}
                                className="w-full sm:w-auto px-10 py-4 bg-transparent hover:bg-white/5 text-white border-2 border-white/20 hover:border-white/40 font-bold rounded-full transition-all duration-300"
                            >
                                {content.exploreServices.value}
                            </button>
                        </div>

                        {/* STATS */}
                        <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
                            <div className="space-y-1">
                                <div ref={clientsRef} className="text-2xl md:text-3xl font-bold text-white">0+</div>
                                <div className="text-xs md:text-sm text-white/50 uppercase tracking-wider">{content.clients.value}</div>
                            </div>
                            <div className="space-y-1">
                                <div ref={countriesRef} className="text-2xl md:text-3xl font-bold text-white">0+</div>
                                <div className="text-xs md:text-sm text-white/50 uppercase tracking-wider">{content.countries.value}</div>
                            </div>
                            <div className="space-y-1">
                                <div ref={yearsRef} className="text-2xl md:text-3xl font-bold text-white">0+</div>
                                <div className="text-xs md:text-sm text-white/50 uppercase tracking-wider">{content.years.value}</div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CONTENT - FEATURE CARDS */}
                    <div className="w-full lg:w-2/5 grid grid-cols-1 gap-6 relative">
                        {/* FEATURE CARDS - STACKED DESIGN */}
                        <div
                            onClick={() => router.push(getLocalizedPath("/finance-transformation", currentLocale))}
                            className="group cursor-pointer p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-4 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">{content.financeLabel.value}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">{content.financeTitle.value}</h3>
                            <div className="flex items-center gap-2 text-white/40 text-sm group-hover:text-white/60">
                                <span>Advanced EPM Solutions</span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </div>
                        </div>

                        <div
                            onClick={() => router.push(getLocalizedPath("/digital-transformation", currentLocale))}
                            className="group cursor-pointer p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-4 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                    </svg>
                                </div>
                                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">{content.digitalLabel.value}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">{content.digitalTitle.value}</h3>
                            <div className="flex items-center gap-2 text-white/40 text-sm group-hover:text-white/60">
                                <span>Future-ready enterprise</span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </div>
                        </div>

                        <div
                            onClick={() => router.push(getLocalizedPath("/ai-automations", currentLocale))}
                            className="group cursor-pointer p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-4 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">{content.aiLabel.value}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">{content.aiTitle.value}</h3>
                            <div className="flex items-center gap-2 text-white/40 text-sm group-hover:text-white/60">
                                <span>Efficiency at scale</span>
                                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomeHero;
