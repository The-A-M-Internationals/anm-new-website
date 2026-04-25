'use client';

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intlayer';

const ServiceNavigationCards = () => {
    const router = useRouter();
    const { locale } = useLocale();

    const cards = [
        {
            title: 'Transformational Services',
            description:
                'Explore our Oracle EPM suite — Planning & Budgeting, Financial Consolidation, Account Reconciliation, Enterprise Data Management, and more.',
            link: `/${locale}/finance-transformation/transformational-services`,
            icon: (
                <svg width="56" height="56" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M124.688 0C94.4847 0 70 24.4847 70 54.6875V0H0V15.3125C0 45.5153 24.4847 70 54.6875 70H0V140H15.3125C45.5153 140 70 115.515 70 85.3125V140H140V124.688C140 94.4847 115.515 70 85.3125 70H140V0H124.688Z" fill="#D4AF37" />
                </svg>
            ),
        },
        {
            title: 'Managed Services',
            description:
                'Ongoing EPM support — Consulting-as-a-Service, Solution Management, Version Upgrades, and Monthly Maintenance to keep your systems running at peak.',
            link: `/${locale}/finance-transformation/managed-services`,
            icon: (
                <svg width="56" height="56" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M70 105L0 140V105L70 70V105ZM140 105L70 140V105L140 70V105ZM70 35V70L0 35V0L70 35ZM140 35V70L70 35V0L140 35Z" fill="#D4AF37" />
                </svg>
            ),
        },
    ];

    return (
        <section className="w-[90%] mx-auto py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {cards.map((card) => (
                    <button
                        key={card.title}
                        onClick={() => router.push(card.link)}
                        className="group text-start bg-[#FFFBED] border border-[#D4AF37]/40 rounded-2xl md:rounded-3xl p-6 md:p-10 flex flex-col gap-4 md:gap-6 shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all duration-200 cursor-pointer"
                    >
                        {/* Icon */}
                        <div className="w-14 h-14 flex items-center justify-center">
                            {card.icon}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-[#ab8d2b] transition-colors duration-200">
                            {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-1">
                            {card.description}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-sm md:text-base">
                            <span>Explore</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200 rtl:rotate-180" />
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default ServiceNavigationCards; 