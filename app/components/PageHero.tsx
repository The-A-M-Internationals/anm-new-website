'use client';

import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useLocale } from "next-intlayer";

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
   const { locale } = useLocale();
   const router = useRouter();
   const [isZoomed, setIsZoomed] = useState(false);

   useEffect(() => {
      // Trigger zoom every 3 seconds
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

   const handleNavigation = (e: React.MouseEvent) => {
      const isAnchor = link.includes('#');
      if (isAnchor && typeof window !== 'undefined') {
         const [path, hash] = link.split('#');
         const currentPath = window.location.pathname;

         // Check if we're already on the same page
         // We check if currentPath contains the path (to handle locale prefix)
         if (currentPath.includes(path) && hash) {
            e.preventDefault();
            const targetElement = document.getElementById(hash);
            if (targetElement) {
               targetElement.scrollIntoView({ behavior: 'smooth' });
               return;
            }
         }
      }
      router.push(link);
   };

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
                  className='object-cover'
               />
            </div>

            {/* Tablet Image */}
            <div className="hidden sm:block lg:hidden absolute inset-0">
               <Image
                  src={image3}
                  alt="Hero Tablet"
                  fill
                  className='object-contain'
               />
            </div>

            {/* Mobile Image */}
            <div className="block sm:hidden md:hidden absolute inset-0">
               <Image
                  src={image2}
                  alt="Hero Mobile"
                  fill
                  className='object-cover'
               />
            </div>

            {/* Text */}
            <div className='absolute bottom-25 md:bottom-10 lg:bottom-6 start-4 sm:start-6 md:start-8 flex w-fit sm:w-[90%] md:w-[90%] flex-col gap-2 md:gap-1 lg:gap-2 pe-6'>
               {badge && (
                  <h4 className='w-fit rounded-3xl px-4 py-1 md:px-5 md:py-1.5 lg:px-6 lg:py-2 text-[#D4AF37] bg-[#FFFBED] border border-[#D4AF37] text-[16px] md:text-base lg:text-lg font-medium'>
                     {badge}
                  </h4>
               )}

               <h3 className='text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight md:w-[90%]'>
                  {title}
               </h3>

               {title2 && (
                  <h3 className='text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight'>
                     {title2}
                  </h3>
               )}

               <p className='text-[20px] md:text-[18px] lg:text-xl text-white w-full md:w-[70%] lg:w-[70%] leading-relaxed'>
                  {description}
               </p>
            </div>
         </div>

         {/* Button bubble */}
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
            className='absolute p-4 md:p-0 lg:p-8 w-[80%] h-[12%] md:w-[32%] md:h-[15%] lg:h-[17%] lg:w-[32%] end-[-1%] bottom-0 md:end-[-1%] md:bottom-2 lg:end-[-1%] lg:bottom-0 rounded-full'
         >
            <button
               onClick={handleNavigation}
               className='cursor-pointer text-sm md:text-[15px] lg:text-xl bg-[#D4AF37] rounded-full px-4 py-2 md:px-3 md:py-1 lg:px-8 lg:py-4 flex items-center gap-2 text-black font-semibold whitespace-nowrap hover:scale-105 transition-transform'
            >
               {button}
               <ArrowRight className='w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 rtl:rotate-180' />
            </button>
         </div>

      </div>
   )
}

export default PageHero;