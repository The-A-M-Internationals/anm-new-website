"use client";

import { useRouter, useParams } from "next/navigation";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { useEffect, useRef } from "react";
import { useIntlayer } from "next-intlayer";
import { AppLocale } from "@/types/locale";
import { handleHashLink } from "@/lib/handleHashLink";

const ContentMarketingHero = () => {
    const router = useRouter();
    const params = useParams();
    const locale = (params?.locale as string) || "en";
    const content = useIntlayer("contentMarketingPage");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    // ... rest of the file ...
    // Note: I will replace the whole return block for the hero to ensure I get the buttons.

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const words: Array<{ x: number; y: number; text: string; opacity: number; speed: number }> = [];
        const sampleWords = ['Strategy', 'Growth', 'Content', 'Data', 'Story'];
        for (let i = 0; i < 25; i++) {
            words.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                text: sampleWords[Math.floor(Math.random() * sampleWords.length)],
                opacity: Math.random() * 0.2,
                speed: Math.random() * 0.4 + 0.1
            });
        }

        let animationFrame: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            words.forEach((w) => {
                w.y -= w.speed;
                if (w.y < -20) w.y = canvas.height + 20;

                ctx.font = '14px sans-serif';
                ctx.fillStyle = `rgba(236, 72, 153, ${w.opacity})`;
                ctx.fillText(w.text, w.x, w.y);
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
                @keyframes pencil-trace {
                    0% { width: 0; opacity: 0; }
                    50% { width: 100%; opacity: 0.3; }
                    100% { width: 0; opacity: 0; }
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

            <section className="relative overflow-hidden bg-gradient-to-br from-[#050A1E] via-[#1F0B18] to-[#0A0508] min-h-screen flex items-center">
                <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.6 }} />

                <div 
                    className="relative z-10 w-[90%] max-w-6xl mx-auto text-center py-20"
                    style={{ animation: 'elegant-rise 1.2s ease-out' }}
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-10 rounded-full bg-white/5 border border-pink-500/20 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animation: 'shimmer 4s ease-in-out infinite' }} />
                        <div className="relative w-2 h-2">
                            <div className="absolute inset-0 rounded-full bg-pink-500" />
                            <div className="absolute inset-0 rounded-full bg-pink-500 animate-ping" />
                        </div>
                        <span className="relative text-pink-400 text-sm font-semibold tracking-wide">
                            {content.heroBadge.value}
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "var(--heading-font)" }}>
                        {content.heroTitleLine1.value}
                        <br />
                        <span className="relative inline-block mt-4">
                            <span 
                                className="bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 bg-clip-text text-transparent"
                                style={{ backgroundSize: '200% auto', animation: 'gradient-flow 5s ease infinite' }}
                            >
                                {content.heroTitleLine2.value}
                            </span>
                            <div className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-32" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            </div>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
                        {content.heroDescription.value}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                        <button
                            onClick={(e) => {
                                const link = getLocalizedPath(locale as AppLocale, "/contact#form");
                                if (!handleHashLink(e, link, router)) {
                                    router.push(link);
                                }
                            }}
                            className="group relative px-12 py-5 bg-pink-600 text-white rounded-2xl text-lg font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-pink-600/40 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            <span className="relative z-10">{content.getStarted.value}</span>
                        </button>
                        <button
                            onClick={(e) => {
                                if (!handleHashLink(e, "#marketing-services", router)) {
                                    const servicesSection = document.getElementById('marketing-services');
                                    servicesSection?.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className="group relative px-12 py-5 bg-transparent text-white border-2 border-white/20 rounded-2xl text-lg font-semibold backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-pink-500/50 hover:-translate-y-1"
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
                                <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-pink-400 to-rose-600 bg-clip-text text-transparent mb-3 transition-transform duration-300 group-hover:scale-110">
                                    {stat.value}
                                </div>
                                <div className="text-xs sm:text-sm text-white/50 uppercase tracking-widest font-light">
                                    {stat.label}
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-pink-500 group-hover:w-full transition-all duration-500" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                    <div className="flex flex-col items-center gap-3 animate-bounce">
                        <span className="text-pink-500/50 text-xs uppercase tracking-widest font-light">
                            {content.scroll.value}
                        </span>
                        <div className="w-px h-12 bg-gradient-to-b from-pink-500/50 to-transparent" />
                    </div>
                </div>
            </section>
        </>
    );
};

const MarketingServices = () => {
    const content = useIntlayer("contentMarketingPage");

    const services = [
        { title: content.service1Title.value, description: content.service1Desc.value },
        { title: content.service2Title.value, description: content.service2Desc.value },
        { title: content.service3Title.value, description: content.service3Desc.value },
        { title: content.service4Title.value, description: content.service4Desc.value },
        { title: content.service5Title.value, description: content.service5Desc.value },
        { title: content.service6Title.value, description: content.service6Desc.value },
    ];

    return (
        <section id="marketing-services" className="py-24 bg-gradient-to-b from-[#0A0508] to-[#050A1E]">
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
                            className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-pink-500/30 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/10 flex items-center justify-center mb-6">
                                    <div className="w-8 h-8 bg-pink-500 rounded-lg" />
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

export default function ContentMarketingClient() {
    return (
        <>
            <ContentMarketingHero />
            <MarketingServices />
        </>
    );
}