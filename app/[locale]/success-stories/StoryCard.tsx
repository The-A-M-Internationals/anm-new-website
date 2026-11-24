import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export type StoryRow = { label?: string; text: string; highlight?: boolean };

export type Story = {
  id: string;
  categoryKey: string;
  industry: string;
  badge?: string;
  companyName: string;
  metric1?: string;
  metric1Label?: string;
  metric2?: string;
  metric2Label?: string;
  image: string;
  storyLink?: string;
  rows: StoryRow[];
};

const Metric = ({ value, label }: { value: string; label?: string }) => (
  <div className="flex flex-1 min-w-0 flex-col items-center text-center">
    <h4 className="text-xl md:text-[28px] lg:text-xl xl:text-2xl leading-tight font-semibold text-[#C9A84C]">{value}</h4>
    <p className="text-xs md:text-sm text-white">{label}</p>
  </div>
);

const StoryCard: React.FC<{ study: Story; readStoryLabel?: string }> = ({ study, readStoryLabel }) => (
  <div
    id={study.id}
    className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full border border-gray-200 shadow-md rounded-[40px] p-4 md:p-6"
  >
    {/* Image Card */}
    <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[520px] md:min-h-[570px] lg:min-h-0">
      <img
        src={study.image}
        alt={study.companyName}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute border-t border-white/32 w-full bottom-0 bg-black/30 backdrop-blur-[8px] flex flex-col gap-1 p-4">
        <div className="flex flex-wrap gap-2">
          {study.industry && (
            <span className="text-xs w-fit rounded-full px-3 py-2 bg-[#FFFBED] font-semibold text-[#C9A84C]">{study.industry}</span>
          )}
          {study.badge && (
            <span className="text-xs w-fit rounded-full px-3 py-2 bg-white/90 font-semibold text-gray-800">{study.badge}</span>
          )}
        </div>
        <h3 className="text-white text-xl md:text-2xl font-semibold">{study.companyName}</h3>
        {study.metric1 && study.metric2 && (
          <div className="flex gap-4 justify-around">
            <Metric value={study.metric1} label={study.metric1Label} />
            <div className="w-[1px] h-full bg-[#FFFFFF26]" />
            <Metric value={study.metric2} label={study.metric2Label} />
          </div>
        )}
      </div>
    </div>

    {/* Content Card */}
    <div className="lg:col-span-2 relative p-2 md:p-4 flex flex-col justify-center">
      <div className="space-y-6">
        {study.rows.map((row, i) => (
          <div key={row.label ?? i} className={row.highlight ? 'bg-[#FFFBED] p-6 rounded-2xl' : undefined}>
            <p className="text-gray-600 text-sm md:text-[18px] leading-relaxed">
              {row.label && <span className="font-semibold text-gray-900">{row.label}: </span>}
              {row.text}
            </p>
          </div>
        ))}
      </div>
      {study.storyLink && readStoryLabel && (
        <Link
          href={study.storyLink}
          className="mt-8 inline-flex w-fit items-center gap-2 bg-black text-white font-semibold cursor-pointer px-8 py-3 rounded-full hover:scale-105 transition-all duration-150 ease-in-out"
        >
          {readStoryLabel}
          <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
        </Link>
      )}
    </div>
  </div>
);

export default StoryCard;
