"use client";

import { useRouter } from "next/navigation";
import { useIntlayer, useLocale } from "next-intlayer";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import FlowLines from "@/app/components/FlowLines";
import { AppLocale } from "@/types/locale";
import { handleHashLink } from "@/lib/handleHashLink";

const AIAutomationsHero = () => {
    const router = useRouter();
    const { locale } = useLocale();
    const content = useIntlayer("aiAutomations");
    return (
        <>
            <section className="relative overflow-hidden bg-[radial-gradient(120%_100%_at_50%_0%,#0d1c58,#050b26_70%)] min-h-[85vh] flex items-center">
                {/* Backdrop: slow flowing lines, with a soft dark pool behind the text */}
                <FlowLines />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_48%,rgba(5,11,38,0.78),transparent)]" />

                {/* Main content */}
                <div 
                    className="relative z-10 w-[90%] max-w-6xl mx-auto text-center py-24 md:pt-32 md:pb-40"
                    style={{ animation: 'elegant-rise 1.2s ease-out' }}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-10 rounded-full bg-white/5 border border-[#1E40AF]/30 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                            style={{ animation: 'shimmer 4s ease-in-out infinite' }}
                        />
                        <div className="relative w-2 h-2">
                            <div className="absolute inset-0 rounded-full bg-[#1E40AF]" />
                            <div className="absolute inset-0 rounded-full bg-[#1E40AF] animate-ping" />
                        </div>
                        <span className="relative text-[#93C5FD] text-sm font-semibold tracking-wide">{content.heroBadge.value}</span>
                    </div>

                    {/* Main heading */}
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "var(--heading-font)" }}>
                        {content.heroTitle.value}
                        <br />
                        <span className="relative inline-block mt-4">
                            <span 
                                className="bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent"
                                style={{
                                    backgroundSize: '200% auto',
                                    animation: 'gradient-flow 5s ease infinite',
                                }}
                            >
                                {content.heroSubtitle.value}
                            </span>
                            <div className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E40AF] to-transparent overflow-hidden">
                                <div 
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-32"
                                    style={{ animation: 'shimmer 3s ease-in-out infinite' }}
                                />
                            </div>
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
                        {content.heroDescription.value}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center px-4">
                        <button
                            onClick={() => {
                                const servicesSection = document.getElementById('ai-automation-services');
                                servicesSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative w-full sm:w-auto cursor-pointer px-12 py-5 bg-[#1E40AF] text-white rounded-2xl text-lg font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#1E40AF]/40 hover:-translate-y-1 flex justify-center"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                style={{ animation: 'shimmer 3s ease-in-out infinite' }}
                            />
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {content.exploreServices.value}
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </button>
                        <button
                            onClick={(e) => {
                                const link = getLocalizedPath(locale as AppLocale, "/contact#form");
                                if (!handleHashLink(e, link, router)) {
                                    router.push(link);
                                }
                            }}
                            className="group relative w-full sm:w-auto cursor-pointer px-12 py-5 bg-transparent text-white border-2 border-white/20 rounded-2xl text-lg font-semibold backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#1E40AF]/50 hover:-translate-y-1 flex justify-center"
                        >
                            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <span className="relative z-10 flex items-center justify-center">{content.bookConsultation.value}</span>
                        </button>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="hidden md:block absolute bottom-12 left-1/2 -translate-x-1/2">
                    <div className="flex flex-col items-center gap-3 animate-bounce">
                        <span className="text-[#1E40AF]/50 text-xs uppercase tracking-widest font-light">{content.scroll.value}</span>
                        <div className="w-px h-12 bg-gradient-to-b from-[#1E40AF]/50 to-transparent" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default AIAutomationsHero;