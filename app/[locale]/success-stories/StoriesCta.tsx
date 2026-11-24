'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';

import { handleHashLink } from '@/lib/handleHashLink';

const StoriesCta: React.FC = () => {
  const router = useRouter();
  const { cta } = useIntlayer("success-stories");
  const { locale } = useLocale();

  return (
    <div className="bg-white w-full mt-16 mb-12 border border-gray-200 rounded-[40px] p-8 md:p-12 shadow-sm text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-[#C9A84C]">{cta.title.value}</h2>
      <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
        {cta.description.value}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={(e) => {
            const link = `/${locale}/contact#form`;
            if (!handleHashLink(e, link, router)) {
              router.push(link);
            }
          }}
          className="bg-black text-white font-semibold cursor-pointer px-8 py-3 rounded-full hover:scale-105 transition-all w-full sm:w-auto"
        >
          {cta.scheduleConsultation.value}
        </button>
      </div>
    </div>
  );
};

export default StoriesCta;
