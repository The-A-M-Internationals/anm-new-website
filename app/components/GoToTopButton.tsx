"use client";
import React, { useEffect, useState } from "react";

export default function GoToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            className="go-to-top-btn"
            style={{ display: visible ? "block" : "none" }}
            onClick={scrollToTop}
            aria-label="Go to top"
        >
            ↑
        </button>
    );
}
