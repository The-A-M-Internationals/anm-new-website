
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useIntlayer } from "next-intlayer";
import "./leadershipTeam.content";

const LeadershipTeam = () => {
    const content = useIntlayer("businessLeadershipTeam");
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(null);

    // Only one leader for now
    const Services = [
        {
            title: content.leader1Name.value,
            image: '/business/anusha.jpg',
            description: content.leader1CardDescription.value,
            position: content.leader1PositionBadge.value,
            fullBio: content.leader1FullBio.value,
            role: content.leader1RoleLine.value
        }
    ];

    const handleMobileClick = (idx: number) => {
        setActiveMobileIndex(activeMobileIndex === idx ? null : idx);
    };

    return (
        <div id="team" className='flex flex-col items-center justify-center px-4 py-12 md:py-20 lg:py-24'>
            <h3 className="text-[#000000] text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-semibold text-center">
                <span className="text-[#ab8d2b]">{content.title.value}</span>
            </h3>

            <p className="text-[#6B7280] text-[18px] md:text-lg lg:text-xl text-center">
                {content.subtitle.value}
            </p>

            {/* IMAGES WITH TEXT OVERLAY */}
            <div className="flex flex-col sm:flex-row justify-center gap-10 mt-12 flex-wrap w-full items-center">
                {Services.map((service, idx) => (
                    <div
                        key={idx}
                        className="relative w-full max-w-[370px] lg:h-[500px] rounded-2xl overflow-visible cursor-pointer"
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

                            {/* POSITION BADGE */}
                            <div className="absolute top-0 right-3 md:top-1 md:right-0 px-3 py-1 md:px-3 md:py-1.5 bg-[#FFFBED]/80 border border-[#D4AF37] text-[#D4AF37] text-xs sm:text-sm font-semibold rounded-full backdrop-blur-md z-20">
                                {service.position}
                            </div>

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
                                className={`absolute top-0 ${idx === 0 ? 'right-full mr-4' : 'left-full ml-4'
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
        </div>
    );
};

export default LeadershipTeam;
