"use client";

import { useRouter } from "next/navigation";
import { useIntlayer } from "next-intlayer";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { useEffect, useRef, useState } from "react";

const DigitalMarketingHero = () => {
    const router = useRouter();
    const content = useIntlayer("digitalMarketingServices");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = (e.clientY / window.innerHeight) * 2 - 1;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: Array<{
            x: number;
            y: number;
            baseX: number;
            baseY: number;
        }> = [];

        const gridSize = 80;
        const cols = Math.ceil(canvas.width / gridSize) + 1;
        const rows = Math.ceil(canvas.height / gridSize) + 1;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const x = j * gridSize;
                const y = i * gridSize;
                particles.push({ x, y, baseX: x, baseY: y });
            }
        }

        let time = 0;
        let animationFrame: number;
        
        const animate = () => {
            time += 0.008;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                const distance = Math.sqrt(
                    Math.pow(p.baseX - canvas.width / 2, 2) + 
                    Math.pow(p.baseY - canvas.height / 2, 2)
                );
                const wave = Math.sin(distance * 0.008 - time) * 15;
                const wave2 = Math.cos(distance * 0.012 + time * 0.5) * 8;
                p.x = p.baseX + wave;
                p.y = p.baseY + wave2;
            });

            particles.forEach((p, i) => {
                particles.slice(i + 1).forEach((p2) => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < gridSize * 1.5) {
                        const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
                        const alpha = (1 - distance / (gridSize * 1.5)) * 0.2;
                        gradient.addColorStop(0, `rgba(201, 168, 76, ${alpha})`);
                        gradient.addColorStop(0.5, `rgba(201, 168, 76, ${alpha * 1.5})`);
                        gradient.addColorStop(1, `rgba(201, 168, 76, ${alpha})`);
                        
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                });

                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 3);
                gradient.addColorStop(0, 'rgba(201, 168, 76, 0.6)');
                gradient.addColorStop(1, 'rgba(201, 168, 76, 0)');
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
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
                @keyframes morph-blob {
                    0%, 100% { 
                        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
                        transform: translate(0, 0) scale(1);
                    }
                    33% { 
                        border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
                        transform: translate(20px, -20px) scale(1.1);
                    }
                    66% { 
                        border-radius: 50% 60% 30% 60% / 30% 60% 60% 40%;
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }
                @keyframes globe-rotate {
                    from { transform: perspective(1000px) rotateY(0deg); }
                    to { transform: perspective(1000px) rotateY(360deg); }
                }
                @keyframes gradient-flow {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes elegant-rise {
                    0% { transform: translateY(30px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                @keyframes float-elegant {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-15px) scale(1.05); }
                }
                @keyframes ripple-expand {
                    0% { transform: scale(0.8); opacity: 0.8; }
                    100% { transform: scale(1.8); opacity: 0; }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%) skewX(-15deg); }
                    100% { transform: translateX(200%) skewX(-15deg); }
                }
                @keyframes chart-grow {
                    0% { transform: scaleY(0); transform-origin: bottom; }
                    100% { transform: scaleY(1); transform-origin: bottom; }
                }
                @keyframes icon-float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes pulse-glow {
                    0%, 100% { filter: drop-shadow(0 0 10px rgba(201, 168, 76, 0.3)); }
                    50% { filter: drop-shadow(0 0 25px rgba(201, 168, 76, 0.6)); }
                }
            `}</style>

            <section className="relative overflow-hidden bg-gradient-to-br from-[#050A1E] via-[#0C1F4A] to-[#08111A] min-h-screen flex items-center">
                <canvas 
                    ref={canvasRef}
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: 0.8 }}
                />

                <div 
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(201, 168, 76, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient-flow 25s ease infinite',
                    }}
                />

                {/* Animated Rising Chart - Left */}
                <div 
                    className="absolute left-[8%] top-1/3 w-32 h-32 pointer-events-none opacity-40"
                    style={{ animation: 'icon-float 7s ease-in-out infinite' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {[30, 50, 70, 90, 60].map((height, i) => (
                            <rect
                                key={i}
                                x={10 + i * 16}
                                y={95 - height}
                                width="12"
                                height={height}
                                fill="#C9A84C"
                                opacity={0.6 + i * 0.1}
                                style={{ animation: `chart-grow 2s ease-out ${i * 0.2}s infinite` }}
                            />
                        ))}
                    </svg>
                </div>

                {/* Hashtag - Top Right */}
                <div 
                    className="absolute top-[15%] right-[15%] w-24 h-24 pointer-events-none opacity-45"
                    style={{ animation: 'icon-float 6s ease-in-out infinite 1s, pulse-glow 3s ease-in-out infinite' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <line x1="30" y1="20" x2="20" y2="80" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
                        <line x1="60" y1="20" x2="50" y2="80" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
                        <line x1="70" y1="35" x2="10" y2="45" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
                        <line x1="90" y1="55" x2="30" y2="65" stroke="#3B82F6" strokeWidth="8" strokeLinecap="round" />
                    </svg>
                </div>

                {/* Cursor Click - Bottom Right */}
                <div 
                    className="absolute bottom-[20%] right-[10%] w-20 h-20 pointer-events-none opacity-50"
                    style={{ animation: 'icon-float 8s ease-in-out infinite 2s' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M 30 20 L 30 75 L 45 60 L 55 80 L 65 75 L 55 55 L 75 55 Z" fill="url(#cursorGrad)" stroke="#C9A84C" strokeWidth="2" />
                        <circle cx="70" cy="40" r="8" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.8">
                            <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                        <defs>
                            <linearGradient id="cursorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(201, 168, 76, 0.3)" />
                                <stop offset="100%" stopColor="rgba(201, 168, 76, 0.1)" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                <div 
                    className="absolute right-[8%] top-[25%] w-96 h-96 pointer-events-none opacity-30"
                    style={{
                        background: 'radial-gradient(circle, rgba(201, 168, 76, 0.4) 0%, rgba(201, 168, 76, 0.1) 50%, transparent 70%)',
                        filter: 'blur(40px)',
                        animation: 'morph-blob 20s ease-in-out infinite',
                    }}
                />

                <div 
                    className="absolute right-[10%] top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-50"
                    style={{ 
                        animation: 'globe-rotate 80s linear infinite',
                        transform: `perspective(1000px) rotateX(${mousePos.y * 3}deg) rotateY(${mousePos.x * 3}deg)`,
                        transition: 'transform 0.5s ease-out',
                    }}
                >
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                        <defs>
                            <path id="equatorPath" d="M 20,100 A 80,80 0 1,1 20,100.1" fill="none" />
                            <path id="meridianPath" d="M 100,20 Q 60,100 100,180 T 100,20" fill="none" />
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        
                        <ellipse cx="100" cy="100" rx="40" ry="80" fill="none" stroke="rgba(201, 168, 76, 0.25)" strokeWidth="1" />
                        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(201, 168, 76, 0.4)" strokeWidth="1.5" />
                        
                        <circle r="3" fill="#C9A84C" filter="url(#glow)">
                            <animateMotion dur="6s" repeatCount="indefinite">
                                <mpath href="#equatorPath" />
                            </animateMotion>
                            <animate attributeName="opacity" values="0;1;1;0" dur="6s" repeatCount="indefinite" />
                        </circle>
                        
                        <circle r="3" fill="#3B82F6" filter="url(#glow)">
                            <animateMotion dur="5s" repeatCount="indefinite">
                                <mpath href="#meridianPath" />
                            </animateMotion>
                            <animate attributeName="opacity" values="0;1;1;0" dur="5s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                </div>

                <div 
                    className="absolute top-[20%] left-[15%] w-40 h-40 pointer-events-none opacity-25"
                    style={{ animation: 'float-elegant 10s ease-in-out infinite' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {[45, 35, 25].map((r, i) => (
                            <circle 
                                key={i} 
                                cx="50" 
                                cy="50" 
                                r={r} 
                                fill="none" 
                                stroke="rgba(201, 168, 76, 0.6)" 
                                strokeWidth="0.8"
                            >
                                <animate 
                                    attributeName="stroke-opacity" 
                                    values="0.3;0.8;0.3" 
                                    dur={`${3 + i}s`}
                                    begin={`${i * 0.5}s`}
                                    repeatCount="indefinite" 
                                />
                            </circle>
                        ))}
                    </svg>
                </div>

                <div className="absolute bottom-[20%] left-[20%] w-64 h-64 pointer-events-none">
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="absolute inset-0 rounded-full border-2 border-[#C9A84C]"
                            style={{ animation: `ripple-expand 4s ease-out infinite ${i * 1.3}s` }}
                        />
                    ))}
                </div>

                {[
                    { top: '33%', width: '600px', color: '#C9A84C', opacity: '40', delay: '0s' },
                    { top: '50%', width: '500px', color: '#3B82F6', opacity: '30', delay: '1s' },
                    { top: '67%', width: '550px', color: '#C9A84C', opacity: '35', delay: '2s' },
                ].map((ray, i) => (
                    <div key={i} className="absolute right-0 h-px pointer-events-none overflow-hidden" style={{ top: ray.top, width: ray.width }}>
                        <div className="absolute inset-0" style={{ background: `linear-gradient(to left, rgba(${ray.color === '#C9A84C' ? '201, 168, 76' : '59, 130, 246'}, 0.${ray.opacity}), transparent)` }} />
                        <div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-32"
                            style={{ animation: `shimmer 3.5s ease-in-out infinite ${ray.delay}` }}
                        />
                    </div>
                ))}

                <div 
                    className="relative z-10 w-[90%] max-w-6xl mx-auto text-center py-20"
                    style={{ animation: 'elegant-rise 1.2s ease-out' }}
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-10 rounded-full bg-white/5 border border-[#C9A84C]/20 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animation: 'shimmer 4s ease-in-out infinite' }} />
                        <div className="relative w-2 h-2">
                            <div className="absolute inset-0 rounded-full bg-[#C9A84C]" />
                            <div className="absolute inset-0 rounded-full bg-[#C9A84C] animate-ping" />
                        </div>
                        <span className="relative text-[#C9A84C] text-sm font-semibold tracking-wide">Powered by Innovation</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "Lora, Georgia, serif" }}>
                        {content.heroTitle}
                        <br />
                        <span className="relative inline-block mt-4">
                            <span 
                                className="bg-gradient-to-r from-[#C9A84C] via-[#D4AF37] to-[#C9A84C] bg-clip-text text-transparent"
                                style={{ backgroundSize: '200% auto', animation: 'gradient-flow 5s ease infinite' }}
                            >
                                {content.heroSubtitle}
                            </span>
                            <div className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent overflow-hidden">
                                <div 
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-32"
                                    style={{ animation: 'shimmer 3s ease-in-out infinite' }}
                                />
                            </div>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
                        {content.heroDescription}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                        <button
                            onClick={() => {
                                const servicesSection = document.getElementById('digital-marketing-services');
                                servicesSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative px-12 py-5 bg-[#C9A84C] text-[#0C1F4A] rounded-2xl text-lg font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#C9A84C]/40 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div 
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                style={{ animation: 'shimmer 3s ease-in-out infinite' }}
                            />
                            <span className="relative z-10 flex items-center gap-3">
                                {content.exploreServices}
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </button>
                        <button
                            onClick={() => router.push(getLocalizedPath("en", "/contact"))}
                            className="group relative px-12 py-5 bg-transparent text-white border-2 border-white/20 rounded-2xl text-lg font-semibold backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#C9A84C]/50 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <span className="relative z-10">{content.bookConsultation}</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
                        {[
                            { value: "200%", label: "Return on Investment" },
                            { value: "98%", label: "Client Satisfaction" },
                            { value: "300%", label: "Traffic Growth" },
                        ].map((stat, i) => (
                            <div key={i} className="group relative">
                                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-[#C9A84C] to-[#D4AF37] bg-clip-text text-transparent mb-3 transition-transform duration-300 group-hover:scale-110">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-white/50 uppercase tracking-widest font-light">
                                    {stat.label}
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#C9A84C] group-hover:w-full transition-all duration-500" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                    <div className="flex flex-col items-center gap-3 animate-bounce">
                        <span className="text-[#C9A84C]/50 text-xs uppercase tracking-widest font-light">Scroll</span>
                        <div className="w-px h-12 bg-gradient-to-b from-[#C9A84C]/50 to-transparent" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default DigitalMarketingHero;