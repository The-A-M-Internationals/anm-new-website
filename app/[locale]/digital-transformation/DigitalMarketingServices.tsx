"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { useIntlayer, useLocale } from "next-intlayer";
import { useState } from "react";
import { AppLocale } from "@/types/locale";

const DigitalMarketingServices = () => {
    const router = useRouter();
    const { locale } = useLocale();
    const content = useIntlayer("digitalMarketingServices");
    const [activeCard, setActiveCard] = useState<number | null>(null);

    const serviceRoutes: { [key: number]: string } = {
        1: "/services/video-production",
        2: "/services/social-media",
        3: "/services/branding-design",
        4: "/services/web-development",
        5: "/services/content-marketing",
    };

    const services = [
        {
            id: 1,
            title: content.videoProductionTitle.value,
            description: content.videoProductionDescription.value,
            services: [
                content.videoProductionService1.value,
                content.videoProductionService2.value,
                content.videoProductionService3.value,
                content.videoProductionService4.value,
            ],
            gradient: "from-pink-500/20 via-rose-500/20 to-red-500/20",
            accentColor: "#FF6B9D",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M23 7l-7 5 7 5V7z" />
                    <rect x="1" y="5" width="15" height="14" rx="2" />
                </svg>
            ),
        },
        {
            id: 2,
            title: content.socialMediaTitle.value,
            description: content.socialMediaDescription.value,
            services: [
                content.socialMediaService1.value,
                content.socialMediaService2.value,
                content.socialMediaService3.value,
                content.socialMediaService4.value,
            ],
            gradient: "from-indigo-500/20 via-purple-500/20 to-pink-500/20",
            accentColor: "#4F46E5",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="6" cy="6" r="2" />
                    <circle cx="18" cy="6" r="2" />
                    <circle cx="18" cy="18" r="2" />
                    <circle cx="6" cy="18" r="2" />
                    <line x1="12" y1="9" x2="12" y2="3" />
                    <line x1="9" y1="12" x2="3" y2="12" />
                    <line x1="12" y1="15" x2="12" y2="21" />
                    <line x1="15" y1="12" x2="21" y2="12" />
                </svg>
            ),
        },
        {
            id: 3,
            title: content.brandingTitle.value,
            description: content.brandingDescription.value,
            services: [
                content.brandingService1.value,
                content.brandingService2.value,
                content.brandingService3.value,
                content.brandingService4.value,
            ],
            gradient: "from-amber-500/20 via-yellow-500/20 to-orange-500/20",
            accentColor: "#C9A84C",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            ),
        },
        {
            id: 4,
            title: content.webDesignTitle.value,
            description: content.webDesignDescription.value,
            services: [
                content.webDesignService1.value,
                content.webDesignService2.value,
                content.webDesignService3.value,
                content.webDesignService4.value,
            ],
            gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
            accentColor: "#10B981",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                    <path d="M6 8h4M6 12h8M6 16h10" opacity="0.5" />
                </svg>
            ),
        },
        {
            id: 5,
            title: content.photographyTitle.value,
            description: content.photographyDescription.value,
            services: [
                content.photographyService1.value,
                content.photographyService2.value,
                content.photographyService3.value,
                content.photographyService4.value,
            ],
            gradient: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
            accentColor: "#FB923C",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                </svg>
            ),
        },
    ];

    return (
        <>
            <style>{`
                @keyframes card-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes orb-drift {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(15px, -15px) scale(1.1); }
                    66% { transform: translate(-10px, 10px) scale(0.9); }
                }
                @keyframes shine-sweep {
                    0% { transform: translateX(-100%) skewX(-20deg); }
                    100% { transform: translateX(200%) skewX(-20deg); }
                }
                @keyframes ripple-out {
                    0% { transform: scale(0.9); opacity: 1; }
                    100% { transform: scale(1.3); opacity: 0; }
                }
                @keyframes gradient-rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .card-hover-effect {
                    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .card-hover-effect:hover {
                    transform: translateY(-12px) scale(1.02);
                }
            `}</style>

            <section id="digital-marketing-services" className="relative py-24 md:py-32 bg-gradient-to-b from-[#08111A] via-[#0C1F4A] to-[#050A1E] overflow-hidden">
                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }} />
                </div>

                {/* Ambient gradient orbs */}
                <div className="absolute top-20 end-20 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-3xl" style={{ animation: 'orb-drift 25s ease-in-out infinite' }} />
                <div className="absolute bottom-20 start-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" style={{ animation: 'orb-drift 30s ease-in-out infinite reverse' }} />

                {/* Floating 3D Marketing Icons */}
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

                {/* Camera Icon - Top Left */}
                <div 
                    className="absolute top-[15%] start-[8%] w-20 h-20 pointer-events-none opacity-60"
                    style={{ 
                        animation: 'float-3d-1 8s ease-in-out infinite',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full rtl:-scale-x-100" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}>
                        <rect x="15" y="35" width="70" height="45" rx="8" fill="url(#camGrad)" stroke="#C9A84C" strokeWidth="2" />
                        <circle cx="50" cy="57" r="15" fill="none" stroke="#C9A84C" strokeWidth="2.5" />
                        <circle cx="50" cy="57" r="10" fill="rgba(201, 168, 76, 0.3)" />
                        <rect x="70" y="40" width="8" height="6" rx="2" fill="#C9A84C" />
                        <path d="M 30 35 L 40 25 L 60 25 L 70 35" fill="#C9A84C" opacity="0.6" />
                        <defs>
                            <linearGradient id="camGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(201, 168, 76, 0.2)" />
                                <stop offset="100%" stopColor="rgba(201, 168, 76, 0.05)" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Hashtag Icon - Top Right */}
                <div 
                    className="absolute top-[18%] end-[12%] w-16 h-16 pointer-events-none opacity-60"
                    style={{ 
                        animation: 'float-3d-2 7s ease-in-out infinite 1s',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full rtl:-scale-x-100" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}>
                        <line x1="30" y1="20" x2="20" y2="80" stroke="#A855F7" strokeWidth="8" strokeLinecap="round" />
                        <line x1="60" y1="20" x2="50" y2="80" stroke="#A855F7" strokeWidth="8" strokeLinecap="round" />
                        <line x1="70" y1="35" x2="10" y2="45" stroke="#A855F7" strokeWidth="8" strokeLinecap="round" />
                        <line x1="90" y1="55" x2="30" y2="65" stroke="#A855F7" strokeWidth="8" strokeLinecap="round" />
                    </svg>
                </div>

                {/* Play Button Icon - Left Side */}
                <div 
                    className="absolute top-[45%] start-[5%] w-24 h-24 pointer-events-none opacity-50"
                    style={{ 
                        animation: 'float-3d-3 9s ease-in-out infinite 2s',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full rtl:-scale-x-100" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}>
                        <circle cx="50" cy="50" r="40" fill="url(#playGrad)" stroke="#FF6B9D" strokeWidth="2.5" />
                        <polygon points="40,35 40,65 65,50" fill="#FF6B9D" />
                        <defs>
                            <radialGradient id="playGrad">
                                <stop offset="0%" stopColor="rgba(255, 107, 157, 0.2)" />
                                <stop offset="100%" stopColor="rgba(255, 107, 157, 0.05)" />
                            </radialGradient>
                        </defs>
                    </svg>
                </div>

                {/* Chart/Analytics Icon - Right Side */}
                <div 
                    className="absolute top-[50%] end-[8%] w-20 h-20 pointer-events-none opacity-55"
                    style={{ 
                        animation: 'float-3d-1 8.5s ease-in-out infinite 1.5s',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full rtl:-scale-x-100" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}>
                        <rect x="15" y="65" width="15" height="20" rx="2" fill="#10B981" opacity="0.8" />
                        <rect x="35" y="50" width="15" height="35" rx="2" fill="#10B981" opacity="0.9" />
                        <rect x="55" y="35" width="15" height="50" rx="2" fill="#10B981" opacity="1" />
                        <rect x="75" y="45" width="15" height="40" rx="2" fill="#10B981" opacity="0.85" />
                        <polyline points="22,60 42,45 62,30 82,40" stroke="#C9A84C" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                {/* Cursor/Click Icon - Bottom Right */}
                <div 
                    className="absolute bottom-[25%] end-[15%] w-16 h-16 pointer-events-none opacity-60"
                    style={{ 
                        animation: 'float-3d-2 7.5s ease-in-out infinite 0.5s',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full rtl:-scale-x-100" style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}>
                        <path d="M 30 20 L 30 75 L 45 60 L 55 80 L 65 75 L 55 55 L 75 55 Z" fill="url(#cursorGrad)" stroke="#C9A84C" strokeWidth="2" />
                        <defs>
                            <linearGradient id="cursorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(201, 168, 76, 0.3)" />
                                <stop offset="100%" stopColor="rgba(201, 168, 76, 0.1)" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div className="relative z-10 w-[90%] max-w-7xl mx-auto">
                    {/* Section heading */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-3 px-6 py-3 mb-6 rounded-full bg-white/5 border border-[#C9A84C]/20 backdrop-blur-xl">
                            <div className="w-2 h-2 rounded-full bg-[#C9A84C] relative">
                                <div className="absolute inset-0 rounded-full bg-[#C9A84C] animate-ping" />
                            </div>
                            <span className="text-[#C9A84C] text-sm font-semibold uppercase tracking-wider">{content.expertiseBadge.value}</span>
                        </div>
                        
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ fontFamily: "Lora, Georgia, serif" }}>
                            {content.servicesTitle.value}{" "}
                            <span className="relative inline-block">
                                <span className="bg-gradient-to-r from-[#C9A84C] via-[#D4AF37] to-[#C9A84C] bg-clip-text text-transparent">
                                    {content.servicesTitleHighlight.value}
                                </span>
                                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
                            </span>
                        </h2>
                        
                        <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                            {content.servicesSubtitle.value}
                        </p>
                    </div>

                    {/* Services grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, idx) => (
                            <div
                                key={service.id}
                                className="card-hover-effect group relative"
                                style={{
                                    animation: `card-float ${6 + idx * 0.5}s ease-in-out infinite ${idx * 0.3}s`,
                                }}
                                onMouseEnter={() => setActiveCard(service.id)}
                                onMouseLeave={() => setActiveCard(null)}
                            >
                                {/* Card */}
                                <div className="relative h-full min-h-[480px] rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10">
                                    {/* Animated gradient border */}
                                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: '1px' }}>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-3xl`} style={{ animation: 'gradient-rotate 8s linear infinite' }} />
                                        <div className="absolute inset-[1px] bg-gradient-to-b from-[#0C1F4A] to-[#050A1E] rounded-3xl" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 p-8 h-full flex flex-col">
                                        {/* Icon area with floating elements */}
                                        <div className="relative h-32 mb-6 flex items-center justify-center">
                                            {/* Rotating gradient ring */}
                                            <div 
                                                className="absolute inset-0 rounded-full opacity-20"
                                                style={{
                                                    background: `conic-gradient(from 0deg, transparent, ${service.accentColor}, transparent)`,
                                                    animation: 'gradient-rotate 6s linear infinite',
                                                }}
                                            />

                                            {/* Pulsing rings */}
                                            {activeCard === service.id && (
                                                <>
                                                    <div className="absolute inset-8 rounded-full border-2 opacity-40" style={{ borderColor: service.accentColor, animation: 'ripple-out 2s ease-out infinite' }} />
                                                    <div className="absolute inset-8 rounded-full border-2 opacity-40" style={{ borderColor: service.accentColor, animation: 'ripple-out 2s ease-out infinite 0.5s' }} />
                                                </>
                                            )}

                                            {/* Central icon */}
                                            <div 
                                                className="relative z-10 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                                                style={{ color: service.accentColor }}
                                            >
                                                {service.icon}
                                            </div>

                                            {/* Floating dots */}
                                            {[...Array(4)].map((_, i) => (
                                                <div
                                                    key={`dot-${i}`}
                                                    className="absolute w-2 h-2 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                                                    style={{
                                                        backgroundColor: service.accentColor,
                                                        top: `${20 + i * 20}%`,
                                                        left: `${15 + i * 18}%`,
                                                        animation: activeCard === service.id ? `orb-drift ${3 + i}s ease-in-out infinite ${i * 0.3}s` : 'none',
                                                    }}
                                                />
                                            ))}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center transition-colors duration-300" style={{ fontFamily: "var(--heading-font)" }}>
                                            <span className="group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/80 group-hover:bg-clip-text group-hover:text-transparent">
                                                {service.title}
                                            </span>
                                        </h3>

                                        {/* Description */}
                                        <p className="text-white/70 mb-6 leading-relaxed text-center text-sm">
                                            {service.description}
                                        </p>

                                        {/* Services list */}
                                        <div className="space-y-3 mb-6 flex-grow">
                                            {service.services.map((item, itemIdx) => (
                                                <div 
                                                    key={`service-${idx}-item-${itemIdx}`}
                                                    className="flex items-start gap-3 group/item"
                                                >
                                                    <div className="mt-1.5 flex-shrink-0">
                                                        <div 
                                                            className="w-1.5 h-1.5 rounded-full"
                                                            style={{ backgroundColor: service.accentColor }}
                                                        />
                                                    </div>
                                                    <span className="text-sm text-white/80 group-hover/item:text-white transition-colors duration-300">
                                                        {item}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA Link */}
                                        <Link 
                                            href={getLocalizedPath(locale as AppLocale, serviceRoutes[service.id])}
                                            className="relative w-full py-4 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] block text-center"
                                            style={{ backgroundColor: service.accentColor }}
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {content.learnMore.value}
                                                <svg 
                                                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 rtl:-rotate-180" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </span>
                                            
                                            {/* Shine effect */}
                                            <div 
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                                                style={{ animation: activeCard === service.id ? 'shine-sweep 2s ease-in-out infinite' : 'none' }}
                                            />
                                        </Link>
                                    </div>

                                    {/* Corner glow accents */}
                                    <div 
                                        className="absolute top-0 end-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500"
                                        style={{ backgroundColor: service.accentColor }}
                                    />
                                    <div 
                                        className="absolute bottom-0 start-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500"
                                        style={{ backgroundColor: service.accentColor }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default DigitalMarketingServices;