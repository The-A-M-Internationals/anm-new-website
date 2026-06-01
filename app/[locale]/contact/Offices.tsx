"use client";

import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useIntlayer } from "next-intlayer";

export default function OurOffices() {
  const content = useIntlayer("offices");

  const offices = [
    {
      location: content.dubaiLocation.value,
      phone: '+91 73061 09679',
      email: 'am@theaminternationals.com',
      address: content.dubaiAddress.value,
      link: 'https://maps.app.goo.gl/PSJeoPD7X4DXwESL6'
    }
  ];

  return (
    <div className="bg-linear-to-b from-[#FFFFFF] to-[#FFFBED] py-12 md:py-20 lg:py-24 px-4 lg:px-14">
      <div className="mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-3">
            {content.titlePrefix.value} <span className="text-[#D4AF37]">{content.titleHighlight.value}</span>
          </h1>
          <p className="text-gray-600 text-xl">
            {content.subtitle.value}
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Image FIRST on mobile, SECOND on desktop */}
          <div className="h-full order-1 lg:order-2">
            <div className="rounded-3xl overflow-hidden w-full h-full shadow-2xl min-h-[300px] relative">
              <Image
                src="/offices.jpg"
                fill
                alt="map image"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Cards SECOND on mobile, FIRST on desktop */}
          <div className="space-y-6 order-2 lg:order-1">
            {offices.map((office, index) => (
              <div
                key={index}
                className="bg-white rounded-[40px] border border-gray-200 shadow-md p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-semibold mb-6">
                  {office.location}
                </h3>

                <div className="space-y-4 mb-6">

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#D4AF37]" />
                    <span>{office.phone}</span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#D4AF37]" />
                    <span>{office.email}</span>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#D4AF37] mt-1 shrink-0" />
                    <span>{office.address}</span>
                  </div>
                </div>

                {/* Get Direction Button */}
                <a href={office.link} target="_blank" rel="noopener noreferrer">
                  <button className="w-full py-3 px-6 border-2 border-[#D4AF37] text-[#D4AF37] rounded-full font-medium hover:scale-105 transition-all cursor-pointer">
                    {content.getDirection.value}
                  </button>
                </a>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}