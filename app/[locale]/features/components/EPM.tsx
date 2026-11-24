'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { db } from '@/lib/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { withTimeout } from "@/lib/withTimeout";
import { useIntlayer, useLocale } from "next-intlayer";

/** consultation: "Talk to an Oracle EPM expert" form (What Sets Us Apart). earlyAccess: EPM Build Agent sign-up (Features). */
export default function EPM({ variant = 'consultation' }: { variant?: 'consultation' | 'earlyAccess' }) {
    const content = useIntlayer("featuresEpm");
    const early = useIntlayer("featuresEarlyAccess");
    const isEarly = variant === 'earlyAccess';
    const { locale } = useLocale();
    const copy = isEarly ? {
        title: early.leftTitle.value, description: early.leftDescription.value,
        bullets: [early.bullet1.value, early.bullet2.value, early.bullet3.value],
        formTitle: early.formTitle.value, label: early.moduleLabel.value, placeholder: early.modulePlaceholder.value,
        submit: early.submitButton.value,
        options: [
            { value: 'Planning', label: early.optionPlanning.value },
            { value: 'Financial Consolidation and Close', label: early.optionFccs.value },
            { value: 'Account Reconciliation', label: early.optionArcs.value },
            { value: 'Other', label: early.optionOther.value },
        ],
    } : {
        title: content.leftTitle.value, description: content.leftDescription.value,
        bullets: [content.bullet1.value, content.bullet2.value, content.bullet3.value],
        formTitle: content.formTitle.value, label: content.serviceLabel.value, placeholder: content.servicePlaceholder.value,
        submit: content.submitButton.value,
        options: [
            { value: 'fcc', label: content.optionFcc.value },
            { value: 'planning&budgeting', label: content.optionPlanning.value },
            { value: 'account-reconciliation', label: content.optionAccountReconciliation.value },
            { value: 'pcm', label: content.optionPcm.value },
            { value: 'enterprise-data-management', label: content.optionEnterpriseDataManagement.value },
            { value: 'narrative-reporting', label: content.optionNarrativeReporting.value },
            { value: 'tax-reporting', label: content.optionTaxReporting.value },
            { value: 'consulting-as-a-service', label: content.optionConsultingAsService.value },
            { value: 'epm-solution-management', label: content.optionEpmSolutionManagement.value },
            { value: 'version-upgrade-patching', label: content.optionVersionUpgrade.value },
            { value: 'monthly-maintenance-administration', label: content.optionMonthlyMaintenance.value },
        ],
    };
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        epm: '',
        message: ''
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
        // Early access: only name, email and company are required (phone, modules and message are optional)
        const missingOptional = !isEarly && (!formData.phone.trim() || !formData.epm.trim());
        if (!formData.name.trim() || !formData.company.trim() || !formData.email.trim() || missingOptional) {
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
        if ((formData.phone.trim() || !isEarly) && (phoneDigitsOnly.length < 10 || phoneDigitsOnly.length > 15)) {
            showTempMsg(setFormError, String(content.errorInvalidPhone.value));
            return;
        }
        setSubmitting(true);
        try {
            await withTimeout(addDoc(collection(db, 'EPM'), {
                ...formData,
                submittedAt: new Date().toISOString()
            }));

            // Dispatch confirmation and alert email
            try {
                await fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'consultation',
                        data: {
                            name: formData.name,
                            company: formData.company,
                            email: formData.email,
                            phone: formData.phone,
                            service: isEarly ? `EPM Build Agent Early Access (${formData.epm || 'modules not given'})` : `EPM Consultation Request (${formData.epm})`,
                            vision: isEarly
                                ? `EPM Build Agent early access. Modules used: ${formData.epm || 'not given'}${formData.message.trim() ? `\nMessage: ${formData.message.trim()}` : ''}`
                                : `Oracle EPM consultation call: ${formData.epm}`,
                        },
                    }),
                });
            } catch (mailErr) {
                console.warn('Could not dispatch EPM form email:', mailErr);
            }
            showTempMsg(setSuccessMsg, String(content.successSubmitted.value));
            setFormData({
                name: '',
                company: '',
                email: '',
                phone: '',
                epm: '',
                message: ''
            });
        } catch {
            showTempMsg(setFormError, String(content.errorSubmitFailed.value));
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div id={isEarly ? 'early-access' : 'epm-suites'} className="bg-[#0F1E4D] flex items-center justify-center py-12 md:py-20 lg:py-24 px-6 relative overflow-hidden">
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
                    <h2 className="text-4xl font-bold leading-tight">
                        {copy.title}
                    </h2>
                    <p className="text-[#FFFFFF] text-lg">
                        {copy.description}
                    </p>

                    {copy.bullets.length > 0 && (
                        <div className="space-y-3">
                            {copy.bullets.map((bullet) => (
                                <div key={bullet} className="flex items-center gap-3">
                                    <div className="shrink-0 w-5 h-5 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
                                        <Check className="w-3 h-3 text-[#D4AF37]" />
                                    </div>
                                    <span className="text-blue-100">{bullet}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right side - Form */}
                <div className="bg-white rounded-[20px] md:rounded-[40px] shadow-2xl p-6 md:p-8 rtl:text-right">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{copy.formTitle}</h2>

                    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                        <label htmlFor="epm-name" className="block text-gray-700 font-medium mb-1">
                            {content.fullNameLabel.value} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="epm-name"
                            name="name"
                            placeholder={content.fullNamePlaceholder.value}
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition rtl:text-right"
                        />

                        <label htmlFor="epm-email" className="block text-gray-700 font-medium mb-1">
                            {content.workEmailLabel.value} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="epm-email"
                            name="email"
                            placeholder="johndoe@gmail.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition rtl:text-right"
                        />

                        <label htmlFor="epm-company" className="block text-gray-700 font-medium mb-1">
                            {content.companyNameLabel.value} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="epm-company"
                            name="company"
                            placeholder={content.companyNamePlaceholder.value}
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition rtl:text-right"
                        />

                        <label htmlFor="epm-phone" className="block text-gray-700 font-medium mb-1">
                            {content.phoneNumberLabel.value} {!isEarly && <span className="text-red-500">*</span>}
                        </label>
                        <input
                            type="tel"
                            id="epm-phone"
                            name="phone"
                            dir={locale === 'ar' ? 'rtl' : 'ltr'}
                            placeholder="1234567890"
                            value={formData.phone}
                            onChange={handleChange}
                            className={` w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition ${locale === 'ar' ? 'text-right' : 'text-left'}`}
                        />

                        <label htmlFor="epm-service" className="block text-gray-700 font-medium mb-1">
                            {copy.label} {!isEarly && <span className="text-red-500">*</span>}
                        </label>
                        <select
                            id="epm-service"
                            name="epm"
                            value={formData.epm}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition resize-none rtl:text-right cursor-pointer"
                        >
                            <option value="">{copy.placeholder}</option>
                            {copy.options.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>

                        {isEarly && (
                            <>
                                <label htmlFor="epm-message" className="block text-gray-700 font-medium mb-1">
                                    {early.messageLabel.value}
                                </label>
                                <textarea
                                    id="epm-message"
                                    name="message"
                                    rows={3}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition resize-none rtl:text-right"
                                />
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-[#D4AF37] w-full flex items-center justify-center gap-2 text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition cursor-pointer"
                        >
                            {submitting ? content.submittingButton.value : copy.submit}
                        </button>
                        {isEarly && <p className="text-gray-500 text-sm text-center">{early.note.value}</p>}
                        {formError && <p role="alert" className="text-red-600 text-sm rtl:text-right">{formError}</p>}
                        {successMsg && <p role="status" className="text-green-600 text-sm rtl:text-right">{successMsg}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}