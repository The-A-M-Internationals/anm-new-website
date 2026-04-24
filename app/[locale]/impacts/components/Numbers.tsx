'use client';

import Card from "./Card";
import FancyCard from "./FancyCard";
import { useIntlayer } from "next-intlayer";

const Numbers = () => {
    const content = useIntlayer("impactsNumbers");

    return (
        <div className="md:px-5 lg:px-[50px]">
            <div className="text-center">
                <p className="text-base lg:text-lg leading-relaxed max-w-4xl mx-auto">{content.intro}
                </p>
            </div>
            <div className="flex flex-col items-center justify-center mt-10 max-w-full md:hidden lg:block lg:w-full lg:max-w-full mx-auto">
                <div className="flex flex-col lg:flex-row gap-6 justify-center w-full flex-wrap">
                    <Card
                        icon="/careers/growth.svg"
                        title={content.target}
                        description="₹1,000,000"
                    />
                    <Card
                        icon="/careers/culture.svg"
                        title={content.raisedToDate}
                        description="₹420,500"
                    />
                    <Card
                        icon="/careers/hybrid.svg"
                        title={content.archievedPercentage}
                        description="42%"
                    />
                </div>
                <div className="flex flex-col lg:flex-row gap-6 justify-center w-full flex-wrap mt-6">
                    <FancyCard
                        icon="/careers/growth.svg"
                        title={content.totalDoanted}
                        description="₹42,050"
                    />
                    <FancyCard
                        icon="/careers/growth.svg"
                        title={content.beneficiariesSupported}
                        description={content.students}
                    />
                </div>
            </div>

            <div className="hidden md:block lg:hidden mt-10 w-full mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <Card
                        icon="/careers/growth.svg"
                        title={content.target}
                        description="₹1,000,000"
                    />

                    <Card
                        icon="/careers/culture.svg"
                        title={content.raisedToDate}
                        description="₹420,500"
                    />

                    <Card
                        icon="/careers/hybrid.svg"
                        title={content.archievedPercentage}
                        description="42%"
                    />

                    <Card
                        icon="/careers/growth.svg"
                        title={content.totalDoanted}
                        description="₹42,050"
                    />

                    {/* LAST CARD — CENTERED */}
                    <div className="md:col-span-2 flex justify-center">
                        <Card
                            icon="/careers/growth.svg"
                            title={content.beneficiariesSupported}
                            description="120 children"
                        />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Numbers;