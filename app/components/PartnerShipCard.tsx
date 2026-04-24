'use client';

import Image from 'next/image'
import { useIntlayer } from 'next-intlayer';

const PartnerShipCard = () => {
  const { content } = useIntlayer("partnershipCard");
  return (
    <div className='bg-[#0F1E4D] relative flex flex-col lg:flex-row items-center justify-around px-4 sm:px-6 pt-20 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 gap-8'>
      <div className='absolute top-0 left-0 overflow-hidden opacity-30 md:opacity-100'>
        <img src="/Rings.svg" alt="Left Rings" className='w-32 sm:w-48 md:w-full h-32 sm:h-48 md:h-full' />
      </div>
      <div className='absolute bottom-0 right-0 overflow-hidden opacity-30 md:opacity-100'>
        <img src="/Partnerbottom.svg" alt="Right Partner Bottom" className='w-32 sm:w-48 md:w-full h-32 sm:h-48 md:h-full' />
      </div>
      <div className='flex flex-col w-full lg:w-[60%] gap-4 sm:gap-6 md:gap-8 z-10'>
        <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold'>{content.title}</h2>
        <p className='text-white text-sm sm:text-base md:text-lg lg:text-xl whitespace-pre-line'>
          {content.description}
        </p>
        <a
          href="https://www.oracle.com/"
          target="_blank"
          rel="noopener noreferrer"
          className='bg-[#D4AF37] text-black px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:scale-105 w-fit transition cursor-pointer inline-block text-center'
        >
          {content.partneship}
        </a>
      </div>
      <div className='z-10 mt-6 lg:mt-0'>
        <Image
          src='/Oracle.png'
          alt='Oracle Partner'
          width={400}
          height={400}
          className='w-48 sm:w-64 md:w-80 lg:w-96 h-auto'
        />
      </div>
    </div>
  )
}

export default PartnerShipCard