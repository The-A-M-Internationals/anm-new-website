'use client';

import React, { useState } from 'react';
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Mail, MapPin, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer, useLocale } from "next-intlayer";
import { useEffect } from 'react';

const ContactForm: React.FC = () => {
  const content = useIntlayer("contactFormDetails");
  const { locale } = useLocale();
  const router = useRouter();

  useEffect(() => {
    // Check if there is a hash in the URL on mount and manually scroll if Next.js missed it
    if (typeof window !== 'undefined' && window.location.hash === '#form') {
      setTimeout(() => {
        const element = document.getElementById('form');
        if (element) {
          const yOffset = -100; // Account for fixed navbar
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 500); // 500ms delay ensures page is fully rendered
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    countryCode: '+971',
    phone: '',
    service: '',
    vision: '',
    howHeard: ''
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);
    const nameRegex = /^[A-Za-z \u0600-\u06FF]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]{5,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if all required fields are filled
    if (!formData.name.trim() || !formData.email.trim() || !formData.service.trim() || !formData.vision.trim()) {
      setFormError('Please fill all required fields.');
      setTimeout(() => setFormError(null), 3000);
      return;
    }

    // Validate full name (letters and spaces)
    if (!nameRegex.test(formData.name.trim())) {
      setFormError('Name should only contain letters.');
      setTimeout(() => setFormError(null), 3000);
      return;
    }

    // Validate name length (at least 3 characters)
    if (formData.name.trim().length < 3) {
      setFormError('Name should be at least 3 characters long.');
      setTimeout(() => setFormError(null), 3000);
      return;
    }

    // Validate email format
    if (!emailRegex.test(formData.email.trim())) {
      setFormError('Please enter a valid email address.');
      setTimeout(() => setFormError(null), 3000);
      return;
    }

    // Validate phone number (optional)
    if (formData.phone.trim()) {
      const phoneDigitsOnly = formData.phone.replace(/\D/g, '');
      if (phoneDigitsOnly.length < 5 || phoneDigitsOnly.length > 15) {
        setFormError('Phone number should be valid.');
        setTimeout(() => setFormError(null), 3000);
        return;
      }
    }
    setSubmitting(true);
    try {
      const fullPhone = formData.phone.trim() ? `${formData.countryCode} ${formData.phone}` : '';
      await addDoc(collection(db, 'customers'), {
        ...formData,
        phone: fullPhone,
        submittedAt: new Date().toISOString()
      });
      setSuccessMsg(content.success.value);
      setTimeout(() => setSuccessMsg(null), 3000);
      setFormData({
        name: '',
        company: '',
        email: '',
        countryCode: '+971',
        phone: '',
        service: '',
        vision: '',
        howHeard: ''
      });
    } catch {
      setFormError('Failed to submit. Please try again.');
      setTimeout(() => setFormError(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="form" className="bg-gradient-to-r from-[#FFFFFF] to-[#FFFBED] py-12 md:py-20 lg:py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-300 rounded-[20px] md:rounded-[40px] p-4 md:p-8 shadow-sm">
              <p className="text-xl md:text-2xl font-bold text-gray-900 mb-6">{content.formTitle.value}</p>

              <div className="space-y-5">

                {/* Your Name */}
                <div>
                  <label className="block text-sm font-medium  mb-2">
                    {content.fullName.value} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={content.fullNamePlaceholder.value}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium  mb-2">
                    {content.companyName.value}
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={content.companyNamePlaceholder.value}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-sm font-medium  mb-2">
                    {content.workEmail.value} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="johndoe@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium  mb-2">
                    {content.phoneNumber.value}
                  </label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-1/3 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
                      dir="ltr"
                    >
                      <option value="+971">🇦🇪 +971</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+966">🇸🇦 +966</option>
                      <option value="+968">🇴🇲 +968</option>
                      <option value="+974">🇶🇦 +974</option>
                      <option value="+965">🇰🇼 +965</option>
                      <option value="+973">🇧🇭 +973</option>
                      <option value="+44">🇬🇧 +44</option>
                    </select>
                    <input
                      type="tel"
                      name="phone"
                      dir="ltr"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="50 123 4567"
                      className="w-2/3 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-left"
                    />
                  </div>
                </div>

                {/* I'm interested in */}
                <div>
                  <label className="block text-sm font-medium  mb-2">
                    {content.interestedIn.value} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl cursor-pointer border border-gray-200 bg-white"
                  >
                    <option value="">{content.services.placeholder.value}</option>
                    <option value="digital-marketing">{content.services.digitalMarketing.value}</option>
                    <option value="uiux">{content.services.uiux.value}</option>
                    <option value="web-dev">{content.services.webDev.value}</option>
                    <option value="epm">{content.services.epm.value}</option>
                    <option value="other">{content.services.other.value}</option>
                  </select>
                </div>

                {/* Tell us about your vision */}
                <div>
                  <label className="block text-sm font-medium  mb-2">
                    {content.vision.value} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="vision"
                    value={formData.vision}
                    onChange={handleChange}
                    placeholder={content.vision.value}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* How did you hear about us */}
                <div>
                  <label className="block text-sm font-medium  mb-2">
                    {content.howHeard.value}
                  </label>
                  <select
                    name="howHeard"
                    value={formData.howHeard}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl cursor-pointer border border-gray-200 bg-white"
                  >
                    <option value="">{content.heardFrom.placeholder.value}</option>
                    <option value="search">{content.heardFrom.search.value}</option>
                    <option value="social">{content.heardFrom.social.value}</option>
                    <option value="referral">{content.heardFrom.referral.value}</option>
                    <option value="event">{content.heardFrom.event.value}</option>
                    <option value="other">{content.heardFrom.other.value}</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-[#D4AF37] hover:scale-105 transition cursor-pointer text-black font-semibold py-3 px-6 rounded-full duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? content.submitting.value : content.submit.value}
                </button>
                {formError && <p className="text-center text-sm text-red-600 mt-2">{formError}</p>}
                {successMsg && <p className="text-center text-sm text-green-600 mt-2">{successMsg}</p>}
                <p className="text-center text-sm text-gray-500">
                  {content.footerNote.value}
                </p>
              </div>
            </div>

            {/* Request Demo Section */}
            <div className="bg-white rounded-[40px] border border-gray-300 p-8 shadow-sm mt-6">
              <h2 className="text-2xl font-medium text-gray-900 mb-3">{content.demoTitle.value}</h2>
              <p className="text-gray-600 mb-6 text-xl w-[90%]">
                {content.demoDesc.value}
              </p>
              <button onClick={() => router.push(`/${locale}/features#epm-suites`)} className="w-[80%] md:w-[50%] bg-[#D4AF37] text-black font-semibold py-3 px-6 rounded-full hover:scale-105 transition cursor-pointer">
                {content.scheduleDemo.value}
              </button>
            </div>
          </div>

          {/* Right Column - Contact Information */}
          <div className="flex flex-col w-full  space-y-6">
            {/* Email Us */}
            <div className="bg-white w-full border border-gray-300 rounded-[40px] p-6 shadow-sm">
              <div className="flex items-center space-x-4 w-full">
                <div className="bg-[#FFFBED] p-3 rounded-2xl flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="font-semibold text-[28px]">{content.emailUs.value}</h3>
                  <a href="mailto:am@theaminternationals.com" className="text-lg hover:text-[#D4AF37] transition-colors">am@theaminternationals.com</a>
                  <p className="text-lg ">theaminternationals.com</p>
                  <p className="text-gray-500 text-xs">{content.responseTime.value}</p>
                </div>
              </div>
            </div>

            {/* Call Us */}
            <div className="bg-white w-full border border-gray-300 rounded-[40px] p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <a 
                  href="https://wa.me/917306109679" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-[#FFFBED] p-3 rounded-2xl flex-shrink-0 hover:scale-105 transition-transform"
                >
                  <svg 
                    className="w-6 h-6 text-[#D4AF37]" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </a>
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="font-semibold text-[28px]">{content.callUs.value}</h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <a href="tel:+917306109679" className="text-lg font-medium hover:text-[#D4AF37] transition-colors" dir="ltr">
                      {locale === 'ar' ? '\u200E+91 73061 09679' : '+91 73061 09679'}
                    </a>
                  </div>
                  <p className="text-gray-500 text-xs">{content.callTime.value}</p>
                </div>
              </div>
            </div>

            {/* Visit Our Office */}
            <div className="bg-white w-full border border-gray-300 rounded-[40px] p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-[#FFFBED] p-3 rounded-2xl flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="font-semibold text-[28px]">{content.visitOffice.value}</h3>
                  <p className="text-lg whitespace-pre-line">{content.office.value}</p>
                  <p className="text-gray-500 text-xs">{content.appointment.value}</p>
                </div>
              </div>
            </div>


            {/* Business Hours */}
            <div className="bg-white w-full border border-gray-300 rounded-[40px] p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-[#FFFBED] p-3 rounded-2xl flex-shrink-0">
                  <Clock className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <h3 className="font-semibold text-[28px]">{content.businessHours.value}</h3>
                  <p className="text-lg ">{content.businessHoursTime.value}</p>
                  <p className="text-gray-500 text-xs">{content.workingDays.value}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
