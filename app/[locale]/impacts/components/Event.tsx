'use client';

import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import { useIntlayer } from "next-intlayer";

const Event = () => {
    const content = useIntlayer("impactsEvent");
    return (
        <div id="donate" className="flex flex-col items-center justify-center gap-10 mt-15 px-4 md:px-6 lg:px-2">
            <div>
                <div className="mt-4 bg-white rounded-[40px] md:rounded-[60px] shadow-md border border-gray-200 overflow-hidden flex flex-col md:gap-8 lg:flex-row  lg:w-[1410px] gap-[58px] p-4">

                    {/* Image Section */}
                    <div className="w-full lg:w-[650px]">
                        <div className="relative h-[370px] md:h-[400px] rounded-[30px] md:rounded-[40px] overflow-hidden">
                            <Image
                                src='/gala.jpg'
                                alt="Event Image"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full bg-gradient-to-r from-[#FFFFFF] to-[#FFFBED] shadow-md p-8 border border-[#D9D9D9] rounded-[40px] ">

                        <div className="flex flex-row items-center justify-center w-36 gap-2 text-yellow-600 text-sm font-medium mb-4 bg-[#FFFBED] rounded-3xl p-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.33203 10.6663L6.66536 8.66634M9.33203 7.33301L12.6654 5.33301M7.9987 3.33301V6.66634M7.9987 9.33301V12.6663M3.33203 5.33301L6.66536 7.33301M9.33203 8.66634L12.6654 10.6663M13.6654 5.99967V9.66634M8.9987 13.6663L12.6654 11.6663M2.9987 11.6663L6.9987 13.6663M2.33203 9.99967V5.99967M2.9987 4.33301L6.9987 2.33301M12.9987 4.33301L8.9987 2.33301" stroke="#D4AF37" strokeLinejoin="round" />
                                <path d="M8 3.33301C8.55228 3.33301 9 2.88529 9 2.33301C9 1.78072 8.55228 1.33301 8 1.33301C7.44772 1.33301 7 1.78072 7 2.33301C7 2.88529 7.44772 3.33301 8 3.33301Z" stroke="#D4AF37" strokeLinejoin="round" />
                                <path d="M8 14.666C8.55228 14.666 9 14.2183 9 13.666C9 13.1137 8.55228 12.666 8 12.666C7.44772 12.666 7 13.1137 7 13.666C7 14.2183 7.44772 14.666 8 14.666Z" stroke="#D4AF37" strokeLinejoin="round" />
                                <path d="M2.33203 6C2.88432 6 3.33203 5.55228 3.33203 5C3.33203 4.44772 2.88432 4 2.33203 4C1.77975 4 1.33203 4.44772 1.33203 5C1.33203 5.55228 1.77975 6 2.33203 6Z" stroke="#D4AF37" strokeLinejoin="round" />
                                <path d="M13.6641 6C14.2163 6 14.6641 5.55228 14.6641 5C14.6641 4.44772 14.2163 4 13.6641 4C13.1118 4 12.6641 4.44772 12.6641 5C12.6641 5.55228 13.1118 6 13.6641 6Z" stroke="#D4AF37" strokeLinejoin="round" />
                                <path d="M13.6641 12C14.2163 12 14.6641 11.5523 14.6641 11C14.6641 10.4477 14.2163 10 13.6641 10C13.1118 10 12.6641 10.4477 12.6641 11C12.6641 11.5523 13.1118 12 13.6641 12Z" stroke="#D4AF37" strokeLinejoin="round" />
                                <path d="M2.33203 12C2.88432 12 3.33203 11.5523 3.33203 11C3.33203 10.4477 2.88432 10 2.33203 10C1.77975 10 1.33203 10.4477 1.33203 11C1.33203 11.5523 1.77975 12 2.33203 12Z" stroke="#D4AF37" strokeLinejoin="round" />
                                <path d="M7.9974 6.5L9.33073 7.25V8.75L7.9974 9.5L6.66406 8.75V7.25L7.9974 6.5Z" stroke="#D4AF37" strokeLinejoin="round" />
                            </svg>
                            <span>{content.badge}</span>
                        </div>

                        {/* Title */}
                        <p className="text-2xl md:text-3xl font-semibold text-[#000000] mb-4">
                            {content.title}
                        </p>

                        {/* Description */}
                        <p className="text-[#6B7280] text-xl mb-6">
                            {content.description}
                        </p>

                        {/* Location */}
                        <div className="flex flex-row gap-5">
                            <div className="flex items-center gap-2 text-[#000000] mb-4">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.5 11C15.5 10.5404 15.4095 10.0852 15.2336 9.66061C15.0577 9.23597 14.7999 8.85013 14.4749 8.52513C14.1499 8.20012 13.764 7.94231 13.3394 7.76642C12.9148 7.59053 12.4596 7.5 12 7.5C11.5404 7.5 11.0852 7.59053 10.6606 7.76642C10.236 7.94231 9.85013 8.20012 9.52513 8.52513C9.20012 8.85013 8.94231 9.23597 8.76642 9.66061C8.59053 10.0852 8.5 10.5404 8.5 11C8.5 11.9283 8.86875 12.8185 9.52513 13.4749C10.1815 14.1313 11.0717 14.5 12 14.5C12.9283 14.5 13.8185 14.1313 14.4749 13.4749C15.1313 12.8185 15.5 11.9283 15.5 11Z" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15.4824 11.35C15.805 11.4493 16.144 11.4993 16.4994 11.5M16.4994 11.5C17.1767 11.4999 17.8394 11.3033 18.4071 10.934C18.9749 10.5647 19.4233 10.0386 19.698 9.41957C19.9727 8.80049 20.0619 8.115 19.9547 7.44624C19.8476 6.77748 19.5487 6.15418 19.0943 5.65193C18.6399 5.14967 18.0496 4.79004 17.3949 4.61664C16.7402 4.44325 16.0492 4.46354 15.4058 4.67506C14.7624 4.88657 14.1941 5.28023 13.77 5.80828C13.3459 6.33634 13.0841 6.97611 13.0164 7.65M16.4994 11.5C19.5374 11.5 21.9994 13.739 21.9994 16.5M10.9824 7.65C10.9101 6.93242 10.6179 6.2547 10.1457 5.70952C9.67359 5.16434 9.04455 4.77832 8.34466 4.60427C7.64477 4.43022 6.90819 4.47663 6.23568 4.73716C5.56317 4.99769 4.98756 5.4596 4.58758 6.05974C4.1876 6.65987 3.98278 7.36891 4.00113 8.08989C4.01949 8.81086 4.26012 9.50857 4.69011 10.0876C5.12011 10.6666 5.71847 11.0986 6.40337 11.3246C7.08826 11.5506 7.82624 11.5594 8.51637 11.35M17.4994 19.5C17.4994 16.739 15.0374 14.5 11.9994 14.5C8.96137 14.5 6.49937 16.739 6.49937 19.5" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M7.5 11.5C4.462 11.5 2 13.739 2 16.5" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="font-medium">{content.seats}</span>
                            </div>

                        </div>


                        <div className="flex flex-wrap gap-4 mb-6">
                            <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                                <Calendar className='w-4 h-4 md:w-6 md:h-6 text-[#D4AF37] font-light' />
                                <span className="text-[#000000] font-medium text-sm md:text-base">
                                    20
                                    <span className="text-[#6B7280] ml-2">{content.month} {content.day}</span>
                                </span>
                            </div>
                            <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                                <Clock className='w-4 h-4 md:w-6 md:h-6 text-[#D4AF37] font-light' />
                                <span className="text-[#000000] font-medium text-sm md:text-base">
                                    {content.time}
                                </span>
                            </div>
                        </div>

                        {/* Button */}
                        <button className="w-44 text-center bg-[#D4AF37] hover:scale-105 cursor-pointer text-black font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 transition">
                            <p>{content.button}</p>
                            <svg fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Event;