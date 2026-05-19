"use client";

import { useRouter } from "next/navigation";
import { useIntlayer, useLocale } from "next-intlayer";
import { useEffect, useRef } from "react";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import Link from "next/link";
import { AppLocale } from "@/types/locale";

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
                @keyframes am-orbit {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes am-float-a {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }
                @keyframes am-float-b {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                @keyframes am-float-c {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes am-node-pulse {
                    0%, 100% { opacity: .5; }
                    50% { opacity: 1; }
                }
                @keyframes am-dash-flow {
                    from { stroke-dashoffset: 0; }
                    to { stroke-dashoffset: -10; }
                }
                @keyframes am-node-expand {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.33); }
                }
                @keyframes am-ring-pulse {
                    0%, 100% { opacity: .4; }
                    50% { opacity: .8; }
                }
                @keyframes am-ring-pulse2 {
                    0%, 100% { opacity: .3; }
                    50% { opacity: .6; }
                }
                @keyframes am-neural-blink {
                    0%, 100% { opacity: .3; }
                    50% { opacity: 1; }
                }
            `}</style>

            <section className="relative overflow-hidden min-h-screen flex items-center" style={{ background: "linear-gradient(140deg, #061540 0%, #0C2060 50%, #050E30 100%)" }}>
                
                {/* Animated background layer */}
                <svg 
                    className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" 
                    viewBox="0 0 1200 600" 
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern id="diagonalGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 60" stroke="rgba(201,168,76,.15)" strokeWidth=".5" fill="none" />
                            <path d="M 0 0 L 60 60" stroke="rgba(201,168,76,.08)" strokeWidth=".5" fill="none" />
                        </pattern>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(201,168,76,0)" />
                            <stop offset="50%" stopColor="rgba(201,168,76,0.6)" />
                            <stop offset="100%" stopColor="rgba(201,168,76,0)" />
                        </linearGradient>
                    </defs>
                    <rect width="1200" height="600" fill="url(#diagonalGrid)" />
                    
                    {/* Enhanced network nodes with glow */}
                    <circle cx="180" cy="120" r="3" fill="#C9A84C" filter="url(#glow)" style={{ animation: "am-node-pulse 2.5s ease-in-out infinite" }} />
                    <circle cx="340" cy="80" r="3" fill="#C9A84C" filter="url(#glow)" style={{ animation: "am-node-pulse 2.8s ease-in-out infinite .5s" }} />
                    <circle cx="520" cy="140" r="3" fill="#C9A84C" filter="url(#glow)" style={{ animation: "am-node-pulse 2.3s ease-in-out infinite 1s" }} />
                    <circle cx="240" cy="380" r="3" fill="#C9A84C" filter="url(#glow)" style={{ animation: "am-node-pulse 2.6s ease-in-out infinite .3s" }} />
                    <circle cx="420" cy="480" r="3" fill="#C9A84C" filter="url(#glow)" style={{ animation: "am-node-pulse 2.4s ease-in-out infinite .8s" }} />
                    <circle cx="700" cy="200" r="3" fill="#4AADDA" filter="url(#glow)" style={{ animation: "am-node-pulse 2.7s ease-in-out infinite .4s" }} />
                    <circle cx="900" cy="350" r="3" fill="#9B79E0" filter="url(#glow)" style={{ animation: "am-node-pulse 2.5s ease-in-out infinite 1.2s" }} />
                    
                    {/* Connection lines with animated dashes */}
                    <line x1="180" y1="120" x2="340" y2="80" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="8 8" style={{ animation: "am-dash-flow 3s linear infinite" }} />
                    <line x1="340" y1="80" x2="520" y2="140" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="8 8" style={{ animation: "am-dash-flow 3s linear infinite .5s" }} />
                    <line x1="520" y1="140" x2="700" y2="200" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="8 8" style={{ animation: "am-dash-flow 3s linear infinite 1s" }} />
                    <line x1="240" y1="380" x2="420" y2="480" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="8 8" style={{ animation: "am-dash-flow 3s linear infinite 1.5s" }} />
                    <line x1="700" y1="200" x2="900" y2="350" stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="8 8" style={{ animation: "am-dash-flow 3s linear infinite .7s" }} />
                    
                    {/* Traveling data packets along paths */}
                    <circle r="4" fill="#C9A84C" filter="url(#glow)">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M 180 120 L 340 80 L 520 140" />
                        <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" />
                    </circle>
                    <circle r="4" fill="#4AADDA" filter="url(#glow)">
                        <animateMotion dur="5s" repeatCount="indefinite" path="M 520 140 L 700 200 L 900 350" />
                        <animate attributeName="opacity" values="0;1;1;0" dur="5s" repeatCount="indefinite" />
                    </circle>
                    <circle r="4" fill="#9B79E0" filter="url(#glow)">
                        <animateMotion dur="4.5s" repeatCount="indefinite" path="M 240 380 L 420 480" />
                        <animate attributeName="opacity" values="0;1;1;0" dur="4.5s" repeatCount="indefinite" />
                    </circle>
                </svg>

                {/* Animated expanding rings */}
                <div className="absolute top-[20%] left-[30%] w-64 h-64 pointer-events-none hidden lg:block">
                    <style>{`
                        @keyframes am-ring-expand {
                            0% { transform: scale(0.5); opacity: 0.6; }
                            100% { transform: scale(2); opacity: 0; }
                        }
                    `}</style>
                    {[0, 1, 2].map((i) => (
                        <div
                            key={`ring-${i}`}
                            className="absolute inset-0 rounded-full border border-[#C9A84C]"
                            style={{
                                animation: `am-ring-expand 4s ease-out infinite ${i * 1.3}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Pulsing gradient orbs */}
                <div 
                    className="absolute top-[15%] right-[20%] w-48 h-48 rounded-full pointer-events-none hidden lg:block"
                    style={{
                        background: 'radial-gradient(circle, rgba(74,173,218,0.15) 0%, transparent 70%)',
                        animation: 'am-glow-pulse 6s ease-in-out infinite',
                        filter: 'blur(30px)',
                    }}
                />
                <div 
                    className="absolute bottom-[25%] right-[15%] w-56 h-56 rounded-full pointer-events-none hidden lg:block"
                    style={{
                        background: 'radial-gradient(circle, rgba(155,121,224,0.12) 0%, transparent 70%)',
                        animation: 'am-glow-pulse 7s ease-in-out infinite 2s',
                        filter: 'blur(35px)',
                    }}
                />

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[
                        { left: "12%", top: "20%", size: 6, dx: "30px", dy: "-40px", dur: "8s", delay: "0s", opacity: .3 },
                        { left: "25%", top: "60%", size: 4, dx: "-20px", dy: "30px", dur: "7s", delay: ".5s", opacity: .4 },
                        { left: "38%", top: "35%", size: 5, dx: "25px", dy: "35px", dur: "9s", delay: "1s", opacity: .25 },
                        { left: "15%", top: "75%", size: 3, dx: "-30px", dy: "-25px", dur: "6.5s", delay: "1.5s", opacity: .5 },
                        { left: "8%", top: "45%", size: 4, dx: "20px", dy: "-30px", dur: "7.5s", delay: ".8s", opacity: .35 },
                    ].map((p, i) => (
                        <div
                            key={`left-${i}`}
                            className="absolute rounded-full"
                            style={{
                                left: p.left,
                                top: p.top,
                                width: p.size,
                                height: p.size,
                                background: `rgba(201,168,76,${p.opacity})`,
                                animation: `am-float-particle ${p.dur} ease-in-out infinite ${p.delay}`,
                                // @ts-expect-error
                                "--dx": p.dx,
                                "--dy": p.dy,
                            }}
                        />
                    ))}
                    {[
                        { right: "15%", top: "25%", size: 5, dx: "-25px", dy: "40px", dur: "8.5s", delay: "0s", opacity: .4 },
                        { right: "28%", top: "55%", size: 4, dx: "30px", dy: "-35px", dur: "7s", delay: ".7s", opacity: .3 },
                        { right: "22%", top: "70%", size: 6, dx: "-20px", dy: "30px", dur: "9s", delay: "1.2s", opacity: .25 },
                        { right: "35%", top: "15%", size: 3, dx: "25px", dy: "-20px", dur: "6s", delay: ".4s", opacity: .45 },
                    ].map((p, i) => (
                        <div
                            key={`right-${i}`}
                            className="absolute rounded-full"
                            style={{
                                right: p.right,
                                top: p.top,
                                width: p.size,
                                height: p.size,
                                background: `rgba(201,168,76,${p.opacity})`,
                                animation: `am-float-particle ${p.dur} ease-in-out infinite ${p.delay}`,
                                // @ts-expect-error
                                "--dx": p.dx,
                                "--dy": p.dy,
                            }}
                        />
                    ))}
                </div>

                {/* Floating 3D Elements in Empty Space */}
                <style>{`
                    @keyframes am-code-float {
                        0%, 100% { transform: translateY(0) rotateX(0deg); }
                        50% { transform: translateY(-20px) rotateX(10deg); }
                    }
                    @keyframes am-icon-float {
                        0%, 100% { transform: translateY(0) rotateZ(0deg); }
                        50% { transform: translateY(-25px) rotateZ(5deg); }
                    }
                    @keyframes am-shimmer {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(200%); }
                    }
                `}</style>

                {/* Code Snippet - Top Left */}
                <div 
                    className="absolute top-[12%] left-[6%] opacity-30 pointer-events-none hidden lg:block"
                    style={{ 
                        animation: 'am-code-float 8s ease-in-out infinite',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <div className="bg-[#0C1F4A]/40 backdrop-blur-sm rounded-lg p-4 border border-[#C9A84C]/20" style={{ width: 180 }}>
                        <div className="flex gap-1.5 mb-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
                        </div>
                        <div className="space-y-1.5 font-mono text-[9px]">
                            <div className="text-purple-400">const</div>
                            <div className="text-[#C9A84C] ml-2">transform =</div>
                            <div className="text-blue-400 ml-4">&quot;elevate&quot;</div>
                        </div>
                    </div>
                </div>

                {/* Database Icon - Bottom Left */}
                <div 
                    className="absolute bottom-[15%] left-[8%] w-16 h-16 opacity-40 pointer-events-none hidden lg:block"
                    style={{ 
                        animation: 'am-icon-float 7s ease-in-out infinite 1s',
                        transformStyle: 'preserve-3d',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <ellipse cx="50" cy="25" rx="35" ry="12" fill="rgba(201,168,76,0.2)" stroke="#C9A84C" strokeWidth="2" />
                        <path d="M 15 25 L 15 75 Q 15 87 50 87 Q 85 87 85 75 L 85 25" fill="rgba(201,168,76,0.1)" stroke="#C9A84C" strokeWidth="2" />
                        <ellipse cx="50" cy="50" rx="35" ry="12" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.6" />
                        <ellipse cx="50" cy="75" rx="35" ry="12" fill="none" stroke="#C9A84C" strokeWidth="1.5" opacity="0.8" />
                    </svg>
                </div>

                {/* Rocket Icon - Top Right (above digital card) */}
                <div 
                    className="absolute top-[8%] right-[5%] w-20 h-20 opacity-35 pointer-events-none hidden lg:block"
                    style={{ 
                        animation: 'am-icon-float 9s ease-in-out infinite 0.5s',
                        transformStyle: 'preserve-3d',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M 50 10 L 45 40 L 35 50 L 45 55 L 50 90 L 55 55 L 65 50 L 55 40 Z" fill="url(#rocketGrad)" stroke="#4AADDA" strokeWidth="2" />
                        <circle cx="50" cy="30" r="6" fill="rgba(74,173,218,0.4)" />
                        <path d="M 35 50 L 25 60 L 30 65 Z" fill="#C9A84C" opacity="0.6" />
                        <path d="M 65 50 L 75 60 L 70 65 Z" fill="#C9A84C" opacity="0.6" />
                        <defs>
                            <linearGradient id="rocketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgba(74,173,218,0.3)" />
                                <stop offset="100%" stopColor="rgba(74,173,218,0.1)" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Cloud Server Icon - Bottom Right */}
                <div 
                    className="absolute bottom-[20%] right-[6%] w-18 h-18 opacity-40 pointer-events-none hidden lg:block"
                    style={{ 
                        animation: 'am-icon-float 8.5s ease-in-out infinite 1.5s',
                        transformStyle: 'preserve-3d',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M 25 50 Q 25 35 35 35 Q 35 25 50 25 Q 65 25 65 35 Q 75 35 75 50 Q 75 65 65 65 L 35 65 Q 25 65 25 50 Z" fill="rgba(155,121,224,0.2)" stroke="#9B79E0" strokeWidth="2" />
                        <rect x="40" y="55" width="4" height="15" fill="#9B79E0" opacity="0.6" />
                        <rect x="48" y="55" width="4" height="15" fill="#9B79E0" opacity="0.8" />
                        <rect x="56" y="55" width="4" height="15" fill="#9B79E0" opacity="0.6" />
                        <rect x="38" y="72" width="24" height="6" rx="1" fill="#9B79E0" opacity="0.7" />
                    </svg>
                </div>

                {/* Analytics Chart - Middle Left */}
                <div 
                    className="absolute top-[55%] left-[4%] opacity-35 pointer-events-none hidden lg:block"
                    style={{ 
                        animation: 'am-code-float 7.5s ease-in-out infinite 2s',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <div className="bg-[#0C1F4A]/30 backdrop-blur-sm rounded-lg p-3 border border-[#C9A84C]/15" style={{ width: 140 }}>
                        <div className="flex items-end justify-between h-12 gap-1">
                            {[30, 45, 35, 55, 40, 60, 50].map((h, i) => (
                                <div 
                                    key={i}
                                    className="bg-[#C9A84C] rounded-t"
                                    style={{ 
                                        width: 12,
                                        height: `${h}%`,
                                        opacity: 0.3 + (i * 0.1),
                                    }}
                                />
                            ))}
                        </div>
                        <div className="text-[#C9A84C] text-[8px] mt-1.5 opacity-60">Growth Analytics</div>
                    </div>
                </div>

                {/* Gear/Settings Icon - Middle Right (near globe) */}
                <div 
                    className="absolute top-[40%] right-[38%] w-14 h-14 opacity-25 pointer-events-none hidden lg:block"
                    style={{ 
                        animation: 'am-orbit 25s linear infinite',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="18" fill="rgba(201,168,76,0.2)" stroke="#C9A84C" strokeWidth="2" />
                        {[0, 60, 120, 180, 240, 300].map((angle) => (
                            <rect 
                                key={angle}
                                x="48" 
                                y="20" 
                                width="4" 
                                height="12" 
                                fill="#C9A84C" 
                                opacity="0.6"
                                transform={`rotate(${angle} 50 50)`}
                            />
                        ))}
                    </svg>
                </div>

                {/* Light beam effect - Top */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 opacity-20 pointer-events-none overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-b from-[#C9A84C] to-transparent" />
                    <div 
                        className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent h-20"
                        style={{ animation: 'am-shimmer 4s ease-in-out infinite' }}
                    />
                </div>

                {/* Light beam effect - Bottom */}
                <div className="absolute bottom-0 left-1/3 w-[1px] h-40 opacity-15 pointer-events-none overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-t from-[#4AADDA] to-transparent" />
                    <div 
                        className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent h-24"
                        style={{ animation: 'am-shimmer 5s ease-in-out infinite 1s' }}
                    />
                </div>

                {/* Glowing corners */}
                <div 
                    className="absolute rounded-full pointer-events-none" 
                    style={{
                        left: -50,
                        top: -50,
                        width: 200,
                        height: 200,
                        background: "radial-gradient(circle, rgba(201,168,76,.15) 0%, transparent 70%)",
                        animation: "am-glow-pulse 4s ease-in-out infinite",
                    }}
                />
                <div 
                    className="absolute rounded-full pointer-events-none" 
                    style={{
                        right: -80,
                        bottom: -80,
                        width: 250,
                        height: 250,
                        background: "radial-gradient(circle, rgba(201,168,76,.12) 0%, transparent 70%)",
                        animation: "am-glow-pulse 5s ease-in-out infinite 1s",
                    }}
                />

                {/* Floating achievement badges */}
                <style>{`
                    @keyframes am-badge-float {
                        0%, 100% { transform: translateY(0) rotate(0deg); }
                        50% { transform: translateY(-18px) rotate(3deg); }
                    }
                    @keyframes am-hexagon-spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes am-morph-shape {
                        0%, 100% { 
                            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
                        }
                        50% { 
                            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
                        }
                    }
                `}</style>

                {/* Innovation Badge - Top */}
                <div 
                    className="absolute top-[8%] left-[45%] opacity-25 pointer-events-none hidden lg:block"
                    style={{ animation: 'am-badge-float 6s ease-in-out infinite' }}
                >
                    <div className="relative w-20 h-20">
                        <div className="absolute inset-0 bg-[#C9A84C]/10 rounded-full" />
                        <div className="absolute inset-2 bg-[#C9A84C]/20 rounded-full flex items-center justify-center">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Hexagonal pattern - Top Right */}
                <div 
                    className="absolute top-[35%] right-[8%] w-16 h-16 opacity-20 pointer-events-none hidden lg:block"
                    style={{ animation: 'am-hexagon-spin 30s linear infinite' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <polygon points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5" fill="none" stroke="#C9A84C" strokeWidth="1.5" />
                        <polygon points="50,20 75,35 75,65 50,80 25,65 25,35" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
                        <circle cx="50" cy="50" r="8" fill="#C9A84C" opacity="0.4" />
                    </svg>
                </div>

                {/* Morphing blob - Bottom Left */}
                <div 
                    className="absolute bottom-[12%] left-[12%] w-32 h-32 opacity-15 pointer-events-none hidden lg:block"
                    style={{
                        background: 'linear-gradient(135deg, rgba(74,173,218,0.3) 0%, rgba(155,121,224,0.3) 100%)',
                        animation: 'am-morph-shape 12s ease-in-out infinite',
                        filter: 'blur(20px)',
                    }}
                />

                {/* Floating percentage badge - Left */}
                <div 
                    className="absolute top-[60%] left-[5%] opacity-30 pointer-events-none hidden lg:block"
                    style={{ animation: 'am-badge-float 7s ease-in-out infinite 1s' }}
                >
                    <div className="bg-[#0C1F4A]/40 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-[#C9A84C]/20">
                        <div className="text-[#C9A84C] text-xl font-bold">98%</div>
                        <div className="text-white/60 text-[9px] uppercase tracking-wide">Success Rate</div>
                    </div>
                </div>

                {/* Spinning orbit rings - Bottom Right */}
                <div 
                    className="absolute bottom-[35%] right-[25%] w-24 h-24 opacity-20 pointer-events-none hidden lg:block"
                    style={{ animation: 'am-orbit 25s linear infinite' }}
                >
                    <div className="absolute inset-0 border border-[#4AADDA]/40 rounded-full" />
                    <div className="absolute inset-3 border border-[#4AADDA]/30 rounded-full" style={{ animation: 'am-orbit 20s linear reverse infinite' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#4AADDA] rounded-full" />
                </div>

                {/* Content container */}
                <div className="relative z-10 w-[90%] mx-auto py-20 md:py-28 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        
                        {/* Left: Text content */}
                        <div>
                            <h1 
                                className="text-4xl md:text-5xl lg:text-[54px] font-bold text-white mb-5 leading-tight"
                                style={{ fontFamily: "Lora, Georgia, serif" }}
                            >
                                {content.tagline.value} <span className="text-[#C9A84C]">{content.taglineHighlight.value}</span>
                            </h1>
                            <p className="text-base md:text-lg text-white/70 mb-8 leading-relaxed">
                                {content.description.value}
                            </p>
                            
                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <Link
                                    href={getLocalizedPath(locale as AppLocale, "/contact#form")}
                                    className="flex items-center justify-center px-7 py-3.5 bg-[#C9A84C] text-[#0C1F4A] rounded-lg text-[15px] font-bold hover:bg-[#D4AF37] transition-colors"
                                >
                                    {content.bookConsultation.value}
                                </Link>
                                <button
                                    onClick={() => router.push(getLocalizedPath(locale as AppLocale, "/#services"))}
                                    className="px-7 py-3.5 bg-transparent text-[#C9A84C] border-2 border-[#C9A84C] rounded-lg text-[15px] font-bold hover:bg-[#C9A84C] hover:text-[#0C1F4A] transition-colors"
                                >
                                    {content.exploreServices.value}
                                </button>
                            </div>
                            
                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <div 
                                        ref={clientsRef}
                                        className="text-3xl md:text-[32px] font-bold text-[#C9A84C]"
                                        style={{ fontFamily: "Lora, Georgia, serif" }}
                                    >
                                        0+
                                    </div>
                                    <div className="text-xs md:text-[13px] text-white/60 uppercase tracking-wider mt-1">
                                        {content.clients.value}
                                    </div>
                                </div>
                                <div>
                                    <div 
                                        ref={countriesRef}
                                        className="text-3xl md:text-[32px] font-bold text-[#C9A84C]"
                                        style={{ fontFamily: "Lora, Georgia, serif" }}
                                    >
                                        0+
                                    </div>
                                    <div className="text-xs md:text-[13px] text-white/60 uppercase tracking-wider mt-1">
                                        {content.countries.value}
                                    </div>
                                </div>
                                <div>
                                    <div 
                                        ref={yearsRef}
                                        className="text-3xl md:text-[32px] font-bold text-[#C9A84C]"
                                        style={{ fontFamily: "Lora, Georgia, serif" }}
                                    >
                                        0+
                                    </div>
                                    <div className="text-xs md:text-[13px] text-white/60 uppercase tracking-wider mt-1">
                                        {content.years.value}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Globe + Service Cards */}
                        <div className="hidden lg:block relative" style={{ height: 450 }}>
                            
                            {/* Orbital rings */}
                            <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                <div 
                                    className="rounded-full" 
                                    style={{ 
                                        width: 360, 
                                        height: 360, 
                                        border: "1px solid rgba(201,168,76,.2)",
                                        animation: "am-orbit 20s linear infinite",
                                    }}
                                />
                            </div>
                            <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                <div 
                                    className="rounded-full" 
                                    style={{ 
                                        width: 420, 
                                        height: 420, 
                                        border: "1px solid rgba(201,168,76,.12)",
                                        animation: "am-orbit 25s linear reverse infinite",
                                    }}
                                />
                            </div>
                            
                            {/* Globe */}
                            <svg 
                                className="absolute" 
                                style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} 
                                width="300" 
                                height="300" 
                                viewBox="0 0 200 200"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <linearGradient id="connectionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="rgba(201,168,76,0.8)" />
                                        <stop offset="100%" stopColor="rgba(201,168,76,0.2)" />
                                    </linearGradient>
                                </defs>
                                <circle cx="100" cy="100" r="80" fill="rgba(12,31,74,.3)" stroke="rgba(201,168,76,.4)" strokeWidth="1.5" />
                                <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="rgba(201,168,76,.25)" strokeWidth=".8" />
                                <ellipse cx="100" cy="100" rx="80" ry="50" fill="none" stroke="rgba(201,168,76,.2)" strokeWidth=".8" />
                                <g style={{ transformOrigin: "100px 100px", animation: "am-orbit 30s linear infinite" }}>
                                    <ellipse cx="100" cy="100" rx="20" ry="80" fill="none" stroke="rgba(201,168,76,.25)" strokeWidth=".8" />
                                    <ellipse cx="100" cy="100" rx="40" ry="80" fill="none" stroke="rgba(201,168,76,.2)" strokeWidth=".8" />
                                </g>
                                
                                {/* Animated connection lines to center */}
                                <line x1="57" y1="67" x2="100" y2="100" stroke="url(#connectionGrad)" strokeWidth="1.5" strokeDasharray="3 3">
                                    <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" />
                                    <animate attributeName="stroke-dashoffset" from="0" to="-6" dur="1s" repeatCount="indefinite" />
                                </line>
                                <line x1="157" y1="103" x2="100" y2="100" stroke="#4AADDA" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6">
                                    <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="0.7s" />
                                    <animate attributeName="stroke-dashoffset" from="0" to="-6" dur="1s" repeatCount="indefinite" />
                                </line>
                                <line x1="66" y1="150" x2="100" y2="100" stroke="#9B79E0" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6">
                                    <animate attributeName="stroke-opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite" begin="1.4s" />
                                    <animate attributeName="stroke-dashoffset" from="0" to="-6" dur="1s" repeatCount="indefinite" />
                                </line>
                                
                                {/* Outer nodes */}
                                <circle cx="57" cy="67" r="6" fill="#C9A84C" style={{ transformOrigin: "57px 67px", animation: "am-node-expand 2s ease-in-out infinite" }} />
                                <circle cx="157" cy="103" r="6" fill="#4AADDA" style={{ transformOrigin: "157px 103px", animation: "am-node-expand 2s ease-in-out infinite .7s" }} />
                                <circle cx="66" cy="150" r="6" fill="#9B79E0" style={{ transformOrigin: "66px 150px", animation: "am-node-expand 2s ease-in-out infinite 1.4s" }} />
                                
                                {/* Center hub with pulsing ring */}
                                <circle cx="100" cy="100" r="12" fill="rgba(201,168,76,0.2)" opacity="0.5">
                                    <animate attributeName="r" values="12;16;12" dur="2s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite" />
                                </circle>
                                <circle cx="100" cy="100" r="8" fill="#C9A84C" opacity=".8" />
                            </svg>

                            {/* Finance card */}
                            <div 
                                onClick={() => router.push(getLocalizedPath(locale as AppLocale, "/finance-transformation"))}
                                className="absolute rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300"
                                style={{
                                    top: 30,
                                    left: -40,
                                    width: 200,
                                    padding: "16px 18px",
                                    background: "rgba(100,160,255,.1)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(100,160,255,.25)",
                                    animation: "am-float-a 4.1s ease-in-out infinite",
                                }}
                            >
                                <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: "rgba(201,168,76,.9)" }}>
                                    {content.financeLabel.value}
                                </div>
                                <div className="text-[15px] font-bold text-white mb-3">{content.financeTitle.value}</div>
                                <div className="flex items-end gap-[4px]" style={{ height: 28 }}>
                                    {[10, 16, 12, 22, 28].map((h, i) => (
                                        <div 
                                            key={i} 
                                            style={{ 
                                                width: 8, 
                                                height: h, 
                                                background: i === 4 ? "#C9A84C" : `rgba(201,168,76,${0.3 + i * 0.1})`,
                                                borderRadius: "2px 2px 0 0",
                                            }} 
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Digital card */}
                            <div 
                                onClick={() => router.push(getLocalizedPath(locale as AppLocale, "/digital-transformation"))}
                                className="absolute rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300"
                                style={{
                                    top: "50%",
                                    right: -20,
                                    transform: "translateY(-50%)",
                                    width: 200,
                                    padding: "16px 18px",
                                    background: "rgba(74,173,218,.1)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(74,173,218,.25)",
                                    animation: "am-float-b 4.5s ease-in-out infinite",
                                }}
                            >
                                <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: "rgba(74,173,218,.9)" }}>
                                    {content.digitalLabel.value}
                                </div>
                                <div className="text-[15px] font-bold text-white mb-3">{content.digitalTitle.value}</div>
                                <div className="relative" style={{ width: 48, height: 28 }}>
                                    <div className="absolute rounded-full" style={{ left: 0, top: "50%", width: 10, height: 10, background: "#4AADDA", transform: "translateY(-50%)", animation: "am-node-pulse 1.8s ease-in-out infinite" }} />
                                    <div className="absolute rounded-full" style={{ left: -5, top: "50%", width: 20, height: 20, border: "2px solid rgba(74,173,218,.5)", transform: "translateY(-50%)", animation: "am-ring-pulse 1.8s ease-in-out infinite" }} />
                                    <div className="absolute rounded-full" style={{ left: -10, top: "50%", width: 30, height: 30, border: "2px solid rgba(74,173,218,.25)", transform: "translateY(-50%)", animation: "am-ring-pulse2 1.8s ease-in-out infinite" }} />
                                </div>
                            </div>

                            {/* AI card */}
                            <div 
                                onClick={() => router.push(getLocalizedPath(locale as AppLocale, "/ai-automations"))}
                                className="absolute rounded-xl cursor-pointer hover:scale-105 transition-transform duration-300"
                                style={{
                                    bottom: 40,
                                    left: -30,
                                    width: 200,
                                    padding: "16px 18px",
                                    background: "rgba(155,121,224,.1)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(155,121,224,.25)",
                                    animation: "am-float-c 4.3s ease-in-out infinite",
                                }}
                            >
                                <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: "rgba(155,121,224,.9)" }}>
                                    {content.aiLabel.value}
                                </div>
                                <div className="text-[15px] font-bold text-white mb-3">{content.aiTitle.value}</div>
                                <div className="grid grid-cols-6 gap-[4px]">
                                    {[0, .3, .6, .9, .15, .45].map((delay, i) => (
                                        <div 
                                            key={i} 
                                            className="rounded-full" 
                                            style={{ 
                                                width: 8, 
                                                height: 8, 
                                                background: "#9B79E0",
                                                animation: `am-neural-blink 1.9s ease-in-out infinite ${delay}s`,
                                            }} 
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomeHero;