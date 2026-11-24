/**
 * Page-enter fade on every navigation (templates remount per route).
 * CSS-only so content paints with the server HTML instead of waiting for
 * hydration + GSAP — the previous JS fade held LCP back by ~20 s on mobile.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter min-h-screen">{children}</div>;
}
