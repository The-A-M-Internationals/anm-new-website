"use client";

import { useRef } from "react";
import { MapPin, Navigation, RotateCcw } from "lucide-react";
import { useIntlayer } from "next-intlayer";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEarthFlyIn } from "./useEarthFlyIn";

/**
 * Contact page map: a real satellite Earth seen from space that flies down to the office in Ajman,
 * then stays as a map visitors can drag and zoom, with the address and a link to Google Maps.
 */
export default function OfficeLocationMap({ mapLink, address }: { mapLink: string; address: string }) {
  const content = useIntlayer("offices");
  const box = useRef<HTMLDivElement>(null);
  const { done, replay } = useEarthFlyIn(box);

  return (
    <div className="relative h-full min-h-[460px] overflow-hidden rounded-3xl border border-slate-200/80 bg-[radial-gradient(120%_90%_at_50%_20%,#13286b_0%,#0a1846_45%,#050e30_100%)] shadow-xl">
      {/* The map library draws into this box (always left-to-right) */}
      <div className="absolute inset-0">
        <div ref={box} dir="ltr" className="h-full w-full [&_.maplibregl-cooperative-gesture-screen]:hidden!" />
      </div>

      <button
        type="button"
        onClick={replay}
        aria-label="Replay"
        title="Replay"
        className={`absolute end-3 top-3 grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-slate-200/80 bg-white/95 text-[#0b1e4f] shadow-md transition-all duration-150 ease-in-out hover:bg-[#0b1e4f] hover:text-[#D4AF37] ${done ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <RotateCcw className="h-4 w-4" aria-hidden />
      </button>

      {/* Address bar, shown once the camera has landed */}
      <div className={`pointer-events-none absolute inset-x-3 bottom-9 transition-[opacity,transform] duration-700 ease-out sm:inset-x-4 ${done ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
        <div className={`flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/95 p-3 shadow-lg backdrop-blur-sm sm:flex-nowrap sm:p-4 ${done ? "pointer-events-auto" : ""}`}>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0b1e4f] text-[#D4AF37]">
            <MapPin className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0 flex-1 text-start">
            <p className="text-sm font-semibold text-[#0b1e4f]">{content.cityUae.value}</p>
            <p className="text-xs leading-snug text-slate-600">{address}</p>
          </div>
          <a
            href={mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0b1e4f] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-150 ease-in-out hover:bg-[#C9A13B] hover:text-[#0b1e4f] sm:w-auto"
          >
            <Navigation className="h-4 w-4" aria-hidden />
            {content.openMaps.value}
          </a>
        </div>
      </div>
    </div>
  );
}
