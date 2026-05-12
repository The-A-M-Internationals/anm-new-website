'use client';

import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useIntlayer, useLocale } from "next-intlayer";

interface PageHeroProps {
   badge?: string
   title: string
   title2?: string
   description: string
   button: string
   link: string
   image: string
   image2: string
   image3: string
   buttonImage?: string
}

const PageHero: React.FC<PageHeroProps> = ({
   badge,
   title,
   title2,
   description,
   button,
   link,
   image,
   image2,
   image3,
   buttonImage
}) => {
   const content = useIntlayer("financeHero");
   const { locale } = useLocale();
   const router = useRouter();
   const [isZoomed, setIsZoomed] = useState(false);

   useEffect(() => {
      // Trigger zoom every 10 seconds
      const interval = setInterval(() => {
         setIsZoomed(true);

         // Remove zoom after 700ms (match transition duration)
         const timeout = setTimeout(() => {
            setIsZoomed(false);
         }, 700);

         return () => clearTimeout(timeout);
      }, 3000);

      return () => clearInterval(interval);
   }, []);

   return (
      <div className='relative w-[90%] mx-auto mt-6 md:mt-1 lg:mt-6'>
         <div
            className="
    relative w-full overflow-hidden
    h-[610px]
    md:h-[400px]
    lg:h-[670px]
  "
         >            {/* Desktop Image */}
            <div className="hidden md:hidden lg:block absolute inset-0">
               <Image
                  src={image}
                  alt="Hero Desktop"
                  fill
               // className={`object-cover transition-transform duration-700 ease-out ${isZoomed ? "scale-105" : "scale-100"}`}
               />
            </div>

            {/* Tablet Image */}
            <div className="hidden sm:block lg:hidden absolute inset-0">
               <Image
                  src={image3}
                  alt="Hero Tablet"
                  fill
                  className='object-contain'
               // className={`object-contain transition-transform duration-700 ease-out ${isZoomed ? "scale-105" : "scale-100"}`}
               />
            </div>

            {/* Mobile Image */}
            <div className="block sm:hidden md:hidden absolute inset-0">
               <Image
                  src={image2}
                  alt="Hero Mobile"
                  fill
               // className={`object-cover transition-transform duration-700 ease-out ${isZoomed ? "scale-105" : "scale-100"}`}
               />
            </div>

            {/* Text */}
            <div className='absolute bottom-25 md:bottom-10 lg:bottom-6 start-2 sm:start-4 md:start-6 flex w-fit sm:w-[90%] flex-col gap-2 md:gap-1 lg:gap-2 pe-6'>
               {badge && (
                  <h4 className='w-fit rounded-3xl px-4 py-1 md:px-5 md:py-1.5 lg:px-6 lg:py-2 text-[#D4AF37] bg-[#FFFBED] border border-[#D4AF37] text-[16px] md:text-base lg:text-lg font-medium'>
                     {badge}
                  </h4>
               )}

               <h3 className='text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight md:w-full'>
                  {title}
               </h3>

               {title2 && (
                  <h3 className='text-2xl md:text-3xl lg:text-5xl font-bold text-white leading-tight'>
                     {title2}
                  </h3>
               )}

               <p className='text-[20px] md:text-lg lg:text-xl text-white w-full md:w-[70%] lg:w-[70%] leading-relaxed'>
                  {description}
               </p>
            </div>
         </div>

         <div
            style={{
               backgroundImage: `url(${buttonImage})`,
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               backgroundRepeat: 'no-repeat',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}
            className='absolute p-4 md:p-0 lg:p-8 w-[83.5%] h-[13%] md:w-[34.5%] md:h-[16%] lg:h-[18%] lg:w-[34.5%] end-0 bottom-0 md:end-0 md:bottom-4.75 lg:end-0 lg:bottom-0 rounded-full'
         >
            <button
               onClick={(e) => {
                  if (link.includes('#')) {
                     const [path, hash] = link.split('#');
                     const currentPath = window.location.pathname;
                     // Check if path matches or if it's just a hash
                     if (currentPath === path || (path === '' && hash)) {
                        const element = document.getElementById(hash);
                        if (element) {
                           e.preventDefault();
                           const yOffset = -112; // Standard navbar offset
                           const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                           window.scrollTo({ top: y, behavior: 'smooth' });
                           // Update URL hash without reload
                           window.history.pushState(null, '', `#${hash}`);
                           return;
                        }
                     }
                  }
                  router.push(link);
               }}
               className='cursor-pointer text-xs md:text-sm lg:text-base bg-[#D4AF37] rounded-full px-4 py-2 md:px-3 md:py-1 lg:px-6 lg:py-3 flex items-center gap-2 text-black font-semibold whitespace-nowrap hover:scale-105 transition-transform'
            >
               {button}
               <ArrowRight strokeWidth={1.5} className='w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 rtl:rotate-180' />
            </button>
         </div>

      </div>
   )
}

export default PageHero