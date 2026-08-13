'use client';

import { useEffect, useRef, useState } from "react";
import { useIntlayer, useLocale } from "next-intlayer";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { AppLocale } from "@/types/locale";
import "./aboutUs.content"; // registers dictionary

const AboutUs = () => {
    const content = useIntlayer("aboutUs");
    const { locale } = useLocale();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Pause the video if it's no longer intersecting the viewport
                    if (!entry.isIntersecting && !videoElement.paused) {
                        videoElement.pause();
                    }
                });
            },
            {
                // Trigger when less than 10% of the video is visible
                threshold: 0.1 
            }
        );

        observer.observe(videoElement);

        return () => {
            if (videoElement) {
                observer.unobserve(videoElement);
            }
        };
    }, []);

    return (
        <div
            id="about-us"
            className="
                relative
                flex flex-col
                items-center justify-center
                px-4 md:px-6 lg:px-8
                py-12 md:py-24
                overflow-hidden
                bg-[linear-gradient(105.23deg,#FFFFFF_0%,#FFFBED_126.38%)]
                min-h-[650px]
            "
        >
            <div className="w-full max-w-5xl flex flex-col items-center justify-center">
                {/* Heading isolated above the video */}
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-semibold leading-tight text-center mb-8 md:mb-10">
                    {content.titleBefore.value} <span className="text-[#D4AF37]">{content.titleHighlight.value}</span>
                </p>

                {/* Landscape Video Player */}
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black ring-4 ring-white/50 mb-10 group">
                    <video 
                        ref={videoRef}
                        src="/aboutus-video.mp4" 
                        poster="/hero-bg.png"
                        controls={isPlaying}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        onEnded={() => {
                            setIsPlaying(false);
                            videoRef.current?.load();
                        }}
                        className="w-full h-full object-cover"
                    >
                        Your browser does not support the video tag.
                    </video>

                    {/* Custom Centered Play Button */}
                    {!isPlaying && (
                        <div 
                            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-all duration-300 cursor-pointer group/play"
                            onClick={() => {
                                videoRef.current?.play();
                                setIsPlaying(true);
                            }}
                        >
                            <Play className="w-8 h-8 md:w-12 md:h-12 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transform group-hover/play:scale-110 transition-transform duration-300" fill="currentColor" />
                        </div>
                    )}
                </div>

                {/* Explore More Button */}
                <Link
                    href={getLocalizedPath(locale as AppLocale, "/business")}
                    className="bg-[#D4AF37] text-black px-4 py-2 sm:px-6 sm:py-3 flex items-center gap-2 rounded-full text-sm sm:text-base font-semibold hover:scale-105 transition cursor-pointer mt-2"
                >
                    {content.cta.value}
                    <ArrowRight className='w-4 h-4 rtl:rotate-180' />
                </Link>
            </div>
        </div>
    );
};

export default AboutUs;