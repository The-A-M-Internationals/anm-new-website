"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { useEffect, useRef } from "react";
import type { AppLocale } from "@/types/locale";
import { getLocalizedPath } from "@/lib/getLocalizedPath";

const HomeHero = () => {
    const router = useRouter();
    const { locale } = useLocale();
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

            <section className="relative overflow-hidden" style={{ background: "linear-gradient(140deg, #061540 0%, #0C2060 50%, #050E30 100%)" }}>
                
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
                    </defs>
                    <rect width="1200" height="600" fill="url(#diagonalGrid)" />
                    
                    {/* Network nodes scattered */}
                    <circle cx="180" cy="120" r="2" fill="#C9A84C" style={{ animation: "am-node-pulse 2.5s ease-in-out infinite" }} />
                    <circle cx="340" cy="80" r="2" fill="#C9A84C" style={{ animation: "am-node-pulse 2.8s ease-in-out infinite .5s" }} />
                    <circle cx="520" cy="140" r="2" fill="#C9A84C" style={{ animation: "am-node-pulse 2.3s ease-in-out infinite 1s" }} />
                    <circle cx="240" cy="380" r="2" fill="#C9A84C" style={{ animation: "am-node-pulse 2.6s ease-in-out infinite .3s" }} />
                    <circle cx="420" cy="480" r="2" fill="#C9A84C" style={{ animation: "am-node-pulse 2.4s ease-in-out infinite .8s" }} />
                    
                    {/* Connection lines */}
                    <line x1="180" y1="120" x2="340" y2="80" stroke="rgba(201,168,76,.15)" strokeWidth="1" strokeDasharray="5 5" style={{ animation: "am-dash-flow 2s linear infinite" }} />
                    <line x1="340" y1="80" x2="520" y2="140" stroke="rgba(201,168,76,.15)" strokeWidth="1" strokeDasharray="5 5" style={{ animation: "am-dash-flow 2s linear infinite" }} />
                    <line x1="240" y1="380" x2="420" y2="480" stroke="rgba(201,168,76,.15)" strokeWidth="1" strokeDasharray="5 5" style={{ animation: "am-dash-flow 2s linear infinite" }} />
                </svg>

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
                                // @ts-ignore
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
                                // @ts-ignore
                                "--dx": p.dx,
                                "--dy": p.dy,
                            }}
                        />
                    ))}
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

                {/* Content container */}
                <div className="relative z-10 w-[90%] mx-auto py-16 md:py-20 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        
                        {/* Left: Text content */}
                        <div>
                            <h1 
                                className="text-4xl md:text-5xl lg:text-[54px] font-bold text-white mb-5 leading-tight"
                                style={{ fontFamily: "Lora, Georgia, serif" }}
                            >
                                Elevating the World, <span className="text-[#C9A84C]">Elegantly</span>
                            </h1>
                            <p className="text-base md:text-lg text-white/70 mb-8 leading-relaxed">
                                Technology modernisation, business transformation, and digital marketing solutions that drive measurable impact across your enterprise.
                            </p>
                            
                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-10">
                                <button
                                    onClick={() => router.push(getLocalizedPath(currentLocale, "/contact"))}
                                    className="px-7 py-3.5 bg-[#C9A84C] text-[#0C1F4A] rounded-lg text-[15px] font-bold hover:bg-[#D4AF37] transition-colors"
                                >
                                    Book a Consultation
                                </button>
                                <button
                                    onClick={() => router.push(getLocalizedPath(currentLocale, "/#services"))}
                                    className="px-7 py-3.5 bg-transparent text-[#C9A84C] border-2 border-[#C9A84C] rounded-lg text-[15px] font-bold hover:bg-[#C9A84C] hover:text-[#0C1F4A] transition-colors"
                                >
                                    Explore Services
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
                                        Clients Served
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
                                        Countries
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
                                        Years Experience
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
                                {/* Globe circle */}
                                <circle cx="100" cy="100" r="80" fill="rgba(12,31,74,.3)" stroke="rgba(201,168,76,.4)" strokeWidth="1.5" />
                                
                                {/* Latitude lines */}
                                <ellipse cx="100" cy="100" rx="80" ry="30" fill="none" stroke="rgba(201,168,76,.25)" strokeWidth=".8" />
                                <ellipse cx="100" cy="100" rx="80" ry="50" fill="none" stroke="rgba(201,168,76,.2)" strokeWidth=".8" />
                                
                                {/* Longitude lines - rotating */}
                                <g style={{ transformOrigin: "100px 100px", animation: "am-orbit 30s linear infinite" }}>
                                    <ellipse cx="100" cy="100" rx="20" ry="80" fill="none" stroke="rgba(201,168,76,.25)" strokeWidth=".8" />
                                    <ellipse cx="100" cy="100" rx="40" ry="80" fill="none" stroke="rgba(201,168,76,.2)" strokeWidth=".8" />
                                </g>
                                
                                {/* Service nodes */}
                                <circle cx="57" cy="67" r="6" fill="#C9A84C" style={{ transformOrigin: "57px 67px", animation: "am-node-expand 2s ease-in-out infinite" }} />
                                <circle cx="157" cy="103" r="6" fill="#4AADDA" style={{ transformOrigin: "157px 103px", animation: "am-node-expand 2s ease-in-out infinite .7s" }} />
                                <circle cx="66" cy="150" r="6" fill="#9B79E0" style={{ transformOrigin: "66px 150px", animation: "am-node-expand 2s ease-in-out infinite 1.4s" }} />
                                
                                {/* Central hub */}
                                <circle cx="100" cy="100" r="8" fill="#C9A84C" opacity=".8" />
                            </svg>

                            {/* Finance card (top-left) */}
                            <div 
                                className="absolute rounded-xl"
                                style={{
                                    top: 30,
                                    left: -40,
                                    width: 160,
                                    padding: "12px 14px",
                                    background: "rgba(100,160,255,.1)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(100,160,255,.25)",
                                    animation: "am-float-a 4.1s ease-in-out infinite",
                                }}
                            >
                                <div className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "rgba(201,168,76,.9)" }}>
                                    Financial Transform.
                                </div>
                                <div className="text-[13px] font-bold text-white mb-2">Oracle EPM</div>
                                {/* Mini bar chart */}
                                <div className="flex items-end gap-[3px]" style={{ height: 20 }}>
                                    {[8, 12, 9, 16, 20].map((h, i) => (
                                        <div 
                                            key={i} 
                                            style={{ 
                                                width: 6, 
                                                height: h, 
                                                background: i === 4 ? "#C9A84C" : `rgba(201,168,76,${0.3 + i * 0.1})`,
                                                borderRadius: "2px 2px 0 0",
                                            }} 
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Digital card (right) */}
                            <div 
                                className="absolute rounded-xl"
                                style={{
                                    top: "50%",
                                    right: -20,
                                    transform: "translateY(-50%)",
                                    width: 160,
                                    padding: "12px 14px",
                                    background: "rgba(74,173,218,.1)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(74,173,218,.25)",
                                    animation: "am-float-b 4.5s ease-in-out infinite",
                                }}
                            >
                                <div className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "rgba(74,173,218,.9)" }}>
                                    Digital Transform.
                                </div>
                                <div className="text-[13px] font-bold text-white mb-2">Cloud & ERP</div>
                                {/* Signal rings */}
                                <div className="relative" style={{ width: 40, height: 20 }}>
                                    <div className="absolute rounded-full" style={{ left: 0, top: "50%", width: 8, height: 8, background: "#4AADDA", transform: "translateY(-50%)", animation: "am-node-pulse 1.8s ease-in-out infinite" }} />
                                    <div className="absolute rounded-full" style={{ left: -4, top: "50%", width: 16, height: 16, border: "1.5px solid rgba(74,173,218,.5)", transform: "translateY(-50%)", animation: "am-ring-pulse 1.8s ease-in-out infinite" }} />
                                    <div className="absolute rounded-full" style={{ left: -8, top: "50%", width: 24, height: 24, border: "1.5px solid rgba(74,173,218,.25)", transform: "translateY(-50%)", animation: "am-ring-pulse2 1.8s ease-in-out infinite" }} />
                                </div>
                            </div>

                            {/* AI card (bottom-left) */}
                            <div 
                                className="absolute rounded-xl"
                                style={{
                                    bottom: 40,
                                    left: -30,
                                    width: 160,
                                    padding: "12px 14px",
                                    background: "rgba(155,121,224,.1)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(155,121,224,.25)",
                                    animation: "am-float-c 4.3s ease-in-out infinite",
                                }}
                            >
                                <div className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "rgba(155,121,224,.9)" }}>
                                    AI Automations
                                </div>
                                <div className="text-[13px] font-bold text-white mb-2">RPA & GenAI</div>
                                {/* Neural dots */}
                                <div className="grid grid-cols-6 gap-[3px]">
                                    {[0, .3, .6, .9, .15, .45].map((delay, i) => (
                                        <div 
                                            key={i} 
                                            className="rounded-full" 
                                            style={{ 
                                                width: 6, 
                                                height: 6, 
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