'use client';

import ServiceCard from "./ServiceCard";
import { useIntlayer } from "next-intlayer";

interface ServiceData {
    title: string;
    description: string;
    tags: string[];
}

const serviceIcons = [
    (
        <svg key="s1" width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_196_5709)">
                <path d="M124.688 0C94.4847 0 70 24.4847 70 54.6875V0H0V15.3125C0 45.5153 24.4847 70 54.6875 70H0V140H15.3125C45.5153 140 70 115.515 70 85.3125V140H140V124.688C140 94.4847 115.515 70 85.3125 70H140V0H124.688Z" fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_196_5709">
                    <rect width="140" height="140" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
    (
        <svg key="s2" width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_196_5748)">
                <path d="M70 15.3125C70 45.5153 45.5153 70 15.3125 70H70V15.3125ZM140 85.3125C140 115.515 115.515 140 85.3125 140H70V85.3125C70 115.515 45.5153 140 15.3125 140H0V0H140V15.3125C140 45.5153 115.515 70 85.3125 70H140V85.3125Z" fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_196_5748">
                    <rect width="140" height="140" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
    (
        <svg key="s3" width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_196_5855)">
                <path d="M87.5 48.125L106.094 18.5938L118.125 0H140V21.875L121.133 51.1328L109.375 70H140V140H52.5V91.875L35.1345 120.312L21.875 140H0V118.125L18.5938 88.5938L30.625 70H0V0H87.5V48.125Z" fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_196_5855">
                    <rect width="140" height="140" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
    (
        <svg key="s4" width="140" height="140" viewBox="0 0 140 140" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_196_5882)">
                <path d="M70 105V140H35.2734L17.5 121.953L0 105V70H35L70 105ZM140 105V140H105.273L87.5 121.953L70 105V70H105L140 105ZM70 35V70H35.2734L17.5 51.9531L0 35V0H35L70 35ZM140 35V70H105.273L87.5 51.9531L70 35V0H105L140 35Z" fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_196_5882">
                    <rect width="140" height="140" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
    (
        <svg key="s5" width="140" height="140" viewBox="0 0 140 140" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_196_5806)">
                <path d="M140 35V70H105.273L87.5 51.9531L70 35L52.5 51.9531L34.7266 70H35L70 105V140H35.2734L17.5 121.953L0 105V35L35 0H105L140 35ZM140 105V140H105.273L87.5 121.953L70 105V70H105L140 105Z" fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_196_5806">
                    <rect width="140" height="140" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
    (
        <svg key="s6" width="140" height="140" viewBox="0 0 140 140" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_196_5777)">
                <path d="M70 105C50.6702 105 35 120.67 35 140H0C0 101.34 31.3403 70 70 70V105ZM140 70C140 108.66 108.66 140 70 140V105C89.3298 105 105 89.3298 105 70H140ZM70 35C50.6702 35 35 50.6702 35 70H0C0 31.3403 31.3403 0 70 0V35ZM140 0C140 38.6597 108.66 70 70 70V35C89.3298 35 105 19.3298 105 0H140Z" fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_196_5777">
                    <rect width="140" height="140" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
    (
        <svg key="s7" width="140" height="140" viewBox="0 0 140 140" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_196_5834)">
                <path d="M70 35L87.5 18.0469L105.273 0H140V35L105 70H104.727L122.5 88.0469L140 105V140H105L70 105L52.5 121.953L34.7266 140H0V105L35 70H35.2734L17.5 51.9531L0 35V0H35L70 35Z" fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_196_5834">
                    <rect width="140" height="140" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
];

const managedServiceIcons = [
    (
        <svg key="m1" width="140" height="140" viewBox="0 0 140 140" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_196_6031)">
                <path d="M70 105L0 140V105L70 70V105ZM140 105L70 140V105L140 70V105ZM70 35V70L0 35V0L70 35ZM140 35V70L70 35V0L140 35Z" fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_196_6031">
                    <rect width="140" height="140" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
    (
        <svg key="m2" width="140" height="140" viewBox="0 0 140 140" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_196_6007)">
                <path d="M78.75 140H15.0927L78.75 76.3427V140ZM140 113.477L109.375 140V30.625H0L26.25 0H140V113.477ZM0 111.782V61.25H50.5323L0 111.782Z" fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_196_6007">
                    <rect width="140" height="140" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
    (
        <svg key="m3" width="140" height="140" viewBox="0 0 140 140" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_196_5981)">
                <path d="M50.3125 39.375C78.0992 39.375 100.625 61.9008 100.625 89.6875C100.625 117.474 78.0992 140 50.3125 140C22.5258 140 0 117.474 0 89.6875C0 61.9008 22.5258 39.375 50.3125 39.375ZM140 0V140H100.625V39.375H0V0H140Z" fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_196_5981">
                    <rect width="140" height="140" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
    (
        <svg key="m4" width="140" height="140" viewBox="0 0 140 140" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_196_5955)">
                <path d="M35 70H35.2734L17.5 51.9531L0 35V0H35L70 35V105L52.5 121.953L34.7266 140H0V105L35 70ZM140 35V105L122.5 121.953L104.727 140H70V105L105 70H105.273L87.5 51.9531L70 35V0H105L140 35Z" fill="currentColor" />
            </g>
            <defs>
                <clipPath id="clip0_196_5955">
                    <rect width="140" height="140" fill="white" />
                </clipPath>
            </defs>
        </svg>
    ),
];

const Listings = () => {
    const content = useIntlayer("financeTransformationListings");

    return (
        <div className="bg-[#FFFBED] mt-12 md:mt-30 pb-12 md:pb-24">
            <div
                className="flex items-center justify-center px-4 text-center"
            >
                <p className="text-[#ab8d2b] text-3xl md:text-5xl font-semibold md:mt-15 mb-8 md:mb-12">{content.sectionTitle}</p>
            </div>

            {content.services.map((service: ServiceData, index: number) => (
                <ServiceCard
                    key={`service-${index}`}
                    title={service.title}
                    description={service.description}
                    tags={service.tags}
                    svgIcon={serviceIcons[index]}
                />
            ))}

            <div
                id="managed-services"
                className="flex items-center justify-center px-4 text-center mt-12 md:mt-24"
            >
                <p className="text-[#ab8d2b] text-3xl md:text-5xl font-semibold mb-8 md:mb-12">{content.managedServiceTitle}</p>
            </div>

            {content.managedServices.map((service: ServiceData, index: number) => (
                <ServiceCard
                    key={`managed-${index}`}
                    title={service.title}
                    description={service.description}
                    tags={service.tags}
                    svgIcon={managedServiceIcons[index]}
                />
            ))}
        </div >
    )
}

export default Listings;    