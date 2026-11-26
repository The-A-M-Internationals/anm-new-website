"use client";

import { useLocale } from "next-intlayer";
import ShowcaseStage from "./ShowcaseStage";
import { useShowcaseServices } from "./useShowcaseServices";

/** Home services (Oracle EPM, AI Automations): copy that fills in on scroll beside one notched film box. */
export default function ServicesShowcase() {
  const { heading, services } = useShowcaseServices();
  const { locale } = useLocale();

  return (
    <section id="services" className="py-16 md:py-24 bg-[#F4F6F9]">
      <div className="w-[min(100%-2rem,1440px)] mx-auto">
        <div className="text-center mb-10 md:mb-14 px-2">
          <h2 className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {heading.heading} <span className="text-[#D4AF37]">{heading.highlight}</span> {heading.end}
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            {heading.subheading}
          </p>
        </div>

        <ShowcaseStage services={services} byWord={locale === "ar"} />
      </div>
    </section>
  );
}
