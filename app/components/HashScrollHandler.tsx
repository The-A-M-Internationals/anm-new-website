'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const HashScrollHandler = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let scrollAttempts = 0;
    let scrollInterval: NodeJS.Timeout | null = null;

    const tryScroll = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          if (scrollInterval) clearInterval(scrollInterval);
          return true;
        }
      } else if (scrollAttempts === 0) {
        // Only scroll to top on the very first attempt if there's no hash
        window.scrollTo(0, 0);
        if (scrollInterval) clearInterval(scrollInterval);
        return true;
      }
      return false;
    };

    const handleScroll = () => {
      scrollAttempts = 0;
      if (scrollInterval) clearInterval(scrollInterval);
      
      // Try immediately
      if (!tryScroll()) {
        // If not found, poll for up to 2 seconds
        scrollInterval = setInterval(() => {
          scrollAttempts++;
          if (tryScroll() || scrollAttempts >= 20) {
            if (scrollInterval) clearInterval(scrollInterval);
          }
        }, 100);
      }
    };

    // Listen for hash changes manually
    window.addEventListener('hashchange', handleScroll);
    window.addEventListener('popstate', handleScroll);

    // Initial attempt on mount / pathname change
    handleScroll();

    return () => {
      window.removeEventListener('hashchange', handleScroll);
      window.removeEventListener('popstate', handleScroll);
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [pathname, searchParams]);

  return null;
};

export default HashScrollHandler;