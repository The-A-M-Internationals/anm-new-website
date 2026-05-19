"use client";

import { useRouter, useParams } from "next/navigation";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { useEffect, useRef } from "react";
import { useIntlayer } from "next-intlayer";
import { AppLocale } from "@/types/locale";

const GenerativeAIHero = () => {
    const router = useRouter();
    const params = useParams();
    const locale = (params?.locale as string) || "en";
    const content = useIntlayer("generativeAIPage");
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = ['#8B5CF6', '#EC4899', '#3B82F6'];
        const particles: Array<{ x: number; y: number; vx: number; vy: number; color: string; size: number }> = [];
        for (let i = 0; i < 40; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 3 + 1
            });
        }

        let animationFrame: number;
        const animate = () => {
            ctx.fillStyle = 'rgba(5, 10, 30, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();

                particles.slice(i + 1).forEach((p2) => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = p.color;
                        ctx.globalAlpha = (1 - distance / 150) * 0.15;
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                });
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
                @keyframes brain-pulse {
                    0% { transform: scale(1); opacity: 0.2; }
                    50% { transform: scale(1.1); opacity: 0.4; }
                    100% { transform: scale(1); opacity: 0.2; }
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

            <section className="relative overflow-hidden bg-[#050A1E] min-h-[85vh] flex items-center">
                <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

                <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 40%)',
                        animation: 'gradient-flow 15s ease infinite',
                    }}
                />

                <div 
                    className="relative z-10 w-[90%] max-w-6xl mx-auto text-center py-20"
                    style={{ animation: 'elegant-rise 1.2s ease-out' }}
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animation: 'shimmer 4s ease-in-out infinite' }} />
                        <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#EC4899] animate-pulse delay-75" />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse delay-150" />
                        </div>
                        <span className="relative text-white/80 text-sm font-semibold tracking-wide">
                            {content.heroBadge.value}
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "var(--heading-font)" }}>
                        {content.heroTitleLine1.value}
                        <br />
                        <span className="relative inline-block mt-4">
                            <span 
                                className="bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#3B82F6] bg-clip-text text-transparent"
                                style={{ backgroundSize: '200% auto', animation: 'gradient-flow 5s ease infinite' }}
                            >
                                {content.heroTitleLine2.value}
                            </span>
                            <div className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent overflow-hidden">
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
                            className="group relative px-12 py-5 bg-white text-black rounded-2xl text-lg font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            <span className="relative z-10">{content.getStarted.value}</span>
                        </button>
                        <button
                            onClick={() => {
                                const servicesSection = document.getElementById('gen-ai-services');
                                servicesSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative px-12 py-5 bg-transparent text-white border-2 border-white/20 rounded-2xl text-lg font-semibold backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/50 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <span className="relative z-10">{content.viewServices.value}</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-4xl mx-auto">
                        {[
                            { value: content.stat1Value.value, label: content.stat1Label.value },
                            { value: content.stat2Value.value, label: content.stat2Label.value },
                            { value: content.stat3Value.value, label: content.stat3Label.value },
                        ].map((stat, i) => (
                            <div key={i} className="group relative">
                                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 transition-transform duration-300 group-hover:scale-110">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm text-white/50 uppercase tracking-widest font-light">
                                    {stat.label}
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-white/50 group-hover:w-full transition-all duration-500" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                    <div className="flex flex-col items-center gap-3 animate-bounce">
                        <span className="text-white/30 text-xs uppercase tracking-widest font-light">
                            {content.scroll.value}
                        </span>
                        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
                    </div>
                </div>
            </section>
        </>
    );
};

const GenAIServices = () => {
    const content = useIntlayer("generativeAIPage");

    const services = [
        { title: content.service1Title.value, description: content.service1Desc.value },
        { title: content.service2Title.value, description: content.service2Desc.value },
        { title: content.service3Title.value, description: content.service3Desc.value },
        { title: content.service4Title.value, description: content.service4Desc.value },
        { title: content.service5Title.value, description: content.service5Desc.value },
        { title: content.service6Title.value, description: content.service6Desc.value },
    ];

    return (
        <section id="gen-ai-services" className="py-24 bg-gradient-to-b from-[#050A1E] to-[#0A1628]">
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
                            className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#8B5CF6]/30 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#EC4899]/10 flex items-center justify-center mb-6">
                                    <div className="w-8 h-8 bg-[#8B5CF6] rounded-lg" />
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

export default function GenerativeAIClient() {
    return (
        <>
            <GenerativeAIHero />
            <GenAIServices />
        </>
    );
}