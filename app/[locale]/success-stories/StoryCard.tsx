import React from 'react';

export type StoryRow = { label: string; text: string; highlight?: boolean };

export type Story = {
  id: string;
  categoryKey: string;
  industry: string;
  companyName: string;
  metric1: string;
  metric1Label: string;
  metric2: string;
  metric2Label: string;
  image: string;
  rows: StoryRow[];
};

const StoryCard: React.FC<{ study: Story }> = ({ study }) => (
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
        <h3 className="text-xs w-fit rounded-full px-3 py-2 bg-[#FFFBED] font-semibold text-[#C9A84C]">
          {study.industry}
        </h3>
        <h3 className="text-white text-xl md:text-2xl font-semibold">{study.companyName}</h3>
        <div className="flex gap-4 justify-around">
          <div className="flex flex-1 min-w-0 flex-col items-center text-center">
            <h4 className="text-xl md:text-[28px] lg:text-xl xl:text-2xl leading-tight font-semibold text-[#C9A84C]">{study.metric1}</h4>
            <p className="text-xs md:text-sm text-white">{study.metric1Label}</p>
          </div>
          <div className="w-[1px] h-full bg-[#FFFFFF26]" />
          <div className="flex flex-1 min-w-0 flex-col items-center text-center">
            <h4 className="text-xl md:text-[28px] lg:text-xl xl:text-2xl leading-tight font-semibold text-[#C9A84C]">{study.metric2}</h4>
            <p className="text-xs md:text-sm text-white">{study.metric2Label}</p>
          </div>
        </div>
      </div>
    </div>

    {/* Content Card */}
    <div className="lg:col-span-2 relative p-2 md:p-4 flex flex-col justify-center">
      <div className="space-y-6">
        {study.rows.map((row) => (
          <div key={row.label} className={row.highlight ? 'bg-[#FFFBED] p-6 rounded-2xl' : undefined}>
            <p className="text-gray-600 text-sm md:text-[18px] leading-relaxed">
              <span className="font-semibold text-gray-900">{row.label}: </span>
              {row.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default StoryCard;
