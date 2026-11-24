'use client'
import React from 'react';
import { useIntlayer } from 'next-intlayer';

type Text = { value: string };
type Stat = { number: Text; label: Text; note: Text };
type Card = { title: Text; tag: Text; text: Text };

/** "Our team's experience": counter strip, four experience cards and a confidentiality note */
const TeamExperience: React.FC = () => {
  const content = useIntlayer("success-stories-team-experience");
  const stats = content.stats as unknown as Stat[];
  const cards = content.cards as unknown as Card[];

  return (
    <section className="w-full mt-16">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-[#C9A84C]">{content.title.value}</h2>
        <p className="text-gray-600 text-lg leading-relaxed">{content.intro.value}</p>
      </div>

      {/* Counter strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border border-gray-200 shadow-md rounded-[40px] p-6 md:p-8 mb-10">
        {stats.map((stat) => (
          <div key={stat.label.value} className="flex flex-col items-center text-center">
            <span className="text-3xl md:text-4xl font-semibold text-[#C9A84C]">{stat.number.value}</span>
            <span className="mt-1 font-semibold text-gray-900">{stat.label.value}</span>
            <span className="text-sm text-gray-500">{stat.note.value}</span>
          </div>
        ))}
      </div>

      {/* Experience cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div key={card.title.value} className="border border-gray-200 shadow-md rounded-3xl p-6 md:p-8 flex flex-col gap-3">
            <span className="text-xs w-fit rounded-full px-3 py-2 bg-[#FFFBED] font-semibold text-[#C9A84C]">{card.tag.value}</span>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{card.title.value}</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">{card.text.value}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-gray-500 italic text-center">{content.note.value}</p>
    </section>
  );
};

export default TeamExperience;
