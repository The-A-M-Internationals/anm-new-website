'use client';

import SucessStoryCard, { SuccessStoryPlaceholder } from './SucessStoryCard';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { CmsDoc } from '@/lib/cms/shared';
import { tr } from '@/lib/cms/siteContent';

// Photo per real project (index matches content.items); the row always shows SLOTS cards
const STATIC_IMAGES = [
  { image: '/Successnew1.png' },
];

const ARABIC_BADGE = [
  { image: '/Success-arabic.png' },
]
const SLOTS = 3;

type Text = { value: string };
type StoryItem = { client?: Text; title: Text; description: Text; industry: Text; badge?: Text };

import { handleHashLink } from "@/lib/handleHashLink";

/** docs: Our Work cards from the admin portal; without them the built-in card shows */
const SuccessStory = ({ docs }: { docs?: CmsDoc[] }) => {
  const router = useRouter();
  const { locale } = useLocale();

  const content = useIntlayer('successStory');

  const [page, setPage] = useState(0);
  const [isTab, setIsTab] = useState(false);

  /**
   * Inject translations into static UI structure
   */
  const imageSource = locale === "ar" ? ARABIC_BADGE : STATIC_IMAGES;

  const localizedServices = useMemo(() => {
    const tabKeys = ['epm'];
    const fromAdmin = docs?.map(({ data: d }, index) => ({
      image: (locale === 'ar' && d.imageSrcAr) || d.imageSrc || imageSource[0].image,
      client: tr(d, 'client', locale),
      title: tr(d, 'title', locale),
      description: tr(d, 'description', locale),
      industry: tr(d, 'industry', locale),
      badge: tr(d, 'badge', locale) || undefined,
      tabKey: tabKeys[index] || 'all',
      placeholder: false,
    }));
    const items = content.items as unknown as StoryItem[];
    const real = fromAdmin ?? items.map((item, index) => ({
      image: imageSource[index]?.image ?? imageSource[0].image,
      client: item.client?.value ?? '',
      title: item.title.value,
      description: item.description.value,
      industry: item.industry.value,
      badge: item.badge?.value,
      tabKey: tabKeys[index] || 'all',
      placeholder: false,
    }));
    // Empty slots keep the row's shape until more projects are approved
    const empty = Array.from({ length: Math.max(0, SLOTS - real.length) }, () => ({ placeholder: true as const }));
    return [...real, ...empty];
  }, [imageSource, content.items, docs, locale]);


  useEffect(() => {
    const checkTab = () => {
      setIsTab(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    checkTab();
    window.addEventListener('resize', checkTab);
    return () => window.removeEventListener('resize', checkTab);
  }, []);

  const ITEMS_PER_PAGE = isTab ? 2 : localizedServices.length;
  const totalPages = isTab ? Math.ceil(localizedServices.length / 2) : 1;

  const visibleServices = isTab
    ? localizedServices.slice(page * 2, page * 2 + 2)
    : localizedServices;

  useEffect(() => {
    if (!isTab) return;
    const interval = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 3500);
    return () => clearInterval(interval);
  }, [isTab, totalPages]);

  return (
    <div className='flex flex-col items-center justify-center px-4 py-8'>
      {/* Heading */}
      <h3 className="text-[#000000] text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-semibold text-center">
        <span className="text-[#ab8d2b]">
          {content.headingStart.value}{' '}
        </span>
        {content.headingEnd.value}
      </h3>

      {/* Subheading */}
      <p className="text-[#6B7280] text-sm sm:text-base md:text-lg lg:text-xl text-center">
        {content.subheading.value}
      </p>

      {/* Cards */}
      <div className='flex flex-col md:flex-row flex-wrap justify-center gap-3 min-[640px]:gap-4 min-[1340px]:gap-x-8 mt-1 sm:mt-8 w-full max-w-7xl'>
        {visibleServices.map((service: any, idx: number) => service.placeholder ? (
          <SuccessStoryPlaceholder key={page * ITEMS_PER_PAGE + idx} label={content.placeholder.value} />
        ) : (
          <SucessStoryCard
            key={page * ITEMS_PER_PAGE + idx}
            client={service.client}
            title={service.title}
            description={service.description}
            image={service.image}
            industry={service.industry}
            badge={service.badge}
            onClick={(e) => {
              const link = `/${locale}/success-stories?tab=${service.tabKey}#story-content`;
              if (!handleHashLink(e, link, router)) {
                router.push(link);
              }
            }}
          />
        ))}
      </div>

      {/* Pagination dots (tab only) */}
      {isTab && (
        <div className="flex justify-center mt-4 gap-2">
          <div className="flex gap-2 bg-[#FFFBED] rounded-full px-4 py-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx)}
                className={`mt-3 w-2 h-2 rounded-full transition-all duration-300 ${page === idx
                  ? "bg-[#D4AF37] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
                  }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* CTA — Locale-aware routing */}
      <button
        onClick={() => router.push(`/${locale}/success-stories`)}
        className='bg-[#D4AF37] text-black px-4 py-2 sm:px-6 sm:py-3 flex items-center gap-2 rounded-full text-sm sm:text-base font-semibold hover:scale-105 transition cursor-pointer mt-4 sm:mt-8 md:mt-10 mb-1 sm:mb-5 md:mb-5'
      >
        {content.cta.value}
        <ArrowRight className='w-4 h-4 rtl:rotate-180' />
      </button>
    </div>
  );
};

export default SuccessStory;