import Image from 'next/image'
import React from 'react'

interface SucessStoryCardProps {
    image: string;
    title: string;
    description: string;
    badge?: string;
    industry: string;
}

const SucessStoryCard: React.FC<SucessStoryCardProps> = ({ image, title, description, badge, industry }) => {
    return (
        <div className='hover:scale-105 transition relative h-[450px] md:h-[480px] lg:h-[500px] w-[330px] mx-auto md:w-[380px] lg:w-[400px] mt-2'>
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
                    className='object-cover rounded-xl'
                />

                <div className='absolute bottom-3 w-full px-4 sm:px-6 py-3 sm:py-5'>
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

export default SucessStoryCard