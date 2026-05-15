'use client';
import Image from "next/image";

interface FancyCardProps {
    icon: string;
    title: string;
    description: string;
    isActive: boolean;
    onClick: () => void;
}

const FancyCard: React.FC<FancyCardProps> = ({ title, description, icon, isActive, onClick }) => {
    
    const handleToggle = (e: React.MouseEvent) => {
        // Only toggle on mobile/tablet (less than 1024px)
        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
            e.stopPropagation();
            onClick();
        }
    };

    return (
        <div 
            className="m-4 md:m-6 group relative w-full max-w-[300px] mx-auto md:max-w-[380px]"
            onClick={handleToggle}
        >       
            {/* MAIN CARD CONTAINER - DEFINES THE SHAPE */}
            <div
                className="relative h-[250px] md:h-[300px] w-full overflow-hidden rounded-3xl bg-white cursor-pointer"
            >
                {/* 
                    MASKED GOLD OVERLAY 
                    - We use a CSS mask to perfectly subtract the "bite" area from the gold background.
                    - This removes all "chopped circle" or "triangle" artifacts.
                    - The mask center (24px, 24px) and radius (48px) match the bitten corner exactly.
                */}
                <div 
                    className={`
                        absolute inset-0 bg-[#D4AF37] transition-opacity duration-300 rounded-3xl
                        ${isActive ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}
                    `}
                    style={{
                        WebkitMaskImage: 'radial-gradient(circle at 24px 24px, transparent 48px, black 49px)',
                        maskImage: 'radial-gradient(circle at 24px 24px, transparent 48px, black 49px)'
                    }}
                ></div>

                {/* Outer Border (Stays crisp on top of everything) */}
                <div className="absolute inset-0 border-2 border-gray-200 rounded-3xl z-20 pointer-events-none"></div>

                {/* TOP LEFT BITTEN CORNER (The Cutout Mask) */}
                <div
                    className="
                        absolute -top-6 -left-6 size-24
                        rounded-br-4xl border-2 border-gray-200
                        bg-white
                        transition-colors duration-300
                        z-30
                    "
                >
                    {/* The mask above handles the gold fill perfectly without any extra bridge divs */}
                </div>

                {/* TOP LEFT ICON CONTAINER */}
                <div className="absolute top-0 left-0 w-16 h-16 rounded-full bg-white z-40 flex items-center justify-center shadow-md">
                    <div className="w-full h-full rounded-full bg-[#D4AF37] flex items-center justify-center">
                        <Image
                            src={icon}
                            alt={title}
                            width={32}
                            height={32}
                            className="text-black"
                        />
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="relative z-10 p-6 h-full flex flex-col gap-6 mt-2 md:mt-12">
                    {/* TITLE */}
                    <h3
                        className={`
                            text-2xl font-bold transition-colors duration-300 mt-13 md:mt-16
                            ${isActive ? 'text-white' : 'text-black'}
                            lg:group-hover:text-white
                        `}
                    >
                        {title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p
                        className={`
                            text-[16px] md:text-xl max-w-[90%] mt-0 md:mt-2 transition-colors duration-300
                            ${isActive ? 'text-white' : 'text-[#6B7280]'}
                            lg:group-hover:text-white
                        `}
                    >
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FancyCard;
