"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useIntlayer, useLocale } from "next-intlayer";
import { handleHashLink } from "@/lib/handleHashLink";

/** "Join our team" band under the FAQ, linking to the open positions. */
export default function JoinTeam() {
  const router = useRouter();
  const { locale } = useLocale();
  const content = useIntlayer("faq");
  const href = `/${locale}/careers#open-positions`;

  return (
    <div className="flex flex-col gap-5 items-center py-12 md:py-20 bg-[#0D1B3E] relative px-4">
      <h2 className="text-3xl md:text-5xl text-white font-bold text-center">{content.joinTitle.value}</h2>
      <p className="text-white text-base md:text-lg text-center w-full md:w-[60%]">{content.joinDescription.value}</p>
      <button
        onClick={(e) => { if (!handleHashLink(e, href, router)) router.push(href); }}
        className="bg-[#C9A84C] w-[300px] flex items-center justify-center gap-2 text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition cursor-pointer"
      >
        {content.joinButton.value}
        <ArrowRight className="w-5 h-5 rtl:rotate-180" />
      </button>
      <div className="absolute right-0 bottom-0">
        <Image src="/right.svg" alt="side image" width={150} height={150} />
      </div>
    </div>
  );
}
