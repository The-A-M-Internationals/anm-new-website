'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const HashScrollHandler = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          // Use an offset to skip the large top padding on sections (e.g. py-24)
          const isMobile = window.innerWidth < 768;
          const yOffset = isMobile ? 40 : 80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } else {
        window.scrollTo(0, 0);
      }
    };

    // Listen for hash changes manually as Next.js navigation might not trigger useEffect on hash-only changes
    window.addEventListener('hashchange', handleScroll);
    window.addEventListener('popstate', handleScroll);

    // Attempt to scroll immediately
    handleScroll();

    // Also attempt after a short delay to account for rendering/hydration
    const timer = setTimeout(handleScroll, 100);
    const timer2 = setTimeout(handleScroll, 500);

    return () => {
      window.removeEventListener('hashchange', handleScroll);
      window.removeEventListener('popstate', handleScroll);
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [pathname, searchParams]);

  return null;
};

export default HashScrollHandler;