import { useRouter } from "next/navigation";

export const handleHashLink = (e: React.MouseEvent, link: string, router: ReturnType<typeof useRouter>) => {
  if (link.includes('#')) {
    const [path, hash] = link.split('#');
    const currentPath = window.location.pathname;

    const locale = currentPath.split('/')[1];
    const hasLocale = ['en', 'ar'].includes(locale);
    
    // Inject locale into the target path if it doesn't have it, so the comparison is fair
    const targetPathWithLocale = (hasLocale && !path.startsWith(`/${locale}`)) 
      ? `/${locale}${path}` 
      : path;

    // Standardize paths by removing trailing slashes for comparison
    const normalizedCurrentPath = currentPath.replace(/\/$/, '') || '/';
    const normalizedTargetPath = targetPathWithLocale.replace(/\/$/, '') || '/';

    // Check if we are already on the target page (ignoring the hash)
    if (normalizedCurrentPath === normalizedTargetPath || path === '') {
      e.preventDefault();
      
      // Update the URL and let SmoothScrolling.tsx (Lenis) handle the actual scrolling via hashchange
      window.history.pushState(null, '', `#${hash}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      
      return true;
    } else {
      // Cross-page navigation
      e.preventDefault();
      
      // Prevent middleware from dropping the hash during a locale redirect!
      const linkNeedsLocale = link.startsWith('/') && !link.startsWith(`/${locale}`);
      const fullLink = hasLocale && linkNeedsLocale ? `/${locale}${link}` : link;

      // Force a hard navigation to completely bypass Next.js dropping the URL hash
      window.location.href = fullLink;
      
      return true;
    }
  }
  return false;
};
