"use client";

import React from "react";
import { useIntlayer, useLocale } from "next-intlayer";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { AppLocale } from "@/types/locale";
import OracleEpmCard3D from "./services/OracleEpmCard3D";
import AiAutomationCard3D from "./services/AiAutomationCard3D";

export default function Services() {
  const { locale } = useLocale();
  const content = useIntlayer("services_content");

  const epmHref = getLocalizedPath(locale as AppLocale, "/finance-transformation");
  const aiHref = getLocalizedPath(locale as AppLocale, "/ai-automations");

  return (
    <section id="services" className="px-4 py-16 md:py-24 bg-[#F4F6F9]">
      <div className="w-[94%] max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {content?.heading?.value?.toString()}{" "}
            <span className="text-[#D4AF37]">{content?.headingHighlight?.value?.toString()}</span>{" "}
            {content?.headingEnd?.value?.toString()}
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            {content?.subheading?.value?.toString()}
          </p>
        </div>

        {/* 2-Column 3D WebGL2 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
          <OracleEpmCard3D
            href={epmHref}
            eyebrow={content?.financeCategory?.value?.toString()}
            title={content?.financeTitle?.value?.toString()}
            desc={content?.financeDescription?.value?.toString()}
            list={[
              content?.financeCapability1?.value?.toString() || "Planning & Budgeting",
              content?.financeCapability2?.value?.toString() || "Financial Consolidation",
              content?.financeCapability3?.value?.toString() || "Account Reconciliation",
              content?.financeCapability4?.value?.toString() || "Managed Services",
            ]}
            stats={[
              {
                num: content?.financeMetric1Value?.value?.toString() || "40%",
                label: content?.financeMetric1Label?.value?.toString() || "faster close",
              },
              {
                num: content?.financeMetric2Value?.value?.toString() || "150+",
                label: content?.financeMetric2Label?.value?.toString() || "implementations",
              },
            ]}
            tags={[
              content?.financeTag1?.value?.toString() || "Oracle EPM",
              content?.financeTag2?.value?.toString() || "EPM Cloud",
            ]}
            explore={content?.explore?.value?.toString()}
          />

          <AiAutomationCard3D
            href={aiHref}
            eyebrow={content?.aiCategory?.value?.toString()}
            title={content?.aiTitle?.value?.toString()}
            desc={content?.aiDescription?.value?.toString()}
            list={[
              content?.aiCapability1?.value?.toString() || "Machine Learning",
              content?.aiCapability2?.value?.toString() || "Robotic Process Automation",
              content?.aiCapability3?.value?.toString() || "Natural Language Processing",
              content?.aiCapability4?.value?.toString() || "Computer Vision",
              content?.aiCapability5?.value?.toString() || "Generative AI",
            ]}
            stats={[
              {
                num: content?.aiMetric1Value?.value?.toString() || "85%",
                label: content?.aiMetric1Label?.value?.toString() || "efficiency increase",
              },
              {
                num: content?.aiMetric2Value?.value?.toString() || "10x",
                label: content?.aiMetric2Label?.value?.toString() || "faster processing",
              },
              {
                num: content?.aiMetric3Value?.value?.toString() || "24/7",
                label: content?.aiMetric3Label?.value?.toString() || "automated operations",
              },
            ]}
            tags={[
              content?.aiTag1?.value?.toString() || "ML",
              content?.aiTag2?.value?.toString() || "RPA",
              content?.aiTag3?.value?.toString() || "NLP",
              content?.aiTag4?.value?.toString() || "CV",
              content?.aiTag5?.value?.toString() || "GenAI",
            ]}
            explore={content?.explore?.value?.toString() || "Explore AI Solutions"}
          />
        </div>
      </div>
    </section>
  );
}
