
'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useIntlayer } from "next-intlayer";
import "./leadershipTeam.content";

const LeadershipTeam = () => {
    const content = useIntlayer("businessLeadershipTeam");
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(null);

    const Services = [
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

    const Employees = [
        { name: "Sri Varsha", role: "Developer - Chief Bug Slayer", image: "/business/sri-varsha.jpg" },
        { name: "Nehaa C", role: "EPM Consultant - Forecast Fixer", image: "/business/nehaa.jpg" },
        { name: "Sanjana R R", role: "UI Designer - Pixel Alchemist", image: "/business/sanjana.jpg" },
        { name: "Gobika Babu", role: "UI Designer - Pixel Perfectionist", image: "/business/gobika.png" },
        { name: "Team Member", role: "Placeholder Role", image: "/business/sijith.png" },
        { name: "Narayanan", role: "Software Engineer - Backend Beast", image: "/business/surya.png" }
    ];

    const handleMobileClick = (idx: number) => {
        setActiveMobileIndex(activeMobileIndex === idx ? null : idx);
    };

    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-32');
                }
            });
        }, { threshold: 0.1 });

        if (gridRef.current) {
            const cards = gridRef.current.querySelectorAll('.team-card');
            cards.forEach(card => observer.observe(card));
        }
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
            <div className="flex flex-col sm:flex-row justify-center gap-10 flex-wrap w-full items-center">
                {Services.map((service, idx) => (
                    <div
                        key={idx}
                        className="relative w-full max-w-[370px] lg:h-[500px] rounded-2xl overflow-visible cursor-pointer group hover:-translate-y-2 transition-transform duration-500"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => handleMobileClick(idx)}
                    >
                        {/* IMAGE CONTAINER */}
                        <div className="relative w-full h-[450px] sm:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover rounded-2xl transition-transform duration-300 lg:group-hover:scale-105"
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
                                className={`absolute top-0 ${idx === 0 ? 'end-full me-4' : 'start-full ms-4'
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
                ))}
            </div>
            </section>

            <section id="leadership-team" className="w-full relative py-20 lg:py-32 bg-white overflow-hidden flex flex-col items-center justify-center px-4 lg:px-8">
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
                <div id="employees-space" ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-16 lg:gap-y-[60px] w-full items-start mt-10 pb-32">
                {Employees.map((emp, idx) => (
                    <div 
                        key={idx} 
                        className={`team-card flex flex-col w-full group cursor-pointer transition-all duration-1000 ease-out opacity-0 translate-y-32
                            ${idx === 4 ? 'lg:col-start-2' : ''}
                            ${(idx === 0) ? 'lg:mt-0' : ''}
                            ${(idx === 3) ? 'lg:mt-4' : ''}
                            ${(idx === 1 || idx === 4) ? 'lg:mt-10' : ''}
                            ${(idx === 2 || idx === 5) ? 'lg:mt-20' : ''}
                        `}
                        style={{ transitionDelay: `${(idx % 4) * 150}ms` }}
                    >
                        {/* IMAGE - Sharp corners like the video */}
                        <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#f3f4f6]">
                            <Image 
                                src={emp.image}
                                alt={emp.name}
                                fill
                                className="object-cover transition-all duration-700 group-hover:scale-105"
                            />
                        </div>
                        
                        {/* TEXT - Name left, Role right */}
                        <div className="mt-3 flex flex-row justify-between items-center w-full">
                            <h5 className="text-gray-900 font-medium text-sm md:text-[15px]">{emp.name}</h5>
                            <p className="text-[#9CA3AF] text-xs md:text-sm font-light">{emp.role}</p>
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
