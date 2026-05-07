"use client";

import { useRouter } from "next/navigation";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { useEffect, useRef } from "react";

const WebDevelopmentHero = () => {
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
        for (let i = 0; i < 70; i++) {
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
                        const alpha = (1 - distance / 110) * 0.25;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });

                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(37, 99, 235, 0.5)';
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
                @keyframes float-browser {
                    0%, 100% { transform: translateY(0) rotateX(0deg); }
                    50% { transform: translateY(-25px) rotateX(5deg); }
                }
                @keyframes code-type {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
                @keyframes device-bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
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
                        backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(37, 99, 235, 0.2) 0%, transparent 50%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient-flow 20s ease infinite',
                    }}
                />

                {/* Floating Browser Window */}
                <div 
                    className="absolute top-[18%] left-[8%] w-48 h-32 bg-white/5 rounded-lg border border-white/20 backdrop-blur-sm pointer-events-none opacity-60"
                    style={{ animation: 'float-browser 8s ease-in-out infinite' }}
                >
                    <div className="h-6 bg-white/10 rounded-t-lg flex items-center gap-1 px-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <div className="p-3 space-y-2">
                        <div className="h-2 bg-blue-500/30 rounded w-3/4" />
                        <div className="h-2 bg-blue-500/20 rounded w-1/2" />
                        <div className="h-2 bg-blue-500/25 rounded w-5/6" />
                    </div>
                </div>

                {/* Code Snippet */}
                <div 
                    className="absolute top-[25%] right-[10%] bg-black/40 rounded-lg p-4 backdrop-blur-sm border border-green-500/20 font-mono text-xs text-green-400/70 pointer-events-none opacity-50"
                    style={{ animation: 'float-browser 9s ease-in-out infinite 1s' }}
                >
                    <div style={{ animation: 'code-type 2s ease-in-out infinite' }}>const build = () =&gt; &#123;</div>
                    <div style={{ animation: 'code-type 2s ease-in-out infinite 0.3s' }}>&nbsp;&nbsp;return success;</div>
                    <div style={{ animation: 'code-type 2s ease-in-out infinite 0.6s' }}>&#125;;</div>
                </div>

                {/* Responsive Devices */}
                <div 
                    className="absolute bottom-[25%] left-[12%] flex gap-2 pointer-events-none opacity-45"
                    style={{ animation: 'device-bounce 6s ease-in-out infinite' }}
                >
                    {/* Desktop */}
                    <div className="w-16 h-12 border-2 border-blue-500/50 rounded-sm relative">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500/50" />
                    </div>
                    {/* Tablet */}
                    <div className="w-10 h-12 border-2 border-blue-500/50 rounded-sm" />
                    {/* Mobile */}
                    <div className="w-6 h-12 border-2 border-blue-500/50 rounded" />
                </div>

                {/* Wireframe Grid */}
                <div 
                    className="absolute top-[50%] right-[8%] w-32 h-32 pointer-events-none opacity-30"
                    style={{ animation: 'float-browser 7s ease-in-out infinite 2s' }}
                >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <rect x="5" y="5" width="90" height="15" fill="none" stroke="#2563EB" strokeWidth="1" />
                        <rect x="5" y="25" width="40" height="70" fill="none" stroke="#2563EB" strokeWidth="1" />
                        <rect x="50" y="25" width="45" height="30" fill="none" stroke="#2563EB" strokeWidth="1" />
                        <rect x="50" y="60" width="45" height="35" fill="none" stroke="#2563EB" strokeWidth="1" />
                    </svg>
                </div>

                <div 
                    className="relative z-10 w-[90%] max-w-6xl mx-auto text-center py-20"
                    style={{ animation: 'elegant-rise 1.2s ease-out' }}
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-10 rounded-full bg-white/5 border border-[#2563EB]/20 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animation: 'shimmer 4s ease-in-out infinite' }} />
                        <div className="relative w-2 h-2">
                            <div className="absolute inset-0 rounded-full bg-[#2563EB]" />
                            <div className="absolute inset-0 rounded-full bg-[#2563EB] animate-ping" />
                        </div>
                        <span className="relative text-[#2563EB] text-sm font-semibold tracking-wide">Digital Innovation</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "Lora, Georgia, serif" }}>
                        Digital
                        <br />
                        <span className="relative inline-block mt-4">
                            <span 
                                className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent"
                                style={{ backgroundSize: '200% auto', animation: 'gradient-flow 5s ease infinite' }}
                            >
                                Experiences
                            </span>
                            <div className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563EB] to-transparent overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-32" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            </div>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
                        Custom web development that combines stunning design with powerful functionality to create exceptional digital experiences.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                        <button
                            onClick={() => router.push(getLocalizedPath("en", "/contact"))}
                            className="group relative px-12 py-5 bg-[#2563EB] text-white rounded-2xl text-lg font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#2563EB]/40 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            <span className="relative z-10">Start Your Project</span>
                        </button>
                        <button
                            onClick={() => {
                                const servicesSection = document.getElementById('web-services');
                                servicesSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative px-12 py-5 bg-transparent text-white border-2 border-white/20 rounded-2xl text-lg font-semibold backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#2563EB]/50 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <span className="relative z-10">View Services</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
                        {[
                            { value: "Modern", label: "Websites Built" },
                            { value: "99.9%", label: "Uptime SLA" },
                            { value: "Mobile", label: "First Design" },
                        ].map((stat, i) => (
                            <div key={i} className="group relative">
                                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent mb-3 transition-transform duration-300 group-hover:scale-110">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-white/50 uppercase tracking-widest font-light">
                                    {stat.label}
                                </div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#2563EB] group-hover:w-full transition-all duration-500" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                    <div className="flex flex-col items-center gap-3 animate-bounce">
                        <span className="text-[#2563EB]/50 text-xs uppercase tracking-widest font-light">Scroll</span>
                        <div className="w-px h-12 bg-gradient-to-b from-[#2563EB]/50 to-transparent" />
                    </div>
                </div>
            </section>
        </>
    );
};

const WebDevelopmentServices = () => {
    const services = [
        { title: "Custom Websites", description: "Tailored web solutions built to your exact specifications", color: "#2563EB" },
        { title: "E-Commerce", description: "Powerful online stores that drive sales and conversions", color: "#3B82F6" },
        { title: "Web Applications", description: "Complex web apps with rich functionality", color: "#2563EB" },
        { title: "CMS Development", description: "Easy-to-manage content management systems", color: "#3B82F6" },
        { title: "API Integration", description: "Seamless third-party service connections", color: "#2563EB" },
        { title: "Performance Optimization", description: "Lightning-fast load times and smooth performance", color: "#3B82F6" },
    ];

    return (
        <section id="web-services" className="py-24 bg-gradient-to-b from-[#08111A] to-[#050A1E]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: "Lora, Georgia, serif" }}>
                        Our Web Development Services
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        Building modern, scalable web solutions with cutting-edge technologies
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#2563EB]/30 transition-all duration-500 hover:-translate-y-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2563EB]/20 to-[#3B82F6]/10 flex items-center justify-center mb-6">
                                    <div className="w-8 h-8 bg-[#2563EB] rounded-lg" />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Lora, Georgia, serif" }}>
                                    {service.title}
                                </h3>

                                <p className="text-white/60 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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

export default function WebDevelopmentPage() {
    return (
        <>
            <WebDevelopmentHero />
            <WebDevelopmentServices />
        </>
    );
}