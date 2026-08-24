"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSInitializer() {
    const pathname = usePathname();

    useEffect(() => {
        AOS.init({ 
            once: true,
            duration: 800,
            offset: 50,
            easing: 'ease-out-cubic'
        });
    }, []);

    useEffect(() => {
        // Refresh AOS on route change so new page elements are detected
        const timer = setTimeout(() => {
            AOS.refresh();
        }, 500);
        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
}
