"use client";

import { useRouter } from "next/navigation";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { useEffect, useRef } from "react";

const RPAHero = () => {
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
                vx: (Math.random() - 0.5) * 0.55,
                vy: (Math.random() - 0.5) * 0.55,
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
                    if (distance < 115) {
                        const alpha = (1 - distance / 115) * 0.28;
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
                ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
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
                @keyframes workflow-step {
                    0%, 100% { opacity: 0.5; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.1); }
                }
                @keyframes robot-move {
                    0%, 100% { transform: translateX(0) rotate(0deg); }
                    50% { transform: translateX(-15px) rotate(-5deg); }
                }
                @keyframes process-flow {
                    0% { stroke-dashoffset: 100; }
                    100% { stroke-dashoffset: 0; }
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

                <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(59, 130, 246, 0.25) 0%, transparent 50%)',
                    backgroundSize: '200% 200%',
                    animation: 'gradient-flow 20s ease infinite',
                }} />

                {/* Workflow Process - Left */}
                <div className="absolute top-[20%] left-[8%] w-48 h-48 pointer-events-none opacity-50">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        {[{y: 20, d: '0s'}, {y: 50, d: '0.5s'}, {y: 80, d: '1s'}].map((step, i) => (
                            <g key={i}>
                                <rect x="25" y={step.y - 8} width="50" height="16" rx="3" fill="rgba(59, 130, 246, 0.3)" stroke="#3B82F6" strokeWidth="2" style={{ animation: `workflow-step 3s ease-in-out infinite ${step.d}` }} />
                                {i < 2 && <line x1="50" y1={step.y + 8} x2="50" y2={step.y + 22} stroke="#3B82F6" strokeWidth="2" strokeDasharray="4,2" style={{ animation: 'process-flow 2s linear infinite' }} />}
                            </g>
                        ))}
                    </svg>
                </div>

                {/* Robot Arm - Right */}
                <div className="absolute top-[25%] right-[10%] w-32 h-32 pointer-events-none opacity-45" style={{ animation: 'robot-move 4s ease-in-out infinite' }}>
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <rect x="40" y="20" width="20" height="8" rx="2" fill="#3B82F6" />
                        <rect x="45" y="28" width="10" height="25" rx="2" fill="#60A5FA" />
                        <rect x="35" y="53" width="30" height="8" rx="2" fill="#3B82F6" />
                        <circle cx="50" cy="70" r="12" fill="rgba(59, 130, 246, 0.3)" stroke="#3B82F6" strokeWidth="2" />
                        <circle cx="50" cy="70" r="6" fill="#60A5FA" />
                    </svg>
                </div>

                {/* Automation Gears - Bottom */}
                <div className="absolute bottom-[20%] left-[15%] w-40 h-20 pointer-events-none opacity-40">
                    <svg viewBox="0 0 100 50" className="w-full h-full">
                        {[{cx: 25, r: 15}, {cx: 60, r: 12}, {cx: 85, r: 10}].map((gear, i) => (
                            <g key={i}>
                                <circle cx={gear.cx} cy="25" r={gear.r} fill="rgba(59, 130, 246, 0.2)" stroke="#3B82F6" strokeWidth="2" />
                                <animateTransform attributeName="transform" type="rotate" from={`0 ${gear.cx} 25`} to={`360 ${gear.cx} 25`} dur={`${4 + i}s`} repeatCount="indefinite" />
                            </g>
                        ))}
                    </svg>
                </div>

                <div className="relative z-10 w-[90%] max-w-6xl mx-auto text-center py-20" style={{ animation: 'elegant-rise 1.2s ease-out' }}>
                    <div className="inline-flex items-center gap-3 px-6 py-3 mb-10 rounded-full bg-white/5 border border-[#3B82F6]/20 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" style={{ animation: 'shimmer 4s ease-in-out infinite' }} />
                        <div className="relative w-2 h-2">
                            <div className="absolute inset-0 rounded-full bg-[#3B82F6]" />
                            <div className="absolute inset-0 rounded-full bg-[#3B82F6] animate-ping" />
                        </div>
                        <span className="relative text-[#3B82F6] text-sm font-semibold tracking-wide">Process Automation</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight" style={{ fontFamily: "Lora, Georgia, serif" }}>
                        Robotic Process
                        <br />
                        <span className="relative inline-block mt-4">
                            <span className="bg-gradient-to-r from-[#3B82F6] via-[#60A5FA] to-[#3B82F6] bg-clip-text text-transparent" style={{ backgroundSize: '200% auto', animation: 'gradient-flow 5s ease infinite' }}>
                                Automation
                            </span>
                            <div className="absolute -bottom-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3B82F6] to-transparent overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-32" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            </div>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-14 leading-relaxed font-light">
                        Automate repetitive tasks with intelligent robots that work 24/7, reduce errors, and free your team for strategic work.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
                        <button onClick={() => router.push(getLocalizedPath("en", "/contact#form"))} className="group relative px-12 py-5 bg-[#3B82F6] text-white rounded-2xl text-lg font-semibold overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#3B82F6]/40 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: 'shimmer 3s ease-in-out infinite' }} />
                            <span className="relative z-10">Automate Now</span>
                        </button>
                        <button onClick={() => { const s = document.getElementById('rpa-services'); s?.scrollIntoView({ behavior: 'smooth' }); }} className="group relative px-12 py-5 bg-transparent text-white border-2 border-white/20 rounded-2xl text-lg font-semibold backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#3B82F6]/50 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            <span className="relative z-10">View Services</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
                        {[{ value: "80%", label: "Tasks Automated" }, { value: "50%", label: "Cost Reduction" }, { value: "24/7", label: "Operation" }].map((stat, i) => (
                            <div key={i} className="group relative">
                                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-[#3B82F6] to-[#60A5FA] bg-clip-text text-transparent mb-3 transition-transform duration-300 group-hover:scale-110">{stat.value}</div>
                                <div className="text-sm text-white/50 uppercase tracking-widest font-light">{stat.label}</div>
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

const RPAServices = () => {
    const services = [
        { title: "Business Process Automation", description: "Streamline workflows end-to-end" },
        { title: "Data Entry & Migration", description: "Eliminate manual data tasks" },
        { title: "Invoice Processing", description: "Automate financial operations" },
        { title: "Report Generation", description: "Create reports automatically" },
        { title: "Email & Notifications", description: "Intelligent communication handling" },
        { title: "System Integration", description: "Connect disparate systems seamlessly" },
    ];

    return (
        <section id="rpa-services" className="py-24 bg-gradient-to-b from-[#08111A] to-[#050A1E]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: "Lora, Georgia, serif" }}>Our RPA Services</h2>
                    <p className="text-xl text-white/60 max-w-3xl mx-auto">Transform operations with intelligent automation</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="group relative p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#3B82F6]/30 transition-all duration-500 hover:-translate-y-2">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#3B82F6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B82F6]/20 to-[#60A5FA]/10 flex items-center justify-center mb-6">
                                    <div className="w-8 h-8 bg-[#3B82F6] rounded-lg" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "Lora, Georgia, serif" }}>{service.title}</h3>
                                <p className="text-white/60 leading-relaxed">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default function RPAPage() {
    return (<><RPAHero /><RPAServices /></>);
}