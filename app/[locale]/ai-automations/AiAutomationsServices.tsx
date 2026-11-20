"use client";

import Link from "next/link"
import { useRouter, useParams } from "next/navigation";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { handleHashLink } from "@/lib/handleHashLink";
import { useIntlayer } from "next-intlayer";
import { useState } from "react";
import { AppLocale } from "@/types/locale";
import FlowLines from "@/app/components/FlowLines";

const AiAutomationsServices = () => {
    const router = useRouter();
    const params = useParams();
    const locale = (params?.locale as string) || "en";
    const content = useIntlayer("aiAutomations");
    const [activeCard, setActiveCard] = useState<number | null>(null);

    const contactHref = getLocalizedPath(locale as AppLocale, "/contact#form");
    const learnMoreHref = getLocalizedPath(locale as AppLocale, "/features");

    const services = [
        {
            id: 1,
            title: content.buildAgentTitle.value,
            badge: content.comingSoon.value,
            description: content.buildAgentDescription.value,
            services: [
                content.buildAgentService1.value,
                content.buildAgentService2.value,
                content.buildAgentService3.value,
            ],
            href: getLocalizedPath(locale as AppLocale, "/features"),
            gradient: "from-blue-900/20 via-blue-800/20 to-blue-700/20",
            accentColor: "#2563EB",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                    <path d="M2 17L12 22L22 17" />
                    <path d="M2 12L12 17L22 12" />
                </svg>
            ),
        },
        {
            id: 2,
            title: content.epmAutomationTitle.value,
            badge: null,
            description: content.epmAutomationDescription.value,
            services: [
                content.epmAutomationService1.value,
                content.epmAutomationService2.value,
                content.epmAutomationService3.value,
            ],
            href: contactHref,
            gradient: "from-indigo-900/20 via-indigo-800/20 to-blue-900/20",
            accentColor: "#3B82F6",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
            ),
        },
        {
            id: 3,
            title: content.ociAITitle.value,
            badge: null,
            description: content.ociAIDescription.value,
            services: [
                content.ociAIService1.value,
                content.ociAIService2.value,
                content.ociAIService3.value,
            ],
            href: contactHref,
            gradient: "from-blue-800/20 via-indigo-900/20 to-blue-900/20",
            accentColor: "#60A5FA",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                </svg>
            ),
        },
    ];

    return (
        <>
            <style>{`
                @keyframes card-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes gradient-rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes ripple-out {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(2); opacity: 0; }
                }
                @keyframes shine-sweep {
                    0% { transform: translateX(-100%) skewX(-15deg); }
                    100% { transform: translateX(200%) skewX(-15deg); }
                }
            `}</style>

            <section id="ai-automation-services" className="relative py-16 md:py-24 bg-[#050b26] overflow-hidden">
                {/* Backdrop: the same flowing lines as the hero above */}
                <FlowLines />

                <div className="relative z-10 w-[90%] max-w-7xl mx-auto">
                    {/* Section header */}
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "var(--heading-font)" }}>
                            {content.servicesTitle.value}
                        </h2>
                        <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto">
                            {content.servicesSubtitle.value}
                        </p>
                    </div>

                    {/* Services grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className={`group relative ${index === services.length - 1 ? "md:col-span-2 md:w-[calc(50%-1rem)] md:mx-auto lg:col-span-1 lg:w-auto" : ""}`}
                                style={{ animation: `card-float ${6 + index * 0.5}s ease-in-out infinite ${index * 0.2}s` }}
                                onMouseEnter={() => setActiveCard(service.id)}
                                onMouseLeave={() => setActiveCard(null)}
                            >
                                {/* Card background with gradient ring */}
                                <div className="relative h-full bg-gradient-to-br from-[#0F1F3D]/40 via-[#0A1628]/60 to-[#050A1E]/80 rounded-3xl border border-white/10 overflow-hidden transform-gpu transition-[transform,opacity,box-shadow,border-color] duration-500 group-hover:border-white/20 group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                                    
                                    {/* Rotating gradient ring */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        {/* Spins only while hovered (it's invisible otherwise), so it costs no frames during scroll */}
                                        <div
                                            className={`absolute inset-[-2px] bg-gradient-to-r ${service.gradient} rounded-3xl [animation-play-state:paused] group-hover:[animation-play-state:running]`}
                                            style={{ animationName: 'gradient-rotate', animationDuration: '8s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' }}
                                        />
                                        <div className="absolute inset-[2px] bg-gradient-to-br from-[#0F1F3D] via-[#0A1628] to-[#050A1E] rounded-3xl" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative p-8 h-full flex flex-col">
                                        {/* Icon with glass background */}
                                        <div className="relative mb-6">
                                            <div 
                                                className="w-20 h-20 rounded-2xl flex items-center justify-center"
                                                style={{
                                                    background: `linear-gradient(135deg, ${service.accentColor}15 0%, ${service.accentColor}05 100%)`,
                                                    border: `1px solid ${service.accentColor}30`,
                                                    color: service.accentColor,
                                                }}
                                            >
                                                {service.icon}
                                            </div>

                                            {/* Pulsing ripple on hover */}
                                            {activeCard === service.id && (
                                                <div className="absolute inset-0 rounded-2xl" style={{ borderColor: service.accentColor }}>
                                                    <div className="absolute inset-0 border-2 rounded-2xl" style={{ borderColor: service.accentColor, animation: 'ripple-out 2s ease-out infinite' }} />
                                                </div>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--heading-font)" }}>
                                            {service.title}
                                            {service.badge && (
                                                <span
                                                    className="ms-3 inline-block align-middle px-3 py-1 rounded-full text-xs font-semibold"
                                                    style={{ color: service.accentColor, border: `1px solid ${service.accentColor}50`, background: `${service.accentColor}15` }}
                                                >
                                                    {service.badge}
                                                </span>
                                            )}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-white/60 mb-6 leading-relaxed">
                                            {service.description}
                                        </p>

                                        {/* Services list */}
                                        <ul className="space-y-3 mt-auto">
                                            {service.services.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-white/70 group-hover:text-white/90 transition-colors">
                                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: service.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-sm">{item}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Corner accent */}
                                        <div className="absolute top-4 end-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle, ${service.accentColor} 0%, transparent 70%)` }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* One shared Learn more for all three cards → the EPM Build Agent page */}
                    <div className="mt-14 flex justify-center">
                        <Link
                            href={learnMoreHref}
                            onClick={(e) => handleHashLink(e, learnMoreHref, router)}
                            className="group/btn relative overflow-hidden cursor-pointer px-10 py-4 rounded-xl text-base font-semibold text-white text-center transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20"
                            style={{ background: "linear-gradient(135deg, #2563EB33 0%, #2563EB14 100%)", border: "1px solid #3B82F650" }}
                        >
                            <span className="relative z-10">{content.learnMore.value}</span>
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 [animation-play-state:paused] group-hover/btn:[animation-play-state:running]"
                                style={{ animationName: 'shine-sweep', animationDuration: '2s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite' }}
                            />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AiAutomationsServices;