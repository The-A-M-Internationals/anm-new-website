import Image from "next/image";
import { useIntlayer } from "next-intlayer";

const EmpoweringSection = () => {
    // Use the correct content key as in the content file
    const content = useIntlayer("businessEmpoweringSection");

    const values = [
        {
            icon: "/business/excellence.svg",
            title: content.value1Title,
            description: content.value1Description
        },
        {
            icon: "/business/impact.svg",
            title: content.value2Title,
            description: content.value2Description
        },
        {
            icon: "/business/partnership.svg",
            title: content.value3Title,
            description: content.value3Description
        },
        {
            icon: "/business/innovation.svg",
            title: content.value4Title,
            description: content.value4Description
        }
    ];

    return (
        <section id="mission" className="bg-white py-20 px-6 md:px-12 lg:px-20 lg:mt-15">
            <div className="max-w-[1400px] mx-auto flex flex-col gap-8">

                {/* TOP: Title + Description */}
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">

                    {/* Title */}
                    <h2 className="lg:max-w-[900px] text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight flex-1">
                        {content.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-lg lg:text-[20px] leading-relaxed lg:max-w-[510px] lg:-translate-y-8 lg:mt-15">
                        {content.description}
                    </p>
                </div>

                {/* BOTTOM: Image + Cards */}
                <div className="flex flex-col lg:flex-row gap-10 lg:-translate-y-5">

                    {/* LEFT – Image container */}
                    <div className="flex-shrink-0 lg:w-[45%]">
                        <div className="relative w-full h-[500px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-xl">
                            <Image
                                src="/business/business.jpg"
                                alt="Team collaboration"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* RIGHT – Value Cards */}
                    <div className="flex flex-col justify-between w-full lg:w-1/2 space-y-1">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex items-start gap-4"
                            >
                                <div className="flex-shrink-0 w-16 h-20 bg-gradient-to-br  rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Image
                                        src={value.icon}
                                        alt={value.title}
                                        width={50}
                                        height={50}
                                        className="w-50 h-60"
                                    />
                                </div>

                                <div className="flex-1 pr-15">
                                    <h3 className="text-xl font-bold text-[#000000] mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-[#6B7280] leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
};

export default EmpoweringSection;