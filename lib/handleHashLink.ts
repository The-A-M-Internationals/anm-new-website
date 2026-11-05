/**
 * Anchor scrolling that goes THROUGH Lenis. Native element.scrollIntoView({behavior:"smooth"})
 * or window.scrollTo({behavior:"smooth"}) runs a second, competing animation on the same
 * scroll position — that's the jerk you see on navbar clicks.
 */
import type { MouseEvent as ReactMouseEvent } from "react";

const headerOffset = () => {
  if (typeof document === "undefined") return -80;
  const header = document.querySelector<HTMLElement>("[data-site-header], header, nav");
  return -((header?.getBoundingClientRect().height ?? 80) + 8);
};

export function scrollToHash(hash: string, immediate = false): boolean {
  if (typeof window === "undefined" || !hash || hash === "#") return false;
  const targetId = hash.startsWith("#") ? hash : `#${hash}`;
  const el = document.querySelector<HTMLElement>(targetId);
  if (!el) return false;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: headerOffset(), duration: immediate ? 0 : 1.1, immediate });
  } else {
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY + headerOffset(),
      behavior: immediate ? "auto" : "smooth",
    });
  }
  return true;
}

export function handleHashLink(
  e: ReactMouseEvent<HTMLElement> | React.MouseEvent,
  href: string,
  _router?: unknown
): boolean {
  if (!href || !href.includes("#")) return false;
  const [path, hash] = href.split("#");
  if (typeof window === "undefined") return false;

  const currentPath = window.location.pathname;
  const locale = currentPath.split("/")[1];
  const hasLocale = ["en", "ar"].includes(locale);
  const targetPathWithLocale = hasLocale && !path.startsWith(`/${locale}`) ? `/${locale}${path}` : path;
  const normalizedCurrentPath = currentPath.replace(/\/$/, "") || "/";
  const normalizedTargetPath = targetPathWithLocale.replace(/\/$/, "") || "/";

  if (normalizedCurrentPath === normalizedTargetPath || path === "") {
    e.preventDefault();
    if (scrollToHash(`#${hash}`)) {
      window.history.pushState(null, "", `#${hash}`);
      return true;
    }
  }

  return false;
}
