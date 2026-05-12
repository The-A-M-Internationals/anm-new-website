"use client";

import { useRouter } from "next/navigation";
import { useIntlayer } from "next-intlayer";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { useEffect, useRef, useState } from "react";

const VideoProductionHero = () => {
    const router = useRouter();
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

        const particles: Array<{ x: number; y: number; baseX: number; baseY: number; vx: number; vy: number; }> = [];
        const particleCount = 80;

        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            particles.push({
                x, y, baseX: x, baseY: y,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
            });
        }

        let time = 0;
        let animationFrame: number;
        
        const animate = () => {
            time += 0.01;
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

                    if (distance < 120) {
                        const alpha = (1 - distance / 120) * 0.3;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(201, 168, 76, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });

                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(201, 168, 76, 0.6)';
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
                @keyframes film-roll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes lens-float {
                    0%, 100% { transform: translateY(0) rotateZ(0deg); }
                    50% { transform: translateY(-30px) rotateZ(15deg); }
                }
                @keyframes camera-pulse {
                    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 10px rgba(201, 168, 76, 0.3)); }
                    50% { transform: scale(1.1); filter: drop-shadow(0 0 25px rgba(201, 168, 76, 0.6)); }
                }
                @keyframes play-bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
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
                <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ opacity: 0.7 }} />

                <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(201, 168, 76, 0.25) 0%, transparent 50%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient-flow 20s ease infinite',
                    }}
                />

                {/* Floating Camera Lens - Top Left */}
                <div 
                    className="absolute top-[15%] left-[10%] w-32 h-32 pointer-events-none opacity-40"
                    style={{ animation: 'lens-float 8s ease-in-out infinite' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="#C9A84C" strokeWidth="3" />
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#C9A84C" strokeWidth="2" opacity="0.6" />
                        <circle cx="50" cy="50" r="25" fill="rgba(201, 168, 76, 0.2)" />
                        <path d="M 30 50 Q 50 30 70 50 T 30 50" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
                    </svg>
                </div>

                {/* Film Roll - Bottom */}
                <div className="absolute bottom-[10%] left-0 w-full h-16 opacity-20 overflow-hidden">
                    <div className="flex gap-2" style={{ animation: 'film-roll 20s linear infinite', width: '200%' }}>
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div key={i} className="w-12 h-16 border-2 border-[#C9A84C] rounded flex-shrink-0">
                                <div className="w-full h-2 bg-[#C9A84C] mt-1" />
                                <div className="w-full h-2 bg-[#C9A84C] mt-auto mb-1" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Camera Icon - Right */}
                <div 
                    className="absolute top-[25%] right-[12%] w-28 h-28 pointer-events-none opacity-45"
                    style={{ animation: 'camera-pulse 4s ease-in-out infinite' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <rect x="15" y="30" width="70" height="50" rx="5" fill="url(#cameraGrad)" stroke="#C9A84C" strokeWidth="2" />
                        <circle cx="50" cy="55" r="15" fill="none" stroke="#C9A84C" strokeWidth="3" />
                        <circle cx="50" cy="55" r="10" fill="rgba(201, 168, 76, 0.3)" />
                        <rect x="70" y="20" width="15" height="15" rx="2" fill="#C9A84C" />
                        <defs>
                            <linearGradient id="cameraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(201, 168, 76, 0.2)" />
                                <stop offset="100%" stopColor="rgba(201, 168, 76, 0.05)" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Play Button - Bottom Right */}
                <div 
                    className="absolute bottom-[25%] right-[15%] w-20 h-20 pointer-events-none opacity-50"
                    style={{ animation: 'play-bounce 3s ease-in-out infinite' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="45" fill="rgba(201, 168, 76, 0.2)" stroke="#C9A84C" strokeWidth="2" />
                        <path d="M 35 25 L 35 75 L 75 50 Z" fill="#C9A84C" />
                    </svg>
                </div>

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
                        <span className="relative text-[#C9A84C] text-sm font-semibold tracking-wide">Cinematic Excellence</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "Lora, Georgia, serif" }}>
                        Cinematic
                        <br />
                        <span className="relative inline-block mt-4">
                            <span 
                                className="bg-gradient-to-r from-[#C9A84C] via-[#D4AF37] to-[#C9A84C] bg-clip-text text-transparent"
                                style={{ backgroundSize: '200% auto', animation: 'gradient-flow 5s ease infinite' }}
                            >
                                Storytelling
                            </span>
                            <div className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-32" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            </div>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
                        Professional video production and photography that captures your brand&apos;s essence with artistic precision and technical excellence.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                        <button
                            onClick={() => router.push(getLocalizedPath("en", "/contact#form"))}
                            className="group relative px-12 py-5 bg-[#C9A84C] text-[#0C1F4A] rounded-2xl text-lg font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#C9A84C]/40 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            <span className="relative z-10">Start Your Project</span>
                        </button>
                        <button
                            onClick={() => {
                                const servicesSection = document.getElementById('video-services');
                                servicesSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative px-12 py-5 bg-transparent text-white border-2 border-white/20 rounded-2xl text-lg font-semibold backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#C9A84C]/50 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <span className="relative z-10">View Services</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
                        {[
                            { value: "50+", label: "Videos Produced" },
                            { value: "4K", label: "Ultra HD Quality" },
                            { value: "24/7", label: "Production Support" },
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

const VideoProductionServices = () => {
    const services = [
        {
            title: "Corporate Videos",
            description: "Professional videos that communicate your brand message with impact",
            icon: "briefcase",
            color: "#C9A84C"
        },
        {
            title: "Commercial Production",
            description: "High-quality commercials that drive engagement and conversions",
            icon: "video",
            color: "#D4AF37"
        },
        {
            title: "Event Coverage",
            description: "Capture every moment with cinematic precision and artistry",
            icon: "camera",
            color: "#C9A84C"
        },
        {
            title: "Product Photography",
            description: "Stunning visuals that showcase your products in the best light",
            icon: "image",
            color: "#D4AF37"
        },
        {
            title: "Aerial Videography",
            description: "Breathtaking drone footage that adds a unique perspective",
            icon: "drone",
            color: "#C9A84C"
        },
        {
            title: "Post-Production",
            description: "Expert editing, color grading, and effects for flawless results",
            icon: "edit",
            color: "#D4AF37"
        },
    ];

    return (
        <section id="video-services" className="py-24 bg-gradient-to-b from-[#08111A] to-[#050A1E]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: "Lora, Georgia, serif" }}>
                        Our Video Services
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        From concept to delivery, we handle every aspect of video production with professional excellence
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#C9A84C]/30 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#C9A84C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A84C]/20 to-[#D4AF37]/10 flex items-center justify-center mb-6">
                                    <div className="w-8 h-8 bg-[#C9A84C] rounded-lg" />
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

export default function VideoProductionPage() {
    return (
        <>
            <VideoProductionHero />
            <VideoProductionServices />
        </>
    );
}