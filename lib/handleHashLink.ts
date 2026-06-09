import { useRouter } from "next/navigation";

export const handleHashLink = (e: React.MouseEvent, link: string, router: ReturnType<typeof useRouter>) => {
  if (link.includes('#')) {
    const [path, hash] = link.split('#');
    const currentPath = window.location.pathname;

    // Standardize paths by removing trailing slashes for comparison
    const normalizedCurrentPath = currentPath.replace(/\/$/, '') || '/';
    const normalizedTargetPath = path.replace(/\/$/, '') || '/';

    // Check if we are already on the target page (ignoring the hash)
    if (normalizedCurrentPath === normalizedTargetPath || path === '') {
      const element = document.getElementById(hash);
      if (element) {
        e.preventDefault();
        
        // Always force scroll immediately
        const yOffset = 0; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
        
        // If the URL hash is ALREADY the target hash, the browser's native 'hashchange' won't fire.
        // We push state to update URL, then manually dispatch a 'hashchange' so global listeners know.
        window.history.pushState(null, '', `#${hash}`);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
        
        return true;
      }
    }
  }
  return false;
};
