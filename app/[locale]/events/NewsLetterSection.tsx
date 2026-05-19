'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { subscribeToNewsletter } from '../../../services/newsletter';
import { useIntlayer } from 'next-intlayer';

const NewsLetter = () => {
    const content = useIntlayer("eventsPage");
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{
        type: 'success' | 'info' | 'error';
        text: string;
    } | null>(null);

    const handleSubscribe = async () => {
        if (!email) return;

        setLoading(true);
        setMessage(null);

        const result = await subscribeToNewsletter(email);

        if (result.status === 'success') {
            setEmail('');
            setMessage({ type: 'success', text: String(content.newsletter.successMessage.value) });
        }

        if (result.status === 'already_subscribed') {
            setMessage({ type: 'info', text: String(content.newsletter.alreadySubscribedMessage.value) });
        }

        if (result.status === 'error') {
            setMessage({ type: 'error', text: result.message });
        }

        setLoading(false);
        setTimeout(() => setMessage(null), 5000);
    };

    return (
        <div id='subscribe' className="flex flex-col gap-5 items-center py-12 md:py-20 bg-[#0F1E4D] relative px-4">
            <h2 className="text-3xl md:text-5xl text-white text-center">
                {content.newsletter.heading.value}
            </h2>

            <p className="text-white text-base md:text-lg text-center w-full md:w-[50%]">
                {content.newsletter.description.value}
            </p>

            <input
                type="email"
                placeholder={content.newsletter.emailPlaceholder.value}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="bg-white w-full max-w-[280px] px-5 py-3 rounded-full outline-none text-black"
            />

            <button
                onClick={handleSubscribe}
                disabled={!email || loading}
                className={`bg-[#D4AF37] flex items-center gap-2 text-black px-6 py-3 rounded-full font-semibold transition
          ${(!email || loading) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
        `}
            >
                {loading ? content.newsletter.subscribingButton.value : content.newsletter.subscribeButton.value}
                <ArrowRight className="w-5 h-5 rtl:rotate-180" />
            </button>

            {message && (
                <p
                    className={`text-sm ${message.type === 'success'
                        ? 'text-green-400'
                        : message.type === 'info'
                            ? 'text-gray-400'
                            : 'text-red-400'
                        }`}
                >
                    {message.text}
                </p>
            )}

            <div className="absolute right-0 bottom-0">
                <Image
                    src="/right.svg"
                    alt="side image"
                    width={100}
                    height={100}
                    className="md:w-[150px] md:h-[150px]"
                />
            </div>
        </div>
    );
};

export default NewsLetter;