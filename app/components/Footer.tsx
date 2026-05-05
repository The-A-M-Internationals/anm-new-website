'use client';

import Image from "next/image";
import { useState } from "react";
import { subscribeToNewsletter } from "../../services/newsletter";
import Link from "next/link";
import { useIntlayer, useLocale } from "next-intlayer";
import { Phone, Mail, Globe } from "lucide-react";
import "./footer.content";

const Footer = () => {
    const content = useIntlayer("footer");


    const { locale } = useLocale();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    type MessageKey = keyof ReturnType<typeof useIntlayer>;
    const [message, setMessage] = useState<{
        type: "success" | "error" | "info";
        textKey?: MessageKey;
        text?: string;
    } | null>(null);

    // Email validation function
    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubscribe = async () => {
        if (!email) return;
        if (!isValidEmail(email)) {
            setMessage({ type: "error", textKey: "validEmailError" });
            setTimeout(() => setMessage(null), 5000);
            return;
        }

        setLoading(true);
        setMessage(null);

        const result = await subscribeToNewsletter(email);

        if (result.status === "success") {
            setEmail("");
            setMessage({ type: "success", textKey: "subscribedSuccessfully" });
        }

        if (result.status === "already_subscribed") {
            setMessage({ type: "info", textKey: "alreadySubscribed" });
        }

        if (result.status === "error") {
            setMessage({ type: "error", text: result.message });
        }

        setLoading(false);
        setTimeout(() => setMessage(null), 5000);
    };

    const getLocalizedLink = (path: string) => `/${locale}${path === '/' ? '' : path}`;

    return (
        <div className="snap-section min-h-fit">
            <div className="bg-[#0D1B3E] w-full min-h-[600px] flex flex-col lg:flex-row text-white p-6 sm:p-10 md:p-15 gap-8">

                {/* LEFT */}
                <div className="flex flex-col flex-1 gap-6 sm:gap-8 md:gap-10">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={150}
                        height={150}
                        className="w-32 sm:w-36 md:w-40 lg:w-[150px] h-auto"
                    />

                    <div className="text-[16px] md:text-lg lg:text-[20px]">
                        {content.companyDescription?.value || ""}
                    </div>

                    <div className="flex flex-col gap-3 text-sm sm:text-base text-gray-300">
                        <div className="font-semibold text-white mb-1 uppercase tracking-wider text-xs opacity-80">{content.contactUs?.value || "Contact Us"}</div>
                        
                        <a href="tel:+917306109679" className="flex items-start gap-3 hover:text-[#C9A84C] transition-colors group" dir="ltr">
                            <Phone className="w-5 h-5 text-[#C9A84C] mt-0.5 shrink-0" />
                            <div className="flex flex-col">
                                <span className="font-medium text-white group-hover:text-[#C9A84C] transition-colors">
                                    {locale === 'ar' ? '\u200E+91 73061 09679' : '+91 73061 09679'}
                                </span>
                                <span className="text-[11px] text-gray-400 group-hover:text-[#C9A84C]/80 transition-colors uppercase tracking-tight">
                                    {locale === 'ar' ? '(واتساب ومكالمات)' : '(WhatsApp & Calls)'}
                                </span>
                            </div>
                        </a>

                        <a href="mailto:am@theaminternational.com" className="flex items-center gap-3 hover:text-[#C9A84C] transition-colors group">
                            <Mail className="w-5 h-5 text-[#C9A84C] shrink-0" />
                            <span className="truncate">{content.emailLabel?.value || "Email"}</span>
                        </a>

                        <a href="https://theaminternational.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#C9A84C] transition-colors group">
                            <Globe className="w-5 h-5 text-[#C9A84C] shrink-0" />
                            <span>{content.websiteLabel?.value || "Website"}</span>
                        </a>
                    </div>

                    <div className="text-[#C9A84C] text-lg sm:text-xl md:text-2xl mt-2">
                        {content.followUs?.value || "Follow Us"}
                        <div className="flex gap-2 mt-2">
                            <a href={content.instagramLink?.value || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>

                            <a href={content.linkedinLink?.value || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        fillRule="evenodd"
                                        d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>

                            <a href={content.twitterLink?.value || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <svg width="20" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_196_4828)">
                                        <mask id="mask0_196_4828" mask="luminance"
                                            maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                            <path d="M0 0H24V24H0V0Z" fill="white" />
                                        </mask>
                                        <g mask="url(#mask0_196_4828)">
                                            <path
                                                d="M18.9 1.125H22.5806L14.5406 10.3376L24 22.8759H16.5943L10.7897 15.273L4.15543 22.8759H0.471429L9.07029 13.0187L0 1.12671H7.59429L12.8331 8.07471L18.9 1.125ZM17.6057 20.6679H19.6457L6.48 3.21814H4.29257L17.6057 20.6679Z"
                                                fill="white"
                                            />
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_196_4828">
                                            <rect width="24" height="24" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>

                            <a href={content.youtubeLink?.value || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        fillRule="evenodd"
                                        d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 lg:ml-20 gap-4 sm:gap-5">
                    <div className="text-[#C9A84C] text-[20px] md:text-2xl lg:text-[24px]">
                        <Link href={getLocalizedLink("/finance-transformation")} className="hover:underline transition-all">{content.financeTransformation?.value || "Finance Transformation"}</Link>
                    </div>
                    <div className="text-[15px] md:text-base lg:text-[16px] flex flex-col gap-2">
                        <Link href={getLocalizedLink("/finance-transformation#financial-consolidation")} className="hover:text-[#C9A84C] transition-colors">{content.financialConsolidation?.value || ""}</Link>
                        <Link href={getLocalizedLink("/finance-transformation#planning-budgeting")} className="hover:text-[#C9A84C] transition-colors">{content.planningBudgeting?.value || ""}</Link>
                        <Link href={getLocalizedLink("/finance-transformation#account-reconciliation")} className="hover:text-[#C9A84C] transition-colors">{content.accountReconciliation?.value || ""}</Link>
                        <Link href={getLocalizedLink("/finance-transformation#profitability-cost")} className="hover:text-[#C9A84C] transition-colors">{content.profitabilityCost?.value || ""}</Link>
                        <Link href={getLocalizedLink("/finance-transformation#enterprise-data")} className="hover:text-[#C9A84C] transition-colors">{content.enterpriseData?.value || ""}</Link>
                        <Link href={getLocalizedLink("/finance-transformation#narrative-reporting")} className="hover:text-[#C9A84C] transition-colors">{content.narrativeReporting?.value || ""}</Link>
                        <Link href={getLocalizedLink("/finance-transformation#tax-reporting")} className="hover:text-[#C9A84C] transition-colors">{content.taxReporting?.value || ""}</Link>
                    </div>
                    <div className="text-[#C9A84C] mt-3 text-[20px] md:text-2xl lg:text-[24px]">
                        <Link href={getLocalizedLink("/finance-transformation#managed-services")} className="hover:underline transition-all">{content.managedServices?.value || "Managed Services"}</Link>
                    </div>
                    <div className="text-[15px] md:text-base lg:text-[16px] flex flex-col gap-2">
                        <Link href={getLocalizedLink("/finance-transformation#consulting-as-service")} className="hover:text-[#C9A84C] transition-colors">{content.consultingAsService?.value || ""}</Link>
                        <Link href={getLocalizedLink("/finance-transformation#epm-solution-management")} className="hover:text-[#C9A84C] transition-colors">{content.epmSolutionManagement?.value || ""}</Link>
                        <Link href={getLocalizedLink("/finance-transformation#version-upgrade")} className="hover:text-[#C9A84C] transition-colors">{content.versionUpgrade?.value || ""}</Link>
                        <Link href={getLocalizedLink("/finance-transformation#monthly-maintenance")} className="hover:text-[#C9A84C] transition-colors">{content.monthlyMaintenance?.value || ""}</Link>
                    </div>
                </div>

                <div className="flex flex-col flex-1 lg:ml-20 gap-4 sm:gap-5">
                    <div className="text-[#C9A84C] text-[20px] md:text-2xl lg:text-[24px]">
                        {content.resources?.value || "Resources"}
                    </div>
                    <div className="text-[15px] md:text-base lg:text-[16px]">
                        <Link href={getLocalizedLink("/")} className="hover:text-[#C9A84C] transition-colors">
                            {content.amInternational?.value || "AM International"}
                        </Link>
                    </div>
                    <div className="text-[#C9A84C] mt-3 text-[20px] md:text-2xl lg:text-[24px]">
                        {content.howWeWork?.value || "How We Work"}
                    </div>
                    <div className="text-[15px] md:text-base lg:text-[16px] flex flex-col gap-2">
                        <Link href={getLocalizedLink("/success-stories")} className="hover:text-[#C9A84C] transition-colors">
                            {content.successStories?.value || "Success Stories"}
                        </Link>
                        <Link href={getLocalizedLink("/features")} className="hover:text-[#C9A84C] transition-colors">
                            {content.whatSetsApart?.value || "What Sets Us Apart"}
                        </Link>
                        <Link href={getLocalizedLink("/methodology")} className="hover:text-[#C9A84C] transition-colors">
                            {content.methodology?.value || "Methodology"}
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col flex-1 gap-4 sm:gap-5">
                    <div className="text-[#C9A84C] text-lg sm:text-xl md:text-2xl">
                        {content.stayConnected?.value || "Stay Connected"}
                    </div>

                    <div className="text-xs sm:text-sm md:text-base">
                        {content.newsletterDescription?.value || ""}
                    </div>

                    <div className="mt-4 flex flex-col gap-4 w-full max-w-[276px]">

                        <input
                            type="email"
                            placeholder={content.emailPlaceholder?.value || "Your email address"}
                            className={`bg-[#222B44] p-2 text-sm sm:text-base outline-none border ${message?.type === 'error' ? 'border-red-400' : 'border-[#FFFFFF8A]'} rounded-[40px] w-full`}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            disabled={loading}
                        />

                        <button
                            className={`flex items-center justify-center cursor-pointer bg-[#C9A84C] rounded-[36px] p-2 hover:scale-105 transition
                            ${(!email || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={handleSubscribe}
                            disabled={!email || loading}
                        >
                            <span className="text-black ml-2">
                                {loading ? (content.subscribing?.value || "Subscribing...") : (content.subscribe?.value || "Subscribe")}
                            </span>
                        </button>

                        {message && (
                            <p
                                className={`text-xs ${message.type === "success"
                                    ? "text-green-400"
                                    : message.type === "info"
                                        ? "text-gray-400"
                                        : "text-red-400"
                                    }`}
                            >
                                {message.textKey ? String(content[message.textKey]?.value || "") : message.text}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-white" />

            <div className="bg-[#0D1B3E] text-center text-white py-6 text-xs sm:text-sm flex flex-col md:flex-row items-center justify-center px-4 gap-2 md:gap-1">
                <span>{content.copyright?.value || ""}</span>
                <span className="hidden md:inline mx-2">|</span>
                <div className="flex items-center gap-1">
                    <a 
                        href="https://privacy-policy.theaminternationals.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-[#C9A84C] transition-colors"
                    >
                        {content.privacy?.value || "Privacy Policy"}
                    </a>
                    <span className="mx-1">|</span>
                    <a 
                        href="https://privacy-policy.theaminternationals.com/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-[#C9A84C] transition-colors"
                    >
                        {content.terms?.value || "Terms of Service"}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
