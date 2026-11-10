import Image from 'next/image'
import React from 'react'

interface SucessStoryCardProps {
    image: string;
    /** Client name, shown above the title (only when the client has approved it) */
    client?: string;
    title: string;
    description: string;
    badge?: string;
    industry: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const SucessStoryCard: React.FC<SucessStoryCardProps> = ({ image, client, title, description, badge, industry, onClick }) => {
    return (
        <div 
            onClick={onClick}
            data-cursor={onClick ? "view" : undefined}
            className='hover:scale-105 transition relative h-[450px] md:h-[480px] lg:h-[500px] w-[330px] mx-auto md:w-[380px] lg:w-[400px] mt-2 cursor-pointer'
        >
            <div className='absolute top-1 end-0 md:top-1 lg:top-0 lg:end-2 z-10'>
                <h2 className='px-1 py-0.5 md:px-2 md:py-1 rounded-full text-[17px] md:text-[16px] bg-[#FFFBED] border border-[#D4AF37] text-[#897122]'>
                    {industry}
                </h2>
            </div>

            <div className='relative h-full w-full'>
                <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className='object-cover rounded-xl'
                />

                <div className='absolute bottom-3 w-full px-4 sm:px-6 py-3 sm:py-5'>
                    {client && (
                        <p className='text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-white mb-1 [text-shadow:0_1px_8px_rgba(0,0,0,0.85)]'>{client}</p>
                    )}
                    <h3 className='text-lg sm:text-xl md:text-2xl font-semibold text-white'>{title}</h3>

                    <p className='text-white mt-1 sm:mt-2 text-xs sm:text-sm md:text-base'>
                        {description}
                    </p>

                    {/* Only render this if badge prop exists */}
                    {badge && (
                        <div className='mt-2 sm:mt-3'>
                            <span className='px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm bg-[#FFFBED] border border-[#D4AF37] text-[#897122]'>
                                {badge}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

/** Empty slot, same size as a card, until a real project is added */
export const SuccessStoryPlaceholder = ({ label }: { label: string }) => (
    <div
        aria-hidden="true"
        className='relative h-[450px] md:h-[480px] lg:h-[500px] w-[330px] mx-auto md:w-[380px] lg:w-[400px] mt-2 rounded-xl border border-dashed border-[#D4AF37]/50 bg-gradient-to-b from-[#FFFBED] to-white flex flex-col items-center justify-center gap-3 px-8 text-center'
    >
        <span className='w-10 h-10 rounded-full border border-[#D4AF37]/50 grid place-items-center text-[#D4AF37] text-xl leading-none'>+</span>
        <p className='text-sm md:text-base font-medium text-[#897122]'>{label}</p>
    </div>
)

export default SucessStoryCard