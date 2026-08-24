"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScrolling() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync ScrollTrigger with Lenis's scroll updates
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis natively for maximum unthrottled performance
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;

    let scrollAttempts = 0;
    let scrollInterval: NodeJS.Timeout | null = null;

    const tryScroll = () => {
      if (!lenisRef.current) return false;
      const hash = window.location.hash;
      if (hash) {
        try {
          const target = document.querySelector(hash);
          if (target) {
            // Tell Lenis to natively handle the scroll (no offset needed since navbar is not fixed!)
            lenisRef.current.scrollTo(target as HTMLElement);
            if (scrollInterval) clearInterval(scrollInterval);
            return true;
          }
        } catch (e) {}
      } else if (scrollAttempts === 0) {
        lenisRef.current.scrollTo(0, { immediate: true });
        if (scrollInterval) clearInterval(scrollInterval);
        return true;
      }
      return false;
    };

    const handleScroll = () => {
      scrollAttempts = 0;
      if (scrollInterval) clearInterval(scrollInterval);
      
      if (!tryScroll()) {
        scrollInterval = setInterval(() => {
          scrollAttempts++;
          if (tryScroll() || scrollAttempts >= 20) {
            if (scrollInterval) clearInterval(scrollInterval);
          }
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleScroll);
    window.addEventListener('popstate', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('hashchange', handleScroll);
      window.removeEventListener('popstate', handleScroll);
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // We use a native IntersectionObserver instead of GSAP.
    // CSS transitions run on the GPU, which completely eliminates the lag!
    const observer = new IntersectionObserver((entries) => {
      // Filter out only the elements that just entered the screen
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      // Apply a staggered delay to create the "wave" effect natively!
      visibleEntries.forEach((entry, index) => {
        const el = entry.target as HTMLElement;
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          
          // Clean up GPU memory after the animation finishes
          el.addEventListener('transitionend', function cleanup() {
            el.style.willChange = 'auto';
            el.removeEventListener('transitionend', cleanup);
          });
        }, index * 120); // 120ms stagger between each element
        
        // Once revealed, stop observing it so we don't waste performance
        observer.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }); // Trigger slightly before it fully enters

    const timer = setTimeout(() => {
      // Force Lenis to recalculate the page height after SPA navigation
      if (lenisRef.current) {
        lenisRef.current.resize();
      }

      const sections = document.querySelectorAll('section:not(.no-global-reveal)');
      
      sections.forEach((section) => {
        // Skip hero sections already visible on page load
        if (section.getBoundingClientRect().top < window.innerHeight * 0.3) return;

        // Target the inner layout chunks automatically, AND any specifically marked deep items
        const children = section.querySelectorAll(':scope > div > *, .reveal-up');
        
        children.forEach((child) => {
          const el = child as HTMLElement;
          
          // Set the initial hidden state and attach the smooth hardware-accelerated transition
          el.style.opacity = '0';
          el.style.transform = 'translateY(40px)';
          el.style.willChange = 'opacity, transform';
          el.style.transition = 'opacity 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
          
          observer.observe(el);
        });
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
