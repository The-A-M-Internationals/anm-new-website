"use client";

import { useRouter, useParams } from "next/navigation";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { useEffect, useRef } from "react";
import { useIntlayer, useLocale } from "next-intlayer";
import { AppLocale } from "@/types/locale";

const NLPHero = () => {
    const router = useRouter();
    const params = useParams();
    const { locale } = useLocale();
    const content = useIntlayer("nlpPage");
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Array<{ x: number; y: number; vx: number; vy: number; }> = [];
        for (let i = 0; i < 65; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
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
                    if (distance < 110) {
                        const alpha = (1 - distance / 110) * 0.26;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(30, 64, 175, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(30, 64, 175, 0.6)';
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
                @keyframes text-wave {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes bubble-float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(10px, -10px) scale(1.05); }
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

            <section className="relative overflow-hidden bg-gradient-to-br from-[#050A1E] via-[#0F1F3D] to-[#0A1628] min-h-screen flex items-center">
                <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.7 }} />

                <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(30, 64, 175, 0.25) 0%, transparent 50%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient-flow 20s ease infinite',
                    }}
                />

                {/* Speech Bubbles - Left */}
                <div className="absolute top-[22%] start-[8%] w-40 h-40 pointer-events-none opacity-50">
                    <svg viewBox="0 0 100 100" className="w-full h-full rtl:-scale-x-100">
                        {[{x: 20, y: 30, w: 35}, {x: 45, y: 55, w: 40}].map((b, i) => (
                            <g key={i} style={{ animation: `bubble-float ${5 + i}s ease-in-out infinite ${i * 0.5}s` }}>
                                <rect x={b.x} y={b.y} width={b.w} height="20" rx="4" fill="rgba(30, 64, 175, 0.3)" stroke="#1E40AF" strokeWidth="2" />
                                <path d={`M ${b.x + 5} ${b.y + 20} L ${b.x + 2} ${b.y + 25} L ${b.x + 10} ${b.y + 20}`} fill="rgba(30, 64, 175, 0.3)" stroke="#1E40AF" strokeWidth="2" />
                            </g>
                        ))}
                    </svg>
                </div>

                {/* Text Analysis - Right */}
                <div className="absolute top-[25%] end-[10%] w-48 h-32 pointer-events-none opacity-45">
                    <svg viewBox="0 0 100 60" className="w-full h-full rtl:-scale-x-100">
                        {['Hello', 'World', 'AI'].map((word, i) => (
                            <text 
                                key={i} 
                                x="10" 
                                y={15 + i * 18} 
                                fill="#1E40AF" 
                                fontSize="12" 
                                style={{ animation: `text-wave 2s ease-in-out infinite ${i * 0.3}s` }}
                            >
                                {word}
                            </text>
                        ))}
                    </svg>
                </div>

                {/* Language Indicators - Bottom Left */}
                <div className="absolute bottom-[20%] start-[12%] flex gap-4 pointer-events-none opacity-40">
                    {['EN', 'AR', 'ES'].map((lang, i) => (
                        <div 
                            key={i} 
                            className="w-12 h-12 rounded-lg bg-[#1E40AF]/20 border border-[#1E40AF] flex items-center justify-center text-[#1E40AF] text-xs font-bold"
                            style={{ animation: `bubble-float ${4 + i * 0.5}s ease-in-out infinite ${i * 0.4}s` }}
                        >
                            {lang}
                        </div>
                    ))}
                </div>

                <div 
                    className="relative z-10 w-[90%] max-w-6xl mx-auto text-center py-20"
                    style={{ animation: 'elegant-rise 1.2s ease-out' }}
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-10 rounded-full bg-white/5 border border-[#1E40AF]/20 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animation: 'shimmer 4s ease-in-out infinite' }} />
                        <div className="relative w-2 h-2">
                            <div className="absolute inset-0 rounded-full bg-[#1E40AF]" />
                            <div className="absolute inset-0 rounded-full bg-[#1E40AF] animate-ping" />
                        </div>
                        <span className="relative text-[#1E40AF] text-sm font-semibold tracking-wide">
                            {content.heroBadge.value}
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "var(--heading-font)" }}>
                        {content.heroTitleLine1.value}
                        <br />
                        <span className="relative inline-block mt-4">
                            <span 
                                className="bg-gradient-to-r from-[#1E40AF] via-[#3B82F6] to-[#1E40AF] bg-clip-text text-transparent"
                                style={{ backgroundSize: '200% auto', animation: 'gradient-flow 5s ease infinite' }}
                            >
                                {content.heroTitleLine2.value}
                            </span>
                            <div className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E40AF] to-transparent overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-32" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            </div>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
                        {content.heroDescription.value}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                        <button
                            onClick={() => router.push(getLocalizedPath(locale as AppLocale, "/contact#form"))}
                            className="group relative px-12 py-5 bg-[#1E40AF] text-white rounded-2xl text-lg font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#1E40AF]/40 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#1E40AF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            <span className="relative z-10">{content.getStarted.value}</span>
                        </button>
                        <button
                            onClick={() => {
                                const servicesSection = document.getElementById('nlp-services');
                                servicesSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative px-12 py-5 bg-transparent text-white border-2 border-white/20 rounded-2xl text-lg font-semibold backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#1E40AF]/50 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <span className="relative z-10">{content.viewServices.value}</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
                        {[
                            { value: content.stat1Value.value, label: content.stat1Label.value },
                            { value: content.stat2Value.value, label: content.stat2Label.value },
                            { value: content.stat3Value.value, label: content.stat3Label.value },
                        ].map((stat, i) => (
                            <div key={i} className="group relative">
                                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] bg-clip-text text-transparent mb-3 transition-transform duration-300 group-hover:scale-110">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-white/50 uppercase tracking-widest font-light">
                                    {stat.label}
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#1E40AF] group-hover:w-full transition-all duration-500" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                    <div className="flex flex-col items-center gap-3 animate-bounce">
                        <span className="text-[#1E40AF]/50 text-xs uppercase tracking-widest font-light">
                            {content.scroll.value}
                        </span>
                        <div className="w-px h-12 bg-gradient-to-b from-[#1E40AF]/50 to-transparent" />
                    </div>
                </div>
            </section>
        </>
    );
};

const NLPServices = () => {
    const content = useIntlayer("nlpPage");

    const services = [
        { title: content.service1Title.value, description: content.service1Desc.value },
        { title: content.service2Title.value, description: content.service2Desc.value },
        { title: content.service3Title.value, description: content.service3Desc.value },
        { title: content.service4Title.value, description: content.service4Desc.value },
        { title: content.service5Title.value, description: content.service5Desc.value },
        { title: content.service6Title.value, description: content.service6Desc.value },
    ];

    return (
        <section id="nlp-services" className="py-24 bg-gradient-to-b from-[#08111A] to-[#050A1E]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: "var(--heading-font)" }}>
                        {content.servicesTitle.value}
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        {content.servicesDescription.value}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#1E40AF]/30 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1E40AF]/20 to-[#3B82F6]/10 flex items-center justify-center mb-6">
                                    <div className="w-8 h-8 bg-[#1E40AF] rounded-lg" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "var(--heading-font)" }}>
                                    {service.title}
                                </h3>

                                <p className="text-white/60 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default function NLPClient() {
    return (
        <>
            <NLPHero />
            <NLPServices />
        </>
    );
}