'use client';
import Image from "next/image";

interface FancyCardProps {
    icon: string;
    title: string;
    description: string;
}

const FancyCard: React.FC<FancyCardProps> = ({ title, description, icon }) => {
    return (
        <div className="group relative w-full max-w-[400px] md:max-w-[370px] mx-auto lg:max-w-[690px]">
            {/* MAIN CARD */}
            <div
                className="
          relative h-[250px] lg:h-[300px] w-full overflow-hidden rounded-3xl
          bg-white
          transition-colors duration-300
          group-hover:bg-[#D4AF37]
          
        "
            >
                {/* Outer Border */}
                <div className="absolute inset-0 border-2 border-gray-200 rounded-3xl"></div>



                {/* TOP LEFT BITTEN CORNER */}
                <div
                    className="
            absolute -top-6 -left-6 size-24 
            rounded-br-4xl border-2 border-gray-200 
            bg-white
            transition-colors duration-300
          "
                >
                    <div className="absolute top-5.5 -right-6 h-6 w-6 bg-white transition-colors duration-300"></div>

                    <div
                        className="
              absolute top-5.5 -right-6 h-6 w-6 rounded-tl-full
              border-t-2 border-l-2 border-gray-200 
              bg-white
              transition-colors duration-300
              group-hover:bg-[#D4AF37]
            "
                    ></div>

                    <div className="absolute -bottom-6 left-5.5 h-6 w-6 bg-white transition-colors duration-300"></div>

                    <div
                        className="
              absolute -bottom-6 left-5.5 h-6 w-6 rounded-tl-full
              border-t-2 border-l-2 border-gray-200 
              bg-white
              transition-colors duration-300
              group-hover:bg-[#D4AF37]
            "
                    ></div>
                </div>



                {/* TOP LEFT GOLD CIRCLE */}
                <div className="absolute top-1 left-1 lg:top-0 lg:left-0 h-14 w-14 lg:w-16 lg:h-16 rounded-full bg-white z-30 flex items-center justify-center shadow-md">
                    <div className="w-full h-full rounded-full bg-[#D4AF37] flex items-center justify-center">
                        <Image
                            src={icon}
                            alt={title}
                            width={32}
                            height={32}
                            className="text-black"
                        />
                    </div>
                </div>

                {/* CONTENT AREA */}
                <div className="relative z-10 p-6 h-full flex flex-col gap-0 mt-5 lg:mt-12">
                    {/* TITLE */}
                    <h3
                        className="
              text-[24px] font-bold text-[#D4AF37]
              transition-colors duration-300
              group-hover:text-white mt-17 lg:mt-18
            "
                    >
                        {title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p
                        className="
              text-[30px] lg:text-[48px] lg:font-semibold text-[#0B132B] max-w-[90%] mt-2
              transition-colors duration-300
              group-hover:text-white
            "
                    >
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FancyCard;