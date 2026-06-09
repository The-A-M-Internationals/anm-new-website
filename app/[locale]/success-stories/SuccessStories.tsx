'use client'
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';

import { handleHashLink } from '@/lib/handleHashLink';

const SuccessStories: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const content = useIntlayer("success-stories");
  const { locale } = useLocale();
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState('all');

  const searchTab = searchParams.get('tab');

  useEffect(() => {
    if (searchTab && ['automotive', 'healthcare', 'insurance', 'all'].includes(searchTab)) {
      setActiveTab(searchTab);
    }
  }, [searchTab]);

  // Manually handle hash scroll to ensure it bypasses the hero image
  useEffect(() => {
    if (window.location.hash === '#story-content' || searchTab) {
      setTimeout(() => {
        if (containerRef.current) {
          const yOffset = 0; // Removed offset as navbar is not fixed
          const y = containerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;      
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 500); // Increased timeout to ensure layout is stable
    }
  }, [searchTab]);

  const tabs = [
    { key: 'all', label: content.tabs.all.value },
    { key: 'automotive', label: content.tabs.automotive.value },
    { key: 'healthcare', label: content.tabs.healthcare.value },
    { key: 'insurance', label: content.tabs.insurance.value },
  ];

  const s = content.caseStudies;

  const caseStudies = [
    {
      id: '1',
      industryKey: 'automotive',
      industry: s.study1.industry.value,
      companyName: s.study1.companyName.value,
      metric1: s.study1.metric1.value,
      metric1Value: content.primaryImpact.value,
      metric2: s.study1.metric2.value,
      metric2Value: content.additionalBenefit.value,
      image: '/sst1.jpg',
      p1: s.study1.p1.value,
      p2: s.study1.p2.value,
      p3: s.study1.p3.value,
      p4: s.study1.p4.value,
      link: s.study1.link.value,
    },
    {
      id: '2',
      industryKey: 'insurance',
      industry: s.study2.industry.value,
      companyName: s.study2.companyName.value,
      metric1: s.study2.metric1.value,
      metric1Value: content.primaryImpact.value,
      metric2: s.study2.metric2.value,
      metric2Value: content.additionalBenefit.value,
      image: '/sst2.jpg',
      p1: s.study2.p1.value,
      p2: s.study2.p2.value,
      p3: s.study2.p3.value,
      p4: s.study2.p4.value,
      link: s.study2.link.value,
    },
    {
      id: '3',
      industryKey: 'healthcare',
      industry: s.study3.industry.value,
      companyName: s.study3.companyName.value,
      metric1: s.study3.metric1.value,
      metric1Value: content.primaryImpact.value,
      metric2: s.study3.metric2.value,
      metric2Value: content.additionalSavings.value,
      image: '/sst3.jpg',
      p1: s.study3.p1.value,
      p2: s.study3.p2.value,
      p3: s.study3.p3.value,
      p4: s.study3.p4.value,
      link: s.study3.link.value,
    },
  ];

  const filteredStudies = activeTab === 'all'
    ? caseStudies
    : caseStudies.filter(study => study.industryKey === activeTab);

  return (
    <div className="min-h-screen py-10" id="story-content" ref={containerRef}>
      <div className="w-[92%] max-w-[1400px] mx-auto">
        {/* Tabs */}
        <div className="flex border border-[#F6F6F6] w-fit mx-auto rounded-3xl md:rounded-full shadow-sm p-2 flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2 cursor-pointer rounded-full font-medium transition-all duration-200 ${activeTab === tab.key
                ? 'bg-[#C9A84C] text-white shadow-md'
                : 'bg-[#F6F6F6] text-gray-700 hover:bg-gray-100'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Case Studies */}
        <div className="space-y-12 w-full">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              id={study.id}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full border border-gray-200 shadow-md rounded-[40px] p-4 md:p-6"
            >
              {/* Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[520px] md:min-h-[570px] lg:min-h-0">
                <img
                  src={study.image}
                  alt={study.companyName}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute border-t border-white/32 w-full bottom-0 bg-transparent backdrop-blur-[8px] flex flex-col gap-1 p-4">
                  <h3 className="text-xs w-fit rounded-full px-3 py-2 bg-[#FFFBED] font-semibold text-[#C9A84C]">
                    {study.industry}
                  </h3>
                  <h3 className="text-white text-xl md:text-2xl font-semibold">{study.companyName}</h3>
                  <div className="flex gap-4 justify-around">
                    <div className="flex flex-col items-center">
                      <h4 className="text-2xl md:text-[28px] font-semibold text-[#C9A84C]">{study.metric1}</h4>
                      <p className="text-xs md:text-sm text-white">{study.metric1Value}</p>
                    </div>
                    <div className="w-[1px] h-full bg-[#FFFFFF26]" />
                    <div className="flex flex-col items-center">
                      <h4 className="text-2xl md:text-[28px] font-semibold text-[#C9A84C]">{study.metric2}</h4>
                      <p className="text-xs md:text-sm text-white">{study.metric2Value}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Card */}
              <div className="lg:col-span-2 relative p-2 md:p-4 flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-600 text-sm md:text-[18px] leading-relaxed">
                      {study.p1}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm md:text-[18px] leading-relaxed">
                      {study.p2}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm md:text-[18px] leading-relaxed">
                      {study.p3}
                    </p>
                  </div>
                  <div className="bg-[#FFFBED] p-6 rounded-2xl">
                    <p className="text-gray-600 text-sm md:text-[18px] italic leading-relaxed">
                      {study.p4}
                    </p>
                  </div>
                  <div className="text-sm md:text-base text-gray-900 hover:text-[#C9A84C] transition-colors cursor-pointer mt-4">
                    <a href="mailto:am@theaminternational.com">
                      <span className="font-semibold">
                        {study.link.split(/->|<-|→|←/)[0].trimEnd()}
                      </span>
                      <span className="font-normal mx-2">
                        {study.link.match(/->|<-|→|←/)?.[0]}
                      </span>
                      <span className="font-normal">
                        {(study.link.includes('am@theaminternationals.com') || study.link.includes('am@theaminternational.com')) && 'am@theaminternational.com'}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-white w-full mt-16 mb-12 border border-gray-200 rounded-[40px] p-8 md:p-12 shadow-sm text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-[#C9A84C]">{content.cta.title.value}</h2>
          <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {content.cta.description.value}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={(e) => {
                const link = `/${locale}/features#epm-suites`;
                if (!handleHashLink(e, link, router)) {
                  router.push(link);
                }
              }}
              className="bg-[#C9A84C] text-black font-semibold cursor-pointer px-8 py-3 rounded-full hover:scale-105 transition-all w-full sm:w-auto"
            >
              {content.cta.seeEpm.value}
            </button>
            <button 
              onClick={(e) => {
                const link = `/${locale}/contact#form`;
                if (!handleHashLink(e, link, router)) {
                  router.push(link);
                }
              }} 
              className="bg-black text-white font-semibold cursor-pointer px-8 py-3 rounded-full hover:scale-105 transition-all w-full sm:w-auto"
            >
              {content.cta.scheduleConsultation.value}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;