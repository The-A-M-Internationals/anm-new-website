'use client';

import React, { useState } from 'react';
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer, useLocale } from "next-intlayer";
import { useEffect } from 'react';

const ContactForm: React.FC = () => {
  const content = useIntlayer("contactFormDetails");
  const { locale } = useLocale();
  const router = useRouter();

  useEffect(() => {
    const handleScrollToForm = () => {
      if (window.location.hash === '#form') {
        const element = document.getElementById('form');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Handle initial load
    handleScrollToForm();

    // Handle hash changes
    window.addEventListener('hashchange', handleScrollToForm);
    return () => window.removeEventListener('hashchange', handleScrollToForm);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
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
    const nameRegex = /^[A-Za-z ]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if all required fields are filled (excluding vision and howHeard)
    if (!formData.name.trim() || !formData.company.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.service.trim()) {
      setFormError('Please fill all required fields.');
      setTimeout(() => setFormError(null), 3000);
      return;
    }

    // Validate full name (only letters and spaces)
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

    // Validate company name (at least 3 characters)
    if (formData.company.trim().length < 3) {
      setFormError('Company name should be at least 3 characters long.');
      setTimeout(() => setFormError(null), 3000);
      return;
    }

    // Validate email format
    if (!emailRegex.test(formData.email.trim())) {
      setFormError('Please enter a valid email address.');
      setTimeout(() => setFormError(null), 3000);
      return;
    }

    // Validate phone number (10-15 digits with optional formatting)
    const phoneDigitsOnly = formData.phone.replace(/\D/g, '');
    if (phoneDigitsOnly.length < 10 || phoneDigitsOnly.length > 15) {
      setFormError('Phone number should be between 10-15 digits.');
      setTimeout(() => setFormError(null), 3000);
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'customers'), {
        ...formData,
        submittedAt: new Date().toISOString()
      });
      setSuccessMsg('Thank you! We will get back to you within 24 hours.');
      setTimeout(() => setSuccessMsg(null), 3000);
      setFormData({
        name: '',
        company: '',
        email: '',
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
                    {content.companyName.value} <span className="text-red-500">*</span>
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
                    {content.phoneNumber.value} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    dir={locale === 'ar' ? 'rtl' : 'ltr'}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="1234567890"
                    className={`w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent ${locale === 'ar' ? 'text-right' : 'text-left'}`}
                  />
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
                    <option value="epm">{content.services.epm.value}</option>
                    <option value="consulting">{content.services.consulting.value}</option>
                    <option value="training">{content.services.training.value}</option>
                    <option value="support">{content.services.support.value}</option>
                  </select>
                </div>

                {/* Tell us about your vision */}
                <div>
                  <label className="block text-sm font-medium  mb-2">
                    {content.vision.value}
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
                  <p className="text-lg ">AM@theaminternational.com</p>
                  <p className="text-gray-500 text-xs">{content.responseTime.value}</p>
                </div>
              </div>
            </div>

            {/* Call Us */}
            <div className="bg-white w-full border border-gray-300 rounded-[40px] p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-[#FFFBED] p-3 rounded-2xl">
                  <Phone className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[28px]">{content.callUs.value}</h3>
                  <p className="text-lg font-medium">+91 730-610-5679</p>
                  <p className="text-gray-500 text-xs">{content.callTime.value}</p>
                </div>
              </div>
            </div>

            {/* Visit Our Office */}
            <div className="bg-white w-full border border-gray-300 rounded-[40px] p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-[#FFFBED] p-3 rounded-2xl">
                  <MapPin className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[28px]">{content.visitOffice.value}</h3>
                  <p className="text-lg">{content.office.value}</p>
                  <p className="text-gray-500 text-xs">{content.appointment.value}</p>
                </div>
              </div>
            </div>


            {/* Business Hours */}
            <div className="bg-white w-full border border-gray-300 rounded-[40px] p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-[#FFFBED] p-3 rounded-2xl">
                  <Clock className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
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