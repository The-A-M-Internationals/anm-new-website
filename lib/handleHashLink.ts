import { useRouter } from "next/navigation";

export const handleHashLink = (e: React.MouseEvent, link: string, router: ReturnType<typeof useRouter>) => {
  if (link.includes('#')) {
    const [path, hash] = link.split('#');
    const currentPath = window.location.pathname;

    // Standardize paths by removing trailing slashes for comparison
    const normalizedCurrentPath = currentPath.replace(/\/$/, '');
    const normalizedTargetPath = path.replace(/\/$/, '');

    if (normalizedCurrentPath === normalizedTargetPath || (path === '' && hash)) {
      const element = document.getElementById(hash);
      if (element) {
        e.preventDefault();
        const yOffset = -112; // Adjusted for fixed navbar
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        
        // Update URL hash without triggering a full page reload or Next.js scroll reset
        window.history.pushState(null, '', `#${hash}`);
        return true;
      }
    }
  }
  return false;
};
