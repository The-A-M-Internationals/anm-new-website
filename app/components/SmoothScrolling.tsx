"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname } from "next/navigation";

export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // 1. Core Lenis Initialization
  useEffect(() => {
    console.log("Lenis initializing...");
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    (window as any).lenis = lenis;
    (window as any).__lenis = lenis;

    // FORCE INJECT LENIS CLASSES (Failsafe for v1.3.x)
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  // 2. Hash Scrolling Support
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

  // 3. The Global Bottom-to-Top Reveal Effect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      let delayIndex = 0;
      
      visibleEntries.forEach(entry => {
        const el = entry.target as HTMLElement;
        el.style.transitionDelay = `${delayIndex * 0.2}s`;
        
        requestAnimationFrame(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });

        el.addEventListener('transitionend', function cleanup(e) {
          if (e.propertyName === 'transform') {
            el.style.willChange = 'auto';
            el.style.transitionDelay = '0s';
            el.removeEventListener('transitionend', cleanup);
          }
        });
        
        delayIndex++;
        observer.unobserve(el);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const timer = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.resize();
      }

      const sections = document.querySelectorAll('section:not(.no-global-reveal)');
      
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top < window.innerHeight * 0.3) return;

        const children = section.querySelectorAll(':scope > div > *, .reveal-up');
        
        children.forEach((child) => {
          const el = child as HTMLElement;
          el.style.opacity = '0';
          el.style.transform = 'translateY(100px)';
          el.style.willChange = 'opacity, transform';
          el.style.transition = 'opacity 1.7s cubic-bezier(0.16, 1, 0.3, 1), transform 1.7s cubic-bezier(0.16, 1, 0.3, 1)';
          observer.observe(el);
        });
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}
