import Link from "next/link";
import { ReactNode } from "react";
import { useLocale } from "next-intlayer";

interface CardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

const Card: React.FC<CardProps> = ({ icon, title, description }) => {
    const { locale } = useLocale();

    return (
        <div className="m-1 md:m-4 group relative w-full px-6 md:px-0 max-w-[330px] md:max-w-[360px] lg:max-w-[375px] mx-auto">

            {/* 🔹 Mirror ONLY in RTL */}
            <div className="rtl:[transform:scaleX(-1)]">

                <div
                    className="
            relative h-[280px] md:h-[350px] lg:h-[370px] w-full overflow-hidden rounded-3xl
            bg-white transition-colors duration-300 group-hover:bg-[#D4AF37]
          "
                >
                    {/* Border */}
                    <div className="absolute inset-0 border-2 border-gray-200 rounded-3xl"></div>

                    {/* Decorative corner */}
                    <div
                        className="
              absolute -top-6 -right-6 size-24
              rounded-bl-4xl border-2 border-gray-200 bg-white
              transition-colors duration-300
            "
                    >
                        <div className="absolute top-5.5 -left-6 h-6 w-6 bg-white"></div>

                        <div
                            className="
                absolute top-5.5 -left-6 h-6 w-6 rounded-tr-full
                border-t-2 border-r-2 border-gray-200 bg-white
                transition-colors duration-300 group-hover:bg-[#D4AF37]
              "
                        ></div>

                        <div className="absolute -bottom-6 right-5.5 h-6 w-6 bg-white"></div>

                        <div
                            className="
                absolute -bottom-6 right-5.5 h-6 w-6 rounded-tr-full
                border-t-2 border-r-2 border-gray-200 bg-white
                transition-colors duration-300 group-hover:bg-[#D4AF37]
              "
                        ></div>
                    </div>

                    {/* Arrow circle */}
                    <Link href={`/${locale}/features#epm-suites`} aria-label="Learn more about this service">
                        <div className="absolute top-4 right-4 md:top-0 md:right-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white z-30 flex items-center justify-center shadow-md">
                            <div className="w-full h-full rounded-full bg-[#D4AF37] flex items-center justify-center">
                                {/* flip arrow back */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="black"
                                    className="w-8 h-8 rtl:[transform:scaleX(-1)]"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7 17l10-10m0 0H9m8 0v8"
                                    />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* 🔹 Flip content back so text is readable */}
                    <div className="rtl:[transform:scaleX(-1)] relative z-10 p-4 sm:p-5 md:p-6 h-full flex flex-col justify-between">

                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-3 text-[#D4AF37] group-hover:text-white transition-colors duration-300 fill-current">
                            {icon}
                        </div>

                        <h3 className="text-[22px] md:text-2xl font-bold text-black transition-colors duration-300 group-hover:text-white mt-8 sm:mt-12 md:mt-15">
                            {title}
                        </h3>

                        <p className="text-[14px] md:text-base lg:text-xl text-[#6B7280] max-w-[90%] mt-2 transition-colors duration-300 group-hover:text-white">
                            {description}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Card;
