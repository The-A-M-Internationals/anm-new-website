"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useIntlayer, useLocale } from "next-intlayer";

const Innovation = () => {
    const router = useRouter();
    const path = usePathname();
    const content = useIntlayer("innovation");
    const { locale } = useLocale();
    return (
        <div className={`${path === '/events' || path === '/success-stories' ? 'hidden' : ''} relative bg-gradient-to-br bg-[#0F1E4D] min-h-[200px] overflow-hidden py-12 sm:py-16 md:py-20`}>
            {/* Left decorative icon */}
            <div className="absolute -top-3 -start-4 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
                <Image
                    src="/left.svg"
                    alt="Left Decorative Icon"
                    fill
                    className="opacity-50 sm:opacity-60 md:opacity-80 object-contain rtl:-scale-x-100"
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bold text-white mb-4 sm:mb-6">
                    {content.heading.value}
                </h1>

                <p className="text-sm sm:text-base md:text-lg lg:text-[16px] text-white font-semibold mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto">
                    {content.description.value}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                    <button onClick={() => router.push(`/${locale}/features#epm-suites`)} className="px-6 py-2.5 sm:px-8 sm:py-3 bg-[#D4AF37] cursor-pointer hover:scale-105 text-[#000000] text-sm sm:text-base font-semibold rounded-full transition-all duration-200 w-full sm:w-auto">
                        {content.epmButton.value}
                    </button>
                    <button onClick={() => router.push(`/${locale}/contact#form`)} className="px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-[#897122] text-sm sm:text-base font-semibold cursor-pointer hover:scale-105 rounded-full transition-all duration-200 w-full sm:w-auto">
                        {content.contactButton.value}
                    </button>
                </div>
            </div>

            {/* Right decorative icon */}
            <div className="absolute -end-2 -bottom-5 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
                <Image
                    src="/right.svg"
                    alt="Right Decorative Icon"
                    fill
                    className="opacity-50 sm:opacity-60 md:opacity-80 object-contain rtl:-scale-x-100"
                />
            </div>
        </div>
    );
}

export default Innovation;