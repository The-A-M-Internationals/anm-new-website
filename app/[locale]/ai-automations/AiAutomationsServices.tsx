"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { useIntlayer } from "next-intlayer";
import { useState } from "react";
import { AppLocale } from "@/types/locale";

const AiAutomationsServices = () => {
    const router = useRouter();
    const params = useParams();
    const locale = (params?.locale as string) || "en";
    const content = useIntlayer("aiAutomations");
    const [activeCard, setActiveCard] = useState<number | null>(null);

    const serviceRoutes: { [key: number]: string } = {
        1: "/services/machine-learning",
        2: "/services/rpa",
        3: "/services/nlp",
        4: "/services/computer-vision",
        5: "/services/generative-ai",
    };

    const services = [
        {
            id: 1,
            title: content.mlTitle.value,
            description: content.mlDescription.value,
            services: [
                content.mlService1.value,
                content.mlService2.value,
                content.mlService3.value,
                content.mlService4.value,
            ],
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
            title: content.rpaTitle.value,
            description: content.rpaDescription.value,
            services: [
                content.rpaService1.value,
                content.rpaService2.value,
                content.rpaService3.value,
                content.rpaService4.value,
            ],
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
            title: content.nlpTitle.value,
            description: content.nlpDescription.value,
            services: [
                content.nlpService1.value,
                content.nlpService2.value,
                content.nlpService3.value,
                content.nlpService4.value,
            ],
            gradient: "from-sky-900/20 via-blue-900/20 to-indigo-900/20",
            accentColor: "#1E40AF",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" />
                </svg>
            ),
        },
        {
            id: 4,
            title: content.cvTitle.value,
            description: content.cvDescription.value,
            services: [
                content.cvService1.value,
                content.cvService2.value,
                content.cvService3.value,
                content.cvService4.value,
            ],
            gradient: "from-cyan-900/20 via-sky-900/20 to-blue-900/20",
            accentColor: "#0EA5E9",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            ),
        },
        {
            id: 5,
            title: content.genAITitle.value,
            description: content.genAIDescription.value,
            services: [
                content.genAIService1.value,
                content.genAIService2.value,
                content.genAIService3.value,
                content.genAIService4.value,
            ],
            gradient: "from-blue-800/20 via-indigo-900/20 to-blue-900/20",
            accentColor: "#60A5FA",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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
                @keyframes orb-drift {
                    0%, 100% { transform: translate(0, 0); }
                    33% { transform: translate(20px, -20px); }
                    66% { transform: translate(-15px, 15px); }
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

            <section id="ai-automation-services" className="relative py-24 md:py-32 bg-gradient-to-b from-[#050A1E] via-[#0F1F3D] to-[#0A1628] overflow-hidden">
                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(37,99,235,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.3) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }} />
                </div>

                {/* Ambient gradient orbs */}
                <div className="absolute top-20 right-20 w-96 h-96 bg-[#2563EB]/10 rounded-full blur-3xl" style={{ animation: 'orb-drift 25s ease-in-out infinite' }} />
                <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#1E40AF]/10 rounded-full blur-3xl" style={{ animation: 'orb-drift 30s ease-in-out infinite reverse' }} />

                {/* Floating 3D AI Icons */}
                <style>{`
                    @keyframes float-3d-1 {
                        0%, 100% { transform: translateY(0) translateZ(0) rotateX(0deg) rotateY(0deg); }
                        50% { transform: translateY(-30px) translateZ(20px) rotateX(10deg) rotateY(15deg); }
                    }
                    @keyframes float-3d-2 {
                        0%, 100% { transform: translateY(0) translateZ(0) rotateX(0deg) rotateZ(0deg); }
                        50% { transform: translateY(-25px) translateZ(15px) rotateX(-10deg) rotateZ(-10deg); }
                    }
                    @keyframes float-3d-3 {
                        0%, 100% { transform: translateY(0) translateZ(0) rotateY(0deg); }
                        50% { transform: translateY(-35px) translateZ(25px) rotateY(20deg); }
                    }
                `}</style>

                {/* Brain/AI Icon - Top Left */}
                <div 
                    className="absolute top-[15%] start-[8%] w-20 h-20 pointer-events-none opacity-50"
                    style={{ 
                        animation: 'float-3d-1 8s ease-in-out infinite',
                        transformStyle: 'preserve-3d',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full rtl:-scale-x-100">
                        <path d="M 50 20 Q 65 20 75 35 Q 80 45 78 55 Q 75 65 68 72 Q 58 80 50 78 Q 42 80 32 72 Q 25 65 22 55 Q 20 45 25 35 Q 35 20 50 20" 
                            fill="rgba(37, 99, 235, 0.2)" 
                            stroke="#2563EB" 
                            strokeWidth="2" 
                        />
                        {[{x: 35, y: 40}, {x: 50, y: 35}, {x: 65, y: 40}, {x: 40, y: 55}, {x: 50, y: 50}, {x: 60, y: 55}].map((pos, i) => (
                            <circle key={`brain-${i}`} cx={pos.x} cy={pos.y} r="3" fill="#3B82F6">
                                <animate attributeName="r" values="3;5;3" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
                            </circle>
                        ))}
                    </svg>
                </div>

                {/* Circuit Chip Icon - Top Right */}
                <div 
                    className="absolute top-[18%] end-[12%] w-18 h-18 pointer-events-none opacity-45"
                    style={{ 
                        animation: 'float-3d-2 7s ease-in-out infinite 1s',
                        transformStyle: 'preserve-3d',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full rtl:-scale-x-100">
                        <rect x="30" y="30" width="40" height="40" rx="4" fill="rgba(30, 64, 175, 0.2)" stroke="#1E40AF" strokeWidth="2" />
                        <line x1="40" y1="30" x2="40" y2="20" stroke="#2563EB" strokeWidth="2" />
                        <line x1="50" y1="30" x2="50" y2="20" stroke="#2563EB" strokeWidth="2" />
                        <line x1="60" y1="30" x2="60" y2="20" stroke="#2563EB" strokeWidth="2" />
                        <line x1="40" y1="70" x2="40" y2="80" stroke="#2563EB" strokeWidth="2" />
                        <line x1="50" y1="70" x2="50" y2="80" stroke="#2563EB" strokeWidth="2" />
                        <line x1="60" y1="70" x2="60" y2="80" stroke="#2563EB" strokeWidth="2" />
                        <circle cx="50" cy="50" r="8" fill="#3B82F6" opacity="0.6" />
                    </svg>
                </div>

                {/* Robot Icon - Left Side */}
                <div 
                    className="absolute top-[45%] start-[5%] w-24 h-24 pointer-events-none opacity-40"
                    style={{ 
                        animation: 'float-3d-3 9s ease-in-out infinite 2s',
                        transformStyle: 'preserve-3d',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full rtl:-scale-x-100">
                        <rect x="30" y="35" width="40" height="40" rx="6" fill="rgba(59, 130, 246, 0.2)" stroke="#3B82F6" strokeWidth="2" />
                        <circle cx="42" cy="50" r="4" fill="#60A5FA" />
                        <circle cx="58" cy="50" r="4" fill="#60A5FA" />
                        <rect x="43" y="60" width="14" height="3" rx="1.5" fill="#2563EB" />
                        <circle cx="50" cy="25" r="3" fill="#1E40AF" />
                        <line x1="50" y1="28" x2="50" y2="35" stroke="#2563EB" strokeWidth="2" />
                        <rect x="25" y="45" width="5" height="15" rx="2" fill="#2563EB" opacity="0.7" />
                        <rect x="70" y="45" width="5" height="15" rx="2" fill="#2563EB" opacity="0.7" />
                    </svg>
                </div>

                {/* Neural Network Icon - Right Side */}
                <div 
                    className="absolute top-[50%] end-[8%] w-20 h-20 pointer-events-none opacity-50"
                    style={{ 
                        animation: 'float-3d-1 8.5s ease-in-out infinite 1.5s',
                        transformStyle: 'preserve-3d',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full rtl:-scale-x-100">
                        {/* Left layer */}
                        <circle cx="20" cy="50" r="5" fill="#2563EB" opacity="0.8" />
                        {/* Middle layer */}
                        <circle cx="50" cy="30" r="5" fill="#3B82F6" opacity="0.8" />
                        <circle cx="50" cy="50" r="5" fill="#3B82F6" opacity="0.8" />
                        <circle cx="50" cy="70" r="5" fill="#3B82F6" opacity="0.8" />
                        {/* Right layer */}
                        <circle cx="80" cy="50" r="5" fill="#60A5FA" opacity="0.8" />
                        {/* Connections */}
                        <line x1="20" y1="50" x2="50" y2="30" stroke="#2563EB" strokeWidth="1" opacity="0.4" />
                        <line x1="20" y1="50" x2="50" y2="50" stroke="#2563EB" strokeWidth="1" opacity="0.4" />
                        <line x1="20" y1="50" x2="50" y2="70" stroke="#2563EB" strokeWidth="1" opacity="0.4" />
                        <line x1="50" y1="30" x2="80" y2="50" stroke="#3B82F6" strokeWidth="1" opacity="0.4" />
                        <line x1="50" y1="50" x2="80" y2="50" stroke="#3B82F6" strokeWidth="1" opacity="0.4" />
                        <line x1="50" y1="70" x2="80" y2="50" stroke="#3B82F6" strokeWidth="1" opacity="0.4" />
                    </svg>
                </div>

                {/* Code Brackets Icon - Bottom Right */}
                <div 
                    className="absolute bottom-[25%] end-[15%] w-16 h-16 pointer-events-none opacity-45"
                    style={{ 
                        animation: 'float-3d-2 7.5s ease-in-out infinite 0.5s',
                        transformStyle: 'preserve-3d',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full rtl:-scale-x-100">
                        <path d="M 30 30 L 20 50 L 30 70" stroke="#2563EB" strokeWidth="3" fill="none" strokeLinecap="round" />
                        <path d="M 70 30 L 80 50 L 70 70" stroke="#2563EB" strokeWidth="3" fill="none" strokeLinecap="round" />
                        <line x1="55" y1="25" x2="45" y2="75" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                </div>

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
                                className="group relative"
                                style={{ animation: `card-float ${6 + index * 0.5}s ease-in-out infinite ${index * 0.2}s` }}
                                onMouseEnter={() => setActiveCard(service.id)}
                                onMouseLeave={() => setActiveCard(null)}
                            >
                                {/* Card background with gradient ring */}
                                <div className="relative h-full bg-gradient-to-br from-[#0F1F3D]/40 via-[#0A1628]/60 to-[#050A1E]/80 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-blue-500/20">
                                    
                                    {/* Rotating gradient ring */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div 
                                            className={`absolute inset-[-2px] bg-gradient-to-r ${service.gradient} rounded-3xl`}
                                            style={{ animation: 'gradient-rotate 8s linear infinite' }}
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
                                        </h3>

                                        {/* Description */}
                                        <p className="text-white/60 mb-6 leading-relaxed">
                                            {service.description}
                                        </p>

                                        {/* Services list */}
                                        <ul className="space-y-3 mt-auto">
                                            {service.services.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-white/70 group-hover:text-white/90 transition-colors">
                                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0 rtl:rotate-180" style={{ color: service.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    <span className="text-sm">{item}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Learn more link */}
                                        <Link 
                                            href={getLocalizedPath(locale as AppLocale, serviceRoutes[service.id])}
                                            className="mt-6 px-6 py-3 rounded-xl text-sm font-semibold text-white relative overflow-hidden group/btn transition-all duration-300 inline-block text-center"
                                            style={{
                                                background: `linear-gradient(135deg, ${service.accentColor}20 0%, ${service.accentColor}10 100%)`,
                                                border: `1px solid ${service.accentColor}30`,
                                            }}
                                        >
                                            <span className="relative z-10">{content.learnMore.value}</span>
                                            <div 
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100"
                                                style={{ animation: 'shine-sweep 2s ease-in-out infinite' }}
                                            />
                                        </Link>

                                        {/* Corner accent */}
                                        <div className="absolute top-4 end-4 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle, ${service.accentColor} 0%, transparent 70%)` }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AiAutomationsServices;