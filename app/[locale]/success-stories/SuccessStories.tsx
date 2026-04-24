'use client'
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';

const SuccessStories: React.FC = () => {
  const router = useRouter();
  const content = useIntlayer("success-stories");
  const { locale } = useLocale();
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
      challenge: s.study1.challenge.value,
      solution: s.study1.solution.value,
      results: [s.study1.results.r1.value, s.study1.results.r2.value, s.study1.results.r3.value, s.study1.results.r4.value],
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
      challenge: s.study2.challenge.value,
      solution: s.study2.solution.value,
      results: [s.study2.results.r1.value, s.study2.results.r2.value, s.study2.results.r3.value, s.study2.results.r4.value],
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
      challenge: s.study3.challenge.value,
      solution: s.study3.solution.value,
      results: [s.study3.results.r1.value, s.study3.results.r2.value, s.study3.results.r3.value, s.study3.results.r4.value],
    },
  ];

  const [activeTab, setActiveTab] = useState('all');
  const [poppedId, setPoppedId] = useState<string | null>(null);

  const filteredStudies = activeTab === 'all'
    ? caseStudies
    : caseStudies.filter(study => study.industryKey === activeTab);

  const handlePop = (id: string) => {
    setPoppedId(id);
    setTimeout(() => setPoppedId(null), 2000);
  };

  return (
    <div className="min-h-screen py-0 px-0">
      <div className="w-full lg:w-[1400px] mx-auto">
        {/* Tabs */}
        <div className="flex border border-[#F6F6F6] w-[95%] md:w-fit mx-auto rounded-3xl md:rounded-full shadow-sm p-2 flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-2 cursor-pointer rounded-full font-medium transition-all duration-200 ${activeTab === tab.key
                ? 'bg-[#D4AF37] text-white shadow-md'
                : 'bg-[#F6F6F6] text-gray-700 hover:bg-gray-100'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Case Studies */}
        <div className="space-y-8 w-[95%] mx-auto">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-[95%] md:w-full mx-auto border border-gray-200 shadow-md rounded-[40px] p-4"
            >
              {/* Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[520px] md:min-h-[570px]">
                <img
                  src={study.image}
                  alt={study.companyName}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute border-t border-white/32 w-full bottom-0 bg-transparent backdrop-blur-[8px] flex flex-col gap-1 p-4">
                  <h3 className="text-xs w-fit rounded-full px-3 py-2 bg-[#FFFBED] font-semibold text-[#D4AF37]">
                    {study.industry}
                  </h3>
                  <h3 className="text-white text-xl md:text-2xl font-semibold">{study.companyName}</h3>
                  <div className="flex gap-4 justify-around">
                    <div className="flex flex-col items-center">
                      <h4 className="text-2xl md:text-[28px] font-semibold text-[#D4AF37]">{study.metric1}</h4>
                      <p className="text-xs md:text-sm text-white">{study.metric1Value}</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <h4 className="text-2xl md:text-[28px] font-semibold text-[#D4AF37]">{study.metric2}</h4>
                      <p className="text-xs md:text-sm font-medium text-white">{study.metric2Value}</p>
                    </div>
                  </div>
                  <button
                    className="w-full flex justify-center items-center gap-2 bg-[#D4AF37] text-black font-semibold py-3 px-6 rounded-full hover:scale-105 transition cursor-pointer"
                    onClick={() => handlePop(study.id)}
                  >
                    {content.readFullStory.value}
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </div>

              {/* Content Card */}
              <div className="bg-gradient-to-r col-span-1 lg:col-span-2 from-white to-[#FFFBED] border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col transition-transform duration-300">
                <div className={`space-y-6 flex-1 ${poppedId === study.id ? 'animate-pop' : ''}`}>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">{content.theChallenge.value}</h3>
                    <p className="text-gray-600 leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">{content.theSolution.value}</h3>
                    <p className="text-gray-600 leading-relaxed">{study.solution}</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">{content.theResults.value}</h3>
                    <div className="space-y-3">
                      {study.results.map((result, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <img src="/tickicon.svg" className="w-5 h-5 flex-shrink-0" alt="check" />
                          <p className="leading-relaxed">{result}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className='mt-20 flex flex-col gap-5 items-center py-10 md:py-20 bg-[#0F1E4D] relative px-4 text-center'>
        <h2 className='text-3xl md:text-5xl text-white'>
          {content.cta.title.value}
        </h2>
        <p className='text-white text-base md:text-lg text-center w-full md:w-[50%]'>
          {content.cta.description.value}
        </p>
        <div className='flex flex-col sm:flex-row items-center gap-4'>
          <button
            onClick={() => router.push(`/${locale}/features#epm-suites`)}
            className='bg-[#D4AF37] flex items-center gap-2 text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition cursor-pointer w-full sm:w-auto justify-center'>
            {content.cta.seeEpm.value}
            <ArrowRight className='w-5 h-5 rtl:rotate-180' />
          </button>
          <button
            onClick={() => router.push(`/${locale}/contact#form`)}
            className='bg-white border border-[#D4AF37] flex items-center gap-2 text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition cursor-pointer w-full sm:w-auto justify-center'>
            {content.cta.scheduleConsultation.value}
            <ArrowRight className='w-5 h-5 rtl:rotate-180' />
          </button>
        </div>
        <div className='absolute right-0 bottom-0 hidden md:block'>
          <Image src='/right.svg' alt='side image' width={150} height={150} />
        </div>
      </div>
    </div>
  );
};

const style = `
@keyframes pop {
  0% { transform: scale(1); }
  10% { transform: scale(1.01); }
  20% { transform: scale(1.02); }
  30% { transform: scale(1.03); }
  40% { transform: scale(1.02); }
  50% { transform: scale(1.01); }
  60% { transform: scale(1.005); }
  100% { transform: scale(1); }
}
.animate-pop {
  animation: pop 2s cubic-bezier(0.23, 1, 0.32, 1);
}
`;

const StyleTag = () => <style>{style}</style>;

const ExportedSuccessStories = () => (
  <>
    <StyleTag />
    <SuccessStories />
  </>
);

export default ExportedSuccessStories;