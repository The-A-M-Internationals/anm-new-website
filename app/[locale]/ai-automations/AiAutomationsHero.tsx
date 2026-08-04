"use client";

import { useRouter } from "next/navigation";
import { useIntlayer, useLocale } from "next-intlayer";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { useEffect, useRef, useState } from "react";
import { AppLocale } from "@/types/locale";

const AIAutomationsHero = () => {
    const router = useRouter();
    const { locale } = useLocale();
    const content = useIntlayer("aiAutomations");
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

        // Neural network particle system
        class NeuralNode {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            color: string;
            
            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
                const colors = ['#1E3A8A', '#1E40AF', '#2563EB', '#3B82F6'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                if (!canvas) return;
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 4);
                gradient.addColorStop(0, this.color + 'CC');
                gradient.addColorStop(1, this.color + '00');
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            }
        }

        const nodes: NeuralNode[] = [];
        for (let i = 0; i < 150; i++) {
            nodes.push(new NeuralNode(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            ));
        }

        let animationFrame: number;
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw nodes
            nodes.forEach((node, i) => {
                node.update();
                node.draw();

                // Draw connections
                nodes.slice(i + 1).forEach((otherNode) => {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y);
                        const alpha = (1 - distance / 120) * 0.3;
                        gradient.addColorStop(0, node.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
                        gradient.addColorStop(1, otherNode.color + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
                        
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1;
                        ctx.stroke();
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
                @keyframes ai-pulse-ring {
                    0% { transform: scale(0.8); opacity: 0.8; }
                    100% { transform: scale(2); opacity: 0; }
                }
                @keyframes ai-data-flow {
                    0% { transform: translateX(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateX(200%); opacity: 0; }
                }
                @keyframes ai-brain-pulse {
                    0%, 100% { filter: drop-shadow(0 0 20px rgba(155, 121, 224, 0.3)); }
                    50% { filter: drop-shadow(0 0 40px rgba(155, 121, 224, 0.6)); }
                }
                @keyframes ai-circuit-flow {
                    0% { stroke-dashoffset: 1000; }
                    100% { stroke-dashoffset: 0; }
                }
                @keyframes ai-glow-intense {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.8; }
                }
                @keyframes ai-float-complex {
                    0%, 100% { transform: translateY(0) rotateX(0deg); }
                    50% { transform: translateY(-30px) rotateX(10deg); }
                }
                @keyframes ai-morph-brain {
                    0%, 100% { 
                        border-radius: 50% 50% 40% 60% / 50% 40% 60% 50%;
                        transform: scale(1);
                    }
                    33% { 
                        border-radius: 40% 60% 50% 50% / 60% 50% 50% 40%;
                        transform: scale(1.1);
                    }
                    66% { 
                        border-radius: 60% 40% 50% 50% / 40% 60% 50% 50%;
                        transform: scale(0.95);
                    }
                }
            `}</style>

            <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0F1F3D] to-[#050A1E] min-h-[85vh] flex items-center">
                {/* Neural network canvas */}
                <canvas 
                    ref={canvasRef}
                    className="absolute inset-0 pointer-events-none"
                    style={{ opacity: 0.7 }}
                />

                {/* Animated gradient layers */}
                <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'radial-gradient(ellipse at 20% 30%, rgba(30, 58, 138, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(37, 99, 235, 0.25) 0%, transparent 50%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient-flow 20s ease infinite',
                    }}
                />

                {/* Brain circuit pattern - Left Side */}
                <div 
                    className="absolute start-[8%] top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none opacity-40"
                    style={{ animation: 'ai-brain-pulse 4s ease-in-out infinite' }}
                >
                    <svg viewBox="0 0 200 200" className="w-full h-full rtl:-scale-x-100">
                        {/* Brain outline */}
                        <path d="M 100 40 Q 140 40 160 70 Q 170 90 165 110 Q 160 130 150 145 Q 130 165 100 160 Q 70 165 50 145 Q 40 130 35 110 Q 30 90 40 70 Q 60 40 100 40" 
                            fill="none" 
                            stroke="#1E40AF" 
                            strokeWidth="2" 
                        />
                        
                        {/* Circuit paths inside brain */}
                        <path d="M 70 80 L 90 80 L 100 90 L 110 80 L 130 80" 
                            stroke="#2563EB" 
                            strokeWidth="1.5" 
                            fill="none"
                            strokeDasharray="200"
                            style={{ animation: 'ai-circuit-flow 3s linear infinite' }}
                        />
                        <path d="M 60 100 L 80 100 L 85 110 L 90 100 L 110 100 L 115 110 L 120 100 L 140 100" 
                            stroke="#3B82F6" 
                            strokeWidth="1.5" 
                            fill="none"
                            strokeDasharray="250"
                            style={{ animation: 'ai-circuit-flow 4s linear infinite 1s' }}
                        />
                        <path d="M 70 120 L 85 120 L 90 130 L 100 120 L 110 130 L 115 120 L 130 120" 
                            stroke="#1E40AF" 
                            strokeWidth="1.5" 
                            fill="none"
                            strokeDasharray="200"
                            style={{ animation: 'ai-circuit-flow 3.5s linear infinite 0.5s' }}
                        />
                        
                        {/* Neural nodes */}
                        {[
                            {x: 70, y: 80}, {x: 100, y: 70}, {x: 130, y: 80},
                            {x: 60, y: 100}, {x: 100, y: 100}, {x: 140, y: 100},
                            {x: 70, y: 120}, {x: 100, y: 130}, {x: 130, y: 120}
                        ].map((pos, i) => (
                            <circle key={`node-${i}`} cx={pos.x} cy={pos.y} r="3" fill="#93C5FD">
                                <animate attributeName="r" values="3;5;3" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                            </circle>
                        ))}
                    </svg>
                </div>

                {/* Morphing AI orb - Right Side */}
                <div 
                    className="absolute end-[10%] top-[30%] w-80 h-80 pointer-events-none opacity-35"
                    style={{
                        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(155, 121, 224, 0.2) 40%, transparent 70%)',
                        filter: 'blur(50px)',
                        animation: 'ai-morph-brain 15s ease-in-out infinite',
                    }}
                />

                {/* Data stream visualizations - Right */}
                <div className="absolute end-0 top-1/4 w-[500px] h-2 pointer-events-none overflow-hidden opacity-40">
                    <div className="absolute inset-0 bg-gradient-to-l from-[#1E40AF]/60 via-[#2563EB]/80 to-transparent" />
                    <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent w-40"
                        style={{ animation: 'ai-data-flow 3s ease-in-out infinite' }}
                    />
                </div>
                <div className="absolute end-0 top-1/2 w-[450px] h-2 pointer-events-none overflow-hidden opacity-35">
                    <div className="absolute inset-0 bg-gradient-to-l from-[#3B82F6]/50 via-[#1E40AF]/70 to-transparent" />
                    <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent w-40"
                        style={{ animation: 'ai-data-flow 4s ease-in-out infinite 1s' }}
                    />
                </div>
                <div className="absolute end-0 top-2/3 w-[480px] h-2 pointer-events-none overflow-hidden opacity-38">
                    <div className="absolute inset-0 bg-gradient-to-l from-[#2563EB]/55 via-[#3B82F6]/75 to-transparent" />
                    <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/65 to-transparent w-40"
                        style={{ animation: 'ai-data-flow 3.5s ease-in-out infinite 2s' }}
                    />
                </div>

                {/* Pulsing AI core rings - Bottom Left */}
                <div className="absolute bottom-[20%] start-[15%] w-64 h-64 pointer-events-none">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={`ring-${i}`}
                            className="absolute inset-0 rounded-full border-2 border-[#1E40AF]"
                            style={{
                                animation: `ai-pulse-ring 4s ease-out infinite ${i * 1}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Floating binary code - Top */}
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
                    <div className="flex gap-2 text-[#1E40AF] font-mono text-xs">
                        {['01001001', '01000001', '01001001'].map((bin, i) => (
                            <div key={i} style={{ animation: `ai-float-complex ${6 + i}s ease-in-out infinite ${i * 0.5}s` }}>
                                {bin}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main content */}
                <div 
                    className="relative z-10 w-[90%] max-w-6xl mx-auto text-center py-24 md:py-32"
                    style={{ animation: 'elegant-rise 1.2s ease-out' }}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-10 rounded-full bg-white/5 border border-[#1E40AF]/30 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                            style={{ animation: 'shimmer 4s ease-in-out infinite' }}
                        />
                        <div className="relative w-2 h-2">
                            <div className="absolute inset-0 rounded-full bg-[#1E40AF]" />
                            <div className="absolute inset-0 rounded-full bg-[#1E40AF] animate-ping" />
                        </div>
                        <span className="relative text-[#93C5FD] text-sm font-semibold tracking-wide">{content.heroBadge.value}</span>
                    </div>

                    {/* Main heading */}
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "var(--heading-font)" }}>
                        {content.heroTitle.value}
                        <br />
                        <span className="relative inline-block mt-4">
                            <span 
                                className="bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent"
                                style={{
                                    backgroundSize: '200% auto',
                                    animation: 'gradient-flow 5s ease infinite',
                                }}
                            >
                                {content.heroSubtitle.value}
                            </span>
                            <div className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1E40AF] to-transparent overflow-hidden">
                                <div 
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-32"
                                    style={{ animation: 'shimmer 3s ease-in-out infinite' }}
                                />
                            </div>
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
                        {content.heroDescription.value}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 px-4">
                        <button
                            onClick={() => {
                                const servicesSection = document.getElementById('ai-automation-services');
                                servicesSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="group relative w-full sm:w-auto px-12 py-5 bg-[#1E40AF] text-white rounded-2xl text-lg font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#1E40AF]/40 hover:-translate-y-1 flex justify-center"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#1E40AF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                style={{ animation: 'shimmer 3s ease-in-out infinite' }}
                            />
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {content.exploreServices.value}
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        </button>
                        <button
                            onClick={() => router.push(getLocalizedPath(locale as AppLocale, "/contact#form"))}
                            className="group relative w-full sm:w-auto px-12 py-5 bg-transparent text-white border-2 border-white/20 rounded-2xl text-lg font-semibold backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#1E40AF]/50 hover:-translate-y-1 flex justify-center"
                        >
                            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <span className="relative z-10 flex items-center justify-center">{content.bookConsultation.value}</span>
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
                        {[
                            { value: content.stat1Value.value, label: content.stat1Label.value },
                            { value: content.stat2Value.value, label: content.stat2Label.value },
                            { value: content.stat3Value.value, label: content.stat3Label.value },
                        ].map((stat, i) => (
                            <div 
                                key={`stat-${i}`}
                                className="group relative"
                            >
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

                {/* Scroll indicator */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
                    <div className="flex flex-col items-center gap-3 animate-bounce">
                        <span className="text-[#1E40AF]/50 text-xs uppercase tracking-widest font-light">{content.scroll.value}</span>
                        <div className="w-px h-12 bg-gradient-to-b from-[#1E40AF]/50 to-transparent" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default AIAutomationsHero;