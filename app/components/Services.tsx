"use client";

import { useLocale, useIntlayer } from "next-intlayer";
import { useRouter } from "next/navigation";
import type { AppLocale } from "@/types/locale";
import { getLocalizedPath } from "@/lib/getLocalizedPath";

const Services = () => {
    const { locale } = useLocale();
    const currentLocale = locale as AppLocale;
    const content = useIntlayer("services");
    const router = useRouter();

    return (
        <>
            <style>{`
                @keyframes am-bar-up {
                    from { transform: scaleY(0); }
                    to   { transform: scaleY(1); }
                }
                @keyframes am-draw-line {
                    from { stroke-dashoffset: 400; }
                    to   { stroke-dashoffset: 0; }
                }
                @keyframes am-link-flow {
                    0%   { stroke-dashoffset: 40; }
                    100% { stroke-dashoffset: 0; }
                }
                @keyframes am-brain-line {
                    0%,100% { opacity: .15; }
                    50%     { opacity: .8; }
                }
                @keyframes am-float-icon {
                    0%,100% { transform: translateY(0); }
                    50%     { transform: translateY(-5px); }
                }
                .am-svc-card {
                    background: #fff;
                    border-radius: 20px;
                    border: 1px solid #E8E4D8;
                    overflow: hidden;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
                }
                .am-svc-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 18px 44px rgba(12,31,74,.1);
                    border-color: #C9A84C;
                }
                .am-icon-box {
                    animation: am-float-icon 3.5s ease-in-out infinite;
                    width: 40px; height: 40px;
                    background: #fff;
                    border: 1.5px solid #E8D99A;
                    border-radius: 11px;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 3px 10px rgba(201,168,76,.2);
                }
                .am-arr { transition: transform .2s ease; }
                .am-svc-card:hover .am-arr { transform: translateX(4px); }
            `}</style>

            <section id="services" className="px-4 py-14 md:py-20">
                <div className="w-[90%] mx-auto">

                    {/* Heading */}
                    <div className="text-center mb-10 md:mb-14">
                        <h3 className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-semibold">
                            {content.heading.value}{" "}
                            <span className="text-[#D4AF37]">
                                {content.headingHighlight.value}
                            </span>{" "}
                            {content.headingEnd.value}
                        </h3>
                        <p className="text-[#6B7280] text-sm md:text-base mt-3 max-w-2xl mx-auto">
                            {content.subheading.value}
                        </p>
                    </div>

                    {/* 3-column grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">

                        {/* ── Finance ── */}
                        <div
                            className="am-svc-card"
                            onClick={() => router.push(getLocalizedPath(currentLocale, "/finance-transformation"))}
                        >
                            {/* Animated header: rising bar chart */}
                            <div style={{ background: "#FFFBED", padding: "20px 20px 14px", position: "relative", overflow: "hidden", borderBottom: "1px solid #EDE0A8", height: 172 }}>
                                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 220 172" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                    {/* Grid lines */}
                                    <line x1="0" y1="43" x2="220" y2="43" stroke="#C9A84C" strokeWidth=".4" strokeDasharray="3 4" opacity=".25" />
                                    <line x1="0" y1="86" x2="220" y2="86" stroke="#C9A84C" strokeWidth=".4" strokeDasharray="3 4" opacity=".25" />
                                    <line x1="0" y1="129" x2="220" y2="129" stroke="#C9A84C" strokeWidth=".4" strokeDasharray="3 4" opacity=".25" />
                                    {/* Bars */}
                                    {[
                                        { x: 20, y: 118, h: 44, o: 0.2, d: 0.2 },
                                        { x: 40, y: 100, h: 62, o: 0.32, d: 0.35 },
                                        { x: 60, y: 112, h: 50, o: 0.28, d: 0.5 },
                                        { x: 80, y: 82, h: 80, o: 0.44, d: 0.65 },
                                        { x: 100, y: 62, h: 100, o: 0.58, d: 0.8 },
                                        { x: 120, y: 45, h: 117, o: 0.72, d: 0.95 },
                                        { x: 140, y: 30, h: 132, o: 0.86, d: 1.1 },
                                        { x: 160, y: 18, h: 144, o: 1, d: 1.25 },
                                        { x: 180, y: 10, h: 152, o: 1, d: 1.4 },
                                    ].map((b, i) => (
                                        <rect key={i} x={b.x} y={b.y} width="13" height={b.h} rx="2"
                                            fill={`rgba(201,168,76,${b.o})`}
                                            style={{ transformOrigin: `${b.x}px 162px`, animation: `am-bar-up .6s ease-out ${b.d}s both` }}
                                        />
                                    ))}
                                    {/* Trend line */}
                                    <polyline points="26,122 46,104 66,116 86,86 106,66 126,50 146,34 166,22 186,14"
                                        fill="none" stroke="#0C1F4A" strokeWidth="2"
                                        strokeDasharray="400" strokeDashoffset="400"
                                        style={{ animation: "am-draw-line 1.6s ease-out 1.5s forwards" }}
                                        strokeLinecap="round" strokeLinejoin="round" />
                                    <circle r="4" fill="#0C1F4A">
                                        <animateMotion dur="2.8s" begin="3.2s" repeatCount="indefinite"
                                            path="M26,122 C46,104 66,116 86,86 106,66 126,50 146,34 166,22 186,14" />
                                    </circle>
                                    <text x="190" y="11" fontSize="8" fill="#0C1F4A" fontWeight="800" opacity=".85">▲24%</text>
                                </svg>
                                <div style={{ position: "relative", zIndex: 2 }}>
                                    <div className="am-icon-box">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 17l4-4 4 4 4-8 4 3" /><path d="M3 21h18" />
                                        </svg>
                                    </div>
                                    <p style={{ fontSize: 8.5, fontWeight: 800, color: "#92660A", letterSpacing: ".1em", textTransform: "uppercase", margin: "8px 0 2px" }}>Financial Transformation</p>
                                    <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0C1F4A", margin: 0, fontFamily: "Lora,Georgia,serif", lineHeight: 1.2 }}>Oracle EPM Solutions</h3>
                                </div>
                            </div>

                            {/* Body */}
                            <div style={{ padding: "14px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                                <p style={{ fontSize: 11.5, color: "#6B7280", margin: 0, lineHeight: 1.65 }}>
                                    Enterprise performance management unifying planning, consolidation and reporting across your organisation.
                                </p>
                                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                                    {["Planning & Budgeting", "Financial Consolidation", "Account Reconciliation", "Managed Services"].map(c => (
                                        <div key={c} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A84C", flexShrink: 0 }} />
                                            <span style={{ fontSize: 11, color: "#374151", fontWeight: 500 }}>{c}</span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginTop: "auto" }}>
                                    {[{ v: "40%", l: "faster close" }, { v: "150+", l: "implementations" }].map(m => (
                                        <div key={m.l} style={{ background: "#FFFBED", border: "1px solid #EDE0A8", borderRadius: 9, padding: "8px 10px" }}>
                                            <p style={{ fontSize: 17, fontWeight: 800, color: "#C9A84C", margin: 0, lineHeight: 1 }}>{m.v}</p>
                                            <p style={{ fontSize: 9.5, color: "#92660A", margin: "2px 0 0" }}>{m.l}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div style={{ padding: "9px 18px 13px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #F0EAD6" }}>
                                <div style={{ display: "flex", gap: 4 }}>
                                    {["Oracle EPM", "SAP"].map(t => (
                                        <span key={t} style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: "rgba(201,168,76,.12)", color: "#92660A", border: "1px solid rgba(201,168,76,.28)" }}>{t}</span>
                                    ))}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: "#C9A84C" }}>
                                    Explore <span className="am-arr">→</span>
                                </div>
                            </div>
                        </div>

                        {/* ── Digital ── */}
                        <div
                            className="am-svc-card"
                            onClick={() => router.push(getLocalizedPath(currentLocale, "/digital-transformation"))}
                        >
                            {/* Animated header: network graph */}
                            <div style={{ background: "#F5F3EE", padding: "20px 20px 14px", position: "relative", overflow: "hidden", borderBottom: "1px solid #E2DAC8", height: 172 }}>
                                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 220 172" xmlns="http://www.w3.org/2000/svg">
                                    {/* Connection lines */}
                                    {[
                                        { x1: 110, y1: 86, x2: 52, y2: 38, d: 0 },
                                        { x1: 110, y1: 86, x2: 172, y2: 42, d: 0.7 },
                                        { x1: 110, y1: 86, x2: 48, y2: 138, d: 1.4 },
                                        { x1: 110, y1: 86, x2: 176, y2: 132, d: 0.35 },
                                        { x1: 110, y1: 86, x2: 110, y2: 18, d: 1 },
                                    ].map((l, i) => (
                                        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
                                            stroke="#0C1F4A" strokeWidth="1" strokeDasharray="8 4" opacity=".2"
                                            style={{ animation: `am-link-flow 2.2s linear infinite ${l.d}s` }} />
                                    ))}
                                    {/* Gold data packets */}
                                    <circle r="3.5" fill="#C9A84C"><animateMotion dur="1.7s" repeatCount="indefinite" path="M110,86 L52,38" /></circle>
                                    <circle r="3.5" fill="#C9A84C"><animateMotion dur="1.9s" begin=".6s" repeatCount="indefinite" path="M110,86 L172,42" /></circle>
                                    <circle r="3.5" fill="#C9A84C"><animateMotion dur="1.8s" begin="1.2s" repeatCount="indefinite" path="M110,86 L48,138" /></circle>
                                    <circle r="3.5" fill="#C9A84C"><animateMotion dur="2s" begin=".3s" repeatCount="indefinite" path="M110,86 L176,132" /></circle>
                                    {/* Hub */}
                                    <circle cx="110" cy="86" r="14" fill="rgba(12,31,74,.08)" stroke="#0C1F4A" strokeWidth="1.5" />
                                    <circle cx="110" cy="86" r="7" fill="#0C1F4A" />
                                    <circle cx="110" cy="86" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity=".6">
                                        <animate attributeName="r" from="14" to="32" dur="2.4s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" from=".6" to="0" dur="2.4s" repeatCount="indefinite" />
                                    </circle>
                                    {/* Satellite nodes */}
                                    {[
                                        { cx: 52, cy: 38, label: "Cloud", ly: 26, d: 0 },
                                        { cx: 172, cy: 42, label: "ERP", ly: 30, d: 0.5 },
                                        { cx: 48, cy: 138, label: "API", ly: 156, d: 1 },
                                        { cx: 176, cy: 132, label: "Data", ly: 150, d: 0.8 },
                                        { cx: 110, cy: 18, label: "", ly: 0, d: 0.3 },
                                    ].map((n, i) => (
                                        <g key={i}>
                                            <circle cx={n.cx} cy={n.cy} r="9" fill="rgba(12,31,74,.07)" stroke="#0C1F4A" strokeWidth="1.2" />
                                            <circle cx={n.cx} cy={n.cy} r="5" fill="#0C1F4A">
                                                <animate attributeName="opacity" values=".5;1;.5" dur={`${2.2 + i * 0.2}s`} begin={`${n.d}s`} repeatCount="indefinite" />
                                            </circle>
                                            {n.label && <text x={n.cx} y={n.ly} textAnchor="middle" fontSize="7" fill="#0C1F4A" fontWeight="700" opacity=".6">{n.label}</text>}
                                        </g>
                                    ))}
                                </svg>
                                <div style={{ position: "relative", zIndex: 2 }}>
                                    <div className="am-icon-box" style={{ animationDelay: ".7s" }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M7 10h2l2-3 2 6 2-3h2" />
                                        </svg>
                                    </div>
                                    <p style={{ fontSize: 8.5, fontWeight: 800, color: "#92660A", letterSpacing: ".1em", textTransform: "uppercase", margin: "8px 0 2px" }}>Digital Transformation</p>
                                    <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0C1F4A", margin: 0, fontFamily: "Lora,Georgia,serif", lineHeight: 1.2 }}>Modern Technology Backbone</h3>
                                </div>
                            </div>

                            {/* Body */}
                            <div style={{ padding: "14px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                                <p style={{ fontSize: 11.5, color: "#6B7280", margin: 0, lineHeight: 1.65 }}>
                                    Cloud migration, ERP and data modernisation that transforms how your business operates and competes.
                                </p>
                                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                                    {["Cloud Migration", "ERP Implementation", "Data & Analytics", "API Integration"].map(c => (
                                        <div key={c} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A84C", flexShrink: 0 }} />
                                            <span style={{ fontSize: 11, color: "#374151", fontWeight: 500 }}>{c}</span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginTop: "auto" }}>
                                    {[{ v: "60%", l: "less manual ops" }, { v: "3.2×", l: "time-to-market" }].map(m => (
                                        <div key={m.l} style={{ background: "#FFFBED", border: "1px solid #EDE0A8", borderRadius: 9, padding: "8px 10px" }}>
                                            <p style={{ fontSize: 17, fontWeight: 800, color: "#C9A84C", margin: 0, lineHeight: 1 }}>{m.v}</p>
                                            <p style={{ fontSize: 9.5, color: "#92660A", margin: "2px 0 0" }}>{m.l}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div style={{ padding: "9px 18px 13px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #EAE4D4" }}>
                                <div style={{ display: "flex", gap: 4 }}>
                                    {["Cloud", "ERP"].map(t => (
                                        <span key={t} style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: "rgba(201,168,76,.12)", color: "#92660A", border: "1px solid rgba(201,168,76,.28)" }}>{t}</span>
                                    ))}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: "#C9A84C" }}>
                                    Explore <span className="am-arr">→</span>
                                </div>
                            </div>
                        </div>

                        {/* ── AI ── */}
                        <div
                            className="am-svc-card"
                            onClick={() => router.push(getLocalizedPath(currentLocale, "/ai-automations"))}
                        >
                            {/* Animated header: neural network on navy */}
                            <div style={{ background: "#0C1F4A", padding: "20px 20px 14px", position: "relative", overflow: "hidden", borderBottom: "1px solid #1A3570", height: 172 }}>
                                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 220 172" xmlns="http://www.w3.org/2000/svg">
                                    {/* Layer connections */}
                                    {[
                                        [28,36,88,26,0],[28,36,88,66,.3],[28,36,88,106,.6],
                                        [28,86,88,26,.15],[28,86,88,66,.45],[28,86,88,106,.75],
                                        [28,136,88,66,.9],[28,136,88,106,.2],
                                        [88,26,152,46,.5],[88,66,152,46,.8],[88,66,152,96,.1],
                                        [88,106,152,96,.4],[88,106,152,140,.7],
                                        [152,46,198,66,1],[152,96,198,66,.55],
                                        [152,96,198,118,.85],[152,140,198,118,.35],
                                    ].map(([x1,y1,x2,y2,d],i) => (
                                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                                            stroke="#C9A84C" strokeWidth=".9" opacity=".2"
                                            style={{ animation: `am-brain-line 2s ease-in-out infinite ${d}s` }} />
                                    ))}
                                    {/* Signal pulses */}
                                    <circle r="3" fill="#C9A84C" opacity=".9"><animateMotion dur="1.5s" repeatCount="indefinite" path="M28,86 L88,26 L152,46 L198,66" /></circle>
                                    <circle r="3" fill="#C9A84C" opacity=".9"><animateMotion dur="1.7s" begin=".5s" repeatCount="indefinite" path="M28,36 L88,106 L152,96 L198,118" /></circle>
                                    <circle r="3" fill="#C9A84C" opacity=".9"><animateMotion dur="1.6s" begin="1s" repeatCount="indefinite" path="M28,136 L88,66 L152,140 L198,118" /></circle>
                                    {/* Layer 1 nodes */}
                                    {[[28,36,0],[28,86,.35],[28,136,.7]].map(([cx,cy,d],i) => (
                                        <circle key={i} cx={cx} cy={cy} r="6" fill="#C9A84C">
                                            <animate attributeName="opacity" values=".45;1;.45" dur="1.9s" begin={`${d}s`} repeatCount="indefinite" />
                                        </circle>
                                    ))}
                                    {/* Layer 2 nodes */}
                                    {[[88,26,.2],[88,66,.55],[88,106,.9]].map(([cx,cy,d],i) => (
                                        <circle key={i} cx={cx} cy={cy} r="7" fill="#C9A84C">
                                            <animate attributeName="opacity" values=".35;1;.35" dur="2.1s" begin={`${d}s`} repeatCount="indefinite" />
                                        </circle>
                                    ))}
                                    {/* Layer 3 nodes */}
                                    {[[152,46,.4],[152,96,.75],[152,140,1.1]].map(([cx,cy,d],i) => (
                                        <circle key={i} cx={cx} cy={cy} r="7" fill="#C9A84C">
                                            <animate attributeName="opacity" values=".35;1;.35" dur="2s" begin={`${d}s`} repeatCount="indefinite" />
                                        </circle>
                                    ))}
                                    {/* Output nodes */}
                                    <circle cx="198" cy="66" r="9" fill="#C9A84C"><animate attributeName="opacity" values=".5;1;.5" dur="1.7s" begin=".6s" repeatCount="indefinite" /></circle>
                                    <circle cx="198" cy="118" r="9" fill="#C9A84C"><animate attributeName="opacity" values=".5;1;.5" dur="1.7s" begin="1s" repeatCount="indefinite" /></circle>
                                    {/* Labels */}
                                    <text x="28" y="154" textAnchor="middle" fontSize="7" fill="rgba(201,168,76,.6)" fontWeight="700">Input</text>
                                    <text x="90" y="124" dy="12" textAnchor="middle" fontSize="7" fill="rgba(201,168,76,.6)" fontWeight="700">Hidden</text>
                                    <text x="198" y="138" textAnchor="middle" fontSize="7" fill="rgba(201,168,76,.6)" fontWeight="700">Output</text>
                                </svg>
                                <div style={{ position: "relative", zIndex: 2 }}>
                                    <div style={{ animationDelay: "1.2s", width: 40, height: 40, background: "rgba(255,255,255,.1)", border: "1.5px solid rgba(201,168,76,.45)", borderRadius: 11, display: "flex", alignItems: "center", justifyCenter: "center", animation: "am-float-icon 3.5s ease-in-out infinite 1.2s" }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="9" y="7" width="6" height="10" rx="1" /><path d="M5 10H9M15 10H19M5 14H9M15 14H19M11 4V7M13 4V7M11 17V20M13 17V20" />
                                        </svg>
                                    </div>
                                    <p style={{ fontSize: 8.5, fontWeight: 800, color: "rgba(201,168,76,.75)", letterSpacing: ".1em", textTransform: "uppercase", margin: "8px 0 2px" }}>AI Automations</p>
                                    <h3 style={{ fontSize: 15, fontWeight: 800, color: "#fff", margin: 0, fontFamily: "Lora,Georgia,serif", lineHeight: 1.2 }}>Intelligent Automation at Scale</h3>
                                </div>
                            </div>

                            {/* Body */}
                            <div style={{ padding: "14px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                                <p style={{ fontSize: 11.5, color: "#6B7280", margin: 0, lineHeight: 1.65 }}>
                                    RPA, generative AI and machine learning that eliminate manual effort and create competitive advantage.
                                </p>
                                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                                    {["Robotic Process Automation", "Generative AI Integration", "AI-Powered Analytics", "Intelligent Doc Processing"].map(c => (
                                        <div key={c} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A84C", flexShrink: 0 }} />
                                            <span style={{ fontSize: 11, color: "#374151", fontWeight: 500 }}>{c}</span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginTop: "auto" }}>
                                    {[{ v: "70%", l: "faster processing" }, { v: "90%", l: "fewer errors" }].map(m => (
                                        <div key={m.l} style={{ background: "#FFFBED", border: "1px solid #EDE0A8", borderRadius: 9, padding: "8px 10px" }}>
                                            <p style={{ fontSize: 17, fontWeight: 800, color: "#C9A84C", margin: 0, lineHeight: 1 }}>{m.v}</p>
                                            <p style={{ fontSize: 9.5, color: "#92660A", margin: "2px 0 0" }}>{m.l}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div style={{ padding: "9px 18px 13px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #F0EAD6" }}>
                                <div style={{ display: "flex", gap: 4 }}>
                                    {["RPA", "GenAI"].map(t => (
                                        <span key={t} style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: "rgba(201,168,76,.12)", color: "#92660A", border: "1px solid rgba(201,168,76,.28)" }}>{t}</span>
                                    ))}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: "#C9A84C" }}>
                                    Explore <span className="am-arr">→</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Services;
