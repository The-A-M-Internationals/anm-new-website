"use client";

import { useRouter } from "next/navigation";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { useEffect, useRef, useState } from "react";

const SocialMediaHero = () => {
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
        for (let i = 0; i < 60; i++) {
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
                    if (distance < 100) {
                        const alpha = (1 - distance / 100) * 0.25;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });

                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
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
                @keyframes float-social {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-25px) rotate(10deg); }
                }
                @keyframes pulse-ring {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.3); opacity: 0.3; }
                }
                @keyframes engagement-rise {
                    0% { transform: translateY(20px) scaleY(0); opacity: 0; }
                    100% { transform: translateY(0) scaleY(1); opacity: 1; }
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
                @keyframes notification-pop {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                }
            `}</style>

            <section className="relative overflow-hidden bg-gradient-to-br from-[#050A1E] via-[#0C1F4A] to-[#08111A] min-h-screen flex items-center">
                <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.6 }} />

                <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient-flow 20s ease infinite',
                    }}
                />

                {/* Floating Instagram Icon - Top Left */}
                <div 
                    className="absolute top-[12%] left-[8%] w-24 h-24 pointer-events-none opacity-50"
                    style={{ animation: 'float-social 6s ease-in-out infinite' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <defs>
                            <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#FD5" />
                                <stop offset="50%" stopColor="#F56" />
                                <stop offset="100%" stopColor="#C13584" />
                            </linearGradient>
                        </defs>
                        <rect x="15" y="15" width="70" height="70" rx="15" fill="url(#igGrad)" />
                        <circle cx="50" cy="50" r="15" fill="none" stroke="white" strokeWidth="3" />
                        <circle cx="72" cy="28" r="4" fill="white" />
                    </svg>
                </div>

                {/* Floating LinkedIn Icon - Top Right */}
                <div 
                    className="absolute top-[18%] right-[10%] w-20 h-20 pointer-events-none opacity-45"
                    style={{ animation: 'float-social 7s ease-in-out infinite 1s' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <rect x="15" y="15" width="70" height="70" rx="8" fill="#0077B5" />
                        <text x="50" y="65" fontSize="50" fill="white" textAnchor="middle" fontWeight="bold">in</text>
                    </svg>
                </div>

                {/* Floating Heart/Like - Bottom Left */}
                <div 
                    className="absolute bottom-[25%] left-[12%] w-16 h-16 pointer-events-none opacity-40"
                    style={{ animation: 'notification-pop 2s ease-in-out infinite' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 85 C20 60, 10 40, 10 25 C10 10, 20 5, 30 10 C40 15, 45 25, 50 30 C55 25, 60 15, 70 10 C80 5, 90 10, 90 25 C90 40, 80 60, 50 85 Z" fill="#FF6B9D" />
                        <circle cx="50" cy="30" r="35" fill="none" stroke="#FF6B9D" strokeWidth="2" opacity="0.3">
                            <animate attributeName="r" values="35;45;35" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                </div>

                {/* Engagement Chart - Right */}
                <div 
                    className="absolute top-[30%] right-[8%] w-32 h-32 pointer-events-none opacity-35"
                    style={{ animation: 'float-social 8s ease-in-out infinite 2s' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {[25, 40, 55, 75, 60, 85].map((height, i) => (
                            <rect
                                key={i}
                                x={8 + i * 14}
                                y={95 - height}
                                width="10"
                                height={height}
                                fill="#3B82F6"
                                opacity={0.6}
                                style={{ animation: `engagement-rise 1.5s ease-out ${i * 0.15}s infinite` }}
                            />
                        ))}
                    </svg>
                </div>

                {/* Notification Bell - Bottom Right */}
                <div 
                    className="absolute bottom-[20%] right-[15%] w-18 h-18 pointer-events-none opacity-40"
                    style={{ animation: 'notification-pop 3s ease-in-out infinite 1.5s' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path d="M50 20 L50 25 M35 25 C35 25, 35 35, 35 45 C35 55, 30 60, 30 60 L70 60 C70 60, 65 55, 65 45 C65 35, 65 25, 65 25 L35 25 M42 65 C42 70, 45 75, 50 75 C55 75, 58 70, 58 65" 
                              fill="none" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="62" cy="32" r="5" fill="#FF6B9D" />
                    </svg>
                </div>

                <div 
                    className="relative z-10 w-[90%] max-w-6xl mx-auto text-center py-20"
                    style={{ animation: 'elegant-rise 1.2s ease-out' }}
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-10 rounded-full bg-white/5 border border-[#3B82F6]/20 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animation: 'shimmer 4s ease-in-out infinite' }} />
                        <div className="relative w-2 h-2">
                            <div className="absolute inset-0 rounded-full bg-[#3B82F6]" />
                            <div className="absolute inset-0 rounded-full bg-[#3B82F6] animate-ping" />
                        </div>
                        <span className="relative text-[#3B82F6] text-sm font-semibold tracking-wide">Social Media Excellence</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "Lora, Georgia, serif" }}>
                        Social
                        <br />
                        <span className="relative inline-block mt-4">
                            <span 
                                className="bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent"
                                style={{ backgroundSize: '200% auto', animation: 'gradient-flow 5s ease infinite' }}
                            >
                                Amplification
                            </span>
                            <div className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-32" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            </div>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
                        Strategic social media management that builds communities, drives engagement, and amplifies your brand presence across all platforms.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                        <button
                            onClick={() => router.push(getLocalizedPath("en", "/contact#form"))}
                            className="group relative px-12 py-5 bg-[#3B82F6] text-white rounded-2xl text-lg font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#3B82F6]/40 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            <span className="relative z-10">Start Growing</span>
                        </button>
                        <button
                            onClick={() => {
                                const servicesSection = document.getElementById('social-services');
                                servicesSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative px-12 py-5 bg-transparent text-white border-2 border-white/20 rounded-2xl text-lg font-semibold backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#3B82F6]/50 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <span className="relative z-10">View Services</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
                        {[
                            { value: "++", label: "Monthly Reach" },
                            { value: "85%", label: "Engagement Rate" },
                            { value: "24/7", label: "Community Management" },
                        ].map((stat, i) => (
                            <div key={i} className="group relative">
                                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent mb-3 transition-transform duration-300 group-hover:scale-110">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-white/50 uppercase tracking-widest font-light">
                                    {stat.label}
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#3B82F6] group-hover:w-full transition-all duration-500" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                    <div className="flex flex-col items-center gap-3 animate-bounce">
                        <span className="text-[#3B82F6]/50 text-xs uppercase tracking-widest font-light">Scroll</span>
                        <div className="w-px h-12 bg-gradient-to-b from-[#3B82F6]/50 to-transparent" />
                    </div>
                </div>
            </section>
        </>
    );
};

const SocialMediaServices = () => {
    const services = [
        { title: "Content Strategy", description: "Data-driven content plans that resonate with your audience", color: "#3B82F6" },
        { title: "Community Management", description: "Build and nurture engaged communities around your brand", color: "#60A5FA" },
        { title: "Influencer Marketing", description: "Strategic partnerships that amplify your message", color: "#3B82F6" },
        { title: "Social Analytics", description: "Comprehensive reporting and insights to optimize performance", color: "#60A5FA" },
        { title: "Paid Social Campaigns", description: "ROI-focused advertising across all major platforms", color: "#3B82F6" },
        { title: "Creative Production", description: "Eye-catching content that stops the scroll", color: "#60A5FA" },
    ];

    return (
        <section id="social-services" className="py-24 bg-gradient-to-b from-[#08111A] to-[#050A1E]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: "Lora, Georgia, serif" }}>
                        Our Social Media Services
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        Comprehensive social media management that drives real business results
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#3B82F6]/30 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#60A5FA]/10 flex items-center justify-center mb-6">
                                    <div className="w-8 h-8 bg-[#3B82F6] rounded-lg" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Lora, Georgia, serif" }}>
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

export default function SocialMediaPage() {
    return (
        <>
            <SocialMediaHero />
            <SocialMediaServices />
        </>
    );
}