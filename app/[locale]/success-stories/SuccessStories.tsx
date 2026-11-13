'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';

import StoryCard, { type Story } from './StoryCard';
import StoriesCta from './StoriesCta';

const TAB_KEYS = ['all', 'epm', 'digital'];

const SuccessStories: React.FC = () => {
  const searchParams = useSearchParams();
  const content = useIntlayer("success-stories");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const searchTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(searchTab && TAB_KEYS.includes(searchTab) ? searchTab : 'all');

  // Follow ?tab= when it changes (set during render, not in an effect)
  const [seenTab, setSeenTab] = useState(searchTab);
  if (seenTab !== searchTab) {
    setSeenTab(searchTab);
    if (searchTab && TAB_KEYS.includes(searchTab)) setActiveTab(searchTab);
  }

  // Manually handle hash scroll to ensure it bypasses the hero image
  useEffect(() => {
    if (window.location.hash === '#story-content' || searchTab) {
      setTimeout(() => {
        if (containerRef.current) {
          const y = containerRef.current.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 500); // Timeout ensures layout is stable
    }
  }, [searchTab]);

  const tabs = [
    { key: 'all', label: content.tabs.all.value },
    { key: 'epm', label: content.tabs.epm.value },
    { key: 'digital', label: content.tabs.digital.value },
  ];

  const s = content.caseStudies;
  const l = content.labels;

  const caseStudies: Story[] = [
    {
      id: '1',
      categoryKey: 'epm',
      industry: s.study1.industry.value,
      companyName: s.study1.companyName.value,
      metric1: s.study1.metric1.value,
      metric1Label: s.study1.metric1Label.value,
      metric2: s.study1.metric2.value,
      metric2Label: s.study1.metric2Label.value,
      image: '/sst1.jpg',
      rows: [
        { label: l.client.value, text: s.study1.client.value },
        { label: l.challenge.value, text: s.study1.challenge.value },
        { label: l.whatWeDid.value, text: s.study1.whatWeDid.value },
        { label: l.outcome.value, text: s.study1.outcome.value, highlight: true },
      ],
    },
    {
      id: '2',
      categoryKey: 'digital',
      industry: s.study2.industry.value,
      companyName: s.study2.companyName.value,
      metric1: s.study2.metric1.value,
      metric1Label: s.study2.metric1Label.value,
      metric2: s.study2.metric2.value,
      metric2Label: s.study2.metric2Label.value,
      image: '/sst2.jpg',
      rows: [
        { label: l.client.value, text: s.study2.client.value },
        { label: l.whatWeDid.value, text: s.study2.whatWeDid.value, highlight: true },
      ],
    },
  ];

  const filteredStudies = activeTab === 'all'
    ? caseStudies
    : caseStudies.filter(study => study.categoryKey === activeTab);

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
            <StoryCard key={study.id} study={study} />
          ))}
        </div>

        <StoriesCta />
      </div>
    </div>
  );
};

export default SuccessStories;
