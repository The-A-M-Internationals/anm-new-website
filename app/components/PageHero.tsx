'use client';

import RollLabel from "./RollLabel";
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getImageProps } from 'next/image'
import React, { useRef } from 'react'
import { useLocale } from "next-intlayer";
import { handleHashLink } from '@/lib/handleHashLink'
import HeroRevealText from './HeroRevealText'
import { useHeroTextReveal } from './useHeroTextReveal'

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
   titleClassName?: string
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
   buttonImage,
   titleClassName
}) => {
   const { locale } = useLocale();
   const router = useRouter();
   const heroCommon = { alt: 'Hero', fill: true, sizes: '100vw', loading: 'eager' as const, fetchPriority: 'high' as const };
   const { props: { srcSet: d } } = getImageProps({ ...heroCommon, src: image });
   const { props: { srcSet: t } } = getImageProps({ ...heroCommon, src: image3 });
   const { props: mobileImg } = getImageProps({ ...heroCommon, src: image2 });
   const desktopSrc = { srcSet: d }, tabletSrc = { srcSet: t };
   const textRef = useRef<HTMLDivElement>(null);
   useHeroTextReveal(textRef);   // title lines rise out of a mask on load

   return (
      <div className='relative w-[90%] mx-auto'>
         <div
            className="
    relative w-full overflow-hidden
    h-[610px]
    md:h-[400px]
    lg:h-[670px]
  "
         >
            {/* Hero image: one <picture>, so each screen downloads only its own size, straight away
                (desktop >= 1024px, tablet >= 640px, phone below). Same images and fit as before. */}
            <picture>
               <source media="(min-width: 1024px)" srcSet={desktopSrc.srcSet} sizes="100vw" />
               <source media="(min-width: 640px)" srcSet={tabletSrc.srcSet} sizes="100vw" />
               {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
               <img {...mobileImg} className="absolute inset-0 h-full w-full object-fill sm:object-contain lg:object-fill" />
            </picture>

            {/* Text */}
            <div ref={textRef} className='absolute bottom-25 md:bottom-10 lg:bottom-6 start-2 sm:start-3 md:start-4 flex w-[95%] flex-col gap-2 md:gap-1 lg:gap-2'>
               {badge && (
                  <h4 data-hero-soft className='motion-safe:opacity-0 w-fit rounded-3xl px-4 py-1 md:px-5 md:py-1.5 lg:px-6 lg:py-2 text-[#D4AF37] bg-[#FFFBED] border border-[#D4AF37] text-[16px] md:text-base lg:text-lg font-medium'>
                     {badge}
                  </h4>
               )}

               <HeroRevealText as="h1" text={title} className={`font-bold text-white leading-[1.2] [text-shadow:0_2px_18px_rgba(0,0,0,0.55)] ${titleClassName || 'w-[80%] md:w-[62%] xl:w-[75%] text-[24px] md:text-[32px] lg:text-[48px]'}`} />

               {title2 && (
                  <HeroRevealText text={title2} className={`font-bold text-white leading-[1.2] [text-shadow:0_2px_18px_rgba(0,0,0,0.55)] ${titleClassName || 'w-[80%] md:w-[62%] xl:w-[75%] text-[24px] md:text-[32px] lg:text-[48px]'}`} />
               )}

               <p data-hero-soft className='motion-safe:opacity-0 text-[18px] md:text-base lg:text-[19px] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] w-[70%] md:w-[60%] lg:w-[65%] leading-relaxed'>
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
                  if (!handleHashLink(e, link, router)) {
                     router.push(link);
                  }
               }}
               className='cursor-pointer text-xs md:text-sm lg:text-base bg-[#D4AF37] rounded-full px-4 py-2 md:px-3 md:py-1 lg:px-6 lg:py-3 flex items-center gap-2 text-black font-semibold whitespace-nowrap hover:scale-105 transition-transform'
            >
               <RollLabel>{button}</RollLabel>
               <ArrowRight strokeWidth={1.5} className='w-4 h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 rtl:rotate-180' />
            </button>
         </div>

      </div>
   )
}

export default PageHero
