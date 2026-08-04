'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useIntlayer, useLocale } from "next-intlayer";

import { handleHashLink } from "@/lib/handleHashLink";

const Hero = () => {
   const router = useRouter();
   const { locale } = useLocale();

   const {
      empoweringText,
      elevatingWorld,
      dataToDecision,
      exploreEpmSuite,
      bookConsultation
   } = useIntlayer("hero-component");

   const [isZoomed, setIsZoomed] = useState(false);

   useEffect(() => {
      const interval = setInterval(() => {
         setIsZoomed(true);
         const timeout = setTimeout(() => setIsZoomed(false), 700);
         return () => clearTimeout(timeout);
      }, 3000);
      return () => clearInterval(interval);
   }, []);

   /* 🔥 Locale-specific images */
   const desktopImage =
      locale === "ar" ? "/Subtract-ar.png" : "/Subtract.png";

   const tabletImage =
      locale === "ar" ? "/SubtractTab-ar.png" : "/SubtractTab.png";

   const mobileImage =
      locale === "ar" ? "/SubtractMobile-ar.png" : "/SubtractMobile.png";

   return (
      <div className='relative w-[90%] max-w-[1440px] mx-auto mt-6 md:mt-1 lg:mt-6'>

         {/* Background Image Wrapper */}
         <div className="relative w-full overflow-hidden h-[610px] md:h-[550px] lg:h-[670px] rounded-lg">

            {/* Desktop */}
            <div className="hidden lg:block absolute inset-0">
               <Image src={desktopImage} alt="Hero Desktop" fill className="object-cover object-center rounded-lg" priority />
            </div>

            {/* Tablet */}
            <div className="hidden md:block lg:hidden absolute inset-0">
               <Image src={tabletImage} alt="Hero Tablet" fill className="object-cover rounded-lg" priority />
            </div>

            {/* Mobile */}
            <div className="block md:hidden absolute inset-0">
               <Image src={mobileImage} alt="Hero Mobile" fill className="object-cover rounded-lg" priority />
            </div>
         </div>

         {/* Small Text Card */}
         <div
            style={{
               backgroundImage: `url('${locale === "ar" ? "/Cut-photo-ar.png" : "/Cut-photo.svg"}')`,
               backgroundSize: '100% 100%',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
            }}
            className='
          absolute rounded-full
          w-[83.5%] h-[13%]
          right-0 rtl:left-0 rtl:right-auto bottom-0 p-4

          md:w-[40%] md:h-[18%]
          md:right-0 md:rtl:left-0 md:rtl:right-auto md:p-6

          lg:w-[35%] lg:h-[18%]
          lg:right-0 lg:rtl:left-0 lg:rtl:right-auto lg:p-8
        '
         >
            <h3 className='text-[14px] md:text-[14px] lg:text-xl text-white flex items-center h-full text-left rtl:text-right'>
               {empoweringText}
            </h3>
         </div>

         {/* Headings + Buttons */}
         <div className='
        absolute bottom-25 md:bottom-16 lg:bottom-24
        left-4 sm:left-6 md:left-8
        rtl:right-4 rtl:sm:right-6 rtl:md:right-8 rtl:left-auto
        flex flex-col gap-2 sm:gap-4 md:gap-4 lg:gap-6 z-10
      '>

            <h3 className='text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white md:text-black text-left rtl:text-right'>
               {elevatingWorld}
            </h3>

            <h3 className='text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-[#D4AF37] text-left rtl:text-right'>
               {dataToDecision}
            </h3>

            <div className='flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center rtl:items-start sm:rtl:items-center mt-2'>
               <button
                  onClick={(e) => {
                     const link = `/${locale}/features#epm-suites`;
                     if (!handleHashLink(e, link, router)) {
                        router.push(link);
                     }
                  }}
                  className='bg-[#D4AF37] text-black px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-semibold hover:scale-105 transition cursor-pointer'
               >
                  {exploreEpmSuite}
               </button>

               <button
                  onClick={(e) => {
                     const link = `/${locale}/contact#form`;
                     if (!handleHashLink(e, link, router)) {
                        router.push(link);
                     }
                  }}
                  className='bg-white text-[#D4AF37] border border-[#D4AF37] px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4 rounded-full text-xs sm:text-sm md:text-base lg:text-lg font-semibold hover:scale-105 transition cursor-pointer'
               >
                  {bookConsultation}
               </button>
            </div>
         </div>
      </div>
   );
};

export default Hero;