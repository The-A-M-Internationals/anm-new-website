"use client";

import { useRouter } from "next/navigation";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { useEffect, useRef } from "react";

const ContentMarketingHero = () => {
    const router = useRouter();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Array<{ x: number; y: number; vx: number; vy: number; }> = [];
        for (let i = 0; i < 55; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
            });
        }

        let animationFrame: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            });

            particles.forEach((p, i) => {
                particles.slice(i + 1).forEach((p2) => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 105) {
                        const alpha = (1 - distance / 105) * 0.22;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });

                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(212, 175, 55, 0.5)';
                ctx.fill();
            });

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <style>{`
                @keyframes card-slide {
                    0%, 100% { transform: translateX(0) rotate(0deg); }
                    50% { transform: translateX(-20px) rotate(-2deg); }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.1); opacity: 0.8; }
                }
                @keyframes calendar-flip {
                    0%, 100% { transform: rotateY(0deg); }
                    50% { transform: rotateY(180deg); }
                }
                @keyframes elegant-rise {
                    0% { transform: translateY(30px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%) skewX(-15deg); }
                    100% { transform: translateX(200%) skewX(-15deg); }
                }
                @keyframes gradient-flow {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
            `}</style>

            <section className="relative overflow-hidden bg-gradient-to-br from-[#050A1E] via-[#0C1F4A] to-[#08111A] min-h-screen flex items-center">
                <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.6 }} />

                <div 
                    className="absolute inset-0 opacity-25"
                    style={{
                        backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(212, 175, 55, 0.2) 0%, transparent 50%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient-flow 20s ease infinite',
                    }}
                />

                {/* Floating Article Card */}
                <div 
                    className="absolute top-[20%] right-[10%] w-56 h-36 bg-white/5 rounded-lg p-4 backdrop-blur-sm border border-white/10 pointer-events-none opacity-50"
                    style={{ animation: 'card-slide 6s ease-in-out infinite' }}
                >
                    <div className="h-3 bg-white/20 rounded w-3/4 mb-2" />
                    <div className="h-2 bg-white/10 rounded w-full mb-1" />
                    <div className="h-2 bg-white/10 rounded w-5/6 mb-1" />
                    <div className="h-2 bg-white/10 rounded w-4/5" />
                </div>

                {/* Content Calendar */}
                <div 
                    className="absolute top-[15%] left-[8%] w-32 h-32 pointer-events-none opacity-45"
                    style={{ animation: 'calendar-flip 10s ease-in-out infinite' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <rect x="10" y="15" width="80" height="75" rx="5" fill="url(#calGrad)" stroke="#D4AF37" strokeWidth="2" />
                        <rect x="10" y="15" width="80" height="15" fill="#D4AF37" />
                        <circle cx="25" cy="10" r="3" fill="#D4AF37" />
                        <circle cx="75" cy="10" r="3" fill="#D4AF37" />
                        <line x1="20" y1="40" x2="50" y2="40" stroke="#D4AF37" strokeWidth="2" />
                        <line x1="20" y1="55" x2="80" y2="55" stroke="#D4AF37" strokeWidth="2" />
                        <line x1="20" y1="70" x2="65" y2="70" stroke="#D4AF37" strokeWidth="2" />
                        <defs>
                            <linearGradient id="calGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(212, 175, 55, 0.2)" />
                                <stop offset="100%" stopColor="rgba(212, 175, 55, 0.05)" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Publishing Workflow */}
                <div 
                    className="absolute bottom-[25%] left-[15%] flex gap-4 pointer-events-none opacity-40"
                >
                    {['Draft', 'Review', 'Publish'].map((step, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div 
                                className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center"
                                style={{ animation: `pulse 2s ease-in-out infinite ${i * 0.5}s` }}
                            >
                                <div className="w-4 h-4 rounded-full bg-[#D4AF37]" />
                            </div>
                            <span className="text-white/60 text-sm">{step}</span>
                            {i < 2 && <div className="w-8 h-px bg-white/20" />}
                        </div>
                    ))}
                </div>

                {/* SEO Metrics */}
                <div 
                    className="absolute top-[45%] right-[8%] w-28 h-28 pointer-events-none opacity-45"
                    style={{ animation: 'card-slide 7s ease-in-out infinite 1s' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <text x="50" y="35" textAnchor="middle" fill="#D4AF37" fontSize="24" fontWeight="bold">SEO</text>
                        <path d="M 30 50 L 50 35 L 70 45 L 90 30" stroke="#D4AF37" strokeWidth="2" fill="none" />
                        {[30, 50, 70, 90].map((x, i) => (
                            <circle key={i} cx={x} cy={i === 0 ? 50 : i === 1 ? 35 : i === 2 ? 45 : 30} r="3" fill="#D4AF37" />
                        ))}
                    </svg>
                </div>

                <div 
                    className="relative z-10 w-[90%] max-w-6xl mx-auto text-center py-20"
                    style={{ animation: 'elegant-rise 1.2s ease-out' }}
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-10 rounded-full bg-white/5 border border-[#D4AF37]/20 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animation: 'shimmer 4s ease-in-out infinite' }} />
                        <div className="relative w-2 h-2">
                            <div className="absolute inset-0 rounded-full bg-[#D4AF37]" />
                            <div className="absolute inset-0 rounded-full bg-[#D4AF37] animate-ping" />
                        </div>
                        <span className="relative text-[#D4AF37] text-sm font-semibold tracking-wide">Content Excellence</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "Lora, Georgia, serif" }}>
                        Strategic
                        <br />
                        <span className="relative inline-block mt-4">
                            <span 
                                className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent"
                                style={{ backgroundSize: '200% auto', animation: 'gradient-flow 5s ease infinite' }}
                            >
                                Content
                            </span>
                            <div className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-32" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            </div>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
                        Data-driven content marketing that attracts, engages, and converts your target audience through compelling storytelling.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                        <button
                            onClick={() => router.push(getLocalizedPath("en", "/contact#form"))}
                            className="group relative px-12 py-5 bg-[#D4AF37] text-[#0C1F4A] rounded-2xl text-lg font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/40 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            <span className="relative z-10">Start Creating</span>
                        </button>
                        <button
                            onClick={() => {
                                const servicesSection = document.getElementById('content-services');
                                servicesSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative px-12 py-5 bg-transparent text-white border-2 border-white/20 rounded-2xl text-lg font-semibold backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#D4AF37]/50 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <span className="relative z-10">View Services</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
                        {[
                            { value: "Best", label: "Articles Published" },
                            { value: "Get", label: "Monthly Readers" },
                            { value: "Top", label: "Search Rankings" },
                        ].map((stat, i) => (
                            <div key={i} className="group relative">
                                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent mb-3 transition-transform duration-300 group-hover:scale-110">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-white/50 uppercase tracking-widest font-light">
                                    {stat.label}
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                    <div className="flex flex-col items-center gap-3 animate-bounce">
                        <span className="text-[#D4AF37]/50 text-xs uppercase tracking-widest font-light">Scroll</span>
                        <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37]/50 to-transparent" />
                    </div>
                </div>
            </section>
        </>
    );
};

const ContentMarketingServices = () => {
    const services = [
        { title: "Blog Writing", description: "SEO-optimized articles that drive organic traffic", color: "#D4AF37" },
        { title: "Content Strategy", description: "Comprehensive plans aligned with business goals", color: "#FFD700" },
        { title: "SEO Optimization", description: "Content that ranks and converts", color: "#D4AF37" },
        { title: "Copywriting", description: "Persuasive copy that drives action", color: "#FFD700" },
        { title: "Email Campaigns", description: "Engaging newsletters that nurture leads", color: "#D4AF37" },
        { title: "Analytics & Reporting", description: "Data insights that inform strategy", color: "#FFD700" },
    ];

    return (
        <section id="content-services" className="py-24 bg-gradient-to-b from-[#08111A] to-[#050A1E]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: "Lora, Georgia, serif" }}>
                        Our Content Marketing Services
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        Creating content that resonates, engages, and delivers measurable results
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#D4AF37]/30 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37]/20 to-[#FFD700]/10 flex items-center justify-center mb-6">
                                    <div className="w-8 h-8 bg-[#D4AF37] rounded-lg" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Lora, Georgia, serif" }}>
                                    {service.title}
                                </h3>

                                <p className="text-white/60 leading-relaxed text-center text-sm px-4 italic">
                                    &quot;{service.description}&quot;
                                </p>
                                </div>
                                </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default function ContentMarketingPage() {
    return (
        <>
            <ContentMarketingHero />
            <ContentMarketingServices />
        </>
    );
}