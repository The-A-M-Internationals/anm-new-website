import Image from "next/image";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIntlayer, useLocale } from "next-intlayer";

interface LiveEventsProps {
    id: string;
    title: string;
    description: string;
    location: string;
    dateRange: string;
    month: string;
    timeRange: string;
    imageSrc: string;
}

const LiveEvents: React.FC<LiveEventsProps> = ({
    id,
    title,
    description,
    location,
    dateRange,
    month,
    timeRange,
    imageSrc,
}) => {
    const content = useIntlayer("events");
    const router = useRouter();
    const { locale } = useLocale();

    return (
        <div className="flex flex-col items-center mb-4 gap-2 px-4">
            <div className="bg-white rounded-3xl sm:rounded-[40px] md:rounded-[60px] shadow-md border border-gray-200 overflow-hidden flex flex-col lg:flex-row w-full max-w-[1350px] gap-4 sm:gap-6 p-4 sm:p-6">

                {/* Image Section */}
                <div className="w-full lg:w-1/3">
                    <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-full min-h-[250px] rounded-2xl sm:rounded-3xl md:rounded-[40px] overflow-hidden">
                        <Image
                            src={imageSrc}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Content Section */}
                <div className="w-full lg:flex-1 bg-gradient-to-r from-[#FFFFFF] to-[#FFFBED] shadow-md p-4 sm:p-6 md:p-8 border border-[#D9D9D9] rounded-2xl sm:rounded-3xl md:rounded-[40px]">

                    <div className="flex flex-row items-center justify-center w-28 sm:w-32 md:w-36 gap-2 text-yellow-600 text-xs sm:text-sm font-medium mb-3 sm:mb-4 bg-[#FFFBED] rounded-2xl sm:rounded-3xl p-1.5 sm:p-2">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M7.33203 5.33203H8.66536" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M1.33203 7.33268C1.33203 5.13268 1.33203 4.03268 2.01536 3.34935C2.6987 2.66602 3.7987 2.66602 5.9987 2.66602H6.66536C8.86536 2.66602 9.96537 2.66602 10.6487 3.34935C11.332 4.03268 11.332 5.13268 11.332 7.33268V8.66602C11.332 10.866 11.332 11.966 10.6487 12.6493C9.96537 13.3327 8.86536 13.3327 6.66536 13.3327H5.9987C3.7987 13.3327 2.6987 13.3327 2.01536 12.6493C1.33203 11.966 1.33203 10.866 1.33203 8.66602V7.33268Z" stroke="#D4AF37" strokeWidth="1.5" />
                            <path d="M11.332 5.93606L11.416 5.86672C12.8267 4.70272 13.532 4.12072 14.0987 4.40206C14.6654 4.68272 14.6654 5.61472 14.6654 7.47739V8.52006C14.6654 10.3827 14.6654 11.3147 14.0987 11.5954C13.532 11.8761 12.8267 11.2947 11.416 10.1307L11.332 10.0614" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span>{content.inPerson.value}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4">
                        {title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6">{description}</p>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-700 mb-3 sm:mb-4">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                        <span className="font-medium text-sm sm:text-base">{location}</span>
                    </div>

                    {/* Date + Time */}
                    <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 border border-gray-200 px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm">
                            <CalendarDays className='w-4 h-4 md:w-6 md:h-6 text-[#D4AF37] font-light' />
                            <span className="text-gray-900 font-medium text-sm md:text-base">
                                {dateRange}
                                <span className="text-[#6B7280] ms-2">{month}</span>
                            </span>

                        </div>
                        {/* Time */}
                        <div className="flex items-center gap-2 border border-gray-200 px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-sm">
                            <Clock className='w-4 h-4 md:w-6 md:h-6 text-[#D4AF37] font-light' />
                            <span className="text-gray-900 font-medium text-sm md:text-base">{timeRange}</span>
                        </div>
                    </div>

                    {/* Button */}
                    <button onClick={() => router.push(`/${locale}/register?eventId=${id}`)} className="bg-[#D4AF37] hover:scale-105 cursor-pointer text-black font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-full flex items-center gap-2 transition text-sm sm:text-base">
                        {content.registerNow.value}
                        <svg fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 rtl:rotate-180" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LiveEvents;