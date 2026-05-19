"use client";

import { useRouter } from "next/navigation";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { useEffect, useRef } from "react";

const MachineLearningHero = () => {
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
        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
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
                    if (distance < 120) {
                        const alpha = (1 - distance / 120) * 0.3;
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
                ctx.fillStyle = 'rgba(37, 99, 235, 0.6)';
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
                @keyframes neural-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.2); opacity: 1; }
                }
                @keyframes data-flow {
                    0% { stroke-dashoffset: 100; }
                    100% { stroke-dashoffset: 0; }
                }
                @keyframes layer-stack {
                    0% { transform: translateY(20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
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
                        backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(37, 99, 235, 0.25) 0%, transparent 50%)',
                        backgroundSize: '200% 200%',
                        animation: 'gradient-flow 20s ease infinite',
                    }}
                />

                {/* Neural Network Visualization - Left */}
                <div className="absolute top-[25%] left-[8%] w-48 h-48 pointer-events-none opacity-50">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {/* Input Layer */}
                        {[20, 40, 60, 80].map((y, i) => (
                            <circle key={`input-${i}`} cx="15" cy={y} r="4" fill="#2563EB" style={{ animation: `neural-pulse 2s ease-in-out infinite ${i * 0.2}s` }} />
                        ))}
                        {/* Hidden Layer 1 */}
                        {[15, 35, 50, 65, 85].map((y, i) => (
                            <circle key={`hidden1-${i}`} cx="40" cy={y} r="4" fill="#3B82F6" style={{ animation: `neural-pulse 2s ease-in-out infinite ${i * 0.15}s` }} />
                        ))}
                        {/* Hidden Layer 2 */}
                        {[25, 45, 65].map((y, i) => (
                            <circle key={`hidden2-${i}`} cx="65" cy={y} r="4" fill="#60A5FA" style={{ animation: `neural-pulse 2s ease-in-out infinite ${i * 0.25}s` }} />
                        ))}
                        {/* Output Layer */}
                        {[35, 65].map((y, i) => (
                            <circle key={`output-${i}`} cx="90" cy={y} r="4" fill="#93C5FD" style={{ animation: `neural-pulse 2s ease-in-out infinite ${i * 0.3}s` }} />
                        ))}
                        {/* Connections */}
                        {[20, 40, 60, 80].map((y1) =>
                            [15, 35, 50, 65, 85].map((y2, i) => (
                                <line key={`conn-${y1}-${y2}`} x1="15" y1={y1} x2="40" y2={y2} stroke="#2563EB" strokeWidth="0.5" opacity="0.3" />
                            ))
                        )}
                    </svg>
                </div>

                {/* ML Model Layers - Right */}
                <div className="absolute top-[20%] right-[10%] w-40 h-40 pointer-events-none opacity-45">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {[0, 1, 2].map((i) => (
                            <g key={i} style={{ animation: `layer-stack 0.8s ease-out ${i * 0.2}s both` }}>
                                <rect x="20" y={30 + i * 15} width="60" height="10" rx="2" fill={`rgba(37, 99, 235, ${0.8 - i * 0.2})`} stroke="#2563EB" strokeWidth="1" />
                                <text x="50" y={36 + i * 15} textAnchor="middle" fill="white" fontSize="6">Layer {i + 1}</text>
                            </g>
                        ))}
                    </svg>
                </div>

                {/* Data Flow Animation - Bottom */}
                <div className="absolute bottom-[20%] left-[15%] right-[15%] h-2 pointer-events-none opacity-40">
                    <svg viewBox="0 0 400 20" className="w-full h-full" preserveAspectRatio="none">
                        <line x1="0" y1="10" x2="400" y2="10" stroke="#2563EB" strokeWidth="2" strokeDasharray="10,5">
                            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
                        </line>
                        {[50, 150, 250, 350].map((x, i) => (
                            <circle key={i} cx={x} cy="10" r="4" fill="#3B82F6">
                                <animate attributeName="cx" from="0" to="400" dur="4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                            </circle>
                        ))}
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
                        <span className="relative text-[#2563EB] text-sm font-semibold tracking-wide">Intelligent Systems</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "Lora, Georgia, serif" }}>
                        Machine
                        <br />
                        <span className="relative inline-block mt-4">
                            <span 
                                className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent"
                                style={{ backgroundSize: '200% auto', animation: 'gradient-flow 5s ease infinite' }}
                            >
                                Learning
                            </span>
                            <div className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2563EB] to-transparent overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-32" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            </div>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
                        Advanced machine learning solutions that learn from data, adapt to patterns, and deliver intelligent predictions for your business.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                        <button
                            onClick={() => router.push(getLocalizedPath("en", "/contact"))}
                            className="group relative px-12 py-5 bg-[#2563EB] text-white rounded-2xl text-lg font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#2563EB]/40 hover:-translate-y-1"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            <span className="relative z-10">Start Building</span>
                        </button>
                        <button
                            onClick={() => {
                                const servicesSection = document.getElementById('ml-services');
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
                            { value: "99%", label: "Model Accuracy" },
                            { value: "10X", label: "Faster Processing" },
                            { value: "24/7", label: "Learning Cycle" },
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

const MachineLearningServices = () => {
    const services = [
        { title: "Predictive Analytics", description: "Forecast trends and outcomes with precision", color: "#2563EB" },
        { title: "Classification Models", description: "Categorize data automatically with AI", color: "#3B82F6" },
        { title: "Regression Analysis", description: "Identify relationships and patterns in data", color: "#2563EB" },
        { title: "Clustering Algorithms", description: "Group similar data points intelligently", color: "#3B82F6" },
        { title: "Anomaly Detection", description: "Spot outliers and unusual patterns instantly", color: "#2563EB" },
        { title: "Deep Learning", description: "Neural networks for complex problem solving", color: "#3B82F6" },
    ];

    return (
        <section id="ml-services" className="py-24 bg-gradient-to-b from-[#08111A] to-[#050A1E]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: "Lora, Georgia, serif" }}>
                        Our Machine Learning Services
                    </h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">
                        Harness the power of AI to transform data into actionable intelligence
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

export default function MachineLearningPage() {
    return (
        <>
            <MachineLearningHero />
            <MachineLearningServices />
        </>
    );
}