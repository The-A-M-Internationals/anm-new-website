"use client";

import { useLocale } from "next-intlayer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";

export const LanguageSwitcher = () => {
    const { locale } = useLocale();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    // 👉 reference to the whole dropdown
    const containerRef = useRef<HTMLDivElement>(null);

    const getPath = (targetLocale: string) => {
        if (!pathname) return `/${targetLocale}`;
        const segments = pathname.split("/");
        if (segments[1] === "en" || segments[1] === "ar") {
            segments[1] = targetLocale;
            return segments.join("/");
        }
        return `/${targetLocale}${pathname}`;
    };

    // ✅ Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!containerRef.current) return;

            if (!containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative">
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center cursor-pointer gap-2 px-3 py-2 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 transition"
            >
                <Globe size={16} />
                <span className="text-sm font-medium uppercase">{locale}</span>
                <ChevronDown
                    size={14}
                    className={`opacity-60 transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="z-100 absolute mt-2 end-0 w-36 rounded-xl border bg-white shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    <Link
                        href={getPath("en")}
                        className="block px-4 py-2 text-sm hover:bg-neutral-100"
                    >
                        English
                    </Link>
                    <Link
                        href={getPath("ar")}
                        className="block px-4 py-2 text-sm hover:bg-neutral-100"
                    >
                        العربية
                    </Link>
                </div>
            )}
        </div>
    );
};