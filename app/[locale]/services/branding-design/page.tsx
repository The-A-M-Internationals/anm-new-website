"use client";

import { useRouter } from "next/navigation";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { useEffect, useRef } from "react";

const BrandingDesignHero = () => {
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
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
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
                        const alpha = (1 - distance / 100) * 0.2;
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
                ctx.fillStyle = 'rgba(201, 168, 76, 0.5)';
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
                @keyframes float-swatch {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-30px) rotate(15deg); }
                }
                @keyframes morph-text {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    50% { transform: scale(1.1) rotate(-5deg); }
                }
                @keyframes logo-pop {
                    0% { transform: scale(0); opacity: 0; }
                    50% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1); opacity: 1; }
                }
                @keyframes palette-slide {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(-15px); }
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
                        backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(201, 168, 76, 0.2) 0%, transparent 50%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient-flow 20s ease infinite',
                    }}
                />

                {/* Floating Color Swatches */}
                {[
                    { top: '15%', left: '10%', color: '#C9A84C', delay: '0s' },
                    { top: '25%', right: '15%', color: '#D4AF37', delay: '1s' },
                    { bottom: '30%', left: '8%', color: '#FFD700', delay: '2s' },
                ].map((swatch, i) => (
                    <div
                        key={i}
                        className="absolute w-20 h-20 rounded-full shadow-2xl pointer-events-none opacity-60"
                        style={{
                            top: swatch.top,
                            left: swatch.left,
                            right: swatch.right,
                            bottom: swatch.bottom,
                            background: `linear-gradient(135deg, ${swatch.color} 0%, ${swatch.color}80 100%)`,
                            animation: `float-swatch 7s ease-in-out infinite ${swatch.delay}`,
                        }}
                    />
                ))}

                {/* Typography Sample */}
                <div 
                    className="absolute top-[20%] right-[12%] text-6xl font-bold text-white/20 pointer-events-none"
                    style={{ 
                        fontFamily: 'Lora, Georgia, serif',
                        animation: 'morph-text 5s ease-in-out infinite',
                    }}
                >
                    Aa
                </div>

                {/* Logo Grid */}
                <div 
                    className="absolute bottom-[20%] right-[10%] grid grid-cols-3 gap-2 pointer-events-none opacity-30"
                    style={{ animation: 'palette-slide 8s ease-in-out infinite' }}
                >
                    {[1,2,3,4,5,6,7,8,9].map(i => (
                        <div 
                            key={i} 
                            className="w-12 h-12 bg-white/10 rounded backdrop-blur-sm"
                            style={{ animation: `logo-pop 0.6s ease-out ${i * 0.1}s both` }}
                        />
                    ))}
                </div>

                {/* Sophisticated Brand Kit Mockup - Left Side */}
                <div 
                    className="absolute top-[35%] left-[5%] w-64 h-80 pointer-events-none opacity-50"
                    style={{ animation: 'float-swatch 9s ease-in-out infinite 1s' }}
                >
                    {/* Brand Guide Book */}
                    <div className="relative w-full h-full bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 backdrop-blur-sm border border-white/10 shadow-2xl">
                        {/* Book Spine Effect */}
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-[#C9A84C] to-[#D4AF37] rounded-l-2xl" />
                        
                        {/* Title */}
                        <div className="text-white/40 text-xs font-semibold mb-4 tracking-widest">BRAND GUIDELINES</div>
                        
                        {/* Color Palette Section */}
                        <div className="mb-4">
                            <div className="text-white/30 text-[10px] mb-2 uppercase tracking-wide">Colors</div>
                            <div className="flex gap-2">
                                {['#C9A84C', '#D4AF37', '#FFD700'].map((color, i) => (
                                    <div key={i} className="relative group">
                                        <div 
                                            className="w-12 h-12 rounded-lg shadow-lg transition-transform duration-300 hover:scale-110"
                                            style={{ backgroundColor: color }}
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white/20 rounded-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Typography Section */}
                        <div className="mb-4">
                            <div className="text-white/30 text-[10px] mb-2 uppercase tracking-wide">Typography</div>
                            <div className="space-y-1">
                                <div className="text-white/40 text-lg font-bold" style={{ fontFamily: 'Lora, Georgia, serif' }}>Lora</div>
                                <div className="text-white/30 text-xs">Heading • Display</div>
                                <div className="h-px bg-white/10 my-2" />
                                <div className="text-white/40 text-sm">System UI</div>
                                <div className="text-white/30 text-[10px]">Body • Interface</div>
                            </div>
                        </div>
                        
                        {/* Logo Variations Grid */}
                        <div className="mb-3">
                            <div className="text-white/30 text-[10px] mb-2 uppercase tracking-wide">Logo Variants</div>
                            <div className="grid grid-cols-2 gap-2">
                                {[0, 1, 2, 3].map((i) => (
                                    <div 
                                        key={i} 
                                        className="h-8 bg-white/5 rounded border border-white/10 flex items-center justify-center"
                                        style={{ animation: `logo-pop 0.6s ease-out ${i * 0.15}s both` }}
                                    >
                                        <div className="w-3 h-3 rounded-full bg-[#C9A84C]" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Floating Design Elements */}
                        <div className="absolute -right-3 top-10 w-8 h-8 bg-[#C9A84C]/30 rounded-full blur-sm" style={{ animation: 'pulse 3s ease-in-out infinite' }} />
                        <div className="absolute -left-2 bottom-20 w-6 h-6 bg-[#D4AF37]/30 rounded-full blur-sm" style={{ animation: 'pulse 3s ease-in-out infinite 1s' }} />
                    </div>
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
                        <span className="relative text-[#C9A84C] text-sm font-semibold tracking-wide">Creative Excellence</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "Lora, Georgia, serif" }}>
                        Brand
                        <br />
                        <span className="relative inline-block mt-4">
                            <span 
                                className="bg-gradient-to-r from-[#C9A84C] via-[#D4AF37] to-[#C9A84C] bg-clip-text text-transparent"
                                style={{ backgroundSize: '200% auto', animation: 'gradient-flow 5s ease infinite' }}
                            >
                                Identity
                            </span>
                            <div className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-32" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            </div>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
                        Strategic brand design that creates lasting impressions and builds powerful visual identities that resonate with your audience.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                        <button
                            onClick={() => router.push(getLocalizedPath("en", "/contact"))}
                            className="group relative px-12 py-5 bg-[#C9A84C] text-[#0C1F4A] rounded-2xl text-lg font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#C9A84C]/40 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            <span className="relative z-10">Start Your Brand</span>
                        </button>
                        <button
                            onClick={() => {
                                const servicesSection = document.getElementById('branding-services');
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
                            { value: "10+", label: "Brands Created" },
                            { value: "100%", label: "Original Design" },
                            { value: "Award", label: "Winning Work" },
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

const BrandingServices = () => {
    const services = [
        { title: "Logo Design", description: "Distinctive logos that capture your brand essence", color: "#C9A84C" },
        { title: "Brand Guidelines", description: "Comprehensive brand books that ensure consistency", color: "#D4AF37" },
        { title: "Visual Identity", description: "Complete visual systems from colors to typography", color: "#C9A84C" },
        { title: "Packaging Design", description: "Product packaging that stands out on shelves", color: "#D4AF37" },
        { title: "Marketing Collateral", description: "Business cards, brochures, and promotional materials", color: "#C9A84C" },
        { title: "Brand Strategy", description: "Strategic positioning and messaging frameworks", color: "#D4AF37" },
    ];

    return (
        <section id="branding-services" className="py-24 bg-gradient-to-b from-[#08111A] to-[#050A1E]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: "Lora, Georgia, serif" }}>
                        Our Branding Services
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        Creating memorable brands that connect with audiences and drive business success
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

                                <div className="mt-6 flex items-center gap-2 text-[#C9A84C] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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

export default function BrandingDesignPage() {
    return (
        <>
            <BrandingDesignHero />
            <BrandingServices />
        </>
    );
}