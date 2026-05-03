"use client";

import { useIntlayer } from "next-intlayer";
import { Hotel, Building2, ShoppingCart, Briefcase, Users } from "lucide-react";
import Card from "./Card";

const IndustryCards = () => {
    const content = useIntlayer("industryCards");

    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "hospitality": return <Hotel className="w-8 h-8" />;
            case "real-estate": return <Building2 className="w-8 h-8" />;
            case "ecommerce": return <ShoppingCart className="w-8 h-8" />;
            case "enterprise": return <Briefcase className="w-8 h-8" />;
            case "services": return <Users className="w-8 h-8" />;
            default: return <Briefcase className="w-8 h-8" />;
        }
    };

    return (
        <section className="snap-section py-14 md:py-20 bg-white">
            <div className="w-[90%] max-w-7xl mx-auto">
                {/* Heading Section */}
                <div className="text-center mb-10 md:mb-14">
                    <h3 className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-semibold">
                        {content.heading} <span className="text-[#D4AF37]">{content.headingHighlight}</span>
                    </h3>
                    <p className="text-[#6B7280] text-sm md:text-base mt-3 max-w-2xl mx-auto">
                        {content.subheading}
                    </p>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {content.items.map((item, index) => (
                        <Card 
                            key={index} 
                            icon={getIcon(item.icon as unknown as string)}
                            title={item.title as unknown as string}
                            description={item.description as unknown as string}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default IndustryCards;
