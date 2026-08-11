'use client';

import { useEffect, useRef } from "react";
import { useIntlayer } from "next-intlayer";
import "./aboutUs.content"; // registers dictionary

const AboutUs = () => {
    const content = useIntlayer("aboutUs");
    const videoRef = useRef<HTMLVideoElement>(null);

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
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black ring-4 ring-white/50">
                    <video 
                        ref={videoRef}
                        src="/aboutus-video.mp4" 
                        controls
                        className="w-full h-full object-cover"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;