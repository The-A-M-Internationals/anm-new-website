'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebaseConfig';
import { doc, getDoc, addDoc, collection } from 'firebase/firestore';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useIntlayer, useLocale } from "next-intlayer";

type Job = {
    title: string;
    titleAr?: string;
    department?: string;
    departmentAr?: string;
    location?: string;
    locationAr?: string;
    type?: string;
    typeAr?: string;
    description?: string;
    descriptionAr?: string;
};

type FormState = {
    name: string;
    email: string;
    phone: string;
    experience: string;
    resumeFile: File | null;
};

export default function JobApplyPage() {
    const { id } = useParams() as { id: string };
    const { locale } = useLocale();

    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState<FormState>({
        name: '',
        email: '',
        phone: '',
        experience: '',
        resumeFile: null,
    });

    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);

    const content = useIntlayer("jobApply");
    // 🔹 Fetch job
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const snap = await getDoc(doc(db, 'jobs', id));
                if (snap.exists()) {
                    setJob(snap.data() as Job);
                } else {
                    setError('Job not found');
                }
            } catch {
                setError('Failed to load job');
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                setFormError(content.formErrorPdf);
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                setFormError(content.formErrorSize);
                return;
            }
            setForm({ ...form, resumeFile: file });
            setFormError(null);
        }
    };

    const uploadToS3 = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('jobId', id);

        const response = await fetch('/api/upload-resume', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Failed to upload resume');
        }

        const data = await response.json();
        return data.url;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.phone || !form.resumeFile) {
            setFormError(content.formErrorRequired);
            return;
        }

        setSubmitting(true);
        setFormError(null);

        try {
            const resumeUrl = await uploadToS3(form.resumeFile);

            await addDoc(collection(db, 'applications'), {
                name: form.name,
                email: form.email,
                phone: form.phone,
                experience: form.experience,
                resumeUrl,
                jobId: id,
                jobTitle: job?.title,
                submittedAt: new Date().toISOString(),
            });

            setSuccess(content.success);
            setForm({ name: '', email: '', phone: '', experience: '', resumeFile: null });
        } catch {
            setFormError(content.formErrorSubmit);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">{content.loading}</div>;
    }

    if (error || !job) {
        const errMsg = error === 'Job not found' ? content.notFound : error === 'Failed to load job' ? content.loadError : error;
        return <div className="min-h-screen flex items-center justify-center text-red-600">{errMsg}</div>;
    }

    // Determine displayed text based on locale
    const title = locale === "ar" ? job.titleAr || job.title : job.title;
    const department = locale === "ar" ? job.departmentAr || job.department : job.department;
    const location = locale === "ar" ? job.locationAr || job.location : job.location;
    const type = locale === "ar" ? job.typeAr || job.type : job.type;
    const description = locale === "ar" ? job.descriptionAr || job.description : job.description;

    return (
        <div className="bg-[#F9FAFB] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-md grid grid-cols-1 md:grid-cols-2 overflow-hidden">

                {/* LEFT — SCROLLABLE JOB DETAILS */}
                <div className="p-6 md:p-8 bg-[#FFFBED] max-h-[80vh] overflow-y-auto text-left rtl:text-right">
                    <h1 className="text-2xl md:text-3xl font-bold mb-3">{title}</h1>

                    <div className="text-sm text-gray-600 flex flex-wrap gap-3 mb-4">
                        {department && <span>{content.deptLabel.value}: <span className='font-bold'>{department}</span></span>}
                        {location && <span>{content.locationLabel.value}: <span className='font-bold'>{location}</span></span>}
                        {type && <span>{content.typeLabel.value}: <span className='font-bold'>{type}</span></span>}
                    </div>

                    <div className="prose max-w-none text-gray-800">
                        <h2 className="text-lg font-semibold mb-2">{content.jobDescriptionTitle.value}</h2>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {description || ""}
                        </ReactMarkdown>
                    </div>
                </div>

                {/* RIGHT — FIXED FORM */}
                <div className="p-6 md:p-8 flex flex-col text-left rtl:text-right">
                    <h2 className="text-xl font-semibold mb-4 text-center">{content.applyTitle.value}</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            name="name"
                            placeholder={`${content.nameLabel.value}*`}
                            value={form.name}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 rtl:text-right"
                        />

                        <input
                            name="email"
                            type="email"
                            placeholder={`${content.emailLabel.value}*`}
                            value={form.email}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 rtl:text-right"
                        />

                        <input
                            name="phone"
                            placeholder={`${content.phoneLabel.value}*`}
                            value={form.phone}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 rtl:text-right"
                        />

                        <textarea
                            name="experience"
                            placeholder={content.experienceLabel.value}
                            value={form.experience}
                            onChange={handleChange}
                            className="border rounded px-3 py-2 min-h-24 rtl:text-right"
                        />

                        <div className="border rounded px-3 py-2">
                            <label className="block text-sm text-gray-600 mb-1">{content.resumeLabel.value}</label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="w-full"
                            />
                            {form.resumeFile && (
                                <p className="text-xs text-gray-500 mt-1">{form.resumeFile.name}</p>
                            )}
                        </div>

                        {formError && <p className="text-red-600 text-sm">{formError}</p>}
                        {success && <p className="text-green-600 text-sm">{success}</p>}

                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-[#D4AF37] text-black px-4 py-2 rounded-full font-semibold hover:scale-105 transition disabled:opacity-60"
                        >
                            {submitting ? content.submitting.value : content.submitButton.value}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}