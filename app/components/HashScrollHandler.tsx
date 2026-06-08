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
          const yOffset = 0; // Removed offset as navbar is not fixed
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };

    // Attempt to scroll immediately
    handleScroll();

    // Also attempt after a short delay to account for rendering/hydration
    const timer = setTimeout(handleScroll, 100);
    const timer2 = setTimeout(handleScroll, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [pathname, searchParams]);

  return null;
};

export default HashScrollHandler;