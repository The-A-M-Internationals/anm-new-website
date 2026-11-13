
'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useIntlayer, useLocale } from "next-intlayer";
import "./leadershipTeam.content";
import type { CmsDoc } from '@/lib/cms/shared';
import { tr } from '@/lib/cms/siteContent';

/** founders / team: from the admin portal; without them the built-in people show */
const LeadershipTeam = ({ founders, team }: { founders?: CmsDoc[]; team?: CmsDoc[] }) => {
    const content = useIntlayer("businessLeadershipTeam");
    const { locale } = useLocale();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(null);

    const Services = founders ? founders.map(({ data: d }) => ({
        title: tr(d, 'name', locale),
        image: String(d.imageSrc || ''),
        description: tr(d, 'tagline', locale),
        fullBio: tr(d, 'bio', locale),
        role: tr(d, 'role', locale),
    })).filter((f) => f.image) : [
        {
            title: content.leader1Name.value,
            image: '/business/anusha.jpg',
            description: content.leader1CardDescription.value,
            fullBio: content.leader1FullBio.value,
            role: content.leader1RoleLine.value
        },
        {
            title: content.leader2Name.value,
            image: '/business/sijith.png',
            description: content.leader2CardDescription.value,
            fullBio: content.leader2FullBio.value,
            role: content.leader2RoleLine.value
        }
    ];

    const Employees = team ? team.map(({ data: d }) => ({
        name: tr(d, 'name', locale),
        role: tr(d, 'role', locale),
        image: String(d.imageSrc || ''),
    })).filter((e) => e.image) : [
        { name: "Nehaa C", role: "EPM Consultant - Forecast Fixer", image: "/business/nehaa.png" },
        { name: "Rudra Prakash", role: "EPM Consultant", image: "/business/rudra-prakash.jpg" },
        { name: "Sanjana R R", role: "UI Designer - Pixel Alchemist", image: "/business/sanjana.jpg" },
        { name: "Gobika Babu", role: "UI Designer - Pixel Perfectionist", image: "/business/gobika.png" },
        { name: "Sri Varsha", role: "Developer - Chief Bug Slayer", image: "/business/sri-varsha.jpg" },
        { name: "Narayanan", role: "Software Engineer - Backend Beast", image: "/business/surya.png" }
    ];

    const handleMobileClick = (idx: number) => {
        setActiveMobileIndex(activeMobileIndex === idx ? null : idx);
    };

    const sectionRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const foundersRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Clean, un-hijacked entrance observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-32');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        [foundersRef.current, gridRef.current].forEach((group) => {
            group?.querySelectorAll('.team-card').forEach(card => observer.observe(card));
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <section id="team" className='no-global-reveal snap-section flex flex-col items-center justify-center px-4 pt-4 md:pt-8 pb-8'>
            <h3 className="text-[#000000] text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-semibold text-center">
                <span className="text-[#ab8d2b]">{content.title.value}</span>
            </h3>

            <p className="text-[#6B7280] text-[18px] md:text-lg lg:text-xl text-center mt-4">
                {content.subtitle.value}
            </p>

            {/* FOUNDERS GROUP TITLE */}
            <div className="mt-8 mb-8 text-center">
                <h4 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] relative inline-block">
                    Founders
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-[2px] bg-[#D4AF37]"></div>
                </h4>
            </div>

            {/* IMAGES WITH TEXT OVERLAY */}
            <div ref={foundersRef} className="flex flex-col sm:flex-row justify-center gap-10 flex-wrap w-full items-center">
                {Services.map((service, idx) => (
                    <div
                        key={idx}
                        className="team-card w-full max-w-[370px] transition-all duration-1000 ease-out will-change-transform opacity-0 translate-y-32"
                        style={{ transitionDelay: `${idx * 150}ms` }}
                    >
                    <div
                        className="relative w-full max-w-[370px] lg:h-[500px] rounded-2xl overflow-visible cursor-pointer group hover:-translate-y-2 transform-gpu transition-[transform,opacity] duration-500 ease-in-out"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => handleMobileClick(idx)}
                    >
                        {/* IMAGE CONTAINER */}
                        <div className="relative w-full aspect-[37/50] max-h-[500px] rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                loading="eager"
                                sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
                                className="object-cover rounded-2xl transform-gpu transition-[transform,opacity] duration-300 ease-in-out lg:group-hover:scale-105"
                            />

                            {/* POSITION BADGE (Removed for common title) */}

                            {/* NAME + DESCRIPTION */}
                            <div className={`absolute bottom-0 h-28 w-full px-4 py-3 text-white bg-black/40 backdrop-blur-xl transition-opacity duration-300 z-10 ${activeMobileIndex === idx ? 'opacity-0' : 'opacity-100'}`}>
                                <h4 className="text-lg sm:text-xl font-semibold">{service.title}</h4>
                                <p className="text-xs sm:text-sm mt-1 opacity-90">{service.description}</p>
                            </div>

                            {/* MOBILE OVERLAY BIO - Inside the image on click */}
                            <div className={`absolute inset-0 bg-white/95 p-6 flex flex-col justify-center items-start transition-all duration-300 lg:hidden z-30 ${activeMobileIndex === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}>
                                <h4 className="text-xl font-bold text-[#D4AF37] mb-1">
                                    {service.title}
                                </h4>
                                <p className="text-sm text-gray-600 font-semibold mb-3">
                                    {service.role}
                                </p>
                                <p className="text-sm text-gray-700 leading-relaxed overflow-y-auto max-h-[70%]">
                                    {service.fullBio}
                                </p>
                                <button className="mt-4 text-[#D4AF37] text-sm font-bold border-b border-[#D4AF37] pb-0.5">
                                    Close Bio
                                </button>
                            </div>
                        </div>

                        {/* HOVER POPUP - Desktop only */}
                        {hoveredIndex === idx && (
                            <div
                                className={`absolute top-0 ${(Services.length <= 2 ? idx === 0 : idx >= Services.length / 2) ? 'end-full me-4' : 'start-full ms-4'
                                    } w-80 bg-white shadow-2xl rounded-xl p-6 border border-gray-200 z-50 hidden lg:block animate-fadeIn`}
                            >
                                <h4 className="text-xl font-bold text-[#D4AF37] mb-1">
                                    {service.title}
                                </h4>
                                <p className="text-sm text-gray-600 font-semibold mb-3">
                                    {service.role}
                                </p>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {service.fullBio}
                                </p>
                            </div>
                        )}
                    </div>
                    </div>
                ))}
            </div>
            </section>

            <section ref={sectionRef} id="leadership-team" className="no-global-reveal w-full relative py-20 lg:py-32 bg-white overflow-hidden flex flex-col items-center justify-center px-4 lg:px-8">
            <div className="w-full flex flex-col items-center">
                {/* HEADER */}
                <div className="text-center mb-16 w-full animate-slideUp">
                    <h4 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] relative inline-block">
                        Our Team
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1/2 h-[2px] bg-[#D4AF37]"></div>
                    </h4>
                    <p className="text-[#6B7280] text-sm md:text-base text-center mt-4 max-w-2xl mx-auto">
                        Meet the talented individuals driving our vision forward.
                    </p>
                </div>

                {/* EMPLOYEES SPACE / GRID PLACEHOLDER */}
                <div id="employees-space" ref={gridRef} className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-10 sm:gap-y-16 w-full items-start mt-10 pb-16 sm:pb-32">
                {Employees.map((emp, idx) => (
                    <div 
                        key={idx} 
                        className={`team-card flex flex-col w-full group cursor-pointer transition-all duration-1000 ease-out will-change-transform opacity-0 translate-y-32
                            ${(idx === 0) ? 'lg:mt-0' : ''}
                            ${(idx === 1) ? 'lg:mt-10' : ''}
                            ${(idx === 2) ? 'lg:mt-20' : ''}
                            ${(idx === 3) ? 'lg:mt-4' : ''}
                            ${(idx === 4) ? (Employees.length === 6 ? 'lg:mt-10 lg:col-start-2' : 'lg:mt-0') : ''}
                            ${(idx === 5) ? (Employees.length === 6 ? 'lg:mt-20' : 'lg:mt-10') : ''}
                            ${(idx >= 6) ? ['lg:mt-0', 'lg:mt-10', 'lg:mt-20', 'lg:mt-4'][idx % 4] : ''}
                        `}
                        style={{ transitionDelay: `${(idx % 4) * 150}ms` }}
                    >
                        {/* IMAGE - Sharp corners like the video */}
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#f3f4f6]">
                            <Image 
                                src={emp.image}
                                alt={emp.name}
                                fill
                                loading="eager"
                                decoding="async"
                                sizes="(min-width: 1024px) 330px, 50vw"
                                className="object-cover transform-gpu transition-[transform,opacity] duration-700 ease-in-out group-hover:scale-105"
                            />
                        </div>
                        
                        {/* TEXT - Name left, Role right */}
                        <div className="mt-3 flex flex-row flex-wrap justify-between items-baseline gap-x-3 gap-y-0.5 w-full">
                            <h5 className="text-gray-900 font-medium text-sm md:text-[15px]">{emp.name}</h5>
                            <p className="text-[#6B7280] text-xs md:text-sm">{emp.role}</p>
                        </div>
                    </div>
                ))}
            </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                
            `}</style>
            </section>
        </>
    );
};

export default LeadershipTeam;
