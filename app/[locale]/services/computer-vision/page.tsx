"use client";

import { useRouter } from "next/navigation";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { useEffect, useRef } from "react";

const ComputerVisionHero = () => {
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
        for (let i = 0; i < 75; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.58,
                vy: (Math.random() - 0.5) * 0.58,
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
                    if (distance < 118) {
                        const alpha = (1 - distance / 118) * 0.29;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(14, 165, 233, 0.6)';
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
                @keyframes scan-line {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                @keyframes detection-box {
                    0%, 100% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.05); opacity: 1; }
                }
                @keyframes eye-blink {
                    0%, 90%, 100% { transform: scaleY(1); }
                    95% { transform: scaleY(0.1); }
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
                        backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(14, 165, 233, 0.25) 0%, transparent 50%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient-flow 20s ease infinite',
                    }}
                />

                {/* Eye/Camera - Left */}
                <div className="absolute top-[22%] left-[8%] w-32 h-32 pointer-events-none opacity-50">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <ellipse 
                            cx="50" 
                            cy="50" 
                            rx="40" 
                            ry="25" 
                            fill="rgba(14, 165, 233, 0.2)" 
                            stroke="#0EA5E9" 
                            strokeWidth="2" 
                            style={{ animation: 'eye-blink 4s ease-in-out infinite' }}
                        />
                        <circle cx="50" cy="50" r="12" fill="#0EA5E9" />
                        <circle cx="50" cy="50" r="6" fill="#60A5FA" />
                    </svg>
                </div>

                {/* Detection Boxes - Right */}
                <div className="absolute top-[25%] right-[10%] w-40 h-40 pointer-events-none opacity-45">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {[
                            {x: 10, y: 10, w: 35, h: 35},
                            {x: 55, y: 15, w: 30, h: 30},
                            {x: 25, y: 55, w: 40, h: 35}
                        ].map((box, i) => (
                            <rect 
                                key={i} 
                                x={box.x} 
                                y={box.y} 
                                width={box.w} 
                                height={box.h} 
                                fill="none" 
                                stroke="#0EA5E9" 
                                strokeWidth="2" 
                                rx="2" 
                                style={{ animation: `detection-box 3s ease-in-out infinite ${i * 0.4}s` }}
                            />
                        ))}
                        <line 
                            x1="0" 
                            y1="50" 
                            x2="100" 
                            y2="50" 
                            stroke="#0EA5E9" 
                            strokeWidth="1" 
                            opacity="0.5" 
                            style={{ animation: 'scan-line 4s linear infinite' }}
                        />
                    </svg>
                </div>

                {/* Object Recognition Grid - Bottom */}
                <div className="absolute bottom-[20%] left-[15%] w-48 h-32 pointer-events-none opacity-40">
                    <svg viewBox="0 0 100 60" className="w-full h-full">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0EA5E9" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100" height="60" fill="url(#grid)" />
                        <circle cx="30" cy="25" r="8" fill="none" stroke="#0EA5E9" strokeWidth="2">
                            <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="70" cy="35" r="6" fill="none" stroke="#0EA5E9" strokeWidth="2">
                            <animate attributeName="r" values="6;10;6" dur="2.5s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                </div>

                <div 
                    className="relative z-10 w-[90%] max-w-6xl mx-auto text-center py-20"
                    style={{ animation: 'elegant-rise 1.2s ease-out' }}
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-10 rounded-full bg-white/5 border border-[#0EA5E9]/20 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animation: 'shimmer 4s ease-in-out infinite' }} />
                        <div className="relative w-2 h-2">
                            <div className="absolute inset-0 rounded-full bg-[#0EA5E9]" />
                            <div className="absolute inset-0 rounded-full bg-[#0EA5E9] animate-ping" />
                        </div>
                        <span className="relative text-[#0EA5E9] text-sm font-semibold tracking-wide">Visual Intelligence</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "Lora, Georgia, serif" }}>
                        Computer
                        <br />
                        <span className="relative inline-block mt-4">
                            <span 
                                className="bg-gradient-to-r from-[#0EA5E9] via-[#3B82F6] to-[#0EA5E9] bg-clip-text text-transparent"
                                style={{ backgroundSize: '200% auto', animation: 'gradient-flow 5s ease infinite' }}
                            >
                                Vision
                            </span>
                            <div className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0EA5E9] to-transparent overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-32" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            </div>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
                        See the world through AI eyes. Detect, recognize, and analyze visual content with human-level accuracy and superhuman speed.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                        <button
                            onClick={() => router.push(getLocalizedPath("en", "/contact"))}
                            className="group relative px-12 py-5 bg-[#0EA5E9] text-white rounded-2xl text-lg font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#0EA5E9]/40 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#0EA5E9] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            <span className="relative z-10">See Possibilities</span>
                        </button>
                        <button
                            onClick={() => {
                                const servicesSection = document.getElementById('cv-services');
                                servicesSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative px-12 py-5 bg-transparent text-white border-2 border-white/20 rounded-2xl text-lg font-semibold backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#0EA5E9]/50 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <span className="relative z-10">View Services</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
                        {[
                            { value: "99%", label: "Detection Accuracy" },
                            { value: "1000s", label: "Objects Recognized" },
                            { value: "60fps", label: "Processing Speed" },
                        ].map((stat, i) => (
                            <div key={i} className="group relative">
                                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-[#0EA5E9] to-[#3B82F6] bg-clip-text text-transparent mb-3 transition-transform duration-300 group-hover:scale-110">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-white/50 uppercase tracking-widest font-light">
                                    {stat.label}
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#0EA5E9] group-hover:w-full transition-all duration-500" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                    <div className="flex flex-col items-center gap-3 animate-bounce">
                        <span className="text-[#0EA5E9]/50 text-xs uppercase tracking-widest font-light">Scroll</span>
                        <div className="w-px h-12 bg-gradient-to-b from-[#0EA5E9]/50 to-transparent" />
                    </div>
                </div>
            </section>
        </>
    );
};

const ComputerVisionServices = () => {
    const services = [
        { title: "Object Detection", description: "Identify and locate objects in images" },
        { title: "Face Recognition", description: "Accurate facial identification and verification" },
        { title: "Image Classification", description: "Categorize visual content automatically" },
        { title: "OCR & Document Processing", description: "Extract text from images and documents" },
        { title: "Video Analytics", description: "Real-time video understanding and analysis" },
        { title: "Quality Inspection", description: "Automated visual defect detection" },
    ];

    return (
        <section id="cv-services" className="py-24 bg-gradient-to-b from-[#08111A] to-[#050A1E]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: "Lora, Georgia, serif" }}>
                        Our Computer Vision Services
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        Transform images into actionable insights
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#0EA5E9]/30 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/20 to-[#3B82F6]/10 flex items-center justify-center mb-6">
                                    <div className="w-8 h-8 bg-[#0EA5E9] rounded-lg" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Lora, Georgia, serif" }}>
                                    {service.title}
                                </h3>

                                <p className="text-white/60 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-[#0EA5E9] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-sm font-semibold">Learn More</span>
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default function ComputerVisionPage() {
    return (
        <>
            <ComputerVisionHero />
            <ComputerVisionServices />
        </>
    );
}