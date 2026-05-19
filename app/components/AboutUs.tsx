'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useIntlayer, useLocale } from "next-intlayer";
import "./aboutUs.content"; // registers dictionary

const AboutUs = () => {
    const router = useRouter();
    const { locale } = useLocale();
    const content = useIntlayer("aboutUs");

    const getLocalizedLink = (path: string) =>
        `/${locale}${path === '/' ? '' : path}`;

    return (
        <div
            id="about-us"
            className="
                flex flex-col lg:flex-row
                gap-8 md:gap-12 lg:gap-18
                items-center justify-center
                px-4 md:px-6 lg:px-8
                py-2 md:py-12
                overflow-hidden
                bg-[linear-gradient(105.23deg,#FFFFFF_0%,#FFFBED_126.38%)]
            "
        >
            {/* IMAGE */}
            <div className="relative w-full max-w-[400px] md:max-w-[750px] lg:max-w-[525px] h-[420px] md:h-[820px] lg:h-[557px] rounded-3xl flex-shrink-0">
                <Image
                    src="/aboutus/aboutus.png"
                    alt="About Us"
                    fill
                    className="object-cover rounded-3xl"
                    priority
                />

                {/* Arrow */}
                <div className="absolute z-10 bottom-3 right-3 md:bottom-4 md:right-1 lg:bottom-3 lg:right-3 translate-x-3 translate-y-1 w-10 h-10 md:w-20 md:h-20 lg:w-14 lg:h-14 rounded-full bg-white shadow-md flex items-center justify-center">
                    <div className="w-full h-full rounded-full border-2 sm:border-3 md:border-4 border-[#D4AF37] flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4">
                            <path d="M8 6L18 12L8 18V6Z" fill="#D4AF37" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* TEXT */}
            <div className="flex flex-col gap-3 w-full lg:max-w-[750px] px-1 md:px-0">

                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-semibold leading-tight">
                    {content.titleBefore.value} <span className="text-[#D4AF37]">{content.titleHighlight.value}</span>
                </p>

                <div className="lg:w-[90%] lg:text-justify">
                    <p className="font-semibold text-[20px] md:text-[26px] lg:text-[24px]">
                        {content.tagline.value}
                    </p>

                    <p className="mt-1 md:mt-2 text-[18px] md:text-[22px] lg:text-[22px]">
                        {content.paragraph1.value}
                    </p>

                    <p className="mt-1 md:mt-2 text-[18px] md:text-[22px] lg:text-[22px]">
                        {content.paragraph2.value}
                    </p>
                </div>

                <button
                    onClick={() => router.push(getLocalizedLink('/business'))}
                    className="
                        mt-4 sm:mt-7
                        rounded-3xl
                        w-36 sm:w-40
                        h-9 sm:h-10
                        text-black
                        bg-[#D4AF37]
                        flex items-center justify-center
                        text-sm sm:text-lg
                        font-medium
                        cursor-pointer
                        hover:scale-105 transition
                    "
                >
                    {content.cta.value}
                </button>
            </div>
        </div>
    );
};

export default AboutUs;