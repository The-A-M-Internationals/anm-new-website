"use client";

import Link from "next/link";
import { useIntlayer, useLocale } from "next-intlayer";
import "./notFound.content"; // registers dictionary
import "./notFound.css";

/** Site 404 page: three huge soft-focus numerals drifting behind a crisp message and two ways back. */
export default function NotFoundBlur() {
  const content = useIntlayer("notFound");
  const { locale } = useLocale();

  return (
    <section className="nf" aria-labelledby="nf-title">
      {/* Numerals are decoration and stay left-to-right in Arabic too */}
      <div className="nf-numerals" dir="ltr" aria-hidden="true">
        <span>4</span>
        <span className="nf-gold">0</span>
        <span>4</span>
      </div>

      <div className="nf-content">
        <p className="nf-code" dir="ltr">404</p>
        <h1 id="nf-title" className="text-3xl font-bold tracking-tight text-[#0b1e4f] sm:text-5xl">{content.title}</h1>
        <p className="mx-auto mt-4 max-w-[52ch] text-base leading-relaxed text-slate-600 sm:text-lg">{content.text}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/${locale}`}
            className="cursor-pointer rounded-full bg-[#0b1e4f] px-7 py-3 text-sm font-semibold text-white transition-all duration-150 ease-in-out hover:bg-[#C9A13B] hover:text-[#0b1e4f]"
          >
            {content.home}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="cursor-pointer rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-[#0b1e4f] transition-all duration-150 ease-in-out hover:border-[#C9A13B]"
          >
            {content.contact}
          </Link>
        </div>
      </div>
    </section>
  );
}
