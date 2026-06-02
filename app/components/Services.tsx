"use client";

import { useIntlayer, useLocale } from "next-intlayer";
import { useRouter } from "next/navigation";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { AppLocale } from "@/types/locale";

const Services = () => {
    const router = useRouter();
    const { locale } = useLocale();
    const content = useIntlayer("services_content");

    const services = [
        {
            key: "finance",
            path: "/finance-transformation",
            category: content?.financeCategory?.value,
            title: content?.financeTitle?.value,
            description: content?.financeDescription?.value,
            capabilities: [
                content?.financeCapability1?.value,
                content?.financeCapability2?.value,
                content?.financeCapability3?.value,
                content?.financeCapability4?.value,
            ],
            metrics: [
                { value: content?.financeMetric1Value?.value, label: content?.financeMetric1Label?.value },
                { value: content?.financeMetric2Value?.value, label: content?.financeMetric2Label?.value },
            ],
            tags: [content?.financeTag1?.value, content?.financeTag2?.value],
        },
        {
            key: "digital",
            path: "/digital-transformation",
            category: content?.digitalCategory?.value,
            title: content?.digitalTitle?.value,
            description: content?.digitalDescription?.value,
            capabilities: [
                content?.digitalCapability1?.value,
                content?.digitalCapability2?.value,
                content?.digitalCapability3?.value,
                content?.digitalCapability4?.value,
            ],
            metrics: [
                { value: content?.digitalMetric1Value?.value, label: content?.digitalMetric1Label?.value },
                { value: content?.digitalMetric2Value?.value, label: content?.digitalMetric2Label?.value },
            ],
            tags: [content?.digitalTag1?.value, content?.digitalTag2?.value],
        },
        {
            key: "ai",
            path: "/ai-automations",
            category: content?.aiCategory?.value,
            title: content?.aiTitle?.value,
            description: content?.aiDescription?.value,
            capabilities: [
                content?.aiCapability1?.value,
                content?.aiCapability2?.value,
                content?.aiCapability3?.value,
                content?.aiCapability4?.value,
            ],
            metrics: [
                { value: content?.aiMetric1Value?.value, label: content?.aiMetric1Label?.value },
                { value: content?.aiMetric2Value?.value, label: content?.aiMetric2Label?.value },
            ],
            tags: [content?.aiTag1?.value, content?.aiTag2?.value],
        },
    ];

    return (
        <>
            <style>{`
                @keyframes am-bar-up {
                    from { transform: scaleY(0); }
                    to { transform: scaleY(1); }
                }
                @keyframes am-draw-line {
                    from { stroke-dashoffset: 400; }
                    to { stroke-dashoffset: 0; }
                }
                @keyframes am-link-flow {
                    0% { stroke-dashoffset: 40; }
                    100% { stroke-dashoffset: 0; }
                }
                @keyframes am-brain-line {
                    0%, 100% { opacity: .15; }
                    50% { opacity: .8; }
                }
                @keyframes am-nd-fire {
                    0%, 100% { opacity: .25; }
                    50% { opacity: 1; }
                }
                @keyframes am-float-icon {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                @keyframes am-pulse-out {
                    0% { r: 7; opacity: .7; }
                    100% { r: 22; opacity: 0; }
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
                    width: 40px;
                    height: 40px;
                    background: #fff;
                    border: 1.5px solid #E8D99A;
                    border-radius: 11px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 3px 10px rgba(201,168,76,.2);
                }
                .am-arr {
                    transition: transform .2s ease;
                }
                .am-svc-card:hover .am-arr {
                    transform: translateX(4px);
                }
            `}</style>

            <section id="services" className="px-4 py-8 md:py-10">
                <div className="w-[90%] mx-auto">
                    {/* Heading */}
                    <div className="text-center mb-10 md:mb-14">
                        <h3 className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-semibold">
                            {content?.heading?.value?.toString()}{" "}
                            <span className="text-[#D4AF37]">{content?.headingHighlight?.value?.toString()}</span>{" "}
                            {content?.headingEnd?.value?.toString()}
                        </h3>
                        <p className="text-[#6B7280] text-sm md:text-base mt-3 max-w-2xl mx-auto">
                            {content?.subheading?.value?.toString()}
                        </p>
                    </div>

                    {/* 3-column grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                        {services.map((svc, idx) => (
                            <div
                                key={svc.key}
                                className="am-svc-card"
                                onClick={() => router.push(getLocalizedPath(locale as AppLocale, svc.path))}
                            >
                                {/* Animated header */}
                                <div style={{ 
                                    background: idx === 0 ? "#FFFBED" : idx === 1 ? "#F5F3EE" : "#0C1F4A", 
                                    padding: "20px 20px 14px", 
                                    position: "relative", 
                                    overflow: "hidden", 
                                    borderBottom: idx === 0 ? "1px solid #EDE0A8" : idx === 1 ? "1px solid #E2DAC8" : "1px solid #1A3570", 
                                    height: 172 
                                }}>
                                    {/* Finance: Bar chart animation */}
                                    {idx === 0 && (
                                        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 220 172" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                            <line x1="0" y1="43" x2="220" y2="43" stroke="#C9A84C" strokeWidth=".4" strokeDasharray="3 4" opacity=".25" />
                                            <line x1="0" y1="86" x2="220" y2="86" stroke="#C9A84C" strokeWidth=".4" strokeDasharray="3 4" opacity=".25" />
                                            <line x1="0" y1="129" x2="220" y2="129" stroke="#C9A84C" strokeWidth=".4" strokeDasharray="3 4" opacity=".25" />
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
                                                <rect key={i} x={b.x} y={b.y} width="13" height={b.h} rx="2" fill={`rgba(201,168,76,${b.o})`} style={{ transformOrigin: `${b.x}px 162px`, animation: `am-bar-up .6s ease-out ${b.d}s both` }} />
                                            ))}
                                            <polyline points="26,122 46,104 66,116 86,86 106,66 126,50 146,34 166,22 186,14" fill="none" stroke="#0C1F4A" strokeWidth="2" strokeDasharray="400" strokeDashoffset="400" style={{ animation: "am-draw-line 1.6s ease-out 1.5s forwards" }} strokeLinecap="round" strokeLinejoin="round" />
                                            <circle r="4" fill="#0C1F4A"><animateMotion dur="2.8s" begin="3.2s" repeatCount="indefinite" path="M26,122 C46,104 66,116 86,86 106,66 126,50 146,34 166,22 186,14" /></circle>
                                            <text x="190" y="11" fontSize="8" fill="#0C1F4A" fontWeight="800" opacity=".85">▲24%</text>
                                        </svg>
                                    )}
                                    
                                    {/* Digital: Network graph */}
                                    {idx === 1 && (
                                        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 220 172" xmlns="http://www.w3.org/2000/svg">
                                            {[
                                                { x1: 110, y1: 86, x2: 52, y2: 38, d: 0 },
                                                { x1: 110, y1: 86, x2: 172, y2: 42, d: 0.7 },
                                                { x1: 110, y1: 86, x2: 48, y2: 138, d: 1.4 },
                                                { x1: 110, y1: 86, x2: 176, y2: 132, d: 0.35 },
                                                { x1: 110, y1: 86, x2: 110, y2: 18, d: 1 },
                                            ].map((l, i) => (
                                                <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="#0C1F4A" strokeWidth="1" strokeDasharray="8 4" opacity=".2" style={{ animation: `am-link-flow 2.2s linear infinite ${l.d}s` }} />
                                            ))}
                                            <circle r="3.5" fill="#C9A84C"><animateMotion dur="1.7s" repeatCount="indefinite" path="M110,86 L52,38" /></circle>
                                            <circle r="3.5" fill="#C9A84C"><animateMotion dur="1.9s" begin=".6s" repeatCount="indefinite" path="M110,86 L172,42" /></circle>
                                            <circle r="3.5" fill="#C9A84C"><animateMotion dur="1.8s" begin="1.2s" repeatCount="indefinite" path="M110,86 L48,138" /></circle>
                                            <circle r="3.5" fill="#C9A84C"><animateMotion dur="2s" begin=".3s" repeatCount="indefinite" path="M110,86 L176,132" /></circle>
                                            <circle cx="110" cy="86" r="14" fill="rgba(12,31,74,.08)" stroke="#0C1F4A" strokeWidth="1.5" />
                                            <circle cx="110" cy="86" r="7" fill="#0C1F4A" />
                                            <circle cx="110" cy="86" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity=".6">
                                                <animate attributeName="r" from="14" to="32" dur="2.4s" repeatCount="indefinite" />
                                                <animate attributeName="opacity" from=".6" to="0" dur="2.4s" repeatCount="indefinite" />
                                            </circle>
                                            {[
                                                { cx: 52, cy: 38, label: idx === 1 ? content?.cloudLabel?.value : "", ly: 26, d: 0 },
                                                { cx: 172, cy: 42, label: idx === 1 ? content?.erpLabel?.value : "", ly: 30, d: 0.5 },
                                                { cx: 48, cy: 138, label: idx === 1 ? content?.apiLabel?.value : "", ly: 156, d: 1 },
                                                { cx: 176, cy: 132, label: idx === 1 ? content?.dataLabel?.value : "", ly: 150, d: 0.8 },
                                                { cx: 110, cy: 18, label: "", ly: 0, d: 0.3 },
                                            ].map((n, i) => (
                                                <g key={i}>
                                                    <circle cx={n.cx} cy={n.cy} r="9" fill="rgba(12,31,74,.07)" stroke="#0C1F4A" strokeWidth="1.2" />
                                                    <circle cx={n.cx} cy={n.cy} r="5" fill="#0C1F4A"><animate attributeName="opacity" values=".5;1;.5" dur={`${2.2 + i * 0.2}s`} begin={`${n.d}s`} repeatCount="indefinite" /></circle>
                                                    {n.label && <text x={n.cx} y={n.ly} textAnchor="middle" fontSize="7" fill="#0C1F4A" fontWeight="700" opacity=".6">{n.label?.toString()}</text>}
                                                    </g>
                                                    ))}
                                                    </svg>
                                                    )}

                                                    {/* AI: Neural network */}
                                                    {idx === 2 && (
                                                    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 220 172" xmlns="http://www.w3.org/2000/svg">
                                                    {[
                                                    [28,36,88,26,0],[28,36,88,66,.3],[28,36,88,106,.6],
                                                    [28,86,88,26,.15],[28,86,88,66,.45],[28,86,88,106,.75],
                                                    [28,136,88,66,.9],[28,136,88,106,.2],
                                                    [88,26,152,46,.5],[88,66,152,46,.8],[88,66,152,96,.1],
                                                    [88,106,152,96,.4],[88,106,152,140,.7],
                                                    [152,46,198,66,1],[152,96,198,66,.55],
                                                    [152,96,198,118,.85],[152,140,198,118,.35],
                                                    ].map(([x1,y1,x2,y2,d],i) => (
                                                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C9A84C" strokeWidth=".9" opacity=".2" style={{ animation: `am-brain-line 2s ease-in-out infinite ${d}s` }} />
                                                    ))}
                                                    <circle r="3" fill="#C9A84C" opacity=".9"><animateMotion dur="1.5s" repeatCount="indefinite" path="M28,86 L88,26 L152,46 L198,66" /></circle>
                                                    <circle r="3" fill="#C9A84C" opacity=".9"><animateMotion dur="1.7s" begin=".5s" repeatCount="indefinite" path="M28,36 L88,106 L152,96 L198,118" /></circle>
                                                    <circle r="3" fill="#C9A84C" opacity=".9"><animateMotion dur="1.6s" begin="1s" repeatCount="indefinite" path="M28,136 L88,66 L152,140 L198,118" /></circle>
                                                    {[[28,36,0],[28,86,.35],[28,136,.7]].map(([cx,cy,d],i) => (
                                                    <circle key={`input-${i}`} cx={cx} cy={cy} r="6" fill="#C9A84C"><animate attributeName="opacity" values=".45;1;.45" dur="1.9s" begin={`${d}s`} repeatCount="indefinite" /></circle>
                                                    ))}
                                                    {[[88,26,.2],[88,66,.55],[88,106,.9]].map(([cx,cy,d],i) => (
                                                    <circle key={`hidden-${i}`} cx={cx} cy={cy} r="7" fill="#C9A84C"><animate attributeName="opacity" values=".35;1;.35" dur="2.1s" begin={`${d}s`} repeatCount="indefinite" /></circle>
                                                    ))}
                                                    {[[152,46,.4],[152,96,.75],[152,140,1.1]].map(([cx,cy,d],i) => (
                                                    <circle key={`hidden2-${i}`} cx={cx} cy={cy} r="7" fill="#C9A84C"><animate attributeName="opacity" values=".35;1;.35" dur="2s" begin={`${d}s`} repeatCount="indefinite" /></circle>
                                                    ))}
                                                    <circle cx="198" cy="66" r="9" fill="#C9A84C"><animate attributeName="opacity" values=".5;1;.5" dur="1.7s" begin=".6s" repeatCount="indefinite" /></circle>
                                                    <circle cx="198" cy="118" r="9" fill="#C9A84C"><animate attributeName="opacity" values=".5;1;.5" dur="1.7s" begin="1s" repeatCount="indefinite" /></circle>
                                                    <text x="28" y="154" textAnchor="middle" fontSize="7" fill="rgba(201,168,76,.6)" fontWeight="700">{content?.inputLabel?.value?.toString()}</text>
                                                    <text x="90" y="124" dy="12" textAnchor="middle" fontSize="7" fill="rgba(201,168,76,.6)" fontWeight="700">{content?.hiddenLabel?.value?.toString()}</text>
                                                    <text x="198" y="138" textAnchor="middle" fontSize="7" fill="rgba(201,168,76,.6)" fontWeight="700">{content?.outputLabel?.value?.toString()}</text>
                                                    </svg>
                                                    )}

                                                    <div style={{ position: "relative", zIndex: 2 }}>
                                                    <div className="am-icon-box" style={{ animationDelay: idx === 1 ? ".7s" : idx === 2 ? "1.2s" : "0s" }}>
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="rtl:-scale-x-100">
                                                    {idx === 0 && <><path d="M3 17l4-4 4 4 4-8 4 3" /><path d="M3 21h18" /></>}
                                                    {idx === 1 && <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /><path d="M7 10h2l2-3 2 6 2-3h2" /></>}
                                                    {idx === 2 && <><rect x="9" y="7" width="6" height="10" rx="1" /><path d="M5 10H9M15 10H19M5 14H9M15 14H19M11 4V7M13 4V7M11 17V20M13 17V20" /></>}
                                                    </svg>
                                                    </div>
                                                    <p style={{ fontSize: 8.5, fontWeight: 800, color: idx === 2 ? "rgba(201,168,76,.75)" : "#92660A", letterSpacing: locale === 'ar' ? 'normal' : ".1em", textTransform: locale === 'ar' ? 'none' : "uppercase", margin: "8px 0 2px" }}>
                                                    {svc.category?.toString()}
                                                    </p>
                                                    <h3 style={{ fontSize: 15, fontWeight: 800, color: idx === 2 ? "#fff" : "#0C1F4A", margin: 0, fontFamily: "Lora,Georgia,serif", lineHeight: 1.2 }}>
                                                    {svc.title?.toString()}
                                                    </h3>
                                                    </div>
                                                    </div>

                                                    {/* Body */}
                                                    <div style={{ padding: "14px 18px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                                                    <p style={{ fontSize: 11.5, color: "#6B7280", margin: 0, lineHeight: 1.65 }}>{svc.description}</p>
                                                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                                                    {svc.capabilities.map((cap, capIdx) => (
                                                    <div key={`cap-${capIdx}`} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#C9A84C", flexShrink: 0 }} />
                                                    <span style={{ fontSize: 11, color: "#374151", fontWeight: 500 }}>{cap}</span>
                                                    </div>
                                                    ))}
                                                    </div>
                                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginTop: "auto" }}>
                                                    {svc.metrics.map((m, mIdx) => (
                                                    <div key={`metric-${mIdx}`} style={{ background: "#FFFBED", border: "1px solid #EDE0A8", borderRadius: 9, padding: "8px 10px" }}>
                                                    <p style={{ fontSize: 17, fontWeight: 800, color: "#C9A84C", margin: 0, lineHeight: 1 }}>{m.value}</p>
                                                    <p style={{ fontSize: 9.5, color: "#92660A", margin: "2px 0 0" }}>{m.label}</p>
                                                    </div>
                                                    ))}
                                                    </div>
                                                    </div>

                                                    {/* Footer */}
                                                    <div style={{ padding: "9px 18px 13px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #F0EAD6" }}>
                                                    <div style={{ display: "flex", gap: 4 }}>
                                                    {svc.tags.map((tag, tagIdx) => (
                                                    <span key={`tag-${tagIdx}`} style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: "rgba(201,168,76,.12)", color: "#92660A", border: "1px solid rgba(201,168,76,.28)" }}>
                                                    {tag}
                                                    </span>
                                                    ))}
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: "#C9A84C" }}>
                                                    {content?.explore?.value?.toString()} <span className="am-arr rtl:rotate-180">→</span>
                                                    </div>
                                                    </div>
                                                    </div>
                                                    ))}
                                                    </div>                </div>
            </section>
        </>
    );
};

export default Services;