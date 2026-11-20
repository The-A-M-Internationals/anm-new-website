'use client'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useIntlayer, useLocale } from 'next-intlayer';
import type { CmsDoc } from '@/lib/cms/shared';
import { useCmsDocs } from '@/lib/cms/useCmsDocs';
import { byOrder } from '@/lib/cms/siteContent';

import StoryCard, { type Story } from './StoryCard';
import StoriesCta from './StoriesCta';
import TeamExperience from './TeamExperience';
import { storiesFromDocs } from './ourWorkStories';

const TAB_KEYS = ['all', 'epm'];

/** docs: Our Work projects from the admin portal; without them the built-in ESG card shows */
const SuccessStories: React.FC<{ docs?: CmsDoc[] }> = ({ docs: initialDocs }) => {
  const searchParams = useSearchParams();
  const content = useIntlayer("success-stories");
  const { locale } = useLocale();
  const { docs } = useCmsDocs('ourWork', initialDocs);
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
  ];

  const s = content.caseStudies.study1;
  const l = content.labels;
  const labels = { client: l.client.value, challenge: l.challenge.value, whatWeDid: l.whatWeDid.value, outcome: l.outcome.value };

  const builtIn: Story = {
    id: '1',
    categoryKey: 'epm',
    industry: s.industry.value,
    companyName: s.companyName.value,
    metric1: s.metric1.value,
    metric1Label: s.metric1Label.value,
    metric2: s.metric2.value,
    metric2Label: s.metric2Label.value,
    image: '/sst1.jpg',
    rows: [
      { label: labels.client, text: s.client.value },
      { label: labels.challenge, text: s.challenge.value },
      { label: labels.whatWeDid, text: s.whatWeDid.value },
      { label: labels.outcome, text: s.outcome.value, highlight: true },
    ],
  };

  const caseStudies: Story[] = docs.length ? storiesFromDocs(byOrder(docs), locale, labels) : [builtIn];

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
            <StoryCard key={study.id} study={study} readStoryLabel={l.readStory.value} />
          ))}
        </div>

        <TeamExperience />

        <StoriesCta />
      </div>
    </div>
  );
};

export default SuccessStories;
