import Image from "next/image";
import { useIntlayer } from "next-intlayer";

const MethodologySection = () => {
    const content = useIntlayer("methodologySection");

    const steps = [{
        number: content.steps[0].number,
        title: content.steps[0].title,
        subtitle: content.steps[0].subtitle,
        description: content.steps[0].description,
        bullets: content.steps[0].bullets,
        image: "/business/assess.jpg",
    },
    {
        number: content.steps[1].number,
        title: content.steps[1].title,
        subtitle: content.steps[1].subtitle,
        description: content.steps[1].description,
        bullets: content.steps[1].bullets,
        image: "/business/design.jpg",
    },
    {
        number: content.steps[2].number,
        title: content.steps[2].title,
        subtitle: content.steps[2].subtitle,
        description: content.steps[2].description,
        bullets: content.steps[2].bullets,
        image: "/business/deploy.jpg",
    },
    {
        number: content.steps[3].number,
        title: content.steps[3].title,
        subtitle: content.steps[3].subtitle,
        description: content.steps[3].description,
        bullets: content.steps[3].bullets,
        image: "/business/sustain.jpg",
    }]

    return (
        <section className="bg-white py-20 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-16">

                    {/* Centered header for tab view */}
                    <div className="flex flex-col items-center lg:ms-12 text-center md:flex md:flex-col md:items-center md:justify-center md:text-center lg:items-start lg:text-start">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {content.headerTitle}
                        </h2>
                        <p className="text-gray-600 text-lg">
                            {content.headerDescription}
                        </p>
                    </div>

                    {/* Timeline Container */}
                    <div className="relative mt-12">
                        {/* Vertical Line - left for md, center for lg */}
                        <div className="absolute start-0 md:start-0 lg:start-1/2 lg:-translate-x-1/2 lg:-top-5 -top-28 md:top-0 bottom-0 w-[3px] bg-[#D4AF37] hidden md:block"></div>

                        {/* Steps */}
                        <div className="space-y-12 md:space-y-24 md:ps-12">
                            {steps.map((step, index) => (
                                <div key={index} className="relative flex flex-col lg:flex-row items-start gap-10">
                                    {/* IMAGE */}
                                    <div className="w-full md:w-full lg:w-5/12 flex justify-center" data-aos="fade-up" data-aos-delay="100">
                                        <div className="relative group w-full max-w-sm md:max-w-none lg:max-w-full">
                                            <div className="relative rounded-2xl overflow-hidden shadow-xl w-full">
                                                <Image
                                                    src={step.image}
                                                    alt={step.title}
                                                    width={400}
                                                    height={300}
                                                    className="object-cover rounded-2xl shadow-xl w-full h-auto md:h-90"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* DOT - left for md, center for lg */}
                                    <div className="hidden md:block absolute start-[-58px] top-[410px] lg:static lg:w-2/12 lg:flex lg:justify-center lg:pt-2 lg:-translate-x-6 lg:rtl:translate-x-6">
                                        <div className="w-6 h-6 bg-[#D4AF37] rounded-full shadow-lg" />
                                    </div>

                                    <div className="w-full md:w-full lg:w-5/12" data-aos="fade-up" data-aos-delay="250">
                                        {/* Number & Title */}
                                        <div className="flex items-baseline gap-3 mb-3">
                                            <span className="text-5xl font-bold text-transparent bg-clip-text bg-[#D4AF37]">
                                                {step.number}
                                            </span>
                                            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-[#D4AF37]">
                                                {step.title}
                                            </h3>
                                        </div>

                                        <h4 className="text-xl font-semibold text-[#000000] mb-4">
                                            {step.subtitle}
                                        </h4>

                                        <p className="text-[#6B7280] leading-relaxed mb-6">
                                            {step.description}
                                        </p>

                                        <ul className="space-y-2">
                                            {step.bullets.map((bullet: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2 text-[#000000]">
                                                    <span className="text-[#000000] flex-shrink-0">●</span>
                                                    <span className="text-sm  leading-relaxed">{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MethodologySection;
