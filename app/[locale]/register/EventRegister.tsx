'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { addDoc, collection, Timestamp, doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import { db } from '../../../lib/firebaseConfig';
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';

interface EventType {
    title: string;
    description: string;
    location: string;
    dateRange: string;
    month: string;
    timeRange: string;
    imageSrc: string;
}

// ✅ Match what the form actually uses in JSX
interface FormData {
    name: string;
    email: string;
    phone: string;
}

const EventRegister = () => {
    const content = useIntlayer('eventRegister');

    const searchParams = useSearchParams();
    const eventId = searchParams?.get('eventId');
    const router = useRouter();

    const [event, setEvent] = useState<EventType | null>(null);

    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [redirecting, setRedirecting] = useState(false);

    useEffect(() => {
        if (!eventId) return;

        const fetchEvent = async () => {
            try {
                const snap = await getDoc(doc(db, 'events', eventId));
                if (snap.exists()) setEvent(snap.data() as EventType);
            } catch (err) {
                console.error(err);
            }
        };

        fetchEvent();
    }, [eventId]);

    // ✅ Prevent "Cannot read properties of undefined"
    // Keep this AFTER hooks so we don't call hooks conditionally.
    if (!content) {
        return (
            <div className="min-h-screen px-4 py-10 flex items-center justify-center">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        if (!eventId || !form.name || !form.email) {
            setMessage(content.requiredError);
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            await addDoc(collection(db, 'eventRegistrations'), {
                eventId,
                name: form.name,
                email: form.email,
                phone: form.phone,
                registeredAt: Timestamp.now(),
            });

            setMessage(content.successMessage);
            setForm({ name: '', email: '', phone: '' });

            setRedirecting(true);
            setTimeout(() => {
                if (typeof window !== 'undefined' && window.history.length > 1) {
                    router.back();
                } else {
                    router.push('/');
                }
            }, 3000);
        } catch {
            setMessage(content.errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen px-4 py-10 flex items-center justify-center">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
                {/* LEFT — EVENT DETAILS */}
                <div className="bg-linear-to-br from-[#FFFBED] to-white p-6 md:p-8 flex flex-col gap-4">
                    {event ? (
                        <>
                            <div className="relative w-full h-56 rounded-2xl overflow-hidden">
                                <Image
                                    src={event.imageSrc}
                                    alt={event.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>

                            <h2 className="text-2xl font-semibold text-gray-900">{event.title}</h2>
                            <p className="text-gray-600">{event.description}</p>

                            <div className="flex flex-col gap-2 text-sm text-gray-700">
                                <div className="flex gap-2">
                                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                                    <p>
                                        <strong>{content.locationLabel}:</strong> {event.location}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <CalendarDays className="w-4 h-4 md:w-6 md:h-6 text-[#D4AF37]" />
                                    <p>
                                        <strong>{content.dateLabel}:</strong> {event.dateRange} {event.month}
                                    </p>
                                </div>

                                <div className="flex gap-2">
                                    <Clock className="w-4 h-4 md:w-6 md:h-6 text-[#D4AF37]" />
                                    <p>
                                        <strong>{content.timeLabel}:</strong> {event.timeRange}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p className="text-gray-500">{content.loadingEvent}</p>
                    )}
                </div>

                {/* RIGHT — FORM */}
                <div className="p-6 md:p-8 flex flex-col">
                    <h1 className="text-2xl font-semibold mb-4 text-center">{content.registration}</h1>

                    <label className="text-sm font-medium mb-1">{content.fullName}</label>
                    <input
                        name="name"
                        placeholder={content.namePlaceholder.value}
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 mb-3"
                    />

                    <label className="text-sm font-medium mb-1">{content.email}</label>
                    <input
                        name="email"
                        type="email"
                        placeholder={content.emailPlaceholder.value}
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 mb-3"
                    />

                    <label className="text-sm font-medium mb-1">
                        {content.phone} <span className="text-gray-400">{content.optional}</span>
                    </label>
                    <input
                        name="phone"
                        placeholder={content.phonePlaceholder.value}
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 mb-4"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-[#D4AF37] text-black py-2 rounded-full font-semibold hover:scale-105 transition"
                    >
                        {loading ? content.submitting : content.register}
                    </button>

                    {message && (
                        <p className="text-center text-sm mt-3 text-gray-700">
                            {message} {redirecting && <span>{content.redirecting}</span>}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventRegister;