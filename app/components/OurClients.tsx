"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { AppLocale } from "@/types/locale";
import { handleHashLink } from "@/lib/handleHashLink";

const HIGHLIGHTS_EN = [
  "Oracle EPM Multi-Entity Financial Consolidation",
  "Automated Intercompany Transaction Reconciliation",
  "Unified Rollups Across 2,000+ Retail & Wholesale Footprints",
];

const HIGHLIGHTS_AR = [
  "توحيد القوائم المالية متعددة الكيانات عبر أوراكل EPM",
  "أتمتة تسوية المعاملات المالية المتبادلة بين الشركات التابعة",
  "توحيد التقارير المالية لأكثر من 2000 مركز بيع وتوزيع",
];

export default function OurClients() {
  const { locale } = useLocale();
  const router = useRouter();
  const isArabic = locale === "ar";
  const contactLink = getLocalizedPath(locale as AppLocale, "/contact#form");
  const highlights = isArabic ? HIGHLIGHTS_AR : HIGHLIGHTS_EN;

  return (
    <section id="clients" className="w-full bg-[#F4F6F9] py-14 md:py-20 px-4">
      <div className="w-[90%] max-w-6xl mx-auto">
        {/* Section Header matching site typography */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#92660A] mb-2 font-mono">
            {isArabic ? "شركاء النجاح المؤسسي" : "Enterprise Alliances"}
          </p>
          <h3 className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-semibold leading-tight">
            {isArabic ? (
              <>
                شراكات استراتيجية تبني <span className="text-[#C9A84C]">الكفاءة المالية</span>
              </>
            ) : (
              <>
                Trusted by Industry Leaders in <span className="text-[#C9A84C]">Financial Performance</span>
              </>
            )}
          </h3>
          <p className="text-[#6B7280] text-sm md:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            {isArabic
              ? "نقدّم استشارات متخصصة في حلول أوراكل EPM للمؤسسات الرائدة لتحقيق أعلى معايير الحوكمة وإغلاق الحسابات بدقة."
              : "Delivering specialized Oracle EPM architectures to help enterprise leaders unify reporting, reduce close cycles, and enforce financial governance."}
          </p>
        </div>

        {/* Featured Client Card: TBC Corporation */}
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs p-6 sm:p-8 md:p-10 transition-all duration-150 ease-in-out hover:shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Identity & Logo Container (Strict bounding box, anti-squish) */}
            <div className="lg:w-5/12 flex flex-col items-start">
              <div className="h-16 w-48 relative flex items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden mb-5 shrink-0">
                <Image
                  src="/tbc-logo.png"
                  alt="TBC Corporation Logo"
                  width={170}
                  height={54}
                  className="w-auto h-12 object-contain"
                  priority
                />
              </div>

              <span className="text-[11px] font-mono font-semibold uppercase px-2.5 py-1 rounded-md bg-[#FFFBED] border border-[#EDE0A8] text-[#92660A]">
                {isArabic ? "شراكة استراتيجية" : "Enterprise Client Spotlight"}
              </span>

              <h4 className="text-xl sm:text-2xl font-bold text-slate-900 mt-3 font-serif">
                TBC Corporation
              </h4>

              <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                {isArabic
                  ? "إحدى كبرى سلاسل تسويق وتوزيع الإطارات والخدمات في أمريكا الشمالية (مالكة Midas وBig O Tires وTire Kingdom)."
                  : "North American leader in automotive tire marketing and retail distribution, operating Midas, Big O Tires, and Tire Kingdom."}
              </p>
            </div>

            {/* Scope of Engagement & Verified Deliverables */}
            <div className="lg:w-7/12 flex flex-col justify-between border-t lg:border-t-0 lg:border-s border-slate-100 pt-6 lg:pt-0 lg:ps-8">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                {isArabic
                  ? "تعاونت شركة TBC Corporation مع The A&M Internationals لتحديث وتوحيد منظومة التقارير المالية وإدارة الأداء عبر أوراكل EPM، وربط العمليات الحسابية بين الشركات التابعة بدقة عالية."
                  : "The A&M Internationals partnered with TBC Corporation to architect and deploy Oracle EPM solutions, unifying complex financial close, planning, and multi-entity governance across its nationwide retail and wholesale operations."}
              </p>

              <div className="space-y-2.5 mb-6">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#C9A84C] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 uppercase">
                  {isArabic ? "حالة المشروع: نشط في بيئة العمل" : "Scope: Oracle EPM Implementation"}
                </span>
                <Link
                  href={contactLink}
                  onClick={(e) => handleHashLink(e, contactLink, router)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#92660A] hover:text-[#C9A84C] cursor-pointer transition-all duration-150 ease-in-out"
                >
                  <span>{isArabic ? "استشر خبرائنا" : "Discuss Your Architecture"}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
