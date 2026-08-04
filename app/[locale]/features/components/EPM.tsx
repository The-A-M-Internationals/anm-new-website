'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useIntlayer, useLocale } from "next-intlayer";

export default function EPM() {
    const content = useIntlayer("featuresEpm");
    const { locale } = useLocale();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        epm: ''
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

    const showTempMsg = (setter: (msg: string | null) => void, msg: string) => {
        setter(msg);
        setTimeout(() => setter(null), 3000);
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setFormError(null);
        setSuccessMsg(null);
        const nameRegex = /^[A-Za-z ]+$/;
        const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Check if all fields are filled
        if (!formData.name.trim() || !formData.company.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.epm.trim()) {
            showTempMsg(setFormError, String(content.errorFillRequired.value));
            return;
        }

        // Validate full name (only letters and spaces)
        if (!nameRegex.test(formData.name.trim())) {
            showTempMsg(setFormError, String(content.errorNameOnlyLetters.value));
            return;
        }

        // Validate name length (at least 3 characters)
        if (formData.name.trim().length < 3) {
            showTempMsg(setFormError, String(content.errorNameMinLength.value));
            return;
        }

        // Validate company name (at least 3 characters)
        if (formData.company.trim().length < 3) {
            showTempMsg(setFormError, String(content.errorCompanyMinLength.value));
            return;
        }

        // Validate email format
        if (!emailRegex.test(formData.email.trim())) {
            showTempMsg(setFormError, String(content.errorInvalidEmail.value));
            return;
        }

        // Validate phone number (10-15 digits with optional formatting)
        const phoneDigitsOnly = formData.phone.replace(/\D/g, '');
        if (phoneDigitsOnly.length < 10 || phoneDigitsOnly.length > 15) {
            showTempMsg(setFormError, String(content.errorInvalidPhone.value));
            return;
        }
        setSubmitting(true);
        try {
            await addDoc(collection(db, 'EPM'), {
                ...formData,
                submittedAt: new Date().toISOString()
            });
            showTempMsg(setSuccessMsg, String(content.successSubmitted.value));
            setFormData({
                name: '',
                company: '',
                email: '',
                phone: '',
                epm: ''
            });
        } catch {
            showTempMsg(setFormError, String(content.errorSubmitFailed.value));
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div id='epm-suites' className="bg-[#0F1E4D] flex items-center justify-center py-12 md:py-20 lg:py-24 px-6 relative overflow-hidden scroll-mt-[112px] md:scroll-mt-[112px] lg:scroll-mt-[112px]">
            {/* Decorative background elements */}

            <div className='absolute left-0 top-0 rtl:right-0 rtl:left-auto'>
                <Image src='/left.svg' alt='left image' width={150} height={150} className="rtl:-scale-x-100" />
            </div>

            <div className='absolute right-0 bottom-0 rtl:left-0 rtl:right-auto'>
                <Image src='/right.svg' alt='right image' width={150} height={150} className="rtl:-scale-x-100" />
            </div>

            <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center z-10">
                {/* Left side - Info */}
                <div className="text-white space-y-6 rtl:text-right">
                    <h1 className="text-4xl font-bold leading-tight">
                        {content.leftTitle.value}
                    </h1>
                    <p className="text-[#FFFFFF] text-lg">
                        {content.leftDescription.value}
                    </p>

                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="shrink-0 w-5 h-5 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
                                <Check className="w-3 h-3 text-[#D4AF37]" />
                            </div>
                            <span className="text-blue-100">{content.bullet1.value}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="shrink-0 w-5 h-5 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
                                <Check className="w-3 h-3 text-[#D4AF37]" />
                            </div>
                            <span className="text-blue-100">{content.bullet2.value}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="shrink-0 w-5 h-5 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
                                <Check className="w-3 h-3 text-[#D4AF37]" />
                            </div>
                            <span className="text-blue-100">{content.bullet3.value}</span>
                        </div>
                    </div>
                </div>

                {/* Right side - Form */}
                <div className="bg-white rounded-[20px] md:rounded-[40px] shadow-2xl p-6 md:p-8 rtl:text-right">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{content.formTitle.value}</h2>

                    <div className="space-y-4">
                        <label className="block text-gray-700 font-medium mb-1">
                            {content.fullNameLabel.value} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder={content.fullNamePlaceholder.value}
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition rtl:text-right"
                        />

                        <label className="block text-gray-700 font-medium mb-1">
                            {content.workEmailLabel.value} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="johndoe@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition rtl:text-right"
                        />

                        <label className="block text-gray-700 font-medium mb-1">
                            {content.companyNameLabel.value} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="company"
                            placeholder={content.companyNamePlaceholder.value}
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition rtl:text-right"
                        />

                        <label className="block text-gray-700 font-medium mb-1">
                            {content.phoneNumberLabel.value} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            dir={locale === 'ar' ? 'rtl' : 'ltr'}
                            placeholder="1234567890"
                            value={formData.phone}
                            onChange={handleChange}
                            className={` w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition ${locale === 'ar' ? 'text-right' : 'text-left'}`}
                        />

                        <label htmlFor="epm-service" className="block text-gray-700 font-medium mb-1">
                            {content.serviceLabel.value} <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="epm-service"
                            name="epm"
                            value={formData.epm}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition resize-none rtl:text-right"
                        >
                            <option value="">{content.servicePlaceholder.value}</option>
                            <option value="fcc">{content.optionFcc.value}</option>
                            <option value="planning&budgeting">{content.optionPlanning.value}</option>
                            <option value="account-reconciliation">{content.optionAccountReconciliation.value}</option>
                            <option value="pcm">{content.optionPcm.value}</option>
                            <option value="enterprise-data-management">{content.optionEnterpriseDataManagement.value}</option>
                            <option value="narrative-reporting">{content.optionNarrativeReporting.value}</option>
                            <option value="tax-reporting">{content.optionTaxReporting.value}</option>
                            <option value="consulting-as-a-service">{content.optionConsultingAsService.value}</option>
                            <option value="epm-solution-management">{content.optionEpmSolutionManagement.value}</option>
                            <option value="version-upgrade-patching">{content.optionVersionUpgrade.value}</option>
                            <option value="monthly-maintenance-administration">{content.optionMonthlyMaintenance.value}</option>
                        </select>

                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="bg-[#D4AF37] w-full flex items-center justify-center gap-2 text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition cursor-pointer"
                        >
                            {submitting ? content.submittingButton.value : content.submitButton.value}
                        </button>
                        {formError && <p className="text-red-600 text-sm rtl:text-right">{formError}</p>}
                        {successMsg && <p className="text-green-600 text-sm rtl:text-right">{successMsg}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}