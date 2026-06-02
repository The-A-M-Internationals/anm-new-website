'use client';

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { useIntlayer, useLocale } from "next-intlayer";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const router = useRouter();
    const { locale } = useLocale();
    const content = useIntlayer("faq");
    const faqs = [
        {
            question: content.faq1Question.value,
            answer: content.faq1Answer.value,
        },
        {
            question: content.faq2Question.value,
            answer: content.faq2Answer.value,
        },
        {
            question: content.faq3Question.value,
            answer: content.faq3Answer.value,
        },
        {
            question: content.faq4Question.value,
            answer: content.faq4Answer.value,
        },
        {
            question: content.faq5Question.value,
            answer: content.faq5Answer.value,
        },
        {
            question: content.faq6Question.value,
            answer: content.faq6Answer.value,
        },
        {
            question: content.faq7Question.value,
            answer: content.faq7Answer.value,
        },
        {
            question: content.faq8Question.value,
            answer: content.faq8Answer.value,
        }
    ];

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            {/* FAQ Section */}
            <div
                className="relative py-12 md:py-20 lg:py-24 px-4 overflow-hidden bg-[#0D1B3E]"
                style={{
                    backgroundImage: "url('/whychooseus.svg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "right -100px",
                }}
            >
                {/* Decorative circles on the left */}
                <div className='absolute -left-8 top-0'>
                    <Image src='/left.svg' alt='side image' width={150} height={150} />
                </div>

                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
                        {content.title.value}
                    </h2>
                    <p className="text-lg md:text-xl text-[#C9A84C] text-center mb-12 md:mb-24">
                        {content.subheading.value}
                    </p>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border-b border-white pb-4"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full flex items-start justify-between text-left group"
                                >
                                    <div className="flex-1">
                                        <h3 className={`text-white text-lg md:text-xl font-medium transition ${locale === 'ar' ? 'text-right pl-4' : 'text-left pr-4'}`}>
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-3 bg-[#FFFFFF] px-3 py-1 rounded-[50px] cursor-pointer">
                                        {openIndex === index ? (
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="black" />
                                            </svg>
                                        ) : (
                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="black" />
                                            </svg>
                                        )}
                                    </div>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openIndex === index
                                        ? 'max-h-96 opacity-100 mt-4'
                                        : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 text-gray-700 leading-relaxed">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Join Our Team Section */}
            <div className='flex flex-col gap-5 items-center py-12 md:py-20 bg-[#0D1B3E] relative px-4'>
                <h2 className='text-3xl md:text-5xl text-white font-bold text-center'>
                    {content.joinTitle.value}
                </h2>
                <p className='text-white text-base md:text-lg text-center w-full md:w-[60%]'>
                    {content.joinDescription.value}
                </p>
                <button onClick={() => router.push(`/${locale}/careers#open-positions`)} className='bg-[#C9A84C] w-[300px] flex items-center justify-center gap-2 text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition cursor-pointer'>
                    {content.joinButton.value}
                    <ArrowRight className='w-5 h-5 rtl:rotate-180' />
                </button>
                <div className='absolute right-0 bottom-0'>
                    <Image src='/right.svg' alt='side image' width={150} height={150} />
                </div>
            </div>
        </div>
    );
};

export default FAQ;