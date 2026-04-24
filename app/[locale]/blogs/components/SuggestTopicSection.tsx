'use client';

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIntlayer } from "next-intlayer";
import { useLocale } from "next-intlayer";

export default function SuggestTopicSection() {

    const router = useRouter();
    const content = useIntlayer("blogsSuggestTopicSection");
    const { locale } = useLocale();

    return (
        <div className='flex flex-col gap-5 items-center py-12 md:py-20 lg:py-24 bg-[#0F1E4D] relative px-4'>
            <h2 className='text-3xl md:text-5xl text-white text-center'>
                {content.title}
            </h2>
            <p className='text-white text-base md:text-lg text-center w-[90%] md:w-[50%]'>
                {content.description}
            </p>
            <button
                onClick={() => router.push(`/${locale}/contact#form`)}
                className='bg-[#D4AF37] w-full sm:w-[200px] flex items-center justify-center gap-2 text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition cursor-pointer'
            >
                {content.button}
                <ArrowRight className='w-5 h-5 rtl:rotate-180' />
            </button>
            <div className='absolute right-0 bottom-0 '>
                <Image src='/right.svg' alt='side image' width={100} height={100} className="md:w-[150px] md:h-[150px]" />
            </div>
        </div>
    );
}