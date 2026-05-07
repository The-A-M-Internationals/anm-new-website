'use client';
import Image from "next/image";

interface FancyCardProps {
    icon: string;
    title: string;
    description: string;
}

const FancyCard: React.FC<FancyCardProps> = ({ title, description, icon }) => {
    return (
        <div className="m-4 md:m-6 group relative w-full max-w-[300px] mx-auto md:max-w-[380px]">
            {/* MAIN CARD */}
            <div
                className="
          relative h-[250px] md:h-[300px] w-full overflow-hidden rounded-3xl
          bg-white
          transition-colors duration-300
          group-hover:bg-[#D4AF37]
          cursor-pointer
        "
            >
                {/* Outer Border */}
                <div className="absolute inset-0 border-2 border-gray-200 rounded-3xl"></div>



                {/* TOP START BITTEN CORNER */}
                <div
                    className="
            absolute -top-6 -start-6 size-24 
            rounded-be-4xl border-2 border-gray-200 
            bg-white
            transition-colors duration-300
          "
                >
                    <div className="absolute top-5.5 -end-6 h-6 w-6 bg-white transition-colors duration-300"></div>

                    <div
                        className="
              absolute top-5.5 -end-6 h-6 w-6 rounded-ts-full
              border-t-2 border-s-2 border-gray-200 
              bg-white
              transition-colors duration-300
              group-hover:bg-[#D4AF37]
            "
                    ></div>

                    <div className="absolute -bottom-6 start-5.5 h-6 w-6 bg-white transition-colors duration-300"></div>

                    <div
                        className="
              absolute -bottom-6 start-5.5 h-6 w-6 rounded-ts-full
              border-t-2 border-s-2 border-gray-200 
              bg-white
              transition-colors duration-300
              group-hover:bg-[#D4AF37]
            "
                    ></div>
                </div>



                {/* TOP START GOLD CIRCLE */}
                <div className="absolute top-0 start-0 w-16 h-16 rounded-full bg-white z-30 flex items-center justify-center shadow-md">
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
                <div className="relative z-10 p-6 h-full flex flex-col gap-6 mt-2 md:mt-12">
                    {/* TITLE */}
                    <h3
                        className="
              text-2xl font-bold text-black
              transition-colors duration-300
              group-hover:text-white mt-13 md:mt-16
            "
                    >
                        {title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p
                        className="
              text-[16px] md:text-xl text-[#6B7280] max-w-[90%] mt-0 md:mt-2
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