"use client";

import { useRouter } from "next/navigation";
import { useIntlayer, useLocale } from "next-intlayer";
import { useEffect, useRef } from "react";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import Link from "next/link";
import { AppLocale } from "@/types/locale";

import { handleHashLink } from "@/lib/handleHashLink";
import SplitText from "../SplitText";

const HomeHero = () => {
    const router = useRouter();
    const { locale } = useLocale();
    const content = useIntlayer("homeHero");

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
        <section 
            className="relative w-full h-[calc(100vh-80px)] min-h-[650px] flex items-center bg-cover bg-no-repeat overflow-hidden"
            style={{ backgroundImage: "url('/hero-bg.png')", backgroundPosition: "center bottom" }}
        >
            {/* Elegant Gradient Overlay - darker on the right for text readability, keeping the left logo visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#050E30]/10 via-[#050E30]/60 to-[#050E30]/95" />
            <div className="absolute inset-0 bg-black/20" />

            {/* Content Container */}
            <div className="relative z-10 w-[95%] max-w-7xl mx-auto h-full">
                <div className="flex justify-end items-center h-full">
                    
                    {/* Right Side - Glassmorphic Content Panel */}
                    <div className="w-full lg:w-[55%] xl:w-[50%] animate-fade-in-up">
                        <div className="bg-[#050E30]/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-6 md:p-8">
                            
                            {/* Main Copy */}
                            <h1 
                                className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white mb-3 leading-[1.2]"
                                style={{ fontFamily: "Lora, Georgia, serif" }}
                            >
                                <SplitText
                                    text={content.tagline.value + " "}
                                    tag="span"
                                    className="inline"
                                    delay={40}
                                    duration={1.5}
                                    from={{ opacity: 0, y: 15 }}
                                />
                                <SplitText
                                    text={content.taglineHighlight.value}
                                    tag="span"
                                    className="inline text-[#C9A84C]"
                                    delay={40}
                                    duration={1.5}
                                    from={{ opacity: 0, y: 15 }}
                                    to={{ opacity: 1, y: 0, delay: 1.2 }}
                                />
                            </h1>
                            <p className="text-sm md:text-base text-white/80 mb-6 leading-relaxed font-light">
                                {content.description.value}
                            </p>
                            
                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                                <Link
                                    href={getLocalizedPath(locale as AppLocale, "/contact#form")}
                                    onClick={(e) => handleHashLink(e, getLocalizedPath(locale as AppLocale, "/contact#form"), router)}
                                    className="flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-[#C9A84C] to-[#E3C973] text-[#050E30] rounded-lg text-sm font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                                >
                                    {content.bookConsultation.value}
                                </Link>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const servicesSection = document.getElementById('services');
                                        if (servicesSection) {
                                            servicesSection.scrollIntoView({ behavior: 'smooth' });
                                        } else {
                                            router.push(getLocalizedPath(locale as AppLocale, "/#services"));
                                        }
                                    }}
                                    className="px-6 py-2.5 bg-white/5 backdrop-blur-sm text-[#C9A84C] border border-[#C9A84C]/50 rounded-lg text-sm font-bold shadow-lg hover:bg-[#C9A84C]/10 hover:border-[#C9A84C] transition-all duration-300"
                                >
                                    {content.exploreServices.value}
                                </button>
                            </div>
                            
                            {/* Divider */}
                            <div className="h-[1px] w-full bg-gradient-to-r from-white/20 via-white/10 to-transparent mb-6" />

                            {/* Metrics Area */}
                            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                                <div>
                                    <div ref={clientsRef} className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: "Lora, Georgia, serif" }}>0+</div>
                                    <div className="text-[10px] md:text-xs text-[#C9A84C] uppercase tracking-wider font-semibold">{content.clients.value}</div>
                                </div>
                                <div>
                                    <div ref={countriesRef} className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: "Lora, Georgia, serif" }}>0+</div>
                                    <div className="text-[10px] md:text-xs text-[#C9A84C] uppercase tracking-wider font-semibold">{content.countries.value}</div>
                                </div>
                                <div>
                                    <div ref={yearsRef} className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ fontFamily: "Lora, Georgia, serif" }}>0+</div>
                                    <div className="text-[10px] md:text-xs text-[#C9A84C] uppercase tracking-wider font-semibold">{content.years.value}</div>
                                </div>
                            </div>

                            {/* Beautiful Mini Cards Row for Services */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {/* Finance Card */}
                                <div 
                                    onClick={() => router.push(getLocalizedPath(locale as AppLocale, "/finance-transformation"))}
                                    className="group cursor-pointer p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#C9A84C]/50 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-colors mb-1">
                                        {content.financeLabel.value}
                                    </div>
                                    <div className="text-xs font-bold text-white group-hover:text-[#C9A84C] transition-colors leading-tight">
                                        {content.financeTitle.value}
                                    </div>
                                </div>

                                {/* Digital Card */}
                                <div 
                                    onClick={() => router.push(getLocalizedPath(locale as AppLocale, "/digital-transformation"))}
                                    className="group cursor-pointer p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#4AADDA]/50 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-colors mb-1">
                                        {content.digitalLabel.value}
                                    </div>
                                    <div className="text-xs font-bold text-white group-hover:text-[#4AADDA] transition-colors leading-tight">
                                        {content.digitalTitle.value}
                                    </div>
                                </div>

                                {/* AI Card */}
                                <div 
                                    onClick={() => router.push(getLocalizedPath(locale as AppLocale, "/ai-automations"))}
                                    className="group cursor-pointer p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#9B79E0]/50 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div className="text-[9px] font-bold uppercase tracking-widest text-white/50 group-hover:text-white/80 transition-colors mb-1">
                                        {content.aiLabel.value}
                                    </div>
                                    <div className="text-xs font-bold text-white group-hover:text-[#9B79E0] transition-colors leading-tight">
                                        {content.aiTitle.value}
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </section>
    );
};

export default HomeHero;